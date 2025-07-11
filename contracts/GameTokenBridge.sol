// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

/**
 * @title GameTokenBridge
 * @dev 此合约作为外部ERC20代币与游戏金币之间的桥梁，支持税收和签名验证。
 *
 * 工作流程:
 * 1. 合约所有者(部署者)需要持有足够的外部代币用于兑换功能
 * 2. 合约所有者需要授权此合约使用其代币(approve)
 * 3. 玩家可以用游戏金币兑换代币(exchangeFromGame)
 * 4. 玩家可以用代币充值游戏金币(rechargeToGame)
 */
contract GameTokenBridge is Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    IERC20 public immutable externalToken; // 外部ERC20代币合约地址
    uint8 public immutable externalTokenDecimals; // 外部ERC20代币的小数位数
    string public immutable externalTokenSymbol; // 外部ERC20代币的符号

    address public gameServerAddress;
    uint256 public exchangeRate = 100; // 1个外部代币 = exchangeRate个游戏金币 (需要根据外部代币的decimals调整)

    uint256 public exchangeTokenTaxRate = 200; // 金币兑换代币的税率 (基点, 200 = 2%)
    uint256 public rechargeTokenTaxRate = 100; // 代币充值金币的税率 (基点, 100 = 1%)
    address public taxWallet;

    uint256 public minExchangeAmount; // 最小金币兑换代币数量 (以外部代币的最小单位表示)
    uint256 public maxExchangeAmount; // 最大金币兑换代币数量 (以外部代币的最小单位表示)

    mapping(address => bool) public operators;
    mapping(bytes32 => bool) public usedNonces;

    // 事件
    event ExchangeFromGame(address indexed player, uint256 gameCoins, uint256 tokenAmount, uint256 taxAmount);
    event RechargeToGame(address indexed player, uint256 tokenAmount, uint256 gameCoins, uint256 taxAmount);
    event OperatorSet(address indexed operator, bool status);
    event ExchangeRateUpdated(uint256 newRate);
    event ExchangeTokenTaxRateUpdated(uint256 newTaxRate);
    event RechargeTokenTaxRateUpdated(uint256 newTaxRate);
    event TaxWalletUpdated(address newTaxWallet);
    event ExchangeLimitsUpdated(uint256 minAmount, uint256 maxAmount);
    event GameServerAddressUpdated(address newAddress);
    event ExternalTokenSet(address indexed tokenAddress, uint8 decimals, string symbol);
    event EmergencyWithdrawal(address indexed token, address indexed to, uint256 amount);

    /**
     * @dev 构造函数
     * @param _externalTokenAddress 外部ERC20代币合约地址
     * @param _gameServerAddress 游戏服务器地址
     * @param _taxWallet 税收钱包地址
     * @param _initialExchangeRate 初始兑换比例
     * @param _initialMinExchange 最小兑换金额 (以外部代币的最小单位表示)
     * @param _initialMaxExchange 最大兑换金额 (以外部代币的最小单位表示)
     */
    constructor(
        address _externalTokenAddress,
        address _gameServerAddress,
        address _taxWallet,
        uint256 _initialExchangeRate,
        uint256 _initialMinExchange,
        uint256 _initialMaxExchange
    ) {
        require(_externalTokenAddress != address(0), "GameTokenBridge: invalid external token address");
        require(_gameServerAddress != address(0), "GameTokenBridge: invalid game server address");
        require(_taxWallet != address(0), "GameTokenBridge: invalid tax wallet address");
        require(_initialExchangeRate > 0, "GameTokenBridge: exchange rate must be positive");
        require(_initialMinExchange > 0, "GameTokenBridge: min exchange must be positive");
        require(_initialMaxExchange >= _initialMinExchange, "GameTokenBridge: max must be >= min");

        externalToken = IERC20(_externalTokenAddress);
        externalTokenDecimals = IERC20Metadata(_externalTokenAddress).decimals();
        externalTokenSymbol = IERC20Metadata(_externalTokenAddress).symbol();

        gameServerAddress = _gameServerAddress;
        taxWallet = _taxWallet;
        exchangeRate = _initialExchangeRate;
        minExchangeAmount = _initialMinExchange;
        maxExchangeAmount = _initialMaxExchange;

        operators[_gameServerAddress] = true; // 默认游戏服务器为操作员

        emit ExternalTokenSet(_externalTokenAddress, externalTokenDecimals, externalTokenSymbol);
        emit GameServerAddressUpdated(_gameServerAddress);
        emit TaxWalletUpdated(_taxWallet);
        emit ExchangeRateUpdated(_initialExchangeRate);
        emit ExchangeLimitsUpdated(_initialMinExchange, _initialMaxExchange);
        emit OperatorSet(_gameServerAddress, true);
        emit ExchangeTokenTaxRateUpdated(exchangeTokenTaxRate);
        emit RechargeTokenTaxRateUpdated(rechargeTokenTaxRate);
    }

    // --- 管理函数 ---

    /**
     * @dev 设置游戏服务器地址
     * @param _newGameServerAddress 新的游戏服务器地址
     */
    function setGameServerAddress(address _newGameServerAddress) external onlyOwner {
        require(_newGameServerAddress != address(0), "GameTokenBridge: invalid game server address");
        gameServerAddress = _newGameServerAddress;
        emit GameServerAddressUpdated(_newGameServerAddress);
    }

    /**
     * @dev 设置税收钱包地址
     * @param _newTaxWallet 新的税收钱包地址
     */
    function setTaxWallet(address _newTaxWallet) external onlyOwner {
        require(_newTaxWallet != address(0), "GameTokenBridge: invalid tax wallet address");
        taxWallet = _newTaxWallet;
        emit TaxWalletUpdated(_newTaxWallet);
    }

    /**
     * @dev 设置金币兑换代币的税率
     * @param _newRate 新的税率 (基点, 100 = 1%)
     */
    function setExchangeTokenTaxRate(uint256 _newRate) external onlyOwner {
        require(_newRate <= 500, "GameTokenBridge: tax rate too high (max 5%)"); // Max 5%
        exchangeTokenTaxRate = _newRate;
        emit ExchangeTokenTaxRateUpdated(_newRate);
    }

    /**
     * @dev 设置代币充值金币的税率
     * @param _newRate 新的税率 (基点, 100 = 1%)
     */
    function setRechargeTokenTaxRate(uint256 _newRate) external onlyOwner {
        require(_newRate <= 500, "GameTokenBridge: tax rate too high (max 5%)"); // Max 5%
        rechargeTokenTaxRate = _newRate;
        emit RechargeTokenTaxRateUpdated(_newRate);
    }

    /**
     * @dev 设置兑换比例
     * @param _newRate 新的兑换比例 (1个外部代币 = _newRate个游戏金币)
     */
    function setExchangeRate(uint256 _newRate) external onlyOwner {
        require(_newRate > 0, "GameTokenBridge: exchange rate must be positive");
        exchangeRate = _newRate;
        emit ExchangeRateUpdated(_newRate);
    }

    /**
     * @dev 设置兑换限制
     * @param _min 最小兑换金额 (以外部代币的最小单位表示)
     * @param _max 最大兑换金额 (以外部代币的最小单位表示)
     */
    function setExchangeLimits(uint256 _min, uint256 _max) external onlyOwner {
        require(_min > 0, "GameTokenBridge: min amount must be positive");
        require(_max >= _min, "GameTokenBridge: max amount must be >= min amount");
        minExchangeAmount = _min;
        maxExchangeAmount = _max;
        emit ExchangeLimitsUpdated(_min, _max);
    }

    /**
     * @dev 设置操作员权限
     * @param _operator 操作员地址
     * @param _status 权限状态 (true = 授权, false = 撤销)
     */
    function setOperator(address _operator, bool _status) external onlyOwner {
        require(_operator != address(0), "GameTokenBridge: invalid operator address");
        operators[_operator] = _status;
        emit OperatorSet(_operator, _status);
    }

    /**
     * @dev 检查地址是否为操作员
     * @param _operator 要检查的地址
     * @return 是否为操作员
     */
    function isOperator(address _operator) public view returns (bool) {
        return operators[_operator];
    }

    /**
     * @dev 检查nonce是否已使用
     * @param _nonce 要检查的nonce
     * @return 是否已使用
     */
    function isNonceUsed(bytes32 _nonce) public view returns (bool) {
        return usedNonces[_nonce];
    }

    /**
     * @dev 获取合约所有者的代币余额
     * @return 合约所有者的代币余额
     */
    function getOwnerTokenBalance() public view returns (uint256) {
        return externalToken.balanceOf(owner());
    }

    /**
     * @dev 获取合约所有者对此合约的授权金额
     * @return 合约所有者对此合约的授权金额
     */
    function getOwnerAllowance() public view returns (uint256) {
        return externalToken.allowance(owner(), address(this));
    }

    /**
     * @dev 获取外部代币信息
     * @return tokenAddress 代币合约地址
     * @return tokenSymbol 代币符号
     * @return tokenDecimals 代币小数位数
     */
    function getExternalTokenInfo() public view returns (address tokenAddress, string memory tokenSymbol, uint8 tokenDecimals) {
        return (address(externalToken), externalTokenSymbol, externalTokenDecimals);
    }

    // --- 核心逻辑 ---

    /**
     * @dev 游戏金币兑换外部代币
     * 要求: 合约所有者(owner)已对此合约地址approve了足够的外部代币
     *
     * @param player 玩家地址
     * @param gameCoins 游戏金币数量
     * @param tokenAmount 期望获得的外部代币数量 (最小单位)
     * @param nonce 随机数 (防重放)
     * @param signature 游戏服务器签名
     * @return 是否成功
     */
    function exchangeFromGame(
        address player,
        uint256 gameCoins,
        uint256 tokenAmount,
        bytes32 nonce,
        bytes memory signature
    ) public nonReentrant returns (bool) {
        require(player != address(0), "GameTokenBridge: invalid player address");
        require(tokenAmount >= minExchangeAmount, "GameTokenBridge: amount below minimum");
        require(tokenAmount <= maxExchangeAmount, "GameTokenBridge: amount exceeds maximum");
        require(!usedNonces[nonce], "GameTokenBridge: nonce already used");

        // 根据外部代币的decimals计算预期的游戏金币
        // exchangeRate 定义的是 1 个完整外部代币 = exchangeRate 个游戏金币
        // tokenAmount 是以最小单位表示的，所以需要调整
        uint256 expectedGameCoins = tokenAmount * exchangeRate / (10**uint256(externalTokenDecimals));
        require(gameCoins >= expectedGameCoins, "GameTokenBridge: insufficient game coins for requested token amount");

        // 验证签名
        bytes32 messageHash = keccak256(abi.encodePacked(player, gameCoins, tokenAmount, nonce, address(this)));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(signature);
        require(signer == gameServerAddress, "GameTokenBridge: invalid signature");

        // 检查合约所有者的代币余额和授权
        uint256 ownerBalance = externalToken.balanceOf(owner());
        uint256 ownerAllowance = externalToken.allowance(owner(), address(this));
        require(ownerBalance >= tokenAmount, "GameTokenBridge: insufficient owner token balance");
        require(ownerAllowance >= tokenAmount, "GameTokenBridge: insufficient owner token allowance");

        usedNonces[nonce] = true;

        uint256 tax = tokenAmount * exchangeTokenTaxRate / 10000;
        uint256 amountToPlayer = tokenAmount - tax;

        // 合约所有者(owner)的外部代币 -> 玩家
        // 要求owner()预先approve此合约地址
        externalToken.transferFrom(owner(), player, amountToPlayer);

        if (tax > 0) {
            // 合约所有者(owner)的外部代币 -> 税收钱包
            // 要求owner()预先approve此合约地址
            externalToken.transferFrom(owner(), taxWallet, tax);
        }

        emit ExchangeFromGame(player, gameCoins, amountToPlayer, tax);
        return true;
    }

    /**
     * @dev 外部代币充值游戏金币
     * 要求: 玩家(msg.sender)已对此合约地址approve了足够的外部代币
     *
     * @param gameCoins 期望获得的游戏金币数量
     * @param tokenAmount 支付的外部代币数量 (最小单位)
     * @param nonce 随机数 (防重放)
     * @param signature 游戏服务器签名
     * @return 是否成功
     */
    function rechargeToGame(
        uint256 gameCoins,
        uint256 tokenAmount,
        bytes32 nonce,
        bytes memory signature
    ) public nonReentrant returns (bool) {
        address player = _msgSender(); // msg.sender is the player
        require(tokenAmount > 0, "GameTokenBridge: token amount must be positive");
        require(!usedNonces[nonce], "GameTokenBridge: nonce already used");

        // 检查玩家的代币余额和授权
        uint256 playerBalance = externalToken.balanceOf(player);
        uint256 playerAllowance = externalToken.allowance(player, address(this));
        require(playerBalance >= tokenAmount, "GameTokenBridge: insufficient player token balance");
        require(playerAllowance >= tokenAmount, "GameTokenBridge: insufficient player token allowance");

        // 签名验证 (gameCoins是服务器确认要给玩家的数量)
        bytes32 messageHash = keccak256(abi.encodePacked(player, tokenAmount, gameCoins, nonce, address(this), "recharge"));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(signature);
        require(signer == gameServerAddress, "GameTokenBridge: invalid signature");

        usedNonces[nonce] = true;

        uint256 tax = tokenAmount * rechargeTokenTaxRate / 10000;
        uint256 amountToOwner = tokenAmount - tax;

        // 玩家的外部代币 -> 合约所有者(owner)
        // 要求player预先approve此合约地址
        externalToken.transferFrom(player, owner(), amountToOwner);

        if (tax > 0) {
            // 玩家的外部代币 -> 税收钱包
            // 要求player预先approve此合约地址
            externalToken.transferFrom(player, taxWallet, tax);
        }

        emit RechargeToGame(player, tokenAmount, gameCoins, tax);
        return true;
    }

    /**
     * @dev 紧急提取合约所有者的代币
     * 此函数用于紧急情况下，将合约所有者的代币转移到指定地址
     * 注意：此函数不会转移合约自身持有的代币，因为合约通常不会持有代币
     *
     * @param _to 接收代币的地址
     * @param _amount 提取金额
     */
    function emergencyWithdrawOwnerTokens(address _to, uint256 _amount) external onlyOwner {
        require(_to != address(0), "GameTokenBridge: invalid recipient address");
        require(_amount > 0, "GameTokenBridge: amount must be positive");

        // 检查合约所有者的代币余额
        uint256 ownerBalance = externalToken.balanceOf(owner());
        require(ownerBalance >= _amount, "GameTokenBridge: insufficient owner token balance");

        // 直接从合约所有者转移代币到指定地址
        // 注意：这需要合约所有者直接调用代币合约的transfer方法
        // 此函数只是为了提供一个便捷的接口
        bool success = externalToken.transferFrom(owner(), _to, _amount);
        require(success, "GameTokenBridge: token transfer failed");

        emit EmergencyWithdrawal(address(externalToken), _to, _amount);
    }

    /**
     * @dev 提取意外发送到合约的ETH（仅限所有者）
     */
    function withdrawAccidentalEther() external onlyOwner {
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            (bool success, ) = owner().call{value: ethBalance}("");
            require(success, "GameTokenBridge: Ether transfer failed");
        }
    }

    /**
     * @dev 提取意外发送到合约的任何ERC20代币（非桥接代币，仅限所有者）
     * @param _tokenContractAddress 代币合约地址
     * @param _to 接收代币的地址
     * @param _amount 提取金额
     */
    function withdrawAccidentalERC20(address _tokenContractAddress, address _to, uint256 _amount) external onlyOwner {
        require(_tokenContractAddress != address(externalToken), "GameTokenBridge: Cannot withdraw bridge token");
        require(_to != address(0), "GameTokenBridge: invalid recipient address");
        require(_amount > 0, "GameTokenBridge: amount must be positive");

        IERC20 token = IERC20(_tokenContractAddress);
        uint256 contractBalance = token.balanceOf(address(this));
        require(contractBalance >= _amount, "GameTokenBridge: insufficient token balance");

        bool success = token.transfer(_to, _amount);
        require(success, "GameTokenBridge: token transfer failed");

        emit EmergencyWithdrawal(_tokenContractAddress, _to, _amount);
    }
}

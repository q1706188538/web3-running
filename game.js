(function(c) {
	var p = (void 0);
	var o = 100000;

	function L(T) {
		switch (typeof T) {
			case "undefined":
				return "undefined";
			case "boolean":
				return "boolean";
			case "number":
				return "number";
			case "string":
				return "string";
			default:
				return T === null ? "null" : "object"
		}
	}

	function b(T) {
		return Object.prototype.toString.call(T).replace(/^\[object *|\]$/g, "")
	}

	function S(T) {
		return typeof T === "function"
	}

	function f(T) {
		if (T === null || T === p) {
			throw TypeError()
		}
		return Object(T)
	}

	function d(T) {
		return T >> 0
	}

	function B(T) {
		return T >>> 0
	}
	var m = Math.LN2,
		E = Math.abs,
		g = Math.floor,
		l = Math.log,
		v = Math.max,
		R = Math.min,
		D = Math.pow,
		M = Math.round;
	(function() {
		var U = Object.defineProperty;
		var T = !(function() {
			try {
				return Object.defineProperty({}, "x", {})
			} catch (V) {
				return false
			}
		}());
		if (!U || T) {
			Object.defineProperty = function(X, Y, W) {
				if (U) {
					try {
						return U(X, Y, W)
					} catch (V) {}
				}
				if (X !== Object(X)) {
					throw TypeError("Object.defineProperty called on non-object")
				}
				if (Object.prototype.__defineGetter__ && ("get" in W)) {
					Object.prototype.__defineGetter__.call(X, Y, W.get)
				}
				if (Object.prototype.__defineSetter__ && ("set" in W)) {
					Object.prototype.__defineSetter__.call(X, Y, W.set)
				}
				if ("value" in W) {
					X[Y] = W.value
				}
				return X
			}
		}
	}());

	function q(V) {
		if (V.length > o) {
			throw RangeError("Array too large for polyfill")
		}

		function T(W) {
			Object.defineProperty(V, W, {
				get: function() {
					return V._getter(W)
				},
				set: function(X) {
					V._setter(W, X)
				},
				enumerable: true,
				configurable: false
			})
		}
		var U;
		for (U = 0; U < V.length; U += 1) {
			T(U)
		}
	}

	function J(V, U) {
		var T = 32 - U;
		return (V << T) >> T
	}

	function r(V, U) {
		var T = 32 - U;
		return (V << T) >>> T
	}

	function e(T) {
		return [T & 255]
	}

	function A(T) {
		return J(T[0], 8)
	}

	function k(T) {
		return [T & 255]
	}

	function F(T) {
		return r(T[0], 8)
	}

	function Q(T) {
		T = M(Number(T));
		return [T < 0 ? 0 : T > 255 ? 255 : T & 255]
	}

	function j(T) {
		return [(T >> 8) & 255, T & 255]
	}

	function G(T) {
		return J(T[0] << 8 | T[1], 16)
	}

	function K(T) {
		return [(T >> 8) & 255, T & 255]
	}

	function n(T) {
		return r(T[0] << 8 | T[1], 16)
	}

	function C(T) {
		return [(T >> 24) & 255, (T >> 16) & 255, (T >> 8) & 255, T & 255]
	}

	function a(T) {
		return J(T[0] << 24 | T[1] << 16 | T[2] << 8 | T[3], 32)
	}

	function h(T) {
		return [(T >> 24) & 255, (T >> 16) & 255, (T >> 8) & 255, T & 255]
	}

	function H(T) {
		return r(T[0] << 24 | T[1] << 16 | T[2] << 8 | T[3], 32)
	}

	function I(ac, U, T) {
		var W = (1 << (U - 1)) - 1,
			af, Y, X, aa, V, ad, ab, ae;

		function Z(ai) {
			var ag = g(ai),
				ah = ai - ag;
			if (ah < 0.5) {
				return ag
			}
			if (ah > 0.5) {
				return ag + 1
			}
			return ag % 2 ? ag + 1 : ag
		}
		if (ac !== ac) {
			Y = (1 << U) - 1;
			X = D(2, T - 1);
			af = 0
		} else {
			if (ac === Infinity || ac === -Infinity) {
				Y = (1 << U) - 1;
				X = 0;
				af = (ac < 0) ? 1 : 0
			} else {
				if (ac === 0) {
					Y = 0;
					X = 0;
					af = (1 / ac === -Infinity) ? 1 : 0
				} else {
					af = ac < 0;
					ac = E(ac);
					if (ac >= D(2, 1 - W)) {
						Y = R(g(l(ac) / m), 1023);
						X = Z(ac / D(2, Y) * D(2, T));
						if (X / D(2, T) >= 2) {
							Y = Y + 1;
							X = 1
						}
						if (Y > W) {
							Y = (1 << U) - 1;
							X = 0
						} else {
							Y = Y + W;
							X = X - D(2, T)
						}
					} else {
						Y = 0;
						X = Z(ac / D(2, 1 - W - T))
					}
				}
			}
		}
		ad = [];
		for (V = T; V; V -= 1) {
			ad.push(X % 2 ? 1 : 0);
			X = g(X / 2)
		}
		for (V = U; V; V -= 1) {
			ad.push(Y % 2 ? 1 : 0);
			Y = g(Y / 2)
		}
		ad.push(af ? 1 : 0);
		ad.reverse();
		ab = ad.join("");
		ae = [];
		while (ab.length) {
			ae.push(parseInt(ab.substring(0, 8), 2));
			ab = ab.substring(8)
		}
		return ae
	}

	function P(ae, U, T) {
		var ac = [],
			W, V, ab, aa, X, ad, Z, Y;
		for (W = ae.length; W; W -= 1) {
			ab = ae[W - 1];
			for (V = 8; V; V -= 1) {
				ac.push(ab % 2 ? 1 : 0);
				ab = ab >> 1
			}
		}
		ac.reverse();
		aa = ac.join("");
		X = (1 << (U - 1)) - 1;
		ad = parseInt(aa.substring(0, 1), 2) ? -1 : 1;
		Z = parseInt(aa.substring(1, 1 + U), 2);
		Y = parseInt(aa.substring(1 + U), 2);
		if (Z === (1 << U) - 1) {
			return Y !== 0 ? NaN : ad * Infinity
		} else {
			if (Z > 0) {
				return ad * D(2, Z - X) * (1 + Y / D(2, T))
			} else {
				if (Y !== 0) {
					return ad * D(2, -(X - 1)) * (Y / D(2, T))
				} else {
					return ad < 0 ? -0 : 0
				}
			}
		}
	}

	function u(T) {
		return P(T, 11, 52)
	}

	function O(T) {
		return I(T, 11, 52)
	}

	function t(T) {
		return P(T, 8, 23)
	}

	function N(T) {
		return I(T, 8, 23)
	}(function() {
		function ac(ah) {
			ah = d(ah);
			if (ah < 0) {
				throw RangeError("ArrayBuffer size is not a small enough positive integer.")
			}
			Object.defineProperty(this, "byteLength", {
				value: ah
			});
			Object.defineProperty(this, "_bytes", {
				value: Array(ah)
			});
			for (var ag = 0; ag < ah; ag += 1) {
				this._bytes[ag] = 0
			}
		}
		c.ArrayBuffer = c.ArrayBuffer || ac;

		function ab() {
			if (!arguments.length || typeof arguments[0] !== "object") {
				return (function(ag) {
					ag = d(ag);
					if (ag < 0) {
						throw RangeError("length is not a small enough positive integer.")
					}
					Object.defineProperty(this, "length", {
						value: ag
					});
					Object.defineProperty(this, "byteLength", {
						value: ag * this.BYTES_PER_ELEMENT
					});
					Object.defineProperty(this, "buffer", {
						value: new ac(this.byteLength)
					});
					Object.defineProperty(this, "byteOffset", {
						value: 0
					})
				}).apply(this, arguments)
			}
			if (arguments.length >= 1 && L(arguments[0]) === "object" && arguments[0] instanceof ab) {
				return (function(ai) {
					if (this.constructor !== ai.constructor) {
						throw TypeError()
					}
					var ag = ai.length * this.BYTES_PER_ELEMENT;
					Object.defineProperty(this, "buffer", {
						value: new ac(ag)
					});
					Object.defineProperty(this, "byteLength", {
						value: ag
					});
					Object.defineProperty(this, "byteOffset", {
						value: 0
					});
					Object.defineProperty(this, "length", {
						value: ai.length
					});
					for (var ah = 0; ah < this.length; ah += 1) {
						this._setter(ah, ai._getter(ah))
					}
				}).apply(this, arguments)
			}
			if (arguments.length >= 1 && L(arguments[0]) === "object" && !(arguments[0] instanceof ab) && !(arguments[0] instanceof ac || b(arguments[0]) === "ArrayBuffer")) {
				return (function(aj) {
					var ag = aj.length * this.BYTES_PER_ELEMENT;
					Object.defineProperty(this, "buffer", {
						value: new ac(ag)
					});
					Object.defineProperty(this, "byteLength", {
						value: ag
					});
					Object.defineProperty(this, "byteOffset", {
						value: 0
					});
					Object.defineProperty(this, "length", {
						value: aj.length
					});
					for (var ah = 0; ah < this.length; ah += 1) {
						var ai = aj[ah];
						this._setter(ah, Number(ai))
					}
				}).apply(this, arguments)
			}
			if (arguments.length >= 1 && L(arguments[0]) === "object" && (arguments[0] instanceof ac || b(arguments[0]) === "ArrayBuffer")) {
				return (function(ag, ai, aj) {
					ai = B(ai);
					if (ai > ag.byteLength) {
						throw RangeError("byteOffset out of range")
					}
					if (ai % this.BYTES_PER_ELEMENT) {
						throw RangeError("buffer length minus the byteOffset is not a multiple of the element size.")
					}
					if (aj === p) {
						var ah = ag.byteLength - ai;
						if (ah % this.BYTES_PER_ELEMENT) {
							throw RangeError("length of buffer minus byteOffset not a multiple of the element size")
						}
						aj = ah / this.BYTES_PER_ELEMENT
					} else {
						aj = B(aj);
						ah = aj * this.BYTES_PER_ELEMENT
					}
					if ((ai + ah) > ag.byteLength) {
						throw RangeError("byteOffset and length reference an area beyond the end of the buffer")
					}
					Object.defineProperty(this, "buffer", {
						value: ag
					});
					Object.defineProperty(this, "byteLength", {
						value: ah
					});
					Object.defineProperty(this, "byteOffset", {
						value: ai
					});
					Object.defineProperty(this, "length", {
						value: aj
					})
				}).apply(this, arguments)
			}
			throw TypeError()
		}
		Object.defineProperty(ab, "from", {
			value: function(ag) {
				return new this(ag)
			}
		});
		Object.defineProperty(ab, "of", {
			value: function() {
				return new this(arguments)
			}
		});
		var W = {};
		ab.prototype = W;
		Object.defineProperty(ab.prototype, "_getter", {
			value: function(ah) {
				if (arguments.length < 1) {
					throw SyntaxError("Not enough arguments")
				}
				ah = B(ah);
				if (ah >= this.length) {
					return p
				}
				var ag = [],
					ai, aj;
				for (ai = 0, aj = this.byteOffset + ah * this.BYTES_PER_ELEMENT; ai < this.BYTES_PER_ELEMENT; ai += 1, aj += 1) {
					ag.push(this.buffer._bytes[aj])
				}
				return this._unpack(ag)
			}
		});
		Object.defineProperty(ab.prototype, "get", {
			value: ab.prototype._getter
		});
		Object.defineProperty(ab.prototype, "_setter", {
			value: function(ah, aj) {
				if (arguments.length < 2) {
					throw SyntaxError("Not enough arguments")
				}
				ah = B(ah);
				if (ah >= this.length) {
					return
				}
				var ag = this._pack(aj),
					ai, ak;
				for (ai = 0, ak = this.byteOffset + ah * this.BYTES_PER_ELEMENT; ai < this.BYTES_PER_ELEMENT; ai += 1, ak += 1) {
					this.buffer._bytes[ak] = ag[ai]
				}
			}
		});
		Object.defineProperty(ab.prototype, "constructor", {
			value: ab
		});
		Object.defineProperty(ab.prototype, "copyWithin", {
			value: function(am, ag) {
				var ai = arguments[2];
				var ah = f(this);
				var au = ah.length;
				var al = B(au);
				al = v(al, 0);
				var an = d(am);
				var ar;
				if (an < 0) {
					ar = v(al + an, 0)
				} else {
					ar = R(an, al)
				}
				var ak = d(ag);
				var aq;
				if (ak < 0) {
					aq = v(al + ak, 0)
				} else {
					aq = R(ak, al)
				}
				var at;
				if (ai === p) {
					at = al
				} else {
					at = d(ai)
				}
				var ao;
				if (at < 0) {
					ao = v(al + at, 0)
				} else {
					ao = R(at, al)
				}
				var aj = R(ao - aq, al - ar);
				var ap;
				if (aq < ar && ar < aq + aj) {
					ap = -1;
					aq = aq + aj - 1;
					ar = ar + aj - 1
				} else {
					ap = 1
				}
				while (aj > 0) {
					ah._setter(ar, ah._getter(aq));
					aq = aq + ap;
					ar = ar + ap;
					aj = aj - 1
				}
				return ah
			}
		});
		Object.defineProperty(ab.prototype, "every", {
			value: function(ah) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var ak = Object(this);
				var ag = B(ak.length);
				if (!S(ah)) {
					throw TypeError()
				}
				var ai = arguments[1];
				for (var aj = 0; aj < ag; aj++) {
					if (!ah.call(ai, ak._getter(aj), aj, ak)) {
						return false
					}
				}
				return true
			}
		});
		Object.defineProperty(ab.prototype, "fill", {
			value: function(an) {
				var ag = arguments[1],
					aj = arguments[2];
				var ah = f(this);
				var ap = ah.length;
				var al = B(ap);
				al = v(al, 0);
				var ak = d(ag);
				var ai;
				if (ak < 0) {
					ai = v((al + ak), 0)
				} else {
					ai = R(ak, al)
				}
				var ao;
				if (aj === p) {
					ao = al
				} else {
					ao = d(aj)
				}
				var am;
				if (ao < 0) {
					am = v((al + ao), 0)
				} else {
					am = R(ao, al)
				}
				while (ai < am) {
					ah._setter(ai, an);
					ai += 1
				}
				return ah
			}
		});
		Object.defineProperty(ab.prototype, "filter", {
			value: function(ah) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var al = Object(this);
				var ag = B(al.length);
				if (!S(ah)) {
					throw TypeError()
				}
				var ak = [];
				var aj = arguments[1];
				for (var ai = 0; ai < ag; ai++) {
					var am = al._getter(ai);
					if (ah.call(aj, am, ai, al)) {
						ak.push(am)
					}
				}
				return new this.constructor(ak)
			}
		});
		Object.defineProperty(ab.prototype, "find", {
			value: function(ai) {
				var an = f(this);
				var al = an.length;
				var ah = B(al);
				if (!S(ai)) {
					throw TypeError()
				}
				var ak = arguments.length > 1 ? arguments[1] : p;
				var aj = 0;
				while (aj < ah) {
					var am = an._getter(aj);
					var ag = ai.call(ak, am, aj, an);
					if (Boolean(ag)) {
						return am
					}++aj
				}
				return p
			}
		});
		Object.defineProperty(ab.prototype, "findIndex", {
			value: function(ai) {
				var an = f(this);
				var al = an.length;
				var ah = B(al);
				if (!S(ai)) {
					throw TypeError()
				}
				var ak = arguments.length > 1 ? arguments[1] : p;
				var aj = 0;
				while (aj < ah) {
					var am = an._getter(aj);
					var ag = ai.call(ak, am, aj, an);
					if (Boolean(ag)) {
						return aj
					}++aj
				}
				return -1
			}
		});
		Object.defineProperty(ab.prototype, "forEach", {
			value: function(ah) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var ak = Object(this);
				var ag = B(ak.length);
				if (!S(ah)) {
					throw TypeError()
				}
				var aj = arguments[1];
				for (var ai = 0; ai < ag; ai++) {
					ah.call(aj, ak._getter(ai), ai, ak)
				}
			}
		});
		Object.defineProperty(ab.prototype, "indexOf", {
			value: function(ai) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var aj = Object(this);
				var ag = B(aj.length);
				if (ag === 0) {
					return -1
				}
				var ak = 0;
				if (arguments.length > 0) {
					ak = Number(arguments[1]);
					if (ak !== ak) {
						ak = 0
					} else {
						if (ak !== 0 && ak !== (1 / 0) && ak !== -(1 / 0)) {
							ak = (ak > 0 || -1) * g(E(ak))
						}
					}
				}
				if (ak >= ag) {
					return -1
				}
				var ah = ak >= 0 ? ak : v(ag - E(ak), 0);
				for (; ah < ag; ah++) {
					if (aj._getter(ah) === ai) {
						return ah
					}
				}
				return -1
			}
		});
		Object.defineProperty(ab.prototype, "join", {
			value: function(ak) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var aj = Object(this);
				var ag = B(aj.length);
				var ai = Array(ag);
				for (var ah = 0; ah < ag; ++ah) {
					ai[ah] = aj._getter(ah)
				}
				return ai.join(ak === p ? "," : ak)
			}
		});
		Object.defineProperty(ab.prototype, "lastIndexOf", {
			value: function(ai) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var aj = Object(this);
				var ag = B(aj.length);
				if (ag === 0) {
					return -1
				}
				var ak = ag;
				if (arguments.length > 1) {
					ak = Number(arguments[1]);
					if (ak !== ak) {
						ak = 0
					} else {
						if (ak !== 0 && ak !== (1 / 0) && ak !== -(1 / 0)) {
							ak = (ak > 0 || -1) * g(E(ak))
						}
					}
				}
				var ah = ak >= 0 ? R(ak, ag - 1) : ag - E(ak);
				for (; ah >= 0; ah--) {
					if (aj._getter(ah) === ai) {
						return ah
					}
				}
				return -1
			}
		});
		Object.defineProperty(ab.prototype, "map", {
			value: function(ah) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var al = Object(this);
				var ag = B(al.length);
				if (!S(ah)) {
					throw TypeError()
				}
				var ak = [];
				ak.length = ag;
				var aj = arguments[1];
				for (var ai = 0; ai < ag; ai++) {
					ak[ai] = ah.call(aj, al._getter(ai), ai, al)
				}
				return new this.constructor(ak)
			}
		});
		Object.defineProperty(ab.prototype, "reduce", {
			value: function(ah) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var ak = Object(this);
				var ag = B(ak.length);
				if (!S(ah)) {
					throw TypeError()
				}
				if (ag === 0 && arguments.length === 1) {
					throw TypeError()
				}
				var aj = 0;
				var ai;
				if (arguments.length >= 2) {
					ai = arguments[1]
				} else {
					ai = ak._getter(aj++)
				}
				while (aj < ag) {
					ai = ah.call(p, ai, ak._getter(aj), aj, ak);
					aj++
				}
				return ai
			}
		});
		Object.defineProperty(ab.prototype, "reduceRight", {
			value: function(ah) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var ak = Object(this);
				var ag = B(ak.length);
				if (!S(ah)) {
					throw TypeError()
				}
				if (ag === 0 && arguments.length === 1) {
					throw TypeError()
				}
				var aj = ag - 1;
				var ai;
				if (arguments.length >= 2) {
					ai = arguments[1]
				} else {
					ai = ak._getter(aj--)
				}
				while (aj >= 0) {
					ai = ah.call(p, ai, ak._getter(aj), aj, ak);
					aj--
				}
				return ai
			}
		});
		Object.defineProperty(ab.prototype, "reverse", {
			value: function() {
				if (this === p || this === null) {
					throw TypeError()
				}
				var ak = Object(this);
				var ag = B(ak.length);
				var al = g(ag / 2);
				for (var aj = 0, ah = ag - 1; aj < al; ++aj, --ah) {
					var ai = ak._getter(aj);
					ak._setter(aj, ak._getter(ah));
					ak._setter(ah, ai)
				}
				return ak
			}
		});
		Object.defineProperty(ab.prototype, "set", {
			value: function(al, ap) {
				if (arguments.length < 1) {
					throw SyntaxError("Not enough arguments")
				}
				var an, ah, ai, am, ak, ar, ao, ag, aq, aj;
				if (typeof arguments[0] === "object" && arguments[0].constructor === this.constructor) {
					an = arguments[0];
					ai = B(arguments[1]);
					if (ai + an.length > this.length) {
						throw RangeError("Offset plus length of array is out of range")
					}
					ag = this.byteOffset + ai * this.BYTES_PER_ELEMENT;
					aq = an.length * this.BYTES_PER_ELEMENT;
					if (an.buffer === this.buffer) {
						aj = [];
						for (ak = 0, ar = an.byteOffset; ak < aq; ak += 1, ar += 1) {
							aj[ak] = an.buffer._bytes[ar]
						}
						for (ak = 0, ao = ag; ak < aq; ak += 1, ao += 1) {
							this.buffer._bytes[ao] = aj[ak]
						}
					} else {
						for (ak = 0, ar = an.byteOffset, ao = ag; ak < aq; ak += 1, ar += 1, ao += 1) {
							this.buffer._bytes[ao] = an.buffer._bytes[ar]
						}
					}
				} else {
					if (typeof arguments[0] === "object" && typeof arguments[0].length !== "undefined") {
						ah = arguments[0];
						am = B(ah.length);
						ai = B(arguments[1]);
						if (ai + am > this.length) {
							throw RangeError("Offset plus length of array is out of range")
						}
						for (ak = 0; ak < am; ak += 1) {
							ar = ah[ak];
							this._setter(ai + ak, Number(ar))
						}
					} else {
						throw TypeError("Unexpected argument type(s)")
					}
				}
			}
		});
		Object.defineProperty(ab.prototype, "slice", {
			value: function(ag, ak) {
				var ah = f(this);
				var au = ah.length;
				var ao = B(au);
				var an = d(ag);
				var aj = (an < 0) ? v(ao + an, 0) : R(an, ao);
				var at = (ak === p) ? ao : d(ak);
				var aq = (at < 0) ? v(ao + at, 0) : R(at, ao);
				var am = aq - aj;
				var ap = ah.constructor;
				var ar = new ap(am);
				var ai = 0;
				while (aj < aq) {
					var al = ah._getter(aj);
					ar._setter(ai, al);
					++aj;
					++ai
				}
				return ar
			}
		});
		Object.defineProperty(ab.prototype, "some", {
			value: function(ah) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var ak = Object(this);
				var ag = B(ak.length);
				if (!S(ah)) {
					throw TypeError()
				}
				var aj = arguments[1];
				for (var ai = 0; ai < ag; ai++) {
					if (ah.call(aj, ak._getter(ai), ai, ak)) {
						return true
					}
				}
				return false
			}
		});
		Object.defineProperty(ab.prototype, "sort", {
			value: function(ak) {
				if (this === p || this === null) {
					throw TypeError()
				}
				var aj = Object(this);
				var ag = B(aj.length);
				var ai = Array(ag);
				for (var ah = 0; ah < ag; ++ah) {
					ai[ah] = aj._getter(ah)
				}
				if (ak) {
					ai.sort(ak)
				} else {
					ai.sort()
				}
				for (ah = 0; ah < ag; ++ah) {
					aj._setter(ah, ai[ah])
				}
				return aj
			}
		});
		Object.defineProperty(ab.prototype, "subarray", {
			value: function(aj, ah) {
				function ai(al, am, ak) {
					return al < am ? am : al > ak ? ak : al
				}
				aj = d(aj);
				ah = d(ah);
				if (arguments.length < 1) {
					aj = 0
				}
				if (arguments.length < 2) {
					ah = this.length
				}
				if (aj < 0) {
					aj = this.length + aj
				}
				if (ah < 0) {
					ah = this.length + ah
				}
				aj = ai(aj, 0, this.length);
				ah = ai(ah, 0, this.length);
				var ag = ah - aj;
				if (ag < 0) {
					ag = 0
				}
				return new this.constructor(this.buffer, this.byteOffset + aj * this.BYTES_PER_ELEMENT, ag)
			}
		});

		function Z(ag, ai, ak) {
			var ah = function() {
				Object.defineProperty(this, "constructor", {
					value: ah
				});
				ab.apply(this, arguments);
				q(this)
			};
			if ("__proto__" in ah) {
				ah.__proto__ = ab
			} else {
				ah.from = ab.from;
				ah.of = ab.of
			}
			ah.BYTES_PER_ELEMENT = ag;
			var aj = function() {};
			aj.prototype = W;
			ah.prototype = new aj();
			Object.defineProperty(ah.prototype, "BYTES_PER_ELEMENT", {
				value: ag
			});
			Object.defineProperty(ah.prototype, "_pack", {
				value: ai
			});
			Object.defineProperty(ah.prototype, "_unpack", {
				value: ak
			});
			return ah
		}
		var Y = Z(1, e, A);
		var af = Z(1, k, F);
		var ad = Z(1, Q, F);
		var X = Z(2, j, G);
		var U = Z(2, K, n);
		var T = Z(4, C, a);
		var ae = Z(4, h, H);
		var aa = Z(4, N, t);
		var V = Z(8, O, u);
		c.Int8Array = c.Int8Array || Y;
		c.Uint8Array = c.Uint8Array || af;
		c.Uint8ClampedArray = c.Uint8ClampedArray || ad;
		c.Int16Array = c.Int16Array || X;
		c.Uint16Array = c.Uint16Array || U;
		c.Int32Array = c.Int32Array || T;
		c.Uint32Array = c.Uint32Array || ae;
		c.Float32Array = c.Float32Array || aa;
		c.Float64Array = c.Float64Array || V
	}());
	(function() {
		function V(Z, Y) {
			return S(Z.get) ? Z.get(Y) : Z[Y]
		}
		var W = (function() {
			var Z = new Uint16Array([4660]),
				Y = new Uint8Array(Z.buffer);
			return V(Y, 0) === 18
		}());

		function X(Y, aa, Z) {
			if (!(Y instanceof ArrayBuffer || b(Y) === "ArrayBuffer")) {
				throw TypeError()
			}
			aa = B(aa);
			if (aa > Y.byteLength) {
				throw RangeError("byteOffset out of range")
			}
			if (Z === p) {
				Z = Y.byteLength - aa
			} else {
				Z = B(Z)
			}
			if ((aa + Z) > Y.byteLength) {
				throw RangeError("byteOffset and length reference an area beyond the end of the buffer")
			}
			Object.defineProperty(this, "buffer", {
				value: Y
			});
			Object.defineProperty(this, "byteLength", {
				value: Z
			});
			Object.defineProperty(this, "byteOffset", {
				value: aa
			})
		}

		function T(Z) {
			return function Y(ac, ae) {
				ac = B(ac);
				if (ac + Z.BYTES_PER_ELEMENT > this.byteLength) {
					throw RangeError("Array index out of range")
				}
				ac += this.byteOffset;
				var ad = new Uint8Array(this.buffer, ac, Z.BYTES_PER_ELEMENT),
					aa = [];
				for (var ab = 0; ab < Z.BYTES_PER_ELEMENT; ab += 1) {
					aa.push(V(ad, ab))
				}
				if (Boolean(ae) === Boolean(W)) {
					aa.reverse()
				}
				return V(new Z(new Uint8Array(aa).buffer), 0)
			}
		}
		Object.defineProperty(X.prototype, "getUint8", {
			value: T(Uint8Array)
		});
		Object.defineProperty(X.prototype, "getInt8", {
			value: T(Int8Array)
		});
		Object.defineProperty(X.prototype, "getUint16", {
			value: T(Uint16Array)
		});
		Object.defineProperty(X.prototype, "getInt16", {
			value: T(Int16Array)
		});
		Object.defineProperty(X.prototype, "getUint32", {
			value: T(Uint32Array)
		});
		Object.defineProperty(X.prototype, "getInt32", {
			value: T(Int32Array)
		});
		Object.defineProperty(X.prototype, "getFloat32", {
			value: T(Float32Array)
		});
		Object.defineProperty(X.prototype, "getFloat64", {
			value: T(Float64Array)
		});

		function U(Z) {
			return function Y(ae, af, ag) {
				ae = B(ae);
				if (ae + Z.BYTES_PER_ELEMENT > this.byteLength) {
					throw RangeError("Array index out of range")
				}
				var ah = new Z([af]),
					ab = new Uint8Array(ah.buffer),
					aa = [],
					ad, ac;
				for (ad = 0; ad < Z.BYTES_PER_ELEMENT; ad += 1) {
					aa.push(V(ab, ad))
				}
				if (Boolean(ag) === Boolean(W)) {
					aa.reverse()
				}
				ac = new Uint8Array(this.buffer, ae, Z.BYTES_PER_ELEMENT);
				ac.set(aa)
			}
		}
		Object.defineProperty(X.prototype, "setUint8", {
			value: U(Uint8Array)
		});
		Object.defineProperty(X.prototype, "setInt8", {
			value: U(Int8Array)
		});
		Object.defineProperty(X.prototype, "setUint16", {
			value: U(Uint16Array)
		});
		Object.defineProperty(X.prototype, "setInt16", {
			value: U(Int16Array)
		});
		Object.defineProperty(X.prototype, "setUint32", {
			value: U(Uint32Array)
		});
		Object.defineProperty(X.prototype, "setInt32", {
			value: U(Int32Array)
		});
		Object.defineProperty(X.prototype, "setFloat32", {
			value: U(Float32Array)
		});
		Object.defineProperty(X.prototype, "setFloat64", {
			value: U(Float64Array)
		});
		c.DataView = c.DataView || X
	}())
}(this));
(function(c) {
	var d = /iPhone/i,
		f = /iPod/i,
		h = /iPad/i,
		b = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
		p = /Android/i,
		k = /IEMobile/i,
		e = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
		o = /BlackBerry/i,
		m = /BB10/i,
		l = /Opera Mini/i,
		a = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
		j = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i");
	var g = function(r, t) {
		return r.test(t)
	};
	var n = function(t) {
		var r = t || navigator.userAgent;
		this.apple = {
			phone: g(d, r),
			ipod: g(f, r),
			tablet: g(h, r),
			device: g(d, r) || g(f, r) || g(h, r)
		};
		this.android = {
			phone: g(b, r),
			tablet: !g(b, r) && g(p, r),
			device: g(b, r) || g(p, r)
		};
		this.windows = {
			phone: g(k, r),
			tablet: g(e, r),
			device: g(k, r) || g(e, r)
		};
		this.other = {
			blackberry: g(o, r),
			blackberry10: g(m, r),
			opera: g(l, r),
			firefox: g(a, r),
			device: g(o, r) || g(m, r) || g(l, r) || g(a, r)
		};
		this.seven_inch = g(j, r);
		this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
		this.phone = this.apple.phone || this.android.phone || this.windows.phone;
		this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;
		if (typeof window === "undefined") {
			return this
		}
	};
	var q = function() {
		var r = new n();
		r.Class = n;
		return r
	};
	if (typeof module != "undefined" && module.exports && typeof window === "undefined") {
		module.exports = n
	} else {
		if (typeof module != "undefined" && module.exports && typeof window !== "undefined") {
			module.exports = q()
		} else {
			if (typeof define === "function" && define.amd) {
				define(q())
			} else {
				c.isMobile = q()
			}
		}
	}
})(this);
/*!
 * SoundJS
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
;
this.createjs = this.createjs || {};
(function() {
	var a = createjs.SoundJS = createjs.SoundJS || {};
	a.version = "NEXT";
	a.buildDate = "Thu, 29 Oct 2015 03:02:56 GMT"
})();
this.createjs = this.createjs || {};
createjs.extend = function(a, c) {
	function b() {
		this.constructor = a
	}
	b.prototype = c.prototype;
	return (a.prototype = new b())
};
this.createjs = this.createjs || {};
createjs.promote = function(b, d) {
	var c = b.prototype,
		a = (Object.getPrototypeOf && Object.getPrototypeOf(c)) || c.__proto__;
	if (a) {
		c[(d += "_") + "constructor"] = a.constructor;
		for (var e in a) {
			if (c.hasOwnProperty(e) && (typeof a[e] == "function")) {
				c[d + e] = a[e]
			}
		}
	}
	return b
};
this.createjs = this.createjs || {};
createjs.indexOf = function(d, b) {
	for (var c = 0, a = d.length; c < a; c++) {
		if (b === d[c]) {
			return c
		}
	}
	return -1
};
this.createjs = this.createjs || {};
(function() {
	createjs.proxy = function(c, a) {
		var b = Array.prototype.slice.call(arguments, 2);
		return function() {
			return c.apply(a, Array.prototype.slice.call(arguments, 0).concat(b))
		}
	}
}());
this.createjs = this.createjs || {};
(function() {
	function a() {
		throw "BrowserDetect cannot be instantiated"
	}
	var b = a.agent = window.navigator.userAgent;
	a.isWindowPhone = (b.indexOf("IEMobile") > -1) || (b.indexOf("Windows Phone") > -1);
	a.isFirefox = (b.indexOf("Firefox") > -1);
	a.isOpera = (window.opera != null);
	a.isChrome = (b.indexOf("Chrome") > -1);
	a.isIOS = (b.indexOf("iPod") > -1 || b.indexOf("iPhone") > -1 || b.indexOf("iPad") > -1) && !a.isWindowPhone;
	a.isAndroid = (b.indexOf("Android") > -1) && !a.isWindowPhone;
	a.isBlackberry = (b.indexOf("Blackberry") > -1);
	createjs.BrowserDetect = a
}());
this.createjs = this.createjs || {};
(function() {
	function a() {
		this._listeners = null;
		this._captureListeners = null
	}
	var b = a.prototype;
	a.initialize = function(c) {
		c.addEventListener = b.addEventListener;
		c.on = b.on;
		c.removeEventListener = c.off = b.removeEventListener;
		c.removeAllEventListeners = b.removeAllEventListeners;
		c.hasEventListener = b.hasEventListener;
		c.dispatchEvent = b.dispatchEvent;
		c._dispatchEvent = b._dispatchEvent;
		c.willTrigger = b.willTrigger
	};
	b.addEventListener = function(f, g, d) {
		var e;
		if (d) {
			e = this._captureListeners = this._captureListeners || {}
		} else {
			e = this._listeners = this._listeners || {}
		}
		var c = e[f];
		if (c) {
			this.removeEventListener(f, g, d)
		}
		c = e[f];
		if (!c) {
			e[f] = [g]
		} else {
			c.push(g)
		}
		return g
	};
	b.on = function(f, h, e, d, g, c) {
		if (h.handleEvent) {
			e = e || h;
			h = h.handleEvent
		}
		e = e || this;
		return this.addEventListener(f, function(j) {
			h.call(e, j, g);
			d && j.remove()
		}, c)
	};
	b.removeEventListener = function(h, j, d) {
		var g = d ? this._captureListeners : this._listeners;
		if (!g) {
			return
		}
		var c = g[h];
		if (!c) {
			return
		}
		for (var f = 0, e = c.length; f < e; f++) {
			if (c[f] == j) {
				if (e == 1) {
					delete(g[h])
				} else {
					c.splice(f, 1)
				}
				break
			}
		}
	};
	b.off = b.removeEventListener;
	b.removeAllEventListeners = function(c) {
		if (!c) {
			this._listeners = this._captureListeners = null
		} else {
			if (this._listeners) {
				delete(this._listeners[c])
			}
			if (this._captureListeners) {
				delete(this._captureListeners[c])
			}
		}
	};
	b.dispatchEvent = function(h) {
		if (typeof h == "string") {
			var f = this._listeners;
			if (!f || !f[h]) {
				return false
			}
			h = new createjs.Event(h)
		} else {
			if (h.target && h.clone) {
				h = h.clone()
			}
		}
		try {
			h.target = this
		} catch (k) {}
		if (!h.bubbles || !this.parent) {
			this._dispatchEvent(h, 2)
		} else {
			var j = this,
				g = [j];
			while (j.parent) {
				g.push(j = j.parent)
			}
			var d, c = g.length;
			for (d = c - 1; d >= 0 && !h.propagationStopped; d--) {
				g[d]._dispatchEvent(h, 1 + (d == 0))
			}
			for (d = 1; d < c && !h.propagationStopped; d++) {
				g[d]._dispatchEvent(h, 3)
			}
		}
		return h.defaultPrevented
	};
	b.hasEventListener = function(e) {
		var d = this._listeners,
			c = this._captureListeners;
		return !!((d && d[e]) || (c && c[e]))
	};
	b.willTrigger = function(c) {
		var d = this;
		while (d) {
			if (d.hasEventListener(c)) {
				return true
			}
			d = d.parent
		}
		return false
	};
	b.toString = function() {
		return "[EventDispatcher]"
	};
	b._dispatchEvent = function(j, f) {
		var d, h = (f == 1) ? this._captureListeners : this._listeners;
		if (j && h) {
			var c = h[j.type];
			if (!c || !(d = c.length)) {
				return
			}
			try {
				j.currentTarget = this
			} catch (k) {}
			try {
				j.eventPhase = f
			} catch (k) {}
			j.removed = false;
			c = c.slice();
			for (var g = 0; g < d && !j.immediatePropagationStopped; g++) {
				var m = c[g];
				if (m.handleEvent) {
					m.handleEvent(j)
				} else {
					m(j)
				}
				if (j.removed) {
					this.off(j.type, m, f == 1);
					j.removed = false
				}
			}
		}
	};
	createjs.EventDispatcher = a
}());
this.createjs = this.createjs || {};
(function() {
	function a(e, d, c) {
		this.type = e;
		this.target = null;
		this.currentTarget = null;
		this.eventPhase = 0;
		this.bubbles = !!d;
		this.cancelable = !!c;
		this.timeStamp = (new Date()).getTime();
		this.defaultPrevented = false;
		this.propagationStopped = false;
		this.immediatePropagationStopped = false;
		this.removed = false
	}
	var b = a.prototype;
	b.preventDefault = function() {
		this.defaultPrevented = this.cancelable && true
	};
	b.stopPropagation = function() {
		this.propagationStopped = true
	};
	b.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true
	};
	b.remove = function() {
		this.removed = true
	};
	b.clone = function() {
		return new a(this.type, this.bubbles, this.cancelable)
	};
	b.set = function(c) {
		for (var d in c) {
			this[d] = c[d]
		}
		return this
	};
	b.toString = function() {
		return "[Event (type=" + this.type + ")]"
	};
	createjs.Event = a
}());
this.createjs = this.createjs || {};
(function() {
	function a(e, c, d) {
		this.Event_constructor("error");
		this.title = e;
		this.message = c;
		this.data = d
	}
	var b = createjs.extend(a, createjs.Event);
	b.clone = function() {
		return new createjs.ErrorEvent(this.title, this.message, this.data)
	};
	createjs.ErrorEvent = createjs.promote(a, "Event")
}());
this.createjs = this.createjs || {};
(function(a) {
	function b(d, e) {
		this.Event_constructor("progress");
		this.loaded = d;
		this.total = (e == null) ? 1 : e;
		this.progress = (e == 0) ? 0 : this.loaded / this.total
	}
	var c = createjs.extend(b, createjs.Event);
	c.clone = function() {
		return new createjs.ProgressEvent(this.loaded, this.total)
	};
	createjs.ProgressEvent = createjs.promote(b, "Event")
}(window));
this.createjs = this.createjs || {};
(function() {
	function a() {
		this.src = null;
		this.type = null;
		this.id = null;
		this.maintainOrder = false;
		this.callback = null;
		this.data = null;
		this.method = createjs.LoadItem.GET;
		this.values = null;
		this.headers = null;
		this.withCredentials = false;
		this.mimeType = null;
		this.crossOrigin = null;
		this.loadTimeout = b.LOAD_TIMEOUT_DEFAULT
	}
	var c = a.prototype = {};
	var b = a;
	b.LOAD_TIMEOUT_DEFAULT = 8000;
	b.create = function(e) {
		if (typeof e == "string") {
			var d = new a();
			d.src = e;
			return d
		} else {
			if (e instanceof b) {
				return e
			} else {
				if (e instanceof Object && e.src) {
					if (e.loadTimeout == null) {
						e.loadTimeout = b.LOAD_TIMEOUT_DEFAULT
					}
					return e
				} else {
					throw new Error("Type not recognized.")
				}
			}
		}
	};
	c.set = function(d) {
		for (var e in d) {
			this[e] = d[e]
		}
		return this
	};
	createjs.LoadItem = b
}());
(function() {
	var a = {};
	a.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i;
	a.RELATIVE_PATT = (/^[./]*?\//i);
	a.EXTENSION_PATT = /\/?[^/]+\.(\w{1,5})$/i;
	a.parseURI = function(d) {
		var c = {
			absolute: false,
			relative: false
		};
		if (d == null) {
			return c
		}
		var e = d.indexOf("?");
		if (e > -1) {
			d = d.substr(0, e)
		}
		var b;
		if (a.ABSOLUTE_PATT.test(d)) {
			c.absolute = true
		} else {
			if (a.RELATIVE_PATT.test(d)) {
				c.relative = true
			}
		}
		if (b = d.match(a.EXTENSION_PATT)) {
			c.extension = b[1].toLowerCase()
		}
		return c
	};
	a.formatQueryString = function(c, b) {
		if (c == null) {
			throw new Error("You must specify data.")
		}
		var d = [];
		for (var e in c) {
			d.push(e + "=" + escape(c[e]))
		}
		if (b) {
			d = d.concat(b)
		}
		return d.join("&")
	};
	a.buildPath = function(f, e) {
		if (e == null) {
			return f
		}
		var d = [];
		var b = f.indexOf("?");
		if (b != -1) {
			var c = f.slice(b + 1);
			d = d.concat(c.split("&"))
		}
		if (b != -1) {
			return f.slice(0, b) + "?" + this._formatQueryString(e, d)
		} else {
			return f + "?" + this._formatQueryString(e, d)
		}
	};
	a.isCrossDomain = function(c) {
		var e = document.createElement("a");
		e.href = c.src;
		var b = document.createElement("a");
		b.href = location.href;
		var d = (e.hostname != "") && (e.port != b.port || e.protocol != b.protocol || e.hostname != b.hostname);
		return d
	};
	a.isLocal = function(b) {
		var c = document.createElement("a");
		c.href = b.src;
		return c.hostname == "" && c.protocol == "file:"
	};
	a.isBinary = function(b) {
		switch (b) {
			case createjs.AbstractLoader.IMAGE:
			case createjs.AbstractLoader.BINARY:
				return true;
			default:
				return false
		}
	};
	a.isImageTag = function(b) {
		return b instanceof HTMLImageElement
	};
	a.isAudioTag = function(b) {
		if (window.HTMLAudioElement) {
			return b instanceof HTMLAudioElement
		} else {
			return false
		}
	};
	a.isVideoTag = function(b) {
		if (window.HTMLVideoElement) {
			return b instanceof HTMLVideoElement
		} else {
			return false
		}
	};
	a.isText = function(b) {
		switch (b) {
			case createjs.AbstractLoader.TEXT:
			case createjs.AbstractLoader.JSON:
			case createjs.AbstractLoader.MANIFEST:
			case createjs.AbstractLoader.XML:
			case createjs.AbstractLoader.CSS:
			case createjs.AbstractLoader.SVG:
			case createjs.AbstractLoader.JAVASCRIPT:
			case createjs.AbstractLoader.SPRITESHEET:
				return true;
			default:
				return false
		}
	};
	a.getTypeByExtension = function(b) {
		if (b == null) {
			return createjs.AbstractLoader.TEXT
		}
		switch (b.toLowerCase()) {
			case "jpeg":
			case "jpg":
			case "gif":
			case "png":
			case "webp":
			case "bmp":
				return createjs.AbstractLoader.IMAGE;
			case "ogg":
			case "mp3":
			case "webm":
				return createjs.AbstractLoader.SOUND;
			case "mp4":
			case "webm":
			case "ts":
				return createjs.AbstractLoader.VIDEO;
			case "json":
				return createjs.AbstractLoader.JSON;
			case "xml":
				return createjs.AbstractLoader.XML;
			case "css":
				return createjs.AbstractLoader.CSS;
			case "js":
				return createjs.AbstractLoader.JAVASCRIPT;
			case "svg":
				return createjs.AbstractLoader.SVG;
			default:
				return createjs.AbstractLoader.TEXT
		}
	};
	createjs.RequestUtils = a
}());
this.createjs = this.createjs || {};
(function() {
	function a(f, e, d) {
		this.EventDispatcher_constructor();
		this.loaded = false;
		this.canceled = false;
		this.progress = 0;
		this.type = d;
		this.resultFormatter = null;
		if (f) {
			this._item = createjs.LoadItem.create(f)
		} else {
			this._item = null
		}
		this._preferXHR = e;
		this._result = null;
		this._rawResult = null;
		this._loadedItems = null;
		this._tagSrcAttribute = null;
		this._tag = null
	}
	var c = createjs.extend(a, createjs.EventDispatcher);
	var b = a;
	b.POST = "POST";
	b.GET = "GET";
	b.BINARY = "binary";
	b.CSS = "css";
	b.IMAGE = "image";
	b.JAVASCRIPT = "javascript";
	b.JSON = "json";
	b.JSONP = "jsonp";
	b.MANIFEST = "manifest";
	b.SOUND = "sound";
	b.VIDEO = "video";
	b.SPRITESHEET = "spritesheet";
	b.SVG = "svg";
	b.TEXT = "text";
	b.XML = "xml";
	c.getItem = function() {
		return this._item
	};
	c.getResult = function(d) {
		return d ? this._rawResult : this._result
	};
	c.getTag = function() {
		return this._tag
	};
	c.setTag = function(d) {
		this._tag = d
	};
	c.load = function() {
		this._createRequest();
		this._request.on("complete", this, this);
		this._request.on("progress", this, this);
		this._request.on("loadStart", this, this);
		this._request.on("abort", this, this);
		this._request.on("timeout", this, this);
		this._request.on("error", this, this);
		var d = new createjs.Event("initialize");
		d.loader = this._request;
		this.dispatchEvent(d);
		this._request.load()
	};
	c.cancel = function() {
		this.canceled = true;
		this.destroy()
	};
	c.destroy = function() {
		if (this._request) {
			this._request.removeAllEventListeners();
			this._request.destroy()
		}
		this._request = null;
		this._item = null;
		this._rawResult = null;
		this._result = null;
		this._loadItems = null;
		this.removeAllEventListeners()
	};
	c.getLoadedItems = function() {
		return this._loadedItems
	};
	c._createRequest = function() {
		if (!this._preferXHR) {
			this._request = new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
		} else {
			this._request = new createjs.XHRRequest(this._item)
		}
	};
	c._createTag = function(d) {
		return null
	};
	c._sendLoadStart = function() {
		if (this._isCanceled()) {
			return
		}
		this.dispatchEvent("loadstart")
	};
	c._sendProgress = function(e) {
		if (this._isCanceled()) {
			return
		}
		var d = null;
		if (typeof(e) == "number") {
			this.progress = e;
			d = new createjs.ProgressEvent(this.progress)
		} else {
			d = e;
			this.progress = e.loaded / e.total;
			d.progress = this.progress;
			if (isNaN(this.progress) || this.progress == Infinity) {
				this.progress = 0
			}
		}
		this.hasEventListener("progress") && this.dispatchEvent(d)
	};
	c._sendComplete = function() {
		if (this._isCanceled()) {
			return
		}
		this.loaded = true;
		var d = new createjs.Event("complete");
		d.rawResult = this._rawResult;
		if (this._result != null) {
			d.result = this._result
		}
		this.dispatchEvent(d)
	};
	c._sendError = function(d) {
		if (this._isCanceled() || !this.hasEventListener("error")) {
			return
		}
		if (d == null) {
			d = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")
		}
		this.dispatchEvent(d)
	};
	c._isCanceled = function() {
		if (window.createjs == null || this.canceled) {
			return true
		}
		return false
	};
	c.resultFormatter = null;
	c.handleEvent = function(e) {
		switch (e.type) {
			case "complete":
				this._rawResult = e.target._response;
				var d = this.resultFormatter && this.resultFormatter(this);
				var f = this;
				if (d instanceof Function) {
					d(function(g) {
						f._result = g;
						f._sendComplete()
					})
				} else {
					this._result = d || this._rawResult;
					this._sendComplete()
				}
				break;
			case "progress":
				this._sendProgress(e);
				break;
			case "error":
				this._sendError(e);
				break;
			case "loadstart":
				this._sendLoadStart();
				break;
			case "abort":
			case "timeout":
				if (!this._isCanceled()) {
					this.dispatchEvent(e.type)
				}
				break
		}
	};
	c.buildPath = function(e, d) {
		return createjs.RequestUtils.buildPath(e, d)
	};
	c.toString = function() {
		return "[PreloadJS AbstractLoader]"
	};
	createjs.AbstractLoader = createjs.promote(a, "EventDispatcher")
}());
this.createjs = this.createjs || {};
(function() {
	function a(e, d, c) {
		this.AbstractLoader_constructor(e, d, c);
		this.resultFormatter = this._formatResult;
		this._tagSrcAttribute = "src"
	}
	var b = createjs.extend(a, createjs.AbstractLoader);
	b.load = function() {
		if (!this._tag) {
			this._tag = this._createTag(this._item.src)
		}
		this._tag.preload = "auto";
		this._tag.load();
		this.AbstractLoader_load()
	};
	b._createTag = function() {};
	b._createRequest = function() {
		if (!this._preferXHR) {
			this._request = new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
		} else {
			this._request = new createjs.XHRRequest(this._item)
		}
	};
	b._formatResult = function(c) {
		this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler);
		this._tag.onstalled = null;
		if (this._preferXHR) {
			c.getTag().src = c.getResult(true)
		}
		return c.getTag()
	};
	createjs.AbstractMediaLoader = createjs.promote(a, "AbstractLoader")
}());
this.createjs = this.createjs || {};
(function() {
	var a = function(c) {
		this._item = c
	};
	var b = createjs.extend(a, createjs.EventDispatcher);
	b.load = function() {};
	b.destroy = function() {};
	b.cancel = function() {};
	createjs.AbstractRequest = createjs.promote(a, "EventDispatcher")
}());
this.createjs = this.createjs || {};
(function() {
	function a(e, c, d) {
		this.AbstractRequest_constructor(e);
		this._tag = c;
		this._tagSrcAttribute = d;
		this._loadedHandler = createjs.proxy(this._handleTagComplete, this);
		this._addedToDOM = false;
		this._startTagVisibility = null
	}
	var b = createjs.extend(a, createjs.AbstractRequest);
	b.load = function() {
		this._tag.onload = createjs.proxy(this._handleTagComplete, this);
		this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
		this._tag.onerror = createjs.proxy(this._handleError, this);
		var c = new createjs.Event("initialize");
		c.loader = this._tag;
		this.dispatchEvent(c);
		this._hideTag();
		this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
		this._tag[this._tagSrcAttribute] = this._item.src;
		if (this._tag.parentNode == null) {
			window.document.body.appendChild(this._tag);
			this._addedToDOM = true
		}
	};
	b.destroy = function() {
		this._clean();
		this._tag = null;
		this.AbstractRequest_destroy()
	};
	b._handleReadyStateChange = function() {
		clearTimeout(this._loadTimeout);
		var c = this._tag;
		if (c.readyState == "loaded" || c.readyState == "complete") {
			this._handleTagComplete()
		}
	};
	b._handleError = function() {
		this._clean();
		this.dispatchEvent("error")
	};
	b._handleTagComplete = function() {
		this._rawResult = this._tag;
		this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult;
		this._clean();
		this._showTag();
		this.dispatchEvent("complete")
	};
	b._handleTimeout = function() {
		this._clean();
		this.dispatchEvent(new createjs.Event("timeout"))
	};
	b._clean = function() {
		this._tag.onload = null;
		this._tag.onreadystatechange = null;
		this._tag.onerror = null;
		if (this._addedToDOM && this._tag.parentNode != null) {
			this._tag.parentNode.removeChild(this._tag)
		}
		clearTimeout(this._loadTimeout)
	};
	b._hideTag = function() {
		this._startTagVisibility = this._tag.style.visibility;
		this._tag.style.visibility = "hidden"
	};
	b._showTag = function() {
		this._tag.style.visibility = this._startTagVisibility
	};
	b._handleStalled = function() {};
	createjs.TagRequest = createjs.promote(a, "AbstractRequest")
}());
this.createjs = this.createjs || {};
(function() {
	function a(f, d, e) {
		this.AbstractRequest_constructor(f);
		this._tag = d;
		this._tagSrcAttribute = e;
		this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
	}
	var c = createjs.extend(a, createjs.TagRequest);
	var b = a;
	c.load = function() {
		var e = createjs.proxy(this._handleStalled, this);
		this._stalledCallback = e;
		var d = createjs.proxy(this._handleProgress, this);
		this._handleProgress = d;
		this._tag.addEventListener("stalled", e);
		this._tag.addEventListener("progress", d);
		this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, false);
		this.TagRequest_load()
	};
	c._handleReadyStateChange = function() {
		clearTimeout(this._loadTimeout);
		var d = this._tag;
		if (d.readyState == "loaded" || d.readyState == "complete") {
			this._handleTagComplete()
		}
	};
	c._handleStalled = function() {};
	c._handleProgress = function(d) {
		if (!d || d.loaded > 0 && d.total == 0) {
			return
		}
		var e = new createjs.ProgressEvent(d.loaded, d.total);
		this.dispatchEvent(e)
	};
	c._clean = function() {
		this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler);
		this._tag.removeEventListener("stalled", this._stalledCallback);
		this._tag.removeEventListener("progress", this._progressCallback);
		this.TagRequest__clean()
	};
	createjs.MediaTagRequest = createjs.promote(a, "TagRequest")
}());
this.createjs = this.createjs || {};
(function() {
	function a(c) {
		this.AbstractRequest_constructor(c);
		this._request = null;
		this._loadTimeout = null;
		this._xhrLevel = 1;
		this._response = null;
		this._rawResponse = null;
		this._canceled = false;
		this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this);
		this._handleProgressProxy = createjs.proxy(this._handleProgress, this);
		this._handleAbortProxy = createjs.proxy(this._handleAbort, this);
		this._handleErrorProxy = createjs.proxy(this._handleError, this);
		this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this);
		this._handleLoadProxy = createjs.proxy(this._handleLoad, this);
		this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this);
		if (!this._createXHR(c)) {}
	}
	var b = createjs.extend(a, createjs.AbstractRequest);
	a.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	b.getResult = function(c) {
		if (c && this._rawResponse) {
			return this._rawResponse
		}
		return this._response
	};
	b.cancel = function() {
		this.canceled = true;
		this._clean();
		this._request.abort()
	};
	b.load = function() {
		if (this._request == null) {
			this._handleError();
			return
		}
		this._request.addEventListener("loadstart", this._handleLoadStartProxy, false);
		this._request.addEventListener("progress", this._handleProgressProxy, false);
		this._request.addEventListener("abort", this._handleAbortProxy, false);
		this._request.addEventListener("error", this._handleErrorProxy, false);
		this._request.addEventListener("timeout", this._handleTimeoutProxy, false);
		this._request.addEventListener("load", this._handleLoadProxy, false);
		this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, false);
		if (this._xhrLevel == 1) {
			this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout)
		}
		try {
			if (!this._item.values || this._item.method == createjs.AbstractLoader.GET) {
				this._request.send()
			} else {
				if (this._item.method == createjs.AbstractLoader.POST) {
					this._request.send(createjs.RequestUtils.formatQueryString(this._item.values))
				}
			}
		} catch (c) {
			this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, c))
		}
	};
	b.setResponseType = function(c) {
		this._request.responseType = c
	};
	b.getAllResponseHeaders = function() {
		if (this._request.getAllResponseHeaders instanceof Function) {
			return this._request.getAllResponseHeaders()
		} else {
			return null
		}
	};
	b.getResponseHeader = function(c) {
		if (this._request.getResponseHeader instanceof Function) {
			return this._request.getResponseHeader(c)
		} else {
			return null
		}
	};
	b._handleProgress = function(c) {
		if (!c || c.loaded > 0 && c.total == 0) {
			return
		}
		var d = new createjs.ProgressEvent(c.loaded, c.total);
		this.dispatchEvent(d)
	};
	b._handleLoadStart = function(c) {
		clearTimeout(this._loadTimeout);
		this.dispatchEvent("loadstart")
	};
	b._handleAbort = function(c) {
		this._clean();
		this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, c))
	};
	b._handleError = function(c) {
		this._clean();
		this.dispatchEvent(new createjs.ErrorEvent(c.message))
	};
	b._handleReadyStateChange = function(c) {
		if (this._request.readyState == 4) {
			this._handleLoad()
		}
	};
	b._handleLoad = function(d) {
		if (this.loaded) {
			return
		}
		this.loaded = true;
		var c = this._checkError();
		if (c) {
			this._handleError(c);
			return
		}
		this._response = this._getResponse();
		this._clean();
		this.dispatchEvent(new createjs.Event("complete"))
	};
	b._handleTimeout = function(c) {
		this._clean();
		this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, c))
	};
	b._checkError = function() {
		var c = parseInt(this._request.status);
		switch (c) {
			case 404:
				return new Error(c)
		}
		return null
	};
	b._getResponse = function() {
		if (this._response != null) {
			return this._response
		}
		if (this._request.response != null) {
			return this._request.response
		}
		try {
			if (this._request.responseText != null) {
				return this._request.responseText
			}
		} catch (c) {}
		try {
			if (this._request.responseXML != null) {
				return this._request.responseXML
			}
		} catch (c) {}
		return null
	};
	b._createXHR = function(p) {
		var d = createjs.RequestUtils.isCrossDomain(p);
		var g = {};
		var o = null;
		if (window.XMLHttpRequest) {
			o = new XMLHttpRequest();
			if (d && o.withCredentials === undefined && window.XDomainRequest) {
				o = new XDomainRequest()
			}
		} else {
			for (var j = 0, h = s.ACTIVEX_VERSIONS.length; j < h; j++) {
				var k = s.ACTIVEX_VERSIONS[j];
				try {
					o = new ActiveXObject(axVersions);
					break
				} catch (m) {}
			}
			if (o == null) {
				return false
			}
		}
		if (p.mimeType == null && createjs.RequestUtils.isText(p.type)) {
			p.mimeType = "text/plain; charset=utf-8"
		}
		if (p.mimeType && o.overrideMimeType) {
			o.overrideMimeType(p.mimeType)
		}
		this._xhrLevel = (typeof o.responseType === "string") ? 2 : 1;
		var c = null;
		if (p.method == createjs.AbstractLoader.GET) {
			c = createjs.RequestUtils.buildPath(p.src, p.values)
		} else {
			c = p.src
		}
		o.open(p.method || createjs.AbstractLoader.GET, c, true);
		if (d && o instanceof XMLHttpRequest && this._xhrLevel == 1) {
			g.Origin = location.origin
		}
		if (p.values && p.method == createjs.AbstractLoader.POST) {
			g["Content-Type"] = "application/x-www-form-urlencoded"
		}
		if (!d && !g["X-Requested-With"]) {
			g["X-Requested-With"] = "XMLHttpRequest"
		}
		if (p.headers) {
			for (var f in p.headers) {
				g[f] = p.headers[f]
			}
		}
		for (f in g) {
			o.setRequestHeader(f, g[f])
		}
		if (o instanceof XMLHttpRequest && p.withCredentials !== undefined) {
			o.withCredentials = p.withCredentials
		}
		this._request = o;
		return true
	};
	b._clean = function() {
		clearTimeout(this._loadTimeout);
		this._request.removeEventListener("loadstart", this._handleLoadStartProxy);
		this._request.removeEventListener("progress", this._handleProgressProxy);
		this._request.removeEventListener("abort", this._handleAbortProxy);
		this._request.removeEventListener("error", this._handleErrorProxy);
		this._request.removeEventListener("timeout", this._handleTimeoutProxy);
		this._request.removeEventListener("load", this._handleLoadProxy);
		this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)
	};
	b.toString = function() {
		return "[PreloadJS XHRRequest]"
	};
	createjs.XHRRequest = createjs.promote(a, "AbstractRequest")
}());
this.createjs = this.createjs || {};
(function() {
	function c(e, d) {
		this.AbstractMediaLoader_constructor(e, d, createjs.AbstractLoader.SOUND);
		if (createjs.RequestUtils.isAudioTag(e)) {
			this._tag = e
		} else {
			if (createjs.RequestUtils.isAudioTag(e.src)) {
				this._tag = e
			} else {
				if (createjs.RequestUtils.isAudioTag(e.tag)) {
					this._tag = createjs.RequestUtils.isAudioTag(e) ? e : e.src
				}
			}
		}
		if (this._tag != null) {
			this._preferXHR = false
		}
	}
	var b = createjs.extend(c, createjs.AbstractMediaLoader);
	var a = c;
	a.canLoadItem = function(d) {
		return d.type == createjs.AbstractLoader.SOUND
	};
	b._createTag = function(e) {
		var d = document.createElement("audio");
		d.autoplay = false;
		d.preload = "none";
		d.src = e;
		return d
	};
	createjs.SoundLoader = createjs.promote(c, "AbstractMediaLoader")
}());
this.createjs = this.createjs || {};
(function() {
	var b = function() {
		this.interrupt = null;
		this.delay = null;
		this.offset = null;
		this.loop = null;
		this.volume = null;
		this.pan = null;
		this.startTime = null;
		this.duration = null
	};
	var c = b.prototype = {};
	var a = b;
	a.create = function(e) {
		if (e instanceof a || e instanceof Object) {
			var d = new createjs.PlayPropsConfig();
			d.set(e);
			return d
		} else {
			throw new Error("Type not recognized.")
		}
	};
	c.set = function(d) {
		for (var e in d) {
			this[e] = d[e]
		}
		return this
	};
	c.toString = function() {
		return "[PlayPropsConfig]"
	};
	createjs.PlayPropsConfig = a
}());
this.createjs = this.createjs || {};
(function() {
	function a() {
		throw "Sound cannot be instantiated"
	}
	var c = a;
	c.INTERRUPT_ANY = "any";
	c.INTERRUPT_EARLY = "early";
	c.INTERRUPT_LATE = "late";
	c.INTERRUPT_NONE = "none";
	c.PLAY_INITED = "playInited";
	c.PLAY_SUCCEEDED = "playSucceeded";
	c.PLAY_INTERRUPTED = "playInterrupted";
	c.PLAY_FINISHED = "playFinished";
	c.PLAY_FAILED = "playFailed";
	c.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"];
	c.EXTENSION_MAP = {
		m4a: "mp4"
	};
	c.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
	c.defaultInterruptBehavior = c.INTERRUPT_NONE;
	c.alternateExtensions = [];
	c.activePlugin = null;
	c._masterVolume = 1;
	Object.defineProperty(c, "volume", {
		get: function() {
			return this._masterVolume
		},
		set: function(g) {
			if (Number(g) == null) {
				return false
			}
			g = Math.max(0, Math.min(1, g));
			c._masterVolume = g;
			if (!this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(g)) {
				var h = this._instances;
				for (var f = 0, e = h.length; f < e; f++) {
					h[f].setMasterVolume(g)
				}
			}
		}
	});
	c._masterMute = false;
	Object.defineProperty(c, "muted", {
		get: function() {
			return this._masterMute
		},
		set: function(g) {
			if (g == null) {
				return false
			}
			this._masterMute = g;
			if (!this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(g)) {
				var h = this._instances;
				for (var f = 0, e = h.length; f < e; f++) {
					h[f].setMasterMute(g)
				}
			}
			return true
		}
	});
	Object.defineProperty(c, "capabilities", {
		get: function() {
			if (c.activePlugin == null) {
				return null
			}
			return c.activePlugin._capabilities
		},
		set: function(e) {
			return false
		}
	});
	c._pluginsRegistered = false;
	c._lastID = 0;
	c._instances = [];
	c._idHash = {};
	c._preloadHash = {};
	c._defaultPlayPropsHash = {};
	c.addEventListener = null;
	c.removeEventListener = null;
	c.removeAllEventListeners = null;
	c.dispatchEvent = null;
	c.hasEventListener = null;
	c._listeners = null;
	createjs.EventDispatcher.initialize(c);
	c.getPreloadHandlers = function() {
		return {
			callback: createjs.proxy(c.initLoad, c),
			types: ["sound"],
			extensions: c.SUPPORTED_EXTENSIONS
		}
	};
	c._handleLoadComplete = function(h) {
		var j = h.target.getItem().src;
		if (!c._preloadHash[j]) {
			return
		}
		for (var f = 0, e = c._preloadHash[j].length; f < e; f++) {
			var g = c._preloadHash[j][f];
			c._preloadHash[j][f] = true;
			if (!c.hasEventListener("fileload")) {
				continue
			}
			var h = new createjs.Event("fileload");
			h.src = g.src;
			h.id = g.id;
			h.data = g.data;
			h.sprite = g.sprite;
			c.dispatchEvent(h)
		}
	};
	c._handleLoadError = function(h) {
		var j = h.target.getItem().src;
		if (!c._preloadHash[j]) {
			return
		}
		for (var f = 0, e = c._preloadHash[j].length; f < e; f++) {
			var g = c._preloadHash[j][f];
			c._preloadHash[j][f] = false;
			if (!c.hasEventListener("fileerror")) {
				continue
			}
			var h = new createjs.Event("fileerror");
			h.src = g.src;
			h.id = g.id;
			h.data = g.data;
			h.sprite = g.sprite;
			c.dispatchEvent(h)
		}
	};
	c._registerPlugin = function(e) {
		if (e.isSupported()) {
			c.activePlugin = new e();
			return true
		}
		return false
	};
	c.registerPlugins = function(f) {
		c._pluginsRegistered = true;
		for (var g = 0, e = f.length; g < e; g++) {
			if (c._registerPlugin(f[g])) {
				return true
			}
		}
		return false
	};
	c.initializeDefaultPlugins = function() {
		if (c.activePlugin != null) {
			return true
		}
		if (c._pluginsRegistered) {
			return false
		}
		if (c.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin])) {
			return true
		}
		return false
	};
	c.isReady = function() {
		return (c.activePlugin != null)
	};
	c.getCapabilities = function() {
		if (c.activePlugin == null) {
			return null
		}
		return c.activePlugin._capabilities
	};
	c.getCapability = function(e) {
		if (c.activePlugin == null) {
			return null
		}
		return c.activePlugin._capabilities[e]
	};
	c.initLoad = function(e) {
		return c._registerSound(e)
	};
	c._registerSound = function(l) {
		if (!c.initializeDefaultPlugins()) {
			return false
		}
		var h;
		if (l.src instanceof Object) {
			h = c._parseSrc(l.src);
			h.src = l.path + h.src
		} else {
			h = c._parsePath(l.src)
		}
		if (h == null) {
			return false
		}
		l.src = h.src;
		l.type = "sound";
		var k = l.data;
		var g = null;
		if (k != null) {
			if (!isNaN(k.channels)) {
				g = parseInt(k.channels)
			} else {
				if (!isNaN(k)) {
					g = parseInt(k)
				}
			}
			if (k.audioSprite) {
				var j;
				for (var f = k.audioSprite.length; f--;) {
					j = k.audioSprite[f];
					c._idHash[j.id] = {
						src: l.src,
						startTime: parseInt(j.startTime),
						duration: parseInt(j.duration)
					};
					if (j.defaultPlayProps) {
						c._defaultPlayPropsHash[j.id] = createjs.PlayPropsConfig.create(j.defaultPlayProps)
					}
				}
			}
		}
		if (l.id != null) {
			c._idHash[l.id] = {
				src: l.src
			}
		}
		var e = c.activePlugin.register(l);
		b.create(l.src, g);
		if (k == null || !isNaN(k)) {
			l.data = g || b.maxPerChannel()
		} else {
			l.data.channels = g || b.maxPerChannel()
		}
		if (e.type) {
			l.type = e.type
		}
		if (l.defaultPlayProps) {
			c._defaultPlayPropsHash[l.src] = createjs.PlayPropsConfig.create(l.defaultPlayProps)
		}
		return e
	};
	c.registerSound = function(h, l, g, k, f) {
		var j = {
			src: h,
			id: l,
			data: g,
			defaultPlayProps: f
		};
		if (h instanceof Object && h.src) {
			k = l;
			j = h
		}
		j = createjs.LoadItem.create(j);
		j.path = k;
		if (k != null && !(j.src instanceof Object)) {
			j.src = k + h
		}
		var e = c._registerSound(j);
		if (!e) {
			return false
		}
		if (!c._preloadHash[j.src]) {
			c._preloadHash[j.src] = []
		}
		c._preloadHash[j.src].push(j);
		if (c._preloadHash[j.src].length == 1) {
			e.on("complete", createjs.proxy(this._handleLoadComplete, this));
			e.on("error", createjs.proxy(this._handleLoadError, this));
			c.activePlugin.preload(e)
		} else {
			if (c._preloadHash[j.src][0] == true) {
				return true
			}
		}
		return j
	};
	c.registerSounds = function(f, j) {
		var e = [];
		if (f.path) {
			if (!j) {
				j = f.path
			} else {
				j = j + f.path
			}
			f = f.manifest
		}
		for (var h = 0, g = f.length; h < g; h++) {
			e[h] = createjs.Sound.registerSound(f[h].src, f[h].id, f[h].data, j, f[h].defaultPlayProps)
		}
		return e
	};
	c.removeSound = function(f, h) {
		if (c.activePlugin == null) {
			return false
		}
		if (f instanceof Object && f.src) {
			f = f.src
		}
		var e;
		if (f instanceof Object) {
			e = c._parseSrc(f)
		} else {
			f = c._getSrcById(f).src;
			e = c._parsePath(f)
		}
		if (e == null) {
			return false
		}
		f = e.src;
		if (h != null) {
			f = h + f
		}
		for (var g in c._idHash) {
			if (c._idHash[g].src == f) {
				delete(c._idHash[g])
			}
		}
		b.removeSrc(f);
		delete(c._preloadHash[f]);
		c.activePlugin.removeSound(f);
		return true
	};
	c.removeSounds = function(f, j) {
		var e = [];
		if (f.path) {
			if (!j) {
				j = f.path
			} else {
				j = j + f.path
			}
			f = f.manifest
		}
		for (var h = 0, g = f.length; h < g; h++) {
			e[h] = createjs.Sound.removeSound(f[h].src, j)
		}
		return e
	};
	c.removeAllSounds = function() {
		c._idHash = {};
		c._preloadHash = {};
		b.removeAll();
		if (c.activePlugin) {
			c.activePlugin.removeAllSounds()
		}
	};
	c.loadComplete = function(f) {
		if (!c.isReady()) {
			return false
		}
		var e = c._parsePath(f);
		if (e) {
			f = c._getSrcById(e.src).src
		} else {
			f = c._getSrcById(f).src
		}
		if (c._preloadHash[f] == undefined) {
			return false
		}
		return (c._preloadHash[f][0] == true)
	};
	c._parsePath = function(k) {
		if (typeof(k) != "string") {
			k = k.toString()
		}
		var g = k.match(c.FILE_PATTERN);
		if (g == null) {
			return false
		}
		var f = g[4];
		var j = g[5];
		var l = c.capabilities;
		var h = 0;
		while (!l[j]) {
			j = c.alternateExtensions[h++];
			if (h > c.alternateExtensions.length) {
				return null
			}
		}
		k = k.replace("." + g[5], "." + j);
		var e = {
			name: f,
			src: k,
			extension: j
		};
		return e
	};
	c._parseSrc = function(g) {
		var e = {
			name: undefined,
			src: undefined,
			extension: undefined
		};
		var j = c.capabilities;
		for (var h in g) {
			if (g.hasOwnProperty(h) && j[h]) {
				e.src = g[h];
				e.extension = h;
				break
			}
		}
		if (!e.src) {
			return false
		}
		var f = e.src.lastIndexOf("/");
		if (f != -1) {
			e.name = e.src.slice(f + 1)
		} else {
			e.name = e.src
		}
		return e
	};
	c.play = function(e, k, l, j, n, m, p, f, g) {
		var h;
		if (k instanceof Object || k instanceof createjs.PlayPropsConfig) {
			h = createjs.PlayPropsConfig.create(k)
		} else {
			h = createjs.PlayPropsConfig.create({
				interrupt: k,
				delay: l,
				offset: j,
				loop: n,
				volume: m,
				pan: p,
				startTime: f,
				duration: g
			})
		}
		var q = c.createInstance(e, h.startTime, h.duration);
		var o = c._playInstance(q, h);
		if (!o) {
			q._playFailed()
		}
		return q
	};
	c.createInstance = function(k, h, j) {
		if (!c.initializeDefaultPlugins()) {
			return new createjs.DefaultSoundInstance(k, h, j)
		}
		var f = c._defaultPlayPropsHash[k];
		k = c._getSrcById(k);
		var g = c._parsePath(k.src);
		var e = null;
		if (g != null && g.src != null) {
			b.create(g.src);
			if (h == null) {
				h = k.startTime
			}
			e = c.activePlugin.create(g.src, h, j || k.duration);
			f = f || c._defaultPlayPropsHash[g.src];
			if (f) {
				e.applyPlayProps(f)
			}
		} else {
			e = new createjs.DefaultSoundInstance(k, h, j)
		}
		e.uniqueId = c._lastID++;
		return e
	};
	c.stop = function() {
		var f = this._instances;
		for (var e = f.length; e--;) {
			f[e].stop()
		}
	};
	c.setVolume = function(g) {
		if (Number(g) == null) {
			return false
		}
		g = Math.max(0, Math.min(1, g));
		c._masterVolume = g;
		if (!this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(g)) {
			var h = this._instances;
			for (var f = 0, e = h.length; f < e; f++) {
				h[f].setMasterVolume(g)
			}
		}
	};
	c.getVolume = function() {
		return this._masterVolume
	};
	c.setMute = function(g) {
		if (g == null) {
			return false
		}
		this._masterMute = g;
		if (!this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(g)) {
			var h = this._instances;
			for (var f = 0, e = h.length; f < e; f++) {
				h[f].setMasterMute(g)
			}
		}
		return true
	};
	c.getMute = function() {
		return this._masterMute
	};
	c.setDefaultPlayProps = function(f, e) {
		f = c._getSrcById(f);
		c._defaultPlayPropsHash[c._parsePath(f.src).src] = createjs.PlayPropsConfig.create(e)
	};
	c.getDefaultPlayProps = function(e) {
		e = c._getSrcById(e);
		return c._defaultPlayPropsHash[c._parsePath(e.src).src]
	};
	c._playInstance = function(f, h) {
		var e = c._defaultPlayPropsHash[f.src] || {};
		if (h.interrupt == null) {
			h.interrupt = e.interrupt || c.defaultInterruptBehavior
		}
		if (h.delay == null) {
			h.delay = e.delay || 0
		}
		if (h.offset == null) {
			h.offset = f.getPosition()
		}
		if (h.loop == null) {
			h.loop = f.loop
		}
		if (h.volume == null) {
			h.volume = f.volume
		}
		if (h.pan == null) {
			h.pan = f.pan
		}
		if (h.delay == 0) {
			var g = c._beginPlaying(f, h);
			if (!g) {
				return false
			}
		} else {
			var j = setTimeout(function() {
				c._beginPlaying(f, h)
			}, h.delay);
			f.delayTimeoutId = j
		}
		this._instances.push(f);
		return true
	};
	c._beginPlaying = function(f, h) {
		if (!b.add(f, h.interrupt)) {
			return false
		}
		var e = f._beginPlaying(h);
		if (!e) {
			var g = createjs.indexOf(this._instances, f);
			if (g > -1) {
				this._instances.splice(g, 1)
			}
			return false
		}
		return true
	};
	c._getSrcById = function(e) {
		return c._idHash[e] || {
			src: e
		}
	};
	c._playFinished = function(e) {
		b.remove(e);
		var f = createjs.indexOf(this._instances, e);
		if (f > -1) {
			this._instances.splice(f, 1)
		}
	};
	createjs.Sound = a;

	function b(f, e) {
		this.init(f, e)
	}
	b.channels = {};
	b.create = function(g, e) {
		var f = b.get(g);
		if (f == null) {
			b.channels[g] = new b(g, e);
			return true
		}
		return false
	};
	b.removeSrc = function(f) {
		var e = b.get(f);
		if (e == null) {
			return false
		}
		e._removeAll();
		delete(b.channels[f]);
		return true
	};
	b.removeAll = function() {
		for (var e in b.channels) {
			b.channels[e]._removeAll()
		}
		b.channels = {}
	};
	b.add = function(e, g) {
		var f = b.get(e.src);
		if (f == null) {
			return false
		}
		return f._add(e, g)
	};
	b.remove = function(e) {
		var f = b.get(e.src);
		if (f == null) {
			return false
		}
		f._remove(e);
		return true
	};
	b.maxPerChannel = function() {
		return d.maxDefault
	};
	b.get = function(e) {
		return b.channels[e]
	};
	var d = b.prototype;
	d.constructor = b;
	d.src = null;
	d.max = null;
	d.maxDefault = 100;
	d.length = 0;
	d.init = function(f, e) {
		this.src = f;
		this.max = e || this.maxDefault;
		if (this.max == -1) {
			this.max = this.maxDefault
		}
		this._instances = []
	};
	d._get = function(e) {
		return this._instances[e]
	};
	d._add = function(e, f) {
		if (!this._getSlot(f, e)) {
			return false
		}
		this._instances.push(e);
		this.length++;
		return true
	};
	d._remove = function(e) {
		var f = createjs.indexOf(this._instances, e);
		if (f == -1) {
			return false
		}
		this._instances.splice(f, 1);
		this.length--;
		return true
	};
	d._removeAll = function() {
		for (var e = this.length - 1; e >= 0; e--) {
			this._instances[e].stop()
		}
	};
	d._getSlot = function(k, e) {
		var j, h;
		if (k != a.INTERRUPT_NONE) {
			h = this._get(0);
			if (h == null) {
				return true
			}
		}
		for (var g = 0, f = this.max; g < f; g++) {
			j = this._get(g);
			if (j == null) {
				return true
			}
			if (j.playState == a.PLAY_FINISHED || j.playState == a.PLAY_INTERRUPTED || j.playState == a.PLAY_FAILED) {
				h = j;
				break
			}
			if (k == a.INTERRUPT_NONE) {
				continue
			}
			if ((k == a.INTERRUPT_EARLY && j.getPosition() < h.getPosition()) || (k == a.INTERRUPT_LATE && j.getPosition() > h.getPosition())) {
				h = j
			}
		}
		if (h != null) {
			h._interrupt();
			this._remove(h);
			return true
		}
		return false
	};
	d.toString = function() {
		return "[Sound SoundChannel]"
	}
}());
this.createjs = this.createjs || {};
(function() {
	var a = function(f, d, e, c) {
		this.EventDispatcher_constructor();
		this.src = f;
		this.uniqueId = -1;
		this.playState = null;
		this.delayTimeoutId = null;
		this._volume = 1;
		Object.defineProperty(this, "volume", {
			get: this.getVolume,
			set: this.setVolume
		});
		this._pan = 0;
		Object.defineProperty(this, "pan", {
			get: this.getPan,
			set: this.setPan
		});
		this._startTime = Math.max(0, d || 0);
		Object.defineProperty(this, "startTime", {
			get: this.getStartTime,
			set: this.setStartTime
		});
		this._duration = Math.max(0, e || 0);
		Object.defineProperty(this, "duration", {
			get: this.getDuration,
			set: this.setDuration
		});
		this._playbackResource = null;
		Object.defineProperty(this, "playbackResource", {
			get: this.getPlaybackResource,
			set: this.setPlaybackResource
		});
		if (c !== false && c !== true) {
			this.setPlaybackResource(c)
		}
		this._position = 0;
		Object.defineProperty(this, "position", {
			get: this.getPosition,
			set: this.setPosition
		});
		this._loop = 0;
		Object.defineProperty(this, "loop", {
			get: this.getLoop,
			set: this.setLoop
		});
		this._muted = false;
		Object.defineProperty(this, "muted", {
			get: this.getMuted,
			set: this.setMuted
		});
		this._paused = false;
		Object.defineProperty(this, "paused", {
			get: this.getPaused,
			set: this.setPaused
		})
	};
	var b = createjs.extend(a, createjs.EventDispatcher);
	b.play = function(j, d, h, c, f, g) {
		var e;
		if (j instanceof Object || j instanceof createjs.PlayPropsConfig) {
			e = createjs.PlayPropsConfig.create(j)
		} else {
			e = createjs.PlayPropsConfig.create({
				interrupt: j,
				delay: d,
				offset: h,
				loop: c,
				volume: f,
				pan: g
			})
		}
		if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this.applyPlayProps(e);
			if (this._paused) {
				this.setPaused(false)
			}
			return
		}
		this._cleanUp();
		createjs.Sound._playInstance(this, e);
		return this
	};
	b.stop = function() {
		this._position = 0;
		this._paused = false;
		this._handleStop();
		this._cleanUp();
		this.playState = createjs.Sound.PLAY_FINISHED;
		return this
	};
	b.destroy = function() {
		this._cleanUp();
		this.src = null;
		this.playbackResource = null;
		this.removeAllEventListeners()
	};
	b.applyPlayProps = function(c) {
		if (c.offset != null) {
			this.setPosition(c.offset)
		}
		if (c.loop != null) {
			this.setLoop(c.loop)
		}
		if (c.volume != null) {
			this.setVolume(c.volume)
		}
		if (c.pan != null) {
			this.setPan(c.pan)
		}
		if (c.startTime != null) {
			this.setStartTime(c.startTime);
			this.setDuration(c.duration)
		}
		return this
	};
	b.toString = function() {
		return "[AbstractSoundInstance]"
	};
	b.getPaused = function() {
		return this._paused
	};
	b.setPaused = function(c) {
		if ((c !== true && c !== false) || this._paused == c) {
			return
		}
		if (c == true && this.playState != createjs.Sound.PLAY_SUCCEEDED) {
			return
		}
		this._paused = c;
		if (c) {
			this._pause()
		} else {
			this._resume()
		}
		clearTimeout(this.delayTimeoutId);
		return this
	};
	b.setVolume = function(c) {
		if (c == this._volume) {
			return this
		}
		this._volume = Math.max(0, Math.min(1, c));
		if (!this._muted) {
			this._updateVolume()
		}
		return this
	};
	b.getVolume = function() {
		return this._volume
	};
	b.setMuted = function(c) {
		if (c !== true && c !== false) {
			return
		}
		this._muted = c;
		this._updateVolume();
		return this
	};
	b.getMuted = function() {
		return this._muted
	};
	b.setPan = function(c) {
		if (c == this._pan) {
			return this
		}
		this._pan = Math.max(-1, Math.min(1, c));
		this._updatePan();
		return this
	};
	b.getPan = function() {
		return this._pan
	};
	b.getPosition = function() {
		if (!this._paused && this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this._position = this._calculateCurrentPosition()
		}
		return this._position
	};
	b.setPosition = function(c) {
		this._position = Math.max(0, c);
		if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this._updatePosition()
		}
		return this
	};
	b.getStartTime = function() {
		return this._startTime
	};
	b.setStartTime = function(c) {
		if (c == this._startTime) {
			return this
		}
		this._startTime = Math.max(0, c || 0);
		this._updateStartTime();
		return this
	};
	b.getDuration = function() {
		return this._duration
	};
	b.setDuration = function(c) {
		if (c == this._duration) {
			return this
		}
		this._duration = Math.max(0, c || 0);
		this._updateDuration();
		return this
	};
	b.setPlaybackResource = function(c) {
		this._playbackResource = c;
		if (this._duration == 0) {
			this._setDurationFromSource()
		}
		return this
	};
	b.getPlaybackResource = function() {
		return this._playbackResource
	};
	b.getLoop = function() {
		return this._loop
	};
	b.setLoop = function(c) {
		if (this._playbackResource != null) {
			if (this._loop != 0 && c == 0) {
				this._removeLooping(c)
			} else {
				if (this._loop == 0 && c != 0) {
					this._addLooping(c)
				}
			}
		}
		this._loop = c
	};
	b._sendEvent = function(c) {
		var d = new createjs.Event(c);
		this.dispatchEvent(d)
	};
	b._cleanUp = function() {
		clearTimeout(this.delayTimeoutId);
		this._handleCleanUp();
		this._paused = false;
		createjs.Sound._playFinished(this)
	};
	b._interrupt = function() {
		this._cleanUp();
		this.playState = createjs.Sound.PLAY_INTERRUPTED;
		this._sendEvent("interrupted")
	};
	b._beginPlaying = function(c) {
		this.setPosition(c.offset);
		this.setLoop(c.loop);
		this.setVolume(c.volume);
		this.setPan(c.pan);
		if (c.startTime != null) {
			this.setStartTime(c.startTime);
			this.setDuration(c.duration)
		}
		if (this._playbackResource != null && this._position < this._duration) {
			this._paused = false;
			this._handleSoundReady();
			this.playState = createjs.Sound.PLAY_SUCCEEDED;
			this._sendEvent("succeeded");
			return true
		} else {
			this._playFailed();
			return false
		}
	};
	b._playFailed = function() {
		this._cleanUp();
		this.playState = createjs.Sound.PLAY_FAILED;
		this._sendEvent("failed")
	};
	b._handleSoundComplete = function(c) {
		this._position = 0;
		if (this._loop != 0) {
			this._loop--;
			this._handleLoop();
			this._sendEvent("loop");
			return
		}
		this._cleanUp();
		this.playState = createjs.Sound.PLAY_FINISHED;
		this._sendEvent("complete")
	};
	b._handleSoundReady = function() {};
	b._updateVolume = function() {};
	b._updatePan = function() {};
	b._updateStartTime = function() {};
	b._updateDuration = function() {};
	b._setDurationFromSource = function() {};
	b._calculateCurrentPosition = function() {};
	b._updatePosition = function() {};
	b._removeLooping = function(c) {};
	b._addLooping = function(c) {};
	b._pause = function() {};
	b._resume = function() {};
	b._handleStop = function() {};
	b._handleCleanUp = function() {};
	b._handleLoop = function() {};
	createjs.AbstractSoundInstance = createjs.promote(a, "EventDispatcher");
	createjs.DefaultSoundInstance = createjs.AbstractSoundInstance
}());
this.createjs = this.createjs || {};
(function() {
	var a = function() {
		this._capabilities = null;
		this._loaders = {};
		this._audioSources = {};
		this._soundInstances = {};
		this._volume = 1;
		this._loaderClass;
		this._soundInstanceClass
	};
	var b = a.prototype;
	a._capabilities = null;
	a.isSupported = function() {
		return true
	};
	b.register = function(d) {
		var c = this._loaders[d.src];
		if (c && !c.canceled) {
			return this._loaders[d.src]
		}
		this._audioSources[d.src] = true;
		this._soundInstances[d.src] = [];
		c = new this._loaderClass(d);
		c.on("complete", this._handlePreloadComplete, this);
		this._loaders[d.src] = c;
		return c
	};
	b.preload = function(c) {
		c.on("error", this._handlePreloadError, this);
		c.load()
	};
	b.isPreloadStarted = function(c) {
		return (this._audioSources[c] != null)
	};
	b.isPreloadComplete = function(c) {
		return (!(this._audioSources[c] == null || this._audioSources[c] == true))
	};
	b.removeSound = function(e) {
		if (!this._soundInstances[e]) {
			return
		}
		for (var c = this._soundInstances[e].length; c--;) {
			var d = this._soundInstances[e][c];
			d.destroy()
		}
		delete(this._soundInstances[e]);
		delete(this._audioSources[e]);
		if (this._loaders[e]) {
			this._loaders[e].destroy()
		}
		delete(this._loaders[e])
	};
	b.removeAllSounds = function() {
		for (var c in this._audioSources) {
			this.removeSound(c)
		}
	};
	b.create = function(f, d, e) {
		if (!this.isPreloadStarted(f)) {
			this.preload(this.register(f))
		}
		var c = new this._soundInstanceClass(f, d, e, this._audioSources[f]);
		this._soundInstances[f].push(c);
		return c
	};
	b.setVolume = function(c) {
		this._volume = c;
		this._updateVolume();
		return true
	};
	b.getVolume = function() {
		return this._volume
	};
	b.setMute = function(c) {
		this._updateVolume();
		return true
	};
	b.toString = function() {
		return "[AbstractPlugin]"
	};
	b._handlePreloadComplete = function(f) {
		var g = f.target.getItem().src;
		this._audioSources[g] = f.result;
		for (var d = 0, c = this._soundInstances[g].length; d < c; d++) {
			var e = this._soundInstances[g][d];
			e.setPlaybackResource(this._audioSources[g])
		}
	};
	b._handlePreloadError = function(c) {};
	b._updateVolume = function() {};
	createjs.AbstractPlugin = a
}());
this.createjs = this.createjs || {};
(function() {
	function b(c) {
		this.AbstractLoader_constructor(c, true, createjs.AbstractLoader.SOUND)
	}
	var a = createjs.extend(b, createjs.AbstractLoader);
	b.context = null;
	a.toString = function() {
		return "[WebAudioLoader]"
	};
	a._createRequest = function() {
		this._request = new createjs.XHRRequest(this._item, false);
		this._request.setResponseType("arraybuffer")
	};
	a._sendComplete = function(c) {
		b.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._sendError, this))
	};
	a._handleAudioDecoded = function(c) {
		this._result = c;
		this.AbstractLoader__sendComplete()
	};
	createjs.WebAudioLoader = createjs.promote(b, "AbstractLoader")
}());
this.createjs = this.createjs || {};
(function() {
	function b(g, e, f, d) {
		this.AbstractSoundInstance_constructor(g, e, f, d);
		this.gainNode = a.context.createGain();
		this.panNode = a.context.createPanner();
		this.panNode.panningModel = a._panningModel;
		this.panNode.connect(this.gainNode);
		this._updatePan();
		this.sourceNode = null;
		this._soundCompleteTimeout = null;
		this._sourceNodeNext = null;
		this._playbackStartTime = 0;
		this._endedHandler = createjs.proxy(this._handleSoundComplete, this)
	}
	var c = createjs.extend(b, createjs.AbstractSoundInstance);
	var a = b;
	a.context = null;
	a._scratchBuffer = null;
	a.destinationNode = null;
	a._panningModel = "equalpower";
	c.destroy = function() {
		this.AbstractSoundInstance_destroy();
		this.panNode.disconnect(0);
		this.panNode = null;
		this.gainNode.disconnect(0);
		this.gainNode = null
	};
	c.toString = function() {
		return "[WebAudioSoundInstance]"
	};
	c._updatePan = function() {
		this.panNode.setPosition(this._pan, 0, -0.5)
	};
	c._removeLooping = function(d) {
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)
	};
	c._addLooping = function(d) {
		if (this.playState != createjs.Sound.PLAY_SUCCEEDED) {
			return
		}
		this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0)
	};
	c._setDurationFromSource = function() {
		this._duration = this.playbackResource.duration * 1000
	};
	c._handleCleanUp = function() {
		if (this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
			this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)
		}
		if (this.gainNode.numberOfOutputs != 0) {
			this.gainNode.disconnect(0)
		}
		clearTimeout(this._soundCompleteTimeout);
		this._playbackStartTime = 0
	};
	c._cleanUpAudioNode = function(d) {
		if (d) {
			try {
				d.stop(0);
				d.disconnect(0)
			} catch (f) {}
			try {
				d.buffer = a._scratchBuffer
			} catch (f) {}
			d = null
		}
		return d
	};
	c._handleSoundReady = function(e) {
		this.gainNode.connect(a.destinationNode);
		var d = this._duration * 0.001;
		var f = this._position * 0.001;
		if (f > d) {
			f = d
		}
		this.sourceNode = this._createAndPlayAudioNode(((a.context.currentTime || 0) - d), f);
		this._playbackStartTime = this.sourceNode.startTime - f;
		this._soundCompleteTimeout = setTimeout(this._endedHandler, (d - f) * 1000);
		if (this._loop != 0) {
			this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0)
		}
	};
	c._createAndPlayAudioNode = function(f, g) {
		var d = a.context.createBufferSource();
		d.buffer = this.playbackResource;
		d.connect(this.panNode);
		var e = this._duration * 0.001;
		d.startTime = f + e;
		d.start(d.startTime, g + (this._startTime * 0.001), e - g);
		return d
	};
	c._pause = function() {
		this._position = (a.context.currentTime - this._playbackStartTime) * 1000;
		this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
		if (this.gainNode.numberOfOutputs != 0) {
			this.gainNode.disconnect(0)
		}
		clearTimeout(this._soundCompleteTimeout)
	};
	c._resume = function() {
		this._handleSoundReady()
	};
	c._updateVolume = function() {
		var d = this._muted ? 0 : this._volume;
		if (d != this.gainNode.gain.value) {
			this.gainNode.gain.value = d
		}
	};
	c._calculateCurrentPosition = function() {
		return ((a.context.currentTime - this._playbackStartTime) * 1000)
	};
	c._updatePosition = function() {
		this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
		clearTimeout(this._soundCompleteTimeout);
		if (!this._paused) {
			this._handleSoundReady()
		}
	};
	c._handleLoop = function() {
		this._cleanUpAudioNode(this.sourceNode);
		this.sourceNode = this._sourceNodeNext;
		this._playbackStartTime = this.sourceNode.startTime;
		this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
		this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration)
	};
	c._updateDuration = function() {
		if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this._pause();
			this._resume()
		}
	};
	createjs.WebAudioSoundInstance = createjs.promote(b, "AbstractSoundInstance")
}());
this.createjs = this.createjs || {};
(function() {
	function a() {
		this.AbstractPlugin_constructor();
		this._panningModel = b._panningModel;
		this.context = b.context;
		this.dynamicsCompressorNode = this.context.createDynamicsCompressor();
		this.dynamicsCompressorNode.connect(this.context.destination);
		this.gainNode = this.context.createGain();
		this.gainNode.connect(this.dynamicsCompressorNode);
		createjs.WebAudioSoundInstance.destinationNode = this.gainNode;
		this._capabilities = b._capabilities;
		this._loaderClass = createjs.WebAudioLoader;
		this._soundInstanceClass = createjs.WebAudioSoundInstance;
		this._addPropsToClasses()
	}
	var c = createjs.extend(a, createjs.AbstractPlugin);
	var b = a;
	b._capabilities = null;
	b._panningModel = "equalpower";
	b.context = null;
	b._scratchBuffer = null;
	b._unlocked = false;
	b.isSupported = function() {
		var d = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
		if (location.protocol == "file:" && !d && !this._isFileXHRSupported()) {
			return false
		}
		b._generateCapabilities();
		if (b.context == null) {
			return false
		}
		return true
	};
	b.playEmptySound = function() {
		if (b.context == null) {
			return
		}
		var d = b.context.createBufferSource();
		d.buffer = b._scratchBuffer;
		d.connect(b.context.destination);
		d.start(0, 0, 0)
	};
	b._isFileXHRSupported = function() {
		var d = true;
		var f = new XMLHttpRequest();
		try {
			f.open("GET", "WebAudioPluginTest.fail", false)
		} catch (e) {
			d = false;
			return d
		}
		f.onerror = function() {
			d = false
		};
		f.onload = function() {
			d = this.status == 404 || (this.status == 200 || (this.status == 0 && this.response != ""))
		};
		try {
			f.send()
		} catch (e) {
			d = false
		}
		return d
	};
	b._generateCapabilities = function() {
		if (b._capabilities != null) {
			return
		}
		var g = document.createElement("audio");
		if (g.canPlayType == null) {
			return null
		}
		if (b.context == null) {
			if (window.AudioContext) {
				b.context = new AudioContext()
			} else {
				if (window.webkitAudioContext) {
					b.context = new webkitAudioContext()
				} else {
					return null
				}
			}
		}
		if (b._scratchBuffer == null) {
			b._scratchBuffer = b.context.createBuffer(1, 1, 22050)
		}
		b._compatibilitySetUp();
		if ("ontouchstart" in window && b.context.state != "running") {
			b._unlock();
			document.addEventListener("mousedown", b._unlock, true);
			document.addEventListener("touchend", b._unlock, true)
		}
		b._capabilities = {
			panning: true,
			volume: true,
			tracks: -1
		};
		var k = createjs.Sound.SUPPORTED_EXTENSIONS;
		var j = createjs.Sound.EXTENSION_MAP;
		for (var f = 0, d = k.length; f < d; f++) {
			var h = k[f];
			var e = j[h] || h;
			b._capabilities[h] = (g.canPlayType("audio/" + h) != "no" && g.canPlayType("audio/" + h) != "") || (g.canPlayType("audio/" + e) != "no" && g.canPlayType("audio/" + e) != "")
		}
		if (b.context.destination.numberOfChannels < 2) {
			b._capabilities.panning = false
		}
	};
	b._compatibilitySetUp = function() {
		b._panningModel = "equalpower";
		if (b.context.createGain) {
			return
		}
		b.context.createGain = b.context.createGainNode;
		var d = b.context.createBufferSource();
		d.__proto__.start = d.__proto__.noteGrainOn;
		d.__proto__.stop = d.__proto__.noteOff;
		b._panningModel = 0
	};
	b._unlock = function() {
		if (b._unlocked) {
			return
		}
		b.playEmptySound();
		if (b.context.state == "running") {
			document.removeEventListener("mousedown", b._unlock, true);
			document.removeEventListener("touchend", b._unlock, true);
			b._unlocked = true
		}
	};
	c.toString = function() {
		return "[WebAudioPlugin]"
	};
	c._addPropsToClasses = function() {
		var d = this._soundInstanceClass;
		d.context = this.context;
		d._scratchBuffer = b._scratchBuffer;
		d.destinationNode = this.gainNode;
		d._panningModel = this._panningModel;
		this._loaderClass.context = this.context
	};
	c._updateVolume = function() {
		var d = createjs.Sound._masterMute ? 0 : this._volume;
		if (d != this.gainNode.gain.value) {
			this.gainNode.gain.value = d
		}
	};
	createjs.WebAudioPlugin = createjs.promote(a, "AbstractPlugin")
}());
this.createjs = this.createjs || {};
(function() {
	function a() {
		throw "HTMLAudioTagPool cannot be instantiated"
	}
	var c = a;
	c._tags = {};
	c._tagPool = new b();
	c._tagUsed = {};
	c.get = function(f) {
		var e = c._tags[f];
		if (e == null) {
			e = c._tags[f] = c._tagPool.get();
			e.src = f
		} else {
			if (c._tagUsed[f]) {
				e = c._tagPool.get();
				e.src = f
			} else {
				c._tagUsed[f] = true
			}
		}
		return e
	};
	c.set = function(f, e) {
		if (e == c._tags[f]) {
			c._tagUsed[f] = false
		} else {
			c._tagPool.set(e)
		}
	};
	c.remove = function(f) {
		var e = c._tags[f];
		if (e == null) {
			return false
		}
		c._tagPool.set(e);
		delete(c._tags[f]);
		delete(c._tagUsed[f]);
		return true
	};
	c.getDuration = function(f) {
		var e = c._tags[f];
		if (e == null || !e.duration) {
			return 0
		}
		return e.duration * 1000
	};
	createjs.HTMLAudioTagPool = a;

	function b(e) {
		this._tags = []
	}
	var d = b.prototype;
	d.constructor = b;
	d.get = function() {
		var e;
		if (this._tags.length == 0) {
			e = this._createTag()
		} else {
			e = this._tags.pop()
		}
		if (e.parentNode == null) {
			document.body.appendChild(e)
		}
		return e
	};
	d.set = function(e) {
		var f = createjs.indexOf(this._tags, e);
		if (f == -1) {
			this._tags.src = null;
			this._tags.push(e)
		}
	};
	d.toString = function() {
		return "[TagPool]"
	};
	d._createTag = function() {
		var e = document.createElement("audio");
		e.autoplay = false;
		e.preload = "none";
		return e
	}
}());
this.createjs = this.createjs || {};
(function() {
	function a(f, d, e, c) {
		this.AbstractSoundInstance_constructor(f, d, e, c);
		this._audioSpriteStopTime = null;
		this._delayTimeoutId = null;
		this._endedHandler = createjs.proxy(this._handleSoundComplete, this);
		this._readyHandler = createjs.proxy(this._handleTagReady, this);
		this._stalledHandler = createjs.proxy(this._playFailed, this);
		this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this);
		this._loopHandler = createjs.proxy(this._handleSoundComplete, this);
		if (e) {
			this._audioSpriteStopTime = (d + e) * 0.001
		} else {
			this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)
		}
	}
	var b = createjs.extend(a, createjs.AbstractSoundInstance);
	b.setMasterVolume = function(c) {
		this._updateVolume()
	};
	b.setMasterMute = function(c) {
		this._updateVolume()
	};
	b.toString = function() {
		return "[HTMLAudioSoundInstance]"
	};
	b._removeLooping = function() {
		if (this._playbackResource == null) {
			return
		}
		this._playbackResource.loop = false;
		this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false)
	};
	b._addLooping = function() {
		if (this._playbackResource == null || this._audioSpriteStopTime) {
			return
		}
		this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
		this._playbackResource.loop = true
	};
	b._handleCleanUp = function() {
		var c = this._playbackResource;
		if (c != null) {
			c.pause();
			c.loop = false;
			c.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			c.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
			c.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
			c.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
			c.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
			try {
				c.currentTime = this._startTime
			} catch (d) {}
			createjs.HTMLAudioTagPool.set(this.src, c);
			this._playbackResource = null
		}
	};
	b._beginPlaying = function(c) {
		this._playbackResource = createjs.HTMLAudioTagPool.get(this.src);
		return this.AbstractSoundInstance__beginPlaying(c)
	};
	b._handleSoundReady = function(d) {
		if (this._playbackResource.readyState !== 4) {
			var c = this._playbackResource;
			c.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
			c.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
			c.preload = "auto";
			c.load();
			return
		}
		this._updateVolume();
		this._playbackResource.currentTime = (this._startTime + this._position) * 0.001;
		if (this._audioSpriteStopTime) {
			this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false)
		} else {
			this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			if (this._loop != 0) {
				this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
				this._playbackResource.loop = true
			}
		}
		this._playbackResource.play()
	};
	b._handleTagReady = function(c) {
		this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
		this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
		this._handleSoundReady()
	};
	b._pause = function() {
		this._playbackResource.pause()
	};
	b._resume = function() {
		this._playbackResource.play()
	};
	b._updateVolume = function() {
		if (this._playbackResource != null) {
			var c = (this._muted || createjs.Sound._masterMute) ? 0 : this._volume * createjs.Sound._masterVolume;
			if (c != this._playbackResource.volume) {
				this._playbackResource.volume = c
			}
		}
	};
	b._calculateCurrentPosition = function() {
		return (this._playbackResource.currentTime * 1000) - this._startTime
	};
	b._updatePosition = function() {
		this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
		this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
		try {
			this._playbackResource.currentTime = (this._position + this._startTime) * 0.001
		} catch (c) {
			this._handleSetPositionSeek(null)
		}
	};
	b._handleSetPositionSeek = function(c) {
		if (this._playbackResource == null) {
			return
		}
		this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
		this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false)
	};
	b._handleAudioSpriteLoop = function(c) {
		if (this._playbackResource.currentTime <= this._audioSpriteStopTime) {
			return
		}
		this._playbackResource.pause();
		if (this._loop == 0) {
			this._handleSoundComplete(null)
		} else {
			this._position = 0;
			this._loop--;
			this._playbackResource.currentTime = this._startTime * 0.001;
			if (!this._paused) {
				this._playbackResource.play()
			}
			this._sendEvent("loop")
		}
	};
	b._handleLoop = function(c) {
		if (this._loop == 0) {
			this._playbackResource.loop = false;
			this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false)
		}
	};
	b._updateStartTime = function() {
		this._audioSpriteStopTime = (this._startTime + this._duration) * 0.001;
		if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false)
		}
	};
	b._updateDuration = function() {
		this._audioSpriteStopTime = (this._startTime + this._duration) * 0.001;
		if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false)
		}
	};
	b._setDurationFromSource = function() {
		this._duration = createjs.HTMLAudioTagPool.getDuration(this.src);
		this._playbackResource = null
	};
	createjs.HTMLAudioSoundInstance = createjs.promote(a, "AbstractSoundInstance")
}());
this.createjs = this.createjs || {};
(function() {
	function c() {
		this.AbstractPlugin_constructor();
		this.defaultNumChannels = 2;
		this._capabilities = a._capabilities;
		this._loaderClass = createjs.SoundLoader;
		this._soundInstanceClass = createjs.HTMLAudioSoundInstance
	}
	var b = createjs.extend(c, createjs.AbstractPlugin);
	var a = c;
	a.MAX_INSTANCES = 30;
	a._AUDIO_READY = "canplaythrough";
	a._AUDIO_ENDED = "ended";
	a._AUDIO_SEEKED = "seeked";
	a._AUDIO_STALLED = "stalled";
	a._TIME_UPDATE = "timeupdate";
	a._capabilities = null;
	a.isSupported = function() {
		a._generateCapabilities();
		return (a._capabilities != null)
	};
	a._generateCapabilities = function() {
		if (a._capabilities != null) {
			return
		}
		var g = document.createElement("audio");
		if (g.canPlayType == null) {
			return null
		}
		a._capabilities = {
			panning: false,
			volume: true,
			tracks: -1
		};
		var k = createjs.Sound.SUPPORTED_EXTENSIONS;
		var j = createjs.Sound.EXTENSION_MAP;
		for (var f = 0, d = k.length; f < d; f++) {
			var h = k[f];
			var e = j[h] || h;
			a._capabilities[h] = (g.canPlayType("audio/" + h) != "no" && g.canPlayType("audio/" + h) != "") || (g.canPlayType("audio/" + e) != "no" && g.canPlayType("audio/" + e) != "")
		}
	};
	b.register = function(f) {
		var e = createjs.HTMLAudioTagPool.get(f.src);
		var d = this.AbstractPlugin_register(f);
		d.setTag(e);
		return d
	};
	b.removeSound = function(d) {
		this.AbstractPlugin_removeSound(d);
		createjs.HTMLAudioTagPool.remove(d)
	};
	b.create = function(g, e, f) {
		var d = this.AbstractPlugin_create(g, e, f);
		d.setPlaybackResource(null);
		return d
	};
	b.toString = function() {
		return "[HTMLAudioPlugin]"
	};
	b.setVolume = b.getVolume = b.setMute = null;
	createjs.HTMLAudioPlugin = createjs.promote(c, "AbstractPlugin")
}());
var HANDJS = HANDJS || {};
(function() {
	if (window.PointerEvent) {
		return
	}
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(J) {
			var K = Object(this);
			var H = K.length >>> 0;
			if (H === 0) {
				return -1
			}
			var L = 0;
			if (arguments.length > 0) {
				L = Number(arguments[1]);
				if (L != L) {
					L = 0
				} else {
					if (L != 0 && L != Infinity && L != -Infinity) {
						L = (L > 0 || -1) * Math.floor(Math.abs(L))
					}
				}
			}
			if (L >= H) {
				return -1
			}
			var I = L >= 0 ? L : Math.max(H - Math.abs(L), 0);
			for (; I < H; I++) {
				if (I in K && K[I] === J) {
					return I
				}
			}
			return -1
		}
	}
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(J, H) {
			if (!this || !(J instanceof Function)) {
				throw new TypeError()
			}
			for (var I = 0; I < this.length; I++) {
				J.call(H, this[I], I, this)
			}
		}
	}
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/, "")
		}
	}
	var G = ["pointerdown", "pointerup", "pointermove", "pointerover", "pointerout", "pointercancel", "pointerenter", "pointerleave"];
	var h = ["PointerDown", "PointerUp", "PointerMove", "PointerOver", "PointerOut", "PointerCancel", "PointerEnter", "PointerLeave"];
	var o = "touch";
	var r = "pen";
	var u = "mouse";
	var j = {};
	var e = function(H) {
		while (H && !H.handjs_forcePreventDefault) {
			H = H.parentNode
		}
		return !!H || window.handjs_forcePreventDefault
	};
	var c = function(K, I, M, O, H) {
		var J;
		if (document.createEvent) {
			J = document.createEvent("MouseEvents");
			J.initMouseEvent(I, M, true, window, 1, K.screenX, K.screenY, K.clientX, K.clientY, K.ctrlKey, K.altKey, K.shiftKey, K.metaKey, K.button, H || K.relatedTarget)
		} else {
			J = document.createEventObject();
			J.screenX = K.screenX;
			J.screenY = K.screenY;
			J.clientX = K.clientX;
			J.clientY = K.clientY;
			J.ctrlKey = K.ctrlKey;
			J.altKey = K.altKey;
			J.shiftKey = K.shiftKey;
			J.metaKey = K.metaKey;
			J.button = K.button;
			J.relatedTarget = H || K.relatedTarget
		}
		if (J.offsetX === undefined) {
			if (K.offsetX !== undefined) {
				if (Object && Object.defineProperty !== undefined) {
					Object.defineProperty(J, "offsetX", {
						writable: true
					});
					Object.defineProperty(J, "offsetY", {
						writable: true
					})
				}
				J.offsetX = K.offsetX;
				J.offsetY = K.offsetY
			} else {
				if (Object && Object.defineProperty !== undefined) {
					Object.defineProperty(J, "offsetX", {
						get: function() {
							if (this.currentTarget && this.currentTarget.offsetLeft) {
								return K.clientX - this.currentTarget.offsetLeft
							}
							return K.clientX
						}
					});
					Object.defineProperty(J, "offsetY", {
						get: function() {
							if (this.currentTarget && this.currentTarget.offsetTop) {
								return K.clientY - this.currentTarget.offsetTop
							}
							return K.clientY
						}
					})
				} else {
					if (K.layerX !== undefined) {
						J.offsetX = K.layerX - K.currentTarget.offsetLeft;
						J.offsetY = K.layerY - K.currentTarget.offsetTop
					}
				}
			}
		}
		if (K.isPrimary !== undefined) {
			J.isPrimary = K.isPrimary
		} else {
			J.isPrimary = true
		}
		if (K.pressure) {
			J.pressure = K.pressure
		} else {
			var L = 0;
			if (K.which !== undefined) {
				L = K.which
			} else {
				if (K.button !== undefined) {
					L = K.button
				}
			}
			J.pressure = (L == 0) ? 0 : 0.5
		}
		if (K.rotation) {
			J.rotation = K.rotation
		} else {
			J.rotation = 0
		}
		if (K.hwTimestamp) {
			J.hwTimestamp = K.hwTimestamp
		} else {
			J.hwTimestamp = 0
		}
		if (K.tiltX) {
			J.tiltX = K.tiltX
		} else {
			J.tiltX = 0
		}
		if (K.tiltY) {
			J.tiltY = K.tiltY
		} else {
			J.tiltY = 0
		}
		if (K.height) {
			J.height = K.height
		} else {
			J.height = 0
		}
		if (K.width) {
			J.width = K.width
		} else {
			J.width = 0
		}
		J.preventDefault = function() {
			if (K.preventDefault !== undefined) {
				K.preventDefault()
			}
		};
		if (J.stopPropagation !== undefined) {
			var N = J.stopPropagation;
			J.stopPropagation = function() {
				if (K.stopPropagation !== undefined) {
					K.stopPropagation()
				}
				N.call(this)
			}
		}
		J.pointerId = K.pointerId;
		J.pointerType = K.pointerType;
		switch (J.pointerType) {
			case 2:
				J.pointerType = o;
				break;
			case 3:
				J.pointerType = r;
				break;
			case 4:
				J.pointerType = u;
				break
		}
		if (O) {
			O.dispatchEvent(J)
		} else {
			if (K.target) {
				K.target.dispatchEvent(J)
			} else {
				K.srcElement.fireEvent("on" + A(I), J)
			}
		}
	};
	var k = function(I, J, K, L, H) {
		I.pointerId = 1;
		I.pointerType = u;
		c(I, J, K, L, H)
	};
	var p = function(J, K, M, I, L, H) {
		var N = K.identifier + 2;
		K.pointerId = N;
		K.pointerType = o;
		K.currentTarget = M;
		if (I.preventDefault !== undefined) {
			K.preventDefault = function() {
				I.preventDefault()
			}
		}
		c(K, J, L, M, H)
	};
	var t = function(I, H) {
		return I.__handjsGlobalRegisteredEvents && I.__handjsGlobalRegisteredEvents[H]
	};
	var a = function(I, H) {
		while (I && !t(I, H)) {
			I = I.parentNode
		}
		if (I) {
			return I
		} else {
			if (t(window, H)) {
				return window
			}
		}
	};
	var d = function(J, K, M, I, L, H) {
		if (a(M, J)) {
			p(J, K, M, I, L, H)
		}
	};
	var A = function(H) {
		return H.toLowerCase().replace("pointer", "mouse")
	};
	var C = function(J, H) {
		var I = G.indexOf(H);
		var K = J + h[I];
		return K
	};
	var F = function(K, I, J, H) {
		if (K.__handjsRegisteredEvents === undefined) {
			K.__handjsRegisteredEvents = []
		}
		if (H) {
			if (K.__handjsRegisteredEvents[I] !== undefined) {
				K.__handjsRegisteredEvents[I]++;
				return
			}
			K.__handjsRegisteredEvents[I] = 1;
			K.addEventListener(I, J, false)
		} else {
			if (K.__handjsRegisteredEvents.indexOf(I) !== -1) {
				K.__handjsRegisteredEvents[I]--;
				if (K.__handjsRegisteredEvents[I] != 0) {
					return
				}
			}
			K.removeEventListener(I, J);
			K.__handjsRegisteredEvents[I] = 0
		}
	};
	var f = function(L, I, J) {
		if (!L.__handjsGlobalRegisteredEvents) {
			L.__handjsGlobalRegisteredEvents = []
		}
		if (J) {
			if (L.__handjsGlobalRegisteredEvents[I] !== undefined) {
				L.__handjsGlobalRegisteredEvents[I]++;
				return
			}
			L.__handjsGlobalRegisteredEvents[I] = 1
		} else {
			if (L.__handjsGlobalRegisteredEvents[I] !== undefined) {
				L.__handjsGlobalRegisteredEvents[I]--;
				if (L.__handjsGlobalRegisteredEvents[I] < 0) {
					L.__handjsGlobalRegisteredEvents[I] = 0
				}
			}
		}
		var M;
		var H;
		if (window.MSPointerEvent) {
			M = function(N) {
				return C("MS", N)
			};
			H = c
		} else {
			M = A;
			H = k
		}
		switch (I) {
			case "pointerenter":
			case "pointerleave":
				var K = M(I);
				if (L["on" + K.toLowerCase()] !== undefined) {
					F(L, K, function(N) {
						H(N, I)
					}, J)
				}
				break
		}
	};
	var q = function(H) {
		var J = H.prototype ? H.prototype.addEventListener : H.addEventListener;
		var I = function(L, M, K) {
			if (G.indexOf(L) != -1) {
				f(this, L, true)
			}
			if (J === undefined) {
				this.attachEvent("on" + A(L), M)
			} else {
				J.call(this, L, M, K)
			}
		};
		if (H.prototype) {
			H.prototype.addEventListener = I
		} else {
			H.addEventListener = I
		}
	};
	var n = function(H) {
		var J = H.prototype ? H.prototype.removeEventListener : H.removeEventListener;
		var I = function(L, M, K) {
			if (G.indexOf(L) != -1) {
				f(this, L, false)
			}
			if (J === undefined) {
				this.detachEvent(A(L), M)
			} else {
				J.call(this, L, M, K)
			}
		};
		if (H.prototype) {
			H.prototype.removeEventListener = I
		} else {
			H.removeEventListener = I
		}
	};
	q(window);
	q(window.HTMLElement || window.Element);
	q(document);
	q(HTMLBodyElement);
	q(HTMLDivElement);
	q(HTMLImageElement);
	q(HTMLUListElement);
	q(HTMLAnchorElement);
	q(HTMLLIElement);
	q(HTMLTableElement);
	if (window.HTMLSpanElement) {
		q(HTMLSpanElement)
	}
	if (window.HTMLCanvasElement) {
		q(HTMLCanvasElement)
	}
	if (window.SVGElement) {
		q(SVGElement)
	}
	n(window);
	n(window.HTMLElement || window.Element);
	n(document);
	n(HTMLBodyElement);
	n(HTMLDivElement);
	n(HTMLImageElement);
	n(HTMLUListElement);
	n(HTMLAnchorElement);
	n(HTMLLIElement);
	n(HTMLTableElement);
	if (window.HTMLSpanElement) {
		n(HTMLSpanElement)
	}
	if (window.HTMLCanvasElement) {
		n(HTMLCanvasElement)
	}
	if (window.SVGElement) {
		n(SVGElement)
	}
	var b = false;
	var l = -1;

	function B() {
		b = true;
		clearTimeout(l);
		l = setTimeout(function() {
			b = false
		}, 700)
	}

	function m(I) {
		var H = [];
		if (I) {
			H.unshift(I);
			while (I.parentNode) {
				H.unshift(I.parentNode);
				I = I.parentNode
			}
		}
		return H
	}

	function D(K, I) {
		var J = m(K);
		var H = m(I);
		var L = null;
		while (J.length > 0 && J[0] == H.shift()) {
			L = J.shift()
		}
		return L
	}

	function v(K, H, M) {
		var L = D(K, H);
		var J = K;
		var I = [];
		while (J && J != L) {
			if (t(J, "pointerenter")) {
				I.push(J)
			}
			J = J.parentNode
		}
		while (I.length > 0) {
			M(I.pop())
		}
	}

	function g(J, H, L) {
		var K = D(J, H);
		var I = J;
		while (I && I != K) {
			if (t(I, "pointerleave")) {
				L(I)
			}
			I = I.parentNode
		}
	}

	function E(I, H) {
		["pointerdown", "pointermove", "pointerup", "pointerover", "pointerout"].forEach(function(J) {
			window.addEventListener(I(J), function(K) {
				if (!b && a(K.target, J)) {
					H(K, J, true)
				}
			})
		});
		if (window["on" + I("pointerenter").toLowerCase()] === undefined) {
			window.addEventListener(I("pointerover"), function(K) {
				if (b) {
					return
				}
				var J = a(K.target, "pointerenter");
				if (!J || J === window) {
					return
				} else {
					if (!J.contains(K.relatedTarget)) {
						v(J, K.relatedTarget, function(L) {
							H(K, "pointerenter", false, L, K.relatedTarget)
						})
					}
				}
			})
		}
		if (window["on" + I("pointerleave").toLowerCase()] === undefined) {
			window.addEventListener(I("pointerout"), function(K) {
				if (b) {
					return
				}
				var J = a(K.target, "pointerleave");
				if (!J || J === window) {
					return
				} else {
					if (!J.contains(K.relatedTarget)) {
						g(J, K.relatedTarget, function(L) {
							H(K, "pointerleave", false, L, K.relatedTarget)
						})
					}
				}
			})
		}
	}(function() {
		if (window.MSPointerEvent) {
			E(function(H) {
				return C("MS", H)
			}, c)
		} else {
			E(A, k);
			if (window.ontouchstart !== undefined) {
				window.addEventListener("touchstart", function(H) {
					for (var I = 0; I < H.changedTouches.length; ++I) {
						var J = H.changedTouches[I];
						j[J.identifier] = J.target;
						d("pointerover", J, J.target, H, true);
						v(J.target, null, function(K) {
							p("pointerenter", J, K, H, false)
						});
						d("pointerdown", J, J.target, H, true)
					}
					B()
				});
				window.addEventListener("touchend", function(H) {
					for (var I = 0; I < H.changedTouches.length; ++I) {
						var J = H.changedTouches[I];
						var K = j[J.identifier];
						d("pointerup", J, K, H, true);
						d("pointerout", J, K, H, true);
						g(K, null, function(L) {
							p("pointerleave", J, L, H, false)
						})
					}
					B()
				});
				window.addEventListener("touchmove", function(H) {
					for (var I = 0; I < H.changedTouches.length; ++I) {
						var J = H.changedTouches[I];
						var L = document.elementFromPoint(J.clientX, J.clientY);
						var K = j[J.identifier];
						if (K && e(K) === true) {
							H.preventDefault()
						}
						d("pointermove", J, K, H, true);
						if (K === L) {
							continue
						}
						if (K) {
							d("pointerout", J, K, H, true, L);
							if (!K.contains(L)) {
								g(K, L, function(M) {
									p("pointerleave", J, M, H, false, L)
								})
							}
						}
						if (L) {
							d("pointerover", J, L, H, true, K);
							if (!L.contains(K)) {
								v(L, K, function(M) {
									p("pointerenter", J, M, H, false, K)
								})
							}
						}
						j[J.identifier] = L
					}
					B()
				});
				window.addEventListener("touchcancel", function(H) {
					for (var I = 0; I < H.changedTouches.length; ++I) {
						var J = H.changedTouches[I];
						d("pointercancel", J, j[J.identifier], H, true)
					}
				})
			}
		}
	})();
	if (navigator.pointerEnabled === undefined) {
		navigator.pointerEnabled = true;
		if (navigator.msPointerEnabled) {
			navigator.maxTouchPoints = navigator.msMaxTouchPoints
		}
	}
	if (document.styleSheets && document.addEventListener) {
		document.addEventListener("DOMContentLoaded", function() {
			if (HANDJS.doNotProcessCSS || document.body.style.touchAction !== undefined) {
				return
			}
			var H = new RegExp(".+?{.*?}", "m");
			var I = new RegExp(".+?{", "m");
			var S = function(Z) {
				var V = H.exec(Z);
				if (!V) {
					return
				}
				var Y = V[0];
				Z = Z.replace(Y, "").trim();
				var X = I.exec(Y)[0].replace("{", "").trim();
				if (Y.replace(/\s/g, "").indexOf("touch-action:none") != -1) {
					var W = document.querySelectorAll(X);
					for (var U = 0; U < W.length; U++) {
						var T = W[U];
						if (T.style.msTouchAction !== undefined) {
							T.style.msTouchAction = "none"
						} else {
							T.handjs_forcePreventDefault = true
						}
					}
				}
				return Z
			};
			var J = function(T) {
				if (window.setImmediate) {
					if (T) {
						setImmediate(J, S(T))
					}
				} else {
					while (T) {
						T = S(T)
					}
				}
			};
			try {
				for (var K = 0; K < document.styleSheets.length; K++) {
					var M = document.styleSheets[K];
					if (M.href == undefined) {
						continue
					}
					var R = new XMLHttpRequest();
					R.open("get", M.href);
					R.send();
					var O = R.responseText.replace(/(\n|\r)/g, "");
					J(O)
				}
			} catch (L) {}
			var Q = document.getElementsByTagName("style");
			for (var K = 0; K < Q.length; K++) {
				var N = Q[K];
				var P = N.innerHTML.replace(/(\n|\r)/g, "").trim();
				J(P)
			}
		}, false)
	}
})();
if (Date.now === undefined) {
	Date.now = function() {
		return new Date().valueOf()
	}
}
var TWEEN = TWEEN || (function() {
	var a = [];
	return {
		REVISION: "14",
		getAll: function() {
			return a
		},
		removeAll: function() {
			a = []
		},
		add: function(b) {
			a.push(b)
		},
		remove: function(c) {
			var b = a.indexOf(c);
			if (b !== -1) {
				a.splice(b, 1)
			}
		},
		update: function(c) {
			if (a.length === 0) {
				return false
			}
			var b = 0;
			c = c !== undefined ? c : (typeof window !== "undefined" && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now());
			while (b < a.length) {
				if (a[b].update(c)) {
					b++
				} else {
					a.splice(b, 1)
				}
			}
			return true
		}
	}
})();
TWEEN.Tween = function(A) {
	var g = A;
	var b = {};
	var j = {};
	var k = {};
	var e = 1000;
	var q = 0;
	var r = false;
	var m = false;
	var f = false;
	var u = 0;
	var v = null;
	var d = TWEEN.Easing.Linear.None;
	var l = TWEEN.Interpolation.Linear;
	var n = [];
	var o = null;
	var p = false;
	var c = null;
	var t = null;
	var h = null;
	for (var a in A) {
		b[a] = parseFloat(A[a], 10)
	}
	this.to = function(B, C) {
		if (C !== undefined) {
			e = C
		}
		j = B;
		return this
	};
	this.start = function(C) {
		TWEEN.add(this);
		m = true;
		p = false;
		v = C !== undefined ? C : (typeof window !== "undefined" && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now());
		v += u;
		for (var B in j) {
			if (j[B] instanceof Array) {
				if (j[B].length === 0) {
					continue
				}
				j[B] = [g[B]].concat(j[B])
			}
			b[B] = g[B];
			if ((b[B] instanceof Array) === false) {
				b[B] *= 1
			}
			k[B] = b[B] || 0
		}
		return this
	};
	this.stop = function() {
		if (!m) {
			return this
		}
		TWEEN.remove(this);
		m = false;
		if (h !== null) {
			h.call(g)
		}
		this.stopChainedTweens();
		return this
	};
	this.stopChainedTweens = function() {
		for (var C = 0, B = n.length; C < B; C++) {
			n[C].stop()
		}
	};
	this.delay = function(B) {
		u = B;
		return this
	};
	this.repeat = function(B) {
		q = B;
		return this
	};
	this.yoyo = function(B) {
		r = B;
		return this
	};
	this.easing = function(B) {
		d = B;
		return this
	};
	this.interpolation = function(B) {
		l = B;
		return this
	};
	this.chain = function() {
		n = arguments;
		return this
	};
	this.onStart = function(B) {
		o = B;
		return this
	};
	this.onUpdate = function(B) {
		c = B;
		return this
	};
	this.onComplete = function(B) {
		t = B;
		return this
	};
	this.onStop = function(B) {
		h = B;
		return this
	};
	this.update = function(C) {
		var I;
		if (C < v) {
			return true
		}
		if (p === false) {
			if (o !== null) {
				o.call(g)
			}
			p = true
		}
		var J = (C - v) / e;
		J = J > 1 ? 1 : J;
		var H = d(J);
		for (I in j) {
			var B = b[I] || 0;
			var D = j[I];
			if (D instanceof Array) {
				g[I] = l(D, H)
			} else {
				if (typeof(D) === "string") {
					D = B + parseFloat(D, 10)
				}
				if (typeof(D) === "number") {
					g[I] = B + (D - B) * H
				}
			}
		}
		if (c !== null) {
			c.call(g, H)
		}
		if (J == 1) {
			if (q > 0) {
				if (isFinite(q)) {
					q--
				}
				for (I in k) {
					if (typeof(j[I]) === "string") {
						k[I] = k[I] + parseFloat(j[I], 10)
					}
					if (r) {
						var E = k[I];
						k[I] = j[I];
						j[I] = E
					}
					b[I] = k[I]
				}
				if (r) {
					f = !f
				}
				v = C + u;
				return true
			} else {
				if (t !== null) {
					t.call(g)
				}
				for (var F = 0, G = n.length; F < G; F++) {
					n[F].start(C)
				}
				return false
			}
		}
		return true
	}
};
TWEEN.Easing = {
	Linear: {
		None: function(a) {
			return a
		}
	},
	Quadratic: {
		In: function(a) {
			return a * a
		},
		Out: function(a) {
			return a * (2 - a)
		},
		InOut: function(a) {
			if ((a *= 2) < 1) {
				return 0.5 * a * a
			}
			return -0.5 * (--a * (a - 2) - 1)
		}
	},
	Cubic: {
		In: function(a) {
			return a * a * a
		},
		Out: function(a) {
			return --a * a * a + 1
		},
		InOut: function(a) {
			if ((a *= 2) < 1) {
				return 0.5 * a * a * a
			}
			return 0.5 * ((a -= 2) * a * a + 2)
		}
	},
	Quartic: {
		In: function(a) {
			return a * a * a * a
		},
		Out: function(a) {
			return 1 - (--a * a * a * a)
		},
		InOut: function(a) {
			if ((a *= 2) < 1) {
				return 0.5 * a * a * a * a
			}
			return -0.5 * ((a -= 2) * a * a * a - 2)
		}
	},
	Quintic: {
		In: function(a) {
			return a * a * a * a * a
		},
		Out: function(a) {
			return --a * a * a * a * a + 1
		},
		InOut: function(a) {
			if ((a *= 2) < 1) {
				return 0.5 * a * a * a * a * a
			}
			return 0.5 * ((a -= 2) * a * a * a * a + 2)
		}
	},
	Sinusoidal: {
		In: function(a) {
			return 1 - Math.cos(a * Math.PI / 2)
		},
		Out: function(a) {
			return Math.sin(a * Math.PI / 2)
		},
		InOut: function(a) {
			return 0.5 * (1 - Math.cos(Math.PI * a))
		}
	},
	Exponential: {
		In: function(a) {
			return a === 0 ? 0 : Math.pow(1024, a - 1)
		},
		Out: function(a) {
			return a === 1 ? 1 : 1 - Math.pow(2, -10 * a)
		},
		InOut: function(a) {
			if (a === 0) {
				return 0
			}
			if (a === 1) {
				return 1
			}
			if ((a *= 2) < 1) {
				return 0.5 * Math.pow(1024, a - 1)
			}
			return 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2)
		}
	},
	Circular: {
		In: function(a) {
			return 1 - Math.sqrt(1 - a * a)
		},
		Out: function(a) {
			return Math.sqrt(1 - (--a * a))
		},
		InOut: function(a) {
			if ((a *= 2) < 1) {
				return -0.5 * (Math.sqrt(1 - a * a) - 1)
			}
			return 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
		}
	},
	Elastic: {
		In: function(c) {
			var d, b = 0.1,
				e = 0.4;
			if (c === 0) {
				return 0
			}
			if (c === 1) {
				return 1
			}
			if (!b || b < 1) {
				b = 1;
				d = e / 4
			} else {
				d = e * Math.asin(1 / b) / (2 * Math.PI)
			}
			return -(b * Math.pow(2, 10 * (c -= 1)) * Math.sin((c - d) * (2 * Math.PI) / e))
		},
		Out: function(c) {
			var d, b = 0.1,
				e = 0.4;
			if (c === 0) {
				return 0
			}
			if (c === 1) {
				return 1
			}
			if (!b || b < 1) {
				b = 1;
				d = e / 4
			} else {
				d = e * Math.asin(1 / b) / (2 * Math.PI)
			}
			return (b * Math.pow(2, -10 * c) * Math.sin((c - d) * (2 * Math.PI) / e) + 1)
		},
		InOut: function(c) {
			var d, b = 0.1,
				e = 0.4;
			if (c === 0) {
				return 0
			}
			if (c === 1) {
				return 1
			}
			if (!b || b < 1) {
				b = 1;
				d = e / 4
			} else {
				d = e * Math.asin(1 / b) / (2 * Math.PI)
			}
			if ((c *= 2) < 1) {
				return -0.5 * (b * Math.pow(2, 10 * (c -= 1)) * Math.sin((c - d) * (2 * Math.PI) / e))
			}
			return b * Math.pow(2, -10 * (c -= 1)) * Math.sin((c - d) * (2 * Math.PI) / e) * 0.5 + 1
		}
	},
	Back: {
		In: function(a) {
			var b = 1.70158;
			return a * a * ((b + 1) * a - b)
		},
		Out: function(a) {
			var b = 1.70158;
			return --a * a * ((b + 1) * a + b) + 1
		},
		InOut: function(a) {
			var b = 1.70158 * 1.525;
			if ((a *= 2) < 1) {
				return 0.5 * (a * a * ((b + 1) * a - b))
			}
			return 0.5 * ((a -= 2) * a * ((b + 1) * a + b) + 2)
		}
	},
	Bounce: {
		In: function(a) {
			return 1 - TWEEN.Easing.Bounce.Out(1 - a)
		},
		Out: function(a) {
			if (a < (1 / 2.75)) {
				return 7.5625 * a * a
			} else {
				if (a < (2 / 2.75)) {
					return 7.5625 * (a -= (1.5 / 2.75)) * a + 0.75
				} else {
					if (a < (2.5 / 2.75)) {
						return 7.5625 * (a -= (2.25 / 2.75)) * a + 0.9375
					} else {
						return 7.5625 * (a -= (2.625 / 2.75)) * a + 0.984375
					}
				}
			}
		},
		InOut: function(a) {
			if (a < 0.5) {
				return TWEEN.Easing.Bounce.In(a * 2) * 0.5
			}
			return TWEEN.Easing.Bounce.Out(a * 2 - 1) * 0.5 + 0.5
		}
	}
};
TWEEN.Interpolation = {
	Linear: function(c, b) {
		var a = c.length - 1,
			g = a * b,
			d = Math.floor(g),
			e = TWEEN.Interpolation.Utils.Linear;
		if (b < 0) {
			return e(c[0], c[1], g)
		}
		if (b > 1) {
			return e(c[a], c[a - 1], a - g)
		}
		return e(c[d], c[d + 1 > a ? a : d + 1], g - d)
	},
	Bezier: function(d, c) {
		var a = 0,
			h = d.length - 1,
			f = Math.pow,
			g = TWEEN.Interpolation.Utils.Bernstein,
			e;
		for (e = 0; e <= h; e++) {
			a += f(1 - c, h - e) * f(c, e) * d[e] * g(h, e)
		}
		return a
	},
	CatmullRom: function(c, b) {
		var a = c.length - 1,
			g = a * b,
			d = Math.floor(g),
			e = TWEEN.Interpolation.Utils.CatmullRom;
		if (c[0] === c[a]) {
			if (b < 0) {
				d = Math.floor(g = a * (1 + b))
			}
			return e(c[(d - 1 + a) % a], c[d], c[(d + 1) % a], c[(d + 2) % a], g - d)
		} else {
			if (b < 0) {
				return c[0] - (e(c[0], c[0], c[1], c[1], -g) - c[0])
			}
			if (b > 1) {
				return c[a] - (e(c[a], c[a], c[a - 1], c[a - 1], g - a) - c[a])
			}
			return e(c[d ? d - 1 : 0], c[d], c[a < d + 1 ? a : d + 1], c[a < d + 2 ? a : d + 2], g - d)
		}
	},
	Utils: {
		Linear: function(c, b, a) {
			return (b - c) * a + c
		},
		Bernstein: function(c, a) {
			var b = TWEEN.Interpolation.Utils.Factorial;
			return b(c) / b(a) / b(c - a)
		},
		Factorial: (function() {
			var b = [1];
			return function(d) {
				var c = 1,
					a;
				if (b[d]) {
					return b[d]
				}
				for (a = d; a > 1; a--) {
					c *= a
				}
				return b[d] = c
			}
		})(),
		CatmullRom: function(h, g, e, d, j) {
			var f = (e - h) * 0.5,
				c = (d - g) * 0.5,
				b = j * j,
				a = j * b;
			return (2 * g - 2 * e + f + c) * a + (-3 * g + 3 * e - 2 * f - c) * b + f * j + g
		}
	}
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = TWEEN
}
var THREE = {
	REVISION: "71"
};
if (typeof module === "object") {
	module.exports = THREE
}
if (Math.sign === undefined) {
	Math.sign = function(a) {
		return (a < 0) ? -1 : (a > 0) ? 1 : +a
	}
}
THREE.log = function() {
	if (window.console && window.console.log) {
		console.log.apply(console, arguments)
	}
};
THREE.warn = function() {
	if (window.console && window.console.log) {
		console.warn.apply(console, arguments)
	}
};
THREE.error = function() {
	if (window.console && window.console.log) {
		console.error.apply(console, arguments)
	}
};
THREE.MOUSE = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2
};
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.MinEquation = 103;
THREE.MaxEquation = 104;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = 300;
THREE.CubeReflectionMapping = 301;
THREE.CubeRefractionMapping = 302;
THREE.EquirectangularReflectionMapping = 303;
THREE.EquirectangularRefractionMapping = 304;
THREE.SphericalReflectionMapping = 305;
THREE.RepeatWrapping = 1000;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.HalfFloatType = 1025;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGBEFormat = THREE.RGBAFormat;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;
THREE.Projector = function() {
	THREE.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");
	this.projectVector = function(a, b) {
		THREE.warn("THREE.Projector: .projectVector() is now vector.project().");
		a.project(b)
	};
	this.unprojectVector = function(a, b) {
		THREE.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
		a.unproject(b)
	};
	this.pickingRay = function(a, b) {
		THREE.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
	}
};
THREE.CanvasRenderer = function() {
	THREE.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
	this.domElement = document.createElement("canvas");
	this.clear = function() {};
	this.render = function() {};
	this.setClearColor = function() {};
	this.setSize = function() {}
};
THREE.Color = function(a) {
	if (arguments.length === 3) {
		return this.setRGB(arguments[0], arguments[1], arguments[2])
	}
	return this.set(a)
};
THREE.Color.prototype = {
	constructor: THREE.Color,
	r: 1,
	g: 1,
	b: 1,
	set: function(a) {
		if (a instanceof THREE.Color) {
			this.copy(a)
		} else {
			if (typeof a === "number") {
				this.setHex(a)
			} else {
				if (typeof a === "string") {
					this.setStyle(a)
				}
			}
		}
		return this
	},
	setHex: function(a) {
		a = Math.floor(a);
		this.r = (a >> 16 & 255) / 255;
		this.g = (a >> 8 & 255) / 255;
		this.b = (a & 255) / 255;
		return this
	},
	setRGB: function(d, c, a) {
		this.r = d;
		this.g = c;
		this.b = a;
		return this
	},
	setHSL: function(d, c, b) {
		if (c === 0) {
			this.r = this.g = this.b = b
		} else {
			var a = function(j, h, g) {
				if (g < 0) {
					g += 1
				}
				if (g > 1) {
					g -= 1
				}
				if (g < 1 / 6) {
					return j + (h - j) * 6 * g
				}
				if (g < 1 / 2) {
					return h
				}
				if (g < 2 / 3) {
					return j + (h - j) * 6 * (2 / 3 - g)
				}
				return j
			};
			var f = b <= 0.5 ? b * (1 + c) : b + c - (b * c);
			var e = (2 * b) - f;
			this.r = a(e, f, d + 1 / 3);
			this.g = a(e, f, d);
			this.b = a(e, f, d - 1 / 3)
		}
		return this
	},
	setStyle: function(b) {
		if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(b)) {
			var a = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(b);
			this.r = Math.min(255, parseInt(a[1], 10)) / 255;
			this.g = Math.min(255, parseInt(a[2], 10)) / 255;
			this.b = Math.min(255, parseInt(a[3], 10)) / 255;
			return this
		}
		if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(b)) {
			var a = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(b);
			this.r = Math.min(100, parseInt(a[1], 10)) / 100;
			this.g = Math.min(100, parseInt(a[2], 10)) / 100;
			this.b = Math.min(100, parseInt(a[3], 10)) / 100;
			return this
		}
		if (/^\#([0-9a-f]{6})$/i.test(b)) {
			var a = /^\#([0-9a-f]{6})$/i.exec(b);
			this.setHex(parseInt(a[1], 16));
			return this
		}
		if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(b)) {
			var a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(b);
			this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16));
			return this
		}
		if (/^(\w+)$/i.test(b)) {
			this.setHex(THREE.ColorKeywords[b]);
			return this
		}
	},
	copy: function(a) {
		this.r = a.r;
		this.g = a.g;
		this.b = a.b;
		return this
	},
	copyGammaToLinear: function(a, b) {
		if (b === undefined) {
			b = 2
		}
		this.r = Math.pow(a.r, b);
		this.g = Math.pow(a.g, b);
		this.b = Math.pow(a.b, b);
		return this
	},
	copyLinearToGamma: function(b, c) {
		if (c === undefined) {
			c = 2
		}
		var a = (c > 0) ? (1 / c) : 1;
		this.r = Math.pow(b.r, a);
		this.g = Math.pow(b.g, a);
		this.b = Math.pow(b.b, a);
		return this
	},
	convertGammaToLinear: function() {
		var d = this.r,
			c = this.g,
			a = this.b;
		this.r = d * d;
		this.g = c * c;
		this.b = a * a;
		return this
	},
	convertLinearToGamma: function() {
		this.r = Math.sqrt(this.r);
		this.g = Math.sqrt(this.g);
		this.b = Math.sqrt(this.b);
		return this
	},
	getHex: function() {
		return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0
	},
	getHexString: function() {
		return ("000000" + this.getHex().toString(16)).slice(-6)
	},
	getHSL: function(n) {
		var m = n || {
			h: 0,
			s: 0,
			l: 0
		};
		var a = this.r,
			e = this.g,
			h = this.b;
		var j = Math.max(a, e, h);
		var c = Math.min(a, e, h);
		var f, d;
		var l = (c + j) / 2;
		if (c === j) {
			f = 0;
			d = 0
		} else {
			var k = j - c;
			d = l <= 0.5 ? k / (j + c) : k / (2 - j - c);
			switch (j) {
				case a:
					f = (e - h) / k + (e < h ? 6 : 0);
					break;
				case e:
					f = (h - a) / k + 2;
					break;
				case h:
					f = (a - e) / k + 4;
					break
			}
			f /= 6
		}
		m.h = f;
		m.s = d;
		m.l = l;
		return m
	},
	getStyle: function() {
		return "rgb(" + ((this.r * 255) | 0) + "," + ((this.g * 255) | 0) + "," + ((this.b * 255) | 0) + ")"
	},
	offsetHSL: function(d, c, a) {
		var b = this.getHSL();
		b.h += d;
		b.s += c;
		b.l += a;
		this.setHSL(b.h, b.s, b.l);
		return this
	},
	add: function(a) {
		this.r += a.r;
		this.g += a.g;
		this.b += a.b;
		return this
	},
	addColors: function(b, a) {
		this.r = b.r + a.r;
		this.g = b.g + a.g;
		this.b = b.b + a.b;
		return this
	},
	addScalar: function(a) {
		this.r += a;
		this.g += a;
		this.b += a;
		return this
	},
	multiply: function(a) {
		this.r *= a.r;
		this.g *= a.g;
		this.b *= a.b;
		return this
	},
	multiplyScalar: function(a) {
		this.r *= a;
		this.g *= a;
		this.b *= a;
		return this
	},
	lerp: function(a, b) {
		this.r += (a.r - this.r) * b;
		this.g += (a.g - this.g) * b;
		this.b += (a.b - this.b) * b;
		return this
	},
	equals: function(a) {
		return (a.r === this.r) && (a.g === this.g) && (a.b === this.b)
	},
	fromArray: function(a) {
		this.r = a[0];
		this.g = a[1];
		this.b = a[2];
		return this
	},
	toArray: function(b, a) {
		if (b === undefined) {
			b = []
		}
		if (a === undefined) {
			a = 0
		}
		b[a] = this.r;
		b[a + 1] = this.g;
		b[a + 2] = this.b;
		return b
	},
	clone: function() {
		return new THREE.Color().setRGB(this.r, this.g, this.b)
	}
};
THREE.ColorKeywords = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
THREE.Quaternion = function(a, d, c, b) {
	this._x = a || 0;
	this._y = d || 0;
	this._z = c || 0;
	this._w = (b !== undefined) ? b : 1
};
THREE.Quaternion.prototype = {
	constructor: THREE.Quaternion,
	_x: 0,
	_y: 0,
	_z: 0,
	_w: 0,
	get x() {
		return this._x
	},
	set x(a) {
		this._x = a;
		this.onChangeCallback()
	},
	get y() {
		return this._y
	},
	set y(a) {
		this._y = a;
		this.onChangeCallback()
	},
	get z() {
		return this._z
	},
	set z(a) {
		this._z = a;
		this.onChangeCallback()
	},
	get w() {
		return this._w
	},
	set w(a) {
		this._w = a;
		this.onChangeCallback()
	},
	set: function(a, d, c, b) {
		this._x = a;
		this._y = d;
		this._z = c;
		this._w = b;
		this.onChangeCallback();
		return this
	},
	copy: function(a) {
		this._x = a.x;
		this._y = a.y;
		this._z = a.z;
		this._w = a.w;
		this.onChangeCallback();
		return this
	},
	setFromEuler: function(g, h) {
		if (g instanceof THREE.Euler === false) {
			throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.")
		}
		var f = Math.cos(g._x / 2);
		var e = Math.cos(g._y / 2);
		var c = Math.cos(g._z / 2);
		var d = Math.sin(g._x / 2);
		var b = Math.sin(g._y / 2);
		var a = Math.sin(g._z / 2);
		if (g.order === "XYZ") {
			this._x = d * e * c + f * b * a;
			this._y = f * b * c - d * e * a;
			this._z = f * e * a + d * b * c;
			this._w = f * e * c - d * b * a
		} else {
			if (g.order === "YXZ") {
				this._x = d * e * c + f * b * a;
				this._y = f * b * c - d * e * a;
				this._z = f * e * a - d * b * c;
				this._w = f * e * c + d * b * a
			} else {
				if (g.order === "ZXY") {
					this._x = d * e * c - f * b * a;
					this._y = f * b * c + d * e * a;
					this._z = f * e * a + d * b * c;
					this._w = f * e * c - d * b * a
				} else {
					if (g.order === "ZYX") {
						this._x = d * e * c - f * b * a;
						this._y = f * b * c + d * e * a;
						this._z = f * e * a - d * b * c;
						this._w = f * e * c + d * b * a
					} else {
						if (g.order === "YZX") {
							this._x = d * e * c + f * b * a;
							this._y = f * b * c + d * e * a;
							this._z = f * e * a - d * b * c;
							this._w = f * e * c - d * b * a
						} else {
							if (g.order === "XZY") {
								this._x = d * e * c - f * b * a;
								this._y = f * b * c - d * e * a;
								this._z = f * e * a + d * b * c;
								this._w = f * e * c + d * b * a
							}
						}
					}
				}
			}
		}
		if (h !== false) {
			this.onChangeCallback()
		}
		return this
	},
	setFromAxisAngle: function(c, d) {
		var a = d / 2,
			b = Math.sin(a);
		this._x = c.x * b;
		this._y = c.y * b;
		this._z = c.z * b;
		this._w = Math.cos(a);
		this.onChangeCallback();
		return this
	},
	setFromRotationMatrix: function(e) {
		var d = e.elements,
			j = d[0],
			h = d[4],
			g = d[8],
			c = d[1],
			b = d[5],
			a = d[9],
			n = d[2],
			l = d[6],
			k = d[10],
			f = j + b + k,
			o;
		if (f > 0) {
			o = 0.5 / Math.sqrt(f + 1);
			this._w = 0.25 / o;
			this._x = (l - a) * o;
			this._y = (g - n) * o;
			this._z = (c - h) * o
		} else {
			if (j > b && j > k) {
				o = 2 * Math.sqrt(1 + j - b - k);
				this._w = (l - a) / o;
				this._x = 0.25 * o;
				this._y = (h + c) / o;
				this._z = (g + n) / o
			} else {
				if (b > k) {
					o = 2 * Math.sqrt(1 + b - j - k);
					this._w = (g - n) / o;
					this._x = (h + c) / o;
					this._y = 0.25 * o;
					this._z = (a + l) / o
				} else {
					o = 2 * Math.sqrt(1 + k - j - b);
					this._w = (c - h) / o;
					this._x = (g + n) / o;
					this._y = (a + l) / o;
					this._z = 0.25 * o
				}
			}
		}
		this.onChangeCallback();
		return this
	},
	setFromUnitVectors: function() {
		var c, a;
		var b = 0.000001;
		return function(d, e) {
			if (c === undefined) {
				c = new THREE.Vector3()
			}
			a = d.dot(e) + 1;
			if (a < b) {
				a = 0;
				if (Math.abs(d.x) > Math.abs(d.z)) {
					c.set(-d.y, d.x, 0)
				} else {
					c.set(0, -d.z, d.y)
				}
			} else {
				c.crossVectors(d, e)
			}
			this._x = c.x;
			this._y = c.y;
			this._z = c.z;
			this._w = a;
			this.normalize();
			return this
		}
	}(),
	inverse: function() {
		this.conjugate().normalize();
		return this
	},
	conjugate: function() {
		this._x *= -1;
		this._y *= -1;
		this._z *= -1;
		this.onChangeCallback();
		return this
	},
	dot: function(a) {
		return this._x * a._x + this._y * a._y + this._z * a._z + this._w * a._w
	},
	lengthSq: function() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
	},
	length: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
	},
	normalize: function() {
		var a = this.length();
		if (a === 0) {
			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1
		} else {
			a = 1 / a;
			this._x = this._x * a;
			this._y = this._y * a;
			this._z = this._z * a;
			this._w = this._w * a
		}
		this.onChangeCallback();
		return this
	},
	multiply: function(a, b) {
		if (b !== undefined) {
			THREE.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.");
			return this.multiplyQuaternions(a, b)
		}
		return this.multiplyQuaternions(this, a)
	},
	multiplyQuaternions: function(m, l) {
		var j = m._x,
			h = m._y,
			g = m._z,
			k = m._w;
		var e = l._x,
			d = l._y,
			c = l._z,
			f = l._w;
		this._x = j * f + k * e + h * c - g * d;
		this._y = h * f + k * d + g * e - j * c;
		this._z = g * f + k * c + j * d - h * e;
		this._w = k * f - j * e - h * d - g * c;
		this.onChangeCallback();
		return this
	},
	multiplyVector3: function(a) {
		THREE.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
		return a.applyQuaternion(this)
	},
	slerp: function(c, l) {
		if (l === 0) {
			return this
		}
		if (l === 1) {
			return this.copy(c)
		}
		var j = this._x,
			h = this._y,
			g = this._z,
			k = this._w;
		var b = k * c._w + j * c._x + h * c._y + g * c._z;
		if (b < 0) {
			this._w = -c._w;
			this._x = -c._x;
			this._y = -c._y;
			this._z = -c._z;
			b = -b
		} else {
			this.copy(c)
		}
		if (b >= 1) {
			this._w = k;
			this._x = j;
			this._y = h;
			this._z = g;
			return this
		}
		var d = Math.acos(b);
		var a = Math.sqrt(1 - b * b);
		if (Math.abs(a) < 0.001) {
			this._w = 0.5 * (k + this._w);
			this._x = 0.5 * (j + this._x);
			this._y = 0.5 * (h + this._y);
			this._z = 0.5 * (g + this._z);
			return this
		}
		var f = Math.sin((1 - l) * d) / a,
			e = Math.sin(l * d) / a;
		this._w = (k * f + this._w * e);
		this._x = (j * f + this._x * e);
		this._y = (h * f + this._y * e);
		this._z = (g * f + this._z * e);
		this.onChangeCallback();
		return this
	},
	equals: function(a) {
		return (a._x === this._x) && (a._y === this._y) && (a._z === this._z) && (a._w === this._w)
	},
	fromArray: function(b, a) {
		if (a === undefined) {
			a = 0
		}
		this._x = b[a];
		this._y = b[a + 1];
		this._z = b[a + 2];
		this._w = b[a + 3];
		this.onChangeCallback();
		return this
	},
	toArray: function(b, a) {
		if (b === undefined) {
			b = []
		}
		if (a === undefined) {
			a = 0
		}
		b[a] = this._x;
		b[a + 1] = this._y;
		b[a + 2] = this._z;
		b[a + 3] = this._w;
		return b
	},
	onChange: function(a) {
		this.onChangeCallback = a;
		return this
	},
	onChangeCallback: function() {},
	clone: function() {
		return new THREE.Quaternion(this._x, this._y, this._z, this._w)
	}
};
THREE.Quaternion.slerp = function(d, c, b, a) {
	return b.copy(d).slerp(c, a)
};
THREE.Vector2 = function(a, b) {
	this.x = a || 0;
	this.y = b || 0
};
THREE.Vector2.prototype = {
	constructor: THREE.Vector2,
	set: function(a, b) {
		this.x = a;
		this.y = b;
		return this
	},
	setX: function(a) {
		this.x = a;
		return this
	},
	setY: function(a) {
		this.y = a;
		return this
	},
	setComponent: function(a, b) {
		switch (a) {
			case 0:
				this.x = b;
				break;
			case 1:
				this.y = b;
				break;
			default:
				throw new Error("index is out of range: " + a)
		}
	},
	getComponent: function(a) {
		switch (a) {
			case 0:
				return this.x;
			case 1:
				return this.y;
			default:
				throw new Error("index is out of range: " + a)
		}
	},
	copy: function(a) {
		this.x = a.x;
		this.y = a.y;
		return this
	},
	add: function(b, a) {
		if (a !== undefined) {
			THREE.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
			return this.addVectors(b, a)
		}
		this.x += b.x;
		this.y += b.y;
		return this
	},
	addScalar: function(a) {
		this.x += a;
		this.y += a;
		return this
	},
	addVectors: function(d, c) {
		this.x = d.x + c.x;
		this.y = d.y + c.y;
		return this
	},
	sub: function(b, a) {
		if (a !== undefined) {
			THREE.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
			return this.subVectors(b, a)
		}
		this.x -= b.x;
		this.y -= b.y;
		return this
	},
	subScalar: function(a) {
		this.x -= a;
		this.y -= a;
		return this
	},
	subVectors: function(d, c) {
		this.x = d.x - c.x;
		this.y = d.y - c.y;
		return this
	},
	multiply: function(a) {
		this.x *= a.x;
		this.y *= a.y;
		return this
	},
	multiplyScalar: function(a) {
		this.x *= a;
		this.y *= a;
		return this
	},
	divide: function(a) {
		this.x /= a.x;
		this.y /= a.y;
		return this
	},
	divideScalar: function(b) {
		if (b !== 0) {
			var a = 1 / b;
			this.x *= a;
			this.y *= a
		} else {
			this.x = 0;
			this.y = 0
		}
		return this
	},
	min: function(a) {
		if (this.x > a.x) {
			this.x = a.x
		}
		if (this.y > a.y) {
			this.y = a.y
		}
		return this
	},
	max: function(a) {
		if (this.x < a.x) {
			this.x = a.x
		}
		if (this.y < a.y) {
			this.y = a.y
		}
		return this
	},
	clamp: function(b, a) {
		if (this.x < b.x) {
			this.x = b.x
		} else {
			if (this.x > a.x) {
				this.x = a.x
			}
		}
		if (this.y < b.y) {
			this.y = b.y
		} else {
			if (this.y > a.y) {
				this.y = a.y
			}
		}
		return this
	},
	clampScalar: (function() {
		var b, a;
		return function(c, d) {
			if (b === undefined) {
				b = new THREE.Vector2();
				a = new THREE.Vector2()
			}
			b.set(c, c);
			a.set(d, d);
			return this.clamp(b, a)
		}
	})(),
	floor: function() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this
	},
	ceil: function() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this
	},
	round: function() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this
	},
	roundToZero: function() {
		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		return this
	},
	negate: function() {
		this.x = -this.x;
		this.y = -this.y;
		return this
	},
	dot: function(a) {
		return this.x * a.x + this.y * a.y
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	},
	normalize: function() {
		return this.divideScalar(this.length())
	},
	distanceTo: function(a) {
		return Math.sqrt(this.distanceToSquared(a))
	},
	distanceToSquared: function(c) {
		var b = this.x - c.x,
			a = this.y - c.y;
		return b * b + a * a
	},
	setLength: function(a) {
		var b = this.length();
		if (b !== 0 && a !== b) {
			this.multiplyScalar(a / b)
		}
		return this
	},
	lerp: function(a, b) {
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		return this
	},
	lerpVectors: function(c, b, a) {
		this.subVectors(b, c).multiplyScalar(a).add(c);
		return this
	},
	equals: function(a) {
		return ((a.x === this.x) && (a.y === this.y))
	},
	fromArray: function(b, a) {
		if (a === undefined) {
			a = 0
		}
		this.x = b[a];
		this.y = b[a + 1];
		return this
	},
	toArray: function(b, a) {
		if (b === undefined) {
			b = []
		}
		if (a === undefined) {
			a = 0
		}
		b[a] = this.x;
		b[a + 1] = this.y;
		return b
	},
	fromAttribute: function(b, a, c) {
		if (c === undefined) {
			c = 0
		}
		a = a * b.itemSize + c;
		this.x = b.array[a];
		this.y = b.array[a + 1];
		return this
	},
	clone: function() {
		return new THREE.Vector2(this.x, this.y)
	}
};
THREE.Vector3 = function(a, c, b) {
	this.x = a || 0;
	this.y = c || 0;
	this.z = b || 0
};
THREE.Vector3.prototype = {
	constructor: THREE.Vector3,
	set: function(a, c, b) {
		this.x = a;
		this.y = c;
		this.z = b;
		return this
	},
	setX: function(a) {
		this.x = a;
		return this
	},
	setY: function(a) {
		this.y = a;
		return this
	},
	setZ: function(a) {
		this.z = a;
		return this
	},
	setComponent: function(a, b) {
		switch (a) {
			case 0:
				this.x = b;
				break;
			case 1:
				this.y = b;
				break;
			case 2:
				this.z = b;
				break;
			default:
				throw new Error("index is out of range: " + a)
		}
	},
	getComponent: function(a) {
		switch (a) {
			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			default:
				throw new Error("index is out of range: " + a)
		}
	},
	copy: function(a) {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		return this
	},
	add: function(b, a) {
		if (a !== undefined) {
			THREE.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
			return this.addVectors(b, a)
		}
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		return this
	},
	addScalar: function(a) {
		this.x += a;
		this.y += a;
		this.z += a;
		return this
	},
	addVectors: function(d, c) {
		this.x = d.x + c.x;
		this.y = d.y + c.y;
		this.z = d.z + c.z;
		return this
	},
	sub: function(b, a) {
		if (a !== undefined) {
			THREE.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
			return this.subVectors(b, a)
		}
		this.x -= b.x;
		this.y -= b.y;
		this.z -= b.z;
		return this
	},
	subScalar: function(a) {
		this.x -= a;
		this.y -= a;
		this.z -= a;
		return this
	},
	subVectors: function(d, c) {
		this.x = d.x - c.x;
		this.y = d.y - c.y;
		this.z = d.z - c.z;
		return this
	},
	multiply: function(b, a) {
		if (a !== undefined) {
			THREE.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.");
			return this.multiplyVectors(b, a)
		}
		this.x *= b.x;
		this.y *= b.y;
		this.z *= b.z;
		return this
	},
	multiplyScalar: function(a) {
		this.x *= a;
		this.y *= a;
		this.z *= a;
		return this
	},
	multiplyVectors: function(d, c) {
		this.x = d.x * c.x;
		this.y = d.y * c.y;
		this.z = d.z * c.z;
		return this
	},
	applyEuler: function() {
		var a;
		return function(b) {
			if (b instanceof THREE.Euler === false) {
				THREE.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.")
			}
			if (a === undefined) {
				a = new THREE.Quaternion()
			}
			this.applyQuaternion(a.setFromEuler(b));
			return this
		}
	}(),
	applyAxisAngle: function() {
		var a;
		return function(b, c) {
			if (a === undefined) {
				a = new THREE.Quaternion()
			}
			this.applyQuaternion(a.setFromAxisAngle(b, c));
			return this
		}
	}(),
	applyMatrix3: function(b) {
		var a = this.x;
		var f = this.y;
		var d = this.z;
		var c = b.elements;
		this.x = c[0] * a + c[3] * f + c[6] * d;
		this.y = c[1] * a + c[4] * f + c[7] * d;
		this.z = c[2] * a + c[5] * f + c[8] * d;
		return this
	},
	applyMatrix4: function(b) {
		var a = this.x,
			f = this.y,
			d = this.z;
		var c = b.elements;
		this.x = c[0] * a + c[4] * f + c[8] * d + c[12];
		this.y = c[1] * a + c[5] * f + c[9] * d + c[13];
		this.z = c[2] * a + c[6] * f + c[10] * d + c[14];
		return this
	},
	applyProjection: function(b) {
		var a = this.x,
			h = this.y,
			g = this.z;
		var c = b.elements;
		var f = 1 / (c[3] * a + c[7] * h + c[11] * g + c[15]);
		this.x = (c[0] * a + c[4] * h + c[8] * g + c[12]) * f;
		this.y = (c[1] * a + c[5] * h + c[9] * g + c[13]) * f;
		this.z = (c[2] * a + c[6] * h + c[10] * g + c[14]) * f;
		return this
	},
	applyQuaternion: function(a) {
		var m = this.x;
		var l = this.y;
		var k = this.z;
		var h = a.x;
		var g = a.y;
		var f = a.z;
		var j = a.w;
		var d = j * m + g * k - f * l;
		var c = j * l + f * m - h * k;
		var b = j * k + h * l - g * m;
		var e = -h * m - g * l - f * k;
		this.x = d * j + e * -h + c * -f - b * -g;
		this.y = c * j + e * -g + b * -h - d * -f;
		this.z = b * j + e * -f + d * -g - c * -h;
		return this
	},
	project: function() {
		var a;
		return function(b) {
			if (a === undefined) {
				a = new THREE.Matrix4()
			}
			a.multiplyMatrices(b.projectionMatrix, a.getInverse(b.matrixWorld));
			return this.applyProjection(a)
		}
	}(),
	unproject: function() {
		var a;
		return function(b) {
			if (a === undefined) {
				a = new THREE.Matrix4()
			}
			a.multiplyMatrices(b.matrixWorld, a.getInverse(b.projectionMatrix));
			return this.applyProjection(a)
		}
	}(),
	transformDirection: function(b) {
		var a = this.x,
			f = this.y,
			d = this.z;
		var c = b.elements;
		this.x = c[0] * a + c[4] * f + c[8] * d;
		this.y = c[1] * a + c[5] * f + c[9] * d;
		this.z = c[2] * a + c[6] * f + c[10] * d;
		this.normalize();
		return this
	},
	divide: function(a) {
		this.x /= a.x;
		this.y /= a.y;
		this.z /= a.z;
		return this
	},
	divideScalar: function(b) {
		if (b !== 0) {
			var a = 1 / b;
			this.x *= a;
			this.y *= a;
			this.z *= a
		} else {
			this.x = 0;
			this.y = 0;
			this.z = 0
		}
		return this
	},
	min: function(a) {
		if (this.x > a.x) {
			this.x = a.x
		}
		if (this.y > a.y) {
			this.y = a.y
		}
		if (this.z > a.z) {
			this.z = a.z
		}
		return this
	},
	max: function(a) {
		if (this.x < a.x) {
			this.x = a.x
		}
		if (this.y < a.y) {
			this.y = a.y
		}
		if (this.z < a.z) {
			this.z = a.z
		}
		return this
	},
	clamp: function(b, a) {
		if (this.x < b.x) {
			this.x = b.x
		} else {
			if (this.x > a.x) {
				this.x = a.x
			}
		}
		if (this.y < b.y) {
			this.y = b.y
		} else {
			if (this.y > a.y) {
				this.y = a.y
			}
		}
		if (this.z < b.z) {
			this.z = b.z
		} else {
			if (this.z > a.z) {
				this.z = a.z
			}
		}
		return this
	},
	clampScalar: (function() {
		var b, a;
		return function(c, d) {
			if (b === undefined) {
				b = new THREE.Vector3();
				a = new THREE.Vector3()
			}
			b.set(c, c, c);
			a.set(d, d, d);
			return this.clamp(b, a)
		}
	})(),
	floor: function() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
		return this
	},
	ceil: function() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);
		return this
	},
	round: function() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);
		return this
	},
	roundToZero: function() {
		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
		return this
	},
	negate: function() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this
	},
	dot: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	},
	lengthManhattan: function() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
	},
	normalize: function() {
		return this.divideScalar(this.length())
	},
	setLength: function(a) {
		var b = this.length();
		if (b !== 0 && a !== b) {
			this.multiplyScalar(a / b)
		}
		return this
	},
	lerp: function(a, b) {
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		this.z += (a.z - this.z) * b;
		return this
	},
	lerpVectors: function(c, b, a) {
		this.subVectors(b, c).multiplyScalar(a).add(c);
		return this
	},
	cross: function(c, b) {
		if (b !== undefined) {
			THREE.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.");
			return this.crossVectors(c, b)
		}
		var a = this.x,
			e = this.y,
			d = this.z;
		this.x = e * c.z - d * c.y;
		this.y = d * c.x - a * c.z;
		this.z = a * c.y - e * c.x;
		return this
	},
	crossVectors: function(d, c) {
		var h = d.x,
			f = d.y,
			e = d.z;
		var k = c.x,
			j = c.y,
			g = c.z;
		this.x = f * g - e * j;
		this.y = e * k - h * g;
		this.z = h * j - f * k;
		return this
	},
	projectOnVector: function() {
		var b, a;
		return function(c) {
			if (b === undefined) {
				b = new THREE.Vector3()
			}
			b.copy(c).normalize();
			a = this.dot(b);
			return this.copy(b).multiplyScalar(a)
		}
	}(),
	projectOnPlane: function() {
		var a;
		return function(b) {
			if (a === undefined) {
				a = new THREE.Vector3()
			}
			a.copy(this).projectOnVector(b);
			return this.sub(a)
		}
	}(),
	reflect: function() {
		var a;
		return function(b) {
			if (a === undefined) {
				a = new THREE.Vector3()
			}
			return this.sub(a.copy(b).multiplyScalar(2 * this.dot(b)))
		}
	}(),
	angleTo: function(a) {
		var b = this.dot(a) / (this.length() * a.length());
		return Math.acos(THREE.Math.clamp(b, -1, 1))
	},
	distanceTo: function(a) {
		return Math.sqrt(this.distanceToSquared(a))
	},
	distanceToSquared: function(d) {
		var c = this.x - d.x;
		var b = this.y - d.y;
		var a = this.z - d.z;
		return c * c + b * b + a * a
	},
	setEulerFromRotationMatrix: function(b, a) {
		THREE.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
	},
	setEulerFromQuaternion: function(b, a) {
		THREE.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
	},
	getPositionFromMatrix: function(a) {
		THREE.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
		return this.setFromMatrixPosition(a)
	},
	getScaleFromMatrix: function(a) {
		THREE.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");
		return this.setFromMatrixScale(a)
	},
	getColumnFromMatrix: function(b, a) {
		THREE.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");
		return this.setFromMatrixColumn(b, a)
	},
	setFromMatrixPosition: function(a) {
		this.x = a.elements[12];
		this.y = a.elements[13];
		this.z = a.elements[14];
		return this
	},
	setFromMatrixScale: function(a) {
		var d = this.set(a.elements[0], a.elements[1], a.elements[2]).length();
		var c = this.set(a.elements[4], a.elements[5], a.elements[6]).length();
		var b = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
		this.x = d;
		this.y = c;
		this.z = b;
		return this
	},
	setFromMatrixColumn: function(b, a) {
		var d = b * 4;
		var c = a.elements;
		this.x = c[d];
		this.y = c[d + 1];
		this.z = c[d + 2];
		return this
	},
	equals: function(a) {
		return ((a.x === this.x) && (a.y === this.y) && (a.z === this.z))
	},
	fromArray: function(b, a) {
		if (a === undefined) {
			a = 0
		}
		this.x = b[a];
		this.y = b[a + 1];
		this.z = b[a + 2];
		return this
	},
	toArray: function(b, a) {
		if (b === undefined) {
			b = []
		}
		if (a === undefined) {
			a = 0
		}
		b[a] = this.x;
		b[a + 1] = this.y;
		b[a + 2] = this.z;
		return b
	},
	fromAttribute: function(b, a, c) {
		if (c === undefined) {
			c = 0
		}
		a = a * b.itemSize + c;
		this.x = b.array[a];
		this.y = b.array[a + 1];
		this.z = b.array[a + 2];
		return this
	},
	clone: function() {
		return new THREE.Vector3(this.x, this.y, this.z)
	}
};
THREE.Vector4 = function(a, d, c, b) {
	this.x = a || 0;
	this.y = d || 0;
	this.z = c || 0;
	this.w = (b !== undefined) ? b : 1
};
THREE.Vector4.prototype = {
	constructor: THREE.Vector4,
	set: function(a, d, c, b) {
		this.x = a;
		this.y = d;
		this.z = c;
		this.w = b;
		return this
	},
	setX: function(a) {
		this.x = a;
		return this
	},
	setY: function(a) {
		this.y = a;
		return this
	},
	setZ: function(a) {
		this.z = a;
		return this
	},
	setW: function(a) {
		this.w = a;
		return this
	},
	setComponent: function(a, b) {
		switch (a) {
			case 0:
				this.x = b;
				break;
			case 1:
				this.y = b;
				break;
			case 2:
				this.z = b;
				break;
			case 3:
				this.w = b;
				break;
			default:
				throw new Error("index is out of range: " + a)
		}
	},
	getComponent: function(a) {
		switch (a) {
			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			case 3:
				return this.w;
			default:
				throw new Error("index is out of range: " + a)
		}
	},
	copy: function(a) {
		this.x = a.x;
		this.y = a.y;
		this.z = a.z;
		this.w = (a.w !== undefined) ? a.w : 1;
		return this
	},
	add: function(b, a) {
		if (a !== undefined) {
			THREE.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
			return this.addVectors(b, a)
		}
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		this.w += b.w;
		return this
	},
	addScalar: function(a) {
		this.x += a;
		this.y += a;
		this.z += a;
		this.w += a;
		return this
	},
	addVectors: function(d, c) {
		this.x = d.x + c.x;
		this.y = d.y + c.y;
		this.z = d.z + c.z;
		this.w = d.w + c.w;
		return this
	},
	sub: function(b, a) {
		if (a !== undefined) {
			THREE.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
			return this.subVectors(b, a)
		}
		this.x -= b.x;
		this.y -= b.y;
		this.z -= b.z;
		this.w -= b.w;
		return this
	},
	subScalar: function(a) {
		this.x -= a;
		this.y -= a;
		this.z -= a;
		this.w -= a;
		return this
	},
	subVectors: function(d, c) {
		this.x = d.x - c.x;
		this.y = d.y - c.y;
		this.z = d.z - c.z;
		this.w = d.w - c.w;
		return this
	},
	multiplyScalar: function(a) {
		this.x *= a;
		this.y *= a;
		this.z *= a;
		this.w *= a;
		return this
	},
	applyMatrix4: function(b) {
		var a = this.x;
		var g = this.y;
		var f = this.z;
		var c = this.w;
		var d = b.elements;
		this.x = d[0] * a + d[4] * g + d[8] * f + d[12] * c;
		this.y = d[1] * a + d[5] * g + d[9] * f + d[13] * c;
		this.z = d[2] * a + d[6] * g + d[10] * f + d[14] * c;
		this.w = d[3] * a + d[7] * g + d[11] * f + d[15] * c;
		return this
	},
	divideScalar: function(b) {
		if (b !== 0) {
			var a = 1 / b;
			this.x *= a;
			this.y *= a;
			this.z *= a;
			this.w *= a
		} else {
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1
		}
		return this
	},
	setAxisAngleFromQuaternion: function(b) {
		this.w = 2 * Math.acos(b.w);
		var a = Math.sqrt(1 - b.w * b.w);
		if (a < 0.0001) {
			this.x = 1;
			this.y = 0;
			this.z = 0
		} else {
			this.x = b.x / a;
			this.y = b.y / a;
			this.z = b.z / a
		}
		return this
	},
	setAxisAngleFromRotationMatrix: function(u) {
		var v, k, j, h, E = 0.01,
			l = 0.1,
			g = u.elements,
			D = g[0],
			B = g[4],
			A = g[8],
			e = g[1],
			c = g[5],
			a = g[9],
			t = g[2],
			q = g[6],
			o = g[10];
		if ((Math.abs(B - e) < E) && (Math.abs(A - t) < E) && (Math.abs(a - q) < E)) {
			if ((Math.abs(B + e) < l) && (Math.abs(A + t) < l) && (Math.abs(a + q) < l) && (Math.abs(D + c + o - 3) < l)) {
				this.set(1, 0, 0, 0);
				return this
			}
			v = Math.PI;
			var f = (D + 1) / 2;
			var r = (c + 1) / 2;
			var C = (o + 1) / 2;
			var d = (B + e) / 4;
			var b = (A + t) / 4;
			var p = (a + q) / 4;
			if ((f > r) && (f > C)) {
				if (f < E) {
					k = 0;
					j = 0.707106781;
					h = 0.707106781
				} else {
					k = Math.sqrt(f);
					j = d / k;
					h = b / k
				}
			} else {
				if (r > C) {
					if (r < E) {
						k = 0.707106781;
						j = 0;
						h = 0.707106781
					} else {
						j = Math.sqrt(r);
						k = d / j;
						h = p / j
					}
				} else {
					if (C < E) {
						k = 0.707106781;
						j = 0.707106781;
						h = 0
					} else {
						h = Math.sqrt(C);
						k = b / h;
						j = p / h
					}
				}
			}
			this.set(k, j, h, v);
			return this
		}
		var n = Math.sqrt((q - a) * (q - a) + (A - t) * (A - t) + (e - B) * (e - B));
		if (Math.abs(n) < 0.001) {
			n = 1
		}
		this.x = (q - a) / n;
		this.y = (A - t) / n;
		this.z = (e - B) / n;
		this.w = Math.acos((D + c + o - 1) / 2);
		return this
	},
	min: function(a) {
		if (this.x > a.x) {
			this.x = a.x
		}
		if (this.y > a.y) {
			this.y = a.y
		}
		if (this.z > a.z) {
			this.z = a.z
		}
		if (this.w > a.w) {
			this.w = a.w
		}
		return this
	},
	max: function(a) {
		if (this.x < a.x) {
			this.x = a.x
		}
		if (this.y < a.y) {
			this.y = a.y
		}
		if (this.z < a.z) {
			this.z = a.z
		}
		if (this.w < a.w) {
			this.w = a.w
		}
		return this
	},
	clamp: function(b, a) {
		if (this.x < b.x) {
			this.x = b.x
		} else {
			if (this.x > a.x) {
				this.x = a.x
			}
		}
		if (this.y < b.y) {
			this.y = b.y
		} else {
			if (this.y > a.y) {
				this.y = a.y
			}
		}
		if (this.z < b.z) {
			this.z = b.z
		} else {
			if (this.z > a.z) {
				this.z = a.z
			}
		}
		if (this.w < b.w) {
			this.w = b.w
		} else {
			if (this.w > a.w) {
				this.w = a.w
			}
		}
		return this
	},
	clampScalar: (function() {
		var b, a;
		return function(c, d) {
			if (b === undefined) {
				b = new THREE.Vector4();
				a = new THREE.Vector4()
			}
			b.set(c, c, c, c);
			a.set(d, d, d, d);
			return this.clamp(b, a)
		}
	})(),
	floor: function() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
		this.w = Math.floor(this.w);
		return this
	},
	ceil: function() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);
		this.w = Math.ceil(this.w);
		return this
	},
	round: function() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);
		this.w = Math.round(this.w);
		return this
	},
	roundToZero: function() {
		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
		this.w = (this.w < 0) ? Math.ceil(this.w) : Math.floor(this.w);
		return this
	},
	negate: function() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
		return this
	},
	dot: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
	},
	lengthManhattan: function() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
	},
	normalize: function() {
		return this.divideScalar(this.length())
	},
	setLength: function(a) {
		var b = this.length();
		if (b !== 0 && a !== b) {
			this.multiplyScalar(a / b)
		}
		return this
	},
	lerp: function(a, b) {
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		this.z += (a.z - this.z) * b;
		this.w += (a.w - this.w) * b;
		return this
	},
	lerpVectors: function(c, b, a) {
		this.subVectors(b, c).multiplyScalar(a).add(c);
		return this
	},
	equals: function(a) {
		return ((a.x === this.x) && (a.y === this.y) && (a.z === this.z) && (a.w === this.w))
	},
	fromArray: function(b, a) {
		if (a === undefined) {
			a = 0
		}
		this.x = b[a];
		this.y = b[a + 1];
		this.z = b[a + 2];
		this.w = b[a + 3];
		return this
	},
	toArray: function(b, a) {
		if (b === undefined) {
			b = []
		}
		if (a === undefined) {
			a = 0
		}
		b[a] = this.x;
		b[a + 1] = this.y;
		b[a + 2] = this.z;
		b[a + 3] = this.w;
		return b
	},
	fromAttribute: function(b, a, c) {
		if (c === undefined) {
			c = 0
		}
		a = a * b.itemSize + c;
		this.x = b.array[a];
		this.y = b.array[a + 1];
		this.z = b.array[a + 2];
		this.w = b.array[a + 3];
		return this
	},
	clone: function() {
		return new THREE.Vector4(this.x, this.y, this.z, this.w)
	}
};
THREE.Euler = function(b, d, c, a) {
	this._x = b || 0;
	this._y = d || 0;
	this._z = c || 0;
	this._order = a || THREE.Euler.DefaultOrder
};
THREE.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
THREE.Euler.DefaultOrder = "XYZ";
THREE.Euler.prototype = {
	constructor: THREE.Euler,
	_x: 0,
	_y: 0,
	_z: 0,
	_order: THREE.Euler.DefaultOrder,
	get x() {
		return this._x
	},
	set x(a) {
		this._x = a;
		this.onChangeCallback()
	},
	get y() {
		return this._y
	},
	set y(a) {
		this._y = a;
		this.onChangeCallback()
	},
	get z() {
		return this._z
	},
	set z(a) {
		this._z = a;
		this.onChangeCallback()
	},
	get order() {
		return this._order
	},
	set order(a) {
		this._order = a;
		this.onChangeCallback()
	},
	set: function(b, d, c, a) {
		this._x = b;
		this._y = d;
		this._z = c;
		this._order = a || this._order;
		this.onChangeCallback();
		return this
	},
	copy: function(a) {
		this._x = a._x;
		this._y = a._y;
		this._z = a._z;
		this._order = a._order;
		this.onChangeCallback();
		return this
	},
	setFromRotationMatrix: function(e, f, g) {
		var k = THREE.Math.clamp;
		var d = e.elements;
		var l = d[0],
			j = d[4],
			h = d[8];
		var c = d[1],
			b = d[5],
			a = d[9];
		var p = d[2],
			o = d[6],
			n = d[10];
		f = f || this._order;
		if (f === "XYZ") {
			this._y = Math.asin(k(h, -1, 1));
			if (Math.abs(h) < 0.99999) {
				this._x = Math.atan2(-a, n);
				this._z = Math.atan2(-j, l)
			} else {
				this._x = Math.atan2(o, b);
				this._z = 0
			}
		} else {
			if (f === "YXZ") {
				this._x = Math.asin(-k(a, -1, 1));
				if (Math.abs(a) < 0.99999) {
					this._y = Math.atan2(h, n);
					this._z = Math.atan2(c, b)
				} else {
					this._y = Math.atan2(-p, l);
					this._z = 0
				}
			} else {
				if (f === "ZXY") {
					this._x = Math.asin(k(o, -1, 1));
					if (Math.abs(o) < 0.99999) {
						this._y = Math.atan2(-p, n);
						this._z = Math.atan2(-j, b)
					} else {
						this._y = 0;
						this._z = Math.atan2(c, l)
					}
				} else {
					if (f === "ZYX") {
						this._y = Math.asin(-k(p, -1, 1));
						if (Math.abs(p) < 0.99999) {
							this._x = Math.atan2(o, n);
							this._z = Math.atan2(c, l)
						} else {
							this._x = 0;
							this._z = Math.atan2(-j, b)
						}
					} else {
						if (f === "YZX") {
							this._z = Math.asin(k(c, -1, 1));
							if (Math.abs(c) < 0.99999) {
								this._x = Math.atan2(-a, b);
								this._y = Math.atan2(-p, l)
							} else {
								this._x = 0;
								this._y = Math.atan2(h, n)
							}
						} else {
							if (f === "XZY") {
								this._z = Math.asin(-k(j, -1, 1));
								if (Math.abs(j) < 0.99999) {
									this._x = Math.atan2(o, b);
									this._y = Math.atan2(h, l)
								} else {
									this._x = Math.atan2(-a, n);
									this._y = 0
								}
							} else {
								THREE.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + f)
							}
						}
					}
				}
			}
		}
		this._order = f;
		if (g !== false) {
			this.onChangeCallback()
		}
		return this
	},
	setFromQuaternion: function() {
		var a;
		return function(c, b, d) {
			if (a === undefined) {
				a = new THREE.Matrix4()
			}
			a.makeRotationFromQuaternion(c);
			this.setFromRotationMatrix(a, b, d);
			return this
		}
	}(),
	setFromVector3: function(b, a) {
		return this.set(b.x, b.y, b.z, a || this._order)
	},
	reorder: function() {
		var a = new THREE.Quaternion();
		return function(b) {
			a.setFromEuler(this);
			this.setFromQuaternion(a, b)
		}
	}(),
	equals: function(a) {
		return (a._x === this._x) && (a._y === this._y) && (a._z === this._z) && (a._order === this._order)
	},
	fromArray: function(a) {
		this._x = a[0];
		this._y = a[1];
		this._z = a[2];
		if (a[3] !== undefined) {
			this._order = a[3]
		}
		this.onChangeCallback();
		return this
	},
	toArray: function(b, a) {
		if (b === undefined) {
			b = []
		}
		if (a === undefined) {
			a = 0
		}
		b[a] = this._x;
		b[a + 1] = this._y;
		b[a + 2] = this._z;
		b[a + 3] = this._order;
		return b
	},
	toVector3: function(a) {
		if (a) {
			return a.set(this._x, this._y, this._z)
		} else {
			return new THREE.Vector3(this._x, this._y, this._z)
		}
	},
	onChange: function(a) {
		this.onChangeCallback = a;
		return this
	},
	onChangeCallback: function() {},
	clone: function() {
		return new THREE.Euler(this._x, this._y, this._z, this._order)
	}
};
THREE.Line3 = function(b, a) {
	this.start = (b !== undefined) ? b : new THREE.Vector3();
	this.end = (a !== undefined) ? a : new THREE.Vector3()
};
THREE.Line3.prototype = {
	constructor: THREE.Line3,
	set: function(b, a) {
		this.start.copy(b);
		this.end.copy(a);
		return this
	},
	copy: function(a) {
		this.start.copy(a.start);
		this.end.copy(a.end);
		return this
	},
	center: function(b) {
		var a = b || new THREE.Vector3();
		return a.addVectors(this.start, this.end).multiplyScalar(0.5)
	},
	delta: function(b) {
		var a = b || new THREE.Vector3();
		return a.subVectors(this.end, this.start)
	},
	distanceSq: function() {
		return this.start.distanceToSquared(this.end)
	},
	distance: function() {
		return this.start.distanceTo(this.end)
	},
	at: function(c, b) {
		var a = b || new THREE.Vector3();
		return this.delta(a).multiplyScalar(c).add(this.start)
	},
	closestPointToPointParameter: function() {
		var b = new THREE.Vector3();
		var a = new THREE.Vector3();
		return function(c, g) {
			b.subVectors(c, this.start);
			a.subVectors(this.end, this.start);
			var f = a.dot(a);
			var e = a.dot(b);
			var d = e / f;
			if (g) {
				d = THREE.Math.clamp(d, 0, 1)
			}
			return d
		}
	}(),
	closestPointToPoint: function(b, e, d) {
		var c = this.closestPointToPointParameter(b, e);
		var a = d || new THREE.Vector3();
		return this.delta(a).multiplyScalar(c).add(this.start)
	},
	applyMatrix4: function(a) {
		this.start.applyMatrix4(a);
		this.end.applyMatrix4(a);
		return this
	},
	equals: function(a) {
		return a.start.equals(this.start) && a.end.equals(this.end)
	},
	clone: function() {
		return new THREE.Line3().copy(this)
	}
};
THREE.Box2 = function(b, a) {
	this.min = (b !== undefined) ? b : new THREE.Vector2(Infinity, Infinity);
	this.max = (a !== undefined) ? a : new THREE.Vector2(-Infinity, -Infinity)
};
THREE.Box2.prototype = {
	constructor: THREE.Box2,
	set: function(b, a) {
		this.min.copy(b);
		this.max.copy(a);
		return this
	},
	setFromPoints: function(c) {
		this.makeEmpty();
		for (var b = 0, a = c.length; b < a; b++) {
			this.expandByPoint(c[b])
		}
		return this
	},
	setFromCenterAndSize: function() {
		var a = new THREE.Vector2();
		return function(b, d) {
			var c = a.copy(d).multiplyScalar(0.5);
			this.min.copy(b).sub(c);
			this.max.copy(b).add(c);
			return this
		}
	}(),
	copy: function(a) {
		this.min.copy(a.min);
		this.max.copy(a.max);
		return this
	},
	makeEmpty: function() {
		this.min.x = this.min.y = Infinity;
		this.max.x = this.max.y = -Infinity;
		return this
	},
	empty: function() {
		return (this.max.x < this.min.x) || (this.max.y < this.min.y)
	},
	center: function(b) {
		var a = b || new THREE.Vector2();
		return a.addVectors(this.min, this.max).multiplyScalar(0.5)
	},
	size: function(b) {
		var a = b || new THREE.Vector2();
		return a.subVectors(this.max, this.min)
	},
	expandByPoint: function(a) {
		this.min.min(a);
		this.max.max(a);
		return this
	},
	expandByVector: function(a) {
		this.min.sub(a);
		this.max.add(a);
		return this
	},
	expandByScalar: function(a) {
		this.min.addScalar(-a);
		this.max.addScalar(a);
		return this
	},
	containsPoint: function(a) {
		if (a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y) {
			return false
		}
		return true
	},
	containsBox: function(a) {
		if ((this.min.x <= a.min.x) && (a.max.x <= this.max.x) && (this.min.y <= a.min.y) && (a.max.y <= this.max.y)) {
			return true
		}
		return false
	},
	getParameter: function(b, c) {
		var a = c || new THREE.Vector2();
		return a.set((b.x - this.min.x) / (this.max.x - this.min.x), (b.y - this.min.y) / (this.max.y - this.min.y))
	},
	isIntersectionBox: function(a) {
		if (a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y) {
			return false
		}
		return true
	},
	clampPoint: function(b, c) {
		var a = c || new THREE.Vector2();
		return a.copy(b).clamp(this.min, this.max)
	},
	distanceToPoint: function() {
		var a = new THREE.Vector2();
		return function(b) {
			var c = a.copy(b).clamp(this.min, this.max);
			return c.sub(b).length()
		}
	}(),
	intersect: function(a) {
		this.min.max(a.min);
		this.max.min(a.max);
		return this
	},
	union: function(a) {
		this.min.min(a.min);
		this.max.max(a.max);
		return this
	},
	translate: function(a) {
		this.min.add(a);
		this.max.add(a);
		return this
	},
	equals: function(a) {
		return a.min.equals(this.min) && a.max.equals(this.max)
	},
	clone: function() {
		return new THREE.Box2().copy(this)
	}
};
THREE.Box3 = function(b, a) {
	this.min = (b !== undefined) ? b : new THREE.Vector3(Infinity, Infinity, Infinity);
	this.max = (a !== undefined) ? a : new THREE.Vector3(-Infinity, -Infinity, -Infinity)
};
THREE.Box3.prototype = {
	constructor: THREE.Box3,
	set: function(b, a) {
		this.min.copy(b);
		this.max.copy(a);
		return this
	},
	setFromPoints: function(c) {
		this.makeEmpty();
		for (var b = 0, a = c.length; b < a; b++) {
			this.expandByPoint(c[b])
		}
		return this
	},
	setFromCenterAndSize: function() {
		var a = new THREE.Vector3();
		return function(b, d) {
			var c = a.copy(d).multiplyScalar(0.5);
			this.min.copy(b).sub(c);
			this.max.copy(b).add(c);
			return this
		}
	}(),
	setFromObject: function() {
		var a = new THREE.Vector3();
		return function(b) {
			var c = this;
			b.updateMatrixWorld(true);
			this.makeEmpty();
			b.traverse(function(h) {
				var j = h.geometry;
				if (j !== undefined) {
					if (j instanceof THREE.Geometry) {
						var f = j.vertices;
						for (var g = 0, e = f.length; g < e; g++) {
							a.copy(f[g]);
							a.applyMatrix4(h.matrixWorld);
							c.expandByPoint(a)
						}
					} else {
						if (j instanceof THREE.BufferGeometry && j.attributes.position !== undefined) {
							var d = j.attributes.position.array;
							for (var g = 0, e = d.length; g < e; g += 3) {
								a.set(d[g], d[g + 1], d[g + 2]);
								a.applyMatrix4(h.matrixWorld);
								c.expandByPoint(a)
							}
						}
					}
				}
			});
			return this
		}
	}(),
	copy: function(a) {
		this.min.copy(a.min);
		this.max.copy(a.max);
		return this
	},
	makeEmpty: function() {
		this.min.x = this.min.y = this.min.z = Infinity;
		this.max.x = this.max.y = this.max.z = -Infinity;
		return this
	},
	empty: function() {
		return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z)
	},
	center: function(b) {
		var a = b || new THREE.Vector3();
		return a.addVectors(this.min, this.max).multiplyScalar(0.5)
	},
	size: function(b) {
		var a = b || new THREE.Vector3();
		return a.subVectors(this.max, this.min)
	},
	expandByPoint: function(a) {
		this.min.min(a);
		this.max.max(a);
		return this
	},
	expandByVector: function(a) {
		this.min.sub(a);
		this.max.add(a);
		return this
	},
	expandByScalar: function(a) {
		this.min.addScalar(-a);
		this.max.addScalar(a);
		return this
	},
	containsPoint: function(a) {
		if (a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z) {
			return false
		}
		return true
	},
	containsBox: function(a) {
		if ((this.min.x <= a.min.x) && (a.max.x <= this.max.x) && (this.min.y <= a.min.y) && (a.max.y <= this.max.y) && (this.min.z <= a.min.z) && (a.max.z <= this.max.z)) {
			return true
		}
		return false
	},
	getParameter: function(b, c) {
		var a = c || new THREE.Vector3();
		return a.set((b.x - this.min.x) / (this.max.x - this.min.x), (b.y - this.min.y) / (this.max.y - this.min.y), (b.z - this.min.z) / (this.max.z - this.min.z))
	},
	isIntersectionBox: function(a) {
		if (a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z) {
			return false
		}
		return true
	},
	clampPoint: function(b, c) {
		var a = c || new THREE.Vector3();
		return a.copy(b).clamp(this.min, this.max)
	},
	distanceToPoint: function() {
		var a = new THREE.Vector3();
		return function(b) {
			var c = a.copy(b).clamp(this.min, this.max);
			return c.sub(b).length()
		}
	}(),
	getBoundingSphere: function() {
		var a = new THREE.Vector3();
		return function(c) {
			var b = c || new THREE.Sphere();
			b.center = this.center();
			b.radius = this.size(a).length() * 0.5;
			return b
		}
	}(),
	intersect: function(a) {
		this.min.max(a.min);
		this.max.min(a.max);
		return this
	},
	union: function(a) {
		this.min.min(a.min);
		this.max.max(a.max);
		return this
	},
	applyMatrix4: function() {
		var a = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
		return function(b) {
			a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
			a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
			a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
			a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
			a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
			a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
			a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
			a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
			this.makeEmpty();
			this.setFromPoints(a);
			return this
		}
	}(),
	translate: function(a) {
		this.min.add(a);
		this.max.add(a);
		return this
	},
	equals: function(a) {
		return a.min.equals(this.min) && a.max.equals(this.max)
	},
	clone: function() {
		return new THREE.Box3().copy(this)
	}
};
THREE.Matrix3 = function() {
	this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
	if (arguments.length > 0) {
		THREE.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
	}
};
THREE.Matrix3.prototype = {
	constructor: THREE.Matrix3,
	set: function(h, g, f, e, d, c, a, k, j) {
		var b = this.elements;
		b[0] = h;
		b[3] = g;
		b[6] = f;
		b[1] = e;
		b[4] = d;
		b[7] = c;
		b[2] = a;
		b[5] = k;
		b[8] = j;
		return this
	},
	identity: function() {
		this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
		return this
	},
	copy: function(a) {
		var b = a.elements;
		this.set(b[0], b[3], b[6], b[1], b[4], b[7], b[2], b[5], b[8]);
		return this
	},
	multiplyVector3: function(a) {
		THREE.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
		return a.applyMatrix3(this)
	},
	multiplyVector3Array: function(b) {
		THREE.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
		return this.applyToVector3Array(b)
	},
	applyToVector3Array: function() {
		var a = new THREE.Vector3();
		return function(f, e, d) {
			if (e === undefined) {
				e = 0
			}
			if (d === undefined) {
				d = f.length
			}
			for (var c = 0, b = e; c < d; c += 3, b += 3) {
				a.x = f[b];
				a.y = f[b + 1];
				a.z = f[b + 2];
				a.applyMatrix3(this);
				f[b] = a.x;
				f[b + 1] = a.y;
				f[b + 2] = a.z
			}
			return f
		}
	}(),
	multiplyScalar: function(a) {
		var b = this.elements;
		b[0] *= a;
		b[3] *= a;
		b[6] *= a;
		b[1] *= a;
		b[4] *= a;
		b[7] *= a;
		b[2] *= a;
		b[5] *= a;
		b[8] *= a;
		return this
	},
	determinant: function() {
		var j = this.elements;
		var t = j[0],
			r = j[1],
			q = j[2],
			p = j[3],
			o = j[4],
			n = j[5],
			m = j[6],
			l = j[7],
			k = j[8];
		return t * o * k - t * n * l - r * p * k + r * n * m + q * p * l - q * o * m
	},
	getInverse: function(b, a) {
		var d = b.elements;
		var f = this.elements;
		f[0] = d[10] * d[5] - d[6] * d[9];
		f[1] = -d[10] * d[1] + d[2] * d[9];
		f[2] = d[6] * d[1] - d[2] * d[5];
		f[3] = -d[10] * d[4] + d[6] * d[8];
		f[4] = d[10] * d[0] - d[2] * d[8];
		f[5] = -d[6] * d[0] + d[2] * d[4];
		f[6] = d[9] * d[4] - d[5] * d[8];
		f[7] = -d[9] * d[0] + d[1] * d[8];
		f[8] = d[5] * d[0] - d[1] * d[4];
		var c = d[0] * f[0] + d[1] * f[3] + d[2] * f[6];
		if (c === 0) {
			var e = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
			if (a || false) {
				throw new Error(e)
			} else {
				THREE.warn(e)
			}
			this.identity();
			return this
		}
		this.multiplyScalar(1 / c);
		return this
	},
	transpose: function() {
		var b, a = this.elements;
		b = a[1];
		a[1] = a[3];
		a[3] = b;
		b = a[2];
		a[2] = a[6];
		a[6] = b;
		b = a[5];
		a[5] = a[7];
		a[7] = b;
		return this
	},
	flattenToArrayOffset: function(c, b) {
		var a = this.elements;
		c[b] = a[0];
		c[b + 1] = a[1];
		c[b + 2] = a[2];
		c[b + 3] = a[3];
		c[b + 4] = a[4];
		c[b + 5] = a[5];
		c[b + 6] = a[6];
		c[b + 7] = a[7];
		c[b + 8] = a[8];
		return c
	},
	getNormalMatrix: function(a) {
		this.getInverse(a).transpose();
		return this
	},
	transposeIntoArray: function(b) {
		var a = this.elements;
		b[0] = a[0];
		b[1] = a[3];
		b[2] = a[6];
		b[3] = a[1];
		b[4] = a[4];
		b[5] = a[7];
		b[6] = a[2];
		b[7] = a[5];
		b[8] = a[8];
		return this
	},
	fromArray: function(a) {
		this.elements.set(a);
		return this
	},
	toArray: function() {
		var a = this.elements;
		return [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]]
	},
	clone: function() {
		return new THREE.Matrix3().fromArray(this.elements)
	}
};
THREE.Matrix4 = function() {
	this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	if (arguments.length > 0) {
		THREE.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
	}
};
THREE.Matrix4.prototype = {
	constructor: THREE.Matrix4,
	set: function(o, n, l, j, f, e, d, c, a, r, q, p, m, k, h, g) {
		var b = this.elements;
		b[0] = o;
		b[4] = n;
		b[8] = l;
		b[12] = j;
		b[1] = f;
		b[5] = e;
		b[9] = d;
		b[13] = c;
		b[2] = a;
		b[6] = r;
		b[10] = q;
		b[14] = p;
		b[3] = m;
		b[7] = k;
		b[11] = h;
		b[15] = g;
		return this
	},
	identity: function() {
		this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this
	},
	copy: function(a) {
		this.elements.set(a.elements);
		return this
	},
	extractPosition: function(a) {
		THREE.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");
		return this.copyPosition(a)
	},
	copyPosition: function(a) {
		var c = this.elements;
		var b = a.elements;
		c[12] = b[12];
		c[13] = b[13];
		c[14] = b[14];
		return this
	},
	extractBasis: function(b, a, c) {
		var d = this.elements;
		b.set(d[0], d[1], d[2]);
		a.set(d[4], d[5], d[6]);
		c.set(d[8], d[9], d[10]);
		return this
	},
	makeBasis: function(b, a, c) {
		this.set(b.x, a.x, c.x, 0, b.y, a.y, c.y, 0, b.z, a.z, c.z, 0, 0, 0, 0, 1);
		return this
	},
	extractRotation: function() {
		var a = new THREE.Vector3();
		return function(b) {
			var g = this.elements;
			var f = b.elements;
			var e = 1 / a.set(f[0], f[1], f[2]).length();
			var d = 1 / a.set(f[4], f[5], f[6]).length();
			var c = 1 / a.set(f[8], f[9], f[10]).length();
			g[0] = f[0] * e;
			g[1] = f[1] * e;
			g[2] = f[2] * e;
			g[4] = f[4] * d;
			g[5] = f[5] * d;
			g[6] = f[6] * d;
			g[8] = f[8] * c;
			g[9] = f[9] * c;
			g[10] = f[10] * c;
			return this
		}
	}(),
	makeRotationFromEuler: function(p) {
		if (p instanceof THREE.Euler === false) {
			THREE.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.")
		}
		var l = this.elements;
		var o = p.x,
			n = p.y,
			m = p.z;
		var I = Math.cos(o),
			H = Math.sin(o);
		var F = Math.cos(n),
			C = Math.sin(n);
		var v = Math.cos(m),
			t = Math.sin(m);
		if (p.order === "XYZ") {
			var B = I * v,
				u = I * t,
				h = H * v,
				g = H * t;
			l[0] = F * v;
			l[4] = -F * t;
			l[8] = C;
			l[1] = u + h * C;
			l[5] = B - g * C;
			l[9] = -H * F;
			l[2] = g - B * C;
			l[6] = h + u * C;
			l[10] = I * F
		} else {
			if (p.order === "YXZ") {
				var r = F * v,
					q = F * t,
					E = C * v,
					A = C * t;
				l[0] = r + A * H;
				l[4] = E * H - q;
				l[8] = I * C;
				l[1] = I * t;
				l[5] = I * v;
				l[9] = -H;
				l[2] = q * H - E;
				l[6] = A + r * H;
				l[10] = I * F
			} else {
				if (p.order === "ZXY") {
					var r = F * v,
						q = F * t,
						E = C * v,
						A = C * t;
					l[0] = r - A * H;
					l[4] = -I * t;
					l[8] = E + q * H;
					l[1] = q + E * H;
					l[5] = I * v;
					l[9] = A - r * H;
					l[2] = -I * C;
					l[6] = H;
					l[10] = I * F
				} else {
					if (p.order === "ZYX") {
						var B = I * v,
							u = I * t,
							h = H * v,
							g = H * t;
						l[0] = F * v;
						l[4] = h * C - u;
						l[8] = B * C + g;
						l[1] = F * t;
						l[5] = g * C + B;
						l[9] = u * C - h;
						l[2] = -C;
						l[6] = H * F;
						l[10] = I * F
					} else {
						if (p.order === "YZX") {
							var G = I * F,
								D = I * C,
								k = H * F,
								j = H * C;
							l[0] = F * v;
							l[4] = j - G * t;
							l[8] = k * t + D;
							l[1] = t;
							l[5] = I * v;
							l[9] = -H * v;
							l[2] = -C * v;
							l[6] = D * t + k;
							l[10] = G - j * t
						} else {
							if (p.order === "XZY") {
								var G = I * F,
									D = I * C,
									k = H * F,
									j = H * C;
								l[0] = F * v;
								l[4] = -t;
								l[8] = C * v;
								l[1] = G * t + j;
								l[5] = I * v;
								l[9] = D * t - k;
								l[2] = k * t - D;
								l[6] = H * v;
								l[10] = j * t + G
							}
						}
					}
				}
			}
		}
		l[3] = 0;
		l[7] = 0;
		l[11] = 0;
		l[12] = 0;
		l[13] = 0;
		l[14] = 0;
		l[15] = 1;
		return this
	},
	setRotationFromQuaternion: function(a) {
		THREE.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");
		return this.makeRotationFromQuaternion(a)
	},
	makeRotationFromQuaternion: function(m) {
		var e = this.elements;
		var h = m.x,
			g = m.y,
			f = m.z,
			j = m.w;
		var o = h + h,
			a = g + g,
			k = f + f;
		var d = h * o,
			c = h * a,
			b = h * k;
		var n = g * a,
			l = g * k,
			t = f * k;
		var u = j * o,
			r = j * a,
			p = j * k;
		e[0] = 1 - (n + t);
		e[4] = c - p;
		e[8] = b + r;
		e[1] = c + p;
		e[5] = 1 - (d + t);
		e[9] = l - u;
		e[2] = b - r;
		e[6] = l + u;
		e[10] = 1 - (d + n);
		e[3] = 0;
		e[7] = 0;
		e[11] = 0;
		e[12] = 0;
		e[13] = 0;
		e[14] = 0;
		e[15] = 1;
		return this
	},
	lookAt: function() {
		var a = new THREE.Vector3();
		var c = new THREE.Vector3();
		var b = new THREE.Vector3();
		return function(e, f, d) {
			var g = this.elements;
			b.subVectors(e, f).normalize();
			if (b.length() === 0) {
				b.z = 1
			}
			a.crossVectors(d, b).normalize();
			if (a.length() === 0) {
				b.x += 0.0001;
				a.crossVectors(d, b).normalize()
			}
			c.crossVectors(b, a);
			g[0] = a.x;
			g[4] = c.x;
			g[8] = b.x;
			g[1] = a.y;
			g[5] = c.y;
			g[9] = b.y;
			g[2] = a.z;
			g[6] = c.z;
			g[10] = b.z;
			return this
		}
	}(),
	multiply: function(a, b) {
		if (b !== undefined) {
			THREE.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.");
			return this.multiplyMatrices(a, b)
		}
		return this.multiplyMatrices(this, a)
	},
	multiplyMatrices: function(S, R) {
		var u = S.elements;
		var Q = R.elements;
		var c = this.elements;
		var q = u[0],
			o = u[4],
			n = u[8],
			m = u[12];
		var P = u[1],
			O = u[5],
			N = u[9],
			M = u[13];
		var H = u[2],
			G = u[6],
			F = u[10],
			E = u[14];
		var v = u[3],
			t = u[7],
			r = u[11],
			p = u[15];
		var j = Q[0],
			g = Q[4],
			e = Q[8],
			d = Q[12];
		var L = Q[1],
			K = Q[5],
			J = Q[9],
			I = Q[13];
		var D = Q[2],
			C = Q[6],
			B = Q[10],
			A = Q[14];
		var l = Q[3],
			k = Q[7],
			h = Q[11],
			f = Q[15];
		c[0] = q * j + o * L + n * D + m * l;
		c[4] = q * g + o * K + n * C + m * k;
		c[8] = q * e + o * J + n * B + m * h;
		c[12] = q * d + o * I + n * A + m * f;
		c[1] = P * j + O * L + N * D + M * l;
		c[5] = P * g + O * K + N * C + M * k;
		c[9] = P * e + O * J + N * B + M * h;
		c[13] = P * d + O * I + N * A + M * f;
		c[2] = H * j + G * L + F * D + E * l;
		c[6] = H * g + G * K + F * C + E * k;
		c[10] = H * e + G * J + F * B + E * h;
		c[14] = H * d + G * I + F * A + E * f;
		c[3] = v * j + t * L + r * D + p * l;
		c[7] = v * g + t * K + r * C + p * k;
		c[11] = v * e + t * J + r * B + p * h;
		c[15] = v * d + t * I + r * A + p * f;
		return this
	},
	multiplyToArray: function(d, c, e) {
		var f = this.elements;
		this.multiplyMatrices(d, c);
		e[0] = f[0];
		e[1] = f[1];
		e[2] = f[2];
		e[3] = f[3];
		e[4] = f[4];
		e[5] = f[5];
		e[6] = f[6];
		e[7] = f[7];
		e[8] = f[8];
		e[9] = f[9];
		e[10] = f[10];
		e[11] = f[11];
		e[12] = f[12];
		e[13] = f[13];
		e[14] = f[14];
		e[15] = f[15];
		return this
	},
	multiplyScalar: function(a) {
		var b = this.elements;
		b[0] *= a;
		b[4] *= a;
		b[8] *= a;
		b[12] *= a;
		b[1] *= a;
		b[5] *= a;
		b[9] *= a;
		b[13] *= a;
		b[2] *= a;
		b[6] *= a;
		b[10] *= a;
		b[14] *= a;
		b[3] *= a;
		b[7] *= a;
		b[11] *= a;
		b[15] *= a;
		return this
	},
	multiplyVector3: function(a) {
		THREE.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
		return a.applyProjection(this)
	},
	multiplyVector4: function(a) {
		THREE.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
		return a.applyMatrix4(this)
	},
	multiplyVector3Array: function(b) {
		THREE.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
		return this.applyToVector3Array(b)
	},
	applyToVector3Array: function() {
		var a = new THREE.Vector3();
		return function(f, e, d) {
			if (e === undefined) {
				e = 0
			}
			if (d === undefined) {
				d = f.length
			}
			for (var c = 0, b = e; c < d; c += 3, b += 3) {
				a.x = f[b];
				a.y = f[b + 1];
				a.z = f[b + 2];
				a.applyMatrix4(this);
				f[b] = a.x;
				f[b + 1] = a.y;
				f[b + 2] = a.z
			}
			return f
		}
	}(),
	rotateAxis: function(a) {
		THREE.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
		a.transformDirection(this)
	},
	crossVector: function(a) {
		THREE.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");
		return a.applyMatrix4(this)
	},
	determinant: function() {
		var c = this.elements;
		var o = c[0],
			n = c[4],
			l = c[8],
			j = c[12];
		var f = c[1],
			e = c[5],
			d = c[9],
			b = c[13];
		var a = c[2],
			r = c[6],
			q = c[10],
			p = c[14];
		var m = c[3],
			k = c[7],
			h = c[11],
			g = c[15];
		return (m * (+j * d * r - l * b * r - j * e * q + n * b * q + l * e * p - n * d * p) + k * (+o * d * p - o * b * q + j * f * q - l * f * p + l * b * a - j * d * a) + h * (+o * b * r - o * e * p - j * f * r + n * f * p + j * e * a - n * b * a) + g * (-l * e * a - o * d * r + o * e * q + l * f * r - n * f * q + n * d * a))
	},
	transpose: function() {
		var b = this.elements;
		var a;
		a = b[1];
		b[1] = b[4];
		b[4] = a;
		a = b[2];
		b[2] = b[8];
		b[8] = a;
		a = b[6];
		b[6] = b[9];
		b[9] = a;
		a = b[3];
		b[3] = b[12];
		b[12] = a;
		a = b[7];
		b[7] = b[13];
		b[13] = a;
		a = b[11];
		b[11] = b[14];
		b[14] = a;
		return this
	},
	flattenToArrayOffset: function(c, b) {
		var a = this.elements;
		c[b] = a[0];
		c[b + 1] = a[1];
		c[b + 2] = a[2];
		c[b + 3] = a[3];
		c[b + 4] = a[4];
		c[b + 5] = a[5];
		c[b + 6] = a[6];
		c[b + 7] = a[7];
		c[b + 8] = a[8];
		c[b + 9] = a[9];
		c[b + 10] = a[10];
		c[b + 11] = a[11];
		c[b + 12] = a[12];
		c[b + 13] = a[13];
		c[b + 14] = a[14];
		c[b + 15] = a[15];
		return c
	},
	getPosition: function() {
		var a = new THREE.Vector3();
		return function() {
			THREE.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
			var b = this.elements;
			return a.set(b[12], b[13], b[14])
		}
	}(),
	setPosition: function(a) {
		var b = this.elements;
		b[12] = a.x;
		b[13] = a.y;
		b[14] = a.z;
		return this
	},
	getInverse: function(t, h) {
		var g = this.elements;
		var C = t.elements;
		var q = C[0],
			o = C[4],
			l = C[8],
			j = C[12];
		var B = C[1],
			A = C[5],
			v = C[9],
			u = C[13];
		var d = C[2],
			c = C[6],
			b = C[10],
			a = C[14];
		var r = C[3],
			p = C[7],
			n = C[11],
			k = C[15];
		g[0] = v * a * p - u * b * p + u * c * n - A * a * n - v * c * k + A * b * k;
		g[4] = j * b * p - l * a * p - j * c * n + o * a * n + l * c * k - o * b * k;
		g[8] = l * u * p - j * v * p + j * A * n - o * u * n - l * A * k + o * v * k;
		g[12] = j * v * c - l * u * c - j * A * b + o * u * b + l * A * a - o * v * a;
		g[1] = u * b * r - v * a * r - u * d * n + B * a * n + v * d * k - B * b * k;
		g[5] = l * a * r - j * b * r + j * d * n - q * a * n - l * d * k + q * b * k;
		g[9] = j * v * r - l * u * r - j * B * n + q * u * n + l * B * k - q * v * k;
		g[13] = l * u * d - j * v * d + j * B * b - q * u * b - l * B * a + q * v * a;
		g[2] = A * a * r - u * c * r + u * d * p - B * a * p - A * d * k + B * c * k;
		g[6] = j * c * r - o * a * r - j * d * p + q * a * p + o * d * k - q * c * k;
		g[10] = o * u * r - j * A * r + j * B * p - q * u * p - o * B * k + q * A * k;
		g[14] = j * A * d - o * u * d - j * B * c + q * u * c + o * B * a - q * A * a;
		g[3] = v * c * r - A * b * r - v * d * p + B * b * p + A * d * n - B * c * n;
		g[7] = o * b * r - l * c * r + l * d * p - q * b * p - o * d * n + q * c * n;
		g[11] = l * A * r - o * v * r - l * B * p + q * v * p + o * B * n - q * A * n;
		g[15] = o * v * d - l * A * d + l * B * c - q * v * c - o * B * b + q * A * b;
		var e = q * g[0] + B * g[4] + d * g[8] + r * g[12];
		if (e == 0) {
			var f = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
			if (h || false) {
				throw new Error(f)
			} else {
				THREE.warn(f)
			}
			this.identity();
			return this
		}
		this.multiplyScalar(1 / e);
		return this
	},
	translate: function(a) {
		THREE.error("THREE.Matrix4: .translate() has been removed.")
	},
	rotateX: function(a) {
		THREE.error("THREE.Matrix4: .rotateX() has been removed.")
	},
	rotateY: function(a) {
		THREE.error("THREE.Matrix4: .rotateY() has been removed.")
	},
	rotateZ: function(a) {
		THREE.error("THREE.Matrix4: .rotateZ() has been removed.")
	},
	rotateByAxis: function(a, b) {
		THREE.error("THREE.Matrix4: .rotateByAxis() has been removed.")
	},
	scale: function(b) {
		var d = this.elements;
		var a = b.x,
			e = b.y,
			c = b.z;
		d[0] *= a;
		d[4] *= e;
		d[8] *= c;
		d[1] *= a;
		d[5] *= e;
		d[9] *= c;
		d[2] *= a;
		d[6] *= e;
		d[10] *= c;
		d[3] *= a;
		d[7] *= e;
		d[11] *= c;
		return this
	},
	getMaxScaleOnAxis: function() {
		var c = this.elements;
		var d = c[0] * c[0] + c[1] * c[1] + c[2] * c[2];
		var b = c[4] * c[4] + c[5] * c[5] + c[6] * c[6];
		var a = c[8] * c[8] + c[9] * c[9] + c[10] * c[10];
		return Math.sqrt(Math.max(d, Math.max(b, a)))
	},
	makeTranslation: function(a, c, b) {
		this.set(1, 0, 0, a, 0, 1, 0, c, 0, 0, 1, b, 0, 0, 0, 1);
		return this
	},
	makeRotationX: function(a) {
		var d = Math.cos(a),
			b = Math.sin(a);
		this.set(1, 0, 0, 0, 0, d, -b, 0, 0, b, d, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationY: function(a) {
		var d = Math.cos(a),
			b = Math.sin(a);
		this.set(d, 0, b, 0, 0, 1, 0, 0, -b, 0, d, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationZ: function(a) {
		var d = Math.cos(a),
			b = Math.sin(a);
		this.set(d, -b, 0, 0, b, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		return this
	},
	makeRotationAxis: function(a, b) {
		var f = Math.cos(b);
		var l = Math.sin(b);
		var k = 1 - f;
		var j = a.x,
			h = a.y,
			g = a.z;
		var e = k * j,
			d = k * h;
		this.set(e * j + f, e * h - l * g, e * g + l * h, 0, e * h + l * g, d * h + f, d * g - l * j, 0, e * g - l * h, d * g + l * j, k * g * g + f, 0, 0, 0, 0, 1);
		return this
	},
	makeScale: function(a, c, b) {
		this.set(a, 0, 0, 0, 0, c, 0, 0, 0, 0, b, 0, 0, 0, 0, 1);
		return this
	},
	compose: function(a, b, c) {
		this.makeRotationFromQuaternion(b);
		this.scale(c);
		this.setPosition(a);
		return this
	},
	decompose: function() {
		var a = new THREE.Vector3();
		var b = new THREE.Matrix4();
		return function(j, h, g) {
			var f = this.elements;
			var n = a.set(f[0], f[1], f[2]).length();
			var m = a.set(f[4], f[5], f[6]).length();
			var l = a.set(f[8], f[9], f[10]).length();
			var k = this.determinant();
			if (k < 0) {
				n = -n
			}
			j.x = f[12];
			j.y = f[13];
			j.z = f[14];
			b.elements.set(this.elements);
			var e = 1 / n;
			var d = 1 / m;
			var c = 1 / l;
			b.elements[0] *= e;
			b.elements[1] *= e;
			b.elements[2] *= e;
			b.elements[4] *= d;
			b.elements[5] *= d;
			b.elements[6] *= d;
			b.elements[8] *= c;
			b.elements[9] *= c;
			b.elements[10] *= c;
			h.setFromRotationMatrix(b);
			g.x = n;
			g.y = m;
			g.z = l;
			return this
		}
	}(),
	makeFrustum: function(g, r, e, o, j, h) {
		var f = this.elements;
		var q = 2 * j / (r - g);
		var n = 2 * j / (o - e);
		var p = (r + g) / (r - g);
		var m = (o + e) / (o - e);
		var l = -(h + j) / (h - j);
		var k = -2 * h * j / (h - j);
		f[0] = q;
		f[4] = 0;
		f[8] = p;
		f[12] = 0;
		f[1] = 0;
		f[5] = n;
		f[9] = m;
		f[13] = 0;
		f[2] = 0;
		f[6] = 0;
		f[10] = l;
		f[14] = k;
		f[3] = 0;
		f[7] = 0;
		f[11] = -1;
		f[15] = 0;
		return this
	},
	makePerspective: function(e, c, g, b) {
		var a = g * Math.tan(THREE.Math.degToRad(e * 0.5));
		var f = -a;
		var h = f * c;
		var d = a * c;
		return this.makeFrustum(h, d, f, a, g, b)
	},
	makeOrthographic: function(d, o, l, a, g, f) {
		var c = this.elements;
		var n = o - d;
		var e = l - a;
		var b = f - g;
		var m = (o + d) / n;
		var k = (l + a) / e;
		var j = (f + g) / b;
		c[0] = 2 / n;
		c[4] = 0;
		c[8] = 0;
		c[12] = -m;
		c[1] = 0;
		c[5] = 2 / e;
		c[9] = 0;
		c[13] = -k;
		c[2] = 0;
		c[6] = 0;
		c[10] = -2 / b;
		c[14] = -j;
		c[3] = 0;
		c[7] = 0;
		c[11] = 0;
		c[15] = 1;
		return this
	},
	fromArray: function(a) {
		this.elements.set(a);
		return this
	},
	toArray: function() {
		var a = this.elements;
		return [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]]
	},
	clone: function() {
		return new THREE.Matrix4().fromArray(this.elements)
	}
};
THREE.Ray = function(a, b) {
	this.origin = (a !== undefined) ? a : new THREE.Vector3();
	this.direction = (b !== undefined) ? b : new THREE.Vector3()
};
THREE.Ray.prototype = {
	constructor: THREE.Ray,
	set: function(a, b) {
		this.origin.copy(a);
		this.direction.copy(b);
		return this
	},
	copy: function(a) {
		this.origin.copy(a.origin);
		this.direction.copy(a.direction);
		return this
	},
	at: function(c, b) {
		var a = b || new THREE.Vector3();
		return a.copy(this.direction).multiplyScalar(c).add(this.origin)
	},
	recast: function() {
		var a = new THREE.Vector3();
		return function(b) {
			this.origin.copy(this.at(b, a));
			return this
		}
	}(),
	closestPointToPoint: function(b, c) {
		var a = c || new THREE.Vector3();
		a.subVectors(b, this.origin);
		var d = a.dot(this.direction);
		if (d < 0) {
			return a.copy(this.origin)
		}
		return a.copy(this.direction).multiplyScalar(d).add(this.origin)
	},
	distanceToPoint: function() {
		var a = new THREE.Vector3();
		return function(b) {
			var c = a.subVectors(b, this.origin).dot(this.direction);
			if (c < 0) {
				return this.origin.distanceTo(b)
			}
			a.copy(this.direction).multiplyScalar(c).add(this.origin);
			return a.distanceTo(b)
		}
	}(),
	distanceSqToSegment: function() {
		var b = new THREE.Vector3();
		var a = new THREE.Vector3();
		var c = new THREE.Vector3();
		return function(q, m, n, f) {
			b.copy(q).add(m).multiplyScalar(0.5);
			a.copy(m).sub(q).normalize();
			c.copy(this.origin).sub(b);
			var h = q.distanceTo(m) * 0.5;
			var d = -this.direction.dot(a);
			var o = c.dot(this.direction);
			var l = -c.dot(a);
			var k = c.lengthSq();
			var j = Math.abs(1 - d * d);
			var t, p, e, r;
			if (j > 0) {
				t = d * l - o;
				p = d * o - l;
				r = h * j;
				if (t >= 0) {
					if (p >= -r) {
						if (p <= r) {
							var g = 1 / j;
							t *= g;
							p *= g;
							e = t * (t + d * p + 2 * o) + p * (d * t + p + 2 * l) + k
						} else {
							p = h;
							t = Math.max(0, -(d * p + o));
							e = -t * t + p * (p + 2 * l) + k
						}
					} else {
						p = -h;
						t = Math.max(0, -(d * p + o));
						e = -t * t + p * (p + 2 * l) + k
					}
				} else {
					if (p <= -r) {
						t = Math.max(0, -(-d * h + o));
						p = (t > 0) ? -h : Math.min(Math.max(-h, -l), h);
						e = -t * t + p * (p + 2 * l) + k
					} else {
						if (p <= r) {
							t = 0;
							p = Math.min(Math.max(-h, -l), h);
							e = p * (p + 2 * l) + k
						} else {
							t = Math.max(0, -(d * h + o));
							p = (t > 0) ? h : Math.min(Math.max(-h, -l), h);
							e = -t * t + p * (p + 2 * l) + k
						}
					}
				}
			} else {
				p = (d > 0) ? -h : h;
				t = Math.max(0, -(d * p + o));
				e = -t * t + p * (p + 2 * l) + k
			}
			if (n) {
				n.copy(this.direction).multiplyScalar(t).add(this.origin)
			}
			if (f) {
				f.copy(a).multiplyScalar(p).add(b)
			}
			return e
		}
	}(),
	isIntersectionSphere: function(a) {
		return this.distanceToPoint(a.center) <= a.radius
	},
	intersectSphere: function() {
		var a = new THREE.Vector3();
		return function(b, d) {
			a.subVectors(b.center, this.origin);
			var j = a.dot(this.direction);
			var f = a.dot(a) - j * j;
			var c = b.radius * b.radius;
			if (f > c) {
				return null
			}
			var h = Math.sqrt(c - f);
			var g = j - h;
			var e = j + h;
			if (g < 0 && e < 0) {
				return null
			}
			if (g < 0) {
				return this.at(e, d)
			}
			return this.at(g, d)
		}
	}(),
	isIntersectionPlane: function(a) {
		var b = a.distanceToPoint(this.origin);
		if (b === 0) {
			return true
		}
		var c = a.normal.dot(this.direction);
		if (c * b < 0) {
			return true
		}
		return false
	},
	distanceToPlane: function(a) {
		var c = a.normal.dot(this.direction);
		if (c == 0) {
			if (a.distanceToPoint(this.origin) == 0) {
				return 0
			}
			return null
		}
		var b = -(this.origin.dot(a.normal) + a.constant) / c;
		return b >= 0 ? b : null
	},
	intersectPlane: function(a, c) {
		var b = this.distanceToPlane(a);
		if (b === null) {
			return null
		}
		return this.at(b, c)
	},
	isIntersectionBox: function() {
		var a = new THREE.Vector3();
		return function(b) {
			return this.intersectBox(b, a) !== null
		}
	}(),
	intersectBox: function(f, m) {
		var c, g, j, a, h, l;
		var e = 1 / this.direction.x,
			d = 1 / this.direction.y,
			b = 1 / this.direction.z;
		var k = this.origin;
		if (e >= 0) {
			c = (f.min.x - k.x) * e;
			g = (f.max.x - k.x) * e
		} else {
			c = (f.max.x - k.x) * e;
			g = (f.min.x - k.x) * e
		}
		if (d >= 0) {
			j = (f.min.y - k.y) * d;
			a = (f.max.y - k.y) * d
		} else {
			j = (f.max.y - k.y) * d;
			a = (f.min.y - k.y) * d
		}
		if ((c > a) || (j > g)) {
			return null
		}
		if (j > c || c !== c) {
			c = j
		}
		if (a < g || g !== g) {
			g = a
		}
		if (b >= 0) {
			h = (f.min.z - k.z) * b;
			l = (f.max.z - k.z) * b
		} else {
			h = (f.max.z - k.z) * b;
			l = (f.min.z - k.z) * b
		}
		if ((c > l) || (h > g)) {
			return null
		}
		if (h > c || c !== c) {
			c = h
		}
		if (l < g || g !== g) {
			g = l
		}
		if (g < 0) {
			return null
		}
		return this.at(c >= 0 ? c : g, m)
	},
	intersectTriangle: function() {
		var d = new THREE.Vector3();
		var b = new THREE.Vector3();
		var a = new THREE.Vector3();
		var c = new THREE.Vector3();
		return function(n, l, k, e, o) {
			b.subVectors(l, n);
			a.subVectors(k, n);
			c.crossVectors(b, a);
			var j = this.direction.dot(c);
			var f;
			if (j > 0) {
				if (e) {
					return null
				}
				f = 1
			} else {
				if (j < 0) {
					f = -1;
					j = -j
				} else {
					return null
				}
			}
			d.subVectors(this.origin, n);
			var m = f * this.direction.dot(a.crossVectors(d, a));
			if (m < 0) {
				return null
			}
			var g = f * this.direction.dot(b.cross(d));
			if (g < 0) {
				return null
			}
			if (m + g > j) {
				return null
			}
			var h = -f * d.dot(c);
			if (h < 0) {
				return null
			}
			return this.at(h / j, o)
		}
	}(),
	applyMatrix4: function(a) {
		this.direction.add(this.origin).applyMatrix4(a);
		this.origin.applyMatrix4(a);
		this.direction.sub(this.origin);
		this.direction.normalize();
		return this
	},
	equals: function(a) {
		return a.origin.equals(this.origin) && a.direction.equals(this.direction)
	},
	clone: function() {
		return new THREE.Ray().copy(this)
	}
};
THREE.Sphere = function(b, a) {
	this.center = (b !== undefined) ? b : new THREE.Vector3();
	this.radius = (a !== undefined) ? a : 0
};
THREE.Sphere.prototype = {
	constructor: THREE.Sphere,
	set: function(b, a) {
		this.center.copy(b);
		this.radius = a;
		return this
	},
	setFromPoints: function() {
		var a = new THREE.Box3();
		return function(f, g) {
			var b = this.center;
			if (g !== undefined) {
				b.copy(g)
			} else {
				a.setFromPoints(f).center(b)
			}
			var c = 0;
			for (var e = 0, d = f.length; e < d; e++) {
				c = Math.max(c, b.distanceToSquared(f[e]))
			}
			this.radius = Math.sqrt(c);
			return this
		}
	}(),
	copy: function(a) {
		this.center.copy(a.center);
		this.radius = a.radius;
		return this
	},
	empty: function() {
		return (this.radius <= 0)
	},
	containsPoint: function(a) {
		return (a.distanceToSquared(this.center) <= (this.radius * this.radius))
	},
	distanceToPoint: function(a) {
		return (a.distanceTo(this.center) - this.radius)
	},
	intersectsSphere: function(a) {
		var b = this.radius + a.radius;
		return a.center.distanceToSquared(this.center) <= (b * b)
	},
	clampPoint: function(b, d) {
		var c = this.center.distanceToSquared(b);
		var a = d || new THREE.Vector3();
		a.copy(b);
		if (c > (this.radius * this.radius)) {
			a.sub(this.center).normalize();
			a.multiplyScalar(this.radius).add(this.center)
		}
		return a
	},
	getBoundingBox: function(a) {
		var b = a || new THREE.Box3();
		b.set(this.center, this.center);
		b.expandByScalar(this.radius);
		return b
	},
	applyMatrix4: function(a) {
		this.center.applyMatrix4(a);
		this.radius = this.radius * a.getMaxScaleOnAxis();
		return this
	},
	translate: function(a) {
		this.center.add(a);
		return this
	},
	equals: function(a) {
		return a.center.equals(this.center) && (a.radius === this.radius)
	},
	clone: function() {
		return new THREE.Sphere().copy(this)
	}
};
THREE.Frustum = function(f, e, d, c, b, a) {
	this.planes = [(f !== undefined) ? f : new THREE.Plane(), (e !== undefined) ? e : new THREE.Plane(), (d !== undefined) ? d : new THREE.Plane(), (c !== undefined) ? c : new THREE.Plane(), (b !== undefined) ? b : new THREE.Plane(), (a !== undefined) ? a : new THREE.Plane()]
};
THREE.Frustum.prototype = {
	constructor: THREE.Frustum,
	set: function(g, f, e, d, c, b) {
		var a = this.planes;
		a[0].copy(g);
		a[1].copy(f);
		a[2].copy(e);
		a[3].copy(d);
		a[4].copy(c);
		a[5].copy(b);
		return this
	},
	copy: function(c) {
		var a = this.planes;
		for (var b = 0; b < 6; b++) {
			a[b].copy(c.planes[b])
		}
		return this
	},
	setFromMatrix: function(p) {
		var h = this.planes;
		var v = p.elements;
		var n = v[0],
			k = v[1],
			j = v[2],
			g = v[3];
		var f = v[4],
			e = v[5],
			d = v[6],
			c = v[7];
		var b = v[8],
			a = v[9],
			u = v[10],
			t = v[11];
		var r = v[12],
			q = v[13],
			o = v[14],
			l = v[15];
		h[0].setComponents(g - n, c - f, t - b, l - r).normalize();
		h[1].setComponents(g + n, c + f, t + b, l + r).normalize();
		h[2].setComponents(g + k, c + e, t + a, l + q).normalize();
		h[3].setComponents(g - k, c - e, t - a, l - q).normalize();
		h[4].setComponents(g - j, c - d, t - u, l - o).normalize();
		h[5].setComponents(g + j, c + d, t + u, l + o).normalize();
		return this
	},
	intersectsObject: function() {
		var a = new THREE.Sphere();
		return function(b) {
			var c = b.geometry;
			if (c.boundingSphere === null) {
				c.computeBoundingSphere()
			}
			a.copy(c.boundingSphere);
			a.applyMatrix4(b.matrixWorld);
			return this.intersectsSphere(a)
		}
	}(),
	intersectsSphere: function(c) {
		var d = this.planes;
		var a = c.center;
		var b = -c.radius;
		for (var e = 0; e < 6; e++) {
			var f = d[e].distanceToPoint(a);
			if (f < b) {
				return false
			}
		}
		return true
	},
	intersectsBox: function() {
		var b = new THREE.Vector3(),
			a = new THREE.Vector3();
		return function(g) {
			var d = this.planes;
			for (var e = 0; e < 6; e++) {
				var c = d[e];
				b.x = c.normal.x > 0 ? g.min.x : g.max.x;
				a.x = c.normal.x > 0 ? g.max.x : g.min.x;
				b.y = c.normal.y > 0 ? g.min.y : g.max.y;
				a.y = c.normal.y > 0 ? g.max.y : g.min.y;
				b.z = c.normal.z > 0 ? g.min.z : g.max.z;
				a.z = c.normal.z > 0 ? g.max.z : g.min.z;
				var h = c.distanceToPoint(b);
				var f = c.distanceToPoint(a);
				if (h < 0 && f < 0) {
					return false
				}
			}
			return true
		}
	}(),
	containsPoint: function(a) {
		var b = this.planes;
		for (var c = 0; c < 6; c++) {
			if (b[c].distanceToPoint(a) < 0) {
				return false
			}
		}
		return true
	},
	clone: function() {
		return new THREE.Frustum().copy(this)
	}
};
THREE.Plane = function(b, a) {
	this.normal = (b !== undefined) ? b : new THREE.Vector3(1, 0, 0);
	this.constant = (a !== undefined) ? a : 0
};
THREE.Plane.prototype = {
	constructor: THREE.Plane,
	set: function(b, a) {
		this.normal.copy(b);
		this.constant = a;
		return this
	},
	setComponents: function(a, d, c, b) {
		this.normal.set(a, d, c);
		this.constant = b;
		return this
	},
	setFromNormalAndCoplanarPoint: function(b, a) {
		this.normal.copy(b);
		this.constant = -a.dot(this.normal);
		return this
	},
	setFromCoplanarPoints: function() {
		var b = new THREE.Vector3();
		var a = new THREE.Vector3();
		return function(e, d, g) {
			var f = b.subVectors(g, d).cross(a.subVectors(e, d)).normalize();
			this.setFromNormalAndCoplanarPoint(f, e);
			return this
		}
	}(),
	copy: function(a) {
		this.normal.copy(a.normal);
		this.constant = a.constant;
		return this
	},
	normalize: function() {
		var a = 1 / this.normal.length();
		this.normal.multiplyScalar(a);
		this.constant *= a;
		return this
	},
	negate: function() {
		this.constant *= -1;
		this.normal.negate();
		return this
	},
	distanceToPoint: function(a) {
		return this.normal.dot(a) + this.constant
	},
	distanceToSphere: function(a) {
		return this.distanceToPoint(a.center) - a.radius
	},
	projectPoint: function(a, b) {
		return this.orthoPoint(a, b).sub(a).negate()
	},
	orthoPoint: function(b, d) {
		var c = this.distanceToPoint(b);
		var a = d || new THREE.Vector3();
		return a.copy(this.normal).multiplyScalar(c)
	},
	isIntersectionLine: function(a) {
		var c = this.distanceToPoint(a.start);
		var b = this.distanceToPoint(a.end);
		return (c < 0 && b > 0) || (b < 0 && c > 0)
	},
	intersectLine: function() {
		var a = new THREE.Vector3();
		return function(c, e) {
			var b = e || new THREE.Vector3();
			var f = c.delta(a);
			var g = this.normal.dot(f);
			if (g == 0) {
				if (this.distanceToPoint(c.start) == 0) {
					return b.copy(c.start)
				}
				return undefined
			}
			var d = -(c.start.dot(this.normal) + this.constant) / g;
			if (d < 0 || d > 1) {
				return undefined
			}
			return b.copy(f).multiplyScalar(d).add(c.start)
		}
	}(),
	coplanarPoint: function(b) {
		var a = b || new THREE.Vector3();
		return a.copy(this.normal).multiplyScalar(-this.constant)
	},
	applyMatrix4: function() {
		var c = new THREE.Vector3();
		var b = new THREE.Vector3();
		var a = new THREE.Matrix3();
		return function(e, f) {
			var h = f || a.getNormalMatrix(e);
			var g = c.copy(this.normal).applyMatrix3(h);
			var d = this.coplanarPoint(b);
			d.applyMatrix4(e);
			this.setFromNormalAndCoplanarPoint(g, d);
			return this
		}
	}(),
	translate: function(a) {
		this.constant = this.constant - a.dot(this.normal);
		return this
	},
	equals: function(a) {
		return a.normal.equals(this.normal) && (a.constant == this.constant)
	},
	clone: function() {
		return new THREE.Plane().copy(this)
	}
};
THREE.Math = {
	generateUUID: function() {
		var d = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
		var b = new Array(36);
		var a = 0,
			c;
		return function() {
			for (var e = 0; e < 36; e++) {
				if (e == 8 || e == 13 || e == 18 || e == 23) {
					b[e] = "-"
				} else {
					if (e == 14) {
						b[e] = "4"
					} else {
						if (a <= 2) {
							a = 33554432 + (Math.random() * 16777216) | 0
						}
						c = a & 15;
						a = a >> 4;
						b[e] = d[(e == 19) ? (c & 3) | 8 : c]
					}
				}
			}
			return b.join("")
		}
	}(),
	clamp: function(d, e, c) {
		return (d < e) ? e : ((d > c) ? c : d)
	},
	clampBottom: function(b, c) {
		return b < c ? c : b
	},
	mapLinear: function(b, c, a, e, d) {
		return e + (b - c) * (d - e) / (a - c)
	},
	smoothstep: function(b, c, a) {
		if (b <= c) {
			return 0
		}
		if (b >= a) {
			return 1
		}
		b = (b - c) / (a - c);
		return b * b * (3 - 2 * b)
	},
	smootherstep: function(b, c, a) {
		if (b <= c) {
			return 0
		}
		if (b >= a) {
			return 1
		}
		b = (b - c) / (a - c);
		return b * b * b * (b * (b * 6 - 15) + 10)
	},
	random16: function() {
		return (65280 * Math.random() + 255 * Math.random()) / 65535
	},
	randInt: function(a, b) {
		return Math.floor(this.randFloat(a, b))
	},
	randFloat: function(a, b) {
		return a + Math.random() * (b - a)
	},
	randFloatSpread: function(a) {
		return a * (0.5 - Math.random())
	},
	degToRad: function() {
		var a = Math.PI / 180;
		return function(b) {
			return b * a
		}
	}(),
	radToDeg: function() {
		var a = 180 / Math.PI;
		return function(b) {
			return b * a
		}
	}(),
	isPowerOfTwo: function(a) {
		return (a & (a - 1)) === 0 && a !== 0
	},
	nextPowerOfTwo: function(a) {
		a--;
		a |= a >> 1;
		a |= a >> 2;
		a |= a >> 4;
		a |= a >> 8;
		a |= a >> 16;
		a++;
		return a
	}
};
THREE.Spline = function(o) {
	this.points = o;
	var h = [],
		k = {
			x: 0,
			y: 0,
			z: 0
		},
		n, a, e, d, b, m, l, j, g;
	this.initFromArray = function(c) {
		this.points = [];
		for (var p = 0; p < c.length; p++) {
			this.points[p] = {
				x: c[p][0],
				y: c[p][1],
				z: c[p][2]
			}
		}
	};
	this.getPoint = function(c) {
		n = (this.points.length - 1) * c;
		a = Math.floor(n);
		e = n - a;
		h[0] = a === 0 ? a : a - 1;
		h[1] = a;
		h[2] = a > this.points.length - 2 ? this.points.length - 1 : a + 1;
		h[3] = a > this.points.length - 3 ? this.points.length - 1 : a + 2;
		m = this.points[h[0]];
		l = this.points[h[1]];
		j = this.points[h[2]];
		g = this.points[h[3]];
		d = e * e;
		b = e * d;
		k.x = f(m.x, l.x, j.x, g.x, e, d, b);
		k.y = f(m.y, l.y, j.y, g.y, e, d, b);
		k.z = f(m.z, l.z, j.z, g.z, e, d, b);
		return k
	};
	this.getControlPointsArray = function() {
		var q, t, c = this.points.length,
			r = [];
		for (q = 0; q < c; q++) {
			t = this.points[q];
			r[q] = [t.x, t.y, t.z]
		}
		return r
	};
	this.getLength = function(q) {
		var t, v, A, u, D = 0,
			c = 0,
			r = 0,
			C = new THREE.Vector3(),
			p = new THREE.Vector3(),
			B = [],
			E = 0;
		B[0] = 0;
		if (!q) {
			q = 100
		}
		A = this.points.length * q;
		C.copy(this.points[0]);
		for (t = 1; t < A; t++) {
			v = t / A;
			u = this.getPoint(v);
			p.copy(u);
			E += p.distanceTo(C);
			C.copy(u);
			D = (this.points.length - 1) * v;
			c = Math.floor(D);
			if (c != r) {
				B[c] = E;
				r = c
			}
		}
		B[B.length] = E;
		return {
			chunks: B,
			total: E
		}
	};
	this.reparametrizeByArcLength = function(p) {
		var u, t, B, C, q, D, A, v, E = [],
			c = new THREE.Vector3(),
			r = this.getLength();
		E.push(c.copy(this.points[0]).clone());
		for (u = 1; u < this.points.length; u++) {
			D = r.chunks[u] - r.chunks[u - 1];
			A = Math.ceil(p * D / r.total);
			C = (u - 1) / (this.points.length - 1);
			q = u / (this.points.length - 1);
			for (t = 1; t < A - 1; t++) {
				B = C + t * (1 / A) * (q - C);
				v = this.getPoint(B);
				E.push(c.copy(v).clone())
			}
			E.push(c.copy(this.points[u]).clone())
		}
		this.points = E
	};

	function f(B, A, u, r, C, p, c) {
		var v = (u - B) * 0.5,
			q = (r - A) * 0.5;
		return (2 * (A - u) + v + q) * c + (-3 * (A - u) - 2 * v - q) * p + v * C + A
	}
};
THREE.Triangle = function(e, d, f) {
	this.a = (e !== undefined) ? e : new THREE.Vector3();
	this.b = (d !== undefined) ? d : new THREE.Vector3();
	this.c = (f !== undefined) ? f : new THREE.Vector3()
};
THREE.Triangle.normal = function() {
	var a = new THREE.Vector3();
	return function(g, e, j, h) {
		var d = h || new THREE.Vector3();
		d.subVectors(j, e);
		a.subVectors(g, e);
		d.cross(a);
		var f = d.lengthSq();
		if (f > 0) {
			return d.multiplyScalar(1 / Math.sqrt(f))
		}
		return d.set(0, 0, 0)
	}
}();
THREE.Triangle.barycoordFromPoint = function() {
	var a = new THREE.Vector3();
	var c = new THREE.Vector3();
	var b = new THREE.Vector3();
	return function(o, n, l, h, t) {
		a.subVectors(h, n);
		c.subVectors(l, n);
		b.subVectors(o, n);
		var m = a.dot(a);
		var k = a.dot(c);
		var j = a.dot(b);
		var f = c.dot(c);
		var d = c.dot(b);
		var g = (m * f - k * k);
		var r = t || new THREE.Vector3();
		if (g == 0) {
			return r.set(-2, -1, -1)
		}
		var e = 1 / g;
		var q = (f * j - k * d) * e;
		var p = (m * d - k * j) * e;
		return r.set(1 - q - p, p, q)
	}
}();
THREE.Triangle.containsPoint = function() {
	var a = new THREE.Vector3();
	return function(f, g, e, h) {
		var d = THREE.Triangle.barycoordFromPoint(f, g, e, h, a);
		return (d.x >= 0) && (d.y >= 0) && ((d.x + d.y) <= 1)
	}
}();
THREE.Triangle.prototype = {
	constructor: THREE.Triangle,
	set: function(e, d, f) {
		this.a.copy(e);
		this.b.copy(d);
		this.c.copy(f);
		return this
	},
	setFromPointsAndIndices: function(b, d, c, a) {
		this.a.copy(b[d]);
		this.b.copy(b[c]);
		this.c.copy(b[a]);
		return this
	},
	copy: function(a) {
		this.a.copy(a.a);
		this.b.copy(a.b);
		this.c.copy(a.c);
		return this
	},
	area: function() {
		var a = new THREE.Vector3();
		var b = new THREE.Vector3();
		return function() {
			a.subVectors(this.c, this.b);
			b.subVectors(this.a, this.b);
			return a.cross(b).length() * 0.5
		}
	}(),
	midpoint: function(b) {
		var a = b || new THREE.Vector3();
		return a.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
	},
	normal: function(a) {
		return THREE.Triangle.normal(this.a, this.b, this.c, a)
	},
	plane: function(b) {
		var a = b || new THREE.Plane();
		return a.setFromCoplanarPoints(this.a, this.b, this.c)
	},
	barycoordFromPoint: function(a, b) {
		return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b)
	},
	containsPoint: function(a) {
		return THREE.Triangle.containsPoint(a, this.a, this.b, this.c)
	},
	equals: function(a) {
		return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
	},
	clone: function() {
		return new THREE.Triangle().copy(this)
	}
};
THREE.Clock = function(a) {
	this.autoStart = (a !== undefined) ? a : true;
	this.startTime = 0;
	this.oldTime = 0;
	this.elapsedTime = 0;
	this.running = false
};
THREE.Clock.prototype = {
	constructor: THREE.Clock,
	start: function() {
		this.startTime = self.performance !== undefined && self.performance.now !== undefined ? self.performance.now() : Date.now();
		this.oldTime = this.startTime;
		this.running = true
	},
	stop: function() {
		this.getElapsedTime();
		this.running = false
	},
	getElapsedTime: function() {
		this.getDelta();
		return this.elapsedTime
	},
	getDelta: function() {
		var b = 0;
		if (this.autoStart && !this.running) {
			this.start()
		}
		if (this.running) {
			var a = self.performance !== undefined && self.performance.now !== undefined ? self.performance.now() : Date.now();
			b = 0.001 * (a - this.oldTime);
			this.oldTime = a;
			this.elapsedTime += b
		}
		return b
	}
};
THREE.EventDispatcher = function() {};
THREE.EventDispatcher.prototype = {
	constructor: THREE.EventDispatcher,
	apply: function(a) {
		a.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
		a.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
		a.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
		a.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent
	},
	addEventListener: function(b, c) {
		if (this._listeners === undefined) {
			this._listeners = {}
		}
		var a = this._listeners;
		if (a[b] === undefined) {
			a[b] = []
		}
		if (a[b].indexOf(c) === -1) {
			a[b].push(c)
		}
	},
	hasEventListener: function(b, c) {
		if (this._listeners === undefined) {
			return false
		}
		var a = this._listeners;
		if (a[b] !== undefined && a[b].indexOf(c) !== -1) {
			return true
		}
		return false
	},
	removeEventListener: function(d, e) {
		if (this._listeners === undefined) {
			return
		}
		var c = this._listeners;
		var a = c[d];
		if (a !== undefined) {
			var b = a.indexOf(e);
			if (b !== -1) {
				a.splice(b, 1)
			}
		}
	},
	dispatchEvent: function(e) {
		if (this._listeners === undefined) {
			return
		}
		var c = this._listeners;
		var a = c[e.type];
		if (a !== undefined) {
			e.target = this;
			var f = [];
			var d = a.length;
			for (var b = 0; b < d; b++) {
				f[b] = a[b]
			}
			for (var b = 0; b < d; b++) {
				f[b].call(this, e)
			}
		}
	}
};
(function(c) {
	c.Raycaster = function(e, g, f, d) {
		this.ray = new c.Ray(e, g);
		this.near = f || 0;
		this.far = d || Infinity;
		this.params = {
			Sprite: {},
			Mesh: {},
			PointCloud: {
				threshold: 1
			},
			LOD: {},
			Line: {}
		}
	};
	var b = function(e, d) {
		return e.distance - d.distance
	};
	var a = function(g, e, k, f) {
		g.raycast(e, k);
		if (f === true) {
			var j = g.children;
			for (var h = 0, d = j.length; h < d; h++) {
				a(j[h], e, k, true)
			}
		}
	};
	c.Raycaster.prototype = {
		constructor: c.Raycaster,
		precision: 0.0001,
		linePrecision: 1,
		set: function(d, e) {
			this.ray.set(d, e)
		},
		setFromCamera: function(e, d) {
			if (d instanceof c.PerspectiveCamera) {
				this.ray.origin.copy(d.position);
				this.ray.direction.set(e.x, e.y, 0.5).unproject(d).sub(d.position).normalize()
			} else {
				if (d instanceof c.OrthographicCamera) {
					this.ray.origin.set(e.x, e.y, -1).unproject(d);
					this.ray.direction.set(0, 0, -1).transformDirection(d.matrixWorld)
				} else {
					c.error("THREE.Raycaster: Unsupported camera type.")
				}
			}
		},
		intersectObject: function(e, d) {
			var f = [];
			a(e, this, f, d);
			f.sort(b);
			return f
		},
		intersectObjects: function(h, e) {
			var g = [];
			if (h instanceof Array === false) {
				c.warn("THREE.Raycaster.intersectObjects: objects is not an Array.");
				return g
			}
			for (var f = 0, d = h.length; f < d; f++) {
				a(h[f], this, g, e)
			}
			g.sort(b);
			return g
		}
	}
}(THREE));
THREE.Object3D = function() {
	Object.defineProperty(this, "id", {
		value: THREE.Object3DIdCount++
	});
	this.uuid = THREE.Math.generateUUID();
	this.name = "";
	this.type = "Object3D";
	this.parent = undefined;
	this.children = [];
	this.up = THREE.Object3D.DefaultUp.clone();
	var a = new THREE.Vector3();
	var c = new THREE.Euler();
	var e = new THREE.Quaternion();
	var f = new THREE.Vector3(1, 1, 1);
	var d = function() {
		e.setFromEuler(c, false)
	};
	var b = function() {
		c.setFromQuaternion(e, undefined, false)
	};
	c.onChange(d);
	e.onChange(b);
	Object.defineProperties(this, {
		position: {
			enumerable: true,
			value: a
		},
		rotation: {
			enumerable: true,
			value: c
		},
		quaternion: {
			enumerable: true,
			value: e
		},
		scale: {
			enumerable: true,
			value: f
		}
	});
	this.rotationAutoUpdate = true;
	this.matrix = new THREE.Matrix4();
	this.matrixWorld = new THREE.Matrix4();
	this.matrixAutoUpdate = true;
	this.matrixWorldNeedsUpdate = false;
	this.visible = true;
	this.castShadow = false;
	this.receiveShadow = false;
	this.frustumCulled = true;
	this.renderOrder = 0;
	this.userData = {}
};
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 1, 0);
THREE.Object3D.prototype = {
	constructor: THREE.Object3D,
	get eulerOrder() {
		THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order.");
		return this.rotation.order
	},
	set eulerOrder(a) {
		THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order.");
		this.rotation.order = a
	},
	get useQuaternion() {
		THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
	},
	set useQuaternion(a) {
		THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
	},
	applyMatrix: function(a) {
		this.matrix.multiplyMatrices(a, this.matrix);
		this.matrix.decompose(this.position, this.quaternion, this.scale)
	},
	setRotationFromAxisAngle: function(a, b) {
		this.quaternion.setFromAxisAngle(a, b)
	},
	setRotationFromEuler: function(a) {
		this.quaternion.setFromEuler(a, true)
	},
	setRotationFromMatrix: function(a) {
		this.quaternion.setFromRotationMatrix(a)
	},
	setRotationFromQuaternion: function(a) {
		this.quaternion.copy(a)
	},
	rotateOnAxis: function() {
		var a = new THREE.Quaternion();
		return function(b, c) {
			a.setFromAxisAngle(b, c);
			this.quaternion.multiply(a);
			return this
		}
	}(),
	rotateX: function() {
		var a = new THREE.Vector3(1, 0, 0);
		return function(b) {
			return this.rotateOnAxis(a, b)
		}
	}(),
	rotateY: function() {
		var a = new THREE.Vector3(0, 1, 0);
		return function(b) {
			return this.rotateOnAxis(a, b)
		}
	}(),
	rotateZ: function() {
		var a = new THREE.Vector3(0, 0, 1);
		return function(b) {
			return this.rotateOnAxis(a, b)
		}
	}(),
	translateOnAxis: function() {
		var a = new THREE.Vector3();
		return function(b, c) {
			a.copy(b).applyQuaternion(this.quaternion);
			this.position.add(a.multiplyScalar(c));
			return this
		}
	}(),
	translate: function(b, a) {
		THREE.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");
		return this.translateOnAxis(a, b)
	},
	translateX: function() {
		var a = new THREE.Vector3(1, 0, 0);
		return function(b) {
			return this.translateOnAxis(a, b)
		}
	}(),
	translateY: function() {
		var a = new THREE.Vector3(0, 1, 0);
		return function(b) {
			return this.translateOnAxis(a, b)
		}
	}(),
	translateZ: function() {
		var a = new THREE.Vector3(0, 0, 1);
		return function(b) {
			return this.translateOnAxis(a, b)
		}
	}(),
	localToWorld: function(a) {
		return a.applyMatrix4(this.matrixWorld)
	},
	worldToLocal: function() {
		var a = new THREE.Matrix4();
		return function(b) {
			return b.applyMatrix4(a.getInverse(this.matrixWorld))
		}
	}(),
	lookAt: function() {
		var a = new THREE.Matrix4();
		return function(b) {
			a.lookAt(b, this.position, this.up);
			this.quaternion.setFromRotationMatrix(a)
		}
	}(),
	add: function(a) {
		if (arguments.length > 1) {
			for (var b = 0; b < arguments.length; b++) {
				this.add(arguments[b])
			}
			return this
		}
		if (a === this) {
			THREE.error("THREE.Object3D.add: object can't be added as a child of itself.", a);
			return this
		}
		if (a instanceof THREE.Object3D) {
			if (a.parent !== undefined) {
				a.parent.remove(a)
			}
			a.parent = this;
			a.dispatchEvent({
				type: "added"
			});
			this.children.push(a)
		} else {
			THREE.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", a)
		}
		return this
	},
	remove: function(b) {
		if (arguments.length > 1) {
			for (var c = 0; c < arguments.length; c++) {
				this.remove(arguments[c])
			}
		}
		var a = this.children.indexOf(b);
		if (a !== -1) {
			b.parent = undefined;
			b.dispatchEvent({
				type: "removed"
			});
			this.children.splice(a, 1)
		}
	},
	getChildByName: function(a) {
		THREE.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");
		return this.getObjectByName(a)
	},
	getObjectById: function(a) {
		return this.getObjectByProperty("id", a)
	},
	getObjectByName: function(a) {
		return this.getObjectByProperty("name", a)
	},
	getObjectByProperty: function(c, e) {
		if (this[c] === e) {
			return this
		}
		for (var d = 0, a = this.children.length; d < a; d++) {
			var f = this.children[d];
			var b = f.getObjectByProperty(c, e);
			if (b !== undefined) {
				return b
			}
		}
		return undefined
	},
	getWorldPosition: function(b) {
		var a = b || new THREE.Vector3();
		this.updateMatrixWorld(true);
		return a.setFromMatrixPosition(this.matrixWorld)
	},
	getWorldQuaternion: function() {
		var a = new THREE.Vector3();
		var b = new THREE.Vector3();
		return function(d) {
			var c = d || new THREE.Quaternion();
			this.updateMatrixWorld(true);
			this.matrixWorld.decompose(a, c, b);
			return c
		}
	}(),
	getWorldRotation: function() {
		var a = new THREE.Quaternion();
		return function(c) {
			var b = c || new THREE.Euler();
			this.getWorldQuaternion(a);
			return b.setFromQuaternion(a, this.rotation.order, false)
		}
	}(),
	getWorldScale: function() {
		var a = new THREE.Vector3();
		var b = new THREE.Quaternion();
		return function(d) {
			var c = d || new THREE.Vector3();
			this.updateMatrixWorld(true);
			this.matrixWorld.decompose(a, b, c);
			return c
		}
	}(),
	getWorldDirection: function() {
		var a = new THREE.Quaternion();
		return function(c) {
			var b = c || new THREE.Vector3();
			this.getWorldQuaternion(a);
			return b.set(0, 0, 1).applyQuaternion(a)
		}
	}(),
	raycast: function() {},
	traverse: function(c) {
		c(this);
		for (var b = 0, a = this.children.length; b < a; b++) {
			this.children[b].traverse(c)
		}
	},
	traverseVisible: function(c) {
		if (this.visible === false) {
			return
		}
		c(this);
		for (var b = 0, a = this.children.length; b < a; b++) {
			this.children[b].traverseVisible(c)
		}
	},
	traverseAncestors: function(a) {
		if (this.parent) {
			a(this.parent);
			this.parent.traverseAncestors(a)
		}
	},
	updateMatrix: function() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		this.matrixWorldNeedsUpdate = true
	},
	updateMatrixWorld: function(c) {
		if (this.matrixAutoUpdate === true) {
			this.updateMatrix()
		}
		if (this.matrixWorldNeedsUpdate === true || c === true) {
			if (this.parent === undefined) {
				this.matrixWorld.copy(this.matrix)
			} else {
				this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)
			}
			this.matrixWorldNeedsUpdate = false;
			c = true
		}
		for (var b = 0, a = this.children.length; b < a; b++) {
			this.children[b].updateMatrixWorld(c)
		}
	},
	toJSON: function() {
		var d = {
			metadata: {
				version: 4.3,
				type: "Object",
				generator: "ObjectExporter"
			}
		};
		var e = {};
		var f = function(h) {
			if (d.geometries === undefined) {
				d.geometries = []
			}
			if (e[h.uuid] === undefined) {
				var g = h.toJSON();
				delete g.metadata;
				e[h.uuid] = g;
				d.geometries.push(g)
			}
			return h.uuid
		};
		var c = {};
		var a = function(h) {
			if (d.materials === undefined) {
				d.materials = []
			}
			if (c[h.uuid] === undefined) {
				var g = h.toJSON();
				delete g.metadata;
				c[h.uuid] = g;
				d.materials.push(g)
			}
			return h.uuid
		};
		var b = function(g) {
			var j = {};
			j.uuid = g.uuid;
			j.type = g.type;
			if (g.name !== "") {
				j.name = g.name
			}
			if (JSON.stringify(g.userData) !== "{}") {
				j.userData = g.userData
			}
			if (g.visible !== true) {
				j.visible = g.visible
			}
			if (g instanceof THREE.PerspectiveCamera) {
				j.fov = g.fov;
				j.aspect = g.aspect;
				j.near = g.near;
				j.far = g.far
			} else {
				if (g instanceof THREE.OrthographicCamera) {
					j.left = g.left;
					j.right = g.right;
					j.top = g.top;
					j.bottom = g.bottom;
					j.near = g.near;
					j.far = g.far
				} else {
					if (g instanceof THREE.AmbientLight) {
						j.color = g.color.getHex()
					} else {
						if (g instanceof THREE.DirectionalLight) {
							j.color = g.color.getHex();
							j.intensity = g.intensity
						} else {
							if (g instanceof THREE.PointLight) {
								j.color = g.color.getHex();
								j.intensity = g.intensity;
								j.distance = g.distance;
								j.decay = g.decay
							} else {
								if (g instanceof THREE.SpotLight) {
									j.color = g.color.getHex();
									j.intensity = g.intensity;
									j.distance = g.distance;
									j.angle = g.angle;
									j.exponent = g.exponent;
									j.decay = g.decay
								} else {
									if (g instanceof THREE.HemisphereLight) {
										j.color = g.color.getHex();
										j.groundColor = g.groundColor.getHex()
									} else {
										if (g instanceof THREE.Mesh || g instanceof THREE.Line || g instanceof THREE.PointCloud) {
											j.geometry = f(g.geometry);
											j.material = a(g.material);
											if (g instanceof THREE.Line) {
												j.mode = g.mode
											}
										} else {
											if (g instanceof THREE.Sprite) {
												j.material = a(g.material)
											}
										}
									}
								}
							}
						}
					}
				}
			}
			j.matrix = g.matrix.toArray();
			if (g.children.length > 0) {
				j.children = [];
				for (var h = 0; h < g.children.length; h++) {
					j.children.push(b(g.children[h]))
				}
			}
			return j
		};
		d.object = b(this);
		return d
	},
	clone: function(b, a) {
		if (b === undefined) {
			b = new THREE.Object3D()
		}
		if (a === undefined) {
			a = true
		}
		b.name = this.name;
		b.up.copy(this.up);
		b.position.copy(this.position);
		b.quaternion.copy(this.quaternion);
		b.scale.copy(this.scale);
		b.rotationAutoUpdate = this.rotationAutoUpdate;
		b.matrix.copy(this.matrix);
		b.matrixWorld.copy(this.matrixWorld);
		b.matrixAutoUpdate = this.matrixAutoUpdate;
		b.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
		b.visible = this.visible;
		b.castShadow = this.castShadow;
		b.receiveShadow = this.receiveShadow;
		b.frustumCulled = this.frustumCulled;
		b.userData = JSON.parse(JSON.stringify(this.userData));
		if (a === true) {
			for (var c = 0; c < this.children.length; c++) {
				var d = this.children[c];
				b.add(d.clone())
			}
		}
		return b
	}
};
THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype);
THREE.Object3DIdCount = 0;
THREE.Face3 = function(f, e, j, h, g, d) {
	this.a = f;
	this.b = e;
	this.c = j;
	this.normal = h instanceof THREE.Vector3 ? h : new THREE.Vector3();
	this.vertexNormals = h instanceof Array ? h : [];
	this.color = g instanceof THREE.Color ? g : new THREE.Color();
	this.vertexColors = g instanceof Array ? g : [];
	this.vertexTangents = [];
	this.materialIndex = d !== undefined ? d : 0
};
THREE.Face3.prototype = {
	constructor: THREE.Face3,
	clone: function() {
		var c = new THREE.Face3(this.a, this.b, this.c);
		c.normal.copy(this.normal);
		c.color.copy(this.color);
		c.materialIndex = this.materialIndex;
		for (var b = 0, a = this.vertexNormals.length; b < a; b++) {
			c.vertexNormals[b] = this.vertexNormals[b].clone()
		}
		for (var b = 0, a = this.vertexColors.length; b < a; b++) {
			c.vertexColors[b] = this.vertexColors[b].clone()
		}
		for (var b = 0, a = this.vertexTangents.length; b < a; b++) {
			c.vertexTangents[b] = this.vertexTangents[b].clone()
		}
		return c
	}
};
THREE.Face4 = function(g, f, l, k, j, h, e) {
	THREE.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");
	return new THREE.Face3(g, f, l, j, h, e)
};
THREE.BufferAttribute = function(b, a) {
	this.array = b;
	this.itemSize = a;
	this.needsUpdate = false
};
THREE.BufferAttribute.prototype = {
	constructor: THREE.BufferAttribute,
	get length() {
		return this.array.length
	},
	copyAt: function(e, c, d) {
		e *= this.itemSize;
		d *= c.itemSize;
		for (var b = 0, a = this.itemSize; b < a; b++) {
			this.array[e + b] = c.array[d + b]
		}
		return this
	},
	set: function(a, b) {
		if (b === undefined) {
			b = 0
		}
		this.array.set(a, b);
		return this
	},
	setX: function(b, a) {
		this.array[b * this.itemSize] = a;
		return this
	},
	setY: function(a, b) {
		this.array[a * this.itemSize + 1] = b;
		return this
	},
	setZ: function(a, b) {
		this.array[a * this.itemSize + 2] = b;
		return this
	},
	setXY: function(b, a, c) {
		b *= this.itemSize;
		this.array[b] = a;
		this.array[b + 1] = c;
		return this
	},
	setXYZ: function(b, a, d, c) {
		b *= this.itemSize;
		this.array[b] = a;
		this.array[b + 1] = d;
		this.array[b + 2] = c;
		return this
	},
	setXYZW: function(c, a, e, d, b) {
		c *= this.itemSize;
		this.array[c] = a;
		this.array[c + 1] = e;
		this.array[c + 2] = d;
		this.array[c + 3] = b;
		return this
	},
	clone: function() {
		return new THREE.BufferAttribute(new this.array.constructor(this.array), this.itemSize)
	}
};
THREE.Int8Attribute = function(a, b) {
	THREE.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Uint8Attribute = function(a, b) {
	THREE.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Uint8ClampedAttribute = function(a, b) {
	THREE.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Int16Attribute = function(a, b) {
	THREE.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Uint16Attribute = function(a, b) {
	THREE.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Int32Attribute = function(a, b) {
	THREE.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Uint32Attribute = function(a, b) {
	THREE.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Float32Attribute = function(a, b) {
	THREE.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.Float64Attribute = function(a, b) {
	THREE.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.");
	return new THREE.BufferAttribute(a, b)
};
THREE.DynamicBufferAttribute = function(b, a) {
	THREE.BufferAttribute.call(this, b, a);
	this.updateRange = {
		offset: 0,
		count: -1
	}
};
THREE.DynamicBufferAttribute.prototype = Object.create(THREE.BufferAttribute.prototype);
THREE.DynamicBufferAttribute.prototype.constructor = THREE.DynamicBufferAttribute;
THREE.DynamicBufferAttribute.prototype.clone = function() {
	return new THREE.DynamicBufferAttribute(new this.array.constructor(this.array), this.itemSize)
};
THREE.BufferGeometry = function() {
	Object.defineProperty(this, "id", {
		value: THREE.GeometryIdCount++
	});
	this.uuid = THREE.Math.generateUUID();
	this.name = "";
	this.type = "BufferGeometry";
	this.attributes = {};
	this.attributesKeys = [];
	this.drawcalls = [];
	this.offsets = this.drawcalls;
	this.boundingBox = null;
	this.boundingSphere = null
};
THREE.BufferGeometry.prototype = {
	constructor: THREE.BufferGeometry,
	addAttribute: function(a, b) {
		if (b instanceof THREE.BufferAttribute === false) {
			THREE.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).");
			this.attributes[a] = {
				array: arguments[1],
				itemSize: arguments[2]
			};
			return
		}
		this.attributes[a] = b;
		this.attributesKeys = Object.keys(this.attributes)
	},
	getAttribute: function(a) {
		return this.attributes[a]
	},
	addDrawCall: function(c, a, b) {
		this.drawcalls.push({
			start: c,
			count: a,
			index: b !== undefined ? b : 0
		})
	},
	applyMatrix: function(b) {
		var a = this.attributes.position;
		if (a !== undefined) {
			b.applyToVector3Array(a.array);
			a.needsUpdate = true
		}
		var c = this.attributes.normal;
		if (c !== undefined) {
			var d = new THREE.Matrix3().getNormalMatrix(b);
			d.applyToVector3Array(c.array);
			c.needsUpdate = true
		}
		if (this.boundingBox !== null) {
			this.computeBoundingBox()
		}
		if (this.boundingSphere !== null) {
			this.computeBoundingSphere()
		}
	},
	center: function() {
		this.computeBoundingBox();
		var a = this.boundingBox.center().negate();
		this.applyMatrix(new THREE.Matrix4().setPosition(a));
		return a
	},
	fromGeometry: function(f, G) {
		G = G || {
			vertexColors: THREE.NoColors
		};
		var g = f.vertices;
		var e = f.faces;
		var F = f.faceVertexUvs;
		var t = G.vertexColors;
		var d = F[0].length > 0;
		var N = e[0].vertexNormals.length == 3;
		var k = new Float32Array(e.length * 3 * 3);
		this.addAttribute("position", new THREE.BufferAttribute(k, 3));
		var q = new Float32Array(e.length * 3 * 3);
		this.addAttribute("normal", new THREE.BufferAttribute(q, 3));
		if (t !== THREE.NoColors) {
			var o = new Float32Array(e.length * 3 * 3);
			this.addAttribute("color", new THREE.BufferAttribute(o, 3))
		}
		if (d === true) {
			var p = new Float32Array(e.length * 3 * 2);
			this.addAttribute("uv", new THREE.BufferAttribute(p, 2))
		}
		for (var B = 0, A = 0, v = 0; B < e.length; B++, A += 6, v += 9) {
			var m = e[B];
			var M = g[m.a];
			var L = g[m.b];
			var J = g[m.c];
			k[v] = M.x;
			k[v + 1] = M.y;
			k[v + 2] = M.z;
			k[v + 3] = L.x;
			k[v + 4] = L.y;
			k[v + 5] = L.z;
			k[v + 6] = J.x;
			k[v + 7] = J.y;
			k[v + 8] = J.z;
			if (N === true) {
				var l = m.vertexNormals[0];
				var j = m.vertexNormals[1];
				var h = m.vertexNormals[2];
				q[v] = l.x;
				q[v + 1] = l.y;
				q[v + 2] = l.z;
				q[v + 3] = j.x;
				q[v + 4] = j.y;
				q[v + 5] = j.z;
				q[v + 6] = h.x;
				q[v + 7] = h.y;
				q[v + 8] = h.z
			} else {
				var u = m.normal;
				q[v] = u.x;
				q[v + 1] = u.y;
				q[v + 2] = u.z;
				q[v + 3] = u.x;
				q[v + 4] = u.y;
				q[v + 5] = u.z;
				q[v + 6] = u.x;
				q[v + 7] = u.y;
				q[v + 8] = u.z
			}
			if (t === THREE.FaceColors) {
				var r = m.color;
				o[v] = r.r;
				o[v + 1] = r.g;
				o[v + 2] = r.b;
				o[v + 3] = r.r;
				o[v + 4] = r.g;
				o[v + 5] = r.b;
				o[v + 6] = r.r;
				o[v + 7] = r.g;
				o[v + 8] = r.b
			} else {
				if (t === THREE.VertexColors) {
					var K = m.vertexColors[0];
					var I = m.vertexColors[1];
					var H = m.vertexColors[2];
					o[v] = K.r;
					o[v + 1] = K.g;
					o[v + 2] = K.b;
					o[v + 3] = I.r;
					o[v + 4] = I.g;
					o[v + 5] = I.b;
					o[v + 6] = H.r;
					o[v + 7] = H.g;
					o[v + 8] = H.b
				}
			}
			if (d === true) {
				var E = F[0][B][0];
				var D = F[0][B][1];
				var C = F[0][B][2];
				p[A] = E.x;
				p[A + 1] = E.y;
				p[A + 2] = D.x;
				p[A + 3] = D.y;
				p[A + 4] = C.x;
				p[A + 5] = C.y
			}
		}
		this.computeBoundingSphere();
		return this
	},
	computeBoundingBox: function() {
		var a = new THREE.Vector3();
		return function() {
			if (this.boundingBox === null) {
				this.boundingBox = new THREE.Box3()
			}
			var b = this.attributes.position.array;
			if (b) {
				var e = this.boundingBox;
				e.makeEmpty();
				for (var d = 0, c = b.length; d < c; d += 3) {
					a.set(b[d], b[d + 1], b[d + 2]);
					e.expandByPoint(a)
				}
			}
			if (b === undefined || b.length === 0) {
				this.boundingBox.min.set(0, 0, 0);
				this.boundingBox.max.set(0, 0, 0)
			}
			if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
				THREE.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
			}
		}
	}(),
	computeBoundingSphere: function() {
		var b = new THREE.Box3();
		var a = new THREE.Vector3();
		return function() {
			if (this.boundingSphere === null) {
				this.boundingSphere = new THREE.Sphere()
			}
			var e = this.attributes.position.array;
			if (e) {
				b.makeEmpty();
				var c = this.boundingSphere.center;
				for (var g = 0, f = e.length; g < f; g += 3) {
					a.set(e[g], e[g + 1], e[g + 2]);
					b.expandByPoint(a)
				}
				b.center(c);
				var d = 0;
				for (var g = 0, f = e.length; g < f; g += 3) {
					a.set(e[g], e[g + 1], e[g + 2]);
					d = Math.max(d, c.distanceToSquared(a))
				}
				this.boundingSphere.radius = Math.sqrt(d);
				if (isNaN(this.boundingSphere.radius)) {
					THREE.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
				}
			}
		}
	}(),
	computeFaceNormals: function() {},
	computeVertexNormals: function() {
		var g = this.attributes;
		if (g.position) {
			var f = g.position.array;
			if (g.normal === undefined) {
				this.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(f.length), 3))
			} else {
				var k = g.normal.array;
				for (var r = 0, h = k.length; r < h; r++) {
					k[r] = 0
				}
			}
			var k = g.normal.array;
			var v, t, q, p = new THREE.Vector3(),
				n = new THREE.Vector3(),
				m = new THREE.Vector3(),
				l = new THREE.Vector3(),
				A = new THREE.Vector3();
			if (g.index) {
				var b = g.index.array;
				var c = (this.offsets.length > 0 ? this.offsets : [{
					start: 0,
					count: b.length,
					index: 0
				}]);
				for (var o = 0, u = c.length; o < u; ++o) {
					var a = c[o].start;
					var e = c[o].count;
					var d = c[o].index;
					for (var r = a, h = a + e; r < h; r += 3) {
						v = (d + b[r]) * 3;
						t = (d + b[r + 1]) * 3;
						q = (d + b[r + 2]) * 3;
						p.fromArray(f, v);
						n.fromArray(f, t);
						m.fromArray(f, q);
						l.subVectors(m, n);
						A.subVectors(p, n);
						l.cross(A);
						k[v] += l.x;
						k[v + 1] += l.y;
						k[v + 2] += l.z;
						k[t] += l.x;
						k[t + 1] += l.y;
						k[t + 2] += l.z;
						k[q] += l.x;
						k[q + 1] += l.y;
						k[q + 2] += l.z
					}
				}
			} else {
				for (var r = 0, h = f.length; r < h; r += 9) {
					p.fromArray(f, r);
					n.fromArray(f, r + 3);
					m.fromArray(f, r + 6);
					l.subVectors(m, n);
					A.subVectors(p, n);
					l.cross(A);
					k[r] = l.x;
					k[r + 1] = l.y;
					k[r + 2] = l.z;
					k[r + 3] = l.x;
					k[r + 4] = l.y;
					k[r + 5] = l.z;
					k[r + 6] = l.x;
					k[r + 7] = l.y;
					k[r + 8] = l.z
				}
			}
			this.normalizeNormals();
			g.normal.needsUpdate = true
		}
	},
	computeTangents: function() {
		if (this.attributes.index === undefined || this.attributes.position === undefined || this.attributes.normal === undefined || this.attributes.uv === undefined) {
			THREE.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
			return
		}
		var d = this.attributes.index.array;
		var o = this.attributes.position.array;
		var v = this.attributes.normal.array;
		var M = this.attributes.uv.array;
		var u = o.length / 3;
		if (this.attributes.tangent === undefined) {
			this.addAttribute("tangent", new THREE.BufferAttribute(new Float32Array(4 * u), 4))
		}
		var C = this.attributes.tangent.array;
		var ae = [],
			ad = [];
		for (var W = 0; W < u; W++) {
			ae[W] = new THREE.Vector3();
			ad[W] = new THREE.Vector3()
		}
		var T = new THREE.Vector3(),
			Q = new THREE.Vector3(),
			P = new THREE.Vector3(),
			l = new THREE.Vector2(),
			h = new THREE.Vector2(),
			g = new THREE.Vector2(),
			q, p, ag, af, K, J, ab, aa, I, H, R;
		var e = new THREE.Vector3(),
			E = new THREE.Vector3();

		function L(k, j, n) {
			T.fromArray(o, k * 3);
			Q.fromArray(o, j * 3);
			P.fromArray(o, n * 3);
			l.fromArray(M, k * 2);
			h.fromArray(M, j * 2);
			g.fromArray(M, n * 2);
			q = Q.x - T.x;
			p = P.x - T.x;
			ag = Q.y - T.y;
			af = P.y - T.y;
			K = Q.z - T.z;
			J = P.z - T.z;
			ab = h.x - l.x;
			aa = g.x - l.x;
			I = h.y - l.y;
			H = g.y - l.y;
			R = 1 / (ab * H - aa * I);
			e.set((H * q - I * p) * R, (H * ag - I * af) * R, (H * K - I * J) * R);
			E.set((ab * p - aa * q) * R, (ab * af - aa * ag) * R, (ab * J - aa * K) * R);
			ae[k].add(e);
			ae[j].add(e);
			ae[n].add(e);
			ad[k].add(E);
			ad[j].add(E);
			ad[n].add(E)
		}
		var Y, F;
		var X, m;
		var c, b, a;
		if (this.drawcalls.length === 0) {
			this.addDrawCall(0, d.length, 0)
		}
		var ac = this.drawcalls;
		for (X = 0, m = ac.length; X < m; ++X) {
			var B = ac[X].start;
			var S = ac[X].count;
			var G = ac[X].index;
			for (Y = B, F = B + S; Y < F; Y += 3) {
				c = G + d[Y];
				b = G + d[Y + 1];
				a = G + d[Y + 2];
				L(c, b, a)
			}
		}
		var U = new THREE.Vector3(),
			Z = new THREE.Vector3();
		var V = new THREE.Vector3(),
			D = new THREE.Vector3();
		var N, O, f;

		function A(j) {
			V.fromArray(v, j * 3);
			D.copy(V);
			O = ae[j];
			U.copy(O);
			U.sub(V.multiplyScalar(V.dot(O))).normalize();
			Z.crossVectors(D, O);
			f = Z.dot(ad[j]);
			N = (f < 0) ? -1 : 1;
			C[j * 4] = U.x;
			C[j * 4 + 1] = U.y;
			C[j * 4 + 2] = U.z;
			C[j * 4 + 3] = N
		}
		for (X = 0, m = ac.length; X < m; ++X) {
			var B = ac[X].start;
			var S = ac[X].count;
			var G = ac[X].index;
			for (Y = B, F = B + S; Y < F; Y += 3) {
				c = G + d[Y];
				b = G + d[Y + 1];
				a = G + d[Y + 2];
				A(c);
				A(b);
				A(a)
			}
		}
	},
	computeOffsets: function(o) {
		if (o === undefined) {
			o = 65535
		}
		var f = this.attributes.index.array;
		var k = this.attributes.position.array;
		var n = (f.length / 3);
		var p = new Uint16Array(f.length);
		var a = 0;
		var c = 0;
		var h = [{
			start: 0,
			count: 0,
			index: 0
		}];
		var g = h[0];
		var b = 0;
		var e = 0;
		var r = new Int32Array(6);
		var D = new Int32Array(k.length);
		var C = new Int32Array(k.length);
		for (var t = 0; t < k.length; t++) {
			D[t] = -1;
			C[t] = -1
		}
		for (var u = 0; u < n; u++) {
			e = 0;
			for (var A = 0; A < 3; A++) {
				var B = f[u * 3 + A];
				if (D[B] == -1) {
					r[A * 2] = B;
					r[A * 2 + 1] = -1;
					e++
				} else {
					if (D[B] < g.index) {
						r[A * 2] = B;
						r[A * 2 + 1] = -1;
						b++
					} else {
						r[A * 2] = B;
						r[A * 2 + 1] = D[B]
					}
				}
			}
			var l = c + e;
			if (l > (g.index + o)) {
				var q = {
					start: a,
					count: 0,
					index: c
				};
				h.push(q);
				g = q;
				for (var m = 0; m < 6; m += 2) {
					var d = r[m + 1];
					if (d > -1 && d < g.index) {
						r[m + 1] = -1
					}
				}
			}
			for (var m = 0; m < 6; m += 2) {
				var B = r[m];
				var d = r[m + 1];
				if (d === -1) {
					d = c++
				}
				D[B] = d;
				C[d] = B;
				p[a++] = d - g.index;
				g.count++
			}
		}
		this.reorderBuffers(p, C, c);
		this.offsets = h;
		this.drawcalls = h;
		return h
	},
	merge: function(l, f) {
		if (l instanceof THREE.BufferGeometry === false) {
			THREE.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", l);
			return
		}
		if (f === undefined) {
			f = 0
		}
		var g = this.attributes;
		for (var m in g) {
			if (l.attributes[m] === undefined) {
				continue
			}
			var d = g[m];
			var b = d.array;
			var c = l.attributes[m];
			var a = c.array;
			var k = c.itemSize;
			for (var h = 0, e = k * f; h < a.length; h++, e++) {
				b[e] = a[h]
			}
		}
		return this
	},
	normalizeNormals: function() {
		var d = this.attributes.normal.array;
		var a, g, e, f;
		for (var c = 0, b = d.length; c < b; c += 3) {
			a = d[c];
			g = d[c + 1];
			e = d[c + 2];
			f = 1 / Math.sqrt(a * a + g * g + e * e);
			d[c] *= f;
			d[c + 1] *= f;
			d[c + 2] *= f
		}
	},
	reorderBuffers: function(f, l, a) {
		var e = {};
		for (var j in this.attributes) {
			if (j == "index") {
				continue
			}
			var h = this.attributes[j].array;
			e[j] = new h.constructor(this.attributes[j].itemSize * a)
		}
		for (var b = 0; b < a; b++) {
			var m = l[b];
			for (var j in this.attributes) {
				if (j == "index") {
					continue
				}
				var c = this.attributes[j].array;
				var g = this.attributes[j].itemSize;
				var n = e[j];
				for (var d = 0; d < g; d++) {
					n[b * g + d] = c[m * g + d]
				}
			}
		}
		this.attributes.index.array = f;
		for (var j in this.attributes) {
			if (j == "index") {
				continue
			}
			this.attributes[j].array = e[j];
			this.attributes[j].numItems = this.attributes[j].itemSize * a
		}
	},
	toJSON: function() {
		var b = {
			metadata: {
				version: 4,
				type: "BufferGeometry",
				generator: "BufferGeometryExporter"
			},
			uuid: this.uuid,
			type: this.type,
			data: {
				attributes: {}
			}
		};
		var a = this.attributes;
		var f = this.offsets;
		var d = this.boundingSphere;
		for (var c in a) {
			var e = a[c];
			var g = Array.prototype.slice.call(e.array);
			b.data.attributes[c] = {
				itemSize: e.itemSize,
				type: e.array.constructor.name,
				array: g
			}
		}
		if (f.length > 0) {
			b.data.offsets = JSON.parse(JSON.stringify(f))
		}
		if (d !== null) {
			b.data.boundingSphere = {
				center: d.center.toArray(),
				radius: d.radius
			}
		}
		return b
	},
	clone: function() {
		var e = new THREE.BufferGeometry();
		for (var a in this.attributes) {
			var f = this.attributes[a];
			e.addAttribute(a, f.clone())
		}
		for (var c = 0, b = this.offsets.length; c < b; c++) {
			var d = this.offsets[c];
			e.offsets.push({
				start: d.start,
				index: d.index,
				count: d.count
			})
		}
		return e
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);
THREE.Geometry = function() {
	Object.defineProperty(this, "id", {
		value: THREE.GeometryIdCount++
	});
	this.uuid = THREE.Math.generateUUID();
	this.name = "";
	this.type = "Geometry";
	this.vertices = [];
	this.colors = [];
	this.faces = [];
	this.faceVertexUvs = [
		[]
	];
	this.morphTargets = [];
	this.morphColors = [];
	this.morphNormals = [];
	this.skinWeights = [];
	this.skinIndices = [];
	this.lineDistances = [];
	this.boundingBox = null;
	this.boundingSphere = null;
	this.hasTangents = false;
	this.dynamic = true;
	this.verticesNeedUpdate = false;
	this.elementsNeedUpdate = false;
	this.uvsNeedUpdate = false;
	this.normalsNeedUpdate = false;
	this.tangentsNeedUpdate = false;
	this.colorsNeedUpdate = false;
	this.lineDistancesNeedUpdate = false;
	this.groupsNeedUpdate = false
};
THREE.Geometry.prototype = {
	constructor: THREE.Geometry,
	applyMatrix: function(b) {
		var h = new THREE.Matrix3().getNormalMatrix(b);
		for (var e = 0, a = this.vertices.length; e < a; e++) {
			var g = this.vertices[e];
			g.applyMatrix4(b)
		}
		for (var e = 0, a = this.faces.length; e < a; e++) {
			var f = this.faces[e];
			f.normal.applyMatrix3(h).normalize();
			for (var c = 0, d = f.vertexNormals.length; c < d; c++) {
				f.vertexNormals[c].applyMatrix3(h).normalize()
			}
		}
		if (this.boundingBox !== null) {
			this.computeBoundingBox()
		}
		if (this.boundingSphere !== null) {
			this.computeBoundingSphere()
		}
		this.verticesNeedUpdate = true;
		this.normalsNeedUpdate = true
	},
	fromBufferGeometry: function(d) {
		var b = this;
		var l = d.attributes;
		var f = l.position.array;
		var e = l.index !== undefined ? l.index.array : undefined;
		var p = l.normal !== undefined ? l.normal.array : undefined;
		var m = l.color !== undefined ? l.color.array : undefined;
		var n = l.uv !== undefined ? l.uv.array : undefined;
		var a = [];
		var q = [];
		for (var u = 0, t = 0; u < f.length; u += 3, t += 2) {
			b.vertices.push(new THREE.Vector3(f[u], f[u + 1], f[u + 2]));
			if (p !== undefined) {
				a.push(new THREE.Vector3(p[u], p[u + 1], p[u + 2]))
			}
			if (m !== undefined) {
				b.colors.push(new THREE.Color(m[u], m[u + 1], m[u + 2]))
			}
			if (n !== undefined) {
				q.push(new THREE.Vector2(n[t], n[t + 1]))
			}
		}
		var g = function(A, j, D) {
			var B = p !== undefined ? [a[A].clone(), a[j].clone(), a[D].clone()] : [];
			var C = m !== undefined ? [b.colors[A].clone(), b.colors[j].clone(), b.colors[D].clone()] : [];
			b.faces.push(new THREE.Face3(A, j, D, B, C));
			if (n !== undefined) {
				b.faceVertexUvs[0].push([q[A].clone(), q[j].clone(), q[D].clone()])
			}
		};
		if (e !== undefined) {
			var o = d.drawcalls;
			if (o.length > 0) {
				for (var u = 0; u < o.length; u++) {
					var r = o[u];
					var c = r.start;
					var k = r.count;
					var h = r.index;
					for (var t = c, v = c + k; t < v; t += 3) {
						g(h + e[t], h + e[t + 1], h + e[t + 2])
					}
				}
			} else {
				for (var u = 0; u < e.length; u += 3) {
					g(e[u], e[u + 1], e[u + 2])
				}
			}
		} else {
			for (var u = 0; u < f.length / 3; u += 3) {
				g(u, u + 1, u + 2)
			}
		}
		this.computeFaceNormals();
		if (d.boundingBox !== null) {
			this.boundingBox = d.boundingBox.clone()
		}
		if (d.boundingSphere !== null) {
			this.boundingSphere = d.boundingSphere.clone()
		}
		return this
	},
	center: function() {
		this.computeBoundingBox();
		var a = this.boundingBox.center().negate();
		this.applyMatrix(new THREE.Matrix4().setPosition(a));
		return a
	},
	computeFaceNormals: function() {
		var a = new THREE.Vector3(),
			j = new THREE.Vector3();
		for (var h = 0, g = this.faces.length; h < g; h++) {
			var e = this.faces[h];
			var d = this.vertices[e.a];
			var c = this.vertices[e.b];
			var b = this.vertices[e.c];
			a.subVectors(b, c);
			j.subVectors(d, c);
			a.cross(j);
			a.normalize();
			e.normal.copy(a)
		}
	},
	computeVertexNormals: function(g) {
		var m, d, h, l, k, j;
		j = new Array(this.vertices.length);
		for (m = 0, d = this.vertices.length; m < d; m++) {
			j[m] = new THREE.Vector3()
		}
		if (g) {
			var c, b, a;
			var e = new THREE.Vector3(),
				n = new THREE.Vector3();
			for (h = 0, l = this.faces.length; h < l; h++) {
				k = this.faces[h];
				c = this.vertices[k.a];
				b = this.vertices[k.b];
				a = this.vertices[k.c];
				e.subVectors(a, b);
				n.subVectors(c, b);
				e.cross(n);
				j[k.a].add(e);
				j[k.b].add(e);
				j[k.c].add(e)
			}
		} else {
			for (h = 0, l = this.faces.length; h < l; h++) {
				k = this.faces[h];
				j[k.a].add(k.normal);
				j[k.b].add(k.normal);
				j[k.c].add(k.normal)
			}
		}
		for (m = 0, d = this.vertices.length; m < d; m++) {
			j[m].normalize()
		}
		for (h = 0, l = this.faces.length; h < l; h++) {
			k = this.faces[h];
			k.vertexNormals[0] = j[k.a].clone();
			k.vertexNormals[1] = j[k.b].clone();
			k.vertexNormals[2] = j[k.c].clone()
		}
	},
	computeMorphNormals: function() {
		var e, l, g, m, h;
		for (g = 0, m = this.faces.length; g < m; g++) {
			h = this.faces[g];
			if (!h.__originalFaceNormal) {
				h.__originalFaceNormal = h.normal.clone()
			} else {
				h.__originalFaceNormal.copy(h.normal)
			}
			if (!h.__originalVertexNormals) {
				h.__originalVertexNormals = []
			}
			for (e = 0, l = h.vertexNormals.length; e < l; e++) {
				if (!h.__originalVertexNormals[e]) {
					h.__originalVertexNormals[e] = h.vertexNormals[e].clone()
				} else {
					h.__originalVertexNormals[e].copy(h.vertexNormals[e])
				}
			}
		}
		var c = new THREE.Geometry();
		c.faces = this.faces;
		for (e = 0, l = this.morphTargets.length; e < l; e++) {
			if (!this.morphNormals[e]) {
				this.morphNormals[e] = {};
				this.morphNormals[e].faceNormals = [];
				this.morphNormals[e].vertexNormals = [];
				var d = this.morphNormals[e].faceNormals;
				var a = this.morphNormals[e].vertexNormals;
				var k, b;
				for (g = 0, m = this.faces.length; g < m; g++) {
					k = new THREE.Vector3();
					b = {
						a: new THREE.Vector3(),
						b: new THREE.Vector3(),
						c: new THREE.Vector3()
					};
					d.push(k);
					a.push(b)
				}
			}
			var j = this.morphNormals[e];
			c.vertices = this.morphTargets[e].vertices;
			c.computeFaceNormals();
			c.computeVertexNormals();
			var k, b;
			for (g = 0, m = this.faces.length; g < m; g++) {
				h = this.faces[g];
				k = j.faceNormals[g];
				b = j.vertexNormals[g];
				k.copy(h.normal);
				b.a.copy(h.vertexNormals[0]);
				b.b.copy(h.vertexNormals[1]);
				b.c.copy(h.vertexNormals[2])
			}
		}
		for (g = 0, m = this.faces.length; g < m; g++) {
			h = this.faces[g];
			h.normal = h.__originalFaceNormal;
			h.vertexNormals = h.__originalVertexNormals
		}
	},
	computeTangents: function() {
		var O, m, E, k, N, C, g, o, K, H, G, e, d, c, j, h, V, U, A, u, R, Q, q, p, I, F, b, T = [],
			S = [],
			a = new THREE.Vector3(),
			l = new THREE.Vector3(),
			L = new THREE.Vector3(),
			P = new THREE.Vector3(),
			M = new THREE.Vector3(),
			D;
		for (E = 0, k = this.vertices.length; E < k; E++) {
			T[E] = new THREE.Vector3();
			S[E] = new THREE.Vector3()
		}

		function B(W, n, f, X, v, t, r) {
			K = W.vertices[n];
			H = W.vertices[f];
			G = W.vertices[X];
			e = o[v];
			d = o[t];
			c = o[r];
			j = H.x - K.x;
			h = G.x - K.x;
			V = H.y - K.y;
			U = G.y - K.y;
			A = H.z - K.z;
			u = G.z - K.z;
			R = d.x - e.x;
			Q = c.x - e.x;
			q = d.y - e.y;
			p = c.y - e.y;
			I = 1 / (R * p - Q * q);
			a.set((p * j - q * h) * I, (p * V - q * U) * I, (p * A - q * u) * I);
			l.set((R * h - Q * j) * I, (R * U - Q * V) * I, (R * u - Q * A) * I);
			T[n].add(a);
			T[f].add(a);
			T[X].add(a);
			S[n].add(l);
			S[f].add(l);
			S[X].add(l)
		}
		for (O = 0, m = this.faces.length; O < m; O++) {
			g = this.faces[O];
			o = this.faceVertexUvs[0][O];
			B(this, g.a, g.b, g.c, 0, 1, 2)
		}
		var J = ["a", "b", "c", "d"];
		for (O = 0, m = this.faces.length; O < m; O++) {
			g = this.faces[O];
			for (N = 0; N < Math.min(g.vertexNormals.length, 3); N++) {
				M.copy(g.vertexNormals[N]);
				C = g[J[N]];
				F = T[C];
				L.copy(F);
				L.sub(M.multiplyScalar(M.dot(F))).normalize();
				P.crossVectors(g.vertexNormals[N], F);
				b = P.dot(S[C]);
				D = (b < 0) ? -1 : 1;
				g.vertexTangents[N] = new THREE.Vector4(L.x, L.y, L.z, D)
			}
		}
		this.hasTangents = true
	},
	computeLineDistances: function() {
		var e = 0;
		var b = this.vertices;
		for (var c = 0, a = b.length; c < a; c++) {
			if (c > 0) {
				e += b[c].distanceTo(b[c - 1])
			}
			this.lineDistances[c] = e
		}
	},
	computeBoundingBox: function() {
		if (this.boundingBox === null) {
			this.boundingBox = new THREE.Box3()
		}
		this.boundingBox.setFromPoints(this.vertices)
	},
	computeBoundingSphere: function() {
		if (this.boundingSphere === null) {
			this.boundingSphere = new THREE.Sphere()
		}
		this.boundingSphere.setFromPoints(this.vertices)
	},
	merge: function(f, t, F) {
		if (f instanceof THREE.Geometry === false) {
			THREE.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", f);
			return
		}
		var k, m = this.vertices.length,
			d = this.vertices,
			c = f.vertices,
			b = this.faces,
			a = f.faces,
			C = this.faceVertexUvs[0],
			B = f.faceVertexUvs[0];
		if (F === undefined) {
			F = 0
		}
		if (t !== undefined) {
			k = new THREE.Matrix3().getNormalMatrix(t)
		}
		for (var u = 0, l = c.length; u < l; u++) {
			var D = c[u];
			var p = D.clone();
			if (t !== undefined) {
				p.applyMatrix4(t)
			}
			d.push(p)
		}
		for (u = 0, l = a.length; u < l; u++) {
			var h = a[u],
				o, E, q, n = h.vertexNormals,
				A = h.vertexColors;
			o = new THREE.Face3(h.a + m, h.b + m, h.c + m);
			o.normal.copy(h.normal);
			if (k !== undefined) {
				o.normal.applyMatrix3(k).normalize()
			}
			for (var r = 0, v = n.length; r < v; r++) {
				E = n[r].clone();
				if (k !== undefined) {
					E.applyMatrix3(k).normalize()
				}
				o.vertexNormals.push(E)
			}
			o.color.copy(h.color);
			for (var r = 0, v = A.length; r < v; r++) {
				q = A[r];
				o.vertexColors.push(q.clone())
			}
			o.materialIndex = h.materialIndex + F;
			b.push(o)
		}
		for (u = 0, l = B.length; u < l; u++) {
			var g = B[u],
				e = [];
			if (g === undefined) {
				continue
			}
			for (var r = 0, v = g.length; r < v; r++) {
				e.push(g[r].clone())
			}
			C.push(e)
		}
	},
	mergeMesh: function(a) {
		if (a instanceof THREE.Mesh === false) {
			THREE.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", a);
			return
		}
		a.matrixAutoUpdate && a.updateMatrix();
		this.merge(a.geometry, a.matrix)
	},
	mergeVertices: function() {
		var b = {};
		var a = [],
			u = [];
		var f, A;
		var g = 4;
		var t = Math.pow(10, g);
		var q, e, d;
		var c, p, r;
		for (q = 0, e = this.vertices.length; q < e; q++) {
			f = this.vertices[q];
			A = Math.round(f.x * t) + "_" + Math.round(f.y * t) + "_" + Math.round(f.z * t);
			if (b[A] === undefined) {
				b[A] = q;
				a.push(this.vertices[q]);
				u[q] = a.length - 1
			} else {
				u[q] = u[b[A]]
			}
		}
		var l = [];
		for (q = 0, e = this.faces.length; q < e; q++) {
			d = this.faces[q];
			d.a = u[d.a];
			d.b = u[d.b];
			d.c = u[d.c];
			c = [d.a, d.b, d.c];
			var o = -1;
			for (var m = 0; m < 3; m++) {
				if (c[m] == c[(m + 1) % 3]) {
					o = m;
					l.push(q);
					break
				}
			}
		}
		for (q = l.length - 1; q >= 0; q--) {
			var k = l[q];
			this.faces.splice(k, 1);
			for (p = 0, r = this.faceVertexUvs.length; p < r; p++) {
				this.faceVertexUvs[p].splice(k, 1)
			}
		}
		var h = this.vertices.length - a.length;
		this.vertices = a;
		return h
	},
	toJSON: function() {
		var h = {
			metadata: {
				version: 4,
				type: "BufferGeometry",
				generator: "BufferGeometryExporter"
			},
			uuid: this.uuid,
			type: this.type
		};
		if (this.name !== "") {
			h.name = this.name
		}
		if (this.parameters !== undefined) {
			var f = this.parameters;
			for (var I in f) {
				if (f[I] !== undefined) {
					h[I] = f[I]
				}
			}
			return h
		}
		var e = [];
		for (var A = 0; A < this.vertices.length; A++) {
			var C = this.vertices[A];
			e.push(C.x, C.y, C.z)
		}
		var b = [];
		var q = [];
		var n = {};
		var j = [];
		var F = {};
		var k = [];
		var d = {};
		for (var A = 0; A < this.faces.length; A++) {
			var g = this.faces[A];
			var o = false;
			var E = false;
			var a = this.faceVertexUvs[0][A] !== undefined;
			var B = g.normal.length() > 0;
			var v = g.vertexNormals.length > 0;
			var t = g.color.r !== 1 || g.color.g !== 1 || g.color.b !== 1;
			var p = g.vertexColors.length > 0;
			var H = 0;
			H = m(H, 0, 0);
			H = m(H, 1, o);
			H = m(H, 2, E);
			H = m(H, 3, a);
			H = m(H, 4, B);
			H = m(H, 5, v);
			H = m(H, 6, t);
			H = m(H, 7, p);
			b.push(H);
			b.push(g.a, g.b, g.c);
			if (a) {
				var D = this.faceVertexUvs[0][A];
				b.push(c(D[0]), c(D[1]), c(D[2]))
			}
			if (B) {
				b.push(G(g.normal))
			}
			if (v) {
				var u = g.vertexNormals;
				b.push(G(u[0]), G(u[1]), G(u[2]))
			}
			if (t) {
				b.push(l(g.color))
			}
			if (p) {
				var r = g.vertexColors;
				b.push(l(r[0]), l(r[1]), l(r[2]))
			}
		}

		function m(L, J, K) {
			return K ? L | (1 << J) : L & (~(1 << J))
		}

		function G(K) {
			var J = K.x.toString() + K.y.toString() + K.z.toString();
			if (n[J] !== undefined) {
				return n[J]
			}
			n[J] = q.length / 3;
			q.push(K.x, K.y, K.z);
			return n[J]
		}

		function l(J) {
			var K = J.r.toString() + J.g.toString() + J.b.toString();
			if (F[K] !== undefined) {
				return F[K]
			}
			F[K] = j.length;
			j.push(J.getHex());
			return F[K]
		}

		function c(J) {
			var K = J.x.toString() + J.y.toString();
			if (d[K] !== undefined) {
				return d[K]
			}
			d[K] = k.length / 2;
			k.push(J.x, J.y);
			return d[K]
		}
		h.data = {};
		h.data.vertices = e;
		h.data.normals = q;
		if (j.length > 0) {
			h.data.colors = j
		}
		if (k.length > 0) {
			h.data.uvs = [k]
		}
		h.data.faces = b;
		return h
	},
	clone: function() {
		var n = new THREE.Geometry();
		var m = this.vertices;
		for (var g = 0, o = m.length; g < o; g++) {
			n.vertices.push(m[g].clone())
		}
		var c = this.faces;
		for (var g = 0, o = c.length; g < o; g++) {
			n.faces.push(c[g].clone())
		}
		for (var g = 0, o = this.faceVertexUvs.length; g < o; g++) {
			var l = this.faceVertexUvs[g];
			if (n.faceVertexUvs[g] === undefined) {
				n.faceVertexUvs[g] = []
			}
			for (var f = 0, h = l.length; f < h; f++) {
				var e = l[f],
					p = [];
				for (var d = 0, a = e.length; d < a; d++) {
					var b = e[d];
					p.push(b.clone())
				}
				n.faceVertexUvs[g].push(p)
			}
		}
		return n
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype);
THREE.GeometryIdCount = 0;
THREE.Camera = function() {
	THREE.Object3D.call(this);
	this.type = "Camera";
	this.matrixWorldInverse = new THREE.Matrix4();
	this.projectionMatrix = new THREE.Matrix4()
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.getWorldDirection = function() {
	var a = new THREE.Quaternion();
	return function(c) {
		var b = c || new THREE.Vector3();
		this.getWorldQuaternion(a);
		return b.set(0, 0, -1).applyQuaternion(a)
	}
}();
THREE.Camera.prototype.lookAt = function() {
	var a = new THREE.Matrix4();
	return function(b) {
		a.lookAt(this.position, b, this.up);
		this.quaternion.setFromRotationMatrix(a)
	}
}();
THREE.Camera.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.Camera()
	}
	THREE.Object3D.prototype.clone.call(this, a);
	a.matrixWorldInverse.copy(this.matrixWorldInverse);
	a.projectionMatrix.copy(this.projectionMatrix);
	return a
};
THREE.CubeCamera = function(f, e, g) {
	THREE.Object3D.call(this);
	this.type = "CubeCamera";
	var d = 90,
		b = 1;
	var c = new THREE.PerspectiveCamera(d, b, f, e);
	c.up.set(0, -1, 0);
	c.lookAt(new THREE.Vector3(1, 0, 0));
	this.add(c);
	var k = new THREE.PerspectiveCamera(d, b, f, e);
	k.up.set(0, -1, 0);
	k.lookAt(new THREE.Vector3(-1, 0, 0));
	this.add(k);
	var a = new THREE.PerspectiveCamera(d, b, f, e);
	a.up.set(0, 0, 1);
	a.lookAt(new THREE.Vector3(0, 1, 0));
	this.add(a);
	var j = new THREE.PerspectiveCamera(d, b, f, e);
	j.up.set(0, 0, -1);
	j.lookAt(new THREE.Vector3(0, -1, 0));
	this.add(j);
	var l = new THREE.PerspectiveCamera(d, b, f, e);
	l.up.set(0, -1, 0);
	l.lookAt(new THREE.Vector3(0, 0, 1));
	this.add(l);
	var h = new THREE.PerspectiveCamera(d, b, f, e);
	h.up.set(0, -1, 0);
	h.lookAt(new THREE.Vector3(0, 0, -1));
	this.add(h);
	this.renderTarget = new THREE.WebGLRenderTargetCube(g, g, {
		format: THREE.RGBFormat,
		magFilter: THREE.LinearFilter,
		minFilter: THREE.LinearFilter
	});
	this.updateCubeMap = function(o, p) {
		var n = this.renderTarget;
		var m = n.generateMipmaps;
		n.generateMipmaps = false;
		n.activeCubeFace = 0;
		o.render(p, c, n);
		n.activeCubeFace = 1;
		o.render(p, k, n);
		n.activeCubeFace = 2;
		o.render(p, a, n);
		n.activeCubeFace = 3;
		o.render(p, j, n);
		n.activeCubeFace = 4;
		o.render(p, l, n);
		n.generateMipmaps = m;
		n.activeCubeFace = 5;
		o.render(p, h, n)
	}
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CubeCamera.prototype.constructor = THREE.CubeCamera;
THREE.OrthographicCamera = function(f, c, e, b, d, a) {
	THREE.Camera.call(this);
	this.type = "OrthographicCamera";
	this.zoom = 1;
	this.left = f;
	this.right = c;
	this.top = e;
	this.bottom = b;
	this.near = (d !== undefined) ? d : 0.1;
	this.far = (a !== undefined) ? a : 2000;
	this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
	var c = (this.right - this.left) / (2 * this.zoom);
	var b = (this.top - this.bottom) / (2 * this.zoom);
	var a = (this.right + this.left) / 2;
	var d = (this.top + this.bottom) / 2;
	this.projectionMatrix.makeOrthographic(a - c, a + c, d + b, d - b, this.near, this.far)
};
THREE.OrthographicCamera.prototype.clone = function() {
	var a = new THREE.OrthographicCamera();
	THREE.Camera.prototype.clone.call(this, a);
	a.zoom = this.zoom;
	a.left = this.left;
	a.right = this.right;
	a.top = this.top;
	a.bottom = this.bottom;
	a.near = this.near;
	a.far = this.far;
	a.projectionMatrix.copy(this.projectionMatrix);
	return a
};
THREE.PerspectiveCamera = function(c, b, d, a) {
	THREE.Camera.call(this);
	this.type = "PerspectiveCamera";
	this.zoom = 1;
	this.fov = c !== undefined ? c : 50;
	this.aspect = b !== undefined ? b : 1;
	this.near = d !== undefined ? d : 0.1;
	this.far = a !== undefined ? a : 2000;
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera;
THREE.PerspectiveCamera.prototype.setLens = function(b, a) {
	if (a === undefined) {
		a = 24
	}
	this.fov = 2 * THREE.Math.radToDeg(Math.atan(a / (b * 2)));
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function(e, c, b, f, d, a) {
	this.fullWidth = e;
	this.fullHeight = c;
	this.x = b;
	this.y = f;
	this.width = d;
	this.height = a;
	this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
	var d = THREE.Math.radToDeg(2 * Math.atan(Math.tan(THREE.Math.degToRad(this.fov) * 0.5) / this.zoom));
	if (this.fullWidth) {
		var c = this.fullWidth / this.fullHeight;
		var h = Math.tan(THREE.Math.degToRad(d * 0.5)) * this.near;
		var b = -h;
		var g = c * b;
		var e = c * h;
		var f = Math.abs(e - g);
		var a = Math.abs(h - b);
		this.projectionMatrix.makeFrustum(g + this.x * f / this.fullWidth, g + (this.x + this.width) * f / this.fullWidth, h - (this.y + this.height) * a / this.fullHeight, h - this.y * a / this.fullHeight, this.near, this.far)
	} else {
		this.projectionMatrix.makePerspective(d, this.aspect, this.near, this.far)
	}
};
THREE.PerspectiveCamera.prototype.clone = function() {
	var a = new THREE.PerspectiveCamera();
	THREE.Camera.prototype.clone.call(this, a);
	a.zoom = this.zoom;
	a.fov = this.fov;
	a.aspect = this.aspect;
	a.near = this.near;
	a.far = this.far;
	a.projectionMatrix.copy(this.projectionMatrix);
	return a
};
THREE.Light = function(a) {
	THREE.Object3D.call(this);
	this.type = "Light";
	this.color = new THREE.Color(a)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.Light()
	}
	THREE.Object3D.prototype.clone.call(this, a);
	a.color.copy(this.color);
	return a
};
THREE.AmbientLight = function(a) {
	THREE.Light.call(this, a);
	this.type = "AmbientLight"
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.AmbientLight.prototype.clone = function() {
	var a = new THREE.AmbientLight();
	THREE.Light.prototype.clone.call(this, a);
	return a
};
THREE.AreaLight = function(b, a) {
	THREE.Light.call(this, b);
	this.type = "AreaLight";
	this.normal = new THREE.Vector3(0, -1, 0);
	this.right = new THREE.Vector3(1, 0, 0);
	this.intensity = (a !== undefined) ? a : 1;
	this.width = 1;
	this.height = 1;
	this.constantAttenuation = 1.5;
	this.linearAttenuation = 0.5;
	this.quadraticAttenuation = 0.1
};
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype);
THREE.AreaLight.prototype.constructor = THREE.AreaLight;
THREE.DirectionalLight = function(b, a) {
	THREE.Light.call(this, b);
	this.type = "DirectionalLight";
	this.position.set(0, 1, 0);
	this.target = new THREE.Object3D();
	this.intensity = (a !== undefined) ? a : 1;
	this.castShadow = false;
	this.onlyShadow = false;
	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;
	this.shadowCameraLeft = -500;
	this.shadowCameraRight = 500;
	this.shadowCameraTop = 500;
	this.shadowCameraBottom = -500;
	this.shadowCameraVisible = false;
	this.shadowBias = 0;
	this.shadowDarkness = 0.5;
	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;
	this.shadowCascade = false;
	this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1000);
	this.shadowCascadeCount = 2;
	this.shadowCascadeBias = [0, 0, 0];
	this.shadowCascadeWidth = [512, 512, 512];
	this.shadowCascadeHeight = [512, 512, 512];
	this.shadowCascadeNearZ = [-1, 0.99, 0.998];
	this.shadowCascadeFarZ = [0.99, 0.998, 1];
	this.shadowCascadeArray = [];
	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.DirectionalLight.prototype.clone = function() {
	var a = new THREE.DirectionalLight();
	THREE.Light.prototype.clone.call(this, a);
	a.target = this.target.clone();
	a.intensity = this.intensity;
	a.castShadow = this.castShadow;
	a.onlyShadow = this.onlyShadow;
	a.shadowCameraNear = this.shadowCameraNear;
	a.shadowCameraFar = this.shadowCameraFar;
	a.shadowCameraLeft = this.shadowCameraLeft;
	a.shadowCameraRight = this.shadowCameraRight;
	a.shadowCameraTop = this.shadowCameraTop;
	a.shadowCameraBottom = this.shadowCameraBottom;
	a.shadowCameraVisible = this.shadowCameraVisible;
	a.shadowBias = this.shadowBias;
	a.shadowDarkness = this.shadowDarkness;
	a.shadowMapWidth = this.shadowMapWidth;
	a.shadowMapHeight = this.shadowMapHeight;
	a.shadowCascade = this.shadowCascade;
	a.shadowCascadeOffset.copy(this.shadowCascadeOffset);
	a.shadowCascadeCount = this.shadowCascadeCount;
	a.shadowCascadeBias = this.shadowCascadeBias.slice(0);
	a.shadowCascadeWidth = this.shadowCascadeWidth.slice(0);
	a.shadowCascadeHeight = this.shadowCascadeHeight.slice(0);
	a.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0);
	a.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0);
	return a
};
THREE.HemisphereLight = function(b, c, a) {
	THREE.Light.call(this, b);
	this.type = "HemisphereLight";
	this.position.set(0, 100, 0);
	this.groundColor = new THREE.Color(c);
	this.intensity = (a !== undefined) ? a : 1
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight.prototype.constructor = THREE.HemisphereLight;
THREE.HemisphereLight.prototype.clone = function() {
	var a = new THREE.HemisphereLight();
	THREE.Light.prototype.clone.call(this, a);
	a.groundColor.copy(this.groundColor);
	a.intensity = this.intensity;
	return a
};
THREE.PointLight = function(b, a, d, c) {
	THREE.Light.call(this, b);
	this.type = "PointLight";
	this.intensity = (a !== undefined) ? a : 1;
	this.distance = (d !== undefined) ? d : 0;
	this.decay = (c !== undefined) ? c : 1
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.PointLight.prototype.clone = function() {
	var a = new THREE.PointLight();
	THREE.Light.prototype.clone.call(this, a);
	a.intensity = this.intensity;
	a.distance = this.distance;
	a.decay = this.decay;
	return a
};
THREE.SpotLight = function(b, a, f, e, d, c) {
	THREE.Light.call(this, b);
	this.type = "SpotLight";
	this.position.set(0, 1, 0);
	this.target = new THREE.Object3D();
	this.intensity = (a !== undefined) ? a : 1;
	this.distance = (f !== undefined) ? f : 0;
	this.angle = (e !== undefined) ? e : Math.PI / 3;
	this.exponent = (d !== undefined) ? d : 10;
	this.decay = (c !== undefined) ? c : 1;
	this.castShadow = false;
	this.onlyShadow = false;
	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;
	this.shadowCameraFov = 50;
	this.shadowCameraVisible = false;
	this.shadowBias = 0;
	this.shadowDarkness = 0.5;
	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;
	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
THREE.SpotLight.prototype.clone = function() {
	var a = new THREE.SpotLight();
	THREE.Light.prototype.clone.call(this, a);
	a.target = this.target.clone();
	a.intensity = this.intensity;
	a.distance = this.distance;
	a.angle = this.angle;
	a.exponent = this.exponent;
	a.decay = this.decay;
	a.castShadow = this.castShadow;
	a.onlyShadow = this.onlyShadow;
	a.shadowCameraNear = this.shadowCameraNear;
	a.shadowCameraFar = this.shadowCameraFar;
	a.shadowCameraFov = this.shadowCameraFov;
	a.shadowCameraVisible = this.shadowCameraVisible;
	a.shadowBias = this.shadowBias;
	a.shadowDarkness = this.shadowDarkness;
	a.shadowMapWidth = this.shadowMapWidth;
	a.shadowMapHeight = this.shadowMapHeight;
	return a
};
THREE.Cache = {
	files: {},
	add: function(b, a) {
		this.files[b] = a
	},
	get: function(a) {
		return this.files[a]
	},
	remove: function(a) {
		delete this.files[a]
	},
	clear: function() {
		this.files = {}
	}
};
THREE.Loader = function(a) {
	this.showStatus = a;
	this.statusDomElement = a ? THREE.Loader.prototype.addStatusElement() : null;
	this.imageLoader = new THREE.ImageLoader();
	this.onLoadStart = function() {};
	this.onLoadProgress = function() {};
	this.onLoadComplete = function() {}
};
THREE.Loader.prototype = {
	constructor: THREE.Loader,
	crossOrigin: undefined,
	addStatusElement: function() {
		var a = document.createElement("div");
		a.style.position = "absolute";
		a.style.right = "0px";
		a.style.top = "0px";
		a.style.fontSize = "0.8em";
		a.style.textAlign = "left";
		a.style.background = "rgba(0,0,0,0.25)";
		a.style.color = "#fff";
		a.style.width = "120px";
		a.style.padding = "0.5em 0.5em 0.5em 0.5em";
		a.style.zIndex = 1000;
		a.innerHTML = "Loading ...";
		return a
	},
	updateProgress: function(a) {
		var b = "Loaded ";
		if (a.total) {
			b += (100 * a.loaded / a.total).toFixed(0) + "%"
		} else {
			b += (a.loaded / 1024).toFixed(2) + " KB"
		}
		this.statusDomElement.innerHTML = b
	},
	extractUrlBase: function(a) {
		var b = a.split("/");
		if (b.length === 1) {
			return "./"
		}
		b.pop();
		return b.join("/") + "/"
	},
	initMaterials: function(a, c) {
		var d = [];
		for (var b = 0; b < a.length; ++b) {
			d[b] = this.createMaterial(a[b], c)
		}
		return d
	},
	needsTangents: function(b) {
		for (var d = 0, c = b.length; d < c; d++) {
			var a = b[d];
			if (a instanceof THREE.ShaderMaterial) {
				return true
			}
		}
		return false
	},
	createMaterial: function(e, c) {
		var k = this;

		function a(o) {
			var m = Math.log(o) / Math.LN2;
			return Math.pow(2, Math.round(m))
		}

		function g(t, m, q, n, r, o, l) {
			var p = c + q;
			var u;
			var v = THREE.Loader.Handlers.get(p);
			if (v !== null) {
				u = v.load(p)
			} else {
				u = new THREE.Texture();
				v = k.imageLoader;
				v.crossOrigin = k.crossOrigin;
				v.load(p, function(F) {
					if (THREE.Math.isPowerOfTwo(F.width) === false || THREE.Math.isPowerOfTwo(F.height) === false) {
						var E = a(F.width);
						var B = a(F.height);
						var C = document.createElement("canvas");
						C.width = E;
						C.height = B;
						var D = C.getContext("2d");
						D.drawImage(F, 0, 0, E, B);
						u.image = C
					} else {
						u.image = F
					}
					u.needsUpdate = true
				})
			}
			u.sourceFile = q;
			if (n) {
				u.repeat.set(n[0], n[1]);
				if (n[0] !== 1) {
					u.wrapS = THREE.RepeatWrapping
				}
				if (n[1] !== 1) {
					u.wrapT = THREE.RepeatWrapping
				}
			}
			if (r) {
				u.offset.set(r[0], r[1])
			}
			if (o) {
				var A = {
					repeat: THREE.RepeatWrapping,
					mirror: THREE.MirroredRepeatWrapping
				};
				if (A[o[0]] !== undefined) {
					u.wrapS = A[o[0]]
				}
				if (A[o[1]] !== undefined) {
					u.wrapT = A[o[1]]
				}
			}
			if (l) {
				u.anisotropy = l
			}
			t[m] = u
		}

		function b(l) {
			return (l[0] * 255 << 16) + (l[1] * 255 << 8) + l[2] * 255
		}
		var d = "MeshLambertMaterial";
		var j = {
			color: 15658734,
			opacity: 1,
			map: null,
			lightMap: null,
			normalMap: null,
			bumpMap: null,
			wireframe: false
		};
		if (e.shading) {
			var h = e.shading.toLowerCase();
			if (h === "phong") {
				d = "MeshPhongMaterial"
			} else {
				if (h === "basic") {
					d = "MeshBasicMaterial"
				}
			}
		}
		if (e.blending !== undefined && THREE[e.blending] !== undefined) {
			j.blending = THREE[e.blending]
		}
		if (e.transparent !== undefined) {
			j.transparent = e.transparent
		}
		if (e.opacity !== undefined && e.opacity < 1) {
			j.transparent = true
		}
		if (e.depthTest !== undefined) {
			j.depthTest = e.depthTest
		}
		if (e.depthWrite !== undefined) {
			j.depthWrite = e.depthWrite
		}
		if (e.visible !== undefined) {
			j.visible = e.visible
		}
		if (e.flipSided !== undefined) {
			j.side = THREE.BackSide
		}
		if (e.doubleSided !== undefined) {
			j.side = THREE.DoubleSide
		}
		if (e.wireframe !== undefined) {
			j.wireframe = e.wireframe
		}
		if (e.vertexColors !== undefined) {
			if (e.vertexColors === "face") {
				j.vertexColors = THREE.FaceColors
			} else {
				if (e.vertexColors) {
					j.vertexColors = THREE.VertexColors
				}
			}
		}
		if (e.colorDiffuse) {
			j.color = b(e.colorDiffuse)
		} else {
			if (e.DbgColor) {
				j.color = e.DbgColor
			}
		}
		if (e.colorSpecular) {
			j.specular = b(e.colorSpecular)
		}
		if (e.colorEmissive) {
			j.emissive = b(e.colorEmissive)
		}
		if (e.transparency !== undefined) {
			console.warn("THREE.Loader: transparency has been renamed to opacity");
			e.opacity = e.transparency
		}
		if (e.opacity !== undefined) {
			j.opacity = e.opacity
		}
		if (e.specularCoef) {
			j.shininess = e.specularCoef
		}
		if (e.mapDiffuse && c) {
			g(j, "map", e.mapDiffuse, e.mapDiffuseRepeat, e.mapDiffuseOffset, e.mapDiffuseWrap, e.mapDiffuseAnisotropy)
		}
		if (e.mapLight && c) {
			g(j, "lightMap", e.mapLight, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy)
		}
		if (e.mapBump && c) {
			g(j, "bumpMap", e.mapBump, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy)
		}
		if (e.mapNormal && c) {
			g(j, "normalMap", e.mapNormal, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy)
		}
		if (e.mapSpecular && c) {
			g(j, "specularMap", e.mapSpecular, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy)
		}
		if (e.mapAlpha && c) {
			g(j, "alphaMap", e.mapAlpha, e.mapAlphaRepeat, e.mapAlphaOffset, e.mapAlphaWrap, e.mapAlphaAnisotropy)
		}
		if (e.mapBumpScale) {
			j.bumpScale = e.mapBumpScale
		}
		if (e.mapNormalFactor) {
			j.normalScale = new THREE.Vector2(e.mapNormalFactor, e.mapNormalFactor)
		}
		var f = new THREE[d](j);
		if (e.DbgName !== undefined) {
			f.name = e.DbgName
		}
		return f
	}
};
THREE.Loader.Handlers = {
	handlers: [],
	add: function(b, a) {
		this.handlers.push(b, a)
	},
	get: function(d) {
		for (var c = 0, b = this.handlers.length; c < b; c += 2) {
			var e = this.handlers[c];
			var a = this.handlers[c + 1];
			if (e.test(d)) {
				return a
			}
		}
		return null
	}
};
THREE.XHRLoader = function(a) {
	this.manager = (a !== undefined) ? a : THREE.DefaultLoadingManager
};
THREE.XHRLoader.prototype = {
	constructor: THREE.XHRLoader,
	load: function(a, d, g, f) {
		var c = this;
		var b = THREE.Cache.get(a);
		if (b !== undefined) {
			if (d) {
				d(b)
			}
			return
		}
		var e = new XMLHttpRequest();
		e.open("GET", a, true);
		e.addEventListener("load", function(h) {
			THREE.Cache.add(a, this.response);
			if (d) {
				d(this.response)
			}
			c.manager.itemEnd(a)
		}, false);
		if (g !== undefined) {
			e.addEventListener("progress", function(h) {
				g(h)
			}, false)
		}
		if (f !== undefined) {
			e.addEventListener("error", function(h) {
				f(h)
			}, false)
		}
		if (this.crossOrigin !== undefined) {
			e.crossOrigin = this.crossOrigin
		}
		if (this.responseType !== undefined) {
			e.responseType = this.responseType
		}
		e.send(null);
		c.manager.itemStart(a)
	},
	setResponseType: function(a) {
		this.responseType = a
	},
	setCrossOrigin: function(a) {
		this.crossOrigin = a
	}
};
THREE.ImageLoader = function(a) {
	this.manager = (a !== undefined) ? a : THREE.DefaultLoadingManager
};
THREE.ImageLoader.prototype = {
	constructor: THREE.ImageLoader,
	load: function(a, d, g, e) {
		var c = this;
		var b = THREE.Cache.get(a);
		if (b !== undefined) {
			d(b);
			return
		}
		var f = document.createElement("img");
		f.addEventListener("load", function(h) {
			THREE.Cache.add(a, this);
			if (d) {
				d(this)
			}
			c.manager.itemEnd(a)
		}, false);
		if (g !== undefined) {
			f.addEventListener("progress", function(h) {
				g(h)
			}, false)
		}
		if (e !== undefined) {
			f.addEventListener("error", function(h) {
				e(h)
			}, false)
		}
		if (this.crossOrigin !== undefined) {
			f.crossOrigin = this.crossOrigin
		}
		f.src = a;
		c.manager.itemStart(a);
		return f
	},
	setCrossOrigin: function(a) {
		this.crossOrigin = a
	}
};
THREE.JSONLoader = function(a) {
	THREE.Loader.call(this, a);
	this.withCredentials = false
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader;
THREE.JSONLoader.prototype.load = function(a, c, b) {
	b = b && (typeof b === "string") ? b : this.extractUrlBase(a);
	this.onLoadStart();
	this.loadAjaxJSON(this, a, c, b)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function(b, a, g, e, d) {
	var f = new XMLHttpRequest();
	var c = 0;
	f.onreadystatechange = function() {
		if (f.readyState === f.DONE) {
			if (f.status === 200 || f.status === 0) {
				if (f.responseText) {
					var k = JSON.parse(f.responseText);
					var j = k.metadata;
					if (j !== undefined) {
						if (j.type === "object") {
							THREE.error("THREE.JSONLoader: " + a + " should be loaded with THREE.ObjectLoader instead.");
							return
						}
						if (j.type === "scene") {
							THREE.error("THREE.JSONLoader: " + a + " seems to be a Scene. Use THREE.SceneLoader instead.");
							return
						}
					}
					var h = b.parse(k, e);
					g(h.geometry, h.materials)
				} else {
					THREE.error("THREE.JSONLoader: " + a + " seems to be unreachable or the file is empty.")
				}
				b.onLoadComplete()
			} else {
				THREE.error("THREE.JSONLoader: Couldn't load " + a + " (" + f.status + ")")
			}
		} else {
			if (f.readyState === f.LOADING) {
				if (d) {
					if (c === 0) {
						c = f.getResponseHeader("Content-Length")
					}
					d({
						total: c,
						loaded: f.responseText.length
					})
				}
			} else {
				if (f.readyState === f.HEADERS_RECEIVED) {
					if (d !== undefined) {
						c = f.getResponseHeader("Content-Length")
					}
				}
			}
		}
	};
	f.open("GET", a, true);
	f.withCredentials = this.withCredentials;
	f.send(null)
};
THREE.JSONLoader.prototype.parse = function(d, e) {
	var h = new THREE.Geometry(),
		g = (d.scale !== undefined) ? 1 / d.scale : 1;
	f(g);
	c();
	b(g);
	h.computeFaceNormals();
	h.computeBoundingSphere();

	function f(X) {
		function C(u, j) {
			return u & (1 << j)
		}
		var S, R, I, t, r, q, V, L, E, o, J, M, k, U, Q, P, N, T, F, n, m, D, W, p, B, K, H, l = d.faces,
			A = d.vertices,
			O = d.normals,
			G = d.colors,
			Y = 0;
		if (d.uvs !== undefined) {
			for (S = 0; S < d.uvs.length; S++) {
				if (d.uvs[S].length) {
					Y++
				}
			}
			for (S = 0; S < Y; S++) {
				h.faceVertexUvs[S] = []
			}
		}
		t = 0;
		r = A.length;
		while (t < r) {
			T = new THREE.Vector3();
			T.x = A[t++] * X;
			T.y = A[t++] * X;
			T.z = A[t++] * X;
			h.vertices.push(T)
		}
		t = 0;
		r = l.length;
		while (t < r) {
			o = l[t++];
			J = C(o, 0);
			M = C(o, 1);
			k = C(o, 3);
			U = C(o, 4);
			Q = C(o, 5);
			P = C(o, 6);
			N = C(o, 7);
			if (J) {
				n = new THREE.Face3();
				n.a = l[t];
				n.b = l[t + 1];
				n.c = l[t + 3];
				m = new THREE.Face3();
				m.a = l[t + 1];
				m.b = l[t + 2];
				m.c = l[t + 3];
				t += 4;
				if (M) {
					E = l[t++];
					n.materialIndex = E;
					m.materialIndex = E
				}
				I = h.faces.length;
				if (k) {
					for (S = 0; S < Y; S++) {
						p = d.uvs[S];
						h.faceVertexUvs[S][I] = [];
						h.faceVertexUvs[S][I + 1] = [];
						for (R = 0; R < 4; R++) {
							L = l[t++];
							K = p[L * 2];
							H = p[L * 2 + 1];
							B = new THREE.Vector2(K, H);
							if (R !== 2) {
								h.faceVertexUvs[S][I].push(B)
							}
							if (R !== 0) {
								h.faceVertexUvs[S][I + 1].push(B)
							}
						}
					}
				}
				if (U) {
					V = l[t++] * 3;
					n.normal.set(O[V++], O[V++], O[V]);
					m.normal.copy(n.normal)
				}
				if (Q) {
					for (S = 0; S < 4; S++) {
						V = l[t++] * 3;
						W = new THREE.Vector3(O[V++], O[V++], O[V]);
						if (S !== 2) {
							n.vertexNormals.push(W)
						}
						if (S !== 0) {
							m.vertexNormals.push(W)
						}
					}
				}
				if (P) {
					q = l[t++];
					D = G[q];
					n.color.setHex(D);
					m.color.setHex(D)
				}
				if (N) {
					for (S = 0; S < 4; S++) {
						q = l[t++];
						D = G[q];
						if (S !== 2) {
							n.vertexColors.push(new THREE.Color(D))
						}
						if (S !== 0) {
							m.vertexColors.push(new THREE.Color(D))
						}
					}
				}
				h.faces.push(n);
				h.faces.push(m)
			} else {
				F = new THREE.Face3();
				F.a = l[t++];
				F.b = l[t++];
				F.c = l[t++];
				if (M) {
					E = l[t++];
					F.materialIndex = E
				}
				I = h.faces.length;
				if (k) {
					for (S = 0; S < Y; S++) {
						p = d.uvs[S];
						h.faceVertexUvs[S][I] = [];
						for (R = 0; R < 3; R++) {
							L = l[t++];
							K = p[L * 2];
							H = p[L * 2 + 1];
							B = new THREE.Vector2(K, H);
							h.faceVertexUvs[S][I].push(B)
						}
					}
				}
				if (U) {
					V = l[t++] * 3;
					F.normal.set(O[V++], O[V++], O[V])
				}
				if (Q) {
					for (S = 0; S < 3; S++) {
						V = l[t++] * 3;
						W = new THREE.Vector3(O[V++], O[V++], O[V]);
						F.vertexNormals.push(W)
					}
				}
				if (P) {
					q = l[t++];
					F.color.setHex(G[q])
				}
				if (N) {
					for (S = 0; S < 3; S++) {
						q = l[t++];
						F.vertexColors.push(new THREE.Color(G[q]))
					}
				}
				h.faces.push(F)
			}
		}
	}

	function c() {
		var j = (d.influencesPerVertex !== undefined) ? d.influencesPerVertex : 2;
		if (d.skinWeights) {
			for (var m = 0, k = d.skinWeights.length; m < k; m += j) {
				var u = d.skinWeights[m];
				var r = (j > 1) ? d.skinWeights[m + 1] : 0;
				var p = (j > 2) ? d.skinWeights[m + 2] : 0;
				var v = (j > 3) ? d.skinWeights[m + 3] : 0;
				h.skinWeights.push(new THREE.Vector4(u, r, p, v))
			}
		}
		if (d.skinIndices) {
			for (var m = 0, k = d.skinIndices.length; m < k; m += j) {
				var t = d.skinIndices[m];
				var q = (j > 1) ? d.skinIndices[m + 1] : 0;
				var o = (j > 2) ? d.skinIndices[m + 2] : 0;
				var n = (j > 3) ? d.skinIndices[m + 3] : 0;
				h.skinIndices.push(new THREE.Vector4(t, q, o, n))
			}
		}
		h.bones = d.bones;
		if (h.bones && h.bones.length > 0 && (h.skinWeights.length !== h.skinIndices.length || h.skinIndices.length !== h.vertices.length)) {
			THREE.warn("THREE.JSONLoader: When skinning, number of vertices (" + h.vertices.length + "), skinIndices (" + h.skinIndices.length + "), and skinWeights (" + h.skinWeights.length + ") should match.")
		}
		h.animation = d.animation;
		h.animations = d.animations
	}

	function b(m) {
		if (d.morphTargets !== undefined) {
			var p, n, B, k, r, C;
			for (p = 0, n = d.morphTargets.length; p < n; p++) {
				h.morphTargets[p] = {};
				h.morphTargets[p].name = d.morphTargets[p].name;
				h.morphTargets[p].vertices = [];
				r = h.morphTargets[p].vertices;
				C = d.morphTargets[p].vertices;
				for (B = 0, k = C.length; B < k; B += 3) {
					var q = new THREE.Vector3();
					q.x = C[B] * m;
					q.y = C[B + 1] * m;
					q.z = C[B + 2] * m;
					r.push(q)
				}
			}
		}
		if (d.morphColors !== undefined) {
			var p, n, t, A, u, j, o;
			for (p = 0, n = d.morphColors.length; p < n; p++) {
				h.morphColors[p] = {};
				h.morphColors[p].name = d.morphColors[p].name;
				h.morphColors[p].colors = [];
				u = h.morphColors[p].colors;
				j = d.morphColors[p].colors;
				for (t = 0, A = j.length; t < A; t += 3) {
					o = new THREE.Color(16755200);
					o.setRGB(j[t], j[t + 1], j[t + 2]);
					u.push(o)
				}
			}
		}
	}
	if (d.materials === undefined || d.materials.length === 0) {
		return {
			geometry: h
		}
	} else {
		var a = this.initMaterials(d.materials, e);
		if (this.needsTangents(a)) {
			h.computeTangents()
		}
		return {
			geometry: h,
			materials: a
		}
	}
};
THREE.LoadingManager = function(c, f, e) {
	var b = this;
	var a = 0,
		d = 0;
	this.onLoad = c;
	this.onProgress = f;
	this.onError = e;
	this.itemStart = function(g) {
		d++
	};
	this.itemEnd = function(g) {
		a++;
		if (b.onProgress !== undefined) {
			b.onProgress(g, a, d)
		}
		if (a === d && b.onLoad !== undefined) {
			b.onLoad()
		}
	}
};
THREE.DefaultLoadingManager = new THREE.LoadingManager();
THREE.BufferGeometryLoader = function(a) {
	this.manager = (a !== undefined) ? a : THREE.DefaultLoadingManager
};
THREE.BufferGeometryLoader.prototype = {
	constructor: THREE.BufferGeometryLoader,
	load: function(b, d, f, e) {
		var c = this;
		var a = new THREE.XHRLoader(c.manager);
		a.setCrossOrigin(this.crossOrigin);
		a.load(b, function(g) {
			d(c.parse(JSON.parse(g)))
		}, f, e)
	},
	setCrossOrigin: function(a) {
		this.crossOrigin = a
	},
	parse: function(j) {
		var e = new THREE.BufferGeometry();
		var d = j.data.attributes;
		for (var h in d) {
			var b = d[h];
			var f = new self[b.type](b.array);
			e.addAttribute(h, new THREE.BufferAttribute(f, b.itemSize))
		}
		var c = j.data.offsets;
		if (c !== undefined) {
			e.offsets = JSON.parse(JSON.stringify(c))
		}
		var g = j.data.boundingSphere;
		if (g !== undefined) {
			var a = new THREE.Vector3();
			if (g.center !== undefined) {
				a.fromArray(g.center)
			}
			e.boundingSphere = new THREE.Sphere(a, g.radius)
		}
		return e
	}
};
THREE.MaterialLoader = function(a) {
	this.manager = (a !== undefined) ? a : THREE.DefaultLoadingManager
};
THREE.MaterialLoader.prototype = {
	constructor: THREE.MaterialLoader,
	load: function(b, d, f, e) {
		var c = this;
		var a = new THREE.XHRLoader(c.manager);
		a.setCrossOrigin(this.crossOrigin);
		a.load(b, function(g) {
			d(c.parse(JSON.parse(g)))
		}, f, e)
	},
	setCrossOrigin: function(a) {
		this.crossOrigin = a
	},
	parse: function(c) {
		var d = new THREE[c.type];
		if (c.color !== undefined) {
			d.color.setHex(c.color)
		}
		if (c.emissive !== undefined) {
			d.emissive.setHex(c.emissive)
		}
		if (c.specular !== undefined) {
			d.specular.setHex(c.specular)
		}
		if (c.shininess !== undefined) {
			d.shininess = c.shininess
		}
		if (c.uniforms !== undefined) {
			d.uniforms = c.uniforms
		}
		if (c.vertexShader !== undefined) {
			d.vertexShader = c.vertexShader
		}
		if (c.fragmentShader !== undefined) {
			d.fragmentShader = c.fragmentShader
		}
		if (c.vertexColors !== undefined) {
			d.vertexColors = c.vertexColors
		}
		if (c.shading !== undefined) {
			d.shading = c.shading
		}
		if (c.blending !== undefined) {
			d.blending = c.blending
		}
		if (c.side !== undefined) {
			d.side = c.side
		}
		if (c.opacity !== undefined) {
			d.opacity = c.opacity
		}
		if (c.transparent !== undefined) {
			d.transparent = c.transparent
		}
		if (c.wireframe !== undefined) {
			d.wireframe = c.wireframe
		}
		if (c.size !== undefined) {
			d.size = c.size
		}
		if (c.sizeAttenuation !== undefined) {
			d.sizeAttenuation = c.sizeAttenuation
		}
		if (c.materials !== undefined) {
			for (var b = 0, a = c.materials.length; b < a; b++) {
				d.materials.push(this.parse(c.materials[b]))
			}
		}
		return d
	}
};
THREE.ObjectLoader = function(a) {
	this.manager = (a !== undefined) ? a : THREE.DefaultLoadingManager;
	this.texturePath = ""
};
THREE.ObjectLoader.prototype = {
	constructor: THREE.ObjectLoader,
	load: function(b, d, f, e) {
		if (this.texturePath === "") {
			this.texturePath = b.substring(0, b.lastIndexOf("/") + 1)
		}
		var c = this;
		var a = new THREE.XHRLoader(c.manager);
		a.setCrossOrigin(this.crossOrigin);
		a.load(b, function(g) {
			c.parse(JSON.parse(g), d)
		}, f, e)
	},
	setTexturePath: function(a) {
		this.texturePath = a
	},
	setCrossOrigin: function(a) {
		this.crossOrigin = a
	},
	parse: function(e, g) {
		var f = this.parseGeometries(e.geometries);
		var b = this.parseImages(e.images, function() {
			if (g !== undefined) {
				g(d)
			}
		});
		var a = this.parseTextures(e.textures, b);
		var c = this.parseMaterials(e.materials, a);
		var d = this.parseObject(e.object, f, c);
		if (e.images === undefined || e.images.length === 0) {
			if (g !== undefined) {
				g(d)
			}
		}
		return d
	},
	parseGeometries: function(d) {
		var e = {};
		if (d !== undefined) {
			var b = new THREE.JSONLoader();
			var g = new THREE.BufferGeometryLoader();
			for (var c = 0, a = d.length; c < a; c++) {
				var h;
				var f = d[c];
				switch (f.type) {
					case "PlaneGeometry":
					case "PlaneBufferGeometry":
						h = new THREE[f.type](f.width, f.height, f.widthSegments, f.heightSegments);
						break;
					case "BoxGeometry":
					case "CubeGeometry":
						h = new THREE.BoxGeometry(f.width, f.height, f.depth, f.widthSegments, f.heightSegments, f.depthSegments);
						break;
					case "CircleGeometry":
						h = new THREE.CircleGeometry(f.radius, f.segments);
						break;
					case "CylinderGeometry":
						h = new THREE.CylinderGeometry(f.radiusTop, f.radiusBottom, f.height, f.radialSegments, f.heightSegments, f.openEnded);
						break;
					case "SphereGeometry":
						h = new THREE.SphereGeometry(f.radius, f.widthSegments, f.heightSegments, f.phiStart, f.phiLength, f.thetaStart, f.thetaLength);
						break;
					case "IcosahedronGeometry":
						h = new THREE.IcosahedronGeometry(f.radius, f.detail);
						break;
					case "TorusGeometry":
						h = new THREE.TorusGeometry(f.radius, f.tube, f.radialSegments, f.tubularSegments, f.arc);
						break;
					case "TorusKnotGeometry":
						h = new THREE.TorusKnotGeometry(f.radius, f.tube, f.radialSegments, f.tubularSegments, f.p, f.q, f.heightScale);
						break;
					case "BufferGeometry":
						h = g.parse(f);
						break;
					case "Geometry":
						h = b.parse(f.data).geometry;
						break
				}
				h.uuid = f.uuid;
				if (f.name !== undefined) {
					h.name = f.name
				}
				e[f.uuid] = h
			}
		}
		return e
	},
	parseMaterials: function(j, f) {
		var h = {};
		if (j !== undefined) {
			var b = function(k) {
				if (f[k] === undefined) {
					THREE.warn("THREE.ObjectLoader: Undefined texture", k)
				}
				return f[k]
			};
			var g = new THREE.MaterialLoader();
			for (var d = 0, a = j.length; d < a; d++) {
				var c = j[d];
				var e = g.parse(c);
				e.uuid = c.uuid;
				if (c.name !== undefined) {
					e.name = c.name
				}
				if (c.map !== undefined) {
					e.map = b(c.map)
				}
				if (c.bumpMap !== undefined) {
					e.bumpMap = b(c.bumpMap);
					if (c.bumpScale) {
						e.bumpScale = new THREE.Vector2(c.bumpScale, c.bumpScale)
					}
				}
				if (c.alphaMap !== undefined) {
					e.alphaMap = b(c.alphaMap)
				}
				if (c.envMap !== undefined) {
					e.envMap = b(c.envMap)
				}
				if (c.normalMap !== undefined) {
					e.normalMap = b(c.normalMap);
					if (c.normalScale) {
						e.normalScale = new THREE.Vector2(c.normalScale, c.normalScale)
					}
				}
				if (c.lightMap !== undefined) {
					e.lightMap = b(c.lightMap)
				}
				if (c.specularMap !== undefined) {
					e.specularMap = b(c.specularMap)
				}
				h[c.uuid] = e
			}
		}
		return h
	},
	parseImages: function(k, f) {
		var j = this;
		var g = {};
		if (k !== undefined && k.length > 0) {
			var d = new THREE.LoadingManager(f);
			var h = new THREE.ImageLoader(d);
			h.setCrossOrigin(this.crossOrigin);
			var a = function(l) {
				j.manager.itemStart(l);
				return h.load(l, function() {
					j.manager.itemEnd(l)
				})
			};
			for (var e = 0, c = k.length; e < c; e++) {
				var b = k[e];
				var m = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(b.url) ? b.url : j.texturePath + b.url;
				g[b.uuid] = a(m)
			}
		}
		return g
	},
	parseTextures: function(e, b) {
		var a = {};
		if (e !== undefined) {
			for (var d = 0, c = e.length; d < c; d++) {
				var g = e[d];
				if (g.image === undefined) {
					THREE.warn('THREE.ObjectLoader: No "image" speficied for', g.uuid)
				}
				if (b[g.image] === undefined) {
					THREE.warn("THREE.ObjectLoader: Undefined image", g.image)
				}
				var f = new THREE.Texture(b[g.image]);
				f.needsUpdate = true;
				f.uuid = g.uuid;
				if (g.name !== undefined) {
					f.name = g.name
				}
				if (g.repeat !== undefined) {
					f.repeat = new THREE.Vector2(g.repeat[0], g.repeat[1])
				}
				if (g.minFilter !== undefined) {
					f.minFilter = THREE[g.minFilter]
				}
				if (g.magFilter !== undefined) {
					f.magFilter = THREE[g.magFilter]
				}
				if (g.anisotropy !== undefined) {
					f.anisotropy = g.anisotropy
				}
				if (g.wrap instanceof Array) {
					f.wrapS = THREE[g.wrap[0]];
					f.wrapT = THREE[g.wrap[1]]
				}
				a[g.uuid] = f
			}
		}
		return a
	},
	parseObject: function() {
		var a = new THREE.Matrix4();
		return function(g, f, c) {
			var d;
			var e = function(j) {
				if (f[j] === undefined) {
					THREE.warn("THREE.ObjectLoader: Undefined geometry", j)
				}
				return f[j]
			};
			var b = function(j) {
				if (c[j] === undefined) {
					THREE.warn("THREE.ObjectLoader: Undefined material", j)
				}
				return c[j]
			};
			switch (g.type) {
				case "Scene":
					d = new THREE.Scene();
					break;
				case "PerspectiveCamera":
					d = new THREE.PerspectiveCamera(g.fov, g.aspect, g.near, g.far);
					break;
				case "OrthographicCamera":
					d = new THREE.OrthographicCamera(g.left, g.right, g.top, g.bottom, g.near, g.far);
					break;
				case "AmbientLight":
					d = new THREE.AmbientLight(g.color);
					break;
				case "DirectionalLight":
					d = new THREE.DirectionalLight(g.color, g.intensity);
					break;
				case "PointLight":
					d = new THREE.PointLight(g.color, g.intensity, g.distance, g.decay);
					break;
				case "SpotLight":
					d = new THREE.SpotLight(g.color, g.intensity, g.distance, g.angle, g.exponent, g.decay);
					break;
				case "HemisphereLight":
					d = new THREE.HemisphereLight(g.color, g.groundColor, g.intensity);
					break;
				case "Mesh":
					d = new THREE.Mesh(e(g.geometry), b(g.material));
					break;
				case "Line":
					d = new THREE.Line(e(g.geometry), b(g.material), g.mode);
					break;
				case "PointCloud":
					d = new THREE.PointCloud(e(g.geometry), b(g.material));
					break;
				case "Sprite":
					d = new THREE.Sprite(b(g.material));
					break;
				case "Group":
					d = new THREE.Group();
					break;
				default:
					d = new THREE.Object3D()
			}
			d.uuid = g.uuid;
			if (g.name !== undefined) {
				d.name = g.name
			}
			if (g.matrix !== undefined) {
				a.fromArray(g.matrix);
				a.decompose(d.position, d.quaternion, d.scale)
			} else {
				if (g.position !== undefined) {
					d.position.fromArray(g.position)
				}
				if (g.rotation !== undefined) {
					d.rotation.fromArray(g.rotation)
				}
				if (g.scale !== undefined) {
					d.scale.fromArray(g.scale)
				}
			}
			if (g.visible !== undefined) {
				d.visible = g.visible
			}
			if (g.userData !== undefined) {
				d.userData = g.userData
			}
			if (g.children !== undefined) {
				for (var h in g.children) {
					d.add(this.parseObject(g.children[h], f, c))
				}
			}
			return d
		}
	}()
};
THREE.TextureLoader = function(a) {
	this.manager = (a !== undefined) ? a : THREE.DefaultLoadingManager
};
THREE.TextureLoader.prototype = {
	constructor: THREE.TextureLoader,
	load: function(b, d, f, e) {
		var c = this;
		var a = new THREE.ImageLoader(c.manager);
		a.setCrossOrigin(this.crossOrigin);
		a.load(b, function(h) {
			var g = new THREE.Texture(h);
			g.needsUpdate = true;
			if (d !== undefined) {
				d(g)
			}
		}, f, e)
	},
	setCrossOrigin: function(a) {
		this.crossOrigin = a
	}
};
THREE.DataTextureLoader = THREE.BinaryTextureLoader = function() {
	this._parser = null
};
THREE.BinaryTextureLoader.prototype = {
	constructor: THREE.BinaryTextureLoader,
	load: function(b, d, g, f) {
		var c = this;
		var e = new THREE.DataTexture();
		var a = new THREE.XHRLoader();
		a.setResponseType("arraybuffer");
		a.load(b, function(h) {
			var j = c._parser(h);
			if (!j) {
				return
			}
			if (undefined !== j.image) {
				e.image = j.image
			} else {
				if (undefined !== j.data) {
					e.image.width = j.width;
					e.image.height = j.height;
					e.image.data = j.data
				}
			}
			e.wrapS = undefined !== j.wrapS ? j.wrapS : THREE.ClampToEdgeWrapping;
			e.wrapT = undefined !== j.wrapT ? j.wrapT : THREE.ClampToEdgeWrapping;
			e.magFilter = undefined !== j.magFilter ? j.magFilter : THREE.LinearFilter;
			e.minFilter = undefined !== j.minFilter ? j.minFilter : THREE.LinearMipMapLinearFilter;
			e.anisotropy = undefined !== j.anisotropy ? j.anisotropy : 1;
			if (undefined !== j.format) {
				e.format = j.format
			}
			if (undefined !== j.type) {
				e.type = j.type
			}
			if (undefined !== j.mipmaps) {
				e.mipmaps = j.mipmaps
			}
			if (1 === j.mipmapCount) {
				e.minFilter = THREE.LinearFilter
			}
			e.needsUpdate = true;
			if (d) {
				d(e, j)
			}
		}, g, f);
		return e
	}
};
THREE.CompressedTextureLoader = function() {
	this._parser = null
};
THREE.CompressedTextureLoader.prototype = {
	constructor: THREE.CompressedTextureLoader,
	load: function(a, g, d) {
		var l = this;
		var h = [];
		var e = new THREE.CompressedTexture();
		e.image = h;
		var k = new THREE.XHRLoader();
		k.setResponseType("arraybuffer");
		if (a instanceof Array) {
			var c = 0;
			var f = function(m) {
				k.load(a[m], function(n) {
					var o = l._parser(n, true);
					h[m] = {
						width: o.width,
						height: o.height,
						format: o.format,
						mipmaps: o.mipmaps
					};
					c += 1;
					if (c === 6) {
						if (o.mipmapCount == 1) {
							e.minFilter = THREE.LinearFilter
						}
						e.format = o.format;
						e.needsUpdate = true;
						if (g) {
							g(e)
						}
					}
				})
			};
			for (var b = 0, j = a.length; b < j; ++b) {
				f(b)
			}
		} else {
			k.load(a, function(n) {
				var q = l._parser(n, true);
				if (q.isCubemap) {
					var m = q.mipmaps.length / q.mipmapCount;
					for (var p = 0; p < m; p++) {
						h[p] = {
							mipmaps: []
						};
						for (var o = 0; o < q.mipmapCount; o++) {
							h[p].mipmaps.push(q.mipmaps[p * q.mipmapCount + o]);
							h[p].format = q.format;
							h[p].width = q.width;
							h[p].height = q.height
						}
					}
				} else {
					e.image.width = q.width;
					e.image.height = q.height;
					e.mipmaps = q.mipmaps
				}
				if (q.mipmapCount === 1) {
					e.minFilter = THREE.LinearFilter
				}
				e.format = q.format;
				e.needsUpdate = true;
				if (g) {
					g(e)
				}
			})
		}
		return e
	}
};
THREE.Material = function() {
	Object.defineProperty(this, "id", {
		value: THREE.MaterialIdCount++
	});
	this.uuid = THREE.Math.generateUUID();
	this.name = "";
	this.type = "Material";
	this.side = THREE.FrontSide;
	this.opacity = 1;
	this.transparent = false;
	this.blending = THREE.NormalBlending;
	this.blendSrc = THREE.SrcAlphaFactor;
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = THREE.AddEquation;
	this.blendSrcAlpha = null;
	this.blendDstAlpha = null;
	this.blendEquationAlpha = null;
	this.depthTest = true;
	this.depthWrite = true;
	this.colorWrite = true;
	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;
	this.alphaTest = 0;
	this.overdraw = 0;
	this.visible = true;
	this._needsUpdate = true
};
THREE.Material.prototype = {
	constructor: THREE.Material,
	get needsUpdate() {
		return this._needsUpdate
	},
	set needsUpdate(a) {
		if (a === true) {
			this.update()
		}
		this._needsUpdate = a
	},
	setValues: function(a) {
		if (a === undefined) {
			return
		}
		for (var b in a) {
			var d = a[b];
			if (d === undefined) {
				THREE.warn("THREE.Material: '" + b + "' parameter is undefined.");
				continue
			}
			if (b in this) {
				var c = this[b];
				if (c instanceof THREE.Color) {
					c.set(d)
				} else {
					if (c instanceof THREE.Vector3 && d instanceof THREE.Vector3) {
						c.copy(d)
					} else {
						if (b == "overdraw") {
							this[b] = Number(d)
						} else {
							this[b] = d
						}
					}
				}
			}
		}
	},
	toJSON: function() {
		var a = {
			metadata: {
				version: 4.2,
				type: "material",
				generator: "MaterialExporter"
			},
			uuid: this.uuid,
			type: this.type
		};
		if (this.name !== "") {
			a.name = this.name
		}
		if (this instanceof THREE.MeshBasicMaterial) {
			a.color = this.color.getHex();
			if (this.vertexColors !== THREE.NoColors) {
				a.vertexColors = this.vertexColors
			}
			if (this.blending !== THREE.NormalBlending) {
				a.blending = this.blending
			}
			if (this.side !== THREE.FrontSide) {
				a.side = this.side
			}
		} else {
			if (this instanceof THREE.MeshLambertMaterial) {
				a.color = this.color.getHex();
				a.emissive = this.emissive.getHex();
				if (this.vertexColors !== THREE.NoColors) {
					a.vertexColors = this.vertexColors
				}
				if (this.shading !== THREE.SmoothShading) {
					a.shading = this.shading
				}
				if (this.blending !== THREE.NormalBlending) {
					a.blending = this.blending
				}
				if (this.side !== THREE.FrontSide) {
					a.side = this.side
				}
			} else {
				if (this instanceof THREE.MeshPhongMaterial) {
					a.color = this.color.getHex();
					a.emissive = this.emissive.getHex();
					a.specular = this.specular.getHex();
					a.shininess = this.shininess;
					if (this.vertexColors !== THREE.NoColors) {
						a.vertexColors = this.vertexColors
					}
					if (this.shading !== THREE.SmoothShading) {
						a.shading = this.shading
					}
					if (this.blending !== THREE.NormalBlending) {
						a.blending = this.blending
					}
					if (this.side !== THREE.FrontSide) {
						a.side = this.side
					}
				} else {
					if (this instanceof THREE.MeshNormalMaterial) {
						if (this.blending !== THREE.NormalBlending) {
							a.blending = this.blending
						}
						if (this.side !== THREE.FrontSide) {
							a.side = this.side
						}
					} else {
						if (this instanceof THREE.MeshDepthMaterial) {
							if (this.blending !== THREE.NormalBlending) {
								a.blending = this.blending
							}
							if (this.side !== THREE.FrontSide) {
								a.side = this.side
							}
						} else {
							if (this instanceof THREE.PointCloudMaterial) {
								a.size = this.size;
								a.sizeAttenuation = this.sizeAttenuation;
								a.color = this.color.getHex();
								if (this.vertexColors !== THREE.NoColors) {
									a.vertexColors = this.vertexColors
								}
								if (this.blending !== THREE.NormalBlending) {
									a.blending = this.blending
								}
							} else {
								if (this instanceof THREE.ShaderMaterial) {
									a.uniforms = this.uniforms;
									a.vertexShader = this.vertexShader;
									a.fragmentShader = this.fragmentShader
								} else {
									if (this instanceof THREE.SpriteMaterial) {
										a.color = this.color.getHex()
									}
								}
							}
						}
					}
				}
			}
		}
		if (this.opacity < 1) {
			a.opacity = this.opacity
		}
		if (this.transparent !== false) {
			a.transparent = this.transparent
		}
		if (this.wireframe !== false) {
			a.wireframe = this.wireframe
		}
		return a
	},
	clone: function(a) {
		if (a === undefined) {
			a = new THREE.Material()
		}
		a.name = this.name;
		a.side = this.side;
		a.opacity = this.opacity;
		a.transparent = this.transparent;
		a.blending = this.blending;
		a.blendSrc = this.blendSrc;
		a.blendDst = this.blendDst;
		a.blendEquation = this.blendEquation;
		a.blendSrcAlpha = this.blendSrcAlpha;
		a.blendDstAlpha = this.blendDstAlpha;
		a.blendEquationAlpha = this.blendEquationAlpha;
		a.depthTest = this.depthTest;
		a.depthWrite = this.depthWrite;
		a.polygonOffset = this.polygonOffset;
		a.polygonOffsetFactor = this.polygonOffsetFactor;
		a.polygonOffsetUnits = this.polygonOffsetUnits;
		a.alphaTest = this.alphaTest;
		a.overdraw = this.overdraw;
		a.visible = this.visible;
		return a
	},
	update: function() {
		this.dispatchEvent({
			type: "update"
		})
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.EventDispatcher.prototype.apply(THREE.Material.prototype);
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "LineBasicMaterial";
	this.color = new THREE.Color(16777215);
	this.linewidth = 1;
	this.linecap = "round";
	this.linejoin = "round";
	this.vertexColors = THREE.NoColors;
	this.fog = true;
	this.setValues(a)
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.LineBasicMaterial.prototype.clone = function() {
	var a = new THREE.LineBasicMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.linewidth = this.linewidth;
	a.linecap = this.linecap;
	a.linejoin = this.linejoin;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.LineDashedMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "LineDashedMaterial";
	this.color = new THREE.Color(16777215);
	this.linewidth = 1;
	this.scale = 1;
	this.dashSize = 3;
	this.gapSize = 1;
	this.vertexColors = false;
	this.fog = true;
	this.setValues(a)
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.constructor = THREE.LineDashedMaterial;
THREE.LineDashedMaterial.prototype.clone = function() {
	var a = new THREE.LineDashedMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.linewidth = this.linewidth;
	a.scale = this.scale;
	a.dashSize = this.dashSize;
	a.gapSize = this.gapSize;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.MeshBasicMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "MeshBasicMaterial";
	this.color = new THREE.Color(16777215);
	this.map = null;
	this.lightMap = null;
	this.specularMap = null;
	this.alphaMap = null;
	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = true;
	this.shading = THREE.SmoothShading;
	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = "round";
	this.wireframeLinejoin = "round";
	this.vertexColors = THREE.NoColors;
	this.skinning = false;
	this.morphTargets = false;
	this.setValues(a)
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshBasicMaterial.prototype.clone = function() {
	var a = new THREE.MeshBasicMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.specularMap = this.specularMap;
	a.alphaMap = this.alphaMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	return a
};
THREE.MeshLambertMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "MeshLambertMaterial";
	this.color = new THREE.Color(16777215);
	this.emissive = new THREE.Color(0);
	this.wrapAround = false;
	this.wrapRGB = new THREE.Vector3(1, 1, 1);
	this.map = null;
	this.lightMap = null;
	this.specularMap = null;
	this.alphaMap = null;
	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = true;
	this.shading = THREE.SmoothShading;
	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = "round";
	this.wireframeLinejoin = "round";
	this.vertexColors = THREE.NoColors;
	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;
	this.setValues(a)
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshLambertMaterial.prototype.clone = function() {
	var a = new THREE.MeshLambertMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.emissive.copy(this.emissive);
	a.wrapAround = this.wrapAround;
	a.wrapRGB.copy(this.wrapRGB);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.specularMap = this.specularMap;
	a.alphaMap = this.alphaMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.MeshPhongMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "MeshPhongMaterial";
	this.color = new THREE.Color(16777215);
	this.emissive = new THREE.Color(0);
	this.specular = new THREE.Color(1118481);
	this.shininess = 30;
	this.metal = false;
	this.wrapAround = false;
	this.wrapRGB = new THREE.Vector3(1, 1, 1);
	this.map = null;
	this.lightMap = null;
	this.bumpMap = null;
	this.bumpScale = 1;
	this.normalMap = null;
	this.normalScale = new THREE.Vector2(1, 1);
	this.specularMap = null;
	this.alphaMap = null;
	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;
	this.fog = true;
	this.shading = THREE.SmoothShading;
	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = "round";
	this.wireframeLinejoin = "round";
	this.vertexColors = THREE.NoColors;
	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;
	this.setValues(a)
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshPhongMaterial.prototype.clone = function() {
	var a = new THREE.MeshPhongMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.emissive.copy(this.emissive);
	a.specular.copy(this.specular);
	a.shininess = this.shininess;
	a.metal = this.metal;
	a.wrapAround = this.wrapAround;
	a.wrapRGB.copy(this.wrapRGB);
	a.map = this.map;
	a.lightMap = this.lightMap;
	a.bumpMap = this.bumpMap;
	a.bumpScale = this.bumpScale;
	a.normalMap = this.normalMap;
	a.normalScale.copy(this.normalScale);
	a.specularMap = this.specularMap;
	a.alphaMap = this.alphaMap;
	a.envMap = this.envMap;
	a.combine = this.combine;
	a.reflectivity = this.reflectivity;
	a.refractionRatio = this.refractionRatio;
	a.fog = this.fog;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.wireframeLinecap = this.wireframeLinecap;
	a.wireframeLinejoin = this.wireframeLinejoin;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.MeshDepthMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "MeshDepthMaterial";
	this.morphTargets = false;
	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.setValues(a)
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshDepthMaterial.prototype.clone = function() {
	var a = new THREE.MeshDepthMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	return a
};
THREE.MeshNormalMaterial = function(a) {
	THREE.Material.call(this, a);
	this.type = "MeshNormalMaterial";
	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.morphTargets = false;
	this.setValues(a)
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshNormalMaterial.prototype.clone = function() {
	var a = new THREE.MeshNormalMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	return a
};
THREE.MeshFaceMaterial = function(a) {
	this.uuid = THREE.Math.generateUUID();
	this.type = "MeshFaceMaterial";
	this.materials = a instanceof Array ? a : []
};
THREE.MeshFaceMaterial.prototype = {
	constructor: THREE.MeshFaceMaterial,
	toJSON: function() {
		var b = {
			metadata: {
				version: 4.2,
				type: "material",
				generator: "MaterialExporter"
			},
			uuid: this.uuid,
			type: this.type,
			materials: []
		};
		for (var c = 0, a = this.materials.length; c < a; c++) {
			b.materials.push(this.materials[c].toJSON())
		}
		return b
	},
	clone: function() {
		var b = new THREE.MeshFaceMaterial();
		for (var a = 0; a < this.materials.length; a++) {
			b.materials.push(this.materials[a].clone())
		}
		return b
	}
};
THREE.PointCloudMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "PointCloudMaterial";
	this.color = new THREE.Color(16777215);
	this.map = null;
	this.size = 1;
	this.sizeAttenuation = true;
	this.vertexColors = THREE.NoColors;
	this.fog = true;
	this.setValues(a)
};
THREE.PointCloudMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.PointCloudMaterial.prototype.constructor = THREE.PointCloudMaterial;
THREE.PointCloudMaterial.prototype.clone = function() {
	var a = new THREE.PointCloudMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.size = this.size;
	a.sizeAttenuation = this.sizeAttenuation;
	a.vertexColors = this.vertexColors;
	a.fog = this.fog;
	return a
};
THREE.ParticleBasicMaterial = function(a) {
	THREE.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial.");
	return new THREE.PointCloudMaterial(a)
};
THREE.ParticleSystemMaterial = function(a) {
	THREE.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial.");
	return new THREE.PointCloudMaterial(a)
};
THREE.ShaderMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "ShaderMaterial";
	this.defines = {};
	this.uniforms = {};
	this.attributes = null;
	this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
	this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
	this.shading = THREE.SmoothShading;
	this.linewidth = 1;
	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.fog = false;
	this.lights = false;
	this.vertexColors = THREE.NoColors;
	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;
	this.defaultAttributeValues = {
		color: [1, 1, 1],
		uv: [0, 0],
		uv2: [0, 0]
	};
	this.index0AttributeName = undefined;
	this.setValues(a)
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;
THREE.ShaderMaterial.prototype.clone = function() {
	var a = new THREE.ShaderMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.fragmentShader = this.fragmentShader;
	a.vertexShader = this.vertexShader;
	a.uniforms = THREE.UniformsUtils.clone(this.uniforms);
	a.attributes = this.attributes;
	a.defines = this.defines;
	a.shading = this.shading;
	a.wireframe = this.wireframe;
	a.wireframeLinewidth = this.wireframeLinewidth;
	a.fog = this.fog;
	a.lights = this.lights;
	a.vertexColors = this.vertexColors;
	a.skinning = this.skinning;
	a.morphTargets = this.morphTargets;
	a.morphNormals = this.morphNormals;
	return a
};
THREE.RawShaderMaterial = function(a) {
	THREE.ShaderMaterial.call(this, a);
	this.type = "RawShaderMaterial"
};
THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.RawShaderMaterial.prototype.constructor = THREE.RawShaderMaterial;
THREE.RawShaderMaterial.prototype.clone = function() {
	var a = new THREE.RawShaderMaterial();
	THREE.ShaderMaterial.prototype.clone.call(this, a);
	return a
};
THREE.SpriteMaterial = function(a) {
	THREE.Material.call(this);
	this.type = "SpriteMaterial";
	this.color = new THREE.Color(16777215);
	this.map = null;
	this.rotation = 0;
	this.fog = false;
	this.setValues(a)
};
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.constructor = THREE.SpriteMaterial;
THREE.SpriteMaterial.prototype.clone = function() {
	var a = new THREE.SpriteMaterial();
	THREE.Material.prototype.clone.call(this, a);
	a.color.copy(this.color);
	a.map = this.map;
	a.rotation = this.rotation;
	a.fog = this.fog;
	return a
};
THREE.Texture = function(d, b, f, e, j, c, h, g, a) {
	Object.defineProperty(this, "id", {
		value: THREE.TextureIdCount++
	});
	this.uuid = THREE.Math.generateUUID();
	this.name = "";
	this.sourceFile = "";
	this.image = d !== undefined ? d : THREE.Texture.DEFAULT_IMAGE;
	this.mipmaps = [];
	this.mapping = b !== undefined ? b : THREE.Texture.DEFAULT_MAPPING;
	this.wrapS = f !== undefined ? f : THREE.ClampToEdgeWrapping;
	this.wrapT = e !== undefined ? e : THREE.ClampToEdgeWrapping;
	this.magFilter = j !== undefined ? j : THREE.LinearFilter;
	this.minFilter = c !== undefined ? c : THREE.LinearMipMapLinearFilter;
	this.anisotropy = a !== undefined ? a : 1;
	this.format = h !== undefined ? h : THREE.RGBAFormat;
	this.type = g !== undefined ? g : THREE.UnsignedByteType;
	this.offset = new THREE.Vector2(0, 0);
	this.repeat = new THREE.Vector2(1, 1);
	this.generateMipmaps = true;
	this.premultiplyAlpha = false;
	this.flipY = true;
	this.unpackAlignment = 4;
	this._needsUpdate = false;
	this.onUpdate = null
};
THREE.Texture.DEFAULT_IMAGE = undefined;
THREE.Texture.DEFAULT_MAPPING = THREE.UVMapping;
THREE.Texture.prototype = {
	constructor: THREE.Texture,
	get needsUpdate() {
		return this._needsUpdate
	},
	set needsUpdate(a) {
		if (a === true) {
			this.update()
		}
		this._needsUpdate = a
	},
	clone: function(a) {
		if (a === undefined) {
			a = new THREE.Texture()
		}
		a.image = this.image;
		a.mipmaps = this.mipmaps.slice(0);
		a.mapping = this.mapping;
		a.wrapS = this.wrapS;
		a.wrapT = this.wrapT;
		a.magFilter = this.magFilter;
		a.minFilter = this.minFilter;
		a.anisotropy = this.anisotropy;
		a.format = this.format;
		a.type = this.type;
		a.offset.copy(this.offset);
		a.repeat.copy(this.repeat);
		a.generateMipmaps = this.generateMipmaps;
		a.premultiplyAlpha = this.premultiplyAlpha;
		a.flipY = this.flipY;
		a.unpackAlignment = this.unpackAlignment;
		return a
	},
	update: function() {
		this.dispatchEvent({
			type: "update"
		})
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype);
THREE.TextureIdCount = 0;
THREE.CubeTexture = function(g, b, e, d, j, c, h, f, a) {
	b = b !== undefined ? b : THREE.CubeReflectionMapping;
	THREE.Texture.call(this, g, b, e, d, j, c, h, f, a);
	this.images = g
};
THREE.CubeTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CubeTexture.prototype.constructor = THREE.CubeTexture;
THREE.CubeTexture.clone = function(a) {
	if (a === undefined) {
		a = new THREE.CubeTexture()
	}
	THREE.Texture.prototype.clone.call(this, a);
	a.images = this.images;
	return a
};
THREE.CompressedTexture = function(e, d, l, j, h, b, g, f, k, c, a) {
	THREE.Texture.call(this, null, b, g, f, k, c, j, h, a);
	this.image = {
		width: d,
		height: l
	};
	this.mipmaps = e;
	this.flipY = false;
	this.generateMipmaps = false
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.constructor = THREE.CompressedTexture;
THREE.CompressedTexture.prototype.clone = function() {
	var a = new THREE.CompressedTexture();
	THREE.Texture.prototype.clone.call(this, a);
	return a
};
THREE.DataTexture = function(f, d, l, j, h, b, g, e, k, c, a) {
	THREE.Texture.call(this, null, b, g, e, k, c, j, h, a);
	this.image = {
		data: f,
		width: d,
		height: l
	}
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.constructor = THREE.DataTexture;
THREE.DataTexture.prototype.clone = function() {
	var a = new THREE.DataTexture();
	THREE.Texture.prototype.clone.call(this, a);
	return a
};
THREE.VideoTexture = function(c, b, g, f, k, d, j, h, a) {
	THREE.Texture.call(this, c, b, g, f, k, d, j, h, a);
	this.generateMipmaps = false;
	var l = this;
	var e = function() {
		requestAnimationFrame(e);
		if (c.readyState === c.HAVE_ENOUGH_DATA) {
			l.needsUpdate = true
		}
	};
	e()
};
THREE.VideoTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.VideoTexture.prototype.constructor = THREE.VideoTexture;
THREE.Group = function() {
	THREE.Object3D.call(this);
	this.type = "Group"
};
THREE.Group.prototype = Object.create(THREE.Object3D.prototype);
THREE.Group.prototype.constructor = THREE.Group;
THREE.PointCloud = function(b, a) {
	THREE.Object3D.call(this);
	this.type = "PointCloud";
	this.geometry = b !== undefined ? b : new THREE.Geometry();
	this.material = a !== undefined ? a : new THREE.PointCloudMaterial({
		color: Math.random() * 16777215
	})
};
THREE.PointCloud.prototype = Object.create(THREE.Object3D.prototype);
THREE.PointCloud.prototype.constructor = THREE.PointCloud;
THREE.PointCloud.prototype.raycast = (function() {
	var b = new THREE.Matrix4();
	var a = new THREE.Ray();
	return function(v, c) {
		var E = this;
		var g = E.geometry;
		var e = v.params.PointCloud.threshold;
		b.getInverse(this.matrixWorld);
		a.copy(v.ray).applyMatrix4(b);
		if (g.boundingBox !== null) {
			if (a.isIntersectionBox(g.boundingBox) === false) {
				return
			}
		}
		var d = e / ((this.scale.x + this.scale.y + this.scale.z) / 3);
		var D = new THREE.Vector3();
		var t = function(F, H) {
			var J = a.distanceToPoint(F);
			if (J < d) {
				var G = a.closestPointToPoint(F);
				G.applyMatrix4(E.matrixWorld);
				var I = v.ray.origin.distanceTo(G);
				c.push({
					distance: I,
					distanceToRay: J,
					point: G.clone(),
					index: H,
					face: null,
					object: E
				})
			}
		};
		if (g instanceof THREE.BufferGeometry) {
			var p = g.attributes;
			var o = p.position.array;
			if (p.index !== undefined) {
				var h = p.index.array;
				var k = g.offsets;
				if (k.length === 0) {
					var j = {
						start: 0,
						count: h.length,
						index: 0
					};
					k = [j]
				}
				for (var u = 0, r = k.length; u < r; ++u) {
					var f = k[u].start;
					var n = k[u].count;
					var m = k[u].index;
					for (var A = f, q = f + n; A < q; A++) {
						var C = m + h[A];
						D.fromArray(o, C * 3);
						t(D, C)
					}
				}
			} else {
				var B = o.length / 3;
				for (var A = 0; A < B; A++) {
					D.set(o[3 * A], o[3 * A + 1], o[3 * A + 2]);
					t(D, A)
				}
			}
		} else {
			var l = this.geometry.vertices;
			for (var A = 0; A < l.length; A++) {
				t(l[A], A)
			}
		}
	}
}());
THREE.PointCloud.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.PointCloud(this.geometry, this.material)
	}
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.ParticleSystem = function(b, a) {
	THREE.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud.");
	return new THREE.PointCloud(b, a)
};
THREE.Line = function(c, a, b) {
	THREE.Object3D.call(this);
	this.type = "Line";
	this.geometry = c !== undefined ? c : new THREE.Geometry();
	this.material = a !== undefined ? a : new THREE.LineBasicMaterial({
		color: Math.random() * 16777215
	});
	this.mode = b !== undefined ? b : THREE.LineStrip
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.constructor = THREE.Line;
THREE.Line.prototype.raycast = (function() {
	var c = new THREE.Matrix4();
	var a = new THREE.Ray();
	var b = new THREE.Sphere();
	return function(v, e) {
		var C = v.linePrecision;
		var G = C * C;
		var j = this.geometry;
		if (j.boundingSphere === null) {
			j.computeBoundingSphere()
		}
		b.copy(j.boundingSphere);
		b.applyMatrix4(this.matrixWorld);
		if (v.ray.isIntersectionSphere(b) === false) {
			return
		}
		c.getInverse(this.matrixWorld);
		a.copy(v.ray).applyMatrix4(c);
		var H = new THREE.Vector3();
		var d = new THREE.Vector3();
		var k = new THREE.Vector3();
		var A = new THREE.Vector3();
		var o = this.mode === THREE.LineStrip ? 1 : 2;
		if (j instanceof THREE.BufferGeometry) {
			var t = j.attributes;
			if (t.index !== undefined) {
				var l = t.index.array;
				var r = t.position.array;
				var m = j.offsets;
				if (m.length === 0) {
					m = [{
						start: 0,
						count: l.length,
						index: 0
					}]
				}
				for (var u = 0; u < m.length; u++) {
					var h = m[u].start;
					var q = m[u].count;
					var p = m[u].index;
					for (var B = h; B < h + q - 1; B += o) {
						var E = p + l[B];
						var D = p + l[B + 1];
						H.fromArray(r, E * 3);
						d.fromArray(r, D * 3);
						var f = a.distanceSqToSegment(H, d, A, k);
						if (f > G) {
							continue
						}
						var g = a.origin.distanceTo(A);
						if (g < v.near || g > v.far) {
							continue
						}
						e.push({
							distance: g,
							point: k.clone().applyMatrix4(this.matrixWorld),
							index: B,
							offsetIndex: u,
							face: null,
							faceIndex: null,
							object: this
						})
					}
				}
			} else {
				var r = t.position.array;
				for (var B = 0; B < r.length / 3 - 1; B += o) {
					H.fromArray(r, 3 * B);
					d.fromArray(r, 3 * B + 3);
					var f = a.distanceSqToSegment(H, d, A, k);
					if (f > G) {
						continue
					}
					var g = a.origin.distanceTo(A);
					if (g < v.near || g > v.far) {
						continue
					}
					e.push({
						distance: g,
						point: k.clone().applyMatrix4(this.matrixWorld),
						index: B,
						face: null,
						faceIndex: null,
						object: this
					})
				}
			}
		} else {
			if (j instanceof THREE.Geometry) {
				var n = j.vertices;
				var F = n.length;
				for (var B = 0; B < F - 1; B += o) {
					var f = a.distanceSqToSegment(n[B], n[B + 1], A, k);
					if (f > G) {
						continue
					}
					var g = a.origin.distanceTo(A);
					if (g < v.near || g > v.far) {
						continue
					}
					e.push({
						distance: g,
						point: k.clone().applyMatrix4(this.matrixWorld),
						index: B,
						face: null,
						faceIndex: null,
						object: this
					})
				}
			}
		}
	}
}());
THREE.Line.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.Line(this.geometry, this.material, this.mode)
	}
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Mesh = function(b, a) {
	THREE.Object3D.call(this);
	this.type = "Mesh";
	this.geometry = b !== undefined ? b : new THREE.Geometry();
	this.material = a !== undefined ? a : new THREE.MeshBasicMaterial({
		color: Math.random() * 16777215
	});
	this.updateMorphTargets()
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.updateMorphTargets = function() {
	if (this.geometry.morphTargets !== undefined && this.geometry.morphTargets.length > 0) {
		this.morphTargetBase = -1;
		this.morphTargetForcedOrder = [];
		this.morphTargetInfluences = [];
		this.morphTargetDictionary = {};
		for (var a = 0, b = this.geometry.morphTargets.length; a < b; a++) {
			this.morphTargetInfluences.push(0);
			this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
		}
	}
};
THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
	if (this.morphTargetDictionary[a] !== undefined) {
		return this.morphTargetDictionary[a]
	}
	THREE.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
	return 0
};
THREE.Mesh.prototype.raycast = (function() {
	var f = new THREE.Matrix4();
	var a = new THREE.Ray();
	var b = new THREE.Sphere();
	var e = new THREE.Vector3();
	var d = new THREE.Vector3();
	var c = new THREE.Vector3();
	return function(K, g) {
		var n = this.geometry;
		if (n.boundingSphere === null) {
			n.computeBoundingSphere()
		}
		b.copy(n.boundingSphere);
		b.applyMatrix4(this.matrixWorld);
		if (K.ray.isIntersectionSphere(b) === false) {
			return
		}
		f.getInverse(this.matrixWorld);
		a.copy(K.ray).applyMatrix4(f);
		if (n.boundingBox !== null) {
			if (a.isIntersectionBox(n.boundingBox) === false) {
				return
			}
		}
		if (n instanceof THREE.BufferGeometry) {
			var G = this.material;
			if (G === undefined) {
				return
			}
			var A = n.attributes;
			var V, T, S;
			var Q = K.precision;
			if (A.index !== undefined) {
				var o = A.index.array;
				var v = A.position.array;
				var p = n.offsets;
				if (p.length === 0) {
					p = [{
						start: 0,
						count: o.length,
						index: 0
					}]
				}
				for (var J = 0, F = p.length; J < F; ++J) {
					var m = p[J].start;
					var r = p[J].count;
					var u = p[J].index;
					for (var P = m, E = m + r; P < E; P += 3) {
						V = u + o[P];
						T = u + o[P + 1];
						S = u + o[P + 2];
						e.fromArray(v, V * 3);
						d.fromArray(v, T * 3);
						c.fromArray(v, S * 3);
						if (G.side === THREE.BackSide) {
							var O = a.intersectTriangle(c, d, e, true)
						} else {
							var O = a.intersectTriangle(e, d, c, G.side !== THREE.DoubleSide)
						}
						if (O === null) {
							continue
						}
						O.applyMatrix4(this.matrixWorld);
						var l = K.ray.origin.distanceTo(O);
						if (l < Q || l < K.near || l > K.far) {
							continue
						}
						g.push({
							distance: l,
							point: O,
							face: new THREE.Face3(V, T, S, THREE.Triangle.normal(e, d, c)),
							faceIndex: null,
							object: this
						})
					}
				}
			} else {
				var v = A.position.array;
				for (var P = 0, N = 0, E = v.length; P < E; P += 3, N += 9) {
					V = P;
					T = P + 1;
					S = P + 2;
					e.fromArray(v, N);
					d.fromArray(v, N + 3);
					c.fromArray(v, N + 6);
					if (G.side === THREE.BackSide) {
						var O = a.intersectTriangle(c, d, e, true)
					} else {
						var O = a.intersectTriangle(e, d, c, G.side !== THREE.DoubleSide)
					}
					if (O === null) {
						continue
					}
					O.applyMatrix4(this.matrixWorld);
					var l = K.ray.origin.distanceTo(O);
					if (l < Q || l < K.near || l > K.far) {
						continue
					}
					g.push({
						distance: l,
						point: O,
						face: new THREE.Face3(V, T, S, THREE.Triangle.normal(e, d, c)),
						faceIndex: null,
						object: this
					})
				}
			}
		} else {
			if (n instanceof THREE.Geometry) {
				var h = this.material instanceof THREE.MeshFaceMaterial;
				var L = h === true ? this.material.materials : null;
				var V, T, S;
				var Q = K.precision;
				var q = n.vertices;
				for (var R = 0, C = n.faces.length; R < C; R++) {
					var B = n.faces[R];
					var G = h === true ? L[B.materialIndex] : this.material;
					if (G === undefined) {
						continue
					}
					V = q[B.a];
					T = q[B.b];
					S = q[B.c];
					if (G.morphTargets === true) {
						var D = n.morphTargets;
						var I = this.morphTargetInfluences;
						e.set(0, 0, 0);
						d.set(0, 0, 0);
						c.set(0, 0, 0);
						for (var H = 0, k = D.length; H < k; H++) {
							var M = I[H];
							if (M === 0) {
								continue
							}
							var U = D[H].vertices;
							e.x += (U[B.a].x - V.x) * M;
							e.y += (U[B.a].y - V.y) * M;
							e.z += (U[B.a].z - V.z) * M;
							d.x += (U[B.b].x - T.x) * M;
							d.y += (U[B.b].y - T.y) * M;
							d.z += (U[B.b].z - T.z) * M;
							c.x += (U[B.c].x - S.x) * M;
							c.y += (U[B.c].y - S.y) * M;
							c.z += (U[B.c].z - S.z) * M
						}
						e.add(V);
						d.add(T);
						c.add(S);
						V = e;
						T = d;
						S = c
					}
					if (G.side === THREE.BackSide) {
						var O = a.intersectTriangle(S, T, V, true)
					} else {
						var O = a.intersectTriangle(V, T, S, G.side !== THREE.DoubleSide)
					}
					if (O === null) {
						continue
					}
					O.applyMatrix4(this.matrixWorld);
					var l = K.ray.origin.distanceTo(O);
					if (l < Q || l < K.near || l > K.far) {
						continue
					}
					g.push({
						distance: l,
						point: O,
						face: B,
						faceIndex: R,
						object: this
					})
				}
			}
		}
	}
}());
THREE.Mesh.prototype.clone = function(b, a) {
	if (b === undefined) {
		b = new THREE.Mesh(this.geometry, this.material)
	}
	THREE.Object3D.prototype.clone.call(this, b, a);
	return b
};
THREE.Bone = function(a) {
	THREE.Object3D.call(this);
	this.type = "Bone";
	this.skin = a
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Skeleton = function(c, e, f) {
	this.useVertexTexture = f !== undefined ? f : true;
	this.identityMatrix = new THREE.Matrix4();
	c = c || [];
	this.bones = c.slice(0);
	if (this.useVertexTexture) {
		var d;
		if (this.bones.length > 256) {
			d = 64
		} else {
			if (this.bones.length > 64) {
				d = 32
			} else {
				if (this.bones.length > 16) {
					d = 16
				} else {
					d = 8
				}
			}
		}
		this.boneTextureWidth = d;
		this.boneTextureHeight = d;
		this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4);
		this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType);
		this.boneTexture.minFilter = THREE.NearestFilter;
		this.boneTexture.magFilter = THREE.NearestFilter;
		this.boneTexture.generateMipmaps = false;
		this.boneTexture.flipY = false
	} else {
		this.boneMatrices = new Float32Array(16 * this.bones.length)
	}
	if (e === undefined) {
		this.calculateInverses()
	} else {
		if (this.bones.length === e.length) {
			this.boneInverses = e.slice(0)
		} else {
			THREE.warn("THREE.Skeleton bonInverses is the wrong length.");
			this.boneInverses = [];
			for (var a = 0, g = this.bones.length; a < g; a++) {
				this.boneInverses.push(new THREE.Matrix4())
			}
		}
	}
};
THREE.Skeleton.prototype.calculateInverses = function() {
	this.boneInverses = [];
	for (var a = 0, d = this.bones.length; a < d; a++) {
		var c = new THREE.Matrix4();
		if (this.bones[a]) {
			c.getInverse(this.bones[a].matrixWorld)
		}
		this.boneInverses.push(c)
	}
};
THREE.Skeleton.prototype.pose = function() {
	var c;
	for (var a = 0, d = this.bones.length; a < d; a++) {
		c = this.bones[a];
		if (c) {
			c.matrixWorld.getInverse(this.boneInverses[a])
		}
	}
	for (var a = 0, d = this.bones.length; a < d; a++) {
		c = this.bones[a];
		if (c) {
			if (c.parent) {
				c.matrix.getInverse(c.parent.matrixWorld);
				c.matrix.multiply(c.matrixWorld)
			} else {
				c.matrix.copy(c.matrixWorld)
			}
			c.matrix.decompose(c.position, c.quaternion, c.scale)
		}
	}
};
THREE.Skeleton.prototype.update = (function() {
	var a = new THREE.Matrix4();
	return function() {
		for (var c = 0, e = this.bones.length; c < e; c++) {
			var d = this.bones[c] ? this.bones[c].matrixWorld : this.identityMatrix;
			a.multiplyMatrices(d, this.boneInverses[c]);
			a.flattenToArrayOffset(this.boneMatrices, c * 16)
		}
		if (this.useVertexTexture) {
			this.boneTexture.needsUpdate = true
		}
	}
})();
THREE.SkinnedMesh = function(j, g, f) {
	THREE.Mesh.call(this, j, g);
	this.type = "SkinnedMesh";
	this.bindMode = "attached";
	this.bindMatrix = new THREE.Matrix4();
	this.bindMatrixInverse = new THREE.Matrix4();
	var e = [];
	if (this.geometry && this.geometry.bones !== undefined) {
		var k, l, c, a, m;
		for (var h = 0, d = this.geometry.bones.length; h < d; ++h) {
			l = this.geometry.bones[h];
			c = l.pos;
			a = l.rotq;
			m = l.scl;
			k = new THREE.Bone(this);
			e.push(k);
			k.name = l.name;
			k.position.set(c[0], c[1], c[2]);
			k.quaternion.set(a[0], a[1], a[2], a[3]);
			if (m !== undefined) {
				k.scale.set(m[0], m[1], m[2])
			} else {
				k.scale.set(1, 1, 1)
			}
		}
		for (var h = 0, d = this.geometry.bones.length; h < d; ++h) {
			l = this.geometry.bones[h];
			if (l.parent !== -1) {
				e[l.parent].add(e[h])
			} else {
				this.add(e[h])
			}
		}
	}
	this.normalizeSkinWeights();
	this.updateMatrixWorld(true);
	this.bind(new THREE.Skeleton(e, undefined, f))
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.bind = function(b, a) {
	this.skeleton = b;
	if (a === undefined) {
		this.updateMatrixWorld(true);
		a = this.matrixWorld
	}
	this.bindMatrix.copy(a);
	this.bindMatrixInverse.getInverse(a)
};
THREE.SkinnedMesh.prototype.pose = function() {
	this.skeleton.pose()
};
THREE.SkinnedMesh.prototype.normalizeSkinWeights = function() {
	if (this.geometry instanceof THREE.Geometry) {
		for (var b = 0; b < this.geometry.skinIndices.length; b++) {
			var a = this.geometry.skinWeights[b];
			var c = 1 / a.lengthManhattan();
			if (c !== Infinity) {
				a.multiplyScalar(c)
			} else {
				a.set(1)
			}
		}
	} else {}
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function(a) {
	THREE.Mesh.prototype.updateMatrixWorld.call(this, true);
	if (this.bindMode === "attached") {
		this.bindMatrixInverse.getInverse(this.matrixWorld)
	} else {
		if (this.bindMode === "detached") {
			this.bindMatrixInverse.getInverse(this.bindMatrix)
		} else {
			THREE.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
		}
	}
};
THREE.SkinnedMesh.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)
	}
	THREE.Mesh.prototype.clone.call(this, a);
	return a
};
THREE.MorphAnimMesh = function(b, a) {
	THREE.Mesh.call(this, b, a);
	this.type = "MorphAnimMesh";
	this.duration = 1000;
	this.mirroredLoop = false;
	this.time = 0;
	this.lastKeyframe = 0;
	this.currentKeyframe = 0;
	this.direction = 1;
	this.directionBackwards = false;
	this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh;
THREE.MorphAnimMesh.prototype.setFrameRange = function(b, a) {
	this.startKeyframe = b;
	this.endKeyframe = a;
	this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function() {
	this.direction = 1;
	this.directionBackwards = false
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function() {
	this.direction = -1;
	this.directionBackwards = true
};
THREE.MorphAnimMesh.prototype.parseAnimations = function() {
	var f = this.geometry;
	if (!f.animations) {
		f.animations = {}
	}
	var a, k = f.animations;
	var e = /([a-z]+)_?(\d+)/;
	for (var d = 0, h = f.morphTargets.length; d < h; d++) {
		var j = f.morphTargets[d];
		var c = j.name.match(e);
		if (c && c.length > 1) {
			var g = c[1];
			if (!k[g]) {
				k[g] = {
					start: Infinity,
					end: -Infinity
				}
			}
			var b = k[g];
			if (d < b.start) {
				b.start = d
			}
			if (d > b.end) {
				b.end = d
			}
			if (!a) {
				a = g
			}
		}
	}
	f.firstAnimation = a
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function(b, c, a) {
	if (!this.geometry.animations) {
		this.geometry.animations = {}
	}
	this.geometry.animations[b] = {
		start: c,
		end: a
	}
};
THREE.MorphAnimMesh.prototype.playAnimation = function(a, c) {
	var b = this.geometry.animations[a];
	if (b) {
		this.setFrameRange(b.start, b.end);
		this.duration = 1000 * ((b.end - b.start) / c);
		this.time = 0
	} else {
		THREE.warn("THREE.MorphAnimMesh: animation[" + a + "] undefined in .playAnimation()")
	}
};
THREE.MorphAnimMesh.prototype.updateAnimation = function(d) {
	var c = this.duration / this.length;
	this.time += this.direction * d;
	if (this.mirroredLoop) {
		if (this.time > this.duration || this.time < 0) {
			this.direction *= -1;
			if (this.time > this.duration) {
				this.time = this.duration;
				this.directionBackwards = true
			}
			if (this.time < 0) {
				this.time = 0;
				this.directionBackwards = false
			}
		}
	} else {
		this.time = this.time % this.duration;
		if (this.time < 0) {
			this.time += this.duration
		}
	}
	var a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / c), 0, this.length - 1);
	if (a !== this.currentKeyframe) {
		this.morphTargetInfluences[this.lastKeyframe] = 0;
		this.morphTargetInfluences[this.currentKeyframe] = 1;
		this.morphTargetInfluences[a] = 0;
		this.lastKeyframe = this.currentKeyframe;
		this.currentKeyframe = a
	}
	var b = (this.time % c) / c;
	if (this.directionBackwards) {
		b = 1 - b
	}
	this.morphTargetInfluences[this.currentKeyframe] = b;
	this.morphTargetInfluences[this.lastKeyframe] = 1 - b
};
THREE.MorphAnimMesh.prototype.interpolateTargets = function(e, c, g) {
	var h = this.morphTargetInfluences;
	for (var f = 0, d = h.length; f < d; f++) {
		h[f] = 0
	}
	if (e > -1) {
		h[e] = 1 - g
	}
	if (c > -1) {
		h[c] = g
	}
};
THREE.MorphAnimMesh.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.MorphAnimMesh(this.geometry, this.material)
	}
	a.duration = this.duration;
	a.mirroredLoop = this.mirroredLoop;
	a.time = this.time;
	a.lastKeyframe = this.lastKeyframe;
	a.currentKeyframe = this.currentKeyframe;
	a.direction = this.direction;
	a.directionBackwards = this.directionBackwards;
	THREE.Mesh.prototype.clone.call(this, a);
	return a
};
THREE.LOD = function() {
	THREE.Object3D.call(this);
	this.objects = []
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.addLevel = function(b, c) {
	if (c === undefined) {
		c = 0
	}
	c = Math.abs(c);
	for (var a = 0; a < this.objects.length; a++) {
		if (c < this.objects[a].distance) {
			break
		}
	}
	this.objects.splice(a, 0, {
		distance: c,
		object: b
	});
	this.add(b)
};
THREE.LOD.prototype.getObjectForDistance = function(c) {
	for (var b = 1, a = this.objects.length; b < a; b++) {
		if (c < this.objects[b].distance) {
			break
		}
	}
	return this.objects[b - 1].object
};
THREE.LOD.prototype.raycast = (function() {
	var a = new THREE.Vector3();
	return function(b, c) {
		a.setFromMatrixPosition(this.matrixWorld);
		var d = b.ray.origin.distanceTo(a);
		this.getObjectForDistance(d).raycast(b, c)
	}
}());
THREE.LOD.prototype.update = function() {
	var b = new THREE.Vector3();
	var a = new THREE.Vector3();
	return function(e) {
		if (this.objects.length > 1) {
			b.setFromMatrixPosition(e.matrixWorld);
			a.setFromMatrixPosition(this.matrixWorld);
			var f = b.distanceTo(a);
			this.objects[0].object.visible = true;
			for (var d = 1, c = this.objects.length; d < c; d++) {
				if (f >= this.objects[d].distance) {
					this.objects[d - 1].object.visible = false;
					this.objects[d].object.visible = true
				} else {
					break
				}
			}
			for (; d < c; d++) {
				this.objects[d].object.visible = false
			}
		}
	}
}();
THREE.LOD.prototype.clone = function(c) {
	if (c === undefined) {
		c = new THREE.LOD()
	}
	THREE.Object3D.prototype.clone.call(this, c);
	for (var d = 0, b = this.objects.length; d < b; d++) {
		var a = this.objects[d].object.clone();
		a.visible = d === 0;
		c.addLevel(a, this.objects[d].distance)
	}
	return c
};
THREE.Sprite = (function() {
	var d = new Uint16Array([0, 1, 2, 0, 2, 3]);
	var a = new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]);
	var b = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
	var c = new THREE.BufferGeometry();
	c.addAttribute("index", new THREE.BufferAttribute(d, 1));
	c.addAttribute("position", new THREE.BufferAttribute(a, 3));
	c.addAttribute("uv", new THREE.BufferAttribute(b, 2));
	return function(e) {
		THREE.Object3D.call(this);
		this.type = "Sprite";
		this.geometry = c;
		this.material = (e !== undefined) ? e : new THREE.SpriteMaterial()
	}
})();
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.raycast = (function() {
	var a = new THREE.Vector3();
	return function(b, c) {
		a.setFromMatrixPosition(this.matrixWorld);
		var d = b.ray.distanceToPoint(a);
		if (d > this.scale.x) {
			return
		}
		c.push({
			distance: d,
			point: this.position,
			face: null,
			object: this
		})
	}
}());
THREE.Sprite.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.Sprite(this.material)
	}
	THREE.Object3D.prototype.clone.call(this, a);
	return a
};
THREE.Particle = THREE.Sprite;
THREE.LensFlare = function(d, b, e, c, a) {
	THREE.Object3D.call(this);
	this.lensFlares = [];
	this.positionScreen = new THREE.Vector3();
	this.customUpdateCallback = undefined;
	if (d !== undefined) {
		this.add(d, b, e, c, a)
	}
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.add = function(e, c, f, d, a, b) {
	if (c === undefined) {
		c = -1
	}
	if (f === undefined) {
		f = 0
	}
	if (b === undefined) {
		b = 1
	}
	if (a === undefined) {
		a = new THREE.Color(16777215)
	}
	if (d === undefined) {
		d = THREE.NormalBlending
	}
	f = Math.min(f, Math.max(0, f));
	this.lensFlares.push({
		texture: e,
		size: c,
		distance: f,
		x: 0,
		y: 0,
		z: 0,
		scale: 1,
		rotation: 1,
		opacity: b,
		color: a,
		blending: d
	})
};
THREE.LensFlare.prototype.updateLensFlares = function() {
	var d, c = this.lensFlares.length;
	var b;
	var a = -this.positionScreen.x * 2;
	var e = -this.positionScreen.y * 2;
	for (d = 0; d < c; d++) {
		b = this.lensFlares[d];
		b.x = this.positionScreen.x + a * b.distance;
		b.y = this.positionScreen.y + e * b.distance;
		b.wantedRotation = b.x * Math.PI * 0.25;
		b.rotation += (b.wantedRotation - b.rotation) * 0.25
	}
};
THREE.Scene = function() {
	THREE.Object3D.call(this);
	this.type = "Scene";
	this.fog = null;
	this.overrideMaterial = null;
	this.autoUpdate = true
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.clone = function(a) {
	if (a === undefined) {
		a = new THREE.Scene()
	}
	THREE.Object3D.prototype.clone.call(this, a);
	if (this.fog !== null) {
		a.fog = this.fog.clone()
	}
	if (this.overrideMaterial !== null) {
		a.overrideMaterial = this.overrideMaterial.clone()
	}
	a.autoUpdate = this.autoUpdate;
	a.matrixAutoUpdate = this.matrixAutoUpdate;
	return a
};
THREE.Fog = function(b, c, a) {
	this.name = "";
	this.color = new THREE.Color(b);
	this.near = (c !== undefined) ? c : 1;
	this.far = (a !== undefined) ? a : 1000
};
THREE.Fog.prototype.clone = function() {
	return new THREE.Fog(this.color.getHex(), this.near, this.far)
};
THREE.FogExp2 = function(b, a) {
	this.name = "";
	this.color = new THREE.Color(b);
	this.density = (a !== undefined) ? a : 0.00025
};
THREE.FogExp2.prototype.clone = function() {
	return new THREE.FogExp2(this.color.getHex(), this.density)
};
THREE.ShaderChunk = {};
THREE.ShaderChunk.common = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\nfloat square( in float a ) { return a*a; }\nvec2  square( in vec2 a )  { return vec2( a.x*a.x, a.y*a.y ); }\nvec3  square( in vec3 a )  { return vec3( a.x*a.x, a.y*a.y, a.z*a.z ); }\nvec4  square( in vec4 a )  { return vec4( a.x*a.x, a.y*a.y, a.z*a.z, a.w*a.w ); }\nfloat saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }\nvec2  saturate( in vec2 a )  { return clamp( a, 0.0, 1.0 ); }\nvec3  saturate( in vec3 a )  { return clamp( a, 0.0, 1.0 ); }\nvec4  saturate( in vec4 a )  { return clamp( a, 0.0, 1.0 ); }\nfloat average( in float a ) { return a; }\nfloat average( in vec2 a )  { return ( a.x + a.y) * 0.5; }\nfloat average( in vec3 a )  { return ( a.x + a.y + a.z) / 3.0; }\nfloat average( in vec4 a )  { return ( a.x + a.y + a.z + a.w) * 0.25; }\nfloat whiteCompliment( in float a ) { return saturate( 1.0 - a ); }\nvec2  whiteCompliment( in vec2 a )  { return saturate( vec2(1.0) - a ); }\nvec3  whiteCompliment( in vec3 a )  { return saturate( vec3(1.0) - a ); }\nvec4  whiteCompliment( in vec4 a )  { return saturate( vec4(1.0) - a ); }\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal) {\n	float distance = dot( planeNormal, point-pointOnPlane );\n	return point - distance * planeNormal;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return pointOnLine + lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) );\n}\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n	if ( decayExponent > 0.0 ) {\n	  return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );\n	}\n	return 1.0;\n}\n\nvec3 inputToLinear( in vec3 a ) {\n#ifdef GAMMA_INPUT\n	return pow( a, vec3( float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n#ifdef GAMMA_OUTPUT\n	return pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\n";
THREE.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n	if ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n";
THREE.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n	vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n	float dotProduct = dot( transformedNormal, dirVector );\n	vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n	#ifdef DOUBLE_SIDED\n\n		vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n		#ifdef WRAP_AROUND\n\n			vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n		#endif\n\n	#endif\n\n	#ifdef WRAP_AROUND\n\n		vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n		directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n		#ifdef DOUBLE_SIDED\n\n			directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n		#endif\n\n	#endif\n\n	vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n	#ifdef DOUBLE_SIDED\n\n		vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n	#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n		float dotProduct = dot( transformedNormal, lVector );\n\n		vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n		#ifdef DOUBLE_SIDED\n\n			vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n			#ifdef WRAP_AROUND\n\n				vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n			#endif\n\n		#endif\n\n		#ifdef WRAP_AROUND\n\n			vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n			pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n			#ifdef DOUBLE_SIDED\n\n				pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n			#endif\n\n		#endif\n\n		vLightFront += pointLightColor[ i ] * pointLightWeighting * attenuation;\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += pointLightColor[ i ] * pointLightWeightingBack * attenuation;\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n			lVector = normalize( lVector );\n\n			float dotProduct = dot( transformedNormal, lVector );\n			vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n			#ifdef DOUBLE_SIDED\n\n				vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n				#ifdef WRAP_AROUND\n\n					vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n				#endif\n\n			#endif\n\n			#ifdef WRAP_AROUND\n\n				vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n				spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n				#ifdef DOUBLE_SIDED\n\n					spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n				#endif\n\n			#endif\n\n			vLightFront += spotLightColor[ i ] * spotLightWeighting * attenuation * spotEffect;\n\n			#ifdef DOUBLE_SIDED\n\n				vLightBack += spotLightColor[ i ] * spotLightWeightingBack * attenuation * spotEffect;\n\n			#endif\n\n		}\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		float dotProduct = dot( transformedNormal, lVector );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n		#endif\n\n	}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack += ambientLightColor;\n\n#endif\n";
THREE.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n	uniform vec4 offsetRepeat;\n	uniform sampler2D map;\n\n#endif\n";
THREE.ShaderChunk.default_vertex = "#ifdef USE_SKINNING\n\n	vec4 mvPosition = modelViewMatrix * skinned;\n\n#elif defined( USE_MORPHTARGETS )\n\n	vec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#else\n\n	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n";
THREE.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif";
THREE.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n	#ifdef USE_MORPHNORMALS\n\n	vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n	#else\n\n	vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n	uniform float logDepthBufFC;\n\n#endif";
THREE.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n\n#endif";
THREE.ShaderChunk.lights_phong_fragment = "#ifndef FLAT_SHADED\n\n	vec3 normal = normalize( vNormal );\n\n	#ifdef DOUBLE_SIDED\n\n		normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n	#endif\n\n#else\n\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef USE_NORMALMAP\n\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n\n		#ifdef WRAP_AROUND\n\n			float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n			float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += pointLightColor[ i ] * pointDiffuseWeight * attenuation;\n\n				// specular\n\n		vec3 pointHalfVector = normalize( lVector + viewPosition );\n		float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n		float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * attenuation * specularNormalization;\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			// diffuse\n\n			float dotProduct = dot( normal, lVector );\n\n			#ifdef WRAP_AROUND\n\n				float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n				float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n				vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n			#else\n\n				float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n			#endif\n\n			totalDiffuseLight += spotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect;\n\n			// specular\n\n			vec3 spotHalfVector = normalize( lVector + viewPosition );\n			float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n			float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n			float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n			totalSpecularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, dirVector );\n\n		#ifdef WRAP_AROUND\n\n			float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n			float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\n		// specular\n\n		vec3 dirHalfVector = normalize( dirVector + viewPosition );\n		float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n		float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n		/*\n		// fresnel term from skin shader\n		const float F0 = 0.128;\n\n		float base = 1.0 - dot( viewPosition, dirHalfVector );\n		float exponential = pow( base, 5.0 );\n\n		float fresnel = exponential + F0 * ( 1.0 - exponential );\n		*/\n\n		/*\n		// fresnel term from fresnel shader\n		const float mFresnelBias = 0.08;\n		const float mFresnelScale = 0.3;\n		const float mFresnelPower = 5.0;\n\n		float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n		*/\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		// 		dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		totalDiffuseLight += hemiColor;\n\n		// specular (sky light)\n\n		vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n		float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n		float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n		// specular (ground light)\n\n		vec3 lVectorGround = -lVector;\n\n		vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n		float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n		float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n		float dotProductGround = dot( normal, lVectorGround );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n		vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n		totalSpecularLight += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n	}\n\n#endif\n\n#ifdef METAL\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) * specular + totalSpecularLight + emissive;\n\n#else\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n#endif\n";
THREE.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n	uniform vec3 fogColor;\n\n	#ifdef FOG_EXP2\n\n		uniform float fogDensity;\n\n	#else\n\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n\n#endif";
THREE.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n	vec3 morphedNormal = vec3( 0.0 );\n\n	morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n	morphedNormal += normal;\n\n#endif";
THREE.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n	uniform float reflectivity;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	uniform float flipEnvMap;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		uniform float refractionRatio;\n\n	#else\n\n		varying vec3 vReflect;\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif";
THREE.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n\n	// Per-Pixel Tangent Space Normal Mapping\n	// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n\n	}\n\n#endif\n";
THREE.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n";
THREE.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n	uniform sampler2D lightMap;\n\n#endif";
THREE.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n	}\n\n#endif";
THREE.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	vWorldPosition = worldPosition.xyz;\n\n#endif";
THREE.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n	vec4 texelColor = texture2D( map, vUv );\n\n	texelColor.xyz = inputToLinear( texelColor.xyz );\n\n	diffuseColor *= texelColor;\n\n#endif";
THREE.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n	vUv2 = uv2;\n\n#endif";
THREE.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n	diffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n";
THREE.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif\n";
THREE.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n	vColor.xyz = inputToLinear( color.xyz );\n\n#endif";
THREE.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n	#ifdef USE_MORPHTARGETS\n\n	vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n	vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n	#endif\n\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n\n#endif\n";
THREE.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	varying vec3 vReflect;\n\n	uniform float refractionRatio;\n\n#endif\n";
THREE.ShaderChunk.linear_to_gamma_fragment = "\n	outgoingLight = linearToOutput( outgoingLight );\n";
THREE.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif";
THREE.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n";
THREE.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n\n#endif\n";
THREE.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n		// Transforming Normal Vectors with the Inverse Transformation\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n		#ifdef ENVMAP_MODE_REFLECTION\n\n			vec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n		#else\n\n			vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n		#endif\n\n	#else\n\n		vec3 reflectVec = vReflect;\n\n	#endif\n\n	#ifdef DOUBLE_SIDED\n		float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n	#else\n		float flipNormal = 1.0;\n	#endif\n\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#elif defined( ENVMAP_TYPE_EQUIREC )\n		vec2 sampleUV;\n		sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n		sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n		vec4 envColor = texture2D( envMap, sampleUV );\n\n	#elif defined( ENVMAP_TYPE_SPHERE )\n		vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n		vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n	#endif\n\n	envColor.xyz = inputToLinear( envColor.xyz );\n\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_MIX )\n\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_ADD )\n\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n	uniform sampler2D specularMap;\n\n#endif";
THREE.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n	gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n	#endif\n\n#endif";
THREE.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n	#ifndef USE_MORPHNORMALS\n\n	uniform float morphTargetInfluences[ 8 ];\n\n	#else\n\n	uniform float morphTargetInfluences[ 4 ];\n\n	#endif\n\n#endif";
THREE.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n\n#else\n\n	specularStrength = 1.0;\n\n#endif";
THREE.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n	#else\n\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n	#endif\n\n	#ifdef FOG_EXP2\n\n		float fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );\n		fogFactor = whiteCompliment( fogFactor );\n\n	#else\n\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n	#endif\n	\n	outgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif";
THREE.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n\n	// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n	// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n	vec2 dHdxy_fwd() {\n\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n		return vec2( dBx, dBy );\n\n	}\n\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;		// normalized\n\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n\n		float fDet = dot( vSigmaX, R1 );\n\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n\n	}\n\n#endif\n";
THREE.ShaderChunk.defaultnormal_vertex = "#ifdef USE_SKINNING\n\n	vec3 objectNormal = skinnedNormal.xyz;\n\n#elif defined( USE_MORPHNORMALS )\n\n	vec3 objectNormal = morphedNormal;\n\n#else\n\n	vec3 objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n	objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n";
THREE.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n	varying vec3 vNormal;\n\n#endif\n";
THREE.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n#ifdef BONE_TEXTURE\n\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#else\n\n	mat4 boneMatX = getBoneMatrix( int(skinIndex.x) );\n	mat4 boneMatY = getBoneMatrix( int(skinIndex.y) );\n	mat4 boneMatZ = getBoneMatrix( int(skinIndex.z) );\n	mat4 boneMatW = getBoneMatrix( int(skinIndex.w) );\n\n#endif\n\n#endif";
THREE.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif";
THREE.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n	outgoingLight *= diffuseColor.xyz * texture2D( lightMap, vUv2 ).xyz;\n\n#endif";
THREE.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif";
THREE.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n	diffuseColor.rgb *= vColor;\n\n#endif";
THREE.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n	vec3 morphed = vec3( 0.0 );\n	morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n	#ifndef USE_MORPHNORMALS\n\n	morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n	#endif\n\n	morphed += position;\n\n#endif";
THREE.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	vec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n	#ifdef ENVMAP_MODE_REFLECTION\n\n		vReflect = reflect( cameraToVertex, worldNormal );\n\n	#else\n\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n	#ifdef SHADOWMAP_DEBUG\n\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n	#endif\n\n	#ifdef SHADOWMAP_CASCADE\n\n		int inFrustumCount = 0;\n\n	#endif\n\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n				// if ( something && something ) breaks ATI OpenGL shader compiler\n				// if ( all( something, something ) ) using this instead\n\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n\n				// don't shadow pixels outside of light frustum\n				// use just first frustum (for cascades)\n				// don't shadow pixels behind far plane of light frustum\n\n		#ifdef SHADOWMAP_CASCADE\n\n			inFrustumCount += int( inFrustum );\n			bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n		#else\n\n			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n		#endif\n\n		bool frustumTest = all( frustumTestVec );\n\n		if ( frustumTest ) {\n\n			shadowCoord.z += shadowBias[ i ];\n\n			#if defined( SHADOWMAP_TYPE_PCF )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n		/*\n						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n						// must enroll loop manually\n\n				for ( float y = -1.25; y <= 1.25; y += 1.25 )\n					for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n						vec4 rgbaDepth = texture2D( shadowMap[ 0 ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n								// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n								//vec4 rgbaDepth = texture2DProj( shadowMap[ 0 ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n						float fDepth = unpackDepth( rgbaDepth );\n\n						if ( fDepth < shadowCoord.z )\n							shadow += 1.0;\n\n				}\n\n				shadow /= 9.0;\n\n		*/\n\n				const float shadowDelta = 1.0 / 9.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n\n				mat3 shadowKernel;\n				mat3 depthKernel;\n\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ 0 ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#else\n\n				vec4 rgbaDepth = texture2D( shadowMap[ 0 ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n\n				if ( fDepth < shadowCoord.z )\n\n		// spot with multiple shadows is darker\n\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n		// spot with multiple shadows has the same color as single shadow spot\n\n		// 					shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n			#endif\n\n		}\n\n\n		#ifdef SHADOWMAP_DEBUG\n\n			#ifdef SHADOWMAP_CASCADE\n\n				if ( inFrustum && inFrustumCount == 1 ) outgoingLight *= frustumColors[ i ];\n\n			#else\n\n				if ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n			#endif\n\n		#endif\n\n	}\n\n	// NOTE: I am unsure if this is correct in linear space.  -bhouston, Dec 29, 2014\n	shadowColor = inputToLinear( shadowColor );\n\n	outgoingLight = outgoingLight * shadowColor;\n\n#endif\n";
THREE.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n	#ifdef USE_SKINNING\n\n		vec4 worldPosition = modelMatrix * skinned;\n\n	#elif defined( USE_MORPHTARGETS )\n\n		vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n	float unpackDepth( const in vec4 rgba_depth ) {\n\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n\n	}\n\n#endif";
THREE.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n\n	#ifdef BONE_TEXTURE\n\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n\n			y = dy * ( y + 0.5 );\n\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n			mat4 bone = mat4( v1, v2, v3, v4 );\n\n			return bone;\n\n		}\n\n	#else\n\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n		mat4 getBoneMatrix( const in int i ) {\n\n			mat4 bone = boneGlobalMatrices[ i ];\n			return bone;\n\n		}\n\n	#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n	uniform float logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		#extension GL_EXT_frag_depth : enable\n		varying float vFragDepth;\n\n	#endif\n\n#endif";
THREE.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n	diffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n";
THREE.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n	uniform sampler2D alphaMap;\n\n#endif\n";
THREE.UniformsUtils = {
	merge: function(b) {
		var a = {};
		for (var c = 0; c < b.length; c++) {
			var d = this.clone(b[c]);
			for (var e in d) {
				a[e] = d[e]
			}
		}
		return a
	},
	clone: function(a) {
		var c = {};
		for (var d in a) {
			c[d] = {};
			for (var e in a[d]) {
				var b = a[d][e];
				if (b instanceof THREE.Color || b instanceof THREE.Vector2 || b instanceof THREE.Vector3 || b instanceof THREE.Vector4 || b instanceof THREE.Matrix4 || b instanceof THREE.Texture) {
					c[d][e] = b.clone()
				} else {
					if (b instanceof Array) {
						c[d][e] = b.slice()
					} else {
						c[d][e] = b
					}
				}
			}
		}
		return c
	}
};
THREE.UniformsLib = {
	common: {
		diffuse: {
			type: "c",
			value: new THREE.Color(15658734)
		},
		opacity: {
			type: "f",
			value: 1
		},
		map: {
			type: "t",
			value: null
		},
		offsetRepeat: {
			type: "v4",
			value: new THREE.Vector4(0, 0, 1, 1)
		},
		lightMap: {
			type: "t",
			value: null
		},
		specularMap: {
			type: "t",
			value: null
		},
		alphaMap: {
			type: "t",
			value: null
		},
		envMap: {
			type: "t",
			value: null
		},
		flipEnvMap: {
			type: "f",
			value: -1
		},
		reflectivity: {
			type: "f",
			value: 1
		},
		refractionRatio: {
			type: "f",
			value: 0.98
		},
		morphTargetInfluences: {
			type: "f",
			value: 0
		}
	},
	bump: {
		bumpMap: {
			type: "t",
			value: null
		},
		bumpScale: {
			type: "f",
			value: 1
		}
	},
	normalmap: {
		normalMap: {
			type: "t",
			value: null
		},
		normalScale: {
			type: "v2",
			value: new THREE.Vector2(1, 1)
		}
	},
	fog: {
		fogDensity: {
			type: "f",
			value: 0.00025
		},
		fogNear: {
			type: "f",
			value: 1
		},
		fogFar: {
			type: "f",
			value: 2000
		},
		fogColor: {
			type: "c",
			value: new THREE.Color(16777215)
		}
	},
	lights: {
		ambientLightColor: {
			type: "fv",
			value: []
		},
		directionalLightDirection: {
			type: "fv",
			value: []
		},
		directionalLightColor: {
			type: "fv",
			value: []
		},
		hemisphereLightDirection: {
			type: "fv",
			value: []
		},
		hemisphereLightSkyColor: {
			type: "fv",
			value: []
		},
		hemisphereLightGroundColor: {
			type: "fv",
			value: []
		},
		pointLightColor: {
			type: "fv",
			value: []
		},
		pointLightPosition: {
			type: "fv",
			value: []
		},
		pointLightDistance: {
			type: "fv1",
			value: []
		},
		pointLightDecay: {
			type: "fv1",
			value: []
		},
		spotLightColor: {
			type: "fv",
			value: []
		},
		spotLightPosition: {
			type: "fv",
			value: []
		},
		spotLightDirection: {
			type: "fv",
			value: []
		},
		spotLightDistance: {
			type: "fv1",
			value: []
		},
		spotLightAngleCos: {
			type: "fv1",
			value: []
		},
		spotLightExponent: {
			type: "fv1",
			value: []
		},
		spotLightDecay: {
			type: "fv1",
			value: []
		}
	},
	particle: {
		psColor: {
			type: "c",
			value: new THREE.Color(15658734)
		},
		opacity: {
			type: "f",
			value: 1
		},
		size: {
			type: "f",
			value: 1
		},
		scale: {
			type: "f",
			value: 1
		},
		map: {
			type: "t",
			value: null
		},
		offsetRepeat: {
			type: "v4",
			value: new THREE.Vector4(0, 0, 1, 1)
		},
		fogDensity: {
			type: "f",
			value: 0.00025
		},
		fogNear: {
			type: "f",
			value: 1
		},
		fogFar: {
			type: "f",
			value: 2000
		},
		fogColor: {
			type: "c",
			value: new THREE.Color(16777215)
		}
	},
	shadowmap: {
		shadowMap: {
			type: "tv",
			value: []
		},
		shadowMapSize: {
			type: "v2v",
			value: []
		},
		shadowBias: {
			type: "fv1",
			value: []
		},
		shadowDarkness: {
			type: "fv1",
			value: []
		},
		shadowMatrix: {
			type: "m4v",
			value: []
		}
	}
};
THREE.ShaderLib = {
	basic: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
		vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "	#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "	#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "	outgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
	},
	lambert: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
			emissive: {
				type: "c",
				value: new THREE.Color(0)
			},
			wrapRGB: {
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		vertexShader: ["#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "	varying vec3 vLightBack;", "#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "	varying vec3 vLightBack;", "#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "	#ifdef DOUBLE_SIDED", "		if ( gl_FrontFacing )", "			outgoingLight += diffuseColor.rgb * vLightFront + emissive;", "		else", "			outgoingLight += diffuseColor.rgb * vLightBack + emissive;", "	#else", "		outgoingLight += diffuseColor.rgb * vLightFront + emissive;", "	#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
	},
	phong: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
			emissive: {
				type: "c",
				value: new THREE.Color(0)
			},
			specular: {
				type: "c",
				value: new THREE.Color(1118481)
			},
			shininess: {
				type: "f",
				value: 30
			},
			wrapRGB: {
				type: "v3",
				value: new THREE.Vector3(1, 1, 1)
			}
		}]),
		vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "	varying vec3 vNormal;", "#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED", "	vNormal = normalize( transformedNormal );", "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "	vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
	},
	particle_basic: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
		vertexShader: ["uniform float size;", "uniform float scale;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "	#ifdef USE_SIZEATTENUATION", "		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );", "	#else", "		gl_PointSize = size;", "	#endif", "	gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
		fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( psColor, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphatest_fragment, "	outgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
	},
	dashed: {
		uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
			scale: {
				type: "f",
				value: 1
			},
			dashSize: {
				type: "f",
				value: 1
			},
			totalSize: {
				type: "f",
				value: 2
			}
		}]),
		vertexShader: ["uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "	vLineDistance = scale * lineDistance;", "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "	gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
		fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	if ( mod( vLineDistance, totalSize ) > dashSize ) {", "		discard;", "	}", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.color_fragment, "	outgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
	},
	depth: {
		uniforms: {
			mNear: {
				type: "f",
				value: 1
			},
			mFar: {
				type: "f",
				value: 2000
			},
			opacity: {
				type: "f",
				value: 1
			}
		},
		vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
		fragmentShader: ["uniform float mNear;", "uniform float mFar;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT", "		float depth = gl_FragDepthEXT / gl_FragCoord.w;", "	#else", "		float depth = gl_FragCoord.z / gl_FragCoord.w;", "	#endif", "	float color = 1.0 - smoothstep( mNear, mFar, depth );", "	gl_FragColor = vec4( vec3( color ), opacity );", "}"].join("\n")
	},
	normal: {
		uniforms: {
			opacity: {
				type: "f",
				value: 1
			}
		},
		vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "	vNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
		fragmentShader: ["uniform float opacity;", "varying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
	},
	cube: {
		uniforms: {
			tCube: {
				type: "t",
				value: null
			},
			tFlip: {
				type: "f",
				value: -1
			}
		},
		vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "	vWorldPosition = transformDirection( position, modelMatrix );", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
		fragmentShader: ["uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
	},
	equirect: {
		uniforms: {
			tEquirect: {
				type: "t",
				value: null
			},
			tFlip: {
				type: "f",
				value: -1
			}
		},
		vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "	vWorldPosition = transformDirection( position, modelMatrix );", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
		fragmentShader: ["uniform sampler2D tEquirect;", "uniform float tFlip;", "varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "vec3 direction = normalize( vWorldPosition );", "vec2 sampleUV;", "sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );", "sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;", "gl_FragColor = texture2D( tEquirect, sampleUV );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
	},
	depthRGBA: {
		uniforms: {},
		vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
		fragmentShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {", "	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", "	res -= res.xxyz * bit_mask;", "	return res;", "}", "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT", "		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );", "	#else", "		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "	#endif", "}"].join("\n")
	}
};
THREE.WebGLRenderer = function(aC) {
	if (window.console && window.console.log) {
		console.log("THREE.WebGLRenderer", THREE.REVISION)
	}
	aC = aC || {};
	var aO = aC.canvas !== undefined ? aC.canvas : document.createElement("canvas"),
		aN = aC.context !== undefined ? aC.context : null,
		k = 1,
		f = aC.precision !== undefined ? aC.precision : "highp",
		bm = aC.alpha !== undefined ? aC.alpha : false,
		aq = aC.depth !== undefined ? aC.depth : true,
		c = aC.stencil !== undefined ? aC.stencil : true,
		bK = aC.antialias !== undefined ? aC.antialias : false,
		aR = aC.premultipliedAlpha !== undefined ? aC.premultipliedAlpha : true,
		S = aC.preserveDrawingBuffer !== undefined ? aC.preserveDrawingBuffer : false,
		p = aC.logarithmicDepthBuffer !== undefined ? aC.logarithmicDepthBuffer : false,
		bh = new THREE.Color(0),
		R = 0;
	var by = [];
	var o = {};
	var l = [];
	var bl = [];
	var t = [];
	var Z = [];
	var M = [];
	this.domElement = aO;
	this.context = null;
	this.autoClear = true;
	this.autoClearColor = true;
	this.autoClearDepth = true;
	this.autoClearStencil = true;
	this.sortObjects = true;
	this.gammaFactor = 2;
	this.gammaInput = false;
	this.gammaOutput = false;
	this.shadowMapEnabled = false;
	this.shadowMapType = THREE.PCFShadowMap;
	this.shadowMapCullFace = THREE.CullFaceFront;
	this.shadowMapDebug = false;
	this.shadowMapCascade = false;
	this.maxMorphTargets = 8;
	this.maxMorphNormals = 4;
	this.autoScaleCubemaps = true;
	this.info = {
		memory: {
			programs: 0,
			geometries: 0,
			textures: 0
		},
		render: {
			calls: 0,
			vertices: 0,
			faces: 0,
			points: 0
		}
	};
	var aD = this,
		bn = [],
		ah = null,
		bp = null,
		aT = -1,
		au = "",
		aA = null,
		a4 = 0,
		aV = 0,
		aU = 0,
		bD = aO.width,
		aK = aO.height,
		A = 0,
		aH = 0,
		bi = new THREE.Frustum(),
		aQ = new THREE.Matrix4(),
		Q = new THREE.Vector3(),
		aB = new THREE.Vector3(),
		bL = true,
		bg = {
			ambient: [0, 0, 0],
			directional: {
				length: 0,
				colors: [],
				positions: []
			},
			point: {
				length: 0,
				colors: [],
				positions: [],
				distances: [],
				decays: []
			},
			spot: {
				length: 0,
				colors: [],
				positions: [],
				distances: [],
				directions: [],
				anglesCos: [],
				exponents: [],
				decays: []
			},
			hemi: {
				length: 0,
				skyColors: [],
				groundColors: [],
				positions: []
			}
		};
	var b;
	try {
		var bG = {
			alpha: bm,
			depth: aq,
			stencil: c,
			antialias: bK,
			premultipliedAlpha: aR,
			preserveDrawingBuffer: S
		};
		b = aN || aO.getContext("webgl", bG) || aO.getContext("experimental-webgl", bG);
		if (b === null) {
			if (aO.getContext("webgl") !== null) {
				throw "Error creating WebGL context with your selected attributes."
			} else {
				throw "Error creating WebGL context."
			}
		}
		aO.addEventListener("webglcontextlost", function(bM) {
			bM.preventDefault();
			bF();
			a3();
			o = {}
		}, false)
	} catch (bx) {
		THREE.error("THREE.WebGLRenderer: " + bx)
	}
	var aX = new THREE.WebGLState(b, aI);
	if (b.getShaderPrecisionFormat === undefined) {
		b.getShaderPrecisionFormat = function() {
			return {
				rangeMin: 1,
				rangeMax: 1,
				precision: 1
			}
		}
	}
	var aW = new THREE.WebGLExtensions(b);
	aW.get("OES_texture_float");
	aW.get("OES_texture_float_linear");
	aW.get("OES_texture_half_float");
	aW.get("OES_texture_half_float_linear");
	aW.get("OES_standard_derivatives");
	if (p) {
		aW.get("EXT_frag_depth")
	}
	var aw = function(bP, bO, bM, bN) {
		if (aR === true) {
			bP *= bN;
			bO *= bN;
			bM *= bN
		}
		b.clearColor(bP, bO, bM, bN)
	};
	var a3 = function() {
		b.clearColor(0, 0, 0, 1);
		b.clearDepth(1);
		b.clearStencil(0);
		b.enable(b.DEPTH_TEST);
		b.depthFunc(b.LEQUAL);
		b.frontFace(b.CCW);
		b.cullFace(b.BACK);
		b.enable(b.CULL_FACE);
		b.enable(b.BLEND);
		b.blendEquation(b.FUNC_ADD);
		b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
		b.viewport(aV, aU, bD, aK);
		aw(bh.r, bh.g, bh.b, R)
	};
	var bF = function() {
		ah = null;
		aA = null;
		au = "";
		aT = -1;
		bL = true;
		aX.reset()
	};
	a3();
	this.context = b;
	this.state = aX;
	var bt = b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS);
	var a = b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
	var u = b.getParameter(b.MAX_TEXTURE_SIZE);
	var aj = b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE);
	var aL = a > 0;
	var V = aL && aW.get("OES_texture_float");
	var bk = b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.HIGH_FLOAT);
	var bC = b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.MEDIUM_FLOAT);
	var ai = b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.HIGH_FLOAT);
	var bo = b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_FLOAT);
	var T = (function() {
		var bM;
		return function() {
			if (bM !== undefined) {
				return bM
			}
			bM = [];
			if (aW.get("WEBGL_compressed_texture_pvrtc") || aW.get("WEBGL_compressed_texture_s3tc")) {
				var bN = b.getParameter(b.COMPRESSED_TEXTURE_FORMATS);
				for (var bO = 0; bO < bN.length; bO++) {
					bM.push(bN[bO])
				}
			}
			return bM
		}
	})();
	var bE = bk.precision > 0 && ai.precision > 0;
	var a9 = bC.precision > 0 && bo.precision > 0;
	if (f === "highp" && !bE) {
		if (a9) {
			f = "mediump";
			THREE.warn("THREE.WebGLRenderer: highp not supported, using mediump.")
		} else {
			f = "lowp";
			THREE.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp.")
		}
	}
	if (f === "mediump" && !a9) {
		f = "lowp";
		THREE.warn("THREE.WebGLRenderer: mediump not supported, using lowp.")
	}
	var h = new THREE.ShadowMapPlugin(this, by, o, l);
	var a7 = new THREE.SpritePlugin(this, Z);
	var bz = new THREE.LensFlarePlugin(this, M);
	this.getContext = function() {
		return b
	};
	this.forceContextLoss = function() {
		aW.get("WEBGL_lose_context").loseContext()
	};
	this.supportsVertexTextures = function() {
		return aL
	};
	this.supportsFloatTextures = function() {
		return aW.get("OES_texture_float")
	};
	this.supportsHalfFloatTextures = function() {
		return aW.get("OES_texture_half_float")
	};
	this.supportsStandardDerivatives = function() {
		return aW.get("OES_standard_derivatives")
	};
	this.supportsCompressedTextureS3TC = function() {
		return aW.get("WEBGL_compressed_texture_s3tc")
	};
	this.supportsCompressedTexturePVRTC = function() {
		return aW.get("WEBGL_compressed_texture_pvrtc")
	};
	this.supportsBlendMinMax = function() {
		return aW.get("EXT_blend_minmax")
	};
	this.getMaxAnisotropy = (function() {
		var bM;
		return function() {
			if (bM !== undefined) {
				return bM
			}
			var bN = aW.get("EXT_texture_filter_anisotropic");
			bM = bN !== null ? b.getParameter(bN.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
			return bM
		}
	})();
	this.getPrecision = function() {
		return f
	};
	this.getPixelRatio = function() {
		return k
	};
	this.setPixelRatio = function(bM) {
		k = bM
	};
	this.setSize = function(bN, bM, bO) {
		aO.width = bN * k;
		aO.height = bM * k;
		if (bO !== false) {
			aO.style.width = bN + "px";
			aO.style.height = bM + "px"
		}
		this.setViewport(0, 0, bN, bM)
	};
	this.setViewport = function(bN, bP, bO, bM) {
		aV = bN * k;
		aU = bP * k;
		bD = bO * k;
		aK = bM * k;
		b.viewport(aV, aU, bD, aK)
	};
	this.setScissor = function(bN, bP, bO, bM) {
		b.scissor(bN * k, bP * k, bO * k, bM * k)
	};
	this.enableScissorTest = function(bM) {
		bM ? b.enable(b.SCISSOR_TEST) : b.disable(b.SCISSOR_TEST)
	};
	this.getClearColor = function() {
		return bh
	};
	this.setClearColor = function(bM, bN) {
		bh.set(bM);
		R = bN !== undefined ? bN : 1;
		aw(bh.r, bh.g, bh.b, R)
	};
	this.getClearAlpha = function() {
		return R
	};
	this.setClearAlpha = function(bM) {
		R = bM;
		aw(bh.r, bh.g, bh.b, R)
	};
	this.clear = function(bM, bP, bN) {
		var bO = 0;
		if (bM === undefined || bM) {
			bO |= b.COLOR_BUFFER_BIT
		}
		if (bP === undefined || bP) {
			bO |= b.DEPTH_BUFFER_BIT
		}
		if (bN === undefined || bN) {
			bO |= b.STENCIL_BUFFER_BIT
		}
		b.clear(bO)
	};
	this.clearColor = function() {
		b.clear(b.COLOR_BUFFER_BIT)
	};
	this.clearDepth = function() {
		b.clear(b.DEPTH_BUFFER_BIT)
	};
	this.clearStencil = function() {
		b.clear(b.STENCIL_BUFFER_BIT)
	};
	this.clearTarget = function(bO, bM, bP, bN) {
		this.setRenderTarget(bO);
		this.clear(bM, bP, bN)
	};
	this.resetGLState = bF;

	function D(bM) {
		bM.__webglVertexBuffer = b.createBuffer();
		bM.__webglColorBuffer = b.createBuffer();
		aD.info.memory.geometries++
	}

	function aa(bM) {
		bM.__webglVertexBuffer = b.createBuffer();
		bM.__webglColorBuffer = b.createBuffer();
		bM.__webglLineDistanceBuffer = b.createBuffer();
		aD.info.memory.geometries++
	}

	function av(bN) {
		bN.__webglVertexBuffer = b.createBuffer();
		bN.__webglNormalBuffer = b.createBuffer();
		bN.__webglTangentBuffer = b.createBuffer();
		bN.__webglColorBuffer = b.createBuffer();
		bN.__webglUVBuffer = b.createBuffer();
		bN.__webglUV2Buffer = b.createBuffer();
		bN.__webglSkinIndicesBuffer = b.createBuffer();
		bN.__webglSkinWeightsBuffer = b.createBuffer();
		bN.__webglFaceBuffer = b.createBuffer();
		bN.__webglLineBuffer = b.createBuffer();
		var bQ = bN.numMorphTargets;
		if (bQ) {
			bN.__webglMorphTargetsBuffers = [];
			for (var bM = 0, bP = bQ; bM < bP; bM++) {
				bN.__webglMorphTargetsBuffers.push(b.createBuffer())
			}
		}
		var bO = bN.numMorphNormals;
		if (bO) {
			bN.__webglMorphNormalsBuffers = [];
			for (var bM = 0, bP = bO; bM < bP; bM++) {
				bN.__webglMorphNormalsBuffers.push(b.createBuffer())
			}
		}
		aD.info.memory.geometries++
	}
	var bB = function(bN) {
		var bM = bN.target;
		bM.traverse(function(bO) {
			bO.removeEventListener("remove", bB);
			J(bO)
		})
	};
	var aP = function(bM) {
		var bN = bM.target;
		bN.removeEventListener("dispose", aP);
		bH(bN)
	};
	var ac = function(bN) {
		var bM = bN.target;
		bM.removeEventListener("dispose", ac);
		F(bM);
		aD.info.memory.textures--
	};
	var O = function(bM) {
		var bN = bM.target;
		bN.removeEventListener("dispose", O);
		ar(bN);
		aD.info.memory.textures--
	};
	var a8 = function(bN) {
		var bM = bN.target;
		bM.removeEventListener("dispose", a8);
		N(bM)
	};
	var j = function(bQ) {
		var bN = ["__webglVertexBuffer", "__webglNormalBuffer", "__webglTangentBuffer", "__webglColorBuffer", "__webglUVBuffer", "__webglUV2Buffer", "__webglSkinIndicesBuffer", "__webglSkinWeightsBuffer", "__webglFaceBuffer", "__webglLineBuffer", "__webglLineDistanceBuffer"];
		for (var bP = 0, bM = bN.length; bP < bM; bP++) {
			var bO = bN[bP];
			if (bQ[bO] !== undefined) {
				b.deleteBuffer(bQ[bO]);
				delete bQ[bO]
			}
		}
		if (bQ.__webglCustomAttributesList !== undefined) {
			for (var bO in bQ.__webglCustomAttributesList) {
				b.deleteBuffer(bQ.__webglCustomAttributesList[bO].buffer)
			}
			delete bQ.__webglCustomAttributesList
		}
		aD.info.memory.geometries--
	};
	var bH = function(bU) {
		delete bU.__webglInit;
		if (bU instanceof THREE.BufferGeometry) {
			for (var bM in bU.attributes) {
				var bN = bU.attributes[bM];
				if (bN.buffer !== undefined) {
					b.deleteBuffer(bN.buffer);
					delete bN.buffer
				}
			}
			aD.info.memory.geometries--
		} else {
			var bT = v[bU.id];
			if (bT !== undefined) {
				for (var bS = 0, bP = bT.length; bS < bP; bS++) {
					var bQ = bT[bS];
					if (bQ.numMorphTargets !== undefined) {
						for (var bO = 0, bR = bQ.numMorphTargets; bO < bR; bO++) {
							b.deleteBuffer(bQ.__webglMorphTargetsBuffers[bO])
						}
						delete bQ.__webglMorphTargetsBuffers
					}
					if (bQ.numMorphNormals !== undefined) {
						for (var bO = 0, bR = bQ.numMorphNormals; bO < bR; bO++) {
							b.deleteBuffer(bQ.__webglMorphNormalsBuffers[bO])
						}
						delete bQ.__webglMorphNormalsBuffers
					}
					j(bQ)
				}
				delete v[bU.id]
			} else {
				j(bU)
			}
		}
		au = ""
	};
	var F = function(bM) {
		if (bM.image && bM.image.__webglTextureCube) {
			b.deleteTexture(bM.image.__webglTextureCube);
			delete bM.image.__webglTextureCube
		} else {
			if (bM.__webglInit === undefined) {
				return
			}
			b.deleteTexture(bM.__webglTexture);
			delete bM.__webglTexture;
			delete bM.__webglInit
		}
	};
	var ar = function(bN) {
		if (!bN || bN.__webglTexture === undefined) {
			return
		}
		b.deleteTexture(bN.__webglTexture);
		delete bN.__webglTexture;
		if (bN instanceof THREE.WebGLRenderTargetCube) {
			for (var bM = 0; bM < 6; bM++) {
				b.deleteFramebuffer(bN.__webglFramebuffer[bM]);
				b.deleteRenderbuffer(bN.__webglRenderbuffer[bM])
			}
		} else {
			b.deleteFramebuffer(bN.__webglFramebuffer);
			b.deleteRenderbuffer(bN.__webglRenderbuffer)
		}
		delete bN.__webglFramebuffer;
		delete bN.__webglRenderbuffer
	};
	var N = function(bS) {
		var bO = bS.program.program;
		if (bO === undefined) {
			return
		}
		bS.program = undefined;
		var bP, bN, bR;
		var bQ = false;
		for (bP = 0, bN = bn.length; bP < bN; bP++) {
			bR = bn[bP];
			if (bR.program === bO) {
				bR.usedTimes--;
				if (bR.usedTimes === 0) {
					bQ = true
				}
				break
			}
		}
		if (bQ === true) {
			var bM = [];
			for (bP = 0, bN = bn.length; bP < bN; bP++) {
				bR = bn[bP];
				if (bR.program !== bO) {
					bM.push(bR)
				}
			}
			bn = bM;
			b.deleteProgram(bO);
			aD.info.memory.programs--
		}
	};

	function bI(bN) {
		var bS = bN.geometry;
		var bQ = bN.material;
		var bP = bS.vertices.length;
		if (bQ.attributes) {
			if (bS.__webglCustomAttributesList === undefined) {
				bS.__webglCustomAttributesList = []
			}
			for (var bM in bQ.attributes) {
				var bR = bQ.attributes[bM];
				if (!bR.__webglInitialized || bR.createUniqueBuffers) {
					bR.__webglInitialized = true;
					var bO = 1;
					if (bR.type === "v2") {
						bO = 2
					} else {
						if (bR.type === "v3") {
							bO = 3
						} else {
							if (bR.type === "v4") {
								bO = 4
							} else {
								if (bR.type === "c") {
									bO = 3
								}
							}
						}
					}
					bR.size = bO;
					bR.array = new Float32Array(bP * bO);
					bR.buffer = b.createBuffer();
					bR.buffer.belongsToAttribute = bM;
					bR.needsUpdate = true
				}
				bS.__webglCustomAttributesList.push(bR)
			}
		}
	}

	function bu(bO, bM) {
		var bN = bO.vertices.length;
		bO.__vertexArray = new Float32Array(bN * 3);
		bO.__colorArray = new Float32Array(bN * 3);
		bO.__webglParticleCount = bN;
		bI(bM)
	}

	function G(bO, bM) {
		var bN = bO.vertices.length;
		bO.__vertexArray = new Float32Array(bN * 3);
		bO.__colorArray = new Float32Array(bN * 3);
		bO.__lineDistanceArray = new Float32Array(bN * 1);
		bO.__webglLineCount = bN;
		bI(bM)
	}

	function ag(bW, b1) {
		var bO = b1.geometry,
			b2 = bW.faces3,
			bY = b2.length * 3,
			bR = b2.length * 1,
			bT = b2.length * 3,
			bQ = H(b1, bW);
		bW.__vertexArray = new Float32Array(bY * 3);
		bW.__normalArray = new Float32Array(bY * 3);
		bW.__colorArray = new Float32Array(bY * 3);
		bW.__uvArray = new Float32Array(bY * 2);
		if (bO.faceVertexUvs.length > 1) {
			bW.__uv2Array = new Float32Array(bY * 2)
		}
		if (bO.hasTangents) {
			bW.__tangentArray = new Float32Array(bY * 4)
		}
		if (b1.geometry.skinWeights.length && b1.geometry.skinIndices.length) {
			bW.__skinIndexArray = new Float32Array(bY * 4);
			bW.__skinWeightArray = new Float32Array(bY * 4)
		}
		var bU = aW.get("OES_element_index_uint") !== null && bR > 21845 ? Uint32Array : Uint16Array;
		bW.__typeArray = bU;
		bW.__faceArray = new bU(bR * 3);
		bW.__lineArray = new bU(bT * 2);
		var bM = bW.numMorphTargets;
		if (bM) {
			bW.__morphTargetsArrays = [];
			for (var bX = 0, b0 = bM; bX < b0; bX++) {
				bW.__morphTargetsArrays.push(new Float32Array(bY * 3))
			}
		}
		var bN = bW.numMorphNormals;
		if (bN) {
			bW.__morphNormalsArrays = [];
			for (var bX = 0, b0 = bN; bX < b0; bX++) {
				bW.__morphNormalsArrays.push(new Float32Array(bY * 3))
			}
		}
		bW.__webglFaceCount = bR * 3;
		bW.__webglLineCount = bT * 2;
		if (bQ.attributes) {
			if (bW.__webglCustomAttributesList === undefined) {
				bW.__webglCustomAttributesList = []
			}
			for (var b3 in bQ.attributes) {
				var bZ = bQ.attributes[b3];
				var bS = {};
				for (var bP in bZ) {
					bS[bP] = bZ[bP]
				}
				if (!bS.__webglInitialized || bS.createUniqueBuffers) {
					bS.__webglInitialized = true;
					var bV = 1;
					if (bS.type === "v2") {
						bV = 2
					} else {
						if (bS.type === "v3") {
							bV = 3
						} else {
							if (bS.type === "v4") {
								bV = 4
							} else {
								if (bS.type === "c") {
									bV = 3
								}
							}
						}
					}
					bS.size = bV;
					bS.array = new Float32Array(bY * bV);
					bS.buffer = b.createBuffer();
					bS.buffer.belongsToAttribute = b3;
					bZ.needsUpdate = true;
					bS.__original = bZ
				}
				bW.__webglCustomAttributesList.push(bS)
			}
		}
		bW.__inittedArrays = true
	}

	function H(bN, bM) {
		return bN.material instanceof THREE.MeshFaceMaterial ? bN.material.materials[bM.materialIndex] : bN.material
	}

	function ap(bM) {
		return bM instanceof THREE.MeshPhongMaterial === false && bM.shading === THREE.FlatShading
	}

	function aZ(bN, bW, b8) {
		var bU, b7, b5, bO, b2, bP = bN.vertices,
			b6 = bP.length,
			bR = bN.colors,
			bQ = bR.length,
			bV = bN.__vertexArray,
			bM = bN.__colorArray,
			b0 = bN.verticesNeedUpdate,
			bX = bN.colorsNeedUpdate,
			bZ = bN.__webglCustomAttributesList,
			b3, bS, bY, bT, b1, b4;
		if (b0) {
			for (bU = 0; bU < b6; bU++) {
				b5 = bP[bU];
				bO = bU * 3;
				bV[bO] = b5.x;
				bV[bO + 1] = b5.y;
				bV[bO + 2] = b5.z
			}
			b.bindBuffer(b.ARRAY_BUFFER, bN.__webglVertexBuffer);
			b.bufferData(b.ARRAY_BUFFER, bV, bW)
		}
		if (bX) {
			for (b7 = 0; b7 < bQ; b7++) {
				b2 = bR[b7];
				bO = b7 * 3;
				bM[bO] = b2.r;
				bM[bO + 1] = b2.g;
				bM[bO + 2] = b2.b
			}
			b.bindBuffer(b.ARRAY_BUFFER, bN.__webglColorBuffer);
			b.bufferData(b.ARRAY_BUFFER, bM, bW)
		}
		if (bZ) {
			for (b3 = 0, bS = bZ.length; b3 < bS; b3++) {
				b4 = bZ[b3];
				if (b4.needsUpdate && (b4.boundTo === undefined || b4.boundTo === "vertices")) {
					bT = b4.value.length;
					bO = 0;
					if (b4.size === 1) {
						for (bY = 0; bY < bT; bY++) {
							b4.array[bY] = b4.value[bY]
						}
					} else {
						if (b4.size === 2) {
							for (bY = 0; bY < bT; bY++) {
								b1 = b4.value[bY];
								b4.array[bO] = b1.x;
								b4.array[bO + 1] = b1.y;
								bO += 2
							}
						} else {
							if (b4.size === 3) {
								if (b4.type === "c") {
									for (bY = 0; bY < bT; bY++) {
										b1 = b4.value[bY];
										b4.array[bO] = b1.r;
										b4.array[bO + 1] = b1.g;
										b4.array[bO + 2] = b1.b;
										bO += 3
									}
								} else {
									for (bY = 0; bY < bT; bY++) {
										b1 = b4.value[bY];
										b4.array[bO] = b1.x;
										b4.array[bO + 1] = b1.y;
										b4.array[bO + 2] = b1.z;
										bO += 3
									}
								}
							} else {
								if (b4.size === 4) {
									for (bY = 0; bY < bT; bY++) {
										b1 = b4.value[bY];
										b4.array[bO] = b1.x;
										b4.array[bO + 1] = b1.y;
										b4.array[bO + 2] = b1.z;
										b4.array[bO + 3] = b1.w;
										bO += 4
									}
								}
							}
						}
					}
				}
				b.bindBuffer(b.ARRAY_BUFFER, b4.buffer);
				b.bufferData(b.ARRAY_BUFFER, b4.array, bW);
				b4.needsUpdate = false
			}
		}
	}

	function be(bP, bZ) {
		var bW, cd, cb, b9, bQ, b5, bR = bP.vertices,
			bT = bP.colors,
			bY = bP.lineDistances,
			cc = bR.length,
			bS = bT.length,
			b6 = bY.length,
			bX = bP.__vertexArray,
			bO = bP.__colorArray,
			bM = bP.__lineDistanceArray,
			b3 = bP.verticesNeedUpdate,
			b0 = bP.colorsNeedUpdate,
			bN = bP.lineDistancesNeedUpdate,
			b2 = bP.__webglCustomAttributesList,
			b7, bU, b1, bV, b4, b8;
		if (b3) {
			for (bW = 0; bW < cc; bW++) {
				b9 = bR[bW];
				bQ = bW * 3;
				bX[bQ] = b9.x;
				bX[bQ + 1] = b9.y;
				bX[bQ + 2] = b9.z
			}
			b.bindBuffer(b.ARRAY_BUFFER, bP.__webglVertexBuffer);
			b.bufferData(b.ARRAY_BUFFER, bX, bZ)
		}
		if (b0) {
			for (cd = 0; cd < bS; cd++) {
				b5 = bT[cd];
				bQ = cd * 3;
				bO[bQ] = b5.r;
				bO[bQ + 1] = b5.g;
				bO[bQ + 2] = b5.b
			}
			b.bindBuffer(b.ARRAY_BUFFER, bP.__webglColorBuffer);
			b.bufferData(b.ARRAY_BUFFER, bO, bZ)
		}
		if (bN) {
			for (cb = 0; cb < b6; cb++) {
				bM[cb] = bY[cb]
			}
			b.bindBuffer(b.ARRAY_BUFFER, bP.__webglLineDistanceBuffer);
			b.bufferData(b.ARRAY_BUFFER, bM, bZ)
		}
		if (b2) {
			for (b7 = 0, bU = b2.length; b7 < bU; b7++) {
				b8 = b2[b7];
				if (b8.needsUpdate && (b8.boundTo === undefined || b8.boundTo === "vertices")) {
					bQ = 0;
					bV = b8.value.length;
					if (b8.size === 1) {
						for (b1 = 0; b1 < bV; b1++) {
							b8.array[b1] = b8.value[b1]
						}
					} else {
						if (b8.size === 2) {
							for (b1 = 0; b1 < bV; b1++) {
								b4 = b8.value[b1];
								b8.array[bQ] = b4.x;
								b8.array[bQ + 1] = b4.y;
								bQ += 2
							}
						} else {
							if (b8.size === 3) {
								if (b8.type === "c") {
									for (b1 = 0; b1 < bV; b1++) {
										b4 = b8.value[b1];
										b8.array[bQ] = b4.r;
										b8.array[bQ + 1] = b4.g;
										b8.array[bQ + 2] = b4.b;
										bQ += 3
									}
								} else {
									for (b1 = 0; b1 < bV; b1++) {
										b4 = b8.value[b1];
										b8.array[bQ] = b4.x;
										b8.array[bQ + 1] = b4.y;
										b8.array[bQ + 2] = b4.z;
										bQ += 3
									}
								}
							} else {
								if (b8.size === 4) {
									for (b1 = 0; b1 < bV; b1++) {
										b4 = b8.value[b1];
										b8.array[bQ] = b4.x;
										b8.array[bQ + 1] = b4.y;
										b8.array[bQ + 2] = b4.z;
										b8.array[bQ + 3] = b4.w;
										bQ += 4
									}
								}
							}
						}
					}
					b.bindBuffer(b.ARRAY_BUFFER, b8.buffer);
					b.bufferData(b.ARRAY_BUFFER, b8.array, bZ);
					b8.needsUpdate = false
				}
			}
		}
	}

	function g(cJ, cN, dg, bX, de) {
		if (!cJ.__inittedArrays) {
			return
		}
		var ca = ap(de);
		var cq, cX, c6, bN, b1, bS, b3, cl, bO, ck, db, cB, cA, cz, dc, da, c8, c0, cZ, cY, cH, cG, cE, cU, cT, cQ, bV, bU, bT, co, cj, b8, cD, cI, b9, cg, cm, cF, cr, cC, b5 = 0,
			bZ = 0,
			cL = 0,
			c9 = 0,
			cn = 0,
			ce = 0,
			b2 = 0,
			cy = 0,
			b0 = 0,
			cp = 0,
			bM = 0,
			bW = 0,
			ch, bR = cJ.__vertexArray,
			cf = cJ.__uvArray,
			bY = cJ.__uv2Array,
			cP = cJ.__normalArray,
			cS = cJ.__tangentArray,
			cv = cJ.__colorArray,
			cO = cJ.__skinIndexArray,
			c5 = cJ.__skinWeightArray,
			c4 = cJ.__morphTargetsArrays,
			cb = cJ.__morphNormalsArrays,
			cd = cJ.__webglCustomAttributesList,
			bQ, c7 = cJ.__faceArray,
			ct = cJ.__lineArray,
			cK = cN.geometry,
			b7 = cK.verticesNeedUpdate,
			cs = cK.elementsNeedUpdate,
			cw = cK.uvsNeedUpdate,
			bP = cK.normalsNeedUpdate,
			dd = cK.tangentsNeedUpdate,
			cR = cK.colorsNeedUpdate,
			dh = cK.morphTargetsNeedUpdate,
			cx = cK.vertices,
			b4 = cJ.faces3,
			cV = cK.faces,
			cu = cK.faceVertexUvs[0],
			cc = cK.faceVertexUvs[1],
			ci = cK.skinIndices,
			cW = cK.skinWeights,
			df = cK.morphTargets,
			cM = cK.morphNormals;
		if (b7) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				bN = cV[b4[cq]];
				cB = cx[bN.a];
				cA = cx[bN.b];
				cz = cx[bN.c];
				bR[bZ] = cB.x;
				bR[bZ + 1] = cB.y;
				bR[bZ + 2] = cB.z;
				bR[bZ + 3] = cA.x;
				bR[bZ + 4] = cA.y;
				bR[bZ + 5] = cA.z;
				bR[bZ + 6] = cz.x;
				bR[bZ + 7] = cz.y;
				bR[bZ + 8] = cz.z;
				bZ += 9
			}
			b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglVertexBuffer);
			b.bufferData(b.ARRAY_BUFFER, bR, dg)
		}
		if (dh) {
			for (b9 = 0, cg = df.length; b9 < cg; b9++) {
				bM = 0;
				for (cq = 0, cX = b4.length; cq < cX; cq++) {
					cr = b4[cq];
					bN = cV[cr];
					cB = df[b9].vertices[bN.a];
					cA = df[b9].vertices[bN.b];
					cz = df[b9].vertices[bN.c];
					cm = c4[b9];
					cm[bM] = cB.x;
					cm[bM + 1] = cB.y;
					cm[bM + 2] = cB.z;
					cm[bM + 3] = cA.x;
					cm[bM + 4] = cA.y;
					cm[bM + 5] = cA.z;
					cm[bM + 6] = cz.x;
					cm[bM + 7] = cz.y;
					cm[bM + 8] = cz.z;
					if (de.morphNormals) {
						if (ca) {
							c0 = cM[b9].faceNormals[cr];
							cZ = c0;
							cY = c0
						} else {
							cC = cM[b9].vertexNormals[cr];
							c0 = cC.a;
							cZ = cC.b;
							cY = cC.c
						}
						cF = cb[b9];
						cF[bM] = c0.x;
						cF[bM + 1] = c0.y;
						cF[bM + 2] = c0.z;
						cF[bM + 3] = cZ.x;
						cF[bM + 4] = cZ.y;
						cF[bM + 5] = cZ.z;
						cF[bM + 6] = cY.x;
						cF[bM + 7] = cY.y;
						cF[bM + 8] = cY.z
					}
					bM += 9
				}
				b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglMorphTargetsBuffers[b9]);
				b.bufferData(b.ARRAY_BUFFER, c4[b9], dg);
				if (de.morphNormals) {
					b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglMorphNormalsBuffers[b9]);
					b.bufferData(b.ARRAY_BUFFER, cb[b9], dg)
				}
			}
		}
		if (cW.length) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				bN = cV[b4[cq]];
				cU = cW[bN.a];
				cT = cW[bN.b];
				cQ = cW[bN.c];
				c5[cp] = cU.x;
				c5[cp + 1] = cU.y;
				c5[cp + 2] = cU.z;
				c5[cp + 3] = cU.w;
				c5[cp + 4] = cT.x;
				c5[cp + 5] = cT.y;
				c5[cp + 6] = cT.z;
				c5[cp + 7] = cT.w;
				c5[cp + 8] = cQ.x;
				c5[cp + 9] = cQ.y;
				c5[cp + 10] = cQ.z;
				c5[cp + 11] = cQ.w;
				bV = ci[bN.a];
				bU = ci[bN.b];
				bT = ci[bN.c];
				cO[cp] = bV.x;
				cO[cp + 1] = bV.y;
				cO[cp + 2] = bV.z;
				cO[cp + 3] = bV.w;
				cO[cp + 4] = bU.x;
				cO[cp + 5] = bU.y;
				cO[cp + 6] = bU.z;
				cO[cp + 7] = bU.w;
				cO[cp + 8] = bT.x;
				cO[cp + 9] = bT.y;
				cO[cp + 10] = bT.z;
				cO[cp + 11] = bT.w;
				cp += 12
			}
			if (cp > 0) {
				b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglSkinIndicesBuffer);
				b.bufferData(b.ARRAY_BUFFER, cO, dg);
				b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglSkinWeightsBuffer);
				b.bufferData(b.ARRAY_BUFFER, c5, dg)
			}
		}
		if (cR) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				bN = cV[b4[cq]];
				b3 = bN.vertexColors;
				cl = bN.color;
				if (b3.length === 3 && de.vertexColors === THREE.VertexColors) {
					cH = b3[0];
					cG = b3[1];
					cE = b3[2]
				} else {
					cH = cl;
					cG = cl;
					cE = cl
				}
				cv[b0] = cH.r;
				cv[b0 + 1] = cH.g;
				cv[b0 + 2] = cH.b;
				cv[b0 + 3] = cG.r;
				cv[b0 + 4] = cG.g;
				cv[b0 + 5] = cG.b;
				cv[b0 + 6] = cE.r;
				cv[b0 + 7] = cE.g;
				cv[b0 + 8] = cE.b;
				b0 += 9
			}
			if (b0 > 0) {
				b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglColorBuffer);
				b.bufferData(b.ARRAY_BUFFER, cv, dg)
			}
		}
		if (dd && cK.hasTangents) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				bN = cV[b4[cq]];
				bO = bN.vertexTangents;
				dc = bO[0];
				da = bO[1];
				c8 = bO[2];
				cS[b2] = dc.x;
				cS[b2 + 1] = dc.y;
				cS[b2 + 2] = dc.z;
				cS[b2 + 3] = dc.w;
				cS[b2 + 4] = da.x;
				cS[b2 + 5] = da.y;
				cS[b2 + 6] = da.z;
				cS[b2 + 7] = da.w;
				cS[b2 + 8] = c8.x;
				cS[b2 + 9] = c8.y;
				cS[b2 + 10] = c8.z;
				cS[b2 + 11] = c8.w;
				b2 += 12
			}
			b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglTangentBuffer);
			b.bufferData(b.ARRAY_BUFFER, cS, dg)
		}
		if (bP) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				bN = cV[b4[cq]];
				b1 = bN.vertexNormals;
				bS = bN.normal;
				if (b1.length === 3 && ca === false) {
					for (co = 0; co < 3; co++) {
						b8 = b1[co];
						cP[ce] = b8.x;
						cP[ce + 1] = b8.y;
						cP[ce + 2] = b8.z;
						ce += 3
					}
				} else {
					for (co = 0; co < 3; co++) {
						cP[ce] = bS.x;
						cP[ce + 1] = bS.y;
						cP[ce + 2] = bS.z;
						ce += 3
					}
				}
			}
			b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglNormalBuffer);
			b.bufferData(b.ARRAY_BUFFER, cP, dg)
		}
		if (cw && cu) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				c6 = b4[cq];
				ck = cu[c6];
				if (ck === undefined) {
					continue
				}
				for (co = 0; co < 3; co++) {
					cD = ck[co];
					cf[cL] = cD.x;
					cf[cL + 1] = cD.y;
					cL += 2
				}
			}
			if (cL > 0) {
				b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglUVBuffer);
				b.bufferData(b.ARRAY_BUFFER, cf, dg)
			}
		}
		if (cw && cc) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				c6 = b4[cq];
				db = cc[c6];
				if (db === undefined) {
					continue
				}
				for (co = 0; co < 3; co++) {
					cI = db[co];
					bY[c9] = cI.x;
					bY[c9 + 1] = cI.y;
					c9 += 2
				}
			}
			if (c9 > 0) {
				b.bindBuffer(b.ARRAY_BUFFER, cJ.__webglUV2Buffer);
				b.bufferData(b.ARRAY_BUFFER, bY, dg)
			}
		}
		if (cs) {
			for (cq = 0, cX = b4.length; cq < cX; cq++) {
				c7[cn] = b5;
				c7[cn + 1] = b5 + 1;
				c7[cn + 2] = b5 + 2;
				cn += 3;
				ct[cy] = b5;
				ct[cy + 1] = b5 + 1;
				ct[cy + 2] = b5;
				ct[cy + 3] = b5 + 2;
				ct[cy + 4] = b5 + 1;
				ct[cy + 5] = b5 + 2;
				cy += 6;
				b5 += 3
			}
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, cJ.__webglFaceBuffer);
			b.bufferData(b.ELEMENT_ARRAY_BUFFER, c7, dg);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, cJ.__webglLineBuffer);
			b.bufferData(b.ELEMENT_ARRAY_BUFFER, ct, dg)
		}
		if (cd) {
			for (co = 0, cj = cd.length; co < cj; co++) {
				bQ = cd[co];
				if (!bQ.__original.needsUpdate) {
					continue
				}
				bW = 0;
				if (bQ.size === 1) {
					if (bQ.boundTo === undefined || bQ.boundTo === "vertices") {
						for (cq = 0, cX = b4.length; cq < cX; cq++) {
							bN = cV[b4[cq]];
							bQ.array[bW] = bQ.value[bN.a];
							bQ.array[bW + 1] = bQ.value[bN.b];
							bQ.array[bW + 2] = bQ.value[bN.c];
							bW += 3
						}
					} else {
						if (bQ.boundTo === "faces") {
							for (cq = 0, cX = b4.length; cq < cX; cq++) {
								ch = bQ.value[b4[cq]];
								bQ.array[bW] = ch;
								bQ.array[bW + 1] = ch;
								bQ.array[bW + 2] = ch;
								bW += 3
							}
						}
					}
				} else {
					if (bQ.size === 2) {
						if (bQ.boundTo === undefined || bQ.boundTo === "vertices") {
							for (cq = 0, cX = b4.length; cq < cX; cq++) {
								bN = cV[b4[cq]];
								cB = bQ.value[bN.a];
								cA = bQ.value[bN.b];
								cz = bQ.value[bN.c];
								bQ.array[bW] = cB.x;
								bQ.array[bW + 1] = cB.y;
								bQ.array[bW + 2] = cA.x;
								bQ.array[bW + 3] = cA.y;
								bQ.array[bW + 4] = cz.x;
								bQ.array[bW + 5] = cz.y;
								bW += 6
							}
						} else {
							if (bQ.boundTo === "faces") {
								for (cq = 0, cX = b4.length; cq < cX; cq++) {
									ch = bQ.value[b4[cq]];
									cB = ch;
									cA = ch;
									cz = ch;
									bQ.array[bW] = cB.x;
									bQ.array[bW + 1] = cB.y;
									bQ.array[bW + 2] = cA.x;
									bQ.array[bW + 3] = cA.y;
									bQ.array[bW + 4] = cz.x;
									bQ.array[bW + 5] = cz.y;
									bW += 6
								}
							}
						}
					} else {
						if (bQ.size === 3) {
							var b6;
							if (bQ.type === "c") {
								b6 = ["r", "g", "b"]
							} else {
								b6 = ["x", "y", "z"]
							}
							if (bQ.boundTo === undefined || bQ.boundTo === "vertices") {
								for (cq = 0, cX = b4.length; cq < cX; cq++) {
									bN = cV[b4[cq]];
									cB = bQ.value[bN.a];
									cA = bQ.value[bN.b];
									cz = bQ.value[bN.c];
									bQ.array[bW] = cB[b6[0]];
									bQ.array[bW + 1] = cB[b6[1]];
									bQ.array[bW + 2] = cB[b6[2]];
									bQ.array[bW + 3] = cA[b6[0]];
									bQ.array[bW + 4] = cA[b6[1]];
									bQ.array[bW + 5] = cA[b6[2]];
									bQ.array[bW + 6] = cz[b6[0]];
									bQ.array[bW + 7] = cz[b6[1]];
									bQ.array[bW + 8] = cz[b6[2]];
									bW += 9
								}
							} else {
								if (bQ.boundTo === "faces") {
									for (cq = 0, cX = b4.length; cq < cX; cq++) {
										ch = bQ.value[b4[cq]];
										cB = ch;
										cA = ch;
										cz = ch;
										bQ.array[bW] = cB[b6[0]];
										bQ.array[bW + 1] = cB[b6[1]];
										bQ.array[bW + 2] = cB[b6[2]];
										bQ.array[bW + 3] = cA[b6[0]];
										bQ.array[bW + 4] = cA[b6[1]];
										bQ.array[bW + 5] = cA[b6[2]];
										bQ.array[bW + 6] = cz[b6[0]];
										bQ.array[bW + 7] = cz[b6[1]];
										bQ.array[bW + 8] = cz[b6[2]];
										bW += 9
									}
								} else {
									if (bQ.boundTo === "faceVertices") {
										for (cq = 0, cX = b4.length; cq < cX; cq++) {
											ch = bQ.value[b4[cq]];
											cB = ch[0];
											cA = ch[1];
											cz = ch[2];
											bQ.array[bW] = cB[b6[0]];
											bQ.array[bW + 1] = cB[b6[1]];
											bQ.array[bW + 2] = cB[b6[2]];
											bQ.array[bW + 3] = cA[b6[0]];
											bQ.array[bW + 4] = cA[b6[1]];
											bQ.array[bW + 5] = cA[b6[2]];
											bQ.array[bW + 6] = cz[b6[0]];
											bQ.array[bW + 7] = cz[b6[1]];
											bQ.array[bW + 8] = cz[b6[2]];
											bW += 9
										}
									}
								}
							}
						} else {
							if (bQ.size === 4) {
								if (bQ.boundTo === undefined || bQ.boundTo === "vertices") {
									for (cq = 0, cX = b4.length; cq < cX; cq++) {
										bN = cV[b4[cq]];
										cB = bQ.value[bN.a];
										cA = bQ.value[bN.b];
										cz = bQ.value[bN.c];
										bQ.array[bW] = cB.x;
										bQ.array[bW + 1] = cB.y;
										bQ.array[bW + 2] = cB.z;
										bQ.array[bW + 3] = cB.w;
										bQ.array[bW + 4] = cA.x;
										bQ.array[bW + 5] = cA.y;
										bQ.array[bW + 6] = cA.z;
										bQ.array[bW + 7] = cA.w;
										bQ.array[bW + 8] = cz.x;
										bQ.array[bW + 9] = cz.y;
										bQ.array[bW + 10] = cz.z;
										bQ.array[bW + 11] = cz.w;
										bW += 12
									}
								} else {
									if (bQ.boundTo === "faces") {
										for (cq = 0, cX = b4.length; cq < cX; cq++) {
											ch = bQ.value[b4[cq]];
											cB = ch;
											cA = ch;
											cz = ch;
											bQ.array[bW] = cB.x;
											bQ.array[bW + 1] = cB.y;
											bQ.array[bW + 2] = cB.z;
											bQ.array[bW + 3] = cB.w;
											bQ.array[bW + 4] = cA.x;
											bQ.array[bW + 5] = cA.y;
											bQ.array[bW + 6] = cA.z;
											bQ.array[bW + 7] = cA.w;
											bQ.array[bW + 8] = cz.x;
											bQ.array[bW + 9] = cz.y;
											bQ.array[bW + 10] = cz.z;
											bQ.array[bW + 11] = cz.w;
											bW += 12
										}
									} else {
										if (bQ.boundTo === "faceVertices") {
											for (cq = 0, cX = b4.length; cq < cX; cq++) {
												ch = bQ.value[b4[cq]];
												cB = ch[0];
												cA = ch[1];
												cz = ch[2];
												bQ.array[bW] = cB.x;
												bQ.array[bW + 1] = cB.y;
												bQ.array[bW + 2] = cB.z;
												bQ.array[bW + 3] = cB.w;
												bQ.array[bW + 4] = cA.x;
												bQ.array[bW + 5] = cA.y;
												bQ.array[bW + 6] = cA.z;
												bQ.array[bW + 7] = cA.w;
												bQ.array[bW + 8] = cz.x;
												bQ.array[bW + 9] = cz.y;
												bQ.array[bW + 10] = cz.z;
												bQ.array[bW + 11] = cz.w;
												bW += 12
											}
										}
									}
								}
							}
						}
					}
				}
				b.bindBuffer(b.ARRAY_BUFFER, bQ.buffer);
				b.bufferData(b.ARRAY_BUFFER, bQ.array, dg)
			}
		}
		if (bX) {
			delete cJ.__inittedArrays;
			delete cJ.__colorArray;
			delete cJ.__normalArray;
			delete cJ.__tangentArray;
			delete cJ.__uvArray;
			delete cJ.__uv2Array;
			delete cJ.__faceArray;
			delete cJ.__vertexArray;
			delete cJ.__lineArray;
			delete cJ.__skinIndexArray;
			delete cJ.__skinWeightArray
		}
	}
	this.renderBufferImmediate = function(b1, bP, bR) {
		aX.initAttributes();
		if (b1.hasPositions && !b1.__webglVertexBuffer) {
			b1.__webglVertexBuffer = b.createBuffer()
		}
		if (b1.hasNormals && !b1.__webglNormalBuffer) {
			b1.__webglNormalBuffer = b.createBuffer()
		}
		if (b1.hasUvs && !b1.__webglUvBuffer) {
			b1.__webglUvBuffer = b.createBuffer()
		}
		if (b1.hasColors && !b1.__webglColorBuffer) {
			b1.__webglColorBuffer = b.createBuffer()
		}
		if (b1.hasPositions) {
			b.bindBuffer(b.ARRAY_BUFFER, b1.__webglVertexBuffer);
			b.bufferData(b.ARRAY_BUFFER, b1.positionArray, b.DYNAMIC_DRAW);
			aX.enableAttribute(bP.attributes.position);
			b.vertexAttribPointer(bP.attributes.position, 3, b.FLOAT, false, 0, 0)
		}
		if (b1.hasNormals) {
			b.bindBuffer(b.ARRAY_BUFFER, b1.__webglNormalBuffer);
			if (bR instanceof THREE.MeshPhongMaterial === false && bR.shading === THREE.FlatShading) {
				var bZ, bY, bW, bO, bU, b3, bN, bT, b2, bM, bS, b0, bX, bV, bQ = b1.count * 3;
				for (bV = 0; bV < bQ; bV += 9) {
					bX = b1.normalArray;
					bO = bX[bV];
					bN = bX[bV + 1];
					bM = bX[bV + 2];
					bU = bX[bV + 3];
					bT = bX[bV + 4];
					bS = bX[bV + 5];
					b3 = bX[bV + 6];
					b2 = bX[bV + 7];
					b0 = bX[bV + 8];
					bZ = (bO + bU + b3) / 3;
					bY = (bN + bT + b2) / 3;
					bW = (bM + bS + b0) / 3;
					bX[bV] = bZ;
					bX[bV + 1] = bY;
					bX[bV + 2] = bW;
					bX[bV + 3] = bZ;
					bX[bV + 4] = bY;
					bX[bV + 5] = bW;
					bX[bV + 6] = bZ;
					bX[bV + 7] = bY;
					bX[bV + 8] = bW
				}
			}
			b.bufferData(b.ARRAY_BUFFER, b1.normalArray, b.DYNAMIC_DRAW);
			aX.enableAttribute(bP.attributes.normal);
			b.vertexAttribPointer(bP.attributes.normal, 3, b.FLOAT, false, 0, 0)
		}
		if (b1.hasUvs && bR.map) {
			b.bindBuffer(b.ARRAY_BUFFER, b1.__webglUvBuffer);
			b.bufferData(b.ARRAY_BUFFER, b1.uvArray, b.DYNAMIC_DRAW);
			aX.enableAttribute(bP.attributes.uv);
			b.vertexAttribPointer(bP.attributes.uv, 2, b.FLOAT, false, 0, 0)
		}
		if (b1.hasColors && bR.vertexColors !== THREE.NoColors) {
			b.bindBuffer(b.ARRAY_BUFFER, b1.__webglColorBuffer);
			b.bufferData(b.ARRAY_BUFFER, b1.colorArray, b.DYNAMIC_DRAW);
			aX.enableAttribute(bP.attributes.color);
			b.vertexAttribPointer(bP.attributes.color, 3, b.FLOAT, false, 0, 0)
		}
		aX.disableUnusedAttributes();
		b.drawArrays(b.TRIANGLES, 0, b1.count);
		b1.count = 0
	};

	function U(bS, bQ, bT, bW) {
		var bR = bT.attributes;
		var bM = bQ.attributes;
		var bV = bQ.attributesKeys;
		for (var bP = 0, bN = bV.length; bP < bN; bP++) {
			var bU = bV[bP];
			var bO = bM[bU];
			if (bO >= 0) {
				var bY = bR[bU];
				if (bY !== undefined) {
					var bX = bY.itemSize;
					b.bindBuffer(b.ARRAY_BUFFER, bY.buffer);
					aX.enableAttribute(bO);
					b.vertexAttribPointer(bO, bX, b.FLOAT, false, 0, bW * bX * 4)
				} else {
					if (bS.defaultAttributeValues !== undefined) {
						if (bS.defaultAttributeValues[bU].length === 2) {
							b.vertexAttrib2fv(bO, bS.defaultAttributeValues[bU])
						} else {
							if (bS.defaultAttributeValues[bU].length === 3) {
								b.vertexAttrib3fv(bO, bS.defaultAttributeValues[bU])
							}
						}
					}
				}
			}
		}
		aX.disableUnusedAttributes()
	}
	this.renderBufferDirect = function(b1, b2, bM, bU, bP, b4) {
		if (bU.visible === false) {
			return
		}
		I(b4);
		var bS = aE(b1, b2, bM, bU, b4);
		var bX = false,
			bZ = bU.wireframe ? 1 : 0,
			bY = "direct_" + bP.id + "_" + bS.id + "_" + bZ;
		if (bY !== au) {
			au = bY;
			bX = true
		}
		if (bX) {
			aX.initAttributes()
		}
		if (b4 instanceof THREE.Mesh) {
			var bV = bU.wireframe === true ? b.LINES : b.TRIANGLES;
			var bR = bP.attributes.index;
			if (bR) {
				var bN, bW;
				if (bR.array instanceof Uint32Array && aW.get("OES_element_index_uint")) {
					bN = b.UNSIGNED_INT;
					bW = 4
				} else {
					bN = b.UNSIGNED_SHORT;
					bW = 2
				}
				var bQ = bP.offsets;
				if (bQ.length === 0) {
					if (bX) {
						U(bU, bS, bP, 0);
						b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.buffer)
					}
					b.drawElements(bV, bR.array.length, bN, 0);
					aD.info.render.calls++;
					aD.info.render.vertices += bR.array.length;
					aD.info.render.faces += bR.array.length / 3
				} else {
					bX = true;
					for (var b0 = 0, bT = bQ.length; b0 < bT; b0++) {
						var bO = bQ[b0].index;
						if (bX) {
							U(bU, bS, bP, bO);
							b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.buffer)
						}
						b.drawElements(bV, bQ[b0].count, bN, bQ[b0].start * bW);
						aD.info.render.calls++;
						aD.info.render.vertices += bQ[b0].count;
						aD.info.render.faces += bQ[b0].count / 3
					}
				}
			} else {
				if (bX) {
					U(bU, bS, bP, 0)
				}
				var b3 = bP.attributes.position;
				b.drawArrays(bV, 0, b3.array.length / b3.itemSize);
				aD.info.render.calls++;
				aD.info.render.vertices += b3.array.length / b3.itemSize;
				aD.info.render.faces += b3.array.length / (3 * b3.itemSize)
			}
		} else {
			if (b4 instanceof THREE.PointCloud) {
				var bV = b.POINTS;
				var bR = bP.attributes.index;
				if (bR) {
					var bN, bW;
					if (bR.array instanceof Uint32Array && aW.get("OES_element_index_uint")) {
						bN = b.UNSIGNED_INT;
						bW = 4
					} else {
						bN = b.UNSIGNED_SHORT;
						bW = 2
					}
					var bQ = bP.offsets;
					if (bQ.length === 0) {
						if (bX) {
							U(bU, bS, bP, 0);
							b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.buffer)
						}
						b.drawElements(bV, bR.array.length, bN, 0);
						aD.info.render.calls++;
						aD.info.render.points += bR.array.length
					} else {
						if (bQ.length > 1) {
							bX = true
						}
						for (var b0 = 0, bT = bQ.length; b0 < bT; b0++) {
							var bO = bQ[b0].index;
							if (bX) {
								U(bU, bS, bP, bO);
								b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.buffer)
							}
							b.drawElements(bV, bQ[b0].count, bN, bQ[b0].start * bW);
							aD.info.render.calls++;
							aD.info.render.points += bQ[b0].count
						}
					}
				} else {
					if (bX) {
						U(bU, bS, bP, 0)
					}
					var b3 = bP.attributes.position;
					var bQ = bP.offsets;
					if (bQ.length === 0) {
						b.drawArrays(bV, 0, b3.array.length / 3);
						aD.info.render.calls++;
						aD.info.render.points += b3.array.length / 3
					} else {
						for (var b0 = 0, bT = bQ.length; b0 < bT; b0++) {
							b.drawArrays(bV, bQ[b0].index, bQ[b0].count);
							aD.info.render.calls++;
							aD.info.render.points += bQ[b0].count
						}
					}
				}
			} else {
				if (b4 instanceof THREE.Line) {
					var bV = (b4.mode === THREE.LineStrip) ? b.LINE_STRIP : b.LINES;
					aX.setLineWidth(bU.linewidth * k);
					var bR = bP.attributes.index;
					if (bR) {
						var bN, bW;
						if (bR.array instanceof Uint32Array) {
							bN = b.UNSIGNED_INT;
							bW = 4
						} else {
							bN = b.UNSIGNED_SHORT;
							bW = 2
						}
						var bQ = bP.offsets;
						if (bQ.length === 0) {
							if (bX) {
								U(bU, bS, bP, 0);
								b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.buffer)
							}
							b.drawElements(bV, bR.array.length, bN, 0);
							aD.info.render.calls++;
							aD.info.render.vertices += bR.array.length
						} else {
							if (bQ.length > 1) {
								bX = true
							}
							for (var b0 = 0, bT = bQ.length; b0 < bT; b0++) {
								var bO = bQ[b0].index;
								if (bX) {
									U(bU, bS, bP, bO);
									b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.buffer)
								}
								b.drawElements(bV, bQ[b0].count, bN, bQ[b0].start * bW);
								aD.info.render.calls++;
								aD.info.render.vertices += bQ[b0].count
							}
						}
					} else {
						if (bX) {
							U(bU, bS, bP, 0)
						}
						var b3 = bP.attributes.position;
						var bQ = bP.offsets;
						if (bQ.length === 0) {
							b.drawArrays(bV, 0, b3.array.length / 3);
							aD.info.render.calls++;
							aD.info.render.vertices += b3.array.length / 3
						} else {
							for (var b0 = 0, bT = bQ.length; b0 < bT; b0++) {
								b.drawArrays(bV, bQ[b0].index, bQ[b0].count);
								aD.info.render.calls++;
								aD.info.render.vertices += bQ[b0].count
							}
						}
					}
				}
			}
		}
	};
	this.renderBuffer = function(bX, bS, bM, bY, bR, bQ) {
		if (bY.visible === false) {
			return
		}
		I(bQ);
		var bV = aE(bX, bS, bM, bY, bQ);
		var bT = bV.attributes;
		var bP = false,
			b0 = bY.wireframe ? 1 : 0,
			bO = bR.id + "_" + bV.id + "_" + b0;
		if (bO !== au) {
			au = bO;
			bP = true
		}
		if (bP) {
			aX.initAttributes()
		}
		if (!bY.morphTargets && bT.position >= 0) {
			if (bP) {
				b.bindBuffer(b.ARRAY_BUFFER, bR.__webglVertexBuffer);
				aX.enableAttribute(bT.position);
				b.vertexAttribPointer(bT.position, 3, b.FLOAT, false, 0, 0)
			}
		} else {
			if (bQ.morphTargetBase) {
				r(bY, bR, bQ)
			}
		}
		if (bP) {
			if (bR.__webglCustomAttributesList) {
				for (var bU = 0, b1 = bR.__webglCustomAttributesList.length; bU < b1; bU++) {
					var bN = bR.__webglCustomAttributesList[bU];
					if (bT[bN.buffer.belongsToAttribute] >= 0) {
						b.bindBuffer(b.ARRAY_BUFFER, bN.buffer);
						aX.enableAttribute(bT[bN.buffer.belongsToAttribute]);
						b.vertexAttribPointer(bT[bN.buffer.belongsToAttribute], bN.size, b.FLOAT, false, 0, 0)
					}
				}
			}
			if (bT.color >= 0) {
				if (bQ.geometry.colors.length > 0 || bQ.geometry.faces.length > 0) {
					b.bindBuffer(b.ARRAY_BUFFER, bR.__webglColorBuffer);
					aX.enableAttribute(bT.color);
					b.vertexAttribPointer(bT.color, 3, b.FLOAT, false, 0, 0)
				} else {
					if (bY.defaultAttributeValues !== undefined) {
						b.vertexAttrib3fv(bT.color, bY.defaultAttributeValues.color)
					}
				}
			}
			if (bT.normal >= 0) {
				b.bindBuffer(b.ARRAY_BUFFER, bR.__webglNormalBuffer);
				aX.enableAttribute(bT.normal);
				b.vertexAttribPointer(bT.normal, 3, b.FLOAT, false, 0, 0)
			}
			if (bT.tangent >= 0) {
				b.bindBuffer(b.ARRAY_BUFFER, bR.__webglTangentBuffer);
				aX.enableAttribute(bT.tangent);
				b.vertexAttribPointer(bT.tangent, 4, b.FLOAT, false, 0, 0)
			}
			if (bT.uv >= 0) {
				if (bQ.geometry.faceVertexUvs[0]) {
					b.bindBuffer(b.ARRAY_BUFFER, bR.__webglUVBuffer);
					aX.enableAttribute(bT.uv);
					b.vertexAttribPointer(bT.uv, 2, b.FLOAT, false, 0, 0)
				} else {
					if (bY.defaultAttributeValues !== undefined) {
						b.vertexAttrib2fv(bT.uv, bY.defaultAttributeValues.uv)
					}
				}
			}
			if (bT.uv2 >= 0) {
				if (bQ.geometry.faceVertexUvs[1]) {
					b.bindBuffer(b.ARRAY_BUFFER, bR.__webglUV2Buffer);
					aX.enableAttribute(bT.uv2);
					b.vertexAttribPointer(bT.uv2, 2, b.FLOAT, false, 0, 0)
				} else {
					if (bY.defaultAttributeValues !== undefined) {
						b.vertexAttrib2fv(bT.uv2, bY.defaultAttributeValues.uv2)
					}
				}
			}
			if (bY.skinning && bT.skinIndex >= 0 && bT.skinWeight >= 0) {
				b.bindBuffer(b.ARRAY_BUFFER, bR.__webglSkinIndicesBuffer);
				aX.enableAttribute(bT.skinIndex);
				b.vertexAttribPointer(bT.skinIndex, 4, b.FLOAT, false, 0, 0);
				b.bindBuffer(b.ARRAY_BUFFER, bR.__webglSkinWeightsBuffer);
				aX.enableAttribute(bT.skinWeight);
				b.vertexAttribPointer(bT.skinWeight, 4, b.FLOAT, false, 0, 0)
			}
			if (bT.lineDistance >= 0) {
				b.bindBuffer(b.ARRAY_BUFFER, bR.__webglLineDistanceBuffer);
				aX.enableAttribute(bT.lineDistance);
				b.vertexAttribPointer(bT.lineDistance, 1, b.FLOAT, false, 0, 0)
			}
		}
		aX.disableUnusedAttributes();
		if (bQ instanceof THREE.Mesh) {
			var bZ = bR.__typeArray === Uint32Array ? b.UNSIGNED_INT : b.UNSIGNED_SHORT;
			if (bY.wireframe) {
				aX.setLineWidth(bY.wireframeLinewidth * k);
				if (bP) {
					b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.__webglLineBuffer)
				}
				b.drawElements(b.LINES, bR.__webglLineCount, bZ, 0)
			} else {
				if (bP) {
					b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, bR.__webglFaceBuffer)
				}
				b.drawElements(b.TRIANGLES, bR.__webglFaceCount, bZ, 0)
			}
			aD.info.render.calls++;
			aD.info.render.vertices += bR.__webglFaceCount;
			aD.info.render.faces += bR.__webglFaceCount / 3
		} else {
			if (bQ instanceof THREE.Line) {
				var bW = (bQ.mode === THREE.LineStrip) ? b.LINE_STRIP : b.LINES;
				aX.setLineWidth(bY.linewidth * k);
				b.drawArrays(bW, 0, bR.__webglLineCount);
				aD.info.render.calls++
			} else {
				if (bQ instanceof THREE.PointCloud) {
					b.drawArrays(b.POINTS, 0, bR.__webglParticleCount);
					aD.info.render.calls++;
					aD.info.render.points += bR.__webglParticleCount
				}
			}
		}
	};

	function r(bX, bS, bR) {
		var bV = bX.program.attributes;
		if (bR.morphTargetBase !== -1 && bV.position >= 0) {
			b.bindBuffer(b.ARRAY_BUFFER, bS.__webglMorphTargetsBuffers[bR.morphTargetBase]);
			aX.enableAttribute(bV.position);
			b.vertexAttribPointer(bV.position, 3, b.FLOAT, false, 0, 0)
		} else {
			if (bV.position >= 0) {
				b.bindBuffer(b.ARRAY_BUFFER, bS.__webglVertexBuffer);
				aX.enableAttribute(bV.position);
				b.vertexAttribPointer(bV.position, 3, b.FLOAT, false, 0, 0)
			}
		}
		if (bR.morphTargetForcedOrder.length) {
			var bO = 0;
			var bP = bR.morphTargetForcedOrder;
			var bZ = bR.morphTargetInfluences;
			var bM;
			while (bO < bX.numSupportedMorphTargets && bO < bP.length) {
				bM = bV["morphTarget" + bO];
				if (bM >= 0) {
					b.bindBuffer(b.ARRAY_BUFFER, bS.__webglMorphTargetsBuffers[bP[bO]]);
					aX.enableAttribute(bM);
					b.vertexAttribPointer(bM, 3, b.FLOAT, false, 0, 0)
				}
				bM = bV["morphNormal" + bO];
				if (bM >= 0 && bX.morphNormals) {
					b.bindBuffer(b.ARRAY_BUFFER, bS.__webglMorphNormalsBuffers[bP[bO]]);
					aX.enableAttribute(bM);
					b.vertexAttribPointer(bM, 3, b.FLOAT, false, 0, 0)
				}
				bR.__webglMorphTargetInfluences[bO] = bZ[bP[bO]];
				bO++
			}
		} else {
			var bQ = [];
			var bZ = bR.morphTargetInfluences;
			var bN = bR.geometry.morphTargets;
			if (bZ.length > bN.length) {
				console.warn("THREE.WebGLRenderer: Influences array is bigger than morphTargets array.");
				bZ.length = bN.length
			}
			for (var bW = 0, b0 = bZ.length; bW < b0; bW++) {
				var bY = bZ[bW];
				bQ.push([bY, bW])
			}
			if (bQ.length > bX.numSupportedMorphTargets) {
				bQ.sort(Y);
				bQ.length = bX.numSupportedMorphTargets
			} else {
				if (bQ.length > bX.numSupportedMorphNormals) {
					bQ.sort(Y)
				} else {
					if (bQ.length === 0) {
						bQ.push([0, 0])
					}
				}
			}
			var bM;
			for (var bO = 0, bU = bX.numSupportedMorphTargets; bO < bU; bO++) {
				if (bQ[bO]) {
					var bT = bQ[bO][1];
					bM = bV["morphTarget" + bO];
					if (bM >= 0) {
						b.bindBuffer(b.ARRAY_BUFFER, bS.__webglMorphTargetsBuffers[bT]);
						aX.enableAttribute(bM);
						b.vertexAttribPointer(bM, 3, b.FLOAT, false, 0, 0)
					}
					bM = bV["morphNormal" + bO];
					if (bM >= 0 && bX.morphNormals) {
						b.bindBuffer(b.ARRAY_BUFFER, bS.__webglMorphNormalsBuffers[bT]);
						aX.enableAttribute(bM);
						b.vertexAttribPointer(bM, 3, b.FLOAT, false, 0, 0)
					}
					bR.__webglMorphTargetInfluences[bO] = bZ[bT]
				} else {
					bR.__webglMorphTargetInfluences[bO] = 0
				}
			}
		}
		if (bX.program.uniforms.morphTargetInfluences !== null) {
			b.uniform1fv(bX.program.uniforms.morphTargetInfluences, bR.__webglMorphTargetInfluences)
		}
	}

	function ax(bN, bM) {
		if (bN.object.renderOrder !== bM.object.renderOrder) {
			return bN.object.renderOrder - bM.object.renderOrder
		} else {
			if (bN.material.id !== bM.material.id) {
				return bN.material.id - bM.material.id
			} else {
				if (bN.z !== bM.z) {
					return bN.z - bM.z
				} else {
					return bN.id - bM.id
				}
			}
		}
	}

	function bb(bN, bM) {
		if (bN.object.renderOrder !== bM.object.renderOrder) {
			return bN.object.renderOrder - bM.object.renderOrder
		}
		if (bN.z !== bM.z) {
			return bM.z - bN.z
		} else {
			return bN.id - bM.id
		}
	}

	function Y(bN, bM) {
		return bM[0] - bN[0]
	}
	this.render = function(bQ, bU, bR, bS) {
		if (bU instanceof THREE.Camera === false) {
			THREE.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
			return
		}
		var bM = bQ.fog;
		au = "";
		aT = -1;
		aA = null;
		bL = true;
		if (bQ.autoUpdate === true) {
			bQ.updateMatrixWorld()
		}
		if (bU.parent === undefined) {
			bU.updateMatrixWorld()
		}
		bQ.traverse(function(bW) {
			if (bW instanceof THREE.SkinnedMesh) {
				bW.skeleton.update()
			}
		});
		bU.matrixWorldInverse.getInverse(bU.matrixWorld);
		aQ.multiplyMatrices(bU.projectionMatrix, bU.matrixWorldInverse);
		bi.setFromMatrix(aQ);
		by.length = 0;
		bl.length = 0;
		t.length = 0;
		Z.length = 0;
		M.length = 0;
		am(bQ);
		if (aD.sortObjects === true) {
			bl.sort(ax);
			t.sort(bb)
		}
		h.render(bQ, bU);
		aD.info.render.calls = 0;
		aD.info.render.vertices = 0;
		aD.info.render.faces = 0;
		aD.info.render.points = 0;
		this.setRenderTarget(bR);
		if (this.autoClear || bS) {
			this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil)
		}
		for (var bO = 0, bV = l.length; bO < bV; bO++) {
			var bP = l[bO];
			var bN = bP.object;
			if (bN.visible) {
				a6(bN, bU);
				aG(bP)
			}
		}
		if (bQ.overrideMaterial) {
			var bT = bQ.overrideMaterial;
			C(bT);
			bj(bl, bU, by, bM, bT);
			bj(t, bU, by, bM, bT);
			bw(l, "", bU, by, bM, bT)
		} else {
			aX.setBlending(THREE.NoBlending);
			bj(bl, bU, by, bM, null);
			bw(l, "opaque", bU, by, bM, null);
			bj(t, bU, by, bM, null);
			bw(l, "transparent", bU, by, bM, null)
		}
		a7.render(bQ, bU);
		bz.render(bQ, bU, A, aH);
		if (bR && bR.generateMipmaps && bR.minFilter !== THREE.NearestFilter && bR.minFilter !== THREE.LinearFilter) {
			aM(bR)
		}
		aX.setDepthTest(true);
		aX.setDepthWrite(true);
		aX.setColorWrite(true)
	};

	function am(bN) {
		if (bN.visible === false) {
			return
		}
		if (bN instanceof THREE.Scene || bN instanceof THREE.Group) {} else {
			B(bN);
			if (bN instanceof THREE.Light) {
				by.push(bN)
			} else {
				if (bN instanceof THREE.Sprite) {
					Z.push(bN)
				} else {
					if (bN instanceof THREE.LensFlare) {
						M.push(bN)
					} else {
						var bP = o[bN.id];
						if (bP && (bN.frustumCulled === false || bi.intersectsObject(bN) === true)) {
							for (var bO = 0, bM = bP.length; bO < bM; bO++) {
								var bQ = bP[bO];
								ak(bQ);
								bQ.render = true;
								if (aD.sortObjects === true) {
									Q.setFromMatrixPosition(bN.matrixWorld);
									Q.applyProjection(aQ);
									bQ.z = Q.z
								}
							}
						}
					}
				}
			}
		}
		for (var bO = 0, bM = bN.children.length; bO < bM; bO++) {
			am(bN.children[bO])
		}
	}

	function bj(bM, bU, bR, bN, bW) {
		var bV;
		for (var bS = 0, bO = bM.length; bS < bO; bS++) {
			var bT = bM[bS];
			var bP = bT.object;
			var bQ = bT.buffer;
			a6(bP, bU);
			if (bW) {
				bV = bW
			} else {
				bV = bT.material;
				if (!bV) {
					continue
				}
				C(bV)
			}
			aD.setMaterialFaces(bV);
			if (bQ instanceof THREE.BufferGeometry) {
				aD.renderBufferDirect(bU, bR, bN, bV, bQ, bP)
			} else {
				aD.renderBuffer(bU, bR, bN, bV, bQ, bP)
			}
		}
	}

	function bw(bM, bT, bU, bQ, bN, bW) {
		var bV;
		for (var bR = 0, bO = bM.length; bR < bO; bR++) {
			var bS = bM[bR];
			var bP = bS.object;
			if (bP.visible) {
				if (bW) {
					bV = bW
				} else {
					bV = bS[bT];
					if (!bV) {
						continue
					}
					C(bV)
				}
				aD.renderImmediateObject(bU, bQ, bN, bV, bP)
			}
		}
	}
	this.renderImmediateObject = function(bQ, bO, bR, bP, bN) {
		var bM = aE(bQ, bO, bR, bP, bN);
		au = "";
		aD.setMaterialFaces(bP);
		if (bN.immediateRenderCallback) {
			bN.immediateRenderCallback(bM, b, bi)
		} else {
			bN.render(function(bS) {
				aD.renderBufferImmediate(bS, bM, bP)
			})
		}
	};

	function aG(bO) {
		var bM = bO.object,
			bN = bM.material;
		if (bN.transparent) {
			bO.transparent = bN;
			bO.opaque = null
		} else {
			bO.opaque = bN;
			bO.transparent = null
		}
	}

	function ak(bQ) {
		var bO = bQ.object;
		var bN = bQ.buffer;
		var bR = bO.geometry;
		var bP = bO.material;
		if (bP instanceof THREE.MeshFaceMaterial) {
			var bM = bR instanceof THREE.BufferGeometry ? 0 : bN.materialIndex;
			bP = bP.materials[bM];
			bQ.material = bP;
			if (bP.transparent) {
				t.push(bQ)
			} else {
				bl.push(bQ)
			}
		} else {
			if (bP) {
				bQ.material = bP;
				if (bP.transparent) {
					t.push(bQ)
				} else {
					bl.push(bQ)
				}
			}
		}
	}
	var aJ = {
		objects: [],
		get: function() {
			var bM = this.objects.pop();
			if (!bM) {
				bM = new THREE.Matrix4()
			}
			return bM
		},
		release: function(bM) {
			if (bM) {
				this.objects.push(bM)
			}
		}
	};
	var bv = {
		objects: [],
		get: function() {
			var bM = this.objects.pop();
			if (!bM) {
				bM = new THREE.Matrix3()
			}
			return bM
		},
		release: function(bM) {
			if (bM) {
				this.objects.push(bM)
			}
		}
	};

	function B(bO) {
		if (!bO.__webglInit) {
			bO.__webglInit = true;
			bO._modelViewMatrix = aJ.get();
			bO._normalMatrix = bv.get();
			bO.addEventListener("removed", bB)
		}
		var bQ = bO.geometry;
		if (bQ === undefined) {} else {
			if (bQ.__webglInit === undefined) {
				bQ.__webglInit = true;
				bQ.addEventListener("dispose", aP);
				if (bQ instanceof THREE.BufferGeometry) {
					aD.info.memory.geometries++
				} else {
					if (bO instanceof THREE.Mesh) {
						ba(bO, bQ)
					} else {
						if (bO instanceof THREE.Line) {
							if (bQ.__webglVertexBuffer === undefined) {
								aa(bQ);
								G(bQ, bO);
								bQ.verticesNeedUpdate = true;
								bQ.colorsNeedUpdate = true;
								bQ.lineDistancesNeedUpdate = true
							}
						} else {
							if (bO instanceof THREE.PointCloud) {
								if (bQ.__webglVertexBuffer === undefined) {
									D(bQ);
									bu(bQ, bO);
									bQ.verticesNeedUpdate = true;
									bQ.colorsNeedUpdate = true
								}
							}
						}
					}
				}
			}
		}
		if (!bO.__webglActive) {
			bO.__webglActive = true;
			if (bO instanceof THREE.Mesh) {
				if (bQ instanceof THREE.BufferGeometry) {
					E(o, bQ, bO)
				} else {
					if (bQ instanceof THREE.Geometry) {
						var bM = v[bQ.id];
						for (var bP = 0, bN = bM.length; bP < bN; bP++) {
							E(o, bM[bP], bO)
						}
					}
				}
			} else {
				if (bO instanceof THREE.Line || bO instanceof THREE.PointCloud) {
					E(o, bQ, bO)
				} else {
					if (bO instanceof THREE.ImmediateRenderObject || bO.immediateRenderCallback) {
						at(l, bO)
					}
				}
			}
		}
	}
	this.initObjectFunc = B;
	var v = {};
	var bc = 0;

	function aS(bU, bZ) {
		var bR = aW.get("OES_element_index_uint") ? 4294967296 : 65535;
		var bO, bS = {};
		var bX = bU.morphTargets.length;
		var bN = bU.morphNormals.length;
		var bY;
		var bM = {};
		var bP = [];
		for (var bQ = 0, bW = bU.faces.length; bQ < bW; bQ++) {
			var bT = bU.faces[bQ];
			var bV = bZ ? bT.materialIndex : 0;
			if (!(bV in bS)) {
				bS[bV] = {
					hash: bV,
					counter: 0
				}
			}
			bO = bS[bV].hash + "_" + bS[bV].counter;
			if (!(bO in bM)) {
				bY = {
					id: bc++,
					faces3: [],
					materialIndex: bV,
					vertices: 0,
					numMorphTargets: bX,
					numMorphNormals: bN
				};
				bM[bO] = bY;
				bP.push(bY)
			}
			if (bM[bO].vertices + 3 > bR) {
				bS[bV].counter += 1;
				bO = bS[bV].hash + "_" + bS[bV].counter;
				if (!(bO in bM)) {
					bY = {
						id: bc++,
						faces3: [],
						materialIndex: bV,
						vertices: 0,
						numMorphTargets: bX,
						numMorphNormals: bN
					};
					bM[bO] = bY;
					bP.push(bY)
				}
			}
			bM[bO].faces3.push(bQ);
			bM[bO].vertices += 3
		}
		return bP
	}

	function ba(bQ, bT) {
		var bS = bQ.material,
			bP = false;
		if (v[bT.id] === undefined || bT.groupsNeedUpdate === true) {
			delete o[bQ.id];
			v[bT.id] = aS(bT, bS instanceof THREE.MeshFaceMaterial);
			bT.groupsNeedUpdate = false
		}
		var bM = v[bT.id];
		for (var bR = 0, bO = bM.length; bR < bO; bR++) {
			var bN = bM[bR];
			if (bN.__webglVertexBuffer === undefined) {
				av(bN);
				ag(bN, bQ);
				bT.verticesNeedUpdate = true;
				bT.morphTargetsNeedUpdate = true;
				bT.elementsNeedUpdate = true;
				bT.uvsNeedUpdate = true;
				bT.normalsNeedUpdate = true;
				bT.tangentsNeedUpdate = true;
				bT.colorsNeedUpdate = true;
				bP = true
			} else {
				bP = false
			}
			if (bP || bQ.__webglActive === undefined) {
				E(o, bN, bQ)
			}
		}
		bQ.__webglActive = true
	}
	var ad = [];
	var ae = [];

	function E(bP, bM, bO) {
		var bQ = bO.id;
		bP[bQ] = bP[bQ] || ad.pop() || [];
		var bN = ae.pop() || {};
		bN.id = bQ;
		bN.buffer = bM;
		bN.object = bO;
		bN.material = null;
		bN.z = 0;
		bP[bQ].push(bN)
	}

	function at(bN, bM) {
		bN.push({
			id: null,
			object: bM,
			opaque: null,
			transparent: null,
			z: 0
		})
	}

	function I(bP) {
		var bU = bP.geometry;
		if (bU instanceof THREE.BufferGeometry) {
			var bQ = bU.attributes;
			var bZ = bU.attributesKeys;
			for (var bR = 0, bN = bZ.length; bR < bN; bR++) {
				var bX = bZ[bR];
				var bM = bQ[bX];
				var bY = (bX === "index") ? b.ELEMENT_ARRAY_BUFFER : b.ARRAY_BUFFER;
				if (bM.buffer === undefined) {
					bM.buffer = b.createBuffer();
					b.bindBuffer(bY, bM.buffer);
					b.bufferData(bY, bM.array, (bM instanceof THREE.DynamicBufferAttribute) ? b.DYNAMIC_DRAW : b.STATIC_DRAW);
					bM.needsUpdate = false
				} else {
					if (bM.needsUpdate === true) {
						b.bindBuffer(bY, bM.buffer);
						if (bM.updateRange === undefined || bM.updateRange.count === -1) {
							b.bufferSubData(bY, 0, bM.array)
						} else {
							if (bM.updateRange.count === 0) {
								console.error("THREE.WebGLRenderer.updateObject: using updateRange for THREE.DynamicBufferAttribute and marked as needsUpdate but count is 0, ensure you are using set methods or updating manually.")
							} else {
								b.bufferSubData(bY, bM.updateRange.offset * bM.array.BYTES_PER_ELEMENT, bM.array.subarray(bM.updateRange.offset, bM.updateRange.offset + bM.updateRange.count));
								bM.updateRange.count = 0
							}
						}
						bM.needsUpdate = false
					}
				}
			}
		} else {
			if (bP instanceof THREE.Mesh) {
				if (bU.groupsNeedUpdate === true) {
					ba(bP, bU)
				}
				var bT = v[bU.id];
				for (var bR = 0, bV = bT.length; bR < bV; bR++) {
					var bO = bT[bR];
					var bS = H(bP, bO);
					var bW = bS.attributes && e(bS);
					if (bU.verticesNeedUpdate || bU.morphTargetsNeedUpdate || bU.elementsNeedUpdate || bU.uvsNeedUpdate || bU.normalsNeedUpdate || bU.colorsNeedUpdate || bU.tangentsNeedUpdate || bW) {
						g(bO, bP, b.DYNAMIC_DRAW, !bU.dynamic, bS)
					}
				}
				bU.verticesNeedUpdate = false;
				bU.morphTargetsNeedUpdate = false;
				bU.elementsNeedUpdate = false;
				bU.uvsNeedUpdate = false;
				bU.normalsNeedUpdate = false;
				bU.colorsNeedUpdate = false;
				bU.tangentsNeedUpdate = false;
				bS.attributes && an(bS)
			} else {
				if (bP instanceof THREE.Line) {
					var bS = H(bP, bU);
					var bW = bS.attributes && e(bS);
					if (bU.verticesNeedUpdate || bU.colorsNeedUpdate || bU.lineDistancesNeedUpdate || bW) {
						be(bU, b.DYNAMIC_DRAW)
					}
					bU.verticesNeedUpdate = false;
					bU.colorsNeedUpdate = false;
					bU.lineDistancesNeedUpdate = false;
					bS.attributes && an(bS)
				} else {
					if (bP instanceof THREE.PointCloud) {
						var bS = H(bP, bU);
						var bW = bS.attributes && e(bS);
						if (bU.verticesNeedUpdate || bU.colorsNeedUpdate || bW) {
							aZ(bU, b.DYNAMIC_DRAW, bP)
						}
						bU.verticesNeedUpdate = false;
						bU.colorsNeedUpdate = false;
						bS.attributes && an(bS)
					}
				}
			}
		}
	}
	this.updateObjectFunc = I;

	function e(bN) {
		for (var bM in bN.attributes) {
			if (bN.attributes[bM].needsUpdate) {
				return true
			}
		}
		return false
	}

	function an(bN) {
		for (var bM in bN.attributes) {
			bN.attributes[bM].needsUpdate = false
		}
	}

	function J(bN) {
		if (bN instanceof THREE.Mesh || bN instanceof THREE.PointCloud || bN instanceof THREE.Line) {
			var bM = o[bN.id];
			if (bM) {
				while (bM.length > 0) {
					ae.push(bM.pop())
				}
				ad.push(bM);
				o[bN.id] = null
			}
		} else {
			if (bN instanceof THREE.ImmediateRenderObject || bN.immediateRenderCallback) {
				bJ(l, bN)
			}
		}
		bN.__webglInit = false;
		aJ.release(bN._modelViewMatrix);
		bN._modelViewMatrix = null;
		bv.release(bN._normalMatrix);
		bN._normalMatrix = null;
		bN.__webglActive = false
	}

	function bJ(bN, bM) {
		for (var bO = bN.length - 1; bO >= 0; bO--) {
			if (bN[bO].object === bM) {
				bN.splice(bO, 1)
			}
		}
	}
	var az = {
		MeshDepthMaterial: "depth",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointCloudMaterial: "particle_basic"
	};

	function br(bY, b5, bN, b7) {
		bY.addEventListener("dispose", a8);
		var bT = az[bY.type];
		if (bT) {
			var bM = THREE.ShaderLib[bT];
			bY.__webglShader = {
				uniforms: THREE.UniformsUtils.clone(bM.uniforms),
				vertexShader: bM.vertexShader,
				fragmentShader: bM.fragmentShader
			}
		} else {
			bY.__webglShader = {
				uniforms: bY.uniforms,
				vertexShader: bY.vertexShader,
				fragmentShader: bY.fragmentShader
			}
		}
		var b1 = a5(b5);
		var bS = W(b5);
		var b6 = ay(b7);
		var bU = {
			precision: f,
			supportsVertexTextures: aL,
			map: !!bY.map,
			envMap: !!bY.envMap,
			envMapMode: bY.envMap && bY.envMap.mapping,
			lightMap: !!bY.lightMap,
			bumpMap: !!bY.bumpMap,
			normalMap: !!bY.normalMap,
			specularMap: !!bY.specularMap,
			alphaMap: !!bY.alphaMap,
			combine: bY.combine,
			vertexColors: bY.vertexColors,
			fog: bN,
			useFog: bY.fog,
			fogExp: bN instanceof THREE.FogExp2,
			flatShading: bY.shading === THREE.FlatShading,
			sizeAttenuation: bY.sizeAttenuation,
			logarithmicDepthBuffer: p,
			skinning: bY.skinning,
			maxBones: b6,
			useVertexTexture: V && b7 && b7.skeleton && b7.skeleton.useVertexTexture,
			morphTargets: bY.morphTargets,
			morphNormals: bY.morphNormals,
			maxMorphTargets: aD.maxMorphTargets,
			maxMorphNormals: aD.maxMorphNormals,
			maxDirLights: b1.directional,
			maxPointLights: b1.point,
			maxSpotLights: b1.spot,
			maxHemiLights: b1.hemi,
			maxShadows: bS,
			shadowMapEnabled: aD.shadowMapEnabled && b7.receiveShadow && bS > 0,
			shadowMapType: aD.shadowMapType,
			shadowMapDebug: aD.shadowMapDebug,
			shadowMapCascade: aD.shadowMapCascade,
			alphaTest: bY.alphaTest,
			metal: bY.metal,
			wrapAround: bY.wrapAround,
			doubleSided: bY.side === THREE.DoubleSide,
			flipSided: bY.side === THREE.BackSide
		};
		var bZ = [];
		if (bT) {
			bZ.push(bT)
		} else {
			bZ.push(bY.fragmentShader);
			bZ.push(bY.vertexShader)
		}
		if (bY.defines !== undefined) {
			for (var b8 in bY.defines) {
				bZ.push(b8);
				bZ.push(bY.defines[b8])
			}
		}
		for (var b8 in bU) {
			bZ.push(b8);
			bZ.push(bU[b8])
		}
		var bP = bZ.join();
		var bW;
		for (var b2 = 0, b4 = bn.length; b2 < b4; b2++) {
			var bR = bn[b2];
			if (bR.code === bP) {
				bW = bR;
				bW.usedTimes++;
				break
			}
		}
		if (bW === undefined) {
			bW = new THREE.WebGLProgram(aD, bP, bY, bU);
			bn.push(bW);
			aD.info.memory.programs = bn.length
		}
		bY.program = bW;
		var bV = bW.attributes;
		if (bY.morphTargets) {
			bY.numSupportedMorphTargets = 0;
			var b0, bQ = "morphTarget";
			for (var b3 = 0; b3 < aD.maxMorphTargets; b3++) {
				b0 = bQ + b3;
				if (bV[b0] >= 0) {
					bY.numSupportedMorphTargets++
				}
			}
		}
		if (bY.morphNormals) {
			bY.numSupportedMorphNormals = 0;
			var b0, bQ = "morphNormal";
			for (b3 = 0; b3 < aD.maxMorphNormals; b3++) {
				b0 = bQ + b3;
				if (bV[b0] >= 0) {
					bY.numSupportedMorphNormals++
				}
			}
		}
		bY.uniformsList = [];
		for (var bX in bY.__webglShader.uniforms) {
			var bO = bY.program.uniforms[bX];
			if (bO) {
				bY.uniformsList.push([bY.__webglShader.uniforms[bX], bO])
			}
		}
	}

	function C(bM) {
		if (bM.transparent === true) {
			aX.setBlending(bM.blending, bM.blendEquation, bM.blendSrc, bM.blendDst, bM.blendEquationAlpha, bM.blendSrcAlpha, bM.blendDstAlpha)
		} else {
			aX.setBlending(THREE.NoBlending)
		}
		aX.setDepthTest(bM.depthTest);
		aX.setDepthWrite(bM.depthWrite);
		aX.setColorWrite(bM.colorWrite);
		aX.setPolygonOffset(bM.polygonOffset, bM.polygonOffsetFactor, bM.polygonOffsetUnits)
	}

	function aE(bT, bQ, bM, bU, bP) {
		a4 = 0;
		if (bU.needsUpdate) {
			if (bU.program) {
				N(bU)
			}
			br(bU, bQ, bM, bP);
			bU.needsUpdate = false
		}
		if (bU.morphTargets) {
			if (!bP.__webglMorphTargetInfluences) {
				bP.__webglMorphTargetInfluences = new Float32Array(aD.maxMorphTargets)
			}
		}
		var bO = false;
		var bS = false;
		var bN = false;
		var bR = bU.program,
			bX = bR.uniforms,
			bV = bU.__webglShader.uniforms;
		if (bR.id !== ah) {
			b.useProgram(bR.program);
			ah = bR.id;
			bO = true;
			bS = true;
			bN = true
		}
		if (bU.id !== aT) {
			if (aT === -1) {
				bN = true
			}
			aT = bU.id;
			bS = true
		}
		if (bO || bT !== aA) {
			b.uniformMatrix4fv(bX.projectionMatrix, false, bT.projectionMatrix.elements);
			if (p) {
				b.uniform1f(bX.logDepthBufFC, 2 / (Math.log(bT.far + 1) / Math.LN2))
			}
			if (bT !== aA) {
				aA = bT
			}
			if (bU instanceof THREE.ShaderMaterial || bU instanceof THREE.MeshPhongMaterial || bU.envMap) {
				if (bX.cameraPosition !== null) {
					Q.setFromMatrixPosition(bT.matrixWorld);
					b.uniform3f(bX.cameraPosition, Q.x, Q.y, Q.z)
				}
			}
			if (bU instanceof THREE.MeshPhongMaterial || bU instanceof THREE.MeshLambertMaterial || bU instanceof THREE.MeshBasicMaterial || bU instanceof THREE.ShaderMaterial || bU.skinning) {
				if (bX.viewMatrix !== null) {
					b.uniformMatrix4fv(bX.viewMatrix, false, bT.matrixWorldInverse.elements)
				}
			}
		}
		if (bU.skinning) {
			if (bP.bindMatrix && bX.bindMatrix !== null) {
				b.uniformMatrix4fv(bX.bindMatrix, false, bP.bindMatrix.elements)
			}
			if (bP.bindMatrixInverse && bX.bindMatrixInverse !== null) {
				b.uniformMatrix4fv(bX.bindMatrixInverse, false, bP.bindMatrixInverse.elements)
			}
			if (V && bP.skeleton && bP.skeleton.useVertexTexture) {
				if (bX.boneTexture !== null) {
					var bW = ao();
					b.uniform1i(bX.boneTexture, bW);
					aD.setTexture(bP.skeleton.boneTexture, bW)
				}
				if (bX.boneTextureWidth !== null) {
					b.uniform1i(bX.boneTextureWidth, bP.skeleton.boneTextureWidth)
				}
				if (bX.boneTextureHeight !== null) {
					b.uniform1i(bX.boneTextureHeight, bP.skeleton.boneTextureHeight)
				}
			} else {
				if (bP.skeleton && bP.skeleton.boneMatrices) {
					if (bX.boneGlobalMatrices !== null) {
						b.uniformMatrix4fv(bX.boneGlobalMatrices, false, bP.skeleton.boneMatrices)
					}
				}
			}
		}
		if (bS) {
			if (bM && bU.fog) {
				X(bV, bM)
			}
			if (bU instanceof THREE.MeshPhongMaterial || bU instanceof THREE.MeshLambertMaterial || bU.lights) {
				if (bL) {
					bN = true;
					d(bQ);
					bL = false
				}
				if (bN) {
					a2(bV, bg);
					L(bV, true)
				} else {
					L(bV, false)
				}
			}
			if (bU instanceof THREE.MeshBasicMaterial || bU instanceof THREE.MeshLambertMaterial || bU instanceof THREE.MeshPhongMaterial) {
				bq(bV, bU)
			}
			if (bU instanceof THREE.LineBasicMaterial) {
				al(bV, bU)
			} else {
				if (bU instanceof THREE.LineDashedMaterial) {
					al(bV, bU);
					ab(bV, bU)
				} else {
					if (bU instanceof THREE.PointCloudMaterial) {
						bf(bV, bU)
					} else {
						if (bU instanceof THREE.MeshPhongMaterial) {
							K(bV, bU)
						} else {
							if (bU instanceof THREE.MeshLambertMaterial) {
								bs(bV, bU)
							} else {
								if (bU instanceof THREE.MeshDepthMaterial) {
									bV.mNear.value = bT.near;
									bV.mFar.value = bT.far;
									bV.opacity.value = bU.opacity
								} else {
									if (bU instanceof THREE.MeshNormalMaterial) {
										bV.opacity.value = bU.opacity
									}
								}
							}
						}
					}
				}
			}
			if (bP.receiveShadow && !bU._shadowPass) {
				bA(bV, bQ)
			}
			P(bU.uniformsList)
		}
		q(bX, bP);
		if (bX.modelMatrix !== null) {
			b.uniformMatrix4fv(bX.modelMatrix, false, bP.matrixWorld.elements)
		}
		return bR
	}

	function bq(bN, bO) {
		bN.opacity.value = bO.opacity;
		bN.diffuse.value = bO.color;
		bN.map.value = bO.map;
		bN.lightMap.value = bO.lightMap;
		bN.specularMap.value = bO.specularMap;
		bN.alphaMap.value = bO.alphaMap;
		if (bO.bumpMap) {
			bN.bumpMap.value = bO.bumpMap;
			bN.bumpScale.value = bO.bumpScale
		}
		if (bO.normalMap) {
			bN.normalMap.value = bO.normalMap;
			bN.normalScale.value.copy(bO.normalScale)
		}
		var bM;
		if (bO.map) {
			bM = bO.map
		} else {
			if (bO.specularMap) {
				bM = bO.specularMap
			} else {
				if (bO.normalMap) {
					bM = bO.normalMap
				} else {
					if (bO.bumpMap) {
						bM = bO.bumpMap
					} else {
						if (bO.alphaMap) {
							bM = bO.alphaMap
						}
					}
				}
			}
		}
		if (bM !== undefined) {
			var bQ = bM.offset;
			var bP = bM.repeat;
			bN.offsetRepeat.value.set(bQ.x, bQ.y, bP.x, bP.y)
		}
		bN.envMap.value = bO.envMap;
		bN.flipEnvMap.value = (bO.envMap instanceof THREE.WebGLRenderTargetCube) ? 1 : -1;
		bN.reflectivity.value = bO.reflectivity;
		bN.refractionRatio.value = bO.refractionRatio
	}

	function al(bM, bN) {
		bM.diffuse.value = bN.color;
		bM.opacity.value = bN.opacity
	}

	function ab(bM, bN) {
		bM.dashSize.value = bN.dashSize;
		bM.totalSize.value = bN.dashSize + bN.gapSize;
		bM.scale.value = bN.scale
	}

	function bf(bM, bN) {
		bM.psColor.value = bN.color;
		bM.opacity.value = bN.opacity;
		bM.size.value = bN.size;
		bM.scale.value = aO.height / 2;
		bM.map.value = bN.map;
		if (bN.map !== null) {
			var bP = bN.map.offset;
			var bO = bN.map.repeat;
			bM.offsetRepeat.value.set(bP.x, bP.y, bO.x, bO.y)
		}
	}

	function X(bM, bN) {
		bM.fogColor.value = bN.color;
		if (bN instanceof THREE.Fog) {
			bM.fogNear.value = bN.near;
			bM.fogFar.value = bN.far
		} else {
			if (bN instanceof THREE.FogExp2) {
				bM.fogDensity.value = bN.density
			}
		}
	}

	function K(bM, bN) {
		bM.shininess.value = bN.shininess;
		bM.emissive.value = bN.emissive;
		bM.specular.value = bN.specular;
		if (bN.wrapAround) {
			bM.wrapRGB.value.copy(bN.wrapRGB)
		}
	}

	function bs(bM, bN) {
		bM.emissive.value = bN.emissive;
		if (bN.wrapAround) {
			bM.wrapRGB.value.copy(bN.wrapRGB)
		}
	}

	function a2(bM, bN) {
		bM.ambientLightColor.value = bN.ambient;
		bM.directionalLightColor.value = bN.directional.colors;
		bM.directionalLightDirection.value = bN.directional.positions;
		bM.pointLightColor.value = bN.point.colors;
		bM.pointLightPosition.value = bN.point.positions;
		bM.pointLightDistance.value = bN.point.distances;
		bM.pointLightDecay.value = bN.point.decays;
		bM.spotLightColor.value = bN.spot.colors;
		bM.spotLightPosition.value = bN.spot.positions;
		bM.spotLightDistance.value = bN.spot.distances;
		bM.spotLightDirection.value = bN.spot.directions;
		bM.spotLightAngleCos.value = bN.spot.anglesCos;
		bM.spotLightExponent.value = bN.spot.exponents;
		bM.spotLightDecay.value = bN.spot.decays;
		bM.hemisphereLightSkyColor.value = bN.hemi.skyColors;
		bM.hemisphereLightGroundColor.value = bN.hemi.groundColors;
		bM.hemisphereLightDirection.value = bN.hemi.positions
	}

	function L(bM, bN) {
		bM.ambientLightColor.needsUpdate = bN;
		bM.directionalLightColor.needsUpdate = bN;
		bM.directionalLightDirection.needsUpdate = bN;
		bM.pointLightColor.needsUpdate = bN;
		bM.pointLightPosition.needsUpdate = bN;
		bM.pointLightDistance.needsUpdate = bN;
		bM.pointLightDecay.needsUpdate = bN;
		bM.spotLightColor.needsUpdate = bN;
		bM.spotLightPosition.needsUpdate = bN;
		bM.spotLightDistance.needsUpdate = bN;
		bM.spotLightDirection.needsUpdate = bN;
		bM.spotLightAngleCos.needsUpdate = bN;
		bM.spotLightExponent.needsUpdate = bN;
		bM.spotLightDecay.needsUpdate = bN;
		bM.hemisphereLightSkyColor.needsUpdate = bN;
		bM.hemisphereLightGroundColor.needsUpdate = bN;
		bM.hemisphereLightDirection.needsUpdate = bN
	}

	function bA(bM, bQ) {
		if (bM.shadowMatrix) {
			var bP = 0;
			for (var bR = 0, bO = bQ.length; bR < bO; bR++) {
				var bN = bQ[bR];
				if (!bN.castShadow) {
					continue
				}
				if (bN instanceof THREE.SpotLight || (bN instanceof THREE.DirectionalLight && !bN.shadowCascade)) {
					bM.shadowMap.value[bP] = bN.shadowMap;
					bM.shadowMapSize.value[bP] = bN.shadowMapSize;
					bM.shadowMatrix.value[bP] = bN.shadowMatrix;
					bM.shadowDarkness.value[bP] = bN.shadowDarkness;
					bM.shadowBias.value[bP] = bN.shadowBias;
					bP++
				}
			}
		}
	}

	function q(bM, bN) {
		b.uniformMatrix4fv(bM.modelViewMatrix, false, bN._modelViewMatrix.elements);
		if (bM.normalMatrix) {
			b.uniformMatrix3fv(bM.normalMatrix, false, bN._normalMatrix.elements)
		}
	}

	function ao() {
		var bM = a4;
		if (bM >= bt) {
			THREE.warn("WebGLRenderer: trying to use " + bM + " texture units while this GPU supports only " + bt)
		}
		a4 += 1;
		return bM
	}

	function P(bW) {
		var bR, bX, bN;
		for (var bO = 0, bQ = bW.length; bO < bQ; bO++) {
			var bM = bW[bO][0];
			if (bM.needsUpdate === false) {
				continue
			}
			var bS = bM.type;
			var bV = bM.value;
			var bU = bW[bO][1];
			switch (bS) {
				case "1i":
					b.uniform1i(bU, bV);
					break;
				case "1f":
					b.uniform1f(bU, bV);
					break;
				case "2f":
					b.uniform2f(bU, bV[0], bV[1]);
					break;
				case "3f":
					b.uniform3f(bU, bV[0], bV[1], bV[2]);
					break;
				case "4f":
					b.uniform4f(bU, bV[0], bV[1], bV[2], bV[3]);
					break;
				case "1iv":
					b.uniform1iv(bU, bV);
					break;
				case "3iv":
					b.uniform3iv(bU, bV);
					break;
				case "1fv":
					b.uniform1fv(bU, bV);
					break;
				case "2fv":
					b.uniform2fv(bU, bV);
					break;
				case "3fv":
					b.uniform3fv(bU, bV);
					break;
				case "4fv":
					b.uniform4fv(bU, bV);
					break;
				case "Matrix3fv":
					b.uniformMatrix3fv(bU, false, bV);
					break;
				case "Matrix4fv":
					b.uniformMatrix4fv(bU, false, bV);
					break;
				case "i":
					b.uniform1i(bU, bV);
					break;
				case "f":
					b.uniform1f(bU, bV);
					break;
				case "v2":
					b.uniform2f(bU, bV.x, bV.y);
					break;
				case "v3":
					b.uniform3f(bU, bV.x, bV.y, bV.z);
					break;
				case "v4":
					b.uniform4f(bU, bV.x, bV.y, bV.z, bV.w);
					break;
				case "c":
					b.uniform3f(bU, bV.r, bV.g, bV.b);
					break;
				case "iv1":
					b.uniform1iv(bU, bV);
					break;
				case "iv":
					b.uniform3iv(bU, bV);
					break;
				case "fv1":
					b.uniform1fv(bU, bV);
					break;
				case "fv":
					b.uniform3fv(bU, bV);
					break;
				case "v2v":
					if (bM._array === undefined) {
						bM._array = new Float32Array(2 * bV.length)
					}
					for (var bP = 0, bT = bV.length; bP < bT; bP++) {
						bN = bP * 2;
						bM._array[bN] = bV[bP].x;
						bM._array[bN + 1] = bV[bP].y
					}
					b.uniform2fv(bU, bM._array);
					break;
				case "v3v":
					if (bM._array === undefined) {
						bM._array = new Float32Array(3 * bV.length)
					}
					for (var bP = 0, bT = bV.length; bP < bT; bP++) {
						bN = bP * 3;
						bM._array[bN] = bV[bP].x;
						bM._array[bN + 1] = bV[bP].y;
						bM._array[bN + 2] = bV[bP].z
					}
					b.uniform3fv(bU, bM._array);
					break;
				case "v4v":
					if (bM._array === undefined) {
						bM._array = new Float32Array(4 * bV.length)
					}
					for (var bP = 0, bT = bV.length; bP < bT; bP++) {
						bN = bP * 4;
						bM._array[bN] = bV[bP].x;
						bM._array[bN + 1] = bV[bP].y;
						bM._array[bN + 2] = bV[bP].z;
						bM._array[bN + 3] = bV[bP].w
					}
					b.uniform4fv(bU, bM._array);
					break;
				case "m3":
					b.uniformMatrix3fv(bU, false, bV.elements);
					break;
				case "m3v":
					if (bM._array === undefined) {
						bM._array = new Float32Array(9 * bV.length)
					}
					for (var bP = 0, bT = bV.length; bP < bT; bP++) {
						bV[bP].flattenToArrayOffset(bM._array, bP * 9)
					}
					b.uniformMatrix3fv(bU, false, bM._array);
					break;
				case "m4":
					b.uniformMatrix4fv(bU, false, bV.elements);
					break;
				case "m4v":
					if (bM._array === undefined) {
						bM._array = new Float32Array(16 * bV.length)
					}
					for (var bP = 0, bT = bV.length; bP < bT; bP++) {
						bV[bP].flattenToArrayOffset(bM._array, bP * 16)
					}
					b.uniformMatrix4fv(bU, false, bM._array);
					break;
				case "t":
					bR = bV;
					bX = ao();
					b.uniform1i(bU, bX);
					if (!bR) {
						continue
					}
					if (bR instanceof THREE.CubeTexture || (bR.image instanceof Array && bR.image.length === 6)) {
						bd(bR, bX)
					} else {
						if (bR instanceof THREE.WebGLRenderTargetCube) {
							a1(bR, bX)
						} else {
							aD.setTexture(bR, bX)
						}
					}
					break;
				case "tv":
					if (bM._array === undefined) {
						bM._array = []
					}
					for (var bP = 0, bT = bM.value.length; bP < bT; bP++) {
						bM._array[bP] = ao()
					}
					b.uniform1iv(bU, bM._array);
					for (var bP = 0, bT = bM.value.length; bP < bT; bP++) {
						bR = bM.value[bP];
						bX = bM._array[bP];
						if (!bR) {
							continue
						}
						aD.setTexture(bR, bX)
					}
					break;
				default:
					THREE.warn("THREE.WebGLRenderer: Unknown uniform type: " + bS)
			}
		}
	}

	function a6(bM, bN) {
		bM._modelViewMatrix.multiplyMatrices(bN.matrixWorldInverse, bM.matrixWorld);
		bM._normalMatrix.getNormalMatrix(bM._modelViewMatrix)
	}

	function aY(bP, bO, bN, bM) {
		bP[bO] = bN.r * bM;
		bP[bO + 1] = bN.g * bM;
		bP[bO + 2] = bN.b * bM
	}

	function d(bQ) {
		var cn, cb, b2, cf = 0,
			co = 0,
			cp = 0,
			b9, bN, bT, ca, b0, b6 = bg,
			bY = b6.directional.colors,
			bO = b6.directional.positions,
			ck = b6.point.colors,
			ch = b6.point.positions,
			b8 = b6.point.distances,
			cd = b6.point.decays,
			cl = b6.spot.colors,
			bP = b6.spot.positions,
			ci = b6.spot.distances,
			bX = b6.spot.directions,
			bR = b6.spot.anglesCos,
			bZ = b6.spot.exponents,
			ce = b6.spot.decays,
			bM = b6.hemi.skyColors,
			cm = b6.hemi.groundColors,
			bW = b6.hemi.positions,
			cq = 0,
			b4 = 0,
			b1 = 0,
			bU = 0,
			b7 = 0,
			b5 = 0,
			b3 = 0,
			bS = 0,
			bV = 0,
			cj = 0,
			cg = 0,
			cc = 0;
		for (cn = 0, cb = bQ.length; cn < cb; cn++) {
			b2 = bQ[cn];
			if (b2.onlyShadow) {
				continue
			}
			b9 = b2.color;
			ca = b2.intensity;
			b0 = b2.distance;
			if (b2 instanceof THREE.AmbientLight) {
				if (!b2.visible) {
					continue
				}
				cf += b9.r;
				co += b9.g;
				cp += b9.b
			} else {
				if (b2 instanceof THREE.DirectionalLight) {
					b7 += 1;
					if (!b2.visible) {
						continue
					}
					aB.setFromMatrixPosition(b2.matrixWorld);
					Q.setFromMatrixPosition(b2.target.matrixWorld);
					aB.sub(Q);
					aB.normalize();
					bV = cq * 3;
					bO[bV] = aB.x;
					bO[bV + 1] = aB.y;
					bO[bV + 2] = aB.z;
					aY(bY, bV, b9, ca);
					cq += 1
				} else {
					if (b2 instanceof THREE.PointLight) {
						b5 += 1;
						if (!b2.visible) {
							continue
						}
						cj = b4 * 3;
						aY(ck, cj, b9, ca);
						Q.setFromMatrixPosition(b2.matrixWorld);
						ch[cj] = Q.x;
						ch[cj + 1] = Q.y;
						ch[cj + 2] = Q.z;
						b8[b4] = b0;
						cd[b4] = (b2.distance === 0) ? 0 : b2.decay;
						b4 += 1
					} else {
						if (b2 instanceof THREE.SpotLight) {
							b3 += 1;
							if (!b2.visible) {
								continue
							}
							cg = b1 * 3;
							aY(cl, cg, b9, ca);
							aB.setFromMatrixPosition(b2.matrixWorld);
							bP[cg] = aB.x;
							bP[cg + 1] = aB.y;
							bP[cg + 2] = aB.z;
							ci[b1] = b0;
							Q.setFromMatrixPosition(b2.target.matrixWorld);
							aB.sub(Q);
							aB.normalize();
							bX[cg] = aB.x;
							bX[cg + 1] = aB.y;
							bX[cg + 2] = aB.z;
							bR[b1] = Math.cos(b2.angle);
							bZ[b1] = b2.exponent;
							ce[b1] = (b2.distance === 0) ? 0 : b2.decay;
							b1 += 1
						} else {
							if (b2 instanceof THREE.HemisphereLight) {
								bS += 1;
								if (!b2.visible) {
									continue
								}
								aB.setFromMatrixPosition(b2.matrixWorld);
								aB.normalize();
								cc = bU * 3;
								bW[cc] = aB.x;
								bW[cc + 1] = aB.y;
								bW[cc + 2] = aB.z;
								bN = b2.color;
								bT = b2.groundColor;
								aY(bM, cc, bN, ca);
								aY(cm, cc, bT, ca);
								bU += 1
							}
						}
					}
				}
			}
		}
		for (cn = cq * 3, cb = Math.max(bY.length, b7 * 3); cn < cb; cn++) {
			bY[cn] = 0
		}
		for (cn = b4 * 3, cb = Math.max(ck.length, b5 * 3); cn < cb; cn++) {
			ck[cn] = 0
		}
		for (cn = b1 * 3, cb = Math.max(cl.length, b3 * 3); cn < cb; cn++) {
			cl[cn] = 0
		}
		for (cn = bU * 3, cb = Math.max(bM.length, bS * 3); cn < cb; cn++) {
			bM[cn] = 0
		}
		for (cn = bU * 3, cb = Math.max(cm.length, bS * 3); cn < cb; cn++) {
			cm[cn] = 0
		}
		b6.directional.length = cq;
		b6.point.length = b4;
		b6.spot.length = b1;
		b6.hemi.length = bU;
		b6.ambient[0] = cf;
		b6.ambient[1] = co;
		b6.ambient[2] = cp
	}
	this.setFaceCulling = function(bN, bM) {
		if (bN === THREE.CullFaceNone) {
			b.disable(b.CULL_FACE)
		} else {
			if (bM === THREE.FrontFaceDirectionCW) {
				b.frontFace(b.CW)
			} else {
				b.frontFace(b.CCW)
			}
			if (bN === THREE.CullFaceBack) {
				b.cullFace(b.BACK)
			} else {
				if (bN === THREE.CullFaceFront) {
					b.cullFace(b.FRONT)
				} else {
					b.cullFace(b.FRONT_AND_BACK)
				}
			}
			b.enable(b.CULL_FACE)
		}
	};
	this.setMaterialFaces = function(bM) {
		aX.setDoubleSided(bM.side === THREE.DoubleSide);
		aX.setFlipSided(bM.side === THREE.BackSide)
	};

	function af(bM, bN, bO) {
		var bP;
		if (bO) {
			b.texParameteri(bM, b.TEXTURE_WRAP_S, aI(bN.wrapS));
			b.texParameteri(bM, b.TEXTURE_WRAP_T, aI(bN.wrapT));
			b.texParameteri(bM, b.TEXTURE_MAG_FILTER, aI(bN.magFilter));
			b.texParameteri(bM, b.TEXTURE_MIN_FILTER, aI(bN.minFilter))
		} else {
			b.texParameteri(bM, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
			b.texParameteri(bM, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
			if (bN.wrapS !== THREE.ClampToEdgeWrapping || bN.wrapT !== THREE.ClampToEdgeWrapping) {
				THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( " + bN.sourceFile + " )")
			}
			b.texParameteri(bM, b.TEXTURE_MAG_FILTER, aF(bN.magFilter));
			b.texParameteri(bM, b.TEXTURE_MIN_FILTER, aF(bN.minFilter));
			if (bN.minFilter !== THREE.NearestFilter && bN.minFilter !== THREE.LinearFilter) {
				THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( " + bN.sourceFile + " )")
			}
		}
		bP = aW.get("EXT_texture_filter_anisotropic");
		if (bP && bN.type !== THREE.FloatType && bN.type !== THREE.HalfFloatType) {
			if (bN.anisotropy > 1 || bN.__currentAnisotropy) {
				b.texParameterf(bM, bP.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(bN.anisotropy, aD.getMaxAnisotropy()));
				bN.__currentAnisotropy = bN.anisotropy
			}
		}
	}
	this.uploadTexture = function(bT) {
		if (bT.__webglInit === undefined) {
			bT.__webglInit = true;
			bT.addEventListener("dispose", ac);
			bT.__webglTexture = b.createTexture();
			aD.info.memory.textures++
		}
		b.bindTexture(b.TEXTURE_2D, bT.__webglTexture);
		b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, bT.flipY);
		b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, bT.premultiplyAlpha);
		b.pixelStorei(b.UNPACK_ALIGNMENT, bT.unpackAlignment);
		bT.image = m(bT.image, u);
		var bP = bT.image,
			bS = THREE.Math.isPowerOfTwo(bP.width) && THREE.Math.isPowerOfTwo(bP.height),
			bM = aI(bT.format),
			bO = aI(bT.type);
		af(b.TEXTURE_2D, bT, bS);
		var bN, bQ = bT.mipmaps;
		if (bT instanceof THREE.DataTexture) {
			if (bQ.length > 0 && bS) {
				for (var bR = 0, bU = bQ.length; bR < bU; bR++) {
					bN = bQ[bR];
					b.texImage2D(b.TEXTURE_2D, bR, bM, bN.width, bN.height, 0, bM, bO, bN.data)
				}
				bT.generateMipmaps = false
			} else {
				b.texImage2D(b.TEXTURE_2D, 0, bM, bP.width, bP.height, 0, bM, bO, bP.data)
			}
		} else {
			if (bT instanceof THREE.CompressedTexture) {
				for (var bR = 0, bU = bQ.length; bR < bU; bR++) {
					bN = bQ[bR];
					if (bT.format !== THREE.RGBAFormat && bT.format !== THREE.RGBFormat) {
						if (T().indexOf(bM) > -1) {
							b.compressedTexImage2D(b.TEXTURE_2D, bR, bM, bN.width, bN.height, 0, bN.data)
						} else {
							THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()")
						}
					} else {
						b.texImage2D(b.TEXTURE_2D, bR, bM, bN.width, bN.height, 0, bM, bO, bN.data)
					}
				}
			} else {
				if (bQ.length > 0 && bS) {
					for (var bR = 0, bU = bQ.length; bR < bU; bR++) {
						bN = bQ[bR];
						b.texImage2D(b.TEXTURE_2D, bR, bM, bM, bO, bN)
					}
					bT.generateMipmaps = false
				} else {
					b.texImage2D(b.TEXTURE_2D, 0, bM, bM, bO, bT.image)
				}
			}
		}
		if (bT.generateMipmaps && bS) {
			b.generateMipmap(b.TEXTURE_2D)
		}
		bT.needsUpdate = false;
		if (bT.onUpdate) {
			bT.onUpdate()
		}
	};
	this.setTexture = function(bM, bN) {
		b.activeTexture(b.TEXTURE0 + bN);
		if (bM.needsUpdate) {
			aD.uploadTexture(bM)
		} else {
			b.bindTexture(b.TEXTURE_2D, bM.__webglTexture)
		}
	};

	function m(bO, bQ) {
		if (bO.width > bQ || bO.height > bQ) {
			var bP = bQ / Math.max(bO.width, bO.height);
			var bM = document.createElement("canvas");
			bM.width = Math.floor(bO.width * bP);
			bM.height = Math.floor(bO.height * bP);
			var bN = bM.getContext("2d");
			bN.drawImage(bO, 0, 0, bO.width, bO.height, 0, 0, bM.width, bM.height);
			THREE.warn("THREE.WebGLRenderer: image is too big (" + bO.width + "x" + bO.height + "). Resized to " + bM.width + "x" + bM.height, bO);
			return bM
		}
		return bO
	}

	function bd(bY, bZ) {
		if (bY.image.length === 6) {
			if (bY.needsUpdate) {
				if (!bY.image.__webglTextureCube) {
					bY.addEventListener("dispose", ac);
					bY.image.__webglTextureCube = b.createTexture();
					aD.info.memory.textures++
				}
				b.activeTexture(b.TEXTURE0 + bZ);
				b.bindTexture(b.TEXTURE_CUBE_MAP, bY.image.__webglTextureCube);
				b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, bY.flipY);
				var bQ = bY instanceof THREE.CompressedTexture;
				var bP = bY.image[0] instanceof THREE.DataTexture;
				var bM = [];
				for (var bW = 0; bW < 6; bW++) {
					if (aD.autoScaleCubemaps && !bQ && !bP) {
						bM[bW] = m(bY.image[bW], aj)
					} else {
						bM[bW] = bP ? bY.image[bW].image : bY.image[bW]
					}
				}
				var bT = bM[0],
					bX = THREE.Math.isPowerOfTwo(bT.width) && THREE.Math.isPowerOfTwo(bT.height),
					bN = aI(bY.format),
					bR = aI(bY.type);
				af(b.TEXTURE_CUBE_MAP, bY, bX);
				for (var bW = 0; bW < 6; bW++) {
					if (!bQ) {
						if (bP) {
							b.texImage2D(b.TEXTURE_CUBE_MAP_POSITIVE_X + bW, 0, bN, bM[bW].width, bM[bW].height, 0, bN, bR, bM[bW].data)
						} else {
							b.texImage2D(b.TEXTURE_CUBE_MAP_POSITIVE_X + bW, 0, bN, bN, bR, bM[bW])
						}
					} else {
						var bO, bS = bM[bW].mipmaps;
						for (var bU = 0, bV = bS.length; bU < bV; bU++) {
							bO = bS[bU];
							if (bY.format !== THREE.RGBAFormat && bY.format !== THREE.RGBFormat) {
								if (T().indexOf(bN) > -1) {
									b.compressedTexImage2D(b.TEXTURE_CUBE_MAP_POSITIVE_X + bW, bU, bN, bO.width, bO.height, 0, bO.data)
								} else {
									THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()")
								}
							} else {
								b.texImage2D(b.TEXTURE_CUBE_MAP_POSITIVE_X + bW, bU, bN, bO.width, bO.height, 0, bN, bR, bO.data)
							}
						}
					}
				}
				if (bY.generateMipmaps && bX) {
					b.generateMipmap(b.TEXTURE_CUBE_MAP)
				}
				bY.needsUpdate = false;
				if (bY.onUpdate) {
					bY.onUpdate()
				}
			} else {
				b.activeTexture(b.TEXTURE0 + bZ);
				b.bindTexture(b.TEXTURE_CUBE_MAP, bY.image.__webglTextureCube)
			}
		}
	}

	function a1(bM, bN) {
		b.activeTexture(b.TEXTURE0 + bN);
		b.bindTexture(b.TEXTURE_CUBE_MAP, bM.__webglTexture)
	}

	function a0(bO, bN, bM) {
		b.bindFramebuffer(b.FRAMEBUFFER, bO);
		b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, bM, bN.__webglTexture, 0)
	}

	function n(bM, bN) {
		b.bindRenderbuffer(b.RENDERBUFFER, bM);
		if (bN.depthBuffer && !bN.stencilBuffer) {
			b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, bN.width, bN.height);
			b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, bM)
		} else {
			if (bN.depthBuffer && bN.stencilBuffer) {
				b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_STENCIL, bN.width, bN.height);
				b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_STENCIL_ATTACHMENT, b.RENDERBUFFER, bM)
			} else {
				b.renderbufferStorage(b.RENDERBUFFER, b.RGBA4, bN.width, bN.height)
			}
		}
	}
	this.setRenderTarget = function(bQ) {
		var bS = (bQ instanceof THREE.WebGLRenderTargetCube);
		if (bQ && bQ.__webglFramebuffer === undefined) {
			if (bQ.depthBuffer === undefined) {
				bQ.depthBuffer = true
			}
			if (bQ.stencilBuffer === undefined) {
				bQ.stencilBuffer = true
			}
			bQ.addEventListener("dispose", O);
			bQ.__webglTexture = b.createTexture();
			aD.info.memory.textures++;
			var bT = THREE.Math.isPowerOfTwo(bQ.width) && THREE.Math.isPowerOfTwo(bQ.height),
				bM = aI(bQ.format),
				bO = aI(bQ.type);
			if (bS) {
				bQ.__webglFramebuffer = [];
				bQ.__webglRenderbuffer = [];
				b.bindTexture(b.TEXTURE_CUBE_MAP, bQ.__webglTexture);
				af(b.TEXTURE_CUBE_MAP, bQ, bT);
				for (var bP = 0; bP < 6; bP++) {
					bQ.__webglFramebuffer[bP] = b.createFramebuffer();
					bQ.__webglRenderbuffer[bP] = b.createRenderbuffer();
					b.texImage2D(b.TEXTURE_CUBE_MAP_POSITIVE_X + bP, 0, bM, bQ.width, bQ.height, 0, bM, bO, null);
					a0(bQ.__webglFramebuffer[bP], bQ, b.TEXTURE_CUBE_MAP_POSITIVE_X + bP);
					n(bQ.__webglRenderbuffer[bP], bQ)
				}
				if (bT) {
					b.generateMipmap(b.TEXTURE_CUBE_MAP)
				}
			} else {
				bQ.__webglFramebuffer = b.createFramebuffer();
				if (bQ.shareDepthFrom) {
					bQ.__webglRenderbuffer = bQ.shareDepthFrom.__webglRenderbuffer
				} else {
					bQ.__webglRenderbuffer = b.createRenderbuffer()
				}
				b.bindTexture(b.TEXTURE_2D, bQ.__webglTexture);
				af(b.TEXTURE_2D, bQ, bT);
				b.texImage2D(b.TEXTURE_2D, 0, bM, bQ.width, bQ.height, 0, bM, bO, null);
				a0(bQ.__webglFramebuffer, bQ, b.TEXTURE_2D);
				if (bQ.shareDepthFrom) {
					if (bQ.depthBuffer && !bQ.stencilBuffer) {
						b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, bQ.__webglRenderbuffer)
					} else {
						if (bQ.depthBuffer && bQ.stencilBuffer) {
							b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_STENCIL_ATTACHMENT, b.RENDERBUFFER, bQ.__webglRenderbuffer)
						}
					}
				} else {
					n(bQ.__webglRenderbuffer, bQ)
				}
				if (bT) {
					b.generateMipmap(b.TEXTURE_2D)
				}
			}
			if (bS) {
				b.bindTexture(b.TEXTURE_CUBE_MAP, null)
			} else {
				b.bindTexture(b.TEXTURE_2D, null)
			}
			b.bindRenderbuffer(b.RENDERBUFFER, null);
			b.bindFramebuffer(b.FRAMEBUFFER, null)
		}
		var bV, bN, bW, bU, bR;
		if (bQ) {
			if (bS) {
				bV = bQ.__webglFramebuffer[bQ.activeCubeFace]
			} else {
				bV = bQ.__webglFramebuffer
			}
			bN = bQ.width;
			bW = bQ.height;
			bU = 0;
			bR = 0
		} else {
			bV = null;
			bN = bD;
			bW = aK;
			bU = aV;
			bR = aU
		}
		if (bV !== bp) {
			b.bindFramebuffer(b.FRAMEBUFFER, bV);
			b.viewport(bU, bR, bN, bW);
			bp = bV
		}
		A = bN;
		aH = bW
	};
	this.readRenderTargetPixels = function(bR, bN, bS, bQ, bM, bO) {
		if (!(bR instanceof THREE.WebGLRenderTarget)) {
			console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			return
		}
		if (bR.__webglFramebuffer) {
			if (bR.format !== THREE.RGBAFormat) {
				console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format.");
				return
			}
			var bP = false;
			if (bR.__webglFramebuffer !== bp) {
				b.bindFramebuffer(b.FRAMEBUFFER, bR.__webglFramebuffer);
				bP = true
			}
			if (b.checkFramebufferStatus(b.FRAMEBUFFER) === b.FRAMEBUFFER_COMPLETE) {
				b.readPixels(bN, bS, bQ, bM, b.RGBA, b.UNSIGNED_BYTE, bO)
			} else {
				console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
			}
			if (bP) {
				b.bindFramebuffer(b.FRAMEBUFFER, bp)
			}
		}
	};

	function aM(bM) {
		if (bM instanceof THREE.WebGLRenderTargetCube) {
			b.bindTexture(b.TEXTURE_CUBE_MAP, bM.__webglTexture);
			b.generateMipmap(b.TEXTURE_CUBE_MAP);
			b.bindTexture(b.TEXTURE_CUBE_MAP, null)
		} else {
			b.bindTexture(b.TEXTURE_2D, bM.__webglTexture);
			b.generateMipmap(b.TEXTURE_2D);
			b.bindTexture(b.TEXTURE_2D, null)
		}
	}

	function aF(bM) {
		if (bM === THREE.NearestFilter || bM === THREE.NearestMipMapNearestFilter || bM === THREE.NearestMipMapLinearFilter) {
			return b.NEAREST
		}
		return b.LINEAR
	}

	function aI(bM) {
		var bN;
		if (bM === THREE.RepeatWrapping) {
			return b.REPEAT
		}
		if (bM === THREE.ClampToEdgeWrapping) {
			return b.CLAMP_TO_EDGE
		}
		if (bM === THREE.MirroredRepeatWrapping) {
			return b.MIRRORED_REPEAT
		}
		if (bM === THREE.NearestFilter) {
			return b.NEAREST
		}
		if (bM === THREE.NearestMipMapNearestFilter) {
			return b.NEAREST_MIPMAP_NEAREST
		}
		if (bM === THREE.NearestMipMapLinearFilter) {
			return b.NEAREST_MIPMAP_LINEAR
		}
		if (bM === THREE.LinearFilter) {
			return b.LINEAR
		}
		if (bM === THREE.LinearMipMapNearestFilter) {
			return b.LINEAR_MIPMAP_NEAREST
		}
		if (bM === THREE.LinearMipMapLinearFilter) {
			return b.LINEAR_MIPMAP_LINEAR
		}
		if (bM === THREE.UnsignedByteType) {
			return b.UNSIGNED_BYTE
		}
		if (bM === THREE.UnsignedShort4444Type) {
			return b.UNSIGNED_SHORT_4_4_4_4
		}
		if (bM === THREE.UnsignedShort5551Type) {
			return b.UNSIGNED_SHORT_5_5_5_1
		}
		if (bM === THREE.UnsignedShort565Type) {
			return b.UNSIGNED_SHORT_5_6_5
		}
		if (bM === THREE.ByteType) {
			return b.BYTE
		}
		if (bM === THREE.ShortType) {
			return b.SHORT
		}
		if (bM === THREE.UnsignedShortType) {
			return b.UNSIGNED_SHORT
		}
		if (bM === THREE.IntType) {
			return b.INT
		}
		if (bM === THREE.UnsignedIntType) {
			return b.UNSIGNED_INT
		}
		if (bM === THREE.FloatType) {
			return b.FLOAT
		}
		bN = aW.get("OES_texture_half_float");
		if (bN !== null) {
			if (bM === THREE.HalfFloatType) {
				return bN.HALF_FLOAT_OES
			}
		}
		if (bM === THREE.AlphaFormat) {
			return b.ALPHA
		}
		if (bM === THREE.RGBFormat) {
			return b.RGB
		}
		if (bM === THREE.RGBAFormat) {
			return b.RGBA
		}
		if (bM === THREE.LuminanceFormat) {
			return b.LUMINANCE
		}
		if (bM === THREE.LuminanceAlphaFormat) {
			return b.LUMINANCE_ALPHA
		}
		if (bM === THREE.AddEquation) {
			return b.FUNC_ADD
		}
		if (bM === THREE.SubtractEquation) {
			return b.FUNC_SUBTRACT
		}
		if (bM === THREE.ReverseSubtractEquation) {
			return b.FUNC_REVERSE_SUBTRACT
		}
		if (bM === THREE.ZeroFactor) {
			return b.ZERO
		}
		if (bM === THREE.OneFactor) {
			return b.ONE
		}
		if (bM === THREE.SrcColorFactor) {
			return b.SRC_COLOR
		}
		if (bM === THREE.OneMinusSrcColorFactor) {
			return b.ONE_MINUS_SRC_COLOR
		}
		if (bM === THREE.SrcAlphaFactor) {
			return b.SRC_ALPHA
		}
		if (bM === THREE.OneMinusSrcAlphaFactor) {
			return b.ONE_MINUS_SRC_ALPHA
		}
		if (bM === THREE.DstAlphaFactor) {
			return b.DST_ALPHA
		}
		if (bM === THREE.OneMinusDstAlphaFactor) {
			return b.ONE_MINUS_DST_ALPHA
		}
		if (bM === THREE.DstColorFactor) {
			return b.DST_COLOR
		}
		if (bM === THREE.OneMinusDstColorFactor) {
			return b.ONE_MINUS_DST_COLOR
		}
		if (bM === THREE.SrcAlphaSaturateFactor) {
			return b.SRC_ALPHA_SATURATE
		}
		bN = aW.get("WEBGL_compressed_texture_s3tc");
		if (bN !== null) {
			if (bM === THREE.RGB_S3TC_DXT1_Format) {
				return bN.COMPRESSED_RGB_S3TC_DXT1_EXT
			}
			if (bM === THREE.RGBA_S3TC_DXT1_Format) {
				return bN.COMPRESSED_RGBA_S3TC_DXT1_EXT
			}
			if (bM === THREE.RGBA_S3TC_DXT3_Format) {
				return bN.COMPRESSED_RGBA_S3TC_DXT3_EXT
			}
			if (bM === THREE.RGBA_S3TC_DXT5_Format) {
				return bN.COMPRESSED_RGBA_S3TC_DXT5_EXT
			}
		}
		bN = aW.get("WEBGL_compressed_texture_pvrtc");
		if (bN !== null) {
			if (bM === THREE.RGB_PVRTC_4BPPV1_Format) {
				return bN.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
			}
			if (bM === THREE.RGB_PVRTC_2BPPV1_Format) {
				return bN.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
			}
			if (bM === THREE.RGBA_PVRTC_4BPPV1_Format) {
				return bN.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
			}
			if (bM === THREE.RGBA_PVRTC_2BPPV1_Format) {
				return bN.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
			}
		}
		bN = aW.get("EXT_blend_minmax");
		if (bN !== null) {
			if (bM === THREE.MinEquation) {
				return bN.MIN_EXT
			}
			if (bM === THREE.MaxEquation) {
				return bN.MAX_EXT
			}
		}
		return 0
	}

	function ay(bP) {
		return 20;
		if (V && bP && bP.skeleton && bP.skeleton.useVertexTexture) {
			return 1024
		} else {
			var bN = b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS);
			var bO = Math.floor((bN - 20) / 4);
			var bM = bO;
			if (bP !== undefined && bP instanceof THREE.SkinnedMesh) {
				bM = Math.min(bP.skeleton.bones.length, bM);
				if (bM < bP.skeleton.bones.length) {
					THREE.warn("WebGLRenderer: too many bones - " + bP.skeleton.bones.length + ", this GPU supports just " + bM + " (try OpenGL instead of ANGLE)")
				}
			}
			return bM
		}
	}

	function a5(bO) {
		var bP = 0;
		var bT = 0;
		var bR = 0;
		var bS = 0;
		for (var bN = 0, bQ = bO.length; bN < bQ; bN++) {
			var bM = bO[bN];
			if (bM.onlyShadow || bM.visible === false) {
				continue
			}
			if (bM instanceof THREE.DirectionalLight) {
				bP++
			}
			if (bM instanceof THREE.PointLight) {
				bT++
			}
			if (bM instanceof THREE.SpotLight) {
				bR++
			}
			if (bM instanceof THREE.HemisphereLight) {
				bS++
			}
		}
		return {
			directional: bP,
			point: bT,
			spot: bR,
			hemi: bS
		}
	}

	function W(bO) {
		var bP = 0;
		for (var bN = 0, bQ = bO.length; bN < bQ; bN++) {
			var bM = bO[bN];
			if (!bM.castShadow) {
				continue
			}
			if (bM instanceof THREE.SpotLight) {
				bP++
			}
			if (bM instanceof THREE.DirectionalLight && !bM.shadowCascade) {
				bP++
			}
		}
		return bP
	}
	this.initMaterial = function() {
		THREE.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
	};
	this.addPrePlugin = function() {
		THREE.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
	};
	this.addPostPlugin = function() {
		THREE.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
	};
	this.updateShadowMap = function() {
		THREE.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
	}
};
THREE.WebGLRenderTarget = function(c, a, b) {
	this.width = c;
	this.height = a;
	b = b || {};
	this.wrapS = b.wrapS !== undefined ? b.wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = b.wrapT !== undefined ? b.wrapT : THREE.ClampToEdgeWrapping;
	this.magFilter = b.magFilter !== undefined ? b.magFilter : THREE.LinearFilter;
	this.minFilter = b.minFilter !== undefined ? b.minFilter : THREE.LinearMipMapLinearFilter;
	this.anisotropy = b.anisotropy !== undefined ? b.anisotropy : 1;
	this.offset = new THREE.Vector2(0, 0);
	this.repeat = new THREE.Vector2(1, 1);
	this.format = b.format !== undefined ? b.format : THREE.RGBAFormat;
	this.type = b.type !== undefined ? b.type : THREE.UnsignedByteType;
	this.depthBuffer = b.depthBuffer !== undefined ? b.depthBuffer : true;
	this.stencilBuffer = b.stencilBuffer !== undefined ? b.stencilBuffer : true;
	this.generateMipmaps = true;
	this.shareDepthFrom = b.shareDepthFrom !== undefined ? b.shareDepthFrom : null
};
THREE.WebGLRenderTarget.prototype = {
	constructor: THREE.WebGLRenderTarget,
	setSize: function(b, a) {
		this.width = b;
		this.height = a
	},
	clone: function() {
		var a = new THREE.WebGLRenderTarget(this.width, this.height);
		a.wrapS = this.wrapS;
		a.wrapT = this.wrapT;
		a.magFilter = this.magFilter;
		a.minFilter = this.minFilter;
		a.anisotropy = this.anisotropy;
		a.offset.copy(this.offset);
		a.repeat.copy(this.repeat);
		a.format = this.format;
		a.type = this.type;
		a.depthBuffer = this.depthBuffer;
		a.stencilBuffer = this.stencilBuffer;
		a.generateMipmaps = this.generateMipmaps;
		a.shareDepthFrom = this.shareDepthFrom;
		return a
	},
	dispose: function() {
		this.dispatchEvent({
			type: "dispose"
		})
	}
};
THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube = function(c, a, b) {
	THREE.WebGLRenderTarget.call(this, c, a, b);
	this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;
THREE.WebGLExtensions = function(b) {
	var a = {};
	this.get = function(c) {
		if (a[c] !== undefined) {
			return a[c]
		}
		var d;
		switch (c) {
			case "EXT_texture_filter_anisotropic":
				d = b.getExtension("EXT_texture_filter_anisotropic") || b.getExtension("MOZ_EXT_texture_filter_anisotropic") || b.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
				break;
			case "WEBGL_compressed_texture_s3tc":
				d = b.getExtension("WEBGL_compressed_texture_s3tc") || b.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || b.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
				break;
			case "WEBGL_compressed_texture_pvrtc":
				d = b.getExtension("WEBGL_compressed_texture_pvrtc") || b.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
				break;
			default:
				d = b.getExtension(c)
		}
		if (d === null) {
			THREE.warn("THREE.WebGLRenderer: " + c + " extension not supported.")
		}
		a[c] = d;
		return d
	}
};
THREE.WebGLProgram = (function() {
	var b = 0;
	var c = function(f) {
		var g, e, j = [];
		for (var h in f) {
			g = f[h];
			if (g === false) {
				continue
			}
			e = "#define " + h + " " + g;
			j.push(e)
		}
		return j.join("\n")
	};
	var d = function(k, h, f) {
		var e = {};
		for (var j = 0, g = f.length; j < g; j++) {
			var m = f[j];
			e[m] = k.getUniformLocation(h, m)
		}
		return e
	};
	var a = function(k, h, e) {
		var g = {};
		for (var j = 0, f = e.length; j < f; j++) {
			var m = e[j];
			g[m] = k.getAttribLocation(h, m)
		}
		return g
	};
	return function(D, f, C, q) {
		var F = D;
		var r = F.context;
		var I = C.defines;
		var L = C.__webglShader.uniforms;
		var v = C.attributes;
		var l = C.__webglShader.vertexShader;
		var e = C.__webglShader.fragmentShader;
		var J = C.index0AttributeName;
		if (J === undefined && q.morphTargets === true) {
			J = "position"
		}
		var h = "SHADOWMAP_TYPE_BASIC";
		if (q.shadowMapType === THREE.PCFShadowMap) {
			h = "SHADOWMAP_TYPE_PCF"
		} else {
			if (q.shadowMapType === THREE.PCFSoftShadowMap) {
				h = "SHADOWMAP_TYPE_PCF_SOFT"
			}
		}
		var K = "ENVMAP_TYPE_CUBE";
		var E = "ENVMAP_MODE_REFLECTION";
		var g = "ENVMAP_BLENDING_MULTIPLY";
		if (q.envMap) {
			switch (C.envMap.mapping) {
				case THREE.CubeReflectionMapping:
				case THREE.CubeRefractionMapping:
					K = "ENVMAP_TYPE_CUBE";
					break;
				case THREE.EquirectangularReflectionMapping:
				case THREE.EquirectangularRefractionMapping:
					K = "ENVMAP_TYPE_EQUIREC";
					break;
				case THREE.SphericalReflectionMapping:
					K = "ENVMAP_TYPE_SPHERE";
					break
			}
			switch (C.envMap.mapping) {
				case THREE.CubeRefractionMapping:
				case THREE.EquirectangularRefractionMapping:
					E = "ENVMAP_MODE_REFRACTION";
					break
			}
			switch (C.combine) {
				case THREE.MultiplyOperation:
					g = "ENVMAP_BLENDING_MULTIPLY";
					break;
				case THREE.MixOperation:
					g = "ENVMAP_BLENDING_MIX";
					break;
				case THREE.AddOperation:
					g = "ENVMAP_BLENDING_ADD";
					break
			}
		}
		var o = (D.gammaFactor > 0) ? D.gammaFactor : 1;
		var k = c(I);
		var t = r.createProgram();
		var j, n;
		if (C instanceof THREE.RawShaderMaterial) {
			j = "";
			n = ""
		} else {
			j = ["precision " + q.precision + " float;", "precision " + q.precision + " int;", k, q.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", F.gammaInput ? "#define GAMMA_INPUT" : "", F.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + o, "#define MAX_DIR_LIGHTS " + q.maxDirLights, "#define MAX_POINT_LIGHTS " + q.maxPointLights, "#define MAX_SPOT_LIGHTS " + q.maxSpotLights, "#define MAX_HEMI_LIGHTS " + q.maxHemiLights, "#define MAX_SHADOWS " + q.maxShadows, "#define MAX_BONES " + q.maxBones, q.map ? "#define USE_MAP" : "", q.envMap ? "#define USE_ENVMAP" : "", q.envMap ? "#define " + E : "", q.lightMap ? "#define USE_LIGHTMAP" : "", q.bumpMap ? "#define USE_BUMPMAP" : "", q.normalMap ? "#define USE_NORMALMAP" : "", q.specularMap ? "#define USE_SPECULARMAP" : "", q.alphaMap ? "#define USE_ALPHAMAP" : "", q.vertexColors ? "#define USE_COLOR" : "", q.flatShading ? "#define FLAT_SHADED" : "", q.skinning ? "#define USE_SKINNING" : "", q.useVertexTexture ? "#define BONE_TEXTURE" : "", q.morphTargets ? "#define USE_MORPHTARGETS" : "", q.morphNormals ? "#define USE_MORPHNORMALS" : "", q.wrapAround ? "#define WRAP_AROUND" : "", q.doubleSided ? "#define DOUBLE_SIDED" : "", q.flipSided ? "#define FLIP_SIDED" : "", q.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", q.shadowMapEnabled ? "#define " + h : "", q.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", q.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", q.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", q.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "	attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", ""].join("\n");
			n = ["precision " + q.precision + " float;", "precision " + q.precision + " int;", (q.bumpMap || q.normalMap || q.flatShading) ? "#extension GL_OES_standard_derivatives : enable" : "", k, "#define MAX_DIR_LIGHTS " + q.maxDirLights, "#define MAX_POINT_LIGHTS " + q.maxPointLights, "#define MAX_SPOT_LIGHTS " + q.maxSpotLights, "#define MAX_HEMI_LIGHTS " + q.maxHemiLights, "#define MAX_SHADOWS " + q.maxShadows, q.alphaTest ? "#define ALPHATEST " + q.alphaTest : "", F.gammaInput ? "#define GAMMA_INPUT" : "", F.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + o, (q.useFog && q.fog) ? "#define USE_FOG" : "", (q.useFog && q.fogExp) ? "#define FOG_EXP2" : "", q.map ? "#define USE_MAP" : "", q.envMap ? "#define USE_ENVMAP" : "", q.envMap ? "#define " + K : "", q.envMap ? "#define " + E : "", q.envMap ? "#define " + g : "", q.lightMap ? "#define USE_LIGHTMAP" : "", q.bumpMap ? "#define USE_BUMPMAP" : "", q.normalMap ? "#define USE_NORMALMAP" : "", q.specularMap ? "#define USE_SPECULARMAP" : "", q.alphaMap ? "#define USE_ALPHAMAP" : "", q.vertexColors ? "#define USE_COLOR" : "", q.flatShading ? "#define FLAT_SHADED" : "", q.metal ? "#define METAL" : "", q.wrapAround ? "#define WRAP_AROUND" : "", q.doubleSided ? "#define DOUBLE_SIDED" : "", q.flipSided ? "#define FLIP_SIDED" : "", q.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", q.shadowMapEnabled ? "#define " + h : "", q.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", q.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", q.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n")
		}
		var m = new THREE.WebGLShader(r, r.VERTEX_SHADER, j + l);
		var G = new THREE.WebGLShader(r, r.FRAGMENT_SHADER, n + e);
		r.attachShader(t, m);
		r.attachShader(t, G);
		if (J !== undefined) {
			r.bindAttribLocation(t, 0, J)
		}
		r.linkProgram(t);
		var A = r.getProgramInfoLog(t);
		if (r.getProgramParameter(t, r.LINK_STATUS) === false) {
			THREE.error("THREE.WebGLProgram: shader error: " + r.getError(), "gl.VALIDATE_STATUS", r.getProgramParameter(t, r.VALIDATE_STATUS), "gl.getPRogramInfoLog", A)
		}
		if (A !== "") {
			THREE.warn("THREE.WebGLProgram: gl.getProgramInfoLog()" + A)
		}
		r.deleteShader(m);
		r.deleteShader(G);
		var p = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "cameraPosition", "morphTargetInfluences", "bindMatrix", "bindMatrixInverse"];
		if (q.useVertexTexture) {
			p.push("boneTexture");
			p.push("boneTextureWidth");
			p.push("boneTextureHeight")
		} else {
			p.push("boneGlobalMatrices")
		}
		if (q.logarithmicDepthBuffer) {
			p.push("logDepthBufFC")
		}
		for (var B in L) {
			p.push(B)
		}
		this.uniforms = d(r, t, p);
		p = ["position", "normal", "uv", "uv2", "tangent", "color", "skinIndex", "skinWeight", "lineDistance"];
		for (var H = 0; H < q.maxMorphTargets; H++) {
			p.push("morphTarget" + H)
		}
		for (var H = 0; H < q.maxMorphNormals; H++) {
			p.push("morphNormal" + H)
		}
		for (var M in v) {
			p.push(M)
		}
		this.attributes = a(r, t, p);
		this.attributesKeys = Object.keys(this.attributes);
		this.id = b++;
		this.code = f;
		this.usedTimes = 1;
		this.program = t;
		this.vertexShader = m;
		this.fragmentShader = G;
		return this
	}
})();
THREE.WebGLShader = (function() {
	var a = function(c) {
		var b = c.split("\n");
		for (var d = 0; d < b.length; d++) {
			b[d] = (d + 1) + ": " + b[d]
		}
		return b.join("\n")
	};
	return function(e, c, b) {
		var d = e.createShader(c);
		e.shaderSource(d, b);
		e.compileShader(d);
		if (e.getShaderParameter(d, e.COMPILE_STATUS) === false) {
			THREE.error("THREE.WebGLShader: Shader couldn't compile.")
		}
		if (e.getShaderInfoLog(d) !== "") {
			THREE.warn("THREE.WebGLShader: gl.getShaderInfoLog()", e.getShaderInfoLog(d), a(b))
		}
		return d
	}
})();
THREE.WebGLState = function(j, p) {
	var u = new Uint8Array(16);
	var n = new Uint8Array(16);
	var v = null;
	var g = null;
	var d = null;
	var q = null;
	var c = null;
	var m = null;
	var t = null;
	var f = null;
	var e = null;
	var l = null;
	var a = null;
	var r = null;
	var h = null;
	var o = null;
	var b = null;
	var k = null;
	this.initAttributes = function() {
		for (var B = 0, A = u.length; B < A; B++) {
			u[B] = 0
		}
	};
	this.enableAttribute = function(A) {
		u[A] = 1;
		if (n[A] === 0) {
			j.enableVertexAttribArray(A);
			n[A] = 1
		}
	};
	this.disableUnusedAttributes = function() {
		for (var B = 0, A = n.length; B < A; B++) {
			if (n[B] !== u[B]) {
				j.disableVertexAttribArray(B);
				n[B] = 0
			}
		}
	};
	this.setBlending = function(C, B, D, E, G, F, A) {
		if (C !== v) {
			if (C === THREE.NoBlending) {
				j.disable(j.BLEND)
			} else {
				if (C === THREE.AdditiveBlending) {
					j.enable(j.BLEND);
					j.blendEquation(j.FUNC_ADD);
					j.blendFunc(j.SRC_ALPHA, j.ONE)
				} else {
					if (C === THREE.SubtractiveBlending) {
						j.enable(j.BLEND);
						j.blendEquation(j.FUNC_ADD);
						j.blendFunc(j.ZERO, j.ONE_MINUS_SRC_COLOR)
					} else {
						if (C === THREE.MultiplyBlending) {
							j.enable(j.BLEND);
							j.blendEquation(j.FUNC_ADD);
							j.blendFunc(j.ZERO, j.SRC_COLOR)
						} else {
							if (C === THREE.CustomBlending) {
								j.enable(j.BLEND)
							} else {
								j.enable(j.BLEND);
								j.blendEquationSeparate(j.FUNC_ADD, j.FUNC_ADD);
								j.blendFuncSeparate(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA, j.ONE, j.ONE_MINUS_SRC_ALPHA)
							}
						}
					}
				}
			}
			v = C
		}
		if (C === THREE.CustomBlending) {
			G = G || B;
			F = F || D;
			A = A || E;
			if (B !== g || G !== c) {
				j.blendEquationSeparate(p(B), p(G));
				g = B;
				c = G
			}
			if (D !== d || E !== q || F !== m || A !== t) {
				j.blendFuncSeparate(p(D), p(E), p(F), p(A));
				d = D;
				q = E;
				m = F;
				t = A
			}
		} else {
			g = null;
			d = null;
			q = null;
			c = null;
			m = null;
			t = null
		}
	};
	this.setDepthTest = function(A) {
		if (f !== A) {
			if (A) {
				j.enable(j.DEPTH_TEST)
			} else {
				j.disable(j.DEPTH_TEST)
			}
			f = A
		}
	};
	this.setDepthWrite = function(A) {
		if (e !== A) {
			j.depthMask(A);
			e = A
		}
	};
	this.setColorWrite = function(A) {
		if (l !== A) {
			j.colorMask(A, A, A, A);
			l = A
		}
	};
	this.setDoubleSided = function(A) {
		if (a !== A) {
			if (A) {
				j.disable(j.CULL_FACE)
			} else {
				j.enable(j.CULL_FACE)
			}
			a = A
		}
	};
	this.setFlipSided = function(A) {
		if (r !== A) {
			if (A) {
				j.frontFace(j.CW)
			} else {
				j.frontFace(j.CCW)
			}
			r = A
		}
	};
	this.setLineWidth = function(A) {
		if (A !== h) {
			j.lineWidth(A);
			h = A
		}
	};
	this.setPolygonOffset = function(C, B, A) {
		if (o !== C) {
			if (C) {
				j.enable(j.POLYGON_OFFSET_FILL)
			} else {
				j.disable(j.POLYGON_OFFSET_FILL)
			}
			o = C
		}
		if (C && (b !== B || k !== A)) {
			j.polygonOffset(B, A);
			b = B;
			k = A
		}
	};
	this.reset = function() {
		for (var A = 0; A < n.length; A++) {
			n[A] = 0
		}
		v = null;
		f = null;
		e = null;
		l = null;
		a = null;
		r = null
	}
};
THREE.LensFlarePlugin = function(k, c) {
	var j = k.context;
	var l, a;
	var g, f, m;
	var h;
	var d, e;
	var n = function() {
		var p = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]);
		var o = new Uint16Array([0, 1, 2, 0, 2, 3]);
		l = j.createBuffer();
		a = j.createBuffer();
		j.bindBuffer(j.ARRAY_BUFFER, l);
		j.bufferData(j.ARRAY_BUFFER, p, j.STATIC_DRAW);
		j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, a);
		j.bufferData(j.ELEMENT_ARRAY_BUFFER, o, j.STATIC_DRAW);
		d = j.createTexture();
		e = j.createTexture();
		j.bindTexture(j.TEXTURE_2D, d);
		j.texImage2D(j.TEXTURE_2D, 0, j.RGB, 16, 16, 0, j.RGB, j.UNSIGNED_BYTE, null);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_WRAP_S, j.CLAMP_TO_EDGE);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_WRAP_T, j.CLAMP_TO_EDGE);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_MAG_FILTER, j.NEAREST);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_MIN_FILTER, j.NEAREST);
		j.bindTexture(j.TEXTURE_2D, e);
		j.texImage2D(j.TEXTURE_2D, 0, j.RGBA, 16, 16, 0, j.RGBA, j.UNSIGNED_BYTE, null);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_WRAP_S, j.CLAMP_TO_EDGE);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_WRAP_T, j.CLAMP_TO_EDGE);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_MAG_FILTER, j.NEAREST);
		j.texParameteri(j.TEXTURE_2D, j.TEXTURE_MIN_FILTER, j.NEAREST);
		h = j.getParameter(j.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
		var q;
		if (h) {
			q = {
				vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
				fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
			}
		} else {
			q = {
				vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
				fragmentShader: ["precision mediump float;", "uniform lowp int renderType;", "uniform sampler2D map;", "uniform sampler2D occlusionMap;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;", "visibility = ( 1.0 - visibility / 4.0 );", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * visibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
			}
		}
		g = b(q);
		f = {
			vertex: j.getAttribLocation(g, "position"),
			uv: j.getAttribLocation(g, "uv")
		};
		m = {
			renderType: j.getUniformLocation(g, "renderType"),
			map: j.getUniformLocation(g, "map"),
			occlusionMap: j.getUniformLocation(g, "occlusionMap"),
			opacity: j.getUniformLocation(g, "opacity"),
			color: j.getUniformLocation(g, "color"),
			scale: j.getUniformLocation(g, "scale"),
			rotation: j.getUniformLocation(g, "rotation"),
			screenPosition: j.getUniformLocation(g, "screenPosition")
		}
	};
	this.render = function(J, F, C, o) {
		if (c.length === 0) {
			return
		}
		var H = new THREE.Vector3();
		var q = o / C,
			I = C * 0.5,
			B = o * 0.5;
		var u = 16 / o,
			K = new THREE.Vector2(u * q, u);
		var t = new THREE.Vector3(1, 1, 0),
			r = new THREE.Vector2(1, 1);
		if (g === undefined) {
			n()
		}
		j.useProgram(g);
		j.enableVertexAttribArray(f.vertex);
		j.enableVertexAttribArray(f.uv);
		j.uniform1i(m.occlusionMap, 0);
		j.uniform1i(m.map, 1);
		j.bindBuffer(j.ARRAY_BUFFER, l);
		j.vertexAttribPointer(f.vertex, 2, j.FLOAT, false, 2 * 8, 0);
		j.vertexAttribPointer(f.uv, 2, j.FLOAT, false, 2 * 8, 8);
		j.bindBuffer(j.ELEMENT_ARRAY_BUFFER, a);
		j.disable(j.CULL_FACE);
		j.depthMask(false);
		for (var E = 0, A = c.length; E < A; E++) {
			u = 16 / o;
			K.set(u * q, u);
			var p = c[E];
			H.set(p.matrixWorld.elements[12], p.matrixWorld.elements[13], p.matrixWorld.elements[14]);
			H.applyMatrix4(F.matrixWorldInverse);
			H.applyProjection(F.projectionMatrix);
			t.copy(H);
			r.x = t.x * I + I;
			r.y = t.y * B + B;
			if (h || (r.x > 0 && r.x < C && r.y > 0 && r.y < o)) {
				j.activeTexture(j.TEXTURE1);
				j.bindTexture(j.TEXTURE_2D, d);
				j.copyTexImage2D(j.TEXTURE_2D, 0, j.RGB, r.x - 8, r.y - 8, 16, 16, 0);
				j.uniform1i(m.renderType, 0);
				j.uniform2f(m.scale, K.x, K.y);
				j.uniform3f(m.screenPosition, t.x, t.y, t.z);
				j.disable(j.BLEND);
				j.enable(j.DEPTH_TEST);
				j.drawElements(j.TRIANGLES, 6, j.UNSIGNED_SHORT, 0);
				j.activeTexture(j.TEXTURE0);
				j.bindTexture(j.TEXTURE_2D, e);
				j.copyTexImage2D(j.TEXTURE_2D, 0, j.RGBA, r.x - 8, r.y - 8, 16, 16, 0);
				j.uniform1i(m.renderType, 1);
				j.disable(j.DEPTH_TEST);
				j.activeTexture(j.TEXTURE1);
				j.bindTexture(j.TEXTURE_2D, d);
				j.drawElements(j.TRIANGLES, 6, j.UNSIGNED_SHORT, 0);
				p.positionScreen.copy(t);
				if (p.customUpdateCallback) {
					p.customUpdateCallback(p)
				} else {
					p.updateLensFlares()
				}
				j.uniform1i(m.renderType, 2);
				j.enable(j.BLEND);
				for (var D = 0, G = p.lensFlares.length; D < G; D++) {
					var v = p.lensFlares[D];
					if (v.opacity > 0.001 && v.scale > 0.001) {
						t.x = v.x;
						t.y = v.y;
						t.z = v.z;
						u = v.size * v.scale / o;
						K.x = u * q;
						K.y = u;
						j.uniform3f(m.screenPosition, t.x, t.y, t.z);
						j.uniform2f(m.scale, K.x, K.y);
						j.uniform1f(m.rotation, v.rotation);
						j.uniform1f(m.opacity, v.opacity);
						j.uniform3f(m.color, v.color.r, v.color.g, v.color.b);
						k.state.setBlending(v.blending, v.blendEquation, v.blendSrc, v.blendDst);
						k.setTexture(v.texture, 1);
						j.drawElements(j.TRIANGLES, 6, j.UNSIGNED_SHORT, 0)
					}
				}
			}
		}
		j.enable(j.CULL_FACE);
		j.enable(j.DEPTH_TEST);
		j.depthMask(true);
		k.resetGLState()
	};

	function b(q) {
		var p = j.createProgram();
		var o = j.createShader(j.FRAGMENT_SHADER);
		var t = j.createShader(j.VERTEX_SHADER);
		var r = "precision " + k.getPrecision() + " float;\n";
		j.shaderSource(o, r + q.fragmentShader);
		j.shaderSource(t, r + q.vertexShader);
		j.compileShader(o);
		j.compileShader(t);
		j.attachShader(p, o);
		j.attachShader(p, t);
		j.linkProgram(p);
		return p
	}
};
THREE.ShadowMapPlugin = function(r, e, t, h) {
	var f = r.context;
	var n, A, a, c, q = new THREE.Frustum(),
		b = new THREE.Matrix4(),
		p = new THREE.Vector3(),
		u = new THREE.Vector3(),
		g = new THREE.Vector3(),
		o = [];
	var k = THREE.ShaderLib.depthRGBA;
	var v = THREE.UniformsUtils.clone(k.uniforms);
	n = new THREE.ShaderMaterial({
		uniforms: v,
		vertexShader: k.vertexShader,
		fragmentShader: k.fragmentShader
	});
	A = new THREE.ShaderMaterial({
		uniforms: v,
		vertexShader: k.vertexShader,
		fragmentShader: k.fragmentShader,
		morphTargets: true
	});
	a = new THREE.ShaderMaterial({
		uniforms: v,
		vertexShader: k.vertexShader,
		fragmentShader: k.fragmentShader,
		skinning: true
	});
	c = new THREE.ShaderMaterial({
		uniforms: v,
		vertexShader: k.vertexShader,
		fragmentShader: k.fragmentShader,
		morphTargets: true,
		skinning: true
	});
	n._shadowPass = true;
	A._shadowPass = true;
	a._shadowPass = true;
	c._shadowPass = true;
	this.render = function(Y, W) {
		if (r.shadowMapEnabled === false) {
			return
		}
		var V, K, U, X, P, G, Z, ab, S, M, D, ac, I, aa = [],
			T = 0,
			C = null;
		f.clearColor(1, 1, 1, 1);
		f.disable(f.BLEND);
		f.enable(f.CULL_FACE);
		f.frontFace(f.CCW);
		if (r.shadowMapCullFace === THREE.CullFaceFront) {
			f.cullFace(f.FRONT)
		} else {
			f.cullFace(f.BACK)
		}
		r.state.setDepthTest(true);
		for (V = 0, K = e.length; V < K; V++) {
			I = e[V];
			if (!I.castShadow) {
				continue
			}
			if ((I instanceof THREE.DirectionalLight) && I.shadowCascade) {
				for (P = 0; P < I.shadowCascadeCount; P++) {
					var H;
					if (!I.shadowCascadeArray[P]) {
						H = m(I, P);
						H.originalCamera = W;
						var R = new THREE.Gyroscope();
						R.position.copy(I.shadowCascadeOffset);
						R.add(H);
						R.add(H.target);
						W.add(R);
						I.shadowCascadeArray[P] = H
					} else {
						H = I.shadowCascadeArray[P]
					}
					B(I, P);
					aa[T] = H;
					T++
				}
			} else {
				aa[T] = I;
				T++
			}
		}
		for (V = 0, K = aa.length; V < K; V++) {
			I = aa[V];
			if (!I.shadowMap) {
				var O = THREE.LinearFilter;
				if (r.shadowMapType === THREE.PCFSoftShadowMap) {
					O = THREE.NearestFilter
				}
				var Q = {
					minFilter: O,
					magFilter: O,
					format: THREE.RGBAFormat
				};
				I.shadowMap = new THREE.WebGLRenderTarget(I.shadowMapWidth, I.shadowMapHeight, Q);
				I.shadowMapSize = new THREE.Vector2(I.shadowMapWidth, I.shadowMapHeight);
				I.shadowMatrix = new THREE.Matrix4()
			}
			if (!I.shadowCamera) {
				if (I instanceof THREE.SpotLight) {
					I.shadowCamera = new THREE.PerspectiveCamera(I.shadowCameraFov, I.shadowMapWidth / I.shadowMapHeight, I.shadowCameraNear, I.shadowCameraFar)
				} else {
					if (I instanceof THREE.DirectionalLight) {
						I.shadowCamera = new THREE.OrthographicCamera(I.shadowCameraLeft, I.shadowCameraRight, I.shadowCameraTop, I.shadowCameraBottom, I.shadowCameraNear, I.shadowCameraFar)
					} else {
						THREE.error("THREE.ShadowMapPlugin: Unsupported light type for shadow", I);
						continue
					}
				}
				Y.add(I.shadowCamera);
				if (Y.autoUpdate === true) {
					Y.updateMatrixWorld()
				}
			}
			if (I.shadowCameraVisible && !I.cameraHelper) {
				I.cameraHelper = new THREE.CameraHelper(I.shadowCamera);
				Y.add(I.cameraHelper)
			}
			if (I.isVirtual && H.originalCamera == W) {
				d(W, I)
			}
			G = I.shadowMap;
			Z = I.shadowMatrix;
			ab = I.shadowCamera;
			ab.position.setFromMatrixPosition(I.matrixWorld);
			g.setFromMatrixPosition(I.target.matrixWorld);
			ab.lookAt(g);
			ab.updateMatrixWorld();
			ab.matrixWorldInverse.getInverse(ab.matrixWorld);
			if (I.cameraHelper) {
				I.cameraHelper.visible = I.shadowCameraVisible
			}
			if (I.shadowCameraVisible) {
				I.cameraHelper.update()
			}
			Z.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
			Z.multiply(ab.projectionMatrix);
			Z.multiply(ab.matrixWorldInverse);
			b.multiplyMatrices(ab.projectionMatrix, ab.matrixWorldInverse);
			q.setFromMatrix(b);
			r.setRenderTarget(G);
			r.clear();
			o.length = 0;
			j(Y, Y, ab);
			var F, J, L;
			for (U = 0, X = o.length; U < X; U++) {
				D = o[U];
				ac = D.object;
				S = D.buffer;
				F = l(ac);
				J = ac.geometry.morphTargets !== undefined && ac.geometry.morphTargets.length > 0 && F.morphTargets;
				L = ac instanceof THREE.SkinnedMesh && F.skinning;
				if (ac.customDepthMaterial) {
					M = ac.customDepthMaterial
				} else {
					if (L) {
						M = J ? c : a
					} else {
						if (J) {
							M = A
						} else {
							M = n
						}
					}
				}
				r.setMaterialFaces(F);
				if (S instanceof THREE.BufferGeometry) {
					r.renderBufferDirect(ab, e, C, M, S, ac)
				} else {
					r.renderBuffer(ab, e, C, M, S, ac)
				}
			}
			for (U = 0, X = h.length; U < X; U++) {
				D = h[U];
				ac = D.object;
				if (ac.visible && ac.castShadow) {
					ac._modelViewMatrix.multiplyMatrices(ab.matrixWorldInverse, ac.matrixWorld);
					r.renderImmediateObject(ab, e, C, n, ac)
				}
			}
		}
		var E = r.getClearColor(),
			N = r.getClearAlpha();
		f.clearColor(E.r, E.g, E.b, N);
		f.enable(f.BLEND);
		if (r.shadowMapCullFace === THREE.CullFaceFront) {
			f.cullFace(f.BACK)
		}
		r.resetGLState()
	};

	function j(H, D, G) {
		if (D.visible) {
			var F = t[D.id];
			if (F && D.castShadow && (D.frustumCulled === false || q.intersectsObject(D) === true)) {
				for (var E = 0, C = F.length; E < C; E++) {
					var I = F[E];
					D._modelViewMatrix.multiplyMatrices(G.matrixWorldInverse, D.matrixWorld);
					o.push(I)
				}
			}
			for (var E = 0, C = D.children.length; E < C; E++) {
				j(H, D.children[E], G)
			}
		}
	}

	function m(D, F) {
		var C = new THREE.DirectionalLight();
		C.isVirtual = true;
		C.onlyShadow = true;
		C.castShadow = true;
		C.shadowCameraNear = D.shadowCameraNear;
		C.shadowCameraFar = D.shadowCameraFar;
		C.shadowCameraLeft = D.shadowCameraLeft;
		C.shadowCameraRight = D.shadowCameraRight;
		C.shadowCameraBottom = D.shadowCameraBottom;
		C.shadowCameraTop = D.shadowCameraTop;
		C.shadowCameraVisible = D.shadowCameraVisible;
		C.shadowDarkness = D.shadowDarkness;
		C.shadowBias = D.shadowCascadeBias[F];
		C.shadowMapWidth = D.shadowCascadeWidth[F];
		C.shadowMapHeight = D.shadowCascadeHeight[F];
		C.pointsWorld = [];
		C.pointsFrustum = [];
		var I = C.pointsWorld,
			E = C.pointsFrustum;
		for (var H = 0; H < 8; H++) {
			I[H] = new THREE.Vector3();
			E[H] = new THREE.Vector3()
		}
		var J = D.shadowCascadeNearZ[F];
		var G = D.shadowCascadeFarZ[F];
		E[0].set(-1, -1, J);
		E[1].set(1, -1, J);
		E[2].set(-1, 1, J);
		E[3].set(1, 1, J);
		E[4].set(-1, -1, G);
		E[5].set(1, -1, G);
		E[6].set(-1, 1, G);
		E[7].set(1, 1, G);
		return C
	}

	function B(D, F) {
		var C = D.shadowCascadeArray[F];
		C.position.copy(D.position);
		C.target.position.copy(D.target.position);
		C.lookAt(C.target);
		C.shadowCameraVisible = D.shadowCameraVisible;
		C.shadowDarkness = D.shadowDarkness;
		C.shadowBias = D.shadowCascadeBias[F];
		var H = D.shadowCascadeNearZ[F];
		var G = D.shadowCascadeFarZ[F];
		var E = C.pointsFrustum;
		E[0].z = H;
		E[1].z = H;
		E[2].z = H;
		E[3].z = H;
		E[4].z = G;
		E[5].z = G;
		E[6].z = G;
		E[7].z = G
	}

	function d(F, C) {
		var H = C.shadowCamera,
			D = C.pointsFrustum,
			G = C.pointsWorld;
		p.set(Infinity, Infinity, Infinity);
		u.set(-Infinity, -Infinity, -Infinity);
		for (var E = 0; E < 8; E++) {
			var I = G[E];
			I.copy(D[E]);
			I.unproject(F);
			I.applyMatrix4(H.matrixWorldInverse);
			if (I.x < p.x) {
				p.x = I.x
			}
			if (I.x > u.x) {
				u.x = I.x
			}
			if (I.y < p.y) {
				p.y = I.y
			}
			if (I.y > u.y) {
				u.y = I.y
			}
			if (I.z < p.z) {
				p.z = I.z
			}
			if (I.z > u.z) {
				u.z = I.z
			}
		}
		H.left = p.x;
		H.right = u.x;
		H.top = u.y;
		H.bottom = p.y;
		H.updateProjectionMatrix()
	}

	function l(C) {
		return C.material instanceof THREE.MeshFaceMaterial ? C.material.materials[0] : C.material
	}
};
THREE.SpritePlugin = function(l, k) {
	var g = l.context;
	var m, a;
	var e, d, o;
	var j;
	var h = new THREE.Vector3();
	var c = new THREE.Quaternion();
	var f = new THREE.Vector3();
	var p = function() {
		var t = new Float32Array([-0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1, -0.5, 0.5, 0, 1]);
		var q = new Uint16Array([0, 1, 2, 0, 2, 3]);
		m = g.createBuffer();
		a = g.createBuffer();
		g.bindBuffer(g.ARRAY_BUFFER, m);
		g.bufferData(g.ARRAY_BUFFER, t, g.STATIC_DRAW);
		g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, a);
		g.bufferData(g.ELEMENT_ARRAY_BUFFER, q, g.STATIC_DRAW);
		e = b();
		d = {
			position: g.getAttribLocation(e, "position"),
			uv: g.getAttribLocation(e, "uv")
		};
		o = {
			uvOffset: g.getUniformLocation(e, "uvOffset"),
			uvScale: g.getUniformLocation(e, "uvScale"),
			rotation: g.getUniformLocation(e, "rotation"),
			scale: g.getUniformLocation(e, "scale"),
			color: g.getUniformLocation(e, "color"),
			map: g.getUniformLocation(e, "map"),
			opacity: g.getUniformLocation(e, "opacity"),
			modelViewMatrix: g.getUniformLocation(e, "modelViewMatrix"),
			projectionMatrix: g.getUniformLocation(e, "projectionMatrix"),
			fogType: g.getUniformLocation(e, "fogType"),
			fogDensity: g.getUniformLocation(e, "fogDensity"),
			fogNear: g.getUniformLocation(e, "fogNear"),
			fogFar: g.getUniformLocation(e, "fogFar"),
			fogColor: g.getUniformLocation(e, "fogColor"),
			alphaTest: g.getUniformLocation(e, "alphaTest")
		};
		var r = document.createElement("canvas");
		r.width = 8;
		r.height = 8;
		var u = r.getContext("2d");
		u.fillStyle = "white";
		u.fillRect(0, 0, 8, 8);
		j = new THREE.Texture(r);
		j.needsUpdate = true
	};
	this.render = function(A, D) {
		if (k.length === 0) {
			return
		}
		if (e === undefined) {
			p()
		}
		g.useProgram(e);
		g.enableVertexAttribArray(d.position);
		g.enableVertexAttribArray(d.uv);
		g.disable(g.CULL_FACE);
		g.enable(g.BLEND);
		g.bindBuffer(g.ARRAY_BUFFER, m);
		g.vertexAttribPointer(d.position, 2, g.FLOAT, false, 2 * 8, 0);
		g.vertexAttribPointer(d.uv, 2, g.FLOAT, false, 2 * 8, 8);
		g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, a);
		g.uniformMatrix4fv(o.projectionMatrix, false, D.projectionMatrix.elements);
		g.activeTexture(g.TEXTURE0);
		g.uniform1i(o.map, 0);
		var B = 0;
		var F = 0;
		var q = A.fog;
		if (q) {
			g.uniform3f(o.fogColor, q.color.r, q.color.g, q.color.b);
			if (q instanceof THREE.Fog) {
				g.uniform1f(o.fogNear, q.near);
				g.uniform1f(o.fogFar, q.far);
				g.uniform1i(o.fogType, 1);
				B = 1;
				F = 1
			} else {
				if (q instanceof THREE.FogExp2) {
					g.uniform1f(o.fogDensity, q.density);
					g.uniform1i(o.fogType, 2);
					B = 2;
					F = 2
				}
			}
		} else {
			g.uniform1i(o.fogType, 0);
			B = 0;
			F = 0
		}
		for (var v = 0, t = k.length; v < t; v++) {
			var E = k[v];
			E._modelViewMatrix.multiplyMatrices(D.matrixWorldInverse, E.matrixWorld);
			E.z = -E._modelViewMatrix.elements[14]
		}
		k.sort(n);
		var r = [];
		for (var v = 0, t = k.length; v < t; v++) {
			var E = k[v];
			var C = E.material;
			g.uniform1f(o.alphaTest, C.alphaTest);
			g.uniformMatrix4fv(o.modelViewMatrix, false, E._modelViewMatrix.elements);
			E.matrixWorld.decompose(h, c, f);
			r[0] = f.x;
			r[1] = f.y;
			var u = 0;
			if (A.fog && C.fog) {
				u = F
			}
			if (B !== u) {
				g.uniform1i(o.fogType, u);
				B = u
			}
			if (C.map !== null) {
				g.uniform2f(o.uvOffset, C.map.offset.x, C.map.offset.y);
				g.uniform2f(o.uvScale, C.map.repeat.x, C.map.repeat.y)
			} else {
				g.uniform2f(o.uvOffset, 0, 0);
				g.uniform2f(o.uvScale, 1, 1)
			}
			g.uniform1f(o.opacity, C.opacity);
			g.uniform3f(o.color, C.color.r, C.color.g, C.color.b);
			g.uniform1f(o.rotation, C.rotation);
			g.uniform2fv(o.scale, r);
			l.state.setBlending(C.blending, C.blendEquation, C.blendSrc, C.blendDst);
			l.state.setDepthTest(C.depthTest);
			l.state.setDepthWrite(C.depthWrite);
			if (C.map && C.map.image && C.map.image.width) {
				l.setTexture(C.map, 0)
			} else {
				l.setTexture(j, 0)
			}
			g.drawElements(g.TRIANGLES, 6, g.UNSIGNED_SHORT, 0)
		}
		g.enable(g.CULL_FACE);
		l.resetGLState()
	};

	function b() {
		var r = g.createProgram();
		var t = g.createShader(g.VERTEX_SHADER);
		var q = g.createShader(g.FRAGMENT_SHADER);
		g.shaderSource(t, ["precision " + l.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n"));
		g.shaderSource(q, ["precision " + l.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n"));
		g.compileShader(t);
		g.compileShader(q);
		g.attachShader(r, t);
		g.attachShader(r, q);
		g.linkProgram(r);
		return r
	}

	function n(r, q) {
		if (r.z !== q.z) {
			return q.z - r.z
		} else {
			return q.id - r.id
		}
	}
};
THREE.GeometryUtils = {
	merge: function(c, b, d) {
		THREE.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
		var a;
		if (b instanceof THREE.Mesh) {
			b.matrixAutoUpdate && b.updateMatrix();
			a = b.matrix;
			b = b.geometry
		}
		c.merge(b, a, d)
	},
	center: function(a) {
		THREE.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");
		return a.center()
	}
};
THREE.ImageUtils = {
	crossOrigin: undefined,
	loadTexture: function(c, b, d, f) {
		var a = new THREE.ImageLoader();
		a.crossOrigin = this.crossOrigin;
		var e = new THREE.Texture(undefined, b);
		a.load(c, function(g) {
			e.image = g;
			e.needsUpdate = true;
			if (d) {
				d(e)
			}
		}, undefined, function(g) {
			if (f) {
				f(g)
			}
		});
		e.sourceFile = c;
		return e
	},
	loadTextureCube: function(e, a, h, d) {
		var j = [];
		var l = new THREE.ImageLoader();
		l.crossOrigin = this.crossOrigin;
		var f = new THREE.CubeTexture(j, a);
		f.flipY = false;
		var c = 0;
		var g = function(m) {
			l.load(e[m], function(n) {
				f.images[m] = n;
				c += 1;
				if (c === 6) {
					f.needsUpdate = true;
					if (h) {
						h(f)
					}
				}
			}, undefined, d)
		};
		for (var b = 0, k = e.length; b < k; ++b) {
			g(b)
		}
		return f
	},
	loadCompressedTexture: function() {
		THREE.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
	},
	loadCompressedTextureCube: function() {
		THREE.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
	},
	getNormalMap: function(q, F) {
		var d = function(I, H) {
			return [I[1] * H[2] - I[2] * H[1], I[2] * H[0] - I[0] * H[2], I[0] * H[1] - I[1] * H[0]]
		};
		var A = function(I, H) {
			return [I[0] - H[0], I[1] - H[1], I[2] - H[2]]
		};
		var t = function(I) {
			var H = Math.sqrt(I[0] * I[0] + I[1] * I[1] + I[2] * I[2]);
			return [I[0] / H, I[1] / H, I[2] / H]
		};
		F = F | 1;
		var r = q.width;
		var p = q.height;
		var e = document.createElement("canvas");
		e.width = r;
		e.height = p;
		var c = e.getContext("2d");
		c.drawImage(q, 0, 0);
		var G = c.getImageData(0, 0, r, p).data;
		var B = c.createImageData(r, p);
		var k = B.data;
		for (var m = 0; m < r; m++) {
			for (var l = 0; l < p; l++) {
				var f = l - 1 < 0 ? 0 : l - 1;
				var h = l + 1 > p - 1 ? p - 1 : l + 1;
				var g = m - 1 < 0 ? 0 : m - 1;
				var j = m + 1 > r - 1 ? r - 1 : m + 1;
				var v = [];
				var E = [0, 0, G[(l * r + m) * 4] / 255 * F];
				v.push([-1, 0, G[(l * r + g) * 4] / 255 * F]);
				v.push([-1, -1, G[(f * r + g) * 4] / 255 * F]);
				v.push([0, -1, G[(f * r + m) * 4] / 255 * F]);
				v.push([1, -1, G[(f * r + j) * 4] / 255 * F]);
				v.push([1, 0, G[(l * r + j) * 4] / 255 * F]);
				v.push([1, 1, G[(h * r + j) * 4] / 255 * F]);
				v.push([0, 1, G[(h * r + m) * 4] / 255 * F]);
				v.push([-1, 1, G[(h * r + g) * 4] / 255 * F]);
				var o = [];
				var C = v.length;
				for (var u = 0; u < C; u++) {
					var b = v[u];
					var a = v[(u + 1) % C];
					b = A(b, E);
					a = A(a, E);
					o.push(t(d(b, a)))
				}
				var D = [0, 0, 0];
				for (var u = 0; u < o.length; u++) {
					D[0] += o[u][0];
					D[1] += o[u][1];
					D[2] += o[u][2]
				}
				D[0] /= o.length;
				D[1] /= o.length;
				D[2] /= o.length;
				var n = (l * r + m) * 4;
				k[n] = ((D[0] + 1) / 2 * 255) | 0;
				k[n + 1] = ((D[1] + 1) / 2 * 255) | 0;
				k[n + 2] = (D[2] * 255) | 0;
				k[n + 3] = 255
			}
		}
		c.putImageData(B, 0, 0);
		return e
	},
	generateDataTexture: function(c, l, d) {
		var m = c * l;
		var f = new Uint8Array(3 * m);
		var a = Math.floor(d.r * 255);
		var h = Math.floor(d.g * 255);
		var k = Math.floor(d.b * 255);
		for (var e = 0; e < m; e++) {
			f[e * 3] = a;
			f[e * 3 + 1] = h;
			f[e * 3 + 2] = k
		}
		var j = new THREE.DataTexture(f, c, l, THREE.RGBFormat);
		j.needsUpdate = true;
		return j
	}
};
THREE.SceneUtils = {
	createMultiMaterialObject: function(e, b) {
		var d = new THREE.Object3D();
		for (var c = 0, a = b.length; c < a; c++) {
			d.add(new THREE.Mesh(e, b[c]))
		}
		return d
	},
	detach: function(c, a, b) {
		c.applyMatrix(a.matrixWorld);
		a.remove(c);
		b.add(c)
	},
	attach: function(d, c, a) {
		var b = new THREE.Matrix4();
		b.getInverse(a.matrixWorld);
		d.applyMatrix(b);
		c.remove(d);
		a.add(d)
	}
};
THREE.FontUtils = {
	faces: {},
	face: "helvetiker",
	weight: "normal",
	style: "normal",
	size: 150,
	divisions: 10,
	getFace: function() {
		try {
			return this.faces[this.face][this.weight][this.style]
		} catch (a) {
			throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."
		}
	},
	loadFace: function(c) {
		var a = c.familyName.toLowerCase();
		var b = this;
		b.faces[a] = b.faces[a] || {};
		b.faces[a][c.cssFontWeight] = b.faces[a][c.cssFontWeight] || {};
		b.faces[a][c.cssFontWeight][c.cssFontStyle] = c;
		b.faces[a][c.cssFontWeight][c.cssFontStyle] = c;
		return c
	},
	drawText: function(k) {
		var f, h = this.getFace(),
			c = this.size / h.resolution,
			e = 0,
			j = String(k).split(""),
			b = j.length;
		var d = [];
		for (f = 0; f < b; f++) {
			var l = new THREE.Path();
			var g = this.extractGlyphPoints(j[f], h, c, e, l);
			e += g.offset;
			d.push(g.path)
		}
		var a = e / 2;
		return {
			paths: d,
			offset: a
		}
	},
	extractGlyphPoints: function(F, j, H, f, r) {
		var I = [];
		var A, u, d, e, v, b, G, E, l, k, h, g, q, D, o, C, n, B, a, m = j.glyphs[F] || j.glyphs["?"];
		if (!m) {
			return
		}
		if (m.o) {
			e = m._cachedOutline || (m._cachedOutline = m.o.split(" "));
			b = e.length;
			G = H;
			E = H;
			for (A = 0; A < b;) {
				v = e[A++];
				switch (v) {
					case "m":
						l = e[A++] * G + f;
						k = e[A++] * E;
						r.moveTo(l, k);
						break;
					case "l":
						l = e[A++] * G + f;
						k = e[A++] * E;
						r.lineTo(l, k);
						break;
					case "q":
						h = e[A++] * G + f;
						g = e[A++] * E;
						o = e[A++] * G + f;
						C = e[A++] * E;
						r.quadraticCurveTo(o, C, h, g);
						a = I[I.length - 1];
						if (a) {
							q = a.x;
							D = a.y;
							for (u = 1, d = this.divisions; u <= d; u++) {
								var p = u / d;
								THREE.Shape.Utils.b2(p, q, o, h);
								THREE.Shape.Utils.b2(p, D, C, g)
							}
						}
						break;
					case "b":
						h = e[A++] * G + f;
						g = e[A++] * E;
						o = e[A++] * G + f;
						C = e[A++] * E;
						n = e[A++] * G + f;
						B = e[A++] * E;
						r.bezierCurveTo(o, C, n, B, h, g);
						a = I[I.length - 1];
						if (a) {
							q = a.x;
							D = a.y;
							for (u = 1, d = this.divisions; u <= d; u++) {
								var p = u / d;
								THREE.Shape.Utils.b3(p, q, o, n, h);
								THREE.Shape.Utils.b3(p, D, C, B, g)
							}
						}
						break
				}
			}
		}
		return {
			offset: m.ha * H,
			path: r
		}
	}
};
THREE.FontUtils.generateShapes = function(j, k) {
	k = k || {};
	var m = k.size !== undefined ? k.size : 100;
	var h = k.curveSegments !== undefined ? k.curveSegments : 4;
	var d = k.font !== undefined ? k.font : "helvetiker";
	var g = k.weight !== undefined ? k.weight : "normal";
	var a = k.style !== undefined ? k.style : "normal";
	THREE.FontUtils.size = m;
	THREE.FontUtils.divisions = h;
	THREE.FontUtils.face = d;
	THREE.FontUtils.weight = g;
	THREE.FontUtils.style = a;
	var f = THREE.FontUtils.drawText(j);
	var l = f.paths;
	var c = [];
	for (var b = 0, e = l.length; b < e; b++) {
		Array.prototype.push.apply(c, l[b].toShapes())
	}
	return c
};
(function(c) {
	var b = 1e-10;
	var e = function(g, A) {
		var f = g.length;
		if (f < 3) {
			return null
		}
		var E = [],
			q = [],
			k = [];
		var B, r, p;
		if (d(g) > 0) {
			for (r = 0; r < f; r++) {
				q[r] = r
			}
		} else {
			for (r = 0; r < f; r++) {
				q[r] = (f - 1) - r
			}
		}
		var j = f;
		var h = 2 * j;
		for (r = j - 1; j > 2;) {
			if ((h--) <= 0) {
				THREE.warn("THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()");
				if (A) {
					return k
				}
				return E
			}
			B = r;
			if (j <= B) {
				B = 0
			}
			r = B + 1;
			if (j <= r) {
				r = 0
			}
			p = r + 1;
			if (j <= p) {
				p = 0
			}
			if (a(g, B, r, p, j, q)) {
				var o, m, l, D, C;
				o = q[B];
				m = q[r];
				l = q[p];
				E.push([g[o], g[m], g[l]]);
				k.push([q[B], q[r], q[p]]);
				for (D = r, C = r + 1; C < j; D++, C++) {
					q[D] = q[C]
				}
				j--;
				h = 2 * j
			}
		}
		if (A) {
			return k
		}
		return E
	};
	var d = function(g) {
		var k = g.length;
		var f = 0;
		for (var j = k - 1, h = 0; h < k; j = h++) {
			f += g[j].x * g[h].y - g[h].x * g[j].y
		}
		return f * 0.5
	};
	var a = function(L, F, E, B, K, S) {
		var J;
		var C, t, Q, O;
		var j, g, I, H;
		C = L[S[F]].x;
		t = L[S[F]].y;
		Q = L[S[E]].x;
		O = L[S[E]].y;
		j = L[S[B]].x;
		g = L[S[B]].y;
		if (b > (((Q - C) * (g - t)) - ((O - t) * (j - C)))) {
			return false
		}
		var h, f, D, A, R, P;
		var m, l, N, M, q, o;
		var k, r, G;
		h = j - Q;
		f = g - O;
		D = C - j;
		A = t - g;
		R = Q - C;
		P = O - t;
		for (J = 0; J < K; J++) {
			I = L[S[J]].x;
			H = L[S[J]].y;
			if (((I === C) && (H === t)) || ((I === Q) && (H === O)) || ((I === j) && (H === g))) {
				continue
			}
			m = I - C;
			l = H - t;
			N = I - Q;
			M = H - O;
			q = I - j;
			o = H - g;
			G = h * M - f * N;
			k = R * l - P * m;
			r = D * o - A * q;
			if ((G >= -b) && (r >= -b) && (k >= -b)) {
				return false
			}
		}
		return true
	};
	c.Triangulate = e;
	c.Triangulate.area = d;
	return c
})(THREE.FontUtils);
self._typeface_js = {
	faces: THREE.FontUtils.faces,
	loadFace: THREE.FontUtils.loadFace
};
THREE.typeface_js = self._typeface_js;
THREE.Audio = function(a) {
	THREE.Object3D.call(this);
	this.type = "Audio";
	this.context = a.context;
	this.source = this.context.createBufferSource();
	this.source.onended = this.onEnded.bind(this);
	this.gain = this.context.createGain();
	this.gain.connect(this.context.destination);
	this.panner = this.context.createPanner();
	this.panner.connect(this.gain);
	this.autoplay = false;
	this.startTime = 0;
	this.isPlaying = false
};
THREE.Audio.prototype = Object.create(THREE.Object3D.prototype);
THREE.Audio.prototype.constructor = THREE.Audio;
THREE.Audio.prototype.load = function(a) {
	var b = this;
	var c = new XMLHttpRequest();
	c.open("GET", a, true);
	c.responseType = "arraybuffer";
	c.onload = function(d) {
		b.context.decodeAudioData(this.response, function(e) {
			b.source.buffer = e;
			if (b.autoplay) {
				b.play()
			}
		})
	};
	c.send();
	return this
};
THREE.Audio.prototype.play = function() {
	if (this.isPlaying === true) {
		THREE.warn("THREE.Audio: Audio is already playing.");
		return
	}
	var a = this.context.createBufferSource();
	a.buffer = this.source.buffer;
	a.loop = this.source.loop;
	a.onended = this.source.onended;
	a.connect(this.panner);
	a.start(0, this.startTime);
	this.isPlaying = true;
	this.source = a
};
THREE.Audio.prototype.pause = function() {
	this.source.stop();
	this.startTime = this.context.currentTime
};
THREE.Audio.prototype.stop = function() {
	this.source.stop();
	this.startTime = 0
};
THREE.Audio.prototype.onEnded = function() {
	this.isPlaying = false
};
THREE.Audio.prototype.setLoop = function(a) {
	this.source.loop = a
};
THREE.Audio.prototype.setRefDistance = function(a) {
	this.panner.refDistance = a
};
THREE.Audio.prototype.setRolloffFactor = function(a) {
	this.panner.rolloffFactor = a
};
THREE.Audio.prototype.setVolume = function(a) {
	this.gain.gain.value = a
};
THREE.Audio.prototype.updateMatrixWorld = (function() {
	var a = new THREE.Vector3();
	return function(b) {
		THREE.Object3D.prototype.updateMatrixWorld.call(this, b);
		a.setFromMatrixPosition(this.matrixWorld);
		this.panner.setPosition(a.x, a.y, a.z)
	}
})();
THREE.AudioListener = function() {
	THREE.Object3D.call(this);
	this.type = "AudioListener";
	this.context = new(window.AudioContext || window.webkitAudioContext)()
};
THREE.AudioListener.prototype = Object.create(THREE.Object3D.prototype);
THREE.AudioListener.prototype.constructor = THREE.AudioListener;
THREE.AudioListener.prototype.updateMatrixWorld = (function() {
	var b = new THREE.Vector3();
	var e = new THREE.Quaternion();
	var f = new THREE.Vector3();
	var c = new THREE.Vector3();
	var d = new THREE.Vector3();
	var a = new THREE.Vector3();
	return function(j) {
		THREE.Object3D.prototype.updateMatrixWorld.call(this, j);
		var h = this.context.listener;
		var g = this.up;
		this.matrixWorld.decompose(b, e, f);
		c.set(0, 0, -1).applyQuaternion(e);
		d.subVectors(b, a);
		h.setPosition(b.x, b.y, b.z);
		h.setOrientation(c.x, c.y, c.z, g.x, g.y, g.z);
		h.setVelocity(d.x, d.y, d.z);
		a.copy(b)
	}
})();
THREE.Curve = function() {};
THREE.Curve.prototype.getPoint = function(a) {
	THREE.warn("THREE.Curve: Warning, getPoint() not implemented!");
	return null
};
THREE.Curve.prototype.getPointAt = function(a) {
	var b = this.getUtoTmapping(a);
	return this.getPoint(b)
};
THREE.Curve.prototype.getPoints = function(a) {
	if (!a) {
		a = 5
	}
	var c, b = [];
	for (c = 0; c <= a; c++) {
		b.push(this.getPoint(c / a))
	}
	return b
};
THREE.Curve.prototype.getSpacedPoints = function(a) {
	if (!a) {
		a = 5
	}
	var c, b = [];
	for (c = 0; c <= a; c++) {
		b.push(this.getPointAt(c / a))
	}
	return b
};
THREE.Curve.prototype.getLength = function() {
	var a = this.getLengths();
	return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function(b) {
	if (!b) {
		b = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions) : 200
	}
	if (this.cacheArcLengths && (this.cacheArcLengths.length == b + 1) && !this.needsUpdate) {
		return this.cacheArcLengths
	}
	this.needsUpdate = false;
	var a = [];
	var f, d = this.getPoint(0);
	var e, c = 0;
	a.push(0);
	for (e = 1; e <= b; e++) {
		f = this.getPoint(e / b);
		c += f.distanceTo(d);
		a.push(c);
		d = f
	}
	this.cacheArcLengths = a;
	return a
};
THREE.Curve.prototype.updateArcLengths = function() {
	this.needsUpdate = true;
	this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function(m, a) {
	var b = this.getLengths();
	var e = 0,
		j = b.length;
	var k;
	if (a) {
		k = a
	} else {
		k = m * b[j - 1]
	}
	var h = 0,
		d = j - 1,
		l;
	while (h <= d) {
		e = Math.floor(h + (d - h) / 2);
		l = b[e] - k;
		if (l < 0) {
			h = e + 1
		} else {
			if (l > 0) {
				d = e - 1
			} else {
				d = e;
				break
			}
		}
	}
	e = d;
	if (b[e] == k) {
		var o = e / (j - 1);
		return o
	}
	var f = b[e];
	var n = b[e + 1];
	var c = n - f;
	var g = (k - f) / c;
	var o = (e + g) / (j - 1);
	return o
};
THREE.Curve.prototype.getTangent = function(b) {
	var g = 0.0001;
	var d = b - g;
	var c = b + g;
	if (d < 0) {
		d = 0
	}
	if (c > 1) {
		c = 1
	}
	var f = this.getPoint(d);
	var e = this.getPoint(c);
	var a = e.clone().sub(f);
	return a.normalize()
};
THREE.Curve.prototype.getTangentAt = function(a) {
	var b = this.getUtoTmapping(a);
	return this.getTangent(b)
};
THREE.Curve.Utils = {
	tangentQuadraticBezier: function(a, d, c, b) {
		return 2 * (1 - a) * (c - d) + 2 * a * (b - c)
	},
	tangentCubicBezier: function(a, e, d, c, b) {
		return -3 * e * (1 - a) * (1 - a) + 3 * d * (1 - a) * (1 - a) - 6 * a * d * (1 - a) + 6 * a * c * (1 - a) - 3 * a * a * c + 3 * a * a * b
	},
	tangentSpline: function(j, h, g, f, d) {
		var e = 6 * j * j - 6 * j;
		var b = 3 * j * j - 4 * j + 1;
		var c = -6 * j * j + 6 * j;
		var a = 3 * j * j - 2 * j;
		return e + b + c + a
	},
	interpolate: function(h, g, e, d, j) {
		var f = (e - h) * 0.5;
		var c = (d - g) * 0.5;
		var b = j * j;
		var a = j * b;
		return (2 * g - 2 * e + f + c) * a + (-3 * g + 3 * e - 2 * f - c) * b + f * j + g
	}
};
THREE.Curve.create = function(a, b) {
	a.prototype = Object.create(THREE.Curve.prototype);
	a.prototype.constructor = a;
	a.prototype.getPoint = b;
	return a
};
THREE.CurvePath = function() {
	this.curves = [];
	this.bends = [];
	this.autoClose = false
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.constructor = THREE.CurvePath;
THREE.CurvePath.prototype.add = function(a) {
	this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function() {};
THREE.CurvePath.prototype.closePath = function() {
	var b = this.curves[0].getPoint(0);
	var a = this.curves[this.curves.length - 1].getPoint(1);
	if (!b.equals(a)) {
		this.curves.push(new THREE.LineCurve(a, b))
	}
};
THREE.CurvePath.prototype.getPoint = function(c) {
	var h = c * this.getLength();
	var g = this.getCurveLengths();
	var b = 0,
		e, f;
	while (b < g.length) {
		if (g[b] >= h) {
			e = g[b] - h;
			f = this.curves[b];
			var a = 1 - e / f.getLength();
			return f.getPointAt(a)
		}
		b++
	}
	return null
};
THREE.CurvePath.prototype.getLength = function() {
	var a = this.getCurveLengths();
	return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function() {
	if (this.cacheLengths && this.cacheLengths.length == this.curves.length) {
		return this.cacheLengths
	}
	var d = [],
		c = 0;
	var b, a = this.curves.length;
	for (b = 0; b < a; b++) {
		c += this.curves[b].getLength();
		d.push(c)
	}
	this.cacheLengths = d;
	return d
};
THREE.CurvePath.prototype.getBoundingBox = function() {
	var m = this.getPoints();
	var b, a, n;
	var f, e, d;
	b = a = Number.NEGATIVE_INFINITY;
	f = e = Number.POSITIVE_INFINITY;
	var c, g, l, h;
	var k = m[0] instanceof THREE.Vector3;
	h = k ? new THREE.Vector3() : new THREE.Vector2();
	for (g = 0, l = m.length; g < l; g++) {
		c = m[g];
		if (c.x > b) {
			b = c.x
		} else {
			if (c.x < f) {
				f = c.x
			}
		}
		if (c.y > a) {
			a = c.y
		} else {
			if (c.y < e) {
				e = c.y
			}
		}
		if (k) {
			if (c.z > n) {
				n = c.z
			} else {
				if (c.z < d) {
					d = c.z
				}
			}
		}
		h.add(c)
	}
	var j = {
		minX: f,
		minY: e,
		maxX: b,
		maxY: a
	};
	if (k) {
		j.maxZ = n;
		j.minZ = d
	}
	return j
};
THREE.CurvePath.prototype.createPointsGeometry = function(a) {
	var b = this.getPoints(a, true);
	return this.createGeometry(b)
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
	var b = this.getSpacedPoints(a, true);
	return this.createGeometry(b)
};
THREE.CurvePath.prototype.createGeometry = function(b) {
	var c = new THREE.Geometry();
	for (var a = 0; a < b.length; a++) {
		c.vertices.push(new THREE.Vector3(b[a].x, b[a].y, b[a].z || 0))
	}
	return c
};
THREE.CurvePath.prototype.addWrapPath = function(a) {
	this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function(c, e) {
	var b = this.getPoints(c);
	var d, a;
	if (!e) {
		e = this.bends
	}
	for (d = 0, a = e.length; d < a; d++) {
		b = this.getWrapPoints(b, e[d])
	}
	return b
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function(c, e) {
	var b = this.getSpacedPoints(c);
	var d, a;
	if (!e) {
		e = this.bends
	}
	for (d = 0, a = e.length; d < a; d++) {
		b = this.getWrapPoints(b, e[d])
	}
	return b
};
THREE.CurvePath.prototype.getWrapPoints = function(f, l) {
	var a = this.getBoundingBox();
	var d, g, b, j, h, k;
	for (d = 0, g = f.length; d < g; d++) {
		b = f[d];
		j = b.x;
		h = b.y;
		k = j / a.maxX;
		k = l.getUtoTmapping(k, j);
		var c = l.getPoint(k);
		var e = l.getTangent(k);
		e.set(-e.y, e.x).multiplyScalar(h);
		b.x = c.x + e.x;
		b.y = c.y + e.y
	}
	return f
};
THREE.Gyroscope = function() {
	THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.constructor = THREE.Gyroscope;
THREE.Gyroscope.prototype.updateMatrixWorld = (function() {
	var d = new THREE.Vector3();
	var f = new THREE.Quaternion();
	var c = new THREE.Vector3();
	var b = new THREE.Vector3();
	var a = new THREE.Quaternion();
	var e = new THREE.Vector3();
	return function(j) {
		this.matrixAutoUpdate && this.updateMatrix();
		if (this.matrixWorldNeedsUpdate || j) {
			if (this.parent) {
				this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
				this.matrixWorld.decompose(b, a, e);
				this.matrix.decompose(d, f, c);
				this.matrixWorld.compose(b, f, e)
			} else {
				this.matrixWorld.copy(this.matrix)
			}
			this.matrixWorldNeedsUpdate = false;
			j = true
		}
		for (var h = 0, g = this.children.length; h < g; h++) {
			this.children[h].updateMatrixWorld(j)
		}
	}
}());
THREE.Path = function(a) {
	THREE.CurvePath.call(this);
	this.actions = [];
	if (a) {
		this.fromPoints(a)
	}
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.Path.prototype.constructor = THREE.Path;
THREE.PathActions = {
	MOVE_TO: "moveTo",
	LINE_TO: "lineTo",
	QUADRATIC_CURVE_TO: "quadraticCurveTo",
	BEZIER_CURVE_TO: "bezierCurveTo",
	CSPLINE_THRU: "splineThru",
	ARC: "arc",
	ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function(b) {
	this.moveTo(b[0].x, b[0].y);
	for (var a = 1, c = b.length; a < c; a++) {
		this.lineTo(b[a].x, b[a].y)
	}
};
THREE.Path.prototype.moveTo = function(a, c) {
	var b = Array.prototype.slice.call(arguments);
	this.actions.push({
		action: THREE.PathActions.MOVE_TO,
		args: b
	})
};
THREE.Path.prototype.lineTo = function(a, g) {
	var b = Array.prototype.slice.call(arguments);
	var e = this.actions[this.actions.length - 1].args;
	var c = e[e.length - 2];
	var d = e[e.length - 1];
	var f = new THREE.LineCurve(new THREE.Vector2(c, d), new THREE.Vector2(a, g));
	this.curves.push(f);
	this.actions.push({
		action: THREE.PathActions.LINE_TO,
		args: b
	})
};
THREE.Path.prototype.quadraticCurveTo = function(e, b, g, f) {
	var h = Array.prototype.slice.call(arguments);
	var a = this.actions[this.actions.length - 1].args;
	var c = a[a.length - 2];
	var j = a[a.length - 1];
	var d = new THREE.QuadraticBezierCurve(new THREE.Vector2(c, j), new THREE.Vector2(e, b), new THREE.Vector2(g, f));
	this.curves.push(d);
	this.actions.push({
		action: THREE.PathActions.QUADRATIC_CURVE_TO,
		args: h
	})
};
THREE.Path.prototype.bezierCurveTo = function(e, c, l, k, g, f) {
	var h = Array.prototype.slice.call(arguments);
	var a = this.actions[this.actions.length - 1].args;
	var b = a[a.length - 2];
	var j = a[a.length - 1];
	var d = new THREE.CubicBezierCurve(new THREE.Vector2(b, j), new THREE.Vector2(e, c), new THREE.Vector2(l, k), new THREE.Vector2(g, f));
	this.curves.push(d);
	this.actions.push({
		action: THREE.PathActions.BEZIER_CURVE_TO,
		args: h
	})
};
THREE.Path.prototype.splineThru = function(g) {
	var a = Array.prototype.slice.call(arguments);
	var d = this.actions[this.actions.length - 1].args;
	var b = d[d.length - 2];
	var c = d[d.length - 1];
	var f = [new THREE.Vector2(b, c)];
	Array.prototype.push.apply(f, g);
	var e = new THREE.SplineCurve(f);
	this.curves.push(e);
	this.actions.push({
		action: THREE.PathActions.CSPLINE_THRU,
		args: a
	})
};
THREE.Path.prototype.arc = function(h, f, g, d, a, b) {
	var c = this.actions[this.actions.length - 1].args;
	var e = c[c.length - 2];
	var j = c[c.length - 1];
	this.absarc(h + e, f + j, g, d, a, b)
};
THREE.Path.prototype.absarc = function(e, d, f, c, b, a) {
	this.absellipse(e, d, f, f, c, b, a)
};
THREE.Path.prototype.ellipse = function(g, f, j, h, d, a, b) {
	var c = this.actions[this.actions.length - 1].args;
	var e = c[c.length - 2];
	var k = c[c.length - 1];
	this.absellipse(g + e, f + k, j, h, d, a, b)
};
THREE.Path.prototype.absellipse = function(f, e, k, g, c, a, b) {
	var h = Array.prototype.slice.call(arguments);
	var d = new THREE.EllipseCurve(f, e, k, g, c, a, b);
	this.curves.push(d);
	var j = d.getPoint(1);
	h.push(j.x);
	h.push(j.y);
	this.actions.push({
		action: THREE.PathActions.ELLIPSE,
		args: h
	})
};
THREE.Path.prototype.getSpacedPoints = function(b, d) {
	if (!b) {
		b = 40
	}
	var c = [];
	for (var a = 0; a < b; a++) {
		c.push(this.getPoint(a / b))
	}
	return c
};
THREE.Path.prototype.getPoints = function(T, R) {
	if (this.useSpacedPoints) {
		if (window.console && window.console.log) {
			console.log("tata")
		}
		return this.getSpacedPoints(T, R)
	}
	T = T || 12;
	var F = [];
	var O, v, r, c, J;
	var G, D, S, A, U, B, a, C, b, N, I, M, L;
	for (O = 0, v = this.actions.length; O < v; O++) {
		r = this.actions[O];
		c = r.action;
		J = r.args;
		switch (c) {
			case THREE.PathActions.MOVE_TO:
				F.push(new THREE.Vector2(J[0], J[1]));
				break;
			case THREE.PathActions.LINE_TO:
				F.push(new THREE.Vector2(J[0], J[1]));
				break;
			case THREE.PathActions.QUADRATIC_CURVE_TO:
				G = J[2];
				D = J[3];
				U = J[0];
				B = J[1];
				if (F.length > 0) {
					b = F[F.length - 1];
					a = b.x;
					C = b.y
				} else {
					b = this.actions[O - 1].args;
					a = b[b.length - 2];
					C = b[b.length - 1]
				}
				for (N = 1; N <= T; N++) {
					I = N / T;
					M = THREE.Shape.Utils.b2(I, a, U, G);
					L = THREE.Shape.Utils.b2(I, C, B, D);
					F.push(new THREE.Vector2(M, L))
				}
				break;
			case THREE.PathActions.BEZIER_CURVE_TO:
				G = J[4];
				D = J[5];
				U = J[0];
				B = J[1];
				S = J[2];
				A = J[3];
				if (F.length > 0) {
					b = F[F.length - 1];
					a = b.x;
					C = b.y
				} else {
					b = this.actions[O - 1].args;
					a = b[b.length - 2];
					C = b[b.length - 1]
				}
				for (N = 1; N <= T; N++) {
					I = N / T;
					M = THREE.Shape.Utils.b3(I, a, U, S, G);
					L = THREE.Shape.Utils.b3(I, C, B, A, D);
					F.push(new THREE.Vector2(M, L))
				}
				break;
			case THREE.PathActions.CSPLINE_THRU:
				b = this.actions[O - 1].args;
				var k = new THREE.Vector2(b[b.length - 2], b[b.length - 1]);
				var f = [k];
				var K = T * J[0].length;
				f = f.concat(J[0]);
				var Q = new THREE.SplineCurve(f);
				for (N = 1; N <= K; N++) {
					F.push(Q.getPointAt(N / K))
				}
				break;
			case THREE.PathActions.ARC:
				var o = J[0],
					m = J[1],
					p = J[2],
					P = J[3],
					H = J[4],
					h = !!J[5];
				var E = H - P;
				var l;
				var d = T * 2;
				for (N = 1; N <= d; N++) {
					I = N / d;
					if (!h) {
						I = 1 - I
					}
					l = P + I * E;
					M = o + p * Math.cos(l);
					L = m + p * Math.sin(l);
					F.push(new THREE.Vector2(M, L))
				}
				break;
			case THREE.PathActions.ELLIPSE:
				var o = J[0],
					m = J[1],
					q = J[2],
					u = J[3],
					P = J[4],
					H = J[5],
					h = !!J[6];
				var E = H - P;
				var l;
				var d = T * 2;
				for (N = 1; N <= d; N++) {
					I = N / d;
					if (!h) {
						I = 1 - I
					}
					l = P + I * E;
					M = o + q * Math.cos(l);
					L = m + u * Math.sin(l);
					F.push(new THREE.Vector2(M, L))
				}
				break
		}
	}
	var e = F[F.length - 1];
	var g = 1e-10;
	if (Math.abs(e.x - F[0].x) < g && Math.abs(e.y - F[0].y) < g) {
		F.splice(F.length - 1, 1)
	}
	if (R) {
		F.push(F[0])
	}
	return F
};
THREE.Path.prototype.toShapes = function(J, u) {
	function k(N) {
		var M, j, O, P, L;
		var R = [],
			Q = new THREE.Path();
		for (M = 0, j = N.length; M < j; M++) {
			O = N[M];
			L = O.args;
			P = O.action;
			if (P == THREE.PathActions.MOVE_TO) {
				if (Q.actions.length != 0) {
					R.push(Q);
					Q = new THREE.Path()
				}
			}
			Q[P].apply(Q, L)
		}
		if (Q.actions.length != 0) {
			R.push(Q)
		}
		return R
	}

	function m(M) {
		var j = [];
		for (var N = 0, L = M.length; N < L; N++) {
			var O = M[N];
			var P = new THREE.Shape();
			P.actions = O.actions;
			P.curves = O.curves;
			j.push(P)
		}
		return j
	}

	function q(U, N) {
		var O = 1e-10;
		var Q = N.length;
		var P = false;
		for (var L = Q - 1, j = 0; j < Q; L = j++) {
			var M = N[L];
			var V = N[j];
			var T = V.x - M.x;
			var R = V.y - M.y;
			if (Math.abs(R) > O) {
				if (R < 0) {
					M = N[j];
					T = -T;
					V = N[L];
					R = -R
				}
				if ((U.y < M.y) || (U.y > V.y)) {
					continue
				}
				if (U.y == M.y) {
					if (U.x == M.x) {
						return true
					}
				} else {
					var S = R * (U.x - M.x) - T * (U.y - M.y);
					if (S == 0) {
						return true
					}
					if (S < 0) {
						continue
					}
					P = !P
				}
			} else {
				if (U.y != M.y) {
					continue
				}
				if (((V.x <= U.x) && (U.x <= M.x)) || ((M.x <= U.x) && (U.x <= V.x))) {
					return true
				}
			}
		}
		return P
	}
	var e = k(this.actions);
	if (e.length == 0) {
		return []
	}
	if (u === true) {
		return m(e)
	}
	var I, G, o, r = [];
	if (e.length == 1) {
		G = e[0];
		o = new THREE.Shape();
		o.actions = G.actions;
		o.curves = G.curves;
		r.push(o);
		return r
	}
	var a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
	a = J ? !a : a;
	var p = [];
	var C = [];
	var H = [];
	var h = 0;
	var v;
	C[h] = undefined;
	H[h] = [];
	var D, n;
	for (D = 0, n = e.length; D < n; D++) {
		G = e[D];
		v = G.getPoints();
		I = THREE.Shape.Utils.isClockWise(v);
		I = J ? !I : I;
		if (I) {
			if ((!a) && (C[h])) {
				h++
			}
			C[h] = {
				s: new THREE.Shape(),
				p: v
			};
			C[h].s.actions = G.actions;
			C[h].s.curves = G.curves;
			if (a) {
				h++
			}
			H[h] = []
		} else {
			H[h].push({
				h: G,
				p: v[0]
			})
		}
	}
	if (!C[0]) {
		return m(e)
	}
	if (C.length > 1) {
		var c = false;
		var A = [];
		for (var K = 0, d = C.length; K < d; K++) {
			p[K] = []
		}
		for (var K = 0, d = C.length; K < d; K++) {
			var t = H[K];
			for (var l = 0; l < t.length; l++) {
				var b = t[l];
				var g = true;
				for (var f = 0; f < C.length; f++) {
					if (q(b.p, C[f].p)) {
						if (K != f) {
							A.push({
								froms: K,
								tos: f,
								hole: l
							})
						}
						if (g) {
							g = false;
							p[f].push(b)
						} else {
							c = true
						}
					}
				}
				if (g) {
					p[K].push(b)
				}
			}
		}
		if (A.length > 0) {
			if (!c) {
				H = p
			}
		}
	}
	var F, B, E;
	for (D = 0, n = C.length; D < n; D++) {
		o = C[D].s;
		r.push(o);
		F = H[D];
		for (B = 0, E = F.length; B < E; B++) {
			o.holes.push(F[B].h)
		}
	}
	return r
};
THREE.Shape = function() {
	THREE.Path.apply(this, arguments);
	this.holes = []
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.constructor = THREE.Shape;
THREE.Shape.prototype.extrude = function(b) {
	var a = new THREE.ExtrudeGeometry(this, b);
	return a
};
THREE.Shape.prototype.makeGeometry = function(a) {
	var b = new THREE.ShapeGeometry(this, a);
	return b
};
THREE.Shape.prototype.getPointsHoles = function(c) {
	var b, a = this.holes.length,
		d = [];
	for (b = 0; b < a; b++) {
		d[b] = this.holes[b].getTransformedPoints(c, this.bends)
	}
	return d
};
THREE.Shape.prototype.getSpacedPointsHoles = function(c) {
	var b, a = this.holes.length,
		d = [];
	for (b = 0; b < a; b++) {
		d[b] = this.holes[b].getTransformedSpacedPoints(c, this.bends)
	}
	return d
};
THREE.Shape.prototype.extractAllPoints = function(a) {
	return {
		shape: this.getTransformedPoints(a),
		holes: this.getPointsHoles(a)
	}
};
THREE.Shape.prototype.extractPoints = function(a) {
	if (this.useSpacedPoints) {
		return this.extractAllSpacedPoints(a)
	}
	return this.extractAllPoints(a)
};
THREE.Shape.prototype.extractAllSpacedPoints = function(a) {
	return {
		shape: this.getTransformedSpacedPoints(a),
		holes: this.getSpacedPointsHoles(a)
	}
};
THREE.Shape.Utils = {
	triangulateShape: function(p, j) {
		function e(A, h, f) {
			if (A.x != h.x) {
				if (A.x < h.x) {
					return ((A.x <= f.x) && (f.x <= h.x))
				} else {
					return ((h.x <= f.x) && (f.x <= A.x))
				}
			} else {
				if (A.y < h.y) {
					return ((A.y <= f.y) && (f.y <= h.y))
				} else {
					return ((h.y <= f.y) && (f.y <= A.y))
				}
			}
		}

		function m(W, V, B, A, S) {
			var L = 1e-10;
			var K = V.x - W.x,
				J = V.y - W.y;
			var U = A.x - B.x,
				T = A.y - B.y;
			var Q = W.x - B.x;
			var P = W.y - B.y;
			var R = J * U - K * T;
			var H = J * Q - K * P;
			if (Math.abs(R) > L) {
				var G;
				if (R > 0) {
					if ((H < 0) || (H > R)) {
						return []
					}
					G = T * Q - U * P;
					if ((G < 0) || (G > R)) {
						return []
					}
				} else {
					if ((H > 0) || (H < R)) {
						return []
					}
					G = T * Q - U * P;
					if ((G > 0) || (G < R)) {
						return []
					}
				}
				if (G == 0) {
					if ((S) && ((H == 0) || (H == R))) {
						return []
					}
					return [W]
				}
				if (G == R) {
					if ((S) && ((H == 0) || (H == R))) {
						return []
					}
					return [V]
				}
				if (H == 0) {
					return [B]
				}
				if (H == R) {
					return [A]
				}
				var h = G / R;
				return [{
					x: W.x + h * K,
					y: W.y + h * J
				}]
			} else {
				if ((H != 0) || (T * Q != U * P)) {
					return []
				}
				var M = ((K == 0) && (J == 0));
				var F = ((U == 0) && (T == 0));
				if (M && F) {
					if ((W.x != B.x) || (W.y != B.y)) {
						return []
					}
					return [W]
				}
				if (M) {
					if (!e(B, A, W)) {
						return []
					}
					return [W]
				}
				if (F) {
					if (!e(W, V, B)) {
						return []
					}
					return [B]
				}
				var X, f, O, I;
				var D, E, C, N;
				if (K != 0) {
					if (W.x < V.x) {
						X = W;
						O = W.x;
						f = V;
						I = V.x
					} else {
						X = V;
						O = V.x;
						f = W;
						I = W.x
					}
					if (B.x < A.x) {
						D = B;
						C = B.x;
						E = A;
						N = A.x
					} else {
						D = A;
						C = A.x;
						E = B;
						N = B.x
					}
				} else {
					if (W.y < V.y) {
						X = W;
						O = W.y;
						f = V;
						I = V.y
					} else {
						X = V;
						O = V.y;
						f = W;
						I = W.y
					}
					if (B.y < A.y) {
						D = B;
						C = B.y;
						E = A;
						N = A.y
					} else {
						D = A;
						C = A.y;
						E = B;
						N = B.y
					}
				}
				if (O <= C) {
					if (I < C) {
						return []
					}
					if (I == C) {
						if (S) {
							return []
						}
						return [D]
					}
					if (I <= N) {
						return [D, f]
					}
					return [D, E]
				} else {
					if (O > N) {
						return []
					}
					if (O == N) {
						if (S) {
							return []
						}
						return [X]
					}
					if (I <= N) {
						return [X, f]
					}
					return [X, E]
				}
			}
		}

		function t(C, H, A, J) {
			var B = 1e-10;
			var I = H.x - C.x,
				G = H.y - C.y;
			var L = A.x - C.x,
				K = A.y - C.y;
			var F = J.x - C.x,
				E = J.y - C.y;
			var h = I * K - G * L;
			var f = I * E - G * F;
			if (Math.abs(h) > B) {
				var D = F * K - E * L;
				if (h > 0) {
					return ((f >= 0) && (D >= 0))
				} else {
					return ((f >= 0) || (D >= 0))
				}
			} else {
				return (f > 0)
			}
		}

		function k(N, J) {
			var A = N.concat();
			var M;

			function O(aa, ad) {
				var Z = A.length - 1;
				var ac = aa - 1;
				if (ac < 0) {
					ac = Z
				}
				var Y = aa + 1;
				if (Y > Z) {
					Y = 0
				}
				var ae = t(A[aa], A[ac], A[Y], M[ad]);
				if (!ae) {
					return false
				}
				var ab = M.length - 1;
				var X = ad - 1;
				if (X < 0) {
					X = ab
				}
				var h = ad + 1;
				if (h > ab) {
					h = 0
				}
				ae = t(M[ad], M[X], M[h], A[aa]);
				if (!ae) {
					return false
				}
				return true
			}

			function f(X, Y) {
				var h, Z, aa;
				for (h = 0; h < A.length; h++) {
					Z = h + 1;
					Z %= A.length;
					aa = m(X, Y, A[h], A[Z], true);
					if (aa.length > 0) {
						return true
					}
				}
				return false
			}
			var E = [];

			function Q(X, Y) {
				var Z, ac, h, aa, ab;
				for (Z = 0; Z < E.length; Z++) {
					ac = J[E[Z]];
					for (h = 0; h < ac.length; h++) {
						aa = h + 1;
						aa %= ac.length;
						ab = m(X, Y, ac[h], ac[aa], true);
						if (ab.length > 0) {
							return true
						}
					}
				}
				return false
			}
			var K, H, W, T, U, R, D = [],
				V, S, G, F;
			for (var P = 0, C = J.length; P < C; P++) {
				E.push(P)
			}
			var B = 0;
			var L = E.length * 2;
			while (E.length > 0) {
				L--;
				if (L < 0) {
					if (window.console && window.console.log) {
						console.log("Infinite Loop! Holes left:" + E.length + ", Probably Hole outside Shape!")
					}
					break
				}
				for (H = B; H < A.length; H++) {
					W = A[H];
					K = -1;
					for (var P = 0; P < E.length; P++) {
						U = E[P];
						R = W.x + ":" + W.y + ":" + U;
						if (D[R] !== undefined) {
							continue
						}
						M = J[U];
						for (var I = 0; I < M.length; I++) {
							T = M[I];
							if (!O(H, I)) {
								continue
							}
							if (f(W, T)) {
								continue
							}
							if (Q(W, T)) {
								continue
							}
							K = I;
							E.splice(P, 1);
							V = A.slice(0, H + 1);
							S = A.slice(H);
							G = M.slice(K);
							F = M.slice(0, K + 1);
							A = V.concat(G).concat(F).concat(S);
							B = H;
							break
						}
						if (K >= 0) {
							break
						}
						D[R] = true
					}
					if (K >= 0) {
						break
					}
				}
			}
			return A
		}
		var q, n, u, l, v, d, c = {};
		var g = p.concat();
		for (var r = 0, b = j.length; r < b; r++) {
			Array.prototype.push.apply(g, j[r])
		}
		for (q = 0, n = g.length; q < n; q++) {
			v = g[q].x + ":" + g[q].y;
			if (c[v] !== undefined) {
				THREE.warn("THREE.Shape: Duplicate point", v)
			}
			c[v] = q
		}
		var a = k(p, j);
		var o = THREE.FontUtils.Triangulate(a, false);
		for (q = 0, n = o.length; q < n; q++) {
			l = o[q];
			for (u = 0; u < 3; u++) {
				v = l[u].x + ":" + l[u].y;
				d = c[v];
				if (d !== undefined) {
					l[u] = d
				}
			}
		}
		return o.concat()
	},
	isClockWise: function(a) {
		return THREE.FontUtils.Triangulate.area(a) < 0
	},
	b2p0: function(b, c) {
		var a = 1 - b;
		return a * a * c
	},
	b2p1: function(a, b) {
		return 2 * (1 - a) * a * b
	},
	b2p2: function(a, b) {
		return a * a * b
	},
	b2: function(a, d, c, b) {
		return this.b2p0(a, d) + this.b2p1(a, c) + this.b2p2(a, b)
	},
	b3p0: function(b, c) {
		var a = 1 - b;
		return a * a * a * c
	},
	b3p1: function(b, c) {
		var a = 1 - b;
		return 3 * a * a * b * c
	},
	b3p2: function(b, c) {
		var a = 1 - b;
		return 3 * a * b * b * c
	},
	b3p3: function(a, b) {
		return a * a * a * b
	},
	b3: function(a, e, d, c, b) {
		return this.b3p0(a, e) + this.b3p1(a, d) + this.b3p2(a, c) + this.b3p3(a, b)
	}
};
THREE.LineCurve = function(b, a) {
	this.v1 = b;
	this.v2 = a
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.constructor = THREE.LineCurve;
THREE.LineCurve.prototype.getPoint = function(b) {
	var a = this.v2.clone().sub(this.v1);
	a.multiplyScalar(b).add(this.v1);
	return a
};
THREE.LineCurve.prototype.getPointAt = function(a) {
	return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function(a) {
	var b = this.v2.clone().sub(this.v1);
	return b.normalize()
};
THREE.QuadraticBezierCurve = function(a, c, b) {
	this.v0 = a;
	this.v1 = c;
	this.v2 = b
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve;
THREE.QuadraticBezierCurve.prototype.getPoint = function(b) {
	var a = new THREE.Vector2();
	a.x = THREE.Shape.Utils.b2(b, this.v0.x, this.v1.x, this.v2.x);
	a.y = THREE.Shape.Utils.b2(b, this.v0.y, this.v1.y, this.v2.y);
	return a
};
THREE.QuadraticBezierCurve.prototype.getTangent = function(b) {
	var a = new THREE.Vector2();
	a.x = THREE.Curve.Utils.tangentQuadraticBezier(b, this.v0.x, this.v1.x, this.v2.x);
	a.y = THREE.Curve.Utils.tangentQuadraticBezier(b, this.v0.y, this.v1.y, this.v2.y);
	return a.normalize()
};
THREE.CubicBezierCurve = function(a, d, c, b) {
	this.v0 = a;
	this.v1 = d;
	this.v2 = c;
	this.v3 = b
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve;
THREE.CubicBezierCurve.prototype.getPoint = function(c) {
	var b, a;
	b = THREE.Shape.Utils.b3(c, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	a = THREE.Shape.Utils.b3(c, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function(c) {
	var b, a;
	b = THREE.Curve.Utils.tangentCubicBezier(c, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	a = THREE.Curve.Utils.tangentCubicBezier(c, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	var d = new THREE.Vector2(b, a);
	d.normalize();
	return d
};
THREE.SplineCurve = function(a) {
	this.points = (a == undefined) ? [] : a
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint = function(k) {
	var j = this.points;
	var h = (j.length - 1) * k;
	var a = Math.floor(h);
	var c = h - a;
	var g = j[a == 0 ? a : a - 1];
	var f = j[a];
	var e = j[a > j.length - 2 ? j.length - 1 : a + 1];
	var d = j[a > j.length - 3 ? j.length - 1 : a + 2];
	var b = new THREE.Vector2();
	b.x = THREE.Curve.Utils.interpolate(g.x, f.x, e.x, d.x, c);
	b.y = THREE.Curve.Utils.interpolate(g.y, f.y, e.y, d.y, c);
	return b
};
THREE.EllipseCurve = function(f, e, g, a, d, c, b) {
	this.aX = f;
	this.aY = e;
	this.xRadius = g;
	this.yRadius = a;
	this.aStartAngle = d;
	this.aEndAngle = c;
	this.aClockwise = b
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve;
THREE.EllipseCurve.prototype.getPoint = function(b) {
	var d = this.aEndAngle - this.aStartAngle;
	if (d < 0) {
		d += Math.PI * 2
	}
	if (d > Math.PI * 2) {
		d -= Math.PI * 2
	}
	var c;
	if (this.aClockwise === true) {
		c = this.aEndAngle + (1 - b) * (Math.PI * 2 - d)
	} else {
		c = this.aStartAngle + b * d
	}
	var a = new THREE.Vector2();
	a.x = this.aX + this.xRadius * Math.cos(c);
	a.y = this.aY + this.yRadius * Math.sin(c);
	return a
};
THREE.ArcCurve = function(e, d, f, c, b, a) {
	THREE.EllipseCurve.call(this, e, d, f, f, c, b, a)
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve;
THREE.LineCurve3 = THREE.Curve.create(function(b, a) {
	this.v1 = b;
	this.v2 = a
}, function(b) {
	var a = new THREE.Vector3();
	a.subVectors(this.v2, this.v1);
	a.multiplyScalar(b);
	a.add(this.v1);
	return a
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(a, c, b) {
	this.v0 = a;
	this.v1 = c;
	this.v2 = b
}, function(b) {
	var a = new THREE.Vector3();
	a.x = THREE.Shape.Utils.b2(b, this.v0.x, this.v1.x, this.v2.x);
	a.y = THREE.Shape.Utils.b2(b, this.v0.y, this.v1.y, this.v2.y);
	a.z = THREE.Shape.Utils.b2(b, this.v0.z, this.v1.z, this.v2.z);
	return a
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function(a, d, c, b) {
	this.v0 = a;
	this.v1 = d;
	this.v2 = c;
	this.v3 = b
}, function(b) {
	var a = new THREE.Vector3();
	a.x = THREE.Shape.Utils.b3(b, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
	a.y = THREE.Shape.Utils.b3(b, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
	a.z = THREE.Shape.Utils.b3(b, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
	return a
});
THREE.SplineCurve3 = THREE.Curve.create(function(a) {
	this.points = (a == undefined) ? [] : a
}, function(k) {
	var j = this.points;
	var h = (j.length - 1) * k;
	var a = Math.floor(h);
	var c = h - a;
	var g = j[a == 0 ? a : a - 1];
	var f = j[a];
	var e = j[a > j.length - 2 ? j.length - 1 : a + 1];
	var d = j[a > j.length - 3 ? j.length - 1 : a + 2];
	var b = new THREE.Vector3();
	b.x = THREE.Curve.Utils.interpolate(g.x, f.x, e.x, d.x, c);
	b.y = THREE.Curve.Utils.interpolate(g.y, f.y, e.y, d.y, c);
	b.z = THREE.Curve.Utils.interpolate(g.z, f.z, e.z, d.z, c);
	return b
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function(a) {
	this.points = (a == undefined) ? [] : a
}, function(k) {
	var j = this.points;
	var h = (j.length - 0) * k;
	var a = Math.floor(h);
	var c = h - a;
	a += a > 0 ? 0 : (Math.floor(Math.abs(a) / j.length) + 1) * j.length;
	var g = j[(a - 1) % j.length];
	var f = j[(a) % j.length];
	var e = j[(a + 1) % j.length];
	var d = j[(a + 2) % j.length];
	var b = new THREE.Vector3();
	b.x = THREE.Curve.Utils.interpolate(g.x, f.x, e.x, d.x, c);
	b.y = THREE.Curve.Utils.interpolate(g.y, f.y, e.y, d.y, c);
	b.z = THREE.Curve.Utils.interpolate(g.z, f.z, e.z, d.z, c);
	return b
});
THREE.AnimationHandler = {
	LINEAR: 0,
	CATMULLROM: 1,
	CATMULLROM_FORWARD: 2,
	add: function() {
		THREE.warn("THREE.AnimationHandler.add() has been deprecated.")
	},
	get: function() {
		THREE.warn("THREE.AnimationHandler.get() has been deprecated.")
	},
	remove: function() {
		THREE.warn("THREE.AnimationHandler.remove() has been deprecated.")
	},
	animations: [],
	init: function(g) {
		if (g.initialized === true) {
			return g
		}
		for (var c = 0; c < g.hierarchy.length; c++) {
			for (var b = 0; b < g.hierarchy[c].keys.length; b++) {
				if (g.hierarchy[c].keys[b].time < 0) {
					g.hierarchy[c].keys[b].time = 0
				}
				if (g.hierarchy[c].keys[b].rot !== undefined && !(g.hierarchy[c].keys[b].rot instanceof THREE.Quaternion)) {
					var f = g.hierarchy[c].keys[b].rot;
					g.hierarchy[c].keys[b].rot = new THREE.Quaternion().fromArray(f)
				}
			}
			if (g.hierarchy[c].keys.length && g.hierarchy[c].keys[0].morphTargets !== undefined) {
				var e = {};
				for (var b = 0; b < g.hierarchy[c].keys.length; b++) {
					for (var a = 0; a < g.hierarchy[c].keys[b].morphTargets.length; a++) {
						var j = g.hierarchy[c].keys[b].morphTargets[a];
						e[j] = -1
					}
				}
				g.hierarchy[c].usedMorphTargets = e;
				for (var b = 0; b < g.hierarchy[c].keys.length; b++) {
					var d = {};
					for (var j in e) {
						for (var a = 0; a < g.hierarchy[c].keys[b].morphTargets.length; a++) {
							if (g.hierarchy[c].keys[b].morphTargets[a] === j) {
								d[j] = g.hierarchy[c].keys[b].morphTargetsInfluences[a];
								break
							}
						}
						if (a === g.hierarchy[c].keys[b].morphTargets.length) {
							d[j] = 0
						}
					}
					g.hierarchy[c].keys[b].morphTargetsInfluences = d
				}
			}
			for (var b = 1; b < g.hierarchy[c].keys.length; b++) {
				if (g.hierarchy[c].keys[b].time === g.hierarchy[c].keys[b - 1].time) {
					g.hierarchy[c].keys.splice(b, 1);
					b--
				}
			}
			for (var b = 0; b < g.hierarchy[c].keys.length; b++) {
				g.hierarchy[c].keys[b].index = b
			}
		}
		g.initialized = true;
		return g
	},
	parse: function(c) {
		var e = function(b, f) {
			f.push(b);
			for (var g = 0; g < b.children.length; g++) {
				e(b.children[g], f)
			}
		};
		var d = [];
		if (c instanceof THREE.SkinnedMesh) {
			for (var a = 0; a < c.skeleton.bones.length; a++) {
				d.push(c.skeleton.bones[a])
			}
		} else {
			e(c, d)
		}
		return d
	},
	play: function(a) {
		if (this.animations.indexOf(a) === -1) {
			this.animations.push(a)
		}
	},
	stop: function(b) {
		var a = this.animations.indexOf(b);
		if (a !== -1) {
			this.animations.splice(a, 1)
		}
	},
	update: function(b) {
		for (var a = 0; a < this.animations.length; a++) {
			this.animations[a].resetBlendWeights()
		}
		for (var a = 0; a < this.animations.length; a++) {
			this.animations[a].update(b)
		}
	}
};
THREE.Animation = function(a, b) {
	this.root = a;
	this.data = THREE.AnimationHandler.init(b);
	this.hierarchy = THREE.AnimationHandler.parse(a);
	this.currentTime = 0;
	this.timeScale = 1;
	this.isPlaying = false;
	this.loop = true;
	this.weight = 0;
	this.interpolationType = THREE.AnimationHandler.LINEAR
};
THREE.Animation.prototype = {
	constructor: THREE.Animation,
	keyTypes: ["pos", "rot", "scl"],
	play: function(a, b) {
		this.currentTime = a !== undefined ? a : 0;
		this.weight = b !== undefined ? b : 1;
		this.isPlaying = true;
		this.reset();
		THREE.AnimationHandler.play(this)
	},
	stop: function() {
		this.isPlaying = false;
		THREE.AnimationHandler.stop(this)
	},
	reset: function() {
		for (var e = 0, c = this.hierarchy.length; e < c; e++) {
			var d = this.hierarchy[e];
			if (d.animationCache === undefined) {
				d.animationCache = {
					animations: {},
					blending: {
						positionWeight: 0,
						quaternionWeight: 0,
						scaleWeight: 0
					}
				}
			}
			var a = this.data.name;
			var j = d.animationCache.animations;
			var b = j[a];
			if (b === undefined) {
				b = {
					prevKey: {
						pos: 0,
						rot: 0,
						scl: 0
					},
					nextKey: {
						pos: 0,
						rot: 0,
						scl: 0
					},
					originalMatrix: d.matrix
				};
				j[a] = b
			}
			for (var k = 0; k < 3; k++) {
				var f = this.keyTypes[k];
				var l = this.data.hierarchy[e].keys[0];
				var g = this.getNextKeyWith(f, e, 1);
				while (g.time < this.currentTime && g.index > l.index) {
					l = g;
					g = this.getNextKeyWith(f, e, g.index + 1)
				}
				b.prevKey[f] = l;
				b.nextKey[f] = g
			}
		}
	},
	resetBlendWeights: function() {
		for (var e = 0, a = this.hierarchy.length; e < a; e++) {
			var c = this.hierarchy[e];
			var b = c.animationCache;
			if (b !== undefined) {
				var d = b.blending;
				d.positionWeight = 0;
				d.quaternionWeight = 0;
				d.scaleWeight = 0
			}
		}
	},
	update: (function() {
		var d = [];
		var f = new THREE.Vector3();
		var a = new THREE.Vector3();
		var c = new THREE.Quaternion();
		var e = function(u, h) {
			var n = [],
				p = [],
				t, g, l, k, j, r, q, o, m;
			t = (u.length - 1) * h;
			g = Math.floor(t);
			l = t - g;
			n[0] = g === 0 ? g : g - 1;
			n[1] = g;
			n[2] = g > u.length - 2 ? g : g + 1;
			n[3] = g > u.length - 3 ? g : g + 2;
			r = u[n[0]];
			q = u[n[1]];
			o = u[n[2]];
			m = u[n[3]];
			k = l * l;
			j = l * k;
			p[0] = b(r[0], q[0], o[0], m[0], l, k, j);
			p[1] = b(r[1], q[1], o[1], m[1], l, k, j);
			p[2] = b(r[2], q[2], o[2], m[2], l, k, j);
			return p
		};
		var b = function(o, n, l, k, p, h, g) {
			var m = (l - o) * 0.5,
				j = (k - n) * 0.5;
			return (2 * (n - l) + m + j) * g + (-3 * (n - l) - 2 * m - j) * h + m * p + n
		};
		return function(C) {
			if (this.isPlaying === false) {
				return
			}
			this.currentTime += C * this.timeScale;
			if (this.weight === 0) {
				return
			}
			var g = this.data.length;
			if (this.currentTime > g || this.currentTime < 0) {
				if (this.loop) {
					this.currentTime %= g;
					if (this.currentTime < 0) {
						this.currentTime += g
					}
					this.reset()
				} else {
					this.stop()
				}
			}
			for (var A = 0, k = this.hierarchy.length; A < k; A++) {
				var F = this.hierarchy[A];
				var r = F.animationCache.animations[this.data.name];
				var o = F.animationCache.blending;
				for (var q = 0; q < 3; q++) {
					var m = this.keyTypes[q];
					var E = r.prevKey[m];
					var n = r.nextKey[m];
					if ((this.timeScale > 0 && n.time <= this.currentTime) || (this.timeScale < 0 && E.time >= this.currentTime)) {
						E = this.data.hierarchy[A].keys[0];
						n = this.getNextKeyWith(m, A, 1);
						while (n.time < this.currentTime && n.index > E.index) {
							E = n;
							n = this.getNextKeyWith(m, A, n.index + 1)
						}
						r.prevKey[m] = E;
						r.nextKey[m] = n
					}
					var G = (this.currentTime - E.time) / (n.time - E.time);
					var u = E[m];
					var l = n[m];
					if (G < 0) {
						G = 0
					}
					if (G > 1) {
						G = 1
					}
					if (m === "pos") {
						if (this.interpolationType === THREE.AnimationHandler.LINEAR) {
							a.x = u[0] + (l[0] - u[0]) * G;
							a.y = u[1] + (l[1] - u[1]) * G;
							a.z = u[2] + (l[2] - u[2]) * G;
							var v = this.weight / (this.weight + o.positionWeight);
							F.position.lerp(a, v);
							o.positionWeight += this.weight
						} else {
							if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
								d[0] = this.getPrevKeyWith("pos", A, E.index - 1)["pos"];
								d[1] = u;
								d[2] = l;
								d[3] = this.getNextKeyWith("pos", A, n.index + 1)["pos"];
								G = G * 0.33 + 0.33;
								var p = e(d, G);
								var v = this.weight / (this.weight + o.positionWeight);
								o.positionWeight += this.weight;
								var j = F.position;
								j.x = j.x + (p[0] - j.x) * v;
								j.y = j.y + (p[1] - j.y) * v;
								j.z = j.z + (p[2] - j.z) * v;
								if (this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
									var D = e(d, G * 1.01);
									f.set(D[0], D[1], D[2]);
									f.sub(j);
									f.y = 0;
									f.normalize();
									var B = Math.atan2(f.x, f.z);
									F.rotation.set(0, B, 0)
								}
							}
						}
					} else {
						if (m === "rot") {
							THREE.Quaternion.slerp(u, l, c, G);
							if (o.quaternionWeight === 0) {
								F.quaternion.copy(c);
								o.quaternionWeight = this.weight
							} else {
								var v = this.weight / (this.weight + o.quaternionWeight);
								THREE.Quaternion.slerp(F.quaternion, c, F.quaternion, v);
								o.quaternionWeight += this.weight
							}
						} else {
							if (m === "scl") {
								a.x = u[0] + (l[0] - u[0]) * G;
								a.y = u[1] + (l[1] - u[1]) * G;
								a.z = u[2] + (l[2] - u[2]) * G;
								var v = this.weight / (this.weight + o.scaleWeight);
								F.scale.lerp(a, v);
								o.scaleWeight += this.weight
							}
						}
					}
				}
			}
			return true
		}
	})(),
	getNextKeyWith: function(c, b, a) {
		var d = this.data.hierarchy[b].keys;
		if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
			a = a < d.length - 1 ? a : d.length - 1
		} else {
			a = a % d.length
		}
		for (; a < d.length; a++) {
			if (d[a][c] !== undefined) {
				return d[a]
			}
		}
		return this.data.hierarchy[b].keys[0]
	},
	getPrevKeyWith: function(c, b, a) {
		var d = this.data.hierarchy[b].keys;
		if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
			a = a > 0 ? a : 0
		} else {
			a = a >= 0 ? a : a + d.length
		}
		for (; a >= 0; a--) {
			if (d[a][c] !== undefined) {
				return d[a]
			}
		}
		return this.data.hierarchy[b].keys[d.length - 1]
	}
};
THREE.KeyFrameAnimation = function(e) {
	this.root = e.node;
	this.data = THREE.AnimationHandler.init(e);
	this.hierarchy = THREE.AnimationHandler.parse(this.root);
	this.currentTime = 0;
	this.timeScale = 0.001;
	this.isPlaying = false;
	this.isPaused = true;
	this.loop = true;
	for (var g = 0, c = this.hierarchy.length; g < c; g++) {
		var j = this.data.hierarchy[g].keys,
			a = this.data.hierarchy[g].sids,
			d = this.hierarchy[g];
		if (j.length && a) {
			for (var k = 0; k < a.length; k++) {
				var b = a[k],
					f = this.getNextKeyWith(b, g, 0);
				if (f) {
					f.apply(b)
				}
			}
			d.matrixAutoUpdate = false;
			this.data.hierarchy[g].node.updateMatrix();
			d.matrixWorldNeedsUpdate = true
		}
	}
};
THREE.KeyFrameAnimation.prototype = {
	constructor: THREE.KeyFrameAnimation,
	play: function(d) {
		this.currentTime = d !== undefined ? d : 0;
		if (this.isPlaying === false) {
			this.isPlaying = true;
			var c, a = this.hierarchy.length,
				b, f;
			for (c = 0; c < a; c++) {
				b = this.hierarchy[c];
				f = this.data.hierarchy[c];
				if (f.animationCache === undefined) {
					f.animationCache = {};
					f.animationCache.prevKey = null;
					f.animationCache.nextKey = null;
					f.animationCache.originalMatrix = b.matrix
				}
				var e = this.data.hierarchy[c].keys;
				if (e.length) {
					f.animationCache.prevKey = e[0];
					f.animationCache.nextKey = e[1];
					this.startTime = Math.min(e[0].time, this.startTime);
					this.endTime = Math.max(e[e.length - 1].time, this.endTime)
				}
			}
			this.update(0)
		}
		this.isPaused = false;
		THREE.AnimationHandler.play(this)
	},
	stop: function() {
		this.isPlaying = false;
		this.isPaused = false;
		THREE.AnimationHandler.stop(this);
		for (var b = 0; b < this.data.hierarchy.length; b++) {
			var d = this.hierarchy[b];
			var c = this.data.hierarchy[b];
			if (c.animationCache !== undefined) {
				var a = c.animationCache.originalMatrix;
				a.copy(d.matrix);
				d.matrix = a;
				delete c.animationCache
			}
		}
	},
	update: function(j) {
		if (this.isPlaying === false) {
			return
		}
		this.currentTime += j * this.timeScale;
		var d = this.data.length;
		if (this.loop === true && this.currentTime > d) {
			this.currentTime %= d
		}
		this.currentTime = Math.min(this.currentTime, d);
		for (var f = 0, b = this.hierarchy.length; f < b; f++) {
			var e = this.hierarchy[f];
			var c = this.data.hierarchy[f];
			var k = c.keys,
				a = c.animationCache;
			if (k.length) {
				var l = a.prevKey;
				var g = a.nextKey;
				if (g.time <= this.currentTime) {
					while (g.time < this.currentTime && g.index > l.index) {
						l = g;
						g = k[l.index + 1]
					}
					a.prevKey = l;
					a.nextKey = g
				}
				if (g.time >= this.currentTime) {
					l.interpolate(g, this.currentTime)
				} else {
					l.interpolate(g, g.time)
				}
				this.data.hierarchy[f].node.updateMatrix();
				e.matrixWorldNeedsUpdate = true
			}
		}
	},
	getNextKeyWith: function(a, c, b) {
		var d = this.data.hierarchy[c].keys;
		b = b % d.length;
		for (; b < d.length; b++) {
			if (d[b].hasTarget(a)) {
				return d[b]
			}
		}
		return d[0]
	},
	getPrevKeyWith: function(a, c, b) {
		var d = this.data.hierarchy[c].keys;
		b = b >= 0 ? b : b + d.length;
		for (; b >= 0; b--) {
			if (d[b].hasTarget(a)) {
				return d[b]
			}
		}
		return d[d.length - 1]
	}
};
THREE.MorphAnimation = function(a) {
	this.mesh = a;
	this.frames = a.morphTargetInfluences.length;
	this.currentTime = 0;
	this.duration = 1000;
	this.loop = true;
	this.lastFrame = 0;
	this.currentFrame = 0;
	this.isPlaying = false
};
THREE.MorphAnimation.prototype = {
	constructor: THREE.MorphAnimation,
	play: function() {
		this.isPlaying = true
	},
	pause: function() {
		this.isPlaying = false
	},
	update: function(d) {
		if (this.isPlaying === false) {
			return
		}
		this.currentTime += d;
		if (this.loop === true && this.currentTime > this.duration) {
			this.currentTime %= this.duration
		}
		this.currentTime = Math.min(this.currentTime, this.duration);
		var a = this.duration / this.frames;
		var c = Math.floor(this.currentTime / a);
		var b = this.mesh.morphTargetInfluences;
		if (c != this.currentFrame) {
			b[this.lastFrame] = 0;
			b[this.currentFrame] = 1;
			b[c] = 0;
			this.lastFrame = this.currentFrame;
			this.currentFrame = c
		}
		b[c] = (this.currentTime % a) / a;
		b[this.lastFrame] = 1 - b[c]
	}
};
THREE.BoxGeometry = function(a, j, e, b, h, d) {
	THREE.Geometry.call(this);
	this.type = "BoxGeometry";
	this.parameters = {
		width: a,
		height: j,
		depth: e,
		widthSegments: b,
		heightSegments: h,
		depthSegments: d
	};
	this.widthSegments = b || 1;
	this.heightSegments = h || 1;
	this.depthSegments = d || 1;
	var l = this;
	var k = a / 2;
	var g = j / 2;
	var c = e / 2;
	f("z", "y", -1, -1, e, j, k, 0);
	f("z", "y", 1, -1, e, j, -k, 1);
	f("x", "z", 1, 1, a, e, g, 2);
	f("x", "z", 1, -1, a, e, -g, 3);
	f("x", "y", 1, -1, a, j, c, 4);
	f("x", "y", -1, -1, a, j, -c, 5);

	function f(G, F, m, A, I, H, X, C) {
		var E, r, q, M = l.widthSegments,
			K = l.heightSegments,
			t = I / 2,
			p = H / 2,
			B = l.vertices.length;
		if ((G === "x" && F === "y") || (G === "y" && F === "x")) {
			E = "z"
		} else {
			if ((G === "x" && F === "z") || (G === "z" && F === "x")) {
				E = "y";
				K = l.depthSegments
			} else {
				if ((G === "z" && F === "y") || (G === "y" && F === "z")) {
					E = "x";
					M = l.depthSegments
				}
			}
		}
		var O = M + 1,
			o = K + 1,
			W = I / M,
			R = H / K,
			V = new THREE.Vector3();
		V[E] = X > 0 ? 1 : -1;
		for (q = 0; q < o; q++) {
			for (r = 0; r < O; r++) {
				var n = new THREE.Vector3();
				n[G] = (r * W - t) * m;
				n[F] = (q * R - p) * A;
				n[E] = X;
				l.vertices.push(n)
			}
		}
		for (q = 0; q < K; q++) {
			for (r = 0; r < M; r++) {
				var U = r + O * q;
				var T = r + O * (q + 1);
				var S = (r + 1) + O * (q + 1);
				var Q = (r + 1) + O * q;
				var P = new THREE.Vector2(r / M, 1 - q / K);
				var N = new THREE.Vector2(r / M, 1 - (q + 1) / K);
				var L = new THREE.Vector2((r + 1) / M, 1 - (q + 1) / K);
				var J = new THREE.Vector2((r + 1) / M, 1 - q / K);
				var D = new THREE.Face3(U + B, T + B, Q + B);
				D.normal.copy(V);
				D.vertexNormals.push(V.clone(), V.clone(), V.clone());
				D.materialIndex = C;
				l.faces.push(D);
				l.faceVertexUvs[0].push([P, N, J]);
				D = new THREE.Face3(T + B, S + B, Q + B);
				D.normal.copy(V);
				D.vertexNormals.push(V.clone(), V.clone(), V.clone());
				D.materialIndex = C;
				l.faces.push(D);
				l.faceVertexUvs[0].push([N.clone(), L, J.clone()])
			}
		}
	}
	this.mergeVertices()
};
THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry;
THREE.CircleGeometry = function(k, g, d, b) {
	THREE.Geometry.call(this);
	this.type = "CircleGeometry";
	this.parameters = {
		radius: k,
		segments: g,
		thetaStart: d,
		thetaLength: b
	};
	k = k || 50;
	g = g !== undefined ? Math.max(3, g) : 8;
	d = d !== undefined ? d : 0;
	b = b !== undefined ? b : Math.PI * 2;
	var f, e = [],
		a = new THREE.Vector3(),
		l = new THREE.Vector2(0.5, 0.5);
	this.vertices.push(a);
	e.push(l);
	for (f = 0; f <= g; f++) {
		var j = new THREE.Vector3();
		var h = d + f / g * b;
		j.x = k * Math.cos(h);
		j.y = k * Math.sin(h);
		this.vertices.push(j);
		e.push(new THREE.Vector2((j.x / k + 1) / 2, (j.y / k + 1) / 2))
	}
	var c = new THREE.Vector3(0, 0, 1);
	for (f = 1; f <= g; f++) {
		this.faces.push(new THREE.Face3(f, f + 1, 0, [c.clone(), c.clone(), c.clone()]));
		this.faceVertexUvs[0].push([e[f].clone(), e[f + 1].clone(), l.clone()])
	}
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), k)
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry.prototype.constructor = THREE.CircleGeometry;
THREE.CubeGeometry = function(c, a, f, e, d, b) {
	THREE.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry.");
	return new THREE.BoxGeometry(c, a, f, e, d, b)
};
THREE.CylinderGeometry = function(m, P, E, e, C, M, g, F) {
	THREE.Geometry.call(this);
	this.type = "CylinderGeometry";
	this.parameters = {
		radiusTop: m,
		radiusBottom: P,
		height: E,
		radialSegments: e,
		heightSegments: C,
		openEnded: M,
		thetaStart: g,
		thetaLength: F
	};
	m = m !== undefined ? m : 20;
	P = P !== undefined ? P : 20;
	E = E !== undefined ? E : 100;
	e = e || 8;
	C = C || 1;
	M = M !== undefined ? M : false;
	g = g !== undefined ? g : 0;
	F = F !== undefined ? F : 2 * Math.PI;
	var G = E / 2;
	var r, q, h = [],
		t = [];
	for (q = 0; q <= C; q++) {
		var D = [];
		var O = [];
		var A = q / C;
		var f = A * (P - m) + m;
		for (r = 0; r <= e; r++) {
			var B = r / e;
			var K = new THREE.Vector3();
			K.x = f * Math.sin(B * F + g);
			K.y = -A * E + G;
			K.z = f * Math.cos(B * F + g);
			this.vertices.push(K);
			D.push(this.vertices.length - 1);
			O.push(new THREE.Vector2(B, 1 - A))
		}
		h.push(D);
		t.push(O)
	}
	var I = (P - m) / E;
	var o, l;
	for (r = 0; r < e; r++) {
		if (m !== 0) {
			o = this.vertices[h[0][r]].clone();
			l = this.vertices[h[0][r + 1]].clone()
		} else {
			o = this.vertices[h[1][r]].clone();
			l = this.vertices[h[1][r + 1]].clone()
		}
		o.setY(Math.sqrt(o.x * o.x + o.z * o.z) * I).normalize();
		l.setY(Math.sqrt(l.x * l.x + l.z * l.z) * I).normalize();
		for (q = 0; q < C; q++) {
			var d = h[q][r];
			var c = h[q + 1][r];
			var b = h[q + 1][r + 1];
			var a = h[q][r + 1];
			var p = o.clone();
			var n = o.clone();
			var k = l.clone();
			var j = l.clone();
			var N = t[q][r].clone();
			var L = t[q + 1][r].clone();
			var J = t[q + 1][r + 1].clone();
			var H = t[q][r + 1].clone();
			this.faces.push(new THREE.Face3(d, c, a, [p, n, j]));
			this.faceVertexUvs[0].push([N, L, H]);
			this.faces.push(new THREE.Face3(c, b, a, [n.clone(), k, j.clone()]));
			this.faceVertexUvs[0].push([L.clone(), J, H.clone()])
		}
	}
	if (M === false && m > 0) {
		this.vertices.push(new THREE.Vector3(0, G, 0));
		for (r = 0; r < e; r++) {
			var d = h[0][r];
			var c = h[0][r + 1];
			var b = this.vertices.length - 1;
			var p = new THREE.Vector3(0, 1, 0);
			var n = new THREE.Vector3(0, 1, 0);
			var k = new THREE.Vector3(0, 1, 0);
			var N = t[0][r].clone();
			var L = t[0][r + 1].clone();
			var J = new THREE.Vector2(L.x, 0);
			this.faces.push(new THREE.Face3(d, c, b, [p, n, k]));
			this.faceVertexUvs[0].push([N, L, J])
		}
	}
	if (M === false && P > 0) {
		this.vertices.push(new THREE.Vector3(0, -G, 0));
		for (r = 0; r < e; r++) {
			var d = h[C][r + 1];
			var c = h[C][r];
			var b = this.vertices.length - 1;
			var p = new THREE.Vector3(0, -1, 0);
			var n = new THREE.Vector3(0, -1, 0);
			var k = new THREE.Vector3(0, -1, 0);
			var N = t[C][r + 1].clone();
			var L = t[C][r].clone();
			var J = new THREE.Vector2(L.x, 1);
			this.faces.push(new THREE.Face3(d, c, b, [p, n, k]));
			this.faceVertexUvs[0].push([N, L, J])
		}
	}
	this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;
THREE.ExtrudeGeometry = function(a, b) {
	if (typeof(a) === "undefined") {
		a = [];
		return
	}
	THREE.Geometry.call(this);
	this.type = "ExtrudeGeometry";
	a = a instanceof Array ? a : [a];
	this.addShapeList(a, b);
	this.computeFaceNormals()
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;
THREE.ExtrudeGeometry.prototype.addShapeList = function(b, d) {
	var a = b.length;
	for (var e = 0; e < a; e++) {
		var c = b[e];
		this.addShape(c, d)
	}
};
THREE.ExtrudeGeometry.prototype.addShape = function(E, J) {
	var f = J.amount !== undefined ? J.amount : 100;
	var e = J.bevelThickness !== undefined ? J.bevelThickness : 6;
	var K = J.bevelSize !== undefined ? J.bevelSize : e - 2;
	var B = J.bevelSegments !== undefined ? J.bevelSegments : 3;
	var a = J.bevelEnabled !== undefined ? J.bevelEnabled : true;
	var I = J.curveSegments !== undefined ? J.curveSegments : 12;
	var Q = J.steps !== undefined ? J.steps : 1;
	var q = J.extrudePath;
	var O, r = false;
	var ad = J.material;
	var n = J.extrudeMaterial;
	var D = J.UVGenerator !== undefined ? J.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;
	var A, S, W, al;
	if (q) {
		O = q.getSpacedPoints(Q);
		r = true;
		a = false;
		A = J.frames !== undefined ? J.frames : new THREE.TubeGeometry.FrenetFrames(q, Q, false);
		S = new THREE.Vector3();
		W = new THREE.Vector3();
		al = new THREE.Vector3()
	}
	if (!a) {
		B = 0;
		e = 0;
		K = 0
	}
	var ao, aj, ak;
	var R = this;
	var P = this.vertices.length;
	var C = E.extractPoints(I);
	var c = C.shape;
	var G = C.holes;
	var Z = !THREE.Shape.Utils.isClockWise(c);
	if (Z) {
		c = c.reverse();
		for (aj = 0, ak = G.length; aj < ak; aj++) {
			ao = G[aj];
			if (THREE.Shape.Utils.isClockWise(ao)) {
				G[aj] = ao.reverse()
			}
		}
		Z = false
	}
	var p = THREE.Shape.Utils.triangulateShape(c, G);
	var ac = c;
	for (aj = 0, ak = G.length; aj < ak; aj++) {
		ao = G[aj];
		c = c.concat(ao)
	}

	function L(j, h, b) {
		if (!h) {
			THREE.error("THREE.ExtrudeGeometry: vec does not exist")
		}
		return h.clone().multiplyScalar(b).add(j)
	}
	var an, aa, X, T, u, ab = c.length,
		o, m = p.length;

	function F(k, au, av) {
		var aw = 1e-10;
		var aB, az, aC = 1;
		var at = k.x - au.x,
			ar = k.y - au.y;
		var aE = av.x - k.x,
			aD = av.y - k.y;
		var aq = (at * at + ar * ar);
		var aA = (at * aD - ar * aE);
		if (Math.abs(aA) > aw) {
			var ax = Math.sqrt(aq);
			var b = Math.sqrt(aE * aE + aD * aD);
			var ap = (au.x - ar / ax);
			var v = (au.y + at / ax);
			var j = (av.x - aD / b);
			var h = (av.y + aE / b);
			var aF = ((j - ap) * aD - (h - v) * aE) / (at * aD - ar * aE);
			aB = (ap + at * aF - k.x);
			az = (v + ar * aF - k.y);
			var ay = (aB * aB + az * az);
			if (ay <= 2) {
				return new THREE.Vector2(aB, az)
			} else {
				aC = Math.sqrt(ay / 2)
			}
		} else {
			var t = false;
			if (at > aw) {
				if (aE > aw) {
					t = true
				}
			} else {
				if (at < -aw) {
					if (aE < -aw) {
						t = true
					}
				} else {
					if (Math.sign(ar) == Math.sign(aD)) {
						t = true
					}
				}
			}
			if (t) {
				aB = -ar;
				az = at;
				aC = Math.sqrt(aq)
			} else {
				aB = at;
				az = ar;
				aC = Math.sqrt(aq / 2)
			}
		}
		return new THREE.Vector2(aB / aC, az / aC)
	}
	var ag = [];
	for (var ai = 0, N = ac.length, af = N - 1, ae = ai + 1; ai < N; ai++, af++, ae++) {
		if (af === N) {
			af = 0
		}
		if (ae === N) {
			ae = 0
		}
		ag[ai] = F(ac[ai], ac[af], ac[ae])
	}
	var M = [],
		V, d = ag.concat();
	for (aj = 0, ak = G.length; aj < ak; aj++) {
		ao = G[aj];
		V = [];
		for (ai = 0, N = ao.length, af = N - 1, ae = ai + 1; ai < N; ai++, af++, ae++) {
			if (af === N) {
				af = 0
			}
			if (ae === N) {
				ae = 0
			}
			V[ai] = F(ao[ai], ao[af], ao[ae])
		}
		M.push(V);
		d = d.concat(V)
	}
	for (an = 0; an < B; an++) {
		X = an / B;
		T = e * (1 - X);
		aa = K * (Math.sin(X * Math.PI / 2));
		for (ai = 0, N = ac.length; ai < N; ai++) {
			u = L(ac[ai], ag[ai], aa);
			U(u.x, u.y, -T)
		}
		for (aj = 0, ak = G.length; aj < ak; aj++) {
			ao = G[aj];
			V = M[aj];
			for (ai = 0, N = ao.length; ai < N; ai++) {
				u = L(ao[ai], V[ai], aa);
				U(u.x, u.y, -T)
			}
		}
	}
	aa = K;
	for (ai = 0; ai < ab; ai++) {
		u = a ? L(c[ai], d[ai], aa) : c[ai];
		if (!r) {
			U(u.x, u.y, 0)
		} else {
			W.copy(A.normals[0]).multiplyScalar(u.x);
			S.copy(A.binormals[0]).multiplyScalar(u.y);
			al.copy(O[0]).add(W).add(S);
			U(al.x, al.y, al.z)
		}
	}
	var Y;
	for (Y = 1; Y <= Q; Y++) {
		for (ai = 0; ai < ab; ai++) {
			u = a ? L(c[ai], d[ai], aa) : c[ai];
			if (!r) {
				U(u.x, u.y, f / Q * Y)
			} else {
				W.copy(A.normals[Y]).multiplyScalar(u.x);
				S.copy(A.binormals[Y]).multiplyScalar(u.y);
				al.copy(O[Y]).add(W).add(S);
				U(al.x, al.y, al.z)
			}
		}
	}
	for (an = B - 1; an >= 0; an--) {
		X = an / B;
		T = e * (1 - X);
		aa = K * Math.sin(X * Math.PI / 2);
		for (ai = 0, N = ac.length; ai < N; ai++) {
			u = L(ac[ai], ag[ai], aa);
			U(u.x, u.y, f + T)
		}
		for (aj = 0, ak = G.length; aj < ak; aj++) {
			ao = G[aj];
			V = M[aj];
			for (ai = 0, N = ao.length; ai < N; ai++) {
				u = L(ao[ai], V[ai], aa);
				if (!r) {
					U(u.x, u.y, f + T)
				} else {
					U(u.x, u.y + O[Q - 1].y, O[Q - 1].x + T)
				}
			}
		}
	}
	H();
	am();

	function H() {
		if (a) {
			var b = 0;
			var h = ab * b;
			for (ai = 0; ai < m; ai++) {
				o = p[ai];
				l(o[2] + h, o[1] + h, o[0] + h)
			}
			b = Q + B * 2;
			h = ab * b;
			for (ai = 0; ai < m; ai++) {
				o = p[ai];
				l(o[0] + h, o[1] + h, o[2] + h)
			}
		} else {
			for (ai = 0; ai < m; ai++) {
				o = p[ai];
				l(o[2], o[1], o[0])
			}
			for (ai = 0; ai < m; ai++) {
				o = p[ai];
				l(o[0] + ab * Q, o[1] + ab * Q, o[2] + ab * Q)
			}
		}
	}

	function am() {
		var b = 0;
		ah(ac, b);
		b += ac.length;
		for (aj = 0, ak = G.length; aj < ak; aj++) {
			ao = G[aj];
			ah(ao, b);
			b += ao.length
		}
	}

	function ah(at, h) {
		var aq, ap;
		ai = at.length;
		while (--ai >= 0) {
			aq = ai;
			ap = ai - 1;
			if (ap < 0) {
				ap = at.length - 1
			}
			var ay = 0,
				t = Q + B * 2;
			for (ay = 0; ay < t; ay++) {
				var ar = ab * ay;
				var v = ab * (ay + 1);
				var ax = h + aq + ar,
					aw = h + ap + ar,
					av = h + ap + v,
					au = h + aq + v;
				g(ax, aw, av, au, at, ay, t, aq, ap)
			}
		}
	}

	function U(b, j, h) {
		R.vertices.push(new THREE.Vector3(b, j, h))
	}

	function l(j, h, t) {
		j += P;
		h += P;
		t += P;
		R.faces.push(new THREE.Face3(j, h, t, null, null, ad));
		var k = D.generateTopUV(R, j, h, t);
		R.faceVertexUvs[0].push(k)
	}

	function g(at, ar, ap, v, h, k, au, aq, t) {
		at += P;
		ar += P;
		ap += P;
		v += P;
		R.faces.push(new THREE.Face3(at, ar, v, null, null, n));
		R.faces.push(new THREE.Face3(ar, ap, v, null, null, n));
		var j = D.generateSideWallUV(R, at, ar, ap, v);
		R.faceVertexUvs[0].push([j[0], j[1], j[3]]);
		R.faceVertexUvs[0].push([j[1], j[2], j[3]])
	}
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
	generateTopUV: function(k, j, h, g) {
		var f = k.vertices;
		var e = f[j];
		var d = f[h];
		var l = f[g];
		return [new THREE.Vector2(e.x, e.y), new THREE.Vector2(d.x, d.y), new THREE.Vector2(l.x, l.y)]
	},
	generateSideWallUV: function(h, o, n, m, l) {
		var e = h.vertices;
		var k = e[o];
		var j = e[n];
		var g = e[m];
		var f = e[l];
		if (Math.abs(k.y - j.y) < 0.01) {
			return [new THREE.Vector2(k.x, 1 - k.z), new THREE.Vector2(j.x, 1 - j.z), new THREE.Vector2(g.x, 1 - g.z), new THREE.Vector2(f.x, 1 - f.z)]
		} else {
			return [new THREE.Vector2(k.y, 1 - k.z), new THREE.Vector2(j.y, 1 - j.z), new THREE.Vector2(g.y, 1 - g.z), new THREE.Vector2(f.y, 1 - f.z)]
		}
	}
};
THREE.ShapeGeometry = function(a, b) {
	THREE.Geometry.call(this);
	this.type = "ShapeGeometry";
	if (a instanceof Array === false) {
		a = [a]
	}
	this.addShapeList(a, b);
	this.computeFaceNormals()
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.constructor = THREE.ShapeGeometry;
THREE.ShapeGeometry.prototype.addShapeList = function(b, c) {
	for (var d = 0, a = b.length; d < a; d++) {
		this.addShape(b[d], c)
	}
	return this
};
THREE.ShapeGeometry.prototype.addShape = function(e, g) {
	if (g === undefined) {
		g = {}
	}
	var d = g.curveSegments !== undefined ? g.curveSegments : 12;
	var p = g.material;
	var v = g.UVGenerator === undefined ? THREE.ExtrudeGeometry.WorldUVGenerator : g.UVGenerator;
	var u, t, q;
	var o = this.vertices.length;
	var B = e.extractPoints(d);
	var h = B.shape;
	var k = B.holes;
	var n = !THREE.Shape.Utils.isClockWise(h);
	if (n) {
		h = h.reverse();
		for (u = 0, t = k.length; u < t; u++) {
			q = k[u];
			if (THREE.Shape.Utils.isClockWise(q)) {
				k[u] = q.reverse()
			}
		}
		n = false
	}
	var f = THREE.Shape.Utils.triangulateShape(h, k);
	var r = h;
	for (u = 0, t = k.length; u < t; u++) {
		q = k[u];
		h = h.concat(q)
	}
	var A, j = h.length;
	var m, F = f.length;
	for (u = 0; u < j; u++) {
		A = h[u];
		this.vertices.push(new THREE.Vector3(A.x, A.y, 0))
	}
	for (u = 0; u < F; u++) {
		m = f[u];
		var E = m[0] + o;
		var D = m[1] + o;
		var C = m[2] + o;
		this.faces.push(new THREE.Face3(E, D, C, null, null, p));
		this.faceVertexUvs[0].push(v.generateTopUV(this, E, D, C))
	}
};
THREE.LatheGeometry = function(t, q, n, p) {
	THREE.Geometry.call(this);
	this.type = "LatheGeometry";
	this.parameters = {
		points: t,
		segments: q,
		phiStart: n,
		phiLength: p
	};
	q = q || 12;
	n = n || 0;
	p = p || 2 * Math.PI;
	var E = 1 / (t.length - 1);
	var D = 1 / q;
	for (var u = 0, l = q; u <= l; u++) {
		var g = n + u * D * p;
		var G = Math.cos(g),
			m = Math.sin(g);
		for (var r = 0, A = t.length; r < A; r++) {
			var o = t[r];
			var C = new THREE.Vector3();
			C.x = G * o.x - m * o.y;
			C.y = m * o.x + G * o.y;
			C.z = o.z;
			this.vertices.push(C)
		}
	}
	var e = t.length;
	for (var u = 0, l = q; u < l; u++) {
		for (var r = 0, A = t.length - 1; r < A; r++) {
			var k = r + e * u;
			var I = k;
			var H = k + e;
			var G = k + 1 + e;
			var F = k + 1;
			var B = u * D;
			var h = r * E;
			var v = B + D;
			var f = h + E;
			this.faces.push(new THREE.Face3(I, H, F));
			this.faceVertexUvs[0].push([new THREE.Vector2(B, h), new THREE.Vector2(v, h), new THREE.Vector2(B, f)]);
			this.faces.push(new THREE.Face3(H, G, F));
			this.faceVertexUvs[0].push([new THREE.Vector2(v, h), new THREE.Vector2(v, f), new THREE.Vector2(B, f)])
		}
	}
	this.mergeVertices();
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry;
THREE.PlaneGeometry = function(b, a, d, c) {
	console.info("THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint.");
	THREE.Geometry.call(this);
	this.type = "PlaneGeometry";
	this.parameters = {
		width: b,
		height: a,
		widthSegments: d,
		heightSegments: c
	};
	this.fromBufferGeometry(new THREE.PlaneBufferGeometry(b, a, d, c))
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;
THREE.PlaneBufferGeometry = function(v, t, f, r) {
	THREE.BufferGeometry.call(this);
	this.type = "PlaneBufferGeometry";
	this.parameters = {
		width: v,
		height: t,
		widthSegments: f,
		heightSegments: r
	};
	var k = v / 2;
	var h = t / 2;
	var C = f || 1;
	var B = r || 1;
	var D = C + 1;
	var e = B + 1;
	var J = v / C;
	var F = t / B;
	var n = new Float32Array(D * e * 3);
	var u = new Float32Array(D * e * 3);
	var q = new Float32Array(D * e * 2);
	var m = 0;
	var A = 0;
	for (var g = 0; g < e; g++) {
		var o = g * F - h;
		for (var j = 0; j < D; j++) {
			var p = j * J - k;
			n[m] = p;
			n[m + 1] = -o;
			u[m + 2] = 1;
			q[A] = j / C;
			q[A + 1] = 1 - (g / B);
			m += 3;
			A += 2
		}
	}
	m = 0;
	var l = new((n.length / 3) > 65535 ? Uint32Array : Uint16Array)(C * B * 6);
	for (var g = 0; g < B; g++) {
		for (var j = 0; j < C; j++) {
			var I = j + D * g;
			var H = j + D * (g + 1);
			var G = (j + 1) + D * (g + 1);
			var E = (j + 1) + D * g;
			l[m] = I;
			l[m + 1] = H;
			l[m + 2] = E;
			l[m + 3] = H;
			l[m + 4] = G;
			l[m + 5] = E;
			m += 6
		}
	}
	this.addAttribute("index", new THREE.BufferAttribute(l, 1));
	this.addAttribute("position", new THREE.BufferAttribute(n, 3));
	this.addAttribute("normal", new THREE.BufferAttribute(u, 3));
	this.addAttribute("uv", new THREE.BufferAttribute(q, 2))
};
THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry;
THREE.RingGeometry = function(k, r, g, t, h, p) {
	THREE.Geometry.call(this);
	this.type = "RingGeometry";
	this.parameters = {
		innerRadius: k,
		outerRadius: r,
		thetaSegments: g,
		phiSegments: t,
		thetaStart: h,
		thetaLength: p
	};
	k = k || 0;
	r = r || 50;
	h = h !== undefined ? h : 0;
	p = p !== undefined ? p : Math.PI * 2;
	g = g !== undefined ? Math.max(3, g) : 8;
	t = t !== undefined ? Math.max(1, t) : 8;
	var u, m, l = [],
		f = k,
		j = ((r - k) / t);
	for (u = 0; u < t + 1; u++) {
		for (m = 0; m < g + 1; m++) {
			var v = new THREE.Vector3();
			var c = h + m / g * p;
			v.x = f * Math.cos(c);
			v.y = f * Math.sin(c);
			this.vertices.push(v);
			l.push(new THREE.Vector2((v.x / r + 1) / 2, (v.y / r + 1) / 2))
		}
		f += j
	}
	var q = new THREE.Vector3(0, 0, 1);
	for (u = 0; u < t; u++) {
		var a = u * (g + 1);
		for (m = 0; m < g; m++) {
			var c = m + a;
			var e = c;
			var d = c + g + 1;
			var b = c + g + 2;
			this.faces.push(new THREE.Face3(e, d, b, [q.clone(), q.clone(), q.clone()]));
			this.faceVertexUvs[0].push([l[e].clone(), l[d].clone(), l[b].clone()]);
			e = c;
			d = c + g + 2;
			b = c + 1;
			this.faces.push(new THREE.Face3(e, d, b, [q.clone(), q.clone(), q.clone()]));
			this.faceVertexUvs[0].push([l[e].clone(), l[d].clone(), l[b].clone()])
		}
	}
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), f)
};
THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.RingGeometry.prototype.constructor = THREE.RingGeometry;
THREE.SphereGeometry = function(f, e, t, B, D, g, C) {
	THREE.Geometry.call(this);
	this.type = "SphereGeometry";
	this.parameters = {
		radius: f,
		widthSegments: e,
		heightSegments: t,
		phiStart: B,
		phiLength: D,
		thetaStart: g,
		thetaLength: C
	};
	f = f || 50;
	e = Math.max(3, Math.floor(e) || 8);
	t = Math.max(2, Math.floor(t) || 6);
	B = B !== undefined ? B : 0;
	D = D !== undefined ? D : Math.PI * 2;
	g = g !== undefined ? g : 0;
	C = C !== undefined ? C : Math.PI;
	var o, n, h = [],
		p = [];
	for (n = 0; n <= t; n++) {
		var A = [];
		var J = [];
		for (o = 0; o <= e; o++) {
			var r = o / e;
			var q = n / t;
			var G = new THREE.Vector3();
			G.x = -f * Math.cos(B + r * D) * Math.sin(g + q * C);
			G.y = f * Math.cos(g + q * C);
			G.z = f * Math.sin(B + r * D) * Math.sin(g + q * C);
			this.vertices.push(G);
			A.push(this.vertices.length - 1);
			J.push(new THREE.Vector2(r, 1 - q))
		}
		h.push(A);
		p.push(J)
	}
	for (n = 0; n < t; n++) {
		for (o = 0; o < e; o++) {
			var d = h[n][o + 1];
			var c = h[n][o];
			var b = h[n + 1][o];
			var a = h[n + 1][o + 1];
			var m = this.vertices[d].clone().normalize();
			var l = this.vertices[c].clone().normalize();
			var k = this.vertices[b].clone().normalize();
			var j = this.vertices[a].clone().normalize();
			var I = p[n][o + 1].clone();
			var H = p[n][o].clone();
			var F = p[n + 1][o].clone();
			var E = p[n + 1][o + 1].clone();
			if (Math.abs(this.vertices[d].y) === f) {
				I.x = (I.x + H.x) / 2;
				this.faces.push(new THREE.Face3(d, b, a, [m, k, j]));
				this.faceVertexUvs[0].push([I, F, E])
			} else {
				if (Math.abs(this.vertices[b].y) === f) {
					F.x = (F.x + E.x) / 2;
					this.faces.push(new THREE.Face3(d, c, b, [m, l, k]));
					this.faceVertexUvs[0].push([I, H, F])
				} else {
					this.faces.push(new THREE.Face3(d, c, a, [m, l, j]));
					this.faceVertexUvs[0].push([I, H, E]);
					this.faces.push(new THREE.Face3(c, b, a, [l.clone(), k, j.clone()]));
					this.faceVertexUvs[0].push([H.clone(), F, E.clone()])
				}
			}
		}
	}
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), f)
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;
THREE.TextGeometry = function(b, a) {
	a = a || {};
	var c = THREE.FontUtils.generateShapes(b, a);
	a.amount = a.height !== undefined ? a.height : 50;
	if (a.bevelThickness === undefined) {
		a.bevelThickness = 10
	}
	if (a.bevelSize === undefined) {
		a.bevelSize = 8
	}
	if (a.bevelEnabled === undefined) {
		a.bevelEnabled = false
	}
	THREE.ExtrudeGeometry.call(this, c, a);
	this.type = "TextGeometry"
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;
THREE.TorusGeometry = function(g, f, e, l, h) {
	THREE.Geometry.call(this);
	this.type = "TorusGeometry";
	this.parameters = {
		radius: g,
		tube: f,
		radialSegments: e,
		tubularSegments: l,
		arc: h
	};
	g = g || 100;
	f = f || 40;
	e = e || 8;
	l = l || 6;
	h = h || Math.PI * 2;
	var D = new THREE.Vector3(),
		m = [],
		p = [];
	for (var q = 0; q <= e; q++) {
		for (var r = 0; r <= l; r++) {
			var o = r / l * h;
			var n = q / e * Math.PI * 2;
			D.x = g * Math.cos(o);
			D.y = g * Math.sin(o);
			var t = new THREE.Vector3();
			t.x = (g + f * Math.cos(n)) * Math.cos(o);
			t.y = (g + f * Math.cos(n)) * Math.sin(o);
			t.z = f * Math.sin(n);
			this.vertices.push(t);
			m.push(new THREE.Vector2(r / l, q / e));
			p.push(t.clone().sub(D).normalize())
		}
	}
	for (var q = 1; q <= e; q++) {
		for (var r = 1; r <= l; r++) {
			var E = (l + 1) * q + r - 1;
			var C = (l + 1) * (q - 1) + r - 1;
			var B = (l + 1) * (q - 1) + r;
			var A = (l + 1) * q + r;
			var k = new THREE.Face3(E, C, A, [p[E].clone(), p[C].clone(), p[A].clone()]);
			this.faces.push(k);
			this.faceVertexUvs[0].push([m[E].clone(), m[C].clone(), m[A].clone()]);
			k = new THREE.Face3(C, B, A, [p[C].clone(), p[B].clone(), p[A].clone()]);
			this.faces.push(k);
			this.faceVertexUvs[0].push([m[C].clone(), m[B].clone(), m[A].clone()])
		}
	}
	this.computeFaceNormals()
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry;
THREE.TorusKnotGeometry = function(t, r, m, C, G, F, f) {
	THREE.Geometry.call(this);
	this.type = "TorusKnotGeometry";
	this.parameters = {
		radius: t,
		tube: r,
		radialSegments: m,
		tubularSegments: C,
		p: G,
		q: F,
		heightScale: f
	};
	t = t || 100;
	r = r || 40;
	m = m || 64;
	C = C || 8;
	G = G || 2;
	F = F || 3;
	f = f || 1;
	var e = new Array(m);
	var o = new THREE.Vector3();
	var H = new THREE.Vector3();
	var U = new THREE.Vector3();
	for (var L = 0; L < m; ++L) {
		e[L] = new Array(C);
		var E = L / m * 2 * G * Math.PI;
		var h = M(E, F, G, t, f);
		var g = M(E + 0.01, F, G, t, f);
		o.subVectors(g, h);
		H.addVectors(g, h);
		U.crossVectors(o, H);
		H.crossVectors(U, o);
		U.normalize();
		H.normalize();
		for (var J = 0; J < C; ++J) {
			var D = J / C * 2 * Math.PI;
			var l = -r * Math.cos(D);
			var k = r * Math.sin(D);
			var A = new THREE.Vector3();
			A.x = h.x + l * H.x + k * U.x;
			A.y = h.y + l * H.y + k * U.y;
			A.z = h.z + l * H.z + k * U.z;
			e[L][J] = this.vertices.push(A) - 1
		}
	}
	for (var L = 0; L < m; ++L) {
		for (var J = 0; J < C; ++J) {
			var B = (L + 1) % m;
			var I = (J + 1) % C;
			var T = e[L][J];
			var S = e[B][J];
			var R = e[B][I];
			var Q = e[L][I];
			var P = new THREE.Vector2(L / m, J / C);
			var O = new THREE.Vector2((L + 1) / m, J / C);
			var N = new THREE.Vector2((L + 1) / m, (J + 1) / C);
			var K = new THREE.Vector2(L / m, (J + 1) / C);
			this.faces.push(new THREE.Face3(T, S, Q));
			this.faceVertexUvs[0].push([P, O, K]);
			this.faces.push(new THREE.Face3(S, R, Q));
			this.faceVertexUvs[0].push([O.clone(), N, K.clone()])
		}
	}
	this.computeFaceNormals();
	this.computeVertexNormals();

	function M(W, q, V, v, a) {
		var n = Math.cos(W);
		var X = Math.sin(W);
		var j = q / V * W;
		var p = Math.cos(j);
		var d = v * (2 + p) * 0.5 * n;
		var c = v * (2 + p) * X * 0.5;
		var b = a * v * Math.sin(j) * 0.5;
		return new THREE.Vector3(d, c, b)
	}
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry;
THREE.TubeGeometry = function(L, h, K, F, J, T) {
	THREE.Geometry.call(this);
	this.type = "TubeGeometry";
	this.parameters = {
		path: L,
		segments: h,
		radius: K,
		radialSegments: F,
		closed: J
	};
	h = h || 64;
	K = K || 1;
	F = F || 8;
	J = J || false;
	T = T || THREE.TubeGeometry.NoTaper;
	var H = [];
	var B = this,
		D, I, C, e = h + 1,
		G, E, M, o, n, A, f = new THREE.Vector3(),
		O, N, t, g, X, W, V, U, S, R, Q, P;
	var p = new THREE.TubeGeometry.FrenetFrames(L, h, J),
		q = p.tangents,
		m = p.normals,
		l = p.binormals;
	this.tangents = q;
	this.normals = m;
	this.binormals = l;

	function k(a, c, b) {
		return B.vertices.push(new THREE.Vector3(a, c, b)) - 1
	}
	for (O = 0; O < e; O++) {
		H[O] = [];
		G = O / (e - 1);
		A = L.getPointAt(G);
		D = q[O];
		I = m[O];
		C = l[O];
		M = K * T(G);
		for (N = 0; N < F; N++) {
			E = N / F * 2 * Math.PI;
			o = -M * Math.cos(E);
			n = M * Math.sin(E);
			f.copy(A);
			f.x += o * I.x + n * C.x;
			f.y += o * I.y + n * C.y;
			f.z += o * I.z + n * C.z;
			H[O][N] = k(f.x, f.y, f.z)
		}
	}
	for (O = 0; O < h; O++) {
		for (N = 0; N < F; N++) {
			t = (J) ? (O + 1) % h : O + 1;
			g = (N + 1) % F;
			X = H[O][N];
			W = H[t][N];
			V = H[t][g];
			U = H[O][g];
			S = new THREE.Vector2(O / h, N / F);
			R = new THREE.Vector2((O + 1) / h, N / F);
			Q = new THREE.Vector2((O + 1) / h, (N + 1) / F);
			P = new THREE.Vector2(O / h, (N + 1) / F);
			this.faces.push(new THREE.Face3(X, W, U));
			this.faceVertexUvs[0].push([S, R, P]);
			this.faces.push(new THREE.Face3(W, V, U));
			this.faceVertexUvs[0].push([R.clone(), Q, P.clone()])
		}
	}
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry;
THREE.TubeGeometry.NoTaper = function(a) {
	return 1
};
THREE.TubeGeometry.SinusoidalTaper = function(a) {
	return Math.sin(Math.PI * a)
};
THREE.TubeGeometry.FrenetFrames = function(k, m, c) {
	var t = new THREE.Vector3(),
		l = [],
		j = [],
		d = [],
		h = new THREE.Vector3(),
		o = new THREE.Matrix4(),
		b = m + 1,
		e, v = 0.0001,
		a, r, q, p, n, g;
	this.tangents = l;
	this.normals = j;
	this.binormals = d;
	for (n = 0; n < b; n++) {
		g = n / (b - 1);
		l[n] = k.getTangentAt(g);
		l[n].normalize()
	}
	f();

	function f() {
		j[0] = new THREE.Vector3();
		d[0] = new THREE.Vector3();
		a = Number.MAX_VALUE;
		r = Math.abs(l[0].x);
		q = Math.abs(l[0].y);
		p = Math.abs(l[0].z);
		if (r <= a) {
			a = r;
			t.set(1, 0, 0)
		}
		if (q <= a) {
			a = q;
			t.set(0, 1, 0)
		}
		if (p <= a) {
			t.set(0, 0, 1)
		}
		h.crossVectors(l[0], t).normalize();
		j[0].crossVectors(l[0], h);
		d[0].crossVectors(l[0], j[0])
	}
	for (n = 1; n < b; n++) {
		j[n] = j[n - 1].clone();
		d[n] = d[n - 1].clone();
		h.crossVectors(l[n - 1], l[n]);
		if (h.length() > v) {
			h.normalize();
			e = Math.acos(THREE.Math.clamp(l[n - 1].dot(l[n]), -1, 1));
			j[n].applyMatrix4(o.makeRotationAxis(h, e))
		}
		d[n].crossVectors(l[n], j[n])
	}
	if (c) {
		e = Math.acos(THREE.Math.clamp(j[0].dot(j[b - 1]), -1, 1));
		e /= (b - 1);
		if (l[0].dot(h.crossVectors(j[0], j[b - 1])) > 0) {
			e = -e
		}
		for (n = 1; n < b; n++) {
			j[n].applyMatrix4(o.makeRotationAxis(l[n], e * n));
			d[n].crossVectors(l[n], j[n])
		}
	}
};
THREE.PolyhedronGeometry = function(n, m, k, I) {
	THREE.Geometry.call(this);
	this.type = "PolyhedronGeometry";
	this.parameters = {
		vertices: n,
		indices: m,
		radius: k,
		detail: I
	};
	k = k || 1;
	I = I || 0;
	var o = this;
	for (var D = 0, A = n.length; D < A; D += 3) {
		e(new THREE.Vector3(n[D], n[D + 1], n[D + 2]))
	}
	var u = this.vertices;
	var c = [];
	for (var D = 0, B = 0, A = m.length; D < A; D += 3, B++) {
		var g = u[m[D]];
		var f = u[m[D + 1]];
		var b = u[m[D + 2]];
		c[B] = new THREE.Face3(g.index, f.index, b.index, [g.clone(), f.clone(), b.clone()])
	}
	var t = new THREE.Vector3();
	for (var D = 0, A = c.length; D < A; D++) {
		q(c[D], I)
	}
	for (var D = 0, A = this.faceVertexUvs[0].length; D < A; D++) {
		var r = this.faceVertexUvs[0][D];
		var H = r[0].x;
		var G = r[1].x;
		var F = r[2].x;
		var C = Math.max(H, Math.max(G, F));
		var v = Math.min(H, Math.min(G, F));
		if (C > 0.9 && v < 0.1) {
			if (H < 0.2) {
				r[0].x += 1
			}
			if (G < 0.2) {
				r[1].x += 1
			}
			if (F < 0.2) {
				r[2].x += 1
			}
		}
	}
	for (var D = 0, A = this.vertices.length; D < A; D++) {
		this.vertices[D].multiplyScalar(k)
	}
	this.mergeVertices();
	this.computeFaceNormals();
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), k);

	function e(j) {
		var J = j.normalize().clone();
		J.index = o.vertices.push(J) - 1;
		var p = E(j) / 2 / Math.PI + 0.5;
		var l = d(j) / Math.PI + 0.5;
		J.uv = new THREE.Vector2(p, 1 - l);
		return J
	}

	function h(K, J, p) {
		var l = new THREE.Face3(K.index, J.index, p.index, [K.clone(), J.clone(), p.clone()]);
		o.faces.push(l);
		t.copy(K).add(J).add(p).divideScalar(3);
		var j = E(t);
		o.faceVertexUvs[0].push([a(K.uv, K, j), a(J.uv, J, j), a(p.uv, p, j)])
	}

	function q(N, L) {
		var P = Math.pow(2, L);
		var R = e(o.vertices[N.a]);
		var Q = e(o.vertices[N.b]);
		var O = e(o.vertices[N.c]);
		var S = [];
		for (var K = 0; K <= P; K++) {
			S[K] = [];
			var M = e(R.clone().lerp(O, K / P));
			var l = e(Q.clone().lerp(O, K / P));
			var T = P - K;
			for (var J = 0; J <= T; J++) {
				if (J == 0 && K == P) {
					S[K][J] = M
				} else {
					S[K][J] = e(M.clone().lerp(l, J / T))
				}
			}
		}
		for (var K = 0; K < P; K++) {
			for (var J = 0; J < 2 * (P - K) - 1; J++) {
				var p = Math.floor(J / 2);
				if (J % 2 == 0) {
					h(S[K][p + 1], S[K + 1][p], S[K][p])
				} else {
					h(S[K][p + 1], S[K + 1][p + 1], S[K + 1][p])
				}
			}
		}
	}

	function E(j) {
		return Math.atan2(j.z, -j.x)
	}

	function d(j) {
		return Math.atan2(-j.y, Math.sqrt((j.x * j.x) + (j.z * j.z)))
	}

	function a(l, j, p) {
		if ((p < 0) && (l.x === 1)) {
			l = new THREE.Vector2(l.x - 1, l.y)
		}
		if ((j.x === 0) && (j.z === 0)) {
			l = new THREE.Vector2(p / 2 / Math.PI + 0.5, l.y)
		}
		return l.clone()
	}
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry;
THREE.DodecahedronGeometry = function(a, d) {
	this.parameters = {
		radius: a,
		detail: d
	};
	var c = (1 + Math.sqrt(5)) / 2;
	var e = 1 / c;
	var b = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -e, -c, 0, -e, c, 0, e, -c, 0, e, c, -e, -c, 0, -e, c, 0, e, -c, 0, e, c, 0, -c, 0, -e, c, 0, -e, -c, 0, e, c, 0, e];
	var f = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
	THREE.PolyhedronGeometry.call(this, b, f, a, d)
};
THREE.DodecahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.DodecahedronGeometry.prototype.constructor = THREE.DodecahedronGeometry;
THREE.IcosahedronGeometry = function(a, d) {
	var c = (1 + Math.sqrt(5)) / 2;
	var b = [-1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, 0, 0, -1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, c, 0, -1, c, 0, 1, -c, 0, -1, -c, 0, 1];
	var e = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
	THREE.PolyhedronGeometry.call(this, b, e, a, d);
	this.type = "IcosahedronGeometry";
	this.parameters = {
		radius: a,
		detail: d
	}
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;
THREE.OctahedronGeometry = function(a, c) {
	this.parameters = {
		radius: a,
		detail: c
	};
	var b = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1];
	var d = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
	THREE.PolyhedronGeometry.call(this, b, d, a, c);
	this.type = "OctahedronGeometry";
	this.parameters = {
		radius: a,
		detail: c
	}
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry;
THREE.TetrahedronGeometry = function(a, c) {
	var b = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1];
	var d = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
	THREE.PolyhedronGeometry.call(this, b, d, a, c);
	this.type = "TetrahedronGeometry";
	this.parameters = {
		radius: a,
		detail: c
	}
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry;
THREE.ParametricGeometry = function(g, f, D) {
	THREE.Geometry.call(this);
	this.type = "ParametricGeometry";
	this.parameters = {
		func: g,
		slices: f,
		stacks: D
	};
	var H = this.vertices;
	var e = this.faces;
	var h = this.faceVertexUvs[0];
	var q, n, m;
	var l, k;
	var G = f + 1;
	for (q = 0; q <= D; q++) {
		k = q / D;
		for (n = 0; n <= f; n++) {
			l = n / f;
			m = g(l, k);
			H.push(m)
		}
	}
	var F, E, C, B;
	var A, t, r, o;
	for (q = 0; q < D; q++) {
		for (n = 0; n < f; n++) {
			F = q * G + n;
			E = q * G + n + 1;
			C = (q + 1) * G + n + 1;
			B = (q + 1) * G + n;
			A = new THREE.Vector2(n / f, q / D);
			t = new THREE.Vector2((n + 1) / f, q / D);
			r = new THREE.Vector2((n + 1) / f, (q + 1) / D);
			o = new THREE.Vector2(n / f, (q + 1) / D);
			e.push(new THREE.Face3(F, E, B));
			h.push([A, t, o]);
			e.push(new THREE.Face3(E, C, B));
			h.push([t.clone(), r, o.clone()])
		}
	}
	this.computeFaceNormals();
	this.computeVertexNormals()
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry;
THREE.AxisHelper = function(c) {
	c = c || 1;
	var b = new Float32Array([0, 0, 0, c, 0, 0, 0, 0, 0, 0, c, 0, 0, 0, 0, 0, 0, c]);
	var a = new Float32Array([1, 0, 0, 1, 0.6, 0, 0, 1, 0, 0.6, 1, 0, 0, 0, 1, 0, 0.6, 1]);
	var e = new THREE.BufferGeometry();
	e.addAttribute("position", new THREE.BufferAttribute(b, 3));
	e.addAttribute("color", new THREE.BufferAttribute(a, 3));
	var d = new THREE.LineBasicMaterial({
		vertexColors: THREE.VertexColors
	});
	THREE.Line.call(this, e, d, THREE.LinePieces)
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.AxisHelper.prototype.constructor = THREE.AxisHelper;
THREE.ArrowHelper = (function() {
	var a = new THREE.Geometry();
	a.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));
	var b = new THREE.CylinderGeometry(0, 0.5, 1, 5, 1);
	b.applyMatrix(new THREE.Matrix4().makeTranslation(0, -0.5, 0));
	return function(g, f, h, e, d, c) {
		THREE.Object3D.call(this);
		if (e === undefined) {
			e = 16776960
		}
		if (h === undefined) {
			h = 1
		}
		if (d === undefined) {
			d = 0.2 * h
		}
		if (c === undefined) {
			c = 0.2 * d
		}
		this.position.copy(f);
		this.line = new THREE.Line(a, new THREE.LineBasicMaterial({
			color: e
		}));
		this.line.matrixAutoUpdate = false;
		this.add(this.line);
		this.cone = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
			color: e
		}));
		this.cone.matrixAutoUpdate = false;
		this.add(this.cone);
		this.setDirection(g);
		this.setLength(h, d, c)
	}
}());
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper;
THREE.ArrowHelper.prototype.setDirection = (function() {
	var a = new THREE.Vector3();
	var b;
	return function(c) {
		if (c.y > 0.99999) {
			this.quaternion.set(0, 0, 0, 1)
		} else {
			if (c.y < -0.99999) {
				this.quaternion.set(1, 0, 0, 0)
			} else {
				a.set(c.z, 0, -c.x).normalize();
				b = Math.acos(c.y);
				this.quaternion.setFromAxisAngle(a, b)
			}
		}
	}
}());
THREE.ArrowHelper.prototype.setLength = function(c, b, a) {
	if (b === undefined) {
		b = 0.2 * c
	}
	if (a === undefined) {
		a = 0.2 * b
	}
	this.line.scale.set(1, c - b, 1);
	this.line.updateMatrix();
	this.cone.scale.set(a, b, a);
	this.cone.position.y = c;
	this.cone.updateMatrix()
};
THREE.ArrowHelper.prototype.setColor = function(a) {
	this.line.material.color.set(a);
	this.cone.material.color.set(a)
};
THREE.BoxHelper = function(a) {
	var b = new THREE.BufferGeometry();
	b.addAttribute("position", new THREE.BufferAttribute(new Float32Array(72), 3));
	THREE.Line.call(this, b, new THREE.LineBasicMaterial({
		color: 16776960
	}), THREE.LinePieces);
	if (a !== undefined) {
		this.update(a)
	}
};
THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype);
THREE.BoxHelper.prototype.constructor = THREE.BoxHelper;
THREE.BoxHelper.prototype.update = function(c) {
	var e = c.geometry;
	if (e.boundingBox === null) {
		e.computeBoundingBox()
	}
	var d = e.boundingBox.min;
	var a = e.boundingBox.max;
	var b = this.geometry.attributes.position.array;
	b[0] = a.x;
	b[1] = a.y;
	b[2] = a.z;
	b[3] = d.x;
	b[4] = a.y;
	b[5] = a.z;
	b[6] = d.x;
	b[7] = a.y;
	b[8] = a.z;
	b[9] = d.x;
	b[10] = d.y;
	b[11] = a.z;
	b[12] = d.x;
	b[13] = d.y;
	b[14] = a.z;
	b[15] = a.x;
	b[16] = d.y;
	b[17] = a.z;
	b[18] = a.x;
	b[19] = d.y;
	b[20] = a.z;
	b[21] = a.x;
	b[22] = a.y;
	b[23] = a.z;
	b[24] = a.x;
	b[25] = a.y;
	b[26] = d.z;
	b[27] = d.x;
	b[28] = a.y;
	b[29] = d.z;
	b[30] = d.x;
	b[31] = a.y;
	b[32] = d.z;
	b[33] = d.x;
	b[34] = d.y;
	b[35] = d.z;
	b[36] = d.x;
	b[37] = d.y;
	b[38] = d.z;
	b[39] = a.x;
	b[40] = d.y;
	b[41] = d.z;
	b[42] = a.x;
	b[43] = d.y;
	b[44] = d.z;
	b[45] = a.x;
	b[46] = a.y;
	b[47] = d.z;
	b[48] = a.x;
	b[49] = a.y;
	b[50] = a.z;
	b[51] = a.x;
	b[52] = a.y;
	b[53] = d.z;
	b[54] = d.x;
	b[55] = a.y;
	b[56] = a.z;
	b[57] = d.x;
	b[58] = a.y;
	b[59] = d.z;
	b[60] = d.x;
	b[61] = d.y;
	b[62] = a.z;
	b[63] = d.x;
	b[64] = d.y;
	b[65] = d.z;
	b[66] = a.x;
	b[67] = d.y;
	b[68] = a.z;
	b[69] = a.x;
	b[70] = d.y;
	b[71] = d.z;
	this.geometry.attributes.position.needsUpdate = true;
	this.geometry.computeBoundingSphere();
	this.matrix = c.matrixWorld;
	this.matrixAutoUpdate = false
};
THREE.BoundingBoxHelper = function(b, c) {
	var a = (c !== undefined) ? c : 8947848;
	this.object = b;
	this.box = new THREE.Box3();
	THREE.Mesh.call(this, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
		color: a,
		wireframe: true
	}))
};
THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.BoundingBoxHelper.prototype.constructor = THREE.BoundingBoxHelper;
THREE.BoundingBoxHelper.prototype.update = function() {
	this.box.setFromObject(this.object);
	this.box.size(this.scale);
	this.box.center(this.position)
};
THREE.CameraHelper = function(e) {
	var h = new THREE.Geometry();
	var f = new THREE.LineBasicMaterial({
		color: 16777215,
		vertexColors: THREE.FaceColors
	});
	var g = {};
	var d = 16755200;
	var l = 16711680;
	var b = 43775;
	var j = 16777215;
	var c = 3355443;
	k("n1", "n2", d);
	k("n2", "n4", d);
	k("n4", "n3", d);
	k("n3", "n1", d);
	k("f1", "f2", d);
	k("f2", "f4", d);
	k("f4", "f3", d);
	k("f3", "f1", d);
	k("n1", "f1", d);
	k("n2", "f2", d);
	k("n3", "f3", d);
	k("n4", "f4", d);
	k("p", "n1", l);
	k("p", "n2", l);
	k("p", "n3", l);
	k("p", "n4", l);
	k("u1", "u2", b);
	k("u2", "u3", b);
	k("u3", "u1", b);
	k("c", "t", j);
	k("p", "c", c);
	k("cn1", "cn2", c);
	k("cn3", "cn4", c);
	k("cf1", "cf2", c);
	k("cf3", "cf4", c);

	function k(n, m, o) {
		a(n, o);
		a(m, o)
	}

	function a(n, m) {
		h.vertices.push(new THREE.Vector3());
		h.colors.push(new THREE.Color(m));
		if (g[n] === undefined) {
			g[n] = []
		}
		g[n].push(h.vertices.length - 1)
	}
	THREE.Line.call(this, h, f, THREE.LinePieces);
	this.camera = e;
	this.matrix = e.matrixWorld;
	this.matrixAutoUpdate = false;
	this.pointMap = g;
	this.update()
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.constructor = THREE.CameraHelper;
THREE.CameraHelper.prototype.update = function() {
	var e, b;
	var a = new THREE.Vector3();
	var d = new THREE.Camera();
	var c = function(g, f, m, l) {
		a.set(f, m, l).unproject(d);
		var k = b[g];
		if (k !== undefined) {
			for (var j = 0, h = k.length; j < h; j++) {
				e.vertices[k[j]].copy(a)
			}
		}
	};
	return function() {
		e = this.geometry;
		b = this.pointMap;
		var f = 1,
			g = 1;
		d.projectionMatrix.copy(this.camera.projectionMatrix);
		c("c", 0, 0, -1);
		c("t", 0, 0, 1);
		c("n1", -f, -g, -1);
		c("n2", f, -g, -1);
		c("n3", -f, g, -1);
		c("n4", f, g, -1);
		c("f1", -f, -g, 1);
		c("f2", f, -g, 1);
		c("f3", -f, g, 1);
		c("f4", f, g, 1);
		c("u1", f * 0.7, g * 1.1, -1);
		c("u2", -f * 0.7, g * 1.1, -1);
		c("u3", 0, g * 2, -1);
		c("cf1", -f, 0, 1);
		c("cf2", f, 0, 1);
		c("cf3", 0, -g, 1);
		c("cf4", 0, g, 1);
		c("cn1", -f, 0, -1);
		c("cn2", f, 0, -1);
		c("cn3", 0, -g, -1);
		c("cn4", 0, g, -1);
		e.verticesNeedUpdate = true
	}
}();
THREE.DirectionalLightHelper = function(a, b) {
	THREE.Object3D.call(this);
	this.light = a;
	this.light.updateMatrixWorld();
	this.matrix = a.matrixWorld;
	this.matrixAutoUpdate = false;
	b = b || 1;
	var d = new THREE.Geometry();
	d.vertices.push(new THREE.Vector3(-b, b, 0), new THREE.Vector3(b, b, 0), new THREE.Vector3(b, -b, 0), new THREE.Vector3(-b, -b, 0), new THREE.Vector3(-b, b, 0));
	var c = new THREE.LineBasicMaterial({
		fog: false
	});
	c.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.lightPlane = new THREE.Line(d, c);
	this.add(this.lightPlane);
	d = new THREE.Geometry();
	d.vertices.push(new THREE.Vector3(), new THREE.Vector3());
	c = new THREE.LineBasicMaterial({
		fog: false
	});
	c.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	this.targetLine = new THREE.Line(d, c);
	this.add(this.targetLine);
	this.update()
};
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper;
THREE.DirectionalLightHelper.prototype.dispose = function() {
	this.lightPlane.geometry.dispose();
	this.lightPlane.material.dispose();
	this.targetLine.geometry.dispose();
	this.targetLine.material.dispose()
};
THREE.DirectionalLightHelper.prototype.update = function() {
	var c = new THREE.Vector3();
	var b = new THREE.Vector3();
	var a = new THREE.Vector3();
	return function() {
		c.setFromMatrixPosition(this.light.matrixWorld);
		b.setFromMatrixPosition(this.light.target.matrixWorld);
		a.subVectors(b, c);
		this.lightPlane.lookAt(a);
		this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
		this.targetLine.geometry.vertices[1].copy(a);
		this.targetLine.geometry.verticesNeedUpdate = true;
		this.targetLine.material.color.copy(this.lightPlane.material.color)
	}
}();
THREE.EdgesHelper = function(E, k, o) {
	var t = (k !== undefined) ? k : 16777215;
	o = (o !== undefined) ? o : 1;
	var D = Math.cos(THREE.Math.degToRad(o));
	var e = [0, 0],
		a = {};
	var r = function(j, h) {
		return j - h
	};
	var p = ["a", "b", "c"];
	var d = new THREE.BufferGeometry();
	var n;
	if (E.geometry instanceof THREE.BufferGeometry) {
		n = new THREE.Geometry();
		n.fromBufferGeometry(E.geometry)
	} else {
		n = E.geometry.clone()
	}
	n.mergeVertices();
	n.computeFaceNormals();
	var f = n.vertices;
	var b = n.faces;
	var c = 0;
	for (var A = 0, q = b.length; A < q; A++) {
		var m = b[A];
		for (var u = 0; u < 3; u++) {
			e[0] = m[p[u]];
			e[1] = m[p[(u + 1) % 3]];
			e.sort(r);
			var F = e.toString();
			if (a[F] === undefined) {
				a[F] = {
					vert1: e[0],
					vert2: e[1],
					face1: A,
					face2: undefined
				};
				c++
			} else {
				a[F].face2 = A
			}
		}
	}
	var v = new Float32Array(c * 2 * 3);
	var g = 0;
	for (var F in a) {
		var B = a[F];
		if (B.face2 === undefined || b[B.face1].normal.dot(b[B.face2].normal) <= D) {
			var C = f[B.vert1];
			v[g++] = C.x;
			v[g++] = C.y;
			v[g++] = C.z;
			C = f[B.vert2];
			v[g++] = C.x;
			v[g++] = C.y;
			v[g++] = C.z
		}
	}
	d.addAttribute("position", new THREE.BufferAttribute(v, 3));
	THREE.Line.call(this, d, new THREE.LineBasicMaterial({
		color: t
	}), THREE.LinePieces);
	this.matrix = E.matrixWorld;
	this.matrixAutoUpdate = false
};
THREE.EdgesHelper.prototype = Object.create(THREE.Line.prototype);
THREE.EdgesHelper.prototype.constructor = THREE.EdgesHelper;
THREE.FaceNormalsHelper = function(e, k, c, j) {
	this.object = e;
	this.size = (k !== undefined) ? k : 1;
	var f = (c !== undefined) ? c : 16776960;
	var a = (j !== undefined) ? j : 1;
	var h = new THREE.Geometry();
	var b = this.object.geometry.faces;
	for (var g = 0, d = b.length; g < d; g++) {
		h.vertices.push(new THREE.Vector3(), new THREE.Vector3())
	}
	THREE.Line.call(this, h, new THREE.LineBasicMaterial({
		color: f,
		linewidth: a
	}), THREE.LinePieces);
	this.matrixAutoUpdate = false;
	this.normalMatrix = new THREE.Matrix3();
	this.update()
};
THREE.FaceNormalsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.FaceNormalsHelper.prototype.constructor = THREE.FaceNormalsHelper;
THREE.FaceNormalsHelper.prototype.update = function() {
	var g = this.geometry.vertices;
	var e = this.object;
	var j = e.geometry.vertices;
	var b = e.geometry.faces;
	var a = e.matrixWorld;
	e.updateMatrixWorld(true);
	this.normalMatrix.getNormalMatrix(a);
	for (var f = 0, c = 0, d = b.length; f < d; f++, c += 2) {
		var h = b[f];
		g[c].copy(j[h.a]).add(j[h.b]).add(j[h.c]).divideScalar(3).applyMatrix4(a);
		g[c + 1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(g[c])
	}
	this.geometry.verticesNeedUpdate = true;
	return this
};
THREE.GridHelper = function(c, e) {
	var f = new THREE.Geometry();
	var d = new THREE.LineBasicMaterial({
		vertexColors: THREE.VertexColors
	});
	this.color1 = new THREE.Color(4473924);
	this.color2 = new THREE.Color(8947848);
	for (var b = -c; b <= c; b += e) {
		f.vertices.push(new THREE.Vector3(-c, 0, b), new THREE.Vector3(c, 0, b), new THREE.Vector3(b, 0, -c), new THREE.Vector3(b, 0, c));
		var a = b === 0 ? this.color1 : this.color2;
		f.colors.push(a, a, a, a)
	}
	THREE.Line.call(this, f, d, THREE.LinePieces)
};
THREE.GridHelper.prototype = Object.create(THREE.Line.prototype);
THREE.GridHelper.prototype.constructor = THREE.GridHelper;
THREE.GridHelper.prototype.setColors = function(b, a) {
	this.color1.set(b);
	this.color2.set(a);
	this.geometry.colorsNeedUpdate = true
};
THREE.HemisphereLightHelper = function(a, f) {
	THREE.Object3D.call(this);
	this.light = a;
	this.light.updateMatrixWorld();
	this.matrix = a.matrixWorld;
	this.matrixAutoUpdate = false;
	this.colors = [new THREE.Color(), new THREE.Color()];
	var e = new THREE.SphereGeometry(f, 4, 2);
	e.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
	for (var c = 0, b = 8; c < b; c++) {
		e.faces[c].color = this.colors[c < 4 ? 0 : 1]
	}
	var d = new THREE.MeshBasicMaterial({
		vertexColors: THREE.FaceColors,
		wireframe: true
	});
	this.lightSphere = new THREE.Mesh(e, d);
	this.add(this.lightSphere);
	this.update()
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.constructor = THREE.HemisphereLightHelper;
THREE.HemisphereLightHelper.prototype.dispose = function() {
	this.lightSphere.geometry.dispose();
	this.lightSphere.material.dispose()
};
THREE.HemisphereLightHelper.prototype.update = function() {
	var a = new THREE.Vector3();
	return function() {
		this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);
		this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);
		this.lightSphere.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate());
		this.lightSphere.geometry.colorsNeedUpdate = true
	}
}();
THREE.PointLightHelper = function(a, d) {
	this.light = a;
	this.light.updateMatrixWorld();
	var c = new THREE.SphereGeometry(d, 4, 2);
	var b = new THREE.MeshBasicMaterial({
		wireframe: true,
		fog: false
	});
	b.color.copy(this.light.color).multiplyScalar(this.light.intensity);
	THREE.Mesh.call(this, c, b);
	this.matrix = this.light.matrixWorld;
	this.matrixAutoUpdate = false
};
THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper;
THREE.PointLightHelper.prototype.dispose = function() {
	this.geometry.dispose();
	this.material.dispose()
};
THREE.PointLightHelper.prototype.update = function() {
	this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
};
THREE.SkeletonHelper = function(a) {
	this.bones = this.getBoneList(a);
	var e = new THREE.Geometry();
	for (var b = 0; b < this.bones.length; b++) {
		var d = this.bones[b];
		if (d.parent instanceof THREE.Bone) {
			e.vertices.push(new THREE.Vector3());
			e.vertices.push(new THREE.Vector3());
			e.colors.push(new THREE.Color(0, 0, 1));
			e.colors.push(new THREE.Color(0, 1, 0))
		}
	}
	var c = new THREE.LineBasicMaterial({
		vertexColors: THREE.VertexColors,
		depthTest: false,
		depthWrite: false,
		transparent: true
	});
	THREE.Line.call(this, e, c, THREE.LinePieces);
	this.root = a;
	this.matrix = a.matrixWorld;
	this.matrixAutoUpdate = false;
	this.update()
};
THREE.SkeletonHelper.prototype = Object.create(THREE.Line.prototype);
THREE.SkeletonHelper.prototype.constructor = THREE.SkeletonHelper;
THREE.SkeletonHelper.prototype.getBoneList = function(a) {
	var c = [];
	if (a instanceof THREE.Bone) {
		c.push(a)
	}
	for (var b = 0; b < a.children.length; b++) {
		c.push.apply(c, this.getBoneList(a.children[b]))
	}
	return c
};
THREE.SkeletonHelper.prototype.update = function() {
	var f = this.geometry;
	var e = new THREE.Matrix4().getInverse(this.root.matrixWorld);
	var c = new THREE.Matrix4();
	var a = 0;
	for (var b = 0; b < this.bones.length; b++) {
		var d = this.bones[b];
		if (d.parent instanceof THREE.Bone) {
			c.multiplyMatrices(e, d.matrixWorld);
			f.vertices[a].setFromMatrixPosition(c);
			c.multiplyMatrices(e, d.parent.matrixWorld);
			f.vertices[a + 1].setFromMatrixPosition(c);
			a += 2
		}
	}
	f.verticesNeedUpdate = true;
	f.computeBoundingSphere()
};
THREE.SpotLightHelper = function(a) {
	THREE.Object3D.call(this);
	this.light = a;
	this.light.updateMatrixWorld();
	this.matrix = a.matrixWorld;
	this.matrixAutoUpdate = false;
	var c = new THREE.CylinderGeometry(0, 1, 1, 8, 1, true);
	c.applyMatrix(new THREE.Matrix4().makeTranslation(0, -0.5, 0));
	c.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
	var b = new THREE.MeshBasicMaterial({
		wireframe: true,
		fog: false
	});
	this.cone = new THREE.Mesh(c, b);
	this.add(this.cone);
	this.update()
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper;
THREE.SpotLightHelper.prototype.dispose = function() {
	this.cone.geometry.dispose();
	this.cone.material.dispose()
};
THREE.SpotLightHelper.prototype.update = function() {
	var a = new THREE.Vector3();
	var b = new THREE.Vector3();
	return function() {
		var c = this.light.distance ? this.light.distance : 10000;
		var d = c * Math.tan(this.light.angle);
		this.cone.scale.set(d, d, c);
		a.setFromMatrixPosition(this.light.matrixWorld);
		b.setFromMatrixPosition(this.light.target.matrixWorld);
		this.cone.lookAt(b.sub(a));
		this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
	}
}();
THREE.VertexNormalsHelper = function(e, p, c, o) {
	this.object = e;
	this.size = (p !== undefined) ? p : 1;
	var f = (c !== undefined) ? c : 16711680;
	var a = (o !== undefined) ? o : 1;
	var n = new THREE.Geometry();
	var b = e.geometry.faces;
	for (var k = 0, d = b.length; k < d; k++) {
		var m = b[k];
		for (var g = 0, h = m.vertexNormals.length; g < h; g++) {
			n.vertices.push(new THREE.Vector3(), new THREE.Vector3())
		}
	}
	THREE.Line.call(this, n, new THREE.LineBasicMaterial({
		color: f,
		linewidth: a
	}), THREE.LinePieces);
	this.matrixAutoUpdate = false;
	this.normalMatrix = new THREE.Matrix3();
	this.update()
};
THREE.VertexNormalsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.VertexNormalsHelper.prototype.constructor = THREE.VertexNormalsHelper;
THREE.VertexNormalsHelper.prototype.update = (function(a) {
	var b = new THREE.Vector3();
	return function(e) {
		var u = ["a", "b", "c", "d"];
		this.object.updateMatrixWorld(true);
		this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
		var o = this.geometry.vertices;
		var r = this.object.geometry.vertices;
		var c = this.object.geometry.faces;
		var p = this.object.matrixWorld;
		var t = 0;
		for (var h = 0, d = c.length; h < d; h++) {
			var q = c[h];
			for (var f = 0, g = q.vertexNormals.length; f < g; f++) {
				var n = q[u[f]];
				var k = r[n];
				var m = q.vertexNormals[f];
				o[t].copy(k).applyMatrix4(p);
				b.copy(m).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size);
				b.add(o[t]);
				t = t + 1;
				o[t].copy(b);
				t = t + 1
			}
		}
		this.geometry.verticesNeedUpdate = true;
		return this
	}
}());
THREE.VertexTangentsHelper = function(e, p, c, o) {
	this.object = e;
	this.size = (p !== undefined) ? p : 1;
	var f = (c !== undefined) ? c : 255;
	var a = (o !== undefined) ? o : 1;
	var n = new THREE.Geometry();
	var b = e.geometry.faces;
	for (var k = 0, d = b.length; k < d; k++) {
		var m = b[k];
		for (var g = 0, h = m.vertexTangents.length; g < h; g++) {
			n.vertices.push(new THREE.Vector3());
			n.vertices.push(new THREE.Vector3())
		}
	}
	THREE.Line.call(this, n, new THREE.LineBasicMaterial({
		color: f,
		linewidth: a
	}), THREE.LinePieces);
	this.matrixAutoUpdate = false;
	this.update()
};
THREE.VertexTangentsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.VertexTangentsHelper.prototype.constructor = THREE.VertexTangentsHelper;
THREE.VertexTangentsHelper.prototype.update = (function(a) {
	var b = new THREE.Vector3();
	return function(e) {
		var u = ["a", "b", "c", "d"];
		this.object.updateMatrixWorld(true);
		var n = this.geometry.vertices;
		var q = this.object.geometry.vertices;
		var c = this.object.geometry.faces;
		var o = this.object.matrixWorld;
		var r = 0;
		for (var h = 0, d = c.length; h < d; h++) {
			var p = c[h];
			for (var f = 0, g = p.vertexTangents.length; f < g; f++) {
				var m = p[u[f]];
				var k = q[m];
				var t = p.vertexTangents[f];
				n[r].copy(k).applyMatrix4(o);
				b.copy(t).transformDirection(o).multiplyScalar(this.size);
				b.add(n[r]);
				r = r + 1;
				n[r].copy(b);
				r = r + 1
			}
		}
		this.geometry.verticesNeedUpdate = true;
		return this
	}
}());
THREE.WireframeHelper = function(L, r) {
	var G = (r !== undefined) ? r : 16777215;
	var k = [0, 0],
		a = {};
	var F = function(l, j) {
		return l - j
	};
	var C = ["a", "b", "c"];
	var f = new THREE.BufferGeometry();
	if (L.geometry instanceof THREE.Geometry) {
		var n = L.geometry.vertices;
		var b = L.geometry.faces;
		var c = 0;
		var d = new Uint32Array(6 * b.length);
		for (var J = 0, E = b.length; J < E; J++) {
			var u = b[J];
			for (var H = 0; H < 3; H++) {
				k[0] = u[C[H]];
				k[1] = u[C[(H + 1) % 3]];
				k.sort(F);
				var M = k.toString();
				if (a[M] === undefined) {
					d[2 * c] = k[0];
					d[2 * c + 1] = k[1];
					a[M] = true;
					c++
				}
			}
		}
		var I = new Float32Array(c * 2 * 3);
		for (var J = 0, E = c; J < E; J++) {
			for (var H = 0; H < 2; H++) {
				var K = n[d[2 * J + H]];
				var q = 6 * J + 3 * H;
				I[q + 0] = K.x;
				I[q + 1] = K.y;
				I[q + 2] = K.z
			}
		}
		f.addAttribute("position", new THREE.BufferAttribute(I, 3))
	} else {
		if (L.geometry instanceof THREE.BufferGeometry) {
			if (L.geometry.attributes.index !== undefined) {
				var n = L.geometry.attributes.position.array;
				var h = L.geometry.attributes.index.array;
				var A = L.geometry.drawcalls;
				var c = 0;
				if (A.length === 0) {
					A = [{
						count: h.length,
						index: 0,
						start: 0
					}]
				}
				var d = new Uint32Array(2 * h.length);
				for (var D = 0, B = A.length; D < B; ++D) {
					var e = A[D].start;
					var p = A[D].count;
					var q = A[D].index;
					for (var J = e, v = e + p; J < v; J += 3) {
						for (var H = 0; H < 3; H++) {
							k[0] = q + h[J + H];
							k[1] = q + h[J + (H + 1) % 3];
							k.sort(F);
							var M = k.toString();
							if (a[M] === undefined) {
								d[2 * c] = k[0];
								d[2 * c + 1] = k[1];
								a[M] = true;
								c++
							}
						}
					}
				}
				var I = new Float32Array(c * 2 * 3);
				for (var J = 0, E = c; J < E; J++) {
					for (var H = 0; H < 2; H++) {
						var q = 6 * J + 3 * H;
						var g = 3 * d[2 * J + H];
						I[q + 0] = n[g];
						I[q + 1] = n[g + 1];
						I[q + 2] = n[g + 2]
					}
				}
				f.addAttribute("position", new THREE.BufferAttribute(I, 3))
			} else {
				var n = L.geometry.attributes.position.array;
				var c = n.length / 3;
				var t = c / 3;
				var I = new Float32Array(c * 2 * 3);
				for (var J = 0, E = t; J < E; J++) {
					for (var H = 0; H < 3; H++) {
						var q = 18 * J + 6 * H;
						var m = 9 * J + 3 * H;
						I[q + 0] = n[m];
						I[q + 1] = n[m + 1];
						I[q + 2] = n[m + 2];
						var g = 9 * J + 3 * ((H + 1) % 3);
						I[q + 3] = n[g];
						I[q + 4] = n[g + 1];
						I[q + 5] = n[g + 2]
					}
				}
				f.addAttribute("position", new THREE.BufferAttribute(I, 3))
			}
		}
	}
	THREE.Line.call(this, f, new THREE.LineBasicMaterial({
		color: G
	}), THREE.LinePieces);
	this.matrix = L.matrixWorld;
	this.matrixAutoUpdate = false
};
THREE.WireframeHelper.prototype = Object.create(THREE.Line.prototype);
THREE.WireframeHelper.prototype.constructor = THREE.WireframeHelper;
THREE.ImmediateRenderObject = function() {
	THREE.Object3D.call(this);
	this.render = function(a) {}
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject;
THREE.MorphBlendMesh = function(g, d) {
	THREE.Mesh.call(this, g, d);
	this.animationsMap = {};
	this.animationsList = [];
	var f = this.geometry.morphTargets.length;
	var b = "__default";
	var c = 0;
	var a = f - 1;
	var e = f / 1;
	this.createAnimation(b, c, a, e);
	this.setAnimationWeight(b, 1)
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh;
THREE.MorphBlendMesh.prototype.createAnimation = function(b, e, a, d) {
	var c = {
		startFrame: e,
		endFrame: a,
		length: a - e + 1,
		fps: d,
		duration: (a - e) / d,
		lastFrame: 0,
		currentFrame: 0,
		active: false,
		time: 0,
		direction: 1,
		weight: 1,
		directionBackwards: false,
		mirroredLoop: false
	};
	this.animationsMap[b] = c;
	this.animationsList.push(c)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(c) {
	var h = /([a-z]+)_?(\d+)/;
	var b, f = {};
	var j = this.geometry;
	for (var d = 0, k = j.morphTargets.length; d < k; d++) {
		var l = j.morphTargets[d];
		var g = l.name.match(h);
		if (g && g.length > 1) {
			var a = g[1];
			if (!f[a]) {
				f[a] = {
					start: Infinity,
					end: -Infinity
				}
			}
			var e = f[a];
			if (d < e.start) {
				e.start = d
			}
			if (d > e.end) {
				e.end = d
			}
			if (!b) {
				b = a
			}
		}
	}
	for (var a in f) {
		var e = f[a];
		this.createAnimation(a, e.start, e.end, c)
	}
	this.firstAnimation = b
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(a) {
	var b = this.animationsMap[a];
	if (b) {
		b.direction = 1;
		b.directionBackwards = false
	}
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(a) {
	var b = this.animationsMap[a];
	if (b) {
		b.direction = -1;
		b.directionBackwards = true
	}
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(a, c) {
	var b = this.animationsMap[a];
	if (b) {
		b.fps = c;
		b.duration = (b.end - b.start) / b.fps
	}
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(a, c) {
	var b = this.animationsMap[a];
	if (b) {
		b.duration = c;
		b.fps = (b.end - b.start) / b.duration
	}
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(a, c) {
	var b = this.animationsMap[a];
	if (b) {
		b.weight = c
	}
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function(a, c) {
	var b = this.animationsMap[a];
	if (b) {
		b.time = c
	}
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function(a) {
	var c = 0;
	var b = this.animationsMap[a];
	if (b) {
		c = b.time
	}
	return c
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(a) {
	var c = -1;
	var b = this.animationsMap[a];
	if (b) {
		c = b.duration
	}
	return c
};
THREE.MorphBlendMesh.prototype.playAnimation = function(a) {
	var b = this.animationsMap[a];
	if (b) {
		b.time = 0;
		b.active = true
	} else {
		THREE.warn("THREE.MorphBlendMesh: animation[" + a + "] undefined in .playAnimation()")
	}
};
THREE.MorphBlendMesh.prototype.stopAnimation = function(a) {
	var b = this.animationsMap[a];
	if (b) {
		b.active = false
	}
};
THREE.MorphBlendMesh.prototype.update = function(h) {
	for (var c = 0, a = this.animationsList.length; c < a; c++) {
		var g = this.animationsList[c];
		if (!g.active) {
			continue
		}
		var e = g.duration / g.length;
		g.time += g.direction * h;
		if (g.mirroredLoop) {
			if (g.time > g.duration || g.time < 0) {
				g.direction *= -1;
				if (g.time > g.duration) {
					g.time = g.duration;
					g.directionBackwards = true
				}
				if (g.time < 0) {
					g.time = 0;
					g.directionBackwards = false
				}
			}
		} else {
			g.time = g.time % g.duration;
			if (g.time < 0) {
				g.time += g.duration
			}
		}
		var b = g.startFrame + THREE.Math.clamp(Math.floor(g.time / e), 0, g.length - 1);
		var f = g.weight;
		if (b !== g.currentFrame) {
			this.morphTargetInfluences[g.lastFrame] = 0;
			this.morphTargetInfluences[g.currentFrame] = 1 * f;
			this.morphTargetInfluences[b] = 0;
			g.lastFrame = g.currentFrame;
			g.currentFrame = b
		}
		var d = (g.time % e) / e;
		if (g.directionBackwards) {
			d = 1 - d
		}
		this.morphTargetInfluences[g.currentFrame] = d * f;
		this.morphTargetInfluences[g.lastFrame] = (1 - d) * f
	}
};
var Detector = {
	canvas: !!window.CanvasRenderingContext2D,
	webgl: (function() {
		try {
			var a = document.createElement("canvas");
			return !!(window.WebGLRenderingContext && (a.getContext("webgl") || a.getContext("experimental-webgl")))
		} catch (b) {
			return false
		}
	})(),
	workers: !!window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,
	getWebGLErrorMessage: function(b) {
		var a = document.createElement("div");
		a.id = "webgl-error-message";
		a.style.fontFamily = "monospace";
		a.style.fontSize = "20px";
		a.style.fontWeight = "normal";
		a.style.textAlign = "center";
		a.style.color = "#000";
		a.style.padding = "1.5em";
		if (!this.webgl) {
			a.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://get.webgl.org/" style="color:#000">WebGL</a>.<br />', "Please update your browser or operation system."].join("\n") : ['Your browser does not seem to support <a href="http://get.webgl.org/" style="color:#000">WebGL</a>.<br/>', "Please update your browser or operation system."].join("\n")
		} else {
			a.innerHTML = b
		}
		return a
	},
	addGetWebGLMessage: function(c) {
		var b, f, a;
		c = c || {};
		b = c.parent !== undefined ? c.parent : document.body;
		a = Detector.getWebGLErrorMessage(c.message);
		b.appendChild(a);
		var d = document.createElement("img");
		var e = function() {
			var m = document.getElementById("webgl-error-message").clientHeight;
			var h = window.innerWidth;
			var l = window.innerHeight - m;
			var j = 347;
			var g = 650;
			var k = Math.min(h / j, l / g);
			d.style.position = "absolute";
			d.style.width = k * j + "px";
			d.style.height = k * g + "px";
			d.style.left = (h - k * j) / 2 + "px";
			d.style.top = (m + (l - k * g) / 2) + "px"
		};
		d.onload = e;
		d.src = "failed.png";
		b.appendChild(d);
		window.addEventListener("resize", e);
		b.style.backgroundColor = "#ffe1a6"
	}
};
if (typeof module === "object") {
	module.exports = Detector
}
GEMIOLI = {};
GEMIOLI.Utils = {};
GEMIOLI.Utils.path = function(d) {
	var a = {};
	var c = d.lastIndexOf("/");
	var b = d.lastIndexOf("\\");
	if (c < b) {
		a.dir = d.substr(0, b);
		d = d.substr(b + 1);
		a.backslash = true
	} else {
		if (b < c) {
			a.dir = d.substr(0, c);
			d = d.substr(c + 1)
		} else {
			a.dir = ""
		}
	}
	var e = d.lastIndexOf(".");
	if (e != -1) {
		a.ext = d.substr(e + 1);
		a.file = d.substr(0, e)
	} else {
		a.ext = "";
		a.file = d
	}
	return a
};
GEMIOLI.Utils.clamp = function(c, b, a) {
	return Math.max(b, Math.min(a, c))
};
GEMIOLI.Utils.rand = function() {
	return Math.floor(Math.random() * 2147483647)
};
GEMIOLI.Utils.randInt = function(b, a) {
	return Math.floor(Math.random() * (a - b + 1)) + b
};
GEMIOLI.Utils.isMobile = function() {
	var a = isMobile.any;
	return function() {
		return a
	}
}();
GEMIOLI.Utils.LOCAL_STORAGE_PATH = "com.gemioli.tombrunner.";
GEMIOLI.Utils.getLocalStorage = function() {
	var a;
	try {
		if ("localStorage" in window && window.localStorage !== null) {
			a = window.localStorage;
			a.test = 1
		} else {
			a = {}
		}
	} catch (b) {
		a = {}
	}
	return function() {
		return a
	}
}();
GEMIOLI.Utils.resetLocalStorage = function() {
	var a = GEMIOLI.Utils.getLocalStorage();
	for (var b in a) {
		delete a[b]
	}
};
GEMIOLI.Utils.getBool = function(c, b) {
	var a = GEMIOLI.Utils.getLocalStorage();
	return a[GEMIOLI.Utils.LOCAL_STORAGE_PATH + c] !== undefined ? (parseInt(a[GEMIOLI.Utils.LOCAL_STORAGE_PATH + c]) !== 0) : b
};
GEMIOLI.Utils.setBool = function(c, b) {
	var a = GEMIOLI.Utils.getLocalStorage();
	a[GEMIOLI.Utils.LOCAL_STORAGE_PATH + c] = b ? 1 : 0;
	return b
};
GEMIOLI.Utils.getInt = function(c, b) {
	var a = GEMIOLI.Utils.getLocalStorage();
	return a[GEMIOLI.Utils.LOCAL_STORAGE_PATH + c] !== undefined ? parseInt(a[GEMIOLI.Utils.LOCAL_STORAGE_PATH + c]) : b
};
GEMIOLI.Utils.setInt = function(c, b) {
	var a = GEMIOLI.Utils.getLocalStorage();
	a[GEMIOLI.Utils.LOCAL_STORAGE_PATH + c] = b;
	return b
};
GEMIOLI.Utils.openLink = function(a) {
	window.open(a, "_blank")
};
GEMIOLI.Cache = function() {
	this.files = {}
};
GEMIOLI.Cache.prototype = {
	constructor: GEMIOLI.Cache,
	add: function(b, a) {
		this.files[b] = a
	},
	get: function(a) {
		return this.files[a]
	},
	remove: function(a) {
		delete this.files[a]
	},
	clear: function() {
		this.files = {}
	}
};
GEMIOLI.Mapper = function() {
	this.map = new GEMIOLI.Cache();
	this.mapFunctions = []
};
GEMIOLI.Mapper.prototype = {
	constructor: GEMIOLI.Mapper,
	get: function(b) {
		var a;
		for (var c = 0; c < this.mapFunctions.length; ++c) {
			a = this.mapFunctions[c](b);
			if (a != null) {
				return this.get(a)
			}
		}
		a = this.map.get(b);
		if (a) {
			return this.get(b)
		}
		return b
	},
	set: function(a, b) {
		this.map.add(a, b)
	}
};
GEMIOLI.Loader = function() {
	GEMIOLI.Loader.loaders.push(this);
	if (!GEMIOLI.Application.hasEventListener("update", GEMIOLI.Loader.update)) {
		GEMIOLI.Application.addEventListener("update", GEMIOLI.Loader.update)
	}
};
GEMIOLI.Loader.prototype = {
	getQueueLength: function() {
		return 0
	}
};
GEMIOLI.Loader.loadFunctions = [];
GEMIOLI.Loader.loading = [];
GEMIOLI.Loader.loaders = [];
GEMIOLI.Loader.getQueueLength = function() {
	var a = 0;
	for (var b = 0; b < GEMIOLI.Loader.loaders.length; ++b) {
		a += GEMIOLI.Loader.loaders[b].getQueueLength()
	}
	return a
};
GEMIOLI.Loader.update = function(b) {
	if (GEMIOLI.Loader.loading.length < 6) {
		if (GEMIOLI.Loader.loadFunctions.length > 0) {
			var a = GEMIOLI.Loader.loadFunctions.shift();
			GEMIOLI.Loader.loading.push(a);
			a()
		}
	}
};
GEMIOLI.Loader.finishLoading = function(a) {
	for (var b = 0; b < GEMIOLI.Loader.loading.length; ++b) {
		if (GEMIOLI.Loader.loading[b] === a) {
			GEMIOLI.Loader.loading.splice(b, 1);
			return
		}
	}
};
GEMIOLI.QueryString = function() {
	var d = {};
	var c = window.location.search.substring(1);
	var e = c.split("&");
	for (var b = 0; b < e.length; b++) {
		var f = e[b].split("=");
		if (typeof d[f[0]] === "undefined") {
			d[f[0]] = f[1]
		} else {
			if (typeof d[f[0]] === "string") {
				var a = [d[f[0]], f[1]];
				d[f[0]] = a
			} else {
				d[f[0]].push(f[1])
			}
		}
	}
	return d
}();
GEMIOLI.doLoadDone = false;
GEMIOLI.doLoad = function() {
	if (GEMIOLI.doLoadDone) {
		return
	}
	GEMIOLI.doLoadDone = true;
	GEMIOLI.QueryString.container = document.getElementById("container");
	GEMIOLI.Application.init(GEMIOLI.QueryString)
};
if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", function() {
		GEMIOLI.doLoad()
	}, false)
} else {
	if (document.attachEvent) {
		if (document.documentElement.doScroll && window == window.top) {
			function tryScroll() {
				if (GEMIOLI.doLoadDone) {
					return
				}
				if (!document.body) {
					return
				}
				try {
					document.documentElement.doScroll("left");
					GEMIOLI.doLoad()
				} catch (a) {
					setTimeout(tryScroll, 0)
				}
			}
			tryScroll()
		}
		document.attachEvent("onreadystatechange", function() {
			if (document.readyState === "complete") {
				GEMIOLI.doLoad()
			}
		})
	}
}
if (window.addEventListener) {
	window.addEventListener("load", GEMIOLI.doLoad, false)
} else {
	if (window.attachEvent) {
		window.attachEvent("onload", GEMIOLI.doLoad)
	} else {
		if (window.onload) {
			window.onload = GEMIOLI.doLoad
		} else {
			if (document.body) {
				document.body.onload = GEMIOLI.doLoad
			}
		}
	}
}
GEMIOLI.Application = {};
GEMIOLI.Application.prototype = {
	constructor: GEMIOLI.Application
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.Application);
GEMIOLI.Application.init = function(e) {
	if (e.reset) {
		GEMIOLI.Utils.resetLocalStorage()
	}
	if (!Detector.webgl) {
		Detector.addGetWebGLMessage({
			parent: e.container
		});
		return
	}
	GEMIOLI.Application.DEBUG = e.debug || false;
	GEMIOLI.Application.NOADS = ("noads" in e);
	GEMIOLI.Application.WIDTH = e.width || 1536;
	GEMIOLI.Application.HEIGHT = e.height || 2048;
	GEMIOLI.Application.innerWidth = window.innerWidth;
	GEMIOLI.Application.innerHeight = window.innerHeight;
	var k = new THREE.WebGLRenderer();
	k.autoClear = false;
	k.setClearColor(e.color || 135194, e.alpha || 1);
	k.setSize(GEMIOLI.Application.innerWidth, GEMIOLI.Application.innerHeight);
	e.container.appendChild(k.domElement);
	GEMIOLI.Renderer = k;
	var g = false;
	GEMIOLI.Application.crash = function(n) {
		if (!g) {
			g = true;
			if (e.container === k.domElement.parentNode) {
				e.container.removeChild(k.domElement)
			}
			Detector.addGetWebGLMessage({
				parent: e.container,
				message: n
			})
		}
	};
	GEMIOLI.Mapper = new GEMIOLI.Mapper();
	GEMIOLI.Application.graphicsScale = 0.5;
	var b = "img/0.5/";
	if (GEMIOLI.Utils.isMobile()) {
		var a = window.innerHeight * window.devicePixelRatio / GEMIOLI.Application.HEIGHT;
		if (a <= 0.25) {
			GEMIOLI.Application.graphicsScale = 0.25;
			b = "img/0.25/"
		}
	}
	if (window.console && window.console.log) {
		console.log("Window innerHeight: " + window.innerHeight + " Device Pixel Ratio: " + window.devicePixelRatio + " App Height: " + GEMIOLI.Application.HEIGHT + " aspect: " + a + " Image Prefix: " + b)
	}
	GEMIOLI.Mapper.mapFunctions.push(function(n) {
		if (SpilData.logoData && (n === SpilData.logoData.image)) {
			return null
		}
		var o = GEMIOLI.Utils.path(n).ext;
		if ((o === "png" || o === "jpg") && (n.indexOf(b) === -1)) {
			return b + n
		}
		return null
	});
	var c = "sound/desktop/";
	if (GEMIOLI.Utils.isMobile()) {
		c = "sound/mobile/"
	}
	if (window.console && window.console.log) {
		console.log("Sound prefix: " + c)
	}
	GEMIOLI.Mapper.mapFunctions.push(function(n) {
		var o = GEMIOLI.Utils.path(n).ext;
		if ((o === "ogg" || o === "mp3") && (n.indexOf(c) === -1)) {
			return c + n
		}
		return null
	});
	GEMIOLI.ImageLoader = new GEMIOLI.ImageLoader();
	GEMIOLI.XHRLoader = new GEMIOLI.XHRLoader();
	GEMIOLI.SoundLoader = new GEMIOLI.SoundLoader();
	GEMIOLI.TextureLoader = new GEMIOLI.TextureLoader();
	THREE.Loader.Handlers.add(/\.jpg$/i, GEMIOLI.TextureLoader);
	THREE.Loader.Handlers.add(/\.png$/i, GEMIOLI.TextureLoader);
	GEMIOLI.ModelLoader = new GEMIOLI.ModelLoader();
	GEMIOLI.ModelBatchLoader = new GEMIOLI.ModelBatchLoader();
	GEMIOLI.AtlasLoader = new GEMIOLI.AtlasLoader();
	GEMIOLI.FontLoader = new GEMIOLI.FontLoader();
	var l = {};
	var h = [];
	GEMIOLI.Application.pushLayer = function(n) {
		if (n) {
			if (h.length > 0) {
				var o = h[h.length - 1];
				for (activePointer in l) {
					if (o.dispatchEvent) {
						o.dispatchEvent({
							type: "pointercancel",
							pointerId: l[activePointer]
						})
					}
				}
				l = {}
			}
			h.push(n);
			if (n.resize) {
				n.resize()
			}
			if (n.dispatchEvent) {
				n.dispatchEvent({
					type: "added",
					local: true
				})
			}
		}
	};
	GEMIOLI.Application.popLayer = function() {
		var n = h.pop();
		for (activePointer in l) {
			if (n.dispatchEvent) {
				n.dispatchEvent({
					type: "pointercancel",
					pointerId: l[activePointer]
				})
			}
		}
		l = {};
		if (n && n.dispatchEvent) {
			n.dispatchEvent({
				type: "removed",
				local: true
			})
		}
	};
	GEMIOLI.Application.removeLayer = function(n) {
		if (h.length > 0 && (h[h.length - 1] === n)) {
			for (activePointer in l) {
				if (n.dispatchEvent) {
					n.dispatchEvent({
						type: "pointercancel",
						pointerId: l[activePointer]
					})
				}
			}
			l = {}
		}
		for (i = 0; i < h.length; ++i) {
			if (h[i] === n) {
				h.splice(i, 1);
				break
			}
		}
		if (n && n.dispatchEvent) {
			n.dispatchEvent({
				type: "removed",
				local: true
			})
		}
	};
	GEMIOLI.Application.clearLayers = function() {
		var n, o = [];
		for (n = 0; n < h.length; ++n) {
			o.push(h[n])
		}
		for (n = 0; n < o.length; ++n) {
			GEMIOLI.Application.popLayer()
		}
	};
	GEMIOLI.Application.isLayerOnScreen = function(n) {
		for (i = 0; i < h.length; ++i) {
			if (n === h[i]) {
				return true
			}
		}
		return false
	};
	GEMIOLI.Application.setHandCursor = function(n) {
		e.container.style.cursor = n ? "pointer" : "auto"
	};
	GEMIOLI.Application.resize = function(p) {
		if (GEMIOLI.Application.innerWidth === window.innerWidth && GEMIOLI.Application.innerHeight === window.innerHeight) {
			return
		}
		console.log("Resize " + window.innerWidth + "x" + window.innerHeight);
		GEMIOLI.Application.innerWidth = window.innerWidth;
		GEMIOLI.Application.innerHeight = window.innerHeight;
		GEMIOLI.Renderer.setSize(GEMIOLI.Application.innerWidth, GEMIOLI.Application.innerHeight);
		GEMIOLI.Application.dispatchEvent({
			type: "resize"
		});
		var n, o = [];
		for (n = 0; n < h.length; ++n) {
			o.push(h[n])
		}
		for (n = 0; n < o.length; ++n) {
			if (o[n].resize) {
				o[n].resize()
			}
		}
	};
	window.addEventListener("resize", GEMIOLI.Application.resize, false);
	window.addEventListener("orientationchange", GEMIOLI.Application.resize, false);
	k.domElement.addEventListener("pointerdown", function(o) {
		if (h.length > 0) {
			l[o.pointerId] = o.pointerId;
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent({
					type: "pointerdown",
					pointerId: o.pointerId,
					x: o.clientX,
					y: o.clientY
				})
			}
		}
	}, false);
	k.domElement.addEventListener("pointermove", function(o) {
		if (h.length > 0) {
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent({
					type: "pointermove",
					pointerId: o.pointerId,
					down: l[o.pointerId] !== undefined,
					x: o.clientX,
					y: o.clientY
				})
			}
		}
	}, false);
	k.domElement.addEventListener("pointerup", function(o) {
		if (h.length > 0) {
			delete l[o.pointerId];
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent({
					type: "pointerup",
					pointerId: o.pointerId,
					x: o.clientX,
					y: o.clientY
				})
			}
		}
	}, false);
	k.domElement.addEventListener("pointercancel", function(o) {
		if (h.length > 0) {
			delete l[o.pointerId];
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent({
					type: "pointercancel",
					pointerId: o.pointerId
				})
			}
		}
	}, false);
	k.domElement.addEventListener("pointerout", function(o) {
		if (h.length > 0) {
			delete l[o.pointerId];
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent({
					type: "pointercancel",
					pointerId: o.pointerId
				})
			}
		}
	}, false);
	document.addEventListener("keydown", function(o) {
		if (h.length > 0) {
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent(o)
			}
		}
	}, false);
	document.addEventListener("keyup", function(o) {
		if (h.length > 0) {
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent(o)
			}
		}
	}, false);
	visibilityChangeFunc = function(n) {
		if (n.type === "pagehide" || n.type === "blur" || n.type === "pageshow" || n.type === "focus") {
			if (n.type === "pagehide" || n.type === "blur") {
				GEMIOLI.Application.dispatchEvent({
					type: "blur"
				})
			} else {
				if (n.type === "pageshow" || n.type === "focus") {
					GEMIOLI.Application.dispatchEvent({
						type: "focus"
					})
				}
			}
			return
		}
		if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden || n.type === "pause") {
			GEMIOLI.Application.dispatchEvent({
				type: "blur"
			})
		} else {
			GEMIOLI.Application.dispatchEvent({
				type: "focus"
			})
		}
	};
	var m = null;
	if (document.webkitHidden !== undefined) {
		m = "webkitvisibilitychange"
	} else {
		if (document.mozHidden !== undefined) {
			m = "mozvisibilitychange"
		} else {
			if (document.msHidden !== undefined) {
				m = "msvisibilitychange"
			} else {
				if (document.hidden !== undefined) {
					m = "visibilitychange"
				} else {
					m = null
				}
			}
		}
	}
	if (m) {
		document.addEventListener(m, visibilityChangeFunc, false)
	}
	window.onpagehide = visibilityChangeFunc;
	window.onpageshow = visibilityChangeFunc;
	window.onblur = visibilityChangeFunc;
	window.onfocus = visibilityChangeFunc;
	GEMIOLI.Application.addEventListener("blur", function(o) {
		GEMIOLI.SoundLoader.mute();
		if (h.length > 0) {
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent(o)
			}
		}
	});
	GEMIOLI.Application.addEventListener("focus", function(o) {
		GEMIOLI.SoundLoader.unmute();
		if (h.length > 0) {
			var n = h[h.length - 1];
			if (n.dispatchEvent) {
				n.dispatchEvent(o)
			}
		}
	});
	var f, d = new THREE.Clock(true),
		j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(n) {
			window.setTimeout(n, 1000 / 60)
		};
	f = function() {
		GEMIOLI.Application.resize();
		var p = d.getDelta();
		if (p > 1 / 30) {
			p = 1 / 30
		}
		if (GEMIOLI.Application.isLayerOnScreen(GEMIOLI.Application.rotate)) {
			p = 0
		}
		var q = d.elapsedTime;
		var n, o = [];
		for (n = 0; n < h.length; ++n) {
			o.push(h[n])
		}
		for (n = 0; n < o.length; ++n) {
			if (o[n].update) {
				o[n].update(p, q)
			}
		}
		GEMIOLI.Application.dispatchEvent({
			type: "update",
			dt: p,
			time: q
		});
		o = [];
		for (n = 0; n < h.length; ++n) {
			o.push(h[n])
		}
		GEMIOLI.Renderer.clear(false, true, false);
		for (n = 0; n < o.length; ++n) {
			if (o[n].render) {
				o[n].render()
			}
		}
		GEMIOLI.Application.setHandCursor(GEMIOLI.Button.inHover > 0);
		GEMIOLI.Button.inHover = 0;
		j(f)
	};
	GEMIOLI.Application.pushLayer(new GEMIOLI.Preloader());
	f()
};
GEMIOLI.Image = function(a) {
	this.image = a;
	a.crossOrigin = ""
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.Image.prototype);
GEMIOLI.ImageLoader = function() {
	GEMIOLI.Loader.call(this);
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache()
};
GEMIOLI.ImageLoader.prototype = Object.create(GEMIOLI.Loader.prototype);
GEMIOLI.ImageLoader.prototype.load = function(a, g, e) {
	var d = this.loaded.get(a);
	if (d) {
		if (g) {
			g(d)
		}
		return d
	}
	var b = this.loading.get(a);
	if (b) {
		if (g) {
			b.addEventListener("load", function(l) {
				b.removeEventListener("load", arguments.callee);
				g(b)
			}, false)
		}
		if (e) {
			b.addEventListener("error", function(l) {
				b.removeEventListener("error", arguments.callee);
				e(l)
			}, false)
		}
		return b
	}
	var f = this;
	var c = new GEMIOLI.Image(document.createElement("img"));
	this.loading.add(a, c);
	if (g) {
		c.addEventListener("load", function(l) {
			c.removeEventListener("load", arguments.callee);
			g(c)
		}, false)
	}
	if (e) {
		c.addEventListener("error", function(l) {
			c.removeEventListener("error", arguments.callee);
			e(l)
		}, false)
	}
	var k = function() {
		c.tries++;
		c.image.src = GEMIOLI.Mapper.get(a)
	};
	var h = function(l) {
		c.image.clearListeners();
		GEMIOLI.Loader.finishLoading(k);
		f.loading.remove(a);
		f.loaded.add(a, c);
		c.dispatchEvent({
			type: "load"
		})
	};
	var j = function(l) {
		GEMIOLI.Loader.finishLoading(k);
		if (c.tries > 3) {
			c.image.clearListeners();
			f.loading.remove(a);
			c.dispatchEvent(l);
			GEMIOLI.Application.crash("Can't load [" + a + "] from [" + GEMIOLI.Mapper.get(a) + "]. Please refresh the page.")
		} else {
			GEMIOLI.Loader.loadFunctions.push(k)
		}
	};
	c.tries = 0;
	c.image.addEventListener("load", h, false);
	c.image.addEventListener("error", j, false);
	c.image.clearListeners = function() {
		this.removeEventListener("load", h);
		this.removeEventListener("error", j);
		delete c.image.clearListeners
	};
	GEMIOLI.Loader.loadFunctions.push(k);
	return c
};
GEMIOLI.ImageLoader.prototype.remove = function(b) {
	var a = this.loaded.get(b);
	if (a) {
		this.loaded.remove(b);
		a.image.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		a.image = null;
		return
	}
	var c = this.loading.get(b);
	if (c) {
		this.loading.remove(b);
		c.image.clearListeners();
		c.image.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		c.image = null;
		return
	}
};
GEMIOLI.ImageLoader.prototype.getQueueLength = function() {
	return Object.keys(this.loading.files).length
};
GEMIOLI.XHRRequest = function(a) {
	this.request = a;
	this.url = ""
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.XHRRequest.prototype);
GEMIOLI.XHRLoader = function() {
	GEMIOLI.Loader.call(this);
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache()
};
GEMIOLI.XHRLoader.prototype = Object.create(GEMIOLI.Loader.prototype);
GEMIOLI.XHRLoader.prototype.constructor = GEMIOLI.XHRLoader;
GEMIOLI.XHRLoader.prototype.load = function(a, g, e) {
	var d = this.loaded.get(a);
	if (d) {
		if (g) {
			g(d)
		}
		return d
	}
	var b = this.loading.get(a);
	if (b) {
		if (g) {
			b.addEventListener("load", function(l) {
				b.removeEventListener("load", arguments.callee);
				g(b)
			}, false)
		}
		if (e) {
			b.addEventListener("error", function(l) {
				b.removeEventListener("error", arguments.callee);
				e(l)
			}, false)
		}
		return b
	}
	var f = this;
	var c = new GEMIOLI.XHRRequest(new XMLHttpRequest());
	c.url = a;
	this.loading.add(a, c);
	if (g) {
		c.addEventListener("load", function(l) {
			c.removeEventListener("load", arguments.callee);
			g(c)
		}, false)
	}
	if (e) {
		c.addEventListener("error", function(l) {
			c.removeEventListener("error", arguments.callee);
			e(l)
		}, false)
	}
	var k = function() {
		c.tries++;
		c.request.abort();
		c.request.open("GET", GEMIOLI.Mapper.get(a), true);
		c.request.send(null)
	};
	var h = function(l) {
		GEMIOLI.Loader.finishLoading(k);
		if ((c.request.status === 200) || (c.request.status === 304) || (c.request.status === 0)) {
			c.request.clearListeners();
			f.loading.remove(a);
			f.loaded.add(a, c);
			c.dispatchEvent({
				type: "load"
			})
		} else {
			if (c.tries > 3) {
				c.request.clearListeners();
				f.loading.remove(a);
				c.dispatchEvent({
					type: "error",
					message: c.request.statusText
				});
				GEMIOLI.Application.crash("Can't load [" + a + "] from [" + GEMIOLI.Mapper.get(a) + "]. Please refresh the page.")
			} else {
				GEMIOLI.Loader.loadFunctions.push(k)
			}
		}
	};
	var j = function(l) {
		GEMIOLI.Loader.finishLoading(k);
		if (c.tries > 3) {
			c.request.clearListeners();
			f.loading.remove(a);
			c.dispatchEvent(l);
			GEMIOLI.Application.crash("Can't load [" + a + "] from [" + GEMIOLI.Mapper.get(a) + "]. Please refresh the page.")
		} else {
			GEMIOLI.Loader.loadFunctions.push(k)
		}
	};
	c.tries = 0;
	c.request.addEventListener("load", h, false);
	c.request.addEventListener("error", j, false);
	c.request.clearListeners = function() {
		this.removeEventListener("load", h);
		this.removeEventListener("error", j);
		delete c.request.clearListeners
	};
	GEMIOLI.Loader.loadFunctions.push(k);
	return c
};
GEMIOLI.XHRLoader.prototype.remove = function(b) {
	var a = this.loaded.get(b);
	if (a) {
		this.loaded.remove(b);
		a.request.abort();
		a.request = null;
		return
	}
	var c = this.loading.get(b);
	if (c) {
		this.loading.remove(b);
		c.request.clearListeners();
		c.request.abort();
		c.request = null;
		return
	}
};
GEMIOLI.XHRLoader.prototype.getQueueLength = function() {
	return Object.keys(this.loading.files).length
};
GEMIOLI.Sound = function(b) {
	this.id = b;
	this.instances = [];
	var a = this;
	this.onComplete = function(c) {
		c.target.removeEventListener("complete", a.onComplete, false);
		a.instances.push(c.target)
	};
	this.seed = GEMIOLI.SoundLoader.webaudio ? null : GEMIOLI.Utils.getInt("soundSeed", 1);
	if (!GEMIOLI.SoundLoader.webaudio) {
		GEMIOLI.Utils.setInt("soundSeed", this.seed + 1)
	}
};
GEMIOLI.Sound.prototype.constructor = GEMIOLI.Sound;
GEMIOLI.Sound.prototype.play = function(e, b) {
	if (!GEMIOLI.SoundLoader.enabled) {
		return this.defaultInstance
	}
	var a = this.instances.pop();
	if (!a) {
		a = createjs.Sound.createInstance(this.atlas ? this.atlas : this.id, this.atlas ? this.start : null, this.atlas ? this.end - this.start : null);
		var c = a.stop;
		var d = this;
		a.stop = function() {
			this.removeEventListener("complete", d.onComplete, false);
			d.instances.push(this);
			c.call(this)
		}
	}
	a.addEventListener("complete", this.onComplete, false);
	a.play(createjs.Sound.INTERRUPT_ANY, 0, e ? e * 1000 : 0, (b || false) ? -1 : 0);
	return a
};
GEMIOLI.Sound.prototype.defaultInstance = {
	stop: function() {},
	volume: 0,
	addEventListener: function(b, c, a) {},
	removeEventListener: function(b, c, a) {}
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.Sound.prototype);
GEMIOLI.SoundLoader = function() {
	GEMIOLI.Loader.call(this);
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache();
	this.atlasesLoaded = new GEMIOLI.Cache();
	this.atlasesLoading = new GEMIOLI.Cache();
	this.enabled = false;
	this.webaudio = false;
	if (GEMIOLI.Utils.isMobile()) {
		this.enabled = createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
		if (this.enabled) {
			this.webaudio = true
		}
	} else {
		this.enabled = createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
		if (this.enabled) {
			this.webaudio = true
		} else {
			this.enabled = createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin])
		}
	}
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.setVolume(GEMIOLI.Utils.getBool("sound", true) ? 1 : 0);
	if (window.console && window.console.log) {
		console.log("Sound: " + this.enabled, "WebAudio: " + this.webaudio)
	}
};
GEMIOLI.SoundLoader.prototype = Object.create(GEMIOLI.Loader.prototype);
GEMIOLI.SoundLoader.prototype.constructor = GEMIOLI.SoundLoader;
GEMIOLI.SoundLoader.prototype.mute = function() {
	createjs.Sound.setVolume(0)
};
GEMIOLI.SoundLoader.prototype.unmute = function() {
	createjs.Sound.setVolume(GEMIOLI.Utils.getBool("sound", true) ? 1 : 0)
};
GEMIOLI.SoundLoader.prototype.load = function(b, a, g, e) {
	var d = this.loaded.get(b);
	if (d) {
		if (g) {
			g(d)
		}
		return d
	}
	var c = this.loading.get(b);
	if (c) {
		if (g) {
			c.addEventListener("load", function(m) {
				c.removeEventListener("load", arguments.callee, false);
				g(c)
			}, false)
		}
		if (e) {
			c.addEventListener("error", function(m) {
				c.removeEventListener("error", arguments.callee, false);
				e(m)
			}, false)
		}
		return c
	}
	var f = this;
	var k = new GEMIOLI.Sound(b);
	this.loading.add(b, k);
	if (g) {
		k.addEventListener("load", function(m) {
			k.removeEventListener("load", arguments.callee, false);
			g(k)
		}, false)
	}
	if (e) {
		k.addEventListener("error", function(m) {
			k.removeEventListener("error", arguments.callee, false);
			e(m)
		}, false)
	}
	var l = function() {
		if (GEMIOLI.SoundLoader.enabled) {
			createjs.Sound.removeSound(b);
			k.tries++;
			createjs.Sound.registerSound(GEMIOLI.Mapper.get(a) + (k.seed ? "?s=" + k.seed : ""), b)
		} else {
			createjs.Sound.dispatchEvent({
				type: "fileload",
				id: b
			})
		}
	};
	var h = function(m) {
		if (m.id === b) {
			k.clearListeners();
			GEMIOLI.Loader.finishLoading(l);
			f.loading.remove(b);
			f.loaded.add(b, k);
			k.dispatchEvent({
				type: "load"
			})
		}
	};
	var j = function(m) {
		if (m.id === b) {
			GEMIOLI.Loader.finishLoading(l);
			if (k.tries > 3) {
				k.clearListeners();
				f.loading.remove(b);
				k.dispatchEvent({
					type: "error",
					message: "unknown"
				});
				GEMIOLI.Application.crash("Can't load [" + b + "] from [" + a + "]. Please refresh the page.")
			} else {
				GEMIOLI.Loader.loadFunctions.push(l)
			}
		}
	};
	k.tries = 0;
	createjs.Sound.addEventListener("fileload", h, false);
	createjs.Sound.addEventListener("fileerror", j, false);
	k.clearListeners = function() {
		createjs.Sound.removeEventListener("fileload", h, false);
		createjs.Sound.removeEventListener("fileerror", j, false);
		delete k.clearListeners
	};
	GEMIOLI.Loader.loadFunctions.push(l);
	return k
};
GEMIOLI.SoundAtlas = function(a, b) {
	this.url = a;
	this.soundUrl = b
};
GEMIOLI.SoundAtlas.prototype = {
	constructor: GEMIOLI.SoundAtlas
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.SoundAtlas.prototype);
GEMIOLI.SoundLoader.prototype.loadAtlas = function(c, g, d, f) {
	var b = this.atlasesLoaded.get(c);
	if (b) {
		if (d) {
			d(b)
		}
		return b
	}
	var h = this.atlasesLoading.get(c);
	if (h) {
		if (d) {
			h.addEventListener("load", function(j) {
				h.removeEventListener("load", arguments.callee, false);
				d(h)
			}, false)
		}
		if (f) {
			h.addEventListener("error", function(j) {
				h.removeEventListener("error", arguments.callee, false);
				f(j)
			}, false)
		}
		return h
	}
	var e = this;
	var a = new GEMIOLI.SoundAtlas(c, g);
	this.atlasesLoading.add(c, a);
	if (d) {
		a.addEventListener("load", function(j) {
			a.removeEventListener("load", arguments.callee, false);
			d(a)
		}, false)
	}
	if (f) {
		a.addEventListener("error", function(j) {
			a.removeEventListener("error", arguments.callee, false);
			f(j)
		}, false)
	}
	GEMIOLI.XHRLoader.load(c, function(j) {
		GEMIOLI.SoundLoader.load(g, g, function(p) {
			var k = JSON.parse(j.request.response),
				n;
			for (var o = 0, m = k.length; o < m; ++o) {
				n = new GEMIOLI.Sound(k[o].id);
				n.atlas = g;
				n.start = k[o].s * 1000;
				n.end = k[o].e * 1000;
				e.loaded.add(k[o].id, n)
			}
			if (e.atlasesLoading.get(c)) {
				e.atlasesLoading.remove(c);
				e.atlasesLoaded.add(c, a)
			}
			a.dispatchEvent({
				type: "load"
			})
		}, function(k) {
			if (e.atlasesLoading.get(c)) {
				e.atlasesLoading.remove(c)
			}
			a.dispatchEvent(k)
		})
	}, function(j) {
		e.atlasesLoading.remove(c);
		a.dispatchEvent(j)
	});
	return a
};
GEMIOLI.SoundLoader.prototype.getQueueLength = function() {
	return Object.keys(this.loading.files).length
};
GEMIOLI.TextureLoader = function() {
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache();
	this.loaded.add(GEMIOLI.TextureLoader.DEFAULT_ID, GEMIOLI.TextureLoader.DEFAULT)
};
GEMIOLI.TextureLoader.prototype = {
	constructor: GEMIOLI.TextureLoader,
	load: function(b, c, f) {
		var a = this.loaded.get(b);
		if (a) {
			if (c) {
				c(a)
			}
			return a
		}
		var g = this.loading.get(b);
		if (g) {
			if (c) {
				g.addEventListener("load", function(h) {
					g.removeEventListener("load", arguments.callee);
					c(g)
				}, false)
			}
			if (f) {
				g.addEventListener("error", function(h) {
					g.removeEventListener("error", arguments.callee);
					f(h)
				}, false)
			}
			return g
		}
		var e = this;
		var d = new THREE.Texture();
		d.minFilter = d.magFilter = THREE.LinearFilter;
		d.generateMipmaps = false;
		if (c) {
			d.addEventListener("load", function(h) {
				d.removeEventListener("load", arguments.callee);
				c(d)
			}, false)
		}
		if (f) {
			d.addEventListener("error", function(h) {
				d.removeEventListener("error", arguments.callee);
				f(h)
			}, false)
		}
		this.loading.add(b, d);
		d.sourceFile = b;
		GEMIOLI.ImageLoader.load(b, function(h) {
			d.image = h.image;
			d.needsUpdate = true;
			if (e.loading.get(b)) {
				e.loading.remove(b);
				e.loaded.add(b, d);
				GEMIOLI.Renderer.uploadTexture(d)
			}
			d.dispatchEvent({
				type: "load"
			})
		}, function(h) {
			if (e.loading.get(b)) {
				e.loading.remove(b)
			}
			d.dispatchEvent(h)
		});
		return d
	},
	DEFAULT: new THREE.Texture(),
	DEFAULT_ID: "default"
};
GEMIOLI.Model = function(b, a) {
	this.geometry = b;
	this.materials = a;
	this.url = ""
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.Model.prototype);
GEMIOLI.ModelLoader = function() {
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache();
	this.JSONLoader = new THREE.JSONLoader()
};
GEMIOLI.ModelLoader.prototype = {
	constructor: GEMIOLI.ModelLoader,
	load: function(c, d, f) {
		var b = this.loaded.get(c);
		if (b) {
			if (d) {
				d(b)
			}
			return b
		}
		var g = this.loading.get(c);
		if (g) {
			if (d) {
				g.addEventListener("load", function(h) {
					g.removeEventListener("load", arguments.callee);
					d(g)
				}, false)
			}
			if (f) {
				g.addEventListener("error", function(h) {
					g.removeEventListener("error", arguments.callee);
					f(h)
				}, false)
			}
			return g
		}
		var e = this;
		var a = new GEMIOLI.Model([], []);
		a.url = c;
		this.loading.add(c, a);
		if (d) {
			a.addEventListener("load", function(h) {
				a.removeEventListener("load", arguments.callee);
				d(a)
			}, false)
		}
		if (f) {
			a.addEventListener("error", function(h) {
				a.removeEventListener("error", arguments.callee);
				f(h)
			}, false)
		}
		GEMIOLI.XHRLoader.load(c, function(k) {
			var j = JSON.parse(k.request.response);
			GEMIOLI.XHRLoader.remove(c);
			if (j.metadata !== undefined && j.metadata.type === "scene") {
				if (e.loading.get(c)) {
					e.loading.remove(c)
				}
				a.dispatchEvent({
					type: "error",
					message: 'Model data from "' + c + '" seems to be a Scene, not a model.'
				})
			} else {
				if (e.loading.get(c)) {
					e.loading.remove(c);
					e.loaded.add(c, a)
				}
				var h = e.JSONLoader.parse(j, GEMIOLI.Utils.path(c).dir + "/");
				a.geometry = h.geometry;
				a.materials = h.materials;
				a.dispatchEvent({
					type: "load"
				})
			}
		}, function(h) {
			if (e.loading.get(c)) {
				e.loading.remove(c)
			}
			a.dispatchEvent(h)
		});
		return a
	}
};
GEMIOLI.ModelBatch = function() {
	this.models = {};
	this.url = ""
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.ModelBatch.prototype);
GEMIOLI.ModelBatchLoader = function() {
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache();
	this.JSONLoader = new THREE.JSONLoader()
};
GEMIOLI.ModelBatchLoader.prototype = {
	constructor: GEMIOLI.ModelBatchLoader,
	load: function(c, a, d, f) {
		var b = this.loaded.get(c);
		if (b) {
			if (d) {
				d(b)
			}
			return b
		}
		var h = this.loading.get(c);
		if (h) {
			if (d) {
				h.addEventListener("load", function(j) {
					h.removeEventListener("load", arguments.callee);
					d(h)
				}, false)
			}
			if (f) {
				h.addEventListener("error", function(j) {
					h.removeEventListener("error", arguments.callee);
					f(j)
				}, false)
			}
			return h
		}
		var e = this;
		var g = new GEMIOLI.ModelBatch();
		g.url = c;
		this.loading.add(c, g);
		if (d) {
			g.addEventListener("load", function(j) {
				g.removeEventListener("load", arguments.callee);
				d(g)
			}, false)
		}
		if (f) {
			g.addEventListener("error", function(j) {
				g.removeEventListener("error", arguments.callee);
				f(j)
			}, false)
		}
		GEMIOLI.XHRLoader.load(c, function(k) {
			var ad = JSON.parse(k.request.response);
			GEMIOLI.XHRLoader.remove(c);
			var Y, ak, D, N, ab, H, P;

			function X(l, j) {
				return l & (1 << j)
			}
			for (var C in ad) {
				var ar = GEMIOLI.Utils.path(c).dir + "/";
				var an = ar + C;
				var aq = ad[C];
				var aa = null;
				var ah = new THREE.MeshBasicMaterial();
				if (aq.materials !== undefined && aq.materials.length !== 0) {
					var au = aq.materials[0];
					if (au.mapDiffuse) {
						var o = ar + au.mapDiffuse;
						if (a && (aa = a.get(au.mapDiffuse))) {
							ah.map = aa.texture
						} else {
							var M = THREE.Loader.Handlers.get(o);
							if (M !== null) {
								ah.map = M.load(o)
							}
							if (ah.map) {
								ah.map.sourceFile = au.mapDiffuse
							}
						}
					}
				}
				var v = aq.vertices;
				var u = aq.normals;
				var ae = aq.uvs[0];
				if (aa) {
					var E = aa.u1;
					var r = aa.u2 - aa.u1;
					var at = aa.v1;
					var q = aa.v2 - aa.v1;
					for (var aj = 0, ag = ae.length; aj < ag; aj += 2) {
						ae[aj] = ae[aj] * r + E;
						ae[aj + 1] = (1 - ae[aj + 1]) * q + at
					}
				}
				var R = aq.faces;
				var m = aq.skinWeights;
				var G = aq.skinIndices;
				var ac = (aq.influencesPerVertex !== undefined) ? aq.influencesPerVertex : 2;
				var B = [];
				var J = [];
				var T = [];
				var af = [];
				var Z = [];
				var p = [];
				var A = [];
				var aj = 0,
					ai, ap = R.length,
					av, ao, am, al, L, K, I, U, S, Q, W, t, O;
				var V = function(l, aw, j) {
					return (B[3 * l] === v[3 * aw]) && (B[3 * l + 1] === v[3 * aw + 1]) && (B[3 * l + 2] === v[3 * aw + 2]) && (Z[2 * l] === ae[2 * j]) && (Z[2 * l + 1] === ae[2 * j + 1])
				};
				var n = function(ax, aw, j) {
					var l = B.length / 3;
					B[3 * l] = v[3 * ax];
					B[3 * l + 1] = v[3 * ax + 1];
					B[3 * l + 2] = v[3 * ax + 2];
					Z[2 * l] = ae[2 * aw];
					Z[2 * l + 1] = ae[2 * aw + 1];
					if (m) {
						T[4 * l] = m[ac * ax];
						T[4 * l + 1] = (ac > 1 ? m[ac * ax + 1] : 0);
						T[4 * l + 2] = (ac > 2 ? m[ac * ax + 2] : 0);
						T[4 * l + 3] = (ac > 3 ? m[ac * ax + 3] : 0)
					}
					if (G) {
						af[4 * l] = G[ac * ax];
						af[4 * l + 1] = (ac > 1 ? G[ac * ax + 1] : 0);
						af[4 * l + 2] = (ac > 2 ? G[ac * ax + 2] : 0);
						af[4 * l + 3] = (ac > 3 ? G[ac * ax + 3] : 0)
					}
					if (j !== -1) {
						J[3 * l] = u[3 * j];
						J[3 * l + 1] = u[3 * j + 1];
						J[3 * l + 2] = u[3 * j + 2]
					}
					return l
				};
				while (aj < ap) {
					av = R[aj++];
					Y = X(av, 0);
					ak = X(av, 1);
					D = X(av, 3);
					N = X(av, 4);
					ab = X(av, 5);
					H = X(av, 6);
					P = X(av, 7);
					ao = R[aj++];
					am = R[aj++];
					al = R[aj++];
					if (ak) {
						aj++
					}
					if (D) {
						L = R[aj++];
						K = R[aj++];
						I = R[aj++]
					}
					if (ab) {
						U = R[aj++];
						S = R[aj++];
						Q = R[aj++]
					} else {
						U = S = Q = -1
					}
					W = -1;
					if (typeof A[ao] !== undefined) {
						if (A[ao] instanceof Array) {
							for (ai = 0; ai < A[ao].length; ++ai) {
								t = A[ao][ai];
								if (V(t, ao, L)) {
									W = t;
									break
								}
							}
							if (W === -1) {
								A[ao].push(W = n(ao, L, U))
							}
						} else {
							t = A[ao];
							if (V(t, ao, L)) {
								W = t
							} else {
								A[ao] = [t, W = n(ao, L, U)]
							}
						}
					} else {
						W = A[ao] = n(ao, L, U)
					}
					p.push(W);
					W = -1;
					if (typeof A[am] !== undefined) {
						if (A[am] instanceof Array) {
							for (ai = 0; ai < A[am].length; ++ai) {
								t = A[am][ai];
								if (V(t, am, K)) {
									W = t;
									break
								}
							}
							if (W === -1) {
								A[am].push(W = n(am, K, S))
							}
						} else {
							t = A[am];
							if (V(t, am, K)) {
								W = t
							} else {
								A[am] = [t, W = n(am, K, S)]
							}
						}
					} else {
						W = A[am] = n(am, K, S)
					}
					p.push(W);
					W = -1;
					if (typeof A[al] !== undefined) {
						if (A[al] instanceof Array) {
							for (ai = 0; ai < A[al].length; ++ai) {
								t = A[al][ai];
								if (V(t, al, I)) {
									W = t;
									break
								}
							}
							if (W === -1) {
								A[al].push(W = n(al, I, Q))
							}
						} else {
							t = A[al];
							if (V(t, al, I)) {
								W = t
							} else {
								A[al] = [t, W = n(al, I, Q)]
							}
						}
					} else {
						W = A[al] = n(al, I, Q)
					}
					p.push(W)
				}
				var F = new THREE.BufferGeometry();
				F.addAttribute("index", new THREE.BufferAttribute(new Uint16Array(p), 1));
				F.addAttribute("position", new THREE.BufferAttribute(new Float32Array(B), 3));
				F.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(Z), 2));
				if (J.length > 0) {
					F.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(J), 3))
				}
				if (m) {
					F.addAttribute("skinWeight", new THREE.BufferAttribute(new Float32Array(T), 4))
				}
				if (G) {
					F.addAttribute("skinIndex", new THREE.BufferAttribute(new Float32Array(af), 4))
				}
				F.computeBoundingSphere();
				F.bones = aq.bones;
				F.animation = aq.animation;
				F.animations = aq.animations;
				g.models[an] = {
					geometry: F,
					material: ah
				};
				g.models[an].url = an
			}
			if (e.loading.get(c)) {
				e.loading.remove(c);
				e.loaded.add(c, g)
			}
			g.dispatchEvent({
				type: "load"
			})
		}, function(j) {
			if (e.loading.get(c)) {
				e.loading.remove(c)
			}
			g.dispatchEvent(j)
		});
		return g
	},
	remove: function(b) {
		var a = this.loaded.get(b);
		if (a) {
			this.loaded.remove(b);
			return
		}
		var c = this.loading.get(b);
		if (c) {
			this.loading.remove(b);
			return
		}
	}
};
GEMIOLI.AtlasRegion = function() {
	this.u1 = 0;
	this.u2 = 1;
	this.v1 = 0;
	this.v2 = 1;
	this.texture = GEMIOLI.TextureLoader.DEFAULT
};
GEMIOLI.AtlasRegion.prototype = {
	constructor: GEMIOLI.AtlasRegion
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.AtlasRegion.prototype);
GEMIOLI.Atlas = function() {
	this.regions = new GEMIOLI.Cache();
	this.textures = {}
};
GEMIOLI.Atlas.prototype = {
	constructor: GEMIOLI.Atlas,
	get: function(a) {
		return this.regions.get(GEMIOLI.Utils.path(this.url).dir + "/" + a)
	}
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.Atlas.prototype);
GEMIOLI.AtlasLoader = function() {
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache()
};
GEMIOLI.AtlasLoader.prototype = {
	constructor: GEMIOLI.AtlasLoader,
	load: function(c, d, f) {
		var b = this.loaded.get(c);
		if (b) {
			if (d) {
				d(b)
			}
			return b
		}
		var g = this.loading.get(c);
		if (g) {
			if (d) {
				g.addEventListener("load", function(h) {
					g.removeEventListener("load", arguments.callee);
					d(g)
				}, false)
			}
			if (f) {
				g.addEventListener("error", function(h) {
					g.removeEventListener("error", arguments.callee);
					f(h)
				}, false)
			}
			return g
		}
		var e = this;
		var a = new GEMIOLI.Atlas();
		if (d) {
			a.addEventListener("load", function(h) {
				a.removeEventListener("load", arguments.callee);
				d(a)
			}, false)
		}
		if (f) {
			a.addEventListener("error", function(h) {
				a.removeEventListener("error", arguments.callee);
				f(h)
			}, false)
		}
		this.loading.add(c, a);
		a.url = c;
		GEMIOLI.XHRLoader.load(c, function(l) {
			if (e.loading.get(c)) {
				e.loading.remove(c);
				e.loaded.add(c, a)
			}
			var C = GEMIOLI.Utils.path(c).dir + "/";
			var D = l.request.response.split(/\r\n|\r|\n/g);
			GEMIOLI.XHRLoader.remove(c);
			var v = 0,
				n, t, k, u;
			while (v < D.length) {
				if (D[v].length === 0) {
					if (++v === D.length) {
						continue
					}
					n = C + D[v];
					t = D[v + 1].match(/size: \d+,\d+/g)[0];
					k = parseInt(t.match(/\d+/g)[0]);
					u = parseInt(t.match(/\d+/g)[1]);
					v += 5;
					a.textures[n] = GEMIOLI.TextureLoader.load(n);
					continue
				} else {
					var B = D[v + 2].match(/\d+/g);
					var A = D[v + 3].match(/\d+/g);
					var q = parseInt(B[0]),
						p = parseInt(B[1]),
						r = parseInt(A[0]),
						m = parseInt(A[1]);
					var j = C + D[v] + ".png";
					var o = a.regions.get(j);
					if (!o) {
						o = new GEMIOLI.AtlasRegion();
						a.regions.add(j, o)
					}
					o.u1 = q / k;
					o.u2 = (q + r) / k;
					o.v1 = 1 - p / u;
					o.v2 = 1 - (p + m) / u;
					o.texture = a.textures[n];
					o.dispatchEvent({
						type: "load"
					});
					v += 7
				}
			}
			a.dispatchEvent({
				type: "load"
			})
		}, function(h) {
			e.loading.remove(c);
			a.dispatchEvent(h)
		});
		return a
	},
	loadRegion: function(c, g, d, e) {
		var f;
		var b = GEMIOLI.Utils.path(c).dir + "/" + g + ".png";
		var a = this.load(c, function(h) {
			f = h.regions.get(b);
			if (!f) {
				f = new GEMIOLI.AtlasRegion();
				h.regions.add(b, f)
			}
			if (d) {
				d(f)
			}
		}, function(h) {
			if (e) {
				e(h)
			}
		});
		if (!f) {
			f = a.regions.get(b)
		}
		if (!f) {
			f = new GEMIOLI.AtlasRegion();
			a.regions.add(b, f)
		}
		return f
	}
};
GEMIOLI.FontGlyph = function(c, k, g, m, f, a, d, e, b, l, j) {
	this.id = c;
	this.x = k;
	this.y = g;
	this.w = m;
	this.h = f;
	this.xa = a;
	this.p = d;
	this.u1 = e;
	this.u2 = b;
	this.v1 = l;
	this.v2 = j
};
GEMIOLI.Font = function() {
	this.glyphs = [];
	this.pages = [];
	this.size = 12;
	this.height = 12;
	this.base = 10
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.Font.prototype);
GEMIOLI.FontLoader = function() {
	this.loaded = new GEMIOLI.Cache();
	this.loading = new GEMIOLI.Cache()
};
GEMIOLI.FontLoader.prototype = {
	constructor: GEMIOLI.FontLoader,
	load: function(c, d, f) {
		var b = this.loaded.get(c);
		if (b) {
			if (d) {
				d(b)
			}
			return b
		}
		var g = this.loading.get(c);
		if (g) {
			if (d) {
				g.addEventListener("load", function(h) {
					g.removeEventListener("load", arguments.callee);
					d(g)
				}, false)
			}
			if (f) {
				g.addEventListener("error", function(h) {
					g.removeEventListener("error", arguments.callee);
					f(h)
				}, false)
			}
			return g
		}
		var e = this;
		var a = new GEMIOLI.Font();
		if (d) {
			a.addEventListener("load", function(h) {
				a.removeEventListener("load", arguments.callee);
				d(a)
			}, false)
		}
		if (f) {
			a.addEventListener("error", function(h) {
				a.removeEventListener("error", arguments.callee);
				f(h)
			}, false)
		}
		this.loading.add(c, a);
		GEMIOLI.XHRLoader.load(c, function(k) {
			if (e.loading.get(c)) {
				e.loading.remove(c);
				e.loaded.add(c, a)
			}
			var h = e.parse(a, c, k);
			GEMIOLI.XHRLoader.remove(c);
			for (var j = 0; j < h.length; ++j) {
				a.pages[j] = GEMIOLI.TextureLoader.load(h[j])
			}
			a.dispatchEvent({
				type: "load"
			})
		}, function(h) {
			e.loading.remove(c);
			a.dispatchEvent(h)
		});
		return a
	},
	loadFromAtlas: function(d, a, e, g) {
		var c = this.loaded.get(d);
		if (c) {
			if (e) {
				e(c)
			}
			return c
		}
		var h = this.loading.get(d);
		if (h) {
			if (e) {
				h.addEventListener("load", function(j) {
					h.removeEventListener("load", arguments.callee);
					e(h)
				}, false)
			}
			if (g) {
				h.addEventListener("error", function(j) {
					h.removeEventListener("error", arguments.callee);
					g(j)
				}, false)
			}
			return h
		}
		var f = this;
		var b = new GEMIOLI.Font();
		if (e) {
			b.addEventListener("load", function(j) {
				b.removeEventListener("load", arguments.callee);
				e(b)
			}, false)
		}
		if (g) {
			b.addEventListener("error", function(j) {
				b.removeEventListener("error", arguments.callee);
				g(j)
			}, false)
		}
		this.loading.add(d, b);
		GEMIOLI.XHRLoader.load(d, function(n) {
			if (f.loading.get(d)) {
				f.loading.remove(d);
				f.loaded.add(d, b)
			}
			var k = f.parse(b, d, n);
			GEMIOLI.XHRLoader.remove(d);
			var o = 0;
			var m = 0;
			for (var l = 0; l < k.length; ++l) {
				var j = l;
				GEMIOLI.AtlasLoader.loadRegion(a, GEMIOLI.Utils.path(k[l]).file, function(r) {
					b.pages[j] = r.texture;
					for (var p = 0; p < b.glyphs.length; ++p) {
						var q = b.glyphs[p];
						if (q && (q.p === j)) {
							q.u1 = (r.u2 - r.u1) * q.u1 + r.u1;
							q.u2 = (r.u2 - r.u1) * q.u2 + r.u1;
							q.v1 = (r.v1 - r.v2) * q.v1 + r.v2;
							q.v2 = (r.v1 - r.v2) * q.v2 + r.v2
						}
					}
				})
			}
			b.dispatchEvent({
				type: "load"
			})
		}, function(j) {
			f.loading.remove(d);
			b.dispatchEvent(j)
		});
		return b
	},
	parse: function(m, c, C) {
		var p = GEMIOLI.Utils.path(c).dir + "/";
		var b = C.request.response.split(/\r\n|\r|\n/g);
		var B = 256;
		var f = 256;
		var k = [];
		for (var v = 0; v < b.length; ++v) {
			var q = b[v].split(" ");
			if (q.length === 0) {
				continue
			}
			if (q[0] === "info") {
				for (var u = 0; u < q.length; ++u) {
					var o = q[u].split("=");
					if (o.length < 2) {
						continue
					}
					if (o[0] === "size") {
						m.size = parseInt(o[1])
					}
				}
			} else {
				if (q[0] === "common") {
					for (var u = 0; u < q.length; ++u) {
						var o = q[u].split("=");
						if (o.length < 2) {
							continue
						}
						if (o[0] === "lineHeight") {
							m.height = parseInt(o[1])
						} else {
							if (o[0] === "base") {
								m.base = parseInt(o[1])
							} else {
								if (o[0] === "scaleW") {
									B = parseInt(o[1])
								} else {
									if (o[0] === "scaleH") {
										f = parseInt(o[1])
									}
								}
							}
						}
					}
				} else {
					if (q[0] === "page") {
						var r = 0;
						var A = "";
						for (var u = 0; u < q.length; ++u) {
							var o = q[u].split("=");
							if (o.length < 2) {
								continue
							}
							if (o[0] === "id") {
								r = parseInt(o[1])
							} else {
								if (o[0] === "file") {
									A = p + o[1].substr(1, o[1].length - 2)
								}
							}
						}
						k[r] = A
					} else {
						if (q[0] === "char") {
							var r = 0;
							var d = 0;
							var g = 0;
							var e = 0;
							var t = 0;
							var n = 0;
							var l = 0;
							var h = 0;
							var a = 0;
							for (var u = 0; u < q.length; ++u) {
								var o = q[u].split("=");
								if (o.length < 2) {
									continue
								}
								if (o[0] === "id") {
									r = parseInt(o[1])
								} else {
									if (o[0] === "x") {
										g = parseInt(o[1])
									} else {
										if (o[0] === "y") {
											e = parseInt(o[1])
										} else {
											if (o[0] === "width") {
												t = parseInt(o[1])
											} else {
												if (o[0] === "height") {
													n = parseInt(o[1])
												} else {
													if (o[0] === "xoffset") {
														l = parseInt(o[1])
													} else {
														if (o[0] === "yoffset") {
															h = parseInt(o[1])
														} else {
															if (o[0] === "xadvance") {
																a = parseInt(o[1])
															} else {
																if (o[0] === "page") {
																	d = parseInt(o[1])
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
							m.glyphs[r] = new GEMIOLI.FontGlyph(r, l, h, t, n, a, d, g / B, (g + t) / B, 1 - e / f, 1 - (e + n) / f)
						}
					}
				}
			}
		}
		return k
	}
};
GEMIOLI.Animation = function(a, e, b) {
	this.root = a;
	this.data = THREE.AnimationHandler.init(e);
	this.hierarchy = THREE.AnimationHandler.parse(a);
	this.currentTime = 0;
	this.timeScale = 1;
	this.isPlaying = false;
	this.loop = true;
	this.weight = 0;
	if (b) {
		for (var d = 0; d < b.length; ++d) {
			for (var c = 0; c < this.hierarchy.length; ++c) {
				if (this.hierarchy[c] && (b[d] === this.hierarchy[c].name)) {
					this.hierarchy[c] = null;
					break
				}
			}
		}
	}
};
GEMIOLI.Animation.prototype = {
	constructor: GEMIOLI.Animation,
	keyTypes: ["pos", "rot", "scl"],
	play: function(a, b) {
		this.currentTime = a !== undefined ? a : 0;
		this.weight = b !== undefined ? b : 1;
		this.isPlaying = true;
		this.reset();
		THREE.AnimationHandler.play(this)
	},
	stop: function() {
		this.isPlaying = false;
		THREE.AnimationHandler.stop(this)
	},
	reset: function() {
		var d = this,
			o = d.currentTime,
			f = d.hierarchy,
			q = d.data,
			v = q.name,
			k = d.keyTypes,
			r, g, m, l, b, c, j, p, e, u;
		for (var n = 0, a = f.length; n < a; n++) {
			r = f[n];
			if (!r) {
				continue
			}
			if (r.animationCache === undefined) {
				r.animationCache = {
					animations: {},
					blending: {
						positionWeight: 0,
						quaternionWeight: 0,
						scaleWeight: 0
					}
				}
			}
			g = r.animationCache.animations;
			m = g[v];
			if (m === undefined) {
				m = {
					prevKey: {
						pos: 0,
						rot: 0,
						scl: 0
					},
					nextKey: {
						pos: 0,
						rot: 0,
						scl: 0
					},
					originalMatrix: r.matrix
				};
				g[v] = m
			}
			l = q.hierarchy[n].keys;
			b = l.length;
			for (j = 0; j < 3; ++j) {
				c = k[j];
				p = l[0];
				for (u = b - 1, e = undefined; u > 0; --u) {
					if (l[u][c] !== undefined) {
						e = l[u];
						break
					}
				}
				if (e === undefined) {
					e = p
				}
				while ((e.index - p.index) > 1) {
					u = (e.index + p.index) >> 1;
					averageKey = l[u];
					if (averageKey.time <= o) {
						if (averageKey[c] !== undefined) {
							p = averageKey
						} else {
							for (p = undefined; u < b; ++u) {
								if (l[u][c] !== undefined) {
									p = l[u];
									break
								}
							}
							if (p === undefined) {
								p = e
							}
						}
					} else {
						if (averageKey[c] !== undefined) {
							e = averageKey
						} else {
							for (e = undefined; u > 0; --u) {
								if (l[u][c] !== undefined) {
									e = l[u];
									break
								}
							}
							if (e === undefined) {
								e = p
							}
						}
					}
				}
				m.prevKey[c] = p;
				m.nextKey[c] = e
			}
		}
	},
	resetBlendWeights: function() {
		for (var e = 0, a = this.hierarchy.length; e < a; e++) {
			var c = this.hierarchy[e];
			if (!c) {
				continue
			}
			var b = c.animationCache;
			if (b !== undefined) {
				var d = b.blending;
				d.positionWeight = 0;
				d.quaternionWeight = 0;
				d.scaleWeight = 0
			}
		}
	},
	getBone: function(c) {
		for (var d = 0, a = this.hierarchy.length; d < a; d++) {
			var b = this.hierarchy[d];
			if (b && b.name === c) {
				return b
			}
		}
		return null
	},
	update: (function() {
		var d = [];
		var e = new THREE.Vector3();
		var a = new THREE.Vector3();
		var c = new THREE.Quaternion();
		var b = function(n, m, k, j, o, g, f) {
			var l = (k - n) * 0.5,
				h = (j - m) * 0.5;
			return (2 * (m - k) + l + h) * f + (-3 * (m - k) - 2 * l - h) * g + l * o + m
		};
		return function(u) {
			if (this.isPlaying === false) {
				return
			}
			this.currentTime += u * this.timeScale;
			if (this.weight === 0) {
				return
			}
			var m = this.data.length;
			if (this.currentTime > m || this.currentTime < 0) {
				if (this.loop) {
					this.currentTime %= m;
					if (this.currentTime < 0) {
						this.currentTime += m
					}
					this.reset()
				} else {
					this.stop()
				}
			}
			for (var p = 0, j = this.hierarchy.length; p < j; p++) {
				var n = this.hierarchy[p];
				if (!n) {
					continue
				}
				var f = n.animationCache.animations[this.data.name];
				var o = n.animationCache.blending;
				for (var v = 0; v < 3; v++) {
					var q = this.keyTypes[v];
					var B = f.prevKey[q];
					var r = f.nextKey[q];
					if ((this.timeScale > 0 && r.time <= this.currentTime) || (this.timeScale < 0 && B.time >= this.currentTime)) {
						B = this.data.hierarchy[p].keys[0];
						r = this.getNextKeyWith(q, p, 1);
						while (r.time < this.currentTime && r.index > B.index) {
							B = r;
							r = this.getNextKeyWith(q, p, r.index + 1)
						}
						f.prevKey[q] = B;
						f.nextKey[q] = r
					}
					var k = (this.currentTime - B.time) / (r.time - B.time);
					var l = B[q];
					var g = r[q];
					if (k < 0) {
						k = 0
					}
					if (k > 1) {
						k = 1
					}
					if (q === "pos") {
						a.x = l[0] + (g[0] - l[0]) * k;
						a.y = l[1] + (g[1] - l[1]) * k;
						a.z = l[2] + (g[2] - l[2]) * k;
						var A = this.weight / (this.weight + o.positionWeight);
						n.position.lerp(a, A);
						o.positionWeight += this.weight
					} else {
						if (q === "rot") {
							THREE.Quaternion.slerp(l, g, c, k);
							if (o.quaternionWeight === 0) {
								n.quaternion.copy(c);
								o.quaternionWeight = this.weight
							} else {
								var A = this.weight / (this.weight + o.quaternionWeight);
								THREE.Quaternion.slerp(n.quaternion, c, n.quaternion, A);
								o.quaternionWeight += this.weight
							}
						} else {
							if (q === "scl") {
								a.x = l[0] + (g[0] - l[0]) * k;
								a.y = l[1] + (g[1] - l[1]) * k;
								a.z = l[2] + (g[2] - l[2]) * k;
								var A = this.weight / (this.weight + o.scaleWeight);
								n.scale.lerp(a, A);
								o.scaleWeight += this.weight
							}
						}
					}
				}
			}
			return true
		}
	})(),
	getNextKeyWith: function(c, b, a) {
		var d = this.data.hierarchy[b].keys;
		a = a % d.length;
		for (; a < d.length; a++) {
			if (d[a][c] !== undefined) {
				return d[a]
			}
		}
		return this.data.hierarchy[b].keys[0]
	},
	getPrevKeyWith: function(c, b, a) {
		var d = this.data.hierarchy[b].keys;
		a = a >= 0 ? a : a + d.length;
		for (; a >= 0; a--) {
			if (d[a][c] !== undefined) {
				return d[a]
			}
		}
		return this.data.hierarchy[b].keys[d.length - 1]
	}
};
GEMIOLI.AnimationController = function(c, b) {
	this.animation = c;
	this.description = b;
	this.fps = this.animation.data.fps;
	this.invfps = 1 / this.fps;
	this.active = null;
	this.loop = false;
	this.time = 0;
	this.startFrame = 0;
	this.endFrame = 0;
	this.start = 0;
	this.end = 0;
	this.animationId = null;
	var a = this;
	var d = this.animation.update;
	this.animation.update = function(g) {
		if (this.isPlaying === false) {
			return
		}
		var h = a.end > a.start ? 1 : -1;
		var e = Math.floor(a.time * a.fps);
		var f = a.time + g * h;
		var j = h > 0 ? Math.floor(f * a.fps) : Math.ceil(f * a.fps);
		if (e !== j) {
			if (h > 0) {
				if (f >= a.end) {
					if (a.loop) {
						a.time = (f - a.end) % (a.end - a.start) + a.start;
						a.animation.play(Math.floor(a.time * a.fps) * a.invfps);
						d.call(this, 0)
					} else {
						a.animation.play(a.endFrame * a.invfps);
						d.call(this, 0);
						a.animation.stop();
						a.time = a.end
					}
				} else {
					a.animation.play(j * a.invfps);
					d.call(this, 0);
					a.time = f
				}
			} else {
				if (f <= a.end) {
					if (a.loop) {
						a.time = -(a.start - f) % (a.start - a.end) + a.start;
						a.animation.play(Math.ceil(a.time * a.fps) * a.invfps);
						d.call(this, 0)
					} else {
						a.animation.play(a.endFrame * a.invfps);
						d.call(this, 0);
						a.animation.stop();
						a.time = a.end
					}
				} else {
					a.animation.play(j * a.invfps);
					d.call(this, 0);
					a.time = f
				}
			}
		} else {
			a.time = f
		}
	};
	this.animation.reset()
};
GEMIOLI.AnimationController.prototype = {
	play: function(b, a) {
		if (this.active) {
			this.animation.stop();
			this.animation.reset();
			this.animationId = null
		}
		this.active = this.description[b];
		this.loop = a;
		if (this.active) {
			this.animationId = b;
			this.startFrame = this.active.start;
			this.endFrame = this.active.end;
			this.start = this.startFrame * this.invfps;
			this.end = (this.endFrame + (this.startFrame > this.endFrame ? -1 : 1)) * this.invfps;
			this.animation.play(this.start, 1);
			this.time = this.start;
			GEMIOLI.Animation.prototype.update.call(this.animation, 0)
		}
	},
	getAnimationLength: function(b) {
		var a = this.description[b];
		return (a ? Math.abs(a.end - a.start + 1) * this.invfps : 0)
	},
	hasAnimation: function(a) {
		return this.description[a]
	},
	isPlaying: function() {
		return this.time !== this.end
	},
	update: function(a) {
		this.animation.resetBlendWeights();
		this.animation.update(a)
	}
};
GEMIOLI.Matrix = function(h, f, k, j, g, e) {
	this.a = h || 0;
	this.b = f || 0;
	this.c = k || 0;
	this.d = j || 0;
	this.tx = g || 0;
	this.ty = e || 0
};
GEMIOLI.Matrix.prototype = {
	constructor: GEMIOLI.Matrix,
	identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
		return this
	},
	clone: function() {
		return new GEMIOLI.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty)
	},
	set: function(h, f, k, j, g, e) {
		this.a = h;
		this.b = f;
		this.c = k;
		this.d = j;
		this.tx = g;
		this.ty = e;
		return this
	},
	concat: function(a) {
		var c = this.a * a.a + this.b * a.c;
		this.b = this.a * a.b + this.b * a.d;
		this.a = c;
		var d = this.c * a.a + this.d * a.c;
		this.d = this.c * a.b + this.d * a.d;
		this.c = d;
		var b = this.tx * a.a + this.ty * a.c + a.tx;
		this.ty = this.tx * a.b + this.ty * a.d + a.ty;
		this.tx = b;
		return this
	},
	prepend: function(a) {
		this.set(this.a * a.a + this.c * a.b, this.b * a.a + this.d * a.b, this.a * a.c + this.c * a.d, this.b * a.c + this.d * a.d, this.tx + this.a * a.tx + this.c * a.ty, this.ty + this.b * a.tx + this.d * a.ty);
		return this
	},
	invert: function() {
		var c = this.a * this.d - this.b * this.c;
		if (c === 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty
		} else {
			c = 1 / c;
			var b = this.d * c;
			this.d = this.a * c;
			this.a = b;
			this.b *= -c;
			this.c *= -c;
			var a = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = a
		}
		return this
	},
	copyFrom: function(a) {
		this.a = a.a;
		this.b = a.b;
		this.c = a.c;
		this.d = a.d;
		this.tx = a.tx;
		this.ty = a.ty;
		return this
	}
};
GEMIOLI.Color = function(f, e, c, d) {
	this.r = f;
	this.g = e;
	this.b = c;
	this.a = d
};
GEMIOLI.Color.prototype = {
	constructor: GEMIOLI.Color,
	set: function(f, e, c, d) {
		this.r = f;
		this.g = e;
		this.b = c;
		this.a = d
	},
	setHex: function(a) {
		this.a = ((a >> 24) & 255) / 255;
		this.r = ((a >> 16) & 255) / 255;
		this.g = ((a >> 8) & 255) / 255;
		this.b = (a & 255) / 255
	},
	copyFrom: function(a) {
		this.r = a.r;
		this.g = a.g;
		this.b = a.b;
		this.a = a.a
	},
	concat: function(a) {
		this.r *= a.r;
		this.g *= a.g;
		this.b *= a.b;
		this.a *= a.a
	},
	prepend: function(a) {
		this.r *= a.r;
		this.g *= a.g;
		this.b *= a.b;
		this.a *= a.a
	},
	clone: function() {
		return new GEMIOLI.Color(this.r, this.g, this.b, this.a)
	}
};
GEMIOLI.Batcher = function() {
	this.scene = new THREE.Scene();
	this.modelViewMatrix = new GEMIOLI.Matrix(1, 0, 0, 1, 0, 0);
	this.matrixStack = [];
	this.matrixStackSize = 0;
	this.color = new GEMIOLI.Color(1, 1, 1, 1);
	this.colorStack = [];
	this.colorStackSize = 0;
	var a = new THREE.ImmediateRenderObject();
	a.count = 0;
	a.visible = false;
	this.batches = [a];
	this.scene.add(a);
	this.batchIndex = 0
};
GEMIOLI.Batcher.prototype = {
	constructor: GEMIOLI.Batcher,
	pushMatrix: function() {
		if (this.matrixStack.length < this.matrixStackSize + 1) {
			this.matrixStack.push(new GEMIOLI.Matrix(1, 0, 0, 1, 0, 0))
		}
		this.matrixStack[this.matrixStackSize++].copyFrom(this.modelViewMatrix)
	},
	popMatrix: function() {
		this.modelViewMatrix.copyFrom(this.matrixStack[--this.matrixStackSize])
	},
	pushColor: function() {
		if (this.colorStack.length < this.colorStackSize + 1) {
			this.colorStack.push(new GEMIOLI.Color(1, 1, 1, 1))
		}
		this.colorStack[this.colorStackSize++].copyFrom(this.color)
	},
	popColor: function() {
		this.color.copyFrom(this.colorStack[--this.colorStackSize])
	},
	prependMatrix: function(a) {
		this.modelViewMatrix.prepend(a)
	},
	prependColor: function(a) {
		this.color.prepend(a)
	},
	flush: function() {
		if (this.batches[this.batchIndex].count > 0) {
			if (++this.batchIndex === this.batches.length) {
				var a = new THREE.ImmediateRenderObject();
				a.count = 0;
				a.visible = false;
				this.batches.push(a);
				this.scene.add(this.batches[this.batchIndex])
			}
		}
	},
	render: function() {
		this.flush();
		for (var a = 0; a < this.batchIndex; ++a) {
			this.batches[a].visible = true
		}
		GEMIOLI.Renderer.render(this.scene, this.camera);
		for (var a = 0; a < this.batches.length; ++a) {
			this.batches[a].visible = false
		}
	}
};
GEMIOLI.DisplayObject = function() {
	this.x = 0;
	this.y = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotation = 0;
	this._x = 0;
	this._y = 0;
	this._scaleX = 1;
	this._scaleY = 1;
	this._rotation = 0;
	this._skewA = 1;
	this._skewB = 0;
	this._skewC = 0;
	this._skewD = 1;
	this._matrix = new GEMIOLI.Matrix(1, 0, 0, 1, 0, 0);
	this.visible = true;
	this.blending = THREE.NormalBlending;
	this.name = "";
	this.parent = null;
	this.tint = new GEMIOLI.Color(1, 1, 1, 1)
};
GEMIOLI.DisplayObject.HELP_MATRIX = new GEMIOLI.Matrix();
GEMIOLI.DisplayObject.prototype = {
	constructor: GEMIOLI.DisplayObject,
	getAlpha: function() {
		return this.tint.a
	},
	setAlpha: function(a) {
		if (a !== this.tint.a) {
			this.tint.a = (a < 0 ? 0 : (a > 1 ? 1 : a))
		}
	},
	updateMatrix: function() {
		var d = this._skewA * this.scaleX;
		var b = this._skewB * this.scaleX;
		var g = this._skewC * this.scaleY;
		var e = this._skewD * this.scaleY;
		var f = this.rotation * Math.PI / 180;
		var a = Math.sin(f);
		var h = Math.cos(f);
		this._matrix.a = d * h - b * a;
		this._matrix.b = d * a + b * h;
		this._matrix.c = g * h - e * a;
		this._matrix.d = g * a + e * h;
		this._matrix.tx = this.x;
		this._matrix.ty = this.y;
		this._x = this.x;
		this._y = this.y;
		this._scaleX = this.scaleX;
		this._scaleY = this.scaleY;
		this._rotation = this.rotation
	},
	getMatrix: function() {
		if ((this.x !== this._x) || (this.y !== this._y) || (this.scaleX !== this._scaleX) || (this.scaleY !== this._scaleY) || (this.rotation !== this._rotation)) {
			this.updateMatrix()
		}
		return this._matrix
	},
	setMatrix: function(e) {
		this.x = e.tx;
		this.y = e.ty;
		var b = Math.sqrt(e.a * e.a + e.b * e.b);
		var a = Math.sqrt(e.c * e.c + e.d * e.d);
		if ((e.a * e.d - e.b * e.c) < 0) {
			if (e.b === 0 && e.c === 0 && e.d === 1) {
				b = -b
			} else {
				a = -a
			}
		}
		this.scaleX = b;
		this.scaleY = a;
		var f = Math.atan2(e.b, b < 0 ? -e.a : e.a);
		this.rotation = f * 180 / Math.PI;
		var d = Math.sin(-f);
		var g = Math.cos(-f);
		this._skewA = e.a * g - e.b * d;
		this._skewB = e.a * d + e.b * g;
		this._skewC = e.c * g - e.d * d;
		this._skewD = e.c * d + e.d * g;
		if (b !== 0) {
			this.skewA /= b;
			this.skewB /= b
		}
		if (a !== 0) {
			this.skewC /= a;
			this.skewD /= a
		}
		updateMatrix()
	},
	setParent: function(b) {
		var a = b;
		while (a !== this && a !== null) {
			a = a.parent
		}
		if (a === this) {
			if (window.console && window.console.log) {
				console.log("An object cannot be added as a child to itself or one of its children (or children's children, etc.)")
			} else {
				parent = b
			}
		}
	},
	globalToLocal: function(c, b) {
		var a = GEMIOLI.DisplayObject.HELP_MATRIX;
		a.copyFrom(this.getMatrix());
		var d = this.parent;
		while (d) {
			a.concat(d.getMatrix());
			d = d.parent
		}
		a.invert();
		b.set(c.x * a.a + c.y * a.c + a.tx, c.x * a.b + c.y * a.d + a.ty)
	},
	localToGlobal: function(c, b) {
		var a = GEMIOLI.DisplayObject.HELP_MATRIX;
		a.copyFrom(this.getMatrix());
		var d = this.parent;
		while (d) {
			a.concat(d.getMatrix());
			d = d.parent
		}
		b.set(c.x * a.a + c.y * a.c + a.tx, c.x * a.b + c.y * a.d + a.ty)
	},
	render: function(a) {}
};
THREE.EventDispatcher.prototype.apply(GEMIOLI.DisplayObject.prototype);
GEMIOLI.DisplayObjectContainer = function() {
	GEMIOLI.DisplayObject.call(this);
	this.children = []
};
GEMIOLI.DisplayObjectContainer.prototype = Object.create(GEMIOLI.DisplayObject.prototype);
GEMIOLI.DisplayObjectContainer.prototype.constructor = GEMIOLI.DisplayObjectContainer;
GEMIOLI.DisplayObjectContainer.prototype.getNumChildren = function() {
	return this.children.length
};
GEMIOLI.DisplayObjectContainer.prototype.addChild = function(a) {
	if (!a) {
		if (window.console && window.console.log) {
			console.log("Child can't be null in addChild of DisplayObjectContainer")
		}
		return a
	}
	if (a.parent === this) {
		this.setChildIndex(a, this.children.length - 1)
	} else {
		if (a.parent !== null) {
			a.parent.removeChild(a)
		}
		this.children.push(a);
		a.parent = this;
		a.dispatchEvent({
			type: "added",
			local: true
		})
	}
	return a
};
GEMIOLI.DisplayObjectContainer.prototype.addChildAt = function(c, a) {
	if (!c) {
		if (window.console && window.console.log) {
			console.log("Child can't be null in addChildAt of DisplayObjectContainer")
		}
		return c
	}
	var b = this.children.length;
	if (a >= 0 && a <= b) {
		if (c.parent !== null) {
			c.parent.removeChild(c)
		}
		if (a === b) {
			this.children.push(c)
		} else {
			this.children.splice(a, 0, c)
		}
		c.parent = this;
		c.dispatchEvent({
			type: "added",
			local: true
		})
	} else {
		if (window.console && window.console.log) {
			console.log("Invalid child index in addChildAt of DisplayObjectContainer")
		}
	}
	return c
};
GEMIOLI.DisplayObjectContainer.prototype.removeChild = function(b) {
	var a = this.getChildIndex(b);
	if (a !== -1) {
		b.dispatchEvent({
			type: "removed",
			local: true
		});
		b.parent = null;
		a = this.children.indexOf(b);
		if (a >= 0) {
			this.children.splice(a, 1)
		}
	}
	return b
};
GEMIOLI.DisplayObjectContainer.prototype.removeChildAt = function(a) {
	if (a >= 0 && a <= this.children.length) {
		var b = this.children[a];
		b.dispatchEvent({
			type: "removed",
			local: true
		});
		b.parent = null;
		a = this.children.indexOf(b);
		if (a >= 0) {
			this.children.splice(a, 1)
		}
		return b
	} else {
		if (window.console && window.console.log) {
			console.log("Invalid child index in removeChildAt of DisplayObjectContainer")
		}
	}
	return null
};
GEMIOLI.DisplayObjectContainer.prototype.removeChildren = function(a) {
	while (this.children.length) {
		this.removeChildAt(0)
	}
};
GEMIOLI.DisplayObjectContainer.prototype.getChildAt = function(a) {
	if (a >= 0 && a < this.children.length) {
		return this.children[a]
	} else {
		return null
	}
};
GEMIOLI.DisplayObjectContainer.prototype.getChildByName = function(a) {
	var c = this.children;
	var d = c.length;
	for (var b = 0; b < d; ++b) {
		var e = c[b];
		if (e.name === a) {
			return e
		}
	}
	return null
};
GEMIOLI.DisplayObjectContainer.prototype.getChildIndex = function(a) {
	return this.children.indexOf(a)
};
GEMIOLI.DisplayObjectContainer.prototype.setChildIndex = function(c, a) {
	var b = this.getChildIndex(c);
	if (b === a) {
		return
	}
	if (b === -1) {
		if (window.console && window.console.log) {
			console.log("Not a child of this container in setChildIndex of DisplayObjectContainer")
		}
		return
	}
	this.children.splice(b, 1);
	this.children.insert(a, c)
};
GEMIOLI.DisplayObjectContainer.prototype.contains = function(a) {
	while (a !== null) {
		if (a === this) {
			return true
		} else {
			a = a.parent
		}
	}
	return false
};
GEMIOLI.DisplayObjectContainer.prototype.swapChildren = function(b, a) {
	var d = this.getChildIndex(b);
	var c = this.getChildIndex(a);
	if (d === -1 || c === -1) {
		if (window.console && window.console.log) {
			console.log("Not a child of this container in swapChildren of DisplayObjectContainer")
		} else {
			this.children[d] = a;
			this.children[c] = b
		}
	}
};
GEMIOLI.DisplayObjectContainer.prototype.swapChildrenAt = function(d, c) {
	var b = this.getChildAt(d);
	var a = this.getChildAt(c);
	this.children[d] = a;
	this.children[c] = b
};
GEMIOLI.DisplayObjectContainer.prototype.dispatchEvent = function(e) {
	if (!e.local) {
		var d = this.children;
		var b = [];
		var c = 0,
			a = d.length;
		for (c = 0; c < a; ++c) {
			b.push(d[c])
		}
		for (c = a - 1; c >= 0; --c) {
			var f = b[c];
			f.dispatchEvent(e);
			if (e.cancelled) {
				return
			}
		}
	}
	GEMIOLI.DisplayObject.prototype.dispatchEvent.call(this, e)
};
GEMIOLI.DisplayObjectContainer.prototype.render = function(c) {
	var b = this.children.length;
	if (b > 0 && this.visible && this.tint.a > 0) {
		for (var a = 0; a < b; ++a) {
			var d = this.children[a];
			if (d.visible && d.tint.a > 0) {
				c.pushColor();
				c.pushMatrix();
				c.prependColor(d.tint);
				c.prependMatrix(d.getMatrix());
				d.render(c);
				c.popMatrix();
				c.popColor()
			}
		}
	}
};
GEMIOLI.Layer = function() {
	GEMIOLI.DisplayObjectContainer.call(this);
	this.batcher = new GEMIOLI.Batcher();
	this.camera = new THREE.OrthographicCamera(0, GEMIOLI.Application.WIDTH, 0, GEMIOLI.Application.HEIGHT, -1, 1000);
	this.width = GEMIOLI.Application.WIDTH;
	this.height = GEMIOLI.Application.HEIGHT
};
GEMIOLI.Layer.prototype = Object.create(GEMIOLI.DisplayObjectContainer.prototype);
GEMIOLI.Layer.prototype.constructor = GEMIOLI.Layer;
GEMIOLI.Layer.prototype.resize = function() {
	this.camera.right = GEMIOLI.Application.innerWidth;
	this.camera.bottom = GEMIOLI.Application.innerHeight;
	this.camera.updateProjectionMatrix();
	var a = Math.min(GEMIOLI.Application.innerWidth / GEMIOLI.Application.WIDTH, GEMIOLI.Application.innerHeight / GEMIOLI.Application.HEIGHT);
	this.width = GEMIOLI.Application.innerWidth / a;
	this.height = GEMIOLI.Application.innerHeight / a;
	this.scaleX = this.scaleY = a
};
GEMIOLI.Layer.prototype.update = function(a, b) {};
GEMIOLI.Layer.prototype.render = function() {
	this.batcher.batchIndex = 0;
	this.batcher.camera = this.camera;
	this.batcher.modelViewMatrix.copyFrom(this.getMatrix());
	this.batcher.color.copyFrom(this.tint);
	GEMIOLI.DisplayObjectContainer.prototype.render.call(this, this.batcher);
	this.batcher.render()
};
GEMIOLI.QuadMaterialVertexShader = "	uniform mat4 modelViewMatrix;	uniform mat4 projectionMatrix;	attribute vec2 position;	attribute vec4 color;	varying vec4 vColor;	void main() {		vColor = color;		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);	}";
GEMIOLI.QuadMaterialFragmentShader = "	varying vec4 vColor;	void main() {		gl_FragColor = vColor;	}";
GEMIOLI.QuadMaterial = function() {
	var a = "precision " + GEMIOLI.Renderer.getPrecision() + " float;\nprecision " + GEMIOLI.Renderer.getPrecision() + " int;\n";
	THREE.RawShaderMaterial.call(this, {
		uniforms: {},
		attributes: {},
		vertexShader: a + GEMIOLI.QuadMaterialVertexShader,
		fragmentShader: a + GEMIOLI.QuadMaterialFragmentShader,
		depthTest: false,
		depthWrite: false,
		transparent: true
	})
};
GEMIOLI.QuadMaterial.prototype = Object.create(THREE.RawShaderMaterial.prototype);
GEMIOLI.QuadMaterial.prototype.constructor = GEMIOLI.QuadMaterial;
GEMIOLI.Quad = function() {
	GEMIOLI.DisplayObjectContainer.call(this);
	this.v1 = new THREE.Vector2(0, 0);
	this.v2 = new THREE.Vector2(0, 0);
	this.v3 = new THREE.Vector2(0, 0);
	this.v4 = new THREE.Vector2(0, 0);
	this.c1 = new GEMIOLI.Color(1, 1, 1, 1);
	this.c2 = new GEMIOLI.Color(1, 1, 1, 1);
	this.c3 = new GEMIOLI.Color(1, 1, 1, 1);
	this.c4 = new GEMIOLI.Color(1, 1, 1, 1)
};
GEMIOLI.Quad.fromRect = function(c, e, d, b) {
	var a = new GEMIOLI.Quad();
	a.setRectangle(c, e, d, b);
	return a
};
GEMIOLI.Quad.fromRectColor = function(k, f, d, l, c, e, h, j) {
	var m = new GEMIOLI.Quad();
	m.setRectangle(k, f, d, l);
	m.setColor(c, e, h, j);
	return m
};
GEMIOLI.Quad.immediateRenderCallback = function(a, c, b) {
	if (!this.__webglVertexBuffer) {
		this.__webglVertexBuffer = c.createBuffer()
	}
	c.bindBuffer(c.ARRAY_BUFFER, this.__webglVertexBuffer);
	c.bufferData(c.ARRAY_BUFFER, this.positionArray, c.DYNAMIC_DRAW);
	var d = c.getVertexAttrib(a.attributes.position, c.VERTEX_ATTRIB_ARRAY_ENABLED);
	if (!d) {
		c.enableVertexAttribArray(a.attributes.position)
	}
	c.vertexAttribPointer(a.attributes.position, 2, c.FLOAT, false, 0, 0);
	if (!this.__webglColorBuffer) {
		this.__webglColorBuffer = c.createBuffer()
	}
	c.bindBuffer(c.ARRAY_BUFFER, this.__webglColorBuffer);
	c.bufferData(c.ARRAY_BUFFER, this.colorArray, c.DYNAMIC_DRAW);
	var e = c.getVertexAttrib(a.attributes.color, c.VERTEX_ATTRIB_ARRAY_ENABLED);
	if (!e) {
		c.enableVertexAttribArray(a.attributes.color)
	}
	c.vertexAttribPointer(a.attributes.color, 4, c.FLOAT, false, 0, 0);
	c.drawArrays(c.TRIANGLES, 0, this.count);
	this.count = 0;
	if (!d) {
		c.disableVertexAttribArray(a.attributes.position)
	}
	if (!e) {
		c.disableVertexAttribArray(a.attributes.color)
	}
};
GEMIOLI.Quad.prototype = Object.create(GEMIOLI.DisplayObjectContainer.prototype);
GEMIOLI.Quad.prototype.constructor = GEMIOLI.Quad;
GEMIOLI.Quad.prototype.setRectangle = function(b, d, c, a) {
	this.v1.set(b, d);
	this.v2.set(b + c, d);
	this.v3.set(b + c, d + a);
	this.v4.set(b, d + a)
};
GEMIOLI.Quad.prototype.setColor = function(f, e, c, d) {
	this.c1.set(f, e, c, d);
	this.c2.set(f, e, c, d);
	this.c3.set(f, e, c, d);
	this.c4.set(f, e, c, d)
};
GEMIOLI.Quad.prototype.setColorHex = function(a) {
	this.c1.setHex(a);
	this.c2.setHex(a);
	this.c3.setHex(a);
	this.c4.setHex(a)
};
GEMIOLI.Quad.prototype.isUnderPoint = (function() {
	var a = new THREE.Vector2();
	var b = function(f, e, d) {
		return (f.x - d.x) * (e.y - d.y) - (e.x - d.x) * (f.y - d.y)
	};
	var c = function(h, k, j, g) {
		var f = b(h, k, j) < 0;
		var e = b(h, j, g) < 0;
		var d = b(h, g, k) < 0;
		return ((f === e) && (e === d))
	};
	return function(d, e) {
		a.set(d, e);
		this.globalToLocal(a, a);
		return c(a, this.v1, this.v3, this.v2) || c(a, this.v1, this.v4, this.v3)
	}
})();
GEMIOLI.Quad.prototype.render = function(a) {
	a.batchQuad(this);
	GEMIOLI.DisplayObjectContainer.prototype.render.call(this, a)
};
GEMIOLI.Batcher.prototype.batchQuad = function(q) {
	var f = this.batches[this.batchIndex];
	if ((f.type !== GEMIOLI.Quad) || (f.blending !== q.blending)) {
		this.flush();
		f = this.batches[this.batchIndex];
		f.type = GEMIOLI.Quad;
		var j = GEMIOLI.Quad.material;
		if (!j) {
			j = new GEMIOLI.QuadMaterial();
			GEMIOLI.Quad.material = j
		}
		f.material = j;
		f.blending = f.material.blending = q.blending;
		if (!f.positionArray) {
			f.positionArray = new Float32Array(6 * 2)
		}
		if (!f.colorArray) {
			f.colorArray = new Float32Array(6 * 4)
		}
		f.immediateRenderCallback = GEMIOLI.Quad.immediateRenderCallback
	}
	var g = f.count;
	var h = f.positionArray;
	if ((g + 6) * 2 > h.length) {
		f.positionArray = new Float32Array(h.length * 2);
		f.positionArray.set(h, 0);
		h = f.positionArray
	}
	var p = f.colorArray;
	if ((g + 6) * 4 > p.length) {
		f.colorArray = new Float32Array(p.length * 2);
		f.colorArray.set(p, 0);
		p = f.colorArray
	}
	var n = this.modelViewMatrix;
	var c = this.color;
	g = f.count * 2;
	var o = q.v1;
	var m = q.v2;
	var l = q.v3;
	var k = q.v4;
	h[g + 0] = h[g + 6] = o.x * n.a + o.y * n.c + n.tx;
	h[g + 1] = h[g + 7] = o.x * n.b + o.y * n.d + n.ty;
	h[g + 2] = h[g + 10] = l.x * n.a + l.y * n.c + n.tx;
	h[g + 3] = h[g + 11] = l.x * n.b + l.y * n.d + n.ty;
	h[g + 4] = m.x * n.a + m.y * n.c + n.tx;
	h[g + 5] = m.x * n.b + m.y * n.d + n.ty;
	h[g + 8] = k.x * n.a + k.y * n.c + n.tx;
	h[g + 9] = k.x * n.b + k.y * n.d + n.ty;
	g = f.count * 4;
	var e = q.c1;
	var d = q.c2;
	var b = q.c3;
	var a = q.c4;
	p[g + 0] = p[g + 12] = e.r * c.r;
	p[g + 1] = p[g + 13] = e.g * c.g;
	p[g + 2] = p[g + 14] = e.b * c.b;
	p[g + 3] = p[g + 15] = e.a * c.a;
	p[g + 4] = p[g + 20] = b.r * c.r;
	p[g + 5] = p[g + 21] = b.g * c.g;
	p[g + 6] = p[g + 22] = b.b * c.b;
	p[g + 7] = p[g + 23] = b.a * c.a;
	p[g + 8] = d.r * c.r;
	p[g + 9] = d.g * c.g;
	p[g + 10] = d.b * c.b;
	p[g + 11] = d.a * c.a;
	p[g + 16] = a.r * c.r;
	p[g + 17] = a.g * c.g;
	p[g + 18] = a.b * c.b;
	p[g + 19] = a.a * c.a;
	f.count += 6
};
GEMIOLI.TextureQuadMaterialVertexShader = "	uniform mat4 modelViewMatrix;	uniform mat4 projectionMatrix;	attribute vec2 position;	attribute vec4 color;	attribute vec2 uv;	varying vec4 vColor;	varying vec2 vUv;	void main() {		vColor = color;		vUv = uv;		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);	}";
GEMIOLI.TextureQuadMaterialFragmentShader = "	varying vec4 vColor;	varying vec2 vUv;	uniform sampler2D map;	void main() {		gl_FragColor = vColor * texture2D(map, vUv);	}";
GEMIOLI.TextureQuadMaterial = function(a) {
	var b = "precision " + GEMIOLI.Renderer.getPrecision() + " float;\nprecision " + GEMIOLI.Renderer.getPrecision() + " int;\n";
	THREE.RawShaderMaterial.call(this, {
		uniforms: {
			map: {
				type: "t",
				value: a
			}
		},
		attributes: {},
		vertexShader: b + GEMIOLI.TextureQuadMaterialVertexShader,
		fragmentShader: b + GEMIOLI.TextureQuadMaterialFragmentShader,
		depthTest: false,
		depthWrite: false,
		transparent: true
	})
};
GEMIOLI.TextureQuadMaterial.prototype = Object.create(THREE.RawShaderMaterial.prototype);
GEMIOLI.TextureQuadMaterial.prototype.constructor = GEMIOLI.TextureQuadMaterial;
GEMIOLI.TextureQuad = function() {
	GEMIOLI.Quad.call(this);
	this.uv1 = new THREE.Vector2(0, 1);
	this.uv2 = new THREE.Vector2(1, 1);
	this.uv3 = new THREE.Vector2(1, 0);
	this.uv4 = new THREE.Vector2(0, 0);
	this.texture = GEMIOLI.TextureLoader.DEFAULT
};
GEMIOLI.TextureQuad.fromRect = function(c, f, d, b, e) {
	var a = new GEMIOLI.TextureQuad();
	a.setRectangle(c, f, d, b);
	a.texture = e;
	return a
};
GEMIOLI.TextureQuad.materials = {};
GEMIOLI.TextureQuad.immediateRenderCallback = function(a, c, b) {
	if (!this.__webglVertexBuffer) {
		this.__webglVertexBuffer = c.createBuffer()
	}
	c.bindBuffer(c.ARRAY_BUFFER, this.__webglVertexBuffer);
	c.bufferData(c.ARRAY_BUFFER, this.positionArray, c.DYNAMIC_DRAW);
	var d = c.getVertexAttrib(a.attributes.position, c.VERTEX_ATTRIB_ARRAY_ENABLED);
	if (!d) {
		c.enableVertexAttribArray(a.attributes.position)
	}
	c.vertexAttribPointer(a.attributes.position, 2, c.FLOAT, false, 0, 0);
	if (!this.__webglUvBuffer) {
		this.__webglUvBuffer = c.createBuffer()
	}
	c.bindBuffer(c.ARRAY_BUFFER, this.__webglUvBuffer);
	c.bufferData(c.ARRAY_BUFFER, this.uvArray, c.DYNAMIC_DRAW);
	var e = c.getVertexAttrib(a.attributes.uv, c.VERTEX_ATTRIB_ARRAY_ENABLED);
	if (!e) {
		c.enableVertexAttribArray(a.attributes.uv)
	}
	c.vertexAttribPointer(a.attributes.uv, 2, c.FLOAT, false, 0, 0);
	if (!this.__webglColorBuffer) {
		this.__webglColorBuffer = c.createBuffer()
	}
	c.bindBuffer(c.ARRAY_BUFFER, this.__webglColorBuffer);
	c.bufferData(c.ARRAY_BUFFER, this.colorArray, c.DYNAMIC_DRAW);
	var f = c.getVertexAttrib(a.attributes.color, c.VERTEX_ATTRIB_ARRAY_ENABLED);
	if (!f) {
		c.enableVertexAttribArray(a.attributes.color)
	}
	c.vertexAttribPointer(a.attributes.color, 4, c.FLOAT, false, 0, 0);
	c.drawArrays(c.TRIANGLES, 0, this.count);
	this.count = 0;
	if (!d) {
		c.disableVertexAttribArray(a.attributes.position)
	}
	if (!e) {
		c.disableVertexAttribArray(a.attributes.uv)
	}
	if (!f) {
		c.disableVertexAttribArray(a.attributes.color)
	}
};
GEMIOLI.TextureQuad.prototype = Object.create(GEMIOLI.Quad.prototype);
GEMIOLI.TextureQuad.prototype.constructor = GEMIOLI.TextureQuad;
GEMIOLI.TextureQuad.prototype.setUvRectangle = function(b, d, c, a) {
	this.uv1.set(b, d);
	this.uv2.set(b + c, d);
	this.uv3.set(b + c, d + a);
	this.uv4.set(b, d + a)
};
GEMIOLI.TextureQuad.prototype.setUvBox = function(b, d, a, c) {
	this.uv1.set(b, d);
	this.uv2.set(a, d);
	this.uv3.set(a, c);
	this.uv4.set(b, c)
};
GEMIOLI.TextureQuad.prototype.setTexture = function(a) {};
GEMIOLI.TextureQuad.prototype.render = function(a) {
	a.batchTextureQuad(this);
	GEMIOLI.DisplayObjectContainer.prototype.render.call(this, a)
};
GEMIOLI.Batcher.prototype.batchTextureQuad = function(h) {
	var l = this.batches[this.batchIndex];
	if ((l.type !== GEMIOLI.TextureQuad) || (l.blending !== h.blending) || (l.texture !== h.texture)) {
		this.flush();
		l = this.batches[this.batchIndex];
		l.type = GEMIOLI.TextureQuad;
		if (!l.positionArray) {
			l.positionArray = new Float32Array(6 * 2)
		}
		if (!l.uvArray) {
			l.uvArray = new Float32Array(6 * 2)
		}
		if (!l.colorArray) {
			l.colorArray = new Float32Array(6 * 4)
		}
		var j = GEMIOLI.TextureQuad.materials[h.texture.id];
		if (!j) {
			j = new GEMIOLI.TextureQuadMaterial(h.texture);
			GEMIOLI.TextureQuad.materials[h.texture.id] = j
		}
		l.material = j;
		l.blending = l.material.blending = h.blending;
		l.texture = h.texture;
		l.immediateRenderCallback = GEMIOLI.TextureQuad.immediateRenderCallback
	}
	var g = l.count;
	var a = l.positionArray;
	if ((g + 6) * 2 > a.length) {
		l.positionArray = new Float32Array(a.length * 2);
		l.positionArray.set(a, 0);
		a = l.positionArray
	}
	var k = l.uvArray;
	if ((g + 6) * 2 > k.length) {
		l.uvArray = new Float32Array(k.length * 2);
		l.uvArray.set(k, 0);
		k = l.uvArray
	}
	var f = l.colorArray;
	if ((g + 6) * 4 > f.length) {
		l.colorArray = new Float32Array(f.length * 2);
		l.colorArray.set(f, 0);
		f = l.colorArray
	}
	var r = this.modelViewMatrix;
	var q = this.color;
	g = l.count * 2;
	var e = h.v1;
	var d = h.v2;
	var c = h.v3;
	var b = h.v4;
	a[g + 0] = a[g + 6] = e.x * r.a + e.y * r.c + r.tx;
	a[g + 1] = a[g + 7] = e.x * r.b + e.y * r.d + r.ty;
	a[g + 2] = a[g + 10] = c.x * r.a + c.y * r.c + r.tx;
	a[g + 3] = a[g + 11] = c.x * r.b + c.y * r.d + r.ty;
	a[g + 4] = d.x * r.a + d.y * r.c + r.tx;
	a[g + 5] = d.x * r.b + d.y * r.d + r.ty;
	a[g + 8] = b.x * r.a + b.y * r.c + r.tx;
	a[g + 9] = b.x * r.b + b.y * r.d + r.ty;
	g = l.count * 2;
	var A = h.uv1;
	var v = h.uv2;
	var u = h.uv3;
	var t = h.uv4;
	k[g + 0] = k[g + 6] = A.x;
	k[g + 1] = k[g + 7] = A.y;
	k[g + 2] = k[g + 10] = u.x;
	k[g + 3] = k[g + 11] = u.y;
	k[g + 4] = v.x;
	k[g + 5] = v.y;
	k[g + 8] = t.x;
	k[g + 9] = t.y;
	g = l.count * 4;
	var p = h.c1;
	var o = h.c2;
	var n = h.c3;
	var m = h.c4;
	f[g + 0] = f[g + 12] = p.r * q.r;
	f[g + 1] = f[g + 13] = p.g * q.g;
	f[g + 2] = f[g + 14] = p.b * q.b;
	f[g + 3] = f[g + 15] = p.a * q.a;
	f[g + 4] = f[g + 20] = n.r * q.r;
	f[g + 5] = f[g + 21] = n.g * q.g;
	f[g + 6] = f[g + 22] = n.b * q.b;
	f[g + 7] = f[g + 23] = n.a * q.a;
	f[g + 8] = o.r * q.r;
	f[g + 9] = o.g * q.g;
	f[g + 10] = o.b * q.b;
	f[g + 11] = o.a * q.a;
	f[g + 16] = m.r * q.r;
	f[g + 17] = m.g * q.g;
	f[g + 18] = m.b * q.b;
	f[g + 19] = m.a * q.a;
	l.count += 6
};
GEMIOLI.AtlasQuad = function() {
	GEMIOLI.TextureQuad.call(this);
	this.region = null;
	var a = this;
	this.onRegionLoad = function(b) {
		var c = a.region;
		if (c) {
			a.texture = c.texture;
			a.setUvBox(c.u1, c.v1, c.u2, c.v2)
		} else {
			a.texture = GEMIOLI.TextureLoader.DEFAULT
		}
	}
};
GEMIOLI.AtlasQuad.fromRect = function(c, g, e, b, d, f) {
	var a = new GEMIOLI.AtlasQuad();
	a.setRectangle(c, g, e, b);
	a.setRegion(GEMIOLI.AtlasLoader.loadRegion(d, f));
	return a
};
GEMIOLI.AtlasQuad.prototype = Object.create(GEMIOLI.TextureQuad.prototype);
GEMIOLI.AtlasQuad.prototype.constructor = GEMIOLI.AtlasQuad;
GEMIOLI.AtlasQuad.prototype.setRegion = function(a) {
	if (this.region) {
		this.region.removeEventListener("load", this.onRegionLoad, false)
	}
	this.region = a;
	this.onRegionLoad(null);
	if (this.region) {
		this.region.addEventListener("load", this.onRegionLoad, false)
	}
};
GEMIOLI.Text = function(e, c, d, b, g, a) {
	GEMIOLI.DisplayObjectContainer.call(this);
	this.size = e;
	this.textAlign = d || GEMIOLI.Text.LEFT_ALIGN;
	this.hAlign = b || GEMIOLI.Text.LEFT_ALIGN;
	this.vAlign = g || GEMIOLI.Text.TOP_ALIGN;
	this.color = a || new GEMIOLI.Color(1, 1, 1, 1);
	this.offset = 0;
	this.lineOffset = 0;
	this.text = "";
	this.textWidth = 0;
	this.textHeight = 0;
	this.font = c;
	var f = this;
	this._onFontLoad = function(h) {
		if (f._font) {
			f._font.removeEventListener("load", f._onFontLoad, false)
		}
		f._font = null
	}
};
GEMIOLI.Text.fromUrl = function(e, d, c, b, f, a) {
	return new GEMIOLI.Text(e, GEMIOLI.FontLoader.load(d), c, b, f, a)
};
GEMIOLI.Text.fromAtlas = function(f, e, a, d, c, g, b) {
	return new GEMIOLI.Text(f, GEMIOLI.FontLoader.loadFromAtlas(e, a), d, c, g, b)
};
GEMIOLI.Text.LEFT_ALIGN = 0;
GEMIOLI.Text.CENTER_ALIGN = 1;
GEMIOLI.Text.RIGHT_ALIGN = 2;
GEMIOLI.Text.TOP_ALIGN = 3;
GEMIOLI.Text.BOTTOM_ALIGN = 4;
GEMIOLI.Text.prototype = Object.create(GEMIOLI.DisplayObjectContainer.prototype);
GEMIOLI.Text.prototype.constructor = GEMIOLI.Text;
GEMIOLI.Text.prototype.layout = function() {
	if (this.text !== this._text || this.font !== this._font || this.textAlign !== this._textAlign || this.hAlign !== this._hAlign || this.vAlign !== this._vAlign) {
		this._text = this.text;
		if (this._font) {
			this._font.removeEventListener("load", this._onFontLoad, false)
		}
		this._font = this.font;
		if (this._font) {
			this._font.addEventListener("load", this._onFontLoad, false)
		}
		this._textAlign = this.textAlign;
		this._hAlign = this.hAlign;
		this._vAlign = this.vAlign;
		this._lineWidths = [];
		this._cacheText = "";
		this.textWidth = 0;
		this.textHeight = 0;
		if (this._font) {
			var h = "";
			var q = this.text;
			var d = this._font;
			for (var g = 0, f = q.length; g < f; ++g) {
				if (d.glyphs[q.charCodeAt(g)] || q[g] === "\n") {
					h += q[g]
				}
			}
			this._cacheText = h;
			q = h;
			var c = q.length;
			var e = this.size / d.size;
			var p = 0,
				n = 0,
				b = 0,
				o = 0;
			var j = 0;
			var m = 0;
			var a = d.base * e;
			for (var g = 0; g < c; ++g) {
				if (q[g] == "\n") {
					this._lineWidths.push(b);
					p = 0;
					n += (d.height + this.lineOffset) * e;
					continue
				}
				var k = d.glyphs[q.charCodeAt(g)];
				b = p + k.x * e + k.w * e;
				if (j < b) {
					j = b
				}
				o = n + k.y * e + k.h * e;
				if (m < o) {
					m = o
				}
				p += (k.xa + this.offset) * e
			}
			this._lineWidths.push(b);
			this.textWidth = j;
			this.textHeight = m
		}
	}
};
GEMIOLI.Text.prototype.render = function(m) {
	this.layout();
	if (!this._font) {
		return
	}
	var A = m.batches[m.batchIndex];
	var B = this._font;
	var J = this.size / B.size;
	var o = 0,
		n = 0;
	var h = this.textWidth;
	var a = this.textHeight;
	var K = this._lineWidths;
	var p = 0;
	var t = this._cacheText;
	var j = t.length;
	switch (this.vAlign) {
		case GEMIOLI.Text.CENTER_ALIGN:
			n = -a / 2;
			break;
		case GEMIOLI.Text.BOTTOM_ALIGN:
			n = -a;
			break;
		default:
			n = 0
	}
	for (i = 0; i < j; ++i) {
		var r = t[i];
		if (r === "\n" || i === 0) {
			if (r === "\n") {
				++p
			}
			switch (this.textAlign) {
				case GEMIOLI.Text.CENTER_ALIGN:
					o = (h - K[p]) / 2;
					break;
				case GEMIOLI.Text.RIGHT_ALIGN:
					o = h - K[p];
					break;
				default:
					o = 0
			}
			switch (this.hAlign) {
				case GEMIOLI.Text.CENTER_ALIGN:
					o -= h / 2;
					break;
				case GEMIOLI.Text.RIGHT_ALIGN:
					o -= h;
					break
			}
			if (r === "\n") {
				n += (B.height + this.lineOffset) * J;
				continue
			}
		}
		var q = B.glyphs[t.charCodeAt(i)];
		var u = B.pages[q.p];
		if ((A.type !== GEMIOLI.TextureQuad) || (A.texture !== u)) {
			m.flush();
			A = m.batches[m.batchIndex];
			A.type = GEMIOLI.TextureQuad;
			if (!A.positionArray) {
				A.positionArray = new Float32Array(6 * 2)
			}
			if (!A.uvArray) {
				A.uvArray = new Float32Array(6 * 2)
			}
			if (!A.colorArray) {
				A.colorArray = new Float32Array(6 * 4)
			}
			A.material = new GEMIOLI.TextureQuadMaterial(u);
			A.texture = u;
			A.immediateRenderCallback = GEMIOLI.TextureQuad.immediateRenderCallback
		}
		var l = A.count;
		var b = A.positionArray;
		if ((l + 6) * 2 > b.length) {
			A.positionArray = new Float32Array(b.length * 2);
			A.positionArray.set(b, 0);
			b = A.positionArray
		}
		var v = A.uvArray;
		if ((l + 6) * 2 > v.length) {
			A.uvArray = new Float32Array(v.length * 2);
			A.uvArray.set(v, 0);
			v = A.uvArray
		}
		var k = A.colorArray;
		if ((l + 6) * 4 > k.length) {
			A.colorArray = new Float32Array(k.length * 2);
			A.colorArray.set(k, 0);
			k = A.colorArray
		}
		var E = m.modelViewMatrix;
		var C = m.color;
		l = A.count * 2;
		var H = o + q.x * J,
			g = n + q.y * J;
		var G = H + q.w * J,
			f = g;
		var F = G,
			e = f + q.h * J;
		var D = H,
			d = e;
		b[l + 0] = b[l + 6] = H * E.a + g * E.c + E.tx;
		b[l + 1] = b[l + 7] = H * E.b + g * E.d + E.ty;
		b[l + 2] = b[l + 10] = F * E.a + e * E.c + E.tx;
		b[l + 3] = b[l + 11] = F * E.b + e * E.d + E.ty;
		b[l + 4] = G * E.a + f * E.c + E.tx;
		b[l + 5] = G * E.b + f * E.d + E.ty;
		b[l + 8] = D * E.a + d * E.c + E.tx;
		b[l + 9] = D * E.b + d * E.d + E.ty;
		l = A.count * 2;
		v[l + 0] = v[l + 6] = q.u1;
		v[l + 1] = v[l + 7] = q.v1;
		v[l + 2] = v[l + 10] = q.u2;
		v[l + 3] = v[l + 11] = q.v2;
		v[l + 4] = q.u2;
		v[l + 5] = q.v1;
		v[l + 8] = q.u1;
		v[l + 9] = q.v2;
		l = A.count * 4;
		var I = this.color;
		k[l + 0] = k[l + 12] = I.r * C.r;
		k[l + 1] = k[l + 13] = I.g * C.g;
		k[l + 2] = k[l + 14] = I.b * C.b;
		k[l + 3] = k[l + 15] = I.a * C.a;
		k[l + 4] = k[l + 20] = I.r * C.r;
		k[l + 5] = k[l + 21] = I.g * C.g;
		k[l + 6] = k[l + 22] = I.b * C.b;
		k[l + 7] = k[l + 23] = I.a * C.a;
		k[l + 8] = I.r * C.r;
		k[l + 9] = I.g * C.g;
		k[l + 10] = I.b * C.b;
		k[l + 11] = I.a * C.a;
		k[l + 16] = I.r * C.r;
		k[l + 17] = I.g * C.g;
		k[l + 18] = I.b * C.b;
		k[l + 19] = I.a * C.a;
		A.count += 6;
		o += (q.xa + this.offset) * J
	}
	GEMIOLI.DisplayObjectContainer.prototype.render.call(this, m)
};
GEMIOLI.Button = function(b, e, c, a, d) {
	GEMIOLI.DisplayObjectContainer.call(this);
	this.set(b, e, c, a);
	this.bpoint = new THREE.Vector2();
	this.pointerId = -1;
	this.keys = (d || []);
	this.addEventListener("pointerdown", this.onPointerDown);
	this.addEventListener("pointerup", this.onPointerUp);
	this.addEventListener("pointermove", this.onPointerMove);
	this.addEventListener("pointercancel", this.onPointerCancel);
	this.addEventListener("keydown", this.onKeyDown);
	this.setState(GEMIOLI.Button.STATE_NORMAL)
};
GEMIOLI.Button.STATE_NORMAL = 0;
GEMIOLI.Button.STATE_HOVER = 1;
GEMIOLI.Button.STATE_PRESSED = 2;
GEMIOLI.Button.STATE_DISABLED = 3;
GEMIOLI.Button.inFocus = null;
GEMIOLI.Button.inHover = 0;
GEMIOLI.Button.prototype = Object.create(GEMIOLI.DisplayObjectContainer.prototype);
GEMIOLI.Button.prototype.constructor = GEMIOLI.Button;
GEMIOLI.Button.prototype.isUnderPoint = function(b, c) {
	var a = this.bpoint;
	a.set(b, c);
	this.globalToLocal(a, a);
	return (this.bx1 <= a.x && a.x <= this.bx2 && this.by1 <= a.y && a.y <= this.by2)
};
GEMIOLI.Button.prototype.setState = function(a) {
	if (this.bstate !== a) {
		this.bstate = a
	}
};
GEMIOLI.Button.prototype.render = (function() {
	var a = new GEMIOLI.Matrix();
	return function(b) {
		switch (this.bstate) {
			case GEMIOLI.Button.STATE_HOVER:
				a.a = a.d = 1.1;
				GEMIOLI.Button.inHover++;
				break;
			case GEMIOLI.Button.STATE_PRESSED:
				a.a = a.d = 0.9;
				break;
			default:
				a.a = a.d = 1;
				break
		}
		b.pushMatrix();
		b.prependMatrix(a);
		GEMIOLI.DisplayObjectContainer.prototype.render.call(this, b);
		b.popMatrix()
	}
})();
GEMIOLI.Button.prototype.set = function(b, d, c, a) {
	this.bx1 = b;
	this.by1 = d;
	this.bx2 = b + c;
	this.by2 = d + a
};
GEMIOLI.Button.prototype.onPointerDown = function(a) {
	if (GEMIOLI.Button.inFocus || !this.visible) {
		return
	}
	if (this.isUnderPoint(a.x, a.y)) {
		this.pointerId = a.pointerId;
		GEMIOLI.Button.inFocus = this;
		a.cancelled = true;
		if (this.bstate !== GEMIOLI.Button.STATE_DISABLED) {
			this.setState(GEMIOLI.Button.STATE_PRESSED)
		}
	}
};
GEMIOLI.Button.prototype.onPointerUp = function(a) {
	if ((GEMIOLI.Button.inFocus !== this) || (a.pointerId !== this.pointerId)) {
		return
	}
	GEMIOLI.Button.inFocus = null;
	this.pointerId = -1;
	if (this.bstate !== GEMIOLI.Button.STATE_DISABLED) {
		this.setState(GEMIOLI.Button.STATE_NORMAL)
	}
	if (this.isUnderPoint(a.x, a.y)) {
		this.dispatchEvent({
			type: "click"
		})
	}
};
GEMIOLI.Button.prototype.onPointerMove = function(a) {
	if (this.bstate === GEMIOLI.Button.STATE_DISABLED || !this.visible) {
		return
	}
	if (GEMIOLI.Button.inFocus) {
		if ((GEMIOLI.Button.inFocus !== this) || (a.pointerId !== this.pointerId)) {
			return
		}
		this.setState(this.isUnderPoint(a.x, a.y) ? GEMIOLI.Button.STATE_PRESSED : GEMIOLI.Button.STATE_NORMAL)
	} else {
		if (!a.down) {
			this.setState(this.isUnderPoint(a.x, a.y) && this.visible ? GEMIOLI.Button.STATE_HOVER : GEMIOLI.Button.STATE_NORMAL)
		}
	}
};
GEMIOLI.Button.prototype.onPointerCancel = function(a) {
	if ((GEMIOLI.Button.inFocus !== this) || (a.pointerId !== this.pointerId)) {
		return
	}
	GEMIOLI.Button.inFocus = null;
	this.pointerId = -1;
	if (this.bstate !== GEMIOLI.Button.STATE_DISABLED) {
		this.setState(GEMIOLI.Button.STATE_NORMAL)
	}
};
GEMIOLI.Button.prototype.onKeyDown = function(c) {
	if (GEMIOLI.Button.inFocus || !this.visible) {
		return
	}
	var b = c.keyCode;
	for (var a = 0; a < this.keys.length; ++a) {
		if (this.keys[a] === b) {
			c.preventDefault();
			c.cancelled = true;
			this.dispatchEvent({
				type: "click"
			});
			break
		}
	}
};
GEMIOLI.StaticButton = function(b, e, c, a, d) {
	GEMIOLI.Button.call(this, b, e, c, a, d)
};
GEMIOLI.StaticButton.prototype = Object.create(GEMIOLI.Button.prototype);
GEMIOLI.StaticButton.prototype.render = function(a) {
	GEMIOLI.DisplayObjectContainer.prototype.render.call(this, a);
	if (this.bstate === GEMIOLI.Button.STATE_HOVER) {
		GEMIOLI.Button.inHover++
	}
};
GEMIOLI.Cross = function() {
	GEMIOLI.Layer.call(this);
	var a = this;
	this.fade = new GEMIOLI.Quad();
	this.fade.setColorHex(4278190080);
	this.addChild(this.fade)
};
GEMIOLI.Cross.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Cross.prototype.resize = function() {
	GEMIOLI.Layer.prototype.resize.call(this);
	this.fade.setRectangle(0, 0, this.width, this.height)
};
GEMIOLI.Cross.prototype.show = function(a, b) {
	GEMIOLI.Application.pushLayer(this);
	this.time = 0;
	this.crossFunction = a;
	this.endFunction = b;
	this.runCross = false
};
GEMIOLI.Cross.prototype.update = function(a, b) {
	if (this.runCross) {
		this.runCross = false;
		GEMIOLI.Application.clearLayers();
		if (this.crossFunction) {
			this.crossFunction();
			this.crossFunction = null
		}
		GEMIOLI.Application.pushLayer(this)
	}
	var c = this.time;
	this.time += a;
	if (c < 0.5 && this.time >= 0.5) {
		this.time = 0.5;
		this.runCross = true
	} else {
		if (c < 1 && this.time >= 1) {
			this.time = 1;
			GEMIOLI.Application.popLayer();
			if (this.endFunction) {
				this.endFunction();
				this.endFunction = null
			}
		}
	}
	this.fade.tint.a = 1 - Math.abs(this.time * 2 - 1)
};
GEMIOLI.Preloader = function() {
	var a = this;
	GEMIOLI.Layer.call(a);
	a.fade = new GEMIOLI.Quad();
	a.fade.setColorHex(4283943679);
	a.addChild(a.fade);
	a.center = new GEMIOLI.DisplayObjectContainer();
	a.addChild(a.center);
	a.back = GEMIOLI.AtlasQuad.fromRect(-269, -267, 539, 535, "atlases/preloader.atlas", "back");
	a.light = GEMIOLI.AtlasQuad.fromRect(-263, -240, 526, 480, "atlases/preloader.atlas", "light");
	a.almaz = GEMIOLI.AtlasQuad.fromRect(-118, -150, 236, 301, "atlases/preloader.atlas", "almaz");
	a.back.y = a.light.y = a.almaz.y = -200;
	a.progressBack = GEMIOLI.AtlasQuad.fromRect(-297, -53, 594, 107, "atlases/preloader.atlas", "progress_bg");
	a.progress = GEMIOLI.AtlasQuad.fromRect(-272, -29, 545, 58, "atlases/preloader.atlas", "progress");
	a.progress.setXFactor = function(c) {
		var b = this;
		b.v2.set(-272 + 545 * c, -29);
		b.v3.set(-272 + 545 * c, -29 + 58);
		b.uv2.set((b.region.u2 - b.region.u1) * c + b.region.u1, b.region.v1);
		b.uv3.set((b.region.u2 - b.region.u1) * c + b.region.u1, b.region.v2)
	};
	a.progressTop = GEMIOLI.AtlasQuad.fromRect(-277, -34, 555, 68, "atlases/preloader.atlas", "progress_top");
	a.progressValue = 0;
	a.total = -1;
	a.progressBack.y = a.progress.y = a.progressTop.y = 300;
	a.loading = GEMIOLI.AtlasQuad.fromRect(-185, -48, 370, 96, "atlases/preloader.atlas", "loading");
	a.caution = GEMIOLI.AtlasQuad.fromRect(-545, -109, 1091, 218, "atlases/preloader.atlas", "caution");
	a.caution.y = 200;
	a.ready = new GEMIOLI.DisplayObjectContainer();
	a.ready.addChild(GEMIOLI.Utils.isMobile() ? GEMIOLI.AtlasQuad.fromRect(-371, -48, 742, 96, "atlases/preloader.atlas", "tap") : GEMIOLI.AtlasQuad.fromRect(-410, -47, 821, 95, "atlases/preloader.atlas", "click"));
	a.ready.y = a.loading.y = 160;
	a.ready.visible = false;
	a.time = 0;
	a.center.addEventListener("pointerdown", function(b) {
		if (a.ready.visible) {
			GEMIOLI.SoundLoader.load("button").play();
			GEMIOLI.Cross.show(function() {
				GEMIOLI.Application.pushLayer(GEMIOLI.Play);
				GEMIOLI.Application.pushLayer(GEMIOLI.Menu);
				GEMIOLI.Menu.show()
			})
		}
	});
	a.center.addEventListener("keydown", function(b) {
		if (b.keyCode === 13 || b.keyCode === 32) {
			a.center.dispatchEvent({
				type: "pointerdown"
			});
			b.preventDefault();
			b.cancelled = true
		}
	});
	GEMIOLI.TextureLoader.load("atlases/preloader.png");
	GEMIOLI.AtlasLoader.load("atlases/preloader.atlas", function() {
		GEMIOLI.TextureLoader.load("atlases/preloader.png", function() {
			a.center.addChild(a.back);
			a.center.addChild(a.light);
			a.center.addChild(a.almaz);
			a.center.addChild(a.progressBack);
			a.center.addChild(a.progress);
			a.center.addChild(a.progressTop);
			a.center.addChild(a.loading);
			a.center.addChild(a.ready);
			if (navigator.userAgent.toLowerCase().indexOf("samsung") > -1 && navigator.userAgent.indexOf("Android ") > -1) {
				a.addChild(a.caution)
			}
			if (GEMIOLI.SoundLoader.webaudio) {
				GEMIOLI.SoundLoader.load("sounds.ogg", "sounds.ogg");
				GEMIOLI.SoundLoader.loadAtlas("sound/sounds.js", "sounds.ogg", null, function(b) {
					if (window.console && window.console.log) {
						console.log("Can't load sound atlas", b)
					}
				})
			} else {
				GEMIOLI.XHRLoader.load("sound/sounds.js", function(e) {
					var b = JSON.parse(e.request.response);
					for (var d = 0, c = b.length; d < c; ++d) {
						GEMIOLI.SoundLoader.load(b[d].id, b[d].id + ".ogg")
					}
				}, function(b) {
					if (window.console && window.console.log) {
						console.log("Can't load sound atlas", b)
					}
				})
			}
			GEMIOLI.Cross = new GEMIOLI.Cross();
			GEMIOLI.Play = new GEMIOLI.Play();
			GEMIOLI.Menu = new GEMIOLI.Menu();
			GEMIOLI.Settings = new GEMIOLI.Settings();
			GEMIOLI.Pause = new GEMIOLI.Pause();
			GEMIOLI.Score = new GEMIOLI.Score();
			GEMIOLI.Shop = new GEMIOLI.Shop();
			a.total = GEMIOLI.Loader.getQueueLength()
		}, function() {
			if (window.console && window.console.log) {
				console.log("Can't load Preloader atlas texture", event)
			}
		})
	}, function(b) {
		if (window.console && window.console.log) {
			console.log("Can't load Preloader atlas", b)
		}
	})
};
GEMIOLI.Preloader.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Preloader.prototype.resize = function() {
	var a = this;
	GEMIOLI.Layer.prototype.resize.call(a);
	a.fade.setRectangle(0, 0, a.width, a.height);
	a.center.x = a.width / 2;
	a.center.y = a.height / 2;
	a.caution.x = a.width / 2
};
GEMIOLI.Preloader.prototype.update = function(b, c) {
	var a = this;
	if (a.total === -1) {
		return
	}
	var d = GEMIOLI.Loader.getQueueLength();
	if (d > a.total) {
		a.total = d
	}
	a.progressValue = Math.max(a.progressValue, 1 - d / a.total);
	a.progress.setXFactor(a.progressValue);
	if (d === 0) {
		a.loading.visible = false;
		a.ready.visible = true;
		a.progress.visible = false;
		a.progressBack.visible = false;
		a.progressTop.visible = false
	}
	if (a.ready.visible) {
		a.time += b;
		a.light.rotation = 40 * a.time;
		a.light.scaleX = a.light.scaleY = 1 + 0.3 * Math.abs(Math.sin(2 * a.time));
		a.almaz.y = -200 + 10 * Math.sin(2 * a.time);
		a.ready.tint.a = 0.2 + 0.8 * Math.abs(Math.sin(8 * a.time))
	}
};
GEMIOLI.Logo = function(b, e, c, a) {
	var d = this;
	GEMIOLI.StaticButton.call(d, b, e, c, a);
	d.quad = new GEMIOLI.LogoQuad(b, e, c, a);
	d.addChild(d.quad);
	d.addEventListener("click", function(f) {
		GEMIOLI.SoundLoader.load("button").play();
		if (SpilData.logoData && SpilData.logoData.action) {
			SpilData.logoData.action.call(d)
		}
	});
	d.visible = false;
	SpilData.onLoad(function() {
		if (SpilData.logoData.image) {
			d.visible = true
		}
	})
};
GEMIOLI.Logo.prototype = Object.create(GEMIOLI.StaticButton.prototype);
GEMIOLI.LogoQuad = function(b, e, c, a) {
	var d = this;
	GEMIOLI.TextureQuad.call(d);
	d.rectangle = new THREE.Vector4(b, e, c, a);
	d.setRectangle(d.rectangle.x, d.rectangle.y, d.rectangle.z, d.rectangle.w);
	d.visible = false;
	SpilData.onLoad(function() {
		d.onSpilDataLoad()
	})
};
GEMIOLI.LogoQuad.prototype = Object.create(GEMIOLI.TextureQuad.prototype);
GEMIOLI.LogoQuad.prototype.onSpilDataLoad = function() {
	var a = this;
	if (SpilData.logoData.image) {
		GEMIOLI.TextureLoader.load(SpilData.logoData.image, function(e) {
			a.visible = true;
			a.texture = e;
			var b = e.image.width;
			var d = e.image.height;
			var c = Math.min(a.rectangle.z / b, a.rectangle.w / d);
			b *= c;
			d *= c;
			a.setRectangle(a.rectangle.x + a.rectangle.z / 2 - b / 2, a.rectangle.y + a.rectangle.w / 2 - d / 2, b, d)
		})
	}
};
GEMIOLI.Play = function() {
	GEMIOLI.Layer.call(this);
	var B = this;
	var u = new THREE.Object3D();
	var Y = new THREE.Scene();
	u.add(Y);
	var j = new THREE.Scene();
	j.fog = new THREE.Fog(16777215, 3000, 4000);
	u.add(j);
	var V = new THREE.Scene();
	V.fog = new THREE.Fog(16777215, 3000, 4000);
	u.add(V);
	var l = new THREE.Scene();
	l.fog = j.fog;
	u.add(l);
	var q = new GEMIOLI.List();
	u.childs = q;
	u.add = function(Z) {
		Z.sceneNode = q.add(Z);
		if (Z.ground) {
			j.add(Z)
		} else {
			if (Z.isShadow) {
				V.add(Z)
			} else {
				if (Z.sky) {
					Y.add(Z)
				} else {
					l.add(Z)
				}
			}
		}
	};
	u.remove = function(Z) {
		if (Z.sceneNode) {
			q.removeNode(Z.sceneNode);
			Z.sceneNode = null;
			if (Z.ground) {
				j.remove(Z)
			} else {
				if (Z.isShadow) {
					V.remove(Z)
				} else {
					if (Z.sky) {
						Y.remove(Z)
					} else {
						l.remove(Z)
					}
				}
			}
		}
	};
	B.scene3D = u;
	var o = new THREE.PerspectiveCamera(50, GEMIOLI.Application.innerWidth / GEMIOLI.Application.innerHeight, 10, 5000),
		v = new THREE.Frustum();
	o.target = new THREE.Vector3();
	v.helpMatrix = new THREE.Matrix4();
	B.camera3D = o;
	B.frustum = v;
	var r = new GEMIOLI.List();
	B.toUpdate = r;
	var F = new GEMIOLI.List();
	B.toAdd = F;
	var m = new GEMIOLI.List();
	B.toRemove = m;
	B.player = null;
	B.bendMaterials = [];
	B.bendOffset = 0;
	B.distance = 0;
	B.playerSpeed = 1000;
	B.playerSpeedMode = 0;
	B.bendX = B.bendY = 0;
	if (GEMIOLI.Application.DEBUG) {
		B.playerSpeedMode = 1;
		B.debugLevel = -1;
		B.debugLevels = []
	}
	var O = null,
		k = null,
		M = null,
		a = null,
		S = null,
		g = null,
		L;
	var J = new THREE.BufferGeometry();
	J.addAttribute("index", new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 0, 3, 2]), 1));
	J.addAttribute("position", new THREE.BufferAttribute(new Float32Array([-0.5, 0, -0.5, 0.5, 0, -0.5, 0.5, 0, 0.5, -0.5, 0, 0.5]), 3));
	J.addAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]), 2));
	var D = new THREE.BufferGeometry();
	D.addAttribute("index", new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 0, 2, 3]), 1));
	D.addAttribute("position", new THREE.BufferAttribute(new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]), 3));
	D.addAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
	var N = new THREE.Vector3();
	var I = 0,
		E = 1;
	var G = function G(ad, aa, Z, ac) {
		var ab = this;
		THREE.Mesh.call(this, ad, aa);
		ab.ground = true;
		ab.type = Z || E;
		ab.box = ac || ad.boundingBox;
		ab.wood = false;
		ab.boundingBox = new THREE.Box3();
		ab.addEventListener("added", ab.onAdded);
		ab.addEventListener("removed", ab.onRemoved)
	};
	G.prototype = Object.create(THREE.Mesh.prototype);
	G.prototype.onAdded = function() {
		var Z = this;
		Z.onPositionChange();
		Z.updateNode = r.add(Z)
	};
	G.prototype.onRemoved = function() {
		var Z = this;
		r.removeNode(Z.updateNode);
		Z.updateNode = null
	};
	G.prototype.update = (function() {
		var aa, Z, ab;
		return function(ac) {
			aa = this.boundingBox;
			Z = aa.min;
			ab = aa.max;
			if (S.x <= ab.x && S.x >= Z.x && S.z <= ab.z && S.z >= Z.z) {
				O.surface = this.type;
				O.wood = this.wood;
				return true
			} else {
				return false
			}
		}
	})();
	G.prototype.onPositionChange = function() {
		var Z = this;
		Z.updateMatrixWorld(true);
		Z.boundingBox.copy(Z.box);
		Z.boundingBox.applyMatrix4(Z.matrixWorld)
	};
	var C = function(ae, ab, aa, ad, Z) {
		var ac = this;
		G.call(ac, ae, ab, aa);
		ac.centerPoint = new THREE.Vector3();
		ac.direction = new THREE.Vector3();
		ac.left = ad || false;
		ac.right = Z || false
	};
	C.prototype = Object.create(G.prototype);
	C.prototype.onAdded = function() {
		var Z = this;
		Z.playerRotated = false;
		Z.player = 0;
		G.prototype.onAdded.call(Z)
	};
	C.prototype.update = (function() {
		var ab, Z, ac, aa;
		return function(ad) {
			aa = this;
			ab = aa.boundingBox;
			Z = ab.min;
			ac = ab.max;
			if (S.x <= ac.x && S.x >= Z.x && S.z <= ac.z && S.z >= Z.z) {
				O.surface = aa.type;
				O.cross = aa
			}
			if (!aa.playerRotated && N.copy(k).sub(aa.centerPoint).dot(aa.direction) >= 0) {
				if (aa.left && aa.player === -1) {
					O.clearRotation.y += Math.PI / 2;
					O.clearPosition.copy(aa.centerPoint);
					GEMIOLI.SoundLoader.load("turn").play()
				} else {
					if (aa.right && aa.player === 1) {
						O.clearRotation.y -= Math.PI / 2;
						O.clearPosition.copy(aa.centerPoint);
						GEMIOLI.SoundLoader.load("turn").play()
					}
				}
				aa.playerRotated = true
			}
		}
	})();
	C.prototype.onPositionChange = function() {
		var Z = this;
		G.prototype.onPositionChange.call(Z);
		Z.centerPoint.set(1016, 0, -195, 907).applyMatrix4(Z.matrixWorld);
		Z.direction.set(1, 0, 0).applyEuler(Z.rotation)
	};
	var Q = function G(Z) {
		var aa = this;
		THREE.Mesh.call(this, D, Z);
		aa.sscale = 1;
		aa.srotation = 0
	};
	Q.prototype = Object.create(THREE.Mesh.prototype);
	Q.prototype.update = function() {
		var Z = this;
		Z.material.uniforms.scale.value = Z.sscale;
		Z.material.uniforms.rotation.value = Z.srotation
	};
	var X = ["Level01.js", "Level02.js", "Level03.js", "Level04.js", "Level05.js", "Level06.js", "Level07.js", "Level08.js", "Level09.js", "Level010.js", "Level011.js", "Level012.js", "Level013.js", "Level014.js", "Level015.js", "Level016.js", "Level017.js", "Level018.js", "Level19.js", "Level20.js", "Level21.js", "Level022.js", "Level023.js"];
	var R = ["TileLLevel.js", "TileRLevel.js", "TileDoubleLevel.js"];
	var P = function P(Z, ad, aa, ab) {
		var ac = this;
		THREE.Object3D.call(ac);
		ac.addEventListener("added", ac.onAdded);
		ac.addEventListener("removed", ac.onRemoved);
		ac.objectsData = Z;
		ac.defaultBox = ad;
		ac.box = new THREE.Box3();
		ac.instances = new GEMIOLI.List();
		ac.nextLevel = null;
		ac.nextLevelId = null;
		ac.end = new THREE.Vector3();
		ac.nextLevel1 = ac.nextLevel2 = null;
		ac.nextLevel1Id = ac.nextLevel2Id = null;
		ac.level1Offset = aa;
		ac.level2Offset = ab;
		if (ac.level1Offset) {
			ac.end1 = new THREE.Vector3()
		}
		if (ac.level2Offset) {
			ac.end2 = new THREE.Vector3()
		}
	};
	P.prototype = Object.create(THREE.Object3D.prototype);
	var T = false,
		e = ["models/Mnojitel.js", "models/Schit.js", "models/Magnit.js"];
	P.prototype.onAdded = function() {
		var af = this,
			ab = af.objectsData,
			aa, ad, Z = af.position;
		af.onPositionChange();
		for (var ae = 0, ac = ab.length; ae < ac; ++ae) {
			ad = ab[ae];
			if (ad.id === "models/Schit.js") {
				if (O.schitTime > 0 || O.magnetTime > 0 || O.multiplicatorTime > 0 || T) {
					continue
				} else {
					T = true;
					af.timeBonus = true;
					aa = B.objectFromPool(e[GEMIOLI.Utils.rand() % e.length])
				}
			} else {
				aa = B.objectFromPool(ad.id)
			}
			aa.position.copy(ad.position);
			aa.position.applyMatrix4(af.matrixWorld);
			aa.rotation.copy(ad.rotation);
			aa.rotation.y += af.rotation.y;
			aa.scale.copy(ad.scale);
			aa.addEventListener("removed", af.onInstanceRemoved);
			aa.level = af;
			aa.levelNode = af.instances.add(aa);
			F.add(aa)
		}
		af.updateNode = r.add(af);
		if (B.tutorial) {
			if (af.objectType === "Nachalo.js") {
				af.nextLevelId = "Level_Tut01.js"
			}
			if (af.objectType === "Level_Tut01.js") {
				af.nextLevelId = "TileLLevel.js"
			} else {
				if ((af.objectType === "TileLLevel.js")) {
					af.nextLevel1Id = "Level_Tut02.js"
				} else {
					if ((af.objectType === "Level_Tut02.js")) {
						af.nextLevelId = "TileRLevel.js"
					}
				}
			}
		}
		af.wasPlayer = false;
		if (window.console && window.console.log) {
			console.log("show", af.objectType, af.id)
		}
	};
	P.prototype.onRemoved = function() {
		var aa = this,
			Z = aa.instances.head;
		while (Z) {
			m.add(Z.data);
			Z = Z.next
		}
		r.removeNode(aa.updateNode);
		aa.updateNode = null;
		if (aa.nextLevel && !aa.nextLevel.wasPlayer) {
			m.add(aa.nextLevel)
		}
		if (aa.nextLevel1 && !aa.nextLevel1.wasPlayer) {
			m.add(aa.nextLevel1)
		}
		if (aa.nextLevel2 && !aa.nextLevel2.wasPlayer) {
			m.add(aa.nextLevel2)
		}
		aa.nextLevel = aa.nextLevel1 = aa.nextLevel2 = aa.nextLevelId = aa.nextLevel1Id = aa.nextLevel2Id = null;
		if (aa.timeBonus) {
			aa.timeBonus = false;
			T = false
		}
		if (window.console && window.console.log) {
			console.log("hide", aa.objectType, aa.id)
		}
	};
	P.prototype.update = (function() {
		var aa, Z, ab;
		return function(ae) {
			var ad = this,
				ac = ad.box;
			Z = ac.min;
			ab = ac.max;
			if (S.x <= ab.x && S.x >= Z.x && S.z <= ab.z && S.z >= Z.z) {
				ad.wasPlayer = true
			}
			if (v.intersectsBox(ad.box)) {
				if (!ad.level1Offset && !ad.level2Offset) {
					if (!ad.nextLevel) {
						if (B.debugLevel === undefined || B.debugLevel === -1) {
							if (B.lineDistance <= 0) {
								ad.nextLevel = B.objectFromPool(R[GEMIOLI.Utils.rand() % R.length]);
								B.lineDistance = 2000 + Math.random() * 5000
							} else {
								ad.nextLevel = B.objectFromPool(ad.nextLevelId || (ad.nextLevelId = X[GEMIOLI.Utils.rand() % X.length]))
							}
						} else {
							ad.nextLevel = B.objectFromPool(B.debugLevels[B.debugLevel])
						}
						ad.nextLevel.position.copy(ad.end);
						ad.nextLevel.rotation.copy(ad.rotation);
						F.add(ad.nextLevel)
					}
				} else {
					if (ad.level1Offset) {
						if (!ad.nextLevel1) {
							ad.nextLevel1 = B.objectFromPool(ad.nextLevel1Id || (ad.nextLevel1Id = X[GEMIOLI.Utils.rand() % X.length]));
							ad.nextLevel1.position.copy(ad.end1);
							ad.nextLevel1.rotation.copy(ad.rotation);
							ad.nextLevel1.rotation.y += Math.PI / 2;
							F.add(ad.nextLevel1)
						}
					}
					if (ad.level2Offset) {
						if (!ad.nextLevel2) {
							ad.nextLevel2 = B.objectFromPool(ad.nextLevel2Id || (ad.nextLevel2Id = X[GEMIOLI.Utils.rand() % X.length]));
							ad.nextLevel2.position.copy(ad.end2);
							ad.nextLevel2.rotation.copy(ad.rotation);
							ad.nextLevel2.rotation.y -= Math.PI / 2;
							F.add(ad.nextLevel2)
						}
					}
				}
			} else {
				if (ad.wasPlayer) {
					m.add(ad)
				}
			}
		}
	})();
	P.prototype.onPositionChange = function() {
		var Z = this;
		Z.updateMatrixWorld(true);
		Z.box.copy(Z.defaultBox).applyMatrix4(Z.matrixWorld);
		Z.end.set(Z.defaultBox.max.x, 0, 0).applyMatrix4(Z.matrixWorld);
		if (Z.level1Offset) {
			Z.end1.copy(Z.level1Offset).applyMatrix4(Z.matrixWorld)
		}
		if (Z.level2Offset) {
			Z.end2.copy(Z.level2Offset).applyMatrix4(Z.matrixWorld)
		}
	};
	P.prototype.onInstanceRemoved = function() {
		var Z = this;
		Z.level.instances.removeNode(Z.levelNode);
		Z.levelNode = null;
		Z.removeEventListener("removed", Z.level.onInstanceRemoved);
		Z.level = null
	};
	var c = function c(ac, Z, ab) {
		var aa = this;
		THREE.Mesh.call(aa, ac, Z);
		aa.defaultBox = ab || aa.geometry.boundingBox;
		aa.boundingBox = new THREE.Box3();
		aa.addEventListener("added", aa.onAdded);
		aa.addEventListener("removed", aa.onRemoved);
		aa.playerAnimation = "wall";
		aa.shadowId = null;
		aa.shadowScale = null;
		aa.shadowOpacity = 1
	};
	c.prototype = Object.create(THREE.Mesh.prototype);
	var U = function U(ac, Z, ab) {
		var aa = this;
		THREE.SkinnedMesh.call(aa, ac, Z, false);
		aa.animation = new GEMIOLI.Animation(aa, ac.animation);
		aa.animation.play(0, 1);
		aa.defaultBox = ab || aa.geometry.boundingBox;
		aa.boundingBox = new THREE.Box3();
		aa.addEventListener("added", aa.onAdded);
		aa.addEventListener("removed", aa.onRemoved);
		aa.playerAnimation = "wall";
		aa.shadowId = null;
		aa.shadowScale = null;
		aa.shadowOffset = null;
		aa.shadowOpacity = 1
	};
	U.prototype = Object.create(THREE.SkinnedMesh.prototype);
	U.prototype.onAdded = c.prototype.onAdded = function() {
		var Z = this;
		Z.updateNode = r.add(Z);
		if (Z.shadowId) {
			Z.shadow = B.objectFromPool(Z.shadowId);
			Z.shadow.scale.copy(Z.shadowScale);
			Z.shadow.material.uniforms.opacity.value = Z.shadowOpacity;
			Z.shadow.position.copy(Z.position);
			if (Z.shadowOffset) {
				Z.shadow.position.add(Z.shadowOffset)
			}
			Z.shadow.position.y = 0;
			Z.shadow.rotation.y = Z.rotation.y;
			F.add(Z.shadow)
		}
		Z.onPositionChange()
	};
	U.prototype.onRemoved = c.prototype.onRemoved = function() {
		var Z = this;
		r.removeNode(Z.updateNode);
		Z.updateNode = null;
		if (Z.shadow) {
			m.add(Z.shadow);
			Z.shadow = null
		}
	};
	U.prototype.update = c.prototype.update = function(aa) {
		var Z = this;
		if (a.isIntersectionBox(Z.boundingBox)) {
			if (O.dead) {
				return
			}
			if (O.schitTime > 0) {
				if (O.schitTime < 0.05) {
					O.schitTime += aa
				}
				return
			}
			Z.onPlayer()
		}
	};
	U.prototype.onPositionChange = c.prototype.onPositionChange = function() {
		var Z = this;
		Z.updateMatrixWorld(true);
		Z.boundingBox.copy(Z.defaultBox);
		Z.boundingBox.applyMatrix4(Z.matrixWorld)
	};
	U.prototype.onPlayer = c.prototype.onPlayer = function() {
		var Z = this;
		O.dead = true;
		if (O.playId !== Z.playerAnimation) {
			O.play(Z.playerAnimation, false);
			GEMIOLI.SoundLoader.load(O.male ? "wall_m" : "wall_f").play()
		}
		O.quakeTime = 1
	};
	var f = {
		run: {
			start: 1,
			end: 13
		},
		jump: {
			start: 14,
			end: 42
		},
		slope: {
			start: 43,
			end: 65
		},
		menu: {
			start: 66,
			end: 106
		},
		watch: {
			start: 107,
			end: 151
		},
		"catch": {
			start: 152,
			end: 172
		},
		wall: {
			start: 173,
			end: 207
		},
		fall: {
			start: 208,
			end: 235
		},
		magnet: {
			start: 318,
			end: 329
		}
	};
	var p = 100000;
	B.playerTypes = [{
		id: "models/GGCowboy.js",
		cost: 0,
		name: "Professor Jones"
	}, {
		id: "models/GGGirl.js",
		cost: 300,
		name: "Lara Bones"
	}, {
		id: "models/GGMummy.js",
		cost: 500,
		name: "Mummy"
	}, {
		id: "models/GGAgent.js",
		cost: 1000,
		name: "Agent 99"
	}, {
		id: "models/GGDisco.js",
		cost: 2000,
		name: "Disco Dancer"
	}, {
		id: "models/GGCube.js",
		cost: 5000,
		name: "Cubeman"
	}];
	B.playerType = GEMIOLI.Utils.getInt("skin", 0);
	var t = new THREE.ShaderMaterial({
		fragmentShader: GEMIOLI.BendShader.fragmentShader,
		vertexShader: GEMIOLI.BendShader.vertexShader,
		uniforms: THREE.UniformsUtils.clone(GEMIOLI.BendShader.uniforms),
		transparent: true,
		skinning: true
	});
	t.uniforms.diffuse.value = new THREE.Color(8173793);
	B.bendMaterials.push(t);
	var W = new THREE.ShaderMaterial({
		fragmentShader: GEMIOLI.BendShader.fragmentShader,
		vertexShader: GEMIOLI.BendShader.vertexShader,
		uniforms: THREE.UniformsUtils.clone(GEMIOLI.BendShader.uniforms),
		transparent: true
	});
	W.map = GEMIOLI.TextureLoader.load("models/Planka.png");
	W.map.wrapS = W.map.wrapT = THREE.RepeatWrapping;
	W.uniforms.map.value = W.map;
	B.bendMaterials.push(W);
	var d = function d(ae, ab) {
		var ac = this;
		if (!ae.bones) {
			var ad = L["models/GGCowboy.js"].model.geometry;
			ae.bones = ad.bones;
			ae.animation = ad.animation
		}
		THREE.SkinnedMesh.call(ac, ae, ab, false);
		var aa = new GEMIOLI.Animation(ac, ae.animation);
		aa.play(0, 1);
		var Z = new GEMIOLI.AnimationController(aa, f);
		ac.DAC = Z;
		ac.addEventListener("added", ac.onAdded);
		ac.addEventListener("removed", ac.onRemoved);
		ac.RHBone = aa.getBone("RH04");
		ac.backBone = aa.getBone("B01");
		ac.back2Bone = aa.getBone("B02");
		ac.LHBone = aa.getBone("LH04");
		ac.magnet = B.objectFromPool("models/GGMagnit.js");
		ac.magnet.rotation.set(Math.PI / 2, 0, 0);
		ac.LHBone.add(ac.magnet);
		ac.RLBone = aa.getBone("RL03");
		ac.LLBone = aa.getBone("LL03");
		ac.surface = ac.oldSurface = I;
		ac.contactPoint = new THREE.Vector3();
		ac.defaultContactBox = new THREE.Box3(new THREE.Vector3(-30, -30, -30), new THREE.Vector3(30, 30, 30));
		ac.contactBox = new THREE.Box3();
		ac.bonusPosition = new THREE.Vector3();
		ac.clearPosition = new THREE.Vector3();
		ac.clearRotation = new THREE.Euler();
		ac.pointerStart = new THREE.Vector2();
		ac.keys = [];
		ac.goldEffect = B.objectFromPool("GoldEffect");
		ac.direction = new THREE.Vector3();
		ac.schitMaterial = t;
		ac.baseMaterial = ac.material;
		ac.male = true
	};
	d.prototype = Object.create(THREE.SkinnedMesh.prototype);
	d.prototype.onAdded = function() {
		var aa = this;
		B.player = aa;
		O = aa;
		k = aa.position;
		M = aa.direction;
		a = aa.contactBox;
		S = aa.contactPoint;
		g = aa.bonusPosition;
		B.addEventListener("pointerdown", aa.onPointerDown, false);
		B.addEventListener("pointermove", aa.onPointerMove, false);
		B.addEventListener("pointerup", aa.onPointerUp, false);
		B.addEventListener("pointercancel", aa.onPointerCancel, false);
		B.addEventListener("keydown", this.onKeyDown, false);
		B.addEventListener("keyup", this.onKeyUp, false);
		aa.shadow = B.objectFromPool("Shadow");
		aa.shadow.material.uniforms.opacity.value = 1;
		aa.shadow.scale.set(80, 80, 80);
		F.add(aa.shadow);
		F.add(aa.goldEffect);
		aa.jumpTime = aa.slopeTime = aa.quakeTime = aa.leftTime = aa.rightTime = 0;
		aa.schitTime = aa.magnetTime = aa.multiplicatorTime = 0;
		aa.magnet.visible = false;
		aa.cameraRotation = aa.rotation.y = 0;
		aa.positionOffset = aa.rotationOffset = 0;
		aa.goldTime = 0;
		aa.clearPosition.copy(aa.position);
		aa.clearRotation.copy(aa.rotation);
		aa.idleTime = 0;
		aa.dead = aa.stick = false;
		aa.fallVelocity = 0;
		aa.surface = I;
		aa.wood = false;
		aa.cross = null;
		aa.pointerId = -1;
		aa.pointerStart.set(0, 0);
		aa.swipe = 0;
		for (var Z in aa.keys) {
			aa.keys[Z] = false
		}
		aa.play("run", true)
	};
	d.prototype.onRemoved = function() {
		var Z = this;
		B.player = null;
		O = null;
		k = null;
		M = null;
		a = null;
		S = null;
		g = null;
		if (Z.shadow) {
			m.add(Z.shadow);
			Z.shadow = null
		}
		m.add(Z.goldEffect);
		B.removeEventListener("pointerdown", Z.onPointerDown, false);
		B.removeEventListener("pointermove", Z.onPointerMove, false);
		B.removeEventListener("pointerup", Z.onPointerUp, false);
		B.removeEventListener("pointercancel", Z.onPointerCancel, false);
		B.removeEventListener("keydown", this.onKeyDown, false);
		B.removeEventListener("keyup", this.onKeyUp, false);
		if (Z.shieldSound) {
			Z.shieldSound.stop();
			Z.shieldSound = null
		}
	};
	d.prototype.play = function(ab, Z) {
		var aa = this;
		aa.playTime = 0;
		aa.playId = ab;
		aa.playLoop = Z;
		aa.DAC.play((aa.magnet.visible && ab === "run") ? "magnet" : ab, Z)
	};
	d.prototype.playUpdate = function() {
		var Z = this;
		var aa = Z.playTime;
		Z.play(Z.playId, Z.playLoop);
		Z.updateAC(aa)
	};
	d.prototype.updateAC = function(aa) {
		var Z = this;
		Z.DAC.update(aa);
		Z.playTime += aa
	};
	d.prototype.onPositionChange = function() {
		this.clearPosition.copy(this.position)
	};
	var K = new THREE.Vector3(-444, 430, 0),
		b = new THREE.Vector3(0, 226, 0),
		h = new THREE.Vector3(332, 92, 0),
		A = new THREE.Vector3(0, 90, 0);
	d.prototype.update = function(aj) {
		var af = this;
		if (af.schitTime > 0) {
			if ((af.schitTime -= 0.1 * aj) <= 0) {
				af.schitTime = 0;
				if (af.shieldSound) {
					af.shieldSound.stop();
					af.shieldSound = null;
					GEMIOLI.SoundLoader.load("shieldActive_stop").play()
				}
			}
			var ai = Math.max((0.3 - af.schitTime) / 0.3, 0);
			var ag = 1 - 0.7 * Math.abs(Math.sin((10 + 20 * ai) * ai)) * (ai > 0 ? 1 : 0);
			af.material = af.schitMaterial;
			af.material.uniforms.opacity.value = 0.7 * ag;
			W.uniforms.offsetRepeat.value.x = W.uniforms.offsetRepeat.value.y = B.time * 0.1;
			W.uniforms.opacity.value = ag
		} else {
			af.material = af.baseMaterial;
			W.uniforms.opacity.value = 0
		}
		if (af.magnetTime > 0) {
			if ((af.magnetTime -= 0.1 * aj) <= 0) {
				af.magnetTime = 0;
				af.magnet.visible = false;
				af.playUpdate()
			}
		}
		if (af.multiplicatorTime > 0) {
			if (!B.multiplicator.visible) {
				B.multiplicator.visible = true
			}
			if ((af.multiplicatorTime -= 0.1 * aj) <= 0) {
				af.multiplicatorTime = 0;
				B.multiplicator.visible = false
			}
			var Z = 1 - Math.max(af.multiplicatorTime - 0.95, 0) / 0.05;
			var ai = TWEEN.Easing.Quadratic.In(Z);
			B.multiplicator.scaleX = B.multiplicator.scaleY = 1 - ai * 0.6 + 0.05 * Math.abs(Math.sin(10 * B.time));
			B.multiplicator.x = (160 - B.multiplicator.sx) * ai + B.multiplicator.sx;
			ai = TWEEN.Easing.Quadratic.In(Z);
			B.multiplicator.y = (270 - B.multiplicator.sy) * ai + B.multiplicator.sy;
			B.multiplicator.rotation = 20 - 360 * (1 - Z);
			B.multiplicator.tint.a = Math.min(af.multiplicatorTime / 0.05, 1)
		}
		if (!af.dead) {
			var at = B.playerSpeed * aj;
			af.direction.set(1, 0, 0).applyEuler(af.clearRotation);
			N.copy(af.direction).multiplyScalar(at);
			af.clearPosition.add(N);
			k.copy(af.clearPosition);
			var ao = B.distance;
			B.distance += at;
			if (ao < 200 && B.distance >= 200) {
				B.fadeMusic(0, 1)
			}
			if (!B.tutorial) {
				B.lineDistance -= at
			}
			while (Math.abs(k.x) > p) {
				var ab = u.childs.head,
					ad, ac = k.x > 0 ? -p : p;
				while (ab) {
					ad = ab.data;
					ad.position.x += ac;
					if (ad.onPositionChange) {
						ad.onPositionChange()
					}
					ab = ab.next
				}
				if (window.console && window.console.log) {
					console.log("OFFSET X: " + ac)
				}
			}
			while (Math.abs(k.z) > p) {
				var ab = u.childs.head,
					ad, ac = k.z > 0 ? -p : p;
				while (ab) {
					ad = ab.data;
					ad.position.z += ac;
					if (ad.onPositionChange) {
						ad.onPositionChange()
					}
					ab = ab.next
				}
				if (window.console && window.console.log) {
					console.log("OFFSET Z: " + ac)
				}
			}
			if (B.idle && af.playId === "catch" && !af.DAC.isPlaying()) {
				B.idle = false
			}
			if (B.idle) {
				if (af.playId === "catch") {} else {
					if ((af.idleTime -= aj) <= 0 && !af.DAC.isPlaying()) {
						af.idleTime = Math.random() * 5 + 2;
						af.play("watch", false)
					}
					if (af.playId === "watch" && af.DAC.isPlaying()) {} else {
						if (af.playId !== "menu" || !af.DAC.isPlaying()) {
							af.play("menu", false)
						}
					}
				}
			} else {
				if (af.surface !== E && af.jumpTime === 0) {
					af.dead = true;
					af.play("fall", true);
					af.jumpTime = af.slopeTime = 0;
					GEMIOLI.SoundLoader.load(af.male ? "fall_m" : "fall_f").play()
				} else {
					switch (af.swipe) {
						case 0:
							if (af.jumpTime === 0 && af.slopeTime === 0 && af.playId !== "run") {
								af.play("run", true)
							}
							break;
						case 1:
							if (af.jumpTime === 0 && af.slopeTime === 0 && B.distance > 900 && (!B.tutorial || B.tutorialUpAllow)) {
								af.jumpTime = 1;
								B.tutorialUp = true;
								af.play("jump", false);
								GEMIOLI.SoundLoader.load(af.male ? "jumpStart_m" : "jumpStart_f").play()
							}
							break;
						case 2:
							if (af.jumpTime === 0 && af.slopeTime === 0 && B.distance > 900 && (!B.tutorial || B.tutorialDownAllow)) {
								B.tutorialDown = true;
								af.slopeTime = 1;
								af.play("slope", false);
								GEMIOLI.SoundLoader.load(af.male ? "slope_m" : "slope_f").play()
							}
							break;
						case 3:
							if (af.cross && !af.cross.playerRotated && (!B.tutorial || B.tutorialCrossLeftAllow)) {
								af.cross.player = -1;
								B.tutorialCrossLeft = true
							} else {
								if (af.leftTime === 0 && af.rightTime === 0 && B.distance > 900 && (!B.tutorial || B.tutorialLeftAllow)) {
									af.leftTime = 1;
									B.tutorialLeft = true;
									GEMIOLI.SoundLoader.load("turn").play()
								}
							}
							break;
						case 4:
							if (af.cross && !af.cross.playerRotated && (!B.tutorial || B.tutorialCrossRightAllow)) {
								af.cross.player = 1;
								B.tutorialCrossRight = true
							} else {
								if (af.leftTime === 0 && af.rightTime === 0 && B.distance > 900 && (!B.tutorial || B.tutorialRightAllow)) {
									af.rightTime = 1;
									B.tutorialRight = true;
									GEMIOLI.SoundLoader.load("turn").play()
								}
							}
							break
					}
				}
			}
			var au = 0;
			if (B.playerSpeed > 1500) {
				aj *= B.playerSpeed / 1500
			}
			if (af.jumpTime > 0) {
				var ai = 30 / 29 * aj;
				af.jumpTime -= ai;
				if (af.jumpTime <= 0) {
					af.jumpTime = 0;
					if (af.surface === E) {
						au = 3;
						GEMIOLI.SoundLoader.load(af.wood ? "jumpEnd_wood" : "jumpEnd").play()
					}
				}
			} else {
				if (af.slopeTime > 0) {
					var ai = 30 / 23 * aj,
						ap = Math.floor(af.slopeTime * 10);
					af.slopeTime -= ai;
					if (af.slopeTime <= 0) {
						af.slopeTime = 0
					}
					if (af.surface === E && ap !== Math.floor(af.slopeTime * 10)) {
						au = 1
					}
				}
			}
			if (af.leftTime > 0) {
				if ((af.leftTime -= 1 * aj) <= 0) {
					af.leftTime = 0
				}
				if (af.stick && af.leftTime < 0.3) {
					af.leftTime = 0.3
				}
				if (af.leftTime > 0.7) {
					var ai = 1 - (af.leftTime - 0.7) / 0.3;
					af.positionOffset = -100 * ai;
					af.rotationOffset = 0.3 * Math.sin(ai * Math.PI)
				} else {
					if (af.leftTime < 0.3) {
						var ai = af.leftTime / 0.3;
						af.positionOffset = -100 * ai;
						af.rotationOffset = -0.3 * Math.sin(ai * Math.PI)
					} else {
						af.rotationOffset = 0;
						af.positionOffset = -100
					}
				}
			} else {
				if (af.rightTime > 0) {
					if ((af.rightTime -= 1 * aj) <= 0) {
						af.rightTime = 0
					}
					if (af.stick && af.rightTime < 0.3) {
						af.rightTime = 0.3
					}
					if (af.rightTime > 0.7) {
						var ai = 1 - (af.rightTime - 0.7) / 0.3;
						af.positionOffset = 100 * ai;
						af.rotationOffset = -0.3 * Math.sin(ai * Math.PI)
					} else {
						if (af.rightTime < 0.3) {
							var ai = af.rightTime / 0.3;
							af.positionOffset = 100 * ai;
							af.rotationOffset = 0.3 * Math.sin(ai * Math.PI)
						} else {
							af.rotationOffset = 0;
							af.positionOffset = 100
						}
					}
				}
			}
			N.set(0, 0, 1).applyEuler(af.clearRotation).multiplyScalar(af.positionOffset);
			k.add(N);
			af.rotation.y = af.clearRotation.y + af.rotationOffset;
			if (!B.idle) {
				if (af.schitTime > 0 && !B.paused) {
					if (!af.shieldSound) {
						af.shieldSound = GEMIOLI.SoundLoader.load("shieldActive").play(0, true)
					}
				} else {
					if (af.shieldSound) {
						af.shieldSound.stop();
						af.shieldSound = null
					}
				}
			}
		} else {
			if (af.shieldSound) {
				af.shieldSound.stop();
				af.shieldSound = null
			}
			if (af.playId === "fall") {
				var at = 650 * aj;
				af.direction.set(1, 0, 0).applyEuler(af.clearRotation);
				N.copy(af.direction).multiplyScalar(at);
				af.clearPosition.add(N);
				af.fallVelocity += -7000 * aj;
				af.clearPosition.y += af.fallVelocity * aj;
				k.copy(af.clearPosition);
				N.set(0, 0, 1).applyEuler(af.clearRotation).multiplyScalar(af.positionOffset);
				k.add(N);
				af.rotation.y = af.clearRotation.y + af.rotationOffset
			}
		}
		var av = af.shadow.material.uniforms.opacity.value;
		if (af.surface === E) {
			if ((av += 7 * aj) >= 1) {
				av = 1
			}
		} else {
			if ((av -= 7 * aj) <= 0) {
				av = 0
			}
		}
		af.shadow.material.uniforms.opacity.value = av;
		var ah = Math.floor(af.DAC.time * af.DAC.fps);
		af.updateAC(aj);
		af.updateMatrixWorld(true);
		var ae = Math.floor(af.DAC.time * af.DAC.fps);
		if (ah !== ae) {
			switch (ae) {
				case 4:
				case 321:
					for (var am = 0; am < 2; ++am) {
						var ar = B.objectFromPool("StepEffect");
						ar.position.setFromMatrixPosition(af.LLBone.matrixWorld);
						F.add(ar)
					}
					if (B.distance > 1020) {
						GEMIOLI.SoundLoader.load(af.wood ? "runL_wood" : "runL").play()
					}
					break;
				case 10:
				case 327:
					for (var am = 0; am < 2; ++am) {
						var ar = B.objectFromPool("StepEffect");
						ar.position.setFromMatrixPosition(af.RLBone.matrixWorld);
						F.add(ar)
					}
					if (B.distance > 1020) {
						GEMIOLI.SoundLoader.load(af.wood ? "runR_wood" : "runR").play()
					}
					break
			}
		}
		for (var am = 0; am < au; ++am) {
			var ar = B.objectFromPool("StepEffect");
			ar.position.copy(af.position);
			F.add(ar)
		}
		S.copy(k);
		a.copy(af.defaultContactBox);
		g.setFromMatrixPosition(af.backBone.matrixWorld);
		a.translate(g);
		af.shadow.position.copy(g);
		af.shadow.position.y = 0;
		if (af.magnet.visible) {
			g.setFromMatrixPosition(af.LHBone.matrixWorld)
		}
		if (af.goldTime > 0) {
			if ((af.goldTime -= 5 * aj) <= 0) {
				af.goldTime = 0
			}
		}
		af.goldEffect.sscale = Math.sin(Math.PI * af.goldTime) * 200 + 100;
		af.goldEffect.material.uniforms.opacity.value = 0.7 * Math.sin(Math.PI * af.goldTime);
		af.goldEffect.position.copy(g);
		N.copy(af.direction).multiplyScalar(50);
		af.goldEffect.position.add(N);
		var al = 1 - Math.min(B.distance, 1000) / 1000;
		N.copy(h);
		N.z += 10 * Math.sin(B.time) * (1 - B.interfaceTime);
		N.y += 10 * Math.sin(0.5 * B.time + 10) * (1 - B.interfaceTime);
		N.x += 5 * Math.sin(B.time + 4) * (1 - B.interfaceTime);
		N.z += 100 * Math.sin(al * Math.PI);
		N.x -= -100 * Math.sin(al * Math.PI);
		if (af.cameraRotation !== af.clearRotation.y) {
			if (af.cameraRotation > af.clearRotation.y) {
				af.cameraRotation -= 5 * aj;
				if (af.cameraRotation <= af.clearRotation.y) {
					af.cameraRotation = af.clearRotation.y
				}
			} else {
				af.cameraRotation += 5 * aj;
				if (af.cameraRotation >= af.clearRotation.y) {
					af.cameraRotation = af.clearRotation.y
				}
			}
		}
		o.position.set(K.x * Math.cos(af.cameraRotation), K.y, -K.x * Math.sin(af.cameraRotation));
		o.position.lerp(N, al);
		if ((af.quakeTime -= 2 * aj) < 0) {
			af.quakeTime = 0
		}
		N.set(0, af.quakeTime * (5 * Math.sin(200 * B.time) + 7.5 * Math.cos(100 * B.time)), af.quakeTime * (7.5 * Math.sin(150 * B.time) - 2.5 * Math.cos(60 * B.time)));
		o.position.x += k.x;
		o.position.z += k.z;
		o.position.add(N);
		o.target.copy(b);
		o.target.lerp(A, al);
		o.target.x += k.x;
		o.target.z += k.z;
		o.target.add(N);
		if (af.dead) {
			o.target.y += O.position.y
		}
		if (af.slopeTime > 0) {
			o.position.y -= 350 * Math.sin(af.slopeTime * Math.PI);
			o.target.y -= 150 * Math.sin(af.slopeTime * Math.PI)
		}
		o.lookAt(o.target);
		o.updateMatrixWorld();
		o.matrixWorldInverse.getInverse(o.matrixWorld);
		v.helpMatrix.multiplyMatrices(o.projectionMatrix, o.matrixWorldInverse);
		v.setFromMatrix(v.helpMatrix);
		var aa = B.bendMaterials,
			aq = 0.00005 * Math.sin((B.distance + B.bendOffset) * 0.0001),
			an = 0.00003 * Math.sin((B.distance + B.bendOffset) * 0.0002) - 0.00005;
		for (var am = 0, ak = aa.length; am < ak; ++am) {
			aa[am].uniforms.bendX.value = aq;
			aa[am].uniforms.bendY.value = an
		}
		B.bendX = aq;
		B.bendY = an;
		af.oldSurface = af.surface;
		af.surface = I;
		af.wood = false;
		af.swipe = 0;
		af.cross = null;
		af.stick = false
	};
	d.prototype.onPointerDown = function(Z) {
		if (O.pointerId !== -1) {
			return
		}
		O.pointerId = Z.pointerId;
		O.pointerStart.set(Z.x, Z.y);
		O.pointerTime = Date.now()
	};
	d.prototype.onPointerMove = function(Z) {
		if (O.pointerId !== Z.pointerId) {
			return
		}
	};
	d.prototype.onPointerUp = function(ac) {
		if (O.pointerId !== ac.pointerId) {
			return
		}
		O.pointerId = -1;
		var ad = Date.now();
		var ab = ac.x - O.pointerStart.x,
			Z = ac.y - O.pointerStart.y,
			ae = Math.sqrt(ab * ab + Z * Z),
			aa = ae / (ad - O.pointerTime) || 0;
		if ((ae > 10) && (Math.abs(aa) > 0.65)) {
			if (Math.abs(ab) >= Math.abs(Z)) {
				O.swipe = ab < 0 ? 3 : 4
			} else {
				O.swipe = Z < 0 ? 1 : 2
			}
		}
	};
	d.prototype.onPointerCancel = function(Z) {
		if (O.pointerId !== Z.pointerId) {
			return
		}
		O.pointerId = -1
	};
	d.prototype.onKeyDown = function(Z) {
		if (!O.keys[Z.keyCode]) {
			O.keys[Z.keyCode] = true;
			switch (Z.keyCode) {
				case 38:
				case 87:
					O.swipe = 1;
					break;
				case 40:
				case 83:
					O.swipe = 2;
					break;
				case 37:
				case 65:
					O.swipe = 3;
					break;
				case 39:
				case 68:
					O.swipe = 4;
					break
			}
		}
	};
	d.prototype.onKeyUp = function(Z) {
		O.keys[Z.keyCode] = false
	};
	var n = function n(ab, Z) {
		var aa = this;
		THREE.Mesh.call(aa, ab, Z);
		aa.addEventListener("added", aa.onAdded);
		aa.addEventListener("removed", aa.onRemoved);
		aa.time = Math.random() * 180;
		aa.effectEnabled = true
	};
	n.prototype = Object.create(THREE.Mesh.prototype);
	n.prototype.onAdded = function() {
		var Z = this;
		Z.dead = false;
		Z.updateNode = r.add(Z);
		Z.defaultRotation = Z.rotation.y;
		if (Z.position.y < 100) {
			Z.shadow = B.objectFromPool("Shadow");
			Z.shadow.scale.set(60, 60, 60);
			Z.shadow.position.copy(Z.position);
			Z.shadow.position.y = 0;
			F.add(Z.shadow)
		}
		if (Z.effectEnabled) {
			Z.effect = B.objectFromPool("BonusEffect");
			Z.effect.position.copy(Z.position);
			N.copy(M).multiplyScalar(50);
			Z.effect.position.add(N);
			Z.effect.sscale = 100;
			F.add(Z.effect)
		}
	};
	n.prototype.onRemoved = function() {
		var Z = this;
		if (Z.shadow) {
			m.add(Z.shadow);
			Z.shadow = null
		}
		if (Z.effect) {
			m.add(Z.effect);
			Z.effect = null
		}
		r.removeNode(Z.updateNode);
		Z.updateNode = null
	};
	n.prototype.update = function(aa) {
		var Z = this;
		if (Z.dead) {
			return
		}
		Z.time += 5 * aa;
		Z.rotation.y = Z.defaultRotation + Math.sin(Z.time);
		if (Z.effect) {
			Z.effect.sscale = 30 * Math.sin(Z.time) + 300;
			Z.effect.position.copy(Z.position);
			N.copy(M).multiplyScalar(50);
			Z.effect.position.add(N)
		}
		if (Z.position.distanceToSquared(g) < 10000) {
			m.add(Z);
			if (Z.dead || O.dead) {
				return
			}
			Z.dead = true;
			Z.onPlayer();
			if (Z.effect) {
				Z.effect.deadTime = 1;
				Z.effect = null
			}
		}
	};
	n.prototype.onPlayer = function() {};
	L = {
		Shadow: (function() {
			var Z = function Z() {
				var aa = new THREE.ShaderMaterial({
					fragmentShader: GEMIOLI.BendShader.fragmentShader,
					vertexShader: GEMIOLI.BendShader.vertexShader,
					uniforms: THREE.UniformsUtils.clone(GEMIOLI.BendShader.uniforms),
					transparent: true,
					depthTest: false,
					depthWrite: false
				});
				aa.map = GEMIOLI.TextureLoader.load("effects/shadow.png");
				aa.uniforms.map.value = aa.map;
				B.bendMaterials.push(aa);
				THREE.Mesh.call(this, J, aa);
				this.isShadow = true
			};
			Z.prototype = Object.create(THREE.Mesh.prototype);
			return {
				instances: 68,
				create: function() {
					return new Z()
				}
			}
		})(),
		ShadowSquare: (function() {
			var Z = function Z() {
				var aa = new THREE.ShaderMaterial({
					fragmentShader: GEMIOLI.BendShader.fragmentShader,
					vertexShader: GEMIOLI.BendShader.vertexShader,
					uniforms: THREE.UniformsUtils.clone(GEMIOLI.BendShader.uniforms),
					transparent: true,
					depthTest: false,
					depthWrite: false
				});
				aa.map = GEMIOLI.TextureLoader.load("effects/shadow_square.png");
				aa.uniforms.map.value = aa.map;
				B.bendMaterials.push(aa);
				THREE.Mesh.call(this, J, aa);
				this.isShadow = true
			};
			Z.prototype = Object.create(THREE.Mesh.prototype);
			return {
				instances: 3,
				create: function() {
					return new Z()
				}
			}
		})(),
		StepEffect: (function() {
			var Z = function Z() {
				var aa = new THREE.ShaderMaterial({
					fragmentShader: GEMIOLI.SpriteBendShader.fragmentShader,
					vertexShader: GEMIOLI.SpriteBendShader.vertexShader,
					uniforms: THREE.UniformsUtils.clone(GEMIOLI.SpriteBendShader.uniforms),
					transparent: true,
					depthWrite: false,
					depthText: false
				});
				aa.map = GEMIOLI.TextureLoader.load("effects/smoke.png");
				aa.uniforms.map.value = aa.map;
				aa.uniforms.diffuse.value = new THREE.Color(9472868);
				B.bendMaterials.push(aa);
				var ab = this;
				Q.call(ab, aa);
				ab.addEventListener("added", ab.onAdded);
				ab.addEventListener("removed", ab.onRemoved);
				ab.speed = new THREE.Vector3();
				ab.defaultPosition = new THREE.Vector3()
			};
			Z.prototype = Object.create(Q.prototype);
			Z.prototype.onAdded = function() {
				var aa = this;
				aa.updateNode = r.add(aa);
				aa.position.y = 0;
				aa.defaultPosition.copy(aa.position).sub(O.position);
				aa.time = 1;
				aa.srotation = Math.random();
				aa.rspeed = Math.random() - 0.5;
				aa.speed.copy(M).multiplyScalar(-150)
			};
			Z.prototype.onRemoved = function() {
				var aa = this;
				r.removeNode(aa.updateNode);
				aa.updateNode = null
			};
			Z.prototype.update = function(ab) {
				var aa = this;
				if ((aa.time -= 5 * ab) <= 0) {
					m.add(aa);
					aa.time = 0
				}
				aa.sscale = Math.sqrt(1 - aa.time) * 200;
				aa.material.uniforms.opacity.value = 0.6 * Math.sqrt(aa.time);
				aa.srotation += aa.rspeed * ab;
				N.copy(aa.speed).multiplyScalar(1 - aa.time);
				aa.position.copy(O.position).add(aa.defaultPosition).add(N);
				Q.prototype.update.call(aa, ab)
			};
			return {
				instances: 7,
				create: function() {
					return new Z()
				}
			}
		})(),
		"models/GGCowboy.js": (function() {
			return {
				skin: true,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new d(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/GGGirl.js": (function() {
			return {
				skin: true,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					var Z = new d(this.model.geometry, this.model.material);
					Z.male = false;
					return Z
				}
			}
		})(),
		"models/GGCube.js": (function() {
			return {
				skin: true,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new d(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/GGAgent.js": (function() {
			return {
				skin: true,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new d(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/GGDisco.js": (function() {
			return {
				skin: true,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new d(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/GGMummy.js": (function() {
			return {
				skin: true,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new d(this.model.geometry, this.model.material)
				}
			}
		})(),
		BonusEffect: (function() {
			var Z = function Z() {
				var aa = new THREE.ShaderMaterial({
					fragmentShader: GEMIOLI.SpriteBendShader.fragmentShader,
					vertexShader: GEMIOLI.SpriteBendShader.vertexShader,
					uniforms: THREE.UniformsUtils.clone(GEMIOLI.SpriteBendShader.uniforms),
					transparent: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending
				});
				aa.map = GEMIOLI.TextureLoader.load("effects/glow.png");
				aa.uniforms.map.value = aa.map;
				aa.uniforms.diffuse.value = new THREE.Color(16775020);
				B.bendMaterials.push(aa);
				var ab = this;
				Q.call(ab, aa);
				ab.addEventListener("added", ab.onAdded);
				ab.addEventListener("removed", ab.onRemoved)
			};
			Z.prototype = Object.create(Q.prototype);
			Z.prototype.onAdded = function() {
				var aa = this;
				aa.deadTime = 0;
				aa.material.uniforms.opacity.value = 1;
				aa.updateNode = r.add(aa)
			};
			Z.prototype.onRemoved = function() {
				var aa = this;
				r.removeNode(aa.updateNode);
				aa.updateNode = null
			};
			Z.prototype.update = function(ab) {
				var aa = this;
				if (aa.deadTime > 0) {
					if ((aa.deadTime -= 4 * ab) <= 0) {
						aa.deadTime = 0;
						m.add(aa)
					}
					aa.position.setFromMatrixPosition(O.back2Bone.matrixWorld);
					N.copy(M).multiplyScalar(-50);
					aa.position.add(N);
					aa.material.uniforms.opacity.value = Math.sin(aa.deadTime * Math.PI / 2);
					aa.sscale = aa.sscale + 5000 * ab;
					aa.srotation = 0
				}
				aa.srotation += 2 * ab;
				Q.prototype.update.call(aa, ab)
			};
			return {
				instances: 2,
				create: function() {
					return new Z()
				}
			}
		})(),
		"models/Schit.js": (function() {
			var Z = function Z(ac, aa) {
				var ab = this;
				n.call(ab, ac, aa)
			};
			Z.prototype = Object.create(n.prototype);
			Z.prototype.onPlayer = function() {
				O.schitTime = 1;
				GEMIOLI.SoundLoader.load("shield").play()
			};
			return {
				shader: GEMIOLI.BendShader,
				create: function() {
					return new Z(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/Mnojitel.js": (function() {
			var Z = function Z(ac, aa) {
				var ab = this;
				n.call(ab, ac, aa)
			};
			Z.prototype = Object.create(n.prototype);
			Z.prototype.onPlayer = function() {
				O.multiplicatorTime = 1;
				N.copy(B.from3DTo2D(this.position));
				B.multiplicator.sx = N.x;
				B.multiplicator.sy = N.y;
				GEMIOLI.SoundLoader.load("multiplicator").play()
			};
			return {
				shader: GEMIOLI.BendShader,
				create: function() {
					return new Z(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/Magnit.js": (function() {
			var Z = function Z(ac, aa) {
				var ab = this;
				n.call(ab, ac, aa)
			};
			Z.prototype = Object.create(n.prototype);
			Z.prototype.onPlayer = function() {
				O.magnetTime = 1;
				O.magnet.visible = true;
				O.playUpdate();
				GEMIOLI.SoundLoader.load("magnet").play()
			};
			return {
				shader: GEMIOLI.BendShader,
				create: function() {
					return new Z(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/GGMagnit.js": {
			shader: GEMIOLI.BendShader,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/Tile.js": {
			instances: 7,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new G(this.model.geometry, this.model.material, E)
			}
		},
		"models/TileBr.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new G(this.model.geometry, this.model.material, E)
			}
		},
		"models/TileBr02.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new G(this.model.geometry, this.model.material, E)
			}
		},
		"models/TileDouble.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new C(this.model.geometry, this.model.material, E, true, true)
			}
		},
		"models/TileR.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new C(this.model.geometry, this.model.material, E, false, true)
			}
		},
		"models/TileL.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new C(this.model.geometry, this.model.material, E, true, false)
			}
		},
		"models/TileDoubleMenu.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new G(this.model.geometry, this.model.material, E)
			}
		},
		"models/PiramidaMenu.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		AlmazEffect: (function() {
			var Z = function Z() {
				var aa = new THREE.ShaderMaterial({
					fragmentShader: GEMIOLI.SpriteBendShader.fragmentShader,
					vertexShader: GEMIOLI.SpriteBendShader.vertexShader,
					uniforms: THREE.UniformsUtils.clone(GEMIOLI.SpriteBendShader.uniforms),
					transparent: true,
					depthWrite: false,
					depthTest: false,
					blending: THREE.AdditiveBlending
				});
				aa.map = GEMIOLI.TextureLoader.load("effects/star.png");
				aa.uniforms.map.value = aa.map;
				B.bendMaterials.push(aa);
				var ab = this;
				Q.call(ab, aa);
				ab.addEventListener("added", ab.onAdded);
				ab.addEventListener("removed", ab.onRemoved);
				ab.speed = 1;
				ab.stime = 0
			};
			Z.prototype = Object.create(Q.prototype);
			Z.prototype.onAdded = function() {
				var aa = this;
				aa.updateNode = r.add(aa)
			};
			Z.prototype.onRemoved = function() {
				var aa = this;
				r.removeNode(aa.updateNode);
				aa.updateNode = null
			};
			Z.prototype.update = function(ab) {
				var aa = this;
				aa.stime += ab;
				aa.srotation = aa.speed * aa.stime;
				aa.sscale = Math.sin(aa.stime) * 10 + 100;
				aa.material.uniforms.opacity.value = Math.sin(aa.stime + 0.5) * 0.3 + 0.6;
				Q.prototype.update.call(aa, ab)
			};
			return {
				instances: 2,
				create: function() {
					return new Z()
				}
			}
		})(),
		"models/AlmazMenu.js": (function() {
			var Z = function(ac, aa) {
				var ab = this;
				THREE.Mesh.call(ab, ac, aa);
				ab.addEventListener("added", ab.onAdded);
				ab.addEventListener("removed", ab.onRemoved)
			};
			Z.prototype = Object.create(THREE.Mesh.prototype);
			Z.prototype.onAdded = function() {
				var aa = this;
				aa.updateNode = r.add(aa);
				aa.startY = aa.position.y;
				aa.e1 = B.objectFromPool("AlmazEffect");
				aa.e1.position.copy(aa.position);
				F.add(aa.e1);
				aa.e2 = B.objectFromPool("AlmazEffect");
				aa.e2.speed = -0.8;
				aa.e2.stime = 2;
				aa.e2.position.copy(aa.position);
				F.add(aa.e2)
			};
			Z.prototype.onRemoved = function() {
				var aa = this;
				r.removeNode(aa.updateNode);
				aa.updateNode = null;
				if (aa.e1) {
					m.add(aa.e1)
				}
				if (aa.e2) {
					m.add(aa.e2)
				}
			};
			Z.prototype.update = function(ab) {
				var aa = this;
				aa.rotation.y += ab;
				aa.position.y = aa.startY + 5 * Math.sin(1.5 * aa.rotation.y);
				if (aa.e1) {
					aa.e1.position.copy(aa.position)
				}
				if (aa.e2) {
					aa.e2.position.copy(aa.position)
				}
				var ac = Math.floor(O.DAC.time * O.DAC.fps);
				if (ac >= 163) {
					m.add(aa)
				}
			};
			return {
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new Z(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/Piramida01.js": (function() {
			var Z = new THREE.Box3(new THREE.Vector3(-50, -300, 0), new THREE.Vector3(100, 100, 500));
			return {
				instances: 2,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new c(this.model.geometry, this.model.material, Z)
				}
			}
		})(),
		"models/Piramida002.js": {
			instances: 2,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/Arka01.js": {
			instances: 8,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/Idols.js": {
			instances: 8,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/Luch.js": (function() {
			var Z = new THREE.Box3(new THREE.Vector3(-50, 60, -500), new THREE.Vector3(50, 100, 500));
			var aa = function aa(ad, ab) {
				var ac = this;
				U.call(ac, ad, ab, Z);
				ac.AC = new GEMIOLI.AnimationController(ac.animation, {
					idle: {
						start: 0,
						end: 3
					}
				});
				ac.luchSound = null
			};
			aa.prototype = Object.create(U.prototype);
			aa.prototype.onAdded = function() {
				var ab = this;
				ab.AC.play("idle", true);
				U.prototype.onAdded.call(ab)
			};
			aa.prototype.onRemoved = function() {
				var ab = this;
				if (ab.luchSound !== null) {
					ab.luchSound.stop();
					ab.luchSound = null
				}
				U.prototype.onRemoved.call(ab)
			};
			aa.prototype.update = function(af) {
				var ae = this;
				U.prototype.update.call(ae, af);
				ae.AC.update(af);
				var ad = ae.position.x - O.position.x,
					ac = ae.position.z - O.position.z,
					ag = Math.sqrt(ad * ad + ac * ac);
				var ab = ag > 0 ? 1 - Math.min(1, ag / 1500) : 1 - Math.min(1, -ag / 400);
				if (ab > 0) {
					if (!ae.luchSound) {
						ae.luchSound = GEMIOLI.SoundLoader.load("ray").play(false, true)
					}
					ae.luchSound.volume = B.paused ? 0 : ab
				} else {
					if (ae.luchSound !== null) {
						ae.luchSound.stop();
						ae.luchSound = null
					}
				}
			};
			aa.prototype.onPlayer = function() {
				var ab = this;
				O.dead = true;
				if (O.playId !== ab.playerAnimation) {
					O.play(ab.playerAnimation, false);
					GEMIOLI.SoundLoader.load(O.male ? "charge_m" : "charge_f").play()
				}
				O.quakeTime = 1
			};
			return {
				skin: true,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new aa(this.model.geometry, this.model.material)
				}
			}
		})(),
		GoldEffect: (function() {
			var Z = function Z() {
				var aa = new THREE.ShaderMaterial({
					fragmentShader: GEMIOLI.SpriteBendShader.fragmentShader,
					vertexShader: GEMIOLI.SpriteBendShader.vertexShader,
					uniforms: THREE.UniformsUtils.clone(GEMIOLI.SpriteBendShader.uniforms),
					transparent: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending
				});
				aa.map = GEMIOLI.TextureLoader.load("effects/gold.png");
				aa.uniforms.map.value = aa.map;
				B.bendMaterials.push(aa);
				var ab = this;
				Q.call(ab, aa);
				ab.addEventListener("added", ab.onAdded);
				ab.addEventListener("removed", ab.onRemoved)
			};
			Z.prototype = Object.create(Q.prototype);
			Z.prototype.onAdded = function() {
				var aa = this;
				aa.updateNode = r.add(aa)
			};
			Z.prototype.onRemoved = function() {
				var aa = this;
				r.removeNode(aa.updateNode);
				aa.updateNode = null
			};
			Z.prototype.update = function(aa) {
				Q.prototype.update.call(this, aa)
			};
			return {
				create: function() {
					return new Z()
				}
			}
		})(),
		"models/Gold.js": (function() {
			var ab = function ab(ae, ac) {
				var ad = this;
				THREE.Mesh.call(ad, ae, ac);
				ad.addEventListener("added", ad.onAdded);
				ad.addEventListener("removed", ad.onRemoved);
				ad.time = Math.random() * 180
			};
			ab.prototype = Object.create(THREE.Mesh.prototype);
			ab.prototype.onAdded = function() {
				var ac = this;
				ac.dead = false;
				ac.magnet = false;
				ac.magnetSpeed = 0;
				ac.updateNode = r.add(ac);
				if (ac.position.y < 100) {
					ac.shadow = B.objectFromPool("Shadow");
					ac.shadow.material.uniforms.opacity.value = 1;
					ac.shadow.scale.set(60, 60, 60);
					ac.shadow.position.copy(ac.position);
					ac.shadow.position.y = 0;
					F.add(ac.shadow)
				}
				ac.startRotation = ac.rotation.y
			};
			ab.prototype.onRemoved = function() {
				var ac = this;
				if (ac.shadow) {
					m.add(ac.shadow);
					ac.shadow = null
				}
				r.removeNode(ac.updateNode);
				ac.updateNode = null
			};
			ab.prototype.update = function(ad) {
				var ac = this;
				if (ac.dead) {
					return
				}
				ac.time += 7 * ad;
				ac.rotation.y = ac.startRotation + 0.5 * Math.sin(ac.time);
				if (ac.magnet) {
					N.copy(g);
					N.sub(ac.position);
					ac.magnetSpeed += 0.5 * B.playerSpeed * ad;
					N.multiplyScalar(Math.min(ac.magnetSpeed, N.length()) / N.length());
					ac.position.add(N);
					if (ac.shadow) {
						ac.shadow.position.copy(ac.position);
						ac.shadow.position.y = 0
					}
				}
				var ae = ac.position.distanceToSquared(g);
				if (O.magnetTime > 0 && ae < 400000) {
					ac.magnet = true
				}
				if (ae < 6000) {
					m.add(ac);
					if (ac.dead || O.dead) {
						return
					}
					ac.dead = true;
					ac.onPlayer()
				}
			};
			var Z = ["bonus_1", "bonus_2", "bonus_3", "bonus_4", "bonus_5", "bonus_6", "bonus_7", "bonus_8", "bonus_9", "bonus_10", "bonus_11", "bonus_12"],
				aa = 0;
			ab.prototype.onPlayer = function() {
				O.goldTime = 1;
				O.goldEffect.srotation = Math.random() * Math.PI / 2;
				B.addCoins(1);
				B.coinTimer = 1;
				aa = (aa + 1) % Z.length;
				GEMIOLI.SoundLoader.load(Z[aa]).play().volume = 0.8
			};
			return {
				instances: 98,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new ab(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/Kolovorot.js": (function() {
			var Z = new THREE.Box3(new THREE.Vector3(-150, -150, -200), new THREE.Vector3(150, 150, 200));
			var aa = function aa(ad, ab) {
				var ac = this;
				c.call(ac, ad, ab, Z);
				ac.time = Math.random();
				ac.braceSound = null
			};
			aa.prototype = Object.create(c.prototype);
			aa.prototype.onRemoved = function() {
				var ab = this;
				if (ab.braceSound !== null) {
					ab.braceSound.stop();
					ab.braceSound = null
				}
				c.prototype.onRemoved.call(ab)
			};
			aa.prototype.update = function(af) {
				var ae = this;
				c.prototype.update.call(ae, af);
				ae.time += 3 * af;
				if (Math.abs(ae.rotation.x) < 1) {
					ae.rotation.z = ae.time
				} else {
					ae.rotation.y = ae.time
				}
				var ad = ae.position.x - O.position.x,
					ac = ae.position.z - O.position.z,
					ag = Math.sqrt(ad * ad + ac * ac);
				var ab = ag > 0 ? 1 - Math.min(1, ag / 1500) : 1 - Math.min(1, -ag / 400);
				if (ab > 0) {
					if (!ae.braceSound) {
						ae.braceSound = GEMIOLI.SoundLoader.load("brace").play(false, true)
					}
					ae.braceSound.volume = B.paused ? 0 : ab
				} else {
					if (ae.braceSound !== null) {
						ae.braceSound.stop();
						ae.braceSound = null
					}
				}
			};
			return {
				instances: 7,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new aa(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/Brevno01.js": (function() {
			var aa = new THREE.Box3(new THREE.Vector3(-60, -60, -300), new THREE.Vector3(60, 60, 300));
			var Z = new THREE.Vector3(100, 100, 600);
			return {
				instances: 2,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					var ab = new c(this.model.geometry, this.model.material, aa);
					ab.shadowId = "ShadowSquare";
					ab.shadowScale = Z;
					return ab
				}
			}
		})(),
		"models/Liana.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/Rock01.js": {
			instances: 8,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				var Z = new THREE.Mesh(this.model.geometry, this.model.material);
				return Z
			}
		},
		"models/Tree01.js": {
			instances: 8,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/SkalaL.js": {
			instances: 8,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/SkalaR.js": {
			instances: 8,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/Wall.js": (function() {
			var aa = new THREE.Box3(new THREE.Vector3(-170, -100, -450), new THREE.Vector3(0, 400, 450));
			var Z = new THREE.Vector3(400, 200, 500);
			return {
				instances: 2,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					var ab = new c(this.model.geometry, this.model.material, aa);
					ab.shadowId = "ShadowSquare";
					ab.shadowScale = Z;
					return ab
				}
			}
		})(),
		"models/Zakr.js": {
			instances: 4,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/Zakr001.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				return new THREE.Mesh(this.model.geometry, this.model.material)
			}
		},
		"models/MostBig.js": {
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				var Z = new G(this.model.geometry, this.model.material, E);
				Z.wood = true;
				return Z
			}
		},
		"models/MostBigBreak.js": (function() {
			var Z = function Z(ac, aa) {
				var ab = this;
				G.call(ab, ac, aa, E);
				ab.wood = true
			};
			Z.prototype = Object.create(G.prototype);
			Z.prototype.update = function(ad) {
				var ac = this,
					ab = ac.boundingBox,
					aa = ab.min,
					ae = ab.max;
				if (Math.abs(S.x - (ae.x + aa.x) / 2) < 430 && Math.abs(S.z - (ae.z + aa.z) / 2) < 430) {
					O.surface = O.schitTime > 0 ? E : I
				} else {
					G.prototype.update.call(ac, ad)
				}
			};
			return {
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new Z(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/MostGood.js": {
			instances: 2,
			shader: GEMIOLI.BendShader,
			transparent: true,
			create: function() {
				var Z = new G(this.model.geometry, this.model.material, E);
				Z.wood = true;
				return Z
			}
		},
		"models/TileCutL.js": (function() {
			var aa = function aa(ad, ab) {
				var ac = this;
				G.call(ac, ad, ab, E);
				ac.fallBox = new THREE.Box3()
			};
			aa.prototype = Object.create(G.prototype);
			aa.prototype.update = (function() {
				var ac, ab, ad;
				return function(ae) {
					ac = this.fallBox;
					ab = ac.min;
					ad = ac.max;
					if (S.x <= ad.x && S.x >= ab.x && S.z <= ad.z && S.z >= ab.z) {
						O.surface = O.schitTime > 0 ? E : I
					} else {
						if (G.prototype.update.call(this, ae)) {
							O.stick = true
						}
					}
				}
			})();
			var Z = new THREE.Box3(new THREE.Vector3(150, -200, -220), new THREE.Vector3(1050, 200, 0));
			aa.prototype.onPositionChange = function() {
				var ab = this;
				G.prototype.onPositionChange.call(ab);
				ab.fallBox.copy(Z);
				ab.fallBox.applyMatrix4(ab.matrixWorld)
			};
			return {
				instances: 3,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new aa(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/TileCutR.js": (function() {
			var aa = function aa(ad, ab) {
				var ac = this;
				G.call(ac, ad, ab, E);
				ac.fallBox = new THREE.Box3()
			};
			aa.prototype = Object.create(G.prototype);
			aa.prototype.update = (function() {
				var ac, ab, ad;
				return function(ae) {
					ac = this.fallBox;
					ab = ac.min;
					ad = ac.max;
					if (S.x <= ad.x && S.x >= ab.x && S.z <= ad.z && S.z >= ab.z) {
						O.surface = O.schitTime > 0 ? E : I
					} else {
						if (G.prototype.update.call(this, ae)) {
							O.stick = true
						}
					}
				}
			})();
			var Z = new THREE.Box3(new THREE.Vector3(150, -200, -400), new THREE.Vector3(1050, 200, -180));
			aa.prototype.onPositionChange = function() {
				var ab = this;
				G.prototype.onPositionChange.call(ab);
				ab.fallBox.copy(Z);
				ab.fallBox.applyMatrix4(ab.matrixWorld)
			};
			return {
				instances: 3,
				shader: GEMIOLI.BendShader,
				transparent: true,
				create: function() {
					return new aa(this.model.geometry, this.model.material)
				}
			}
		})(),
		"models/Planka01.js": (function() {
			var Z = function Z(ab) {
				var aa = this;
				G.call(aa, ab, W, E);
				aa.ground = false;
				aa.renderOrder = 1000000
			};
			Z.prototype = Object.create(G.prototype);
			Z.prototype.update = function(ab) {
				var aa = this;
				if (G.prototype.update.call(aa, ab)) {
					if (O.schitTime === 0) {
						O.surface = I
					}
				}
			};
			return {
				instances: 6,
				shader: GEMIOLI.BendShader,
				create: function() {
					return new Z(this.model.geometry)
				}
			}
		})(),
		"models/Fon.js": (function() {
			var Z = function Z(ac, aa) {
				var ab = this;
				THREE.Mesh.call(ab, ac, aa);
				aa.map.minFilter = aa.map.magFilter = THREE.LinearFilter;
				ab.addEventListener("added", ab.onAdded);
				ab.addEventListener("removed", ab.onRemoved);
				ab.sky = true;
				ab.rotation.order = "YZX"
			};
			Z.prototype = Object.create(THREE.Mesh.prototype);
			Z.prototype.onAdded = function() {
				var aa = this;
				aa.updateNode = r.add(aa)
			};
			Z.prototype.onRemoved = function() {
				var aa = this;
				r.removeNode(aa.updateNode);
				aa.updateNode = null
			};
			Z.prototype.update = function(ab) {
				var aa = this;
				aa.position.copy(o.position);
				aa.rotation.y = -5000 * B.bendX * M.x
			};
			return {
				notDepthTest: true,
				notDepthWrite: true,
				create: function() {
					return new Z(this.model.geometry, this.model.material)
				}
			}
		})()
	}, objectsPool = {};
	B.objectFromPool = function(aa) {
		var Z = objectsPool[aa];
		if (Z) {
			objectsPool[aa] = Z.poolNext;
			Z.poolNext = null
		} else {
			Z = (L[aa] && L[aa].create ? L[aa].create() : new THREE.Object3D());
			Z.objectType = aa;
			Z.addEventListener("removed", B.objectToPool);
			Z.frustumCulled = false
		}
		return Z
	};
	B.objectToPool = function() {
		var Z = this;
		Z.poolNext = objectsPool[Z.objectType];
		objectsPool[Z.objectType] = Z
	};
	var H = {};
	GEMIOLI.AtlasLoader.load("atlases/models.atlas", function(Z) {
		GEMIOLI.ModelBatchLoader.load("models/models.js", Z, function(ag) {
			for (var ac in ag.models) {
				var ab = ag.models[ac];
				if (!L[ab.url]) {
					L[ab.url] = THREE.Object3D
				}
				var aa = L[ab.url];
				var ae = ab.material;
				var ad = "models/" + (ae.map ? ae.map.sourceFile : "empty") + (aa.skin ? "skin" : "") + (aa.notDepthWrite ? "ndw" : "") + (aa.notDepthTest ? "ndt" : "") + (aa.doubleSide ? "ds" : "") + (aa.transparent ? "t" : "") + (aa.shader ? aa.shader.id : "");
				if (!H[ad]) {
					var af = (aa.shader ? new THREE.ShaderMaterial({
						fragmentShader: aa.shader.fragmentShader,
						vertexShader: aa.shader.vertexShader,
						uniforms: THREE.UniformsUtils.clone(aa.shader.uniforms)
					}) : new THREE.MeshBasicMaterial());
					if (aa.shader) {
						af.uniforms.map.value = ae.map
					}
					af.fog = true;
					af.map = ae.map;
					H[ad] = af;
					if (!af.map || aa.doubleSide) {
						af.side = THREE.DoubleSide
					}
					if (aa.skin) {
						af.skinning = true
					}
					if (aa.notDepthWrite) {
						af.depthWrite = false
					}
					if (aa.notDepthTest) {
						af.depthTest = false
					}
					if (aa.transparent) {
						af.transparent = true
					}
					if (aa.shader === GEMIOLI.BendShader) {
						B.bendMaterials.push(af)
					}
				}
				ab.material = H[ad];
				aa.model = ab;
				if (aa.boundingSphere) {
					ab.geometry.boundingSphere = aa.boundingSphere
				}
				ab.geometry.computeBoundingBox()
			}
			GEMIOLI.XHRLoader.load("levels/levels.js", function(an) {
				var au = JSON.parse(an.request.response);
				GEMIOLI.XHRLoader.remove(an.url);
				for (var ao in au) {
					var ai = au[ao];
					var aj = [],
						ap, av;
					for (var aq = 0, al = ai.length; aq < al; ++aq) {
						ap = ai[aq];
						ap = {
							id: "models/" + ap.id + ".js",
							name: ap.n,
							position: new THREE.Vector3(ap.x || 0, ap.y || 0, ap.z || 0),
							rotation: new THREE.Euler(ap.rx || 0, ap.ry || 0, ap.rz || 0, "YZX"),
							scale: new THREE.Vector3(ap.sx ? ap.sx : 1, ap.sy ? ap.sy : 1, ap.sz ? ap.sz : 1)
						};
						aj.push(ap)
					}
					for (var aq = 0, al = aj.length; aq < al; ++aq) {
						objectData = aj[aq];
						av = B.objectFromPool(objectData.id);
						if (av instanceof G && av.type === E) {
							av.position.copy(objectData.position);
							av.rotation.copy(objectData.rotation);
							av.scale.copy(objectData.scale);
							F.add(av)
						} else {
							B.objectToPool.call(av)
						}
					}
					while (F.head) {
						u.add(F.pop())
					}
					var ar = new THREE.Box3();
					ar.setFromObject(u);
					B.clear();
					var ak = null,
						at = null;
					if (ao === "TileLLevel.js" || ao === "TileDoubleLevel.js") {
						ak = new THREE.Vector3(1016, 0, -1010)
					}
					if (ao === "TileRLevel.js" || ao === "TileDoubleLevel.js") {
						at = new THREE.Vector3(1016, 0, 1010)
					}
					if (!L[ao]) {
						L[ao] = {
							create: (function() {
								var ay = aj,
									ax = ar,
									az = ak,
									aA = at;
								return function() {
									return new P(ay, ax, az, aA)
								}
							})()
						}
					}
					if (GEMIOLI.Application.DEBUG) {
						B.debugLevels.push(ao)
					}
				}
				for (var ao in L) {
					var aw = L[ao].instances || 1;
					var ah = [];
					for (var aq = 0; aq < aw; ++aq) {
						ah.push(B.objectFromPool(ao))
					}
					for (var aq = 0; aq < aw; ++aq) {
						var am = ah.pop();
						GEMIOLI.Renderer.initObjectFunc(am);
						GEMIOLI.Renderer.updateObjectFunc(am);
						B.objectToPool.call(am)
					}
				}
			}, function(ah) {
				if (window.console && window.console.log) {
					console.log("Can't load levels", ah)
				}
			})
		}, function(aa) {
			if (window.console && window.console.log) {
				console.log("Can't load models", aa)
			}
		})
	}, function(Z) {
		if (window.console && window.console.log) {
			console.log("Can't load models atlas", Z)
		}
	});
	B.addEventListener("added", function() {
		GEMIOLI.Renderer.setClearColor(4294967295, 1);
		B.prepend()
	}, false);
	B.top = new GEMIOLI.DisplayObjectContainer();
	B.addChild(B.top);
	B.back = GEMIOLI.AtlasQuad.fromRect(-164, -139, 329, 278, "atlases/play.atlas", "back");
	B.back.x = 180;
	B.back.y = 150;
	B.top.addChild(B.back);
	B.distanceText = GEMIOLI.Text.fromAtlas(50, "fonts/play1/text.fnt", "atlases/play1.atlas", GEMIOLI.Text.RIGHT_ALIGN, GEMIOLI.Text.RIGHT_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	B.distanceText.x = 145;
	B.distanceText.y = -75;
	B.distanceText.offset = 2;
	B.back.addChild(B.distanceText);
	B.coinsText = GEMIOLI.Text.fromAtlas(50, "fonts/play1/text.fnt", "atlases/play1.atlas", GEMIOLI.Text.RIGHT_ALIGN, GEMIOLI.Text.RIGHT_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	B.coinsText.x = 145;
	B.coinsText.y = 63;
	B.coinsText.offset = 2;
	B.back.addChild(B.coinsText);
	B.coin = GEMIOLI.AtlasQuad.fromRect(-35, -44, 70, 89, "atlases/play.atlas", "coin");
	B.coin.x = -95;
	B.coin.y = 66;
	B.back.addChild(B.coin);
	B.pause = new GEMIOLI.Button(-95, -95, 191, 191, [27]);
	B.pause.addChild(GEMIOLI.AtlasQuad.fromRect(-95, -95, 191, 191, "atlases/play.atlas", "pause"));
	B.pause.y = 110;
	B.pause.addEventListener("click", function(Z) {
		GEMIOLI.SoundLoader.load("button").play();
		B.onPause()
	}, false);
	B.top.addChild(B.pause);
	B.addEventListener("blur", function(Z) {
		if (!B.paused) {
			B.onPause()
		}
	}, false);
	B.sound = new GEMIOLI.Button(-95, -95, 191, 191, [77]);
	B.sound.on = GEMIOLI.AtlasQuad.fromRect(-95, -95, 191, 191, "atlases/play.atlas", "sound_on");
	B.sound.off = GEMIOLI.AtlasQuad.fromRect(-95, -95, 191, 191, "atlases/play.atlas", "sound_off");
	B.sound.addChild(B.sound.on);
	B.sound.addChild(B.sound.off);
	B.sound.y = 110;
	B.sound.on.visible = GEMIOLI.Utils.getBool("sound", true);
	B.sound.off.visible = !B.sound.off.visible;
	B.sound.addEventListener("click", function(Z) {
		GEMIOLI.SoundLoader.load("button").play();
		B.sound.on.visible = !B.sound.on.visible;
		B.sound.off.visible = !B.sound.off.visible;
		GEMIOLI.Utils.setBool("sound", B.sound.on.visible);
		GEMIOLI.Utils.getBool("sound", true) ? GEMIOLI.SoundLoader.unmute() : GEMIOLI.SoundLoader.mute()
	}, false);
	B.sound.visible = GEMIOLI.SoundLoader.enabled;
	B.top.addChild(B.sound);
	B.multiplicator = GEMIOLI.AtlasQuad.fromRect(-159, -120, 318, 241, "atlases/play.atlas", "x2");
	B.top.addChild(B.multiplicator);
	B.logo = new GEMIOLI.Logo(-250, -100, 500, 200);
	B.logo.y = 110;
	B.top.addChild(B.logo);
	B.tutorialInterface = new GEMIOLI.DisplayObjectContainer();
	B.addChild(B.tutorialInterface);
	B.tutorialArrow = GEMIOLI.AtlasQuad.fromRect(-476, -175, 953, 350, "atlases/play.atlas", "arrow");
	B.tutorialInterface.addChild(B.tutorialArrow);
	B.tutorialPointer = GEMIOLI.AtlasQuad.fromRect(-140, -42, 362, 479, "atlases/play.atlas", "hand");
	B.tutorialInterface.addChild(B.tutorialPointer);
	B.tutorialKeyboard = GEMIOLI.AtlasQuad.fromRect(-513, -342, 1026, 684, "atlases/play.atlas", "keys");
	B.tutorialInterface.addChild(B.tutorialKeyboard);
	B.tutorialKeyRight = GEMIOLI.AtlasQuad.fromRect(-160, -160, 320, 320, "atlases/play.atlas", "key_active");
	B.tutorialKeyRight.rotation = 90;
	B.tutorialKeyRight.x = 342;
	B.tutorialKeyRight.y = 172;
	B.tutorialKeyboard.addChild(B.tutorialKeyRight);
	B.tutorialKeyLeft = GEMIOLI.AtlasQuad.fromRect(-160, -160, 320, 320, "atlases/play.atlas", "key_active");
	B.tutorialKeyLeft.rotation = -90;
	B.tutorialKeyLeft.x = -344;
	B.tutorialKeyLeft.y = 172;
	B.tutorialKeyboard.addChild(B.tutorialKeyLeft);
	B.tutorialKeyUp = GEMIOLI.AtlasQuad.fromRect(-160, -160, 320, 320, "atlases/play.atlas", "key_active");
	B.tutorialKeyUp.rotation = 0;
	B.tutorialKeyUp.x = 0;
	B.tutorialKeyUp.y = -170;
	B.tutorialKeyboard.addChild(B.tutorialKeyUp);
	B.tutorialKeyDown = GEMIOLI.AtlasQuad.fromRect(-160, -160, 320, 320, "atlases/play.atlas", "key_active");
	B.tutorialKeyDown.rotation = 180;
	B.tutorialKeyDown.x = 0;
	B.tutorialKeyDown.y = 172;
	B.tutorialKeyboard.addChild(B.tutorialKeyDown);
	B.tutorialKeyboard.scaleX = B.tutorialKeyboard.scaleY = 0.6;
	B.tutorialKeyboard.x = 450;
	B.tutorialKeyboard.y = 1200;
	B.tutorialArrow.visible = B.tutorialPointer.visible = GEMIOLI.Utils.isMobile();
	B.tutorialKeyboard.visible = !GEMIOLI.Utils.isMobile();
	B.music = null;
	B.musicVolume = 1;
	B.musicFade = 0;
	B.menu = null;
	B.menuVolume = 1;
	B.menuFade = 0;
	GEMIOLI.Application.addEventListener("update", function(aa) {
		var Z = aa.dt;
		if (B.music !== null && B.music.volume !== B.musicVolume) {
			if (B.music.volume > B.musicVolume) {
				if ((B.music.volume -= (Z / B.musicFade)) <= B.musicVolume) {
					B.music.volume = B.musicVolume;
					if (B.music.volume === 0) {
						B.music.stop();
						B.music = null
					}
				}
			} else {
				if ((B.music.volume += (Z / B.musicFade)) >= B.musicVolume) {
					B.music.volume = B.musicVolume
				}
			}
		}
		if (B.menu !== null && B.menu.volume !== B.menuVolume) {
			if (B.menu.volume > B.menuVolume) {
				if ((B.menu.volume -= (Z / B.menuFade)) <= B.menuVolume) {
					B.menu.volume = B.menuVolume;
					if (B.menu.volume === 0) {
						B.menu.stop();
						B.menu = null
					}
				}
			} else {
				if ((B.menu.volume += (Z / B.menuFade)) >= B.menuVolume) {
					B.menu.volume = B.menuVolume
				}
			}
		}
	}, false);
	if (GEMIOLI.Application.DEBUG) {
		B.levelText = GEMIOLI.Text.fromAtlas(70, "fonts/play/text.fnt", "atlases/play.atlas", GEMIOLI.Text.LEFT_ALIGN, GEMIOLI.Text.LEFT_ALIGN, GEMIOLI.Text.BOTTOM_ALIGN);
		B.addChild(B.levelText);
		B.addEventListener("keydown", function(ab) {
			if (ab.keyCode === 38) {
				B.playerSpeedMode = 1
			} else {
				if (ab.keyCode === 40) {
					B.playerSpeedMode = 2
				} else {
					if (ab.keyCode === 33) {
						if (++B.debugLevel >= B.debugLevels.length) {
							B.debugLevel = B.debugLevels.length - 1
						}
					} else {
						if (ab.keyCode === 34) {
							if (--B.debugLevel <= -1) {
								B.debugLevel = -1
							}
						} else {
							if (ab.keyCode === 49) {
								GEMIOLI.Score.show()
							} else {
								if (ab.keyCode === 50) {
									GEMIOLI.Score.show(true)
								} else {
									if (ab.keyCode === 51) {
										for (objectName in objectsPool) {
											var aa = 0,
												Z = objectsPool[objectName];
											while (Z) {
												++aa;
												Z = Z.poolNext
											}
											if (window.console && window.console.log) {
												console.log(objectName, aa)
											}
										}
									}
								}
							}
						}
					}
				}
			}
		})
	}
};
GEMIOLI.Play.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Play.prototype.render = function() {
	var d = this;
	var a = d.scene3D.children;
	for (var c = 0, b = a.length; c < b; ++c) {
		GEMIOLI.Renderer.render(a[c], d.camera3D)
	}
	GEMIOLI.Layer.prototype.render.call(d)
};
GEMIOLI.Play.prototype.show = function() {
	var a = this;
	a.player.play("catch", false);
	a.interfaceShowing = true;
	a.sound.on.visible = GEMIOLI.Utils.getBool("sound", true);
	a.sound.off.visible = !a.sound.on.visible;
	GEMIOLI.SoundLoader.load("start").play()
};
GEMIOLI.Play.prototype.hide = function() {
	that.interfaceShowing = false
};
GEMIOLI.Play.prototype.resize = function() {
	var b = this;
	GEMIOLI.Layer.prototype.resize.call(b);
	var a = b.camera3D;
	a.aspect = GEMIOLI.Application.innerWidth / GEMIOLI.Application.innerHeight;
	a.zoom = 1 / Math.max(1, b.height / GEMIOLI.Application.HEIGHT);
	a.updateProjectionMatrix();
	b.logo.x = b.width / 2;
	b.pause.x = b.width - 110;
	b.sound.x = b.width - 320;
	b.tutorialInterface.x = b.width / 2;
	b.tutorialInterface.y = b.height / 2 - 400;
	if (GEMIOLI.Application.DEBUG) {
		b.levelText.y = b.height
	}
};
GEMIOLI.Play.prototype.addCoins = function(b) {
	var a = this;
	if (a.player.multiplicatorTime > 0) {
		b *= 2
	}
	a.coins += b;
	GEMIOLI.Utils.setInt("coins", GEMIOLI.Utils.getInt("coins", 0) + b);
	GEMIOLI.Utils.setInt("highscore", GEMIOLI.Utils.getInt("highscore", 0) + b)
};
GEMIOLI.Play.prototype.fadeMusic = function(c, b) {
	var a = this;
	if (a.music === null) {
		a.music = GEMIOLI.SoundLoader.load("gameplay_loop").play(0, true)
	}
	a.musicFade = (c === undefined ? 0 : c);
	a.musicVolume = (b === undefined ? 1 : b);
	if (a.musicFade === 0) {
		a.music.volume = a.musicVolume;
		if (a.music.volume === 0) {
			a.music.stop();
			a.music = null
		}
	}
};
GEMIOLI.Play.prototype.fadeMenu = function(c, b) {
	var a = this;
	if (a.menu === null) {
		a.menu = GEMIOLI.SoundLoader.load("menu").play(0, true)
	}
	a.menuFade = (c === undefined ? 0 : c);
	a.menuVolume = (b === undefined ? 1 : b);
	if (a.menuFade === 0) {
		if (a.menu && typeof a.menu.volume !== 'undefined') { // 检查 a.menu 是否存在且有 volume 属性
			a.menu.volume = a.menuVolume;
			if (a.menu.volume === 0) {
				if (typeof a.menu.stop === 'function') { // 检查 stop 方法是否存在
					a.menu.stop();
				}
				a.menu = null;
			}
		} else {
			console.warn("GEMIOLI.Play.fadeMenu: a.menu is not a valid sound object or lacks volume property. Skipping volume set/stop.");
			// 如果 a.menu 无效，也应该将其设为 null，以避免后续问题
			a.menu = null;
		}
	}
};
GEMIOLI.Play.prototype.clear = function() {
	var b = this,
		c = b.scene3D;
	while (c.childs.head) {
		c.remove(c.childs.head.data)
	}
	var a = b.toRemove;
	while (a.head) {
		c.remove(a.pop())
	}
};
GEMIOLI.Play.prototype.prepend = function() {
	var d = this,
		e = d.scene3D;
	d.clear();
	var b = d.toAdd;
	var f = d.objectFromPool("Nachalo.js");
	f.position.set(0, 0, 0);
	f.rotation.y = 0;
	b.add(f);
	var c = d.objectFromPool("models/Fon.js");
	b.add(c);
	var a = d.objectFromPool(d.playerTypes[d.playerType].id);
	a.position.set(0, 0, 0);
	b.add(a);
	d.distance = 0;
	d.lineDistance = 5000;
	d.bendOffset = Math.random() * 100000;
	d.deadTimer = 1;
	d.coins = 0;
	d.playerSpeed = d.speedTime = d.playerSpeedMode = 0;
	d.idle = true;
	d.interfaceShowing = false;
	d.interfaceTime = 0;
	d.paused = false;
	d.coinTimer = d.time = 0;
	d.multiplicator.visible = false;
	d.bonusTimer = 0;
	d.tutorial = GEMIOLI.Utils.getBool("tutorial", true);
	d.tutorialUp = d.tutorialUpAllow = d.tutorialDown = d.tutorialDownAllow = d.tutorialLeft = d.tutorialLeftAllow = d.tutorialRight = d.tutorialRightAllow = d.tutorialCrossLeft = d.tutorialCrossLeftAllow = d.tutorialCrossRight = d.tutorialCrossRightAllow = false;
	d.tutorialFade = 1;
	d.tutorialTime = 0;
	d.tutorialSound = null;
	d.update(0)
};
GEMIOLI.Play.prototype.update = (function() {
	var d = 1500,
		c = 2000,
		a = 2,
		b = 150000;
	return function(k, m) {
		var j = this;
		if (j.paused) {
			k = 0
		}
		var g = k;
		k *= j.tutorialFade;
		j.time += k;
		if (j.player) {
			j.player.update(k)
		}
		if (!j.idle) {
			j.speedTime += k
		}
		switch (j.playerSpeedMode) {
			case 1:
				j.playerSpeed = c;
				break;
			case 2:
				j.playerSpeed = d;
				break;
			default:
				if (j.speedTime < a) {
					j.playerSpeed = (d - 300) * j.speedTime / a + (j.idle ? 0 : 300)
				} else {
					if (j.distance < b) {
						j.playerSpeed = (c - d) * (j.distance - d * a * 0.5) / (b - d * a * 0.5) + d
					} else {
						j.playerSpeed = 0.002 * (j.distance - b) + c
					}
				}
				break
		}
		var h = j.toUpdate.head;
		while (h) {
			h.data.update(k);
			h = h.next
		}
		var l = j.scene3D;
		var e = j.toAdd;
		while (e.head) {
			l.add(e.pop())
		}
		var f = j.toRemove;
		while (f.head) {
			l.remove(f.pop())
		}
		if (j.player && j.player.dead && (j.deadTimer > 0) && ((j.deadTimer -= k) <= 0)) {
			j.fadeMusic(0.25, 0.5);
			GEMIOLI.Score.show()
		}
		if (j.interfaceShowing) {
			if ((j.interfaceTime += k * 2) > 1) {
				j.interfaceTime = 1
			}
		} else {
			if (j.interfaceTime >= 0) {
				if ((j.interfaceTime -= k * 4) <= 0) {
					j.interfaceTime = 0
				}
			}
		}
		j.top.y = (1 - (j.interfaceShowing ? TWEEN.Easing.Back.Out(j.interfaceTime) : j.interfaceTime)) * -300;
		j.distanceText.text = Math.floor(j.distance / (GEMIOLI.Application.DEBUG ? 1 : 200)).toString();
		j.distanceText.scaleX = j.distanceText.scaleY = 4 / Math.max(4, j.distanceText.text.length);
		j.coinsText.text = j.coins.toString();
		j.coinsText.scaleX = j.coinsText.scaleY = 4 / Math.max(4, j.coinsText.text.length);
		if (j.levelText) {
			if (j.debugLevel !== undefined && j.debugLevel !== -1) {
				j.levelText.text = "Level: " + j.debugLevels[j.debugLevel]
			} else {
				j.levelText.text = ""
			}
		}
		if (j.coinTimer > 0) {
			if ((j.coinTimer -= 5 * k) <= 0) {
				j.coinTimer = 0
			}
			j.coin.scaleX = j.coin.scaleY = 1 + 0.2 * Math.sin(j.coinTimer * Math.PI)
		}
		if (j.tutorial) {
			j.tutorialTime += 0.7 * g;
			if (j.distance > 4000 && !j.tutorialUp) {
				j.tutorialFade = 1 - (j.distance - 4000) / 200;
				j.tutorialUpAllow = true;
				j.tutorialArrow.rotation = -90;
				j.tutorialPointer.x = 0;
				j.tutorialPointer.y = -700 * TWEEN.Easing.Quintic.In(Math.min(1, 1.3 * (j.tutorialTime - Math.floor(j.tutorialTime)))) + 350;
				j.tutorialKeyUp.visible = true;
				j.tutorialKeyDown.visible = j.tutorialKeyLeft.visible = j.tutorialKeyRight.visible = false;
				j.tutorialKeyUp.tint.a = Math.abs(Math.sin(8 * j.tutorialTime))
			} else {
				if (j.distance > 8500 && !j.tutorialDown) {
					j.tutorialFade = 1 - (j.distance - 8500) / 200;
					j.tutorialDownAllow = true;
					j.tutorialArrow.rotation = 90;
					j.tutorialPointer.x = 0;
					j.tutorialPointer.y = 700 * TWEEN.Easing.Quintic.In(Math.min(1, 1.3 * (j.tutorialTime - Math.floor(j.tutorialTime)))) - 350;
					j.tutorialKeyDown.visible = true;
					j.tutorialKeyUp.visible = j.tutorialKeyLeft.visible = j.tutorialKeyRight.visible = false;
					j.tutorialKeyDown.tint.a = Math.abs(Math.sin(8 * j.tutorialTime))
				} else {
					if (j.distance > 12000 && !j.tutorialCrossLeft) {
						j.tutorialFade = 1 - (j.distance - 12000) / 200;
						j.tutorialCrossLeftAllow = true;
						j.tutorialArrow.rotation = 180;
						j.tutorialPointer.x = -700 * TWEEN.Easing.Quintic.In(Math.min(1, 1.3 * (j.tutorialTime - Math.floor(j.tutorialTime)))) + 350;
						j.tutorialPointer.y = 0;
						j.tutorialKeyLeft.visible = true;
						j.tutorialKeyDown.visible = j.tutorialKeyUp.visible = j.tutorialKeyRight.visible = false;
						j.tutorialKeyLeft.tint.a = Math.abs(Math.sin(8 * j.tutorialTime))
					} else {
						if (j.distance > 16500 && !j.tutorialRight) {
							j.tutorialFade = 1 - (j.distance - 16500) / 200;
							j.tutorialRightAllow = true;
							j.tutorialArrow.rotation = 0;
							j.tutorialPointer.x = 700 * TWEEN.Easing.Quintic.In(Math.min(1, 1.3 * (j.tutorialTime - Math.floor(j.tutorialTime)))) - 350;
							j.tutorialPointer.y = 0;
							j.tutorialKeyRight.visible = true;
							j.tutorialKeyDown.visible = j.tutorialKeyLeft.visible = j.tutorialKeyUp.visible = false;
							j.tutorialKeyRight.tint.a = Math.abs(Math.sin(8 * j.tutorialTime))
						} else {
							if (j.distance > 19500 && !j.tutorialLeft) {
								j.tutorialFade = 1 - (j.distance - 19500) / 200;
								j.tutorialLeftAllow = true;
								j.tutorialArrow.rotation = 180;
								j.tutorialPointer.x = -700 * TWEEN.Easing.Quintic.In(Math.min(1, 1.3 * (j.tutorialTime - Math.floor(j.tutorialTime)))) + 350;
								j.tutorialPointer.y = 0;
								j.tutorialKeyLeft.visible = true;
								j.tutorialKeyDown.visible = j.tutorialKeyUp.visible = j.tutorialKeyRight.visible = false;
								j.tutorialKeyLeft.tint.a = Math.abs(Math.sin(8 * j.tutorialTime))
							} else {
								if (j.distance > 24000 && !j.tutorialCrossRight) {
									j.tutorialFade = 1 - (j.distance - 24000) / 200;
									j.tutorialCrossRightAllow = true;
									j.tutorialArrow.rotation = 0;
									j.tutorialPointer.x = 700 * TWEEN.Easing.Quintic.In(Math.min(1, 1.3 * (j.tutorialTime - Math.floor(j.tutorialTime)))) - 350;
									j.tutorialPointer.y = 0;
									j.tutorialKeyRight.visible = true;
									j.tutorialKeyDown.visible = j.tutorialKeyLeft.visible = j.tutorialKeyUp.visible = false;
									j.tutorialKeyRight.tint.a = Math.abs(Math.sin(8 * j.tutorialTime))
								} else {
									if ((j.tutorialFade += 5 * g) >= 1) {
										j.tutorialFade = 1;
										j.tutorialTime = 0;
										if (j.distance >= 25000) {
											j.tutorial = false;
											GEMIOLI.Utils.setBool("tutorial", false)
										}
									}
									if (j.tutorial) {
										j.tutorialUpAllow = j.tutorialDownAllow = j.tutorialLeftAllow = j.tutorialRightAllow = j.tutorialCrossLeftAllow = j.tutorialCrossRightAllow = false
									}
									if (j.tutorialSound) {
										j.tutorialSound.volume = 1 - j.tutorialFade
									}
								}
							}
						}
					}
				}
			}
			j.tutorialInterface.tint.a = 1 - j.tutorialFade;
			j.tutorialInterface.visible = true;
			if (j.tutorialFade < 1) {
				if (j.tutorialSound === null) {
					j.tutorialSound = GEMIOLI.SoundLoader.load("tutorial").play();
					j.tutorialSound.volume = 1;
					j.fadeMusic(0.25, 0.5)
				}
			} else {
				if (j.tutorialSound) {
					j.tutorialSound = null;
					j.fadeMusic(0.25, 1)
				}
			}
		} else {
			j.tutorialInterface.visible = false
		}
	}
})();
GEMIOLI.Play.prototype.onPause = function() {
	GEMIOLI.Pause.show();
	GEMIOLI.Pause.addEventListener("removed", GEMIOLI.Play.onPauseRemoved, false)
};
GEMIOLI.Play.prototype.onPauseRemoved = function() {
	GEMIOLI.Pause.removeEventListener("removed", GEMIOLI.Play.onPauseRemoved, false);
	GEMIOLI.Play.paused = false
};
GEMIOLI.Play.prototype.from3DTo2D = function() {
	var a = new THREE.Vector3();
	return function(b) {
		var c = this;
		a.copy(b);
		a.project(c.camera3D);
		a.set((a.x + 1) * 0.5 * c.width, (1 - (a.y + 1) * 0.5) * c.height, 0);
		return a
	}
}();
GEMIOLI.List = function() {
	this.head = null;
	this.tail = null;
	this.pool = null
};
GEMIOLI.List.prototype = {
	constructor: GEMIOLI.List,
	nodeFromPool: function(b) {
		if (this.pool) {
			var a = this.pool;
			this.pool = a.next;
			a.previous = a.next = null;
			a.data = b;
			return a
		} else {
			return {
				data: b,
				previous: null,
				next: null
			}
		}
	},
	nodeToPool: function(a) {
		a.data = null;
		a.previous = null;
		a.next = this.pool;
		this.pool = a
	},
	add: function(c) {
		var b = this,
			a = b.nodeFromPool(c);
		if (b.tail) {
			b.tail.next = a;
			a.previous = b.tail;
			b.tail = a
		} else {
			b.head = b.tail = a
		}
		return a
	},
	pop: function() {
		var a = this;
		if (a.tail) {
			var b = a.tail.data;
			a.removeNode(a.tail);
			return b
		} else {
			return null
		}
	},
	removeNode: function(b) {
		var a = this;
		if (a.head === b) {
			a.head = a.head.next
		}
		if (a.tail === b) {
			a.tail = a.tail.previous
		}
		if (b.previous) {
			b.previous.next = b.next
		}
		if (b.next) {
			b.next.previous = b.previous
		}
		a.nodeToPool(b)
	}
};
GEMIOLI.BendShader = {
	id: "Bend",
	uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
		bendX: {
			type: "f",
			value: 0.0001
		},
		bendY: {
			type: "f",
			value: 0
		}
	}]),
	vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, "uniform float bendX;", "uniform float bendY;", "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.skinbase_vertex, "#ifdef USE_SKINNING", "	vec4 skinVertex = bindMatrix * vec4( position, 1.0 );", "	vec4 worldPosition = vec4(0.0);", "	worldPosition += boneMatX * skinVertex * skinWeight.x;", "	worldPosition += boneMatY * skinVertex * skinWeight.y;", "	worldPosition  = bindMatrixInverse * worldPosition;", "	worldPosition  = modelMatrix * vec4(worldPosition.xyz, 1.0);", "#else", "	vec4 worldPosition = modelMatrix * vec4(position, 1.0);", "#endif", "	vec2 offset = vec2(worldPosition.x - cameraPosition.x, worldPosition.z - cameraPosition.z);", "	float bendOffset = offset.x * offset.x + offset.y * offset.y;", "	worldPosition.y += bendOffset * bendY;", "	worldPosition.z += bendOffset * bendX;", "	vec4 mvPosition = viewMatrix * vec4(worldPosition.xyz, 1.0);", "	gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
	fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, "	outgoingLight = diffuseColor.rgb;", "	#ifdef USE_FOG", "	#ifdef USE_LOGDEPTHBUF_EXT", "		float depth = gl_FragDepthEXT / gl_FragCoord.w;", "	#else", "		float depth = gl_FragCoord.z / gl_FragCoord.w;", "	#endif", "	#ifdef FOG_EXP2", "		float fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );", "		fogFactor = whiteCompliment( fogFactor );", "	#else", "	float fogFactor = smoothstep( fogNear, fogFar, depth );", "	#endif", "	gl_FragColor = vec4( outgoingLight, diffuseColor.a * (1.0 - fogFactor));", "	#else", "	gl_FragColor = vec4( outgoingLight, diffuseColor.a);", "	#endif", "}"].join("\n")
};
GEMIOLI.SpriteBendShader = {
	id: "SpriteBend",
	uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
		bendX: {
			type: "f",
			value: 0.0001
		},
		bendY: {
			type: "f",
			value: 0
		},
		scale: {
			type: "f",
			value: 1
		},
		rotation: {
			type: "f",
			value: 0
		}
	}]),
	vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, "uniform float bendX;", "uniform float bendY;", "uniform float scale;", "uniform float rotation;", "void main() {", THREE.ShaderChunk.map_vertex, "	vec2 alignedPosition = position.xy * vec2(scale, scale);", "	vec2 rotatedPosition;", "	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "	vec4 worldPosition;", "	worldPosition = modelMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "	vec2 offset = vec2(worldPosition.x - cameraPosition.x, worldPosition.z - cameraPosition.z);", "	float bendOffset = offset.x * offset.x + offset.y * offset.y;", "	worldPosition.y += bendOffset * bendY;", "	worldPosition.z += bendOffset * bendX;", "	vec4 mvPosition = viewMatrix * vec4(worldPosition.xyz, 1.0);", "	mvPosition.xy += rotatedPosition;", "	gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
	fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, "	outgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
};
THREE.SphereBufferGeometry = function(f, e, A, D, H, g, G) {
	THREE.BufferGeometry.call(this);
	this.type = "SphereBufferGeometry";
	this.parameters = {
		radius: f,
		widthSegments: e,
		heightSegments: A,
		phiStart: D,
		phiLength: H,
		thetaStart: g,
		thetaLength: G
	};
	f = f || 50;
	e = Math.max(3, Math.floor(e) || 8);
	A = Math.max(2, Math.floor(A) || 6);
	D = D !== undefined ? D : 0;
	H = H !== undefined ? H : Math.PI * 2;
	g = g !== undefined ? g : 0;
	G = G !== undefined ? G : Math.PI;
	var F = g + G;
	var p = ((e + 1) * (A + 1));
	var l = new THREE.BufferAttribute(new Float32Array(p * 3), 3);
	var o = new THREE.BufferAttribute(new Float32Array(p * 2), 2);
	var k = 0,
		j = [],
		I = new THREE.Vector3();
	for (var m = 0; m <= A; m++) {
		var C = [];
		var q = m / A;
		for (var n = 0; n <= e; n++) {
			var r = n / e;
			var E = -f * Math.cos(D + r * H) * Math.sin(g + q * G);
			var B = f * Math.cos(g + q * G);
			var t = f * Math.sin(D + r * H) * Math.sin(g + q * G);
			l.setXYZ(k, E, B, t);
			o.setXY(k, r, q);
			C.push(k);
			k++
		}
		j.push(C)
	}
	var h = [];
	for (var m = 0; m < A; m++) {
		for (var n = 0; n < e; n++) {
			var d = j[m][n + 1];
			var c = j[m][n];
			var b = j[m + 1][n];
			var a = j[m + 1][n + 1];
			if (m !== 0 || g > 0) {
				h.push(d, c, a)
			}
			if (m !== A - 1 || F < Math.PI) {
				h.push(c, b, a)
			}
		}
	}
	this.addAttribute("index", new THREE.BufferAttribute(new Uint16Array(h), 1));
	this.addAttribute("position", l);
	this.addAttribute("uv", o);
	this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), f)
};
THREE.SphereBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.SphereBufferGeometry.prototype.constructor = THREE.SphereBufferGeometry;
THREE.SphereBufferGeometry.prototype.clone = function() {
	var a = this.parameters;
	return new THREE.SphereBufferGeometry(a.radius, a.widthSegments, a.heightSegments, a.phiStart, a.phiLength, a.thetaStart, a.thetaLength)
};
GEMIOLI.Menu = function() {
	GEMIOLI.Layer.call(this);
	var a = this;
	a.bottom = new GEMIOLI.DisplayObjectContainer();
	a.addChild(a.bottom);
	a.play = new GEMIOLI.Button(-204, -198, 408, 397, [13, 32, 27]);
	a.play.addChild(GEMIOLI.AtlasQuad.fromRect(-204, -198, 408, 397, "atlases/menu.atlas", "play"));
	a.play.y = -190;
	a.play.addEventListener("click", function(b) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		a.hide();
		GEMIOLI.SoundLoader.load("button").play();
		GEMIOLI.Play.show()
	});
	a.bottom.addChild(a.play);
	a.addEventListener("pointerdown", function(b) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		a.play.dispatchEvent({
			type: "click"
		})
	});
	a.more = new GEMIOLI.Button(-178, -167, 356, 335, [77]);
	a.more.addChild(GEMIOLI.AtlasQuad.fromRect(-178, -167, 356, 335, "atlases/menu.atlas", "more"));
	a.more.x = -600;
	a.more.y = -190;
	a.more.addEventListener("click", function(b) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		if (SpilData.moreGamesAction) {
			SpilData.moreGamesAction.call(this)
		}
	});
	a.bottom.addChild(a.more);
	a.shop = new GEMIOLI.Button(-178, -167, 356, 335, [66]);
	a.shop.addChild(GEMIOLI.AtlasQuad.fromRect(-178, -167, 356, 335, "atlases/menu.atlas", "shop"));
	a.shop.x = 600;
	a.shop.y = -190;
	a.shop.addEventListener("click", function(b) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		GEMIOLI.Shop.show()
	});
	a.bottom.addChild(a.shop);
	a.title1 = GEMIOLI.AtlasQuad.fromRect(-447, -58, 595, 217, "atlases/menu.atlas", "title1");
	a.addChild(a.title1);
	a.title2 = GEMIOLI.AtlasQuad.fromRect(-205, -54, 510, 128, "atlases/menu.atlas", "title2");
	a.addChild(a.title2);
	a.top = new GEMIOLI.DisplayObjectContainer();
	a.addChild(a.top);
	a.settings = new GEMIOLI.Button(-135, -135, 271, 271, [83]);
	a.settings.addChild(GEMIOLI.AtlasQuad.fromRect(-135, -135, 271, 271, "atlases/menu.atlas", "settings"));
	a.settings.x = 600;
	a.settings.y = 150;
	a.settings.addEventListener("click", function(b) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		GEMIOLI.Settings.show()
	});
	a.top.addChild(a.settings);
	a.logo = new GEMIOLI.Logo(-200, -125, 400, 250);
	a.logo.x = -600;
	a.logo.y = 150;
	a.top.addChild(a.logo)
};
GEMIOLI.Menu.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Menu.prototype.show = function() {
	var a = this;
	a.time = 0;
	a.showing = true;
	GEMIOLI.Play.fadeMenu(0, 1)
};
GEMIOLI.Menu.prototype.hide = function() {
	this.showing = false;
	GEMIOLI.Play.fadeMenu(0.7, 0)
};
GEMIOLI.Menu.prototype.update = function(b, c) {
	var a = this;
	if (a.showing) {
		if ((a.time += b * 2) > 1) {
			a.time = 1
		}
	} else {
		if (a.time >= 0) {
			if ((a.time -= b * 4) <= 0) {
				GEMIOLI.Application.popLayer();
				return
			}
		}
	}
	a.top.x = a.bottom.x = a.width / 2;
	a.bottom.y = (1 - (a.showing ? TWEEN.Easing.Back.Out(a.time) : a.time)) * 500 + a.height;
	a.title1.y = a.title2.y = a.top.y = (1 - (a.showing ? TWEEN.Easing.Back.Out(a.time) : a.time)) * -700;
	a.title1.x = (a.width / 2 - 0) - (1 - (a.showing ? TWEEN.Easing.Elastic.Out(a.time) : a.time)) * (a.width / 2 - 50 + 320);
	a.title2.x = (a.width / 2 + 40) + (1 - (a.showing ? TWEEN.Easing.Elastic.Out(a.time) : a.time)) * (a.width / 2 + 320);
	a.title1.y = 250;
	a.title2.y = 450;
	var d = 1 + 0.02 * Math.abs(Math.sin(8 * c));
	a.play.scaleX = a.play.scaleY = d
};
GEMIOLI.Settings = function() {
	GEMIOLI.Layer.call(this);
	var a = this;
	a.fade = GEMIOLI.AtlasQuad.fromRect(0, 0, 0, 0, "atlases/settings.atlas", "fade");
	a.addChild(this.fade);
	a.opacity = 0;
	a.center = new GEMIOLI.DisplayObjectContainer();
	a.addChild(a.center);
	a.fade.addEventListener("pointerdown", function(c) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		a.hide()
	});
	a.back = GEMIOLI.AtlasQuad.fromRect(-585, -562, 1171, 1125, "atlases/settings.atlas", "back");
	a.back.addEventListener("pointerdown", function(c) {
		if (a.back.isUnderPoint(c.x, c.y)) {
			c.cancelled = true
		}
	});
	a.center.addChild(a.back);
	var b = GEMIOLI.AtlasQuad.fromRect(-317, -215, 635, 431, "atlases/settings.atlas", "logo");
	b.x = -200;
	b.y = -100;
	a.center.addChild(b);
	b = GEMIOLI.AtlasQuad.fromRect(-165, -165, 331, 331, "atlases/settings.atlas", "logo2");
	b.x = 330;
	b.y = -100;
	a.center.addChild(b);
	a.sound = new GEMIOLI.Button(-139, -138, 278, 277, [77, 83]);
	a.sound.on = GEMIOLI.AtlasQuad.fromRect(-139, -138, 278, 277, "atlases/settings.atlas", "sound_on");
	a.sound.off = GEMIOLI.AtlasQuad.fromRect(-139, -138, 278, 277, "atlases/settings.atlas", "sound_off");
	a.sound.addChild(a.sound.on);
	a.sound.addChild(a.sound.off);
	a.sound.x = -250;
	a.sound.y = 300;
	a.sound.on.visible = GEMIOLI.Utils.getBool("sound", true);
	a.sound.off.visible = !a.sound.off.visible;
	a.sound.addEventListener("click", function(c) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		a.sound.on.visible = !a.sound.on.visible;
		a.sound.off.visible = !a.sound.off.visible;
		GEMIOLI.Utils.setBool("sound", a.sound.on.visible);
		GEMIOLI.Utils.getBool("sound", true) ? GEMIOLI.SoundLoader.unmute() : GEMIOLI.SoundLoader.mute()
	}, false);
	a.sound.visible = GEMIOLI.SoundLoader.enabled;
	a.center.addChild(a.sound);
	a.addEventListener("added", function(c) {
		a.sound.on.visible = GEMIOLI.Utils.getBool("sound", true);
		a.sound.off.visible = !a.sound.on.visible
	}, false);
	a.close = new GEMIOLI.Button(-139, -138, 278, 277, [32, 13, 27]);
	a.close.x = 250;
	a.close.y = 300;
	a.close.addChild(GEMIOLI.AtlasQuad.fromRect(-139, -138, 278, 277, "atlases/settings.atlas", "close"));
	a.center.addChild(this.close);
	a.close.addEventListener("click", function(c) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		a.hide()
	})
};
GEMIOLI.Settings.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Settings.prototype.resize = function() {
	var a = this;
	GEMIOLI.Layer.prototype.resize.call(a);
	a.fade.setRectangle(0, 0, a.width, a.height);
	a.center.x = a.width / 2;
	a.center.y = a.height / 2
};
GEMIOLI.Settings.prototype.show = function() {
	var a = this;
	GEMIOLI.Application.pushLayer(GEMIOLI.Settings);
	a.opacity = 0;
	a.showing = true;
	a.update(0, 0);
	GEMIOLI.SoundLoader.load("open_swish").play()
};
GEMIOLI.Settings.prototype.hide = function() {
	this.showing = false;
	GEMIOLI.SoundLoader.load("close_swish").play()
};
GEMIOLI.Settings.prototype.update = function(b, c) {
	var a = this;
	b *= 4;
	if (a.showing) {
		if ((a.opacity += b) > 1) {
			a.opacity = 1
		}
	} else {
		if (a.opacity >= 0) {
			if ((a.opacity -= b) <= 0) {
				GEMIOLI.Application.popLayer();
				return
			}
		}
	}
	a.fade.tint.a = a.opacity;
	a.center.x = a.width / 2;
	a.center.y = a.height / 2 + (a.showing ? -a.height / 2 * TWEEN.Easing.Back.In(1 - a.opacity) : a.height / 2 * TWEEN.Easing.Back.In(1 - a.opacity))
};
GEMIOLI.Pause = function() {
	GEMIOLI.Layer.call(this);
	var a = this;
	a.fade = GEMIOLI.AtlasQuad.fromRect(0, 0, 0, 0, "atlases/pause.atlas", "fade");
	a.addChild(a.fade);
	a.opacity = 0;
	a.center = new GEMIOLI.DisplayObjectContainer();
	a.addChild(a.center);
	a.fade.addEventListener("pointerdown", function(b) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		a.hide()
	});
	a.back = GEMIOLI.AtlasQuad.fromRect(-585, -549, 1171, 1099, "atlases/pause.atlas", "back");
	a.center.addChild(a.back);
	a.close = new GEMIOLI.Button(-165, -159, 330, 318, [32, 13, 27]);
	a.close.y = 150;
	a.close.addChild(GEMIOLI.AtlasQuad.fromRect(-165, -159, 330, 318, "atlases/pause.atlas", "close"));
	a.center.addChild(a.close);
	a.close.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		a.hide()
	});
	a.restart = new GEMIOLI.Button(-138, -138, 277, 277, [82]);
	a.restart.x = 350;
	a.restart.y = 250;
	a.restart.addChild(GEMIOLI.AtlasQuad.fromRect(-138, -138, 277, 277, "atlases/pause.atlas", "restart"));
	a.center.addChild(a.restart);
	a.restart.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		GEMIOLI.Cross.show(function() {
			GEMIOLI.Application.pushLayer(GEMIOLI.Play);
			GEMIOLI.Play.show();
			GEMIOLI.Play.fadeMusic(0.25, 1)
		})
	});
	a.menu = new GEMIOLI.Button(-139, -138, 278, 277, [77]);
	a.menu.x = -350;
	a.menu.y = 250;
	a.menu.addChild(GEMIOLI.AtlasQuad.fromRect(-139, -138, 278, 277, "atlases/pause.atlas", "menu"));
	a.center.addChild(a.menu);
	a.menu.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		GEMIOLI.Play.fadeMusic(0.25, 0);
		GEMIOLI.Cross.show(function() {
			GEMIOLI.Application.pushLayer(GEMIOLI.Play);
			GEMIOLI.Application.pushLayer(GEMIOLI.Menu);
			GEMIOLI.Menu.show()
		})
	});
	a.logo = new GEMIOLI.Logo(-225, -90, 450, 180);
	a.logo.y = 410;
	a.center.addChild(a.logo)
};
GEMIOLI.Pause.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Pause.prototype.resize = function() {
	var a = this;
	GEMIOLI.Layer.prototype.resize.call(a);
	a.fade.setRectangle(0, 0, a.width, a.height);
	a.center.x = a.width / 2;
	a.center.y = a.height / 2
};
GEMIOLI.Pause.prototype.show = function() {
	var a = this;
	GEMIOLI.Application.pushLayer(GEMIOLI.Pause);
	GEMIOLI.Play.paused = true;
	a.opacity = 0;
	a.showing = true;
	a.update(0, 0);
	GEMIOLI.Play.fadeMusic(0.25, 0.5);
	GEMIOLI.SoundLoader.load("open_swish").play()
};
GEMIOLI.Pause.prototype.hide = function() {
	this.showing = false;
	if (!GEMIOLI.Play.tutorialSound) {
		GEMIOLI.Play.fadeMusic(0.25, 1)
	}
	GEMIOLI.SoundLoader.load("close_swish").play()
};
GEMIOLI.Pause.prototype.update = function(b, c) {
	var a = this;
	b *= 4;
	if (a.showing) {
		if ((a.opacity += b) > 1) {
			a.opacity = 1
		}
	} else {
		if (a.opacity >= 0) {
			if ((a.opacity -= b) <= 0) {
				GEMIOLI.Application.popLayer();
				return
			}
		}
	}
	a.fade.tint.a = a.opacity;
	a.center.x = a.width / 2;
	a.center.y = a.height / 2 + (a.showing ? -a.height / 2 * TWEEN.Easing.Back.In(1 - a.opacity) : a.height / 2 * TWEEN.Easing.Back.In(1 - a.opacity))
};
GEMIOLI.Score = function() {
	GEMIOLI.Layer.call(this);
	var a = this;
	a.fade = GEMIOLI.AtlasQuad.fromRect(0, 0, 0, 0, "atlases/score.atlas", "fade");
	a.addChild(a.fade);
	a.opacity = 0;
	a.center = new GEMIOLI.DisplayObjectContainer();
	a.addChild(a.center);
	a.back = GEMIOLI.AtlasQuad.fromRect(-575, -629, 1171, 1259, "atlases/score.atlas", "back");
	a.center.addChild(a.back);
	a.restart = new GEMIOLI.Button(-138, -138, 277, 277, [32, 13, 27]);
	a.restart.x = 350;
	a.restart.y = 370;
	a.restart.addChild(GEMIOLI.AtlasQuad.fromRect(-138, -138, 277, 277, "atlases/score.atlas", "restart"));
	a.center.addChild(a.restart);
	a.restart.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}

		// 显示确认对话框
		showRestartConfirmation(function() {
			GEMIOLI.SoundLoader.load("button").play();
			GEMIOLI.Cross.show(function() {
				a.hide();
				GEMIOLI.Application.pushLayer(GEMIOLI.Play);
				GEMIOLI.Play.show();
				GEMIOLI.Play.fadeMusic(0.25, 1)
			})
		});
	});

	// 每次游戏需要扣除的金币数量（从GameConfig中获取）
	const RESTART_COINS_COST = typeof GameConfig !== 'undefined' ? GameConfig.RESTART_GAME_COST : 10;

	// 标记是否正在处理确认对话框
	let isProcessingRestartConfirmation = false;

	// 创建确认对话框
	function createRestartConfirmationDialog() {
		// 检查是否已存在确认对话框
		if (document.getElementById('restart-confirmation')) {
			return document.getElementById('restart-confirmation');
		}

		// 创建确认对话框元素
		const dialog = document.createElement('div');
		dialog.id = 'restart-confirmation';
		dialog.style.display = 'none';
		dialog.style.position = 'fixed';
		dialog.style.top = '0';
		dialog.style.left = '0';
		dialog.style.width = '100%';
		dialog.style.height = '100%';
		dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		dialog.style.zIndex = '9999';
		dialog.style.justifyContent = 'center';
		dialog.style.alignItems = 'center';

		// 创建对话框内容
		const content = document.createElement('div');
		content.style.backgroundColor = '#fff';
		content.style.padding = '20px';
		content.style.borderRadius = '10px';
		content.style.maxWidth = '80%';
		content.style.textAlign = 'center';

		// 创建消息文本
		const message = document.createElement('p');
		message.id = 'restart-message';
		message.textContent = '本次游戏将扣除金币，是否继续？';
		message.style.fontSize = '18px';
		message.style.marginBottom = '20px';

		// 创建按钮容器
		const buttonContainer = document.createElement('div');
		buttonContainer.style.display = 'flex';
		buttonContainer.style.justifyContent = 'center';
		buttonContainer.style.gap = '10px';

		// 创建确认按钮
		const confirmButton = document.createElement('button');
		confirmButton.textContent = '确认开始';
		confirmButton.style.padding = '10px 20px';
		confirmButton.style.backgroundColor = '#4CAF50';
		confirmButton.style.color = 'white';
		confirmButton.style.border = 'none';
		confirmButton.style.borderRadius = '5px';
		confirmButton.style.cursor = 'pointer';
		confirmButton.id = 'restart-confirm-button';

		// 创建取消按钮
		const cancelButton = document.createElement('button');
		cancelButton.textContent = '取消';
		cancelButton.style.padding = '10px 20px';
		cancelButton.style.backgroundColor = '#f44336';
		cancelButton.style.color = 'white';
		cancelButton.style.border = 'none';
		cancelButton.style.borderRadius = '5px';
		cancelButton.style.cursor = 'pointer';
		cancelButton.id = 'restart-cancel-button';

		// 组装对话框
		buttonContainer.appendChild(confirmButton);
		buttonContainer.appendChild(cancelButton);
		content.appendChild(message);
		content.appendChild(buttonContainer);
		dialog.appendChild(content);

		// 添加到文档
		document.body.appendChild(dialog);

		return dialog;
	}

	// 显示确认对话框
	async function showRestartConfirmation(callback) {
		try {
			// 标记正在处理确认对话框
			isProcessingRestartConfirmation = true;

			// 创建或获取确认对话框
			const dialog = createRestartConfirmationDialog();

			// 显示对话框（先显示，再更新内容，避免闪烁）
			if (dialog) {
				dialog.style.display = 'flex';
			}

			// 获取确认和取消按钮
			const confirmButton = document.getElementById('restart-confirm-button');
			const cancelButton = document.getElementById('restart-cancel-button');
			const message = document.getElementById('restart-message');

			// 先显示加载中的消息
			if (message) {
				message.textContent = '正在获取金币余额...';
			}

			// 禁用确认按钮，直到获取到金币余额
			if (confirmButton) {
				confirmButton.disabled = true;
				confirmButton.style.opacity = '0.5';
				confirmButton.style.cursor = 'not-allowed';
			}

			// 检查钱包和API是否可用
			if (typeof WalletManager === 'undefined' || !WalletManager.isConnected() || typeof ApiService === 'undefined') {
				if (message) {
					message.textContent = '无法连接到钱包或API服务，请确保已连接钱包并刷新页面。';
				}
				console.error('钱包或API服务不可用');
				return;
			}

			// 从API获取最新的金币余额
			let currentCoins = 0;
			try {
				const walletAddress = WalletManager.getAccount();
				console.log('从API获取最新金币余额...');
				currentCoins = await ApiService.getCoins(walletAddress);
				console.log('当前金币余额:', currentCoins);
			} catch (error) {
				console.error('获取金币余额时出错:', error);

				// 显示错误消息
				if (message) {
					message.textContent = '获取金币余额时出错，请稍后重试。';
				}

				// 隐藏确认按钮
				if (confirmButton) {
					confirmButton.style.display = 'none';
				}

				return;
			}

			// 更新消息
			if (message) {
				message.textContent = `本次游戏将扣除 ${RESTART_COINS_COST} 金币，当前余额: ${currentCoins} 金币，是否继续？`;

				// 如果金币不足，显示提示
				if (currentCoins < RESTART_COINS_COST) {
					message.textContent = `金币不足！本次游戏需要 ${RESTART_COINS_COST} 金币，当前余额: ${currentCoins} 金币。`;

					// 隐藏确认按钮
					if (confirmButton) {
						confirmButton.style.display = 'none';
					}
				} else {
					// 显示确认按钮
					if (confirmButton) {
						confirmButton.style.display = 'inline-block';
						confirmButton.disabled = false;
						confirmButton.style.opacity = '1';
						confirmButton.style.cursor = 'pointer';
					}
				}
			}

			// 移除现有的事件监听器
			if (confirmButton) {
				confirmButton.onclick = null;

				// 添加新的事件监听器
				confirmButton.onclick = function() {
					onRestartConfirm(callback);
				};
			}

			if (cancelButton) {
				cancelButton.onclick = null;

				// 添加新的事件监听器
				cancelButton.onclick = onRestartCancel;
			}
		} catch (error) {
			console.error('显示确认对话框时出错:', error);

			// 重置处理标记
			isProcessingRestartConfirmation = false;

			// 显示错误消息
			const message = document.getElementById('restart-message');
			if (message) {
				message.textContent = '显示确认对话框时出错，请稍后重试。';
			}

			// 隐藏确认按钮
			const confirmButton = document.getElementById('restart-confirm-button');
			if (confirmButton) {
				confirmButton.style.display = 'none';
			}
		}
	}

	// 确认按钮点击事件
	async function onRestartConfirm(callback) {
		try {
			console.log('确认再来一次');

			// 禁用确认按钮，防止重复点击
			const confirmButton = document.getElementById('restart-confirm-button');
			if (confirmButton) {
				confirmButton.disabled = true;
				confirmButton.style.opacity = '0.5';
				confirmButton.style.cursor = 'not-allowed';
			}

			// 检查钱包和API是否可用
			if (typeof WalletManager === 'undefined' || !WalletManager.isConnected() || typeof ApiService === 'undefined') {
				alert('无法连接到钱包或API服务，请确保已连接钱包并刷新页面。');
				hideRestartConfirmation();

				// 恢复确认按钮
				if (confirmButton) {
					confirmButton.disabled = false;
					confirmButton.style.opacity = '1';
					confirmButton.style.cursor = 'pointer';
				}

				return;
			}

			// 从API获取最新的金币余额
			let currentCoins = 0;
			try {
				const walletAddress = WalletManager.getAccount();
				console.log('从API获取最新金币余额...');
				currentCoins = await ApiService.getCoins(walletAddress);
				console.log('当前金币余额:', currentCoins);
			} catch (error) {
				console.error('获取金币余额时出错:', error);
				alert('获取金币余额时出错，请稍后重试。');
				hideRestartConfirmation();

				// 恢复确认按钮
				if (confirmButton) {
					confirmButton.disabled = false;
					confirmButton.style.opacity = '1';
					confirmButton.style.cursor = 'pointer';
				}

				return;
			}

			// 检查金币是否足够
			if (currentCoins < RESTART_COINS_COST) {
				alert('金币不足，无法开始游戏！');
				hideRestartConfirmation();

				// 恢复确认按钮
				if (confirmButton) {
					confirmButton.disabled = false;
					confirmButton.style.opacity = '1';
					confirmButton.style.cursor = 'pointer';
				}

				return;
			}

			// 通过API扣除金币
			try {
				const walletAddress = WalletManager.getAccount();
				console.log('通过API扣除金币:', RESTART_COINS_COST);
				const newCoins = await ApiService.updateCoins(walletAddress, RESTART_COINS_COST, 'subtract', 'restart');
				console.log('扣除后的金币余额:', newCoins);
			} catch (error) {
				console.error('扣除金币时出错:', error);
				alert('扣除金币时出错，请稍后重试。');
				hideRestartConfirmation();

				// 恢复确认按钮
				if (confirmButton) {
					confirmButton.disabled = false;
					confirmButton.style.opacity = '1';
					confirmButton.style.cursor = 'pointer';
				}

				return;
			}

			// 隐藏对话框
			hideRestartConfirmation();

			// 更新游戏状态面板
			if (typeof GameStatusPanel !== 'undefined' && GameStatusPanel.updatePanel) {
				GameStatusPanel.updatePanel();
			}

			// 调用回调函数
			if (typeof callback === 'function') {
				callback();
			}

			// 重置处理标记（延迟执行，确保事件处理完成）
			setTimeout(function() {
				isProcessingRestartConfirmation = false;
			}, 1000);
		} catch (error) {
			console.error('确认再来一次时出错:', error);
			alert('重新开始游戏时出错，请重试！');

			// 重置处理标记
			isProcessingRestartConfirmation = false;

			// 恢复确认按钮
			const confirmButton = document.getElementById('restart-confirm-button');
			if (confirmButton) {
				confirmButton.disabled = false;
				confirmButton.style.opacity = '1';
				confirmButton.style.cursor = 'pointer';
			}
		}
	}

	// 取消按钮点击事件
	function onRestartCancel() {
		console.log('取消再来一次');

		// 隐藏对话框
		hideRestartConfirmation();

		// 重置处理标记
		isProcessingRestartConfirmation = false;
	}

	// 隐藏确认对话框
	function hideRestartConfirmation() {
		const dialog = document.getElementById('restart-confirmation');
		if (dialog) {
			dialog.style.display = 'none';
		}
	}
	a.shop = new GEMIOLI.Button(-138, -138, 277, 277, [66, 83]);
	a.shop.y = 370;
	a.shop.addChild(GEMIOLI.AtlasQuad.fromRect(-138, -138, 277, 277, "atlases/score.atlas", "shop"));
	a.center.addChild(a.shop);
	a.shop.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		GEMIOLI.Shop.show(a.shopAttract);
		a.shopAttract = 0
	});
	a.menu = new GEMIOLI.Button(-138, -138, 277, 277, [77]);
	a.menu.x = -350;
	a.menu.y = 370;
	a.menu.addChild(GEMIOLI.AtlasQuad.fromRect(-138, -138, 277, 277, "atlases/score.atlas", "menu"));
	a.center.addChild(a.menu);
	a.menu.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		GEMIOLI.Play.fadeMusic(0.25, 0);
		GEMIOLI.Cross.show(function() {
			a.hide();
			GEMIOLI.Application.pushLayer(GEMIOLI.Play);
			GEMIOLI.Application.pushLayer(GEMIOLI.Menu);
			GEMIOLI.Menu.show()
		})
	});
	a.scoreText = GEMIOLI.Text.fromAtlas(135, "fonts/score/score.fnt", "atlases/score.atlas", GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	a.scoreText.y = -250;
	a.scoreText.offset = -10;
	a.center.addChild(a.scoreText);
	a.distanceText = GEMIOLI.Text.fromAtlas(100, "fonts/score/score.fnt", "atlases/score.atlas", GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	a.distanceText.x = 150;
	a.distanceText.y = -40;
	a.distanceText.offset = -10;
	a.center.addChild(a.distanceText);
	a.coinsText = GEMIOLI.Text.fromAtlas(100, "fonts/score/score.fnt", "atlases/score.atlas", GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	a.coinsText.x = 150;
	a.coinsText.y = 90;
	a.coinsText.offset = -10;
	a.center.addChild(a.coinsText);
	a.medal = GEMIOLI.AtlasQuad.fromRect(-186, -186, 372, 372, "atlases/score.atlas", "medal");
	a.medal.x = 420;
	a.medal.y = -540;
	a.center.addChild(a.medal);
	a.logo = new GEMIOLI.Logo(-175, -90, 350, 180);
	a.logo.x = -350;
	a.logo.y = -450;
	a.center.addChild(a.logo)
};
GEMIOLI.Score.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Score.prototype.resize = function() {
	var a = this;
	GEMIOLI.Layer.prototype.resize.call(a);
	a.fade.setRectangle(0, 0, a.width, a.height);
	a.center.x = a.width / 2;
	a.center.y = a.height / 2
};
GEMIOLI.Score.prototype.show = function(a) {
	var d = this;
	GEMIOLI.Application.pushLayer(GEMIOLI.Score);
	GEMIOLI.Play.paused = true;
	d.opacity = 0;
	d.showing = true;
	var e = Math.floor(GEMIOLI.Play.distance / 200);
	d.score = e * 100 + GEMIOLI.Play.coins * 80;
	d.panelSound = d.countSound = true;
	d.distanceText.text = e.toString() + "m";
	d.distanceText.scaleX = d.distanceText.scaleY = 6 / Math.max(6, d.distanceText.text.length);
	d.coinsText.text = GEMIOLI.Play.coins.toString();
	d.coinsText.scaleX = d.coinsText.scaleY = 6 / Math.max(6, d.coinsText.text.length);
	var c = GEMIOLI.Utils.getInt("score", 0);
	if (a) {
		d.score = c + 1
	}
	if (d.score > c) {
		GEMIOLI.Utils.setInt("score", d.score);
		d.medal.visible = true;
		d.medalSound = true;
		d.panelSound = false
	} else {
		d.medal.visible = false;
		d.medalSound = false
	}
	if (d.score === 0) {
		d.countSound = false
	}
	d.time = 1;
	d.shopAttract = 0;
	for (var b = 0; b < GEMIOLI.Play.playerTypes.length; ++b) {
		if (GEMIOLI.Utils.getBool("skin" + b.toString(), false) || (b === 0)) {
			continue
		} else {
			if (GEMIOLI.Play.playerTypes[b].cost <= GEMIOLI.Utils.getInt("coins", 0)) {
				d.shopAttract = b
			}
		}
	}
	if (SpilData.apiInstance && GameAPI.Score && GameAPI.Score.submit) {
		GameAPI.Score.submit(GEMIOLI.Utils.getInt("highscore", 0))
	}
	d.adsShown = false;
	d.update(0, 0);
	GEMIOLI.SoundLoader.load("open_swish").play()
};
GEMIOLI.Score.prototype.hide = function() {
	var a = this;
	a.showing = false
};
GEMIOLI.Score.prototype.update = function(d, e) {
	var c = this;
	c.time -= d;
	if (c.time < 0) {
		c.time = 0
	}
	d *= 4;
	if (c.showing) {
		if ((c.opacity += d) > 1) {
			c.opacity = 1;
			if (!c.adsShown) {
				if (GameAPI.GameBreak && GameAPI.GameBreak.request) {
					GameAPI.GameBreak.request(SpilData.pauseGame, SpilData.resumeGame)
				}
				c.adsShown = true
			}
		}
	} else {
		if (c.opacity >= 0) {
			if ((c.opacity -= d) <= 0) {
				GEMIOLI.Application.popLayer();
				return
			}
		}
	}
	c.fade.tint.a = c.opacity;
	c.center.x = c.width / 2;
	c.center.y = c.height / 2 + (c.showing ? -c.height / 2 * TWEEN.Easing.Back.In(1 - c.opacity) : c.height / 2 * TWEEN.Easing.Back.In(1 - c.opacity));
	var b = Math.max(c.time - 0.4, 0) / 0.6;
	if (b < 0.7 && c.countSound) {
		GEMIOLI.SoundLoader.load("count").play();
		c.countSound = false
	}
	var g = Math.floor(c.score * (1 - b)).toString();
	c.scoreText.text = "";
	for (var a = 0; a < g.length; ++a) {
		if ((g.length - a) % 3 === 0 && a !== 0) {
			c.scoreText.text += ","
		}
		c.scoreText.text += g[a]
	}
	var f = 1 + 0.1 * Math.abs(Math.sin(b * 10));
	c.scoreText.scaleX = c.scoreText.scaleY = f;
	b = Math.max(Math.min(c.time, 0.5) - 0.3, 0) / 0.2;
	c.medal.y = -540 - c.height / 2 * TWEEN.Easing.Back.In(b);
	c.medal.scaleX = c.medal.scaleY = 1 + 0.2 * TWEEN.Easing.Back.Out(b);
	if (c.medal.visible && c.medalSound && b <= 0.5) {
		c.medalSound = false;
		GEMIOLI.SoundLoader.load("medal").play()
	}
	b = Math.max(Math.min(c.time, 0.4) - 0.2, 0) / 0.2;
	c.center.scaleX = c.center.scaleY = 1 + 0.1 * Math.sin(b * Math.PI);
	if (b <= 0.3 && c.panelSound) {
		GEMIOLI.SoundLoader.load("runR_wood").play();
		c.panelSound = false
	}
	c.shop.scaleX = c.shop.scaleY = 1 + (c.shopAttract !== 0 ? 0.1 * Math.abs(Math.sin(10 * e)) : 0)
};
GEMIOLI.Shop = function() {
	GEMIOLI.Layer.call(this);
	var a = this;
	a.fade = GEMIOLI.AtlasQuad.fromRect(0, 0, 0, 0, "atlases/shop.atlas", "fade");
	a.addChild(this.fade);
	a.opacity = 0;
	a.center = new GEMIOLI.DisplayObjectContainer();
	a.addChild(a.center);
	a.fade.addEventListener("pointerdown", function(b) {
		if (!a.showing || GEMIOLI.Button.inFocus) {
			return
		}
		a.hide()
	});
	a.back = GEMIOLI.AtlasQuad.fromRect(-585, -773, 1171, 1546, "atlases/shop.atlas", "back");
	a.back.addEventListener("pointerdown", function(b) {
		if (a.back.isUnderPoint(b.x, b.y)) {
			b.cancelled = true
		}
	});
	a.center.addChild(a.back);
	a.close = new GEMIOLI.Button(-139, -138, 278, 277, [32, 13, 27]);
	a.close.x = 330;
	a.close.y = 530;
	a.close.addChild(GEMIOLI.AtlasQuad.fromRect(-139, -138, 278, 277, "atlases/shop.atlas", "close"));
	a.center.addChild(a.close);
	a.close.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		a.hide()
	});
	a.buy = new GEMIOLI.Button(-296, -137, 593, 274, []);
	a.buy.x = -170;
	a.buy.y = 530;
	a.center.addChild(a.buy);
	a.buyActive = GEMIOLI.AtlasQuad.fromRect(-296, -137, 593, 274, "atlases/shop.atlas", "active");
	a.buy.addChild(a.buyActive);
	a.buySelected = GEMIOLI.AtlasQuad.fromRect(-296, -137, 593, 274, "atlases/shop.atlas", "selected");
	a.buy.addChild(a.buySelected);
	a.buySelect = GEMIOLI.AtlasQuad.fromRect(-296, -137, 593, 274, "atlases/shop.atlas", "select");
	a.buy.addChild(a.buySelect);
	a.buyLabel = new GEMIOLI.DisplayObjectContainer();
	a.buy.addChild(a.buyLabel);
	a.buyText = GEMIOLI.Text.fromAtlas(75, "fonts/shop/cost.fnt", "atlases/shop.atlas", GEMIOLI.Text.LEFT_ALIGN, GEMIOLI.Text.LEFT_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	a.buyText.y = 10;
	a.buyText.text = "99999";
	a.buyText.offset = -15;
	a.buyLabel.addChild(a.buyText);
	a.buyCoin = GEMIOLI.AtlasQuad.fromRect(0, -75, 118, 151, "atlases/shop.atlas", "coin");
	a.buyLabel.addChild(a.buyCoin);
	a.buy.addEventListener("click", async function(d) {
		var c = this;
		if (!a.showing || c.bstate === GEMIOLI.Button.STATE_DISABLED) {
			if (a.showing && c.bstate === GEMIOLI.Button.STATE_DISABLED) {
				GEMIOLI.SoundLoader.load("button").play()
			}
			return
		}

		// 如果已拥有皮肤或是默认皮肤，直接选择
		if (GEMIOLI.Utils.getBool("skin" + a.currentType.toString(), false) || a.currentType === 0) {
			GEMIOLI.Play.playerType = a.currentType;
			GEMIOLI.Utils.setInt("skin", GEMIOLI.Play.playerType);
			GEMIOLI.SoundLoader.load("button").play();
			if (!GEMIOLI.Score.showing) {
				GEMIOLI.Play.scene3D.remove(GEMIOLI.Play.player);
				var b = GEMIOLI.Play.objectFromPool(GEMIOLI.Play.playerTypes[GEMIOLI.Play.playerType].id);
				b.position.set(0, 0, 0);
				GEMIOLI.Play.scene3D.add(b)
			}
		} else {
			// 购买新皮肤
			try {
				// 禁用购买按钮，防止重复点击
				c.setState(GEMIOLI.Button.STATE_DISABLED);

				// 从API获取最新的金币余额
				const walletAddress = WalletManager.getAccount();
				console.log('从API获取最新金币余额...');
				const currentCoins = await ApiService.getCoins(walletAddress);
				console.log('当前金币余额:', currentCoins);

				// 检查金币是否足够
				const cost = a.playerTypes[a.currentType].cost;
				if (currentCoins < cost) {
					console.log('金币不足，无法购买');
					GEMIOLI.SoundLoader.load("button").play();
					c.setState(GEMIOLI.Button.STATE_NORMAL);
					return;
				}

				// 通过API扣除金币
				console.log('购买皮肤，扣除金币:', cost);
				const newCoins = await ApiService.updateCoins(walletAddress, cost, 'subtract', 'purchase');

				if (newCoins !== null) {
					// 购买成功
					GEMIOLI.Utils.setBool("skin" + a.currentType.toString(), true);
					GEMIOLI.Play.playerType = a.currentType;
					GEMIOLI.Utils.setInt("skin", GEMIOLI.Play.playerType);
					GEMIOLI.SoundLoader.load("buy").play();

					if (!GEMIOLI.Score.showing) {
						GEMIOLI.Play.scene3D.remove(GEMIOLI.Play.player);
						var b = GEMIOLI.Play.objectFromPool(GEMIOLI.Play.playerTypes[GEMIOLI.Play.playerType].id);
						b.position.set(0, 0, 0);
						GEMIOLI.Play.scene3D.add(b)
					}

					console.log('购买成功，剩余金币:', newCoins);
				} else {
					// API调用失败
					console.error('购买失败，API调用出错');
					GEMIOLI.SoundLoader.load("button").play();
				}
			} catch (error) {
				console.error('购买过程中出错:', error);
				GEMIOLI.SoundLoader.load("button").play();
			} finally {
				// 恢复按钮状态
				c.setState(GEMIOLI.Button.STATE_NORMAL);
			}
		}

		// 更新商店界面数据
		a.updateData();

		if (!GEMIOLI.Score.showing) {
			a.hide()
		}
	});
	a.nameText = GEMIOLI.Text.fromAtlas(75, "fonts/shop/name.fnt", "atlases/shop.atlas", GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	a.nameText.x = 0;
	a.nameText.y = 290;
	a.nameText.offset = -15;
	a.nameText.text = "Professor Jones";
	a.center.addChild(a.nameText);
	a.next = new GEMIOLI.Button(-80, -129, 160, 258, [39]);
	a.next.x = 410;
	a.next.y = -100;
	a.next.addChild(GEMIOLI.AtlasQuad.fromRect(-80, -129, 160, 258, "atlases/shop.atlas", "next"));
	a.center.addChild(a.next);
	a.next.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		if (++a.currentType >= a.playerTypes.length) {
			a.currentType = 0
		}
		a.updateData()
	});
	a.previous = new GEMIOLI.Button(-80, -129, 160, 258, [37]);
	a.previous.x = -410;
	a.previous.y = -100;
	a.previous.addChild(GEMIOLI.AtlasQuad.fromRect(-80, -129, 160, 258, "atlases/shop.atlas", "previous"));
	a.center.addChild(a.previous);
	a.previous.addEventListener("click", function(b) {
		if (!a.showing) {
			return
		}
		GEMIOLI.SoundLoader.load("button").play();
		if (--a.currentType < 0) {
			a.currentType = a.playerTypes.length - 1
		}
		a.updateData()
	});
	a.coinsText = GEMIOLI.Text.fromAtlas(60, "fonts/shop/count.fnt", "atlases/shop.atlas", GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN, GEMIOLI.Text.CENTER_ALIGN);
	a.coinsText.x = 380;
	a.coinsText.y = -654;
	a.coinsText.offset = -15;
	a.coinsText.text = "9999";
	a.center.addChild(a.coinsText);
	a.scene3D = new THREE.Object3D();
	a.camera3D = new THREE.PerspectiveCamera(50, GEMIOLI.Application.innerWidth / GEMIOLI.Application.innerHeight, 10, 5000);
	a.camera3D.position.set(332, 34, 0);
	a.camera3D.lookAt(new THREE.Vector3(0, 12, 0));
	a.playerTypes = [];
	GEMIOLI.AtlasLoader.load("atlases/models.atlas", function(b) {
		GEMIOLI.ModelBatchLoader.load("models/models.js", b, function(h) {
			for (var e in h.models) {
				var d = null,
					g = GEMIOLI.Play.playerTypes,
					f = 0,
					c = g.length;
				for (; f < c; ++f) {
					if (e === g[f].id) {
						break
					}
				}
				if (f === c) {
					continue
				}
				if (!h.models[e].geometry.bones) {
					h.models[e].geometry.bones = h.models["models/GGCowboy.js"].geometry.bones;
					h.models[e].geometry.animation = h.models["models/GGCowboy.js"].geometry.animation
				}
				d = new THREE.SkinnedMesh(h.models[e].geometry, new THREE.MeshBasicMaterial({
					skinning: true,
					map: h.models[e].material.map
				}), false);
				d.tempAnimation = new GEMIOLI.Animation(d, h.models[e].geometry.animation);
				d.tempAnimation.play(0, 1);
				d.tempAnimationController = new GEMIOLI.AnimationController(d.tempAnimation, {
					idle: {
						start: 236,
						end: 275
					},
					hi: {
						start: 277,
						end: 317
					}
				});
				d.cost = g[f].cost;
				d.name = g[f].name;
				d.position.x = 100;
				d.scale.set(0.45, 0.45, 0.45);
				d.tempAnimationController.play("idle", false);
				d.tempAnimationController.update(0);
				d.idleTime = Math.random() * 5 + 2;
				a.playerTypes[f] = d
			}
		}, function(c) {
			console.log("Shop can't load models", c)
		})
	}, function(b) {
		console.log("Shop can't load models atlas", b)
	})
};
GEMIOLI.Shop.prototype = Object.create(GEMIOLI.Layer.prototype);
GEMIOLI.Shop.prototype.resize = function() {
	var b = this;
	GEMIOLI.Layer.prototype.resize.call(b);
	GEMIOLI.Layer.prototype.resize.call(b);
	var a = b.camera3D;
	a.aspect = GEMIOLI.Application.innerWidth / GEMIOLI.Application.innerHeight;
	a.zoom = 1 / Math.max(1, b.height / GEMIOLI.Application.HEIGHT);
	a.updateProjectionMatrix();
	b.fade.setRectangle(0, 0, b.width, b.height);
	b.center.x = b.width / 2;
	b.center.y = b.height / 2
};
GEMIOLI.Shop.prototype.show = async function(a) {
	var b = this;
	GEMIOLI.Application.pushLayer(GEMIOLI.Shop);
	b.opacity = 0;
	b.showing = true;
	b.currentType = a || GEMIOLI.Play.playerType;

	// 异步更新数据
	try {
		await b.updateData();
	} catch (error) {
		console.error('更新商店数据出错:', error);
	}

	b.update(0, 0);
	GEMIOLI.SoundLoader.load("open_swish").play()
};
GEMIOLI.Shop.prototype.hide = function() {
	this.showing = false;
	GEMIOLI.SoundLoader.load("close_swish").play()
};
GEMIOLI.Shop.prototype.update = function(d, e) {
	var c = this;
	d *= 4;
	if (c.showing) {
		if ((c.opacity += d) > 1) {
			c.opacity = 1
		}
	} else {
		if (c.opacity >= 0) {
			if ((c.opacity -= d) <= 0) {
				GEMIOLI.Application.popLayer();
				return
			}
		}
	}
	c.fade.tint.a = c.opacity;
	c.center.x = c.width / 2;
	c.center.y = c.height / 2 + (c.showing ? -c.height / 2 * TWEEN.Easing.Back.In(1 - c.opacity) : c.height / 2 * TWEEN.Easing.Back.In(1 - c.opacity));
	for (var b = 0; b < c.playerTypes.length; ++b) {
		var a = c.playerTypes[b];
		if (a.visible) {
			if ((a.idleTime -= d / 4) <= 0 && !a.tempAnimationController.isPlaying()) {
				a.idleTime = Math.random() * 5 + 10;
				a.tempAnimationController.play("hi", false)
			}
			if (a.tempAnimationController.animationId === "hi" && a.tempAnimationController.isPlaying()) {} else {
				if (a.tempAnimationController.animationId !== "idle" || !a.tempAnimationController.isPlaying()) {
					a.tempAnimationController.play("idle", false)
				}
			}
			a.tempAnimationController.update(d / 4);
			a.updateMatrixWorld(true)
		}
	}
	c.viewportOffset = (c.center.y - c.height / 2) * c.scaleY
};
GEMIOLI.Shop.prototype.updateData = async function() {
	var c = this;

	// 从API获取最新的金币余额
	let a = 0;
	try {
		if (WalletManager.isConnected()) {
			const walletAddress = WalletManager.getAccount();
			console.log('更新商店数据，从API获取最新金币余额...');
			a = await ApiService.getCoins(walletAddress);
			console.log('当前金币余额:', a);
		} else {
			a = GEMIOLI.Utils.getInt("coins", 0);
			console.log('钱包未连接，使用本地金币余额:', a);
		}
	} catch (error) {
		console.error('获取金币余额出错，使用本地数据:', error);
		a = GEMIOLI.Utils.getInt("coins", 0);
	}

	// 更新金币显示
	c.coinsText.text = a.toString();
	c.coinsText.scaleX = c.coinsText.scaleY = 4 / Math.max(4, c.coinsText.text.length);

	// 更新角色显示
	for (var b = 0; b < c.playerTypes.length; ++b) {
		var d = c.playerTypes[b];
		d.visible = (c.currentType === b);
		if (d.visible) {
			d.tempAnimationController.play("idle", false);
			d.idleTime = Math.random() + 2;
			c.scene3D.add(d);
			if (GEMIOLI.Utils.getBool("skin" + b.toString(), false) || c.currentType === 0) {
				if (b === GEMIOLI.Play.playerType) {
					c.buyActive.visible = c.buySelect.visible = c.buyLabel.visible = false;
					c.buySelected.visible = true;
					c.buy.setState(GEMIOLI.Button.STATE_DISABLED)
				} else {
					c.buyActive.visible = c.buySelected.visible = c.buyLabel.visible = false;
					c.buySelect.visible = true;
					c.buy.setState(GEMIOLI.Button.STATE_NORMAL)
				}
			} else {
				c.buySelect.visible = c.buySelected.visible = false;
				c.buyLabel.visible = true;
				c.buyText.text = d.cost.toString();
				c.buyText.layout();
				c.buyLabel.x = -(c.buyText.textWidth + 118) / 2;
				c.buyCoin.x = c.buyText.textWidth;
				c.buyActive.visible = true;
				if (d.cost > a) {
					c.buyText.tint.set(1, 0, 0, 1);
					c.buy.setState(GEMIOLI.Button.STATE_DISABLED)
				} else {
					c.buyText.tint.set(223 / 255, 254 / 255, 249 / 255, 1);
					c.buy.setState(GEMIOLI.Button.STATE_NORMAL)
				}
			}
			c.nameText.text = d.name;
			c.nameText.scaleX = c.nameText.scaleY = 12 / Math.max(12, c.nameText.text.length)
		} else {
			if (d.parent) {
				c.scene3D.remove(d)
			}
		}
	}
};
GEMIOLI.Shop.prototype.render = function() {
	var a = this;
	GEMIOLI.Layer.prototype.render.call(a);
	GEMIOLI.Renderer.setViewport(0, -a.viewportOffset, GEMIOLI.Application.innerWidth, GEMIOLI.Application.innerHeight);
	GEMIOLI.Renderer.render(a.scene3D, a.camera3D);
	GEMIOLI.Renderer.setViewport(0, 0, GEMIOLI.Application.innerWidth, GEMIOLI.Application.innerHeight)
};
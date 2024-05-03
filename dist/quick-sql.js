function W(u) {
  return u == null ? u : u.toUpperCase().endsWith("IES") ? u.substring(0, u.length - 3) + "y" : u.toUpperCase().endsWith("ES") || u.toUpperCase().endsWith("S") ? u.substring(0, u.length - 1) : u;
}
function be(u, m) {
  let D = '"';
  if (u == null)
    return null;
  let R = !1;
  const k = "$#_ ";
  if (!u.startsWith(D) && !R) {
    const N = u;
    if (N.length > 0 && "0" <= N[0] && N[0] <= "9")
      R = !0;
    else
      for (let v = 0; v < N.length; v++) {
        const g = N[v];
        if (!("a" <= g && g <= "z") && !("A" <= g && g <= "Z") && !("0" <= g && g <= "9") && !(0 <= k.indexOf(g))) {
          R = !0;
          break;
        }
      }
  }
  return (u.startsWith("_") || u.startsWith("$") || u.startsWith("#")) && (R = !0), R || (D = ""), D + u + D;
}
function Q(u) {
  if (u == null)
    return null;
  if (u.indexOf('"') == 0)
    return u;
  let m = be(u);
  return m.indexOf('"') == 0 || (m = m.replace(/ /g, "_")), m;
}
function K(u, m, D) {
  let R = !1;
  D == null && (D = ""), u.indexOf('"') == 0 && (R = !0, u = u.substring(1, u.length - 1)), m.indexOf('"') == 0 && (R = !0, m = m.substring(1, m.length - 1)), D.indexOf('"') == 0 && (R = !0, D = D.substring(1, D.length - 1));
  let k = u + m + D;
  return R ? k = '"' + k + '"' : k = k.toLowerCase(), k;
}
function pe(u) {
  return u.length < 2 ? null : parseInt(u.substring(0, 2));
}
var le = function() {
  var u = [
    "Sales",
    "Finance",
    "Delivery",
    "Manufacturing",
    "Engineer",
    "Consultant",
    "Architect",
    "Manager",
    "Analyst",
    "Specialist",
    "Evangelist",
    "Salesman"
  ], m = [
    "\u300C\u8CA9\u58F2\u300D",
    "\u300C\u8CA1\u52D9\u300D",
    "\u300C\u914D\u9001\u300D",
    "\u300C\u88FD\u9020\u300D",
    "\u300C\u30A8\u30F3\u30B8\u30CB\u30A2\u300D",
    "\u300C\u30B3\u30F3\u30B5\u30EB\u30BF\u30F3\u30C8\u300D",
    "\u300C\u30A2\u30FC\u30AD\u30C6\u30AF\u30C8\u300D",
    "\u300C\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC\u300D",
    "\u300C\u30A2\u30CA\u30EA\u30B9\u30C8\u300D",
    "\u300C\u30B9\u30DA\u30B7\u30E3\u30EA\u30B9\u30C8\u300D",
    "\u300C\u30A8\u30D0\u30F3\u30B8\u30A7\u30EA\u30B9\u30C8\u300D"
  ], D = [
    "\uC601\uC5C5",
    "\uAE08\uC735",
    "\uBC30\uC1A1",
    "\uC81C\uC870",
    "\uC5D4\uC9C0\uB2C8\uC5B4",
    "\uCEE8\uC124\uD134\uD2B8",
    "\uAC74\uCD95\uAC00",
    "\uAD00\uB9AC\uC790",
    "\uBD84\uC11D\uAC00",
    "\uC804\uBB38\uAC00",
    "\uC804\uB3C4\uC790",
    "\uD310\uB9E4\uC6D0"
  ];
  function R(k, N) {
    if (typeof N != "string" || k.substring(0, 2).toLowerCase() == "en")
      return N;
    N.indexOf("'") == 0 && (N = N.substring(1, N.length - 1));
    for (var v = -1, g = 0; g < u.length; g++)
      if (u[g] == N) {
        v = g;
        break;
      }
    return 0 <= v && k.substring(0, 2).toLowerCase() == "jp" && v < m.length ? "'" + m[v] + "'" : 0 <= v && k.substring(0, 2).toLowerCase() == "kr" && v < D.length ? "'" + D[v] + "'" : N;
  }
  return R;
}();
function ge(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var ie = { exports: {} };
(function(u, m) {
  (function() {
    var D = 9007199254740992, R = -D, k = "0123456789", N = "abcdefghijklmnopqrstuvwxyz", v = N.toUpperCase(), g = k + "abcdef";
    function S(e) {
      this.name = "UnsupportedError", this.message = e || "This feature is not supported on this platform";
    }
    S.prototype = new Error(), S.prototype.constructor = S;
    var E = Array.prototype.slice;
    function i(e) {
      if (!(this instanceof i))
        return e || (e = null), e === null ? new i() : new i(e);
      if (typeof e == "function")
        return this.random = e, this;
      arguments.length && (this.seed = 0);
      for (var a = 0; a < arguments.length; a++) {
        var n = 0;
        if (Object.prototype.toString.call(arguments[a]) === "[object String]")
          for (var c = 0; c < arguments[a].length; c++) {
            for (var h = 0, f = 0; f < arguments[a].length; f++)
              h = arguments[a].charCodeAt(f) + (h << 6) + (h << 16) - h;
            n += h;
          }
        else
          n = arguments[a];
        this.seed += (arguments.length - a) * n;
      }
      return this.mt = this.mersenne_twister(this.seed), this.bimd5 = this.blueimp_md5(), this.random = function() {
        return this.mt.random(this.seed);
      }, this;
    }
    i.prototype.VERSION = "1.1.11";
    function l(e, a) {
      if (e = e || {}, a)
        for (var n in a)
          typeof e[n] > "u" && (e[n] = a[n]);
      return e;
    }
    function p(e) {
      return Array.apply(null, Array(e)).map(function(a, n) {
        return n;
      });
    }
    function r(e, a) {
      if (e)
        throw new RangeError(a);
    }
    var t = function() {
      throw new Error("No Base64 encoder available.");
    };
    (function() {
      typeof btoa == "function" ? t = btoa : typeof Buffer == "function" && (t = function(a) {
        return new Buffer(a).toString("base64");
      });
    })(), i.prototype.bool = function(e) {
      return e = l(e, { likelihood: 50 }), r(
        e.likelihood < 0 || e.likelihood > 100,
        "Chance: Likelihood accepts values from 0 to 100."
      ), this.random() * 100 < e.likelihood;
    }, i.prototype.falsy = function(e) {
      e = l(e, { pool: [!1, null, 0, NaN, "", void 0] });
      var a = e.pool, n = this.integer({ min: 0, max: a.length - 1 }), c = a[n];
      return c;
    }, i.prototype.animal = function(e) {
      if (e = l(e), typeof e.type < "u")
        return r(
          !this.get("animals")[e.type.toLowerCase()],
          "Please pick from desert, ocean, grassland, forest, zoo, pets, farm."
        ), this.pick(this.get("animals")[e.type.toLowerCase()]);
      var a = ["desert", "forest", "ocean", "zoo", "farm", "pet", "grassland"];
      return this.pick(this.get("animals")[this.pick(a)]);
    }, i.prototype.character = function(e) {
      e = l(e);
      var a = "!@#$%^&*()[]", n, c;
      return e.casing === "lower" ? n = N : e.casing === "upper" ? n = v : n = N + v, e.pool ? c = e.pool : (c = "", e.alpha && (c += n), e.numeric && (c += k), e.symbols && (c += a), c || (c = n + k + a)), c.charAt(this.natural({ max: c.length - 1 }));
    }, i.prototype.floating = function(e) {
      e = l(e, { fixed: 4 }), r(
        e.fixed && e.precision,
        "Chance: Cannot specify both fixed and precision."
      );
      var a, n = Math.pow(10, e.fixed), c = D / n, h = -c;
      r(
        e.min && e.fixed && e.min < h,
        "Chance: Min specified is out of range with fixed. Min should be, at least, " + h
      ), r(
        e.max && e.fixed && e.max > c,
        "Chance: Max specified is out of range with fixed. Max should be, at most, " + c
      ), e = l(e, { min: h, max: c }), a = this.integer({ min: e.min * n, max: e.max * n });
      var f = (a / n).toFixed(e.fixed);
      return parseFloat(f);
    }, i.prototype.integer = function(e) {
      return e = l(e, { min: R, max: D }), r(e.min > e.max, "Chance: Min cannot be greater than Max."), Math.floor(this.random() * (e.max - e.min + 1) + e.min);
    }, i.prototype.natural = function(e) {
      if (e = l(e, { min: 0, max: D }), typeof e.numerals == "number" && (r(e.numerals < 1, "Chance: Numerals cannot be less than one."), e.min = Math.pow(10, e.numerals - 1), e.max = Math.pow(10, e.numerals) - 1), r(e.min < 0, "Chance: Min cannot be less than zero."), e.exclude) {
        r(!Array.isArray(e.exclude), "Chance: exclude must be an array.");
        for (var a in e.exclude)
          r(!Number.isInteger(e.exclude[a]), "Chance: exclude must be numbers.");
        var n = e.min + this.natural({ max: e.max - e.min - e.exclude.length }), c = e.exclude.sort();
        for (var h in c) {
          if (n < c[h])
            break;
          n++;
        }
        return n;
      }
      return this.integer(e);
    }, i.prototype.prime = function(e) {
      e = l(e, { min: 0, max: 1e4 }), r(e.min < 0, "Chance: Min cannot be less than zero."), r(e.min > e.max, "Chance: Min cannot be greater than Max.");
      var a = I.primes[I.primes.length - 1];
      if (e.max > a)
        for (var n = a + 2; n <= e.max; ++n)
          this.is_prime(n) && I.primes.push(n);
      var c = I.primes.filter(function(h) {
        return h >= e.min && h <= e.max;
      });
      return this.pick(c);
    }, i.prototype.is_prime = function(e) {
      if (e % 1 || e < 2)
        return !1;
      if (e % 2 === 0)
        return e === 2;
      if (e % 3 === 0)
        return e === 3;
      for (var a = Math.sqrt(e), n = 5; n <= a; n += 6)
        if (e % n === 0 || e % (n + 2) === 0)
          return !1;
      return !0;
    }, i.prototype.hex = function(e) {
      e = l(e, { min: 0, max: D, casing: "lower" }), r(e.min < 0, "Chance: Min cannot be less than zero.");
      var a = this.natural({ min: e.min, max: e.max });
      return e.casing === "upper" ? a.toString(16).toUpperCase() : a.toString(16);
    }, i.prototype.letter = function(e) {
      e = l(e, { casing: "lower" });
      var a = "abcdefghijklmnopqrstuvwxyz", n = this.character({ pool: a });
      return e.casing === "upper" && (n = n.toUpperCase()), n;
    }, i.prototype.string = function(e) {
      e = l(e, { min: 5, max: 20 }), e.length !== 0 && !e.length && (e.length = this.natural({ min: e.min, max: e.max })), r(e.length < 0, "Chance: Length cannot be less than zero.");
      var a = e.length, n = this.n(this.character, a, e);
      return n.join("");
    };
    function o(e) {
      this.c = e;
    }
    o.prototype = {
      substitute: function() {
        return this.c;
      }
    };
    function s(e) {
      this.c = e;
    }
    s.prototype = {
      substitute: function() {
        if (!/[{}\\]/.test(this.c))
          throw new Error('Invalid escape sequence: "\\' + this.c + '".');
        return this.c;
      }
    };
    function M(e) {
      this.c = e;
    }
    M.prototype = {
      replacers: {
        "#": function(e) {
          return e.character({ pool: k });
        },
        A: function(e) {
          return e.character({ pool: v });
        },
        a: function(e) {
          return e.character({ pool: N });
        }
      },
      substitute: function(e) {
        var a = this.replacers[this.c];
        if (!a)
          throw new Error('Invalid replacement character: "' + this.c + '".');
        return a(e);
      }
    };
    function d(e) {
      for (var a = [], n = "identity", c = 0; c < e.length; c++) {
        var h = e[c];
        switch (n) {
          case "escape":
            a.push(new s(h)), n = "identity";
            break;
          case "identity":
            h === "{" ? n = "replace" : h === "\\" ? n = "escape" : a.push(new o(h));
            break;
          case "replace":
            h === "}" ? n = "identity" : a.push(new M(h));
            break;
        }
      }
      return a;
    }
    i.prototype.template = function(e) {
      if (!e)
        throw new Error("Template string is required");
      var a = this;
      return d(e).map(function(n) {
        return n.substitute(a);
      }).join("");
    }, i.prototype.buffer = function(e) {
      if (typeof Buffer > "u")
        throw new S("Sorry, the buffer() function is not supported on your platform");
      e = l(e, { length: this.natural({ min: 5, max: 20 }) }), r(e.length < 0, "Chance: Length cannot be less than zero.");
      var a = e.length, n = this.n(this.character, a, e);
      return Buffer.from(n);
    }, i.prototype.capitalize = function(e) {
      return e.charAt(0).toUpperCase() + e.substr(1);
    }, i.prototype.mixin = function(e) {
      for (var a in e)
        this[a] = e[a];
      return this;
    }, i.prototype.unique = function(e, a, n) {
      r(
        typeof e != "function",
        "Chance: The first argument must be a function."
      );
      var c = function(T, H) {
        return T.indexOf(H) !== -1;
      };
      n && (c = n.comparator || c);
      for (var h = [], f = 0, B, b = a * 50, A = E.call(arguments, 2); h.length < a; ) {
        var y = JSON.parse(JSON.stringify(A));
        if (B = e.apply(this, y), c(h, B) || (h.push(B), f = 0), ++f > b)
          throw new RangeError("Chance: num is likely too large for sample set");
      }
      return h;
    }, i.prototype.n = function(e, a) {
      r(
        typeof e != "function",
        "Chance: The first argument must be a function."
      ), typeof a > "u" && (a = 1);
      var n = a, c = [], h = E.call(arguments, 2);
      for (n = Math.max(0, n), null; n--; null)
        c.push(e.apply(this, h));
      return c;
    }, i.prototype.pad = function(e, a, n) {
      return n = n || "0", e = e + "", e.length >= a ? e : new Array(a - e.length + 1).join(n) + e;
    }, i.prototype.pick = function(e, a) {
      if (e.length === 0)
        throw new RangeError("Chance: Cannot pick() from an empty array");
      return !a || a === 1 ? e[this.natural({ max: e.length - 1 })] : this.shuffle(e).slice(0, a);
    }, i.prototype.pickone = function(e) {
      if (e.length === 0)
        throw new RangeError("Chance: Cannot pickone() from an empty array");
      return e[this.natural({ max: e.length - 1 })];
    }, i.prototype.pickset = function(e, a) {
      if (a === 0)
        return [];
      if (e.length === 0)
        throw new RangeError("Chance: Cannot pickset() from an empty array");
      if (a < 0)
        throw new RangeError("Chance: Count must be a positive number");
      if (!a || a === 1)
        return [this.pickone(e)];
      var n = e.slice(0), c = n.length;
      return this.n(function() {
        var h = this.natural({ max: --c }), f = n[h];
        return n[h] = n[c], f;
      }, Math.min(c, a));
    }, i.prototype.shuffle = function(e) {
      for (var a = [], n = 0, c = Number(e.length), h = p(c), f = c - 1, B, b = 0; b < c; b++)
        B = this.natural({ max: f }), n = h[B], a[b] = e[n], h[B] = h[f], f -= 1;
      return a;
    }, i.prototype.weighted = function(e, a, n) {
      if (e.length !== a.length)
        throw new RangeError("Chance: Length of array and weights must match");
      for (var c = 0, h, f = 0; f < a.length; ++f) {
        if (h = a[f], isNaN(h))
          throw new RangeError("Chance: All weights must be numbers");
        h > 0 && (c += h);
      }
      if (c === 0)
        throw new RangeError("Chance: No valid entries in array weights");
      var B = this.random() * c, b = 0, A = -1, y;
      for (f = 0; f < a.length; ++f) {
        if (h = a[f], b += h, h > 0) {
          if (B <= b) {
            y = f;
            break;
          }
          A = f;
        }
        f === a.length - 1 && (y = A);
      }
      var T = e[y];
      return n = typeof n > "u" ? !1 : n, n && (e.splice(y, 1), a.splice(y, 1)), T;
    }, i.prototype.paragraph = function(e) {
      e = l(e);
      var a = e.sentences || this.natural({ min: 3, max: 7 }), n = this.n(this.sentence, a), c = e.linebreak === !0 ? `
` : " ";
      return n.join(c);
    }, i.prototype.sentence = function(e) {
      e = l(e);
      var a = e.words || this.natural({ min: 12, max: 18 }), n = e.punctuation, c, h = this.n(this.word, a);
      return c = h.join(" "), c = this.capitalize(c), n !== !1 && !/^[.?;!:]$/.test(n) && (n = "."), n && (c += n), c;
    }, i.prototype.syllable = function(e) {
      e = l(e);
      for (var a = e.length || this.natural({ min: 2, max: 3 }), n = "bcdfghjklmnprstvwz", c = "aeiou", h = n + c, f = "", B, b = 0; b < a; b++)
        b === 0 ? B = this.character({ pool: h }) : n.indexOf(B) === -1 ? B = this.character({ pool: n }) : B = this.character({ pool: c }), f += B;
      return e.capitalize && (f = this.capitalize(f)), f;
    }, i.prototype.word = function(e) {
      e = l(e), r(
        e.syllables && e.length,
        "Chance: Cannot specify both syllables AND length."
      );
      var a = e.syllables || this.natural({ min: 1, max: 3 }), n = "";
      if (e.length) {
        do
          n += this.syllable();
        while (n.length < e.length);
        n = n.substring(0, e.length);
      } else
        for (var c = 0; c < a; c++)
          n += this.syllable();
      return e.capitalize && (n = this.capitalize(n)), n;
    }, i.prototype.age = function(e) {
      e = l(e);
      var a;
      switch (e.type) {
        case "child":
          a = { min: 0, max: 12 };
          break;
        case "teen":
          a = { min: 13, max: 19 };
          break;
        case "adult":
          a = { min: 18, max: 65 };
          break;
        case "senior":
          a = { min: 65, max: 100 };
          break;
        case "all":
          a = { min: 0, max: 100 };
          break;
        default:
          a = { min: 18, max: 65 };
          break;
      }
      return this.natural(a);
    }, i.prototype.birthday = function(e) {
      var a = this.age(e), n = /* @__PURE__ */ new Date(), c = n.getFullYear();
      if (e && e.type) {
        var h = /* @__PURE__ */ new Date(), f = /* @__PURE__ */ new Date();
        h.setFullYear(c - a - 1), f.setFullYear(c - a), e = l(e, {
          min: h,
          max: f
        });
      } else if (e && (e.minAge !== void 0 || e.maxAge !== void 0)) {
        r(e.minAge < 0, "Chance: MinAge cannot be less than zero."), r(e.minAge > e.maxAge, "Chance: MinAge cannot be greater than MaxAge.");
        var B = e.minAge !== void 0 ? e.minAge : 0, b = e.maxAge !== void 0 ? e.maxAge : 100, A = new Date(c - b - 1, n.getMonth(), n.getDate()), y = new Date(c - B, n.getMonth(), n.getDate());
        A.setDate(A.getDate() + 1), y.setDate(y.getDate() + 1), y.setMilliseconds(y.getMilliseconds() - 1), e = l(e, {
          min: A,
          max: y
        });
      } else
        e = l(e, {
          year: c - a
        });
      return this.date(e);
    }, i.prototype.cpf = function(e) {
      e = l(e, {
        formatted: !0
      });
      var a = this.n(this.natural, 9, { max: 9 }), n = a[8] * 2 + a[7] * 3 + a[6] * 4 + a[5] * 5 + a[4] * 6 + a[3] * 7 + a[2] * 8 + a[1] * 9 + a[0] * 10;
      n = 11 - n % 11, n >= 10 && (n = 0);
      var c = n * 2 + a[8] * 3 + a[7] * 4 + a[6] * 5 + a[5] * 6 + a[4] * 7 + a[3] * 8 + a[2] * 9 + a[1] * 10 + a[0] * 11;
      c = 11 - c % 11, c >= 10 && (c = 0);
      var h = "" + a[0] + a[1] + a[2] + "." + a[3] + a[4] + a[5] + "." + a[6] + a[7] + a[8] + "-" + n + c;
      return e.formatted ? h : h.replace(/\D/g, "");
    }, i.prototype.cnpj = function(e) {
      e = l(e, {
        formatted: !0
      });
      var a = this.n(this.natural, 12, { max: 12 }), n = a[11] * 2 + a[10] * 3 + a[9] * 4 + a[8] * 5 + a[7] * 6 + a[6] * 7 + a[5] * 8 + a[4] * 9 + a[3] * 2 + a[2] * 3 + a[1] * 4 + a[0] * 5;
      n = 11 - n % 11, n < 2 && (n = 0);
      var c = n * 2 + a[11] * 3 + a[10] * 4 + a[9] * 5 + a[8] * 6 + a[7] * 7 + a[6] * 8 + a[5] * 9 + a[4] * 2 + a[3] * 3 + a[2] * 4 + a[1] * 5 + a[0] * 6;
      c = 11 - c % 11, c < 2 && (c = 0);
      var h = "" + a[0] + a[1] + "." + a[2] + a[3] + a[4] + "." + a[5] + a[6] + a[7] + "/" + a[8] + a[9] + a[10] + a[11] + "-" + n + c;
      return e.formatted ? h : h.replace(/\D/g, "");
    }, i.prototype.first = function(e) {
      return e = l(e, { gender: this.gender(), nationality: "en" }), this.pick(this.get("firstNames")[e.gender.toLowerCase()][e.nationality.toLowerCase()]);
    }, i.prototype.profession = function(e) {
      return e = l(e), e.rank ? this.pick(["Apprentice ", "Junior ", "Senior ", "Lead "]) + this.pick(this.get("profession")) : this.pick(this.get("profession"));
    }, i.prototype.company = function() {
      return this.pick(this.get("company"));
    }, i.prototype.gender = function(e) {
      return e = l(e, { extraGenders: [] }), this.pick(["Male", "Female"].concat(e.extraGenders));
    }, i.prototype.last = function(e) {
      if (e = l(e, { nationality: "*" }), e.nationality === "*") {
        var a = [], n = this.get("lastNames");
        return Object.keys(n).forEach(function(c) {
          a = a.concat(n[c]);
        }), this.pick(a);
      } else
        return this.pick(this.get("lastNames")[e.nationality.toLowerCase()]);
    }, i.prototype.israelId = function() {
      for (var e = this.string({ pool: "0123456789", length: 8 }), a = 0, n = 0; n < e.length; n++) {
        var c = e[n] * (n / 2 === parseInt(n / 2) ? 1 : 2);
        c = this.pad(c, 2).toString(), c = parseInt(c[0]) + parseInt(c[1]), a = a + c;
      }
      return e = e + (10 - parseInt(a.toString().slice(-1))).toString().slice(-1), e;
    }, i.prototype.mrz = function(e) {
      var a = function(h) {
        var f = "<ABCDEFGHIJKLMNOPQRSTUVWXYXZ".split(""), B = [7, 3, 1], b = 0;
        return typeof h != "string" && (h = h.toString()), h.split("").forEach(function(A, y) {
          var T = f.indexOf(A);
          T !== -1 ? A = T === 0 ? 0 : T + 9 : A = parseInt(A, 10), A *= B[y % B.length], b += A;
        }), b % 10;
      }, n = function(h) {
        var f = function(b) {
          return new Array(b + 1).join("<");
        }, B = [
          "P<",
          h.issuer,
          h.last.toUpperCase(),
          "<<",
          h.first.toUpperCase(),
          f(39 - (h.last.length + h.first.length + 2)),
          h.passportNumber,
          a(h.passportNumber),
          h.nationality,
          h.dob,
          a(h.dob),
          h.gender,
          h.expiry,
          a(h.expiry),
          f(14),
          a(f(14))
        ].join("");
        return B + a(B.substr(44, 10) + B.substr(57, 7) + B.substr(65, 7));
      }, c = this;
      return e = l(e, {
        first: this.first(),
        last: this.last(),
        passportNumber: this.integer({ min: 1e8, max: 999999999 }),
        dob: function() {
          var h = c.birthday({ type: "adult" });
          return [
            h.getFullYear().toString().substr(2),
            c.pad(h.getMonth() + 1, 2),
            c.pad(h.getDate(), 2)
          ].join("");
        }(),
        expiry: function() {
          var h = /* @__PURE__ */ new Date();
          return [
            (h.getFullYear() + 5).toString().substr(2),
            c.pad(h.getMonth() + 1, 2),
            c.pad(h.getDate(), 2)
          ].join("");
        }(),
        gender: this.gender() === "Female" ? "F" : "M",
        issuer: "GBR",
        nationality: "GBR"
      }), n(e);
    }, i.prototype.name = function(e) {
      e = l(e);
      var a = this.first(e), n = this.last(e), c;
      return e.middle ? c = a + " " + this.first(e) + " " + n : e.middle_initial ? c = a + " " + this.character({ alpha: !0, casing: "upper" }) + ". " + n : c = a + " " + n, e.prefix && (c = this.prefix(e) + " " + c), e.suffix && (c = c + " " + this.suffix(e)), c;
    }, i.prototype.name_prefixes = function(e) {
      e = e || "all", e = e.toLowerCase();
      var a = [
        { name: "Doctor", abbreviation: "Dr." }
      ];
      return (e === "male" || e === "all") && a.push({ name: "Mister", abbreviation: "Mr." }), (e === "female" || e === "all") && (a.push({ name: "Miss", abbreviation: "Miss" }), a.push({ name: "Misses", abbreviation: "Mrs." })), a;
    }, i.prototype.prefix = function(e) {
      return this.name_prefix(e);
    }, i.prototype.name_prefix = function(e) {
      return e = l(e, { gender: "all" }), e.full ? this.pick(this.name_prefixes(e.gender)).name : this.pick(this.name_prefixes(e.gender)).abbreviation;
    }, i.prototype.HIDN = function() {
      var e = "0123456789", a = "ABCDEFGHIJKLMNOPQRSTUVWXYXZ", n = "";
      return n += this.string({ pool: e, length: 6 }), n += this.string({ pool: a, length: 2 }), n;
    }, i.prototype.ssn = function(e) {
      e = l(e, { ssnFour: !1, dashes: !0 });
      var a = "1234567890", n, c = e.dashes ? "-" : "";
      return e.ssnFour ? n = this.string({ pool: a, length: 4 }) : n = this.string({ pool: a, length: 3 }) + c + this.string({ pool: a, length: 2 }) + c + this.string({ pool: a, length: 4 }), n;
    }, i.prototype.aadhar = function(e) {
      e = l(e, { onlyLastFour: !1, separatedByWhiteSpace: !0 });
      var a = "1234567890", n, c = e.separatedByWhiteSpace ? " " : "";
      return e.onlyLastFour ? n = this.string({ pool: a, length: 4 }) : n = this.string({ pool: a, length: 4 }) + c + this.string({ pool: a, length: 4 }) + c + this.string({ pool: a, length: 4 }), n;
    }, i.prototype.name_suffixes = function() {
      var e = [
        { name: "Doctor of Osteopathic Medicine", abbreviation: "D.O." },
        { name: "Doctor of Philosophy", abbreviation: "Ph.D." },
        { name: "Esquire", abbreviation: "Esq." },
        { name: "Junior", abbreviation: "Jr." },
        { name: "Juris Doctor", abbreviation: "J.D." },
        { name: "Master of Arts", abbreviation: "M.A." },
        { name: "Master of Business Administration", abbreviation: "M.B.A." },
        { name: "Master of Science", abbreviation: "M.S." },
        { name: "Medical Doctor", abbreviation: "M.D." },
        { name: "Senior", abbreviation: "Sr." },
        { name: "The Third", abbreviation: "III" },
        { name: "The Fourth", abbreviation: "IV" },
        { name: "Bachelor of Engineering", abbreviation: "B.E" },
        { name: "Bachelor of Technology", abbreviation: "B.TECH" }
      ];
      return e;
    }, i.prototype.suffix = function(e) {
      return this.name_suffix(e);
    }, i.prototype.name_suffix = function(e) {
      return e = l(e), e.full ? this.pick(this.name_suffixes()).name : this.pick(this.name_suffixes()).abbreviation;
    }, i.prototype.nationalities = function() {
      return this.get("nationalities");
    }, i.prototype.nationality = function() {
      var e = this.pick(this.nationalities());
      return e.name;
    }, i.prototype.zodiac = function() {
      const e = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
      return this.pickone(e);
    }, i.prototype.android_id = function() {
      return "APA91" + this.string({ pool: "0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_", length: 178 });
    }, i.prototype.apple_token = function() {
      return this.string({ pool: "abcdef1234567890", length: 64 });
    }, i.prototype.wp8_anid2 = function() {
      return t(this.hash({ length: 32 }));
    }, i.prototype.wp7_anid = function() {
      return "A=" + this.guid().replace(/-/g, "").toUpperCase() + "&E=" + this.hash({ length: 3 }) + "&W=" + this.integer({ min: 0, max: 9 });
    }, i.prototype.bb_pin = function() {
      return this.hash({ length: 8 });
    }, i.prototype.avatar = function(e) {
      var a = null, n = "//www.gravatar.com/avatar/", c = {
        http: "http",
        https: "https"
      }, h = {
        bmp: "bmp",
        gif: "gif",
        jpg: "jpg",
        png: "png"
      }, f = {
        404: "404",
        // Return 404 if not found
        mm: "mm",
        // Mystery man
        identicon: "identicon",
        // Geometric pattern based on hash
        monsterid: "monsterid",
        // A generated monster icon
        wavatar: "wavatar",
        // A generated face
        retro: "retro",
        // 8-bit icon
        blank: "blank"
        // A transparent png
      }, B = {
        g: "g",
        pg: "pg",
        r: "r",
        x: "x"
      }, b = {
        protocol: null,
        email: null,
        fileExtension: null,
        size: null,
        fallback: null,
        rating: null
      };
      if (!e)
        b.email = this.email(), e = {};
      else if (typeof e == "string")
        b.email = e, e = {};
      else {
        if (typeof e != "object")
          return null;
        if (e.constructor === "Array")
          return null;
      }
      return b = l(e, b), b.email || (b.email = this.email()), b.protocol = c[b.protocol] ? b.protocol + ":" : "", b.size = parseInt(b.size, 0) ? b.size : "", b.rating = B[b.rating] ? b.rating : "", b.fallback = f[b.fallback] ? b.fallback : "", b.fileExtension = h[b.fileExtension] ? b.fileExtension : "", a = b.protocol + n + this.bimd5.md5(b.email) + (b.fileExtension ? "." + b.fileExtension : "") + (b.size || b.rating || b.fallback ? "?" : "") + (b.size ? "&s=" + b.size.toString() : "") + (b.rating ? "&r=" + b.rating : "") + (b.fallback ? "&d=" + b.fallback : ""), a;
    }, i.prototype.color = function(e) {
      function a(V, $) {
        return [V, V, V].join($ || "");
      }
      function n(V) {
        var $ = V ? "rgba" : "rgb", ee = V ? "," + this.floating({ min: z, max: J }) : "", ae = h ? a(this.natural({ min: f, max: B }), ",") : this.natural({ min: y, max: T }) + "," + this.natural({ min: H, max: _ }) + "," + this.natural({ max: 255 });
        return $ + "(" + ae + ee + ")";
      }
      function c(V, $, ee) {
        var ae = ee ? "#" : "", q = "";
        return h ? (q = a(this.pad(this.hex({ min: f, max: B }), 2)), e.format === "shorthex" && (q = a(this.hex({ min: 0, max: 15 })))) : e.format === "shorthex" ? q = this.pad(this.hex({ min: Math.floor(b / 16), max: Math.floor(A / 16) }), 1) + this.pad(this.hex({ min: Math.floor(y / 16), max: Math.floor(T / 16) }), 1) + this.pad(this.hex({ min: Math.floor(H / 16), max: Math.floor(_ / 16) }), 1) : b !== void 0 || A !== void 0 || y !== void 0 || T !== void 0 || H !== void 0 || _ !== void 0 ? q = this.pad(this.hex({ min: b, max: A }), 2) + this.pad(this.hex({ min: y, max: T }), 2) + this.pad(this.hex({ min: H, max: _ }), 2) : q = this.pad(this.hex({ min: f, max: B }), 2) + this.pad(this.hex({ min: f, max: B }), 2) + this.pad(this.hex({ min: f, max: B }), 2), ae + q;
      }
      e = l(e, {
        format: this.pick(["hex", "shorthex", "rgb", "rgba", "0x", "name"]),
        grayscale: !1,
        casing: "lower",
        min: 0,
        max: 255,
        min_red: void 0,
        max_red: void 0,
        min_green: void 0,
        max_green: void 0,
        min_blue: void 0,
        max_blue: void 0,
        min_alpha: 0,
        max_alpha: 1
      });
      var h = e.grayscale, f = e.min, B = e.max, b = e.min_red, A = e.max_red, y = e.min_green, T = e.max_green, H = e.min_blue, _ = e.max_blue, z = e.min_alpha, J = e.max_alpha;
      e.min_red === void 0 && (b = f), e.max_red === void 0 && (A = B), e.min_green === void 0 && (y = f), e.max_green === void 0 && (T = B), e.min_blue === void 0 && (H = f), e.max_blue === void 0 && (_ = B), e.min_alpha === void 0 && (z = 0), e.max_alpha === void 0 && (J = 1), h && f === 0 && B === 255 && b !== void 0 && A !== void 0 && (f = (b + y + H) / 3, B = (A + T + _) / 3);
      var U;
      if (e.format === "hex")
        U = c.call(this, 2, 6, !0);
      else if (e.format === "shorthex")
        U = c.call(this, 1, 3, !0);
      else if (e.format === "rgb")
        U = n.call(this, !1);
      else if (e.format === "rgba")
        U = n.call(this, !0);
      else if (e.format === "0x")
        U = "0x" + c.call(this, 2, 6);
      else {
        if (e.format === "name")
          return this.pick(this.get("colorNames"));
        throw new RangeError('Invalid format provided. Please provide one of "hex", "shorthex", "rgb", "rgba", "0x" or "name".');
      }
      return e.casing === "upper" && (U = U.toUpperCase()), U;
    }, i.prototype.domain = function(e) {
      return e = l(e), this.word() + "." + (e.tld || this.tld());
    }, i.prototype.email = function(e) {
      return e = l(e), this.word({ length: e.length }) + "@" + (e.domain || this.domain());
    }, i.prototype.fbid = function() {
      return "10000" + this.string({ pool: "1234567890", length: 11 });
    }, i.prototype.google_analytics = function() {
      var e = this.pad(this.natural({ max: 999999 }), 6), a = this.pad(this.natural({ max: 99 }), 2);
      return "UA-" + e + "-" + a;
    }, i.prototype.hashtag = function() {
      return "#" + this.word();
    }, i.prototype.ip = function() {
      return this.natural({ min: 1, max: 254 }) + "." + this.natural({ max: 255 }) + "." + this.natural({ max: 255 }) + "." + this.natural({ min: 1, max: 254 });
    }, i.prototype.ipv6 = function() {
      var e = this.n(this.hash, 8, { length: 4 });
      return e.join(":");
    }, i.prototype.klout = function() {
      return this.natural({ min: 1, max: 99 });
    }, i.prototype.mac = function(e) {
      return e = l(e, { delimiter: ":" }), this.pad(this.natural({ max: 255 }).toString(16), 2) + e.delimiter + this.pad(this.natural({ max: 255 }).toString(16), 2) + e.delimiter + this.pad(this.natural({ max: 255 }).toString(16), 2) + e.delimiter + this.pad(this.natural({ max: 255 }).toString(16), 2) + e.delimiter + this.pad(this.natural({ max: 255 }).toString(16), 2) + e.delimiter + this.pad(this.natural({ max: 255 }).toString(16), 2);
    }, i.prototype.semver = function(e) {
      e = l(e, { include_prerelease: !0 });
      var a = this.pickone(["^", "~", "<", ">", "<=", ">=", "="]);
      e.range && (a = e.range);
      var n = "";
      return e.include_prerelease && (n = this.weighted(["", "-dev", "-beta", "-alpha"], [50, 10, 5, 1])), a + this.rpg("3d10").join(".") + n;
    }, i.prototype.tlds = function() {
      return ["com", "org", "edu", "gov", "co.uk", "net", "io", "ac", "ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "su", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "za", "zm", "zw"];
    }, i.prototype.tld = function() {
      return this.pick(this.tlds());
    }, i.prototype.twitter = function() {
      return "@" + this.word();
    }, i.prototype.url = function(e) {
      e = l(e, { protocol: "http", domain: this.domain(e), domain_prefix: "", path: this.word(), extensions: [] });
      var a = e.extensions.length > 0 ? "." + this.pick(e.extensions) : "", n = e.domain_prefix ? e.domain_prefix + "." + e.domain : e.domain;
      return e.protocol + "://" + n + "/" + e.path + a;
    }, i.prototype.port = function() {
      return this.integer({ min: 0, max: 65535 });
    }, i.prototype.locale = function(e) {
      return e = l(e), e.region ? this.pick(this.get("locale_regions")) : this.pick(this.get("locale_languages"));
    }, i.prototype.locales = function(e) {
      return e = l(e), e.region ? this.get("locale_regions") : this.get("locale_languages");
    }, i.prototype.loremPicsum = function(e) {
      e = l(e, { width: 500, height: 500, greyscale: !1, blurred: !1 });
      var a = e.greyscale ? "g/" : "", n = e.blurred ? "/?blur" : "/?random";
      return "https://picsum.photos/" + a + e.width + "/" + e.height + n;
    }, i.prototype.address = function(e) {
      return e = l(e), this.natural({ min: 5, max: 2e3 }) + " " + this.street(e);
    }, i.prototype.altitude = function(e) {
      return e = l(e, { fixed: 5, min: 0, max: 8848 }), this.floating({
        min: e.min,
        max: e.max,
        fixed: e.fixed
      });
    }, i.prototype.areacode = function(e) {
      e = l(e, { parens: !0 });
      var a = e.exampleNumber ? "555" : this.natural({ min: 2, max: 9 }).toString() + this.natural({ min: 0, max: 8 }).toString() + this.natural({ min: 0, max: 9 }).toString();
      return e.parens ? "(" + a + ")" : a;
    }, i.prototype.city = function() {
      return this.capitalize(this.word({ syllables: 3 }));
    }, i.prototype.coordinates = function(e) {
      return this.latitude(e) + ", " + this.longitude(e);
    }, i.prototype.countries = function() {
      return this.get("countries");
    }, i.prototype.country = function(e) {
      e = l(e);
      var a = this.pick(this.countries());
      return e.raw ? a : e.full ? a.name : a.abbreviation;
    }, i.prototype.depth = function(e) {
      return e = l(e, { fixed: 5, min: -10994, max: 0 }), this.floating({
        min: e.min,
        max: e.max,
        fixed: e.fixed
      });
    }, i.prototype.geohash = function(e) {
      return e = l(e, { length: 7 }), this.string({ length: e.length, pool: "0123456789bcdefghjkmnpqrstuvwxyz" });
    }, i.prototype.geojson = function(e) {
      return this.latitude(e) + ", " + this.longitude(e) + ", " + this.altitude(e);
    }, i.prototype.latitude = function(e) {
      var [a, n, c] = ["ddm", "dms", "dd"];
      e = l(
        e,
        e && e.format && [a, n].includes(e.format.toLowerCase()) ? { min: 0, max: 89, fixed: 4 } : { fixed: 5, min: -90, max: 90, format: c }
      );
      var h = e.format.toLowerCase();
      switch ((h === a || h === n) && (r(e.min < 0 || e.min > 89, "Chance: Min specified is out of range. Should be between 0 - 89"), r(e.max < 0 || e.max > 89, "Chance: Max specified is out of range. Should be between 0 - 89"), r(e.fixed > 4, "Chance: Fixed specified should be below or equal to 4")), h) {
        case a:
          return this.integer({ min: e.min, max: e.max }) + "\xB0" + this.floating({ min: 0, max: 59, fixed: e.fixed });
        case n:
          return this.integer({ min: e.min, max: e.max }) + "\xB0" + this.integer({ min: 0, max: 59 }) + "\u2019" + this.floating({ min: 0, max: 59, fixed: e.fixed }) + "\u201D";
        case c:
        default:
          return this.floating({ min: e.min, max: e.max, fixed: e.fixed });
      }
    }, i.prototype.longitude = function(e) {
      var [a, n, c] = ["ddm", "dms", "dd"];
      e = l(
        e,
        e && e.format && [a, n].includes(e.format.toLowerCase()) ? { min: 0, max: 179, fixed: 4 } : { fixed: 5, min: -180, max: 180, format: c }
      );
      var h = e.format.toLowerCase();
      switch ((h === a || h === n) && (r(e.min < 0 || e.min > 179, "Chance: Min specified is out of range. Should be between 0 - 179"), r(e.max < 0 || e.max > 179, "Chance: Max specified is out of range. Should be between 0 - 179"), r(e.fixed > 4, "Chance: Fixed specified should be below or equal to 4")), h) {
        case a:
          return this.integer({ min: e.min, max: e.max }) + "\xB0" + this.floating({ min: 0, max: 59.9999, fixed: e.fixed });
        case n:
          return this.integer({ min: e.min, max: e.max }) + "\xB0" + this.integer({ min: 0, max: 59 }) + "\u2019" + this.floating({ min: 0, max: 59.9999, fixed: e.fixed }) + "\u201D";
        case c:
        default:
          return this.floating({ min: e.min, max: e.max, fixed: e.fixed });
      }
    }, i.prototype.phone = function(e) {
      var a = this, n, c = function(H) {
        var _ = [];
        return H.sections.forEach(function(z) {
          _.push(a.string({ pool: "0123456789", length: z }));
        }), H.area + _.join(" ");
      };
      e = l(e, {
        formatted: !0,
        country: "us",
        mobile: !1,
        exampleNumber: !1
      }), e.formatted || (e.parens = !1);
      var h;
      switch (e.country) {
        case "fr":
          e.mobile ? (n = this.pick(["06", "07"]) + a.string({ pool: "0123456789", length: 8 }), h = e.formatted ? n.match(/../g).join(" ") : n) : (n = this.pick([
            // Valid zone and département codes.
            "01" + this.pick(["30", "34", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "53", "55", "56", "58", "60", "64", "69", "70", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83"]) + a.string({ pool: "0123456789", length: 6 }),
            "02" + this.pick(["14", "18", "22", "23", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "40", "41", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "56", "57", "61", "62", "69", "72", "76", "77", "78", "85", "90", "96", "97", "98", "99"]) + a.string({ pool: "0123456789", length: 6 }),
            "03" + this.pick(["10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "39", "44", "45", "51", "52", "54", "55", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"]) + a.string({ pool: "0123456789", length: 6 }),
            "04" + this.pick(["11", "13", "15", "20", "22", "26", "27", "30", "32", "34", "37", "42", "43", "44", "50", "56", "57", "63", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "88", "89", "90", "91", "92", "93", "94", "95", "97", "98"]) + a.string({ pool: "0123456789", length: 6 }),
            "05" + this.pick(["08", "16", "17", "19", "24", "31", "32", "33", "34", "35", "40", "45", "46", "47", "49", "53", "55", "56", "57", "58", "59", "61", "62", "63", "64", "65", "67", "79", "81", "82", "86", "87", "90", "94"]) + a.string({ pool: "0123456789", length: 6 }),
            "09" + a.string({ pool: "0123456789", length: 8 })
          ]), h = e.formatted ? n.match(/../g).join(" ") : n);
          break;
        case "uk":
          e.mobile ? (n = this.pick([
            { area: "07" + this.pick(["4", "5", "7", "8", "9"]), sections: [2, 6] },
            { area: "07624 ", sections: [6] }
          ]), h = e.formatted ? c(n) : c(n).replace(" ", "")) : (n = this.pick([
            //valid area codes of major cities/counties followed by random numbers in required format.
            { area: "01" + this.character({ pool: "234569" }) + "1 ", sections: [3, 4] },
            { area: "020 " + this.character({ pool: "378" }), sections: [3, 4] },
            { area: "023 " + this.character({ pool: "89" }), sections: [3, 4] },
            { area: "024 7", sections: [3, 4] },
            { area: "028 " + this.pick(["25", "28", "37", "71", "82", "90", "92", "95"]), sections: [2, 4] },
            { area: "012" + this.pick(["04", "08", "54", "76", "97", "98"]) + " ", sections: [6] },
            { area: "013" + this.pick(["63", "64", "84", "86"]) + " ", sections: [6] },
            { area: "014" + this.pick(["04", "20", "60", "61", "80", "88"]) + " ", sections: [6] },
            { area: "015" + this.pick(["24", "27", "62", "66"]) + " ", sections: [6] },
            { area: "016" + this.pick(["06", "29", "35", "47", "59", "95"]) + " ", sections: [6] },
            { area: "017" + this.pick(["26", "44", "50", "68"]) + " ", sections: [6] },
            { area: "018" + this.pick(["27", "37", "84", "97"]) + " ", sections: [6] },
            { area: "019" + this.pick(["00", "05", "35", "46", "49", "63", "95"]) + " ", sections: [6] }
          ]), h = e.formatted ? c(n) : c(n).replace(" ", "", "g"));
          break;
        case "za":
          e.mobile ? (n = this.pick([
            "060" + this.pick(["3", "4", "5", "6", "7", "8", "9"]) + a.string({ pool: "0123456789", length: 6 }),
            "061" + this.pick(["0", "1", "2", "3", "4", "5", "8"]) + a.string({ pool: "0123456789", length: 6 }),
            "06" + a.string({ pool: "0123456789", length: 7 }),
            "071" + this.pick(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) + a.string({ pool: "0123456789", length: 6 }),
            "07" + this.pick(["2", "3", "4", "6", "7", "8", "9"]) + a.string({ pool: "0123456789", length: 7 }),
            "08" + this.pick(["0", "1", "2", "3", "4", "5"]) + a.string({ pool: "0123456789", length: 7 })
          ]), h = e.formatted || n) : (n = this.pick([
            "01" + this.pick(["0", "1", "2", "3", "4", "5", "6", "7", "8"]) + a.string({ pool: "0123456789", length: 7 }),
            "02" + this.pick(["1", "2", "3", "4", "7", "8"]) + a.string({ pool: "0123456789", length: 7 }),
            "03" + this.pick(["1", "2", "3", "5", "6", "9"]) + a.string({ pool: "0123456789", length: 7 }),
            "04" + this.pick(["1", "2", "3", "4", "5", "6", "7", "8", "9"]) + a.string({ pool: "0123456789", length: 7 }),
            "05" + this.pick(["1", "3", "4", "6", "7", "8"]) + a.string({ pool: "0123456789", length: 7 })
          ]), h = e.formatted || n);
          break;
        case "us":
          var f = this.areacode(e).toString(), B = this.natural({ min: 2, max: 9 }).toString() + this.natural({ min: 0, max: 9 }).toString() + this.natural({ min: 0, max: 9 }).toString(), b = this.natural({ min: 1e3, max: 9999 }).toString();
          h = e.formatted ? f + " " + B + "-" + b : f + B + b;
          break;
        case "br":
          var A = this.pick(["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"]), y;
          e.mobile ? y = "9" + a.string({ pool: "0123456789", length: 4 }) : y = this.natural({ min: 2e3, max: 5999 }).toString();
          var T = a.string({ pool: "0123456789", length: 4 });
          h = e.formatted ? "(" + A + ") " + y + "-" + T : A + y + T;
          break;
      }
      return h;
    }, i.prototype.postal = function() {
      var e = this.character({ pool: "XVTSRPNKLMHJGECBA" }), a = e + this.natural({ max: 9 }) + this.character({ alpha: !0, casing: "upper" }), n = this.natural({ max: 9 }) + this.character({ alpha: !0, casing: "upper" }) + this.natural({ max: 9 });
      return a + " " + n;
    }, i.prototype.postcode = function() {
      var e = this.pick(this.get("postcodeAreas")).code, a = this.natural({ max: 9 }), n = this.bool() ? this.character({ alpha: !0, casing: "upper" }) : "", c = e + a + n, h = this.natural({ max: 9 }), f = this.character({ alpha: !0, casing: "upper" }) + this.character({ alpha: !0, casing: "upper" }), B = h + f;
      return c + " " + B;
    }, i.prototype.counties = function(e) {
      return e = l(e, { country: "uk" }), this.get("counties")[e.country.toLowerCase()];
    }, i.prototype.county = function(e) {
      return this.pick(this.counties(e)).name;
    }, i.prototype.provinces = function(e) {
      return e = l(e, { country: "ca" }), this.get("provinces")[e.country.toLowerCase()];
    }, i.prototype.province = function(e) {
      return e && e.full ? this.pick(this.provinces(e)).name : this.pick(this.provinces(e)).abbreviation;
    }, i.prototype.state = function(e) {
      return e && e.full ? this.pick(this.states(e)).name : this.pick(this.states(e)).abbreviation;
    }, i.prototype.states = function(e) {
      e = l(e, { country: "us", us_states_and_dc: !0 });
      var a;
      switch (e.country.toLowerCase()) {
        case "us":
          var n = this.get("us_states_and_dc"), c = this.get("territories"), h = this.get("armed_forces");
          a = [], e.us_states_and_dc && (a = a.concat(n)), e.territories && (a = a.concat(c)), e.armed_forces && (a = a.concat(h));
          break;
        case "it":
        case "mx":
          a = this.get("country_regions")[e.country.toLowerCase()];
          break;
        case "uk":
          a = this.get("counties")[e.country.toLowerCase()];
          break;
      }
      return a;
    }, i.prototype.street = function(e) {
      e = l(e, { country: "us", syllables: 2 });
      var a;
      switch (e.country.toLowerCase()) {
        case "us":
          a = this.word({ syllables: e.syllables }), a = this.capitalize(a), a += " ", a += e.short_suffix ? this.street_suffix(e).abbreviation : this.street_suffix(e).name;
          break;
        case "it":
          a = this.word({ syllables: e.syllables }), a = this.capitalize(a), a = (e.short_suffix ? this.street_suffix(e).abbreviation : this.street_suffix(e).name) + " " + a;
          break;
      }
      return a;
    }, i.prototype.street_suffix = function(e) {
      return e = l(e, { country: "us" }), this.pick(this.street_suffixes(e));
    }, i.prototype.street_suffixes = function(e) {
      return e = l(e, { country: "us" }), this.get("street_suffixes")[e.country.toLowerCase()];
    }, i.prototype.zip = function(e) {
      var a = this.n(this.natural, 5, { max: 9 });
      return e && e.plusfour === !0 && (a.push("-"), a = a.concat(this.n(this.natural, 4, { max: 9 }))), a.join("");
    }, i.prototype.ampm = function() {
      return this.bool() ? "am" : "pm";
    }, i.prototype.date = function(e) {
      var a, n;
      if (e && (e.min || e.max)) {
        e = l(e, {
          american: !0,
          string: !1
        });
        var c = typeof e.min < "u" ? e.min.getTime() : 1, h = typeof e.max < "u" ? e.max.getTime() : 864e13;
        n = new Date(this.integer({ min: c, max: h }));
      } else {
        var f = this.month({ raw: !0 }), B = f.days;
        e && e.month && (B = this.get("months")[(e.month % 12 + 12) % 12].days), e = l(e, {
          year: parseInt(this.year(), 10),
          // Necessary to subtract 1 because Date() 0-indexes month but not day or year
          // for some reason.
          month: f.numeric - 1,
          day: this.natural({ min: 1, max: B }),
          hour: this.hour({ twentyfour: !0 }),
          minute: this.minute(),
          second: this.second(),
          millisecond: this.millisecond(),
          american: !0,
          string: !1
        }), n = new Date(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
      }
      return e.american ? a = n.getMonth() + 1 + "/" + n.getDate() + "/" + n.getFullYear() : a = n.getDate() + "/" + (n.getMonth() + 1) + "/" + n.getFullYear(), e.string ? a : n;
    }, i.prototype.hammertime = function(e) {
      return this.date(e).getTime();
    }, i.prototype.hour = function(e) {
      return e = l(e, {
        min: e && e.twentyfour ? 0 : 1,
        max: e && e.twentyfour ? 23 : 12
      }), r(e.min < 0, "Chance: Min cannot be less than 0."), r(e.twentyfour && e.max > 23, "Chance: Max cannot be greater than 23 for twentyfour option."), r(!e.twentyfour && e.max > 12, "Chance: Max cannot be greater than 12."), r(e.min > e.max, "Chance: Min cannot be greater than Max."), this.natural({ min: e.min, max: e.max });
    }, i.prototype.millisecond = function() {
      return this.natural({ max: 999 });
    }, i.prototype.minute = i.prototype.second = function(e) {
      return e = l(e, { min: 0, max: 59 }), r(e.min < 0, "Chance: Min cannot be less than 0."), r(e.max > 59, "Chance: Max cannot be greater than 59."), r(e.min > e.max, "Chance: Min cannot be greater than Max."), this.natural({ min: e.min, max: e.max });
    }, i.prototype.month = function(e) {
      e = l(e, { min: 1, max: 12 }), r(e.min < 1, "Chance: Min cannot be less than 1."), r(e.max > 12, "Chance: Max cannot be greater than 12."), r(e.min > e.max, "Chance: Min cannot be greater than Max.");
      var a = this.pick(this.months().slice(e.min - 1, e.max));
      return e.raw ? a : a.name;
    }, i.prototype.months = function() {
      return this.get("months");
    }, i.prototype.second = function() {
      return this.natural({ max: 59 });
    }, i.prototype.timestamp = function() {
      return this.natural({ min: 1, max: parseInt((/* @__PURE__ */ new Date()).getTime() / 1e3, 10) });
    }, i.prototype.weekday = function(e) {
      e = l(e, { weekday_only: !1 });
      var a = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      return e.weekday_only || (a.push("Saturday"), a.push("Sunday")), this.pickone(a);
    }, i.prototype.year = function(e) {
      return e = l(e, { min: (/* @__PURE__ */ new Date()).getFullYear() }), e.max = typeof e.max < "u" ? e.max : e.min + 100, this.natural(e).toString();
    }, i.prototype.cc = function(e) {
      e = l(e);
      var a, n, c;
      return a = e.type ? this.cc_type({ name: e.type, raw: !0 }) : this.cc_type({ raw: !0 }), n = a.prefix.split(""), c = a.length - a.prefix.length - 1, n = n.concat(this.n(this.integer, c, { min: 0, max: 9 })), n.push(this.luhn_calculate(n.join(""))), n.join("");
    }, i.prototype.cc_types = function() {
      return this.get("cc_types");
    }, i.prototype.cc_type = function(e) {
      e = l(e);
      var a = this.cc_types(), n = null;
      if (e.name) {
        for (var c = 0; c < a.length; c++)
          if (a[c].name === e.name || a[c].short_name === e.name) {
            n = a[c];
            break;
          }
        if (n === null)
          throw new RangeError("Chance: Credit card type '" + e.name + "' is not supported");
      } else
        n = this.pick(a);
      return e.raw ? n : n.name;
    }, i.prototype.currency_types = function() {
      return this.get("currency_types");
    }, i.prototype.currency = function() {
      return this.pick(this.currency_types());
    }, i.prototype.timezones = function() {
      return this.get("timezones");
    }, i.prototype.timezone = function() {
      return this.pick(this.timezones());
    }, i.prototype.currency_pair = function(e) {
      var a = this.unique(this.currency, 2, {
        comparator: function(n, c) {
          return n.reduce(function(h, f) {
            return h || f.code === c.code;
          }, !1);
        }
      });
      return e ? a[0].code + "/" + a[1].code : a;
    }, i.prototype.dollar = function(e) {
      e = l(e, { max: 1e4, min: 0 });
      var a = this.floating({ min: e.min, max: e.max, fixed: 2 }).toString(), n = a.split(".")[1];
      return n === void 0 ? a += ".00" : n.length < 2 && (a = a + "0"), a < 0 ? "-$" + a.replace("-", "") : "$" + a;
    }, i.prototype.euro = function(e) {
      return Number(this.dollar(e).replace("$", "")).toLocaleString() + "\u20AC";
    }, i.prototype.exp = function(e) {
      e = l(e);
      var a = {};
      return a.year = this.exp_year(), a.year === (/* @__PURE__ */ new Date()).getFullYear().toString() ? a.month = this.exp_month({ future: !0 }) : a.month = this.exp_month(), e.raw ? a : a.month + "/" + a.year;
    }, i.prototype.exp_month = function(e) {
      e = l(e);
      var a, n, c = (/* @__PURE__ */ new Date()).getMonth() + 1;
      if (e.future && c !== 12)
        do
          a = this.month({ raw: !0 }).numeric, n = parseInt(a, 10);
        while (n <= c);
      else
        a = this.month({ raw: !0 }).numeric;
      return a;
    }, i.prototype.exp_year = function() {
      var e = (/* @__PURE__ */ new Date()).getMonth() + 1, a = (/* @__PURE__ */ new Date()).getFullYear();
      return this.year({ min: e === 12 ? a + 1 : a, max: a + 10 });
    }, i.prototype.vat = function(e) {
      switch (e = l(e, { country: "it" }), e.country.toLowerCase()) {
        case "it":
          return this.it_vat();
      }
    }, i.prototype.iban = function() {
      var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", a = e + "0123456789", n = this.string({ length: 2, pool: e }) + this.pad(this.integer({ min: 0, max: 99 }), 2) + this.string({ length: 4, pool: a }) + this.pad(this.natural(), this.natural({ min: 6, max: 26 }));
      return n;
    }, i.prototype.it_vat = function() {
      var e = this.natural({ min: 1, max: 18e5 });
      return e = this.pad(e, 7) + this.pad(this.pick(this.provinces({ country: "it" })).code, 3), e + this.luhn_calculate(e);
    }, i.prototype.cf = function(e) {
      e = e || {};
      var a = e.gender ? e.gender : this.gender(), n = e.first ? e.first : this.first({ gender: a, nationality: "it" }), c = e.last ? e.last : this.last({ nationality: "it" }), h = e.birthday ? e.birthday : this.birthday(), f = e.city ? e.city : this.pickone(["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "M", "Z"]) + this.pad(this.natural({ max: 999 }), 3), B = [], b = function(T, H) {
        var _, z = [];
        return T.length < 3 ? z = T.split("").concat("XXX".split("")).splice(0, 3) : (_ = T.toUpperCase().split("").map(function(J) {
          return "BCDFGHJKLMNPRSTVWZ".indexOf(J) !== -1 ? J : void 0;
        }).join(""), _.length > 3 && (H ? _ = _.substr(0, 3) : _ = _[0] + _.substr(2, 2)), _.length < 3 && (z = _, _ = T.toUpperCase().split("").map(function(J) {
          return "AEIOU".indexOf(J) !== -1 ? J : void 0;
        }).join("").substr(0, 3 - z.length)), z = z + _), z;
      }, A = function(T, H, _) {
        var z = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
        return T.getFullYear().toString().substr(2) + z[T.getMonth()] + _.pad(T.getDate() + (H.toLowerCase() === "female" ? 40 : 0), 2);
      }, y = function(T) {
        for (var H = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", _ = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ", z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", J = "BAKPLCQDREVOSFTGUHMINJWZYX", U = 0, V = 0; V < 15; V++)
          V % 2 !== 0 ? U += z.indexOf(_[H.indexOf(T[V])]) : U += J.indexOf(_[H.indexOf(T[V])]);
        return z[U % 26];
      };
      return B = B.concat(b(c, !0), b(n), A(h, a, this), f.toUpperCase().split("")).join(""), B += y(B.toUpperCase()), B.toUpperCase();
    }, i.prototype.pl_pesel = function() {
      for (var e = this.natural({ min: 1, max: 9999999999 }), a = this.pad(e, 10).split(""), n = 0; n < a.length; n++)
        a[n] = parseInt(a[n]);
      var c = (1 * a[0] + 3 * a[1] + 7 * a[2] + 9 * a[3] + 1 * a[4] + 3 * a[5] + 7 * a[6] + 9 * a[7] + 1 * a[8] + 3 * a[9]) % 10;
      return c !== 0 && (c = 10 - c), a.join("") + c;
    }, i.prototype.pl_nip = function() {
      for (var e = this.natural({ min: 1, max: 999999999 }), a = this.pad(e, 9).split(""), n = 0; n < a.length; n++)
        a[n] = parseInt(a[n]);
      var c = (6 * a[0] + 5 * a[1] + 7 * a[2] + 2 * a[3] + 3 * a[4] + 4 * a[5] + 5 * a[6] + 6 * a[7] + 7 * a[8]) % 11;
      return c === 10 ? this.pl_nip() : a.join("") + c;
    }, i.prototype.pl_regon = function() {
      for (var e = this.natural({ min: 1, max: 99999999 }), a = this.pad(e, 8).split(""), n = 0; n < a.length; n++)
        a[n] = parseInt(a[n]);
      var c = (8 * a[0] + 9 * a[1] + 2 * a[2] + 3 * a[3] + 4 * a[4] + 5 * a[5] + 6 * a[6] + 7 * a[7]) % 11;
      return c === 10 && (c = 0), a.join("") + c;
    }, i.prototype.note = function(e) {
      e = l(e, { notes: "flatKey" });
      var a = {
        naturals: ["C", "D", "E", "F", "G", "A", "B"],
        flats: ["D\u266D", "E\u266D", "G\u266D", "A\u266D", "B\u266D"],
        sharps: ["C\u266F", "D\u266F", "F\u266F", "G\u266F", "A\u266F"]
      };
      return a.all = a.naturals.concat(a.flats.concat(a.sharps)), a.flatKey = a.naturals.concat(a.flats), a.sharpKey = a.naturals.concat(a.sharps), this.pickone(a[e.notes]);
    }, i.prototype.midi_note = function(e) {
      var a = 0, n = 127;
      return e = l(e, { min: a, max: n }), this.integer({ min: e.min, max: e.max });
    }, i.prototype.chord_quality = function(e) {
      e = l(e, { jazz: !0 });
      var a = ["maj", "min", "aug", "dim"];
      return e.jazz && (a = [
        "maj7",
        "min7",
        "7",
        "sus",
        "dim",
        "\xF8"
      ]), this.pickone(a);
    }, i.prototype.chord = function(e) {
      return e = l(e), this.note(e) + this.chord_quality(e);
    }, i.prototype.tempo = function(e) {
      var a = 40, n = 320;
      return e = l(e, { min: a, max: n }), this.integer({ min: e.min, max: e.max });
    }, i.prototype.coin = function() {
      return this.bool() ? "heads" : "tails";
    };
    function C(e) {
      return function() {
        return this.natural(e);
      };
    }
    i.prototype.d4 = C({ min: 1, max: 4 }), i.prototype.d6 = C({ min: 1, max: 6 }), i.prototype.d8 = C({ min: 1, max: 8 }), i.prototype.d10 = C({ min: 1, max: 10 }), i.prototype.d12 = C({ min: 1, max: 12 }), i.prototype.d20 = C({ min: 1, max: 20 }), i.prototype.d30 = C({ min: 1, max: 30 }), i.prototype.d100 = C({ min: 1, max: 100 }), i.prototype.rpg = function(e, a) {
      if (a = l(a), e) {
        var n = e.toLowerCase().split("d"), c = [];
        if (n.length !== 2 || !parseInt(n[0], 10) || !parseInt(n[1], 10))
          throw new Error("Chance: Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");
        for (var h = n[0]; h > 0; h--)
          c[h - 1] = this.natural({ min: 1, max: n[1] });
        return typeof a.sum < "u" && a.sum ? c.reduce(function(f, B) {
          return f + B;
        }) : c;
      } else
        throw new RangeError("Chance: A type of die roll must be included");
    }, i.prototype.guid = function(e) {
      e = l(e, { version: 5 });
      var a = "abcdef1234567890", n = "ab89", c = this.string({ pool: a, length: 8 }) + "-" + this.string({ pool: a, length: 4 }) + "-" + // The Version
      e.version + this.string({ pool: a, length: 3 }) + "-" + // The Variant
      this.string({ pool: n, length: 1 }) + this.string({ pool: a, length: 3 }) + "-" + this.string({ pool: a, length: 12 });
      return c;
    }, i.prototype.hash = function(e) {
      e = l(e, { length: 40, casing: "lower" });
      var a = e.casing === "upper" ? g.toUpperCase() : g;
      return this.string({ pool: a, length: e.length });
    }, i.prototype.luhn_check = function(e) {
      var a = e.toString(), n = +a.substring(a.length - 1);
      return n === this.luhn_calculate(+a.substring(0, a.length - 1));
    }, i.prototype.luhn_calculate = function(e) {
      for (var a = e.toString().split("").reverse(), n = 0, c, h = 0, f = a.length; f > h; ++h)
        c = +a[h], h % 2 === 0 && (c *= 2, c > 9 && (c -= 9)), n += c;
      return n * 9 % 10;
    }, i.prototype.md5 = function(e) {
      var a = { str: "", key: null, raw: !1 };
      if (!e)
        a.str = this.string(), e = {};
      else if (typeof e == "string")
        a.str = e, e = {};
      else {
        if (typeof e != "object")
          return null;
        if (e.constructor === "Array")
          return null;
      }
      if (a = l(e, a), !a.str)
        throw new Error("A parameter is required to return an md5 hash.");
      return this.bimd5.md5(a.str, a.key, a.raw);
    }, i.prototype.file = function(e) {
      var a = e || {}, n = "fileExtension", c = Object.keys(this.get("fileExtension")), h, f;
      if (h = this.word({ length: a.length }), a.extension)
        return f = a.extension, h + "." + f;
      if (a.extensions) {
        if (Array.isArray(a.extensions))
          return f = this.pickone(a.extensions), h + "." + f;
        if (a.extensions.constructor === Object) {
          var B = a.extensions, b = Object.keys(B);
          return f = this.pickone(B[this.pickone(b)]), h + "." + f;
        }
        throw new Error("Chance: Extensions must be an Array or Object");
      }
      if (a.fileType) {
        var A = a.fileType;
        if (c.indexOf(A) !== -1)
          return f = this.pickone(this.get(n)[A]), h + "." + f;
        throw new RangeError("Chance: Expect file type value to be 'raster', 'vector', '3d' or 'document'");
      }
      return f = this.pickone(this.get(n)[this.pickone(c)]), h + "." + f;
    }, i.prototype.fileWithContent = function(e) {
      var a = e || {}, n = "fileName" in a ? a.fileName : this.file().split(".")[0];
      if (n += "." + ("fileExtension" in a ? a.fileExtension : this.file().split(".")[1]), typeof a.fileSize != "number")
        throw new Error("File size must be an integer");
      var c = {
        fileData: this.buffer({ length: a.fileSize }),
        fileName: n
      };
      return c;
    };
    var I = {
      firstNames: {
        male: {
          en: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas", "Christopher", "Daniel", "Matthew", "George", "Donald", "Anthony", "Paul", "Mark", "Edward", "Steven", "Kenneth", "Andrew", "Brian", "Joshua", "Kevin", "Ronald", "Timothy", "Jason", "Jeffrey", "Frank", "Gary", "Ryan", "Nicholas", "Eric", "Stephen", "Jacob", "Larry", "Jonathan", "Scott", "Raymond", "Justin", "Brandon", "Gregory", "Samuel", "Benjamin", "Patrick", "Jack", "Henry", "Walter", "Dennis", "Jerry", "Alexander", "Peter", "Tyler", "Douglas", "Harold", "Aaron", "Jose", "Adam", "Arthur", "Zachary", "Carl", "Nathan", "Albert", "Kyle", "Lawrence", "Joe", "Willie", "Gerald", "Roger", "Keith", "Jeremy", "Terry", "Harry", "Ralph", "Sean", "Jesse", "Roy", "Louis", "Billy", "Austin", "Bruce", "Eugene", "Christian", "Bryan", "Wayne", "Russell", "Howard", "Fred", "Ethan", "Jordan", "Philip", "Alan", "Juan", "Randy", "Vincent", "Bobby", "Dylan", "Johnny", "Phillip", "Victor", "Clarence", "Ernest", "Martin", "Craig", "Stanley", "Shawn", "Travis", "Bradley", "Leonard", "Earl", "Gabriel", "Jimmy", "Francis", "Todd", "Noah", "Danny", "Dale", "Cody", "Carlos", "Allen", "Frederick", "Logan", "Curtis", "Alex", "Joel", "Luis", "Norman", "Marvin", "Glenn", "Tony", "Nathaniel", "Rodney", "Melvin", "Alfred", "Steve", "Cameron", "Chad", "Edwin", "Caleb", "Evan", "Antonio", "Lee", "Herbert", "Jeffery", "Isaac", "Derek", "Ricky", "Marcus", "Theodore", "Elijah", "Luke", "Jesus", "Eddie", "Troy", "Mike", "Dustin", "Ray", "Adrian", "Bernard", "Leroy", "Angel", "Randall", "Wesley", "Ian", "Jared", "Mason", "Hunter", "Calvin", "Oscar", "Clifford", "Jay", "Shane", "Ronnie", "Barry", "Lucas", "Corey", "Manuel", "Leo", "Tommy", "Warren", "Jackson", "Isaiah", "Connor", "Don", "Dean", "Jon", "Julian", "Miguel", "Bill", "Lloyd", "Charlie", "Mitchell", "Leon", "Jerome", "Darrell", "Jeremiah", "Alvin", "Brett", "Seth", "Floyd", "Jim", "Blake", "Micheal", "Gordon", "Trevor", "Lewis", "Erik", "Edgar", "Vernon", "Devin", "Gavin", "Jayden", "Chris", "Clyde", "Tom", "Derrick", "Mario", "Brent", "Marc", "Herman", "Chase", "Dominic", "Ricardo", "Franklin", "Maurice", "Max", "Aiden", "Owen", "Lester", "Gilbert", "Elmer", "Gene", "Francisco", "Glen", "Cory", "Garrett", "Clayton", "Sam", "Jorge", "Chester", "Alejandro", "Jeff", "Harvey", "Milton", "Cole", "Ivan", "Andre", "Duane", "Landon"],
          // Data taken from http://www.dati.gov.it/dataset/comune-di-firenze_0163
          it: ["Adolfo", "Alberto", "Aldo", "Alessandro", "Alessio", "Alfredo", "Alvaro", "Andrea", "Angelo", "Angiolo", "Antonino", "Antonio", "Attilio", "Benito", "Bernardo", "Bruno", "Carlo", "Cesare", "Christian", "Claudio", "Corrado", "Cosimo", "Cristian", "Cristiano", "Daniele", "Dario", "David", "Davide", "Diego", "Dino", "Domenico", "Duccio", "Edoardo", "Elia", "Elio", "Emanuele", "Emiliano", "Emilio", "Enrico", "Enzo", "Ettore", "Fabio", "Fabrizio", "Federico", "Ferdinando", "Fernando", "Filippo", "Francesco", "Franco", "Gabriele", "Giacomo", "Giampaolo", "Giampiero", "Giancarlo", "Gianfranco", "Gianluca", "Gianmarco", "Gianni", "Gino", "Giorgio", "Giovanni", "Giuliano", "Giulio", "Giuseppe", "Graziano", "Gregorio", "Guido", "Iacopo", "Jacopo", "Lapo", "Leonardo", "Lorenzo", "Luca", "Luciano", "Luigi", "Manuel", "Marcello", "Marco", "Marino", "Mario", "Massimiliano", "Massimo", "Matteo", "Mattia", "Maurizio", "Mauro", "Michele", "Mirko", "Mohamed", "Nello", "Neri", "Niccol\xF2", "Nicola", "Osvaldo", "Otello", "Paolo", "Pier Luigi", "Piero", "Pietro", "Raffaele", "Remo", "Renato", "Renzo", "Riccardo", "Roberto", "Rolando", "Romano", "Salvatore", "Samuele", "Sandro", "Sergio", "Silvano", "Simone", "Stefano", "Thomas", "Tommaso", "Ubaldo", "Ugo", "Umberto", "Valerio", "Valter", "Vasco", "Vincenzo", "Vittorio"],
          // Data taken from http://www.svbkindernamen.nl/int/nl/kindernamen/index.html
          nl: ["Aaron", "Abel", "Adam", "Adriaan", "Albert", "Alexander", "Ali", "Arjen", "Arno", "Bart", "Bas", "Bastiaan", "Benjamin", "Bob", "Boris", "Bram", "Brent", "Cas", "Casper", "Chris", "Christiaan", "Cornelis", "Daan", "Daley", "Damian", "Dani", "Daniel", "Dani\xEBl", "David", "Dean", "Dirk", "Dylan", "Egbert", "Elijah", "Erik", "Erwin", "Evert", "Ezra", "Fabian", "Fedde", "Finn", "Florian", "Floris", "Frank", "Frans", "Frederik", "Freek", "Geert", "Gerard", "Gerben", "Gerrit", "Gijs", "Guus", "Hans", "Hendrik", "Henk", "Herman", "Hidde", "Hugo", "Jaap", "Jan Jaap", "Jan-Willem", "Jack", "Jacob", "Jan", "Jason", "Jasper", "Jayden", "Jelle", "Jelte", "Jens", "Jeroen", "Jesse", "Jim", "Job", "Joep", "Johannes", "John", "Jonathan", "Joris", "Joshua", "Jo\xEBl", "Julian", "Kees", "Kevin", "Koen", "Lars", "Laurens", "Leendert", "Lennard", "Lodewijk", "Luc", "Luca", "Lucas", "Lukas", "Luuk", "Maarten", "Marcus", "Martijn", "Martin", "Matthijs", "Maurits", "Max", "Mees", "Melle", "Mick", "Mika", "Milan", "Mohamed", "Mohammed", "Morris", "Muhammed", "Nathan", "Nick", "Nico", "Niek", "Niels", "Noah", "Noud", "Olivier", "Oscar", "Owen", "Paul", "Pepijn", "Peter", "Pieter", "Pim", "Quinten", "Reinier", "Rens", "Robin", "Ruben", "Sam", "Samuel", "Sander", "Sebastiaan", "Sem", "Sep", "Sepp", "Siem", "Simon", "Stan", "Stef", "Steven", "Stijn", "Sven", "Teun", "Thijmen", "Thijs", "Thomas", "Tijn", "Tim", "Timo", "Tobias", "Tom", "Victor", "Vince", "Willem", "Wim", "Wouter", "Yusuf"],
          // Data taken from https://fr.wikipedia.org/wiki/Liste_de_pr%C3%A9noms_fran%C3%A7ais_et_de_la_francophonie
          fr: ["Aaron", "Abdon", "Abel", "Ab\xE9lard", "Abelin", "Abondance", "Abraham", "Absalon", "Acace", "Achaire", "Achille", "Adalard", "Adalbald", "Adalb\xE9ron", "Adalbert", "Adalric", "Adam", "Adegrin", "Adel", "Adelin", "Andelin", "Adelphe", "Adam", "Ad\xE9odat", "Adh\xE9mar", "Adjutor", "Adolphe", "Adonis", "Adon", "Adrien", "Agapet", "Agathange", "Agathon", "Agilbert", "Ag\xE9nor", "Agnan", "Aignan", "Agrippin", "Aimable", "Aim\xE9", "Alain", "Alban", "Albin", "Aubin", "Alb\xE9ric", "Albert", "Albertet", "Alcibiade", "Alcide", "Alc\xE9e", "Alcime", "Aldonce", "Aldric", "Ald\xE9ric", "Aleaume", "Alexandre", "Alexis", "Alix", "Alliaume", "Aleaume", "Almine", "Almire", "Alo\xEFs", "Alph\xE9e", "Alphonse", "Alpinien", "Alver\xE8de", "Amalric", "Amaury", "Amandin", "Amant", "Ambroise", "Am\xE9d\xE9e", "Am\xE9lien", "Amiel", "Amour", "Ana\xEBl", "Anastase", "Anatole", "Ancelin", "And\xE9ol", "Andoche", "Andr\xE9", "Andoche", "Ange", "Angelin", "Angilbe", "Anglebert", "Angoustan", "Anicet", "Anne", "Annibal", "Ansbert", "Anselme", "Anthelme", "Antheaume", "Anthime", "Antide", "Antoine", "Antonius", "Antonin", "Apollinaire", "Apollon", "Aquilin", "Arcade", "Archambaud", "Archambeau", "Archange", "Archibald", "Arian", "Ariel", "Ariste", "Aristide", "Armand", "Armel", "Armin", "Arnould", "Arnaud", "Arolde", "Ars\xE8ne", "Arsino\xE9", "Arthaud", "Arth\xE8me", "Arthur", "Ascelin", "Athanase", "Aubry", "Audebert", "Audouin", "Audran", "Audric", "Auguste", "Augustin", "Aur\xE8le", "Aur\xE9lien", "Aurian", "Auxence", "Axel", "Aymard", "Aymeric", "Aymon", "Aymond", "Balthazar", "Baptiste", "Barnab\xE9", "Barth\xE9lemy", "Bartim\xE9e", "Basile", "Bastien", "Baudouin", "B\xE9nigne", "Benjamin", "Beno\xEEt", "B\xE9renger", "B\xE9rard", "Bernard", "Bertrand", "Blaise", "Bon", "Boniface", "Bouchard", "Brice", "Brieuc", "Bruno", "Brunon", "Calixte", "Calliste", "Cam\xE9lien", "Camille", "Camillien", "Candide", "Caribert", "Carloman", "Cassandre", "Cassien", "C\xE9dric", "C\xE9leste", "C\xE9lestin", "C\xE9lien", "C\xE9saire", "C\xE9sar", "Charles", "Charlemagne", "Childebert", "Chilp\xE9ric", "Chr\xE9tien", "Christian", "Christodule", "Christophe", "Chrysostome", "Clarence", "Claude", "Claudien", "Cl\xE9andre", "Cl\xE9ment", "Clotaire", "C\xF4me", "Constance", "Constant", "Constantin", "Corentin", "Cyprien", "Cyriaque", "Cyrille", "Cyril", "Damien", "Daniel", "David", "Delphin", "Denis", "D\xE9sir\xE9", "Didier", "Dieudonn\xE9", "Dimitri", "Dominique", "Dorian", "Doroth\xE9e", "Edgard", "Edmond", "\xC9douard", "\xC9leuth\xE8re", "\xC9lie", "\xC9lis\xE9e", "\xC9meric", "\xC9mile", "\xC9milien", "Emmanuel", "Enguerrand", "\xC9piphane", "\xC9ric", "Esprit", "Ernest", "\xC9tienne", "Eubert", "Eudes", "Eudoxe", "Eug\xE8ne", "Eus\xE8be", "Eustache", "\xC9variste", "\xC9vrard", "Fabien", "Fabrice", "Falba", "F\xE9licit\xE9", "F\xE9lix", "Ferdinand", "Fiacre", "Fid\xE8le", "Firmin", "Flavien", "Flodoard", "Florent", "Florentin", "Florestan", "Florian", "Fortun\xE9", "Foulques", "Francisque", "Fran\xE7ois", "Fran\xE7ais", "Franciscus", "Francs", "Fr\xE9d\xE9ric", "Fulbert", "Fulcran", "Fulgence", "Gabin", "Gabriel", "Ga\xEBl", "Garnier", "Gaston", "Gaspard", "Gatien", "Gaud", "Gautier", "G\xE9d\xE9on", "Geoffroy", "Georges", "G\xE9raud", "G\xE9rard", "Gerbert", "Germain", "Gervais", "Ghislain", "Gilbert", "Gilles", "Girart", "Gislebert", "Gondebaud", "Gonthier", "Gontran", "Gonzague", "Gr\xE9goire", "Gu\xE9rin", "Gui", "Guillaume", "Gustave", "Guy", "Guyot", "Hardouin", "Hector", "H\xE9delin", "H\xE9lier", "Henri", "Herbert", "Herluin", "Herv\xE9", "Hilaire", "Hildebert", "Hincmar", "Hippolyte", "Honor\xE9", "Hubert", "Hugues", "Innocent", "Isabeau", "Isidore", "Jacques", "Japhet", "Jason", "Jean", "Jeannel", "Jeannot", "J\xE9r\xE9mie", "J\xE9r\xF4me", "Joachim", "Joanny", "Job", "Jocelyn", "Jo\xEBl", "Johan", "Jonas", "Jonathan", "Joseph", "Josse", "Josselin", "Jourdain", "Jude", "Judica\xEBl", "Jules", "Julien", "Juste", "Justin", "Lambert", "Landry", "Laurent", "Lazare", "L\xE9andre", "L\xE9on", "L\xE9onard", "L\xE9opold", "Leu", "Loup", "Leufroy", "Lib\xE8re", "Li\xE9tald", "Lionel", "Lo\xEFc", "Longin", "Lorrain", "Lorraine", "Lothaire", "Louis", "Loup", "Luc", "Lucas", "Lucien", "Ludolphe", "Ludovic", "Macaire", "Malo", "Mamert", "Manass\xE9", "Marc", "Marceau", "Marcel", "Marcelin", "Marius", "Marseille", "Martial", "Martin", "Mathurin", "Matthias", "Mathias", "Matthieu", "Maugis", "Maurice", "Mauricet", "Maxence", "Maxime", "Maximilien", "Mayeul", "M\xE9d\xE9ric", "Melchior", "Mence", "Merlin", "M\xE9rov\xE9e", "Micha\xEBl", "Michel", "Mo\xEFse", "Morgan", "Nathan", "Nathana\xEBl", "Narcisse", "N\xE9h\xE9mie", "Nestor", "Nestor", "Nic\xE9phore", "Nicolas", "No\xE9", "No\xEBl", "Norbert", "Normand", "Normands", "Octave", "Odilon", "Odon", "Oger", "Olivier", "Oury", "Pac\xF4me", "Pal\xE9mon", "Parfait", "Pascal", "Paterne", "Patrice", "Paul", "P\xE9pin", "Perceval", "Phil\xE9mon", "Philibert", "Philippe", "Philoth\xE9e", "Pie", "Pierre", "Pierrick", "Prosper", "Quentin", "Raoul", "Rapha\xEBl", "Raymond", "R\xE9gis", "R\xE9jean", "R\xE9mi", "Renaud", "Ren\xE9", "Reybaud", "Richard", "Robert", "Roch", "Rodolphe", "Rodrigue", "Roger", "Roland", "Romain", "Romuald", "Rom\xE9o", "Rome", "Ronan", "Roselin", "Salomon", "Samuel", "Savin", "Savinien", "Scholastique", "S\xE9bastien", "S\xE9raphin", "Serge", "S\xE9verin", "Sidoine", "Sigebert", "Sigismond", "Silv\xE8re", "Simon", "Sim\xE9on", "Sixte", "Stanislas", "St\xE9phane", "Stephan", "Sylvain", "Sylvestre", "Tancr\xE8de", "Tanguy", "Taurin", "Th\xE9odore", "Th\xE9odose", "Th\xE9ophile", "Th\xE9ophraste", "Thibault", "Thibert", "Thierry", "Thomas", "Timol\xE9on", "Timoth\xE9e", "Titien", "Tonnin", "Toussaint", "Trajan", "Tristan", "Turold", "Tim", "Ulysse", "Urbain", "Valentin", "Val\xE8re", "Val\xE9ry", "Venance", "Venant", "Venceslas", "Vianney", "Victor", "Victorien", "Victorin", "Vigile", "Vincent", "Vital", "Vitalien", "Vivien", "Waleran", "Wandrille", "Xavier", "X\xE9nophon", "Yves", "Zacharie", "Zach\xE9", "Z\xE9phirin"]
        },
        female: {
          en: ["Mary", "Emma", "Elizabeth", "Minnie", "Margaret", "Ida", "Alice", "Bertha", "Sarah", "Annie", "Clara", "Ella", "Florence", "Cora", "Martha", "Laura", "Nellie", "Grace", "Carrie", "Maude", "Mabel", "Bessie", "Jennie", "Gertrude", "Julia", "Hattie", "Edith", "Mattie", "Rose", "Catherine", "Lillian", "Ada", "Lillie", "Helen", "Jessie", "Louise", "Ethel", "Lula", "Myrtle", "Eva", "Frances", "Lena", "Lucy", "Edna", "Maggie", "Pearl", "Daisy", "Fannie", "Josephine", "Dora", "Rosa", "Katherine", "Agnes", "Marie", "Nora", "May", "Mamie", "Blanche", "Stella", "Ellen", "Nancy", "Effie", "Sallie", "Nettie", "Della", "Lizzie", "Flora", "Susie", "Maud", "Mae", "Etta", "Harriet", "Sadie", "Caroline", "Katie", "Lydia", "Elsie", "Kate", "Susan", "Mollie", "Alma", "Addie", "Georgia", "Eliza", "Lulu", "Nannie", "Lottie", "Amanda", "Belle", "Charlotte", "Rebecca", "Ruth", "Viola", "Olive", "Amelia", "Hannah", "Jane", "Virginia", "Emily", "Matilda", "Irene", "Kathryn", "Esther", "Willie", "Henrietta", "Ollie", "Amy", "Rachel", "Sara", "Estella", "Theresa", "Augusta", "Ora", "Pauline", "Josie", "Lola", "Sophia", "Leona", "Anne", "Mildred", "Ann", "Beulah", "Callie", "Lou", "Delia", "Eleanor", "Barbara", "Iva", "Louisa", "Maria", "Mayme", "Evelyn", "Estelle", "Nina", "Betty", "Marion", "Bettie", "Dorothy", "Luella", "Inez", "Lela", "Rosie", "Allie", "Millie", "Janie", "Cornelia", "Victoria", "Ruby", "Winifred", "Alta", "Celia", "Christine", "Beatrice", "Birdie", "Harriett", "Mable", "Myra", "Sophie", "Tillie", "Isabel", "Sylvia", "Carolyn", "Isabelle", "Leila", "Sally", "Ina", "Essie", "Bertie", "Nell", "Alberta", "Katharine", "Lora", "Rena", "Mina", "Rhoda", "Mathilda", "Abbie", "Eula", "Dollie", "Hettie", "Eunice", "Fanny", "Ola", "Lenora", "Adelaide", "Christina", "Lelia", "Nelle", "Sue", "Johanna", "Lilly", "Lucinda", "Minerva", "Lettie", "Roxie", "Cynthia", "Helena", "Hilda", "Hulda", "Bernice", "Genevieve", "Jean", "Cordelia", "Marian", "Francis", "Jeanette", "Adeline", "Gussie", "Leah", "Lois", "Lura", "Mittie", "Hallie", "Isabella", "Olga", "Phoebe", "Teresa", "Hester", "Lida", "Lina", "Winnie", "Claudia", "Marguerite", "Vera", "Cecelia", "Bess", "Emilie", "Rosetta", "Verna", "Myrtie", "Cecilia", "Elva", "Olivia", "Ophelia", "Georgie", "Elnora", "Violet", "Adele", "Lily", "Linnie", "Loretta", "Madge", "Polly", "Virgie", "Eugenia", "Lucile", "Lucille", "Mabelle", "Rosalie"],
          // Data taken from http://www.dati.gov.it/dataset/comune-di-firenze_0162
          it: ["Ada", "Adriana", "Alessandra", "Alessia", "Alice", "Angela", "Anna", "Anna Maria", "Annalisa", "Annita", "Annunziata", "Antonella", "Arianna", "Asia", "Assunta", "Aurora", "Barbara", "Beatrice", "Benedetta", "Bianca", "Bruna", "Camilla", "Carla", "Carlotta", "Carmela", "Carolina", "Caterina", "Catia", "Cecilia", "Chiara", "Cinzia", "Clara", "Claudia", "Costanza", "Cristina", "Daniela", "Debora", "Diletta", "Dina", "Donatella", "Elena", "Eleonora", "Elisa", "Elisabetta", "Emanuela", "Emma", "Eva", "Federica", "Fernanda", "Fiorella", "Fiorenza", "Flora", "Franca", "Francesca", "Gabriella", "Gaia", "Gemma", "Giada", "Gianna", "Gina", "Ginevra", "Giorgia", "Giovanna", "Giulia", "Giuliana", "Giuseppa", "Giuseppina", "Grazia", "Graziella", "Greta", "Ida", "Ilaria", "Ines", "Iolanda", "Irene", "Irma", "Isabella", "Jessica", "Laura", "Lea", "Letizia", "Licia", "Lidia", "Liliana", "Lina", "Linda", "Lisa", "Livia", "Loretta", "Luana", "Lucia", "Luciana", "Lucrezia", "Luisa", "Manuela", "Mara", "Marcella", "Margherita", "Maria", "Maria Cristina", "Maria Grazia", "Maria Luisa", "Maria Pia", "Maria Teresa", "Marina", "Marisa", "Marta", "Martina", "Marzia", "Matilde", "Melissa", "Michela", "Milena", "Mirella", "Monica", "Natalina", "Nella", "Nicoletta", "Noemi", "Olga", "Paola", "Patrizia", "Piera", "Pierina", "Raffaella", "Rebecca", "Renata", "Rina", "Rita", "Roberta", "Rosa", "Rosanna", "Rossana", "Rossella", "Sabrina", "Sandra", "Sara", "Serena", "Silvana", "Silvia", "Simona", "Simonetta", "Sofia", "Sonia", "Stefania", "Susanna", "Teresa", "Tina", "Tiziana", "Tosca", "Valentina", "Valeria", "Vanda", "Vanessa", "Vanna", "Vera", "Veronica", "Vilma", "Viola", "Virginia", "Vittoria"],
          // Data taken from http://www.svbkindernamen.nl/int/nl/kindernamen/index.html
          nl: ["Ada", "Arianne", "Afke", "Amanda", "Amber", "Amy", "Aniek", "Anita", "Anja", "Anna", "Anne", "Annelies", "Annemarie", "Annette", "Anouk", "Astrid", "Aukje", "Barbara", "Bianca", "Carla", "Carlijn", "Carolien", "Chantal", "Charlotte", "Claudia", "Dani\xEBlle", "Debora", "Diane", "Dora", "Eline", "Elise", "Ella", "Ellen", "Emma", "Esmee", "Evelien", "Esther", "Erica", "Eva", "Femke", "Fleur", "Floor", "Froukje", "Gea", "Gerda", "Hanna", "Hanneke", "Heleen", "Hilde", "Ilona", "Ina", "Inge", "Ingrid", "Iris", "Isabel", "Isabelle", "Janneke", "Jasmijn", "Jeanine", "Jennifer", "Jessica", "Johanna", "Joke", "Julia", "Julie", "Karen", "Karin", "Katja", "Kim", "Lara", "Laura", "Lena", "Lianne", "Lieke", "Lilian", "Linda", "Lisa", "Lisanne", "Lotte", "Louise", "Maaike", "Manon", "Marga", "Maria", "Marissa", "Marit", "Marjolein", "Martine", "Marleen", "Melissa", "Merel", "Miranda", "Michelle", "Mirjam", "Mirthe", "Naomi", "Natalie", "Nienke", "Nina", "Noortje", "Olivia", "Patricia", "Paula", "Paulien", "Ramona", "Ria", "Rianne", "Roos", "Rosanne", "Ruth", "Sabrina", "Sandra", "Sanne", "Sara", "Saskia", "Silvia", "Sofia", "Sophie", "Sonja", "Suzanne", "Tamara", "Tess", "Tessa", "Tineke", "Valerie", "Vanessa", "Veerle", "Vera", "Victoria", "Wendy", "Willeke", "Yvonne", "Zo\xEB"],
          // Data taken from https://fr.wikipedia.org/wiki/Liste_de_pr%C3%A9noms_fran%C3%A7ais_et_de_la_francophonie
          fr: ["Abdon", "Abel", "Abiga\xEBlle", "Abiga\xEFl", "Acacius", "Acanthe", "Adalbert", "Adalsinde", "Adegrine", "Ad\xE9la\xEFde", "Ad\xE8le", "Ad\xE9lie", "Adeline", "Adeltrude", "Adolphe", "Adonis", "Adrast\xE9e", "Adrehilde", "Adrienne", "Agathe", "Agilbert", "Agla\xE9", "Aignan", "Agnefl\xE8te", "Agn\xE8s", "Agrippine", "Aim\xE9", "Alaine", "Ala\xEFs", "Albane", "Alb\xE9rade", "Alberte", "Alcide", "Alcine", "Alcyone", "Aldegonde", "Aleth", "Alexandrine", "Alexine", "Alice", "Ali\xE9nor", "Aliette", "Aline", "Alix", "Aliz\xE9", "Alo\xEFse", "Aloyse", "Alphonsine", "Alth\xE9e", "Amaliane", "Amalth\xE9e", "Amande", "Amandine", "Amant", "Amarande", "Amaranthe", "Amaryllis", "Ambre", "Ambroisie", "Am\xE9lie", "Am\xE9thyste", "Aminte", "Ana\xEBl", "Ana\xEFs", "Anastasie", "Anatole", "Ancelin", "Andr\xE9e", "An\xE9mone", "Angadr\xEAme", "Ang\xE8le", "Angeline", "Ang\xE9lique", "Angilbert", "Anicet", "Annabelle", "Anne", "Annette", "Annick", "Annie", "Annonciade", "Ansbert", "Anstrudie", "Anthelme", "Antigone", "Antoinette", "Antonine", "Aph\xE9lie", "Apolline", "Apollonie", "Aquiline", "Arabelle", "Arcadie", "Archange", "Argine", "Ariane", "Aricie", "Ariel", "Arielle", "Arlette", "Armance", "Armande", "Armandine", "Armelle", "Armide", "Armelle", "Armin", "Arnaud", "Ars\xE8ne", "Arsino\xE9", "Art\xE9mis", "Arthur", "Ascelin", "Ascension", "Assomption", "Astart\xE9", "Ast\xE9rie", "Astr\xE9e", "Astrid", "Athalie", "Athanasie", "Athina", "Aube", "Albert", "Aude", "Audrey", "Augustine", "Aure", "Aur\xE9lie", "Aur\xE9lien", "Aur\xE8le", "Aurore", "Auxence", "Aveline", "Abiga\xEBlle", "Avoye", "Axelle", "Aymard", "Azal\xE9e", "Ad\xE8le", "Adeline", "Barbe", "Basilisse", "Bathilde", "B\xE9atrice", "B\xE9atrix", "B\xE9n\xE9dicte", "B\xE9reng\xE8re", "Bernadette", "Berthe", "Bertille", "Beuve", "Blanche", "Blanc", "Blandine", "Brigitte", "Brune", "Brunehilde", "Callista", "Camille", "Capucine", "Carine", "Caroline", "Cassandre", "Catherine", "C\xE9cile", "C\xE9leste", "C\xE9lestine", "C\xE9line", "Chantal", "Charl\xE8ne", "Charline", "Charlotte", "Chlo\xE9", "Christelle", "Christiane", "Christine", "Claire", "Clara", "Claude", "Claudine", "Clarisse", "Cl\xE9mence", "Cl\xE9mentine", "Cl\xE9o", "Clio", "Clotilde", "Coline", "Conception", "Constance", "Coralie", "Coraline", "Corentine", "Corinne", "Cyrielle", "Daniel", "Daniel", "Daphn\xE9", "D\xE9bora", "Delphine", "Denise", "Diane", "Dieudonn\xE9", "Dominique", "Doriane", "Doroth\xE9e", "Douce", "\xC9dith", "Edm\xE9e", "\xC9l\xE9onore", "\xC9liane", "\xC9lia", "\xC9liette", "\xC9lisabeth", "\xC9lise", "Ella", "\xC9lodie", "\xC9lo\xEFse", "Elsa", "\xC9meline", "\xC9m\xE9rance", "\xC9m\xE9rentienne", "\xC9m\xE9rencie", "\xC9milie", "Emma", "Emmanuelle", "Emmelie", "Ernestine", "Esther", "Estelle", "Eudoxie", "Eug\xE9nie", "Eulalie", "Euphrasie", "Eus\xE9bie", "\xC9vang\xE9line", "Eva", "\xC8ve", "\xC9velyne", "Fanny", "Fantine", "Faustine", "F\xE9licie", "Fernande", "Flavie", "Fleur", "Flore", "Florence", "Florie", "Fortun\xE9", "France", "Francia", "Fran\xE7oise", "Francine", "Gabrielle", "Ga\xEBlle", "Garance", "Genevi\xE8ve", "Georgette", "Gerberge", "Germaine", "Gertrude", "Gis\xE8le", "Gueni\xE8vre", "Guilhemine", "Guillemette", "Gustave", "Gwenael", "H\xE9l\xE8ne", "H\xE9lo\xEFse", "Henriette", "Hermine", "Hermione", "Hippolyte", "Honorine", "Hortense", "Huguette", "Ines", "Ir\xE8ne", "Irina", "Iris", "Isabeau", "Isabelle", "Iseult", "Isolde", "Ism\xE9rie", "Jacinthe", "Jacqueline", "Jade", "Janine", "Jeanne", "Jocelyne", "Jo\xEBlle", "Jos\xE9phine", "Judith", "Julia", "Julie", "Jules", "Juliette", "Justine", "Katy", "Kathy", "Katie", "Laura", "Laure", "Laureline", "Laurence", "Laurene", "Lauriane", "Laurianne", "Laurine", "L\xE9a", "L\xE9na", "L\xE9onie", "L\xE9on", "L\xE9ontine", "Lorraine", "Lucie", "Lucienne", "Lucille", "Ludivine", "Lydie", "Lydie", "Megane", "Madeleine", "Magali", "Maguelone", "Mallaury", "Manon", "Marceline", "Margot", "Marguerite", "Marianne", "Marie", "Myriam", "Marie", "Marine", "Marion", "Marl\xE8ne", "Marthe", "Martine", "Mathilde", "Maud", "Maureen", "Mauricette", "Maxime", "M\xE9lanie", "Melissa", "M\xE9lissandre", "M\xE9lisande", "M\xE9lodie", "Michel", "Micheline", "Mireille", "Miriam", "Mo\xEFse", "Monique", "Morgane", "Muriel", "Myl\xE8ne", "Nad\xE8ge", "Nadine", "Nathalie", "Nicole", "Nicolette", "Nine", "No\xEBl", "No\xE9mie", "Oc\xE9ane", "Odette", "Odile", "Olive", "Olivia", "Olympe", "Ombline", "Ombeline", "Oph\xE9lie", "Oriande", "Oriane", "Ozanne", "Pascale", "Pascaline", "Paule", "Paulette", "Pauline", "Priscille", "Prisca", "Prisque", "P\xE9cine", "P\xE9lagie", "P\xE9n\xE9lope", "Perrine", "P\xE9tronille", "Philippine", "Philom\xE8ne", "Philoth\xE9e", "Primerose", "Prudence", "Pulch\xE9rie", "Quentine", "Qui\xE9ta", "Quintia", "Quintilla", "Rachel", "Rapha\xEBlle", "Raymonde", "Rebecca", "R\xE9gine", "R\xE9jeanne", "Ren\xE9", "Rita", "Rita", "Rolande", "Romane", "Rosalie", "Rose", "Roseline", "Sabine", "Salom\xE9", "Sandra", "Sandrine", "Sarah", "S\xE9gol\xE8ne", "S\xE9verine", "Sibylle", "Simone", "Sixt", "Solange", "Soline", "Sol\xE8ne", "Sophie", "St\xE9phanie", "Suzanne", "Sylvain", "Sylvie", "Tatiana", "Tha\xEFs", "Th\xE9odora", "Th\xE9r\xE8se", "Tiphaine", "Ursule", "Valentine", "Val\xE9rie", "V\xE9ronique", "Victoire", "Victorine", "Vinciane", "Violette", "Virginie", "Viviane", "Xavi\xE8re", "Yolande", "Ysaline", "Yvette", "Yvonne", "Z\xE9lie", "Zita", "Zo\xE9"]
        }
      },
      lastNames: {
        en: ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes", "Myers", "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan", "Owens", "Reynolds", "Fisher", "Ellis", "Harrison", "Gibson", "McDonald", "Cruz", "Marshall", "Ortiz", "Gomez", "Murray", "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", "Hunter", "Hicks", "Crawford", "Henry", "Boyd", "Mason", "Morales", "Kennedy", "Warren", "Dixon", "Ramos", "Reyes", "Burns", "Gordon", "Shaw", "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels", "Palmer", "Mills", "Nichols", "Grant", "Knight", "Ferguson", "Rose", "Stone", "Hawkins", "Dunn", "Perkins", "Hudson", "Spencer", "Gardner", "Stephens", "Payne", "Pierce", "Berry", "Matthews", "Arnold", "Wagner", "Willis", "Ray", "Watkins", "Olson", "Carroll", "Duncan", "Snyder", "Hart", "Cunningham", "Bradley", "Lane", "Andrews", "Ruiz", "Harper", "Fox", "Riley", "Armstrong", "Carpenter", "Weaver", "Greene", "Lawrence", "Elliott", "Chavez", "Sims", "Austin", "Peters", "Kelley", "Franklin", "Lawson", "Fields", "Gutierrez", "Ryan", "Schmidt", "Carr", "Vasquez", "Castillo", "Wheeler", "Chapman", "Oliver", "Montgomery", "Richards", "Williamson", "Johnston", "Banks", "Meyer", "Bishop", "McCoy", "Howell", "Alvarez", "Morrison", "Hansen", "Fernandez", "Garza", "Harvey", "Little", "Burton", "Stanley", "Nguyen", "George", "Jacobs", "Reid", "Kim", "Fuller", "Lynch", "Dean", "Gilbert", "Garrett", "Romero", "Welch", "Larson", "Frazier", "Burke", "Hanson", "Day", "Mendoza", "Moreno", "Bowman", "Medina", "Fowler", "Brewer", "Hoffman", "Carlson", "Silva", "Pearson", "Holland", "Douglas", "Fleming", "Jensen", "Vargas", "Byrd", "Davidson", "Hopkins", "May", "Terry", "Herrera", "Wade", "Soto", "Walters", "Curtis", "Neal", "Caldwell", "Lowe", "Jennings", "Barnett", "Graves", "Jimenez", "Horton", "Shelton", "Barrett", "Obrien", "Castro", "Sutton", "Gregory", "McKinney", "Lucas", "Miles", "Craig", "Rodriquez", "Chambers", "Holt", "Lambert", "Fletcher", "Watts", "Bates", "Hale", "Rhodes", "Pena", "Beck", "Newman", "Haynes", "McDaniel", "Mendez", "Bush", "Vaughn", "Parks", "Dawson", "Santiago", "Norris", "Hardy", "Love", "Steele", "Curry", "Powers", "Schultz", "Barker", "Guzman", "Page", "Munoz", "Ball", "Keller", "Chandler", "Weber", "Leonard", "Walsh", "Lyons", "Ramsey", "Wolfe", "Schneider", "Mullins", "Benson", "Sharp", "Bowen", "Daniel", "Barber", "Cummings", "Hines", "Baldwin", "Griffith", "Valdez", "Hubbard", "Salazar", "Reeves", "Warner", "Stevenson", "Burgess", "Santos", "Tate", "Cross", "Garner", "Mann", "Mack", "Moss", "Thornton", "Dennis", "McGee", "Farmer", "Delgado", "Aguilar", "Vega", "Glover", "Manning", "Cohen", "Harmon", "Rodgers", "Robbins", "Newton", "Todd", "Blair", "Higgins", "Ingram", "Reese", "Cannon", "Strickland", "Townsend", "Potter", "Goodwin", "Walton", "Rowe", "Hampton", "Ortega", "Patton", "Swanson", "Joseph", "Francis", "Goodman", "Maldonado", "Yates", "Becker", "Erickson", "Hodges", "Rios", "Conner", "Adkins", "Webster", "Norman", "Malone", "Hammond", "Flowers", "Cobb", "Moody", "Quinn", "Blake", "Maxwell", "Pope", "Floyd", "Osborne", "Paul", "McCarthy", "Guerrero", "Lindsey", "Estrada", "Sandoval", "Gibbs", "Tyler", "Gross", "Fitzgerald", "Stokes", "Doyle", "Sherman", "Saunders", "Wise", "Colon", "Gill", "Alvarado", "Greer", "Padilla", "Simon", "Waters", "Nunez", "Ballard", "Schwartz", "McBride", "Houston", "Christensen", "Klein", "Pratt", "Briggs", "Parsons", "McLaughlin", "Zimmerman", "French", "Buchanan", "Moran", "Copeland", "Roy", "Pittman", "Brady", "McCormick", "Holloway", "Brock", "Poole", "Frank", "Logan", "Owen", "Bass", "Marsh", "Drake", "Wong", "Jefferson", "Park", "Morton", "Abbott", "Sparks", "Patrick", "Norton", "Huff", "Clayton", "Massey", "Lloyd", "Figueroa", "Carson", "Bowers", "Roberson", "Barton", "Tran", "Lamb", "Harrington", "Casey", "Boone", "Cortez", "Clarke", "Mathis", "Singleton", "Wilkins", "Cain", "Bryan", "Underwood", "Hogan", "McKenzie", "Collier", "Luna", "Phelps", "McGuire", "Allison", "Bridges", "Wilkerson", "Nash", "Summers", "Atkins"],
        // Data taken from http://www.dati.gov.it/dataset/comune-di-firenze_0164 (first 1000)
        it: ["Acciai", "Aglietti", "Agostini", "Agresti", "Ahmed", "Aiazzi", "Albanese", "Alberti", "Alessi", "Alfani", "Alinari", "Alterini", "Amato", "Ammannati", "Ancillotti", "Andrei", "Andreini", "Andreoni", "Angeli", "Anichini", "Antonelli", "Antonini", "Arena", "Ariani", "Arnetoli", "Arrighi", "Baccani", "Baccetti", "Bacci", "Bacherini", "Badii", "Baggiani", "Baglioni", "Bagni", "Bagnoli", "Baldassini", "Baldi", "Baldini", "Ballerini", "Balli", "Ballini", "Balloni", "Bambi", "Banchi", "Bandinelli", "Bandini", "Bani", "Barbetti", "Barbieri", "Barchielli", "Bardazzi", "Bardelli", "Bardi", "Barducci", "Bargellini", "Bargiacchi", "Barni", "Baroncelli", "Baroncini", "Barone", "Baroni", "Baronti", "Bartalesi", "Bartoletti", "Bartoli", "Bartolini", "Bartoloni", "Bartolozzi", "Basagni", "Basile", "Bassi", "Batacchi", "Battaglia", "Battaglini", "Bausi", "Becagli", "Becattini", "Becchi", "Becucci", "Bellandi", "Bellesi", "Belli", "Bellini", "Bellucci", "Bencini", "Benedetti", "Benelli", "Beni", "Benini", "Bensi", "Benucci", "Benvenuti", "Berlincioni", "Bernacchioni", "Bernardi", "Bernardini", "Berni", "Bernini", "Bertelli", "Berti", "Bertini", "Bessi", "Betti", "Bettini", "Biagi", "Biagini", "Biagioni", "Biagiotti", "Biancalani", "Bianchi", "Bianchini", "Bianco", "Biffoli", "Bigazzi", "Bigi", "Biliotti", "Billi", "Binazzi", "Bindi", "Bini", "Biondi", "Bizzarri", "Bocci", "Bogani", "Bolognesi", "Bonaiuti", "Bonanni", "Bonciani", "Boncinelli", "Bondi", "Bonechi", "Bongini", "Boni", "Bonini", "Borchi", "Boretti", "Borghi", "Borghini", "Borgioli", "Borri", "Borselli", "Boschi", "Bottai", "Bracci", "Braccini", "Brandi", "Braschi", "Bravi", "Brazzini", "Breschi", "Brilli", "Brizzi", "Brogelli", "Brogi", "Brogioni", "Brunelli", "Brunetti", "Bruni", "Bruno", "Brunori", "Bruschi", "Bucci", "Bucciarelli", "Buccioni", "Bucelli", "Bulli", "Burberi", "Burchi", "Burgassi", "Burroni", "Bussotti", "Buti", "Caciolli", "Caiani", "Calabrese", "Calamai", "Calamandrei", "Caldini", "Calo'", "Calonaci", "Calosi", "Calvelli", "Cambi", "Camiciottoli", "Cammelli", "Cammilli", "Campolmi", "Cantini", "Capanni", "Capecchi", "Caponi", "Cappelletti", "Cappelli", "Cappellini", "Cappugi", "Capretti", "Caputo", "Carbone", "Carboni", "Cardini", "Carlesi", "Carletti", "Carli", "Caroti", "Carotti", "Carrai", "Carraresi", "Carta", "Caruso", "Casalini", "Casati", "Caselli", "Casini", "Castagnoli", "Castellani", "Castelli", "Castellucci", "Catalano", "Catarzi", "Catelani", "Cavaciocchi", "Cavallaro", "Cavallini", "Cavicchi", "Cavini", "Ceccarelli", "Ceccatelli", "Ceccherelli", "Ceccherini", "Cecchi", "Cecchini", "Cecconi", "Cei", "Cellai", "Celli", "Cellini", "Cencetti", "Ceni", "Cenni", "Cerbai", "Cesari", "Ceseri", "Checcacci", "Checchi", "Checcucci", "Cheli", "Chellini", "Chen", "Cheng", "Cherici", "Cherubini", "Chiaramonti", "Chiarantini", "Chiarelli", "Chiari", "Chiarini", "Chiarugi", "Chiavacci", "Chiesi", "Chimenti", "Chini", "Chirici", "Chiti", "Ciabatti", "Ciampi", "Cianchi", "Cianfanelli", "Cianferoni", "Ciani", "Ciapetti", "Ciappi", "Ciardi", "Ciatti", "Cicali", "Ciccone", "Cinelli", "Cini", "Ciobanu", "Ciolli", "Cioni", "Cipriani", "Cirillo", "Cirri", "Ciucchi", "Ciuffi", "Ciulli", "Ciullini", "Clemente", "Cocchi", "Cognome", "Coli", "Collini", "Colombo", "Colzi", "Comparini", "Conforti", "Consigli", "Conte", "Conti", "Contini", "Coppini", "Coppola", "Corsi", "Corsini", "Corti", "Cortini", "Cosi", "Costa", "Costantini", "Costantino", "Cozzi", "Cresci", "Crescioli", "Cresti", "Crini", "Curradi", "D'Agostino", "D'Alessandro", "D'Amico", "D'Angelo", "Daddi", "Dainelli", "Dallai", "Danti", "Davitti", "De Angelis", "De Luca", "De Marco", "De Rosa", "De Santis", "De Simone", "De Vita", "Degl'Innocenti", "Degli Innocenti", "Dei", "Del Lungo", "Del Re", "Di Marco", "Di Stefano", "Dini", "Diop", "Dobre", "Dolfi", "Donati", "Dondoli", "Dong", "Donnini", "Ducci", "Dumitru", "Ermini", "Esposito", "Evangelisti", "Fabbri", "Fabbrini", "Fabbrizzi", "Fabbroni", "Fabbrucci", "Fabiani", "Facchini", "Faggi", "Fagioli", "Failli", "Faini", "Falciani", "Falcini", "Falcone", "Fallani", "Falorni", "Falsini", "Falugiani", "Fancelli", "Fanelli", "Fanetti", "Fanfani", "Fani", "Fantappie'", "Fantechi", "Fanti", "Fantini", "Fantoni", "Farina", "Fattori", "Favilli", "Fedi", "Fei", "Ferrante", "Ferrara", "Ferrari", "Ferraro", "Ferretti", "Ferri", "Ferrini", "Ferroni", "Fiaschi", "Fibbi", "Fiesoli", "Filippi", "Filippini", "Fini", "Fioravanti", "Fiore", "Fiorentini", "Fiorini", "Fissi", "Focardi", "Foggi", "Fontana", "Fontanelli", "Fontani", "Forconi", "Formigli", "Forte", "Forti", "Fortini", "Fossati", "Fossi", "Francalanci", "Franceschi", "Franceschini", "Franchi", "Franchini", "Franci", "Francini", "Francioni", "Franco", "Frassineti", "Frati", "Fratini", "Frilli", "Frizzi", "Frosali", "Frosini", "Frullini", "Fusco", "Fusi", "Gabbrielli", "Gabellini", "Gagliardi", "Galanti", "Galardi", "Galeotti", "Galletti", "Galli", "Gallo", "Gallori", "Gambacciani", "Gargani", "Garofalo", "Garuglieri", "Gashi", "Gasperini", "Gatti", "Gelli", "Gensini", "Gentile", "Gentili", "Geri", "Gerini", "Gheri", "Ghini", "Giachetti", "Giachi", "Giacomelli", "Gianassi", "Giani", "Giannelli", "Giannetti", "Gianni", "Giannini", "Giannoni", "Giannotti", "Giannozzi", "Gigli", "Giordano", "Giorgetti", "Giorgi", "Giovacchini", "Giovannelli", "Giovannetti", "Giovannini", "Giovannoni", "Giuliani", "Giunti", "Giuntini", "Giusti", "Gonnelli", "Goretti", "Gori", "Gradi", "Gramigni", "Grassi", "Grasso", "Graziani", "Grazzini", "Greco", "Grifoni", "Grillo", "Grimaldi", "Grossi", "Gualtieri", "Guarducci", "Guarino", "Guarnieri", "Guasti", "Guerra", "Guerri", "Guerrini", "Guidi", "Guidotti", "He", "Hoxha", "Hu", "Huang", "Iandelli", "Ignesti", "Innocenti", "Jin", "La Rosa", "Lai", "Landi", "Landini", "Lanini", "Lapi", "Lapini", "Lari", "Lascialfari", "Lastrucci", "Latini", "Lazzeri", "Lazzerini", "Lelli", "Lenzi", "Leonardi", "Leoncini", "Leone", "Leoni", "Lepri", "Li", "Liao", "Lin", "Linari", "Lippi", "Lisi", "Livi", "Lombardi", "Lombardini", "Lombardo", "Longo", "Lopez", "Lorenzi", "Lorenzini", "Lorini", "Lotti", "Lu", "Lucchesi", "Lucherini", "Lunghi", "Lupi", "Madiai", "Maestrini", "Maffei", "Maggi", "Maggini", "Magherini", "Magini", "Magnani", "Magnelli", "Magni", "Magnolfi", "Magrini", "Malavolti", "Malevolti", "Manca", "Mancini", "Manetti", "Manfredi", "Mangani", "Mannelli", "Manni", "Mannini", "Mannucci", "Manuelli", "Manzini", "Marcelli", "Marchese", "Marchetti", "Marchi", "Marchiani", "Marchionni", "Marconi", "Marcucci", "Margheri", "Mari", "Mariani", "Marilli", "Marinai", "Marinari", "Marinelli", "Marini", "Marino", "Mariotti", "Marsili", "Martelli", "Martinelli", "Martini", "Martino", "Marzi", "Masi", "Masini", "Masoni", "Massai", "Materassi", "Mattei", "Matteini", "Matteucci", "Matteuzzi", "Mattioli", "Mattolini", "Matucci", "Mauro", "Mazzanti", "Mazzei", "Mazzetti", "Mazzi", "Mazzini", "Mazzocchi", "Mazzoli", "Mazzoni", "Mazzuoli", "Meacci", "Mecocci", "Meini", "Melani", "Mele", "Meli", "Mengoni", "Menichetti", "Meoni", "Merlini", "Messeri", "Messina", "Meucci", "Miccinesi", "Miceli", "Micheli", "Michelini", "Michelozzi", "Migliori", "Migliorini", "Milani", "Miniati", "Misuri", "Monaco", "Montagnani", "Montagni", "Montanari", "Montelatici", "Monti", "Montigiani", "Montini", "Morandi", "Morandini", "Morelli", "Moretti", "Morganti", "Mori", "Morini", "Moroni", "Morozzi", "Mugnai", "Mugnaini", "Mustafa", "Naldi", "Naldini", "Nannelli", "Nanni", "Nannini", "Nannucci", "Nardi", "Nardini", "Nardoni", "Natali", "Ndiaye", "Nencetti", "Nencini", "Nencioni", "Neri", "Nesi", "Nesti", "Niccolai", "Niccoli", "Niccolini", "Nigi", "Nistri", "Nocentini", "Noferini", "Novelli", "Nucci", "Nuti", "Nutini", "Oliva", "Olivieri", "Olmi", "Orlandi", "Orlandini", "Orlando", "Orsini", "Ortolani", "Ottanelli", "Pacciani", "Pace", "Paci", "Pacini", "Pagani", "Pagano", "Paggetti", "Pagliai", "Pagni", "Pagnini", "Paladini", "Palagi", "Palchetti", "Palloni", "Palmieri", "Palumbo", "Pampaloni", "Pancani", "Pandolfi", "Pandolfini", "Panerai", "Panichi", "Paoletti", "Paoli", "Paolini", "Papi", "Papini", "Papucci", "Parenti", "Parigi", "Parisi", "Parri", "Parrini", "Pasquini", "Passeri", "Pecchioli", "Pecorini", "Pellegrini", "Pepi", "Perini", "Perrone", "Peruzzi", "Pesci", "Pestelli", "Petri", "Petrini", "Petrucci", "Pettini", "Pezzati", "Pezzatini", "Piani", "Piazza", "Piazzesi", "Piazzini", "Piccardi", "Picchi", "Piccini", "Piccioli", "Pieraccini", "Pieraccioni", "Pieralli", "Pierattini", "Pieri", "Pierini", "Pieroni", "Pietrini", "Pini", "Pinna", "Pinto", "Pinzani", "Pinzauti", "Piras", "Pisani", "Pistolesi", "Poggesi", "Poggi", "Poggiali", "Poggiolini", "Poli", "Pollastri", "Porciani", "Pozzi", "Pratellesi", "Pratesi", "Prosperi", "Pruneti", "Pucci", "Puccini", "Puccioni", "Pugi", "Pugliese", "Puliti", "Querci", "Quercioli", "Raddi", "Radu", "Raffaelli", "Ragazzini", "Ranfagni", "Ranieri", "Rastrelli", "Raugei", "Raveggi", "Renai", "Renzi", "Rettori", "Ricci", "Ricciardi", "Ridi", "Ridolfi", "Rigacci", "Righi", "Righini", "Rinaldi", "Risaliti", "Ristori", "Rizzo", "Rocchi", "Rocchini", "Rogai", "Romagnoli", "Romanelli", "Romani", "Romano", "Romei", "Romeo", "Romiti", "Romoli", "Romolini", "Rontini", "Rosati", "Roselli", "Rosi", "Rossetti", "Rossi", "Rossini", "Rovai", "Ruggeri", "Ruggiero", "Russo", "Sabatini", "Saccardi", "Sacchetti", "Sacchi", "Sacco", "Salerno", "Salimbeni", "Salucci", "Salvadori", "Salvestrini", "Salvi", "Salvini", "Sanesi", "Sani", "Sanna", "Santi", "Santini", "Santoni", "Santoro", "Santucci", "Sardi", "Sarri", "Sarti", "Sassi", "Sbolci", "Scali", "Scarpelli", "Scarselli", "Scopetani", "Secci", "Selvi", "Senatori", "Senesi", "Serafini", "Sereni", "Serra", "Sestini", "Sguanci", "Sieni", "Signorini", "Silvestri", "Simoncini", "Simonetti", "Simoni", "Singh", "Sodi", "Soldi", "Somigli", "Sorbi", "Sorelli", "Sorrentino", "Sottili", "Spina", "Spinelli", "Staccioli", "Staderini", "Stefanelli", "Stefani", "Stefanini", "Stella", "Susini", "Tacchi", "Tacconi", "Taddei", "Tagliaferri", "Tamburini", "Tanganelli", "Tani", "Tanini", "Tapinassi", "Tarchi", "Tarchiani", "Targioni", "Tassi", "Tassini", "Tempesti", "Terzani", "Tesi", "Testa", "Testi", "Tilli", "Tinti", "Tirinnanzi", "Toccafondi", "Tofanari", "Tofani", "Tognaccini", "Tonelli", "Tonini", "Torelli", "Torrini", "Tosi", "Toti", "Tozzi", "Trambusti", "Trapani", "Tucci", "Turchi", "Ugolini", "Ulivi", "Valente", "Valenti", "Valentini", "Vangelisti", "Vanni", "Vannini", "Vannoni", "Vannozzi", "Vannucchi", "Vannucci", "Ventura", "Venturi", "Venturini", "Vestri", "Vettori", "Vichi", "Viciani", "Vieri", "Vigiani", "Vignoli", "Vignolini", "Vignozzi", "Villani", "Vinci", "Visani", "Vitale", "Vitali", "Viti", "Viviani", "Vivoli", "Volpe", "Volpi", "Wang", "Wu", "Xu", "Yang", "Ye", "Zagli", "Zani", "Zanieri", "Zanobini", "Zecchi", "Zetti", "Zhang", "Zheng", "Zhou", "Zhu", "Zingoni", "Zini", "Zoppi"],
        // http://www.voornamelijk.nl/meest-voorkomende-achternamen-in-nederland-en-amsterdam/
        nl: ["Albers", "Alblas", "Appelman", "Baars", "Baas", "Bakker", "Blank", "Bleeker", "Blok", "Blom", "Boer", "Boers", "Boldewijn", "Boon", "Boot", "Bos", "Bosch", "Bosma", "Bosman", "Bouma", "Bouman", "Bouwman", "Brands", "Brouwer", "Burger", "Buijs", "Buitenhuis", "Ceder", "Cohen", "Dekker", "Dekkers", "Dijkman", "Dijkstra", "Driessen", "Drost", "Engel", "Evers", "Faber", "Franke", "Gerritsen", "Goedhart", "Goossens", "Groen", "Groenenberg", "Groot", "Haan", "Hart", "Heemskerk", "Hendriks", "Hermans", "Hoekstra", "Hofman", "Hopman", "Huisman", "Jacobs", "Jansen", "Janssen", "Jonker", "Jaspers", "Keijzer", "Klaassen", "Klein", "Koek", "Koenders", "Kok", "Kool", "Koopman", "Koopmans", "Koning", "Koster", "Kramer", "Kroon", "Kuijpers", "Kuiper", "Kuipers", "Kurt", "Koster", "Kwakman", "Los", "Lubbers", "Maas", "Markus", "Martens", "Meijer", "Mol", "Molenaar", "Mulder", "Nieuwenhuis", "Peeters", "Peters", "Pengel", "Pieters", "Pool", "Post", "Postma", "Prins", "Pronk", "Reijnders", "Rietveld", "Roest", "Roos", "Sanders", "Schaap", "Scheffer", "Schenk", "Schilder", "Schipper", "Schmidt", "Scholten", "Schouten", "Schut", "Schutte", "Schuurman", "Simons", "Smeets", "Smit", "Smits", "Snel", "Swinkels", "Tas", "Terpstra", "Timmermans", "Tol", "Tromp", "Troost", "Valk", "Veenstra", "Veldkamp", "Verbeek", "Verheul", "Verhoeven", "Vermeer", "Vermeulen", "Verweij", "Vink", "Visser", "Voorn", "Vos", "Wagenaar", "Wiersema", "Willems", "Willemsen", "Witteveen", "Wolff", "Wolters", "Zijlstra", "Zwart", "de Beer", "de Boer", "de Bruijn", "de Bruin", "de Graaf", "de Groot", "de Haan", "de Haas", "de Jager", "de Jong", "de Jonge", "de Koning", "de Lange", "de Leeuw", "de Ridder", "de Rooij", "de Ruiter", "de Vos", "de Vries", "de Waal", "de Wit", "de Zwart", "van Beek", "van Boven", "van Dam", "van Dijk", "van Dongen", "van Doorn", "van Egmond", "van Eijk", "van Es", "van Gelder", "van Gelderen", "van Houten", "van Hulst", "van Kempen", "van Kesteren", "van Leeuwen", "van Loon", "van Mill", "van Noord", "van Ommen", "van Ommeren", "van Oosten", "van Oostveen", "van Rijn", "van Schaik", "van Veen", "van Vliet", "van Wijk", "van Wijngaarden", "van den Poel", "van de Pol", "van den Ploeg", "van de Ven", "van den Berg", "van den Bosch", "van den Brink", "van den Broek", "van den Heuvel", "van der Heijden", "van der Horst", "van der Hulst", "van der Kroon", "van der Laan", "van der Linden", "van der Meer", "van der Meij", "van der Meulen", "van der Molen", "van der Sluis", "van der Spek", "van der Veen", "van der Velde", "van der Velden", "van der Vliet", "van der Wal"],
        // https://surnames.behindthename.com/top/lists/england-wales/1991
        uk: ["Smith", "Jones", "Williams", "Taylor", "Brown", "Davies", "Evans", "Wilson", "Thomas", "Johnson", "Roberts", "Robinson", "Thompson", "Wright", "Walker", "White", "Edwards", "Hughes", "Green", "Hall", "Lewis", "Harris", "Clarke", "Patel", "Jackson", "Wood", "Turner", "Martin", "Cooper", "Hill", "Ward", "Morris", "Moore", "Clark", "Lee", "King", "Baker", "Harrison", "Morgan", "Allen", "James", "Scott", "Phillips", "Watson", "Davis", "Parker", "Price", "Bennett", "Young", "Griffiths", "Mitchell", "Kelly", "Cook", "Carter", "Richardson", "Bailey", "Collins", "Bell", "Shaw", "Murphy", "Miller", "Cox", "Richards", "Khan", "Marshall", "Anderson", "Simpson", "Ellis", "Adams", "Singh", "Begum", "Wilkinson", "Foster", "Chapman", "Powell", "Webb", "Rogers", "Gray", "Mason", "Ali", "Hunt", "Hussain", "Campbell", "Matthews", "Owen", "Palmer", "Holmes", "Mills", "Barnes", "Knight", "Lloyd", "Butler", "Russell", "Barker", "Fisher", "Stevens", "Jenkins", "Murray", "Dixon", "Harvey", "Graham", "Pearson", "Ahmed", "Fletcher", "Walsh", "Kaur", "Gibson", "Howard", "Andrews", "Stewart", "Elliott", "Reynolds", "Saunders", "Payne", "Fox", "Ford", "Pearce", "Day", "Brooks", "West", "Lawrence", "Cole", "Atkinson", "Bradley", "Spencer", "Gill", "Dawson", "Ball", "Burton", "O'brien", "Watts", "Rose", "Booth", "Perry", "Ryan", "Grant", "Wells", "Armstrong", "Francis", "Rees", "Hayes", "Hart", "Hudson", "Newman", "Barrett", "Webster", "Hunter", "Gregory", "Carr", "Lowe", "Page", "Marsh", "Riley", "Dunn", "Woods", "Parsons", "Berry", "Stone", "Reid", "Holland", "Hawkins", "Harding", "Porter", "Robertson", "Newton", "Oliver", "Reed", "Kennedy", "Williamson", "Bird", "Gardner", "Shah", "Dean", "Lane", "Cooke", "Bates", "Henderson", "Parry", "Burgess", "Bishop", "Walton", "Burns", "Nicholson", "Shepherd", "Ross", "Cross", "Long", "Freeman", "Warren", "Nicholls", "Hamilton", "Byrne", "Sutton", "Mcdonald", "Yates", "Hodgson", "Robson", "Curtis", "Hopkins", "O'connor", "Harper", "Coleman", "Watkins", "Moss", "Mccarthy", "Chambers", "O'neill", "Griffin", "Sharp", "Hardy", "Wheeler", "Potter", "Osborne", "Johnston", "Gordon", "Doyle", "Wallace", "George", "Jordan", "Hutchinson", "Rowe", "Burke", "May", "Pritchard", "Gilbert", "Willis", "Higgins", "Read", "Miles", "Stevenson", "Stephenson", "Hammond", "Arnold", "Buckley", "Walters", "Hewitt", "Barber", "Nelson", "Slater", "Austin", "Sullivan", "Whitehead", "Mann", "Frost", "Lambert", "Stephens", "Blake", "Akhtar", "Lynch", "Goodwin", "Barton", "Woodward", "Thomson", "Cunningham", "Quinn", "Barnett", "Baxter", "Bibi", "Clayton", "Nash", "Greenwood", "Jennings", "Holt", "Kemp", "Poole", "Gallagher", "Bond", "Stokes", "Tucker", "Davidson", "Fowler", "Heath", "Norman", "Middleton", "Lawson", "Banks", "French", "Stanley", "Jarvis", "Gibbs", "Ferguson", "Hayward", "Carroll", "Douglas", "Dickinson", "Todd", "Barlow", "Peters", "Lucas", "Knowles", "Hartley", "Miah", "Simmons", "Morton", "Alexander", "Field", "Morrison", "Norris", "Townsend", "Preston", "Hancock", "Thornton", "Baldwin", "Burrows", "Briggs", "Parkinson", "Reeves", "Macdonald", "Lamb", "Black", "Abbott", "Sanders", "Thorpe", "Holden", "Tomlinson", "Perkins", "Ashton", "Rhodes", "Fuller", "Howe", "Bryant", "Vaughan", "Dale", "Davey", "Weston", "Bartlett", "Whittaker", "Davison", "Kent", "Skinner", "Birch", "Morley", "Daniels", "Glover", "Howell", "Cartwright", "Pugh", "Humphreys", "Goddard", "Brennan", "Wall", "Kirby", "Bowen", "Savage", "Bull", "Wong", "Dobson", "Smart", "Wilkins", "Kirk", "Fraser", "Duffy", "Hicks", "Patterson", "Bradshaw", "Little", "Archer", "Warner", "Waters", "O'sullivan", "Farrell", "Brookes", "Atkins", "Kay", "Dodd", "Bentley", "Flynn", "John", "Schofield", "Short", "Haynes", "Wade", "Butcher", "Henry", "Sanderson", "Crawford", "Sheppard", "Bolton", "Coates", "Giles", "Gould", "Houghton", "Gibbons", "Pratt", "Manning", "Law", "Hooper", "Noble", "Dyer", "Rahman", "Clements", "Moran", "Sykes", "Chan", "Doherty", "Connolly", "Joyce", "Franklin", "Hobbs", "Coles", "Herbert", "Steele", "Kerr", "Leach", "Winter", "Owens", "Duncan", "Naylor", "Fleming", "Horton", "Finch", "Fitzgerald", "Randall", "Carpenter", "Marsden", "Browne", "Garner", "Pickering", "Hale", "Dennis", "Vincent", "Chadwick", "Chandler", "Sharpe", "Nolan", "Lyons", "Hurst", "Collier", "Peacock", "Howarth", "Faulkner", "Rice", "Pollard", "Welch", "Norton", "Gough", "Sinclair", "Blackburn", "Bryan", "Conway", "Power", "Cameron", "Daly", "Allan", "Hanson", "Gardiner", "Boyle", "Myers", "Turnbull", "Wallis", "Mahmood", "Sims", "Swift", "Iqbal", "Pope", "Brady", "Chamberlain", "Rowley", "Tyler", "Farmer", "Metcalfe", "Hilton", "Godfrey", "Holloway", "Parkin", "Bray", "Talbot", "Donnelly", "Nixon", "Charlton", "Benson", "Whitehouse", "Barry", "Hope", "Lord", "North", "Storey", "Connor", "Potts", "Bevan", "Hargreaves", "Mclean", "Mistry", "Bruce", "Howells", "Hyde", "Parkes", "Wyatt", "Fry", "Lees", "O'donnell", "Craig", "Forster", "Mckenzie", "Humphries", "Mellor", "Carey", "Ingram", "Summers", "Leonard"],
        // https://surnames.behindthename.com/top/lists/germany/2017
        de: ["M\xFCller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann", "Sch\xE4fer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schr\xF6der", "Neumann", "Schwarz", "Zimmermann", "Braun", "Kr\xFCger", "Hofmann", "Hartmann", "Lange", "Schmitt", "Werner", "Schmitz", "Krause", "Meier", "Lehmann", "Schmid", "Schulze", "Maier", "K\xF6hler", "Herrmann", "K\xF6nig", "Walter", "Mayer", "Huber", "Kaiser", "Fuchs", "Peters", "Lang", "Scholz", "M\xF6ller", "Wei\xDF", "Jung", "Hahn", "Schubert", "Vogel", "Friedrich", "Keller", "G\xFCnther", "Frank", "Berger", "Winkler", "Roth", "Beck", "Lorenz", "Baumann", "Franke", "Albrecht", "Schuster", "Simon", "Ludwig", "B\xF6hm", "Winter", "Kraus", "Martin", "Schumacher", "Kr\xE4mer", "Vogt", "Stein", "J\xE4ger", "Otto", "Sommer", "Gro\xDF", "Seidel", "Heinrich", "Brandt", "Haas", "Schreiber", "Graf", "Schulte", "Dietrich", "Ziegler", "Kuhn", "K\xFChn", "Pohl", "Engel", "Horn", "Busch", "Bergmann", "Thomas", "Voigt", "Sauer", "Arnold", "Wolff", "Pfeiffer"],
        // http://www.japantimes.co.jp/life/2009/10/11/lifestyle/japans-top-100-most-common-family-names/
        jp: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Kato", "Yoshida", "Yamada", "Sasaki", "Yamaguchi", "Saito", "Matsumoto", "Inoue", "Kimura", "Hayashi", "Shimizu", "Yamazaki", "Mori", "Abe", "Ikeda", "Hashimoto", "Yamashita", "Ishikawa", "Nakajima", "Maeda", "Fujita", "Ogawa", "Goto", "Okada", "Hasegawa", "Murakami", "Kondo", "Ishii", "Saito", "Sakamoto", "Endo", "Aoki", "Fujii", "Nishimura", "Fukuda", "Ota", "Miura", "Fujiwara", "Okamoto", "Matsuda", "Nakagawa", "Nakano", "Harada", "Ono", "Tamura", "Takeuchi", "Kaneko", "Wada", "Nakayama", "Ishida", "Ueda", "Morita", "Hara", "Shibata", "Sakai", "Kudo", "Yokoyama", "Miyazaki", "Miyamoto", "Uchida", "Takagi", "Ando", "Taniguchi", "Ohno", "Maruyama", "Imai", "Takada", "Fujimoto", "Takeda", "Murata", "Ueno", "Sugiyama", "Masuda", "Sugawara", "Hirano", "Kojima", "Otsuka", "Chiba", "Kubo", "Matsui", "Iwasaki", "Sakurai", "Kinoshita", "Noguchi", "Matsuo", "Nomura", "Kikuchi", "Sano", "Onishi", "Sugimoto", "Arai"],
        // http://www.lowchensaustralia.com/names/popular-spanish-names.htm
        es: ["Garcia", "Fernandez", "Lopez", "Martinez", "Gonzalez", "Rodriguez", "Sanchez", "Perez", "Martin", "Gomez", "Ruiz", "Diaz", "Hernandez", "Alvarez", "Jimenez", "Moreno", "Munoz", "Alonso", "Romero", "Navarro", "Gutierrez", "Torres", "Dominguez", "Gil", "Vazquez", "Blanco", "Serrano", "Ramos", "Castro", "Suarez", "Sanz", "Rubio", "Ortega", "Molina", "Delgado", "Ortiz", "Morales", "Ramirez", "Marin", "Iglesias", "Santos", "Castillo", "Garrido", "Calvo", "Pena", "Cruz", "Cano", "Nunez", "Prieto", "Diez", "Lozano", "Vidal", "Pascual", "Ferrer", "Medina", "Vega", "Leon", "Herrero", "Vicente", "Mendez", "Guerrero", "Fuentes", "Campos", "Nieto", "Cortes", "Caballero", "Ibanez", "Lorenzo", "Pastor", "Gimenez", "Saez", "Soler", "Marquez", "Carrasco", "Herrera", "Montero", "Arias", "Crespo", "Flores", "Andres", "Aguilar", "Hidalgo", "Cabrera", "Mora", "Duran", "Velasco", "Rey", "Pardo", "Roman", "Vila", "Bravo", "Merino", "Moya", "Soto", "Izquierdo", "Reyes", "Redondo", "Marcos", "Carmona", "Menendez"],
        // Data taken from https://fr.wikipedia.org/wiki/Liste_des_noms_de_famille_les_plus_courants_en_France
        fr: ["Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon", "Michel", "Lef\xE8vre", "Leroy", "Roux", "David", "Bertrand", "Morel", "Fournier", "Girard", "Bonnet", "Dupont", "Lambert", "Fontaine", "Rousseau", "Vincent", "M\xFCller", "Lef\xE8vre", "Faure", "Andr\xE9", "Mercier", "Blanc", "Gu\xE9rin", "Boyer", "Garnier", "Chevalier", "Fran\xE7ois", "Legrand", "Gauthier", "Garcia", "Perrin", "Robin", "Cl\xE9ment", "Morin", "Nicolas", "Henry", "Roussel", "Matthieu", "Gautier", "Masson", "Marchand", "Duval", "Denis", "Dumont", "Marie", "Lemaire", "No\xEBl", "Meyer", "Dufour", "Meunier", "Brun", "Blanchard", "Giraud", "Joly", "Rivi\xE8re", "Lucas", "Brunet", "Gaillard", "Barbier", "Arnaud", "Mart\xEDnez", "G\xE9rard", "Roche", "Renard", "Schmitt", "Roy", "Leroux", "Colin", "Vidal", "Caron", "Picard", "Roger", "Fabre", "Aubert", "Lemoine", "Renaud", "Dumas", "Lacroix", "Olivier", "Philippe", "Bourgeois", "Pierre", "Beno\xEEt", "Rey", "Leclerc", "Payet", "Rolland", "Leclercq", "Guillaume", "Lecomte", "L\xF3pez", "Jean", "Dupuy", "Guillot", "Hubert", "Berger", "Carpentier", "S\xE1nchez", "Dupuis", "Moulin", "Louis", "Deschamps", "Huet", "Vasseur", "Perez", "Boucher", "Fleury", "Royer", "Klein", "Jacquet", "Adam", "Paris", "Poirier", "Marty", "Aubry", "Guyot", "Carr\xE9", "Charles", "Renault", "Charpentier", "M\xE9nard", "Maillard", "Baron", "Bertin", "Bailly", "Herv\xE9", "Schneider", "Fern\xE1ndez", "Le GallGall", "Collet", "L\xE9ger", "Bouvier", "Julien", "Pr\xE9vost", "Millet", "Perrot", "Daniel", "Le RouxRoux", "Cousin", "Germain", "Breton", "Besson", "Langlois", "R\xE9mi", "Le GoffGoff", "Pelletier", "L\xE9v\xEAque", "Perrier", "Leblanc", "Barr\xE9", "Lebrun", "Marchal", "Weber", "Mallet", "Hamon", "Boulanger", "Jacob", "Monnier", "Michaud", "Rodr\xEDguez", "Guichard", "Gillet", "\xC9tienne", "Grondin", "Poulain", "Tessier", "Chevallier", "Collin", "Chauvin", "Da SilvaSilva", "Bouchet", "Gay", "Lema\xEEtre", "B\xE9nard", "Mar\xE9chal", "Humbert", "Reynaud", "Antoine", "Hoarau", "Perret", "Barth\xE9lemy", "Cordier", "Pichon", "Lejeune", "Gilbert", "Lamy", "Delaunay", "Pasquier", "Carlier", "LaporteLaporte"]
      },
      // Data taken from http://geoportal.statistics.gov.uk/datasets/ons-postcode-directory-latest-centroids
      postcodeAreas: [{ code: "AB" }, { code: "AL" }, { code: "B" }, { code: "BA" }, { code: "BB" }, { code: "BD" }, { code: "BH" }, { code: "BL" }, { code: "BN" }, { code: "BR" }, { code: "BS" }, { code: "BT" }, { code: "CA" }, { code: "CB" }, { code: "CF" }, { code: "CH" }, { code: "CM" }, { code: "CO" }, { code: "CR" }, { code: "CT" }, { code: "CV" }, { code: "CW" }, { code: "DA" }, { code: "DD" }, { code: "DE" }, { code: "DG" }, { code: "DH" }, { code: "DL" }, { code: "DN" }, { code: "DT" }, { code: "DY" }, { code: "E" }, { code: "EC" }, { code: "EH" }, { code: "EN" }, { code: "EX" }, { code: "FK" }, { code: "FY" }, { code: "G" }, { code: "GL" }, { code: "GU" }, { code: "GY" }, { code: "HA" }, { code: "HD" }, { code: "HG" }, { code: "HP" }, { code: "HR" }, { code: "HS" }, { code: "HU" }, { code: "HX" }, { code: "IG" }, { code: "IM" }, { code: "IP" }, { code: "IV" }, { code: "JE" }, { code: "KA" }, { code: "KT" }, { code: "KW" }, { code: "KY" }, { code: "L" }, { code: "LA" }, { code: "LD" }, { code: "LE" }, { code: "LL" }, { code: "LN" }, { code: "LS" }, { code: "LU" }, { code: "M" }, { code: "ME" }, { code: "MK" }, { code: "ML" }, { code: "N" }, { code: "NE" }, { code: "NG" }, { code: "NN" }, { code: "NP" }, { code: "NR" }, { code: "NW" }, { code: "OL" }, { code: "OX" }, { code: "PA" }, { code: "PE" }, { code: "PH" }, { code: "PL" }, { code: "PO" }, { code: "PR" }, { code: "RG" }, { code: "RH" }, { code: "RM" }, { code: "S" }, { code: "SA" }, { code: "SE" }, { code: "SG" }, { code: "SK" }, { code: "SL" }, { code: "SM" }, { code: "SN" }, { code: "SO" }, { code: "SP" }, { code: "SR" }, { code: "SS" }, { code: "ST" }, { code: "SW" }, { code: "SY" }, { code: "TA" }, { code: "TD" }, { code: "TF" }, { code: "TN" }, { code: "TQ" }, { code: "TR" }, { code: "TS" }, { code: "TW" }, { code: "UB" }, { code: "W" }, { code: "WA" }, { code: "WC" }, { code: "WD" }, { code: "WF" }, { code: "WN" }, { code: "WR" }, { code: "WS" }, { code: "WV" }, { code: "YO" }, { code: "ZE" }],
      // Data taken from https://github.com/umpirsky/country-list/blob/master/data/en_US/country.json
      countries: [{ name: "Afghanistan", abbreviation: "AF" }, { name: "\xC5land Islands", abbreviation: "AX" }, { name: "Albania", abbreviation: "AL" }, { name: "Algeria", abbreviation: "DZ" }, { name: "American Samoa", abbreviation: "AS" }, { name: "Andorra", abbreviation: "AD" }, { name: "Angola", abbreviation: "AO" }, { name: "Anguilla", abbreviation: "AI" }, { name: "Antarctica", abbreviation: "AQ" }, { name: "Antigua & Barbuda", abbreviation: "AG" }, { name: "Argentina", abbreviation: "AR" }, { name: "Armenia", abbreviation: "AM" }, { name: "Aruba", abbreviation: "AW" }, { name: "Ascension Island", abbreviation: "AC" }, { name: "Australia", abbreviation: "AU" }, { name: "Austria", abbreviation: "AT" }, { name: "Azerbaijan", abbreviation: "AZ" }, { name: "Bahamas", abbreviation: "BS" }, { name: "Bahrain", abbreviation: "BH" }, { name: "Bangladesh", abbreviation: "BD" }, { name: "Barbados", abbreviation: "BB" }, { name: "Belarus", abbreviation: "BY" }, { name: "Belgium", abbreviation: "BE" }, { name: "Belize", abbreviation: "BZ" }, { name: "Benin", abbreviation: "BJ" }, { name: "Bermuda", abbreviation: "BM" }, { name: "Bhutan", abbreviation: "BT" }, { name: "Bolivia", abbreviation: "BO" }, { name: "Bosnia & Herzegovina", abbreviation: "BA" }, { name: "Botswana", abbreviation: "BW" }, { name: "Brazil", abbreviation: "BR" }, { name: "British Indian Ocean Territory", abbreviation: "IO" }, { name: "British Virgin Islands", abbreviation: "VG" }, { name: "Brunei", abbreviation: "BN" }, { name: "Bulgaria", abbreviation: "BG" }, { name: "Burkina Faso", abbreviation: "BF" }, { name: "Burundi", abbreviation: "BI" }, { name: "Cambodia", abbreviation: "KH" }, { name: "Cameroon", abbreviation: "CM" }, { name: "Canada", abbreviation: "CA" }, { name: "Canary Islands", abbreviation: "IC" }, { name: "Cape Verde", abbreviation: "CV" }, { name: "Caribbean Netherlands", abbreviation: "BQ" }, { name: "Cayman Islands", abbreviation: "KY" }, { name: "Central African Republic", abbreviation: "CF" }, { name: "Ceuta & Melilla", abbreviation: "EA" }, { name: "Chad", abbreviation: "TD" }, { name: "Chile", abbreviation: "CL" }, { name: "China", abbreviation: "CN" }, { name: "Christmas Island", abbreviation: "CX" }, { name: "Cocos (Keeling) Islands", abbreviation: "CC" }, { name: "Colombia", abbreviation: "CO" }, { name: "Comoros", abbreviation: "KM" }, { name: "Congo - Brazzaville", abbreviation: "CG" }, { name: "Congo - Kinshasa", abbreviation: "CD" }, { name: "Cook Islands", abbreviation: "CK" }, { name: "Costa Rica", abbreviation: "CR" }, { name: "C\xF4te d'Ivoire", abbreviation: "CI" }, { name: "Croatia", abbreviation: "HR" }, { name: "Cuba", abbreviation: "CU" }, { name: "Cura\xE7ao", abbreviation: "CW" }, { name: "Cyprus", abbreviation: "CY" }, { name: "Czech Republic", abbreviation: "CZ" }, { name: "Denmark", abbreviation: "DK" }, { name: "Diego Garcia", abbreviation: "DG" }, { name: "Djibouti", abbreviation: "DJ" }, { name: "Dominica", abbreviation: "DM" }, { name: "Dominican Republic", abbreviation: "DO" }, { name: "Ecuador", abbreviation: "EC" }, { name: "Egypt", abbreviation: "EG" }, { name: "El Salvador", abbreviation: "SV" }, { name: "Equatorial Guinea", abbreviation: "GQ" }, { name: "Eritrea", abbreviation: "ER" }, { name: "Estonia", abbreviation: "EE" }, { name: "Ethiopia", abbreviation: "ET" }, { name: "Falkland Islands", abbreviation: "FK" }, { name: "Faroe Islands", abbreviation: "FO" }, { name: "Fiji", abbreviation: "FJ" }, { name: "Finland", abbreviation: "FI" }, { name: "France", abbreviation: "FR" }, { name: "French Guiana", abbreviation: "GF" }, { name: "French Polynesia", abbreviation: "PF" }, { name: "French Southern Territories", abbreviation: "TF" }, { name: "Gabon", abbreviation: "GA" }, { name: "Gambia", abbreviation: "GM" }, { name: "Georgia", abbreviation: "GE" }, { name: "Germany", abbreviation: "DE" }, { name: "Ghana", abbreviation: "GH" }, { name: "Gibraltar", abbreviation: "GI" }, { name: "Greece", abbreviation: "GR" }, { name: "Greenland", abbreviation: "GL" }, { name: "Grenada", abbreviation: "GD" }, { name: "Guadeloupe", abbreviation: "GP" }, { name: "Guam", abbreviation: "GU" }, { name: "Guatemala", abbreviation: "GT" }, { name: "Guernsey", abbreviation: "GG" }, { name: "Guinea", abbreviation: "GN" }, { name: "Guinea-Bissau", abbreviation: "GW" }, { name: "Guyana", abbreviation: "GY" }, { name: "Haiti", abbreviation: "HT" }, { name: "Honduras", abbreviation: "HN" }, { name: "Hong Kong SAR China", abbreviation: "HK" }, { name: "Hungary", abbreviation: "HU" }, { name: "Iceland", abbreviation: "IS" }, { name: "India", abbreviation: "IN" }, { name: "Indonesia", abbreviation: "ID" }, { name: "Iran", abbreviation: "IR" }, { name: "Iraq", abbreviation: "IQ" }, { name: "Ireland", abbreviation: "IE" }, { name: "Isle of Man", abbreviation: "IM" }, { name: "Israel", abbreviation: "IL" }, { name: "Italy", abbreviation: "IT" }, { name: "Jamaica", abbreviation: "JM" }, { name: "Japan", abbreviation: "JP" }, { name: "Jersey", abbreviation: "JE" }, { name: "Jordan", abbreviation: "JO" }, { name: "Kazakhstan", abbreviation: "KZ" }, { name: "Kenya", abbreviation: "KE" }, { name: "Kiribati", abbreviation: "KI" }, { name: "Kosovo", abbreviation: "XK" }, { name: "Kuwait", abbreviation: "KW" }, { name: "Kyrgyzstan", abbreviation: "KG" }, { name: "Laos", abbreviation: "LA" }, { name: "Latvia", abbreviation: "LV" }, { name: "Lebanon", abbreviation: "LB" }, { name: "Lesotho", abbreviation: "LS" }, { name: "Liberia", abbreviation: "LR" }, { name: "Libya", abbreviation: "LY" }, { name: "Liechtenstein", abbreviation: "LI" }, { name: "Lithuania", abbreviation: "LT" }, { name: "Luxembourg", abbreviation: "LU" }, { name: "Macau SAR China", abbreviation: "MO" }, { name: "Macedonia", abbreviation: "MK" }, { name: "Madagascar", abbreviation: "MG" }, { name: "Malawi", abbreviation: "MW" }, { name: "Malaysia", abbreviation: "MY" }, { name: "Maldives", abbreviation: "MV" }, { name: "Mali", abbreviation: "ML" }, { name: "Malta", abbreviation: "MT" }, { name: "Marshall Islands", abbreviation: "MH" }, { name: "Martinique", abbreviation: "MQ" }, { name: "Mauritania", abbreviation: "MR" }, { name: "Mauritius", abbreviation: "MU" }, { name: "Mayotte", abbreviation: "YT" }, { name: "Mexico", abbreviation: "MX" }, { name: "Micronesia", abbreviation: "FM" }, { name: "Moldova", abbreviation: "MD" }, { name: "Monaco", abbreviation: "MC" }, { name: "Mongolia", abbreviation: "MN" }, { name: "Montenegro", abbreviation: "ME" }, { name: "Montserrat", abbreviation: "MS" }, { name: "Morocco", abbreviation: "MA" }, { name: "Mozambique", abbreviation: "MZ" }, { name: "Myanmar (Burma)", abbreviation: "MM" }, { name: "Namibia", abbreviation: "NA" }, { name: "Nauru", abbreviation: "NR" }, { name: "Nepal", abbreviation: "NP" }, { name: "Netherlands", abbreviation: "NL" }, { name: "New Caledonia", abbreviation: "NC" }, { name: "New Zealand", abbreviation: "NZ" }, { name: "Nicaragua", abbreviation: "NI" }, { name: "Niger", abbreviation: "NE" }, { name: "Nigeria", abbreviation: "NG" }, { name: "Niue", abbreviation: "NU" }, { name: "Norfolk Island", abbreviation: "NF" }, { name: "North Korea", abbreviation: "KP" }, { name: "Northern Mariana Islands", abbreviation: "MP" }, { name: "Norway", abbreviation: "NO" }, { name: "Oman", abbreviation: "OM" }, { name: "Pakistan", abbreviation: "PK" }, { name: "Palau", abbreviation: "PW" }, { name: "Palestinian Territories", abbreviation: "PS" }, { name: "Panama", abbreviation: "PA" }, { name: "Papua New Guinea", abbreviation: "PG" }, { name: "Paraguay", abbreviation: "PY" }, { name: "Peru", abbreviation: "PE" }, { name: "Philippines", abbreviation: "PH" }, { name: "Pitcairn Islands", abbreviation: "PN" }, { name: "Poland", abbreviation: "PL" }, { name: "Portugal", abbreviation: "PT" }, { name: "Puerto Rico", abbreviation: "PR" }, { name: "Qatar", abbreviation: "QA" }, { name: "R\xE9union", abbreviation: "RE" }, { name: "Romania", abbreviation: "RO" }, { name: "Russia", abbreviation: "RU" }, { name: "Rwanda", abbreviation: "RW" }, { name: "Samoa", abbreviation: "WS" }, { name: "San Marino", abbreviation: "SM" }, { name: "S\xE3o Tom\xE9 and Pr\xEDncipe", abbreviation: "ST" }, { name: "Saudi Arabia", abbreviation: "SA" }, { name: "Senegal", abbreviation: "SN" }, { name: "Serbia", abbreviation: "RS" }, { name: "Seychelles", abbreviation: "SC" }, { name: "Sierra Leone", abbreviation: "SL" }, { name: "Singapore", abbreviation: "SG" }, { name: "Sint Maarten", abbreviation: "SX" }, { name: "Slovakia", abbreviation: "SK" }, { name: "Slovenia", abbreviation: "SI" }, { name: "Solomon Islands", abbreviation: "SB" }, { name: "Somalia", abbreviation: "SO" }, { name: "South Africa", abbreviation: "ZA" }, { name: "South Georgia & South Sandwich Islands", abbreviation: "GS" }, { name: "South Korea", abbreviation: "KR" }, { name: "South Sudan", abbreviation: "SS" }, { name: "Spain", abbreviation: "ES" }, { name: "Sri Lanka", abbreviation: "LK" }, { name: "St. Barth\xE9lemy", abbreviation: "BL" }, { name: "St. Helena", abbreviation: "SH" }, { name: "St. Kitts & Nevis", abbreviation: "KN" }, { name: "St. Lucia", abbreviation: "LC" }, { name: "St. Martin", abbreviation: "MF" }, { name: "St. Pierre & Miquelon", abbreviation: "PM" }, { name: "St. Vincent & Grenadines", abbreviation: "VC" }, { name: "Sudan", abbreviation: "SD" }, { name: "Suriname", abbreviation: "SR" }, { name: "Svalbard & Jan Mayen", abbreviation: "SJ" }, { name: "Swaziland", abbreviation: "SZ" }, { name: "Sweden", abbreviation: "SE" }, { name: "Switzerland", abbreviation: "CH" }, { name: "Syria", abbreviation: "SY" }, { name: "Taiwan", abbreviation: "TW" }, { name: "Tajikistan", abbreviation: "TJ" }, { name: "Tanzania", abbreviation: "TZ" }, { name: "Thailand", abbreviation: "TH" }, { name: "Timor-Leste", abbreviation: "TL" }, { name: "Togo", abbreviation: "TG" }, { name: "Tokelau", abbreviation: "TK" }, { name: "Tonga", abbreviation: "TO" }, { name: "Trinidad & Tobago", abbreviation: "TT" }, { name: "Tristan da Cunha", abbreviation: "TA" }, { name: "Tunisia", abbreviation: "TN" }, { name: "Turkey", abbreviation: "TR" }, { name: "Turkmenistan", abbreviation: "TM" }, { name: "Turks & Caicos Islands", abbreviation: "TC" }, { name: "Tuvalu", abbreviation: "TV" }, { name: "U.S. Outlying Islands", abbreviation: "UM" }, { name: "U.S. Virgin Islands", abbreviation: "VI" }, { name: "Uganda", abbreviation: "UG" }, { name: "Ukraine", abbreviation: "UA" }, { name: "United Arab Emirates", abbreviation: "AE" }, { name: "United Kingdom", abbreviation: "GB" }, { name: "United States", abbreviation: "US" }, { name: "Uruguay", abbreviation: "UY" }, { name: "Uzbekistan", abbreviation: "UZ" }, { name: "Vanuatu", abbreviation: "VU" }, { name: "Vatican City", abbreviation: "VA" }, { name: "Venezuela", abbreviation: "VE" }, { name: "Vietnam", abbreviation: "VN" }, { name: "Wallis & Futuna", abbreviation: "WF" }, { name: "Western Sahara", abbreviation: "EH" }, { name: "Yemen", abbreviation: "YE" }, { name: "Zambia", abbreviation: "ZM" }, { name: "Zimbabwe", abbreviation: "ZW" }],
      counties: {
        // Data taken from http://www.downloadexcelfiles.com/gb_en/download-excel-file-list-counties-uk
        uk: [
          { name: "Bath and North East Somerset" },
          { name: "Aberdeenshire" },
          { name: "Anglesey" },
          { name: "Angus" },
          { name: "Bedford" },
          { name: "Blackburn with Darwen" },
          { name: "Blackpool" },
          { name: "Bournemouth" },
          { name: "Bracknell Forest" },
          { name: "Brighton & Hove" },
          { name: "Bristol" },
          { name: "Buckinghamshire" },
          { name: "Cambridgeshire" },
          { name: "Carmarthenshire" },
          { name: "Central Bedfordshire" },
          { name: "Ceredigion" },
          { name: "Cheshire East" },
          { name: "Cheshire West and Chester" },
          { name: "Clackmannanshire" },
          { name: "Conwy" },
          { name: "Cornwall" },
          { name: "County Antrim" },
          { name: "County Armagh" },
          { name: "County Down" },
          { name: "County Durham" },
          { name: "County Fermanagh" },
          { name: "County Londonderry" },
          { name: "County Tyrone" },
          { name: "Cumbria" },
          { name: "Darlington" },
          { name: "Denbighshire" },
          { name: "Derby" },
          { name: "Derbyshire" },
          { name: "Devon" },
          { name: "Dorset" },
          { name: "Dumfries and Galloway" },
          { name: "Dundee" },
          { name: "East Lothian" },
          { name: "East Riding of Yorkshire" },
          { name: "East Sussex" },
          { name: "Edinburgh?" },
          { name: "Essex" },
          { name: "Falkirk" },
          { name: "Fife" },
          { name: "Flintshire" },
          { name: "Gloucestershire" },
          { name: "Greater London" },
          { name: "Greater Manchester" },
          { name: "Gwent" },
          { name: "Gwynedd" },
          { name: "Halton" },
          { name: "Hampshire" },
          { name: "Hartlepool" },
          { name: "Herefordshire" },
          { name: "Hertfordshire" },
          { name: "Highlands" },
          { name: "Hull" },
          { name: "Isle of Wight" },
          { name: "Isles of Scilly" },
          { name: "Kent" },
          { name: "Lancashire" },
          { name: "Leicester" },
          { name: "Leicestershire" },
          { name: "Lincolnshire" },
          { name: "Lothian" },
          { name: "Luton" },
          { name: "Medway" },
          { name: "Merseyside" },
          { name: "Mid Glamorgan" },
          { name: "Middlesbrough" },
          { name: "Milton Keynes" },
          { name: "Monmouthshire" },
          { name: "Moray" },
          { name: "Norfolk" },
          { name: "North East Lincolnshire" },
          { name: "North Lincolnshire" },
          { name: "North Somerset" },
          { name: "North Yorkshire" },
          { name: "Northamptonshire" },
          { name: "Northumberland" },
          { name: "Nottingham" },
          { name: "Nottinghamshire" },
          { name: "Oxfordshire" },
          { name: "Pembrokeshire" },
          { name: "Perth and Kinross" },
          { name: "Peterborough" },
          { name: "Plymouth" },
          { name: "Poole" },
          { name: "Portsmouth" },
          { name: "Powys" },
          { name: "Reading" },
          { name: "Redcar and Cleveland" },
          { name: "Rutland" },
          { name: "Scottish Borders" },
          { name: "Shropshire" },
          { name: "Slough" },
          { name: "Somerset" },
          { name: "South Glamorgan" },
          { name: "South Gloucestershire" },
          { name: "South Yorkshire" },
          { name: "Southampton" },
          { name: "Southend-on-Sea" },
          { name: "Staffordshire" },
          { name: "Stirlingshire" },
          { name: "Stockton-on-Tees" },
          { name: "Stoke-on-Trent" },
          { name: "Strathclyde" },
          { name: "Suffolk" },
          { name: "Surrey" },
          { name: "Swindon" },
          { name: "Telford and Wrekin" },
          { name: "Thurrock" },
          { name: "Torbay" },
          { name: "Tyne and Wear" },
          { name: "Warrington" },
          { name: "Warwickshire" },
          { name: "West Berkshire" },
          { name: "West Glamorgan" },
          { name: "West Lothian" },
          { name: "West Midlands" },
          { name: "West Sussex" },
          { name: "West Yorkshire" },
          { name: "Western Isles" },
          { name: "Wiltshire" },
          { name: "Windsor and Maidenhead" },
          { name: "Wokingham" },
          { name: "Worcestershire" },
          { name: "Wrexham" },
          { name: "York" }
        ]
      },
      provinces: {
        ca: [
          { name: "Alberta", abbreviation: "AB" },
          { name: "British Columbia", abbreviation: "BC" },
          { name: "Manitoba", abbreviation: "MB" },
          { name: "New Brunswick", abbreviation: "NB" },
          { name: "Newfoundland and Labrador", abbreviation: "NL" },
          { name: "Nova Scotia", abbreviation: "NS" },
          { name: "Ontario", abbreviation: "ON" },
          { name: "Prince Edward Island", abbreviation: "PE" },
          { name: "Quebec", abbreviation: "QC" },
          { name: "Saskatchewan", abbreviation: "SK" },
          // The case could be made that the following are not actually provinces
          // since they are technically considered "territories" however they all
          // look the same on an envelope!
          { name: "Northwest Territories", abbreviation: "NT" },
          { name: "Nunavut", abbreviation: "NU" },
          { name: "Yukon", abbreviation: "YT" }
        ],
        it: [
          { name: "Agrigento", abbreviation: "AG", code: 84 },
          { name: "Alessandria", abbreviation: "AL", code: 6 },
          { name: "Ancona", abbreviation: "AN", code: 42 },
          { name: "Aosta", abbreviation: "AO", code: 7 },
          { name: "L'Aquila", abbreviation: "AQ", code: 66 },
          { name: "Arezzo", abbreviation: "AR", code: 51 },
          { name: "Ascoli-Piceno", abbreviation: "AP", code: 44 },
          { name: "Asti", abbreviation: "AT", code: 5 },
          { name: "Avellino", abbreviation: "AV", code: 64 },
          { name: "Bari", abbreviation: "BA", code: 72 },
          { name: "Barletta-Andria-Trani", abbreviation: "BT", code: 72 },
          { name: "Belluno", abbreviation: "BL", code: 25 },
          { name: "Benevento", abbreviation: "BN", code: 62 },
          { name: "Bergamo", abbreviation: "BG", code: 16 },
          { name: "Biella", abbreviation: "BI", code: 96 },
          { name: "Bologna", abbreviation: "BO", code: 37 },
          { name: "Bolzano", abbreviation: "BZ", code: 21 },
          { name: "Brescia", abbreviation: "BS", code: 17 },
          { name: "Brindisi", abbreviation: "BR", code: 74 },
          { name: "Cagliari", abbreviation: "CA", code: 92 },
          { name: "Caltanissetta", abbreviation: "CL", code: 85 },
          { name: "Campobasso", abbreviation: "CB", code: 70 },
          { name: "Carbonia Iglesias", abbreviation: "CI", code: 70 },
          { name: "Caserta", abbreviation: "CE", code: 61 },
          { name: "Catania", abbreviation: "CT", code: 87 },
          { name: "Catanzaro", abbreviation: "CZ", code: 79 },
          { name: "Chieti", abbreviation: "CH", code: 69 },
          { name: "Como", abbreviation: "CO", code: 13 },
          { name: "Cosenza", abbreviation: "CS", code: 78 },
          { name: "Cremona", abbreviation: "CR", code: 19 },
          { name: "Crotone", abbreviation: "KR", code: 101 },
          { name: "Cuneo", abbreviation: "CN", code: 4 },
          { name: "Enna", abbreviation: "EN", code: 86 },
          { name: "Fermo", abbreviation: "FM", code: 86 },
          { name: "Ferrara", abbreviation: "FE", code: 38 },
          { name: "Firenze", abbreviation: "FI", code: 48 },
          { name: "Foggia", abbreviation: "FG", code: 71 },
          { name: "Forli-Cesena", abbreviation: "FC", code: 71 },
          { name: "Frosinone", abbreviation: "FR", code: 60 },
          { name: "Genova", abbreviation: "GE", code: 10 },
          { name: "Gorizia", abbreviation: "GO", code: 31 },
          { name: "Grosseto", abbreviation: "GR", code: 53 },
          { name: "Imperia", abbreviation: "IM", code: 8 },
          { name: "Isernia", abbreviation: "IS", code: 94 },
          { name: "La-Spezia", abbreviation: "SP", code: 66 },
          { name: "Latina", abbreviation: "LT", code: 59 },
          { name: "Lecce", abbreviation: "LE", code: 75 },
          { name: "Lecco", abbreviation: "LC", code: 97 },
          { name: "Livorno", abbreviation: "LI", code: 49 },
          { name: "Lodi", abbreviation: "LO", code: 98 },
          { name: "Lucca", abbreviation: "LU", code: 46 },
          { name: "Macerata", abbreviation: "MC", code: 43 },
          { name: "Mantova", abbreviation: "MN", code: 20 },
          { name: "Massa-Carrara", abbreviation: "MS", code: 45 },
          { name: "Matera", abbreviation: "MT", code: 77 },
          { name: "Medio Campidano", abbreviation: "VS", code: 77 },
          { name: "Messina", abbreviation: "ME", code: 83 },
          { name: "Milano", abbreviation: "MI", code: 15 },
          { name: "Modena", abbreviation: "MO", code: 36 },
          { name: "Monza-Brianza", abbreviation: "MB", code: 36 },
          { name: "Napoli", abbreviation: "NA", code: 63 },
          { name: "Novara", abbreviation: "NO", code: 3 },
          { name: "Nuoro", abbreviation: "NU", code: 91 },
          { name: "Ogliastra", abbreviation: "OG", code: 91 },
          { name: "Olbia Tempio", abbreviation: "OT", code: 91 },
          { name: "Oristano", abbreviation: "OR", code: 95 },
          { name: "Padova", abbreviation: "PD", code: 28 },
          { name: "Palermo", abbreviation: "PA", code: 82 },
          { name: "Parma", abbreviation: "PR", code: 34 },
          { name: "Pavia", abbreviation: "PV", code: 18 },
          { name: "Perugia", abbreviation: "PG", code: 54 },
          { name: "Pesaro-Urbino", abbreviation: "PU", code: 41 },
          { name: "Pescara", abbreviation: "PE", code: 68 },
          { name: "Piacenza", abbreviation: "PC", code: 33 },
          { name: "Pisa", abbreviation: "PI", code: 50 },
          { name: "Pistoia", abbreviation: "PT", code: 47 },
          { name: "Pordenone", abbreviation: "PN", code: 93 },
          { name: "Potenza", abbreviation: "PZ", code: 76 },
          { name: "Prato", abbreviation: "PO", code: 100 },
          { name: "Ragusa", abbreviation: "RG", code: 88 },
          { name: "Ravenna", abbreviation: "RA", code: 39 },
          { name: "Reggio-Calabria", abbreviation: "RC", code: 35 },
          { name: "Reggio-Emilia", abbreviation: "RE", code: 35 },
          { name: "Rieti", abbreviation: "RI", code: 57 },
          { name: "Rimini", abbreviation: "RN", code: 99 },
          { name: "Roma", abbreviation: "Roma", code: 58 },
          { name: "Rovigo", abbreviation: "RO", code: 29 },
          { name: "Salerno", abbreviation: "SA", code: 65 },
          { name: "Sassari", abbreviation: "SS", code: 90 },
          { name: "Savona", abbreviation: "SV", code: 9 },
          { name: "Siena", abbreviation: "SI", code: 52 },
          { name: "Siracusa", abbreviation: "SR", code: 89 },
          { name: "Sondrio", abbreviation: "SO", code: 14 },
          { name: "Taranto", abbreviation: "TA", code: 73 },
          { name: "Teramo", abbreviation: "TE", code: 67 },
          { name: "Terni", abbreviation: "TR", code: 55 },
          { name: "Torino", abbreviation: "TO", code: 1 },
          { name: "Trapani", abbreviation: "TP", code: 81 },
          { name: "Trento", abbreviation: "TN", code: 22 },
          { name: "Treviso", abbreviation: "TV", code: 26 },
          { name: "Trieste", abbreviation: "TS", code: 32 },
          { name: "Udine", abbreviation: "UD", code: 30 },
          { name: "Varese", abbreviation: "VA", code: 12 },
          { name: "Venezia", abbreviation: "VE", code: 27 },
          { name: "Verbania", abbreviation: "VB", code: 27 },
          { name: "Vercelli", abbreviation: "VC", code: 2 },
          { name: "Verona", abbreviation: "VR", code: 23 },
          { name: "Vibo-Valentia", abbreviation: "VV", code: 102 },
          { name: "Vicenza", abbreviation: "VI", code: 24 },
          { name: "Viterbo", abbreviation: "VT", code: 56 }
        ]
      },
      // from: https://github.com/samsargent/Useful-Autocomplete-Data/blob/master/data/nationalities.json
      nationalities: [
        { name: "Afghan" },
        { name: "Albanian" },
        { name: "Algerian" },
        { name: "American" },
        { name: "Andorran" },
        { name: "Angolan" },
        { name: "Antiguans" },
        { name: "Argentinean" },
        { name: "Armenian" },
        { name: "Australian" },
        { name: "Austrian" },
        { name: "Azerbaijani" },
        { name: "Bahami" },
        { name: "Bahraini" },
        { name: "Bangladeshi" },
        { name: "Barbadian" },
        { name: "Barbudans" },
        { name: "Batswana" },
        { name: "Belarusian" },
        { name: "Belgian" },
        { name: "Belizean" },
        { name: "Beninese" },
        { name: "Bhutanese" },
        { name: "Bolivian" },
        { name: "Bosnian" },
        { name: "Brazilian" },
        { name: "British" },
        { name: "Bruneian" },
        { name: "Bulgarian" },
        { name: "Burkinabe" },
        { name: "Burmese" },
        { name: "Burundian" },
        { name: "Cambodian" },
        { name: "Cameroonian" },
        { name: "Canadian" },
        { name: "Cape Verdean" },
        { name: "Central African" },
        { name: "Chadian" },
        { name: "Chilean" },
        { name: "Chinese" },
        { name: "Colombian" },
        { name: "Comoran" },
        { name: "Congolese" },
        { name: "Costa Rican" },
        { name: "Croatian" },
        { name: "Cuban" },
        { name: "Cypriot" },
        { name: "Czech" },
        { name: "Danish" },
        { name: "Djibouti" },
        { name: "Dominican" },
        { name: "Dutch" },
        { name: "East Timorese" },
        { name: "Ecuadorean" },
        { name: "Egyptian" },
        { name: "Emirian" },
        { name: "Equatorial Guinean" },
        { name: "Eritrean" },
        { name: "Estonian" },
        { name: "Ethiopian" },
        { name: "Fijian" },
        { name: "Filipino" },
        { name: "Finnish" },
        { name: "French" },
        { name: "Gabonese" },
        { name: "Gambian" },
        { name: "Georgian" },
        { name: "German" },
        { name: "Ghanaian" },
        { name: "Greek" },
        { name: "Grenadian" },
        { name: "Guatemalan" },
        { name: "Guinea-Bissauan" },
        { name: "Guinean" },
        { name: "Guyanese" },
        { name: "Haitian" },
        { name: "Herzegovinian" },
        { name: "Honduran" },
        { name: "Hungarian" },
        { name: "I-Kiribati" },
        { name: "Icelander" },
        { name: "Indian" },
        { name: "Indonesian" },
        { name: "Iranian" },
        { name: "Iraqi" },
        { name: "Irish" },
        { name: "Israeli" },
        { name: "Italian" },
        { name: "Ivorian" },
        { name: "Jamaican" },
        { name: "Japanese" },
        { name: "Jordanian" },
        { name: "Kazakhstani" },
        { name: "Kenyan" },
        { name: "Kittian and Nevisian" },
        { name: "Kuwaiti" },
        { name: "Kyrgyz" },
        { name: "Laotian" },
        { name: "Latvian" },
        { name: "Lebanese" },
        { name: "Liberian" },
        { name: "Libyan" },
        { name: "Liechtensteiner" },
        { name: "Lithuanian" },
        { name: "Luxembourger" },
        { name: "Macedonian" },
        { name: "Malagasy" },
        { name: "Malawian" },
        { name: "Malaysian" },
        { name: "Maldivan" },
        { name: "Malian" },
        { name: "Maltese" },
        { name: "Marshallese" },
        { name: "Mauritanian" },
        { name: "Mauritian" },
        { name: "Mexican" },
        { name: "Micronesian" },
        { name: "Moldovan" },
        { name: "Monacan" },
        { name: "Mongolian" },
        { name: "Moroccan" },
        { name: "Mosotho" },
        { name: "Motswana" },
        { name: "Mozambican" },
        { name: "Namibian" },
        { name: "Nauruan" },
        { name: "Nepalese" },
        { name: "New Zealander" },
        { name: "Nicaraguan" },
        { name: "Nigerian" },
        { name: "Nigerien" },
        { name: "North Korean" },
        { name: "Northern Irish" },
        { name: "Norwegian" },
        { name: "Omani" },
        { name: "Pakistani" },
        { name: "Palauan" },
        { name: "Panamanian" },
        { name: "Papua New Guinean" },
        { name: "Paraguayan" },
        { name: "Peruvian" },
        { name: "Polish" },
        { name: "Portuguese" },
        { name: "Qatari" },
        { name: "Romani" },
        { name: "Russian" },
        { name: "Rwandan" },
        { name: "Saint Lucian" },
        { name: "Salvadoran" },
        { name: "Samoan" },
        { name: "San Marinese" },
        { name: "Sao Tomean" },
        { name: "Saudi" },
        { name: "Scottish" },
        { name: "Senegalese" },
        { name: "Serbian" },
        { name: "Seychellois" },
        { name: "Sierra Leonean" },
        { name: "Singaporean" },
        { name: "Slovakian" },
        { name: "Slovenian" },
        { name: "Solomon Islander" },
        { name: "Somali" },
        { name: "South African" },
        { name: "South Korean" },
        { name: "Spanish" },
        { name: "Sri Lankan" },
        { name: "Sudanese" },
        { name: "Surinamer" },
        { name: "Swazi" },
        { name: "Swedish" },
        { name: "Swiss" },
        { name: "Syrian" },
        { name: "Taiwanese" },
        { name: "Tajik" },
        { name: "Tanzanian" },
        { name: "Thai" },
        { name: "Togolese" },
        { name: "Tongan" },
        { name: "Trinidadian or Tobagonian" },
        { name: "Tunisian" },
        { name: "Turkish" },
        { name: "Tuvaluan" },
        { name: "Ugandan" },
        { name: "Ukrainian" },
        { name: "Uruguaya" },
        { name: "Uzbekistani" },
        { name: "Venezuela" },
        { name: "Vietnamese" },
        { name: "Wels" },
        { name: "Yemenit" },
        { name: "Zambia" },
        { name: "Zimbabwe" }
      ],
      // http://www.loc.gov/standards/iso639-2/php/code_list.php (ISO-639-1 codes)
      locale_languages: [
        "aa",
        "ab",
        "ae",
        "af",
        "ak",
        "am",
        "an",
        "ar",
        "as",
        "av",
        "ay",
        "az",
        "ba",
        "be",
        "bg",
        "bh",
        "bi",
        "bm",
        "bn",
        "bo",
        "br",
        "bs",
        "ca",
        "ce",
        "ch",
        "co",
        "cr",
        "cs",
        "cu",
        "cv",
        "cy",
        "da",
        "de",
        "dv",
        "dz",
        "ee",
        "el",
        "en",
        "eo",
        "es",
        "et",
        "eu",
        "fa",
        "ff",
        "fi",
        "fj",
        "fo",
        "fr",
        "fy",
        "ga",
        "gd",
        "gl",
        "gn",
        "gu",
        "gv",
        "ha",
        "he",
        "hi",
        "ho",
        "hr",
        "ht",
        "hu",
        "hy",
        "hz",
        "ia",
        "id",
        "ie",
        "ig",
        "ii",
        "ik",
        "io",
        "is",
        "it",
        "iu",
        "ja",
        "jv",
        "ka",
        "kg",
        "ki",
        "kj",
        "kk",
        "kl",
        "km",
        "kn",
        "ko",
        "kr",
        "ks",
        "ku",
        "kv",
        "kw",
        "ky",
        "la",
        "lb",
        "lg",
        "li",
        "ln",
        "lo",
        "lt",
        "lu",
        "lv",
        "mg",
        "mh",
        "mi",
        "mk",
        "ml",
        "mn",
        "mr",
        "ms",
        "mt",
        "my",
        "na",
        "nb",
        "nd",
        "ne",
        "ng",
        "nl",
        "nn",
        "no",
        "nr",
        "nv",
        "ny",
        "oc",
        "oj",
        "om",
        "or",
        "os",
        "pa",
        "pi",
        "pl",
        "ps",
        "pt",
        "qu",
        "rm",
        "rn",
        "ro",
        "ru",
        "rw",
        "sa",
        "sc",
        "sd",
        "se",
        "sg",
        "si",
        "sk",
        "sl",
        "sm",
        "sn",
        "so",
        "sq",
        "sr",
        "ss",
        "st",
        "su",
        "sv",
        "sw",
        "ta",
        "te",
        "tg",
        "th",
        "ti",
        "tk",
        "tl",
        "tn",
        "to",
        "tr",
        "ts",
        "tt",
        "tw",
        "ty",
        "ug",
        "uk",
        "ur",
        "uz",
        "ve",
        "vi",
        "vo",
        "wa",
        "wo",
        "xh",
        "yi",
        "yo",
        "za",
        "zh",
        "zu"
      ],
      // From http://data.okfn.org/data/core/language-codes#resource-language-codes-full (IETF language tags)
      locale_regions: [
        "agq-CM",
        "asa-TZ",
        "ast-ES",
        "bas-CM",
        "bem-ZM",
        "bez-TZ",
        "brx-IN",
        "cgg-UG",
        "chr-US",
        "dav-KE",
        "dje-NE",
        "dsb-DE",
        "dua-CM",
        "dyo-SN",
        "ebu-KE",
        "ewo-CM",
        "fil-PH",
        "fur-IT",
        "gsw-CH",
        "gsw-FR",
        "gsw-LI",
        "guz-KE",
        "haw-US",
        "hsb-DE",
        "jgo-CM",
        "jmc-TZ",
        "kab-DZ",
        "kam-KE",
        "kde-TZ",
        "kea-CV",
        "khq-ML",
        "kkj-CM",
        "kln-KE",
        "kok-IN",
        "ksb-TZ",
        "ksf-CM",
        "ksh-DE",
        "lag-TZ",
        "lkt-US",
        "luo-KE",
        "luy-KE",
        "mas-KE",
        "mas-TZ",
        "mer-KE",
        "mfe-MU",
        "mgh-MZ",
        "mgo-CM",
        "mua-CM",
        "naq-NA",
        "nmg-CM",
        "nnh-CM",
        "nus-SD",
        "nyn-UG",
        "rof-TZ",
        "rwk-TZ",
        "sah-RU",
        "saq-KE",
        "sbp-TZ",
        "seh-MZ",
        "ses-ML",
        "shi-Latn",
        "shi-Latn-MA",
        "shi-Tfng",
        "shi-Tfng-MA",
        "smn-FI",
        "teo-KE",
        "teo-UG",
        "twq-NE",
        "tzm-Latn",
        "tzm-Latn-MA",
        "vai-Latn",
        "vai-Latn-LR",
        "vai-Vaii",
        "vai-Vaii-LR",
        "vun-TZ",
        "wae-CH",
        "xog-UG",
        "yav-CM",
        "zgh-MA",
        "af-NA",
        "af-ZA",
        "ak-GH",
        "am-ET",
        "ar-001",
        "ar-AE",
        "ar-BH",
        "ar-DJ",
        "ar-DZ",
        "ar-EG",
        "ar-EH",
        "ar-ER",
        "ar-IL",
        "ar-IQ",
        "ar-JO",
        "ar-KM",
        "ar-KW",
        "ar-LB",
        "ar-LY",
        "ar-MA",
        "ar-MR",
        "ar-OM",
        "ar-PS",
        "ar-QA",
        "ar-SA",
        "ar-SD",
        "ar-SO",
        "ar-SS",
        "ar-SY",
        "ar-TD",
        "ar-TN",
        "ar-YE",
        "as-IN",
        "az-Cyrl",
        "az-Cyrl-AZ",
        "az-Latn",
        "az-Latn-AZ",
        "be-BY",
        "bg-BG",
        "bm-Latn",
        "bm-Latn-ML",
        "bn-BD",
        "bn-IN",
        "bo-CN",
        "bo-IN",
        "br-FR",
        "bs-Cyrl",
        "bs-Cyrl-BA",
        "bs-Latn",
        "bs-Latn-BA",
        "ca-AD",
        "ca-ES",
        "ca-ES-VALENCIA",
        "ca-FR",
        "ca-IT",
        "cs-CZ",
        "cy-GB",
        "da-DK",
        "da-GL",
        "de-AT",
        "de-BE",
        "de-CH",
        "de-DE",
        "de-LI",
        "de-LU",
        "dz-BT",
        "ee-GH",
        "ee-TG",
        "el-CY",
        "el-GR",
        "en-001",
        "en-150",
        "en-AG",
        "en-AI",
        "en-AS",
        "en-AU",
        "en-BB",
        "en-BE",
        "en-BM",
        "en-BS",
        "en-BW",
        "en-BZ",
        "en-CA",
        "en-CC",
        "en-CK",
        "en-CM",
        "en-CX",
        "en-DG",
        "en-DM",
        "en-ER",
        "en-FJ",
        "en-FK",
        "en-FM",
        "en-GB",
        "en-GD",
        "en-GG",
        "en-GH",
        "en-GI",
        "en-GM",
        "en-GU",
        "en-GY",
        "en-HK",
        "en-IE",
        "en-IM",
        "en-IN",
        "en-IO",
        "en-JE",
        "en-JM",
        "en-KE",
        "en-KI",
        "en-KN",
        "en-KY",
        "en-LC",
        "en-LR",
        "en-LS",
        "en-MG",
        "en-MH",
        "en-MO",
        "en-MP",
        "en-MS",
        "en-MT",
        "en-MU",
        "en-MW",
        "en-MY",
        "en-NA",
        "en-NF",
        "en-NG",
        "en-NR",
        "en-NU",
        "en-NZ",
        "en-PG",
        "en-PH",
        "en-PK",
        "en-PN",
        "en-PR",
        "en-PW",
        "en-RW",
        "en-SB",
        "en-SC",
        "en-SD",
        "en-SG",
        "en-SH",
        "en-SL",
        "en-SS",
        "en-SX",
        "en-SZ",
        "en-TC",
        "en-TK",
        "en-TO",
        "en-TT",
        "en-TV",
        "en-TZ",
        "en-UG",
        "en-UM",
        "en-US",
        "en-US-POSIX",
        "en-VC",
        "en-VG",
        "en-VI",
        "en-VU",
        "en-WS",
        "en-ZA",
        "en-ZM",
        "en-ZW",
        "eo-001",
        "es-419",
        "es-AR",
        "es-BO",
        "es-CL",
        "es-CO",
        "es-CR",
        "es-CU",
        "es-DO",
        "es-EA",
        "es-EC",
        "es-ES",
        "es-GQ",
        "es-GT",
        "es-HN",
        "es-IC",
        "es-MX",
        "es-NI",
        "es-PA",
        "es-PE",
        "es-PH",
        "es-PR",
        "es-PY",
        "es-SV",
        "es-US",
        "es-UY",
        "es-VE",
        "et-EE",
        "eu-ES",
        "fa-AF",
        "fa-IR",
        "ff-CM",
        "ff-GN",
        "ff-MR",
        "ff-SN",
        "fi-FI",
        "fo-FO",
        "fr-BE",
        "fr-BF",
        "fr-BI",
        "fr-BJ",
        "fr-BL",
        "fr-CA",
        "fr-CD",
        "fr-CF",
        "fr-CG",
        "fr-CH",
        "fr-CI",
        "fr-CM",
        "fr-DJ",
        "fr-DZ",
        "fr-FR",
        "fr-GA",
        "fr-GF",
        "fr-GN",
        "fr-GP",
        "fr-GQ",
        "fr-HT",
        "fr-KM",
        "fr-LU",
        "fr-MA",
        "fr-MC",
        "fr-MF",
        "fr-MG",
        "fr-ML",
        "fr-MQ",
        "fr-MR",
        "fr-MU",
        "fr-NC",
        "fr-NE",
        "fr-PF",
        "fr-PM",
        "fr-RE",
        "fr-RW",
        "fr-SC",
        "fr-SN",
        "fr-SY",
        "fr-TD",
        "fr-TG",
        "fr-TN",
        "fr-VU",
        "fr-WF",
        "fr-YT",
        "fy-NL",
        "ga-IE",
        "gd-GB",
        "gl-ES",
        "gu-IN",
        "gv-IM",
        "ha-Latn",
        "ha-Latn-GH",
        "ha-Latn-NE",
        "ha-Latn-NG",
        "he-IL",
        "hi-IN",
        "hr-BA",
        "hr-HR",
        "hu-HU",
        "hy-AM",
        "id-ID",
        "ig-NG",
        "ii-CN",
        "is-IS",
        "it-CH",
        "it-IT",
        "it-SM",
        "ja-JP",
        "ka-GE",
        "ki-KE",
        "kk-Cyrl",
        "kk-Cyrl-KZ",
        "kl-GL",
        "km-KH",
        "kn-IN",
        "ko-KP",
        "ko-KR",
        "ks-Arab",
        "ks-Arab-IN",
        "kw-GB",
        "ky-Cyrl",
        "ky-Cyrl-KG",
        "lb-LU",
        "lg-UG",
        "ln-AO",
        "ln-CD",
        "ln-CF",
        "ln-CG",
        "lo-LA",
        "lt-LT",
        "lu-CD",
        "lv-LV",
        "mg-MG",
        "mk-MK",
        "ml-IN",
        "mn-Cyrl",
        "mn-Cyrl-MN",
        "mr-IN",
        "ms-Latn",
        "ms-Latn-BN",
        "ms-Latn-MY",
        "ms-Latn-SG",
        "mt-MT",
        "my-MM",
        "nb-NO",
        "nb-SJ",
        "nd-ZW",
        "ne-IN",
        "ne-NP",
        "nl-AW",
        "nl-BE",
        "nl-BQ",
        "nl-CW",
        "nl-NL",
        "nl-SR",
        "nl-SX",
        "nn-NO",
        "om-ET",
        "om-KE",
        "or-IN",
        "os-GE",
        "os-RU",
        "pa-Arab",
        "pa-Arab-PK",
        "pa-Guru",
        "pa-Guru-IN",
        "pl-PL",
        "ps-AF",
        "pt-AO",
        "pt-BR",
        "pt-CV",
        "pt-GW",
        "pt-MO",
        "pt-MZ",
        "pt-PT",
        "pt-ST",
        "pt-TL",
        "qu-BO",
        "qu-EC",
        "qu-PE",
        "rm-CH",
        "rn-BI",
        "ro-MD",
        "ro-RO",
        "ru-BY",
        "ru-KG",
        "ru-KZ",
        "ru-MD",
        "ru-RU",
        "ru-UA",
        "rw-RW",
        "se-FI",
        "se-NO",
        "se-SE",
        "sg-CF",
        "si-LK",
        "sk-SK",
        "sl-SI",
        "sn-ZW",
        "so-DJ",
        "so-ET",
        "so-KE",
        "so-SO",
        "sq-AL",
        "sq-MK",
        "sq-XK",
        "sr-Cyrl",
        "sr-Cyrl-BA",
        "sr-Cyrl-ME",
        "sr-Cyrl-RS",
        "sr-Cyrl-XK",
        "sr-Latn",
        "sr-Latn-BA",
        "sr-Latn-ME",
        "sr-Latn-RS",
        "sr-Latn-XK",
        "sv-AX",
        "sv-FI",
        "sv-SE",
        "sw-CD",
        "sw-KE",
        "sw-TZ",
        "sw-UG",
        "ta-IN",
        "ta-LK",
        "ta-MY",
        "ta-SG",
        "te-IN",
        "th-TH",
        "ti-ER",
        "ti-ET",
        "to-TO",
        "tr-CY",
        "tr-TR",
        "ug-Arab",
        "ug-Arab-CN",
        "uk-UA",
        "ur-IN",
        "ur-PK",
        "uz-Arab",
        "uz-Arab-AF",
        "uz-Cyrl",
        "uz-Cyrl-UZ",
        "uz-Latn",
        "uz-Latn-UZ",
        "vi-VN",
        "yi-001",
        "yo-BJ",
        "yo-NG",
        "zh-Hans",
        "zh-Hans-CN",
        "zh-Hans-HK",
        "zh-Hans-MO",
        "zh-Hans-SG",
        "zh-Hant",
        "zh-Hant-HK",
        "zh-Hant-MO",
        "zh-Hant-TW",
        "zu-ZA"
      ],
      us_states_and_dc: [
        { name: "Alabama", abbreviation: "AL" },
        { name: "Alaska", abbreviation: "AK" },
        { name: "Arizona", abbreviation: "AZ" },
        { name: "Arkansas", abbreviation: "AR" },
        { name: "California", abbreviation: "CA" },
        { name: "Colorado", abbreviation: "CO" },
        { name: "Connecticut", abbreviation: "CT" },
        { name: "Delaware", abbreviation: "DE" },
        { name: "District of Columbia", abbreviation: "DC" },
        { name: "Florida", abbreviation: "FL" },
        { name: "Georgia", abbreviation: "GA" },
        { name: "Hawaii", abbreviation: "HI" },
        { name: "Idaho", abbreviation: "ID" },
        { name: "Illinois", abbreviation: "IL" },
        { name: "Indiana", abbreviation: "IN" },
        { name: "Iowa", abbreviation: "IA" },
        { name: "Kansas", abbreviation: "KS" },
        { name: "Kentucky", abbreviation: "KY" },
        { name: "Louisiana", abbreviation: "LA" },
        { name: "Maine", abbreviation: "ME" },
        { name: "Maryland", abbreviation: "MD" },
        { name: "Massachusetts", abbreviation: "MA" },
        { name: "Michigan", abbreviation: "MI" },
        { name: "Minnesota", abbreviation: "MN" },
        { name: "Mississippi", abbreviation: "MS" },
        { name: "Missouri", abbreviation: "MO" },
        { name: "Montana", abbreviation: "MT" },
        { name: "Nebraska", abbreviation: "NE" },
        { name: "Nevada", abbreviation: "NV" },
        { name: "New Hampshire", abbreviation: "NH" },
        { name: "New Jersey", abbreviation: "NJ" },
        { name: "New Mexico", abbreviation: "NM" },
        { name: "New York", abbreviation: "NY" },
        { name: "North Carolina", abbreviation: "NC" },
        { name: "North Dakota", abbreviation: "ND" },
        { name: "Ohio", abbreviation: "OH" },
        { name: "Oklahoma", abbreviation: "OK" },
        { name: "Oregon", abbreviation: "OR" },
        { name: "Pennsylvania", abbreviation: "PA" },
        { name: "Rhode Island", abbreviation: "RI" },
        { name: "South Carolina", abbreviation: "SC" },
        { name: "South Dakota", abbreviation: "SD" },
        { name: "Tennessee", abbreviation: "TN" },
        { name: "Texas", abbreviation: "TX" },
        { name: "Utah", abbreviation: "UT" },
        { name: "Vermont", abbreviation: "VT" },
        { name: "Virginia", abbreviation: "VA" },
        { name: "Washington", abbreviation: "WA" },
        { name: "West Virginia", abbreviation: "WV" },
        { name: "Wisconsin", abbreviation: "WI" },
        { name: "Wyoming", abbreviation: "WY" }
      ],
      territories: [
        { name: "American Samoa", abbreviation: "AS" },
        { name: "Federated States of Micronesia", abbreviation: "FM" },
        { name: "Guam", abbreviation: "GU" },
        { name: "Marshall Islands", abbreviation: "MH" },
        { name: "Northern Mariana Islands", abbreviation: "MP" },
        { name: "Puerto Rico", abbreviation: "PR" },
        { name: "Virgin Islands, U.S.", abbreviation: "VI" }
      ],
      armed_forces: [
        { name: "Armed Forces Europe", abbreviation: "AE" },
        { name: "Armed Forces Pacific", abbreviation: "AP" },
        { name: "Armed Forces the Americas", abbreviation: "AA" }
      ],
      country_regions: {
        it: [
          { name: "Valle d'Aosta", abbreviation: "VDA" },
          { name: "Piemonte", abbreviation: "PIE" },
          { name: "Lombardia", abbreviation: "LOM" },
          { name: "Veneto", abbreviation: "VEN" },
          { name: "Trentino Alto Adige", abbreviation: "TAA" },
          { name: "Friuli Venezia Giulia", abbreviation: "FVG" },
          { name: "Liguria", abbreviation: "LIG" },
          { name: "Emilia Romagna", abbreviation: "EMR" },
          { name: "Toscana", abbreviation: "TOS" },
          { name: "Umbria", abbreviation: "UMB" },
          { name: "Marche", abbreviation: "MAR" },
          { name: "Abruzzo", abbreviation: "ABR" },
          { name: "Lazio", abbreviation: "LAZ" },
          { name: "Campania", abbreviation: "CAM" },
          { name: "Puglia", abbreviation: "PUG" },
          { name: "Basilicata", abbreviation: "BAS" },
          { name: "Molise", abbreviation: "MOL" },
          { name: "Calabria", abbreviation: "CAL" },
          { name: "Sicilia", abbreviation: "SIC" },
          { name: "Sardegna", abbreviation: "SAR" }
        ],
        mx: [
          { name: "Aguascalientes", abbreviation: "AGU" },
          { name: "Baja California", abbreviation: "BCN" },
          { name: "Baja California Sur", abbreviation: "BCS" },
          { name: "Campeche", abbreviation: "CAM" },
          { name: "Chiapas", abbreviation: "CHP" },
          { name: "Chihuahua", abbreviation: "CHH" },
          { name: "Ciudad de M\xE9xico", abbreviation: "DIF" },
          { name: "Coahuila", abbreviation: "COA" },
          { name: "Colima", abbreviation: "COL" },
          { name: "Durango", abbreviation: "DUR" },
          { name: "Guanajuato", abbreviation: "GUA" },
          { name: "Guerrero", abbreviation: "GRO" },
          { name: "Hidalgo", abbreviation: "HID" },
          { name: "Jalisco", abbreviation: "JAL" },
          { name: "M\xE9xico", abbreviation: "MEX" },
          { name: "Michoac\xE1n", abbreviation: "MIC" },
          { name: "Morelos", abbreviation: "MOR" },
          { name: "Nayarit", abbreviation: "NAY" },
          { name: "Nuevo Le\xF3n", abbreviation: "NLE" },
          { name: "Oaxaca", abbreviation: "OAX" },
          { name: "Puebla", abbreviation: "PUE" },
          { name: "Quer\xE9taro", abbreviation: "QUE" },
          { name: "Quintana Roo", abbreviation: "ROO" },
          { name: "San Luis Potos\xED", abbreviation: "SLP" },
          { name: "Sinaloa", abbreviation: "SIN" },
          { name: "Sonora", abbreviation: "SON" },
          { name: "Tabasco", abbreviation: "TAB" },
          { name: "Tamaulipas", abbreviation: "TAM" },
          { name: "Tlaxcala", abbreviation: "TLA" },
          { name: "Veracruz", abbreviation: "VER" },
          { name: "Yucat\xE1n", abbreviation: "YUC" },
          { name: "Zacatecas", abbreviation: "ZAC" }
        ]
      },
      street_suffixes: {
        us: [
          { name: "Avenue", abbreviation: "Ave" },
          { name: "Boulevard", abbreviation: "Blvd" },
          { name: "Center", abbreviation: "Ctr" },
          { name: "Circle", abbreviation: "Cir" },
          { name: "Court", abbreviation: "Ct" },
          { name: "Drive", abbreviation: "Dr" },
          { name: "Extension", abbreviation: "Ext" },
          { name: "Glen", abbreviation: "Gln" },
          { name: "Grove", abbreviation: "Grv" },
          { name: "Heights", abbreviation: "Hts" },
          { name: "Highway", abbreviation: "Hwy" },
          { name: "Junction", abbreviation: "Jct" },
          { name: "Key", abbreviation: "Key" },
          { name: "Lane", abbreviation: "Ln" },
          { name: "Loop", abbreviation: "Loop" },
          { name: "Manor", abbreviation: "Mnr" },
          { name: "Mill", abbreviation: "Mill" },
          { name: "Park", abbreviation: "Park" },
          { name: "Parkway", abbreviation: "Pkwy" },
          { name: "Pass", abbreviation: "Pass" },
          { name: "Path", abbreviation: "Path" },
          { name: "Pike", abbreviation: "Pike" },
          { name: "Place", abbreviation: "Pl" },
          { name: "Plaza", abbreviation: "Plz" },
          { name: "Point", abbreviation: "Pt" },
          { name: "Ridge", abbreviation: "Rdg" },
          { name: "River", abbreviation: "Riv" },
          { name: "Road", abbreviation: "Rd" },
          { name: "Square", abbreviation: "Sq" },
          { name: "Street", abbreviation: "St" },
          { name: "Terrace", abbreviation: "Ter" },
          { name: "Trail", abbreviation: "Trl" },
          { name: "Turnpike", abbreviation: "Tpke" },
          { name: "View", abbreviation: "Vw" },
          { name: "Way", abbreviation: "Way" }
        ],
        it: [
          { name: "Accesso", abbreviation: "Acc." },
          { name: "Alzaia", abbreviation: "Alz." },
          { name: "Arco", abbreviation: "Arco" },
          { name: "Archivolto", abbreviation: "Acv." },
          { name: "Arena", abbreviation: "Arena" },
          { name: "Argine", abbreviation: "Argine" },
          { name: "Bacino", abbreviation: "Bacino" },
          { name: "Banchi", abbreviation: "Banchi" },
          { name: "Banchina", abbreviation: "Ban." },
          { name: "Bastioni", abbreviation: "Bas." },
          { name: "Belvedere", abbreviation: "Belv." },
          { name: "Borgata", abbreviation: "B.ta" },
          { name: "Borgo", abbreviation: "B.go" },
          { name: "Calata", abbreviation: "Cal." },
          { name: "Calle", abbreviation: "Calle" },
          { name: "Campiello", abbreviation: "Cam." },
          { name: "Campo", abbreviation: "Cam." },
          { name: "Canale", abbreviation: "Can." },
          { name: "Carraia", abbreviation: "Carr." },
          { name: "Cascina", abbreviation: "Cascina" },
          { name: "Case sparse", abbreviation: "c.s." },
          { name: "Cavalcavia", abbreviation: "Cv." },
          { name: "Circonvallazione", abbreviation: "Cv." },
          { name: "Complanare", abbreviation: "C.re" },
          { name: "Contrada", abbreviation: "C.da" },
          { name: "Corso", abbreviation: "C.so" },
          { name: "Corte", abbreviation: "C.te" },
          { name: "Cortile", abbreviation: "C.le" },
          { name: "Diramazione", abbreviation: "Dir." },
          { name: "Fondaco", abbreviation: "F.co" },
          { name: "Fondamenta", abbreviation: "F.ta" },
          { name: "Fondo", abbreviation: "F.do" },
          { name: "Frazione", abbreviation: "Fr." },
          { name: "Isola", abbreviation: "Is." },
          { name: "Largo", abbreviation: "L.go" },
          { name: "Litoranea", abbreviation: "Lit." },
          { name: "Lungolago", abbreviation: "L.go lago" },
          { name: "Lungo Po", abbreviation: "l.go Po" },
          { name: "Molo", abbreviation: "Molo" },
          { name: "Mura", abbreviation: "Mura" },
          { name: "Passaggio privato", abbreviation: "pass. priv." },
          { name: "Passeggiata", abbreviation: "Pass." },
          { name: "Piazza", abbreviation: "P.zza" },
          { name: "Piazzale", abbreviation: "P.le" },
          { name: "Ponte", abbreviation: "P.te" },
          { name: "Portico", abbreviation: "P.co" },
          { name: "Rampa", abbreviation: "Rampa" },
          { name: "Regione", abbreviation: "Reg." },
          { name: "Rione", abbreviation: "R.ne" },
          { name: "Rio", abbreviation: "Rio" },
          { name: "Ripa", abbreviation: "Ripa" },
          { name: "Riva", abbreviation: "Riva" },
          { name: "Rond\xF2", abbreviation: "Rond\xF2" },
          { name: "Rotonda", abbreviation: "Rot." },
          { name: "Sagrato", abbreviation: "Sagr." },
          { name: "Salita", abbreviation: "Sal." },
          { name: "Scalinata", abbreviation: "Scal." },
          { name: "Scalone", abbreviation: "Scal." },
          { name: "Slargo", abbreviation: "Sl." },
          { name: "Sottoportico", abbreviation: "Sott." },
          { name: "Strada", abbreviation: "Str." },
          { name: "Stradale", abbreviation: "Str.le" },
          { name: "Strettoia", abbreviation: "Strett." },
          { name: "Traversa", abbreviation: "Trav." },
          { name: "Via", abbreviation: "V." },
          { name: "Viale", abbreviation: "V.le" },
          { name: "Vicinale", abbreviation: "Vic.le" },
          { name: "Vicolo", abbreviation: "Vic." }
        ],
        uk: [
          { name: "Avenue", abbreviation: "Ave" },
          { name: "Close", abbreviation: "Cl" },
          { name: "Court", abbreviation: "Ct" },
          { name: "Crescent", abbreviation: "Cr" },
          { name: "Drive", abbreviation: "Dr" },
          { name: "Garden", abbreviation: "Gdn" },
          { name: "Gardens", abbreviation: "Gdns" },
          { name: "Green", abbreviation: "Gn" },
          { name: "Grove", abbreviation: "Gr" },
          { name: "Lane", abbreviation: "Ln" },
          { name: "Mount", abbreviation: "Mt" },
          { name: "Place", abbreviation: "Pl" },
          { name: "Park", abbreviation: "Pk" },
          { name: "Ridge", abbreviation: "Rdg" },
          { name: "Road", abbreviation: "Rd" },
          { name: "Square", abbreviation: "Sq" },
          { name: "Street", abbreviation: "St" },
          { name: "Terrace", abbreviation: "Ter" },
          { name: "Valley", abbreviation: "Val" }
        ]
      },
      months: [
        { name: "January", short_name: "Jan", numeric: "01", days: 31 },
        // Not messing with leap years...
        { name: "February", short_name: "Feb", numeric: "02", days: 28 },
        { name: "March", short_name: "Mar", numeric: "03", days: 31 },
        { name: "April", short_name: "Apr", numeric: "04", days: 30 },
        { name: "May", short_name: "May", numeric: "05", days: 31 },
        { name: "June", short_name: "Jun", numeric: "06", days: 30 },
        { name: "July", short_name: "Jul", numeric: "07", days: 31 },
        { name: "August", short_name: "Aug", numeric: "08", days: 31 },
        { name: "September", short_name: "Sep", numeric: "09", days: 30 },
        { name: "October", short_name: "Oct", numeric: "10", days: 31 },
        { name: "November", short_name: "Nov", numeric: "11", days: 30 },
        { name: "December", short_name: "Dec", numeric: "12", days: 31 }
      ],
      // http://en.wikipedia.org/wiki/Bank_card_number#Issuer_identification_number_.28IIN.29
      cc_types: [
        { name: "American Express", short_name: "amex", prefix: "34", length: 15 },
        { name: "Bankcard", short_name: "bankcard", prefix: "5610", length: 16 },
        { name: "China UnionPay", short_name: "chinaunion", prefix: "62", length: 16 },
        { name: "Diners Club Carte Blanche", short_name: "dccarte", prefix: "300", length: 14 },
        { name: "Diners Club enRoute", short_name: "dcenroute", prefix: "2014", length: 15 },
        { name: "Diners Club International", short_name: "dcintl", prefix: "36", length: 14 },
        { name: "Diners Club United States & Canada", short_name: "dcusc", prefix: "54", length: 16 },
        { name: "Discover Card", short_name: "discover", prefix: "6011", length: 16 },
        { name: "InstaPayment", short_name: "instapay", prefix: "637", length: 16 },
        { name: "JCB", short_name: "jcb", prefix: "3528", length: 16 },
        { name: "Laser", short_name: "laser", prefix: "6304", length: 16 },
        { name: "Maestro", short_name: "maestro", prefix: "5018", length: 16 },
        { name: "Mastercard", short_name: "mc", prefix: "51", length: 16 },
        { name: "Solo", short_name: "solo", prefix: "6334", length: 16 },
        { name: "Switch", short_name: "switch", prefix: "4903", length: 16 },
        { name: "Visa", short_name: "visa", prefix: "4", length: 16 },
        { name: "Visa Electron", short_name: "electron", prefix: "4026", length: 16 }
      ],
      //return all world currency by ISO 4217
      currency_types: [
        { code: "AED", name: "United Arab Emirates Dirham" },
        { code: "AFN", name: "Afghanistan Afghani" },
        { code: "ALL", name: "Albania Lek" },
        { code: "AMD", name: "Armenia Dram" },
        { code: "ANG", name: "Netherlands Antilles Guilder" },
        { code: "AOA", name: "Angola Kwanza" },
        { code: "ARS", name: "Argentina Peso" },
        { code: "AUD", name: "Australia Dollar" },
        { code: "AWG", name: "Aruba Guilder" },
        { code: "AZN", name: "Azerbaijan New Manat" },
        { code: "BAM", name: "Bosnia and Herzegovina Convertible Marka" },
        { code: "BBD", name: "Barbados Dollar" },
        { code: "BDT", name: "Bangladesh Taka" },
        { code: "BGN", name: "Bulgaria Lev" },
        { code: "BHD", name: "Bahrain Dinar" },
        { code: "BIF", name: "Burundi Franc" },
        { code: "BMD", name: "Bermuda Dollar" },
        { code: "BND", name: "Brunei Darussalam Dollar" },
        { code: "BOB", name: "Bolivia Boliviano" },
        { code: "BRL", name: "Brazil Real" },
        { code: "BSD", name: "Bahamas Dollar" },
        { code: "BTN", name: "Bhutan Ngultrum" },
        { code: "BWP", name: "Botswana Pula" },
        { code: "BYR", name: "Belarus Ruble" },
        { code: "BZD", name: "Belize Dollar" },
        { code: "CAD", name: "Canada Dollar" },
        { code: "CDF", name: "Congo/Kinshasa Franc" },
        { code: "CHF", name: "Switzerland Franc" },
        { code: "CLP", name: "Chile Peso" },
        { code: "CNY", name: "China Yuan Renminbi" },
        { code: "COP", name: "Colombia Peso" },
        { code: "CRC", name: "Costa Rica Colon" },
        { code: "CUC", name: "Cuba Convertible Peso" },
        { code: "CUP", name: "Cuba Peso" },
        { code: "CVE", name: "Cape Verde Escudo" },
        { code: "CZK", name: "Czech Republic Koruna" },
        { code: "DJF", name: "Djibouti Franc" },
        { code: "DKK", name: "Denmark Krone" },
        { code: "DOP", name: "Dominican Republic Peso" },
        { code: "DZD", name: "Algeria Dinar" },
        { code: "EGP", name: "Egypt Pound" },
        { code: "ERN", name: "Eritrea Nakfa" },
        { code: "ETB", name: "Ethiopia Birr" },
        { code: "EUR", name: "Euro Member Countries" },
        { code: "FJD", name: "Fiji Dollar" },
        { code: "FKP", name: "Falkland Islands (Malvinas) Pound" },
        { code: "GBP", name: "United Kingdom Pound" },
        { code: "GEL", name: "Georgia Lari" },
        { code: "GGP", name: "Guernsey Pound" },
        { code: "GHS", name: "Ghana Cedi" },
        { code: "GIP", name: "Gibraltar Pound" },
        { code: "GMD", name: "Gambia Dalasi" },
        { code: "GNF", name: "Guinea Franc" },
        { code: "GTQ", name: "Guatemala Quetzal" },
        { code: "GYD", name: "Guyana Dollar" },
        { code: "HKD", name: "Hong Kong Dollar" },
        { code: "HNL", name: "Honduras Lempira" },
        { code: "HRK", name: "Croatia Kuna" },
        { code: "HTG", name: "Haiti Gourde" },
        { code: "HUF", name: "Hungary Forint" },
        { code: "IDR", name: "Indonesia Rupiah" },
        { code: "ILS", name: "Israel Shekel" },
        { code: "IMP", name: "Isle of Man Pound" },
        { code: "INR", name: "India Rupee" },
        { code: "IQD", name: "Iraq Dinar" },
        { code: "IRR", name: "Iran Rial" },
        { code: "ISK", name: "Iceland Krona" },
        { code: "JEP", name: "Jersey Pound" },
        { code: "JMD", name: "Jamaica Dollar" },
        { code: "JOD", name: "Jordan Dinar" },
        { code: "JPY", name: "Japan Yen" },
        { code: "KES", name: "Kenya Shilling" },
        { code: "KGS", name: "Kyrgyzstan Som" },
        { code: "KHR", name: "Cambodia Riel" },
        { code: "KMF", name: "Comoros Franc" },
        { code: "KPW", name: "Korea (North) Won" },
        { code: "KRW", name: "Korea (South) Won" },
        { code: "KWD", name: "Kuwait Dinar" },
        { code: "KYD", name: "Cayman Islands Dollar" },
        { code: "KZT", name: "Kazakhstan Tenge" },
        { code: "LAK", name: "Laos Kip" },
        { code: "LBP", name: "Lebanon Pound" },
        { code: "LKR", name: "Sri Lanka Rupee" },
        { code: "LRD", name: "Liberia Dollar" },
        { code: "LSL", name: "Lesotho Loti" },
        { code: "LTL", name: "Lithuania Litas" },
        { code: "LYD", name: "Libya Dinar" },
        { code: "MAD", name: "Morocco Dirham" },
        { code: "MDL", name: "Moldova Leu" },
        { code: "MGA", name: "Madagascar Ariary" },
        { code: "MKD", name: "Macedonia Denar" },
        { code: "MMK", name: "Myanmar (Burma) Kyat" },
        { code: "MNT", name: "Mongolia Tughrik" },
        { code: "MOP", name: "Macau Pataca" },
        { code: "MRO", name: "Mauritania Ouguiya" },
        { code: "MUR", name: "Mauritius Rupee" },
        { code: "MVR", name: "Maldives (Maldive Islands) Rufiyaa" },
        { code: "MWK", name: "Malawi Kwacha" },
        { code: "MXN", name: "Mexico Peso" },
        { code: "MYR", name: "Malaysia Ringgit" },
        { code: "MZN", name: "Mozambique Metical" },
        { code: "NAD", name: "Namibia Dollar" },
        { code: "NGN", name: "Nigeria Naira" },
        { code: "NIO", name: "Nicaragua Cordoba" },
        { code: "NOK", name: "Norway Krone" },
        { code: "NPR", name: "Nepal Rupee" },
        { code: "NZD", name: "New Zealand Dollar" },
        { code: "OMR", name: "Oman Rial" },
        { code: "PAB", name: "Panama Balboa" },
        { code: "PEN", name: "Peru Nuevo Sol" },
        { code: "PGK", name: "Papua New Guinea Kina" },
        { code: "PHP", name: "Philippines Peso" },
        { code: "PKR", name: "Pakistan Rupee" },
        { code: "PLN", name: "Poland Zloty" },
        { code: "PYG", name: "Paraguay Guarani" },
        { code: "QAR", name: "Qatar Riyal" },
        { code: "RON", name: "Romania New Leu" },
        { code: "RSD", name: "Serbia Dinar" },
        { code: "RUB", name: "Russia Ruble" },
        { code: "RWF", name: "Rwanda Franc" },
        { code: "SAR", name: "Saudi Arabia Riyal" },
        { code: "SBD", name: "Solomon Islands Dollar" },
        { code: "SCR", name: "Seychelles Rupee" },
        { code: "SDG", name: "Sudan Pound" },
        { code: "SEK", name: "Sweden Krona" },
        { code: "SGD", name: "Singapore Dollar" },
        { code: "SHP", name: "Saint Helena Pound" },
        { code: "SLL", name: "Sierra Leone Leone" },
        { code: "SOS", name: "Somalia Shilling" },
        { code: "SPL", name: "Seborga Luigino" },
        { code: "SRD", name: "Suriname Dollar" },
        { code: "STD", name: "S\xE3o Tom\xE9 and Pr\xEDncipe Dobra" },
        { code: "SVC", name: "El Salvador Colon" },
        { code: "SYP", name: "Syria Pound" },
        { code: "SZL", name: "Swaziland Lilangeni" },
        { code: "THB", name: "Thailand Baht" },
        { code: "TJS", name: "Tajikistan Somoni" },
        { code: "TMT", name: "Turkmenistan Manat" },
        { code: "TND", name: "Tunisia Dinar" },
        { code: "TOP", name: "Tonga Pa'anga" },
        { code: "TRY", name: "Turkey Lira" },
        { code: "TTD", name: "Trinidad and Tobago Dollar" },
        { code: "TVD", name: "Tuvalu Dollar" },
        { code: "TWD", name: "Taiwan New Dollar" },
        { code: "TZS", name: "Tanzania Shilling" },
        { code: "UAH", name: "Ukraine Hryvnia" },
        { code: "UGX", name: "Uganda Shilling" },
        { code: "USD", name: "United States Dollar" },
        { code: "UYU", name: "Uruguay Peso" },
        { code: "UZS", name: "Uzbekistan Som" },
        { code: "VEF", name: "Venezuela Bolivar" },
        { code: "VND", name: "Viet Nam Dong" },
        { code: "VUV", name: "Vanuatu Vatu" },
        { code: "WST", name: "Samoa Tala" },
        { code: "XAF", name: "Communaut\xE9 Financi\xE8re Africaine (BEAC) CFA Franc BEAC" },
        { code: "XCD", name: "East Caribbean Dollar" },
        { code: "XDR", name: "International Monetary Fund (IMF) Special Drawing Rights" },
        { code: "XOF", name: "Communaut\xE9 Financi\xE8re Africaine (BCEAO) Franc" },
        { code: "XPF", name: "Comptoirs Fran\xE7ais du Pacifique (CFP) Franc" },
        { code: "YER", name: "Yemen Rial" },
        { code: "ZAR", name: "South Africa Rand" },
        { code: "ZMW", name: "Zambia Kwacha" },
        { code: "ZWD", name: "Zimbabwe Dollar" }
      ],
      // return the names of all valide colors
      colorNames: [
        "AliceBlue",
        "Black",
        "Navy",
        "DarkBlue",
        "MediumBlue",
        "Blue",
        "DarkGreen",
        "Green",
        "Teal",
        "DarkCyan",
        "DeepSkyBlue",
        "DarkTurquoise",
        "MediumSpringGreen",
        "Lime",
        "SpringGreen",
        "Aqua",
        "Cyan",
        "MidnightBlue",
        "DodgerBlue",
        "LightSeaGreen",
        "ForestGreen",
        "SeaGreen",
        "DarkSlateGray",
        "LimeGreen",
        "MediumSeaGreen",
        "Turquoise",
        "RoyalBlue",
        "SteelBlue",
        "DarkSlateBlue",
        "MediumTurquoise",
        "Indigo",
        "DarkOliveGreen",
        "CadetBlue",
        "CornflowerBlue",
        "RebeccaPurple",
        "MediumAquaMarine",
        "DimGray",
        "SlateBlue",
        "OliveDrab",
        "SlateGray",
        "LightSlateGray",
        "MediumSlateBlue",
        "LawnGreen",
        "Chartreuse",
        "Aquamarine",
        "Maroon",
        "Purple",
        "Olive",
        "Gray",
        "SkyBlue",
        "LightSkyBlue",
        "BlueViolet",
        "DarkRed",
        "DarkMagenta",
        "SaddleBrown",
        "Ivory",
        "White",
        "DarkSeaGreen",
        "LightGreen",
        "MediumPurple",
        "DarkViolet",
        "PaleGreen",
        "DarkOrchid",
        "YellowGreen",
        "Sienna",
        "Brown",
        "DarkGray",
        "LightBlue",
        "GreenYellow",
        "PaleTurquoise",
        "LightSteelBlue",
        "PowderBlue",
        "FireBrick",
        "DarkGoldenRod",
        "MediumOrchid",
        "RosyBrown",
        "DarkKhaki",
        "Silver",
        "MediumVioletRed",
        "IndianRed",
        "Peru",
        "Chocolate",
        "Tan",
        "LightGray",
        "Thistle",
        "Orchid",
        "GoldenRod",
        "PaleVioletRed",
        "Crimson",
        "Gainsboro",
        "Plum",
        "BurlyWood",
        "LightCyan",
        "Lavender",
        "DarkSalmon",
        "Violet",
        "PaleGoldenRod",
        "LightCoral",
        "Khaki",
        "AliceBlue",
        "HoneyDew",
        "Azure",
        "SandyBrown",
        "Wheat",
        "Beige",
        "WhiteSmoke",
        "MintCream",
        "GhostWhite",
        "Salmon",
        "AntiqueWhite",
        "Linen",
        "LightGoldenRodYellow",
        "OldLace",
        "Red",
        "Fuchsia",
        "Magenta",
        "DeepPink",
        "OrangeRed",
        "Tomato",
        "HotPink",
        "Coral",
        "DarkOrange",
        "LightSalmon",
        "Orange",
        "LightPink",
        "Pink",
        "Gold",
        "PeachPuff",
        "NavajoWhite",
        "Moccasin",
        "Bisque",
        "MistyRose",
        "BlanchedAlmond",
        "PapayaWhip",
        "LavenderBlush",
        "SeaShell",
        "Cornsilk",
        "LemonChiffon",
        "FloralWhite",
        "Snow",
        "Yellow",
        "LightYellow"
      ],
      // Data taken from https://www.sec.gov/rules/other/4-460list.htm
      company: [
        "3Com Corp",
        "3M Company",
        "A.G. Edwards Inc.",
        "Abbott Laboratories",
        "Abercrombie & Fitch Co.",
        "ABM Industries Incorporated",
        "Ace Hardware Corporation",
        "ACT Manufacturing Inc.",
        "Acterna Corp.",
        "Adams Resources & Energy, Inc.",
        "ADC Telecommunications, Inc.",
        "Adelphia Communications Corporation",
        "Administaff, Inc.",
        "Adobe Systems Incorporated",
        "Adolph Coors Company",
        "Advance Auto Parts, Inc.",
        "Advanced Micro Devices, Inc.",
        "AdvancePCS, Inc.",
        "Advantica Restaurant Group, Inc.",
        "The AES Corporation",
        "Aetna Inc.",
        "Affiliated Computer Services, Inc.",
        "AFLAC Incorporated",
        "AGCO Corporation",
        "Agilent Technologies, Inc.",
        "Agway Inc.",
        "Apartment Investment and Management Company",
        "Air Products and Chemicals, Inc.",
        "Airborne, Inc.",
        "Airgas, Inc.",
        "AK Steel Holding Corporation",
        "Alaska Air Group, Inc.",
        "Alberto-Culver Company",
        "Albertson's, Inc.",
        "Alcoa Inc.",
        "Alleghany Corporation",
        "Allegheny Energy, Inc.",
        "Allegheny Technologies Incorporated",
        "Allergan, Inc.",
        "ALLETE, Inc.",
        "Alliant Energy Corporation",
        "Allied Waste Industries, Inc.",
        "Allmerica Financial Corporation",
        "The Allstate Corporation",
        "ALLTEL Corporation",
        "The Alpine Group, Inc.",
        "Amazon.com, Inc.",
        "AMC Entertainment Inc.",
        "American Power Conversion Corporation",
        "Amerada Hess Corporation",
        "AMERCO",
        "Ameren Corporation",
        "America West Holdings Corporation",
        "American Axle & Manufacturing Holdings, Inc.",
        "American Eagle Outfitters, Inc.",
        "American Electric Power Company, Inc.",
        "American Express Company",
        "American Financial Group, Inc.",
        "American Greetings Corporation",
        "American International Group, Inc.",
        "American Standard Companies Inc.",
        "American Water Works Company, Inc.",
        "AmerisourceBergen Corporation",
        "Ames Department Stores, Inc.",
        "Amgen Inc.",
        "Amkor Technology, Inc.",
        "AMR Corporation",
        "AmSouth Bancorp.",
        "Amtran, Inc.",
        "Anadarko Petroleum Corporation",
        "Analog Devices, Inc.",
        "Anheuser-Busch Companies, Inc.",
        "Anixter International Inc.",
        "AnnTaylor Inc.",
        "Anthem, Inc.",
        "AOL Time Warner Inc.",
        "Aon Corporation",
        "Apache Corporation",
        "Apple Computer, Inc.",
        "Applera Corporation",
        "Applied Industrial Technologies, Inc.",
        "Applied Materials, Inc.",
        "Aquila, Inc.",
        "ARAMARK Corporation",
        "Arch Coal, Inc.",
        "Archer Daniels Midland Company",
        "Arkansas Best Corporation",
        "Armstrong Holdings, Inc.",
        "Arrow Electronics, Inc.",
        "ArvinMeritor, Inc.",
        "Ashland Inc.",
        "Astoria Financial Corporation",
        "AT&T Corp.",
        "Atmel Corporation",
        "Atmos Energy Corporation",
        "Audiovox Corporation",
        "Autoliv, Inc.",
        "Automatic Data Processing, Inc.",
        "AutoNation, Inc.",
        "AutoZone, Inc.",
        "Avaya Inc.",
        "Avery Dennison Corporation",
        "Avista Corporation",
        "Avnet, Inc.",
        "Avon Products, Inc.",
        "Baker Hughes Incorporated",
        "Ball Corporation",
        "Bank of America Corporation",
        "The Bank of New York Company, Inc.",
        "Bank One Corporation",
        "Banknorth Group, Inc.",
        "Banta Corporation",
        "Barnes & Noble, Inc.",
        "Bausch & Lomb Incorporated",
        "Baxter International Inc.",
        "BB&T Corporation",
        "The Bear Stearns Companies Inc.",
        "Beazer Homes USA, Inc.",
        "Beckman Coulter, Inc.",
        "Becton, Dickinson and Company",
        "Bed Bath & Beyond Inc.",
        "Belk, Inc.",
        "Bell Microproducts Inc.",
        "BellSouth Corporation",
        "Belo Corp.",
        "Bemis Company, Inc.",
        "Benchmark Electronics, Inc.",
        "Berkshire Hathaway Inc.",
        "Best Buy Co., Inc.",
        "Bethlehem Steel Corporation",
        "Beverly Enterprises, Inc.",
        "Big Lots, Inc.",
        "BJ Services Company",
        "BJ's Wholesale Club, Inc.",
        "The Black & Decker Corporation",
        "Black Hills Corporation",
        "BMC Software, Inc.",
        "The Boeing Company",
        "Boise Cascade Corporation",
        "Borders Group, Inc.",
        "BorgWarner Inc.",
        "Boston Scientific Corporation",
        "Bowater Incorporated",
        "Briggs & Stratton Corporation",
        "Brightpoint, Inc.",
        "Brinker International, Inc.",
        "Bristol-Myers Squibb Company",
        "Broadwing, Inc.",
        "Brown Shoe Company, Inc.",
        "Brown-Forman Corporation",
        "Brunswick Corporation",
        "Budget Group, Inc.",
        "Burlington Coat Factory Warehouse Corporation",
        "Burlington Industries, Inc.",
        "Burlington Northern Santa Fe Corporation",
        "Burlington Resources Inc.",
        "C. H. Robinson Worldwide Inc.",
        "Cablevision Systems Corp",
        "Cabot Corp",
        "Cadence Design Systems, Inc.",
        "Calpine Corp.",
        "Campbell Soup Co.",
        "Capital One Financial Corp.",
        "Cardinal Health Inc.",
        "Caremark Rx Inc.",
        "Carlisle Cos. Inc.",
        "Carpenter Technology Corp.",
        "Casey's General Stores Inc.",
        "Caterpillar Inc.",
        "CBRL Group Inc.",
        "CDI Corp.",
        "CDW Computer Centers Inc.",
        "CellStar Corp.",
        "Cendant Corp",
        "Cenex Harvest States Cooperatives",
        "Centex Corp.",
        "CenturyTel Inc.",
        "Ceridian Corp.",
        "CH2M Hill Cos. Ltd.",
        "Champion Enterprises Inc.",
        "Charles Schwab Corp.",
        "Charming Shoppes Inc.",
        "Charter Communications Inc.",
        "Charter One Financial Inc.",
        "ChevronTexaco Corp.",
        "Chiquita Brands International Inc.",
        "Chubb Corp",
        "Ciena Corp.",
        "Cigna Corp",
        "Cincinnati Financial Corp.",
        "Cinergy Corp.",
        "Cintas Corp.",
        "Circuit City Stores Inc.",
        "Cisco Systems Inc.",
        "Citigroup, Inc",
        "Citizens Communications Co.",
        "CKE Restaurants Inc.",
        "Clear Channel Communications Inc.",
        "The Clorox Co.",
        "CMGI Inc.",
        "CMS Energy Corp.",
        "CNF Inc.",
        "Coca-Cola Co.",
        "Coca-Cola Enterprises Inc.",
        "Colgate-Palmolive Co.",
        "Collins & Aikman Corp.",
        "Comcast Corp.",
        "Comdisco Inc.",
        "Comerica Inc.",
        "Comfort Systems USA Inc.",
        "Commercial Metals Co.",
        "Community Health Systems Inc.",
        "Compass Bancshares Inc",
        "Computer Associates International Inc.",
        "Computer Sciences Corp.",
        "Compuware Corp.",
        "Comverse Technology Inc.",
        "ConAgra Foods Inc.",
        "Concord EFS Inc.",
        "Conectiv, Inc",
        "Conoco Inc",
        "Conseco Inc.",
        "Consolidated Freightways Corp.",
        "Consolidated Edison Inc.",
        "Constellation Brands Inc.",
        "Constellation Emergy Group Inc.",
        "Continental Airlines Inc.",
        "Convergys Corp.",
        "Cooper Cameron Corp.",
        "Cooper Industries Ltd.",
        "Cooper Tire & Rubber Co.",
        "Corn Products International Inc.",
        "Corning Inc.",
        "Costco Wholesale Corp.",
        "Countrywide Credit Industries Inc.",
        "Coventry Health Care Inc.",
        "Cox Communications Inc.",
        "Crane Co.",
        "Crompton Corp.",
        "Crown Cork & Seal Co. Inc.",
        "CSK Auto Corp.",
        "CSX Corp.",
        "Cummins Inc.",
        "CVS Corp.",
        "Cytec Industries Inc.",
        "D&K Healthcare Resources, Inc.",
        "D.R. Horton Inc.",
        "Dana Corporation",
        "Danaher Corporation",
        "Darden Restaurants Inc.",
        "DaVita Inc.",
        "Dean Foods Company",
        "Deere & Company",
        "Del Monte Foods Co",
        "Dell Computer Corporation",
        "Delphi Corp.",
        "Delta Air Lines Inc.",
        "Deluxe Corporation",
        "Devon Energy Corporation",
        "Di Giorgio Corporation",
        "Dial Corporation",
        "Diebold Incorporated",
        "Dillard's Inc.",
        "DIMON Incorporated",
        "Dole Food Company, Inc.",
        "Dollar General Corporation",
        "Dollar Tree Stores, Inc.",
        "Dominion Resources, Inc.",
        "Domino's Pizza LLC",
        "Dover Corporation, Inc.",
        "Dow Chemical Company",
        "Dow Jones & Company, Inc.",
        "DPL Inc.",
        "DQE Inc.",
        "Dreyer's Grand Ice Cream, Inc.",
        "DST Systems, Inc.",
        "DTE Energy Co.",
        "E.I. Du Pont de Nemours and Company",
        "Duke Energy Corp",
        "Dun & Bradstreet Inc.",
        "DURA Automotive Systems Inc.",
        "DynCorp",
        "Dynegy Inc.",
        "E*Trade Group, Inc.",
        "E.W. Scripps Company",
        "Earthlink, Inc.",
        "Eastman Chemical Company",
        "Eastman Kodak Company",
        "Eaton Corporation",
        "Echostar Communications Corporation",
        "Ecolab Inc.",
        "Edison International",
        "EGL Inc.",
        "El Paso Corporation",
        "Electronic Arts Inc.",
        "Electronic Data Systems Corp.",
        "Eli Lilly and Company",
        "EMC Corporation",
        "Emcor Group Inc.",
        "Emerson Electric Co.",
        "Encompass Services Corporation",
        "Energizer Holdings Inc.",
        "Energy East Corporation",
        "Engelhard Corporation",
        "Enron Corp.",
        "Entergy Corporation",
        "Enterprise Products Partners L.P.",
        "EOG Resources, Inc.",
        "Equifax Inc.",
        "Equitable Resources Inc.",
        "Equity Office Properties Trust",
        "Equity Residential Properties Trust",
        "Estee Lauder Companies Inc.",
        "Exelon Corporation",
        "Exide Technologies",
        "Expeditors International of Washington Inc.",
        "Express Scripts Inc.",
        "ExxonMobil Corporation",
        "Fairchild Semiconductor International Inc.",
        "Family Dollar Stores Inc.",
        "Farmland Industries Inc.",
        "Federal Mogul Corp.",
        "Federated Department Stores Inc.",
        "Federal Express Corp.",
        "Felcor Lodging Trust Inc.",
        "Ferro Corp.",
        "Fidelity National Financial Inc.",
        "Fifth Third Bancorp",
        "First American Financial Corp.",
        "First Data Corp.",
        "First National of Nebraska Inc.",
        "First Tennessee National Corp.",
        "FirstEnergy Corp.",
        "Fiserv Inc.",
        "Fisher Scientific International Inc.",
        "FleetBoston Financial Co.",
        "Fleetwood Enterprises Inc.",
        "Fleming Companies Inc.",
        "Flowers Foods Inc.",
        "Flowserv Corp",
        "Fluor Corp",
        "FMC Corp",
        "Foamex International Inc",
        "Foot Locker Inc",
        "Footstar Inc.",
        "Ford Motor Co",
        "Forest Laboratories Inc.",
        "Fortune Brands Inc.",
        "Foster Wheeler Ltd.",
        "FPL Group Inc.",
        "Franklin Resources Inc.",
        "Freeport McMoran Copper & Gold Inc.",
        "Frontier Oil Corp",
        "Furniture Brands International Inc.",
        "Gannett Co., Inc.",
        "Gap Inc.",
        "Gateway Inc.",
        "GATX Corporation",
        "Gemstar-TV Guide International Inc.",
        "GenCorp Inc.",
        "General Cable Corporation",
        "General Dynamics Corporation",
        "General Electric Company",
        "General Mills Inc",
        "General Motors Corporation",
        "Genesis Health Ventures Inc.",
        "Gentek Inc.",
        "Gentiva Health Services Inc.",
        "Genuine Parts Company",
        "Genuity Inc.",
        "Genzyme Corporation",
        "Georgia Gulf Corporation",
        "Georgia-Pacific Corporation",
        "Gillette Company",
        "Gold Kist Inc.",
        "Golden State Bancorp Inc.",
        "Golden West Financial Corporation",
        "Goldman Sachs Group Inc.",
        "Goodrich Corporation",
        "The Goodyear Tire & Rubber Company",
        "Granite Construction Incorporated",
        "Graybar Electric Company Inc.",
        "Great Lakes Chemical Corporation",
        "Great Plains Energy Inc.",
        "GreenPoint Financial Corp.",
        "Greif Bros. Corporation",
        "Grey Global Group Inc.",
        "Group 1 Automotive Inc.",
        "Guidant Corporation",
        "H&R Block Inc.",
        "H.B. Fuller Company",
        "H.J. Heinz Company",
        "Halliburton Co.",
        "Harley-Davidson Inc.",
        "Harman International Industries Inc.",
        "Harrah's Entertainment Inc.",
        "Harris Corp.",
        "Harsco Corp.",
        "Hartford Financial Services Group Inc.",
        "Hasbro Inc.",
        "Hawaiian Electric Industries Inc.",
        "HCA Inc.",
        "Health Management Associates Inc.",
        "Health Net Inc.",
        "Healthsouth Corp",
        "Henry Schein Inc.",
        "Hercules Inc.",
        "Herman Miller Inc.",
        "Hershey Foods Corp.",
        "Hewlett-Packard Company",
        "Hibernia Corp.",
        "Hillenbrand Industries Inc.",
        "Hilton Hotels Corp.",
        "Hollywood Entertainment Corp.",
        "Home Depot Inc.",
        "Hon Industries Inc.",
        "Honeywell International Inc.",
        "Hormel Foods Corp.",
        "Host Marriott Corp.",
        "Household International Corp.",
        "Hovnanian Enterprises Inc.",
        "Hub Group Inc.",
        "Hubbell Inc.",
        "Hughes Supply Inc.",
        "Humana Inc.",
        "Huntington Bancshares Inc.",
        "Idacorp Inc.",
        "IDT Corporation",
        "IKON Office Solutions Inc.",
        "Illinois Tool Works Inc.",
        "IMC Global Inc.",
        "Imperial Sugar Company",
        "IMS Health Inc.",
        "Ingles Market Inc",
        "Ingram Micro Inc.",
        "Insight Enterprises Inc.",
        "Integrated Electrical Services Inc.",
        "Intel Corporation",
        "International Paper Co.",
        "Interpublic Group of Companies Inc.",
        "Interstate Bakeries Corporation",
        "International Business Machines Corp.",
        "International Flavors & Fragrances Inc.",
        "International Multifoods Corporation",
        "Intuit Inc.",
        "IT Group Inc.",
        "ITT Industries Inc.",
        "Ivax Corp.",
        "J.B. Hunt Transport Services Inc.",
        "J.C. Penny Co.",
        "J.P. Morgan Chase & Co.",
        "Jabil Circuit Inc.",
        "Jack In The Box Inc.",
        "Jacobs Engineering Group Inc.",
        "JDS Uniphase Corp.",
        "Jefferson-Pilot Co.",
        "John Hancock Financial Services Inc.",
        "Johnson & Johnson",
        "Johnson Controls Inc.",
        "Jones Apparel Group Inc.",
        "KB Home",
        "Kellogg Company",
        "Kellwood Company",
        "Kelly Services Inc.",
        "Kemet Corp.",
        "Kennametal Inc.",
        "Kerr-McGee Corporation",
        "KeyCorp",
        "KeySpan Corp.",
        "Kimball International Inc.",
        "Kimberly-Clark Corporation",
        "Kindred Healthcare Inc.",
        "KLA-Tencor Corporation",
        "K-Mart Corp.",
        "Knight-Ridder Inc.",
        "Kohl's Corp.",
        "KPMG Consulting Inc.",
        "Kroger Co.",
        "L-3 Communications Holdings Inc.",
        "Laboratory Corporation of America Holdings",
        "Lam Research Corporation",
        "LandAmerica Financial Group Inc.",
        "Lands' End Inc.",
        "Landstar System Inc.",
        "La-Z-Boy Inc.",
        "Lear Corporation",
        "Legg Mason Inc.",
        "Leggett & Platt Inc.",
        "Lehman Brothers Holdings Inc.",
        "Lennar Corporation",
        "Lennox International Inc.",
        "Level 3 Communications Inc.",
        "Levi Strauss & Co.",
        "Lexmark International Inc.",
        "Limited Inc.",
        "Lincoln National Corporation",
        "Linens 'n Things Inc.",
        "Lithia Motors Inc.",
        "Liz Claiborne Inc.",
        "Lockheed Martin Corporation",
        "Loews Corporation",
        "Longs Drug Stores Corporation",
        "Louisiana-Pacific Corporation",
        "Lowe's Companies Inc.",
        "LSI Logic Corporation",
        "The LTV Corporation",
        "The Lubrizol Corporation",
        "Lucent Technologies Inc.",
        "Lyondell Chemical Company",
        "M & T Bank Corporation",
        "Magellan Health Services Inc.",
        "Mail-Well Inc.",
        "Mandalay Resort Group",
        "Manor Care Inc.",
        "Manpower Inc.",
        "Marathon Oil Corporation",
        "Mariner Health Care Inc.",
        "Markel Corporation",
        "Marriott International Inc.",
        "Marsh & McLennan Companies Inc.",
        "Marsh Supermarkets Inc.",
        "Marshall & Ilsley Corporation",
        "Martin Marietta Materials Inc.",
        "Masco Corporation",
        "Massey Energy Company",
        "MasTec Inc.",
        "Mattel Inc.",
        "Maxim Integrated Products Inc.",
        "Maxtor Corporation",
        "Maxxam Inc.",
        "The May Department Stores Company",
        "Maytag Corporation",
        "MBNA Corporation",
        "McCormick & Company Incorporated",
        "McDonald's Corporation",
        "The McGraw-Hill Companies Inc.",
        "McKesson Corporation",
        "McLeodUSA Incorporated",
        "M.D.C. Holdings Inc.",
        "MDU Resources Group Inc.",
        "MeadWestvaco Corporation",
        "Medtronic Inc.",
        "Mellon Financial Corporation",
        "The Men's Wearhouse Inc.",
        "Merck & Co., Inc.",
        "Mercury General Corporation",
        "Merrill Lynch & Co. Inc.",
        "Metaldyne Corporation",
        "Metals USA Inc.",
        "MetLife Inc.",
        "Metris Companies Inc",
        "MGIC Investment Corporation",
        "MGM Mirage",
        "Michaels Stores Inc.",
        "Micron Technology Inc.",
        "Microsoft Corporation",
        "Milacron Inc.",
        "Millennium Chemicals Inc.",
        "Mirant Corporation",
        "Mohawk Industries Inc.",
        "Molex Incorporated",
        "The MONY Group Inc.",
        "Morgan Stanley Dean Witter & Co.",
        "Motorola Inc.",
        "MPS Group Inc.",
        "Murphy Oil Corporation",
        "Nabors Industries Inc",
        "Nacco Industries Inc",
        "Nash Finch Company",
        "National City Corp.",
        "National Commerce Financial Corporation",
        "National Fuel Gas Company",
        "National Oilwell Inc",
        "National Rural Utilities Cooperative Finance Corporation",
        "National Semiconductor Corporation",
        "National Service Industries Inc",
        "Navistar International Corporation",
        "NCR Corporation",
        "The Neiman Marcus Group Inc.",
        "New Jersey Resources Corporation",
        "New York Times Company",
        "Newell Rubbermaid Inc",
        "Newmont Mining Corporation",
        "Nextel Communications Inc",
        "Nicor Inc",
        "Nike Inc",
        "NiSource Inc",
        "Noble Energy Inc",
        "Nordstrom Inc",
        "Norfolk Southern Corporation",
        "Nortek Inc",
        "North Fork Bancorporation Inc",
        "Northeast Utilities System",
        "Northern Trust Corporation",
        "Northrop Grumman Corporation",
        "NorthWestern Corporation",
        "Novellus Systems Inc",
        "NSTAR",
        "NTL Incorporated",
        "Nucor Corp",
        "Nvidia Corp",
        "NVR Inc",
        "Northwest Airlines Corp",
        "Occidental Petroleum Corp",
        "Ocean Energy Inc",
        "Office Depot Inc.",
        "OfficeMax Inc",
        "OGE Energy Corp",
        "Oglethorpe Power Corp.",
        "Ohio Casualty Corp.",
        "Old Republic International Corp.",
        "Olin Corp.",
        "OM Group Inc",
        "Omnicare Inc",
        "Omnicom Group",
        "On Semiconductor Corp",
        "ONEOK Inc",
        "Oracle Corp",
        "Oshkosh Truck Corp",
        "Outback Steakhouse Inc.",
        "Owens & Minor Inc.",
        "Owens Corning",
        "Owens-Illinois Inc",
        "Oxford Health Plans Inc",
        "Paccar Inc",
        "PacifiCare Health Systems Inc",
        "Packaging Corp. of America",
        "Pactiv Corp",
        "Pall Corp",
        "Pantry Inc",
        "Park Place Entertainment Corp",
        "Parker Hannifin Corp.",
        "Pathmark Stores Inc.",
        "Paychex Inc",
        "Payless Shoesource Inc",
        "Penn Traffic Co.",
        "Pennzoil-Quaker State Company",
        "Pentair Inc",
        "Peoples Energy Corp.",
        "PeopleSoft Inc",
        "Pep Boys Manny, Moe & Jack",
        "Potomac Electric Power Co.",
        "Pepsi Bottling Group Inc.",
        "PepsiAmericas Inc.",
        "PepsiCo Inc.",
        "Performance Food Group Co.",
        "Perini Corp",
        "PerkinElmer Inc",
        "Perot Systems Corp",
        "Petco Animal Supplies Inc.",
        "Peter Kiewit Sons', Inc.",
        "PETsMART Inc",
        "Pfizer Inc",
        "Pacific Gas & Electric Corp.",
        "Pharmacia Corp",
        "Phar Mor Inc.",
        "Phelps Dodge Corp.",
        "Philip Morris Companies Inc.",
        "Phillips Petroleum Co",
        "Phillips Van Heusen Corp.",
        "Phoenix Companies Inc",
        "Pier 1 Imports Inc.",
        "Pilgrim's Pride Corporation",
        "Pinnacle West Capital Corp",
        "Pioneer-Standard Electronics Inc.",
        "Pitney Bowes Inc.",
        "Pittston Brinks Group",
        "Plains All American Pipeline LP",
        "PNC Financial Services Group Inc.",
        "PNM Resources Inc",
        "Polaris Industries Inc.",
        "Polo Ralph Lauren Corp",
        "PolyOne Corp",
        "Popular Inc",
        "Potlatch Corp",
        "PPG Industries Inc",
        "PPL Corp",
        "Praxair Inc",
        "Precision Castparts Corp",
        "Premcor Inc.",
        "Pride International Inc",
        "Primedia Inc",
        "Principal Financial Group Inc.",
        "Procter & Gamble Co.",
        "Pro-Fac Cooperative Inc.",
        "Progress Energy Inc",
        "Progressive Corporation",
        "Protective Life Corp",
        "Provident Financial Group",
        "Providian Financial Corp.",
        "Prudential Financial Inc.",
        "PSS World Medical Inc",
        "Public Service Enterprise Group Inc.",
        "Publix Super Markets Inc.",
        "Puget Energy Inc.",
        "Pulte Homes Inc",
        "Qualcomm Inc",
        "Quanta Services Inc.",
        "Quantum Corp",
        "Quest Diagnostics Inc.",
        "Questar Corp",
        "Quintiles Transnational",
        "Qwest Communications Intl Inc",
        "R.J. Reynolds Tobacco Company",
        "R.R. Donnelley & Sons Company",
        "Radio Shack Corporation",
        "Raymond James Financial Inc.",
        "Raytheon Company",
        "Reader's Digest Association Inc.",
        "Reebok International Ltd.",
        "Regions Financial Corp.",
        "Regis Corporation",
        "Reliance Steel & Aluminum Co.",
        "Reliant Energy Inc.",
        "Rent A Center Inc",
        "Republic Services Inc",
        "Revlon Inc",
        "RGS Energy Group Inc",
        "Rite Aid Corp",
        "Riverwood Holding Inc.",
        "RoadwayCorp",
        "Robert Half International Inc.",
        "Rock-Tenn Co",
        "Rockwell Automation Inc",
        "Rockwell Collins Inc",
        "Rohm & Haas Co.",
        "Ross Stores Inc",
        "RPM Inc.",
        "Ruddick Corp",
        "Ryder System Inc",
        "Ryerson Tull Inc",
        "Ryland Group Inc.",
        "Sabre Holdings Corp",
        "Safeco Corp",
        "Safeguard Scientifics Inc.",
        "Safeway Inc",
        "Saks Inc",
        "Sanmina-SCI Inc",
        "Sara Lee Corp",
        "SBC Communications Inc",
        "Scana Corp.",
        "Schering-Plough Corp",
        "Scholastic Corp",
        "SCI Systems Onc.",
        "Science Applications Intl. Inc.",
        "Scientific-Atlanta Inc",
        "Scotts Company",
        "Seaboard Corp",
        "Sealed Air Corp",
        "Sears Roebuck & Co",
        "Sempra Energy",
        "Sequa Corp",
        "Service Corp. International",
        "ServiceMaster Co",
        "Shaw Group Inc",
        "Sherwin-Williams Company",
        "Shopko Stores Inc",
        "Siebel Systems Inc",
        "Sierra Health Services Inc",
        "Sierra Pacific Resources",
        "Silgan Holdings Inc.",
        "Silicon Graphics Inc",
        "Simon Property Group Inc",
        "SLM Corporation",
        "Smith International Inc",
        "Smithfield Foods Inc",
        "Smurfit-Stone Container Corp",
        "Snap-On Inc",
        "Solectron Corp",
        "Solutia Inc",
        "Sonic Automotive Inc.",
        "Sonoco Products Co.",
        "Southern Company",
        "Southern Union Company",
        "SouthTrust Corp.",
        "Southwest Airlines Co",
        "Southwest Gas Corp",
        "Sovereign Bancorp Inc.",
        "Spartan Stores Inc",
        "Spherion Corp",
        "Sports Authority Inc",
        "Sprint Corp.",
        "SPX Corp",
        "St. Jude Medical Inc",
        "St. Paul Cos.",
        "Staff Leasing Inc.",
        "StanCorp Financial Group Inc",
        "Standard Pacific Corp.",
        "Stanley Works",
        "Staples Inc",
        "Starbucks Corp",
        "Starwood Hotels & Resorts Worldwide Inc",
        "State Street Corp.",
        "Stater Bros. Holdings Inc.",
        "Steelcase Inc",
        "Stein Mart Inc",
        "Stewart & Stevenson Services Inc",
        "Stewart Information Services Corp",
        "Stilwell Financial Inc",
        "Storage Technology Corporation",
        "Stryker Corp",
        "Sun Healthcare Group Inc.",
        "Sun Microsystems Inc.",
        "SunGard Data Systems Inc.",
        "Sunoco Inc.",
        "SunTrust Banks Inc",
        "Supervalu Inc",
        "Swift Transportation, Co., Inc",
        "Symbol Technologies Inc",
        "Synovus Financial Corp.",
        "Sysco Corp",
        "Systemax Inc.",
        "Target Corp.",
        "Tech Data Corporation",
        "TECO Energy Inc",
        "Tecumseh Products Company",
        "Tektronix Inc",
        "Teleflex Incorporated",
        "Telephone & Data Systems Inc",
        "Tellabs Inc.",
        "Temple-Inland Inc",
        "Tenet Healthcare Corporation",
        "Tenneco Automotive Inc.",
        "Teradyne Inc",
        "Terex Corp",
        "Tesoro Petroleum Corp.",
        "Texas Industries Inc.",
        "Texas Instruments Incorporated",
        "Textron Inc",
        "Thermo Electron Corporation",
        "Thomas & Betts Corporation",
        "Tiffany & Co",
        "Timken Company",
        "TJX Companies Inc",
        "TMP Worldwide Inc",
        "Toll Brothers Inc",
        "Torchmark Corporation",
        "Toro Company",
        "Tower Automotive Inc.",
        "Toys 'R' Us Inc",
        "Trans World Entertainment Corp.",
        "TransMontaigne Inc",
        "Transocean Inc",
        "TravelCenters of America Inc.",
        "Triad Hospitals Inc",
        "Tribune Company",
        "Trigon Healthcare Inc.",
        "Trinity Industries Inc",
        "Trump Hotels & Casino Resorts Inc.",
        "TruServ Corporation",
        "TRW Inc",
        "TXU Corp",
        "Tyson Foods Inc",
        "U.S. Bancorp",
        "U.S. Industries Inc.",
        "UAL Corporation",
        "UGI Corporation",
        "Unified Western Grocers Inc",
        "Union Pacific Corporation",
        "Union Planters Corp",
        "Unisource Energy Corp",
        "Unisys Corporation",
        "United Auto Group Inc",
        "United Defense Industries Inc.",
        "United Parcel Service Inc",
        "United Rentals Inc",
        "United Stationers Inc",
        "United Technologies Corporation",
        "UnitedHealth Group Incorporated",
        "Unitrin Inc",
        "Universal Corporation",
        "Universal Forest Products Inc",
        "Universal Health Services Inc",
        "Unocal Corporation",
        "Unova Inc",
        "UnumProvident Corporation",
        "URS Corporation",
        "US Airways Group Inc",
        "US Oncology Inc",
        "USA Interactive",
        "USFreighways Corporation",
        "USG Corporation",
        "UST Inc",
        "Valero Energy Corporation",
        "Valspar Corporation",
        "Value City Department Stores Inc",
        "Varco International Inc",
        "Vectren Corporation",
        "Veritas Software Corporation",
        "Verizon Communications Inc",
        "VF Corporation",
        "Viacom Inc",
        "Viad Corp",
        "Viasystems Group Inc",
        "Vishay Intertechnology Inc",
        "Visteon Corporation",
        "Volt Information Sciences Inc",
        "Vulcan Materials Company",
        "W.R. Berkley Corporation",
        "W.R. Grace & Co",
        "W.W. Grainger Inc",
        "Wachovia Corporation",
        "Wakenhut Corporation",
        "Walgreen Co",
        "Wallace Computer Services Inc",
        "Wal-Mart Stores Inc",
        "Walt Disney Co",
        "Walter Industries Inc",
        "Washington Mutual Inc",
        "Washington Post Co.",
        "Waste Management Inc",
        "Watsco Inc",
        "Weatherford International Inc",
        "Weis Markets Inc.",
        "Wellpoint Health Networks Inc",
        "Wells Fargo & Company",
        "Wendy's International Inc",
        "Werner Enterprises Inc",
        "WESCO International Inc",
        "Western Digital Inc",
        "Western Gas Resources Inc",
        "WestPoint Stevens Inc",
        "Weyerhauser Company",
        "WGL Holdings Inc",
        "Whirlpool Corporation",
        "Whole Foods Market Inc",
        "Willamette Industries Inc.",
        "Williams Companies Inc",
        "Williams Sonoma Inc",
        "Winn Dixie Stores Inc",
        "Wisconsin Energy Corporation",
        "Wm Wrigley Jr Company",
        "World Fuel Services Corporation",
        "WorldCom Inc",
        "Worthington Industries Inc",
        "WPS Resources Corporation",
        "Wyeth",
        "Wyndham International Inc",
        "Xcel Energy Inc",
        "Xerox Corp",
        "Xilinx Inc",
        "XO Communications Inc",
        "Yellow Corporation",
        "York International Corp",
        "Yum Brands Inc.",
        "Zale Corporation",
        "Zions Bancorporation"
      ],
      fileExtension: {
        raster: ["bmp", "gif", "gpl", "ico", "jpeg", "psd", "png", "psp", "raw", "tiff"],
        vector: ["3dv", "amf", "awg", "ai", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "odg", "svg", "xar"],
        "3d": ["3dmf", "3dm", "3mf", "3ds", "an8", "aoi", "blend", "cal3d", "cob", "ctm", "iob", "jas", "max", "mb", "mdx", "obj", "x", "x3d"],
        document: ["doc", "docx", "dot", "html", "xml", "odt", "odm", "ott", "csv", "rtf", "tex", "xhtml", "xps"]
      },
      // Data taken from https://github.com/dmfilipenko/timezones.json/blob/master/timezones.json
      timezones: [
        {
          name: "Dateline Standard Time",
          abbr: "DST",
          offset: -12,
          isdst: !1,
          text: "(UTC-12:00) International Date Line West",
          utc: [
            "Etc/GMT+12"
          ]
        },
        {
          name: "UTC-11",
          abbr: "U",
          offset: -11,
          isdst: !1,
          text: "(UTC-11:00) Coordinated Universal Time-11",
          utc: [
            "Etc/GMT+11",
            "Pacific/Midway",
            "Pacific/Niue",
            "Pacific/Pago_Pago"
          ]
        },
        {
          name: "Hawaiian Standard Time",
          abbr: "HST",
          offset: -10,
          isdst: !1,
          text: "(UTC-10:00) Hawaii",
          utc: [
            "Etc/GMT+10",
            "Pacific/Honolulu",
            "Pacific/Johnston",
            "Pacific/Rarotonga",
            "Pacific/Tahiti"
          ]
        },
        {
          name: "Alaskan Standard Time",
          abbr: "AKDT",
          offset: -8,
          isdst: !0,
          text: "(UTC-09:00) Alaska",
          utc: [
            "America/Anchorage",
            "America/Juneau",
            "America/Nome",
            "America/Sitka",
            "America/Yakutat"
          ]
        },
        {
          name: "Pacific Standard Time (Mexico)",
          abbr: "PDT",
          offset: -7,
          isdst: !0,
          text: "(UTC-08:00) Baja California",
          utc: [
            "America/Santa_Isabel"
          ]
        },
        {
          name: "Pacific Daylight Time",
          abbr: "PDT",
          offset: -7,
          isdst: !0,
          text: "(UTC-07:00) Pacific Time (US & Canada)",
          utc: [
            "America/Dawson",
            "America/Los_Angeles",
            "America/Tijuana",
            "America/Vancouver",
            "America/Whitehorse"
          ]
        },
        {
          name: "Pacific Standard Time",
          abbr: "PST",
          offset: -8,
          isdst: !1,
          text: "(UTC-08:00) Pacific Time (US & Canada)",
          utc: [
            "America/Dawson",
            "America/Los_Angeles",
            "America/Tijuana",
            "America/Vancouver",
            "America/Whitehorse",
            "PST8PDT"
          ]
        },
        {
          name: "US Mountain Standard Time",
          abbr: "UMST",
          offset: -7,
          isdst: !1,
          text: "(UTC-07:00) Arizona",
          utc: [
            "America/Creston",
            "America/Dawson_Creek",
            "America/Hermosillo",
            "America/Phoenix",
            "Etc/GMT+7"
          ]
        },
        {
          name: "Mountain Standard Time (Mexico)",
          abbr: "MDT",
          offset: -6,
          isdst: !0,
          text: "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
          utc: [
            "America/Chihuahua",
            "America/Mazatlan"
          ]
        },
        {
          name: "Mountain Standard Time",
          abbr: "MDT",
          offset: -6,
          isdst: !0,
          text: "(UTC-07:00) Mountain Time (US & Canada)",
          utc: [
            "America/Boise",
            "America/Cambridge_Bay",
            "America/Denver",
            "America/Edmonton",
            "America/Inuvik",
            "America/Ojinaga",
            "America/Yellowknife",
            "MST7MDT"
          ]
        },
        {
          name: "Central America Standard Time",
          abbr: "CAST",
          offset: -6,
          isdst: !1,
          text: "(UTC-06:00) Central America",
          utc: [
            "America/Belize",
            "America/Costa_Rica",
            "America/El_Salvador",
            "America/Guatemala",
            "America/Managua",
            "America/Tegucigalpa",
            "Etc/GMT+6",
            "Pacific/Galapagos"
          ]
        },
        {
          name: "Central Standard Time",
          abbr: "CDT",
          offset: -5,
          isdst: !0,
          text: "(UTC-06:00) Central Time (US & Canada)",
          utc: [
            "America/Chicago",
            "America/Indiana/Knox",
            "America/Indiana/Tell_City",
            "America/Matamoros",
            "America/Menominee",
            "America/North_Dakota/Beulah",
            "America/North_Dakota/Center",
            "America/North_Dakota/New_Salem",
            "America/Rainy_River",
            "America/Rankin_Inlet",
            "America/Resolute",
            "America/Winnipeg",
            "CST6CDT"
          ]
        },
        {
          name: "Central Standard Time (Mexico)",
          abbr: "CDT",
          offset: -5,
          isdst: !0,
          text: "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
          utc: [
            "America/Bahia_Banderas",
            "America/Cancun",
            "America/Merida",
            "America/Mexico_City",
            "America/Monterrey"
          ]
        },
        {
          name: "Canada Central Standard Time",
          abbr: "CCST",
          offset: -6,
          isdst: !1,
          text: "(UTC-06:00) Saskatchewan",
          utc: [
            "America/Regina",
            "America/Swift_Current"
          ]
        },
        {
          name: "SA Pacific Standard Time",
          abbr: "SPST",
          offset: -5,
          isdst: !1,
          text: "(UTC-05:00) Bogota, Lima, Quito",
          utc: [
            "America/Bogota",
            "America/Cayman",
            "America/Coral_Harbour",
            "America/Eirunepe",
            "America/Guayaquil",
            "America/Jamaica",
            "America/Lima",
            "America/Panama",
            "America/Rio_Branco",
            "Etc/GMT+5"
          ]
        },
        {
          name: "Eastern Standard Time",
          abbr: "EDT",
          offset: -4,
          isdst: !0,
          text: "(UTC-05:00) Eastern Time (US & Canada)",
          utc: [
            "America/Detroit",
            "America/Havana",
            "America/Indiana/Petersburg",
            "America/Indiana/Vincennes",
            "America/Indiana/Winamac",
            "America/Iqaluit",
            "America/Kentucky/Monticello",
            "America/Louisville",
            "America/Montreal",
            "America/Nassau",
            "America/New_York",
            "America/Nipigon",
            "America/Pangnirtung",
            "America/Port-au-Prince",
            "America/Thunder_Bay",
            "America/Toronto",
            "EST5EDT"
          ]
        },
        {
          name: "US Eastern Standard Time",
          abbr: "UEDT",
          offset: -4,
          isdst: !0,
          text: "(UTC-05:00) Indiana (East)",
          utc: [
            "America/Indiana/Marengo",
            "America/Indiana/Vevay",
            "America/Indianapolis"
          ]
        },
        {
          name: "Venezuela Standard Time",
          abbr: "VST",
          offset: -4.5,
          isdst: !1,
          text: "(UTC-04:30) Caracas",
          utc: [
            "America/Caracas"
          ]
        },
        {
          name: "Paraguay Standard Time",
          abbr: "PYT",
          offset: -4,
          isdst: !1,
          text: "(UTC-04:00) Asuncion",
          utc: [
            "America/Asuncion"
          ]
        },
        {
          name: "Atlantic Standard Time",
          abbr: "ADT",
          offset: -3,
          isdst: !0,
          text: "(UTC-04:00) Atlantic Time (Canada)",
          utc: [
            "America/Glace_Bay",
            "America/Goose_Bay",
            "America/Halifax",
            "America/Moncton",
            "America/Thule",
            "Atlantic/Bermuda"
          ]
        },
        {
          name: "Central Brazilian Standard Time",
          abbr: "CBST",
          offset: -4,
          isdst: !1,
          text: "(UTC-04:00) Cuiaba",
          utc: [
            "America/Campo_Grande",
            "America/Cuiaba"
          ]
        },
        {
          name: "SA Western Standard Time",
          abbr: "SWST",
          offset: -4,
          isdst: !1,
          text: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
          utc: [
            "America/Anguilla",
            "America/Antigua",
            "America/Aruba",
            "America/Barbados",
            "America/Blanc-Sablon",
            "America/Boa_Vista",
            "America/Curacao",
            "America/Dominica",
            "America/Grand_Turk",
            "America/Grenada",
            "America/Guadeloupe",
            "America/Guyana",
            "America/Kralendijk",
            "America/La_Paz",
            "America/Lower_Princes",
            "America/Manaus",
            "America/Marigot",
            "America/Martinique",
            "America/Montserrat",
            "America/Port_of_Spain",
            "America/Porto_Velho",
            "America/Puerto_Rico",
            "America/Santo_Domingo",
            "America/St_Barthelemy",
            "America/St_Kitts",
            "America/St_Lucia",
            "America/St_Thomas",
            "America/St_Vincent",
            "America/Tortola",
            "Etc/GMT+4"
          ]
        },
        {
          name: "Pacific SA Standard Time",
          abbr: "PSST",
          offset: -4,
          isdst: !1,
          text: "(UTC-04:00) Santiago",
          utc: [
            "America/Santiago",
            "Antarctica/Palmer"
          ]
        },
        {
          name: "Newfoundland Standard Time",
          abbr: "NDT",
          offset: -2.5,
          isdst: !0,
          text: "(UTC-03:30) Newfoundland",
          utc: [
            "America/St_Johns"
          ]
        },
        {
          name: "E. South America Standard Time",
          abbr: "ESAST",
          offset: -3,
          isdst: !1,
          text: "(UTC-03:00) Brasilia",
          utc: [
            "America/Sao_Paulo"
          ]
        },
        {
          name: "Argentina Standard Time",
          abbr: "AST",
          offset: -3,
          isdst: !1,
          text: "(UTC-03:00) Buenos Aires",
          utc: [
            "America/Argentina/La_Rioja",
            "America/Argentina/Rio_Gallegos",
            "America/Argentina/Salta",
            "America/Argentina/San_Juan",
            "America/Argentina/San_Luis",
            "America/Argentina/Tucuman",
            "America/Argentina/Ushuaia",
            "America/Buenos_Aires",
            "America/Catamarca",
            "America/Cordoba",
            "America/Jujuy",
            "America/Mendoza"
          ]
        },
        {
          name: "SA Eastern Standard Time",
          abbr: "SEST",
          offset: -3,
          isdst: !1,
          text: "(UTC-03:00) Cayenne, Fortaleza",
          utc: [
            "America/Araguaina",
            "America/Belem",
            "America/Cayenne",
            "America/Fortaleza",
            "America/Maceio",
            "America/Paramaribo",
            "America/Recife",
            "America/Santarem",
            "Antarctica/Rothera",
            "Atlantic/Stanley",
            "Etc/GMT+3"
          ]
        },
        {
          name: "Greenland Standard Time",
          abbr: "GDT",
          offset: -3,
          isdst: !0,
          text: "(UTC-03:00) Greenland",
          utc: [
            "America/Godthab"
          ]
        },
        {
          name: "Montevideo Standard Time",
          abbr: "MST",
          offset: -3,
          isdst: !1,
          text: "(UTC-03:00) Montevideo",
          utc: [
            "America/Montevideo"
          ]
        },
        {
          name: "Bahia Standard Time",
          abbr: "BST",
          offset: -3,
          isdst: !1,
          text: "(UTC-03:00) Salvador",
          utc: [
            "America/Bahia"
          ]
        },
        {
          name: "UTC-02",
          abbr: "U",
          offset: -2,
          isdst: !1,
          text: "(UTC-02:00) Coordinated Universal Time-02",
          utc: [
            "America/Noronha",
            "Atlantic/South_Georgia",
            "Etc/GMT+2"
          ]
        },
        {
          name: "Mid-Atlantic Standard Time",
          abbr: "MDT",
          offset: -1,
          isdst: !0,
          text: "(UTC-02:00) Mid-Atlantic - Old",
          utc: []
        },
        {
          name: "Azores Standard Time",
          abbr: "ADT",
          offset: 0,
          isdst: !0,
          text: "(UTC-01:00) Azores",
          utc: [
            "America/Scoresbysund",
            "Atlantic/Azores"
          ]
        },
        {
          name: "Cape Verde Standard Time",
          abbr: "CVST",
          offset: -1,
          isdst: !1,
          text: "(UTC-01:00) Cape Verde Is.",
          utc: [
            "Atlantic/Cape_Verde",
            "Etc/GMT+1"
          ]
        },
        {
          name: "Morocco Standard Time",
          abbr: "MDT",
          offset: 1,
          isdst: !0,
          text: "(UTC) Casablanca",
          utc: [
            "Africa/Casablanca",
            "Africa/El_Aaiun"
          ]
        },
        {
          name: "UTC",
          abbr: "UTC",
          offset: 0,
          isdst: !1,
          text: "(UTC) Coordinated Universal Time",
          utc: [
            "America/Danmarkshavn",
            "Etc/GMT"
          ]
        },
        {
          name: "GMT Standard Time",
          abbr: "GMT",
          offset: 0,
          isdst: !1,
          text: "(UTC) Edinburgh, London",
          utc: [
            "Europe/Isle_of_Man",
            "Europe/Guernsey",
            "Europe/Jersey",
            "Europe/London"
          ]
        },
        {
          name: "British Summer Time",
          abbr: "BST",
          offset: 1,
          isdst: !0,
          text: "(UTC+01:00) Edinburgh, London",
          utc: [
            "Europe/Isle_of_Man",
            "Europe/Guernsey",
            "Europe/Jersey",
            "Europe/London"
          ]
        },
        {
          name: "GMT Standard Time",
          abbr: "GDT",
          offset: 1,
          isdst: !0,
          text: "(UTC) Dublin, Lisbon",
          utc: [
            "Atlantic/Canary",
            "Atlantic/Faeroe",
            "Atlantic/Madeira",
            "Europe/Dublin",
            "Europe/Lisbon"
          ]
        },
        {
          name: "Greenwich Standard Time",
          abbr: "GST",
          offset: 0,
          isdst: !1,
          text: "(UTC) Monrovia, Reykjavik",
          utc: [
            "Africa/Abidjan",
            "Africa/Accra",
            "Africa/Bamako",
            "Africa/Banjul",
            "Africa/Bissau",
            "Africa/Conakry",
            "Africa/Dakar",
            "Africa/Freetown",
            "Africa/Lome",
            "Africa/Monrovia",
            "Africa/Nouakchott",
            "Africa/Ouagadougou",
            "Africa/Sao_Tome",
            "Atlantic/Reykjavik",
            "Atlantic/St_Helena"
          ]
        },
        {
          name: "W. Europe Standard Time",
          abbr: "WEDT",
          offset: 2,
          isdst: !0,
          text: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
          utc: [
            "Arctic/Longyearbyen",
            "Europe/Amsterdam",
            "Europe/Andorra",
            "Europe/Berlin",
            "Europe/Busingen",
            "Europe/Gibraltar",
            "Europe/Luxembourg",
            "Europe/Malta",
            "Europe/Monaco",
            "Europe/Oslo",
            "Europe/Rome",
            "Europe/San_Marino",
            "Europe/Stockholm",
            "Europe/Vaduz",
            "Europe/Vatican",
            "Europe/Vienna",
            "Europe/Zurich"
          ]
        },
        {
          name: "Central Europe Standard Time",
          abbr: "CEDT",
          offset: 2,
          isdst: !0,
          text: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
          utc: [
            "Europe/Belgrade",
            "Europe/Bratislava",
            "Europe/Budapest",
            "Europe/Ljubljana",
            "Europe/Podgorica",
            "Europe/Prague",
            "Europe/Tirane"
          ]
        },
        {
          name: "Romance Standard Time",
          abbr: "RDT",
          offset: 2,
          isdst: !0,
          text: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
          utc: [
            "Africa/Ceuta",
            "Europe/Brussels",
            "Europe/Copenhagen",
            "Europe/Madrid",
            "Europe/Paris"
          ]
        },
        {
          name: "Central European Standard Time",
          abbr: "CEDT",
          offset: 2,
          isdst: !0,
          text: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
          utc: [
            "Europe/Sarajevo",
            "Europe/Skopje",
            "Europe/Warsaw",
            "Europe/Zagreb"
          ]
        },
        {
          name: "W. Central Africa Standard Time",
          abbr: "WCAST",
          offset: 1,
          isdst: !1,
          text: "(UTC+01:00) West Central Africa",
          utc: [
            "Africa/Algiers",
            "Africa/Bangui",
            "Africa/Brazzaville",
            "Africa/Douala",
            "Africa/Kinshasa",
            "Africa/Lagos",
            "Africa/Libreville",
            "Africa/Luanda",
            "Africa/Malabo",
            "Africa/Ndjamena",
            "Africa/Niamey",
            "Africa/Porto-Novo",
            "Africa/Tunis",
            "Etc/GMT-1"
          ]
        },
        {
          name: "Namibia Standard Time",
          abbr: "NST",
          offset: 1,
          isdst: !1,
          text: "(UTC+01:00) Windhoek",
          utc: [
            "Africa/Windhoek"
          ]
        },
        {
          name: "GTB Standard Time",
          abbr: "GDT",
          offset: 3,
          isdst: !0,
          text: "(UTC+02:00) Athens, Bucharest",
          utc: [
            "Asia/Nicosia",
            "Europe/Athens",
            "Europe/Bucharest",
            "Europe/Chisinau"
          ]
        },
        {
          name: "Middle East Standard Time",
          abbr: "MEDT",
          offset: 3,
          isdst: !0,
          text: "(UTC+02:00) Beirut",
          utc: [
            "Asia/Beirut"
          ]
        },
        {
          name: "Egypt Standard Time",
          abbr: "EST",
          offset: 2,
          isdst: !1,
          text: "(UTC+02:00) Cairo",
          utc: [
            "Africa/Cairo"
          ]
        },
        {
          name: "Syria Standard Time",
          abbr: "SDT",
          offset: 3,
          isdst: !0,
          text: "(UTC+02:00) Damascus",
          utc: [
            "Asia/Damascus"
          ]
        },
        {
          name: "E. Europe Standard Time",
          abbr: "EEDT",
          offset: 3,
          isdst: !0,
          text: "(UTC+02:00) E. Europe",
          utc: [
            "Asia/Nicosia",
            "Europe/Athens",
            "Europe/Bucharest",
            "Europe/Chisinau",
            "Europe/Helsinki",
            "Europe/Kiev",
            "Europe/Mariehamn",
            "Europe/Nicosia",
            "Europe/Riga",
            "Europe/Sofia",
            "Europe/Tallinn",
            "Europe/Uzhgorod",
            "Europe/Vilnius",
            "Europe/Zaporozhye"
          ]
        },
        {
          name: "South Africa Standard Time",
          abbr: "SAST",
          offset: 2,
          isdst: !1,
          text: "(UTC+02:00) Harare, Pretoria",
          utc: [
            "Africa/Blantyre",
            "Africa/Bujumbura",
            "Africa/Gaborone",
            "Africa/Harare",
            "Africa/Johannesburg",
            "Africa/Kigali",
            "Africa/Lubumbashi",
            "Africa/Lusaka",
            "Africa/Maputo",
            "Africa/Maseru",
            "Africa/Mbabane",
            "Etc/GMT-2"
          ]
        },
        {
          name: "FLE Standard Time",
          abbr: "FDT",
          offset: 3,
          isdst: !0,
          text: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
          utc: [
            "Europe/Helsinki",
            "Europe/Kiev",
            "Europe/Mariehamn",
            "Europe/Riga",
            "Europe/Sofia",
            "Europe/Tallinn",
            "Europe/Uzhgorod",
            "Europe/Vilnius",
            "Europe/Zaporozhye"
          ]
        },
        {
          name: "Turkey Standard Time",
          abbr: "TDT",
          offset: 3,
          isdst: !1,
          text: "(UTC+03:00) Istanbul",
          utc: [
            "Europe/Istanbul"
          ]
        },
        {
          name: "Israel Standard Time",
          abbr: "JDT",
          offset: 3,
          isdst: !0,
          text: "(UTC+02:00) Jerusalem",
          utc: [
            "Asia/Jerusalem"
          ]
        },
        {
          name: "Libya Standard Time",
          abbr: "LST",
          offset: 2,
          isdst: !1,
          text: "(UTC+02:00) Tripoli",
          utc: [
            "Africa/Tripoli"
          ]
        },
        {
          name: "Jordan Standard Time",
          abbr: "JST",
          offset: 3,
          isdst: !1,
          text: "(UTC+03:00) Amman",
          utc: [
            "Asia/Amman"
          ]
        },
        {
          name: "Arabic Standard Time",
          abbr: "AST",
          offset: 3,
          isdst: !1,
          text: "(UTC+03:00) Baghdad",
          utc: [
            "Asia/Baghdad"
          ]
        },
        {
          name: "Kaliningrad Standard Time",
          abbr: "KST",
          offset: 3,
          isdst: !1,
          text: "(UTC+02:00) Kaliningrad",
          utc: [
            "Europe/Kaliningrad"
          ]
        },
        {
          name: "Arab Standard Time",
          abbr: "AST",
          offset: 3,
          isdst: !1,
          text: "(UTC+03:00) Kuwait, Riyadh",
          utc: [
            "Asia/Aden",
            "Asia/Bahrain",
            "Asia/Kuwait",
            "Asia/Qatar",
            "Asia/Riyadh"
          ]
        },
        {
          name: "E. Africa Standard Time",
          abbr: "EAST",
          offset: 3,
          isdst: !1,
          text: "(UTC+03:00) Nairobi",
          utc: [
            "Africa/Addis_Ababa",
            "Africa/Asmera",
            "Africa/Dar_es_Salaam",
            "Africa/Djibouti",
            "Africa/Juba",
            "Africa/Kampala",
            "Africa/Khartoum",
            "Africa/Mogadishu",
            "Africa/Nairobi",
            "Antarctica/Syowa",
            "Etc/GMT-3",
            "Indian/Antananarivo",
            "Indian/Comoro",
            "Indian/Mayotte"
          ]
        },
        {
          name: "Moscow Standard Time",
          abbr: "MSK",
          offset: 3,
          isdst: !1,
          text: "(UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk",
          utc: [
            "Europe/Kirov",
            "Europe/Moscow",
            "Europe/Simferopol",
            "Europe/Volgograd",
            "Europe/Minsk"
          ]
        },
        {
          name: "Samara Time",
          abbr: "SAMT",
          offset: 4,
          isdst: !1,
          text: "(UTC+04:00) Samara, Ulyanovsk, Saratov",
          utc: [
            "Europe/Astrakhan",
            "Europe/Samara",
            "Europe/Ulyanovsk"
          ]
        },
        {
          name: "Iran Standard Time",
          abbr: "IDT",
          offset: 4.5,
          isdst: !0,
          text: "(UTC+03:30) Tehran",
          utc: [
            "Asia/Tehran"
          ]
        },
        {
          name: "Arabian Standard Time",
          abbr: "AST",
          offset: 4,
          isdst: !1,
          text: "(UTC+04:00) Abu Dhabi, Muscat",
          utc: [
            "Asia/Dubai",
            "Asia/Muscat",
            "Etc/GMT-4"
          ]
        },
        {
          name: "Azerbaijan Standard Time",
          abbr: "ADT",
          offset: 5,
          isdst: !0,
          text: "(UTC+04:00) Baku",
          utc: [
            "Asia/Baku"
          ]
        },
        {
          name: "Mauritius Standard Time",
          abbr: "MST",
          offset: 4,
          isdst: !1,
          text: "(UTC+04:00) Port Louis",
          utc: [
            "Indian/Mahe",
            "Indian/Mauritius",
            "Indian/Reunion"
          ]
        },
        {
          name: "Georgian Standard Time",
          abbr: "GET",
          offset: 4,
          isdst: !1,
          text: "(UTC+04:00) Tbilisi",
          utc: [
            "Asia/Tbilisi"
          ]
        },
        {
          name: "Caucasus Standard Time",
          abbr: "CST",
          offset: 4,
          isdst: !1,
          text: "(UTC+04:00) Yerevan",
          utc: [
            "Asia/Yerevan"
          ]
        },
        {
          name: "Afghanistan Standard Time",
          abbr: "AST",
          offset: 4.5,
          isdst: !1,
          text: "(UTC+04:30) Kabul",
          utc: [
            "Asia/Kabul"
          ]
        },
        {
          name: "West Asia Standard Time",
          abbr: "WAST",
          offset: 5,
          isdst: !1,
          text: "(UTC+05:00) Ashgabat, Tashkent",
          utc: [
            "Antarctica/Mawson",
            "Asia/Aqtau",
            "Asia/Aqtobe",
            "Asia/Ashgabat",
            "Asia/Dushanbe",
            "Asia/Oral",
            "Asia/Samarkand",
            "Asia/Tashkent",
            "Etc/GMT-5",
            "Indian/Kerguelen",
            "Indian/Maldives"
          ]
        },
        {
          name: "Yekaterinburg Time",
          abbr: "YEKT",
          offset: 5,
          isdst: !1,
          text: "(UTC+05:00) Yekaterinburg",
          utc: [
            "Asia/Yekaterinburg"
          ]
        },
        {
          name: "Pakistan Standard Time",
          abbr: "PKT",
          offset: 5,
          isdst: !1,
          text: "(UTC+05:00) Islamabad, Karachi",
          utc: [
            "Asia/Karachi"
          ]
        },
        {
          name: "India Standard Time",
          abbr: "IST",
          offset: 5.5,
          isdst: !1,
          text: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
          utc: [
            "Asia/Kolkata"
          ]
        },
        {
          name: "Sri Lanka Standard Time",
          abbr: "SLST",
          offset: 5.5,
          isdst: !1,
          text: "(UTC+05:30) Sri Jayawardenepura",
          utc: [
            "Asia/Colombo"
          ]
        },
        {
          name: "Nepal Standard Time",
          abbr: "NST",
          offset: 5.75,
          isdst: !1,
          text: "(UTC+05:45) Kathmandu",
          utc: [
            "Asia/Kathmandu"
          ]
        },
        {
          name: "Central Asia Standard Time",
          abbr: "CAST",
          offset: 6,
          isdst: !1,
          text: "(UTC+06:00) Nur-Sultan (Astana)",
          utc: [
            "Antarctica/Vostok",
            "Asia/Almaty",
            "Asia/Bishkek",
            "Asia/Qyzylorda",
            "Asia/Urumqi",
            "Etc/GMT-6",
            "Indian/Chagos"
          ]
        },
        {
          name: "Bangladesh Standard Time",
          abbr: "BST",
          offset: 6,
          isdst: !1,
          text: "(UTC+06:00) Dhaka",
          utc: [
            "Asia/Dhaka",
            "Asia/Thimphu"
          ]
        },
        {
          name: "Myanmar Standard Time",
          abbr: "MST",
          offset: 6.5,
          isdst: !1,
          text: "(UTC+06:30) Yangon (Rangoon)",
          utc: [
            "Asia/Rangoon",
            "Indian/Cocos"
          ]
        },
        {
          name: "SE Asia Standard Time",
          abbr: "SAST",
          offset: 7,
          isdst: !1,
          text: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
          utc: [
            "Antarctica/Davis",
            "Asia/Bangkok",
            "Asia/Hovd",
            "Asia/Jakarta",
            "Asia/Phnom_Penh",
            "Asia/Pontianak",
            "Asia/Saigon",
            "Asia/Vientiane",
            "Etc/GMT-7",
            "Indian/Christmas"
          ]
        },
        {
          name: "N. Central Asia Standard Time",
          abbr: "NCAST",
          offset: 7,
          isdst: !1,
          text: "(UTC+07:00) Novosibirsk",
          utc: [
            "Asia/Novokuznetsk",
            "Asia/Novosibirsk",
            "Asia/Omsk"
          ]
        },
        {
          name: "China Standard Time",
          abbr: "CST",
          offset: 8,
          isdst: !1,
          text: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
          utc: [
            "Asia/Hong_Kong",
            "Asia/Macau",
            "Asia/Shanghai"
          ]
        },
        {
          name: "North Asia Standard Time",
          abbr: "NAST",
          offset: 8,
          isdst: !1,
          text: "(UTC+08:00) Krasnoyarsk",
          utc: [
            "Asia/Krasnoyarsk"
          ]
        },
        {
          name: "Singapore Standard Time",
          abbr: "MPST",
          offset: 8,
          isdst: !1,
          text: "(UTC+08:00) Kuala Lumpur, Singapore",
          utc: [
            "Asia/Brunei",
            "Asia/Kuala_Lumpur",
            "Asia/Kuching",
            "Asia/Makassar",
            "Asia/Manila",
            "Asia/Singapore",
            "Etc/GMT-8"
          ]
        },
        {
          name: "W. Australia Standard Time",
          abbr: "WAST",
          offset: 8,
          isdst: !1,
          text: "(UTC+08:00) Perth",
          utc: [
            "Antarctica/Casey",
            "Australia/Perth"
          ]
        },
        {
          name: "Taipei Standard Time",
          abbr: "TST",
          offset: 8,
          isdst: !1,
          text: "(UTC+08:00) Taipei",
          utc: [
            "Asia/Taipei"
          ]
        },
        {
          name: "Ulaanbaatar Standard Time",
          abbr: "UST",
          offset: 8,
          isdst: !1,
          text: "(UTC+08:00) Ulaanbaatar",
          utc: [
            "Asia/Choibalsan",
            "Asia/Ulaanbaatar"
          ]
        },
        {
          name: "North Asia East Standard Time",
          abbr: "NAEST",
          offset: 8,
          isdst: !1,
          text: "(UTC+08:00) Irkutsk",
          utc: [
            "Asia/Irkutsk"
          ]
        },
        {
          name: "Japan Standard Time",
          abbr: "JST",
          offset: 9,
          isdst: !1,
          text: "(UTC+09:00) Osaka, Sapporo, Tokyo",
          utc: [
            "Asia/Dili",
            "Asia/Jayapura",
            "Asia/Tokyo",
            "Etc/GMT-9",
            "Pacific/Palau"
          ]
        },
        {
          name: "Korea Standard Time",
          abbr: "KST",
          offset: 9,
          isdst: !1,
          text: "(UTC+09:00) Seoul",
          utc: [
            "Asia/Pyongyang",
            "Asia/Seoul"
          ]
        },
        {
          name: "Cen. Australia Standard Time",
          abbr: "CAST",
          offset: 9.5,
          isdst: !1,
          text: "(UTC+09:30) Adelaide",
          utc: [
            "Australia/Adelaide",
            "Australia/Broken_Hill"
          ]
        },
        {
          name: "AUS Central Standard Time",
          abbr: "ACST",
          offset: 9.5,
          isdst: !1,
          text: "(UTC+09:30) Darwin",
          utc: [
            "Australia/Darwin"
          ]
        },
        {
          name: "E. Australia Standard Time",
          abbr: "EAST",
          offset: 10,
          isdst: !1,
          text: "(UTC+10:00) Brisbane",
          utc: [
            "Australia/Brisbane",
            "Australia/Lindeman"
          ]
        },
        {
          name: "AUS Eastern Standard Time",
          abbr: "AEST",
          offset: 10,
          isdst: !1,
          text: "(UTC+10:00) Canberra, Melbourne, Sydney",
          utc: [
            "Australia/Melbourne",
            "Australia/Sydney"
          ]
        },
        {
          name: "West Pacific Standard Time",
          abbr: "WPST",
          offset: 10,
          isdst: !1,
          text: "(UTC+10:00) Guam, Port Moresby",
          utc: [
            "Antarctica/DumontDUrville",
            "Etc/GMT-10",
            "Pacific/Guam",
            "Pacific/Port_Moresby",
            "Pacific/Saipan",
            "Pacific/Truk"
          ]
        },
        {
          name: "Tasmania Standard Time",
          abbr: "TST",
          offset: 10,
          isdst: !1,
          text: "(UTC+10:00) Hobart",
          utc: [
            "Australia/Currie",
            "Australia/Hobart"
          ]
        },
        {
          name: "Yakutsk Standard Time",
          abbr: "YST",
          offset: 9,
          isdst: !1,
          text: "(UTC+09:00) Yakutsk",
          utc: [
            "Asia/Chita",
            "Asia/Khandyga",
            "Asia/Yakutsk"
          ]
        },
        {
          name: "Central Pacific Standard Time",
          abbr: "CPST",
          offset: 11,
          isdst: !1,
          text: "(UTC+11:00) Solomon Is., New Caledonia",
          utc: [
            "Antarctica/Macquarie",
            "Etc/GMT-11",
            "Pacific/Efate",
            "Pacific/Guadalcanal",
            "Pacific/Kosrae",
            "Pacific/Noumea",
            "Pacific/Ponape"
          ]
        },
        {
          name: "Vladivostok Standard Time",
          abbr: "VST",
          offset: 11,
          isdst: !1,
          text: "(UTC+11:00) Vladivostok",
          utc: [
            "Asia/Sakhalin",
            "Asia/Ust-Nera",
            "Asia/Vladivostok"
          ]
        },
        {
          name: "New Zealand Standard Time",
          abbr: "NZST",
          offset: 12,
          isdst: !1,
          text: "(UTC+12:00) Auckland, Wellington",
          utc: [
            "Antarctica/McMurdo",
            "Pacific/Auckland"
          ]
        },
        {
          name: "UTC+12",
          abbr: "U",
          offset: 12,
          isdst: !1,
          text: "(UTC+12:00) Coordinated Universal Time+12",
          utc: [
            "Etc/GMT-12",
            "Pacific/Funafuti",
            "Pacific/Kwajalein",
            "Pacific/Majuro",
            "Pacific/Nauru",
            "Pacific/Tarawa",
            "Pacific/Wake",
            "Pacific/Wallis"
          ]
        },
        {
          name: "Fiji Standard Time",
          abbr: "FST",
          offset: 12,
          isdst: !1,
          text: "(UTC+12:00) Fiji",
          utc: [
            "Pacific/Fiji"
          ]
        },
        {
          name: "Magadan Standard Time",
          abbr: "MST",
          offset: 12,
          isdst: !1,
          text: "(UTC+12:00) Magadan",
          utc: [
            "Asia/Anadyr",
            "Asia/Kamchatka",
            "Asia/Magadan",
            "Asia/Srednekolymsk"
          ]
        },
        {
          name: "Kamchatka Standard Time",
          abbr: "KDT",
          offset: 13,
          isdst: !0,
          text: "(UTC+12:00) Petropavlovsk-Kamchatsky - Old",
          utc: [
            "Asia/Kamchatka"
          ]
        },
        {
          name: "Tonga Standard Time",
          abbr: "TST",
          offset: 13,
          isdst: !1,
          text: "(UTC+13:00) Nuku'alofa",
          utc: [
            "Etc/GMT-13",
            "Pacific/Enderbury",
            "Pacific/Fakaofo",
            "Pacific/Tongatapu"
          ]
        },
        {
          name: "Samoa Standard Time",
          abbr: "SST",
          offset: 13,
          isdst: !1,
          text: "(UTC+13:00) Samoa",
          utc: [
            "Pacific/Apia"
          ]
        }
      ],
      //List source: http://answers.google.com/answers/threadview/id/589312.html
      profession: [
        "Airline Pilot",
        "Academic Team",
        "Accountant",
        "Account Executive",
        "Actor",
        "Actuary",
        "Acquisition Analyst",
        "Administrative Asst.",
        "Administrative Analyst",
        "Administrator",
        "Advertising Director",
        "Aerospace Engineer",
        "Agent",
        "Agricultural Inspector",
        "Agricultural Scientist",
        "Air Traffic Controller",
        "Animal Trainer",
        "Anthropologist",
        "Appraiser",
        "Architect",
        "Art Director",
        "Artist",
        "Astronomer",
        "Athletic Coach",
        "Auditor",
        "Author",
        "Baker",
        "Banker",
        "Bankruptcy Attorney",
        "Benefits Manager",
        "Biologist",
        "Bio-feedback Specialist",
        "Biomedical Engineer",
        "Biotechnical Researcher",
        "Broadcaster",
        "Broker",
        "Building Manager",
        "Building Contractor",
        "Building Inspector",
        "Business Analyst",
        "Business Planner",
        "Business Manager",
        "Buyer",
        "Call Center Manager",
        "Career Counselor",
        "Cash Manager",
        "Ceramic Engineer",
        "Chief Executive Officer",
        "Chief Operation Officer",
        "Chef",
        "Chemical Engineer",
        "Chemist",
        "Child Care Manager",
        "Chief Medical Officer",
        "Chiropractor",
        "Cinematographer",
        "City Housing Manager",
        "City Manager",
        "Civil Engineer",
        "Claims Manager",
        "Clinical Research Assistant",
        "Collections Manager",
        "Compliance Manager",
        "Comptroller",
        "Computer Manager",
        "Commercial Artist",
        "Communications Affairs Director",
        "Communications Director",
        "Communications Engineer",
        "Compensation Analyst",
        "Computer Programmer",
        "Computer Ops. Manager",
        "Computer Engineer",
        "Computer Operator",
        "Computer Graphics Specialist",
        "Construction Engineer",
        "Construction Manager",
        "Consultant",
        "Consumer Relations Manager",
        "Contract Administrator",
        "Copyright Attorney",
        "Copywriter",
        "Corporate Planner",
        "Corrections Officer",
        "Cosmetologist",
        "Credit Analyst",
        "Cruise Director",
        "Chief Information Officer",
        "Chief Technology Officer",
        "Customer Service Manager",
        "Cryptologist",
        "Dancer",
        "Data Security Manager",
        "Database Manager",
        "Day Care Instructor",
        "Dentist",
        "Designer",
        "Design Engineer",
        "Desktop Publisher",
        "Developer",
        "Development Officer",
        "Diamond Merchant",
        "Dietitian",
        "Direct Marketer",
        "Director",
        "Distribution Manager",
        "Diversity Manager",
        "Economist",
        "EEO Compliance Manager",
        "Editor",
        "Education Adminator",
        "Electrical Engineer",
        "Electro Optical Engineer",
        "Electronics Engineer",
        "Embassy Management",
        "Employment Agent",
        "Engineer Technician",
        "Entrepreneur",
        "Environmental Analyst",
        "Environmental Attorney",
        "Environmental Engineer",
        "Environmental Specialist",
        "Escrow Officer",
        "Estimator",
        "Executive Assistant",
        "Executive Director",
        "Executive Recruiter",
        "Facilities Manager",
        "Family Counselor",
        "Fashion Events Manager",
        "Fashion Merchandiser",
        "Fast Food Manager",
        "Film Producer",
        "Film Production Assistant",
        "Financial Analyst",
        "Financial Planner",
        "Financier",
        "Fine Artist",
        "Wildlife Specialist",
        "Fitness Consultant",
        "Flight Attendant",
        "Flight Engineer",
        "Floral Designer",
        "Food & Beverage Director",
        "Food Service Manager",
        "Forestry Technician",
        "Franchise Management",
        "Franchise Sales",
        "Fraud Investigator",
        "Freelance Writer",
        "Fund Raiser",
        "General Manager",
        "Geologist",
        "General Counsel",
        "Geriatric Specialist",
        "Gerontologist",
        "Glamour Photographer",
        "Golf Club Manager",
        "Gourmet Chef",
        "Graphic Designer",
        "Grounds Keeper",
        "Hazardous Waste Manager",
        "Health Care Manager",
        "Health Therapist",
        "Health Service Administrator",
        "Hearing Officer",
        "Home Economist",
        "Horticulturist",
        "Hospital Administrator",
        "Hotel Manager",
        "Human Resources Manager",
        "Importer",
        "Industrial Designer",
        "Industrial Engineer",
        "Information Director",
        "Inside Sales",
        "Insurance Adjuster",
        "Interior Decorator",
        "Internal Controls Director",
        "International Acct.",
        "International Courier",
        "International Lawyer",
        "Interpreter",
        "Investigator",
        "Investment Banker",
        "Investment Manager",
        "IT Architect",
        "IT Project Manager",
        "IT Systems Analyst",
        "Jeweler",
        "Joint Venture Manager",
        "Journalist",
        "Labor Negotiator",
        "Labor Organizer",
        "Labor Relations Manager",
        "Lab Services Director",
        "Lab Technician",
        "Land Developer",
        "Landscape Architect",
        "Law Enforcement Officer",
        "Lawyer",
        "Lead Software Engineer",
        "Lead Software Test Engineer",
        "Leasing Manager",
        "Legal Secretary",
        "Library Manager",
        "Litigation Attorney",
        "Loan Officer",
        "Lobbyist",
        "Logistics Manager",
        "Maintenance Manager",
        "Management Consultant",
        "Managed Care Director",
        "Managing Partner",
        "Manufacturing Director",
        "Manpower Planner",
        "Marine Biologist",
        "Market Res. Analyst",
        "Marketing Director",
        "Materials Manager",
        "Mathematician",
        "Membership Chairman",
        "Mechanic",
        "Mechanical Engineer",
        "Media Buyer",
        "Medical Investor",
        "Medical Secretary",
        "Medical Technician",
        "Mental Health Counselor",
        "Merchandiser",
        "Metallurgical Engineering",
        "Meteorologist",
        "Microbiologist",
        "MIS Manager",
        "Motion Picture Director",
        "Multimedia Director",
        "Musician",
        "Network Administrator",
        "Network Specialist",
        "Network Operator",
        "New Product Manager",
        "Novelist",
        "Nuclear Engineer",
        "Nuclear Specialist",
        "Nutritionist",
        "Nursing Administrator",
        "Occupational Therapist",
        "Oceanographer",
        "Office Manager",
        "Operations Manager",
        "Operations Research Director",
        "Optical Technician",
        "Optometrist",
        "Organizational Development Manager",
        "Outplacement Specialist",
        "Paralegal",
        "Park Ranger",
        "Patent Attorney",
        "Payroll Specialist",
        "Personnel Specialist",
        "Petroleum Engineer",
        "Pharmacist",
        "Photographer",
        "Physical Therapist",
        "Physician",
        "Physician Assistant",
        "Physicist",
        "Planning Director",
        "Podiatrist",
        "Political Analyst",
        "Political Scientist",
        "Politician",
        "Portfolio Manager",
        "Preschool Management",
        "Preschool Teacher",
        "Principal",
        "Private Banker",
        "Private Investigator",
        "Probation Officer",
        "Process Engineer",
        "Producer",
        "Product Manager",
        "Product Engineer",
        "Production Engineer",
        "Production Planner",
        "Professional Athlete",
        "Professional Coach",
        "Professor",
        "Project Engineer",
        "Project Manager",
        "Program Manager",
        "Property Manager",
        "Public Administrator",
        "Public Safety Director",
        "PR Specialist",
        "Publisher",
        "Purchasing Agent",
        "Publishing Director",
        "Quality Assurance Specialist",
        "Quality Control Engineer",
        "Quality Control Inspector",
        "Radiology Manager",
        "Railroad Engineer",
        "Real Estate Broker",
        "Recreational Director",
        "Recruiter",
        "Redevelopment Specialist",
        "Regulatory Affairs Manager",
        "Registered Nurse",
        "Rehabilitation Counselor",
        "Relocation Manager",
        "Reporter",
        "Research Specialist",
        "Restaurant Manager",
        "Retail Store Manager",
        "Risk Analyst",
        "Safety Engineer",
        "Sales Engineer",
        "Sales Trainer",
        "Sales Promotion Manager",
        "Sales Representative",
        "Sales Manager",
        "Service Manager",
        "Sanitation Engineer",
        "Scientific Programmer",
        "Scientific Writer",
        "Securities Analyst",
        "Security Consultant",
        "Security Director",
        "Seminar Presenter",
        "Ship's Officer",
        "Singer",
        "Social Director",
        "Social Program Planner",
        "Social Research",
        "Social Scientist",
        "Social Worker",
        "Sociologist",
        "Software Developer",
        "Software Engineer",
        "Software Test Engineer",
        "Soil Scientist",
        "Special Events Manager",
        "Special Education Teacher",
        "Special Projects Director",
        "Speech Pathologist",
        "Speech Writer",
        "Sports Event Manager",
        "Statistician",
        "Store Manager",
        "Strategic Alliance Director",
        "Strategic Planning Director",
        "Stress Reduction Specialist",
        "Stockbroker",
        "Surveyor",
        "Structural Engineer",
        "Superintendent",
        "Supply Chain Director",
        "System Engineer",
        "Systems Analyst",
        "Systems Programmer",
        "System Administrator",
        "Tax Specialist",
        "Teacher",
        "Technical Support Specialist",
        "Technical Illustrator",
        "Technical Writer",
        "Technology Director",
        "Telecom Analyst",
        "Telemarketer",
        "Theatrical Director",
        "Title Examiner",
        "Tour Escort",
        "Tour Guide Director",
        "Traffic Manager",
        "Trainer Translator",
        "Transportation Manager",
        "Travel Agent",
        "Treasurer",
        "TV Programmer",
        "Underwriter",
        "Union Representative",
        "University Administrator",
        "University Dean",
        "Urban Planner",
        "Veterinarian",
        "Vendor Relations Director",
        "Viticulturist",
        "Warehouse Manager"
      ],
      animals: {
        //list of ocean animals comes from https://owlcation.com/stem/list-of-ocean-animals
        ocean: ["Acantharea", "Anemone", "Angelfish King", "Ahi Tuna", "Albacore", "American Oyster", "Anchovy", "Armored Snail", "Arctic Char", "Atlantic Bluefin Tuna", "Atlantic Cod", "Atlantic Goliath Grouper", "Atlantic Trumpetfish", "Atlantic Wolffish", "Baleen Whale", "Banded Butterflyfish", "Banded Coral Shrimp", "Banded Sea Krait", "Barnacle", "Barndoor Skate", "Barracuda", "Basking Shark", "Bass", "Beluga Whale", "Bluebanded Goby", "Bluehead Wrasse", "Bluefish", "Bluestreak Cleaner-Wrasse", "Blue Marlin", "Blue Shark", "Blue Spiny Lobster", "Blue Tang", "Blue Whale", "Broadclub Cuttlefish", "Bull Shark", "Chambered Nautilus", "Chilean Basket Star", "Chilean Jack Mackerel", "Chinook Salmon", "Christmas Tree Worm", "Clam", "Clown Anemonefish", "Clown Triggerfish", "Cod", "Coelacanth", "Cockscomb Cup Coral", "Common Fangtooth", "Conch", "Cookiecutter Shark", "Copepod", "Coral", "Corydoras", "Cownose Ray", "Crab", "Crown-of-Thorns Starfish", "Cushion Star", "Cuttlefish", "California Sea Otters", "Dolphin", "Dolphinfish", "Dory", "Devil Fish", "Dugong", "Dumbo Octopus", "Dungeness Crab", "Eccentric Sand Dollar", "Edible Sea Cucumber", "Eel", "Elephant Seal", "Elkhorn Coral", "Emperor Shrimp", "Estuarine Crocodile", "Fathead Sculpin", "Fiddler Crab", "Fin Whale", "Flameback", "Flamingo Tongue Snail", "Flashlight Fish", "Flatback Turtle", "Flatfish", "Flying Fish", "Flounder", "Fluke", "French Angelfish", "Frilled Shark", "Fugu (also called Pufferfish)", "Gar", "Geoduck", "Giant Barrel Sponge", "Giant Caribbean Sea Anemone", "Giant Clam", "Giant Isopod", "Giant Kingfish", "Giant Oarfish", "Giant Pacific Octopus", "Giant Pyrosome", "Giant Sea Star", "Giant Squid", "Glowing Sucker Octopus", "Giant Tube Worm", "Goblin Shark", "Goosefish", "Great White Shark", "Greenland Shark", "Grey Atlantic Seal", "Grouper", "Grunion", "Guineafowl Puffer", "Haddock", "Hake", "Halibut", "Hammerhead Shark", "Hapuka", "Harbor Porpoise", "Harbor Seal", "Hatchetfish", "Hawaiian Monk Seal", "Hawksbill Turtle", "Hector's Dolphin", "Hermit Crab", "Herring", "Hoki", "Horn Shark", "Horseshoe Crab", "Humpback Anglerfish", "Humpback Whale", "Icefish", "Imperator Angelfish", "Irukandji Jellyfish", "Isopod", "Ivory Bush Coral", "Japanese Spider Crab", "Jellyfish", "John Dory", "Juan Fernandez Fur Seal", "Killer Whale", "Kiwa Hirsuta", "Krill", "Lagoon Triggerfish", "Lamprey", "Leafy Seadragon", "Leopard Seal", "Limpet", "Ling", "Lionfish", "Lions Mane Jellyfish", "Lobe Coral", "Lobster", "Loggerhead Turtle", "Longnose Sawshark", "Longsnout Seahorse", "Lophelia Coral", "Marrus Orthocanna", "Manatee", "Manta Ray", "Marlin", "Megamouth Shark", "Mexican Lookdown", "Mimic Octopus", "Moon Jelly", "Mollusk", "Monkfish", "Moray Eel", "Mullet", "Mussel", "Megaladon", "Napoleon Wrasse", "Nassau Grouper", "Narwhal", "Nautilus", "Needlefish", "Northern Seahorse", "North Atlantic Right Whale", "Northern Red Snapper", "Norway Lobster", "Nudibranch", "Nurse Shark", "Oarfish", "Ocean Sunfish", "Oceanic Whitetip Shark", "Octopus", "Olive Sea Snake", "Orange Roughy", "Ostracod", "Otter", "Oyster", "Pacific Angelshark", "Pacific Blackdragon", "Pacific Halibut", "Pacific Sardine", "Pacific Sea Nettle Jellyfish", "Pacific White Sided Dolphin", "Pantropical Spotted Dolphin", "Patagonian Toothfish", "Peacock Mantis Shrimp", "Pelagic Thresher Shark", "Penguin", "Peruvian Anchoveta", "Pilchard", "Pink Salmon", "Pinniped", "Plankton", "Porpoise", "Polar Bear", "Portuguese Man o' War", "Pycnogonid Sea Spider", "Quahog", "Queen Angelfish", "Queen Conch", "Queen Parrotfish", "Queensland Grouper", "Ragfish", "Ratfish", "Rattail Fish", "Ray", "Red Drum", "Red King Crab", "Ringed Seal", "Risso's Dolphin", "Ross Seals", "Sablefish", "Salmon", "Sand Dollar", "Sandbar Shark", "Sawfish", "Sarcastic Fringehead", "Scalloped Hammerhead Shark", "Seahorse", "Sea Cucumber", "Sea Lion", "Sea Urchin", "Seal", "Shark", "Shortfin Mako Shark", "Shovelnose Guitarfish", "Shrimp", "Silverside Fish", "Skipjack Tuna", "Slender Snipe Eel", "Smalltooth Sawfish", "Smelts", "Sockeye Salmon", "Southern Stingray", "Sponge", "Spotted Porcupinefish", "Spotted Dolphin", "Spotted Eagle Ray", "Spotted Moray", "Squid", "Squidworm", "Starfish", "Stickleback", "Stonefish", "Stoplight Loosejaw", "Sturgeon", "Swordfish", "Tan Bristlemouth", "Tasseled Wobbegong", "Terrible Claw Lobster", "Threespot Damselfish", "Tiger Prawn", "Tiger Shark", "Tilefish", "Toadfish", "Tropical Two-Wing Flyfish", "Tuna", "Umbrella Squid", "Velvet Crab", "Venus Flytrap Sea Anemone", "Vigtorniella Worm", "Viperfish", "Vampire Squid", "Vaquita", "Wahoo", "Walrus", "West Indian Manatee", "Whale", "Whale Shark", "Whiptail Gulper", "White-Beaked Dolphin", "White-Ring Garden Eel", "White Shrimp", "Wobbegong", "Wrasse", "Wreckfish", "Xiphosura", "Yellowtail Damselfish", "Yelloweye Rockfish", "Yellow Cup Black Coral", "Yellow Tube Sponge", "Yellowfin Tuna", "Zebrashark", "Zooplankton"],
        //list of desert, grassland, and forest animals comes from http://www.skyenimals.com/
        desert: ["Aardwolf", "Addax", "African Wild Ass", "Ant", "Antelope", "Armadillo", "Baboon", "Badger", "Bat", "Bearded Dragon", "Beetle", "Bird", "Black-footed Cat", "Boa", "Brown Bear", "Bustard", "Butterfly", "Camel", "Caracal", "Caracara", "Caterpillar", "Centipede", "Cheetah", "Chipmunk", "Chuckwalla", "Climbing Mouse", "Coati", "Cobra", "Cotton Rat", "Cougar", "Courser", "Crane Fly", "Crow", "Dassie Rat", "Dove", "Dunnart", "Eagle", "Echidna", "Elephant", "Emu", "Falcon", "Fly", "Fox", "Frogmouth", "Gecko", "Geoffroy's Cat", "Gerbil", "Grasshopper", "Guanaco", "Gundi", "Hamster", "Hawk", "Hedgehog", "Hyena", "Hyrax", "Jackal", "Kangaroo", "Kangaroo Rat", "Kestrel", "Kowari", "Kultarr", "Leopard", "Lion", "Macaw", "Meerkat", "Mouse", "Oryx", "Ostrich", "Owl", "Pronghorn", "Python", "Rabbit", "Raccoon", "Rattlesnake", "Rhinoceros", "Sand Cat", "Spectacled Bear", "Spiny Mouse", "Starling", "Stick Bug", "Tarantula", "Tit", "Toad", "Tortoise", "Tyrant Flycatcher", "Viper", "Vulture", "Waxwing", "Xerus", "Zebra"],
        grassland: ["Aardvark", "Aardwolf", "Accentor", "African Buffalo", "African Wild Dog", "Alpaca", "Anaconda", "Ant", "Anteater", "Antelope", "Armadillo", "Baboon", "Badger", "Bandicoot", "Barbet", "Bat", "Bee", "Bee-eater", "Beetle", "Bird", "Bison", "Black-footed Cat", "Black-footed Ferret", "Bluebird", "Boa", "Bowerbird", "Brown Bear", "Bush Dog", "Bushshrike", "Bustard", "Butterfly", "Buzzard", "Caracal", "Caracara", "Cardinal", "Caterpillar", "Cheetah", "Chipmunk", "Civet", "Climbing Mouse", "Clouded Leopard", "Coati", "Cobra", "Cockatoo", "Cockroach", "Common Genet", "Cotton Rat", "Cougar", "Courser", "Coyote", "Crane", "Crane Fly", "Cricket", "Crow", "Culpeo", "Death Adder", "Deer", "Deer Mouse", "Dingo", "Dinosaur", "Dove", "Drongo", "Duck", "Duiker", "Dunnart", "Eagle", "Echidna", "Elephant", "Elk", "Emu", "Falcon", "Finch", "Flea", "Fly", "Flying Frog", "Fox", "Frog", "Frogmouth", "Garter Snake", "Gazelle", "Gecko", "Geoffroy's Cat", "Gerbil", "Giant Tortoise", "Giraffe", "Grasshopper", "Grison", "Groundhog", "Grouse", "Guanaco", "Guinea Pig", "Hamster", "Harrier", "Hartebeest", "Hawk", "Hedgehog", "Helmetshrike", "Hippopotamus", "Hornbill", "Hyena", "Hyrax", "Impala", "Jackal", "Jaguar", "Jaguarundi", "Kangaroo", "Kangaroo Rat", "Kestrel", "Kultarr", "Ladybug", "Leopard", "Lion", "Macaw", "Meerkat", "Mouse", "Newt", "Oryx", "Ostrich", "Owl", "Pangolin", "Pheasant", "Prairie Dog", "Pronghorn", "Przewalski's Horse", "Python", "Quoll", "Rabbit", "Raven", "Rhinoceros", "Shelduck", "Sloth Bear", "Spectacled Bear", "Squirrel", "Starling", "Stick Bug", "Tamandua", "Tasmanian Devil", "Thornbill", "Thrush", "Toad", "Tortoise"],
        forest: ["Agouti", "Anaconda", "Anoa", "Ant", "Anteater", "Antelope", "Armadillo", "Asian Black Bear", "Aye-aye", "Babirusa", "Baboon", "Badger", "Bandicoot", "Banteng", "Barbet", "Basilisk", "Bat", "Bearded Dragon", "Bee", "Bee-eater", "Beetle", "Bettong", "Binturong", "Bird-of-paradise", "Bongo", "Bowerbird", "Bulbul", "Bush Dog", "Bushbaby", "Bushshrike", "Butterfly", "Buzzard", "Caecilian", "Cardinal", "Cassowary", "Caterpillar", "Centipede", "Chameleon", "Chimpanzee", "Cicada", "Civet", "Clouded Leopard", "Coati", "Cobra", "Cockatoo", "Cockroach", "Colugo", "Cotinga", "Cotton Rat", "Cougar", "Crane Fly", "Cricket", "Crocodile", "Crow", "Cuckoo", "Cuscus", "Death Adder", "Deer", "Dhole", "Dingo", "Dinosaur", "Drongo", "Duck", "Duiker", "Eagle", "Echidna", "Elephant", "Finch", "Flat-headed Cat", "Flea", "Flowerpecker", "Fly", "Flying Frog", "Fossa", "Frog", "Frogmouth", "Gaur", "Gecko", "Gorilla", "Grison", "Hawaiian Honeycreeper", "Hawk", "Hedgehog", "Helmetshrike", "Hornbill", "Hyrax", "Iguana", "Jackal", "Jaguar", "Jaguarundi", "Kestrel", "Ladybug", "Lemur", "Leopard", "Lion", "Macaw", "Mandrill", "Margay", "Monkey", "Mouse", "Mouse Deer", "Newt", "Okapi", "Old World Flycatcher", "Orangutan", "Owl", "Pangolin", "Peafowl", "Pheasant", "Possum", "Python", "Quokka", "Rabbit", "Raccoon", "Red Panda", "Red River Hog", "Rhinoceros", "Sloth Bear", "Spectacled Bear", "Squirrel", "Starling", "Stick Bug", "Sun Bear", "Tamandua", "Tamarin", "Tapir", "Tarantula", "Thrush", "Tiger", "Tit", "Toad", "Tortoise", "Toucan", "Trogon", "Trumpeter", "Turaco", "Turtle", "Tyrant Flycatcher", "Viper", "Vulture", "Wallaby", "Warbler", "Wasp", "Waxwing", "Weaver", "Weaver-finch", "Whistler", "White-eye", "Whydah", "Woodswallow", "Worm", "Wren", "Xenops", "Yellowjacket", "Accentor", "African Buffalo", "American Black Bear", "Anole", "Bird", "Bison", "Boa", "Brown Bear", "Chipmunk", "Common Genet", "Copperhead", "Coyote", "Deer Mouse", "Dormouse", "Elk", "Emu", "Fisher", "Fox", "Garter Snake", "Giant Panda", "Giant Tortoise", "Groundhog", "Grouse", "Guanaco", "Himalayan Tahr", "Kangaroo", "Koala", "Numbat", "Quoll", "Raccoon dog", "Tasmanian Devil", "Thornbill", "Turkey", "Vole", "Weasel", "Wildcat", "Wolf", "Wombat", "Woodchuck", "Woodpecker"],
        //list of farm animals comes from https://www.buzzle.com/articles/farm-animals-list.html
        farm: ["Alpaca", "Buffalo", "Banteng", "Cow", "Cat", "Chicken", "Carp", "Camel", "Donkey", "Dog", "Duck", "Emu", "Goat", "Gayal", "Guinea", "Goose", "Horse", "Honey", "Llama", "Pig", "Pigeon", "Rhea", "Rabbit", "Sheep", "Silkworm", "Turkey", "Yak", "Zebu"],
        //list of pet animals comes from https://www.dogbreedinfo.com/pets/pet.htm
        pet: ["Bearded Dragon", "Birds", "Burro", "Cats", "Chameleons", "Chickens", "Chinchillas", "Chinese Water Dragon", "Cows", "Dogs", "Donkey", "Ducks", "Ferrets", "Fish", "Geckos", "Geese", "Gerbils", "Goats", "Guinea Fowl", "Guinea Pigs", "Hamsters", "Hedgehogs", "Horses", "Iguanas", "Llamas", "Lizards", "Mice", "Mule", "Peafowl", "Pigs and Hogs", "Pigeons", "Ponies", "Pot Bellied Pig", "Rabbits", "Rats", "Sheep", "Skinks", "Snakes", "Stick Insects", "Sugar Gliders", "Tarantula", "Turkeys", "Turtles"],
        //list of zoo animals comes from https://bronxzoo.com/animals
        zoo: ["Aardvark", "African Wild Dog", "Aldabra Tortoise", "American Alligator", "American Bison", "Amur Tiger", "Anaconda", "Andean Condor", "Asian Elephant", "Baby Doll Sheep", "Bald Eagle", "Barred Owl", "Blue Iguana", "Boer Goat", "California Sea Lion", "Caribbean Flamingo", "Chinchilla", "Collared Lemur", "Coquerel's Sifaka", "Cuban Amazon Parrot", "Ebony Langur", "Fennec Fox", "Fossa", "Gelada", "Giant Anteater", "Giraffe", "Gorilla", "Grizzly Bear", "Henkel's Leaf-tailed Gecko", "Indian Gharial", "Indian Rhinoceros", "King Cobra", "King Vulture", "Komodo Dragon", "Linne's Two-toed Sloth", "Lion", "Little Penguin", "Madagascar Tree Boa", "Magellanic Penguin", "Malayan Tapir", "Malayan Tiger", "Matschies Tree Kangaroo", "Mini Donkey", "Monarch Butterfly", "Nile crocodile", "North American Porcupine", "Nubian Ibex", "Okapi", "Poison Dart Frog", "Polar Bear", "Pygmy Marmoset", "Radiated Tortoise", "Red Panda", "Red Ruffed Lemur", "Ring-tailed Lemur", "Ring-tailed Mongoose", "Rock Hyrax", "Small Clawed Asian Otter", "Snow Leopard", "Snowy Owl", "Southern White-faced Owl", "Southern White Rhinocerous", "Squirrel Monkey", "Tufted Puffin", "White Cheeked Gibbon", "White-throated Bee Eater", "Zebra"]
      },
      primes: [
        // 1230 first primes, i.e. all primes up to the first one greater than 10000, inclusive.
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
        101,
        103,
        107,
        109,
        113,
        127,
        131,
        137,
        139,
        149,
        151,
        157,
        163,
        167,
        173,
        179,
        181,
        191,
        193,
        197,
        199,
        211,
        223,
        227,
        229,
        233,
        239,
        241,
        251,
        257,
        263,
        269,
        271,
        277,
        281,
        283,
        293,
        307,
        311,
        313,
        317,
        331,
        337,
        347,
        349,
        353,
        359,
        367,
        373,
        379,
        383,
        389,
        397,
        401,
        409,
        419,
        421,
        431,
        433,
        439,
        443,
        449,
        457,
        461,
        463,
        467,
        479,
        487,
        491,
        499,
        503,
        509,
        521,
        523,
        541,
        547,
        557,
        563,
        569,
        571,
        577,
        587,
        593,
        599,
        601,
        607,
        613,
        617,
        619,
        631,
        641,
        643,
        647,
        653,
        659,
        661,
        673,
        677,
        683,
        691,
        701,
        709,
        719,
        727,
        733,
        739,
        743,
        751,
        757,
        761,
        769,
        773,
        787,
        797,
        809,
        811,
        821,
        823,
        827,
        829,
        839,
        853,
        857,
        859,
        863,
        877,
        881,
        883,
        887,
        907,
        911,
        919,
        929,
        937,
        941,
        947,
        953,
        967,
        971,
        977,
        983,
        991,
        997,
        1009,
        1013,
        1019,
        1021,
        1031,
        1033,
        1039,
        1049,
        1051,
        1061,
        1063,
        1069,
        1087,
        1091,
        1093,
        1097,
        1103,
        1109,
        1117,
        1123,
        1129,
        1151,
        1153,
        1163,
        1171,
        1181,
        1187,
        1193,
        1201,
        1213,
        1217,
        1223,
        1229,
        1231,
        1237,
        1249,
        1259,
        1277,
        1279,
        1283,
        1289,
        1291,
        1297,
        1301,
        1303,
        1307,
        1319,
        1321,
        1327,
        1361,
        1367,
        1373,
        1381,
        1399,
        1409,
        1423,
        1427,
        1429,
        1433,
        1439,
        1447,
        1451,
        1453,
        1459,
        1471,
        1481,
        1483,
        1487,
        1489,
        1493,
        1499,
        1511,
        1523,
        1531,
        1543,
        1549,
        1553,
        1559,
        1567,
        1571,
        1579,
        1583,
        1597,
        1601,
        1607,
        1609,
        1613,
        1619,
        1621,
        1627,
        1637,
        1657,
        1663,
        1667,
        1669,
        1693,
        1697,
        1699,
        1709,
        1721,
        1723,
        1733,
        1741,
        1747,
        1753,
        1759,
        1777,
        1783,
        1787,
        1789,
        1801,
        1811,
        1823,
        1831,
        1847,
        1861,
        1867,
        1871,
        1873,
        1877,
        1879,
        1889,
        1901,
        1907,
        1913,
        1931,
        1933,
        1949,
        1951,
        1973,
        1979,
        1987,
        1993,
        1997,
        1999,
        2003,
        2011,
        2017,
        2027,
        2029,
        2039,
        2053,
        2063,
        2069,
        2081,
        2083,
        2087,
        2089,
        2099,
        2111,
        2113,
        2129,
        2131,
        2137,
        2141,
        2143,
        2153,
        2161,
        2179,
        2203,
        2207,
        2213,
        2221,
        2237,
        2239,
        2243,
        2251,
        2267,
        2269,
        2273,
        2281,
        2287,
        2293,
        2297,
        2309,
        2311,
        2333,
        2339,
        2341,
        2347,
        2351,
        2357,
        2371,
        2377,
        2381,
        2383,
        2389,
        2393,
        2399,
        2411,
        2417,
        2423,
        2437,
        2441,
        2447,
        2459,
        2467,
        2473,
        2477,
        2503,
        2521,
        2531,
        2539,
        2543,
        2549,
        2551,
        2557,
        2579,
        2591,
        2593,
        2609,
        2617,
        2621,
        2633,
        2647,
        2657,
        2659,
        2663,
        2671,
        2677,
        2683,
        2687,
        2689,
        2693,
        2699,
        2707,
        2711,
        2713,
        2719,
        2729,
        2731,
        2741,
        2749,
        2753,
        2767,
        2777,
        2789,
        2791,
        2797,
        2801,
        2803,
        2819,
        2833,
        2837,
        2843,
        2851,
        2857,
        2861,
        2879,
        2887,
        2897,
        2903,
        2909,
        2917,
        2927,
        2939,
        2953,
        2957,
        2963,
        2969,
        2971,
        2999,
        3001,
        3011,
        3019,
        3023,
        3037,
        3041,
        3049,
        3061,
        3067,
        3079,
        3083,
        3089,
        3109,
        3119,
        3121,
        3137,
        3163,
        3167,
        3169,
        3181,
        3187,
        3191,
        3203,
        3209,
        3217,
        3221,
        3229,
        3251,
        3253,
        3257,
        3259,
        3271,
        3299,
        3301,
        3307,
        3313,
        3319,
        3323,
        3329,
        3331,
        3343,
        3347,
        3359,
        3361,
        3371,
        3373,
        3389,
        3391,
        3407,
        3413,
        3433,
        3449,
        3457,
        3461,
        3463,
        3467,
        3469,
        3491,
        3499,
        3511,
        3517,
        3527,
        3529,
        3533,
        3539,
        3541,
        3547,
        3557,
        3559,
        3571,
        3581,
        3583,
        3593,
        3607,
        3613,
        3617,
        3623,
        3631,
        3637,
        3643,
        3659,
        3671,
        3673,
        3677,
        3691,
        3697,
        3701,
        3709,
        3719,
        3727,
        3733,
        3739,
        3761,
        3767,
        3769,
        3779,
        3793,
        3797,
        3803,
        3821,
        3823,
        3833,
        3847,
        3851,
        3853,
        3863,
        3877,
        3881,
        3889,
        3907,
        3911,
        3917,
        3919,
        3923,
        3929,
        3931,
        3943,
        3947,
        3967,
        3989,
        4001,
        4003,
        4007,
        4013,
        4019,
        4021,
        4027,
        4049,
        4051,
        4057,
        4073,
        4079,
        4091,
        4093,
        4099,
        4111,
        4127,
        4129,
        4133,
        4139,
        4153,
        4157,
        4159,
        4177,
        4201,
        4211,
        4217,
        4219,
        4229,
        4231,
        4241,
        4243,
        4253,
        4259,
        4261,
        4271,
        4273,
        4283,
        4289,
        4297,
        4327,
        4337,
        4339,
        4349,
        4357,
        4363,
        4373,
        4391,
        4397,
        4409,
        4421,
        4423,
        4441,
        4447,
        4451,
        4457,
        4463,
        4481,
        4483,
        4493,
        4507,
        4513,
        4517,
        4519,
        4523,
        4547,
        4549,
        4561,
        4567,
        4583,
        4591,
        4597,
        4603,
        4621,
        4637,
        4639,
        4643,
        4649,
        4651,
        4657,
        4663,
        4673,
        4679,
        4691,
        4703,
        4721,
        4723,
        4729,
        4733,
        4751,
        4759,
        4783,
        4787,
        4789,
        4793,
        4799,
        4801,
        4813,
        4817,
        4831,
        4861,
        4871,
        4877,
        4889,
        4903,
        4909,
        4919,
        4931,
        4933,
        4937,
        4943,
        4951,
        4957,
        4967,
        4969,
        4973,
        4987,
        4993,
        4999,
        5003,
        5009,
        5011,
        5021,
        5023,
        5039,
        5051,
        5059,
        5077,
        5081,
        5087,
        5099,
        5101,
        5107,
        5113,
        5119,
        5147,
        5153,
        5167,
        5171,
        5179,
        5189,
        5197,
        5209,
        5227,
        5231,
        5233,
        5237,
        5261,
        5273,
        5279,
        5281,
        5297,
        5303,
        5309,
        5323,
        5333,
        5347,
        5351,
        5381,
        5387,
        5393,
        5399,
        5407,
        5413,
        5417,
        5419,
        5431,
        5437,
        5441,
        5443,
        5449,
        5471,
        5477,
        5479,
        5483,
        5501,
        5503,
        5507,
        5519,
        5521,
        5527,
        5531,
        5557,
        5563,
        5569,
        5573,
        5581,
        5591,
        5623,
        5639,
        5641,
        5647,
        5651,
        5653,
        5657,
        5659,
        5669,
        5683,
        5689,
        5693,
        5701,
        5711,
        5717,
        5737,
        5741,
        5743,
        5749,
        5779,
        5783,
        5791,
        5801,
        5807,
        5813,
        5821,
        5827,
        5839,
        5843,
        5849,
        5851,
        5857,
        5861,
        5867,
        5869,
        5879,
        5881,
        5897,
        5903,
        5923,
        5927,
        5939,
        5953,
        5981,
        5987,
        6007,
        6011,
        6029,
        6037,
        6043,
        6047,
        6053,
        6067,
        6073,
        6079,
        6089,
        6091,
        6101,
        6113,
        6121,
        6131,
        6133,
        6143,
        6151,
        6163,
        6173,
        6197,
        6199,
        6203,
        6211,
        6217,
        6221,
        6229,
        6247,
        6257,
        6263,
        6269,
        6271,
        6277,
        6287,
        6299,
        6301,
        6311,
        6317,
        6323,
        6329,
        6337,
        6343,
        6353,
        6359,
        6361,
        6367,
        6373,
        6379,
        6389,
        6397,
        6421,
        6427,
        6449,
        6451,
        6469,
        6473,
        6481,
        6491,
        6521,
        6529,
        6547,
        6551,
        6553,
        6563,
        6569,
        6571,
        6577,
        6581,
        6599,
        6607,
        6619,
        6637,
        6653,
        6659,
        6661,
        6673,
        6679,
        6689,
        6691,
        6701,
        6703,
        6709,
        6719,
        6733,
        6737,
        6761,
        6763,
        6779,
        6781,
        6791,
        6793,
        6803,
        6823,
        6827,
        6829,
        6833,
        6841,
        6857,
        6863,
        6869,
        6871,
        6883,
        6899,
        6907,
        6911,
        6917,
        6947,
        6949,
        6959,
        6961,
        6967,
        6971,
        6977,
        6983,
        6991,
        6997,
        7001,
        7013,
        7019,
        7027,
        7039,
        7043,
        7057,
        7069,
        7079,
        7103,
        7109,
        7121,
        7127,
        7129,
        7151,
        7159,
        7177,
        7187,
        7193,
        7207,
        7211,
        7213,
        7219,
        7229,
        7237,
        7243,
        7247,
        7253,
        7283,
        7297,
        7307,
        7309,
        7321,
        7331,
        7333,
        7349,
        7351,
        7369,
        7393,
        7411,
        7417,
        7433,
        7451,
        7457,
        7459,
        7477,
        7481,
        7487,
        7489,
        7499,
        7507,
        7517,
        7523,
        7529,
        7537,
        7541,
        7547,
        7549,
        7559,
        7561,
        7573,
        7577,
        7583,
        7589,
        7591,
        7603,
        7607,
        7621,
        7639,
        7643,
        7649,
        7669,
        7673,
        7681,
        7687,
        7691,
        7699,
        7703,
        7717,
        7723,
        7727,
        7741,
        7753,
        7757,
        7759,
        7789,
        7793,
        7817,
        7823,
        7829,
        7841,
        7853,
        7867,
        7873,
        7877,
        7879,
        7883,
        7901,
        7907,
        7919,
        7927,
        7933,
        7937,
        7949,
        7951,
        7963,
        7993,
        8009,
        8011,
        8017,
        8039,
        8053,
        8059,
        8069,
        8081,
        8087,
        8089,
        8093,
        8101,
        8111,
        8117,
        8123,
        8147,
        8161,
        8167,
        8171,
        8179,
        8191,
        8209,
        8219,
        8221,
        8231,
        8233,
        8237,
        8243,
        8263,
        8269,
        8273,
        8287,
        8291,
        8293,
        8297,
        8311,
        8317,
        8329,
        8353,
        8363,
        8369,
        8377,
        8387,
        8389,
        8419,
        8423,
        8429,
        8431,
        8443,
        8447,
        8461,
        8467,
        8501,
        8513,
        8521,
        8527,
        8537,
        8539,
        8543,
        8563,
        8573,
        8581,
        8597,
        8599,
        8609,
        8623,
        8627,
        8629,
        8641,
        8647,
        8663,
        8669,
        8677,
        8681,
        8689,
        8693,
        8699,
        8707,
        8713,
        8719,
        8731,
        8737,
        8741,
        8747,
        8753,
        8761,
        8779,
        8783,
        8803,
        8807,
        8819,
        8821,
        8831,
        8837,
        8839,
        8849,
        8861,
        8863,
        8867,
        8887,
        8893,
        8923,
        8929,
        8933,
        8941,
        8951,
        8963,
        8969,
        8971,
        8999,
        9001,
        9007,
        9011,
        9013,
        9029,
        9041,
        9043,
        9049,
        9059,
        9067,
        9091,
        9103,
        9109,
        9127,
        9133,
        9137,
        9151,
        9157,
        9161,
        9173,
        9181,
        9187,
        9199,
        9203,
        9209,
        9221,
        9227,
        9239,
        9241,
        9257,
        9277,
        9281,
        9283,
        9293,
        9311,
        9319,
        9323,
        9337,
        9341,
        9343,
        9349,
        9371,
        9377,
        9391,
        9397,
        9403,
        9413,
        9419,
        9421,
        9431,
        9433,
        9437,
        9439,
        9461,
        9463,
        9467,
        9473,
        9479,
        9491,
        9497,
        9511,
        9521,
        9533,
        9539,
        9547,
        9551,
        9587,
        9601,
        9613,
        9619,
        9623,
        9629,
        9631,
        9643,
        9649,
        9661,
        9677,
        9679,
        9689,
        9697,
        9719,
        9721,
        9733,
        9739,
        9743,
        9749,
        9767,
        9769,
        9781,
        9787,
        9791,
        9803,
        9811,
        9817,
        9829,
        9833,
        9839,
        9851,
        9857,
        9859,
        9871,
        9883,
        9887,
        9901,
        9907,
        9923,
        9929,
        9931,
        9941,
        9949,
        9967,
        9973,
        10007
      ],
      emotions: [
        "love",
        "joy",
        "surprise",
        "anger",
        "sadness",
        "fear"
      ]
    }, L = Object.prototype.hasOwnProperty, O = Object.keys || function(e) {
      var a = [];
      for (var n in e)
        L.call(e, n) && a.push(n);
      return a;
    };
    function w(e, a) {
      for (var n = O(e), c, h = 0, f = n.length; h < f; h++)
        c = n[h], a[c] = e[c] || a[c];
    }
    function F(e, a) {
      for (var n = 0, c = e.length; n < c; n++)
        a[n] = e[n];
    }
    function G(e, a) {
      var n = Array.isArray(e), c = a || (n ? new Array(e.length) : {});
      return n ? F(e, c) : w(e, c), c;
    }
    i.prototype.get = function(e) {
      return G(I[e]);
    }, i.prototype.mac_address = function(e) {
      e = l(e), e.separator || (e.separator = e.networkVersion ? "." : ":");
      var a = "ABCDEF1234567890", n = "";
      return e.networkVersion ? n = this.n(this.string, 3, { pool: a, length: 4 }).join(e.separator) : n = this.n(this.string, 6, { pool: a, length: 2 }).join(e.separator), n;
    }, i.prototype.normal = function(e) {
      if (e = l(e, { mean: 0, dev: 1, pool: [] }), r(
        e.pool.constructor !== Array,
        "Chance: The pool option must be a valid array."
      ), r(
        typeof e.mean != "number",
        "Chance: Mean (mean) must be a number"
      ), r(
        typeof e.dev != "number",
        "Chance: Standard deviation (dev) must be a number"
      ), e.pool.length > 0)
        return this.normal_pool(e);
      var a, n, c, h, f = e.mean, B = e.dev;
      do
        n = this.random() * 2 - 1, c = this.random() * 2 - 1, a = n * n + c * c;
      while (a >= 1);
      return h = n * Math.sqrt(-2 * Math.log(a) / a), B * h + f;
    }, i.prototype.normal_pool = function(e) {
      var a = 0;
      do {
        var n = Math.round(this.normal({ mean: e.mean, dev: e.dev }));
        if (n < e.pool.length && n >= 0)
          return e.pool[n];
        a++;
      } while (a < 100);
      throw new RangeError("Chance: Your pool is too small for the given mean and standard deviation. Please adjust.");
    }, i.prototype.radio = function(e) {
      e = l(e, { side: "?" });
      var a = "";
      switch (e.side.toLowerCase()) {
        case "east":
        case "e":
          a = "W";
          break;
        case "west":
        case "w":
          a = "K";
          break;
        default:
          a = this.character({ pool: "KW" });
          break;
      }
      return a + this.character({ alpha: !0, casing: "upper" }) + this.character({ alpha: !0, casing: "upper" }) + this.character({ alpha: !0, casing: "upper" });
    }, i.prototype.set = function(e, a) {
      typeof e == "string" ? I[e] = a : I = G(e, I);
    }, i.prototype.tv = function(e) {
      return this.radio(e);
    }, i.prototype.cnpj = function() {
      var e = this.n(this.natural, 8, { max: 9 }), a = 2 + e[7] * 6 + e[6] * 7 + e[5] * 8 + e[4] * 9 + e[3] * 2 + e[2] * 3 + e[1] * 4 + e[0] * 5;
      a = 11 - a % 11, a >= 10 && (a = 0);
      var n = a * 2 + 3 + e[7] * 7 + e[6] * 8 + e[5] * 9 + e[4] * 2 + e[3] * 3 + e[2] * 4 + e[1] * 5 + e[0] * 6;
      return n = 11 - n % 11, n >= 10 && (n = 0), "" + e[0] + e[1] + "." + e[2] + e[3] + e[4] + "." + e[5] + e[6] + e[7] + "/0001-" + a + n;
    }, i.prototype.emotion = function() {
      return this.pick(this.get("emotions"));
    }, i.prototype.mersenne_twister = function(e) {
      return new x(e);
    }, i.prototype.blueimp_md5 = function() {
      return new P();
    };
    var x = function(e) {
      e === void 0 && (e = Math.floor(Math.random() * Math.pow(10, 13))), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(e);
    };
    x.prototype.init_genrand = function(e) {
      for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++)
        e = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (((e & 4294901760) >>> 16) * 1812433253 << 16) + (e & 65535) * 1812433253 + this.mti, this.mt[this.mti] >>>= 0;
    }, x.prototype.init_by_array = function(e, a) {
      var n = 1, c = 0, h, f;
      for (this.init_genrand(19650218), h = this.N > a ? this.N : a; h; h--)
        f = this.mt[n - 1] ^ this.mt[n - 1] >>> 30, this.mt[n] = (this.mt[n] ^ (((f & 4294901760) >>> 16) * 1664525 << 16) + (f & 65535) * 1664525) + e[c] + c, this.mt[n] >>>= 0, n++, c++, n >= this.N && (this.mt[0] = this.mt[this.N - 1], n = 1), c >= a && (c = 0);
      for (h = this.N - 1; h; h--)
        f = this.mt[n - 1] ^ this.mt[n - 1] >>> 30, this.mt[n] = (this.mt[n] ^ (((f & 4294901760) >>> 16) * 1566083941 << 16) + (f & 65535) * 1566083941) - n, this.mt[n] >>>= 0, n++, n >= this.N && (this.mt[0] = this.mt[this.N - 1], n = 1);
      this.mt[0] = 2147483648;
    }, x.prototype.genrand_int32 = function() {
      var e, a = new Array(0, this.MATRIX_A);
      if (this.mti >= this.N) {
        var n;
        for (this.mti === this.N + 1 && this.init_genrand(5489), n = 0; n < this.N - this.M; n++)
          e = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + this.M] ^ e >>> 1 ^ a[e & 1];
        for (; n < this.N - 1; n++)
          e = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + (this.M - this.N)] ^ e >>> 1 ^ a[e & 1];
        e = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ e >>> 1 ^ a[e & 1], this.mti = 0;
      }
      return e = this.mt[this.mti++], e ^= e >>> 11, e ^= e << 7 & 2636928640, e ^= e << 15 & 4022730752, e ^= e >>> 18, e >>> 0;
    }, x.prototype.genrand_int31 = function() {
      return this.genrand_int32() >>> 1;
    }, x.prototype.genrand_real1 = function() {
      return this.genrand_int32() * (1 / 4294967295);
    }, x.prototype.random = function() {
      return this.genrand_int32() * (1 / 4294967296);
    }, x.prototype.genrand_real3 = function() {
      return (this.genrand_int32() + 0.5) * (1 / 4294967296);
    }, x.prototype.genrand_res53 = function() {
      var e = this.genrand_int32() >>> 5, a = this.genrand_int32() >>> 6;
      return (e * 67108864 + a) * (1 / 9007199254740992);
    };
    var P = function() {
    };
    P.prototype.VERSION = "1.0.1", P.prototype.safe_add = function(a, n) {
      var c = (a & 65535) + (n & 65535), h = (a >> 16) + (n >> 16) + (c >> 16);
      return h << 16 | c & 65535;
    }, P.prototype.bit_roll = function(e, a) {
      return e << a | e >>> 32 - a;
    }, P.prototype.md5_cmn = function(e, a, n, c, h, f) {
      return this.safe_add(this.bit_roll(this.safe_add(this.safe_add(a, e), this.safe_add(c, f)), h), n);
    }, P.prototype.md5_ff = function(e, a, n, c, h, f, B) {
      return this.md5_cmn(a & n | ~a & c, e, a, h, f, B);
    }, P.prototype.md5_gg = function(e, a, n, c, h, f, B) {
      return this.md5_cmn(a & c | n & ~c, e, a, h, f, B);
    }, P.prototype.md5_hh = function(e, a, n, c, h, f, B) {
      return this.md5_cmn(a ^ n ^ c, e, a, h, f, B);
    }, P.prototype.md5_ii = function(e, a, n, c, h, f, B) {
      return this.md5_cmn(n ^ (a | ~c), e, a, h, f, B);
    }, P.prototype.binl_md5 = function(e, a) {
      e[a >> 5] |= 128 << a % 32, e[(a + 64 >>> 9 << 4) + 14] = a;
      var n, c, h, f, B, b = 1732584193, A = -271733879, y = -1732584194, T = 271733878;
      for (n = 0; n < e.length; n += 16)
        c = b, h = A, f = y, B = T, b = this.md5_ff(b, A, y, T, e[n], 7, -680876936), T = this.md5_ff(T, b, A, y, e[n + 1], 12, -389564586), y = this.md5_ff(y, T, b, A, e[n + 2], 17, 606105819), A = this.md5_ff(A, y, T, b, e[n + 3], 22, -1044525330), b = this.md5_ff(b, A, y, T, e[n + 4], 7, -176418897), T = this.md5_ff(T, b, A, y, e[n + 5], 12, 1200080426), y = this.md5_ff(y, T, b, A, e[n + 6], 17, -1473231341), A = this.md5_ff(A, y, T, b, e[n + 7], 22, -45705983), b = this.md5_ff(b, A, y, T, e[n + 8], 7, 1770035416), T = this.md5_ff(T, b, A, y, e[n + 9], 12, -1958414417), y = this.md5_ff(y, T, b, A, e[n + 10], 17, -42063), A = this.md5_ff(A, y, T, b, e[n + 11], 22, -1990404162), b = this.md5_ff(b, A, y, T, e[n + 12], 7, 1804603682), T = this.md5_ff(T, b, A, y, e[n + 13], 12, -40341101), y = this.md5_ff(y, T, b, A, e[n + 14], 17, -1502002290), A = this.md5_ff(A, y, T, b, e[n + 15], 22, 1236535329), b = this.md5_gg(b, A, y, T, e[n + 1], 5, -165796510), T = this.md5_gg(T, b, A, y, e[n + 6], 9, -1069501632), y = this.md5_gg(y, T, b, A, e[n + 11], 14, 643717713), A = this.md5_gg(A, y, T, b, e[n], 20, -373897302), b = this.md5_gg(b, A, y, T, e[n + 5], 5, -701558691), T = this.md5_gg(T, b, A, y, e[n + 10], 9, 38016083), y = this.md5_gg(y, T, b, A, e[n + 15], 14, -660478335), A = this.md5_gg(A, y, T, b, e[n + 4], 20, -405537848), b = this.md5_gg(b, A, y, T, e[n + 9], 5, 568446438), T = this.md5_gg(T, b, A, y, e[n + 14], 9, -1019803690), y = this.md5_gg(y, T, b, A, e[n + 3], 14, -187363961), A = this.md5_gg(A, y, T, b, e[n + 8], 20, 1163531501), b = this.md5_gg(b, A, y, T, e[n + 13], 5, -1444681467), T = this.md5_gg(T, b, A, y, e[n + 2], 9, -51403784), y = this.md5_gg(y, T, b, A, e[n + 7], 14, 1735328473), A = this.md5_gg(A, y, T, b, e[n + 12], 20, -1926607734), b = this.md5_hh(b, A, y, T, e[n + 5], 4, -378558), T = this.md5_hh(T, b, A, y, e[n + 8], 11, -2022574463), y = this.md5_hh(y, T, b, A, e[n + 11], 16, 1839030562), A = this.md5_hh(A, y, T, b, e[n + 14], 23, -35309556), b = this.md5_hh(b, A, y, T, e[n + 1], 4, -1530992060), T = this.md5_hh(T, b, A, y, e[n + 4], 11, 1272893353), y = this.md5_hh(y, T, b, A, e[n + 7], 16, -155497632), A = this.md5_hh(A, y, T, b, e[n + 10], 23, -1094730640), b = this.md5_hh(b, A, y, T, e[n + 13], 4, 681279174), T = this.md5_hh(T, b, A, y, e[n], 11, -358537222), y = this.md5_hh(y, T, b, A, e[n + 3], 16, -722521979), A = this.md5_hh(A, y, T, b, e[n + 6], 23, 76029189), b = this.md5_hh(b, A, y, T, e[n + 9], 4, -640364487), T = this.md5_hh(T, b, A, y, e[n + 12], 11, -421815835), y = this.md5_hh(y, T, b, A, e[n + 15], 16, 530742520), A = this.md5_hh(A, y, T, b, e[n + 2], 23, -995338651), b = this.md5_ii(b, A, y, T, e[n], 6, -198630844), T = this.md5_ii(T, b, A, y, e[n + 7], 10, 1126891415), y = this.md5_ii(y, T, b, A, e[n + 14], 15, -1416354905), A = this.md5_ii(A, y, T, b, e[n + 5], 21, -57434055), b = this.md5_ii(b, A, y, T, e[n + 12], 6, 1700485571), T = this.md5_ii(T, b, A, y, e[n + 3], 10, -1894986606), y = this.md5_ii(y, T, b, A, e[n + 10], 15, -1051523), A = this.md5_ii(A, y, T, b, e[n + 1], 21, -2054922799), b = this.md5_ii(b, A, y, T, e[n + 8], 6, 1873313359), T = this.md5_ii(T, b, A, y, e[n + 15], 10, -30611744), y = this.md5_ii(y, T, b, A, e[n + 6], 15, -1560198380), A = this.md5_ii(A, y, T, b, e[n + 13], 21, 1309151649), b = this.md5_ii(b, A, y, T, e[n + 4], 6, -145523070), T = this.md5_ii(T, b, A, y, e[n + 11], 10, -1120210379), y = this.md5_ii(y, T, b, A, e[n + 2], 15, 718787259), A = this.md5_ii(A, y, T, b, e[n + 9], 21, -343485551), b = this.safe_add(b, c), A = this.safe_add(A, h), y = this.safe_add(y, f), T = this.safe_add(T, B);
      return [b, A, y, T];
    }, P.prototype.binl2rstr = function(e) {
      var a, n = "";
      for (a = 0; a < e.length * 32; a += 8)
        n += String.fromCharCode(e[a >> 5] >>> a % 32 & 255);
      return n;
    }, P.prototype.rstr2binl = function(e) {
      var a, n = [];
      for (n[(e.length >> 2) - 1] = void 0, a = 0; a < n.length; a += 1)
        n[a] = 0;
      for (a = 0; a < e.length * 8; a += 8)
        n[a >> 5] |= (e.charCodeAt(a / 8) & 255) << a % 32;
      return n;
    }, P.prototype.rstr_md5 = function(e) {
      return this.binl2rstr(this.binl_md5(this.rstr2binl(e), e.length * 8));
    }, P.prototype.rstr_hmac_md5 = function(e, a) {
      var n, c = this.rstr2binl(e), h = [], f = [], B;
      for (h[15] = f[15] = void 0, c.length > 16 && (c = this.binl_md5(c, e.length * 8)), n = 0; n < 16; n += 1)
        h[n] = c[n] ^ 909522486, f[n] = c[n] ^ 1549556828;
      return B = this.binl_md5(h.concat(this.rstr2binl(a)), 512 + a.length * 8), this.binl2rstr(this.binl_md5(f.concat(B), 512 + 128));
    }, P.prototype.rstr2hex = function(e) {
      var a = "0123456789abcdef", n = "", c, h;
      for (h = 0; h < e.length; h += 1)
        c = e.charCodeAt(h), n += a.charAt(c >>> 4 & 15) + a.charAt(c & 15);
      return n;
    }, P.prototype.str2rstr_utf8 = function(e) {
      return unescape(encodeURIComponent(e));
    }, P.prototype.raw_md5 = function(e) {
      return this.rstr_md5(this.str2rstr_utf8(e));
    }, P.prototype.hex_md5 = function(e) {
      return this.rstr2hex(this.raw_md5(e));
    }, P.prototype.raw_hmac_md5 = function(e, a) {
      return this.rstr_hmac_md5(this.str2rstr_utf8(e), this.str2rstr_utf8(a));
    }, P.prototype.hex_hmac_md5 = function(e, a) {
      return this.rstr2hex(this.raw_hmac_md5(e, a));
    }, P.prototype.md5 = function(e, a, n) {
      return a ? n ? this.raw_hmac_md5(a, e) : this.hex_hmac_md5(a, e) : n ? this.raw_md5(e) : this.hex_md5(e);
    }, u.exports && (m = u.exports = i), m.Chance = i, typeof importScripts < "u" && (chance = new i(), self.Chance = i), typeof window == "object" && typeof window.document == "object" && (window.Chance = i, window.chance = new i());
  })();
})(ie, ie.exports);
var Ce = ie.exports;
const ve = /* @__PURE__ */ ge(Ce);
var re = function() {
  function u(m, D) {
    for (var R = [], k = "", N = 0; N < m.length; N++) {
      for (var v = m.charAt(N), g = R.length, S = 0; S < D.length; S++) {
        var E = D.charAt(S);
        if (v == E) {
          0 < k.length && R.push(k), R.push(v), k = "";
          continue;
        }
      }
      g == R.length && (k = k + v);
    }
    return 0 < k.length && R.push(k), R;
  }
  return u;
}(), Z = function() {
  function u(k, N, v, g, S, E) {
    this.type = g, this.value = k, this.begin = N, this.end = v, this.line = S, this.col = E, this.toString = function() {
      return "{type:" + g + ",value:" + k + "}";
    }, this.getValue = function() {
      return this.value == null || this.value.length < 2 ? this.value : (this.value.charAt(0) == "`" && this.value.substring(1, this.value.length - 1), this.value);
    }, this.isStandardLiteral = function() {
      if (this.value.length < 2 || !(this.value.charAt(0) == "'" || this.value.charAt(0) == "n" || this.value.charAt(0) == "N"))
        return !1;
      var l = this.value;
      if (l.charAt(0) == "n" || l.charAt(0) == "N") {
        if (l.length < 3)
          return !1;
        l = l.substring(1);
      }
      return l.length < 2 ? !1 : l.charAt(0) == "'" && l.charAt(l.length - 1) == "'";
    }, this.isAltLiteral = function() {
      if (this.value.length < 5 || !(this.value.charAt(0) == "q" || this.value.charAt(0) == "Q" || this.value.charAt(0) == "n" || this.value.charAt(0) == "N"))
        return !1;
      var l = this.value;
      if (this.value.charAt(0) == "q" || this.value.charAt(0) == "Q")
        l = l.substring(1);
      else if (
        /*content.startsWith("Nq")*/
        (this.value.charAt(0) == "n" || this.value.charAt(0) == "N") && (this.value.charAt(1) == "q" || this.value.charAt(1) == "Q")
      ) {
        if (l.length < 6)
          return !1;
        l = l.substring(2);
      } else
        return !1;
      if (l.charAt(0) == "'" && l.charAt(l.length - 1) == "'")
        l = l.substring(1, l.length - 1);
      else
        return !1;
      return i(l.charAt(0)) == l.charAt(l.length - 1);
    };
    function i(l) {
      return l == "<" ? ">" : l == "[" ? "]" : l == "{" ? "}" : l == "(" ? ")" : l;
    }
  }
  function m(k, N, v) {
    for (var g = [], S = `(){}[]^-|!*+.><='",;:%@?/\\#~` + v, E = ` 
\r	`, i = re(
      k,
      //".*-+/|><=()\'\", \n\r\t"
      S + E
    ), l = 0, p = 0, r = 0, t = 0; t < i.length; t++) {
      var o = i[t], s = null;
      if (g.length > 0 && (s = g[g.length - 1]), o == `
` ? (p++, r = 0) : t > 0 && i[t - 1] !== `
` ? r = r + i[t - 1].length : r = 0, l += o.length, s != null && s.type == "comment" && (s.value.lastIndexOf("*/") != s.value.length - 2 || s.value == "/*/")) {
        o == "*" || o == "/" ? s.value = s.value + o : s.value = "/* ... ", s.end = l, s != null && s.type == "comment" && s.value.lastIndexOf("*/") == s.value.length - 2 && s.value != "/*/" && (s.value = k.substring(s.begin, s.end));
        continue;
      }
      if (s != null && (s.type == "line-comment" || s.type == "dbtools-command") && o != `
`) {
        s.value = s.value + o;
        continue;
      }
      if (s != null && (s.type == "line-comment" || s.type == "dbtools-command") && o == `
` && (s.end = s.begin + s.value.length), s != null && s.type == "quoted-string" && !(s.isStandardLiteral() || s.isAltLiteral())) {
        s.value = s.value + o, s.end = s.begin + s.value.length;
        continue;
      }
      if (!(s != null && s.type == "dquoted-string" && o != '"' && !(s.value.endsWith('"') && s.value.length > 1))) {
        if (s != null && s.type == "dquoted-string" && o == '"') {
          s.end = l, s.value = k.substring(s.begin, s.end);
          continue;
        }
        if (!(s != null && s.type == "bquoted-string" && o != "`" && !(s.value.endsWith("`") && s.value.length > 1))) {
          if (s != null && s.type == "bquoted-string" && o == "`") {
            s.end = l, s.value = k.substring(s.begin, s.end);
            continue;
          }
          if (o == "*" && s != null && s.value == "/") {
            s.value = s.value + o, s.end = s.begin + s.value.length, s.type = "comment";
            continue;
          }
          if (o == "-" && s != null && s.value == "-") {
            s.value = s.value + o, s.type = "line-comment";
            continue;
          }
          if (s != null && s.type == "identifier" && s.end == -11 && s.value.indexOf("@") == 0 && !(o == `
` || o == "\r")) {
            s.value = s.value + o;
            continue;
          }
          if (s != null && s.type == "identifier" && s.end == -11 && s.value.indexOf("@") == 0 && (o == `
` || o == "\r")) {
            s.end = l - 1, g.push(new u(o, l - 1, l, "ws", p, r));
            continue;
          }
          if (N && o == "'") {
            s != null && (s.value.toUpperCase() == "Q" || s.value.toUpperCase() == "N" || s.value.toUpperCase() == "U" || s.value.toUpperCase() == "NQ") ? (s.value += o, s.type = "quoted-string") : g.push(new u(o, l - 1, -10, "quoted-string", p, r));
            continue;
          }
          if (N && o == '"') {
            g.push(new u(o, l - 1, -11, "dquoted-string", p, r));
            continue;
          }
          if (o == "`" && 0 <= S.indexOf("`")) {
            g.push(new u(o, l - 1, -11, "bquoted-string", p, r));
            continue;
          }
          if (o.length == 1 && 0 <= S.indexOf(o)) {
            g.push(new u(o, l - 1, l, "operation", p, r));
            continue;
          }
          if (o.length == 1 && 0 <= E.indexOf(o)) {
            g.push(new u(o, l - 1, l, "ws", p, r));
            continue;
          }
          if ("0" <= o.charAt(0) && o.charAt(0) <= "9") {
            D(o, g, l - o.length, p) || (o.charAt(o.length - 1) == "K" || o.charAt(o.length - 1) == "k" || o.charAt(o.length - 1) == "M" || o.charAt(o.length - 1) == "m" || o.charAt(o.length - 1) == "G" || o.charAt(o.length - 1) == "g" || o.charAt(o.length - 1) == "T" || o.charAt(o.length - 1) == "t" || o.charAt(o.length - 1) == "P" || o.charAt(o.length - 1) == "p" || o.charAt(o.length - 1) == "E" || o.charAt(o.length - 1) == "e" ? (g.push(new u(o.substring(0, o.length - 1), l - o.length, l - 1, "constant.numeric", p, r)), g.push(new u(o.substring(o.length - 1), l - 1, l, "constant.numeric", p, r))) : g.push(new u(o, l - o.length, l, "constant.numeric", p, r)));
            continue;
          }
          var M = "identifier";
          t + 1 < i.length && i[t + 1], g.push(new u(o, l - o.length, l, M, p, r));
        }
      }
    }
    if (g.length > 0) {
      var s = g[g.length - 1];
      s.end = k.length;
    }
    return g;
  }
  function D(k, N, v, g) {
    if (0 > k.indexOf("e") && 0 > k.indexOf("f") && 0 > k.indexOf("d"))
      return !1;
    0 <= k.indexOf("e"), 0 <= k.indexOf("e"), !(0 <= k.indexOf("e")) && 0 <= k.indexOf("f");
    for (var S = re(k, "efd"), E = 0; E < S.length; E++) {
      var i = S[E];
      v += i.length, "0" <= i.charAt(0) && i.charAt(0) <= "9" ? N.push(new u(i, v - i.length, v, "constant.numeric", g)) : N.push(new u(i, v - i.length, v, "identifier", g));
    }
    return !0;
  }
  function R(k, N, v, g) {
    for (var S = [], E = m(k, v, g), i = null, l = 0; l < E.length; l++) {
      var p = E[l];
      if (p.type == "quoted-string") {
        if (i != null && i.type == "quoted-string") {
          i.value = i.value + p.value, i.end = p.end;
          continue;
        }
        if (i != null && i.type == "identifier" && i.value.toUpperCase() == "N" && i.end == p.begin) {
          i.begin = p.begin, i.end = p.end, i.type = p.type, i.value = p.value;
          continue;
        }
      }
      if (p.value.indexOf("@") == 0 && (p.end = p.begin + p.value.length), p.value == "#" && i != null && i.type == "identifier") {
        i.end += 1, i.value += "#";
        continue;
      }
      if ((p.type === "identifier" || p.type === "constant.numeric") && i !== null && i.value[i.value.length - 1] === "#" && i.type === "identifier") {
        i.end += p.value.length, i.value += p.value;
        continue;
      }
      /*17607445: can just drop preprocessor directives
          token.value.equals("$IF")
          || token.value.equals("$ELSIF")
          || token.value.equals("$ELSE")
          || token.value.equals("$THEN")
          ||*/
      p.value.indexOf("$$") == 0 && (p.value = "$$VAR"), (N || p.type != "ws" && p.type != "comment" && p.type != "line-comment") && S.push(p), i = p;
    }
    return S;
  }
  return R;
}();
function se(u, m, D, R) {
  var k = new ve(te);
  let N = D.toUpperCase(), v = u.toUpperCase(), g = m.toUpperCase();
  if (R != null && 0 < R.length) {
    let l = 0, p = R.length, r = R[Math.floor(X() * (p - l)) + l];
    return !N.startsWith("INTEGER") && !N.startsWith("NUMBER") && !N.startsWith("DATE") && (!r.toLowerCase || r.toLowerCase() != "null") && (!r.charAt || r.charAt(0) != "q" && r.charAt(1) != "'") && (r.charAt && r.charAt(0) == "'" && (r = r.substring(1, r.length - 1)), r = r.replaceAll("'", "''"), r = "'" + r + "'"), r;
  }
  if (g == "NAME" && 0 <= v.indexOf("DEPARTMENT")) {
    var S = ["Sales", "Finance", "Delivery", "Manufacturing"];
    let l = 0, p = S.length;
    return "'" + S[Math.floor(X() * (p - l)) + l] + "'";
  }
  if (k[g.toLowerCase()] != null && g.indexOf("NAME") < 0)
    return "'" + k[g.toLowerCase()]() + "'";
  if (g == "FIRST_NAME")
    return "'" + k.first() + "'";
  if (g == "LAST_NAME")
    return "'" + k.last() + "'";
  if (0 <= g.indexOf("NAME"))
    return "'" + k.name() + "'";
  if (0 < g.indexOf("ADDRESS"))
    return "'" + k.address() + "'";
  if (g == "LOCATION")
    return "'" + k.city() + "'";
  if (g == "DESCRIPTION") {
    let l = k.paragraph({ sentences: 2 }), p = Z(D, !1, !0, ""), r = 400, t = -1;
    for (let o = 0; o < p.length; o++) {
      const s = p[o].value;
      if (s == "(") {
        t = o + 1;
        continue;
      }
      if (0 < t && s == ")") {
        r = parseInt(p[t].value);
        break;
      }
    }
    return r < l.length && (l = l.substring(0, r)), "'" + l + "'";
  }
  if (g == "JOB") {
    var E = ["Engineer", "Consultant", "Architect", "Manager", "Analyst", "Specialist", "Evangelist", "Salesman"];
    let l = 0, p = E.length;
    return "'" + E[Math.floor(X() * (p - l)) + l] + "'";
  }
  if (N.startsWith("INTEGER") || N.startsWith("NUMBER")) {
    let l = 0, p = 100;
    return Math.floor(X() * (p - l)) + l;
  }
  if (N.startsWith("DATE") || N.startsWith("TIMESTAMP")) {
    let l = 0, p = 100;
    var i = Math.floor(X() * (p - l)) + l;
    return "sysdate-" + i;
  }
  return N == "BLOB" || N == "LONG" ? "null" : "'N/A'";
}
var te = 1;
function Ae() {
  te = 1;
}
function X() {
  var u = Math.sin(te++) * 1e4;
  return u - Math.floor(u);
}
function ce(u) {
  const m = {
    ACCESS: "N",
    ADD: "N",
    ALL: "Y",
    ALTER: "Y",
    AND: "Y",
    ANY: "Y",
    AS: "Y",
    ASC: "Y",
    AUDIT: "N",
    BETWEEN: "Y",
    BY: "Y",
    CHAR: "Y",
    CHECK: "Y",
    CLUSTER: "Y",
    COLUMN: "N",
    COMMENT: "N",
    COMPRESS: "Y",
    CONNECT: "Y",
    CREATE: "Y",
    CURRENT: "N",
    DATE: "Y",
    DECIMAL: "Y",
    DEFAULT: "Y",
    DELETE: "Y",
    DESC: "Y",
    DISTINCT: "Y",
    DROP: "Y",
    ELSE: "Y",
    EXCEPT: "Y",
    EXCLUSIVE: "Y",
    EXISTS: "Y",
    FILE: "N",
    FLOAT: "Y",
    FOR: "Y",
    FROM: "Y",
    GRANT: "Y",
    GROUP: "Y",
    HAVING: "Y",
    IDENTIFIED: "Y",
    IMMEDIATE: "N",
    IN: "Y",
    INCREMENT: "N",
    INDEX: "Y",
    INITIAL: "N",
    INSERT: "Y",
    INTEGER: "Y",
    INTERSECT: "Y",
    INTO: "Y",
    IS: "Y",
    LEVEL: "N",
    LIKE: "Y",
    LOCK: "Y",
    LONG: "Y",
    MAXEXTENTS: "N",
    MINUS: "Y",
    MLSLABEL: "N",
    MODE: "Y",
    MODIFY: "N",
    NOAUDIT: "N",
    NOCOMPRESS: "Y",
    NOT: "Y",
    NOWAIT: "Y",
    NULL: "Y",
    NUMBER: "Y",
    OF: "Y",
    OFFLINE: "N",
    ON: "Y",
    ONLINE: "N",
    OPTION: "Y",
    OR: "Y",
    ORDER: "Y",
    PCTFREE: "Y",
    PRIOR: "Y",
    PUBLIC: "Y",
    RAW: "Y",
    RENAME: "Y",
    RESOURCE: "Y",
    REVOKE: "Y",
    ROW: "N",
    ROWID: "N",
    ROWNUM: "N",
    ROWS: "N",
    SELECT: "Y",
    SESSION: "N",
    SET: "Y",
    SHARE: "Y",
    SIZE: "Y",
    SMALLINT: "Y",
    START: "Y",
    SUCCESSFUL: "N",
    SYNONYM: "Y",
    SYSDATE: "N",
    TABLE: "Y",
    THEN: "Y",
    TO: "Y",
    TRIGGER: "Y",
    UID: "N",
    UNION: "Y",
    UNIQUE: "Y",
    UPDATE: "Y",
    USER: "N",
    VALIDATE: "N",
    VALUES: "Y",
    VARCHAR: "Y",
    VARCHAR2: "Y",
    VIEW: "Y",
    WHENEVER: "N",
    WHERE: "Y",
    WITH: "Y"
  };
  let D = u.toUpperCase();
  return m[D] != null ? "the_" + u : u;
}
let ue = function() {
  let u, m = "    ";
  const D = ["string", "varchar2", "varchar", "vc", "char"], R = ["yn", "boolean", "bool"];
  let k = [
    "integer",
    "number",
    "num",
    "int",
    "num",
    "blob",
    "clob",
    "json",
    "file",
    "date",
    "d",
    "tstz",
    "tswtz",
    "tswltz",
    "ts"
  ];
  k = k.concat(D), k = k.concat(R);
  function N(S, E, i) {
    this.line = S, this.parent = i, this.children = [], i != null && i.children.push(this), this.fks = null, this.findChild = function(r) {
      for (var t = 0; t < this.children.length; t++)
        if (this.children[t].parseName() == r)
          return this.children[t];
      return null;
    }, this.descendants = function() {
      var r = [];
      r.push(this);
      for (var t = 0; t < this.children.length; t++)
        r = r.concat(this.children[t].descendants());
      return r;
    }, this.maxChildNameLen = function() {
      var r = 2;
      if ((u.optionEQvalue("rowkey", !0) || this.isOption("rowkey")) && (r = 7), (u.optionEQvalue("Row Version Number", "yes") || this.isOption("rowversion")) && (r = 11), u.optionEQvalue("Audit Columns", "yes") || this.isOption("auditcols") || this.isOption("audit", "col") || this.isOption("audit", "cols") || this.isOption("audit", "columns")) {
        let d = u.getOptionValue("createdcol").length;
        r < d && (r = d), d = u.getOptionValue("createdbycol").length, r < d && (r = d), d = u.getOptionValue("updatedcol").length, r < d && (r = d), d = u.getOptionValue("updatedbycol").length, r < d && (r = d);
      }
      if (this.fks != null)
        for (var t in this.fks) {
          var o = t.length;
          let d = u.find(t);
          d != null && d.isMany2One() && (o += 3), r < o && (r = o);
        }
      for (var s = 0; s < this.children.length; s++) {
        let d = this.children[s];
        if (0 < d.children.length)
          continue;
        let C = d.parseName().length;
        0 < d.indexOf("file") && (C += 9), r < C && (r = C);
      }
      var M = u.additionalColumns();
      for (let d in M) {
        let C = d.length;
        r < C && (r = C);
      }
      return r;
    };
    function l(r) {
      let t = r;
      return t = t.replace(/ timestamp with local time zone/gi, " tswltz"), t = t.replace(/ timestamp with time zone/gi, " tswtz"), t = t.replace(/ timestamp/gi, " ts"), t;
    }
    this.content = l(E), this.comment, this.indexOf = function(r, t) {
      for (let o = 0; o < this.src.length; o++) {
        if (t && this.src[o].value.toLowerCase().indexOf(r.toLowerCase()) == 0)
          return o;
        if (r.toLowerCase() == this.src[o].value.toLowerCase())
          return o;
      }
      return -1;
    }, this.occursBeforeOption = function(r, t) {
      return 0 < this.indexOf(r, t) && (this.indexOf("/") < 0 || this.indexOf(r, t) < this.indexOf("/"));
    }, this.isOption = function(r, t) {
      for (let o = 2; o < this.src.length; o++)
        if (r == this.src[o].value.toLowerCase() && (t == null || o < this.src.length - 1 && t == this.src[o + 1].value.toLowerCase()))
          return this.src[o - 1].value == "/";
      return !1;
    }, this.getOptionValue = function(r) {
      if (this.src.length < 3)
        return null;
      const t = this.indexOf(r);
      if (t < 2 || this.src[t - 1].value != "/")
        return null;
      let o = "";
      for (let s = t + 1; s < this.src.length && this.src[s].value != "/" && this.src[s].value != "["; s++)
        o += this.src[s].value;
      return o;
    }, this.sugarcoatName = function(r, t) {
      let o = "";
      this.children.length == 0 && this.parent != null && this.parent.colprefix != null && (o = this.parent.colprefix + "_");
      let s = "", M = "_";
      for (let C = r; C < t; C++) {
        const I = this.src[C].value, L = '"' + I + '"';
        if (this.src[C].type != "constant.numeric" && I != Q(L))
          return s = this.content.substring(this.src[r].begin, this.src[t - 1].end), this.parsedName = o + ce(Q(s)), this.parsedName;
      }
      for (let C = r; C < t; C++)
        r < C && (s += M), s += this.src[C].value;
      var d = s.charAt(0);
      return d >= "0" && d <= "9" && (s = "x" + s), this.parsedName = o + ce(Q(s)), this.parsedName;
    }, this.src = Z(this.content, !1, !0, "`");
    const p = this.getOptionValue("colprefix");
    p != null && (this.colprefix = p), this.parsedName = null, this.parseName = function() {
      if (this.parsedName != null)
        return this.parsedName;
      let r = 0, t = this.src[0].value;
      (t == ">" || t == "<") && (t = this.src[1].value, r = 1);
      const o = t.indexOf('"'), s = t.indexOf('"', o + 1);
      if (0 <= o && o < s)
        return t.substring(o, s + 1);
      if (this.src[0].value == "view")
        return this.src[1].value;
      if (1 < this.src.length && this.src[1].value == "=")
        return this.src[0].value;
      let M = this.src.length, d = this.indexOf("/");
      0 < d && (M = d), d = this.indexOf("["), 0 < d && (M = d);
      for (let C = 0; C < k.length; C++) {
        const I = this.indexOf(k[C]);
        if (0 < I && I < M)
          return M = I, this.sugarcoatName(r, M);
      }
      for (let C = r; C < M; C++) {
        const I = this.src[C].value.toLowerCase();
        if (I.charAt(0) == "v" && I.charAt(1) == "c") {
          if (I.charAt(2) == "(")
            return this.sugarcoatName(r, C);
          if (0 <= I.charAt(2) && I.charAt(2) <= "9")
            return this.sugarcoatName(r, C);
        }
      }
      return this.sugarcoatName(r, M);
    }, this.parseType = function(r) {
      if (this.children != null && 0 < this.children.length)
        return "table";
      const t = this.src;
      if (t[0].value == "view" || 1 < t.length && t[1].value == "=")
        return "view";
      if (this.parent == null)
        return "table";
      var o = u.semantics(), s = 4e3;
      (t[0].value.endsWith("_name") || t[0].value.startsWith("name") || t[0].value.startsWith("email")) && (s = u.getOptionValue("namelen"));
      const M = this.indexOf("vc", !0);
      if (0 < M) {
        t[M].begin, t[M].end;
        let G = t[M].value.substring(2);
        G == "" && this.indexOf("(") == M + 1 && (G = t[M + 2].value), G != "" && (s = parseInt(G)), t[M].value.endsWith("k") && (s < 32 ? s = s * 1024 : s = s * 1024 - 1);
      }
      var d = "varchar2(" + s + o + ")";
      r == "plsql" && (d = "varchar2"), t[0].value.endsWith("_id") && M < 0 && this.indexOf("date") < 0 && (d = "number"), t[1] && t[1].value == "id" && (d = "number"), t[0].value == "quantity" && (d = "number"), t[0].value.endsWith("_number") && (d = "number"), t[0].value.endsWith("id") && M < 0 && this.indexOf("/") + 1 == this.indexOf("pk") && (d = "number"), this.occursBeforeOption("int", !0) && (d = "integer"), 0 < M && (d = "varchar2(" + s + o + ")", r == "plsql" && (d = "varchar2"));
      const C = K(i.parseName(), "_", this.parseName());
      this.isOption("default");
      let I = "";
      (t[0].value.endsWith("_yn") || t[0].value.startsWith("is_")) && (d = "varchar2(1" + u.semantics() + ")", I = `
` + m + m + " ".repeat(i.maxChildNameLen()) + "constraint " + K(u.objPrefix(), C) + " check (" + this.parseName() + " in ('Y','N'))");
      for (let G in R)
        if (0 < this.indexOf(R[G])) {
          d = "varchar2(1" + u.semantics() + ")", I = `
` + m + m + " ".repeat(i.maxChildNameLen()) + "constraint " + K(u.objPrefix(), C) + " check (" + this.parseName() + " in ('Y','N'))";
          break;
        }
      const L = u.getOptionValue("db");
      I != "" && (u.getOptionValue("boolean") == "native" || u.getOptionValue("boolean") != "yn" && 0 < L.length && 23 <= pe(L)) && (I = "", d = "boolean"), this.indexOf("phone_number") == 0 && (d = "number");
      let O = this.indexOf("num", !0);
      0 < O && (d = "number");
      let w = this.indexOf(")");
      if (0 < O && 0 < w && (d += this.content.toLowerCase().substring(t[O + 1].begin, t[w].end)), (0 <= this.indexOf("date") || this.indexOf("hiredate") == 0 || t[0].value.endsWith("_date") || t[0].value.startsWith("date_of_") || 1 < t.length && t[1].value == "d" || t[0].value.startsWith("created") || t[0].value.startsWith("updated")) && (d = u.getOptionValue("Date Data Type").toLowerCase()), M < 0 && (this.occursBeforeOption("clob") && (d = "clob"), (this.occursBeforeOption("blob") || this.occursBeforeOption("file")) && (d = "blob"), this.occursBeforeOption("json") && (d = "clob check (" + this.parseName() + " is json)")), this.occursBeforeOption("tswltz") && this.indexOf("/") ? d = "TIMESTAMP WITH LOCAL TIME ZONE".toLowerCase() : this.occursBeforeOption("tswtz") || this.occursBeforeOption("tstz") ? d = "TIMESTAMP WITH TIME ZONE".toLowerCase() : this.occursBeforeOption("ts") && (d = "TIMESTAMP".toLowerCase()), r) {
        if (this.isOption("fk") || 0 < this.indexOf("reference", !0)) {
          const G = this.refId();
          let x = "number";
          d == "integer" && (x = d);
          let P = u.find(G);
          return P != null && P.getExplicitPkName() != null && (x = P.getPkType()), x;
        }
        return d;
      }
      (this.isOption("unique") || this.isOption("uk")) && (d += `
`, d += m + m + " ".repeat(i.maxChildNameLen()) + "constraint " + K(u.objPrefix(), C, "_unq") + " unique");
      var F = "'";
      if ((d.startsWith("integer") || d.startsWith("number") || d.startsWith("date")) && (F = ""), this.isOption("default")) {
        let G = "";
        for (let x = this.indexOf("default") + 1; x < t.length; x++) {
          const P = t[x].getValue();
          if (P == "/" || P == "-" || P == "[")
            break;
          G += t[x].getValue();
        }
        d += " default on null " + F + G + F;
      }
      if ((this.isOption("nn") || this.indexOf("not") + 1 == this.indexOf("null")) && this.indexOf("pk") < 0 && (d += " not null"), (this.isOption("hidden") || this.isOption("invincible")) && (d += " invisible"), d += this.genConstraint(F), d += I, this.isOption("between")) {
        const G = this.indexOf("between"), x = t[G + 1].getValue() + " and " + t[G + 3].getValue();
        d += " constraint " + K(C, "_bet") + `
`, d += "           check (" + this.parseName() + " between " + x + ")";
      }
      if (this.isOption("pk")) {
        let G = " not null";
        d.startsWith("number") && u.optionEQvalue("pk", "identityDataType") && (G = " GENERATED BY DEFAULT ON NULL AS IDENTITY".toLowerCase()), d.startsWith("number") && u.optionEQvalue("pk", "seq") && (G = " default on null " + (u.objPrefix() + this.parent.parseName()) + "_seq.NEXTVAL ".toLowerCase()), d.startsWith("number") && u.optionEQvalue("pk", "guid") && (G = " default on null to_number(sys_guid(), 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') "), d += G + `
`, d += m + m + " ".repeat(i.maxChildNameLen()) + "constraint " + K(u.objPrefix(), C, "_pk") + " primary key";
      }
      return d;
    }, this.genConstraint = function(r) {
      let t = "";
      if (this.isOption("check")) {
        let o = "";
        i != null && (o = i.parseName() + "_");
        const s = K(o, this.parseName());
        let M = m;
        i != null && (M = " ".repeat(i.maxChildNameLen()));
        let d = this.getGeneralConstraint();
        if (d != null)
          return this.children != null && 0 < this.children.length ? (t += m + "constraint " + K(u.objPrefix(), s, "_ck"), t += "  check " + d + `,
`) : (t += " constraint " + K(u.objPrefix(), s, "_ck") + `
`, t += m + m + M + "check " + d), t;
        const C = this.getValues("check");
        t += " constraint " + K(u.objPrefix(), s, "_ck") + `
`, t += m + m + M + "check (" + this.parseName() + " in (" + C + "))";
      }
      return t;
    }, this.isMany2One = function() {
      return this.src[0].value == ">";
    }, this.getExplicitPkName = function() {
      if (this.isOption("pk"))
        return this.parseType() == "table" ? this.getOptionValue("pk") : this.parseName();
      for (var r = 0; r < this.children.length; r++) {
        var t = this.children[r];
        if (t.isOption("pk"))
          return t.parseName();
      }
      return null;
    }, this.trimmedContent = function() {
      var r = this.content.trim(), t = r.indexOf("["), o = r.indexOf("]");
      return this.comment == null && 0 < t && (this.comment = r.substr(t + 1, o - t - 1)), 0 < t && (r = r.substr(0, t) + r.substr(o + 2)), t = r.indexOf("--"), this.comment == null && 0 < t && (this.comment = r.substr(t + 2)), 0 < t && (r = r.substr(0, t)), r.trim();
    }, this.refId = function() {
      var r = this.trimmedContent();
      r = r.replace(/\/cascade/g, "");
      var t = r.indexOf(" id ");
      if (t < 0 && t == r.length - 3 && (t = r.indexOf(" id")), t < 0 && (t = r.indexOf(" id"), t != r.length - 3 && (t = -1)), t < 0 && (t = r.indexOf("_id "), t != r.length - 4 && (t = -1)), t < 0 && (t = r.indexOf("_id"), t != r.length - 3 && (t = -1)), t < 0 && (t = r.indexOf("Id "), t != r.length - 3 && (t = -1)), 0 < t) {
        let o = r.substr(0, t) + "s";
        if (u.find(o) != null || (o = r.substr(0, t), u.find(o) != null))
          return o;
      }
      return t = r.indexOf("/fk"), 0 < t ? (r = r.substr(t + 3).trim(), t = r.indexOf("/"), 0 < t && (r = r.substring(0, t).trim()), t = r.indexOf("["), 0 < t && (r = r.substring(0, t).trim()), r.replace(" ", "_")) : (t = r.indexOf("/reference"), 0 < t ? (r = r.substr(t + 10).trim(), r.indexOf("s") == 0 && (r = r.substring(1).trim()), t = r.indexOf("/"), 0 < t && (r = r.substring(0, t).trim()), t = r.indexOf("["), 0 < t && (r = r.substring(0, t).trim()), r.replace(" ", "_")) : null);
    }, this.getGeneralConstraint = function() {
      let r = this.indexOf("check");
      if (0 < r && this.src[r - 1].value == "/" && (this.src[r + 1].value == "(" || this.src[r + 1].value.toLowerCase() == "not")) {
        let t = r + 2;
        for (; t < this.src.length && this.src[t].value != "/" && this.src[t].value != "["; )
          t++;
        let o = this.content.substring(this.src[r + 1].begin, this.src[t - 1].end);
        return o.charAt(0) != "(" && (o = "(" + o + ")"), o;
      }
      return null;
    }, this.listValues = function(r) {
      let t = [], o = this.indexOf(r), s = " ";
      for (let C = o + 1; C < this.src.length && this.src[C].value != "/" && this.src[C].value != "["; C++)
        if (this.src[C].value == ",") {
          s = ",";
          break;
        } else if (this.src[C].value.toLowerCase && this.src[C].value.toLowerCase() == "and") {
          s = this.src[C].value;
          break;
        }
      if (s == " ") {
        for (let C = o + 1; C < this.src.length && this.src[C].value != "/" && this.src[C].value != "["; C++) {
          let I = this.src[C].value;
          this.src[C].type == "identifier" && I != "null" && (I = "'" + I + "'"), I.charAt(0) == "`" && (I = I.substring(1, I.length - 1)), t.push(I);
        }
        return t;
      }
      let M = null, d = null;
      for (let C = o + 1; C < this.src.length && this.src[C].value != "/" && this.src[C].value != "["; C++) {
        let I = this.src[C].value, L = this.content.substring(this.src[C - 1].end, this.src[C].begin);
        if (I == s) {
          d == "identifier" && M != "null" && (M = "'" + M + "'"), t.push(M), M = null, d = null;
          continue;
        }
        I != "(" && I != ")" && (I.charAt(0) == "`" ? I = I.substring(1, I.length - 1) : this.src[C].type == "identifier" && (d = "identifier"), M == null ? M = I : M += L + I);
      }
      return d == "identifier" && (M = "'" + M + "'"), t.push(M), t;
    }, this.getValues = function(r) {
      let t = "";
      const o = this.listValues(r);
      for (let s = 0; s < o.length; s++)
        0 < s && (t += ","), t += o[s];
      return t;
    }, this.parseValues = function() {
      var r;
      if (this.isOption("check"))
        return this.listValues("check");
      if (this.isOption("values"))
        return this.listValues("values");
      if (this.isOption("between")) {
        for (var r = this.listValues("between"), t = [], o = parseInt(r[0]); o <= parseInt(r[1]); o++)
          t.push(o);
        return t;
      }
      return null;
    }, this.apparentDepth = function() {
      let r = this.content.split(/ |\t/), t = 0;
      for (var o = 0; o < r.length; o++) {
        var s = r[o];
        if (s == "	") {
          t += this.tab;
          continue;
        }
        if (s == "") {
          t++;
          continue;
        }
        return t;
      }
      throw "No alphanumerics in the node content";
    }, this.depth = function() {
      return this.parent == null ? 0 : this.parent.depth() + 1;
    }, this.isLeaf = function() {
      return this.children.every((r) => r.children.length == 0);
    }, this.getGenIdColName = function() {
      if (this.parseType() != "table" || this.getExplicitPkName() != null)
        return null;
      if (u.optionEQvalue("Auto Primary Key", "yes")) {
        let r = "";
        return this.colprefix != null && (r = this.colprefix + "_"), u.optionEQvalue("prefixPKwithTname", "yes") && (r = W(this.parseName()) + "_"), r + "id";
      }
      return null;
    }, this.getPkName = function() {
      let r = this.getGenIdColName();
      return r ?? this.getExplicitPkName();
    }, this.getPkType = function() {
      if (this.getGenIdColName() == null) {
        const t = this.getExplicitPkName();
        return this.findChild(t).parseType((o) => !0);
      }
      return "number";
    }, this.lateInitFks = function() {
      if (this.fks == null && (this.fks = []), !this.isMany2One()) {
        this.parent != null && this.parseType() == "table" && (this.parent.getPkName().indexOf(",") < 0 ? this.fks[W(this.parent.parseName()) + "_id"] = this.parent.parseName() : this.fks[W(this.parent.getPkName())] = this.parent.parseName());
        for (let r = 0; r < this.children.length; r++)
          this.children[r].refId() != null && (this.fks[this.children[r].parseName()] = this.children[r].refId());
      }
    }, this.singleDDL = function() {
      if (this.children.length == 0 && 0 < this.apparentDepth()) {
        let P = m;
        return this.parent != null && (P += " ".repeat(this.parent.maxChildNameLen() - this.parseName().length)), this.parseName() + P + this.parseType();
      }
      this.lateInitFks();
      var r = "";
      const t = u.objPrefix() + this.parseName();
      u.optionEQvalue("pk", "SEQ") && u.optionEQvalue("genpk", !0) && (r = r + "create sequence  " + t + `_seq;

`), r = r + "create table " + t + ` (
`;
      var o = m + " ".repeat(this.maxChildNameLen() - 2);
      let s = this.getGenIdColName();
      if (s != null && !this.isOption("pk")) {
        let P = "not null";
        u.optionEQvalue("pk", "identityDataType") && (P = "GENERATED BY DEFAULT ON NULL AS IDENTITY".toLowerCase()), u.optionEQvalue("pk", "seq") && (P = "default on null " + t + "_seq.NEXTVAL ".toLowerCase()), u.optionEQvalue("pk", "guid") && (P = "default on null to_number(sys_guid(), 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') "), r += m + s + o + "number " + P + `
`;
        const e = K(u.objPrefix("no schema") + this.parseName(), "_", s);
        r += m + m + " ".repeat(this.maxChildNameLen()) + "constraint " + K(e, "_pk") + ` primary key,
`;
      } else {
        let P = this.getExplicitPkName();
        if (P != null && P.indexOf(",") < 0) {
          let e = m + " ".repeat(this.maxChildNameLen() - P.length), a = "number";
          const n = this.findChild(P);
          n != null && (a = n.parseType()), r += m + P + e + a + `,
`;
        }
      }
      for (let P in this.fks) {
        let e = this.fks[P];
        if (0 < P.indexOf(",")) {
          let f = u.find(e);
          for (var M = re(P, ", "), d = 0; d < M.length; d++) {
            var C = M[d];
            if (C == ",")
              continue;
            const B = f.findChild(C);
            o = m + " ".repeat(this.maxChildNameLen() - C.length), r += m + C + o + B.parseType((b) => !0) + `,
`;
          }
          continue;
        }
        let a = "number";
        const n = this.findChild(P);
        n != null && (a = n.parseType("fk"));
        let c = u.find(e), h = "";
        if (c != null) {
          const f = c.getExplicitPkName();
          f != null && f.indexOf(",") < 0 && (a = c.getPkType());
        } else
          c = u.find(P), c.isMany2One() & !P.endsWith("_id") && (e = P, P = W(P), h = "_id");
        if (o = m + " ".repeat(this.maxChildNameLen() - P.length), r += m + P + h + o + a, c.line < this.line || c.isMany2One()) {
          r += m + m + " ".repeat(this.maxChildNameLen()) + "constraint " + t + "_" + P + `_fk
`;
          let f = "";
          this.isOption("cascade") ? f = " on delete cascade" : this.isOption("setnull") && (f = " on delete set null");
          let B = "";
          for (let b in this.children) {
            let A = this.children[b];
            if (P == A.parseName()) {
              (A.isOption("nn") || A.isOption("notnull")) && (B = " NOT NULL".toLowerCase()), A.isOption("cascade") ? f = " on delete cascade" : this.isOption("setnull") && (f = " on delete set null");
              break;
            }
          }
          r += m + m + " ".repeat(this.maxChildNameLen()) + "references " + u.objPrefix() + e + f + B + `,
`;
        } else {
          r += `,
`;
          const f = "alter table " + t + " add constraint " + t + "_" + P + "_fk foreign key (" + P + ") references " + u.objPrefix() + e + `;
`;
          u.postponedAlters.includes(f) || u.postponedAlters.push(f);
        }
      }
      if (u.optionEQvalue("rowkey", !0) || this.isOption("rowkey")) {
        let P = m + " ".repeat(this.maxChildNameLen() - 7);
        r += m + "row_key" + P + "varchar2(30" + u.semantics() + `)
`, r += m + m + " ".repeat(this.maxChildNameLen()) + "constraint " + t + `_row_key_unq unique not null,
`;
      }
      for (let P = 0; P < this.children.length; P++) {
        let e = this.children[P];
        if (!(s != null && e.parseName() == "id") && !(0 < e.children.length) && e.refId() == null) {
          if (e.parseName() == this.getExplicitPkName())
            continue;
          if (r += m + e.singleDDL() + `,
`, 0 < e.indexOf("file")) {
            const a = e.parseName().toUpperCase();
            let n = a + "_FILENAME", c = m + " ".repeat(this.maxChildNameLen() - n.length);
            r += m + n.toLowerCase() + c + "varchar2(255" + u.semantics() + `),
`, n = a + "_MIMETYPE", c = m + " ".repeat(this.maxChildNameLen() - n.length), r += m + n.toLowerCase() + c + "varchar2(255" + u.semantics() + `),
`, n = a + "_CHARSET", c = m + " ".repeat(this.maxChildNameLen() - n.length), r += m + n.toLowerCase() + c + "varchar2(255" + u.semantics() + `),
`, n = a + "_LASTUPD", c = m + " ".repeat(this.maxChildNameLen() - n.length), r += m + n.toLowerCase() + c + u.getOptionValue("Date Data Type").toLowerCase() + `,
`;
          }
        }
      }
      if (u.optionEQvalue("rowVersion", "yes") || this.isOption("rowversion")) {
        let P = m + " ".repeat(this.maxChildNameLen() - 11);
        r += m + "row_version" + P + `integer not null,
`;
      }
      if (u.optionEQvalue("Audit Columns", "yes") || this.isOption("auditcols") || this.isOption("audit", "col") || this.isOption("audit", "cols") || this.isOption("audit", "columns")) {
        let P = u.getOptionValue("createdcol"), e = m + " ".repeat(this.maxChildNameLen() - P.length);
        r += m + P + e + u.getOptionValue("Date Data Type").toLowerCase() + ` not null,
`;
        let a = u.getOptionValue("createdbycol");
        e = m + " ".repeat(this.maxChildNameLen() - a.length), r += m + a + e + "varchar2(255" + u.semantics() + `) not null,
`;
        let n = u.getOptionValue("updatedcol");
        e = m + " ".repeat(this.maxChildNameLen() - n.length), r += m + n + e + u.getOptionValue("Date Data Type").toLowerCase() + ` not null,
`;
        let c = u.getOptionValue("updatedbycol");
        e = m + " ".repeat(this.maxChildNameLen() - c.length), r += m + c + e + "varchar2(255" + u.semantics() + `) not null,
`;
      }
      var I = u.additionalColumns();
      for (let P in I) {
        var L = I[P];
        o = m + " ".repeat(this.maxChildNameLen() - P.length), r += m + P.toUpperCase() + o + L + ` not null,
`;
      }
      r += this.genConstraint(), r.lastIndexOf(`,
`) == r.length - 2 && (r = r.substring(0, r.length - 2) + `
`), r += ")" + (u.optionEQvalue("compress", "yes") || this.isOption("compress") ? " compress" : "") + `;

`, this.isOption("audit") && !this.isOption("auditcols") && !this.isOption("audit", "col") && !this.isOption("audit", "cols") && !this.isOption("audit", "columns") && (r += "audit all on " + t + `;

`);
      for (let P in this.fks)
        if (0 < P.indexOf(",")) {
          var O = this.fks[P];
          r += "alter table " + t + " add constraint " + O + "_" + t + "_fk foreign key (" + P + ") references " + O + `;

`;
        }
      let w = 1;
      for (let P in this.fks)
        if (!this.isMany2One()) {
          var O = this.fks[P], F = O, C = P;
          C == null && (C = W(F) + "_id"), w == 1 && (r += `-- table index
`), r += "create index " + t + "_i" + w++ + " on " + t + " (" + C + `);

`;
        }
      let G = this.getOptionValue("pk");
      G && (r += "alter table " + t + " add constraint " + t + "_pk primary key (" + G + `);

`), G = this.getOptionValue("unique"), G == null && (G = this.getOptionValue("uk")), G != null && (r += "alter table " + t + " add constraint " + t + "_uk unique (" + G + `);

`);
      for (let P = 0; P < this.children.length; P++) {
        var x = this.children[P];
        (x.isOption("idx") || x.isOption("index")) && (w == 1 && (r += `-- table index
`), r += "create index " + t + "_i" + w++ + " on " + t + " (" + x.parseName() + `);
`);
      }
      this.comment != null && (r += "comment on table " + t + " is '" + this.comment + `';
`);
      for (let P = 0; P < this.children.length; P++) {
        let e = this.children[P];
        e.comment != null && e.children.length == 0 && (r += "comment on column " + t + "." + e.parseName() + " is '" + e.comment + `';
`);
      }
      return r += `
`, r;
    }, this.toDDL = function() {
      if (this.parseType() == "view" || this.parseType() == "dv")
        return "";
      var r = this.orderedTableNodes();
      let t = "";
      for (let o = 0; o < r.length; o++)
        t += r[o].singleDDL();
      return t;
    }, this.orderedTableNodes = function() {
      var r = [this];
      const t = this.descendants();
      for (let s = 1; s < t.length; s++) {
        var o = t[s];
        o.children.length != 0 && (o.isMany2One() ? o.isContainedIn(r) || r.unshift(o) : o.isContainedIn(r) || r.push(o));
      }
      return r;
    }, this.isContainedIn = function(r) {
      for (const t in r)
        if (r[t].parseName() == this.parseName())
          return !0;
      return !1;
    }, this.generateDrop = function() {
      let r = u.objPrefix() + this.parseName(), t = "";
      return this.parseType() == "view" && (t = "drop view " + r + `;
`), this.parseType() == "table" && (t = "drop table " + r + ` cascade constraints;
`, u.optionEQvalue("api", "yes") && (t += "drop package " + r + `_api;
`), u.optionEQvalue("pk", "SEQ") && (t += "drop sequence " + r + `_seq;
`)), t.toLowerCase();
    }, this.generateView = function() {
      if (this.parseType() != "view" && this.parseType() != "dv")
        return "";
      if (u.optionEQvalue("Duality View", "yes") || this.parseType() == "dv")
        try {
          return this.generateDualityView();
        } catch (f) {
          if (f.message == this.one2many2oneUnsupoported)
            return "";
          throw f;
        }
      let r = u.objPrefix() + this.parseName();
      var t = this.src, o = "create or replace view " + r + ` as
`;
      o += `select
`;
      for (var s = 0, M = 2; M < t.length; M++) {
        let f = u.find(t[M].value);
        if (f == null)
          return "";
        var d = (t[M].value + ".id").length;
        s < d && (s = d);
        for (var C = 0; C < f.children.length; C++) {
          var I = f.children[C];
          d = (t[M].value + "." + I.parseName()).length, s < d && (s = d);
        }
      }
      var L = {};
      for (let f = 2; f < t.length; f++) {
        let B = u.find(t[f].value);
        if (B != null)
          for (let b = 0; b < B.children.length; b++) {
            var O = B.children[b].parseName(), w = L[O];
            w == null && (w = 0), L[O] = w + 1;
          }
      }
      for (let f = 2; f < t.length; f++) {
        let B = u.find(t[f].value);
        if (B == null)
          continue;
        let b = " ".repeat(s - (t[f].value + ".id").length);
        o += m + t[f].value + ".id" + m + b + W(t[f].value) + `_id,
`;
        for (let A = 0; A < B.children.length; A++) {
          let y = B.children[A];
          if (y.children.length == 0) {
            b = " ".repeat(s - (t[f].value + "." + y.parseName()).length);
            var F = "";
            1 < L[y.parseName()] && (F = W(t[f].value) + "_"), o += m + t[f].value + "." + y.parseName() + m + b + F + y.parseName() + `,
`;
          }
        }
        if (u.optionEQvalue("rowVersion", "yes") || B.isOption("rowversion")) {
          let A = m + " ".repeat(B.maxChildNameLen() - 11);
          o += m + t[f].value + ".row_version" + W(A + t[f].value) + `_row_version,
`;
        }
        if (u.optionEQvalue("rowkey", "yes") || B.isOption("rowkey")) {
          let A = m + " ".repeat(B.maxChildNameLen() - 7);
          o += m + t[f].value + ".ROW_KEY" + W(A + t[f].value) + `_ROW_KEY,
`;
        }
        if (u.optionEQvalue("Audit Columns", "yes") || B.isOption("auditcols") || B.isOption("audit", "col") || B.isOption("audit", "cols") || B.isOption("audit", "columns")) {
          let A = u.getOptionValue("createdcol"), y = m + " ".repeat(B.maxChildNameLen() - A.length);
          o += m + t[f].value + "." + A + W(y + t[f].value) + "_" + A + `,
`;
          let T = u.getOptionValue("createdbycol");
          y = m + " ".repeat(B.maxChildNameLen() - T.length), o += m + t[f].value + "." + T + W(y + t[f].value) + "_" + T + `,
`;
          let H = u.getOptionValue("updatedcol");
          y = m + " ".repeat(B.maxChildNameLen() - H.length), o += m + t[f].value + "." + H + W(y + t[f].value) + "_" + H + `,
`;
          let _ = u.getOptionValue("updatedbycol");
          y = m + " ".repeat(B.maxChildNameLen() - _.length), o += m + t[f].value + "." + _ + W(y + t[f].value) + "_" + _ + `,
`;
        }
      }
      o.lastIndexOf(`,
`) == o.length - 2 && (o = o.substr(0, o.length - 2) + `
`), o += `from
`;
      for (let f = 2; f < t.length; f++) {
        let B = " ".repeat(s - t[f].length);
        var G = t[f].value;
        u.objPrefix() != null && u.objPrefix() != "" && (G = u.objPrefix() + t[f].value + B + t[f].value), o += m + G + `,
`;
      }
      o.lastIndexOf(`,
`) == o.length - 2 && (o = o.substr(0, o.length - 2) + `
`), o += `where
`;
      for (let f = 2; f < t.length; f++)
        for (let B = 2; B < t.length; B++)
          if (B != f) {
            var x = t[f].value, P = t[B].value, e = u.find(x);
            if (e != null) {
              var a = u.find(P);
              if (a != null)
                for (var n in e.fks) {
                  var c = e.fks[n];
                  c == P && (o += m + x + "." + W(c) + "_id(+) = " + P + `.id and
`);
                }
            }
          }
      o = o.toLowerCase();
      let h = `where
`;
      return 0 < o.indexOf(h) && o.indexOf(h) == o.length - h.length && (o = o.substring(0, o.length - h.length).trim()), h = `and
`, 0 < o.indexOf(h) && o.indexOf(h) == o.length - h.length && (o = o.substring(0, o.length - h.length).trim()), o.endsWith("/n") || (o += `
`), o += `/
`, o.toLowerCase();
    }, this.restEnable = function() {
      if (this.parseType() != "table" || !this.isOption("rest"))
        return "";
      let r = this.parseName();
      const t = r.indexOf('"') == 0;
      let o = u.objPrefix() + r;
      return t ? o = u.objPrefix() + r.substring(1, r.length - 1) : o = (u.objPrefix() + r).toUpperCase(), `begin
` + m + "ords.enable_object(p_enabled=>TRUE, p_object=>'" + o + `');
end;
/
`;
    }, this.generateTrigger = function() {
      if (this.parseType() != "table")
        return "";
      let r = "";
      u.optionEQvalue("editionable", "yes") && (r = " editionable");
      let t = u.objPrefix() + this.parseName();
      var o = "create or replace" + r + " trigger " + t.toLowerCase() + `_BIU
`.toLowerCase();
      o += `    before insert or update
`, o += "    on " + t.toLowerCase() + `
`, o += `    for each row
`, (u.optionEQvalue("rowkey", "yes") || this.isOption("rowkey")) && (o += `declare
    function compress_int (n in integer ) return varchar2
    as
        ret       varchar2(30);
        quotient  integer;
        remainder integer;
        digit     char(1);
    begin
        ret := null; quotient := n;
        while quotient > 0
        loop
            remainder := mod(quotient, 10 + 26);
            quotient := floor(quotient  / (10 + 26));
            if remainder < 26 then
                digit := chr(ascii('A') + remainder);
            else
                digit := chr(ascii('0') + remainder - 26);
            end if;
            ret := digit || ret;
        end loop ;
        if length(ret) < 5 then ret := lpad(ret, 4, 'A'); end if ;
        return upper(ret);
    end compress_int;
`), o += `begin
`;
      var s = !1, M = "user";
      u.optionEQvalue("apex", "yes") && (M = "coalesce(sys_context('APEX$SESSION','APP_USER'),user)"), (u.optionEQvalue("rowkey", "yes") || this.isOption("rowkey")) && (o += `    if inserting then
`, o += `        :new.row_key := compress_int(row_key_seq.nextval);
`, o += `    end if;
`, s = !0);
      for (var d = 0; d < this.children.length; d++) {
        var C = this.children[d];
        let w = null;
        0 < C.content.indexOf("/lower") ? w = "LOWER".toLowerCase() : 0 < C.content.indexOf("/upper") && (w = "UPPER".toLowerCase()), w != null && (o += "    :new." + C.parseName().toLowerCase() + " := " + w + "(:new." + C.parseName().toLowerCase() + `);
`, s = !0);
      }
      (u.optionEQvalue("Row Version Number", "yes") || this.isOption("rowversion")) && (o += `    if inserting then
`, o += `        :new.row_version := 1;
`, o += `    elsif updating then
`, o += `        :new.row_version := NVL(:old.row_version, 0) + 1;
`, o += `    end if;
`, s = !0), (u.optionEQvalue("Audit Columns", "yes") || this.isOption("auditcols") || this.isOption("audit", "col") || this.isOption("audit", "cols") || this.isOption("audit", "columns")) && (o += `    if inserting then
`, o += "        :new." + u.getOptionValue("createdcol") + ` := SYSDATE;
`.toLowerCase(), o += "        :new." + u.getOptionValue("createdbycol") + " := " + M + `;
`.toLowerCase(), o += `    end if;
`, o += "    :new." + u.getOptionValue("updatedcol") + ` := SYSDATE;
`.toLowerCase(), o += "    :new." + u.getOptionValue("updatedbycol") + " := " + M + `;
`.toLowerCase(), s = !0);
      var I = u.additionalColumns();
      for (var L in I) {
        var O = I[L];
        o += "    if :new." + L + ` is null then
`, O.startsWith("INT") ? o += "        " + L + ` := 0;
` : o += "        " + L + ` := 'N/A';
`, o += `    end if;
`, s = !0;
      }
      return s ? (o += "end " + t.toLowerCase() + `_BIU;
/

`.toLowerCase(), o) : "";
    }, this.procDecl = function(r) {
      let t = "";
      r != "get" && (t = " default null");
      let o = "out";
      r != "get" && (o = " in");
      let s = m + "procedure " + r + `_row (
`, M = this.getGenIdColName();
      M == null && (M = this.getExplicitPkName()), s += m + m + "p_" + M + "        in  number" + t;
      for (var d in this.fks) {
        let I = this.fks[d], L = "number", O = u.find(I);
        O != null && O.getExplicitPkName() != null && (L = O.getPkType()), s += `,
`, s += m + m + "P_" + d + "   " + o + "  " + L + t;
      }
      for (let I = 0; I < this.children.length; I++) {
        var C = this.children[I];
        C.refId() == null && C.children.length == 0 && (s += `,
`, s += m + m + "P_" + C.parseName() + "   " + o + "  " + C.parseType("plsql") + t);
      }
      return s += `
    )`, s;
    }, this.procBody = function(r) {
      let t = this.getGenIdColName();
      t == null && (t = this.getExplicitPkName());
      let o = u.objPrefix() + this.parseName(), s = m + `is 
`;
      s += m + `begin 
`;
      let M = m + m + "for c1 in (select * from " + o + " where " + t + " = p_" + t + `) loop 
`;
      r == "insert" && (M = m + m + "insert into " + o + ` ( 
`, M += m + m + m + t), r == "update" && (M = m + m + "update  " + o + ` set 
`, M += m + m + m + t + " = p_" + t), s += M;
      for (let L in this.fks) {
        let O = this.fks[L], w = u.find(O);
        w != null && w.getExplicitPkName() != null && w.getPkType(), (r == "insert" || r == "update") && (s += `,
`);
        let F = m + m + m + "P_" + L + " := c1." + L + `;
`;
        r == "insert" && (F = m + m + m + L), r == "update" && (F = m + m + m + L + " = P_" + L), s += F;
      }
      for (var d = 0; d < this.children.length; d++) {
        var C = this.children[d];
        if (C.refId() != null || C.children.length != 0)
          continue;
        (r == "insert" || r == "update") && (s += `,
`);
        let L = m + m + m + "P_" + C.parseName().toLowerCase() + " := c1." + C.parseName().toLowerCase() + `;
`;
        r == "insert" && (L = m + m + m + C.parseName().toLowerCase()), r == "update" && (L = m + m + m + C.parseName().toLowerCase() + " = P_" + C.parseName().toLowerCase()), s += L;
      }
      if (r == "insert") {
        s += `
` + m + m + `) values ( 
`, s += m + m + m + "p_" + t;
        for (let L in this.fks)
          s += `,
`, s += m + m + m + "p_" + L;
        for (let L = 0; L < this.children.length; L++) {
          let O = this.children[L];
          O.refId() == null && O.children.length == 0 && (s += `,
`, s += m + m + m + "p_" + O.parseName());
        }
      }
      let I = `
        end loop;
`;
      return r == "insert" && (I = `
` + m + m + ");"), r == "update" && (I = `
` + m + m + "where " + t + " = p_" + t + ";"), s += I, s += `
` + m + "end " + r + `_row;
 `, s += `
 `, s;
    }, this.generateTAPI = function() {
      if (this.children.length == 0)
        return "";
      let r = u.objPrefix() + this.parseName();
      var t = "create or replace package " + r.toLowerCase() + `_API
is

`.toLowerCase();
      t += this.procDecl("get"), t += `;

`, t += this.procDecl("insert"), t += `;

`, t += this.procDecl("update"), t += `;

`;
      let o = this.getGenIdColName();
      return o == null && (o = this.getExplicitPkName()), t += `    procedure delete_row (
        p_` + o + `              in number
    );
end ` + r.toLowerCase() + `_api;
/

`, t += "create or replace package body " + r.toLowerCase() + `_API
is

`.toLowerCase(), t += this.procDecl("get"), t += `
`, t += this.procBody("get"), t += this.procDecl("insert"), t += `
`, t += this.procBody("insert"), t += this.procDecl("update"), t += `
`, t += this.procBody("update"), t += `    procedure delete_row (
`, t += "        p_" + o + `              in number
`, t += `    )
`, t += `    is
`, t += `    begin
`, t += "        delete from " + r.toLowerCase() + " where " + o + " = p_" + o + `;
`, t += `    end delete_row;
`, t += "end " + r.toLowerCase() + `_api;
`, t += `/
`, t.toLowerCase();
    }, this.cardinality = function() {
      if (0 < this.isOption("insert")) {
        const t = this.indexOf("insert");
        let o = parseInt(this.src[t + 1].value);
        const s = u.getOptionValue("datalimit");
        return s < o && (o = s), o;
      }
      return 0;
    }, this.generateData = function(r) {
      if (Ae(), u.optionEQvalue("inserts", !1))
        return "";
      const t = this.inserts4tbl(r), o = this.orderedTableNodes();
      let s = "";
      for (let M = 0; M < o.length; M++) {
        const d = u.objPrefix() + o[M].parseName(), C = t[d];
        C != null && (s += C);
      }
      return s;
    }, this.inserts4tbl = function(r) {
      let t = {};
      if (u.optionEQvalue("inserts", !1))
        return "";
      const o = u.objPrefix() + this.parseName();
      let s = "", M = null, d = null;
      for (let I = 0; I < this.cardinality(); I++) {
        let L = null;
        if (r != null) {
          const w = r[o];
          w != null && Array.isArray(w) && (L = w[I]);
        }
        s += "insert into " + o + ` (
`;
        let O = this.getGenIdColName();
        if (O != null)
          M = O, s += m + M + `,
`;
        else {
          let w = this.getExplicitPkName();
          w != null && (s += m + w + `,
`);
        }
        for (let w in this.fks) {
          let F = this.fks[w], G = u.find(F), x = "";
          G == null && (G = u.find(w), G.isMany2One() & !w.endsWith("_id") && (F = w, w = W(w), x = "_id")), s += m + w + x + `,
`;
        }
        for (let w = 0; w < this.children.length; w++) {
          let F = this.children[w];
          if (!(O != null && F.parseName() == "id") && F.refId() == null) {
            if (F.isOption("pk"))
              continue;
            F.children.length == 0 && (s += m + F.parseName() + `,
`);
          }
        }
        if (s.lastIndexOf(`,
`) == s.length - 2 && (s = s.substring(0, s.length - 2) + `
`), s += `) values (
`, O != null)
          d = I + 1, s += m + d + `,
`;
        else {
          let w = this.getExplicitPkName();
          if (w != null) {
            const F = w;
            let G = g(u.data, null, F, this.parseName()), x = -1;
            L != null && (x = L[F]), G != null && G[I] != null && (x = G[I]), x.replaceAll && (x = "'" + x + "'"), d = x != -1 ? x : I + 1, s += m + d + `,
`;
          }
        }
        for (let w in this.fks) {
          let F = this.fks[w], G = u.find(F), x = [], P = "INTEGER";
          for (let e = 1; e <= G.cardinality(); e++)
            x.push(e);
          if (L != null) {
            let e = L[w];
            if (e != null)
              typeof e == "string" && (P = "STRING"), x = [], x[0] = e;
            else {
              const a = o + "_" + F, n = u.data[a];
              if (n != null) {
                for (const c in n)
                  if (n[c][o + "_id"] == d) {
                    const h = n[c][w];
                    h != null && (typeof h == "string" && (P = "STRING"), x = [], x[0] = h);
                    break;
                  }
              } else {
                let c = G.getPkName(), h = L[c];
                h != null && (typeof h == "string" && (P = "STRING"), x = [], x[0] = h);
              }
            }
          }
          s += m + le(u.getOptionValue("Data Language"), se(o, W(F) + "_id", P, x)) + `,
`;
        }
        for (let w = 0; w < this.children.length; w++) {
          let F = this.children[w];
          if (!(O != null && F.parseName() == "id") && F.refId() == null) {
            if (F.parseName() == this.getExplicitPkName())
              continue;
            if (F.children.length == 0) {
              let G = F.parseValues(), x = F.parseName();
              if (L != null) {
                let e = L[x];
                e != null && (G = [], G[0] = e);
              }
              let P = se(o, x, F.parseType((e) => !0), G);
              s += m + le(u.getOptionValue("Data Language"), P) + `,
`;
            }
          }
        }
        s.lastIndexOf(`,
`) == s.length - 2 && (s = s.substring(0, s.length - 2) + `
`), s += `);
`;
      }
      s != "" && (s += `
commit;

`);
      let C = this.getGenIdColName();
      C != null && 1 < this.cardinality() && !u.optionEQvalue("pk", "guid") && (s += "alter table " + o + `
modify ` + C + " generated always  as identity restart start with " + (this.cardinality() + 1) + `;

`), t[o] = s;
      for (let I = 0; I < this.children.length; I++) {
        const L = this.children[I];
        0 < L.children.length && (t = { ...t, ...L.inserts4tbl(r) });
      }
      return t;
    }, this.isArray = function() {
      return !this.isMany2One() && this.parent != null;
    }, this.hasNonArrayChildId = function(r) {
      if (!r.endsWith("_id"))
        return !1;
      var t = r.slice(0, -3);
      return this.children.some((o) => o.children.length > 0 && o.parseName() == t && !o.isArray());
    }, this.generateDualityView = function() {
      return "/* not supported yet*/";
    };
  }
  function v(S) {
    u = S;
    const E = S.input;
    let i = [], l = [];
    const p = Z(E + `
`, !0, !0, "`");
    u.data = null;
    let r = null, t = "";
    e:
      for (let o = 0; o < p.length; o++) {
        const s = p[o];
        if (s.value == `
` && r == null) {
          if (t = t.replace(/\r/g, ""), t.replace(/\r/g, "").replace(/ /g, "") == "") {
            t = "";
            continue;
          }
          let d = new N(s.line - 1, t, null), C = !1;
          for (let I = 0; I < i.length; I++) {
            let L = i[I];
            if (d.apparentDepth() <= L.apparentDepth())
              if (0 < I) {
                let O = i[I - 1];
                d = new N(s.line - 1, t, O), i[I] = d, i = i.slice(0, I + 1), C = !0;
                break;
              } else
                i[0] = d, i = i.slice(0, 1), l.push(d), C = !0;
          }
          if (!C) {
            if (0 < i.length) {
              let I = i[i.length - 1];
              d = new N(s.line - 1, t, I);
            }
            i.push(d), d.apparentDepth() == 0 && l.push(d);
          }
          if (d.isMany2One()) {
            const I = d.parent;
            I.fks == null && (I.fks = []);
            let L = d.refId();
            L == null && (L = d.parseName()), I.fks[d.parseName() + "_id"] = L;
          }
          t = "";
          continue;
        }
        if (r == null && s.value == "#") {
          r = "";
          continue;
        }
        if (r != null) {
          if (r += s.value, s.value != `
` && s.value != "}")
            continue;
          const M = Z(r, !1, !0, "");
          if (M.length % 4 == 3 && M[1].value == ":") {
            S.setOptions(r), r = null, t = "";
            continue;
          }
          let d = null, C = null;
          for (let I in M) {
            const L = M[I];
            if (d == null && L.value == "flattened") {
              d = "";
              continue;
            }
            if (d != null) {
              if (d += L.value, d == "=" || d.charAt(d.length - 1) != "}")
                continue;
              let O = d.substring(1);
              try {
                u.data = JSON.parse(O), r = null, t = "";
                continue e;
              } catch {
              }
            }
            if (C == null && L.value == "settings") {
              C = "";
              continue;
            }
            if (C != null) {
              C += L.value, C.substring(1);
              try {
                S.setOptions(C), r = null, t = "";
                continue e;
              } catch {
              }
            }
          }
        }
        if (s.type != "comment") {
          if (s.type == "line-comment") {
            0 < t.trim().length && (t += s.value);
            continue;
          }
          t += s.value;
        }
      }
    return l;
  }
  function g(S, E, i, l) {
    let p = [];
    if (S == null || typeof S != "object")
      return null;
    let r = S[i];
    r != null && E == l && p.push(r);
    for (var t in S) {
      let o = S[t];
      r = g(o, t, i, l), r != null && (p = p.concat(r));
    }
    return p;
  }
  return v;
}();
var ye = function() {
  function u(i) {
    for (var l = "", p = 0; p < i; p++)
      l = l + "   ";
    return l;
  }
  function m(i, l) {
    for (const p in i)
      if (JSON.stringify(i[p]) == JSON.stringify(l))
        return !0;
    return !1;
  }
  function D(i) {
    let l = ["_id", "Id"];
    if (i.id != null)
      return { key: "id", value: i.id };
    for (let p = 0; p < l.length; p++) {
      const r = l[p];
      for (let t in i)
        if (t.endsWith(r))
          return { key: t, value: i[t] };
    }
  }
  function R(i) {
    for (let l in i)
      if (!(i[l] != null && typeof i[l] == "object"))
        return !0;
    return !1;
  }
  function k(i) {
    let l = null;
    e:
      for (const p in i)
        if (p == 0)
          for (const r in i[p]) {
            l = r;
            break e;
          }
        else {
          l = p;
          break e;
        }
    return l.toLowerCase() == "id" ? null : l.toLowerCase().endsWith("_id") ? l.substring(0, l.length - 3) : l.endsWith("Id") ? l.substring(0, l.length - 2) : null;
  }
  function N(i, l, p) {
    let r = !1, t = !1;
    for (const s in i)
      for (var o = 0; o < s; o++)
        if (i[s][l] == i[o][l] && i[s][p] != i[o][p] ? r = !0 : i[s][l] != i[o][l] && i[s][p] == i[o][p] && (t = !0), r && t)
          return !0;
    return !1;
  }
  function v(i) {
    if (i == null || typeof i != "object")
      return "";
    let l = "(";
    for (let p in i) {
      if (p == 0)
        return v(i[p]);
      i[p] != null && typeof i[p] == "object" || (l += p + ",");
    }
    return l.lastIndexOf(",") == l.length - 1 && (l = l.substring(0, l.length - 1)), l + ")";
  }
  function g(i, l) {
    let p = i.indexOf("(");
    return 0 < p && (i = i.substring(0, p)), p = l.indexOf("("), 0 < p && (l = l.substring(0, p)), i + "_" + l + "(" + i + "_id," + l + "_id)";
  }
  function S(i, l) {
    const p = JSON.parse(i), r = k(p);
    r != null && (l = r), l == null && (l = "root_tbl");
    const t = new E();
    t.duplicatesAndParents(l + v(p), p), t.flatten(l + v(p), p);
    let o = t.output(l + v(p), p, 0);
    o += `

#settings = { genpk: false, drop: true, pk: identityDataType, semantics: char }`, o += `

#flattened = 
`;
    const s = {};
    for (const M in t.tableContent)
      s[t.tableName(M)] = t.tableContent[M];
    return o += JSON.stringify(s, null, 3), o += `
`, o += `

-- Generated by json2qsql.js ${oe()} ` + (/* @__PURE__ */ new Date()).toLocaleString() + `

`, o += `#document = 
`, o += JSON.stringify(p, null, 3), o += `
`, o;
  }
  function E() {
    this.tableContent = {}, this.notNormalized = [], this.tableSignatures = [], this.child2parent = {}, this.objCounts = {}, this.output = function(i, l, p, r) {
      if (r != !1 && this.notNormalized.includes(i)) {
        const s = g(this.parent(i), i), M = this.tableContent[s];
        if (M != null) {
          let d = `
` + u(p) + this.tableName(s) + " /insert " + M.length;
          if (M[0], N(M, this.refIdName(this.parent(i)), this.refIdName(i)))
            return d += this.output(i, l, p + 1, !1), d;
        }
      }
      let t = "";
      this.notNormalized.includes(i) && (t = ">");
      let o = `
` + u(p) + t + this.tableName(i);
      if (typeof l == "number" && (o += " num", i.endsWith("_id") || i.endsWith("Id")))
        return o += " /pk", o;
      if (i == "id")
        return `
` + u(p) + "id vc32 /pk";
      e:
        if (l != null && typeof l == "object") {
          if (Array.isArray(l))
            for (const M in l) {
              1 <= M && console.log("1 <= property !");
              const d = l[M];
              o = this.output(i, d, p, r);
              break e;
            }
          else
            i != "" && (this.tableContent[i] == null && console.log(), o += "  /insert " + this.tableContent[i].length);
          let s = "";
          this.tableSignatures.includes(i) || (o = "", p--);
          for (let M in l) {
            const d = l[M];
            if (M != null) {
              const I = W(i), L = M.toLowerCase();
              if (i != null && I + "_id" == L && 0 < p && (s = M), I + "_id" == L || !isNaN(M) && !Array.isArray(l))
                continue;
            }
            const C = this.output(M + v(d), d, p + 1);
            o += C;
          }
          s != "" && (o += `
` + u(p) + s);
        }
      return o;
    }, this.idSeq = 1, this.flatten = function(i, l, p) {
      let r = {};
      for (let s in l)
        if (l[s] != null && typeof l[s] == "object") {
          let M = i, d = p;
          if (isNaN(s)) {
            M = s + v(l[s]);
            const C = D(r);
            C != null && (d = C);
          }
          this.flatten(M, l[s], d);
        } else
          r[s] = l[s];
      !this.notNormalized.includes(i) && p != null && Object.keys(r).length && (r[p.key] = p.value);
      const t = 0 < Object.keys(r).length;
      let o = this.tableContent[i];
      if (t) {
        if (o == null && (o = []), m(o, r) || o.push(r), this.notNormalized.includes(i)) {
          const s = this.parent(i);
          if (s != null) {
            const M = g(s, i);
            let d = this.tableContent[M];
            d == null && (d = []);
            const C = {};
            C[this.refIdName(s)] = p.value;
            let I = D(r);
            I == null && (r.id = this.idSeq++, I = D(r)), C[this.refIdName(i)] = I.value, d.push(C), this.tableContent[M] = d;
          }
        }
        this.tableContent[i] = o;
      } else
        o == null && (this.tableContent[i] = []);
    }, this.duplicatesAndParents = function(i, l) {
      const p = '"' + i + '":' + JSON.stringify(l);
      let r = this.objCounts[p];
      r == null && (r = 0);
      let t = !1;
      for (let s in l)
        if (l[s] != null && typeof l[s] == "object") {
          let M = i;
          if (isNaN(s))
            M = s + v(l[s]);
          else if (!Array.isArray(l))
            continue;
          M != i && (this.child2parent[M] = i), this.duplicatesAndParents(M, l[s]), t = !0;
        }
      R(l) && !this.tableSignatures.includes(i) && this.tableSignatures.push(i), t || (this.objCounts[p] = r + 1), 1 < this.objCounts[p] && !this.notNormalized.includes(i) && this.notNormalized.push(i);
    }, this.parent = function(i) {
      let l = this.child2parent[i];
      return l != null && !this.tableSignatures.includes(l) ? this.parent(l) : l;
    }, this.tableName = function(i) {
      const l = i.indexOf("(");
      if (l < 0)
        return i;
      let p = i.substring(0, l), r = 0, t = -1;
      for (const o in this.tableSignatures) {
        const s = this.tableSignatures[o];
        s.substring(0, s.indexOf("(")) == p && r++, s == i && (t = r);
      }
      return r < 2 ? p : p + t;
    }, this.refIdName = function(i) {
      return W(this.tableName(i)) + "_id";
    };
  }
  return S;
}();
const Se = function() {
  function u(g, S, E, i) {
    this.from = S, this.to = E, E == null && (this.to = new m(S.line, S.depth + 1)), this.message = g, this.severity = i, i == null && (this.severity = "error");
  }
  function m(g, S) {
    this.line = g, this.depth = S;
  }
  function D(g) {
    const S = g, E = g.input;
    let i = [];
    E.split(`
`);
    let l = [];
    for (var p = 0; p < g.forest.length; p++)
      g.forest[p].parseType() == "table" && (l = l.concat(g.forest[p].descendants()));
    i = i.concat(v(l));
    const r = S.descendants();
    for (let t = 0; t < r.length; t++) {
      const o = r[t];
      if (S.optionEQvalue("genpk", !0) && r[t].parseName() == "id") {
        const d = o.content.toLowerCase().indexOf("id");
        i.push(new u(Y.duplicateId, new m(o.line, d), new m(o.line, d + 2)));
        continue;
      }
      const s = o.src[2];
      if (2 < o.src.length && s.value == "-") {
        const d = s.begin;
        i.push(new u(Y.invalidDatatype, new m(o.line, d), new m(o.line, d + 2)));
        continue;
      }
      const M = o.src[1];
      if (1 < o.src.length && M.value == "vc0") {
        const d = M.begin;
        i.push(new u(Y.invalidDatatype, new m(o.line, d)));
        continue;
      }
      i = i.concat(k(S, o)), i = i.concat(N(S, o)), i = i.concat(R(S, o));
    }
    return i;
  }
  function R(g, S) {
    const E = S.parseType() == "table";
    for (var i = [], l = S.src, p = !1, r = 1; r < l.length; r++) {
      if (l[r].value == "/") {
        p = !0;
        continue;
      }
      if (p) {
        p = !1, E && Me.indexOf(l[r].value.toLowerCase()) < 0 && i.push(new u(
          Y.tableDirectiveTypo,
          new m(S.line, l[r].begin),
          new m(S.line, l[r].begin + l[r].value.length)
        )), !E && Te.indexOf(l[r].value.toLowerCase()) < 0 && i.push(new u(
          Y.columnDirectiveTypo,
          new m(S.line, l[r].begin),
          new m(S.line, l[r].begin + l[r].value.length)
        ));
        continue;
      }
    }
    return i;
  }
  function k(g, S) {
    var E = [];
    if (S.parseType() == "view")
      for (var i = S.src, l = 2; l < i.length; l++) {
        var p = g.find(i[l].value);
        p == null && E.push(new u(
          Y.undefinedObject + i[l].value,
          new m(S.line, i[l].begin),
          new m(S.line, i[l].begin + i[l].value.length)
        ));
      }
    return E;
  }
  function N(g, S) {
    var E = [];
    if (S.isOption("fk") || 0 < S.indexOf("reference", !0)) {
      let l = S.indexOf("fk");
      if (l < 0 && (l = S.indexOf("reference")), l++, S.src.length - 1 < l || S.src[l].value == "/")
        return E;
      var i = g.find(S.src[l].value);
      i == null && E.push(new u(
        Y.undefinedObject + S.src[l].value,
        new m(S.line, S.src[l].begin),
        new m(S.line, S.src[l].begin + S.src[l].value.length)
      ));
    }
    return E;
  }
  function v(g) {
    for (var S = [], E = Ie(g), i = 1; i < g.length; i++) {
      var l = g[i], p = fe(l);
      p % E != 0 && S.push(
        new u(
          Y.misalignedAttribute + E,
          new m(l.line, p)
        )
      );
    }
    return S;
  }
  return D;
}(), Me = [
  "api",
  "audit",
  "auditcols",
  ,
  "check",
  "colprefix",
  "compress",
  "compressed",
  "insert",
  "rest",
  "unique",
  "uk",
  "pk",
  "cascade",
  "setnull"
  //'set null'
], Te = [
  "idx",
  "index",
  "indexed",
  "unique",
  "uk",
  "check",
  "constant",
  "default",
  "values",
  "upper",
  "lower",
  "nn",
  "not",
  "between",
  "references",
  "reference",
  "cascade",
  "setnull",
  "fk",
  "pk"
];
function Ie(u) {
  let m = [];
  for (var D = 0; D < u.length; D++) {
    var R = u[D];
    m[D] = fe(R);
  }
  let k = [];
  for (let v = 0; v < m.length; v++) {
    let g = Be(m, v);
    if (g != null) {
      let S = k[m[v] - m[g]];
      S == null && (S = 0), k[m[v] - m[g]] = S + 1;
    }
  }
  let N = null;
  for (let v in k)
    (N == null || k[N] <= k[v]) && (N = parseInt(v));
  return N;
}
function fe(u) {
  return u.src[0].begin;
}
function Be(u, m) {
  for (let D = m; 0 <= D; D--)
    if (u[D] < u[m])
      return D;
  return null;
}
const Y = {
  duplicateId: "Explicit ID column conflicts with genpk",
  invalidDatatype: "Invalid Datatype",
  undefinedObject: "Undefined Object: ",
  misalignedAttribute: "Misaligned Table or Column; apparent indent = ",
  tableDirectiveTypo: "Unknown Table directive",
  columnDirectiveTypo: "Unknown Column directive"
}, Pe = { findErrors: Se, messages: Y }, me = "identityDataType", ne = "guid", he = "Timestamp with time zone", de = "Timestamp with local time zone", j = function() {
  const u = {
    apex: { label: "APEX", value: "no", check: ["yes", "no"] },
    auditcols: { label: "Audit Columns", value: "no", check: ["yes", "no"] },
    createdcol: { label: "Created Column Name", value: "created" },
    createdbycol: { label: "Created By Column Name", value: "created_by" },
    updatedcol: { label: "Updated Column Name", value: "updated" },
    updatedbycol: { label: "Updated By Column Name", value: "updated_by" },
    boolean: { label: "Boolean Datatype", value: "not set", check: ["yn", "native"] },
    genpk: { label: "Auto Primary Key", value: "yes", check: ["yes", "no"] },
    semantics: { label: "Character Strings", value: "CHAR", check: ["BYTE", "CHAR", "Default"] },
    language: { label: "Data Language", value: "EN", check: ["EN", "JP", "KO"] },
    datalimit: { label: "Data Limit Rows", value: 1e4 },
    date: { label: "Date Data Type", value: "DATE", check: ["DATE", "TIMESTAMP", he, de] },
    db: { label: "Database Version", value: "not set" },
    dv: { label: "Duality View", value: "no", check: ["yes", "no"] },
    // switched default to 'no' until thorough development&testig
    drop: { label: "Include Drops", value: "no", check: ["yes", "no"] },
    editionable: { label: "Editinable", value: "no", check: ["yes", "no"] },
    inserts: { label: "Generate Inserts", value: !0, check: ["yes", "no"] },
    //longvc: {label: 'Longer Varchars', value:'yes',check:['yes','no']},    // not used, if a user specified the length, presumably he knows what he is doing
    //columnNamePrefix: "?",
    namelen: { label: "Name Character Length", value: 255 },
    overridesettings: { label: "Ignore toDDL() second parameter", value: "no", check: ["yes", "no"] },
    prefix: { label: "Object Prefix", value: "" },
    //ondelete: {label: 'On Delete', value:'Cascade',check:['restrict','cascade','set null']},
    pk: { label: "Primary Key Maintenance", value: ne, check: [me, ne, "SEQ", "NONE"] },
    prefixpkwithtname: { label: "Prefix primary keys with table name", value: "no", check: ["yes", "no"] },
    rowkey: { label: "Alphanumeric Row Identifier", value: "no", check: ["yes", "no"] },
    rowversion: { label: "Row Version Number", value: "no", check: ["yes", "no"] },
    schema: { label: "Schema", value: "" },
    api: { label: "Table API", value: "no", check: ["yes", "no"] },
    compress: { label: "Table Compression", value: "no", check: ["yes", "no"] }
    //"Auxiliary Columns": {label: "Auxiliary Columns", value:''}, // e.g. security_group_id integer
    //namecase: {label: 'Object and Field name convention', value:'canonic',check:['canonic','json']},
  };
  function m(R) {
    if (R == null)
      return null;
    let k = R;
    return typeof k == "string" && (k = k.toLowerCase()), k == "yes" ? !0 : k == "no" ? !1 : k == "y" ? !0 : k == "n" ? !1 : k == "true" ? !0 : k == "false" ? !1 : k == me.toLowerCase() ? "identity" : k == ne.toLowerCase() ? "guid" : k == he.toLowerCase() ? "tswtz" : k == de.toLowerCase() ? "tswltz" : k;
  }
  function D(R, k) {
    this.ddl = null, this.erd = null, this.errors = null, this.options = JSON.parse(JSON.stringify(u)), this.input = R, this.postponedAlters = [], this.getOptionValue = function(v) {
      const g = v.toLowerCase();
      let S = this.options[g];
      if (!(g in this.options))
        for (let E in this.options) {
          const i = this.options[E].label;
          if (i == null)
            continue;
          i.toLowerCase() == g && (S = this.options[E]);
        }
      return S == null ? null : S.value;
    }, this.optionEQvalue = function(v, g) {
      var S = this.getOptionValue(v);
      return m(S) == m(g);
    }, this.nonDefaultOptions = function() {
      let v = {};
      for (let g in this.options)
        u[g] && !this.optionEQvalue(g, u[g].value) && (v[g] = this.options[g].value);
      return v;
    }, this.unknownOptions = function() {
      let v = [];
      for (let g in this.options)
        u[g] == null && v.push(g);
      return v;
    }, this.setOptionValue = function(v, g) {
      let S = v.toLowerCase();
      if (!(S in this.options)) {
        for (let i in this.options)
          if (this.options[i].label == v) {
            this.options[i].value = g;
            return;
          }
      }
      g == null && (g = "");
      let E = this.options[S];
      E == null && (E = {}, this.options[S] = E), E.value = g;
    }, this.semantics = function() {
      var v = "";
      return this.optionEQvalue("semantics", "CHAR") ? v = " char" : this.optionEQvalue("semantics", "BYTE") && (v = " byte"), v;
    }, this.name2node = null, this.find = function(v) {
      if (this.name2node != null)
        return this.name2node[Q(v)];
      this.name2node = {};
      for (var g = 0; g < this.forest.length; g++)
        for (var S = this.forest[g].descendants(), E = 0; E < S.length; E++) {
          var i = S[E];
          this.name2node[i.parseName()] = i;
        }
      return this.name2node[Q(v)];
    }, this.setOptions = function(v) {
      v = v.trim(), v.startsWith("#") && (v = v.substring(1).trim());
      const g = v.indexOf("=");
      let S = v.substring(g + 1).trim();
      S.indexOf("{") < 0 && (S = "{" + v + "}");
      let E = "", i = Z(S, !0, !0, "");
      for (let p in i) {
        let r = i[p];
        r.type == "identifier" && r.value != "true" && r.value != "false" && r.value != "null" ? E += '"' + r.value + '"' : E += r.value;
      }
      let l = JSON.parse(E);
      for (let p in l)
        this.setOptionValue(p.toLowerCase(), l[p]);
    }, this.descendants = function() {
      for (var v = [], g = 0; g < this.forest.length; g++)
        v = v.concat(this.forest[g].descendants());
      return v;
    }, this.additionalColumns = function() {
      var v = [], g = this.getOptionValue("Auxiliary Columns");
      if (g == null)
        return v;
      for (var S = g.split(","), E = 0; E < S.length; E++) {
        var i = S[E].trim(), l = "VARCHAR2(4000)", p = i.indexOf(" ");
        0 < p && (l = i.substring(p + 1).toUpperCase(), i = i.substring(0, p)), v[i] = l;
      }
      return v;
    }, this.objPrefix = function(v) {
      var g = this.getOptionValue("schema");
      g == null && (g = ""), g != "" && v == null ? g = g + "." : g = "";
      var S = "";
      return this.getOptionValue("prefix") != null && (S = this.getOptionValue("prefix")), g = g + S, S != "" && !S.endsWith("_") && (g = g + "_"), g.toLowerCase();
    };
    let N = "";
    0 < R.toLowerCase().indexOf("overridesettings") && ue(this), k != null && this.optionEQvalue("overrideSettings", !1) && (N = "# settings = " + k + `

`), this.input = N + R, this.forest = ue(this), this.getERD = function() {
      if (this.erd != null)
        return this.erd;
      let v = this.descendants(), g = { items: [] };
      for (let r = 0; r < v.length; r++) {
        if (v[r].parseType() != "table")
          continue;
        let t = { name: this.objPrefix("no schema") + v[r].parseName("") }, o = this.getOptionValue("schema");
        o == "" && (o = null), t.schema = o, t.columns = [], g.items.push(t);
        let s = v[r].getGenIdColName();
        if (s != null && !v[r].isOption("pk"))
          t.columns.push({ name: s, datatype: "number" });
        else {
          let d = v[r].getExplicitPkName();
          if (d != null && d.indexOf(",") < 0) {
            let C = "number";
            const I = v[r].findChild(d);
            I != null && (C = I.parseType()), t.columns.push({ name: d, datatype: C });
          }
        }
        v[r].lateInitFks();
        for (let d in v[r].fks) {
          let C = v[r].fks[d];
          if (0 < d.indexOf(",")) {
            let w = this.find(C);
            for (var S = split_str(d, ", "), E = 0; E < S.length; E++) {
              var i = S[E];
              if (i == ",")
                continue;
              const F = w.findChild(i);
              t.columns.push({ name: i, datatype: F.parseType((G) => !0) });
            }
            continue;
          }
          let I = "number";
          const L = v[r].findChild(d);
          L != null && (I = L.parseType("fk"));
          let O = this.find(C);
          if (O != null) {
            const w = O.getExplicitPkName();
            w != null && w.indexOf(",") < 0 && (I = O.getPkType());
          } else
            O = this.find(d), O.isMany2One() & !d.endsWith("_id") && (C = d, d = singular(d));
          t.columns.push({ name: d, datatype: I });
        }
        for (let d = 0; d < v[r].children.length; d++) {
          let C = v[r].children[d];
          if (C.parseType() != "table" && C.refId() == null && (t.columns.push({ name: C.parseName(""), datatype: C.parseType((I) => !0) }), 0 < C.indexOf("file"))) {
            const I = C.parseName();
            t.columns.push({ name: I + "_filename", datatype: "varchar2(255" + this.semantics() + ")" }), t.columns.push({ name: I + "_mimetype", datatype: "varchar2(255" + this.semantics() + ")" }), t.columns.push({ name: I + "_charset", datatype: "varchar2(255" + this.semantics() + ")" }), t.columns.push({ name: I + "_lastupd", datatype: "date" });
          }
        }
        const M = v[r].trimmedContent().toUpperCase();
        if ((this.optionEQvalue("rowkey", !0) || 0 < M.indexOf("/ROWKEY")) && t.columns.push({ name: "row_key", datatype: "varchar2(30" + this.semantics() + ")" }), (this.optionEQvalue("rowVersion", "yes") || 0 < M.indexOf("/ROWVERSION")) && t.columns.push({ name: "row_version", datatype: "integer" }), this.optionEQvalue("Audit Columns", "yes") || 0 < M.indexOf("/AUDITCOLS")) {
          let d = this.getOptionValue("createdcol");
          t.columns.push({ name: d, datatype: this.getOptionValue("Date Data Type").toLowerCase() });
          let C = this.getOptionValue("createdbycol");
          t.columns.push({ name: C, datatype: "varchar2(255" + this.semantics() + ")" });
          let I = this.getOptionValue("updatedcol");
          t.columns.push({ name: I, datatype: this.getOptionValue("Date Data Type").toLowerCase() });
          let L = this.getOptionValue("updatedbycol");
          t.columns.push({ name: L, datatype: "varchar2(255" + this.semantics() + ")" });
        }
        var l = this.additionalColumns();
        for (let d in l) {
          var p = l[d];
          pad = tab + " ".repeat(this.maxChildNameLen() - d.length), ret += tab + d.toUpperCase() + pad + p + ` not null,
`;
        }
      }
      g.links = [];
      for (let r = 0; r < v.length; r++)
        if (v[r].parseType() == "table") {
          v[r].toDDL();
          for (let t in v[r].fks) {
            let o = v[r].fks[t], s = this.find(o);
            if (s == null)
              continue;
            let M = "id";
            s.getExplicitPkName() != null && (M = s.getExplicitPkName()), g.links.push({
              source: this.objPrefix() + o,
              source_id: M,
              target: this.objPrefix() + v[r].parseName(""),
              target_id: t
            });
          }
        }
      return this.erd = g, g;
    }, this.getDDL = function() {
      if (this.ddl != null)
        return this.ddl;
      var v = "", g = this.descendants();
      if (this.optionEQvalue("Include Drops", "yes"))
        for (let i = 0; i < g.length; i++) {
          let l = g[i].generateDrop();
          l != "" && (v += l);
        }
      if (this.optionEQvalue("rowkey", !0))
        v += `create sequence  row_key_seq;

`;
      else
        for (let i = 0; i < this.forest.length; i++)
          if (0 < this.forest[i].trimmedContent().toUpperCase().indexOf("/ROWKEY")) {
            v += `create sequence  row_key_seq;

`;
            break;
          }
      v += `-- create tables

`;
      for (let i = 0; i < this.forest.length; i++)
        v += this.forest[i].toDDL() + `
`;
      for (let i = 0; i < this.postponedAlters.length; i++)
        v += this.postponedAlters[i] + `
`;
      let S = 0;
      for (let i = 0; i < g.length; i++) {
        let l = g[i].generateTrigger();
        l != "" && (S++ == 0 && (v += `-- triggers
`), v += l + `
`);
      }
      S = 0;
      for (let i = 0; i < g.length; i++) {
        let l = g[i].restEnable();
        l != "" && (v += l + `
`);
      }
      S = 0;
      for (let i = 0; i < g.length; i++) {
        if (this.optionEQvalue("api", !1) && g[i].trimmedContent().toLowerCase().indexOf("/api") < 0)
          continue;
        let l = g[i].generateTAPI();
        l != "" && (S++ == 0 && (v += `-- APIs
`), v += l + `
`);
      }
      S = 0;
      for (let i = 0; i < this.forest.length; i++) {
        let l = this.forest[i].generateView();
        l != "" && (S++ == 0 && (v += `-- create views
`), v += l + `
`);
      }
      S = 0;
      for (let i = 0; i < this.forest.length; i++) {
        let l = this.forest[i].generateData(this.data);
        l != "" && (S++ == 0 && (v += `-- load data

`), v += l + `
`);
      }
      S = 0, v += `-- Generated by Quick SQL ${this.version()} ` + (/* @__PURE__ */ new Date()).toLocaleString() + `

`, v += `/*
`;
      let E = R;
      E = E.replace(/#.+/g, `
`), E = E.replace(/\/\*/g, "--<--"), E = E.replace(/\*\//g, "-->--"), E = E.replace(/\/* Non-default options:/g, ""), v += E, v += `
`;
      for (let i = 0; i < this.unknownOptions().length; i++)
        v += "*** Unknown setting: " + this.unknownOptions()[i] + `
`;
      return v += `
 Non-default options:
# settings = ` + JSON.stringify(this.nonDefaultOptions()) + `
`, v += `
*/`, this.ddl = v, v;
    }, this.getErrors = function() {
      return this.errors != null ? this.errors : (this.errors = Pe.findErrors(this, this.fullInput), this.errors);
    }, this.version = oe;
  }
  return D;
}();
function ke(u, m) {
  return ye(u, m);
}
function Ee(u, m) {
  return new j(u, m).getERD();
}
function Le(u, m) {
  return new j(u, m).getDDL();
}
function Ne(u, m) {
  return new j(u, m).getErrors();
}
function oe() {
  return "1.2.13";
}
j.version = oe;
j.toDDL = Le;
j.toERD = Ee;
j.toErrors = Ne;
j.fromJSON = ke;
j.lexer = Z;
export {
  j as default,
  ke as fromJSON,
  oe as qsql_version,
  j as quicksql,
  Le as toDDL,
  Ee as toERD,
  Ne as toErrors
};

/* ============================================================
   Sprout Studio — interactions (vanilla JS; GSAP optional)
   Everything here is progressive enhancement: with JS off or
   failing, all content is already visible in the HTML.
   ============================================================ */
(function () {
  "use strict";

  var doc = document;
  var reduceMQ = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  function reduced() { return !!(reduceMQ && reduceMQ.matches); }
  function $(id) { return doc.getElementById(id); }

  var MORSE = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
    K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
    "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----"
  };
  var REV = {};
  Object.keys(MORSE).forEach(function (k) { REV[MORSE[k]] = k; });

  function symbolEl(sym, ghost) {
    var s = doc.createElement("span");
    s.className = sym === "." ? "m-dot" : "m-dash";
    if (ghost) s.classList.add("m-ghost");
    return s;
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = $("menuToggle");
  var nav = $("primaryNav");
  function closeMenu(focusBack) {
    if (!nav || !menuToggle) return;
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (focusBack) menuToggle.focus();
  }
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(false); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) closeMenu(true);
    });
    doc.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !e.target.closest("#primaryNav") && !e.target.closest("#menuToggle")) closeMenu(false);
    });
  }

  /* ---------- Radio dial: current section ---------- */
  var sections = Array.prototype.slice.call(doc.querySelectorAll("[data-freq]"));
  var dialFreq = $("dialFreq");
  var needle = $("dialNeedle");
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll(".nav-link"));
  function setCurrent(sec) {
    var idx = sec ? sections.indexOf(sec) : -1;
    var freq = sec ? sec.getAttribute("data-freq") : "00.00";
    if (dialFreq) {
      if (window.gsap && !reduced()) {
        var from = { v: parseFloat(dialFreq.textContent) || 0 };
        window.gsap.to(from, {
          v: parseFloat(freq), duration: 0.45, ease: "steps(9)",
          onUpdate: function () { dialFreq.textContent = (from.v < 10 ? "0" : "") + from.v.toFixed(2); }
        });
      } else {
        dialFreq.textContent = freq;
      }
    }
    if (needle) needle.style.left = idx < 0 ? "0%" : "calc(" + ((idx + 1) / (sections.length + 1)) * 100 + "% - 2px)";
    navLinks.forEach(function (a) {
      var on = sec && a.getAttribute("href") === "#" + sec.id;
      a.classList.toggle("is-current", !!on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  if ("IntersectionObserver" in window && sections.length) {
    var heroEl = $("top");
    var current = null;
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var s = en.target === heroEl ? null : en.target;
          if (s !== current) { current = s; setCurrent(s); }
        }
      });
    }, { rootMargin: "-45% 0px -54% 0px" });
    sections.forEach(function (s) { secIO.observe(s); });
    if (heroEl) secIO.observe(heroEl);
  }

  /* ---------- Hero: Morse signal decodes to WAR IN THE DARK ---------- */
  (function hero() {
    var morseBox = $("heroMorse");
    var out = $("heroDecoded");
    var lamp = $("heroLamp");
    var replay = $("heroReplay");
    var stamp = doc.querySelector(".stamp--decoded");
    if (!morseBox || !out) return;
    var TEXT = "WAR IN THE DARK";
    var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&?";
    var timers = [];
    var letterEls = [];
    var symEls = [];

    function build() {
      morseBox.textContent = "";
      symEls = [];
      TEXT.split("").forEach(function (ch, i) {
        if (ch === " ") { var w = doc.createElement("span"); w.className = "m-word"; morseBox.appendChild(w); symEls.push(null); return; }
        var grp = [];
        MORSE[ch].split("").forEach(function (sym) { var el = symbolEl(sym, true); morseBox.appendChild(el); grp.push(el); });
        var g = doc.createElement("span"); g.className = "m-gap"; morseBox.appendChild(g);
        symEls.push(grp);
      });
      out.textContent = "";
      letterEls = TEXT.split("").map(function (ch) {
        var s = doc.createElement("span");
        s.textContent = ch === " " ? " " : "_";
        out.appendChild(s);
        return s;
      });
    }
    function finish() {
      clear();
      morseBox.querySelectorAll(".m-ghost").forEach(function (el) { el.classList.remove("m-ghost"); });
      letterEls.forEach(function (s, i) { s.textContent = TEXT[i]; });
      if (lamp) lamp.classList.remove("on");
      if (stamp) {
        stamp.classList.remove("is-hidden");
        if (window.gsap && !reduced()) window.gsap.from(stamp, { scale: 1.8, autoAlpha: 0, duration: 0.35, ease: "steps(5)" });
      }
      if (replay && !reduced()) replay.hidden = false;
    }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function at(ms, fn) { timers.push(setTimeout(fn, ms)); }

    function run() {
      clear();
      build();
      if (stamp) stamp.classList.add("is-hidden");
      if (replay) replay.hidden = true;
      var U = 50, t = 400;
      TEXT.split("").forEach(function (ch, i) {
        if (ch === " ") { t += U * 4; return; }
        var startT = t;
        // scramble while this letter is "on the wire"
        at(startT, function () {
          var k = 0;
          var iv = setInterval(function () {
            letterEls[i].textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
            if (++k > 40) clearInterval(iv);
          }, 60);
          letterEls[i]._iv = iv;
        });
        MORSE[ch].split("").forEach(function (sym, j) {
          var len = sym === "." ? U : U * 3;
          at(t, function () { if (lamp) lamp.classList.add("on"); var el = symEls[i][j]; if (el) el.classList.remove("m-ghost"); });
          t += len;
          at(t, function () { if (lamp) lamp.classList.remove("on"); });
          t += U;
        });
        t += U * 2;
        at(t, function () { clearInterval(letterEls[i]._iv); letterEls[i].textContent = ch; });
      });
      at(t + 200, finish);
    }

    build();
    if (reduced()) { finish(); }
    else { run(); }
    if (replay) replay.addEventListener("click", function () { run(); });
    if (reduceMQ && reduceMQ.addEventListener) reduceMQ.addEventListener("change", function () { if (reduced()) finish(); });
    doc.addEventListener("visibilitychange", function () { if (doc.hidden && timers.length) finish(); });
  })();

  /* ---------- Trailer facade (loads YouTube only on click) ---------- */
  (function trailer() {
    var a = $("trailer");
    if (!a) return;
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("data-yt");
      if (!id) return;
      e.preventDefault();
      var frame = doc.createElement("div");
      frame.className = "trailer-frame";
      var ifr = doc.createElement("iframe");
      ifr.src = "https://www.youtube-nocookie.com/embed/" + id + "?rel=0&autoplay=1";
      ifr.title = a.getAttribute("data-title") || "Trailer";
      ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      ifr.referrerPolicy = "strict-origin-when-cross-origin";
      ifr.allowFullscreen = true;
      frame.appendChild(ifr);
      a.parentNode.replaceChild(frame, a);
      ifr.focus();
    });
  })();

  /* ---------- Steam widget: inject the official iframe only when it nears the viewport ---------- */
  (function steam() {
    var slot = $("steamSlot");
    if (!slot) return;
    function load() {
      if (slot.classList.contains("is-loaded")) return;
      var ifr = doc.createElement("iframe");
      ifr.src = slot.getAttribute("data-src");
      ifr.width = "646"; ifr.height = "190";
      ifr.title = slot.getAttribute("data-title") || "Steam";
      ifr.setAttribute("loading", "lazy");
      slot.textContent = "";
      slot.appendChild(ifr);
      slot.classList.add("is-loaded");
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) {
        if (en.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
      }, { rootMargin: "300px 0px" });
      io.observe(slot);
    } else { load(); }
  })();

  /* ---------- Morse mini demo ---------- */
  (function demo() {
    var root = $("demo");
    var key = $("demoKey");
    if (!root || !key) return;
    var morseOut = $("demoMorse");
    var textOut = $("demoText");
    var status = $("demoStatus");
    var clearBtn = $("demoClear");
    var soundBtn = $("demoSound");
    var stamp = $("demoStamp");
    var DASH_MS = 200, LETTER_MS = 650, WORD_MS = 1500;
    var symbols = "", text = "", downAt = 0, isDown = false, tLetter = 0, tWord = 0;
    var audio = null, osc = null, gain = null, soundOn = false;

    key.disabled = false; clearBtn.disabled = false; soundBtn.disabled = false;
    status.textContent = root.getAttribute("data-msg-idle") || "";

    function renderMorse() {
      morseOut.textContent = "";
      if (!symbols) { morseOut.textContent = "—"; return; }
      symbols.split("").forEach(function (s) { morseOut.appendChild(symbolEl(s, false)); });
    }
    function renderText() { textOut.textContent = text || "\u00a0"; }
    function tone(on) {
      if (!soundOn) return;
      try {
        if (!audio) {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return;
          audio = new AC();
          gain = audio.createGain(); gain.gain.value = 0; gain.connect(audio.destination);
          osc = audio.createOscillator(); osc.type = "square"; osc.frequency.value = 620; osc.connect(gain); osc.start();
        }
        if (audio.state === "suspended") audio.resume();
        gain.gain.setTargetAtTime(on ? 0.06 : 0, audio.currentTime, 0.005);
      } catch (e) {}
    }
    function commitLetter() {
      if (!symbols) return;
      text += REV[symbols] || "?";
      if (text.length > 24) text = text.slice(-24);
      symbols = "";
      renderMorse(); renderText();
      if (/SOS$/.test(text.replace(/ /g, ""))) {
        status.textContent = root.getAttribute("data-msg-ok") || "OK";
        if (stamp) {
          stamp.hidden = false;
          if (window.gsap && !reduced()) window.gsap.from(stamp, { scale: 1.8, autoAlpha: 0, duration: 0.3, ease: "steps(5)" });
        }
      }
    }
    function addSpace() { if (text && text.slice(-1) !== " ") { text += " "; renderText(); } }
    function press() {
      if (isDown) return;
      isDown = true; downAt = performance.now();
      clearTimeout(tLetter); clearTimeout(tWord);
      key.classList.add("is-down"); tone(true);
    }
    function release() {
      if (!isDown) return;
      isDown = false;
      var dur = performance.now() - downAt;
      key.classList.remove("is-down"); tone(false);
      symbols += dur < DASH_MS ? "." : "-";
      if (symbols.length > 6) symbols = symbols.slice(-6);
      renderMorse();
      tLetter = setTimeout(commitLetter, LETTER_MS);
      tWord = setTimeout(addSpace, WORD_MS);
    }
    key.addEventListener("keydown", function (e) {
      if (e.code === "Space" || e.key === " ") { e.preventDefault(); if (!e.repeat) press(); }
    });
    key.addEventListener("keyup", function (e) {
      if (e.code === "Space" || e.key === " ") { e.preventDefault(); release(); }
    });
    key.addEventListener("click", function (e) { e.preventDefault(); });
    key.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      e.preventDefault(); key.focus();
      try { key.setPointerCapture(e.pointerId); } catch (err) {}
      press();
    });
    key.addEventListener("pointerup", release);
    key.addEventListener("pointercancel", release);
    key.addEventListener("blur", release);
    key.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    clearBtn.addEventListener("click", function () {
      clearTimeout(tLetter); clearTimeout(tWord);
      symbols = ""; text = ""; renderMorse(); renderText();
      if (stamp) stamp.hidden = true;
      status.textContent = root.getAttribute("data-msg-idle") || "";
      key.focus();
    });
    soundBtn.addEventListener("click", function () {
      soundOn = !soundOn;
      soundBtn.setAttribute("aria-pressed", String(soundOn));
      status.textContent = root.getAttribute(soundOn ? "data-msg-sound-on" : "data-msg-sound-off") || "";
      if (!soundOn) tone(false);
    });
    renderMorse();
  })();

  /* ---------- Scroll reveals with GSAP (optional) ---------- */
  function initReveal() {
    var gsap = window.gsap;
    if (!gsap || reduced() || !("IntersectionObserver" in window)) return;
    var els = Array.prototype.slice.call(doc.querySelectorAll("[data-anim]"));
    var vh = window.innerHeight || 800;
    // Only hide elements that are below the fold, so nothing visible ever blinks out
    var pending = els.filter(function (el) { return el.getBoundingClientRect().top > vh * 0.9; });
    pending.forEach(function (el) {
      if (el.getAttribute("data-anim") === "head") {
        gsap.set(el, { opacity: 0 });
        var st = el.querySelector(".stamp");
        if (st) gsap.set(st, { opacity: 0, scale: 1.8 });
      } else {
        gsap.set(el, { opacity: 0, y: 32 });
      }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        // reveal when visible, or when it was skipped past (e.g. anchor jump) so nothing stays hidden above
        if (!en.isIntersecting && en.boundingClientRect.top > 0) return;
        var el = en.target;
        io.unobserve(el);
        if (el.getAttribute("data-anim") === "head") {
          var tl = gsap.timeline();
          tl.to(el, { opacity: 1, duration: 0.3, ease: "steps(3)" });
          var st = el.querySelector(".stamp");
          if (st) tl.to(st, { opacity: 1, scale: 1, duration: 0.3, ease: "steps(4)" }, "-=0.05");
        } else {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "steps(6)" });
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    pending.forEach(function (el) { io.observe(el); });
    // Opacity (not visibility) keeps hidden items focusable; reveal at once when keyboard focus lands inside
    doc.addEventListener("focusin", function (e) {
      var host = e.target.closest && e.target.closest("[data-anim]");
      if (host && pending.indexOf(host) !== -1) {
        io.unobserve(host);
        gsap.set(host, { opacity: 1, y: 0 });
        var st = host.querySelector(".stamp");
        if (st) gsap.set(st, { opacity: 1, scale: 1 });
      }
    });
    // Safety net: never leave content hidden (e.g. print, odd scrolling)
    window.addEventListener("beforeprint", function () { gsap.set(pending, { clearProps: "all" }); });
  }
  if (window.gsap) initReveal();
  else window.addEventListener("load", initReveal);
})();

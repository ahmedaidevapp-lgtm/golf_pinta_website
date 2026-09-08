/* ═══════════════════════════════════════════════════════════
   Golf with Pinta — site behaviour
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var WHATSAPP = '212665602209';

  function stampYear() {
    var yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ── conditions strip height → nav offset ──────────────────
     The strip is fixed-position and its height varies with wrapping, so the
     nav's top offset is measured rather than assumed. */
  var cond = document.querySelector('.cond');
  function measureCond() {
    if (!cond) return;
    document.documentElement.style.setProperty('--cond-h', cond.offsetHeight + 'px');
  }
  measureCond();
  window.addEventListener('resize', measureCond);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureCond);

  /* ── hero video: wide screens only ─────────────────────────
     The clip is ~18 MB. On a phone that is a costly download for a
     background loop, so the source is attached only when the viewport is
     wide, motion is welcome and the visitor is not on Save-Data. The poster
     (declared on the element, and repeated as a CSS background) stands in
     everywhere else. */
  var heroVid = document.querySelector('.hero-video[data-src]');
  if (heroVid) {
    var conn = navigator.connection || {};
    var wide = window.matchMedia('(min-width:761px)').matches;
    var calm = !window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (wide && calm && !conn.saveData) {
      var src = document.createElement('source');
      src.src = heroVid.dataset.src;
      src.type = 'video/mp4';
      heroVid.appendChild(src);
      heroVid.load();
    } else {
      heroVid.remove();
    }
  }

  /* ── diaporama plein écran ─────────────────────────────────
     Crossfading full-screen slideshow above the hero. Each slide names its
     photo in data-src; the file is probed and swapped in only once it loads,
     so a missing stage-0N.jpg leaves the CSS poster fallback in place.
     Auto-advance pauses on hover, on focus, off-tab and under
     prefers-reduced-motion. */
  var stage = document.querySelector('.stage');
  if (stage) {
    var slides = [].slice.call(stage.querySelectorAll('.slide'));
    var dotsBox = document.getElementById('stage-dots');
    var HOLD = 6500;
    var idx = 0, timer = null, paused = false;
    var still = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    // real photos in, placeholders out — one probe per slide
    slides.forEach(function (sl) {
      if (!sl.dataset.src) return;
      var probe = new Image();
      probe.onload = function () {
        sl.querySelector('.slide-bg').style.backgroundImage = 'url("' + sl.dataset.src + '")';
      };
      probe.src = sl.dataset.src;
    });

    var dots = slides.map(function (sl, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'stage-dot';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Photo ' + (i + 1) + ' sur ' + slides.length);
      b.appendChild(document.createElement('i'));
      b.addEventListener('click', function () { show(i, true); });
      dotsBox.appendChild(b);
      return b;
    });

    function show(i, manual) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (sl, n) {
        sl.classList.toggle('is-on', n === idx);
        sl.setAttribute('aria-hidden', n === idx ? 'false' : 'true');
      });
      dots.forEach(function (d, n) {
        // restarting the progress bar needs the transition off for one frame
        d.classList.add('jump');
        d.setAttribute('aria-selected', n === idx ? 'true' : 'false');
      });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          dots.forEach(function (d) { d.classList.remove('jump'); });
        });
      });
      if (manual) restart();
    }

    function tick() { show(idx + 1); }
    function restart() {
      clearInterval(timer);
      if (!still && !paused) timer = setInterval(tick, HOLD);
    }

    stage.style.setProperty('--stage-hold', (HOLD / 1000) + 's');

    dotsBox.parentNode.addEventListener('click', function (e) {
      var arw = e.target.closest('[data-stage]');
      if (arw) show(idx + (arw.dataset.stage === 'next' ? 1 : -1), true);
    });

    stage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1, true); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1, true); }
    });

    ['mouseenter', 'focusin'].forEach(function (ev) {
      stage.addEventListener(ev, function () { paused = true; clearInterval(timer); });
    });
    ['mouseleave', 'focusout'].forEach(function (ev) {
      stage.addEventListener(ev, function () { paused = false; restart(); });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else restart();
    });

    show(0);
    restart();
  }

  /* ── sticky nav ────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('on', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── mobile drawer ─────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  function setDrawer(open) {
    drawer.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('locked', open);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setDrawer(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        setDrawer(false);
        burger.focus();
      }
    });
    // a resize past the breakpoint should not leave the page scroll-locked
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && drawer.classList.contains('open')) setDrawer(false);
    });
  }

  /* ── menu déroulant « Académie » ────────────────────────
     Le survol suffit à la souris (CSS). Ce bloc ajoute le clic et le
     clavier : utile au tactile, où il n'y a pas de survol, et à toute
     personne qui navigue au Tab puis à Entrée. */
  var drops = [].slice.call(document.querySelectorAll('.nav-drop'));
  if (drops.length) {
    var closeDrops = function (except) {
      drops.forEach(function (d) {
        if (d === except) return;
        d.classList.remove('open');
        var t = d.querySelector('.nav-drop-t');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    };
    drops.forEach(function (d) {
      var trig = d.querySelector('.nav-drop-t');
      if (!trig) return;
      trig.addEventListener('click', function (e) {
        e.preventDefault();
        var open = !d.classList.contains('open');
        closeDrops(d);
        d.classList.toggle('open', open);
        trig.setAttribute('aria-expanded', String(open));
      });
      d.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || !d.classList.contains('open')) return;
        d.classList.remove('open');
        trig.setAttribute('aria-expanded', 'false');
        trig.focus();
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-drop')) closeDrops(null);
    });
    // le panneau ne doit pas rester ouvert derrière la page qui défile
    window.addEventListener('scroll', function () { closeDrops(null); }, { passive: true });
  }

  /* ── photo frames ──────────────────────────────────────────
     Each .photo carries data-src / data-alt. If that file exists in
     assets/images/ it is swapped in; otherwise the on-brand placeholder
     stays. Drop real photos in and they appear — no code change. */
  document.querySelectorAll('.photo[data-src]').forEach(function (fig) {
    var probe = new Image();
    probe.onload = function () {
      var img = document.createElement('img');
      img.src = fig.dataset.src;
      img.alt = fig.dataset.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      fig.appendChild(img);
      var ph = fig.querySelector('.ph');
      if (ph) ph.remove();
    };
    probe.src = fig.dataset.src;
  });

  /* ── scroll reveal ─────────────────────────────────────── */
  var reveals = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── scroll spy ────────────────────────────────────────── */
  var links = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        document.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.remove('act'); });
        document.querySelectorAll('.nav-drop-t').forEach(function (t) { t.classList.remove('act'); });
        var hit = links[e.target.id];
        if (!hit) return;
        hit.classList.add('act');
        // une entrée du menu déroulant est repliée : c'est le déclencheur qui doit s'allumer
        var host = hit.closest('.nav-drop');
        if (host) {
          var t = host.querySelector('.nav-drop-t');
          if (t) t.classList.add('act');
        }
      });
    }, { threshold: 0.35 });
    ['top', 'apropos', 'parcours', 'evenements', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ── course rows prefill the booking form ──────────────── */
  var select = document.getElementById('f-parcours');
  if (select) {
    document.querySelectorAll('[data-course]').forEach(function (el) {
      el.addEventListener('click', function () {
        var want = el.dataset.course;
        Array.prototype.some.call(select.options, function (o) {
          if (o.value === want || o.text === want) { select.value = o.value || o.text; return true; }
          return false;
        });
        select.closest('.fld').classList.remove('err');
      });
    });
  }

  /* ── coach profile dialog (coachs.html) ────────────────────
     Each .coach button carries its own copy in data-* attributes, so a
     coach is edited in the markup alone — no JS change. data-bio holds one
     paragraph per '|'-separated chunk. */
  var cdlg = document.getElementById('cdlg');
  if (cdlg) {
    var cRole = document.getElementById('cdlg-role');
    var cName = document.getElementById('cdlg-name');
    var cCity = document.getElementById('cdlg-city');
    var cBio  = document.getElementById('cdlg-bio');
    var cBox  = cdlg.querySelector('.cdlg-box');
    var cX    = cdlg.querySelector('.cdlg-x');
    var opener = null;

    function closeCoach() {
      cdlg.classList.remove('open');
      cdlg.hidden = true;
      document.body.classList.remove('locked');
      if (opener) {
        opener.setAttribute('aria-expanded', 'false');
        opener.focus();
        opener = null;
      }
    }

    function openCoach(card) {
      var d = card.dataset;
      cRole.textContent = d.role || '';
      cName.textContent = d.name || '';
      cCity.textContent = d.city || '';
      cBio.textContent = '';
      (d.bio || '').split('|').forEach(function (para) {
        if (!para.trim()) return;
        var p = document.createElement('p');
        p.textContent = para.trim();
        cBio.appendChild(p);
      });

      opener = card;
      card.setAttribute('aria-expanded', 'true');
      cdlg.hidden = false;
      cdlg.classList.add('open');
      document.body.classList.add('locked');
      cBox.scrollTop = 0;
      cX.focus();
    }

    document.querySelectorAll('.coach').forEach(function (card) {
      card.setAttribute('aria-expanded', 'false');
      card.addEventListener('click', function () { openCoach(card); });
    });

    cdlg.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) closeCoach();
    });

    document.addEventListener('keydown', function (e) {
      if (!cdlg.classList.contains('open')) return;
      if (e.key === 'Escape') { closeCoach(); return; }
      // keep tabbing inside the dialog while it is open
      if (e.key !== 'Tab') return;
      var f = cBox.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ── grille tarifaire (tarifs.html) ────────────────────────
     Each .prow carries its four prices in data-p, in the order
     adulte-unité, adulte-pack, junior-unité, junior-pack. The segments only
     pick a column, so a price is edited in the markup alone — no JS change. */
  var pctl = document.getElementById('pctl');
  if (pctl) {
    var pnote = document.getElementById('pctl-note');
    var prows = document.querySelectorAll('.prow[data-p]');

    function fmt(n) {
      return Math.round(n).toLocaleString('fr-FR');
    }
    // an exact split is stated as such; a rounded one is flagged
    function split(total, parts) {
      var each = total / parts;
      return (Number.isInteger(each) ? '' : '≈ ') + fmt(each);
    }

    function paint() {
      var junior = document.getElementById('who-j').checked;
      var pack = document.getElementById('form-p').checked;
      var col = (junior ? 2 : 0) + (pack ? 1 : 0);

      prows.forEach(function (row) {
        var price = parseInt(row.dataset.p.split(/\s+/)[col], 10);
        var group = parseInt(row.dataset.g, 10) || 1;
        row.querySelector('.amt').textContent = fmt(price);

        var bits = [];
        if (pack) bits.push(fmt(price / 10) + ' MAD la séance');
        if (group > 1) {
          // in a pack the per-séance figure is already stated, so the split
          // that follows it needs no second unit
          bits.push(split(pack ? price / 10 : price, group) + (pack ? ' / joueur' : ' MAD / joueur'));
        }
        row.querySelector('.per').textContent = bits.join(' · ');
      });

      if (pnote) {
        pnote.textContent = pack
          ? 'Prix du pack de 10 séances, en dirhams (MAD).'
          : 'Prix d\'une séance, en dirhams (MAD).';
      }
    }

    pctl.addEventListener('change', paint);
    paint();
  }

  /* ── galerie groupes (groupes.html) ────────────────────────
     Crossfading photo strip. Each .gs names its file in data-src; the file is
     probed and swapped in only once it loads, so a missing group-0N.jpg
     leaves the on-brand placeholder in place. Auto-advance pauses on hover,
     on focus, off-tab and under prefers-reduced-motion. */
  var gal = document.getElementById('gal');
  if (gal) {
    var gShots = [].slice.call(gal.querySelectorAll('.gs'));
    var gDotsBox = document.getElementById('gal-dots');
    var gCount = document.getElementById('gal-count');
    var G_HOLD = 5500;
    var gIdx = 0, gTimer = null, gPaused = false;
    var gStill = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    gShots.forEach(function (sh) {
      if (!sh.dataset.src) return;
      var probe = new Image();
      probe.onload = function () {
        sh.querySelector('.gs-bg').style.backgroundImage = 'url("' + sh.dataset.src + '")';
        sh.classList.add('has-img');
      };
      probe.src = sh.dataset.src;
    });

    var gDots = gShots.map(function (sh, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'gal-dot';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Photo ' + (i + 1) + ' sur ' + gShots.length);
      b.addEventListener('click', function () { gShow(i, true); });
      gDotsBox.appendChild(b);
      return b;
    });

    function gShow(i, manual) {
      gIdx = (i + gShots.length) % gShots.length;
      gShots.forEach(function (sh, n) {
        sh.classList.toggle('is-on', n === gIdx);
        sh.setAttribute('aria-hidden', n === gIdx ? 'false' : 'true');
      });
      gDots.forEach(function (d, n) {
        d.setAttribute('aria-selected', n === gIdx ? 'true' : 'false');
      });
      if (gCount) gCount.textContent = (gIdx + 1) + ' / ' + gShots.length;
      if (manual) gRestart();
    }

    function gRestart() {
      clearInterval(gTimer);
      if (!gStill && !gPaused) gTimer = setInterval(function () { gShow(gIdx + 1); }, G_HOLD);
    }

    gal.addEventListener('click', function (e) {
      var arw = e.target.closest('[data-gal]');
      if (arw) gShow(gIdx + (arw.dataset.gal === 'next' ? 1 : -1), true);
    });

    gal.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); gShow(gIdx + 1, true); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); gShow(gIdx - 1, true); }
    });

    ['mouseenter', 'focusin'].forEach(function (ev) {
      gal.addEventListener(ev, function () { gPaused = true; clearInterval(gTimer); });
    });
    ['mouseleave', 'focusout'].forEach(function (ev) {
      gal.addEventListener(ev, function () { gPaused = false; gRestart(); });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(gTimer); else gRestart();
    });

    gShow(0);
    gRestart();
  }

  /* ── demande groupes (groupes.html) ────────────────────────
     No backend: the enquiry is posted to FormSubmit, which relays it by
     e-mail to ENQUIRY_EMAIL. FormSubmit sends a one-time confirmation link to
     that address on the very first submission — until someone clicks it,
     nothing is delivered. Swapping in another relay (Formspree, EmailJS, a
     small function of your own) is a one-line change to ENQUIRY_ENDPOINT.
     If the request fails for any reason, the composed enquiry is handed to
     the visitor's own mail client so a filled-in form is never lost. */
  var ENQUIRY_EMAIL = 'golfwithpinta@gmail.com';
  var ENQUIRY_ENDPOINT = 'https://formsubmit.co/ajax/' + ENQUIRY_EMAIL;

  var enq = document.getElementById('enquiry');
  if (enq) {
    var enqOk = document.getElementById('enq-ok');
    var enqOkTx = document.getElementById('enq-ok-tx');
    var enqSend = document.getElementById('enq-send');
    var E_MAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    var E_TEL_RE = /^[+()\d][\d\s().-]{6,}$/;

    var eType = document.getElementById('e-type');
    // the two package buttons drop the visitor at the form with the right
    // formule already chosen
    document.querySelectorAll('[data-offer]').forEach(function (el) {
      el.addEventListener('click', function () {
        var want = el.dataset.offer;
        Array.prototype.some.call(eType.options, function (o) {
          if (o.text === want) { eType.value = o.value || o.text; return true; }
          return false;
        });
        eType.closest('.fld').classList.remove('err');
      });
    });

    function eMark(input, bad) {
      input.closest('.fld').classList.toggle('err', bad);
      input.setAttribute('aria-invalid', bad ? 'true' : 'false');
      return !bad;
    }

    function eVal(id) { return (document.getElementById(id).value || '').trim(); }

    function eValidate() {
      var org = document.getElementById('e-org'), nom = document.getElementById('e-nom');
      var mail = document.getElementById('e-mail'), tel = document.getElementById('e-tel');
      var type = document.getElementById('e-type'), nb = document.getElementById('e-nb');
      var n = parseInt(nb.value, 10);
      return [
        eMark(org, org.value.trim().length < 2),
        eMark(nom, nom.value.trim().length < 2),
        eMark(mail, !E_MAIL_RE.test(mail.value.trim())),
        eMark(tel, tel.value.trim() !== '' && !E_TEL_RE.test(tel.value.trim())),
        eMark(type, type.value === ''),
        eMark(nb, !(n >= 1 && n <= 500))
      ].every(Boolean);
    }

    enq.querySelectorAll('input, select, textarea').forEach(function (el) {
      ['input', 'change'].forEach(function (ev) {
        el.addEventListener(ev, function () { el.closest('.fld').classList.remove('err'); });
      });
    });

    // one shape for both paths: the POST body and the mailto fallback read
    // from the same list, so they can never drift apart
    function enquiryLines() {
      var lines = [
        'Établissement / société : ' + eVal('e-org'),
        'Contact : ' + eVal('e-nom'),
        'E-mail : ' + eVal('e-mail')
      ];
      if (eVal('e-tel'))  lines.push('Téléphone : ' + eVal('e-tel'));
      lines.push('Type de groupe : ' + document.getElementById('e-type').value);
      lines.push('Participants : ' + eVal('e-nb'));
      if (eVal('e-date')) lines.push('Date souhaitée : ' + eVal('e-date'));
      if (document.getElementById('e-lieu').value) lines.push('Lieu : ' + document.getElementById('e-lieu').value);
      if (eVal('e-msg'))  lines.push('', 'Projet :', eVal('e-msg'));
      return lines;
    }

    function mailFallback() {
      var body = ['Demande groupes & offsite — Golf with Pinta', ''].concat(enquiryLines()).join('\n');
      var href = 'mailto:' + ENQUIRY_EMAIL
        + '?subject=' + encodeURIComponent('Demande groupes & offsite — ' + eVal('e-org'))
        + '&body=' + encodeURIComponent(body);
      window.location.href = href;
      enqOkTx.textContent = 'Demande prête dans votre logiciel de messagerie — terminez l\'envoi, ou écrivez-nous au +212 665 602 209.';
      enqOk.classList.add('show');
    }

    enq.addEventListener('submit', function (e) {
      e.preventDefault();
      enqOk.classList.remove('show');

      if (!eValidate()) {
        var firstBad = enq.querySelector('.fld.err input, .fld.err select');
        if (firstBad) firstBad.focus();
        return;
      }

      var label = enqSend.innerHTML;
      enqSend.disabled = true;
      enqSend.textContent = 'Envoi…';

      var payload = {
        _subject: 'Demande groupes & offsite — ' + eVal('e-org'),
        _template: 'table',
        _captcha: 'false',
        name: eVal('e-nom'),
        email: eVal('e-mail'),
        Etablissement: eVal('e-org'),
        Telephone: eVal('e-tel'),
        Type: document.getElementById('e-type').value,
        Participants: eVal('e-nb'),
        Date: eVal('e-date'),
        Lieu: document.getElementById('e-lieu').value,
        Projet: eVal('e-msg'),
        Recapitulatif: enquiryLines().join('\n')
      };

      function done() {
        enqSend.disabled = false;
        enqSend.innerHTML = label;
      }

      if (!window.fetch) { done(); mailFallback(); return; }

      fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      }).then(function (data) {
        // FormSubmit answers { success: "true" | false, message: … }
        if (String(data && data.success) !== 'true') throw new Error(data && data.message || 'refusé');
        done();
        enq.reset();
        enqOkTx.textContent = 'Demande envoyée — nous revenons vers vous sous 48 heures ouvrées.';
        enqOk.classList.add('show');
      }).catch(function () {
        done();
        mailFallback();
      });
    });
  }

  /* ── booking form ──────────────────────────────────────────
     No backend: a validated fiche is handed to WhatsApp, pre-composed. */
  var form = document.getElementById('fiche');
  var ok = document.getElementById('ok');
  var okTx = document.getElementById('ok-tx');

  if (!form) { stampYear(); return; }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  var PHONE_RE = /^[+()\d][\d\s().-]{6,}$/;

  function field(id) { return document.getElementById(id); }
  function mark(input, bad) {
    input.closest('.fld').classList.toggle('err', bad);
    input.setAttribute('aria-invalid', bad ? 'true' : 'false');
    return !bad;
  }

  function validate() {
    var nom = field('f-nom'), mail = field('f-mail'), tel = field('f-tel'), pc = field('f-parcours');
    var results = [
      mark(nom, nom.value.trim().length < 2),
      mark(mail, !EMAIL_RE.test(mail.value.trim())),
      mark(tel, tel.value.trim() !== '' && !PHONE_RE.test(tel.value.trim())),
      mark(pc, pc.value === '')
    ];
    return results.every(Boolean);
  }

  // clear a field's error as soon as the visitor edits it
  form.querySelectorAll('input, select, textarea').forEach(function (el) {
    el.addEventListener('input', function () { el.closest('.fld').classList.remove('err'); });
    el.addEventListener('change', function () { el.closest('.fld').classList.remove('err'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ok.classList.remove('show');

    if (!validate()) {
      var firstBad = form.querySelector('.fld.err input, .fld.err select');
      if (firstBad) firstBad.focus();
      return;
    }

    var lines = [
      'Fiche d\'inscription — Golf with Pinta',
      '',
      'Joueur : ' + field('f-nom').value.trim(),
      'E-mail : ' + field('f-mail').value.trim()
    ];
    if (field('f-tel').value.trim())   lines.push('Téléphone : ' + field('f-tel').value.trim());
    lines.push('Parcours : ' + field('f-parcours').value);
    if (field('f-index').value.trim()) lines.push('Index / niveau : ' + field('f-index').value.trim());
    if (field('f-msg').value.trim())   lines.push('', field('f-msg').value.trim());

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    // No 'noopener' in the feature string: with it Chromium always returns
    // null, so a successful open would be misreported as blocked. Sever the
    // opener reference manually instead.
    var win = window.open(url, '_blank');
    if (win) { try { win.opener = null; } catch (e) {} }

    okTx.textContent = win
      ? 'Fiche prête — terminez l\'envoi dans WhatsApp.'
      : 'Fiche prête. Autorisez les fenêtres pop-up, ou écrivez-nous au +212 665 602 209.';
    ok.classList.add('show');
  });

  /* ── footer year ───────────────────────────────────────── */
  stampYear();
})();

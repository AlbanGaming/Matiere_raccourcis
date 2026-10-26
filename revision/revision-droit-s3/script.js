// ============================================================
// Révision Droit S3 — routage, fiches, flashcards, QCM,
// questions rédigées, grilles de contrats, cas pratiques, sujet blanc
// ============================================================
(function () {
  'use strict';

  var sheet = document.getElementById('sheet');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var menuBtn = document.getElementById('menuToggle');

  // ---------- Stockage local (facultatif) ----------
  var PREFIX = 'droitS3:';
  function load(key, fallback) {
    try { var v = localStorage.getItem(PREFIX + key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) {}
  }
  function drop(key) { try { localStorage.removeItem(PREFIX + key); } catch (e) {} }

  function hash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; }
    return 'k' + (h >>> 0).toString(36);
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  FLASHCARDS.forEach(function (f) { f.id = hash(f.q); });
  QUESTIONS.forEach(function (q) { q.id = hash(q.q); });

  var CH_KEYS = ['ch1', 'ch2', 'ch3a', 'ch3b'];

  // ---------- Navigation latérale ----------
  function navItem(route, num, label, count) {
    return '<li><a href="#' + route + '" data-route="' + route + '"><span class="num">' + num + '</span><span>' + label + '</span>' +
      (count != null ? '<span class="count">' + count + '</span>' : '') + '</a></li>';
  }
  document.getElementById('navCours').innerHTML = CHAPTERS.filter(function (c) { return c.id !== 'methode'; })
    .map(function (c) { return navItem(c.id, c.num, c.label); }).join('');
  document.getElementById('navMethode').innerHTML =
    navItem('methode', 'M', 'Analyser un contrat') +
    navItem('contrats', '§', 'Contrats à analyser', CONTRATS.length) +
    navItem('cas', '⚖', 'Cas pratiques du TD', CAS.length);
  document.getElementById('navTrain').innerHTML =
    navItem('flashcards', '◆', 'Flashcards', FLASHCARDS.length) +
    navItem('quiz', '◆', 'QCM', QUIZ.length) +
    navItem('questions', '◆', 'Questions de cours', QUESTIONS.length) +
    navItem('sujet', '◆', 'Sujet blanc');

  function setActive(route) {
    var base = route.split('-')[0];
    if (base === 'contrat') base = 'contrats';
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.classList.toggle('active', a.dataset.route === base || a.dataset.route === route);
    });
  }
  function openMenu(open) {
    sidebar.classList.toggle('open', open);
    scrim.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  menuBtn.addEventListener('click', function () { openMenu(!sidebar.classList.contains('open')); });
  scrim.addEventListener('click', function () { openMenu(false); });

  // ---------- Routeur ----------
  var current = '';
  function wrapTables() {
    sheet.querySelectorAll('table').forEach(function (t) {
      if (t.parentElement.classList.contains('rv-scroll')) return;
      var box = document.createElement('div');
      box.className = 'rv-scroll';
      t.parentElement.insertBefore(box, t);
      box.appendChild(t);
    });
  }
  function route() {
    dispatch();
    wrapTables();
  }
  function dispatch() {
    var r = (location.hash || '#accueil').slice(1) || 'accueil';
    current = r;
    openMenu(false);
    setActive(r);
    sheet.classList.remove('wide');
    window.scrollTo(0, 0);

    var parts = r.split('-');
    var head = parts[0];
    var arg = parts.slice(1).join('-');

    if (head === 'flashcards') return renderFlashcards(arg);
    if (head === 'quiz') return renderQuiz(arg);
    if (head === 'questions') return renderQuestions(arg);
    if (head === 'contrats') return renderContrats();
    if (head === 'contrat') return renderContrat(arg);
    if (head === 'cas') return renderCas();
    if (head === 'sujet') return renderSujet();

    var ch = CHAPTERS.find(function (c) { return c.id === r; }) || CHAPTERS[0];
    renderChapter(ch);
  }
  window.addEventListener('hashchange', route);

  // ---------- Fiches de cours ----------
  function renderChapter(ch) {
    var isChap = CH_KEYS.indexOf(ch.id) !== -1;
    var idx = CHAPTERS.indexOf(ch);
    var next = CHAPTERS[idx + 1];
    sheet.innerHTML =
      '<p class="crumb">' + (ch.id === 'accueil' ? 'MR3.11 · S3' : ch.id === 'methode' ? 'Méthode' : 'Chapitre ' + ch.num) + '</p>' +
      '<h1 class="title">' + ch.title + '</h1>' +
      '<p class="dek">' + ch.dek + '</p>' +
      '<nav class="toc" id="toc" aria-label="Sur cette page"></nav>' +
      '<div class="content">' + ch.body + '</div>' +
      '<div class="actions">' +
        (isChap ? '<a class="btn" href="#flashcards-' + ch.id + '">Flashcards du chapitre</a>' +
                  '<a class="btn outline" href="#quiz-' + ch.id + '">QCM du chapitre</a>' +
                  '<a class="btn outline" href="#questions-' + ch.id + '">Questions rédigées</a>' : '') +
        (ch.id === 'methode' ? '<a class="btn" href="#contrats">Analyser un contrat</a>' : '') +
        (next && next.id !== 'methode' ? '<a class="btn outline" href="#' + next.id + '">Suite : ' + next.label + ' →</a>' : '') +
      '</div>';

    var toc = document.getElementById('toc');
    var h2s = sheet.querySelectorAll('.content h2');
    if (h2s.length > 2 && ch.id !== 'accueil') {
      var links = '<b>Sur cette page</b>';
      h2s.forEach(function (h, i) {
        if (!h.id) h.id = ch.id + '-s' + i;
        links += '<a href="#' + ch.id + '" data-scroll="' + h.id + '">' + h.textContent + '</a>';
      });
      toc.innerHTML = links;
    } else {
      toc.remove();
    }
    if (ch.id === 'accueil') renderProgress();
  }

  sheet.addEventListener('click', function (e) {
    var a = e.target.closest('[data-scroll]');
    if (!a) return;
    e.preventDefault();
    var t = document.getElementById(a.dataset.scroll);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function renderProgress() {
    var box = document.getElementById('progressPanel');
    if (!box) return;
    var known = load('fc:known', []);
    var bestQuiz = load('quiz:best:all', null);
    var qStates = QUESTIONS.filter(function (q) { var s = load('q:' + q.id, null); return s && s.state === 'ok'; }).length;
    var ctrDone = CONTRATS.filter(function (c) { var s = load('ctr:' + c.id, null); return s && s.checked; }).length;
    box.innerHTML = '<h2>Ta progression</h2><div class="prog">' +
      '<div><b>' + known.filter(function (id) { return FLASHCARDS.some(function (f) { return f.id === id; }); }).length + ' / ' + FLASHCARDS.length + '</b><span>flashcards sues</span></div>' +
      '<div><b>' + (bestQuiz == null ? '—' : bestQuiz + ' %') + '</b><span>meilleur QCM complet</span></div>' +
      '<div><b>' + qStates + ' / ' + QUESTIONS.length + '</b><span>questions maîtrisées</span></div>' +
      '<div><b>' + ctrDone + ' / ' + CONTRATS.length + '</b><span>contrats vérifiés</span></div>' +
      '</div>';
  }

  // ---------- Filtres par chapitre ----------
  function chips(base, active) {
    var html = '<div class="chips" role="group" aria-label="Filtrer par chapitre">';
    html += '<a class="chip' + (!active ? ' on' : '') + '" href="#' + base + '">Tout le cours</a>';
    CH_KEYS.forEach(function (k) {
      html += '<a class="chip' + (active === k ? ' on' : '') + '" href="#' + base + '-' + k + '">' + CH_LABELS[k] + '</a>';
    });
    return html + '</div>';
  }
  function byCh(list, ch) { return ch && CH_KEYS.indexOf(ch) !== -1 ? list.filter(function (x) { return x.ch === ch; }) : list; }

  // ---------- Flashcards ----------
  var fc = { key: null, deck: [], pos: 0, onlyUnknown: false };
  function renderFlashcards(ch) {
    var known = load('fc:known', []);
    var key = (ch || 'all') + (fc.onlyUnknown ? ':u' : '');
    if (fc.key !== key) {
      var list = byCh(FLASHCARDS, ch);
      if (fc.onlyUnknown) list = list.filter(function (f) { return known.indexOf(f.id) === -1; });
      fc = { key: key, deck: shuffle(list), pos: 0, onlyUnknown: fc.onlyUnknown, ch: ch };
    }
    var total = byCh(FLASHCARDS, ch);
    var nKnown = total.filter(function (f) { return known.indexOf(f.id) !== -1; }).length;
    var card = fc.deck[fc.pos];

    var html = '<p class="crumb">S\'entraîner</p><h1 class="title">Flashcards</h1>' +
      '<p class="dek">Lis la question, formule ta réponse à voix haute, puis retourne la carte. Classe-la en « Je sais » ou « À revoir ».</p>' +
      chips('flashcards', ch) +
      '<div class="setup"><label><input type="checkbox" id="fcOnly"' + (fc.onlyUnknown ? ' checked' : '') + '> Seulement les cartes à revoir</label>' +
      '<button class="btn small outline" id="fcShuffle" type="button">Mélanger</button></div>' +
      '<div class="fc-meta"><span>' + nKnown + ' / ' + total.length + ' sues</span><span>' + (card ? 'Carte ' + (fc.pos + 1) + ' / ' + fc.deck.length : '') + '</span></div>' +
      '<div class="fc-bar"><span style="width:' + (total.length ? Math.round(nKnown / total.length * 100) : 0) + '%"></span></div>';

    if (!card) {
      html += '<div class="qz qz-score"><p class="big">' + (fc.deck.length ? '✓' : '—') + '</p><p>' +
        (fc.deck.length ? 'Paquet terminé.' : 'Aucune carte à revoir dans ce filtre : tout est su.') + '</p>' +
        '<div class="fc-actions"><button class="btn" id="fcRestart" type="button">Recommencer</button>' +
        '<button class="btn outline" id="fcReset" type="button">Remettre toutes les cartes à revoir</button></div></div>';
    } else {
      html += '<button class="flashcard" id="fcCard" type="button" aria-label="Retourner la carte">' +
        '<div class="fc-inner"><div class="fc-face fc-front"><p class="eyebrow">' + CH_LABELS[card.ch] + (known.indexOf(card.id) !== -1 ? ' · déjà sue' : '') + '</p>' +
        '<div class="fc-q">' + card.q + '</div><span class="fc-hint">Cliquer ou Espace pour retourner</span></div>' +
        '<div class="fc-face fc-back"><p class="eyebrow">Réponse</p><div class="fc-a">' + card.a + '</div></div></div></button>' +
        '<div class="fc-actions">' +
        '<button class="btn outline" id="fcPrev" type="button"' + (fc.pos === 0 ? ' disabled' : '') + '>← Précédente</button>' +
        '<button class="btn ko" id="fcNo" type="button">À revoir</button>' +
        '<button class="btn ok" id="fcYes" type="button">Je sais</button></div>';
    }
    sheet.innerHTML = html;

    var only = document.getElementById('fcOnly');
    only.addEventListener('change', function () { fc.onlyUnknown = only.checked; fc.key = null; renderFlashcards(ch); });
    document.getElementById('fcShuffle').addEventListener('click', function () { fc.key = null; renderFlashcards(ch); });
    if (!card) {
      document.getElementById('fcRestart').addEventListener('click', function () { fc.key = null; renderFlashcards(ch); });
      document.getElementById('fcReset').addEventListener('click', function () {
        var ids = total.map(function (f) { return f.id; });
        save('fc:known', load('fc:known', []).filter(function (id) { return ids.indexOf(id) === -1; }));
        fc.key = null; renderFlashcards(ch);
      });
      return;
    }
    var el = document.getElementById('fcCard');
    el.addEventListener('click', function () { el.classList.toggle('flipped'); });
    function mark(isKnown) {
      var k = load('fc:known', []);
      var i = k.indexOf(card.id);
      if (isKnown && i === -1) k.push(card.id);
      if (!isKnown && i !== -1) k.splice(i, 1);
      save('fc:known', k);
      fc.pos++;
      renderFlashcards(ch);
    }
    document.getElementById('fcYes').addEventListener('click', function () { mark(true); });
    document.getElementById('fcNo').addEventListener('click', function () { mark(false); });
    document.getElementById('fcPrev').addEventListener('click', function () { if (fc.pos > 0) { fc.pos--; renderFlashcards(ch); } });
  }
  document.addEventListener('keydown', function (e) {
    if (!/^flashcards/.test(current)) return;
    if (e.target.matches('input, textarea, select')) return;
    var card = document.getElementById('fcCard');
    if (!card) return;
    if (e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    if (e.key === 'ArrowRight') document.getElementById('fcYes').click();
    if (e.key === 'ArrowLeft') document.getElementById('fcNo').click();
  });

  // ---------- QCM ----------
  var qz = null;
  function renderQuiz(ch) {
    var pool = byCh(QUIZ, ch);
    var bestKey = 'quiz:best:' + (ch || 'all');
    var best = load(bestKey, null);
    if (!qz || qz.ch !== ch) qz = { ch: ch, started: false, size: Math.min(20, pool.length) };

    var head = '<p class="crumb">S\'entraîner</p><h1 class="title">QCM</h1>' +
      '<p class="dek">Une seule bonne réponse par question, avec l\'explication tirée du cours.</p>' + chips('quiz', ch);

    if (!qz.started) {
      var opts = [10, 20, pool.length].filter(function (n, i, a) { return n <= pool.length && a.indexOf(n) === i; });
      sheet.innerHTML = head + '<div class="qz"><p><strong>' + pool.length + ' questions</strong> disponibles' +
        (best != null ? ' · meilleur score sur ce filtre : <strong>' + best + ' %</strong>' : '') + '.</p>' +
        '<div class="setup"><label for="qzSize">Nombre de questions</label><select id="qzSize">' +
        opts.map(function (n) { return '<option value="' + n + '"' + (n === qz.size ? ' selected' : '') + '>' + (n === pool.length ? 'Toutes (' + n + ')' : n) + '</option>'; }).join('') +
        '</select><button class="btn" id="qzStart" type="button">Commencer</button></div></div>';
      document.getElementById('qzStart').addEventListener('click', function () {
        var n = parseInt(document.getElementById('qzSize').value, 10);
        qz = { ch: ch, started: true, size: n, deck: shuffle(pool).slice(0, n), i: 0, score: 0, answered: false, wrong: [] };
        renderQuiz(ch);
      });
      return;
    }

    if (qz.i >= qz.deck.length) {
      var pct = Math.round(qz.score / qz.deck.length * 100);
      if (qz.deck.length === pool.length || qz.deck.length >= 10) {
        if (best == null || pct > best) save(bestKey, pct);
      }
      sheet.innerHTML = head + '<div class="qz"><div class="qz-score"><p class="big">' + qz.score + ' / ' + qz.deck.length + '</p><p>' + pct + ' % de bonnes réponses</p></div>' +
        (qz.wrong.length ? '<h3>À revoir</h3><div class="qz-review">' + qz.wrong.map(function (q) {
          return '<div><strong>' + q.q + '</strong><br>Réponse : ' + q.c[q.a] + '<br><span class="note">' + q.e + '</span></div>';
        }).join('') + '</div>' : '<p>Aucune erreur.</p>') +
        '<div class="fc-actions"><button class="btn" id="qzAgain" type="button">Nouveau QCM</button></div></div>';
      document.getElementById('qzAgain').addEventListener('click', function () { qz.started = false; renderQuiz(ch); });
      return;
    }

    var q = qz.deck[qz.i];
    var order = q._order || (q._order = shuffle(q.c.map(function (_, i) { return i; })));
    sheet.innerHTML = head + '<div class="qz"><div class="qz-top"><span>Question ' + (qz.i + 1) + ' / ' + qz.deck.length + ' · ' + CH_LABELS[q.ch] + '</span><span>Score ' + qz.score + '</span></div>' +
      '<p class="qz-q">' + q.q + '</p><div class="qz-choices">' +
      order.map(function (ci, n) { return '<button class="qz-choice" type="button" data-c="' + ci + '"><span class="k">' + 'ABCD'[n] + '</span><span>' + q.c[ci] + '</span></button>'; }).join('') +
      '</div><div id="qzFeedback"></div></div>';

    sheet.querySelectorAll('.qz-choice').forEach(function (b) {
      b.addEventListener('click', function () {
        if (qz.answered) return;
        qz.answered = true;
        var c = parseInt(b.dataset.c, 10);
        var ok = c === q.a;
        if (ok) qz.score++; else qz.wrong.push(q);
        sheet.querySelectorAll('.qz-choice').forEach(function (x) {
          x.disabled = true;
          var xc = parseInt(x.dataset.c, 10);
          if (xc === q.a) x.classList.add('right');
          else if (x === b) x.classList.add('wrong');
        });
        document.getElementById('qzFeedback').innerHTML = '<div class="qz-expl"><strong>' + (ok ? 'Bonne réponse.' : 'Raté.') + '</strong> ' + q.e + '</div>' +
          '<div class="fc-actions"><button class="btn" id="qzNext" type="button">' + (qz.i + 1 < qz.deck.length ? 'Question suivante →' : 'Voir le score') + '</button></div>';
        var nx = document.getElementById('qzNext');
        nx.focus();
        nx.addEventListener('click', function () { delete q._order; qz.i++; qz.answered = false; renderQuiz(ch); });
      });
    });
  }

  // ---------- Questions de cours ----------
  function questionCard(q, withDraft) {
    var st = load('q:' + q.id, {});
    return '<article class="qcard" data-qid="' + q.id + '"><div class="qcard-head"><span class="tag">' + CH_LABELS[q.ch] + '</span>' +
      '<span class="state ' + (st.state || '') + '"' + (st.state ? '' : ' hidden') + '>' + (st.state === 'ok' ? 'Maîtrisée' : 'À retravailler') + '</span></div>' +
      '<h3>' + q.q + '</h3>' +
      (withDraft ? '<textarea id="d-' + q.id + '" placeholder="Rédige ta réponse ici (enregistrée dans ce navigateur)…"></textarea>' : '') +
      '<div class="row-btns"><button class="btn small" type="button" data-act="show">Voir le corrigé</button></div>' +
      '<div class="corr" hidden>' + q.a + '<div class="row-btns"><button class="btn small ok" type="button" data-act="ok">Je la maîtrise</button>' +
      '<button class="btn small ko" type="button" data-act="ko">À retravailler</button></div></div></article>';
  }
  function wireQuestions(root) {
    root.querySelectorAll('.qcard').forEach(function (card) {
      var id = card.dataset.qid;
      var ta = card.querySelector('textarea');
      var st = load('q:' + id, {});
      if (ta) {
        ta.value = st.draft || '';
        ta.addEventListener('input', function () { var s = load('q:' + id, {}); s.draft = ta.value; save('q:' + id, s); });
      }
      card.addEventListener('click', function (e) {
        var b = e.target.closest('[data-act]');
        if (!b) return;
        var corr = card.querySelector('.corr');
        if (b.dataset.act === 'show') {
          corr.hidden = !corr.hidden;
          b.textContent = corr.hidden ? 'Voir le corrigé' : 'Masquer le corrigé';
        } else {
          var s = load('q:' + id, {}); s.state = b.dataset.act; save('q:' + id, s);
          var badge = card.querySelector('.state');
          badge.hidden = false;
          badge.className = 'state ' + s.state;
          badge.textContent = s.state === 'ok' ? 'Maîtrisée' : 'À retravailler';
        }
      });
    });
  }
  function renderQuestions(ch) {
    var list = byCh(QUESTIONS, ch);
    sheet.innerHTML = '<p class="crumb">S\'entraîner</p><h1 class="title">Questions de cours</h1>' +
      '<p class="dek">Le format de la première partie de l\'examen. Rédige une réponse structurée (définition, article, conditions, exemple), puis compare avec le corrigé.</p>' +
      chips('questions', ch) + '<div class="qlist">' + list.map(function (q) { return questionCard(q, true); }).join('') + '</div>';
    wireQuestions(sheet);
  }

  // ---------- Contrats ----------
  var LVL = { 1: 'Facile', 2: 'Moyen', 3: 'Difficile' };
  function renderContrats() {
    sheet.classList.add('wide');
    var cards = CONTRATS.map(function (c) {
      var st = load('ctr:' + c.id, null);
      var status = st && st.checked ? 'Nature vérifiée : ' + st.score + '/7' : st ? 'Commencé' : '';
      return '<a class="ctr-card" href="#contrat-' + c.id + '"><h3>' + c.titre + '</h3><span class="src">' + c.source + '</span>' +
        '<div class="meta"><span class="pill ' + c.type + '">' + c.type + '</span>' +
        (c.source.indexOf('inédit') !== -1 ? '<span class="pill new">Nouveau</span>' : '') +
        '<span class="lvl">' + LVL[c.niveau] + '</span>' + (status ? '<span class="lvl">· ' + status + '</span>' : '') + '</div></a>';
    }).join('');
    sheet.innerHTML = '<p class="crumb">Analyse de contrat</p><h1 class="title">Contrats à analyser</h1>' +
      '<p class="dek">Les cinq contrats du polycopié (corrigés complétés) et six contrats inédits qui couvrent tout le cours : contrats civils, informatiques et de travail. Pour chacun : la grille du cours à remplir, la nature juridique à cocher, puis le corrigé ligne par ligne.</p>' +
      '<div class="actions"><a class="btn outline" href="#methode">Relire la méthode</a></div>' +
      '<div class="ctr-grid">' + cards + '</div>';
  }

  function renderContrat(id) {
    var c = CONTRATS.find(function (x) { return x.id === id; });
    if (!c) { location.hash = '#contrats'; return; }
    sheet.classList.add('wide');
    var st = load('ctr:' + c.id, { rows: {}, nature: {} });
    st.rows = st.rows || {}; st.nature = st.nature || {};

    var rows = GRID_ROWS.map(function (r) {
      return '<div class="g-row"><label for="g-' + r.key + '">' + r.label + '</label>' +
        '<textarea id="g-' + r.key + '" data-row="' + r.key + '" placeholder="Ta réponse…"></textarea>' +
        '<button class="reveal" type="button" data-reveal="' + r.key + '">Voir le corrigé de cette ligne</button>' +
        '<div class="corr" id="c-' + r.key + '" hidden>' + c.grille[r.key] + '</div></div>';
    }).join('');

    var nature = NATURE_ROWS.map(function (n) {
      return '<div class="n-row" data-n="' + n.key + '"><div class="n-opts">' + n.options.map(function (o) {
        return '<label><input type="radio" name="n-' + n.key + '" value="' + o[0] + '"> ' + o[1] + '</label>';
      }).join('') + (n.key === 'reglementation' ? '<span class="note">(vu en cours, pas dans la grille du poly)</span>' : '') +
      '</div><div class="n-just" hidden>' + c.justif[n.key] + '</div></div>';
    }).join('');

    var idx = CONTRATS.indexOf(c);
    var next = CONTRATS[idx + 1];

    sheet.innerHTML = '<p class="crumb"><a href="#contrats">Contrats</a> · ' + c.type + ' · ' + LVL[c.niveau] + '</p>' +
      '<h1 class="title">' + c.titre + '</h1><p class="dek">' + c.source + '. Remplis la grille sans regarder le corrigé, puis vérifie ligne par ligne.</p>' +
      '<div class="ctr-layout">' +
        '<div><p class="ctr-label">Le contrat</p><div class="ctr-text">' + c.texte + '</div></div>' +
        '<div><p class="ctr-label">Grille d\'analyse <span class="saved" id="savedFlag"></span></p>' +
          '<form class="grid-form" id="gridForm" autocomplete="off">' + rows +
          '<div class="nature"><h3>Nature juridique du contrat</h3>' + nature +
          '<div class="row-btns"><button class="btn" type="button" id="checkNature">Vérifier la nature juridique</button></div>' +
          '<div class="n-score" id="nScore" aria-live="polite"></div></div></form>' +
          '<div class="actions"><button class="btn outline" type="button" id="showAll">Afficher tout le corrigé</button>' +
          '<button class="btn outline" type="button" id="clearAll">Effacer mes réponses</button></div>' +
          '<div class="critique" id="critique" hidden><h3>Points d\'attention et critique des clauses</h3><div class="critique-box">' + (c.critique || '') + '</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="actions">' + (next ? '<a class="btn" href="#contrat-' + next.id + '">Contrat suivant : ' + next.titre + ' →</a>' : '') +
      '<a class="btn outline" href="#contrats">Tous les contrats</a></div>';

    var form = document.getElementById('gridForm');
    var flag = document.getElementById('savedFlag');
    var timer = null;
    function persist() {
      save('ctr:' + c.id, st);
      flag.textContent = '· enregistré';
      clearTimeout(timer);
      timer = setTimeout(function () { flag.textContent = ''; }, 1500);
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    GRID_ROWS.forEach(function (r) {
      var ta = document.getElementById('g-' + r.key);
      ta.value = st.rows[r.key] || '';
      ta.addEventListener('input', function () { st.rows[r.key] = ta.value; persist(); });
    });
    NATURE_ROWS.forEach(function (n) {
      if (st.nature[n.key]) {
        var inp = form.querySelector('input[name="n-' + n.key + '"][value="' + st.nature[n.key] + '"]');
        if (inp) inp.checked = true;
      }
    });
    form.addEventListener('change', function (e) {
      if (e.target.type === 'radio') { st.nature[e.target.name.slice(2)] = e.target.value; persist(); }
    });
    form.addEventListener('click', function (e) {
      var b = e.target.closest('[data-reveal]');
      if (!b) return;
      var box = document.getElementById('c-' + b.dataset.reveal);
      box.hidden = !box.hidden;
      b.textContent = box.hidden ? 'Voir le corrigé de cette ligne' : 'Masquer le corrigé';
    });

    function checkNature() {
      var score = 0;
      NATURE_ROWS.forEach(function (n) {
        var expected = c.nature[n.key];
        var exp = Array.isArray(expected) ? expected : [expected];
        var row = form.querySelector('[data-n="' + n.key + '"]');
        row.querySelectorAll('label').forEach(function (lab) {
          var inp = lab.querySelector('input');
          lab.classList.remove('right', 'wrong', 'expected');
          if (inp.checked) lab.classList.add(exp.indexOf(inp.value) !== -1 ? 'right' : 'wrong');
          else if (exp.indexOf(inp.value) !== -1) lab.classList.add('expected');
        });
        if (exp.indexOf(st.nature[n.key]) !== -1) score++;
        row.querySelector('.n-just').hidden = false;
      });
      document.getElementById('nScore').textContent = score + ' / 7 bonnes cases. Lis les justifications : à l\'examen, la case sans justification ne rapporte presque rien.';
      st.checked = true; st.score = score; persist();
    }
    document.getElementById('checkNature').addEventListener('click', checkNature);

    var allShown = false;
    document.getElementById('showAll').addEventListener('click', function () {
      allShown = !allShown;
      GRID_ROWS.forEach(function (r) {
        document.getElementById('c-' + r.key).hidden = !allShown;
        form.querySelector('[data-reveal="' + r.key + '"]').textContent = allShown ? 'Masquer le corrigé' : 'Voir le corrigé de cette ligne';
      });
      document.getElementById('critique').hidden = !allShown;
      if (allShown) checkNature();
      this.textContent = allShown ? 'Masquer le corrigé' : 'Afficher tout le corrigé';
    });

    var armed = false;
    var clearBtn = document.getElementById('clearAll');
    clearBtn.addEventListener('click', function () {
      if (!armed) { armed = true; clearBtn.textContent = 'Confirmer l\'effacement'; setTimeout(function () { armed = false; clearBtn.textContent = 'Effacer mes réponses'; }, 3000); return; }
      drop('ctr:' + c.id);
      renderContrat(c.id);
    });
  }

  // ---------- Cas pratiques ----------
  function renderCas() {
    sheet.innerHTML = '<p class="crumb">TD 2 et TD 3</p><h1 class="title">Cas pratiques du TD</h1>' +
      '<p class="dek">Les exercices de licenciement, de clause de non-concurrence et de protection des données, avec une correction complète. Ouvre un cas, réponds, puis affiche la correction.</p>' +
      CAS.map(function (k) {
        return '<details class="cas" id="cas-' + k.id + '"><summary><strong>' + k.titre + '</strong><span class="tag">' + CH_LABELS[k.ch] + '</span><span class="src">' + k.source + '</span></summary>' +
          '<div class="cas-body"><div class="enonce">' + k.enonce + '</div>' +
          '<div class="row-btns"><button class="btn small" type="button" data-cas="' + k.id + '">Voir la correction</button></div>' +
          '<div class="corr" id="cc-' + k.id + '" hidden>' + k.correction + '</div></div></details>';
      }).join('');
    sheet.querySelectorAll('[data-cas]').forEach(function (b) {
      b.addEventListener('click', function () {
        var box = document.getElementById('cc-' + b.dataset.cas);
        box.hidden = !box.hidden;
        b.textContent = box.hidden ? 'Voir la correction' : 'Masquer la correction';
      });
    });
  }

  // ---------- Sujet blanc ----------
  var sujet = null;
  var chrono = { start: null, elapsed: 0, id: null };
  function newSujet() {
    var qs = CH_KEYS.map(function (k) { return shuffle(QUESTIONS.filter(function (q) { return q.ch === k; }))[0]; });
    sujet = { questions: qs, contrat: shuffle(CONTRATS)[0] };
  }
  function fmt(ms) {
    var s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), r = s % 60;
    return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
  }
  function tick() {
    var el = document.getElementById('chrono');
    if (!el) return;
    var ms = chrono.elapsed + (chrono.start ? Date.now() - chrono.start : 0);
    el.textContent = fmt(ms);
  }
  function renderSujet() {
    if (!sujet) newSujet();
    var c = sujet.contrat;
    sheet.innerHTML = '<p class="crumb">S\'entraîner</p><h1 class="title">Sujet blanc</h1>' +
      '<p class="dek">Une question par partie du cours, puis un contrat à analyser. Rédige sur papier ou dans les cadres, en temps limité, avant d\'ouvrir les corrigés.</p>' +
      '<div class="timer-box"><span class="timer" id="chrono">00:00</span>' +
      '<button class="btn small" type="button" id="chStart">' + (chrono.start ? 'Pause' : 'Démarrer le chrono') + '</button>' +
      '<button class="btn small outline" type="button" id="chReset">Remettre à zéro</button>' +
      '<button class="btn small outline" type="button" id="newSujet">Tirer un autre sujet</button></div>' +
      '<section class="sujet-part"><h2>Partie 1 — Questions de cours</h2><div class="qlist">' +
      sujet.questions.map(function (q) { return questionCard(q, true); }).join('') + '</div></section>' +
      '<section class="sujet-part"><h2>Partie 2 — Analyse de contrat</h2>' +
      '<a class="ctr-card" href="#contrat-' + c.id + '"><h3>' + c.titre + '</h3><span class="src">' + c.source + '</span>' +
      '<div class="meta"><span class="pill ' + c.type + '">' + c.type + '</span><span class="lvl">' + LVL[c.niveau] + '</span><span class="lvl">· Ouvrir la grille →</span></div></a></section>';
    wireQuestions(sheet);
    tick();
    document.getElementById('chStart').addEventListener('click', function () {
      if (chrono.start) { chrono.elapsed += Date.now() - chrono.start; chrono.start = null; clearInterval(chrono.id); this.textContent = 'Reprendre'; }
      else { chrono.start = Date.now(); chrono.id = setInterval(tick, 500); this.textContent = 'Pause'; }
    });
    document.getElementById('chReset').addEventListener('click', function () {
      clearInterval(chrono.id); chrono = { start: null, elapsed: 0, id: null }; renderSujet();
    });
    document.getElementById('newSujet').addEventListener('click', function () { newSujet(); renderSujet(); });
  }

  route();
})();

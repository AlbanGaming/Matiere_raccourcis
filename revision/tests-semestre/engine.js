/* =====================================================================
   Tests de semestre — moteur
   Les banques de questions sont dans data-s1.js, data-s2.js, data-s3.js.

   Format d'une question :
     { m: 'clé matière', t: 'qcm' | 'multi' | 'fill' | 'num' | 'order',
       q: 'énoncé (HTML autorisé)', code: 'code affiché (optionnel)',
       o: [options], a: index | [indices] | nombre, e: 'explication',
       tol: tolérance (num), u: 'unité' (num), cs: true (fill sensible à la casse) }
   Code à trous (t:'fill') : dans code, chaque trou s'écrit [[réponse|variante|…]]
   Remettre dans l'ordre (t:'order') : o contient les éléments DANS LE BON ORDRE.

   Question à valeurs aléatoires :
     { m: 'clé', gen: R => ({ t: 'num', q: '…', a: 42, e: '…' }) }
     R fournit : R.rnd(min, max), R.pick(tableau), R.fmt(nombre), R.shuffle(tableau)
     La fonction est rappelée à chaque tirage : les valeurs changent à chaque test.

   Carnet d'erreurs : chaque question ratée y entre et revient après 1, 3, 7
   puis 14 jours. Réussie 4 fois de suite, elle est considérée comme acquise.
   ===================================================================== */
(function () {
  const T = window.TESTS || {};
  const app = document.getElementById('app');
  const KEY = 'tests-semestre-v1';
  const REPO = 'https://github.com/AlbanGaming/Matiere_raccourcis';
  const DAY = 864e5, STEPS = [1, 3, 7, 14];
  const FICHES = { S3: ['coo', 'res', 'proba', 'plsql', 'symfony', 'deveff', 'droit', 'msi', 'cpp'] }; /* fiches A4 existantes */
  let store = { hist: {}, carnet: {}, mat: {}, meta: {} };
  try { store = Object.assign(store, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = x => (Math.round(x * 100) / 100).toLocaleString('fr-FR');
  const R = { rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)), pick: a => a[Math.floor(Math.random() * a.length)], fmt, shuffle };
  const COL = { teal: '--r-teal', blue: '--r-blue', orange: '--r-orange', violet: '--r-violet', pink: '--r-pink', amber: '--r-amber', green: '--r-green', red: '--r-red', cyan: '--r-cyan' };
  const col = m => 'var(' + (COL[m.couleur] || '--r-accent') + ')';
  const TYPES = { qcm: 'QCM', multi: 'Plusieurs réponses', fill: 'Code à compléter', num: 'Calcul', order: 'Remettre dans l\'ordre' };
  const norm = (s, cs) => { s = String(s).replace(/\s+/g, ' ').trim().replace(/;$/, '').trim(); return cs ? s : s.toLowerCase(); };
  const parseNum = s => { s = String(s).replace(/[\s  €%]/g, '').replace(',', '.'); return s === '' ? NaN : Number(s); };
  const blanks = code => [...code.matchAll(/\[\[(.+?)\]\]/g)].map(m => m[1].split('|'));
  const plain = h => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent.replace(/\s+/g, ' ').trim(); };
  const SEMS = Object.keys(T).sort();

  /* identifiants stables (servent au carnet d'erreurs) */
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  SEMS.forEach(s => T[s].questions.forEach((q, i) => { q.sem = s; q.id = s + '-' + q.m + '-' + hash(q.gen ? 'gen' + i + q.gen.toString() : (q.q + '|' + (q.code || '') + '|' + (q.o || []).join('|'))); }));
  const byId = {}; SEMS.forEach(s => T[s].questions.forEach(q => byId[q.id] = q));
  /* instancie une question (tire les valeurs si c'est un générateur) */
  const inst = q => q.gen ? Object.assign({ t: 'num' }, q.gen(R), { m: q.m, id: q.id, sem: q.sem, alea: true }) : q;

  const due = s => Object.entries(store.carnet).filter(([id, c]) => c.sem === s && byId[id] && c.due <= Date.now()).map(([id]) => id);
  const inCarnet = s => Object.entries(store.carnet).filter(([id, c]) => c.sem === s && byId[id]).length;

  let RUN = null, timerId = null;

  /* ---------------- ACCUEIL ---------------- */
  function home() {
    stopTimer(); RUN = null;
    if (location.hash) history.replaceState(null, '', location.pathname);
    app.innerHTML = `<a class="back" href="../index.html">← Toutes les révisions</a>
      <p class="eyebrow">BUT Informatique · tous les modules</p>
      <h1>Tests de <mark>semestre</mark></h1>
      <p class="lead">Un grand test qui mélange toutes les matières d'un semestre : QCM, code à compléter, calculs à valeurs aléatoires, éléments à remettre dans l'ordre. Les questions ratées entrent dans ton carnet d'erreurs et reviennent les jours suivants.</p>
      <div class="grid3">${SEMS.map(s => {
        const S = T[s], n = S.questions.length, nm = Object.keys(S.matieres).length, h = store.hist[s] || [], d = due(s).length;
        return `<div class="card sem" data-s="${s}"><div class="big">Test <span>${s}</span></div><p>${esc(S.sousTitre || '')}</p>
          <div class="meta"><span class="tag">${n} questions</span><span class="tag">${nm} matières</span>${h.length ? `<span class="tag hl">record ${Math.max(...h.map(x => x.p))} %</span>` : ''}${d ? `<span class="tag due">📒 ${d} à revoir</span>` : ''}</div></div>`;
      }).join('')}</div>`;
    app.querySelectorAll('.sem').forEach(c => c.onclick = () => config(c.dataset.s));
  }

  /* ---------------- CONFIGURATION ---------------- */
  function config(s, only) {
    stopTimer(); RUN = null;
    const S = T[s]; if (!S) return home();
    history.replaceState(null, '', '#' + s);
    const counts = {}; S.questions.forEach(q => counts[q.m] = (counts[q.m] || 0) + 1);
    const sel = new Set(only && counts[only] ? [only] : Object.keys(S.matieres).filter(k => !S.matieres[k].option && counts[k]));
    let nb = 40, mode = 'exam', chrono = false;
    const h = store.hist[s] || [], d = due(s), nc = inCarnet(s);
    const nextDue = Object.values(store.carnet).filter(c => c.sem === s && c.due > Date.now()).map(c => c.due).sort()[0];
    app.innerHTML = `<a class="back" href="#" id="bk">← Choisir un autre semestre</a>
      <p class="eyebrow">Test ${s}</p><h1>${esc(S.titre)}</h1><p class="lead">${esc(S.sousTitre || '')}</p>
      ${nc ? `<div class="card carnet"><div><b>📒 Carnet d'erreurs</b><span>${d.length ? `<b>${d.length}</b> question${d.length > 1 ? 's' : ''} à revoir aujourd'hui` : 'Rien à revoir aujourd\'hui' + (nextDue ? ' · prochaine le ' + new Date(nextDue).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) : '')} · ${nc} en cours d'apprentissage</span></div>${d.length ? '<button class="btn" id="rev">Revoir mon carnet →</button>' : ''}</div>` : ''}
      <div class="card" style="margin-top:18px">
        <span class="f-label">Matières <button class="btn quiet mini" id="all">tout</button><button class="btn quiet mini" id="none">rien</button></span>
        <div class="chips" id="mat">${Object.entries(S.matieres).map(([k, m]) => `<button class="chip" data-k="${k}" ${counts[k] ? '' : 'disabled'}><span class="dot" style="background:${col(m)}"></span>${esc(m.nom)}${m.option ? ' <small>(option)</small>' : ''}<span class="n">${counts[k] || 0}</span></button>`).join('')}</div>
        <span class="f-label">Nombre de questions</span>
        <div class="chips" id="nb">${[20, 40, 60, 0].map(n => `<button class="chip" data-n="${n}">${n || 'Toutes'}</button>`).join('')}</div>
        <span class="f-label">Mode</span>
        <div class="chips" id="mode"><button class="chip" data-m="exam">Examen · correction à la fin</button><button class="chip" data-m="train">Entraînement · correction après chaque question</button></div>
        <span class="f-label">Options</span>
        <label class="toggle"><input type="checkbox" id="chrono"> Chronomètre (1 min 30 par question)</label>
        <div class="actions"><button class="btn" id="go">Commencer le test →</button><span class="hint" id="sum"></span></div>
      </div>
      ${h.length ? `<h2>Tes derniers tests ${s}</h2><div class="card"><div class="hist">${h.slice(-15).map((x, i, a) => `<i class="${i === a.length - 1 ? 'last' : ''}" style="height:${Math.max(4, x.p * .6)}px" title="${x.d} · ${x.p} % sur ${x.n} questions"></i>`).join('')}</div><p class="hint">Dernier : ${h[h.length - 1].p} % · record : ${Math.max(...h.map(x => x.p))} %</p></div>` : ''}`;
    const upd = () => {
      app.querySelectorAll('#mat .chip').forEach(c => c.classList.toggle('on', sel.has(c.dataset.k)));
      app.querySelectorAll('#nb .chip').forEach(c => c.classList.toggle('on', +c.dataset.n === nb));
      app.querySelectorAll('#mode .chip').forEach(c => c.classList.toggle('on', c.dataset.m === mode));
      const avail = S.questions.filter(q => sel.has(q.m)).length, n = nb ? Math.min(nb, avail) : avail;
      app.querySelector('#sum').textContent = sel.size ? `${n} questions sur ${sel.size} matière${sel.size > 1 ? 's' : ''}${chrono ? ' · ' + Math.round(n * 1.5) + ' min' : ''}` : 'Choisis au moins une matière';
      app.querySelector('#go').disabled = !sel.size;
    };
    app.querySelector('#bk').onclick = e => { e.preventDefault(); home(); };
    app.querySelectorAll('#mat .chip').forEach(c => c.onclick = () => { sel.has(c.dataset.k) ? sel.delete(c.dataset.k) : sel.add(c.dataset.k); upd(); });
    app.querySelector('#all').onclick = () => { Object.keys(S.matieres).forEach(k => counts[k] && sel.add(k)); upd(); };
    app.querySelector('#none').onclick = () => { sel.clear(); upd(); };
    app.querySelectorAll('#nb .chip').forEach(c => c.onclick = () => { nb = +c.dataset.n; upd(); });
    app.querySelectorAll('#mode .chip').forEach(c => c.onclick = () => { mode = c.dataset.m; upd(); });
    app.querySelector('#chrono').onchange = e => { chrono = e.target.checked; upd(); };
    app.querySelector('#go').onclick = () => start(s, [...sel], nb, mode, chrono);
    const rv = app.querySelector('#rev'); if (rv) rv.onclick = () => start(s, [], 0, 'train', false, shuffle(d.map(id => byId[id])), 'carnet');
    upd();
  }

  /* tirage équilibré entre matières */
  function draw(S, mats, nb) {
    const pools = {}; mats.forEach(m => pools[m] = shuffle(S.questions.filter(q => q.m === m)));
    const total = mats.reduce((a, m) => a + pools[m].length, 0), N = nb ? Math.min(nb, total) : total;
    const out = [];
    while (out.length < N) for (const m of shuffle(mats)) { if (out.length >= N) break; if (pools[m].length) out.push(pools[m].pop()); }
    return shuffle(out);
  }

  /* ---------------- PASSAGE ---------------- */
  function start(s, mats, nb, mode, chrono, fixed, kind) {
    const S = T[s], qs = (fixed || draw(S, mats, nb)).map(q => q.alea ? q : inst(q));
    RUN = { s, S, mode, chrono, kind: kind || 'test', qs: qs.map(q => ({ q, ans: null, order: q.t === 'order' ? shuffleNot(q.o.map((x, i) => i)) : null, opts: (q.t === 'qcm' || q.t === 'multi' || !q.t) ? shuffle(q.o.map((x, i) => i)) : null, checked: false, flag: false })), i: 0, t0: Date.now(), limit: chrono ? Math.round(qs.length * 90) : 0, mats: mats.length ? mats : [...new Set(qs.map(q => q.m))] };
    if (chrono) startTimer();
    show();
  }
  const shuffleNot = idx => { if (idx.length < 2) return idx; let s; do { s = shuffle(idx); } while (s.every((x, i) => x === i)); return s; };
  function startTimer() { stopTimer(); timerId = setInterval(() => { const el = document.getElementById('tim'); const r = RUN.limit - (Date.now() - RUN.t0) / 1000; if (r <= 0) { stopTimer(); finish(); return; } if (el) { el.textContent = clock(r); el.classList.toggle('low', r < 120); } }, 500); }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  const clock = sec => { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); };

  function reportUrl(x) {
    const q = x.q, m = (T[q.sem].matieres[q.m] || {}).nom || q.m, t = q.t || 'qcm';
    let body = `**Test ${q.sem} · ${m}** (${TYPES[t]})\nIdentifiant : \`${q.id}\`${q.alea ? ' (valeurs aléatoires)' : ''}\n\n**Question**\n${plain(q.q)}\n`;
    if (q.code) body += '\n```\n' + q.code.replace(/\[\[(.+?)\]\]/g, (a, b) => '[' + b.split('|')[0] + ']') + '\n```\n';
    if (q.o && t !== 'order') body += '\n**Choix**\n' + q.o.map(o => '- ' + plain(o)).join('\n') + '\n';
    body += '\n**Réponse attendue par le site**\n' + plain(rightAnswer(q).replace(/<li>/g, ' · ')) + '\n';
    if (q.e) body += '\n**Explication du site**\n' + plain(q.e) + '\n';
    body += '\n**Ce qui est faux selon moi**\n(à compléter)\n';
    return REPO + '/issues/new?title=' + encodeURIComponent('[Test ' + q.sem + '] Erreur – ' + m) + '&body=' + encodeURIComponent(body);
  }

  function show() {
    const R = RUN, it = R.qs[R.i], q = it.q, t = q.t || 'qcm', m = R.S.matieres[q.m] || { nom: q.m };
    const answered = R.qs.filter(x => hasAns(x)).length;
    let body = '';
    if (q.code && t !== 'fill') body += `<pre class="code">${esc(q.code)}</pre>`;
    if (t === 'qcm' || t === 'multi') {
      body += it.opts.map((oi, k) => `<button class="opt ${t === 'multi' ? 'multi' : ''}" data-i="${oi}"><span class="box">${String.fromCharCode(65 + k)}</span><span>${q.o[oi]}</span></button>`).join('');
      if (t === 'multi') body += '<p class="hint">Plusieurs réponses possibles : coche toutes les bonnes.</p>';
    } else if (t === 'fill') {
      let k = 0;
      body += '<pre class="code">' + q.code.split(/(\[\[.+?\]\])/g).map(seg => {
        const mm = seg.match(/^\[\[(.+?)\]\]$/);
        if (!mm) return esc(seg);
        const w = Math.max(4, ...mm[1].split('|').map(x => x.length)) + 1;
        return `<input data-b="${k++}" style="width:${w + 1}ch" autocomplete="off" autocapitalize="off" spellcheck="false">`;
      }).join('') + '</pre><p class="hint">Remplis les cases en pointillés. Majuscules et espaces en trop ne comptent pas.</p>';
    } else if (t === 'num') {
      body += `<div class="numrow"><input id="num" inputmode="decimal" autocomplete="off" placeholder="ta réponse">${q.u ? `<span>${esc(q.u)}</span>` : ''}</div>`;
    } else if (t === 'order') {
      body += '<ol class="order-list" id="ord"></ol><p class="hint">Utilise les flèches pour remettre les éléments dans le bon ordre.</p>';
    }
    app.innerHTML = `<div class="bar-top"><button class="btn quiet" id="quit" style="padding:6px 12px">✕</button><span class="qnum">${R.kind === 'carnet' ? '📒 ' : ''}${R.i + 1} / ${R.qs.length}</span><div class="progress"><i style="width:${answered / R.qs.length * 100}%"></i></div>${R.chrono ? `<span class="timer" id="tim">${clock(R.limit - (Date.now() - R.t0) / 1000)}</span>` : ''}</div>
      <div class="card"><div class="qmeta"><span class="tag" style="color:${col(m)};border-color:${col(m)}">${esc(m.nom)}</span><span class="tag">${TYPES[t]}</span>${q.alea ? '<span class="tag">🎲 valeurs aléatoires</span>' : ''}${store.carnet[q.id] ? '<span class="tag due">📒 carnet</span>' : ''}${it.flag ? '<span class="tag hl">à revoir</span>' : ''}</div>
      <div class="qtext">${q.q}</div>${body}<div id="fbx"></div>
      <div class="nav"><button class="btn quiet" id="prev" ${R.i ? '' : 'disabled'}>← Précédente</button><button class="btn quiet" id="flag">${it.flag ? 'Retirer le marqueur' : '🚩 Marquer à revoir'}</button><span class="spacer"></span>
      ${R.mode === 'train' && !it.checked ? '<button class="btn" id="check">Valider</button>' : ''}
      ${R.i < R.qs.length - 1 ? `<button class="btn ${R.mode === 'train' && !it.checked ? 'ghost' : ''}" id="next">Suivante →</button>` : '<button class="btn" id="end">Terminer</button>'}</div></div>
      <div class="dots">${R.qs.map((x, k) => `<button data-k="${k}" class="${k === R.i ? 'cur ' : ''}${R.mode === 'train' && x.checked ? (score(x) >= .999 ? 'ok' : 'ko') : (hasAns(x) ? 'ans' : '')}${x.flag ? ' flag' : ''}">${k + 1}</button>`).join('')}</div>`;
    bind(it, t);
    if (it.checked) reveal(it, t);
    app.querySelector('#quit').onclick = () => { const b = app.querySelector('#quit'); if (b.dataset.armed) { stopTimer(); config(R.s); } else { b.dataset.armed = 1; b.textContent = 'Quitter ? (re-cliquer)'; } };
    app.querySelector('#prev').onclick = () => { R.i--; show(); };
    app.querySelector('#flag').onclick = () => { it.flag = !it.flag; show(); };
    const nx = app.querySelector('#next'); if (nx) nx.onclick = () => { R.i++; show(); };
    const en = app.querySelector('#end'); if (en) en.onclick = endPrompt;
    const ck = app.querySelector('#check'); if (ck) ck.onclick = () => { it.checked = true; show(); };
    app.querySelectorAll('.dots button').forEach(b => b.onclick = () => { R.i = +b.dataset.k; show(); });
    window.scrollTo({ top: 0 });
  }
  function endPrompt() {
    const R = RUN, left = R.qs.filter(x => !hasAns(x)).length;
    const fb = app.querySelector('#fbx');
    if (left && !fb.dataset.warn) { fb.dataset.warn = 1; fb.innerHTML = `<div class="fb ko"><b>${left} question${left > 1 ? 's' : ''} sans réponse.</b> Clique encore sur « Terminer » pour rendre quand même.</div>`; return; }
    finish();
  }
  function hasAns(x) {
    const a = x.ans, t = x.q.t || 'qcm';
    if (t === 'order') return x.touched;
    if (t === 'multi') return a && a.length;
    if (t === 'fill') return a && a.some(v => v && v.trim());
    return a !== null && a !== undefined && a !== '';
  }
  function bind(it, t) {
    const lock = RUN.mode === 'train' && it.checked;
    const go = () => (app.querySelector('#check') || app.querySelector('#next') || {}).click?.();
    if (t === 'qcm' || t === 'multi') {
      const btns = app.querySelectorAll('.opt');
      const paint = () => btns.forEach(b => b.classList.toggle('sel', t === 'multi' ? (it.ans || []).includes(+b.dataset.i) : it.ans === +b.dataset.i));
      btns.forEach(b => { b.disabled = lock; b.onclick = () => {
        const i = +b.dataset.i;
        if (t === 'multi') { const s = new Set(it.ans || []); s.has(i) ? s.delete(i) : s.add(i); it.ans = [...s]; } else it.ans = i;
        paint(); progress();
      }; });
      paint();
    } else if (t === 'fill') {
      const ins = app.querySelectorAll('pre.code input');
      it.ans = it.ans || Array(ins.length).fill('');
      ins.forEach(inp => { inp.value = it.ans[+inp.dataset.b] || ''; inp.disabled = lock; inp.oninput = () => { it.ans[+inp.dataset.b] = inp.value; progress(); };
        inp.onkeydown = e => { if (e.key === 'Enter') { const n = ins[+inp.dataset.b + 1]; n ? n.focus() : go(); } }; });
      if (!lock && ins[0]) ins[0].focus({ preventScroll: true });
    } else if (t === 'num') {
      const inp = app.querySelector('#num'); inp.value = it.ans ?? ''; inp.disabled = lock;
      inp.oninput = () => { it.ans = inp.value; progress(); };
      inp.onkeydown = e => { if (e.key === 'Enter') go(); };
      if (!lock) inp.focus({ preventScroll: true });
    } else if (t === 'order') {
      const ol = app.querySelector('#ord');
      const draw = () => {
        ol.innerHTML = it.order.map((oi, k) => `<li data-k="${k}"><span class="pos">${k + 1}</span><span>${it.q.o[oi]}</span>${lock ? '' : `<span class="mv"><button data-d="-1" ${k ? '' : 'disabled'}>↑</button><button data-d="1" ${k < it.order.length - 1 ? '' : 'disabled'}>↓</button></span>`}</li>`).join('');
        ol.querySelectorAll('.mv button').forEach(b => b.onclick = () => { const k = +b.closest('li').dataset.k, d = +b.dataset.d;[it.order[k], it.order[k + d]] = [it.order[k + d], it.order[k]]; it.touched = true; draw(); progress(); });
      };
      draw(); it.ans = it.order;
    }
  }
  function progress() { const R = RUN, n = R.qs.filter(x => hasAns(x)).length; const b = app.querySelector('.progress i'); if (b) b.style.width = n / R.qs.length * 100 + '%'; const d = app.querySelectorAll('.dots button')[R.i]; if (d && R.mode === 'exam') d.classList.toggle('ans', !!hasAns(R.qs[R.i])); }

  /* ---------------- CORRECTION ---------------- */
  function score(x) {
    const q = x.q, t = q.t || 'qcm', a = x.ans;
    if (t === 'qcm') return a === q.a ? 1 : 0;
    if (t === 'multi') { const A = new Set(q.a), S = new Set(a || []); return A.size === S.size && [...A].every(v => S.has(v)) ? 1 : 0; }
    if (t === 'num') { const v = parseNum(a); if (isNaN(v)) return 0; const tol = q.tol !== undefined ? q.tol : Math.max(0.01, Math.abs(q.a) * 0.001); return Math.abs(v - q.a) <= tol + 1e-9 ? 1 : 0; }
    if (t === 'fill') { const B = blanks(q.code); if (!a) return 0; const ok = B.filter((alts, k) => alts.some(al => norm(al, q.cs) === norm(a[k] || '', q.cs))).length; return ok / B.length; }
    if (t === 'order') return x.order.every((v, i) => v === i) ? 1 : 0;
    return 0;
  }
  function rightAnswer(q) {
    const t = q.t || 'qcm';
    if (t === 'qcm') return q.o[q.a];
    if (t === 'multi') return q.a.map(i => q.o[i]).join(' · ');
    if (t === 'num') return fmt(q.a) + (q.u ? ' ' + esc(q.u) : '');
    if (t === 'fill') return '<pre class="code" style="margin:4px 0">' + q.code.split(/(\[\[.+?\]\])/g).map(seg => { const mm = seg.match(/^\[\[(.+?)\]\]$/); return mm ? '<b style="color:var(--r-green)">' + esc(mm[1].split('|')[0]) + '</b>' : esc(seg); }).join('') + '</pre>';
    if (t === 'order') return '<ol style="margin:4px 0">' + q.o.map(x => '<li>' + x + '</li>').join('') + '</ol>';
  }
  function userAnswer(x) {
    const q = x.q, t = q.t || 'qcm', a = x.ans;
    if (!hasAns(x)) return '<i>pas de réponse</i>';
    if (t === 'qcm') return q.o[a];
    if (t === 'multi') return a.map(i => q.o[i]).join(' · ');
    if (t === 'num') return esc(a) + (q.u ? ' ' + esc(q.u) : '');
    if (t === 'fill') { const B = blanks(q.code); return a.map((v, k) => `<code style="color:var(${B[k].some(al => norm(al, q.cs) === norm(v || '', q.cs)) ? '--r-green' : '--r-red'})">${esc(v || '∅')}</code>`).join(' '); }
    if (t === 'order') return '<ol style="margin:4px 0">' + x.order.map(i => '<li>' + q.o[i] + '</li>').join('') + '</ol>';
  }
  function reveal(it, t) {
    const sc = score(it), q = it.q;
    if (t === 'qcm' || t === 'multi') app.querySelectorAll('.opt').forEach(b => { const i = +b.dataset.i, good = t === 'multi' ? q.a.includes(i) : q.a === i, sel = t === 'multi' ? (it.ans || []).includes(i) : it.ans === i; if (good) b.classList.add('right'); else if (sel) b.classList.add('wrong'); b.classList.remove('sel'); });
    if (t === 'fill') { const B = blanks(q.code); app.querySelectorAll('pre.code input').forEach(inp => { const k = +inp.dataset.b; inp.classList.add(B[k].some(al => norm(al, q.cs) === norm(it.ans[k] || '', q.cs)) ? 'good' : 'bad'); }); }
    if (t === 'order') app.querySelectorAll('#ord li').forEach((li, k) => li.classList.add(it.order[k] === k ? 'right' : 'wrong'));
    const showRight = sc < .999 && (t === 'fill' || t === 'num' || t === 'order');
    app.querySelector('#fbx').innerHTML = `<div class="fb ${sc >= .999 ? '' : 'ko'}"><b>${sc >= .999 ? 'Juste.' : sc > 0 ? 'En partie juste.' : 'Faux.'}</b> ${showRight ? '<div>Réponse attendue : ' + rightAnswer(q) + '</div>' : ''}${q.e ? '<div>' + q.e + '</div>' : ''}<a class="report" href="${reportUrl(it)}" target="_blank" rel="noopener">⚑ Signaler une erreur dans cette question</a></div>`;
  }

  /* met à jour le carnet d'erreurs : faux → entre (revient dans 1 jour) ; juste → monte d'une case */
  function updateCarnet(R) {
    const now = Date.now(), log = { added: 0, up: 0, learnt: 0 };
    const seen = {};
    R.qs.forEach(x => {
      const id = x.q.id, ok = score(x) >= .999;
      if (seen[id]) return; seen[id] = 1;
      const c = store.carnet[id];
      if (!ok) { store.carnet[id] = { sem: R.s, box: 0, due: now + STEPS[0] * DAY, err: (c ? c.err : 0) + 1 }; if (!c) log.added++; }
      else if (c) { c.box++; if (c.box >= STEPS.length) { delete store.carnet[id]; log.learnt++; } else { c.due = now + STEPS[c.box] * DAY; log.up++; } }
    });
    return log;
  }

  function finish() {
    stopTimer();
    const R = RUN, dur = (Date.now() - R.t0) / 1000;
    const tot = R.qs.reduce((a, x) => a + score(x), 0), p = Math.round(tot / R.qs.length * 100);
    const per = {}; R.qs.forEach(x => { const k = x.q.m; per[k] = per[k] || { n: 0, s: 0 }; per[k].n++; per[k].s += score(x); });
    const log = updateCarnet(R);
    if (R.kind === 'test') {
      (store.hist[R.s] = store.hist[R.s] || []).push({ p, n: R.qs.length, d: new Date().toLocaleDateString('fr-FR'), t: Date.now() });
      store.hist[R.s] = store.hist[R.s].slice(-30);
    }
    /* stats par matière (lues par le tableau de bord de l'index) */
    store.mat[R.s] = store.mat[R.s] || {}; store.meta[R.s] = store.meta[R.s] || {};
    Object.entries(per).forEach(([k, v]) => {
      const a = store.mat[R.s][k] = store.mat[R.s][k] || []; a.push({ n: v.n, s: Math.round(v.s * 100) / 100, t: Date.now() }); store.mat[R.s][k] = a.slice(-20);
      const m = R.S.matieres[k] || {}; store.meta[R.s][k] = { nom: m.nom || k, couleur: m.couleur, site: m.site ? m.site.replace(/^\.\.\//, '') : '', fiche: !!m.fiche };
    });
    save();
    const C = 2 * Math.PI * 58, ringCol = p >= 75 ? 'var(--r-green)' : p >= 50 ? 'var(--r-amber)' : 'var(--r-red)';
    const rows = Object.entries(per).sort((a, b) => a[1].s / a[1].n - b[1].s / b[1].n).map(([k, v]) => {
      const m = R.S.matieres[k] || { nom: k }, pc = Math.round(v.s / v.n * 100);
      return `<div class="mrow"><span><b>${esc(m.nom)}</b> <span class="hint">${fmt(v.s)} / ${v.n}</span></span><div class="mbar"><i style="width:${pc}%;background:${col(m)}"></i></div><span class="pct">${pc} %</span><span class="mlinks">${m.site ? `<a href="${m.site}">Réviser</a>` : ''}${FICHES[R.s] && FICHES[R.s].includes(k) ? `<a href="../fiches-a4/index.html#${k}">Fiche A4</a>` : ''}</span></div>`;
    }).join('');
    const carnetTxt = [log.added && `${log.added} question${log.added > 1 ? 's' : ''} ajoutée${log.added > 1 ? 's' : ''} au carnet (retour demain)`, log.up && `${log.up} en progrès`, log.learnt && `${log.learnt} acquise${log.learnt > 1 ? 's' : ''} 🎉`].filter(Boolean).join(' · ');
    app.innerHTML = `<a class="back" href="#" id="bk">← Test ${R.s}</a>
      <div class="card score-hero"><svg class="ring" viewBox="0 0 140 140"><circle cx="70" cy="70" r="58" fill="none" stroke="var(--r-surface-3)" stroke-width="14"/><circle cx="70" cy="70" r="58" fill="none" stroke="${ringCol}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C * p / 100} ${C}" ${p ? '' : 'opacity="0"'} transform="rotate(-90 70 70)"/><text x="70" y="78" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="30" fill="currentColor">${p}%</text></svg>
      <div><p class="eyebrow">${R.kind === 'carnet' ? 'Carnet d\'erreurs' : 'Résultat'} · test ${R.s}</p><div class="big">${fmt(tot / R.qs.length * 20)} / 20</div><p class="hint">${fmt(tot)} point${tot > 1 ? 's' : ''} sur ${R.qs.length} · ${clock(dur)} min${R.chrono && dur >= R.limit ? ' · temps écoulé' : ''}</p>
      ${carnetTxt ? `<p class="hint">📒 ${carnetTxt}</p>` : ''}
      <div class="actions" style="margin-top:12px"><button class="btn" id="again">Nouveau test</button>${R.qs.some(x => score(x) < .999) ? '<button class="btn ghost" id="redo">Refaire mes erreurs maintenant</button>' : ''}</div></div></div>
      <h2>Par matière <span class="hint" style="font-family:var(--r-font-body);font-size:.9rem;font-weight:500">(de la plus faible à la plus forte)</span></h2><div class="card">${rows}</div>
      <h2>Correction</h2><div class="chips" id="flt"><button class="chip on" data-f="ko">Mes erreurs</button><button class="chip" data-f="all">Toutes les questions</button><button class="chip" data-f="flag">Marquées à revoir</button></div><div id="revs"></div>`;
    const revs = f => {
      app.querySelector('#revs').innerHTML = R.qs.map((x, k) => ({ x, k })).filter(({ x }) => f === 'all' || (f === 'ko' && score(x) < .999) || (f === 'flag' && x.flag)).map(({ x, k }) => {
        const q = x.q, sc = score(x), m = R.S.matieres[q.m] || { nom: q.m };
        return `<div class="rev ${sc >= .999 ? '' : 'ko'}"><div class="qmeta"><span class="qnum">#${k + 1}</span><span class="tag" style="color:${col(m)};border-color:${col(m)}">${esc(m.nom)}</span><span class="tag">${TYPES[q.t || 'qcm']}</span>${q.alea ? '<span class="tag">🎲</span>' : ''}<span class="tag ${sc >= .999 ? 'live' : ''}">${fmt(sc)} pt</span></div>
          <div class="qtext" style="font-size:1rem;margin:0">${q.q}</div>${q.code && q.t !== 'fill' ? `<pre class="code">${esc(q.code)}</pre>` : ''}
          <div class="ans"><div>Ta réponse : ${userAnswer(x)}</div>${sc < .999 ? `<div>Bonne réponse : ${rightAnswer(q)}</div>` : ''}</div>${q.e ? `<div class="exp">💡 ${q.e}</div>` : ''}<a class="report" href="${reportUrl(x)}" target="_blank" rel="noopener">⚑ Signaler une erreur</a></div>`;
      }).join('') || '<p class="hint">Rien à afficher ici 🎉</p>';
    };
    app.querySelectorAll('#flt .chip').forEach(c => c.onclick = () => { app.querySelectorAll('#flt .chip').forEach(x => x.classList.toggle('on', x === c)); revs(c.dataset.f); });
    revs('ko');
    app.querySelector('#bk').onclick = e => { e.preventDefault(); config(R.s); };
    app.querySelector('#again').onclick = () => config(R.s);
    const rd = app.querySelector('#redo'); if (rd) rd.onclick = () => start(R.s, R.mats, 0, 'train', false, shuffle(R.qs.filter(x => score(x) < .999).map(x => x.q)), 'redo');
    window.scrollTo({ top: 0 });
  }

  window.__testRun = () => RUN; /* utilisé pour les tests automatiques */
  /* ---------------- ROUTAGE ---------------- */
  /* #S3 ouvre le test S3 ; #S3-msi le préconfigure sur une seule matière */
  const route = () => { const [h, m] = location.hash.slice(1).split('-'); if (T[h]) config(h, m); else home(); };
  window.addEventListener('hashchange', () => { if (!RUN) route(); });
  window.addEventListener('beforeunload', e => { if (RUN && RUN.qs.some(x => hasAns(x)) && document.querySelector('.bar-top')) { e.preventDefault(); e.returnValue = ''; } });
  route();
})();

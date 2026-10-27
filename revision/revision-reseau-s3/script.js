/* ====== UI ====== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem("r306:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("r306:" + k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } }
};
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const stripTags = (s) => String(s).replace(/<[^>]+>/g, "");
function copyText(t, btn) {
  const done = () => { if (btn) { const o = btn.textContent; btn.textContent = "Copié"; setTimeout(() => (btn.textContent = o), 1200); } };
  try { navigator.clipboard.writeText(t).then(done, () => {}); } catch (e) { /* pas de presse-papiers */ }
}

/* ---------- navigation ---------- */
const VIEWS = ["fiches", "terminal", "quiz", "cartes", "exercices"];
function show(v) {
  if (!VIEWS.includes(v)) v = "fiches";
  $$(".view").forEach((x) => (x.hidden = x.id !== "v-" + v));
  $$(".tab").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.v === v)));
  if (v === "terminal" && window.matchMedia("(min-width: 900px)").matches) setTimeout(() => $("#t-input").focus(), 30);
}
window.addEventListener("hashchange", () => { show(location.hash.slice(1)); window.scrollTo(0, 0); });

/* =================== FICHES =================== */
let curFiche = store.get("fiche", "ios");
function cmdRow(it) {
  return `<div class="cmd${it.extra ? " extra" : ""}"><span class="pr" title="${esc(it.p)}">${esc(it.p)}</span><div class="cmd-main"><code class="cc">${esc(it.c)}</code>${it.s ? `<span class="ab" title="abréviation">${esc(it.s)}</span>` : ""}${it.extra ? '<span class="tag-x">complément</span>' : ""}${it.noType ? "" : `<button class="copy" data-copy="${esc(it.c)}">Copier</button>`}</div><p class="cd">${it.d}</p></div>`;
}
function renderFicheNav() {
  $("#f-nav").innerHTML = FICHES.map((f) => `<button class="side-btn" data-f="${f.id}" aria-current="${f.id === curFiche}"><span>${esc(f.title)}</span><small>${esc(f.tp)}</small></button>`).join("");
}
function renderFiche() {
  const f = FICHES.find((x) => x.id === curFiche) || FICHES[0];
  let html = `<div class="fiche-head"><div class="eyebrow">${esc(f.tp)}</div><h2>${esc(f.title)}</h2><p>${f.intro}</p></div>`;
  if (f.wildcard) html += wildcardTool();
  html += `<h3>À comprendre</h3>` + f.notes.map((n, i) => `<details class="note"${i === 0 ? " open" : ""}><summary>${esc(n.h)}</summary><div class="note-body">${n.html}</div></details>`).join("");
  for (const g of f.groups) html += `<h3>${esc(g.h)}</h3><div class="cmds">${g.items.map(cmdRow).join("")}</div>`;
  $("#f-content").innerHTML = html;
  if (f.wildcard) bindWildcard();
}
function wildcardTool() {
  return `<div class="tool"><label for="wc-in">Calculatrice de masque inversé</label>
  <div class="row"><input id="wc-in" type="text" value="10.3.3.1/25" placeholder="10.3.3.1/25, /30 ou 255.255.255.252" spellcheck="false"></div>
  <dl class="tool-out" id="wc-out"></dl></div>`;
}
function bindWildcard() {
  const inp = $("#wc-in"), out = $("#wc-out");
  const calc = () => {
    const v = inp.value.trim();
    let ip = null, len = null, m;
    if ((m = /^(\d+\.\d+\.\d+\.\d+)\s*\/\s*(\d{1,2})$/.exec(v))) { ip = m[1]; len = +m[2]; }
    else if ((m = /^\/?\s*(\d{1,2})$/.exec(v))) len = +m[1];
    else if ((m = /^(\d+\.\d+\.\d+\.\d+)\s+(\d+\.\d+\.\d+\.\d+)$/.exec(v)) && isMask(m[2])) { ip = m[1]; len = maskLen(m[2]); }
    else if (isMask(v)) len = maskLen(v);
    if (len === null || len > 32 || (ip && !isIP(ip))) { out.innerHTML = `<dt>?</dt><dd style="font-weight:400">Écris par exemple 10.3.3.1/25, /30 ou 255.255.255.128</dd>`; return; }
    const mask = lenMask(len);
    let r = `<dt>CIDR</dt><dd>/${len}</dd><dt>masque</dt><dd>${mask}</dd><dt>masque inversé</dt><dd>${wildcard(mask)}</dd><dt>hôtes</dt><dd>${len >= 31 ? (len === 32 ? 1 : 2) : Math.pow(2, 32 - len) - 2}</dd>`;
    if (ip) { const net = netOf(ip, len); r += `<dt>réseau</dt><dd>${net}</dd><dt>OSPF</dt><dd>network ${net} ${wildcard(mask)} area 0</dd>`; }
    out.innerHTML = r;
  };
  inp.addEventListener("input", calc); calc();
}
function searchFiches(q) {
  const t = q.toLowerCase();
  let html = "", n = 0;
  for (const f of FICHES) {
    const hits = [];
    for (const g of f.groups) for (const it of g.items) if ((it.c + " " + (it.s || "") + " " + stripTags(it.d) + " " + it.q).toLowerCase().includes(t)) hits.push(it);
    const notes = f.notes.filter((x) => (x.h + " " + stripTags(x.html)).toLowerCase().includes(t));
    if (!hits.length && !notes.length) continue;
    n += hits.length + notes.length;
    html += `<div class="search-hit-src">${esc(f.title)}</div>`;
    if (hits.length) html += `<div class="cmds">${hits.map(cmdRow).join("")}</div>`;
    html += notes.map((x) => `<details class="note" open><summary>${esc(x.h)}</summary><div class="note-body">${x.html}</div></details>`).join("");
  }
  $("#f-content").innerHTML = `<div class="fiche-head"><h2>Résultats pour « ${esc(q)} »</h2><p>${n} résultat${n > 1 ? "s" : ""}</p></div>` + (html || `<p class="empty">Rien trouvé. Essaie un mot de la commande (ospf, route, ufw, ldap…).</p>`);
}
function initFiches() {
  renderFicheNav(); renderFiche();
  $("#f-nav").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]"); if (!b) return;
    curFiche = b.dataset.f; store.set("fiche", curFiche); $("#f-search").value = "";
    renderFicheNav(); renderFiche();
    if (window.matchMedia("(max-width: 860px)").matches) $("#f-content").scrollIntoView({ block: "start" });
  });
  $("#f-search").addEventListener("input", (e) => { const q = e.target.value.trim(); if (q.length >= 2) searchFiches(q); else renderFiche(); });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-copy]"); if (b) copyText(b.dataset.copy, b); });
}

/* =================== TERMINAL =================== */
const T = { sc: null, sim: null, step: 0, hint: 0, hist: [], hi: 0 };
const doneSc = new Set(store.get("scDone", []));
function tPrint(text, cls = "out") {
  const out = $("#t-out");
  const d = document.createElement("div");
  d.className = "ln " + cls;
  d.textContent = text;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}
function tPrintIn(prompt, cmd) {
  const d = document.createElement("div");
  d.className = "ln in";
  const p = document.createElement("span"); p.className = "p"; p.textContent = prompt + " ";
  d.appendChild(p); d.appendChild(document.createTextNode(cmd));
  $("#t-out").appendChild(d); $("#t-out").scrollTop = $("#t-out").scrollHeight;
}
function renderPick() {
  $("#t-pick").innerHTML = SCENARIOS.map((s) => `<button class="sc-btn" data-sc="${s.id}" aria-current="${T.sc && T.sc.id === s.id}"><small>${esc(s.tag)}${doneSc.has(s.id) ? ' <span class="done-badge">✓ fait</span>' : ""}</small><b>${esc(s.title)}</b></button>`).join("");
}
function loadScenario(id) {
  T.sc = SCENARIOS.find((s) => s.id === id) || SCENARIOS[0];
  T.sim = T.sc.kind === "ios" ? new IOS(T.sc) : new Shell(T.sc);
  T.step = 0; T.hint = 0; T.lastX = null;
  store.set("sc", T.sc.id);
  $("#t-out").innerHTML = "";
  if (T.sc.kind === "ios") {
    $("#t-title").textContent = "console · " + T.sc.title;
    tPrint("Press RETURN to get started.", "sys");
  } else {
    $("#t-title").textContent = "terminal · " + T.sc.title;
    switchMachine(T.sc.steps[0].on, true);
  }
  renderPick(); renderMission(); updPrompt();
}
function switchMachine(m, silent) {
  if (!m || T.sim.cur === m && !silent) return;
  T.sim.cur = m;
  const M = T.sim.machines[m];
  tPrint(`── tu es maintenant sur ${M.name} ──`, "sys");
}
function updPrompt() { $("#t-prompt").textContent = T.sim.prompt(); }
function renderMission() {
  const sc = T.sc, st = sc.steps;
  const fin = T.step >= st.length;
  let html = `<div class="eyebrow">${esc(sc.tag)}</div><h2>${esc(sc.title)}</h2><p class="intro">${esc(sc.intro)}</p><ol class="steps">`;
  st.forEach((s, i) => {
    const cls = i < T.step ? "done" : i === T.step ? "cur" : "";
    html += `<li class="${cls}"><span>${esc(s.g)}${i < T.step ? `<span class="ans">${esc(s.a)}</span>` : ""}</span></li>`;
  });
  html += `</ol>`;
  if (fin) html += `<div class="feedback"><b>Mission terminée.</b> ${T.lastX ? esc(T.lastX) : ""}<br>Tu peux continuer à explorer, ou passer au scénario suivant.</div>`;
  else if (T.lastX) html += `<div class="feedback"><b>Bien.</b> ${esc(T.lastX)}</div>`;
  html += `<div class="row">${fin ? "" : `<button class="btn" id="t-hint">Indice</button><button class="btn" id="t-fill">Écrire la réponse</button>`}<button class="btn ghost" id="t-reset">Recommencer</button>${fin ? `<button class="btn primary" id="t-next">Scénario suivant</button>` : ""}</div>`;
  $("#t-mission").innerHTML = html;
  $("#t-goal").innerHTML = fin ? "★ Mission terminée" : `<span>Étape ${T.step + 1}/${st.length}</span> ${esc(st[T.step].g)}`;
}
function giveHint() {
  const s = T.sc.steps[T.step];
  if (!s) return;
  T.hint++;
  if (T.hint === 1) tPrint("↳ Indice : la commande commence par « " + s.a.split(" ").slice(0, s.a.startsWith("sudo") || s.a.startsWith("do ") ? 2 : 1).join(" ") + " … »", "tip");
  else tPrint("↳ Réponse : " + s.a, "tip");
}
function tExec(line) {
  tPrintIn(T.sim.prompt(), line);
  if (line.trim()) { T.hist.push(line); T.hi = T.hist.length; }
  if (/^(indice|hint)$/i.test(line.trim())) { giveHint(); return; }
  const r = T.sim.exec(line);
  if (r.clear) { $("#t-out").innerHTML = ""; return; }
  if (r.hintReq) { giveHint(); return; }
  if (r.out) tPrint(r.out, r.ok ? "out" : "err");
  if (r.hint) tPrint("↳ " + r.hint, "tip");
  if (r.explain) tPrint("↳ " + r.explain, "tip");
  checkSteps(r);
  updPrompt();
}
function checkSteps(r) {
  const st = T.sc.steps;
  const cur = st[T.step];
  if (!cur) return;
  let adv = false, rr = r;
  while (T.step < st.length && st[T.step].ok(T.sim, rr)) {
    T.lastX = st[T.step].x || null;
    T.step++; T.hint = 0; adv = true; rr = {};
    if (T.sc.kind === "shell" && st[T.step] && st[T.step].on !== T.sim.cur) switchMachine(st[T.step].on);
  }
  if (adv) {
    tPrint("✓ étape validée", "ok");
    if (T.step >= st.length) { tPrint("★ Mission terminée !", "ok"); doneSc.add(T.sc.id); store.set("scDone", Array.from(doneSc)); renderPick(); }
    renderMission();
  } else if (cur.id && r.id === cur.id && r.ok) {
    tPrint("↳ Commande valide, mais pas avec les valeurs demandées : relis la consigne.", "tip");
  }
}
function initTerminal() {
  renderPick();
  loadScenario(store.get("sc", SCENARIOS[0].id));
  $("#t-pick").addEventListener("click", (e) => { const b = e.target.closest("[data-sc]"); if (b) { loadScenario(b.dataset.sc); $("#t-input").focus(); } });
  $("#t-form").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#t-input").value; $("#t-input").value = ""; tExec(v); });
  $("#t-out").addEventListener("click", () => { if (!window.getSelection().toString()) $("#t-input").focus(); });
  $("#t-mission").addEventListener("click", (e) => {
    if (e.target.id === "t-hint") giveHint();
    if (e.target.id === "t-fill") { const s = T.sc.steps[T.step]; if (s) { $("#t-input").value = s.a; $("#t-input").focus(); } }
    if (e.target.id === "t-reset") loadScenario(T.sc.id);
    if (e.target.id === "t-next") { const i = SCENARIOS.indexOf(T.sc); loadScenario(SCENARIOS[(i + 1) % SCENARIOS.length].id); }
  });
  $("#t-input").addEventListener("keydown", (e) => {
    const inp = e.target;
    if (e.key === "ArrowUp") { if (T.hi > 0) { T.hi--; inp.value = T.hist[T.hi]; } e.preventDefault(); }
    else if (e.key === "ArrowDown") { if (T.hi < T.hist.length - 1) { T.hi++; inp.value = T.hist[T.hi]; } else { T.hi = T.hist.length; inp.value = ""; } e.preventDefault(); }
    else if (e.key === "Tab") {
      e.preventDefault();
      if (T.sc.kind !== "ios") return;
      const parts = inp.value.split(" "); const last = parts[parts.length - 1].toLowerCase();
      if (!last) return;
      const prev = parts.length > 1 ? resolveTok(parts[parts.length - 2], "", 1) : "";
      const pool = KW.map((k) => k[0]).concat(prev === "configure" ? ["terminal"] : []).concat(["terminal", "shutdown"]);
      const c = Array.from(new Set(pool.filter((w) => w.startsWith(last))));
      if (c.length === 1) { parts[parts.length - 1] = c[0]; inp.value = parts.join(" ") + " "; }
      else if (c.length > 1) tPrint(c.join("  "), "sys");
    }
  });
}

/* =================== QUIZ =================== */
const QZ = { theme: store.get("qTheme", "all"), mode: store.get("qMode", "qcm"), n: store.get("qN", 15), items: [], i: 0, score: 0, wrong: [], answered: false };
function quizSetup() {
  const themes = [["all", "Tout"]].concat(Object.entries(QUIZ_THEMES));
  const best = store.get("best", {});
  const key = QZ.mode + ":" + QZ.theme;
  $("#q-root").innerHTML = `<div class="panel setup qbox">
    <div><div class="lbl">Type</div><div class="chips" id="q-mode">${[["qcm", "QCM"], ["order", "Remettre dans l'ordre"], ["wild", "Masques inversés"]].map(([k, l]) => `<button class="chip" data-m="${k}" aria-pressed="${QZ.mode === k}">${l}</button>`).join("")}</div></div>
    ${QZ.mode === "wild" ? "" : `<div><div class="lbl">Thème</div><div class="chips" id="q-theme">${themes.map(([k, l]) => `<button class="chip" data-t="${k}" aria-pressed="${QZ.theme === k}">${l}</button>`).join("")}</div></div>`}
    <div><div class="lbl">Nombre de questions</div><div class="chips" id="q-n">${[10, 15, 25, 999].map((n) => `<button class="chip" data-n="${n}" aria-pressed="${QZ.n === n}">${n === 999 ? "Toutes" : n}</button>`).join("")}</div></div>
    <div class="row"><button class="btn primary" id="q-start">Commencer</button><span class="progress-line">${poolFor().length} question${poolFor().length > 1 ? "s" : ""} disponibles${best[key] ? " · meilleur score : " + best[key] : ""}</span></div>
  </div>`;
}
function poolFor() {
  if (QZ.mode === "wild") return new Array(QZ.n === 999 ? 20 : QZ.n).fill(0);
  if (QZ.mode === "order") return ORDER.filter((o) => QZ.theme === "all" || o.t === QZ.theme);
  return QCM.filter((q) => QZ.theme === "all" || q[0] === QZ.theme);
}
function genWild() {
  const lens = [8, 12, 16, 16, 20, 22, 23, 24, 24, 25, 26, 27, 28, 29, 30, 30];
  const len = lens[Math.floor(Math.random() * lens.length)];
  const firsts = [10, 172, 192];
  const f = firsts[Math.floor(Math.random() * 3)];
  const ip = f === 10 ? `10.${rnd(0, 255)}.${rnd(0, 255)}.${rnd(1, 254)}` : f === 172 ? `172.${rnd(16, 31)}.${rnd(0, 255)}.${rnd(1, 254)}` : `192.168.${rnd(0, 255)}.${rnd(1, 254)}`;
  const net = netOf(ip, len), mask = lenMask(len), wc = wildcard(mask);
  const kind = Math.random();
  if (kind < 0.35) return { type: "typed", q: `Masque inversé correspondant au masque <code>${mask}</code> ?`, ans: [wc], show: wc, e: `255.255.255.255 − ${mask} = ${wc}.` };
  if (kind < 0.65) return { type: "typed", q: `Une interface a l'adresse <code>${ip}/${len}</code>. Quelle est l'adresse du réseau ?`, ans: [net], show: net, e: `On garde les ${len} premiers bits : ${net}/${len} (masque ${mask}).` };
  return { type: "typed", cisco: true, q: `Écris la commande qui annonce dans OSPF, zone 0, le réseau de l'interface <code>${ip}/${len}</code>.`, ans: [`network ${net} ${wc} area 0`], show: `network ${net} ${wc} area 0`, e: `Réseau ${net}, masque ${mask} → masque inversé ${wc}.` };
}
function looksCmd(c) { return /^(R1[(#>]|show |network |ip |sudo |ldap|route |no shutdown|enable$|write |configure|interface|clock|ping|tracert|traceroute|netstat|ss |\/etc|dc=|cn=|-[a-zA-Z] |0\.|255\.|\d+\.\d+|FULL|slapd|top$|root$|person$|dcObject$)/.test(c); }
function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function quizStart(items) {
  if (items) QZ.items = items;
  else if (QZ.mode === "wild") QZ.items = poolFor().map(genWild);
  else if (QZ.mode === "order") QZ.items = shuffle(poolFor()).slice(0, QZ.n).map((o) => ({ type: "order", q: o.h, steps: o.steps }));
  else QZ.items = shuffle(poolFor()).slice(0, QZ.n).map((x) => ({ type: "qcm", q: x[1], good: x[2][0], choices: shuffle(x[2]), e: x[3], t: x[0] }));
  QZ.i = 0; QZ.score = 0; QZ.wrong = [];
  quizRender();
}
function quizRender() {
  const it = QZ.items[QZ.i];
  if (!it) return quizEnd();
  QZ.answered = false;
  const N = QZ.items.length;
  let html = `<div class="qbox panel"><div class="qmeta"><span>Question ${QZ.i + 1} / ${N}</span><span>score ${QZ.score}</span></div><div class="bar"><i style="width:${(QZ.i / N) * 100}%"></i></div>`;
  if (it.type === "qcm") {
    html += `<p class="qtext">${it.q}</p><div class="opts">${it.choices.map((c, k) => `<button class="opt" data-k="${k}"><span class="n">${k + 1}</span><span>${looksCmd(c) ? `<code>${esc(c)}</code>` : esc(c)}</span></button>`).join("")}</div>`;
  } else if (it.type === "order") {
    it.pool = it.pool || shuffle(it.steps.map((s, k) => ({ s, k })));
    it.seq = it.seq || [];
    html += `<p class="qtext">Remets dans l'ordre : ${esc(it.q)}</p><div class="seq" id="q-seq">${it.seq.map((x, i) => `<button class="it" data-u="${i}"><span class="n">${i + 1}</span>${esc(x.s)}</button>`).join("")}</div><div class="pool" id="q-pool">${it.pool.filter((x) => !it.seq.includes(x)).map((x) => `<button class="it" data-p="${x.k}">${esc(x.s)}</button>`).join("")}</div><div class="row" style="margin-top:12px"><button class="btn primary" id="q-check" ${it.seq.length === it.steps.length ? "" : "disabled"}>Vérifier</button><button class="btn ghost" id="q-undo">Annuler le dernier</button></div>`;
  } else {
    html += `<p class="qtext">${it.q}</p><form class="ansin" id="q-form"><input type="text" id="q-ans" spellcheck="false" autocomplete="off" placeholder="ta réponse"><button class="btn primary">Valider</button></form>`;
  }
  html += `<div id="q-fb"></div></div>`;
  $("#q-root").innerHTML = html;
  const a = $("#q-ans"); if (a) a.focus();
}
function quizFeedback(ok, e, extra) {
  QZ.answered = true;
  const it = QZ.items[QZ.i];
  if (ok) QZ.score++; else QZ.wrong.push(it);
  $("#q-fb").innerHTML = `<div class="expl"><span class="verdict ${ok ? "y" : "n"}">${ok ? "Juste." : "Faux."}</span>${extra || ""}${esc(e || "")}</div><div class="row" style="margin-top:12px"><button class="btn primary" id="q-next">${QZ.i + 1 < QZ.items.length ? "Question suivante" : "Voir le résultat"}</button><span class="kbd-hint"><kbd>Entrée</kbd></span></div>`;
  $("#q-next").focus();
}
function quizEnd() {
  const N = QZ.items.length, s = QZ.score;
  const key = QZ.mode + ":" + QZ.theme;
  const best = store.get("best", {});
  const pct = Math.round((s / N) * 100);
  if (!best[key] || parseInt(best[key]) < pct) { best[key] = pct + " %"; store.set("best", best); }
  const msg = pct >= 90 ? "Prêt pour le contrôle sur ce thème." : pct >= 65 ? "Solide. Revois les erreurs ci-dessous." : "Repasse par les fiches de ce thème, puis réessaie.";
  let html = `<div class="qbox panel"><div class="eyebrow">Résultat</div><div class="score-big">${s} / ${N}</div><p>${msg}</p><div class="row"><button class="btn primary" id="q-again">Nouveau quiz</button>${QZ.wrong.length ? `<button class="btn" id="q-redo">Refaire mes ${QZ.wrong.length} erreur${QZ.wrong.length > 1 ? "s" : ""}</button>` : ""}<button class="btn ghost" id="q-setup">Changer de thème</button></div>`;
  if (QZ.wrong.length) html += `<h3>À revoir</h3><div class="recap">${QZ.wrong.map((w) => `<div><b>${w.type === "order" ? "Ordre : " + esc(w.q) : stripTags(w.q)}</b>${w.type === "qcm" ? "Réponse : " + esc(w.good) + ". " + esc(w.e) : w.type === "order" ? w.steps.map((x, i) => i + 1 + ". " + esc(x)).join(" → ") : "Réponse : <code>" + esc(w.show) + "</code>. " + esc(w.e)}</div>`).join("")}</div>`;
  $("#q-root").innerHTML = html + "</div>";
}
function initQuiz() {
  quizSetup();
  const root = $("#q-root");
  root.addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.m) { QZ.mode = t.dataset.m; store.set("qMode", QZ.mode); return quizSetup(); }
    if (t.dataset.t) { QZ.theme = t.dataset.t; store.set("qTheme", QZ.theme); return quizSetup(); }
    if (t.dataset.n) { QZ.n = +t.dataset.n; store.set("qN", QZ.n); return quizSetup(); }
    if (t.id === "q-start" || t.id === "q-again") return quizStart();
    if (t.id === "q-setup") return quizSetup();
    if (t.id === "q-redo") { const w = QZ.wrong.map((x) => Object.assign({}, x, { pool: null, seq: null })); return quizStart(shuffle(w)); }
    if (t.id === "q-next") { QZ.i++; return quizRender(); }
    const it = QZ.items[QZ.i];
    if (t.classList.contains("opt") && !QZ.answered) {
      const k = +t.dataset.k, ok = it.choices[k] === it.good;
      $$(".opt").forEach((b, j) => { b.disabled = true; if (it.choices[j] === it.good) b.classList.add("good"); });
      if (!ok) t.classList.add("badc");
      return quizFeedback(ok, it.e);
    }
    if (it && it.type === "order" && !QZ.answered) {
      if (t.dataset.p !== undefined) { it.seq.push(it.pool.find((x) => x.k === +t.dataset.p)); return quizRender(); }
      if (t.dataset.u !== undefined) { it.seq.splice(+t.dataset.u, 1); return quizRender(); }
      if (t.id === "q-undo") { it.seq.pop(); return quizRender(); }
      if (t.id === "q-check") {
        const ok = it.seq.every((x, i) => x.k === i);
        $$("#q-seq .it").forEach((b, i) => b.classList.add(it.seq[i].k === i ? "good" : "badc"));
        $$("#q-root button.it, #q-check, #q-undo").forEach((b) => (b.disabled = true));
        return quizFeedback(ok, "", ok ? "" : "Ordre attendu : " + it.steps.map((x, i) => `${i + 1}. ${esc(x)}`).join(" → ") + " ");
      }
    }
  });
  root.addEventListener("submit", (e) => {
    e.preventDefault();
    if (QZ.answered) return;
    const it = QZ.items[QZ.i], v = $("#q-ans").value.trim();
    if (!v) return;
    const ok = it.cisco ? it.ans.some((a) => lc(canon(a)) === lc(canon(v))) : it.ans.includes(v.replace(/\s+/g, ""));
    $("#q-ans").disabled = true;
    quizFeedback(ok, it.e, ok ? "" : `Réponse : <code>${esc(it.show)}</code>. `);
  });
  document.addEventListener("keydown", (e) => {
    if ($("#v-quiz").hidden) return;
    if (e.key === "Enter" && QZ.answered && $("#q-next") && document.activeElement.tagName !== "BUTTON") { e.preventDefault(); $("#q-next").click(); }
    if (/^[1-4]$/.test(e.key) && !QZ.answered && document.activeElement.tagName !== "INPUT") { const b = $(`.opt[data-k="${+e.key - 1}"]`); if (b) b.click(); }
  });
}

/* =================== CARTES =================== */
const CARDS_CMD = FICHES.flatMap((f) => f.groups.flatMap((g) => g.items.filter((it) => it.q && !it.noType && it.p !== "Wireshark").map((it) => ({ id: "c:" + it.c, theme: f.id, kind: it.kind || f.kind, front: it.q, c: it.c, alt: it.alt || [], p: it.p, d: it.d }))));
const CARDS_TH = QCM.map((q, i) => ({ id: "t:" + i, theme: q[0] === "ios" ? "ios" : q[0], front: q[1], c: q[2][0], d: q[3], th: true }));
const CK = { set: store.get("cSet", "cmd"), theme: store.get("cTheme", "all"), typed: store.get("cTyped", false), deck: [], cur: null, flipped: false, known: new Set(store.get("known", [])) };
const CARD_THEMES = { all: "Tout", ios: "Cisco IOS", ospf: "OSPF", linux: "Routage Linux", firewall: "Pare-feu", ldap: "LDAP" };
function cardPool() { return (CK.set === "cmd" ? CARDS_CMD : CARDS_TH).filter((c) => CK.theme === "all" || c.theme === CK.theme); }
function buildDeck() { const p = cardPool(); CK.deck = shuffle(p.filter((c) => !CK.known.has(c.id))); CK.cur = CK.deck.shift() || null; CK.flipped = false; }
function normCmd(s) { return String(s).trim().replace(/["']/g, "").replace(/\s+/g, " ").replace(/,\s+/g, ",").toLowerCase(); }
function sameCmd(v, card) {
  const cands = [card.c].concat(card.alt);
  if (card.kind === "cisco") return cands.some((c) => lc(canon(c)) === lc(canon(v))) ? "ok" : "no";
  if (cands.some((c) => normCmd(c) === normCmd(v))) return "ok";
  if (cands.some((c) => normCmd(c).replace(/^sudo /, "") === normCmd(v).replace(/^sudo /, ""))) return "sudo";
  return "no";
}
function cardsRender() {
  const pool = cardPool();
  const known = pool.filter((c) => CK.known.has(c.id)).length;
  let html = `<div class="panel setup card-wrap" style="margin-bottom:16px">
   <div class="chips" id="c-set"><button class="chip" data-s="cmd" aria-pressed="${CK.set === "cmd"}">Commandes</button><button class="chip" data-s="th" aria-pressed="${CK.set === "th"}">Notions de cours</button></div>
   <div class="chips" id="c-theme">${Object.entries(CARD_THEMES).map(([k, l]) => `<button class="chip" data-t="${k}" aria-pressed="${CK.theme === k}">${l}</button>`).join("")}</div>
   ${CK.set === "cmd" ? `<label class="row" style="gap:8px;cursor:pointer"><input type="checkbox" id="c-typed" ${CK.typed ? "checked" : ""}> Écrire la commande au lieu de retourner la carte</label>` : ""}
  </div><div class="card-wrap"><div class="progress-line">${known} / ${pool.length} connues · ${CK.deck.length + (CK.cur ? 1 : 0)} dans le paquet</div>`;
  if (!CK.cur) {
    html += `<div class="card"><div class="front">${pool.length ? "Tu connais toutes les cartes de ce paquet." : "Aucune carte pour ce choix."}</div><div class="row"><button class="btn" id="c-reset">Remettre toutes les cartes</button></div></div></div>`;
    $("#c-root").innerHTML = html; return;
  }
  const c = CK.cur;
  html += `<div class="card"><div class="side-lbl">${c.th ? "Question" : "Consigne"}</div><div class="front">${c.th ? c.front : esc(c.front)}</div>${!c.th && c.p ? `<div class="where">à taper dans : ${esc(c.p)}</div>` : ""}`;
  if (CK.set === "cmd" && CK.typed && !CK.flipped) {
    html += `<form class="ansin" id="c-form"><input type="text" id="c-ans" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="ta commande"><button class="btn primary">Vérifier</button></form>`;
  }
  if (CK.flipped) {
    html += `<div class="back">${CK.verdict || ""}<div class="side-lbl">Réponse</div>${c.th ? `<div style="font-weight:600;margin-top:4px">${esc(c.c)}</div>` : `<code class="cc">${esc(c.c)}</code>`}<p>${c.d}</p></div>
    <div class="row"><button class="btn" id="c-again">À revoir</button><button class="btn primary" id="c-know">Je savais</button></div>`;
  } else if (!(CK.set === "cmd" && CK.typed)) html += `<div class="row"><button class="btn primary" id="c-flip">Voir la réponse</button></div>`;
  html += `</div><p class="kbd-hint"><kbd>Espace</kbd> retourner · <kbd>1</kbd> à revoir · <kbd>2</kbd> je savais</p><div class="row" style="margin-top:8px"><button class="btn ghost" id="c-reset">Remettre toutes les cartes</button></div></div>`;
  $("#c-root").innerHTML = html;
  const a = $("#c-ans"); if (a) a.focus();
}
function initCards() {
  buildDeck(); cardsRender();
  const root = $("#c-root");
  root.addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.s) { CK.set = t.dataset.s; store.set("cSet", CK.set); buildDeck(); return cardsRender(); }
    if (t.dataset.t) { CK.theme = t.dataset.t; store.set("cTheme", CK.theme); buildDeck(); return cardsRender(); }
    if (t.id === "c-flip") { CK.flipped = true; CK.verdict = ""; return cardsRender(); }
    if (t.id === "c-know") { CK.known.add(CK.cur.id); store.set("known", Array.from(CK.known)); CK.cur = CK.deck.shift() || null; CK.flipped = false; return cardsRender(); }
    if (t.id === "c-again") { CK.deck.splice(Math.min(3, CK.deck.length), 0, CK.cur); CK.cur = CK.deck.shift(); CK.flipped = false; return cardsRender(); }
    if (t.id === "c-reset") { cardPool().forEach((c) => CK.known.delete(c.id)); store.set("known", Array.from(CK.known)); buildDeck(); return cardsRender(); }
  });
  root.addEventListener("change", (e) => { if (e.target.id === "c-typed") { CK.typed = e.target.checked; store.set("cTyped", CK.typed); CK.flipped = false; cardsRender(); } });
  root.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = $("#c-ans").value.trim(); if (!v) return;
    const r = sameCmd(v, CK.cur);
    CK.verdict = r === "ok" ? `<p class="verdict y">Juste.</p>` : r === "sudo" ? `<p class="verdict y">Juste, mais n'oublie pas <code>sudo</code>.</p>` : `<p class="verdict n">Pas tout à fait. Tu as écrit : <code>${esc(v)}</code></p>`;
    CK.flipped = true; cardsRender();
  });
  document.addEventListener("keydown", (e) => {
    if ($("#v-cartes").hidden || document.activeElement.tagName === "INPUT") return;
    if (e.key === " " && $("#c-flip")) { e.preventDefault(); $("#c-flip").click(); }
    if (e.key === "1" && $("#c-again")) $("#c-again").click();
    if (e.key === "2" && $("#c-know")) $("#c-know").click();
  });
}

/* =================== EXERCICES =================== */
let curEx = store.get("ex", EXERCICES[0].id);
function exNav() {
  $("#e-nav").innerHTML = EXERCICES.map((x, i) => `<button class="side-btn" data-e="${x.id}" aria-current="${x.id === curEx}"><span>${esc(x.title)}</span><small>${esc(x.tp)}</small></button>`).join("");
}
function partExpected(p) {
  if (p.kind === "cisco") {
    const req = compileExpected(ciscoStructure(p.sol), lc);
    const opt = compileExpected((p.opt || []).map((o) => "?" + o), lc);
    const isOpt = (e) => opt.some((o) => o.variants.some((v) => v.re.test(e.variants[0].n)));
    return req.filter((e) => !isOpt(e)).concat(opt);
  }
  return compileExpected(p.exp, p.kind === "ldif" ? normLdif : normText);
}
function userLines(p, text) {
  if (p.kind === "cisco") return ciscoStructure(text);
  if (p.kind === "ldif") return text.split(/\r?\n/).map(normLdif).filter((l) => l && !l.startsWith("#"));
  return text.split(/\r?\n/).map(normText).filter(Boolean);
}
function solutionHtml(p) {
  if (p.kind === "cisco") return `<pre class="cfg">${esc(p.sol)}</pre>${p.opt && p.opt.length ? `<p class="alts">Facultatif (accepté) : ${p.opt.map((o) => "<code>" + esc(o.replace(/^\* » /, "").replace(/\*$/, "…")) + "</code>").join(", ")}. Les abréviations (conf t, int g0/0, no sh, wr, do wr…) sont acceptées.</p>` : ""}`;
  const main = p.exp.map((l) => (l.startsWith("?") ? l.slice(1).split(" | ")[0] + "   (facultatif)" : l.split(" | ")[0]));
  const alts = p.exp.filter((l) => l.includes(" | ")).map((l) => l.replace(/^\?/, "").split(" | ").slice(1).map((x) => "<code>" + esc(x) + "</code>").join(" ou "));
  return `<pre class="cfg">${esc(main.join("\n"))}</pre>${alts.length ? `<p class="alts">Aussi accepté : ${alts.join(" · ")}</p>` : ""}`;
}
function exRender() {
  const x = EXERCICES.find((e) => e.id === curEx) || EXERCICES[0];
  const drafts = store.get("drafts", {});
  let html = `<div class="ex-body"><section><div class="eyebrow">${esc(x.tp)}</div><h2>${esc(x.title)}</h2>${x.enonce}`;
  if (x.table) html += `<table class="t"><tr>${x.table[0].map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${x.table.slice(1).map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>`;
  html += `</section><section>`;
  x.parts.forEach((p, i) => {
    const k = x.id + ":" + i;
    html += `<div class="part"><div class="part-head"><b>${esc(p.label)}</b><span class="alts">${p.kind === "cisco" ? "une commande par ligne, abréviations acceptées" : p.kind === "ldif" ? "une ligne « attribut: valeur » par ligne" : "une commande par ligne"}</span></div>
      <textarea id="ta-${i}" data-k="${k}" spellcheck="false" autocapitalize="off" placeholder="${p.kind === "cisco" ? "enable\nconfigure terminal\n…" : p.kind === "ldif" ? "dn: …" : "…"}">${esc(drafts[k] || "")}</textarea>
      <div class="row" style="margin-top:8px"><button class="btn primary" data-check="${i}">Corriger</button><button class="btn" data-sol="${i}">Voir la correction</button><button class="btn ghost" data-clear="${i}">Effacer</button></div>
      <div id="res-${i}"></div><div id="sol-${i}"></div></div>`;
  });
  html += `</section><section class="qa"><h3>Questions du sujet</h3>${x.questions.map((q) => `<details><summary>${q[0]}</summary><div class="a">${q[1]}</div></details>`).join("")}</section></div>`;
  $("#e-content").innerHTML = html;
}
function exCheck(i) {
  const x = EXERCICES.find((e) => e.id === curEx), p = x.parts[i];
  const text = $("#ta-" + i).value;
  const exp = partExpected(p);
  const r = compareLines(userLines(p, text), exp, p.order);
  const req = exp.filter((e) => !e.optional).length;
  const okReq = r.ok.filter((e) => !e.optional).length;
  const show = (l) => (p.kind === "cisco" ? prettyItem(l) : l);
  let html = `<div class="result"><div class="sc">${okReq} / ${req} lignes attendues trouvées${r.extra.length ? ` · ${r.extra.length} en trop ou différente${r.extra.length > 1 ? "s" : ""}` : ""}${okReq === req && !r.extra.length && !r.orderErr.length ? " · parfait" : ""}</div><ul class="res-list">`;
  html += r.missing.map((e) => `<li class="m">${esc(show(e.label))}</li>`).join("");
  html += r.extra.map((e) => `<li class="x">${esc(show(e))}</li>`).join("");
  html += r.orderErr.map((w) => `<li class="w">${esc(w)}</li>`).join("");
  html += r.ok.map((e) => `<li class="o">${esc(show(e.label))}</li>`).join("");
  html += `</ul></div>`;
  $("#res-" + i).innerHTML = html;
}
function initEx() {
  exNav(); exRender();
  $("#e-nav").addEventListener("click", (e) => { const b = e.target.closest("[data-e]"); if (!b) return; curEx = b.dataset.e; store.set("ex", curEx); exNav(); exRender(); if (window.matchMedia("(max-width: 860px)").matches) $("#e-content").scrollIntoView({ block: "start" }); });
  $("#e-content").addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.check !== undefined) exCheck(+t.dataset.check);
    if (t.dataset.sol !== undefined) { const i = +t.dataset.sol, el = $("#sol-" + i); const p = EXERCICES.find((x) => x.id === curEx).parts[i]; el.innerHTML = el.innerHTML ? "" : `<div class="sol"><div class="side-lbl eyebrow">Correction</div>${solutionHtml(p)}</div>`; }
    if (t.dataset.clear !== undefined) { const ta = $("#ta-" + t.dataset.clear); ta.value = ""; ta.dispatchEvent(new Event("input", { bubbles: true })); $("#res-" + t.dataset.clear).innerHTML = ""; }
  });
  $("#e-content").addEventListener("input", (e) => { if (e.target.dataset.k) { const d = store.get("drafts", {}); d[e.target.dataset.k] = e.target.value; store.set("drafts", d); } });
}

/* ---------- intégration au site : masquer la barre d'outils pendant la saisie ---------- */
$("#t-input").addEventListener("focus", () => document.body.classList.add("term-focus"));
$("#t-input").addEventListener("blur", () => document.body.classList.remove("term-focus"));

/* ---------- démarrage ---------- */
initFiches(); initTerminal(); initQuiz(); initCards(); initEx();
show(location.hash.slice(1));

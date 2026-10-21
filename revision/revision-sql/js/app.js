/* ============ Carnet de vol SQL : logique ============ */
(function () {
"use strict";

/* ---------- utilitaires ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const store = {
  get(k, d) { try { const v = localStorage.getItem("cvsql_" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("cvsql_" + k, JSON.stringify(v)); } catch (e) {} },
};
const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const modById = Object.fromEntries(MODULES.map((m) => [m.id, m]));
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 2200); }

/* ---------- coloration SQL ---------- */
const KW = ("SELECT FROM WHERE AND OR NOT IN IS NULL LIKE BETWEEN EXISTS ANY ALL DISTINCT AS ON JOIN INNER LEFT RIGHT FULL OUTER " +
  "GROUP BY HAVING ORDER ASC DESC UNION INTERSECT MINUS INSERT INTO VALUES UPDATE SET DELETE TRUNCATE TABLE CREATE OR REPLACE " +
  "VIEW INDEX DROP ALTER ADD MODIFY RENAME COLUMN TO CONSTRAINT CONSTRAINTS PRIMARY KEY FOREIGN REFERENCES UNIQUE CHECK DEFAULT " +
  "CASCADE WITH OPTION GRANT REVOKE PUBLIC ROLE CONNECT PRIOR START LEVEL DECLARE BEGIN END IF THEN ELSIF ELSE CASE WHEN LOOP " +
  "EXIT WHILE FOR REVERSE CURSOR OPEN FETCH CLOSE EXCEPTION RAISE PRAGMA EXCEPTION_INIT OTHERS RETURN RETURNING PROCEDURE FUNCTION " +
  "PACKAGE BODY TRIGGER BEFORE AFTER INSTEAD OF EACH ROW STATEMENT COMPOUND FOLLOWS REFERENCING NEW OLD IS TYPE RECORD SUBTYPE " +
  "CONSTANT EXECUTE VARIABLE PRINT ACCEPT PROMPT COMMIT ROLLBACK TRANSACTION ISOLATION SERIALIZABLE READ COMMITTED " +
  "GENERATED ALWAYS VIRTUAL NOCYCLE SIBLINGS CURRENT UPDATE ENABLE DISABLE TRIGGERS SCHEMA DATABASE EXPLAIN PLAN STORAGE " +
  "NUMBER VARCHAR2 CHAR INTEGER DATE BOOLEAN NOT").split(" ");
const KWSET = new Set(KW);
const FN = new Set("COUNT SUM AVG MIN MAX NVL NVL2 DECODE SUBSTR LPAD UPPER LENGTH TRUNC ROUND TO_DATE TO_CHAR SYSDATE MONTHS_BETWEEN EXTRACT ROWNUM DBMS_OUTPUT PUT_LINE RAISE_APPLICATION_ERROR SQLCODE SQLERRM NO_DATA_FOUND TOO_MANY_ROWS DUP_VAL_ON_INDEX USER DUAL".split(" "));
function hl(src) {
  const re = /(--[^\n]*)|('(?:[^']|'')*')|(%(?:TYPE|ROWTYPE|NOTFOUND|FOUND|ROWCOUNT|ISOPEN))|(:(?:NEW|OLD|new|old)\b)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_$#]*)|([\s\S])/g;
  let out = "", m;
  while ((m = re.exec(src))) {
    if (m[1]) out += '<span class="cm">' + esc(m[1]) + "</span>";
    else if (m[2]) out += '<span class="st">' + esc(m[2]) + "</span>";
    else if (m[3] || m[4]) out += '<span class="bd">' + esc(m[3] || m[4]) + "</span>";
    else if (m[5]) out += '<span class="nu">' + m[5] + "</span>";
    else if (m[6]) { const u = m[6].toUpperCase(); out += KWSET.has(u) ? '<span class="kw">' + m[6] + "</span>" : FN.has(u) ? '<span class="nu">' + m[6] + "</span>" : esc(m[6]); }
    else out += esc(m[7]);
  }
  return out;
}
function codeBox(sql, cap) {
  return (cap ? '<div class="code-cap">' + esc(cap) + "</div>" : "") +
    '<div class="code-box"><pre class="sql">' + hl(sql) + '</pre><button class="copy" type="button">Copier</button></div>';
}
document.addEventListener("click", (e) => {
  const b = e.target.closest(".copy"); if (!b) return;
  const txt = b.previousElementSibling.textContent;
  const done = () => { b.textContent = "Copié"; setTimeout(() => (b.textContent = "Copier"), 1200); };
  try {
    navigator.clipboard.writeText(txt).then(done, () => { selectText(b.previousElementSibling); b.textContent = "Ctrl+C"; });
  } catch (err) { selectText(b.previousElementSibling); }
});
function selectText(el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }

/* ---------- thème ---------- */
const THEMES = ["auto", "light", "dark"];
function applyTheme(t) {
  if (t === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", t);
  $("#themeBtn").textContent = "Thème : " + ({ auto: "auto", light: "clair", dark: "sombre" })[t];
}
let theme = store.get("theme", "auto"); applyTheme(theme);
$("#themeBtn").addEventListener("click", () => { theme = THEMES[(THEMES.indexOf(theme) + 1) % 3]; store.set("theme", theme); applyTheme(theme); });

/* ---------- progression ---------- */
let done = store.get("done", {});
function setDone(id, v) { done[id] = v; store.set("done", done); renderBoard(); renderToc(); }

/* ---------- navigation ---------- */
const VIEWS = ["accueil", "fiches", "flashcards", "quiz", "exercices", "memento"];
function route() {
  let h = (location.hash || "#accueil").slice(1);
  let view = h, fiche = null;
  if (h.startsWith("fiche-")) { view = "fiches"; fiche = h.slice(6); }
  if (!VIEWS.includes(view)) view = "accueil";
  VIEWS.forEach((v) => ($("#view-" + v).hidden = v !== view));
  $$(".nav a").forEach((a) => { if (a.dataset.view === view) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  if (view === "fiches") openFiche(fiche && modById[fiche] ? fiche : store.get("lastFiche", MODULES[0].id), !!fiche);
  if (view === "flashcards") renderCard();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);

/* ---------- accueil ---------- */
function renderBoard() {
  const n = MODULES.filter((m) => done[m.id]).length;
  $("#boardCount").textContent = n + " / " + MODULES.length + " maîtrisées";
  $("#boardMeter").style.width = (100 * n / MODULES.length) + "%";
  $("#boardRows").innerHTML = MODULES.map((m) =>
    '<div class="board-row" data-go="' + m.id + '" tabindex="0"><span class="code">' + m.code + "</span><span>" + m.title +
    '</span><span class="st ' + (done[m.id] ? "st-ok" : "st-todo") + '">' + (done[m.id] ? "MAÎTRISÉ" : "À RÉVISER") + "</span></div>").join("");
}
$("#boardRows").addEventListener("click", (e) => { const r = e.target.closest("[data-go]"); if (r) location.hash = "fiche-" + r.dataset.go; });
$("#boardRows").addEventListener("keydown", (e) => { const r = e.target.closest("[data-go]"); if (r && e.key === "Enter") location.hash = "fiche-" + r.dataset.go; });
$("#trapList").innerHTML = TRAPS.map((t) => "<li><span>" + t + "</span></li>").join("");
function schemaHTML() {
  return SCHEMA.map(([t, cols]) => '<div class="tbl"><b>' + t + "</b><ul>" + cols.map(([c, k]) =>
    "<li><span>" + c + '</span><span class="k">' + k + "</span></li>").join("") + "</ul></div>").join("");
}
$("#schemaHome").innerHTML = schemaHTML();
$("#schemaEx").innerHTML = schemaHTML();
$("#statCards").textContent = CARDS.length + " cartes";
$("#statQuiz").textContent = QUIZ.length + " questions";
$("#statExos").textContent = (EXOS.length + GAPS.length + ORDERS.length) + " exercices";
$("#examBtn").addEventListener("click", () => setTimeout(() => startQuiz("exam"), 0));

/* ---------- options de module (selects) ---------- */
function moduleOptions(withAll) {
  let h = withAll ? '<option value="all">Tous les thèmes</option>' : "";
  Object.entries(GROUPS).forEach(([g, label]) => {
    h += '<optgroup label="' + label + '">' + MODULES.filter((m) => m.group === g).map((m) => '<option value="' + m.id + '">' + m.code + " · " + m.title + "</option>").join("") + "</optgroup>";
  });
  return h;
}

/* ---------- fiches ---------- */
let currentFiche = null;
function renderToc() {
  const q = $("#tocSearch").value.trim().toLowerCase();
  let h = "";
  Object.entries(GROUPS).forEach(([g, label]) => {
    const ms = MODULES.filter((m) => m.group === g && (!q || ficheText(m).includes(q)));
    if (!ms.length) return;
    h += '<div class="toc-group">' + label + "</div>" + ms.map((m) =>
      '<a href="#fiche-' + m.id + '" class="' + (m.id === currentFiche ? "on" : "") + '"><span class="c">' + m.code + "</span><span>" + m.title +
      '</span><span class="d ' + (done[m.id] ? "done" : "") + '" title="' + (done[m.id] ? "Maîtrisée" : "À réviser") + '"></span></a>').join("");
  });
  $("#tocList").innerHTML = h || '<p style="color:var(--muted);font-size:14px">Aucune fiche ne contient ce terme.</p>';
}
const textCache = {};
function ficheText(m) {
  if (!textCache[m.id]) {
    const parts = [m.title, m.retenir.join(" ")];
    m.blocks.forEach((b) => { parts.push(b.h); b.items.forEach((it) => parts.push(JSON.stringify(it))); });
    textCache[m.id] = parts.join(" ").replace(/<[^>]+>/g, " ").toLowerCase();
  }
  return textCache[m.id];
}
$("#tocSearch").addEventListener("input", renderToc);
$("#tocSelect").innerHTML = moduleOptions(false);
$("#tocSelect").addEventListener("change", (e) => (location.hash = "fiche-" + e.target.value));

function renderItem(it) {
  switch (it[0]) {
    case "p": return "<p>" + it[1] + "</p>";
    case "code": return codeBox(it[1], it[2]);
    case "trap": return '<div class="trap"><span>' + it[1] + "</span></div>";
    case "tip": return '<div class="tip"><span>' + it[1] + "</span></div>";
    case "ul": return "<ul>" + it[1].map((l) => "<li>" + l + "</li>").join("") + "</ul>";
    case "table": return '<div class="tbl-wrap"><table class="data"><thead><tr>' + it[1].map((c) => "<th>" + c + "</th>").join("") +
      "</tr></thead><tbody>" + it[2].map((r) => "<tr>" + r.map((c) => "<td>" + c + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
    case "isolation": return isolationHTML();
  }
  return "";
}
function isolationHTML() {
  const A = ["Lecture sale", "Lecture non répétable", "Perte de mise à jour", "Lecture fantôme"];
  const L = [["READ UNCOMMITTED", [1, 1, 1, 1], ""], ["READ COMMITTED", [0, 1, 1, 1], "Oracle, défaut"], ["REPEATABLE READ", [0, 0, 0, 1], ""], ["SERIALIZABLE", [0, 0, 0, 0], "Oracle"]];
  return '<div class="toolbar" style="margin:8px 0 0"><button class="btn small" type="button" data-iso-toggle>Masquer les réponses pour s\'entraîner</button></div>' +
    '<div class="tbl-wrap"><table class="data iso"><thead><tr><th>Niveau</th>' + A.map((a) => "<th>" + a + "</th>").join("") + "</tr></thead><tbody>" +
    L.map(([n, v, o]) => "<tr><td><code>" + n + "</code>" + (o ? ' <span class="chip">' + o + "</span>" : "") + "</td>" +
      v.map((x) => '<td class="' + (x ? "y" : "n") + '" data-iso="' + (x ? "Possible" : "Évitée") + '">' + (x ? "Possible" : "Évitée") + "</td>").join("") + "</tr>").join("") +
    "</tbody></table></div>";
}
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-iso-toggle]");
  if (t) {
    const tbl = t.parentElement.nextElementSibling.querySelector("table");
    const hide = !tbl.classList.contains("hide");
    tbl.classList.toggle("hide", hide);
    $$("td[data-iso]", tbl).forEach((td) => { td.textContent = hide ? "?" : td.dataset.iso; td.style.cursor = hide ? "pointer" : ""; });
    t.textContent = hide ? "Afficher toutes les réponses" : "Masquer les réponses pour s'entraîner";
    return;
  }
  const td = e.target.closest("table.iso.hide td[data-iso]");
  if (td) td.textContent = td.dataset.iso;
});

function openFiche(id, fromHash) {
  const m = modById[id] || MODULES[0];
  currentFiche = m.id; store.set("lastFiche", m.id);
  $("#tocSelect").value = m.id;
  const i = MODULES.indexOf(m), prev = MODULES[i - 1], next = MODULES[i + 1];
  $("#ficheBody").innerHTML =
    '<div class="fiche-head"><div><div class="eyebrow">' + m.code + " · " + GROUPS[m.group] + "</div><h1>" + m.title + '</h1><div class="src">Source : ' + m.src + "</div></div>" +
    '<button class="btn ' + (done[m.id] ? "" : "primary") + '" type="button" id="doneBtn">' + (done[m.id] ? "✓ Maîtrisée (annuler)" : "Marquer comme maîtrisée") + "</button></div>" +
    '<div class="retenir"><h3>À retenir</h3><ul>' + m.retenir.map((r) => "<li>" + r + "</li>").join("") + "</ul></div>" +
    m.blocks.map((b) => '<section class="block"><h2>' + b.h + "</h2>" + b.items.map(renderItem).join("") + "</section>").join("") +
    '<div class="fiche-foot">' + (prev ? '<a class="btn" href="#fiche-' + prev.id + '">← ' + prev.title + "</a>" : "<span></span>") +
    '<span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn small" type="button" data-train="cards">Flashcards du thème</button><button class="btn small" type="button" data-train="quiz">Quiz du thème</button></span>' +
    (next ? '<a class="btn" href="#fiche-' + next.id + '">' + next.title + " →</a>" : "<span></span>") + "</div>";
  $("#doneBtn").addEventListener("click", () => { setDone(m.id, !done[m.id]); openFiche(m.id); });
  $$("[data-train]", $("#ficheBody")).forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.train === "cards") { $("#fcModule").value = m.id; buildDeck(); location.hash = "flashcards"; }
    else { $("#quizModule").value = m.id; location.hash = "quiz"; setTimeout(() => startQuiz(m.id), 0); }
  }));
  renderToc();
}

/* ---------- flashcards ---------- */
let known = store.get("known", {});      // index carte -> 1 (sait) / 0 (à revoir)
let deck = [], pos = 0;
$("#fcModule").innerHTML = moduleOptions(true);
function buildDeck(doShuffle) {
  const mod = $("#fcModule").value, f = $("#fcFilter").value;
  deck = CARDS.map((c, i) => i).filter((i) => (mod === "all" || CARDS[i][0] === mod) && (f === "all" || known[i] !== 1));
  if (doShuffle) deck = shuffle(deck);
  pos = 0; renderCard();
}
function renderCard() {
  const card = $("#fcCard"); card.classList.remove("flip");
  const total = CARDS.filter((c, i) => $("#fcModule").value === "all" || c[0] === $("#fcModule").value);
  const ids = CARDS.map((c, i) => i).filter((i) => $("#fcModule").value === "all" || CARDS[i][0] === $("#fcModule").value);
  const k = ids.filter((i) => known[i] === 1).length, r = ids.filter((i) => known[i] === 0).length;
  $("#fcStats").innerHTML = k + " sues · " + r + " à revoir · " + (total.length - k - r) + " jamais vues";
  if (!deck.length) {
    $("#fcTagF").textContent = ""; $("#fcQ").innerHTML = "Aucune carte à afficher. Toutes les cartes de ce thème sont marquées comme sues.";
    $("#fcA").innerHTML = ""; $("#fcCount").textContent = ""; return;
  }
  const c = CARDS[deck[pos]], m = modById[c[0]];
  $("#fcTagF").textContent = $("#fcTagB").textContent = m.code + " · " + m.title;
  $("#fcQ").innerHTML = c[1];
  $("#fcA").innerHTML = c[2] + (c[3] ? codeBox(c[3]) : "");
  const st = known[deck[pos]];
  $("#fcCount").textContent = "Carte " + (pos + 1) + " / " + deck.length + (st === 1 ? " · marquée sue" : st === 0 ? " · marquée à revoir" : "");
}
function flip() { if (deck.length) $("#fcCard").classList.toggle("flip"); }
function step(d) { if (!deck.length) return; pos = (pos + d + deck.length) % deck.length; renderCard(); }
function mark(v) { if (!deck.length) return; known[deck[pos]] = v; store.set("known", known); toast(v ? "Carte marquée comme sue" : "Carte à revoir"); step(1); }
$("#fcCard").addEventListener("click", (e) => { if (!e.target.closest(".copy")) flip(); });
$("#fcPrev").addEventListener("click", () => step(-1));
$("#fcNext").addEventListener("click", () => step(1));
$("#fcGood").addEventListener("click", () => mark(1));
$("#fcBad").addEventListener("click", () => mark(0));
$("#fcShuffle").addEventListener("click", () => buildDeck(true));
$("#fcModule").addEventListener("change", () => buildDeck());
$("#fcFilter").addEventListener("change", () => buildDeck());
let resetArm = false;
$("#fcReset").addEventListener("click", (e) => {
  if (!resetArm) { resetArm = true; e.target.textContent = "Confirmer la réinitialisation"; setTimeout(() => { resetArm = false; e.target.textContent = "Réinitialiser le suivi"; }, 3000); return; }
  known = {}; store.set("known", known); resetArm = false; e.target.textContent = "Réinitialiser le suivi"; buildDeck(); toast("Suivi des cartes réinitialisé");
});
document.addEventListener("keydown", (e) => {
  if ($("#view-flashcards").hidden || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
  if (e.key === " ") { e.preventDefault(); flip(); }
  else if (e.key === "ArrowRight") step(1);
  else if (e.key === "ArrowLeft") step(-1);
});

/* ---------- quiz ---------- */
$("#quizModule").innerHTML = moduleOptions(true);
let qz = null;
function bestLabel() { const b = store.get("bestExam", null); $("#quizBest").textContent = b === null ? "Pas encore d'examen blanc" : "Meilleur examen blanc : " + b + " / 20"; }
bestLabel();
function startQuiz(mode) {
  let pool;
  if (mode === "exam") pool = shuffle(QUIZ).slice(0, 20);
  else { const mod = mode || $("#quizModule").value; pool = shuffle(QUIZ.filter((q) => mod === "all" || q.m === mod)); }
  qz = { exam: mode === "exam", list: pool.map((q) => { const order = shuffle(q.o.map((_, i) => i)); return { q, order }; }), i: 0, score: 0, wrong: [] };
  renderQ();
}
$("#quizStart").addEventListener("click", () => startQuiz());
$("#quizExam").addEventListener("click", () => startQuiz("exam"));
function renderQ() {
  const box = $("#quizBox");
  if (!qz) { box.innerHTML = '<div class="panel"><h3>Choisissez un thème puis « Commencer »</h3><p style="margin:0;color:var(--muted)">Les réponses sont mélangées à chaque tentative. Chaque correction est expliquée. L\'examen blanc tire 20 questions sur tous les thèmes.</p></div>'; return; }
  if (qz.i >= qz.list.length) return renderScore();
  const { q, order } = qz.list[qz.i], m = modById[q.m];
  box.innerHTML = '<div class="q-progress"><span>Question ' + (qz.i + 1) + " / " + qz.list.length + "</span><span>" + m.code + " · " + m.title + "</span><span>Score " + qz.score + "</span></div>" +
    '<div class="q-bar"><i style="width:' + (100 * qz.i / qz.list.length) + '%"></i></div>' +
    '<div class="q-text">' + esc(q.q) + '</div><div class="opts">' +
    order.map((oi, k) => '<button class="opt" type="button" data-o="' + oi + '"><span class="l">' + "ABCD"[k] + "</span><span>" + (/SELECT|WHERE|FROM|CONNECT|PRAGMA|RAISE|:new|new\./i.test(q.o[oi]) ? "<code>" + esc(q.o[oi]) + "</code>" : esc(q.o[oi])) + "</span></button>").join("") +
    '</div><div id="qFeedback"></div>';
  $$(".opt", box).forEach((b) => b.addEventListener("click", () => answer(+b.dataset.o)));
}
function answer(oi) {
  const { q } = qz.list[qz.i], ok = oi === q.a;
  if (ok) qz.score++; else qz.wrong.push(q);
  $$(".opt").forEach((b) => { b.disabled = true; const v = +b.dataset.o; if (v === q.a) b.classList.add("good"); else if (v === oi) b.classList.add("wrong"); });
  $("#qFeedback").innerHTML = '<div class="explain"><b style="color:' + (ok ? "var(--ok)" : "var(--bad)") + '">' + (ok ? "BONNE RÉPONSE" : "RÉPONSE INCORRECTE") + "</b><br>" + esc(q.e) +
    ' <a href="#fiche-' + q.m + '">Revoir la fiche</a></div><div class="card-ctrl" style="justify-content:flex-end"><button class="btn primary" type="button" id="qNext">' + (qz.i + 1 < qz.list.length ? "Question suivante →" : "Voir le résultat") + "</button></div>";
  $("#qNext").addEventListener("click", () => { qz.i++; renderQ(); });
  $("#qNext").focus();
}
function renderScore() {
  const n = qz.list.length, pct = Math.round(100 * qz.score / n), note = Math.round(20 * qz.score / n * 10) / 10;
  if (qz.exam) { const b = store.get("bestExam", null); if (b === null || qz.score > b) store.set("bestExam", qz.score); bestLabel(); }
  const msg = pct >= 85 ? "Très solide. Passez aux exercices de requêtes pour vérifier l'écriture." : pct >= 60 ? "Bonne base. Relisez les fiches des questions ratées." : "Reprenez les fiches concernées puis les flashcards avant de retenter.";
  $("#quizBox").innerHTML = '<div class="panel"><div class="eyebrow">' + (qz.exam ? "Examen blanc" : "Résultat") + '</div><div class="score-big">' + qz.score + "<span style=\"font-size:.4em;color:var(--muted)\"> / " + n + "</span></div>" +
    "<p>Soit <b>" + note + " / 20</b> (" + pct + " %). " + msg + "</p>" +
    '<div class="card-ctrl" style="justify-content:flex-start"><button class="btn primary" type="button" id="qAgain">Recommencer</button><button class="btn" type="button" id="qExam2">Nouvel examen blanc</button></div>' +
    (qz.wrong.length ? '<h3 style="margin-top:var(--s5)">Questions à revoir</h3><div class="review-list">' + qz.wrong.map((q) =>
      '<div class="review-item"><b>' + esc(q.q) + "</b><br>Réponse : <code>" + esc(q.o[q.a]) + "</code><br><span style=\"color:var(--muted)\">" + esc(q.e) + '</span> <a href="#fiche-' + q.m + '">Fiche</a></div>').join("") + "</div>" : "") + "</div>";
  $("#qAgain").addEventListener("click", () => startQuiz(qz.exam ? "exam" : undefined));
  $("#qExam2").addEventListener("click", () => startQuiz("exam"));
}
renderQ();

/* ---------- exercices : onglets ---------- */
$$(".tabs button").forEach((b) => b.addEventListener("click", () => {
  $$(".tabs button").forEach((x) => x.setAttribute("aria-selected", x === b ? "true" : "false"));
  ["req", "gap", "ord"].forEach((t) => ($("#tab-" + t).hidden = t !== b.dataset.tab));
}));

/* requêtes */
let drafts = store.get("drafts", {});
const usedMods = MODULES.filter((m) => EXOS.some((x) => x.m === m.id));
$("#exModule").innerHTML = '<option value="all">Tous les thèmes</option>' + usedMods.map((m) => '<option value="' + m.id + '">' + m.code + " · " + m.title + "</option>").join("");
function renderExos() {
  const mod = $("#exModule").value;
  $("#exList").innerHTML = EXOS.map((x, i) => ({ x, i })).filter(({ x }) => mod === "all" || x.m === mod).map(({ x, i }) =>
    '<div class="ex-item"><h3><span>Exercice ' + (i + 1) + '</span><span class="chip">' + modById[x.m].code + '</span><span class="chip">' + "●".repeat(x.lvl) + "○".repeat(3 - x.lvl) + "</span></h3>" +
    "<p style=\"margin:0 0 10px\">" + esc(x.q) + "</p>" +
    '<label class="eyebrow" for="ex-' + i + '">Votre réponse</label><textarea id="ex-' + i + '" spellcheck="false" placeholder="SELECT …">' + esc(drafts[i] || "") + "</textarea>" +
    '<div class="ex-actions"><button class="btn small primary" type="button" data-sol="' + i + '">Voir la correction</button></div>' +
    '<div class="sol" id="sol-' + i + '" hidden>' + (x.n ? '<div class="tip"><span>' + esc(x.n) + "</span></div>" : "") + x.s.map(([t, c]) => "<h4>" + esc(t) + "</h4>" + codeBox(c)).join("") + "</div></div>").join("");
}
$("#exModule").addEventListener("change", renderExos);
$("#exList").addEventListener("click", (e) => {
  const b = e.target.closest("[data-sol]"); if (!b) return;
  const s = $("#sol-" + b.dataset.sol); s.hidden = !s.hidden; b.textContent = s.hidden ? "Voir la correction" : "Masquer la correction";
});
$("#exList").addEventListener("input", (e) => { if (e.target.id.startsWith("ex-")) { drafts[e.target.id.slice(3)] = e.target.value; store.set("drafts", drafts); } });
renderExos();

/* code à trous */
function renderGaps() {
  $("#tab-gap").innerHTML = '<p class="lead" style="margin-top:0">Complétez les mots-clés manquants puis cliquez sur « Vérifier ». La casse n\'a pas d\'importance.</p>' +
    GAPS.map((g, gi) => {
      let k = 0;
      const html = esc(g.c).replace(/\[\[([^\]]+)\]\]/g, (_, ans) => {
        const w = Math.max(...ans.split("|").map((a) => a.length)) + 1;
        return '<input type="text" id="gap-' + gi + "-" + k++ + '" data-ans="' + ans.replace(/"/g, "&quot;") + '" size="' + w + '" autocomplete="off" spellcheck="false" aria-label="Mot manquant">';
      });
      return '<div class="ex-item"><h3><span>' + esc(g.t) + '</span><span class="chip">' + modById[g.m].code + '</span></h3><div class="gap-code">' + html +
        '</div><div class="ex-actions"><button class="btn small primary" type="button" data-gap="' + gi + '">Vérifier</button><button class="btn small" type="button" data-show="' + gi + '">Afficher les réponses</button><span class="chip" id="gapres-' + gi + '"></span></div></div>';
    }).join("");
}
renderGaps();
$("#tab-gap").addEventListener("click", (e) => {
  const v = e.target.closest("[data-gap]"), s = e.target.closest("[data-show]");
  if (!v && !s) return;
  const gi = (v || s).dataset.gap ?? (v || s).dataset.show;
  const inputs = $$('input[id^="gap-' + gi + '-"]');
  let ok = 0;
  inputs.forEach((inp) => {
    const answers = inp.dataset.ans.split("|").map((a) => a.toUpperCase().replace(/\s+/g, " ").trim());
    if (s) inp.value = inp.dataset.ans.split("|")[0];
    const good = answers.includes(inp.value.toUpperCase().replace(/\s+/g, " ").trim());
    if (good) ok++;
    inp.classList.toggle("good", good); inp.classList.toggle("wrong", !good);
  });
  const r = $("#gapres-" + gi);
  r.textContent = ok + " / " + inputs.length; r.className = "chip " + (ok === inputs.length ? "ok" : "bad");
});

/* ordre */
let ordState = [];
function renderOrders() {
  ordState = ORDERS.map((o) => ({ pool: shuffle(o.items.map((_, i) => i)), picked: [] }));
  drawOrders();
}
function drawOrders() {
  $("#tab-ord").innerHTML = '<p class="lead" style="margin-top:0">Cliquez les éléments dans le bon ordre. Cliquez un élément placé pour le retirer.</p>' +
    ORDERS.map((o, oi) => {
      const st = ordState[oi], complete = st.picked.length === o.items.length;
      const target = st.picked.map((idx, p) => '<button type="button" class="order-chip ' + (complete ? (idx === p ? "good" : "wrong") : "") + '" data-oi="' + oi + '" data-un="' + p + '">' + esc(o.items[idx]) + "</button>").join("");
      const pool = st.pool.filter((i) => !st.picked.includes(i)).map((i) => '<button type="button" class="order-chip" data-oi="' + oi + '" data-pick="' + i + '">' + esc(o.items[i]) + "</button>").join("");
      const res = complete ? (st.picked.every((v, p) => v === p) ? '<span class="chip ok">Correct</span>' : '<span class="chip bad">Ordre incorrect</span>') : "";
      return '<div class="ex-item"><h3><span>' + esc(o.t) + "</span>" + res + '</h3><div class="order-target" aria-label="Votre ordre">' + (target || '<span style="color:var(--muted);font-size:13px">Votre ordre apparaîtra ici</span>') + '</div><div class="order-pool">' + pool +
        '</div><div class="ex-actions"><button class="btn small" type="button" data-oreset="' + oi + '">Recommencer</button></div></div>';
    }).join("");
}
$("#tab-ord").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.oreset !== undefined) { const oi = +b.dataset.oreset; ordState[oi] = { pool: shuffle(ORDERS[oi].items.map((_, i) => i)), picked: [] }; return drawOrders(); }
  const oi = +b.dataset.oi, st = ordState[oi]; if (isNaN(oi)) return;
  if (b.dataset.pick !== undefined) st.picked.push(+b.dataset.pick);
  else if (b.dataset.un !== undefined) st.picked.splice(+b.dataset.un, 1);
  drawOrders();
});
renderOrders();

/* ---------- memento ---------- */
const MEMENTO = [
["Ordre SELECT", "SELECT [DISTINCT] col1 [[AS] alias_col1] [, col2 ...]\nFROM tab1 [alias1] [, tab2 ...]\n[WHERE conditions]\n[GROUP BY col1 [, col2 ...]]\n[HAVING condition_de_sélection_groupes]\n[ORDER BY col1 [DESC] [, col2 [DESC]]];\n-- Opérateurs : = < > <= >= <> !=\n-- [NOT] LIKE, BETWEEN .. AND .., IN (...), IS [NOT] NULL\n-- AND OR NOT ; % (n car.) _ (1 car.) ; concaténation ||"],
["Fonctions Oracle", "SYSDATE                    -- date du jour (avec l'heure)\nMONTHS_BETWEEN(date1, date2)\nTO_DATE(ch, format)\nSUBSTR(ch, pos, lg)\n-- Agrégats\nCOUNT(colonne)  COUNT(*)  COUNT(DISTINCT colonne)\nSUM(colonne)  AVG(colonne)  MAX(colonne)  MIN(colonne)"],
["Insertion, suppression, modification", "INSERT INTO tab [(col1, col2, ...)] VALUES (val1, val2, ...);\nINSERT INTO tab [(col1, col2, ...)] SELECT ... ;\nDELETE FROM tab [WHERE ...];\nUPDATE tab SET col1 = val_1 [, col2 = val_2 ...] [WHERE condition];"],
["Création de table", "CREATE TABLE tab (\n  col1 type_col1 [NOT NULL | NULL] [DEFAULT val1] [contrainte_col1 [, ...]],\n  ... [, contrainte_tab [, ...]]);\n-- type_col : NUMBER, VARCHAR2(n), INTEGER, DATE ...\n-- contrainte_col :\n[CONSTRAINT pk_col] PRIMARY KEY\n[CONSTRAINT fk_col] REFERENCES tab (col) [ON DELETE CASCADE | SET NULL]\n[CONSTRAINT ck_col] CHECK (condition_utilisant_col)\n-- contrainte_tab :\n[CONSTRAINT pk_col] PRIMARY KEY (col1 [, col2 ...])\n[CONSTRAINT fk_col] FOREIGN KEY (col) REFERENCES tab(col) [ON DELETE CASCADE | SET NULL]\n[CONSTRAINT ck_col] CHECK (condition)"],
["Modification de table, vue", "ALTER TABLE nom_table\n  ADD col_nom type_col [NOT NULL | NULL] [DEFAULT val]\n  ADD constraint_tab [, constraint_tab ...]\n  DROP CONSTRAINT constraint_nom\n  MODIFY col_nom type_col | DEFAULT val | NULL | NOT NULL\n  DROP COLUMN col_nom;\n\nCREATE [OR REPLACE] VIEW nom_vue AS\nSELECT ...\n[WITH CHECK OPTION];"],
["Déclencheurs LMD", "CREATE [OR REPLACE] TRIGGER nom_décl\n{AFTER | BEFORE} événement [OR événement]\nON nom_table\n[FOR EACH ROW]\n[WHEN condition]\n[DECLARE déclarations]\nBEGIN\n  Instructions;\nEND;\n-- événement : INSERT ou UPDATE [OF ..] ou DELETE\n-- condition : si vraie, traitement exécuté (pas de requête SQL)\n-- FOR EACH ROW et WHEN : uniquement pour un déclencheur LIGNE"],
["Procédures et fonctions", "CREATE [OR REPLACE] PROCEDURE nom_proc\n[(arg [mode] typologie [, arg [mode] typologie]...)]\n[IS]\nBEGIN\n  Instructions;\nEND;\n\nCREATE [OR REPLACE] FUNCTION nom_fct\n[(arg [IN] typologie [, arg [mode] typologie]...)]\nRETURN typologie_retour [IS]\n  [Var typologie;]\nBEGIN\n  Instructions;\n  RETURN Var;\nEND;"],
["Généralités PL/SQL", "IF conditions THEN\n  Instructions;\n[ELSIF conditions THEN\n  Instructions;]\n[ELSE\n  Instructions;]\nEND IF;\n\nv_char CHAR(1) := 'A';\nv_int INTEGER := 0;\nv_chaine VARCHAR2(100);\nv_champ TABLE.champ%TYPE;\n\nDBMS_OUTPUT.PUT_LINE(ch);\nSELECT ... INTO ... FROM .. WHERE ...;\na := a + 1;\nRAISE_APPLICATION_ERROR(numErr, msg); -- numErr entre -20000 et -20999"],
["Section EXCEPTION", "-- Erreurs prédéfinies\nNO_DATA_FOUND  TOO_MANY_ROWS  DUP_VAL_ON_INDEX  OTHERS\n-- Erreurs non prédéfinies\n-2290 : violation de contrainte CHECK\n-2291 : violation d'intégrité : parent introuvable\n-2292 : violation d'intégrité : fils existant"],
["Curseurs", "DECLARE\n  CURSOR C IS (SELECT chp1, ... FROM ... WHERE ...);\n  v_chp1 ...%TYPE;           -- variable de réception\nBEGIN\n  OPEN C;\n  LOOP\n    FETCH C INTO v_chp1, ...;\n    EXIT WHEN C%NOTFOUND;\n    Instructions;\n  END LOOP;\n  ... C%ROWCOUNT ...\n  CLOSE C;\nEND;\n\n-- Sans déclaration (FOR)\nFOR Cur IN (SELECT chp1, ... FROM ... WHERE ...)\nLOOP\n  Instructions;  ... Cur.chp1 ...\nEND LOOP;"],
];
$("#mementoBody").innerHTML = MEMENTO.map(([t, c]) => '<div class="panel"><h3>' + t + "</h3>" + codeBox(c) + "</div>").join("");

async function downloadMemento() {
  const status = $("#dlStatus");
  if (!(window.claude && window.claude.use)) {
    // Site ouvert en local ou hébergé ailleurs : lien de téléchargement classique
    const a = document.createElement("a"); a.href = "docs/memento.pdf"; a.download = "memento-sql-plsql.pdf";
    document.body.appendChild(a); a.click(); a.remove();
    status.textContent = "Téléchargement lancé."; return;
  }
  status.textContent = "Préparation du fichier…";
  let blob;
  try { const r = await fetch("docs/memento.pdf"); if (!r.ok) throw new Error(); blob = await r.blob(); }
  catch (e) { status.textContent = "Le fichier n'a pas pu être chargé. Utilisez « Ouvrir dans un onglet »."; return; }
  let dl = null;
  try { dl = await window.claude.use("downloads"); } catch (e) { dl = null; }
  if (dl) {
    try { await dl.save({ filename: "memento-sql-plsql.pdf", data: blob }); status.textContent = "Memento enregistré."; }
    catch (err) {
      status.textContent = err && err.code === "declined" ? "Téléchargement annulé." :
        err && err.code === "rate_limited" ? "Une demande est déjà ouverte, réessayez dans un instant." : "Téléchargement indisponible ici. Utilisez « Ouvrir dans un onglet ».";
    }
    return;
  }
  // Hors du lecteur Claude (site ouvert en local) : téléchargement classique
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "memento-sql-plsql.pdf";
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  status.textContent = "Téléchargement lancé.";
}
$("#dlBtn").addEventListener("click", downloadMemento);

/* ---------- démarrage ---------- */
renderBoard();
buildDeck();
route();
})();

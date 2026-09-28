// ============================================================
// Application — routage par hash, rendu des chapitres, flashcards, quiz
// ============================================================

const sheet = document.getElementById('sheet');
const chapterNav = document.getElementById('chapterNav');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

// ---- Construire la navigation des chapitres ----
CHAPTERS.forEach(ch => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="#${ch.id}" data-route="${ch.id}"><span class="num">${ch.num}</span> ${ch.label}</a>`;
  chapterNav.appendChild(li);
});

const allLinks = () => document.querySelectorAll('nav.chapters a');

function setActiveLink(route) {
  allLinks().forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 880) sidebar.classList.remove('open');
}

menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

// ---- Router ----
function route() {
  const hash = (location.hash || '#accueil').slice(1);
  setActiveLink(hash);
  closeSidebarOnMobile();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (hash === 'flashcards') { renderFlashcards(); return; }
  if (hash === 'quiz') { renderQuiz(); return; }

  const chapter = CHAPTERS.find(c => c.id === hash) || CHAPTERS[0];
  renderChapter(chapter);
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);

// ---- Rendu d'un chapitre ----
function renderChapter(ch) {
  const idx = CHAPTERS.findIndex(c => c.id === ch.id);
  const next = CHAPTERS[idx + 1];

  sheet.innerHTML = `
    <p class="crumb">CHAPITRE ${ch.num}</p>
    <h1 class="title">${ch.title}</h1>
    <p class="dek">${ch.dek}</p>
    <div class="content">${ch.body}</div>
    <div class="jump-buttons">
      ${next ? `<a class="btn" href="#${next.id}">Chapitre suivant : ${next.label} →</a>` : ''}
      <a class="btn outline" href="#flashcards">Réviser en flashcards</a>
      <a class="btn ghost" href="#quiz">Faire le quiz →</a>
    </div>
  `;
}

// ============================================================
// Flashcards
// ============================================================

let flashState = { theme: 'Toutes', order: [], pos: 0 };

function flashThemes() {
  return ['Toutes', ...new Set(FLASHCARDS.map(f => f.theme))];
}

function flashDeck() {
  return flashState.theme === 'Toutes'
    ? FLASHCARDS
    : FLASHCARDS.filter(f => f.theme === flashState.theme);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderFlashcards() {
  const themes = flashThemes();
  flashState.order = shuffle(flashDeck().map((_, i) => i));
  flashState.pos = 0;

  sheet.innerHTML = `
    <p class="crumb">S'ENTRAÎNER</p>
    <h1 class="title">Flashcards</h1>
    <p class="dek">Clique sur la carte pour révéler la définition. Filtre par thème si besoin.</p>

    <div class="chips" id="themeChips"></div>

    <div class="flash-wrap">
      <div class="flash-meta" id="flashMeta"></div>
      <div class="flashcard" id="flashcard">
        <div class="inner">
          <div class="face front">
            <div class="term" id="flashTerm"></div>
            <div class="hint">clique pour retourner</div>
          </div>
          <div class="face back">
            <div class="tag" id="flashTheme"></div>
            <div id="flashDef"></div>
          </div>
        </div>
      </div>
      <div class="flash-controls">
        <button class="btn outline" id="flashPrev">← Précédente</button>
        <button class="btn" id="flashNext">Suivante →</button>
      </div>
    </div>
  `;

  const chipsWrap = document.getElementById('themeChips');
  themes.forEach(t => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.style.cursor = 'pointer';
    chip.style.opacity = (t === flashState.theme) ? '1' : '0.55';
    chip.textContent = t;
    chip.addEventListener('click', () => {
      flashState.theme = t;
      renderFlashcards();
    });
    chipsWrap.appendChild(chip);
  });

  const card = document.getElementById('flashcard');
  card.addEventListener('click', () => card.classList.toggle('flipped'));

  document.getElementById('flashPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    stepFlash(-1);
  });
  document.getElementById('flashNext').addEventListener('click', (e) => {
    e.stopPropagation();
    stepFlash(1);
  });

  showFlash();
}

function showFlash() {
  const deck = flashDeck();
  if (deck.length === 0) return;
  const card = document.getElementById('flashcard');
  card.classList.remove('flipped');
  const item = deck[flashState.order[flashState.pos]];
  document.getElementById('flashTerm').textContent = item.term;
  document.getElementById('flashTheme').textContent = item.theme;
  document.getElementById('flashDef').textContent = item.def;
  document.getElementById('flashMeta').textContent =
    `Carte ${flashState.pos + 1} / ${deck.length} — ${flashState.theme}`;
}

function stepFlash(dir) {
  const deck = flashDeck();
  flashState.pos = (flashState.pos + dir + deck.length) % deck.length;
  showFlash();
}

// ============================================================
// Quiz
// ============================================================

let quizState = { order: [], pos: 0, score: 0, answered: false };

function renderQuiz() {
  quizState = {
    order: shuffle(QUIZ.map((_, i) => i)),
    pos: 0,
    score: 0,
    answered: false
  };
  sheet.innerHTML = `
    <p class="crumb">S'ENTRAÎNER</p>
    <h1 class="title">Quiz général</h1>
    <p class="dek">${QUIZ.length} questions couvrant tous les chapitres. Prends ton temps, lis bien les explications.</p>
    <div id="quizBody"></div>
  `;
  showQuizQuestion();
}

function showQuizQuestion() {
  const body = document.getElementById('quizBody');
  const total = quizState.order.length;

  if (quizState.pos >= total) {
    const pct = Math.round((quizState.score / total) * 100);
    let msg = "Encore un peu de révision et ce sera parfait !";
    if (pct >= 60) msg = "Bon niveau — quelques révisions cibleront les derniers points.";
    if (pct >= 85) msg = "Excellent ! Tu maîtrises bien le programme.";
    body.innerHTML = `
      <div class="quiz-score">
        <div class="big">${quizState.score} / ${total}</div>
        <p>${msg}</p>
        <div class="jump-buttons" style="justify-content:center;">
          <button class="btn" id="retryQuiz">Recommencer le quiz</button>
          <a class="btn outline" href="#flashcards">Revoir les flashcards</a>
        </div>
      </div>
    `;
    document.getElementById('retryQuiz').addEventListener('click', renderQuiz);
    return;
  }

  const q = QUIZ[quizState.order[quizState.pos]];
  quizState.answered = false;

  body.innerHTML = `
    <div class="quiz-progress">Question ${quizState.pos + 1} / ${total} — score actuel : ${quizState.score}</div>
    <div class="quiz-track"><span style="width:${(quizState.pos / total) * 100}%"></span></div>
    <div class="q-prompt">${q.q}</div>
    <div class="q-options" id="qOptions"></div>
    <div id="qFeedback"></div>
    <div class="jump-buttons" id="qNextWrap" style="display:none;">
      <button class="btn" id="qNext">Question suivante →</button>
    </div>
  `;

  const optWrap = document.getElementById('qOptions');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => answerQuiz(i, q));
    optWrap.appendChild(btn);
  });
}

function answerQuiz(choice, q) {
  if (quizState.answered) return;
  quizState.answered = true;

  const buttons = document.querySelectorAll('.q-option');
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
    else if (i === choice) b.classList.add('incorrect');
  });

  const feedback = document.getElementById('qFeedback');
  const isCorrect = choice === q.correct;
  if (isCorrect) quizState.score++;

  feedback.innerHTML = `
    <div class="q-feedback ${isCorrect ? 'ok' : 'no'}">
      <strong>${isCorrect ? 'Exact.' : 'Pas tout à fait.'}</strong> ${q.exp}
    </div>
  `;
  document.getElementById('qNextWrap').style.display = 'flex';
  document.getElementById('qNext').addEventListener('click', () => {
    quizState.pos++;
    showQuizQuestion();
  });
}

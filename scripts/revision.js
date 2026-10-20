// Barre d'outils commune à toutes les fiches de révision :
// retour à l'accueil, thème clair/sombre, retour en haut, barre de lecture.
(function () {
  var script = document.currentScript;
  var siteRoot = new URL('..', script.src);   // scripts/ -> racine du site

  // --- Icônes --------------------------------------------------------------
  var icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>'
  };

  // --- Défilement : la page ou un conteneur interne qui défile -------------
  var scroller = document.scrollingElement || document.documentElement;

  function isScrollable(el) {
    if (!el || el === document || el.nodeType !== 1) return false;
    var s = getComputedStyle(el).overflowY;
    return (s === 'auto' || s === 'scroll') && el.scrollHeight > el.clientHeight + 40;
  }

  function build() {
    var bar = document.createElement('rv-progress');
    bar.className = 'rv-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<span></span>';

    var dock = document.createElement('rv-dock');
    dock.className = 'rv-dock';
    dock.setAttribute('role', 'toolbar');
    dock.setAttribute('aria-label', 'Outils de la fiche');
    dock.innerHTML =
      '<a class="rv-btn rv-home" href="' + siteRoot.href + 'index.html">' + icons.home + '<span>Accueil</span></a>' +
      '<button type="button" class="rv-btn rv-theme" aria-label="Changer de thème"></button>' +
      '<button type="button" class="rv-btn rv-top" aria-label="Revenir en haut" hidden>' + icons.up + '</button>';

    document.body.appendChild(bar);
    document.body.appendChild(dock);

    var fill = bar.firstChild;
    var themeBtn = dock.querySelector('.rv-theme');
    var topBtn = dock.querySelector('.rv-top');

    function paintTheme() {
      var dark = window.SiteTheme && SiteTheme.current() === 'dark';
      themeBtn.innerHTML = dark ? icons.sun : icons.moon;
      themeBtn.setAttribute('aria-label', dark ? 'Passer en thème clair' : 'Passer en thème sombre');
      themeBtn.title = themeBtn.getAttribute('aria-label');
    }
    paintTheme();
    themeBtn.addEventListener('click', function () { if (window.SiteTheme) SiteTheme.toggle(); });
    document.addEventListener('themechange', paintTheme);

    function update() {
      var max = scroller.scrollHeight - scroller.clientHeight;
      var y = scroller.scrollTop;
      fill.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      topBtn.hidden = y < 600;
    }

    document.addEventListener('scroll', function (e) {
      var t = e.target === document ? (document.scrollingElement || document.documentElement) : e.target;
      if (t === document.scrollingElement || t === document.documentElement || isScrollable(t)) {
        scroller = t;
        update();
      }
    }, { capture: true, passive: true });

    topBtn.addEventListener('click', function () {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
      if (scroller !== document.scrollingElement) window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    update();
    fitTables();
    window.addEventListener('resize', fitTables, { passive: true });
    // les onglets masqués au chargement : on revérifie après un clic
    document.addEventListener('click', function () { requestAnimationFrame(fitTables); });
  }

  // Un tableau trop large pour l'écran défile dans son propre cadre
  // au lieu de faire déborder toute la page (téléphone surtout).
  function fitTables() {
    document.querySelectorAll('table').forEach(function (t) {
      var parent = t.parentElement;
      if (!parent || parent.classList.contains('rv-scroll')) return;
      var ox = getComputedStyle(parent).overflowX;
      if (ox === 'auto' || ox === 'scroll') return;
      if (t.getBoundingClientRect().width <= parent.clientWidth + 1) return;
      var box = document.createElement('div');
      box.className = 'rv-scroll';
      parent.insertBefore(box, t);
      box.appendChild(t);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();

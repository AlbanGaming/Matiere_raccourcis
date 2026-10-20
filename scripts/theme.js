// Thème partagé par tout le site. À charger dans <head> (sans defer)
// pour éviter un flash de la mauvaise couleur au chargement.
// localStorage "theme" : "dark" | "light". Absent = on suit le système.
(function () {
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function current() {
    var t = root.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function set(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  var saved = read();
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);

  // Un autre onglet du site change le thème : on suit.
  window.addEventListener('storage', function (e) {
    if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
      root.setAttribute('data-theme', e.newValue);
      document.dispatchEvent(new CustomEvent('themechange', { detail: e.newValue }));
    }
  });

  window.SiteTheme = {
    current: current,
    set: set,
    toggle: function () { set(current() === 'dark' ? 'light' : 'dark'); }
  };
})();

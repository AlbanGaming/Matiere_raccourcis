const toggle = document.getElementById('themeToggle');
  const logo_jupyter = document.getElementById('logo_jupyter');
  const logo_open_neb = document.getElementById('logo_open_neb');
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');

  const revisionToggle = document.getElementById('revisionToggle');
  const revisionMenu = document.getElementById('revisionMenu');

  // === Switch localisation ===
  const locationToggle = document.getElementById('locationToggle');
  const linkEdt = document.getElementById('link-edt');

  function applyLocation(isIut) {
    if (linkEdt) {
      linkEdt.classList.toggle('hidden', !isIut);
      linkEdt.classList.toggle('visible', isIut);
    }
    localStorage.setItem('location', isIut ? 'iut' : 'home');
  }

  // Initialisation localisation — défaut : chez soi
  const savedLocation = localStorage.getItem('location');
  const isIut = savedLocation === 'iut';
  locationToggle.checked = isIut;
  applyLocation(isIut);

  locationToggle.addEventListener('change', () => {
    applyLocation(locationToggle.checked);
  });

  // === Menus ===
  revisionToggle.addEventListener('click', () => {
  revisionMenu.classList.toggle('hidden');
  revisionToggle.classList.add('rotating');
  setTimeout(() => revisionToggle.classList.remove('rotating'), 750);
});

  menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('hidden');
  menuToggle.classList.add('rotating');
  setTimeout(() => {
    menuToggle.classList.remove('rotating');
  }, 750);
});

  // === Thème ===
  function updateLogo(theme) {
    if (theme === 'light') {
      logo_jupyter.src = 'styles/Jupyter_logo_clair.png';
      logo_open_neb.src = 'styles/OpenNebula_logo_clair.png';
    } else {
      logo_jupyter.src = 'styles/Jupyter_logo_sombre.png';
      logo_open_neb.src = 'styles/OpenNebula_logo_sombre.png';
    }
  }

  if (!localStorage.getItem('theme')) {
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
    toggle.checked = true;
    updateLogo('dark');
  } else {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      toggle.checked = false;
      updateLogo('light');
    } else {
      document.body.classList.remove('light-mode');
      toggle.checked = true;
      updateLogo('dark');
    }
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      updateLogo('dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      updateLogo('light');
    }
  });

  // === Ouvrir lien matière ===
  function ouvrirLien() {
    const matiere = document.getElementById('matiere').value;
    const isIut = locationToggle.checked;
    const base = "https://iut-info.univ-reims.fr/users/";

    let lienFinal;

    if (isIut) {
      if (matiere === "prevost") {
        lienFinal = "http://prevost/Menu.php";
      } else {
        lienFinal = "http://" + matiere + "/";
      }
    } else {
      if (matiere === "coutant" || matiere === "blanchard") {
        lienFinal = base + matiere + "/";
      } else {
        lienFinal = base + matiere + "/restricted/";
      }
    }

    window.open(lienFinal);
  }
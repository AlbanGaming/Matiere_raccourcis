  const toggle = document.getElementById('themeToggle');
  const logo = document.getElementById('logo');
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');

  menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('hidden');

  // Ajouter la classe qui lance l'animation
  menuToggle.classList.add('rotating');

  // Retirer la classe après 1 seconde pour arrêter l'animation
  setTimeout(() => {
    menuToggle.classList.remove('rotating');
  }, 750);
});


  function updateLogo(theme) {
    if (theme === 'light') {
      logo.src = 'styles/Jupyter_logo_clair.png';
    } else {
      logo.src = 'styles/Jupyter_logo_sombre.png';
    }
  }

  // Appliquer le thème sombre par défaut
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

  // Gérer le changement de thème via le switch
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

  function ouvrirLien() {
    const matiere = document.getElementById('matiere').value;
    const base = "https://iut-info.univ-reims.fr/users/";
  
    let lienFinal;
    if (matiere === "coutant") {
      lienFinal = base + matiere + "/";
    } else {
      lienFinal = base + matiere + "/restricted/";
    }

    window.open(lienFinal);
  }

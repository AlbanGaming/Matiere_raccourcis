// Liste des fiches de révision affichées dans revision/index.html.
// Pour ajouter une fiche : copier un bloc { ... } et adapter les champs.
//   href      : chemin depuis le dossier revision/
//   semestres : un ou plusieurs de "S1", "S2", "S3"…
//   domaine   : une clé de DOMAINES ci-dessous
//   activites : des clés d'ACTIVITES ci-dessous
//   code      : code du module si connu (facultatif)
//   nouveau / valide : badges facultatifs

window.REVISION_DOMAINES = {
  bdd:        { label: "Base de données",   couleur: "teal" },
  web:        { label: "Web",               couleur: "blue" },
  reseau:     { label: "Réseau",            couleur: "orange" },
  maths:      { label: "Maths",             couleur: "violet" },
  droit:      { label: "Droit",             couleur: "pink" },
  gestion:    { label: "Gestion & SI",      couleur: "amber" },
  conception: { label: "Conception objet",  couleur: "green" }
};

window.REVISION_ACTIVITES = {
  cours:   "Cours",
  fiche:   "Fiche mémo",
  quiz:    "Quiz",
  flash:   "Flashcards",
  exos:    "Exercices",
  sujets:  "Sujets blancs",
  tp:      "TP",
  outils:  "Simulateur / calculateur"
};

window.REVISION_FICHES = [
  /* ---------------- Semestre 3 ---------------- */
  {
    titre: "Conception orientée objet & UML",
    code: "R3.03",
    href: "revision_COO_UML_S3.html",
    semestres: ["S3"],
    domaine: "conception",
    nouveau: true,
    description: "Du besoin au code : cas d'utilisation, scénarios, DSS, diagramme de classes et ses 8 relations, diagramme d'objets.",
    notions: ["Cas d'utilisation", "Scénarios", "DSS", "Classes", "Associations", "Agrégation / composition", "Héritage", "Polymorphisme", "Énumérations", "Diagramme d'objets"],
    activites: ["cours", "fiche", "flash", "exos", "quiz"]
  },
  {
    titre: "Architecture réseau",
    code: "R3.06",
    href: "revision-reseau-s3/revision_reseau_S3.html",
    semestres: ["S3"],
    domaine: "reseau",
    description: "Commandes Cisco dans un terminal simulé, quiz, cartes mémoire, exercices type contrôle et sujet blanc.",
    notions: ["Commandes Cisco", "Packet Tracer", "Routage", "OSPF", "ACL", "NAT", "Masques inversés", "Aide-mémoire A4"],
    activites: ["fiche", "outils", "quiz", "flash", "exos", "sujets", "tp"]
  },
  {
    titre: "Probabilités",
    href: "revision_proba.html",
    semestres: ["S3"],
    domaine: "maths",
    description: "Dénombrement, probabilités, lois discrètes et continues, avec deux sujets blancs corrigés.",
    notions: ["Dénombrement", "Probabilités conditionnelles", "Indépendance", "Loi binomiale", "Loi de Poisson", "Variables aléatoires", "Loi normale", "Loi exponentielle"],
    activites: ["cours", "fiche", "flash", "quiz", "exos", "sujets"]
  },
  {
    titre: "SQL & PL/SQL",
    href: "revision-sql/index.html",
    semestres: ["S3"],
    domaine: "bdd",
    description: "Bases du cours et des TP, les 10 pièges classiques, flashcards, quiz, exercices et mémento PDF.",
    notions: ["SQL", "PL/SQL", "Curseurs", "Procédures", "Fonctions", "Exceptions", "Triggers", "Pièges classiques", "Mémento"],
    activites: ["cours", "tp", "fiche", "flash", "quiz", "exos"]
  },
  {
    titre: "Droit des contrats & du numérique",
    href: "revision-droit-s3/revision_droit_S3.html",
    semestres: ["S3"],
    domaine: "droit",
    description: "Contrats et obligations, droit du travail, données personnelles, informatique et multimédia, et méthode d'analyse de contrat.",
    notions: ["Contrats", "Obligations", "Droit du travail", "Données personnelles", "RGPD", "Droit d'auteur", "Logiciel", "Analyse de contrat"],
    activites: ["cours", "flash", "quiz", "exos"]
  },

  /* ---------------- Semestre 2 ---------------- */
  {
    titre: "SQL Oracle",
    href: "revision_SQL.html",
    semestres: ["S1", "S2"],
    domaine: "bdd",
    valide: true,
    description: "Requêtes SQL sous Oracle, de la jointure aux requêtes hiérarchiques, plus DDL, DML et les pièges classiques.",
    notions: ["Jointures", "Agrégation", "Sous-requêtes", "Ensemblistes", "EXISTS", "Arborescences", "DDL", "DML", "Vues", "Séquences", "Droits", "Transactions"],
    activites: ["cours", "fiche"]
  },
  {
    titre: "Protocole HTTP",
    href: "revision_HTTP.html",
    semestres: ["S2"],
    domaine: "web",
    description: "De l'URL à la réponse : URI, messages, codes d'état, cache, cookies et XSS, avec des exercices pour construire URI et requêtes.",
    notions: ["URI", "Requêtes", "Réponses", "Codes d'état", "En-têtes", "Cache", "Cookies", "XSS"],
    activites: ["cours", "quiz", "exos"]
  },
  {
    titre: "PHP Web",
    href: "revision_php-web.html",
    semestres: ["S2"],
    domaine: "web",
    description: "HTTP, cookies et sessions, puis PHP objet : classes, héritage, traits, exceptions, namespaces et autoload.",
    notions: ["Cookies", "Sessions", "Classes", "Static", "Héritage", "Traits", "Exceptions", "Clonage", "Namespaces", "Autoload"],
    activites: ["cours", "quiz", "flash"]
  },
  {
    titre: "Réseau bas niveau",
    code: "R2.04",
    href: "revision_MR204.html",
    semestres: ["S2"],
    domaine: "reseau",
    description: "Wireshark (ICMP, ARP), commutation et VLAN, Wi-Fi 802.11 et sous-réseaux IPv4/IPv6, chapitre par chapitre et TP par TP.",
    notions: ["Wireshark", "ICMP", "ARP", "Commutation", "VLAN", "Wi-Fi 802.11", "Sous-réseaux", "IPv4", "IPv6"],
    activites: ["cours", "tp", "quiz", "flash", "fiche"]
  },
  {
    titre: "Services réseau",
    code: "R2.05",
    href: "revision_MR205.html",
    semestres: ["S2"],
    domaine: "reseau",
    description: "DHCP, DNS et BIND, FTP, SSH, LDAP et messagerie, avec les TP de configuration.",
    notions: ["DHCP", "DNS", "BIND", "FTP", "SSH", "LDAP", "Messagerie", "Accès distant"],
    activites: ["cours", "tp", "flash", "quiz", "fiche"]
  },
  {
    titre: "Statistiques descriptives",
    href: "revision_stats.html",
    semestres: ["S2"],
    domaine: "maths",
    description: "Variables, indicateurs de position et de dispersion, graphiques et statistiques bivariées, avec toutes les formules au même endroit.",
    notions: ["Types de variables", "Distribution groupée", "Moyenne", "Médiane", "Écart-type", "Quartiles", "Graphiques", "Bivariée", "Corrélation"],
    activites: ["cours", "fiche", "quiz"]
  },
  {
    titre: "Gestion des SI : comptabilité",
    code: "R2.10",
    href: "revision_intro_MR210.html",
    semestres: ["S2"],
    domaine: "gestion",
    description: "Bases de la comptabilité : facturation et TVA, bilan et compte de résultat, amortissements, avec calculatrices et points clés des TP 2 et 3.",
    notions: ["Comptabilité", "Partie double", "PCG", "Facturation", "TVA", "Remises", "Marge", "Bilan", "Compte de résultat", "Amortissements"],
    activites: ["cours", "quiz", "flash", "outils", "tp"]
  },
  {
    titre: "Gestion de projet informatique",
    code: "R2.10",
    href: "MR210/revision_MR210.html",
    semestres: ["S2"],
    domaine: "gestion",
    description: "PERT, COCOMO, Gantt, gestion des ressources et RACI, avec calculateurs et exercices types examen.",
    notions: ["PERT", "Chemin critique", "COCOMO", "Gantt", "Ressources", "RACI"],
    activites: ["cours", "quiz", "exos", "outils"]
  },
  {
    titre: "UML : bases de la conception objet",
    href: "UML/revision_UML.html",
    semestres: ["S2"],
    domaine: "conception",
    description: "Classes, visibilité, multiplicités, navigabilité, classes d'association et traduction en PHP.",
    notions: ["Classes", "Attributs", "Méthodes", "Visibilité", "Multiplicités", "Navigabilité", "Classe d'association", "Association n-aire", "Traduction PHP"],
    activites: ["cours", "quiz", "exos"]
  },
  {
    titre: "Droit",
    code: "R2.11",
    href: "revision_droit.html",
    semestres: ["S2"],
    domaine: "droit",
    description: "Branches du droit, juridictions, preuve et responsabilité, plus la méthode de la fiche d'arrêt sur des cas concrets.",
    notions: ["Branches du droit", "Juridictions", "Moyens de preuve", "Responsabilité", "Fiche d'arrêt", "Cas pratiques"],
    activites: ["cours", "fiche", "quiz", "exos"]
  },

  /* ---------------- Semestre 1 ---------------- */
  {
    titre: "HTML & CSS",
    code: "R1.02",
    href: "revision_HTML.html",
    semestres: ["S1"],
    domaine: "web",
    description: "Structure HTML5, sélecteurs CSS, Flexbox et responsive design, avec des exercices interactifs.",
    notions: ["HTML5", "Sélecteurs CSS", "Flexbox", "Responsive", "Media queries"],
    activites: ["cours", "quiz", "exos"]
  }
];

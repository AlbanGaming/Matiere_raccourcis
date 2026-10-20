# Accès rapide aux matières — README

Ce document explique comment utiliser les différentes fonctionnalités du site, notamment pour ajouter ou modifier des liens de révision. 

---

## 1. Ajouter un lien de révision dans un semestre

Les liens sont organisés par semestre dans le menu de révision (`#revisionMenu`), à l'intérieur de `index.html`.

Chaque semestre est un bloc `.revision-group` contenant :
- un titre cliquable (`h4.revision-subtitle.revision-subtitle-toggle`)
- un conteneur de liens (`div.revision-group-links`)

Pour ajouter un lien, insère une balise `<a>` dans le `.revision-group-links` du semestre concerné :

```html
<div class="revision-group-links hidden" data-group-links="s1">
  <a href="revision/revision_XXX.html">Nom de la matière</a>
</div>
```

⚠️ Le titre (`h4`) et son conteneur de liens doivent toujours se suivre directement dans le HTML (pas d'élément entre les deux), sinon l'accordéon ne trouvera pas le bon groupe à ouvrir/fermer.

---

## 2. Ajouter un nouveau semestre (groupe accordéon)

Pour créer un nouveau groupe (ex: Semestre 3), copie ce modèle :

```html
<div class="revision-group">
  <h4 class="revision-subtitle revision-subtitle-toggle" data-group="s3">
    Semestre 3 <span class="arrow">▸</span>
  </h4>
  <div class="revision-group-links hidden" data-group-links="s3">
    <a href="revision/revision_XXX.html">Matière</a>
  </div>
</div>
```

Points importants :
- `data-group="s3"` sur le titre et le comportement d'ouverture/fermeture sont liés automatiquement par le script (`nextElementSibling`) — pas besoin de modifier le JS.
- La classe `hidden` sur `.revision-group-links` fait que le groupe démarre fermé par défaut.
- L'état ouvert/fermé de chaque groupe est mémorisé automatiquement dans le `localStorage` du navigateur (clé `revision-group-s3`), donc pas d'action supplémentaire nécessaire.

---

## 3. Marquer une matière comme "NOUVEAU"

Ajoute simplement la classe `new-content` sur le lien `<a>` :

```html
<a href="revision/revision_XXX.html" class="new-content">Nom de la matière</a>
```

Cela affiche automatiquement un badge "NOUVEAU" pulsant à droite du lien. Rien d'autre à faire (le style est déjà défini dans `styles.css`).

---

## 4. Marquer une matière comme "Validé par un professeur"

Ajoute simplement la classe `validated` sur le lien `<a>` :

```html
<a href="revision/revision_XXX.html" class="validated">Nom de la matière</a>
```

Cela ajoute automatiquement :
- un emoji ✅ devant le nom de la matière
- une infobulle "Validé par un professeur" qui apparaît au survol du lien

Rien d'autre à écrire — pas de `title`, pas de `<span>` supplémentaire. Tout est géré par le CSS (`::before` et `::after`) sur la classe `.validated`.

Une matière peut cumuler les deux classes si besoin :

```html
<a href="revision/revision_XXX.html" class="validated new-content">Nom de la matière</a>
```

---

## 5. Autres fonctionnalités du site

### Thème clair / sombre
Bouton en haut à gauche (`#themeToggle`). Le choix est mémorisé dans `localStorage` (clé `theme`).

### Localisation IUT / Chez soi
Switch en haut à droite (`#locationToggle`). Bascule l'affichage des liens marqués `iut-only` (ex: phpMyAdmin, emploi du temps, OpenNebula) qui ne sont visibles que sur le réseau de l'IUT ou en VPN. Mémorisé dans `localStorage` (clé `location`).

### Menu révisions
Bouton 📚 en haut à gauche (`#revisionToggle`). Ouvre/ferme le menu latéral des révisions par semestre.

### Menu paramètres
Bouton ⚙️ en haut à droite (`#menuToggle`). Donne accès aux liens rapides (Jupyter, URCA, Moodle, GitLab, IUT, phpMyAdmin, Croustillant, emploi du temps).

### Sélecteur de matière (page d'accueil)
Le menu déroulant central + bouton "Ouvrir le lien" redirige vers l'espace de cours du professeur sélectionné, avec une URL différente selon que le switch localisation est sur "IUT" ou "Chez soi" (voir la fonction `ouvrirLien()` dans `script.js`).

---

## 6. Structure des fichiers

```
index.html       → structure de la page
styles/styles.css → tous les styles (thème, menus, badges, tooltips)
scripts/script.js → logique JS (thème, accordéon, localisation, ouverture des liens)
revision/         → pages HTML de révision par matière
styles/tokens.css   → couleurs, polices et thème clair/sombre communs aux fiches
styles/revision.css → base commune des fiches + barre d'outils flottante
scripts/theme.js    → applique le thème (même réglage que l'accueil)
scripts/revision.js → barre d'outils (Accueil, thème, haut de page), barre de lecture
```

---

## 7. Thème commun des fiches de révision

Toutes les fiches de `revision/` partagent la même identité : mêmes polices (Bricolage Grotesque pour les titres, Figtree pour le texte, JetBrains Mono pour le code), même palette, et un thème clair / sombre qui suit le switch de la page d'accueil (clé `theme` du `localStorage`). Sans réglage enregistré, les fiches suivent le thème du système.

Chaque fiche a aussi, en bas à droite, une barre d'outils : retour à l'accueil, changement de thème, retour en haut de page. Une fine barre en haut de l'écran montre la progression de lecture.

### Brancher une nouvelle fiche sur le thème

Dans le `<head>`, juste après `<meta charset>` (adapter `../` selon la profondeur du dossier) :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap">
<link rel="stylesheet" href="../styles/tokens.css">
<link rel="icon" type="image/png" href="../styles/favicon.png">
<script src="../scripts/theme.js"></script>
```

Juste avant `</head>` (après le `<style>` de la fiche) :

```html
<link rel="stylesheet" href="../styles/revision.css">
```

Juste avant `</body>` :

```html
<script src="../scripts/revision.js"></script>
```

Dans le CSS de la fiche, utiliser les variables plutôt que des couleurs en dur, sinon le thème sombre ne s'applique pas :

| Rôle | Variable |
|---|---|
| Fond de page / cartes | `--r-bg`, `--r-surface`, `--r-surface-2`, `--r-surface-3` |
| Bordures | `--r-border`, `--r-border-strong` |
| Texte (fort → discret) | `--r-text`, `--r-text-2`, `--r-text-3` |
| Accent (liens, boutons) | `--r-accent`, `--r-accent-soft`, texte sur accent : `--r-on-accent` |
| Couleurs de catégorie | `--r-blue`, `--r-violet`, `--r-pink`, `--r-red`, `--r-orange`, `--r-amber`, `--r-green`, `--r-teal`, `--r-cyan` (+ `-soft` pour les fonds) |
| Surligneur « à retenir » | `--r-mark`, `--r-mark-soft` (ou simplement la balise `<mark>`) |
| Polices | `--r-font-display`, `--r-font-body`, `--r-font-mono` |

Si un élément fixé en bas de la fiche gêne la barre d'outils, la remonter avec `--rv-dock-bottom` dans le `:root` de la fiche (exemple : la fiche Stats, à cause de sa barre de navigation du bas).

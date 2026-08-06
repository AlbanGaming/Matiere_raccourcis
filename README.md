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
```

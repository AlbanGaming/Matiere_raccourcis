// ============================================================
// Données du site de révision — Gestion des SI (BUT Informatique S2)
// ============================================================

const CHAPTERS = [
  {
    id: "accueil",
    num: "00",
    label: "Accueil",
    title: "Réviser la Gestion des SI",
    dek: "Cahier des charges, cycles de vie logiciel et UML (cas d'utilisation, classes, séquence) — condensés à partir du cours, des cahiers du programmeur et des exercices corrigés.",
    body: `
      <p>Ce site rassemble les notions essentielles du cours de <strong>Gestion des Systèmes d'Information</strong> :
      comment rédiger un cahier des charges, comment choisir et justifier un cycle de vie de projet, et comment
      modéliser un système avec les trois diagrammes UML au programme (cas d'utilisation, classes, séquence).</p>
      <p>Chaque chapitre reprend la structure du cours, avec les définitions à connaître, les pièges classiques
      relevés dans les exercices corrigés, et des exemples concrets (distributeur bancaire, médiathèque, site
      e-commerce, réservation de vols…).</p>
      <div class="callout retenir">
        <span class="label">Comment utiliser ce site</span>
        Lis un chapitre, puis teste-toi avec les <strong>flashcards</strong> du même thème, et termine par le
        <strong>quiz</strong> général pour vérifier ce qui doit encore être travaillé.
      </div>
      <div class="figure">
        <img src="images/image1.png" alt="Illustration de couverture façon cahier d'ingénieur : sur une page de carnet quadrillé posée sur une table à dessin bleu nuit, on voit à main levée un diagramme de cas d'utilisation UML (un acteur bonhomme-bâton relié à des ovales) et un diagramme de classes simplifié, dessinés à l'encre bleue et annotés en rouge ; ambiance rétro-technique, précise, sans texte lisible en toutes lettres, style illustration éditoriale plate">
        <figcaption>Vue d'ensemble du cours : du besoin exprimé au diagramme UML.</figcaption>
      </div>
      <h2>Sommaire</h2>
      <ul>
        <li><strong>Le cahier des charges</strong> — à quoi il sert, ce qu'il doit contenir</li>
        <li><strong>Les cycles de vie</strong> — cascade, V, Y, spirale, itératif/incrémental, RUP, méthodes agiles</li>
        <li><strong>Diagramme de cas d'utilisation</strong> — acteurs, include/extend/generalize</li>
        <li><strong>Diagramme de classes</strong> — associations, multiplicités, héritage, agrégation/composition</li>
        <li><strong>Diagramme de séquence</strong> — messages, fragments loop/alt/opt</li>
        <li><strong>Études de cas</strong> — GAB, médiathèque, panier e-commerce</li>
      </ul>
    `
  },

  {
    id: "cahier-des-charges",
    num: "01",
    label: "Cahier des charges",
    title: "Le cahier des charges (CdCF)",
    dek: "Le document qui exprime le besoin avant toute solution technique.",
    body: `
      <h2>Définition</h2>
      <p>Le <strong>cahier des charges fonctionnel (CdCF)</strong> est un document qui formule le besoin du client,
      au moyen de fonctions détaillant les services rendus par le produit et les contraintes auxquelles il est
      soumis.</p>
      <div class="callout piege">
        <span class="label">Piège classique</span>
        Un cahier des charges ne doit <strong>jamais</strong> proposer de solution de conception. Il définit
        <em>quel</em> environnement et <em>quelles</em> fonctions — jamais le <em>comment</em>.
      </div>

      <h2>À quoi ça sert ?</h2>
      <p>Pour un petit projet personnel, il n'est pas indispensable. Pour une entreprise, il est incontournable :
      il donne au concepteur une description complète du projet — son rôle, son périmètre — avant même qu'il
      réfléchisse à la façon de le réaliser.</p>

      <h2>La démarche normalisée en 3 parties</h2>
      <ol>
        <li><strong>Introduction au problème posé</strong> — description claire et succincte du projet, objectif,
        contexte, prévisions de dépenses/bénéfices, personnes concernées.</li>
        <li><strong>Expression fonctionnelle du besoin</strong> — la partie clé : elle définit les fonctions et
        les contraintes. Outil recommandé : le <strong>diagramme de cas d'utilisation</strong>.</li>
        <li><strong>Solutions proposées pour répondre au besoin</strong> — transition vers la conception ; on
        esquisse des pistes pour découper le projet en sous-projets, sans encore concevoir.</li>
      </ol>

      <h3>Zoom sur l'expression fonctionnelle du besoin</h3>
      <p>Les diagrammes de cas d'utilisation décrivent les fonctionnalités d'un système du <strong>point de vue de
      l'utilisateur</strong>. Ils servent à :</p>
      <ul>
        <li>mettre en évidence les services rendus par le système ;</li>
        <li>fixer le périmètre entre le système et son environnement.</li>
      </ul>
      <p>La démarche se déroule en trois temps : identification des acteurs, identification des cas d'utilisation,
      définition des scénarios.</p>

      <h2>Ce qu'un cahier des charges doit inclure (projet web)</h2>
      <div class="chips">
        <span class="chip">Présentation de l'application</span>
        <span class="chip">Description de l'entreprise</span>
        <span class="chip">Description fonctionnelle</span>
        <span class="chip">Prototype / maquette (Figma)</span>
        <span class="chip">Charte graphique</span>
        <span class="chip">Exemples de pages</span>
        <span class="chip">Livrables & calendrier</span>
      </div>

      <div class="figure">
        <img src="images/image2.png" alt="Schéma pédagogique en style croquis d'ingénieur montrant un entonnoir en trois étages sur fond de papier quadrillé bleu : en haut 'introduction au problème', au milieu 'expression fonctionnelle du besoin' avec un petit diagramme de cas d'utilisation stylisé, en bas 'solutions proposées' représenté par des blocs qui se séparent en sous-projets ; flèches à main levée à l'encre noire, légendes en pointillés rouges">
        <figcaption>La démarche normalisée du cahier des charges, en trois étapes.</figcaption>
      </div>

      <div class="callout retenir">
        <span class="label">À retenir</span>
        Le CdCF répond aux questions « qu'est-ce que c'est ? », « à quoi ça sert ? » et « quelles fonctions et
        contraintes ? » — jamais à la question « comment le construire ? ».
      </div>
    `
  },

  {
    id: "cycles-de-vie",
    num: "02",
    label: "Cycles de vie",
    title: "Les cycles de vie du logiciel",
    dek: "Cascade, V, Y, spirale, itératif/incrémental, RUP et méthodes agiles.",
    body: `
      <h2>Pourquoi ce sujet existe : la crise du logiciel</h2>
      <p>Le Génie Logiciel est né en 1968 (colloque de l'OTAN à Garmish-Partenkirchen) en réponse à un constat :
      le logiciel n'est pas fiable, il est rarement livré dans les délais, et il ne satisfait pas toujours le
      cahier des charges.</p>
      <div class="callout">
        <span class="label">Chiffres à connaître</span>
        Étude Standish Group (1995, 8 380 projets) : <strong>16 % de succès</strong>, 53 % de projets
        « problématiques » (délais/budget non tenus), <strong>31 % d'échecs</strong> (projet abandonné).
        Le taux de succès décroît avec la taille du projet.
      </div>
      <p>La maintenance absorbe environ <strong>67 %</strong> de l'effort de développement total, alors que la
      définition des besoins n'en représente que 6 % — mais concentre 56 % des erreurs. D'où l'importance de
      bien cadrer les besoins en amont (cahier des charges, analyse).</p>

      <h2>Les grandes étapes d'un développement</h2>
      <p>Expression des besoins → Analyse (le <em>quoi</em>) → Conception préliminaire puis détaillée (le
      <em>comment</em>) → Développement + tests unitaires → Intégration → Validation (recette client) →
      Exploitation / maintenance.</p>

      <h2>Le cycle en cascade</h2>
      <p>Le projet est découpé en phases successives et strictement séquentielles ; chaque phase ne peut remettre
      en cause que la précédente.</p>
      <div class="two-col">
        <div class="box good"><h4>Avantages</h4><ul>
          <li>Tâches et livrables bien définis</li>
          <li>Sépare le métier de la technique</li>
        </ul></div>
        <div class="box bad"><h4>Inconvénients</h4><ul>
          <li>Il faut connaître tout le besoin dès le départ</li>
          <li>Validation fonctionnelle tardive</li>
          <li>Risque d'« effet tunnel »</li>
        </ul></div>
      </div>

      <h2>Le cycle en V</h2>
      <p>Reprend le principe de la cascade, mais chaque phase amont (ex. conception) prépare explicitement la
      phase de vérification correspondante en aval (ex. intégration teste la conception). Mêmes inconvénients
      que la cascade, avec en plus un risque d'<strong>intégration « big bang »</strong> en fin de projet.</p>

      <h2>Le cycle en Y</h2>
      <p>Sépare nettement <strong>analyse</strong> et <strong>conception</strong>, qui sont menées en parallèle.
      Le code est obtenu par des règles de transformation à partir de ces deux branches. Avantage clé :
      meilleure réutilisation (composants techniques et composants métier) et validation plus précoce.</p>

      <h2>Le cycle en spirale (Boehm, 1988)</h2>
      <p>Le projet est découpé en N phases, chacune validant un point technique ou fonctionnel précis (souvent via
      une maquette), <strong>chaque phase intégrant une analyse de risques</strong> qui peut remettre en cause la
      suite. Chaque phase peut elle-même suivre un cycle en V ou en Y.</p>

      <h2>Le cycle itératif et incrémental</h2>
      <p>Le projet est découpé en N itérations ; chaque itération étend le noyau logiciel construit par les
      itérations précédentes, et comporte sa propre analyse de risques.</p>
      <div class="callout retenir">
        <span class="label">Avantages du processus itératif</span>
        Pas d'effet tunnel, résultats visibles rapidement, meilleure traçabilité, ambiguïtés levées tôt — chaque
        itération répète Spécification → Conception → Implémentation → Tests.
      </div>

      <h3>Rational Unified Process (RUP)</h3>
      <p>Démarche associée à UML, définie par trois qualificatifs : <strong>pilotée par les cas d'utilisation</strong>,
      <strong>centrée sur l'architecture</strong>, <strong>itérative et incrémentale</strong>. Chaque itération
      traite en priorité les risques majeurs et produit une nouvelle version exécutable.</p>

      <h2>Les méthodes agiles et l'eXtreme Programming (XP)</h2>
      <p>Question de fond des méthodes agiles : quelles activités peut-on abandonner tout en gardant un logiciel
      de qualité, et comment rester réactif aux besoins prioritaires du client ? (Exemples : XP, DSDM, ASD, Crystal,
      SCRUM, FDD.)</p>
      <div class="two-col">
        <div class="box"><h4>Pratiques de gestion (XP)</h4><ul>
          <li>Livraisons fréquentes</li>
          <li>Planification itérative</li>
          <li>Client sur site</li>
          <li>Rythme durable (max. 40h/semaine)</li>
        </ul></div>
        <div class="box"><h4>Pratiques de programmation (XP)</h4><ul>
          <li>Conception simple</li>
          <li>Remaniement (refactoring) continu</li>
          <li>Tests unitaires systématiques</li>
          <li>Tests de recette automatisés</li>
        </ul></div>
      </div>

      <div class="figure">
        <img src="images/image3.png" alt="Frise chronologique dessinée à la main sur fond de papier quadrillé bleu, comparant cinq cycles de vie logiciel côte à côte : une cascade d'escaliers descendants pour le cycle en cascade, un profil de lettre V pour le cycle en V, une lettre Y stylisée pour le cycle en Y, une spirale concentrique avec des flèches pour le cycle en spirale, et une suite de petits cercles engrenés qui se répètent pour le cycle itératif ; traits à l'encre noire, annotations discrètes en rouge, esthétique de schéma d'ingénieur">
        <figcaption>Comparatif visuel des cycles de vie du logiciel.</figcaption>
      </div>
    `
  },

  {
    id: "cas-utilisation",
    num: "03",
    label: "Cas d'utilisation",
    title: "Diagramme de cas d'utilisation",
    dek: "Modéliser les besoins du point de vue de l'utilisateur.",
    body: `
      <h2>Vocabulaire de base</h2>
      <p><strong>Acteur</strong> : rôle joué par un utilisateur humain ou un autre système, qui interagit
      directement avec le système étudié. Un acteur participe à au moins un cas d'utilisation.</p>
      <p><strong>Cas d'utilisation (use case)</strong> : ensemble de séquences d'actions réalisées par le système,
      produisant un résultat observable et utile pour un acteur. C'est un service rendu de bout en bout, avec un
      déclenchement, un déroulement et une fin.</p>
      <div class="callout piege">
        <span class="label">Piège classique</span>
        Un acteur n'est <strong>pas</strong> une personne physique : c'est un <em>rôle</em>. Une même personne peut
        jouer plusieurs rôles (donc plusieurs acteurs), et plusieurs personnes peuvent jouer le même rôle. Évite
        les noms d'acteur trop vagues comme « utilisateur » ou « usager ».
      </div>

      <h2>Identifier les acteurs</h2>
      <p>Questions à se poser : qui est intéressé par le besoin ? qui utilise le système ? qui en bénéficie ? qui
      fournit / maintient l'information ? quelque chose est-il produit automatiquement par le système (traitement
      batch) ?</p>
      <p>On distingue l'<strong>acteur principal</strong> (celui pour qui le cas d'utilisation produit la
      plus-value métier — généralement le déclencheur) des <strong>acteurs secondaires</strong>, sollicités en
      cours de route pour des informations complémentaires. Un cas d'utilisation a toujours un acteur principal,
      et éventuellement des acteurs secondaires.</p>

      <h2>Les relations</h2>
      <table class="uc">
        <tr><th>Relation</th><th>Sens</th><th>Exemple</th></tr>
        <tr><td><strong>Association</strong></td>
            <td>Seule relation possible entre un acteur et un cas d'utilisation ; signifie « participe à ».</td>
            <td>Client — Retirer argent</td></tr>
        <tr><td><strong>«include»</strong></td>
            <td>Le cas de base incorpore <em>obligatoirement</em> un autre cas, à un endroit précis de son
            déroulement (factorise un sous-comportement commun).</td>
            <td>Retirer argent «include» Valider identité</td></tr>
        <tr><td><strong>«extend»</strong></td>
            <td>Le cas de base peut être complété <em>optionnellement</em> par un autre cas, à un point
            d'extension (déconseillé dans un modèle strict, mais courant en pratique).</td>
            <td>Consulter solde «extend» Retirer argent</td></tr>
        <tr><td><strong>Généralisation</strong></td>
            <td>Un cas descendant hérite du comportement d'un cas parent ; relation entre les <em>cas</em>
            eux-mêmes (pas entre leurs instances).</td>
            <td>Retirer argent au distributeur ↗ Retirer argent</td></tr>
      </table>
      <p>Les relations «include» et «extend» sont en réalité des <strong>dépendances</strong> : si B inclut ou
      étend A, alors B dépend de A (toute modification de A peut impacter B).</p>

      <div class="figure">
        <img src="images/image4.png" alt="Diagramme de cas d'utilisation dessiné à la main sur papier quadrillé : à gauche un acteur bonhomme-bâton nommé Client, relié par des traits pleins à trois ovales 'Retirer argent', 'Consulter solde' et 'Déposer argent' ; une flèche pointillée étiquetée include part de 'Retirer argent' vers un ovale 'Valider identité' ; une flèche pointillée étiquetée extend part de 'Consulter solde' vers 'Retirer argent' ; tout est encadré par un grand rectangle représentant le système ; encre noire et rouge, style croquis technique">
        <figcaption>Exemple type de diagramme de cas d'utilisation (distributeur bancaire).</figcaption>
      </div>

      <h2>Étude de cas : le distributeur de billets (GAB)</h2>
      <p>Description textuelle détaillée d'un cas d'utilisation — c'est l'autre livrable attendu en plus du
      diagramme, format recommandé (façon A. Cockburn) :</p>
      <table class="uc">
        <tr><th>Champ</th><th>Contenu</th></tr>
        <tr><td>Identification</td><td>USC1</td></tr>
        <tr><td>Titre</td><td>Retirer de l'argent</td></tr>
        <tr><td>Acteurs</td><td>Un client du GAB</td></tr>
        <tr><td>Pré-condition</td><td>USC0 (le client est identifié)</td></tr>
        <tr><td>Post-conditions</td><td>Le client a retiré de l'argent, a un reçu, reprend sa carte</td></tr>
      </table>
      <p>Le scénario nominal alterne les actions du client et les réponses du système, étape par étape. Les
      scénarios alternatifs couvrent les cas particuliers : solde insuffisant, client refusant le reçu, nouvelle
      opération demandée…</p>
      <div class="callout retenir">
        <span class="label">À retenir</span>
        Un bon cas d'utilisation documente <strong>toujours</strong> le scénario nominal <em>et</em> les
        principaux scénarios alternatifs (erreurs, cas limites) — c'est souvent là que se jouent les points en
        examen.
      </div>
    `
  },

  {
    id: "diagramme-classes",
    num: "04",
    label: "Diagramme de classes",
    title: "Diagramme de classes",
    dek: "La structure statique du système : classes, associations, héritage.",
    body: `
      <h2>Les briques de base</h2>
      <p><strong>Classe</strong> : description abstraite d'un ensemble d'objets partageant les mêmes propriétés
      (attributs, associations) et comportements (opérations, états). <strong>Objet</strong> : instance d'une
      classe, aux frontières bien définies, encapsulant un état et un comportement.</p>
      <p><strong>Attribut</strong> : donnée portée par une classe. Un <strong>attribut dérivé</strong> (noté
      <code>/nom</code>) peut être déduit d'autres informations du modèle (ex. <code>/duree</code> d'un vol,
      calculable à partir des heures de départ et d'arrivée) — on ne le stocke pas forcément, on peut le calculer.</p>
      <p><strong>Opération</strong> : élément de comportement déclaré au niveau d'une classe, avec d'éventuels
      paramètres typés et un type de retour.</p>

      <h2>Association et multiplicité</h2>
      <p>Une association est une relation sémantique <strong>durable</strong> entre deux classes, bidirectionnelle
      par défaut (on peut restreindre sa navigabilité avec une flèche). La multiplicité indique, à chaque
      extrémité, combien d'objets peuvent participer à la relation.</p>
      <div class="chips">
        <span class="chip">0..1 = optionnel</span>
        <span class="chip">1 = exactement un</span>
        <span class="chip">0..* (ou *) = quelconque</span>
        <span class="chip">1..* = au moins un</span>
      </div>
      <p>Le <strong>rôle</strong> nomme une extrémité d'association (ex. la classe <em>Vol</em> voit l'aéroport côté
      « départ » et côté « arrivée » — deux rôles différents pour la même classe cible).</p>

      <h2>Agrégation vs composition</h2>
      <div class="two-col">
        <div class="box"><h4>Agrégation ◇</h4><ul>
          <li>Relation de contenance non symétrique</li>
          <li>Une partie peut être partagée entre plusieurs agrégats</li>
        </ul></div>
        <div class="box"><h4>Composition ◆</h4><ul>
          <li>Agrégation « forte »</li>
          <li>Une partie n'appartient qu'à un seul composite</li>
          <li>La destruction du composite détruit ses parties</li>
        </ul></div>
      </div>

      <h2>Généralisation / héritage</h2>
      <p>Une <strong>super-classe</strong> factorise les propriétés communes de plusieurs <strong>sous-classes</strong>,
      qui héritent de ses attributs et opérations et peuvent en ajouter de spécifiques. Une <strong>classe
      abstraite</strong> (notée en italique) ne s'instancie jamais directement — elle sert uniquement à factoriser.</p>

      <h2>Concepts avancés</h2>
      <ul>
        <li><strong>Classe d'association</strong> : une association « promue » au rang de classe, qui porte donc
        elle-même des attributs propres à chaque lien (ex. la date d'un emprunt entre Lecteur et Livre).</li>
        <li><strong>Qualificatif</strong> : attribut qui « partitionne » les objets liés à un objet donné dans une
        association multiple (ex. le numéro de vol qualifie l'association entre une compagnie aérienne et ses vols,
        ce qui réduit la multiplicité côté vol : à un numéro donné correspond au plus un vol).</li>
        <li><strong>Contrainte</strong> : condition sur un ou plusieurs éléments, notée entre accolades
        <code>{frozen}</code>, <code>{ordered}</code>…</li>
        <li><strong>Dépendance</strong> : relation faible où la modification d'un élément peut affecter l'autre
        (flèche pointillée).</li>
      </ul>

      <h3>Les trois catégories de classes d'analyse (Jacobson / RUP)</h3>
      <table class="uc">
        <tr><th>Catégorie</th><th>Rôle</th><th>Contient</th></tr>
        <tr><td><strong>Dialogue</strong></td><td>Interaction avec l'utilisateur (écrans)</td>
            <td>Attributs + opérations</td></tr>
        <tr><td><strong>Contrôle</strong></td><td>Logique applicative, règles métier</td>
            <td>Opérations seulement</td></tr>
        <tr><td><strong>Entité</strong></td><td>Concepts métier, souvent persistants</td>
            <td>Attributs seulement</td></tr>
      </table>

      <div class="figure">
        <img src="images/image5.png" alt="Diagramme de classes UML dessiné à la main sur papier quadrillé bleu : trois rectangles de classe reliés par des lignes, celui de gauche nommé CompagnieAerienne relié par un losange vide (agrégation) à celui du centre nommé Vol qui porte des attributs 'dateDepart' et 'heureDepart' listés à l'intérieur, avec des chiffres de multiplicité 1 et 0..* près des extrémités des lignes ; une flèche triangulaire vide part d'un rectangle plus petit en bas vers Vol pour représenter l'héritage ; annotations à l'encre rouge dans les marges">
        <figcaption>Anatomie d'un diagramme de classes : associations, multiplicités, héritage.</figcaption>
      </div>

      <h2>Méthode : passer d'un texte à un diagramme de classes</h2>
      <p>Exemple fil rouge (réservation de vols) : on part de phrases en langage naturel («&nbsp;un vol a un
      aéroport de départ et un aéroport d'arrivée&nbsp;») et on les modélise une à une.</p>
      <ol>
        <li>Repérer les <strong>concepts candidats</strong> (noms communs importants) → classes candidates.</li>
        <li>Un bon test objet/attribut : si on ne peut demander qu'<em>une valeur</em> à un élément, c'est un
        attribut ; si plusieurs questions s'y appliquent (et qu'il a lui-même des attributs ou des liens), c'en
        est un objet. (Ex. « aéroport » devient une classe, pas un simple attribut texte de Vol.)</li>
        <li>Placer les <strong>opérations</strong> dans la classe sur laquelle elles s'exécutent (« qui est ouvert
        à la réservation ? » → le Vol, pas la Compagnie).</li>
        <li>Affiner les <strong>multiplicités</strong> en interrogeant le modèle dans les deux sens (« un aéroport
        dessert plusieurs villes » ne dit rien sur « par combien d'aéroports une ville est desservie » — il faut
        le demander explicitement).</li>
        <li>Introduire un <strong>qualificatif</strong> ou une <strong>classe d'association</strong> quand une
        association simple devient trop chargée en informations.</li>
        <li>Découper en <strong>packages</strong> en minimisant les dépendances (idéalement à sens unique) entre
        eux.</li>
      </ol>
      <div class="callout retenir">
        <span class="label">Bonus — pattern de la métaclasse</span>
        Quand une classe porte trop de responsabilités hétérogènes (ex. <em>Vol</em> mélange les infos génériques
        du catalogue et les infos d'un vol daté précis), on la scinde en deux classes reliées par une association
        « * – 1 » : une classe <em>VolGenerique</em> (la « métaclasse ») et une classe <em>Vol</em> qui la décrit
        au quotidien. Cela évite de tout recréer à chaque nouvelle date de vol.
      </div>
    `
  },

  {
    id: "diagramme-sequence",
    num: "05",
    label: "Diagramme de séquence",
    title: "Diagramme de séquence",
    dek: "La dynamique : qui envoie quel message à qui, et dans quel ordre.",
    body: `
      <h2>Vocabulaire de base</h2>
      <p><strong>Ligne de vie</strong> : représente l'existence d'un participant (acteur ou objet) pendant
      l'interaction, verticalement.</p>
      <p><strong>Message</strong> : communication unidirectionnelle entre deux lignes de vie, qui déclenche une
      activité chez le destinataire.</p>
      <ul>
        <li><strong>Message synchrone</strong> (flèche pleine) : l'émetteur attend le retour avant de continuer.</li>
        <li><strong>Message asynchrone</strong> (flèche ouverte) : l'émetteur n'attend pas.</li>
        <li><strong>Retour</strong> (flèche pointillée) : résultat direct du message précédent.</li>
      </ul>
      <p><strong>Spécification d'activation</strong> : bande verticale qui matérialise une période d'activité sur
      une ligne de vie.</p>

      <h2>Les fragments d'interaction (UML 2)</h2>
      <table class="uc">
        <tr><th>Opérateur</th><th>Signifie</th></tr>
        <tr><td><code>loop</code></td><td>Boucle — le fragment peut s'exécuter plusieurs fois selon une condition
        de garde.</td></tr>
        <tr><td><code>opt</code></td><td>Optionnel — le fragment ne s'exécute que si la condition est vraie.</td></tr>
        <tr><td><code>alt</code></td><td>Alternative — un seul des fragments (celui dont la condition est vraie)
        s'exécute.</td></tr>
        <tr><td><code>ref</code></td><td>Renvoie explicitement vers une autre interaction nommée ailleurs.</td></tr>
      </table>

      <div class="figure">
        <img src="images/image6.png" alt="Diagramme de séquence UML dessiné à la main sur papier quadrillé : deux lignes de vie verticales en pointillés étiquetées Client et Caisse, reliées par des flèches horizontales pleines représentant des messages synchrones comme 'saisirArticle' et 'demanderPaiement', avec des flèches en retour en pointillés ; un grand cadre rectangulaire étiqueté loop entoure une portion du diagramme pour représenter une boucle sur chaque article ; encre noire avec quelques annotations rouges">
        <figcaption>Diagramme de séquence : messages, retours et fragment de boucle.</figcaption>
      </div>

      <h2>Étude de cas : paiement en liquide à une caisse</h2>
      <p>Le scénario typique demandé en exercice : pour chaque article, le caissier saisit le numéro et la
      quantité, la caisse retourne le prix et le libellé (boucle <code>loop</code>) ; à la fin de la vente, la
      caisse calcule et affiche le total ; le client règle en liquide ; la caisse indique la monnaie à rendre et
      imprime le ticket.</p>

      <h2>Du système au code : les 4 niveaux de raffinement</h2>
      <p>Sur l'exemple du panier d'un site e-commerce, on affine le même scénario à travers plusieurs diagrammes
      de séquence de plus en plus détaillés :</p>
      <ol>
        <li><strong>Séquence système</strong> : le système est une boîte noire (acteur ↔ « le système »).</li>
        <li><strong>Séquence d'analyse</strong> : on ouvre la boîte noire en trois types de classes — dialogue,
        contrôle, entité (voir chapitre Diagramme de classes).</li>
        <li><strong>Séquence de conception préliminaire</strong> : on précise quelles opérations sont
        effectivement appelées sur quelles classes.</li>
        <li><strong>Séquence de conception détaillée</strong> : on introduit les classes techniques de la
        plateforme cible (ex. pages ASP.NET, classes CodeBehind) — ce diagramme est presque directement
        traduisible en code.</li>
      </ol>
      <div class="callout retenir">
        <span class="label">À retenir</span>
        Un message ne peut être reçu par un objet que si sa classe déclare l'opération publique correspondante :
        le diagramme de séquence et le diagramme de classes doivent toujours rester cohérents entre eux.
      </div>
    `
  },

  {
    id: "etudes-de-cas",
    num: "06",
    label: "Études de cas",
    title: "Études de cas & méthode d'examen",
    dek: "Rappels transversaux à partir des exercices corrigés.",
    body: `
      <h2>Panorama des exercices classiques</h2>
      <p>Les sujets d'examen reprennent souvent le même schéma : un court texte métier, puis « modélisez cette
      situation par un diagramme de cas d'utilisation / de classes / de séquence ». Voici les cas rencontrés dans
      les exercices corrigés, à connaître comme trames de raisonnement :</p>
      <ul>
        <li><strong>Réservation de salles et matériel pédagogique</strong> (cas d'utilisation) — bien distinguer
        les droits par rôle (enseignant, étudiant, responsable de formation) : c'est un cas d'école pour les
        relations «include» entre « Réserver » et « Vérifier disponibilité ».</li>
        <li><strong>Distributeur automatique de billets (GAB/DAB)</strong> — cas d'utilisation <em>et</em>
        séquence : authentification obligatoire («include»), plusieurs scénarios alternatifs (carte invalide,
        code erroné, solde insuffisant).</li>
        <li><strong>Vente en magasin / caisse de supermarché</strong> — bon exemple de diagramme de séquence avec
        boucle sur les articles et alternative sur le mode de paiement.</li>
        <li><strong>Réservation de vols</strong> — le fil rouge du diagramme de classes : associations multiples
        (aéroport de départ / d'arrivée), qualificatif sur le numéro de vol, pattern de la métaclasse.</li>
        <li><strong>Gestion du panier d'un site e-commerce</strong> — illustre les quatre niveaux de raffinement
        d'un diagramme de séquence jusqu'au code.</li>
      </ul>

      <h2>Méthode pour un sujet de type « cas d'utilisation »</h2>
      <ol>
        <li>Souligner tous les <strong>rôles</strong> mentionnés dans l'énoncé → acteurs candidats.</li>
        <li>Souligner tous les <strong>verbes d'action</strong> réalisés par le système → cas d'utilisation
        candidats.</li>
        <li>Relier chaque acteur à ses cas d'utilisation par une association.</li>
        <li>Chercher les <strong>comportements obligatoires partagés</strong> entre plusieurs cas → «include».</li>
        <li>Chercher les <strong>comportements optionnels</strong> qui complètent un cas → «extend» (à utiliser
        avec parcimonie).</li>
      </ol>

      <h2>Méthode pour un sujet de type « diagramme de classes »</h2>
      <ol>
        <li>Repérer les noms communs métier importants → classes candidates.</li>
        <li>Pour chaque relation exprimée en langage naturel, poser la question dans <strong>les deux sens</strong>
        pour déterminer la multiplicité complète.</li>
        <li>Ne pas oublier de proposer des <strong>attributs métier</strong> même quand l'énoncé n'en donne pas
        explicitement (ex. nom, prénom d'un client).</li>
        <li>Vérifier qu'aucun attribut ne référence en fait une autre classe (signe qu'il manque une association).</li>
      </ol>

      <div class="callout piege">
        <span class="label">Erreur fréquente à l'examen</span>
        Confondre une <strong>agrégation</strong> et une <strong>composition</strong> : demande-toi toujours si la
        « partie » peut exister indépendamment du tout, et si elle peut être partagée par plusieurs touts. Si oui
        aux deux → agrégation. Si non → composition.
      </div>

      <div class="figure">
        <img src="images/image7.png" alt="Illustration façon page de cahier d'exercices corrigés : une double page de carnet quadrillé avec à gauche un petit diagramme de cas d'utilisation esquissé au crayon et à droite un diagramme de classes esquissé à l'encre, tous deux annotés de coches rouges et d'un tampon circulaire discret évoquant une correction de copie ; ambiance studieuse, précise, sans texte lisible">
        <figcaption>Penser « méthode » avant de dessiner : les questions à se poser systématiquement.</figcaption>
      </div>

      <h2>Lien avec le projet (SAE)</h2>
      <p>Le projet fil rouge du semestre (site de gestion d'un master, projets tutorés et stages) demande
      exactement cette chaîne d'outils : un <strong>cahier des charges</strong> comme premier livrable, puis des
      <strong>modèles UML</strong> (cas d'utilisation, classes) et une architecture, avant l'implémentation — la
      démarche SCRUM vue en gestion de projet vient rythmer l'ensemble en itérations.</p>
    `
  }
];

// ============================================================
// Flashcards — regroupées par thème
// ============================================================

const FLASHCARDS = [
  // Cahier des charges
  { theme: "Cahier des charges", term: "CdCF", def: "Cahier des charges fonctionnel : document qui formule le besoin du client au moyen de fonctions et de contraintes, sans proposer de solution de conception." },
  { theme: "Cahier des charges", term: "Les 3 parties du CdC", def: "1) Introduction au problème posé, 2) Expression fonctionnelle du besoin, 3) Solutions proposées pour répondre au besoin." },
  { theme: "Cahier des charges", term: "Expression fonctionnelle du besoin", def: "Partie clé du CdC : définit les fonctions et contraintes, typiquement via un diagramme de cas d'utilisation." },

  // Cycles de vie
  { theme: "Cycles de vie", term: "Crise du logiciel", def: "Constat des années 1960-90 : logiciels peu fiables, hors délais, ne respectant pas le cahier des charges. Étude Standish 1995 : 16% de succès, 31% d'échecs." },
  { theme: "Cycles de vie", term: "Cycle en cascade", def: "Phases strictement séquentielles ; chaque phase ne remet en cause que la précédente. Simple mais rigide (effet tunnel)." },
  { theme: "Cycles de vie", term: "Cycle en V", def: "Comme la cascade, mais chaque phase amont prépare explicitement sa phase de vérification en aval." },
  { theme: "Cycles de vie", term: "Cycle en Y", def: "Sépare et parallélise Analyse et Conception ; le code est produit par des règles de transformation à partir des deux." },
  { theme: "Cycles de vie", term: "Cycle en spirale", def: "Inventé par Boehm : N phases, chacune avec sa propre analyse de risques, pouvant remettre en cause le développement." },
  { theme: "Cycles de vie", term: "Cycle itératif et incrémental", def: "Le projet est découpé en itérations qui étendent progressivement un noyau logiciel ; chaque itération gère ses propres risques." },
  { theme: "Cycles de vie", term: "RUP", def: "Rational Unified Process : démarche associée à UML, pilotée par les cas d'utilisation, centrée sur l'architecture, itérative et incrémentale." },
  { theme: "Cycles de vie", term: "eXtreme Programming (XP)", def: "Méthode agile basée sur la discipline et la communication : livraisons fréquentes, client sur site, rythme durable (≤40h/semaine), tests unitaires, remaniement continu." },
  { theme: "Cycles de vie", term: "Effet tunnel", def: "Risque des cycles séquentiels : le client ne voit rien avancer pendant une longue période, jusqu'à la livraison finale." },

  // Cas d'utilisation
  { theme: "Cas d'utilisation", term: "Acteur", def: "Rôle joué par un utilisateur humain ou un autre système qui interagit directement avec le système étudié. Ce n'est pas une personne physique." },
  { theme: "Cas d'utilisation", term: "Cas d'utilisation (use case)", def: "Service rendu de bout en bout à un acteur, avec un déclenchement, un déroulement et une fin, produisant un résultat observable." },
  { theme: "Cas d'utilisation", term: "Acteur principal", def: "Celui pour qui le cas d'utilisation produit la plus-value métier ; généralement le déclencheur du cas." },
  { theme: "Cas d'utilisation", term: "«include»", def: "Le cas de base incorpore obligatoirement un autre cas, à un endroit précis de son déroulement." },
  { theme: "Cas d'utilisation", term: "«extend»", def: "Le cas de base peut être complété optionnellement par un autre cas, à un point d'extension défini." },
  { theme: "Cas d'utilisation", term: "Généralisation (cas d'utilisation)", def: "Un cas descendant hérite du comportement d'un cas parent ; relation entre les cas eux-mêmes, pas entre leurs instances." },

  // Diagramme de classes
  { theme: "Diagramme de classes", term: "Attribut dérivé", def: "Attribut dont la valeur peut être déduite d'autres informations du modèle ; noté avec un slash, ex. /duree." },
  { theme: "Diagramme de classes", term: "Multiplicité 0..*", def: "De zéro à un nombre quelconque d'objets peuvent participer à la relation." },
  { theme: "Diagramme de classes", term: "Agrégation", def: "Relation de contenance non symétrique (◇) ; une partie peut être partagée entre plusieurs agrégats et exister sans eux." },
  { theme: "Diagramme de classes", term: "Composition", def: "Agrégation forte (◆) ; une partie n'appartient qu'à un seul composite, et sa destruction est liée à celle du composite." },
  { theme: "Diagramme de classes", term: "Classe abstraite", def: "Classe qui ne s'instancie jamais directement, notée en italique ; sert à factoriser des propriétés communes." },
  { theme: "Diagramme de classes", term: "Classe d'association", def: "Association « promue » au rang de classe, qui porte donc elle-même des attributs propres à chaque lien." },
  { theme: "Diagramme de classes", term: "Qualificatif", def: "Attribut qui partitionne les objets liés à un objet donné dans une association, réduisant la multiplicité de l'autre côté." },
  { theme: "Diagramme de classes", term: "Classe « dialogue »", def: "Classe d'analyse qui représente l'interaction avec l'utilisateur (typiquement un écran) ; possède attributs et opérations." },
  { theme: "Diagramme de classes", term: "Classe « contrôle »", def: "Classe d'analyse qui contient la logique applicative et les règles métier ; ne possède que des opérations." },
  { theme: "Diagramme de classes", term: "Classe « entité »", def: "Classe d'analyse représentant un concept métier, souvent persistant ; ne possède que des attributs." },
  { theme: "Diagramme de classes", term: "Pattern de la métaclasse", def: "Quand une classe a trop de responsabilités hétérogènes, on la scinde en deux classes reliées « * – 1 » : la métaclasse porte les infos génériques réutilisables." },

  // Diagramme de séquence
  { theme: "Diagramme de séquence", term: "Ligne de vie", def: "Représentation verticale de l'existence d'un participant (acteur ou objet) pendant une interaction." },
  { theme: "Diagramme de séquence", term: "Message synchrone", def: "Flèche pleine : l'émetteur attend le retour du message avant de continuer son exécution." },
  { theme: "Diagramme de séquence", term: "Message asynchrone", def: "Flèche ouverte : l'émetteur n'attend pas de retour et continue immédiatement." },
  { theme: "Diagramme de séquence", term: "Fragment loop", def: "Cadre d'interaction qui répète son contenu plusieurs fois selon une condition de garde." },
  { theme: "Diagramme de séquence", term: "Fragment alt", def: "Cadre d'interaction qui exécute un seul des fragments proposés, selon la condition vraie." },
  { theme: "Diagramme de séquence", term: "Fragment opt", def: "Cadre d'interaction dont le contenu ne s'exécute que si une condition est vraie." },
];

// ============================================================
// Quiz — questions à choix multiples
// ============================================================

const QUIZ = [
  {
    q: "Que ne doit JAMAIS contenir un cahier des charges fonctionnel ?",
    options: ["Les contraintes du produit", "Une solution de conception", "Le contexte du projet", "Les fonctions attendues"],
    correct: 1,
    exp: "Le CdCF définit l'environnement et les fonctions attendues, jamais la façon de les réaliser."
  },
  {
    q: "Dans l'étude Standish Group de 1995, quelle proportion de projets étaient un échec complet (abandonnés) ?",
    options: ["16 %", "31 %", "53 %", "67 %"],
    correct: 1,
    exp: "16 % de succès, 53 % de projets problématiques, 31 % d'échecs (abandonnés)."
  },
  {
    q: "Quel cycle de vie sépare et parallélise nettement les activités d'Analyse et de Conception ?",
    options: ["Le cycle en cascade", "Le cycle en V", "Le cycle en Y", "Le cycle en spirale"],
    correct: 2,
    exp: "Le cycle en Y isole Analyse et Conception dans deux branches parallèles avant de produire le code."
  },
  {
    q: "Quel cycle de vie associe explicitement une analyse de risques à chaque phase, pouvant remettre en cause le développement ?",
    options: ["Le cycle en cascade", "Le cycle en spirale", "Le cycle en V", "Le cycle en Y"],
    correct: 1,
    exp: "Inventé par Boehm, le cycle en spirale associe une analyse de risques à chaque tour de spirale."
  },
  {
    q: "RUP est décrit par trois qualificatifs. Lequel n'en fait PAS partie ?",
    options: ["Piloté par les cas d'utilisation", "Centré sur l'architecture", "Itératif et incrémental", "Basé sur le pair programming"],
    correct: 3,
    exp: "Le pair programming est une pratique de l'eXtreme Programming (XP), pas une caractéristique du RUP."
  },
  {
    q: "En XP, quelle est la limite recommandée d'heures de travail par semaine ?",
    options: ["35h", "40h", "45h", "Pas de limite"],
    correct: 1,
    exp: "XP prône un rythme durable : jamais plus de 40h par semaine, car un développeur fatigué développe mal."
  },
  {
    q: "Un acteur dans un diagramme de cas d'utilisation est...",
    options: ["Toujours une personne physique", "Un rôle qui interagit avec le système", "Toujours l'utilisateur final", "Une classe du diagramme de classes"],
    correct: 1,
    exp: "Un acteur est un rôle (humain ou non) : une même personne peut jouer plusieurs rôles, et inversement."
  },
  {
    q: "Quelle relation entre cas d'utilisation signifie qu'un comportement est incorporé de façon OBLIGATOIRE ?",
    options: ["«extend»", "«include»", "Généralisation", "Association"],
    correct: 1,
    exp: "«include» incorpore obligatoirement un autre cas d'utilisation à un endroit précis du déroulement."
  },
  {
    q: "Quelle relation entre cas d'utilisation est généralement déconseillée dans une modélisation stricte, bien que fréquente en pratique ?",
    options: ["Association", "«include»", "«extend»", "Généralisation"],
    correct: 2,
    exp: "«extend» exprime une possibilité optionnelle ; son usage est déconseillé dans une modélisation rigoureuse."
  },
  {
    q: "Un attribut dérivé, noté avec un slash (/duree par exemple), signifie que...",
    options: ["L'attribut est privé", "Sa valeur peut être déduite d'autres informations du modèle", "L'attribut est obligatoire", "C'est une clé primaire"],
    correct: 1,
    exp: "Un attribut dérivé est redondant : sa valeur se calcule à partir d'autres attributs déjà présents dans le modèle."
  },
  {
    q: "Quelle est la différence essentielle entre agrégation et composition ?",
    options: [
      "L'agrégation est plus rapide à dessiner",
      "Dans la composition, la partie ne peut appartenir qu'à un seul tout et sa vie en dépend",
      "La composition n'a pas de multiplicité",
      "Il n'y a aucune différence"
    ],
    correct: 1,
    exp: "En composition, une partie appartient à un seul composite et est détruite avec lui ; en agrégation, elle peut être partagée et survivre au tout."
  },
  {
    q: "Dans la catégorisation de Jacobson/RUP, quelle classe d'analyse ne contient QUE des opérations ?",
    options: ["Dialogue", "Contrôle", "Entité", "Aucune des trois"],
    correct: 1,
    exp: "Les classes « contrôle » portent la logique applicative sous forme d'opérations, sans attributs propres."
  },
  {
    q: "Un qualificatif dans une association sert à...",
    options: [
      "Nommer l'association",
      "Partitionner les objets liés, réduisant la multiplicité de l'autre côté",
      "Interdire la navigabilité",
      "Transformer l'association en généralisation"
    ],
    correct: 1,
    exp: "Ex. le numéro de vol qualifie l'association CompagnieAerienne–Vol : à un numéro donné correspond au plus un vol."
  },
  {
    q: "Dans un diagramme de séquence, une flèche PLEINE représente...",
    options: ["Un message asynchrone", "Un retour", "Un message synchrone", "Une dépendance"],
    correct: 2,
    exp: "La flèche pleine est un message synchrone : l'émetteur attend le retour avant de continuer."
  },
  {
    q: "Quel fragment d'interaction UML représente une boucle ?",
    options: ["opt", "alt", "loop", "ref"],
    correct: 2,
    exp: "loop répète son contenu plusieurs fois tant que la condition de garde est vraie."
  },
  {
    q: "Quel fragment d'interaction UML sélectionne UN SEUL chemin parmi plusieurs, selon une condition ?",
    options: ["loop", "opt", "alt", "ref"],
    correct: 2,
    exp: "alt (alternative) exécute uniquement le fragment dont la condition est vraie."
  },
  {
    q: "Dans le pattern de la métaclasse (ex. Vol / VolGenerique), pourquoi sépare-t-on les deux classes ?",
    options: [
      "Pour respecter la norme UML qui interdit les classes uniques",
      "Parce que la classe initiale porte des responsabilités trop hétérogènes",
      "Pour accélérer l'exécution du programme",
      "Parce que le diagramme de séquence l'exige"
    ],
    correct: 1,
    exp: "VolGenerique factorise les informations génériques du catalogue, tandis que Vol reste léger et daté."
  },
  {
    q: "Quelle est la partie du cahier des charges qui recommande explicitement l'usage d'un diagramme de cas d'utilisation ?",
    options: ["Introduction au problème posé", "Expression fonctionnelle du besoin", "Solutions proposées", "Aucune des trois"],
    correct: 1,
    exp: "C'est la partie clé du CdC : elle définit les fonctions et contraintes, typiquement via les cas d'utilisation."
  },
  {
    q: "Quel est le principal avantage du cycle itératif et incrémental par rapport à la cascade ?",
    options: [
      "Il ne nécessite aucune définition de besoin au départ",
      "Il évite l'effet tunnel grâce à des résultats visibles à chaque itération",
      "Il supprime la phase de tests",
      "Il est toujours plus rapide à réaliser"
    ],
    correct: 1,
    exp: "Chaque itération produit un résultat visible et permet de lever les ambiguïtés tôt, contrairement à la cascade."
  },
  {
    q: "Dans un diagramme de classes, que représente la multiplicité « 1..* » du côté d'une classe B pour une association A–B ?",
    options: [
      "Chaque A est lié à au plus un B",
      "Chaque A est lié à au moins un B, sans limite supérieure",
      "Chaque B est lié à exactement un A",
      "L'association est optionnelle"
    ],
    correct: 1,
    exp: "1..* signifie « au moins un, et potentiellement plusieurs » du côté où elle est indiquée."
  }
];

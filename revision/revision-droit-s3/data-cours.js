// ============================================================
// Révision — Droit des Contrats et du Numérique (MR3.11, S3)
// Fiches de cours : chapitres I, II et III + méthode d'analyse
// ============================================================

const CHAPTERS = [
{
  id: "accueil",
  num: "00",
  label: "Accueil",
  title: "Droit des Contrats et du Numérique",
  dek: "MR3.11 · BUT Informatique S3 · IUT de Reims. Le cours en fiches, des flashcards, des QCM, des questions de cours rédigées et des contrats à analyser avec la grille du cours.",
  body: `
  <div class="exam-box">
    <p class="eyebrow">Ce qui tombe à l'examen</p>
    <div class="exam-cols">
      <div>
        <h3>1. Questions de cours</h3>
        <p>Définitions, articles, conditions, différences entre deux notions. Entraîne-toi avec les <a href="#questions">questions rédigées</a>, les <a href="#flashcards">flashcards</a> et le <a href="#quiz">QCM</a>.</p>
      </div>
      <div>
        <h3>2. Analyse de contrat</h3>
        <p>On te donne un contrat, tu remplis la grille : parties, validité, obligations, clauses particulières, nature juridique justifiée. Lis la <a href="#methode">méthode</a> puis fais les <a href="#contrats">contrats d'entraînement</a>.</p>
      </div>
    </div>
  </div>

  <h2>Plan du cours</h2>
  <div class="plan">
    <a class="plan-item" href="#ch1"><span class="plan-num">I</span><span><strong>Contrats et obligations contractuelles</strong><br><small>Formation, validité, nullités, classification, effets, inexécution</small></span></a>
    <a class="plan-item" href="#ch2"><span class="plan-num">II</span><span><strong>Éléments de droit du travail</strong><br><small>Contrat de travail, clauses, licenciement, CDD, intérim</small></span></a>
    <a class="plan-item" href="#ch3a"><span class="plan-num">III-A</span><span><strong>Données personnelles et Internet</strong><br><small>Vie privée, loi de 1978, CNIL, RGPD, acteurs d'Internet</small></span></a>
    <a class="plan-item" href="#ch3b"><span class="plan-num">III-B</span><span><strong>Informatique et multimédia</strong><br><small>Logiciels, bases de données, signature électronique, Hadopi</small></span></a>
  </div>

  <h2>Comment utiliser ce site</h2>
  <ol class="steps">
    <li><strong>Lis la fiche</strong> d'un chapitre. Les encadrés jaunes « À retenir » sont les phrases à savoir réciter.</li>
    <li><strong>Teste-toi</strong> avec les flashcards et le QCM du même chapitre (filtre en haut de chaque page).</li>
    <li><strong>Rédige</strong> les réponses aux questions de cours, puis compare avec le corrigé.</li>
    <li><strong>Analyse un contrat</strong> par jour : remplis la grille, coche la nature juridique, puis affiche le corrigé ligne par ligne.</li>
    <li><strong>Fais un sujet blanc</strong> : questions tirées au hasard + un contrat.</li>
  </ol>

  <div class="callout complement">
    <span class="label">Compléments signalés</span>
    Le contenu suit le cours de M. Escuyer et le polycopié de TD. Quand une règle a changé depuis la rédaction du cours, ou quand un corrigé du poly était incomplet, l'ajout est signalé par un encadré <em>Complément</em>. <strong>À l'examen, donne d'abord la réponse du cours</strong>, tu peux ajouter la précision ensuite.
  </div>
  <p class="note">Ta progression (cartes sues, meilleurs scores, grilles commencées) est enregistrée dans ton navigateur uniquement.</p>
  <div id="progressPanel"></div>
  `
},

// ============================================================
{
  id: "ch1",
  num: "I",
  label: "Contrats et obligations",
  title: "Chapitre I — Contrats et obligations contractuelles",
  dek: "Comment un contrat se forme, à quelles conditions il est valable, ce qui se passe s'il ne l'est pas, comment le classer et ce qu'il produit entre les parties.",
  body: `
  <h2 id="ch1-def">Définition du contrat</h2>
  <div class="duo">
    <div class="card-def">
      <p class="eyebrow">Ancien article 1101 C. civ.</p>
      <p>« Le contrat est une <strong>convention</strong> par laquelle une ou plusieurs personnes <strong>s'obligent</strong>, envers une ou plusieurs autres, <strong>à donner, à faire ou à ne pas faire</strong> quelque chose. »</p>
    </div>
    <div class="card-def">
      <p class="eyebrow">Nouvel article 1101 — Ordonnance du 10 février 2016</p>
      <p>« Le contrat est un <strong>accord de volontés</strong> entre deux ou plusieurs personnes destiné à <strong>créer, modifier, transmettre ou éteindre des obligations</strong>. »</p>
    </div>
  </div>
  <div class="callout retenir"><span class="label">À retenir</span>Contrat ⇒ droits et obligations. Le contrat est un <strong>acte juridique</strong> (manifestation de volonté destinée à produire des effets de droit).</div>

  <h2 id="ch1-formation">I — La formation des contrats : 3 principes</h2>
  <table class="tbl">
    <tr><th>Principe</th><th>Article du Code civil</th><th>Idée</th></tr>
    <tr><td>Liberté contractuelle</td><td><span class="art">Art. 1102</span></td><td>Libre de contracter ou non, de choisir son cocontractant, de fixer le contenu et la forme</td></tr>
    <tr><td>Force obligatoire</td><td><span class="art">Art. 1103</span></td><td>Le contrat tient lieu de loi à ceux qui l'ont fait</td></tr>
    <tr><td>Bonne foi</td><td><span class="art">Art. 1104</span></td><td>Négocié, formé et exécuté de bonne foi (d'ordre public)</td></tr>
  </table>
  <p>Ces trois principes découlent du <strong>principe d'autonomie de la volonté</strong> : « L'Homme est libre et ne peut s'obliger que par sa propre volonté ». Conséquences : liberté contractuelle et force obligatoire du contrat.</p>

  <h3>1-1 La liberté contractuelle</h3>
  <p>Les individus sont libres de contracter ou de ne pas contracter, de choisir leur cocontractant et de déterminer le contenu du contrat. Le contrat se forme par la <strong>rencontre des consentements</strong> : les parties manifestent leur volonté, et le contrat est formé à l'instant où les volontés se rencontrent, <em>avant même que le prix soit payé</em>.</p>
  <ul>
    <li><strong>A — Liberté de contracter ou de ne pas contracter.</strong> Aspect positif (on est libre de contracter) et négatif (on est libre de ne pas contracter). Rompre des négociations n'est donc pas, en soi, une faute (nombreuses exceptions).</li>
    <li><strong>B — Liberté de choisir son cocontractant</strong>, pourvu que le critère de sélection ne soit pas prohibé par la loi (origine, sexe, orientation sexuelle, convictions politiques, croyances religieuses).</li>
    <li><strong>C — Liberté de déterminer le contenu et la forme du contrat</strong> (nombreuses exceptions).</li>
  </ul>
  <p><strong>Restrictions</strong> — <span class="art">Art. 1102 al. 2</span> : la liberté contractuelle ne vaut que « dans les limites fixées par la loi » et « ne permet pas de déroger aux règles qui intéressent l'ordre public ».</p>
  <table class="tbl">
    <tr><th>Atteinte à…</th><th>Mécanisme</th><th>Exemple du cours</th></tr>
    <tr><td>la liberté de contracter</td><td>Certains contrats sont obligatoires</td><td>Assurance voiture</td></tr>
    <tr><td>la liberté de fixer le contenu</td><td>Respect de l'ordre public et des bonnes mœurs</td><td>Interdiction de la vente d'organes</td></tr>
    <tr><td>la liberté de fixer la forme</td><td>Respect de certaines formalités</td><td>Rédaction d'un écrit</td></tr>
  </table>

  <h3>1-2 La force obligatoire du contrat</h3>
  <p><span class="art">Art. 1103</span> « Les contrats légalement formés tiennent lieu de loi à ceux qui les ont faits. »</p>
  <ul>
    <li><strong>Les parties</strong> sont tenues d'exécuter le contrat ; elles ne peuvent le modifier ou y mettre fin que <strong>d'un commun accord</strong>.</li>
    <li><strong>Le juge</strong> est tenu de respecter le contrat : il ne peut pas le modifier, même s'il est injuste pour l'une des parties.</li>
  </ul>
  <p><strong>Exceptions :</strong> interdiction de certaines clauses abusives ; lois qui s'appliquent malgré la volonté des contractants (ex. interdiction de la vente de drogue) ; contrats qui peuvent être rompus par une partie sans l'accord de l'autre (ex. le CDI).</p>

  <h3>1-3 La bonne foi</h3>
  <p><strong>Définition :</strong> croyance qu'a une personne de se trouver dans une situation conforme au droit et conscience d'agir sans léser les droits d'autrui.</p>
  <p><span class="art">Art. 1104</span> « Les contrats doivent être négociés, formés et exécutés de bonne foi. Cette disposition est d'ordre public. » ⇒ généralisation de l'exigence de bonne foi (avant 2016 : <span class="art">art. 1134 al. 3</span>, limité à l'exécution).</p>
  <div class="juris"><span class="label">Jurisprudence</span><strong>Cass. 1re civ., 27 juin 2018</strong> — Un emprunteur transmet à la banque des relevés de compte falsifiés. Les juges annulent le contrat : le consentement de la banque avait été obtenu par erreur sur la substance même de la chose, à savoir la bonne foi du contractant et l'exactitude des éléments patrimoniaux fournis, éléments déterminants de l'octroi du crédit.</div>

  <h2 id="ch1-validite">II — Les conditions de validité des contrats</h2>
  <div class="four">
    <div><span class="big">1</span>Consentement</div>
    <div><span class="big">2</span>Capacité juridique</div>
    <div><span class="big">3</span>Objet</div>
    <div><span class="big">4</span>Cause</div>
  </div>
  <div class="callout complement"><span class="label">Complément</span>Depuis l'ordonnance de 2016, <span class="art">l'art. 1128</span> énonce trois conditions : le consentement des parties, leur capacité de contracter, et un <strong>contenu licite et certain</strong> (qui remplace l'objet et la cause). Le cours garde les quatre conditions classiques : c'est elles qu'on remplit dans la grille.</div>

  <h3>2-1 Le consentement</h3>
  <p><span class="art">Art. 1129</span> Le consentement doit être donné par une personne « saine d'esprit » pour produire ses effets. Il doit être <strong>libre et éclairé</strong>. Celui qui s'oblige (le débiteur) doit y avoir préalablement consenti. Le consentement doit être <strong>exempt de vices</strong>.</p>

  <h4>Les vices du consentement</h4>
  <table class="tbl">
    <tr><th>Vice</th><th>Définition</th><th>Conditions / précisions</th><th>Exemple</th></tr>
    <tr><td><strong>Erreur</strong></td><td>Un contractant s'est trompé de bonne foi ; fausse représentation de la réalité</td><td>Doit porter sur les qualités essentielles de la prestation ou du cocontractant et être déterminante. <strong>Pas de nullité si l'erreur est inexcusable</strong> : « De non vigilantibus non curat praetor » (le préteur n'a cure des insouciants).<br>Erreurs <em>indifférentes</em> (pas de nullité) : sur la valeur, sur les motifs. Erreurs <em>admises</em> : sur les qualités de la prestation, du contractant.</td><td>Confusion entre un tableau de maître et une copie ; bijou en métal doré acheté pour de l'or</td></tr>
    <tr><td><strong>Dol</strong><br><span class="art">Art. 1137 à 1139</span></td><td>Obtenir le consentement de l'autre par des manœuvres ou des mensonges</td><td>Manœuvre frauduleuse <strong>intentionnelle</strong> destinée à tromper (mise en scène, stratagème), caractère <strong>déterminant</strong>.<br><strong>Réticence dolosive</strong> (<span class="art">art. 1137</span>) : dissimulation intentionnelle d'une information dont on sait le caractère déterminant pour l'autre.<br><em>Dolus bonus</em> (exagération commerciale tolérée, « Emptor debet esse curiosus » : l'acheteur doit être curieux) ≠ <em>dolus malus</em> (sanctionné).<br>Peut venir du contractant, de son représentant (gérant d'affaires, tuteur, porte-fort…) ou d'un tiers de connivence.</td><td>Vendre une copie en prétendant que c'est un original</td></tr>
    <tr><td><strong>Violence</strong><br><span class="art">Art. 1142</span></td><td>Contrainte physique ou morale exercée sur la volonté du cocontractant pour arracher son consentement</td><td>Peut émaner du contractant ou d'un tiers ; danger pour la personne ou sa famille. Violence physique, morale ou financière. Doit être illégitime, déterminante et grave.</td><td>CA Paris, 12 janvier 2000 : salarié contraint de céder ses droits d'auteur à son employeur sous menace de licenciement</td></tr>
    <tr><td><strong>Lésion</strong></td><td>Déséquilibre grave dans la réciprocité des prestations</td><td>Admise seulement dans certains contrats prévus par la loi ou au profit de certaines personnes</td><td>Vendeur d'immeuble lésé de plus des 7/12 du prix ; mineur</td></tr>
  </table>
  <p><strong>Abus de faiblesse :</strong> une personne profite de la vulnérabilité d'une autre (âge, maladie, handicap physique ou mental…) pour la conduire à faire un acte contraire à son intérêt. L'auteur a connaissance de l'état de faiblesse et de l'ignorance de sa victime.</p>
  <div class="callout piege"><span class="label">Piège de la grille</span>Dans « Consentement ? (citer les vices possibles) », on cite <strong>l'erreur, le dol et la violence</strong> (éventuellement la lésion), en les reliant au contrat étudié. Le « vol » n'est pas un vice du consentement.</div>

  <h3>2-2 La capacité juridique à contracter</h3>
  <p><strong>Capacité juridique :</strong> aptitude à être titulaire de droits et à les exercer. Toute personne a la capacité juridique sauf les mineurs et les incapables majeurs.</p>
  <p><span class="art">Art. 1146</span> « Sont incapables de contracter : les mineurs non émancipés et les majeurs protégés. »</p>
  <p><strong>Majeur incapable :</strong> personne qui ne peut exercer pleinement ses droits et fait l'objet d'une mesure de protection décidée par la justice : <strong>sauvegarde de justice</strong>, <strong>curatelle</strong>, <strong>tutelle</strong> (de la plus légère à la plus lourde).</p>
  <div class="schema">
    <div class="schema-col"><p class="eyebrow">Personnes physiques</p><ul><li>Capables</li><li>Incapables : mineur non émancipé ; majeur sous sauvegarde de justice, curatelle ou tutelle</li></ul></div>
    <div class="schema-col"><p class="eyebrow">Personnes morales</p><ul><li>De droit privé, de droit public, de droit mixte</li><li><strong>Capacité limitée à leur objet</strong></li><li>Agissent par un représentant (gérant, directeur, président)</li></ul></div>
    <div class="schema-col"><p class="eyebrow">Identification des personnes</p><ul><li>Nom / raison ou dénomination sociale</li><li>Domicile / siège social</li><li>Nationalité</li><li>Patrimoine</li></ul></div>
  </div>
  <div class="callout piege"><span class="label">Piège de la grille</span>Quand une partie est une <strong>société</strong>, on n'écrit pas « majeur » : on écrit « personne morale, capacité limitée à son objet social, représentée par M. X (gérant/directeur) qui doit avoir le pouvoir de l'engager ».</div>

  <h3>2-3 L'objet du contrat</h3>
  <p>Ce à quoi les parties s'engagent. Deux types d'obligations :</p>
  <div class="duo">
    <div class="card-def"><p class="eyebrow">A — Obligation de donner une chose</p><p>La chose doit :</p><ul><li><strong>exister</strong> au moment du contrat ou plus tard (chose future : récolte à venir) — « À l'impossible nul n'est tenu »</li><li>être <strong>déterminée</strong> (chose certaine) ou <strong>déterminable</strong> (chose de genre ; ex. clause d'indexation du prix en rapport direct avec l'objet du contrat)</li><li>être <strong>dans le commerce</strong> (le corps humain est hors commerce, sauf dons d'organes à titre gratuit)</li></ul></div>
    <div class="card-def"><p class="eyebrow">B — Obligation de faire ou de ne pas faire</p><p>La prestation doit être :</p><ul><li><strong>possible</strong></li><li><strong>déterminée</strong></li><li><strong>licite</strong> (conforme à l'ordre public et aux bonnes mœurs)</li></ul><p>Ex. : une clause de non-concurrence n'est admise que limitée dans le temps et dans l'espace.</p></div>
  </div>

  <h3>2-4 La cause du contrat</h3>
  <p>Ce qui conduit les parties à contracter : intention des parties, contrepartie attendue, raison pour laquelle elles ont contracté. Elle doit être <strong>licite</strong>, non contraire aux bonnes mœurs et à l'ordre public.</p>
  <ul>
    <li>L'ordonnance du 10 février 2016 <strong>supprime la notion de cause</strong> du Code civil, <strong>mais pas ses effets</strong> : on parle maintenant de <strong>contenu du contrat</strong>.</li>
    <li>Avant : absence de cause ⇒ <strong>nullité relative</strong> (à prouver par celui qui l'invoque) ; cause illicite ⇒ <strong>nullité absolue</strong>.</li>
  </ul>

  <h2 id="ch1-nullite">III — Sanctions : la nullité</h2>
  <p>Si une condition de validité fait défaut, le contrat est <strong>nul</strong>.</p>
  <table class="tbl">
    <tr><th></th><th>Nullité relative</th><th>Nullité absolue</th></tr>
    <tr><td>Gravité</td><td>Cas les moins graves : protection d'un intérêt particulier</td><td>Cas les plus graves : atteinte à l'intérêt général et à l'ordre public</td></tr>
    <tr><td>Causes</td><td>Vice du consentement (erreur sur la substance ou sur la personne, dol, violence) ; incapacité (mineur, majeur protégé, insanité d'esprit)</td><td>Absence de consentement ; objet ou cause illicite ou immoral ; objet indéterminé ; erreur-obstacle (sur la nature du contrat, l'identité de l'objet) ; absence de forme des contrats solennels et réels</td></tr>
    <tr><td>Qui peut agir ?</td><td>Seulement la personne que la loi veut protéger (mineur, majeur incapable, contractant victime)</td><td>Toute personne ayant un intérêt (cocontractants, héritiers, créanciers, tiers intéressés)</td></tr>
    <tr><td>Prescription</td><td><strong>5 ans</strong> (à compter de l'acte ou de la disparition du vice)</td><td><strong>30 ans</strong> selon le cours</td></tr>
    <tr><td>Effets</td><td colspan="2">Identiques : anéantissement <strong>rétroactif</strong>, le contrat est censé n'avoir jamais existé ; remise en l'état initial, <strong>restitution</strong> des prestations déjà reçues</td></tr>
  </table>
  <div class="callout complement"><span class="label">Complément</span>Depuis la réforme de la prescription (loi du 17 juin 2008), le délai de droit commun est de 5 ans (<span class="art">art. 2224</span>), y compris pour la nullité absolue. Le cours retient 30 ans : à l'examen, donne la réponse du cours.</div>

  <h2 id="ch1-classif">IV — La classification des contrats</h2>
  <p>C'est la partie « Nature juridique » de la grille : pour chaque paire, il faut <strong>cocher et justifier</strong>.</p>
  <table class="tbl classif">
    <tr><th>Critère</th><th>Catégorie 1</th><th>Catégorie 2</th><th>Intérêt de la distinction</th></tr>
    <tr><td>Mode de formation<br><span class="art">Art. 1109, 1172</span></td>
      <td><strong>Consensuel</strong> : formé par le seul échange des consentements, quel qu'en soit le mode d'expression. C'est le <strong>principe</strong> (<span class="art">art. 1172 al. 1</span>). <em>Ex. vente verbale de meubles, vente, prêt par un établissement de crédit</em></td>
      <td><strong>Solennel</strong> : existence suspendue à une formalité (écrit : acte authentique ou sous signature privée). <em>Ex. contrat de mariage, donation, vente immobilière, hypothèque</em><br><strong>Réel</strong> : suppose la remise d'une chose. <em>Ex. prêt entre particuliers, dépôt, gage</em></td>
      <td>Les contrats formels sont plus faciles à prouver</td></tr>
    <tr><td>Négociation<br><span class="art">Art. 1110</span></td>
      <td><strong>De gré à gré</strong> : contenu librement négocié entre les parties. <em>Ex. vente d'une voiture d'occasion</em></td>
      <td><strong>D'adhésion</strong> : une partie impose ses conditions, l'autre se contente d'adhérer. <em>Ex. billet SNCF, assurance, téléphonie, accès Internet</em></td>
      <td>Les contrats d'adhésion sont réglementés pour protéger la partie la plus faible</td></tr>
    <tr><td>Réglementation<br><span class="art">Art. 1105</span></td>
      <td><strong>Nommé</strong> : réglementé par la loi, qui lui donne un nom et des règles propres. <em>Ex. vente, bail, contrat de travail, mariage</em></td>
      <td><strong>Innommé</strong> : soumis seulement à la théorie générale des contrats. <em>Ex. contrat d'abonnement, de déménagement</em></td>
      <td>Le contenu des contrats nommés est encadré pour protéger le plus faible</td></tr>
    <tr><td>Obligations<br><span class="art">Art. 1106</span></td>
      <td><strong>Synallagmatique</strong> (bilatéral) : obligations réciproques à la charge des deux parties. <em>Ex. vente, bail</em></td>
      <td><strong>Unilatéral</strong> : obligations à la charge d'une seule partie. <em>Ex. donation, promesse unilatérale de vente, prêt entre particuliers</em></td>
      <td>Contrat bilatéral : autant d'exemplaires que de parties ; l'inexécution de l'un peut entraîner celle de l'autre</td></tr>
    <tr><td>Contrepartie<br><span class="art">Art. 1107</span></td>
      <td><strong>À titre onéreux</strong> : chaque partie y trouve son intérêt, avec une contrepartie (pas forcément de l'argent : échange). <em>Ex. vente, bail avec loyer, transport</em></td>
      <td><strong>À titre gratuit</strong> : avantage procuré à une partie sans contrepartie. <em>Ex. donation, bail sans loyer, cautionnement</em></td>
      <td>Les contrats à titre gratuit sont plus encadrés par la loi</td></tr>
    <tr><td>Durée d'exécution<br><span class="art">Art. 1111-1</span></td>
      <td><strong>À exécution instantanée</strong> : prestation unique, s'exécute en un instant. <em>Ex. vente au comptant</em></td>
      <td><strong>À exécution successive</strong> : prestations échelonnées dans le temps. <em>Ex. bail, contrat de travail, abonnement</em></td>
      <td>Règles d'annulation différentes : pour un contrat successif on parle de <strong>résiliation</strong> (non rétroactive)</td></tr>
    <tr><td>Aléa<br><span class="art">Art. 1108</span></td>
      <td><strong>Commutatif</strong> : prestations fixées définitivement dès la conclusion, rapport d'équivalence. <em>Ex. vente</em></td>
      <td><strong>Aléatoire</strong> : la prestation dépend d'un événement incertain, chance de gain et risque de perte. <em>Ex. assurance, vente en viager</em></td>
      <td>Pas de lésion possible dans un contrat aléatoire</td></tr>
    <tr><td>Champ d'application</td>
      <td><strong>Individuel</strong> : seules les parties présentes ont des obligations</td>
      <td><strong>Collectif</strong> : s'étend à des personnes autres que les parties. <em>Ex. convention collective</em></td>
      <td>On peut être soumis à des obligations qu'on n'a pas choisies</td></tr>
  </table>
  <div class="callout retenir"><span class="label">À retenir</span><strong>Acte authentique</strong> : dressé par un officier public compétent (notaire, officier d'état civil, commissaire de justice, consul) selon les formes légales (<span class="art">art. 1369</span>). <strong>Acte sous signature privée</strong> (sous seing privé) : établi par les parties elles-mêmes, sous leur seule signature, sans officier public. Un contrat consensuel peut être écrit : l'écrit sert alors de <strong>preuve</strong>, il ne conditionne pas la validité.</div>

  <h2 id="ch1-effets">V — Les effets des contrats</h2>
  <h3>5-1 Exécution du contrat</h3>
  <p><strong>A — Force obligatoire :</strong> les contrats sont irrévocables et s'imposent <strong>aux parties</strong> (elles respectent leurs engagements, mais peuvent revenir dessus par consentement mutuel) et <strong>au juge</strong> (il applique le contrat et ne peut le modifier).</p>
  <p><strong>B — Effet relatif :</strong> les contrats ne produisent d'effets qu'<strong>entre les parties</strong>. Les tiers ne sont pas tenus par un contrat auquel ils n'ont pas participé. Exceptions : héritiers, personnes représentées, membres de groupements signataires de conventions collectives…</p>
  <table class="tbl">
    <tr><th>Les parties au sens large</th><th>Pourquoi sont-elles engagées ?</th></tr>
    <tr><td>Les cocontractants</td><td>Ils ont recherché les effets du contrat</td></tr>
    <tr><td>Les représentés (mandant, mineur, majeur incapable)</td><td>Leurs représentants (mandataire, représentant légal) agissent en leur nom et pour leur compte</td></tr>
    <tr><td>Les ayants cause à titre universel (héritiers)</td><td>Ils continuent la personne du défunt et recueillent la succession (actif et passif)</td></tr>
    <tr><td>Les proches du cocontractant (ascendants, descendants, conjoint)</td><td>Le bail peut se poursuivre avec les proches qui vivaient avec le locataire depuis au moins un an</td></tr>
  </table>

  <h3>5-2 L'inexécution du contrat</h3>
  <p><strong>A — L'exécution forcée</strong> dépend de la nature de l'obligation :</p>
  <table class="tbl">
    <tr><th>Obligation</th><th>Moyens de contrainte</th></tr>
    <tr><td><strong>De donner</strong> ⇒ exécution forcée en nature</td><td>Somme d'argent : saisie des biens (meubles, immeubles), saisie sur salaire, vente aux enchères.<br>Chose de genre (ex. une voiture) : achat auprès d'un tiers aux frais du débiteur.<br>Corps certain (ex. œuvre d'art) : la propriété est déjà transférée, saisie de la chose.</td></tr>
    <tr><td><strong>De faire ou de ne pas faire</strong> ⇒ dommages et intérêts</td><td>Principe : condamnation à des dommages et intérêts (on ne peut pas contraindre physiquement une personne).<br>Exceptionnellement, exécution en nature : destruction ou démolition aux frais du débiteur, exécution par un tiers aux frais du débiteur, expulsion, <strong>astreinte</strong> (pénalité par jour de retard).</td></tr>
  </table>
  <p><strong>B — Résolution et résiliation</strong></p>
  <div class="duo">
    <div class="card-def"><p class="eyebrow">Résolution</p><p>Anéantissement <strong>rétroactif</strong> du contrat et remise en l'état initial : chaque partie restitue ce qu'elle a reçu.</p></div>
    <div class="card-def"><p class="eyebrow">Résiliation</p><p>N'opère <strong>que pour l'avenir</strong> : le contrat cesse sans restitution des prestations déjà fournies. Typique des contrats à exécution successive (bail, travail, abonnement).</p></div>
  </div>

  <h2 id="ch1-biens">Annexe — Les personnes et les biens (Document n°1)</h2>
  <div class="schema">
    <div class="schema-col"><p class="eyebrow">Biens meubles</p><ul><li>par nature (se déplacent)</li><li>par anticipation (récolte sur pied vendue)</li><li>par détermination de la loi (droits, parts sociales, créances, logiciel)</li></ul></div>
    <div class="schema-col"><p class="eyebrow">Biens immeubles</p><ul><li>par nature (terrain, bâtiment)</li><li>par destination (meuble attaché à un immeuble)</li><li>par l'objet auquel ils s'appliquent (usufruit d'un immeuble)</li></ul></div>
    <div class="schema-col"><p class="eyebrow">Droit de propriété</p><ul><li>Éléments : <em>usus</em> (user), <em>fructus</em> (percevoir les fruits ; usufruit = usus + fructus), <em>abusus</em> (disposer ; nue-propriété)</li><li>Caractères : absolu, perpétuel, exclusif</li><li>Formes : copropriété, multipropriété, indivision</li></ul></div>
  </div>
  `
},

// ============================================================
{
  id: "ch2",
  num: "II",
  label: "Droit du travail",
  title: "Chapitre II — Éléments de droit du travail",
  dek: "Le droit du travail organise les rapports entre employeurs et salariés. Il évolue en permanence avec l'organisation du travail.",
  body: `
  <h2 id="ch2-def">I — Régime juridique du contrat de travail</h2>
  <h3>1-1 Définition et caractères</h3>
  <div class="card-def wide"><p>« Convention par laquelle un salarié s'engage à mettre à disposition d'un employeur sa <strong>force de travail</strong> moyennant une <strong>rémunération</strong> », sous la direction de cet employeur.</p></div>
  <div class="duo">
    <div>
      <p class="eyebrow">Caractères du contrat de travail</p>
      <ul class="checks">
        <li>Synallagmatique</li><li>À titre onéreux</li><li>Consensuel</li><li>D'adhésion</li>
        <li>Conclu <em>intuitu personae</em> (en considération de la personne)</li><li>À exécution successive</li>
        <li>À durée indéterminée (CDI) ou déterminée (CDD)</li><li>Nommé (réglementé par le Code du travail)</li>
      </ul>
    </div>
    <div>
      <p class="eyebrow">3 éléments caractérisent le contrat</p>
      <div class="three-el"><span>Le travail</span><span>La rémunération</span><span>Le lien de subordination</span></div>
      <p>Le <strong>lien de subordination</strong> distingue le salarié d'un prestataire indépendant : il travaille sous l'autorité de l'employeur, qui donne des ordres, contrôle et sanctionne.</p>
    </div>
  </div>

  <h4>Les pouvoirs de l'employeur (issus du lien de subordination)</h4>
  <table class="tbl">
    <tr><th>Pouvoir</th><th>Contenu</th><th>Limite</th></tr>
    <tr><td>De direction</td><td>Gestion de l'entreprise : embaucher, fixer les horaires, décider des promotions</td><td>L'abus de droit (décision prise hors de l'intérêt de l'entreprise)</td></tr>
    <tr><td>Réglementaire</td><td>Élabore le <strong>règlement intérieur</strong> (hygiène, sécurité, discipline), soumis pour avis aux représentants du personnel ; obligatoire à partir de 20 salariés selon le cours</td><td>Ne peut contredire lois, conventions et accords collectifs ; respecte les droits et libertés</td></tr>
    <tr><td>Disciplinaire</td><td>Sanctions : mise à pied, rétrogradation, absence de promotion, non-versement d'une prime. Procédure en 3 temps : convocation, entretien, notification écrite</td><td><strong>Sanctions pécuniaires (retenues sur salaire) interdites</strong>. Le conseil de prud'hommes peut annuler une sanction, jamais la modifier</td></tr>
  </table>
  <div class="callout complement"><span class="label">Complément</span>Depuis la loi PACTE (2020), le règlement intérieur est obligatoire à partir de <strong>50 salariés</strong>.</div>

  <h3>1-2 Formation du contrat de travail</h3>
  <h4>A — Conditions de forme</h4>
  <ul>
    <li>Le <strong>CDI à temps complet</strong> n'est soumis à aucune forme particulière (<span class="art">Art. L1221-1 C. trav.</span>) : il peut être oral, verbal ou tacite. L'employeur doit alors remettre un écrit reprenant les informations de la <strong>déclaration préalable à l'embauche</strong> adressée à l'URSSAF.</li>
    <li><strong>Tous les autres contrats doivent être écrits</strong> : CDI à temps partiel, CDD, travail intermittent, travail temporaire, contrat de professionnalisation, d'apprentissage…</li>
    <li><strong>Directive européenne 91/533 du 14 octobre 1991</strong> (appliquée depuis le 1er juillet 1993) : l'employeur remet au salarié, dans les <strong>deux mois</strong> suivant l'embauche, un document écrit (contrat sous seing privé ou lettre d'engagement) sur les éléments essentiels de la relation de travail. En France, les <strong>bulletins de paie</strong> contiennent ces informations.</li>
    <li>Le contrat est rédigé en <strong>français</strong>. Bulletin de paie = commencement de preuve par écrit ; lettre d'engagement = preuve suffisante. Un contrat écrit détaillé reste fortement conseillé.</li>
  </ul>
  <p><strong>Clauses obligatoires du contrat écrit :</strong> noms, adresses et signatures des parties ; lieu et date de signature ; fonctions ; lieu de travail ; durée du travail ; rémunération ; avantages sociaux ; obligations professionnelles ; référence à la convention collective.</p>

  <h4>B — Conditions de fond : celles de tous les contrats</h4>
  <table class="tbl">
    <tr><th>Condition</th><th>Application au contrat de travail</th></tr>
    <tr><td>Consentement</td><td>Doit exister et être non vicié (erreur, dol, violence), sinon nullité</td></tr>
    <tr><td>Capacité</td><td>Employeur : personne physique ou morale. Salarié : personne physique. Majeurs capables ; entre 16 et 17 ans accord parental, à partir de 17 ans le salarié signe lui-même selon le cours</td></tr>
    <tr><td>Objet</td><td>Employeur : verser un salaire. Salarié : fournir un travail. Ne doit pas être contraire à l'ordre public et aux bonnes mœurs</td></tr>
    <tr><td>Cause</td><td>Le salaire est la contrepartie du travail et inversement. Doit être licite (cause supprimée en 2016 mais pas ses effets)</td></tr>
  </table>
  <p><strong>Durée :</strong> le CDD prend fin à la date prévue ; le CDI peut être rompu unilatéralement par l'employeur (<strong>licenciement</strong>) ou par le salarié (<strong>démission</strong>). Le Code civil interdit les engagements perpétuels.</p>

  <h3>1-3 Effets du contrat : obligations des parties</h3>
  <div class="duo">
    <div class="card-def"><p class="eyebrow">Obligations de l'employeur</p><ul><li>Fournir un travail conforme au contrat et à la qualification</li><li>Fournir l'outil de travail</li><li>Verser le salaire convenu</li><li>Respecter lois, règlements, conventions collectives : pas de discrimination, durée du travail, sécurité, vie privée, cotisations sociales</li><li>Contrôler l'exécution du travail et sanctionner les manquements</li></ul></div>
    <div class="card-def"><p class="eyebrow">Obligations du salarié</p><ul><li>Exécuter le travail <strong>personnellement, consciencieusement et loyalement</strong></li><li>Respecter l'outil de travail</li><li>Respecter les ordres reçus et le règlement intérieur</li><li>Respecter le secret professionnel, ne pas concurrencer son employeur (obligation de loyauté)</li></ul></div>
  </div>

  <h4>Conditions de travail et rémunération (support du poly)</h4>
  <table class="tbl">
    <tr><th>Durée du travail</th><th>Repos</th><th>Rémunération</th><th>Sécurité</th></tr>
    <tr><td>35 h hebdomadaires<br>maxi 10 h / jour<br>maxi 48 h / semaine<br>44 h en moyenne sur 12 semaines consécutives</td>
        <td>Quotidien : 11 h consécutives<br>Hebdomadaire : 24 h + 11 h<br>11 jours fériés<br>Congés : 2,5 jours / mois de travail effectif</td>
        <td>Fixée par convention (contrat ou convention collective ; la plus favorable s'applique : <strong>principe de faveur</strong>)<br>Au moins égale au <strong>SMIC</strong> (d'ordre public)<br>Non-discrimination, égalité</td>
        <td>Obligation de résultat de l'employeur<br>Prévention obligatoire<br>Droit de retrait du salarié<br>CHSCT</td></tr>
  </table>
  <ul>
    <li><strong>Rémunération ≠ salaire</strong> : la rémunération est l'ensemble des sommes perçues en raison du travail (salaire de base + avantages et accessoires, en espèces ou en nature, <span class="art">L3221-1</span>) ; le salaire n'est que la contrepartie directe du travail.</li>
    <li><strong>Non-discrimination</strong> (<span class="art">L3221-2</span>) : égalité de rémunération entre hommes et femmes pour un même travail ou un travail de valeur égale (<span class="art">L3221-4</span> : connaissances, expérience, responsabilités, charge physique ou nerveuse comparables).</li>
    <li><strong>« À travail égal, salaire égal »</strong> : Cass. soc., 29 octobre 1996, l'égalité s'applique entre tous les salariés placés dans une situation identique, quel que soit leur sexe.</li>
  </ul>
  <div class="callout complement"><span class="label">Complément</span>Le CHSCT a été fusionné dans le <strong>CSE</strong> (comité social et économique) par les ordonnances de 2017.</div>

  <h3 id="ch2-clauses">1-4 Clauses particulières</h3>
  <table class="tbl">
    <tr><th>Clause</th><th>Contenu</th><th>Conditions / effets</th></tr>
    <tr><td><strong>Période d'essai</strong></td><td>Vérifier les aptitudes du salarié</td><td>Quelques jours à plusieurs mois. Rompue unilatéralement à tout moment sans dommages-intérêts. <strong>Renouvelable une fois.</strong> Durée maximale en CDI : <strong>2 mois</strong> ouvriers et employés, <strong>3 mois</strong> agents de maîtrise et techniciens, <strong>4 mois</strong> cadres</td></tr>
    <tr><td><strong>Non-concurrence</strong></td><td>Interdit à l'ancien salarié, après la rupture, de travailler chez un concurrent ou de créer une entreprise concurrente</td><td>Licite seulement si : écrite dans le contrat ou un avenant ; indispensable à la protection des intérêts légitimes de l'entreprise ; <strong>limitée dans le temps et dans l'espace</strong> ; tient compte des spécificités de l'emploi ; prévoit une <strong>contrepartie financière</strong> non dérisoire (versée après la rupture). Sinon <strong>nulle</strong></td></tr>
    <tr><td><strong>Mobilité géographique et professionnelle</strong></td><td>L'employeur peut muter le salarié ou modifier ses tâches ; le salarié accepte par avance</td><td>Sans clause, une mutation = modification du contrat ; si le salarié refuse, la rupture est imputable à l'employeur</td></tr>
    <tr><td><strong>Résultat (objectifs)</strong></td><td>Objectif quantitatif à atteindre</td><td>À défaut, licenciement possible (si objectifs réalistes)</td></tr>
    <tr><td><strong>Dédit-formation</strong></td><td>Le salarié s'engage à rester un temps déterminé après une formation payée par l'employeur</td><td>Départ anticipé ⇒ remboursement des frais de formation</td></tr>
  </table>

  <h3 id="ch2-rupture">1-5 Rupture du contrat de travail</h3>
  <p><strong>Démission</strong> = rupture à l'initiative du salarié. <strong>Licenciement</strong> = rupture à l'initiative de l'employeur, pour <strong>motif personnel</strong> (fait reproché au salarié) ou <strong>motif économique</strong>.</p>

  <h4>A — Licenciement pour motif personnel</h4>
  <div class="callout retenir"><span class="label">À retenir</span>Tout licenciement doit reposer sur une <strong>cause réelle et sérieuse</strong>.<br><strong>Réelle</strong> : objective, exacte, vérifiable (pas un préjugé ni une convenance personnelle).<br><strong>Sérieuse</strong> : d'une certaine gravité, qui rend impossible la poursuite du travail sans dommage pour l'entreprise.<br>Sans cause réelle et sérieuse ⇒ <strong>licenciement abusif</strong> : le tribunal accorde une indemnité au salarié, sauf réintégration.</div>
  <table class="tbl">
    <tr><th>Faute</th><th>Définition</th><th>Exemples</th><th>Conséquences</th></tr>
    <tr><td><strong>Légère</strong> (simple)</td><td>Motif de licenciement en cas de répétition</td><td>Erreurs secondaires, légers retards, propos déplacés envers des clients</td><td>Préavis + indemnités de licenciement + indemnité de congés payés</td></tr>
    <tr><td><strong>Grave</strong></td><td>Violation de règles importantes rendant impossible le maintien du salarié dans l'entreprise</td><td>Faute professionnelle, altercation, refus d'obéir, conduite en état d'ivresse, non-respect des règles de sécurité, harcèlement, injures</td><td>Licenciement immédiat : <strong>pas de préavis ni d'indemnité de licenciement</strong> ; indemnité compensatrice de congés payés maintenue</td></tr>
    <tr><td><strong>Lourde</strong></td><td>Faute intentionnelle avec <strong>volonté de nuire</strong> à l'employeur</td><td>Dénigrement de l'entreprise, casse volontaire, détournement de clientèle vers un concurrent, introduction volontaire d'un virus, divulgation d'informations confidentielles</td><td>Licenciement immédiat, <strong>aucune indemnité</strong> selon le cours</td></tr>
  </table>
  <p>Autre cause réelle et sérieuse (non fautive) : l'<strong>insuffisance professionnelle</strong>. C'est le <strong>juge</strong> qui qualifie la faute, pas le contrat.</p>
  <div class="callout complement"><span class="label">Complément</span>Depuis une décision du Conseil constitutionnel de 2016, le salarié licencié pour faute lourde conserve aussi son indemnité compensatrice de congés payés.</div>

  <h4>Procédure de licenciement pour motif personnel (3 phases)</h4>
  <ol class="timeline">
    <li><strong>Convocation</strong> du salarié à un entretien préalable par lettre recommandée</li>
    <li><strong>Entretien</strong> : l'employeur expose les motifs ; le salarié s'explique et peut se faire assister par un membre du personnel (ou un conseiller)</li>
    <li><strong>Notification</strong> par lettre recommandée, au moins un jour franc après l'entretien, avec le motif du licenciement</li>
  </ol>
  <p>Applicable quels que soient l'effectif de l'entreprise et l'ancienneté du salarié.</p>
  <div class="callout complement"><span class="label">Complément</span>Délais actuels du Code du travail : entretien au moins 5 jours ouvrables après la convocation, notification au moins 2 jours ouvrables après l'entretien.</div>

  <h4>B — Licenciement pour motif économique</h4>
  <p>Rupture pour une cause <strong>non inhérente à la personne du salarié</strong>, résultant d'une suppression ou transformation d'emploi, ou d'une modification refusée d'un élément essentiel du contrat, consécutive à des difficultés économiques (baisse des ventes) ou à des mutations technologiques.</p>
  <ul>
    <li><strong>Individuel :</strong> même procédure que pour motif personnel + proposition d'une convention de conversion + information de l'Administration du travail. La lettre ne peut être envoyée moins de <strong>7 jours</strong> après l'entretien.</li>
    <li><strong>Collectif :</strong> consultation des représentants du personnel ; liste des salariés licenciés selon des critères (ancienneté, charges de famille…) ; entretien avec chacun ; lettre énonçant précisément le motif (« suppression du poste due à une baisse des commandes », pas seulement « motif économique »). Entreprise d'au moins 50 salariés licenciant au moins 10 personnes sur 30 jours ⇒ <strong>plan social</strong> (plan de sauvegarde de l'emploi).</li>
  </ul>

  <h4>C — Indemnités et formalités de fin de contrat</h4>
  <table class="tbl">
    <tr><th>Élément</th><th>Règle du cours</th></tr>
    <tr><td>Délai de préavis</td><td>Fixé par la loi, la convention collective, les accords ou les usages selon l'ancienneté. Non respecté par l'employeur ⇒ <strong>indemnité de brusque rupture</strong> (indemnité compensatrice de préavis) = rémunération qu'aurait touchée le salarié</td></tr>
    <tr><td>Indemnité de licenciement</td><td>Compense le préjudice de la rupture. Due si pas de faute grave ou lourde et <strong>au moins 1 an d'ancienneté</strong>. <strong>1/5 de mois par année</strong> ; à partir de 10 ans, <strong>+ 2/15 de mois</strong> par année</td></tr>
    <tr><td>Indemnité compensatrice de congés payés</td><td>Pour les congés acquis non pris. <strong>Règle du 1/10e</strong> (10 % de la rémunération brute de la période de référence) ou <strong>maintien de salaire</strong> : on applique le calcul <strong>le plus avantageux</strong> pour le salarié</td></tr>
    <tr><td>Certificat de travail</td><td>Dates d'entrée et de sortie, nature des emplois occupés. Mentions nuisibles au salarié interdites</td></tr>
    <tr><td>Reçu pour solde de tout compte</td><td>Le salarié reconnaît avoir reçu les sommes dues ; il écrit « reçu pour solde de tout compte », date et signe ; un exemplaire chacun ; <strong>2 mois</strong> pour le dénoncer selon le cours</td></tr>
    <tr><td>Attestation Pôle emploi (ex-ASSEDIC)</td><td>Remplie par l'employeur pour l'attribution des allocations chômage</td></tr>
  </table>
  <div class="callout complement"><span class="label">Complément</span>Règles actuelles : indemnité légale dès <strong>8 mois</strong> d'ancienneté, <strong>1/4 de mois</strong> par année jusqu'à 10 ans puis <strong>1/3</strong> au-delà (2017). Le reçu pour solde de tout compte se dénonce dans les <strong>6 mois</strong>. Pôle emploi s'appelle <strong>France Travail</strong> depuis 2024.</div>

  <h2 id="ch2-atyp">2 — Les contrats de travail atypiques</h2>
  <p>Apprentissage, adaptation, qualification, orientation, solidarité… Les plus connus : <strong>CDD</strong> et <strong>CTT</strong> (intérim). Le CDI reste le contrat de droit commun : un emploi précaire ne peut avoir « pour objet ou pour effet de pourvoir durablement un emploi lié à l'activité normale et permanente de l'entreprise » (<span class="art">L1242-1 C. trav.</span>).</p>

  <h3>2-1 Le contrat à durée déterminée (CDD)</h3>
  <div class="duo">
    <div class="card-def"><p class="eyebrow">Cas autorisés</p><ul><li>Remplacement d'un salarié absent</li><li>Accroissement temporaire d'activité</li><li>Emploi saisonnier</li><li>Emploi temporaire par nature (tourisme, spectacle)</li></ul></div>
    <div class="card-def"><p class="eyebrow">Cas interdits</p><ul><li>Remplacer un salarié <strong>en grève</strong></li><li>Travaux dangereux nécessitant une surveillance médicale</li><li>Occuper un poste supprimé (licenciement économique) depuis <strong>moins de 6 mois</strong></li></ul></div>
  </div>
  <table class="tbl">
    <tr><th>Règle</th><th>CDD</th></tr>
    <tr><td>Écrit et clauses</td><td>Mêmes clauses obligatoires que le CDI + date de fin, ou durée minimale si pas de terme précis</td></tr>
    <tr><td>Renouvellement</td><td><strong>Deux fois</strong>, dans la limite de la durée maximale</td></tr>
    <tr><td>Durée maximale</td><td><strong>18 mois</strong> en général ; <strong>9 mois</strong> dans l'attente d'un salarié recruté en CDI ; <strong>24 mois</strong> à l'étranger, en attente du départ définitif d'un salarié avec suppression de poste, ou pour accroissement exceptionnel d'activité</td></tr>
    <tr><td>Indemnité de précarité</td><td><strong>10 % du salaire brut</strong> (sauf réembauche en CDI)</td></tr>
    <tr><td>Rupture anticipée</td><td>Seulement pour faute grave, force majeure, accord commun des parties, ou si le salarié trouve un CDI</td></tr>
  </table>
  <p><strong>Variante : le CDD « à objet précis »</strong> — pour cadres et ingénieurs ; prend fin à la réalisation d'une mission ; <strong>18 à 36 mois</strong> ; non renouvelable ; salarié prévenu <strong>2 mois</strong> à l'avance ; s'il n'est pas rompu à la fin de la mission, il devient un CDI.</p>

  <h3>2-2 Le contrat de travail temporaire (CTT, intérim)</h3>
  <div class="triangle">
    <div class="tri-node">Entreprise de travail temporaire<br><small>(employeur)</small></div>
    <div class="tri-node">Entreprise utilisatrice</div>
    <div class="tri-node">Salarié intérimaire</div>
    <p class="tri-cap"><strong>Contrat de mission</strong> : ETT ↔ salarié · <strong>Contrat de mise à disposition</strong> (commercial) : ETT ↔ entreprise utilisatrice. Aucun lien contractuel entre l'intérimaire et l'entreprise utilisatrice.</p>
  </div>
  <ul>
    <li>Égalité de traitement avec un salarié en CDI ; indemnité de précarité de 10 % (sauf saisonniers et réembauche).</li>
    <li>Clauses obligatoires, cas de recours et durée : <strong>mêmes que pour le CDD</strong>.</li>
    <li>Rupture : l'ETT peut arrêter une mission avant le terme mais doit proposer une <strong>mission équivalente dans un délai de 3 jours</strong>.</li>
    <li>Non-respect de la réglementation des contrats précaires ⇒ peines pénales : <strong>3 750 € d'amende et 6 mois d'emprisonnement</strong>.</li>
  </ul>
  <p><strong>CDD ≠ intérim :</strong> le salarié en CDD est salarié de l'entreprise où il travaille ; l'intérimaire est juridiquement salarié de l'entreprise de travail temporaire.</p>
  `
},

// ============================================================
{
  id: "ch3a",
  num: "III-A",
  label: "Données personnelles & Internet",
  title: "Chapitre III (1re partie) — Données personnelles et droit de l'Internet",
  dek: "Vie privée, loi Informatique et Libertés, CNIL, RGPD, cookies, puis le réseau Internet, sa gouvernance et la responsabilité de chacun de ses acteurs.",
  body: `
  <h2 id="ch3-vieprivee">I — Droit et protection des données personnelles</h2>
  <h3>Respect de la vie privée et droit à l'image</h3>
  <ul>
    <li><span class="art">Art. 9 al. 1 C. civ.</span> « Chacun a droit au respect de sa vie privée » (loi du 17 juillet 1970).</li>
    <li><span class="art">Art. 8 CEDH</span> (Convention européenne des droits de l'homme, ratifiée par la France) : « Toute personne a droit au respect de sa vie privée et familiale, de son domicile, de sa correspondance. »</li>
    <li><span class="art">Art. 226-1 C. pén.</span> — <strong>délit d'atteinte à la vie privée</strong>, sous deux formes : capter, enregistrer ou transmettre <strong>sans consentement</strong> des paroles prononcées à titre privé ou confidentiel ; fixer, enregistrer ou transmettre <strong>sans consentement</strong> l'image d'une personne se trouvant dans un <strong>lieu privé</strong>.</li>
  </ul>

  <h3>Donnée personnelle et traitement</h3>
  <div class="duo">
    <div class="card-def"><p class="eyebrow">Donnée personnelle</p><p>Toute information se rapportant à une personne physique <strong>identifiée ou identifiable</strong>, directement (nom, prénom) ou indirectement (n° client, téléphone, donnée biométrique, voix, image…). L'identification peut venir d'une seule donnée (n° de sécurité sociale, ADN) ou du <strong>croisement</strong> de plusieurs (femme vivant à telle adresse, née tel jour, abonnée à tel magazine).</p><p><em>Ex. : une base marketing sans les noms reste un traitement de données personnelles s'il est possible de remonter à une personne.</em></p></div>
    <div class="card-def"><p class="eyebrow">Traitement de données personnelles</p><p>Toute opération sur des données personnelles, quel que soit le procédé : collecte, enregistrement, organisation, conservation, modification, extraction, consultation, utilisation, communication, rapprochement… Il doit avoir un <strong>objectif (finalité)</strong> légal et légitime.</p><p>Un traitement n'est <strong>pas forcément informatique</strong> (fichiers papier inclus). Un fichier de seules coordonnées d'entreprises (standard, e-mail générique) n'est pas un traitement de données personnelles.</p></div>
  </div>
  <table class="tbl dates">
    <tr><th>1974</th><td>Révélation du projet <strong>SAFARI</strong> (interconnexion de fichiers administratifs), vive contestation</td></tr>
    <tr><th>1978</th><td><strong>Loi Informatique et Libertés</strong> et naissance de la <strong>CNIL</strong></td></tr>
    <tr><th>2004</th><td>Refonte de la loi (6 août 2004)</td></tr>
    <tr><th>2013</th><td>Affaire <strong>Snowden</strong> : prise de conscience mondiale sur l'utilisation des données</td></tr>
    <tr><th>2016</th><td>Adoption du <strong>RGPD</strong></td></tr>
    <tr><th>2018</th><td>Entrée en application du RGPD (<strong>25 mai 2018</strong>)</td></tr>
  </table>

  <h3>1-1 La loi « Informatique, fichiers et libertés » du 6 janvier 1978</h3>
  <ul>
    <li>Crée la <strong>CNIL</strong>.</li>
    <li><strong>Refonte du 6 août 2004</strong> : transpose la directive européenne 95/46 ; s'adapte aux nouvelles technologies (biométrie) ; donne à la CNIL un <strong>pouvoir de sanction</strong> ; crée le <strong>correspondant informatique et libertés (CIL)</strong>.</li>
    <li><strong>Article 1er</strong> : l'informatique doit être au service de chaque citoyen ; son développement s'opère dans le cadre de la coopération internationale ; elle ne doit porter atteinte ni à l'identité humaine, ni aux droits de l'homme, ni à la vie privée, ni aux libertés individuelles ou publiques.</li>
    <li>Encadre la collecte, l'enregistrement, l'élaboration, la conservation d'<strong>informations nominatives</strong> (traitements automatisés pour une personne publique ou privée).</li>
  </ul>
  <div class="callout retenir"><span class="label">Les 5 grands principes (à savoir par cœur)</span>
    <ol class="five">
      <li><strong>Finalité</strong> du traitement : objectif déterminé, explicite et légitime</li>
      <li><strong>Pertinence</strong> des données : seulement les données nécessaires à cette finalité</li>
      <li><strong>Respect des droits des personnes</strong> : information, accès, rectification, opposition, suppression</li>
      <li><strong>Conservation limitée</strong> dans le temps</li>
      <li><strong>Obligation de sécurité</strong> et de confidentialité</li>
    </ol>
  </div>
  <p>La loi prévoit aussi : l'interdiction de collecter des <strong>données sensibles</strong> (religion, santé, opinions politiques… sauf exceptions), le principe de <strong>collecte loyale</strong>, l'obligation d'<strong>informer</strong> les personnes, et (jusqu'au RGPD) l'obligation de <strong>déclarer</strong> les fichiers à la CNIL.</p>

  <h4>B — Collecte des données sur Internet</h4>
  <p>La collecte de données nominatives sur Internet pour constituer un fichier est encadrée : adresses IP, date, heure de connexion, destinataire, requête, message… Ces données, consignées dans un <strong>fichier log</strong>, peuvent révéler l'identité de l'utilisateur et les pages consultées.</p>
  <ul>
    <li><strong>Logging</strong> (historique des événements) : enregistrement séquentiel dans un fichier ou une base de tous les événements d'un processus (application, réseau…).</li>
    <li><strong>Log file</strong> (journal) : fichier d'enregistrements séquentiels datés et classés chronologiquement ; chaque action (ouverture de session, installation, navigation) en produit. Sous Windows : dossier System32.</li>
  </ul>
  <div class="juris"><span class="label">Exemple</span><strong>Scandale AOL (2006)</strong> — AOL publie un log de millions de requêtes de ses abonnés américains (mars à mai 2006), « anonymisé » en remplaçant les numéros d'abonnés par des identifiants. En croisant les recherches, de nombreux internautes ont été identifiés et une partie de leur vie intime dévoilée.</div>
  <ul>
    <li><strong>Art. 25 de la loi de 1978</strong> : « La collecte de données opérée par tout moyen frauduleux, déloyal ou illicite est interdite ». L'illicéité vient du défaut d'information de la personne, qui doit pouvoir s'opposer au traitement. Commercialiser ces données sans accord viole la loi.</li>
    <li><strong>Art. 43 al. 2</strong> : une information nominative ne peut être divulguée sans l'autorisation de l'intéressé (ex. un numéro de téléphone dans un fichier informatisé).</li>
    <li>D'où : <strong>soit l'anonymat</strong> des individus, <strong>soit l'obtention du consentement</strong>. Obligation d'informer l'internaute et d'obtenir son consentement en cas d'utilisation commerciale (idem pour les cookies).</li>
  </ul>
  <div class="quote">« Conformément à la loi « informatique et libertés » du 6 janvier 1978, ces informations sont nécessaires à notre société pour traiter votre demande. Elles sont enregistrées dans notre fichier de gestion de la clientèle. Vous pouvez exercer votre droit d'accès et de rectification auprès de notre service clientèle. Si vous ne souhaitez pas que les données vous concernant soient transmises à nos partenaires à des fins de prospection commerciale, cochez cette case. »<span class="quote-src">Mention légale type en cas de captation de données</span></div>

  <h4>Les cookies</h4>
  <ul>
    <li><strong>Directive 2002/58 (vie privée et communications électroniques), art. 5 §3</strong> : stocker des données sur l'ordinateur de l'utilisateur seulement s'il est <strong>informé</strong> de l'utilisation et peut <strong>refuser</strong>. Le stockage pour raisons techniques est exempté. Mal appliquée.</li>
    <li><strong>Directive 2009/136/CE du 25 novembre 2009</strong> : stocker ou lire des informations sur le terminal n'est permis qu'avec l'<strong>accord</strong> de l'utilisateur, après une information claire et complète sur les finalités. L'accord peut être exprimé par les paramètres du navigateur quand c'est techniquement possible.</li>
    <li><strong>Vol de cookies</strong> : interception par un tiers non autorisé. Par <strong>renifleur de paquets</strong> (packet sniffer, sur des sessions HTTP non chiffrées) ou par injection de <strong>script</strong> dans une page (XSS) qui envoie <code>document.cookie</code> à un serveur pirate : l'attaquant se fait passer pour la victime sans son mot de passe (détournement de session).</li>
  </ul>

  <h4>C — Secret des correspondances du salarié dans l'entreprise</h4>
  <p>L'usage abusif d'Internet ou de la messagerie sur le lieu de travail peut justifier un licenciement, <strong>mais</strong> l'employeur ne peut pas accéder au contenu des correspondances personnelles du salarié, <strong>même s'il a interdit l'usage non professionnel</strong> de l'ordinateur (droit au respect de l'intimité de la vie privée, secret des correspondances).</p>
  <div class="juris"><span class="label">Jurisprudence</span>Licenciement d'un salarié de Carrefour France sorti de l'intranet pour envoyer des messages « scabreux » à d'anciens collègues : l'employeur ne peut, sans violer la liberté fondamentale du salarié au respect de sa vie privée, prendre connaissance des messages personnels émis et reçus avec l'outil informatique de travail. (Principe posé par l'arrêt <strong>Nikon, Cass. soc., 2 octobre 2001</strong>.)</div>
  <p>À la différence de l'usage de l'ordinateur, le <strong>contenu des traces</strong> laissées par le salarié relève de la protection des données personnelles et de la vie privée.</p>

  <h3 id="ch3-cnil">1-2 La CNIL — Commission nationale de l'informatique et des libertés</h3>
  <p>Créée par la loi du 6 janvier 1978. <strong>Autorité administrative indépendante (AAI)</strong> : organisme public qui agit au nom de l'État sans être placé sous l'autorité du gouvernement ou d'un ministre.</p>
  <div class="duo">
    <div class="card-def"><p class="eyebrow">Missions</p><ul><li>Veiller au respect de l'identité humaine, de la vie privée et des libertés dans le monde numérique</li><li>Développer la réflexion prospective, analyser les nouveaux usages, anticiper la régulation</li><li>Encadrer les traitements automatisés publics ou privés</li><li>Accompagner la mise en conformité ; recevoir et traiter les <strong>réclamations</strong> (plainte en ligne)</li><li><strong>Contrôles</strong> sur place ou en ligne ; <strong>mise en demeure</strong> ; <strong>sanctions</strong> (amende…)</li></ul></div>
    <div class="card-def"><p class="eyebrow">Composition : 18 membres</p><ul class="compo"><li><b>6</b> représentants des hautes juridictions (Cour de cassation, Conseil d'État, Cour des comptes)</li><li><b>5</b> personnalités qualifiées</li><li><b>4</b> parlementaires (Assemblée, Sénat)</li><li><b>2</b> membres du Conseil économique, social et environnemental</li><li><b>1</b> membre de la CADA (Commission d'accès aux documents administratifs)</li></ul></div>
  </div>
  <p><strong>Les droits que la CNIL aide à exercer :</strong> droit d'accès, de rectification, d'opposition, au déréférencement ; modèles de courrier ; plainte en ligne (Internet, commerce, travail, téléphonie, banque et crédit…).</p>
  <p><strong>Persistance de l'information numérique :</strong> droit à l'image, e-réputation, droit à l'oubli. Toute personne, célèbre ou non, peut s'opposer à la captation, fixation ou diffusion de son image sans autorisation expresse et préalable. <strong>Consentir à être photographié ≠ autoriser la diffusion</strong> de son image.</p>
  <p><strong>Documentation CNIL :</strong> guides, fiches pratiques, questions/réponses, « fichiers en fiches » (FNIG : interdits de gérer ; TAJ : antécédents judiciaires ; PREVENTEL : impayés de téléphonie ; FNAEG : empreintes génétiques…).</p>

  <h3 id="ch3-rgpd">1-3 Le RGPD — Règlement général sur la protection des données</h3>
  <ul>
    <li>Entré en application le <strong>25 mai 2018</strong> dans toute l'Union européenne.</li>
    <li>Encadre la captation et le traitement des données personnelles (employés, clients, fournisseurs…).</li>
    <li>S'inscrit dans la <strong>continuité de la loi de 1978</strong> et renforce le contrôle des citoyens sur leurs données ; <strong>harmonise</strong> les règles en Europe (cadre juridique unique) ; développe le numérique dans l'UE sur la <strong>confiance</strong> des utilisateurs.</li>
    <li>Supprime l'obligation de déclaration préalable à la CNIL : on passe à une logique de <strong>responsabilité</strong> (l'entreprise doit pouvoir démontrer sa conformité).</li>
  </ul>
  <div class="flow">
    <div>Suis-je en présence de données à caractère personnel ?<span>non ⇒ pas soumis</span></div>
    <div>Un traitement est-il mis en œuvre ?<span>non ⇒ pas soumis</span></div>
    <div>Est-ce dans le cadre d'activités exclusivement personnelles ?<span>oui ⇒ pas soumis</span></div>
    <div>Le responsable ou les moyens de traitement sont-ils sur le territoire (France / UE) ?<span>non ⇒ pas soumis</span></div>
    <div class="flow-end">Traitement soumis à la loi</div>
  </div>
  <p><strong>Mise en conformité</strong> (démarche CNIL) : constituer un <strong>registre</strong> des traitements, <strong>faire le tri</strong> dans les données, <strong>respecter les droits</strong> des personnes, <strong>sécuriser</strong> les données. Exemples du cours : La Redoute ; le moteur Qwant, qui ne collecte pas les données personnelles et que des administrations (ministère des Armées) préfèrent à Google.</p>
  <div class="callout complement"><span class="label">Complément</span>Le RGPD crée le <strong>délégué à la protection des données (DPO)</strong>, qui succède au CIL, les droits à l'<strong>effacement</strong> et à la <strong>portabilité</strong>, et des amendes jusqu'à <strong>20 M€ ou 4 % du chiffre d'affaires mondial</strong>.</div>

  <h2 id="ch3-internet">II — Droit de l'Internet</h2>
  <h3>2-1 Le réseau Internet : repères historiques</h3>
  <table class="tbl dates">
    <tr><th>1957</th><td>Lancement de <strong>Spoutnik</strong> par l'URSS, en pleine guerre froide</td></tr>
    <tr><th>1958</th><td>Eisenhower crée l'<strong>ARPA</strong> (future DARPA) : garder la supériorité technologique de l'armée américaine</td></tr>
    <tr><th>1962</th><td>Crise des missiles de Cuba : l'US Air Force étudie un réseau de communication indestructible</td></tr>
    <tr><th>1969</th><td>Naissance d'<strong>ARPANET</strong> : réseau expérimental qui fonctionne même en cas de destruction partielle</td></tr>
    <tr><th>1970-78</th><td>En France, <strong>Louis Pouzin</strong> élabore le réseau maillé <strong>Cyclades</strong></td></tr>
    <tr><th>1972</th><td><strong>Robert Kahn</strong> : 1re démonstration publique d'ARPANET (ICCC, Washington) ; 1er courrier électronique</td></tr>
    <tr><th>1985</th><td>La NSF crée <strong>NSFNET</strong> (5 supercalculateurs) ; réseaux reliés avec <strong>TCP/IP</strong></td></tr>
    <tr><th>1988</th><td>Le réseau de l'<strong>INRIA</strong> est relié à celui de la NSF</td></tr>
    <tr><th>1991</th><td>Août : naissance du <strong>World Wide Web</strong> au CERN (<strong>Tim Berners-Lee</strong>, Robert Cailliau) : WWW, HTTP, HTML</td></tr>
    <tr><th>1994</th><td>Arrivée de l'Internet grand public en France</td></tr>
    <tr><th>2020</th><td>58,03 millions de connectés en France (89 % des foyers) selon le cours</td></tr>
  </table>

  <h3>2-2 La gouvernance d'Internet</h3>
  <table class="tbl">
    <tr><th>Organisme</th><th>Statut</th><th>Rôle</th></tr>
    <tr><td><strong>ICANN</strong></td><td>Société de droit privé américain, d'intérêt public</td><td>Gère le système Internet mondial : allocation des adresses IP, gestion des noms de domaine (DNS)</td></tr>
    <tr><td><strong>AFNIC</strong></td><td>Association loi 1901</td><td>Gère les extensions françaises : .fr, .re, .pm, .tf, .wf, .yt (par délégation de l'IANA, sous contrôle de l'ICANN)</td></tr>
    <tr><td><strong>ARCEP</strong></td><td>Autorité de régulation des communications électroniques et des postes</td><td>Contrôle le réseau (droit des télécommunications)</td></tr>
    <tr><td><strong>Conseil national du numérique (CNNum)</strong></td><td>Commission consultative indépendante</td><td>Avis et recommandations sur l'impact du numérique ; concertations ; consulté par le Gouvernement</td></tr>
    <tr><td><strong>Etalab</strong></td><td>Mission de l'État</td><td>Réutilisation des informations publiques ; portail <strong>data.gouv.fr</strong> (open data) ; communauté Dataconnexions</td></tr>
    <tr><td><strong>NetPublic</strong></td><td>Site public</td><td>Accompagner l'accès de tous à Internet (formation, passeport Internet et multimédia)</td></tr>
  </table>
  <p><strong>Droit applicable à l'Internet en France :</strong> le <strong>réseau</strong> relève du droit des télécommunications (ARCEP) ; les <strong>services</strong> proposés relèvent du commerce électronique et des contrats à distance.</p>

  <h3 id="ch3-acteurs">2-3 Droits et obligations des acteurs de l'Internet</h3>
  <div class="actors">
    <div class="actor"><p class="eyebrow">A — Hébergeur</p><p>Personne qui assure, même gratuitement, le <strong>stockage</strong> de signaux, écrits, images, sons ou messages fournis par les utilisateurs.</p><p><strong>Pas responsable</strong> pénalement ni civilement du contenu, <strong>sauf</strong> s'il avait effectivement connaissance de son caractère illicite et n'a pas agi <strong>promptement</strong> pour le retirer.</p><p>Conserve <strong>1 an</strong> les données de connexion (poursuite des infractions).</p></div>
    <div class="actor"><p class="eyebrow">B — Fournisseur de contenu (éditeur)</p><p>Celui qui fournit le site ou la page à l'hébergeur (entreprise, webmaster).</p><p><strong>Responsable pénalement et civilement</strong> du contenu et des liens hypertextes vers un site contrefait ou malfaisant.</p><p>Règles : responsabilité civile, concurrence déloyale, vie privée, CPI. Identification obligatoire des créateurs de sites (loi du 30 septembre 1986 modifiée le 1er août 2000).</p></div>
    <div class="actor"><p class="eyebrow">C — Opérateur et FAI</p><p>Opérateur (loi du 26 juillet 1996) : exploite un réseau de télécommunications ouvert au public. <strong>Pas responsable</strong> des informations diffusées.</p><p><strong>LCEN du 21 juin 2004</strong> : <strong>pas d'obligation générale de surveillance</strong> ni de recherche des activités illicites (vaut aussi pour le FAI).</p><p>Le FAI conserve <strong>1 an</strong> les données de connexion.</p></div>
    <div class="actor"><p class="eyebrow">D — Utilisateur</p><p>Respecte la responsabilité civile, la concurrence déloyale, la vie privée, le CPI.</p><ul><li>Publier un article de presse sans autorisation ⇒ violation du droit d'auteur du journaliste</li><li>Mettre en ligne la photo d'une personne sans autorisation ⇒ violation de l'art. 9 C. civ.</li><li>Spam ⇒ responsabilité contractuelle envers le FAI, délictuelle envers les autres internautes</li></ul></div>
  </div>
  <div class="juris"><span class="label">Jurisprudence — droit à l'image</span><strong>Paris Match, affaire « Loana et son bébé »</strong> : condamnation pour un reportage de photos privées diffusé sur le site sans consentement.<br><strong>TATI</strong> : un salarié avait autorisé la publication de sa photo sur le site, mais pas sa <strong>modification</strong> (le visage animé d'un clin d'œil) : l'employeur est condamné à des dommages-intérêts. L'autorisation doit porter aussi sur la modification de l'image.</div>
  <div class="juris"><span class="label">Jurisprudence — preuve</span><strong>TGI Paris, 10 avril 2013</strong> : une simple <strong>impression d'écran</strong> ne suffit pas à prouver la réalité d'une publication (contenu, date, caractère public) quand elle est contestée.</div>
  <div class="juris"><span class="label">Jurisprudence — hébergeur ou éditeur ?</span><strong>Omar et Fred c. Dailymotion, TGI Paris, 15 avril 2008</strong> : des vidéos du spectacle des humoristes sont mises en ligne par des internautes. Dailymotion est qualifié d'<strong>hébergeur</strong> (il ne choisit pas les contenus) et non d'éditeur : sa responsabilité n'est pas engagée, il doit seulement retirer les contenus signalés. Éditeur (LCEN) : « la personne qui détermine les contenus mis à disposition du public ».</div>

  <h4>Le nom de domaine</h4>
  <ul>
    <li><strong>Premier arrivé, premier servi</strong> : l'antériorité de l'enregistrement donne le nom, sous réserve de ne pas violer un droit de marque.</li>
    <li>.fr géré par l'AFNIC par délégation de l'IANA sous contrôle de l'ICANN ; .com entités commerciales ; .org organisations non gouvernementales…</li>
    <li>Ne peuvent être choisis les <strong>signes distinctifs</strong> d'autrui : nom commercial, enseigne, dénomination sociale, marque. Ex. <em>Lancome.com / Lankome.com</em> : risque de confusion pour des produits similaires ⇒ <strong>concurrence déloyale</strong>.</li>
    <li>Les <strong>marques notoires et de haute renommée</strong> sont protégées même pour des produits ou services non similaires.</li>
  </ul>
  `
},

// ============================================================
{
  id: "ch3b",
  num: "III-B",
  label: "Informatique & multimédia",
  title: "Chapitre III (2e partie) — Droit de l'informatique et du multimédia",
  dek: "Protection des logiciels et des bases de données, contrats informatiques, signature électronique, bulletin de paie électronique, œuvres multimédia et Hadopi.",
  body: `
  <h2 id="ch3-logiciel">III — Droit de l'informatique</h2>
  <h3>3-1 Droit applicable aux logiciels</h3>
  <h4>A — Définition</h4>
  <p><strong>Pas de définition juridique du logiciel.</strong> Textes : directive communautaire du <strong>14 mai 1991</strong> (protection juridique des programmes d'ordinateur), transposée par la <strong>loi du 10 mai 1994</strong>. L'<strong>arrêté du 22 décembre 1981</strong> le décrit comme « l'ensemble des programmes, procédés ou règles relatifs au fonctionnement d'un ensemble de traitement de données ».</p>
  <div class="callout retenir"><span class="label">À retenir</span>Les logiciels <strong>ne sont pas brevetables</strong> : ils sont protégés par le <strong>droit d'auteur</strong>. Le <strong>droit des contrats</strong> leur est aussi applicable. Protection de <strong>70 ans</strong>.</div>

  <h4>B — La conception de logiciels</h4>
  <p>Régime juridique : droit de la propriété intellectuelle + droit des contrats.</p>
  <ul>
    <li><strong>1 — Originalité :</strong> droit d'auteur si le logiciel est original : « effort personnalisé allant au-delà de la simple mise en œuvre d'une logique automatique et contraignante ». L'apport intellectuel relève de l'<strong>appréciation souveraine du juge</strong>. Dépôt (ex. Bibliothèque nationale des progiciels) <strong>facultatif</strong>, mais il sert de <strong>preuve</strong>.</li>
    <li><strong>2 — Création en entreprise :</strong> le logiciel appartient à son créateur, <strong>sauf</strong> s'il est réalisé dans le cadre de l'entreprise : <span class="art">Art. L113-9 CPI</span> « sauf dispositions statutaires ou stipulations contraires, les droits patrimoniaux sur les logiciels et leur documentation créés par un ou plusieurs employés dans l'exercice de leurs fonctions ou d'après les instructions de leur employeur sont dévolus à l'employeur qui est seul habilité à les exercer ».</li>
  </ul>
  <div class="callout piege"><span class="label">Piège classique</span>L'<span class="art">art. L113-9</span> ne vise que les <strong>salariés</strong>. Un prestataire indépendant (freelance, société de services) reste titulaire des droits : le client ne les obtient que par une <strong>clause de cession</strong> écrite dans le contrat.</div>

  <h4>3 — Droits patrimoniaux et droit moral sur le logiciel</h4>
  <table class="tbl">
    <tr><th>Droits patrimoniaux <span class="art">L122-6 CPI</span></th><th>Exceptions <span class="art">L122-6-1 CPI</span> (sans autorisation de l'auteur)</th></tr>
    <tr><td><ul><li>Droit de <strong>reproduction</strong></li><li>Droit d'<strong>adaptation</strong> (modification, amélioration)</li><li>Droit de <strong>distribution</strong> (onéreuse ou gratuite)</li></ul></td>
        <td><ul><li><strong>Corriger les erreurs</strong> du logiciel, sauf stipulation contractuelle contraire</li><li>Faire une <strong>copie de sauvegarde</strong> : droit « consacré » de l'utilisateur légitime (une clause ne peut pas l'interdire)</li><li><strong>Décompiler</strong> pour obtenir les informations nécessaires à l'<strong>interopérabilité</strong> avec d'autres logiciels</li></ul></td></tr>
  </table>
  <p><strong>Droit moral réduit</strong> — <span class="art">Art. L121-7 CPI</span> : sauf stipulation contraire, l'auteur du logiciel ne peut s'opposer à sa modification par le cessionnaire des droits si elle ne nuit ni à son honneur ni à sa réputation, et il ne peut exercer son <strong>droit de repentir ou de retrait</strong>. La portée du droit moral est considérablement réduite par rapport au droit commun.</p>
  <div class="schema">
    <div class="schema-col"><p class="eyebrow">Code de la propriété intellectuelle (CPI)</p><ul><li><strong>Propriété industrielle</strong> : brevets, marques, dessins et modèles</li><li><strong>Propriété littéraire et artistique</strong> : droits d'auteur, droits voisins, droits des bases de données</li></ul></div>
    <div class="schema-col"><p class="eyebrow">Droit moral (faire respecter l'œuvre)</p><ul><li>Inaliénable, perpétuel</li><li>Droit à la paternité, de divulgation, au respect de l'intégrité, de retrait / repentir</li></ul></div>
    <div class="schema-col"><p class="eyebrow">Droits patrimoniaux (monopole d'exploitation)</p><ul><li>Cessibles à des tiers par contrat</li><li>Limités dans le temps : vie de l'auteur + 70 ans, puis domaine public</li><li>Droit de reproduction (fixation sur un support), de représentation (communication au public)</li></ul></div>
  </div>
  <p><strong>Non-rivalité des biens immatériels :</strong> les objets numériques sont non rivaux et non rares (duplicables à l'infini), d'où l'importance des <strong>licences</strong> et du droit. Un bien <em>rival</em> (un stylo) ne peut être utilisé que par une personne à la fois.</p>
  <p><strong>Logiciels libres / propriétaires :</strong> le <strong>copyleft</strong> (opposé au copyright) instaure la gratuité et la liberté d'utilisation. 1998 : accord-cadre Éducation nationale / AFUL (Association francophone des utilisateurs de logiciels libres) ; plateforme SIALLE pour la visibilité du libre dans l'éducation.</p>

  <h4>C — La contrefaçon de logiciel</h4>
  <p><span class="art">Art. L332-4 CPI</span> : « L'auteur peut s'opposer à toute contrefaçon de son logiciel ». Sur requête, le <strong>président du TGI</strong> autorise la <strong>saisie-contrefaçon</strong> ; un huissier, accompagné d'un expert désigné, y procède ; le titulaire a <strong>15 jours</strong> pour assigner, à peine de nullité.</p>
  <p>Chiffres du cours : taux de piratage de <strong>40 %</strong> en France contre 34 % en moyenne européenne (26 % au Royaume-Uni) ; le logiciel est le <strong>2e produit le plus contrefait</strong> après les téléphones ; Microsoft dans le top 5 des marques contrefaites.</p>
  <div class="juris"><span class="label">Jurisprudence</span><strong>Microsoft c. Li, tribunal correctionnel de Bobigny</strong> : un trafiquant arrêté à Roissy avec plus de 4 000 certificats d'authenticité Windows contrefaits est condamné à <strong>12 mois d'emprisonnement dont 6 ferme</strong> (contrefaçon de logiciels et de marques, importation de marchandises prohibées).</div>

  <h4 id="ch3-contrats-info">D — Fourniture de logiciel et maintenance</h4>
  <p>Fournir un système d'exploitation (logiciel) ou un programme (progiciel) relève de la <strong>liberté contractuelle</strong>, donc des clauses du contrat.</p>
  <table class="tbl">
    <tr><th>Contrat</th><th>Nature</th><th>Obligation principale</th></tr>
    <tr><td>Fourniture de logiciel</td><td>Soit <strong>prêt</strong> (rare), soit <strong>cession</strong> (contrat de vente), soit <strong>droit d'usage / licence</strong> (contrat de bail ou d'exploitation)</td><td>Dépend du contrat choisi</td></tr>
    <tr><td>Conception de logiciel</td><td><strong>Contrat d'entreprise</strong></td><td><strong>Obligation de moyens</strong> (et non de résultat) + <strong>obligation de conseil</strong></td></tr>
    <tr><td>Maintenance informatique</td><td>Contrat de prestation de services</td><td>Obligation <strong>préventive et curative</strong> du mainteneur ; <strong>obligation de moyens</strong></td></tr>
  </table>
  <ul>
    <li><strong>Obligation de conseil</strong> (plus forte que la simple obligation d'information) : adapter le produit au besoin du client et le mettre en garde contre les difficultés prévisibles. Manquement ⇒ <strong>résolution du contrat + dommages-intérêts</strong>.</li>
    <li><strong>Clause de secours</strong> : mise à disposition du client, en cas de panne sérieuse, d'un système compatible avec ses besoins.</li>
  </ul>

  <h3 id="ch3-bdd">3-2 Droit applicable aux bases de données</h3>
  <div class="card-def wide"><p class="eyebrow">Définition — directive du 11 mars 1996 et <span class="art">art. L112-3 CPI</span></p><p>« Recueil d'œuvres, de données ou d'autres éléments indépendants, disposés de manière <strong>systématique ou méthodique</strong>, et <strong>individuellement accessibles</strong> par des moyens électroniques ou par tout autre moyen. »</p></div>
  <ul>
    <li>Protection si elle fait preuve d'originalité, d'un apport intellectuel, ou justifie d'<strong>investissements financiers, matériels ou humains substantiels</strong> (<span class="art">L341-1 CPI</span>).</li>
    <li><strong>Droit spécifique (sui generis) du producteur</strong> : <strong>15 ans</strong> à partir du 1er janvier de l'année suivant l'achèvement de la base ; <strong>chaque nouvel investissement substantiel relance le délai de 15 ans</strong>.</li>
    <li>Également protégée par le droit d'auteur et, comme le logiciel, par le droit des contrats.</li>
    <li>Atteinte aux droits : 2 ans d'emprisonnement et 15 000 € d'amende selon le cours.</li>
    <li>Une <strong>licence d'utilisation</strong> peut être accordée au client (mises à jour incluses) ; un <strong>contrat d'abonnement</strong> peut la remplacer.</li>
  </ul>
  <div class="juris"><span class="label">Jurisprudence</span><strong>SFES c. Tigest, CA Paris, 2001</strong> — La SFES édite un annuaire des exposants de ses salons ; Tigest loue des bases extraites de cet annuaire. La cour constate que l'annuaire, classé par ordre alphabétique, secteur et zone géographique, est une <strong>base de données</strong> ; que la SFES a fait des <strong>investissements substantiels</strong> ; et que Tigest a <strong>extrait et réutilisé une partie substantielle</strong> sans autorisation (<span class="art">L341-1 et L342-1 CPI</span>). Tigest est condamnée.</div>

  <h3 id="ch3-signature">3-3 La signature électronique</h3>
  <ul>
    <li><strong>Définition :</strong> procédé qui garantit l'<strong>authenticité de l'expéditeur</strong> (authentification) et l'<strong>intégrité</strong> du message reçu.</li>
    <li><strong>Non-répudiation :</strong> l'expéditeur ne peut pas nier avoir envoyé le message.</li>
  </ul>
  <h4>Mécanisme : la fonction de hachage</h4>
  <p>Fonction de condensation qui produit un <strong>condensé</strong> (haché, <em>message digest</em>) : courte suite de caractères représentant le texte. Un seul haché par texte ; <strong>la moindre modification du document change son haché</strong> ; fonction <strong>à sens unique</strong> (impossible de retrouver le message à partir du condensé). Si un moyen secret permet de retrouver le message, la fonction est dite « <strong>à brèche secrète</strong> ».</p>
  <h4>Législation</h4>
  <ul>
    <li><strong>Loi du 13 mars 2000</strong> et <strong>décret du 30 mars 2001</strong>.</li>
    <li><span class="art">Art. 1316-1 C. civ.</span> : l'écrit électronique est admis en preuve <strong>au même titre que l'écrit papier</strong>, si la personne dont il émane est dûment identifiée et s'il est établi et conservé de façon à garantir son intégrité.</li>
    <li><span class="art">Art. 1316-4 C. civ.</span> : la signature électronique consiste en l'usage d'un <strong>procédé fiable d'identification</strong> garantissant son lien avec l'acte. Fiabilité <strong>présumée</strong> jusqu'à preuve contraire quand l'identité du signataire et l'intégrité de l'acte sont assurées dans les conditions d'un décret.</li>
  </ul>
  <table class="tbl">
    <tr><th>Certificat</th><th>Vérification d'identité</th></tr>
    <tr><td>Classe 1</td><td>Adresse e-mail seulement (aucun contrôle d'identité)</td></tr>
    <tr><td>Classe 2</td><td>Preuve d'identité fournie à distance (copie de carte d'identité)</td></tr>
    <tr><td>Classe 3</td><td>Présentation physique du demandeur (face à face)</td></tr>
    <tr><td>Classe 3+</td><td>Face à face + carte à puce</td></tr>
  </table>
  <p>Les certificats sont appliqués aux documents par un <strong>logiciel de signature</strong>. Prestataires de certification qualifiés (arrêté du 26 juillet 2004) : CertEurope, Certinomis, ChamberSign, banques…</p>
  <div class="juris"><span class="label">Jurisprudence</span><strong>TA Toulouse, ordonnance du 9 mars 2011 (CNRS)</strong> : des documents signés à la main, scannés et placés dans un <strong>fichier zip signé électroniquement</strong> ne sont pas considérés comme signés électroniquement. La signature du zip ne s'applique pas à chaque document qu'il contient.</div>
  <div class="callout complement"><span class="label">Complément</span>Depuis 2016, ces articles sont devenus les <span class="art">art. 1366</span> (écrit électronique) et <span class="art">art. 1367</span> (signature électronique) du Code civil. Au niveau européen, le règlement <strong>eIDAS</strong> (2014) encadre la signature électronique.</div>

  <h3>3-4 Le bulletin de paie électronique</h3>
  <ul>
    <li><strong>Loi n° 2009-526 du 12 mai 2009</strong>, art. 26, modifiant l'<span class="art">art. L3243-2 C. trav.</span> : remise sous forme électronique <strong>avec l'accord du salarié</strong>, dans des conditions garantissant l'<strong>intégrité</strong> des données.</li>
    <li>Conservation : l'<strong>employeur 5 ans</strong> à compter de l'émission ; le <strong>salarié sans limitation de durée</strong>. Cette information figure obligatoirement sur le bulletin.</li>
  </ul>
  <div class="callout complement"><span class="label">Complément</span>Depuis 2017, le bulletin électronique est le principe et le salarié peut s'y <strong>opposer</strong>.</div>

  <h2 id="ch3-multimedia">IV — Droit du multimédia</h2>
  <h3>4-1 Le multimédia</h3>
  <p><strong>Pas de définition dans le CPI.</strong> Définition du cours : réunion sur un même support numérique d'éléments différents (images, sons, textes…) régis par un programme (logiciel). Ex. : sites web, CD-Rom, <strong>jeux vidéo</strong>, DVD.</p>
  <table class="tbl">
    <tr><th>Qualification de l'œuvre multimédia</th><th>Sens</th></tr>
    <tr><td>Œuvre individuelle</td><td>Créée par un seul auteur</td></tr>
    <tr><td>Œuvre de collaboration</td><td>Plusieurs auteurs personnes physiques y concourent ; elle est leur propriété commune</td></tr>
    <tr><td>Œuvre collective</td><td>Créée à l'initiative d'une personne (souvent une société) qui l'édite sous son nom ; les contributions se fondent dans l'ensemble ; les droits naissent sur la tête de cette personne</td></tr>
  </table>
  <h3>4-2 Droits et obligations des acteurs du multimédia</h3>
  <ul>
    <li><strong>A — Propriété intellectuelle :</strong> droits patrimoniaux et moraux de l'auteur ; respect des droits d'auteur des œuvres existantes intégrées ; respect du droit des bases de données ; droit commun de la PI.</li>
    <li><strong>B — Bases de données :</strong> voir 3-2.</li>
    <li><strong>C — Mesures techniques et peer to peer :</strong> les mesures techniques de protection limitent les copies privées sur CD, DVD… (<span class="art">L331-5 CPI</span>). Le <strong>P2P</strong> (pair à pair) peut porter atteinte au droit exclusif d'exploitation du titulaire.</li>
  </ul>
  <h4>Hadopi</h4>
  <p><strong>Haute Autorité pour la diffusion des œuvres et la protection des droits sur Internet</strong>, créée par la <strong>loi Création et Internet du 12 juin 2009</strong> (« loi Hadopi »). Un seul sujet : le droit d'auteur sur Internet. Missions : encourager l'<strong>offre légale</strong> (label PUR), protéger le droit d'auteur par une <strong>réponse graduée</strong>, sensibiliser à un usage responsable, favoriser l'innovation (Labs Hadopi).</p>
  <div class="callout complement"><span class="label">Complément</span>Depuis le 1er janvier 2022, l'Hadopi a fusionné avec le CSA pour former l'<strong>Arcom</strong>. Depuis 2020, le TGI s'appelle <strong>tribunal judiciaire</strong>.</div>
  <h4>Durée du droit d'auteur</h4>
  <p><span class="art">Art. L111-1 et L123-1 CPI</span> : l'auteur jouit d'un droit de propriété exclusif <strong>dès la création</strong>, <strong>sans formalité</strong> (dépôt ou enregistrement), pendant l'année civile du décès de l'auteur et les <strong>70 années</strong> qui suivent, au profit de ses ayants droit.</p>
  <div class="juris"><span class="label">Exemple du cours</span>L'affiche de recrutement de l'US Army de 1917 (« I want you ») est de James Montgomery Flagg, mort en 1960 : 1960 + 70 ans ⇒ protégée jusqu'à fin <strong>2030</strong>.</div>
  <p><strong>Sites de référence :</strong> Legalis.net, Légifrance, CNIL, Juriscom, CELOG (CPI annoté), IRPI, Le Monde Informatique (juridique).</p>
  `
},

// ============================================================
{
  id: "methode",
  num: "M",
  label: "Méthode : analyser un contrat",
  title: "Méthode — Analyser un contrat avec la grille du cours",
  dek: "La grille de l'examen ligne par ligne, ce qu'il faut écrire dans chaque case, et les pièges qui coûtent des points.",
  body: `
  <h2>La grille d'analyse (celle du poly)</h2>
  <table class="tbl grille-modele">
    <tr><th>Ligne de la grille</th><th>Ce qu'on attend</th></tr>
    <tr><td>Dénomination du contrat et éléments essentiels</td><td>Le <strong>nom juridique précis</strong> (contrat de bail, de prêt d'argent, de licence, contrat de travail à durée indéterminée…) + l'essentiel en une phrase : qui fournit quoi, contre quoi, pour combien de temps.</td></tr>
    <tr><td>Conclusion (date, lieu)</td><td>Recopier date et lieu (« Fait à … le … »). S'ils manquent, le dire et indiquer quand le contrat est formé (ex. à l'ouverture de l'emballage).</td></tr>
    <tr><td>Forme du contrat</td><td>Écrit <strong>sous signature privée</strong> (sous seing privé), <strong>acte authentique</strong> (notaire), oral, lettre d'engagement, contrat d'adhésion pré-imprimé, acceptation électronique… Préciser si l'écrit est exigé pour la validité ou seulement pour la preuve.</td></tr>
    <tr><td>Qui sont les parties ?</td><td>Nom, <strong>qualité juridique</strong> (bailleur / preneur, prêteur / emprunteur, employeur / salarié, concédant / licencié, client / prestataire), adresse ou siège, et pour une société son représentant.</td></tr>
    <tr><td>Capacité des parties</td><td>Personne physique : <strong>majeure et capable</strong> (pas de mesure de protection connue). Personne morale : capacité limitée à son <strong>objet social</strong>, représentée par une personne habilitée.</td></tr>
    <tr><td>Consentement (citer les vices possibles)</td><td>« Consentement libre et éclairé, matérialisé par la signature / l'acceptation ». Puis les vices <strong>appliqués au cas</strong> : <strong>erreur</strong> (sur quoi ?), <strong>dol</strong> (quelle dissimulation possible ?), <strong>violence</strong> (quelle pression ?).</td></tr>
    <tr><td>Objet du contrat</td><td>La prestation de chaque partie : ce qui est donné ou fait, et la contrepartie. Vérifier : existe, déterminé ou déterminable, dans le commerce / possible, licite.</td></tr>
    <tr><td>Cause</td><td>La raison de s'engager pour chaque partie (la contrepartie attendue) : « licite et morale, conforme à l'ordre public ». Rappeler que la cause a été supprimée en 2016 mais que ses effets demeurent (contenu licite).</td></tr>
    <tr><td>Obligations des parties (communes à tout contrat de ce type)</td><td>Les obligations <strong>de base</strong> du type de contrat, même si le texte ne les écrit pas. Ex. bail : délivrer le bien, assurer une jouissance paisible / payer le loyer, user du bien raisonnablement.</td></tr>
    <tr><td>Clauses particulières fixant des obligations spécifiques</td><td>Les clauses <strong>propres à ce contrat</strong>, nommées par leur nom juridique (clause résolutoire, attributive de juridiction, de non-concurrence…) avec leur effet, et <strong>une critique si elle est abusive ou illicite</strong>.</td></tr>
    <tr><td>Nature juridique</td><td>7 paires à <strong>cocher et justifier</strong> : consensuel / solennel / réel ; gré à gré / adhésion ; synallagmatique / unilatéral ; onéreux / gratuit ; commutatif / aléatoire ; instantané / successif ; (nommé / innommé).</td></tr>
  </table>

  <h2>Justifier la nature juridique : phrases types</h2>
  <div class="phrases">
    <p><b>Consensuel</b> — formé par le seul échange des consentements (art. 1109) ; l'écrit ne sert que de preuve.</p>
    <p><b>Solennel</b> — sa validité dépend d'une forme imposée par la loi (acte notarié, écrit obligatoire).</p>
    <p><b>Réel</b> — il n'est formé que par la remise de la chose (ou des fonds).</p>
    <p><b>De gré à gré</b> — les clauses ont été librement négociées entre les parties (art. 1110).</p>
    <p><b>D'adhésion</b> — les conditions générales sont fixées à l'avance par une partie, l'autre ne peut que les accepter ou refuser.</p>
    <p><b>Synallagmatique</b> — il crée des obligations réciproques à la charge des deux parties (art. 1106).</p>
    <p><b>Unilatéral</b> — une seule partie est obligée envers l'autre.</p>
    <p><b>À titre onéreux</b> — chaque partie reçoit un avantage en contrepartie de ce qu'elle procure (art. 1107).</p>
    <p><b>À titre gratuit</b> — une partie procure un avantage à l'autre sans rien recevoir en échange.</p>
    <p><b>Commutatif</b> — l'étendue des prestations est connue dès la conclusion (art. 1108).</p>
    <p><b>Aléatoire</b> — la prestation dépend d'un événement incertain : chance de gain ou risque de perte.</p>
    <p><b>À exécution instantanée</b> — les obligations s'exécutent en une prestation unique.</p>
    <p><b>À exécution successive</b> — l'exécution s'échelonne dans le temps (art. 1111-1).</p>
    <p><b>Nommé</b> — il est réglementé par la loi (Code civil, Code du travail…) (art. 1105).</p>
  </div>

  <h2>Les pièges qui coûtent des points</h2>
  <div class="traps">
    <div><strong>« Écrit » ne veut pas dire « solennel ».</strong> Un bail, une vente, un contrat de prestation écrits restent consensuels : l'écrit sert de preuve.</div>
    <div><strong>Le prêt entre particuliers est réel</strong> (formé par la remise des fonds) et donc <strong>unilatéral</strong> (seul l'emprunteur doit encore quelque chose). Le prêt consenti par un établissement de crédit est consensuel.</div>
    <div><strong>Une société n'est pas « majeure ».</strong> Capacité = personne morale, représentée par son gérant / directeur.</div>
    <div><strong>Bail, licence, abonnement, travail, maintenance ⇒ exécution successive</strong> et rupture par <strong>résiliation</strong> (pour l'avenir).</div>
    <div><strong>Contrat de travail</strong> : synallagmatique, onéreux, consensuel, d'adhésion, intuitu personae, successif, nommé.</div>
    <div><strong>Obligations communes ≠ clauses particulières.</strong> Ne recopie pas tout le contrat dans « obligations » : les clauses spécifiques vont dans la ligne suivante, avec leur nom.</div>
    <div><strong>Critique les clauses.</strong> Une clause illicite (non-concurrence sans contrepartie, faute lourde fixée d'avance, exclusion totale de responsabilité face à un consommateur, attributive de juridiction contre un non-commerçant) rapporte des points si tu l'expliques.</div>
  </div>

  <h2>Lexique des clauses fréquentes</h2>
  <table class="tbl">
    <tr><th>Clause</th><th>Effet</th></tr>
    <tr><td>Clause résolutoire</td><td>Le contrat est résolu (ou résilié) de plein droit en cas d'inexécution, souvent après mise en demeure restée sans effet, sans passer par le juge</td></tr>
    <tr><td>Clause attributive de juridiction (de compétence)</td><td>Désigne le tribunal compétent en cas de litige. Valable seulement entre commerçants (art. 48 CPC)</td></tr>
    <tr><td>Clause de divisibilité</td><td>Si une clause est annulée, le reste du contrat reste valable</td></tr>
    <tr><td>Élection de domicile</td><td>Chaque partie désigne l'adresse où lui envoyer les actes</td></tr>
    <tr><td>Clause de confidentialité</td><td>Interdit de divulguer les informations obtenues, souvent pendant et après le contrat</td></tr>
    <tr><td>Clause d'exclusivité</td><td>Une partie s'engage à ne traiter qu'avec l'autre</td></tr>
    <tr><td>Clause intuitu personae / d'incessibilité</td><td>Le contrat ne peut être cédé ni sous-traité sans accord (ex. interdiction de sous-louer)</td></tr>
    <tr><td>Clause de réserve de propriété</td><td>Le transfert de propriété est retardé jusqu'au paiement complet du prix</td></tr>
    <tr><td>Clause limitative ou exonératoire de responsabilité</td><td>Limite ou supprime la réparation due en cas de dommage. Interdite face à un consommateur (clause abusive)</td></tr>
    <tr><td>Clause de garantie (d'éviction, de contrefaçon)</td><td>Une partie garantit l'autre contre les recours de tiers (ex. droits d'auteur)</td></tr>
    <tr><td>Clause pénale</td><td>Fixe à l'avance une indemnité forfaitaire en cas d'inexécution ; le juge peut la modérer</td></tr>
    <tr><td>Clause de tacite reconduction</td><td>Le contrat se renouvelle automatiquement s'il n'est pas dénoncé</td></tr>
    <tr><td>Clause de cession de droits</td><td>Transfère les droits patrimoniaux d'auteur ; chaque droit cédé doit être mentionné, avec son étendue, sa destination, son lieu et sa durée (art. L131-3 CPI)</td></tr>
    <tr><td>Clause de secours</td><td>Matériel de remplacement en cas de panne (contrats informatiques)</td></tr>
    <tr><td>Clauses du contrat de travail</td><td>Période d'essai, non-concurrence, mobilité, objectifs (résultat), dédit-formation</td></tr>
  </table>

  <h2>Rédiger l'analyse en 6 étapes (20 à 30 min)</h2>
  <ol class="steps">
    <li><strong>Lis le contrat deux fois</strong>, entoure les parties, les dates, les montants et les durées.</li>
    <li><strong>Nomme le contrat</strong> : c'est ce qui conditionne tout le reste (obligations communes, nature).</li>
    <li><strong>Remplis l'identification</strong> (conclusion, forme, parties, capacité).</li>
    <li><strong>Validité</strong> : consentement + vices appliqués au cas, objet, cause.</li>
    <li><strong>Obligations puis clauses</strong> : d'abord les obligations de base, puis chaque clause spéciale nommée et critiquée.</li>
    <li><strong>Nature juridique</strong> : coche les 7 paires, une phrase de justification chacune, en t'appuyant sur un élément du contrat.</li>
  </ol>
  `
}
];

// ============================================================
// Contrats à analyser (grille du cours) + corrigés
// nature : valeur attendue, ou tableau si plusieurs réponses se défendent
// ============================================================

const GRID_ROWS = [
  { key: "denomination", label: "Dénomination du contrat et éléments essentiels" },
  { key: "conclusion", label: "Conclusion (date, lieu)" },
  { key: "forme", label: "Forme du contrat" },
  { key: "parties", label: "Qui sont les parties à ce contrat ?" },
  { key: "capacite", label: "Capacité des parties" },
  { key: "consentement", label: "Consentement ? (citer les vices possibles)" },
  { key: "objet", label: "Objet du contrat" },
  { key: "cause", label: "Cause" },
  { key: "obligations", label: "Obligations des parties (communes à tout contrat de ce type)" },
  { key: "clauses", label: "Clauses particulières fixant des obligations spécifiques" }
];

const NATURE_ROWS = [
  { key: "formation", options: [["consensuel", "Consensuel"], ["solennel", "Solennel"], ["reel", "Réel"]] },
  { key: "negociation", options: [["gre", "De gré à gré"], ["adhesion", "D'adhésion"]] },
  { key: "obligations", options: [["synallagmatique", "Synallagmatique"], ["unilateral", "Unilatéral"]] },
  { key: "contrepartie", options: [["onereux", "À titre onéreux"], ["gratuit", "À titre gratuit"]] },
  { key: "alea", options: [["commutatif", "Commutatif"], ["aleatoire", "Aléatoire"]] },
  { key: "execution", options: [["instantanee", "À exécution instantanée"], ["successive", "À exécution successive"]] },
  { key: "reglementation", options: [["nomme", "Nommé"], ["innomme", "Innommé"]] }
];

const CONTRATS = [
// ------------------------------------------------------------
{
  id: "bail",
  titre: "Location d'un appartement étudiant",
  source: "TD n°1 · Exercice 2 (corrigé du prof complété)",
  type: "Civil",
  niveau: 1,
  texte: `
  <p class="c-title">Contrat de location à durée déterminée (durée de l'année universitaire)</p>
  <p>Entre les soussignés :<br>M. Jean-Pierre LESAGE demeurant à SAINT-BRIEUC, 22, rue de Goëdic, ci-après désigné le bailleur d'une part<br>et Mlle Odile PRÉVERT ci-après dénommée le preneur d'autre part,</p>
  <p>Il a été arrêté et convenu ce qui suit :</p>
  <p>M. LESAGE loue à Mlle PRÉVERT un appartement sis à Saint-Brieuc, rue Théodule Ribot, n° 12.</p>
  <p>Il appartient aux parties de constater et d'établir, par acte séparé dressé contradictoirement, l'état des lieux et la consistance du mobilier.</p>
  <p>La présente location n'est consentie de convention expresse entre les parties que pour la durée de l'année universitaire N – N+1, soit pour 9 mois, à compter du 1er octobre N, et prendra fin le 30 juin N+1, date à laquelle le locataire devra libérer les lieux sachant dès à présent qu'il ne pourra à la date d'expiration de sa location se prévaloir d'un droit quelconque au maintien dans les lieux.</p>
  <p>Le présent contrat est consenti moyennant le paiement par le preneur dans les 5 premiers jours du mois d'un loyer mensuel de 500,00 €, chauffage – électricité – gaz – entretien compris. Il ne pourra être résilié avant son expiration que par le preneur mais seulement après un congé comportant un préavis d'un mois entier donné au bailleur par lettre recommandée avec accusé de réception.</p>
  <p><strong>Obligations du preneur</strong><br>Le présent contrat est fait aux conditions ordinaires et de droit en pareille matière. Le preneur s'engage à se conformer exactement et ponctuellement aux obligations qui lui incombent, tant en vertu de la loi et notamment de l'article 1728 du Code civil, qu'en vertu des obligations suivantes concernant le bon ordre et la tenue de l'immeuble : le preneur ne pourra en aucun cas sous-louer son immeuble.</p>
  <p><strong>Clause résolutoire</strong><br>À défaut de paiement à son échéance d'un seul terme de loyer comme en cas d'inexécution d'une quelconque des obligations mises à la charge du preneur tant par la présente convention que par la loi et un mois après un commandement ou une sommation demeuré sans effet, la présente location sera résiliée de plein droit sans qu'il y ait à remplir aucune formalité judiciaire. L'expulsion du preneur pourra être prononcée par ordonnance de Monsieur le Juge des référés, non susceptible d'appel.</p>
  <p>Fait à SAINT-BRIEUC, le 12 septembre N</p>
  <p class="c-sign"><span>Le Bailleur,<br>Lu et approuvé</span><span>Le Preneur,<br>Lu et approuvé</span></p>`,
  grille: {
    denomination: "Contrat de <strong>location (bail) à durée déterminée</strong> d'un appartement (avec mobilier) pour l'année universitaire : M. Lesage met un logement à disposition de Mlle Prévert pendant 9 mois contre un loyer mensuel de 500 € charges comprises.",
    conclusion: "À Saint-Brieuc, le 12 septembre N. Prise d'effet le 1er octobre N, fin le 30 juin N+1.",
    forme: "Écrit <strong>sous signature privée</strong> (sous seing privé) : signé par les parties avec la mention « lu et approuvé », sans officier public. L'état des lieux est dressé par acte séparé contradictoire.",
    parties: "<strong>Bailleur</strong> : M. Jean-Pierre Lesage, 22 rue de Goëdic, Saint-Brieuc.<br><strong>Preneur (locataire)</strong> : Mlle Odile Prévert (adresse non indiquée).",
    capacite: "Deux personnes physiques présumées <strong>majeures et capables</strong> (aucune mesure de protection mentionnée). Si l'étudiante était mineure non émancipée, son représentant légal devrait intervenir.",
    consentement: "Consentement libre et éclairé, matérialisé par la signature et la mention « lu et approuvé ».<br>Vices possibles : <strong>erreur</strong> sur les qualités substantielles du logement (surface, équipements, état) ; <strong>dol</strong> si le bailleur cache un défaut déterminant (humidité, nuisances) ; <strong>violence</strong> si la signature est obtenue sous pression.",
    objet: "Bailleur : mettre à disposition l'appartement du 12 rue Théodule Ribot et son mobilier. Preneur : payer 500 € par mois (chauffage, électricité, gaz, entretien compris). Objet existant, déterminé, dans le commerce et licite.",
    cause: "Preneur : se loger pendant ses études. Bailleur : percevoir un loyer. Cause <strong>licite et morale</strong>.",
    obligations: "<strong>Bailleur</strong> : délivrer le logement en bon état, l'entretenir, assurer au preneur une <strong>jouissance paisible</strong>.<br><strong>Preneur</strong> : <strong>payer le loyer</strong> aux échéances convenues ; <strong>user du bien raisonnablement</strong> selon sa destination (art. 1728 C. civ.) ; rendre les lieux en fin de bail.",
    clauses: "<ul><li><strong>Durée déterminée</strong> de 9 mois sans droit au maintien dans les lieux.</li><li><strong>Terme de paiement</strong> : dans les 5 premiers jours du mois.</li><li><strong>Faculté de résiliation anticipée réservée au preneur</strong>, préavis d'un mois par LRAR.</li><li><strong>Interdiction de sous-louer</strong> (le contrat est lié à la personne du preneur).</li><li><strong>Clause résolutoire</strong> : un loyer impayé ou une obligation inexécutée, un mois après commandement resté sans effet ⇒ fin de plein droit, sans formalité judiciaire, expulsion en référé.</li><li><strong>État des lieux</strong> contradictoire.</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "adhesion", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: "successive", reglementation: "nomme" },
  justif: {
    formation: "L'accord des volontés suffit ; l'écrit sert de preuve (corrigé du prof : « l'accord de volonté suffit »).",
    negociation: "Clauses rédigées par le bailleur et non librement débattues (corrigé du prof). On peut défendre le gré à gré si on montre une négociation, mais rien ne l'indique.",
    obligations: "Obligations réciproques : mise à disposition contre loyer.",
    contrepartie: "Chaque partie y trouve son intérêt : logement contre loyer.",
    alea: "Le contenu des obligations est connu dès la signature (loyer fixe, durée fixe).",
    execution: "L'exécution s'échelonne dans le temps (9 mois, loyer mensuel).",
    reglementation: "Le bail (louage de choses) est réglementé par le Code civil (art. 1709 s.)."
  },
  critique: "<p>La clause s'intitule « résolutoire » mais, pour un contrat à exécution successive, elle entraîne une <strong>résiliation</strong> (fin pour l'avenir, les loyers payés ne sont pas restitués) : le texte dit d'ailleurs « résiliée ».</p><p>La mention « ordonnance non susceptible d'appel » est sans effet : un contrat ne peut pas supprimer une voie de recours prévue par la loi.</p>"
},

// ------------------------------------------------------------
{
  id: "pret",
  titre: "Prêt d'argent entre particuliers",
  source: "TD n°1 · Exercice 3 (grille vide dans le poly)",
  type: "Civil",
  niveau: 1,
  texte: `
  <p>Ce jour, Monsieur HÉRIOUX Paul demeurant 36 avenue Pasteur 40100 DAX</p>
  <p>Prête à Madame VATEL Annie demeurant 52 rue des Platanes 84100 ORANGE, la somme de 3 000 € (Trois mille euros).</p>
  <p>Le présent contrat est conclu pour une durée d'un an et sera donc remboursable, en capital et intérêts le 7 avril N+1.</p>
  <p>Les parties sont convenues d'un taux d'intérêt de 10 % par an (Dix pour cent par an).</p>
  <p>Fait à DAX le 7 avril N</p>
  <p class="c-sign"><span>Signature du prêteur</span><span>Signature de l'emprunteur</span></p>`,
  grille: {
    denomination: "<strong>Contrat de prêt d'argent</strong> (prêt de consommation) entre particuliers, <strong>à intérêt</strong> : M. Hérioux remet 3 000 € à Mme Vatel, qui doit les rembourser avec 10 % d'intérêts dans un an.",
    conclusion: "À Dax, le 7 avril N ; échéance le 7 avril N+1.",
    forme: "Écrit <strong>sous signature privée</strong> signé par les deux parties. La somme figure en chiffres et en lettres.",
    parties: "<strong>Prêteur</strong> : M. Paul Hérioux, 36 avenue Pasteur, 40100 Dax.<br><strong>Emprunteur</strong> : Mme Annie Vatel, 52 rue des Platanes, 84100 Orange.",
    capacite: "Deux personnes physiques présumées <strong>majeures et capables</strong>.",
    consentement: "Consentement libre et éclairé, matérialisé par les signatures.<br>Vices possibles : <strong>erreur</strong> (sur le montant, le taux), <strong>dol</strong> (l'emprunteuse ment sur sa solvabilité, comme dans l'arrêt du 27 juin 2018 ; le prêteur dissimule une condition), <strong>violence</strong> (prêt accepté sous pression ou par dépendance financière).",
    objet: "Prêteur : remettre 3 000 € à Mme Vatel. Emprunteur : rembourser le capital et payer les intérêts (300 €), soit 3 300 € le 7 avril N+1. Objet déterminé et licite.",
    cause: "Emprunteur : disposer de fonds. Prêteur : percevoir des intérêts. Cause <strong>licite et morale</strong>.",
    obligations: "<strong>Prêteur</strong> : remettre les fonds (c'est ce qui forme le contrat).<br><strong>Emprunteur</strong> : <strong>restituer</strong> la même somme à l'échéance et payer les <strong>intérêts</strong> convenus.",
    clauses: "<ul><li><strong>Durée d'un an</strong> et <strong>échéance unique</strong> fixée au 7 avril N+1 (remboursement en une fois du capital et des intérêts).</li><li><strong>Clause d'intérêt conventionnel</strong> de 10 % par an, fixé par écrit.</li><li>Rien n'est prévu pour le retard de paiement, le remboursement anticipé ou une garantie (caution) : on peut le signaler.</li></ul>"
  },
  nature: { formation: "reel", negociation: "gre", obligations: "unilateral", contrepartie: "onereux", alea: "commutatif", execution: ["instantanee", "successive"], reglementation: "nomme" },
  justif: {
    formation: "Le prêt consenti par un particulier est un contrat réel : il n'est formé que par la remise des fonds (Document n°7 : « contrat de prêt » en contrat réel ; seul le prêt d'un établissement de crédit est consensuel).",
    negociation: "Contrat entre deux particuliers : le montant, la durée et le taux ont été « convenus » entre eux.",
    obligations: "Une fois les fonds remis, seule l'emprunteuse reste obligée (rembourser et payer les intérêts).",
    contrepartie: "Prêt à intérêt : le prêteur reçoit 10 % en contrepartie. (Un contrat unilatéral peut être à titre onéreux.)",
    alea: "Montant, taux et échéance connus dès la conclusion.",
    execution: "Réponse attendue : <strong>instantanée</strong>, le remboursement se fait en une prestation unique à l'échéance. On peut défendre « successive » en insistant sur les intérêts qui courent pendant un an : l'essentiel est de justifier.",
    reglementation: "Le prêt de consommation est réglementé par le Code civil (art. 1892 s.)."
  },
  critique: "<p>Le poly indiquait « vice possible : vol » : le vol n'est pas un vice du consentement. Les vices sont l'erreur, le dol et la violence.</p><div class='callout complement'><span class='label'>Complément</span>Pour un engagement unilatéral de payer une somme d'argent, l'écrit fait preuve s'il porte la signature du débiteur et la somme <strong>en chiffres et en lettres</strong>, mention écrite par le débiteur lui-même (art. 1376 C. civ.) : la somme figure bien sous les deux formes, encore faut-il que Mme Vatel l'ait écrite de sa main. Le taux d'intérêt conventionnel doit être fixé <strong>par écrit</strong> (art. 1907) et ne pas dépasser le taux d'usure.</div>"
},

// ------------------------------------------------------------
{
  id: "site",
  titre: "Conception du site du restaurant L'Olivier",
  source: "TD n°1 · Exercice 4 (corrigé du prof corrigé et complété)",
  type: "Informatique",
  niveau: 3,
  texte: `
  <p class="c-title">Contrat de conception d'un site Internet</p>
  <p class="c-right">Avignon, le 5 janvier N</p>
  <p>Entre les soussignés :<br>Le restaurant « L'Olivier » dont le siège social est à Avignon, 15 rue de la République, représenté par M. FONVIEILLE, gérant, dénommé « le client »<br>et<br>S.I.G.R dont le siège social est à Marseille, 30 rue du Paradis, représentée par M. SÉGUR, directeur, dénommé « le concepteur »</p>
  <p>Il a été convenu ce qui suit :</p>
  <p><b>Article 1</b> — « Internet » désigne le réseau de plusieurs serveurs reliés entre eux et dont la localisation se situe en divers lieux à travers le monde. La « page Internet » désigne un programme informatique réalisé pour le compte du client en langage compréhensible par les principaux logiciels de navigation […]. Le « site Internet » désigne l'ensemble des pages Internet créées par le concepteur pour le compte du client et répondant à l'URL http://www.restaurant-lolivier.com.</p>
  <p><b>Article 2</b> — Le client confie, en exclusivité, et dans les conditions définies ci-après, au concepteur qui accepte, la mission de concevoir, réaliser un site Internet accessible sur le réseau Internet à l'URL suivante : http://www.restaurant-lolivier.com.</p>
  <p><b>Article 3</b> — 3.1 Le concepteur s'engage à concevoir et réaliser le site Internet, objet du présent contrat, conformément aux souhaits et demandes émis par le client. 3.2 Le concepteur s'engage à réaliser les différents graphiques à incorporer dans le site Internet. 3.3 Aux effets visés aux articles 3.1 et 3.2 ci-dessus, le concepteur devra soumettre au client, pour visa préalable et exprès, chacune des pages Internet qui sera constitutive du site Internet. 3.4 Le concepteur fournira au client, au plus tard le 1er mars N sur un support de stockage, une copie des différentes pages Internet créées pour le compte du client sous forme de fichiers HTML, et une copie des fichiers graphiques.</p>
  <p><b>Article 4</b> — 4.1 Le client est propriétaire des pages HTML ou autres documents et programmes figurant sur le site Internet développés par le concepteur pour elles, à partir du jour où le client a apposé son visa, sous réserve que les sommes dues pour la réalisation des travaux soient payées dans les conditions fixées à l'article 6 des présentes. 4.2 Le client déclare et garantit qu'il est titulaire de tous les droits reconnus pour l'utilisation, dans le cadre du site Internet, des marques et logos à afficher sur les pages Internet. 4.3 Le concepteur s'interdit de recopier les informations de toute nature qui lui sont confiées par le client en dehors de sa prestation normale de conception et d'évolution des pages Internet. Le concepteur s'interdit également de reproduire, d'adapter, de traduire, sous quelque forme que ce soit, lesdits contenus dans un but autre que celui visé par le présent contrat.</p>
  <p><b>Article 5</b> — 5.1 À la date du visa du client sur chacune des pages Internet, le concepteur cède au client, de manière exclusive et permanente, le droit d'exploitation sous forme numérique sur le réseau Internet, sur cédérom, sur tout support de stockage de masse magnétique ou optique, ou sous forme analogique sur tout support papier ou cartonné, à des fins commerciales ou publicitaires et pour le monde entier : a) sur les textes rédigés par le concepteur […] ; b) sur chaque œuvre composite créée pour le compte du client […] ; c) sur les images ou graphiques créés par le concepteur […] ; d) sur les bases de données éventuellement créées par le concepteur pour l'exécution des présentes. Ce droit d'exploitation comprend les droits de représentation, de reproduction à titre onéreux ou gratuit, ainsi que les droits d'utilisation, d'adaptation, de modification, de traduction et de mise sur le marché à titre onéreux ou gratuit desdits éléments. 5.2 Le concepteur cède au client, de manière exclusive et permanente, sur tout support et pour le monde entier, le droit d'exploitation sur les programmes composés par le code source de chaque page Internet réalisée, ainsi que sur les programmes d'interfaçage de la page HTML avec les bases de données, et ce quel que soit le langage de programmation utilisé […].</p>
  <p><b>Article 6</b> — En contrepartie de la réalisation du site Internet objet des présentes et des diverses cessions de droits y afférent, le concepteur percevra une somme forfaitaire de 7 000 euros HT, payable avant le 31 mai N.</p>
  <p><b>Article 7</b> — Le client dégage toute responsabilité dans la création des différentes pages Internet […]. Ainsi, dans le cas où le client serait jugé responsable de contrefaçon d'une œuvre de l'esprit, par une quelconque juridiction […], le concepteur s'engage à dédommager le client du préjudice subi et à rembourser le client des amendes, dommages et intérêts, pénalités et frais raisonnables d'avocat que le client se sera vu infliger par la faute, volontaire ou non, du concepteur.</p>
  <p><b>Article 8</b> — 8.1 Sauf en cas de résiliation anticipée, le présent contrat prendra fin le 31 août N. 8.2 Toute autre prestation non prévue par le présent contrat et réalisée par le concepteur pour le compte du client fera l'objet d'un contrat distinct. 8.3 En cas de non-respect par l'une ou l'autre des parties de l'une de ses obligations nées du présent contrat, celui-ci sera résilié de plein droit 15 jours après l'envoi d'une mise en demeure adressée par lettre recommandée avec accusé de réception restée sans effet, sans préjudice des dommages/intérêts qui pourraient être dus […]. 8.4 En cas de rupture du présent contrat pour quelque cause que ce soit, le concepteur s'engage à détruire, immédiatement après les avoir cédés au client, tous les documents (textes, graphiques, images, sons, vidéos…) et bases de données originaux en sa possession ainsi que les copies de sauvegarde du site Internet qu'il pourrait posséder.</p>
  <p><b>Article 9</b> — Le concepteur ne pourra transférer ou céder tout ou partie de ses droits ou obligations dans la présente convention ou substituer un tiers dans l'exécution de ses obligations sans le consentement exprès et préalable du client, résultant de la rédaction d'un avenant aux présentes.</p>
  <p><b>Article 10</b> — Le client et le concepteur assurent le caractère confidentiel des termes de ce contrat et de toute information, quelle qu'en soit la nature, obtenue dans le cadre de son application. Les parties s'engagent […] à respecter le secret professionnel et à considérer comme strictement confidentiels tous les renseignements fournis […] pendant la durée du présent contrat et pendant une durée de 3 ans à compter de son expiration.</p>
  <p><b>Article 11</b> — Le tribunal de grande instance d'Avignon sera compétent pour tout litige survenant dans l'interprétation, l'exécution ou la réalisation de l'une quelconque des dispositions du présent contrat.</p>
  <p><b>Article 12</b> — Si une ou plusieurs stipulations du présent contrat sont tenues pour non valides ou déclarées comme telles par une juridiction compétente, les autres stipulations garderont toute leur force et leur portée.</p>
  <p><b>Article 13</b> — Les parties font élection de domicile en leurs sièges sociaux respectifs.</p>
  <p class="c-src">D'après la revue « L'Hôtellerie » n° 2619 – Spécial Internet</p>`,
  grille: {
    denomination: "<strong>Contrat de conception et de réalisation d'un site Internet</strong> (contrat d'entreprise) <strong>avec cession des droits d'exploitation</strong> : SIGR conçoit le site du restaurant et lui cède les droits sur les pages, graphiques, textes, bases et code source, contre 7 000 € HT.",
    conclusion: "À Avignon, le 5 janvier N. Livraison au plus tard le 1er mars N, paiement avant le 31 mai N, fin du contrat le 31 août N.",
    forme: "Écrit <strong>sous signature privée</strong> entre deux sociétés. L'écrit est utile pour la preuve et pour la cession de droits d'auteur, dont chaque droit cédé doit être mentionné distinctement (art. L131-3 CPI).",
    parties: "<strong>Client</strong> : le restaurant « L'Olivier », siège 15 rue de la République à Avignon, représenté par M. Fonvieille, gérant.<br><strong>Concepteur (prestataire)</strong> : la société SIGR, siège 30 rue du Paradis à Marseille, représentée par M. Ségur, directeur.",
    capacite: "Deux <strong>personnes morales</strong> (sociétés commerciales), capacité limitée à leur objet social, qui agissent par leurs <strong>représentants légaux</strong> (gérant, directeur), lesquels doivent avoir le pouvoir de les engager. On n'écrit pas « majeur ».",
    consentement: "Consentement libre et éclairé, donné par les représentants. Vices possibles : <strong>erreur</strong> sur les compétences du concepteur ou sur les qualités du site ; <strong>dol</strong> si SIGR ment sur ses références ou cache qu'elle sous-traite ; <strong>violence</strong> économique (dépendance) peu probable ici.",
    objet: "Concepteur : concevoir et réaliser le site et ses graphiques conformément aux souhaits du client, livrer les fichiers, céder les droits d'exploitation. Client : payer 7 000 € HT. Objet déterminé, possible et licite.",
    cause: "Client : disposer d'un site pour promouvoir son restaurant et en être propriétaire. Concepteur : percevoir le prix. Cause <strong>licite et morale</strong>.",
    obligations: "<strong>Concepteur</strong> : réaliser l'ouvrage conformément aux besoins exprimés (obligation de moyens du contrat d'entreprise), avec une <strong>obligation de conseil</strong> (adapter, mettre en garde), livrer dans les délais.<br><strong>Client</strong> : <strong>payer le prix</strong>, collaborer (fournir les contenus, valider les pages).",
    clauses: "<ul><li>Art. 1 : <strong>clause de définitions</strong>.</li><li>Art. 2 : <strong>clause d'exclusivité</strong>.</li><li>Art. 3.3 : <strong>visa préalable et exprès</strong> de chaque page ; 3.4 : <strong>délai de livraison</strong> au 1er mars N.</li><li>Art. 4.1 : <strong>clause de réserve de propriété</strong> : propriété au client au visa, sous réserve du paiement.</li><li>Art. 4.2 : <strong>garantie</strong> du client sur ses marques et logos.</li><li>Art. 4.3 : <strong>interdiction de réutiliser</strong> les informations du client.</li><li>Art. 5 : <strong>cession exclusive et permanente des droits d'exploitation</strong> (textes, œuvres composites, graphiques, bases de données, code source), monde entier.</li><li>Art. 6 : <strong>prix forfaitaire</strong> 7 000 € HT avant le 31 mai N.</li><li>Art. 7 : <strong>clause de garantie contre la contrefaçon</strong> à la charge du concepteur.</li><li>Art. 8 : <strong>terme</strong> (31 août N), <strong>clause résolutoire</strong> (résiliation de plein droit 15 jours après mise en demeure), <strong>destruction des documents</strong> en cas de rupture.</li><li>Art. 9 : <strong>incessibilité / intuitu personae</strong> (pas de sous-traitance sans avenant).</li><li>Art. 10 : <strong>confidentialité</strong> pendant le contrat et 3 ans après.</li><li>Art. 11 : <strong>clause attributive de juridiction</strong> (TGI d'Avignon), valable entre commerçants.</li><li>Art. 12 : <strong>clause de divisibilité</strong>.</li><li>Art. 13 : <strong>élection de domicile</strong>.</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "gre", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: ["successive", "instantanee"], reglementation: "nomme" },
  justif: {
    formation: "Formé par l'accord des deux sociétés ; l'écrit sert de preuve (et à détailler la cession de droits).",
    negociation: "Contrat entre professionnels, adapté au client (souhaits du client, visa page par page, contrat rédigé pour ce projet).",
    obligations: "Obligations réciproques : réaliser le site et céder les droits / payer le prix et valider.",
    contrepartie: "Prix de 7 000 € HT contre le site et les droits.",
    alea: "Prix forfaitaire et prestation définis dès la conclusion.",
    execution: "Le mieux est <strong>successive</strong> : conception page par page avec visas, livraison, paiement différé, contrat jusqu'au 31 août. « Instantanée » se défend si on considère la livraison d'un ouvrage unique.",
    reglementation: "Contrat d'entreprise (louage d'ouvrage, art. 1710 et 1779 C. civ.) combiné à une cession de droits d'auteur (CPI)."
  },
  critique: "<p>Le corrigé du poly listait une « clause de résultat » : c'est une notion de droit du travail (objectifs du salarié), elle n'a pas sa place ici. Il écrivait aussi « majeur » pour la capacité : ce sont des personnes morales.</p><p>Point fort à citer : grâce à l'art. 5, le client obtient bien les droits patrimoniaux. Sans cette clause, SIGR, prestataire indépendant, serait restée titulaire des droits (L113-9 CPI ne joue que pour les salariés).</p>"
},

// ------------------------------------------------------------
{
  id: "licence",
  titre: "Licence d'utilisation « Initiation à la logistique »",
  source: "TD n°1 · Exercice 5 (grille vide dans le poly)",
  type: "Informatique",
  niveau: 2,
  texte: `
  <p class="c-title">Contrat de licence d'utilisation de « Initiation à la logistique »</p>
  <p>Les clauses et conditions d'utilisation du produit « Initiation à la logistique » ci-après précisées constituent un engagement conclu entre vous-même en qualité d'utilisateur final et le Groupe ESIDEC.</p>
  <p class="c-caps">ATTENTION : EN OUVRANT L'EMBALLAGE SCELLÉ DU CD-ROM, VOUS VOUS ENGAGEZ À RESPECTER LES TERMES, CLAUSES ET CONDITIONS DES PRÉSENTES. SI VOUS ÊTES EN DÉSACCORD AVEC LES CLAUSES ET CONDITIONS, VEUILLEZ RETOURNER IMMÉDIATEMENT LE CD-ROM, AINSI QUE LES PRODUITS ET MATÉRIELS L'ACCOMPAGNANT, À L'ENDROIT OÙ VOUS LES AVEZ ACHETÉS POUR EN OBTENIR LE REMBOURSEMENT.</p>
  <p><b>1. CONCESSION DE LICENCE</b> — Le présent contrat de licence Groupe ESIDEC (ci-après la « Licence ») vous permet d'utiliser une copie du CD-ROM « Initiation à la logistique » acheté avec cette licence (ci-après le « Logiciel ») sur tout ordinateur, à condition que le LOGICIEL ne soit en service que sur un ordinateur au plus en toute occasion. Le LOGICIEL est dit « en service » sur un ordinateur lorsqu'il est installé soit de manière temporaire dans la mémoire (par exemple dans la mémoire vive : RAM), soit dans la mémoire permanente (disque dur, CD-ROM ou tout autre support de mémorisation) de l'ordinateur. Si le nombre prévu d'utilisateurs dépasse celui des licences applicables, vous devez mettre en œuvre un mécanisme ou une procédure nécessaire afin de vous assurer que le nombre de personnes utilisant le LOGICIEL au même moment n'excède pas le nombre de licences.</p>
  <p><b>2. PROPRIÉTÉ DU LOGICIEL</b> — Ce LOGICIEL est la propriété du Groupe ESIDEC. Le CLIENT a simplement acquis le droit de l'utiliser.</p>
  <p><b>3. COPIE DE SAUVEGARDE</b> — Le CLIENT est autorisé à effectuer une seule copie de sauvegarde du CD-ROM contenant le LOGICIEL.</p>
  <p><b>4. DROITS D'AUTEUR</b> — Le LOGICIEL appartient au Groupe ESIDEC ou à ses fournisseurs et est protégé par les réglementations en matière de droits d'auteur applicables en France, les dispositions des traités internationaux, ainsi que toutes les autres législations nationales applicables. Par conséquent, vous devez traiter le LOGICIEL comme n'importe quel autre produit ou donnée protégé par les droits d'auteur. Toutefois, au cas où le LOGICIEL ne serait pas protégé contre la copie, vous pouvez faire une copie du LOGICIEL uniquement pour des besoins de sauvegarde ou d'archivage.</p>
  <p><b>5. AUTRES RESTRICTIONS</b> — Vous ne pouvez prêter ou donner en crédit-bail le LOGICIEL, mais vous pouvez céder les droits que vous possédez en vertu du contrat de licence Groupe ESIDEC sous réserve que cette cession soit définitive et à condition de céder toutes copies du LOGICIEL, toutes documentations, et que l'acquéreur s'engage expressément à respecter les clauses et conditions des présentes.</p>
  <p><b>6. ABSENCE DE RESPONSABILITÉ</b> — Le LOGICIEL et la documentation qui l'accompagne sont vendus en l'état, SANS AUCUNE GARANTIE D'AUCUNE SORTE. Le Groupe ESIDEC ne saurait être tenu responsable pour tout dommage de quelque nature que ce soit et en particulier en cas de perte ou détérioration des données, en cas de divergences des informations contenues dans la documentation avec le comportement du LOGICIEL, en cas de comportement du LOGICIEL différent de celui escompté.</p>
  <p>Ce contrat de licence est régi par la loi française ; tout litige qui pourrait en résulter sera de la compétence exclusive des tribunaux du siège social du Groupe ESIDEC.</p>
  <p class="c-src">Groupe ESIDEC – Département multimédia, 3 place Édouard Branly – 57070 Metz</p>`,
  grille: {
    denomination: "<strong>Contrat de licence d'utilisation de logiciel</strong> (droit d'usage, sans transfert de propriété) dit « licence sous emballage » : ESIDEC concède à l'acheteur le droit d'utiliser le CD-ROM sur un seul ordinateur à la fois.",
    conclusion: "Ni date ni lieu : le contrat est conclu au moment de l'achat et de l'<strong>ouverture de l'emballage scellé</strong>, au lieu d'achat (ou du domicile de l'utilisateur).",
    forme: "Conditions <strong>pré-imprimées non signées</strong>, acceptées <strong>tacitement</strong> par un acte matériel (ouverture de l'emballage). Pas d'écrit signé.",
    parties: "<strong>Concédant (donneur de licence)</strong> : Groupe ESIDEC, département multimédia, 3 place Édouard Branly, 57070 Metz.<br><strong>Licencié (utilisateur final, client)</strong> : l'acheteur du CD-ROM, non nommé, souvent un consommateur.",
    capacite: "ESIDEC : <strong>personne morale</strong> agissant dans son objet. L'utilisateur doit être <strong>majeur capable</strong> ; un mineur peut accomplir seul un acte courant de faible montant (achat d'un logiciel éducatif).",
    consentement: "Consentement exprimé par un comportement (ouverture de l'emballage). Il n'est éclairé que si les conditions sont lisibles <strong>avant</strong> l'ouverture ; la possibilité de retour et de remboursement protège l'acheteur.<br>Vices possibles : <strong>erreur</strong> sur les qualités du logiciel (contenu, compatibilité) ; <strong>dol</strong> si l'emballage trompe sur le contenu ; violence improbable.",
    objet: "ESIDEC : concéder le droit d'utiliser une copie du logiciel. Utilisateur : payer le prix (au vendeur) et respecter les conditions d'utilisation. Objet déterminé et licite.",
    cause: "Utilisateur : se former à la logistique. ESIDEC : rentabiliser son logiciel. Cause <strong>licite et morale</strong>.",
    obligations: "<strong>Concédant</strong> : fournir un logiciel conforme et assurer la <strong>jouissance paisible</strong> du droit d'usage (garantir qu'il a les droits).<br><strong>Licencié</strong> : <strong>payer</strong> ; <strong>utiliser</strong> le logiciel dans les limites de la licence ; respecter les droits d'auteur.",
    clauses: "<ul><li><strong>Acceptation par ouverture de l'emballage</strong> + faculté de retour et remboursement.</li><li>Art. 1 : <strong>licence mono-poste</strong> (un ordinateur à la fois).</li><li>Art. 2 et 4 : <strong>clause de propriété</strong> (ESIDEC reste propriétaire, seul un droit d'usage est concédé) et rappel des <strong>droits d'auteur</strong>.</li><li>Art. 3 : <strong>une copie de sauvegarde</strong> autorisée.</li><li>Art. 5 : <strong>interdiction de prêt et de crédit-bail</strong> ; cession possible si définitive et totale.</li><li>Art. 6 : <strong>clause exonératoire de responsabilité</strong> (« en l'état, sans garantie »).</li><li><strong>Clause de droit applicable</strong> (loi française) et <strong>clause attributive de juridiction</strong> (tribunaux du siège d'ESIDEC).</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "adhesion", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: "successive", reglementation: "innomme" },
  justif: {
    formation: "Formé par l'acceptation tacite (ouverture de l'emballage), sans forme imposée.",
    negociation: "Conditions générales imposées par ESIDEC : l'utilisateur accepte en bloc ou rend le produit.",
    obligations: "Droit d'usage concédé contre paiement et respect des conditions : obligations réciproques.",
    contrepartie: "Le droit d'utiliser le logiciel est acquis contre un prix.",
    alea: "Étendue du droit d'usage connue dès l'achat.",
    execution: "Le droit d'usage s'exerce dans la durée, comme un bail (le cours classe la licence avec le contrat de bail ou d'exploitation).",
    reglementation: "La licence de logiciel n'a pas de régime propre dans le Code civil (on l'assimile au louage) : innommée. « Nommé » se défend si on la rattache au bail."
  },
  critique: "<ul><li><strong>Art. 3</strong> : la copie de sauvegarde est un droit « consacré » de l'utilisateur légitime (L122-6-1 CPI) : la clause est conforme.</li><li><strong>Art. 6</strong> : face à un consommateur, exclure toute responsabilité et toute garantie est une <strong>clause abusive</strong>, réputée non écrite ; les garanties légales (conformité, vices cachés) restent dues.</li><li><strong>Clause attributive de juridiction</strong> : valable seulement entre commerçants (art. 48 CPC) ; inopposable à un particulier.</li><li><strong>Consentement</strong> : discutable si le texte n'est lisible qu'après l'achat.</li></ul>"
},

// ------------------------------------------------------------
{
  id: "travail",
  titre: "CDI d'assistante chez PERI-LOGIC SERVICES",
  source: "TD n°2 · Exercice 1 (pas de corrigé dans le poly)",
  type: "Travail",
  niveau: 3,
  texte: `
  <p>S.A.R.L. PERI-LOGIC SERVICES<br>Allée des Pommiers 77220 FAVIÈRES</p>
  <p class="c-right">Mademoiselle Véronique<br>Promenade des Golfeurs<br>77400 BUSSY-SAINT-GEORGES</p>
  <p>Mademoiselle,</p>
  <p>Après votre contrat à durée déterminée de six mois que vous avez effectué dans notre service commercial, et qui fut concluant, veuillez trouver ci-après votre contrat de travail à durée indéterminée régi par le règlement intérieur de la Société et par la Convention collective de la métallurgie de la région parisienne.</p>
  <p>Vous êtes engagée à effet du 2 janvier N en qualité d'Assistante, coefficient 200 au Service commercial. Cette date du 2 janvier N marque le début de votre ancienneté pour les avantages sociaux, comme la prime d'ancienneté par exemple, et les différents droits.</p>
  <p>Votre période d'essai est fixée d'un commun accord à 3 mois, renouvelable une fois. Pendant cette période, chacune des deux parties pourra résilier le contrat sans préavis et sans motif.</p>
  <p>Vos appointements mensuels forfaitaires et garantis, payables douze fois dans l'année, sont fixés à 1 600 € pour le temps nécessaire à l'exercice de vos fonctions. Ils couvrent les éventuelles heures supplémentaires excédant 35 heures.</p>
  <p>Comme nous en sommes convenus, vous bénéficierez d'un Bonus indexé sur vos ventes de périphériques et de logiciels distribués par la Société.</p>
  <p>Il résulte des conditions d'emploi dans notre Société, que toute absence non autorisée, retour tardif de congés ou retards répétés, seraient considérés comme une faute lourde entraînant la rupture de votre contrat sans indemnité.</p>
  <p>Vous vous engagez à une totale discrétion vis-à-vis des entreprises fournisseurs ou clientes de notre Société, tant pendant l'exécution de votre contrat qu'à l'issue de celui-ci.</p>
  <p>Par ailleurs, à l'issue de votre contrat, quelle qu'en soit la partie qui en a pris l'initiative, vous vous engagez à ne pas travailler en Europe, dans l'informatique ou dans une des sociétés fournisseur ou cliente de la nôtre, pendant une période limitée à trois ans, ni à faire directement ou indirectement concurrence à notre Société.</p>
  <p>Vos fonctions impliquent des déplacements continus ou non tout au long de l'année. Vos frais seront remboursés sur justificatifs dans les limites et selon les conditions en vigueur dans la Société.</p>
  <p>Fait à Favières, le 2 janvier N</p>`,
  grille: {
    denomination: "<strong>Contrat de travail à durée indéterminée</strong> à temps complet (lettre d'engagement) : Mlle Véronique est engagée comme assistante commerciale, contre un salaire forfaitaire de 1 600 € par mois et un bonus sur ventes, à la suite d'un CDD de 6 mois.",
    conclusion: "À Favières, le 2 janvier N (prise d'effet le même jour).",
    forme: "<strong>Lettre d'engagement</strong> écrite (écrit sous signature privée). Un CDI à temps complet pourrait être oral, l'écrit sert de preuve. Il manque la signature des parties (et le nom de famille de la salariée).",
    parties: "<strong>Employeur</strong> : SARL PERI-LOGIC SERVICES, allée des Pommiers, 77220 Favières (représentant non nommé).<br><strong>Salariée</strong> : Mlle Véronique (nom de famille absent), Promenade des Golfeurs, 77400 Bussy-Saint-Georges.",
    capacite: "Employeur : <strong>personne morale</strong> (SARL), qui agit par son gérant. Salariée : <strong>personne physique majeure capable</strong> (elle a déjà travaillé 6 mois en CDD).",
    consentement: "Consentement libre et éclairé, à matérialiser par la signature (absente).<br>Vices possibles : <strong>erreur</strong> sur le poste ou la rémunération réelle ; <strong>dol</strong> de l'employeur (promesses sur le bonus) ou de la salariée (faux diplômes) ; <strong>violence</strong> morale (pression pour accepter des clauses défavorables à la fin du CDD).",
    objet: "Salariée : fournir son travail d'assistante au service commercial. Employeur : verser 1 600 € mensuels + bonus et fournir le travail. Objet licite.",
    cause: "Le salaire est la contrepartie du travail et inversement. Cause <strong>licite</strong>.",
    obligations: "<strong>Employeur</strong> : fournir un travail conforme, <strong>verser le salaire</strong>, respecter le droit du travail et la convention collective (durée du travail, sécurité, non-discrimination), payer les cotisations.<br><strong>Salariée</strong> : exécuter le travail <strong>personnellement, consciencieusement et loyalement</strong>, respecter les ordres et le règlement intérieur, ne pas concurrencer l'employeur.",
    clauses: "<ul><li><strong>Référence</strong> au règlement intérieur et à la <strong>convention collective</strong> de la métallurgie.</li><li><strong>Reprise d'ancienneté</strong> au 2 janvier N.</li><li><strong>Période d'essai</strong> de 3 mois renouvelable une fois.</li><li><strong>Rémunération forfaitaire</strong> incluant les heures supplémentaires.</li><li><strong>Bonus</strong> indexé sur les ventes (rémunération variable / objectifs).</li><li><strong>Clause qualifiant à l'avance certaines fautes de « lourdes »</strong>.</li><li><strong>Clause de discrétion</strong> (confidentialité) pendant et après le contrat.</li><li><strong>Clause de non-concurrence</strong> : 3 ans, toute l'Europe, toute l'informatique, sans contrepartie.</li><li><strong>Clause de déplacements</strong> avec remboursement des frais sur justificatifs.</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "adhesion", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: "successive", reglementation: "nomme" },
  justif: {
    formation: "Le CDI à temps complet n'est soumis à aucune forme (L1221-1) : l'accord suffit, la lettre sert de preuve et d'information.",
    negociation: "Les conditions sont fixées par l'employeur ; la salariée adhère (caractère d'adhésion du contrat de travail dans le cours).",
    obligations: "Travail contre salaire : obligations réciproques.",
    contrepartie: "Salaire contre travail.",
    alea: "Salaire fixe garanti (le bonus est variable mais accessoire).",
    execution: "Le contrat s'exécute dans la durée (CDI).",
    reglementation: "Le contrat de travail est réglementé par le Code du travail."
  },
  critique: "<ul><li><strong>Période d'essai</strong> : pour une employée, le maximum est de <strong>2 mois</strong> (3 mois pour techniciens et agents de maîtrise) : 3 mois est excessif. De plus, après un CDD de 6 mois sur le même poste, la durée du CDD se déduit de l'essai : l'employeur connaît déjà ses aptitudes.</li><li><strong>Faute lourde fixée d'avance</strong> : illicite. Seul le juge qualifie la faute ; la faute lourde suppose une <strong>intention de nuire</strong>, ce que ne sont pas des retards.</li><li><strong>Non-concurrence</strong> : <strong>nulle</strong> : ni limitée raisonnablement dans l'espace (toute l'Europe) et dans l'activité (toute l'informatique), ni adaptée à un poste d'assistante, ni assortie d'une <strong>contrepartie financière</strong>.</li><li><strong>Forfait</strong> : un forfait incluant les heures supplémentaires suppose un nombre d'heures convenu ; « le temps nécessaire » est trop flou. Le salaire doit rester au moins égal au SMIC.</li><li><strong>Déplacements</strong> : ce n'est pas une clause de mobilité valable (pas de zone géographique définie).</li><li><strong>Clauses obligatoires manquantes</strong> : signatures, lieu de travail précis, durée du travail exacte.</li></ul>"
},

// ------------------------------------------------------------
{
  id: "maintenance",
  titre: "Maintenance du parc informatique d'un cabinet comptable",
  source: "Contrat inédit",
  type: "Informatique",
  niveau: 2,
  texte: `
  <p class="c-title">Contrat de maintenance informatique</p>
  <p>Entre :<br>La société NETSOIN, SAS au capital de 20 000 €, dont le siège est 8 rue Gambetta, 51100 Reims, inscrite au RCS de Reims, représentée par Mme Claire ROUSSEL, présidente, ci-après « le Prestataire »,<br>Et :<br>Le cabinet MOREAU & ASSOCIÉS, SELARL d'expertise comptable, 14 boulevard de la Paix, 51100 Reims, représenté par M. Julien MOREAU, gérant, ci-après « le Client ».</p>
  <p><b>Article 1 – Objet.</b> Le Prestataire assure la maintenance des 12 postes de travail, du serveur de fichiers et de l'imprimante réseau du Client, dont la liste figure en annexe 1.</p>
  <p><b>Article 2 – Maintenance préventive.</b> Le Prestataire effectue une visite trimestrielle sur site : mises à jour du système et de l'antivirus, vérification des sauvegardes, nettoyage du matériel.</p>
  <p><b>Article 3 – Maintenance curative.</b> En cas de panne signalée par téléphone ou par le portail d'assistance, le Prestataire intervient à distance dans un délai de 4 heures ouvrées et, si nécessaire, sur site dans un délai de 8 heures ouvrées. Le Prestataire met en œuvre tous les moyens nécessaires au rétablissement du service.</p>
  <p><b>Article 4 – Matériel de secours.</b> Si la réparation d'un poste dépasse 24 heures, le Prestataire met gratuitement à disposition du Client un poste de remplacement aux caractéristiques équivalentes jusqu'à la réparation.</p>
  <p><b>Article 5 – Exclusions.</b> Ne sont pas couvertes les pannes résultant d'une intervention du Client ou d'un tiers sur le matériel, d'un sinistre (incendie, dégât des eaux) ou de l'installation de logiciels non autorisés par le Prestataire.</p>
  <p><b>Article 6 – Prix.</b> La redevance forfaitaire est de 180 € HT par mois, payable le 5 de chaque mois par prélèvement. Les pièces détachées sont facturées en sus, sur devis accepté. Tarif négocié selon l'annexe 2 (remise de 10 % accordée pour un engagement d'un an).</p>
  <p><b>Article 7 – Durée.</b> Le contrat prend effet le 1er février N pour un an. Il est ensuite renouvelé par tacite reconduction pour des périodes d'un an, sauf dénonciation par l'une des parties par lettre recommandée avec avis de réception au moins deux mois avant l'échéance.</p>
  <p><b>Article 8 – Données.</b> Dans le cadre de ses interventions, le Prestataire peut accéder aux fichiers des clients du cabinet. Il s'engage à n'agir que sur instruction du Client, à ne pas copier ces données, à garantir leur confidentialité et à signaler sans délai toute violation de données.</p>
  <p><b>Article 9 – Responsabilité.</b> La responsabilité du Prestataire, en cas de faute prouvée, est limitée au montant des redevances perçues au cours des douze derniers mois.</p>
  <p><b>Article 10 – Résiliation.</b> En cas de manquement grave de l'une des parties, non réparé dans les 30 jours d'une mise en demeure par lettre recommandée, l'autre partie pourra résilier le contrat de plein droit.</p>
  <p><b>Article 11 – Litiges.</b> Tout litige relève de la compétence du tribunal de commerce de Reims.</p>
  <p>Fait à Reims, en deux exemplaires, le 20 janvier N.</p>
  <p class="c-sign"><span>Pour NETSOIN<br>C. Roussel</span><span>Pour le cabinet Moreau & Associés<br>J. Moreau</span></p>`,
  grille: {
    denomination: "<strong>Contrat de maintenance informatique</strong> (prestation de services) : NETSOIN assure la maintenance préventive et curative du parc du cabinet contre une redevance mensuelle de 180 € HT, pour un an renouvelable.",
    conclusion: "À Reims, le 20 janvier N ; prise d'effet le 1er février N pour un an.",
    forme: "Écrit <strong>sous signature privée</strong>, en <strong>deux exemplaires</strong> (contrat synallagmatique : un par partie), avec annexes.",
    parties: "<strong>Prestataire (mainteneur)</strong> : NETSOIN SAS, 8 rue Gambetta à Reims, représentée par Mme Roussel, présidente.<br><strong>Client</strong> : cabinet Moreau & Associés, SELARL, 14 boulevard de la Paix à Reims, représenté par M. Moreau, gérant.",
    capacite: "Deux <strong>personnes morales</strong>, capacité limitée à leur objet, représentées par leurs dirigeants (présidente de SAS, gérant de SELARL) qui ont le pouvoir de les engager.",
    consentement: "Consentement libre et éclairé, signatures des représentants.<br>Vices possibles : <strong>erreur</strong> sur l'étendue de la prestation (le client croit les pièces incluses) ; <strong>dol</strong> si NETSOIN ment sur ses certifications ou délais réels ; <strong>violence</strong> économique peu probable.",
    objet: "Prestataire : maintenir en état de fonctionnement 12 postes, un serveur et une imprimante (préventif + curatif + matériel de secours). Client : payer 180 € HT / mois et les pièces sur devis. Objet déterminé (annexe 1) et licite.",
    cause: "Client : disposer d'un parc fiable pour son activité. Prestataire : percevoir une redevance régulière. Cause <strong>licite</strong>.",
    obligations: "<strong>Mainteneur</strong> : obligation <strong>préventive et curative</strong> ; <strong>obligation de moyens</strong> (« tous les moyens nécessaires ») ; obligation de conseil.<br><strong>Client</strong> : <strong>payer la redevance</strong>, signaler les pannes, laisser l'accès au matériel, ne pas intervenir lui-même.",
    clauses: "<ul><li>Art. 2-3 : <strong>délais d'intervention</strong> (4 h à distance, 8 h sur site).</li><li>Art. 4 : <strong>clause de secours</strong> (poste de remplacement au-delà de 24 h).</li><li>Art. 5 : <strong>clause d'exclusion</strong> de garantie (intervention du client, sinistre, logiciels non autorisés).</li><li>Art. 6 : <strong>prix forfaitaire</strong> + pièces sur devis ; remise pour engagement.</li><li>Art. 7 : <strong>durée d'un an</strong> et <strong>tacite reconduction</strong>, préavis de 2 mois.</li><li>Art. 8 : <strong>confidentialité et protection des données</strong> (le prestataire agit comme sous-traitant au sens du RGPD).</li><li>Art. 9 : <strong>clause limitative de responsabilité</strong> (plafond d'un an de redevances), valable entre professionnels si elle ne vide pas l'obligation essentielle.</li><li>Art. 10 : <strong>clause résolutoire</strong> (résiliation de plein droit après mise en demeure de 30 jours).</li><li>Art. 11 : <strong>clause attributive de juridiction</strong> (tribunal de commerce de Reims).</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "gre", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: "successive", reglementation: "nomme" },
  justif: {
    formation: "Formé par l'accord des deux sociétés ; l'écrit sert de preuve.",
    negociation: "Tarif négocié (annexe 2, remise accordée), contrat adapté au parc du client.",
    obligations: "Maintenance contre redevance : obligations réciproques.",
    contrepartie: "Redevance de 180 € HT contre le service.",
    alea: "Le service et la redevance sont fixés à l'avance ; le nombre de pannes varie, mais le prestataire s'engage sur un service défini et non sur une chance de gain ou de perte.",
    execution: "Prestations échelonnées (visites trimestrielles, redevance mensuelle, un an renouvelable).",
    reglementation: "Contrat d'entreprise (louage d'ouvrage et d'industrie, Code civil)."
  },
  critique: "<p>Bon exemple de contrat équilibré : à l'examen, dis aussi quand une clause est <strong>conforme</strong>. L'art. 3 confirme l'obligation de moyens du cours ; l'art. 4 est la clause de secours du cours ; l'art. 8 applique les principes de finalité et de sécurité.</p>"
},

// ------------------------------------------------------------
{
  id: "vente",
  titre: "Vente d'un PC portable d'occasion",
  source: "Contrat inédit",
  type: "Civil",
  niveau: 2,
  texte: `
  <p class="c-title">Attestation de vente d'un ordinateur portable d'occasion</p>
  <p>Je soussigné, Lucas MARTIN, 19 ans, demeurant 5 rue Chanzy, 51100 Reims, vendeur,</p>
  <p>déclare vendre à Inès DUBOIS, 17 ans, lycéenne, demeurant 22 avenue de Champagne, 51200 Épernay, acheteuse,</p>
  <p>un ordinateur portable de jeu de marque Astra, modèle G15, numéro de série AG15-77K3012, avec son chargeur et sa housse.</p>
  <p>Annonce en ligne d'origine : « PC gamer comme neuf, batterie neuve changée le mois dernier, 700 € ». Après discussion, le prix est fixé à 650 € (six cent cinquante euros), payé ce jour en espèces. L'ordinateur est remis ce jour à l'acheteuse.</p>
  <p>L'ordinateur est vendu en l'état, sans garantie. L'acheteuse déclare l'avoir essayé et ne pourra exercer aucun recours contre le vendeur.</p>
  <p>Fait à Reims, le 14 septembre N, en deux exemplaires.</p>
  <p class="c-sign"><span>Le vendeur<br>L. Martin</span><span>L'acheteuse<br>I. Dubois</span></p>
  <p class="c-note">Information complémentaire : la batterie d'origine n'a jamais été changée et ne tient que 20 minutes. Lucas le savait et a branché l'ordinateur sur secteur pendant l'essai.</p>`,
  grille: {
    denomination: "<strong>Contrat de vente</strong> d'un bien meuble d'occasion entre particuliers : Lucas transfère la propriété d'un PC portable à Inès contre 650 €.",
    conclusion: "À Reims, le 14 septembre N (paiement et remise le même jour).",
    forme: "Écrit <strong>sous signature privée</strong> en deux exemplaires. La vente de meubles n'exige aucun écrit : il sert de preuve.",
    parties: "<strong>Vendeur</strong> : Lucas Martin, 19 ans, 5 rue Chanzy à Reims.<br><strong>Acheteuse</strong> : Inès Dubois, 17 ans, 22 avenue de Champagne à Épernay.",
    capacite: "Lucas : majeur, capable. <strong>Inès : mineure non émancipée, donc incapable de contracter</strong> (art. 1146). Elle peut seulement faire seule les <strong>actes courants</strong> autorisés par l'usage, à des conditions normales (art. 1148). Un achat de 650 € n'est probablement pas un acte courant : la vente est exposée à la <strong>nullité relative</strong>, que seule Inès (ou ses représentants légaux) peut demander.",
    consentement: "Signatures et mention de l'essai, mais le consentement d'Inès est <strong>vicié</strong> : <strong>dol</strong> (mensonge sur la « batterie neuve » et mise en scène pendant l'essai, branché sur secteur : manœuvre intentionnelle et déterminante) et <strong>réticence dolosive</strong> (art. 1137). L'<strong>erreur</strong> sur une qualité essentielle (autonomie) est aussi possible. Pas de violence.",
    objet: "Vendeur : transférer la propriété du PC (corps certain identifié par son numéro de série) et le livrer. Acheteuse : payer 650 €. Objet existant, déterminé, licite.",
    cause: "Inès : obtenir un ordinateur performant. Lucas : obtenir de l'argent. Cause <strong>licite</strong>.",
    obligations: "<strong>Vendeur</strong> : <strong>délivrer</strong> la chose conforme et la <strong>garantir</strong> (garantie d'éviction et des vices cachés).<br><strong>Acheteur</strong> : <strong>payer le prix</strong> et prendre livraison.",
    clauses: "<ul><li><strong>Prix négocié</strong> (700 € → 650 €) payé comptant en espèces.</li><li><strong>Remise immédiate</strong> du bien.</li><li><strong>Clause de non-garantie</strong> (« vendu en l'état, sans garantie, aucun recours ») : entre particuliers, elle n'est valable que si le vendeur est de <strong>bonne foi</strong>. Lucas connaissait le défaut : il ne peut pas s'en prévaloir.</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "gre", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: "instantanee", reglementation: "nomme" },
  justif: {
    formation: "La vente est parfaite dès l'accord sur la chose et le prix (exemple type du cours) ; l'écrit est une preuve.",
    negociation: "Prix discuté entre deux particuliers.",
    obligations: "Livrer et garantir / payer : obligations réciproques.",
    contrepartie: "Ordinateur contre 650 €.",
    alea: "Prestations connues et équivalentes dès la conclusion.",
    execution: "Paiement comptant et remise immédiate : prestation unique (vente au comptant, exemple du cours).",
    reglementation: "La vente est réglementée par le Code civil (art. 1582 s.)."
  },
  critique: "<p>Deux causes de <strong>nullité relative</strong> s'additionnent : l'incapacité d'Inès et le dol de Lucas. Effets : anéantissement rétroactif, Inès rend le PC, Lucas rend les 650 € ; Inès peut aussi demander des dommages-intérêts pour le dol. Délai : 5 ans.</p>"
},

// ------------------------------------------------------------
{
  id: "cdd",
  titre: "CDD de développeur dans une ESN",
  source: "Contrat inédit",
  type: "Travail",
  niveau: 3,
  texte: `
  <p class="c-title">Contrat de travail à durée déterminée</p>
  <p>Entre la société DATAFORGE, SAS, 40 rue de Vesle, 51100 Reims, représentée par M. Pierre AUBRY, directeur des ressources humaines, ci-après « l'employeur »,<br>et M. Thomas LEROY, né le 3 mars N-23, demeurant 9 rue Hincmar, 51100 Reims, ci-après « le salarié »,</p>
  <p><b>Article 1 – Motif.</b> Le présent contrat est conclu pour faire face à un accroissement temporaire d'activité lié au projet de migration du client Vitis vers le cloud. Le salarié pourra également être affecté au remplacement des développeurs absents pour cause de grève.</p>
  <p><b>Article 2 – Durée.</b> Le contrat débute le 1er octobre N pour une durée de 20 mois. Il pourra être renouvelé trois fois.</p>
  <p><b>Article 3 – Période d'essai.</b> Le contrat comporte une période d'essai de deux mois.</p>
  <p><b>Article 4 – Fonctions.</b> Le salarié est engagé en qualité de développeur back-end, statut ETAM, au siège de la société à Reims, pour 35 heures par semaine.</p>
  <p><b>Article 5 – Rémunération.</b> Salaire brut mensuel de 2 400 €. Le salarié étant jeune diplômé, aucune indemnité de fin de contrat ne lui sera due.</p>
  <p><b>Article 6 – Rupture.</b> L'employeur pourra mettre fin au contrat à tout moment, sous réserve d'un préavis de quinze jours.</p>
  <p><b>Article 7 – Formation.</b> L'employeur finance une certification cloud d'un coût de 3 000 €. Si le salarié quitte l'entreprise de sa propre initiative dans les 24 mois suivant la certification, il remboursera l'intégralité de ce montant.</p>
  <p><b>Article 8 – Propriété intellectuelle.</b> Les logiciels et documentations développés par le salarié dans l'exercice de ses fonctions appartiennent à l'employeur.</p>
  <p><b>Article 9 – Convention collective.</b> Le contrat est soumis à la convention collective Syntec.</p>
  <p>Fait à Reims, en deux exemplaires, le 25 septembre N.</p>
  <p class="c-sign"><span>L'employeur<br>P. Aubry</span><span>Le salarié<br>T. Leroy</span></p>`,
  grille: {
    denomination: "<strong>Contrat de travail à durée déterminée</strong> pour accroissement temporaire d'activité : M. Leroy est engagé comme développeur back-end pour 20 mois, contre 2 400 € bruts mensuels.",
    conclusion: "À Reims, le 25 septembre N ; début le 1er octobre N.",
    forme: "<strong>Écrit sous signature privée</strong> en deux exemplaires : l'écrit est <strong>obligatoire</strong> pour un CDD (sinon requalification en CDI) et doit indiquer le motif précis.",
    parties: "<strong>Employeur</strong> : DATAFORGE SAS, 40 rue de Vesle à Reims, représentée par M. Aubry, DRH.<br><strong>Salarié</strong> : M. Thomas Leroy, 23 ans, 9 rue Hincmar à Reims.",
    capacite: "Employeur : <strong>personne morale</strong> représentée par son DRH (qui doit avoir délégation pour embaucher). Salarié : <strong>personne physique majeure capable</strong>.",
    consentement: "Consentement libre et éclairé, signatures.<br>Vices possibles : <strong>erreur</strong> (sur la nature du poste ou la durée) ; <strong>dol</strong> (fausse promesse d'embauche en CDI, faux diplôme du salarié) ; <strong>violence</strong> morale (jeune diplômé pressé d'accepter des clauses illicites).",
    objet: "Salarié : développer pour le projet de migration. Employeur : verser 2 400 € bruts et fournir le travail. Objet licite, sauf l'affectation au remplacement de grévistes.",
    cause: "Travail contre salaire ; recours au CDD justifié par un surcroît temporaire. Cause licite pour le motif principal.",
    obligations: "<strong>Employeur</strong> : fournir le travail, payer le salaire, respecter le Code du travail et la convention Syntec, verser l'<strong>indemnité de précarité</strong> en fin de contrat.<br><strong>Salarié</strong> : travailler personnellement, consciencieusement et loyalement, respecter les ordres et le règlement intérieur.",
    clauses: "<ul><li>Art. 1 : <strong>motif de recours</strong> (accroissement temporaire) + affectation au remplacement de grévistes.</li><li>Art. 2 : <strong>durée</strong> de 20 mois, <strong>renouvelable trois fois</strong>.</li><li>Art. 3 : <strong>période d'essai</strong> de 2 mois.</li><li>Art. 4 : fonctions, lieu, durée du travail (clauses obligatoires).</li><li>Art. 5 : rémunération + <strong>exclusion de l'indemnité de précarité</strong>.</li><li>Art. 6 : <strong>faculté de rupture unilatérale</strong> par l'employeur avec préavis.</li><li>Art. 7 : <strong>clause de dédit-formation</strong> (24 mois, 3 000 €).</li><li>Art. 8 : <strong>clause de propriété intellectuelle</strong> sur les logiciels.</li><li>Art. 9 : référence à la <strong>convention collective</strong>.</li></ul>"
  },
  nature: { formation: ["consensuel", "solennel"], negociation: "adhesion", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: "successive", reglementation: "nomme" },
  justif: {
    formation: "Le contrat de travail est en principe consensuel ; mais pour le CDD l'écrit est <strong>imposé</strong> : sans écrit, le contrat est requalifié en CDI. Les deux réponses se défendent si tu expliques ce point.",
    negociation: "Conditions fixées par l'employeur.",
    obligations: "Travail contre salaire.",
    contrepartie: "Salaire contre travail.",
    alea: "Salaire et durée fixés à l'avance.",
    execution: "Contrat de 20 mois, salaire mensuel.",
    reglementation: "Le CDD est réglementé par le Code du travail (L1242-1 s.)."
  },
  critique: "<ul><li><strong>Remplacement de grévistes</strong> : <strong>interdit</strong>.</li><li><strong>Durée</strong> : 20 mois dépasse le maximum de <strong>18 mois</strong> pour un accroissement temporaire ; et le CDD n'est renouvelable que <strong>deux fois</strong>.</li><li><strong>Indemnité de précarité</strong> : « jeune diplômé » n'est pas une exception, les 10 % sont dus.</li><li><strong>Rupture à tout moment</strong> : illicite. Rupture anticipée seulement pour faute grave, force majeure, accord commun ou embauche en CDI.</li><li><strong>Dédit-formation</strong> sur 24 mois alors que le contrat ne dure que 20 mois : disproportionné.</li><li><strong>Art. 8</strong> : conforme à l'art. L113-9 CPI (la clause rappelle seulement la loi).</li></ul><div class='callout complement'><span class='label'>Complément</span>En CDD, la période d'essai est limitée à 1 jour par semaine de contrat, dans la limite de 2 semaines si le contrat dure au plus 6 mois et d'<strong>un mois</strong> au-delà : 2 mois est trop long.</div>"
},

// ------------------------------------------------------------
{
  id: "appli",
  titre: "Développement de l'application d'un club d'escalade",
  source: "Contrat inédit",
  type: "Informatique",
  niveau: 3,
  texte: `
  <p class="c-title">Contrat de développement d'une application mobile</p>
  <p>Entre :<br>M. Karim BENALI, développeur indépendant (entrepreneur individuel), exerçant sous le nom commercial « PixelNord », 3 rue de Talleyrand, 51100 Reims, ci-après « le Prestataire »,<br>Et :<br>L'association REIMS GRIMPE (loi 1901), 17 rue du Barbâtre, 51100 Reims, représentée par Mme Léa FONTAINE, présidente, ci-après « le Club ».</p>
  <p><b>Article 1 – Objet.</b> Le Prestataire développe pour le Club une application mobile Android et iOS permettant aux adhérents de s'inscrire, de réserver des créneaux et de déposer leur certificat médical.</p>
  <p><b>Article 2 – Cahier des charges et conseil.</b> Le Prestataire a analysé les besoins du Club, décrits en annexe. Il s'engage à conseiller le Club sur les choix techniques et à l'alerter de toute difficulté prévisible.</p>
  <p><b>Article 3 – Livraison.</b> L'application sera livrée au plus tard le 15 décembre N. Le Prestataire garantit une application exempte de tout bug.</p>
  <p><b>Article 4 – Prix.</b> 4 500 € TTC, payables en trois versements de 1 500 € : à la signature, à la livraison de la version de test, à la recette finale.</p>
  <p><b>Article 5 – Propriété.</b> Le code source reste la propriété exclusive du Prestataire. Le Club dispose d'un droit d'usage non exclusif de l'application pour ses besoins internes.</p>
  <p><b>Article 6 – Données des adhérents.</b> Les données (nom, prénom, date de naissance, téléphone, certificat médical) seront hébergées sur le serveur personnel du Prestataire, sans limitation de durée. Le Prestataire pourra les utiliser pour présenter ses réalisations à d'autres clients.</p>
  <p><b>Article 7 – Maintenance.</b> Six mois de maintenance corrective sont inclus à compter de la recette.</p>
  <p><b>Article 8 – Litiges.</b> Seuls les tribunaux de Paris seront compétents.</p>
  <p>Fait à Reims, le 2 septembre N, en deux exemplaires.</p>
  <p class="c-sign"><span>Le Prestataire<br>K. Benali</span><span>Pour le Club<br>L. Fontaine</span></p>`,
  grille: {
    denomination: "<strong>Contrat de conception (développement) de logiciel</strong>, contrat d'entreprise : un développeur indépendant réalise une application mobile pour un club, contre 4 500 € TTC, avec 6 mois de maintenance et une simple licence d'usage.",
    conclusion: "À Reims, le 2 septembre N ; livraison au plus tard le 15 décembre N.",
    forme: "Écrit <strong>sous signature privée</strong> en deux exemplaires, avec annexe (cahier des charges).",
    parties: "<strong>Prestataire</strong> : M. Karim Benali, entrepreneur individuel (nom commercial PixelNord), 3 rue de Talleyrand à Reims.<br><strong>Client</strong> : association Reims Grimpe, 17 rue du Barbâtre à Reims, représentée par sa présidente Mme Fontaine.",
    capacite: "M. Benali : <strong>personne physique</strong> majeure capable (un entrepreneur individuel n'est pas une personne morale). Le club : <strong>personne morale</strong> (association loi 1901), capacité limitée à son objet, représentée par sa présidente.",
    consentement: "Consentement libre et éclairé, signatures.<br>Vices possibles : <strong>erreur</strong> du club qui croit devenir propriétaire de l'application ; <strong>dol</strong> si le prestataire cache qu'il réutilisera les données ; <strong>violence</strong> peu probable.",
    objet: "Prestataire : développer et livrer l'application conforme au cahier des charges, conseiller, maintenir 6 mois. Club : payer 4 500 € en trois fois. Objet déterminé (annexe) ; l'art. 6 est illicite.",
    cause: "Club : gérer ses adhérents et réservations. Prestataire : être rémunéré. Cause licite pour l'essentiel.",
    obligations: "<strong>Prestataire</strong> : réaliser l'ouvrage (contrat d'entreprise : en principe <strong>obligation de moyens</strong>), <strong>obligation de conseil</strong>, livrer dans le délai, maintenance.<br><strong>Club</strong> : <strong>payer le prix</strong>, collaborer (définir ses besoins, tester, réceptionner).",
    clauses: "<ul><li>Art. 2 : <strong>obligation de conseil</strong> écrite (conforme au cours).</li><li>Art. 3 : <strong>délai de livraison</strong> et <strong>obligation de résultat</strong> (« exempte de tout bug »), plus sévère que l'obligation de moyens habituelle : valable car les parties l'ont voulue.</li><li>Art. 4 : <strong>prix échelonné</strong> en trois versements liés aux étapes.</li><li>Art. 5 : <strong>clause de propriété / licence</strong> : pas de cession, simple droit d'usage non exclusif.</li><li>Art. 6 : <strong>clause relative aux données personnelles</strong>.</li><li>Art. 7 : <strong>maintenance corrective</strong> incluse 6 mois.</li><li>Art. 8 : <strong>clause attributive de juridiction</strong> (Paris).</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "gre", obligations: "synallagmatique", contrepartie: "onereux", alea: "commutatif", execution: ["successive", "instantanee"], reglementation: "nomme" },
  justif: {
    formation: "Formé par l'accord ; l'écrit sert de preuve.",
    negociation: "Besoins analysés pour ce client, cahier des charges en annexe, contrat spécifique.",
    obligations: "Développer / payer : obligations réciproques.",
    contrepartie: "4 500 € contre l'application.",
    alea: "Prix et prestation fixés à l'avance.",
    execution: "Paiement échelonné, étapes de recette, maintenance de 6 mois : plutôt <strong>successive</strong>. « Instantanée » se défend pour la seule livraison de l'application.",
    reglementation: "Contrat d'entreprise réglementé par le Code civil."
  },
  critique: "<ul><li><strong>Art. 5</strong> : M. Benali est <strong>indépendant</strong>, pas salarié : l'art. L113-9 CPI ne joue pas. Sans clause de cession, il reste titulaire des droits d'auteur. Le club n'a qu'une licence : il ne pourra pas faire modifier l'application par un autre développeur. Il aurait fallu une <strong>cession écrite</strong> précisant chaque droit, l'étendue, la destination, le lieu et la durée (L131-3 CPI).</li><li><strong>Art. 6</strong> : contraire à la loi Informatique et Libertés et au RGPD : <strong>finalité</strong> détournée (démonstration à d'autres clients), <strong>conservation illimitée</strong>, <strong>sécurité</strong> douteuse (serveur personnel), absence d'<strong>information</strong> des adhérents. Le certificat médical est une donnée de santé, <strong>donnée sensible</strong> : protection renforcée.</li><li><strong>Art. 8</strong> : une clause attributive de juridiction n'est valable qu'entre commerçants : elle ne s'impose pas à l'association.</li></ul>"
},

// ------------------------------------------------------------
{
  id: "cgu",
  titre: "Conditions d'utilisation d'une plateforme de jeux en ligne",
  source: "Contrat inédit",
  type: "Informatique",
  niveau: 3,
  texte: `
  <p class="c-title">Conditions générales d'utilisation — Arcadia Play</p>
  <p>Arcadia Play est édité par ARCADIA STUDIO, SAS, 2 quai des Célestins, 69002 Lyon. En créant un compte et en cochant la case « J'accepte les CGU », le joueur accepte sans réserve les présentes conditions.</p>
  <p><b>1. Inscription.</b> L'inscription est ouverte dès 13 ans, sans accord parental. Le compte est personnel et ne peut être prêté.</p>
  <p><b>2. Service.</b> L'accès aux jeux est gratuit. Des « gemmes » permettant de débloquer des contenus peuvent être achetées (pack de 500 gemmes : 4,99 €). Les gemmes achetées ne sont ni remboursables ni échangeables.</p>
  <p><b>3. Contenus des joueurs.</b> Les joueurs peuvent publier des niveaux, des pseudonymes et des messages dans le chat. Arcadia Studio n'en contrôle pas le contenu avant publication et n'est pas responsable des contenus publiés par les joueurs. Tout contenu signalé comme illicite via le bouton « Signaler » sera examiné et retiré le cas échéant. En publiant un niveau, le joueur cède gratuitement à Arcadia Studio, pour le monde entier et pour toute la durée des droits, les droits de reproduction et de représentation de ce niveau.</p>
  <p><b>4. Cookies.</b> En poursuivant votre navigation, vous acceptez le dépôt de cookies publicitaires.</p>
  <p><b>5. Données personnelles.</b> Arcadia Studio collecte l'adresse e-mail, la date de naissance, l'adresse IP et l'historique de jeu du joueur afin de gérer son compte et de lui proposer des publicités ciblées. Ces données sont conservées dix ans après la suppression du compte.</p>
  <p><b>6. Modification.</b> Arcadia Studio peut modifier à tout moment les présentes CGU et le prix des gemmes, sans préavis. La poursuite de l'utilisation vaut acceptation.</p>
  <p><b>7. Responsabilité.</b> Arcadia Studio n'est responsable d'aucun dommage, y compris la perte des gemmes achetées en cas de bug.</p>
  <p><b>8. Droit applicable.</b> Droit français. Les tribunaux de Lyon sont seuls compétents.</p>
  <p class="c-note">Version en vigueur au 1er septembre N. Acceptation par case à cocher lors de l'inscription.</p>`,
  grille: {
    denomination: "<strong>Conditions générales d'utilisation</strong> d'un service numérique : contrat de fourniture d'un service de jeux en ligne (accès gratuit + achats intégrés), avec traitement de données personnelles et cession de droits sur les contenus créés.",
    conclusion: "Pas de date ni de lieu propres à chaque joueur : le contrat est formé <strong>au moment du clic</strong> « J'accepte » (version du 1er septembre N), à distance.",
    forme: "<strong>Contrat électronique</strong> conclu à distance, par case à cocher ; pas de signature manuscrite. L'écrit électronique a valeur de preuve s'il est conservé de façon intègre (art. 1316-1, aujourd'hui 1366).",
    parties: "<strong>Éditeur / prestataire</strong> : Arcadia Studio SAS, 2 quai des Célestins à Lyon.<br><strong>Utilisateur (joueur)</strong> : toute personne qui crée un compte, souvent consommateur, parfois mineur.",
    capacite: "Arcadia : <strong>personne morale</strong>. Joueurs : dès 13 ans, donc souvent <strong>mineurs non émancipés</strong>, incapables de contracter sauf pour des actes courants (petits achats). Les achats importants d'un mineur sont exposés à la nullité relative.",
    consentement: "Consentement par clic. Vices possibles : <strong>erreur</strong> sur la gratuité réelle du service ; <strong>dol</strong> si le jeu pousse à l'achat par des informations trompeuses ; pas de violence. Pour les cookies, « poursuivre la navigation » n'est <strong>pas un consentement</strong> valable.",
    objet: "Arcadia : donner accès aux jeux, héberger les contenus, livrer les gemmes achetées. Joueur : respecter les règles, payer les gemmes achetées, céder les droits sur ses niveaux.",
    cause: "Joueur : se divertir. Arcadia : revenus des achats et de la publicité ciblée. Cause licite.",
    obligations: "<strong>Arcadia</strong> : fournir le service conforme, assurer la sécurité des données, retirer promptement les contenus illicites signalés.<br><strong>Joueur</strong> : utiliser le service conformément aux CGU, payer les achats, ne pas publier de contenus illicites.",
    clauses: "<ul><li>1 : <strong>âge minimum</strong> (13 ans) et compte <strong>personnel</strong> (intuitu personae).</li><li>2 : achats intégrés <strong>non remboursables</strong>.</li><li>3 : <strong>clause de non-responsabilité pour les contenus des joueurs</strong> + procédure de <strong>signalement</strong> ; <strong>cession gratuite de droits</strong> sur les niveaux créés.</li><li>4 : <strong>cookies</strong> publicitaires.</li><li>5 : <strong>données personnelles</strong> (finalités, durée de conservation).</li><li>6 : <strong>modification unilatérale</strong> des CGU et du prix.</li><li>7 : <strong>clause exonératoire de responsabilité</strong>.</li><li>8 : <strong>droit applicable</strong> et <strong>clause attributive de juridiction</strong>.</li></ul>"
  },
  nature: { formation: "consensuel", negociation: "adhesion", obligations: "synallagmatique", contrepartie: ["onereux", "gratuit"], alea: "commutatif", execution: "successive", reglementation: "innomme" },
  justif: {
    formation: "Formé par un simple clic d'acceptation, sans forme imposée.",
    negociation: "Exemple type de contrat d'adhésion : CGU imposées, à prendre ou à laisser.",
    obligations: "Service fourni contre respect des règles et paiement des achats.",
    contrepartie: "<strong>Onéreux</strong> dès qu'il y a des achats de gemmes, et parce que le service gratuit est financé par la publicité ciblée et les données. On peut défendre « gratuit » pour un compte sans aucun achat : justifie ton choix.",
    alea: "Prix et contenu des gemmes connus à l'achat.",
    execution: "Accès au service dans la durée tant que le compte existe.",
    reglementation: "Contrat d'abonnement / de fourniture de service numérique : innommé selon le classement du cours."
  },
  critique: "<ul><li><strong>Art. 3</strong> : conforme à la LCEN : Arcadia agit en <strong>hébergeur</strong> des contenus des joueurs (pas de contrôle préalable) ; elle n'est responsable que si, après signalement, elle ne retire pas promptement un contenu manifestement illicite (comme Dailymotion). Elle doit conserver 1 an les données de connexion.</li><li><strong>Art. 4</strong> : contraire à la directive 2009/136/CE : il faut un <strong>accord</strong> préalable après information ; continuer à naviguer ne suffit pas.</li><li><strong>Art. 5</strong> : <strong>conservation de 10 ans</strong> après suppression du compte : contraire au principe de conservation limitée. Pour les mineurs, la publicité ciblée appelle une vigilance renforcée.</li><li><strong>Art. 6 et 7</strong> : face à des consommateurs, la modification unilatérale du prix et l'exclusion totale de responsabilité sont des <strong>clauses abusives</strong>.</li><li><strong>Art. 8</strong> : la clause attributive de juridiction est inopposable aux non-commerçants.</li></ul><div class='callout complement'><span class='label'>Complément</span>En France, un mineur peut consentir seul au traitement de ses données pour un service en ligne à partir de <strong>15 ans</strong> ; en dessous, le consentement doit être donné conjointement avec les titulaires de l'autorité parentale.</div>"
},

// ------------------------------------------------------------
{
  id: "commodat",
  titre: "Prêt d'un vidéoprojecteur par le BDE",
  source: "Contrat inédit",
  type: "Civil",
  niveau: 1,
  texte: `
  <p class="c-title">Convention de prêt de matériel</p>
  <p>Le Bureau des étudiants informatique de l'IUT de Reims, association loi 1901, rue des Crayères, 51100 Reims, représenté par son président M. Nathan GIRARD, ci-après « le prêteur »,</p>
  <p>prête gratuitement à M. Hugo LEFÈVRE, étudiant, 21 ans, 30 rue de Cernay, 51100 Reims, ci-après « l'emprunteur »,</p>
  <p>un vidéoprojecteur de marque Lumio, modèle X300, n° de série LX300-5521, avec sa télécommande et son câble HDMI, remis ce jour à l'emprunteur.</p>
  <p>L'emprunteur s'engage à utiliser le matériel pour la soirée jeux de son association de quartier uniquement, à ne pas le prêter à un tiers, à en prendre soin et à le restituer en bon état au local du BDE le lundi 18 novembre N à 9 h au plus tard.</p>
  <p>Toute dégradation ou perte sera à la charge de l'emprunteur, qui remboursera la réparation ou la valeur à neuf du matériel (650 €).</p>
  <p>Fait à Reims, le vendredi 15 novembre N.</p>
  <p class="c-sign"><span>Le prêteur<br>N. Girard</span><span>L'emprunteur<br>H. Lefèvre</span></p>`,
  grille: {
    denomination: "<strong>Contrat de prêt à usage</strong> (commodat) : le BDE remet gratuitement un vidéoprojecteur à M. Lefèvre, qui doit s'en servir pour l'usage prévu et le rendre le lundi.",
    conclusion: "À Reims, le vendredi 15 novembre N ; restitution le lundi 18 novembre N à 9 h.",
    forme: "Écrit <strong>sous signature privée</strong>, qui sert de preuve (description précise du matériel).",
    parties: "<strong>Prêteur</strong> : BDE informatique de l'IUT de Reims (association), représenté par son président M. Girard.<br><strong>Emprunteur</strong> : M. Hugo Lefèvre, 21 ans, 30 rue de Cernay à Reims.",
    capacite: "BDE : <strong>personne morale</strong> (association), représentée par son président ; le prêt doit entrer dans son objet. M. Lefèvre : <strong>majeur capable</strong>.",
    consentement: "Consentement libre et éclairé, signatures.<br>Vices possibles : <strong>erreur</strong> sur l'état du matériel ; <strong>dol</strong> si l'emprunteur ment sur l'usage prévu ; violence improbable.",
    objet: "Prêteur : remettre l'usage du vidéoprojecteur (corps certain identifié). Emprunteur : l'utiliser conformément à l'usage convenu, le conserver et le <strong>restituer</strong>. Objet déterminé et licite.",
    cause: "Emprunteur : disposer d'un projecteur pour une soirée. Prêteur : rendre service (intention libérale). Cause licite.",
    obligations: "<strong>Emprunteur</strong> : garder et conserver la chose avec soin, s'en servir pour l'usage prévu, la <strong>restituer</strong> au terme.<br><strong>Prêteur</strong> : remettre la chose (formation du contrat), ne pas la reprendre avant le terme.",
    clauses: "<ul><li><strong>Gratuité</strong> expresse.</li><li><strong>Usage limité</strong> à la soirée de l'association de quartier.</li><li><strong>Interdiction de prêter à un tiers</strong> (intuitu personae).</li><li><strong>Terme de restitution</strong> précis (lundi 9 h, au local du BDE).</li><li><strong>Clause de responsabilité</strong> : dégradation ou perte à la charge de l'emprunteur, remboursement à la valeur à neuf (650 €).</li></ul>"
  },
  nature: { formation: "reel", negociation: "gre", obligations: "unilateral", contrepartie: "gratuit", alea: "commutatif", execution: ["instantanee", "successive"], reglementation: "nomme" },
  justif: {
    formation: "Le prêt est un contrat réel : il se forme par la remise du vidéoprojecteur (« remis ce jour »).",
    negociation: "Accord ponctuel entre le BDE et un étudiant, conditions adaptées à sa demande.",
    obligations: "Une fois la chose remise, seul l'emprunteur est obligé (conserver, restituer).",
    contrepartie: "Prêt consenti gratuitement : le prêt à usage est essentiellement gratuit.",
    alea: "Aucune prestation ne dépend d'un événement incertain.",
    execution: "La restitution est une prestation unique (instantanée), mais l'usage dure un week-end (successive) : les deux se défendent si c'est justifié.",
    reglementation: "Le prêt à usage est réglementé par le Code civil (art. 1875 s.)."
  },
  critique: "<p>Contrat utile pour cocher les catégories rares : <strong>réel, unilatéral, gratuit</strong>. Compare avec le prêt d'argent Hérioux / Vatel, réel et unilatéral mais <strong>onéreux</strong>.</p>"
}
];

// ============================================================
// Cas pratiques (TD 2 et TD 3)
// ============================================================
const CAS = [
{
  id: "gonfrand",
  titre: "À vous de juger : 4 dossiers de licenciement",
  source: "TD n°2 · Exercice 2",
  ch: "ch2",
  enonce: `<p>Le cabinet d'avocats Gonfrand, spécialisé en droit du travail, examine quatre dossiers.</p>
  <p><b>Dossier 1</b> — Alexandra Ruelle, salariée des établissements Saurier (composants automobiles), a produit de fausses notes de frais pour se faire rembourser des dépenses imprévues. Elle a été licenciée et veut contester devant les prud'hommes de Lille.</p>
  <p><b>Dossier 2</b> — Astrid Fiers, chauffeur-livreur chez Galop, doit garer le véhicule sur le parking du siège le week-end. Un vendredi, rentrée très tard d'une course lointaine et fatiguée, elle le gare devant chez elle. Le lundi, elle explique la situation à son chef, qui ne fait aucune observation. Elle reçoit ensuite une convocation à un entretien préalable à licenciement.</p>
  <p><b>Dossier 3</b> — Lucie Bolleret, ambulancière chez Rheims (5 salariés), renverse et blesse gravement une enfant un samedi matin en sortant de boîte de nuit, en état d'ébriété. Son permis va lui être retiré et son employeur envisage de la licencier. Elle estime n'avoir commis aucune faute pendant son travail et parle de double sanction.</p>
  <p><b>Dossier 4</b> — Francisco Ledermas, mécanicien chez Réparetout, a enfermé le chien d'une cliente dans le coffre d'une voiture ; l'animal a failli mourir. L'employeur lui a infligé une sanction disciplinaire. Francisco veut la contester aux prud'hommes ; l'employeur le menace de licenciement s'il le fait.</p>
  <p><b>Questions</b> : 1. Qu'est-ce qu'une cause réelle et sérieuse et quel est son rôle ? 2. Pour chaque dossier, y a-t-il une cause réelle et sérieuse ? Justifiez.</p>`,
  correction: `<p><b>1.</b> Une cause est <strong>réelle</strong> si elle est objective et exacte, <strong>sérieuse</strong> si elle est assez grave pour rendre impossible la poursuite du travail sans dommage pour l'entreprise. Tout licenciement doit en avoir une ; le juge la contrôle ; à défaut, le licenciement est abusif (indemnité ou réintégration).</p>
  <p><b>Dossier 1 — Oui, faute grave.</b> Les fausses notes de frais sont un fait réel (fraude) et sérieux : c'est une malhonnêteté envers l'employeur qui rompt la confiance et rend impossible le maintien de la salariée. Licenciement justifié, sans préavis ni indemnité de licenciement ; sa contestation a peu de chances d'aboutir.</p>
  <p><b>Dossier 2 — Non.</b> Le fait est réel, mais pas sérieux : manquement isolé, justifié par la fatigue après une course tardive, signalé spontanément, et toléré par le chef qui n'a rien dit. Il ne cause pas de dommage justifiant une rupture ; une simple observation suffirait. Licenciement abusif s'il est prononcé.</p>
  <p><b>Dossier 3 — Pas de faute, mais une cause réelle et sérieuse possible.</b> Les faits relèvent de sa <strong>vie personnelle</strong> (samedi, hors travail) : ils ne peuvent pas justifier un licenciement disciplinaire, Lucie a raison sur ce point. En revanche, le <strong>retrait du permis</strong> rend impossible l'exercice de son métier d'ambulancière : dans une PME de 5 personnes, sans autre poste, cela peut constituer une cause réelle et sérieuse non disciplinaire. Il n'y a pas de « double sanction » : le retrait de permis est une sanction pénale, le licenciement tire la conséquence contractuelle de l'impossibilité de travailler.</p>
  <p><b>Dossier 4 — Non pour un nouveau licenciement.</b> La faute (plaisanterie dangereuse envers un client) a <strong>déjà été sanctionnée</strong> : l'employeur ne peut pas sanctionner deux fois les mêmes faits. Surtout, licencier Francisco parce qu'il saisit les prud'hommes porterait atteinte à une liberté fondamentale, le <strong>droit d'agir en justice</strong> : le licenciement serait <strong>nul</strong> (réintégration possible). Le conseil de prud'hommes pourra annuler la sanction si elle est disproportionnée, mais pas la modifier.</p>`
},
{
  id: "panorama",
  titre: "Panorama des motifs personnels : 5 arrêts",
  source: "TD n°2 · Exercice 3",
  ch: "ch2",
  enonce: `<p>Pour chaque décision de la Cour de cassation (chambre sociale), indiquez les faits, la qualification juridique et les motifs.</p>
  <ol><li>Un directeur général adjoint diffuse à des salariés extérieurs à l'équipe dirigeante des informations exactes sur un plan interne (Cass. soc., 6 février 2008).</li>
  <li>Une téléopératrice répond fermement à un abonné agressif (Cass. soc., 9 juillet 2008).</li>
  <li>Une hôtesse d'accueil d'un centre laser crée avec cinq associés un centre concurrent et détourne la clientèle avant de démissionner (Cass. soc., 9 avril 2008).</li>
  <li>Une assistante comptable, titulaire d'un simple brevet de technicien, formée 15 jours, est licenciée pour insuffisance professionnelle alors qu'elle était en réalité seule comptable (Cass. soc., 29 novembre 2007).</li>
  <li>Une technicienne refuse un poste de hotline correspondant à ses fonctions et interrompt une formation (Cass. soc., 9 juillet 2008).</li></ol>`,
  correction: `<table class="tbl"><tr><th>Cas</th><th>Qualification</th><th>Motifs de la Cour</th></tr>
  <tr><td>1. Cadre dirigeant</td><td>Pas de faute grave (ni de cause réelle et sérieuse retenue par la cour d'appel)</td><td>Informations non erronées ; le salarié n'avait pas été informé du caractère confidentiel du plan</td></tr>
  <tr><td>2. Téléopératrice</td><td>Pas de faute grave, pas de cause réelle et sérieuse</td><td>Réaction « ferme mais modérée », justifiée par l'attitude agressive du client</td></tr>
  <tr><td>3. Hôtesse d'accueil</td><td><strong>Faute lourde</strong></td><td>Détournement délibéré de la clientèle au profit de sa propre société pendant son contrat : intention de nuire</td></tr>
  <tr><td>4. Assistante comptable</td><td>Pas de cause réelle et sérieuse</td><td>Formation insuffisante pour les fonctions réellement confiées : l'insuffisance n'est pas imputable à la salariée</td></tr>
  <tr><td>5. Technicienne</td><td><strong>Faute grave</strong> (insubordination)</td><td>Refus d'une affectation correspondant à ses fonctions et interruption d'une formation mise en place par l'employeur</td></tr></table>
  <p>Le poly écrivait « fraude lourde » pour le cas 3 : il s'agit d'une <strong>faute lourde</strong>.</p>`
},
{
  id: "nonconc",
  titre: "Arrêt : clause de non-concurrence d'un VRP",
  source: "TD n°2 · Exercice 4 (Cass. soc., 12 octobre 2011, n° 09-43155)",
  ch: "ch2",
  enonce: `<p>M. X, VRP chargé de vendre des matériels agricoles betteraviers, avait une clause de non-concurrence lui interdisant de s'occuper de matériels similaires dans le nord de la France et au sud d'une ligne Nantes-Lyon. Il démissionne en 2007. Son ancien employeur (société Moreau) l'assigne pour violation de la clause. La cour d'appel de Reims déclare la clause nulle ; l'employeur se pourvoit en cassation.</p>
  <p>L'accord national interprofessionnel des VRP (art. 17) limite l'interdiction aux secteurs et catégories de clients que le VRP visitait au moment de la rupture.</p>
  <p><b>Questions</b> : 1. Quelles sont les conditions de licéité d'une clause de non-concurrence ? 2. Pourquoi la Cour de cassation rejette-t-elle le pourvoi ?</p>`,
  correction: `<p><b>1.</b> La clause est licite seulement si elle est : prévue dans le contrat ou un avenant accepté ; <strong>indispensable</strong> à la protection des intérêts légitimes de l'entreprise ; <strong>limitée dans le temps et dans l'espace</strong> ; adaptée aux <strong>spécificités de l'emploi</strong> (laisser au salarié la possibilité de travailler selon sa formation et son expérience) ; assortie d'une <strong>contrepartie financière</strong> non dérisoire, versée après la rupture.</p>
  <p><b>2.</b> La convention collective des VRP réglemente la clause : le contrat ne peut pas contenir de dispositions <strong>plus contraignantes</strong> pour le salarié (principe de faveur). Or l'interdiction couvrait une zone plus large que le secteur effectivement confié au VRP. Comme le salarié n'invoquait que la <strong>nullité</strong>, le juge ne pouvait pas réduire le champ de la clause : il devait la déclarer <strong>nulle</strong>. La cour d'appel a donc exactement statué ; <strong>rejet</strong> du pourvoi.</p>`
},
{
  id: "durand",
  titre: "Fichage abusif : le cas de Mme Durand",
  source: "TD n°3 · Exercice 3",
  ch: "ch3a",
  enonce: `<p>En demandant un crédit auto, Mme Durand apprend qu'elle est inscrite au fichier des incidents de remboursement des crédits aux particuliers (FICP) et que sa banque refuse le prêt. L'incident date de six ans ; elle avait régularisé et remboursé l'intégralité du crédit. Elle s'estime victime d'un fichage abusif.</p>
  <p><b>Questions</b> : 1. Quelles démarches pour obtenir sa désinscription ? 2. Quels recours si elle n'y parvient pas ?</p>`,
  correction: `<p><b>1. Démarches.</b> Exercer son <strong>droit d'accès</strong> (loi de 1978, RGPD) pour connaître les informations inscrites : le FICP est tenu par la <strong>Banque de France</strong>, consultable sur place ou par courrier avec une pièce d'identité. Puis exercer son <strong>droit de rectification / d'effacement</strong> auprès de l'<strong>établissement qui a déclaré l'incident</strong> : après remboursement intégral, il doit demander la radiation. Garder une copie de la demande (lettre recommandée).</p>
  <p><b>2. Recours.</b> Sans réponse ou en cas de refus, elle peut <strong>saisir la CNIL</strong> (plainte en ligne, rubrique « Banque et crédit »), qui interviendra auprès de la banque, pourra la mettre en demeure et prononcer une <strong>sanction</strong>. Elle peut enfin saisir le <strong>tribunal</strong> pour obtenir la radiation et des dommages-intérêts pour le préjudice (crédit refusé).</p>
  <p>Arguments : principe de <strong>conservation limitée</strong> et d'<strong>exactitude</strong> des données ; une inscription maintenue après régularisation, six ans après l'incident, est abusive.</p>
  <div class="callout complement"><span class="label">Complément</span>L'inscription au FICP dure au maximum <strong>5 ans</strong> et doit être radiée dès le remboursement intégral déclaré par l'établissement.</div>
  <p>Le poly parle de « Mme Dupont » dans la correction : il s'agit de Mme Durand.</p>`
},
{
  id: "applis",
  titre: "Applications mobiles et loi Informatique et Libertés",
  source: "TD n°3 · Exercice 2",
  ch: "ch3a",
  enonce: `<p>Fiche CNIL (2016) : les éditeurs d'applications mobiles qui collectent des données personnelles (nom, pseudo, numéro de téléphone, identifiant du téléphone, géolocalisation) doivent respecter la loi Informatique et Libertés.</p>
  <p><b>Questions</b> : 1. Quelles obligations au regard du RGPD et de la loi Informatique et Libertés ? 2. En tant qu'éditeur, quelles questions devez-vous vous poser ?</p>`,
  correction: `<p><b>1.</b> Les <strong>5 principes</strong> :</p>
  <ul><li><strong>Finalité</strong> déterminée, explicite et légitime (pas de suivi des déplacements à l'insu de l'utilisateur).</li>
  <li><strong>Pertinence</strong> : seulement les données nécessaires (un quiz n'a pas à aspirer le carnet d'adresses).</li>
  <li><strong>Conservation limitée</strong> (historique de géolocalisation non conservé sans accord exprès).</li>
  <li><strong>Droits des personnes</strong> : information claire (identité de l'éditeur, objectif, destinataires), accès, rectification, opposition à la prospection.</li>
  <li><strong>Sécurité et confidentialité</strong> adaptées aux risques.</li></ul>
  <p>Plus : <strong>consentement exprès</strong> par case <strong>non précochée</strong> pour la publicité ciblée et la géolocalisation, désactivable à tout moment ; anciennement déclaration à la CNIL (remplacée par le registre et la responsabilité du RGPD).</p>
  <p><b>2. Questions à se poser :</b> Quelles données mon application collecte-t-elle et pourquoi ? Sont-elles toutes nécessaires ? Combien de temps les garder ? Ai-je informé l'utilisateur et recueilli son consentement quand il le faut ? Comment exerce-t-il ses droits ? À qui je transmets les données (régies publicitaires, SDK) ? Comment je les sécurise ? Mes utilisateurs sont-ils mineurs ? Ai-je tenu le registre des traitements ?</p>`
},
{
  id: "scs",
  titre: "Le crédit social chinois",
  source: "TD n°3 · Exercice 1",
  ch: "ch3a",
  enonce: `<p>Depuis 2014, la Chine met en place un Social Credit System qui note les citoyens en interconnectant leurs données (casier, comportement, crédit, achats, relations en ligne), avec des avantages (crédit facilité) et des sanctions (interdiction de voyager, emplois inaccessibles, Internet ralenti), parfois couplé à la reconnaissance faciale.</p>
  <p><b>Questions</b> : 1. Exemples de dérives similaires ? 2. Protections en France et dans l'UE ? 3. Principes de la loi Informatique et Libertés, rôle et fonctionnement de la CNIL ? 4. Autres organismes d'alerte ?</p>`,
  correction: `<p><b>1. Exemples</b> : le projet <strong>SAFARI</strong> (1974) d'interconnexion des fichiers administratifs, à l'origine de la loi de 1978 ; l'affaire <strong>Snowden</strong> (2013, surveillance de masse) ; <strong>Cambridge Analytica</strong> (profilage politique d'utilisateurs Facebook) ; notations privées (scores de crédit, notes des chauffeurs et clients sur les plateformes) ; expérimentations de reconnaissance faciale.</p>
  <p><b>2. Protections</b> : art. 9 C. civ. et art. 8 CEDH (vie privée) ; loi Informatique et Libertés ; <strong>RGPD</strong> (finalité, minimisation, droit d'opposition, encadrement des décisions entièrement automatisées et du profilage) ; contrôle de la CNIL et des juges ; règlement européen sur l'IA (2024), qui interdit les systèmes de notation sociale. La « fragmentation de l'information » (pas d'interconnexion générale) est elle-même une garantie de liberté.</p>
  <p><b>3.</b> Voir la question rédigée du chapitre III : 5 principes (finalité, pertinence, droits des personnes, conservation limitée, sécurité) ; CNIL, autorité administrative indépendante de 18 membres : conseil, plaintes, contrôles, mises en demeure, sanctions.</p>
  <p><b>4. Autres organismes</b> : le Défenseur des droits, la CNCDH (Commission nationale consultative des droits de l'homme), le Conseil national du numérique, le Comité européen de la protection des données ; associations (Amnesty International, La Quadrature du Net).</p>`
},
{
  id: "dailymotion",
  titre: "Omar et Fred c. Dailymotion : hébergeur ou éditeur ?",
  source: "Poly · Exemple de thème et analyse (TGI Paris, 15 avril 2008)",
  ch: "ch3a",
  enonce: `<p>Des vidéos du spectacle d'Omar et Fred (DVD produit par Korokoro et Cocojet) sont mises en ligne sans autorisation par des internautes sur Dailymotion. Les artistes, leur coauteur et les producteurs assignent Dailymotion pour contrefaçon et atteinte au droit à l'image et au nom, en la présentant comme <strong>éditeur</strong> (réencodage, taille imposée des fichiers, architecture du site, publicité). Dailymotion revendique la qualité d'<strong>hébergeur</strong>.</p>
  <p><b>Questions</b> : Quel est le texte applicable ? Quelle différence entre éditeur et hébergeur ? Quelle décision ?</p>`,
  correction: `<p><b>Texte</b> : la <strong>LCEN du 21 juin 2004</strong>, art. 6.</p>
  <p><b>Éditeur</b> : « la personne qui détermine les contenus qui doivent être mis à la disposition du public » : responsable des contenus. <b>Hébergeur</b> : assure le stockage des contenus fournis par les utilisateurs ; pas d'obligation générale de surveillance ; responsable seulement s'il avait connaissance du caractère manifestement illicite et n'a pas agi promptement.</p>
  <p><b>Décision</b> : le TGI de Paris juge que Dailymotion est <strong>hébergeur</strong> (les choix techniques ne font pas de lui un éditeur) et n'a pas engagé sa responsabilité : les demandes, mal dirigées, sont rejetées. Il lui enjoint toutefois de cesser toute rediffusion des contenus du DVD qui lui ont été communiqués. Les atteintes au droit à l'image et au nom sont le fait des internautes.</p>
  <p>Autres droits invoqués : droits patrimoniaux d'auteur (vie + 70 ans), droit de reproduction, droits voisins des artistes-interprètes (50 ans selon le poly), droits de la personnalité. L'adhésion à la Sacem ne prive pas les auteurs de leur droit d'agir si la Sacem n'agit pas, ni de leur droit moral.</p>`
}
];

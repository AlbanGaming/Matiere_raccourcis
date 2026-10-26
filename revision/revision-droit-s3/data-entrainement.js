// ============================================================
// Entraînement : flashcards, QCM, questions de cours rédigées
// ch : "ch1" | "ch2" | "ch3a" | "ch3b"
// ============================================================

const CH_LABELS = {
  ch1: "I · Contrats",
  ch2: "II · Travail",
  ch3a: "III · Données & Internet",
  ch3b: "III · Informatique & multimédia"
};

const FLASHCARDS = [
  // ---- Chapitre I
  { ch: "ch1", q: "Définition du contrat (nouvel art. 1101 C. civ.)", a: "Accord de volontés entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations." },
  { ch: "ch1", q: "Définition du contrat (ancien art. 1101)", a: "Convention par laquelle une ou plusieurs personnes s'obligent, envers une ou plusieurs autres, à donner, à faire ou à ne pas faire quelque chose." },
  { ch: "ch1", q: "Les 3 principes de formation du contrat et leurs articles", a: "Liberté contractuelle (art. 1102), force obligatoire (art. 1103), bonne foi (art. 1104)." },
  { ch: "ch1", q: "Principe d'autonomie de la volonté", a: "« L'Homme est libre et ne peut s'obliger que par sa propre volonté ». Il fonde la liberté contractuelle et la force obligatoire." },
  { ch: "ch1", q: "Art. 1103 C. civ.", a: "« Les contrats légalement formés tiennent lieu de loi à ceux qui les ont faits. »" },
  { ch: "ch1", q: "Art. 1104 C. civ.", a: "Les contrats doivent être négociés, formés et exécutés de bonne foi. Cette disposition est d'ordre public." },
  { ch: "ch1", q: "Définition de la bonne foi", a: "Croyance qu'a une personne de se trouver dans une situation conforme au droit et conscience d'agir sans léser les droits d'autrui." },
  { ch: "ch1", q: "Les 3 aspects de la liberté contractuelle", a: "Liberté de contracter ou non ; liberté de choisir son cocontractant ; liberté de déterminer le contenu et la forme du contrat." },
  { ch: "ch1", q: "Restrictions à la liberté contractuelle (+ exemples)", a: "Contrats obligatoires (assurance auto) ; contenu conforme à l'ordre public et aux bonnes mœurs (vente d'organes interdite) ; formalités imposées (écrit). Art. 1102 al. 2." },
  { ch: "ch1", q: "Exceptions à la force obligatoire", a: "Interdiction des clauses abusives ; lois impératives qui s'imposent aux parties ; contrats rompus unilatéralement (CDI)." },
  { ch: "ch1", q: "Les 4 conditions de validité du contrat (cours)", a: "Consentement, capacité juridique, objet, cause." },
  { ch: "ch1", q: "Les 3 vices du consentement", a: "Erreur, dol, violence (+ lésion dans certains cas)." },
  { ch: "ch1", q: "L'erreur : quand entraîne-t-elle la nullité ?", a: "Si elle porte sur les qualités essentielles de la prestation ou du cocontractant et est déterminante. Pas si elle est inexcusable, ni si elle porte sur la valeur ou les motifs (erreurs indifférentes)." },
  { ch: "ch1", q: "« De non vigilantibus non curat praetor »", a: "Le préteur n'a cure des insouciants : l'erreur inexcusable n'entraîne pas la nullité." },
  { ch: "ch1", q: "Le dol (art. 1137 à 1139)", a: "Obtenir le consentement de l'autre par des manœuvres ou des mensonges intentionnels et déterminants." },
  { ch: "ch1", q: "Réticence dolosive", a: "Dissimulation intentionnelle par un contractant d'une information dont il sait le caractère déterminant pour l'autre (art. 1137)." },
  { ch: "ch1", q: "Dolus bonus / dolus malus", a: "Dolus bonus : exagération commerciale tolérée (« l'acheteur doit être curieux »). Dolus malus : tromperie sanctionnée par la nullité." },
  { ch: "ch1", q: "La violence (art. 1142)", a: "Contrainte physique ou morale (ou financière) exercée par le contractant ou un tiers pour arracher le consentement." },
  { ch: "ch1", q: "Abus de faiblesse", a: "Profiter de la vulnérabilité d'une personne (âge, maladie, handicap) en connaissance de cause pour lui faire faire un acte contraire à son intérêt." },
  { ch: "ch1", q: "Capacité juridique", a: "Aptitude à être titulaire de droits et à les exercer. Art. 1146 : sont incapables les mineurs non émancipés et les majeurs protégés." },
  { ch: "ch1", q: "Les 3 mesures de protection des majeurs", a: "Sauvegarde de justice, curatelle, tutelle." },
  { ch: "ch1", q: "Caractères de la chose objet d'une obligation de donner", a: "Exister (ou être future), être déterminée ou déterminable, être dans le commerce." },
  { ch: "ch1", q: "Caractères de la prestation (obligation de faire / ne pas faire)", a: "Possible, déterminée, licite." },
  { ch: "ch1", q: "La cause et l'ordonnance de 2016", a: "La notion de cause est supprimée du Code civil mais pas ses effets : on parle de contenu du contrat, qui doit être licite." },
  { ch: "ch1", q: "Nullité relative : qui, combien de temps ?", a: "Seule la personne protégée peut agir (mineur, victime d'un vice). Prescription 5 ans." },
  { ch: "ch1", q: "Nullité absolue : qui, combien de temps ?", a: "Toute personne ayant un intérêt (créanciers, héritiers…). Prescription 30 ans selon le cours." },
  { ch: "ch1", q: "Effets de la nullité", a: "Anéantissement rétroactif : le contrat est censé n'avoir jamais existé ; restitution des prestations reçues." },
  { ch: "ch1", q: "Contrat consensuel", a: "Formé par le seul échange des consentements (art. 1109). C'est le principe (art. 1172). Ex. la vente." },
  { ch: "ch1", q: "Contrat solennel", a: "Sa validité dépend d'une formalité (écrit, acte authentique). Ex. contrat de mariage, donation, vente immobilière, hypothèque." },
  { ch: "ch1", q: "Contrat réel", a: "Suppose la remise d'une chose pour être formé. Ex. prêt entre particuliers, dépôt, gage." },
  { ch: "ch1", q: "Acte authentique / acte sous signature privée", a: "Authentique : dressé par un officier public (notaire…). Sous signature privée : rédigé et signé par les parties seules." },
  { ch: "ch1", q: "Contrat d'adhésion (art. 1110)", a: "Contrat dont les conditions sont fixées par une partie, l'autre se contente d'adhérer. Ex. billet SNCF, assurance, abonnement Internet." },
  { ch: "ch1", q: "Contrat nommé / innommé (art. 1105)", a: "Nommé : réglementé par la loi (vente, bail, travail). Innommé : soumis à la seule théorie générale (abonnement, déménagement)." },
  { ch: "ch1", q: "Synallagmatique / unilatéral (art. 1106)", a: "Synallagmatique : obligations réciproques (vente, bail). Unilatéral : une seule partie obligée (donation, promesse unilatérale de vente)." },
  { ch: "ch1", q: "À titre onéreux / gratuit (art. 1107)", a: "Onéreux : chaque partie reçoit une contrepartie. Gratuit : avantage sans contrepartie (donation, cautionnement, bail sans loyer)." },
  { ch: "ch1", q: "Commutatif / aléatoire (art. 1108)", a: "Commutatif : prestations connues dès la conclusion. Aléatoire : dépendent d'un événement incertain (assurance, viager)." },
  { ch: "ch1", q: "Exécution instantanée / successive", a: "Instantanée : prestation unique (vente au comptant). Successive : prestations échelonnées dans le temps (bail, travail)." },
  { ch: "ch1", q: "Effet relatif du contrat", a: "Le contrat ne produit d'effets qu'entre les parties ; les tiers ne sont pas tenus. Exceptions : héritiers, représentés, conventions collectives." },
  { ch: "ch1", q: "Exécution forcée d'une obligation de faire", a: "En principe dommages et intérêts ; exceptionnellement exécution en nature : démolition, exécution par un tiers, expulsion, astreinte." },
  { ch: "ch1", q: "Astreinte", a: "Somme d'argent à payer par jour de retard pour contraindre le débiteur à exécuter." },
  { ch: "ch1", q: "Résolution / résiliation", a: "Résolution : anéantissement rétroactif avec restitutions. Résiliation : fin pour l'avenir seulement, sans restitution." },
  { ch: "ch1", q: "Usus, fructus, abusus", a: "User de la chose, en percevoir les fruits, en disposer. Usufruit = usus + fructus ; nue-propriété = abusus." },

  // ---- Chapitre II
  { ch: "ch2", q: "Définition du contrat de travail", a: "Convention par laquelle un salarié s'engage à mettre sa force de travail à disposition d'un employeur, sous sa direction, moyennant une rémunération." },
  { ch: "ch2", q: "Les 3 éléments du contrat de travail", a: "Le travail, la rémunération, le lien de subordination." },
  { ch: "ch2", q: "Caractères du contrat de travail", a: "Synallagmatique, onéreux, consensuel, d'adhésion, intuitu personae, à exécution successive, à durée indéterminée ou déterminée." },
  { ch: "ch2", q: "Intuitu personae", a: "Conclu en considération de la personne même du cocontractant (ses qualités) : il ne peut pas être exécuté par quelqu'un d'autre." },
  { ch: "ch2", q: "Forme du CDI", a: "CDI à temps complet : aucune forme imposée (L1221-1), il peut être oral. Tous les autres contrats doivent être écrits." },
  { ch: "ch2", q: "Directive 91/533 du 14 octobre 1991", a: "L'employeur remet dans les 2 mois un document écrit sur les éléments essentiels du contrat. En France, le bulletin de paie y pourvoit." },
  { ch: "ch2", q: "Clauses obligatoires du contrat de travail écrit", a: "Identité et signatures des parties, lieu et date, fonctions, lieu de travail, durée du travail, rémunération, avantages sociaux, obligations professionnelles, convention collective." },
  { ch: "ch2", q: "Les 3 pouvoirs de l'employeur", a: "Direction, réglementaire (règlement intérieur), disciplinaire (sanctions)." },
  { ch: "ch2", q: "Sanction interdite en droit du travail", a: "Les sanctions pécuniaires (retenues sur salaire)." },
  { ch: "ch2", q: "Durées maximales de la période d'essai en CDI", a: "2 mois ouvriers/employés, 3 mois agents de maîtrise/techniciens, 4 mois cadres. Renouvelable une fois." },
  { ch: "ch2", q: "Conditions de licéité d'une clause de non-concurrence", a: "Écrite ; indispensable aux intérêts légitimes de l'entreprise ; limitée dans le temps et l'espace ; adaptée à l'emploi ; contrepartie financière non dérisoire." },
  { ch: "ch2", q: "Clause de mobilité", a: "Le salarié accepte par avance une mutation. Sans elle, une mutation est une modification du contrat ; le refus du salarié rend la rupture imputable à l'employeur." },
  { ch: "ch2", q: "Clause de dédit-formation", a: "Le salarié s'engage à rester un temps déterminé après une formation ; s'il part avant, il rembourse les frais." },
  { ch: "ch2", q: "Cause réelle et sérieuse", a: "Réelle : objective, exacte. Sérieuse : assez grave pour rendre impossible la poursuite du travail sans dommage. Sinon licenciement abusif." },
  { ch: "ch2", q: "Faute grave : définition et effets", a: "Violation de règles importantes rendant impossible le maintien du salarié. Licenciement immédiat, ni préavis ni indemnité de licenciement ; congés payés dus." },
  { ch: "ch2", q: "Faute lourde", a: "Faute intentionnelle avec volonté de nuire à l'employeur (détournement de clientèle, sabotage, virus). Aucune indemnité selon le cours." },
  { ch: "ch2", q: "Procédure de licenciement pour motif personnel", a: "1. Convocation par lettre recommandée ; 2. entretien préalable (assistance possible) ; 3. notification motivée par lettre recommandée, au moins un jour franc après." },
  { ch: "ch2", q: "Licenciement économique : définition", a: "Rupture pour un motif non inhérent à la personne du salarié : suppression ou transformation d'emploi due à des difficultés économiques ou mutations technologiques." },
  { ch: "ch2", q: "Licenciement économique individuel : spécificités", a: "Procédure du motif personnel + convention de conversion + information de l'administration ; lettre au moins 7 jours après l'entretien." },
  { ch: "ch2", q: "Quand faut-il un plan social ?", a: "Entreprise d'au moins 50 salariés qui licencie au moins 10 salariés sur 30 jours pour motif économique." },
  { ch: "ch2", q: "Indemnité de licenciement (cours)", a: "Si au moins 1 an d'ancienneté et pas de faute grave/lourde : 1/5 de mois par année, + 2/15 par année au-delà de 10 ans." },
  { ch: "ch2", q: "Indemnité compensatrice de congés payés : calcul", a: "Règle du 1/10e de la rémunération brute de référence ou maintien de salaire : on retient la plus favorable au salarié." },
  { ch: "ch2", q: "Reçu pour solde de tout compte", a: "Le salarié reconnaît avoir reçu toutes les sommes dues ; il peut le dénoncer dans les 2 mois (cours ; 6 mois aujourd'hui)." },
  { ch: "ch2", q: "Cas de recours autorisés au CDD", a: "Remplacement d'un salarié absent, accroissement temporaire d'activité, emploi saisonnier, emploi temporaire par nature." },
  { ch: "ch2", q: "Cas où le CDD est interdit", a: "Remplacer un gréviste ; travaux dangereux sous surveillance médicale ; poste supprimé pour motif économique depuis moins de 6 mois." },
  { ch: "ch2", q: "Durée maximale du CDD", a: "18 mois en général ; 9 mois en attente d'un salarié en CDI ; 24 mois à l'étranger, départ définitif avec suppression de poste, accroissement exceptionnel." },
  { ch: "ch2", q: "Renouvellement du CDD", a: "Deux fois, dans la limite de la durée maximale." },
  { ch: "ch2", q: "Indemnité de précarité", a: "10 % du salaire brut, due à la fin d'un CDD ou d'une mission d'intérim (sauf réembauche en CDI, saisonniers)." },
  { ch: "ch2", q: "Rupture anticipée du CDD : cas", a: "Faute grave, force majeure, accord des parties, embauche du salarié en CDI." },
  { ch: "ch2", q: "CDD à objet précis", a: "Cadres et ingénieurs ; fin à la réalisation de la mission ; 18 à 36 mois ; non renouvelable ; prévenance 2 mois ; sinon devient CDI." },
  { ch: "ch2", q: "Les deux contrats du travail temporaire", a: "Contrat de mission (ETT ↔ intérimaire) et contrat de mise à disposition (ETT ↔ entreprise utilisatrice)." },
  { ch: "ch2", q: "Sanction pénale du non-respect des règles sur les contrats précaires", a: "3 750 € d'amende et 6 mois d'emprisonnement." },
  { ch: "ch2", q: "Durées du travail à connaître", a: "35 h/semaine ; max 10 h/jour, 48 h/semaine, 44 h en moyenne sur 12 semaines ; repos 11 h/jour et 24 h + 11 h/semaine." },
  { ch: "ch2", q: "Principe de faveur", a: "Quand contrat et convention collective règlent la même question, la clause la plus favorable au salarié s'applique." },

  // ---- Chapitre III-A
  { ch: "ch3a", q: "Art. 9 al. 1 C. civ.", a: "« Chacun a droit au respect de sa vie privée. »" },
  { ch: "ch3a", q: "Art. 226-1 C. pén. : les 2 formes du délit", a: "Capter/enregistrer/transmettre sans consentement des paroles privées ; fixer/enregistrer/transmettre sans consentement l'image d'une personne dans un lieu privé." },
  { ch: "ch3a", q: "Donnée personnelle", a: "Toute information se rapportant à une personne physique identifiée ou identifiable, directement ou indirectement, par une donnée ou par croisement." },
  { ch: "ch3a", q: "Traitement de données personnelles", a: "Toute opération (collecte, enregistrement, conservation, consultation, communication…) sur des données personnelles, informatique ou non, avec une finalité." },
  { ch: "ch3a", q: "Les 5 principes de la loi Informatique et Libertés", a: "Finalité, pertinence des données, respect des droits des personnes, conservation limitée, obligation de sécurité." },
  { ch: "ch3a", q: "Loi Informatique et Libertés : date et refonte", a: "6 janvier 1978 ; refonte le 6 août 2004 (directive 95/46, biométrie, pouvoir de sanction de la CNIL, CIL)." },
  { ch: "ch3a", q: "Art. 25 de la loi de 1978", a: "La collecte de données par un moyen frauduleux, déloyal ou illicite est interdite." },
  { ch: "ch3a", q: "Log file", a: "Fichier journal qui enregistre de façon séquentielle et datée les événements d'un système (connexions, installations, navigation)." },
  { ch: "ch3a", q: "Affaire AOL (2006)", a: "Publication d'un log de requêtes « anonymisé » : en croisant les recherches, des internautes ont été identifiés." },
  { ch: "ch3a", q: "Cookies : directive 2009/136/CE", a: "Stocker ou lire des informations sur le terminal exige l'accord de l'utilisateur après une information claire et complète sur les finalités." },
  { ch: "ch3a", q: "Deux techniques de vol de cookies", a: "Renifleur de paquets (sniffer) sur HTTP non chiffré ; script injecté (XSS) qui envoie document.cookie à un serveur pirate." },
  { ch: "ch3a", q: "L'employeur peut-il lire les mails personnels du salarié ?", a: "Non, même s'il a interdit l'usage personnel : secret des correspondances et respect de la vie privée (Nikon, 2001)." },
  { ch: "ch3a", q: "CNIL : statut", a: "Autorité administrative indépendante : agit au nom de l'État sans être sous l'autorité du gouvernement." },
  { ch: "ch3a", q: "CNIL : composition", a: "18 membres : 6 hautes juridictions, 5 personnalités qualifiées, 4 parlementaires, 2 CESE, 1 CADA." },
  { ch: "ch3a", q: "CNIL : pouvoirs", a: "Conseil et accompagnement, traitement des plaintes, contrôles sur place ou en ligne, mise en demeure, sanctions (amendes)." },
  { ch: "ch3a", q: "Consentir à une photo = autoriser sa diffusion ?", a: "Non : le consentement à être photographié est différent de l'autorisation de diffuser l'image." },
  { ch: "ch3a", q: "RGPD : date d'application", a: "25 mai 2018, dans toute l'Union européenne." },
  { ch: "ch3a", q: "RGPD : 3 apports par rapport à la loi de 1978", a: "Harmonise les règles en Europe, renforce le contrôle des citoyens sur leurs données, remplace les déclarations par une logique de responsabilité (registre, DPO)." },
  { ch: "ch3a", q: "Les 4 questions pour savoir si le RGPD s'applique", a: "Données personnelles ? Traitement ? Activités exclusivement personnelles (non) ? Responsable ou moyens sur le territoire ?" },
  { ch: "ch3a", q: "ICANN", a: "Société de droit privé américain d'intérêt public qui gère les adresses IP et le système des noms de domaine (DNS)." },
  { ch: "ch3a", q: "AFNIC", a: "Association loi 1901 qui gère les extensions françaises (.fr, .re, .pm, .tf, .wf, .yt)." },
  { ch: "ch3a", q: "ARCEP", a: "Autorité de régulation des communications électroniques et des postes : contrôle le réseau (droit des télécoms)." },
  { ch: "ch3a", q: "Hébergeur : définition et responsabilité", a: "Stocke les contenus fournis par les utilisateurs. Non responsable sauf s'il connaissait le caractère illicite et n'a pas agi promptement. Conserve 1 an les données de connexion." },
  { ch: "ch3a", q: "Fournisseur de contenu (éditeur) : responsabilité", a: "Responsable pénalement et civilement du contenu et des liens hypertextes vers des sites contrefaits ou malfaisants." },
  { ch: "ch3a", q: "LCEN : date et apport pour opérateurs et FAI", a: "Loi du 21 juin 2004 : pas d'obligation générale de surveiller les informations transmises ou stockées." },
  { ch: "ch3a", q: "Durée de conservation des données de connexion (FAI, hébergeur)", a: "1 an, pour permettre la poursuite des infractions pénales." },
  { ch: "ch3a", q: "Règle d'attribution des noms de domaine", a: "Premier arrivé, premier servi, sous réserve de ne pas violer un droit de marque ou un signe distinctif." },
  { ch: "ch3a", q: "Affaire Dailymotion (Omar et Fred, 2008)", a: "Dailymotion est hébergeur et non éditeur : pas responsable des vidéos mises en ligne par les internautes." },
  { ch: "ch3a", q: "Une capture d'écran prouve-t-elle une publication ?", a: "Non si elle est contestée (TGI Paris, 10 avril 2013) : il faut un constat fiable (contenu, date, caractère public)." },
  { ch: "ch3a", q: "Affaire TATI", a: "Le salarié avait autorisé la publication de sa photo, pas sa modification (clin d'œil animé) : l'employeur est condamné." },
  { ch: "ch3a", q: "Naissance du Web", a: "Août 1991, au CERN, par Tim Berners-Lee et Robert Cailliau (HTTP, HTML)." },
  { ch: "ch3a", q: "ARPANET et Cyclades", a: "ARPANET : 1969, réseau du département américain de la Défense. Cyclades : réseau maillé français de Louis Pouzin (1970-1978)." },

  // ---- Chapitre III-B
  { ch: "ch3b", q: "Comment le logiciel est-il protégé ?", a: "Par le droit d'auteur (non brevetable) et le droit des contrats ; 70 ans." },
  { ch: "ch3b", q: "Textes fondateurs de la protection du logiciel", a: "Directive du 14 mai 1991, transposée par la loi du 10 mai 1994 ; définition dans l'arrêté du 22 décembre 1981." },
  { ch: "ch3b", q: "Condition de protection d'un logiciel", a: "L'originalité : effort personnalisé allant au-delà d'une logique automatique et contraignante (appréciation souveraine du juge)." },
  { ch: "ch3b", q: "Art. L113-9 CPI", a: "Les droits patrimoniaux sur les logiciels créés par des employés dans l'exercice de leurs fonctions appartiennent à l'employeur." },
  { ch: "ch3b", q: "Droits patrimoniaux de l'auteur d'un logiciel (L122-6)", a: "Reproduction, adaptation, distribution." },
  { ch: "ch3b", q: "Exceptions sans autorisation de l'auteur (L122-6-1)", a: "Correction des erreurs (sauf clause contraire), copie de sauvegarde, décompilation pour l'interopérabilité." },
  { ch: "ch3b", q: "Droit moral sur un logiciel (L121-7)", a: "Réduit : l'auteur ne peut s'opposer à une modification non préjudiciable à son honneur, ni exercer son droit de repentir ou de retrait." },
  { ch: "ch3b", q: "Droit moral : caractères et prérogatives", a: "Inaliénable et perpétuel : paternité, divulgation, respect de l'intégrité, retrait/repentir." },
  { ch: "ch3b", q: "Copyleft", a: "Principe du logiciel libre, opposé au copyright : garantit la gratuité et la liberté d'utilisation, de modification et de redistribution." },
  { ch: "ch3b", q: "Saisie-contrefaçon de logiciel (L332-4)", a: "Autorisée sur requête par le président du TGI, réalisée par un huissier et un expert ; 15 jours pour assigner, à peine de nullité." },
  { ch: "ch3b", q: "Les 3 formes de contrat de fourniture de logiciel", a: "Prêt (rare), cession (vente), droit d'usage / licence (bail ou exploitation)." },
  { ch: "ch3b", q: "Contrat de conception de logiciel", a: "Contrat d'entreprise : obligation de moyens + obligation de conseil." },
  { ch: "ch3b", q: "Obligation de conseil", a: "Adapter le produit au besoin du client et le mettre en garde contre les difficultés prévisibles. Manquement ⇒ résolution + dommages-intérêts." },
  { ch: "ch3b", q: "Contrat de maintenance", a: "Obligation préventive et curative du mainteneur ; obligation de moyens." },
  { ch: "ch3b", q: "Clause de secours", a: "En cas de panne sérieuse, mise à disposition du client d'un système compatible avec ses besoins." },
  { ch: "ch3b", q: "Définition juridique d'une base de données (L112-3)", a: "Recueil d'œuvres, données ou éléments indépendants, disposés de manière systématique ou méthodique et individuellement accessibles." },
  { ch: "ch3b", q: "Protection sui generis de la base de données", a: "15 ans pour le producteur ayant fait un investissement substantiel ; chaque nouvel investissement substantiel relance le délai." },
  { ch: "ch3b", q: "Affaire SFES c. Tigest (CA Paris 2001)", a: "Extraction d'une partie substantielle d'un annuaire d'exposants (base de données, investissements substantiels) sans autorisation : condamnation." },
  { ch: "ch3b", q: "Fonctions de la signature électronique", a: "Authentification de l'expéditeur, intégrité du message, non-répudiation." },
  { ch: "ch3b", q: "Fonction de hachage", a: "Produit un condensé unique d'un texte ; toute modification change le haché ; à sens unique (on ne retrouve pas le texte)." },
  { ch: "ch3b", q: "Fonction « à brèche secrète »", a: "Fonction de hachage pour laquelle il existe un moyen secret de retrouver le message à partir du haché." },
  { ch: "ch3b", q: "Art. 1316-1 C. civ.", a: "L'écrit électronique a la même force probante que l'écrit papier si son auteur est identifié et son intégrité garantie." },
  { ch: "ch3b", q: "Art. 1316-4 C. civ.", a: "La signature électronique est un procédé fiable d'identification garantissant son lien avec l'acte ; fiabilité présumée sous conditions." },
  { ch: "ch3b", q: "Les classes de certificat", a: "1 : e-mail seul ; 2 : pièce d'identité à distance ; 3 : face à face ; 3+ : face à face + carte à puce." },
  { ch: "ch3b", q: "Zip signé électroniquement (TA Toulouse 2011)", a: "Signer le zip ne signe pas les documents qu'il contient : les scans de documents signés à la main ne valent pas signature électronique." },
  { ch: "ch3b", q: "Bulletin de paie électronique : conservation", a: "Employeur : 5 ans. Salarié : sans limitation de durée." },
  { ch: "ch3b", q: "Définition du multimédia (cours)", a: "Réunion sur un même support numérique d'éléments différents (images, sons, textes) régis par un logiciel. Ex. jeux vidéo, sites web." },
  { ch: "ch3b", q: "Œuvre de collaboration / œuvre collective", a: "Collaboration : plusieurs auteurs, propriété commune. Collective : à l'initiative d'une personne qui l'édite sous son nom, contributions fondues." },
  { ch: "ch3b", q: "Hadopi", a: "Haute Autorité créée par la loi Création et Internet du 12 juin 2009 : offre légale, réponse graduée, sensibilisation (devenue Arcom en 2022)." },
  { ch: "ch3b", q: "Durée du droit d'auteur (L123-1)", a: "Dès la création sans formalité ; jusqu'à l'année civile du décès + 70 ans pour les ayants droit." },
  { ch: "ch3b", q: "Bien rival / non rival", a: "Rival : utilisable par une seule personne à la fois (stylo). Non rival : duplicable à l'infini (fichier numérique), d'où l'importance des licences." }
];

// ============================================================
// QCM : answer = index de la bonne réponse
// ============================================================
const QUIZ = [
  // Ch I
  { ch: "ch1", q: "Quel article du Code civil pose le principe de la force obligatoire du contrat ?", c: ["Art. 1102", "Art. 1103", "Art. 1104", "Art. 1101"], a: 1, e: "Art. 1103 : les contrats légalement formés tiennent lieu de loi à ceux qui les ont faits." },
  { ch: "ch1", q: "Le juge peut-il modifier un contrat qu'il trouve injuste pour une partie ?", c: ["Oui, toujours", "Oui, si une partie le demande", "Non, il est tenu de respecter le contrat", "Oui, s'il est d'adhésion"], a: 2, e: "Selon le cours, le juge est tenu de respecter le contrat et ne peut le modifier, même s'il est injuste." },
  { ch: "ch1", q: "Depuis l'ordonnance de 2016, l'exigence de bonne foi s'applique :", c: ["Uniquement à l'exécution du contrat", "À la négociation, la formation et l'exécution", "Uniquement aux contrats de consommation", "Seulement si le contrat le prévoit"], a: 1, e: "Art. 1104 : négociés, formés et exécutés de bonne foi ; disposition d'ordre public." },
  { ch: "ch1", q: "Lequel n'est PAS un vice du consentement ?", c: ["L'erreur", "Le dol", "La violence", "La force majeure"], a: 3, e: "Les vices sont l'erreur, le dol et la violence (+ lésion). La force majeure concerne l'inexécution." },
  { ch: "ch1", q: "Un vendeur cache volontairement qu'un ordinateur a déjà été réparé pour une panne carte mère, information qu'il sait décisive pour l'acheteur. C'est :", c: ["Une erreur sur la valeur", "Une réticence dolosive", "Un dolus bonus", "Une violence économique"], a: 1, e: "Dissimulation intentionnelle d'une information déterminante : réticence dolosive (art. 1137)." },
  { ch: "ch1", q: "Une erreur sur la valeur d'un bien (payer trop cher) :", c: ["Entraîne la nullité absolue", "Entraîne la nullité relative", "Est une erreur indifférente, pas de nullité", "Est un dol"], a: 2, e: "Les erreurs sur la valeur ou les motifs sont indifférentes." },
  { ch: "ch1", q: "Qui peut demander la nullité relative d'un contrat ?", c: ["Toute personne intéressée", "Le ministère public seulement", "Seulement la personne que la loi veut protéger", "Le juge d'office"], a: 2, e: "La nullité relative protège un intérêt particulier : seule la personne protégée peut l'invoquer." },
  { ch: "ch1", q: "Délai de prescription de la nullité relative selon le cours :", c: ["2 ans", "5 ans", "10 ans", "30 ans"], a: 1, e: "5 ans (la nullité absolue : 30 ans selon le cours)." },
  { ch: "ch1", q: "Selon l'art. 1146, sont incapables de contracter :", c: ["Les mineurs émancipés", "Les mineurs non émancipés et les majeurs protégés", "Les étrangers", "Les personnes morales"], a: 1, e: "Mineurs non émancipés et majeurs protégés (sauvegarde de justice, curatelle, tutelle)." },
  { ch: "ch1", q: "Une société peut contracter :", c: ["Sans limite", "Dans la limite de son objet social, par un représentant", "Jamais, seul le gérant contracte en son nom propre", "Uniquement devant notaire"], a: 1, e: "Les personnes morales ont une capacité limitée à leur objet et agissent par un représentant." },
  { ch: "ch1", q: "Un contrat de vente conclu par écrit est :", c: ["Solennel, puisqu'il est écrit", "Réel", "Consensuel : l'écrit sert de preuve", "Unilatéral"], a: 2, e: "La vente est consensuelle (formée par l'accord sur la chose et le prix) ; l'écrit n'est qu'une preuve." },
  { ch: "ch1", q: "Lequel est un contrat solennel ?", c: ["La vente d'un vélo", "La donation", "Le bail d'habitation", "Le contrat de transport"], a: 1, e: "La donation exige un acte notarié : contrat solennel. (Mariage, vente immobilière, hypothèque aussi.)" },
  { ch: "ch1", q: "Le prêt d'argent entre deux particuliers est :", c: ["Consensuel et synallagmatique", "Réel et unilatéral", "Solennel et aléatoire", "Consensuel et gratuit"], a: 1, e: "Formé par la remise des fonds (réel) ; ensuite seul l'emprunteur est obligé (unilatéral)." },
  { ch: "ch1", q: "Un contrat d'assurance est :", c: ["Commutatif", "Aléatoire", "Gratuit", "Réel"], a: 1, e: "La prestation de l'assureur dépend d'un événement incertain : contrat aléatoire." },
  { ch: "ch1", q: "Un abonnement à Internet chez un opérateur est un contrat :", c: ["De gré à gré", "D'adhésion", "Solennel", "Unilatéral"], a: 1, e: "Conditions imposées par l'opérateur, le client adhère (art. 1110)." },
  { ch: "ch1", q: "Le cautionnement est, selon le cours, un contrat :", c: ["À titre onéreux", "À titre gratuit", "Aléatoire", "Synallagmatique"], a: 1, e: "Le cours le classe parmi les actes à titre gratuit (avec la donation et le bail sans loyer)." },
  { ch: "ch1", q: "Un contrat d'abonnement non réglementé par le Code civil est :", c: ["Nommé", "Innommé", "Solennel", "Collectif"], a: 1, e: "Exemple du cours : contrat d'abonnement, de déménagement = innommés." },
  { ch: "ch1", q: "La résiliation d'un bail :", c: ["Anéantit le contrat rétroactivement", "Met fin au contrat pour l'avenir seulement", "Oblige à rembourser tous les loyers", "Est impossible"], a: 1, e: "Résiliation = pour l'avenir, sans restitution. Résolution = rétroactive." },
  { ch: "ch1", q: "Face à un débiteur qui refuse de démolir un mur construit illégalement, le juge peut :", c: ["Le contraindre physiquement", "Ordonner la démolition à ses frais ou prononcer une astreinte", "Rien, seuls des dommages-intérêts sont possibles", "Annuler le contrat"], a: 1, e: "Exceptions à l'obligation de faire : démolition aux frais du débiteur, astreinte…" },
  { ch: "ch1", q: "L'effet relatif du contrat signifie que :", c: ["Le contrat peut être modifié par le juge", "Le contrat ne lie que les parties, pas les tiers", "Le contrat est valable un temps limité", "Le contrat est relatif à un objet"], a: 1, e: "Les tiers ne sont pas tenus d'un contrat auquel ils n'ont pas participé (sauf exceptions)." },
  { ch: "ch1", q: "La notion de cause depuis 2016 :", c: ["A disparu avec tous ses effets", "Est supprimée du Code civil mais ses effets demeurent", "Est devenue la 1re condition de validité", "Ne concerne que le droit du travail"], a: 1, e: "On parle maintenant de contenu du contrat, qui doit être licite et certain." },

  // Ch II
  { ch: "ch2", q: "Quel élément distingue un salarié d'un prestataire indépendant ?", c: ["La rémunération", "Le lien de subordination", "La durée du contrat", "Le lieu de travail"], a: 1, e: "Le lien de subordination : travail sous l'autorité d'un employeur qui dirige, contrôle et sanctionne." },
  { ch: "ch2", q: "Quel contrat peut être conclu oralement ?", c: ["Le CDD", "Le CDI à temps partiel", "Le CDI à temps complet", "Le contrat d'apprentissage"], a: 2, e: "Seul le CDI à temps complet n'exige pas d'écrit (L1221-1)." },
  { ch: "ch2", q: "Durée maximale de la période d'essai d'un technicien en CDI (hors renouvellement) :", c: ["2 mois", "3 mois", "4 mois", "6 mois"], a: 1, e: "2 mois ouvriers/employés, 3 mois agents de maîtrise et techniciens, 4 mois cadres." },
  { ch: "ch2", q: "Une clause de non-concurrence sans contrepartie financière est :", c: ["Valable si elle est courte", "Nulle", "Valable pour les cadres", "Transformée en clause de confidentialité"], a: 1, e: "La contrepartie financière est une condition de validité." },
  { ch: "ch2", q: "Quelle sanction est interdite à l'employeur ?", c: ["La mise à pied", "La rétrogradation", "La retenue sur salaire", "L'avertissement"], a: 2, e: "Les sanctions pécuniaires sont interdites." },
  { ch: "ch2", q: "La faute lourde suppose :", c: ["Une répétition de fautes légères", "Une intention de nuire à l'employeur", "Un accident du travail", "Un retard de plus d'une heure"], a: 1, e: "Faute intentionnelle avec volonté de nuire (détournement de clientèle, sabotage…)." },
  { ch: "ch2", q: "En cas de faute grave, le salarié perçoit :", c: ["Préavis et indemnité de licenciement", "Seulement l'indemnité compensatrice de congés payés", "Rien du tout", "Une indemnité de précarité"], a: 1, e: "Pas de préavis ni d'indemnité de licenciement, mais les congés payés acquis restent dus." },
  { ch: "ch2", q: "Un licenciement sans cause réelle et sérieuse est :", c: ["Nul de plein droit", "Abusif : indemnité ou réintégration", "Valable si la procédure est respectée", "Requalifié en démission"], a: 1, e: "Le tribunal accorde une indemnité, sauf réintégration." },
  { ch: "ch2", q: "Ordre de la procédure de licenciement pour motif personnel :", c: ["Notification, entretien, convocation", "Convocation, entretien, notification", "Entretien, convocation, notification", "Convocation, notification, entretien"], a: 1, e: "Convocation par LRAR, entretien préalable, notification motivée." },
  { ch: "ch2", q: "Combien de fois peut-on renouveler un CDD ?", c: ["Jamais", "Une fois", "Deux fois", "Sans limite"], a: 2, e: "Deux fois, dans la limite de la durée maximale (18 mois en général)." },
  { ch: "ch2", q: "On ne peut PAS recourir à un CDD pour :", c: ["Remplacer un salarié en congé maternité", "Remplacer un salarié en grève", "Un emploi saisonnier", "Un accroissement temporaire d'activité"], a: 1, e: "Remplacer un gréviste est interdit." },
  { ch: "ch2", q: "Montant de l'indemnité de précarité :", c: ["5 % du salaire brut", "10 % du salaire brut", "1/10e des congés", "Un mois de salaire"], a: 1, e: "10 % du salaire brut total." },
  { ch: "ch2", q: "L'intérimaire est juridiquement salarié :", c: ["De l'entreprise utilisatrice", "De l'entreprise de travail temporaire", "Des deux", "De Pôle emploi"], a: 1, e: "Contrat de mission avec l'ETT ; aucun lien contractuel avec l'entreprise utilisatrice." },
  { ch: "ch2", q: "Le CDD à objet précis dure :", c: ["6 à 12 mois", "18 à 36 mois", "Au plus 18 mois", "Sans limite"], a: 1, e: "18 à 36 mois, non renouvelable, pour cadres et ingénieurs." },
  { ch: "ch2", q: "Pour l'indemnité de congés payés, on retient :", c: ["Toujours la règle du 1/10e", "Toujours le maintien de salaire", "Le calcul le plus favorable au salarié", "Le choix de l'employeur"], a: 2, e: "On compare 1/10e et maintien de salaire, et on applique le plus avantageux." },
  { ch: "ch2", q: "Selon le cours, un plan social est obligatoire quand :", c: ["L'entreprise licencie 2 salariés", "L'entreprise d'au moins 50 salariés licencie au moins 10 personnes sur 30 jours", "Le salarié a plus de 10 ans d'ancienneté", "Le licenciement est pour faute"], a: 1, e: "Seuil : 50 salariés, 10 licenciements économiques sur 30 jours." },
  { ch: "ch2", q: "Repos quotidien minimum :", c: ["8 h", "10 h", "11 h consécutives", "24 h"], a: 2, e: "11 h consécutives par jour ; 24 h + 11 h par semaine." },

  // Ch III-A
  { ch: "ch3a", q: "Quand est entrée en application le RGPD ?", c: ["6 janvier 1978", "6 août 2004", "25 mai 2018", "21 juin 2004"], a: 2, e: "25 mai 2018 dans toute l'UE." },
  { ch: "ch3a", q: "Lequel n'est PAS un des 5 grands principes de la loi Informatique et Libertés ?", c: ["Finalité", "Pertinence", "Gratuité du traitement", "Conservation limitée"], a: 2, e: "Les 5 : finalité, pertinence, respect des droits, conservation limitée, sécurité." },
  { ch: "ch3a", q: "Un numéro client sans nom associé est-il une donnée personnelle ?", c: ["Non, il n'y a pas de nom", "Oui, il permet d'identifier indirectement une personne", "Seulement s'il est chiffré", "Seulement pour les mineurs"], a: 1, e: "Une personne identifiable indirectement (identifiant, téléphone…) suffit." },
  { ch: "ch3a", q: "La CNIL est :", c: ["Un ministère", "Une autorité administrative indépendante", "Une association loi 1901", "Une juridiction pénale"], a: 1, e: "AAI : agit au nom de l'État sans être sous l'autorité du gouvernement." },
  { ch: "ch3a", q: "Combien de membres compte la CNIL selon le cours ?", c: ["12", "15", "18", "25"], a: 2, e: "18 membres (6 + 5 + 4 + 2 + 1)." },
  { ch: "ch3a", q: "Un hébergeur est responsable d'une vidéo illicite mise en ligne par un internaute :", c: ["Toujours", "Jamais", "S'il en avait connaissance et ne l'a pas retirée promptement", "Seulement si le site est payant"], a: 2, e: "Régime de la LCEN (21 juin 2004)." },
  { ch: "ch3a", q: "Combien de temps le FAI conserve-t-il les données de connexion ?", c: ["1 mois", "6 mois", "1 an", "5 ans"], a: 2, e: "1 an, pour la poursuite des infractions pénales (même obligation pour l'hébergeur)." },
  { ch: "ch3a", q: "L'employeur a interdit l'usage personnel de la messagerie. Peut-il lire les mails personnels du salarié ?", c: ["Oui, l'interdiction l'y autorise", "Non, secret des correspondances", "Oui, si le salarié est en période d'essai", "Oui, avec l'accord de la CNIL"], a: 1, e: "Même en cas d'interdiction, respect de la vie privée et secret des correspondances." },
  { ch: "ch3a", q: "Quel organisme gère les noms de domaine en .fr ?", c: ["L'ICANN", "L'ARCEP", "L'AFNIC", "La CNIL"], a: 2, e: "L'AFNIC, association loi 1901, par délégation de l'IANA sous contrôle de l'ICANN." },
  { ch: "ch3a", q: "Le délit d'atteinte à la vie privée est prévu par :", c: ["L'art. 9 C. civ.", "L'art. 226-1 C. pén.", "L'art. 1104 C. civ.", "L'art. L113-9 CPI"], a: 1, e: "Art. 226-1 du Code pénal (l'art. 9 C. civ. pose le droit civil au respect de la vie privée)." },
  { ch: "ch3a", q: "Un cookie publicitaire peut être déposé :", c: ["Sans condition", "Après information et accord de l'utilisateur", "Seulement en HTTPS", "Seulement sur mobile"], a: 1, e: "Directive 2009/136/CE : accord après information claire et complète (les cookies techniques sont exemptés)." },
  { ch: "ch3a", q: "Dans l'affaire Omar et Fred c. Dailymotion, Dailymotion a été qualifié :", c: ["D'éditeur responsable", "D'hébergeur non responsable", "De contrefacteur", "D'opérateur télécom"], a: 1, e: "Hébergeur : il ne détermine pas les contenus mis en ligne par les internautes." },
  { ch: "ch3a", q: "Lankome.com déposé face à la marque Lancôme est :", c: ["Licite (premier arrivé, premier servi)", "Un acte de concurrence déloyale (risque de confusion)", "Un délit d'atteinte à la vie privée", "Autorisé si l'extension est différente"], a: 1, e: "Les signes distinctifs d'autrui ne peuvent être choisis : risque de confusion = concurrence déloyale." },
  { ch: "ch3a", q: "Le World Wide Web est né :", c: ["En 1969 à l'ARPA", "En 1991 au CERN", "En 1985 à la NSF", "En 1994 en France"], a: 1, e: "Août 1991, CERN, Tim Berners-Lee et Robert Cailliau." },

  // Ch III-B
  { ch: "ch3b", q: "En France, un logiciel est protégé par :", c: ["Un brevet", "Le droit d'auteur", "Le droit des marques", "Aucune protection"], a: 1, e: "Non brevetable, il relève du droit d'auteur (+ droit des contrats)." },
  { ch: "ch3b", q: "Un développeur salarié crée un logiciel dans le cadre de ses fonctions. Les droits patrimoniaux appartiennent :", c: ["Au développeur", "À l'employeur", "Aux deux à parts égales", "Au domaine public"], a: 1, e: "Art. L113-9 CPI, sauf stipulation contraire." },
  { ch: "ch3b", q: "Un développeur freelance livre un site sans clause de cession. Qui détient les droits patrimoniaux ?", c: ["Le client, puisqu'il a payé", "Le freelance", "L'hébergeur", "La CNIL"], a: 1, e: "L113-9 ne vise que les salariés : sans cession écrite, le freelance reste titulaire." },
  { ch: "ch3b", q: "Quelle opération l'utilisateur légitime peut-il faire sans autorisation de l'auteur ?", c: ["Revendre des copies", "Faire une copie de sauvegarde", "Distribuer le code source", "Modifier puis commercialiser"], a: 1, e: "Copie de sauvegarde (droit « consacré »), correction d'erreurs, décompilation pour l'interopérabilité." },
  { ch: "ch3b", q: "Le contrat de conception de logiciel met à la charge du prestataire :", c: ["Une obligation de résultat", "Une obligation de moyens et de conseil", "Aucune obligation", "Une obligation de garantie décennale"], a: 1, e: "Contrat d'entreprise : obligation de moyens + obligation de conseil." },
  { ch: "ch3b", q: "Durée de la protection sui generis d'une base de données :", c: ["5 ans", "15 ans, relancés par chaque nouvel investissement substantiel", "70 ans", "Illimitée"], a: 1, e: "15 ans à partir du 1er janvier suivant l'achèvement ; relancé par un nouvel investissement." },
  { ch: "ch3b", q: "La non-répudiation garantit que :", c: ["Le message n'a pas été modifié", "L'expéditeur ne peut nier avoir envoyé le message", "Le message est chiffré", "Le destinataire a lu le message"], a: 1, e: "L'intégrité, c'est la non-modification ; la non-répudiation empêche de nier l'envoi." },
  { ch: "ch3b", q: "Une fonction de hachage est :", c: ["Réversible", "À sens unique : on ne retrouve pas le texte depuis le condensé", "Un algorithme de compression sans perte", "Une clé publique"], a: 1, e: "À sens unique ; la moindre modification change le haché." },
  { ch: "ch3b", q: "Un certificat de classe 3 exige :", c: ["Une adresse e-mail", "Une copie de pièce d'identité envoyée à distance", "Une présentation physique du demandeur", "Aucune vérification"], a: 2, e: "Classe 3 : face à face ; 3+ : face à face + carte à puce." },
  { ch: "ch3b", q: "Combien de temps l'employeur conserve-t-il les bulletins de paie ?", c: ["1 an", "3 ans", "5 ans", "Sans limite"], a: 2, e: "5 ans pour l'employeur, sans limite pour le salarié." },
  { ch: "ch3b", q: "Un jeu vidéo est, selon le cours, un exemple :", c: ["De base de données", "D'œuvre multimédia", "De contrat innommé", "De logiciel libre"], a: 1, e: "Multimédia : images, sons, textes réunis sur un support numérique et régis par un logiciel." },
  { ch: "ch3b", q: "L'Hadopi a été créée par :", c: ["La LCEN de 2004", "La loi Création et Internet du 12 juin 2009", "Le RGPD", "La loi du 10 mai 1994"], a: 1, e: "Loi « Hadopi » du 12 juin 2009." },
  { ch: "ch3b", q: "Auteur mort en 1960 : son œuvre entre dans le domaine public :", c: ["En 2010", "Le 1er janvier 2031 (protégée jusqu'à fin 2030)", "En 2060", "Jamais"], a: 1, e: "Année du décès + 70 ans : protégée jusqu'au 31 décembre 2030." }
];

// ============================================================
// Questions de cours rédigées (corrigé = réponse modèle)
// ============================================================
const QUESTIONS = [
  { ch: "ch1", q: "Définissez le contrat et énoncez les trois principes qui gouvernent sa formation.",
    a: `<p>Le contrat est un <strong>accord de volontés</strong> entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations (art. 1101 C. civ., ordonnance du 10 février 2016).</p>
        <p>Trois principes, issus de l'autonomie de la volonté :</p>
        <ul><li><strong>Liberté contractuelle</strong> (art. 1102) : liberté de contracter ou non, de choisir son cocontractant, d'en fixer le contenu et la forme, dans les limites de la loi et de l'ordre public.</li>
        <li><strong>Force obligatoire</strong> (art. 1103) : le contrat tient lieu de loi aux parties ; il s'impose à elles et au juge.</li>
        <li><strong>Bonne foi</strong> (art. 1104) : à la négociation, la formation et l'exécution ; d'ordre public.</li></ul>` },
  { ch: "ch1", q: "Quelles sont les conditions de validité d'un contrat ? Que se passe-t-il si l'une d'elles manque ?",
    a: `<p>Quatre conditions selon le cours : <strong>consentement</strong> libre et éclairé, non vicié ; <strong>capacité</strong> juridique des parties ; <strong>objet</strong> existant, déterminé ou déterminable, dans le commerce, possible et licite ; <strong>cause</strong> licite (supprimée en 2016 au profit du « contenu licite et certain », art. 1128, mais ses effets demeurent).</p>
        <p>Si une condition manque, le contrat est <strong>nul</strong> : nullité <strong>relative</strong> (intérêt particulier : vice du consentement, incapacité ; action de la seule personne protégée ; 5 ans) ou <strong>absolue</strong> (intérêt général : objet ou cause illicite, absence de consentement ; toute personne intéressée ; 30 ans selon le cours). Dans les deux cas, anéantissement rétroactif et restitutions.</p>` },
  { ch: "ch1", q: "Présentez les vices du consentement.",
    a: `<ul><li><strong>Erreur</strong> : fausse représentation de la réalité, de bonne foi. Nullité si elle porte sur les qualités essentielles de la prestation ou du cocontractant et est déterminante ; pas si elle est inexcusable ni si elle porte sur la valeur ou les motifs. Ex. : copie achetée pour un tableau de maître.</li>
        <li><strong>Dol</strong> (art. 1137-1139) : manœuvres ou mensonges intentionnels pour obtenir le consentement, y compris la <strong>réticence dolosive</strong> (taire une information qu'on sait déterminante). Le dolus bonus (exagération commerciale) est toléré.</li>
        <li><strong>Violence</strong> (art. 1142) : contrainte physique, morale ou financière, venant du cocontractant ou d'un tiers. Ex. : CA Paris 2000, cession de droits d'auteur sous menace de licenciement.</li>
        <li>On peut ajouter la <strong>lésion</strong> (déséquilibre grave, admise dans certains cas : vente d'immeuble lésée de plus des 7/12, mineurs).</li></ul>
        <p>Sanction : nullité relative.</p>` },
  { ch: "ch1", q: "Distinguez nullité relative et nullité absolue.",
    a: `<table class="tbl"><tr><th></th><th>Relative</th><th>Absolue</th></tr>
        <tr><td>Protège</td><td>Un intérêt particulier</td><td>L'intérêt général, l'ordre public</td></tr>
        <tr><td>Causes</td><td>Vices du consentement, incapacité</td><td>Objet/cause illicite, absence de consentement, défaut de forme d'un contrat solennel</td></tr>
        <tr><td>Qui agit</td><td>La personne protégée</td><td>Toute personne intéressée</td></tr>
        <tr><td>Prescription</td><td>5 ans</td><td>30 ans (cours)</td></tr></table>
        <p>Effets identiques : anéantissement rétroactif, restitution des prestations.</p>` },
  { ch: "ch1", q: "Qu'est-ce qu'un contrat consensuel, solennel et réel ? Donnez un exemple de chaque.",
    a: `<ul><li><strong>Consensuel</strong> : formé par le seul échange des consentements, sans forme particulière (art. 1109) ; c'est le principe (art. 1172). Ex. : vente.</li>
        <li><strong>Solennel</strong> : validité subordonnée à une formalité, souvent un acte authentique. Ex. : donation, contrat de mariage, vente immobilière.</li>
        <li><strong>Réel</strong> : formé par la remise d'une chose. Ex. : prêt entre particuliers, dépôt, gage.</li></ul>
        <p>Intérêt : les contrats formels sont plus faciles à prouver.</p>` },
  { ch: "ch1", q: "Distinguez contrat synallagmatique et unilatéral, à titre onéreux et à titre gratuit.",
    a: `<p><strong>Synallagmatique</strong> (art. 1106) : obligations réciproques (vente, bail). <strong>Unilatéral</strong> : une seule partie obligée (donation, promesse unilatérale de vente). Un contrat unilatéral n'est pas forcément gratuit (prêt à intérêt entre particuliers).</p>
        <p><strong>Onéreux</strong> (art. 1107) : chaque partie reçoit une contrepartie, pas forcément en argent (vente, bail, échange). <strong>Gratuit</strong> : avantage sans contrepartie (donation, bail sans loyer, cautionnement) ; plus encadré par la loi.</p>` },
  { ch: "ch1", q: "Quelles sont les conséquences de l'inexécution d'un contrat ?",
    a: `<p><strong>Exécution forcée</strong> selon la nature de l'obligation : obligation de donner ⇒ exécution en nature (saisie des biens, achat aux frais du débiteur, saisie d'un corps certain) ; obligation de faire ou ne pas faire ⇒ en principe dommages-intérêts, exceptionnellement exécution en nature (démolition, exécution par un tiers, expulsion, astreinte).</p>
        <p><strong>Résolution</strong> (anéantissement rétroactif avec restitutions) ou <strong>résiliation</strong> (fin pour l'avenir, pour les contrats successifs), éventuellement de plein droit grâce à une clause résolutoire.</p>` },
  { ch: "ch1", q: "Expliquez la force obligatoire et l'effet relatif du contrat.",
    a: `<p><strong>Force obligatoire</strong> (art. 1103) : le contrat s'impose aux parties, qui ne peuvent le modifier ou le rompre que d'un commun accord, et au juge, qui doit l'appliquer sans le modifier. Exceptions : clauses abusives, lois impératives, contrats rompus unilatéralement (CDI).</p>
        <p><strong>Effet relatif</strong> : le contrat ne produit d'effets qu'entre les parties ; les tiers ne sont ni créanciers ni débiteurs. Exceptions : héritiers (ayants cause universels), personnes représentées, conventions collectives, proches du locataire.</p>` },
  { ch: "ch2", q: "Définissez le contrat de travail, ses éléments et ses caractères.",
    a: `<p>Convention par laquelle un salarié s'engage à mettre sa force de travail à la disposition d'un employeur, sous sa direction, moyennant rémunération.</p>
        <p><strong>3 éléments</strong> : travail, rémunération, lien de subordination.</p>
        <p><strong>Caractères</strong> : synallagmatique, à titre onéreux, consensuel (CDI à temps complet), d'adhésion, intuitu personae, à exécution successive, à durée indéterminée ou déterminée, nommé.</p>` },
  { ch: "ch2", q: "Quelles sont les conditions de forme et de fond du contrat de travail ?",
    a: `<p><strong>Forme</strong> : le CDI à temps complet peut être verbal (L1221-1) mais la directive 91/533 impose un document écrit dans les 2 mois (le bulletin de paie y pourvoit) ; tous les autres contrats sont écrits ; rédaction en français ; clauses obligatoires (parties, fonctions, lieu, durée, rémunération, avantages, convention collective…).</p>
        <p><strong>Fond</strong> : celles de tout contrat. Consentement non vicié ; capacité (employeur personne physique ou morale, salarié personne physique majeure ; mineur de 16-17 ans avec accord parental) ; objet (travail contre salaire) licite ; cause licite.</p>` },
  { ch: "ch2", q: "Présentez les clauses particulières du contrat de travail.",
    a: `<ul><li><strong>Période d'essai</strong> : vérifier les aptitudes ; rupture libre sans indemnité ; renouvelable une fois ; max 2/3/4 mois selon la catégorie.</li>
        <li><strong>Non-concurrence</strong> : interdit de concurrencer l'ancien employeur ; valable si écrite, nécessaire aux intérêts légitimes, limitée dans le temps et l'espace, adaptée à l'emploi, avec contrepartie financière.</li>
        <li><strong>Mobilité</strong> : accepter par avance une mutation (sinon mutation = modification du contrat).</li>
        <li><strong>Résultat / objectifs</strong> : objectif quantitatif, licenciement possible s'il n'est pas atteint.</li>
        <li><strong>Dédit-formation</strong> : rester un temps après une formation, sinon rembourser.</li></ul>` },
  { ch: "ch2", q: "Qu'est-ce qu'une cause réelle et sérieuse de licenciement ? Quel est son rôle ?",
    a: `<p>Tout licenciement, personnel ou économique, doit reposer sur une cause <strong>réelle</strong> (objective, exacte, vérifiable, pas un prétexte) et <strong>sérieuse</strong> (assez grave pour rendre impossible la poursuite du contrat sans dommage pour l'entreprise).</p>
        <p>Rôle : c'est la <strong>condition de légitimité</strong> du licenciement. Le juge (conseil de prud'hommes) vérifie son existence ; à défaut, le licenciement est abusif et l'employeur verse une indemnité, sauf réintégration. Elle détermine aussi, selon la gravité de la faute (légère, grave, lourde), les indemnités dues.</p>` },
  { ch: "ch2", q: "Comparez faute légère, faute grave et faute lourde.",
    a: `<table class="tbl"><tr><th>Faute</th><th>Définition</th><th>Effets</th></tr>
        <tr><td>Légère</td><td>Manquement mineur, motif de licenciement s'il se répète</td><td>Préavis + indemnité de licenciement + congés payés</td></tr>
        <tr><td>Grave</td><td>Rend impossible le maintien du salarié (insubordination, ivresse, violences)</td><td>Départ immédiat, ni préavis ni indemnité de licenciement ; congés payés dus</td></tr>
        <tr><td>Lourde</td><td>Intention de nuire (détournement de clientèle, sabotage)</td><td>Aucune indemnité selon le cours</td></tr></table>
        <p>C'est le juge qui qualifie la faute, pas le contrat de travail.</p>` },
  { ch: "ch2", q: "Décrivez la procédure de licenciement pour motif personnel puis pour motif économique.",
    a: `<p><strong>Motif personnel</strong> : convocation par lettre recommandée à un entretien préalable ; entretien où l'employeur expose les motifs (salarié assisté) ; notification par lettre recommandée motivée au moins un jour franc après. Applicable quels que soient l'effectif et l'ancienneté.</p>
        <p><strong>Motif économique individuel</strong> : même procédure + convention de conversion + information de l'administration ; lettre au moins 7 jours après l'entretien.</p>
        <p><strong>Collectif</strong> : consultation des représentants du personnel, critères d'ordre (ancienneté, charges de famille), entretiens, lettres précisant le motif ; plan social si au moins 50 salariés et 10 licenciements sur 30 jours.</p>` },
  { ch: "ch2", q: "Quelles indemnités et quels documents sont dus en fin de contrat ?",
    a: `<ul><li><strong>Préavis</strong> ou indemnité compensatrice de préavis (brusque rupture).</li>
        <li><strong>Indemnité de licenciement</strong> : au moins 1 an d'ancienneté, pas de faute grave/lourde ; 1/5 de mois par an + 2/15 au-delà de 10 ans (cours).</li>
        <li><strong>Indemnité compensatrice de congés payés</strong> : 1/10e ou maintien de salaire, le plus favorable.</li>
        <li>CDD/intérim : <strong>indemnité de précarité</strong> de 10 %.</li>
        <li>Documents : <strong>certificat de travail</strong> (dates, emplois, rien de nuisible), <strong>reçu pour solde de tout compte</strong> (dénonçable 2 mois selon le cours), <strong>attestation Pôle emploi</strong>.</li></ul>` },
  { ch: "ch2", q: "Présentez le régime du CDD.",
    a: `<p>Contrat écrit pour une tâche précise et temporaire ; il ne peut pourvoir durablement un emploi permanent (L1242-1).</p>
        <ul><li><strong>Cas autorisés</strong> : remplacement d'un absent, accroissement temporaire d'activité, saisonnier, emploi temporaire par nature.</li>
        <li><strong>Interdits</strong> : remplacer un gréviste, travaux dangereux, poste supprimé depuis moins de 6 mois.</li>
        <li><strong>Durée</strong> : 18 mois (9 / 24 dans certains cas) ; renouvelable 2 fois.</li>
        <li><strong>Fin</strong> : indemnité de précarité 10 % ; rupture anticipée seulement pour faute grave, force majeure, accord commun ou embauche en CDI.</li></ul>
        <p>Variante : CDD à objet précis (18-36 mois, cadres, non renouvelable).</p>` },
  { ch: "ch2", q: "Distinguez le CDD du contrat de travail temporaire.",
    a: `<p>Le salarié en CDD est <strong>salarié de l'entreprise</strong> où il travaille, seule la durée change. L'intérimaire est salarié de l'<strong>entreprise de travail temporaire</strong> (contrat de mission) qui le met à disposition d'une entreprise utilisatrice (contrat de mise à disposition, commercial) ; aucun lien contractuel avec l'utilisatrice.</p>
        <p>Points communs : mêmes cas de recours, clauses et durées ; précarité 10 %. Différence : l'ETT peut rompre une mission avant terme en proposant une mission équivalente sous 3 jours. Sanctions : 3 750 € et 6 mois.</p>` },
  { ch: "ch3a", q: "Expliquez les principes de la loi Informatique et Libertés et le rôle de la CNIL.",
    a: `<p>La loi du <strong>6 janvier 1978</strong> (refondue le 6 août 2004) encadre les traitements de données personnelles. <strong>5 principes</strong> : finalité déterminée et légitime ; pertinence (données nécessaires seulement) ; respect des droits des personnes (information, accès, rectification, opposition) ; conservation limitée ; sécurité. Elle interdit la collecte déloyale (art. 25) et des données sensibles.</p>
        <p>La <strong>CNIL</strong>, autorité administrative indépendante de 18 membres créée par cette loi, veille au respect de la vie privée et des libertés dans le numérique : conseil et accompagnement, traitement des plaintes, contrôles sur place et en ligne, mise en demeure, sanctions financières.</p>` },
  { ch: "ch3a", q: "Qu'est-ce que le RGPD et qu'a-t-il changé ?",
    a: `<p>Règlement général sur la protection des données, appliqué depuis le <strong>25 mai 2018</strong> dans toute l'UE. Il encadre l'exploitation des données des employés, clients, fournisseurs.</p>
        <p>Il prolonge la loi de 1978, <strong>harmonise</strong> les règles en Europe, <strong>renforce les droits</strong> des citoyens et fonde le numérique sur la confiance. Il remplace les déclarations préalables par une logique de <strong>responsabilité</strong> : registre des traitements, tri des données, respect des droits, sécurité (et DPO, sanctions jusqu'à 4 % du CA mondial).</p>
        <p>Il s'applique s'il y a des données personnelles, un traitement, hors activité purement personnelle, avec un responsable ou des moyens sur le territoire.</p>` },
  { ch: "ch3a", q: "Quelles règles encadrent la collecte de données sur Internet et les cookies ?",
    a: `<p>Les logs (IP, heure, pages) peuvent identifier une personne (scandale AOL 2006). La collecte déloyale est interdite (art. 25 loi 1978) ; une information nominative ne peut être divulguée sans accord (art. 43). Il faut donc l'<strong>anonymat</strong> ou le <strong>consentement</strong>, et informer l'internaute (mention légale).</p>
        <p>Cookies : directive 2002/58 (information + possibilité de refuser), puis directive <strong>2009/136/CE</strong> : accord préalable après information claire sur les finalités ; cookies techniques exemptés. Risques : vol de cookies par sniffer ou XSS.</p>` },
  { ch: "ch3a", q: "Présentez les droits et obligations des acteurs de l'Internet.",
    a: `<ul><li><strong>Hébergeur</strong> : stocke les contenus des utilisateurs ; non responsable sauf connaissance effective de l'illicéité sans retrait prompt (LCEN) ; conserve 1 an les données de connexion.</li>
        <li><strong>Fournisseur de contenu / éditeur</strong> : responsable civilement et pénalement du contenu et des liens ; identification obligatoire ; respect de la vie privée, du droit à l'image, du CPI.</li>
        <li><strong>Opérateur et FAI</strong> : non responsables des contenus ; pas d'obligation générale de surveillance (LCEN 21 juin 2004) ; conservation 1 an.</li>
        <li><strong>Utilisateur</strong> : responsabilité civile, droit d'auteur, art. 9 C. civ., spam.</li></ul>
        <p>Ex. : Dailymotion qualifié d'hébergeur (TGI Paris 2008).</p>` },
  { ch: "ch3a", q: "Un employeur peut-il consulter les messages électroniques de ses salariés ?",
    a: `<p>L'usage abusif d'Internet ou de la messagerie peut justifier un licenciement. Mais l'employeur ne peut pas prendre connaissance du <strong>contenu des messages personnels</strong> émis ou reçus avec l'outil de travail, <strong>même s'il a interdit l'usage non professionnel</strong> : le salarié a droit au respect de sa vie privée, qui implique le secret des correspondances (Cass. soc., Nikon 2001 ; exemple du salarié de Carrefour dans le cours). Les traces laissées relèvent de la protection des données personnelles.</p>` },
  { ch: "ch3a", q: "Comment fonctionne la gouvernance d'Internet ?",
    a: `<p><strong>ICANN</strong> (société de droit privé américain d'intérêt public) : adresses IP et DNS. <strong>AFNIC</strong> (association loi 1901) : extensions françaises (.fr…), par délégation de l'IANA. <strong>ARCEP</strong> : régulation du réseau (droit des télécoms). Les services relèvent du droit du commerce électronique et des contrats à distance. Organismes de référence : Conseil national du numérique, Etalab / data.gouv.fr.</p>
        <p>Noms de domaine : premier arrivé, premier servi, sous réserve des marques et signes distinctifs (concurrence déloyale ; protection élargie des marques notoires).</p>` },
  { ch: "ch3b", q: "Comment le logiciel est-il protégé juridiquement ? À qui appartient-il ?",
    a: `<p>Pas de définition juridique ; directive du 14 mai 1991, loi du 10 mai 1994. Le logiciel <strong>n'est pas brevetable</strong> : il est protégé par le <strong>droit d'auteur</strong> s'il est <strong>original</strong> (effort personnalisé, appréciation du juge), 70 ans, et par le droit des contrats. Le dépôt est facultatif mais sert de preuve.</p>
        <p>Il appartient à son créateur, <strong>sauf</strong> s'il est créé par un salarié dans ses fonctions : droits patrimoniaux à l'<strong>employeur</strong> (L113-9 CPI). L'auteur a des droits patrimoniaux (reproduction, adaptation, distribution, L122-6) avec des exceptions (correction, sauvegarde, décompilation, L122-6-1), et un droit moral réduit (L121-7).</p>` },
  { ch: "ch3b", q: "Quelles obligations pèsent sur le prestataire dans les contrats informatiques ?",
    a: `<p>La fourniture de logiciel relève de la liberté contractuelle : prêt, cession (vente) ou licence (bail/exploitation).</p>
        <ul><li><strong>Conception</strong> : contrat d'entreprise, <strong>obligation de moyens</strong> et non de résultat.</li>
        <li><strong>Obligation de conseil</strong> : adapter le produit au besoin, mettre en garde sur les difficultés prévisibles ; manquement ⇒ résolution + dommages-intérêts.</li>
        <li><strong>Maintenance</strong> : obligation préventive et curative, de moyens.</li>
        <li><strong>Clause de secours</strong> : système de remplacement en cas de panne sérieuse.</li></ul>` },
  { ch: "ch3b", q: "Comment une base de données est-elle protégée ?",
    a: `<p>Définition (directive du 11 mars 1996, L112-3 CPI) : recueil d'éléments indépendants disposés de manière systématique ou méthodique et individuellement accessibles.</p>
        <p>Protection par le <strong>droit sui generis du producteur</strong> s'il a fait un investissement financier, matériel ou humain substantiel (L341-1) : 15 ans, relancés par chaque nouvel investissement substantiel ; par le <strong>droit d'auteur</strong> si elle est originale ; et par le <strong>droit des contrats</strong> (licence, abonnement). Ex. : SFES c. Tigest (CA Paris 2001), extraction substantielle d'un annuaire sanctionnée.</p>` },
  { ch: "ch3b", q: "Qu'est-ce que la signature électronique ? Quelle est sa valeur juridique ?",
    a: `<p>Procédé qui garantit l'<strong>authentification</strong> de l'expéditeur, l'<strong>intégrité</strong> du message et la <strong>non-répudiation</strong>. Il repose sur une fonction de <strong>hachage</strong> (condensé unique, à sens unique) et sur des certificats délivrés par des prestataires (classes 1 à 3+), appliqués par un logiciel de signature.</p>
        <p>Valeur : loi du 13 mars 2000 et décret du 30 mars 2001. L'écrit électronique vaut l'écrit papier si l'auteur est identifié et l'intégrité garantie (art. 1316-1, aujourd'hui 1366) ; la signature électronique fiable est présumée valable (art. 1316-4, aujourd'hui 1367). Limite : un zip signé ne signe pas les documents qu'il contient (TA Toulouse 2011).</p>` },
  { ch: "ch3b", q: "Qu'est-ce qu'une œuvre multimédia et quels droits doivent respecter ses créateurs ?",
    a: `<p>Pas de définition dans le CPI : réunion sur un même support numérique d'éléments différents (images, sons, textes) régis par un logiciel (site web, jeu vidéo, DVD). Elle peut être une œuvre individuelle, de collaboration ou collective.</p>
        <p>Ses créateurs doivent respecter les droits patrimoniaux et moraux des auteurs des œuvres intégrées, le droit des bases de données et le droit commun de la PI. Les mesures techniques limitent la copie privée ; le P2P peut porter atteinte au droit d'exploitation (Hadopi, loi du 12 juin 2009, devenue Arcom). Durée : année du décès + 70 ans.</p>` }
];

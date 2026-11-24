/* Fiches A4 du S3 — une entrée par matière.
   id : identifiant (utilisé dans l'URL #id et par le tableau de bord de l'index)
   html : contenu, réparti automatiquement sur deux colonnes. Garder une page A4 maximum. */
window.FICHES_A4 = [
{ id: 'msi', court: 'Management des SI', titre: 'Management des SI', sous: 'R3.10 · bilan · FRNG · seuil', html: `
<h3>Bilan (photo du patrimoine)</h3>
<table><tr><th>Actif = emplois</th><th>Passif = ressources</th></tr>
<tr><td><b>Immobilisé</b> (&gt; 1 an, cl. 2) : incorporelles, corporelles, financières</td><td><b>Capitaux propres</b> (cl. 1) : capital, réserves, résultat</td></tr>
<tr><td><b>Circulant</b> (&lt; 1 an) : stocks (cl. 3), créances (cl. 4 débit), disponibilités (cl. 5)</td><td><b>Dettes</b> : emprunts (16, LT), fournisseurs, fiscales &amp; sociales, concours bancaires (519)</td></tr></table>
<h3>Compte de résultat (film de l'année)</h3>
<p>Charges 60-65 + 68 exploitation · 66 financières · 67 exceptionnelles · 69 IS. Produits 70-75 + 78 · 76 · 77.</p>
<div class="f">Résultat = Produits − Charges (même montant dans les capitaux propres)</div>
<ul><li>Variation stock march./MP = <b>SI − SF</b> (charges) · produits finis : <b>SF − SI</b> (production stockée)</li>
<li>Escompte accordé → charge financière · obtenu → produit financier</li>
<li>Amende, perte sur cession → exceptionnel</li></ul>
<h3>Amortissement linéaire</h3>
<div class="f">Base = Coût HT (+ install.) − valeur résiduelle · HT = TTC / 1,2<br>Taux = 100 / durée · Annuité N = Base × taux × jours / 360</div>
<ul><li>Départ : <b>mise en service</b>, pas l'achat. Année lombarde 360 j.</li>
<li>Jours N = (30 − jour) + mois restants × 30 · ex. 20/08 → 10 + 120 = 130 j</li>
<li>Dernière annuité (N+durée) = annuité × (360 − jours N)/360</li>
<li>VNC = Brut − amortissements cumulés · DAP = charge non décaissable</li>
<li>Non amortissables : terrains, &lt; 500 € HT, œuvres d'art, titres, fonds commercial</li></ul>
<div class="f">Avantages économiques : Base × unités de l'année / unités totales</div>
<h3>Bilan fonctionnel (valeurs brutes)</h3>
<table><tr><th>Actif</th><th>Passif</th></tr>
<tr><td>Emplois stables = actif immo <b>brut</b></td><td>Ressources stables = CP + <b>amortissements</b> + prov. risques + dettes LT <b>sans concours</b></td></tr>
<tr><td>Actif circ. HT = AC − dispo</td><td>Dettes CT HT (fourn., fiscales…)</td></tr>
<tr><td>Trésorerie actif = dispo</td><td>Trésorerie passif = concours bancaires</td></tr></table>
<div class="f">FRNG = RS − ES · BFR = (Stocks + Créances) − Dettes CT<br>Trésorerie = FRNG − BFR = TA − TP</div>
<ul><li>FRNG &lt; 0 : immobilisations financées par du court terme (danger)</li>
<li>Réduire le BFR : ↓ stocks, ↓ délais clients, ↑ délais fournisseurs</li>
<li>BFR &lt; 0 possible (grande distribution)</li></ul>
<h3>Ratios</h3>
<table><tr><td>Couverture emplois stables</td><td>RS / ES (&gt; 1)</td></tr><tr><td>Couverture capitaux investis</td><td>RS / (ES + BFR)</td></tr><tr><td>Autonomie financière</td><td>Dettes LT / CP</td></tr><tr><td>Rentabilité financière</td><td>Résultat / CP</td></tr><tr><td>Marge nette</td><td>Résultat / CA</td></tr></table>
<h3>Seuil de rentabilité</h3>
<div class="f">M/CV = CA − CV · R = M/CV − CF · taux = M/CV / CA<br>SR = CA × CF / M/CV (ou CF / taux)<br>PM = SR / CA × 360 · MS = CA − SR · IS = MS / CA</div>
<ul><li>CF : loyer, assurances, DAP, salaires fixes · CV : achats, commissions, livraison</li>
<li>PM en date : 267,5 j = 8 mois + 27,5 j → ~28 septembre</li>
<li>CA visé = (CF + résultat visé) / taux · vérif : MS × taux = résultat</li></ul>
<div class="warn"><b>Pièges :</b> amortir le HT · concours bancaires hors ressources stables · MS ≠ bénéfice · remises en cascade.</div>
` },

{ id: 'proba', court: 'Probabilités', titre: 'Probabilités', sous: 'dénombrement · lois', html: `
<h3>Dénombrement</h3>
<table><tr><th>Situation</th><th>Formule</th></tr>
<tr><td>Ordre compte, sans répétition (k parmi n)</td><td>A(n,k) = n! / (n−k)!</td></tr>
<tr><td>Ordre ne compte pas</td><td>C(n,k) = n! / (k!(n−k)!)</td></tr>
<tr><td>Avec répétition, ordre compte</td><td>n<sup>k</sup></td></tr>
<tr><td>Permutations de n objets</td><td>n!</td></tr>
<tr><td>Anagrammes avec lettres répétées</td><td>n! / (n₁! n₂! …)</td></tr></table>
<p>Principe multiplicatif : étapes successives → on multiplie.</p>
<h3>Règles</h3>
<div class="f">P(Ā) = 1 − P(A)<br>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)<br>P(A | B) = P(A ∩ B) / P(B)<br>Indépendants ⇔ P(A ∩ B) = P(A) P(B)</div>
<p><b>Probabilités totales :</b> P(B) = Σ P(B | Aᵢ) P(Aᵢ). <b>Bayes :</b> P(A | B) = P(B | A) P(A) / P(B).</p>
<div class="warn"><b>Indépendants ≠ incompatibles</b> (incompatibles : P(A ∩ B) = 0).</div>
<h3>Lois discrètes</h3>
<table><tr><th>Loi</th><th>P(X = k)</th><th>E</th><th>V</th></tr>
<tr><td>Bernoulli B(p)</td><td>p ou 1−p</td><td>p</td><td>p(1−p)</td></tr>
<tr><td>Binomiale B(n;p)</td><td>C(n,k) p<sup>k</sup>(1−p)<sup>n−k</sup></td><td>np</td><td>np(1−p)</td></tr>
<tr><td>Géométrique G(p)</td><td>(1−p)<sup>k−1</sup> p</td><td>1/p</td><td>(1−p)/p²</td></tr>
<tr><td>Poisson P(λ)</td><td>e<sup>−λ</sup> λ<sup>k</sup> / k!</td><td>λ</td><td>λ</td></tr>
<tr><td>Hypergéom. H(N;n;K)</td><td>C(K,k) C(N−K,n−k) / C(N,n)</td><td>nK/N</td><td></td></tr></table>
<ul><li>n essais indépendants, on compte les succès → <b>binomiale</b></li>
<li>Rang du 1<sup>er</sup> succès → <b>géométrique</b></li>
<li>Événements rares sur un intervalle → <b>Poisson</b></li>
<li>Tirage <b>sans remise</b> → <b>hypergéométrique</b></li></ul>
<h3>Variable discrète quelconque</h3>
<div class="f">E(X) = Σ xᵢ pᵢ · V(X) = E(X²) − E(X)² · σ = √V</div>
<h3>Variables continues</h3>
<div class="f">∫ f = 1 · P(a ≤ X ≤ b) = ∫ₐᵇ f(t) dt · E(X) = ∫ t f(t) dt</div>
<table><tr><th>Loi</th><th>Densité / calcul</th><th>E</th><th>V</th></tr>
<tr><td>Uniforme U([a;b])</td><td>P(c≤X≤d) = (d−c)/(b−a)</td><td>(a+b)/2</td><td>(b−a)²/12</td></tr>
<tr><td>Exponentielle E(λ)</td><td>P(X ≤ t) = 1 − e<sup>−λt</sup></td><td>1/λ</td><td>1/λ²</td></tr>
<tr><td>Normale N(μ;σ²)</td><td>Z = (X − μ)/σ ~ N(0;1)</td><td>μ</td><td>σ²</td></tr></table>
<h3>Loi normale : les cas</h3>
<ul><li>P(Z ≤ z) = Φ(z) (table) · P(Z ≥ z) = 1 − Φ(z)</li>
<li>P(Z ≤ −z) = 1 − Φ(z) · P(a ≤ Z ≤ b) = Φ(b) − Φ(a)</li>
<li>P(−z ≤ Z ≤ z) = 2Φ(z) − 1 · P(|Z| ≤ 1,96) ≈ 0,95</li>
<li>Probabilité inverse : on lit z dans la table puis x = μ + zσ</li></ul>
<div class="warn"><b>Pièges :</b> toujours centrer-réduire avant la table · exponentielle sans mémoire : P(X &gt; s+t | X &gt; s) = P(X &gt; t).</div>
` },

{ id: 'res', court: 'Réseau (R3.06)', titre: 'Architecture réseau', sous: 'R3.06 · Cisco · OSPF · Linux', html: `
<h3>Modes Cisco IOS</h3>
<pre>R1&gt;            enable
R1#            configure terminal
R1(config)#    interface g0/0
R1(config-if)# ip address 10.1.1.1 255.255.255.0
R1(config-if)# no shutdown</pre>
<ul><li><code>exit</code> remonte d'un niveau · <code>end</code> revient à R1#</li>
<li><code>do show …</code> depuis un mode config</li>
<li><code>write memory</code> = copy running-config startup-config (RAM → NVRAM)</li>
<li>« administratively down » = il manque <code>no shutdown</code></li>
<li>Liaison série : <code>clock rate</code> côté <b>DCE</b></li></ul>
<h3>Routage statique</h3>
<pre>ip route 192.168.2.0 255.255.255.0 10.0.0.2
ip route 0.0.0.0 0.0.0.0 10.0.0.2   ! défaut</pre>
<h3>OSPF</h3>
<pre>router ospf 1
 network 10.1.1.0 0.0.0.255 area 0
 passive-interface g0/1</pre>
<ul><li>État de liens · métrique = <b>coût</b> (bande passante) · DA <b>110</b></li>
<li>Wildcard = 255.255.255.255 − masque (/24 → 0.0.0.255, /30 → 0.0.0.3)</li>
<li><code>show ip route</code> : C connecté · S statique · O OSPF · [DA/métrique]</li>
<li><code>show ip ospf neighbor</code> : voisins (état FULL)</li></ul>
<table><tr><th>Source</th><th>DA</th></tr><tr><td>Connecté</td><td>0</td></tr><tr><td>Statique</td><td>1</td></tr><tr><td>OSPF</td><td>110</td></tr><tr><td>RIP</td><td>120</td></tr></table>
<h3>Routage sous Linux</h3>
<pre>ip a                         # adresses
ip addr add 10.0.0.1/24 dev eth0
ip route add 192.168.2.0/24 via 10.0.0.2
ip route add default via 10.0.0.254
sysctl -w net.ipv4.ip_forward=1   # router</pre>
<p>Rendre permanent : <code>/etc/sysctl.conf</code> et la config réseau de la distribution.</p>
<h3>Pare-feu ufw</h3>
<pre>ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp     # ou : ufw allow ssh
ufw enable
ufw status numbered
ufw delete 3</pre>
<h3>LDAP</h3>
<ul><li>Annuaire hiérarchique, optimisé pour la <b>lecture</b></li>
<li>DN = chemin unique : <code>uid=alice,ou=people,dc=exemple,dc=fr</code></li>
<li>dc = composant de domaine · ou = unité · cn = nom · uid = identifiant</li>
<li>Fichiers <b>LDIF</b> · <code>ldapadd</code>, <code>ldapsearch</code></li></ul>
<h3>Sous-réseaux (rappel)</h3>
<div class="f">Hôtes = 2<sup>(32−n)</sup> − 2 · bloc = 256 − octet du masque</div>
<div class="warn"><b>Pièges :</b> oublier <code>no shutdown</code> · masque au lieu du wildcard dans <code>network</code> · ne pas sauvegarder · <code>tracert</code> (PC) vs <code>traceroute</code> (routeur, Linux).</div>
` },

{ id: 'plsql', court: 'PL/SQL & triggers', titre: 'SQL avancé, PL/SQL & triggers', sous: 'Oracle', html: `
<h3>Bloc PL/SQL</h3>
<pre>DECLARE
  v_nom client.nom%TYPE;
BEGIN
  SELECT nom INTO v_nom FROM client WHERE id = 1;
  DBMS_OUTPUT.PUT_LINE(v_nom);
EXCEPTION
  WHEN NO_DATA_FOUND THEN …
  WHEN TOO_MANY_ROWS THEN …
  WHEN OTHERS THEN …
END;</pre>
<ul><li><code>%TYPE</code> type d'une colonne · <code>%ROWTYPE</code> ligne entière</li>
<li>Erreur métier : <code>RAISE_APPLICATION_ERROR(-20001, 'msg')</code> (−20000 à −20999)</li></ul>
<h3>Curseurs</h3>
<pre>CURSOR c IS SELECT …;
OPEN c;
LOOP
  FETCH c INTO v;
  EXIT WHEN c%NOTFOUND;
  …
END LOOP;
CLOSE c;
-- ou plus simple :
FOR r IN (SELECT …) LOOP … END LOOP;</pre>
<h3>Procédures et fonctions</h3>
<pre>CREATE OR REPLACE FUNCTION f(p IN NUMBER)
RETURN NUMBER IS BEGIN RETURN p*2; END;</pre>
<p>Fonction : renvoie une valeur, utilisable dans un SELECT. Procédure : paramètres IN / OUT / IN OUT. Paquetage = spécification + corps.</p>
<h3>Triggers LMD</h3>
<pre>CREATE OR REPLACE TRIGGER trg
BEFORE INSERT OR UPDATE ON t
FOR EACH ROW
WHEN (NEW.qte &gt; 0)
BEGIN
  :NEW.date_maj := SYSDATE;
END;</pre>
<table><tr><th></th><th>:OLD</th><th>:NEW</th></tr><tr><td>INSERT</td><td>NULL</td><td>nouvelle ligne</td></tr><tr><td>UPDATE</td><td>avant</td><td>après</td></tr><tr><td>DELETE</td><td>ligne supprimée</td><td>NULL</td></tr></table>
<ul><li>Modifier <code>:NEW</code> → <b>BEFORE</b> + <b>FOR EACH ROW</b></li>
<li>Trigger d'état (sans FOR EACH ROW) : une fois par ordre, pas de :NEW/:OLD</li>
<li>Ordre : BEFORE état → BEFORE ligne → AFTER ligne → AFTER état</li>
<li><code>INSERTING</code>, <code>UPDATING('col')</code>, <code>DELETING</code></li>
<li><b>Table mutante</b> (ORA-04091) : un trigger ligne lit la table qu'il modifie → <b>trigger composé</b></li></ul>
<div class="f">Contrainte possible (CHECK, FK) ? → contrainte. Sinon (autre table, SYSDATE, historique) → trigger.</div>
<h3>Contraintes, droits, transactions</h3>
<ul><li><code>CHECK</code> ne référence ni une autre table ni SYSDATE</li>
<li><code>ON DELETE CASCADE</code> / <code>SET NULL</code></li>
<li><code>GRANT SELECT, INSERT ON t TO u;</code> · <code>REVOKE</code> · rôles : <code>CREATE ROLE r; GRANT r TO u;</code></li>
<li>DDL = COMMIT implicite · <code>SAVEPOINT</code> / <code>ROLLBACK TO</code></li></ul>
<h3>Rappels SQL</h3>
<ul><li>NULL : <code>IS NULL</code>, <code>NVL</code> · <code>NOT IN</code> + NULL = aucune ligne</li>
<li>GROUP BY : toute colonne non agrégée du SELECT · HAVING filtre les groupes</li>
<li>Division : <code>HAVING COUNT(DISTINCT x) = (SELECT COUNT(*) …)</code></li>
<li>Hiérarchique : <code>START WITH … CONNECT BY PRIOR enfant = parent</code></li></ul>
` },

{ id: 'coo', court: 'COO & UML', titre: 'COO & UML', sous: 'R3.03 · du besoin au code', html: `
<h3>Démarche</h3>
<p>Cas d'utilisation → scénarios + DSS → diagramme de classes → séquences détaillées → code. Trois vues : <b>fonctionnelle</b> (DUC), <b>statique</b> (classes, objets), <b>dynamique</b> (séquence).</p>
<h3>Cas d'utilisation</h3>
<ul><li><b>Acteur</b> = rôle (humain ou système), pas une personne</li>
<li>Primaire : déclenche, en tire le bénéfice · secondaire : sollicité</li>
<li>Cas = service complet, nommé par un <b>verbe à l'infinitif</b></li></ul>
<table><tr><th>Relation</th><th>Sens de la flèche</th><th>Sens</th></tr>
<tr><td>«include»</td><td>base → inclus</td><td>obligatoire</td></tr>
<tr><td>«extend»</td><td>extension → base</td><td>optionnel (point d'extension)</td></tr>
<tr><td>Généralisation</td><td>fils → parent (triangle)</td><td>spécialisation</td></tr></table>
<h3>Scénarios</h3>
<p><b>Nominal</b> (tout va bien) · <b>alternatif</b> (autre chemin, objectif atteint) · <b>exception</b> (échec). Préconditions, déclencheur, postconditions.</p>
<p><b>DSS</b> : le système est une boîte noire, messages acteur ↔ système.</p>
<h3>Diagramme de classes</h3>
<ul><li>Visibilité : <b>+</b> public · <b>−</b> privé · <b>#</b> protégé · <b>~</b> paquetage</li>
<li>Souligné = de classe (static) · <code>/</code> = dérivé · italique = abstrait</li>
<li>Multiplicités : <code>1</code>, <code>0..1</code>, <code>*</code>, <code>1..*</code></li></ul>
<table><tr><th>Notation</th><th>Relation</th></tr>
<tr><td>trait</td><td>association (flèche = navigabilité)</td></tr>
<tr><td>◇ vide</td><td>agrégation (partie indépendante)</td></tr>
<tr><td>◆ plein</td><td>composition (vit et meurt avec le tout)</td></tr>
<tr><td>triangle vide, trait plein</td><td>héritage</td></tr>
<tr><td>triangle vide, pointillés</td><td>réalisation d'interface</td></tr>
<tr><td>flèche pointillée</td><td>dépendance</td></tr></table>
<ul><li><b>Classe d'association</b> : l'association a ses propres attributs (note d'un étudiant dans un module)</li>
<li>«interface», «enumeration» · classe abstraite : non instanciable</li>
<li><b>Polymorphisme</b> : même appel, comportement selon la classe réelle (redéfinition)</li></ul>
<h3>Diagramme d'objets</h3>
<p>Instances soulignées : <u>f1 : Film</u>, avec valeurs des attributs et liens.</p>
<h3>Diagramme de séquence</h3>
<ul><li>Synchrone : trait plein, flèche pleine · asynchrone : flèche ouverte · retour : pointillés</li>
<li>Ligne de vie, barre d'activation, message réflexif, création, destruction (X)</li></ul>
<table><tr><th>Fragment</th><th>Sens</th></tr><tr><td>alt</td><td>si / sinon</td></tr><tr><td>opt</td><td>si (sans sinon)</td></tr><tr><td>loop</td><td>répétition</td></tr><tr><td>ref</td><td>renvoi à un autre diagramme</td></tr><tr><td>par</td><td>en parallèle</td></tr></table>
<div class="warn"><b>Pièges :</b> sens de la flèche «extend» · acteur = rôle · composition vs agrégation (la partie peut-elle exister seule ?) · un DUC n'est pas un organigramme de traitements.</div>
` },

{ id: 'droit', court: 'Droit S3', titre: 'Droit des contrats & du numérique', sous: 'contrats · travail · RGPD · PI', html: `
<h3>Contrat</h3>
<p>Accord de volontés qui crée des obligations. Liberté contractuelle, force obligatoire, effet relatif, bonne foi.</p>
<div class="f">Validité (art. 1128 C. civ.) : consentement · capacité · contenu licite et certain</div>
<ul><li><b>Vices du consentement</b> : erreur, dol (manœuvres, mensonge, réticence), violence (y compris abus de dépendance)</li>
<li>Sanction : <b>nullité</b> (relative si elle protège une partie, absolue si l'intérêt général)</li>
<li>Formation : offre + acceptation · contrat électronique : double clic</li>
<li>Inexécution : exception d'inexécution, exécution forcée, réduction du prix, résolution, dommages et intérêts</li>
<li>Force majeure : imprévisible, irrésistible, extérieure → exonère</li>
<li>Clauses : limitative de responsabilité, pénale, résolutoire, confidentialité</li></ul>
<h3>Droit du travail</h3>
<ul><li>Contrat de travail = prestation + rémunération + <b>lien de subordination</b></li>
<li><b>CDI</b> = forme normale · <b>CDD</b> : écrit, motif précis, 18 mois max en général (renouvellements compris)</li>
<li>Période d'essai CDI : 2 mois (employés) · 3 mois (agents de maîtrise, techniciens) · 4 mois (cadres), renouvelable une fois si prévu</li>
<li>Rupture CDI : démission, licenciement (motif réel et sérieux), rupture conventionnelle</li>
<li>Non-concurrence : limitée dans le temps et l'espace, intérêt légitime, <b>contrepartie financière</b></li></ul>
<h3>Données personnelles (RGPD)</h3>
<ul><li>Donnée personnelle : toute info sur une personne physique identifiée ou <b>identifiable</b> (IP, identifiant…)</li>
<li>Données sensibles : santé, opinions, origine… interdites sauf exceptions</li>
<li>Principes : licéité, finalité, minimisation, exactitude, durée limitée, sécurité</li>
<li>Bases légales : consentement, contrat, obligation légale, intérêts vitaux, mission publique, intérêt légitime</li>
<li>Droits : accès, rectification, effacement, limitation, portabilité, opposition</li>
<li>Registre des traitements · AIPD si risque élevé · DPO · violation notifiée en <b>72 h</b></li>
<li>Contrôle : <b>CNIL</b> · amendes jusqu'à 20 M€ ou 4 % du CA mondial</li></ul>
<h3>Propriété intellectuelle</h3>
<ul><li>Logiciel protégé par le <b>droit d'auteur</b> (pas de dépôt), 70 ans après la mort de l'auteur</li>
<li>Protégé : code source, objet, matériel de conception · pas les idées, algorithmes, fonctionnalités</li>
<li>Logiciel d'un salarié dans ses fonctions → droits patrimoniaux à l'<b>employeur</b> (L113-9 CPI)</li>
<li>Droits moraux limités pour le logiciel · copie de sauvegarde autorisée</li>
<li>Licences libres : permissives (MIT, BSD) vs <b>copyleft</b> (GPL : dérivés sous même licence)</li>
<li>Base de données : droit d'auteur (structure) + droit <i>sui generis</i> du producteur (contenu)</li></ul>
<h3>Méthode : analyser un contrat</h3>
<ol><li>Parties, objet, nature du contrat</li><li>Obligations de chacun (prix, délais, livrables)</li><li>Clauses sensibles : responsabilité, PI, confidentialité, résiliation</li><li>Validité et risques, avec les articles</li></ol>
` },

{ id: 'symfony', court: 'Symfony', titre: 'Symfony', sous: 'MVC · Doctrine · Twig', html: `
<h3>Architecture</h3>
<table><tr><th>Dossier</th><th>Contenu</th></tr>
<tr><td>src/Controller</td><td>contrôleurs (routes, logique)</td></tr><tr><td>src/Entity</td><td>entités Doctrine (tables)</td></tr><tr><td>src/Repository</td><td>requêtes sur les entités</td></tr><tr><td>src/Form</td><td>types de formulaire</td></tr><tr><td>templates/</td><td>vues Twig</td></tr><tr><td>config/</td><td>configuration</td></tr><tr><td>.env / .env.local</td><td>DATABASE_URL, APP_ENV</td></tr><tr><td>public/</td><td>point d'entrée index.php, assets</td></tr></table>
<h3>Console</h3>
<pre>symfony server:start      (ou symfony serve)
php bin/console make:controller
php bin/console make:entity
php bin/console make:migration
php bin/console doctrine:migrations:migrate
php bin/console make:form
php bin/console debug:router
php bin/console cache:clear</pre>
<h3>Contrôleur et route</h3>
<pre>#[Route('/produit/{id}', name: 'produit_show')]
public function show(Produit $p): Response {
    return $this-&gt;render('produit/show.html.twig',
        ['produit' =&gt; $p]);
}</pre>
<p><code>$this-&gt;redirectToRoute('nom')</code> · <code>$this-&gt;addFlash('success', '…')</code></p>
<h3>Doctrine</h3>
<pre>$em-&gt;persist($produit);   // prépare
$em-&gt;flush();             // exécute le SQL
$repo-&gt;find($id); $repo-&gt;findAll();
$repo-&gt;findBy(['cat' =&gt; $c], ['nom' =&gt; 'ASC']);
$repo-&gt;findOneBy([...]);</pre>
<table><tr><th>Relation</th><th>Exemple</th></tr><tr><td>ManyToOne</td><td>Produit → Catégorie (côté qui porte la FK)</td></tr><tr><td>OneToMany</td><td>Catégorie → produits (inverse)</td></tr><tr><td>ManyToMany</td><td>Article ↔ Tag (table de jointure)</td></tr><tr><td>OneToOne</td><td>User ↔ Profil</td></tr></table>
<h3>Formulaires</h3>
<pre>$form = $this-&gt;createForm(ProduitType::class, $p);
$form-&gt;handleRequest($request);
if ($form-&gt;isSubmitted() &amp;&amp; $form-&gt;isValid()) {
    $em-&gt;persist($p); $em-&gt;flush();
    return $this-&gt;redirectToRoute('produit_index');
}</pre>
<h3>Twig</h3>
<pre>{% extends 'base.html.twig' %}
{% block body %}
  {% for p in produits %}
    &lt;a href="{{ path('produit_show', {id: p.id}) }}"&gt;
      {{ p.nom|upper }}&lt;/a&gt;
  {% else %} Aucun produit
  {% endfor %}
{% endblock %}</pre>
<ul><li><code>{{ }}</code> affiche (échappé) · <code>{% %}</code> logique · <code>{# #}</code> commentaire</li>
<li><code>{{ form(form) }}</code> ou <code>form_start / form_row / form_end</code></li>
<li><code>asset('css/style.css')</code> · <code>app.user</code> · <code>is_granted('ROLE_ADMIN')</code></li></ul>
<div class="warn"><b>Pièges :</b> oublier <code>flush()</code> · migration non exécutée · nom de route ≠ URL · modifier <code>.env</code> au lieu de <code>.env.local</code> pour ses secrets.</div>
` },

{ id: 'deveff', court: 'Dév. efficace', titre: 'Développement efficace', sous: 'complexité · structures', html: `
<h3>Complexité</h3>
<p>On compte les opérations en fonction de la taille n, dans le <b>pire cas</b>, à une constante près.</p>
<table><tr><th>Ordre</th><th>Exemple</th><th>n × 2 →</th></tr>
<tr><td>O(1)</td><td>accès tableau, table de hachage (moyenne)</td><td>=</td></tr>
<tr><td>O(log n)</td><td>dichotomie, ABR équilibré</td><td>+1 étape</td></tr>
<tr><td>O(n)</td><td>parcours, recherche séquentielle</td><td>× 2</td></tr>
<tr><td>O(n log n)</td><td>tri fusion, tri rapide (moyen)</td><td>≈ × 2</td></tr>
<tr><td>O(n²)</td><td>2 boucles imbriquées, tris simples</td><td>× 4</td></tr>
<tr><td>O(2ⁿ)</td><td>Fibonacci récursif naïf</td><td>explose</td></tr></table>
<ul><li>Boucles successives : on additionne · imbriquées : on multiplie</li>
<li>Boucle où i double (ou est divisé par 2) : O(log n)</li></ul>
<h3>Tris</h3>
<table><tr><th>Tri</th><th>Pire</th><th>Moyen</th><th>Idée</th></tr>
<tr><td>Sélection</td><td>n²</td><td>n²</td><td>chercher le min, le placer</td></tr>
<tr><td>Insertion</td><td>n²</td><td>n²</td><td>insérer dans la partie triée (rapide si presque trié)</td></tr>
<tr><td>Bulles</td><td>n²</td><td>n²</td><td>échanges de voisins</td></tr>
<tr><td>Fusion</td><td>n log n</td><td>n log n</td><td>diviser, trier, fusionner</td></tr>
<tr><td>Rapide</td><td>n²</td><td>n log n</td><td>pivot, partition</td></tr></table>
<h3>Récursivité</h3>
<pre>def fact(n):
    if n &lt;= 1:          # cas de base
        return 1
    return n * fact(n - 1)</pre>
<ul><li>Toujours un <b>cas de base</b>, et chaque appel s'en rapproche</li>
<li>Sans cas de base : dépassement de pile (stack overflow)</li>
<li>Diviser pour régner : couper en sous-problèmes, résoudre, combiner</li>
<li>Mémoïsation : stocker les résultats déjà calculés</li></ul>
<h3>Structures de données</h3>
<table><tr><th>Structure</th><th>Accès i</th><th>Recherche</th><th>Insertion</th></tr>
<tr><td>Tableau</td><td>O(1)</td><td>O(n) · O(log n) si trié</td><td>O(n)</td></tr>
<tr><td>Liste chaînée</td><td>O(n)</td><td>O(n)</td><td>O(1) en tête</td></tr>
<tr><td>Table de hachage</td><td>–</td><td>O(1) moyen</td><td>O(1) moyen</td></tr>
<tr><td>ABR équilibré</td><td>–</td><td>O(log n)</td><td>O(log n)</td></tr>
<tr><td>Tas (file de priorité)</td><td>min O(1)</td><td>–</td><td>O(log n)</td></tr></table>
<ul><li><b>Pile</b> LIFO (push/pop) : appels de fonctions, annuler · <b>File</b> FIFO : parcours en largeur, files d'attente</li>
<li>ABR : gauche &lt; nœud &lt; droite · parcours <b>infixe</b> = valeurs triées</li>
<li>Parcours : préfixe (racine, G, D) · infixe (G, racine, D) · suffixe (G, D, racine)</li></ul>
<div class="warn"><b>Pièges :</b> O(n log n) ≠ O(n²) pour n grand · un ABR non équilibré dégénère en liste (O(n)) · tri rapide pire cas O(n²).</div>
` },

{ id: 'cpp', court: 'C++ (option)', titre: 'C++', sous: 'option · bases', html: `
<h3>Programme minimal</h3>
<pre>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

int main() {
    std::string nom = "monde";
    std::cout &lt;&lt; "Bonjour " &lt;&lt; nom &lt;&lt; std::endl;
    int x; std::cin &gt;&gt; x;
    return 0;
}</pre>
<h3>Pointeurs et références</h3>
<pre>int x = 5;
int* p = &amp;x;   // adresse de x
*p = 7;        // x vaut 7
int&amp; r = x;    // alias : r et x = même variable
int* q = nullptr;</pre>
<table><tr><th>Passage</th><th>Syntaxe</th><th>Effet</th></tr>
<tr><td>Valeur</td><td>f(int a)</td><td>copie, l'original ne change pas</td></tr>
<tr><td>Référence</td><td>f(int&amp; a)</td><td>modifie l'original</td></tr>
<tr><td>Réf. constante</td><td>f(const std::string&amp; s)</td><td>pas de copie, lecture seule</td></tr>
<tr><td>Pointeur</td><td>f(int* a)</td><td>modifie via *a, peut être nullptr</td></tr></table>
<h3>Mémoire</h3>
<ul><li>Pile : variables locales, libérées automatiquement</li>
<li>Tas : <code>new</code> / <code>delete</code> (<code>new[]</code> / <code>delete[]</code>) · oubli = <b>fuite mémoire</b></li>
<li>Mieux : <code>std::unique_ptr</code>, <code>std::make_unique&lt;T&gt;()</code>, conteneurs STL</li></ul>
<h3>Classes</h3>
<pre>class Point {
public:
    Point(int x, int y) : x_(x), y_(y) {}
    ~Point() {}                 // destructeur
    int getX() const { return x_; }
private:
    int x_, y_;
};</pre>
<ul><li>Liste d'initialisation <code>: x_(x)</code> · <code>const</code> après une méthode : ne modifie pas l'objet</li>
<li>Déclaration en <code>.h</code> (avec <code>#pragma once</code>), définition en <code>.cpp</code> : <code>int Point::getX() const { … }</code></li>
<li>Règle de trois : destructeur, constructeur de copie, opérateur =</li></ul>
<h3>Héritage et polymorphisme</h3>
<pre>class Forme {
public:
    virtual double aire() const = 0;  // virtuelle pure
    virtual ~Forme() = default;
};
class Carre : public Forme {
    double c;
public:
    double aire() const override { return c*c; }
};</pre>
<p>Polymorphisme via pointeur ou référence sur la classe mère + méthode <code>virtual</code>. Classe avec une virtuelle pure = abstraite.</p>
<h3>STL</h3>
<pre>std::vector&lt;int&gt; v = {3, 1, 2};
v.push_back(4); v.size(); v[0];
for (int e : v) { … }
std::sort(v.begin(), v.end());
std::map&lt;std::string, int&gt; m; m["a"] = 1;</pre>
<div class="warn"><b>Pièges :</b> oublier le <code>;</code> après une classe · destructeur non virtuel dans une classe mère · retourner une référence vers une variable locale · <code>=</code> vs <code>==</code>.</div>
` },
];

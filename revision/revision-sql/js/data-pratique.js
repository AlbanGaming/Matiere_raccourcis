/* ============ FLASHCARDS ============ */
// [module, question, réponse (html) , code facultatif]
const CARDS = [
["bases","Quels sont les 3 opérateurs de base du modèle relationnel utilisés par SELECT ?","<b>Projection</b> (colonnes affichées), <b>sélection</b> (lignes filtrées par WHERE), <b>jointure</b> (relier des tables)."],
["bases","Quand l'alias de table est-il obligatoire ?","Dans une <b>auto-jointure</b> (la même table apparaît deux fois)."],
["bases","Pourquoi <code>WHERE ROWNUM &lt;= 2 ORDER BY embauche DESC</code> ne donne pas les 2 derniers embauchés ?","ROWNUM est attribué <b>avant</b> le tri. Il faut trier dans une sous-requête du FROM (ou une CTE) puis filtrer ROWNUM.","SELECT nom FROM (SELECT nom FROM pilote ORDER BY embauche DESC)\nWHERE ROWNUM <= 2;"],
["bases","Que fait <code>NVL2(x, v1, v2)</code> ?","Renvoie <b>v1</b> si x n'est pas NULL, sinon <b>v2</b>."],
["bases","Que renvoie <code>SUBSTR('Bonjour', 1, 3)</code> ?","<b>Bon</b> : 3 caractères à partir de la position 1."],
["bases","Qu'est-ce qu'une CTE ?","Une <b>Common Table Expression</b> : résultat temporaire nommé défini par <code>WITH nom AS (SELECT …)</code>, utilisé ensuite comme une table."],
["bases","Joker LIKE : différence entre % et _ ?","<code>%</code> = n'importe quel nombre de caractères ; <code>_</code> = exactement un caractère."],
["null","Que renvoie <code>WHERE cdType = NULL</code> ?","<b>Jamais rien.</b> Rien n'est égal à NULL. Utiliser <code>IS NULL</code>."],
["null","Pourquoi <code>NOT IN (SELECT cdtype FROM avion)</code> peut renvoyer 0 ligne ?","Si la sous-requête contient un NULL : NOT IN = suite de <code>!=</code> reliés par AND, et <code>x != NULL</code> est inconnu. Solutions : <code>WHERE cdtype IS NOT NULL</code> dans la sous-requête, ou NOT EXISTS."],
["null","COUNT(*) vs COUNT(col) ?","<code>COUNT(*)</code> compte toutes les lignes ; <code>COUNT(col)</code> ignore les NULL de col ; <code>COUNT(DISTINCT col)</code> compte les valeurs distinctes non NULL."],
["null","Que vaut <code>sal + comm</code> si comm est NULL ?","<b>NULL</b>. Utiliser <code>sal + NVL(comm, 0)</code>."],
["externe","Où met-on le <code>(+)</code> d'une jointure externe Oracle ?","<b>Du côté du manque</b>, c'est-à-dire côté de la table qui peut ne pas avoir de correspondance.","WHERE ap.cdtype = av.cdtype (+)  -- tous les types, même sans avion"],
["externe","Comment lister les types d'appareil sans avion par jointure externe ?","Jointure externe + <code>IS NULL</code> sur la clé de la table jointe.","SELECT libtype FROM type_appareil t\nLEFT JOIN avion a ON t.cdtype = a.cdtype\nWHERE nuavion IS NULL;"],
["externe","LEFT JOIN : différence entre une condition dans ON et dans WHERE ?","<code>ON</code> : appliquée <b>avant</b> la jointure (n'élimine pas les lignes de la table conservée). <code>WHERE</code> : appliquée <b>après</b> (peut éliminer les lignes ajoutées par la jointure externe)."],
["sousreq","Opérateurs pour une sous-requête qui renvoie plusieurs lignes ?","<code>IN</code>, <code>NOT IN</code>, ou un opérateur de comparaison suivi de <code>ANY</code> ou <code>ALL</code>."],
["sousreq","Équivalents de IN et NOT IN avec ANY/ALL ?","<code>IN</code> ≡ <code>= ANY</code> ; <code>NOT IN</code> ≡ <code>!= ALL</code>."],
["sousreq","Quand peut-on remplacer une jointure par une sous-requête ?","Quand aucune colonne de la table de la sous-requête n'est <b>projetée</b> (elle ne sert qu'à sélectionner)."],
["sousreq","Qu'est-ce qu'une sous-requête synchronisée ?","Une sous-requête qui fait référence à une colonne de la requête principale (elle est réévaluée pour chaque ligne).","WHERE nbhvol = (SELECT MAX(nbhvol) FROM avion\n                WHERE codetype = a.codetype)"],
["sousreq","Quand EXISTS est-il vrai ?","Quand la sous-requête renvoie <b>au moins une ligne</b>. On projette <code>SELECT NULL</code> et on synchronise avec la requête principale."],
["groupes","Règle du GROUP BY ?","Tous les attributs du SELECT qui ne sont <b>pas</b> dans une fonction d'agrégat doivent figurer dans le GROUP BY."],
["groupes","WHERE ou HAVING ?","<code>WHERE</code> filtre les <b>lignes</b> avant le groupement ; <code>HAVING</code> filtre les <b>groupes</b> après. HAVING n'existe qu'avec GROUP BY."],
["groupes","Comment trouver le type qui a le plus d'avions ?","Comparer à un MAX de COUNT (fonction de groupe à 2 niveaux).","SELECT codetype, COUNT(*) FROM avion\nGROUP BY codetype\nHAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM avion GROUP BY codetype);"],
["groupes","Ordre d'évaluation d'une requête par le moteur ?","FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY."],
["ensembles","3 contraintes d'un UNION ?","Même <b>nombre</b> de colonnes, même <b>type</b>, alias seulement dans le 1er SELECT, un seul ORDER BY à la fin."],
["ensembles","Quel opérateur Oracle pour la différence ?","<code>MINUS</code>."],
["ensembles","Deux méthodes pour une division (« … par TOUS les pilotes ») ?","1) <code>HAVING COUNT(DISTINCT nopilote) = (SELECT COUNT(*) FROM pilote)</code> ; 2) <b>double NOT EXISTS</b> : il n'existe pas de pilote qui ne l'a pas conduit."],
["arbre","Sens de <code>CONNECT BY noparent = PRIOR nopers</code> ?","On <b>descend</b> l'arbre : parent → enfants. (<code>nopers = PRIOR noparent</code> remonte vers les ancêtres.)"],
["arbre","Différence entre une condition dans WHERE et dans CONNECT BY ?","<b>WHERE</b> : la ligne est masquée mais le parcours continue en dessous. <b>CONNECT BY</b> : la branche n'est plus parcourue."],
["arbre","Que vaut LEVEL pour la racine ?","<b>1</b>."],
["arbre","À quoi sert SYS_CONNECT_BY_PATH ?","Construire le chemin de la racine au nœud courant avec un séparateur, ex. <code>:01:02:04</code>."],
["ldd","Les 3 familles de contraintes d'intégrité ?","<b>Domaine</b> (NOT NULL, UNIQUE, CHECK), <b>entité</b> (PRIMARY KEY), <b>référentielle</b> (FOREIGN KEY)."],
["ldd","Quelle contrainte ne peut jamais être une contrainte de table ?","<b>NOT NULL</b> (considérée comme une définition du type de colonne)."],
["ldd","Quand une contrainte doit-elle être de niveau table ?","Quand elle porte sur <b>plusieurs colonnes</b> (clé primaire composée, CHECK sur 2 champs)."],
["ldd","Un CHECK peut-il comparer des champs de 2 tables ?","<b>Non.</b> Il faut un <b>trigger</b>."],
["ldd","ON DELETE CASCADE vs ON DELETE SET NULL ?","CASCADE supprime les lignes filles ; SET NULL met leur clé étrangère à NULL."],
["ldd","DELETE FROM t vs TRUNCATE TABLE t ?","Les deux vident la table, mais <b>TRUNCATE</b> est irrémédiable (pas de ROLLBACK)."],
["ldd","Où placer DEFAULT par rapport aux contraintes ?","<b>Avant</b> les contraintes : <code>nbVol NUMBER DEFAULT 0 CONSTRAINT nn_nbvol NOT NULL</code>."],
["vues","Une vue stocke-t-elle des données ?","Non : c'est une <b>table virtuelle</b>, le SELECT est exécuté à chaque appel."],
["vues","Rôle de WITH CHECK OPTION ?","Refuser les INSERT/UPDATE à travers la vue qui produiraient des lignes ne vérifiant pas le WHERE de la vue."],
["vues","Conditions pour qu'une vue soit modifiable ?","Pas de jointure, GROUP BY, sous-requête ; pas de colonne calculée ni fonction ; pour INSERT, toutes les colonnes NOT NULL de la table."],
["droits","Comment donner le droit de lire seulement 2 colonnes d'une table ?","Créer une <b>vue</b> sur ces colonnes et faire <code>GRANT SELECT</code> sur la vue."],
["droits","Effet de WITH GRANT OPTION ?","Le bénéficiaire peut <b>transmettre</b> le privilège à d'autres utilisateurs."],
["droits","Quel privilège pour se connecter ?","<code>CREATE SESSION</code>."],
["index","Sur quelles colonnes Oracle crée-t-il un index automatiquement ?","Clés primaires et colonnes <b>UNIQUE</b>. Pas sur les clés étrangères."],
["index","Index composite (nom, prenom) : utilisable pour une recherche sur prénom seul ?","<b>Non.</b> Utilisable pour nom, ou nom + prénom. L'ordre des colonnes compte."],
["index","Pourquoi <code>WHERE UPPER(a) = 'DUPONT'</code> n'utilise pas l'index sur a ?","Une fonction appliquée à la colonne empêche l'usage de l'index. Solution : <code>CREATE INDEX i ON t (UPPER(a));</code>"],
["index","B-tree vs hachage ?","B-tree : égalité, intervalle, préfixe (pas suffixe). Hachage : égalité uniquement, accès direct par H(clé)."],
["index","Comment vérifier qu'un index est utilisé ?","<code>EXPLAIN PLAN … FOR requête;</code> puis <code>SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);</code>"],
["transactions","Que signifie ACID ?","<b>A</b>tomicité, <b>C</b>ohérence, <b>I</b>solation, <b>D</b>urabilité."],
["transactions","Niveaux d'isolation proposés par Oracle ?","<b>READ COMMITTED</b> (défaut) et <b>SERIALIZABLE</b> (+ READ ONLY)."],
["transactions","Qu'est-ce qu'une lecture fantôme ?","Une même requête relancée dans la transaction voit apparaître de <b>nouvelles lignes</b> insérées par une autre transaction validée."],
["transactions","Verrou S vs verrou X ?","S (partagé, lecture) : plusieurs possibles, bloque les X. X (exclusif, écriture) : bloque tout autre verrou."],
["transactions","Que provoque un CREATE TABLE au milieu d'une transaction ?","Il <b>ferme</b> la transaction (validation implicite) : toute instruction LDD valide la transaction en cours."],
["plsql","Les 3 sections d'un bloc PL/SQL ?","<code>DECLARE</code> (facultative), <code>BEGIN … END</code> (obligatoire), <code>EXCEPTION</code> (facultative)."],
["plsql","%TYPE vs %ROWTYPE ?","<code>%TYPE</code> : type d'une colonne ou d'une variable. <code>%ROWTYPE</code> : structure d'une ligne entière de table ou de curseur."],
["plsql","Que doit renvoyer un SELECT … INTO ?","<b>Exactement une ligne</b> (0 → NO_DATA_FOUND, plusieurs → TOO_MANY_ROWS)."],
["plsql","Que fait <code>DELETE FROM pilote WHERE nom = nom;</code> dans un bloc avec une variable nom ?","Il supprime <b>tous</b> les pilotes : la colonne l'emporte sur la variable. Préfixer les variables (v_nom)."],
["plsql","Le pas d'une boucle FOR ?","Toujours <b>1</b> (ou -1 avec REVERSE). La variable d'indice n'est pas déclarée."],
["plsql","Variable de substitution vs variable de session ?","Substitution : <code>ACCEPT</code> puis <code>&amp;s_var</code>. Session : <code>VARIABLE g_var</code> puis <code>:g_var</code>, affichée avec <code>PRINT</code>."],
["exceptions","Quelle instruction peut lever NO_DATA_FOUND ?","Uniquement <code>SELECT … INTO</code>. Un UPDATE/DELETE sans ligne concernée ne lève rien (tester SQL%NOTFOUND)."],
["exceptions","Plage de RAISE_APPLICATION_ERROR ?","<b>-20000 à -20999</b>."],
["exceptions","Codes -2290, -2291, -2292 ?","-2290 : CHECK violé ; -2291 : clé parent introuvable ; -2292 : enregistrement fils existant."],
["exceptions","Comment associer un nom à une erreur Oracle non prédéfinie ?","Déclarer une exception puis <code>PRAGMA EXCEPTION_INIT</code>.","e_fils EXCEPTION;\nPRAGMA EXCEPTION_INIT(e_fils, -2292);"],
["exceptions","SQLCODE et SQLERRM ?","Code numérique et message de la dernière erreur, utiles dans <code>WHEN OTHERS</code>."],
["exceptions","Que devient une exception non traitée dans un sous-bloc ?","Elle <b>remonte</b> au bloc englobant, jusqu'à être traitée ou rendre la main à l'appelant."],
["curseurs","Les 4 étapes d'un curseur explicite ?","<b>Déclarer</b> (CURSOR … IS), <b>ouvrir</b> (OPEN), <b>lire</b> (FETCH … INTO dans une boucle), <b>fermer</b> (CLOSE)."],
["curseurs","Les 4 attributs d'un curseur ?","<code>%FOUND</code>, <code>%NOTFOUND</code>, <code>%ISOPEN</code>, <code>%ROWCOUNT</code>."],
["curseurs","Avantage de <code>FOR rec IN cur LOOP</code> ?","Pas d'OPEN, de FETCH, de CLOSE, ni de déclaration de rec (visible seulement dans la boucle)."],
["curseurs","Comment modifier la ligne courante d'un curseur ?","Déclarer le curseur avec <code>FOR UPDATE</code>, puis <code>UPDATE … WHERE CURRENT OF cur</code>."],
["curseurs","Attribut de curseur après un DELETE ?","<code>SQL%ROWCOUNT</code> (curseur implicite) donne le nombre de lignes supprimées."],
["sousprog","Les 3 modes de paramètres ?","<code>IN</code> (défaut, lecture), <code>OUT</code> (renvoyé), <code>IN OUT</code> (les deux)."],
["sousprog","Procédure vs fonction ?","Une fonction <b>retourne une valeur</b> (<code>RETURN type</code> dans l'en-tête et <code>RETURN valeur;</code> dans le corps) et n'a que des paramètres IN."],
["sousprog","Les 2 parties d'un paquetage ?","La <b>spécification</b> (<code>CREATE PACKAGE</code>, éléments publics) et le <b>corps</b> (<code>CREATE PACKAGE BODY</code>, implémentation + éléments privés)."],
["sousprog","Voir les erreurs de compilation ?","<code>SHOW ERRORS</code> (ou la vue <code>USER_ERRORS</code>)."],
["triggers","Trigger d'ordre vs trigger de ligne ?","D'ordre : exécuté <b>une fois</b> par instruction. De ligne (<code>FOR EACH ROW</code>) : exécuté pour <b>chaque ligne</b> touchée."],
["triggers","Valeurs de :OLD et :NEW lors d'un INSERT ?",":OLD = NULL ; :NEW = valeurs insérées."],
["triggers","Valeurs de :OLD et :NEW lors d'un DELETE ?",":OLD = valeurs avant suppression ; :NEW = NULL."],
["triggers","Dans quel trigger peut-on modifier :NEW ?","Un trigger de ligne <b>BEFORE</b>."],
["triggers","Syntaxe de new dans la clause WHEN ?","<b>Sans les deux-points</b> : <code>WHEN (new.cdtype = 'A320')</code>."],
["triggers","Qu'est-ce qu'une table mutante ?","ORA-04091 : un trigger de ligne (sauf BEFORE INSERT) tente de lire ou modifier la table en cours de modification. Solution : trigger <b>composé</b>."],
["triggers","À quoi sert un trigger INSTEAD OF ?","Remplacer une opération LMD sur une <b>vue</b> (souvent une vue jointe non modifiable) par des opérations sur les tables."],
["triggers","Quand ne faut-il PAS utiliser de trigger ?","Quand une <b>contrainte d'intégrité</b> peut faire le travail : plus rapide et garantie sur toutes les données."],
];

/* ============ QUIZ ============ */
// {m: module, q, o: [options], a: index bonne réponse, e: explication}
const QUIZ = [
{m:"bases",q:"Quelle requête renvoie réellement les 3 pilotes les mieux payés ?",o:["SELECT nom FROM pilote WHERE ROWNUM <= 3 ORDER BY sal DESC;","SELECT nom FROM (SELECT nom FROM pilote ORDER BY sal DESC) WHERE ROWNUM <= 3;","SELECT TOP 3 nom FROM pilote ORDER BY sal DESC;","SELECT nom FROM pilote ORDER BY sal DESC WHERE ROWNUM <= 3;"],a:1,e:"ROWNUM est attribué avant le tri : il faut trier dans une sous-requête du FROM (ou une CTE). TOP n'existe pas en Oracle."},
{m:"bases",q:"Dans quel cas les alias de table sont-ils obligatoires ?",o:["Toujours dans une jointure","Dans une auto-jointure","Avec GROUP BY","Avec DISTINCT"],a:1,e:"Ils sont conseillés partout, mais obligatoires quand la même table apparaît deux fois."},
{m:"bases",q:"Que renvoie DECODE(cvlt, 1, 'Monsieur', 2, 'Madame') quand cvlt = 2 ?",o:["2","'Monsieur'","'Madame'","NULL"],a:2,e:"DECODE compare l'expression à chaque valeur et renvoie le résultat associé."},
{m:"null",q:"La table AVION contient un avion sans type. Que renvoie : SELECT libtype FROM type_appareil WHERE cdtype NOT IN (SELECT cdtype FROM avion); ?",o:["Les types sans avion","Tous les types","Aucune ligne","Une erreur"],a:2,e:"Le NULL dans la sous-requête rend chaque comparaison != inconnue : NOT IN ne renvoie rien."},
{m:"null",q:"6 avions, dont 1 sans type. Que vaut SELECT COUNT(cdType) FROM avion; ?",o:["6","5","1","NULL"],a:1,e:"COUNT(colonne) ignore les NULL. COUNT(*) donnerait 6."},
{m:"null",q:"Comment calculer le revenu sal + comm quand comm peut être NULL ?",o:["sal + comm","sal + NVL(comm, 0)","sal + ISNULL(comm)","NVL(sal + comm)"],a:1,e:"Tout calcul avec NULL donne NULL ; NVL remplace le NULL par 0."},
{m:"externe",q:"Où place-t-on le (+) pour afficher tous les types d'appareil, même sans avion ?",o:["WHERE ap.cdtype (+) = av.cdtype","WHERE ap.cdtype = av.cdtype (+)","FROM avion (+), type_appareil","On ne peut pas en Oracle"],a:1,e:"Le (+) se met du côté du manque : c'est côté AVION qu'il peut manquer des lignes."},
{m:"externe",q:"On veut tous les types avec leurs avions de 2004, même les types sans avion de 2004. Quelle version est juste ?",o:["FROM type_appareil t, avion a WHERE t.cdtype = a.cdtype(+) AND annserv = 2004","FROM avion a RIGHT JOIN type_appareil t ON (t.cdtype = a.cdtype) WHERE annserv = 2004","FROM avion a RIGHT JOIN type_appareil t ON (t.cdtype = a.cdtype AND annserv = 2004)","FROM type_appareil t JOIN avion a ON t.cdtype = a.cdtype AND annserv = 2004"],a:2,e:"La condition dans le ON est appliquée avant la jointure externe, elle n'élimine donc pas les types sans avion de 2004."},
{m:"externe",q:"Dans quel cas une clé primaire peut-elle apparaître à NULL ?",o:["Jamais","Dans le résultat d'une jointure externe","Après un DELETE","Avec une contrainte DEFERRABLE"],a:1,e:"La jointure externe complète par des NULL les colonnes de la table qui n'a pas de correspondance."},
{m:"sousreq",q:"La sous-requête peut renvoyer plusieurs lignes. Quel opérateur est INCORRECT ?",o:["IN","= ANY","=","> ALL"],a:2,e:"= attend une seule valeur : plusieurs lignes provoquent une erreur."},
{m:"sousreq",q:"NOT IN (SELECT …) est équivalent à :",o:["!= ANY","!= ALL","NOT EXISTS sans synchronisation","< ALL"],a:1,e:"x NOT IN (a, b) signifie x != a AND x != b, donc != ALL."},
{m:"sousreq",q:"Que faut-il obligatoirement dans une sous-requête EXISTS utile ?",o:["Un GROUP BY","Une synchronisation avec la requête principale","Un SELECT *","Un DISTINCT"],a:1,e:"Sans référence à la requête principale, EXISTS est vrai (ou faux) pour toutes les lignes."},
{m:"sousreq",q:"Pourquoi faut-il DISTINCT dans la version « jointure » de « pilotes ayant piloté un CONCORDE » mais pas dans la version IN ?",o:["La jointure duplique le pilote pour chaque affectation","IN trie les résultats","DISTINCT est obligatoire avec JOIN","Ce n'est pas nécessaire"],a:0,e:"La jointure produit une ligne par affectation ; IN ne teste qu'une appartenance."},
{m:"groupes",q:"Quelle requête est INCORRECTE ?",o:["SELECT codetype, COUNT(*) FROM avion GROUP BY codetype;","SELECT codetype, annserv, SUM(nbhvol) FROM avion GROUP BY codetype;","SELECT COUNT(*) FROM avion;","SELECT codetype FROM avion GROUP BY codetype HAVING COUNT(*) > 5;"],a:1,e:"annserv est projeté sans fonction d'agrégat : il doit figurer dans le GROUP BY."},
{m:"groupes",q:"Pour garder les types ayant plus de 5 avions, on utilise :",o:["WHERE COUNT(*) > 5","HAVING COUNT(*) > 5","GROUP BY COUNT(*) > 5","ORDER BY COUNT(*) > 5"],a:1,e:"Un agrégat ne peut pas être dans WHERE ; HAVING filtre les groupes."},
{m:"groupes",q:"Dans quel ordre le moteur évalue-t-il ces clauses ?",o:["SELECT, FROM, WHERE, GROUP BY, HAVING","FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY","FROM, GROUP BY, WHERE, HAVING, ORDER BY","WHERE, FROM, HAVING, GROUP BY"],a:1,e:"Les lignes sont d'abord filtrées (WHERE), puis groupées, puis les groupes filtrés (HAVING)."},
{m:"groupes",q:"Comment obtenir le sport le plus pratiqué ?",o:["SELECT lib_sport, MAX(COUNT(*)) … GROUP BY lib_sport","… GROUP BY lib_sport HAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM touriste GROUP BY idsport)","… WHERE COUNT(*) = MAX(COUNT(*))","… ORDER BY COUNT(*) DESC"],a:1,e:"On compare le compte de chaque groupe au maximum des comptes (agrégat à 2 niveaux dans la sous-requête)."},
{m:"ensembles",q:"Quelle règle est FAUSSE pour UNION ?",o:["Même nombre de colonnes","Colonnes de même type","Un ORDER BY par SELECT","Alias seulement dans le premier SELECT"],a:2,e:"Un seul ORDER BY, à la fin de la requête complète."},
{m:"ensembles",q:"« Avions conduits par TOUS les pilotes » est une :",o:["Union","Intersection","Division","Différence"],a:2,e:"La division n'existe pas en Oracle : COUNT(DISTINCT) comparé, ou double NOT EXISTS."},
{m:"arbre",q:"CONNECT BY nopers = PRIOR noparent START WITH nom = 'LOUISE' :",o:["Liste les descendants de Louise","Liste les ancêtres de Louise","Provoque une boucle infinie","Est invalide"],a:1,e:"On relie la ligne courante au parent de la ligne précédente : on remonte."},
{m:"arbre",q:"WHERE sexe = 'M' dans une requête hiérarchique :",o:["Coupe les branches féminines","Masque les femmes sans couper le parcours","Est interdit","Ne s'applique qu'à la racine"],a:1,e:"WHERE élimine des lignes après le parcours ; une condition dans CONNECT BY couperait la branche."},
{m:"ldd",q:"Quelle contrainte ne peut pas être déclarée au niveau table ?",o:["PRIMARY KEY","CHECK","NOT NULL","FOREIGN KEY"],a:2,e:"NOT NULL est une définition de colonne."},
{m:"ldd",q:"Une clé primaire composée (numpil, numvol) se déclare :",o:["En contrainte de colonne sur chaque colonne","En contrainte de table","Avec deux PRIMARY KEY","Avec UNIQUE"],a:1,e:"Une contrainte sur plusieurs colonnes est forcément une contrainte de table : CONSTRAINT pk PRIMARY KEY (numpil, numvol)."},
{m:"ldd",q:"Vérifier qu'une date de vol est postérieure à l'embauche du pilote (autre table) :",o:["CHECK","FOREIGN KEY","Trigger","UNIQUE"],a:2,e:"Un CHECK ne peut pas impliquer 2 tables."},
{m:"ldd",q:"Avec FOREIGN KEY … ON DELETE SET NULL, la suppression d'un type d'appareil :",o:["Supprime ses avions","Met le codetype de ses avions à NULL","Est refusée","Supprime la contrainte"],a:1,e:"CASCADE supprimerait les avions ; SET NULL ne fait que vider la clé étrangère."},
{m:"ldd",q:"Quelle instruction ne peut pas être annulée par ROLLBACK ?",o:["DELETE FROM affectation;","UPDATE pilote SET sal = 0;","TRUNCATE TABLE affectation;","INSERT INTO pilote …"],a:2,e:"TRUNCATE est un ordre LDD : suppression irrémédiable."},
{m:"vues",q:"Une vue créée avec WITH CHECK OPTION sur WHERE ville = 'PARIS'. UPDATE v SET ville = 'LAON' :",o:["Modifie la ligne, qui disparaît de la vue","Est refusé","Modifie la vue mais pas la table","Supprime la ligne"],a:1,e:"La ligne modifiée ne vérifierait plus la condition de la vue."},
{m:"vues",q:"Quelle vue n'est PAS modifiable par INSERT ?",o:["SELECT nopilote, nom, pnom FROM pilote","SELECT * FROM pilote WHERE ville = 'PARIS'","SELECT ville, COUNT(*) FROM pilote GROUP BY ville","SELECT nopilote, nom, pnom, sal FROM pilote"],a:2,e:"Une vue avec GROUP BY (ou jointure, sous-requête, colonne calculée) n'est pas modifiable."},
{m:"droits",q:"Comment autoriser DURANT à lire seulement NOM et ADRESSE de PILOTE ?",o:["GRANT SELECT (nom, adresse) ON pilote TO durant;","Créer une vue sur ces colonnes et GRANT SELECT sur la vue","GRANT REFERENCES ON pilote TO durant;","Impossible"],a:1,e:"Le SELECT par colonne n'existe pas ; UPDATE par colonne, si."},
{m:"index",q:"Index composite sur (nomClient, prenomClient). Quelle recherche ne peut pas l'utiliser ?",o:["WHERE nomClient = 'RHUL'","WHERE nomClient = 'RHUL' AND prenomClient = 'Axel'","WHERE prenomClient = 'Axel'","WHERE nomClient LIKE 'RH%'"],a:2,e:"L'index est trié d'abord sur le nom : le prénom seul n'est pas exploitable."},
{m:"index",q:"Quelle condition empêche l'usage d'un index B-tree sur nom ?",o:["nom = 'DUPONT'","nom LIKE 'DU%'","nom LIKE '%ONT'","nom BETWEEN 'A' AND 'D'"],a:2,e:"Recherche par suffixe impossible : l'index est trié sur le début de la valeur."},
{m:"index",q:"Un index par hachage permet :",o:["Les recherches par intervalle","Les recherches par préfixe","Les recherches par égalité","Le tri"],a:2,e:"H(clé) donne directement l'emplacement, sans notion d'ordre."},
{m:"index",q:"Oracle crée automatiquement un index sur :",o:["Les clés étrangères","Les clés primaires et colonnes UNIQUE","Toutes les colonnes NOT NULL","Aucune colonne"],a:1,e:"Les clés étrangères sont à indexer soi-même (recommandé pour les jointures)."},
{m:"transactions",q:"Niveau d'isolation par défaut d'Oracle ?",o:["READ UNCOMMITTED","READ COMMITTED","REPEATABLE READ","SERIALIZABLE"],a:1,e:"Oracle propose READ COMMITTED (défaut) et SERIALIZABLE."},
{m:"transactions",q:"Quelle anomalie reste possible en REPEATABLE READ ?",o:["Lecture sale","Lecture non répétable","Lecture fantôme","Aucune"],a:2,e:"Les verrous sont gardés sur les lignes lues, mais de nouvelles lignes peuvent apparaître."},
{m:"transactions",q:"Lire une valeur modifiée par une autre session mais pas encore validée, c'est :",o:["Une lecture fantôme","Une lecture sale","Une perte de mise à jour","Une lecture non répétable"],a:1,e:"Dirty read : possible uniquement en READ UNCOMMITTED."},
{m:"transactions",q:"Le « I » de ACID garantit que :",o:["La transaction est tout ou rien","Les contraintes sont respectées","La transaction s'exécute comme si elle était seule","Le COMMIT est définitif"],a:2,e:"A = atomicité, C = cohérence, I = isolation, D = durabilité."},
{m:"transactions",q:"Comment poser explicitement un verrou exclusif sur des lignes lues ?",o:["SELECT … FOR UPDATE","LOCK ROW","SELECT … WITH LOCK","SET TRANSACTION EXCLUSIVE"],a:0,e:"SELECT … FOR UPDATE verrouille les lignes jusqu'au COMMIT/ROLLBACK."},
{m:"plsql",q:"Quelle déclaration est correcte ?",o:["i, j NUMBER;","v_nom pilote.nom%TYPE;","v_nom = 'X' VARCHAR2(10);","DECLARE v_nb INTEGER == 0;"],a:1,e:"Une variable par ligne, affectation avec :=, %TYPE pour reprendre le type d'une colonne."},
{m:"plsql",q:"Dans un bloc PL/SQL, SELECT nom FROM pilote WHERE nopilote = 1; provoque :",o:["L'affichage du nom","Une erreur : clause INTO manquante","NO_DATA_FOUND","Rien"],a:1,e:"Un SELECT dans un bloc doit récupérer ses valeurs avec INTO."},
{m:"plsql",q:"Un CASE de recherche sans ELSE, quand aucun WHEN n'est vrai :",o:["Ne fait rien","Lève une erreur","Exécute le premier WHEN","Renvoie NULL"],a:1,e:"L'omission du ELSE provoque une erreur (CASE_NOT_FOUND)."},
{m:"exceptions",q:"UPDATE pilote SET sal = 0 WHERE numpil = 'X99'; (pilote inexistant) dans un bloc :",o:["Lève NO_DATA_FOUND","Lève TOO_MANY_ROWS","Ne lève aucune exception","Lève -2291"],a:2,e:"Seul SELECT … INTO lève NO_DATA_FOUND. Tester SQL%NOTFOUND ou SQL%ROWCOUNT."},
{m:"exceptions",q:"Supprimer une compagnie qui a encore des pilotes déclenche l'erreur :",o:["-2290","-2291","-2292","-1403"],a:2,e:"-2292 : enregistrement fils existant. -2291 serait un parent introuvable."},
{m:"exceptions",q:"Quel numéro est valide pour RAISE_APPLICATION_ERROR ?",o:["-1","-2292","-20500","20500"],a:2,e:"Entre -20000 et -20999."},
{m:"exceptions",q:"Comment nommer l'erreur Oracle -2291 ?",o:["RAISE e_parent;","PRAGMA EXCEPTION_INIT(e_parent, -2291);","e_parent := -2291;","WHEN -2291 THEN"],a:1,e:"On déclare e_parent EXCEPTION puis PRAGMA EXCEPTION_INIT dans la section DECLARE."},
{m:"curseurs",q:"Où place-t-on EXIT WHEN c%NOTFOUND ?",o:["Avant le FETCH","Juste après le FETCH","Après le CLOSE","Dans DECLARE"],a:1,e:"Rien entre FETCH et EXIT WHEN, sinon on traite une ligne qui n'existe pas."},
{m:"curseurs",q:"Avec FOR rec IN c LOOP … END LOOP; il faut :",o:["OPEN c avant","Déclarer rec","FETCH c INTO rec","Rien de tout cela"],a:3,e:"La boucle FOR ouvre, lit et ferme le curseur, et déclare rec implicitement."},
{m:"curseurs",q:"Quand lire c%ROWCOUNT pour avoir le total des lignes lues ?",o:["Avant OPEN","Après la boucle, avant CLOSE","Après CLOSE","Jamais"],a:1,e:"Après CLOSE, le curseur n'est plus accessible (INVALID_CURSOR)."},
{m:"sousprog",q:"Quel mode permet à une procédure de renvoyer une valeur via un paramètre ?",o:["IN","OUT ou IN OUT","RETURN","Aucun"],a:1,e:"IN est en lecture seule ; OUT et IN OUT sont modifiables et renvoyés à l'appelant."},
{m:"sousprog",q:"Qu'est-ce qui distingue l'en-tête d'une fonction ?",o:["IS","RETURN type","DECLARE","OUT"],a:1,e:"CREATE FUNCTION f (…) RETURN NUMBER IS …"},
{m:"sousprog",q:"Une procédure privée d'un paquetage est déclarée :",o:["Dans la spécification","Uniquement dans le corps","Avec PRIVATE","Dans une autre table"],a:1,e:"Seuls les éléments de la spécification sont visibles de l'extérieur."},
{m:"triggers",q:"Un trigger sans FOR EACH ROW sur un UPDATE qui modifie 15 lignes s'exécute :",o:["15 fois","1 fois","0 fois","16 fois"],a:1,e:"C'est un trigger d'ordre : une fois par instruction."},
{m:"triggers",q:"Dans un trigger AFTER DELETE FOR EACH ROW, quelle valeur est disponible ?",o:[":NEW.numpil",":OLD.numpil","Les deux","Aucune"],a:1,e:"Lors d'un DELETE, :NEW est NULL ; :OLD contient la ligne supprimée."},
{m:"triggers",q:"Où peut-on écrire :NEW.numpil := … ?",o:["Trigger AFTER ligne","Trigger BEFORE ligne","Trigger d'ordre","Partout"],a:1,e:":NEW n'est modifiable que dans un trigger BEFORE de ligne."},
{m:"triggers",q:"Quelle clause WHEN est correcte ?",o:["WHEN (:new.cdtype = 'A320')","WHEN (new.cdtype = 'A320')","WHEN new.cdtype = 'A320' THEN","WHEN (SELECT …)"],a:1,e:"Pas de : dans WHEN, et pas de requête SQL."},
{m:"triggers",q:"ORA-04091 « table en mutation » apparaît dans :",o:["Un trigger d'ordre AFTER","Un trigger de ligne AFTER UPDATE qui lit sa propre table","Un trigger BEFORE INSERT ligne","Un trigger INSTEAD OF"],a:1,e:"Les triggers de ligne (sauf BEFORE INSERT) ne peuvent pas lire leur table. Solution : trigger composé."},
{m:"triggers",q:"Pour insérer à travers une vue jointe, on utilise :",o:["WITH CHECK OPTION","Un trigger INSTEAD OF","Un trigger AFTER INSERT sur la vue","Un index"],a:1,e:"Sinon : ORA-01776, impossible de modifier plus d'une table de base via une vue jointe."},
{m:"triggers",q:"LOGON s'utilise avec :",o:["BEFORE","AFTER","INSTEAD OF","Les deux"],a:1,e:"LOGON uniquement en AFTER, LOGOFF uniquement en BEFORE."},
];

/* ============ EXERCICES DE REQUÊTES (base aérienne du cours) ============ */
const EXOS = [
{m:"bases",lvl:1,q:"Afficher le nom et le revenu (sal + comm) des pilotes, triés par revenu décroissant puis par nom.",s:[["Solution","SELECT nom, sal + NVL(comm, 0) AS revenu\nFROM pilote\nORDER BY 2 DESC, nom;"]],n:"Penser au NULL de comm."},
{m:"bases",lvl:1,q:"Noms (sans doublon) des pilotes ayant été affectés à un avion de type 'AB3'.",s:[["Jointure","SELECT DISTINCT p.nom\nFROM pilote p\nJOIN affectation af ON p.nopilote = af.nopilote\nJOIN avion av ON av.nuavion = af.nuavion\nWHERE UPPER(av.cdType) = 'AB3';"],["Sous-requêtes","SELECT nom FROM pilote\nWHERE nopilote IN (SELECT nopilote FROM affectation\n                   WHERE nuavion IN (SELECT nuavion FROM avion\n                                     WHERE UPPER(cdType) = 'AB3'));"]]},
{m:"bases",lvl:2,q:"Les 2 avions ayant le plus d'heures de vol.",s:[["Sous-requête dans le FROM","SELECT nuavion, nbhvol\nFROM (SELECT nuavion, nbhvol FROM avion ORDER BY nbhvol DESC)\nWHERE ROWNUM <= 2;"],["CTE","WITH tri AS (SELECT nuavion, nbhvol FROM avion ORDER BY nbhvol DESC)\nSELECT * FROM tri WHERE ROWNUM <= 2;"]]},
{m:"externe",lvl:2,q:"Liste de tous les pilotes avec, s'il y en a, les numéros des vols auxquels ils sont affectés.",s:[["LEFT JOIN","SELECT p.nom, a.novol\nFROM pilote p\nLEFT JOIN affectation a ON p.nopilote = a.nopilote;"],["(+)","SELECT p.nom, a.novol\nFROM pilote p, affectation a\nWHERE p.nopilote = a.nopilote (+);"]]},
{m:"externe",lvl:2,q:"Pilotes qui n'ont jamais été affectés à un vol (3 méthodes).",s:[["Jointure externe","SELECT nom FROM pilote p\nLEFT JOIN affectation a ON a.nopilote = p.nopilote\nWHERE a.novol IS NULL;"],["NOT EXISTS","SELECT nom FROM pilote p\nWHERE NOT EXISTS (SELECT NULL FROM affectation a\n                  WHERE a.nopilote = p.nopilote);"],["NOT IN","SELECT nom FROM pilote\nWHERE nopilote NOT IN (SELECT nopilote FROM affectation);\n-- OK ici car nopilote est NOT NULL dans AFFECTATION"]]},
{m:"externe",lvl:3,q:"Types d'appareil n'ayant aucun avion mis en service en 2004.",s:[["RIGHT JOIN avec condition dans ON","SELECT libtype\nFROM avion a RIGHT JOIN type_appareil t\n  ON (t.cdtype = a.cdtype AND annserv = 2004)\nWHERE nuavion IS NULL;"],["NOT IN","SELECT libtype FROM type_appareil\nWHERE cdType NOT IN (SELECT cdType FROM avion\n                     WHERE annserv = 2004 AND cdType IS NOT NULL);"]],n:"Piège : mettre annserv = 2004 dans le WHERE ne renvoie rien."},
{m:"sousreq",lvl:1,q:"Numéros et types des avions mis en service la même année que l'avion '8832'.",s:[["Sous-requête","SELECT nuavion, codetype FROM avion\nWHERE annserv = (SELECT annserv FROM avion WHERE nuavion = '8832');"]]},
{m:"sousreq",lvl:2,q:"Nom et ville des pilotes qui habitent une ville de départ d'un vol desservi par un avion de type '741'.",s:[["Sous-requêtes imbriquées","SELECT nom, ville FROM pilote\nWHERE ville IN (SELECT vildep FROM vol\n                WHERE novol IN (SELECT novol FROM affectation\n                                WHERE nuavion IN (SELECT nuavion FROM avion\n                                                  WHERE codetype = '741')));"]]},
{m:"sousreq",lvl:3,q:"Pour chaque type d'avion : libellé, nom et heures de vol de l'avion qui a le plus d'heures.",s:[["Sous-requête synchronisée","SELECT libtype, nomav, nbhvol\nFROM avion a JOIN type_appareil t ON (t.codeType = a.codeType)\nWHERE nbhvol = (SELECT MAX(nbhvol) FROM avion\n                WHERE codetype = a.codetype);"]]},
{m:"sousreq",lvl:3,q:"Vols (numéro, départ, arrivée) dont au moins un pilote habite la ville de départ.",s:[["IN + synchronisation","SELECT novol, vildep, vilar FROM vol v\nWHERE novol IN (SELECT novol FROM affectation\n                WHERE nopilote IN (SELECT nopilote FROM pilote\n                                   WHERE ville = v.vildep));"],["EXISTS","SELECT novol, vildep, vilar FROM vol v\nWHERE EXISTS (SELECT NULL FROM affectation a JOIN pilote p ON p.nopilote = a.nopilote\n              WHERE a.novol = v.novol AND p.ville = v.vildep);"]]},
{m:"groupes",lvl:1,q:"Nombre d'avions et moyenne d'heures de vol par type, uniquement pour les types ayant au moins 3 avions.",s:[["GROUP BY + HAVING","SELECT codetype, COUNT(*) AS nb, AVG(nbhvol) AS moy\nFROM avion\nGROUP BY codetype\nHAVING COUNT(*) >= 3;"]]},
{m:"groupes",lvl:2,q:"Le (ou les) pilote(s) ayant effectué le plus de vols.",s:[["MAX(COUNT)","SELECT p.nom, COUNT(*) AS nb_vols\nFROM pilote p JOIN affectation a ON p.nopilote = a.nopilote\nGROUP BY p.nopilote, p.nom\nHAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM affectation\n                   GROUP BY nopilote);"]]},
{m:"groupes",lvl:2,q:"Types dont la moyenne d'heures de vol dépasse la moyenne de tous les avions.",s:[["HAVING + sous-requête","SELECT codetype, AVG(nbhvol)\nFROM avion\nGROUP BY codetype\nHAVING AVG(nbhvol) > (SELECT AVG(nbhvol) FROM avion);"]]},
{m:"ensembles",lvl:2,q:"Villes qui sont à la fois ville de départ d'un vol et ville de résidence d'un pilote.",s:[["INTERSECT","SELECT vildep FROM vol\nINTERSECT\nSELECT ville FROM pilote;"],["IN","SELECT DISTINCT vildep FROM vol\nWHERE vildep IN (SELECT ville FROM pilote);"]]},
{m:"ensembles",lvl:3,q:"Pilotes ayant conduit TOUS les avions (division).",s:[["Comptage","SELECT nopilote FROM affectation\nGROUP BY nopilote\nHAVING COUNT(DISTINCT nuavion) = (SELECT COUNT(*) FROM avion);"],["Double NOT EXISTS","SELECT nom FROM pilote p\nWHERE NOT EXISTS (SELECT NULL FROM avion av\n                  WHERE NOT EXISTS (SELECT NULL FROM affectation a\n                                    WHERE a.nopilote = p.nopilote\n                                    AND a.nuavion = av.nuavion));"]]},
{m:"ldd",lvl:2,q:"Créer la table QUALIF(numpil, cdtype, date_exp) : clé primaire composée, deux clés étrangères (suppression en cascade si le pilote est supprimé), date d'expiration obligatoire.",s:[["CREATE TABLE","CREATE TABLE qualif (\n  numpil   CHAR(4),\n  cdtype   CHAR(4),\n  date_exp DATE CONSTRAINT nn_date_exp NOT NULL,\n  CONSTRAINT pk_qualif PRIMARY KEY (numpil, cdtype),\n  CONSTRAINT fk_qualif_pil FOREIGN KEY (numpil)\n    REFERENCES pilote(numpil) ON DELETE CASCADE,\n  CONSTRAINT fk_qualif_type FOREIGN KEY (cdtype)\n    REFERENCES type_appareil(cdtype));"]]},
{m:"vues",lvl:2,q:"Créer une vue des pilotes de Reims (numéro, nom, salaire) qui interdit d'y insérer un pilote d'une autre ville.",s:[["Vue","CREATE OR REPLACE VIEW v_pil_reims AS\nSELECT nopilote, nom, sal, ville\nFROM pilote\nWHERE ville = 'REIMS'\nWITH CHECK OPTION;"]],n:"La colonne ville doit être dans la vue pour pouvoir insérer un pilote de Reims."},
{m:"plsql",lvl:2,q:"Bloc anonyme : afficher le nom et le salaire du pilote '7937', ou un message s'il n'existe pas.",s:[["Bloc","SET SERVEROUTPUT ON\nDECLARE\n  v_nom pilote.nom%TYPE;\n  v_sal pilote.sal%TYPE;\nBEGIN\n  SELECT nom, sal INTO v_nom, v_sal\n  FROM pilote WHERE nopilote = '7937';\n  DBMS_OUTPUT.PUT_LINE(v_nom || ' gagne ' || v_sal);\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    DBMS_OUTPUT.PUT_LINE('Pilote 7937 inexistant');\nEND;\n/"]]},
{m:"curseurs",lvl:2,q:"Afficher chaque pilote de Paris avec son nombre de vols, puis le nombre total de pilotes traités.",s:[["Curseur FOR","DECLARE\n  v_nb  INTEGER;\n  v_cpt INTEGER := 0;\nBEGIN\n  FOR r IN (SELECT nopilote, nom FROM pilote WHERE UPPER(ville) = 'PARIS') LOOP\n    SELECT COUNT(*) INTO v_nb FROM affectation WHERE nopilote = r.nopilote;\n    DBMS_OUTPUT.PUT_LINE(r.nom || ' : ' || v_nb || ' vol(s)');\n    v_cpt := v_cpt + 1;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE(v_cpt || ' pilote(s)');\nEND;"]],n:"SELECT COUNT(*) INTO renvoie toujours une ligne : pas de NO_DATA_FOUND."},
{m:"sousprog",lvl:2,q:"Fonction nb_vols(p_nopilote) qui renvoie le nombre d'affectations d'un pilote, et -1 si le pilote n'existe pas.",s:[["Fonction","CREATE OR REPLACE FUNCTION nb_vols (p_nopilote IN pilote.nopilote%TYPE)\nRETURN NUMBER\nIS\n  v_nom pilote.nom%TYPE;\n  v_nb  NUMBER;\nBEGIN\n  SELECT nom INTO v_nom FROM pilote WHERE nopilote = p_nopilote;\n  SELECT COUNT(*) INTO v_nb FROM affectation WHERE nopilote = p_nopilote;\n  RETURN v_nb;\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN RETURN -1;\nEND;"]]},
{m:"triggers",lvl:3,q:"Trigger : un pilote ne peut pas être affecté à plus de 10 vols. Refuser l'insertion dans AFFECTATION sinon.",s:[["Trigger ligne BEFORE INSERT","CREATE OR REPLACE TRIGGER max_vols\nBEFORE INSERT ON affectation\nFOR EACH ROW\nDECLARE\n  v_nb NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO v_nb FROM affectation\n  WHERE nopilote = :NEW.nopilote;\n  IF v_nb >= 10 THEN\n    RAISE_APPLICATION_ERROR(-20010, 'Pilote déjà affecté à 10 vols');\n  END IF;\nEND;"]],n:"BEFORE INSERT ligne : pas de problème de table mutante pour une insertion simple."},
{m:"triggers",lvl:3,q:"Trigger : interdire toute baisse de salaire d'un pilote.",s:[["Trigger avec WHEN","CREATE OR REPLACE TRIGGER pas_de_baisse\nBEFORE UPDATE OF sal ON pilote\nFOR EACH ROW\nWHEN (new.sal < old.sal)\nBEGIN\n  RAISE_APPLICATION_ERROR(-20020,\n    'Baisse interdite : ' || :OLD.sal || ' -> ' || :NEW.sal);\nEND;"]]},
];

/* ============ CODE À TROUS ============ */
// Les trous s'écrivent [[réponse|variante]] ; comparaison insensible à la casse.
const GAPS = [
{t:"Curseur explicite",m:"curseurs",c:`DECLARE
  [[CURSOR]] c_pil IS SELECT nom, sal FROM pilote;
  v_nom pilote.nom[[%TYPE]];
  v_sal pilote.sal%TYPE;
BEGIN
  [[OPEN]] c_pil;
  LOOP
    [[FETCH]] c_pil INTO v_nom, v_sal;
    EXIT WHEN c_pil[[%NOTFOUND]];
    DBMS_OUTPUT.PUT_LINE(v_nom || ' : ' || v_sal);
  END LOOP;
  [[CLOSE]] c_pil;
END;`},
{t:"Trigger de ligne",m:"triggers",c:`CREATE OR REPLACE TRIGGER verif_qualif
[[BEFORE]] INSERT ON qualif
FOR EACH [[ROW]]
DECLARE
  v_cpt pilote.nbqualif%TYPE;
BEGIN
  SELECT nbqualif [[INTO]] v_cpt FROM pilote
  WHERE numpil = [[:NEW]].numpil;
  IF v_cpt >= 3 THEN
    [[RAISE_APPLICATION_ERROR]](-20100, 'Déjà 3 qualifications');
  END IF;
END;`},
{t:"Exception non prédéfinie",m:"exceptions",c:`DECLARE
  e_fils [[EXCEPTION]];
  [[PRAGMA]] EXCEPTION_INIT(e_fils, [[-2292]]);
BEGIN
  DELETE FROM compagnie WHERE comp = 'AF';
EXCEPTION
  [[WHEN]] e_fils THEN
    DBMS_OUTPUT.PUT_LINE('Il reste des pilotes');
  WHEN [[OTHERS]] THEN
    DBMS_OUTPUT.PUT_LINE([[SQLERRM]]);
END;`},
{t:"Fonction stockée",m:"sousprog",c:`CREATE OR REPLACE [[FUNCTION]] moy_h_vol (p_type [[IN]] avion.codetype%TYPE)
[[RETURN]] NUMBER
[[IS|AS]]
  v_moy NUMBER;
BEGIN
  SELECT AVG(nbhvol) INTO v_moy FROM avion WHERE codetype = p_type;
  [[RETURN]] v_moy;
END;`},
{t:"Requête GROUP BY / HAVING",m:"groupes",c:`SELECT codetype, COUNT(*)
FROM avion
[[GROUP BY]] codetype
[[HAVING]] COUNT(*) = (SELECT [[MAX]](COUNT(*))
                   FROM avion
                   GROUP BY [[codetype]]);`},
{t:"Jointure externe",m:"externe",c:`-- Types d'appareil sans aucun avion
SELECT libtype
FROM type_appareil t
[[LEFT]] JOIN avion a [[ON]] t.cdtype = a.cdtype
WHERE a.nuavion [[IS NULL]];`},
{t:"Requête hiérarchique",m:"arbre",c:`SELECT [[LEVEL]], nom
FROM generation
[[CONNECT BY]] noparent = [[PRIOR]] nopers
[[START WITH]] nom = 'ARTHUR';`},
{t:"Vue et privilèges",m:"droits",c:`CREATE OR REPLACE [[VIEW]] v_pilote AS
SELECT nom, adresse FROM pilote
WHERE ville = 'PARIS'
WITH [[CHECK]] OPTION;

[[GRANT]] SELECT ON v_pilote [[TO]] durant;`},
];

/* ============ REMETTRE DANS L'ORDRE ============ */
const ORDERS = [
{t:"Ordre d'écriture d'un SELECT",items:["SELECT","FROM","WHERE","GROUP BY","HAVING","ORDER BY"]},
{t:"Ordre d'évaluation par le moteur",items:["FROM","WHERE","GROUP BY","HAVING","SELECT","ORDER BY"]},
{t:"Étapes d'un curseur explicite",items:["CURSOR … IS","OPEN","FETCH … INTO","EXIT WHEN %NOTFOUND","CLOSE"]},
{t:"Sections d'un bloc PL/SQL",items:["DECLARE","BEGIN","EXCEPTION","END;"]},
{t:"Sections d'un trigger composé",items:["BEFORE STATEMENT","BEFORE EACH ROW","AFTER EACH ROW","AFTER STATEMENT"]},
{t:"Niveaux d'isolation, du plus permissif au plus strict",items:["READ UNCOMMITTED","READ COMMITTED","REPEATABLE READ","SERIALIZABLE"]},
];

/* ============ SCHÉMA DE LA BASE DU COURS ============ */
const SCHEMA = [
["PILOTE",[["nopilote","PK"],["nom",""],["pnom",""],["adresse",""],["ville",""],["embauche",""],["sal",""],["comm",""]]],
["AFFECTATION",[["novol","PK FK"],["dateVol","PK"],["nopilote","FK"],["nuavion","FK"],["nbPass",""]]],
["VOL",[["novol","PK"],["vildep",""],["vilar",""],["dep_h, dep_mn",""],["ar_h, ar_mn",""]]],
["AVION",[["nuavion","PK"],["cdType","FK"],["nomAv",""],["annServ",""],["nbhVol",""]]],
["TYPE_APPAREIL",[["cdType","PK"],["libType",""],["nbPlace",""]]],
];

/* ============ TOP PIÈGES ============ */
const TRAPS = [
"<code>= NULL</code> ne renvoie jamais rien : <code>IS NULL</code>.",
"<code>NOT IN</code> + un NULL dans la sous-requête = 0 ligne.",
"<code>ROWNUM</code> avant <code>ORDER BY</code> : trier dans une sous-requête.",
"Condition dans <code>WHERE</code> après une jointure externe : elle annule l'externe.",
"Attribut du SELECT oublié dans le <code>GROUP BY</code>.",
"Agrégat dans <code>WHERE</code> au lieu de <code>HAVING</code>.",
"Seul <code>SELECT … INTO</code> lève NO_DATA_FOUND.",
"<code>:new</code> dans <code>WHEN</code> s'écrit <b>sans</b> les deux-points.",
"Trigger de ligne qui lit sa propre table : table mutante.",
"Variable nommée comme une colonne : <code>WHERE nom = nom</code> est toujours vrai.",
];

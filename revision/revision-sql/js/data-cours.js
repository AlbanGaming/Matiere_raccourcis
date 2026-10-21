/* ============ CONTENU DES FICHES (issu des CM) ============ */
const P = (h) => ["p", h];
const C = (sql, cap) => ["code", sql, cap];
const T = (h) => ["trap", h];
const TIP = (h) => ["tip", h];
const UL = (...li) => ["ul", li];
const TB = (head, rows) => ["table", head, rows];

const GROUPS = {
  sql: "SQL : interroger",
  ldd: "LDD & administration",
  perf: "Index & transactions",
  plsql: "PL/SQL",
};

const MODULES = [
/* ------------------------------------------------------------------ */
{
  id: "bases", code: "SQL-01", group: "sql", title: "SELECT, jointures & fonctions",
  src: "SQL Rappels",
  retenir: [
    "3 opérateurs de base : <b>projection</b> (SELECT colonnes), <b>sélection</b> (WHERE), <b>jointure</b> (relier les tables).",
    "Alias de table fortement conseillés, <b>obligatoires</b> pour une auto-jointure.",
    "On ne <b>mélange pas</b> la syntaxe <code>FROM t1, t2 WHERE …</code> et <code>JOIN … ON</code> dans une même requête.",
    "<code>DISTINCT</code> élimine les doublons créés par les jointures.",
    "<code>ROWNUM</code> est attribué <b>avant</b> le tri : pour un « top N », trier dans une sous-requête du FROM (ou une CTE <code>WITH</code>).",
  ],
  blocks: [
    { h: "Syntaxe générale", items: [
      C(`SELECT [DISTINCT] col1 [[AS] alias], col2 ...
FROM tab1 [alias1] [, tab2 ...]
[WHERE conditions]
[GROUP BY col1 [, col2 ...]]
[HAVING condition_sur_groupes]
[ORDER BY col1 [DESC] [, col2 [DESC]]];`, "Memento"),
      TB(["Famille", "Opérateurs"], [
        ["Comparaison", "<code>= &lt; &gt; &lt;= &gt;= &lt;&gt; !=</code>"],
        ["Spécifiques", "<code>[NOT] LIKE</code>, <code>BETWEEN … AND …</code>, <code>IN (…)</code>, <code>IS [NOT] NULL</code>"],
        ["Logiques", "<code>AND</code>, <code>OR</code>, <code>NOT</code>"],
        ["Jokers (LIKE)", "<code>%</code> = n caractères, <code>_</code> = 1 caractère"],
        ["Concaténation", "<code>||</code>"],
      ]),
      P("<code>ORDER BY</code> accepte un nom de colonne, un numéro de colonne (<code>ORDER BY 1, 2</code>) ou une expression."),
    ]},
    { h: "Jointures internes", items: [
      C(`-- Syntaxe « classique »
SELECT nuavion, av.cdType, libtype, annserv
FROM avion av, type_appareil ap
WHERE av.cdType = ap.cdType;

-- Syntaxe normalisée
SELECT nuavion, av.cdType, libtype, annserv
FROM avion av
INNER JOIN type_appareil ap ON av.cdType = ap.cdType;`),
      P("Exemple à 3 tables : noms des pilotes affectés à un avion de type AB3."),
      C(`SELECT DISTINCT nom
FROM avion av
JOIN affectation af ON av.nuavion = af.nuavion
JOIN pilote p ON p.nopilote = af.nopilote
WHERE UPPER(cdType) = 'AB3';`),
      T("Sans <code>DISTINCT</code>, un pilote affecté plusieurs fois à un AB3 apparaît plusieurs fois."),
      P("Auto-jointure (même table deux fois, alias obligatoires) : avions mis en service la même année que l'avion 8832."),
      C(`SELECT a1.nuavion, a1.codetype
FROM avion a1, avion a2
WHERE a1.annserv = a2.annserv
AND a2.nuavion = '8832';`),
    ]},
    { h: "Fonctions à connaître", items: [
      TB(["Fonction", "Rôle", "Exemple"], [
        ["<code>NVL(x, y)</code>", "x si non NULL, sinon y (mêmes types !)", "<code>sal + NVL(comm, 0)</code>"],
        ["<code>NVL2(x, v1, v2)</code>", "v1 si x non NULL, sinon v2", "<code>NVL2(nuavion,'Avion '||nuavion,'pas d''avion')</code>"],
        ["<code>DECODE(e, v1, r1, v2, r2…)</code>", "Conditionnelle (switch)", "<code>DECODE(cvlt,1,'Monsieur',2,'Madame')</code>"],
        ["<code>SUBSTR(ch, pos, lg)</code>", "Extraction", "<code>SUBSTR('Bonjour',1,3)</code> → Bon"],
        ["<code>LPAD(ch, n, c)</code>", "Complète à gauche jusqu'à n car.", "<code>LPAD('Bonjour',15,'*')</code>"],
        ["<code>LENGTH</code>, <code>UPPER</code>", "Longueur, majuscules", "<code>UPPER(nom) = 'DUPONT'</code>"],
        ["<code>TRUNC(x,n)</code> / <code>ROUND(x,n)</code>", "Tronque / arrondit à n décimales", ""],
        ["<code>SYSDATE</code>", "Date et heure du jour", "<code>SELECT SYSDATE + 7 FROM DUAL;</code>"],
        ["<code>TO_DATE(ch, fmt)</code>", "Chaîne → date", "<code>TO_DATE('15/02/2029','DD/MM/YYYY')</code>"],
        ["<code>MONTHS_BETWEEN(d1, d2)</code>", "Nombre de mois entre deux dates", ""],
      ]),
      TIP("<code>DUAL</code> est la table « bidon » d'Oracle pour évaluer une expression : <code>SELECT SYSDATE FROM DUAL;</code>"),
    ]},
    { h: "Top N : ROWNUM, sous-requête dans le FROM et CTE", items: [
      P("On veut les 2 derniers pilotes embauchés."),
      C(`-- FAUX : ROWNUM est attribué avant le ORDER BY
SELECT nom FROM pilote
WHERE ROWNUM <= 2
ORDER BY embauche DESC;`),
      C(`-- Solution 1 : sous-requête dans le FROM
SELECT nom
FROM (SELECT nom FROM pilote ORDER BY embauche DESC)
WHERE ROWNUM <= 2;

-- Solution 2 : CTE (Common Table Expression)
WITH pilotes_tries AS (
  SELECT nom FROM pilote ORDER BY embauche DESC)
SELECT nom FROM pilotes_tries
WHERE ROWNUM <= 2;`),
      P("Une CTE est un résultat temporaire nommé (une « vue éphémère ») qui évite d'imbriquer des sous-requêtes dans le FROM."),
    ]},
    { h: "Méthode pour écrire une requête", items: [
      UL(
        "<b>1.</b> Tables à mettre en jeu → <code>FROM</code>.",
        "<b>2.</b> Attributs à afficher → <code>SELECT</code>.",
        "<b>3.</b> Fonctions de groupe dans le SELECT → <code>GROUP BY</code> avec <b>tous</b> les attributs du SELECT sauf ceux dans les fonctions.",
        "<b>4.</b> Conditions : sur les lignes → <code>WHERE</code> ; sur les groupes → <code>HAVING</code>."
      ),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "null", code: "SQL-02", group: "sql", title: "Les pièges du NULL",
  src: "SQL Rappels",
  retenir: [
    "Rien n'est égal ni différent de NULL, même pas NULL : utiliser <code>IS NULL</code> / <code>IS NOT NULL</code>.",
    "Tout calcul avec NULL donne NULL → <code>NVL</code>.",
    "<code>NOT IN</code> sur une sous-requête qui contient un NULL ne renvoie <b>rien</b>.",
    "Les agrégats ignorent les NULL, <b>sauf</b> <code>COUNT(*)</code>.",
    "Au <code>GROUP BY</code>, tous les NULL forment <b>un seul</b> groupe.",
  ],
  blocks: [
    { h: "Comparaisons et calculs", items: [
      C(`SELECT nomAv FROM avion WHERE cdType = NULL;  -- ne renvoie JAMAIS rien
SELECT nomAv FROM avion WHERE cdType != NULL; -- ne renvoie JAMAIS rien
SELECT nomAv FROM avion WHERE cdType IS NULL;  -- correct`),
      C(`-- Revenu = salaire + commission (commission éventuellement NULL)
SELECT nopilote AS "Numéro Pilote", nom, sal + NVL(comm, 0) AS revenus
FROM pilote
ORDER BY 3 DESC, nom;`),
    ]},
    { h: "Le piège du NOT IN", items: [
      P("Table AVION : l'avion 6 n'a pas de type (cdType NULL). On cherche les types sans avion (attendu : TYPE3)."),
      C(`SELECT libtype FROM type_appareil
WHERE cdtype NOT IN (SELECT cdtype FROM avion);
-- 0 ligne : NOT IN = suite de AND cdtype != v ; un != NULL est inconnu`),
      C(`-- Solution 1 : retirer les NULL de la sous-requête
SELECT libtype FROM type_appareil
WHERE cdtype NOT IN (SELECT cdtype FROM avion WHERE cdtype IS NOT NULL);

-- Solution 2 : NOT EXISTS (insensible aux NULL)
SELECT libtype FROM type_appareil t
WHERE NOT EXISTS (SELECT NULL FROM avion av WHERE t.cdtype = av.cdtype);`),
    ]},
    { h: "Agrégats et regroupements", items: [
      C(`SELECT COUNT(*) FROM avion;               -- 6 : toutes les lignes
SELECT COUNT(cdType) FROM avion;          -- 5 : lignes où cdType non NULL
SELECT COUNT(DISTINCT cdType) FROM avion; -- 2 : valeurs distinctes non NULL`),
      P("<code>SELECT cdType, COUNT(*) FROM avion GROUP BY cdType;</code> → les avions sans type sont regroupés ensemble dans une ligne où cdType est vide."),
      T("<code>SUM(nuAvion)</code> ou <code>SUM(cdType)</code> n'a aucun sens : AVG, MIN, MAX, SUM s'appliquent à des valeurs numériques. Pour compter, <code>COUNT</code>."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "externe", code: "SQL-03", group: "sql", title: "Jointure externe",
  src: "SQL Rappels",
  retenir: [
    "Une jointure interne <b>élimine</b> les lignes sans correspondance.",
    "Jointure externe Oracle : <code>(+)</code> se met <b>du côté du manque</b>. Équivalent : <code>LEFT JOIN</code> / <code>RIGHT JOIN</code>.",
    "« Ceux qui n'ont pas de … » = jointure externe + <code>IS NULL</code> sur la clé de la table jointe.",
    "Une clé primaire ne peut être NULL <b>que</b> dans le résultat d'une jointure externe.",
    "Avec LEFT/RIGHT JOIN : condition dans <code>ON</code> = appliquée <b>avant</b> la jointure ; dans <code>WHERE</code> = <b>après</b>.",
  ],
  blocks: [
    { h: "Afficher aussi les lignes sans correspondance", items: [
      C(`-- Tous les types, même ceux sans avion
SELECT libtype, nuavion
FROM avion av, type_appareil ap
WHERE ap.cdtype = av.cdtype (+);

SELECT libtype, nuavion
FROM type_appareil t
LEFT JOIN avion a ON t.cdtype = a.cdtype;`),
    ]},
    { h: "Ne garder que ceux sans correspondance", items: [
      C(`SELECT libtype
FROM type_appareil t, avion a
WHERE t.cdtype = a.cdtype (+)
AND nuavion IS NULL;

SELECT libtype
FROM avion a RIGHT JOIN type_appareil t ON (t.cdtype = a.cdtype)
WHERE nuavion IS NULL;

-- Autre méthode : MINUS
SELECT libtype FROM type_appareil
MINUS
SELECT libtype FROM type_appareil t, avion a WHERE t.cdtype = a.cdtype;`),
    ]},
    { h: "Le cas difficile : condition supplémentaire (avions de 2004)", items: [
      P("Objectif : afficher <b>tous</b> les types avec leurs avions mis en service en 2004, même les types sans avion de 2004."),
      C(`-- FAUX : le filtre annserv = 2004 élimine ensuite les lignes ajoutées par (+)
SELECT libtype, nuavion
FROM type_appareil t, avion a
WHERE t.cdtype = a.cdtype (+)
AND annserv = 2004;`),
      C(`-- Juste : condition dans le ON → appliquée AVANT la jointure externe
SELECT libtype, nuavion
FROM avion a RIGHT JOIN type_appareil t
  ON (t.cdtype = a.cdtype AND annserv = 2004);

-- Juste : filtrer avant avec une sous-requête dans le FROM
SELECT libtype, nuavion
FROM type_appareil t, (SELECT * FROM avion WHERE annserv = 2004) a
WHERE t.cdtype = a.cdtype (+);

-- Juste : CTE
WITH avion_2004 AS (SELECT * FROM avion WHERE annserv = 2004)
SELECT libtype, nuavion
FROM type_appareil t LEFT JOIN avion_2004 a ON t.cdtype = a.cdtype;`),
      P("Types <b>sans</b> avion mis en service en 2004 :"),
      C(`SELECT libtype
FROM avion a RIGHT JOIN type_appareil t
  ON (t.cdtype = a.cdtype AND annserv = 2004)  -- avant la jointure
WHERE nuavion IS NULL;                           -- après la jointure`),
      T("Mettre <code>nuavion IS NULL</code> dans le <code>ON</code> renvoie les 3 types ; mettre <code>annserv = 2004</code> dans le <code>WHERE</code> ne renvoie rien."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "sousreq", code: "SQL-04", group: "sql", title: "Sous-requêtes & EXISTS",
  src: "MR206 CM1 · SQL Rappels",
  retenir: [
    "Sous-requête qui renvoie <b>1 ligne</b> : <code>= != &lt; &gt; &lt;= &gt;=</code>.",
    "Sous-requête qui renvoie <b>plusieurs lignes</b> : <code>IN</code>, ou opérateur + <code>ANY</code> / <code>ALL</code>.",
    "<code>IN</code> ≡ <code>= ANY</code> et <code>NOT IN</code> ≡ <code>!= ALL</code>.",
    "Sous-requête possible quand la table n'a <b>aucune colonne projetée</b> (uniquement une sélection).",
    "Sous-requête <b>synchronisée</b> (corrélée) : elle fait référence à une colonne de la requête principale. <code>EXISTS</code> en a besoin.",
  ],
  blocks: [
    { h: "Sous-requête indépendante, une seule ligne", items: [
      C(`-- Avions de type 'BOEING 737-400'
SELECT nomav FROM avion
WHERE codetype = (SELECT codetype FROM type_appareil
                  WHERE libType = 'BOEING 737-400');`),
      P("Possible car aucune colonne de TYPE_APPAREIL n'est affichée. Sinon il faut une jointure."),
    ]},
    { h: "Plusieurs lignes : IN, ANY, ALL", items: [
      TB(["Opérateur", "Vrai si…"], [
        ["<code>IN</code>", "l'attribut appartient à l'ensemble renvoyé"],
        ["<code>op ANY</code>", "la comparaison est vraie pour <b>au moins une</b> valeur"],
        ["<code>op ALL</code>", "la comparaison est vraie pour <b>chacune</b> des valeurs"],
      ]),
      C(`-- Pilotes ayant déjà piloté un avion dont le nom contient CONCORDE
SELECT nom FROM pilote
WHERE nopilote IN (SELECT nopilote FROM affectation
                   WHERE nuAvion IN (SELECT nuAvion FROM avion
                                     WHERE nomAv LIKE '%CONCORDE%'));

-- Équivalent par jointure : il faut DISTINCT
SELECT DISTINCT nom
FROM pilote p JOIN affectation a ON (p.nopilote = a.nopilote)
JOIN avion av ON (a.nuAvion = av.nuAvion)
WHERE nomAv LIKE '%CONCORDE%';`),
      P("Les niveaux d'imbrication sont illimités et se combinent avec d'autres conditions (<code>AND ville = 'PARIS' AND nopilote IN (…)</code>)."),
    ]},
    { h: "Sur plusieurs colonnes", items: [
      C(`-- Avions du même type ET de la même année que l'avion 8832
SELECT nuavion, codetype FROM avion
WHERE (annserv, codetype) = (SELECT annserv, codetype
                             FROM avion WHERE nuavion = '8832');`),
    ]},
    { h: "Sous-requêtes synchronisées", items: [
      C(`-- Vols dont un pilote habite la ville de départ du vol
SELECT novol, vildep, vilar FROM vol v
WHERE novol IN (SELECT novol FROM affectation
                WHERE nopilote IN (SELECT nopilote FROM pilote
                                   WHERE ville = v.vildep));

-- Pour chaque type, l'avion qui a le plus d'heures de vol
SELECT libtype, nomav, nbhvol
FROM avion a JOIN type_appareil t ON (t.codeType = a.codeType)
WHERE nbhvol = (SELECT MAX(nbhvol) FROM avion
                WHERE codetype = a.codetype);`),
    ]},
    { h: "EXISTS / NOT EXISTS", items: [
      P("<code>EXISTS (sous-requête)</code> est vrai si la sous-requête renvoie au moins une ligne. Ce qui est projeté n'a pas d'importance : on écrit <code>SELECT NULL</code>. La synchronisation est indispensable."),
      C(`-- Pilotes ayant effectué au moins un vol
SELECT nom FROM pilote p
WHERE EXISTS (SELECT NULL FROM affectation a
              WHERE a.nopilote = p.nopilote);

-- Pilotes n'ayant jamais volé
SELECT nom FROM pilote p
WHERE NOT EXISTS (SELECT NULL FROM affectation a
                  WHERE a.nopilote = p.nopilote);`),
      C(`-- EXISTS imbriqués : vols ayant utilisé un BOEING 747-400 COMBI
SELECT novol FROM affectation af
WHERE EXISTS (SELECT NULL FROM avion av
              WHERE av.nuavion = af.nuavion
              AND EXISTS (SELECT NULL FROM type_appareil t
                          WHERE av.codetype = t.codetype
                          AND UPPER(libType) = 'BOEING 747-400 COMBI'));`),
      TIP("Pour « ceux qui n'ont jamais… », trois méthodes équivalentes : <code>NOT IN</code> (attention aux NULL), <code>NOT EXISTS</code>, jointure externe + <code>IS NULL</code> (et <code>MINUS</code>)."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "groupes", code: "SQL-05", group: "sql", title: "GROUP BY & HAVING",
  src: "MR206 CM1 · SQL Rappels",
  retenir: [
    "Agrégats : <code>COUNT SUM AVG MIN MAX</code> (+ <code>VARIANCE</code>, <code>STDDEV</code>). <code>DISTINCT</code> possible en paramètre.",
    "Sans GROUP BY : un seul groupe = une seule ligne de résultat.",
    "Avec GROUP BY : tous les attributs du SELECT <b>hors fonctions d'agrégat</b> doivent être dans le GROUP BY.",
    "<code>WHERE</code> filtre les <b>lignes</b> (avant groupement), <code>HAVING</code> filtre les <b>groupes</b> (après). HAVING n'existe qu'avec GROUP BY.",
    "Le « maximum de count » : <code>HAVING COUNT(*) = (SELECT MAX(COUNT(*)) … GROUP BY …)</code> (fonction de groupe à 2 niveaux).",
  ],
  blocks: [
    { h: "Un seul groupe", items: [
      C(`SELECT COUNT(*) FROM avion;                       -- nombre d'avions
SELECT SUM(nbhvol), AVG(nbhvol) FROM avion
WHERE codetype = 'AB3';                           -- cumul et moyenne des AB3
SELECT COUNT(DISTINCT codetype) FROM avion;       -- nombre de types distincts

-- L'avion qui a le plus d'heures de vol
SELECT nuavion, nbhvol FROM avion
WHERE nbhvol = (SELECT MAX(nbhvol) FROM avion);`),
      T("<code>SELECT nuavion, MAX(nbhvol) FROM avion GROUP BY nuavion;</code> donne le max par avion : aucun sens."),
    ]},
    { h: "Plusieurs groupes", items: [
      C(`-- Total et moyenne d'heures par type et année, triés
SELECT codetype, annserv, SUM(nbhvol), AVG(nbhvol)
FROM avion
GROUP BY codetype, annserv
ORDER BY 1, 2;`),
      P("Nombre de groupes = nombre de valeurs distinctes des caractéristiques de groupement."),
    ]},
    { h: "HAVING", items: [
      C(`-- Types ayant plus de 5 avions
SELECT codetype, COUNT(*) "Nombre d'avions"
FROM avion
GROUP BY codetype
HAVING COUNT(*) > 5;

-- Types dont la moyenne d'heures dépasse la moyenne générale
SELECT codetype, AVG(nbhvol)
FROM avion
GROUP BY codetype
HAVING AVG(nbhvol) > (SELECT AVG(nbhvol) FROM avion);

-- Type qui comporte le plus d'avions
SELECT codetype, COUNT(*) "nb d'avions"
FROM avion
GROUP BY codetype
HAVING COUNT(*) = (SELECT MAX(COUNT(*)) FROM avion GROUP BY codetype);`),
      P("Ordre d'évaluation par le moteur : <code>FROM</code> → <code>WHERE</code> → <code>GROUP BY</code> → <code>HAVING</code> → <code>SELECT</code> → <code>ORDER BY</code>."),
    ]},
    { h: "Erreurs classiques (exemples TOURISTE / VOYAGE / SPORT)", items: [
      C(`-- FAUX : dernière(s) ville(s) visitée(s)
SELECT ville, MAX(annee) FROM destination d, voyage v
WHERE d.idville = v.idville GROUP BY ville;   -- donne l'année max PAR ville

-- JUSTE
SELECT ville FROM destination d, voyage v
WHERE d.idville = v.idville
AND annee = (SELECT MAX(annee) FROM voyage);`),
      C(`-- FAUX : sport le plus pratiqué
SELECT lib_sport, MAX(COUNT(idtouriste)) FROM touriste t, sport s
WHERE t.idsport = s.idsport GROUP BY lib_sport;

-- JUSTE
SELECT lib_sport AS Sport, COUNT(idtouriste) AS "Nb touristes"
FROM touriste t, sport s
WHERE t.idsport = s.idsport
GROUP BY lib_sport
HAVING COUNT(idtouriste) = (SELECT MAX(COUNT(idtouriste))
                            FROM touriste GROUP BY idsport);`),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "ensembles", code: "SQL-06", group: "sql", title: "Opérateurs ensemblistes & division",
  src: "MR206 CM1 · SQL Rappels",
  retenir: [
    "<code>UNION</code> (OU), <code>INTERSECT</code> (ET), <code>MINUS</code> (SAUF).",
    "Les SELECT doivent ramener le <b>même nombre</b> de colonnes, de <b>même type</b>.",
    "Alias de colonnes seulement dans le <b>premier</b> SELECT ; un <b>seul</b> ORDER BY, à la fin.",
    "La <b>division</b> (« … pour <b>tous</b> les … ») n'existe pas en SQL Oracle : COUNT comparé, ou double <code>NOT EXISTS</code>.",
  ],
  blocks: [
    { h: "Union, intersection, différence", items: [
      C(`-- Villes d'arrivée à 16h OU villes de départ à 8h
SELECT vilar "Ville" FROM vol WHERE ar_h = 16 AND ar_mn = 0
UNION
SELECT vildep FROM vol WHERE dep_h = 8 AND dep_mn = 0
ORDER BY 1;

-- Avions affectés à un vol au départ de SYDNEY ET de LYON
SELECT nuavion FROM vol v, affectation a
WHERE v.novol = a.novol AND vildep = 'SYDNEY'
INTERSECT
SELECT nuavion FROM vol v, affectation a
WHERE v.novol = a.novol AND vildep = 'LYON';

-- Pilotes non encore affectés
SELECT nom, ville, sal FROM pilote
MINUS
SELECT nom, ville, sal FROM pilote p, affectation a
WHERE p.nopilote = a.nopilote;`),
      P("Astuce MINUS : produit cartésien moins ce qui existe. Pilotes × types MOINS couples réellement affectés = types auxquels chaque pilote n'a <b>jamais</b> été affecté."),
    ]},
    { h: "La division : « avions conduits par TOUS les pilotes »", items: [
      C(`-- Méthode 1 : compter
SELECT nuavion
FROM affectation
GROUP BY nuavion
HAVING COUNT(DISTINCT nopilote) = (SELECT COUNT(nopilote) FROM pilote);

-- Méthode 2 : double NOT EXISTS
-- « avions pour lesquels il n'existe pas de pilote ne les ayant pas conduits »
SELECT nuavion, codetype FROM avion av
WHERE NOT EXISTS (SELECT NULL FROM pilote p
                  WHERE NOT EXISTS (SELECT NULL FROM affectation a
                                    WHERE a.nopilote = p.nopilote
                                    AND a.nuavion = av.nuavion));`),
      T("Ne pas oublier <code>DISTINCT</code> dans <code>COUNT(DISTINCT nopilote)</code> : un pilote peut conduire plusieurs fois le même avion."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "arbre", code: "SQL-07", group: "sql", title: "Requêtes hiérarchiques",
  src: "MR206 CM1",
  retenir: [
    "<code>START WITH</code> = point de départ ; <code>CONNECT BY</code> = sens du lien ; <code>PRIOR</code> désigne la ligne <b>précédente</b> (parent dans le parcours).",
    "<code>CONNECT BY noparent = PRIOR nopers</code> → descend (parent → enfants).",
    "<code>CONNECT BY nopers = PRIOR noparent</code> → remonte (enfant → ancêtres).",
    "<code>LEVEL</code> = profondeur (racine = 1).",
    "Condition dans <code>WHERE</code> : la ligne est masquée mais le parcours continue. Condition dans <code>CONNECT BY</code> : la branche est coupée.",
    "Pas de jointure dans un SELECT avec CONNECT BY.",
  ],
  blocks: [
    { h: "Parcours d'un arbre", items: [
      P("Table <code>GENERATION(nopers, noparent, nom, sexe, anNais, anDec)</code> : un seul parent mémorisé par personne."),
      C(`SELECT LEVEL, nom, sexe
FROM generation
CONNECT BY noparent = PRIOR nopers
START WITH nom = 'ARTHUR';`),
      C(`-- WHERE : élimine les lignes sans interrompre le parcours
SELECT LEVEL, nom, sexe FROM generation
WHERE sexe = 'M'
CONNECT BY noparent = PRIOR nopers
START WITH nom = 'ARTHUR';

-- Condition dans CONNECT BY : le parcours s'arrête dans la branche
SELECT LEVEL, nom, andec FROM generation
CONNECT BY noparent = PRIOR nopers AND andec < 1800
START WITH nom = 'ARTHUR';`),
    ]},
    { h: "Pseudo-colonnes et options", items: [
      TB(["Mot-clé", "Signification"], [
        ["<code>LEVEL</code>", "Profondeur du nœud (racine = 1)"],
        ["<code>PRIOR</code>", "Ligne précédente reliée à la ligne courante"],
        ["<code>CONNECT_BY_ISLEAF</code>", "1 si feuille, 0 sinon"],
        ["<code>CONNECT_BY_ROOT(col)</code>", "Valeur de la colonne pour la racine"],
        ["<code>NOCYCLE</code>", "Évite les boucles infinies (A gère B, B gère C, C gère A)"],
        ["<code>CONNECT_BY_ISCYCLE</code>", "1 si la ligne crée un cycle (avec NOCYCLE)"],
        ["<code>SYS_CONNECT_BY_PATH(col, sep)</code>", "Chemin depuis la racine, ex. <code>:01:02:04</code>"],
        ["<code>ORDER SIBLINGS BY</code>", "Trie les enfants d'un même niveau"],
      ]),
      C(`SELECT LEVEL, NoPers, LPAD(' ', 4 * (LEVEL - 1)) || Nom,
       PRIOR Nom "Nom Parent",
       CONNECT_BY_ISLEAF "Feuille",
       CONNECT_BY_ROOT(Nom) "Racine",
       SYS_CONNECT_BY_PATH(NoPers, ':') "Chemin"
FROM personne
CONNECT BY NOCYCLE PRIOR NoPers = NoParent
START WITH NoParent IS NULL
ORDER SIBLINGS BY Nom;`),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "ldd", code: "LDD-01", group: "ldd", title: "Tables, contraintes & LMD",
  src: "SQL Rappels · Memento",
  retenir: [
    "3 familles de contraintes : <b>domaine</b> (CHECK, UNIQUE, NOT NULL), <b>entité</b> (PRIMARY KEY), <b>référentielle</b> (FOREIGN KEY).",
    "Nommer les contraintes : <code>pk_ fk_ ck_ un_ nn_</code> (sinon Oracle les nomme SYS_Cn).",
    "Contrainte sur <b>2 colonnes</b> (PK composée, CHECK sur 2 champs) → contrainte de <b>table</b>. NOT NULL ne peut <b>jamais</b> être une contrainte de table.",
    "<code>DEFAULT</code> se place <b>avant</b> les contraintes.",
    "CHECK ne peut pas porter sur 2 tables → il faut un <b>trigger</b>.",
    "<code>ON DELETE CASCADE</code> supprime les fils ; <code>ON DELETE SET NULL</code> met leur FK à NULL.",
    "<code>TRUNCATE</code> est irrémédiable, <code>DELETE</code> peut être annulé (ROLLBACK).",
  ],
  blocks: [
    { h: "CREATE TABLE", items: [
      C(`CREATE TABLE tab (
  col1 type [NOT NULL | NULL] [DEFAULT val] [contrainte_col ...],
  col2 type ...,
  [, contrainte_tab ...]);
-- types : NUMBER, NUMBER(8,2), VARCHAR2(n), CHAR(n), INTEGER, DATE`, "Memento"),
      C(`CREATE TABLE avion (
  numav   CHAR(4) CONSTRAINT pk_avion PRIMARY KEY,
  annServ NUMBER DEFAULT 2025,
  nomav   CHAR(15) CONSTRAINT nn_nomav NOT NULL
                   CONSTRAINT un_nomav UNIQUE,
  nbhvol  NUMBER CONSTRAINT ck_nbhvol CHECK (nbhvol > 0),
  codetype CHAR(4) CONSTRAINT fk_type
           REFERENCES type_appareil(codetype) ON DELETE CASCADE);`, "Contraintes de colonne"),
      C(`CREATE TABLE affectation (
  numpil CHAR(4),
  numvol CHAR(5),
  ...,
  CONSTRAINT pk_affectation PRIMARY KEY (numpil, numvol),
  CONSTRAINT fk_aff_pil FOREIGN KEY (numpil) REFERENCES pilote(numpil));

CREATE TABLE pilote (
  ...,
  salaire NUMBER CONSTRAINT nn_salaire NOT NULL
                 CONSTRAINT ck_salaire CHECK (salaire > 0),
  comm NUMBER,
  CONSTRAINT ck_comm_sal CHECK (comm < salaire));  -- 2 colonnes : niveau table`, "Contraintes de table"),
      P("Exemples de CHECK : <code>CHECK (app IN ('A','B','C'))</code>, <code>CHECK (note BETWEEN 0 AND 20)</code>, <code>CHECK (nuAvion LIKE 'A%')</code>."),
      C(`-- Colonne virtuelle : non stockée, calculée à la demande
salAnnuel GENERATED ALWAYS AS (sal * 12) VIRTUAL

-- Créer une table à partir d'une requête
CREATE TABLE pilote_paris AS (SELECT nom, prenom FROM pilote WHERE ville = 'PARIS');`),
    ]},
    { h: "DROP et ALTER", items: [
      C(`DROP TABLE vol CASCADE CONSTRAINTS;   -- supprime aussi les références à la table

ALTER TABLE pilote ADD pnom VARCHAR2(15);
ALTER TABLE pilote RENAME COLUMN pnom TO prenom;
ALTER TABLE pilote DROP COLUMN prenom;
ALTER TABLE client MODIFY cli_prenom VARCHAR2(25) NOT NULL;
ALTER TABLE avion MODIFY nbhvol DEFAULT 0;
ALTER TABLE vol ADD (CONSTRAINT pk_vol PRIMARY KEY (nuvol),
                     CONSTRAINT ck_heures CHECK (dep_h < ar_h));
ALTER TABLE vol DROP CONSTRAINT ck_heures;`),
      T("Sans <code>CASCADE CONSTRAINTS</code>, il faut supprimer les tables dans l'ordre (les filles avant les mères)."),
      T("<code>ALTER</code> ne permet pas de changer le type d'une colonne qui contient déjà des données."),
    ]},
    { h: "INSERT, UPDATE, DELETE, TRUNCATE", items: [
      C(`INSERT INTO pilote (nopilote, nom, pnom, ville, sal)
VALUES ('2500', 'DUPONT', 'Jean', 'Reims', 2500);

INSERT INTO pilote_parisiens
SELECT * FROM pilote WHERE ville = 'PARIS';   -- pas d'ORDER BY ici

UPDATE pilote SET sal = sal * 1.1 WHERE comm IS NULL;
UPDATE pilote
SET sal = (SELECT MAX(sal) FROM pilote WHERE comm IS NULL)
WHERE embauche > TO_DATE('01-02-92', 'DD-MM-YY');

DELETE FROM affectation
WHERE novol IN (SELECT novol FROM vol WHERE vildep = 'MARSEILLE');

TRUNCATE TABLE affectation DROP STORAGE;  -- irrémédiable`),
      T("Insérer explicitement <code>NULL</code> n'utilise <b>pas</b> la valeur par défaut de la colonne."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "vues", code: "LDD-02", group: "ldd", title: "Les vues",
  src: "SQL Rappels · Memento",
  retenir: [
    "Une vue est une <b>table virtuelle</b> : le SELECT est ré-exécuté à chaque appel, elle est toujours à jour (dynamique).",
    "Si une table source est supprimée, la vue n'est plus accessible.",
    "Pas d'<code>ORDER BY</code> dans la création d'une vue.",
    "Vue modifiable si : pas de jointure, GROUP BY ni sous-requête, pas de colonne calculée ; pour INSERT, toutes les colonnes NOT NULL présentes.",
    "<code>WITH CHECK OPTION</code> : refuse les INSERT/UPDATE qui produiraient des lignes hors de la vue.",
  ],
  blocks: [
    { h: "Créer et utiliser", items: [
      C(`CREATE [OR REPLACE] VIEW nom_vue [(colA, colB, ...)]
AS SELECT ...
[WITH CHECK OPTION];`, "Memento"),
      C(`CREATE OR REPLACE VIEW v_pilote AS
SELECT nopilote, nom, pnom, sal FROM pilote WHERE ville = 'PARIS';

UPDATE v_pilote SET sal = sal * 1.1;          -- modifie les pilotes de PARIS
INSERT INTO v_pilote VALUES (20, 'GHETTA', 'David', 5000);
-- inséré dans PILOTE mais invisible dans la vue (ville NULL)`),
      P("Avantages : <b>sécurité</b> (ne donner accès qu'à certaines colonnes/lignes), <b>simplification</b> des requêtes multi-tables, <b>isolation</b> des modifications de structure. Inconvénients : performances, restrictions de mise à jour."),
      T("Si la vue ne contient pas la clé primaire NOT NULL, l'INSERT échoue : <code>ORA-01400 impossible d'insérer NULL</code> (sauf séquence + trigger ou <code>GENERATED AS IDENTITY</code>)."),
    ]},
    { h: "WITH CHECK OPTION", items: [
      C(`CREATE OR REPLACE VIEW v_pilote AS
SELECT * FROM pilote WHERE ville = 'PARIS'
WITH CHECK OPTION;

UPDATE v_pilote SET ville = 'LAON' WHERE nom = 'DUPONT';      -- interdit
INSERT INTO v_pilote (nopilote, nom, prnm) VALUES ('P01','DUPUIS','Marc'); -- interdit
INSERT INTO v_pilote (nopilote, nom, prnm, ville)
VALUES ('P01','DUPUIS','Marc','PARIS');                        -- OK`),
      TIP("Pour modifier une vue issue d'une jointure, on utilise un trigger <code>INSTEAD OF</code> (voir fiche Triggers)."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "droits", code: "LDD-03", group: "ldd", title: "Privilèges, rôles & dictionnaire",
  src: "SQL Rappels",
  retenir: [
    "Privilèges <b>système</b> (CREATE SESSION, CREATE TABLE…) et <b>objet</b> (SELECT, INSERT, UPDATE, DELETE, REFERENCES sur une table).",
    "Un utilisateur créé n'a <b>aucun</b> droit, pas même celui de se connecter (CREATE SESSION).",
    "On ne peut pas accorder de privilège sur un objet qui ne nous appartient pas.",
    "UPDATE et DELETE nécessitent aussi le privilège SELECT.",
    "Pas de SELECT par colonne : passer par une <b>vue</b>.",
    "<code>WITH GRANT OPTION</code> : le bénéficiaire peut transmettre le droit.",
  ],
  blocks: [
    { h: "GRANT / REVOKE", items: [
      C(`GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW TO bob;
GRANT SELECT ON pilote TO PUBLIC;
REVOKE SELECT ON pilote FROM PUBLIC;
GRANT INSERT ON pilote TO bob, bill;
GRANT SELECT, INSERT, UPDATE ON affectation TO dupont;
GRANT UPDATE (salaire, comm) ON pilote TO durant;   -- UPDATE par colonne : OK
GRANT REFERENCES ON pilote TO durant;
GRANT SELECT ON pilote TO dupont WITH GRANT OPTION;
REVOKE ALL PRIVILEGES ON pilote FROM PUBLIC;
GRANT EXECUTE ON ma_procedure TO autre_schema;`),
      C(`-- Lecture de NOM et ADRESSE seulement
CREATE VIEW v_pilote AS SELECT nom, adresse FROM pilote;
GRANT SELECT ON v_pilote TO durant;`),
      T("<code>PUBLIC</code> ne vise personne en particulier : on ne peut pas retirer à un utilisateur précis un droit donné à PUBLIC."),
    ]},
    { h: "Rôles", items: [
      C(`CREATE ROLE compta;
GRANT SELECT, INSERT, UPDATE, DELETE ON facture TO compta;
GRANT compta TO dupont, durant;`),
      P("Rôles standard : <code>CONNECT</code>, <code>RESOURCE</code>, <code>DBA</code> (les deux derniers accordent beaucoup de droits)."),
    ]},
    { h: "Dictionnaire de données", items: [
      TB(["Vue", "Contenu"], [
        ["<code>USER_TABLES</code> / <code>ALL_TABLES</code>", "Tables"],
        ["<code>USER_TAB_COLUMNS</code>", "Colonnes, types, nullable"],
        ["<code>USER_CONSTRAINTS</code>", "Contraintes (constraint_type)"],
        ["<code>USER_INDEXES</code>, <code>USER_IND_COLUMNS</code>", "Index"],
        ["<code>USER_TAB_PRIVS</code>", "Privilèges objet"],
        ["<code>DBA_SYS_PRIVS</code>, <code>DBA_ROLE_PRIVS</code>", "Privilèges système, rôles"],
        ["<code>USER_TRIGGERS</code>", "Déclencheurs"],
        ["<code>USER_ERRORS</code>, <code>USER_SOURCE</code>, <code>USER_OBJECTS</code>", "Erreurs de compilation, code source, statut VALID/INVALID"],
      ]),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "index", code: "PERF-01", group: "perf", title: "Les index",
  src: "Index",
  retenir: [
    "Un index <b>accélère</b> une requête sans changer son résultat ; il associe la valeur indexée à l'<b>adresse</b> (ROWID) de la ligne.",
    "Créé automatiquement sur les clés primaires et UNIQUE, <b>pas</b> sur les clés étrangères (à indexer soi-même).",
    "Trop d'index ralentit INSERT/UPDATE/DELETE (maintenus automatiquement).",
    "Index composite <code>(nom, prenom)</code> : utilisable pour nom seul ou nom+prénom, <b>pas</b> prénom seul.",
    "B-tree : valeur, intervalle, préfixe. <b>Jamais</b> par suffixe (<code>LIKE '%ette'</code>). Hachage : égalité uniquement.",
    "Une <b>fonction</b> sur la colonne (UPPER, TO_CHAR, EXTRACT) empêche l'usage de l'index → index sur fonction.",
    "On indexe pour des <b>requêtes</b>, pas pour « une table ». Vérifier avec <code>EXPLAIN PLAN</code>.",
  ],
  blocks: [
    { h: "Pourquoi un index", items: [
      P("Les données sont sur le disque (mémoire secondaire, lente) et lues par <b>blocs</b>. Sans index, le SGBD parcourt séquentiellement tous les blocs. Exemple du cours : table FILMS, 1 000 000 de lignes de 1200 octets, blocs de 4 Ko → 3 lignes par bloc, environ 300 000 blocs (1,2 Go)."),
      C(`SELECT * FROM test WHERE com LIKE '2000000%';  -- 1590 ms
CREATE INDEX id_com ON test(com);
SELECT * FROM test WHERE com LIKE '2000000%';  -- 24 ms`),
    ]},
    { h: "Créer", items: [
      C(`CREATE INDEX idx_nomProduit ON produit (nomProduit);
CREATE INDEX idx_client ON client (nomClient, prenomClient);  -- composite
CREATE INDEX fk_codep ON client (codep);                      -- sur une FK
CREATE INDEX mon_idx ON ma_table (UPPER(a));                  -- sur fonction`),
      P("Un index peut être unique ou non, composite, ascendant ou descendant."),
    ]},
    { h: "Structures : B-tree et hachage", items: [
      TB(["", "B-tree (arbre équilibré)", "Hachage"], [
        ["Principe", "Racine, nœuds internes, feuilles triées et chaînées (valeur + adresse). Toutes les feuilles à la même profondeur.", "Fonction H(clé) → numéro d'emplacement"],
        ["Recherche", "Dichotomique, temps presque constant", "Accès direct par calcul"],
        ["Égalité", "Oui", "Oui"],
        ["Intervalle / préfixe", "Oui", "Non"],
        ["Usage", "Le plus courant, clés primaires", "Colonnes à valeurs uniques"],
      ]),
      P("Les feuilles du B-tree forment un index <b>dense</b> (toutes les clés) ; les niveaux internes sont <b>non denses</b> (une clé par bloc du niveau inférieur). Quand une feuille est pleine, elle se divise en deux, ce qui garde l'arbre équilibré."),
    ]},
    { h: "Méthodologie et EXPLAIN PLAN", items: [
      UL("Indexer les clés étrangères.", "Repérer les requêtes qui filtrent (WHERE), trient (ORDER BY), regroupent (GROUP BY) ou joignent.", "Créer les index adaptés.", "Valider avec le plan d'exécution."),
      C(`EXPLAIN PLAN SET statement_id = 'Test' FOR
SELECT * FROM commande WHERE com LIKE '2000000%';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);`),
      P("C'est l'<b>optimiseur</b> qui décide d'utiliser ou non l'index. Causes de non-utilisation : mauvais type de valeur, fonction sur la colonne, mauvais opérateur, index redondants."),
      C(`-- N'utilise PAS l'index sur dat
WHERE EXTRACT(YEAR FROM dat) = 2005
-- Utilise l'index sur dat
WHERE dat >= TO_DATE('01-01-2005','DD-MM-YYYY')
AND   dat <  TO_DATE('01-01-2006','DD-MM-YYYY')`),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "transactions", code: "PERF-02", group: "perf", title: "Transactions & isolation",
  src: "Transactions",
  retenir: [
    "Transaction = suite de lectures/écritures terminée par <code>COMMIT</code> (valide) ou <code>ROLLBACK</code> (annule).",
    "Toute modification du schéma (LDD) <b>ferme</b> la transaction. Pas de transactions imbriquées.",
    "<b>ACID</b> : Atomicité, Cohérence, Isolation, Durabilité.",
    "Oracle propose <b>READ COMMITTED</b> (défaut) et <b>SERIALIZABLE</b> (+ READ ONLY).",
    "Verrou <b>S</b> (partagé, lecture) ; verrou <b>X</b> (exclusif, écriture). Libérés au COMMIT/ROLLBACK.",
    "<code>SELECT … FOR UPDATE</code> pose un verrou exclusif sur les lignes lues.",
  ],
  blocks: [
    { h: "ACID", items: [
      TB(["Lettre", "Propriété", "Mise en œuvre"], [
        ["A", "<b>Atomicité</b> : tout ou rien", "Journalisation"],
        ["C", "<b>Cohérence</b> : d'un état cohérent à un autre", "Contraintes PK, FK, CHECK, triggers"],
        ["I", "<b>Isolation</b> : comme si la transaction était seule", "Niveaux d'isolation, verrous"],
        ["D", "<b>Durabilité</b> : après COMMIT, c'est définitif", "Journal ; GRANT limite les accès"],
      ]),
      C(`-- Retarder la vérification des contraintes jusqu'au COMMIT
SET CONSTRAINTS ALL DEFERRED;   -- pour les contraintes DEFERRABLE
-- ou créer la contrainte DEFERRABLE INITIALLY DEFERRED`),
    ]},
    { h: "Anomalies de concurrence", items: [
      TB(["Anomalie", "Description"], [
        ["Écriture sale (dirty write)", "Une écriture écrase des données non validées d'une autre session"],
        ["Lecture sale (dirty read)", "On lit une valeur modifiée mais pas encore validée (puis annulée)"],
        ["Lecture non répétable", "La même donnée lue 2 fois donne 2 valeurs différentes"],
        ["Perte de mise à jour (lost update)", "Deux sessions modifient la même donnée : la dernière écrase l'autre"],
        ["Lecture fantôme (phantom)", "Une même requête voit apparaître de <b>nouvelles lignes</b>"],
      ]),
    ]},
    { h: "Niveaux d'isolation", items: [
      C(`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`),
      ["isolation"],
      P("Plus le niveau est permissif, plus l'exécution est fluide mais plus d'anomalies sont possibles. Le niveau par défaut d'un SGBD n'est jamais le plus strict. Après un COMMIT, Oracle revient en READ COMMITTED."),
    ]},
    { h: "Contrôle de concurrence", items: [
      UL(
        "<b>Verrous</b> (pessimiste) : fiable mais lourd. On joue sur la granularité, le mode (S/X) et la durée.",
        "<b>Estampilles</b> (timestamp) : une donnée modifiée après le début de la transaction A fait annuler et relancer A.",
        "<b>Optimiste</b> : tout est autorisé, on vérifie les conflits avant le COMMIT, sinon ROLLBACK et relance. Adapté aux transactions surtout en lecture."
      ),
      P("Un objet peut avoir plusieurs verrous S en même temps ; un verrou X est impossible tant qu'un verrou S existe. UPDATE pose implicitement un verrou X."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "plsql", code: "PL-01", group: "plsql", title: "Bloc PL/SQL, variables & contrôle",
  src: "PL/SQL · Memento",
  retenir: [
    "Bloc = <code>[DECLARE]</code> + <code>BEGIN … END;</code> (obligatoire) + <code>[EXCEPTION]</code>. Anonyme ou stocké (procédure, fonction, trigger).",
    "Affectation avec <code>:=</code>. Une déclaration par ligne. Pas d'usage d'une variable avant sa déclaration.",
    "<code>%TYPE</code> = type d'une colonne ; <code>%ROWTYPE</code> = ligne entière.",
    "<code>SELECT … INTO</code> obligatoire dans un bloc, et doit renvoyer <b>exactement une</b> ligne.",
    "PL/SQL n'est pas sensible à la casse. Une variable nommée comme une colonne est masquée par la colonne : préfixer <code>v_</code>.",
    "<code>SET SERVEROUTPUT ON</code> pour voir <code>DBMS_OUTPUT.PUT_LINE</code>. <code>/</code> pour exécuter le bloc.",
  ],
  blocks: [
    { h: "Structure", items: [
      C(`DECLARE
  v_ch VARCHAR2(15) := 'Hello World';
BEGIN
  DBMS_OUTPUT.PUT_LINE(v_ch);
EXCEPTION
  WHEN OTHERS THEN NULL;
END;
/`),
      P("Le bloc entier est envoyé au moteur PL/SQL, qui sous-traite le SQL au moteur SQL : un seul accès réseau. Les blocs peuvent être imbriqués ; une variable est <b>locale</b> à son bloc."),
    ]},
    { h: "Déclarations et types", items: [
      C(`DECLARE
  v_nb      INTEGER := 0;
  v_date    DATE := SYSDATE;
  v_char    CHAR(1) := 'A';
  c_pi      CONSTANT NUMBER := 3.1415926535;
  v_nom     pilote.nom%TYPE;            -- type d'une colonne
  v_prime_min v_prime%TYPE;             -- type d'une autre variable
  rty_emp   emp%ROWTYPE;                -- une ligne complète
  SUBTYPE chaine_courte IS VARCHAR2(10);
  TYPE pilote_rec IS RECORD (
    no_pilote     pilote.nopilote%TYPE,
    revenu_pilote NUMBER(8,2));
  r_pilote  pilote_rec;`),
      T("<code>i, j, k NUMBER;</code> est interdit. <code>v_maxi NUMBER := 2 * v_mini;</code> avant la déclaration de v_mini est interdit."),
      TB(["Objet", "Convention"], [
        ["Variable", "<code>v_compteur</code>"], ["Constante", "<code>c_pi</code>"], ["Exception", "<code>e_pasTrouve</code>"],
        ["Type RECORD", "<code>pilote_rec</code>"], ["Variable RECORD", "<code>r_pilote</code>"], ["Variable ROWTYPE", "<code>rty_pilote</code>"],
        ["Curseur", "<code>pilotes_cur</code>"], ["Substitution", "<code>s_numPil</code> (utilisée avec <code>&amp;</code>)"], ["Session (globale)", "<code>g_compteur</code> (utilisée avec <code>:</code>)"],
      ]),
    ]},
    { h: "Affectation", items: [
      C(`v_total := v_total + 1;

SELECT nom, sal INTO v_nom, v_sal FROM pilote WHERE nopilote = '7937';
SELECT * INTO rty_emp FROM emp WHERE empno = 7499;

INSERT INTO pilote VALUES (seq.NEXTVAL, 'DURANT', ...)
RETURNING nopilote, sal INTO v_nopilote, v_sal;`),
      T("Conflit de noms : <code>DELETE FROM pilote WHERE nom = nom;</code> supprime <b>tous</b> les pilotes (la colonne l'emporte). Utiliser <code>v_nom</code> ou une étiquette <code>&lt;&lt;principal&gt;&gt;</code> + <code>principal.nom</code>."),
    ]},
    { h: "Structures de contrôle", items: [
      C(`IF condition THEN ...
ELSIF condition THEN ...
ELSE ...
END IF;

CASE v_num                         -- CASE simple
  WHEN 1 THEN ...
  ELSE ...
END CASE;

CASE                               -- CASE de recherche
  WHEN v_num BETWEEN 1 AND 3 THEN ...
  ELSE ...                         -- sans ELSE : erreur si aucun cas
END CASE;

LOOP
  ...
  EXIT WHEN condition;
END LOOP;

FOR i IN [REVERSE] 1..3 LOOP       -- i non déclaré, pas de 1
  DBMS_OUTPUT.PUT_LINE(TO_CHAR(i));
END LOOP;

WHILE i < 3 LOOP
  i := i + 1;
END LOOP;`),
    ]},
    { h: "Variables de substitution et de session (SQL*Plus)", items: [
      C(`ACCEPT s_numPil PROMPT 'Entrer un numéro de pilote'
DECLARE
  v_nom pilote.nom%TYPE;
BEGIN
  SELECT nom INTO v_nom FROM pilote WHERE numPil = '&s_numPil';
END;
/
VARIABLE g_compteur NUMBER
BEGIN
  :g_compteur := 99 + 1;
END;
/
PRINT g_compteur`),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "exceptions", code: "PL-02", group: "plsql", title: "Gestion des exceptions",
  src: "PL/SQL · Memento",
  retenir: [
    "Erreur → saut dans <code>EXCEPTION WHEN nom THEN …</code> ; <code>WHEN OTHERS</code> en dernier.",
    "Prédéfinies : <code>NO_DATA_FOUND</code>, <code>TOO_MANY_ROWS</code>, <code>DUP_VAL_ON_INDEX</code>, <code>ZERO_DIVIDE</code>, <code>VALUE_ERROR</code>, <code>INVALID_NUMBER</code>…",
    "<b>Seul</b> un <code>SELECT … INTO</code> lève NO_DATA_FOUND. Un UPDATE/DELETE qui ne touche aucune ligne ne lève rien.",
    "Non prédéfinies : <code>PRAGMA EXCEPTION_INIT(e, -code)</code>. À connaître : <b>-2290</b> CHECK, <b>-2291</b> parent introuvable, <b>-2292</b> fils existant.",
    "<code>RAISE_APPLICATION_ERROR(num, msg)</code> avec num entre <b>-20000 et -20999</b> : interrompt et renvoie l'erreur.",
    "<code>SQLCODE</code> / <code>SQLERRM</code> : code et message de la dernière erreur.",
    "Non traitée, l'exception remonte de bloc en bloc jusqu'à l'appelant.",
  ],
  blocks: [
    { h: "Exceptions prédéfinies", items: [
      C(`DECLARE
  v_nom emp.nom%TYPE;
BEGIN
  SELECT nom INTO v_nom FROM emp WHERE ville = 'REIMS';
  DBMS_OUTPUT.PUT_LINE('Le pilote ' || v_nom || ' habite REIMS'); -- sautée si erreur
EXCEPTION
  WHEN NO_DATA_FOUND THEN DBMS_OUTPUT.PUT_LINE('Pas de pilote à REIMS');
  WHEN TOO_MANY_ROWS THEN DBMS_OUTPUT.PUT_LINE('Plusieurs pilotes à REIMS');
END;`),
      TB(["Code", "Nom"], [
        ["ORA-01403 (SQLCODE +100)", "NO_DATA_FOUND"], ["ORA-01422", "TOO_MANY_ROWS"], ["ORA-00001", "DUP_VAL_ON_INDEX"],
        ["ORA-01476", "ZERO_DIVIDE"], ["ORA-06502", "VALUE_ERROR"], ["ORA-01722", "INVALID_NUMBER"],
        ["ORA-06511", "CURSOR_ALREADY_OPEN"], ["ORA-01001", "INVALID_CURSOR"],
      ]),
    ]},
    { h: "Erreurs Oracle non prédéfinies", items: [
      C(`DECLARE
  e_compInconnue EXCEPTION;
  PRAGMA EXCEPTION_INIT(e_compInconnue, -2291);
BEGIN
  INSERT INTO pilote (numpil, nom, sal, comp) VALUES ('P2', 'DUPONT', 3000, 'GR');
EXCEPTION
  WHEN e_compInconnue THEN
    DBMS_OUTPUT.PUT_LINE('Insertion impossible : compagnie inexistante');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Erreur Oracle ' || SQLERRM || ' (' || SQLCODE || ')');
END;`),
      TB(["Code", "Cause"], [
        ["-2290", "Violation de contrainte CHECK"],
        ["-2291", "Clé parent introuvable (INSERT/UPDATE d'une FK inexistante)"],
        ["-2292", "Enregistrement fils existant (DELETE d'un parent référencé)"],
        ["-6502", "Valeur trop longue pour la variable"],
      ]),
    ]},
    { h: "Erreurs utilisateur", items: [
      C(`DECLARE
  e_comm EXCEPTION;
BEGIN
  ...
  IF v_sal < v_comm THEN RAISE e_comm; END IF;
EXCEPTION
  WHEN e_comm THEN INSERT INTO erreur VALUES (v_nom, 'COMM > SAL');
END;`),
      C(`RAISE_APPLICATION_ERROR(-20001, 'Trop d''heures');
-- ORA-20001: Trop d'heures`),
    ]},
    { h: "Deux requêtes, même exception", items: [
      P("Pour savoir quelle requête a levé NO_DATA_FOUND : 1) une variable témoin (<code>v_requete := 2</code> avant la 2e requête) testée dans EXCEPTION, ou 2) un <b>sous-bloc</b> BEGIN … EXCEPTION … END autour de la 1re requête (la 2e s'exécute même si la 1re échoue)."),
      TIP("Astuce du cours : <code>SELECT 'x' INTO v_filler … ;</code> puis <code>RAISE_APPLICATION_ERROR</code> s'il existe des lignes, et l'action normale dans <code>WHEN NO_DATA_FOUND</code>."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "curseurs", code: "PL-03", group: "plsql", title: "Les curseurs",
  src: "PL/SQL · Memento",
  retenir: [
    "<b>Implicite</b> : SELECT INTO, INSERT, UPDATE, DELETE → attributs <code>SQL%…</code>.",
    "<b>Explicite</b> : pour un SELECT qui renvoie plusieurs lignes. 4 étapes : <b>déclarer, ouvrir, lire (FETCH), fermer</b>.",
    "Rien entre <code>FETCH</code> et <code>EXIT WHEN c%NOTFOUND</code>.",
    "Attributs : <code>%FOUND</code>, <code>%NOTFOUND</code>, <code>%ISOPEN</code>, <code>%ROWCOUNT</code> (à lire <b>avant</b> CLOSE).",
    "<code>FOR rec IN curseur LOOP</code> : pas d'OPEN, FETCH, CLOSE, ni de déclaration de rec.",
    "<code>FOR UPDATE</code> + <code>WHERE CURRENT OF c</code> pour modifier la ligne courante.",
  ],
  blocks: [
    { h: "Curseur explicite complet", items: [
      C(`DECLARE
  CURSOR emp_cur IS SELECT num, nom FROM emp WHERE UPPER(ville) = 'REIMS';
  v_num emp.num%TYPE;
  v_nom emp.nom%TYPE;
BEGIN
  OPEN emp_cur;
  LOOP
    FETCH emp_cur INTO v_num, v_nom;
    EXIT WHEN emp_cur%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('Employé ' || TO_CHAR(v_num) || ' ' || v_nom);
  END LOOP;
  DBMS_OUTPUT.PUT_LINE(emp_cur%ROWCOUNT || ' employés');
  CLOSE emp_cur;
END;`),
    ]},
    { h: "Curseur paramétré", items: [
      C(`DECLARE
  CURSOR c_emp (p_nom IN emp.nom%TYPE) IS
    SELECT num, nom FROM emp WHERE nom = p_nom;
BEGIN
  OPEN c_emp('DURANT');  ... CLOSE c_emp;
  OPEN c_emp('DUPONT');  ... CLOSE c_emp;
END;
-- passage par position OPEN c2(12000, 2500) ou par nom OPEN c2(pcom => 2500, psal => 12000)`),
    ]},
    { h: "Boucle FOR", items: [
      C(`-- Curseur déclaré
FOR rec IN emp_cur LOOP
  DBMS_OUTPUT.PUT_LINE(rec.nom);   -- rec visible uniquement dans la boucle
END LOOP;

-- Curseur déclaré dans le FOR (temporaire, non réutilisable)
FOR emp IN (SELECT num, nom FROM emp WHERE UPPER(ville) = 'REIMS') LOOP
  DBMS_OUTPUT.PUT_LINE(emp.nom);
END LOOP;`),
      T("Avec FOR, <code>%ROWCOUNT</code> n'est plus accessible après la boucle : compter soi-même avec un compteur."),
    ]},
    { h: "Attributs avec un curseur implicite", items: [
      C(`DELETE FROM pilote WHERE nbhvol < v_nbhvol;
DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' pilotes supprimés');
IF SQL%NOTFOUND THEN DBMS_OUTPUT.PUT_LINE('Aucun pilote supprimé'); END IF;`),
    ]},
    { h: "Modifier la ligne courante", items: [
      C(`DECLARE
  CURSOR cur1 IS SELECT nom, sal, comm FROM pilote FOR UPDATE;  -- verrou
BEGIN
  FOR r IN cur1 LOOP
    IF r.comm IS NULL THEN
      DELETE FROM pilote WHERE CURRENT OF cur1;
    ELSIF r.comm > r.sal THEN
      UPDATE pilote SET sal = r.sal + r.comm, comm = 0 WHERE CURRENT OF cur1;
    END IF;
  END LOOP;
END;`),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "sousprog", code: "PL-04", group: "plsql", title: "Procédures, fonctions & paquetages",
  src: "PL/SQL · Memento",
  retenir: [
    "Procédure = code nommé stocké ; fonction = procédure qui <b>retourne</b> une valeur (<code>RETURN type</code>).",
    "Modes : <code>IN</code> (défaut), <code>OUT</code>, <code>IN OUT</code>. Une fonction n'a que des paramètres IN.",
    "Pas de taille dans le type d'un paramètre (<code>NUMBER</code>, pas <code>NUMBER(5)</code>) : utiliser <code>%TYPE</code>.",
    "Appel d'une fonction : il faut récupérer ou utiliser la valeur renvoyée.",
    "<code>SHOW ERRORS</code> après « created with compilation errors ».",
    "Paquetage = <b>spécification</b> (partie publique) + <b>corps</b> (implémentation, éléments privés). Appel : <code>paquet.objet</code>.",
  ],
  blocks: [
    { h: "Procédure", items: [
      C(`CREATE [OR REPLACE] PROCEDURE nom_proc
  [(arg [IN | OUT | IN OUT] type, ...)]
IS | AS
  [déclarations locales]
BEGIN
  instructions;
END;`, "Syntaxe"),
      C(`CREATE OR REPLACE PROCEDURE test_augmentation
  (x_numemp IN emp.empno%TYPE,
   x_mnt    IN OUT NUMBER)
IS
  v_salaire emp.sal%TYPE;
BEGIN
  SELECT sal INTO v_salaire FROM emp WHERE empno = x_numemp;
  x_mnt := v_salaire + x_mnt;   -- renvoyé à l'appelant
END;`),
    ]},
    { h: "Fonction", items: [
      C(`CREATE OR REPLACE FUNCTION f_test_augmentation
  (x_numemp IN emp.empno%TYPE, x_pourcent IN NUMBER)
RETURN NUMBER
IS
  v_salaire emp.sal%TYPE;
BEGIN
  SELECT sal INTO v_salaire FROM emp WHERE empno = x_numemp;
  RETURN v_salaire * x_pourcent;
END;`),
    ]},
    { h: "Appeler", items: [
      C(`-- SQL*Plus
EXECUTE nv_pilote('3571', 'MARTIN', 'ORLY', 25000, 6000);
EXECUTE nv_pilote(x_nopilote => '3571', x_nom => 'MARTIN', ...);
VARIABLE moy NUMBER
EXECUTE :moy := moy_h_vol('AB3');
PRINT moy

-- Bloc PL/SQL
DECLARE
  v_mnt NUMBER := 500;
BEGIN
  test_augmentation(7369, v_mnt);
  DBMS_OUTPUT.PUT_LINE(TO_CHAR(f_test_augmentation(7369, 1.1)));
END;`),
      P("Privilèges : <code>CREATE PROCEDURE</code> (son schéma), <code>CREATE ANY PROCEDURE</code>, et <code>GRANT EXECUTE ON proc TO …</code> pour autoriser l'appel."),
    ]},
    { h: "Paquetages", items: [
      C(`CREATE OR REPLACE PACKAGE pkg_finance IS
  vg_salaire emp.sal%TYPE;                          -- variable publique
  FUNCTION f_test_augmentation (p_num IN emp.empno%TYPE, p_pct IN NUMBER) RETURN NUMBER;
  PROCEDURE test_augmentation (p_num IN emp.empno%TYPE, p_pct IN OUT NUMBER);
END pkg_finance;

CREATE OR REPLACE PACKAGE BODY pkg_finance IS
  PROCEDURE affiche_salaires IS ... END;           -- privée
  FUNCTION f_test_augmentation (...) RETURN NUMBER IS ... END;
  PROCEDURE test_augmentation (...) IS ... END;
END pkg_finance;

-- Appel
v := pkg_finance.f_test_augmentation(7369, 1.1);
DROP PACKAGE pkg_finance;  DROP PACKAGE BODY pkg_finance;`),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "triggers", code: "PL-05", group: "plsql", title: "Les déclencheurs (triggers)",
  src: "PL/SQL Trigger · Memento",
  retenir: [
    "Ne pas utiliser de trigger quand une <b>contrainte d'intégrité</b> suffit (plus rapide, garantit toutes les données).",
    "Trigger LMD lié à <b>une seule</b> table ; d'ordre (une fois) ou de ligne (<code>FOR EACH ROW</code>, une fois par ligne).",
    "<code>:OLD</code> / <code>:NEW</code> uniquement dans un trigger <b>ligne</b> ; toujours avec un champ (<code>:NEW.sal</code>).",
    "<code>:NEW</code> modifiable seulement dans un trigger <b>BEFORE</b> ; <code>:OLD</code> jamais modifiable.",
    "Dans <code>WHEN (…)</code>, pas de <code>:</code> devant new/old. Pas de requête SQL dans WHEN.",
    "Table <b>mutante</b> (ORA-04091) : un trigger ligne (sauf BEFORE INSERT) ne peut pas lire/modifier sa propre table → trigger <b>composé</b>.",
    "<code>RAISE_APPLICATION_ERROR</code> dans le trigger annule l'ordre qui l'a déclenché.",
  ],
  blocks: [
    { h: "Syntaxe", items: [
      C(`CREATE [OR REPLACE] TRIGGER nom_trigger
{BEFORE | AFTER} {INSERT | UPDATE [OF col] | DELETE} [OR ...]
ON nom_table
[REFERENCING NEW AS nv OLD AS anc]
[FOR EACH ROW]
[FOLLOWS autre_trigger]
[WHEN (condition)]
[DECLARE
  déclarations]
BEGIN
  instructions;
END;`, "Memento"),
      P("Types : triggers <b>LMD</b> (INSERT/UPDATE/DELETE), <b>INSTEAD OF</b> (sur des vues), <b>LDD</b> (CREATE, ALTER, DROP…) et sur <b>événements</b> système/utilisateur (STARTUP, LOGON…)."),
    ]},
    { h: "Trigger d'ordre (d'état)", items: [
      C(`CREATE OR REPLACE TRIGGER verif_nbhvol
AFTER UPDATE OF nbhvol OR INSERT ON avion
DECLARE
  v_avg avion.nbhvol%TYPE;
BEGIN
  SELECT AVG(nbhvol) INTO v_avg FROM avion;
  IF v_avg > 200000 THEN
    RAISE_APPLICATION_ERROR(-20002, 'Nb moyen d''heures trop élevé : ' || TO_CHAR(v_avg));
  END IF;
END;`),
      C(`CREATE OR REPLACE TRIGGER trace_pilote
BEFORE INSERT OR UPDATE OR DELETE ON pilote
BEGIN
  IF INSERTING THEN DBMS_OUTPUT.PUT_LINE('Insertion');
  ELSIF UPDATING THEN DBMS_OUTPUT.PUT_LINE('Modification');
  ELSE DBMS_OUTPUT.PUT_LINE('Suppression');
  END IF;
END;`),
      P("Restriction par utilisateur : <code>IF USER != 'DUPONT' THEN RAISE_APPLICATION_ERROR(-20001, 'Utilisateur non autorisé'); END IF;</code>"),
    ]},
    { h: "Trigger de ligne, :OLD et :NEW", items: [
      C(`-- Règle : un pilote ne peut pas avoir plus de 3 qualifications
CREATE OR REPLACE TRIGGER verif_qualif
BEFORE INSERT ON qualif
FOR EACH ROW
DECLARE
  v_cpt pilote.nbqualif%TYPE;
  v_nom pilote.nom%TYPE;
BEGIN
  SELECT nom, nbqualif INTO v_nom, v_cpt
  FROM pilote WHERE numpil = :NEW.numpil;
  IF v_cpt < 3 THEN
    UPDATE pilote SET nbqualif = nbqualif + 1 WHERE numpil = :NEW.numpil;
  ELSE
    RAISE_APPLICATION_ERROR(-20100, v_nom || ' a déjà 3 qualifs');
  END IF;
END;

CREATE OR REPLACE TRIGGER decr_qualif
AFTER DELETE ON qualif
FOR EACH ROW
BEGIN
  UPDATE pilote SET nbqualif = nbqualif - 1 WHERE numpil = :OLD.numpil;
END;`),
      TB(["Événement", ":OLD", ":NEW"], [
        ["INSERT", "NULL", "valeur créée"],
        ["UPDATE", "valeur avant modification", "valeur après modification"],
        ["DELETE", "valeur avant suppression", "NULL"],
      ]),
      C(`-- Générer la clé : :NEW modifiable car BEFORE
CREATE OR REPLACE TRIGGER gen_num_pilote
BEFORE INSERT ON pilote
FOR EACH ROW
BEGIN
  SELECT pil_seq.NEXTVAL INTO :NEW.numpil FROM DUAL;
END;

-- Clause WHEN (pas de : devant new)
CREATE OR REPLACE TRIGGER verif_aug
BEFORE INSERT ON qualif
FOR EACH ROW
WHEN (new.cdtype = 'A320' OR new.cdtype = 'A340')
BEGIN ... END;`),
    ]},
    { h: "Table mutante et trigger composé", items: [
      P("ORA-04091 : la table est en cours de modification ; un trigger <b>ligne</b> (autre que BEFORE INSERT) ne peut ni la lire ni la modifier. Les triggers d'ordre n'ont pas ce problème."),
      C(`CREATE OR REPLACE TRIGGER emp_salaire_trigger
FOR UPDATE OF salaire ON employe
COMPOUND TRIGGER
  g_avg employe.salaire%TYPE;          -- déclarations communes

  BEFORE STATEMENT IS
  BEGIN
    SELECT ROUND(AVG(salaire)) INTO g_avg FROM employe;  -- lecture OK ici
  END BEFORE STATEMENT;

  BEFORE EACH ROW IS
  BEGIN
    IF :NEW.salaire <= g_avg THEN
      RAISE_APPLICATION_ERROR(-20001, 'Salaire inférieur à la moyenne');
    END IF;
  END BEFORE EACH ROW;

  AFTER EACH ROW IS BEGIN ... END AFTER EACH ROW;
  AFTER STATEMENT IS BEGIN ... END AFTER STATEMENT;
END emp_salaire_trigger;`),
      P("Jusqu'à 4 sections : <code>BEFORE STATEMENT</code>, <code>BEFORE EACH ROW</code>, <code>AFTER EACH ROW</code>, <code>AFTER STATEMENT</code>. <code>FOR</code> remplace BEFORE/AFTER."),
    ]},
    { h: "INSTEAD OF (sur une vue)", items: [
      C(`CREATE VIEW pilcomp AS
SELECT numpil, nom, compagnie FROM pilote p, compagnie c WHERE p.comp = c.comp;
-- INSERT direct : ORA-01776 impossible de modifier plus d'une table via une vue jointe

CREATE OR REPLACE TRIGGER ajout_pil
INSTEAD OF INSERT ON pilcomp
FOR EACH ROW
DECLARE
  v_comp compagnie.comp%TYPE;
BEGIN
  SELECT comp INTO v_comp FROM compagnie WHERE compagnie = :NEW.compagnie;
  INSERT INTO pilote (numpil, nom, comp) VALUES (:NEW.numpil, :NEW.nom, v_comp);
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE_APPLICATION_ERROR(-20001, 'Compagnie inexistante');
END;`),
    ]},
    { h: "Triggers système / LDD et gestion", items: [
      C(`CREATE OR REPLACE TRIGGER mouchard
AFTER CREATE ON SCHEMA
BEGIN
  DBMS_OUTPUT.PUT_LINE('Vous avez créé un(e) ' || ORA_DICT_OBJ_TYPE
                       || ' appelé(e) ' || ORA_DICT_OBJ_NAME);
END;

CREATE OR REPLACE TRIGGER svr_erreur
AFTER SERVERERROR ON SCHEMA
BEGIN
  INSERT INTO les_erreurs VALUES (ORA_LOGIN_USER, SYSDATE, ORA_SERVER_ERROR(1));
END;`),
      P("<code>LOGON</code> s'utilise uniquement en AFTER, <code>LOGOFF</code> uniquement en BEFORE. Attributs utiles : <code>ORA_SYSEVENT</code>, <code>ORA_DICT_OBJ_TYPE</code>, <code>ORA_DICT_OBJ_NAME</code>, <code>ORA_LOGIN_USER</code>."),
      C(`DROP TRIGGER nom_trigger;
ALTER TRIGGER nom_trigger DISABLE;   -- ENABLE pour réactiver
ALTER TABLE nom_table DISABLE ALL TRIGGERS;`),
      P("12 combinaisons par table : {BEFORE, AFTER} × {INSERT, UPDATE, DELETE} × {ligne, ordre}. Ordre entre triggers d'une même table : <code>FOLLOWS</code>. Dictionnaire : <code>USER_TRIGGERS</code>."),
    ]},
  ],
},
];

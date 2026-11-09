/* ============ TP CORRIGÉS : BASE HÔTEL (TP01 à TP04) ============ */
// Chargé après data-cours.js et data-pratique.js : complète GROUPS, MODULES, CARDS, QUIZ, GAPS, ORDERS.

GROUPS.tp = "TP base hôtel";

// Thèmes tirés pour le QCM blanc TP03 + TP04
const TP_EXAM = ["tp-contraintes", "tp-alter", "tp-droits", "tp-trig", "tp04"];

const SCHEMA_TP = [
["CLIENT",[["cli_id","PK"],["tit_code","FK"],["cli_nom",""],["cli_prenom",""],["cli_enseigne",""]]],
["TITRE",[["tit_code","PK"],["tit_lib",""]]],
["ADRESSE",[["cli_id","PK FK"],["adr_id","PK"],["adr_ligne1…4",""],["adr_cp",""],["adr_ville",""]]],
["TELEPHONE",[["tel_id","PK"],["cli_id","FK"],["typ_code","FK"],["tel_numero",""],["tel_localisation",""]]],
["EMAIL",[["eml_id","PK"],["cli_id","FK"],["eml_adresse",""],["eml_localisation",""]]],
["TYPE",[["typ_code","PK"],["typ_lib",""]]],
["CHAMBRE",[["chb_id","PK"],["chb_communique","FK"],["agt_id","FK"],["chb_numero",""],["chb_etage",""],["chb_couchage",""]]],
["AGENT_ENTRETIEN",[["agt_id","PK"],["agt_nom",""],["agt_sx",""],["agt_dnais",""],["agt_dpt",""],["agt_salaire",""]]],
["PLANNING",[["chb_id","PK FK"],["pln_jour","PK"],["cli_id","FK"],["nb_pers",""]]],
["FACTURE",[["fac_id","PK"],["pmt_code","FK"],["cli_id, adr_id","FK"],["fac_date",""],["fac_dat_pmt",""],["total",""]]],
["LIGNE_FACTURE",[["lif_id","PK"],["fac_id","FK"],["qte",""],["mnt",""],["remise_pourcent",""],["remise_mnt",""],["taux_tva",""]]],
["MODE_PAIEMENT",[["pmt_code","PK"],["pmt_lib",""]]],
];

MODULES.push(
/* ------------------------------------------------------------------ */
{
  id: "tp-req", code: "TP-01", group: "tp", title: "Requêtes sur la base hôtel",
  src: "TP01 · TP02 (corrigés)",
  retenir: [
    "On ne mélange jamais <code>FROM t1, t2 WHERE …</code> et <code>JOIN … ON</code> dans une même requête.",
    "Condition sur la table <b>esclave</b> d'une jointure externe → dans le <code>ON</code>, sinon elle annule le LEFT JOIN.",
    "« Aucun / jamais » : LEFT JOIN + <code>IS NULL</code> sur la clé, ou <code>NOT EXISTS</code> (le plus sûr avec les NULL).",
    "Le max par groupe : sous-requête corrélée qui compare chaque ligne au <code>MAX()</code> de son groupe.",
    "<code>ROWNUM</code> est attribué avant le tri : trier dans une CTE ou une sous-requête, puis filtrer.",
  ],
  blocks: [
    { h: "Deux syntaxes de jointure", items: [
      C(`-- Ancienne syntaxe
SELECT chb_numero, agt_nom
FROM chambre c, agent_entretien a
WHERE a.agt_id = c.agt_id
AND UPPER(a.agt_nom) IN ('BOUSSEL','FECHOL');

-- Syntaxe ANSI
SELECT chb_numero, agt_nom
FROM chambre c
  JOIN agent_entretien a ON a.agt_id = c.agt_id
WHERE UPPER(a.agt_nom) IN ('BOUSSEL','FECHOL');`),
      P("Une sous-requête <code>IN</code> filtre une table par rapport à une autre, mais ne permet pas d'afficher les colonnes de l'autre table."),
      C(`SELECT t.tit_lib ||' '|| c.cli_nom ||' '|| c.cli_prenom
FROM client c JOIN titre t ON t.tit_code = c.tit_code
WHERE cli_id IN (SELECT cli_id FROM adresse WHERE UPPER(adr_ville) = 'REIMS');`),
    ]},
    { h: "Jointure externe et priorité des conditions", items: [
      C(`-- Agents de 50 à 60 ans, même sans chambre
SELECT DECODE(agt_sx,1,'M. ','Mme ')||agt_prenom||' '||agt_nom "Agent",
       NVL2(chb_numero, 'N°'||chb_numero, 'AUCUNE CHAMBRE') "Chambre"
FROM agent_entretien a
  LEFT JOIN chambre c ON a.agt_id = c.agt_id
WHERE TRUNC(MONTHS_BETWEEN(SYSDATE, a.agt_dnais)/12) BETWEEN 50 AND 60;`),
      C(`-- FAUX : perd les clients sans FAX (retombe sur un INNER JOIN)
FROM client c LEFT JOIN telephone t ON c.cli_id = t.cli_id
WHERE t.typ_code = 'FAX'

-- JUSTE : la condition sur la table esclave va dans le ON
FROM client c LEFT JOIN telephone t
  ON c.cli_id = t.cli_id AND t.typ_code = 'FAX'`),
      C(`-- Toutes les chambres, réservées ou non, le 26/12/2007
SELECT chb_numero, cli_id
FROM chambre c
  LEFT JOIN planning p ON c.chb_id = p.chb_id
                      AND p.pln_jour = TO_DATE('26/12/2007','DD/MM/YYYY')
ORDER BY 1;`),
      TIP("Condition sur la table maître → <code>WHERE</code>. Condition sur la table esclave → <code>ON</code> (ou filtrée avant, dans une sous-requête du FROM ou une CTE). Voir aussi SQL-03."),
    ]},
    { h: "Regroupement", items: [
      C(`-- Clients ayant plusieurs e-mails
SELECT e.cli_id, cli_nom||' '||cli_prenom AS client, COUNT(eml_id)||' emails'
FROM client c JOIN email e ON c.cli_id = e.cli_id
GROUP BY e.cli_id, cli_nom, cli_prenom
HAVING COUNT(eml_id) > 1;

-- Chambre avec le plus de couchages, par étage
SELECT chb_etage, chb_numero, chb_couchage FROM chambre c
WHERE chb_couchage = (SELECT MAX(cm.chb_couchage) FROM chambre cm
                      WHERE cm.chb_etage = c.chb_etage);

-- Jointure externe + comptage : la condition esclave reste dans le ON
SELECT agt_nom, COUNT(chb_id)
FROM agent_entretien a
  LEFT JOIN chambre c ON (c.agt_id = a.agt_id AND chb_couchage > 2)
WHERE agt_sx = 2
GROUP BY agt_nom;          -- COUNT(chb_id) vaut 0 sans chambre`),
      P("Jours où l'hôtel est complet : <code>GROUP BY pln_jour HAVING COUNT(chb_id) = (SELECT COUNT(chb_id) FROM chambre)</code>. Nombre de jours d'un client : <code>COUNT(DISTINCT pln_jour)</code>, car il peut réserver plusieurs chambres le même jour."),
    ]},
    { h: "CTE et top N", items: [
      C(`WITH agt_actifs AS (
  SELECT DISTINCT agt_nom, agt_prenom, agt_emb
  FROM agent_entretien a JOIN chambre c ON a.agt_id = c.agt_id
  ORDER BY agt_emb)
SELECT agt_nom||' '||agt_prenom agent, EXTRACT(YEAR FROM agt_emb) embauche
FROM agt_actifs
WHERE ROWNUM <= 2;`),
      P("Une CTE remplace une sous-requête du FROM. Si le filtre (date, type) est fait dans la CTE, on peut ensuite la joindre en LEFT JOIN simple sur la clé."),
    ]},
    { h: "NULL et méthodes équivalentes", items: [
      T("<code>agt_id NOT IN (SELECT agt_id FROM chambre)</code> ne renvoie rien si une chambre a <code>agt_id</code> NULL. Réflexe : <code>NOT EXISTS</code>."),
      P("« Jamais réservé » / « aucune chambre » : jointure externe + <code>IS NULL</code>, <code>NOT IN</code>, <code>NOT EXISTS</code> ou <code>MINUS</code>. <code>NVL(x, y)</code> exige deux paramètres du même type : <code>NVL(TO_CHAR(chb_numero), 'Aucune')</code>."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "tp-contraintes", code: "TP-02", group: "tp", title: "Création des tables & contraintes",
  src: "TP03 · script de création (corrigé)",
  retenir: [
    "Contrainte sur <b>2 colonnes ou plus</b> (PK composée, FK composée, CHECK entre 2 colonnes) → contrainte de <b>table</b>.",
    "<code>NOT NULL</code> ne s'écrit qu'en contrainte de <b>colonne</b>. Une colonne peut porter plusieurs contraintes.",
    "Une FK référence une <b>PK ou UNIQUE</b> ; la table mère est créée avant la fille.",
    "Un CHECK n'est violé que si la condition est <b>fausse</b> : NULL passe.",
    "Un CHECK ne lit que la ligne en cours : pas d'autre table, pas de <code>SYSDATE</code>.",
  ],
  blocks: [
    { h: "Les contraintes", items: [
      TB(["Contrainte", "Rôle"], [
        ["<code>PRIMARY KEY</code>", "Unique + non NULL, une seule par table, index créé automatiquement"],
        ["<code>FOREIGN KEY / REFERENCES</code>", "La valeur existe dans la table mère (ou est NULL)"],
        ["<code>UNIQUE</code>", "Pas de doublon (NULL autorisé)"],
        ["<code>CHECK</code>", "Condition sur la ligne elle-même"],
        ["<code>NOT NULL</code>", "Valeur obligatoire"],
        ["<code>DEFAULT</code>", "Valeur par défaut : ce n'est pas une contrainte qui refuse"],
      ]),
    ]},
    { h: "Contrainte de colonne ou de table", items: [
      C(`CREATE TABLE telephone (
  tel_id   INTEGER CONSTRAINT pk_telephone PRIMARY KEY,   -- colonne
  cli_id   INTEGER NOT NULL
           CONSTRAINT fk_tel_client REFERENCES client (cli_id),
  typ_code CHAR(8) NOT NULL
           CONSTRAINT fk_tel_type REFERENCES "TYPE" (typ_code),
  tel_numero CHAR(20),
  tel_localisation VARCHAR2(20)
);

CREATE TABLE facture (
  fac_id   INTEGER CONSTRAINT pk_facture PRIMARY KEY,
  pmt_code CHAR(8) CONSTRAINT fk_facture_mode_paiement REFERENCES mode_paiement (pmt_code),
  cli_id   INTEGER NOT NULL,
  adr_id   INTEGER NOT NULL,
  fac_date DATE DEFAULT SYSDATE,
  fac_dat_pmt DATE,
  CONSTRAINT fk_facture_adresse FOREIGN KEY (cli_id, adr_id)   -- table : 2 colonnes
             REFERENCES adresse (cli_id, adr_id),
  CONSTRAINT pk_dates CHECK (fac_date <= fac_dat_pmt)        -- table : 2 colonnes
);`),
      UL(
        "En contrainte de colonne, une FK s'écrit avec <code>REFERENCES</code> seul ; en contrainte de table : <code>FOREIGN KEY (col) REFERENCES …</code>.",
        "<code>CONSTRAINT nom</code> est facultatif : sinon Oracle génère <code>SYS_C00xxxx</code>. Nommer aide à lire les erreurs et à faire un <code>DROP CONSTRAINT</code>.",
        "PK composée de PLANNING : <code>CONSTRAINT pk_planning PRIMARY KEY (chb_id, pln_jour)</code>."
      ),
    ]},
    { h: "Erreurs corrigées dans le script", items: [
      UL(
        "TYPE doit être créée <b>avant</b> TELEPHONE, CLIENT avant EMAIL : une table référencée doit exister.",
        "TITRE n'avait pas de clé primaire : la création de CLIENT (<code>REFERENCES titre</code>) échouait.",
        "Suppression : tables filles d'abord, ou <code>DROP TABLE … CASCADE CONSTRAINTS</code>.",
        "<code>\"TYPE\"</code> entre guillemets : mot réservé."
      ),
      C(`-- FK réflexive : une chambre communique avec une autre chambre
chb_communique INTEGER CONSTRAINT fk_chambre REFERENCES chambre (chb_id)`),
    ]},
    { h: "CHECK", items: [
      C(`CHECK (chb_numero != 13)
CHECK (chb_etage IN ('RDC','1er','2e'))
CHECK (SUBSTR(chb_poste_tel,1,1) BETWEEN '0' AND '9')
CHECK (eml_adresse LIKE '%@%.%')
CHECK (eml_localisation IN ('domicile','bureau'))`),
      T("<code>fac_dat_pmt</code> NULL est accepté par <code>CHECK (fac_date &lt;= fac_dat_pmt)</code> : la condition vaut NULL, pas FAUX."),
      T("<code>CHECK (pln_jour &gt;= SYSDATE)</code> est refusé (ORA-02436) : il faut un trigger."),
    ]},
    { h: "Erreurs à reconnaître", items: [
      TB(["Code", "Cause"], [
        ["ORA-00001", "PK / UNIQUE violée (doublon)"],
        ["ORA-01400", "NULL dans une colonne NOT NULL"],
        ["ORA-02290", "CHECK violé"],
        ["ORA-02291", "clé parent introuvable (fils sans père)"],
        ["ORA-02292", "enregistrement fils existant (on supprime un père)"],
      ]),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "tp-alter", code: "TP-03", group: "tp", title: "Remplir et modifier les tables",
  src: "TP03 · insertions et ALTER (corrigé)",
  retenir: [
    "On insère dans l'ordre de l'intégrité référentielle : pères avant fils.",
    "<code>SELECT *</code> associe les colonnes par position : sinon, les lister dans l'ordre de la table cible.",
    "<code>CREATE TABLE AS SELECT</code> copie colonnes + données + <b>NOT NULL seulement</b>.",
    "DEFAULT ne joue que si la colonne est <b>omise</b> ; un NULL explicite reste NULL.",
    "On ne modifie pas une contrainte : <code>DROP CONSTRAINT</code> puis <code>ADD CONSTRAINT</code>.",
  ],
  blocks: [
    { h: "INSERT … SELECT depuis un autre schéma", items: [
      C(`INSERT INTO titre SELECT * FROM hotel.titre;

-- colonnes dans un autre ordre : les lister
INSERT INTO chambre
  SELECT chb_id, chb_communique, agt_id, chb_numero, chb_etage,
         chb_bain, chb_douche, chb_wc, chb_poste_tel, chb_couchage
  FROM hotel.chambre;

-- moins de colonnes + filtre sur 2007
INSERT INTO planning
  SELECT chb_id, pln_jour, cli_id, nb_pers FROM hotel.planning
  WHERE EXTRACT(YEAR FROM pln_jour) = 2007;

INSERT INTO ligne_facture
  SELECT * FROM hotel.ligne_facture WHERE fac_id IN (SELECT fac_id FROM facture);`),
    ]},
    { h: "CREATE TABLE … AS SELECT", items: [
      C(`CREATE TABLE tarif AS
  (SELECT * FROM hotel.tarif WHERE EXTRACT(YEAR FROM trf_date_debut) = 2007);
ALTER TABLE tarif ADD CONSTRAINT pk_tarif PRIMARY KEY (trf_date_debut);

-- copie vide : condition toujours fausse
CREATE TABLE old_fact AS (SELECT * FROM facture WHERE fac_id IS NULL);`),
      T("PK, FK et CHECK ne sont pas copiées par un CREATE TABLE AS SELECT."),
    ]},
    { h: "ALTER TABLE et valeur par défaut", items: [
      C(`ALTER TABLE telephone
  ADD CONSTRAINT chk_localisation
      CHECK (tel_localisation IN ('domicile','portable','bureau'))
  MODIFY tel_localisation DEFAULT 'domicile';

ALTER TABLE facture ADD total NUMBER;

-- colonne omise : DEFAULT appliqué → 'domicile'
INSERT INTO telephone (tel_id, cli_id, typ_code, tel_numero)
VALUES (300, 1, 'GSM', '07-12-58-96-00');

-- refusé : 'xxxxxxx' viole chk_localisation (ORA-02290)
INSERT INTO telephone VALUES (300, 1, 'GSM', '07-12-58-96-00', 'xxxxxxx');`),
      P("Ajouter une contrainte à une table remplie échoue si des lignes existantes ne la respectent pas."),
    ]},
    { h: "ON DELETE CASCADE", items: [
      P("Supprimer DUPONT Alain échoue (ORA-02292) tant qu'il a des téléphones. On recrée les FK des tables filles de CLIENT."),
      C(`ALTER TABLE telephone DROP CONSTRAINT fk_tel_client;
ALTER TABLE telephone ADD CONSTRAINT fk_tel_client
  FOREIGN KEY (cli_id) REFERENCES client (cli_id) ON DELETE CASCADE;
-- idem pour EMAIL, ADRESSE et PLANNING`),
      UL(
        "Sans option : on ne peut pas supprimer un père qui a des fils.",
        "<code>ON DELETE CASCADE</code> : les fils sont supprimés avec le père.",
        "<code>ON DELETE SET NULL</code> : les fils restent, leur FK passe à NULL.",
        "Pas de <code>ON UPDATE CASCADE</code> en Oracle.",
        "La cascade s'enchaîne : supprimer un client supprime ses adresses, ce qui bloque si une FACTURE les référence sans cascade."
      ),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "tp-droits", code: "TP-04", group: "tp", title: "Privilèges, vues & rôles",
  src: "TP03 · privilèges (corrigé)",
  retenir: [
    "<code>GRANT … ON table TO user | rôle | PUBLIC [WITH GRANT OPTION]</code> ; <code>REVOKE … FROM …</code>.",
    "<code>UPDATE</code>, <code>INSERT</code> et <code>REFERENCES</code> acceptent des colonnes ; <b>SELECT non</b> → vue.",
    "Lire la table d'un autre : <code>proprietaire.table</code>.",
    "Un droit donné aussi à <code>PUBLIC</code> reste après un REVOKE individuel.",
    "Rôle : <code>CREATE ROLE</code> → GRANT privilèges au rôle → GRANT rôle aux utilisateurs.",
  ],
  blocks: [
    { h: "Donner et retirer des droits", items: [
      C(`GRANT SELECT ON client TO PUBLIC;
GRANT SELECT, INSERT, DELETE, UPDATE(nb_pers) ON planning TO tests2;
GRANT UPDATE(tit_code, cli_nom, cli_prenom, cli_enseigne) ON client TO tests2;
GRANT SELECT ON client TO tests2 WITH GRANT OPTION;   -- peut redistribuer
REVOKE ALL PRIVILEGES ON client FROM PUBLIC, tests2;

-- côté voisin
SELECT cli_nom, adr_ville
FROM tests3.client c JOIN tests3.adresse a ON a.cli_id = c.cli_id;`),
      T("SELECT donné à PUBLIC et à tests2 : après <code>REVOKE SELECT … FROM tests2</code>, tests2 lit toujours via PUBLIC."),
      T("Droit reçu <code>WITH GRANT OPTION</code> puis redistribué : le retirer au premier le retire aussi aux suivants (cascade)."),
    ]},
    { h: "Cacher des colonnes ou des lignes : la vue", items: [
      C(`CREATE OR REPLACE VIEW agt_vue AS
  (SELECT agt_id, agt_nom, agt_prenom, agt_sx, agt_dnais, agt_emb, agt_dpt
   FROM agent_entretien
   WHERE agt_dpt IS NULL);          -- sans salaire, agents en poste

GRANT SELECT ON agt_vue TO tests2;`),
      P("Une vue est une requête stockée : elle ne contient pas de données et peut restreindre colonnes et lignes. Voir aussi LDD-02 et LDD-03."),
    ]},
    { h: "Rôles", items: [
      C(`CREATE ROLE ro_hotel_tests3;
GRANT UPDATE(agt_id) ON chambre TO ro_hotel_tests3;
GRANT SELECT, UPDATE, INSERT, DELETE ON tarif    TO ro_hotel_tests3;
GRANT SELECT, UPDATE, INSERT, DELETE ON planning TO ro_hotel_tests3;
GRANT ro_hotel_tests3 TO sandron, estelle;
DROP ROLE ro_hotel_tests3;          -- tous perdent les droits du rôle`),
      P("Un rôle reçu devient actif à la connexion suivante de l'utilisateur."),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "tp-trig", code: "TP-05", group: "tp", title: "Triggers LMD : état, ligne, :NEW / :OLD",
  src: "TP04 · support triggers LMD",
  retenir: [
    "Seule la directive <code>FOR EACH ROW</code> distingue un trigger ligne d'un trigger d'état.",
    "État : 1 exécution par ordre, <b>même si 0 ligne</b>. Ligne : 1 par ligne touchée.",
    ":OLD est NULL en INSERT, :NEW est NULL en DELETE (BEFORE comme AFTER).",
    "Modifier <code>:NEW</code> → <b>BEFORE … FOR EACH ROW</b> ; en AFTER ou en trigger d'état : erreur de compilation.",
    "<code>RAISE_APPLICATION_ERROR(-20000 à -20999)</code> annule l'ordre SQL entier.",
    "Pas de COMMIT dans un trigger LMD : il compile, puis échoue à l'exécution (ORA-04092).",
  ],
  blocks: [
    { h: "État ou ligne", items: [
      TB(["", "Trigger d'état", "Trigger ligne"], [
        ["Écriture", "sans <code>FOR EACH ROW</code>", "avec <code>FOR EACH ROW</code>"],
        ["Exécutions", "1 par ordre SQL, même si 0 ligne", "1 par ligne touchée (0 si aucune)"],
        ["<code>:NEW</code> / <code>:OLD</code>", "interdits (compilation)", "disponibles"],
        ["Usage", "autoriser / refuser l'ordre (jour, utilisateur)", "contrôler ou modifier chaque ligne, mettre à jour une autre table"],
      ]),
      P("Ordre de déclenchement : <b>BEFORE état</b> → pour chaque ligne (<b>BEFORE ligne</b> → modification + vérification des contraintes → <b>AFTER ligne</b>) → <b>AFTER état</b>."),
    ]},
    { h: ":NEW et :OLD", items: [
      TB(["Action", "BEFORE ligne", "AFTER ligne", "Trigger d'état"], [
        ["Lire :NEW / :OLD", "oui", "oui", "non (compilation)"],
        ["<code>:NEW.col := …</code>", "oui", "non (compilation)", "non"],
        ["Modifier :OLD", "jamais", "jamais", "non"],
      ]),
      C(`:NEW.pln_jour := TRUNC(SYSDATE);      -- corriger la valeur insérée
:NEW.num_clt  := v_nb;                 -- numéroter la ligne
IF :NEW.ville_clt = 'REIMS' THEN ...   -- tester la ligne insérée`),
      T("En BEFORE INSERT, la ligne n'est pas encore dans la table : on la lit dans <code>:NEW</code>, pas avec un <code>SELECT … FROM client</code> (sans WHERE il ramène toutes les lignes) ni avec <code>:OLD</code> (NULL)."),
      TIP("Dans <code>WHEN (…)</code> on écrit <code>NEW.col</code> sans les deux-points ; WHEN n'existe que pour les triggers ligne."),
    ]},
    { h: "Outils et gestion", items: [
      C(`IF INSERTING THEN ... ELSIF UPDATING THEN ... ELSIF DELETING THEN ... END IF;
SELECT chb_couchage INTO nbc FROM chambre WHERE chb_id = :NEW.chb_id;  -- 1 ligne exactement
RAISE_APPLICATION_ERROR(-20120, 'Désolé pas de modifs aujourd''hui !');
DBMS_OUTPUT.PUT_LINE('Résa effectuée');   -- SET SERVEROUTPUT ON

ALTER TRIGGER jourok DISABLE;            -- ENABLE pour réactiver
ALTER TABLE agent_entretien DISABLE ALL TRIGGERS;
DROP TRIGGER jourok;
SHOW ERRORS`),
      UL(
        "Erreur levée sur la 3e ligne d'un UPDATE de 5 lignes : <b>aucune</b> n'est modifiée. Les ordres précédents de la transaction restent.",
        "Trigger créé « avec erreurs de compilation » : il est invalide et <b>tout</b> ordre LMD sur la table échoue (ORA-04098).",
        "<code>SELECT … INTO</code> : 0 ligne → NO_DATA_FOUND, plusieurs → TOO_MANY_ROWS."
      ),
    ]},
    { h: "Trigger ou contrainte ?", items: [
      P("Si une contrainte déclarative suffit, on la préfère. Le trigger sert quand la règle dépasse la ligne en cours."),
      TB(["Règle", "Solution"], [
        ["sexe ∈ {1, 2} ; étage ∈ {RDC, 1er, 2e}", "CHECK"],
        ["date d'arrivée &lt; date de départ (même ligne)", "CHECK de table"],
        ["le NumPat d'un séjour existe dans PATIENT", "FOREIGN KEY"],
        ["supprimer un patient supprime ses séjours", "FK ON DELETE CASCADE"],
        ["date d'intervention entre l'arrivée et le départ du séjour", "<b>Trigger</b> (autre table)"],
        ["nb_pers ≤ chb_couchage de la chambre", "<b>Trigger</b> (autre table)"],
        ["date de réservation ≥ aujourd'hui", "<b>Trigger</b> (SYSDATE interdit en CHECK)"],
        ["pas de modification le samedi", "<b>Trigger d'état</b>"],
        ["tenir à jour le total d'une facture", "<b>Trigger</b> sur LIGNE_FACTURE"],
      ]),
    ]},
    { h: "Table mutante et trigger composé", items: [
      P("ORA-04091 : un trigger <b>ligne</b> ne peut pas lire ni modifier sa propre table. Il compile, l'erreur arrive à l'exécution. Lire une <b>autre</b> table est permis. Cas toléré : un <code>INSERT … VALUES</code> d'une ligne avec un BEFORE INSERT ligne (ex. <code>SELECT MAX(num_clt)+1</code>)."),
      C(`CREATE OR REPLACE TRIGGER mut_comp_trigger
FOR UPDATE ON agent_entretien
COMPOUND TRIGGER
  g_avg_salaire INTEGER;

  BEFORE STATEMENT IS
  BEGIN
    SELECT ROUND(AVG(agt_salaire)) INTO g_avg_salaire FROM agent_entretien;
  END BEFORE STATEMENT;

  AFTER EACH ROW IS
  BEGIN
    IF :NEW.agt_salaire <= g_avg_salaire THEN
      RAISE_APPLICATION_ERROR(-20001, 'Salaire inférieur à la moyenne');
    END IF;
  END AFTER EACH ROW;
END mut_comp_trigger;`),
    ]},
  ],
},
/* ------------------------------------------------------------------ */
{
  id: "tp04", code: "TP-06", group: "tp", title: "Corrigé du TP04 pas à pas",
  src: "TP04 (corrigé)",
  retenir: [
    "Exo 1 : trigger d'état qui refuse les modifications le samedi.",
    "Exo 2 : BEFORE DELETE pour archiver et supprimer les lignes filles avant la vérification de la FK.",
    "Exo 3 : BEFORE ligne pour corriger <code>:NEW.pln_jour</code> et contrôler la capacité dans CHAMBRE.",
    "Exo 4 : un trigger sur LIGNE_FACTURE tient à jour <code>facture.total</code> avec INSERTING / UPDATING / DELETING.",
    "Exo 5 : moyenne des salaires dans un trigger ligne → mutation → trigger composé.",
  ],
  blocks: [
    { h: "Exo 1 : pas de modification le samedi", items: [
      C(`CREATE OR REPLACE TRIGGER jourok
BEFORE DELETE OR UPDATE OR INSERT ON agent_entretien
BEGIN
  IF TO_CHAR(SYSDATE,'fmDAY') = 'SAMEDI' THEN
    RAISE_APPLICATION_ERROR(-20120, 'Désolé pas de modifs de la table aujourd''hui !');
  END IF;
END;`),
      P("Pas de FOR EACH ROW : la décision porte sur l'ordre entier. <code>fm</code> retire les espaces de remplissage de <code>DAY</code>. On désactive avec le nom du trigger : <code>ALTER TRIGGER jourok DISABLE</code>."),
    ]},
    { h: "Exo 2 : archiver une facture et ses lignes", items: [
      C(`CREATE TABLE old_fact AS (SELECT * FROM facture WHERE fac_id IS NULL);
CREATE TABLE old_lg   AS (SELECT * FROM ligne_facture WHERE lif_id IS NULL);

CREATE OR REPLACE TRIGGER tr_facture
BEFORE DELETE ON facture
FOR EACH ROW
BEGIN
  INSERT INTO old_fact VALUES (:OLD.fac_id, :OLD.pmt_code, :OLD.cli_id,
                               :OLD.adr_id, :OLD.fac_date, :OLD.fac_dat_pmt);
  INSERT INTO old_lg (SELECT * FROM ligne_facture WHERE fac_id = :OLD.fac_id);
  DELETE FROM ligne_facture WHERE fac_id = :OLD.fac_id;
END;`),
      P("En DELETE on n'a que :OLD. <b>BEFORE</b> : les lignes filles disparaissent avant que la suppression de la facture vérifie la FK (sinon ORA-02292). La solution la plus simple reste la FK <code>ON DELETE CASCADE</code>."),
    ]},
    { h: "Exo 3 : date et capacité d'une réservation", items: [
      C(`CREATE OR REPLACE TRIGGER tr_planning
BEFORE INSERT OR UPDATE ON planning
FOR EACH ROW
DECLARE
  nbc INTEGER;
BEGIN
  IF :NEW.pln_jour < SYSDATE OR :NEW.pln_jour IS NULL THEN
    :NEW.pln_jour := TRUNC(SYSDATE);
  END IF;
  SELECT chb_couchage INTO nbc FROM chambre WHERE chb_id = :NEW.chb_id;
  IF :NEW.nb_pers > nbc THEN
    RAISE_APPLICATION_ERROR(-20222, 'Pas assez de place dans cette chambre !');
  END IF;
END;`),
      P("Le BEFORE corrige la valeur avant la vérification des contraintes : une date NULL est remplacée, le NOT NULL de pln_jour ne bloque pas. Lire CHAMBRE est permis (autre table)."),
    ]},
    { h: "Exo 4 : total de la facture", items: [
      C(`UPDATE ligne_facture SET remise_mnt = NVL(mnt*qte*remise_pourcent/100, 0);
ALTER TABLE facture ADD total NUMBER;
UPDATE facture f
SET total = (SELECT ROUND(SUM((mnt*qte - remise_mnt)*(1+taux_tva/100)),2)
             FROM ligne_facture WHERE fac_id = f.fac_id);

CREATE OR REPLACE TRIGGER tr_total_facture
BEFORE INSERT OR UPDATE OR DELETE ON ligne_facture
FOR EACH ROW
DECLARE
  new_mnt facture.total%TYPE;
  old_mnt facture.total%TYPE;
BEGIN
  old_mnt := (:OLD.mnt*:OLD.qte - :OLD.remise_mnt) * (1 + :OLD.taux_tva/100);
  IF DELETING THEN
    UPDATE facture SET total = ROUND(total - old_mnt, 2) WHERE fac_id = :OLD.fac_id;
  ELSE
    :NEW.remise_mnt := NVL(:NEW.mnt*:NEW.qte*:NEW.remise_pourcent/100, 0);
    new_mnt := (:NEW.mnt*:NEW.qte - :NEW.remise_mnt) * (1 + :NEW.taux_tva/100);
    IF INSERTING THEN
      UPDATE facture SET total = ROUND(total + new_mnt, 2) WHERE fac_id = :NEW.fac_id;
    ELSE
      UPDATE facture SET total = ROUND(total - old_mnt + new_mnt, 2) WHERE fac_id = :NEW.fac_id;
    END IF;
  END IF;
END;`),
      P("INSERT → ajoute :NEW ; DELETE → retire :OLD ; UPDATE → retire :OLD et ajoute :NEW. BEFORE car on modifie <code>:NEW.remise_mnt</code>. UPDATE sur FACTURE permis (autre table)."),
    ]},
    { h: "Exo 5 : salaire et moyenne", items: [
      C(`-- Compile, mais ORA-04091 à l'UPDATE : la table est en mutation
CREATE OR REPLACE TRIGGER mut_trigger
BEFORE UPDATE ON agent_entretien
FOR EACH ROW
DECLARE
  g_avg_salaire INTEGER;
BEGIN
  SELECT ROUND(AVG(agt_salaire)) INTO g_avg_salaire FROM agent_entretien;
  IF :NEW.agt_salaire <= g_avg_salaire THEN
    RAISE_APPLICATION_ERROR(-20001, 'Salaire inférieur à la moyenne');
  END IF;
END;`),
      P("Solution : désactiver ce trigger et utiliser le trigger composé (fiche TP-05) qui calcule la moyenne dans <code>BEFORE STATEMENT</code>."),
    ]},
  ],
}
);

/* ============ FLASHCARDS TP ============ */
CARDS.push(
["tp-req","Où placer une condition sur la table esclave d'un LEFT JOIN ?","Dans le <b>ON</b>. Dans le WHERE, elle élimine les lignes sans correspondance et on retombe sur un INNER JOIN."],
["tp-req","Après un LEFT JOIN, un agent n'a aucune chambre. Que vaut <code>COUNT(chb_id)</code> ?","<b>0</b> : COUNT(col) ignore les NULL. COUNT(*) vaudrait 1."],
["tp-req","Pourquoi <code>COUNT(DISTINCT pln_jour)</code> pour compter les jours d'un client ?","Il peut réserver plusieurs chambres le même jour : sans DISTINCT, ce jour compte plusieurs fois."],
["tp-contraintes","Quand une contrainte doit-elle être une contrainte de table ?","Quand elle porte sur <b>deux colonnes ou plus</b> : PK composée, FK composée, CHECK qui compare deux colonnes."],
["tp-contraintes","Quelle contrainte ne s'écrit qu'en contrainte de colonne ?","<code>NOT NULL</code>."],
["tp-contraintes","Pourquoi la création de CLIENT échouait-elle ?","TITRE n'avait pas de clé primaire : une FK doit référencer une PK ou une colonne UNIQUE."],
["tp-contraintes","CHECK (fac_date &lt;= fac_dat_pmt) et fac_dat_pmt NULL : la ligne passe ?","<b>Oui.</b> La condition vaut NULL, pas FAUX : un CHECK n'est violé que si elle est fausse."],
["tp-contraintes","Peut-on écrire <code>CHECK (pln_jour &gt;= SYSDATE)</code> ?","<b>Non</b> (ORA-02436) : SYSDATE est interdit dans un CHECK. Il faut un trigger."],
["tp-alter","Que copie <code>CREATE TABLE t AS SELECT …</code> ?","Les colonnes, les données et seulement les contraintes <b>NOT NULL</b>. PK, FK et CHECK sont à rajouter."],
["tp-alter","DEFAULT 'domicile' et <code>INSERT … VALUES (…, NULL)</code> : quelle valeur ?","<b>NULL</b>. La valeur par défaut ne s'applique que si la colonne est absente de l'INSERT."],
["tp-alter","Comment ajouter ON DELETE CASCADE à une FK existante ?","<code>DROP CONSTRAINT</code> puis <code>ADD CONSTRAINT … REFERENCES … ON DELETE CASCADE</code>.","ALTER TABLE telephone DROP CONSTRAINT fk_tel_client;\nALTER TABLE telephone ADD CONSTRAINT fk_tel_client\n  FOREIGN KEY (cli_id) REFERENCES client (cli_id) ON DELETE CASCADE;"],
["tp-droits","Comment cacher une colonne au voisin en lecture ?","Avec une <b>vue</b> sans cette colonne, puis <code>GRANT SELECT</code> sur la vue. SELECT ne se restreint pas par colonne."],
["tp-droits","SELECT donné à PUBLIC et à tests2, puis REVOKE pour tests2 : peut-il encore lire ?","<b>Oui</b>, via PUBLIC."],
["tp-droits","Étapes pour mettre en place un rôle ?","<code>CREATE ROLE</code> → <code>GRANT privilèges TO rôle</code> → <code>GRANT rôle TO utilisateurs</code>."],
["tp-trig","Qu'est-ce qui distingue un trigger ligne d'un trigger d'état ?","Uniquement la directive <code>FOR EACH ROW</code>."],
["tp-trig","Un UPDATE ne touche aucune ligne : combien d'exécutions ?","Trigger d'état : <b>1</b>. Trigger ligne : <b>0</b>."],
["tp-trig","Dans quel trigger :OLD est-il forcément NULL ?","Sur <b>INSERT</b> (BEFORE ou AFTER) : il n'y a pas d'ancienne ligne."],
["tp-trig","Où peut-on écrire <code>:NEW.col := …</code> ?","Seulement dans un trigger <b>BEFORE … FOR EACH ROW</b> (INSERT ou UPDATE)."],
["tp-trig","RAISE_APPLICATION_ERROR sur la 3e ligne d'un UPDATE de 5 : combien de lignes modifiées ?","<b>Aucune</b> : l'ordre SQL entier est annulé."],
["tp-trig","Trigger d'état BEFORE INSERT qui affiche un message si COUNT(*) &gt; 100 : que se passe-t-il au 101e client ?","L'insertion se fait et <b>rien ne s'affiche</b> : en BEFORE, le COUNT voit encore 100 lignes."],
["tp04","Pourquoi tr_facture est-il BEFORE DELETE ?","Pour supprimer les lignes de facture avant que la suppression de la facture vérifie la FK (sinon ORA-02292)."],
["tp04","Pourquoi le trigger de l'exo 5 échoue-t-il à l'exécution ?","Trigger ligne qui lit sa propre table (AVG des salaires) : <b>table mutante</b>, ORA-04091."]
);

/* ============ QUIZ TP ============ */
// t:1 = question type corrigée ; keep:1 = ne pas mélanger les options ; a tableau = plusieurs réponses ; c = code affiché
QUIZ.push(
/* --- questions type --- */
{m:"tp-contraintes",t:1,keep:1,q:"Dans quel cas ne peut-on pas définir une contrainte en contrainte de colonne ?",o:["Lorsqu'elle porte sur une clé primaire","Lorsqu'elle porte sur deux champs de la table","Lorsqu'il s'agit d'une contrainte CHECK","Lorsqu'il y a déjà une autre contrainte sur la colonne","Lorsqu'on peut faire un déclencheur"],a:1,e:"Une contrainte de colonne ne voit que sa colonne. Dès qu'elle porte sur deux colonnes, elle s'écrit en contrainte de table. Une colonne peut porter plusieurs contraintes de colonne."},
{m:"tp-trig",t:1,keep:1,q:"Dans un trigger LMD, qu'est-ce qui différencie un trigger par ordre (déclencheur d'état) d'un trigger par ligne ?",o:["Le séquencement (BEFORE ou AFTER)","La nature de l'ordre qui déclenche le trigger (INSERT, UPDATE…)","La directive FOR EACH ROW","Le type d'objet associé au trigger (TABLE, INDEX…)"],a:2,e:"Les deux peuvent être BEFORE ou AFTER, sur INSERT, UPDATE ou DELETE, et portent sur une table. Seule la présence de FOR EACH ROW en fait un trigger ligne."},
{m:"tp-trig",t:1,keep:1,q:"Dans quel type de trigger la variable OLD contiendra forcément la valeur nulle ?",o:["BEFORE UPDATE","AFTER UPDATE","BEFORE DELETE","AFTER INSERT"],a:3,e:"En INSERT il n'existe pas d'ancienne ligne : :OLD est NULL, en BEFORE comme en AFTER."},
{m:"tp-trig",t:1,keep:1,q:"Base hôpital : PATIENT(NumPat, …, SexePat), SEJOUR(NumSéjour, NumPat, DateArrivée, DateDépart), INTERVENTION(NumInt, NumSéjour, DateInt, …). Quelle contrainte nécessite un déclencheur ?",o:["La date d'arrivée d'un séjour est antérieure à la date de départ","La suppression d'un patient entraîne la suppression de ses séjours","Les valeurs autorisées pour sexePat sont 1 et 2","La date d'intervention est comprise entre la date d'arrivée et la date de départ du séjour","Le NumPat d'un séjour correspond à un NumPat de la table PATIENT"],a:3,e:"1 et 3 : CHECK. 2 : FK ON DELETE CASCADE. 5 : FOREIGN KEY. 4 compare INTERVENTION à SEJOUR : un CHECK ne lit pas une autre table, il faut un trigger."},
{m:"tp-trig",t:1,keep:1,q:"Quels sont le(s) déclencheur(s) qui ne peuvent pas être compilés ?",c:"-- A\nCREATE OR REPLACE TRIGGER T1\nBEFORE UPDATE ON CATEGORIE\nBEGIN\n  :new.DESCRIPTION := 'DESCRIPTION';\nEND;\n\n-- B\nCREATE OR REPLACE TRIGGER T2\nBEFORE UPDATE ON CATEGORIE\nFOR EACH ROW\nBEGIN\n  :new.DESCRIPTION := 'DESCRIPTION';\nEND;\n\n-- C\nCREATE OR REPLACE TRIGGER T3\nAFTER UPDATE ON CATEGORIE\nFOR EACH ROW\nBEGIN\n  :new.DESCRIPTION := 'DESCRIPTION';\nEND;",o:["A (T1)","B (T2)","C (T3)"],a:[0,2],e:"A : :new dans un trigger d'état, interdit. C : on ne peut pas affecter :new dans un trigger AFTER. B compile : BEFORE + FOR EACH ROW."},
{m:"tp-trig",t:1,keep:1,q:"CLIENT(Num_clt, Nom_clt, …, Ville_clt). Trigger T1 BEFORE INSERT ON CLIENT FOR EACH ROW. Quelle instruction teste si le client que l'on insère est de REIMS ?",o:["SELECT ville_clt INTO v_villecl FROM CLIENT; IF v_villecl = 'REIMS' THEN …","IF (SELECT ville_clt FROM CLIENT) = 'REIMS' THEN …","IF :NEW.ville_clt = 'REIMS' THEN …","IF :OLD.ville_clt = 'REIMS' THEN …"],a:2,e:"La ligne en cours d'insertion se lit dans :NEW. :OLD est NULL en INSERT. Le SELECT sans WHERE ramène toutes les lignes, et un SELECT ne s'écrit pas dans un IF."},
{m:"tp-trig",t:1,keep:1,q:"Trigger T1 BEFORE INSERT ON CLIENT FOR EACH ROW, avec SELECT MAX(num_clt) + 1 INTO v_nb FROM client; Quelle instruction utilise v_nb comme numéro du client inséré ?",o:[":old.num_clt := v_nb","UPDATE client SET num_clt = v_nb WHERE num_clt = :old.num_clt;",":new.num_clt := v_nb","UPDATE client SET num_clt = v_nb WHERE num_clt = :new.num_clt;","num_clt := v_nb"],a:2,e:"On modifie la ligne en cours en affectant :NEW (BEFORE ligne). :OLD n'est jamais modifiable, num_clt seul n'est pas une variable, et un UPDATE viserait une ligne pas encore insérée."},
{m:"tp-trig",t:1,keep:1,q:"Trigger d'état actif : BEFORE INSERT ON CLIENT, qui fait SELECT COUNT(*) INTO v_nb FROM CLIENT; IF v_nb > 100 THEN DBMS_OUTPUT.PUT_LINE('Plus de 100'); END IF; Que se passe-t-il quand on insère le 101e client ?",o:["L'insertion ne se fait pas et un message s'affiche","L'insertion se fait et un message s'affiche","L'insertion ne se fait pas et rien ne s'affiche","L'insertion se fait et rien ne s'affiche"],a:3,e:"BEFORE : le COUNT est fait avant l'insertion, il y a 100 clients et 100 > 100 est faux. Pas de RAISE_APPLICATION_ERROR : l'insertion a lieu."},

/* --- contraintes --- */
{m:"tp-contraintes",q:"La clé primaire de PLANNING porte sur (chb_id, pln_jour). Où la déclarer ?",o:["En contrainte de colonne sur chb_id","En contrainte de colonne sur chacune des deux colonnes","En contrainte de table","Avec un trigger"],a:2,e:"Deux colonnes → contrainte de table. Deux PRIMARY KEY de colonne feraient deux clés primaires, ce qui est interdit."},
{m:"tp-contraintes",q:"Quelle contrainte ne peut s'écrire qu'en contrainte de colonne ?",o:["PRIMARY KEY","CHECK","NOT NULL","FOREIGN KEY"],a:2,e:"NOT NULL se déclare uniquement au niveau de la colonne."},
{m:"tp-contraintes",q:"FACTURE a CHECK (fac_date <= fac_dat_pmt). On insère une facture avec fac_dat_pmt NULL. Résultat ?",o:["ORA-02290 : contrainte CHECK violée","La ligne est insérée","fac_dat_pmt prend la valeur de fac_date","ORA-01400"],a:1,e:"Comparer à NULL donne UNKNOWN. Un CHECK n'est violé que si la condition est FAUSSE."},
{m:"tp-contraintes",q:"La création de CLIENT échoue sur REFERENCES titre(tit_code). Pourquoi ?",o:["TIT_CODE est de type CHAR","TITRE n'a pas de clé primaire (ni UNIQUE) sur tit_code","Une FK doit s'écrire en contrainte de table","CLIENT doit être créée avant TITRE"],a:1,e:"Une clé étrangère doit référencer une clé primaire ou une colonne UNIQUE."},
{m:"tp-contraintes",q:"Quelles règles peut-on poser avec une contrainte déclarative ? (plusieurs réponses)",o:["agt_sx vaut '1' ou '2'","fac_date ≤ fac_dat_pmt","la date d'intervention est dans les dates du séjour","supprimer un client supprime ses e-mails"],a:[0,1,3],e:"CHECK, CHECK de table, FK ON DELETE CASCADE. La 3e touche une autre table : trigger."},
/* --- remplir / modifier --- */
{m:"tp-alter",q:"CREATE TABLE tarif AS SELECT * FROM hotel.tarif; Qu'est-ce qui est copié ?",o:["Les colonnes, les données et toutes les contraintes","Les colonnes, les données et seulement les contraintes NOT NULL","Seulement les colonnes","Les colonnes et la clé primaire"],a:1,e:"D'où le ALTER TABLE tarif ADD CONSTRAINT pk_tarif PRIMARY KEY (…)."},
{m:"tp-alter",q:"Les colonnes de hotel.chambre ne sont pas dans le même ordre que celles de votre CHAMBRE. Comment copier les données ?",o:["INSERT INTO chambre SELECT * FROM hotel.chambre;","INSERT INTO chambre SELECT col1, col2, … FROM hotel.chambre; en listant les colonnes dans l'ordre de la table cible","CREATE TABLE chambre AS SELECT * FROM hotel.chambre;","Ce n'est pas possible"],a:1,e:"SELECT * associe les colonnes par position."},
{m:"tp-alter",q:"On supprime un client qui a des téléphones ; la FK de TELEPHONE n'a aucune option. Résultat ?",o:["Le client et ses téléphones sont supprimés","Le client est supprimé, ses téléphones restent orphelins","ORA-02292 : rien n'est supprimé","Les téléphones passent à cli_id NULL"],a:2,e:"Enregistrement fils existant : supprimer les fils d'abord ou recréer la FK avec ON DELETE CASCADE."},
{m:"tp-alter",q:"Comment ajouter ON DELETE CASCADE à la clé étrangère fk_tel_client qui existe déjà ?",o:["ALTER TABLE telephone MODIFY CONSTRAINT fk_tel_client ON DELETE CASCADE;","DROP CONSTRAINT puis ADD CONSTRAINT … REFERENCES client(cli_id) ON DELETE CASCADE","Avec un trigger uniquement","ALTER TABLE client ADD ON DELETE CASCADE;"],a:1,e:"On ne modifie pas la définition d'une contrainte : on la supprime et on la recrée."},
{m:"tp-alter",q:"tel_localisation a DEFAULT 'domicile'. INSERT INTO telephone (tel_id, cli_id, typ_code, tel_numero) VALUES (300, 1, 'GSM', '07-12-58-96-00'); Valeur de tel_localisation ?",o:["NULL","'domicile'","Erreur : colonne manquante","'portable'"],a:1,e:"La colonne est absente de l'INSERT : la valeur par défaut s'applique."},
{m:"tp-alter",q:"Même table : INSERT INTO telephone VALUES (301, 1, 'GSM', '06-11-22-33-44', NULL); Valeur de tel_localisation ?",o:["'domicile'","NULL","Erreur ORA-02290","'GSM'"],a:1,e:"NULL explicite = NULL. Le CHECK IN (…) laisse passer NULL."},
{m:"tp-alter",q:"Quelles affirmations sur ON DELETE CASCADE sont vraies ? (plusieurs réponses)",o:["Elle se déclare sur la clé étrangère de la table fille","Supprimer le père supprime les fils","Elle se déclare sur la clé primaire du père","Elle remplace avantageusement un trigger qui supprime les fils"],a:[0,1,3],e:"L'option fait partie de la FK (table fille). Une contrainte déclarative est préférable à un trigger quand elle suffit."},
/* --- privilèges --- */
{m:"tp-droits",q:"Le voisin doit lire AGENT_ENTRETIEN sans AGT_SALAIRE, et seulement les agents en poste. Comment ?",o:["GRANT SELECT(agt_id, agt_nom, …) ON agent_entretien TO voisin;","Créer une vue sans le salaire avec WHERE agt_dpt IS NULL, puis GRANT SELECT sur la vue","GRANT SELECT ON agent_entretien TO voisin WHERE agt_dpt IS NULL;","Avec un rôle"],a:1,e:"SELECT ne se restreint pas par colonne et GRANT n'a pas de WHERE : la vue fait les deux."},
{m:"tp-droits",q:"GRANT SELECT, INSERT, DELETE, UPDATE(nb_pers) ON planning TO tests2; Que peut faire tests2 ?",o:["Modifier toutes les colonnes","Lire, insérer, supprimer, et modifier seulement NB_PERS","Seulement modifier NB_PERS","Rien sans rôle"],a:1,e:"UPDATE(col) limite la modification aux colonnes listées."},
{m:"tp-droits",q:"GRANT SELECT ON client TO PUBLIC; GRANT SELECT ON client TO tests2; REVOKE SELECT ON client FROM tests2; tests2 peut-il encore lire CLIENT ?",o:["Non","Oui, via PUBLIC","Oui, jusqu'à sa déconnexion","Erreur au REVOKE"],a:1,e:"Le droit donné à PUBLIC s'applique à tout le monde."},
{m:"tp-droits",q:"A donne SELECT à B WITH GRANT OPTION, B le donne à C. A révoque le droit de B. Et C ?",o:["C garde le droit","C perd aussi le droit","C doit le rendre lui-même","Le REVOKE échoue"],a:1,e:"Pour les privilèges objet, la révocation se propage aux droits redistribués."},
{m:"tp-droits",q:"Comment tests2 lit-il votre table CLIENT (vous êtes tests3) ?",o:["SELECT * FROM client;","SELECT * FROM tests3.client;","SELECT * FROM client@tests3;","SELECT * FROM tests3:client;"],a:1,e:"Préfixe propriétaire.table."},
{m:"tp-droits",q:"Ordre correct pour mettre en place un rôle ?",o:["GRANT rôle TO users → CREATE ROLE → GRANT privilèges TO rôle","CREATE ROLE → GRANT privilèges TO rôle → GRANT rôle TO users","CREATE ROLE → GRANT rôle TO users uniquement","CREATE USER → CREATE ROLE"],a:1,e:"On crée le rôle, on lui donne les privilèges, puis on l'attribue."},
{m:"tp-droits",q:"Quel privilège objet ne peut PAS être restreint à certaines colonnes dans un GRANT ?",o:["UPDATE","INSERT","REFERENCES","SELECT"],a:3,e:"Pour SELECT, on passe par une vue."},
{m:"tp-droits",q:"Qu'est-ce qui est vrai pour une vue ? (plusieurs réponses)",o:["Elle peut cacher des colonnes","Elle peut filtrer des lignes avec un WHERE","On peut donner GRANT SELECT sur une vue","Elle stocke une copie des données"],a:[0,1,2],e:"Une vue est une requête stockée : elle lit les tables à chaque appel."},
/* --- triggers --- */
{m:"tp-trig",q:"Un UPDATE ne touche aucune ligne. Combien de fois s'exécutent un trigger d'état et un trigger ligne BEFORE UPDATE ?",o:["0 et 0","1 et 0","1 et 1","0 et 1"],a:1,e:"État : une fois par ordre, même sans ligne. Ligne : une fois par ligne touchée."},
{m:"tp-trig",q:"Un UPDATE modifie 5 lignes. Combien d'exécutions pour un trigger ligne et un trigger d'état ?",o:["5 et 5","1 et 1","5 et 1","1 et 5"],a:2,e:"Ligne : 5 fois. État : 1 fois."},
{m:"tp-trig",q:"Ordre de déclenchement pour un ordre qui modifie plusieurs lignes ?",o:["BEFORE ligne, BEFORE état, AFTER état, AFTER ligne","BEFORE état, puis pour chaque ligne BEFORE ligne / AFTER ligne, puis AFTER état","Tous les BEFORE ligne, puis BEFORE état","L'ordre est aléatoire"],a:1,e:"BEFORE état → (BEFORE ligne → modification → AFTER ligne) × n → AFTER état."},
{m:"tp-trig",q:"Dans un trigger AFTER DELETE FOR EACH ROW, que contient :NEW ?",o:["La ligne supprimée","NULL","La ligne suivante","Erreur de compilation"],a:1,e:"En DELETE il n'y a pas de nouvelle ligne. La ligne supprimée est dans :OLD."},
{m:"tp-trig",q:"Un trigger ligne lève RAISE_APPLICATION_ERROR sur la 3e ligne d'un UPDATE de 5 lignes. Combien de lignes sont modifiées ?",o:["2","3","0","5"],a:2,e:"L'erreur annule l'ordre SQL entier."},
{m:"tp-trig",q:"Quels codes accepte RAISE_APPLICATION_ERROR ?",o:["De 0 à 999","De -20000 à -20999","De -1 à -999","N'importe quel nombre négatif"],a:1,e:"Plage réservée aux erreurs applicatives."},
{m:"tp-trig",q:"Un trigger sans FOR EACH ROW utilise :NEW.cli_nom. Que se passe-t-il ?",o:["Il compile et marche","Erreur de compilation","Erreur à l'exécution seulement",":NEW vaut NULL"],a:1,e:":NEW et :OLD n'existent que dans les triggers ligne (ORA-04082)."},
{m:"tp-trig",q:"On veut remplacer une date de réservation passée par la date du jour. Quel trigger ?",o:["AFTER INSERT OR UPDATE FOR EACH ROW avec :NEW.pln_jour := TRUNC(SYSDATE)","BEFORE INSERT OR UPDATE FOR EACH ROW avec :NEW.pln_jour := TRUNC(SYSDATE)","BEFORE INSERT (état) avec UPDATE planning SET pln_jour = SYSDATE","Un CHECK (pln_jour >= SYSDATE)"],a:1,e:"Modifier :NEW exige BEFORE + FOR EACH ROW. Un CHECK ne peut pas utiliser SYSDATE."},
{m:"tp-trig",q:"Peut-on écrire CHECK (pln_jour >= SYSDATE) ?",o:["Oui","Non, SYSDATE est interdit dans un CHECK","Oui, en contrainte de table seulement","Oui avec TRUNC(SYSDATE)"],a:1,e:"ORA-02436 : il faut un trigger."},
{m:"tp-trig",q:"Trigger BEFORE UPDATE FOR EACH ROW sur AGENT_ENTRETIEN qui fait SELECT AVG(agt_salaire) FROM agent_entretien. Que se passe-t-il ?",o:["Erreur de compilation","Il compile, puis ORA-04091 (table en mutation) à l'UPDATE","Il marche normalement","La moyenne est NULL"],a:1,e:"Un trigger ligne ne peut pas lire sa propre table pendant la modification."},
{m:"tp-trig",q:"Solution du TP04 au problème de table mutante ?",o:["Ajouter un COMMIT dans le trigger","Un trigger composé qui calcule la moyenne dans BEFORE STATEMENT","Passer le trigger en AFTER","Un index sur agt_salaire"],a:1,e:"La partie état peut lire la table ; la valeur est partagée avec les sections ligne."},
{m:"tp-trig",q:"Dans un trigger sur INSERT OR UPDATE OR DELETE, comment savoir quel ordre l'a déclenché ?",o:["IF :NEW IS NULL","IF INSERTING / UPDATING / DELETING","IF ORA_SYSEVENT = 'INSERT'","Ce n'est pas possible : il faut 3 triggers"],a:1,e:"Les prédicats INSERTING, UPDATING et DELETING. ORA_SYSEVENT sert aux triggers LDD/système."},
{m:"tp-trig",q:"Un trigger LMD contient COMMIT. Que se passe-t-il ?",o:["Il compile, puis échoue à l'exécution (ORA-04092)","Erreur de compilation","La transaction est validée","Le COMMIT est ignoré"],a:0,e:"COMMIT et ROLLBACK sont interdits dans un trigger LMD, mais l'erreur n'apparaît qu'à l'exécution."},
{m:"tp-trig",q:"Base hôtel : quelle règle demande un trigger ?",o:["chb_etage vaut RDC, 1er ou 2e","chb_numero différent de 13","nb_pers d'une réservation ≤ chb_couchage de la chambre","cli_id d'un téléphone existe dans CLIENT"],a:2,e:"nb_pers est dans PLANNING, chb_couchage dans CHAMBRE : autre table, donc trigger."},
{m:"tp-trig",q:"Comment désactiver le trigger jourok sans le supprimer ?",o:["DROP TRIGGER jourok;","ALTER TRIGGER jourok DISABLE;","ALTER TABLE jourok DISABLE;","DISABLE TRIGGER jourok;"],a:1,e:"ALTER TRIGGER nom DISABLE / ENABLE."},
{m:"tp-trig",q:"Quelle écriture de la clause WHEN est correcte ?",o:["FOR EACH ROW WHEN (:NEW.nb_pers > 4)","FOR EACH ROW WHEN (NEW.nb_pers > 4)","WHEN NEW.nb_pers > 4 FOR EACH ROW","WHEN (nb_pers > 4) sans FOR EACH ROW"],a:1,e:"Dans WHEN, NEW s'écrit sans les deux-points, entre parenthèses, et seulement pour un trigger ligne."},
{m:"tp-trig",q:"Trigger d'état AFTER INSERT ON client : SELECT COUNT(*) INTO v_nb FROM client; IF v_nb > 100 THEN PUT_LINE('Plus de 100'). On insère le 101e client.",o:["L'insertion se fait et le message s'affiche","L'insertion se fait et rien ne s'affiche","L'insertion ne se fait pas","ORA-04091"],a:0,e:"En AFTER, le COUNT voit la ligne insérée : 101 > 100. Un trigger d'état peut lire sa table."},
{m:"tp-trig",q:"Dans quels triggers peut-on écrire :NEW.col := valeur ? (plusieurs réponses)",o:["BEFORE INSERT FOR EACH ROW","BEFORE UPDATE FOR EACH ROW","AFTER INSERT FOR EACH ROW","BEFORE INSERT (sans FOR EACH ROW)"],a:[0,1],e:"Seulement en BEFORE ligne, sur INSERT ou UPDATE."},
/* --- TP04 --- */
{m:"tp04",q:"Pourquoi tr_facture (archive + suppression des lignes) est-il BEFORE DELETE et pas AFTER DELETE ?",o:["Parce que :OLD n'existe pas en AFTER","Pour supprimer les lignes de facture avant que la suppression de la facture vérifie la FK","Parce qu'un AFTER ne peut pas faire d'INSERT","Pour pouvoir modifier :NEW"],a:1,e:"En AFTER ligne, la contrainte a déjà été vérifiée : ORA-02292. :OLD existe pourtant bien en AFTER."},
{m:"tp04",q:"Un samedi, avec le trigger d'état jourok actif, on fait un INSERT … SELECT de 10 agents. Résultat ?",o:["10 erreurs, 0 insertion","1 erreur, 0 insertion","1 erreur, 9 insertions","10 insertions"],a:1,e:"Trigger d'état : exécuté une fois, il lève l'erreur et annule tout l'ordre."},
{m:"tp04",q:"Dans tr_total_facture, que fait-on sur FACTURE lors d'un UPDATE d'une ligne de facture ?",o:["total + :NEW","total - :OLD","total - :OLD + :NEW","Rien"],a:2,e:"On retire l'ancien montant et on ajoute le nouveau."},
/* --- requêtes TP01-02 --- */
{m:"tp-req",q:"Table esclave d'un LEFT JOIN : on met sa condition dans le WHERE. Effet ?",o:["Les lignes sans correspondance sont éliminées : on retombe sur un INNER JOIN","Erreur de syntaxe","La condition est ignorée","Le résultat ne change pas"],a:0,e:"Le WHERE s'exécute après la jointure."},
{m:"tp-req",q:"Syntaxe Oracle : agent a, chambre c. On veut tous les agents. Quelle écriture ?",o:["a.agt_id(+) = c.agt_id","a.agt_id = c.agt_id(+)","a.agt_id = c.agt_id","(+)a.agt_id = c.agt_id"],a:1,e:"Le (+) se met du côté de la table qui peut manquer (chambre)."},
{m:"tp-req",q:"agt_id peut être NULL dans chambre. Que renvoie WHERE agt_id NOT IN (SELECT agt_id FROM chambre) ?",o:["Les agents sans chambre","Aucune ligne","Tous les agents","Une erreur"],a:1,e:"Comparer à NULL donne UNKNOWN : aucune ligne."},
{m:"tp-req",q:"Après un LEFT JOIN, un agent n'a aucune chambre. COUNT(chb_id) vaut ?",o:["NULL","1","0","Erreur"],a:2,e:"COUNT(col) ignore les NULL."},
{m:"tp-req",q:"Jours où l'hôtel est complet : quelle clause ?",o:["WHERE COUNT(chb_id) = (SELECT COUNT(chb_id) FROM chambre)","GROUP BY pln_jour HAVING COUNT(chb_id) = (SELECT COUNT(chb_id) FROM chambre)","ORDER BY COUNT(chb_id)","GROUP BY chb_id"],a:1,e:"On regroupe par jour, puis HAVING compare au nombre total de chambres."},
{m:"tp-req",q:"NVL(chb_numero, 'Aucune') pose problème car…",o:["NVL n'existe pas","les deux paramètres doivent être du même type (TO_CHAR)","chb_numero ne peut pas être NULL","NVL n'accepte pas de texte"],a:1,e:"Il faut NVL(TO_CHAR(chb_numero), 'Aucune')."}
);

/* ============ CODE À TROUS TP ============ */
GAPS.push(
{t:"Trigger d'état : pas de modification le samedi",m:"tp04",c:`CREATE OR REPLACE TRIGGER jourok
[[BEFORE]] DELETE OR UPDATE OR INSERT [[ON]] agent_entretien
BEGIN
  IF TO_CHAR([[SYSDATE]],'fmDAY') = 'SAMEDI' THEN
    [[RAISE_APPLICATION_ERROR]](-20120, 'Pas de modifs aujourd''hui !');
  END IF;
END;`},
{t:"Corriger la date d'une réservation",m:"tp-trig",c:`CREATE OR REPLACE TRIGGER tr_planning
BEFORE INSERT OR UPDATE ON planning
FOR [[EACH]] ROW
BEGIN
  IF [[:NEW]].pln_jour < SYSDATE OR :NEW.pln_jour [[IS NULL]] THEN
    :NEW.pln_jour [[:=]] TRUNC(SYSDATE);
  END IF;
END;`},
{t:"FK avec suppression en cascade",m:"tp-alter",c:`ALTER TABLE telephone [[DROP]] CONSTRAINT fk_tel_client;
ALTER TABLE telephone [[ADD]] CONSTRAINT fk_tel_client
  [[FOREIGN KEY]] (cli_id) [[REFERENCES]] client (cli_id) ON DELETE [[CASCADE]];`},
{t:"Rôle sur la base hôtel",m:"tp-droits",c:`[[CREATE]] ROLE ro_hotel;
GRANT [[UPDATE]](agt_id) ON chambre TO ro_hotel;
GRANT SELECT, INSERT ON planning [[TO]] ro_hotel;
GRANT ro_hotel TO sandron, estelle;
[[REVOKE]] SELECT ON client [[FROM]] PUBLIC;`}
);

/* ============ REMETTRE DANS L'ORDRE TP ============ */
ORDERS.push(
{t:"Ordre de déclenchement des triggers (UPDATE de plusieurs lignes)",items:["BEFORE état","BEFORE ligne","modification + contraintes","AFTER ligne","AFTER état"]},
{t:"Mettre en place un rôle",items:["CREATE ROLE","GRANT privilèges TO rôle","GRANT rôle TO utilisateurs"]},
{t:"Créer les tables de la base hôtel (dépendances)",items:["TITRE","CLIENT","ADRESSE","FACTURE","LIGNE_FACTURE"]}
);

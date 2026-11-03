/* ====== CONTRÔLE : infos, questions de TP, aide-mémoire ====== */
const EXAM_INFO = {
  scope: "Tous les TP, éléments de cours et activités pratiques du TP1 au TP6 peuvent faire l'objet d'exercices ou de questions de cours.",
  allowed: "Un aide-mémoire manuscrit original est autorisé : une feuille A4 recto-verso, écrite à la main (pas de photocopie).",
  banned: "Tous les appareils électroniques sont interdits. Détenir ou consulter un téléphone ou un objet connecté pendant l'épreuve est considéré comme une fraude (article 12 du règlement intérieur de l'IUT)."
};

/* Questions ouvertes, classées par TP : [TP, question, réponse modèle] */
const QTP = [
// TP1
["TP1", "Comment lance-t-on et arrête-t-on la simulation d'un TP ? Que faut-il savoir sur les machines ?", "Depuis le dossier <code>r306-td</code> (dépôt cloné) : <code>bin/start tp1</code> pour lancer, <code>bin/stop tp1</code> pour arrêter. Un terminal xterm s'ouvre par machine. Les machines sont <b>réinitialisées à chaque lancement</b> : il faut noter toutes les commandes saisies pour pouvoir refaire la configuration."],
["TP1", "Quel filtre Wireshark permet de n'afficher que les paquets qui concernent PC 1 (172.16.1.11) ?", "<code>ip.addr == 172.16.1.11</code> (paquets dont l'adresse IP source ou destination est celle de PC 1)."],
["TP1", "PC 1 pingue 172.16.1.254. Que contiennent les paquets observés dans Wireshark ? Quelles couches TCP/IP voit-on ?", "Des requêtes <b>ICMP Echo request</b> (type 8) et des réponses <b>Echo reply</b> (type 0), avec un identifiant, un numéro de séquence et des données. Couches : <b>Ethernet II</b> (adresses MAC source et destination), <b>IPv4</b> (adresses IP, TTL, protocole = ICMP), puis <b>ICMP</b>. Il n'y a pas de couche transport : ICMP est porté directement par IP. Avant le premier ping, on peut voir un échange <b>ARP</b> (qui a 172.16.1.254 ?) pour trouver l'adresse MAC."],
["TP1", "Sur quelle machine et quelle interface fait-on la capture dans le TP1 ?", "Sur le conteneur <b>routeur1</b>, qui embarque Wireshark (accessible sur <code>localhost:3000</code>), sur l'interface d'adresse <b>172.16.1.254</b> (eth0 ou eth1, à vérifier en survolant), celle du réseau de PC 1."],
// TP2
["TP2", "Que signifie « routage » ? Qu'est-ce qu'une route ?", "Le routage est le processus qui permet aux paquets de trouver un chemin jusqu'à leur destination, c'est-à-dire trouver l'interface ou le routeur capable de gérer l'adresse de destination. Une route désigne la voie à prendre pour atteindre un réseau distant."],
["TP2", "Dans quels cas un PC n'a-t-il pas d'accès distant ? Comment obtient-il sa passerelle ?", "S'il n'y a pas de passerelle, si l'adresse de passerelle par défaut n'est pas configurée, ou si la passerelle est en panne. La passerelle s'obtient par configuration manuelle, par DHCP (IPv4) ou par annonce du routeur (IPv6)."],
["TP2", "Au départ, un PC pingue l'interface du routeur sur son réseau : ça marche ? PC 1 et PC 2 communiquent-ils ? PC 1 joint-il Routeur 2 ?", "Oui pour le routeur directement connecté et entre PC 1 et PC 2 : ils sont sur le même réseau 172.16.1.0/24, pas besoin de routage. Non pour Routeur 2 : il est sur un autre réseau et la passerelle des PC (172.16.1.1) est fausse."],
["TP2", "Quelles commandes affichent la table de routage ? Que contient celle de Routeur 1 au départ ? Quelles machines peut-il atteindre ?", "<code>ip route</code> ou <code>route -n</code>. Au départ, seulement ses réseaux directement connectés : 172.16.1.0/24 et 172.16.2.0/24. Il atteint PC 1, PC 2 et Routeur 2 (172.16.2.128), mais pas PC 3 et PC 4."],
["TP2", "Écrire les routes à ajouter sur Routeur 1 et Routeur 2.", "Routeur 1 : <code>ip route add 172.16.3.0/24 via 172.16.2.128</code><br>Routeur 2 : <code>ip route add 172.16.1.0/24 via 172.16.2.254</code>"],
["TP2", "Après les routes des routeurs, le ping d'un PC vers l'autre côté échoue encore. Que faut-il faire ?", "Changer la passerelle par défaut des PC : <code>route del default gw 172.16.x.1</code> puis <code>route add default gw 172.16.x.254</code> (l'adresse du routeur directement relié). Les échanges ne marchent que si <b>toutes</b> les machines et tous les routeurs sont configurés, pour l'aller et pour le retour."],
["TP2", "Routage statique ou dynamique : avantages et inconvénients ?", "<b>Statique</b> (configuré à la main) : plus sûr, moins de charge, mais manque de souplesse et risques d'erreurs (boucles). <b>Dynamique</b> (appris par un protocole) : s'adapte seul aux changements de topologie, meilleure évolutivité ; mais plus de charge (mises à jour), plus complexe, moins sécurisé."],
// TP3
["TP3", "Comparer les protocoles à vecteur de distance et à état de lien.", "<b>Vecteur de distance</b> : métrique = nombre de sauts ; chacun s'annonce à ses voisins de proche en proche ; peu gourmand mais mise à jour lente (ex. RIP). <b>État de lien</b> : prend en compte la bande passante ; messages LSU → chaque routeur connaît toute la topologie ; standard ouvert, convergence rapide, alternatives et équilibrage ; mais calcul lourd (CPU) et installation complexe (ex. OSPF)."],
["TP3", "Citer les 5 types de messages OSPF et leur rôle.", "1 <b>Hello</b> : découverte des voisins · 2 <b>DBD</b> (Database Description) : résumé des LSA de la base · 3 <b>LSR</b> (Link State Request) : demande d'un LSA · 4 <b>LSU</b> (Link State Update) : mise à jour, contient un ou plusieurs LSA · 5 <b>LSAck</b> : accusé de réception."],
["TP3", "Décrire les 4 étapes du fonctionnement d'OSPF dans une zone.", "1. Découverte des voisins par des paquets Hello (Router ID, Area ID, DR, authentification). 2. Inondation (flooding) des LSU dans la zone. 3. Calcul de l'arbre du plus court chemin (Dijkstra) puis de la table de routage. 4. Maintenance : recalcul uniquement quand la topologie change."],
["TP3", "Définir IR, BR, ABR et ASBR.", "<b>IR</b> : routeur interne à une zone non-backbone. <b>BR</b> : routeur de la zone 0 (backbone). <b>ABR</b> : relie au moins 2 zones dont la zone 0, agrège une zone en une route. <b>ASBR</b> : passerelle vers d'autres systèmes autonomes, redistribue les routes extérieures."],
["TP3", "À quoi servent le DR et les adresses 224.0.0.5 et 224.0.0.6 ?", "Le DR (designated router) centralise les LSA pour réduire la charge du réseau. 224.0.0.5 (AllSPFRouters) : du DR vers les autres routeurs. 224.0.0.6 (AllDRouters) : envoi des LSA vers le DR."],
["TP3", "Pourquoi les postes A et B ne peuvent-ils pas accéder aux serveurs S1 et S2 ? Quelles solutions ?", "Les réseaux 10.1.1.0/24 (A, B) et 10.2.2.0/24 (S1, S2) sont sur deux routeurs différents : R1 ne connaît pas 10.2.2.0/24 et R2 ne connaît pas 10.1.1.0/24. Solutions : routes statiques sur R1 et R2, ou routage dynamique OSPF."],
["TP3", "En mode Simulation (filtre OSPF), quelles informations sont échangées entre R1 et R2 ?", "Des paquets <b>Hello</b> (Router ID, zone, DR/BDR, timers) envoyés en multicast pour découvrir les voisins, puis des <b>DBD</b>, <b>LSR</b>, <b>LSU</b> (contenant les LSA : réseaux et coûts) et <b>LSAck</b> pour synchroniser la base d'états de liens."],
["TP3", "Quelles commandes vérifient le voisinage OSPF et le routage ?", "<code>show ip ospf neighbor</code> (voisins, état FULL), <code>show ip route</code> (routes O), <code>show ip protocols</code>, <code>show ip ospf interface brief</code>, <code>show ip ospf database</code>, <code>show ip ospf</code>."],
["TP3", "Écrire la configuration OSPF de R1 (processus 100, zone 0) : réseaux 10.1.1.0/24, 10.3.3.0/25, 10.4.4.0/30.", "<code>router ospf 100</code><br><code>network 10.1.1.0 0.0.0.255 area 0</code><br><code>network 10.3.3.0 0.0.0.127 area 0</code><br><code>network 10.4.4.0 0.0.0.3 area 0</code>"],
["TP3", "Que contiennent les tables de routage de R1, R2 et R3 après la partie 3 ?", "Chacune contient ses réseaux directement connectés (codes C et L) et, en code <b>O</b>, tous les autres réseaux de la zone 0 appris par OSPF, avec [110/coût] et le prochain saut. Par exemple R3 : C 10.5.5.0/30 et 192.168.10.0/24 ; O 10.1.1.0/24, 10.3.3.0/25, 10.4.4.0/30, 10.2.2.0/24 via 10.5.5.1."],
// TP3 bis
["TP3 bis", "À quoi sert <code>clock rate 2000000</code> ? Où la tape-t-on ?", "Elle fixe l'horloge de la liaison série à 2 Mbps. Elle se tape en mode <code>(config-if)#</code> sur l'interface série, côté <b>DCE</b> du câble."],
["TP3 bis", "Quelle table de routage est affichée par <code>show ip route</code> et quelles informations y figurent ?", "La table de routage IP du routeur : pour chaque réseau, la source (C connecté, L local, O OSPF), le réseau et son masque, [distance administrative/métrique], le prochain saut (via …), l'âge de la route et l'interface de sortie."],
["TP3 bis", "Quel chemin est emprunté pour passer du réseau Y au réseau Z ? Est-ce judicieux ?", "On le voit avec <code>tracert</code> depuis un PC de Y et avec la table de routage. OSPF choisit le chemin de <b>coût</b> le plus faible (calculé d'après la bande passante), pas forcément celui qui a le moins de sauts. Un détour par des liens Gigabit peut être préféré à une liaison série directe (coût 64). C'est judicieux car le débit total est meilleur."],
["TP3 bis", "Que contiennent les sections <i>Routing for Networks</i> et <i>Routing Information Sources</i> de <code>show ip protocols</code> ? Distances administratives ?", "<i>Routing for Networks</i> : les réseaux déclarés avec <code>network</code> (masque inversé et zone). <i>Routing Information Sources</i> : les routeurs voisins (Router ID) qui envoient des informations de routage, avec leur distance et la dernière mise à jour. Distance administrative d'OSPF : <b>110</b>."],
["TP3 bis", "Que montre <code>show ip ospf neighbor</code> ? Y a-t-il un DR ? un BDR ?", "Pour chaque voisin : Neighbor ID (Router ID), priorité, état (FULL/DR, FULL/BDR, FULL/DROTHER, FULL/ -), dead time, adresse, interface. Sur chaque segment Ethernet, un DR (plus haute priorité, puis plus haut Router ID) et un BDR de secours. Sur une liaison série point à point : pas de DR (« - »)."],
["TP3 bis", "Qu'apprend-on de plus avec <code>show ip ospf neighbor detail</code> ?", "L'adresse d'interface du voisin, sa zone, sa priorité, son état et le nombre de changements d'état, les adresses du DR et du BDR du segment, les options, le temps restant avant expiration (dead timer) et depuis combien de temps le voisin est up."],
// TP4
["TP4", "Qu'est-ce que LDAP ? Qu'est-ce qu'un annuaire ? Caractéristiques et usages.", "LDAP = Lightweight Directory Access Protocol, protocole d'accès à un annuaire. Un annuaire stocke des données <b>hiérarchisées</b> et pérennes (personnes, clients, matériels). Accès rapide mais mises à jour plus lentes, structure arborescente, langage de recherche, échange au format LDIF. Usages : annuaires d'organismes, et surtout <b>l'authentification</b> (Active Directory, SSO, France Connect), gestion de parcs de VM."],
["TP4", "Définir DIT, DN, objectClass et schéma.", "<b>DIT</b> : arbre des entrées de l'annuaire. <b>DN</b> : identifiant unique d'une entrée, son chemin dans le DIT (ex. <code>cn=Harold Henson,ou=Product Testing,dc=iutinfo,dc=test</code>). <b>objectClass</b> : classe(s) de l'entrée, qui fixent ses attributs obligatoires et optionnels. <b>Schémas</b> : définissent les classes, les attributs et leur hiérarchie."],
["TP4", "Donner la signification de cn, sn, gn, ou, o, dc, l, st.", "cn common name · sn surname (nom) · gn given name (prénom) · ou organizational unit · o organization name · dc domain component · l locality · st state or province."],
["TP4", "Quelles sont les règles de mise en forme d'un fichier LDIF ?", "Un enregistrement = groupe de couples attribut-valeur ; une ligne logique « nom: valeur » par attribut ; une ligne vide entre deux enregistrements ; deux lignes vides en fin de fichier ; une valeur sur plusieurs lignes : les lignes suivantes commencent par un espace."],
["TP4", "Que configure-t-on dans <code>/etc/ldap/slapd.conf</code> et dans <code>/etc/ldap/ldap.conf</code> ?", "<b>slapd.conf</b> (serveur) : schémas inclus, backend, suffixe (racine), rootdn et rootpw (admin), répertoire de la base, ACL d'accès. <b>ldap.conf</b> (client) : BASE (base par défaut), BINDDN (identifiant de connexion), URI du serveur (<code>ldap://IP:389/</code>)."],
["TP4", "Comment vérifier la configuration par défaut du serveur et le DN de l'admin ?", "<code>ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D \"cn=admin,dc=example,dc=org\" -w admin</code> (doit renvoyer l'entrée dc=example,dc=org, result: 0 Success) et <code>ldapwhoami -x -D cn=admin,dc=example,dc=org -W</code> avec le mot de passe admin."],
["TP4", "Décrire la création d'une entrée avec Apache Directory Studio.", "Nouvelle connexion vers l'IP du serveur (souvent <code>172.18.0.2:389</code>, à vérifier avec <code>ip addr show</code>), authentification simple avec l'admin. Clic droit sur le domaine → Nouvelle entrée → choisir <code>inetOrgPerson</code> → Ajouter → bien sélectionner le parent <code>dc=example,dc=org</code> → remplir les attributs → confirmer. Vérifier ensuite sur le serveur avec <code>ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b dc=example,dc=org</code>."],
["TP4", "Comment créer un fichier LDIF en ligne de commande et l'importer ?", "<code>cat &lt;&lt;FIN &gt;base-domain.ldif</code>, coller le contenu, puis taper <code>FIN</code>. Import : <code>ldapadd -x -D cn=admin,dc=iutinfo,dc=test -W -f base-domain.ldif</code>. Vérification : <code>ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b dc=iutinfo,dc=test</code>."],
["TP4", "Quelles réponses donner à <code>dpkg-reconfigure slapd</code> ?", "No (ne pas omettre la configuration) · domaine <code>iut-info.test</code> (→ dc=iut-info,dc=test) · nom d'organisation · mot de passe admin (2 fois) · No (ne pas supprimer la base à la purge) · Yes (déplacer l'ancienne base). Puis <code>service slapd restart</code>."],
// TP5
["TP5", "Quels sont les objectifs d'un pare-feu ? Quels risques et menaces ?", "Contrôler les flux TCP/IP pour empêcher les attaques : compromission (virus, cheval de Troie, fuite d'information), atteinte à la disponibilité ou l'intégrité (déni de service, accès non autorisé, man-in-the-middle). Menaces : attaques externes, attaques internes (bien plus fréquentes), attaques physiques, facteur humain et ingénierie sociale."],
["TP5", "Différencier pare-feu sans état, avec état et applicatif.", "<b>Sans état</b> : chaque paquet traité indépendamment, ACL simples (couche 3) ou étendues (couche 4). <b>Avec état</b> : garde la trace des connexions (NEW, ESTABLISHED, RELATED, INVALID), autorise les réponses automatiquement, plus coûteux. <b>Applicatif</b> : vérifie la conformité au protocole (ex. ModSecurity pour Apache), très gourmand."],
["TP5", "Quelles décisions peut prendre un pare-feu ?", "ACCEPT (laisse passer), DROP (détruit sans prévenir), REJECT (détruit et prévient l'émetteur par ICMP), LOG (inscrit dans les journaux, alerte possible)."],
["TP5", "Qu'est-ce qu'un proxy ? une DMZ ?", "<b>Proxy</b> : serveur intermédiaire qui relaie les requêtes (cache, journalisation, filtrage, anonymat, répartition de charge, authentification), un par application (Squid : HTTP, HTTPS, FTP). <b>DMZ</b> : zone tampon en entrée de réseau, séparée du réseau interne par un pare-feu, qui ne contient que les serveurs publics (web, mail, DNS)."],
["TP5", "IDS, IPS, honeypot : définitions. Faux positif / faux négatif ?", "<b>IDS</b> : détecte les activités suspectes et alerte, par anomalie ou par signature ; réseau (Snort) ou hôte (Fail2ban). <b>IPS</b> : IDS actif qui bloque (ports, reconfiguration). <b>Honeypot</b> : système non protégé pour attirer et étudier les attaquants. Faux positif : évènement normal pris pour une intrusion. Faux négatif : intrusion non détectée."],
["TP5", "Dans Wireshark, pour une connexion FTP, que voit-on (ARP, TCP, login) ?", "D'abord <b>ARP</b> : le PC demande l'adresse MAC de la VM. Puis la poignée de main <b>TCP</b> sur le port 21 : SYN, SYN/ACK, ACK. Ensuite l'échange FTP : bannière 220 du serveur, <code>USER iutinfo</code>, réponse 331, <code>PASS …</code>, réponse 230 (connexion réussie). Le login et le mot de passe circulent <b>en clair</b>."],
["TP5", "Que conclure sur la sécurité des protocoles testés ? Lesquels privilégier ?", "HTTP, FTP et Telnet transmettent tout en clair, y compris les identifiants : à réserver au réseau privé. SSH (et HTTPS) chiffrent les échanges : à privilégier."],
["TP5", "Comment se connecter en SSH à la VM depuis Windows avec la clé créée sous Linux ?", "Convertir la clé privée avec <b>PuTTYgen</b> : Conversions → Import key → <code>id_rsa_remote</code>, puis enregistrer en <code>.ppk</code>. Dans <b>PuTTY</b> : IP de la VM, puis Connection → SSH → Auth → Credentials : chemin du <code>.ppk</code>, Open, login <code>root</code>."],
["TP5", "Que donne <code>netstat -ltp</code> ? Comment voir les services UDP ? Quels ports sont ouverts sur le serveur ?", "Les sockets TCP en écoute (<code>-l</code> écoute, <code>-t</code> TCP, <code>-p</code> PID/programme), avec l'adresse et le port locaux. Pour l'UDP : <code>netstat -lup</code> (ou <code>-lutp</code> pour les deux). Sur la VM du TP : 22 (ssh), 21 (ftp, vsftpd), 80 (http, lighttpd). Correspondance noms/ports : <code>/etc/services</code>."],
["TP5", "Rôle des options de <code>lsof -i -P -n</code> et de <code>ss -tunlp</code> ?", "lsof : <code>-i</code> fichiers réseau, <code>-P</code> ports en numérique, <code>-n</code> pas de résolution DNS. ss : <code>-t</code> TCP, <code>-u</code> UDP, <code>-n</code> numérique, <code>-l</code> en écoute, <code>-p</code> processus."],
["TP5", "Comment se crée et se prépare la VM OpenNebula ?", "<code>ssh-keygen -t rsa -f ~/.ssh/id_rsa_remote</code>, <code>setfacl -Rb ~/.ssh</code>, coller la clé publique (.pub) dans OpenNebula (Authentification), créer la VM depuis le template S3-Réseaux, se connecter avec <code>ssh -i ~/.ssh/id_rsa_remote root@IP</code>. Puis <code>apt update</code>, <code>apt dist-upgrade</code>, <code>reboot</code>, <code>adduser iutinfo</code>, <code>adduser iutinfo sudo</code>, copie de <code>authorized_keys</code>, <code>chmod -R go-rwx</code> et <code>chown -R iutinfo:iutinfo</code> sur son .ssh, <code>apt install vsftpd lighttpd</code>."],
["TP5", "Comment fonctionne l'ordre des règles ufw ? Comment vérifier ?", "Les règles s'appliquent dans l'ordre de déclaration : la première qui correspond décide. Il faut donc placer les règles spécifiques avant les générales (<code>insert 1</code>). On vérifie l'ordre avec <code>sudo ufw status numbered</code>."],
// TP6
["TP6", "Pourquoi désactiver ufw au début du TP6 ? Avec quelle commande ?", "Le pare-feu configuré au TP5 bloquerait l'accès au serveur LDAP (port 389) depuis Apache Directory Studio et Thunderbird. Commande : <code>sudo ufw disable</code>."],
["TP6", "Comment installer et vérifier OpenLDAP sur la VM ?", "<code>sudo apt update</code>, <code>sudo apt upgrade</code>, <code>sudo apt install slapd ldap-utils</code>, <code>sudo dpkg-reconfigure slapd</code> (domaine iut-info.test), puis <code>ldapwhoami -x -D cn=admin,dc=iut-info,dc=test -W</code> et <code>ldapsearch</code> pour voir le DIT."],
["TP6", "Comment importer l'annuaire iut-info.ldif avec Apache Directory Studio ?", "Créer une connexion avec <code>cn=admin,dc=iut-info,dc=test</code> et son mot de passe. Clic droit sur <code>dc=iut-info,dc=test</code> → Import → Import LDIF → choisir le fichier. Vérifier dans la fenêtre du DIT, puis sur le serveur avec <code>ldapsearch</code>."],
["TP6", "Comment utiliser l'annuaire comme carnet d'adresses dans Thunderbird ?", "Carnet d'adresses → Créer un nouveau carnet → Ajouter un carnet d'adresses LDAP. Nom : iut-info.test ; nom d'hôte : adresse IP de la VM ; nom distinct de la base : <code>dc=iut-info,dc=test</code> ; utilisateur : rien (lecture anonyme). Puis faire une recherche pour afficher les entrées."]
];

/* Modèle d'aide-mémoire A4 recto-verso, à recopier à la main */
const AIDE = {
recto: `
<h4>Modes IOS</h4>
<p><code>R&gt;</code> <b>enable</b> → <code>R#</code> <b>configure terminal</b> → <code>(config)#</code><br>
<b>interface g0/0</b> → <code>(config-if)#</code> · <b>router ospf 100</b> → <code>(config-router)#</code><br>
<b>exit</b> −1 niveau · <b>end</b> → <code>R#</code> · <b>do</b> cmd = commande # depuis config</p>
<h4>Interface</h4>
<pre>hostname R1
interface g0/0            (s0/3/0 = série)
 ip address 10.1.1.1 255.255.255.0
 description zone 0
 clock rate 2000000       (série, côté DCE)
 no shutdown
end
write memory  (= copy running-config startup-config)</pre>
<p>Vérif : show ip interface brief · show running-config · show ip route · ping · traceroute — PC : ipconfig, tracert</p>
<h4>OSPF</h4>
<pre>router ospf 100            (TP3 : 100 · TP3 bis : 1)
 network 10.1.1.0 0.0.0.255 area 0   (1 ligne / réseau connecté)
show ip ospf neighbor [detail]  · show ip protocols
show ip ospf · show ip ospf interface brief · show ip ospf database</pre>
<h4>Masque inversé = 255.255.255.255 − masque</h4>
<table><tr><td>/8</td><td>0.255.255.255</td><td>/26</td><td>0.0.0.63</td></tr>
<tr><td>/16</td><td>0.0.255.255</td><td>/27</td><td>0.0.0.31</td></tr>
<tr><td>/20</td><td>0.0.15.255</td><td>/28</td><td>0.0.0.15</td></tr>
<tr><td>/24</td><td>0.0.0.255</td><td>/29</td><td>0.0.0.7</td></tr>
<tr><td>/25</td><td>0.0.0.127</td><td>/30</td><td>0.0.0.3</td></tr></table>
<h4>show ip route</h4>
<p>C connecté · L local · S statique · O OSPF · <code>[110/65]</code> = [distance adm. / coût]<br>
DA : connecté 0 · statique 1 · OSPF 110 · RIP 120 · coût = 10⁸/BP : Giga 1, série 64</p>
<h4>Routage Linux (TP2)</h4>
<pre>ip route  |  route -n
ip route add 172.16.3.0/24 via 172.16.2.128     (R1)
ip route add 172.16.1.0/24 via 172.16.2.254     (R2)
route del default gw 172.16.1.1
route add default gw 172.16.1.254               (PC)
ping · traceroute · bin/start tp2 · bin/stop tp2
Wireshark : ip.addr == 172.16.1.11</pre>
<p>PC1 .1.11 PC2 .1.12 | R1 .1.254 / .2.254 | R2 .2.128 / .3.254 | PC3 .3.3 PC4 .3.4 → aller ET retour</p>
<h4>Ping dans Wireshark (TP1)</h4>
<p>Ethernet II (MAC) → IPv4 (IP, TTL) → ICMP echo request 8 / reply 0. ARP avant le 1er ping.</p>`,
verso: `
<h4>ufw (sudo)</h4>
<pre>ufw status [verbose | numbered] · ufw enable | disable
ufw default deny [incoming] · ufw default deny|allow outgoing
ufw allow 80 · ufw allow http · ufw deny 23/tcp · ufw allow out 993/tcp
ufw insert 1 deny from 192.168.1.50      (règle en 1er)
ufw deny from 192.168.1.50 to any port 22 proto tcp
ufw delete 2</pre>
<p>Défaut : deny (in), allow (out), disabled (routed). Ordre : spécifique avant général.</p>
<h4>Services ouverts</h4>
<p>netstat -ltp (l écoute, t TCP, p prog ; -u UDP) · ss -tunlp (n numérique) · lsof -i -P -n · /etc/services<br>
Ports : 21 ftp · 22 ssh · 23 telnet · 53 dns · 80 http · 389 ldap · 443 https · 465 smtps · 993 imaps</p>
<h4>Pare-feu : cours</h4>
<p><b>Stateless</b> : paquet par paquet, ACL simple (C3) / étendue (C4). <b>Stateful</b> : NEW, ESTABLISHED, RELATED, INVALID. <b>Applicatif</b> : ModSecurity (Apache).<br>
ACCEPT · DROP · REJECT (+ICMP) · LOG. Attaques internes = les plus fréquentes.<br>
<b>Proxy</b> Squid · <b>DMZ</b> = serveurs publics derrière pare-feu · <b>IDS</b> anomalie / signature, réseau Snort, hôte Fail2ban · <b>IPS</b> = IDS actif · <b>honeypot</b>. FP = normal vu comme attaque ; FN = attaque ratée.<br>
FTP/HTTP/Telnet en clair (USER/PASS visibles), SSH chiffré. TCP : SYN, SYN/ACK, ACK.</p>
<h4>VM et SSH (TP5)</h4>
<pre>ssh-keygen -t rsa -f ~/.ssh/id_rsa_remote · setfacl -Rb ~/.ssh
ssh -i ~/.ssh/id_rsa_remote root@IP · PuTTYgen → .ppk → PuTTY</pre>
<h4>LDAP (port 389, démon slapd)</h4>
<p>DIT = arbre · DN = chemin unique · objectClass → attributs (top, person, organizationalPerson, inetOrgPerson, organizationalUnit)<br>
cn nom complet · sn nom · gn prénom · ou unité · o organisation · dc domaine · l ville · st région · uid · mail<br>
LDIF : « nom: valeur », 1 ligne vide entre entrées, 2 à la fin, suite = espace devant</p>
<pre>sudo apt install slapd ldap-utils
sudo dpkg-reconfigure slapd   No · iut-info.test · orga · mdp×2 · No · Yes
service slapd restart
ldapwhoami -x -D cn=admin,dc=iut-info,dc=test -W
ldapsearch -x -H ldap://localhost -b dc=… -D cn=admin,dc=… -w mdp
ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b dc=…   (root, local)
ldapadd -x -D cn=admin,dc=iutinfo,dc=test -W -f fichier.ldif</pre>
<p>-x simple · -H URI · -b base · -D bind DN · -w mdp / -W demandé · -f fichier<br>
slapd.conf : include schema, backend, suffix, rootdn, rootpw, directory, ACL · ldap.conf : BASE, BINDDN, URI</p>
<h4>OSPF : cours</h4>
<p>État de lien (bande passante) ≠ vecteur de distance (sauts, RIP). Maj sur changement, incrémentales, par zones ; zone 0 = backbone.<br>
1 Hello · 2 DBD · 3 LSR · 4 LSU (LSA) · 5 LSAck. Étapes : voisins → inondation → Dijkstra → maintenance.<br>
IR · BR (zone 0) · ABR (≥2 zones dont 0) · ASBR (autre AS). DR/BDR : priorité puis Router ID. 224.0.0.5 AllSPF · 224.0.0.6 AllDR.</p>`
};

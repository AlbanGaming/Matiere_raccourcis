/* ====== FICHES : contenu tiré des TP1 à TP6 (R3.06) ====== */
const PROMPT = {
  user: "R1>", priv: "R1#", config: "R1(config)#", if: "R1(config-if)#",
  router: "R1(config-router)#", pc: "C:\\>", root: "/ #", sh: "$", sudo: "$ sudo"
};

const FICHES = [
{
  id: "ios", kind: "cisco", title: "Cisco IOS : les bases", tp: "TP3 · TP3 bis",
  intro: "Les commandes à taper sur un routeur dans Packet Tracer. Chaque commande se tape dans un <b>mode précis</b> : le prompt t'indique où tu es.",
  notes: [
    { h: "Les 5 modes et leur prompt", html: `
<table class="t">
<tr><th>Prompt</th><th>Mode</th><th>On y fait</th></tr>
<tr><td><code>R1&gt;</code></td><td>utilisateur (EXEC)</td><td>presque rien : ping, quelques show</td></tr>
<tr><td><code>R1#</code></td><td>privilégié</td><td>show, write memory, ping, traceroute</td></tr>
<tr><td><code>R1(config)#</code></td><td>configuration globale</td><td>hostname, interface, router ospf</td></tr>
<tr><td><code>R1(config-if)#</code></td><td>configuration d'interface</td><td>ip address, no shutdown, clock rate, description</td></tr>
<tr><td><code>R1(config-router)#</code></td><td>configuration du routage</td><td>network … area …</td></tr>
</table>` },
    { h: "Se déplacer entre les modes", html: `
<ul>
<li><code>enable</code> : <code>R1&gt;</code> → <code>R1#</code></li>
<li><code>configure terminal</code> : <code>R1#</code> → <code>R1(config)#</code></li>
<li><code>interface g0/0</code> : → <code>R1(config-if)#</code> &nbsp;·&nbsp; <code>router ospf 1</code> : → <code>R1(config-router)#</code></li>
<li><code>exit</code> : remonte d'<b>un</b> niveau &nbsp;·&nbsp; <code>end</code> (ou Ctrl+Z) : retour <b>direct</b> à <code>R1#</code></li>
<li><code>do &lt;commande&gt;</code> : lance une commande du mode privilégié sans quitter la config (<code>do write memory</code>, <code>do show ip route</code>)</li>
</ul>` },
    { h: "Abréviations acceptées par IOS", html: `
<p>IOS accepte n'importe quel début de mot tant qu'il n'est pas ambigu :</p>
<p><code>en</code> = enable · <code>conf t</code> = configure terminal · <code>int g0/0</code> = interface GigabitEthernet0/0 · <code>ip add</code> = ip address · <code>no sh</code> = no shutdown · <code>wr</code> = write memory · <code>sh run</code> = show running-config · <code>sh ip int br</code> = show ip interface brief · <code>sh ip ro</code> = show ip route</p>
<p>Noms d'interfaces : <code>g0/0</code> = GigabitEthernet0/0, <code>fa0/0</code> = FastEthernet0/0, <code>s0/3/0</code> = Serial0/3/0.</p>` },
    { h: "running-config / startup-config", html: `
<p><b>running-config</b> = configuration active, en RAM, perdue au redémarrage.<br><b>startup-config</b> = configuration sauvegardée en NVRAM, chargée au démarrage.<br><code>write memory</code> ou <code>copy running-config startup-config</code> copie la première dans la seconde.</p>` }
  ],
  groups: [
    { h: "Configurer une adresse IP (la séquence type)", items: [
      { p: "R1>", c: "enable", s: "en", d: "Passe en mode privilégié.", q: "Passer du mode utilisateur au mode privilégié" },
      { p: "R1#", c: "configure terminal", s: "conf t", d: "Entre en configuration globale.", q: "Entrer en mode de configuration globale" },
      { p: "R1(config)#", c: "hostname R1", d: "Donne un nom au routeur (le prompt change aussitôt).", q: "Nommer le routeur R1" },
      { p: "R1(config)#", c: "interface g0/0", s: "int g0/0", d: "Sélectionne l'interface GigabitEthernet0/0.", q: "Entrer dans la configuration de l'interface GigabitEthernet0/0" },
      { p: "R1(config-if)#", c: "ip address 10.1.1.1 255.255.255.0", s: "ip add …", d: "Adresse IP + masque en notation décimale (jamais /24 sur Cisco).", q: "Donner l'adresse 10.1.1.1/24 à l'interface" },
      { p: "R1(config-if)#", c: "no shutdown", s: "no sh", d: "Allume l'interface : sur un routeur elles sont éteintes par défaut.", q: "Activer (allumer) l'interface" },
      { p: "R1(config-if)#", c: "end", d: "Retour direct au mode privilégié (<code>exit</code> ne remonte que d'un niveau).", q: "Revenir directement au mode privilégié depuis une interface" },
      { p: "R1#", c: "write memory", s: "wr", alt: ["copy running-config startup-config"], d: "Sauvegarde la configuration (running-config → startup-config).", q: "Sauvegarder la configuration depuis le mode privilégié" },
      { p: "R1(config-if)#", c: "do write memory", s: "do wr", d: "Sauvegarde sans quitter le mode configuration.", q: "Sauvegarder sans quitter le mode configuration" }
    ]},
    { h: "Autres réglages d'interface", items: [
      { p: "R1(config-if)#", c: "description zone 0", d: "Commentaire libre sur l'interface (TP3 partie 3).", q: "Ajouter le commentaire « zone 0 » sur une interface" },
      { p: "R1(config-if)#", c: "clock rate 2000000", d: "Liaison série à 2 Mbps. Se met côté <b>DCE</b> du câble série (TP3 bis).", q: "Régler l'horloge d'une liaison série à 2 Mbps" },
      { p: "R1(config)#", c: "interface s0/3/0", s: "int s0/3/0", d: "Sélectionne une interface série (le nom exact dépend du routeur : vérifie avec <code>show ip interface brief</code>).", q: "Entrer dans l'interface série Serial0/3/0" },
      { p: "R1(config-if)#", c: "shutdown", d: "Éteint l'interface (état <i>administratively down</i>).", q: "Éteindre une interface" },
      { p: "R1(config-if)#", c: "exit", d: "Remonte d'un niveau : (config-if) → (config).", q: "Remonter d'un seul niveau de mode" }
    ]},
    { h: "Vérifier", items: [
      { p: "R1#", c: "show ip interface brief", s: "sh ip int br", d: "Tableau des interfaces : IP, Status (up/down/administratively down), Protocol.", q: "Afficher le résumé des interfaces avec leur IP et leur état" },
      { p: "R1#", c: "show running-config", s: "sh run", d: "Affiche la configuration active.", q: "Afficher la configuration active" },
      { p: "R1#", c: "show startup-config", s: "sh start", d: "Affiche la configuration sauvegardée.", q: "Afficher la configuration sauvegardée en NVRAM" },
      { p: "R1#", c: "show ip route", s: "sh ip ro", d: "Table de routage (voir la fiche OSPF pour lire les codes C, L, O).", q: "Afficher la table de routage du routeur" },
      { p: "R1#", c: "ping 10.1.1.2", d: "Teste la connectivité. <code>!</code> = réponse reçue, <code>.</code> = délai dépassé.", q: "Tester la connectivité vers 10.1.1.2 depuis le routeur" },
      { p: "R1#", c: "traceroute 10.2.2.1", d: "Liste les routeurs traversés (sur un PC : <code>tracert</code>).", q: "Afficher le chemin vers 10.2.2.1 depuis le routeur" }
    ]},
    { h: "Sur un PC dans Packet Tracer (Desktop → Command Prompt)", items: [
      { p: "C:\\>", c: "ipconfig", d: "Affiche IP, masque et passerelle par défaut du PC.", q: "Afficher la configuration IP d'un PC dans Packet Tracer", kind: "text" },
      { p: "C:\\>", c: "ping 10.2.2.1", d: "Teste la connectivité depuis le PC.", q: "Tester depuis un PC la connectivité vers 10.2.2.1", kind: "text" },
      { p: "C:\\>", c: "tracert 10.2.2.1", d: "Chemin emprunté (TP3 bis : « valider les chemins empruntés »).", q: "Afficher le chemin vers 10.2.2.1 depuis un PC Windows / Packet Tracer", kind: "text" }
    ]}
  ]
},
{
  id: "ospf", kind: "cisco", title: "OSPF : routage dynamique", tp: "TP3 · TP3 bis",
  intro: "On active un <b>processus OSPF</b>, puis on déclare chaque réseau directement connecté avec son <b>masque inversé</b> et sa <b>zone</b>. Dans les TP, tout est en zone 0.",
  wildcard: true,
  notes: [
    { h: "La recette OSPF", html: `
<pre class="cfg">R1# configure terminal
R1(config)# router ospf 100
R1(config-router)# network 10.1.1.0 0.0.0.255 area 0
R1(config-router)# network 10.3.3.0 0.0.0.127 area 0
R1(config-router)# network 10.4.4.0 0.0.0.3 area 0
R1(config-router)# end
R1# write memory</pre>
<p>Une ligne <code>network</code> par réseau <b>directement connecté</b> au routeur (les réseaux lointains, c'est OSPF qui les apprend). TP3 : processus 100 sur tous les routeurs. TP3 bis : processus 1. Bon à savoir : c'est le <b>numéro de zone</b> qui doit être identique entre voisins, le numéro de processus est local au routeur.</p>` },
    { h: "Masque inversé (wildcard)", html: `
<p><b>Masque inversé = 255.255.255.255 − masque.</b> Exemple /25 : 255.255.255.255 − 255.255.255.128 = <code>0.0.0.127</code>.</p>
<table class="t mono">
<tr><th>CIDR</th><th>Masque</th><th>Masque inversé</th></tr>
<tr><td>/8</td><td>255.0.0.0</td><td>0.255.255.255</td></tr>
<tr><td>/16</td><td>255.255.0.0</td><td>0.0.255.255</td></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>0.0.0.255</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>0.0.0.127</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>0.0.0.63</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>0.0.0.31</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>0.0.0.15</td></tr>
<tr><td>/29</td><td>255.255.255.248</td><td>0.0.0.7</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>0.0.0.3</td></tr>
</table>` },
    { h: "Lire show ip route", html: `
<pre class="cfg">C    10.4.4.0/30 is directly connected, Serial0/3/0
L    10.4.4.1/32 is directly connected, Serial0/3/0
O    10.2.2.0/24 [110/65] via 10.4.4.2, 00:00:12, Serial0/3/0</pre>
<ul>
<li><b>C</b> = réseau directement connecté · <b>L</b> = adresse locale de l'interface · <b>O</b> = appris par OSPF · <b>S</b> = route statique</li>
<li><code>[110/65]</code> = [<b>distance administrative</b> / <b>métrique</b>]. 110 = OSPF. 65 = coût total du chemin.</li>
<li><code>via 10.4.4.2</code> = prochain routeur (next hop), puis l'interface de sortie.</li>
<li>Coût OSPF = 10<sup>8</sup> / bande passante : Gigabit/Fast = 1, liaison série par défaut = 64. Donc série + Gigabit = 65.</li>
</ul>` },
    { h: "Distances administratives à connaître", html: `
<p>Plus elle est petite, plus la source est jugée fiable : connecté <b>0</b> · statique <b>1</b> · OSPF <b>110</b> · RIP <b>120</b>.</p>` }
  ],
  groups: [
    { h: "Configurer", items: [
      { p: "R1(config)#", c: "router ospf 100", d: "Démarre le processus OSPF n°100 et passe en mode <code>(config-router)</code>.", q: "Démarrer le processus OSPF numéro 100" },
      { p: "R1(config-router)#", c: "network 10.1.1.0 0.0.0.255 area 0", s: "net …", d: "Annonce le réseau 10.1.1.0/24 dans la zone 0 (backbone).", q: "Annoncer le réseau 10.1.1.0/24 dans la zone 0" },
      { p: "R1(config-router)#", c: "network 10.4.4.0 0.0.0.3 area 0", d: "Liaison série en /30 → masque inversé 0.0.0.3.", q: "Annoncer la liaison 10.4.4.0/30 dans la zone 0" },
      { p: "R1(config-router)#", c: "network 10.20.0.0 0.0.255.255 area 0", d: "Réseau en /16 (TP3 bis) → 0.0.255.255.", q: "Annoncer le réseau 10.20.0.0/16 dans la zone 0" },
      { p: "R1(config)#", c: "router ospf 1", d: "TP3 bis : processus OSPF 1, zone 0.", q: "Démarrer le processus OSPF numéro 1" }
    ]},
    { h: "Vérifier", items: [
      { p: "R1#", c: "show ip route", s: "sh ip ro", d: "Les routes apprises par OSPF commencent par <b>O</b>.", q: "Voir si des routes ont été apprises par OSPF" },
      { p: "R1#", c: "show ip ospf neighbor", s: "sh ip ospf nei", d: "Liste des voisins : Neighbor ID, état (FULL/DR, FULL/BDR, FULL/ -), interface.", q: "Vérifier les relations de voisinage OSPF" },
      { p: "R1#", c: "show ip ospf neighbor detail", d: "En plus : adresse du DR et du BDR, priorité, zone, compteurs.", q: "Afficher le détail des voisins OSPF (DR, BDR, priorité)" },
      { p: "R1#", c: "show ip protocols", s: "sh ip prot", d: "<i>Routing for Networks</i> = réseaux déclarés par <code>network</code>. <i>Routing Information Sources</i> = voisins qui envoient des routes. <i>Distance</i> = 110.", q: "Afficher les réseaux annoncés et la distance administrative d'OSPF" },
      { p: "R1#", c: "show ip ospf", d: "Infos sur le processus OSPF (Router ID, zones…).", q: "Afficher les informations du processus OSPF actif" },
      { p: "R1#", c: "show ip ospf interface brief", d: "Interfaces qui participent à OSPF, leur zone, leur coût et leur rôle (DR, BDR, P2P…).", q: "Lister les interfaces qui participent à OSPF avec leur coût" },
      { p: "R1#", c: "show ip ospf database", d: "Base de données d'états de liens (LSDB) de la zone.", q: "Afficher la base de données d'états de liens OSPF" }
    ]},
    { h: "Complément (pas dans les TP Cisco, utile pour comprendre)", items: [
      { p: "R1(config)#", c: "ip route 10.2.2.0 255.255.255.0 10.4.4.2", d: "Route <b>statique</b> Cisco : réseau, masque, prochain routeur. Apparaît avec le code <b>S</b>.", q: "Créer sur Cisco une route statique vers 10.2.2.0/24 via 10.4.4.2", extra: true },
      { p: "R1(config)#", c: "ip route 0.0.0.0 0.0.0.0 10.4.4.2", d: "Route par défaut (« on utilise toujours une route statique pour la passerelle par défaut », TP3).", q: "Créer sur Cisco une route par défaut via 10.4.4.2", extra: true }
    ]}
  ]
},
{
  id: "linux", kind: "text", title: "Routage sous Linux", tp: "TP1 · TP2",
  intro: "Dans la simulation Docker (<code>bin/start tp2</code>), PC et routeurs sont des machines Linux : on configure les routes à la main.",
  notes: [
    { h: "Topologie TP1 / TP2", html: `
<table class="t mono">
<tr><th>Machine</th><th>Adresse(s)</th></tr>
<tr><td>PC 1 · PC 2</td><td>172.16.1.11 · 172.16.1.12</td></tr>
<tr><td>Routeur 1</td><td>172.16.1.254 · 172.16.2.254</td></tr>
<tr><td>Routeur 2</td><td>172.16.2.128 · 172.16.3.254</td></tr>
<tr><td>PC 3 · PC 4</td><td>172.16.3.3 · 172.16.3.4</td></tr>
</table>
<p>Routeur 1 ne connaît pas 172.16.3.0/24, Routeur 2 ne connaît pas 172.16.1.0/24, et les PC ont une mauvaise passerelle (.1). <b>Il faut configurer toutes les machines</b>, car la réponse doit aussi trouver son chemin du retour.</p>` },
    { h: "Ce qu'il faut savoir sur le routage", html: `
<ul>
<li><b>Routage</b> = trouver l'interface ou le routeur capable d'acheminer un paquet vers sa destination.</li>
<li>Un hôte envoie : à lui-même (loopback), sur son réseau local (direct, via switch), ou à un réseau distant → <b>passerelle par défaut</b> obligatoire.</li>
<li>Pas d'accès distant si : pas de passerelle, passerelle non configurée ou en panne. La passerelle s'obtient à la main, par DHCP (IPv4) ou par annonce du routeur (IPv6).</li>
<li>Un routeur travaille en <b>couche 3</b> : il lit l'adresse IP de destination pour choisir l'interface de sortie.</li>
<li>Aucune route trouvée → <b>paquet détruit</b>, sauf s'il existe une route par défaut.</li>
<li>Table de routage = destination / passerelle (prochain routeur) / interface. Inutile entre réseaux <b>directement connectés</b> au même routeur.</li>
<li><b>Statique</b> : écrit par l'admin, plus sûr et moins de calcul, mais rigide et source d'erreurs (boucles). <b>Dynamique</b> : appris par un protocole, s'adapte aux pannes et aux grands réseaux, mais plus de charge et moins sûr.</li>
<li>Routage par classe : RIPv1, IGRP. Sans classe : RIPv2, EIGRP, OSPF.</li>
</ul>` }
  ],
  groups: [
    { h: "Afficher", items: [
      { p: "/ #", c: "ip route", d: "Affiche la table de routage.", q: "Afficher la table de routage sous Linux (commande ip)" },
      { p: "/ #", c: "route -n", d: "Table de routage en numérique (sans résolution de noms).", q: "Afficher la table de routage avec la commande route, en numérique" },
      { p: "/ #", c: "ip addr show", d: "Adresses IP des interfaces (TP4 : retrouver l'IP du serveur).", q: "Afficher les adresses IP des interfaces Linux" }
    ]},
    { h: "Modifier les routes", items: [
      { p: "/ #", c: "ip route add 172.16.3.0/24 via 172.16.2.128", d: "Sur Routeur 1 : pour joindre 172.16.3.0/24, passer par Routeur 2.", q: "Sur Routeur 1, ajouter la route vers 172.16.3.0/24 via 172.16.2.128" },
      { p: "/ #", c: "ip route add 172.16.1.0/24 via 172.16.2.254", d: "Sur Routeur 2 : la route du retour vers PC 1 et PC 2.", q: "Sur Routeur 2, ajouter la route vers 172.16.1.0/24 via 172.16.2.254" },
      { p: "/ #", c: "route del default gw 172.16.1.1", d: "Supprime la passerelle par défaut initiale (.1).", q: "Sur PC 1, supprimer la passerelle par défaut 172.16.1.1" },
      { p: "/ #", c: "route add default gw 172.16.1.254", alt: ["ip route add default via 172.16.1.254"], d: "Nouvelle passerelle par défaut = le routeur directement relié.", q: "Sur PC 1, définir 172.16.1.254 comme passerelle par défaut" }
    ]},
    { h: "Tester et observer", items: [
      { p: "/ #", c: "ping 172.16.1.254", d: "Teste la connectivité.", q: "Tester la connectivité vers 172.16.1.254" },
      { p: "/ #", c: "traceroute 172.16.3.3", d: "Liste les routeurs traversés.", q: "Lister les routeurs traversés jusqu'à 172.16.3.3 (Linux)" },
      { p: "Wireshark", c: "ip.addr == 172.16.1.11", d: "Filtre Wireshark : ne garder que les paquets de/vers PC 1.", q: "Filtre Wireshark pour n'afficher que le trafic de/vers 172.16.1.11" },
      { p: "$", c: "bin/start tp2", d: "Lance la simulation (depuis le dossier r306-td). <code>bin/stop tp2</code> l'arrête. Les machines sont réinitialisées à chaque lancement.", q: "Lancer la simulation Docker du TP2" }
    ]}
  ]
},
{
  id: "firewall", kind: "text", title: "Pare-feu ufw et services", tp: "TP5",
  intro: "<b>ufw</b> (Uncomplicated Firewall) est une interface simplifiée de Netfilter/iptables. Les règles s'appliquent <b>dans l'ordre</b> : les règles spécifiques avant les générales.",
  notes: [
    { h: "Pourquoi un pare-feu", html: `
<ul>
<li>Un pare-feu examine et filtre les paquets IP entrants, sortants ou transférés : <b>contrôle de flux TCP/IP</b>.</li>
<li>Objectif : empêcher les attaques externes (virus, cheval de Troie, fuite d'info, déni de service, accès non autorisé, man-in-the-middle).</li>
<li><b>Attaques externes</b> : depuis l'extérieur du SI, via les points de passage (proxy, routeurs → DMZ). <b>Attaques internes</b> : <b>bien plus fréquentes</b>. <b>Attaques physiques</b> : débrancher un câble, un équipement.</li>
<li><b>Facteur humain</b> souvent prépondérant, et l'ingénierie sociale (mot de passe sous le clavier…).</li>
<li>Organisation : contrôler le trafic, isoler le réseau interne (zones de confiance), créer des zones de sécurité ou une DMZ.</li>
</ul>` },
    { h: "Types de pare-feu", html: `
<ul>
<li>Intégré à un routeur, une passerelle (proxy) ou un ordinateur. Deux grands types : à <b>filtrage</b> ou <b>applicatif</b>.</li>
<li><b>Sans état (stateless)</b> : chaque paquet traité indépendamment. Utilise des ACL : simples = en-tête IP (couche 3), étendues = aussi TCP/UDP (couche 4). Configuration statique, difficile à maintenir.</li>
<li><b>Avec état (stateful)</b> : garde la trace des connexions, un paquet est jugé selon les précédents. Plus coûteux. États : <b>NEW</b> (connexion en cours d'établissement), <b>ESTABLISHED</b> (déjà établie, dans les 2 sens), <b>RELATED</b> (nouvelle connexion liée à une existante : FTP, erreur ICMP), <b>INVALID</b> (aucun flux ou infos erronées).</li>
<li><b>Applicatif</b> : vérifie la conformité au protocole (que du HTTP sur le port 80). Très gourmand. Exemple : <b>ModSecurity</b> pour Apache (injections SQL, XSS…).</li>
<li><b>Filtrage statique</b> : ports, protocole, IP source/destination, type ICMP, taille, interface. <b>Filtrage dynamique</b> : état des connexions, NAT, redirection, notion de <b>session</b> (un retour n'est autorisé que si un paquet similaire est passé dans l'autre sens).</li>
</ul>` },
    { h: "Décisions et règles", html: `
<ul>
<li><b>ACCEPT</b> : laisse passer · <b>DROP</b> : détruit sans prévenir · <b>REJECT</b> : détruit et <b>prévient l'émetteur par ICMP</b> · <b>LOG</b> : inscrit dans les journaux (alerte possible).</li>
<li>Bonne pratique : n'autoriser <b>que</b> les services utilisés, refuser tout le reste.</li>
<li>Ports : HTTP <b>80</b> · HTTPS <b>443</b> · SSH <b>22</b> · DNS <b>53</b> · IMAPS <b>993</b> · SMTP sécurisé <b>465</b> · FTP <b>21</b> · Telnet <b>23</b> · LDAP <b>389</b>.</li>
<li>Avantages du filtrage de paquets : politique centralisée, traitement rapide (niveau 4), beaucoup d'outils. Inconvénients : une règle par port/adresse, règles manuelles complexes (mises à jour, conflits).</li>
<li>Par défaut ufw : <code>deny (incoming), allow (outgoing), disabled (routed)</code>.</li>
</ul>` },
    { h: "Proxy, DMZ, IDS, IPS, honeypot", html: `
<ul>
<li><b>Proxy</b> (serveur mandataire) : relaie les requêtes client ↔ serveur. Cache, compression, logs, filtrage, anonymat, répartition de charge, authentification. Un serveur par application : <b>Squid</b> (HTTP, HTTPS, FTP). Peut aussi servir à contourner un filtrage ou anonymiser (Tor).</li>
<li><b>DMZ</b> : zone tampon en entrée de réseau, séparée du réseau interne par un pare-feu, qui contient <b>uniquement les serveurs publics</b> (web, mail, DNS). En amont du pare-feu ou en étoile sur un routeur-pare-feu.</li>
<li><b>IDS</b> : détecte les activités suspectes et alerte. Par <b>anomalie</b> (écart au comportement normal, ex. échecs de login) ou par <b>signature</b> (attaques connues, ne voit pas les nouvelles). IDS <b>réseau</b> : Snort. IDS <b>hôte</b> : Fail2ban. <b>Faux positif</b> = évènement normal pris pour une intrusion. <b>Faux négatif</b> = intrusion non détectée.</li>
<li><b>IPS</b> = « IDS actif » : bloque des ports, reconfigure routeur ou pare-feu.</li>
<li><b>Honeypot</b> (pot de miel) : machine volontairement non protégée pour attirer et étudier les attaquants.</li>
</ul>` },
    { h: "Ce que montre Wireshark (TP5)", html: `
<p>En <b>FTP</b> (et HTTP, Telnet), le login et le mot de passe passent <b>en clair</b> : on les lit dans la capture. En <b>SSH</b>, tout est chiffré. À privilégier : SSH, HTTPS. FTP et Telnet : seulement sur réseau privé. On repère aussi l'ARP, puis la poignée de main TCP (SYN, SYN/ACK, ACK).</p>` }
  ],
  groups: [
    { h: "Activer et consulter", items: [
      { p: "$", c: "sudo ufw status", d: "État : actif ou inactif.", q: "Afficher l'état du pare-feu ufw" },
      { p: "$", c: "sudo ufw status verbose", d: "Détail des règles + politiques par défaut.", q: "Afficher les règles ufw et les politiques par défaut" },
      { p: "$", c: "sudo ufw status numbered", d: "Règles numérotées : pour vérifier l'ordre d'exécution.", q: "Afficher les règles ufw numérotées" },
      { p: "$", c: "sudo ufw enable", d: "Active ufw (applique les règles).", q: "Activer le pare-feu ufw" },
      { p: "$", c: "sudo ufw disable", d: "Désactive ufw (TP6 : à faire avant LDAP).", q: "Désactiver le pare-feu ufw" }
    ]},
    { h: "Politiques par défaut", items: [
      { p: "$", c: "sudo ufw default deny", alt: ["sudo ufw default deny incoming"], d: "Refuse par défaut le trafic <b>entrant</b>.", q: "Refuser par défaut tout le trafic entrant" },
      { p: "$", c: "sudo ufw default deny outgoing", d: "Refuse par défaut le trafic <b>sortant</b>.", q: "Refuser par défaut tout le trafic sortant" },
      { p: "$", c: "sudo ufw default allow outgoing", d: "Autorise par défaut le trafic sortant.", q: "Autoriser par défaut tout le trafic sortant" }
    ]},
    { h: "Ajouter des règles", items: [
      { p: "$", c: "sudo ufw allow 80", d: "Ouvre le port 80 (TCP et UDP).", q: "Ouvrir le port 80 en entrée" },
      { p: "$", c: "sudo ufw allow http", d: "Autorise un service par son nom (liste dans <code>/etc/services</code>).", q: "Autoriser le service http par son nom" },
      { p: "$", c: "sudo ufw deny 23/tcp", d: "<code>/tcp</code> : filtre seulement en TCP. Ici on bloque Telnet.", q: "Bloquer Telnet (port 23) en TCP uniquement" },
      { p: "$", c: "sudo ufw allow out 993/tcp", d: "Autorise une connexion <b>sortante</b> (IMAPS).", q: "Autoriser les connexions sortantes vers le port 993 en TCP" },
      { p: "$", c: "sudo ufw insert 1 deny from 192.168.1.50", d: "<code>insert 1</code> place la règle <b>en premier</b>, avant les autres.", q: "Bloquer l'IP 192.168.1.50 en plaçant la règle en première position" },
      { p: "$", c: "sudo ufw deny from 192.168.1.50 to any port 22 proto tcp", d: "Bloque SSH uniquement depuis 192.168.1.50.", q: "Bloquer l'accès SSH depuis 192.168.1.50 uniquement" },
      { p: "$", c: "sudo ufw allow from 192.168.31.15", d: "Autorise tout ce qui vient d'une adresse.", q: "Autoriser tout le trafic entrant venant de 192.168.31.15" },
      { p: "$", c: "sudo ufw delete 2", d: "Supprime la règle n°2 (voir <code>status numbered</code>).", q: "Supprimer la règle ufw numéro 2", extra: true }
    ]},
    { h: "Voir les services ouverts", items: [
      { p: "#", c: "netstat -ltp", d: "<code>-l</code> sockets en écoute · <code>-t</code> TCP · <code>-p</code> programme (PID/nom). Pour l'UDP : <code>netstat -lup</code>.", q: "Lister avec netstat les ports TCP en écoute et leur programme" },
      { p: "$", c: "sudo ss -tunlp", d: "<code>-t</code> TCP · <code>-u</code> UDP · <code>-n</code> numérique · <code>-l</code> en écoute · <code>-p</code> processus.", q: "Lister avec ss les ports TCP et UDP en écoute, en numérique, avec le processus" },
      { p: "$", c: "sudo lsof -i -P -n", d: "<code>-i</code> fichiers réseau · <code>-P</code> ports en chiffres · <code>-n</code> pas de résolution DNS.", q: "Lister avec lsof les connexions réseau ouvertes sans résolution de noms ni de ports" },
      { p: "$", c: "cat /etc/services", d: "Correspondance nom de service ↔ port/protocole.", q: "Afficher le fichier qui associe les noms de services aux ports" }
    ]},
    { h: "SSH par clé (mise en place de la VM)", items: [
      { p: "$", c: "ssh-keygen -t rsa -f ~/.ssh/id_rsa_remote", d: "Crée une paire de clés RSA. La clé publique (<code>.pub</code>) se colle dans OpenNebula.", q: "Créer une paire de clés RSA nommée id_rsa_remote" },
      { p: "$", c: "ssh -i ~/.ssh/id_rsa_remote root@10.0.0.5", d: "Connexion à la VM avec la clé privée (sous Windows : PuTTYgen convertit en .ppk pour PuTTY).", q: "Se connecter en root à 10.0.0.5 avec la clé id_rsa_remote" }
    ]}
  ]
},
{
  id: "ldap", kind: "text", title: "LDAP et OpenLDAP", tp: "TP4 · TP6",
  intro: "<b>LDAP</b> (Lightweight Directory Access Protocol) est un protocole d'accès à un <b>annuaire</b> : des données hiérarchisées et pérennes (personnes, matériels). Serveur : <b>slapd</b> (OpenLDAP), port <b>389</b>.",
  notes: [
    { h: "Vocabulaire", html: `
<ul>
<li><b>Annuaire</b> : stockage hiérarchique de données rarement modifiées. Accès rapide, mises à jour plus lentes, langage de recherche, échange en LDIF.</li>
<li><b>DIT</b> (Directory Information Tree) : l'arbre des entrées.</li>
<li><b>DN</b> (Distinguished Name) : identifiant unique d'une entrée = son chemin dans l'arbre, de la feuille vers la racine : <code>cn=Harold Henson,ou=Product Testing,dc=iutinfo,dc=test</code>.</li>
<li><b>objectClass</b> : classe(s) de l'entrée, qui fixent les attributs obligatoires et optionnels (définis dans les <b>schémas</b>). <code>top</code> = classe abstraite mère de toutes.</li>
<li>Classes vues : <code>dcObject</code>, <code>organization</code>, <code>organizationalUnit</code>, <code>person</code>, <code>organizationalPerson</code>, <code>inetOrgPerson</code>, <code>posixAccount</code>, <code>device</code>.</li>
<li>Usages : annuaires d'organismes, et surtout l'<b>authentification</b> (Active Directory, SSO, France Connect).</li>
</ul>` },
    { h: "Attributs usuels", html: `
<table class="t">
<tr><td><code>cn</code></td><td>common name (nom complet)</td><td><code>sn</code></td><td>surname (nom de famille)</td></tr>
<tr><td><code>gn</code> / <code>givenName</code></td><td>prénom</td><td><code>uid</code></td><td>identifiant</td></tr>
<tr><td><code>ou</code></td><td>organizational unit</td><td><code>o</code></td><td>organization name</td></tr>
<tr><td><code>dc</code></td><td>domain component</td><td><code>l</code></td><td>locality (ville)</td></tr>
<tr><td><code>st</code></td><td>state or province</td><td><code>mail</code></td><td>adresse mail</td></tr>
</table>
<p>Le domaine DNS <code>iut-info.test</code> donne la racine <code>dc=iut-info,dc=test</code>.</p>` },
    { h: "Format LDIF", html: `
<pre class="cfg">dn: ou=Comptabilité,dc=iutinfo,dc=test
changetype: add
ou: Comptabilité
objectClass: top
objectClass: organizationalUnit

dn: cn=Désiré Atkinson,ou=Comptabilité,dc=iutinfo,dc=test
changetype: add
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn: Désiré Atkinson
sn: Atkinson
uid: AtkinsoD</pre>
<ul>
<li>Chaque attribut sur une ligne : <code>nom: valeur</code>. Suite d'une valeur sur la ligne suivante : commencer par un espace.</li>
<li><b>Une ligne vide</b> entre deux enregistrements, <b>deux lignes vides</b> à la fin du fichier.</li>
<li>Sert aux imports/exports et à créer, modifier, supprimer beaucoup d'entrées d'un coup (CRUD).</li>
</ul>` },
    { h: "Fichiers de configuration", html: `
<ul>
<li>Serveur : <code>/etc/ldap/slapd.conf</code> : schémas (<code>include inetorgperson.schema</code>), backend (<code>backend bdb</code>), <code>suffix "dc=iutinfo,dc=test"</code> (racine), <code>rootdn</code> + <code>rootpw</code> (admin), <code>directory "/var/lib/ldap"</code>, ACL (<code>access to … by … write/read/auth/none</code>).</li>
<li>Client : <code>/etc/ldap/ldap.conf</code> : <code>BASE dc=iutinfo,dc=test</code>, <code>BINDDN uid=toto,ou=People,dc=iutinfo,dc=test</code>, <code>URI ldap://123.234.56.78:389/</code>.</li>
<li>Outils graphiques : Apache Directory Studio (navigateur LDAP, import LDIF), Thunderbird (carnet d'adresses LDAP).</li>
</ul>` },
    { h: "Options des commandes ldap*", html: `
<table class="t">
<tr><td><code>-x</code></td><td>authentification simple (pas SASL)</td><td><code>-H</code></td><td>URI du serveur : <code>ldap://localhost</code>, <code>ldapi:///</code></td></tr>
<tr><td><code>-D</code></td><td>DN avec lequel on se connecte (bind DN)</td><td><code>-b</code></td><td>base de la recherche</td></tr>
<tr><td><code>-w mdp</code></td><td>mot de passe en clair dans la commande</td><td><code>-W</code></td><td>demande le mot de passe (plus sûr)</td></tr>
<tr><td><code>-f</code></td><td>fichier LDIF à importer</td><td><code>-Y EXTERNAL</code></td><td>authentification SASL par le compte système (root, socket local)</td></tr>
<tr><td><code>-Q</code></td><td>mode silencieux SASL</td><td><code>-L</code></td><td>résultat au format LDIF</td></tr>
</table>` }
  ],
  groups: [
    { h: "Installer et configurer", items: [
      { p: "$", c: "sudo apt install slapd ldap-utils", d: "Serveur OpenLDAP (slapd) + utilitaires clients.", q: "Installer le serveur OpenLDAP et ses utilitaires" },
      { p: "$", c: "sudo dpkg-reconfigure slapd", d: "Reconfigure la base : <b>No</b>, domaine <code>iut-info.test</code>, organisation, mot de passe admin (2 fois), <b>No</b> (ne pas supprimer à la purge), <b>Yes</b> (déplacer l'ancienne base).", q: "Reconfigurer la base LDAP (nouveau domaine, nouveau mot de passe admin)" },
      { p: "#", c: "service slapd restart", d: "Relance le service pour prendre en compte la modification.", q: "Redémarrer le service OpenLDAP" }
    ]},
    { h: "Vérifier et interroger", items: [
      { p: "$", c: "ldapwhoami -x -D cn=admin,dc=iut-info,dc=test -W", d: "Vérifie qu'on peut se connecter en admin → <code>dn:cn=admin,dc=iut-info,dc=test</code>.", q: "Vérifier la connexion de l'admin cn=admin,dc=iut-info,dc=test (mot de passe demandé)" },
      { p: "$", c: "ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D cn=admin,dc=example,dc=org -w admin", d: "Recherche tout l'arbre sous <code>dc=example,dc=org</code> en se connectant en admin (TP4, config par défaut).", q: "Afficher l'arbre dc=example,dc=org sur localhost en admin (mot de passe admin dans la commande)" },
      { p: "#", c: "ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b dc=iutinfo,dc=test", d: "Affiche le DIT en local, en root, sans mot de passe (socket <code>ldapi</code>).", q: "Afficher le DIT dc=iutinfo,dc=test en local en root, sans mot de passe" }
    ]},
    { h: "Ajouter des entrées", items: [
      { p: "$", c: "ldapadd -x -D cn=admin,dc=iutinfo,dc=test -W -f base-domain.ldif", d: "Importe un fichier LDIF en tant qu'admin.", q: "Importer le fichier base-domain.ldif en admin de dc=iutinfo,dc=test" },
      { p: "$", c: "cat <<FIN >base-domain.ldif", d: "Crée le fichier LDIF en collant son contenu, terminé par une ligne <code>FIN</code>.", q: "Créer base-domain.ldif en collant le texte jusqu'au mot FIN" },
      { p: "", c: "ldapmodify · ldapdelete · ldappasswd", d: "Autres utilitaires : modifier, supprimer une entrée, changer un mot de passe.", q: "Citer les 3 autres utilitaires OpenLDAP (modifier, supprimer, mot de passe)", noType: true }
    ]}
  ]
},
{
  id: "theorie", kind: "text", title: "Théorie : routage dynamique et OSPF", tp: "TP2 · TP3",
  intro: "Les notions de cours qui peuvent tomber en question.",
  notes: [
    { h: "Deux familles de protocoles", html: `
<table class="t">
<tr><th></th><th>Vecteur de distance</th><th>État de lien</th></tr>
<tr><td>Critère</td><td>nombre de <b>sauts</b> (routeurs)</td><td><b>bande passante</b> (coût)</td></tr>
<tr><td>Échanges</td><td>chacun s'annonce à ses voisins, de proche en proche</td><td>messages LSU (@IP + bande passante) → chaque routeur connaît <b>toute la topologie</b></td></tr>
<tr><td>Plus</td><td>peu gourmand pour le routeur</td><td>standard ouvert, convergence rapide, alternatives et équilibrage</td></tr>
<tr><td>Moins</td><td>mise à jour lente</td><td>beaucoup de calcul (CPU), installation complexe</td></tr>
<tr><td>Exemple</td><td>RIP</td><td><b>OSPF</b></td></tr>
</table>` },
    { h: "OSPF : éléments-clés", html: `
<ul>
<li>Mises à jour <b>seulement en cas de changement</b>, <b>incrémentales</b>, réparties par <b>zones</b> (areas).</li>
<li>Zone : réseau ou groupe de réseaux contigus, les zones ne se chevauchent pas. Tous les routeurs d'une zone ont la même base d'états de liens.</li>
<li>Toute zone doit être reliée à la <b>zone 0 = backbone</b> (épine dorsale).</li>
<li>Calcul du plus court chemin : algorithme de <b>Dijkstra</b> (SPF, Shortest Path Tree). Métrique (coût) de 1 à 65535 selon la bande passante.</li>
<li><b>DR</b> (designated router) : centralise les LSA pour diminuer la charge ; <b>BDR</b> = DR de secours.</li>
<li>Multicast : <b>224.0.0.5</b> (AllSPFRouters, du DR vers les autres) · <b>224.0.0.6</b> (AllDRouters, LSA envoyés au DR).</li>
</ul>` },
    { h: "Les 5 types de messages OSPF", html: `
<table class="t">
<tr><th>Type</th><th>Nom</th><th>Rôle</th></tr>
<tr><td>1</td><td>Hello</td><td>découverte des voisins</td></tr>
<tr><td>2</td><td>Database Description (DBD)</td><td>résumé de toutes les entrées LSA (la base) d'un routeur</td></tr>
<tr><td>3</td><td>Link State Request (LSR)</td><td>demande d'un LSA</td></tr>
<tr><td>4</td><td>Link State Update (LSU)</td><td>mise à jour des chemins + coûts, contient un ou plusieurs <b>LSA</b></td></tr>
<tr><td>5</td><td>Link State Ack (LSAck)</td><td>accusé de réception d'un LSA</td></tr>
</table>
<p>Le <b>Hello</b> contient : Router ID, Area ID (n° de zone), routeur désigné (DR), éventuellement l'authentification.</p>` },
    { h: "Les 4 étapes dans une zone", html: `
<ol>
<li><b>Découverte des voisins</b> : paquets Hello.</li>
<li><b>Inondation (flooding)</b> : échange de LSU, chacun copie les nouveautés dans sa base et les propage.</li>
<li><b>Calcul des routes</b> : arbre du plus court chemin (Dijkstra) → table de routage.</li>
<li><b>Maintenance</b> : nouveau calcul seulement quand la topologie change.</li>
</ol>` },
    { h: "Les types de routeurs OSPF", html: `
<ul>
<li><b>IR</b> (Internal Router) : dans une zone non-backbone, entretient la base d'états de liens.</li>
<li><b>BR</b> (Backbone Router) : tout routeur de la zone 0.</li>
<li><b>ABR</b> (Area Border Router) : relie au moins 2 zones <b>dont la zone 0</b>. Agrège une zone en une seule route → mises à jour plus petites.</li>
<li><b>ASBR</b> (Autonomous System Border Router) : passerelle vers d'autres systèmes autonomes (AS), redistribue les routes extérieures.</li>
</ul>` },
    { h: "Élection du DR (à savoir pour lire show ip ospf neighbor)", html: `
<p>Sur un segment Ethernet, le DR est le routeur de plus haute <b>priorité</b> (1 par défaut), puis de plus haut <b>Router ID</b>. Le Router ID est, par défaut, l'adresse IP la plus haute du routeur (loopback en priorité). Sur une liaison série point à point, il n'y a <b>pas</b> de DR : l'état affiché est <code>FULL/ -</code>.</p>` }
  ],
  groups: []
}
];

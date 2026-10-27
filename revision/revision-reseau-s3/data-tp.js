/* ====== Commandes LDAP simulées (ajoutées au shell) ====== */
SHELL_CMDS.push(
  { id: "ldapwhoami", re: /^(sudo )?ldapwhoami\b/, run: (s, m, n) => {
      const o = ldapOpts(n), base = s.sc.base, admin = "cn=admin," + base;
      if (!o.flags.has("-x")) return { out: "SASL/SCRAM-SHA-1 authentication started\nldap_sasl_interactive_bind: No such attribute (16)", error: true, hint: "Ajoute -x (authentification simple)." };
      if (!o.vals["-D"]) return { out: "anonymous" };
      if (o.vals["-D"] !== admin) return { out: "ldap_bind: Invalid credentials (49)", error: true, hint: "Le DN de l'admin ici est " + admin };
      if (!o.flags.has("-W") && !o.vals["-w"]) return { out: "ldap_bind: Inappropriate authentication (48)", error: true, hint: "Il faut un mot de passe : -W (demandé) ou -w <mdp>." };
      return { out: (o.flags.has("-W") ? "Enter LDAP Password: ********\n" : "") + "dn:" + admin };
    } },
  { id: "ldapadd", re: /^(sudo )?ldapadd\b/, run: (s, m, n) => {
      const o = ldapOpts(n), admin = "cn=admin," + s.sc.base;
      if (!o.flags.has("-x")) return { out: "SASL/SCRAM-SHA-1 authentication started\nldap_sasl_interactive_bind: No such attribute (16)", error: true, hint: "Ajoute -x." };
      if (o.vals["-D"] !== admin) return { out: "ldap_bind: Invalid credentials (49)", error: true, hint: "Connecte-toi en admin : -D " + admin };
      if (!o.flags.has("-W") && !o.vals["-w"]) return { out: "ldap_bind: Inappropriate authentication (48)", error: true, hint: "Ajoute -W pour saisir le mot de passe." };
      if (!o.vals["-f"]) return { out: "(la commande attend le LDIF au clavier… Ctrl+C)", error: true, hint: "Indique le fichier avec -f fichier.ldif" };
      if (s.ldapAdded) return { out: "Enter LDAP Password: ********\nadding new entry \"" + s.sc.ldifEntries[0] + "\"\nldap_add: Already exists (68)", error: true };
      s.ldapAdded = true;
      return { out: (o.flags.has("-W") ? "Enter LDAP Password: ********\n" : "") + s.sc.ldifEntries.map((e) => `adding new entry "${e}"`).join("\n\n") };
    } },
  { id: "ldapsearch", re: /^(sudo )?ldapsearch\b/, run: (s, m, n) => {
      const o = ldapOpts(n), base = s.sc.base;
      const local = o.vals["-Y"] === "external" && /^ldapi:/.test(o.vals["-H"] || "");
      if (local && !/^sudo /.test(n)) return { out: "ldap_sasl_interactive_bind: Can't contact LDAP server (-1)", error: true, hint: "L'accès local -Y EXTERNAL doit se faire en root : ajoute sudo." };
      if (!local && !o.flags.has("-x")) return { out: "SASL/SCRAM-SHA-1 authentication started\nldap_sasl_interactive_bind: No such attribute (16)", error: true, hint: "Ajoute -x, ou utilise l'accès local : sudo ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b " + base };
      if ((o.vals["-b"] || "") !== base) return { out: "# search result\nsearch: 2\nresult: 32 No such object", error: true, hint: "La base de recherche est -b " + base };
      const entries = [s.sc.dit[0]].concat(s.ldapAdded ? s.sc.dit.slice(1) : []);
      return { out: `# extended LDIF\n#\n# LDAPv3\n# base <${base}> with scope subtree\n# filter: (objectclass=*)\n# requesting: ALL\n#\n\n` + entries.join("\n\n") + `\n\n# search result\nsearch: 2\nresult: 0 Success\n\n# numResponses: ${entries.length + 1}\n# numEntries: ${entries.length}` };
    } }
);

/* ====== SCÉNARIOS DU TERMINAL ====== */
const ipOk = (i, ip, mask) => (s) => s.ifaces[i].ip === ip && s.ifaces[i].mask === mask;
const lastIs = (str) => (s) => s.last === str;
const hasNet = (n) => (s) => !!(s.ospf && s.ospf.nets.includes(n));
const G = "gigabitethernet", S = "serial";

const SCENARIOS = [
{
  id: "ip", kind: "ios", title: "Adresser une interface", tag: "Bases",
  intro: "Le routeur sort du carton. Donne l'adresse 10.1.1.1/24 à G0/0, allume-la et sauvegarde.",
  host: "Router", startMode: "user", rid: "10.1.1.1",
  ifaces: { [G + "0/0"]: {}, [G + "0/1"]: {} },
  steps: [
    { g: "Passe en mode privilégié", a: "enable", ok: (s) => s.mode === "priv", x: "Le prompt passe de Router> à Router#." },
    { g: "Entre en configuration globale", a: "configure terminal", ok: (s) => s.mode === "config", x: "Abréviation courante : conf t." },
    { g: "Nomme le routeur R1", a: "hostname R1", id: "hostname", ok: (s) => s.host.toUpperCase() === "R1", x: "Le prompt change tout de suite : R1(config)#." },
    { g: "Va dans l'interface GigabitEthernet0/0", a: "interface g0/0", id: "interface", ok: (s) => s.mode === "if" && s.iface === G + "0/0", x: "Prompt (config-if)# : tout ce que tu tapes s'applique à G0/0." },
    { g: "Donne-lui l'adresse 10.1.1.1 avec un masque /24", a: "ip address 10.1.1.1 255.255.255.0", id: "ipaddr", ok: ipOk(G + "0/0", "10.1.1.1", "255.255.255.0"), x: "/24 = 255.255.255.0. Cisco n'accepte pas la notation /24." },
    { g: "Allume l'interface", a: "no shutdown", ok: (s) => s.ifaces[G + "0/0"].up, x: "Sans no shutdown, l'interface reste « administratively down »." },
    { g: "Sauvegarde la configuration (avec do, ou en revenant au mode privilégié)", a: "do write memory", ok: (s) => s.saved, x: "do wr depuis la config, ou end puis wr. Les deux copient la running-config dans la startup-config." },
    { g: "Vérifie l'état des interfaces", a: "do show ip interface brief", ok: lastIs("show ip interface brief"), x: "G0/0 : 10.1.1.1, up/up. G0/1 : unassigned, administratively down." }
  ]
},
{
  id: "serie", kind: "ios", title: "Liaison série à 2 Mbps", tag: "TP3 bis",
  intro: "R1 est relié à R2 par un câble série dont R1 est le côté DCE. Configure S0/3/0 en 10.4.4.1/30 à 2 Mbps.",
  host: "R1", startMode: "priv", rid: "10.4.4.1",
  ifaces: { [G + "0/0"]: { ip: "10.1.1.3", mask: "255.255.255.0", up: true }, [G + "0/1"]: { ip: "10.3.3.1", mask: "255.255.255.128", up: true }, [S + "0/3/0"]: {} },
  steps: [
    { g: "Entre en configuration globale", a: "configure terminal", ok: (s) => s.mode === "config" },
    { g: "Va dans l'interface série Serial0/3/0", a: "interface s0/3/0", id: "interface", ok: (s) => s.mode === "if" && s.iface === S + "0/3/0", x: "s0/3/0 = Serial0/3/0." },
    { g: "Adresse 10.4.4.1 en /30", a: "ip address 10.4.4.1 255.255.255.252", id: "ipaddr", ok: ipOk(S + "0/3/0", "10.4.4.1", "255.255.255.252"), x: "/30 = 255.255.255.252 : 2 adresses utilisables, parfait pour relier 2 routeurs." },
    { g: "Règle l'horloge à 2 Mbps (côté DCE)", a: "clock rate 2000000", id: "clock", ok: (s) => s.ifaces[S + "0/3/0"].clock === "2000000", x: "2 Mbps = 2 000 000 bits/s. Seul le côté DCE donne l'horloge." },
    { g: "Ajoute une description, par exemple « liaison vers R2 »", a: "description liaison vers R2", ok: (s) => !!s.ifaces[S + "0/3/0"].desc, x: "Simple commentaire, visible dans show running-config." },
    { g: "Allume l'interface", a: "no shutdown", ok: (s) => s.ifaces[S + "0/3/0"].up },
    { g: "Reviens directement au mode privilégié", a: "end", ok: (s) => s.mode === "priv", x: "end (ou Ctrl+Z) depuis n'importe quel sous-mode." },
    { g: "Affiche la configuration active pour vérifier", a: "show running-config", ok: lastIs("show running-config"), x: "On y retrouve description, ip address et clock rate sous interface Serial0/3/0." }
  ]
},
{
  id: "ospf1", kind: "ios", title: "OSPF sur R1", tag: "TP3",
  intro: "Les interfaces de R1 sont déjà configurées (G0/0 10.1.1.3/24, G0/1 10.3.3.1/25, S0/3/0 10.4.4.1/30). Active OSPF, processus 100, zone 0, sur les trois réseaux.",
  host: "R1", startMode: "priv", rid: "10.4.4.1",
  ifaces: { [G + "0/0"]: { ip: "10.1.1.3", mask: "255.255.255.0", up: true }, [G + "0/1"]: { ip: "10.3.3.1", mask: "255.255.255.128", up: true }, [S + "0/3/0"]: { ip: "10.4.4.1", mask: "255.255.255.252", up: true, clock: "2000000" } },
  remote: { needs: ["10.4.4.0 0.0.0.3 area 0"],
    neighbors: [{ id: "10.4.4.2", pri: 0, state: "FULL/  -", addr: "10.4.4.2", iface: S + "0/3/0" }],
    routes: [{ net: "10.2.2.0/24", cost: 65, via: "10.4.4.2", iface: S + "0/3/0" }] },
  steps: [
    { g: "Entre en configuration globale", a: "configure terminal", ok: (s) => s.mode === "config" },
    { g: "Démarre le processus OSPF n°100", a: "router ospf 100", id: "routerospf", ok: (s) => s.mode === "router" && s.ospf && s.ospf.pid === "100", x: "Le prompt devient R1(config-router)#." },
    { g: "Annonce le réseau de G0/0 (10.1.1.0/24) en zone 0", a: "network 10.1.1.0 0.0.0.255 area 0", id: "network", ok: hasNet("10.1.1.0 0.0.0.255 area 0"), x: "Masque inversé de /24 : 0.0.0.255." },
    { g: "Annonce le réseau de G0/1 (10.3.3.0/25) en zone 0", a: "network 10.3.3.0 0.0.0.127 area 0", id: "network", ok: hasNet("10.3.3.0 0.0.0.127 area 0"), x: "/25 → 255.255.255.128 → masque inversé 0.0.0.127." },
    { g: "Annonce la liaison série (10.4.4.0/30) en zone 0", a: "network 10.4.4.0 0.0.0.3 area 0", id: "network", ok: hasNet("10.4.4.0 0.0.0.3 area 0"), x: "C'est ce réseau-là qui relie R1 à R2 : le voisinage se forme (message ADJCHG … FULL)." },
    { g: "Reviens au mode privilégié", a: "end", ok: (s) => s.mode === "priv" },
    { g: "Vérifie le voisinage OSPF", a: "show ip ospf neighbor", ok: lastIs("show ip ospf neighbor"), x: "R2 (Router ID 10.4.4.2) est FULL. « - » : pas de DR sur une liaison série point à point." },
    { g: "Affiche la table de routage", a: "show ip route", ok: lastIs("show ip route"), x: "O 10.2.2.0/24 [110/65] : appris par OSPF, distance 110, coût 64 (série) + 1 (Gigabit) = 65." },
    { g: "Sauvegarde", a: "write memory", ok: (s) => s.saved }
  ]
},
{
  id: "ospf4", kind: "ios", title: "OSPF à 4 réseaux, routeur X", tag: "TP3 bis",
  intro: "Routeur X : G0/0 réseau X 10.20.0.1/16, G0/1 liaison X-Y 10.50.0.1/16, G0/2 liaison X-W 10.60.0.1/16, S0/3/0 liaison X-Z 10.70.0.1/16. Processus OSPF 1, zone 0. (Affectation des interfaces choisie pour l'exercice.)",
  host: "X", startMode: "priv", rid: "10.70.0.1",
  ifaces: { [G + "0/0"]: { ip: "10.20.0.1", mask: "255.255.0.0", up: true }, [G + "0/1"]: { ip: "10.50.0.1", mask: "255.255.0.0", up: true }, [G + "0/2"]: { ip: "10.60.0.1", mask: "255.255.0.0", up: true }, [S + "0/3/0"]: { ip: "10.70.0.1", mask: "255.255.0.0", up: true, clock: "2000000" } },
  remote: { needs: ["10.50.0.0 0.0.255.255 area 0", "10.60.0.0 0.0.255.255 area 0", "10.70.0.0 0.0.255.255 area 0"],
    neighbors: [
      { id: "10.50.0.2", pri: 1, state: "FULL/BDR", addr: "10.50.0.2", iface: G + "0/1", dr: "10.50.0.1", bdr: "10.50.0.2" },
      { id: "10.80.0.1", pri: 1, state: "FULL/DR", addr: "10.60.0.2", iface: G + "0/2", dr: "10.60.0.2", bdr: "10.60.0.1" },
      { id: "10.80.0.2", pri: 0, state: "FULL/  -", addr: "10.70.0.2", iface: S + "0/3/0" }],
    routes: [
      { net: "10.10.0.0/16", cost: 2, via: "10.60.0.2", iface: G + "0/2" },
      { net: "10.30.0.0/16", cost: 2, via: "10.50.0.2", iface: G + "0/1" },
      { net: "10.40.0.0/16", cost: 3, via: "10.60.0.2", iface: G + "0/2" },
      { net: "10.80.0.0/16", cost: 2, via: "10.60.0.2", iface: G + "0/2" }] },
  steps: [
    { g: "Entre en configuration globale", a: "configure terminal", ok: (s) => s.mode === "config" },
    { g: "Démarre le processus OSPF 1", a: "router ospf 1", id: "routerospf", ok: (s) => s.mode === "router" && s.ospf && s.ospf.pid === "1" },
    { g: "Annonce le réseau X (10.20.0.0/16)", a: "network 10.20.0.0 0.0.255.255 area 0", id: "network", ok: hasNet("10.20.0.0 0.0.255.255 area 0"), x: "/16 → masque inversé 0.0.255.255." },
    { g: "Annonce la liaison X-Y (10.50.0.0/16)", a: "network 10.50.0.0 0.0.255.255 area 0", id: "network", ok: hasNet("10.50.0.0 0.0.255.255 area 0") },
    { g: "Annonce la liaison X-W (10.60.0.0/16)", a: "network 10.60.0.0 0.0.255.255 area 0", id: "network", ok: hasNet("10.60.0.0 0.0.255.255 area 0") },
    { g: "Annonce la liaison X-Z (10.70.0.0/16)", a: "network 10.70.0.0 0.0.255.255 area 0", id: "network", ok: hasNet("10.70.0.0 0.0.255.255 area 0"), x: "Les trois voisins passent en FULL." },
    { g: "Reviens au mode privilégié", a: "end", ok: (s) => s.mode === "priv" },
    { g: "Affiche les réseaux annoncés et la distance administrative", a: "show ip protocols", ok: lastIs("show ip protocols"), x: "Routing for Networks : les 4 lignes network. Routing Information Sources : les Router ID des voisins, distance 110." },
    { g: "Affiche le détail des voisins (DR, BDR, priorité)", a: "show ip ospf neighbor detail", ok: lastIs("show ip ospf neighbor detail"), x: "Sur G0/1, X est DR (Router ID le plus haut du segment). Sur G0/2, W est DR. Sur la série : pas de DR." },
    { g: "Affiche la table de routage", a: "show ip route", ok: lastIs("show ip route"), x: "Réseau Z (10.40.0.0/16) : via W, coût 3, et pas par la série directe X-Z (coût 64 + 1). OSPF choisit le coût le plus faible, pas le moins de sauts." }
  ]
},
{
  id: "r3", kind: "ios", title: "Ajouter R3 au réseau", tag: "TP3 partie 3",
  intro: "Nouveau routeur R3 (2911) : G0/0 10.5.5.2/30 vers R1 (description « zone 0 »), G0/1 192.168.10.254/24 vers le PC D. Intègre-le au processus OSPF 100, zone 0.",
  host: "Router", startMode: "user", rid: "192.168.10.254",
  ifaces: { [G + "0/0"]: {}, [G + "0/1"]: {}, [G + "0/2"]: {} },
  remote: { needs: ["10.5.5.0 0.0.0.3 area 0"],
    neighbors: [{ id: "10.5.5.1", pri: 1, state: "FULL/BDR", addr: "10.5.5.1", iface: G + "0/0", dr: "10.5.5.2", bdr: "10.5.5.1" }],
    routes: [
      { net: "10.1.1.0/24", cost: 2, via: "10.5.5.1", iface: G + "0/0" },
      { net: "10.2.2.0/24", cost: 66, via: "10.5.5.1", iface: G + "0/0" },
      { net: "10.3.3.0/25", cost: 2, via: "10.5.5.1", iface: G + "0/0" },
      { net: "10.4.4.0/30", cost: 65, via: "10.5.5.1", iface: G + "0/0" }] },
  steps: [
    { g: "Passe en mode privilégié", a: "enable", ok: (s) => s.mode === "priv" },
    { g: "Entre en configuration globale", a: "configure terminal", ok: (s) => s.mode === "config" },
    { g: "Nomme le routeur R3", a: "hostname R3", id: "hostname", ok: (s) => s.host.toUpperCase() === "R3" },
    { g: "Va dans G0/0", a: "interface g0/0", id: "interface", ok: (s) => s.mode === "if" && s.iface === G + "0/0" },
    { g: "Adresse 10.5.5.2 en /30", a: "ip address 10.5.5.2 255.255.255.252", id: "ipaddr", ok: ipOk(G + "0/0", "10.5.5.2", "255.255.255.252"), x: "Le tableau du sujet donne /30 : masque 255.255.255.252." },
    { g: "Description « zone 0 »", a: "description zone 0", ok: (s) => /zone 0/i.test(s.ifaces[G + "0/0"].desc || "") },
    { g: "Allume G0/0", a: "no shutdown", ok: (s) => s.ifaces[G + "0/0"].up },
    { g: "Va dans G0/1", a: "interface g0/1", id: "interface", ok: (s) => s.mode === "if" && s.iface === G + "0/1", x: "Pas besoin de exit : interface fonctionne depuis (config-if)#." },
    { g: "Adresse 192.168.10.254 en /24", a: "ip address 192.168.10.254 255.255.255.0", id: "ipaddr", ok: ipOk(G + "0/1", "192.168.10.254", "255.255.255.0"), x: "C'est la passerelle par défaut du PC D (192.168.10.1)." },
    { g: "Allume G0/1", a: "no shutdown", ok: (s) => s.ifaces[G + "0/1"].up },
    { g: "Démarre OSPF, processus 100", a: "router ospf 100", id: "routerospf", ok: (s) => s.mode === "router" && s.ospf && s.ospf.pid === "100", x: "Même numéro que R1 et R2, comme demandé dans le TP." },
    { g: "Annonce 192.168.10.0/24 en zone 0", a: "network 192.168.10.0 0.0.0.255 area 0", id: "network", ok: hasNet("192.168.10.0 0.0.0.255 area 0") },
    { g: "Annonce la liaison vers R1 (10.5.5.0/30) en zone 0", a: "network 10.5.5.0 0.0.0.3 area 0", id: "network", ok: hasNet("10.5.5.0 0.0.0.3 area 0"), x: "Voisinage avec R1 : FULL." },
    { g: "Sauvegarde sans quitter la configuration", a: "do write memory", ok: (s) => s.saved },
    { g: "Affiche la table de routage sans quitter la configuration", a: "do show ip route", ok: lastIs("show ip route"), x: "R3 a appris tous les réseaux de R1 et R2 (codes O). 10.2.2.0/24 coûte 66 : 1 + 64 (série) + 1." }
  ]
},
{
  id: "tp2", kind: "shell", title: "Routage statique Linux", tag: "TP2",
  intro: "Simulation Docker du TP2. Le terminal change de machine à chaque étape. Le ping fonctionne vraiment : il ne passe que si l'aller ET le retour sont routés.",
  start: "r1",
  machines: {
    pc1: { name: "PC 1", prompt: "pc1:/ #", ifaces: [{ dev: "eth0", ip: "172.16.1.11", net: "172.16.1.0/24" }], routes: [], gw: "172.16.1.1" },
    r1: { name: "Routeur 1", router: true, prompt: "routeur1:/ #", ifaces: [{ dev: "eth0", ip: "172.16.1.254", net: "172.16.1.0/24" }, { dev: "eth1", ip: "172.16.2.254", net: "172.16.2.0/24" }], routes: [], gw: null },
    r2: { name: "Routeur 2", router: true, prompt: "routeur2:/ #", ifaces: [{ dev: "eth0", ip: "172.16.2.128", net: "172.16.2.0/24" }, { dev: "eth1", ip: "172.16.3.254", net: "172.16.3.0/24" }], routes: [], gw: null },
    pc3: { name: "PC 3", prompt: "pc3:/ #", ifaces: [{ dev: "eth0", ip: "172.16.3.3", net: "172.16.3.0/24" }], routes: [], gw: "172.16.3.1" }
  },
  steps: [
    { on: "r1", g: "Affiche la table de routage de Routeur 1", a: "ip route", ok: (s, r) => r.id === "iproute" || r.id === "routen", x: "Seuls ses deux réseaux directement connectés : 172.16.1.0/24 et 172.16.2.0/24." },
    { on: "r1", g: "Ajoute la route vers le réseau de PC 3 et PC 4 (172.16.3.0/24)", a: "ip route add 172.16.3.0/24 via 172.16.2.128", ok: (s) => s.machines.r1.routes.some((x) => x.net === "172.16.3.0/24" && x.via === "172.16.2.128"), x: "Le prochain saut est Routeur 2, sur le réseau commun 172.16.2.0/24." },
    { on: "pc1", g: "Sur PC 1, essaie de pinguer PC 3 (172.16.3.3)", a: "ping 172.16.3.3", ok: (s, r) => r.id === "ping", x: "Échec : la passerelle de PC 1 est 172.16.1.1, une adresse où il n'y a personne." },
    { on: "pc1", g: "Supprime cette passerelle par défaut (172.16.1.1)", a: "route del default gw 172.16.1.1", ok: (s) => s.machines.pc1.gw === null },
    { on: "pc1", g: "Mets Routeur 1 comme passerelle par défaut", a: "route add default gw 172.16.1.254", ok: (s) => s.machines.pc1.gw === "172.16.1.254", x: "La passerelle est toujours une adresse du réseau local du PC." },
    { on: "pc1", g: "Réessaie le ping vers PC 3", a: "ping 172.16.3.3", ok: (s, r) => r.id === "ping", x: "Toujours rien : l'aller arrive, mais Routeur 2 ne connaît pas 172.16.1.0/24 et PC 3 a une mauvaise passerelle. Le retour est perdu." },
    { on: "r2", g: "Sur Routeur 2, ajoute la route retour vers 172.16.1.0/24", a: "ip route add 172.16.1.0/24 via 172.16.2.254", ok: (s) => s.machines.r2.routes.some((x) => x.net === "172.16.1.0/24" && x.via === "172.16.2.254") },
    { on: "pc3", g: "Sur PC 3, supprime la passerelle 172.16.3.1", a: "route del default gw 172.16.3.1", ok: (s) => s.machines.pc3.gw === null },
    { on: "pc3", g: "Mets Routeur 2 comme passerelle de PC 3", a: "route add default gw 172.16.3.254", ok: (s) => s.machines.pc3.gw === "172.16.3.254" },
    { on: "pc1", g: "Depuis PC 1, pingue PC 3", a: "ping 172.16.3.3", ok: (s, r) => r.id === "ping" && s.ping("172.16.3.3").ok, x: "Ça passe : ttl=62, donc 2 routeurs traversés." },
    { on: "pc1", g: "Affiche le chemin jusqu'à PC 3", a: "traceroute 172.16.3.3", ok: (s, r) => r.id === "trace", x: "172.16.1.254 (Routeur 1) puis 172.16.2.128 (Routeur 2), puis PC 3." }
  ]
},
{
  id: "ufw", kind: "shell", title: "Pare-feu ufw sur la VM", tag: "TP5",
  intro: "Tu es connecté en SSH sur la VM Debian avec l'utilisateur iutinfo. Installe et configure ufw sans te couper l'accès.",
  start: "vm",
  machines: { vm: { name: "VM S3-Réseaux", prompt: "iutinfo@s3-reseaux:~$", ifaces: [{ dev: "ens3", ip: "10.31.32.50", net: "10.31.0.0/16" }], routes: [], gw: null } },
  steps: [
    { on: "vm", g: "Installe ufw", a: "sudo apt install ufw", ok: (s, r) => r.id === "apt" && /ufw/.test(s.last), x: "ufw n'est ni installé ni activé par défaut sous Debian." },
    { on: "vm", g: "Affiche l'état du pare-feu", a: "sudo ufw status", ok: (s, r) => r.id === "ufwstatus", x: "État : inactif." },
    { on: "vm", g: "Refuse par défaut tout le trafic entrant", a: "sudo ufw default deny incoming", ok: (s, r) => r.id === "ufwdefault" && s.ufw.inDef === "deny" },
    { on: "vm", g: "Autorise SSH (22 en TCP) pour ne pas perdre la main sur la VM", a: "sudo ufw allow 22/tcp", ok: (s) => s.ufw.rules.some((x) => x.action === "allow" && !x.out && /^22(\/tcp)?$/.test(x.to)), x: "À faire AVANT enable, sinon la session SSH peut être coupée." },
    { on: "vm", g: "Autorise le service http par son nom", a: "sudo ufw allow http", ok: (s) => s.ufw.rules.some((x) => x.action === "allow" && /^80(\/tcp)?$/.test(x.to)), x: "Le nom vient de /etc/services (http = 80/tcp)." },
    { on: "vm", g: "Bloque 192.168.1.50 avec une règle placée en premier", a: "sudo ufw insert 1 deny from 192.168.1.50", ok: (s) => s.ufw.rules[0] && s.ufw.rules[0].action === "deny" && s.ufw.rules[0].from === "192.168.1.50", x: "Les règles sont lues dans l'ordre : la plus spécifique d'abord." },
    { on: "vm", g: "Active le pare-feu", a: "sudo ufw enable", ok: (s) => s.ufw.active },
    { on: "vm", g: "Affiche les règles numérotées pour vérifier l'ordre", a: "sudo ufw status numbered", ok: (s, r) => r.id === "ufwstatus" && /numbered/.test(s.last), x: "[1] est bien le DENY de 192.168.1.50." },
    { on: "vm", g: "Affiche les ports TCP et UDP en écoute, en numérique, avec le processus (ss)", a: "sudo ss -tunlp", ok: (s, r) => r.id === "ss", x: "22 (sshd), 21 (vsftpd), 80 (lighttpd) : les services installés pendant le TP." }
  ]
},
{
  id: "ldap", kind: "shell", title: "OpenLDAP sur la VM", tag: "TP4 · TP6",
  intro: "Sur la VM Debian (pare-feu désactivé), installe OpenLDAP, crée la base dc=iut-info,dc=test et importe le fichier iut-info.ldif.",
  start: "vm", base: "dc=iut-info,dc=test",
  ldifEntries: ["ou=people,dc=iut-info,dc=test", "cn=Jean Dupont,ou=people,dc=iut-info,dc=test"],
  dit: [
    "# iut-info.test\ndn: dc=iut-info,dc=test\nobjectClass: top\nobjectClass: dcObject\nobjectClass: organization\no: iut-info\ndc: iut-info",
    "# people, iut-info.test\ndn: ou=people,dc=iut-info,dc=test\nobjectClass: top\nobjectClass: organizationalUnit\nou: people",
    "# Jean Dupont, people, iut-info.test\ndn: cn=Jean Dupont,ou=people,dc=iut-info,dc=test\nobjectClass: inetOrgPerson\ncn: Jean Dupont\nsn: Dupont\nmail: jean.dupont@iut-info.test"
  ],
  machines: { vm: { name: "VM S3-Réseaux", prompt: "iutinfo@s3-reseaux:~$", ifaces: [{ dev: "ens3", ip: "10.31.32.50", net: "10.31.0.0/16" }], routes: [], gw: null } },
  steps: [
    { on: "vm", g: "Installe le serveur OpenLDAP et les utilitaires clients", a: "sudo apt install slapd ldap-utils", ok: (s, r) => r.id === "apt" && /slapd/.test(s.last) && /ldap-utils/.test(s.last), x: "slapd = le serveur (démon), ldap-utils = ldapsearch, ldapadd, ldapwhoami…" },
    { on: "vm", g: "Reconfigure la base (domaine iut-info.test)", a: "sudo dpkg-reconfigure slapd", ok: (s, r) => r.id === "dpkg", x: "No · iut-info.test · iut-info · mot de passe ×2 · No · Yes." },
    { on: "vm", g: "Redémarre le service", a: "sudo service slapd restart", ok: (s, r) => r.id === "restart" },
    { on: "vm", g: "Vérifie que l'admin peut se connecter (mot de passe demandé)", a: "ldapwhoami -x -D cn=admin,dc=iut-info,dc=test -W", ok: (s, r) => r.id === "ldapwhoami" && r.ok, x: "-x : authentification simple · -D : DN de connexion · -W : mot de passe demandé." },
    { on: "vm", g: "Importe iut-info.ldif en tant qu'admin", a: "ldapadd -x -D cn=admin,dc=iut-info,dc=test -W -f iut-info.ldif", ok: (s, r) => r.id === "ldapadd" && r.ok, x: "-f indique le fichier LDIF." },
    { on: "vm", g: "Affiche tout le DIT pour vérifier l'import", a: "ldapsearch -x -H ldap://localhost -b dc=iut-info,dc=test", ok: (s, r) => r.id === "ldapsearch" && r.ok, x: "Autre façon, en root et en local : sudo ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b dc=iut-info,dc=test" }
  ]
}
];

/* ====== EXERCICES TYPE CONTRÔLE ====== */
const EXERCICES = [
{
  id: "base", title: "Configuration de base d'un routeur", tp: "TP3",
  enonce: `<p>Le routeur <b>R1</b> du TP3 relie le réseau des PC A et B au réseau du PC C. Écris toutes les commandes pour le configurer depuis <code>Router&gt;</code>, puis sauvegarder.</p>`,
  table: [["Interface", "Adresse", "Réseau"], ["G0/0", "10.1.1.3/24", "PC A (10.1.1.1), PC B (10.1.1.2)"], ["G0/1", "10.3.3.1/25", "PC C (10.3.3.3)"]],
  parts: [{ label: "Configuration de R1", kind: "cisco", opt: ["hostname *", "* » description *"],
    sol: `enable
configure terminal
hostname R1
interface g0/0
 ip address 10.1.1.3 255.255.255.0
 no shutdown
interface g0/1
 ip address 10.3.3.1 255.255.255.128
 no shutdown
end
write memory` }],
  questions: [
    ["Quel masque pour /25 ? Combien d'hôtes possibles ?", "255.255.255.128. 2<sup>7</sup> − 2 = 126 hôtes."],
    ["Quelle passerelle par défaut pour le PC C ?", "10.3.3.1, l'adresse de G0/1 sur son réseau."],
    ["Les PC A et C peuvent-ils communiquer sans route statique ni OSPF ? Pourquoi ?", "Oui : les deux réseaux sont directement connectés à R1. Une table de routage est inutile entre réseaux directement connectés au même routeur."]
  ]
},
{
  id: "ospf13", title: "OSPF entre R1 et R2", tp: "TP3",
  enonce: `<p>Topologie du TP3 : R1 et R2 sont reliés par une liaison série <b>10.4.4.0/30</b>, R1 étant le côté DCE (2 Mbps). Configure les interfaces et OSPF (<b>processus 100, zone 0</b>) sur les deux routeurs, puis sauvegarde. Les noms d'interfaces série peuvent différer dans ton .pkt : vérifie avec <code>show ip interface brief</code>.</p>`,
  table: [["Équipement", "Interface", "Adresse"], ["R1", "G0/0", "10.1.1.3/24"], ["R1", "G0/1", "10.3.3.1/25"], ["R1", "S0/3/0", "10.4.4.1/30 (DCE)"], ["R2", "G0/0", "10.2.2.3/24 (serveurs S1, S2)"], ["R2", "S0/3/0", "10.4.4.2/30"]],
  parts: [
    { label: "R1", kind: "cisco", opt: ["hostname *", "* » description *"], sol: `enable
configure terminal
interface g0/0
 ip address 10.1.1.3 255.255.255.0
 no shutdown
interface g0/1
 ip address 10.3.3.1 255.255.255.128
 no shutdown
interface s0/3/0
 ip address 10.4.4.1 255.255.255.252
 clock rate 2000000
 no shutdown
router ospf 100
 network 10.1.1.0 0.0.0.255 area 0
 network 10.3.3.0 0.0.0.127 area 0
 network 10.4.4.0 0.0.0.3 area 0
end
write memory` },
    { label: "R2", kind: "cisco", opt: ["hostname *", "* » description *"], sol: `enable
configure terminal
interface g0/0
 ip address 10.2.2.3 255.255.255.0
 no shutdown
interface s0/3/0
 ip address 10.4.4.2 255.255.255.252
 no shutdown
router ospf 100
 network 10.2.2.0 0.0.0.255 area 0
 network 10.4.4.0 0.0.0.3 area 0
end
write memory` }
  ],
  questions: [
    ["Avant OSPF, pourquoi A et B ne joignent-ils pas S1 et S2 ? Quelles solutions ?", "R1 ne connaît pas 10.2.2.0/24 (pas directement connecté) et R2 ne connaît pas 10.1.1.0/24 : les paquets sont détruits. Solutions : routes statiques sur les deux routeurs, ou routage dynamique (OSPF)."],
    ["Quelles commandes pour vérifier le voisinage entre R1 et R2 ?", "<code>show ip ospf neighbor</code> (et <code>show ip protocols</code>, <code>show ip route</code> pour voir les routes O)."],
    ["Sur R1, que signifie <code>O 10.2.2.0/24 [110/65] via 10.4.4.2</code> ?", "Route apprise par OSPF, distance administrative 110, coût 65 (64 pour la série + 1 pour le Gigabit), prochain saut 10.4.4.2 (R2)."],
    ["Quelles informations s'échangent les routeurs (mode Simulation, filtre OSPF) ?", "Des Hello (Router ID, zone, DR) pour découvrir les voisins, puis DBD, LSR, LSU (contenant des LSA) et LSAck pour synchroniser la base d'états de liens."]
  ]
},
{
  id: "r3", title: "Extension du réseau : R3", tp: "TP3 partie 3",
  enonce: `<p>On ajoute R3, un switch et le PC D. Configure R3 entièrement (avec la description « zone 0 » sur G0/0), puis complète R1. Tout est dans le processus OSPF 100, zone 0. Attention : le tableau donne la liaison R1-R3 en <b>/30</b>.</p>`,
  table: [["Équipement", "Interface", "Adresse"], ["PC D", "Fa0", "192.168.10.1/24"], ["R3", "G0/1", "192.168.10.254/24"], ["R3", "G0/0", "10.5.5.2/30"], ["R1", "G0/2", "10.5.5.1/30"]],
  parts: [
    { label: "R3", kind: "cisco", opt: ["hostname *"], sol: `enable
configure terminal
hostname R3
interface g0/0
 ip address 10.5.5.2 255.255.255.252
 description zone 0
 no shutdown
interface g0/1
 ip address 192.168.10.254 255.255.255.0
 no shutdown
router ospf 100
 network 192.168.10.0 0.0.0.255 area 0
 network 10.5.5.0 0.0.0.3 area 0
end
write memory` },
    { label: "Ajouts sur R1", kind: "cisco", opt: ["* » description *"], sol: `configure terminal
interface g0/2
 ip address 10.5.5.1 255.255.255.252
 no shutdown
router ospf 100
 network 10.5.5.0 0.0.0.3 area 0
end
write memory` }
  ],
  questions: [
    ["Quelle passerelle par défaut sur le PC D ?", "192.168.10.254 (G0/1 de R3)."],
    ["Que contient la table de routage de R3 après convergence ?", "Ses réseaux connectés (C/L) : 10.5.5.0/30 et 192.168.10.0/24 ; et en O : 10.1.1.0/24, 10.3.3.0/25, 10.4.4.0/30, 10.2.2.0/24, tous via 10.5.5.1."],
    ["Sur le segment R1-R3, qui devient DR ?", "À priorité égale, le routeur au Router ID le plus élevé. Le Router ID de R3 est 192.168.10.254 (sa plus haute IP), plus élevé que celui de R1 : R3 est DR, R1 est BDR."]
  ]
},
{
  id: "ospf4", title: "OSPF entre 4 sous-réseaux", tp: "TP3 bis",
  enonce: `<p>Quatre routeurs W, X, Y, Z, chacun avec son réseau privé, tous dans la <b>zone 0 du processus OSPF 1</b>. La liaison X-Z est une liaison série à 2 Mbps (X côté DCE). Affectation des interfaces choisie pour l'exercice :</p>`,
  table: [["Routeur", "Interface", "Réseau", "Adresse"], ["X", "G0/0", "Réseau X 10.20.0.0/16", "10.20.0.1"], ["X", "G0/1", "Liaison X-Y 10.50.0.0/16", "10.50.0.1"], ["X", "G0/2", "Liaison X-W 10.60.0.0/16", "10.60.0.1"], ["X", "S0/3/0", "Liaison X-Z 10.70.0.0/16", "10.70.0.1 (DCE)"], ["W", "G0/0", "Réseau W 10.10.0.0/16", "10.10.0.1"], ["W", "G0/1", "Liaison X-W 10.60.0.0/16", "10.60.0.2"], ["W", "G0/2", "Liaison W-Z 10.80.0.0/16", "10.80.0.1"]],
  parts: [
    { label: "Routeur X", kind: "cisco", opt: ["hostname *", "* » description *"], sol: `enable
configure terminal
interface g0/0
 ip address 10.20.0.1 255.255.0.0
 no shutdown
interface g0/1
 ip address 10.50.0.1 255.255.0.0
 no shutdown
interface g0/2
 ip address 10.60.0.1 255.255.0.0
 no shutdown
interface s0/3/0
 ip address 10.70.0.1 255.255.0.0
 clock rate 2000000
 no shutdown
router ospf 1
 network 10.20.0.0 0.0.255.255 area 0
 network 10.50.0.0 0.0.255.255 area 0
 network 10.60.0.0 0.0.255.255 area 0
 network 10.70.0.0 0.0.255.255 area 0
end
write memory` },
    { label: "Routeur W", kind: "cisco", opt: ["hostname *", "* » description *"], sol: `enable
configure terminal
interface g0/0
 ip address 10.10.0.1 255.255.0.0
 no shutdown
interface g0/1
 ip address 10.60.0.2 255.255.0.0
 no shutdown
interface g0/2
 ip address 10.80.0.1 255.255.0.0
 no shutdown
router ospf 1
 network 10.10.0.0 0.0.255.255 area 0
 network 10.60.0.0 0.0.255.255 area 0
 network 10.80.0.0 0.0.255.255 area 0
end
write memory` }
  ],
  questions: [
    ["Avec cette topologie (W-Z en Gigabit), quel chemin prend un paquet de Y vers Z ? Est-ce judicieux ?", "Y → X → W → Z (coût 1 + 1 + 1 + 1) plutôt que Y → X → Z par la série (coût 64 + …). OSPF choisit le coût le plus faible, calculé d'après la bande passante, même si le chemin a plus de sauts. C'est judicieux : les liens Gigabit sont bien plus rapides que la série."],
    ["Dans <code>show ip protocols</code>, que contiennent <i>Routing for Networks</i> et <i>Routing Information Sources</i> ? Quelle distance administrative ?", "Routing for Networks : les réseaux déclarés avec network (et leur masque inversé, zone). Routing Information Sources : les Router ID des voisins qui envoient des mises à jour. Distance : 110."],
    ["Y a-t-il un DR ? Lequel ?", "Un DR par segment multi-accès (Ethernet) : celui de plus haute priorité, puis de plus haut Router ID. Sur la liaison série point à point : pas de DR. <code>show ip ospf neighbor</code> affiche FULL/DR, FULL/BDR ou FULL/ -."],
    ["Qu'apporte <code>show ip ospf neighbor detail</code> ?", "Pour chaque voisin : adresse d'interface, zone, priorité, état, adresses du DR et du BDR, options, temps avant expiration (dead timer), durée depuis laquelle il est up."]
  ]
},
{
  id: "linux", title: "Routage statique sous Linux", tp: "TP2",
  enonce: `<p>Topologie des TP1/TP2. Au départ, les routeurs ne connaissent que leurs réseaux directement connectés, et les PC ont pour passerelle <code>172.16.x.1</code>, qui n'existe pas. Écris les commandes à taper sur chaque machine pour que tout le monde communique.</p>`,
  table: [["Machine", "Adresses"], ["PC 1 / PC 2", "172.16.1.11 / 172.16.1.12"], ["Routeur 1", "172.16.1.254 et 172.16.2.254"], ["Routeur 2", "172.16.2.128 et 172.16.3.254"], ["PC 3 / PC 4", "172.16.3.3 / 172.16.3.4"]],
  parts: [
    { label: "Routeur 1", kind: "text", exp: ["ip route add 172.16.3.0/24 via 172.16.2.128"] },
    { label: "Routeur 2", kind: "text", exp: ["ip route add 172.16.1.0/24 via 172.16.2.254"] },
    { label: "PC 1", kind: "text", exp: ["route del default gw 172.16.1.1 | ip route del default via 172.16.1.1 | ip route del default", "route add default gw 172.16.1.254 | ip route add default via 172.16.1.254"], order: [[0, 1, "Supprime l'ancienne passerelle avant d'ajouter la nouvelle (sinon : File exists)."]] },
    { label: "PC 3", kind: "text", exp: ["route del default gw 172.16.3.1 | ip route del default via 172.16.3.1 | ip route del default", "route add default gw 172.16.3.254 | ip route add default via 172.16.3.254"], order: [[0, 1, "Supprime l'ancienne passerelle avant d'ajouter la nouvelle."]] }
  ],
  questions: [
    ["Au départ, PC 1 et PC 2 peuvent-ils communiquer ? Et joindre Routeur 2 ?", "PC 1 et PC 2 oui (même réseau, via le switch). Routeur 2 non : il est sur un autre réseau et la passerelle des PC est fausse."],
    ["Après avoir configuré seulement Routeur 1, un ping de PC 1 vers PC 3 marche-t-il ?", "Non. Il faut aussi la passerelle des PC, et le retour : Routeur 2 doit connaître 172.16.1.0/24 et PC 3 doit avoir 172.16.3.254 comme passerelle. TOUTES les machines doivent être configurées."],
    ["Avec quelles commandes vérifier ?", "<code>route -n</code> ou <code>ip route</code> pour les tables, <code>ping</code> et <code>traceroute</code> de part et d'autre du circuit."]
  ]
},
{
  id: "ufw", title: "Règles de pare-feu ufw", tp: "TP5",
  enonce: `<p>Ton serveur est une VM. Ton PC a l'adresse <b>192.168.31.15</b>, les PC des autres binômes sont dans <b>192.168.31.0/24</b>. Écris les commandes ufw pour :</p>
<ol><li>rien ne passe en provenance ou à destination des PC des autres binômes ;</li><li>de ton PC vers le serveur : tout passe ;</li><li>du serveur vers ton PC : rien ne passe sauf les réponses et SSH (tcp 22) ;</li><li>puis autoriser le trafic http depuis et vers le serveur ;</li><li>activer le pare-feu.</li></ol>
<p>Une solution possible est proposée : d'autres écritures équivalentes sont acceptées.</p>`,
  table: null,
  parts: [{ label: "Commandes", kind: "text", exp: [
    "sudo ufw default deny incoming | sudo ufw default deny",
    "sudo ufw default deny outgoing",
    "sudo ufw allow from 192.168.31.15 | sudo ufw allow in from 192.168.31.15 | sudo ufw insert 1 allow from 192.168.31.15",
    "sudo ufw deny from 192.168.31.0/24",
    "sudo ufw allow out to 192.168.31.15 port 22 proto tcp | sudo ufw allow out to 192.168.31.15 port 22",
    "?sudo ufw deny out to 192.168.31.0/24",
    "sudo ufw allow http | sudo ufw allow 80 | sudo ufw allow 80/tcp | sudo ufw allow in http | sudo ufw allow in 80/tcp",
    "sudo ufw allow out http | sudo ufw allow out 80 | sudo ufw allow out 80/tcp",
    "sudo ufw enable"
  ], order: [[2, 3, "La règle « allow from 192.168.31.15 » doit être AVANT « deny from 192.168.31.0/24 » : ufw applique la première règle qui correspond (ou utilise insert 1)."]] }],
  questions: [
    ["Pourquoi n'a-t-on pas besoin d'une règle pour autoriser les réponses du serveur ?", "ufw est un pare-feu à états (stateful) : les paquets d'une connexion déjà établie (ESTABLISHED) sont autorisés automatiquement."],
    ["Comment vérifier l'ordre des règles ?", "<code>sudo ufw status numbered</code>."],
    ["Que verras-tu dans Wireshark pour une connexion FTP ? Et SSH ?", "FTP : le login et le mot de passe en clair. SSH : un échange chiffré, illisible. On privilégie SSH ; FTP et Telnet sont à réserver au réseau privé."],
    ["Comment lister les services ouverts sur le serveur ?", "<code>netstat -ltp</code> (TCP), <code>netstat -lup</code> (UDP), <code>sudo ss -tunlp</code> ou <code>sudo lsof -i -P -n</code>, et <code>/etc/services</code> pour les noms."]
  ]
},
{
  id: "ldif", title: "Fichier LDIF et import LDAP", tp: "TP4",
  enonce: `<p>L'annuaire a pour racine <b>dc=iutinfo,dc=test</b>, administré par <b>cn=admin,dc=iutinfo,dc=test</b>. Écris le fichier <b>compta.ldif</b> qui crée :</p>
<ul><li>l'unité organisationnelle <b>Comptabilité</b> ;</li><li>dedans, la personne <b>Jean Dupont</b> (classe inetOrgPerson) : nom Dupont, prénom Jean, identifiant dupontj, mail jean.dupont@iutinfo.test.</li></ul>
<p>Puis les commandes pour l'importer (mot de passe demandé) et vérifier le DIT en local, en root.</p>`,
  table: null,
  parts: [
    { label: "compta.ldif", kind: "ldif", exp: [
      "dn: ou=Comptabilité,dc=iutinfo,dc=test", "?changetype: add", "objectClass: top", "objectClass: organizationalUnit", "ou: Comptabilité",
      "dn: cn=Jean Dupont,ou=Comptabilité,dc=iutinfo,dc=test", "?changetype: add", "objectClass: top", "objectClass: person", "objectClass: organizationalPerson", "objectClass: inetOrgPerson",
      "cn: Jean Dupont", "sn: Dupont", "givenName: Jean | gn: Jean", "uid: dupontj", "mail: jean.dupont@iutinfo.test"
    ], order: [[0, 5, "L'unité Comptabilité doit être créée avant la personne qu'elle contient."]] },
    { label: "Commandes", kind: "text", exp: [
      "ldapadd -x -D cn=admin,dc=iutinfo,dc=test -W -f compta.ldif | ldapadd -x -W -D cn=admin,dc=iutinfo,dc=test -f compta.ldif | ldapadd -x -D cn=admin,dc=iutinfo,dc=test -f compta.ldif -W",
      "sudo ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b dc=iutinfo,dc=test | ldapsearch -Q -L -Y EXTERNAL -H ldapi:/// -b dc=iutinfo,dc=test"
    ] }
  ],
  questions: [
    ["Quel est le DN de Jean Dupont ? Que représente-t-il ?", "<code>cn=Jean Dupont,ou=Comptabilité,dc=iutinfo,dc=test</code> : son identifiant unique, le chemin de la feuille jusqu'à la racine du DIT."],
    ["Quelles règles de mise en forme du LDIF faut-il respecter ?", "Une ligne « nom: valeur » par attribut, une ligne vide entre deux enregistrements, deux lignes vides à la fin du fichier, une ligne de suite commence par un espace."],
    ["Différence entre -W et -w ?", "-W demande le mot de passe au clavier, -w le donne en clair dans la commande."],
    ["Pourquoi mettre plusieurs objectClass ?", "Chaque classe apporte des attributs obligatoires et optionnels. inetOrgPerson hérite d'organizationalPerson, qui hérite de person, qui hérite de top : mail et uid viennent d'inetOrgPerson, sn et cn de person."]
  ]
}
];

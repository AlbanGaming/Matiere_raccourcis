/* ====== MOTEUR : normalisation des commandes Cisco ====== */
const KW = [
  ["enable", 2], ["end", 3], ["exit", 2], ["disable", 4], ["configure", 4], ["interface", 3],
  ["address", 3], ["hostname", 4], ["write", 2], ["memory", 3], ["copy", 3],
  ["running-config", 3], ["startup-config", 3], ["ospf", 2], ["network", 3], ["area", 2],
  ["description", 4], ["clock", 2], ["rate", 2], ["neighbor", 3], ["detail", 3], ["database", 4],
  ["brief", 2], ["protocols", 4], ["ping", 4], ["traceroute", 4], ["router", 4], ["show", 2], ["shutdown", 4]
];
const IFTYPES = [["gigabitethernet", 1], ["fastethernet", 1], ["serial", 1], ["loopback", 2], ["ethernet", 1]];

function ifName(tok) {
  const m = /^([a-z-]+)\s*(\d+(?:\/\d+)*(?:\.\d+)?)$/i.exec(tok);
  if (!m) return null;
  const t = m[1].toLowerCase();
  for (const [w, min] of IFTYPES) if (t.length >= min && w.startsWith(t)) return w + m[2];
  return null;
}
function kwPrefix(t, word, min) { return t.length >= min && word.startsWith(t); }

function resolveTok(t, prev, pos) {
  const lt = t.toLowerCase();
  if (lt === "do" || lt === "no" || lt === "ip") return lt;
  if (prev === "configure" && kwPrefix(lt, "terminal", 1)) return "terminal";
  if (prev === "ip" && kwPrefix(lt, "route", 2)) return "route";
  if (prev === "ip" && kwPrefix(lt, "interface", 3)) return "interface";
  if (prev === "no" && kwPrefix(lt, "shutdown", 2)) return "shutdown";
  if (prev === "router" && kwPrefix(lt, "ospf", 1)) return "ospf";
  if (prev === "write" && kwPrefix(lt, "memory", 1)) return "memory";
  if (/^\d+\.\d+\.\d+\.\d+$/.test(prev) && kwPrefix(lt, "area", 1)) return "area";
  if (prev === "copy" || prev === "running-config") {
    if (kwPrefix(lt, "running-config", 1)) return "running-config";
    if (kwPrefix(lt, "startup-config", 2)) return "startup-config";
  }
  if (pos === 0) {
    if (kwPrefix(lt, "shutdown", 4)) return "shutdown";
    if (kwPrefix(lt, "show", 2)) return "show";
    if (kwPrefix(lt, "router", 4)) return "router";
  }
  for (const [w, min] of KW) if (lt === w) return w;
  for (const [w, min] of KW) if (kwPrefix(lt, w, min)) return w;
  return t; // valeur (IP, nom…) : on garde la casse
}

/** Transforme une ligne IOS abrégée en forme complète : "int g0/0" → "interface gigabitethernet0/0" */
function canon(line) {
  let s = String(line || "").trim().replace(/\s+/g, " ");
  s = s.replace(/^[\w.-]*(\([\w-]+\))?[#>]\s*/, ""); // retire un prompt collé (R1(config)# …)
  if (!s) return "";
  const toks = s.split(" ");
  const out = [];
  let doPrefix = false;
  for (let i = 0; i < toks.length; i++) {
    const prev = out[out.length - 1] || "";
    let pos = out.length;
    if (pos === 1 && out[0] === "do") pos = 0;
    if (prev === "interface") {
      let tok = toks[i];
      if (/^[a-z-]+$/i.test(tok) && toks[i + 1] && /^\d/.test(toks[i + 1])) { tok += toks[i + 1]; i++; }
      const n = ifName(tok);
      if (n) { out.push(n); continue; }
      if (kwPrefix(tok.toLowerCase(), "brief", 2)) { out.push("brief"); continue; }
    }
    // "description …" : on garde le texte tel quel
    if (prev === "description") { out.push(toks.slice(i).join(" ")); break; }
    out.push(resolveTok(toks[i], prev, pos));
  }
  let c = out.join(" ");
  if (c.startsWith("do ")) { doPrefix = true; c = c.slice(3); }
  if (c === "write" ) c = "write memory";
  if (c === "copy running-config startup-config") c = "write memory";
  c = c.replace(/ area 0\.0\.0\.0$/, " area 0");
  return (doPrefix ? "do " : "") + c;
}
const lc = (s) => s.toLowerCase();

/* ====== Correcteur de configuration Cisco (exercices) ====== */
const GLOBAL_CMD = /^(hostname |interface |router |ip route |write memory$|enable$|configure terminal$)/;
function ciscoStructure(text) {
  const items = [];
  let ctx = "";
  for (const raw of String(text).split(/\r?\n/)) {
    let c = lc(canon(raw.replace(/!.*$/, "")));
    if (!c) continue;
    if (c.startsWith("do ")) c = c.slice(3);
    if (c === "enable" || c === "configure terminal" || c === "disable") { continue; }
    if (c === "exit") { ctx = ctx.startsWith("interface") || ctx.startsWith("router") ? "" : ""; continue; }
    if (c === "end") { ctx = ""; continue; }
    if (/^(show|ping|traceroute|tracert)\b/.test(c)) continue;
    if (c.startsWith("interface ")) { ctx = c; continue; }
    if (c.startsWith("router ")) { ctx = c; items.push(c); continue; }
    if (GLOBAL_CMD.test(c)) { ctx = c.startsWith("write") ? ctx : ""; items.push(c); continue; }
    items.push(ctx ? ctx + " » " + c : c);
  }
  return items;
}
function prettyItem(k) {
  return k.replace(/^interface (\S+) » /, (m, i) => shortIf(i) + " › ").replace(/ » /g, " › ");
}
function shortIf(i) {
  return i.replace(/^gigabitethernet/, "G").replace(/^fastethernet/, "Fa").replace(/^serial/, "S").replace(/^loopback/, "Lo");
}

/* Lignes attendues : "?" en tête = facultative ; "a | b" = variantes ; "*" = n'importe quoi */
function compileExpected(lines, normalizer) {
  return lines.map((l) => {
    let optional = false;
    if (l.startsWith("?")) { optional = true; l = l.slice(1); }
    const variants = l.split(" | ").map((v) => {
      const n = normalizer(v);
      const re = new RegExp("^" + n.split("*").map((x) => x.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".+") + "$");
      return { n, re };
    });
    return { label: l.split(" | ")[0], optional, variants };
  });
}

/** Compare deux multi-ensembles de lignes ; renvoie {ok:[], missing:[], extra:[], orderErr:[]} */
function compareLines(userLines, expected, orderPairs) {
  const used = new Array(userLines.length).fill(false);
  const res = { ok: [], missing: [], extra: [], orderErr: [], pos: {} };
  expected.forEach((e, ei) => {
    let found = -1;
    for (let i = 0; i < userLines.length && found < 0; i++) {
      if (used[i]) continue;
      if (e.variants.some((v) => v.re.test(userLines[i]))) found = i;
    }
    if (found >= 0) { used[found] = true; res.ok.push(e); res.pos[ei] = found; }
    else if (!e.optional) res.missing.push(e);
  });
  userLines.forEach((u, i) => { if (!used[i]) res.extra.push(u); });
  (orderPairs || []).forEach(([a, b, why]) => {
    if (res.pos[a] !== undefined && res.pos[b] !== undefined && res.pos[a] > res.pos[b]) res.orderErr.push(why);
  });
  return res;
}

function normText(s) {
  return String(s).trim()
    .replace(/^(\S+@\S+[:~\w/]*[$#]|\/ #|[$#])\s+/, "")
    .replace(/^sudo\s+/, "")
    .replace(/["']/g, "")
    .replace(/\s+/g, " ")
    .replace(/,\s+/g, ",")
    .toLowerCase();
}
function normLdif(s) {
  return String(s).trim().replace(/\s+/g, " ").replace(/^(\w+)\s*:\s*/, "$1: ").replace(/,\s+/g, ",").toLowerCase();
}

/* ====== Petits utilitaires IP ====== */
function ip2n(ip) { const p = ip.split(".").map(Number); return ((p[0] << 24) >>> 0) + (p[1] << 16) + (p[2] << 8) + p[3]; }
function n2ip(n) { return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join("."); }
function isIP(s) { return /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(s) && s.split(".").every((x) => +x <= 255); }
function maskLen(mask) { let n = ip2n(mask), c = 0; while (n & 0x80000000) { c++; n = (n << 1) >>> 0; } return c; }
function isMask(m) { if (!isIP(m)) return false; const n = ip2n(m); const l = maskLen(m); return l === 32 ? n === 0xffffffff : ((n >>> 0) === ((0xffffffff << (32 - l)) >>> 0)); }
function lenMask(l) { return n2ip(l === 0 ? 0 : (0xffffffff << (32 - l)) >>> 0); }
function wildcard(mask) { return mask.split(".").map((x) => 255 - +x).join("."); }
function netOf(ip, l) { return n2ip(l === 0 ? 0 : (ip2n(ip) & ((0xffffffff << (32 - l)) >>> 0)) >>> 0); }
function inNet(ip, net, l) { return netOf(ip, l) === net; }

/* ====== Simulateur IOS ====== */
const MODE_SUFFIX = { user: ">", priv: "#", config: "(config)#", if: "(config-if)#", router: "(config-router)#" };
const MODE_NAME = { user: "utilisateur (R>)", priv: "privilégié (R#)", config: "configuration globale (R(config)#)", if: "interface (R(config-if)#)", router: "routage (R(config-router)#)" };

function displayIf(i) {
  return i.replace(/^gigabitethernet/, "GigabitEthernet").replace(/^fastethernet/, "FastEthernet").replace(/^serial/, "Serial").replace(/^loopback/, "Loopback");
}

class IOS {
  constructor(sc) {
    this.sc = sc;
    this.host = sc.host || "Router";
    this.mode = sc.startMode || "user";
    this.ifaces = {};
    for (const [k, v] of Object.entries(sc.ifaces)) this.ifaces[k] = Object.assign({ ip: null, mask: null, up: false, desc: null, clock: null }, v);
    this.iface = null;
    this.ospf = sc.ospf ? JSON.parse(JSON.stringify(sc.ospf)) : null; // {pid, nets:[]}
    this.saved = false;
    this.last = "";
  }
  prompt() { return this.host + MODE_SUFFIX[this.mode]; }
  cfgMode() { return this.mode === "config" || this.mode === "if" || this.mode === "router"; }

  /** renvoie {out, ok, id} */
  exec(line) {
    const raw = line.trim();
    if (!raw) return { out: "", ok: true, id: "" };
    if (raw === "?" ) return { out: this.help(), ok: true, id: "help" };
    let c = canon(raw);
    let lcC = lc(c);
    let viaDo = false;
    if (lcC.startsWith("do ")) {
      if (!this.cfgMode()) return this.err(raw, "« do » ne sert que dans un mode de configuration. Ici, tape directement la commande.");
      viaDo = true; c = c.slice(3); lcC = lcC.slice(3);
    }
    const effMode = viaDo ? "priv" : this.mode;
    for (const cmd of IOS_CMDS) {
      const m = cmd.re.exec(viaDo ? lcC : (cmd.keepCase ? c : lcC));
      if (!m) continue;
      if (!cmd.modes.includes(effMode)) {
        // IOS : les commandes globales tapées dans un sous-mode remontent en (config)
        if ((this.mode === "if" || this.mode === "router") && cmd.modes.includes("config") && !viaDo) {
          this.mode = "config";
          const r = cmd.run(this, m, raw);
          this.last = lcC; return Object.assign({ ok: true, id: cmd.id }, r);
        }
        return this.err(raw, "Cette commande se tape en mode " + cmd.modes.map((x) => MODE_NAME[x]).join(" ou ") + ".");
      }
      const r = cmd.run(this, m, raw) || {};
      this.last = lcC;
      return Object.assign({ ok: !r.error, id: cmd.id }, r);
    }
    return this.err(raw, null);
  }
  err(raw, hint) {
    return { out: "% Invalid input detected at '^' marker.", hint, ok: false, id: "" };
  }
  help() {
    const list = IOS_CMDS.filter((c) => c.modes.includes(this.mode) && c.help).map((c) => "  " + c.help.padEnd(38) + c.desc);
    return "Commandes utiles dans ce mode :\n" + list.join("\n");
  }
  connected() {
    const r = [];
    for (const [n, i] of Object.entries(this.ifaces)) if (i.ip && i.up) r.push({ n, net: netOf(i.ip, maskLen(i.mask)), len: maskLen(i.mask), ip: i.ip });
    return r;
  }
  ospfReady() {
    if (!this.ospf || !this.sc.remote) return false;
    const need = this.sc.remote.needs || [];
    return need.every((n) => this.ospf.nets.includes(n));
  }
  showRoute() {
    let s = "Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP\n       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area\n\nGateway of last resort is not set\n\n";
    const lines = [];
    for (const c of this.connected()) {
      lines.push({ k: ip2n(c.net), t: `C    ${c.net}/${c.len} is directly connected, ${displayIf(c.n)}` });
      lines.push({ k: ip2n(c.ip) + 0.5, t: `L    ${c.ip}/32 is directly connected, ${displayIf(c.n)}` });
    }
    if (this.ospfReady()) for (const r of this.sc.remote.routes) lines.push({ k: ip2n(r.net.split("/")[0]), t: `O    ${r.net} [110/${r.cost}] via ${r.via}, 00:00:${String(10 + (r.cost % 40)).padStart(2, "0")}, ${displayIf(r.iface)}` });
    lines.sort((a, b) => a.k - b.k);
    return s + (lines.length ? lines.map((l) => l.t).join("\n") : "(aucune route : aucune interface configurée et active)");
  }
  showBrief() {
    let s = "Interface              IP-Address      OK? Method Status                Protocol\n";
    for (const [n, i] of Object.entries(this.ifaces)) {
      const st = i.up ? "up" : "administratively down";
      const pr = i.up ? "up" : "down";
      s += displayIf(n).padEnd(23) + (i.ip || "unassigned").padEnd(16) + "YES " + (i.ip ? "manual " : "unset  ") + st.padEnd(22) + pr + "\n";
    }
    return s.trimEnd();
  }
  showRun() {
    let s = "Building configuration...\n\nCurrent configuration : 1024 bytes\n!\nversion 15.1\n!\nhostname " + this.host + "\n!\n";
    for (const [n, i] of Object.entries(this.ifaces)) {
      s += "interface " + displayIf(n) + "\n";
      if (i.desc) s += " description " + i.desc + "\n";
      s += i.ip ? ` ip address ${i.ip} ${i.mask}\n` : " no ip address\n";
      if (i.clock) s += " clock rate " + i.clock + "\n";
      if (!i.up) s += " shutdown\n";
      s += "!\n";
    }
    if (this.ospf && this.ospf.pid) {
      s += "router ospf " + this.ospf.pid + "\n";
      for (const n of this.ospf.nets) s += " network " + n + "\n";
      s += "!\n";
    }
    return s + "end";
  }
  showNeighbors(detail) {
    if (!this.ospfReady()) return this.ospf && this.ospf.pid ? "(aucun voisin pour l'instant : les réseaux qui mènent aux voisins ne sont pas tous annoncés)" : "% OSPF: Router process not enabled";
    if (detail) {
      return this.sc.remote.neighbors.map((n) => ` Neighbor ${n.id}, interface address ${n.addr}\n    In the area 0 via interface ${displayIf(n.iface)}\n    Neighbor priority is ${n.pri}, State is FULL, 6 state changes\n    DR is ${n.dr || "0.0.0.0"} BDR is ${n.bdr || "0.0.0.0"}\n    Options is 0x00\n    Dead timer due in 00:00:35\n    Neighbor is up for 00:02:14`).join("\n");
    }
    let s = "Neighbor ID     Pri   State           Dead Time   Address         Interface\n";
    for (const n of this.sc.remote.neighbors) s += n.id.padEnd(16) + String(n.pri).padStart(3) + "   " + n.state.padEnd(16) + "00:00:3" + (n.pri + 3) + "    " + n.addr.padEnd(16) + displayIf(n.iface) + "\n";
    return s.trimEnd();
  }
  showProtocols() {
    if (!this.ospf || !this.ospf.pid) return "(aucun protocole de routage actif)";
    let s = `Routing Protocol is "ospf ${this.ospf.pid}"\n  Outgoing update filter list for all interfaces is not set\n  Incoming update filter list for all interfaces is not set\n  Router ID ${this.sc.rid}\n  Number of areas in this router is 1. 1 normal 0 stub 0 nssa\n  Maximum path: 4\n  Routing for Networks:\n`;
    for (const n of this.ospf.nets) s += "    " + n.replace(" area ", " area ") + "\n";
    s += "  Routing Information Sources:\n    Gateway         Distance      Last Update\n";
    if (this.ospfReady()) for (const n of this.sc.remote.neighbors) s += "    " + n.id.padEnd(16) + "110".padEnd(14) + "00:01:12\n";
    s += "  Distance: (default is 110)";
    return s;
  }
}

const IP = "(\\d+\\.\\d+\\.\\d+\\.\\d+)";
const IOS_CMDS = [
  { id: "enable", re: /^enable$/, modes: ["user", "priv"], help: "enable", desc: "passer en mode privilégié", run: (s) => { s.mode = "priv"; } },
  { id: "disable", re: /^disable$/, modes: ["priv"], run: (s) => { s.mode = "user"; } },
  { id: "conft", re: /^configure terminal$/, modes: ["priv"], help: "configure terminal", desc: "configuration globale", run: (s) => { s.mode = "config"; return { out: "Enter configuration commands, one per line.  End with CNTL/Z." }; } },
  { id: "hostname", re: /^hostname (\S+)$/, keepCase: true, modes: ["config"], help: "hostname <nom>", desc: "nommer le routeur", run: (s, m) => { s.host = m[1]; } },
  { id: "interface", re: /^interface (\S+)$/, modes: ["config"], help: "interface <g0/0>", desc: "configurer une interface", run: (s, m) => {
      if (!ifName(m[1]) && !/^(gigabitethernet|fastethernet|serial|loopback|ethernet)/.test(m[1])) return { out: "% Invalid input detected at '^' marker.", error: true };
      if (!s.ifaces[m[1]]) return { out: "%Invalid interface type and number", error: true, hint: "Interfaces de ce routeur : " + Object.keys(s.ifaces).map(shortIf).join(", ") };
      s.iface = m[1]; s.mode = "if";
    } },
  { id: "ipaddr", re: new RegExp("^ip address " + IP + " " + IP + "$"), modes: ["if"], help: "ip address <IP> <masque>", desc: "adresse de l'interface", run: (s, m) => {
      if (!isIP(m[1]) || !isMask(m[2])) return { out: "% Inconsistent address and mask", error: true };
      const i = s.ifaces[s.iface]; i.ip = m[1]; i.mask = m[2];
    } },
  { id: "ipaddrcidr", re: /^ip address \S+\/\d+$/, modes: ["if"], run: () => ({ out: "% Invalid input detected at '^' marker.", error: true, hint: "Sur Cisco, le masque s'écrit en décimal : ip address 10.1.1.1 255.255.255.0" }) },
  { id: "noshut", re: /^no shutdown$/, modes: ["if"], help: "no shutdown", desc: "allumer l'interface", run: (s) => {
      const i = s.ifaces[s.iface]; const was = i.up; i.up = true;
      if (was) return {};
      const n = displayIf(s.iface);
      return { out: `%LINK-5-CHANGED: Interface ${n}, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface ${n}, changed state to up` };
    } },
  { id: "shut", re: /^shutdown$/, modes: ["if"], help: "shutdown", desc: "éteindre l'interface", run: (s) => { s.ifaces[s.iface].up = false; return { out: `%LINK-5-CHANGED: Interface ${displayIf(s.iface)}, changed state to administratively down` }; } },
  { id: "desc", re: /^description (.+)$/, keepCase: true, modes: ["if"], help: "description <texte>", desc: "commentaire", run: (s, m) => { s.ifaces[s.iface].desc = m[1]; } },
  { id: "clock", re: /^clock rate (\d+)$/, modes: ["if"], help: "clock rate 2000000", desc: "horloge série (côté DCE)", run: (s, m) => {
      if (!s.iface.startsWith("serial")) return { out: "% Invalid input detected at '^' marker.", error: true, hint: "clock rate ne s'applique qu'à une interface série." };
      s.ifaces[s.iface].clock = m[1];
    } },
  { id: "routerospf", re: /^router ospf (\d+)$/, modes: ["config"], help: "router ospf <n°>", desc: "démarrer OSPF", run: (s, m) => {
      if (!s.ospf) s.ospf = { pid: null, nets: [] };
      if (s.ospf.pid && s.ospf.pid !== m[1]) s.ospf = { pid: m[1], nets: [] };
      s.ospf.pid = m[1]; s.mode = "router";
    } },
  { id: "network", re: new RegExp("^network " + IP + " " + IP + " area (\\d+)$"), modes: ["router"], help: "network <réseau> <masque inv.> area 0", desc: "annoncer un réseau", run: (s, m) => {
      if (!isIP(m[1]) || !isIP(m[2])) return { out: "% Invalid input detected at '^' marker.", error: true };
      if (isMask(m[2]) && m[2] !== "0.0.0.0") { s.ospf.nets.push(`${m[1]} ${m[2]} area ${m[3]}`); return { out: "", hint: "Attention : " + m[2] + " est un masque normal. OSPF attend le masque INVERSÉ (" + wildcard(m[2]) + ").", warn: true }; }
      const k = `${m[1]} ${m[2]} area ${m[3]}`;
      if (!s.ospf.nets.includes(k)) s.ospf.nets.push(k);
      if (s.ospfReady() && !s._adj) { s._adj = true; return { out: s.sc.remote.neighbors.map((n) => `%OSPF-5-ADJCHG: Process ${s.ospf.pid}, Nbr ${n.id} on ${displayIf(n.iface)} from LOADING to FULL, Loading Done`).join("\n") }; }
    } },
  { id: "networkcidr", re: /^network \S+\/\d+/, modes: ["router"], run: () => ({ out: "% Invalid input detected at '^' marker.", error: true, hint: "Syntaxe : network <adresse réseau> <masque inversé> area <n°>" }) },
  { id: "networknoarea", re: new RegExp("^network " + IP + " " + IP + "$"), modes: ["router"], run: () => ({ out: "% Incomplete command.", error: true, hint: "Il manque la zone : … area 0" }) },
  { id: "exit", re: /^exit$/, modes: ["user", "priv", "config", "if", "router"], help: "exit", desc: "remonter d'un niveau", run: (s) => {
      if (s.mode === "if" || s.mode === "router") s.mode = "config";
      else if (s.mode === "config") s.mode = "priv";
      else { s.mode = "user"; return { out: "\n" + s.host + " con0 is now available\n\nPress RETURN to get started." }; }
    } },
  { id: "end", re: /^end$/, modes: ["config", "if", "router"], help: "end", desc: "retour direct au mode privilégié", run: (s) => { s.mode = "priv"; return { out: "%SYS-5-CONFIG_I: Configured from console by console" }; } },
  { id: "wr", re: /^write memory$/, modes: ["priv"], help: "write memory", desc: "sauvegarder", run: (s) => { s.saved = true; return { out: "Building configuration...\n[OK]" }; } },
  { id: "shbrief", re: /^show ip interface brief$/, modes: ["priv"], help: "show ip interface brief", desc: "résumé des interfaces", run: (s) => ({ out: s.showBrief() }) },
  { id: "shrun", re: /^show running-config$/, modes: ["priv"], help: "show running-config", desc: "configuration active", run: (s) => ({ out: s.showRun() }) },
  { id: "shstart", re: /^show startup-config$/, modes: ["priv"], run: (s) => ({ out: s.saved ? s.showRun().replace("Current configuration", "Using 1024 out of 262136 bytes") : "startup-config is not present" }) },
  { id: "shroute", re: /^show ip route$/, modes: ["priv", "user"], help: "show ip route", desc: "table de routage", run: (s) => ({ out: s.showRoute() }) },
  { id: "shnei", re: /^show ip ospf neighbor$/, modes: ["priv", "user"], help: "show ip ospf neighbor", desc: "voisins OSPF", run: (s) => ({ out: s.showNeighbors(false) }) },
  { id: "shneid", re: /^show ip ospf neighbor detail$/, modes: ["priv"], run: (s) => ({ out: s.showNeighbors(true) }) },
  { id: "shprot", re: /^show ip protocols$/, modes: ["priv"], help: "show ip protocols", desc: "protocoles de routage", run: (s) => ({ out: s.showProtocols() }) },
  { id: "shospf", re: /^show ip ospf$/, modes: ["priv"], run: (s) => ({ out: s.ospf && s.ospf.pid ? ` Routing Process "ospf ${s.ospf.pid}" with ID ${s.sc.rid}\n Supports only single TOS(TOS0) routes\n SPF schedule delay 5 secs, Hold time between two SPFs 10 secs\n Number of areas in this router is 1. 1 normal 0 stub 0 nssa\n    Area BACKBONE(0)\n        Number of interfaces in this area is ${s.ospf.nets.length}` : "% OSPF: Router process not enabled" }) },
  { id: "shospfif", re: /^show ip ospf interface brief$/, modes: ["priv"], run: (s) => {
      if (!s.ospf || !s.ospf.pid) return { out: "% OSPF: Router process not enabled" };
      let o = "Interface    PID   Area            IP Address/Mask    Cost  State Nbrs F/C\n";
      for (const c of s.connected()) {
        const inOspf = s.ospf.nets.some((n) => { const [a, w] = n.split(" "); const l = 32 - maskLen(wildcard(w)) ; return inNet(c.ip, netOf(a, maskLen(wildcard(w))), maskLen(wildcard(w))); });
        if (!inOspf) continue;
        const ser = c.n.startsWith("serial");
        const nb = s.ospfReady() ? s.sc.remote.neighbors.find((x) => x.iface === c.n) : null;
        const role = ser ? "P2P" : nb ? (/\/DR/.test(nb.state) ? "BDR" : "DR") : "DR";
        o += shortIf(c.n).padEnd(13) + String(s.ospf.pid).padEnd(6) + "0".padEnd(16) + (c.ip + "/" + c.len).padEnd(19) + (ser ? "64" : "1").padEnd(6) + role.padEnd(6) + (nb ? "1/1" : "0/0") + "\n";
      }
      return { out: o.trimEnd() };
    } },
  { id: "shospfdb", re: /^show ip ospf database$/, modes: ["priv"], run: (s) => ({ out: s.ospf && s.ospf.pid ? `            OSPF Router with ID (${s.sc.rid}) (Process ID ${s.ospf.pid})\n\n                Router Link States (Area 0)\n\nLink ID         ADV Router      Age         Seq#       Checksum Link count\n${s.sc.rid.padEnd(16)}${s.sc.rid.padEnd(16)}52          0x80000004 0x00a1b2 ${s.connected().length}` + (s.ospfReady() ? "\n" + s.sc.remote.neighbors.map((n) => n.id.padEnd(16) + n.id.padEnd(16) + "48          0x80000003 0x004c2d 2").join("\n") : "") : "% OSPF: Router process not enabled" }) },
  { id: "ping", re: new RegExp("^ping " + IP + "$"), modes: ["priv", "user"], help: "ping <IP>", desc: "tester la connectivité", run: (s, m) => {
      const ok = s.reach(m[1]);
      return { out: `Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to ${m[1]}, timeout is 2 seconds:\n` + (ok ? "!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms" : ".....\nSuccess rate is 0 percent (0/5)") };
    } },
  { id: "trace", re: new RegExp("^traceroute " + IP + "$"), modes: ["priv", "user"], run: (s, m) => ({ out: `Type escape sequence to abort.\nTracing the route to ${m[1]}\n\n  1   ${s.reach(m[1]) ? m[1] + "     1 msec    0 msec    1 msec" : "*       *       *"}` }) },
  { id: "tracert", re: /^tracert /, modes: ["priv", "user", "config", "if", "router"], run: () => ({ out: "% Invalid input detected at '^' marker.", error: true, hint: "Sur un routeur Cisco c'est traceroute. tracert, c'est sur le PC." }) },
  { id: "conft2", re: /^configure$/, modes: ["priv"], run: () => ({ out: "Configuring from terminal, memory, or network [terminal]?", hint: "Tape directement configure terminal (conf t).", error: true }) }
];
IOS.prototype.reach = function (ip) {
  for (const c of this.connected()) if (inNet(ip, c.net, c.len)) return true;
  if (this.ospfReady()) for (const r of this.sc.remote.routes) { const [n, l] = r.net.split("/"); if (inNet(ip, n, +l)) return true; }
  return false;
};

/* ====== Simulateur Linux (routage TP2, ufw TP5, LDAP TP4/6) ====== */
class Shell {
  constructor(sc) {
    this.sc = sc;
    this.machines = JSON.parse(JSON.stringify(sc.machines || {}));
    this.cur = sc.start || Object.keys(this.machines)[0];
    this.ufw = { active: false, inDef: "deny", outDef: "allow", rules: [] };
    this.last = "";
  }
  prompt() { const m = this.machines[this.cur]; return m ? m.prompt : "$"; }
  m() { return this.machines[this.cur]; }
  exec(line) {
    const raw = line.trim();
    if (!raw) return { out: "", ok: true };
    const n = raw.replace(/\s+/g, " ");
    this.last = normText(n);
    for (const h of SHELL_CMDS) {
      const m = h.re.exec(n);
      if (m) { const r = h.run(this, m, n) || {}; return Object.assign({ ok: !r.error, id: h.id }, r); }
    }
    const word = n.split(" ")[0];
    return { out: `${word}: commande inconnue ou non simulée ici`, ok: false, hint: "Tape « indice » si tu bloques." };
  }
  /* --- routage --- */
  routeFor(mach, ip) {
    const M = this.machines[mach];
    for (const i of M.ifaces) { const [net, l] = i.net.split("/"); if (inNet(ip, net, +l)) return { dev: i.dev, direct: true }; }
    let best = null;
    for (const r of M.routes) { const [net, l] = r.net.split("/"); if (inNet(ip, net, +l) && (!best || +l > best.l)) best = { via: r.via, l: +l }; }
    if (best) return best;
    if (M.gw) return { via: M.gw };
    return null;
  }
  ownerOf(ip) { for (const [k, M] of Object.entries(this.machines)) if (M.ifaces.some((i) => i.ip === ip)) return k; return null; }
  path(from, ip) {
    let cur = from; const hops = [];
    for (let k = 0; k < 8; k++) {
      const M = this.machines[cur];
      if (M.ifaces.some((i) => i.ip === ip)) return { ok: true, hops };
      const r = this.routeFor(cur, ip);
      if (!r) return { ok: false, hops, why: "Network is unreachable" };
      const nextIp = r.direct ? ip : r.via;
      const owner = this.ownerOf(nextIp);
      if (!owner) return { ok: false, hops, why: "pas de réponse de " + nextIp };
      if (!r.direct) hops.push(nextIp);
      if (r.direct) return { ok: true, hops };
      if (!this.machines[owner].router) return { ok: false, hops, why: nextIp + " ne route pas" };
      cur = owner;
    }
    return { ok: false, hops, why: "boucle" };
  }
  srcIp(mach, dst) {
    const M = this.machines[mach];
    const r = this.routeFor(mach, dst);
    if (r && r.direct) return M.ifaces.find((i) => i.dev === r.dev).ip;
    if (r) for (const i of M.ifaces) { const [net, l] = i.net.split("/"); if (inNet(r.via, net, +l)) return i.ip; }
    return M.ifaces[0].ip;
  }
  ping(dst) {
    const there = this.path(this.cur, dst);
    if (!there.ok) return { ok: false, there };
    const src = this.srcIp(this.cur, dst);
    const back = this.path(this.ownerOf(dst), src);
    return { ok: back.ok, there, back };
  }
  showIpRoute() {
    const M = this.m(); let s = "";
    if (M.gw) s += `default via ${M.gw} dev ${this.devFor(M.gw)}\n`;
    for (const i of M.ifaces) s += `${i.net} dev ${i.dev} proto kernel scope link src ${i.ip}\n`;
    for (const r of M.routes) s += `${r.net} via ${r.via} dev ${this.devFor(r.via)}\n`;
    return s.trimEnd() || "(table vide)";
  }
  devFor(ip) { for (const i of this.m().ifaces) { const [net, l] = i.net.split("/"); if (inNet(ip, net, +l)) return i.dev; } return "eth0"; }
  showRouteN() {
    const M = this.m();
    let s = "Kernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n";
    if (M.gw) s += "0.0.0.0".padEnd(16) + M.gw.padEnd(16) + "0.0.0.0".padEnd(16) + "UG    0      0        0 " + this.devFor(M.gw) + "\n";
    for (const i of M.ifaces) { const [net, l] = i.net.split("/"); s += net.padEnd(16) + "0.0.0.0".padEnd(16) + lenMask(+l).padEnd(16) + "U     0      0        0 " + i.dev + "\n"; }
    for (const r of M.routes) { const [net, l] = r.net.split("/"); s += net.padEnd(16) + r.via.padEnd(16) + lenMask(+l).padEnd(16) + "UG    0      0        0 " + this.devFor(r.via) + "\n"; }
    return s.trimEnd();
  }
  /* --- ufw --- */
  ufwStatus(kind) {
    const u = this.ufw;
    if (!u.active) return "État : inactif";
    let s = "État : actif\n";
    if (kind === "verbose") s += `Journalisation : on (low)\nPar défaut : ${u.inDef} (incoming), ${u.outDef} (outgoing), disabled (routed)\nNouveaux profils : skip\n`;
    s += "\n" + (kind === "numbered" ? "     " : "") + "Vers                       Action      De\n" + (kind === "numbered" ? "     " : "") + "----                       ------      --\n";
    u.rules.forEach((r, i) => {
      s += (kind === "numbered" ? ("[" + String(i + 1).padStart(2) + "] ") : "") + r.to.padEnd(27) + (r.action.toUpperCase() + (r.out ? " OUT" : " IN")).padEnd(12) + r.from + "\n";
    });
    return s.trimEnd();
  }
}

function ufwParse(spec) {
  // spec : "80", "http", "23/tcp", "from IP", "from IP to any port 22 proto tcp", "to IP port 22 proto tcp"
  const svc = { http: "80/tcp", https: "443/tcp", ssh: "22/tcp", ftp: "21/tcp", telnet: "23/tcp", dns: "53" };
  let to = "Anywhere", from = "Anywhere";
  const t = spec.trim();
  let m;
  if ((m = /^(\d+(?:\/(?:tcp|udp))?)$/.exec(t))) to = m[1];
  else if (svc[t]) to = svc[t];
  else if ((m = /^(?:from (\S+))?\s*(?:to (\S+))?\s*(?:port (\d+))?\s*(?:proto (tcp|udp))?$/.exec(t)) && t) {
    if (m[1]) from = m[1] === "any" ? "Anywhere" : m[1];
    let dst = m[2] && m[2] !== "any" ? m[2] + " " : "";
    if (m[3]) to = dst + m[3] + (m[4] ? "/" + m[4] : ""); else if (dst) to = dst.trim();
  } else return null;
  return { to, from };
}

const SHELL_CMDS = [
  { id: "indice", re: /^(indice|hint|aide)$/, run: () => ({ out: "", hintReq: true }) },
  { id: "clear", re: /^clear$/, run: () => ({ clear: true }) },
  { id: "iproute", re: /^(sudo )?ip r(oute)?( show)?$/, run: (s) => ({ out: s.showIpRoute() }) },
  { id: "routen", re: /^(sudo )?route -n$/, run: (s) => ({ out: s.showRouteN() }) },
  { id: "ipaddr", re: /^(sudo )?ip a(ddr)?( show)?$/, run: (s) => ({ out: s.m().ifaces.map((i, k) => `${k + 2}: ${i.dev}@if${k + 10}: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet ${i.ip}/${i.net.split("/")[1]} scope global ${i.dev}`).join("\n") }) },
  { id: "routeadd", re: /^(sudo )?ip route add (\d+\.\d+\.\d+\.\d+\/\d+) via (\d+\.\d+\.\d+\.\d+)$/, run: (s, m) => {
      const M = s.m();
      const [n, l] = m[2].split("/");
      if (netOf(n, +l) !== n) return { out: "Error: Invalid prefix for given prefix length.", error: true, hint: "Donne l'adresse du RÉSEAU (ex. 172.16.3.0/24), pas celle d'une machine." };
      if (!M.ifaces.some((i) => { const [a, b] = i.net.split("/"); return inNet(m[3], a, +b); })) return { out: "Error: Nexthop has invalid gateway.", error: true, hint: "La passerelle doit être sur un réseau directement connecté à cette machine." };
      if (M.routes.some((r) => r.net === m[2])) return { out: "RTNETLINK answers: File exists", error: true };
      M.routes.push({ net: m[2], via: m[3] });
    } },
  { id: "routeadddefip", re: /^(sudo )?ip route add default via (\d+\.\d+\.\d+\.\d+)$/, run: (s, m) => { const M = s.m(); if (M.gw) return { out: "RTNETLINK answers: File exists", error: true, hint: "Il y a déjà une passerelle par défaut : supprime-la d'abord." }; M.gw = m[2]; } },
  { id: "routedeldef", re: /^(sudo )?(route del default gw|ip route del default via) (\d+\.\d+\.\d+\.\d+)$/, run: (s, m) => { const M = s.m(); if (M.gw !== m[3]) return { out: "SIOCDELRT: No such process", error: true }; M.gw = null; } },
  { id: "routeadddef", re: /^(sudo )?route add default gw (\d+\.\d+\.\d+\.\d+)$/, run: (s, m) => { const M = s.m(); if (M.gw) return { out: "SIOCADDRT: File exists", error: true, hint: "Il y a déjà une passerelle par défaut : supprime-la d'abord (route del default gw …)." }; M.gw = m[2]; } },
  { id: "ping", re: /^ping (?:-c \d+ )?(\d+\.\d+\.\d+\.\d+)$/, run: (s, m) => {
      const r = s.ping(m[1]);
      if (!r.there.ok && r.there.why === "Network is unreachable") return { out: `PING ${m[1]} (${m[1]}): 56 data bytes\nping: sendto: Network is unreachable` };
      if (!r.ok) return { out: `PING ${m[1]} (${m[1]}): 56 data bytes\n^C\n--- ${m[1]} ping statistics ---\n4 packets transmitted, 0 packets received, 100% packet loss`, explain: !r.there.ok ? "L'aller ne passe pas (" + r.there.why + ")." : "L'aller passe, mais pas le retour : la machine d'en face n'a pas de route vers toi." };
      const ttl = 64 - r.there.hops.length;
      return { out: `PING ${m[1]} (${m[1]}): 56 data bytes\n` + [0, 1, 2, 3].map((k) => `64 bytes from ${m[1]}: seq=${k} ttl=${ttl} time=0.${150 + k * 7} ms`).join("\n") + `\n--- ${m[1]} ping statistics ---\n4 packets transmitted, 4 packets received, 0% packet loss` };
    } },
  { id: "trace", re: /^traceroute (\d+\.\d+\.\d+\.\d+)$/, run: (s, m) => {
      const r = s.path(s.cur, m[1]);
      let o = `traceroute to ${m[1]} (${m[1]}), 30 hops max, 46 byte packets\n`;
      let k = 1;
      for (const h of r.hops) o += ` ${k++}  ${h} (${h})  0.0${k}2 ms\n`;
      o += r.ok ? ` ${k}  ${m[1]} (${m[1]})  0.0${k}9 ms` : ` ${k}  *  *  *`;
      return { out: o };
    } },
  // ufw
  { id: "ufwnosudo", re: /^ufw( .*)?$/, run: (s) => ({ out: "ERROR: You need to be root to run this script", error: true, hint: "Il faut sudo devant ufw." }) },
  { id: "ufwstatus", re: /^sudo ufw status( verbose| numbered)?$/, run: (s, m) => ({ out: s.ufwStatus((m[1] || "").trim()) }) },
  { id: "ufwenable", re: /^sudo ufw enable$/, run: (s) => { s.ufw.active = true; return { out: "Le pare-feu est actif et lancé au démarrage du système" }; } },
  { id: "ufwdisable", re: /^sudo ufw disable$/, run: (s) => { s.ufw.active = false; return { out: "Le pare-feu est arrêté et désactivé lors du démarrage du système" }; } },
  { id: "ufwdefault", re: /^sudo ufw default (allow|deny|reject)( incoming| outgoing)?$/, run: (s, m) => {
      const dir = (m[2] || " incoming").trim();
      if (dir === "incoming") s.ufw.inDef = m[1]; else s.ufw.outDef = m[1];
      return { out: `Politique par défaut ${dir === "incoming" ? "entrante" : "sortante"} changée à « ${m[1]} »\n(assurez-vous de mettre à jour vos règles en conséquence)` };
    } },
  { id: "ufwdelete", re: /^sudo ufw delete (\d+)$/, run: (s, m) => { const i = +m[1] - 1; if (!s.ufw.rules[i]) return { out: "ERROR: Could not find rule '" + m[1] + "'", error: true }; s.ufw.rules.splice(i, 1); return { out: "Règle supprimée" }; } },
  { id: "ufwrule", re: /^sudo ufw (insert (\d+) )?(allow|deny|reject)( out| in)? (.+)$/, run: (s, m) => {
      const p = ufwParse(m[5]);
      if (!p) return { out: "ERROR: Wrong number of arguments", error: true };
      const r = { action: m[3], out: (m[4] || "").trim() === "out", to: p.to, from: p.from };
      if (m[1]) { const pos = +m[2] - 1; if (pos > s.ufw.rules.length) return { out: "ERROR: Invalid position '" + m[2] + "'", error: true }; s.ufw.rules.splice(pos, 0, r); return { out: "Règle insérée" }; }
      s.ufw.rules.push(r);
      return { out: "Règle ajoutée" };
    } },
  // apt / services
  { id: "apt", re: /^sudo apt(-get)? install (.+)$/, run: (s, m) => ({ out: `Lecture des listes de paquets... Fait\nConstruction de l'arbre des dépendances... Fait\nLes NOUVEAUX paquets suivants seront installés :\n  ${m[2]}\nParamétrage de ${m[2].split(" ")[0]} ... Fait` }) },
  { id: "aptnosudo", re: /^apt(-get)? install/, run: () => ({ out: "E: Impossible d'ouvrir le fichier verrou /var/lib/dpkg/lock-frontend - open (13: Permission non accordée)\nE: Êtes-vous root ?", error: true, hint: "Il faut sudo (ou être root)." }) },
  { id: "ss", re: /^sudo ss -[tunlp]{5}$/, run: () => ({ out: "Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process\nudp   UNCONN 0      0            0.0.0.0:68         0.0.0.0:*     users:((\"dhclient\",pid=412,fd=7))\ntcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*     users:((\"sshd\",pid=530,fd=3))\ntcp   LISTEN 0      32                 *:21               *:*     users:((\"vsftpd\",pid=611,fd=3))\ntcp   LISTEN 0      1024         0.0.0.0:80         0.0.0.0:*     users:((\"lighttpd\",pid=640,fd=4))" }) },
  { id: "netstat", re: /^(sudo )?netstat -ltp$/, run: () => ({ out: "Connexions Internet actives (seulement serveurs)\nProto Recv-Q Send-Q Adresse locale   Adresse distante  Etat     PID/Program name\ntcp        0      0 0.0.0.0:ssh      0.0.0.0:*         LISTEN   530/sshd\ntcp        0      0 0.0.0.0:http     0.0.0.0:*         LISTEN   640/lighttpd\ntcp6       0      0 [::]:ftp         [::]:*            LISTEN   611/vsftpd" }) },
  { id: "lsof", re: /^sudo lsof -i -P -n$/, run: () => ({ out: "COMMAND   PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd      530     root    3u  IPv4  13021      0t0  TCP *:22 (LISTEN)\nvsftpd    611     root    3u  IPv6  13544      0t0  TCP *:21 (LISTEN)\nlighttpd  640 www-data    4u  IPv4  13600      0t0  TCP *:80 (LISTEN)" }) },
  // LDAP
  { id: "dpkg", re: /^sudo dpkg-reconfigure slapd$/, run: () => ({ out: "┌──────────── Configuration de slapd ────────────┐\n Omettre la configuration du serveur OpenLDAP ? <No>\n Nom de domaine : iut-info.test   → dc=iut-info,dc=test\n Nom d'entité (« organization ») : iut-info\n Mot de passe de l'administrateur : ******* (x2)\n Faut-il supprimer la base lors de la purge du paquet ? <No>\n Faut-il déplacer l'ancienne base de données ? <Yes>\n└────────────────────────────────────────────────┘\nBacking up /etc/ldap/slapd.d in /var/backups/slapd-2.5.13... done." }) },
  { id: "dpkgnosudo", re: /^dpkg-reconfigure slapd$/, run: () => ({ out: "/usr/sbin/dpkg-reconfigure: slapd is broken or not fully installed (vous devez être root)", error: true, hint: "Il faut sudo." }) },
  { id: "restart", re: /^(sudo )?(service slapd restart|systemctl restart slapd)$/, run: () => ({ out: "" }) }
];

/* Analyse les options d'une commande ldap* : renvoie {cmd, flags:Set, vals:{}} */
function ldapOpts(line) {
  const s = String(line).trim().replace(/^(\S+@\S+[$#]|\/ #|[$#])\s+/, "").replace(/^sudo\s+/, "").replace(/\s+/g, " ");
  const toks = s.match(/"[^"]*"|'[^']*'|\S+/g) || [];
  const r = { cmd: (toks[0] || "").toLowerCase(), flags: new Set(), vals: {} };
  const withVal = ["-D", "-w", "-f", "-H", "-b", "-Y"];
  for (let i = 1; i < toks.length; i++) {
    const t = toks[i];
    if (withVal.includes(t)) { r.vals[t] = (toks[i + 1] || "").replace(/["']/g, "").replace(/,\s*/g, ",").toLowerCase(); i++; }
    else if (/^-[A-Za-z]$/.test(t)) r.flags.add(t);
  }
  return r;
}

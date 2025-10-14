import React, { useEffect, useRef, useState } from "react"

const DIFFICULTIES = ["peaceful", "easy", "normal", "hard"]
const GAME_MODES = ["survival", "creative", "adventure", "spectator"]

const SETTINGS = [
  { key: "autosave", type: "boolean" },
  { key: "difficulty", type: "enum", options: DIFFICULTIES },
  { key: "enforce_allowlist", type: "boolean" },
  { key: "use_allowlist", type: "boolean" },
  { key: "max_players", type: "integer", min: 1, max: 500 },
  { key: "pause_when_empty_seconds", type: "integer", min: 0, max: 86400 },
  { key: "player_idle_timeout", type: "integer", min: 0, max: 86400 },
  { key: "allow_flight", type: "boolean" },
  { key: "motd", type: "string" },
  { key: "spawn_protection_radius", type: "integer", min: 0, max: 64 },
  { key: "force_game_mode", type: "boolean" },
  { key: "game_mode", type: "enum", options: GAME_MODES },
  { key: "view_distance", type: "integer", min: 2, max: 32 },
  { key: "simulation_distance", type: "integer", min: 2, max: 32 },
  { key: "accept_transfers", type: "boolean" },
  { key: "status_heartbeat_interval", type: "integer", min: 1, max: 3600 },
  { key: "operator_user_permission_level", type: "integer", min: 1, max: 4 },
  { key: "hide_online_players", type: "boolean" },
  { key: "status_replies", type: "boolean" },
  { key: "entity_broadcast_range", type: "integer", min: 0, max: 200 }
]

function OneLine(obj) { try { return JSON.stringify(obj); } catch { return String(obj); } }
function splitList(input) {
  return (input || "")
    .split(/[,
]+/)
    .map(s => s.trim())
    .filter(Boolean)
}

export default function MinecraftJsonRpcClient() {
  const [url, setUrl] = useState("")
  const [token, setToken] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const wsRef = useRef(null)
  const [consoleLines, setConsoleLines] = useState([])
  const [idCounter, setIdCounter] = useState(1)
  const [autoScroll, setAutoScroll] = useState(true)
  const consoleEndRef = useRef(null)

  // persist url/token for convenience
  useEffect(() => {
    const u = localStorage.getItem("mc_rpc_url"); if (u) setUrl(u)
    const t = localStorage.getItem("mc_rpc_token"); if (t) setToken(t)
  }, [])
  useEffect(() => { if (url) localStorage.setItem("mc_rpc_url", url) }, [url])
  useEffect(() => { if (token) localStorage.setItem("mc_rpc_token", token) }, [token])

  const nextId = () => { const n = idCounter + 1; setIdCounter(n); return idCounter }

  useEffect(() => { if (autoScroll && consoleEndRef.current) consoleEndRef.current.scrollIntoView({ behavior: "smooth" }) }, [consoleLines, autoScroll])

  const log = (prefix, payload) => {
    const ts = new Date().toISOString()
    setConsoleLines(lines => [...lines, `${ts} ${prefix} ${OneLine(payload)}`])
  }

  const connect = () => {
    if (!url) return
    try {
      const protos = []
      if (token?.trim()) protos.push("minecraft-v1", token.trim())
      const ws = protos.length ? new WebSocket(url, protos) : new WebSocket(url)
      wsRef.current = ws
      ws.onopen = () => { setIsOpen(true); log("[open]", { url, protocols: protos, origin: window.location.origin }) }
      ws.onmessage = ev => {
        let data = ev.data; try { data = JSON.parse(ev.data) } catch {}
        const isNotif = typeof data === 'object' && data?.method && String(data.method).startsWith('minecraft:notification/')
        log(isNotif ? "[notif]" : "[recv]", data)
      }
      ws.onclose = ev => { setIsOpen(false); log("[close]", { code: ev.code, reason: ev.reason, wasClean: ev.wasClean }) }
      ws.onerror = ev => { log("[error]", { message: "WebSocket error", ev: String(ev), origin: window.location.origin }) }
    } catch (e) {
      log("[error]", { message: String(e) })
    }
  }

  const disconnect = () => { try { wsRef.current?.close() } catch {} wsRef.current = null; setIsOpen(false) }

  const sendRpc = (method, params) => {
    const msg = { jsonrpc: "2.0", id: nextId(), method, params }
    const wire = JSON.stringify(msg)
    log("[send]", msg)
    wsRef.current?.send(wire)
  }

  // -------- Operators --------
  const [opName, setOpName] = useState("")
  const [opLevel, setOpLevel] = useState(4)
  const [opBypass, setOpBypass] = useState(true)
  const addOp = () => {
    if (!opName) return
    sendRpc("minecraft:operators/add", [[{ player: { name: opName }, permissionLevel: Number(opLevel), bypassesPlayerLimit: !!opBypass }]])
  }
  const removeOp = () => { if (opName) sendRpc("minecraft:operators/remove", [[{ name: opName }]]) }
  const listOps = () => sendRpc("minecraft:operators", [])

  // -------- Allowlist --------
  const [allowlistNames, setAllowlistNames] = useState("")
  const listAllowlist = () => sendRpc("minecraft:allowlist", [])
  const clearAllowlist = () => sendRpc("minecraft:allowlist/clear", [])
  const addAllowlist = () => {
    const arr = splitList(allowlistNames).map(name => ({ name })); if (!arr.length) return
    sendRpc("minecraft:allowlist/add", [arr])
  }
  const removeAllowlist = () => {
    const arr = splitList(allowlistNames).map(name => ({ name })); if (!arr.length) return
    sendRpc("minecraft:allowlist/remove", [arr])
  }
  const setAllowlist = () => {
    const arr = splitList(allowlistNames).map(name => ({ name }))
    sendRpc("minecraft:allowlist/set", [arr])
  }

  // -------- Player Bans --------
  const [banNames, setBanNames] = useState("")
  const [banReason, setBanReason] = useState("")
  const [banExpires, setBanExpires] = useState("")
  const [banSource, setBanSource] = useState("Admin")
  const listBans = () => sendRpc("minecraft:bans", [])
  const clearBans = () => sendRpc("minecraft:bans/clear", [])
  const addBans = () => {
    const players = splitList(banNames); if (!players.length) return
    const payload = players.map(name => ({ player: { name }, reason: banReason, expires: banExpires, source: banSource }))
    sendRpc("minecraft:bans/add", [payload])
  }
  const removeBans = () => {
    const players = splitList(banNames).map(name => ({ name })); if (!players.length) return
    sendRpc("minecraft:bans/remove", [players])
  }
  const setBans = () => {
    const players = splitList(banNames).map(name => ({ player: { name }, reason: banReason, expires: banExpires, source: banSource }))
    sendRpc("minecraft:bans/set", [players])
  }

  // -------- IP Bans --------
  const [ipList, setIpList] = useState("")
  const [ipReason, setIpReason] = useState("")
  const [ipExpires, setIpExpires] = useState("")
  const [ipSource, setIpSource] = useState("Admin")
  const [ipPlayer, setIpPlayer] = useState("")
  const listIpBans = () => sendRpc("minecraft:ip_bans", [])
  const clearIpBans = () => sendRpc("minecraft:ip_bans/clear", [])
  const addIpBans = () => {
    const ips = splitList(ipList); if (!ips.length) return
    const payload = ips.map(ip => ({ ip, reason: ipReason, expires: ipExpires, source: ipSource, ...(ipPlayer ? { player: { name: ipPlayer } } : {}) }))
    sendRpc("minecraft:ip_bans/add", [payload])
  }
  const removeIpBans = () => {
    const ips = splitList(ipList); if (!ips.length) return
    sendRpc("minecraft:ip_bans/remove", [ips])
  }
  const setIpBans = () => {
    const ips = splitList(ipList)
    const payload = ips.map(ip => ({ ip, reason: ipReason, expires: ipExpires, source: ipSource }))
    sendRpc("minecraft:ip_bans/set", [payload])
  }

  // -------- Players (list & kick with 1.1.0 shape) --------
  const listPlayers = () => sendRpc("minecraft:players", [])
  const [kickNames, setKickNames] = useState("")
  const [kickText, setKickText] = useState("")
  const kickPlayers = () => {
    const names = splitList(kickNames); if (!names.length) return
    const payload = names.map(name => ({ player: { name }, ...(kickText ? { message: { literal: kickText } } : {}) }))
    sendRpc("minecraft:players/kick", [payload])
  }

  // -------- System Message --------
  const [sysMsg, setSysMsg] = useState("")
  const [sysOverlay, setSysOverlay] = useState(false)
  const [sysTargets, setSysTargets] = useState("") // optional targeted players
  const sendSystemMessage = () => {
    const players = splitList(sysTargets).map(name => ({ name }))
    const body = { message: { literal: sysMsg || "" }, overlay: !!sysOverlay, ...(players.length ? { receivingPlayers: players } : {}) }
    sendRpc("minecraft:server/system_message", [body])
  }

  // -------- Server --------
  const status = () => sendRpc("minecraft:server/status", [])
  const save = () => sendRpc("minecraft:server/save", [true])
  const stop = () => sendRpc("minecraft:server/stop", [])
  const discover = () => sendRpc("rpc.discover", [])

  // -------- Server Settings --------
  const [settingsState, setSettingsState] = useState({})
  const SettingControl = ({ def }) => {
    const k = def.key
    const val = settingsState[k] ?? (def.type === "boolean" ? false : def.type === "enum" ? def.options?.[0] : "")
    const onChange = (v) => setSettingsState(s => ({ ...s, [k]: v }))
    const get = () => sendRpc(`minecraft:serversettings/${k}`, [])
    const set = () => {
      let v = val
      if (def.type === "integer") v = Math.max(def.min ?? Number.MIN_SAFE_INTEGER, Math.min(def.max ?? Number.MAX_SAFE_INTEGER, Number(val)))
      if (def.type === "boolean") v = Boolean(val)
      if (def.type === "enum" || def.type === "string") v = val
      sendRpc(`minecraft:serversettings/${k}/set`, [v])
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center p-3 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="font-semibold md:col-span-1">{k}</div>
        <div className="md:col-span-2">
          {def.type === "boolean" && (
            <select className="w-full rounded-xl border px-3 py-2" value={val ? "true" : "false"} onChange={(e)=>onChange(e.target.value === "true")}>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          )}
          {def.type === "enum" && (
            <select className="w-full rounded-xl border px-3 py-2" value={val} onChange={(e)=>onChange(e.target.value)}>
              {def.options.map(o=> <option key={o} value={o}>{o}</option>)}
            </select>
          )}
          {def.type === "integer" && (
            <input type="number" min={def.min} max={def.max} className="w-full rounded-xl border px-3 py-2" value={val ?? ""} onChange={(e)=>onChange(e.target.value)} placeholder={`${def.min ?? 0} - ${def.max ?? ""}`} />
          )}
          {def.type === "string" && (
            <input type="text" className="w-full rounded-xl border px-3 py-2" value={val ?? ""} onChange={(e)=>onChange(e.target.value)} placeholder="enter value" />
          )}
        </div>
        <div className="md:col-span-2 flex gap-2 justify-end">
          <button onClick={get} className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200">Get</button>
          <button onClick={set} className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90">Set</button>
        </div>
      </div>
    )
  }

  // -------- Raw Sender --------
  const [raw, setRaw] = useState(`{
  "method": "minecraft:server/status",
  "params": []
}`)
  const sendRaw = () => {
    try {
      const parsed = JSON.parse(raw)
      const msg = { jsonrpc: "2.0", id: nextId(), ...parsed }
      log("[send]", msg); wsRef.current?.send(JSON.stringify(msg))
    } catch (e) { log("[error]", { message: "Invalid JSON in Raw sender", error: String(e) }) }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Minecraft JSON-RPC WebSocket Client (v1.1.0)</h1>

      {/* Connection Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center p-4 rounded-2xl bg-white border shadow-sm">
        <input className="md:col-span-2 rounded-xl border px-3 py-2" placeholder="ws(s)://host:port" value={url} onChange={(e)=>setUrl(e.target.value)} />
        <input className="md:col-span-2 rounded-xl border px-3 py-2" placeholder="Auth token (Sec-WebSocket-Protocol)" value={token} onChange={(e)=>setToken(e.target.value)} />
        <div className="md:col-span-1 flex gap-2 justify-end flex-wrap">
          {!isOpen ? (
            <button className="px-4 py-2 rounded-xl bg-green-600 text-white" onClick={connect}>Connect</button>
          ) : (
            <button className="px-4 py-2 rounded-xl bg-red-600 text-white" onClick={disconnect}>Disconnect</button>
          )}
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white" onClick={discover}>Discover</button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={status}>Status</button>
          <button className="px-4 py-2 rounded-xl bg-gray-900 text-white" onClick={save}>Save</button>
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={stop}>Stop</button>
        </div>
      </div>

      {/* Operators Panel */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Operators</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl bg-gray-100" onClick={listOps}>List</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="rounded-xl border px-3 py-2" placeholder="Player name" value={opName} onChange={(e)=>setOpName(e.target.value)} />
          <select className="rounded-xl border px-3 py-2" value={opLevel} onChange={(e)=>setOpLevel(Number(e.target.value))}>
            {[1,2,3,4].map(n=> <option key={n} value={n}>{n}</option>)}
          </select>
          <select className="rounded-xl border px-3 py-2" value={opBypass?"true":"false"} onChange={(e)=>setOpBypass(e.target.value === "true") }>
            <option value="true">bypass limit</option>
            <option value="false">no bypass</option>
          </select>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={addOp}>Add OP</button>
            <button className="px-4 py-2 rounded-xl bg-red-600 text-white" onClick={removeOp}>Remove OP</button>
          </div>
        </div>
      </div>

      {/* Allowlist Panel */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Allowlist</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl bg-gray-100" onClick={listAllowlist}>List</button>
            <button className="px-3 py-2 rounded-xl bg-yellow-100" onClick={clearAllowlist}>Clear</button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Enter one or more player names (comma or newline separated)</p>
        <textarea className="w-full rounded-xl border px-3 py-2 font-mono h-28" value={allowlistNames} onChange={(e)=>setAllowlistNames(e.target.value)} />
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded-xl bg-gray-100" onClick={removeAllowlist}>Remove</button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={addAllowlist}>Add</button>
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={setAllowlist}>Set (Replace)</button>
        </div>
      </div>

      {/* Player Bans Panel */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Player Bans</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl bg-gray-100" onClick={listBans}>List</button>
            <button className="px-3 py-2 rounded-xl bg-yellow-100" onClick={clearBans}>Clear</button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Names (comma/newline), plus reason / expires (ISO string) / source</p>
        <textarea className="w-full rounded-xl border px-3 py-2 font-mono h-24" placeholder="Player1, Player2" value={banNames} onChange={(e)=>setBanNames(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="rounded-xl border px-3 py-2" placeholder="Reason (optional)" value={banReason} onChange={(e)=>setBanReason(e.target.value)} />
          <input className="rounded-xl border px-3 py-2" placeholder="Expires (e.g. 2025-12-31T23:59:59Z)" value={banExpires} onChange={(e)=>setBanExpires(e.target.value)} />
          <input className="rounded-xl border px-3 py-2" placeholder="Source" value={banSource} onChange={(e)=>setBanSource(e.target.value)} />
        </div>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded-xl bg-gray-100" onClick={removeBans}>Remove</button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={addBans}>Add</button>
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={setBans}>Set (Replace)</button>
        </div>
      </div>

      {/* IP Bans Panel */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">IP Bans</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl bg-gray-100" onClick={listIpBans}>List</button>
            <button className="px-3 py-2 rounded-xl bg-yellow-100" onClick={clearIpBans}>Clear</button>
          </div>
        </div>
        <p className="text-sm text-gray-600">IPs (comma/newline). Optional: player, reason, expires, source</p>
        <textarea className="w-full rounded-xl border px-3 py-2 font-mono h-24" placeholder="192.168.1.2, 203.0.113.4" value={ipList} onChange={(e)=>setIpList(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="rounded-xl border px-3 py-2" placeholder="Player (optional)" value={ipPlayer} onChange={(e)=>setIpPlayer(e.target.value)} />
          <input className="rounded-xl border px-3 py-2" placeholder="Reason (optional)" value={ipReason} onChange={(e)=>setIpReason(e.target.value)} />
          <input className="rounded-xl border px-3 py-2" placeholder="Expires (ISO)" value={ipExpires} onChange={(e)=>setIpExpires(e.target.value)} />
          <input className="rounded-xl border px-3 py-2" placeholder="Source" value={ipSource} onChange={(e)=>setIpSource(e.target.value)} />
        </div>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded-xl bg-gray-100" onClick={removeIpBans}>Remove</button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={addIpBans}>Add</button>
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={setIpBans}>Set (Replace)</button>
        </div>
      </div>

      {/* Players Panel */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Players</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl bg-gray-100" onClick={listPlayers}>List</button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Kick players (comma/newline separated). Optional message shown on disconnect.</p>
        <textarea className="w-full rounded-xl border px-3 py-2 font-mono h-20" placeholder="Player1, Player2" value={kickNames} onChange={(e)=>setKickNames(e.target.value)} />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Kick message (optional)" value={kickText} onChange={(e)=>setKickText(e.target.value)} />
        <div className="flex justify-end">
          <button className="px-4 py-2 rounded-xl bg-red-600 text-white" onClick={kickPlayers}>Kick</button>
        </div>
      </div>

      {/* System Message Panel */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">System Message</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl bg-gray-100" onClick={()=>setSysMsg("Server restart in 5 minutes!")}>Load Example</button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Broadcast or target specific players. Enable Overlay to show as a title overlay.</p>
        <textarea className="w-full rounded-xl border px-3 py-2 font-mono h-20" placeholder="Message text" value={sysMsg} onChange={(e)=>setSysMsg(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <textarea className="rounded-xl border px-3 py-2 font-mono h-20" placeholder="Target players (optional)" value={sysTargets} onChange={(e)=>setSysTargets(e.target.value)} />
          <label className="flex items-center gap-2 rounded-xl border px-3 py-2">
            <input type="checkbox" checked={sysOverlay} onChange={(e)=>setSysOverlay(e.target.checked)} /> Overlay
          </label>
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={sendSystemMessage}>Send</button>
        </div>
      </div>

      {/* Server Settings Panel */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <h2 className="text-lg font-semibold">Server Settings</h2>
        <div className="space-y-3">
          {SETTINGS.map(def => <SettingControl key={def.key} def={def} />)}
        </div>
      </div>

      {/* Raw Sender */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Raw RPC</h2>
          <button className="px-3 py-2 rounded-xl bg-gray-100" onClick={()=>setRaw(JSON.stringify({ method: "minecraft:server/status", params: [] }, null, 2))}>Load Status</button>
        </div>
        <textarea className="w-full rounded-xl border px-3 py-2 font-mono h-40" value={raw} onChange={(e)=>setRaw(e.target.value)} />
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600"><input type="checkbox" className="mr-2" checked={autoScroll} onChange={(e)=>setAutoScroll(e.target.checked)} /> Auto-scroll console</label>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={sendRaw}>Send Raw</button>
            <button className="px-4 py-2 rounded-xl bg-gray-100" onClick={()=>setConsoleLines([])}>Clear Console</button>
          </div>
        </div>
      </div>

      {/* Console */}
      <div className="p-4 rounded-2xl bg-white border shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Console</h2>
        <div className="h-64 overflow-auto bg-gray-50 rounded-xl p-3 font-mono text-sm">
          {consoleLines.map((line, i) => <div key={i} className="whitespace-pre-wrap leading-6">{line}</div>)}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  )
}

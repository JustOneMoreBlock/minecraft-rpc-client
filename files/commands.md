# Minecraft Server JSON‑RPC Commands (v1.1.0)

> Formatted like your original `minecraft_jsonrpc_commands.md`, but updated to the **1.1.0** schema.  
> All examples are **one request per block**, with `jsonrpc` first and `id` second.

---

## Meta

### Discover API
```json
{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}
```

---

## Allowlist

### Get allowlist
```json
{"jsonrpc":"2.0","id":2,"method":"minecraft:allowlist","params":[]}
```

### Set allowlist (replace entire list)
```json
{"jsonrpc":"2.0","id":3,"method":"minecraft:allowlist/set","params":[[
  {"name":"Alice"},
  {"name":"Bob"}
]]}
```

### Add players to allowlist
```json
{"jsonrpc":"2.0","id":4,"method":"minecraft:allowlist/add","params":[[
  {"name":"Alice"},
  {"name":"Bob"}
]]}
```

### Remove players from allowlist
```json
{"jsonrpc":"2.0","id":5,"method":"minecraft:allowlist/remove","params":[[
  {"name":"Alice"}
]]}
```

### Clear allowlist
```json
{"jsonrpc":"2.0","id":6,"method":"minecraft:allowlist/clear","params":[]}
```

---

## Player Bans (user bans)

### Get player bans
```json
{"jsonrpc":"2.0","id":7,"method":"minecraft:bans","params":[]}
```

### Set player bans (replace entire list)
```json
{"jsonrpc":"2.0","id":8,"method":"minecraft:bans/set","params":[[
  {"player":{"name":"Griefer"},"reason":"No griefing","expires":"2026-01-01T00:00:00Z","source":"console"}
]]}
```

### Add player bans
```json
{"jsonrpc":"2.0","id":9,"method":"minecraft:bans/add","params":[[
  {"player":{"name":"Griefer"},"reason":"No griefing","expires":"2026-01-01T00:00:00Z","source":"console"}
]]}
```

### Remove player bans
```json
{"jsonrpc":"2.0","id":10,"method":"minecraft:bans/remove","params":[[
  {"name":"Griefer"}
]]}
```

### Clear player bans
```json
{"jsonrpc":"2.0","id":11,"method":"minecraft:bans/clear","params":[]}
```

---

## IP Bans

### Get IP bans
```json
{"jsonrpc":"2.0","id":12,"method":"minecraft:ip_bans","params":[]}
```

### Set IP bans (replace entire list)
```json
{"jsonrpc":"2.0","id":13,"method":"minecraft:ip_bans/set","params":[[
  {"ip":"203.0.113.10","reason":"DDoS","expires":"2025-12-31T00:00:00Z","source":"console"}
]]}
```

### Add IP bans (incoming_ip_ban objects)
```json
{"jsonrpc":"2.0","id":14,"method":"minecraft:ip_bans/add","params":[[
  {"ip":"203.0.113.10","reason":"DDoS","expires":"2025-12-31T00:00:00Z","source":"console","player":{"name":"OptionalPlayer"}}
]]}
```

### Remove IP bans (array of strings)
```json
{"jsonrpc":"2.0","id":15,"method":"minecraft:ip_bans/remove","params":[
  ["203.0.113.10","198.51.100.7"]
]}
```

### Clear IP bans
```json
{"jsonrpc":"2.0","id":16,"method":"minecraft:ip_bans/clear","params":[]}
```

---

## Players

### Get connected players
```json
{"jsonrpc":"2.0","id":17,"method":"minecraft:players","params":[]}
```

### Kick players (v1.1.0 shape)
> **Note:** 1.1.0 expects an array of **single-player** objects, not a `players:[]` field.
```json
{"jsonrpc":"2.0","id":18,"method":"minecraft:players/kick","params":[[
  {"player":{"name":"AFKPlayer"},"message":{"literal":"Kicked for inactivity"}},
  {"player":{"name":"Spammer"}}
]]}
```

---

## Operators

### Get operators
```json
{"jsonrpc":"2.0","id":19,"method":"minecraft:operators","params":[]}
```

### Set operators (replace entire list)
```json
{"jsonrpc":"2.0","id":20,"method":"minecraft:operators/set","params":[[
  {"player":{"name":"Cory"},"permissionLevel":4,"bypassesPlayerLimit":true},
  {"player":{"name":"Skitz"},"permissionLevel":3,"bypassesPlayerLimit":false}
]]}
```

### Add operators
```json
{"jsonrpc":"2.0","id":21,"method":"minecraft:operators/add","params":[[
  {"player":{"name":"Cory"},"permissionLevel":4,"bypassesPlayerLimit":true}
]]}
```

### Remove operators
```json
{"jsonrpc":"2.0","id":22,"method":"minecraft:operators/remove","params":[[
  {"name":"Cory"}
]]}
```

### Clear operators
```json
{"jsonrpc":"2.0","id":23,"method":"minecraft:operators/clear","params":[]}
```

---

## Server

### Status
```json
{"jsonrpc":"2.0","id":24,"method":"minecraft:server/status","params":[]}
```

### Save (flush)
```json
{"jsonrpc":"2.0","id":25,"method":"minecraft:server/save","params":[true]}
```

### Stop
```json
{"jsonrpc":"2.0","id":26,"method":"minecraft:server/stop","params":[]}
```

### System message
```json
{"jsonrpc":"2.0","id":27,"method":"minecraft:server/system_message","params":[
  {"message":{"literal":"Server restart in 5 minutes!"},"overlay":false}
]}
```
```json
{"jsonrpc":"2.0","id":28,"method":"minecraft:server/system_message","params":[
  {"receivingPlayers":[{"name":"Alice"},{"name":"Bob"}],"overlay":true,"message":{"literal":"Hi Alice & Bob"}}
]}
```

---

## Server Settings — Get

```json
{"jsonrpc":"2.0","id":29,"method":"minecraft:serversettings/autosave","params":[]}
```
```json
{"jsonrpc":"2.0","id":30,"method":"minecraft:serversettings/difficulty","params":[]}
```
```json
{"jsonrpc":"2.0","id":31,"method":"minecraft:serversettings/enforce_allowlist","params":[]}
```
```json
{"jsonrpc":"2.0","id":32,"method":"minecraft:serversettings/use_allowlist","params":[]}
```
```json
{"jsonrpc":"2.0","id":33,"method":"minecraft:serversettings/max_players","params":[]}
```
```json
{"jsonrpc":"2.0","id":34,"method":"minecraft:serversettings/pause_when_empty_seconds","params":[]}
```
```json
{"jsonrpc":"2.0","id":35,"method":"minecraft:serversettings/player_idle_timeout","params":[]}
```
```json
{"jsonrpc":"2.0","id":36,"method":"minecraft:serversettings/allow_flight","params":[]}
```
```json
{"jsonrpc":"2.0","id":37,"method":"minecraft:serversettings/motd","params":[]}
```
```json
{"jsonrpc":"2.0","id":38,"method":"minecraft:serversettings/spawn_protection_radius","params":[]}
```
```json
{"jsonrpc":"2.0","id":39,"method":"minecraft:serversettings/force_game_mode","params":[]}
```
```json
{"jsonrpc":"2.0","id":40,"method":"minecraft:serversettings/game_mode","params":[]}
```
```json
{"jsonrpc":"2.0","id":41,"method":"minecraft:serversettings/view_distance","params":[]}
```
```json
{"jsonrpc":"2.0","id":42,"method":"minecraft:serversettings/simulation_distance","params":[]}
```
```json
{"jsonrpc":"2.0","id":43,"method":"minecraft:serversettings/accept_transfers","params":[]}
```
```json
{"jsonrpc":"2.0","id":44,"method":"minecraft:serversettings/status_heartbeat_interval","params":[]}
```
```json
{"jsonrpc":"2.0","id":45,"method":"minecraft:serversettings/operator_user_permission_level","params":[]}
```
```json
{"jsonrpc":"2.0","id":46,"method":"minecraft:serversettings/hide_online_players","params":[]}
```
```json
{"jsonrpc":"2.0","id":47,"method":"minecraft:serversettings/status_replies","params":[]}
```
```json
{"jsonrpc":"2.0","id":48,"method":"minecraft:serversettings/entity_broadcast_range","params":[]}
```

---

## Server Settings — Set

```json
{"jsonrpc":"2.0","id":49,"method":"minecraft:serversettings/autosave/set","params":[true]}
```
```json
{"jsonrpc":"2.0","id":50,"method":"minecraft:serversettings/difficulty/set","params":["hard"]}
```
```json
{"jsonrpc":"2.0","id":51,"method":"minecraft:serversettings/enforce_allowlist/set","params":[true]}
```
```json
{"jsonrpc":"2.0","id":52,"method":"minecraft:serversettings/use_allowlist/set","params":[true]}
```
```json
{"jsonrpc":"2.0","id":53,"method":"minecraft:serversettings/max_players/set","params":[50]}
```
```json
{"jsonrpc":"2.0","id":54,"method":"minecraft:serversettings/pause_when_empty_seconds/set","params":[600]}
```
```json
{"jsonrpc":"2.0","id":55,"method":"minecraft:serversettings/player_idle_timeout/set","params":[900]}
```
```json
{"jsonrpc":"2.0","id":56,"method":"minecraft:serversettings/allow_flight/set","params":[true]}
```
```json
{"jsonrpc":"2.0","id":57,"method":"minecraft:serversettings/motd/set","params":["Welcome to our server!"]}
```
```json
{"jsonrpc":"2.0","id":58,"method":"minecraft:serversettings/spawn_protection_radius/set","params":[16]}
```
```json
{"jsonrpc":"2.0","id":59,"method":"minecraft:serversettings/force_game_mode/set","params":[false]}
```
```json
{"jsonrpc":"2.0","id":60,"method":"minecraft:serversettings/game_mode/set","params":["survival"]}
```
```json
{"jsonrpc":"2.0","id":61,"method":"minecraft:serversettings/view_distance/set","params":[12]}
```
```json
{"jsonrpc":"2.0","id":62,"method":"minecraft:serversettings/simulation_distance/set","params":[10]}
```
```json
{"jsonrpc":"2.0","id":63,"method":"minecraft:serversettings/accept_transfers/set","params":[false]}
```
```json
{"jsonrpc":"2.0","id":64,"method":"minecraft:serversettings/status_heartbeat_interval/set","params":[30]}
```
```json
{"jsonrpc":"2.0","id":65,"method":"minecraft:serversettings/operator_user_permission_level/set","params":[3]}
```
```json
{"jsonrpc":"2.0","id":66,"method":"minecraft:serversettings/hide_online_players/set","params":[false]}
```
```json
{"jsonrpc":"2.0","id":67,"method":"minecraft:serversettings/status_replies/set","params":[true]}
```
```json
{"jsonrpc":"2.0","id":68,"method":"minecraft:serversettings/entity_broadcast_range/set","params":[100]}
```

---

## Gamerules

### List gamerules (typed)
```json
{"jsonrpc":"2.0","id":69,"method":"minecraft:gamerules","params":[]}
```

### Update gamerule (send value as string; server will type it)
```json
{"jsonrpc":"2.0","id":70,"method":"minecraft:gamerules/update","params":[
  {"key":"doDaylightCycle","value":"false"}
]}
```

---

## Notifications (server‑sent; **do not call**)

> These arrive from the server. Clients should handle them but **not** invoke them.

- `minecraft:notification/server/started`
- `minecraft:notification/server/stopping`
- `minecraft:notification/server/saving`
- `minecraft:notification/server/saved`
- `minecraft:notification/server/activity`  *(rate‑limited: 1 per 30s)*
- `minecraft:notification/players/joined`
- `minecraft:notification/players/left`
- `minecraft:notification/operators/added`
- `minecraft:notification/operators/removed`
- `minecraft:notification/allowlist/added`
- `minecraft:notification/allowlist/removed`
- `minecraft:notification/ip_bans/added`
- `minecraft:notification/ip_bans/removed`
- `minecraft:notification/bans/added`
- `minecraft:notification/bans/removed`
- `minecraft:notification/gamerules/updated`

---

*Minecraft Server Management Protocol v1.1.0*
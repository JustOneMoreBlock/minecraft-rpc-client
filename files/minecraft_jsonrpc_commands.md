# Minecraft JSON-RPC Commands

This document provides JSON-RPC commands for Minecraft, grouped by category.

---

## Allowlist Commands

#### Get
```json
{"jsonrpc":"2.0","id":1,"method":"minecraft:allowlist","params":[]}
```

#### Set
```json
{"jsonrpc":"2.0","id":2,"method":"minecraft:allowlist/set","params":[[{"name":"Player1"}]]}
```

#### Add
```json
{"jsonrpc":"2.0","id":3,"method":"minecraft:allowlist/add","params":[[{"name":"Player1"}]]}
```

#### Remove
```json
{"jsonrpc":"2.0","id":4,"method":"minecraft:allowlist/remove","params":[[{"name":"Player1"}]]}
```

#### Clear
```json
{"jsonrpc":"2.0","id":5,"method":"minecraft:allowlist/clear","params":[]}
```

---

## Player Ban Commands

#### Get
```json
{"jsonrpc":"2.0","id":6,"method":"minecraft:bans","params":[]}
```

#### Set
```json
{"jsonrpc":"2.0","id":7,"method":"minecraft:bans/set","params":[[{"player":{"name":"Player1"},"reason":"Griefing","expires":"","source":"Admin"}]]}
```

#### Add
```json
{"jsonrpc":"2.0","id":8,"method":"minecraft:bans/add","params":[[{"player":{"name":"Player2"},"reason":"Cheating","expires":"","source":"Admin"}]]}
```

#### Remove
```json
{"jsonrpc":"2.0","id":9,"method":"minecraft:bans/remove","params":[[{"name":"Player1"}]]}
```

#### Clear
```json
{"jsonrpc":"2.0","id":10,"method":"minecraft:bans/clear","params":[]}
```

---

## IP Ban Commands

#### Get
```json
{"jsonrpc":"2.0","id":11,"method":"minecraft:ip_bans","params":[]}
```

#### Set
```json
{"jsonrpc":"2.0","id":12,"method":"minecraft:ip_bans/set","params":[[{"ip":"192.168.1.100","reason":"DDoS","expires":"","source":"Admin"}]]}
```

#### Add
```json
{"jsonrpc":"2.0","id":13,"method":"minecraft:ip_bans/add","params":[[{"ip":"192.168.1.101","reason":"Botting","expires":"","source":"Admin","player":{"name":"Player3"}}]]}
```

#### Remove
```json
{"jsonrpc":"2.0","id":14,"method":"minecraft:ip_bans/remove","params":[["192.168.1.100"]]}
```

#### Clear
```json
{"jsonrpc":"2.0","id":15,"method":"minecraft:ip_bans/clear","params":[]}
```

---

## Players Commands

#### Get
```json
{"jsonrpc":"2.0","id":16,"method":"minecraft:players","params":[]}
```

#### Kick
```json
{"jsonrpc":"2.0","id":17,"method":"minecraft:players/kick","params":[[{"players":[{"name":"Player1"}],"message":{"literal":"Kicked for inactivity"}}]]}
```

---

## Operators Commands

#### Get
```json
{"jsonrpc":"2.0","id":18,"method":"minecraft:operators","params":[]}
```

#### Set
```json
{"jsonrpc":"2.0","id":19,"method":"minecraft:operators/set","params":[[{"player":{"name":"Admin1"},"permissionLevel":4,"bypassesPlayerLimit":true}]]}
```

#### Add
```json
{"jsonrpc":"2.0","id":20,"method":"minecraft:operators/add","params":[[{"player":{"name":"Admin2"},"permissionLevel":3,"bypassesPlayerLimit":false}]]}
```

#### Remove
```json
{"jsonrpc":"2.0","id":21,"method":"minecraft:operators/remove","params":[[{"name":"Admin1"}]]}
```

#### Clear
```json
{"jsonrpc":"2.0","id":22,"method":"minecraft:operators/clear","params":[]}
```

---

## Server Commands

#### Status
```json
{"jsonrpc":"2.0","id":23,"method":"minecraft:server/status","params":[]}
```

#### Save
```json
{"jsonrpc":"2.0","id":24,"method":"minecraft:server/save","params":[true]}
```

#### Stop
```json
{"jsonrpc":"2.0","id":25,"method":"minecraft:server/stop","params":[]}
```

#### System Message
```json
{"jsonrpc":"2.0","id":26,"method":"minecraft:server/system_message","params":[{"receivingPlayers":[{"name":"Player1"}],"overlay":false,"message":{"literal":"Server restart in 5 minutes!"}}]}
```

---

## Server Settings

#### Autosave
```json
{"jsonrpc":"2.0","id":27,"method":"minecraft:serversettings/autosave","params":[]}
```
```json
{"jsonrpc":"2.0","id":28,"method":"minecraft:serversettings/autosave/set","params":[true]}
```

#### Difficulty
```json
{"jsonrpc":"2.0","id":29,"method":"minecraft:serversettings/difficulty","params":[]}
```
```json
{"jsonrpc":"2.0","id":30,"method":"minecraft:serversettings/difficulty/set","params":["hard"]}
```

#### Enforce Allowlist
```json
{"jsonrpc":"2.0","id":31,"method":"minecraft:serversettings/enforce_allowlist","params":[]}
```
```json
{"jsonrpc":"2.0","id":32,"method":"minecraft:serversettings/enforce_allowlist/set","params":[true]}
```

#### Use Allowlist
```json
{"jsonrpc":"2.0","id":33,"method":"minecraft:serversettings/use_allowlist","params":[]}
```
```json
{"jsonrpc":"2.0","id":34,"method":"minecraft:serversettings/use_allowlist/set","params":[true]}
```

#### Max Players
```json
{"jsonrpc":"2.0","id":35,"method":"minecraft:serversettings/max_players","params":[]}
```
```json
{"jsonrpc":"2.0","id":36,"method":"minecraft:serversettings/max_players/set","params":[10]}
```

#### Pause When Empty Seconds
```json
{"jsonrpc":"2.0","id":37,"method":"minecraft:serversettings/pause_when_empty_seconds","params":[]}
```
```json
{"jsonrpc":"2.0","id":38,"method":"minecraft:serversettings/pause_when_empty_seconds/set","params":[10]}
```

#### Player Idle Timeout
```json
{"jsonrpc":"2.0","id":39,"method":"minecraft:serversettings/player_idle_timeout","params":[]}
```
```json
{"jsonrpc":"2.0","id":40,"method":"minecraft:serversettings/player_idle_timeout/set","params":[10]}
```

#### Allow Flight
```json
{"jsonrpc":"2.0","id":41,"method":"minecraft:serversettings/allow_flight","params":[]}
```
```json
{"jsonrpc":"2.0","id":42,"method":"minecraft:serversettings/allow_flight/set","params":[true]}
```

#### MOTD
```json
{"jsonrpc":"2.0","id":43,"method":"minecraft:serversettings/motd","params":[]}
```
```json
{"jsonrpc":"2.0","id":44,"method":"minecraft:serversettings/motd/set","params":["Welcome to the server!"]}
```

#### Spawn Protection Radius
```json
{"jsonrpc":"2.0","id":45,"method":"minecraft:serversettings/spawn_protection_radius","params":[]}
```
```json
{"jsonrpc":"2.0","id":46,"method":"minecraft:serversettings/spawn_protection_radius/set","params":[10]}
```

#### Force Game Mode
```json
{"jsonrpc":"2.0","id":47,"method":"minecraft:serversettings/force_game_mode","params":[]}
```
```json
{"jsonrpc":"2.0","id":48,"method":"minecraft:serversettings/force_game_mode/set","params":[true]}
```

#### Game Mode
```json
{"jsonrpc":"2.0","id":49,"method":"minecraft:serversettings/game_mode","params":[]}
```
```json
{"jsonrpc":"2.0","id":50,"method":"minecraft:serversettings/game_mode/set","params":["survival"]}
```

#### View Distance
```json
{"jsonrpc":"2.0","id":51,"method":"minecraft:serversettings/view_distance","params":[]}
```
```json
{"jsonrpc":"2.0","id":52,"method":"minecraft:serversettings/view_distance/set","params":[10]}
```

#### Simulation Distance
```json
{"jsonrpc":"2.0","id":53,"method":"minecraft:serversettings/simulation_distance","params":[]}
```
```json
{"jsonrpc":"2.0","id":54,"method":"minecraft:serversettings/simulation_distance/set","params":[10]}
```

#### Accept Transfers
```json
{"jsonrpc":"2.0","id":55,"method":"minecraft:serversettings/accept_transfers","params":[]}
```
```json
{"jsonrpc":"2.0","id":56,"method":"minecraft:serversettings/accept_transfers/set","params":[true]}
```

#### Status Heartbeat Interval
```json
{"jsonrpc":"2.0","id":57,"method":"minecraft:serversettings/status_heartbeat_interval","params":[]}
```
```json
{"jsonrpc":"2.0","id":58,"method":"minecraft:serversettings/status_heartbeat_interval/set","params":[10]}
```

#### Operator User Permission Level
```json
{"jsonrpc":"2.0","id":59,"method":"minecraft:serversettings/operator_user_permission_level","params":[]}
```
```json
{"jsonrpc":"2.0","id":60,"method":"minecraft:serversettings/operator_user_permission_level/set","params":[10]}
```

#### Hide Online Players
```json
{"jsonrpc":"2.0","id":61,"method":"minecraft:serversettings/hide_online_players","params":[]}
```
```json
{"jsonrpc":"2.0","id":62,"method":"minecraft:serversettings/hide_online_players/set","params":[true]}
```

#### Status Replies
```json
{"jsonrpc":"2.0","id":63,"method":"minecraft:serversettings/status_replies","params":[]}
```
```json
{"jsonrpc":"2.0","id":64,"method":"minecraft:serversettings/status_replies/set","params":[true]}
```

#### Entity Broadcast Range
```json
{"jsonrpc":"2.0","id":65,"method":"minecraft:serversettings/entity_broadcast_range","params":[]}
```
```json
{"jsonrpc":"2.0","id":66,"method":"minecraft:serversettings/entity_broadcast_range/set","params":[10]}
```

---

## Gamerules

#### Get
```json
{"jsonrpc":"2.0","id":67,"method":"minecraft:gamerules","params":[]}
```

#### Update
```json
{"jsonrpc":"2.0","id":68,"method":"minecraft:gamerules/update","params":[{"key":"doDaylightCycle","value":"false"}]}
```

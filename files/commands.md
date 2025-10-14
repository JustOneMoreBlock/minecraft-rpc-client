# -------------------------------------------
# Minecraft Server JSON-RPC - Full Command List (v1.1.0)
# Format: one JSON per line, with jsonrpc first, id second.
# You can copy a line, tweak 'id' and params, and send.
# -------------------------------------------

# --- Meta ---
{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}

# --- Allowlist ---
{"jsonrpc":"2.0","id":2,"method":"minecraft:allowlist","params":[]}
{"jsonrpc":"2.0","id":3,"method":"minecraft:allowlist/set","params":[[{"name":"Alice"},{"name":"Bob"}]]} # replace list entirely
{"jsonrpc":"2.0","id":4,"method":"minecraft:allowlist/add","params":[[{"name":"Alice"},{"name":"Bob"}]]}
{"jsonrpc":"2.0","id":5,"method":"minecraft:allowlist/remove","params":[[{"name":"Alice"}]]}
{"jsonrpc":"2.0","id":6,"method":"minecraft:allowlist/clear","params":[]}

# --- Player Bans (user_ban objects) ---
{"jsonrpc":"2.0","id":7,"method":"minecraft:bans","params":[]}
{"jsonrpc":"2.0","id":8,"method":"minecraft:bans/set","params":[[{"player":{"name":"Griefer"},"reason":"No griefing","expires":"2026-01-01T00:00:00Z","source":"console"}]]}
{"jsonrpc":"2.0","id":9,"method":"minecraft:bans/add","params":[[{"player":{"name":"Griefer"},"reason":"No griefing","expires":"2026-01-01T00:00:00Z","source":"console"}]]}
{"jsonrpc":"2.0","id":10,"method":"minecraft:bans/remove","params":[[{"name":"Griefer"}]]}
{"jsonrpc":"2.0","id":11,"method":"minecraft:bans/clear","params":[]}

# --- IP Bans ---
{"jsonrpc":"2.0","id":12,"method":"minecraft:ip_bans","params":[]}
{"jsonrpc":"2.0","id":13,"method":"minecraft:ip_bans/set","params":[[{"ip":"203.0.113.10","reason":"DDoS","expires":"2025-12-31T00:00:00Z","source":"console"}]]} # replaces entire IP ban list
{"jsonrpc":"2.0","id":14,"method":"minecraft:ip_bans/add","params":[[{"ip":"203.0.113.10","reason":"DDoS","expires":"2025-12-31T00:00:00Z","source":"console","player":{"name":"OptionalPlayer"}}]]}
{"jsonrpc":"2.0","id":15,"method":"minecraft:ip_bans/remove","params":[["203.0.113.10"]]} # array of IP strings
{"jsonrpc":"2.0","id":16,"method":"minecraft:ip_bans/clear","params":[]}

# --- Players ---
{"jsonrpc":"2.0","id":17,"method":"minecraft:players","params":[]}
{"jsonrpc":"2.0","id":18,"method":"minecraft:players/kick","params":[[
  {"player":{"name":"AFKPlayer"},"message":{"literal":"Kicked for inactivity"}},
  {"player":{"name":"Spammer"}}
]]} # v1.1.0 shape: array of single-player objects

# --- Operators ---
{"jsonrpc":"2.0","id":19,"method":"minecraft:operators","params":[]}
{"jsonrpc":"2.0","id":20,"method":"minecraft:operators/set","params":[[{"player":{"name":"Cory"},"permissionLevel":4,"bypassesPlayerLimit":true},{"player":{"name":"Skitz"},"permissionLevel":3,"bypassesPlayerLimit":false}]]}
{"jsonrpc":"2.0","id":21,"method":"minecraft:operators/add","params":[[{"player":{"name":"Cory"},"permissionLevel":4,"bypassesPlayerLimit":true}]]}
{"jsonrpc":"2.0","id":22,"method":"minecraft:operators/remove","params":[[{"name":"Cory"}]]}
{"jsonrpc":"2.0","id":23,"method":"minecraft:operators/clear","params":[]}

# --- Server Control ---
{"jsonrpc":"2.0","id":24,"method":"minecraft:server/status","params":[]}
{"jsonrpc":"2.0","id":25,"method":"minecraft:server/save","params":[true]} # flush=true
{"jsonrpc":"2.0","id":26,"method":"minecraft:server/stop","params":[]}

# --- System Message (broadcast or targeted) ---
{"jsonrpc":"2.0","id":27,"method":"minecraft:server/system_message","params":[{"message":{"literal":"Server restart in 5 minutes!"},"overlay":false}]}
{"jsonrpc":"2.0","id":28,"method":"minecraft:server/system_message","params":[{"receivingPlayers":[{"name":"Alice"},{"name":"Bob"}],"overlay":true,"message":{"literal":"Hi Alice & Bob"}}]}

# --- Server Settings (GET) ---
{"jsonrpc":"2.0","id":29,"method":"minecraft:serversettings/autosave","params":[]}
{"jsonrpc":"2.0","id":30,"method":"minecraft:serversettings/difficulty","params":[]}
{"jsonrpc":"2.0","id":31,"method":"minecraft:serversettings/enforce_allowlist","params":[]}
{"jsonrpc":"2.0","id":32,"method":"minecraft:serversettings/use_allowlist","params":[]}
{"jsonrpc":"2.0","id":33,"method":"minecraft:serversettings/max_players","params":[]}
{"jsonrpc":"2.0","id":34,"method":"minecraft:serversettings/pause_when_empty_seconds","params":[]}
{"jsonrpc":"2.0","id":35,"method":"minecraft:serversettings/player_idle_timeout","params":[]}
{"jsonrpc":"2.0","id":36,"method":"minecraft:serversettings/allow_flight","params":[]}
{"jsonrpc":"2.0","id":37,"method":"minecraft:serversettings/motd","params":[]}
{"jsonrpc":"2.0","id":38,"method":"minecraft:serversettings/spawn_protection_radius","params":[]}
{"jsonrpc":"2.0","id":39,"method":"minecraft:serversettings/force_game_mode","params":[]}
{"jsonrpc":"2.0","id":40,"method":"minecraft:serversettings/game_mode","params":[]}
{"jsonrpc":"2.0","id":41,"method":"minecraft:serversettings/view_distance","params":[]}
{"jsonrpc":"2.0","id":42,"method":"minecraft:serversettings/simulation_distance","params":[]}
{"jsonrpc":"2.0","id":43,"method":"minecraft:serversettings/accept_transfers","params":[]}
{"jsonrpc":"2.0","id":44,"method":"minecraft:serversettings/status_heartbeat_interval","params":[]}
{"jsonrpc":"2.0","id":45,"method":"minecraft:serversettings/operator_user_permission_level","params":[]}
{"jsonrpc":"2.0","id":46,"method":"minecraft:serversettings/hide_online_players","params":[]}
{"jsonrpc":"2.0","id":47,"method":"minecraft:serversettings/status_replies","params":[]}
{"jsonrpc":"2.0","id":48,"method":"minecraft:serversettings/entity_broadcast_range","params":[]}

# --- Server Settings (SET) ---
{"jsonrpc":"2.0","id":49,"method":"minecraft:serversettings/autosave/set","params":[true]}
{"jsonrpc":"2.0","id":50,"method":"minecraft:serversettings/difficulty/set","params":["hard"]} # one of: peaceful|easy|normal|hard
{"jsonrpc":"2.0","id":51,"method":"minecraft:serversettings/enforce_allowlist/set","params":[true]}
{"jsonrpc":"2.0","id":52,"method":"minecraft:serversettings/use_allowlist/set","params":[true]}
{"jsonrpc":"2.0","id":53,"method":"minecraft:serversettings/max_players/set","params":[50]}
{"jsonrpc":"2.0","id":54,"method":"minecraft:serversettings/pause_when_empty_seconds/set","params":[600]}
{"jsonrpc":"2.0","id":55,"method":"minecraft:serversettings/player_idle_timeout/set","params":[900]}
{"jsonrpc":"2.0","id":56,"method":"minecraft:serversettings/allow_flight/set","params":[true]}
{"jsonrpc":"2.0","id":57,"method":"minecraft:serversettings/motd/set","params":["Welcome to our server!"]}
{"jsonrpc":"2.0","id":58,"method":"minecraft:serversettings/spawn_protection_radius/set","params":[16]}
{"jsonrpc":"2.0","id":59,"method":"minecraft:serversettings/force_game_mode/set","params":[false]}
{"jsonrpc":"2.0","id":60,"method":"minecraft:serversettings/game_mode/set","params":["survival"]} # one of: survival|creative|adventure|spectator
{"jsonrpc":"2.0","id":61,"method":"minecraft:serversettings/view_distance/set","params":[12]}
{"jsonrpc":"2.0","id":62,"method":"minecraft:serversettings/simulation_distance/set","params":[10]}
{"jsonrpc":"2.0","id":63,"method":"minecraft:serversettings/accept_transfers/set","params":[false]}
{"jsonrpc":"2.0","id":64,"method":"minecraft:serversettings/status_heartbeat_interval/set","params":[30]}
{"jsonrpc":"2.0","id":65,"method":"minecraft:serversettings/operator_user_permission_level/set","params":[3]}
{"jsonrpc":"2.0","id":66,"method":"minecraft:serversettings/hide_online_players/set","params":[false]}
{"jsonrpc":"2.0","id":67,"method":"minecraft:serversettings/status_replies/set","params":[true]}
{"jsonrpc":"2.0","id":68,"method":"minecraft:serversettings/entity_broadcast_range/set","params":[100]}

# --- Gamerules ---
{"jsonrpc":"2.0","id":69,"method":"minecraft:gamerules","params":[]} # returns typed rules
{"jsonrpc":"2.0","id":70,"method":"minecraft:gamerules/update","params":[{"key":"doDaylightCycle","value":"false"}]} # value sent as string; server will type it

# --- Notifications (examples; server-sent only, DO NOT CALL) ---
# {"jsonrpc":"2.0","method":"minecraft:notification/server/activity","params":[]}
# {"jsonrpc":"2.0","method":"minecraft:notification/players/joined","params":[{"name":"Alice","id":"uuid"}]}
# {"jsonrpc":"2.0","method":"minecraft:notification/gamerules/updated","params":[{"key":"doDaylightCycle","type":"boolean","value":"false"}]}

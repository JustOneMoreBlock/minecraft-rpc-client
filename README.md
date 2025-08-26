# minecraft-rpc-client

A simple WebSocket client for interacting with the new **Minecraft Server Management Protocol** released on **Tuesday, August 26th, 2025**.

---

## Install

```bash
cd minecraft-rpc-client
npm install
```
- Installed
  - npm: 10.8.2
  - node: v20.19.4

## Run

### Local Development

```bash
npm run dev
```

### Exposed Development

```bash
npm run dev -- --host
```

## Protocol Exploration
With the new Minecraft Server Management Protocol released today, I spent some time experimenting with its capabilities using a basic WebSocket client.

### API Discovery
To initiate API discovery, I sent the following JSON-RPC request:

```json
{
  "id": 1,
  "method": "rpc.discover"
}
```
This method is defined in the `files/json-rpc-api-schema.json` file. For improved readability, I used a JSON pretty printer to format the schema.

### Command Reference
After discovering the API, I extracted the complete list of available JSON-RPC methods and saved them to the following file for reference:

👉 [files/minecraft_jsonrpc_commands.md](files/minecraft_jsonrpc_commands.md)

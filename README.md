# minecraft-rpc-client

A simple WebSocket client for interacting with the new **Minecraft Server Management Protocol** released on **Tuesday, August 26th, 2025**.

**Update:** Tuesday, October 14th, 2025

---

## Install

```bash
cd minecraft-rpc-client
npm install
```

- Installed
  - npm: 10.8.2
  - node: v20.19.4

---

## Run

### Local Development

```bash
npm run dev
```

### Exposed Development

```bash
npm run dev -- --host
```

---

## Minecraft Server Configuration

To enable the RPC Management server, add or update the following entries in your **`server.properties`** file:

```properties
management-server-enabled=true
management-server-host=0.0.0.0
management-server-port=25585
management-server-secret=<secret-here>
management-server-allowed-origins=http://<server-ip>:5173,http://localhost>:5173,http://127.0.0.1:5173
management-server-tls-enabled=false
management-server-tls-keystore=
management-server-tls-keystore-password=
```
- You should be able to make all these changes.


## Get Secret
```properties
awk -F'=' '/^management-server-secret=/{print $2}' server.properties
```

If you are connecting from another host (for example, a remote machine running the WebSocket client), make sure to replace the allowed origin:

```properties
management-server-allowed-origins=http://<server-ip>:5173,http://localhost>:5173,http://127.0.0.1:5173
```
- A list is optional.

---

## WebSocket Connection

You can connect to the Minecraft server using either of the following protocols:

### Unsecured (Development)
```bash
ws://<server-ip>:25585

or

ws://<server-domain>:25585
```

### Secured (Production with TLS)
```bash
wss://<server-ip>:25585

or

wss://<server-domain>:25585
```

Make sure the **`management-server-secret`** from `server.properties` is entered in your client when prompted.  
The connection will reject unauthenticated or cross-origin requests unless properly configured.

---

## Protocol Exploration

With the new Minecraft Server Management Protocol released today, I spent some time experimenting with its capabilities using a basic WebSocket client.

### API Discovery

To initiate API discovery, send the following JSON-RPC request:

```json
{
  "id": 1,
  "method": "rpc.discover"
}
```

This method is defined in the `files/json-rpc-api-schema.json` file.  
For improved readability, a JSON pretty printer can be used to format the schema.

---

## Command Reference

After discovering the API, the full list of available JSON-RPC methods is documented here:

👉 [files/commands.md](files/commands.md)

---

## Changelog

All versioned updates and schema changes are tracked in the **`changelog/`** folder.

### Folder Structure
```
changelog/
 ├── v1.1.0.md     # Added new commands, notifications, and TLS/browser authentication
```

### Summary
- **v1.0.0** – Initial support for allowlist, bans, operators, and player management.
- **v1.1.0** – Added IP ban management, server settings control, new notifications, and TLS authentication options.

For a detailed command-by-command evolution, see:
👉 [changelog/v1.1.0.md](changelog/v1.1.0.md)

---

## Troubleshooting

If you encounter issues connecting or maintaining the WebSocket session, review the following:

### Common Errors

#### 1. **1006 (Connection Closed Abnormally)**
- Usually indicates a CORS or authentication issue.
- Verify that `management-server-allowed-origins` in `server.properties` includes the client’s origin.
- Ensure the correct **secret** is used.

#### 2. **401 Unauthorized**
- The WebSocket client failed authentication.
- Double-check that your token matches the `management-server-secret` or `Sec-WebSocket-Protocol` header.

#### 3. **CORS Error in Browser Console**
- If using a web browser, ensure the **Origin** matches the one configured in `server.properties`.
- Example: if hosting the app at `http://<server-ip>:5173`, your server property should read:
  ```properties
  management-server-allowed-origins=http://<server-ip>:5173,http://localhost>:5173,http://127.0.0.1:5173
  ```

#### 4. **TLS/SSL Handshake Error**
- Ensure that if TLS is enabled, the keystore is correctly configured and the password is set either via environment variable or `server.properties`.
- Disable TLS temporarily (`management-server-tls-enabled=false`) for debugging purposes.

---


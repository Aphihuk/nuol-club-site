# Deploy

This site is a fully **static** Next.js app, so the easiest host is **Cloudflare Pages**.
A Docker path (for a self-hosted Ubuntu server + Portainer) is documented at the bottom.

---

## Option 1 — Cloudflare Pages (recommended)

`next.config.ts` auto-switches to a static export (`output: "export"`) when Cloudflare
sets `CF_PAGES=1`, producing an `out/` folder. No Workers / OpenNext needed.

### Steps

1. **Dashboard → Workers & Pages → Create → Pages → Connect to Git** → pick this repo.
2. **Build settings:**

   | Field                    | Value                              |
   | ------------------------ | ---------------------------------- |
   | Framework preset         | **Next.js (Static HTML Export)** — if missing, use **None** |
   | Build command            | `npm run build`                    |
   | Build output directory   | `out`                              |

3. **Environment variables:** add `NODE_VERSION` = `20`
4. **Save and Deploy.** Site goes live at `https://<project>.pages.dev`.
5. **Custom domain** (optional): Pages project → **Custom domains** → add your domain
   (Cloudflare wires DNS + HTTPS automatically).

### Notes

- Do **not** deploy this as a Cloudflare **Worker** — the OpenNext adapter adds a
  `WORKER_SELF_REFERENCE` service binding that fails for a static site.
- Largest asset is `public/video/backgroup-What we do.mp4` (~13 MB), under the 25 MB
  per-file Pages limit.
- Test the export locally: `BUILD_TARGET=export npm run build` then serve `out/`.

---

## Option 2 — Portainer (Docker) + Cloudflare Tunnel

Files: `Dockerfile`, `.dockerignore`, `docker-compose.yml`. Local/Docker builds use
`output: "standalone"` automatically. The `docker-compose.yml` runs **two** services in
one stack: `web` (the app, internal port `3000`) and `cloudflared` (the tunnel). No
host ports are published — Cloudflare reaches the app over the internal Docker network,
so there are no firewall changes and no open ports.

### 1. Install Docker + Portainer (skip if already installed)

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # re-login after this

docker volume create portainer_data
docker run -d -p 9443:9443 --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

Open `https://<server-ip>:9443` and set the admin password.

### 2. Create the Cloudflare Tunnel

1. **Cloudflare Zero Trust → Networks → Tunnels → Create a tunnel** → type **Cloudflared**.
2. Name it (e.g. `nuol-club`) and **Save**. On the "Install connector" screen, copy the
   **token** — it's the long string after `--token` in the shown command. You only need
   the token itself, not the whole `cloudflared` command.
3. Under the tunnel's **Public Hostname** tab → **Add a public hostname**:
   - **Subdomain / Domain**: pick your domain (must be on your Cloudflare account).
   - **Service**: **HTTP** → `web:3000`  ← the compose service name + internal port.
4. **Save**. (DNS + HTTPS are wired automatically once the connector is healthy.)

### 3. Deploy the stack in Portainer

1. **Portainer → Stacks → Add stack → Repository:**
   - Repository URL: `https://github.com/Aphihuk/nuol-club-site`
   - Compose path: `docker-compose.yml`
2. Scroll to **Environment variables → Add environment variable**:
   - Name: `TUNNEL_TOKEN`  ·  Value: *(paste the token from step 2)*
3. **Deploy the stack.** First deploy builds the image (~1–2 min). When both containers
   are green, the tunnel connects and your site is live at your domain over HTTPS.

To update after pushing new code: Portainer → the stack → **Pull and redeploy**
(or **Update the stack** → enable *Re-pull image / re-build*).

### Troubleshooting

- **`cloudflared` keeps restarting / "error parsing token"**: the `TUNNEL_TOKEN` env var
  is empty or wrong — re-copy the token from the tunnel's connector screen.
- **502 / "web" unreachable**: confirm the Public Hostname service is exactly `web:3000`
  (not `localhost` or an IP) — both containers share the stack's Docker network.
- **Test the app without the tunnel**: temporarily add `ports: ["3000:3000"]` to the
  `web` service and open `http://<server-ip>:3000`.

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

## Option 2 — Ubuntu server + Portainer (Docker)

Files: `Dockerfile`, `.dockerignore`, `docker-compose.yml`. Local/Docker builds use
`output: "standalone"` automatically.

1. **Install Docker + Portainer** on Ubuntu:

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

2. **Portainer → Stacks → Add stack → Repository:**
   - Repository URL: `https://github.com/Aphihuk/nuol-club-site`
   - Compose path: `docker-compose.yml`
   - **Deploy the stack** → app runs on port `3000`.

3. **Expose with Cloudflare Tunnel** (free HTTPS, no open ports). Create a tunnel in
   **Cloudflare Zero Trust → Networks → Tunnels**, then add `cloudflared` to the stack:

   ```yaml
   services:
     web:
       build: .
       image: nuol-club-site:latest
       restart: unless-stopped
       expose:
         - "3000"
     cloudflared:
       image: cloudflare/cloudflared:latest
       restart: unless-stopped
       command: tunnel run
       environment:
         - TUNNEL_TOKEN=<your-token>
       depends_on:
         - web
   ```

   In the tunnel's **Public Hostname**, point your domain to `http://web:3000`.

To update after pushing new code: Portainer → the stack → **Update the stack**
(re-pull and redeploy).

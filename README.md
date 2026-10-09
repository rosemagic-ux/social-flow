# Keep the good parts

Interactive Instagram redesigns for a portfolio: keep friends, photos, stories, and DMs. Remove the loops that never end.

- **Caught up** — `/` and `/embed`  
  Following, Reposted, and Browse as separate piles. Each one ends.
- **Shared Reels** — `/reels` and `/embed/reels`  
  A friend’s stack stays a stack. Scroll does not dump you into For You.

No accounts, no video, no backend.

## Publish

The working copy lives on Origin (`rose-brand/social-reel-flow`). GitHub is a second remote so Vercel can import it.

### 1. GitHub

1. Open [github.com/new](https://github.com/new).
2. Name the repo `social-reel-flow`.
3. Leave it **empty** — no README, no .gitignore, no license.
4. Public if you want it on your profile; private is fine too.
5. Create the repository. Do not open the “push an existing repo” page and follow GitHub’s sample commands yet — use the ones below so you do not replace Origin.

On your machine, if you do not already have the project:

```bash
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh
origin auth login
origin repo clone rose-brand/social-reel-flow
cd social-reel-flow
```

Then add GitHub and push. Swap `YOUR-USER` for your GitHub username:

```bash
git remote add github https://github.com/YOUR-USER/social-reel-flow.git
git push -u github main
```

Origin stays `origin`. GitHub is `github`. Later updates:

```bash
git push origin main
git push github main
```

### 2. Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub** (not email-only).
2. **Add New… → Project**.
3. If Vercel has not seen your GitHub yet, click **Adjust GitHub App Permissions** and grant the `social-reel-flow` repo.
4. Import `social-reel-flow`. Framework should be Next.js. Leave the rest default.
5. Deploy. You get a URL like `https://social-reel-flow.vercel.app`.
6. Open `/embed` and `/embed/reels` and confirm the phones load.

Hobby is enough. This site is static. Each push to `github` `main` redeploys.

### 3. Squarespace (Business)

On the case-study page, add a **Code** block, type **HTML**:

```html
<iframe
  src="https://YOUR-VERCEL-URL/embed"
  title="Caught up — Home feed mockup"
  width="100%"
  height="920"
  style="border:0;background:#f5f3ef;"
></iframe>
```

Shared Reels:

```html
<iframe
  src="https://YOUR-VERCEL-URL/embed/reels"
  title="Shared Reels mockup"
  width="100%"
  height="920"
  style="border:0;background:#f5f3ef;"
></iframe>
```

Write the problem around the iframe. `/embed` is the phone only, so it fits a column.

## Run locally

```bash
npm install
npm run dev -- --port 43173
```

Open [http://localhost:43173](http://localhost:43173).

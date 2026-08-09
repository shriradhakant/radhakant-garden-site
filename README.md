# Shri Radhakant Garden — Website

This version needs **only Netlify** — no Supabase, no separate database
signup, no environment variables to paste in. Storage runs on **Netlify
Blobs**, which works automatically the moment your site is deployed.

Total time: about 10 minutes. Total cost: ₹0.

---

## Step 1 — Put this code on GitHub

1. Go to https://github.com and sign up (free) if you don't have an account.
2. Click **New repository**. Name it e.g. `radhakant-garden-site`. Click
   **Create repository**.
3. On the empty repo page, click **"uploading an existing file"**.
4. Open the unzipped folder on your computer, select **everything inside
   it** (index.html, package.json, netlify.toml, the `src` folder, the
   `netlify` folder, etc.) and drag that whole selection into the browser
   window.
   - Important: drag the *files and folders themselves* into the upload
     box — do not drag the single outer folder if your file manager shows
     it as one item, since that nests everything one level too deep.
   - After uploading, you should see `src/` and `netlify/` listed as
     folders (clickable, with a folder icon) in your repo — not loose
     files like `App.jsx` sitting on their own.
5. Scroll down, click **Commit changes**.

---

## Step 2 — Deploy to Netlify

1. Go to https://netlify.com and sign up (free) using your GitHub account.
2. Click **Add new site -> Import an existing project -> GitHub**, and
   select the repository you just created.
3. Netlify reads `netlify.toml` automatically — build command, publish
   folder, and the functions folder are already configured. You do **not**
   need to add any environment variables.
4. Click **Deploy site**. In about a minute, you'll get a live link like
   `radhakant-garden.netlify.app` — that's your real, working website.

That's it — no database account, no keys to copy anywhere.

---

## How the data storage works

Two small serverless functions (in the `netlify/functions` folder) handle
saving and reading enquiries and blocked dates, using Netlify's own
built-in storage (Netlify Blobs). Netlify automatically gives these
functions permission to read/write that storage — there is nothing to
configure. Submit a test enquiry on your live site, then open "Manage"
(passcode `admin123`) to confirm it shows up.

---

## Step 3 — Connect your own domain (optional)

If you own a domain (e.g. shriradhakantgarden.com):
1. In your Netlify site, go to **Domain management -> Add a domain**.
2. Add the DNS records Netlify shows you, at wherever you bought the
   domain (or let Netlify manage DNS for you).
3. Netlify issues a free HTTPS certificate automatically once it's
   connected.

The free `.netlify.app` link works fine to start sharing right away.

---

## Important: the admin passcode is not real security

The "Manage" dashboard is protected by a simple passcode (`admin123` —
search for `ADMIN_PASSCODE` in `src/App.jsx` and change it to something
only you know before sharing the site widely). Anyone who knows the
passcode can see and edit all enquiries. If you want real per-person admin
logins later, that's a bigger upgrade — ask me and I can help plan it.

---

## Making future changes

Edit files (mainly `src/App.jsx`), push the change to GitHub (or ask
Claude for an updated file and re-upload it the same way), and Netlify
automatically redeploys within a minute or two.

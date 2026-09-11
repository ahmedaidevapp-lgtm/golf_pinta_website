# Golf with Pinta — site vitrine

Static marketing site for Golf with Pinta, built from the Claude Design
handoff bundle in `../golf-pinta-remix/` (primary design:
`project/Golf Pinta Website v2.html`).

No build step, no dependencies. Plain HTML, CSS and one JS file.

## Run locally

```sh
npx serve -l 5173
```

Then open <http://localhost:5173>.

Internal links have no `.html` extension (`tarifs`, not `tarifs.html`), and
the logo links to `./`. GitHub Pages resolves both, and so does `serve`.
`python3 -m http.server` and double-clicking `index.html` do not — pages
open, but links between them break.

## Files

```
site/
├── index.html              the landing page
├── coachs.html             the coaches page (has TODO fields — see below)
├── tarifs.html             the price grid
├── groupes.html            groups & offsite — schools and companies, with an
│                          enquiry form that e-mails the academy
├── mentions-legales.html   legal notice   (has TODO fields — see below)
├── confidentialite.html    privacy policy (accurate as shipped)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── styles.css          full design system
    ├── main.js             nav, drawer, reveal, photos, coach dialog, prices,
    │                       groups gallery, forms
    └── images/             drop real photos here — see images/README.md
```

## What differs from the prototype

The design was a static mockup. These were added to make it a working site:

- **`<image-slot>` → `.photo` frames.** The design tool's custom element was
  replaced with real `<figure>`/`<img>` frames that fall back to an on-brand
  placeholder. Drop files into `assets/images/` to fill them —
  see `assets/images/README.md`.
- **Working contact form.** Client-side validation with inline errors, then
  the fiche is e-mailed to the academy through FormSubmit — the same relay as
  the groups enquiry. See "The forms" below.
- **Mobile menu.** The prototype hid the nav below 960px with nothing in its
  place; there is now a burger and a full-screen drawer.
- **Course rows prefill the form.** Clicking a scorecard row or "S'inscrire"
  jumps to the form with that parcours already selected.
- **Accessibility.** Skip link, visible focus rings, labelled inputs,
  `aria-live` confirmation, alt text, reduced-motion support.
- **SEO / sharing.** Meta description, Open Graph tags, JSON-LD
  `SportsActivityLocation`, favicon, sitemap, robots.
- **Legal pages.** The footer's "Mentions légales" and "Confidentialité"
  linked nowhere in the prototype.
- **Coaches page.** `coachs.html` — six portraits, three per row, each
  opening a profile dialog. The hero's red CTA and the académie section's
  "Rencontrer nos coachs" both point here.
- **Display typeface.** The prototype's Bodoni Moda was swapped for Lora
  site-wide (`--display` in `styles.css`) — same classic register, far more
  readable at headline sizes.

## Before going live

1. **Photos** — `assets/images/README.md` lists the six filenames.
2. **Coaches** — `coachs.html` ships one real profile (Mustapha Pinta) and
   five placeholders. For each of cards 2–6, edit `data-name`, `data-role`,
   `data-city` and `data-bio` on the `<button class="coach">`, the visible
   name/city just below its figure, and drop `coach-02.jpg` … `coach-06.jpg`
   into `assets/images/`. `data-bio` splits into paragraphs on `|`.
3. **Legal notice** — `mentions-legales.html` has `…` placeholders for the
   company registration details (RC, ICE, legal form) and the host. Fill them
   in and have the text reviewed.
4. **Domain** — `golfwithpinta.ma` is assumed in the canonical URL,
   `sitemap.xml` and `robots.txt`. Change it if the domain differs.
5. **Conditions strip** — the weather/greens values at the top of the page are
   hard-coded in `index.html`. Either keep them as static brand copy or wire
   them to a weather API.
6. **Tee sheet** — one event (portes ouvertes, 14 sept.) is hard-coded in the
   `#departs` section. Update or remove it as the season fills in.
7. **Testimonials** — the three reviews carry real names and dates from the
   design. Confirm you have permission to publish them.

## The forms (index.html fiche, groupes.html enquiry)

Both send e-mail. Each POSTs to [FormSubmit](https://formsubmit.co) — a free
relay that needs no account and no server — which forwards the submission to
`golfwithpinta@gmail.com`.

**One step is required before it delivers anything:** on the very first
submission FormSubmit e-mails an activation link to that address. Until
someone opens that mail and clicks the link, submissions are held, not
delivered. Send one test submission from the live site, then activate. The
activation is per-address, so doing it once covers both forms.

The endpoint is a single constant in `assets/main.js`:

```js
var ENQUIRY_EMAIL    = 'golfwithpinta@gmail.com';
var ENQUIRY_ENDPOINT = 'https://formsubmit.co/ajax/' + ENQUIRY_EMAIL;
```

Change the address there and nowhere else — both forms read it. To move to
another relay (Formspree, EmailJS, a function of your own), point
`ENQUIRY_ENDPOINT` at it — it is sent a JSON body and expected to answer
`{ success: "true" }`.

If the request fails for any reason — relay down, offline, blocked — the
filled-in form is handed to the visitor's own mail client, pre-composed and
addressed to the academy, so nobody loses what they typed.

WhatsApp is still offered alongside the fiche, as the sidebar's "Réserver via
WhatsApp" button and the phone row.

## Moving to a real backend

Note there is an existing full booking backend for this client at
`~/Desktop/Amandev Apps/pinta-golf` (Express + Prisma). If this site should
feed that system rather than FormSubmit, point `ENQUIRY_ENDPOINT` at its
bookings route.

## Deploying

Any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, or plain
nginx. Upload the contents of `site/` — there is nothing to build.

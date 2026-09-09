# Photos

The site ships with on-brand styled placeholders. Drop a real photo in here
using the exact filename below and it appears automatically on next reload —
no code change, no build step.

| Filename                     | Where it appears              | Suggested size        | Crop      |
|------------------------------|-------------------------------|-----------------------|-----------|
| `home-gal-adultes.jpg`       | Accueil « En images » — 1      | 1280 × 590 px         | Bandeau   |
| `home-gal-video.jpg`         | Accueil « En images » — 2      | 1280 × 590 px         | Bandeau   |
| `home-gal-juniors.jpg`       | Accueil « En images » — 3      | 1280 × 590 px         | Bandeau   |
| `home-gal-swing.jpg`         | Accueil « En images » — 4      | 1280 × 590 px         | Bandeau   |
| `home-section1.jpg`          | Hero, right-hand column       | 1000 × 1000 px        | Carré     |
| `pinta-homepage.jpg`         | Section « L'académie »        | 1280 × 854 px         | Paysage   |
| `mustapha-pinta.jpg`         | Coachs page — Mustapha Pinta  | 800 × 1000 px         | Portrait  |
| `events_pic.jpg`             | Fond de la section Événements | 2000 × 1333 px        | Paysage   |
| `coaches-group.jpg`          | Coachs page — fond d'en-tête  | 1800 × 1355 px        | Paysage   |
| `coach-abdellah.jpg`         | Coachs page — A. Mantrach     | 800 × 1000 px         | Portrait  |
| `coach-ayoub-id-omar.jpg`    | Coachs page — Ayoub Id Omar   | 800 × 1000 px         | Portrait  |
| `coach-brahim.jpg`           | Coachs page — B. Dkari        | 800 × 1000 px         | Portrait  |
| `coach-hamza.jpg`            | Coachs page — H. Karroum      | 800 × 1000 px         | Portrait  |
| `coach-karim.jpg`            | Coachs page — K. Ballouti     | 800 × 1000 px         | Portrait  |
| `coach-lahoucine.jpg`        | Coachs page — L. Nid Taleb    | 800 × 1000 px         | Portrait  |
| `coach-marjan.jpg`           | Coachs page — A. Marjan       | 800 × 1000 px         | Portrait  |
| `coach-said.jpg`             | Coachs page — S. Ouahmane     | 800 × 1000 px         | Portrait  |

Notes:

- All frames use `object-fit: cover`, so any aspect ratio renders without
  distortion — it just crops from the centre. Match the suggested ratio to
  control what stays in frame.
- `.jpg` is what the markup asks for. To use `.webp` or `.png`, change the
  `data-src` attribute on the matching `<figure class="photo">` in
  `index.html`.
- Keep hero and portrait files under ~300 KB. Nothing here is resized at
  build time — what you drop in is what visitors download.
- Alt text lives in the `data-alt` attribute next to `data-src` in
  `index.html`. Update it when the photo changes.
- `home-section1.jpg` carries the hero: a coach and a student together in
  frame — correcting a grip, a stance, a follow-through — not scenery. Two
  people, faces or hands readable. The frame is close to square, so crop the
  pair to the centre before dropping the file in.
- The coaches page shows nine cards; card 1 reuses `mustapha-pinta.jpg`. Every
  card already carries its real photo and name. What is still to complete is
  the `data-role`, `data-city` and `data-bio` on the matching
  `<button class="coach">` in `coachs.html`, plus the visible line just below
  the figure (currently « Golf with Pinta » in place of a city).
  The coach grid crops to 4:5, so portrait files fit without surprises.

- The four `home-gal-*.jpg` files are the « En images » grid on the home page,
  just under the section « L'académie ». They run as 2.17/1 bands, so a wide
  frame crops cleanly and a tall one does not. Keep the subjects big enough to
  read at half the page width — a distant group on an empty fairway disappears
  at that size. Pick four frames that show *different* things: they sit side by
  side, so near-identical compositions read as a duplicate rather than a set.
  Budget ~200 KB each and export progressive JPEG.

## Galerie « Groupes & offsite »

`groupes.html` porte un diaporama de six photos. Mêmes règles que ci-dessus :
déposez le fichier, il apparaît au rechargement suivant.

| Filename       | Où elle apparaît                     | Taille conseillée | Cadrage |
|----------------|--------------------------------------|-------------------|---------|
| `group-01.jpg` | Galerie groupes — 1 (entreprise, practice)   | 2000 × 1125 px    | Paysage |
| `group-02.jpg` | Galerie groupes — 2 (échauffement)           | 2000 × 1125 px    | Paysage |
| `group-03.jpg` | Galerie groupes — 3 (briefing vidéo)         | 2000 × 1125 px    | Paysage |
| `group-04.jpg` | Galerie groupes — 4 (atelier, offsite)       | 2000 × 1125 px    | Paysage |
| `group-05.jpg` | Galerie groupes — 5 (sortie scolaire)        | 2000 × 1125 px    | Paysage |
| `group-06.jpg` | Galerie groupes — 6 (classe au practice)     | 2000 × 1125 px    | Paysage |

- Le cadre est en 16/9 sur ordinateur et 4/3 sur téléphone, en `object-fit:
  cover` — gardez le sujet au centre.
- Une légende est posée en bas de chaque photo, sur un dégradé sombre : évitez
  d'y placer un visage ou un détail important.
- Les légendes se modifient dans `groupes.html`, dans les `.gs-cap` de la
  `<section class="gallery">`. Pour ajouter ou retirer une photo, ajoutez ou
  retirez un `<article class="gs">` — les puces et le compteur s'ajustent
  seuls.
- Tant qu'un `group-0N.jpg` manque, la vue garde un fond de marque et un
  pictogramme : la section n'est jamais vide.

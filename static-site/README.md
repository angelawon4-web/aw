# Angela Won — Portfolio (static site)

Plain HTML/CSS/JS version of the Figma Make portfolio (no build step, no framework).

## Structure

- `index.html` — home / pan-zoom photo board
- `about.html` — About Me page
- `css/style.css` — all styles
- `js/board.js` — pan/zoom/drag + photo modal behavior for the board page
- `images/` — local photos used on the About page

## Run locally

Just open `index.html` in a browser, or serve the folder, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Hosting on GitHub Pages

1. Create a new GitHub repo and push the contents of this `static-site` folder to it
   (either as the repo root, or keep it in a subfolder and point Pages at that path).
2. In the repo settings, enable **Pages** → Deploy from branch → `main` → `/ (root)`
   (or `/static-site` if you keep it nested).
3. The site will be published at `https://<username>.github.io/<repo>/`.

No build tools are required — GitHub Pages serves these files as-is.

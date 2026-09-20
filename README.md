# Angela Won — Portfolio

Plain HTML/CSS/JS portfolio site (no build step, no framework).

## Structure

- `index.html` — home / pan-zoom photo board
- `about.html` — About Me page
- `css/style.css` — all styles
- `js/board.js` — pan/zoom/drag + photo modal behavior for the board page
- `images/` — all photos used across the site

## Run locally

Just open `index.html` in a browser, or serve the folder, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Hosting on GitHub Pages

1. Push the contents of this repo to GitHub.
2. In the repo settings, enable **Pages** → Deploy from branch → `main` → `/ (root)`.
3. The site will be published at `https://<username>.github.io/<repo>/`.

No build tools are required — GitHub Pages serves these files as-is.

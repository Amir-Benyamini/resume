# Amir Benyamini — Resume

> DevOps Engineer. Platform Engineering · Self-Service IaC · CI/CD at Scale · AI-Augmented DevOps.

This repo is my resume, shipped in three formats from a single source of truth.
It also doubles as the demo site for [CloudBlox](https://github.com/Amir-Benyamini/), my personal IaC-platform project — the static build is deployed to AWS by CloudBlox itself.

- **Live site:** _(coming soon — deployed via CloudBlox)_
- **LinkedIn:** [amir-bini-benyamini](https://www.linkedin.com/in/amir-bini-benyamini/)
- **Email:** [benyamini.amir@gmail.com](mailto:benyamini.amir@gmail.com)

---

## What's in the repo

```
.
├── src/
│   ├── components.jsx         React components + RESUME data (source of truth)
│   ├── mount.jsx              App composition + accent/density tweaks
│   └── tweaks-panel.jsx       Tweaks panel (palette / density / scanlines)
├── static/
│   └── index.html             Static no-JS HTML version (also the PDF source)
├── scripts/
│   ├── build.js               Builds artifact.html from src/*.jsx (Node, zero deps)
│   └── build-pdf.sh           Renders the PDF via Chrome headless
├── artifact.html              BUILD OUTPUT: interactive React resume (committed)
├── Amir-Benyamini-Resume.pdf  BUILD OUTPUT: PDF (committed)
└── package.json               npm scripts wrapping the builds
```

`src/` is the source of truth. `artifact.html` and the PDF are committed build outputs — convenient to open without a build step, but always rebuild before deploying.

### The three formats

| Format | Use it for | File |
|---|---|---|
| **Interactive HTML** | "Wow" leave-behind. Has a working `bash`-style terminal — try `whoami`, `skills`, `ls /projects`. | `artifact.html` |
| **Static HTML** | The portable build. No JS dependencies, fast first paint, indexable, deploys to S3 + CloudFront in seconds. | `static/index.html` |
| **PDF** | The thing you attach to applications. Rendered from the static build. | `Amir-Benyamini-Resume.pdf` |

---

## Run it locally

Open either HTML directly in a browser — no install, no server, no build:

```sh
npm run preview                 # interactive (terminal + tweaks panel)
npm run preview:static          # static no-JS version
```

---

## Build (rebuild before every deploy)

The interactive `artifact.html` and the PDF are **build outputs**. Rebuild from source whenever you edit `src/` or `static/index.html`:

```sh
npm run build                   # rebuilds both artifact.html and the PDF
```

Or individually:

```sh
npm run build:artifact          # src/*.jsx → artifact.html (~67 KB)
npm run build:pdf               # static/index.html → Amir-Benyamini-Resume.pdf
```

Direct invocation (no npm needed):

```sh
node scripts/build.js
bash scripts/build-pdf.sh
```

### How the artifact build works

`scripts/build.js` is ~50 lines, zero dependencies (Node built-ins only). It:

1. Reads the `<style>` block from `static/index.html` so both versions share the exact same CSS (single source of styling).
2. Reads `src/tweaks-panel.jsx`, `src/components.jsx`, `src/mount.jsx` (load order matters — each exposes globals the next consumes).
3. Wraps everything in an HTML shell that loads React 18, ReactDOM, and Babel-standalone from unpkg (CDN). Babel transforms the JSX in the browser at load time.
4. Writes `artifact.html`.

There's no bundler (no esbuild, no Vite, no webpack). The "build step" is a string join. This keeps the dependency surface to zero and the build instant.

`scripts/build-pdf.sh` runs Chrome headless against `static/index.html` and saves the resulting PDF. macOS path; tweak `CHROME` for Linux.

---

## Deployment

**Always build first** so the deployed artifact reflects your latest source:

```sh
npm run build                   # artifact.html + PDF
# ...then deploy artifact.html (or static/index.html) to AWS / CDN
```

The site is hosted on AWS as `S3 (private) → CloudFront → Route 53 → ACM (TLS)`. CloudFront fetches `artifact.html` from a private S3 bucket via Origin Access Control; nothing in S3 is publicly readable.

Eventually the site is deployed via [CloudBlox](https://github.com/Amir-Benyamini/) using its `static-site` block:

```yaml
# .cloudblox/prod/blox.yaml
region: us-east-1
workloads:
  - type: static-site
    name: amir-resume
    source: ./           # serves artifact.html as index
    domain: amirbenyamini.dev      # placeholder
    cdn: true
```

`cloudblox deploy` provisions S3 + CloudFront + Route 53 + ACM end to end.
Self-demo: the platform deploys the resume that describes the platform.

---

## Design notes

Aesthetic is a dark terminal/HUD: green accent, mono headings, ASCII corner brackets, optional CRT scanlines.
The interactive build ships with a Tweaks panel (top-right gear) for palette, density, and scanline toggles.

Built with vanilla React (no bundler — Babel-in-browser at load time for the artifact). Static build uses no JS at all so it stays fast and indexable.

---

## License

The code (HTML/CSS/JSX scaffolding) is MIT.
The personal content — résumé text, name, contact info — is © Amir Benyamini.
Reuse the structure freely, swap the content for your own.

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
├── artifact.html              Interactive React/JSX resume (Claude.ai artifact bundle)
├── static/
│   └── index.html             Static, self-contained HTML version (no JS, no build)
├── src/
│   ├── components.jsx         React components + RESUME data
│   ├── mount.jsx              App composition + accent/density tweaks
│   └── tweaks-panel.jsx       Tweaks panel (palette / density / scanlines)
└── Amir-Benyamini-Resume.pdf  PDF rendered from static/index.html
```

### The three formats

| Format | Use it for | File |
|---|---|---|
| **Interactive HTML** | "Wow" leave-behind. Has a working `bash`-style terminal — try `whoami`, `skills`, `ls /projects`. | `artifact.html` |
| **Static HTML** | The portable build. No JS dependencies, fast first paint, indexable, deploys to S3 + CloudFront in seconds. | `static/index.html` |
| **PDF** | The thing you attach to applications. Rendered from the static build. | `Amir-Benyamini-Resume.pdf` |

---

## Run it locally

Open either HTML directly in a browser:

```sh
open artifact.html              # interactive (terminal works)
open static/index.html          # static
```

Re-render the PDF (Chrome headless):

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu \
  --no-pdf-header-footer --print-to-pdf-no-header \
  --print-to-pdf=Amir-Benyamini-Resume.pdf \
  --virtual-time-budget=2000 \
  "file://$(pwd)/static/index.html"
```

---

## Deployment

The static build is deployed to AWS via [CloudBlox](https://github.com/Amir-Benyamini/) using its `static-site` block:

```yaml
# .cloudblox/prod/blox.yaml
region: us-east-1
workloads:
  - type: static-site
    name: amir-resume
    source: ./static
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

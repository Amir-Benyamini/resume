#!/usr/bin/env node
/**
 * Build artifact.html from src/*.jsx + the static build's CSS.
 *
 * Output is a single self-contained HTML file that:
 *   - Loads React 18 + ReactDOM + Babel-standalone from a CDN
 *   - Inlines the three JSX modules as <script type="text/babel">
 *   - Reuses the static build's CSS so both versions look identical
 *
 * Zero dependencies. Just `node scripts/build.js`.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");
const STATIC_HTML = path.join(ROOT, "static", "index.html");
const OUT = path.join(ROOT, "artifact.html");

function read(p) {
  return fs.readFileSync(p, "utf8");
}

// 1. Pull the CSS block out of the static build so the artifact and the
//    static look identical. The static is the single source of truth for
//    visual styling, including the responsive @media rules.
const staticHtml = read(STATIC_HTML);
const cssMatch = staticHtml.match(/<style>([\s\S]*?)<\/style>/);
if (!cssMatch) {
  console.error("ERROR: could not extract <style> block from", STATIC_HTML);
  process.exit(1);
}
const css = cssMatch[1].trim();

// 2. Load JSX modules in dependency order:
//    tweaks-panel exposes globals → components uses them → mount composes everything.
const tweaksPanel = read(path.join(SRC_DIR, "tweaks-panel.jsx"));
const components = read(path.join(SRC_DIR, "components.jsx"));
const mount = read(path.join(SRC_DIR, "mount.jsx"));

// 3. Compose the final HTML. Inter + JetBrains Mono come from Google Fonts.
//    React/ReactDOM/Babel come from unpkg (locked to majors so behavior is stable).
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Amir Benyamini · DevOps Engineer</title>
<meta name="description" content="Amir Benyamini, DevOps Engineer. Platform Engineering, Self-Service IaC, CI/CD at Scale, AI-Augmented DevOps.">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<style>
${css}
</style>

<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>

<div id="root"></div>

<script type="text/babel" data-presets="react">
${tweaksPanel}
</script>

<script type="text/babel" data-presets="react">
${components}
</script>

<script type="text/babel" data-presets="react">
${mount}
</script>

</body>
</html>
`;

fs.writeFileSync(OUT, html);
const sizeKb = (html.length / 1024).toFixed(1);
console.log(`✓ wrote artifact.html  (${sizeKb} KB)`);

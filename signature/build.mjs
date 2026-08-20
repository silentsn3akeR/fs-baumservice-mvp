// FS Signature build — zero-dependency static generator.
//
// Kanonische Publikations-Schalter (eine Stelle, keine zweite Site-Variante):
//   FS_RELEASE=1                     -> Release-Posture (kein noindex, kein Preview-Banner)
//   PUBLIC_BASE=/fs-baumservice-mvp/ -> Basis-Pfad der GitHub-Pages-Project-Site
//   SITE_ORIGIN=https://...          -> Origin fuer canonical/OG (Default: github.io)
//   INCLUDE_RND=1                    -> R&D-Prototypen mitkopieren (nur lokal, nie Release)
import { mkdir, writeFile, copyFile, readdir, rm, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { BASE, SITE_ORIGIN } from "./lib.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, "dist");
const RELEASE = process.env.FS_RELEASE === "1";
const INCLUDE_RND = process.env.INCLUDE_RND === "1";
if (RELEASE && INCLUDE_RND) throw new Error("INCLUDE_RND ist im Release-Build nicht zulaessig.");

/* ---------- Base-Path ----------
   Einziger Mechanismus: die erzeugten Seiten werden nachbearbeitet und alle
   wurzel-absoluten Attribut-URLs (/x) auf BASE + /x umgeschrieben. site.css und
   site.js enthalten bewusst keine absoluten URLs; Font-Pfade in der CSS sind
   relativ zur CSS-Datei und damit automatisch base-path-korrekt. */
const ATTR = /\b(href|src|content|poster|action|formaction|data)="(\/(?!\/)[^"]*)"/g;
const SRCSET = /\bsrcset="([^"]*)"/g;
function applyBase(html) {
  if (!BASE) return html;
  return html
    .replace(SRCSET, (m, list) =>
      `srcset="${list.split(",").map((part) => {
        const seg = part.trim();
        if (!seg.startsWith("/")) return seg;
        const [url, ...rest] = seg.split(/\s+/);
        return [BASE + url, ...rest].join(" ");
      }).join(", ")}"`)
    .replace(ATTR, (m, attr, url) => `${attr}="${BASE}${url}"`);
}

/* ---------- Clean ---------- */
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

/* ---------- Seiten ---------- */
const pages = ["index", "spezialfaellung", "projekt-winterfaellung", "kontakt", "impressum", "datenschutz",
  "leistungen", "baumfaellung", "baumpflege", "wurzelstockfraesen", "heckenschnitt", "rollrasen",
  "projekte", "ueber-fs", "wissen"];

const routes = [];
for (const name of pages) {
  let mod;
  try {
    mod = await import(`./pages/${name}.mjs`);
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") continue;
    throw e;
  }
  const { route, html } = await mod.render();
  const outDir = path.join(DIST, ...route.split("/").filter(Boolean));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), applyBase(html));
  routes.push("/" + route.split("/").filter(Boolean).join("/") + (route ? "/" : ""));
  console.log("built", route || "/");
}

/* ---------- Statische Schicht ---------- */
await copyFile(path.join(ROOT, "src", "site.css"), path.join(DIST, "site.css"));
await copyFile(path.join(ROOT, "src", "site.js"), path.join(DIST, "site.js")).catch(() => writeFile(path.join(DIST, "site.js"), ""));

async function copyDir(from, to, filter = () => true) {
  await mkdir(to, { recursive: true });
  let n = 0;
  for (const f of await readdir(from)) {
    const s = path.join(from, f);
    if ((await stat(s)).isDirectory() || !filter(f)) continue;
    await copyFile(s, path.join(to, f));
    n++;
  }
  return n;
}

// Schriften (self-hosted, SIL OFL) — nur die woff2-Dateien in den Artefakt-Ordner.
const nf = await copyDir(path.join(ROOT, "fonts"), path.join(DIST, "fonts"), (f) => f.endsWith(".woff2"));
console.log("fonts copied:", nf);

// Medien-Derivate (versionierte Release-Assets aus signature/media).
const nm = await copyDir(path.join(ROOT, "media"), path.join(DIST, "media"));
console.log("media copied:", nm);

/* ---------- R&D: lokal nutzbar, nie im Release ---------- */
if (INCLUDE_RND) {
  await copyDir(path.join(ROOT, "rnd"), path.join(DIST, "rnd"));
  console.log("rnd prototypes included (local only)");
}

/* ---------- robots + sitemap ---------- */
const canonical = (r) => `${SITE_ORIGIN}${BASE}${r}`;
await writeFile(path.join(DIST, "robots.txt"),
  RELEASE
    ? `User-agent: *\nAllow: /\nSitemap: ${canonical("/sitemap.xml")}\n`
    : `User-agent: *\nDisallow: /\n`);
await writeFile(path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map((r) => `  <url><loc>${canonical(r)}</loc></url>`).join("\n") +
  `\n</urlset>\n`);

// GitHub Pages: kein Jekyll-Processing.
await writeFile(path.join(DIST, ".nojekyll"), "");

console.log(`done — release=${RELEASE} base="${BASE || "/"}" routes=${routes.length}`);

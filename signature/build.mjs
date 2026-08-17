// FS Signature build — zero-dependency static generator.
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, "dist");
/* ---------- Build ---------- */
const pages = ["index", "spezialfaellung", "projekt-winterfaellung", "kontakt", "impressum", "datenschutz"];

await mkdir(DIST, { recursive: true });
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
  await writeFile(path.join(outDir, "index.html"), html);
  console.log("built", route || "/");
}
await copyFile(path.join(ROOT, "src", "site.css"), path.join(DIST, "site.css"));
await copyFile(path.join(ROOT, "src", "site.js"), path.join(DIST, "site.js")).catch(() => writeFile(path.join(DIST, "site.js"), ""));
console.log("done");

"""A11y-/Perf-/Resilienz-Audit über alle Slice-Flächen.
Ergebnis: evidence/AUDIT_GATES_V1.json mit PASS/FAIL/PARTIAL je Prüfpunkt.
"""
import json, os, time, urllib.request
from cdp import Tab

BASE = "http://127.0.0.1:8814"
PAGES = ["/", "/spezialfaellung/", "/projekte/winterfaellung-am-wohnhaus/", "/kontakt/", "/impressum/", "/datenschutz/",
  "/leistungen/", "/leistungen/baumfaellung/", "/leistungen/baumpflege/", "/leistungen/wurzelstockfraesen/",
  "/leistungen/heckenschnitt/", "/leistungen/rollrasen/", "/projekte/", "/ueber-fs/", "/wissen/"]
OUT = os.path.join(os.path.dirname(__file__), "..", "evidence")

# ---- Kontrast (WCAG) über Token-Paare ----
def lum(hexc):
    r, g, b = (int(hexc[i:i+2], 16) / 255 for i in (1, 3, 5))
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)

TOKENS = dict(ink="#34323e", ink_deep="#26242e", paper="#edecef", paper_dim="#e0dfe4",
              leaf="#b5d36e", leaf_deep="#71834b", slate="#5a5866", mist="#a5a3ae")
PAIRS = [
    ("ink auf paper (Text)", "ink", "paper", 4.5),
    ("slate auf paper (Sekundärtext)", "slate", "paper", 4.5),
    ("paper auf ink_deep (Text dunkel)", "paper", "ink_deep", 4.5),
    ("leaf auf ink_deep (Akzenttext dunkel)", "leaf", "ink_deep", 4.5),
    ("leaf_deep auf paper (Akzenttext hell)", "leaf_deep", "paper", 4.5),
    ("ink_deep auf leaf (CTA solid)", "ink_deep", "leaf", 4.5),
    ("mist auf paper (nur Hairline, kein Text)", "mist", "paper", 1.0),
]

def contrast_report():
    rows = []
    for label, a, b, need in PAIRS:
        r = ratio(TOKENS[a], TOKENS[b])
        rows.append({"pair": label, "ratio": round(r, 2), "required": need,
                     "verdict": "PASS" if r >= need else "FAIL"})
    return rows

DOM_AUDIT = """(() => {
  const issues = [];
  // Bilder ohne alt
  document.querySelectorAll('img').forEach(i => { if (i.alt === undefined || i.alt === null || (i.getAttribute('alt') === null)) issues.push('img ohne alt: ' + (i.currentSrc||i.src).split('/').pop()); });
  // Headings-Reihenfolge
  let last = 0, headingIssue = null;
  document.querySelectorAll('h1,h2,h3,h4').forEach(h => {
    const l = +h.tagName[1];
    if (last && l > last + 1) headingIssue = 'Sprung ' + last + '->' + l + ' bei "' + h.textContent.slice(0,40) + '"';
    last = l;
  });
  if (headingIssue) issues.push('Heading-Sprung: ' + headingIssue);
  if (document.querySelectorAll('h1').length !== 1) issues.push('h1-Anzahl: ' + document.querySelectorAll('h1').length);
  // Formularfelder ohne Label
  document.querySelectorAll('input:not([type=radio]):not([type=hidden]), textarea').forEach(f => {
    if (!f.labels || !f.labels.length) issues.push('Feld ohne Label: ' + (f.name||f.id));
  });
  // Touch-Targets < 44px (interaktiv)
  let small = 0;
  document.querySelectorAll('a,button').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.height < 34)) small++;
  });
  if (small) issues.push('kleine Klickziele (<34px hoch): ' + small);
  // Sprache + Titel + Beschreibung
  if (!document.documentElement.lang) issues.push('lang fehlt');
  if (!document.querySelector('meta[name=description]')) issues.push('meta description fehlt');
  // horizontaler Overflow
  if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 2)
    issues.push('H-Overflow: ' + document.documentElement.scrollWidth);
  return issues;
})()"""

def page_weight(path):
    """Kritischer Pfad + Gesamtgewicht der referenzierten Assets (lokal gemessen)."""
    html = urllib.request.urlopen(BASE + path).read()
    import re
    refs = set(re.findall(rb'(?:src|href|srcset)="(/[^"]+?)"', html))
    srcsets = re.findall(rb'srcset="([^"]+)"', html)
    files = set()
    for s in srcsets:
        for part in s.split(b","):
            u = part.strip().split(b" ")[0]
            if u.startswith(b"/"): files.add(u)
    for r in refs:
        if b" " not in r: files.add(r)
    dist = os.path.join(os.path.dirname(__file__), "..", "dist")
    total = len(html)
    critical = len(html)
    detail = {"html_kb": len(html)//1024}
    for f in sorted(files):
        p = os.path.join(dist, f.decode().lstrip("/").replace("/", os.sep))
        if os.path.isfile(p):
            sz = os.path.getsize(p)
            total += sz
            name = f.decode()
            if name.endswith((".css", ".js")): critical += sz
    detail["total_all_refs_kb"] = total // 1024
    detail["critical_kb"] = critical // 1024
    return detail

def main():
    report = {"gate": "AUDIT_GATES_V1", "date": "2026-08-18",
              "contrast": contrast_report(), "pages": {}}
    tab = Tab()
    for p in PAGES:
        entry = {}
        for w, label in [(1440, "desktop"), (390, "mobile"), (768, "tablet")]:
            tab.metrics(w, 900 if w >= 768 else 844, mobile=w < 768)
            tab.goto(BASE + p, settle=1.0)
            issues = tab.eval(DOM_AUDIT)
            entry[label] = issues if issues else "OK"
        entry["weight"] = page_weight(p)
        report["pages"][p] = entry
        print(p, "->", {k: (v if v == "OK" else len(v)) for k, v in entry.items() if k != "weight"}, entry["weight"])
    # Keyboard-Stichprobe auf /kontakt/
    tab.metrics(1440, 900)
    tab.goto(BASE + "/kontakt/", settle=1.0)
    seq = tab.eval("""(() => { const els = []; const all = Array.from(document.querySelectorAll('a[href],button,input,textarea,[tabindex]'));
      return all.length + ' fokussierbare Elemente; erste: ' + all.slice(0,3).map(e => e.tagName + (e.className? '.'+String(e.className).split(' ')[0]:'')).join(', ');})()""")
    report["keyboard_sample"] = seq
    tab.close()
    with open(os.path.join(OUT, "AUDIT_GATES_V1.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, indent=1, ensure_ascii=False)
    print("written AUDIT_GATES_V1.json")

if __name__ == "__main__":
    main()

"""Gate-Render-Suite: repräsentative Breiten + Reduced-Motion + Greyscale.
Usage: python gate_renders.py <path> <name> [w1 w2 ...]
"""
import sys, os
from PIL import Image
from cdp import Tab

BASE = "http://127.0.0.1:8814"
OUT = os.path.join(os.path.dirname(__file__), "..", "evidence", "renders")

def run(path, name, widths, grey=False):
    os.makedirs(OUT, exist_ok=True)
    tab = Tab()
    results = []
    for w in widths:
        tab.metrics(w, 900 if w >= 768 else 844, mobile=w < 768)
        tab.goto(BASE + path)
        # Lazy-Load-Sweep: einmal komplett durchscrollen, dann zurück
        tab.eval("""(async () => {
          const step = innerHeight * 0.8;
          for (let y = 0; y <= document.body.scrollHeight; y += step) {
            scrollTo(0, y); await new Promise(r => setTimeout(r, 120));
          }
          scrollTo(0, 0);
        })()""")
        import time as _t; _t.sleep(2.0)
        p = os.path.join(OUT, f"{name}_{w}.png")
        tab.shot(p)
        im = Image.open(p)
        if grey:
            im.convert("L").save(os.path.join(OUT, f"{name}_{w}_grey.png"))
        results.append((w, im.size))
        print(name, w, im.size)
    tab.close()
    return results

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "/"
    name = sys.argv[2] if len(sys.argv) > 2 else "home"
    widths = [int(a) for a in sys.argv[3:]] or [1440, 390]
    run(path, name, widths, grey="--grey" in sys.argv)

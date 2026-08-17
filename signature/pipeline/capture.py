"""Headless-Edge capture harness — deterministic multi-viewport renders.
Usage: python capture.py <url_path> <name> [widths...]  (defaults: gate set)
Writes PNGs to signature/evidence/renders/.
"""
import subprocess, sys, os
from PIL import Image

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE):
    EDGE = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
BASE = "http://127.0.0.1:8814"
OUT = os.path.join(os.path.dirname(__file__), "..", "evidence", "renders")

def shot(url, out, w, h, extra=None):
    args = [EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars",
            f"--screenshot={out}", f"--window-size={w},{h}"]
    if extra: args += extra
    args.append(url)
    subprocess.run(args, capture_output=True, timeout=60)
    return os.path.exists(out)

def capture(path, name, widths):
    os.makedirs(OUT, exist_ok=True)
    for w in widths:
        # tall window to approximate full page, then trim uniform bottom
        h = 6000 if w >= 768 else 9000
        out = os.path.join(OUT, f"{name}_{w}.png")
        shot(BASE + path, out, w, h)
        im = Image.open(out)
        print(name, w, im.size)

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "/"
    name = sys.argv[2] if len(sys.argv) > 2 else "home"
    widths = [int(a) for a in sys.argv[3:]] or [1440, 390]
    capture(path, name, widths)

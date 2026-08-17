"""FS Signature media pipeline — deterministic derivatives from registered masters.

Lineage rule (media.json): <master_id>__<slot>__<w>.<fmt>. No ad-hoc files.
Crops/grading allowed; meaning changes forbidden.
"""
import os, subprocess, json, sys
from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
import imageio_ffmpeg

REPO = r"C:\Users\s\.gemini\antigravity-ide\scratch\fs-baumservice-mvp"
OUT = os.path.join(os.path.dirname(__file__), "..", "dist", "media")
FF = imageio_ffmpeg.get_ffmpeg_exe()

IMG = lambda p: os.path.join(REPO, "assets", "img", p)
VID = lambda p: os.path.join(REPO, "assets", "video", "instagram", p)

# master_id -> (source, slot, widths, crop_box_fractions or None, focal for ratio crops)
STILL_JOBS = [
    ("M-01", IMG("drohne-026.jpg"),  "hero",     [2560, 1920, 1440, 960, 640], None),
    # mobile hero: 4:5 portrait centered on climber (focal x=0.49)
    ("M-01", IMG("drohne-026.jpg"),  "heromob",  [960, 640], ("ratio", 4/5, 0.49, 0.5)),
    ("M-03", IMG("IMG_0718.jpg"),    "monument", [1920, 1440, 960, 640], None),
    ("M-04", IMG("SAM_0275.jpg"),    "scale",    [1440, 960, 640], None),
    ("M-05", IMG("IMG_0274.jpg"),    "action",   [1440, 960, 640], None),
    ("M-07", IMG("SAM_0337.jpg"),    "praezision", [1440, 960, 640], None),
    ("M-09", IMG("baumpflege-zollernalb-arbeitseinsatz.jpg"), "silence", [1600, 960, 640], None),
    ("M-06", IMG("baumfaellung-bisingen-seilklettertechnik.jpg"), "action2", [1440, 960], None),
    ("M-10", IMG("heckenschnitt-grundstueckspflege.jpg"), "kran-abend", [1440, 960], None),
    ("M-02", IMG("baumservice-luftbild-projekt.jpg"), "luft", [1440, 960, 640], None),
]

# Dekonstruktions-Crops aus M-01 (Bedeutung unverändert: reine Ausschnitte)
CROP_JOBS = [
    ("M-01", IMG("drohne-026.jpg"), "crop-kletterer", (0.36, 0.20, 0.62, 0.66), [960, 640]),
    ("M-01", IMG("drohne-026.jpg"), "crop-haus",      (0.04, 0.00, 0.40, 0.42), [960, 640]),
    ("M-01", IMG("drohne-026.jpg"), "crop-seile",     (0.30, 0.00, 0.72, 0.42), [960, 640]),
]

# video frame extraction: (video, t_seconds, master_id, slot, widths)
FRAME_JOBS = [
    ("20260313_DV15j08CA4g_1.mp4", 8.0,  "V-05", "kronenflug", [720]),
    ("20260313_DV15j08CA4g_1.mp4", 35.5, "V-05", "maschinenflug", [720]),
    ("20260319_DWFOXXbCIA2_1.mp4", 25.5, "V-06", "stiefel-seil", [720]),
    ("20260319_DWFOXXbCIA2_1.mp4", 7.0,  "V-06", "pov-daecher", [720]),
    ("20260227_DVR2eCCDGgQ_1.mp4", 8.0,  "V-03", "absperrung", [720]),
    ("20260226_DVPHv_IiJYu_1.mp4", 15.0, "V-02", "schnittflaeche", [720]),
    ("20260226_DVPHv_IiJYu_1.mp4", 9.0,  "V-02", "nebel", [720]),
    ("20260331_DWigl6XCGvF_1.mp4", 11.0, "V-07", "hangmulcher", [720]),
    ("20260305_DVgrYMriAml_1.mp4", 14.0, "V-04", "ergebnis", [720]),
]

# muted loops for motion phase: (video, start, dur, master_id, slot)
LOOP_JOBS = [
    ("20260319_DWFOXXbCIA2_1.mp4", 5.0, 8.0, "V-06", "pov-loop"),
    ("20260313_DV15j08CA4g_1.mp4", 33.0, 8.0, "V-05", "flug-loop"),
    ("20260331_DWigl6XCGvF_1.mp4", 8.0, 7.0, "V-07", "mulcher-loop"),
]

def save_still(im, mid, slot, w, manifest):
    scale = w / im.width
    out = im.resize((w, round(im.height * scale)), Image.LANCZOS) if scale < 1 else im.copy()
    base = f"{mid}__{slot}__{w}"
    for fmt, kw in (("webp", dict(quality=80, method=6)), ("jpg", dict(quality=82, optimize=True, progressive=True))):
        p = os.path.join(OUT, f"{base}.{fmt}")
        out.convert("RGB").save(p, **kw)
        manifest.append({"file": os.path.basename(p), "master": mid, "slot": slot,
                         "w": out.width, "h": out.height, "kb": os.path.getsize(p) // 1024})

def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    for mid, src, slot, widths, crop in STILL_JOBS:
        im = Image.open(src).convert("RGB")
        if crop and crop[0] == "ratio":
            _, ratio, fx, fy = crop
            cw = min(im.width, round(im.height * ratio))
            ch = min(im.height, round(cw / ratio))
            x0 = min(max(round(fx * im.width - cw / 2), 0), im.width - cw)
            y0 = min(max(round(fy * im.height - ch / 2), 0), im.height - ch)
            im = im.crop((x0, y0, x0 + cw, y0 + ch))
        for w in widths:
            if w <= im.width or w == min(widths):
                save_still(im, mid, slot, min(w, im.width), manifest)
    for mid, src, slot, (fx0, fy0, fx1, fy1), widths in CROP_JOBS:
        im = Image.open(src).convert("RGB")
        im = im.crop((round(fx0 * im.width), round(fy0 * im.height),
                      round(fx1 * im.width), round(fy1 * im.height)))
        for w in widths:
            save_still(im, mid, slot, min(w, im.width), manifest)
    tmp = os.path.join(OUT, "_frame.png")
    for vid, t, mid, slot, widths in FRAME_JOBS:
        subprocess.run([FF, "-ss", str(t), "-i", VID(vid), "-frames:v", "1", "-y", tmp],
                       capture_output=True, check=True)
        im = Image.open(tmp).convert("RGB")
        for w in widths:
            save_still(im, mid, slot, min(w, im.width), manifest)
    os.remove(tmp)
    for vid, start, dur, mid, slot in LOOP_JOBS:
        p = os.path.join(OUT, f"{mid}__{slot}.mp4")
        subprocess.run([FF, "-ss", str(start), "-t", str(dur), "-i", VID(vid),
                        "-an", "-vf", "scale=720:-2", "-c:v", "libx264", "-crf", "26",
                        "-preset", "slow", "-movflags", "+faststart", "-y", p],
                       capture_output=True, check=True)
        manifest.append({"file": os.path.basename(p), "master": mid, "slot": slot,
                         "kb": os.path.getsize(p) // 1024, "type": "loop"})
    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1)
    total = sum(m["kb"] for m in manifest)
    print(f"{len(manifest)} derivatives, {total} KB total")
    for m in manifest:
        if m["kb"] > 2600: print("OVER BUDGET:", m)

if __name__ == "__main__":
    main()

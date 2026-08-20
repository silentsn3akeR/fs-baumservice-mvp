"""Minimal CDP driver over headless Edge — full-page captures with true
viewport metrics, media emulation and JS eval for the red-team gates."""
import subprocess, json, base64, time, os, urllib.request, atexit
import websocket

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE):
    EDGE = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
PORT = 9337
_proc = None
_msg_id = 0

def _ensure_edge():
    global _proc
    try:
        urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=1)
        return
    except Exception:
        pass
    _proc = subprocess.Popen([
        EDGE, "--headless=new", "--disable-gpu", f"--remote-debugging-port={PORT}", "--remote-allow-origins=*",
        "--no-first-run", "--user-data-dir=" + os.path.join(os.environ["TEMP"], "fs_cdp_profile"),
        "about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(50):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=1)
            return
        except Exception:
            time.sleep(0.2)
    raise RuntimeError("edge did not start")

def _cleanup():
    if _proc: _proc.kill()
atexit.register(_cleanup)

class Tab:
    def __init__(self):
        _ensure_edge()
        req = urllib.request.Request(f"http://127.0.0.1:{PORT}/json/new?about:blank", method="PUT")
        info = json.load(urllib.request.urlopen(req, timeout=5))
        self.ws = websocket.create_connection(info["webSocketDebuggerUrl"], timeout=30)
        self.send("Page.enable")
        self.send("Runtime.enable")

    def send(self, method, **params):
        global _msg_id
        _msg_id += 1
        mid = _msg_id
        self.ws.send(json.dumps({"id": mid, "method": method, "params": params}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == mid:
                if "error" in msg: raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})

    def goto(self, url, settle=1.2):
        self.send("Page.navigate", url=url)
        deadline = time.time() + 15
        while time.time() < deadline:
            msg = json.loads(self.ws.recv())
            if msg.get("method") == "Page.loadEventFired":
                break
        time.sleep(settle)

    def metrics(self, width, height, mobile=False, dsf=1):
        self.send("Emulation.setDeviceMetricsOverride", width=width, height=height,
                  deviceScaleFactor=dsf, mobile=mobile)

    def media(self, features):
        self.send("Emulation.setEmulatedMedia", features=features)

    def eval(self, expr):
        r = self.send("Runtime.evaluate", expression=expr, returnByValue=True)
        return r.get("result", {}).get("value")

    def shot(self, path, full=True):
        params = dict(format="png", captureBeyondViewport=full)
        if full:
            m = self.send("Page.getLayoutMetrics")
            cs = m["cssContentSize"]
            params["clip"] = dict(x=0, y=0, width=cs["width"], height=min(cs["height"], 16000), scale=1)
        data = self.send("Page.captureScreenshot", **params)["data"]
        with open(path, "wb") as f:
            f.write(base64.b64decode(data))
        return path

    def close(self):
        try: self.ws.close()
        except Exception: pass

/**
 * ATOMS barcode / IMEI scanner — camera (BarcodeDetector + html5-qrcode) and USB wedge.
 * ATUM-style: hardware scanners type into focused fields; camera fills scan targets.
 */
(() => {
  let scanTarget = null;
  let scanStream = null;
  let scanRaf = 0;
  let html5Qr = null;
  let onScanCallback = null;

  function normalizeScanValue(raw, minLen = 6) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (digits.length >= 14) return digits;
    const alnum = String(raw || '').trim();
    if (alnum.length >= minLen) return alnum;
    return digits.length >= minLen ? digits : alnum;
  }

  function ensureScanner() {
    if (document.getElementById('atoms-scanner')) return;
    const el = document.createElement('div');
    el.id = 'atoms-scanner';
    el.className = 'atoms-scanner hidden';
    el.innerHTML = `
      <div class="atoms-scanner-card">
        <div class="atoms-scanner-head">
          <strong>Scan barcode or IMEI</strong>
          <p class="atoms-muted">Point the camera at the label, or use a USB scanner on the field behind this dialog.</p>
        </div>
        <div id="atoms-scan-reader" class="atoms-scan-reader"></div>
        <video id="atoms-scan-video" class="atoms-scan-video-fallback" playsinline autoplay muted hidden></video>
        <p id="atoms-scan-status" class="atoms-scan-status atoms-muted">Starting camera…</p>
        <div class="atoms-actions">
          <button type="button" class="atoms-btn ghost" id="atoms-scan-close">Close</button>
          <button type="button" class="atoms-btn ghost" id="atoms-scan-manual">Type manually</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    document.getElementById('atoms-scan-close').addEventListener('click', stopScan);
    document.getElementById('atoms-scan-manual').addEventListener('click', () => {
      const typed = window.prompt('Enter IMEI or barcode:', '');
      if (typed) finishScan(typed);
    });
  }

  function setStatus(msg) {
    const el = document.getElementById('atoms-scan-status');
    if (el) el.textContent = msg;
  }

  function finishScan(raw) {
    const value = normalizeScanValue(raw);
    if (!value || value.length < 6) {
      setStatus('Could not read a valid code — try again or type manually.');
      return;
    }
    const target = scanTarget;
    stopScan();
    if (typeof onScanCallback === 'function') {
      onScanCallback(value, target);
    }
  }

  async function startBarcodeDetectorLoop(video) {
    if (!('BarcodeDetector' in window)) return false;
    try {
      const det = new BarcodeDetector({ formats: ['code_128', 'ean_13', 'ean_8', 'qr_code', 'code_39', 'itf', 'upc_a'] });
      const tick = async () => {
        if (!scanStream) return;
        try {
          const codes = await det.detect(video);
          const raw = codes[0]?.rawValue;
          if (raw) {
            finishScan(raw);
            return;
          }
        } catch (_) { /* keep scanning */ }
        scanRaf = requestAnimationFrame(tick);
      };
      scanRaf = requestAnimationFrame(tick);
      setStatus('Camera active — align the barcode in frame.');
      return true;
    } catch (_) {
      return false;
    }
  }

  async function startHtml5Qrcode() {
    if (typeof Html5Qrcode === 'undefined') return false;
    const readerId = 'atoms-scan-reader';
    const readerEl = document.getElementById(readerId);
    const video = document.getElementById('atoms-scan-video');
    if (!readerEl) return false;
    readerEl.hidden = false;
    if (video) video.hidden = true;
    html5Qr = new Html5Qrcode(readerId);
    const config = { fps: 12, qrbox: { width: 280, height: 160 }, aspectRatio: 1.777 };
    const cameras = await Html5Qrcode.getCameras().catch(() => []);
    const camId = cameras.length ? cameras[cameras.length - 1].id : { facingMode: 'environment' };
    await html5Qr.start(
      camId,
      config,
      (text) => finishScan(text),
      () => {}
    );
    setStatus('Camera active — align the barcode in frame.');
    return true;
  }

  async function startScan(targetId, callback) {
    ensureScanner();
    scanTarget = targetId;
    onScanCallback = callback;
    const overlay = document.getElementById('atoms-scanner');
    overlay.classList.remove('hidden');
    setStatus('Starting camera…');
    const readerEl = document.getElementById('atoms-scan-reader');
    const video = document.getElementById('atoms-scan-video');
    if (readerEl) {
      readerEl.innerHTML = '';
      readerEl.hidden = true;
    }
    if (video) video.hidden = false;

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera not supported in this browser.');
      }
      scanStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (video) {
        video.srcObject = scanStream;
        await video.play();
      }
      const nativeOk = video ? await startBarcodeDetectorLoop(video) : false;
      if (!nativeOk) {
        scanStream.getTracks().forEach((t) => t.stop());
        scanStream = null;
        if (video) video.srcObject = null;
        await startHtml5Qrcode();
      }
    } catch (err) {
      if (typeof Html5Qrcode !== 'undefined') {
        try {
          await startHtml5Qrcode();
          return;
        } catch (_) { /* fall through */ }
      }
      overlay.classList.add('hidden');
      const typed = window.prompt(`Camera unavailable (${err.message || 'permission denied'}). Enter IMEI or barcode:`, '');
      if (typed) finishScan(typed);
      else stopScan();
    }
  }

  function stopScan() {
    if (scanRaf) cancelAnimationFrame(scanRaf);
    scanRaf = 0;
    if (html5Qr) {
      html5Qr.stop().catch(() => {}).finally(() => {
        html5Qr.clear().catch(() => {});
        html5Qr = null;
      });
    }
    if (scanStream) {
      scanStream.getTracks().forEach((t) => t.stop());
      scanStream = null;
    }
    const video = document.getElementById('atoms-scan-video');
    if (video) video.srcObject = null;
    document.getElementById('atoms-scanner')?.classList.add('hidden');
    scanTarget = null;
  }

  /** USB / Bluetooth barcode wedge: rapid keystrokes ending with Enter. */
  function bindWedge(root = document) {
    const MIN_LEN = 6;
    const GAP_MS = 120;
    const buffers = new WeakMap();

    root.querySelectorAll('[data-atoms-scan-input]').forEach((input) => {
      if (input.dataset.atomsWedgeBound) return;
      input.dataset.atomsWedgeBound = '1';
      input.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const state = buffers.get(input) || { buf: '', t: 0 };
        const now = Date.now();
        if (now - state.t > GAP_MS) state.buf = '';
        state.t = now;
        if (e.key === 'Enter') {
          const code = state.buf.trim();
          state.buf = '';
          buffers.set(input, state);
          if (code.length >= MIN_LEN) {
            e.preventDefault();
            input.value = code.replace(/\s+/g, '');
            input.dispatchEvent(new CustomEvent('atoms-filled', { bubbles: true }));
          }
          return;
        }
        if (e.key.length === 1) {
          state.buf += e.key;
          buffers.set(input, state);
        }
      });
    });
  }

  window.AtomsScanner = { startScan, stopScan, bindWedge, normalizeScanValue };
})();

import { useState, useRef } from "react";

/* ============================================================
   QUILTY AS CHARGED
   A patchwork-themed toolkit: pixel-art quilt designer, fabric
   math, backing & binding, size chart, and a pre-cut cheat sheet.
   ============================================================ */

const WOF = 42; // usable width of fabric, inches

const palette = {
  muslin: "#FAF3E3",
  butter: "#F6C453",
  rose: "#E8879B",
  sage: "#8FAE8B",
  denim: "#5B7B9A",
  cherry: "#C94F4F",
  thread: "#4A3B32",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

.qc-root {
  font-family: 'Nunito', sans-serif;
  background: ${palette.muslin};
  background-image: radial-gradient(#e8dcc3 1px, transparent 1px);
  background-size: 22px 22px;
  min-height: 100vh;
  color: ${palette.thread};
  padding: 24px 16px 48px;
}
.qc-wrap { max-width: 760px; margin: 0 auto; }

/* ---------- Patchwork header ---------- */
.qc-header {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 3px solid ${palette.thread};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 6px 6px 0 rgba(74,59,50,.18);
  margin-bottom: 10px;
}
.qc-patch {
  min-height: 64px;
  border: 1.5px dashed rgba(255,255,255,.75);
  outline: 1px solid rgba(74,59,50,.25);
}
.p-gingham {
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,.45) 0 8px, transparent 8px 16px),
    repeating-linear-gradient(90deg, rgba(255,255,255,.45) 0 8px, transparent 8px 16px),
    ${palette.rose};
}
.p-dots {
  background: radial-gradient(circle at 6px 6px, #fff8 3px, transparent 3.5px);
  background-size: 16px 16px;
  background-color: ${palette.denim};
}
.p-stripe {
  background: repeating-linear-gradient(45deg, ${palette.butter} 0 10px, #fff5 10px 18px);
}
.p-leaf {
  background: radial-gradient(circle at 4px 12px, #fff6 2.5px, transparent 3px),
              radial-gradient(circle at 12px 4px, #fff6 2.5px, transparent 3px);
  background-size: 18px 18px;
  background-color: ${palette.sage};
}
.p-cherry {
  background: repeating-linear-gradient(-45deg, ${palette.cherry} 0 12px, #d96a6a 12px 24px);
}
.qc-title-patch {
  grid-column: span 2;
  background: #fffdf7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
  text-align: center;
}
.qc-title {
  font-family: 'Fredoka', sans-serif;
  font-weight: 700;
  font-size: clamp(1.35rem, 5vw, 2rem);
  line-height: 1.05;
  letter-spacing: .5px;
}
.qc-sub {
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: ${palette.cherry};
  margin-top: 4px;
}

/* ---------- Swatch tabs ---------- */
.qc-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 20px;
}
.qc-tab {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: .92rem;
  border: 2.5px solid ${palette.thread};
  border-radius: 10px;
  padding: 9px 14px;
  cursor: pointer;
  position: relative;
  color: ${palette.thread};
  box-shadow: 3px 3px 0 rgba(74,59,50,.2);
  transition: transform .12s ease, box-shadow .12s ease;
  transform: rotate(var(--tilt, 0deg));
}
.qc-tab:hover { transform: translateY(-2px) rotate(var(--tilt, 0deg)); }
.qc-tab:focus-visible { outline: 3px solid ${palette.denim}; outline-offset: 2px; }
.qc-tab.active {
  box-shadow: 1px 1px 0 rgba(74,59,50,.35);
  transform: translateY(1px);
}
.qc-tab .pin {
  position: absolute; top: -7px; left: 50%;
  width: 10px; height: 10px; border-radius: 50%;
  transform: translateX(-50%);
  background: ${palette.thread};
  border: 2px solid #fffdf7;
  display: none;
}
.qc-tab.active .pin { display: block; }

/* ---------- Cards ---------- */
.qc-card {
  background: #fffdf7;
  border: 3px solid ${palette.thread};
  border-radius: 14px;
  padding: 20px;
  box-shadow: 6px 6px 0 rgba(74,59,50,.15);
  position: relative;
}
.qc-card::before {
  content: "";
  position: absolute; inset: 6px;
  border: 2px dashed rgba(74,59,50,.28);
  border-radius: 9px;
  pointer-events: none;
}
.qc-card h2 {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0 0 4px;
}
.qc-card .hint { font-size: .85rem; color: #7a6a5e; margin: 0 0 16px; }

.qc-fields { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
.qc-field { display: flex; flex-direction: column; gap: 4px; flex: 1 1 130px; }
.qc-field label { font-size: .78rem; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }
.qc-field input, .qc-field select {
  font-family: 'Nunito', sans-serif;
  font-size: 1rem; font-weight: 700;
  padding: 9px 10px;
  border: 2px solid ${palette.thread};
  border-radius: 8px;
  background: ${palette.muslin};
  color: ${palette.thread};
  width: 100%;
  box-sizing: border-box;
}
.qc-field input:focus-visible, .qc-field select:focus-visible {
  outline: 3px solid ${palette.butter}; outline-offset: 1px;
}

.qc-result {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.qc-stat {
  border: 2px solid ${palette.thread};
  border-radius: 10px;
  padding: 12px;
  text-align: center;
}
.qc-stat .big { font-family: 'Fredoka', sans-serif; font-size: 1.5rem; font-weight: 700; line-height: 1.1; }
.qc-stat .lbl { font-size: .74rem; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; }
.s-butter { background: #fbe3ae; }
.s-rose { background: #f6cdd6; }
.s-sage { background: #d3e0d1; }
.s-denim { background: #cfdce8; }

/* ---------- Tables ---------- */
.qc-table { width: 100%; border-collapse: collapse; font-size: .92rem; }
.qc-table th, .qc-table td {
  border-bottom: 2px dashed rgba(74,59,50,.25);
  padding: 9px 8px;
  text-align: left;
}
.qc-table th {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: .82rem;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.qc-table tr:last-child td { border-bottom: none; }
.qc-chip {
  display: inline-block;
  font-size: .74rem; font-weight: 800;
  padding: 2px 8px; border-radius: 999px;
  border: 1.5px solid ${palette.thread};
}

/* ---------- Pixel-to-quilt designer ---------- */
.px-toolbar { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px; margin-bottom: 14px; }
.px-palette { display: flex; flex-wrap: wrap; gap: 6px; }
.px-swatch {
  width: 30px; height: 30px;
  border: 2px solid ${palette.thread};
  border-radius: 7px;
  cursor: pointer;
  box-shadow: 2px 2px 0 rgba(74,59,50,.2);
  padding: 0;
}
.px-swatch.selected {
  outline: 3px solid ${palette.thread};
  outline-offset: 2px;
  transform: translateY(1px);
  box-shadow: none;
}
.px-swatch:focus-visible { outline: 3px solid ${palette.denim}; outline-offset: 2px; }
.px-grid {
  display: grid;
  border: 3px solid ${palette.thread};
  border-radius: 10px;
  overflow: hidden;
  touch-action: none;
  user-select: none;
  background: #fff;
  box-shadow: 4px 4px 0 rgba(74,59,50,.15);
  cursor: crosshair;
  max-width: 480px;
}
.px-cell {
  aspect-ratio: 1;
  border: 1px dashed rgba(74,59,50,.18);
}
.px-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.px-btn {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600; font-size: .85rem;
  border: 2px solid ${palette.thread};
  border-radius: 999px;
  padding: 6px 14px;
  cursor: pointer;
  background: ${palette.muslin};
  box-shadow: 2px 2px 0 rgba(74,59,50,.25);
}
.px-btn:active { transform: translateY(1px); box-shadow: none; }
.px-legend { margin-top: 16px; }
.px-key {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid ${palette.thread};
  border-radius: 4px;
  vertical-align: -3px;
  margin-right: 6px;
}

.cw-studio {
  border: 2px dashed rgba(74,59,50,.3);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 14px;
  background: #fbf7ec;
}
.cw-summary {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: .95rem;
  cursor: pointer;
  padding: 2px 0;
  list-style: none;
}
.cw-summary::-webkit-details-marker { display: none; }
.cw-summary::before { content: "▸ "; }
details[open] > .cw-summary::before { content: "▾ "; }
details[open] > .cw-summary { margin-bottom: 10px; }
.cw-mypal {
  border-top: 2px dashed rgba(74,59,50,.25);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cw-mypal-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end; }
.cw-tabs { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 10px; }
.cw-tab {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600; font-size: .8rem;
  border: 2px solid ${palette.thread};
  border-radius: 999px;
  padding: 4px 12px;
  cursor: pointer;
  background: ${palette.muslin};
}
.cw-tab.active { background: ${palette.butter}; box-shadow: inset 1px 1px 0 rgba(74,59,50,.25); }
.cw-preview { margin-left: auto; font-size: .78rem; font-weight: 800; }
.cw-row { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; }
.cw-wheel {
  width: 180px; height: 180px;
  border-radius: 50%;
  border: 3px solid ${palette.thread};
  background:
    radial-gradient(circle closest-side, rgba(128,128,128,1) 0%, rgba(128,128,128,0) 72%),
    conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  cursor: crosshair;
  touch-action: none;
  flex: 0 0 auto;
  box-shadow: 3px 3px 0 rgba(74,59,50,.2);
}
.cw-side { display: flex; flex-direction: column; gap: 8px; flex: 1 1 200px; min-width: 180px; }
.cw-lbl { font-size: .74rem; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; }
.cw-side input[type=range] { width: 100%; accent-color: ${palette.cherry}; }
.cw-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.cw-chip {
  font-family: 'Nunito', sans-serif;
  font-size: .76rem; font-weight: 800;
  border: 2px solid ${palette.thread};
  border-radius: 999px;
  padding: 4px 10px;
  cursor: pointer;
  background: #fffdf7;
}
.cw-palettes { display: flex; flex-direction: column; gap: 10px; }
.cw-palette { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.cw-pname { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: .82rem; min-width: 120px; }

.px-saves {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 2px dashed rgba(74,59,50,.25);
}
.px-btn:disabled { opacity: .45; cursor: not-allowed; }
.qc-footer {
  margin-top: 26px;
  text-align: center;
  font-family: 'Fredoka', sans-serif;
  font-size: .88rem;
  font-weight: 500;
  color: #8a7568;
  letter-spacing: .04em;
}

/* ---------- Tip footer ---------- */
.qc-tip {
  margin-top: 22px;
  text-align: center;
  font-size: .9rem;
  font-style: italic;
  color: #6d5c50;
}
.qc-tip button {
  font-family: 'Fredoka', sans-serif;
  border: 2px solid ${palette.thread};
  background: ${palette.butter};
  border-radius: 999px;
  padding: 5px 14px;
  margin-top: 8px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 2px 2px 0 rgba(74,59,50,.25);
}
.qc-tip button:active { transform: translateY(1px); box-shadow: none; }

@media (prefers-reduced-motion: reduce) {
  .qc-tab, .qc-tab:hover { transition: none; transform: none; }
}
`;

/* ---------- Data ---------- */
const QUILT_SIZES = [
  { name: "Baby / Crib", size: '36" × 52"', batting: '45" × 60"' },
  { name: "Throw / Lap", size: '50" × 65"', batting: '60" × 72"' },
  { name: "Twin", size: '70" × 90"', batting: '72" × 96"' },
  { name: "Full / Double", size: '85" × 95"', batting: '96" × 96"' },
  { name: "Queen", size: '90" × 100"', batting: '96" × 108"' },
  { name: "King", size: '110" × 108"', batting: '120" × 120"' },
];

const PRECUTS = [
  { name: "Fat Quarter", dims: '18" × 21"', note: "The quilter's currency. Great for scrappy variety.", color: "s-rose" },
  { name: "Fat Eighth", dims: '9" × 21"', note: "Half a fat quarter — perfect for tiny accents.", color: "s-butter" },
  { name: "Jelly Roll", dims: '2½" × 42" strips (40 ct)', note: "Strip piecing heaven. Race quilts, log cabins.", color: "s-sage" },
  { name: "Charm Pack", dims: '5" squares (42 ct)', note: "Instant patchwork — no cutting required.", color: "s-denim" },
  { name: "Layer Cake", dims: '10" squares (42 ct)', note: "Big blocks fast, or subcut into charms & HSTs.", color: "s-rose" },
  { name: "Mini Charm", dims: '2½" squares (42 ct)', note: "Postage-stamp quilts and patchwork borders.", color: "s-butter" },
  { name: "Honey Bun", dims: '1½" × 42" strips', note: "Skinny strips for sashing and string blocks.", color: "s-sage" },
];

const TIPS = [
  "Press your seams, don't iron them — sliding the iron stretches bias edges.",
  "The ¼\" seam rules everything. Sew a test seam and measure before starting a quilt.",
  "For half-square triangles: cut squares ⅞\" larger than the finished size (or 1\" and trim).",
  "Starch is your friend for bias edges and tiny piecing.",
  "Measure your quilt through the middle, not the edges, when cutting borders.",
  "A scant ¼\" seam accounts for the thread and the fold — a hair narrower than true ¼\".",
  "Chain piece! Feed pairs through without cutting thread and save time and thread.",
  "Label your rows with painter's tape — future you will be grateful.",
  "Audition your fabrics: pile them up, walk away, and squint at them from across the room.",
  "Wash dark reds separately before cutting — dye bleeds are heartbreak.",
  "New needle every quilt. Needles are cheap; skipped stitches aren't.",
  "Nest your seams: press alternating rows in opposite directions and corners click together.",
];

/* ---------- Helpers ---------- */
const toYards = (inches) => {
  const yd = inches / 36;
  const rounded = Math.ceil(yd * 8) / 8; // round up to nearest eighth
  return rounded;
};
const fmtYards = (yd) => {
  const whole = Math.floor(yd);
  const frac = yd - whole;
  const eighths = Math.round(frac * 8);
  const fracs = ["", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞"];
  if (eighths === 0) return `${whole}`;
  if (eighths === 8) return `${whole + 1}`;
  return whole ? `${whole} ${fracs[eighths]}` : fracs[eighths];
};
const fmtIn = (v) => {
  const w = Math.floor(v);
  const e = Math.round((v - w) * 8);
  const fr = ["", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞"];
  if (e === 8) return `${w + 1}"`;
  return e ? (w ? `${w} ${fr[e]}"` : `${fr[e]}"`) : `${w}"`;
};

/* ---------- Pixel → Quilt designer ---------- */
const FABRICS = [
  { name: "Muslin", hex: "#FAF3E3" },
  { name: "Cherry", hex: "#C94F4F" },
  { name: "Rose", hex: "#E8879B" },
  { name: "Butter", hex: "#F6C453" },
  { name: "Pumpkin", hex: "#E08A3C" },
  { name: "Sage", hex: "#8FAE8B" },
  { name: "Pine", hex: "#4E7A5A" },
  { name: "Denim", hex: "#5B7B9A" },
  { name: "Midnight", hex: "#33415C" },
  { name: "Plum", hex: "#8E6A9E" },
  { name: "Cocoa", hex: "#7A5C48" },
  { name: "Thread", hex: "#4A3B32" },
];

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const FABRIC_RGB = FABRICS.map((f) => ({ hex: f.hex, rgb: hexToRgb(f.hex) }));
const nearestIn = (pal, r, g, b) => {
  let best = pal[0].hex, bestD = Infinity;
  for (const f of pal) {
    // weighted RGB distance — closer to perceived color difference
    const dr = r - f.rgb[0], dg = g - f.rgb[1], db = b - f.rgb[2];
    const d = 2 * dr * dr + 4 * dg * dg + 3 * db * db;
    if (d < bestD) { bestD = d; best = f.hex; }
  }
  return best;
};
const nearestFabric = (r, g, b) => nearestIn(FABRIC_RGB, r, g, b);

const hslToHex = (h, s, l) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
  return `#${to(f(0))}${to(f(8))}${to(f(4))}`.toUpperCase();
};

const PALETTES = [
  { name: "Autumn Harvest", colors: ["#8C3B2E", "#C96F3B", "#E0A94E", "#7A6A3A", "#4E5B31", "#3E2F23"] },
  { name: "Berry Patch", colors: ["#5B2A46", "#8E3B5E", "#C25B7C", "#E39BB1", "#6E4A7E", "#2F2440"] },
  { name: "Ocean Tide", colors: ["#0F3B57", "#2E6E8E", "#5FA8C4", "#A8D3DD", "#DBEDE6", "#1C4A45"] },
  { name: "Vintage Feedsack", colors: ["#F6D8D2", "#F4E8C1", "#CFE3D0", "#C9D8EA", "#E4D3E8", "#F0EFE4"] },
  { name: "Amish Nights", colors: ["#1E1B2E", "#5C2A5E", "#27496D", "#7C1F3D", "#0F5A4E", "#3D3A6E"] },
];

function PixelQuilt() {
  const [size, setSize] = useState(12);
  const [cells, setCells] = useState(() => Array(12 * 12).fill(FABRICS[0].hex));
  const [brush, setBrush] = useState(FABRICS[1].hex);
  const [finished, setFinished] = useState(3);
  const [drawing, setDrawing] = useState(false);
  const [symmetry, setSymmetry] = useState("none");
  const [saved, setSaved] = useState([]);
  const [designName, setDesignName] = useState("");
  const [selected, setSelected] = useState("");
  const [maxFabrics, setMaxFabrics] = useState("all");
  const [history, setHistory] = useState([]);
  const [customFabrics, setCustomFabrics] = useState([]);
  const [studioTab, setStudioTab] = useState("wheel");
  const [wheelL, setWheelL] = useState(50);
  const [preview, setPreview] = useState(null);
  const [harmonyBase, setHarmonyBase] = useState(null);
  const [myPalettes, setMyPalettes] = useState([]);
  const [palName, setPalName] = useState("");
  const [palSelected, setPalSelected] = useState("");
  const [palCode, setPalCode] = useState("");
  const [shareMsg, setShareMsg] = useState("");

  const paletteColors = () => customFabrics.length
    ? customFabrics.map((f) => f.hex)
    : [...new Set(cells)].filter((h) => h !== FABRICS[0].hex);
  const savePalette = () => {
    const colors = paletteColors();
    if (!colors.length) { setShareMsg("Nothing to save yet — pick some colors first!"); return; }
    const name = palName.trim() || `Palette ${myPalettes.length + 1}`;
    setMyPalettes((p) => [...p.filter((x) => x.name !== name), { name, colors }]);
    setPalName("");
    setPalSelected(name);
    setShareMsg("");
  };
  const loadPalette = () => {
    const p = myPalettes.find((x) => x.name === palSelected);
    if (!p) return;
    setCustomFabrics(p.colors.filter((h) => !FABRICS.some((f) => f.hex === h)).map((hex) => ({ name: hex, hex })));
  };
  const tossPalette = () => {
    setMyPalettes((p) => p.filter((x) => x.name !== palSelected));
    setPalSelected("");
  };
  const sharePalette = () => {
    const p = myPalettes.find((x) => x.name === palSelected) || { name: palName.trim() || "My palette", colors: paletteColors() };
    if (!p.colors.length) { setShareMsg("Nothing to share yet!"); return; }
    const code = `QAC:${p.name}:${p.colors.map((h) => h.replace("#", "")).join(",")}`;
    try {
      navigator.clipboard.writeText(code);
      setShareMsg("Palette code copied — paste it anywhere!");
    } catch {
      window.prompt("Copy this palette code:", code);
      setShareMsg("");
    }
  };
  const importPalette = () => {
    const m = palCode.trim().match(/^QAC:([^:]*):([0-9A-Fa-f,]+)$/);
    if (!m) { setShareMsg("Hmm, that code doesn't look right. It should start with QAC:"); return; }
    const colors = m[2].split(",").filter((h) => /^[0-9A-Fa-f]{6}$/.test(h)).map((h) => `#${h.toUpperCase()}`);
    if (!colors.length) { setShareMsg("No valid colors in that code."); return; }
    const name = m[1] || `Imported ${myPalettes.length + 1}`;
    setMyPalettes((p) => [...p.filter((x) => x.name !== name), { name, colors }]);
    setCustomFabrics(colors.filter((h) => !FABRICS.some((f) => f.hex === h)).map((hex) => ({ name: hex, hex })));
    setPalCode("");
    setPalSelected(name);
    setShareMsg(`"${name}" imported and loaded!`);
  };

  const allSwatches = [...FABRICS, ...customFabrics];
  const addCustom = (hex) => {
    if (FABRICS.some((f) => f.hex === hex)) return;
    setCustomFabrics((p) => p.some((f) => f.hex === hex) ? p : [...p.slice(-11), { name: hex, hex }]);
  };
  const pickColor = (hex) => { setBrush(hex); addCustom(hex); };

  const wheelColorFromEvent = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = e.clientX - rect.left - cx, dy = e.clientY - rect.top - cy;
    const sat = Math.min(1, Math.hypot(dx, dy) / cx) * 100;
    const hue = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 360) % 360;
    return { hue, sat, hex: hslToHex(hue, sat, wheelL) };
  };

  const pushHistory = () => setHistory((h) => [...h.slice(-19), { size, cells: cells.slice() }]);
  const undo = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const last = h[h.length - 1];
      setSize(last.size);
      setCells(last.cells.slice());
      return h.slice(0, -1);
    });
  };

  const scrappyShuffle = () => {
    pushHistory();
    const pool = FABRICS.slice(1).map((f) => f.hex).sort(() => Math.random() - 0.5).slice(0, 4);
    const next = Array(size * size).fill(FABRICS[0].hex);
    const half = Math.ceil(size / 2);
    for (let r = 0; r < half; r++) {
      for (let c = 0; c < half; c++) {
        const hex = Math.random() < 0.35 ? FABRICS[0].hex : pool[Math.floor(Math.random() * pool.length)];
        [[r, c], [r, size - 1 - c], [size - 1 - r, c], [size - 1 - r, size - 1 - c]]
          .forEach(([rr, cc]) => { next[rr * size + cc] = hex; });
      }
    }
    setCells(next);
  };

  const resize = (n) => {
    setSize(n);
    setCells(Array(n * n).fill(FABRICS[0].hex));
  };

  const fileRef = useRef(null);
  const handleImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      pushHistory();
      const cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = FABRICS[0].hex;
      ctx.fillRect(0, 0, size, size);
      // center-crop to a square, then shrink to the grid
      const s = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let next = [];
      for (let i = 0; i < size * size; i++) {
        const a = data[i * 4 + 3];
        next.push(a < 128 ? FABRICS[0].hex : nearestFabric(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]));
      }
      if (maxFabrics !== "all") {
        // keep only the N most-used fabrics, re-match every pixel to those
        const freq = {};
        next.forEach((hex) => { freq[hex] = (freq[hex] || 0) + 1; });
        const keep = new Set(Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, Number(maxFabrics)));
        const pal = FABRIC_RGB.filter((f) => keep.has(f.hex));
        next = next.map((hex, i) => {
          const a = data[i * 4 + 3];
          if (a < 128) return FABRICS[0].hex;
          return nearestIn(pal, data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
        });
      }
      setCells(next);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
    e.target.value = "";
  };

  const paint = (i) => {
    setCells((prev) => {
      const r = Math.floor(i / size), c = i % size;
      const targets = new Set([i]);
      if (symmetry === "h" || symmetry === "4") targets.add(r * size + (size - 1 - c));
      if (symmetry === "v" || symmetry === "4") targets.add((size - 1 - r) * size + c);
      if (symmetry === "4") targets.add((size - 1 - r) * size + (size - 1 - c));
      if ([...targets].every((t) => prev[t] === brush)) return prev;
      const next = prev.slice();
      targets.forEach((t) => { next[t] = brush; });
      return next;
    });
  };

  const paintFromEvent = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && el.dataset && el.dataset.idx !== undefined) paint(Number(el.dataset.idx));
  };

  const saveDesign = () => {
    const name = designName.trim() || `Design ${saved.length + 1}`;
    setSaved((prev) => [...prev.filter((d) => d.name !== name), { name, size, cells: cells.slice() }]);
    setDesignName("");
    setSelected(name);
  };
  const loadDesign = () => {
    const d = saved.find((x) => x.name === selected);
    if (!d) return;
    pushHistory();
    setSize(d.size);
    setCells(d.cells.slice());
  };
  const deleteDesign = () => {
    setSaved((prev) => prev.filter((x) => x.name !== selected));
    setSelected("");
  };

  const cut = Number(finished) + 0.5;
  const quiltW = size * Number(finished);
  const counts = {};
  cells.forEach((hex) => { counts[hex] = (counts[hex] || 0) + 1; });
  const knownNames = {};
  allSwatches.forEach((f) => { knownNames[f.hex] = f.name; });
  const legend = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).map((hex) => {
    const n = counts[hex];
    const perRow = Math.floor(WOF / cut);
    const strips = Math.ceil(n / perRow);
    return { hex, name: knownNames[hex] || hex.toUpperCase(), n, strips, yards: toYards(strips * cut) };
  });

  const exportPattern = () => {
    const cellPx = Math.max(18, Math.floor(480 / size));
    const gridPx = cellPx * size;
    const pad = 40, headerH = 92, rowH = 34;
    const W = Math.max(gridPx + pad * 2, 560);
    const H = headerH + gridPx + 30 + legend.length * rowH + 46 + pad;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#FAF3E3"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#4A3B32";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(`Quilty as Charged — ${designName.trim() || "Quilt Pattern"}`, pad, 44);
    ctx.font = "16px sans-serif";
    ctx.fillText(`Finished quilt ${quiltW}" × ${quiltW}"  ·  cut squares at ${cut}" (incl. ¼" seams)`, pad, 72);
    const gx = (W - gridPx) / 2, gy = headerH;
    cells.forEach((hex, i) => {
      const r = Math.floor(i / size), c = i % size;
      ctx.fillStyle = hex;
      ctx.fillRect(gx + c * cellPx, gy + r * cellPx, cellPx, cellPx);
    });
    ctx.strokeStyle = "rgba(74,59,50,.35)"; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
    for (let k = 1; k < size; k++) {
      ctx.beginPath(); ctx.moveTo(gx + k * cellPx, gy); ctx.lineTo(gx + k * cellPx, gy + gridPx); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx, gy + k * cellPx); ctx.lineTo(gx + gridPx, gy + k * cellPx); ctx.stroke();
    }
    ctx.setLineDash([]); ctx.strokeStyle = "#4A3B32"; ctx.lineWidth = 4;
    ctx.strokeRect(gx, gy, gridPx, gridPx);
    let y = gy + gridPx + 34;
    ctx.font = "bold 17px sans-serif";
    ctx.fillText("Cutting chart", pad, y); y += 10;
    ctx.font = "15px sans-serif";
    legend.forEach((f) => {
      y += rowH;
      ctx.fillStyle = f.hex; ctx.fillRect(pad, y - 18, 22, 22);
      ctx.strokeStyle = "#4A3B32"; ctx.lineWidth = 2; ctx.strokeRect(pad, y - 18, 22, 22);
      ctx.fillStyle = "#4A3B32";
      ctx.fillText(`${f.name} — ${f.n} squares · ${f.strips} WOF strips · ${fmtYards(f.yards)} yd`, pad + 34, y);
    });
    ctx.font = "italic 13px sans-serif"; ctx.fillStyle = "#8a7568";
    ctx.fillText("Made with Quilty as Charged 🧵", pad, H - 18);
    cv.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(designName.trim() || "quilt-pattern").replace(/[^a-z0-9\- ]/gi, "")}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="qc-card">
      <h2>🎨 Pixel → quilt pattern</h2>
      <p className="hint">Paint your pixel art, and the cutting chart below turns it into a quilt pattern. Click or drag to fill squares.</p>

      <div className="px-toolbar">
        <div className="qc-field" style={{ flex: "0 1 120px" }}>
          <label htmlFor="pxsize">Grid</label>
          <select id="pxsize" value={size} onChange={(e) => resize(Number(e.target.value))}>
            {[8, 10, 12, 16, 20, 24].map((n) => (
              <option key={n} value={n}>{n} × {n}</option>
            ))}
          </select>
        </div>
        <div className="qc-field" style={{ flex: "0 1 140px" }}>
          <label htmlFor="pxfin">Finished square (in)</label>
          <input id="pxfin" type="number" min="0.5" step="0.5" value={finished} onChange={(e) => setFinished(e.target.value)} />
        </div>
        <div className="qc-field" style={{ flex: "0 1 150px" }}>
          <label htmlFor="pxsym">Symmetry</label>
          <select id="pxsym" value={symmetry} onChange={(e) => setSymmetry(e.target.value)}>
            <option value="none">Free stitch</option>
            <option value="h">Mirror ↔</option>
            <option value="v">Mirror ↕</option>
            <option value="4">Medallion (4-way)</option>
          </select>
        </div>
        <div className="qc-field" style={{ flex: "0 1 140px" }}>
          <label htmlFor="pxmaxf">Import fabrics</label>
          <select id="pxmaxf" value={maxFabrics} onChange={(e) => setMaxFabrics(e.target.value)}>
            <option value="all">All 12</option>
            <option value="6">Top 6</option>
            <option value="4">Top 4</option>
            <option value="3">Top 3</option>
          </select>
        </div>
        <div className="qc-field" style={{ flex: "1 1 220px" }}>
          <label>Fabric</label>
          <div className="px-palette">
            {allSwatches.map((f) => (
              <button
                key={f.hex}
                className={`px-swatch ${brush === f.hex ? "selected" : ""}`}
                style={{ background: f.hex }}
                title={f.name}
                aria-label={`Paint with ${f.name}`}
                onClick={() => setBrush(f.hex)}
              />
            ))}
          </div>
        </div>
      </div>

      <details className="cw-studio">
        <summary className="cw-summary">🎨 Color studio — wheel, palettes &amp; harmony</summary>
        <div className="cw-tabs" role="tablist">
          {[["wheel", "🎡 Wheel"], ["palettes", "🧺 Palettes"], ["harmony", "🌗 Harmony"]].map(([id, label]) => (
            <button key={id} className={`cw-tab ${studioTab === id ? "active" : ""}`} onClick={() => setStudioTab(id)}>{label}</button>
          ))}
          {preview && <span className="cw-preview"><span className="px-key" style={{ background: preview }} />{preview}</span>}
        </div>

        {(studioTab === "wheel" || studioTab === "harmony") && (
          <div className="cw-row">
            <div
              className="cw-wheel"
              onPointerDown={(e) => {
                const c = wheelColorFromEvent(e);
                setPreview(c.hex);
                if (studioTab === "wheel") pickColor(c.hex);
                else setHarmonyBase(c);
              }}
              onPointerMove={(e) => {
                if (!(e.buttons & 1)) return;
                const c = wheelColorFromEvent(e);
                setPreview(c.hex);
                if (studioTab === "wheel") setBrush(c.hex);
                else setHarmonyBase(c);
              }}
              onPointerUp={(e) => {
                const c = wheelColorFromEvent(e);
                if (studioTab === "wheel") pickColor(c.hex);
              }}
            />
            <div className="cw-side">
              <label className="cw-lbl" htmlFor="cwl">Lightness {wheelL}%</label>
              <input id="cwl" type="range" min="15" max="85" value={wheelL} onChange={(e) => setWheelL(Number(e.target.value))} />
              {studioTab === "harmony" && harmonyBase && (
                <div className="cw-chips">
                  {[
                    ["Base", harmonyBase.hue],
                    ["Complement", (harmonyBase.hue + 180) % 360],
                    ["Split A", (harmonyBase.hue + 150) % 360],
                    ["Split B", (harmonyBase.hue + 210) % 360],
                    ["Triad A", (harmonyBase.hue + 120) % 360],
                    ["Triad B", (harmonyBase.hue + 240) % 360],
                  ].map(([lbl, hu]) => {
                    const hx = hslToHex(hu, harmonyBase.sat, wheelL);
                    return (
                      <button key={lbl} className="cw-chip" onClick={() => pickColor(hx)}>
                        <span className="px-key" style={{ background: hx }} />{lbl}
                      </button>
                    );
                  })}
                </div>
              )}
              {studioTab === "harmony" && !harmonyBase && <p className="hint" style={{ margin: 0 }}>Tap the wheel to choose a base color.</p>}
              {studioTab === "wheel" && <p className="hint" style={{ margin: 0 }}>Tap or drag on the wheel — picked colors join your swatches.</p>}
            </div>
          </div>
        )}

        {studioTab === "palettes" && (
          <div className="cw-palettes">
            {PALETTES.map((p) => (
              <div key={p.name} className="cw-palette">
                <span className="cw-pname">{p.name}</span>
                <div className="px-palette">
                  {p.colors.map((hex) => (
                    <button key={hex} className={`px-swatch ${brush === hex ? "selected" : ""}`} style={{ background: hex }} title={`${p.name} ${hex}`} onClick={() => pickColor(hex)} />
                  ))}
                </div>
              </div>
            ))}
            {myPalettes.map((p) => (
              <div key={p.name} className="cw-palette">
                <span className="cw-pname">🧵 {p.name}</span>
                <div className="px-palette">
                  {p.colors.map((hex) => (
                    <button key={hex} className={`px-swatch ${brush === hex ? "selected" : ""}`} style={{ background: hex }} title={`${p.name} ${hex}`} onClick={() => pickColor(hex)} />
                  ))}
                </div>
              </div>
            ))}
            <div className="cw-mypal">
              <div className="cw-mypal-row">
                <div className="qc-field" style={{ flex: "1 1 140px" }}>
                  <label htmlFor="mpname">Palette name</label>
                  <input id="mpname" type="text" placeholder="e.g. Beffy's Blues" value={palName} onChange={(e) => setPalName(e.target.value)} />
                </div>
                <button className="px-btn" onClick={savePalette}>💾 Save palette</button>
                <button className="px-btn" onClick={sharePalette}>📤 Share</button>
              </div>
              {myPalettes.length > 0 && (
                <div className="cw-mypal-row">
                  <div className="qc-field" style={{ flex: "1 1 140px" }}>
                    <label htmlFor="mpsel">My palettes</label>
                    <select id="mpsel" value={palSelected} onChange={(e) => setPalSelected(e.target.value)}>
                      <option value="">— pick one —</option>
                      {myPalettes.map((p) => <option key={p.name} value={p.name}>{p.name} ({p.colors.length})</option>)}
                    </select>
                  </div>
                  <button className="px-btn" onClick={loadPalette} disabled={!palSelected}>Load</button>
                  <button className="px-btn" onClick={tossPalette} disabled={!palSelected}>Toss</button>
                </div>
              )}
              <div className="cw-mypal-row">
                <div className="qc-field" style={{ flex: "1 1 200px" }}>
                  <label htmlFor="mpcode">Import a shared code</label>
                  <input id="mpcode" type="text" placeholder="QAC:Name:AABBCC,DDEEFF…" value={palCode} onChange={(e) => setPalCode(e.target.value)} />
                </div>
                <button className="px-btn" onClick={importPalette} disabled={!palCode.trim()}>📥 Import</button>
              </div>
              {shareMsg && <p className="hint" style={{ margin: "6px 0 0" }}>{shareMsg}</p>}
            </div>
          </div>
        )}
      </details>

      <div
        className="px-grid"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        onPointerDown={(e) => { pushHistory(); setDrawing(true); paintFromEvent(e); }}
        onPointerMove={(e) => { if (drawing) paintFromEvent(e); }}
        onPointerUp={() => setDrawing(false)}
        onPointerLeave={() => setDrawing(false)}
        role="img"
        aria-label="Pixel quilt design grid"
      >
        {cells.map((hex, i) => (
          <div key={i} className="px-cell" data-idx={i} style={{ background: hex }} />
        ))}
      </div>

      <div className="px-actions">
        <button className="px-btn" onClick={() => fileRef.current && fileRef.current.click()}>📷 Import image</button>
        <button className="px-btn" onClick={exportPattern}>🖨️ Export pattern (PNG)</button>
        <button className="px-btn" onClick={undo} disabled={!history.length}>↩️ Undo</button>
        <button className="px-btn" onClick={scrappyShuffle}>🎲 Scrappy shuffle</button>
        <button className="px-btn" onClick={() => { pushHistory(); setCells(Array(size * size).fill(FABRICS[0].hex)); }}>Clear quilt</button>
        <button className="px-btn" onClick={() => setBrush(FABRICS[0].hex)}>Eraser (muslin)</button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImport} />
      </div>

      <div className="px-saves">
        <div className="qc-field" style={{ flex: "1 1 160px" }}>
          <label htmlFor="pxname">Design name</label>
          <input id="pxname" type="text" placeholder="e.g. Mushroom" value={designName} onChange={(e) => setDesignName(e.target.value)} />
        </div>
        <button className="px-btn" onClick={saveDesign}>💾 Save design</button>
        {saved.length > 0 && (
          <>
            <div className="qc-field" style={{ flex: "1 1 160px" }}>
              <label htmlFor="pxsaved">Sewing basket</label>
              <select id="pxsaved" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">— pick a design —</option>
                {saved.map((d) => (
                  <option key={d.name} value={d.name}>{d.name} ({d.size}×{d.size})</option>
                ))}
              </select>
            </div>
            <button className="px-btn" onClick={loadDesign} disabled={!selected}>Load</button>
            <button className="px-btn" onClick={deleteDesign} disabled={!selected}>Toss</button>
          </>
        )}
      </div>
      <p className="hint" style={{ marginTop: 6 }}>Saved designs live in this session here in the preview — the Android app keeps them permanently.</p>

      <div className="px-legend">
        <h2 style={{ fontSize: "1.05rem" }}>🧾 Cutting chart</h2>
        <p className="hint">Finished quilt: <strong>{quiltW}" × {quiltW}"</strong> · cut squares at <strong>{cut}"</strong> (includes ¼" seams) · strips are width-of-fabric.</p>
        <table className="qc-table">
          <thead>
            <tr><th>Fabric</th><th>Squares</th><th>WOF strips</th><th>Yardage</th></tr>
          </thead>
          <tbody>
            {legend.map((f) => (
              <tr key={f.hex}>
                <td><span className="px-key" style={{ background: f.hex }} />{f.name}</td>
                <td>{f.n}</td>
                <td>{f.strips}</td>
                <td>{fmtYards(f.yards)} yd</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */
function FabricMath() {
  const [finished, setFinished] = useState(4);
  const [qw, setQw] = useState(50);
  const [qh, setQh] = useState(65);

  const cut = Number(finished) + 0.5;
  const perRow = Math.floor(WOF / cut);
  const rowsPerYard = Math.floor(36 / cut);
  const perYard = perRow * rowsPerYard;

  const across = Math.ceil(qw / finished);
  const down = Math.ceil(qh / finished);
  const total = across * down;
  const yardsNeeded = perYard > 0 ? toYards(Math.ceil(total / perRow) * cut) : 0;

  return (
    <div className="qc-card">
      <h2>🧮 Patch math</h2>
      <p className="hint">Enter your finished square size and quilt top dimensions. Cut size adds a ¼" seam allowance on each side.</p>
      <div className="qc-fields">
        <div className="qc-field">
          <label htmlFor="fin">Finished square (in)</label>
          <input id="fin" type="number" min="0.5" step="0.5" value={finished} onChange={(e) => setFinished(e.target.value)} />
        </div>
        <div className="qc-field">
          <label htmlFor="qw">Quilt width (in)</label>
          <input id="qw" type="number" min="1" value={qw} onChange={(e) => setQw(e.target.value)} />
        </div>
        <div className="qc-field">
          <label htmlFor="qh">Quilt height (in)</label>
          <input id="qh" type="number" min="1" value={qh} onChange={(e) => setQh(e.target.value)} />
        </div>
      </div>
      <div className="qc-result">
        <div className="qc-stat s-butter"><div className="big">{cut}"</div><div className="lbl">Cut size</div></div>
        <div className="qc-stat s-rose"><div className="big">{total}</div><div className="lbl">Squares needed ({across} × {down})</div></div>
        <div className="qc-stat s-sage"><div className="big">{perYard}</div><div className="lbl">Squares per yard</div></div>
        <div className="qc-stat s-denim"><div className="big">{fmtYards(yardsNeeded)} yd</div><div className="lbl">Total fabric (approx.)</div></div>
      </div>
    </div>
  );
}

function BackingBinding() {
  const [qw, setQw] = useState(70);
  const [qh, setQh] = useState(90);
  const [stripW, setStripW] = useState(2.5);
  const [border, setBorder] = useState(0);

  // Final size including borders
  const b = Math.max(0, Number(border) || 0);
  const fw = Number(qw) + 2 * b;
  const fh = Number(qh) + 2 * b;

  // Border: sides at quilt-top height, top/bottom at full final width, + 6" allowance
  const borderCutW = b + 0.5;
  const borderLen = 2 * Number(qh) + 2 * fw + 6;
  const borderStrips = b > 0 ? Math.ceil(borderLen / WOF) : 0;
  const borderYd = b > 0 ? toYards(borderStrips * borderCutW) : 0;

  // Binding: perimeter of the finished (bordered) quilt + 12" for corners & joining
  const bindingLen = 2 * (fw + fh) + 12;
  const strips = Math.ceil(bindingLen / WOF);
  const bindingYd = toYards(strips * Number(stripW));

  // Backing: 4" overage per side of the finished quilt
  const bw = fw + 8;
  const bh = fh + 8;
  const panels = Math.ceil(bw / WOF);
  const backingYd = toYards(panels * bh);

  return (
    <div className="qc-card">
      <h2>📏 Borders, backing &amp; binding</h2>
      <p className="hint">Enter your quilt top size; add an optional border and everything downstream (binding, backing) accounts for it. Assumes 42" usable width of fabric, 4" backing overage per side, and 12" extra binding for corners and joins.</p>
      <div className="qc-fields">
        <div className="qc-field">
          <label htmlFor="bqw">Quilt width (in)</label>
          <input id="bqw" type="number" min="1" value={qw} onChange={(e) => setQw(e.target.value)} />
        </div>
        <div className="qc-field">
          <label htmlFor="bqh">Quilt height (in)</label>
          <input id="bqh" type="number" min="1" value={qh} onChange={(e) => setQh(e.target.value)} />
        </div>
        <div className="qc-field">
          <label htmlFor="bord">Border width (0 = none)</label>
          <input id="bord" type="number" min="0" step="0.5" value={border} onChange={(e) => setBorder(e.target.value)} />
        </div>
        <div className="qc-field">
          <label htmlFor="sw">Binding strip width</label>
          <select id="sw" value={stripW} onChange={(e) => setStripW(e.target.value)}>
            <option value="2.25">2¼"</option>
            <option value="2.5">2½"</option>
            <option value="2.75">2¾"</option>
          </select>
        </div>
      </div>
      <div className="qc-result">
        {b > 0 && <div className="qc-stat s-sage"><div className="big">{fw}" × {fh}"</div><div className="lbl">Final size w/ border</div></div>}
        {b > 0 && <div className="qc-stat s-butter"><div className="big">{borderStrips} / {fmtYards(borderYd)} yd</div><div className="lbl">Border strips / fabric</div></div>}
        <div className="qc-stat s-rose"><div className="big">{strips}</div><div className="lbl">Binding strips (WOF)</div></div>
        <div className="qc-stat s-butter"><div className="big">{fmtYards(bindingYd)} yd</div><div className="lbl">Binding fabric</div></div>
        <div className="qc-stat s-denim"><div className="big">{panels}</div><div className="lbl">Backing panels</div></div>
        <div className="qc-stat s-sage"><div className="big">{fmtYards(backingYd)} yd</div><div className="lbl">Backing fabric</div></div>
      </div>
    </div>
  );
}

function SizeChart() {
  return (
    <div className="qc-card">
      <h2>🛏️ Standard quilt sizes</h2>
      <p className="hint">Common finished sizes — adjust for drop length and pillow tuck to taste.</p>
      <table className="qc-table">
        <thead>
          <tr><th>Quilt</th><th>Finished size</th><th>Batting size</th></tr>
        </thead>
        <tbody>
          {QUILT_SIZES.map((q) => (
            <tr key={q.name}>
              <td><strong>{q.name}</strong></td>
              <td>{q.size}</td>
              <td>{q.batting}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PrecutGuide() {
  return (
    <div className="qc-card">
      <h2>✂️ Pre-cut cheat sheet</h2>
      <p className="hint">Decode the bakery aisle of the fabric shop.</p>
      <table className="qc-table">
        <thead>
          <tr><th>Pre-cut</th><th>Dimensions</th><th>Best for</th></tr>
        </thead>
        <tbody>
          {PRECUTS.map((p) => (
            <tr key={p.name}>
              <td><span className={`qc-chip ${p.color}`}>{p.name}</span></td>
              <td style={{ whiteSpace: "nowrap" }}>{p.dims}</td>
              <td>{p.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TriangleMath() {
  const [hst, setHst] = useState(2);
  const [qst, setQst] = useState(3);
  const [gw, setGw] = useState(4);

  const h = Number(hst) || 0;
  const q = Number(qst) || 0;
  const w = Number(gw) || 0;
  const gh = w / 2; // classic flying geese are twice as wide as tall

  return (
    <div className="qc-card">
      <h2>📐 Triangle math</h2>
      <p className="hint">All the "what size do I cut?" formulas for triangle units. Sizes are <em>finished</em> (after sewing). Cut ⅛" larger if you like to trim.</p>

      <div className="qc-fields">
        <div className="qc-field">
          <label htmlFor="t-hst">Finished HST size (in)</label>
          <input id="t-hst" type="number" min="0.5" step="0.5" value={hst} onChange={(e) => setHst(e.target.value)} />
        </div>
      </div>
      <div className="qc-result" style={{ marginBottom: 18 }}>
        <div className="qc-stat s-butter"><div className="big">{fmtIn(h + 0.875)}</div><div className="lbl">2-at-a-time: cut 2 squares → 2 HSTs</div></div>
        <div className="qc-stat s-rose"><div className="big">{fmtIn((h + 0.875) * 2)}</div><div className="lbl">Magic 8: cut 2 squares → 8 HSTs</div></div>
      </div>

      <div className="qc-fields">
        <div className="qc-field">
          <label htmlFor="t-qst">Finished QST / hourglass (in)</label>
          <input id="t-qst" type="number" min="0.5" step="0.5" value={qst} onChange={(e) => setQst(e.target.value)} />
        </div>
      </div>
      <div className="qc-result" style={{ marginBottom: 18 }}>
        <div className="qc-stat s-sage"><div className="big">{fmtIn(q + 1.25)}</div><div className="lbl">Cut squares, slice both diagonals</div></div>
      </div>

      <div className="qc-fields">
        <div className="qc-field">
          <label htmlFor="t-gw">Finished flying geese width (in)</label>
          <input id="t-gw" type="number" min="1" step="0.5" value={gw} onChange={(e) => setGw(e.target.value)} />
        </div>
      </div>
      <div className="qc-result">
        <div className="qc-stat s-denim"><div className="big">{fmtIn(w + 1.25)}</div><div className="lbl">No-waste: 1 large square</div></div>
        <div className="qc-stat s-butter"><div className="big">4 × {fmtIn(gh + 0.875)}</div><div className="lbl">+ 4 small squares → 4 geese ({fmtIn(w)} × {fmtIn(gh)})</div></div>
      </div>
    </div>
  );
}

/* ---------- App ---------- */
const TABS = [
  { id: "pixel", label: "🎨 Pixel → Quilt", bg: "#e6d4ec", tilt: "-1deg", C: PixelQuilt },
  { id: "math", label: "🧮 Patch Math", bg: "#fbe3ae", tilt: "1deg", C: FabricMath },
  { id: "tri", label: "📐 Triangle Math", bg: "#f3d9c0", tilt: "0.7deg", C: TriangleMath },
  { id: "bb", label: "📏 Backing & Binding", bg: "#f6cdd6", tilt: "-0.6deg", C: BackingBinding },
  { id: "sizes", label: "🛏️ Size Chart", bg: "#cfdce8", tilt: "0.8deg", C: SizeChart },
  { id: "precuts", label: "✂️ Pre-cuts", bg: "#d3e0d1", tilt: "-1.2deg", C: PrecutGuide },
];

export default function QuiltyAsCharged() {
  const [tab, setTab] = useState("pixel");
  const [tipIdx, setTipIdx] = useState(0);
  const Active = TABS.find((t) => t.id === tab).C;

  return (
    <div className="qc-root">
      <style>{css}</style>
      <div className="qc-wrap">
        <header className="qc-header" aria-label="The Quilter's Companion">
          <div className="qc-patch p-gingham" />
          <div className="qc-title-patch">
            <div className="qc-title">Quilty as Charged</div>
            <div className="qc-sub">guilty of buying more fabric</div>
          </div>
          <div className="qc-patch p-dots" />
          <div className="qc-patch p-stripe" />
          <div className="qc-patch p-leaf" />
          <div className="qc-patch p-cherry" />
          <div className="qc-patch p-dots" style={{ backgroundColor: palette.sage }} />
        </header>

        <nav className="qc-tabs" aria-label="Tools">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`qc-tab ${tab === t.id ? "active" : ""}`}
              style={{ background: t.bg, "--tilt": t.tilt }}
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
            >
              <span className="pin" aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </nav>

        <Active />

        <div className="qc-tip">
          <div>🧵 “{TIPS[tipIdx]}”</div>
          <button onClick={() => setTipIdx((tipIdx + 1) % TIPS.length)}>Another stitch of wisdom</button>
        </div>

        <footer className="qc-footer">For Beffy ❤️</footer>
      </div>
    </div>
  );
}

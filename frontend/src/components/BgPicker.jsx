import { useState, useEffect } from "react";
import { MdPalette } from "react-icons/md";

export const BACKGROUNDS = [
  {
    id: "winter",
    label: "Winter Night",
    css: 'linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)), url("/bg.png") center/cover fixed no-repeat',
    preview: 'url("/bg.png") center/cover',
  },
  {
    id: "aurora",
    label: "Aurora",
    css: "linear-gradient(160deg, #0d1117 0%, #0a3d5c 25%, #1a6b8a 50%, #3d1a6b 75%, #0d1117 100%)",
    preview: "linear-gradient(160deg, #0d1117, #1a6b8a, #3d1a6b)",
  },
  {
    id: "ocean",
    label: "Deep Ocean",
    css: "linear-gradient(180deg, #000428 0%, #004e92 50%, #001a4e 100%)",
    preview: "linear-gradient(180deg, #000428, #004e92, #001a4e)",
  },
  {
    id: "midnight",
    label: "Midnight",
    css: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    preview: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  },
  {
    id: "forest",
    label: "Forest Night",
    css: "linear-gradient(135deg, #0b3d2e 0%, #155e4a 40%, #0a2340 80%, #0b3d2e 100%)",
    preview: "linear-gradient(135deg, #0b3d2e, #155e4a, #0a2340)",
  },
  {
    id: "dusk",
    label: "Dusk",
    css: "linear-gradient(135deg, #1a0a2e 0%, #4a0e5c 35%, #8b1a3a 65%, #1a0505 100%)",
    preview: "linear-gradient(135deg, #1a0a2e, #4a0e5c, #8b1a3a)",
  },
  {
    id: "cosmic",
    label: "Cosmic",
    css: "linear-gradient(135deg, #0c0c1e 0%, #1a0a3e 40%, #2d0b5e 70%, #0c0c1e 100%)",
    preview: "linear-gradient(135deg, #0c0c1e, #1a0a3e, #2d0b5e)",
  },
];

const BG_KEY = "chat_bg_id";

export const applyBackground = (bg) => {
  document.body.style.background = bg.css;
  document.body.style.backgroundAttachment = "fixed";
};

export const loadSavedBackground = () => {
  const savedId = localStorage.getItem(BG_KEY);
  const bg = BACKGROUNDS.find((b) => b.id === savedId) || BACKGROUNDS[0];
  applyBackground(bg);
};

const BgPicker = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    () => localStorage.getItem(BG_KEY) || "winter"
  );

  const handleSelect = (bg) => {
    setSelected(bg.id);
    applyBackground(bg);
    localStorage.setItem(BG_KEY, bg.id);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="mb-3 bg-gray-900/90 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/10 w-64">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest px-1 mb-2">
            Background
          </p>
          <div className="grid grid-cols-4 gap-2">
            {BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                onClick={() => handleSelect(bg)}
                title={bg.label}
                className={`relative w-13 h-12 rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                  selected === bg.id
                    ? "border-blue-400 scale-105 shadow-lg shadow-blue-500/30"
                    : "border-white/10 hover:border-white/40 hover:scale-105"
                }`}
                style={{ background: bg.preview }}
              >
                {selected === bg.id && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shadow shadow-blue-400" />
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-2 px-1">
            <p className="text-white/30 text-xs">
              {BACKGROUNDS.find((b) => b.id === selected)?.label}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-gray-700/80 transition-all hover:scale-110"
      >
        <MdPalette size={20} />
      </button>
    </div>
  );
};

export default BgPicker;

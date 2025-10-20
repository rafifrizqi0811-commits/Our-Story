import React, { useEffect, useMemo, useState } from "react";
import { Heart, Calendar, Camera, MapPin, Music, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const NAMA_KAMU = "Rafif Rizqi Ramadhan";
const NAMA_DIA = "Audreyelle Febyari";
const TANGGAL_MULAI = "2025-09-25";

const THEME = {
  accent: "from-pink-500 via-rose-500 to-red-500",
  textAccent: "text-rose-600",
  softBg: "bg-rose-50",
};

export default function App() {
  const SITE_PASSWORD = "25 09 25";
  const PWD_BG = [
    "https://i.imgur.com/mdUdopC.jpg",
    "https://i.imgur.com/6dr6OQU.jpg",
    "https://i.imgur.com/B3y0Yep.jpg",
    "https://i.imgur.com/qoxVLl6.jpg",
    "https://i.imgur.com/5PliO3c.jpg",
  ];

  const [entered, setEntered] = useState("");
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem("kenangan_unlocked") === "1");
  const [errorMsg, setErrorMsg] = useState("");
  const [bgIdx, setBgIdx] = useState(0);

  useEffect(() => {
    if (unlocked) localStorage.setItem("kenangan_unlocked", "1");
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked && PWD_BG.length > 1) {
      const t = setInterval(() => setBgIdx((i) => (i + 1) % PWD_BG.length), 4000);
      return () => clearInterval(t);
    }
  }, [unlocked]);

  const tryUnlock = (e) => {
    if (e) e.preventDefault();
    if (entered === SITE_PASSWORD) {
      setUnlocked(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Wrong password — try again.");
    }
  };

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 overflow-hidden">
          {PWD_BG.map((src, i) => (
            <img key={i} src={src} alt="bg" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === bgIdx ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 min-h-full flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg border border-pink-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center">🎀</div>
              <div>
                <div className="font-semibold">Private Page</div>
                <div className="text-xs text-neutral-500">Enter the password to open this page.</div>
              </div>
            </div>
            <form onSubmit={tryUnlock}>
              <input type="password" value={entered} onChange={(e) => setEntered(e.target.value)} placeholder="Enter password" className="w-full border border-pink-200 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
              {errorMsg && <div className="text-sm text-red-500 mb-2">{errorMsg}</div>}
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 rounded-2xl bg-pink-600 text-white">Open</button>
                <button type="button" onClick={() => { setEntered(""); setErrorMsg(""); }} className="px-4 py-2 rounded-2xl border border-pink-200">Reset</button>
              </div>
              <div className="text-xs text-neutral-100 mt-3 text-center select-none">Hint: the date we made it official 💗</div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();
  const showAnniversary = today.getFullYear() === 2025 && today.getMonth() === 9 && today.getDate() === 25;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/40 text-neutral-800">
      <MainPage />
      {showAnniversary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium"
        >
          Happy anniversary, sayang 💖
        </motion.div>
      )}
    </div>
  );
}

function useDaysTogether(startISO) {
  return useMemo(() => {
    const start = new Date(startISO + "T00:00:00");
    const today = new Date();
    const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(diff, 0);
  }, [startISO]);
}

function MainPage() {
  return <div>Our Story Content Here</div>;
}

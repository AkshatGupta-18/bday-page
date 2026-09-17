// Niyonika's Birthday Page — React components
// Requires: React 18, ReactDOM 18, and canvas-confetti (window.confetti)
// This file assumes the CSS from the published page is loaded separately
// (light-pink theme, Fredoka + Quicksand fonts, .hero/.flip-card/etc classes).

import { useState, useRef, useEffect } from "react";
import './index.css' 

function safeConfetti(opts) {
  try {
    if (window.confetti) window.confetti(opts);
  } catch (e) { /* confetti is decorative, fail quietly */ }
}

function FloatingEmoji({ emoji, style }) {
  return <span className="float-emoji" style={style} aria-hidden="true">{emoji}</span>;
}

/* ---------------- HERO ---------------- */
function Hero() {
  const decorations = [
    { emoji: "🎈", style: { top: "12%", left: "8%", animationDelay: "0s" } },
    { emoji: "✨", style: { top: "20%", right: "10%", animationDelay: "1.2s" } },
    { emoji: "🎀", style: { bottom: "18%", left: "12%", animationDelay: "0.6s" } },
    { emoji: "🧁", style: { bottom: "24%", right: "8%", animationDelay: "1.8s" } },
    { emoji: "💌", style: { top: "42%", left: "3%", animationDelay: "2.4s" } },
    { emoji: "🌸", style: { top: "50%", right: "4%", animationDelay: "0.9s" } },
  ];
  return (
    <section className="hero">
      {decorations.map((d, i) => <FloatingEmoji key={i} emoji={d.emoji} style={d.style} />)}
      <div className="eyebrow-tag">A page your little brother built you</div>
      <h1>Happy Birthday,<br /><span className="accent">Niyonika didiii</span> 🎂</h1>
      <p className="sub">
        You've put up with me for years, survived my terrible jokes, and somehow
        still call me back when I need something. Today's about you — so sit
        back, and let me be annoying in your honor.
      </p>
      <div className="scroll-hint">↓ scroll down, there's a cake to blow out ↓</div>
    </section>
  );
}

/* ---------------- CAKE ---------------- */
function Cake() {
  const [lit, setLit] = useState([true, true, true, true, true]);
  const litCount = lit.filter(Boolean).length;
  const allOut = litCount === 0;

  const blow = (i) => {
    if (!lit[i]) return;
    const next = [...lit];
    next[i] = false;
    setLit(next);
    if (next.every((f) => !f)) {
      safeConfetti({ particleCount: 140, spread: 80, origin: { y: 0.6 }, colors: ["#ff5f96", "#f4b740", "#ffc7dd"] });
    }
  };

  const relight = () => setLit([true, true, true, true, true]);

  return (
    <section className="cake-zone">
      <div className="wrap">
        <div className="section-head">
          <h2>Make a wish 🕯️</h2>
          <p>Click each flame to blow out the candles. I promise not to peek at your wish.</p>
        </div>
        <div className="cake-svg-wrap">
          <svg width="260" height="220" viewBox="0 0 260 220">
            {/* plate */}
            <ellipse cx="130" cy="205" rx="110" ry="10" fill="var(--line)" opacity="0.6" />
            {/* base layer */}
            <rect x="45" y="130" width="170" height="60" rx="14" fill="#ffd6e6" />
            <rect x="45" y="130" width="170" height="14" rx="7" fill="#ffffff" />
            {/* top layer */}
            <rect x="70" y="90" width="120" height="50" rx="12" fill="#ff9fc2" />
            <rect x="70" y="90" width="120" height="12" rx="6" fill="#ffffff" />
            {/* sprinkles */}
            <circle cx="90" cy="150" r="3" fill="#f4b740" />
            <circle cx="130" cy="160" r="3" fill="#ffffff" />
            <circle cx="170" cy="150" r="3" fill="#f4b740" />
            <circle cx="110" cy="110" r="2.5" fill="#ffffff" />
            <circle cx="150" cy="115" r="2.5" fill="#f4b740" />
            {/* candles */}
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 90 + i * 20;
              return (
                <g key={i}>
                  <rect x={x} y="62" width="6" height="30" fill={["#ff5f96", "#f4b740", "#ff9fc2", "#f4b740", "#ff5f96"][i]} rx="2" />
                  {lit[i] && (
                    <g
                      className="flame-btn"
                      onClick={() => blow(i)}
                      tabIndex="0"
                      role="button"
                      aria-label={`Blow out candle ${i + 1}`}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") blow(i); }}
                    >
                      <ellipse cx={x + 3} cy="54" rx="6" ry="10" fill="#ffb545" />
                      <ellipse cx={x + 3} cy="56" rx="3" ry="6" fill="#fff4d6" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="cake-status">
          {allOut ? "🎉 All wished up — nicely blown!" : `${litCount} candle${litCount === 1 ? "" : "s"} left to blow out`}
        </div>
        {allOut && (
          <div className="wish-reveal">
            Wish granted, officially, by executive order of little brother. 👑
            (I have no actual powers, but I really hope it comes true anyway.)
          </div>
        )}
        {allOut && (
          <button className="relight-btn" onClick={relight}>relight the candles</button>
        )}
      </div>
    </section>
  );
}





/* ---------------- ANNOYANCE METER ---------------- */
function AnnoyanceMeter() {
  const [val, setVal] = useState(50);

  const caption = (v) => {
    if (v < 15) return "Barely tolerable. Impressive.";
    if (v < 35) return "Mildly exhausting, in a loveable way.";
    if (v < 55) return "A solid, respectable amount of annoying.";
    if (v < 75) return "Certified menace. Still adored.";
    if (v < 92) return "Unbearable. 10/10, would keep anyway.";
    return "Off the charts. And yet — still my favorite person.";
  };

  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <h2>The Little-Brother Annoyance Meter™</h2>
          <p>Drag it anywhere. Spoiler: every setting ends the same way.</p>
        </div>
        <div className="meter-box">
          <div className="meter-caption">{caption(val)}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="meter-slider"
            aria-label="Annoyance level"
          />
          <div className="meter-labels">
            <span>Saint-like patience</span>
            <span>Send help</span>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ---------------- BALLOON POP ---------------- */
function BalloonPop() {
  const letters = "NIYONIKA".split("");
  const colors = ["#ff5f96", "#f4b740", "#ff9fc2", "#e8467f", "#ffb545"];
  const [popped, setPopped] = useState(Array(letters.length).fill(false));
  const positions = useRef(
    letters.map((_, i) => ({
      left: `${6 + (i * (88 / letters.length)) + (i % 2 === 0 ? 0 : 2)}%`,
      delay: `${(i % 5) * 0.4}s`,
    }))
  ).current;

  const pop = (i) => {
    if (popped[i]) return;
    const next = [...popped];
    next[i] = true;
    setPopped(next);
    safeConfetti({ particleCount: 24, spread: 50, startVelocity: 22, origin: { y: 0.75 }, colors: [colors[i % colors.length]] });
  };

  const allPopped = popped.every(Boolean);
  const reset = () => setPopped(Array(letters.length).fill(false));

  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <h2>Pop every balloon</h2>
          <p>Each one's hiding a letter. Pop them all to spell something obvious.</p>
        </div>
        <div className="balloon-field">
          {letters.map((L, i) => (
            !popped[i] && (
              <button
                key={i}
                className="balloon"
                style={{ left: positions[i].left, background: colors[i % colors.length], animationDelay: positions[i].delay }}
                onClick={() => pop(i)}
                aria-label={`Pop balloon ${i + 1}`}
              >
                {L}
              </button>
            )
          ))}
        </div>
        <div className="balloon-status">
          {allPopped ? "🎇 That's right — it says NIYONIKA. Ten points for creativity." : `${popped.filter(Boolean).length} / ${letters.length} popped`}
        </div>
        {allPopped && <button className="balloon-reset" onClick={reset}>blow them back up</button>}
      </div>
    </section>
  );
}

/* ---------------- WISH GENERATOR ---------------- */
function WishGenerator() {
  const wishes = [
    "May your year ahead be filled with good food, better naps, and zero group projects.",
    "May you always find the last parking spot, the good seat, and the last slice.",
    "Here's to another year of you pretending you don't care and clearly caring the most.",
    "May your Wi-Fi be fast, your coffee be hot, and your family group chat be slightly less chaotic.",
    "May you get exactly the kind of birthday you deserve — a little extra, in the best way.",
    "May every playlist shuffle in your favor and every red light turn green just for you.",
    "Wishing you a year where you finally win an argument against me. Kidding. Never happening.",
  ];
  const [wish, setWish] = useState(wishes[0]);

  const roll = () => {
    let next = wish;
    while (next === wish) {
      next = wishes[Math.floor(Math.random() * wishes.length)];
    }
    setWish(next);
    safeConfetti({ particleCount: 60, spread: 65, origin: { y: 0.7 }, colors: ["#ff5f96", "#f4b740"] });
  };

  return (
    <section>
      <div className="wrap">
        <div className="wish-box">
          <h2 style={{ marginBottom: "18px" }}>Your official birthday wish</h2>
          <div className="wish-display">"{wish}"</div>
          <button className="btn-primary" onClick={roll}>give me another one</button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer>
      <span className="heart" aria-hidden="true">💗</span>
      <div className="sign">Happy Birthday, Niyonika. I mean every ridiculous word of this.</div>
      <div className="note">— your brother, who made you a whole website instead of just texting "hbd"</div>
      <div className="note">— haa mene ye website ai se banayi hai heheheheh .. anyways sorry for the late wish 
        Happy birthdayy once again dii !!
        "</div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    // gentle welcome confetti on load
    const t = setTimeout(() => {
      safeConfetti({ particleCount: 80, spread: 70, origin: { y: 0.3 }, colors: ["#ff5f96", "#f4b740", "#ffc7dd"] });
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
  <>
    <Hero />
    <Cake />
    <AnnoyanceMeter />
    
    <BalloonPop />
    <WishGenerator />
    <Footer />
  </>
);
}
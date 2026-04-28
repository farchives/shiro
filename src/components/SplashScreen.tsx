import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "shiro-splash-shown";
const HOLD_MS = 3200;

export default function SplashScreen() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" && sessionStorage.getItem(KEY) === "1";
    if (!seen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    }
    setDecided(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setShow(false);
    }, reduce ? 700 : HOLD_MS);
    return () => clearTimeout(t);
  }, [show, reduce]);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
  };

  if (!decided) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-cream flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          {/* Soft radial glow behind the composition */}
          {!reduce && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 40% at 50% 48%, rgba(212,165,116,0.18), transparent 70%)",
              }}
            />
          )}

          {/* Drifting paw watermark in the background */}
          {!reduce && <BackgroundPaws />}

          <div className="relative flex flex-col items-center px-6">
            {/* Puppy mark with gentle scale-in */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <PuppyMark />
            </motion.div>

            {/* Eyebrow / kicker */}
            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-5 text-[11px] sm:text-xs font-bold tracking-[0.35em] uppercase text-tan-deep"
            >
              Welcome to
            </motion.p>

            {/* Caveat name with a left→right ink reveal */}
            <motion.div
              initial={
                reduce
                  ? { opacity: 0, clipPath: "inset(0 0 0 0)" }
                  : { opacity: 1, clipPath: "inset(0 100% 0 0)" }
              }
              animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
              transition={
                reduce
                  ? { duration: 0.4 }
                  : { duration: 1.2, delay: 0.7, ease: [0.55, 0.05, 0.25, 1] }
              }
              className="font-display text-[7.5rem] sm:text-[11rem] leading-[0.85] text-ink mt-1"
              style={{ willChange: "clip-path" }}
            >
              Shiro
            </motion.div>

            {/* Accent line */}
            {!reduce && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.0,
                  delay: 0.85,
                  ease: [0.55, 0.05, 0.25, 1],
                }}
                className="block h-[3px] w-44 sm:w-64 bg-tan-deep/70 rounded-full origin-left mt-3"
                style={{ willChange: "transform" }}
              />
            )}

            {/* Subtitle */}
            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base sm:text-lg text-ink-soft tracking-wide"
            >
              <span class="font-display text-2xl sm:text-3xl text-ink">
                Mini-Vacation
              </span>
              <span class="block text-xs sm:text-sm tracking-[0.25em] uppercase text-ink-soft mt-1">
                A guide to her care
              </span>
            </motion.p>

            {/* Walking paw-print loader */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.0 }}
              className="flex items-end gap-3 mt-9 h-6"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="block text-tan-deep/80"
                  style={{ transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)` }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          opacity: [0, 1, 1, 0],
                          y: [4, 0, 0, -2],
                        }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: 2.1 + i * 0.18,
                    times: [0, 0.25, 0.75, 1],
                    ease: "easeInOut",
                  }}
                >
                  <MiniPaw />
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PuppyMark() {
  return (
    <svg width="80" height="80" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="14" cy="28" rx="9" ry="14" fill="#D4A574" transform="rotate(-18 14 28)" />
      <ellipse cx="50" cy="28" rx="9" ry="14" fill="#D4A574" transform="rotate(18 50 28)" />
      <ellipse cx="32" cy="36" rx="18" ry="17" fill="#E8C9A0" />
      <ellipse cx="32" cy="44" rx="9" ry="7" fill="#FAF7F2" />
      <circle cx="25" cy="32" r="2.4" fill="#2A2620" />
      <circle cx="39" cy="32" r="2.4" fill="#2A2620" />
      <ellipse cx="32" cy="41" rx="2.6" ry="2" fill="#2A2620" />
      <path
        d="M 30 47 Q 32 51 34 47 Q 34 50 32 50 Q 30 50 30 47 Z"
        fill="#E07856"
      />
    </svg>
  );
}

function MiniPaw() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="6" cy="9" rx="2" ry="2.6" />
      <ellipse cx="18" cy="9" rx="2" ry="2.6" />
      <ellipse cx="9" cy="5" rx="1.7" ry="2.2" />
      <ellipse cx="15" cy="5" rx="1.7" ry="2.2" />
      <path d="M12 11c-3 0-5 2.2-5 5 0 2 1.6 3 3.2 3 1 0 1.3-.4 1.8-.4s.8.4 1.8.4c1.6 0 3.2-1 3.2-3 0-2.8-2-5-5-5z" />
    </svg>
  );
}

function BackgroundPaws() {
  // Soft, drifting paws in the background — adds depth without distracting
  const paws = [
    { x: "10%", y: "18%", size: 36, rot: -12, delay: 0 },
    { x: "82%", y: "22%", size: 28, rot: 18, delay: 0.4 },
    { x: "16%", y: "78%", size: 32, rot: 24, delay: 0.8 },
    { x: "85%", y: "82%", size: 38, rot: -22, delay: 1.2 },
    { x: "50%", y: "10%", size: 24, rot: 8, delay: 0.6 },
    { x: "50%", y: "92%", size: 26, rot: -8, delay: 1.0 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-tan/30">
      {paws.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <ellipse cx="6" cy="9" rx="2" ry="2.6" />
            <ellipse cx="18" cy="9" rx="2" ry="2.6" />
            <ellipse cx="9" cy="5" rx="1.7" ry="2.2" />
            <ellipse cx="15" cy="5" rx="1.7" ry="2.2" />
            <path d="M12 11c-3 0-5 2.2-5 5 0 2 1.6 3 3.2 3 1 0 1.3-.4 1.8-.4s.8.4 1.8.4c1.6 0 3.2-1 3.2-3 0-2.8-2-5-5-5z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

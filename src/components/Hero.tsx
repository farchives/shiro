import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroPhoto from "../assets/photos/IMG_8727.jpg?url";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.15]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-cream-soft"
    >
      <motion.div
        style={{ y, scale: photoScale }}
        className="absolute inset-0"
      >
        <img
          src={heroPhoto}
          alt="Shiro on her first birthday with a cake and party hat"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto max-w-4xl px-6 h-full flex flex-col items-center justify-end pb-20 md:pb-28 text-center"
      >
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-tan-deep drop-shadow-sm"
        >
          Shiro's
        </motion.p>

        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[16vw] md:text-[10rem] leading-[0.9] text-ink mt-2"
        >
          Mini-Vacation
        </motion.h1>

        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="max-w-xl text-base md:text-lg text-ink mt-3 leading-relaxed font-medium"
        >
          A little guide to keeping Shiro happy, well-rested, and out of trouble
          while she's in your care. Thanks for watching her.
        </motion.p>

        <motion.a
          href="#schedule"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={reduce ? undefined : { y: -2 }}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink text-cream font-semibold shadow-lift hover:bg-ink/90 transition-colors"
        >
          Start with her schedule
        </motion.a>
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-ink-soft"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}

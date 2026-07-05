"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { scaleIn, fadeUp, fadeIn } from "@/lib/animations";

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-4">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#080808] p-10 text-center shadow-2xl md:p-20"
      >
        <div className="pointer-events-none absolute -bottom-12 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-emerald-500 opacity-[0.05] blur-[90px]" />
        <motion.h2
          variants={fadeUp}
          className="font-heading text-4xl font-extrabold sm:text-5xl"
        >
          Unlock voice AI at scale <br className="hidden sm:block" />with an API call
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300 md:text-base"
        >
          Set up your first AI-qualified call campaign in under 15 minutes. No hardware. No hiring.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-8 py-4 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.03]"
          >
            Get Started Free
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/10 bg-white/[0.05] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Book a Demo
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

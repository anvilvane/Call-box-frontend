"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { scaleIn, slideLeft, slideRight } from "@/lib/animations";

export function SolutionsBannerSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-white/[0.05] bg-[#080808] p-10 text-center md:flex-row md:text-left md:p-14 animate-glow-pulse"
      >
        <motion.div variants={slideLeft} className="max-w-xl space-y-4">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Solutions that scale</h2>
          <p className="text-sm leading-relaxed text-slate-400">
            From a single SDR team to an enterprise BDR fleet running 100,000 concurrent calls — Callbox&apos;s infrastructure grows with you.
          </p>
        </motion.div>
        <motion.div variants={slideRight}>
          <Link
            href="/features"
            className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-slate-100 hover:scale-105"
          >
            Explore enterprise
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

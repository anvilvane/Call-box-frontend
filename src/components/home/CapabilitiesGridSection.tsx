"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { CAPABILITIES } from "@/lib/home-data";
import { fadeUp, staggerContainer, cardVariant } from "@/lib/animations";

export function CapabilitiesGridSection() {
  return (
    <section className="border-t border-white/[0.04] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-xs font-mono text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Enterprise-grade
          </span>
          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Enterprise-ready <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          by design
        </span>
          </h2>
          <p className="mt-4 text-sm text-slate-400">
            The features your compliance team will love and your engineering team will ship in hours, not months.
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((c) => (
            <motion.div
              key={c.title}
              variants={cardVariant}
              className="card-tilt rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 transition-all hover:border-emerald-500/20 hover:bg-emerald-500/[0.02]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                {c.icon}
              </div>
              <h4 className="font-heading text-base font-bold text-white">{c.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Server } from "lucide-react";
import { PIPELINE_STEPS } from "@/lib/home-data";
import { fadeUp, staggerContainer, cardVariant, slideRight } from "@/lib/animations";

export function PipelineSection() {
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 border-t border-white/[0.04] bg-black">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-14 max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-xs font-mono text-emerald-400">
          <Server className="h-3.5 w-3.5" /> Pipeline overview
        </span>
        <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
          One call. Six steps. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Zero manual effort.
          </span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          From the moment a lead raises their hand to the second a meeting lands in your calendar, Callbox handles everything inside a single, observable pipeline.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(360px,420px)_1fr] lg:items-start">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PIPELINE_STEPS.map((step, idx) => (
            <motion.button
              key={idx}
              variants={cardVariant}
              onClick={() => setActivePipelineStep(idx)}
              className={`w-full rounded-[28px] border bg-white/5 p-5 text-left transition-all duration-300 shadow-[inset_0_0_0_rgba(255,255,255,0),0_0_0_rgba(0,0,0,0)] ${
                activePipelineStep === idx
                  ? "border-emerald-500/30 bg-emerald-500/10 shadow-[0_24px_60px_-30px_rgba(52,211,153,0.8)]"
                  : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border ${
                  activePipelineStep === idx ? "border-emerald-400 bg-emerald-500/10" : "border-white/[0.08] bg-white/[0.04]"
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className={`text-base font-semibold ${activePipelineStep === idx ? "text-white" : "text-slate-100"}`}>
                      {step.title}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      activePipelineStep === idx ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5 text-slate-400"
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {activePipelineStep === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-3xl border border-emerald-500/10 bg-black/70 px-4 py-3 text-[11px] font-mono text-emerald-300">
                      {step.log}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:block sticky top-20 h-fit relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#050606] p-6 shadow-2xl"
          aria-hidden="true"
        >
          <Image
            src="/pipeline_overview.png"
            alt="Callbox pipeline overview with lead capture, transcription, qualification, voice call, smart routing, and appointment booked"
            width={1200}
            height={900}
            className="w-full select-none rounded-[28px] opacity-95 object-contain"
          />
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-black/70 via-transparent to-black/10" />
        </motion.div>

      </div>
    </section>
  );
}

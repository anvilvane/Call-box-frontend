"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { TESTIMONIALS } from "@/lib/home-data";
import { fadeUp } from "@/lib/animations";

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 border-t border-white/[0.04] text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="mx-auto max-w-2xl font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
          Trusted by startups and <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            enterprises
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
          Real results from sales teams that replaced manual follow-up with Callbox AI.
        </p>
      </motion.div>

      <div className="mt-14 relative grid h-[550px] grid-cols-1 gap-6 overflow-hidden text-left md:grid-cols-3">
        {/* Top and Bottom gradient masks — match the page black bg */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black to-transparent" />

        {/* Column 1 (Scrolls Up) */}
        <div className="flex flex-col gap-6 animate-marquee-up">
          {[...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(0, 3)].map((t, i) => (
            <div key={`col1-${i}`} className="flex flex-col justify-between rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6">
              <p className="text-xs italic leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                    {t.avatar ? (
                      <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${t.color} text-[10px] font-bold text-white`}>{t.initials}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{t.author}</p>
                    <p className="mt-0.5 text-[10px] font-mono text-slate-500">{t.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">{t.company}</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 (Scrolls Down) */}
        <div className="hidden flex-col gap-6 animate-marquee-down md:flex">
          {[...TESTIMONIALS.slice(3, 6), ...TESTIMONIALS.slice(3, 6)].map((t, i) => (
            <div key={`col2-${i}`} className="flex flex-col justify-between rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6">
              <p className="text-xs italic leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                    {t.avatar ? (
                      <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${t.color} text-[10px] font-bold text-white`}>{t.initials}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{t.author}</p>
                    <p className="mt-0.5 text-[10px] font-mono text-slate-500">{t.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">{t.company}</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3 (Scrolls Up) */}
        <div className="hidden flex-col gap-6 animate-marquee-up md:flex">
          {[...TESTIMONIALS.slice(6, 9), ...TESTIMONIALS.slice(6, 9)].map((t, i) => (
            <div key={`col3-${i}`} className="flex flex-col justify-between rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6">
              <p className="text-xs italic leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                    {t.avatar ? (
                      <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${t.color} text-[10px] font-bold text-white`}>{t.initials}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{t.author}</p>
                    <p className="mt-0.5 text-[10px] font-mono text-slate-500">{t.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">{t.company}</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

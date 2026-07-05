"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/home-data";
import { fadeUp, staggerContainer, cardVariant } from "@/lib/animations";

export function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-28" style={{background: '#040d0c'}}>

      {/* Blend from section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Left particle wave */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] opacity-50">
        <svg viewBox="0 0 200 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <defs>
            <linearGradient id="faqWaveL" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="80%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M30,0 Q120,100 50,200 Q-10,300 70,400 Q140,480 50,580 Q10,640 30,700" stroke="url(#faqWaveL)" strokeWidth="1" fill="none" />
          <path d="M60,0 Q150,120 80,220 Q20,320 100,420 Q170,500 80,600 Q30,660 60,700" stroke="url(#faqWaveL)" strokeWidth="0.5" fill="none" opacity="0.4" />
          {[{cx:32,cy:70},{cx:100,cy:150},{cx:52,cy:240},{cx:25,cy:330},{cx:72,cy:410},{cx:130,cy:480},{cx:55,cy:570},{cx:25,cy:650}].map((d,i)=>(
            <circle key={i} cx={d.cx} cy={d.cy} r="2.5" fill="#22d3ee" opacity={0.2+i*0.04} />
          ))}
          {[{cx:150,cy:90,r:1.5},{cx:170,cy:200,r:1},{cx:160,cy:330,r:1.5},{cx:180,cy:450,r:1},{cx:155,cy:560,r:1.5}].map((d,i)=>(
            <circle key={`sd${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#34d399" opacity="0.2" />
          ))}
        </svg>
      </div>

      {/* Right particle wave */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] opacity-50">
        <svg viewBox="0 0 200 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <defs>
            <linearGradient id="faqWaveR" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="80%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M170,0 Q80,100 150,200 Q210,300 130,400 Q60,480 150,580 Q190,640 170,700" stroke="url(#faqWaveR)" strokeWidth="1" fill="none" />
          <path d="M140,0 Q50,120 120,220 Q180,320 100,420 Q30,500 120,600 Q170,660 140,700" stroke="url(#faqWaveR)" strokeWidth="0.5" fill="none" opacity="0.4" />
          {[{cx:168,cy:70},{cx:100,cy:150},{cx:148,cy:240},{cx:175,cy:330},{cx:128,cy:410},{cx:70,cy:480},{cx:145,cy:570},{cx:175,cy:650}].map((d,i)=>(
            <circle key={i} cx={d.cx} cy={d.cy} r="2.5" fill="#22d3ee" opacity={0.2+i*0.04} />
          ))}
          {[{cx:40,cy:100,r:1.5},{cx:25,cy:210,r:1},{cx:35,cy:340,r:1.5},{cx:20,cy:460,r:1},{cx:40,cy:570,r:1.5}].map((d,i)=>(
            <circle key={`sd${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#34d399" opacity="0.2" />
          ))}
        </svg>
      </div>

      {/* Scattered micro particles */}
      {[{t:'12%',l:'28%'},{t:'30%',l:'70%'},{t:'55%',l:'20%'},{t:'72%',l:'78%'},{t:'88%',l:'35%'}].map((p,i)=>(
        <div key={i} className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-400/20"
          style={{top:p.t, left:p.l, boxShadow:'0 0 6px rgba(34,211,238,0.35)'}} />
      ))}

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-3xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
            <Zap className="h-3.5 w-3.5" /> Quick answers
          </span>

          {/* Heading */}
          <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              questions
            </span>
          </h2>

          {/* Underline accent */}
          <div className="mx-auto mt-3 h-[2px] w-20 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-60" />

          <p className="mt-5 text-sm text-slate-400">
            Everything you need to know about Callbox — answered.
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 space-y-4"
        >
          {FAQS.map((faq, idx) => {
            const open = activeFaq === idx;
            return (
              <motion.div
                key={idx}
                variants={cardVariant}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  open
                    ? "border-emerald-500/30 bg-[#061a16] shadow-[0_0_24px_rgba(52,211,153,0.07)]"
                    : "border-emerald-900/50 bg-[#040f0c] hover:border-emerald-700/50 hover:bg-[#051310]"
                }`}
              >
                <button
                  onClick={() => setActiveFaq(open ? null : idx)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  {/* Icon box */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08]">
                    {faq.icon}
                  </div>
                  <span className="flex-1 text-sm font-semibold text-white md:text-base">{faq.q}</span>
                  <ChevronDown className={`ml-2 h-5 w-5 shrink-0 transition-transform duration-300 ${
                    open ? "rotate-180 text-emerald-400" : "text-slate-500"
                  }`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-emerald-500/10 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-400">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Database, Sliders, BarChart3, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer, cardVariant } from "@/lib/animations";

export function JourneyCardsSection() {
  return (
    <section className="relative overflow-hidden py-28" style={{background: '#040d0c'}}>
      {/* Blend from section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Left particle wave */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] opacity-50">
        <svg viewBox="0 0 200 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <defs>
            <linearGradient id="growthWaveL" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="80%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M30,0 Q120,100 50,200 Q-10,300 70,400 Q140,480 50,580 Q10,640 30,700" stroke="url(#growthWaveL)" strokeWidth="1" fill="none" />
          <path d="M60,0 Q150,120 80,220 Q20,320 100,420 Q170,500 80,600 Q30,660 60,700" stroke="url(#growthWaveL)" strokeWidth="0.5" fill="none" opacity="0.4" />
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
            <linearGradient id="growthWaveR" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="80%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M170,0 Q80,100 150,200 Q210,300 130,400 Q60,480 150,580 Q190,640 170,700" stroke="url(#growthWaveR)" strokeWidth="1" fill="none" />
          <path d="M140,0 Q50,120 120,220 Q180,320 100,420 Q30,500 120,600 Q170,660 140,700" stroke="url(#growthWaveR)" strokeWidth="0.5" fill="none" opacity="0.4" />
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
          style={{top:p.t, left:p.l, boxShadow:'0 0 6px rgba(34,211,238,0.4)'}} />
      ))}

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="mx-auto max-w-2xl font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Choose your{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              growth path
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
            Whether you want a no-code deployment or a fully custom SDK integration, Callbox fits.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: <Code className="h-5 w-5 text-emerald-400" />,
              title: "Build with our API",
              body: "Full programmatic control. Trigger calls, stream transcripts, and define custom qualification logic via REST or webhooks.",
              cta: "Read the docs",
              href: "/contact",
            },
            {
              icon: <Database className="h-5 w-5 text-emerald-400" />,
              title: "Connect your CRM",
              body: "One-click integrations with HubSpot, Salesforce, Zoho, and Pipedrive. BANT scores and recordings sync automatically.",
              cta: "See integrations",
              href: "/features",
            },
            {
              icon: <Sliders className="h-5 w-5 text-emerald-400" />,
              title: "Custom voice & script",
              body: "Clone your brand voice, write your qualification playbook, and A/B test scripts — all inside the dashboard.",
              cta: "View plans",
              href: "/pricing",
            },
            {
              icon: <BarChart3 className="h-5 w-5 text-emerald-400" />,
              title: "Real-time Analytics",
              body: "Track calls, conversion rates, talk time, and objections in real-time with beautiful dashboards.",
              cta: "Explore analytics",
              href: "/features",
            },
            {
              icon: <Globe className="h-5 w-5 text-emerald-400" />,
              title: "Multi-language Support",
              body: "Engage prospects in 20+ languages with native-like AI voice and localized experiences.",
              cta: "See languages",
              href: "/features",
            },
            {
              icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
              title: "Enterprise Compliance",
              body: "SOC 2 Type II, GDPR-ready, and HIPAA compliant. Your data is safe with us.",
              cta: "Security details",
              href: "/contact",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariant}
              className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-emerald-900/60 bg-[#040f0f] p-7 transition-all duration-300 hover:border-emerald-500/30 hover:bg-[#061414] hover:shadow-[0_0_32px_rgba(52,211,153,0.06)]"
            >
              <div className="space-y-4">
                {/* Icon box */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] transition-all group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.12]">
                  {card.icon}
                </div>
                <h4 className="font-heading text-lg font-bold text-white">{card.title}</h4>
                <p className="text-xs leading-relaxed text-slate-400">{card.body}</p>
              </div>
              <Link
                href={card.href}
                className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 transition-all group-hover:text-emerald-300 group-hover:gap-2"
              >
                {card.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

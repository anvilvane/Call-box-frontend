"use client";

import { motion } from "framer-motion";
import { 
  Volume2, FastForward, Settings, Globe, PhoneCall, 
  Layers, Database, ArrowUpRight, Target, 
  Mail, ShieldAlert, LineChart
} from "lucide-react";
import { PrimaryCta } from "@/components/cta";

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -36 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const GROUPS = [
  {
    name: "Calling Engine",
    tag: "The voice",
    description: "Highly human voice interactions fine-tuned for latency and flow.",
    items: [
      { title: "AI Voice Calls", body: "Natural, human-like voice AI that qualifies leads, answers queries, and hooks meetings on calendar.", icon: <Volume2 className="h-5 w-5 text-accent-blue" /> },
      { title: "<800ms Latency", body: "Tuned STT → LLM → TTS pipelines allowing smooth back-and-forth conversation without lag.", icon: <FastForward className="h-5 w-5 text-accent-cyan" /> },
      { title: "Dynamic Script Builder", body: "Define details like company voice tone, qualification rules, scripts, and calendar parameters.", icon: <Settings className="h-5 w-5 text-accent-purple" /> },
      { title: "Multi-Language Support", body: "Speaks English, Hindi, and more naturally. Switch dialer language per agent rules.", icon: <Globe className="h-5 w-5 text-accent-blue" /> },
    ],
  },
  {
    name: "Leads & CRM Integration",
    tag: "The pipeline",
    description: "Keep your sales pipeline organized and qualification records automated.",
    items: [
      { title: "Speed-to-lead under 30s", body: "Automatically trigger voice qualified dials as soon as inbound form is captured.", icon: <PhoneCall className="h-5 w-5 text-accent-blue" /> },
      { title: "Scoring & Routing", body: "Set lead tier thresholds and assign incoming qualified prospects to specific reps.", icon: <Layers className="h-5 w-5 text-accent-cyan" /> },
      { title: "Summaries & Transcripts", body: "Every call saves audio recordings, text-transcripts, and quick AI qualification notes.", icon: <Database className="h-5 w-5 text-accent-purple" /> },
      { title: "Human Rep Handoff", body: "Instantly transfer high-value active prospects to human reps with a click or alert.", icon: <ArrowUpRight className="h-5 w-5 text-accent-blue" /> },
    ],
  },
  {
    name: "Ads & Auto-Nurture",
    tag: "The growth",
    description: "Keep leads warm even if they miss the first call attempt.",
    items: [
      { title: "Paid Ads Connector", body: "Directly capture Meta and Google leads, tracking conversion from ad click to meeting.", icon: <Target className="h-5 w-5 text-accent-blue" /> },
      { title: "30-Day Multi-Channel", body: "Automatically follow up on no-answer calls across SMS, WhatsApp messages, and email.", icon: <Mail className="h-5 w-5 text-accent-cyan" /> },
      { title: "Strict Compliance", body: "Built-in opt-outs, quiet hours, DND filtering, and compliance parameters.", icon: <ShieldAlert className="h-5 w-5 text-accent-purple" /> },
      { title: "ROI Dashboard", body: "View visual funnel performance, lead costs, and booked meeting rates.", icon: <LineChart className="h-5 w-5 text-accent-blue" /> },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Header section */}
      <section className="relative mx-auto max-w-4xl px-6 pt-16 pb-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono text-slate-400"
        >
          Full platform overview
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
        >
          One platform, the <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">whole sales loop</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-slate-300"
        >
          From the instant an ad is clicked to the moment a qualified meeting is booked on your calendar — Callbox handles it all.
        </motion.p>
      </section>

      {/* Feature groups list */}
      <section className="relative mx-auto max-w-6xl space-y-24 px-6 pb-24 z-10">
        {GROUPS.map((g, groupIdx) => (
          <div key={g.name} className="space-y-8">
            {/* Group header */}
            <motion.div 
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-baseline gap-3"
            >
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{g.name}</h2>
              <div className="flex gap-2">
                <span className="rounded-full border border-accent-purple/20 bg-accent-purple/5 px-3 py-1 text-xs font-semibold text-accent-purple">
                  {g.tag}
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="text-sm text-slate-400 max-w-xl"
            >
              {g.description}
            </motion.p>
            
            {/* Cards grid with stagger */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {g.items.map((item, itemIdx) => (
                <motion.div 
                  key={item.title} 
                  variants={cardVariant}
                  whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.25 } }}
                  className="glass-card rounded-2xl p-6 relative cursor-default"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-heading text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Glow section divider (between groups) */}
            {groupIdx < GROUPS.length - 1 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="section-glow-line origin-left"
              />
            )}
          </div>
        ))}

        {/* Bottom CTA Card */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-white/10 bg-neutral-800/80 p-8 md:p-12 text-center relative overflow-hidden animate-glow-pulse"
        >
          <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-[200px] w-[400px] rounded-full bg-accent-purple opacity-10 blur-[70px]" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="font-heading text-2xl font-bold text-white md:text-3xl"
          >
            Ready to qualify your inbound leads?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mx-auto mt-3 max-w-lg text-slate-300 text-sm"
          >
            Launch your custom voice qualifiers and experience live speed-to-lead booking results in minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-8 flex justify-center"
          >
            <PrimaryCta />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

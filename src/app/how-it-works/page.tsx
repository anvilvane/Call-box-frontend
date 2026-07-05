"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Phone,
  Link2,
  Send,
  Database,
  Zap,
  ShieldCheck,
  Edit3,
} from "lucide-react";
import { PrimaryCta, SecondaryCta } from "@/components/cta";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const stepVariant = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const STEPS = [
  {
    n: "01",
    title: "Configure Your Agent Script",
    description:
      "Write your sales prompt, select tone parameters, and pick high-fidelity voice profiles in the simple dashboard builder.",
    icon: <Edit3 className="h-5 w-5 text-cyan-400" />,
  },
  {
    n: "02",
    title: "Plug Lead Channels In",
    description:
      "Link Facebook Ads, Google Form webhooks, or custom APIs. As soon as leads fill contact forms, they instantly sync.",
    icon: <Link2 className="h-5 w-5 text-cyan-400" />,
  },
  {
    n: "03",
    title: "Qualified Calling under 30s",
    description:
      "Callbox AI triggers voice qualified calls within 30 seconds, answering questions, resolving logic, and offering booking calendars.",
    icon: <Zap className="h-5 w-5 text-cyan-400" />,
  },
  {
    n: "04",
    title: "Nurture & Close Automatically",
    description:
      "Follow-ups, reminders, and smart nurtures happen automatically until the lead converts. More meetings. More revenue.",
    icon: <ShieldCheck className="h-5 w-5 text-cyan-400" />,
  },
];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const stepPanels = [
    {
      tag: "agent_builder_v2.config",
      title: "Agent Voice Profile",
      subtitle: "Olivia (US Professional)",
      status: "Active",
      bar: 80,
      body:
        "If lead has > $5k monthly ad budget, offer the Enterprise schedule link. Otherwise offer the standard tier booking.",
    },
    {
      tag: "form_webhooks_hook.json",
      title: "Inbound Lead Captured",
      subtitle: "Name: John Doe · Phone: +1 555-0199",
      status: "Forwarded",
      bar: 100,
      body:
        "New lead data arrives instantly from webhooks and syncs to the AI engine for fast qualification.",
    },
    {
      tag: "dialer_process_call",
      title: "AI Voice Qualification",
      subtitle: "Live with prospect",
      status: "Live",
      bar: 75,
      body:
        "Callbox asks high-value questions, captures intent, and surfaces booking readiness in real time.",
    },
    {
      tag: "crm_sync_pipeline.db",
      title: "CRM Sync Complete",
      subtitle: "Deal Name: John Doe (Qualified)",
      status: "Meeting Booked",
      bar: 100,
      body:
        "Summaries, transcripts, and call notes are stored automatically while calendar events sync.",
    },
  ];

  const panel = stepPanels[activeStep];

  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-[#040506] text-white">
      <section className="relative mx-auto max-w-5xl px-6 pt-20 pb-10 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.35em] text-cyan-300"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300"><Zap className="h-3.5 w-3.5" /></span>
          FOUR SIMPLE STEPS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
        >
          The entire qualification and nurturing flow
          <br />
          runs on <span className="text-cyan-400">autopilot, 24/7</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-slate-300"
        >
          A polished automation experience that turns inbound lead capture into booked meetings without manual follow-up.
        </motion.p>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <motion.button
                  key={step.n}
                  variants={stepVariant}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className={`w-full rounded-[2rem] border p-6 text-left transition-all ${
                    isActive
                      ? "border-cyan-400/25 bg-white/5 shadow-[0_30px_120px_-90px_rgba(34,211,238,0.5)]"
                      : "border-white/5 bg-white/5/10 hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-3xl border ${
                        isActive ? "border-cyan-400 bg-cyan-500/10" : "border-white/10 bg-white/5"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-cyan-300">{step.n}</span>
                        <span className="h-px flex-1 bg-white/10" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[2rem] border border-white/10 bg-black/60 shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div className="border-b border-white/5 bg-[#040506] px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">
                  sales_os_simulation.app
                </span>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                live preview
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                      {panel.tag}
                    </div>
                    <div className="mt-3 text-base font-semibold text-white">{panel.title}</div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                    {panel.status}
                  </span>
                </div>
                <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${panel.bar}%` }} />
                </div>
                <div className="mt-5 text-sm leading-relaxed text-slate-300">{panel.body}</div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
                <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                  Dynamic script instructions
                </div>
                <p className="mt-4 text-sm font-mono leading-relaxed text-slate-300">
                  &quot;If lead has &gt; $5k monthly ad budget, offer the Enterprise schedule link. Otherwise offer the standard tier booking.&quot;
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-[11px] text-slate-400">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-bold text-white">&lt; 30s</div>
                  <div className="mt-2 text-slate-500">Response time</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-bold text-white">24/7</div>
                  <div className="mt-2 text-slate-500">Calls made</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="font-bold text-white">3.2x</div>
                  <div className="mt-2 text-slate-500">Conversion</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-20 z-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-white/10 bg-neutral-800/80 p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-[200px] w-[400px] rounded-full bg-cyan-400 opacity-10 blur-[70px]" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="font-heading text-2xl font-bold text-white md:text-3xl"
          >
            Ready to automate your response loop?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mx-auto mt-3 max-w-lg text-slate-300 text-sm"
          >
            Connect your channels, configure scripts, and qualify your first prospect call in minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <PrimaryCta />
            <SecondaryCta />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

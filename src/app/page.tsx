"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Phone, Zap, Bot, BarChart3, Check, ChevronDown, Layers,
  ArrowRight, Gem, Circle, Activity, ShieldAlert, Cpu,
  Share2, Code, Sliders, Volume2, ShieldCheck, Database, Server, Globe,
  Clock, MessageSquare, Settings2
} from "lucide-react";

import { PrimaryCta } from "@/components/cta";

/* ─────────────────────────────────────────
   Static data — Callbox AI content only
───────────────────────────────────────── */

const CAPABILITIES = [
  {
    icon: <Activity className="h-5 w-5 text-white" />,
    title: "Sub-800ms Response Latency",
    body: "Engineered for real-time conversations. Our speech stack delivers answers before the lead even finishes their sentence.",
  },
  {
    icon: <ShieldAlert className="h-5 w-5 text-white" />,
    title: "SOC 2 & GDPR Ready",
    body: "End-to-end encrypted call recordings, automatic PII redaction, and configurable data retention windows.",
  },
  {
    icon: <Cpu className="h-5 w-5 text-white" />,
    title: "Webhook-First API",
    body: "Every call event — answered, objection raised, meeting booked — fires a structured JSON webhook to your stack.",
  },
  {
    icon: <Share2 className="h-5 w-5 text-white" />,
    title: "Omni-Channel Fallback",
    body: "No answer? Callbox automatically cascades to WhatsApp, SMS, and personalised email sequences without you lifting a finger.",
  },
  {
    icon: <Bot className="h-5 w-5 text-white" />,
    title: "Bring Your Own Voice",
    body: "Clone your brand spokesperson's voice or choose from 40+ pre-built personas across 20 languages.",
  },
  {
    icon: <Layers className="h-5 w-5 text-white" />,
    title: "Unlimited Concurrent Dials",
    body: "Run thousands of simultaneous outbound calls with zero queue time. Scale a campaign from 10 leads to 100,000 in minutes.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Our reps used to wait hours before calling a new lead. Callbox AI calls within 28 seconds of form submit — our show rate jumped 38% in the first month.",
    author: "Priya Mehta",
    role: "Head of Inside Sales",
    company: "Growfast",
    avatar: "/avatar_priya.png",
    initials: "PM",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote: "We embedded the Callbox SDK into our HubSpot workflow in an afternoon. Transcripts, sentiment scores, and next steps land in the CRM automatically.",
    author: "James Kowalski",
    role: "RevOps Lead",
    company: "Stackify",
    avatar: "/avatar_james.png",
    initials: "JK",
    color: "from-blue-500 to-indigo-600",
  },
  {
    quote: "The voice quality is indistinguishable from a trained SDR. Prospects book demos without realising they spoke to an AI — conversion rate up 52%.",
    author: "Amara Osei",
    role: "Founder",
    company: "LeadBridge",
    avatar: "/avatar_amara.png",
    initials: "AO",
    color: "from-purple-500 to-violet-600",
  },
  {
    quote: "Before Callbox, we were burning marketing spend on leads that never answered. Now, every lead is touched instantly, day or night.",
    author: "Carlos Ruiz",
    role: "VP of Marketing",
    company: "Nexus",
    avatar: "/avatar_carlos.png",
    initials: "CR",
    color: "from-orange-500 to-red-600",
  },
  {
    quote: "Scaling from 5 to 50 outbound campaigns was effortless. The AI handles the initial qualification, leaving our closers to focus purely on closing.",
    author: "Sarah Jenkins",
    role: "Director of Sales",
    company: "CloudScale",
    avatar: "/avatar_sarah.png",
    initials: "SJ",
    color: "from-pink-500 to-rose-600",
  },
  {
    quote: "It's not just the speed, it's the accuracy. The BANT extraction on every call is flawless. Best AI tool we've implemented this year.",
    author: "David Chen",
    role: "CEO",
    company: "Pioneer Software",
    avatar: "/avatar_david.png",
    initials: "DC",
    color: "from-cyan-500 to-blue-600",
  },
  {
    quote: "We replaced three disparate tools for scheduling, transcription, and dialing. Callbox does all of it, and integrates flawlessly into Salesforce.",
    author: "Elena Rostov",
    role: "Sales Operations",
    company: "Velocity",
    avatar: "/avatar_elena.png",
    initials: "ER",
    color: "from-teal-500 to-emerald-600",
  },
  {
    quote: "Our speed-to-lead was averaging 4 hours. With Callbox, it's 15 seconds. You can't put a price on capturing a prospect right at the peak of their intent.",
    author: "Marcus T.",
    role: "Growth Marketer",
    company: "Fintech Co",
    avatar: "/avatar_marcus.png",
    initials: "MT",
    color: "from-amber-500 to-orange-600",
  },
  {
    quote: "I was skeptical about AI voice, but Callbox sounds incredibly natural. We've actually had leads compliment our 'reps' on their friendly tone.",
    author: "Olivia Wang",
    role: "Managing Director",
    company: "BlueSky Agencies",
    avatar: "/avatar_olivia.png",
    initials: "OW",
    color: "from-violet-500 to-purple-600",
  },
];

const TABS = [
  { id: "inbound", label: "Speed-to-Lead" },
  { id: "outbound", label: "Outbound Dialer" },
  { id: "telephony", label: "SIP Trunks" },
  { id: "sdk", label: "Developer SDK" },
];

const PIPELINE_STEPS = [
  {
    icon: <Circle className="h-4 w-4 text-emerald-400" />,
    title: "Capture Lead Signal",
    status: "Listening…",
    desc: "Callbox monitors your web forms, ad leads, and CRM new-contact triggers in real time.",
    log: "> lead_event received: source=Meta_Ads id=8821",
  },
  {
    icon: <Volume2 className="h-4 w-4 text-emerald-400" />,
    title: "Speech-to-Text Transcription",
    status: "Transcribing…",
    desc: "Every spoken word is converted to structured text with speaker diarisation and timestamps.",
    log: "> transcript: 'We use Salesforce but struggle with speed…'",
  },
  {
    icon: <Bot className="h-4 w-4 text-emerald-400" />,
    title: "Intent & Qualification Engine",
    status: "Analysing…",
    desc: "Our LLM extracts BANT criteria, objections, and next-step intent from the conversation.",
    log: "> qualification: Budget=YES Authority=YES Need=HIGH",
  },
  {
    icon: <Activity className="h-4 w-4 text-emerald-400" />,
    title: "Natural Voice Synthesis",
    status: "Speaking…",
    desc: "Responses are synthesised in under 400 ms using your selected voice persona and language.",
    log: "> tts: voice=Aisha-IN latency=380ms",
  },
  {
    icon: <Phone className="h-4 w-4 text-emerald-400" />,
    title: "Telephony & SIP Delivery",
    status: "Routing…",
    desc: "Audio is delivered over your existing SIP trunk or our managed VoIP infrastructure.",
    log: "> sip_trunk: ping=138ms jitter=1.4ms packet_loss=0%",
  },
  {
    icon: <Check className="h-4 w-4 text-emerald-400" />,
    title: "Appointment Confirmed",
    status: "Completed",
    desc: "A confirmed meeting is added to the calendar and the deal is set to demo-ready.",
    log: "> calendar invite sent · meeting booked",
  },
];

const FAQS = [
  {
    icon: <Clock className="h-5 w-5 text-emerald-400" />,
    q: "How quickly does Callbox call a new lead?",
    a: "Within 30 seconds of a form submission, webhook, or CRM trigger. Our infrastructure maintains warm telephony connections to eliminate cold-start delays.",
  },
  {
    icon: <Phone className="h-5 w-5 text-emerald-400" />,
    q: "Can I use my own phone numbers?",
    a: "Yes. Bring your existing Twilio, Vonage, or SIP numbers, or provision new virtual numbers from our pool in 40+ countries.",
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-emerald-400" />,
    q: "How does Callbox handle objections or off-script questions?",
    a: "The underlying LLM is guided by your qualification playbook but handles unexpected questions naturally. You can review every transcript and refine the playbook from the dashboard.",
  },
  {
    icon: <Settings2 className="h-5 w-5 text-emerald-400" />,
    q: "Does it integrate with our existing CRM?",
    a: "Out of the box: HubSpot, Salesforce, Zoho, Pipedrive, and any tool that accepts webhooks. Call recordings, transcripts, and BANT scores are synced automatically.",
  },
];

/* ─────────────────────────────────────────
   Animation variants
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("inbound");
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  /* ── simulator state ── */
  const [callState, setCallState] = useState<"idle" | "ringing" | "live" | "done">("idle");
  const [agentText, setAgentText] = useState("");
  const [leadText, setLeadText] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const pushLog = (msg: string) =>
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));

  const startSim = (num = "") => {
    setCallState("ringing");
    setAgentText("");
    setLeadText("");
    setLogs([]);
    pushLog(num ? `Dialling ${num}…` : "Initiating outbound call…");

    setTimeout(() => {
      setCallState("live");
      setAgentText("Hi! I'm calling from Callbox AI on behalf of the sales team. I saw you requested information about automating your lead qualification — is now a good time?");
      pushLog("Trunk connected · latency 142 ms");

      setTimeout(() => {
        setLeadText("Yeah, sure. We're a 40-person SaaS company. We use HubSpot but our reps are too slow to follow up.");
        pushLog("Sentiment: Interested · BANT: Need=HIGH");

        setTimeout(() => {
          setAgentText("Got it. Callbox can call every new lead within 30 seconds and push a qualified summary straight into HubSpot. Want me to book a 15-minute setup call with our team?");
          pushLog("Objection handler: CRM_sync triggered");

          setTimeout(() => {
            setLeadText("Yes, Wednesday at 3 PM works for me.");
            pushLog("Booking intent confirmed");

            setTimeout(() => {
              setCallState("done");
              setAgentText("Perfect — you'll receive a calendar invite shortly. Have a great day!");
              setLeadText("");
              pushLog("HubSpot updated · deal_stage=Demo_Scheduled");
            }, 2800);
          }, 3000);
        }, 3200);
      }, 3000);
    }, 2400);
  };

  return (
    <div className="relative w-full overflow-hidden bg-black text-white selection:bg-emerald-500/30">

      {/* ── ambient glows (Deepgram-style radial) ── */}
      <div className="pointer-events-none -z-10 absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-emerald-600/10 blur-[140px]" />
        <div className="absolute -left-32 top-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div className="absolute -right-32 top-2/3 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO  (Deepgram: centered)
      ══════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-8 text-center md:pt-12 md:pb-24">

        {/* announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.12)] animate-glow-pulse"
        >
          <Gem className="h-3.5 w-3.5" />
          <span>Callbox 2.0 — qualify every lead in under 30 seconds</span>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl font-heading text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-[3.75rem]"
        >
          The AI Sales OS that{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            never misses a lead
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
          Callbox AI calls every inbound lead within 30 seconds, qualifies them in a natural two-way conversation, and books a meeting — all without a single SDR lifting a finger.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-8 py-4 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.03] hover:from-emerald-500 hover:to-cyan-600"
          >
            Start for Free
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5"
          >
            Talk to Sales
          </Link>
        </motion.div>

        {/* ── Deepgram-style interactive sandbox ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#080808] shadow-2xl">

            {/* tab bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-4">
              <div className="flex flex-wrap gap-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold font-mono transition-all ${
                      activeTab === t.id
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-500 text-black shadow-md"
                        : "bg-white/[0.04] text-slate-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Sandbox live
              </div>
            </div>

            {/* pane */}
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-12 min-h-[280px] items-center">

              {/* — Speed-to-Lead tab — */}
              {activeTab === "inbound" && (
                <>
                  <div className="space-y-4 text-left md:col-span-5">
                    <h3 className="font-heading text-lg font-bold">Speed-to-Lead Callback</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      The moment a prospect fills your form, Callbox dials them automatically. Enter any number below to experience it live.
                    </p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (phone.length !== 10) {
                          setPhoneError("Please enter a valid 10-digit number.");
                          return;
                        }
                        setPhoneError("");
                        startSim(phone);
                      }}
                      className="flex max-w-sm items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-1 focus-within:border-emerald-500/40"
                    >
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={phone}
                        maxLength={10}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                          // Block if first digit is 0–5
                          if (digits.length > 0 && parseInt(digits[0]) <= 5) return;
                          setPhone(digits);
                          setPhoneError("");
                        }}
                        className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                      />
                      <button
                        type="submit"
                        className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold text-black hover:bg-slate-100"
                      >
                        Call me
                      </button>
                    </form>
                    {phoneError && (
                      <p className="mt-1.5 text-[10px] font-mono text-red-400">{phoneError}</p>
                    )}
                  </div>

                  {/* live display */}
                  <div className="space-y-3 rounded-xl border border-white/[0.05] bg-black/40 p-5 md:col-span-7">
                    {callState === "idle" ? (
                      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                        <div className="relative h-14 w-14">
                          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/10" />
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                            <Phone className="h-6 w-6 text-emerald-400" />
                          </div>
                        </div>
                        <p className="text-[11px] font-mono text-slate-500">Awaiting trigger…</p>
                      </div>
                    ) : (
                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-2">
                          <div className="relative h-7 w-7 shrink-0">
                            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
                            <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                              <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                            {callState === "done" ? "Call Complete" : "Live Conversation"}
                          </span>
                        </div>
                        {agentText && (
                          <div className="rounded-lg border border-white/[0.05] bg-black/60 p-3">
                            <p className="mb-1 text-[9px] font-mono font-bold uppercase text-emerald-400">Callbox AI</p>
                            <p className="text-xs font-mono text-slate-300">{agentText}</p>
                          </div>
                        )}
                        {leadText && (
                          <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                            <p className="mb-1 text-[9px] font-mono font-bold uppercase text-slate-400">Lead</p>
                            <p className="text-xs font-mono text-slate-300">{leadText}</p>
                          </div>
                        )}
                        <div className="space-y-0.5 rounded-lg border border-white/[0.04] bg-black/80 p-3">
                          {logs.map((l, i) => (
                            <p key={i} className="truncate text-[10px] font-mono text-slate-500">
                              <span className="text-emerald-500">›</span> {l}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* — Outbound Dialer tab — */}
              {activeTab === "outbound" && (
                <>
                  <div className="space-y-4 text-left md:col-span-5">
                    <h3 className="font-heading text-lg font-bold">Outbound Campaign Dialer</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Upload a list, set your qualification script, and launch thousands of concurrent calls — no reps needed.
                    </p>
                    <button
                      onClick={() => startSim()}
                      className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-5 py-2.5 text-xs font-bold text-black transition-all hover:opacity-95"
                    >
                      Simulate Campaign
                    </button>
                  </div>
                  <div className="rounded-xl border border-white/[0.05] bg-black/40 p-5 font-mono text-xs md:col-span-7 space-y-3">
                    <div className="flex justify-between border-b border-white/[0.05] pb-2 text-[10px] text-slate-500">
                      <span>Campaign › Q3 Enterprise Outbound</span>
                      <span className="text-emerald-400">● RUNNING</span>
                    </div>
                    {[["Contacts loaded", "8,400"], ["Concurrent agents", "200"], ["Calls completed", "3,217"], ["Meetings booked", "468 (14.6%)"], ["Avg call duration", "2m 41s"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-slate-400">{k}</span>
                        <span className="font-bold text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* — SIP Trunks tab — */}
              {activeTab === "telephony" && (
                <>
                  <div className="space-y-4 text-left md:col-span-5">
                    <h3 className="font-heading text-lg font-bold">SIP Trunk Configuration</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Plug Callbox into your existing Twilio, Vonage, or BYOC SIP infrastructure. Full control over routing, redundancy, and geo-distribution.
                    </p>
                  </div>
                  <div className="space-y-2 rounded-xl border border-white/[0.05] bg-black/40 p-5 font-mono text-xs md:col-span-7">
                    {[
                      ["Trunk status", "● Operational", "text-emerald-400"],
                      ["Active channels", "200 / 500", "text-white"],
                      ["Round-trip latency", "138 ms", "text-white"],
                      ["Packet loss", "0.0 %", "text-white"],
                      ["Region", "ap-south-1 (Mumbai)", "text-white"],
                    ].map(([k, v, cls]) => (
                      <div key={k} className="flex justify-between rounded border border-white/[0.04] bg-black/50 px-3 py-2.5">
                        <span className="text-slate-400">{k}</span>
                        <span className={`font-bold ${cls}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* — Developer SDK tab — */}
              {activeTab === "sdk" && (
                <>
                  <div className="space-y-4 text-left md:col-span-5">
                    <h3 className="font-heading text-lg font-bold">Developer SDK</h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Five lines of code to launch your first AI-qualified call. SDKs available for Node, Python, Go, and Ruby.
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-white/[0.05] bg-[#0c0c0c] p-5 md:col-span-7">
                    <pre className="text-[11px] leading-relaxed text-slate-300 font-mono">
{`import Callbox from '@callbox/sdk';

const client = new Callbox({ apiKey: process.env.CALLBOX_KEY });

const call = await client.calls.create({
  to: '+919876543210',
  agent: 'aisha-in-v2',
  playbook: 'enterprise-qualification',
  crm: { provider: 'hubspot', dealStage: 'Demo Scheduled' },
});

console.log(call.status); // 'queued'`}
                    </pre>
                  </div>
                </>
              )}

            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — LOGO CLOUD  (grey, marquee)
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden border-y border-neutral-200 bg-[#f4f4f5] py-20">
        <div className="mx-auto mb-10 max-w-6xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 md:text-base">
            Vetted by high-growth sales organisations
          </p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#f4f4f5] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#f4f4f5] to-transparent z-10" />
          <div className="animate-marquee flex items-center">
            {[...Array(10)].map((_, loop) => (
              <div key={loop} className="flex shrink-0 items-center gap-20 pr-20">
                {/* Stripe */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5949F5]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="5.5,9.5 18.5,6.5 18.5,15.5 5.5,18.5" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-[#111827]">stripe</span>
                </div>
                {/* Vercel */}
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 116 100" className="h-7 w-auto text-black"><path fill="currentColor" d="M57.5 0L115 100H0L57.5 0Z" /></svg>
                  <span className="text-xl font-black text-black">Vercel</span>
                </div>
                {/* Supabase */}
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 109 113" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#supaGrad1)"/>
                    <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#supaGrad2)" fillOpacity="0.2"/>
                    <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.04075L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/>
                    <defs>
                      <linearGradient id="supaGrad1" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#249361"/>
                        <stop offset="1" stopColor="#3ECF8E"/>
                      </linearGradient>
                      <linearGradient id="supaGrad2" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
                        <stop/>
                        <stop offset="1" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-xl font-extrabold text-black">supabase</span>
                </div>
                {/* Retool */}
                <span className="text-xl font-black tracking-tight text-[#111827]">retool</span>
                {/* Raycast */}
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
                    <path d="M17.2 14.5L22 19.3M2 9.8h2.7M2 14.2h2.7M9.8 2v2.7M14.2 2v2.7M4.3 4.3l1.9 1.9M17.8 17.8l1.9 1.9M19.7 4.3l-1.9 1.9M6.2 17.8l-1.9 1.9M12 19.6A7.6 7.6 0 1 0 12 4.4a7.6 7.6 0 0 0 0 15.2Z" stroke="#FF6363" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-xl font-extrabold text-black">Raycast</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — PIPELINE  (accordion + graphic)
      ══════════════════════════════════════════ */}
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


      {/* ═══════════════════════════════════════════
          SECTION 4 — JOURNEY CARDS  (3-col grid)
      ══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          SECTION 5 — SOLUTIONS BANNER
      ══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          SECTION 6 — TESTIMONIALS
      ══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          SECTION 7 — CAPABILITIES GRID
      ══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          SECTION 8 — FAQs
      ══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          SECTION 9 — FINAL CTA
      ══════════════════════════════════════════ */}
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

    </div>
  );
}

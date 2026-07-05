"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Volume2, Gem } from "lucide-react";
import { TABS } from "@/lib/home-data";

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("inbound");

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
  );
}

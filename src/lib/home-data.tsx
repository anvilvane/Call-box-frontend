import {
  Phone, Zap, Bot, BarChart3, Check, ChevronDown, Layers,
  ArrowRight, Gem, Circle, Activity, ShieldAlert, Cpu,
  Share2, Code, Sliders, Volume2, ShieldCheck, Database, Server, Globe,
  Clock, MessageSquare, Settings2
} from "lucide-react";

export const CAPABILITIES = [
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

export const TESTIMONIALS = [
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

export const TABS = [
  { id: "inbound", label: "Speed-to-Lead" },
  { id: "outbound", label: "Outbound Dialer" },
  { id: "telephony", label: "SIP Trunks" },
  { id: "sdk", label: "Developer SDK" },
];

export const PIPELINE_STEPS = [
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

export const FAQS = [
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

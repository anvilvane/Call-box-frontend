"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, BookOpen, GitCompare, Layers } from "lucide-react";
import { APP_NAME, NAV_LINKS, LOGIN_URL, SIGNUP_URL, RESOURCES_DROPDOWN } from "@/lib/site";

/* ─── icon map ─────────────────────────────────────────── */
const RESOURCE_ICONS: Record<string, React.ReactNode> = {
  blog: (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 ring-1 ring-white/10">
      <BookOpen className="h-4 w-4 text-violet-300" />
    </span>
  ),
  alternatives: (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-white/10">
      <Layers className="h-4 w-4 text-emerald-300" />
    </span>
  ),
  compare: (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 ring-1 ring-white/10">
      <GitCompare className="h-4 w-4 text-cyan-300" />
    </span>
  ),
};

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* close dropdown on route change */
  useEffect(() => {
    setResourcesOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    /* Outer wrapper — fixed, full-width, transparent, just for positioning */
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      {/* Floating pill */}
      <motion.div
        initial={{
          marginTop: 24,
          width: "100%",
          maxWidth: 1024,
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 16,
          paddingBottom: 16,
          borderRadius: 16,
        }}
        animate={{
          marginTop: scrolled ? 12 : 24,
          width: scrolled ? "85%" : "100%",
          maxWidth: scrolled ? 900 : 1024,
          paddingLeft: scrolled ? 20 : 32,
          paddingRight: scrolled ? 20 : 32,
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
          borderRadius: scrolled ? 32 : 16,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`pointer-events-auto flex items-center justify-between border transition-colors duration-300 ${
          scrolled
            ? "border-white/10 bg-zinc-800/90 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            : "border-white/[0.06] bg-zinc-900/50 backdrop-blur-xl shadow-[0_2px_16px_rgba(0,0,0,0.2)]"
        }`}
        style={{ marginInline: "auto" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading font-bold tracking-tight text-white group"
        >
          {/* Callbox waveform + diamond logo */}
          <motion.span
            initial={{ width: 44, height: 36 }}
            animate={{ width: scrolled ? 38 : 44, height: scrolled ? 32 : 36 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center justify-center transition-transform group-hover:scale-105"
          >
            <svg viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="44" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#5eead4" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              {/* Left bars */}
              <rect x="0"  y="10" width="2.5" height="8"  rx="1.25" fill="url(#waveGrad)" opacity="0.7"/>
              <rect x="4"  y="6"  width="2.5" height="16" rx="1.25" fill="url(#waveGrad)" opacity="0.85"/>
              <rect x="8"  y="2"  width="2.5" height="24" rx="1.25" fill="url(#waveGrad)"/>
              {/* Central diamond */}
              <path d="M22 4 L26 14 L22 24 L18 14 Z" fill="url(#waveGrad)" />
              {/* Right bars */}
              <rect x="33.5" y="2"  width="2.5" height="24" rx="1.25" fill="url(#waveGrad)"/>
              <rect x="37.5" y="6"  width="2.5" height="16" rx="1.25" fill="url(#waveGrad)" opacity="0.85"/>
              <rect x="41.5" y="10" width="2.5" height="8"  rx="1.25" fill="url(#waveGrad)" opacity="0.7"/>
            </svg>
          </motion.span>

          <motion.span
            initial={{ fontSize: "1.05rem" }}
            animate={{ fontSize: scrolled ? "0.95rem" : "1.05rem" }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-extrabold tracking-tight"
          >
            {APP_NAME}
          </motion.span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative py-1 transition hover:text-white"
              >
                <span>{l.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-accent-blue to-accent-purple"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* ── Resources dropdown ── */}
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              onClick={() => setResourcesOpen((v) => !v)}
              className={`flex items-center gap-1 py-1 transition hover:text-white ${resourcesOpen ? "text-white" : ""}`}
            >
              Resources
              <motion.span
                animate={{ rotate: resourcesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-1/2 top-full mt-3 -translate-x-1/2 z-50"
                  style={{ minWidth: 340 }}
                >
                  {/* Arrow pointer */}
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 rounded-sm border-t border-l border-white/10 bg-zinc-900" />

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 p-2 shadow-[0_24px_64px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
                    {/* Ambient glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-600/5" />

                    <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      Resources
                    </p>

                    <div className="flex flex-col gap-0.5">
                      {RESOURCES_DROPDOWN.map((item) => {
                        const isResourceActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-150 hover:bg-white/5 ${
                              isResourceActive ? "bg-white/5" : ""
                            }`}
                          >
                            {RESOURCE_ICONS[item.icon]}
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span
                                className={`text-sm font-semibold transition-colors duration-150 ${
                                  isResourceActive ? "text-white" : "text-slate-200 group-hover:text-white"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="text-xs leading-tight text-slate-500 group-hover:text-slate-400 transition-colors duration-150">
                                {item.description}
                              </span>
                            </div>
                            <span className="ml-auto text-slate-600 opacity-0 transition-all group-hover:opacity-100 group-hover:text-slate-300">
                              →
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop CTA buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={LOGIN_URL}
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Login
          </a>
          <motion.a
            href={SIGNUP_URL}
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(79,140,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
            initial={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: "0.875rem",
            }}
            animate={{
              paddingLeft: scrolled ? 16 : 20,
              paddingRight: scrolled ? 16 : 20,
              paddingTop: scrolled ? 8 : 10,
              paddingBottom: scrolled ? 8 : 10,
              fontSize: scrolled ? "0.8rem" : "0.875rem",
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full bg-white font-semibold text-black transition-colors hover:bg-slate-100"
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute left-4 right-4 top-[72px] z-40 rounded-2xl border border-white/10 bg-black/90 px-6 py-8 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-200 transition hover:text-white"
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile Resources accordion */}
              <div>
                <button
                  onClick={() => setMobileResourcesOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-base font-semibold text-slate-200 transition hover:text-white"
                >
                  Resources
                  <motion.span
                    animate={{ rotate: mobileResourcesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-2">
                        {RESOURCES_DROPDOWN.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/10"
                          >
                            {RESOURCE_ICONS[item.icon]}
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-semibold text-slate-100">{item.label}</span>
                              <span className="text-xs text-slate-500">{item.description}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <hr className="border-white/10" />
              <div className="flex flex-col gap-4">
                <a
                  href={LOGIN_URL}
                  className="text-center text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  Login
                </a>
                <a
                  href={SIGNUP_URL}
                  className="rounded-full bg-gradient-to-r from-accent-blue to-accent-purple py-3 text-center text-sm font-semibold text-white shadow-lg shadow-accent-blue/20"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

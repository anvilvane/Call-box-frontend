import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { APP_NAME, TAGLINE } from "@/lib/site";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${APP_NAME} — ${TAGLINE}`,
  description:
    "An all-in-one AI Sales OS: ads, leads, AI voice calling, CRM and multi-channel nurture. Your AI rep qualifies every lead instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} scroll-smooth`}>
      <body className="bg-background text-white antialiased font-sans min-h-screen relative">
        {/* Ambient global backgrounds */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full aurora-blue opacity-50 blur-[120px] animate-pulse-slow" />
          <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full aurora-purple opacity-45 blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[10%] left-[10%] h-[550px] w-[550px] rounded-full aurora-cyan opacity-35 blur-[110px]" />
          <div className="noise-overlay" />
          <div className="grid-bg absolute inset-0 opacity-50" />
        </div>
        
        {/* Main site layout */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteNav />
          {/* pt-[104px] ensures content is pushed down below the fixed floating navbar globally */}
          <main className="flex-1 pt-[104px]">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

// Shared site config. CTAs deep-link to the PRODUCT (platform-web / the dashboard),
// which owns auth (Clerk). The marketing site never handles login itself.
export const APP_NAME = "Callbox";
export const TAGLINE = "The AI Sales OS";

// The dashboard/product origin. Override per environment.
export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3000";

// Auth deep-links into the dashboard.
export const LOGIN_URL = `${DASHBOARD_URL}/sign-in`;
export const SIGNUP_URL = `${DASHBOARD_URL}/sign-in`;

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/contact", label: "Contact" },
];

export const RESOURCES_DROPDOWN = [
  {
    href: "/blog",
    label: "Blog",
    description: "Insights, guides & product updates from the Callbox team.",
    icon: "blog",
  },
  {
    href: "/alternatives",
    label: "Alternatives",
    description: "See why teams switch to Callbox from other tools.",
    icon: "alternatives",
  },
  {
    href: "/compare",
    label: "Compare",
    description: "Side-by-side feature comparisons with the competition.",
    icon: "compare",
  },
];

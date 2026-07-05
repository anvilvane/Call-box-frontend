export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6 } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

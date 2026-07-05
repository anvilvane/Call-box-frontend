export function LogoCloudSection() {
  return (
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
  );
}

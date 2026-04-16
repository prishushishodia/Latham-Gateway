import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Antigravity from './Antigravity';
import { client } from '../sanityClient';

const FOOTER_QUERY = `*[_type == "footerSection"][0]{
  cta{ heading, subtext, inquireLabel, inquireHref, contactLabel, contactHref },
  navLinks[]{ label, href },
  copyrightText
}`;

// ─── Fallback (renders instantly — no flash) ──────────────────────────────────
const FALLBACK = {
  cta: {
    heading:      'Rent Space at Lathum Gateway',
    subtext:      'Join our collaborative healthcare community. Premium, adaptable spaces on the top floor are available for specialized practitioners looking to grow their practice.',
    inquireLabel: 'Inquire About Space',
    inquireHref:  '/rentals#inquiry',
    contactLabel: 'Contact Us',
    contactHref:  '/contact',
  },
  navLinks: [
    { label: 'Services',     href: '/services'         },
    { label: 'Rent / Lease', href: '/rentals'           },
    { label: 'Our Floors',   href: '/floor-breakdown'   },
    { label: 'Contact',      href: '/contact'           },
  ],
  copyrightText: '© 2026 Lathum Gateway. All Rights Reserved.',
};

export default function Footer() {
  const [data, setData] = useState(FALLBACK);

  useEffect(() => {
    client
      .fetch(FOOTER_QUERY)
      .then((result) => { if (result) setData(result); })
      .catch(console.error);
  }, []);

  const cta       = data.cta       || FALLBACK.cta;
  const navLinks  = data.navLinks?.length ? data.navLinks : FALLBACK.navLinks;
  const copyright = data.copyrightText   || FALLBACK.copyrightText;

  return (
    <footer>
      <div className="w-full bg-[#0d3d44] relative overflow-hidden">

        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-55">
            <Antigravity
              count={220}
              color="#ffffff"
              autoAnimate
              particleShape="sphere"
              particleSize={0.45}
              ringRadius={2.0}
              magnetRadius={4}
              waveAmplitude={0.12}
              rotationSpeed={0.012}
              depthFactor={0.18}
              fieldStrength={2}
              lerpSpeed={0.007}
              cursorFollowSpeed={0.035}
              fadeRadius={280}
              minScale={0.45}
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,rgba(13,61,68,0.0)_0%,rgba(13,61,68,0.35)_100%)]" />
        </div>

        {/* ── Decorative SVG ── */}
        <div className="hidden md:flex justify-end items-center absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none h-full scale-150 origin-right z-0">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
            <path d="M200 40L360 200H40L200 40Z" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
            <path d="M200 160L320 280H80L200 160Z" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
          </svg>
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-[5%] pt-20 pb-10">

          {/* CTA block */}
          <div className="mb-16">
            <div className="text-white">
              <h2 className="text-[1.4rem] sm:text-[1.8rem] md:text-[2.4rem] lg:text-[3rem] font-medium mb-4 leading-tight">
                {cta.heading}
              </h2>
              <p className="text-white/70 text-[1.05rem] leading-relaxed mb-8 font-light max-w-[560px]">
                {cta.subtext}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={cta.inquireHref}
                  className="bg-white text-[#0d3d44] rounded-full px-8 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.18)]"
                >
                  {cta.inquireLabel}
                </Link>
                <Link
                  to={cta.contactHref}
                  className="bg-transparent border border-white/40 text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  {cta.contactLabel}
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/15 mb-8" />

          {/* Bottom strip */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Copyright */}
            <p className="text-white/50 text-[0.82rem] font-medium tracking-wide order-2 md:order-1">
              {copyright}
            </p>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-6 md:gap-8 order-1 md:order-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="text-white/60 text-[0.83rem] font-medium tracking-wide hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>

          </div>
        </div>
      </div>
    </footer>
  );
}

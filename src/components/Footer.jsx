import React from 'react';
import { Star } from 'lucide-react';
import Antigravity from './Antigravity';
import Galaxy from './ui/galaxy';

// Custom inline SVGs for social brands
const FacebookIcon = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const LinkedinIcon = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navLinks = [
  { label: 'Services', href: '#' },
  { label: 'Rent / Lease', href: '#' },
  { label: 'Our Floors', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
];

export default function Footer() {
  return (
    <footer>
      <div className="w-full bg-[#0d3d44] relative overflow-hidden">

        {/* ── Animated background layer ── */}
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
          {/* Radial + linear gradient vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,rgba(13,61,68,0.0)_0%,rgba(13,61,68,0.35)_100%)]" />
        </div>

        {/* ── Decorative SVG (right edge) ── */}
        <div className="hidden md:flex justify-end items-center absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none h-full scale-150 origin-right z-0">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
            <path d="M200 40L360 200H40L200 40Z" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
            <path d="M200 160L320 280H80L200 160Z" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
          </svg>
        </div>

        {/* ── All content ── */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-[5%] pt-20 pb-10">

          {/* CTA block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div className="text-white max-w-[500px]">
              <h2 className="text-[2.2rem] md:text-[2.8rem] font-medium mb-4 leading-tight">
                Rent Space at Latham Gateway
              </h2>
              <p className="text-white/75 text-[1.05rem] leading-relaxed mb-8 font-light">
                Join our collaborative healthcare community. Premium, adaptable spaces on the second floor are available for specialized practitioners looking to grow their practice.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-[#0d3d44] rounded-full px-8 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.18)]">
                  Inquire About Space
                </button>
                <button className="bg-transparent border border-white/40 text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-white/10 hover:border-white/60 transition-all">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Trustpilot — moved into green section */}
            <div className="flex md:justify-end items-center">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-[26px] h-[26px] bg-[#00b67a] flex items-center justify-center rounded-sm">
                      <Star size={14} fill="white" stroke="white" strokeWidth={0}/>
                    </div>
                  ))}
                </div>
                <div className="text-[0.9rem] font-medium text-white/80 flex items-center gap-1.5">
                  <span className="font-bold text-white">48</span> reviews on
                  <span className="flex items-center gap-1 font-bold text-white ml-1">
                    <Star fill="#00b67a" stroke="#00b67a" size={16} /> Trustpilot
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/15 mb-8" />

          {/* Bottom strip */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Copyright */}
            <p className="text-white/50 text-[0.82rem] font-medium tracking-wide order-3 md:order-1">
              © 2025 Latham Gateway. All Rights Reserved.
            </p>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-6 md:gap-8 order-1 md:order-2">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/60 text-[0.83rem] font-medium tracking-wide hover:text-white transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-3 order-2 md:order-3">
              {[
                { Icon: FacebookIcon, label: 'Facebook' },
                { Icon: TwitterIcon, label: 'Twitter' },
                { Icon: LinkedinIcon, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon size={15} fill="currentColor" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

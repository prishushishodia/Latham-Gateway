import React, { useState, useEffect } from 'react';
import {
  BriefcaseMedical,
  CircleHelp,
  Lock,
  Shield,
  SquareArrowOutUpRight,
  Stethoscope,
} from 'lucide-react';
import { client, urlFor } from '../sanityClient';

const PATIENT_QUERY = `*[_type == "patientPage"][0]{
  hero{ headingLine1, headingLine2, headingLine3, subtext },
  portalCards[]{ title, description, cta, icon, iconBg, buttonColor, href },
  supportItems[]{ title, description, icon },
  ctaBanner{ headingLine1, headingLine2, subtext, image }
}`;

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP = { Shield, BriefcaseMedical, Lock, CircleHelp, Stethoscope };
function DynamicIcon({ name, ...props }) {
  const Icon = ICON_MAP[name] || Shield;
  return <Icon {...props} />;
}

// ─── Fallback (scalar strings only) ──────────────────────────────────────────
const FALLBACK = {
  hero: {
    headingLine1: 'Welcome to Your',
    headingLine2: 'Digital',
    headingLine3: 'Sanctuary',
    subtext:
      'Access your medical records, schedule appointments, and communicate with your care team through our secure specialized portals.',
  },
  ctaBanner: {
    headingLine1: 'Exceptional Care,',
    headingLine2: 'Exceptional Experience.',
    subtext:
      'We are committed to providing the most advanced clinical services in an environment designed for your comfort and peace of mind.',
    image: null,
  },
};

function getImageSrc(sanityImage, fallback) {
  if (sanityImage?.asset) return urlFor(sanityImage).width(1600).url();
  return fallback;
}

export default function Patient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(PATIENT_QUERY)
      .then((result) => { if (result) setData(result); })
      .catch(console.error);
  }, []);

  const hero         = data?.hero         ?? FALLBACK.hero;
  const portalCards  = data?.portalCards  || [];
  const supportItems = data?.supportItems || [];
  const banner       = data?.ctaBanner    ?? FALLBACK.ctaBanner;
  const bannerBg     = getImageSrc(banner.image, '/images/IMG_4827.jpeg');

  return (
    <main className="relative overflow-hidden bg-[#f7f9fb] font-inter text-brand-text-main">
      {/* Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[100px] h-[440px] w-[440px] rounded-full bg-[#d8eef1]/80 blur-[100px]" />
        <div className="absolute right-[-140px] top-[40px] h-[380px] w-[380px] rounded-full bg-[#d8eef1]/70 blur-[100px]" />
        <div className="absolute left-[10%] top-[760px] h-[320px] w-[320px] rounded-full bg-[#dceefd]/75 blur-[100px]" />
      </div>

      <section className="relative mx-auto max-w-[1120px] px-5 pb-24 pt-36 md:px-8 md:pb-28 md:pt-44">

        {/* ── Hero ── */}
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[2.9rem] font-semibold leading-[0.94] tracking-[-0.06em] text-[#1f2a32] md:text-[4.7rem]">
            {hero.headingLine1}{' '}
            <span className="text-[#0a727f]">{hero.headingLine2}</span>
            <br />
            <span className="text-[#0a727f]">{hero.headingLine3}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[640px] text-[1.05rem] leading-[1.55] text-[#4e5d69] md:text-[1.08rem]">
            {hero.subtext}
          </p>
        </div>

        {/* ── Portal cards ── */}
        <div className="mx-auto mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-6 md:max-w-[710px]">
          {portalCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] sm:rounded-[28px] border border-[#e7ebef] bg-white px-4 sm:px-5 sm:px-7 pb-4 sm:pb-5 sm:pb-7 pt-4 sm:pt-5 sm:pt-6 text-center shadow-[0_16px_45px_rgba(31,42,50,0.05)]"
            >
              <div className={`mx-auto flex h-10 sm:h-12 w-10 sm:w-12 w-14 items-center justify-center rounded-[12px] sm:rounded-[16px] ${card.iconBg || 'bg-[#dce8e8]'}`}>
                <DynamicIcon name={card.icon} size={18} sm:size={20} sm:size={24} className="text-[#0a6d7a]" strokeWidth={2.1} />
              </div>
              <h2 className="mt-4 sm:mt-6 sm:mt-8 text-[0.9rem] sm:text-[1rem] sm:text-[1.15rem] font-semibold tracking-[-0.03em] text-[#111a21] md:text-[1.9rem]">
                {card.title}
              </h2>
              <p className="mx-auto mt-2 sm:mt-3 sm:mt-4 max-w-[280px] text-[0.75rem] sm:text-[0.85rem] sm:text-[0.98rem] leading-[1.4] sm:leading-[1.5] sm:leading-[1.55] text-[#5d6872]">
                {card.description}
              </p>
              <a
                href={card.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: card.buttonColor || '#0a727f' }}
                className="mt-4 sm:mt-6 sm:mt-10 inline-flex min-h-[44px] sm:min-h-[50px] sm:min-h-[58px] w-full items-center justify-center rounded-full px-3 sm:px-4 sm:px-6 text-[0.75rem] sm:text-[0.85rem] sm:text-[0.96rem] font-semibold text-white transition-all duration-200 hover:opacity-90"
              >
                <span>{card.cta}</span>
              </a>
            </article>
          ))}
        </div>

        {/* ── Support strip ── */}
        <section className="mx-auto mt-16 grid max-w-[760px] overflow-hidden rounded-[28px] border border-[#edf1f3] bg-white/90 shadow-[0_18px_45px_rgba(31,42,50,0.04)] md:grid-cols-2">
          {supportItems.map(({ title, description, icon }, index) => (
            <div
              key={title}
              className={`px-8 py-8 text-left md:px-10 ${index < supportItems.length - 1 ? 'md:border-r md:border-[#e7ecef]' : ''}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f2f2] text-[#0a727f]">
                <DynamicIcon name={icon} size={17} strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-[1.05rem] font-semibold tracking-[-0.02em] text-[#111a21]">
                {title}
              </h3>
              <p className="mt-3 max-w-[280px] text-[0.95rem] leading-[1.5] text-[#5f6a73]">
                {description}
              </p>
            </div>
          ))}
        </section>

        {/* ── CTA banner ── */}
        <section className="relative mt-20 overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(20,30,40,0.18)]">
          <img
            src={bannerBg}
            alt="Clinical care room"
            className="h-[340px] w-full object-cover md:h-[420px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,24,33,0.78)_0%,rgba(11,24,33,0.48)_32%,rgba(11,24,33,0.08)_72%,rgba(11,24,33,0.06)_100%)]" />
          <div className="absolute inset-y-0 left-0 flex max-w-[460px] items-center px-8 md:px-10">
            <div className="text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                <Stethoscope size={20} strokeWidth={2.2} />
              </div>
              <h2 className="max-w-[360px] text-[2rem] font-semibold leading-[1.03] tracking-[-0.05em] md:text-[3.15rem]">
                {banner.headingLine1}
                <br />
                {banner.headingLine2}
              </h2>
              <p className="mt-5 max-w-[370px] text-[1rem] leading-[1.6] text-white/80">
                {banner.subtext}
              </p>
            </div>
          </div>
        </section>

      </section>
    </main>
  );
}

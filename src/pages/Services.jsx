import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Droplets,
  Plane,
  Stethoscope,
  Syringe,
  Truck,
  UserRound,
  UtensilsCrossed,
  Weight,
} from 'lucide-react';
import { client, urlFor } from '../sanityClient';

// Map icon name strings (from Sanity) to lucide-react components
const ICON_MAP = {
  Activity,
  Droplets,
  Plane,
  Stethoscope,
  Syringe,
  Truck,
  UserRound,
  UtensilsCrossed,
  Weight,
};

const SERVICES_QUERY = `*[_type == "servicesPage"][0]{
  hero{
    badge,
    headingLine1,
    headingLine2,
    subtext
  },
  serviceCards[]{
    title,
    description,
    icon,
    image
  },
  ctaBanner{
    heading,
    subtext,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref
  }
}`;

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_HERO = {
  badge: 'Complete Care Services',
  headingLine1: 'Comprehensive',
  headingLine2: 'Wellness Center',
  subtext: 'Experience a new standard of healthcare. At Lathum Gateway, we blend advanced clinical expertise with a serene, patient-first environment to support your complete well-being.',
};

const FALLBACK_CTA = {
  heading: 'Ready to prioritize your health?',
  subtext: 'Schedule an appointment today and experience the Lathum Gateway difference through thoughtful care, elevated service, and a calm, welcoming environment.',
  primaryLabel: 'Book Appointment',
  primaryHref: '/contact',
  secondaryLabel: 'Contact Us',
  secondaryHref: '/contact',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getImageSrc(sanityImage, fallback) {
  if (!sanityImage) return fallback;
  return urlFor(sanityImage).width(600).url();
}

function DynamicIcon({ name }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return <Activity size={20} strokeWidth={2.1} />;
  return <Icon size={20} strokeWidth={2.1} />;
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({ title, description, icon, image, index }) {
  const isLeftColumn = index % 2 === 0;

  return (
    <article
      className="group relative flex overflow-hidden rounded-[20px] border border-[#e8e2dc] bg-white shadow-[0_10px_30px_rgba(17,75,83,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(17,75,83,0.12)] min-h-[160px]"
    >
      <div
        className={`flex w-full transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isLeftColumn ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Content */}
        <div className="flex flex-1 flex-col justify-center p-3.5 sm:p-4 md:p-6 transition-all duration-[420ms]" style={{ minWidth: 0 }}>
          <div className="mb-3 sm:mb-4 flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl bg-[#e8f2f0] text-brand-teal">
            <DynamicIcon name={icon} />
          </div>
          <h3 className="mb-2 sm:mb-3 font-medium tracking-[-0.03em] text-brand-text-main text-[0.95rem] sm:text-[1.1rem] md:text-[1.45rem]">
            {title}
          </h3>
          <p className="text-[0.75rem] sm:text-[0.85rem] md:text-[0.98rem] leading-5 sm:leading-6 md:leading-7 text-[#667085] line-clamp-2 md:line-clamp-none">{description}</p>
        </div>

        {/* Hover image */}
        <div className="h-auto w-0 flex-shrink-0 overflow-hidden transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[44%]">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-0 scale-105 transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-100 group-hover:opacity-100 group-hover:scale-100"
            style={{ minWidth: '120px' }}
          />
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Services() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(SERVICES_QUERY)
      .then((result) => setData(result))
      .catch(console.error);
  }, []);

  const hero       = data?.hero       ?? FALLBACK_HERO;
  const cards      = data?.serviceCards || [];
  const ctaBanner  = data?.ctaBanner  ?? FALLBACK_CTA;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f4f4] via-[#e6f0f0] via-[800px] to-white font-inter text-brand-text-main">
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-[1220px]">

          {/* Hero */}
          <div className="mx-auto mb-16 max-w-[820px] text-center md:mb-20">
            <div className="mb-6 inline-flex items-center rounded-full border border-[#d8ebe6] bg-white px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-teal shadow-[0_8px_20px_rgba(17,75,83,0.04)]">
              {hero.badge}
            </div>
            <h1 className="text-[3.2rem] font-medium leading-[0.95] tracking-[-0.06em] text-brand-text-main md:text-[5.7rem]">
              {hero.headingLine1}
              <span className="mt-2 block text-brand-teal">{hero.headingLine2}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[700px] text-[1.03rem] leading-8 text-[#6b7280] md:text-[1.12rem]">
              {hero.subtext}
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
            {cards.map((card, index) => (
              <ServiceCard
                key={card.title}
                {...card}
                index={index}
                image={getImageSrc(card.image, '/images/IMG_4822.jpeg')}
              />
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-16 overflow-hidden rounded-[34px] border border-[#d8e7e4] bg-[#eef5f4] px-7 py-8 md:mt-20 md:px-8 md:py-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div className="text-left">
                <h2 className="text-[2rem] font-medium tracking-[-0.04em] text-brand-text-main md:text-[3.1rem]">
                  {ctaBanner.heading}
                </h2>
                <p className="mt-4 max-w-[560px] text-[1rem] leading-7 text-[#6b7280]">
                  {ctaBanner.subtext}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to={ctaBanner.primaryHref ?? '/contact'}
                    className="inline-flex items-center justify-center rounded-full bg-brand-teal px-7 py-3 text-[0.92rem] font-semibold text-white transition-colors hover:bg-brand-teal-dark"
                  >
                    {ctaBanner.primaryLabel}
                  </Link>
                  <Link
                    to={ctaBanner.secondaryHref ?? '/contact'}
                    className="inline-flex items-center justify-center rounded-full border border-[#c7d8d4] bg-white/70 px-7 py-3 text-[0.92rem] font-semibold text-brand-teal transition-colors hover:bg-white"
                  >
                    {ctaBanner.secondaryLabel}
                  </Link>
                </div>
              </div>

              <div className="relative hidden min-h-[220px] items-center justify-center md:flex">
                <DotLottieReact
                  src="/lottie/health.lottie"
                  autoplay
                  loop
                  style={{ height: '280px', width: '280px' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

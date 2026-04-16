import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronRight, ChevronLeft,
  MapPin, Sparkles, Building2, Stethoscope, Key,
} from 'lucide-react';
import { client, urlFor } from '../sanityClient';
import { BlurImage } from '../components/BlurImage';
import { LOCAL_BLURHASH } from '../imagePlaceholders';

const FLOORS_QUERY = `*[_type == "floorBreakdownPage"][0]{
  hero{
    badge, headingLine1, headingLine2, subtext,
    backgroundImage,
    "bgLqip": backgroundImage.asset->metadata.lqip,
    ctas{ primaryLabel, primaryHref, secondaryLabel, secondaryHref }
  },
  statsBar[]{ value, label },
  facilityDirectory{
    badge, headingLine1, headingLine2, description,
    floors[]{ tabLabel, floorCode, title, description, image, "imageLqip": image.asset->metadata.lqip, tags, activeLabel }
  },
  architecture{
    badge, headingLine1, headingLine2, description,
    features[]{ title, description },
    ctaBox{ heading, subtext, primaryLabel, secondaryLabel }
  }
}`;

const LOCAL_IMAGES = [
  '/images/IMG_4822.jpeg',
  '/images/IMG_4824.jpeg',
  '/images/IMG_4827.jpeg',
  '/images/IMG_4829.jpeg',
  '/images/IMG_4823.jpeg',
];

// Icon per floor tab
const FLOOR_ICONS = [Stethoscope, Sparkles, Key];

function getFloorImage(sanityImage, index) {
  if (sanityImage) return urlFor(sanityImage).width(1400).url();
  return LOCAL_IMAGES[index % LOCAL_IMAGES.length];
}

// ─── Fallback data (renders instantly on first paint — no flash) ───────────────
const FALLBACK_DATA = {
  hero: {
    badge: 'Floor Breakdown',
    headingLine1: 'Healing in',
    headingLine2: 'Harmony.',
    subtext: 'Three purposefully designed floors — two dedicated to clinical excellence, one offering premium practitioner suites.',
    backgroundImage: null,
    ctas: { primaryLabel: 'View All Services', primaryHref: '/services', secondaryLabel: 'Book a Tour', secondaryHref: '/contact' },
  },
  statsBar: [
    { value: '3', label: 'Floors' },
    { value: '50+', label: 'Providers' },
    { value: '10k+', label: 'Patients/yr' },
    { value: '98%', label: 'Satisfaction' },
  ],
  facilityDirectory: {
    badge: 'Facility Directory',
    headingLine1: 'Every floor,',
    headingLine2: 'a purpose.',
    description: 'From primary care to premium rental suites, each level of Lathamw Gateway is designed with intention.',
    floors: [
      {
        tabLabel: 'Medical Hub',
        floorCode: '1',
        title: 'Medical Hub — Ground Floor',
        description: 'Our ground floor houses primary care, urgent care, and diagnostic services in a welcoming, efficient environment built around patient flow.',
        image: null,
        tags: ['Primary Care', 'Urgent Care', 'Diagnostics', 'Lab Services'],
        activeLabel: 'ACTIVE',
      },
      {
        tabLabel: 'Wellness Center',
        floorCode: '2',
        title: 'Wellness Center — Second Floor',
        description: 'Specialty clinics, physical therapy, and integrative wellness services share a calm, design-forward floor built for focused, restorative care.',
        image: null,
        tags: ['Specialty Clinics', 'Physical Therapy', 'Integrative Care'],
        activeLabel: 'ACTIVE',
      },
      {
        tabLabel: 'Rental Suites',
        floorCode: '3',
        title: 'Rental Suites — Top Floor',
        description: 'Premium professional suites available for lease. Ideal for independent practitioners and wellness businesses seeking a prestigious address.',
        image: null,
        tags: ['Private Suites', 'Shared Reception', 'High-Speed Internet', 'Parking Included'],
        activeLabel: 'FOR LEASE',
      },
    ],
  },
  architecture: {
    badge: 'Design Philosophy',
    headingLine1: 'Future-Proof',
    headingLine2: 'Architecture.',
    description: 'Every square foot is designed with clinical function and human comfort in mind — a building that works as hard as the people inside it.',
    features: [
      { title: 'Clinical Optimization', description: 'Layouts pre-configured for medical equipment, private consult rooms, and seamless patient flow.' },
      { title: 'Accessibility First', description: 'Dual elevators, ADA-compliant design, and intuitive wayfinding throughout every level.' },
      { title: 'Sustainable Materials', description: 'Energy-efficient systems, generous natural light, and refined finishes that stand the test of time.' },
    ],
    ctaBox: {
      heading: 'Ready to experience it in person?',
      subtext: 'Schedule a tour and see how Lathamw Gateway can elevate your practice or care experience.',
      primaryLabel: 'Book Appointment',
      secondaryLabel: 'Schedule a Tour',
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FloorBreakdown() {
  const [data, setData]               = useState(FALLBACK_DATA);
  const [activeFloor, setActiveFloor] = useState(0);

  useEffect(() => {
    client
      .fetch(FLOORS_QUERY)
      .then(async (result) => {
        if (!result) return;

        // Collect every CMS image URL that will appear on screen
        const urls = [];

        if (result.hero?.backgroundImage)
          urls.push(urlFor(result.hero.backgroundImage).width(1920).url());

        result.facilityDirectory?.floors?.forEach((floor) => {
          if (floor.image)
            urls.push(urlFor(floor.image).width(1400).url());
        });

        // Preload them all before updating state — browser caches them
        // so the re-render swaps images without any visible flash
        await Promise.all(
          urls.map(
            (src) =>
              new Promise((resolve) => {
                const img = new window.Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve; // don't block on a broken image
              })
          )
        );

        setData(result);
      })
      .catch(console.error);
  }, []);

  const hero      = data.hero              || {};
  const stats     = data.statsBar          || [];
  const directory = data.facilityDirectory || {};
  const floors    = directory.floors       || [];
  const arch      = data.architecture      || {};
  const features  = arch.features          || [];

  const heroBgSrc = hero.backgroundImage
    ? urlFor(hero.backgroundImage).width(1920).url()
    : '/images/IMG_4829.jpeg';
  const heroBgHash = hero.backgroundImage ? undefined : LOCAL_BLURHASH['/images/IMG_4829.jpeg'];
  const heroBgLqip = hero.bgLqip || undefined;

  const current = floors[activeFloor];

  return (
    <div className="min-h-screen font-inter text-brand-text-main">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pl-5 md:pl-10 pr-[5%] pb-10 overflow-hidden">
        <BlurImage
          src={heroBgSrc}
          hash={heroBgHash}
          lqip={heroBgLqip}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Content card + badge wrapper */}
        <div className="relative z-10 flex flex-col items-start max-w-[90%] sm:max-w-[85%] md:max-w-[640px]">
          {/* Badge — floats just above the card */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm mb-3">
            <MapPin size={10} strokeWidth={2.5} />
            {hero.badge || 'Floor Breakdown'}
          </div>

          {/* Content card */}
          <div className="w-full bg-white/45 backdrop-blur-md border border-white/30 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <h1 className="text-[1.4rem] sm:text-[1.8rem] md:text-[2.8rem] lg:text-[3.8rem] font-medium leading-[1.02] tracking-tight text-white mb-3 sm:mb-4">
            {hero.headingLine1 || 'Healing in'}
            <span className="block text-teal-300 italic">{hero.headingLine2 || 'Harmony.'}</span>
          </h1>
          <p className="text-white/75 text-[0.9rem] sm:text-[1rem] md:text-[1rem] leading-6 sm:leading-7 mb-5 sm:mb-6 md:mb-8 max-w-[480px]">
            {hero.subtext || 'Three purposefully designed floors — two dedicated to clinical excellence, one offering premium practitioner suites.'}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              to={hero?.ctas?.primaryHref || '/services'}
              className="rounded-full px-4 py-2 sm:px-5 md:px-6 py-2.5 text-[0.8rem] sm:text-[0.85rem] md:text-sm font-semibold cursor-pointer inline-flex items-center justify-center bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors duration-200"
            >
              {hero?.ctas?.primaryLabel || 'View All Services'} <ArrowRight size={14} />
            </Link>
            <Link
              to={hero?.ctas?.secondaryHref || '/contact'}
              className="hidden md:inline-flex rounded-full px-4 py-2 sm:px-5 md:px-6 py-2.5 text-[0.8rem] sm:text-[0.85rem] md:text-sm font-semibold cursor-pointer inline-flex items-center justify-center border border-white/40 bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              {hero?.ctas?.secondaryLabel || 'Book a Tour'}
            </Link>
          </div>
          </div>{/* end card */}
        </div>{/* end badge+card wrapper */}
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      {stats.length > 0 && (
        <section className="bg-white border-b border-[#eaeaea]">
          <div className="mx-auto max-w-[1220px] px-5 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#eaeaea]">
              {stats.map((s, i) => (
                <div key={i} className="py-8 px-6 text-center">
                  <div className="text-[2.6rem] font-semibold tracking-tight text-brand-teal leading-none">{s.value}</div>
                  <div className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FACILITY DIRECTORY ───────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#f0f4f4] via-[#e8f0f0] to-white py-8 md:py-12 lg:py-20 px-5 md:px-8">
        <div className="mx-auto max-w-[1220px]">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-14">
            <div>
              {directory.badge && (
                <div className="mb-4 inline-flex items-center rounded-full border border-[#d8ebe6] bg-white px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-teal shadow-sm">
                  {directory.badge}
                </div>
              )}
              <h2 className="text-[2.6rem] md:text-[3.6rem] font-medium leading-[0.95] tracking-[-0.05em]">
                {directory.headingLine1 || 'Every floor,'}
                <span className="block text-brand-teal">{directory.headingLine2 || 'a purpose.'}</span>
              </h2>
            </div>
            <p className="text-[0.98rem] leading-7 text-[#6b7280] max-w-[380px] md:text-right">
              {directory.description}
            </p>
          </div>

          {/* Floor selector tabs */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {floors.map((floor, i) => {
              const Icon = FLOOR_ICONS[i] || Building2;
              const isRental = floor.floorCode === '3' || floor.tabLabel?.toLowerCase().includes('rental');
              return (
                <button
                  key={i}
                  onClick={() => setActiveFloor(i)}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-[18px] text-[0.88rem] font-semibold transition-all duration-200 ${
                    activeFloor === i
                      ? isRental
                        ? 'bg-[#1a1a2e] text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)]'
                        : 'bg-brand-teal text-white shadow-[0_6px_20px_rgba(2,99,98,0.28)]'
                      : 'bg-white border border-[#dbe7e5] text-[#6b7280] hover:border-brand-teal/50 hover:text-brand-teal'
                  }`}
                >
                  <Icon size={15} strokeWidth={2} />
                  {floor.tabLabel}
                  {isRental && (
                    <span className={`text-[0.65rem] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      activeFloor === i ? 'bg-white/20 text-white' : 'bg-[#f0f0ff] text-[#4a4a8a]'
                    }`}>
                      For Lease
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active floor panel */}
          {current && (
            <div className="grid lg:grid-cols-[55%_45%] gap-6 items-stretch">

              {/* Image side */}
              <div className="relative overflow-hidden rounded-[28px] min-h-[440px] shadow-[0_20px_50px_rgba(17,75,83,0.12)]">
                <BlurImage
                  key={activeFloor}
                  src={getFloorImage(current.image, activeFloor)}
                  alt={current.title}
                  lqip={current.imageLqip}
                  hash={current.image ? undefined : LOCAL_BLURHASH[LOCAL_IMAGES[activeFloor % LOCAL_IMAGES.length]]}
                  fill
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Floor number */}
                <div className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/95 shadow-md">
                  <span className="text-brand-teal font-bold text-xl leading-none">{current.floorCode}</span>
                </div>

                {/* Active label */}
                {current.activeLabel && (
                  <div className={`absolute top-5 right-5 rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] backdrop-blur-sm ${
                    current.activeLabel.includes('LEASE')
                      ? 'bg-[#1a1a2e]/80 text-white border border-white/20'
                      : 'bg-brand-teal/85 text-white'
                  }`}>
                    {current.activeLabel}
                  </div>
                )}

                {/* Bottom navigation */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {floors.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveFloor(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeFloor === i ? 'w-8 bg-white' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveFloor((p) => Math.max(0, p - 1))}
                      disabled={activeFloor === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-sm hover:bg-white/35 disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      onClick={() => setActiveFloor((p) => Math.min(floors.length - 1, p + 1))}
                      disabled={activeFloor === floors.length - 1}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-sm hover:bg-white/35 disabled:opacity-30 transition-all"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="rounded-[28px] border border-[#dbe7e5] bg-white p-8 md:p-10 shadow-[0_8px_24px_rgba(17,75,83,0.05)] flex flex-col">
                <div className="flex-1">
                  {/* Floor type label */}
                  <div className={`mb-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] ${
                    current.activeLabel?.includes('LEASE') ? 'text-[#4a4a8a]' : 'text-brand-teal'
                  }`}>
                    Floor {current.floorCode} of {floors.length}
                  </div>

                  <h3 className="text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.04em] leading-tight mb-5">
                    {current.title}
                  </h3>
                  <p className="text-[0.97rem] leading-[1.85] text-[#6b7280]">
                    {current.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {current.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className={`rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium border ${
                          current.activeLabel?.includes('LEASE')
                            ? 'border-[#e0e0f5] bg-[#f5f5ff] text-[#4a4a8a]'
                            : 'border-[#d8ebe6] bg-[#f0f9f7] text-brand-teal'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-7 border-t border-[#eaeaea]">
                  <Link
                    to={current.activeLabel?.includes('LEASE') ? '/rentals' : '/services'}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.88rem] font-semibold transition-colors ${
                      current.activeLabel?.includes('LEASE')
                        ? 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e]'
                        : 'bg-brand-teal text-white hover:bg-brand-teal-dark'
                    }`}
                  >
                    {current.activeLabel?.includes('LEASE') ? 'Explore Leasing' : 'View Services'}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── ARCHITECTURE ─────────────────────────────────────────────── */}
      <section className="py-8 md:py-12 lg:py-20 px-5 md:px-8 bg-white">
        <div className="mx-auto max-w-[1220px]">

          {/* Split: text left, image right */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center mb-16">
            <div>
              {arch.badge && (
                <div className="mb-5 inline-flex items-center rounded-full border border-[#d8ebe6] bg-[#f0f9f7] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  {arch.badge}
                </div>
              )}
              <h2 className="text-[2.6rem] md:text-[3.4rem] font-medium leading-[0.95] tracking-[-0.05em] mb-6">
                {arch.headingLine1 || 'Future-Proof'}
                <span className="block text-brand-teal">{arch.headingLine2 || 'Architecture.'}</span>
              </h2>
              <p className="text-[1rem] leading-8 text-[#6b7280] max-w-[420px]">{arch.description}</p>

              {/* Numbered feature list */}
              <div className="mt-10 space-y-6">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#e8f2f0] text-brand-teal font-bold text-[0.8rem] group-hover:bg-brand-teal group-hover:text-white transition-colors duration-200">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="text-[1rem] font-semibold text-brand-text-main mb-1">{f.title}</h4>
                      <p className="text-[0.88rem] leading-6 text-[#6b7280]">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stacked images */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[520px]">
              <div className="col-span-2 relative overflow-hidden rounded-[22px]">
                <BlurImage src="/images/commerce.jpeg" hash={LOCAL_BLURHASH['/images/commerce.jpeg']} fill imgClassName="hover:scale-[1.03] transition-transform duration-500" />
              </div>
              <div className="relative overflow-hidden rounded-[22px]">
                <BlurImage src="/images/IMG_4824.jpeg" hash={LOCAL_BLURHASH['/images/IMG_4824.jpeg']} fill imgClassName="hover:scale-[1.03] transition-transform duration-500" />
              </div>
              <div className="relative overflow-hidden rounded-[22px]">
                <BlurImage src="/images/IMG_4827.jpeg" hash={LOCAL_BLURHASH['/images/IMG_4827.jpeg']} fill imgClassName="hover:scale-[1.03] transition-transform duration-500" />
              </div>
            </div>
          </div>

          {/* CTA Banner — image background */}
          {arch.ctaBox && (
            <div className="relative overflow-hidden rounded-[32px] min-h-[260px] flex items-center">
              <BlurImage
                src="/images/IMG_4822.jpeg"
                hash={LOCAL_BLURHASH['/images/IMG_4822.jpeg']}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/95 via-brand-teal/80 to-brand-teal/40" />

              {/* Decorative circle */}
              <div className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full border border-white/10" />
              <div className="pointer-events-none absolute right-24 top-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full border border-white/15" />

              <div className="relative z-10 w-full px-8 md:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-[540px]">
                  <h3 className="text-[2rem] md:text-[2.8rem] font-medium tracking-[-0.04em] text-white leading-tight">
                    {arch.ctaBox.heading}
                  </h3>
                  <p className="mt-3 text-white/75 text-[0.98rem] leading-7">
                    {arch.ctaBox.subtext}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[0.9rem] font-semibold text-brand-teal hover:bg-white/90 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                  >
                    {arch.ctaBox.primaryLabel || 'Book Appointment'} <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-7 py-3.5 text-[0.9rem] font-semibold text-white hover:bg-white/15 transition-colors"
                  >
                    {arch.ctaBox.secondaryLabel || 'Schedule a Tour'}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────── */}
      <section className="py-8 md:py-12 lg:py-16 px-5 md:px-8 bg-[#f8fbfb]">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-8 flex items-end justify-between">
            <h3 className="text-[1.6rem] font-medium tracking-tight text-brand-text-main">
              Inside <span className="text-brand-teal">Lathamw Gateway</span>
            </h3>
            <Link to="/contact" className="text-[0.85rem] font-semibold text-brand-teal hover:underline flex items-center gap-1">
              Book a tour <ArrowRight size={13} />
            </Link>
          </div>

          {/* Asymmetric masonry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 gap-3 sm:gap-4">
            {/* Large left - spans full width on mobile, 5 cols on lg */}
            <div className="sm:col-span-2 lg:col-span-5 lg:row-span-2 overflow-hidden rounded-[22px] relative group aspect-[4/3] sm:aspect-auto sm:h-[200px] lg:h-auto">
              <BlurImage src="/images/IMG_4829.jpeg" hash={LOCAL_BLURHASH['/images/IMG_4829.jpeg']} fill imgClassName="group-hover:scale-[1.04] transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 z-10 rounded-[14px] bg-white/85 backdrop-blur-sm px-4 py-2.5">
                <div className="text-[0.72rem] font-bold uppercase tracking-widest text-[#6b7280]">Main Entrance</div>
              </div>
            </div>
            {/* Top middle - 4 cols on lg */}
            <div className="lg:col-span-4 overflow-hidden rounded-[22px] relative group aspect-[4/3] sm:h-[150px] lg:aspect-auto">
              <BlurImage src="/images/IMG_4822.jpeg" hash={LOCAL_BLURHASH['/images/IMG_4822.jpeg']} fill imgClassName="group-hover:scale-[1.04] transition-transform duration-500" />
              <div className="absolute bottom-3 left-3 z-10 rounded-[12px] bg-white/85 backdrop-blur-sm px-3 py-1.5">
                <div className="text-[0.68rem] font-bold uppercase tracking-widest text-[#6b7280]">Medical Hub</div>
              </div>
            </div>
            {/* Top right - 3 cols on lg */}
            <div className="lg:col-span-3 overflow-hidden rounded-[22px] relative group aspect-[4/3] sm:h-[150px] lg:aspect-auto">
              <BlurImage src="/images/IMG_4824.jpeg" hash={LOCAL_BLURHASH['/images/IMG_4824.jpeg']} fill imgClassName="group-hover:scale-[1.04] transition-transform duration-500" />
              <div className="absolute bottom-3 left-3 z-10 rounded-[12px] bg-white/85 backdrop-blur-sm px-3 py-1.5">
                <div className="text-[0.68rem] font-bold uppercase tracking-widest text-[#6b7280]">Wellness Floor</div>
              </div>
            </div>
            {/* Bottom middle - 3 cols on lg */}
            <div className="lg:col-span-3 overflow-hidden rounded-[22px] relative group aspect-[4/3] sm:h-[150px] lg:aspect-auto">
              <BlurImage src="/images/IMG_4827.jpeg" hash={LOCAL_BLURHASH['/images/IMG_4827.jpeg']} fill imgClassName="group-hover:scale-[1.04] transition-transform duration-500" />
              <div className="absolute bottom-3 left-3 z-10 rounded-[12px] bg-white/85 backdrop-blur-sm px-3 py-1.5">
                <div className="text-[0.68rem] font-bold uppercase tracking-widest text-[#6b7280]">Grounds</div>
              </div>
            </div>
            {/* Bottom right - 4 cols on lg */}
            <div className="lg:col-span-4 overflow-hidden rounded-[22px] relative group aspect-[4/3] sm:h-[150px] lg:aspect-auto">
              <BlurImage src="/images/IMG_4823.jpeg" hash={LOCAL_BLURHASH['/images/IMG_4823.jpeg']} fill imgClassName="group-hover:scale-[1.04] transition-transform duration-500" />
              <div className="absolute bottom-3 left-3 z-10 rounded-[12px] bg-white/85 backdrop-blur-sm px-3 py-1.5">
                <div className="text-[0.68rem] font-bold uppercase tracking-widest text-[#6b7280]">Rental Suites</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

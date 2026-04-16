import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Building2,
  Car,
  Cross,
  Mail,
  MapPinned,
  MoveRight,
  Ruler,
  ShieldCheck,
  Sparkles,
  Trees,
  UserRoundCheck,
} from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { client, urlFor } from '../sanityClient';
import { BlurImage } from '../components/BlurImage';
import { LOCAL_BLURHASH } from '../imagePlaceholders';

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
  Building2,
  Car,
  Trees,
  UserRoundCheck,
};

function DynamicIcon({ name, size }) {
  const Icon = ICON_MAP[name] ?? Building2;
  return <Icon size={size} />;
}

const RENTALS_QUERY = `*[_type == "rentalsPage"][0]{
  hero{
    badge, headingLine1, headingLine2, subtext,
    image, "imageLqip": image.asset->metadata.lqip, availableArea, status
  },
  featuresSection{
    heading,
    features[]{ title, description, icon },
    interiorImage, "interiorLqip": interiorImage.asset->metadata.lqip,
    virtualTourTitle,
    virtualTourDescription
  },
  inquirySection{ heading, subtext },
  locationSection{
    badge, heading, subtext, image, "imageLqip": image.asset->metadata.lqip, locationPoints
  }
}`;

// ─── Fallbacks ────────────────────────────────────────────────────────────────
const FALLBACK = {
  hero: {
    badge: 'Second Floor Leasing',
    headingLine1: 'The Future of',
    headingLine2: 'Clinical Space',
    subtext: "Lathamw Gateway\u2019s premium second-floor suites offer a calm, design-forward setting for modern medical excellence. Elevate your practice in a space shaped for patient comfort and professional growth.",
    image: null,
    availableArea: '2,400 \u2013 8,500 SQFT',
    status: 'Now Leasing',
  },
  featuresSection: {
    heading: 'Premium Features',
    features: [
      { title: 'Clinical Optimization', description: 'Pre-plumbed and wired layouts designed for specialized medical equipment, private consult rooms, and efficient workflows.', icon: 'Building2' },
      { title: 'Patient Accessibility', description: 'Dual high-speed elevators, intuitive circulation, and ADA-conscious planning that improves the daily patient experience.', icon: 'UserRoundCheck' },
      { title: 'Sustainable Design', description: 'Energy-efficient climate control, generous daylight, and thoughtful materials that feel refined without excess.', icon: 'Trees' },
      { title: 'Dedicated Parking', description: 'Reserved parking options for staff and validated visitor access that simplifies arrival for patients and providers.', icon: 'Car' },
    ],
    interiorImage: null,
    virtualTourTitle: 'Virtual Tour Available',
    virtualTourDescription: 'Experience the second-floor layout through a guided walkthrough of the suites and shared spaces.',
  },
  inquirySection: {
    heading: 'Leasing Inquiry',
    subtext: 'Fill out the form below and our property team will reach out within 24 hours.',
  },
  locationSection: {
    badge: 'Prime District',
    heading: 'Strategic Location',
    subtext: 'Located in the heart of a growing medical corridor, Lathamw Gateway offers direct access to established providers, transit convenience, and a patient-friendly setting for modern care.',
    image: null,
    locationPoints: [
      '3 mins to central transit access',
      'Adjacent to established medical services',
      'Near healthy dining and daily conveniences',
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getImageSrc(sanityImage, fallbackSrc) {
  if (!sanityImage) return fallbackSrc;
  return urlFor(sanityImage).width(1200).url();
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function InquiryField({ label, placeholder, className = '', ...inputProps }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
        {label}
      </span>
      <input
        placeholder={placeholder}
        className="w-full rounded-[16px] border border-[#dbe7e5] bg-[#f7fbfb] px-4 py-3 text-[0.95rem] text-brand-text-main outline-none transition-colors placeholder:text-[#9ca3af] focus:border-brand-teal/40"
        {...inputProps}
      />
    </label>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Rentals() {
  const [data, setData]       = useState(null);
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    client
      .fetch(RENTALS_QUERY)
      .then((result) => setData(result))
      .catch(console.error);
  }, []);

  const hero        = data?.hero            ?? FALLBACK.hero;
  const features    = data?.featuresSection ?? FALLBACK.featuresSection;
  const inquiry     = data?.inquirySection  ?? FALLBACK.inquirySection;
  const location    = data?.locationSection ?? FALLBACK.locationSection;

  const locationIcons = [MoveRight, MapPinned, Cross];

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/send-leasing-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f4f4] via-[#e6f0f0] via-[820px] to-white font-inter text-brand-text-main">
      <section className="px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-[1220px]">

          {/* ── Hero Card ──────────────────────────────────────── */}
          <section className="overflow-hidden rounded-[34px] border border-[#dbe7e5] bg-white shadow-[0_18px_50px_rgba(17,75,83,0.08)]">
            <div className="grid items-stretch lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative z-[2] px-7 py-10 md:px-10 md:py-12 lg:px-12 lg:py-16">
                <div className="mb-6 inline-flex items-center rounded-full border border-[#d5e4e1] bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-teal shadow-[0_6px_18px_rgba(17,75,83,0.04)]">
                  {hero.badge}
                </div>

                <h1 className="max-w-[12ch] text-[3rem] font-medium leading-[0.94] tracking-[-0.07em] text-brand-text-main md:text-[4.8rem]">
                  {hero.headingLine1}
                  <span className="mt-2 block text-brand-teal italic">{hero.headingLine2}</span>
                </h1>

                <p className="mt-7 max-w-[34rem] text-[1.02rem] leading-8 text-[#5f6b76]">
                  {hero.subtext}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="min-w-[182px] rounded-[22px] border border-[#dbe7e5] bg-white px-5 py-4 shadow-[0_8px_20px_rgba(17,75,83,0.05)]">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8f2f0] text-brand-teal">
                      <Ruler size={18} />
                    </div>
                    <div className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
                      Available Area
                    </div>
                    <div className="mt-1 text-[1.02rem] font-semibold text-brand-text-main">
                      {hero.availableArea}
                    </div>
                  </div>

                  <div className="min-w-[160px] rounded-[22px] border border-[#dbe7e5] bg-white px-5 py-4 shadow-[0_8px_20px_rgba(17,75,83,0.05)]">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8f2f0] text-brand-teal">
                      <Sparkles size={18} />
                    </div>
                    <div className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
                      Status
                    </div>
                    <div className="mt-1 text-[1.02rem] font-semibold text-brand-text-main">
                      {hero.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[420px]">
                <BlurImage
                  src={getImageSrc(hero.image, '/images/commerce.jpeg')}
                  alt="Premium glass-fronted clinical suite interior"
                  lqip={hero.imageLqip}
                  hash={hero.image ? undefined : LOCAL_BLURHASH['/images/commerce.jpeg']}
                  fill
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(240,244,244,0.18)] via-transparent to-[rgba(17,75,83,0.08)]" />
              </div>
            </div>
          </section>

          {/* ── Features + Inquiry ─────────────────────────────── */}
          <section className="mt-10 sm:mt-12 md:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="mb-4 sm:mb-6 text-[2.1rem] font-medium tracking-[-0.05em] text-brand-text-main md:text-[3rem]">
                {features.heading}
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 gap-5">
                {(features.features ?? []).map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-[20px] sm:rounded-[28px] border border-[#dbe7e5] bg-white p-4 sm:p-5 md:p-6 shadow-[0_10px_28px_rgba(17,75,83,0.04)]"
                  >
                    <div className="mb-3 sm:mb-4 md:mb-5 flex h-9 sm:h-10 md:h-12 w-9 sm:w-10 md:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[#e8f2f0] text-brand-teal">
                      <DynamicIcon name={feature.icon} size={16} sm:size={18} md:size={20} />
                    </div>
                    <h3 className="mb-2 sm:mb-3 text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem] font-medium tracking-[-0.03em] text-brand-text-main">
                      {feature.title}
                    </h3>
                    <p className="text-[0.75rem] sm:text-[0.85rem] md:text-[0.96rem] leading-5 sm:leading-6 md:leading-7 text-[#667085]">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[30px] border border-[#dbe7e5] bg-white shadow-[0_14px_36px_rgba(17,75,83,0.06)]">
                <BlurImage
                  src={getImageSrc(features.interiorImage, '/images/IMG_4824.jpeg')}
                  alt="Interior suite preview"
                  lqip={features.interiorLqip}
                  hash={features.interiorImage ? undefined : LOCAL_BLURHASH['/images/IMG_4824.jpeg']}
                  className="h-[330px]"
                  imgClassName="h-[330px] w-full"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-teal/10 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/30 bg-white/75 px-5 py-4 backdrop-blur-md">
                  <div className="text-[0.92rem] font-semibold text-brand-text-main">
                    {features.virtualTourTitle}
                  </div>
                  <p className="mt-1 text-[0.88rem] leading-6 text-[#667085]">
                    {features.virtualTourDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Inquiry form */}
            <aside id="inquiry" className="flex flex-col rounded-[30px] border border-[#dbe7e5] bg-white p-5 sm:p-6 md:p-8 shadow-[0_16px_40px_rgba(17,75,83,0.07)]">
              {sent ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f2f0] text-brand-teal">
                    <Mail size={28} />
                  </div>
                  <h3 className="mb-3 text-[1.4rem] font-medium tracking-[-0.03em]">Inquiry Sent!</h3>
                  <p className="max-w-[300px] text-[0.92rem] leading-7 text-[#667085]">
                    Thank you for reaching out. Our property team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setError(''); setForm({ name: '', email: '', phone: '', message: '' }); }}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d8e7e4] px-6 py-2.5 text-[0.88rem] font-semibold text-brand-teal hover:bg-[#f0f8f7] transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-3 sm:mb-4 md:mb-6 h-[3px] w-12 rounded-full bg-brand-teal" />
                  <h2 className="text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] font-medium tracking-[-0.05em] text-brand-text-main">
                    {inquiry.heading}
                  </h2>
                  <p className="mt-2 sm:mt-3 max-w-[34rem] text-[0.85rem] sm:text-[0.96rem] leading-6 sm:leading-7 text-[#667085]">
                    {inquiry.subtext}
                  </p>

                  <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 flex flex-col flex-1 space-y-6">
                    <InquiryField label="Full Name" placeholder="John Doe" name="name" value={form.name} onChange={handleChange} required />
                    <div className="grid gap-6 md:grid-cols-2">
                      <InquiryField label="Email" placeholder="john@clinic.com" name="email" type="email" value={form.email} onChange={handleChange} required />
                      <InquiryField label="Phone" placeholder="(555) 000-0000" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                    </div>
                    <label className="block">
                      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
                        Message
                      </span>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your space requirements..."
                        className="min-h-[128px] w-full resize-none rounded-[18px] border border-[#dbe7e5] bg-[#f7fbfb] px-4 py-3 text-[0.95rem] text-brand-text-main outline-none transition-colors placeholder:text-[#9ca3af] focus:border-brand-teal/40"
                      />
                    </label>

                    {error && (
                      <p className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[0.88rem] text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-teal px-7 py-4 text-[0.96rem] font-semibold text-white transition-colors hover:bg-brand-teal-dark disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending…' : <><span>Request Information</span><ArrowRight size={17} /></>}
                    </button>

                    {/* Lottie grows to fill remaining card height */}
                    <div className="flex flex-1 min-h-0 items-center justify-center">
                      <DotLottieReact
                        src="/lottie/contact-us.lottie"
                        autoplay
                        loop
                        style={{ height: '100%', width: '100%', maxHeight: '340px', maxWidth: '340px' }}
                      />
                    </div>
                  </form>

                  <div className="mt-6 flex flex-wrap gap-4 text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">
                    <div className="inline-flex items-center gap-2">
                      <ShieldCheck size={14} className="text-brand-teal" />
                      Secure Submission
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <Cross size={14} className="text-brand-teal" />
                      Data Encrypted
                    </div>
                  </div>
                </>
              )}
            </aside>
          </section>

          {/* ── Location ───────────────────────────────────────── */}
          <section className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[34px] border border-[#dbe7e5] bg-white p-3 shadow-[0_14px_36px_rgba(17,75,83,0.06)]">
              <div className="relative overflow-hidden rounded-[28px]">
                <BlurImage
                  src={getImageSrc(location.image, '/images/IMG_4822.jpeg')}
                  alt="Map and district context"
                  lqip={location.imageLqip}
                  hash={location.image ? undefined : LOCAL_BLURHASH['/images/IMG_4822.jpeg']}
                  className="h-[360px]"
                  imgClassName="h-[360px] w-full"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(17,75,83,0.04),rgba(17,75,83,0.1))]" />
                <div className="absolute right-4 top-4 z-10 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold text-brand-teal backdrop-blur-sm">
                  {location.badge}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[2.4rem] font-medium tracking-[-0.05em] text-brand-text-main md:text-[4rem]">
                {location.heading}
              </h2>
              <p className="mt-4 max-w-[42rem] text-[1rem] leading-8 text-[#667085]">
                {location.subtext}
              </p>

              <div className="mt-8 space-y-4">
                {(location.locationPoints ?? []).map((point, index) => {
                  const PointIcon = locationIcons[index] ?? MapPinned;
                  return (
                    <div
                      key={point}
                      className="flex items-center gap-4 rounded-[22px] border border-[#dbe7e5] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(17,75,83,0.04)]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f2f0] text-brand-teal">
                        <PointIcon size={18} />
                      </div>
                      <div className="text-[0.98rem] font-medium text-brand-text-main">{point}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}

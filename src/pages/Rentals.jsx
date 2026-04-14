import React from 'react';
import {
  ArrowRight,
  Building2,
  Car,
  Cross,
  MapPinned,
  MoveRight,
  Ruler,
  ShieldCheck,
  Sparkles,
  Trees,
  UserRoundCheck,
} from 'lucide-react';

const features = [
  {
    title: 'Clinical Optimization',
    description:
      'Pre-plumbed and wired layouts designed for specialized medical equipment, private consult rooms, and efficient workflows.',
    icon: Building2,
  },
  {
    title: 'Patient Accessibility',
    description:
      'Dual high-speed elevators, intuitive circulation, and ADA-conscious planning that improves the daily patient experience.',
    icon: UserRoundCheck,
  },
  {
    title: 'Sustainable Design',
    description:
      'Energy-efficient climate control, generous daylight, and thoughtful materials that feel refined without excess.',
    icon: Trees,
  },
  {
    title: 'Dedicated Parking',
    description:
      'Reserved parking options for staff and validated visitor access that simplifies arrival for patients and providers.',
    icon: Car,
  },
];

const locationPoints = [
  '3 mins to central transit access',
  'Adjacent to established medical services',
  'Near healthy dining and daily conveniences',
];

function InquiryField({ label, placeholder, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
        {label}
      </span>
      <input
        placeholder={placeholder}
        className="w-full rounded-[16px] border border-[#dbe7e5] bg-[#f7fbfb] px-4 py-3 text-[0.95rem] text-brand-text-main outline-none transition-colors placeholder:text-[#9ca3af] focus:border-brand-teal/40"
      />
    </label>
  );
}

export default function Rentals() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f4f4] via-[#e6f0f0] via-[820px] to-white font-inter text-brand-text-main">
      <section className="px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-[1220px]">
          <section className="overflow-hidden rounded-[34px] border border-[#dbe7e5] bg-white shadow-[0_18px_50px_rgba(17,75,83,0.08)]">
            <div className="grid items-stretch lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative z-[2] px-7 py-10 md:px-10 md:py-12 lg:px-12 lg:py-16">
                <div className="mb-6 inline-flex items-center rounded-full border border-[#d5e4e1] bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-teal shadow-[0_6px_18px_rgba(17,75,83,0.04)]">
                  Second Floor Leasing
                </div>

                <h1 className="max-w-[12ch] text-[3rem] font-medium leading-[0.94] tracking-[-0.07em] text-brand-text-main md:text-[4.8rem]">
                  The Future of
                  <span className="mt-2 block text-brand-teal italic">Clinical Space</span>
                </h1>

                <p className="mt-7 max-w-[34rem] text-[1.02rem] leading-8 text-[#5f6b76]">
                  Latham Gateway&apos;s premium second-floor suites offer a calm,
                  design-forward setting for modern medical excellence. Elevate your
                  practice in a space shaped for patient comfort and professional growth.
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
                      2,400 - 8,500 SQFT
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
                      Now Leasing
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[420px]">
                <img
                  src="/images/commerce.jpeg"
                  alt="Premium glass-fronted clinical suite interior"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(240,244,244,0.18)] via-transparent to-[rgba(17,75,83,0.08)]" />
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="mb-6 text-[2.1rem] font-medium tracking-[-0.05em] text-brand-text-main md:text-[3rem]">
                Premium Features
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <article
                      key={feature.title}
                      className="rounded-[28px] border border-[#dbe7e5] bg-white p-6 shadow-[0_10px_28px_rgba(17,75,83,0.04)]"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f2f0] text-brand-teal">
                        <Icon size={20} />
                      </div>
                      <h3 className="mb-3 text-[1.3rem] font-medium tracking-[-0.03em] text-brand-text-main">
                        {feature.title}
                      </h3>
                      <p className="text-[0.96rem] leading-7 text-[#667085]">
                        {feature.description}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[30px] border border-[#dbe7e5] bg-white shadow-[0_14px_36px_rgba(17,75,83,0.06)]">
                <img
                  src="/images/IMG_4824.jpeg"
                  alt="Interior suite preview"
                  className="h-[330px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/10 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/30 bg-white/75 px-5 py-4 backdrop-blur-md">
                  <div className="text-[0.92rem] font-semibold text-brand-text-main">
                    Virtual Tour Available
                  </div>
                  <p className="mt-1 text-[0.88rem] leading-6 text-[#667085]">
                    Experience the second-floor layout through a guided walkthrough of the suites and shared spaces.
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-[30px] border border-[#dbe7e5] bg-white p-7 shadow-[0_16px_40px_rgba(17,75,83,0.07)] md:p-8">
              <div className="mb-6 h-[3px] w-12 rounded-full bg-brand-teal" />
              <h2 className="text-[2rem] font-medium tracking-[-0.05em] text-brand-text-main">
                Leasing Inquiry
              </h2>
              <p className="mt-3 max-w-[34rem] text-[0.96rem] leading-7 text-[#667085]">
                Fill out the form below and our property team will reach out within 24 hours.
              </p>

              <form className="mt-8 space-y-4">
                <InquiryField label="Full Name" placeholder="John Doe" />

                <div className="grid gap-4 md:grid-cols-2">
                  <InquiryField label="Email" placeholder="john@clinic.com" />
                  <InquiryField label="Phone" placeholder="(555) 000-0000" />
                </div>

                <label className="block">
                  <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
                    Message
                  </span>
                  <textarea
                    placeholder="Tell us about your space requirements..."
                    className="min-h-[128px] w-full resize-none rounded-[18px] border border-[#dbe7e5] bg-[#f7fbfb] px-4 py-3 text-[0.95rem] text-brand-text-main outline-none transition-colors placeholder:text-[#9ca3af] focus:border-brand-teal/40"
                  />
                </label>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-teal px-7 py-4 text-[0.96rem] font-semibold text-white transition-colors hover:bg-brand-teal-dark"
                >
                  Request Information <ArrowRight size={17} />
                </button>
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
            </aside>
          </section>

          <section className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[34px] border border-[#dbe7e5] bg-white p-3 shadow-[0_14px_36px_rgba(17,75,83,0.06)]">
              <div className="relative overflow-hidden rounded-[28px]">
                <img
                  src="/images/IMG_4822.jpeg"
                  alt="Map and district context"
                  className="h-[360px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,75,83,0.04),rgba(17,75,83,0.1))]" />
                <div className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold text-brand-teal backdrop-blur-sm">
                  Prime District
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[2.4rem] font-medium tracking-[-0.05em] text-brand-text-main md:text-[4rem]">
                Strategic Location
              </h2>
              <p className="mt-4 max-w-[42rem] text-[1rem] leading-8 text-[#667085]">
                Located in the heart of a growing medical corridor, Latham Gateway offers direct access to established providers, transit convenience, and a patient-friendly setting for modern care.
              </p>

              <div className="mt-8 space-y-4">
                {locationPoints.map((point, index) => (
                  <div
                    key={point}
                    className="flex items-center gap-4 rounded-[22px] border border-[#dbe7e5] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(17,75,83,0.04)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f2f0] text-brand-teal">
                      {index === 0 ? <MoveRight size={18} /> : index === 1 ? <MapPinned size={18} /> : <Cross size={18} />}
                    </div>
                    <div className="text-[0.98rem] font-medium text-brand-text-main">{point}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import {
  BriefcaseMedical,
  CircleHelp,
  Lock,
  Shield,
  SquareArrowOutUpRight,
  Stethoscope,
} from 'lucide-react';

const portalCards = [
  {
    title: 'Dental Care',
    description:
      'Access your Dentrix portal for oral health history, x-rays, and dental appointment scheduling.',
    cta: 'Dental Patient Portal (Dentrix)',
    icon: Shield,
    iconBg: 'bg-[#dce8e8]',
    buttonClass:
      'bg-[#0a727f] text-white shadow-[0_14px_30px_rgba(10,114,127,0.22)] hover:bg-[#08636f]',
  },
  {
    title: 'General Health',
    description:
      'Login to Medent for primary care, specialized treatments, labs, and telehealth messaging.',
    cta: 'All Other Services Patient Portal (Medent)',
    icon: BriefcaseMedical,
    iconBg: 'bg-[#e6eaef]',
    buttonClass:
      'bg-[#496f95] text-white shadow-[0_14px_30px_rgba(73,111,149,0.22)] hover:bg-[#3f6385]',
  },
];

const supportItems = [
  {
    title: 'Secure & Encrypted',
    description:
      'Your health information is protected by industry-standard HIPAA compliant encryption.',
    icon: Lock,
  },
  {
    title: 'Need Assistance?',
    description:
      'Contact our support team if you are having trouble logging into your patient account.',
    icon: CircleHelp,
  },
];

export default function Patient() {
  return (
    <main className="relative overflow-hidden bg-[#f7f9fb] font-inter text-brand-text-main">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[100px] h-[440px] w-[440px] rounded-full bg-[#d8eef1]/80 blur-[100px]" />
        <div className="absolute right-[-140px] top-[40px] h-[380px] w-[380px] rounded-full bg-[#d8eef1]/70 blur-[100px]" />
        <div className="absolute left-[10%] top-[760px] h-[320px] w-[320px] rounded-full bg-[#dceefd]/75 blur-[100px]" />
      </div>

      <section className="relative mx-auto max-w-[1120px] px-5 pb-24 pt-36 md:px-8 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[2.9rem] font-semibold leading-[0.94] tracking-[-0.06em] text-[#1f2a32] md:text-[4.7rem]">
            Welcome to Your <span className="text-[#0a727f]">Digital</span>
            <br />
            <span className="text-[#0a727f]">Sanctuary</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[640px] text-[1.05rem] leading-[1.55] text-[#4e5d69] md:text-[1.08rem]">
            Access your medical records, schedule appointments, and communicate with your care
            team through our secure specialized portals.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[710px] gap-6 md:grid-cols-2">
          {portalCards.map(({ title, description, cta, icon: Icon, iconBg, buttonClass }) => (
            <article
              key={title}
              className="rounded-[28px] border border-[#e7ebef] bg-white px-7 pb-7 pt-6 text-center shadow-[0_16px_45px_rgba(31,42,50,0.05)]"
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] ${iconBg}`}
              >
                <Icon size={24} className="text-[#0a6d7a]" strokeWidth={2.1} />
              </div>
              <h2 className="mt-8 text-[1.15rem] font-semibold tracking-[-0.03em] text-[#111a21] md:text-[1.9rem]">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-[280px] text-[0.98rem] leading-[1.55] text-[#5d6872]">
                {description}
              </p>
              <button
                type="button"
                className={`mt-10 inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full px-6 text-[0.96rem] font-semibold transition-all duration-200 ${buttonClass}`}
              >
                <span>{cta}</span>
                <SquareArrowOutUpRight size={15} strokeWidth={2.2} />
              </button>
            </article>
          ))}
        </div>

        <section className="mx-auto mt-16 grid max-w-[760px] overflow-hidden rounded-[28px] border border-[#edf1f3] bg-white/90 shadow-[0_18px_45px_rgba(31,42,50,0.04)] md:grid-cols-2">
          {supportItems.map(({ title, description, icon: Icon }, index) => (
            <div
              key={title}
              className={`px-8 py-8 text-left md:px-10 ${
                index === 0 ? 'md:border-r md:border-[#e7ecef]' : ''
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f2f2] text-[#0a727f]">
                <Icon size={17} strokeWidth={2.2} />
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

        <section className="relative mt-20 overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(20,30,40,0.18)]">
          <img
            src="/images/IMG_4827.jpeg"
            alt="Clinical care room at Latham Gateway"
            className="h-[340px] w-full object-cover md:h-[420px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,24,33,0.78)_0%,rgba(11,24,33,0.48)_32%,rgba(11,24,33,0.08)_72%,rgba(11,24,33,0.06)_100%)]" />
          <div className="absolute inset-y-0 left-0 flex max-w-[460px] items-center px-8 md:px-10">
            <div className="text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                <Stethoscope size={20} strokeWidth={2.2} />
              </div>
              <h2 className="max-w-[360px] text-[2rem] font-semibold leading-[1.03] tracking-[-0.05em] md:text-[3.15rem]">
                Exceptional Care,
                <br />
                Exceptional Experience.
              </h2>
              <p className="mt-5 max-w-[370px] text-[1rem] leading-[1.6] text-white/82">
                We are committed to providing the most advanced clinical services in an
                environment designed for your comfort and peace of mind.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

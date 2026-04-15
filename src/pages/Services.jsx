import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Droplets,
  Plane,
  Stethoscope,
  Syringe,
  Truck,
  UserRound,
  UtensilsCrossed,
  Weight,
} from 'lucide-react';

const serviceImages = [
  '/array/wallhaven-mlwz78.png',
  '/array/wallhaven-mlwz78.png',
  '/array/wallhaven-7j1g9o.jpg',
  '/array/wallhaven-d8e373.jpg',
  '/array/wallhaven-e89l8k.jpg',
  '/array/wallhaven-j51r5p.jpg',
  '/array/wallhaven-je1w15.jpg',
  '/array/wallhaven-mlwz78.png',
  '/array/wallhaven-qr3175.jpg',
  '/array/wallhaven-yq5ywl.jpg',
];

const serviceCards = [
  {
    title: 'Dental Care',
    description:
      'Advanced restorative and cosmetic dentistry focused on creating confident, healthy smiles for patients of every age.',
    cta: 'Learn More',
    icon: Stethoscope,
  },
  {
    title: 'Family Practice',
    description:
      'Personalized primary care for every stage of life, from pediatric wellness visits to long-term health management.',
    cta: 'Learn More',
    icon: Activity,
  },
  {
    title: 'Gastroenterology',
    description:
      'Specialized digestive care with modern diagnostics, treatment planning, and preventive support for lasting wellness.',
    cta: 'Learn More',
    icon: UtensilsCrossed,
  },
  {
    title: 'IV Hydration Therapy',
    description:
      'Rapid nutrient replenishment and hydration boosts designed for recovery, immunity, energy, and peak performance.',
    cta: 'Learn More',
    icon: Droplets,
  },
  {
    featured: true,
    title: 'Cosmetics & Aesthetics',
    description:
      'Medical-grade aesthetic treatments tailored to enhance your natural beauty using advanced, minimally invasive techniques in a calm clinical setting.',
    cta: 'Explore Treatments',
    icon: Droplets,
  },
  {
    title: 'Weight Loss Programs',
    description:
      'Evidence-based medical weight management including structured plans, monitoring, and lifestyle coaching.',
    cta: 'Learn More',
    icon: Weight,
  },
  {
    title: 'Vaccination Center',
    description:
      'Comprehensive immunization services for pediatric, adult, and seasonal health requirements.',
    cta: 'Learn More',
    icon: Syringe,
  },
  {
    title: 'Immigration Medical Exams',
    description:
      'Certified civil surgeon exams and documentation support for USCIS immigration and naturalization processes.',
    cta: 'Learn More',
    icon: UserRound,
  },
  {
    title: 'DOT Physicals',
    description:
      'Certified medical exams for commercial drivers with compliant reporting and streamlined appointments.',
    cta: 'Learn More',
    icon: Truck,
  },
  {
    title: 'Travel Health Guidance',
    description:
      'Preventive consultation, destination-specific planning, and vaccine guidance for international travel.',
    cta: 'Learn More',
    icon: Plane,
  },
];

function ServiceCard({ title, description, cta, icon: Icon, image, index, featured = false }) {
  const isLeftColumn = index % 2 === 0;

  return (
    <article
      className={`group relative flex overflow-hidden rounded-[28px] border border-[#e8e2dc] bg-white shadow-[0_10px_30px_rgba(17,75,83,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(17,75,83,0.12)] ${
        featured ? 'md:min-h-[22.75rem]' : 'min-h-[200px]'
      }`}
    >
      {/* Inner flex row — reversed for left col so image slot is on the left */}
      <div
        className={`flex w-full transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isLeftColumn ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Content — always visible */}
        <div className="flex flex-1 flex-col justify-center p-6 transition-all duration-[420ms] md:p-7" style={{ minWidth: 0 }}>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f2f0] text-brand-teal">
            <Icon size={20} strokeWidth={2.1} />
          </div>
          <h3
            className={`mb-3 font-medium tracking-[-0.03em] text-brand-text-main ${
              featured ? 'text-[1.65rem]' : 'text-[1.45rem]'
            }`}
          >
            {title}
          </h3>
          <p className="mb-7 text-[0.98rem] leading-7 text-[#667085]">{description}</p>
          <Link
            to="/specialties"
            className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-brand-teal transition-all duration-200 group-hover:gap-3 hover:opacity-75"
          >
            {cta} <ArrowRight size={15} />
          </Link>
        </div>

        {/* Image — width: 0 by default, expands to ~44% on card hover */}
        <div
          className="h-auto w-0 flex-shrink-0 overflow-hidden transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[44%]"
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-0 scale-105 transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-100 group-hover:opacity-100 group-hover:scale-100"
            style={{ minWidth: '180px' }}
          />
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f4f4] via-[#e6f0f0] via-[800px] to-white font-inter text-brand-text-main">
      <section className="px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-[1220px]">
          <div className="mx-auto mb-16 max-w-[820px] text-center md:mb-20">
            <div className="mb-6 inline-flex items-center rounded-full border border-[#d8ebe6] bg-white px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-teal shadow-[0_8px_20px_rgba(17,75,83,0.04)]">
              Complete Care Services
            </div>
            <h1 className="text-[3.2rem] font-medium leading-[0.95] tracking-[-0.06em] text-brand-text-main md:text-[5.7rem]">
              Comprehensive
              <span className="mt-2 block text-brand-teal">Wellness Center</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[700px] text-[1.03rem] leading-8 text-[#6b7280] md:text-[1.12rem]">
              Experience a new standard of healthcare. At Latham Gateway, we blend
              advanced clinical expertise with a serene, patient-first environment to
              support your complete well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
            {serviceCards.map((card, index) => (
              <ServiceCard
                key={card.title}
                {...card}
                index={index}
                image={serviceImages[index]}
              />
            ))}
          </div>

          <div className="mt-16 overflow-hidden rounded-[34px] border border-[#d8e7e4] bg-[#eef5f4] px-7 py-8 md:mt-20 md:px-8 md:py-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div className="text-left">
                <h2 className="text-[2rem] font-medium tracking-[-0.04em] text-brand-text-main md:text-[3.1rem]">
                  Ready to prioritize your health?
                </h2>
                <p className="mt-4 max-w-[560px] text-[1rem] leading-7 text-[#6b7280]">
                  Schedule an appointment today and experience the Latham Gateway
                  difference through thoughtful care, elevated service, and a calm,
                  welcoming environment.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="inline-flex items-center justify-center rounded-full bg-brand-teal px-7 py-3 text-[0.92rem] font-semibold text-white transition-colors hover:bg-brand-teal-dark">
                    Book Appointment
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full border border-[#c7d8d4] bg-white/70 px-7 py-3 text-[0.92rem] font-semibold text-brand-teal transition-colors hover:bg-white">
                    Contact Us
                  </button>
                </div>
              </div>

              <div className="relative hidden min-h-[220px] items-center justify-center md:flex">
                <div className="absolute inset-x-8 inset-y-4 rounded-[24px] bg-[#ddeceb]" />
                <div className="relative flex h-[148px] w-[148px] items-center justify-center rounded-[28px] border border-[#cfe0dd] bg-[#e7f1ef]">
                  <div className="absolute top-[-18px] h-8 w-14 rounded-t-[16px] border border-b-0 border-[#cfe0dd] bg-[#e7f1ef]" />
                  <div className="relative h-16 w-16">
                    <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 rounded-full bg-brand-teal/16" />
                    <div className="absolute left-0 top-1/2 h-4 w-full -translate-y-1/2 rounded-full bg-brand-teal/16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
import React, { useEffect, useState } from 'react';
import {
  ShieldPlus, Shield, Activity, Droplet, Building,
  Stethoscope, Leaf, ArrowRight, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { BlurImage } from '../components/BlurImage';
import { LOCAL_BLURHASH } from '../imagePlaceholders';

// Map icon name strings (stored in Sanity) to lucide-react components
const ICON_MAP = {
  Leaf,
  Activity,
  Building,
  Shield,
  Droplet,
  Stethoscope,
  ShieldPlus,
};

function DynamicIcon({ name, size = 24, strokeWidth = 2.5 }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={strokeWidth} />;
}

const LANDING_QUERY = `*[_type == "landingPage"][0]{
  hero{
    heading, subtext,
    backgroundImage, "bgLqip": backgroundImage.asset->metadata.lqip,
    primaryLabel, primaryHref, secondaryLabel, secondaryHref
  },
  floorSection{
    heading,
    subheading,
    floorCards[]{
      title,
      subtitle,
      description,
      icon
    },
    patientPortalCard{
      title,
      subtitle,
      description,
      buttonLabel,
      buttonHref
    }
  },
  servicesSection{
    heading,
    subheading,
    viewAllLabel,
    viewAllHref,
    serviceCards[]{
      title,
      description,
      icon,
      learnMoreLabel,
      learnMoreHref
    }
  }
}`;

export default function Landing() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client.fetch(LANDING_QUERY).then(setData).catch(console.error);
  }, []);

  const hero = data?.hero || {};
  const floorSection = data?.floorSection;
  const servicesSection = data?.servicesSection;

  // Fallback content when Sanity has no document yet
  const floorHeading = floorSection?.heading ?? 'Designed for Your Journey';
  const floorSubheading = floorSection?.subheading ??
    'Navigate our facility with ease. Each floor is purposefully organized to provide specialized care in a calming environment.';

  const floorCards = floorSection?.floorCards ?? [
    { title: 'Garden Floor', subtitle: 'IV & Wellness', description: 'A restorative space dedicated to holistic treatments, hydration therapy, and overall well-being, surrounded by natural light.', icon: 'Leaf' },
    { title: 'Main Floor', subtitle: 'Medical & Dental', description: 'State-of-the-art medical and dental clinics providing comprehensive care with advanced technology in a comforting setting.', icon: 'Activity' },
    { title: 'Second Floor', subtitle: 'Rent / Lease Space', description: 'Premium, adaptable spaces available for specialized practitioners looking to join our collaborative healthcare community.', icon: 'Building' },
  ];

  const portal = floorSection?.patientPortalCard ?? {
    title: 'Patient Portal',
    subtitle: 'Your Health Dashboard',
    description: 'View appointments, lab results, prescriptions, and manage your health records in one place.',
    buttonLabel: 'Access Portal',
    buttonHref: '/patient',
  };

  const servicesHeading = servicesSection?.heading ?? 'Our Comprehensive Care';
  const servicesSubheading = servicesSection?.subheading ??
    'We offer a wide range of services tailored to your unique health needs, delivered by compassionate experts.';
  const viewAllLabel = servicesSection?.viewAllLabel ?? 'View All Services';
  const viewAllHref = servicesSection?.viewAllHref ?? '/services';

  const serviceCards = servicesSection?.serviceCards ?? [
    { title: 'IV Therapy', description: 'Replenish essential vitamins and minerals quickly for boosted energy and immunity.', icon: 'Droplet', learnMoreLabel: 'Learn More', learnMoreHref: '/services' },
    { title: 'Preventative Dentistry', description: 'Comprehensive cleanings and exams to maintain optimal oral health.', icon: 'Shield', learnMoreLabel: 'Learn More', learnMoreHref: '/services' },
    { title: 'Primary Care', description: 'Routine check-ups, chronic disease management, and personalized health planning.', icon: 'Stethoscope', learnMoreLabel: 'Learn More', learnMoreHref: '/services' },
    { title: 'Aesthetic Services', description: 'Rejuvenating treatments designed to enhance your natural vitality and confidence.', icon: 'Leaf', learnMoreLabel: 'Learn More', learnMoreHref: '/services' },
  ];

  return (
    <div className="w-full relative min-h-screen text-brand-text-main font-inter bg-gradient-to-b from-[#f0f4f4] via-[#e6f0f0] via-[800px] to-white">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end pl-4 md:pl-8 pr-[5%] pb-9 overflow-hidden mb-20">
        <BlurImage
          src={hero.backgroundImage ? urlFor(hero.backgroundImage).width(1920).url() : '/images/IMG_4822.jpeg'}
          lqip={hero.bgLqip}
          hash={hero.backgroundImage ? undefined : LOCAL_BLURHASH['/images/IMG_4822.jpeg']}
          fill
        />
        <div className="relative z-10 w-full flex justify-center sm:justify-start">
          <div className="bg-white/85 backdrop-blur-md border border-white/30 p-5 sm:p-6 md:p-8 lg:p-10 rounded-[20px] sm:rounded-[24px] md:rounded-[32px] max-w-[90%] sm:max-w-[85%] md:max-w-[650px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-left">
            <h1 className="text-[1.4rem] sm:text-[1.8rem] md:text-[2.5rem] lg:text-[3.2rem] leading-[1.1] text-brand-text-main mb-3 sm:mb-4 font-medium tracking-tight">
              {hero.heading || 'The Radiant Sanctuary for Healing'}
            </h1>
            <p className="text-brand-text-muted text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] leading-relaxed mb-5 sm:mb-6 md:mb-8 font-normal">
              {hero.subtext || 'Welcome to Lathum Gateway, a comprehensive healthcare facility designed to restore and rejuvenate in a space that feels like home.'}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Link to={hero.primaryHref || '/services'} className="rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-[0.8rem] sm:text-[0.85rem] md:text-sm font-semibold cursor-pointer inline-flex items-center justify-center bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors duration-200">
                {hero.primaryLabel || 'Explore Services'}
              </Link>
              <Link to={hero.secondaryHref || '/contact'} className="hidden md:inline-flex rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-[0.8rem] sm:text-[0.85rem] md:text-sm font-semibold cursor-pointer inline-flex items-center justify-center bg-white text-brand-teal shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200">
                {hero.secondaryLabel || 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Dark Green Flare */}
      <div className="absolute top-[700px] right-[-200px] lg:right-[-300px] w-[600px] md:w-[700px] h-[700px] bg-brand-teal/50 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Floor Breakdown Section */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-[5%] pb-20" id="floor">
        <div className="mb-10 max-w-[600px] text-left">
          <h2 className="text-[2rem] font-medium mb-3 tracking-tight">{floorHeading}</h2>
          <p className="text-brand-text-muted text-base leading-relaxed">{floorSubheading}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Regular Floor Cards */}
          {floorCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-left shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-teal-light rounded-full flex items-center justify-center text-brand-teal mb-4 sm:mb-6">
                <DynamicIcon name={card.icon} size={20} sm:size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-[1rem] sm:text-[1.2rem] sm:text-[1.3rem] font-medium mb-1">{card.title}</h3>
              <div className="text-brand-teal text-[0.8rem] sm:text-[0.9rem] font-medium mb-3 sm:mb-4">{card.subtitle}</div>
              <p className="text-brand-text-muted text-[0.75rem] sm:text-[0.85rem] sm:text-[0.9rem] leading-relaxed">{card.description}</p>
            </div>
          ))}

          {/* Patient Portal Card */}
          <div className="bg-brand-teal rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-left shadow-[0_4px_12px_rgba(2,99,98,0.2)] hover:shadow-[0_10px_30px_rgba(2,99,98,0.3)] hover:-translate-y-1 transition-all duration-200 flex flex-col">
            <div className="flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-4 sm:mb-6">
                <ShieldPlus size={20} sm:size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-[1rem] sm:text-[1.2rem] sm:text-[1.3rem] font-medium mb-1 text-white">{portal.title}</h3>
              <div className="text-white/70 text-[0.8rem] sm:text-[0.9rem] font-medium mb-3 sm:mb-4">{portal.subtitle}</div>
              <p className="text-white/70 text-[0.75rem] sm:text-[0.85rem] sm:text-[0.9rem] leading-relaxed">{portal.description}</p>
            </div>
            <Link
              to={portal.buttonHref}
              className="mt-5 sm:mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-[0.8rem] sm:text-[0.85rem] font-semibold text-brand-teal hover:bg-white/90 transition-colors w-full"
            >
              {portal.buttonLabel} <ChevronRight size={21} sm:size={21} />
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Care Section */}
      <section className="bg-brand-bg-section mx-auto max-w-[1200px] rounded-[32px] p-10 md:p-14 mb-20 md:mx-auto mx-[5%]" id="services">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-10 gap-5 text-left">
          <div className="max-w-[500px]">
            <h2 className="text-[2rem] font-medium mb-3 tracking-tight">{servicesHeading}</h2>
            <p className="text-brand-text-muted text-base leading-relaxed">{servicesSubheading}</p>
          </div>
          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-2 bg-white border border-[#eaeaea] text-brand-text-main px-4 py-2 text-sm rounded-full w-max shadow-sm hover:shadow transition-shadow"
          >
            {viewAllLabel} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-[14px] sm:rounded-[20px] p-4 sm:p-5 sm:p-6 shadow-sm flex flex-col items-start text-left"
            >
              <div className="w-7 sm:w-8 h-7 sm:h-8 mb-3 sm:mb-4 text-brand-text-main flex items-start justify-start">
                <DynamicIcon name={card.icon} size={16} sm:size={20} strokeWidth={2} />
              </div>
              <h3 className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] font-medium mb-2 sm:mb-3 text-brand-text-main w-full">{card.title}</h3>
              <p className="text-brand-text-muted text-[0.7rem] sm:text-[0.8rem] md:text-[0.85rem] leading-relaxed mb-4 sm:mb-6 flex-1 w-full">{card.description}</p>
              <Link
                to={card.learnMoreHref}
                className="text-brand-teal text-[0.75rem] sm:text-[0.8rem] sm:text-[0.85rem] font-semibold flex items-center gap-1 hover:underline w-full"
              >
                {card.learnMoreLabel} <ChevronRight size={12} sm:size={13} sm:size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

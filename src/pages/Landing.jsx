import React from 'react';
import { ShieldPlus, Shield, Activity, Droplet, Building, Stethoscope, Leaf, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="w-full relative min-h-screen text-brand-text-main font-inter bg-gradient-to-b from-[#f0f4f4] via-[#e6f0f0] via-[800px] to-white">


      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-end pl-4 md:pl-8 pr-[5%] pb-9 overflow-hidden mb-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/IMG_4822.jpeg')" }}
      >
        <div className="bg-white/45 backdrop-blur-md border border-white/30 p-8 lg:p-10 rounded-[32px] max-w-[650px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-left">
          <h1 className="text-[2.5rem] md:text-[3.2rem] leading-[1.1] text-brand-text-main mb-4 font-medium tracking-tight">
            The Radiant Sanctuary for Healing
          </h1>
          <p className="text-brand-text-muted text-[1.1rem] leading-relaxed mb-8 font-normal">
            Welcome to Latham Gateway, a comprehensive healthcare facility
            designed to restore and rejuvenate in a space that feels like home.
          </p>
          <div className="flex gap-4">
            <Link to="/services" className="rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer inline-flex items-center justify-center bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors duration-200">
              Explore Services
            </Link>
            <button className="rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer inline-flex items-center justify-center bg-white text-brand-teal shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200">
              Patient Portal
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Dark Green Flare (Edge of Screen) */}
      <div className="absolute top-[700px] right-[-200px] lg:right-[-300px] w-[600px] md:w-[700px] h-[700px] bg-brand-teal/50 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Floor Breakdown Section */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-[5%] pb-20" id="floor">
        <div className="mb-10 max-w-[600px] text-left">
          <h2 className="text-[2rem] font-medium mb-3 tracking-tight">Designed for Your Journey</h2>
          <p className="text-brand-text-muted text-base leading-relaxed">
            Navigate our facility with ease. Each floor is purposefully organized to provide specialized care in a calming environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Floor Card 1 */}
          <div className="bg-white rounded-3xl p-8 text-left shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 bg-brand-teal-light rounded-full flex items-center justify-center text-brand-teal mb-6">
              <Leaf size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-[1.3rem] font-medium mb-1.5">Garden Floor</h3>
            <div className="text-brand-teal text-[0.9rem] font-medium mb-4">IV & Wellness</div>
            <p className="text-brand-text-muted text-[0.9rem] leading-relaxed">
              A restorative space dedicated to holistic treatments, hydration therapy, and overall well-being, surrounded by natural light.
            </p>
          </div>

          {/* Floor Card 2 */}
          <div className="bg-white rounded-3xl p-8 text-left shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 bg-brand-teal-light rounded-full flex items-center justify-center text-brand-teal mb-6">
              <Activity size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-[1.3rem] font-medium mb-1.5">Main Floor</h3>
            <div className="text-brand-teal text-[0.9rem] font-medium mb-4">Medical & Dental</div>
            <p className="text-brand-text-muted text-[0.9rem] leading-relaxed">
              State-of-the-art medical and dental clinics providing comprehensive care with advanced technology in a comforting setting.
            </p>
          </div>

          {/* Floor Card 3 */}
          <div className="bg-white rounded-3xl p-8 text-left shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 bg-brand-teal-light rounded-full flex items-center justify-center text-brand-teal mb-6">
              <Building size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-[1.3rem] font-medium mb-1.5">Second Floor</h3>
            <div className="text-brand-teal text-[0.9rem] font-medium mb-4">Rent / Lease Space</div>
            <p className="text-brand-text-muted text-[0.9rem] leading-relaxed">
              Premium, adaptable spaces available for specialized practitioners looking to join our collaborative healthcare community.
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Care Section */}
      <section className="bg-brand-bg-section mx-auto max-w-[1200px] rounded-[32px] p-10 md:p-14 mb-20 md:mx-auto mx-[5%]" id="services">
       
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-10 gap-5 text-left">
          <div className="max-w-[500px]">
            <h2 className="text-[2rem] font-medium mb-3 tracking-tight">Our Comprehensive Care</h2>
            <p className="text-brand-text-muted text-base leading-relaxed">
              We offer a wide range of services tailored to your unique health needs, delivered by compassionate experts.
            </p>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 bg-white border border-[#eaeaea] text-brand-text-main px-4 py-2 text-sm rounded-full w-max shadow-sm hover:shadow transition-shadow">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Service Card 1 */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col items-start text-left">
            <div className="w-8 h-8 mb-4 text-brand-text-main flex items-start justify-start">
              <Droplet size={20} />
            </div>
            <h3 className="text-[1.1rem] font-medium mb-3 text-brand-text-main w-full">IV Therapy</h3>
            <p className="text-brand-text-muted text-[0.85rem] leading-relaxed mb-6 flex-1 w-full">Replenish essential vitamins and minerals quickly for boosted energy and immunity.</p>
            <Link to="/services" className="text-brand-teal text-[0.85rem] font-semibold flex items-center gap-1 hover:underline w-full">
              Learn More <ChevronRight size={14} />
            </Link>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col items-start text-left">
            <div className="w-8 h-8 mb-4 text-brand-text-main flex items-start justify-start">
              <Shield size={20} />
            </div>
            <h3 className="text-[1.1rem] font-medium mb-3 text-brand-text-main w-full">Preventative Dentistry</h3>
            <p className="text-brand-text-muted text-[0.85rem] leading-relaxed mb-6 flex-1 w-full">Comprehensive cleanings and exams to maintain optimal oral health.</p>
            <Link to="/services" className="text-brand-teal text-[0.85rem] font-semibold flex items-center gap-1 hover:underline w-full">
              Learn More <ChevronRight size={14} />
            </Link>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col items-start text-left">
            <div className="w-8 h-8 mb-4 text-brand-text-main flex items-start justify-start">
              <Stethoscope size={20} />
            </div>
            <h3 className="text-[1.1rem] font-medium mb-3 text-brand-text-main w-full">Primary Care</h3>
            <p className="text-brand-text-muted text-[0.85rem] leading-relaxed mb-6 flex-1 w-full">Routine check-ups, chronic disease management, and personalized health planning.</p>
            <Link to="/services" className="text-brand-teal text-[0.85rem] font-semibold flex items-center gap-1 hover:underline w-full">
              Learn More <ChevronRight size={14} />
            </Link>
          </div>

          {/* Service Card 4 */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col items-start text-left">
            <div className="w-8 h-8 mb-4 text-brand-text-main flex items-start justify-start">
              <Leaf size={20} />
            </div>
            <h3 className="text-[1.1rem] font-medium mb-3 text-brand-text-main w-full">Aesthetic Services</h3>
            <p className="text-brand-text-muted text-[0.85rem] leading-relaxed mb-6 flex-1 w-full">Rejuvenating treatments designed to enhance your natural vitality and confidence.</p>
            <Link to="/services" className="text-brand-teal text-[0.85rem] font-semibold flex items-center gap-1 hover:underline w-full">
              Learn More <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}

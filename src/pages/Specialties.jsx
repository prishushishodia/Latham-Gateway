import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldPlus, CheckCircle2, Star, Users, ArrowRight, ArrowLeft, Leaf, Shield, Wind, ChevronRight } from 'lucide-react';

export default function Specialties() {
  return (
    <div className="font-inter min-h-screen text-[#1a1a1a] bg-[#f8f9fc]">
      


      {/* Hero Section */}
      <section className="relative h-[800px] flex items-center px-[5%] justify-center lg:justify-start">
        <img 
          src="/images/IMG_4824.jpeg" 
          alt="Modern clinic facade" 
          className="absolute inset-0 w-full h-full object-cover -z-10 object-[center_30%]"
        />
        {/* Soft bottom fade inline */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#f8f9fc] -z-10"></div>
        
        <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/40 p-10 lg:p-12 rounded-[32px] max-w-[550px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-[80px] lg:ml-[10%]">
          <div className="bg-[#a7efef] text-[#006e68] text-[0.65rem] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full inline-block mb-6">
            EXCELLENCE IN CARE
          </div>
          <h1 className="text-[2.8rem] md:text-[3.5rem] leading-[1.1] text-[#1a1a1a] mb-5 font-semibold tracking-tight">
            Healing in<br/><span className="text-[#006e68]">Harmony.</span>
          </h1>
          <p className="text-[#666] text-[1.05rem] leading-relaxed mb-8 font-normal max-w-[450px]">
            Welcome to Latham Gateway, where advanced medical technology meets the tranquility of a digital sanctuary. Our new facility is designed for your comfort and recovery.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full px-6 py-[12px] text-[0.9rem] font-semibold cursor-pointer inline-flex items-center justify-center gap-2 bg-[#006e68] text-white hover:bg-[#00524d] transition-colors shadow-md">
              Take a Virtual Tour <CheckCircle2 size={16} fill="white" stroke="#006e68" />
            </button>
            <button className="rounded-full px-6 py-[12px] text-[0.9rem] font-semibold cursor-pointer inline-flex items-center justify-center bg-white text-[#1a1a1a] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#eaeaea] hover:bg-gray-50 transition-colors">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-[1200px] mx-auto px-[5%] -mt-16 mb-20 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[160px]">
          <div className="mb-2 text-[#006e68]">
            {/* SVG placeholder for building/departments icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
          </div>
          <div>
            <h3 className="text-[2rem] font-bold text-[#1a1a1a] leading-none mb-1">42+</h3>
            <p className="text-[#666] text-[0.8rem] m-0">Specialized Departments</p>
          </div>
        </div>
        
        <div className="bg-[#006e68] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[160px] text-white">
          <div className="mb-2 text-white">
            <Users size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-[2rem] font-bold leading-none mb-1">150+</h3>
            <p className="text-white/80 text-[0.8rem] m-0">Expert Clinicians</p>
          </div>
        </div>

        <div className="bg-[#e9ecee] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[160px]">
          <div className="mb-2 text-[#006e68]">
            <Star size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-[2rem] font-bold text-[#1a1a1a] leading-none mb-1">98%</h3>
            <p className="text-[#666] text-[0.8rem] m-0">Patient Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Facility Directory */}
      <section className="max-w-[1200px] mx-auto px-[5%] mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 w-full gap-6">
          <div className="max-w-[500px]">
            <h2 className="text-[2.2rem] font-bold text-[#1a1a1a] mb-3">Facility Directory</h2>
            <p className="text-[#666] text-[0.95rem] leading-relaxed">
              Navigate our state-of-the-art sanctuary with ease. Each level is dedicated to specific therapeutic domains.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full border border-[#d1d5db] flex items-center justify-center text-[#1a1a1a] hover:bg-white transition-colors bg-transparent"><ArrowLeft size={18}/></button>
            <button className="w-10 h-10 rounded-full border border-[#d1d5db] flex items-center justify-center text-[#1a1a1a] hover:bg-white transition-colors bg-transparent"><ArrowRight size={18}/></button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* Level 4 */}
          <div className="bg-white rounded-[20px] p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm relative pr-20">
            <div className="w-16 h-16 rounded-[14px] bg-[#6ef0f0] flex items-center justify-center text-[#1a1a1a] font-bold text-[1.4rem] shrink-0">
              4
            </div>
            <div className="flex-1">
              <h4 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-1">Executive Health & Research</h4>
              <p className="text-[#666] text-[0.85rem]">Private suites, clinical trial centers, and administrative leadership.</p>
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <span className="bg-[#f3f4f6] text-[#4b5563] text-[0.7rem] px-3 py-1.5 rounded-full font-medium">VIP Lounges</span>
              <span className="bg-[#f3f4f6] text-[#4b5563] text-[0.7rem] px-3 py-1.5 rounded-full font-medium">Labs</span>
            </div>
          </div>

          {/* Level 3 */}
          <div className="bg-white rounded-[20px] p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm relative pr-20">
            <div className="w-16 h-16 rounded-[14px] bg-[#dbe8e8] flex items-center justify-center text-[#1a1a1a] font-bold text-[1.4rem] shrink-0">
              3
            </div>
            <div className="flex-1">
              <h4 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-1">Inpatient Sanctuary</h4>
              <p className="text-[#666] text-[0.85rem]">Residential recovery rooms designed with natural light and biophilic elements.</p>
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <span className="bg-[#f3f4f6] text-[#4b5563] text-[0.7rem] px-3 py-1.5 rounded-full font-medium">Rehabilitation</span>
            </div>
          </div>

          {/* Level 2 */}
          <div className="bg-white rounded-[20px] p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm relative pr-20">
            <div className="w-16 h-16 rounded-[14px] bg-[#a9d6fc] flex items-center justify-center text-[#1a1a1a] font-bold text-[1.4rem] shrink-0">
              2
            </div>
            <div className="flex-1">
              <h4 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-1">Diagnostic & Imaging</h4>
              <p className="text-[#666] text-[0.85rem]">Precision MRI, CT, and advanced laboratory services with real-time results.</p>
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <span className="bg-[#f3f4f6] text-[#4b5563] text-[0.7rem] px-3 py-1.5 rounded-full font-medium">Radiology</span>
              <span className="bg-[#f3f4f6] text-[#4b5563] text-[0.7rem] px-3 py-1.5 rounded-full font-medium">Blood Work</span>
            </div>
          </div>

          {/* Level 1 */}
          <div className="bg-white rounded-[20px] p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm relative pr-20 border border-[#4be5e5]/30">
            <div className="w-16 h-16 rounded-[14px] bg-[#006e68] flex items-center justify-center text-white font-bold text-[1.4rem] shrink-0">
              1
            </div>
            <div className="flex-1">
              <h4 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-1">The Gateway Atrium</h4>
              <p className="text-[#666] text-[0.85rem]">Welcome center, outpatient pharmacy, and organic cafe conservatory.</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="bg-[#6ef0f0] text-[#006e68] text-[0.7rem] px-3 py-1.5 rounded-full font-bold">Active Floor</span>
              <ChevronRight size={16} className="text-[#a1a1aa] ml-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Future-Proof Architecture */}
      <section className="max-w-[1200px] mx-auto px-[5%] pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          {/* Left image wrapper */}
          <div className="relative h-full w-full">
            <img 
              src="/images/IMG_4827.jpeg" 
              alt="Hospital Hallway" 
              className="rounded-[32px] w-full h-[600px] object-cover shadow-[0_15px_40px_rgba(0,0,0,0.1)]"
            />
            {/* Overlay Gradient block */}
            <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/50 rounded-[20px] p-6 shadow-sm">
              <h4 className="text-[#1a1a1a] font-bold text-[1.1rem] mb-2">Architectural Wellness</h4>
              <p className="text-[#666] text-[0.8rem] leading-relaxed">
                Every angle of Latham Gateway was engineered to promote serotonin production and reduce cortisol through patient-centric design.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-[2.6rem] font-bold text-[#1a1a1a] leading-[1.1] mb-10">
                Future-Proof<br/>Architecture.
              </h2>
              
              <div className="flex flex-col gap-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[#b1fbfb] flex items-center justify-center text-[#006e68] shrink-0">
                    <Leaf size={18} strokeWidth={2.5}/>
                  </div>
                  <div>
                    <h4 className="text-[#1a1a1a] font-bold text-[1rem] mb-1">Sustainability First</h4>
                    <p className="text-[#666] text-[0.85rem] leading-relaxed">LEED Platinum certified structure using recycled water systems and solar harvesting windows.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[#b1fbfb] flex items-center justify-center text-[#006e68] shrink-0">
                    <Shield size={18} strokeWidth={2.5}/>
                  </div>
                  <div>
                    <h4 className="text-[#1a1a1a] font-bold text-[1rem] mb-1">Contactless Navigation</h4>
                    <p className="text-[#666] text-[0.85rem] leading-relaxed">Biometric entry systems and digital wayfinding accessible from your personal mobile device.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[#b1fbfb] flex items-center justify-center text-[#006e68] shrink-0">
                    <Wind size={18} strokeWidth={2.5}/>
                  </div>
                  <div>
                    <h4 className="text-[#1a1a1a] font-bold text-[1rem] mb-1">HEPA-Filtered Air</h4>
                    <p className="text-[#666] text-[0.85rem] leading-relaxed">Medical-grade air filtration changing the entire volume of interior air every 15 minutes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready to visit CTA box */}
            <div className="bg-[#006e68] rounded-[24px] p-8 text-white relative overflow-hidden">
              {/* Compass/Logo watermark icon */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <ShieldPlus size={150} />
              </div>
              <div className="relative z-10">
                <h3 className="text-[1.8rem] font-bold mb-2">Ready to visit?</h3>
                <p className="text-white/80 text-[0.9rem] mb-6">Schedule your facility tour or book a diagnostic appointment today.</p>
                <button className="bg-white text-[#006e68] font-bold px-8 py-3 rounded-full text-[0.9rem] shadow-sm hover:bg-gray-50 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}

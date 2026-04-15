import React from 'react';
import { Star } from 'lucide-react';
import Antigravity from './Antigravity';
import Galaxy from './ui/galaxy';

// Custom inline SVGs for social brands
const FacebookIcon = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const LinkedinIcon = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer>
      {/* Top CTA Section — green band */}
      <div className="w-full bg-[#114b53] py-20 px-[5%] relative overflow-hidden">
        {/* ── Galaxy background (z-0) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Galaxy
            density={700}
            glowColor="#6ef0f0"
            speed={0.04}
            opacity={0.38}
            mouseRepulsion
          />
        </div>

        {/* ── Antigravity particle layer (z-[1]) ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-50">
          <Antigravity
            count={300}
            color="#ffffff"
            autoAnimate
            particleShape="capsule"
            ringRadius={6.5}
            magnetRadius={12}
            waveAmplitude={0.5}
            particleSize={1.2}
            rotationSpeed={0.08}
            depthFactor={0.7}
            fieldStrength={14}
            lerpSpeed={0.1}
            cursorFollowSpeed={0.3}
          />
        </div>

        {/* ── Colour overlay to keep text readable (z-[2]) ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_78%_45%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(90deg,rgba(17,75,83,0.15)_0%,rgba(17,75,83,0.35)_60%,rgba(17,75,83,0.55)_100%)]" />

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-[10]">
          <div className="text-white max-w-[500px]">
            <h2 className="text-[2.2rem] md:text-[2.8rem] font-medium mb-4 leading-tight">Rent Space at Latham Gateway</h2>
            <p className="text-white/80 text-[1.05rem] leading-relaxed mb-8 font-light">
              Join our collaborative healthcare community. Premium, adaptable spaces on the second floor are available for specialized practitioners looking to grow their practice.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#114b53] rounded-full px-8 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5">
                Inquire About Space
              </button>
              <button className="bg-transparent border border-white/50 text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
          
          {/* Decorative graphic right side */}
          <div className="hidden md:flex justify-end items-center absolute right-0 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none h-full scale-150 origin-right">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer thin circle */}
              <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="1" strokeOpacity="0.2"/>
              {/* Overlapping Triangles pointing up */}
              <path d="M200 40L360 200H40L200 40Z" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
              <path d="M200 160L320 280H80L200 160Z" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Legal/Link Section */}
      <div className="w-full bg-[#f8f9fa] py-16 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          {/* Top part of white section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <h3 className="text-[#1a1a1a] text-[1.8rem] md:text-[2.2rem] font-medium leading-tight max-w-[600px] tracking-tight">
              A healing space built for your well-being, all under one roof
            </h3>
            
            {/* Trustpilot Review */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-[28px] h-[28px] bg-[#00b67a] flex items-center justify-center">
                    <Star size={16} fill="white" stroke="white" strokeWidth={0}/>
                  </div>
                ))}
              </div>
              <div className="text-[0.95rem] font-medium text-[#1a1a1a] flex items-center gap-1.5">
                <span className="font-bold">48</span> reviews on 
                <div className="flex items-center gap-1 font-bold ml-1">
                  <Star fill="#00b67a" stroke="#00b67a" size={18} /> Trustpilot
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 mb-8"></div>

          {/* Bottom Links part */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[#666] text-[0.85rem] font-medium">
              © 2025 Latham Gateway. All Rights Reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[0.85rem] font-medium text-[#666]">
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Services</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Rent / Lease</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Our Floors</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">About Us</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4 text-[#888]">
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors" style={{background: '#a5a5a5'}}>
                <FacebookIcon size={16} fill="white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors" style={{background: '#a5a5a5'}}>
                <TwitterIcon size={16} fill="white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors" style={{background: '#a5a5a5'}}>
                <LinkedinIcon size={16} fill="white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

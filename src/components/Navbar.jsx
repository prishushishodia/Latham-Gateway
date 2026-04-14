import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldPlus } from 'lucide-react';
import PillNav from './PillNav';

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Floor Breakdown', href: '/specialties' },
    { label: 'Services', href: '/services' },
  ];

  return (
    <div className="absolute top-5 left-0 right-0 z-[100] flex justify-center px-5 pointer-events-none">
      <nav className="flex justify-between items-center w-full max-w-[1100px] bg-white/60 backdrop-blur-md border border-white/30 px-4 md:px-6 py-3 rounded-full shadow-sm pointer-events-auto gap-3 md:gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-brand-teal text-[1.1rem]">
          <ShieldPlus size={24} className="fill-brand-teal text-brand-teal" />
          <span className="hidden sm:inline">Latham Gateway</span>
        </Link>

        <div className="flex flex-1 justify-center md:flex-none">
          <PillNav
            items={navItems}
            activeHref={location.pathname}
            className="w-full md:w-auto"
            baseColor="rgba(17, 75, 83, 0.08)"
            pillColor="transparent"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#1f2937"
            activePillColor="transparent"
            activeTextColor="#114b53"
            hoverPillColor="#114b53"
            mobileMenuColor="rgba(255, 255, 255, 0.96)"
          />
        </div>

        <Link
          to="/rentals"
          className="hidden md:inline-flex rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer items-center justify-center gap-2 bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors duration-200 whitespace-nowrap"
        >
          Available for Rent
        </Link>
      </nav>
    </div>
  );
}

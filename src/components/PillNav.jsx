import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function PillNav({
  items,
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(8, 87, 90, 0.08)',
  pillColor = 'transparent',
  hoveredPillTextColor = '#0f766e',
  pillTextColor = '#1f2937',
  activePillColor = '#ffffff',
  activeTextColor = '#0f766e',
  hoverPillColor = '#114b53',
  mobileMenuColor = '#ffffff',
  initialLoadAnimation = false,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const hamburgerRef = useRef(null);
  const activeUnderlineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const layout = () => {
      hoverRefs.current.forEach((overlay) => {
        if (!overlay?.parentElement) return;

        const pill = overlay.parentElement;
        const rect = pill.getBoundingClientRect();
        const { height: h } = rect;

        gsap.set(overlay, {
          scale: 0.92,
          opacity: 0,
          transformOrigin: '50% 50%',
        });

        const label = pill.querySelector('.pill-label');
        const highlight = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (highlight) gsap.set(highlight, { y: h + 10, opacity: 0 });

        const index = hoverRefs.current.indexOf(overlay);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(overlay, { scale: 1, opacity: 1, duration: 0.3, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 6), duration: 0.3, ease, overwrite: 'auto' }, 0);
        }

        if (highlight) {
          gsap.set(highlight, { y: h + 10, opacity: 0 });
          tl.to(highlight, { y: 0, opacity: 1, duration: 0.3, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { visibility: 'hidden', opacity: 0, y: 10 });
    }

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.set(navItemsRef.current, { opacity: 0, y: -6 });
      gsap.to(navItemsRef.current, { opacity: 1, y: 0, duration: 0.45, ease });
    }

    const activeIndex = items.findIndex((item) => item.href === activeHref);
    const activeItem = itemRefs.current[activeIndex];
    if (activeUnderlineRef.current && activeItem && navItemsRef.current) {
      const navRect = navItemsRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      gsap.to(activeUnderlineRef.current, {
        x: itemRect.left - navRect.left + 20,
        width: Math.max(itemRect.width - 40, 24),
        opacity: 1,
        duration: 0.35,
        ease,
        overwrite: 'auto',
      });
    }

    return () => window.removeEventListener('resize', layout);
  }, [activeHref, ease, initialLoadAnimation, items]);

  const handleEnter = (index) => {
    const tl = tlRefs.current[index];
    if (!tl) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = tl.tweenTo(tl.duration(), {
      duration: 0.22,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (index) => {
    const tl = tlRefs.current[index];
    if (!tl) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = tl.tweenTo(0, {
      duration: 0.18,
      ease,
      overwrite: 'auto',
    });
  };

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);

    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.querySelectorAll('.hamburger-line');
      if (nextState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.24, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.24, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.2, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.2, ease });
      }
    }

    if (mobileMenuRef.current) {
      if (nextState) {
        gsap.set(mobileMenuRef.current, { visibility: 'visible' });
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.24, ease }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.18,
          ease,
          onComplete: () => gsap.set(mobileMenuRef.current, { visibility: 'hidden' }),
        });
      }
    }
  };

  const closeMobileMenu = () => {
    if (!isMobileMenuOpen) return;
    setIsMobileMenuOpen(false);

    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.querySelectorAll('.hamburger-line');
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.2, ease });
      gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.2, ease });
    }

    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.18,
        ease,
        onComplete: () => gsap.set(mobileMenuRef.current, { visibility: 'hidden' }),
      });
    }
  };

  const cssVars = {
    '--pillnav-base': baseColor,
    '--pillnav-bg': pillColor,
    '--pillnav-text': pillTextColor,
    '--pillnav-hover-text': hoveredPillTextColor,
    '--pillnav-active-bg': activePillColor,
    '--pillnav-active-text': activeTextColor,
    '--pillnav-hover-bg': hoverPillColor,
    '--pillnav-mobile-bg': mobileMenuColor,
  };

  return (
    <div className={`relative ${className}`} style={cssVars}>
      <div
        ref={navItemsRef}
        className="hidden md:flex items-center rounded-full p-1 backdrop-blur-sm relative"
        style={{ background: 'var(--pillnav-base)' }}
      >
        <span
          ref={activeUnderlineRef}
          className="pointer-events-none absolute bottom-[6px] left-0 block h-[3px] rounded-full"
          style={{ background: 'var(--pillnav-hover-bg)', opacity: 0 }}
          aria-hidden="true"
        />
        <ul className="m-0 flex list-none items-stretch gap-1 p-0">
          {items.map((item, index) => {
            const isActive = activeHref === item.href;
            const linkClasses =
              'relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full px-5 text-[0.92rem] font-medium tracking-[-0.01em] transition-colors';

            return (
              <li key={item.href} className="flex">
                <Link
                  to={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className={linkClasses}
                  style={{
                    background: isActive ? 'transparent' : 'var(--pillnav-bg)',
                    color: isActive ? 'var(--pillnav-active-text)' : 'var(--pillnav-text)',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={() => handleEnter(index)}
                  onMouseLeave={() => handleLeave(index)}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                >
                  <span
                    className="absolute inset-0 block rounded-full pointer-events-none"
                    style={{ background: 'var(--pillnav-hover-bg)' }}
                    ref={(el) => {
                      hoverRefs.current[index] = el;
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative z-[2] inline-block leading-none">
                    <span className="pill-label inline-block leading-none">{item.label}</span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 inline-block leading-none"
                      style={{ color: 'var(--pillnav-hover-text)' }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        ref={hamburgerRef}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation"
        aria-expanded={isMobileMenuOpen}
        className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
        style={{ background: 'var(--pillnav-base)' }}
      >
        <span className="flex flex-col gap-1">
          <span
            className="hamburger-line block h-0.5 w-4 rounded-full"
            style={{ background: 'var(--pillnav-active-text)' }}
          />
          <span
            className="hamburger-line block h-0.5 w-4 rounded-full"
            style={{ background: 'var(--pillnav-active-text)' }}
          />
        </span>
      </button>

      <div
        ref={mobileMenuRef}
        className="absolute left-0 right-0 top-[calc(100%+12px)] z-20 rounded-[28px] border border-[#d8ece9] p-2 shadow-[0_18px_50px_rgba(10,41,38,0.12)] md:hidden"
        style={{ background: 'var(--pillnav-mobile-bg)' }}
      >
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {items.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="block rounded-full px-4 py-3 text-[0.95rem] font-medium transition-colors"
                  style={{
                    background: isActive ? 'rgba(15, 118, 110, 0.08)' : 'transparent',
                    color: isActive ? 'var(--pillnav-active-text)' : 'var(--pillnav-text)',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

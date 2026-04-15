import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Services from './pages/Services';
import FloorBreakdown from './pages/FloorBreakdown';
import Rentals from './pages/Rentals';
import Contact from './pages/Contact';
import Patient from './pages/Patient';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Scrolls to top on every navigation, or to a #hash element if present
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the page a tick to render before scrolling to the element
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Element not yet in DOM — wait for it
        const raf = requestAnimationFrame(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return () => cancelAnimationFrame(raf);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/floor-breakdown" element={<FloorBreakdown />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

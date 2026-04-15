import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Services from './pages/Services';
import Specialties from './pages/Specialties';
import Rentals from './pages/Rentals';
import Contact from './pages/Contact';
import Patient from './pages/Patient';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

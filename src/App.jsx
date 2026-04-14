import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Services from './pages/Services';
import Specialties from './pages/Specialties';
import Rentals from './pages/Rentals';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

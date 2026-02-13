import React, { useState } from 'react';
import './App.css';
import { Heart, Users, Calendar, Phone, ArrowRight, Menu, X, Globe } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle Mobile Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app-container">
      {/* --- NAVIGATION --- */}
      <nav className="navbar">
        <div className="logo">
          <Heart className="logo-icon" fill="#c0a062" stroke="#c0a062" />
          <span>Dignity in Departure</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="nav-links desktop-only">
          <a href="#mission">Our Mission</a>
          <a href="#process">The Process</a>
          <a href="#impact">Our Impact</a>
          <a href="#contact" className="btn-donate-nav">Donate Now</a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="mobile-dropdown">
          <a href="#mission" onClick={toggleMenu}>Our Mission</a>
          <a href="#process" onClick={toggleMenu}>The Process</a>
          <a href="#impact" onClick={toggleMenu}>Our Impact</a>
          <a href="#contact" onClick={toggleMenu}>Donate Now</a>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Every Soul Deserves a Dignified Farewell</h1>
            <p>We ensure that unclaimed and unidentified bodies receive proper last rites with the respect and honor every human being deserves.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Support the Cause <ArrowRight size={18} /></button>
              <button className="btn-secondary">Report a Case</button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MISSION STATEMENT --- */}
      <section id="mission" className="section-mission">
        <div className="container">
          <h2>Restoring Dignity</h2>
          <div className="divider"></div>
          <p className="lead-text">
            In our society, hundreds of bodies go unclaimed every year—abandoned in hospitals, morgues, or on the streets. 
            We believe that death should not strip a person of their humanity. Regardless of religion, caste, or background, 
            we provide respectful cremations and burials.
          </p>
        </div>
      </section>

      {/* --- HOW IT WORKS (CARDS) --- */}
      <section id="process" className="section-process">
        <div className="container">
          <h2>Our Process</h2>
          <div className="process-grid">
            <div className="card">
              <div className="icon-box"><Phone size={32} /></div>
              <h3>Notification</h3>
              <p>We receive alerts from police, hospitals, and social workers regarding unclaimed bodies.</p>
            </div>
            <div className="card">
              <div className="icon-box"><Users size={32} /></div>
              <h3>Identification</h3>
              <p>We exhaust all efforts to locate kin. If none are found, we claim custody legally.</p>
            </div>
            <div className="card">
              <div className="icon-box"><Globe size={32} /></div>
              <h3>Last Rites</h3>
              <p>Depending on the likely faith or general protocols, we perform final rites with full honors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATISTICS / IMPACT --- */}
      <section id="impact" className="section-stats">
        <div className="stat-item">
          <h2>1,250+</h2>
          <p>Rites Performed</p>
        </div>
        <div className="stat-item">
          <h2>850+</h2>
          <p>Families Reunited</p>
        </div>
        <div className="stat-item">
          <h2>100%</h2>
          <p>Non-Profit</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact">
        <div className="container footer-content">
          <div className="footer-col">
            <h4>Dignity in Departure</h4>
            <p>Providing peace to the departed, and closure to humanity.</p>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>Helpline: +91 98765 43210</p>
            <p>Email: help@dignifiedrites.org</p>
          </div>
          <div className="footer-col">
            <h4>Address</h4>
            <p>123 Peace Avenue,<br/>Sector 4, New Delhi, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Dignified Last Rites Initiative. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
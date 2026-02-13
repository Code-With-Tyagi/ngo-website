import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookReader, FaUtensils, FaHeart, FaHandHoldingHeart, FaGraduationCap, FaGift } from "react-icons/fa";

function OrphanageSupport() {

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToDonate = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="orphanage-container">
      {/* Internal CSS for Hover Effects & Animations */}
      <style>{`
        .orphanage-container {
          font-family: 'Inter', sans-serif;
          color: #333;
          background-color: #f8f9fa;
          overflow-x: hidden;
        }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 97.5vh;
          background-image: url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .hero-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: 20px;
        }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          margin: 20px 0;
          line-height: 1.1;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        /* Buttons */
        .btn {
          padding: 15px 35px;
          font-size: 1.1rem;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: inline-block;
        }
        .btn-primary {
          background-color: #F26522;
          color: white;
          box-shadow: 0 4px 15px rgba(242, 101, 34, 0.4);
        }
        .btn-primary:hover {
          background-color: #d9531e;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(242, 101, 34, 0.6);
        }
        .btn-secondary {
          background-color: rgba(255,255,255,0.1);
          color: white;
          border: 2px solid white;
          backdrop-filter: blur(5px);
        }
        .btn-secondary:hover {
          background-color: white;
          color: #2E7D32;
          transform: translateY(-3px);
        }

        /* CTA Specific Buttons */
        .btn-cta-primary {
          background-color: white;
          color: #1b5e20;
          margin-right: 15px;
        }
        .btn-cta-primary:hover {
          background-color: #f1f8e9;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .btn-cta-secondary {
          background-color: transparent;
          color: white;
          border: 2px solid white;
        }
        .btn-cta-secondary:hover {
          background-color: rgba(255,255,255,0.1);
          transform: translateY(-3px);
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #2E7D32, #1b5e20);
          padding: 60px 20px;
          color: white;
          margin-top: -50px;
          position: relative;
          z-index: 3;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
        }
        .stat-item {
          transition: transform 0.3s;
        }
        .stat-item:hover {
          transform: scale(1.05);
        }
          

        /* Cards */
        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          padding: 20px 0;
        }
        .feature-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border-bottom: 5px solid transparent;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-bottom: 5px solid #F26522;
        }
        .icon-circle {
          width: 80px;
          height: 80px;
          background-color: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px auto 10px auto;
          color: #2e7d32;
          font-size: 2.5rem;
          transition: all 0.3s;
        }
        .feature-card:hover .icon-circle {
          background-color: #2e7d32;
          color: white;
        }

        /* Help Section */
        .help-card {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.05);
          border: 1px solid #eee;
          transition: all 0.3s;
          text-align: center;
        }
        .help-card:hover {
          border-color: #2E7D32;
          transform: translateY(-5px);
        }
        .outline-btn {
          margin-top: 20px;
          padding: 12px 25px;
          background: transparent;
          border: 2px solid #2E7D32;
          color: #2E7D32;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .outline-btn:hover {
          background: #2E7D32;
          color: white;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #1b5e20, #2e7d32);
          padding: 100px 20px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://www.transparenttextures.com/patterns/cubes.png');
          opacity: 0.1;
          pointer-events: none;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade">
          <span style={styles.badge}>Hope For Every Child</span>
          <h1 className="hero-title">Providing a Home, Not Just a Roof</h1>
          <p style={styles.heroSubtitle}>
            Over 20 million children in India are orphans. We are on a mission to ensure they receive love, education, and a family atmosphere, not just shelter.
          </p>
          <div style={styles.btnGroup}>
            <button onClick={scrollToDonate} className="btn btn-primary">Sponsor a Child</button>
            <Link to="/volunteer" style={{ textDecoration: 'none' }}>
              <button className="btn btn-secondary">Volunteer With Us</button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- STATISTICS SECTION --- */}
      <section className="stats-section animate-fade">
        <div style={styles.statsGrid}>
          <div className="stat-item">
            <h3 style={styles.statNumber}>1,200+</h3>
            <p style={styles.statLabel}>Children Supported</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>15</h3>
            <p style={styles.statLabel}>Partner Orphanages</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>85%</h3>
            <p style={styles.statLabel}>Academic Success</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>100%</h3>
            <p style={styles.statLabel}>Love & Care</p>
          </div>
        </div>
      </section>

      {/* --- OUR APPROACH --- */}
      <section style={styles.section}>
        <div style={styles.textCenter} className="animate-fade">
          <h2 style={styles.sectionTitle}>More Than Just Support</h2>
          <div style={styles.underline}></div>
          <p style={styles.sectionText}>We focus on holistic development, bridging the gap between institutional care and family life.</p>
        </div>

        <div className="card-container">
          {/* Card 1: Education */}
          <div className="feature-card">
            <div className="icon-circle">
              <FaBookReader />
            </div>
            <div style={styles.cardContent}>
              <h3>Education First</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>We provide after-school tuitions, school supplies, and digital literacy classes to ensure every child keeps up with their peers.</p>
            </div>
          </div>

          {/* Card 2: Nutrition */}
          <div className="feature-card">
            <div className="icon-circle">
              <FaUtensils />
            </div>
            <div style={styles.cardContent}>
              <h3>Nutrition & Health</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Regular health checkups and nutritious meal plans (like mid-day meals) to combat malnutrition and ensure physical well-being.</p>
            </div>
          </div>

          {/* Card 3: Emotional Support */}
          <div className="feature-card">
            <div className="icon-circle">
              <FaHeart />
            </div>
            <div style={styles.cardContent}>
              <h3>Emotional Well-being</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Counseling sessions and mentorship programs to help children heal from trauma and build confidence and self-esteem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW YOU CAN HELP --- */}
      <section style={{ ...styles.section, backgroundColor: '#fff' }}>
        <div style={styles.textCenter}>
          <h2 style={styles.sectionTitle}>How You Can Make a Difference</h2>
          <div style={styles.underline}></div>
        </div>

        <div className="card-container">
          <div className="help-card">
            <div style={styles.icon}><FaGift color="#FFC107" /></div>
            <h3>Celebrate with Us</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Celebrate your birthday by sponsoring a special meal for 50 children.</p>
            <button className="outline-btn">Sponsor a Meal</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><FaGraduationCap color="#2196F3" /></div>
            <h3>Educate a Child</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Cover the annual school fees and stationery for one child.</p>
            <button className="outline-btn">Sponsor Education</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><FaHandHoldingHeart color="#F26522" /></div>
            <h3>Donate Essentials</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Send clothes, books, or toys directly to our partner centers.</p>
            <button className="outline-btn">View Wishlist</button>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="cta-section">
        <h2 style={{ marginBottom: '30px', fontWeight: '800', fontSize: '2.5rem' }}>"We can't help everyone, but everyone can help someone."</h2>
        <div style={styles.btnGroup}>
          <Link to="/volunteer" className="btn btn-cta-primary" style={{ textDecoration: 'none' }}>
            Volunteer Now
          </Link>
          <Link to="/donate" className="btn btn-cta-secondary" style={{ textDecoration: 'none' }}>
            Donate Now
          </Link>
        </div>
      </section>

    </div>
  );
}

/* --- JS OBJECT STYLES (Used for structure, Classes used for visuals) --- */
const styles = {
  badge: {
    backgroundColor: "#F26522",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "15px",
    display: "inline-block",
    letterSpacing: "1px"
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    maxWidth: "700px",
    margin: "0 auto 40px auto",
    opacity: "0.95",
    lineHeight: "1.6",
    fontWeight: "300"
  },
  btnGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  statsGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "5px",
    color: "#FFEB3B", // Yellow contrast
  },
  statLabel: {
    fontSize: "1.1rem",
    opacity: 0.9,
    fontWeight: "500"
  },
  section: {
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    color: "#1a1a1a",
    marginBottom: "15px",
    fontWeight: "800",
  },
  sectionText: {
    fontSize: "1.15rem",
    color: "#555",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6"
  },
  underline: {
    width: "80px",
    height: "5px",
    backgroundColor: "#F26522",
    margin: "0 auto 20px auto",
    borderRadius: "10px"
  },
  cardContent: {
    padding: "0 30px 30px 30px",
    textAlign: "center",
  },
  icon: {
    fontSize: "3.5rem",
    marginBottom: "20px",
  }
};

export default OrphanageSupport;

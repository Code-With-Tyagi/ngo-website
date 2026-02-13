import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingMedical, FaUtensils, FaHeart, FaWheelchair, FaUserNurse, FaGlasses } from "react-icons/fa";
import elderImage from '../../assets/images/elderly/elder.png';

function ElderlyCare() {

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToDonate = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="elderly-container">
      {/* Internal CSS for Hover Effects & Animations */}
      <style>{`
        .elderly-container {
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
          /* Indian Elder Image */
          background-image:url(${elderImage});
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
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%);
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
          background-color: #10B981; /* Emerald Green */
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }
        .btn-primary:hover {
          background-color: #059669;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.6);
        }
        .btn-secondary {
          background-color: rgba(255,255,255,0.1);
          color: white;
          border: 2px solid white;
          backdrop-filter: blur(5px);
        }
        .btn-secondary:hover {
          background-color: white;
          color: #059669;
          transform: translateY(-3px);
        }

        /* CTA Specific Buttons */
        .btn-cta-primary {
          background-color: white;
          color: #065f46;
          margin-right: 15px;
        }
        .btn-cta-primary:hover {
          background-color: #ecfdf5;
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

        /* Stats Section - Theme Change to Green/Gold */
        .stats-section {
          background: linear-gradient(135deg, #059669, #047857);
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
          border-bottom: 5px solid #10B981;
        }
        .icon-circle {
          width: 80px;
          height: 80px;
          background-color: #ecfdf5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px auto 10px auto;
          color: #059669;
          font-size: 2.5rem;
          transition: all 0.3s;
        }
        .feature-card:hover .icon-circle {
          background-color: #059669;
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
          border-color: #10B981;
          transform: translateY(-5px);
        }
        .outline-btn {
          margin-top: 20px;
          padding: 12px 25px;
          background: transparent;
          border: 2px solid #10B981;
          color: #10B981;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .outline-btn:hover {
          background: #10B981;
          color: white;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #047857, #065f46);
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
          <span style={styles.badge}>Restoring Dignity</span>
          <h1 className="hero-title">Gray Hair is a Crown of Splendor</h1>
          <p style={styles.heroSubtitle}>
            Millions of elderly Indians face abandonment and loneliness. We provide them with a home, medical care, and the family they thought they had lost.
          </p>
          <div style={styles.btnGroup}>
            <button onClick={scrollToDonate} className="btn btn-primary">Share Your Love</button>
            <Link to="/volunteer" style={{ textDecoration: 'none' }}>
              <button className="btn btn-secondary">Join as a Volunteer</button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- STATISTICS SECTION --- */}
      <section className="stats-section animate-fade">
        <div style={styles.statsGrid}>
          <div className="stat-item">
            <h3 style={styles.statNumber}>18M+</h3>
            <p style={styles.statLabel}>Elders Live Alone</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>450+</h3>
            <p style={styles.statLabel}>Grandparents Rescued</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>100%</h3>
            <p style={styles.statLabel}>Medical Care</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>0</h3>
            <p style={styles.statLabel}>Cost to Residents</p>
          </div>
        </div>
      </section>

      {/* --- OUR APPROACH --- */}
      <section style={styles.section}>
        <div style={styles.textCenter} className="animate-fade">
          <h2 style={styles.sectionTitle}>Holistic Elderly Care</h2>
          <div style={styles.underline}></div>
          <p style={styles.sectionText}>We believe aging should be a celebration, not a burden. Our centers focus on physical health, mental peace, and social connection.</p>
        </div>

        <div className="card-container">
          {/* Card 1: Medical */}
          <div className="feature-card">
            <div className="icon-circle">
              <FaHandHoldingMedical />
            </div>
            <div style={styles.cardContent}>
              <h3>Medical Support</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>24/7 nursing staff, regular doctor visits, and free medicines for diabetes, blood pressure, and other age-related ailments.</p>
            </div>
          </div>

          {/* Card 2: Nutrition */}
          <div className="feature-card">
            <div className="icon-circle">
              <FaUtensils />
            </div>
            <div style={styles.cardContent}>
              <h3>Nutritious Meals</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Freshly cooked, easy-to-digest vegetarian meals prepared according to the dietary requirements of our elders.</p>
            </div>
          </div>

          {/* Card 3: Companionship */}
          <div className="feature-card">
            <div className="icon-circle">
              <FaHeart />
            </div>
            <div style={styles.cardContent}>
              <h3>Companionship</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Recreational activities like yoga, bhajans, and gardening to combat loneliness and depression.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW YOU CAN HELP --- */}
      <section style={{ ...styles.section, backgroundColor: '#fff' }}>
        <div style={styles.textCenter}>
          <h2 style={styles.sectionTitle}>Support Our Elders</h2>
          <div style={styles.underline}></div>
        </div>

        <div className="card-container">
          <div className="help-card">
            <div style={styles.icon}><FaUserNurse color="#F59E0B" /></div>
            <h3 style={{ color: '#D97706' }}>Sponsor Care</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Cover the monthly living expenses (food & shelter) for one grandparent.</p>
            <button className="outline-btn">Sponsor Monthly</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><FaGlasses color="#3B82F6" /></div>
            <h3 style={{ color: '#2563EB' }}>Restore Vision</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Sponsor a cataract surgery to help an elderly person see the world again.</p>
            <button className="outline-btn">Sponsor Surgery</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><FaWheelchair color="#EF4444" /></div>
            <h3 style={{ color: '#DC2626' }}>Mobility Aids</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Donate wheelchairs, walkers, or medical beds for bedridden elders.</p>
            <button className="outline-btn">Donate Equipment</button>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="cta-section">
        <h2 style={{ marginBottom: '30px', fontWeight: '800', fontSize: '2.5rem' }}>"Care for those who once cared for us."</h2>
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
    backgroundColor: "#10B981", // Emerald Green
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
    color: "#FCD34D", // Gold contrast
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
    backgroundColor: "#10B981",
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

export default ElderlyCare;
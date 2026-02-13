import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaWifi, FaMobileAlt, FaChalkboardTeacher, FaMousePointer, FaRocket } from "react-icons/fa";

function DigitalSupport() {

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToDonate = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="digital-container">
      {/* Internal CSS for Hover Effects & Animations */}
      <style>{`
        .digital-container {
          font-family: 'Inter', sans-serif;
          color: #333;
          background-color: #f8fafc; /* Very light blue-grey */
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
          /* Image: Tech Education */
          background-image: url('https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=1600');
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
          background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(15, 23, 42, 0.9) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 850px;
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
          background-color: #2563EB; /* Tech Blue */
          color: white;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
        }
        .btn-primary:hover {
          background-color: #1d4ed8;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.6);
        }
        .btn-secondary {
          background-color: rgba(255,255,255,0.1);
          color: white;
          border: 2px solid white;
          backdrop-filter: blur(5px);
        }
        .btn-secondary:hover {
          background-color: white;
          color: #2563EB;
          transform: translateY(-3px);
        }

        /* CTA Specific Buttons */
        .btn-cta-primary {
          background-color: white;
          color: #0f172a;
          margin-right: 15px;
        }
        .btn-cta-primary:hover {
          background-color: #f1f5f9;
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
          background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
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
          border-bottom: 5px solid #2563EB;
        }
        .icon-circle {
          width: 80px;
          height: 80px;
          background-color: #eff6ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px auto 10px auto;
          color: #2563EB;
          font-size: 2.5rem;
          transition: all 0.3s;
        }
        .feature-card:hover .icon-circle {
          background-color: #2563EB;
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
          border-color: #2563EB;
          transform: translateY(-5px);
        }
        .outline-btn {
          margin-top: 20px;
          padding: 12px 25px;
          background: transparent;
          border: 2px solid #2563EB;
          color: #2563EB;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .outline-btn:hover {
          background: #2563EB;
          color: white;
        }

        /* CTA Section - CUBE BACKGROUND APPLIED HERE */
        .cta-section {
          background: linear-gradient(135deg, #0f172a, #1e293b);
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
          /* UPDATED: Cubes Pattern */
          background: url('https://www.transparenttextures.com/patterns/cubes.png');
          opacity: 0.15; /* Adjusted opacity for better visibility */
          pointer-events: none;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade">
          <span style={styles.badge}>Digital India Mission</span>
          <h1 className="hero-title">Bridging the Digital Divide</h1>
          <p style={styles.heroSubtitle}>
            Technology is a right, not a privilege. We are empowering rural India by providing access to digital education, internet connectivity, and the skills to succeed in a modern world.
          </p>
          <div style={styles.btnGroup}>
            <button onClick={scrollToDonate} className="btn btn-primary">Donate Tech</button>
            <Link to="/volunteer" style={{ textDecoration: 'none' }}>
              <button className="btn btn-secondary">Become a mentor</button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- STATISTICS SECTION --- */}
      <section className="stats-section animate-fade">
        <div style={styles.statsGrid}>
          <div className="stat-item">
            <h3 style={styles.statNumber}>50+</h3>
            <p style={styles.statLabel}>Villages Connected</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>5,000+</h3>
            <p style={styles.statLabel}>Students Trained</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>1,200+</h3>
            <p style={styles.statLabel}>Laptops Distributed</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>40%</h3>
            <p style={styles.statLabel}>Women Empowered</p>
          </div>
        </div>
      </section>

      {/* --- OUR APPROACH --- */}
      <section style={styles.section}>
        <div style={styles.textCenter} className="animate-fade">
          <h2 style={styles.sectionTitle}>Connecting India, One Village at a Time</h2>
          <div style={styles.underline}></div>
          <p style={styles.sectionText}>We don't just donate computers; we build ecosystems. From infrastructure to education, we ensure technology creates real opportunities.</p>
        </div>

        <div className="card-container">
          <div className="feature-card">
            <div className="icon-circle">
              <FaChalkboardTeacher />
            </div>
            <div style={styles.cardContent}>
              <h3>Digital Classrooms</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Transforming rural schools with smart boards, tablets, and interactive learning software to make education engaging and modern.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="icon-circle">
              <FaMousePointer />
            </div>
            <div style={styles.cardContent}>
              <h3>Skill Development</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Teaching essential computer skills, coding, and basic internet usage to youth and elders to improve employability and daily life.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="icon-circle">
              <FaWifi />
            </div>
            <div style={styles.cardContent}>
              <h3>Internet for All</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Setting up community Wi-Fi zones and solar-powered computer labs in remote areas where electricity is scarce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW YOU CAN HELP --- */}
      <section style={{ ...styles.section, backgroundColor: '#fff' }}>
        <div style={styles.textCenter}>
          <h2 style={styles.sectionTitle}>Empower a Future</h2>
          <div style={styles.underline}></div>
        </div>

        <div className="card-container">
          <div className="help-card">
            <div style={styles.icon}><FaLaptop color="#2563EB" /></div>
            <h3 style={{ color: '#1e3a8a' }}>Donate Old Tech</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Your old laptop or tablet can be a new beginning for a student. We refurbish and distribute used devices.</p>
            <button className="outline-btn">Donate Device</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><FaMobileAlt color="#F97316" /></div>
            <h3 style={{ color: '#c2410c' }}>Sponsor Data</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Sponsor a year of high-speed internet for a rural digital center or a student's online classes.</p>
            <button className="outline-btn">Sponsor Internet</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><FaRocket color="#10B981" /></div>
            <h3 style={{ color: '#047857' }}>Fund a Lab</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>Help us build a fully equipped computer lab in a government school. Naming rights available.</p>
            <button className="outline-btn">Build a Lab</button>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="cta-section">
        <h2 style={{ marginBottom: '30px', fontWeight: '800', fontSize: '2.5rem' }}>"Knowledge is power. Digital access is the key."</h2>
        <div style={styles.btnGroup}>
          <Link to="/volunteer" className="btn btn-cta-primary" style={{ textDecoration: 'none' }}>
            Join as Tech Volunteer
          </Link>
          <Link to="/donate" className="btn btn-cta-secondary" style={{ textDecoration: 'none' }}>
            Donate Funds
          </Link>
        </div>
      </section>

    </div>
  );
}

/* --- JS OBJECT STYLES --- */
const styles = {
  badge: {
    backgroundColor: "#2563EB", // Tech Blue
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
    maxWidth: "750px",
    margin: "0 auto 40px auto",
    opacity: "0.9",
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
    color: "#93c5fd", // Light Blue contrast
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
    backgroundColor: "#2563EB",
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
export default DigitalSupport;
import React, { useEffect } from "react";
import { HeartHandshake, Sunrise, ScrollText, Users, Phone, MapPin, HandHeart, Flower2, Flame } from 'lucide-react';

const DignifiedRitesPage = () => {

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSupport = () => {
    const section = document.getElementById('support-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dignified-container">
      {/* Internal CSS for Hover Effects & Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:wght@400;700&display=swap');

        .dignified-container {
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
          height: 98.7vh;
          /* Peaceful river/sunset background */
          background-image: url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop');
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
          background: linear-gradient(180deg, rgba(26, 37, 47, 0.4) 0%, rgba(26, 37, 47, 0.85) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          padding: 20px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 700;
          margin: 20px 0;
          line-height: 1.1;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        /* Buttons */
        .btn {
          padding: 15px 35px;
          font-size: 1.1rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .btn-primary {
          background-color: #d4af37; /* Gold */
          color: #1a252f;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }
        .btn-primary:hover {
          background-color: #bfa140;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.6);
        }
        .btn-secondary {
          background-color: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.5);
          backdrop-filter: blur(5px);
        }
        .btn-secondary:hover {
          background-color: white;
          color: #1a252f;
          transform: translateY(-3px);
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #1a252f, #2c3e50); /* Navy Gradient */
          padding: 60px 20px;
          color: white;
          margin-top: -60px; /* Overlap effect */
          position: relative;
          z-index: 3;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.15);
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
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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
          text-align: center;
          padding-bottom: 30px;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-bottom: 5px solid #d4af37; /* Gold border on hover */
        }
        .icon-circle {
          width: 80px;
          height: 80px;
          background-color: #fcfbf9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 40px auto 20px auto;
          color: #1a252f;
          transition: all 0.3s;
          border: 1px solid #eee;
        }
        .feature-card:hover .icon-circle {
          background-color: #1a252f;
          color: #d4af37;
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
          border-color: #d4af37;
          transform: translateY(-5px);
        }
        .outline-btn {
          margin-top: 20px;
          padding: 12px 25px;
          background: transparent;
          border: 2px solid #1a252f;
          color: #1a252f;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .outline-btn:hover {
          background: #1a252f;
          color: #d4af37;
          border-color: #1a252f;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #1a252f, #141b21);
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
          opacity: 0.05;
          pointer-events: none;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade">
          <span style={styles.badge}>A Humanitarian Initiative</span>
          <h1 className="hero-title">No One Should Leave This World Alone</h1>
          <p style={styles.heroSubtitle}>
            We perform last rites for the unclaimed, unidentified, and destitute. 
            Because dignity in death is a fundamental human right, not a privilege.
          </p>
          <div style={styles.btnGroup}>
            <button onClick={scrollToSupport} className="btn btn-primary">
              <HeartHandshake size={20} /> Support a Rite
            </button>
            <button className="btn btn-secondary">
              <Users size={20} /> Volunteer
            </button>
          </div>
        </div>
      </header>

      {/* --- STATISTICS SECTION --- */}
      <section className="stats-section animate-fade">
        <div style={styles.statsGrid}>
          <div className="stat-item">
            <h3 style={styles.statNumber}>3,500+</h3>
            <p style={styles.statLabel}>Rites Performed</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>24/7</h3>
            <p style={styles.statLabel}>Helpline Active</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>12</h3>
            <p style={styles.statLabel}>Cities Covered</p>
          </div>
          <div className="stat-item">
            <h3 style={styles.statNumber}>100%</h3>
            <p style={styles.statLabel}>Free Service</p>
          </div>
        </div>
      </section>

      {/* --- OUR PROCESS --- */}
      <section style={styles.section}>
        <div style={styles.textCenter} className="animate-fade">
          <h2 style={styles.sectionTitle}>The Journey of Dignity</h2>
          <div style={styles.underline}></div>
          <p style={styles.sectionText}>
            We step in as family when there is no one else. We ensure every step is handled with legal compliance and deep respect.
          </p>
        </div>

        <div className="card-container">
          {/* Card 1: Notification */}
          <div className="feature-card">
            <div className="icon-circle">
              <Phone size={36} strokeWidth={1.5} />
            </div>
            <div style={styles.cardContent}>
              <h3>1. Notification</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>
                We receive alerts from police and hospitals. We handle all legal paperwork and verification to ensure the body is truly unclaimed before custody.
              </p>
            </div>
          </div>

          {/* Card 2: The Farewell */}
          <div className="feature-card">
            <div className="icon-circle">
              <Users size={36} strokeWidth={1.5} />
            </div>
            <div style={styles.cardContent}>
              <h3>2. The Farewell</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>
                Our volunteers shoulder the bier. We provide the cloth, flowers, and essential items, standing as the grieving family during the procession.
              </p>
            </div>
          </div>

          {/* Card 3: Final Peace */}
          <div className="feature-card">
            <div className="icon-circle">
              <Sunrise size={36} strokeWidth={1.5} />
            </div>
            <div style={styles.cardContent}>
              <h3>3. Final Rites</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>
                Whether cremation or burial, rites are performed with full honors. Prayers are offered, and ashes are immersed respectfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW YOU CAN HELP --- */}
      <section id="support-section" style={{ ...styles.section, backgroundColor: '#fff' }}>
        <div style={styles.textCenter}>
          <h2 style={styles.sectionTitle}>How You Can Help</h2>
          <div style={styles.underline}></div>
          <p style={styles.sectionText}>We rely entirely on the kindness of strangers. Your support ensures the fire of dignity never goes out.</p>
        </div>

        <div className="card-container">
          <div className="help-card">
            <div style={styles.icon}><Flame size={50} color="#d4af37" /></div>
            <h3>Sponsor a Rite</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>
              Cover the cost of wood, cloth, and materials for one complete funeral service.
            </p>
            <button className="outline-btn">Donate Full Rite</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><Flower2 size={50} color="#1a252f" /></div>
            <h3>Floral Tribute</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>
              Contribute towards garlands and flowers to honor the departed soul.
            </p>
            <button className="outline-btn">Donate Flowers</button>
          </div>

          <div className="help-card">
            <div style={styles.icon}><HandHeart size={50} color="#d4af37" /></div>
            <h3>Donate Essentials</h3>
            <p style={{ color: '#666', margin: '15px 0' }}>
              We need white cloth, stretchers, and ambulance fuel support.
            </p>
            <button className="outline-btn">View Needs List</button>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="cta-section">
        <ScrollText size={50} color="#d4af37" style={{ marginBottom: '20px', opacity: 0.8 }} />
        <h2 style={{ marginBottom: '30px', fontWeight: '700', fontFamily: 'Playfair Display, serif', fontSize: '2.5rem' }}>
          "Service to the departed is a service to humanity itself."
        </h2>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ backgroundColor: '#fff', color: '#1a252f' }}>
            Join Our Mission
          </button>
          <button className="btn btn-secondary" style={{ borderColor: '#d4af37', color: '#d4af37' }}>
            Contact Us
          </button>
        </div>
      </section>

    </div>
  );
}

/* --- JS OBJECT STYLES (Used for structure/constants) --- */
const styles = {
  badge: {
    backgroundColor: "#d4af37", // Gold
    color: "#1a252f", // Navy Text
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "20px",
    display: "inline-block",
    letterSpacing: "2px"
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    maxWidth: "700px",
    margin: "0 auto 40px auto",
    opacity: "0.9",
    lineHeight: "1.6",
    fontWeight: "300",
    color: "#f1f1f1"
  },
  btnGroup: {
    display: "flex",
    gap: "20px",
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
    fontSize: "3.5rem",
    fontWeight: "700",
    marginBottom: "5px",
    color: "#d4af37", // Gold stats
    fontFamily: "Playfair Display, serif"
  },
  statLabel: {
    fontSize: "1rem",
    opacity: 0.8,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  section: {
    padding: "100px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "70px",
  },
  sectionTitle: {
    fontSize: "2.8rem",
    color: "#1a252f",
    marginBottom: "20px",
    fontWeight: "700",
    fontFamily: "Playfair Display, serif"
  },
  sectionText: {
    fontSize: "1.2rem",
    color: "#555",
    maxWidth: "750px",
    margin: "0 auto",
    lineHeight: "1.7"
  },
  underline: {
    width: "60px",
    height: "4px",
    backgroundColor: "#d4af37",
    margin: "0 auto 25px auto",
  },
  cardContent: {
    padding: "0 30px 0 30px",
    textAlign: "center",
  },
  icon: {
    marginBottom: "20px",
  }
};

export default DignifiedRitesPage;
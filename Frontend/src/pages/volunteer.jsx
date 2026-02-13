import React, { useState, useEffect } from "react";
// If you are using react-router-dom:
import { Link } from "react-router-dom";

// --- CONSTANTS ---
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

const INTEREST_AREAS = [
  "Orphanage Support", "Elderly Care", "Digital Literacy", "Fundraising",
  "Field Work", "Content / Social Media"
];

// --- STYLES OBJECT ---
const styles = {
  container: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#333",
    lineHeight: "1.6",
    backgroundColor: "#fff",
  },
  // HERO
  hero: {
    position: "relative",
    height: "90vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "900px",
    padding: "20px",
  },
  badge: {
    backgroundColor: "#ff9800",
    color: "#000",
    padding: "5px 15px",
    borderRadius: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.85rem",
    marginBottom: "15px",
    display: "inline-block",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "800",
    margin: "10px 0 20px 0",
    lineHeight: "1.2",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    maxWidth: "700px",
    margin: "0 auto 30px auto",
    opacity: "0.9",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#2e7d32",
    color: "white",
    padding: "15px 35px",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "50px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(46, 125, 50, 0.4)",
    transition: "transform 0.2s",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    padding: "15px 35px",
    fontSize: "1.1rem",
    borderRadius: "50px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  // COMMON SECTIONS
  section: {
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  textCenter: {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 50px auto",
  },
  sectionTitle: {
    fontSize: "2.2rem",
    color: "#1a1a1a",
    marginBottom: "15px",
    fontWeight: "700",
  },
  sectionText: {
    fontSize: "1.1rem",
    color: "#666",
  },
  separator: {
    width: "80px",
    height: "4px",
    backgroundColor: "#2e7d32",
    margin: "15px auto",
    borderRadius: "2px",
  },
  processGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "40px",
  },
  featureCard: {
    flex: "1 1 220px",
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    border: "1px solid #eee",
  },
  featureIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    display: "inline-block",
  },
  // OPPORTUNITY SECTION
  oppSection: {
    padding: "80px 20px",
    backgroundColor: "#f9f9f9", // Slight grey contrast
    // Using a container max-width directly in the grid style below
  },
  oppTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#0B1C33",
    marginBottom: "10px",
  },
  underline: {
    width: "60px",
    height: "4px",
    background: "linear-gradient(90deg, #F26522, #4CAF50)",
    margin: "0 auto 15px auto",
    borderRadius: "2px",
  },
  oppSubtitle: {
    color: "#777",
    fontSize: "1.1rem",
  },
  oppGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1300px",
    margin: "0 auto",
  },
  oppCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px 25px",
    borderLeft: "5px solid #F26522",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "280px",
    position: "relative",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#0B1C33",
    marginBottom: "15px",
  },
  cardDesc: {
    color: "#555",
    fontSize: "0.95rem",
    marginBottom: "25px",
    lineHeight: "1.6",
    flexGrow: 1,
  },
  cardMeta: {
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  pinIcon: { color: "#E91E63", fontSize: "1rem" },
  clockIcon: { color: "#555", fontSize: "1rem" },
  metaText: { fontSize: "0.9rem", color: "#666" },
  // FORM STYLING
  formSection: {
    backgroundImage: "linear-gradient(rgba(20, 80, 40, 0.85), rgba(10, 50, 20, 0.9)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    padding: "100px 20px",
    display: "flex",
    justifyContent: "center",
  },
  formWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    maxWidth: "850px",
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  formHeader: {
    backgroundColor: "#f1f8e9",
    padding: "40px 30px",
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
  },
  form: {
    padding: "40px",
  },
  fieldSet: {
    borderBottom: "1px solid #eee",
    paddingBottom: "30px",
    marginBottom: "30px",
  },
  sectionHeader: {
    color: "#2e7d32",
    fontSize: "1.3rem",
    marginBottom: "20px",
    borderLeft: "4px solid #ff9800",
    paddingLeft: "15px",
    fontWeight: "700",
  },
  row: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "15px",
  },
  inputGroup: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
    display: "block",
  },
  input: {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#fff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  select: {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#fff",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#fff",
    minHeight: "100px",
    resize: "vertical",
    width: "100%",
    boxSizing: "border-box",
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "10px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.95rem",
    cursor: "pointer",
    color: "#444",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    marginRight: "10px",
    cursor: "pointer",
    accentColor: "#2e7d32",
  },
  errorMsg: {
    color: "#d32f2f",
    fontSize: "0.8rem",
    marginTop: "5px",
    fontWeight: "500",
  },
  submitBtn: {
    width: "100%",
    padding: "18px",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 4px 6px rgba(46, 125, 50, 0.2)",
    transition: "background 0.3s, transform 0.2s",
  },
  successBox: {
    padding: "80px 20px",
    textAlign: "center",
  },
  checkIcon: {
    fontSize: "5rem",
    color: "#2e7d32",
    marginBottom: "20px",
  },
  faqTitle: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "50px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  faqGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  faqItem: {
    backgroundColor: "#fafafa",
    padding: "30px",
    borderRadius: "12px",
    borderLeft: "5px solid #2e7d32",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  }
};

function Volunteer() {
  // --- FORM STATE ---
  const INITIAL_FORM_DATA = {
    fullName: "", email: "", phone: "", dob: "", gender: "", city: "", state: "",
    interests: [], mode: "", availability: "", duration: "",
    education: "", occupation: "", skills: "", experience: "",
    idType: "", idNumber: "", idImage: null, emergencyName: "", emergencyPhone: "", bgCheck: false,
    motivation: "", declaration: false
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Auto-dismiss success message
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setFormData(INITIAL_FORM_DATA);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files && files.length > 0 ? files[0] : null;
      setFormData({ ...formData, [name]: file });
    } else if (type === "checkbox" && name === "interests") {
      let updatedInterests = [...formData.interests];
      if (checked) {
        updatedInterests.push(value);
      } else {
        updatedInterests = updatedInterests.filter((item) => item !== value);
      }
      setFormData({ ...formData, interests: updatedInterests });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name] || errors.submit) {
      setErrors({ ...errors, [name]: "", submit: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Invalid email address";
    if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = "Enter a valid 10-digit number";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (formData.interests.length === 0) newErrors.interests = "Select at least one area of interest";
    if (!formData.motivation.trim()) newErrors.motivation = "Please tell us why you want to join";
    if (!formData.idType) newErrors.idType = "ID Type is required";
    if (!formData.idNumber.trim()) newErrors.idNumber = "ID Number is required";
    if (!formData.declaration) newErrors.declaration = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Simulation of API Call
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setSubmitted(true);
        document.getElementById("apply-form").scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        setErrors({ submit: "Network error. Please try again." });
      }
    } else {
      document.getElementById("apply-form").scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToForm = () => {
    document.getElementById("apply-form").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.container}>
      {/* --- CSS INJECTION FOR ANIMATIONS --- */}
      <style>{`
        /* Fade Up Entrance */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Pulse for Icons */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        /* --- FEATURE CARDS --- */
        .feature-card {
          animation: fadeInUp 0.8s ease-out forwards;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(46, 125, 50, 0.15) !important;
          border-color: #2e7d32 !important;
        }
        .feature-card:hover .feature-icon {
          animation: pulse 1s infinite;
        }

        /* --- OPPORTUNITY CARDS (Enhanced) --- */
        .opp-card {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0; /* Hidden initially */
          transition: all 0.4s ease;
        }
        
        /* Staggered Delays for 4 cards */
        .opp-card:nth-child(1) { animation-delay: 0.1s; }
        .opp-card:nth-child(2) { animation-delay: 0.3s; }
        .opp-card:nth-child(3) { animation-delay: 0.5s; }
        .opp-card:nth-child(4) { animation-delay: 0.7s; }

        .opp-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
          border-left-color: #2e7d32 !important; /* Switch from Orange to Green on hover */
        }
        
        /* Button Hovers */
        .primary-btn:hover {
           background-color: #1b5e20 !important;
           transform: translateY(-2px);
           box-shadow: 0 8px 25px rgba(46, 125, 50, 0.5) !important;
        }
        .secondary-btn:hover {
           background-color: rgba(255,255,255,0.15) !important;
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <span style={styles.badge}>Join the Movement</span>
          <h1 style={styles.heroTitle}>Your Time Can Rewrite Someone's Destiny</h1>
          <p style={styles.heroSubtitle}>
            We don't just need your money. We need your heart, your skills, and your voice.
            Join 5,000+ changemakers across India.
          </p>
          <div style={styles.btnGroup}>
            <button onClick={scrollToForm} style={styles.primaryBtn} className="primary-btn">
              Become a Volunteer
            </button>
            <button style={styles.secondaryBtn} className="secondary-btn">
              Watch Our Story ▷
            </button>
          </div>
        </div>
      </section>

      {/* WHY VOLUNTEER SECTION */}
      <section style={styles.section}>
        <div style={styles.textCenter}>
          <h2 style={styles.sectionTitle}>Why Volunteer With Us?</h2>
          <p style={styles.sectionText}>It’s not just about giving back; it’s about growing together.</p>
          <div style={styles.separator}></div>
        </div>

        <div style={styles.processGrid}>
          <div style={styles.featureCard} className="feature-card">
            <div style={styles.featureIcon} className="feature-icon">❤️</div>
            <h3>Real Impact</h3>
            <p style={{marginTop: '10px', color: '#666'}}>See the direct result of your work in the smiles of the children.</p>
          </div>
          <div style={styles.featureCard} className="feature-card">
            <div style={styles.featureIcon} className="feature-icon">🤝</div>
            <h3>Community</h3>
            <p style={{marginTop: '10px', color: '#666'}}>Network with a passionate family of over 5,000 like-minded changemakers.</p>
          </div>
          <div style={styles.featureCard} className="feature-card">
            <div style={styles.featureIcon} className="feature-icon">🚀</div>
            <h3>Growth</h3>
            <p style={{marginTop: '10px', color: '#666'}}>Develop leadership, empathy, and professional management skills.</p>
          </div>
          <div style={styles.featureCard} className="feature-card">
            <div style={styles.featureIcon} className="feature-icon">📜</div>
            <h3>Recognition</h3>
            <p style={{marginTop: '10px', color: '#666'}}>Receive official certificates and letters of recommendation.</p>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <section style={styles.oppSection}>
        <div style={styles.textCenter}>
          <h2 style={styles.oppTitle}>Volunteer Opportunities</h2>
          <div style={styles.underline}></div>
          <p style={styles.oppSubtitle}>Find the right fit for you</p>
        </div>

        <div style={styles.oppGrid}>
          {/* Card 1 */}
          <div style={styles.oppCard} className="opp-card">
            <div>
                <h3 style={styles.cardTitle}>Field Volunteers</h3>
                <p style={styles.cardDesc}>Work directly with communities in our project locations to drive change.</p>
            </div>
            <div style={styles.cardMeta}>
              <div style={styles.metaRow}><span style={styles.pinIcon}>📍</span> <span style={styles.metaText}>International</span></div>
              <div style={styles.metaRow}><span style={styles.clockIcon}>⏱️</span> <span style={styles.metaText}>2-12 weeks</span></div>
            </div>
          </div>
          {/* Card 2 */}
          <div style={styles.oppCard} className="opp-card">
            <div>
                <h3 style={styles.cardTitle}>Skills-Based</h3>
                <p style={styles.cardDesc}>Contribute your professional expertise (Tech, Legal, Medical) remotely.</p>
            </div>
            <div style={styles.cardMeta}>
              <div style={styles.metaRow}><span style={styles.pinIcon}>📍</span> <span style={styles.metaText}>Remote</span></div>
              <div style={styles.metaRow}><span style={styles.clockIcon}>⏱️</span> <span style={styles.metaText}>Flexible</span></div>
            </div>
          </div>
          {/* Card 3 */}
          <div style={styles.oppCard} className="opp-card">
            <div>
                <h3 style={styles.cardTitle}>Event Volunteers</h3>
                <p style={styles.cardDesc}>Help organize and manage large scale fundraising and awareness events.</p>
            </div>
            <div style={styles.cardMeta}>
              <div style={styles.metaRow}><span style={styles.pinIcon}>📍</span> <span style={styles.metaText}>Local</span></div>
              <div style={styles.metaRow}><span style={styles.clockIcon}>⏱️</span> <span style={styles.metaText}>Occasional</span></div>
            </div>
          </div>
          {/* Card 4 */}
          <div style={styles.oppCard} className="opp-card">
             <div>
                <h3 style={styles.cardTitle}>Campus Ambassador</h3>
                <p style={styles.cardDesc}>Represent HopeWorks at your school or university and build chapters.</p>
             </div>
            <div style={styles.cardMeta}>
              <div style={styles.metaRow}><span style={styles.pinIcon}>📍</span> <span style={styles.metaText}>Local</span></div>
              <div style={styles.metaRow}><span style={styles.clockIcon}>⏱️</span> <span style={styles.metaText}>5+ hours/month</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- APPLICATION FORM --- */}
      <section id="apply-form" style={styles.formSection}>
        <div style={styles.formWrapper}>
          <div style={styles.formHeader}>
            <h2 style={{margin: 0, color: '#2e7d32'}}>Volunteer Registration</h2>
            <p style={{margin: '10px 0 0', color: '#666'}}>Join the force of good. Please fill out the details below.</p>
          </div>

          {!submitted ? (
            <form style={styles.form} onSubmit={handleSubmit} noValidate>

              {/* SECTION 1: PERSONAL INFORMATION */}
              <div style={styles.fieldSet}>
                <h3 style={styles.sectionHeader}>1. Personal Information</h3>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Full Name *</label>
                    <input style={{ ...styles.input, borderColor: errors.fullName ? 'red' : '#ddd' }}
                      name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" />
                    {errors.fullName && <span style={styles.errorMsg}>{errors.fullName}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Date of Birth *</label>
                    <input style={{ ...styles.input, borderColor: errors.dob ? 'red' : '#ddd' }}
                      type="date" name="dob" value={formData.dob} onChange={handleChange} />
                    {errors.dob && <span style={styles.errorMsg}>{errors.dob}</span>}
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email Address *</label>
                    <input style={{ ...styles.input, borderColor: errors.email ? 'red' : '#ddd' }}
                      type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@example.com" />
                    {errors.email && <span style={styles.errorMsg}>{errors.email}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Phone Number *</label>
                    <input style={{ ...styles.input, borderColor: errors.phone ? 'red' : '#ddd' }}
                      type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="98765*****" maxLength="10" />
                    {errors.phone && <span style={styles.errorMsg}>{errors.phone}</span>}
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>City *</label>
                    <input style={{ ...styles.input, borderColor: errors.city ? 'red' : '#ddd' }}
                      name="city" value={formData.city} onChange={handleChange} placeholder="Current City" />
                    {errors.city && <span style={styles.errorMsg}>{errors.city}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>State *</label>
                    <select style={{ ...styles.select, borderColor: errors.state ? 'red' : '#ddd' }}
                      name="state" value={formData.state} onChange={handleChange}>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                    {errors.state && <span style={styles.errorMsg}>{errors.state}</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: PREFERENCES */}
              <div style={styles.fieldSet}>
                <h3 style={styles.sectionHeader}>2. Volunteer Preferences</h3>
                <label style={styles.label}>Area of Interest (Select all that apply) *</label>
                <div style={styles.checkboxGrid}>
                  {INTEREST_AREAS.map((area) => (
                    <label key={area} style={styles.checkboxLabel}>
                      <input type="checkbox" name="interests" value={area}
                        checked={formData.interests.includes(area)} onChange={handleChange} style={styles.checkbox} />
                      {area}
                    </label>
                  ))}
                </div>
                {errors.interests && <span style={styles.errorMsg}>{errors.interests}</span>}
                <br />
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Preferred Mode</label>
                    <select style={styles.select} name="mode" value={formData.mode} onChange={handleChange}>
                      <option value="">Select Mode</option>
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Availability</label>
                    <select style={styles.select} name="availability" value={formData.availability} onChange={handleChange}>
                      <option value="">Select Availability</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: SKILLS & EXPERIENCE */}
              <div style={styles.fieldSet}>
                <h3 style={styles.sectionHeader}>3. Skills & Experience</h3>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Current Occupation</label>
                    <input style={styles.input} name="occupation" value={formData.occupation} onChange={handleChange} placeholder="e.g. Student, Engineer" />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Highest Education</label>
                    <select style={styles.select} name="education" value={formData.education} onChange={handleChange}>
                      <option value="">Select Education</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Relevant Skills (comma separated)</label>
                  <input style={styles.input} name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Photography, Teaching, Coding" />
                </div>
              </div>

              {/* SECTION 4: SAFETY & VERIFICATION */}
              <div style={styles.fieldSet}>
                <h3 style={styles.sectionHeader}>4. Safety & Verification</h3>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>ID Type *</label>
                    <select style={{ ...styles.select, borderColor: errors.idType ? 'red' : '#ddd' }}
                      name="idType" value={formData.idType} onChange={handleChange}>
                      <option value="">Select ID Type</option>
                      <option value="Aadhaar">Aadhaar Card</option>
                      <option value="PAN">PAN Card</option>
                      <option value="Passport">Passport</option>
                      <option value="VoterID">Voter ID</option>
                    </select>
                    {errors.idType && <span style={styles.errorMsg}>{errors.idType}</span>}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>ID Number *</label>
                    <input style={{ ...styles.input, borderColor: errors.idNumber ? 'red' : '#ddd' }}
                      name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" />
                    {errors.idNumber && <span style={styles.errorMsg}>{errors.idNumber}</span>}
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Upload ID Proof (Image/PDF)</label>
                    <input type="file" name="idImage" accept="image/*,application/pdf" onChange={handleChange}
                      style={{ ...styles.input, paddingTop: '10px' }} />
                    <small style={{ color: '#666', marginTop: '5px', fontSize: '0.8rem' }}>Max size: 5MB. Formats: JPG, PNG, PDF.</small>
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Emergency Contact Name</label>
                    <input style={styles.input} name="emergencyName" value={formData.emergencyName} onChange={handleChange} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Emergency Contact Phone</label>
                    <input style={styles.input} name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} />
                  </div>
                </div>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" name="bgCheck" checked={formData.bgCheck} onChange={handleChange} style={styles.checkbox} />
                  I am willing to undergo background verification.
                </label>
              </div>

              {/* SECTION 5: MOTIVATION */}
              <div style={{ ...styles.fieldSet, borderBottom: 'none' }}>
                <h3 style={styles.sectionHeader}>5. Motivation & Agreement</h3>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Why do you want to volunteer? *</label>
                  <textarea style={{ ...styles.textarea, borderColor: errors.motivation ? 'red' : '#ddd' }}
                    name="motivation" value={formData.motivation} onChange={handleChange} rows="3" placeholder="Tell us about your motivation..."></textarea>
                  {errors.motivation && <span style={styles.errorMsg}>{errors.motivation}</span>}
                </div>
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '5px' }}>
                  <label style={{ ...styles.checkboxLabel, fontWeight: '600' }}>
                    <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} style={styles.checkbox} />
                    I confirm that the information provided is true and I agree to follow the NGO guidelines. *
                  </label>
                  {errors.declaration && <span style={styles.errorMsg}>{errors.declaration}</span>}
                </div>
              </div>

              <button type="submit" style={styles.submitBtn} className="primary-btn">Submit Application</button>
              {errors.submit && <div style={{ ...styles.errorMsg, marginTop: "10px", textAlign: 'center' }}>{errors.submit}</div>}
            </form>
          ) : (
            <div style={styles.successBox}>
              <div style={styles.checkIcon}>✓</div>
              <h3 style={{fontSize: '2rem', marginBottom: '10px'}}>Application Received!</h3>
              <p style={{fontSize: '1.1rem', color: '#555'}}>Thank you, {formData.fullName}. Your Volunteer ID is <strong>#VOL-{Math.floor(Math.random() * 10000)}</strong>.</p>
              <p style={{color: '#777'}}>We will contact you at {formData.email} within 48 hours.</p>
              <button onClick={() => setSubmitted(false)} style={{...styles.secondaryBtn, borderColor: '#2e7d32', color: '#2e7d32', marginTop: '20px'}}>Submit Another</button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={styles.section}>
        <h3 style={styles.faqTitle}>Frequently Asked Questions</h3>
        <div style={styles.faqGrid}>
          <div style={styles.faqItem}>
            <h4>❓ Do I need prior experience?</h4>
            <p style={{marginTop:'5px', color:'#666'}}>No! We provide a simple orientation training for all new volunteers.</p>
          </div>
          <div style={styles.faqItem}>
            <h4>❓ Can I volunteer remotely?</h4>
            <p style={{marginTop:'5px', color:'#666'}}>Yes, the "Skills-Based" program is designed specifically for remote work.</p>
          </div>
          <div style={styles.faqItem}>
            <h4>❓ What is the minimum time commitment?</h4>
            <p style={{marginTop:'5px', color:'#666'}}>It depends on the role, ranging from occasional events to 2-12 weeks for field work.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Volunteer;
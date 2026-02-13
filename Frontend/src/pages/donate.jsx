import React, { useState } from "react";
import { FaHeart, FaShieldAlt, FaRupeeSign, FaCheckCircle, FaLock } from "react-icons/fa";
import { MdChildCare, MdElderly, MdComputer } from "react-icons/md";

import elderImage from "../assets/images/elderly/elder.png";

const Donate = () => {
  const [activeCause, setActiveCause] = useState("orphanage");
  const [amount, setAmount] = useState(3000); // Default selection
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");

  // --- CONFIGURATION ---
  const causeData = {
    orphanage: {
      id: "orphanage",
      label: "Orphanage Support",
      icon: <MdChildCare />,
      color: "#F59E0B", // Amber
      darkColor: "#B45309",
      bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070",
      quote: "Every child deserves a childhood. Be the family they never had.",
      presets: [
        { val: 500, label: "Meals", desc: "1 week of nutrition" },
        { val: 1500, label: "School Kit", desc: "Books & Uniform" },
        { val: 3000, label: "Full Care", desc: "1 Month Shelter & Food" },
        { val: 10000, label: "Education", desc: "1 Year School Fees" },
      ]
    },
    elderly: {
      id: "elderly",
      label: "Elderly Care",
      icon: <MdElderly />,
      color: "#10B981", // Emerald
      darkColor: "#047857",
      bgImage: elderImage,
      quote: "Gray hair is a crown of splendor. Help us protect our elders.",
      presets: [
        { val: 800, label: "Medicine", desc: "Diabetes/BP Meds" },
        { val: 2000, label: "Rations", desc: "Grocery Kit for 1 Month" },
        { val: 5000, label: "Comfort", desc: "Medical Bed Support" },
        { val: 7500, label: "Vision", desc: "Cataract Surgery" },
      ]
    },
    digital: {
      id: "digital",
      label: "Digital India",
      icon: <MdComputer />,
      color: "#3B82F6", // Blue
      darkColor: "#1D4ED8",
      bgImage: "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=1600",
      quote: "Knowledge is power. Empower rural India with digital literacy.",
      presets: [
        { val: 500, label: "Data", desc: "Internet for Learning" },
        { val: 2500, label: "Tablet", desc: "Device Contribution" },
        { val: 6000, label: "Training", desc: "6-Month Coding Course" },
        { val: 15000, label: "Hardware", desc: "Setup 1 Desktop PC" },
      ]
    }
  };

  const current = causeData[activeCause];
  const finalAmount = customAmount || amount;

  const handleDonate = (e) => {
    e.preventDefault();
    if (!finalAmount) return alert("Please enter an amount");
    alert(`Thank you! Proceeding to payment of ₹${finalAmount} for ${current.label}.`);
  };

  return (
    <div className="donate-page">
      {/* --- INJECTED STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
          --theme-color: ${current.color};
          --theme-dark: ${current.darkColor};
        }

        .donate-page {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          overflow: hidden;
          color: #333;
        }

        /* DYNAMIC BACKGROUND */
        .bg-layer {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: url('${current.bgImage}');
          background-size: cover;
          background-position: center;
          transition: background-image 0.5s ease-in-out;
          z-index: 0;
        }
        .bg-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%);
          z-index: 1;
        }

        /* MAIN CONTENT GRID */
        .donate-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: flex-start;
        }

        /* LEFT COLUMN: TEXT */
        .text-col {
          color: white;
          padding-top: 40px;
        }
        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(5px);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 25px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .main-heading {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .quote-box {
          font-size: 1.2rem;
          line-height: 1.6;
          opacity: 0.9;
          border-left: 4px solid var(--theme-color);
          padding-left: 20px;
          margin-bottom: 40px;
        }
        .impact-stats {
          display: flex;
          gap: 40px;
        }
        .stat h3 { font-size: 2rem; margin: 0; color: var(--theme-color); }
        .stat p { margin: 0; opacity: 0.7; font-size: 0.9rem; }

        /* RIGHT COLUMN: CARD */
        .donate-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          padding: 30px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255,255,255,0.8);
          animation: slideUp 0.6s ease-out;
        }

        /* TABS */
        .tabs-wrapper {
          display: flex;
          background: #f1f5f9;
          padding: 5px;
          border-radius: 15px;
          margin-bottom: 25px;
        }
        .tab-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          color: #64748b;
          border-radius: 12px;
          transition: all 0.3s;
        }
        .tab-item.active {
          background: white;
          color: var(--theme-dark);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        /* FREQUENCY */
        .freq-toggle {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          justify-content: center;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .freq-opt {
          cursor: pointer;
          color: #94a3b8;
          padding-bottom: 5px;
          transition: 0.3s;
          position: relative;
        }
        .freq-opt.active { color: #333; }
        .freq-opt.active::after {
          content: '';
          position: absolute; bottom: 0; left: 0; width: 100%; height: 2px;
          background: var(--theme-color);
        }

        /* PRESETS GRID */
        .preset-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .preset-box {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 15px;
          cursor: pointer;
          transition: 0.2s;
          background: white;
          position: relative;
          overflow: hidden;
        }
        .preset-box:hover { border-color: var(--theme-color); transform: translateY(-2px); }
        .preset-box.selected {
          border-color: var(--theme-color);
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
        }
        .preset-box.selected::before {
          content: '✔';
          position: absolute; top: 5px; right: 10px;
          color: var(--theme-color); font-size: 14px;
        }
        .p-amount { font-size: 1.2rem; font-weight: 800; display: block; color: #1e293b; }
        .p-desc { font-size: 0.8rem; color: #64748b; font-weight: 500; }

        /* INPUT AREA */
        .custom-input-box {
          position: relative;
          margin-bottom: 20px;
        }
        .input-currency {
          position: absolute;
          left: 15px; top: 50%; transform: translateY(-50%);
          color: #64748b; font-weight: bold;
        }
        .custom-field {
          width: 100%;
          padding: 16px 16px 16px 35px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          outline: none;
          transition: 0.3s;
        }
        .custom-field:focus { border-color: var(--theme-color); }

        /* SUBMIT BUTTON */
        .donate-btn {
          width: 100%;
          padding: 18px;
          background: var(--theme-color);
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.3s;
        }
        .donate-btn:hover {
          background: var(--theme-dark);
          transform: translateY(-2px);
        }

        /* FOOTER */
        .secure-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 0.8rem;
          color: #94a3b8;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .donate-container { grid-template-columns: 1fr; }
          .main-heading { font-size: 2.5rem; }
          .donate-card { padding: 20px; }
          .donate-page { padding: 80px 10px 40px 10px; } 
        }
      `}</style>

      {/* --- BACKGROUND LAYERS --- */}
      <div className="bg-layer"></div>
      <div className="bg-overlay"></div>

      <div className="donate-container">

        {/* --- LEFT SIDE: EMOTIONAL HOOK --- */}
        <div className="text-col">
          <div className="trust-badge">
            <FaShieldAlt color="#FBBF24" /> 100% Tax Exempt (80G)
          </div>

          <h1 className="main-heading">
            Make a Real Difference<br />
            <span style={{ color: current.color }}>Today.</span>
          </h1>

          <div className="quote-box">
            "{current.quote}"
          </div>

          <div className="impact-stats">
            <div className="stat">
              <h3>50K+</h3>
              <p>Lives Impacted</p>
            </div>
            <div className="stat">
              <h3>₹12Cr</h3>
              <p>Funds Raised</p>
            </div>
            <div className="stat">
              <h3>15+</h3>
              <p>States Covered</p>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: INTERACTIVE FORM --- */}
        <div className="donate-card">

          {/* 1. CAUSE TABS */}
          <div className="tabs-wrapper">
            {Object.values(causeData).map((cause) => (
              <button
                key={cause.id}
                className={`tab-item ${activeCause === cause.id ? 'active' : ''}`}
                onClick={() => setActiveCause(cause.id)}
              >
                {cause.icon} {cause.label.split(' ')[0]}
              </button>
            ))}
          </div>

          <form onSubmit={handleDonate}>

            {/* 2. FREQUENCY TOGGLE */}
            <div className="freq-toggle">
              <div
                className={`freq-opt ${frequency === 'monthly' ? 'active' : ''}`}
                onClick={() => setFrequency('monthly')}
              >
                Give Monthly <FaHeart size={12} color="red" />
              </div>
              <div
                className={`freq-opt ${frequency === 'onetime' ? 'active' : ''}`}
                onClick={() => setFrequency('onetime')}
              >
                Give Once
              </div>
            </div>

            {/* 3. PRESETS GRID */}
            <div className="preset-grid">
              {current.presets.map((preset) => (
                <div
                  key={preset.val}
                  className={`preset-box ${amount === preset.val && !customAmount ? 'selected' : ''}`}
                  onClick={() => { setAmount(preset.val); setCustomAmount(''); }}
                >
                  <span className="p-amount">₹{preset.val}</span>
                  <span className="p-desc">{preset.desc}</span>
                </div>
              ))}
            </div>

            {/* 4. CUSTOM AMOUNT */}
            <div className="custom-input-box">
              <span className="input-currency">₹</span>
              <input
                type="number"
                placeholder="Enter custom amount"
                className="custom-field"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>

            {/* 5. IMPACT PREVIEW (Visual Feedback) */}
            <div style={{
              background: `${current.color}20`,
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.9rem',
              color: current.darkColor,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaCheckCircle />
              {customAmount || amount ?
                `Your contribution of ₹${customAmount || amount} will help us support ${current.label.toLowerCase()}.` :
                "Select an amount to see your impact."
              }
            </div>

            {/* 6. SUBMIT BUTTON */}
            <button type="submit" className="donate-btn">
              Donate Now <FaRupeeSign />
            </button>

            {/* 7. SECURE FOOTER */}
            <div className="secure-footer">
              <FaLock size={10} /> 256-bit SSL Encrypted • Razorpay • UPI • Cards
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;

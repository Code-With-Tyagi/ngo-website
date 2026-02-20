import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaHandHoldingHeart,
  FaRegClock,
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";

// Make sure to add a relevant image to this path in your project
import elderlyMealCare from "../../../assets/images/elderly/food.jpg";
import "./meal.css";

const DONATIONS = [
  { name: "Amitabh Desai", amount: 20000, note: "For warm daily meals" },
  { name: "Kavita Rao", amount: 10000, note: "Top Donor" },
  { name: "Suresh Pillai", amount: 5000, note: "Monthly supporter" },
  { name: "Pooja Hegde", amount: 3500, note: "In memory of my grandparents" },
  { name: "Nitin Sharma", amount: 2500, note: "Nutrition first" },
  { name: "Anjali Gupta", amount: 2000, note: "For weekly groceries" },
  { name: "Anonymous", amount: 1500, note: "Blessings" },
  { name: "V. R. Krishnan", amount: 1500, note: "With deep gratitude" },
  { name: "Manpreet Singh", amount: 1100, note: "Happy to help" },
  { name: "Neha Chawla", amount: 1000, note: "Best wishes" },
  { name: "Aditya Verma", amount: 900, note: "Small contribution" },
  { name: "Sunita Das", amount: 800, note: "For the elders" },
  { name: "Anonymous", amount: 500, note: "Stay healthy" },
  { name: "Rajesh Kumar", amount: 500, note: "Support elder care" },
];

const FAQS = [
  {
    question: "What kind of meals are provided to the elderly?",
    answer:
      "We provide freshly cooked, soft, and easy-to-digest vegetarian meals tailored for old age. Special care is taken to ensure the food is low in sodium and diabetic-friendly.",
  },
  {
    question: "Is my donation secure?",
    answer:
      "Yes. Donations are processed through secure payment channels, and we maintain strict campaign-level records for full accountability.",
  },
  {
    question: "Will I get a tax exemption receipt?",
    answer:
      "Yes. Upon successful donation, you will receive an 80G tax exemption receipt on your registered email ID.",
  },
  {
    question: "Can I sponsor meals for a specific day (like a birthday)?",
    answer:
      "Yes. You can choose to sponsor a full day's meal for the shelter on special occasions. Please contact our trust directly after making the donation.",
  },
  {
    question: "Can I share this campaign with friends?",
    answer:
      "Absolutely! Use the Share button to send this page to your family and friends via WhatsApp, social media, or email to help us reach more people.",
  },
];

const STORY = [
  "In the twilight years of their lives, many elderly individuals find themselves abandoned, struggling not just with loneliness, but with the basic need for a warm, nutritious meal.",
  "Our Daily Meal Care initiative ensures that senior citizens living in our shelter, as well as destitute elders on the streets, receive two fresh, hot, and healthy meals every day.",
  "With advancing age, proper nutrition becomes critical for survival and managing age-related illnesses. Your support helps us buy groceries, cook specialized meals, and serve them with the dignity and love they deserve.",
  "Help us ensure that no elderly person in our care has to go to sleep on an empty stomach. Your contribution is a direct serving of hope and warmth."
];

function ElderlyMealCarePage() {
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [shareLabel, setShareLabel] = useState("Share");
  const [donationModalType, setDonationModalType] = useState(null);

  const isDonationModalOpen = donationModalType !== null;
  const sortedDonations = useMemo(
    () => [...DONATIONS].sort((a, b) => b.amount - a.amount),
    []
  );
  const modalDonations =
    donationModalType === "top" ? sortedDonations.slice(0, 10) : sortedDonations;
  const modalTitle = donationModalType === "top" ? "Top Donations" : "All Donations";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isDonationModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setDonationModalType(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isDonationModalOpen]);

  const formatAmount = (amount) => `Rs ${amount.toLocaleString("en-IN")}`;

  const handleShare = async () => {
    const pageUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Daily Meal Care for the Elderly",
          text: "Help provide warm, nutritious meals for abandoned elderly citizens.",
          url: pageUrl,
        });
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(pageUrl);
        setShareLabel("Link Copied");
        window.setTimeout(() => setShareLabel("Share"), 1600);
      }
    } catch {
      setShareLabel("Share");
    }
  };

  return (
    <section className="meal-care-detail-page">
      <div className="meal-care-detail-shell">
        <div className="meal-care-content-grid">
          <aside className="meal-care-side-stack">
            <article className="campaign-card">
              <div className="campaign-image-wrap">
                <img src={elderlyMealCare} alt="Elderly person receiving a warm meal" />
                <span className="campaign-chip">80G Tax Benefits</span>
              </div>

              <div className="campaign-body">
                <h1>Provide daily nutritious meals for abandoned elderly</h1>
                <p className="campaign-org">by Silver Years Foundation</p>

                <div className="campaign-amounts">
                  <strong>Rs 1,85,000</strong>
                  <span>raised of Rs 4,00,000 goal</span>
                </div>

                <div className="campaign-progress" aria-hidden="true">
                  <span className="campaign-progress-fill" style={{ width: "46%" }} />
                </div>

                <div className="campaign-stats">
                  <div>
                    <strong>205</strong>
                    <span>Donors</span>
                  </div>
                  <div>
                    <strong>21</strong>
                    <span>Days left</span>
                  </div>
                  <div>
                    <strong>46%</strong>
                    <span>Funded</span>
                  </div>
                </div>

                <div className="campaign-actions">
                  <Link to="/donate" className="campaign-btn campaign-btn-primary">
                    Donate Now
                  </Link>
                  <button
                    type="button"
                    className="campaign-btn campaign-btn-secondary"
                    onClick={handleShare}
                  >
                    {shareLabel}
                  </button>
                </div>
              </div>
            </article>
          </aside>

          <div className="meal-care-main-stack">
            <section className="meal-care-section-card">
              <h2>Story</h2>
              <div className={`story-content ${storyExpanded ? "expanded" : ""}`}>
                {STORY.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <button
                type="button"
                className="text-action"
                onClick={() => setStoryExpanded((current) => !current)}
              >
                {storyExpanded ? "Read Less" : "Read More"}
              </button>
            </section>

            <section className="meal-care-section-card">
              <div className="section-head">
                <h2>Recent Donations</h2>
                <span>205 Donations</span>
              </div>

              <div className="donation-list">
                {sortedDonations.slice(0, 3).map((donation) => (
                  <article key={`${donation.name}-${donation.amount}`} className="donation-item">
                    <FaUserCircle aria-hidden="true" />
                    <div>
                      <h3>{donation.name}</h3>
                      <p>{formatAmount(donation.amount)}</p>
                    </div>
                    <span>{donation.note}</span>
                  </article>
                ))}
              </div>

              <div className="section-links">
                <button type="button" onClick={() => setDonationModalType("top")}>
                  View Top Donations
                </button>
                <button type="button" onClick={() => setDonationModalType("all")}>
                  View All Donations
                </button>
              </div>
            </section>

            <section className="support-panel">
              <h2>Support the fundraiser</h2>
              <p>Every small share and donation helps serve a warm plate of food.</p>
              <div className="support-actions">
                <Link to="/donate" className="campaign-btn campaign-btn-primary">
                  Donate Now
                </Link>
                <button
                  type="button"
                  className="campaign-btn campaign-btn-secondary"
                  onClick={handleShare}
                >
                  Share
                </button>
              </div>
            </section>

            <section className="meal-care-section-card">
              <h2>Organizers</h2>
              <div className="organizer-list">
                <article className="organizer-item">
                  <span className="organizer-logo">SY</span>
                  <div>
                    <h3>Silver Years Foundation</h3>
                    <p>Verified NGO</p>
                  </div>
                </article>
                <article className="organizer-item">
                  <span className="organizer-logo organizer-logo-alt">g</span>
                  <div>
                    <h3>Give</h3>
                    <p>Organizer</p>
                  </div>
                </article>
              </div>
            </section>

            <section className="trust-strip">
              <h2>India&apos;s trusted online donation platform</h2>
              <div className="trust-grid">
                <article>
                  <FaShieldAlt aria-hidden="true" />
                  <div>
                    <h3>Easy</h3>
                    <p>Donate quickly and securely in a few steps.</p>
                  </div>
                </article>
                <article>
                  <FaHandHoldingHeart aria-hidden="true" />
                  <div>
                    <h3>Impactful</h3>
                    <p>Your support directly funds groceries and kitchen operations.</p>
                  </div>
                </article>
                <article>
                  <FaRegClock aria-hidden="true" />
                  <div>
                    <h3>Credible</h3>
                    <p>Campaign records and charity details are maintained clearly.</p>
                  </div>
                </article>
              </div>
            </section>

            <section className="meal-care-section-card faq-section">
              <h2>FAQs</h2>
              <p className="faq-intro">Everything you need to know before you donate.</p>

              <div className="faq-list">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <article key={faq.question} className={`faq-item ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <FaChevronDown aria-hidden="true" />
                      </button>
                      {isOpen && <p className="faq-answer">{faq.answer}</p>}
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>

      {isDonationModalOpen && (
        <div
          className="donation-modal-backdrop"
          role="presentation"
          onClick={() => setDonationModalType(null)}
        >
          <div
            className="donation-modal"
            role="dialog"
            aria-modal="true"
            aria-label={modalTitle}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="donation-modal-head">
              <h3>{modalTitle}</h3>
              <button
                type="button"
                className="donation-modal-close"
                onClick={() => setDonationModalType(null)}
                aria-label="Close donations popup"
              >
                x
              </button>
            </div>
            <p className="donation-modal-subtitle">
              Showing {modalDonations.length} contributions to this fundraiser
            </p>
            <div className="donation-modal-list">
              {modalDonations.map((donation) => (
                <article
                  key={`${donation.name}-${donation.amount}-modal`}
                  className="donation-item donation-item-modal"
                >
                  <FaUserCircle aria-hidden="true" />
                  <div>
                    <h3>{donation.name}</h3>
                    <p>{formatAmount(donation.amount)}</p>
                  </div>
                  <span>{donation.note}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ElderlyMealCarePage;
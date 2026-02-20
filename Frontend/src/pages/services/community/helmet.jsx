import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaHandHoldingHeart,
  FaRegClock,
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";

// Update this path to where your actual helmet drive image is located
import helmetDriveImg from "../../../assets/images/communitySafety/helmet.png";
import "./helmet.css";

const DONATIONS = [
  { name: "Arvind Swamy", amount: 20000, note: "For 40 ISI-marked helmets" },
  { name: "Priya Menon", amount: 15000, note: "Keep up the great work" },
  { name: "Suresh Pillai", amount: 10000, note: "Top Donor" },
  { name: "Nisha Agarwal", amount: 5000, note: "Safety first!" },
  { name: "Gaurav Khanna", amount: 5000, note: "In memory of a lost friend" },
  { name: "Anonymous", amount: 3500, note: "For delivery riders" },
  { name: "Rohit Bansal", amount: 2500, note: "Protecting breadwinners" },
  { name: "Anjali Gupta", amount: 2000, note: "Happy to support" },
  { name: "Vikram Chatterjee", amount: 1500, note: "Ride safe, live long" },
  { name: "Kunal Shah", amount: 1000, note: "For two helmets" },
  { name: "Megha Sharma", amount: 1000, note: "Small contribution" },
  { name: "Anonymous", amount: 500, note: "Save a life" },
  { name: "Rahul Dev", amount: 500, note: "One helmet at a time" },
  { name: "Deepika Singh", amount: 500, note: "God bless" },
];

const FAQS = [
  {
    question: "Who receives these helmets?",
    answer:
      "We primarily distribute helmets to daily wage workers, delivery executives, and low-income two-wheeler riders who often cannot afford high-quality protective gear.",
  },
  {
    question: "Are the helmets certified and safe?",
    answer:
      "Absolutely. We only procure and distribute strictly ISI-certified, full-face helmets that meet government safety standards. We never compromise on quality.",
  },
  {
    question: "Will I get a donation receipt?",
    answer:
      "Yes. You will receive a confirmation and a donation receipt on your registered email ID as soon as your contribution is completed successfully.",
  },
  {
    question: "Can I volunteer for the distribution drives?",
    answer:
      "Yes! We regularly hold distribution drives at major traffic intersections. You can reach out to our team to join us as a ground volunteer.",
  },
  {
    question: "Can I share this campaign with friends?",
    answer:
      "Yes. Road safety is everyone's responsibility. Use the Share button to quickly send this page to your contacts and help this cause reach more people.",
  },
];

const STORY = [
  "Every day, thousands of two-wheeler riders risk their lives on our chaotic roads. Head injuries remain the leading cause of fatalities in road accidents, largely because many riders cannot afford quality head protection.",
  "Many daily wage earners and delivery partners resort to wearing cheap, roadside plastic caps just to avoid traffic fines. These offer zero protection in the event of a crash, leaving families completely devastated when the worst happens.",
  "Our 'Protect Lives' Helmet Distribution Drive aims to change this. We are raising funds to distribute high-quality, ISI-certified helmets to vulnerable riders across the city. Each helmet costs just Rs 500, but its value in saving a life is immeasurable.",
  "Your contribution can ensure that a breadwinner returns home safely to their family every single night. Donate today and help us put a protective shield around those who need it most."
];

function HelmetDrivePage() {
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
          title: "Protect Lives: Helmet Distribution Drive",
          text: "Help us distribute ISI-marked helmets to low-income riders and save lives.",
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
    <section className="helmet-drive-detail-page">
      <div className="helmet-drive-detail-shell">
        <div className="helmet-drive-content-grid">
          <aside className="helmet-drive-side-stack">
            <article className="campaign-card">
              <div className="campaign-image-wrap">
                <img src={helmetDriveImg} alt="Volunteers distributing helmets to riders" />
                <span className="campaign-chip">Tax Benefits Available</span>
              </div>

              <div className="campaign-body">
                <h1>Protect Lives: Nationwide Helmet Distribution Drive</h1>
                <p className="campaign-org">by SafeRoads Initiative</p>

                <div className="campaign-amounts">
                  <strong>Rs 3,85,000</strong>
                  <span>raised of Rs 5,00,000 goal</span>
                </div>

                <div className="campaign-progress" aria-hidden="true">
                  <span className="campaign-progress-fill" style={{ width: "77%" }} />
                </div>

                <div className="campaign-stats">
                  <div>
                    <strong>524</strong>
                    <span>Donors</span>
                  </div>
                  <div>
                    <strong>21</strong>
                    <span>Days left</span>
                  </div>
                  <div>
                    <strong>77%</strong>
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

          <div className="helmet-drive-main-stack">
            <section className="helmet-drive-section-card">
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

            <section className="helmet-drive-section-card">
              <div className="section-head">
                <h2>Recent Donations</h2>
                <span>524 Donations</span>
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
              <p>Just Rs 500 can provide a certified helmet and save a breadwinner's life.</p>
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

            <section className="helmet-drive-section-card">
              <h2>Organizers</h2>
              <div className="organizer-list">
                <article className="organizer-item">
                  <span className="organizer-logo">SR</span>
                  <div>
                    <h3>SafeRoads Initiative</h3>
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
                    <p>100% of your support goes directly toward helmet procurement.</p>
                  </div>
                </article>
                <article>
                  <FaRegClock aria-hidden="true" />
                  <div>
                    <h3>Credible</h3>
                    <p>Campaign records, vendor receipts, and charity details are transparent.</p>
                  </div>
                </article>
              </div>
            </section>

            <section className="helmet-drive-section-card faq-section">
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

export default HelmetDrivePage;
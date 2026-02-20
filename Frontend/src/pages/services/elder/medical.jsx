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
import medicalAssistanceImg from "../../../assets/images/elderly/medical.webp";
import "./medical.css";

const DONATIONS = [
  { name: "Siddharth Rao", amount: 50000, note: "For the surgery costs" },
  { name: "Ananya Desai", amount: 25000, note: "Wishing a speedy recovery" },
  { name: "Rajesh Kumar", amount: 15000, note: "Top Donor" },
  { name: "Neha Singh", amount: 10000, note: "For life-saving medicines" },
  { name: "Anonymous", amount: 7500, note: "God bless" },
  { name: "Vikash Jain", amount: 5000, note: "Monthly health supporter" },
  { name: "Pooja Sharma", amount: 3000, note: "For ICU charges" },
  { name: "Amitabh Sen", amount: 2500, note: "Hope this helps" },
  { name: "Kritika Iyer", amount: 2000, note: "Stay strong!" },
  { name: "Anonymous", amount: 1500, note: "In prayers" },
  { name: "Rohan Das", amount: 1000, note: "Small contribution" },
  { name: "Sneha Kapoor", amount: 1000, note: "Towards medical tests" },
  { name: "Manish Verma", amount: 500, note: "Get well soon" },
  { name: "Anonymous", amount: 500, note: "Support for health" },
];

const FAQS = [
  {
    question: "What kind of medical emergencies does this cover?",
    answer:
      "This fund covers a range of critical needs, including life-saving surgeries, expensive ongoing treatments (like chemotherapy or dialysis), post-accident ICU care, and essential diagnostic tests for underprivileged patients.",
  },
  {
    question: "Are the funds transferred directly to the hospital?",
    answer:
      "Yes. To ensure complete transparency and proper utilization, we transfer the required funds directly to the verified hospital's bank account against the patient's medical bills.",
  },
  {
    question: "Will I get a tax exemption receipt?",
    answer:
      "Yes. Upon successful donation, you will receive an 80G tax exemption receipt on your registered email ID.",
  },
  {
    question: "Can I donate medicines or medical equipment directly?",
    answer:
      "Yes! We accept sealed, unexpired medicines and functional medical equipment (like oxygen concentrators or wheelchairs). Please reach out to our support team to arrange a drop-off.",
  },
  {
    question: "Can I share this campaign with friends?",
    answer:
      "Absolutely! Medical emergencies require urgent funds. Use the Share button to send this page to your family and friends via WhatsApp, social media, or email to help us reach the goal faster.",
  },
];

const STORY = [
  "A sudden medical emergency can drain a family's life savings in a matter of days. For families already living on the margins, a critical illness or a severe accident doesn't just bring emotional devastation—it brings an impossible financial burden.",
  "Our Urgent Medical Assistance fund is a lifeline for those who cannot afford life-saving treatments. We step in when families are forced to choose between feeding their children and paying for a loved one's surgery.",
  "Your contributions go directly toward hospital bills, expensive life-saving medications, ICU charges, and necessary rehabilitation. We thoroughly verify every case to ensure your money reaches those who need it the absolute most.",
  "Time is of the essence in medical crises. By contributing today, you are not just giving money; you are giving someone a second chance at life. Stand with us to make healthcare accessible to those who are fighting for their lives."
];

function MedicalAssistancePage() {
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
          title: "Urgent Medical Assistance Fund",
          text: "Help provide life-saving surgeries and medical care to those who cannot afford it.",
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
    <section className="medical-assistance-detail-page">
      <div className="medical-assistance-detail-shell">
        <div className="medical-assistance-content-grid">
          <aside className="medical-assistance-side-stack">
            <article className="campaign-card">
              <div className="campaign-image-wrap">
                <img src={medicalAssistanceImg} alt="Patient receiving medical care in a hospital" />
                <span className="campaign-chip">80G Tax Benefits</span>
              </div>

              <div className="campaign-body">
                <h1>Provide urgent medical assistance and life-saving care</h1>
                <p className="campaign-org">by CareHeal Foundation</p>

                <div className="campaign-amounts">
                  <strong>Rs 12,40,000</strong>
                  <span>raised of Rs 20,00,000 goal</span>
                </div>

                <div className="campaign-progress" aria-hidden="true">
                  <span className="campaign-progress-fill" style={{ width: "62%" }} />
                </div>

                <div className="campaign-stats">
                  <div>
                    <strong>845</strong>
                    <span>Donors</span>
                  </div>
                  <div>
                    <strong>15</strong>
                    <span>Days left</span>
                  </div>
                  <div>
                    <strong>62%</strong>
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

          <div className="medical-assistance-main-stack">
            <section className="medical-assistance-section-card">
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

            <section className="medical-assistance-section-card">
              <div className="section-head">
                <h2>Recent Donations</h2>
                <span>845 Donations</span>
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
              <p>Every small share and donation helps fund a life-saving treatment.</p>
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

            <section className="medical-assistance-section-card">
              <h2>Organizers</h2>
              <div className="organizer-list">
                <article className="organizer-item">
                  <span className="organizer-logo">CH</span>
                  <div>
                    <h3>CareHeal Foundation</h3>
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
                    <p>Your support directly funds verified hospital bills and medicines.</p>
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

            <section className="medical-assistance-section-card faq-section">
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

export default MedicalAssistancePage;
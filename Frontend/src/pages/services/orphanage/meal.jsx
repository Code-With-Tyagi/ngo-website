
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaChevronDown,
    FaHandHoldingHeart,
    FaRegClock,
    FaShieldAlt,
    FaUserCircle,
} from "react-icons/fa";
import orphanMeal from "../../../assets/images/orphanage/food.webp";
import "./meal.css";

const DONATIONS = [
    { name: "Sanjay Singhania", amount: 10000, note: "For healthy meals" },
    { name: "Meena Kumari", amount: 5000, note: "Supporting nutrition" },
    { name: "Rahul Deshmukh", amount: 2500, note: "Happy meals for kids" },
    { name: "Anita Rao", amount: 1500, note: "Keep it up" },
    { name: "Anonymous", amount: 1000, note: "Small help" },
    { name: "Vikram Malhotra", amount: 2100, note: "For fruits and milk" },
    { name: "Sunita Reddy", amount: 1500, note: "Blessed to help" },
    { name: "Anonymous", amount: 1100, note: "Nutrition first" },
    { name: "Dr. Aditya", amount: 501, note: "Good work" },
];

const FAQS = [
    {
        question: "How does this meal fundraiser help children?",
        answer: "Funds are used to provide high-quality, nutritious meals, including fresh fruits, milk, and balanced diets, ensuring healthy development for orphans.",
    },
    {
        question: "Is my donation secure?",
        answer: "Yes. Donations are processed through secure payment channels and campaign-level records are maintained for accountability.",
    },
    {
        question: "Will I get donation confirmation?",
        answer: "Yes. You receive confirmation as soon as your contribution is completed successfully.",
    },
    {
        question: "Can I support this fundraiser monthly?",
        answer: "Yes. You can return and donate again any time, or support related child welfare campaigns regularly.",
    },
    {
        question: "Can I share this campaign with friends?",
        answer: "Yes. You can use the Share button to quickly send this page to your contacts and help this cause reach more people.",
    },
];

const STORY = [
    "Proper nutrition is the foundation of a healthy childhood. Many children in orphanage care lack access to balanced and diverse meals necessary for their growth.",
    "The 'Nutritious Meal' initiative ensures that every child receives the essential vitamins and minerals they need for physical and cognitive development.",
    "Your support helps us provide fresh, healthy, and hygienic meals every day, giving these children the energy to learn, play, and thrive.",
];

function Meal() {
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
                    title: "Nutritious Meal Support",
                    text: "Support healthy meals for children in orphanage care.",
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
        <section className="meal-detail-page">
            <div className="meal-detail-shell">
                <div className="meal-content-grid">
                    <aside className="meal-side-stack">
                        <article className="campaign-card">
                            <div className="campaign-image-wrap">
                                <img src={orphanMeal} alt="Children enjoying nutritious meals" />
                                <span className="campaign-chip">Healthy Choice</span>
                            </div>

                            <div className="campaign-body">
                                <h1>Provide high-quality nutritious meals for orphans</h1>
                                <p className="campaign-org">by Guardian of Angels Trust</p>

                                <div className="campaign-amounts">
                                    <strong>Rs 1,50,000</strong>
                                    <span>raised of Rs 3,00,000 goal</span>
                                </div>

                                <div className="campaign-progress" aria-hidden="true">
                                    <span className="campaign-progress-fill" style={{ width: "50%" }} />
                                </div>

                                <div className="campaign-stats">
                                    <div>
                                        <strong>85</strong>
                                        <span>Donors</span>
                                    </div>
                                    <div>
                                        <strong>20</strong>
                                        <span>Days left</span>
                                    </div>
                                    <div>
                                        <strong>50%</strong>
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

                    <div className="meal-main-stack">
                        <section className="meal-section-card">
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

                        <section className="meal-section-card">
                            <div className="section-head">
                                <h2>Recent Donations</h2>
                                <span>{DONATIONS.length} Donations</span>
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
                            <h2>Support the Nutritious Meal initiative</h2>
                            <p>Your contribution directly provides nourishment to children who need it most.</p>
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

                        <section className="meal-section-card">
                            <h2>Organizers</h2>
                            <div className="organizer-list">
                                <article className="organizer-item">
                                    <span className="organizer-logo">GA</span>
                                    <div>
                                        <h3>Guardian of Angels Trust</h3>
                                        <p>Verified Charity</p>
                                    </div>
                                </article>
                            </div>
                        </section>

                        <section className="trust-strip">
                            <h2>Building a healthy foundation for the future</h2>
                            <div className="trust-grid">
                                <article>
                                    <FaShieldAlt aria-hidden="true" />
                                    <div>
                                        <h3>Verified Impact</h3>
                                        <p>Every rupee is spent on fresh and balanced food for the children.</p>
                                    </div>
                                </article>
                                <article>
                                    <FaHandHoldingHeart aria-hidden="true" />
                                    <div>
                                        <h3>Compassionate Feed</h3>
                                        <p>Meals are prepared with care and love by our dedicated kitchen staff.</p>
                                    </div>
                                </article>
                                <article>
                                    <FaRegClock aria-hidden="true" />
                                    <div>
                                        <h3>Consistent Care</h3>
                                        <p>Daily meal schedules maintained strictly for optimal child health.</p>
                                    </div>
                                </article>
                            </div>
                        </section>

                        <section className="meal-section-card faq-section">
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

export default Meal;

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaChevronDown,
    FaHandHoldingHeart,
    FaRegClock,
    FaShieldAlt,
    FaUserCircle,
} from "react-icons/fa";
// Ensure you have a suitable image at this path
import orphanHealth from "../../../assets/images/orphanage/health.jpg";
import "./health.css";

const DONATIONS = [
    { name: "Rajesh Khanna", amount: 25000, note: "For emergency funds" },
    { name: "Ananya Sharma", amount: 12000, note: "Top Donor" },
    { name: "Mohit Agarwal", amount: 8000, note: "Vaccination drive" },
    { name: "Priya Singh", amount: 5000, note: "Monthly supporter" },
    { name: "Karan Johar", amount: 4500, note: "Quick recovery" },
    { name: "Sneha Patel", amount: 3000, note: "For essential medicines" },
    { name: "Anonymous", amount: 2500, note: "Joined today" },
    { name: "V. R. Iyer", amount: 2000, note: "With gratitude" },
    { name: "Jaspreet Singh", amount: 1500, note: "Stay healthy" },
    { name: "Nisha Gupta", amount: 1100, note: "Best wishes" },
    { name: "Amit Verma", amount: 1000, note: "Small effort" },
    { name: "Deepak Kumar", amount: 800, note: "For the kids" },
    { name: "Anonymous", amount: 500, note: "Blessings" },
    { name: "Riya Sen", amount: 500, note: "Support healthcare" },
];

const FAQS = [
    {
        question: "How does this healthcare fundraiser help children?",
        answer:
            "Funds are strictly utilized for regular medical checkups, vaccinations, emergency treatments, dental care, and essential medicines for children in orphanage care.",
    },
    {
        question: "Is my donation secure?",
        answer:
            "Yes. Donations are processed through secure payment channels and campaign-level records are maintained for accountability.",
    },
    {
        question: "Will I get a donation confirmation?",
        answer:
            "Yes. You receive confirmation as soon as your contribution is completed successfully.",
    },
    {
        question: "Can I support this fundraiser monthly?",
        answer:
            "Yes. You can return and donate again any time, or set up a recurring donation to ensure long-term medical security for the children.",
    },
    {
        question: "Can I share this campaign with friends?",
        answer:
            "Yes. You can use the Share button to quickly send this page to your contacts and help this medical cause reach more people.",
    },
];

const STORY = [
    "Access to proper healthcare is vital for a child's growth, yet many children in orphanage care lack the necessary funds for regular checkups, vaccinations, and emergency medical treatments.",
    "This healthcare fundraiser aims to build a robust medical fund to cover hospital bills, essential medicines, routine doctor visits, and specialized care for children who fall ill or have chronic conditions.",
    "With your generous support, we can ensure these children receive timely and professional medical attention, helping them recover quickly, stay strong, and live healthy, active lives.",
];

function OrphanageHealthPage() {
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
                    title: "Orphanage Healthcare Support",
                    text: "Support medical and healthcare needs for children in orphanage care.",
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
        <section className="health-detail-page">
            <div className="health-detail-shell">
                <div className="health-content-grid">
                    <aside className="health-side-stack">
                        <article className="campaign-card">
                            <div className="campaign-image-wrap">
                                <img src={orphanHealth} alt="Children receiving medical checkups" />
                                <span className="campaign-chip">Tax Benefits Available</span>
                            </div>

                            <div className="campaign-body">
                                <h1>Help provide healthcare and medical support for children in orphanage care</h1>
                                <p className="campaign-org">by Guardian of Angels Trust</p>

                                <div className="campaign-amounts">
                                    <strong>Rs 3,45,000</strong>
                                    <span>raised of Rs 5,00,000 goal</span>
                                </div>

                                <div className="campaign-progress" aria-hidden="true">
                                    <span className="campaign-progress-fill" style={{ width: "69%" }} />
                                </div>

                                <div className="campaign-stats">
                                    <div>
                                        <strong>189</strong>
                                        <span>Donors</span>
                                    </div>
                                    <div>
                                        <strong>21</strong>
                                        <span>Days left</span>
                                    </div>
                                    <div>
                                        <strong>69%</strong>
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

                    <div className="health-main-stack">
                        <section className="health-section-card">
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

                        <section className="health-section-card">
                            <div className="section-head">
                                <h2>Recent Donations</h2>
                                <span>189 Donations</span>
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
                            <p>Every small share and donation helps keep a child healthy.</p>
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

                        <section className="health-section-card">
                            <h2>Organizers</h2>
                            <div className="organizer-list">
                                <article className="organizer-item">
                                    <span className="organizer-logo">GA</span>
                                    <div>
                                        <h3>Guardian of Angels Trust</h3>
                                        <p>Verified Charity</p>
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
                                        <p>Your support provides life-saving medicines and timely medical care.</p>
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

                        <section className="health-section-card faq-section">
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

export default OrphanageHealthPage;
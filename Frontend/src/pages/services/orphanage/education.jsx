
import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {

    FaChevronDown,

    FaHandHoldingHeart,

    FaRegClock,

    FaShieldAlt,

    FaUserCircle,

} from "react-icons/fa";

import orphanEducation from "../../../assets/images/orphanage/education.jpg";

import "./education.css";



const DONATIONS = [

    { name: "Sourabh Bakshi", amount: 15000, note: "Helping children" },

    { name: "Jayesh Shrivastava", amount: 7500, note: "Top Donor" },

    { name: "Priya Sharma", amount: 5000, note: "Monthly supporter" },

    { name: "Rahul Verma", amount: 3000, note: "In memory donation" },

    { name: "Neha Gupta", amount: 2500, note: "Education first" },

    { name: "Kunal Jain", amount: 2100, note: "For school kits" },

    { name: "Anonymous", amount: 1111, note: "Joined today" },

    { name: "A. Das", amount: 1500, note: "With gratitude" },

    { name: "Simran Kaur", amount: 1200, note: "Keep going" },

    { name: "Rohit Singh", amount: 1000, note: "Best wishes" },

    { name: "Meera Nair", amount: 900, note: "Small effort" },

    { name: "Vikash Kumar", amount: 800, note: "For children" },

    { name: "Anonymous", amount: 700, note: "Blessings" },

    { name: "Anita Menon", amount: 500, note: "Support education" },

];



const FAQS = [

    {

        question: "How does this education fundraiser help children?",

        answer:

            "Funds are used for school fees, books, uniforms, tutoring support, and basic classroom needs for children living in orphanage care.",

    },

    {

        question: "Is my donation secure?",

        answer:

            "Yes. Donations are processed through secure payment channels and campaign-level records are maintained for accountability.",

    },

    {

        question: "Will I get donation confirmation?",

        answer:

            "Yes. You receive confirmation as soon as your contribution is completed successfully.",

    },

    {

        question: "Can I support this fundraiser monthly?",

        answer:

            "Yes. You can return and donate again any time, or support related child welfare campaigns regularly.",

    },

    {

        question: "Can I share this campaign with friends?",

        answer:

            "Yes. You can use the Share button to quickly send this page to your contacts and help this cause reach more people.",

    },

];



const STORY = [

    "Children in orphanage care often have dreams of becoming teachers, doctors, artists, and leaders, but financial barriers keep interrupting their schooling.",

    "This education support fundraiser helps cover school enrollment, books, uniforms, and daily learning essentials so children can continue studying with confidence.",

    "With your support, every child gets a fair chance to stay in school, learn consistently, and build a brighter and more secure future.",

];



function OrphanageEducationPage() {

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

                    title: "Orphanage Education Support",

                    text: "Support education for children in orphanage care.",

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

        <section className="education-detail-page">

            <div className="education-detail-shell">

                <div className="education-content-grid">

                    <aside className="education-side-stack">

                        <article className="campaign-card">

                            <div className="campaign-image-wrap">

                                <img src={orphanEducation} alt="Children receiving education support" />

                                <span className="campaign-chip">Tax Benefits Available</span>

                            </div>



                            <div className="campaign-body">

                                <h1>Help provide education support for children in orphanage care</h1>

                                <p className="campaign-org">by Guardian of Angels Trust</p>



                                <div className="campaign-amounts">

                                    <strong>Rs 2,61,000</strong>

                                    <span>raised of Rs 5,00,000 goal</span>

                                </div>



                                <div className="campaign-progress" aria-hidden="true">

                                    <span className="campaign-progress-fill" style={{ width: "52%" }} />

                                </div>



                                <div className="campaign-stats">

                                    <div>

                                        <strong>124</strong>

                                        <span>Donors</span>

                                    </div>

                                    <div>

                                        <strong>14</strong>

                                        <span>Days left</span>

                                    </div>

                                    <div>

                                        <strong>52%</strong>

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



                    <div className="education-main-stack">

                        <section className="education-section-card">

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



                        <section className="education-section-card">

                            <div className="section-head">

                                <h2>Recent Donations</h2>

                                <span>114 Donations</span>

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

                            <p>Every small share and donation counts.</p>

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



                        <section className="education-section-card">

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

                                        <p>Your support helps children stay in school and continue learning.</p>

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



                        <section className="education-section-card faq-section">

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



export default OrphanageEducationPage;
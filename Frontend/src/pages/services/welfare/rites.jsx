import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaChevronDown,
    FaHandHoldingHeart,
    FaRegClock,
    FaShieldAlt,
    FaUserCircle,
} from "react-icons/fa";

// Ensure you replace this with an appropriate image for Last Rites
import ritesImage from "../../../assets/images/socialWelfare/rites.png";
import "./rites.css";

const DONATIONS = [
    { name: "Amit Desai", amount: 11000, noteEn: "For a dignified farewell", noteHi: "सम्मानजनक विदाई के लिए" },
    { name: "Suresh Kumar", amount: 5100, noteEn: "Top Donor", noteHi: "शीर्ष दानकर्ता" },
    { name: "Meena Iyer", amount: 5000, noteEn: "In loving memory of my father", noteHi: "पिताजी की स्मृति में" },
    { name: "Karan Malhotra", amount: 3100, noteEn: "Rest in peace", noteHi: "शांति मिले" },
    { name: "Anonymous", amount: 2500, noteEn: "Happy to help", noteHi: "मदद करके खुशी हुई" },
    { name: "Rajat Sharma", amount: 2100, noteEn: "For cremation expenses", noteHi: "अंतिम संस्कार के खर्च के लिए" },
    { name: "Anjali Verma", amount: 1500, noteEn: "A noble cause", noteHi: "एक नेक काम" },
    { name: "V. Patil", amount: 1100, noteEn: "With gratitude", noteHi: "आभार के साथ" },
    { name: "Gaurav Singh", amount: 1000, noteEn: "Keep going", noteHi: "महान कार्य" },
    { name: "Deepak Joshi", amount: 500, noteEn: "Prayers", noteHi: "प्रार्थनाएं" },
];

const CONTENT = {
    en: {
        toggleBtn: "हिंदी में पढ़ें",
        chip: "Tax Benefits Available",
        title: "Support Dignified Last Rites: A Respectful Farewell for the Underprivileged",
        org: "by Guardian of Angels Trust",
        raisedText: "raised of Rs 3,00,000 goal",
        donors: "Donors",
        daysLeft: "Days left",
        funded: "Funded",
        donateNow: "Donate Now",
        share: "Share",
        linkCopied: "Link Copied",
        storyTitle: "Story",
        storyText: [
            "Every human being deserves a dignified farewell from this world. Unfortunately, for many destitute families and unclaimed individuals, the rising costs of a funeral make this basic right impossible.",
            "Countless families struggle to afford wood, transportation, and burial ground fees, while unclaimed bodies often await a respectful departure.",
            "Your contribution will help cover the complete costs of cremation or burial, including essential items and basic rituals, ensuring that no one leaves this world without the dignity and respect they deserve."
        ],
        readMore: "Read More",
        readLess: "Read Less",
        recentDonationsTitle: "Recent Donations",
        viewTop: "View Top Donations",
        viewAll: "View All Donations",
        supportTitle: "Support the fundraiser",
        supportDesc: "Every small share and donation counts.",
        organizersTitle: "Organizers",
        verified: "Verified Charity",
        organizerRole: "Organizer",
        trustTitle: "India's trusted online donation platform",
        trustEasy: "Easy",
        trustEasyDesc: "Donate quickly and securely in a few steps.",
        trustImpact: "Impactful",
        trustImpactDesc: "Your support ensures a dignified farewell for a departed soul.",
        trustCredible: "Credible",
        trustCredibleDesc: "Campaign records and charity details are maintained clearly.",
        faqTitle: "FAQs",
        faqIntro: "Everything you need to know before you donate.",
        faqs: [
            { q: "How will my donation be used?", a: "Funds are used to cover funeral expenses including transportation (ambulance/hearse), cremation wood or burial fees, and essential items required for basic last rites." },
            { q: "Are religious customs respected?", a: "Yes, we ensure that the final rites are performed strictly according to the individual's respective faith and religious customs." },
            { q: "Is my donation secure?", a: "Yes. Donations are processed through secure payment channels and campaign-level records are maintained." },
            { q: "Will I get a donation confirmation?", a: "Yes. You will receive a confirmation as soon as your contribution is completed successfully." }
        ],
        modalTopTitle: "Top Donations",
        modalAllTitle: "All Donations",
        showingText: "Showing",
        contribText: "contributions to this fundraiser"
    },
    hi: {
        toggleBtn: "Read in English",
        chip: "कर छूट उपलब्ध",
        title: "सम्मानजनक अंतिम संस्कार: बेसहारा और लावारिस लोगों की विदाई में मदद करें",
        org: "गार्जियन ऑफ एंजेल्स ट्रस्ट द्वारा",
        raisedText: "जुटाए गए (लक्ष्य: ₹3,00,000)",
        donors: "दानकर्ता",
        daysLeft: "दिन शेष",
        funded: "फंडेड",
        donateNow: "अभी दान करें",
        share: "शेयर करें",
        linkCopied: "लिंक कॉपी हो गया",
        storyTitle: "कहानी",
        storyText: [
            "हर इंसान इस दुनिया से एक सम्मानजनक विदाई का हकदार है। दुर्भाग्य से, कई गरीब परिवारों और लावारिस लोगों के लिए, अंतिम संस्कार का बढ़ता खर्च इस बुनियादी अधिकार को असंभव बना देता है।",
            "अनगिनत परिवार लकड़ी, परिवहन और श्मशान/कब्रिस्तान के शुल्क का भुगतान करने के लिए संघर्ष करते हैं, जबकि लावारिस शव अक्सर एक सम्मानजनक विदाई की प्रतीक्षा करते रह जाते हैं।",
            "आपका योगदान दाह संस्कार या दफनाने की पूरी लागत को कवर करने में मदद करेगा, जिसमें आवश्यक सामग्री और बुनियादी अनुष्ठान शामिल हैं, यह सुनिश्चित करते हुए कि कोई भी बिना सम्मान के इस दुनिया से न जाए।"
        ],
        readMore: "और पढ़ें",
        readLess: "कम पढ़ें",
        recentDonationsTitle: "हाल के दान",
        viewTop: "शीर्ष दान देखें",
        viewAll: "सभी दान देखें",
        supportTitle: "फंडरेजर का समर्थन करें",
        supportDesc: "आपका हर एक शेयर और दान मायने रखता है।",
        organizersTitle: "आयोजक",
        verified: "सत्यापित संस्था",
        organizerRole: "आयोजक",
        trustTitle: "भारत का विश्वसनीय ऑनलाइन डोनेशन प्लेटफॉर्म",
        trustEasy: "आसान",
        trustEasyDesc: "कुछ ही चरणों में जल्दी और सुरक्षित रूप से दान करें।",
        trustImpact: "प्रभावशाली",
        trustImpactDesc: "आपका समर्थन एक दिवंगत आत्मा के लिए सम्मानजनक विदाई सुनिश्चित करता है।",
        trustCredible: "विश्वसनीय",
        trustCredibleDesc: "अभियान के रिकॉर्ड और संस्था का विवरण स्पष्ट रूप से बनाए रखा जाता है।",
        faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
        faqIntro: "दान करने से पहले आपको जो कुछ भी जानना आवश्यक है।",
        faqs: [
            { q: "मेरे दान का उपयोग कैसे किया जाएगा?", a: "धन का उपयोग अंतिम संस्कार के खर्चों को कवर करने के लिए किया जाता है, जिसमें परिवहन (एम्बुलेंस), श्मशान की लकड़ी या दफनाने का शुल्क और बुनियादी अंतिम संस्कार के लिए आवश्यक सामग्री शामिल है।" },
            { q: "क्या धार्मिक रीति-रिवाजों का सम्मान किया जाता है?", a: "हाँ, हम यह सुनिश्चित करते हैं कि अंतिम संस्कार व्यक्ति के संबंधित धर्म और धार्मिक रीति-रिवाजों के अनुसार ही किए जाएं।" },
            { q: "क्या मेरा दान सुरक्षित है?", a: "हाँ। दान सुरक्षित भुगतान चैनलों के माध्यम से संसाधित किए जाते हैं और अभियान-स्तर के रिकॉर्ड बनाए रखे जाते हैं।" },
            { q: "क्या मुझे दान की पुष्टि मिलेगी?", a: "हाँ। जैसे ही आपका योगदान सफलतापूर्वक पूरा हो जाएगा, आपको एक पुष्टि प्राप्त होगी।" }
        ],
        modalTopTitle: "शीर्ष दान",
        modalAllTitle: "सभी दान",
        showingText: "दिखाए जा रहे हैं",
        contribText: "इस अभियान में योगदान"
    }
};

function LastRitesPage() {
    const [lang, setLang] = useState("en");
    const [storyExpanded, setStoryExpanded] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [donationModalType, setDonationModalType] = useState(null);

    const t = CONTENT[lang];

    const isDonationModalOpen = donationModalType !== null;
    const sortedDonations = useMemo(
        () => [...DONATIONS].sort((a, b) => b.amount - a.amount),
        []
    );
    const modalDonations = donationModalType === "top" ? sortedDonations.slice(0, 10) : sortedDonations;
    const modalTitle = donationModalType === "top" ? t.modalTopTitle : t.modalAllTitle;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!isDonationModalOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const closeOnEscape = (event) => {
            if (event.key === "Escape") setDonationModalType(null);
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
                    title: "Dignified Last Rites Support",
                    text: "Help ensure a dignified farewell for the underprivileged.",
                    url: pageUrl,
                });
                return;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(pageUrl);
                setIsCopied(true);
                window.setTimeout(() => setIsCopied(false), 1600);
            }
        } catch {
            setIsCopied(false);
        }
    };

    const toggleLanguage = () => {
        setLang((prev) => (prev === "en" ? "hi" : "en"));
    };

    return (
        <section className="rites-detail-page">
            <div className="rites-detail-shell">

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                    <button
                        onClick={toggleLanguage}
                        className="campaign-btn campaign-btn-secondary"
                        style={{ minHeight: '36px', padding: '0 16px', fontSize: '0.85rem' }}
                    >
                        {t.toggleBtn}
                    </button>
                </div>

                <div className="rites-content-grid">
                    <aside className="rites-side-stack">
                        <article className="campaign-card">
                            <div className="campaign-image-wrap">
                                <img src={ritesImage} alt="Dignified Last Rites Support" />
                                <span className="campaign-chip">{t.chip}</span>
                            </div>

                            <div className="campaign-body">
                                <h1>{t.title}</h1>
                                <p className="campaign-org">{t.org}</p>

                                <div className="campaign-amounts">
                                    <strong>Rs 1,32,000</strong>
                                    <span>{t.raisedText}</span>
                                </div>

                                <div className="campaign-progress" aria-hidden="true">
                                    <span className="campaign-progress-fill" style={{ width: "44%" }} />
                                </div>

                                <div className="campaign-stats">
                                    <div>
                                        <strong>86</strong>
                                        <span>{t.donors}</span>
                                    </div>
                                    <div>
                                        <strong>21</strong>
                                        <span>{t.daysLeft}</span>
                                    </div>
                                    <div>
                                        <strong>44%</strong>
                                        <span>{t.funded}</span>
                                    </div>
                                </div>

                                <div className="campaign-actions">
                                    <Link to="/donate" className="campaign-btn campaign-btn-primary">
                                        {t.donateNow}
                                    </Link>
                                    <button
                                        type="button"
                                        className="campaign-btn campaign-btn-secondary"
                                        onClick={handleShare}
                                    >
                                        {isCopied ? t.linkCopied : t.share}
                                    </button>
                                </div>
                            </div>
                        </article>
                    </aside>

                    <div className="rites-main-stack">
                        <section className="rites-section-card">
                            <h2>{t.storyTitle}</h2>
                            <div className={`story-content ${storyExpanded ? "expanded" : ""}`}>
                                {t.storyText.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="text-action"
                                onClick={() => setStoryExpanded((current) => !current)}
                            >
                                {storyExpanded ? t.readLess : t.readMore}
                            </button>
                        </section>

                        <section className="rites-section-card">
                            <div className="section-head">
                                <h2>{t.recentDonationsTitle}</h2>
                                <span>86 {t.donors}</span>
                            </div>

                            <div className="donation-list">
                                {sortedDonations.slice(0, 3).map((donation) => (
                                    <article key={`${donation.name}-${donation.amount}`} className="donation-item">
                                        <FaUserCircle aria-hidden="true" />
                                        <div>
                                            <h3>{donation.name}</h3>
                                            <p>{formatAmount(donation.amount)}</p>
                                        </div>
                                        <span>{lang === 'en' ? donation.noteEn : donation.noteHi}</span>
                                    </article>
                                ))}
                            </div>

                            <div className="section-links">
                                <button type="button" onClick={() => setDonationModalType("top")}>
                                    {t.viewTop}
                                </button>
                                <button type="button" onClick={() => setDonationModalType("all")}>
                                    {t.viewAll}
                                </button>
                            </div>
                        </section>

                        <section className="support-panel">
                            <h2>{t.supportTitle}</h2>
                            <p>{t.supportDesc}</p>
                            <div className="support-actions">
                                <Link to="/donate" className="campaign-btn campaign-btn-primary">
                                    {t.donateNow}
                                </Link>
                                <button
                                    type="button"
                                    className="campaign-btn campaign-btn-secondary"
                                    onClick={handleShare}
                                >
                                    {isCopied ? t.linkCopied : t.share}
                                </button>
                            </div>
                        </section>

                        <section className="rites-section-card">
                            <h2>{t.organizersTitle}</h2>
                            <div className="organizer-list">
                                <article className="organizer-item">
                                    <span className="organizer-logo">GA</span>
                                    <div>
                                        <h3>Guardian of Angels Trust</h3>
                                        <p>{t.verified}</p>
                                    </div>
                                </article>
                                <article className="organizer-item">
                                    <span className="organizer-logo organizer-logo-alt">g</span>
                                    <div>
                                        <h3>Give</h3>
                                        <p>{t.organizerRole}</p>
                                    </div>
                                </article>
                            </div>
                        </section>

                        <section className="trust-strip">
                            <h2>{t.trustTitle}</h2>
                            <div className="trust-grid">
                                <article>
                                    <FaShieldAlt aria-hidden="true" />
                                    <div>
                                        <h3>{t.trustEasy}</h3>
                                        <p>{t.trustEasyDesc}</p>
                                    </div>
                                </article>
                                <article>
                                    <FaHandHoldingHeart aria-hidden="true" />
                                    <div>
                                        <h3>{t.trustImpact}</h3>
                                        <p>{t.trustImpactDesc}</p>
                                    </div>
                                </article>
                                <article>
                                    <FaRegClock aria-hidden="true" />
                                    <div>
                                        <h3>{t.trustCredible}</h3>
                                        <p>{t.trustCredibleDesc}</p>
                                    </div>
                                </article>
                            </div>
                        </section>

                        <section className="rites-section-card faq-section">
                            <h2>{t.faqTitle}</h2>
                            <p className="faq-intro">{t.faqIntro}</p>

                            <div className="faq-list">
                                {t.faqs.map((faq, index) => {
                                    const isOpen = openFaq === index;
                                    return (
                                        <article key={index} className={`faq-item ${isOpen ? "open" : ""}`}>
                                            <button
                                                type="button"
                                                className="faq-question"
                                                onClick={() => setOpenFaq(isOpen ? null : index)}
                                                aria-expanded={isOpen}
                                            >
                                                <span>{faq.q}</span>
                                                <FaChevronDown aria-hidden="true" />
                                            </button>
                                            {isOpen && <p className="faq-answer">{faq.a}</p>}
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
                            {t.showingText} {modalDonations.length} {t.contribText}
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
                                    <span>{lang === 'en' ? donation.noteEn : donation.noteHi}</span>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default LastRitesPage;
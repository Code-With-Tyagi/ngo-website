import React, { useState } from 'react';
import './addNgo.css'; // Make sure to import the CSS file
import {
  Building2,
  MapPin,
  Phone,
  HandHeart,
  UploadCloud,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Info,
  Facebook,
  Instagram,
  FileText
} from 'lucide-react';

// --- REUSABLE COMPONENTS (Moved outside to prevent focus loss) ---

const InputField = ({ label, name, type = "text", placeholder, required = false, value, onChange, error }) => (
  <div className="form-group">
    <label className="form-label">
      {label} {required && <span className="required-star">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`form-input ${error ? 'error' : ''}`}
    />
    {error && <span className="error-msg">{error}</span>}
  </div>
);

const SelectField = ({ label, name, options, required = false, value, onChange, error }) => (
  <div className="form-group">
    <label className="form-label">
      {label} {required && <span className="required-star">*</span>}
    </label>
    <div className="select-wrapper">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input form-select ${error ? 'error' : ''}`}
      >
        <option value="">Select {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <span className="select-arrow">▼</span>
    </div>
    {error && <span className="error-msg">{error}</span>}
  </div>
);

const FileUploadBox = ({ title, optional }) => (
  <div className="upload-box">
    <div className="upload-icon-wrapper">
      <UploadCloud size={24} />
    </div>
    <p className="upload-title">{title}</p>
    <p className="upload-subtitle">{optional ? "(Optional)" : "Drag & drop or click to upload PDF/JPG"}</p>
  </div>
);

const AddNGOPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ngoName: '',
    regType: '',
    regNumber: '',
    estYear: '',
    darpanId: '',
    panNumber: '',
    description: '',
    state: '',
    district: '',
    city: '',
    address: '',
    pincode: '',
    contactName: '',
    contactRole: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    services: [],
    otherService: '',
    agreeToTerms: false
  });

  const totalSteps = 5;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
    // Clear error when user selects a service
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.ngoName.trim()) newErrors.ngoName = "NGO Name is required";
      if (!formData.regType) newErrors.regType = "Registration Type is required";
      if (!formData.regNumber.trim()) newErrors.regNumber = "Registration Number is required";
    }

    if (step === 2) {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.pincode) {
        newErrors.pincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Invalid 6-digit Pincode";
      }
    }

    if (step === 3) {
      if (!formData.contactName.trim()) newErrors.contactName = "Contact Name is required";
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone Number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
        newErrors.phone = "Invalid 10-digit number";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
    }

    if (step === 4) {
      if (formData.services.length === 0) newErrors.services = "Select at least one service";
    }

    if (step === 5) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Errors are set by validateStep, UI will show them
      const firstError = document.querySelector('.error-msg');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    if (validateStep(5)) {
      // Simulate API call
      setTimeout(() => setIsSubmitted(true), 1500);
    }
  };

  // --- RENDER ---

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>
          <h2>Submission Received!</h2>
          <p>
            Thank you for registering <strong>{formData.ngoName}</strong>.
            Your application has been submitted for verification.
          </p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Hero Header */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Register Your NGO</h1>
          <p>Join India’s largest network of changemakers. Gain visibility, find volunteers, and collaborate for social impact.</p>
        </div>
        <div className="hero-pattern"></div>
      </header>

      {/* Main Card */}
      <main className="main-content">
        <div className="form-card">

          {/* Progress Bar */}
          <div className="progress-header">
            <div className="progress-info">
              <span className="step-count">Step {currentStep} of {totalSteps}</span>
              <span className="step-name">
                {currentStep === 1 && "Basic Info"}
                {currentStep === 2 && "Location"}
                {currentStep === 3 && "Contact"}
                {currentStep === 4 && "Services"}
                {currentStep === 5 && "Documents"}
              </span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="form-body">

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="form-step fade-in">
                <div className="section-title">
                  <div className="icon-badge"><Building2 size={24} /></div>
                  <h2>NGO Details</h2>
                </div>

                <div className="form-grid">
                  <InputField label="NGO Name" name="ngoName" required placeholder="e.g. Hope Foundation" value={formData.ngoName} onChange={handleInputChange} error={errors.ngoName} />
                  <SelectField label="Registration Type" name="regType" required options={["Public Trust", "Society", "Section 8 Company"]} value={formData.regType} onChange={handleInputChange} error={errors.regType} />
                </div>

                <div className="form-grid">
                  <InputField label="Registration Number" name="regNumber" required placeholder="Reg. No." value={formData.regNumber} onChange={handleInputChange} error={errors.regNumber} />
                  <InputField label="Year of Est." name="estYear" type="number" placeholder="YYYY" value={formData.estYear} onChange={handleInputChange} />
                </div>

                <div className="form-grid">
                  <InputField label="NGO Darpan ID" name="darpanId" placeholder="e.g. DL/2021/0000" value={formData.darpanId} onChange={handleInputChange} />
                  <InputField label="PAN Number" name="panNumber" placeholder="AAAAA0000A" value={formData.panNumber} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Description</label>
                  <textarea
                    name="description"
                    className="form-input form-textarea"
                    placeholder="Briefly describe your mission..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="form-step fade-in">
                <div className="section-title">
                  <div className="icon-badge"><MapPin size={24} /></div>
                  <h2>Location Details</h2>
                </div>

                <div className="form-grid">
                  <SelectField label="State" name="state" required options={["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"]} value={formData.state} onChange={handleInputChange} error={errors.state} />
                  <InputField label="District" name="district" placeholder="District Name" value={formData.district} onChange={handleInputChange} />
                </div>

                <div className="form-grid">
                  <InputField label="City / Locality" name="city" required placeholder="e.g. Vasant Kunj" value={formData.city} onChange={handleInputChange} error={errors.city} />
                  <InputField label="Pincode" name="pincode" type="number" required placeholder="1100XX" value={formData.pincode} onChange={handleInputChange} error={errors.pincode} />
                </div>

                <div className="form-group">
                  <label className="form-label">Registered Address</label>
                  <textarea name="address" className="form-input form-textarea" rows="3" placeholder="Full street address..." value={formData.address} onChange={handleInputChange}></textarea>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {currentStep === 3 && (
              <div className="form-step fade-in">
                <div className="section-title">
                  <div className="icon-badge"><Phone size={24} /></div>
                  <h2>Contact Information</h2>
                </div>

                <div className="form-grid">
                  <InputField label="Contact Person Name" name="contactName" required placeholder="Full Name" value={formData.contactName} onChange={handleInputChange} error={errors.contactName} />
                  <InputField label="Role / Designation" name="contactRole" placeholder="e.g. Secretary" value={formData.contactRole} onChange={handleInputChange} />
                </div>

                <div className="form-grid">
                  <InputField label="Phone Number" name="phone" type="tel" required placeholder="+91 99999 99999" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
                  <InputField label="WhatsApp Number" name="whatsapp" type="tel" placeholder="+91 99999 99999" value={formData.whatsapp} onChange={handleInputChange} />
                </div>

                <div className="form-grid">
                  <InputField label="Email Address" name="email" type="email" required placeholder="contact@ngo.org" value={formData.email} onChange={handleInputChange} error={errors.email} />
                  <InputField label="Website (Optional)" name="website" type="url" placeholder="https://www.ngo.org" value={formData.website} onChange={handleInputChange} />
                </div>

                <div className="social-section">
                  <p className="form-label">Social Media Links (Optional)</p>
                  <div className="social-grid">
                    <div className="social-input-wrapper">
                      <Facebook className="social-icon" size={16} />
                      <input type="text" placeholder="Facebook URL" className="form-input social-input" />
                    </div>
                    <div className="social-input-wrapper">
                      <Instagram className="social-icon" size={16} />
                      <input type="text" placeholder="Instagram URL" className="form-input social-input" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Services */}
            {currentStep === 4 && (
              <div className="form-step fade-in">
                <div className="section-title">
                  <div className="icon-badge"><HandHeart size={24} /></div>
                  <h2>Services Offered</h2>
                </div>

                <p className="helper-text">Select all the areas where your NGO is actively working.</p>

                <div className="services-grid">
                  {[
                    "Orphan Support", "Elderly Care", "Digital Empowerment",
                    "Health & Medical", "Community Welfare", "Dignified Last Rites",
                    "Women Empowerment", "Animal Welfare"
                  ].map((service) => (
                    <div
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      className={`service-card ${formData.services.includes(service) ? 'selected' : ''} ${errors.services ? 'error' : ''}`}
                    >
                      <div className="checkbox-visual">
                        {formData.services.includes(service) && <CheckCircle2 size={14} />}
                      </div>
                      <span className="service-name">{service}</span>
                    </div>
                  ))}
                </div>
                {errors.services && <span className="error-msg" style={{ marginTop: '-10px', marginBottom: '20px' }}>{errors.services}</span>}

                <div className="form-group other-service">
                  <label className="form-label">Other Services (Optional)</label>
                  <input type="text" className="form-input" placeholder="Specify any other services..." />
                </div>
              </div>
            )}

            {/* Step 5: Documents */}
            {currentStep === 5 && (
              <div className="form-step fade-in">
                <div className="section-title">
                  <div className="icon-badge"><FileText size={24} /></div>
                  <h2>Documents & Verification</h2>
                </div>

                <div className="form-grid">
                  <FileUploadBox title="Registration Certificate" />
                  <FileUploadBox title="NGO Logo (High Res)" />
                  <FileUploadBox title="12A Certificate" optional />
                  <FileUploadBox title="80G Certificate" optional />
                </div>

                <div className="declaration-box">
                  <h3><Info size={18} /> Declaration</h3>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-text">
                      I hereby declare that the information provided above is true. I agree to the <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
                      {errors.agreeToTerms && <span className="error-msg">{errors.agreeToTerms}</span>}
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="button-group">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn btn-secondary"
              >
                <ChevronLeft size={20} /> Back
              </button>

              {currentStep < 5 ? (
                <button onClick={nextStep} className="btn btn-primary">
                  Next Step <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn btn-submit"
                >
                  Submit for Verification
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AddNGOPage;
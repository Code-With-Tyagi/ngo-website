import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const getRedirectPath = () => {
    const candidate = location.state?.redirectTo;
    if (typeof candidate === "string" && candidate.startsWith("/") && candidate !== "/login") {
      return candidate;
    }
    return "/";
  };

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Register state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ======================
      HANDLERS
     ====================== */

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setError("");
    setIsLogin(!isLogin);
    setLoginData({ email: "", password: "" });
    setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  /* ======================
      SUBMIT LOGIC
     ====================== */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      sessionStorage.setItem(
        "flash_message",
        JSON.stringify({ type: "success", message: "Logged in successfully." })
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      window.dispatchEvent(new Event("authChanged"));
      navigate(getRedirectPath(), { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      sessionStorage.setItem(
        "flash_message",
        JSON.stringify({ type: "success", message: "Account created successfully." })
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      window.dispatchEvent(new Event("authChanged"));
      navigate(getRedirectPath(), { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Icons as components for cleaner JSX
  const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.splitLayout}>

        {/* LEFT SIDE - SMILING CHILDREN IMAGE */}
        <div style={styles.imageSection}>
          <div style={styles.imageOverlay}>
            <h1 style={styles.brandTitle}>SevaIndia</h1>
            <p style={styles.brandQuote}>
              "Service to others is the rent you pay for your room here on earth."
            </p>
            <div style={styles.testimonial}>
              <div style={styles.avatar}>MA</div>
              <div style={styles.testimonialText}>
                <p style={styles.testimonialName}>Muhammad Ali</p>
                <p style={styles.testimonialRole}>Inspiration</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div style={styles.formSection}>
          <div style={styles.formContainer}>
            <div style={styles.header}>
              <h2 style={styles.title}>{isLogin ? "Welcome Back" : "Join the Movement"}</h2>
              <p style={styles.subtitle}>
                {isLogin
                  ? "Enter your details to access your account."
                  : "Create an account to start volunteering today."}
              </p>
            </div>

            {/* ERROR ALERT */}
            {error && (
              <div style={styles.errorBox}>
                <span style={styles.errorIcon}>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} style={styles.form} autoComplete="off">

              {/* Full Name (Register Only) */}
              {!isLogin && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    style={styles.input}
                    placeholder="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                    autoComplete="off"
                  />
                </div>
              )}

              {/* Email */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  style={styles.input}
                  placeholder="name@example.com"
                  value={isLogin ? loginData.email : registerData.email}
                  onChange={isLogin ? handleLoginChange : handleRegisterChange}
                  required
                  autoComplete="off"
                />
              </div>

              {/* Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    style={styles.input}
                    placeholder="password"
                    value={isLogin ? loginData.password : registerData.password}
                    onChange={isLogin ? handleLoginChange : handleRegisterChange}
                    required
                    autoComplete="new-password"
                  />
                  <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon} role="button">
                    {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
                  </span>
                </div>
              </div>

              {/* Confirm Password (Register Only) */}
              {!isLogin && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    style={styles.input}
                    placeholder="password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
              )}

              {/* Forgot Password Link (Login Only) */}
              {isLogin && (
                <div style={styles.forgotPass}>
                  <a href="#" style={styles.link}>Forgot password?</a>
                </div>
              )}

              <button type="submit" style={loading ? styles.disabledBtn : styles.submitBtn} disabled={loading}>
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={toggleMode} style={styles.toggleLink}>
                {isLogin ? "Sign up" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================
   PROFESSIONAL STYLES
   ====================== */

const styles = {


  container: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  splitLayout: {
    display: "flex",
    width: "100%",
    height: "100%",
    maxWidth: "1440px",
    backgroundColor: "white",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },

  // LEFT SIDE (UPDATED IMAGE)
  imageSection: {
    flex: "1",
    // Matches the vibe of your upload: Group of smiling Asian/Indian children
    backgroundImage: "url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "60px",
    color: "white",
    // Hide image on mobile
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  imageOverlay: {
    position: "relative",
    zIndex: 2,
    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(0px)",
  },
  brandTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "15px",
    letterSpacing: "-1px",
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },
  brandQuote: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    opacity: "0.95",
    marginBottom: "30px",
    fontStyle: "italic",
    textShadow: "0 1px 5px rgba(0,0,0,0.5)",
  },
  testimonial: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#F26522",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  testimonialText: {
    fontSize: "0.95rem",
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  },
  testimonialName: {
    fontWeight: "700",
    margin: 0,
  },
  testimonialRole: {
    opacity: "0.9",
    fontSize: "0.85rem",
    margin: 0,
  },

  // RIGHT SIDE (FORM)
  formSection: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#fff",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#666",
    fontSize: "1rem",
    lineHeight: "1.5",
  },

  // FORM ELEMENTS
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#344054",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #d0d5dd",
    fontSize: "1rem",
    color: "#1a1a1a",
    outline: "none",
    transition: "all 0.2s",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fcfcfc",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    opacity: "0.7",
  },
  forgotPass: {
    textAlign: "right",
    fontSize: "0.9rem",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "16px",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.05rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.1s",
    boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
  },
  disabledBtn: {
    marginTop: "10px",
    padding: "16px",
    backgroundColor: "#9e9e9e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.05rem",
    fontWeight: "600",
    cursor: "not-allowed",
  },

  // UTILS
  errorBox: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #fecaca",
  },
  link: {
    color: "#2e7d32",
    textDecoration: "none",
    fontWeight: "500",
  },
  toggleText: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#666",
  },
  toggleLink: {
    color: "#2e7d32",
    fontWeight: "700",
    cursor: "pointer",
    marginLeft: "5px",
  },

};

export default Login;
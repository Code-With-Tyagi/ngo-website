import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);

  const readUser = () => {
    const raw = localStorage.getItem("user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  // Auth state (reactive)
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [user, setUser] = useState(readUser());

  // Get first letter of name or default to 'U'
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
      setUser(readUser());
    };

    // Sync on custom auth change and cross-tab updates
    window.addEventListener("authChanged", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("authChanged", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = async (e) => {
    if (e) e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch("http://localhost:5000/api/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch {
      // Ignore errors
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("authChanged"));
      setMenuOpen(false);
      setServicesOpen(false);
      sessionStorage.setItem(
        "flash_message",
        JSON.stringify({ type: "success", message: "Logout successfully." })
      );
      navigate("/");
    }
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <span className="logo-icon">❤</span>
          <span className="logo-text">
            Seva<span>India</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>

          <li
            className="dropdown"
            onMouseEnter={() => setDesktopDropdown(true)}
            onMouseLeave={() => setDesktopDropdown(false)}
          >
            <span>Services ▾</span>
            <ul className="dropdown-menu" style={{ display: desktopDropdown ? 'block' : 'none' }}>
              <li><Link to="/services/orphanage" onClick={() => setDesktopDropdown(false)}>Orphanage Support</Link></li>
              <li><Link to="/services/elderly" onClick={() => setDesktopDropdown(false)}>Elderly Care</Link></li>
              <li><Link to="/services/digital" onClick={() => setDesktopDropdown(false)}>Digital Support</Link></li>
              <li><Link to="/services/dignified-rites" onClick={() => setDesktopDropdown(false)}>Dignified Rites</Link></li>
            </ul>
          </li>

          <li><Link to="/find-ngos">Find NGOs</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/volunteer">Volunteer</Link></li>
          <li><Link to="/add-ngo">Add Your NGO</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>

        </ul>

        {/* Auth / Profile Section */}
        <div className="navbar-auth">
          {isLoggedIn ? (
            <div className="dropdown profile-dropdown">
              {/* Profile Icon */}
              <div className="profile-icon" title={user?.name || "User"}>
                {userInitial}
              </div>

              {/* Profile Dropdown */}
              <ul className="dropdown-menu profile-menu-right">
                <li>
                  <Link to="/profile" className="profile-link">
                    👤 My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-logout-btn">
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <span>Menu</span>
          <button
            className="close-btn"
            onClick={() => {
              setMenuOpen(false);
              setServicesOpen(false);
            }}
          >
            ✕
          </button>
        </div>

        <ul>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/">Home</Link>
          </li>

          {/* MOBILE SERVICES ACCORDING */}
          <li
            className="mobile-services-toggle"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            <span>Services</span>
            <span className={`arrow ${servicesOpen ? "open" : ""}`}>▾</span>
          </li>

          {servicesOpen && (
            <ul className="mobile-submenu">
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/services/orphanage">Orphanage Support</Link>
              </li>
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/services/elderly">Elderly Care</Link>
              </li>
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/services/digital">Digital Support</Link>
              </li>
              <li onClick={()=> setMenuOpen(false)}>
                <Link to="/services/dignified-rites">Dignified Rites</Link>
              </li>
            </ul>
          )}

          <li onClick={() => setMenuOpen(false)}>
            <Link to="/find-ngos">Find NGOs</Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/donate">Donate</Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/volunteer">Volunteer</Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/add-ngo">Add Your NGO</Link>
          </li>

          {/* MOBILE PROFILE & LOGOUT */}
          {isLoggedIn ? (
            <>
              <li style={{ borderTop: "2px solid #f0f0f0", marginTop: "10px" }} onClick={() => setMenuOpen(false)}>
                <Link to="/profile" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div className="profile-icon mobile-icon">{userInitial}</div>
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-btn-mobile"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/login" style={{ color: "#2e7d32", fontWeight: "bold" }}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;

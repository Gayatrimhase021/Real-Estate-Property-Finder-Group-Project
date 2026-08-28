import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import {
  FiHome,
  FiHeart,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiShoppingCart,
  FiMenu,
  FiSun,
  FiMoon,
} from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();

  // Hamburger
  const [menuOpen, setMenuOpen] = useState(false);

  // Day / Night
  const [darkMode, setDarkMode] = useState(false);

  // Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // =========================
  // DAY / NIGHT
  // =========================
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;

      document.body.classList.toggle("dark-mode", newMode);

      return newMode;
    });
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);

    navigate("/login");

    setMenuOpen(false);
  };

  // =========================
  // CLOSE MENU
  // =========================
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* ================= LOGO ================= */}

      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        <FiHome />
        NestFinder
      </div>

      <div className="navbar-links">

        <button onClick={() => navigate("/")}>
          <FiHome />
          Home
        </button>

        <button onClick={() => navigate("/about")}>
          <FiInfo />
          About
        </button>

        <button onClick={() => navigate("/properties")}>
          <FiHome />
          Properties
        </button>

        <button onClick={() => navigate("/card")}>
          <FiShoppingCart />
          Card
        </button>

        <button onClick={() => navigate("/Wishlist")}>
          <FiHeart />
          Wishlist
        </button>

        {/* ================= LOGIN / LOGOUT ================= */}

        {isLoggedIn ? (
          <button onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>
            <FiLogIn />
            Login
          </button>
        )}

        {/* ================= DESKTOP THEME ================= */}

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

      </div>

      {/* ================= HAMBURGER ================= */}

      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiHome /> : <FiMenu />}
      </button>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        <button
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          Home
        </button>

        <button
          onClick={() => {
            navigate("/properties");
            closeMenu();
          }}
        >
          Properties
        </button>

        <button
          onClick={() => {
            navigate("/card");
            closeMenu();
          }}
        >
          Card
        </button>

        <button
          onClick={() => {
            navigate("/wishlist");
            closeMenu();
          }}
        >
          Wishlist
        </button>

        <button
          onClick={() => {
            navigate("/about");
            closeMenu();
          }}
        >
          About
        </button>

        {/* ================= MOBILE LOGIN / LOGOUT ================= */}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              closeMenu();
            }}
          >
            <FiLogIn />
            Login
          </button>
        )}

        {/* ================= MOBILE THEME ================= */}

        <button
          className="mobile-theme-btn"
          onClick={toggleTheme}
        >
          {darkMode
            ? "☀️ Day Mode"
            : "🌙 Night Mode"}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
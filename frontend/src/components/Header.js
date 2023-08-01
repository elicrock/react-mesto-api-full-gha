import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, link, linkText, email, signOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const updateWindowSize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      {
        isMobile && isLoggedIn && isMenuOpen && (
          <nav className="header__links header__links_mobile-open">
            <p className="header__email">{email}</p>
            <Link to={link} onClick={signOut && handleMenuClick} className="header__link header__link_islogin">
              {linkText}
            </Link>
          </nav>
        )
      }
      {
        isMobile && isLoggedIn ? (
          <button className="header__burger" onClick={handleMenuClick}>
            <span className={`header__burger-line ${isMenuOpen ? 'header__burger-line_close' : ''}`}></span>
          </button>
        ) : (
          <nav className="header__links">
            {isLoggedIn && <p className="header__email">{email}</p>}
            <Link to={link} onClick={signOut} className={`header__link ${isLoggedIn ? 'header__link_islogin' : ''}`}>
              {linkText}
            </Link>
          </nav>
        )
      }
    </header>
  );
}

export default Header;
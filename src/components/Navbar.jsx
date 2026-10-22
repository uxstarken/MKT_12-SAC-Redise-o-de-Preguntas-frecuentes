import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(124);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsNavbarVisible(true);
      return;
    }

    let lastScrollYVal = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYVal;
      lastScrollYVal = currentScrollY;

      if (isMobileMenuOpen) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
        return;
      }

      if (currentScrollY <= 80) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
        return;
      }

      // Si cambia de dirección el scroll, reiniciamos la acumulación
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      if (accumulatedDelta > 15) {
        setIsNavbarVisible(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -15) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen, location.pathname]);

  // Limpiar sesión al visitar el home page
  if (location.pathname === '/') {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  let logoSrc = '/logo.png';
  let logoStyle = {};

  let avatarBgColor = '#029E47';
  let roleLabel = 'Personas';

  if (isLoggedIn) {
    if (userRole === 'Somos Partner') {
      logoSrc = '/logo-starken-morado.png';
      logoStyle = { height: '40px' };
      avatarBgColor = '#411C72';
      roleLabel = 'Somos Partner';
    } else if (userRole === 'Empresas') {
      logoSrc = '/logo.png';
      logoStyle = { filter: 'hue-rotate(40deg) saturate(0.8) brightness(1.1)' };
      avatarBgColor = '#33798C';
      roleLabel = 'Empresas';
    } else {
      avatarBgColor = '#029E47';
      roleLabel = 'Personas';
    }
  }

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/select-role' || location.pathname.startsWith('/dashboard') || location.pathname === '/marketplace';
  if (isAuthPage) return null;

  const isHome = location.pathname === '/';

  return (
    <div className="navbar-wrapper" style={{ minHeight: `${navbarHeight}px` }}>
      <div 
        ref={navbarRef}
        className={`navbar-container ${!isHome ? 'navbar-static' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''} ${isHome && !isNavbarVisible ? 'navbar-hidden' : ''}`}
      >
      {/* Top Navigation Row */}
      <div className="top-nav">
        <div className="top-nav-segments">
          <a href="#personas" className="segment-link active">Personas</a>
          <a href="#emprendedores" className="segment-link">Emprendedores</a>
          <a href="#empresas" className="segment-link">Empresas</a>
          <a href="#internacional" className="segment-link">Internacional</a>
        </div>
        <Link to="/faq" className={`top-nav-help ${location.pathname === '/faq' ? 'active' : ''}`}>
          Centro de ayuda 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </Link>
      </div>

      {/* Main Navigation Row */}
      <nav className="main-nav">
        <div className="main-nav-left">
          <Link to="/" className="nav-brand-link">
            <img src={logoSrc} style={logoStyle} alt="Starken Logo" className="nav-logo" />
          </Link>
        </div>
        
        <div className="main-links">
          <a href="#envios" className="main-link">
            Envíos
            <svg className="chevron-down" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
          <a href="#puntos" className="main-link">Puntos red Starken</a>
          <a href="#servicios" className="main-link">Servicios</a>
          <a href="#tarifas" className="main-link">Tarifas</a>
        </div>
        
        <div className="main-nav-right">
          <div className="nav-actions">
            {isLoggedIn ? (
              <div className="nav-profile-container" style={{ position: 'relative' }}>
                <div 
                  className="nav-profile-active" 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '6px 12px',
                    borderRadius: '24px',
                    background: '#f3f4f6'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: avatarBgColor,
                    color: 'white',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}>
                    JP
                  </div>
                  <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#333', lineHeight: '1.2' }}>Juan Pérez</span>
                    <span style={{ fontSize: '11px', color: '#666', lineHeight: '1.2' }}>{roleLabel}</span>
                  </div>
                  <svg style={{ transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                
                {isProfileDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '44px',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 9999,
                    width: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '6px 0',
                    textAlign: 'left'
                  }}>
                    <Link
                      to="#"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      style={{
                        padding: '8px 16px',
                        textDecoration: 'none',
                        color: '#333',
                        fontSize: '13px',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                    >
                      Mi Panel (Dashboard)
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem('isLoggedIn');
                        setIsProfileDropdownOpen(false);
                        navigate('/');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '8px 16px',
                        textAlign: 'left',
                        fontSize: '13px',
                        color: '#b91c1c',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="#" className="btn-ingresar">Ingresar</Link>
            )}
          </div>

          {/* Hamburger Menu Toggle Button */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(true)} 
            aria-label="Abrir menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <img src="/logo.png" alt="Starken Logo" className="mobile-menu-logo" />
            <button 
              className="mobile-menu-close-btn" 
              onClick={() => setIsMobileMenuOpen(false)} 
              aria-label="Cerrar menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="mobile-menu-content">
            <div className="mobile-menu-links">
              <a href="#envios" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Envíos</span>
                <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
              <a href="#puntos" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Puntos red Starken</span>
                <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
              <a href="#servicios" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Servicios</span>
                <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
              <a href="#tarifas" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Tarifas</span>
                <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </div>
            
            <div className="mobile-menu-divider"></div>
            
            <Link to="/faq" className={`mobile-menu-help ${location.pathname === '/faq' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>Centro de ayuda</span>
            </Link>
            
            <div className="mobile-menu-actions">
              <Link to="#" className="mobile-btn-ingresar" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Ingresar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Navbar;

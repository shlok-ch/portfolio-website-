import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Code2, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onOpenResumeModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a href="#home" className="navbar-brand" onClick={(e) => handleNavClick(e, '#home')}>
          <div className="brand-badge">
            <span className="brand-initials">SC</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">Shlok Chaturvedi</span>
            <span className="brand-tag">PORTFOLIO</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                  {activeSection === link.id && <span className="active-dot" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <ThemeToggle />

          <button
            onClick={onOpenResumeModal}
            className="btn btn-primary btn-sm cv-download-btn"
            id="nav-download-cv-btn"
          >
            <Download size={15} />
            <span>Download CV</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass-card">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mobile-nav-action">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="btn btn-primary width-full"
              >
                <Download size={16} /> Download CV (PDF &amp; Word)
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

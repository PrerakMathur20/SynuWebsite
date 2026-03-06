import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme, Tooltip } from '@tokis/react';
import { DocsSearchModal, DocsSearchButton } from './DocsSearch';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M11.53 4.47l1.42-1.42M3.05 12.95l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.5 9.5A5.5 5.5 0 1 1 6.5 2.5a4 4 0 0 0 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/docs/installation', label: 'Installation' },
  { to: '/docs/introduction', label: 'Docs' },
  { to: '/playground', label: 'Playground' },
  { to: '/faq', label: 'FAQ' },
];

export function SiteNavbar() {
  const { mode, toggle } = useTheme();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isInDocs = location.pathname.startsWith('/docs');

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // cmd+K — docs only
  useEffect(() => {
    if (!isInDocs) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isInDocs]);

  return (
    <>
      <header className="site-navbar" role="banner">
        <div className="site-navbar__inner">
          {/* Logo */}
          <Link to="/" className="site-navbar__logo" aria-label="Tokis Home">
            <div className="site-navbar__logo-mark" aria-hidden="true">T</div>
            Tokis
          </Link>

          {/* Desktop nav */}
          <nav className="site-navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `site-navbar__link${isActive ? ' site-navbar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="site-navbar__actions">
            {isInDocs && <DocsSearchButton onClick={openSearch} />}

            <Tooltip content={`v${__APP_VERSION__}`} placement="bottom">
              <span className="site-navbar__version">v{__APP_VERSION__}</span>
            </Tooltip>

            <a
              href="https://github.com/PrerakMathur20/TokisLib"
              className="site-theme-toggle"
              aria-label="View on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
            </a>

            <button
              className="site-theme-toggle"
              onClick={toggle}
              aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="site-navbar__hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-backdrop"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        id="mobile-nav"
        ref={mobileMenuRef}
        className={`mobile-nav${mobileOpen ? ' mobile-nav--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <nav className="mobile-nav__links">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mobile-nav__footer">
          <button className="mobile-nav__theme-btn" onClick={toggle}>
            {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            <span>{mode === 'light' ? 'Dark mode' : 'Light mode'}</span>
          </button>
          <a
            href="https://github.com/PrerakMathur20/TokisLib"
            className="mobile-nav__github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <DocsSearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}

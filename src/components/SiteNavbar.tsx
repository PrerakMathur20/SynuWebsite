import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme, Tooltip } from '@synu/react';

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

export function SiteNavbar() {
  const { mode, toggle } = useTheme();

  return (
    <header className="site-navbar" role="banner">
      <div className="site-navbar__inner">
        <Link to="/" className="site-navbar__logo" aria-label="Synu Home">
          <div className="site-navbar__logo-mark" aria-hidden="true">S</div>
          Synu
        </Link>

        <nav className="site-navbar__nav" aria-label="Main navigation">
          <NavLink
            to="/docs/installation"
            className={({ isActive }) =>
              `site-navbar__link${isActive ? ' site-navbar__link--active' : ''}`
            }
          >
            Installation
          </NavLink>
          <NavLink
            to="/docs/introduction"
            className={({ isActive }) =>
              `site-navbar__link${isActive ? ' site-navbar__link--active' : ''}`
            }
          >
            Docs
          </NavLink>
          <NavLink
            to="/playground"
            className={({ isActive }) =>
              `site-navbar__link${isActive ? ' site-navbar__link--active' : ''}`
            }
          >
            Playground
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `site-navbar__link${isActive ? ' site-navbar__link--active' : ''}`
            }
          >
            About
          </NavLink>
        </nav>

        <div className="site-navbar__actions">
          <Tooltip content="Change Log — v0.1.0 initial release" placement="bottom">
            <span className="site-navbar__version">v0.1.0</span>
          </Tooltip>

          <a
            href="https://github.com/synudesign/synu"
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
        </div>
      </div>
    </header>
  );
}

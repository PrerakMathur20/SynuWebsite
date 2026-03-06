import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { navigation } from '../lib/navigation';

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
    style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 180ms ease', flexShrink: 0 }}>
    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DEFAULT_OPEN = new Set(['Getting Started', 'Foundations']);

function getSectionForPath(pathname: string): string | null {
  for (const section of navigation) {
    if (section.items.some((i) => pathname === i.path || pathname.startsWith(i.path + '/'))) return section.section;
    if (section.sectionPath && pathname === section.sectionPath) return section.section;
  }
  return null;
}

interface DocsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function DocsSidebar({ isOpen = false, onClose }: DocsSidebarProps) {
  const location = useLocation();

  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const active = getSectionForPath(location.pathname);
    const init = new Set(DEFAULT_OPEN);
    if (active) init.add(active);
    return init;
  });

  // Auto-expand active section; close drawer on mobile route change
  useEffect(() => {
    const active = getSectionForPath(location.pathname);
    if (active) {
      setOpenSections((prev) => {
        if (prev.has(active)) return prev;
        const next = new Set(prev);
        next.add(active);
        return next;
      });
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose?.();
    }
  }, [location.pathname]);

  // Lock body scroll only on mobile when open
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isMobile && isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleSection = useCallback((name: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  }, []);

  return (
    <aside
      className={`site-sidebar${isOpen ? ' site-sidebar--open' : ''}`}
      aria-label="Documentation navigation"
    >
      {/* Mobile close button — hidden on desktop via CSS */}
      <div className="site-sidebar__mobile-header">
        <span className="site-sidebar__mobile-title">Navigation</span>
        <button className="site-sidebar__mobile-close" onClick={onClose} aria-label="Close navigation">
          <CloseIcon />
        </button>
      </div>

      {navigation.map((section) => {
        const isExpanded = openSections.has(section.section);
        const isSectionActive = !!section.sectionPath && location.pathname === section.sectionPath;

        return (
          <div key={section.section} className="site-sidebar__section">
            <button
              type="button"
              className={`site-sidebar__section-toggle${isSectionActive ? ' site-sidebar__section-toggle--active' : ''}`}
              onClick={() => toggleSection(section.section)}
              aria-expanded={isExpanded}
            >
              {section.sectionPath ? (
                <Link
                  to={section.sectionPath}
                  className="site-sidebar__label site-sidebar__label--toggle site-sidebar__label--link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {section.section}
                </Link>
              ) : (
                <span className="site-sidebar__label site-sidebar__label--toggle">{section.section}</span>
              )}
              <ChevronIcon open={isExpanded} />
            </button>

            {isExpanded && (
              <div className="site-sidebar__section-items">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `site-sidebar__item${isActive ? ' site-sidebar__item--active' : ''}`
                    }
                  >
                    {item.label}
                    {item.badge && <span className="site-sidebar__badge">{item.badge}</span>}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

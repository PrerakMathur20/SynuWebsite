import React, { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteNavbar } from './SiteNavbar';
import { DocsSidebar } from './DocsSidebar';
import { TableOfContents } from './TableOfContents';
import { navigation } from '../lib/navigation';

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function DocsBar({ sidebarOpen, onToggle }: { sidebarOpen: boolean; onToggle: () => void }) {
  const { pathname } = useLocation();

  let sectionLabel = '';
  let pageLabel = '';

  for (const section of navigation) {
    const item = section.items.find((i) => i.path === pathname);
    if (item) { sectionLabel = section.section; pageLabel = item.label; break; }
    if (section.sectionPath === pathname) { pageLabel = section.section; break; }
  }

  return (
    <div className="docs-bar">
      <button
        className="docs-bar__toggle"
        onClick={onToggle}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={sidebarOpen}
      >
        <MenuIcon />
      </button>

      <nav className="docs-bar__breadcrumbs" aria-label="Page location">
        <span className="docs-bar__crumb docs-bar__crumb--root">Docs</span>
        {sectionLabel && (
          <>
            <span className="docs-bar__sep docs-bar__sep--section" aria-hidden="true">›</span>
            <span className="docs-bar__crumb docs-bar__crumb--section">{sectionLabel}</span>
          </>
        )}
        {pageLabel && (
          <>
            <span className="docs-bar__sep docs-bar__sep--page" aria-hidden="true">›</span>
            <span className="docs-bar__crumb docs-bar__crumb--page">{pageLabel}</span>
          </>
        )}
      </nav>
    </div>
  );
}

export function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar  = useCallback(() => setSidebarOpen(false), []);

  return (
    <>
      <SiteNavbar />
      <DocsBar sidebarOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={`site-docs-layout${sidebarOpen ? '' : ' site-docs-layout--sidebar-closed'}`}>
        {/* Backdrop — only appears on mobile via CSS */}
        <div
          className={`docs-sidebar-backdrop${sidebarOpen ? ' docs-sidebar-backdrop--visible' : ''}`}
          aria-hidden="true"
          onClick={closeSidebar}
        />

        <DocsSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="site-docs-content" id="main-content">
          <Outlet />
        </main>

        <TableOfContents />
      </div>
    </>
  );
}

export function LandingLayout() {
  return (
    <>
      <SiteNavbar />
      <Outlet />
    </>
  );
}

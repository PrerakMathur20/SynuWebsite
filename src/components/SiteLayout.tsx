import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@synu/react';
import { SiteNavbar } from './SiteNavbar';
import { DocsSidebar } from './DocsSidebar';
import { navigation } from '../lib/navigation';

function DocsBreadcrumbs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let sectionLabel: string | null = null;
  let itemLabel: string | null = null;

  for (const section of navigation) {
    const item = section.items.find((i) => i.path === pathname);
    if (item) {
      sectionLabel = section.section;
      itemLabel = item.label;
      break;
    }
  }

  if (!itemLabel) return null;

  const items = [
    { label: 'Docs', onClick: () => navigate('/docs/introduction') },
    ...(sectionLabel ? [{ label: sectionLabel }] : []),
    { label: itemLabel, current: true as const },
  ];

  return (
    <nav className="doc-breadcrumbs" aria-label="Page breadcrumb">
      <Breadcrumbs items={items} separator="›" />
    </nav>
  );
}

export function DocsLayout() {
  return (
    <>
      <SiteNavbar />
      <div className="site-docs-layout">
        <DocsSidebar />
        <main className="site-docs-content" id="main-content">
          <DocsBreadcrumbs />
          <Outlet />
        </main>
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

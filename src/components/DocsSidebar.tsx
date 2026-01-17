import React from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../lib/navigation';

export function DocsSidebar() {
  return (
    <aside className="site-sidebar" aria-label="Documentation navigation">
      {navigation.map((section) => (
        <div key={section.section} className="site-sidebar__section">
          <p className="site-sidebar__label">{section.section}</p>
          {section.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `site-sidebar__item${isActive ? ' site-sidebar__item--active' : ''}`
              }
            >
              {item.label}
              {item.badge && (
                <span className="site-sidebar__badge">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  );
}

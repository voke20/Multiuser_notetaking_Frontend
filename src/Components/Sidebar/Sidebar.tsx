import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import type { SidebarData } from '../../Type/type';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: SidebarData[] = [
    { icon: '☑', label: 'Dashboard', path: '/' },
    { icon: '🗒', label: 'All Notes', path: '/notes' },
    { icon: '🖄', label: 'Shared', path: '/notes/shared' },
    { icon: '📓', label: 'Send Email', path: '/notes/sendemail' },
    { icon: '🗠', label: 'Statistics', path: '/notes/statitics' },
  ];

  const bottomItems = [
    { icon: '⚙', label: 'Settings', path: '/settings' },
    { icon: '', label: 'Logout', path: '/logout' },
  ]; 

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <div>
            <h3>Notes App</h3>
            <p>Personal Workspace</p>
          </div>
        </div>

        <button className="new-note-btn" onClick={() => navigate('/notes/create')}>
          + New Note
        </button>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <div
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
import React from 'react';
import './Navbar.css';


const Navbar: React.FC = () => {
  return (
    <nav className= "navbar">

      <div className= "nav-search">
        <span>🔍</span>
        <input type="text" name="" placeholder='Search notes....' />
      </div>
      
      <div className="nav-tabs">
        <button className="tab active">Recent</button>
        <button className="tab pin">Pinned</button>
      </div>

      <div className="nav-right">
        <button className="nav-bell">🕭</button>
        <button className="nav-btn">Export</button>
        <button className="nav-btn primary">Share</button>
        <div className="nav-avatar">A</div>
      </div>
    </nav>
  );
};

export default Navbar;
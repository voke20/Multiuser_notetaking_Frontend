import React from 'react';
import './Navbar.css';


const Navbar: React.FC = () => {
  return (
    <nav className= "navbar">

      <div className= "nav-search">
        <span>🔍</span>
        <input type="text" name="" placeholder='Search notes....' />
      </div>
      
      <div className="nay-tabs">
        <button className="tab active">Recent</button>
        <button className="tab"></button>
      </div>

      <div className="nav-rig">
        <button className="nav-bell">🕭</button>
        <button className="export">Export</button>
        <button className="share-note primary">Share</button>
        <div className="nav-avatar">A</div>
      </div>
    </nav>
  );
};

export default Navbar;
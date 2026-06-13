import React, { useState } from 'react';
import './Navbar.css';
import ShareNote from '../../Pages/Notes/ShareNote/ShareNote';

const Navbar: React.FC = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
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
        <button className='nav-btn primary' onClick={() => setShareModalOpen(true)}>Share</button>
        <ShareNote isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} />
        <div className="nav-avatar">A</div>
      </div>
    </nav>
  );
};

export default Navbar;
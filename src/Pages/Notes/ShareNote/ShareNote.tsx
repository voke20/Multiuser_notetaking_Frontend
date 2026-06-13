import React, { useState } from 'react';
import './ShareNote.css';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareNote: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [searchInput, setSearchInput] = useState('');

  const accessList = [
    { id: 1, name: 'Sara Jenkins (You)', email: 'sara.j@notes.app', initials: 'SJ' },
    { id: 2, name: 'David Chen', email: 'd.chen@enterprise.com', initials: 'DC' },
    { id: 3, name: 'Marcus Kovac', email: 'm.kovac@odesign.io', initials: 'MK' },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <h2>Share Note</h2>
            <p>Manage who can see and edit this document</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="add-people">
          <label>ADD PEOPLE</label>
          <div className="search-row">
            <div className="search-input">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Name or email address.."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="access-list">
          <label>ACCESS LIST</label>
          {accessList.map(user => (
            <div key={user.id} className="access-item">
              <div className="user-avatar">{user.initials}</div>
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="copy-link-btn">🔗 Copy Share Link</button>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="send-btn">Send Invite</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShareNote;
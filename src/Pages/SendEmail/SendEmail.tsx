import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/Layout/Layout';
import './SendEmail.css';

const SendEmail: React.FC = () => {
  const { id : _id} = useParams();
  const navigate = useNavigate();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('Lumina Note: Project Lumina Roadmap 2024');
  const [message, setMessage] = useState('');
  const [includePDF, setIncludePDF] = useState(false);

  const handleSend = () => {
    console.log({ recipientEmail, subject, message, includePDF });
  };

  return (
    <DashboardLayout>
      <div className="send-email-page">

        <div className="send-email-header">
          <h1>Send via Email</h1>
          <p>Share this note securely with external recipients.</p>
        </div>

        <div className="note-preview-card">
          <span className="note-preview-icon">📄</span>
          <div>
            <h3>Project Lumina Roadmap 2024</h3>
            <p>Last edited 2 hours ago • 1.2 MB</p>
          </div>
        </div>

        <div className="send-email-form">

          <div className="form-group">
            <label>RECIPIENT EMAIL</label>
            <div className="input-with-icon">
              <span>✉️</span>
              <input
                type="email"
                placeholder="colleague@company.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>SUBJECT LINE</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>PERSONAL MESSAGE (OPTIONAL)</label>
            <textarea
              placeholder="Add a note to your email..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="includePDF"
              checked={includePDF}
              onChange={(e) => setIncludePDF(e.target.checked)}
            />
            <label htmlFor="includePDF">Include note as PDF attachment</label>
          </div>

          <div className="send-email-actions">
            <button className="send-btn" onClick={handleSend}>
              ▶ Send Email
            </button>
            <button className="cancel-btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default SendEmail;
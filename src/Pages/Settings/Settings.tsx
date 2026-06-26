import React, { useState } from 'react';
import DashboardLayout from '../../Components/Layout/Layout';
import './Settings.css';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [email, setEmail] = useState('alex@notes.app');
  const [phone, setPhone] = useState('+234 800 000 0000');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [shareNotifications, setShareNotifications] = useState(true);

  const sections = [
    { id: 'profile', icon: '👁', label: 'Profile' },
    { id: 'security', icon: '🗝', label: 'Security' },
    { id: 'notifications', icon: '🕭', label: 'Notifications' },
  ];

  return (
    <DashboardLayout>
      <div className="settings-page">

        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and workspace settings.</p>
        </div>

        <div className="settings-container">

          {/* Left Menu */}
            <div className="settings-menu">
                {sections.map(section => (
                <div
                    key={section.id}
                    className={`settings-menu-item ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.id)}
                >
                    <span>{section.icon}</span>
                    <span>{section.label}</span>
                </div>
                ))}
            </div>

          {/* Right Content */}
          <div className="settings-content">

            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="settings-section">
                <h2>Profile Settings</h2>
                <p>Update your personal information</p>

                <div className="avatar-section">
                  <div className="settings-avatar">A</div>
                  <button className="change-avatar-btn">Change Photo</button>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button className="save-btn">Save Changes</button>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="settings-section">
                <h2>Security Settings</h2>
                <p>Manage your password and account security</p>

                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>

                <button className="save-btn">Update Password</button>

                <div className="danger-zone">
                  <h3>Danger Zone</h3>
                  <p>Once you delete your account, there is no going back.</p>
                  <button className="delete-btn">Delete Account</button>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Preferences</h2>
                <p>Choose what notifications you receive</p>

                <div className="toggle-item">
                  <div>
                    <p className="toggle-label">Email Notifications</p>
                    <p className="toggle-desc">Receive updates via email</p>
                  </div>
                  <div
                    className={`toggle ${emailNotifications ? 'on' : ''}`}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                  />
                </div>

                <div className="toggle-item">
                  <div>
                    <p className="toggle-label">Share Notifications</p>
                    <p className="toggle-desc">Get notified when someone shares a note</p>
                  </div>
                  <div
                    className={`toggle ${shareNotifications ? 'on' : ''}`}
                    onClick={() => setShareNotifications(!shareNotifications)}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
import React, { useState } from 'react';
import DashboardLayout from '../../../Components/Layout/Layout';
import './SharedNote.css';

const SharedNote: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'withMe' | 'byMe'>('withMe');

  const sharedWithMe = [
    { id: 1, title: 'Q4 Strategy Roadmap', category: 'Strategy & Planning', owner: 'Elena Vance', lastActivity: '2h ago', access: 'View', trash: 'Delete'},
    { id: 2, title: 'API Documentation v2.4', category: 'Engineering', owner: 'Marcus Thorne', lastActivity: 'Yesterday', access: 'View', trash: 'Delete' },
    { id: 3, title: 'Brand Identity Guidelines', category: 'Design System', owner: 'Design Squad', lastActivity: 'Oct 12, 2023', access: 'View', trash: 'Delete' },
    { id: 4, title: 'Emergency Contact Procedures', category: 'Operations', owner: 'Sarah Connor', lastActivity: '3 days ago', access: 'View', trash: 'Delete' },
  ];

  const sharedByMe = [
    { id: 1, title: 'Project X Roadmap', sharedTo: 'Victor Chen', dateShared: 'Today, 12:45pm', access: 'View', delete: 'Delete' },
    { id: 2, title: 'Academic Project', sharedTo: 'Emmanuel Obi', dateShared: 'May 14, 12:45pm', access: 'View', delete: 'Delete' },
    { id: 3, title: 'Tech Pitch Deck', sharedTo: 'Sarah Connor', dateShared: 'Apr 20, 9:00am', access: 'View', delete: 'Delete' },
  ];

  return (
    <DashboardLayout>
      <div className="shared-page">

        <div className="shared-header">
          <h1>Shared Resources</h1>
          <p>Manage collaborative documents, permissions, and shared intelligence across your workspace.</p>
        </div>

        <div className="shared-tabs">
          <button
            className={`shared-tab ${activeTab === 'withMe' ? 'active' : ''}`}
            onClick={() => setActiveTab('withMe')}
          >
            Shared with Me
          </button>
          <button
            className={`shared-tab ${activeTab === 'byMe' ? 'active' : ''}`}
            onClick={() => setActiveTab('byMe')}
          >
            Shared by Me
          </button>
        </div>

        <div className="shared-table-container">
            {activeTab === 'withMe' ? (
            <table className="shared-table">
                <thead>
                    <tr>
                        <th>NOTE TITLE</th>
                        <th>OWNER</th>
                        <th>LAST ACTIVITY</th>
                        <th>ACCESS</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody >
                {sharedWithMe.map(note => (
                    <tr key={note.id} className='note-table'>
                        <td>
                            <div className="note-title-cell">
                                <span className="note-icon">📄</span>
                                <div>
                                    <p className="note-name">{note.title}</p>
                                    <p className="note-category">{note.category}</p>
                                </div>
                            </div>
                        </td>
                        <td>{note.owner}</td>
                        <td>{note.lastActivity}</td>
                        <td>
                            <button className={`action-btn view  ${note.access.toLowerCase()}`}>
                                {note.access}
                            </button>
                        </td>
                        <td>
                            <button className={`action-btn delete ${note.access.toLowerCase()}`}>
                                {note.trash}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <table className="shared-table">
                <thead>
                    <tr>
                        <th>NOTE TITLE</th>
                        <th>SHARED TO</th>
                        <th>DATE SHARED</th>
                        <th>ACCESS</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {sharedByMe.map(note => (
                        <tr key={note.id} className='note-table'>
                            <td>
                                <div className="note-title-cell">
                                    <span className="note-icon">📄</span>
                                    <p className="note-name">{note.title}</p>
                                </div>
                            </td>
                            <td>{note.sharedTo}</td>
                            <td>{note.dateShared}</td>
                            <td>
                                <button className={`action-btn edit ${note.access.toLowerCase()}`}>
                                    {note.access}
                                </button>
                            </td>
                            <td>
                                <button className={`action-btn delete ${note.access.toLowerCase()}`}>
                                    {note.delete}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}

            {/* Pagination */}
            <div className="pagination">
                <p>Showing {activeTab === 'withMe' ? sharedWithMe.length : sharedByMe.length} shared notes</p>
                <div className="page-buttons">
                    <button className='move'>{'<'}</button>
                    <button className="active">1</button>
                    <button className='move'>{'>'}</button>
                </div>
            </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default SharedNote;
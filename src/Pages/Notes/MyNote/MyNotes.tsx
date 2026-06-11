import React, {useState} from "react";
import DashboardLayout from "../../../Components/Layout/Layout";
import './MyNotes.css';


const MyNotes: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Research', 'Drafts', 'Personal'];

  const notes = [
    { id: 1, category: 'Research', title: 'Cognitive Load in Modern Interface Design', description: 'Analysis of how user mental capacity affects software...', time: '2 hours ago', pinned: false },
    { id: 2, category: 'Drafts', title: 'Q4 Product Roadmap Strategy', description: 'Priority features: AI-assisted tagging, collaborative real-time...', time: 'Yesterday', pinned: false },
    { id: 3, category: 'Personal', title: 'Reading List: Philosophy of Tech', description: '1. Technopoly by Neil Postman 2. Heidegger\'s Question Concerning...', time: 'Oct 12, 2023', pinned: false },
    { id: 4, category: 'Research', title: 'Meeting Minutes: Project Alpha', description: 'Stakeholder interview findings. Key pain points identified...', time: 'Edited 3 days ago', pinned: true },
    { id: 5, category: 'Drafts', title: 'UI Pattern Library Ideas', description: 'Exploration of glassmorphism variants for dashboard widgets...', time: 'Edited Oct 5, 2023', pinned: false },
    { id: 6, category: 'Work', title: 'System Architecture V2', description: 'Transitioning to event-driven microservices. Integration of Kafka...', time: 'Edited 1 week ago', pinned: false },
  ];

  const filteredNotes = activeFilter === 'All' 
    ? notes 
    : notes.filter(note => note.category === activeFilter);

    const handleEdit = (id: number) => {
    console.log('Edit note:', id);
    };

    const handleDelete = (id: number) => {
    console.log('Delete note:', id);
    };

  return (
    <DashboardLayout>
      <div className="mynotes-page">

        <div className="mynotes-title">
          <h1>My Notes</h1>
          <p>Manage your thoughts, research, and project drafts.</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="sort-by">
            <span>SORT BY:</span>
            <select>
              <option>Date Modified</option>
              <option>Date Created</option>
              <option>Title</option>
            </select>
          </div>

          <div className="filter-tabs">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="notes-count">Showing {filteredNotes.length} notes</span>
        </div>

        {/* Notes Grid */}
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <div key={note.id} className="note-card">
              <div className="note-card-header">
                <span className={`note-tag ${note.category.toLowerCase()}`}>
                  {note.category}
                </span>
                {note.pinned && <span className="lock-icon">🖈</span>}
              </div>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <div className="note-card-footer">
                <span className="note-time">{note.time}</span>
                <div className="note-actions">
                    <button className="action-btn edit" onClick={() => handleEdit(note.id)}>
                        ✎ Edit
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(note.id)}>
                        🗑 Delete
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAB */}
        <button className="fab">+</button>

      </div>
    </DashboardLayout>
  );
};

export default MyNotes;

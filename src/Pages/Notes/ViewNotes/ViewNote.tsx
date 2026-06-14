import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../Components/Layout/Layout';
import './ViewNote.css';

const ViewNote: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = {
    id: Number(id),
    title: 'Refining the Knowledge Management Architecture',
    content: `
      <p>The current architecture for Lumina's Knowledge Management system requires a shift from a centralized silo model to a distributed graph-based structure.</p>
      <h2>Proposed Structural Changes</h2>
      <ul>
        <li>Decouple metadata storage from binary blobs to improve search indexing speed by 40%</li>
        <li>Implement a bidirectional linking system using a vector-embedded context layer</li>
        <li>Introduce a 'Canvas' mode for non-linear thought mapping</li>
      </ul>
      <blockquote>The goal isn't just to store information, but to facilitate the synthesis of new insights through organic discovery paths.</blockquote>
    `,
    lastEdited: '2 hours ago',
    views: 4,
    tags: ['architecture', 'knowledge-graph', '#roadmap-2024'],
    category: 'Architecture',
    breadcrumb: 'Knowledge Base',
  };

  return (
    <DashboardLayout>
      <div className="viewnote-page">

        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Knowledge Base</span>
          <span> › </span>
          <span className="active">{note.category}</span>
        </div>

        <div className="viewnote-container">

          <div className="viewnote-main">

            <div className="viewnote-meta">
              <span>📅 Last edited {note.lastEdited}</span>
              <span>👁️ {note.views} views</span>
            </div>

            <h1 className="viewnote-title">{note.title}</h1>

            <div className="viewnote-actions">
              <button onClick={() => navigate(`/notes/edit/${id}`)}>✏️ Edit</button>
              <button className="delete">🗑️ Delete</button>
              <button>📤 Share</button>
              <button>📧 Send Email</button>
            </div>

            <div
              className="viewnote-content"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />

            <div className="viewnote-tags">
              <h3>ENTITIES & TAGS</h3>
              <div className="tags-list">
                {note.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

          </div>

          <div className="viewnote-sidebar">
            <div className="attachment-preview">
              <div className="attachment-header">
                <span>📄 Architecture v2 Draft.pdf</span>
              </div>
              <div className="attachment-thumb">
                <p>PDF Preview</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewNote;
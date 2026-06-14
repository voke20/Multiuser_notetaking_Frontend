import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../Components/Layout/Layout';
import './ViewNote.css';
import { GetNoteById, DeleteNote } from '../../../services/noteservices';
import type { NoteData } from '../../../Type/type';

const ViewNote: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async() => {
    try {
      setLoading(true);
      const data = await GetNoteById(Number(id));
      setNote(data);
    } catch (err: any) {
      setError(err.message || "Failed to load note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteNote(Number(id));
      navigate('/notes');
    } catch (err: any) {
      setError(err.message || 'Failed to delete note');
    }
  };

  if (loading) return <DashboardLayout><p className="loading">Loading note...</p></DashboardLayout>;
  if (error) return <DashboardLayout><p className="error-message">{error}</p></DashboardLayout>;
  if (!note) return <DashboardLayout><p>Note not found</p></DashboardLayout>;
  

  return (
    <DashboardLayout>
      <div className="viewnote-page">

        <div className="breadcrumb">
          <span onClick={() => navigate('/notes')}>My Notes</span>
          <span> , </span>
          <span className="active">{note.title}</span>
        </div>

        <div className="viewnote-container">

          <div className="viewnote-main">

            <div className="viewnote-meta">
              <span>Last edited {new Date (note.update_at).toLocaleDateString()}</span>
              <span>📝 {note.content_type}</span>
              {note.is_pinned && <span>📌 Pinned</span>}
            </div>

            <h1 className="viewnote-title">{note.title}</h1>

            <div className="viewnote-actions">
              <button onClick={() => navigate(`/notes/edit/${id}`)}>Edit</button>
              <button className="delete" onClick={handleDelete}>Delete</button>
              {/* <button onClick={()=> navigate(`/notes`)}>📤 Share</button> */}
              <button onClick={() => navigate(`/notes/${id}/send-email`)}>Send Email</button>
            </div>

            <div
              className="viewnote-content"
              dangerouslySetInnerHTML={{ __html: note.content }}
            /> 

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewNote;
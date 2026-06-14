import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../Components/Layout/Layout";
import './MyNotes.css';
import { useNavigate } from "react-router-dom";
import { GetNotes, DeleteNote } from "../../../services/noteservices";
import { GetCategories } from "../../../services/categoryservice";
import type { NoteData, Category } from "../../../Type/type";

const MyNotes: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setsortBy] = useState('Date Modified');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', ...categories.map(cat => cat.name)];

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const [notesData, categoriesData ] = await Promise.all([
        GetNotes(),
        GetCategories(),
      ]);
      setNotes(notesData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError (err.message || 'Failed to fetch notes')
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
  navigate(`/notes/edit/${id}`)
  };

  const handleDelete = async (id: number) => {
    try {
      await DeleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err: any) {
      setError (err.message || 'Failed to delete note');
    }
  };

  const filteredNotes = activeFilter === 'All' 
  ? notes 
  : notes.filter(note => {
    const category = categories.find(cat => cat.id === note.category)
    return category?.name === activeFilter;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'Date Modified') {
      return new Date(b.update_at).getTime() - new Date(a.update_at).getTime();
    }
    if (sortBy === 'Date Created') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'Title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) 
    return <DashboardLayout><p className="loading">Loading Notes...</p></DashboardLayout>
  if (error)
    return <DashboardLayout><p className="error-message">{error}</p></DashboardLayout>


  return (
    <DashboardLayout>
      <div className="mynotes-page">

        <div className="mynotes-title">
          <h1>My Notes</h1>
          <p>Manage your thoughts, research, and project drafts.</p>
        </div>

        <div className="filter-bar">
          <div className="sort-by">
            <span>SORT BY:</span>
            <select value={sortBy} onChange={(e)=> setsortBy(e.target.value)}>
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

          <span className="notes-count">Showing {sortedNotes.length} notes</span>
        </div>
        
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <p>No notes found. Create your first note!</p>
            <button className="btn-primary" onClick={() => navigate('/notes/create')}>
              + New Note
            </button>
          </div>
        ) : (

          <div className="notes-grid">
            {sortedNotes.map(note => (
              <div key={note.id} className="note-card" onClick={() => navigate(`/notes/${note.id}`)}>
                <div className="note-card-header">
                  <span className={`note-tag`}>
                    {note.category}
                  </span> 
                  {note.is_pinned && <span className="lock-icon">🖈</span>}
                </div>
                <h3>{note.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: note.content.substring(0, 100) + '...' }} />
                <div className="note-card-footer">
                  <span className="note-time">{formatDate(note.update_at)}</span>
                  <div className="note-actions">
                      <button 
                        className="action-btn edit" 
                        onClick={(e) =>{ e.stopPropagation(); handleEdit(note.id)}}>
                          ✎ Edit
                      </button>
                      <button 
                        className="action-btn deleted" 
                        onClick={(e) =>{e.stopPropagation(); handleDelete(note.id)}}>
                          🗑 Delete
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pagination">
          <p>Showing Notes</p>
          <div className="page-buttons">
            <button className='next-page'>{'<'}</button>
            <button className="active">1</button>
            <button className='next-page'>{'>'}</button>
          </div>
        </div>
         
        <button className="fab">+</button>

      </div>
    </DashboardLayout>
  );
};

export default MyNotes;

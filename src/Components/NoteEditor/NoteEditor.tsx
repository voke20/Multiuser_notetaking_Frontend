import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './NoteEditor.css';
import type { NoteEditorProps, Category } from '../../Type/type';
import { useNavigate } from 'react-router-dom';
import { CreateNote, UpdateNote, GetNoteById } from '../../services/noteservices';
import { GetCategories } from '../../services/categoryservice';
import { CreateCategory } from '../../services/categoryservice';


const NoteEditor: React.FC<NoteEditorProps> = ({ mode, noteId }) => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [contentType, setContentType] = useState('plain_text');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();


    const editor = useEditor({
        extensions: [StarterKit],
        content: '', 
        onUpdate: ({ editor }) => {
            const text = editor.getText();
            setWordCount(text.split(/\s+/).filter(Boolean).length);
        },
    });

    useEffect(() => {
        fetchCategories();
        if (mode === 'edit' && noteId) {
            fetchNote();
        }
    }, [mode, noteId, editor]);

    const fetchCategories = async () => {
    try {
        const data = await GetCategories();
        setCategories(data);
    } catch (err) {
        console.error('Failed to fetch categories');
    }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        console.log('Creating Category:', newCategory)
        try {
            const data = await CreateCategory({ name: newCategory });
            console.log('Category Created:', data)
            setCategories([...categories, data]);
            setSelectedCategory(data.id);
            setNewCategory('');
            setShowNewCategory(false);
        } catch (err) {
            console.error('Failed to create category');
            console.log('Category Failed:', err)
        }
        };

    const fetchNote = async () => {
    try {
        const data = await GetNoteById(noteId!);
        setTitle(data.title);
        setSelectedCategory(data.category);
        setContentType(data.content_type);
        editor?.commands.setContent(data.content);
    } catch (err: any) {
        setError('Failed to load note');
    }
    };

  const readingTime = Math.ceil(wordCount / 200);

  const handleSave = async () => {
    try {
        setSaving(true);
        const content = editor?.getHTML() || '';

        if (mode === 'create') {
        await CreateNote({
            title,
            content,
            content_type: contentType,
            category: selectedCategory || undefined,
            is_pinned: isPinned,
        });
        } else if (mode === 'edit' && noteId) {
        await UpdateNote(noteId, {
            title,
            content,
            content_type: contentType,
            category: selectedCategory || undefined,
            is_pinned: isPinned,
        });
        }
        navigate('/notes');
    } catch (err: any) {
        setError(err.message || 'Failed to save note');
    } finally {
        setSaving(false);
    }
    };
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="editor-page">

      <div className="editor-topbar">
        <button className="cancel-btn" onClick={handleCancel}>
          ✕ Cancel
        </button>
        {error && <span className="error-message">{error}</span>} 
        <span className="draft-status">{saving ? 'Saving...': 'Draft Saved'}</span>
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...': 'Save'}
        </button>
      </div>

      <div className="editor-container">
        <div className="editor-meta">
          <span className="editor-date">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="meta-divider">•</span>
          <div className="categories-row">
            <select
                className="category-select"
                value={selectedCategory?.toString() || ''}
                onChange={(e) => {
                    const val = e.target.value;
                    setSelectedCategory(val ? Number(val) : null);
                    }}
            >
                <option value="">No Category</option>
                    {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()} className="category-tag">{cat.name}</option>
            ))}
            </select>
            <button className="add-category-btn" onClick={() => setShowNewCategory(!showNewCategory)}>+</button>
            {showNewCategory && (
                <div className="new-category-input">
                <input
                    type="text"
                    placeholder="Category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add</button>
                </div>
            )}
          </div>
        </div>

        <input
          className="editor-title"
          placeholder="Untitled Note"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {editor && (
          <div className="editor-toolbar">
            <button
              className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <b>B</b>
            </button>
            <button
              className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <i>I</i>
            </button>
            <button
              className={`toolbar-btn ${editor.isActive('strike') ? 'active' : ''}`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <s>S</s>
            </button>
            <div className="toolbar-divider" />
            <button
              className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              ≡
            </button>
            <button
              className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              1≡
            </button>
            <div className="toolbar-divider" />
            <button
              className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              ❝
            </button>
            <button
              className={`toolbar-btn ${editor.isActive('codeBlock') ? 'active' : ''}`}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              {'<>'}
            </button>
            <button
                className={`toolbar-btn ${isPinned ? 'active' : ''}`}
                onClick={() => setIsPinned(!isPinned)}
                >
                📌
            </button>
          </div>
        )}

        <EditorContent editor={editor} className="editor-content" />

      </div>

      <div className="editor-stats">
        <div className="stat-item">
          <p className="stat-label">WORDS</p>
          <p className="stat-number">{wordCount}</p>
        </div>
        <div className="stat-item">
          <p className="stat-label">READING TIME</p>
          <p className="stat-number">~{readingTime} min</p>
        </div>
      </div>

    </div>
  );
};

export default NoteEditor;
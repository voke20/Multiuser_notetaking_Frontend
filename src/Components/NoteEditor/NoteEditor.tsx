import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './NoteEditor.css';
import type { NoteEditorProps } from '../../Type/type';

const NoteEditor: React.FC<NoteEditorProps> = ({ mode:_mode, noteId: _noteId }) => {
  const [title, setTitle] = useState('');
  const [categories] = useState(['Inspiration']);
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '', 
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setWordCount(text.split(/\s+/).filter(Boolean).length);
    },
  });

  const readingTime = Math.ceil(wordCount / 200);

  const handleSave = () => {
    const content = editor?.getHTML();
    console.log({ title, content, categories });
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
        <span className="draft-status">Draft saved at 12:45 PM</span>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>

      <div className="editor-container">
        <div className="editor-meta">
          <span className="editor-date">
            📅 {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="meta-divider">•</span>
          <div className="categories-row">
            {categories.map((cat, index) => (
              <span key={index} className="category-tag">{cat}</span>
            ))}
            <button className="add-category-btn">+</button>
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
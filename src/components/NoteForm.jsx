import React, { useState } from 'react';

const NoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ title, content });
    setTitle('');
    setContent('');
  };

  const isDisabled = !title.trim() || !content.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white bg-opacity-60 backdrop-blur-md p-6 rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm transition"
      />
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full px-4 py-2 border border-purple-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm transition"
      ></textarea>
      <button
        type="submit"
        disabled={isDisabled}
        className={`w-full bg-purple-700 text-white px-6 py-2 rounded font-semibold shadow hover:bg-purple-500 transition ${
          isDisabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        ➕ Add Note
      </button>
    </form>
  );
};

export default NoteForm;

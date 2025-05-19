import React from 'react';

const NoteList = ({ notes, onDelete }) => {
  if (!Array.isArray(notes) || notes.length === 0) {
    return <p className="text-center text-gray-500">No notes to show yet.</p>;
  }

  const handleCopy = (note) => {
    const fullText = `Title: ${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(fullText)
      .then(() => {
        alert('📝 Note copied to clipboard!');
      })
      .catch(() => {
        alert('❌ Failed to copy the note.');
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white border border-purple-100 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-200"
        >
          <h2 className="text-2xl font-semibold text-purple-700">{note.title}</h2>
          <p className="mt-3 text-gray-800 whitespace-pre-wrap">{note.content}</p>

          <div className="mt-5 flex justify-between">
            <button
              onClick={() => handleCopy(note)}
              className="px-4 py-1 bg-blue-100 text-blue-600 text-sm rounded hover:bg-blue-200 transition"
            >
              📋 Copy
            </button>

            <button
              onClick={() => onDelete(note._id)}
              className="px-4 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;

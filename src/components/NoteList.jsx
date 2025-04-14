import React from 'react';

const NoteList = ({ notes, onDelete }) => {
  if (!Array.isArray(notes)) {
    return <p className="text-center text-gray-500">No notes to show yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {notes.map((note) => (
        <div key={note._id} className="bg-white border rounded p-4 shadow-md">
          <h2 className="text-xl font-semibold text-purple-600">{note.title}</h2>
          <p className="mt-2 text-gray-700">{note.content}</p>
          <button
            onClick={() => onDelete(note._id)}
            className="mt-4 text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;

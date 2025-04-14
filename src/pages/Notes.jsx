// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NoteForm from '../components/NoteForm';
// import NoteList from '../components/NoteList';

// const Notes = () => {
//   const [notes, setNotes] = useState([]);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const userToken = localStorage.getItem('token');
//     setToken(userToken);
//     if (userToken) fetchNotes(userToken);
//   }, []);

//   const fetchNotes = async (authToken) => {
//     try {
//       const res = await axios.get('/api/notes', {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       setNotes(res.data);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   const addNote = async (note) => {
//     try {
//       const res = await axios.post('/api/notes', note, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setNotes([res.data, ...notes]);
//     } catch (error) {
//       console.error('Error adding note:', error);
//     }
//   };

//   const deleteNote = async (id) => {
//     try {
//       await axios.delete(`/api/notes/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setNotes(notes.filter(note => note._id !== id));
//     } catch (error) {
//       console.error('Error deleting note:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 px-6 bg-gradient-to-tr from-[#f0faff] via-[#fdf7ff] to-[#f7faff] relative overflow-hidden text-gray-800">
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         {/* Soft floating bubbles, etc */}
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-lg p-8">
//         <h1 className="text-4xl font-bold mb-6 text-center text-purple-600 drop-shadow-md">🌟 Your Notes Dashboard</h1>
//         <p className="text-center mb-8 text-lg text-gray-600">
//           Organize your thoughts, ideas, and tasks with ease.
//         </p>

//         <NoteForm onAdd={addNote} />
//         <div className="mt-10">
//           <NoteList notes={notes} onDelete={deleteNote} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notes;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(null);

  // Get backend base URL from environment variable
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);
    if (userToken) fetchNotes(userToken);
  }, []);

  const fetchNotes = async (authToken) => {
    try {
      const res = await axios.get(`${baseURL}/notes`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error.response?.data || error.message);
    }
  };

  const addNote = async (note) => {
    try {
      const res = await axios.post(`${baseURL}/notes`, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes([res.data, ...notes]);
    } catch (error) {
      console.error('Error adding note:', error.response?.data || error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${baseURL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-tr from-[#f0faff] via-[#fdf7ff] to-[#f7faff] relative overflow-hidden text-gray-800">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft floating bubbles, etc */}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-600 drop-shadow-md">🌟 Your Notes Dashboard</h1>
        <p className="text-center mb-8 text-lg text-gray-600">
          Organize your thoughts, ideas, and tasks with ease.
        </p>

        <NoteForm onAdd={addNote} />
        <div className="mt-10">
          <NoteList notes={notes} onDelete={deleteNote} />
        </div>
      </div>
    </div>
  );
};

export default Notes;

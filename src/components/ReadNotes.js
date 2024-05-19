import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFormTrash } from "react-icons/gr";
import { GrFormEdit } from "react-icons/gr";
import { GrFormAdd } from "react-icons/gr";

const ReadNotes = ({ notes, handleDeleteNote, handleOpenUpdateModal }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const confirmDelete = (noteId) => {
    setNoteToDelete(noteId);
    setShowConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteNote(noteToDelete);
    setNoteToDelete(null);
    setShowConfirmation(false);
  };

  const handleDeleteCancelled = () => {
    setNoteToDelete(null);
    setShowConfirmation(false);
  };

  // Function to handle navigation to another page
  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`); // Navigate to the desired page, e.g., `/note/${noteId}`
  };

  const handleUpdate = (noteid) => {
    navigate(`/notes/update/${noteid}`);
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className='text-xl uppercase tracking-wider text-neutral-400'>Notes</h2>
        {/* add notes page */}
        <button onClick={()=>navigate('/create-note')} className='text-2xl bg-black p-1.5 text-white rounded-lg hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-300 hover:rotate-45 transition-all'>
          <GrFormAdd />
        </button>
      </div>
      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        <ul className='mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {notes.map(note => (
            <li key={note._id} className='relative' >
              <div className="shadow-md rounded-lg h-full bg-neutral-50 p-4 hover:shadow-none hover:bg-neutral-200 transition-all cursor-pointer border-2 border-neutral-200">
                <div className="pb-6 h-full" onClick={() => handleNoteClick(note._id)}>
                  <h3 className='font-bold text-base truncate text-wrap'>{note.title}</h3>
                  <p className='text-sm text-neutral-600 truncate text-nowrap'>{note.content}</p>
                  <p className='text-[10px] mt-2'>{new Date(note.date).toLocaleString()}</p>
                </div>
                <div className="flex flex-row items-center gap-2 py-2 absolute bottom-0">
                  <button className='text-sm left-1/2 text-[18px]' onClick={() => handleUpdate(note._id)}><GrFormEdit /></button>
                  <button className='text-sm left-1/2 text-[18px]' onClick={(e) => { e.stopPropagation(); confirmDelete(note._id); }}><GrFormTrash /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md max-w-[90%] md:max-w-84">
            <div className="flex">
            </div>
            <p className='text-base'>Are you sure you want to delete this note?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleDeleteCancelled} className="bg-gray-200 text-gray-700 px-4 mr-2 py-2 rounded-lg text-base">Cancel</button>
              <button onClick={handleDeleteConfirmed} className="bg-red-500 text-white px-4 py-2  rounded-lg text-base">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadNotes;

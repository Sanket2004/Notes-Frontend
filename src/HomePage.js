import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadNotes from './components/ReadNotes';
import UpdateNote from './components/UpdateNote';
import Navbar from './components/Navbar';
// import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function HomePage() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null); // To store the selected note for updating

    // const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`);
                setNotes(response.data);
            } catch (error) {
                toast.error('Error fetching notes !');
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const fetchNotesAgain = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`);
            setNotes(response.data);
        } catch (error) {
            toast.error('Error fetching notes !');
            console.error('Error fetching notes:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${noteId}`);
            // After successfully deleting the note, fetch notes again to update the list
            fetchNotesAgain();
        } catch (error) {
            toast.error('Error deleting note !');
            console.error('Error deleting note:', error);
        }
    };

    const handleOpenUpdateModal = (noteId) => {
        // Set the selected note when opening the update modal
        const selected = notes.find(note => note._id === noteId);
        setSelectedNote(selected);
    };

    const handleCloseUpdateModal = () => {
        // Clear the selected note when closing the update modal
        setSelectedNote(null);
    };

    return (
        <>
            <Toaster position='top-center' />
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-24 pb-4">
                <ReadNotes notes={notes} handleDeleteNote={handleDeleteNote} handleOpenUpdateModal={handleOpenUpdateModal} />
                {selectedNote && <UpdateNote note={selectedNote} closeModal={handleCloseUpdateModal} fetchNotes={fetchNotesAgain} />}
            </div>
        </>
    );
}

export default HomePage;

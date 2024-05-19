import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { GrFormEdit, GrFormTrash } from "react-icons/gr";
import { toast, Toaster } from "react-hot-toast";

function NoteDetailsPage() {
    // Extract the note ID from the route parameters
    const { id } = useParams();
    const navigate = useNavigate();

    // State to store the note details
    const [noteDetails, setNoteDetails] = useState(null);

    // Define fetchNoteDetails function with useCallback
    const fetchNoteDetails = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`);
            setNoteDetails(response.data);
        } catch (error) {
            toast.error('Error fetching note details !');
            console.error('Error fetching note details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchNoteDetails();
    }, [fetchNoteDetails]);

    const handleUpdate = async () => {
        await navigate(`/notes/update/${id}`)
    }

    const handleDeleteNote = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`);
            // After successfully deleting the note, fetch notes again to update the list
            fetchNoteDetails();
            navigate(-1 || '/notes')
        } catch (error) {
            toast.error('Error deleting note !');
            console.error('Error deleting note:', error);
        }
    };

    return (
        <>
            <Toaster position='top-center' />
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-24 pb-4">
                <div className="flex flex-row justify-between items-center">
                    <h2 className='text-xl uppercase tracking-wider text-neutral-400'>Note Details</h2>
                    <div className="flex flex-row gap-2 items-center justify-end">
                        <GrFormEdit className='text-xl cursor-pointer' onClick={() => handleUpdate()} />
                        <GrFormTrash className='text-xl cursor-pointer' onClick={() => handleDeleteNote()} />
                    </div>
                </div>
                {noteDetails ? (
                    <div className='py-4'>
                        <header>
                            <h3 className='text-xl font-bold'>{noteDetails.title || 'Title'}</h3>
                            <p className='text-xs text-neutral-500 mt-2'>{new Date(noteDetails.date).toLocaleString()}</p>
                        </header>
                        <hr className="h-px my-4 bg-neutral-400 border-0" />
                        <section className=''>
                            <p className='break-words text-wrap whitespace-break-spaces'>{noteDetails.content}</p>
                        </section>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}

export default NoteDetailsPage;

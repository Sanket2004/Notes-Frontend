import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({ title: false, content: false });
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`);
            setNotes(response.data);
        } catch (error) {
            toast.error('Error fetching notes !');
            console.error('Error fetching notes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset errors
        setErrors({ title: !title, content: !content });

        if (!title || !content) {
            return; // Do not submit if there are errors
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, { title, content });
            console.log('New note created:', response.data);
            // Fetch notes again after successfully creating a note
            fetchNotes();
            setTitle('');
            setContent('');
            // Navigate to /notes after successful submission
            navigate('/notes');
        } catch (error) {
            toast.error('Error creating note !')
            console.error('Error creating note:', error);
        }
    };

    return (
        <>
            <Toaster position='top-center' />
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-24 pb-4">
                <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-8'>
                    <h1 className='text-xl uppercase tracking-wider text-neutral-400'>Create Note</h1>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`border-0 text-5xl lg:text-7xl border-b-2 ${errors.title ? 'border-red-500 placeholder:text-red-300' : 'border-neutral-300'} focus:outline-none focus:${errors.title ? 'border-red-500' : 'border-black'} font-extrabold placeholder:text-neutral-300 focus:placeholder:text-neutral-400`}
                            placeholder='Enter a title' />
                        {errors.title && <p className='text-red-500 font-bold text-sm py-2'>TITLE IS REQUIRED</p>}
                    </div>
                    <div className="flex flex-col">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Description'
                            className={`border-0 text-5xl lg:text-7xl border-b-2 ${errors.content ? 'border-red-500 placeholder:text-red-300' : 'border-neutral-300'} focus:outline-none focus:${errors.content ? 'border-red-500' : 'border-black'} font-extrabold resize-none placeholder:text-neutral-300 h-48 focus:placeholder:text-neutral-400 min-h-max`} />
                        {errors.content && <p className='text-red-500 font-bold text-sm py-2'>CONTENT IS REQUIRED</p>}
                    </div>
                    <button type="submit" className='bg-black text-white py-4 rounded-lg max-w-48 hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-400 focus:outline-none'>Create Note</button>
                </form>
            </div>
        </>
    );
};

export default CreateNote;

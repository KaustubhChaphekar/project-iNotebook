import React, { useContext, useEffect, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import EditNote from './EditNote';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes, deleteNote, addNote, editNote } = context;
    const [editingNote, setEditingNote] = useState(null);
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message
    const [alertType, setAlertType] = useState("success"); // State for alert type
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getNotes();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const startEdit = (note) => {
        setEditingNote(note);
    };

    const closeEdit = () => {
        setEditingNote(null);
    };

    const handleAddNote = (title, description, tag) => {
        addNote(title, description, tag);
        setAlertMessage("Note added successfully!");
        setAlertType("success");
    };

    const handleEditNote = (id, title, description, tag) => {
        editNote(id, title, description, tag);
        setAlertMessage("Note edited successfully!");
        setAlertType("success");
    };

    const handleDeleteNote = (id) => {
        deleteNote(id);
        setAlertMessage("Note deleted successfully!");
        setAlertType("error");
    };

    const closeAlert = () => {
        setAlertMessage(""); // Clear the alert message
    };

    // Filter notes based on searchTerm
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
           {alertMessage && (
                <div className="fixed w-full top-12 left-0 flex justify-center z-50">
                    <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage("")} />
                </div>
            )}
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/3 p-4 mt-16'>
                    <AddNote onAdd={handleAddNote} />
                </div>

                <div className='w-full md:w-2/3 p-4 mt-16'>
                    <div className="mb-4 flex flex-col gap-4 m-6">
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 text-blue-700 border rounded-md"
                        />
                        <h2 className="text-lg font-bold">Your Notes</h2>
                        {filteredNotes.length === 0 && <p>No notes to display</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[31rem]">
                            {filteredNotes.map((note) => (
                                <div key={note._id}>
                                    <NoteItem
                                        note={note}
                                        onEdit={startEdit}
                                        onDelete={handleDeleteNote}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {editingNote && (
                    <EditNote note={editingNote} closeEdit={closeEdit} onEdit={handleEditNote} />
                )}
            </div>
        </>
    );
};

export default Notes;

import React, { useState } from 'react';
import { NoteContext } from "./NoteContext";


const NoteState = (props) => {

  const host = "http://localhost:3000"
  const [notes, setNotes] = useState([])

  //Get All Notes 
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json()
    setNotes(json)
  }


  //ADD a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    });

    //Logic to add in client side
    const note = await response.json()
    setNotes(notes.concat(note));
  }


  //EDIT a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    });
  
    const json = await response.json(); // Fixed line

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
    
  }


  //DELETE a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json()

    // Filter out the note with the given id
   const newNotes = notes.filter((note) => note._id !== id);
 

    // Update the notes state with the filtered notes
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState
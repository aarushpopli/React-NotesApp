import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [alert, setAlert] = useState(null);
    const showAlert= (message, type)=>{
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1000);
    }
    const [notes, setNotes] = useState(notesInitial)

    const getUser = async ()=>{
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        localStorage.setItem("name", json.name);
    }

    const getNote = async () =>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async (title, description, tag) =>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    const deleteNote = async (id) =>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        // eslint-disable-next-line
        const json = await response.json();
        const newNotes = notes.filter((notes)=>{return notes._id !== id})
        setNotes(newNotes);
        showAlert("Note Deleted", "success");
    }

    const editNote = async (id, title, description, tag) =>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // eslint-disable-next-line
        const json = await response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            } 
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNote, showAlert, getUser, alert}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
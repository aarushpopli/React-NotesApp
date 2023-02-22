import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote, showAlert } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const addnote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        showAlert("Note Added", "success");
        document.getElementById("note-form").reset();
        setNote({ title: "", description: "", tag: "" });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const clearnote = () =>{
        setNote({ title: "", description: "", tag: "" });
        document.getElementById("note-form").reset();
        showAlert("Note Cleared", "success");
    }
    return (
        <div>
            <h1>Add a Note</h1>
            <form className="row g-1" id='note-form'>
                <div className="form-floating mb-2 col-md-8 pe-1">
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHere" onChange={onChange} placeholder="Enter title" />
                    <label htmlFor="title" className="form-label" minLength={3} required>Title (atleast 3 characters)</label>
                </div>

                <div className="form-floating mb-2 col-md-4 ps-1">
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="tagHere" onChange={onChange} placeholder="Enter tag" />
                    <label htmlFor="tag" className="form-label">Tag (optional)</label>
                </div>
                
                <div className="form-floating mb-2">
                    <textarea className="form-control" id="description" rows="5" name="description" style={{"height": "150px"}} onChange={onChange} placeholder="Enter description"></textarea>
                    <label htmlFor="description" className="form-label" minLength={5} required>Description (atleast 5 characters)</label>
                </div>
            </form>
            <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-success" onClick={addnote} id="liveToastBtn">Add Note</button>
            <button disabled={note.title.length < 1 && note.description.length < 1} type="reset" className="btn btn-danger float-end" onClick={clearnote} id="liveToastBtn">Clear All</button>
        </div>
    )
}

export default AddNote
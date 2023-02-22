import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

const Notes = () => {
    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const { notes, getNote, editNote, showAlert } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    const editnote = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        showAlert("Note Updated", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-1" id='note-form'>
                                <div className="form-floating mb-2 col-md-8 pe-1">
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="titleHere" onChange={onChange} placeholder="name@example.com" />
                                    <label htmlFor="etitle" className="form-label" minLength={3} required>Title</label>
                                </div>
                                <div className="form-floating mb-2 col-md-4 ps-1">
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="tagHere" onChange={onChange} placeholder="General" />
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <textarea className="form-control" id="edescription" rows="5" name="edescription" value={note.edescription} style={{ "height": "150px" }} onChange={onChange} placeholder="Enter description"></textarea>
                                    <label htmlFor="edescription" className="form-label" minLength={5} required>Description</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={editnote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h1 className='mt-2'>Your Notes</h1>
                <div className='container mx-1 text-muted'>{notes.length === 0 && 'No notes to display'}</div>
                {notes.map((notes) => {
                    return <NoteItem notes={notes} updateNote={updateNote} key={notes._id} />;
                })}
            </div>
        </>
    )
}

export default Notes
import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { notes, updateNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    return (
        <div className='col-md-3 p-2'>
            <div className="card">
                <div className="card-body">
                    <span className="badge bg-primary my-1 float-end">{notes.tag}</span>
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <i className="bi bi-pencil-square text-primary" style={{"fontSize": "1.3rem"}} onClick={()=>{updateNote(notes)}}></i>
                    <i className="bi bi-file-earmark-x-fill text-danger mx-2" style={{"fontSize": "1.3rem"}} onClick={()=>{deleteNote(notes._id)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
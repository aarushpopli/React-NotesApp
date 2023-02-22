import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Alert = () => {
    const context = useContext(NoteContext);
    const { alert } = context;
    return (
        <div className='pt-2' style={{height: '45px', verticalAlign: 'middle'}}>
            {alert && <div className='container mb-0'>
                <div className={`alert alert-${alert.type} p-2`} role="alert">
                    {alert.msg}
                </div>
            </div>}
        </div>
    )
}

export default Alert
import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import NoteContext from "../context/notes/NoteContext"

const Navbar = () => {
    const context = useContext(NoteContext);
    const { showAlert } = context;

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
        showAlert("Logged Out", "success");
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Notes App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <div className="d-flex">
                        <Link className="btn btn-light mx-1" to="/login" role="button">Log In</Link>
                        <Link className="btn btn-light mx-1" to="/signup" role="button">Sign Up</Link>
                    </div> : <div className="d-flex">
                        <div className="nav-link text-light" id='nameid' style={{cursor: "default", userSelect: "none"}}>Hi, {localStorage.getItem("name")}</div>
                        <Link className="btn btn-light mx-1" to="/login" role="button" onClick={handleLogout}>Log Out</Link>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/NoteContext"

const Login = () => {
    const context = useContext(NoteContext);
    const { showAlert, getUser } = context;

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            showAlert("Login Successful", "success");
            await getUser();
            // document.getElementById('nameid').innerHTML = "Hi, " + localStorage.getItem("name");
        }
        else {
            showAlert("Invalid credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container col-md-6 mt-3'>
            <h2>Welcome to Notes App</h2>
            <div className="card">
                <div className="card-header">Log In</div>
                <div className="card-body">
                    <form className='g-1' onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name='email' id="authEmail" value={credentials.email} onChange={onChange} placeholder="Enter email" required />
                            <label htmlFor="authEmail" className="form-label">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" name='password' id="authPassword" value={credentials.password} onChange={onChange} minLength={8} placeholder="Enter password" required />
                            <label htmlFor="authPassword" className="form-label">Password</label>
                        </div>
                        <button disabled={credentials.password.length < 8} type="submit" className="btn btn-primary col-md-2 float-end">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
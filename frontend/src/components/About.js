import React from 'react'

const About = () => {
    return (
        <>
        <div className='container'>
            <div className="container-fluid">
                <h1 className="display-5 fw-bold">About</h1>
                <p className="fs-4">Notes App allows you to keep all your notes in one place. Whether it be your meeting notes or a grocery list, you can keep it here securely. This website works with any browser such as Chrome, Firefox, Safari, Edge, and others. It is made using React JS.</p>
            </div>
        </div>

        <footer className="footer px-5 bg-dark d-flex flex-wrap justify-content-between align-items-center py-2" style={{position:"fixed", bottom:"0", width:"100%"}}>
            <div className="col-md-4 d-flex align-items-center">
                <span className="text-light">Created By: Aarush Popli </span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-1"><a className='text-light' href="https://linkedin.com/in/aarushpopli" target={'_blank'} rel="noreferrer"><i className="bi bi-linkedin mx-2" style={{ fontSize: "25px" }}></i></a></li>
                <li className="ms-1"><a className='text-light' href="https://github.com/Aarush-Popli" target={'_blank'} rel="noreferrer"><i className="bi bi-github mx-2" style={{ fontSize: "25px" }}></i></a></li>
            </ul>
        </footer>
        </>
    )
}
//className={`text-${props.mode === 'light'?'dark':'light'}`}
export default About
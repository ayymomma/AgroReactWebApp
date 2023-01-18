import React from 'react';
import Sidenav from './Sidenav';
import "./Fields.css"


export default function Fields() {
    return (
        
        <div className='fieldsPage'>
            <Sidenav/>
            <div className='fieldsText'>
                    <h1>Fields</h1>
                    {/* add a href for log out */}
                    <a onClick={() => {localStorage.removeItem('token'); localStorage.removeItem('username')}} href="/login">Log out</a>
            </div>
        </div>
    )
}

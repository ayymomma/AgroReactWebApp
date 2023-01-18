import React from 'react';
import Sidenav from './Sidenav';
import './Contracts.css';

export default function Contracts() {
    return (
        <div className='contractsPage'>
            <Sidenav/>
            <div className='contractsText'>
                    <h1>Contracts</h1>
                    {/* add a href for log out */}
                    <a onClick={() => {localStorage.removeItem('token'); localStorage.removeItem('username')}} href="/login">Log out</a>
            </div>
        </div>
    )
}
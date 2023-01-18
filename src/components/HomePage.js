import React from "react";
import "./HomePage.css";
import Sidenav from "./Sidenav";

export default function HomePage() {

    return (
        <div className="HomePage">
            <Sidenav/>
            <div className='homeText'>
                    <h1>Home</h1>
                    {/* add a href for log out */}
                    <a onClick={() => {localStorage.removeItem('token'); localStorage.removeItem('username')}} href="/login">Log out</a>
            </div>
        </div>
    );
}

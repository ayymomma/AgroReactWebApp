import { navData } from "../lib/navData";
import "./Sidenav.css";
import { NavLink } from "react-router-dom";

export default function Sidenav() {
    return (
        <div className="sidenav">
            {
            navData.map(item =>{
                return <NavLink key={item.id} className="sideitem" to={item.link}>
                        {item.icon}
                        <span className="linktext">{item.text}</span>
                        </NavLink>
                })
            }
        </div>
    )
}
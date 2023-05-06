import React,{useState} from 'react';
import { NavLink } from "react-router-dom";
import '../navbar.css';


function Navbar() {
    const [active,setActive]=useState("nav_menu");
    const [toggleIcon, setToggleIcon]= useState('nav_toggler');
    const navToggle=()=>{
        active ==='nav_menu'? setActive('nav_menu nav_active'): setActive('nav_menu');
        

        // Togglericon
        toggleIcon === 'nav_toggler'? setToggleIcon('nav_toggler toggle'): setToggleIcon('nav_toggler');
    }
    return(
        <nav className='nav'>
            <NavLink exact to="/" className='nav_brand'>BLOCKCHAIN PROJECT</NavLink>
            <ul className={active}>
                <li className='nav_item'><NavLink style={({isActive})=>{return {color: isActive?'lightgreen':''}}} exact to="/" className='nav_link'>HOME</NavLink></li>
                <li className='nav_item'><NavLink style={({isActive})=>{return {color: isActive?'lightgreen':''}}}exact to="/upload" className='nav_link'>UPLOAD</NavLink></li>
                <li className='nav_item'><NavLink style={({isActive})=>{return {color: isActive?'lightgreen':''}}}exact to="/display" className='nav_link'>DISPLAY</NavLink></li>
                <li className='nav_item'><NavLink style={({isActive})=>{return {color: isActive?'lightgreen':''}}}exact to="/privilege" className='nav_link'>PRIVILEGE</NavLink></li>
                <li className='nav_item'><NavLink style={({isActive})=>{return {color: isActive?'lightgreen':''}}}exact to="/about" className='nav_link'>ABOUT</NavLink></li>
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
            </div>
        </nav>
    );
}

export default Navbar;
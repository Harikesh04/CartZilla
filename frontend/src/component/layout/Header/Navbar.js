import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import logo from "../../../images/navlogo.png";
import { RiLoginCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';

import { GoX } from 'react-icons/go';

const Navbar = () => {

    const [clicked, setClicked] = useState(false)
    console.log(clicked);
   
  return (
    <>
    <div className="nav-conatiner">
        <div className="nav-logo">
        <a href="/">
          <Link to="/">
            <img src={logo} alt="logo" className="nav-logo-img"></img>
          </Link>
        </a>

        </div>
        <div id="nav-links" className={clicked? "#nav-links active": "#nav-links"} >
        <NavLink
            to="/"
            exact
            activeClassName="active"
            className="navlinks"
          >
            Home
          </NavLink>
        <NavLink
            to="/products"
            exact
            activeClassName="active"
            className="navlinks"
          >
            Products
          </NavLink>
        <NavLink
            to="/search"
            exact
            activeClassName="active"
            className="navlinks"
          >
            Search
          </NavLink>
          <NavLink
            to="/cart"
            exact
            activeClassName="active"
            className="navlinks"
          >
            Cart
          </NavLink>
        <NavLink
            to="/about"
            exact
            activeClassName="active"
            className="navlinks"
          >
            About Us
          </NavLink>
        <NavLink
            to="/contact"
            exact
            activeClassName="active"
            className="navlinks"
          >
           Contact Us
          </NavLink>
          <NavLink
            to="/login"
            exact
            activeClassName="active"
            className="navlinks"
          >
            <RiLoginCircleFill/>
           
            Login
          </NavLink>

         
        

            

        </div>
        <div id='mobile' className='hamburger' onClick={() => setClicked((prev) => !prev)}>
       
            {clicked===false?<GiHamburgerMenu/>:<GoX/>}
          </div>

    </div>
    
    </>
  )
}

export default Navbar
import React, { Fragment } from 'react'
import logo from "../../../images/logo.png";
import "./Footer.css"
const Footer = () => {
  return (
   <Fragment>
       <footer id="footer">
            
           <div className="leftfooter">
               <h1>Get to Know Us </h1>
              
              <a href="/about">About Us</a>
              <p>Careers</p>
              <p>Press Releases</p>
              <p>CartZilla Cares</p>
              <p>Gift a smile</p>
              
              
           </div>
           <div className="midfooter">
                <a href="/">CartZilla </a>
               
                <p>Copyrights 2022 &copy; HarikeshSingh</p>
           </div>
           <div className="rightfooter">
               <h1>Links </h1>
               <a href="https://www.linkedin.com/in/harikesh-singh-506503202/">LinkedIn</a>
               <a href="https://www.instagram.com/harikeshsingh_/">Instagram</a>
               <a href="facebook.com">Facebook</a>
               <a href="/Contact">ContactUs</a>

           </div>
          
            
           
       </footer> 
      
       </Fragment>
  )
}

export default Footer
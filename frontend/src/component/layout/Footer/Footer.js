import React from 'react'
import applogo from "../../../images/applogo.png";
import playlogo from "../../../images/playlogo.png"
import "./Footer.css"
const Footer = () => {
  return (
       <footer id="footer">
            
           <div className="leftfooter">
                <h3>Download our app</h3>
                <p>Download app for android and IOS mobile phone</p>
                <img src={applogo} alt="applestore" />
                <img src={playlogo} alt="googleplaystore" />
           </div>
           <div className="midfooter">
                <h1>CartZilla</h1>
                <p>High quality is our first priority</p>
                <p>Copyrights 2022 &copy; HarikeshSingh</p>
           </div>
           <div className="rightfooter">
               <h4>Follow us</h4>
               <a href="Google.com">Twitter</a>
               <a href="Google.com">Instagram</a>
               <a href="Google.com">Facebook</a>

           </div>
       </footer> 
  )
}

export default Footer
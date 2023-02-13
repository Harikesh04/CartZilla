import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import Footer from "../layout/Footer/Footer"

const Contact = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    alert.success("Message sent successfully");
    navigate("/")
  }
  return (
    <>
    <Fragment>
      <div className="contactcontainer">
        <form className="contactUsform" onSubmit={submit}>
          <h3>GET IN TOUCH </h3>
          <input type="text" id="name" placeholder="Enter Your Name" required />
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            required
          />
          <textarea
            id="message"
            rows="4"
            placeholder="How Can I Help You"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      
      
    </Fragment>
   
    </>

  );
};

export default Contact;

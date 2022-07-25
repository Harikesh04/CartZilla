import React, { Fragment } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";



const NotFound = () => {
  return (
    <Fragment>
      <div className="PageNotFound">
        <ErrorIcon />

        <Typography>Page Not Found </Typography>
        <Link to="/">Home</Link>
      </div>
    </Fragment>
  );
};

export default NotFound;

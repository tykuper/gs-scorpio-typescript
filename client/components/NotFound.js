import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div className="container text-center">
      <div className="row">
        <h1 className="section-title">
          The page at {props.location.pathname} does not exist!
        </h1>
        <img src="/images/confused-orca.png" />
        <Link to={"/home"}>
          <button className="btn btn-primary btn-lg">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div className="container text-center">
      <div className="row">
        <h1 className="section-title">Not authorized to access page!</h1>
        <img src="/images/sus-orca.jpeg" />
        <Link to={"/home"}>
          <button className="btn btn-primary btn-lg">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

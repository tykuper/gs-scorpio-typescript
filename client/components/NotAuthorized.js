import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = (props) => {
  return (
    <div className="container text-center">
      <div className="row">
        <h1 className="section-title">Not authorized to access page!</h1>
        <img src="/images/sus-orca.jpeg" />
        <Link to={"/home"}>
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

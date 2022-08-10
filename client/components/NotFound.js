import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = (props) => {
  return (
    <div className="container text-center">
      <div className="row">
        <h1 className="section-title">
          The page at {props.location.pathname} does not exist!
        </h1>
        <img src="/images/confused-orca.png" />
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

import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { orderNumber } from "../utility";

export const ConfirmationPageView = (props) => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <h1>Order Confirmed!</h1>
          <h2>Order Confirmation #: {orderNumber()}</h2>
          <h2>Thank you for shopping with Orca Audio!</h2>
          <Link to={"/"}>
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

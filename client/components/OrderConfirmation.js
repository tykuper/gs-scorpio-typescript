import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const OrderConfirmation = (props) => {
  return (
    <div className="row">
      <div className="col">
        <h1>Order Confirmed!</h1>
        <h2>Order Confirmation #:</h2>
        <h2>Thank you for shopping with Orca Audio!</h2>
        <Link to={"/"}>
          <button type="submit">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

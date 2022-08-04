import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function orderNumber() {
  let now = Date.now().toString();
  now += now + Math.floor(Math.random() * 10);
  return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join("-");
}

export const ConfirmationPageView = (props) => {
  return (
    <div className="row">
      <div className="col">
        <h1>Order Confirmed!</h1>
        <h2>Order Confirmation #: {orderNumber()}</h2>
        <h2>Thank you for shopping with Orca Audio!</h2>
        <Link to={"/"}>
          <button type="submit">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

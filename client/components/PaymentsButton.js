import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";

const PaymentsButton = (props) => {
  const [isLoading, setLoading] = useState(false);

  const getStripeHandler = async () => {
    setLoading(true);
    const checkedOutItems = props.cart;

    try {
      const { data } = await axios.post("/create-checkout-session", {
        items: checkedOutItems,
      });

      if (data) {
        setLoading(false);
        window.location = data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {props.btnName === "Edit" ? (
        <div className="payment">
          <Button
            onClick={getStripeHandler}
            className="d-flex justify-content-center mt-3"
            variant="secondary"
            type="submit"
          >
            <strong>Edit</strong>
          </Button>
        </div>
      ) : (
        <div className="payment">
          <Button
            onClick={getStripeHandler}
            disabled={isLoading}
            variant="primary"
            type="submit"
          >
            {isLoading ? "Loading..." : "Continue to Payment"}
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    loggedInUser: state.auth,
  };
};

export default connect(mapStateToProps)(PaymentsButton);

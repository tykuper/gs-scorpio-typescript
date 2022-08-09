import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const PaymentsButtonNoServer = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1LUtSHKQ83pm0hW7VfYQJYGH",
    quantity: 1,
  };

  const checkoutOptions = {
    // lineItems: [item],
    lineItems: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "bose earbuds",
          },
          unit_amount: 123,
        },
      },
    ],
    mode: "payment",
    successUrl: `${window.location.origin}/checkout`,
    cancelUrl: `${window.location.origin}/home`,
  };

  const redirectToCheckout = async () => {
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="payment">
      <Button
        onClick={redirectToCheckout}
        disabled={isLoading}
        variant="primary"
        type="submit"
      >
        {isLoading ? "Loading..." : "Continue to Payment"}
      </Button>
    </div>
  );
};

export default PaymentsButtonNoServer;

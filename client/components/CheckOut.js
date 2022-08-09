import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import CheckOutOrders from "./CheckOutOrders";
import CheckOutShipping from "./CheckOutShipping";
import CheckOutPayment from "./CheckOutPayment";
import CheckOutSummary from "./CheckOutSummary";
import { connect } from "react-redux";

const FAKE_CHECKOUT_DATA = {
  address: "113 3rd Lane Marcus Hook, PA 19061",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  paymentMethod: "VISA",
  cardNumber: "*************4242",
  expDate: "02/25",
  products: [
    {
      id: 1,
      productName: "QuietComfort Earbuds",
      quantity: 2,
      price: 199,

      imageURL:
        "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds/silo_images/v2/QCEB_PDP_Ecom-Gallery-B03.png/jcr:content/renditions/cq5dam.web.320.320.png",
    },
    {
      id: 4,
      productName: "Sport Earbuds",
      quantity: 1,
      price: 124,
      imageURL:
        "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/earbuds_500/product_silo_images/seb_product_slideshow_black_ec_03_web.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg",
    },
  ],
  tax: 20,
  shippingCost: "free",
};

const CheckOut = (props) => {
  const { cart: cartItems, shipping, loggedInUser } = props;

  return (
    <Fragment>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <h1 className="m-4 text-center">
        <strong>Checkout</strong>
      </h1>
      <Row className="m-3 justify-content-around">
        <Col md={7}>
          <CheckOutOrders products={cartItems} />

          <CheckOutShipping shipping={shipping} />

          <CheckOutPayment checkOutData={FAKE_CHECKOUT_DATA} />
        </Col>
        <Col md={4}>
          <CheckOutSummary
            cartItems={cartItems}
            loggedInUser={loggedInUser}
            shipping={shipping}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    shipping: state.shipping,
    loggedInUser: state.auth,
  };
};

export default connect(mapStateToProps)(CheckOut);

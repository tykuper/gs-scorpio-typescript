import axios from "axios";
import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../history";
import { resetCart } from "../store/cart";

const CheckOutSummary = (props) => {
  const { cartItems, loggedInUser, shipping } = props;

  const orderId = cartItems[0]?.orderId;

  const itemsTotalCount = +cartItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const itemsTotalAmount = +cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const taxRate = 0.06625;
  const taxAmount = itemsTotalAmount * taxRate;

  const cartTotalAmount = itemsTotalAmount + taxAmount;

  console.log(cartItems);

  const placeOrderHandler = async (orderId, cartItems) => {
    if (!loggedInUser.id) {
      const newUserInfo = {
        email: shipping.email,
        password: shipping.email,
        firstName: shipping.firstName,
        lastName: shipping.lastName,
      };
      const newUser = await axios.post("/api/users/create", newUserInfo);

      const newShippingInfo = {
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        country: shipping.country,
        zipcode: shipping.zipcode,
        userId: newUser.data.id,
      };

      const newShipping = await axios.post(
        "/api/shipping/create",
        newShippingInfo
      );

      const TEMPORARY_GUEST_USER_ID = { userId: newUser.data.id };

      //create new order in Order Table
      const { data: createdOrder } = await axios.post(
        "/api/orders/create",
        TEMPORARY_GUEST_USER_ID
      );

      const cart = cartItems.map((item) => {
        return {
          ...item,
          userId: createdOrder.userId,
          orderId: createdOrder.id,
          productId: item.id,
        };
      });

      // create or update orders in orderProduct table
      const { data: updatedOrders } = await axios.put(
        "api/orders/update",
        cart
      );

      orderId = createdOrder.id;
    }

    const updated = await axios.put(
      `/api/orders/update/orderStatus/${orderId}`
    );

    if (updated) {
      props.resetCart();
    }
    history.push(`confirmed/${orderId}`);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Order Summary</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item className="border-0">
            <Row>
              <Col>Items</Col>
              <Col>
                ${Number(itemsTotalAmount.toFixed(2)).toLocaleString("en-US")}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            <Row>
              <Col>Shipping</Col>
              <Col>{"Free"}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="border-bottom border-1 border-dark">
            <Row>
              <Col>Tax</Col>
              <Col>${taxAmount.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            <Row>
              <Col>
                <strong> Order Total</strong>
              </Col>
              <Col>
                <strong>${cartTotalAmount.toFixed(2)}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              <Button
                type="button"
                onClick={() => placeOrderHandler(orderId, cartItems)}
              >
                Place Order
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetCart: () => dispatch(resetCart()),
  };
};

export default connect(null, mapDispatchToProps)(CheckOutSummary);

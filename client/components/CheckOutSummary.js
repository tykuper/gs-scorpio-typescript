import axios from "axios";
import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../history";
import { resetCart } from "../store/cart";

const CheckOutSummary = (props) => {
  const cartItems = props.cartItems;

  const orderId = cartItems[0].orderId;

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

  const placeOrderHandler = async (orderId, cartItems) => {
    if (!orderId) {
      const TEMPORARY_GUEST_USER_ID = { userId: 999 };

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

    await axios.put(`/api/orders/update/orderStatus/${orderId}`);
    props.resetCart();
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
              <Col>${itemsTotalAmount.toFixed(2)}</Col>
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

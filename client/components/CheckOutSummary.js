import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckOutSummary = (props) => {
  const cartItems = props.cartItems;

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
              <Button type="button">Place Order</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CheckOutSummary;

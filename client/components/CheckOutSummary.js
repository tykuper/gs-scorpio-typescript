import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckOutSummary = (props) => {
  const checkOutData = props.checkOutData;

  const checkOutTotal =
    checkOutData.products.reduce((cul, curr) => cul + curr.price, 0) +
    checkOutData.tax;
  return (
    <Card>
      <Card.Body>
        <Card.Title>Order Summary</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Items</Col>
              <Col>
                $
                {checkOutData.products.reduce(
                  (cul, curr) => cul + curr.price,
                  0
                )}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Shipping</Col>
              <Col>{checkOutData.shippingCost}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Tax</Col>
              <Col>${checkOutData.tax}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                <strong> Order Total</strong>
              </Col>
              <Col>
                <strong>${checkOutTotal}</strong>
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

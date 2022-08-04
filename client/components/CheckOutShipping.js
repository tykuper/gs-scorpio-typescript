import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckOutShipping = (props) => {
  const checkOutData = props.checkOutData;
  return (
    <Card className="mb-3">
      <Card.Body className="d-grid gap-3">
        <Card.Title className="fs-3">Shipping</Card.Title>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Name: </strong>
              {checkOutData.firstName + " " + checkOutData.lastName}
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Email: </strong>
              {checkOutData.email}
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Address: </strong>
              {checkOutData.address}
            </Col>
          </Row>
        </ListGroup.Item>

        <Link
          style={{ textDecoration: "none" }}
          to="#"
          className="d-flex justify-content-center"
        >
          <Button variant="secondary" type="button" className="mt-3">
            <strong>Edit</strong>
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CheckOutShipping;

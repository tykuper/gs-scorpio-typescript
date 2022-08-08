import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CheckOutShipping = (props) => {
  const shipping = props.shipping;

  const fullAddress =
    shipping.address +
    " " +
    shipping.city +
    " " +
    shipping.state +
    " " +
    shipping.country +
    " " +
    shipping.zipcode;

  return (
    <Card className="mb-3">
      <Card.Body className="d-grid gap-3">
        <Card.Title className="fs-3">Shipping</Card.Title>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Name: </strong>
              {shipping.firstName + " " + shipping.lastName}
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Email: </strong>
              {shipping.email}
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Address: </strong>
              {fullAddress}
            </Col>
          </Row>
        </ListGroup.Item>

        <Link
          style={{ textDecoration: "none" }}
          to="/shipping"
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

const mapStateToProps = (state) => {
  return {
    shipping: state.shipping,
  };
};

export default connect(mapStateToProps)(CheckOutShipping);

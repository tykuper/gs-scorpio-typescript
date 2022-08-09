import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaymentsButton from "./PaymentsButton";

const CheckOutPayment = (props) => {
  const checkOutData = props.checkOutData;

  return (
    <Card className="mb-3">
      <Card.Body className="d-grid gap-3">
        <Card.Title className="fs-3">Payment</Card.Title>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Method: </strong>
              {checkOutData.paymentMethod}
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Card Number: </strong>
              {checkOutData.cardNumber}
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Exp. Date: </strong>
              {checkOutData.expDate}
            </Col>
          </Row>
        </ListGroup.Item>

        {/* <Link
          style={{ textDecoration: "none" }}
          to="#"
          className="d-flex justify-content-center"
        >
          <Button variant="secondary" type="button" className="mt-3">
            <strong>Edit</strong>
          </Button>
        </Link> */}

        <PaymentsButton btnName="Edit" />
      </Card.Body>
    </Card>
  );
};

export default CheckOutPayment;

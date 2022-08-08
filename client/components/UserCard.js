import React from "react";
import { Col, Card } from "react-bootstrap";

const ProductCard = (props) => {
  const { firstName, lastName, email, isCustomer, isAdmin } = props.users;
  let role = "CUSTOMER";

  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{firstName + "" + lastName}</Card.Title>
          <Card.Text>${email}</Card.Text>
          {isAdmin && (role = "ADMIN")}
          <Card.Text>${role}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;

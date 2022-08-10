import React from "react";
import { Col, Card } from "react-bootstrap";

const ProductCard = (props) => {
  const { firstName, lastName, email, isAdmin } = props.user;
  let role = "";
  isAdmin ? (role = "ADMIN") : (role = "CUSTOMER");
  console.log(props);

  return (
    <div data-aos="slide-up" data-aos-duration="1500">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              <strong>{firstName + " " + lastName}</strong>
            </Card.Title>
            <Card.Text>{email}</Card.Text>
            <Card.Text>{role}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default ProductCard;

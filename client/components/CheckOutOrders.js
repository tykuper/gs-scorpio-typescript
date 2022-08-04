import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckOutOrders = (props) => {
  const products = props.products;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="fs-3">Orders</Card.Title>
        <ListGroup variant="flush">
          {products.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src={product.imageURL}
                    alt={product.productName}
                    className="img-thumbnail mb-2"
                  />
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <strong className="fs-5">{product.productName}</strong>
                  </Link>
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0">
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>{product.quantity}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
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

export default CheckOutOrders;

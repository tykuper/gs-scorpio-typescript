import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
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
              <Row className="align-items-center justify-content-around">
                <Col md={5}>
                  <img
                    src={product.imageURL}
                    alt={product.productName}
                    className="img-thumbnail my-2 border-0"
                  />
                </Col>
                <Col md={5}>
                  <ListGroup variant="flush" className="checkout-Block">
                    <ListGroup.Item className="border-0 mb-3">
                      <Link
                        to={`/products/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <strong className="fs-5">{product.name}</strong>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      <Row>
                        <Col>
                          <span>Quantity: {product.quantity}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="mt-2">
                      <Row>
                        <Col>
                          <span>
                            Price: ${Number(product.price).toFixed(2)}
                          </span>
                        </Col>
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
          to="/cart"
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

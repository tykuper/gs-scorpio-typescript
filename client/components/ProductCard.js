import React from 'react';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
  const {
    id,
    name,
    imageURL,
    shortDescription,
    longDescription,
    price,
    category,
    noiseCancelling,
  } = props.product;

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <Card.Text>{shortDescription}</Card.Text>
          <ListGroup>
            <Card.Link href={`/products/${id}`}>View Product</Card.Link>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;

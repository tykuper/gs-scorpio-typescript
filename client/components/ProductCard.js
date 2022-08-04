import React from 'react';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const ProductCard = (props) => {
  const {
    name,
    imageURL,
    shortDescription,
    longDescription,
    price,
    category,
    noiseCancelling,
  } = props.product;

  return (
    <Row>
      <h1>HELLO WORLD</h1>
    </Row>
  );
};

export default ProductCard;

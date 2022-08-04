import React from 'react';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import styles from './SingleProduct.module.css';
import { Helmet } from 'react-helmet-async';

const SingleProduct = (props) => {
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
      <Col md={6}>
        <img src={imageURL} alt={name}></img>
      </Col>

      <Col md={6}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{name}</title>
            </Helmet>
            <h1>{name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>Price: ${price}</ListGroup.Item>
          <ListGroup.Item>
            Description: <p>{longDescription}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <Button variant="primary">Add to Cart</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default SingleProduct;

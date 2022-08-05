import React from 'react';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { useDispatch } from 'react-redux';

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

  const history = useHistory();

  const editProduct = () => {
    let path = `/manage/products/${id}/edit`;
    history.push(path);
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <Card.Text>{shortDescription}</Card.Text>
          <ListGroup>
            {props.isAdmin && (
              <Button variant="warning" onClick={editProduct}>
                Edit Product
              </Button>
            )}
            <Card.Link href={`/products/${id}`}>View Product</Card.Link>
            <Button
              variant="primary"
              onClick={() => props.onClick(props.product)}
            >
              Add to Cart
            </Button>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;

import React, { Fragment } from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { addToCart } from "../store/cart";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { deleteProductThunk } from "../store/products";

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

  const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      props.deleteProduct(id);
    }
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top h-75" src={imageURL} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          {/* <Card.Text>{shortDescription}</Card.Text> */}
          <ListGroup>
            <Card.Link href={`/products/${id}`}>View Product</Card.Link>
            {history.location.pathname !== "/manage/products" && (
              <Button
                variant="primary"
                onClick={() => props.onClick(props.product)}
              >
                Add to Cart
              </Button>
            )}
            {props.isAdmin && history.location.pathname === "/manage/products" && (
              <Fragment>
                <Button variant="warning" onClick={editProduct}>
                  Edit Product
                </Button>
                <Button variant="danger" onClick={() => deleteProduct(id)}>
                  Delete Product
                </Button>
              </Fragment>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteProduct: (id) => dispatch(deleteProductThunk(id, history)),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);

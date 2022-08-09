import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import styles from "./SingleProduct.module.css";
import { Helmet } from "react-helmet-async";
import { addToCart } from "../store/cart";
import { connect } from "react-redux";
import history from "../history.js";
import FiveStarReviews from "./FiveStarReviews";

const SingleProduct = (props) => {
  const {
    name,
    imageURL,
    shortDescription,
    longDescription,
    price,
    category,
    noiseCancelling,
    numReviews,
    ratings,
  } = props.product;

  const addToCartHandler = async () => {
    const addedProduct = props.product;

    props.addToCart(addedProduct);

    history.push("/cart");
  };

  return props.product ? (
    <Row className="m-3 justify-content-around">
      <Col md={6} className="d-flex justify-content-center align-items-center">
        <img src={imageURL} alt={name} className="img-singleProduct"></img>
      </Col>

      <Col md={6}>
        <ListGroup variant="flush">
          <ListGroup.Item className="border-0">
            <Helmet>
              <title>{name}</title>
            </Helmet>
            <h1>{name}</h1>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            <FiveStarReviews numReviews={numReviews} ratings={ratings} />
          </ListGroup.Item>
          <ListGroup.Item className="fs-3">${price}</ListGroup.Item>
          <ListGroup.Item className="border-0">
            <p>{longDescription}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <Button variant="primary" onClick={addToCartHandler}>
                Add to Cart
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  ) : (
    <div>
      <h1 className="section-title">Student does not exist!</h1>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, decrement) => dispatch(addToCart(product, decrement)),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);

import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { addToCart } from "../store/cart";
import { connect } from "react-redux";
import history from "../history.js";
import FiveStarReviews from "./FiveStarReviews";
import { Link } from "react-router-dom";

const SingleProduct = (props) => {
  const {
    name,
    imageURL,
    longDescription,
    price,
    numReviews,
    ratings,
    category,
    noiseCancelling,
    inventory,
  } = props.product || {};

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
          <ListGroup.Item className="fs-3">
            ${price}
            <div>
              <span className="badge badge-pill bg-info">{category}</span>{" "}
              {noiseCancelling && (
                <span className="badge badge-pill bg-info">
                  noise-cancelling
                </span>
              )}{" "}
              {numReviews >= 150 && ratings >= 4.0 && (
                <span className="badge badge-pill bg-success">best seller</span>
              )}{" "}
              {inventory === 0 && (
                <span className="badge badge-pill bg-danger">out of stock</span>
              )}{" "}
              {inventory < 60 && inventory > 0 && (
                <span className="badge badge-pill bg-warning">low stock</span>
              )}
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            <p className="fs-4">{longDescription}</p>
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
    <div className="container text-center">
      <div className="row">
        <h1 className="section-title">Product does not exist!</h1>
        <img src="/images/confused-orca.png" />
        <Link to={"/home"}>
          <button className="btn btn-primary btn-lg">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, decrement) => dispatch(addToCart(product, decrement)),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);

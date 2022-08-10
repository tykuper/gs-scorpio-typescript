import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosAdd, IoIosRemove, IoIosTrash } from "react-icons/io";
import { connect } from "react-redux";
import {
  addToCart,
  includeOrderId,
  removeFromCart,
  resetCartThunk,
} from "../store/cart";
import history from "../history";
import { fetchShippingThunk } from "../store/shipping";
import axios from "axios";

const CartSummary = (props) => {
  const { check, includeOrderId, orderId, loggedInUser } = props;
  let cartItems = props?.cartItems || [];

  const itemsTotalCount = +cartItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const itemsTotalAmount = +cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const taxRate = 0.06625;
  const defaultTaxAmount = 0;
  const taxAmount = itemsTotalAmount * taxRate;

  const cartTotalAmount = itemsTotalAmount + taxAmount;

  useEffect(() => {
    const fetchData = async () => {
      if (loggedInUser.id) {
        await props.fetchShippingThunk(loggedInUser.id);
      } else {
        localStorage.setItem("shipping", JSON.stringify({}));
      }
    };
    fetchData();
  }, [loggedInUser.id]);

  const updateItemHandler = async (item, decrement) => {
    props.addToCart(item, decrement);
  };

  const removeItemHandler = async (item) => {
    console.log(loggedInUser.id, item, orderId);
    if (loggedInUser.id && item && orderId) {
      // props.resetCartThunk(item, orderId);
      const res = await axios.delete(
        `/api/orders/delete/${orderId}/product-delete/${item.id}`
      );
    }

    props.removeFromCart(item);
  };

  return (
    <Fragment>
      <Helmet>
        <title>My Cart</title>
      </Helmet>

      <h1 className="m-4 text-center">
        <strong>Items in Your Cart</strong>
      </h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div className="fs-5 ms-4">There are no items in your cart.</div>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={3}>
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="img-thumbnail border-0"
                      ></img>
                    </Col>
                    <Col md={5} className="ms-5">
                      <ListGroup variant="flush">
                        <ListGroup.Item className="border-0">
                          <Link
                            to={`/products/${item.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <strong className="fs-5">{item.name}</strong>
                          </Link>
                        </ListGroup.Item>

                        <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center cart-add-minus">
                          <Button
                            onClick={() => updateItemHandler(item, true)}
                            variant="light"
                            disabled={item.quantity === 1}
                          >
                            <IoIosRemove />
                          </Button>
                          <strong> {item.quantity} </strong>
                          <Button
                            variant="light"
                            onClick={() => updateItemHandler(item, false)}
                          >
                            <IoIosAdd />
                          </Button>
                        </ListGroup.Item>

                        <ListGroup.Item className="border-0 mt-3">
                          <Col md={2}>
                            <Button onClick={() => removeItemHandler(item)}>
                              <IoIosTrash className="fs-5" />
                            </Button>
                          </Col>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>

                    <Col md={3}>
                      <span className="fw-bold">${item.price}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col>
          <Card className="border-0">
            <Card.Body>
              <Card.Title className="text-center">Cart Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0">
                  <Row>
                    <Col>Items x ({itemsTotalCount})</Col>
                    <Col>
                      $
                      {Number(itemsTotalAmount.toFixed(2)).toLocaleString(
                        "en-US"
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{"Free"}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="border-bottom border-1 border-dark">
                  <Row>
                    <Col>Tax</Col>
                    <Col>
                      $
                      {cartItems.length === defaultTaxAmount.toFixed(2)
                        ? 0
                        : taxAmount.toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Row>
                    <Col>
                      <strong>Cart Total</strong>
                    </Col>
                    <Col>
                      <strong>
                        $
                        {Number(cartTotalAmount.toFixed(2)).toLocaleString(
                          "en-US"
                        )}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      disabled={cartItems.length === 0}
                      onClick={() => {
                        console.log(orderId);
                        includeOrderId(orderId);
                        if (loggedInUser.id) {
                          history.push("/shipping");
                        } else {
                          history.push("/signin/optional");
                        }
                      }}
                    >
                      Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    loggedInUser: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, decrement) => dispatch(addToCart(product, decrement)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    includeOrderId: (orderId) => dispatch(includeOrderId(orderId)),
    fetchShippingThunk: (userId) => dispatch(fetchShippingThunk(userId)),
    resetCartThunk: (product, orderId) =>
      dispatch(resetCartThunk(product, orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);

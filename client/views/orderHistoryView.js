import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchDBCartThunk } from "../store/cartDB";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../store/cart";
import history from "../history.js";

const orderHistoryView = (props) => {
  useEffect(() => {
    props.fetchDBCartThunk(props.userId);
  }, [props.userId]);
  console.log(props.userId);
  return <div>Order History</div>;
};

const mapStateToProp = (state) => {
  return {
    products: state.products,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDBCartThunk: (id) => dispatch(fetchDBCartThunk(id)),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(orderHistoryView);

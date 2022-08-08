import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchProductsThunk } from "../store/products";
import ProductCard from "../components/productCard";
import { addToCart } from "../store/cart";
import history from "../history.js";

const ProductListView = (props) => {
  useEffect(() => {
    props.fetchProductsThunk();
  }, []);

  const addToCartHandler = async (product) => {
    const addedProduct = product;
    props.addToCart(addedProduct);
  };

  return (
    <div className="text-center container py-5">
      <h4>
        <strong>Product List</strong>
      </h4>
      <Row xs={1} md={2} lg={3} className="g-4">
        {props.products?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onClick={addToCartHandler}
              isAdmin={props.isAdmin}
            />
          );
        })}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    isAdmin: state.auth.isAdmin !== undefined ? state.auth.isAdmin : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsThunk: () => dispatch(fetchProductsThunk()),
    addToCart: (product, decrement) => dispatch(addToCart(product, decrement)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListView);

import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchProductsThunk } from '../store/products';
import ProductCard from '../components/productCard';

const ProductListView = (props) => {
  useEffect(() => {
    props.fetchProductsThunk();
  }, []);

  return (
    <div className="text-center container py-5">
      <h4>
        <strong>Product List</strong>
      </h4>
      <Row xs={1} md={2} lg={3} className="g-4">
        {props.products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Row>
    </div>
  );
};

const mapDispatchToState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsThunk: () => dispatch(fetchProductsThunk()),
  };
};

export default connect(mapDispatchToState, mapDispatchToProps)(ProductListView);

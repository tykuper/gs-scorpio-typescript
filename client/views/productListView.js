import React, { Component, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductsThunk } from '../store/products';
import ProductCard from '../components/productCard';

const ProductListView = (props) => {
  useEffect(() => {
    props.fetchProductsThunk();
  }, []);

  return (
    <div>
      <Fragment>
        {props.products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Fragment>
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

import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductThunk } from "../store/singleProduct";
import SingleProduct from "../components/SingleProduct";

const singleProductView = (props) => {
  const { productId } = useParams();

  useEffect(() => {
    try {
      props.fetchProductThunk(productId);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  return (
    <Fragment>
      <SingleProduct product={props.product} />
    </Fragment>
  );
};

const mapDispatchToState = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductThunk: (productId) => dispatch(fetchProductThunk(productId)),
  };
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(singleProductView);

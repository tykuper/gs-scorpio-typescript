import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProduct, { fetchProductThunk } from "../store/singleProduct";

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
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductThunk: () => dispatch(fetchProductThunk),
  };
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(singleProductView);

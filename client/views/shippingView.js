import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import ShippingInfoForm from "../components/ShippingInfoForm";
import { fetchShippingThunk, setShipping } from "../store/shipping";

const ShippingView = (props) => {
  return (
    <ShippingInfoForm
      shippingInfo={props.shipping}
      loggedInUser={props.loggedInUser}
      fetchShippingThunk={props.fetchShippingThunk}
      setShipping={props.setShipping}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    shipping: state.shipping,
    loggedInUser: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShippingThunk: (userId) => dispatch(fetchShippingThunk(userId)),
    setShipping: () => dispatch(setShipping()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingView);

import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCart } from "../store/cart";

/**
 * COMPONENT
 */
export const Home = (props) => {
  // const { username } = props;
  const loggedInUser = props.loggedInUser;
  const cartItems = props.cart;

  // if (
  //   loggedInUser.id &&
  //   (!localStorage.getItem("cartItems") ||
  //     !JSON.parse(localStorage.getItem("cartItems"))?.length)
  // ) {

  useEffect(() => {
    const fetchData = async () => {
      if (
        loggedInUser.id &&
        (!localStorage.getItem("cartItems") ||
          !JSON.parse(localStorage.getItem("cartItems"))?.length ||
          JSON.parse(localStorage.getItem("cartItems"))?.length)
      ) {
        const res = await axios.get(`api/orders/user/${loggedInUser.id}`);

        const inCartOrders = res.data.filter(
          (item) => item.orderStatus === "In-Cart"
        );

        let inCartOrdersProducts = inCartOrders[0]?.products.map((product) => {
          return {
            ...product.orderProduct,
            imageURL: product.imageURL,
            name: product.name,
            id: product.orderProduct.productId,
          };
        });

        // setCartDB(res.data);
        // setCartDB(inCartOrdersProducts);

        console.log("**CART from DB: ", inCartOrdersProducts);

        inCartOrdersProducts = inCartOrdersProducts || [];
        localStorage.setItem("cartItems", JSON.stringify(inCartOrdersProducts));

        props.setCart(inCartOrdersProducts);
      }
    };
    fetchData().catch(console.error);
  }, [loggedInUser]);

  return (
    <div className="row">
      <div className="col">
        <h1 className="text-center">Orca Audio</h1>
        <div className="row">
          <h2>Category 1</h2>
          <div className="col-md-3 col-sm-6 mb-5"></div>
        </div>
        <div className="row">
          <h2>Category 2</h2>
          <div className="col-md-3 col-sm-6 mb-5"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    loggedInUser: state.auth,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (cart) => dispatch(setCart(cart)),
  };
};

export default connect(mapState, mapDispatchToProps)(Home);

import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosAdd, IoIosRemove, IoIosTrash } from "react-icons/io";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../store/cart";
import history from "../history";
import axios from "axios";
import CartSummary from "./CartSummary";

const Cart = (props) => {
  const [orderId, setOrderId] = useState(null);
  const [cartDB, setCartDB] = useState([]);

  const loggedInUser = props.loggedInUser;

  const localStorageCart = localStorage.getItem("cartItems");

  const cartItems = props.cart;

  useEffect(() => {
    const fetchData = async () => {
      if (loggedInUser.id && cartItems.length) {
        const userId = { userId: loggedInUser.id };

        //create new order in Order Table
        const { data: createdOrder } = await axios.post(
          "/api/orders/create",
          userId
        );

        const cart = cartItems.map((item) => {
          return {
            ...item,
            userId: createdOrder.userId,
            orderId: createdOrder.id,
            productId: item.id,
          };
        });

        // create or update orders in orderProduct table
        const { data: updatedOrders } = await axios.put(
          "api/orders/update",
          cart
        );

        setOrderId(updatedOrders[0].orderId);
      }

      // get the latest cart data from DB
      if (loggedInUser.id && !localStorageCart) {
        const res = await axios.get(`api/orders/user/${loggedInUser.id}`);

        const inCartOrders = res.data.filter(
          (item) => item.orderStatus === "In-Cart"
        );

        const inCartOrdersProducts = inCartOrders[0]?.products.map(
          (product) => {
            return {
              ...product.orderProduct,
              imageURL: product.imageURL,
              name: product.name,
              id: product.orderProduct.productId,
            };
          }
        );

        // setCartDB(res.data);
        setCartDB(inCartOrdersProducts);

        localStorage.setItem("cartItems", JSON.stringify(inCartOrdersProducts));
      }

      //delete orders from DB.
      if (!cartItems.length && orderId) {
        await axios.delete(`/api/orders/delete/${orderId}`);
      }
    };

    fetchData().catch(console.error);
  }, [loggedInUser, cartItems]);

  return (
    <Fragment>
      {cartItems.length ? (
        <CartSummary
          cartItems={cartItems}
          check={"I am Cart Items"}
          orderId={orderId}
        />
      ) : (
        <CartSummary
          cartItems={cartDB}
          check={"I am Cart DB"}
          orderId={orderId}
        />
      )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

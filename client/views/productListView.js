import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchProductsThunk } from "../store/products";
import ProductCard from "../components/ProductCard";
import { addToCart, setCart } from "../store/cart";
import history from "../history.js";
import axios from "axios";

const ProductListView = (props) => {
  const cartItems = props.cart;
  const loggedInUser = props.loggedInUser;
  const [cartDB, setCartDB] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    props.fetchProductsThunk();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedInUser.id && cartItems?.length) {
        const userId = { userId: loggedInUser.id };

        //create new order in Order Table
        const { data: createdOrder } = await axios.post(
          "/api/orders/create",
          userId
        );

        // if (!loggedInUser && localStorageCart.length) {
        // }

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
      if (
        loggedInUser.id &&
        (!localStorage.getItem("cartItems") ||
          !JSON.parse(localStorage.getItem("cartItems"))?.length)
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
        setCartDB(inCartOrdersProducts);

        console.log("**CART Product View Page from DB: ", inCartOrdersProducts);

        inCartOrdersProducts = inCartOrdersProducts || [];
        localStorage.setItem("cartItems", JSON.stringify(inCartOrdersProducts));

        // props.setCart(inCartOrdersProducts);
      }

      //delete orders from DB.
      // if (!cartItems.length && orderId) {
      //   await axios.delete(`/api/orders/delete/${orderId}`);
      // }
    };

    fetchData().catch(console.error);
  }, [loggedInUser, cartItems]);

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
    cart: state.cart,
    loggedInUser: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsThunk: () => dispatch(fetchProductsThunk()),
    addToCart: (product, decrement) => dispatch(addToCart(product, decrement)),
    setCart: (cart) => dispatch(setCart(cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListView);

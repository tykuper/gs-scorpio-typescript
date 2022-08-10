import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCart } from "../store/cart";
import { Carousel } from "react-bootstrap";

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

  // get filtered products for carousel
  const [bestSellers, setBestSellers] = useState([]);
  const [noiseCancelling, setNoiseCancelling] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const fetchFiltered = async () => {
      const { data: newBestSellers } = await axios.get(
        "/api/products/category/best-seller"
      );
      const { data: newNoiseCancelling } = await axios.get(
        "/api/products/category/noise-cancelling"
      );
      const { data: newLowStock } = await axios.get(
        "/api/products/category/low-stock"
      );

      setBestSellers(newBestSellers);
      setNoiseCancelling(newNoiseCancelling);
      setLowStock(newLowStock);
    };

    fetchFiltered().catch(console.error);
  }, []);

  console.log(bestSellers);

  return (
    <div className="row">
      <div className="col">
        <h1 className="text-center">Orca Audio</h1>
        <div className="row">
          <h2>Check out our best sellers!</h2>
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block"
                style={{
                  margin: "auto",
                  height: "300px",
                  width: "600px",
                }}
                src={bestSellers[0]?.imageURL}
                alt="First slide"
              />
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <h4>{bestSellers[0]?.name}</h4>
                <p>${bestSellers[0]?.price}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                style={{
                  margin: "auto",
                  height: "300px",
                  width: "600px",
                }}
                src={bestSellers[1]?.imageURL}
                alt="Second slide"
              />
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <h4>{bestSellers[1]?.name}</h4>
                <p>${bestSellers[1]?.price}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                style={{
                  margin: "auto",
                  height: "300px",
                  width: "600px",
                }}
                src={bestSellers[2]?.imageURL}
                alt="Third slide"
              />
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <h4>{bestSellers[2]?.name}</h4>
                <p>${bestSellers[2]?.price}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                style={{
                  margin: "auto",
                  height: "300px",
                  width: "600px",
                }}
                src={bestSellers[3]?.imageURL}
                alt="Third slide"
              />
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <h4>{bestSellers[3]?.name}</h4>
                <p>${bestSellers[3]?.price}</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
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
    isAdmin: state.auth.isAdmin !== undefined ? state.auth.isAdmin : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (cart) => dispatch(setCart(cart)),
  };
};

export default connect(mapState, mapDispatchToProps)(Home);

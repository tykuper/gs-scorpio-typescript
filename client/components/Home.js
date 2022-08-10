import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCart } from "../store/cart";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

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

  return (
    <div className="container">
      <div className="col">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 id="header-title">
              <strong>Orca Audio</strong>
            </h1>
            <p id="header-caption" className="text-center">
              A place for all your audio needs!
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/images/home_orca.png"
              style={{ width: "930px", height: "558px" }}
            />
          </div>
        </div>

        <div className="row">
          <h2>Check out our best sellers!</h2>
          <Carousel variant="dark" interval={null}>
            <Carousel.Item>
              <Link to={`/products/${bestSellers[0]?.id}`}>
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
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${bestSellers[0]?.id}`}>
                  <h4>{bestSellers[0]?.name}</h4>
                  <p>${bestSellers[0]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products/${bestSellers[1]?.id}`}>
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
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${bestSellers[1]?.id}`}>
                  <h4>{bestSellers[1]?.name}</h4>
                  <p>${bestSellers[1]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products/${bestSellers[2]?.id}`}>
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
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${bestSellers[2]?.id}`}>
                  <h4>{bestSellers[2]?.name}</h4>
                  <p>${bestSellers[2]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="row">
          <h2>Increase your focus with noise cancellation!</h2>
          <Carousel variant="dark" interval={null}>
            <Carousel.Item>
              <Link to={`/products/${noiseCancelling[0]?.id}`}>
                <img
                  className="d-block"
                  style={{
                    margin: "auto",
                    height: "300px",
                    width: "600px",
                  }}
                  src={noiseCancelling[0]?.imageURL}
                  alt="First slide"
                />
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${noiseCancelling[0]?.id}`}>
                  <h4>{noiseCancelling[0]?.name}</h4>
                  <p>${noiseCancelling[0]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products/${noiseCancelling[1]?.id}`}>
                <img
                  className="d-block"
                  style={{
                    margin: "auto",
                    height: "300px",
                    width: "600px",
                  }}
                  src={noiseCancelling[1]?.imageURL}
                  alt="Second slide"
                />
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${noiseCancelling[1]?.id}`}>
                  <h4>{noiseCancelling[1]?.name}</h4>
                  <p>${noiseCancelling[1]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products/${noiseCancelling[2]?.id}`}>
                <img
                  className="d-block"
                  style={{
                    margin: "auto",
                    height: "300px",
                    width: "600px",
                  }}
                  src={noiseCancelling[2]?.imageURL}
                  alt="Third slide"
                />
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${noiseCancelling[2]?.id}`}>
                  <h4>{noiseCancelling[2]?.name}</h4>
                  <p>${noiseCancelling[2]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="row">
          <h2>Get them before they're gone!</h2>
          <Carousel variant="dark" interval={null}>
            <Carousel.Item>
              <Link to={`/products/${lowStock[0]?.id}`}>
                <img
                  className="d-block"
                  style={{
                    margin: "auto",
                    height: "300px",
                    width: "600px",
                  }}
                  src={lowStock[0]?.imageURL}
                  alt="First slide"
                />
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${lowStock[0]?.id}`}>
                  <h4>{lowStock[0]?.name}</h4>
                  <p>${lowStock[0]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products/${lowStock[1]?.id}`}>
                <img
                  className="d-block"
                  style={{
                    margin: "auto",
                    height: "300px",
                    width: "600px",
                  }}
                  src={lowStock[1]?.imageURL}
                  alt="Second slide"
                />
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${lowStock[1]?.id}`}>
                  <h4>{lowStock[1]?.name}</h4>
                  <p>${lowStock[1]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/products/${lowStock[2]?.id}`}>
                <img
                  className="d-block"
                  style={{
                    margin: "auto",
                    height: "300px",
                    width: "600px",
                  }}
                  src={lowStock[2]?.imageURL}
                  alt="Third slide"
                />
              </Link>
              <Carousel.Caption
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <Link to={`/products/${lowStock[2]?.id}`}>
                  <h4>{lowStock[2]?.name}</h4>
                  <p>${lowStock[2]?.price}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
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

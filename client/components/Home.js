import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCart } from "../store/cart";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  // const { username } = props;
  const loggedInUser = props.loggedInUser;
  const cartItems = props.cart;
  const history = useHistory();

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
    <div>
      <div className="home-top" data-aos="zoom-in" data-aos-duration="1500">
        <div className="form-top text-center">
          <h1 id="header-title">
            <strong>Orca Audio</strong>
          </h1>
          <p id="header-caption">A place for all your audio needs!</p>
          <Link to={"/products"}>
            <button id="shop-button" className="btn btn-primary btn-lg">
              Shop All
            </button>
          </Link>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#218BE6"
          fillOpacity="1"
          d="M0,320L9.2,288C18.5,256,37,192,55,181.3C73.8,171,92,213,111,245.3C129.2,277,148,299,166,261.3C184.6,224,203,128,222,112C240,96,258,160,277,160C295.4,160,314,96,332,106.7C350.8,117,369,203,388,208C406.2,213,425,139,443,144C461.5,149,480,235,498,234.7C516.9,235,535,149,554,106.7C572.3,64,591,64,609,101.3C627.7,139,646,213,665,218.7C683.1,224,702,160,720,165.3C738.5,171,757,245,775,245.3C793.8,245,812,171,831,138.7C849.2,107,868,117,886,144C904.6,171,923,213,942,213.3C960,213,978,171,997,170.7C1015.4,171,1034,213,1052,192C1070.8,171,1089,85,1108,69.3C1126.2,53,1145,107,1163,117.3C1181.5,128,1200,96,1218,117.3C1236.9,139,1255,213,1274,245.3C1292.3,277,1311,267,1329,229.3C1347.7,192,1366,128,1385,101.3C1403.1,75,1422,85,1431,90.7L1440,96L1440,0L1430.8,0C1421.5,0,1403,0,1385,0C1366.2,0,1348,0,1329,0C1310.8,0,1292,0,1274,0C1255.4,0,1237,0,1218,0C1200,0,1182,0,1163,0C1144.6,0,1126,0,1108,0C1089.2,0,1071,0,1052,0C1033.8,0,1015,0,997,0C978.5,0,960,0,942,0C923.1,0,905,0,886,0C867.7,0,849,0,831,0C812.3,0,794,0,775,0C756.9,0,738,0,720,0C701.5,0,683,0,665,0C646.2,0,628,0,609,0C590.8,0,572,0,554,0C535.4,0,517,0,498,0C480,0,462,0,443,0C424.6,0,406,0,388,0C369.2,0,351,0,332,0C313.8,0,295,0,277,0C258.5,0,240,0,222,0C203.1,0,185,0,166,0C147.7,0,129,0,111,0C92.3,0,74,0,55,0C36.9,0,18,0,9,0L0,0Z"
        ></path>
      </svg>

      <div className="container">
        <div className="col">
          <div data-aos="slide-right" data-aos-duration="1500">
            <div className="row form-group">
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
          </div>

          <div data-aos="slide-left" data-aos-duration="1500">
            <div className="row form-group">
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
          </div>

          <div data-aos="slide-right" data-aos-duration="1500">
            <div className="row form-group">
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

          <div data-aos="slide-up" data-aos-duration="2000">
            <div className="col text-center form-bottom">
              <h1>Ready to buy?</h1>
              <Link to={"/products"}>
                <button id="shop-button" className="btn btn-primary btn-lg">
                  Shop All
                </button>
              </Link>
            </div>
          </div>
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

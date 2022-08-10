import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { fetchProductsThunk } from "../store/products";
import ProductCard from "../components/ProductCard";
import { ProductPagination } from "../components/Pagination";
import { addToCart, setCart } from "../store/cart";
import axios from "axios";

const ProductListView = (props) => {
  const cartItems = props.cart;
  const loggedInUser = props.loggedInUser;
  const [cartDB, setCartDB] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "All-Products", value: "1" },
    { name: "Best-Sellers", value: "2" },
    { name: "In-Ear", value: "3" },
    { name: "Over-Ear", value: "4" },
    { name: "Noise-Cancelling", value: "5" },
  ];

  const perPage = [
    { name: "3", value: "3" },
    { name: "6", value: "6" },
    { name: "9", value: "9" },
    { name: "12", value: "12" },
  ];

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

        setCartDB(inCartOrdersProducts);

        inCartOrdersProducts = inCartOrdersProducts || [];
        localStorage.setItem("cartItems", JSON.stringify(inCartOrdersProducts));
      }
    };

    fetchData().catch(console.error);
  }, [loggedInUser, cartItems]);

  const addToCartHandler = async (product) => {
    const addedProduct = product;
    props.addToCart(addedProduct);
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState("6");
  const [totalProducts, setTotalProducts] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(props.products.length);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // calculates total products for each filter
  useEffect(() => {
    if (props.products.length) {
      let newTotalProducts = [];
      for (let i = 1; i <= radios.length; i++) {
        newTotalProducts.push(
          props.products.filter((product) => {
            if (i === 1) return true;
            else if (i === 2)
              return product.numReviews >= 150 && product.ratings >= 4.0;
            else if (i === 3) return product.category === "in-ear";
            else if (i === 4) return product.category === "over-ear";
            else if (i === 5) return product.noiseCancelling === true;
          }).length
        );
      }
      setTotalProducts(newTotalProducts);
    }
  }, [props.products]);

  // calculates total products for currently selected filter and resets to page 1
  useEffect(() => {
    setCurrentTotal(totalProducts[parseInt(radioValue) - 1]);
    paginate(1);
  }, [radioValue]);

  return (
    <div className="text-center container py-5">
      <h3>
        <strong>Product List</strong>
      </h3>
      <br />
      <Row>
        <Col>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={
                  radioValue === radio.value
                    ? "outline-primary"
                    : "outline-primary"
                }
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
        <Col>
          <Row>
            <Col xs={8}>
              <p className="text-end">Items per page</p>
            </Col>
            <Col xs={4}>
              <ButtonGroup>
                {perPage.map((perPage, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`perPage-${idx}`}
                    type="radio"
                    variant={
                      productsPerPage === perPage.value
                        ? "outline-primary"
                        : "outline-primary"
                    }
                    name="perPage"
                    value={perPage.value}
                    checked={productsPerPage === perPage.value}
                    onChange={(e) => setProductsPerPage(e.currentTarget.value)}
                  >
                    {perPage.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <Row xs={1} md={2} lg={3} className="g-4">
        {props.products
          ?.filter((product) => {
            if (radioValue === "1") return true;
            else if (radioValue === "2")
              return product.numReviews >= 150 && product.ratings >= 4.0;
            else if (radioValue === "3") return product.category === "in-ear";
            else if (radioValue === "4") return product.category === "over-ear";
            else if (radioValue === "5")
              return product.noiseCancelling === true;
          })
          .slice(indexOfFirstProduct, indexOfLastProduct)
          .map((product) => {
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
      <br />
      <br />
      <div data-aos="fade-right" data-aos-duration="1500" data-aos-delay="1000">
        <ProductPagination
          productsPerPage={productsPerPage}
          totalProducts={currentTotal || props.products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
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

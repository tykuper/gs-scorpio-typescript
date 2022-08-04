import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";

const FAKE_CHECKOUT_DATA = {
  address: "113 3rd Lane Marcus Hook, PA 19061",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  paymentMethod: "VISA",
  cardNumber: "***************1132",
  expDate: "02/25",
  products: [
    {
      id: 1,
      productName: "QuietComfort Earbuds",
      quantity: 2,
      price: 199,

      imageURL:
        "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds/silo_images/v2/QCEB_PDP_Ecom-Gallery-B03.png/jcr:content/renditions/cq5dam.web.320.320.png",
    },
    {
      id: 4,
      productName: "Sport Earbuds",
      quantity: 1,
      price: 124,
      imageURL:
        "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/earbuds_500/product_silo_images/seb_product_slideshow_black_ec_03_web.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg",
    },
  ],
  tax: 20,
  shippingCost: "free",
};

const CheckOut = (props) => {
  const checkOutTotal =
    FAKE_CHECKOUT_DATA.products.reduce((cul, curr) => cul + curr.price, 0) +
    FAKE_CHECKOUT_DATA.tax;

  return (
    <Fragment>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <h1>Checkout</h1>
      <Row>
        <Col md={7}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <ListGroup variant="flush">
                {FAKE_CHECKOUT_DATA.products.map((product) => (
                  <ListGroup.Item key={product.id}>
                    <Row className="align-items-center">
                      <Col md={3}>
                        <img
                          src={product.imageURL}
                          alt={product.productName}
                          className="img-thumbnail"
                        />
                        <Link to={`/products/${product.id}`}>
                          {product.productName}
                        </Link>
                      </Col>
                      <Col md={4}>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="border-0">
                            <Row>
                              <Col>Quantity:</Col>
                              <Col>{product.quantity}</Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col>Price:</Col>
                              <Col>${product.price}</Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="#">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-grid gap-3">
              <Card.Title>Shipping</Card.Title>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Name: </strong>
                    {FAKE_CHECKOUT_DATA.firstName +
                      " " +
                      FAKE_CHECKOUT_DATA.lastName}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Email: </strong>
                    {FAKE_CHECKOUT_DATA.email}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Address: </strong>
                    {FAKE_CHECKOUT_DATA.address}
                  </Col>
                </Row>
              </ListGroup.Item>

              <Link to="#">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-grid gap-3">
              <Card.Title>Payment</Card.Title>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Method: </strong>
                    {FAKE_CHECKOUT_DATA.paymentMethod}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Card Number: </strong>
                    {FAKE_CHECKOUT_DATA.cardNumber}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Exp. Date: </strong>
                    {FAKE_CHECKOUT_DATA.expDate}
                  </Col>
                </Row>
              </ListGroup.Item>

              <Link to="#">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      $
                      {FAKE_CHECKOUT_DATA.products.reduce(
                        (cul, curr) => cul + curr.price,
                        0
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{FAKE_CHECKOUT_DATA.shippingCost}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${FAKE_CHECKOUT_DATA.tax}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${checkOutTotal}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button type="button">Place Order</Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CheckOut;

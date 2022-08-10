import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import history from "../history";
import { fetchShippingThunk, setShipping } from "../store/shipping";

const UserAccountForm = (props) => {
  const buttonRef = useRef(null);

  const { shipping: shippingInfo, loggedInUser, setShipping } = props;

  const shippingLocalStorage = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {};

  const [firstName, setFirstName] = useState(
    shippingInfo.user?.firstName || ""
  );
  const [lastName, setLastName] = useState(shippingInfo.user?.lastName || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(shippingInfo.user?.email || "");
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [zipCode, setZipCode] = useState(shippingInfo.zipcode || "");

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedShippingInfo = {
      address,
      city,
      state,
      country,
      zipcode: zipCode,
      userId: loggedInUser.id,
    };

    const updatedShipping = await axios.put(
      "/api/shipping/update",
      updatedShippingInfo
    );

    const updatedUserInfo = {
      firstName,
      lastName,
      email,
      userId: loggedInUser.id,
      password,
    };

    const updatedUser = await axios.put("/api/users/update", updatedUserInfo);

    //   fetchShippingThunk(loggedInUser.id);

    const newShippingInfo = {
      address,
      city,
      state,
      country,
      zipcode: zipCode,
      email,
      firstName,
      lastName,
    };

    localStorage.setItem("shipping", JSON.stringify(newShippingInfo));
    setShipping();

    const updatedShippingInfoAndUserInfo = {
      address,
      city,
      state,
      country,
      zipcode: zipCode,
      userId: loggedInUser.id,
      firstName,
      lastName,
      email,
    };

    localStorage.setItem(
      "shipping",
      JSON.stringify(updatedShippingInfoAndUserInfo)
    );

    history.push("/home");
  };

  return (
    <Fragment>
      <Helmet>
        <title>User Account</title>
      </Helmet>

      <div className="d-flex flex-column align-items-center">
        <h1 className="m-4 text-center">
          <strong>User Account</strong>
        </h1>
        <Form onSubmit={submitHandler}>
          <div className="d-block">
            <Form.Group
              className="mb-3 short-input-shipping"
              controlId="firstName"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 short-input-shipping"
              controlId="lastName"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-block">
            <Form.Group
              className="mb-3 password-input-shipping"
              controlId="password"
            >
              <Form.Label>Password</Form.Label>
              {/* <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
              <input
                name="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-block">
            <Form.Group className="mb-3 email-input-shipping" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-block">
            <Form.Group
              className="mb-3 address-input-shipping"
              controlId="address"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-block">
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-flex flex-column align-items-center">
            <Button variant="primary" type="submit">
              Submit Changes
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountForm);

import React, { Fragment, useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "../components/SignIn";
import { fetchShippingThunk } from "../store/shipping";

const optionalSignInView = (props) => {
  const loggedInUser = props.loggedInUser;
  useEffect(() => {
    const fetchData = async () => {
      if (loggedInUser.id) {
        await props.fetchShippingThunk(loggedInUser.id);
      } else {
        localStorage.setItem("shipping", JSON.stringify([]));
      }
    };
    fetchData();
  }, [loggedInUser.id]);

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <ListGroup.Item>
            <Row>
              <Col>
                <Login />
              </Col>
              <Col md={1} className="cia-divider">
                <span className="divider-line"></span>
                <span>
                  <strong>or</strong>
                </span>
                <span className="divider-line"></span>
              </Col>
              <Col className="new-customers-width d-flex flex-column align-items-center">
                <h3 className="text-center">New Customers</h3>
                <Link to="/shipping">
                  <button className="btn btn-primary ms-2 mt-3" type="button">
                    Continue as Guest
                  </button>
                </Link>
              </Col>
            </Row>
          </ListGroup.Item>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShippingThunk: (userId) => dispatch(fetchShippingThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(optionalSignInView);

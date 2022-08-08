import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, StaticRouter } from "react-router-dom";
import history from "../history";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const SignIn = (props) => {
  const { name, displayName, handleSubmit, error, loggedInUser } = props;

  // useEffect(() => {
  //   if (loggedInUser.id) {
  //     history.push("/shipping");
  //   }
  // }, [loggedInUser]);

  return (
    <div className="returning-customers-width">
      {name === "signup" ? (
        <div className="m-2">
          <h1>Sign Up</h1>
        </div>
      ) : (
        <div className="m-2 text-center">
          <h3>Returning Customers</h3>
          <h6>Sign in for faster checkout</h6>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        name={name}
        className="row needs-validation"
        noValidate
      >
        {name === "signup" ? (
          <div>
            <div className="col-md-4 m-4">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4 m-4">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>
        ) : null}
        <div>
          <div className="col-md-10 m-4 d-block">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-10 m-4 d-block">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary ms-2" type="submit">
              {displayName}
            </button>
            <Link style={{ textDecoration: "none" }} to="/signup">
              <strong>Create Account</strong>
            </Link>
          </div>
        </div>
        <div className="d-block">
          {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Sign In",
    error: state.auth.error,
    loggedInUser: state.auth,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  let firstName = "";
  let lastName = "";
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      if (evt.target.name === "signup") {
        firstName = evt.target.firstName.value;
        lastName = evt.target.lastName.value;
      }
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;

      const route = "cart";

      dispatch(
        authenticate(email, password, firstName, lastName, formName, route)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(SignIn);
export const Signup = connect(mapSignup, mapDispatch)(SignIn);

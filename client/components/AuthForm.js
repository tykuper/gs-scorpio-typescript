import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      {name === "signup" ? (
        <div className="m-2">
          <h1>Sign Up</h1>
        </div>
      ) : (
        <div className="m-2">
          <h1>Log In</h1>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        name={name}
        className="row needs-validation"
        novalidate
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
          <div className="col-md-4 m-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
            />
            <div class="invalid-feedback">Please provide a valid email.</div>
          </div>
          <div className="col-md-4 m-4">
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
          <div className="d-block">
            <button className="btn btn-primary" type="submit">
              {displayName}
            </button>
          </div>
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
    displayName: "Login",
    error: state.auth.error,
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
      dispatch(authenticate(email, password, firstName, lastName, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

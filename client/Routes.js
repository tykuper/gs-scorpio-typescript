import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { ConfirmationPageView } from "./views/confirmationPageView";
import { me } from "./store";
import checkOutView from "./views/checkOutView";
import SingleProductView from "./views/SingleProductView";
import ProductListView from "./views/ProductListView";
import LogInView from "./views/logInView";
import SignUpView from "./views/signUpView";
import AddProductForm from "./components/AddProductForm";
import CartView from "./views/CartView";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <div>
        {/* {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )} */}
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/products/:productId" component={SingleProductView} />
          <Route path="/checkout" component={checkOutView} />
          <Route path="/products" component={ProductListView} />
          <Route path="/confirmed/:orderId" component={ConfirmationPageView} />
          <Route path="/login" component={LogInView} />
          <Route path="/signup" component={SignUpView} />
          <Route path="/manage/products/add" component={AddProductForm} />
          <Route path="/cart" component={CartView} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

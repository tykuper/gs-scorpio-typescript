import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { ConfirmationPageView } from './views/confirmationPageView';
import { me } from './store';
import checkOutView from './views/checkOutView';
import SingleProductView from './views/singleProductView';
import ProductListView from './views/productListView';
import LogInView from './views/logInView';
import SignUpView from './views/signUpView';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import CartView from './views/cartView';
import AdminProductsView from './views/adminProductsView';
import AdminUsersView from './views/adminUsersView';
import orderHistoryView from './views/orderHistoryView';
import optionalSignInView from './views/optionalSignInView';
import ShippingView from './views/shippingView';
import NotFound from './components/NotFound';
import NotAuthorized from './components/NotAuthorized';
import userAccountView from './views/userAccountView';
import '@stripe/stripe-js';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/products/:productId" component={SingleProductView} />
          <Route path="/checkout" component={checkOutView} />
          <Route path="/products" component={ProductListView} />
          <Route path="/confirmed/:orderId" component={ConfirmationPageView} />
          <Route path="/signin/optional" component={optionalSignInView} />
          <Route path="/login" component={LogInView} />
          <Route path="/signup" component={SignUpView} />
          <Route path="/orders" component={orderHistoryView} />
          <Route path="/shipping" component={ShippingView} />
          <Route path="/cart" component={CartView} />
          <Route path="/user-account" component={userAccountView} />
          <Route exact path="/" component={Home} />
          {isAdmin ? (
            <Switch>
              <Route path="/manage/products/add" component={AddProductForm} />
              <Route
                path="/manage/products/:productId(\d+)/edit"
                component={EditProductForm}
              />
              <Route path="/manage/products" component={AdminProductsView} />
              <Route path="/manage/users" component={AdminUsersView} />
              <Route path="/cart" component={CartView} />
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/manage/products/add" component={NotAuthorized} />
              <Route
                path="/manage/products/:productId(\d+)/edit"
                component={NotAuthorized}
              />
              <Route path="/manage/products" component={NotAuthorized} />
              <Route path="/manage/users" component={NotAuthorized} />
              <Route component={NotFound} />
            </Switch>
          )}
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
    isAdmin: state.auth.isAdmin,
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

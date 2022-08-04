import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav class="navbar navbar-expand-lg bg-secondary">
    <div class="container-fluid">
      <span>
        <Link class="navbar-brand" to="/home">
          Orca Audio
        </Link>
      </span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <Link class="nav-link active" aria-current="page" to="/products">
            Products
          </Link>
        </ul>
        <div class="d-flex">
          <Link class="nav-link active" aria-current="page" to="/user">
            User
          </Link>
          <Link class="nav-link active" aria-current="page" to="/cart">
            Cart
          </Link>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

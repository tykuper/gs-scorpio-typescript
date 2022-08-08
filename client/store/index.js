import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleProduct from "./singleProduct";
import products from "./products";
import cart from "./cart";
import cartDB from "./cartDB";
<<<<<<< HEAD
import users from "./users";
=======
import shipping from "./shipping";
>>>>>>> 55f766389b5f140a218f2316115b17b74a0d0dbe

const reducer = combineReducers({
  auth,
  singleProduct,
  products,
  cart,
  cartDB,
<<<<<<< HEAD
  users,
=======
  shipping,
>>>>>>> 55f766389b5f140a218f2316115b17b74a0d0dbe
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";

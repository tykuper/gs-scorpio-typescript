import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export function addToCart(product, decrement = false) {
  return { type: ADD_TO_CART, product, decrement };
}
export function removeFromCart(product) {
  return { type: REMOVE_FROM_CART, product };
}

const initialState = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = { ...action.product, quantity: 1 };

      const sameProductInCart = state.some(
        (product) => product.id === addedProduct.id
      );

      const updatedCart = sameProductInCart
        ? state.map((product) => {
            return product.id === addedProduct.id
              ? action.decrement
                ? { ...product, quantity: product.quantity - 1 }
                : { ...product, quantity: product.quantity + 1 }
              : product;
          })
        : [...state, addedProduct];

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;

    case REMOVE_FROM_CART:
      const itemToBeRemoved = action.product;
      const removedCart = state.filter(
        (product) => product.id !== itemToBeRemoved.id
      );

      localStorage.setItem("cartItems", JSON.stringify(removedCart));

      return removedCart;

    default:
      return state;
  }
}

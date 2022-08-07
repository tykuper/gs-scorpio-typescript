import axios from "axios";

const FETCH_DB_CART = "FETCH_DB_CART";

function fetchDBCart(cart) {
  return { type: FETCH_DB_CART, cart };
}

export const fetchDBCartThunk = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/orders/user/${userId}`);
    const inCartOrders = res.data.filter(
      (item) => item.orderStatus === "In-Cart"
    );

    dispatch(fetchDBCart(inCartOrders));
  } catch (error) {
    console.log(error);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DB_CART:
      return action.cart;
    default:
      return state;
  }
}

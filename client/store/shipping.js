import axios from "axios";

const FETCH_SHIPPING_BY_USERID = "FETCH_SHIPPING_BY_USERID";
const RESET_SHIPPING = "RESET_SHIPPING";
const SET_SHIPPING = "SET_SHIPPING";

function fetchShippingByUserId(shipping) {
  return { type: FETCH_SHIPPING_BY_USERID, shipping };
}
export function resetShipping() {
  return { type: RESET_SHIPPING };
}
export function setShipping() {
  return { type: SET_SHIPPING };
}

export const fetchShippingThunk = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/shipping/${userId}`);
    const shipping = res.data;

    dispatch(fetchShippingByUserId(shipping));
  } catch (error) {
    console.log(error);
  }
};

const initialState = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SHIPPING_BY_USERID:
      localStorage.setItem("shipping", JSON.stringify(action.shipping));
      return action.shipping;
    case RESET_SHIPPING:
      localStorage.setItem("shipping", JSON.stringify({}));
      return {};
    case SET_SHIPPING:
      return JSON.parse(localStorage.getItem("shipping"));

    default:
      return state;
  }
}

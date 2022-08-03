import axios from "axios";

const FETCH_PRODUCT = "FETCH_PRODUCT";

const fetchProduct = (product) => ({
  type: FETCH_PRODUCT,
  product,
});

export const fetchProductThunk = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch(fetchProduct(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.product;
    default:
      return state;
  }
}

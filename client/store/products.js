import axios from "axios";

const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products,
});

export const fetchProductsThunk = () => async (dispatch) => {
  try {
    const { data: products } = await axios.get(`/api/products`);
    dispatch(fetchProducts(products));
  } catch (error) {
    console.log(error);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

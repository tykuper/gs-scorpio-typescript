import axios from "axios";

const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

const fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const fetchProductsThunk = () => async (dispatch) => {
  try {
    const { data: products } = await axios.get(`/api/products`);
    dispatch(fetchProducts(products));
  } catch (error) {
    console.log(error);
  }
};

export const addProductThunk = (product, history) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data: newProduct } = await axios.post("/api/products", {
      ...product,
      token,
    });

    dispatch(addProduct(newProduct));
    history.goBack();
  } catch (error) {
    console.log(error);
  }
};

export const updateProductThunk = (product, history) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data: updatedProduct } = await axios.put(
      `/api/products/${product.id}`,
      {
        ...product,
        token,
      }
    );
    dispatch(updateProduct(updatedProduct));
    history.goBack();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductThunk = (productId, history) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data: deletedProduct } = await axios.delete(
      `/api/products/${productId}`,
      token
    );
    dispatch(deleteProduct(productId));
    // need to figure out where to push
    // history.push('/')
  } catch (error) {
    console.log(error);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.productId);
    default:
      return state;
  }
}

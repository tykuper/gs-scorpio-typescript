import React from "react";
import { updateProductThunk } from "../store/products";
import { fetchProductThunk, fetchProduct } from "../store/singleProduct";
import { connect } from "react-redux";

class EditProductForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: this.props.product.id ? this.props.product.name : "",
    //   price: this.props.product.id ? this.props.product.price : 0,
    // };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.fetchSingleProduct(productId);
  }

  componentWillUnmount() {
    this.props.clearProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name,
        price: this.props.product.price,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <div className="m-2">
          <h1>Edit a Product</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="row needs-validation"
          noValidate
        >
          <div className="col-md-4 m-4">
            <label htmlFor="name" className="form-label">
              Name<sup>*</sup>
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              defaultValue={this.props.product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 m-4">
            <label htmlFor="ImageURL" className="form-label">
              ImageURL
            </label>
            <input
              name="ImageURL"
              type="url"
              className="form-control"
              defaultValue={this.props.product.imageURL}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 m-4">
            <label htmlFor="shortDescription" className="form-label">
              Short Description
            </label>
            <input
              name="shortDescription"
              type="text"
              className="form-control"
              defaultValue={this.props.product.shortDescription}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 m-4">
            <label htmlFor="longDescription" className="form-label">
              Long Description
            </label>
            <textarea
              name="longDescription"
              type="text"
              className="form-control"
              defaultValue={this.props.product.longDescription}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 m-4">
            <label htmlFor="price" className="form-label">
              Price<sup>*</sup>
            </label>
            <div className="input-group m-0">
              <span className="input-group-text">$</span>
              <input
                name="price"
                type="number"
                className="form-control"
                step="0.01"
                min="0.00"
                max="99999999.99"
                defaultValue={this.props.product.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4 m-4">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              className="form-control"
              onChange={handleChange}
            >
              <option value="uncategorized">None</option>
              <option value="in-ear">In-Ear</option>
              <option value="over-ear">Over-Ear</option>
            </select>
          </div>
          <div className="col-md-4 m-4">
            <label htmlFor="noiseCancelling" className="form-check-label">
              Noise Cancelling
            </label>{" "}
            <select
              name="noiseCancelling"
              className="form-control"
              onChange={handleChange}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <div className="d-block">
            <button className="btn btn-primary" type="submit">
              Edit Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchProductThunk(id)),
    editProduct: (product) => dispatch(updateProductThunk(product, history)),
    clearProduct: () => dispatch(fetchProduct({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm);

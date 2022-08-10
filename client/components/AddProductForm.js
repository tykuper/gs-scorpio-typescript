import React from 'react';
import { addProductThunk } from '../store/products';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addProduct({ ...this.state });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const addNotify = () => toast('Item Successfully Added!');

    return (
      <div>
        <div className="m-2">
          <h1>Add a Product</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="row needs-validation"
          novalidate
        >
          <div className="col-md-4 m-4">
            <label htmlFor="name" className="form-label">
              Name<sup>*</sup>
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 m-4">
            <label htmlFor="imageURL" className="form-label">
              ImageURL
            </label>
            <input
              name="imageURL"
              type="url"
              className="form-control"
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
            </label>{' '}
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
            <button
              className="btn btn-primary"
              type="submit"
              onClick={addNotify}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  addProduct: (product) => dispatch(addProductThunk(product, history)),
});

export default connect(null, mapDispatchToProps)(AddProductForm);

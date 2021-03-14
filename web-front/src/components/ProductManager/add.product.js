import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import Axios from 'axios';

import Side from '../Customer/profileSide';


class RemoveProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };


  handleRemove = (event) => {
    event.preventDefault();

    var instance = Axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('deleteProduct', this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { name } = this.state;

    return (
      <Card>
        <form className='form-horizontal' onSubmit={this.handleRemove}>
          <fieldset>
            <legend>REMOVE PRODUCTS</legend>
            {/* Text input*/}
            <div className='row form-group'>
              <label className='col-md-4 control-label'>
                PRODUCT NAME
            </label>
              <div className='col-md-4'>
                <input
                  id='name1'
                  name='NAME'
                  placeholder='NAME'
                  value={name}
                  className='form-control input-md'
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>

            {/* Button */}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'

              ></label>
              <div className='col-md-4'>
                <button
                  id='singlebutton1'
                  name='singlebutton'
                  className='btn btn-primary'
                  type='submit'
                >
                  REMOVE
              </button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>

    );
  }
}


///////////////////////////


class UpdateStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      stock: "",
    };
  }

  handleName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleStock = (event) => {
    this.setState({ stock: event.target.value });
  };


  handleUpdateStock = (event) => {
    event.preventDefault();

    var instance = Axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('updateStock', this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { name, stock } = this.state;

    return (
      <Card>
        <form className='form-horizontal' onSubmit={this.handleUpdateStock}>
          <fieldset>
            <legend>UPDATE STOCK</legend>
            {/* Text input*/}
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='product_id'>
                PRODUCT NAME
            </label>
              <div className='col-md-4'>
                <input
                  id='name2'
                  name='NAME'
                  placeholder='NAME'
                  value={name}
                  className='form-control input-md'
                  required
                  onChange={this.handleName}
                />
              </div>
            </div>

            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='product_id'>
                STOCK
            </label>
              <div className='col-md-4'>
                <input
                  id='stock1'
                  name='STOCK'
                  placeholder='STOCK'
                  value={stock}
                  className='form-control input-md'
                  type='number'
                  required
                  onChange={this.handleStock}
                />
              </div>
            </div>

            {/* Button */}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='singlebutton'
              ></label>
              <div className='col-md-4'>
                <button
                  id='singlebutton'
                  name='singlebutton'
                  className='btn btn-primary'
                  type='submit'
                >
                  UPDATE STOCK
              </button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>

    );
  }
}
///////////////////////////


class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: "",  //float
      oldPrice: "",  //float
      stock: "",        //int
      imgSrc: "",       //text
      name: "",        //text
      modelNo: "",  //text
      cost: "",        //float
      description: "",  //text
      warrantyStatus: "", //int
      disturbuterInfo: "", //text
      categoryName: "",  //text
      listedDate: "",      //  yyyy-mm-dd. string olarak
      categoryIconScr: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAdd = (event) => {
    event.preventDefault();

    var instance = Axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('createProduct', this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  render() {
    const { price,
      oldPrice,
      stock,
      imgSrc,
      name,
      modelNo,
      cost,
      description,
      warrantyStatus,
      disturbuterInfo,
      categoryName,
      listedDate,
      categoryIconScr,
    } = this.state;

    return (
      <Card>
        <form className='form-horizontal' onSubmit={this.handleAdd}>
          <fieldset>
            <legend>ADD PRODUCTS</legend>
            {/* Text input*/}
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='product_id'>
                PRICE
              </label>
              <div className='col-md-4'>
                <input
                  id='price'
                  name='price'
                  placeholder='PRICE'
                  value={price}
                  className='form-control input-md'
                  required
                  type='number'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* Text input*/}
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='product_name'>
                OLD PRICE
              </label>
              <div className='col-md-4'>
                <input
                  id='oldPrice'
                  name='oldPrice'
                  placeholder='OLD PRICE'
                  value={oldPrice}
                  className='form-control input-md'
                  required
                  type='number'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* Text input*/}
            <div className=' row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_name_fr'
              >
                STOCK
              </label>
              <div className='col-md-4'>
                <input
                  id='stock'
                  name='stock'
                  placeholder='STOCK'
                  value={stock}
                  className='form-control input-md'
                  required
                  type='number'
                  onChange={this.handleChange}
                />
              </div>
            </div>

            {/* Text input*/}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='available_quantity'
              >
                IMAGE SOURCE
              </label>
              <div className='col-md-4'>
                <input
                  id='imgSrc'
                  name='imgSrc'
                  placeholder='IMAGE SOURCE'
                  value={imgSrc}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>

            {/* Text input*/}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='available_quantity'
              >
                NAME
              </label>
              <div className='col-md-4'>
                <input
                  id='name'
                  name='name'
                  placeholder='NAME'
                  value={name}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>


            {/* Text input*/}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_weight'
              >
                MODEL NUMBER
              </label>
              <div className='col-md-4'>
                <input
                  id='modelNo'
                  name='modelNo'
                  placeholder='MODEL NUMBER'
                  value={modelNo}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* Text input*/}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_weight'
              >
                COST
              </label>
              <div className='col-md-4'>
                <input
                  id='cost'
                  name='cost'
                  placeholder='COST'
                  value={cost}
                  className='form-control input-md'
                  required
                  type='number'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* Text input*/}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='percentage_discount'
              >
                DESCRIPTION
              </label>
              <div className='col-md-4'>
                <input
                  id='description'
                  name='description'
                  placeholder='DESCRIPTION'
                  value={description}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* Text input*/}
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='stock_alert'>
                WARRANTY STATUS
              </label>
              <div className='col-md-4'>
                <input
                  id='warrantyStatus'
                  name='warrantyStatus'
                  placeholder='WARRANTY STATUS'
                  value={warrantyStatus}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>

            {/* Text input*/}
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='online_date'>
                DISTRIBUTOR INFO
              </label>
              <div className='col-md-4'>
                <input
                  id='disturbuterInfo'
                  name='disturbuterInfo'
                  placeholder='DISTRIBUTOR INFO'
                  value={disturbuterInfo}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>

            {/* Select Basic */}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='product_categorie'
              >
                PRODUCT CATEGORY
              </label>
              <div className='col-md-4'>
                <input
                  id='categoryName'
                  name='categoryName'
                  placeholder='Category Name'
                  value={categoryName}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>

            {/* Text input*/}
            <div className='row form-group'>
              <label className='col-md-4 control-label' htmlFor='author'>
                LISTED DATE
              </label>
              <div className='col-md-4'>
                <input
                  id='listedDate'
                  name='listedDate'
                  placeholder='LISTED DATE'
                  value={listedDate}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* Text input*/}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='enable_display'
              >
                CATEGORY ICON
              </label>
              <div className='col-md-4'>
                <input
                  id='categoryIconScr'
                  name='categoryIconScr'
                  placeholder='CATEGORY ICON'
                  value={categoryIconScr}
                  className='form-control input-md'
                  required
                  type='text'
                  onChange={this.handleChange}
                />
              </div>
            </div>

            {/* Button */}
            <div className='row form-group'>
              <label
                className='col-md-4 control-label'
                htmlFor='singlebutton'
              ></label>
              <div className='col-md-4'>
                <button
                  id='singlebutton'
                  name='singlebutton'
                  className='btn btn-primary'
                  type='submit'
                >
                  ADD
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>

    );
  }
}

function checkProductManager() {
  var isProductManager = localStorage.getItem('isProductManager');

  return isProductManager;
}

export class wholePage extends Component {
  render() {
    let ProductManager = checkProductManager();
    console.log(ProductManager);

    if (ProductManager === "true") {
      return (
        <div className="container">
          <div className="row">
          <div className="col-sm-3">
            <Side />
          </div>
          <div className="col-sm-9">
            <AddProduct />
            <br />
            <RemoveProduct />
            <br />
            <UpdateStock />
            <br />
          </div>
          </div>
         

        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Sorry you are not a Product Manager</h1>
          <h2>If you think this is an error contact us <a href="https://memes.teshil.com/wp-content/uploads/2019/07/Frontend-vs.-Backend-memes-jokes-sillyjokes.jpg">here</a></h2>
        </div>
      )

    }

  }
}

export default wholePage

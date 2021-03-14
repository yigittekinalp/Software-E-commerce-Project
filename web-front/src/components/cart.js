import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/cart.css';
import {
  Carousel,
  CardDeck,
  Container,
  Button,
  Image,
  Row,
  Col,
  CardGroup,
} from 'react-bootstrap';
import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { Dropdown } from 'semantic-ui-react';

function checkIsCustomer() {
  var isCustomer = localStorage.getItem('isCustomer');

  return isCustomer;
}

class Cart extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      showMessage: false,
      data: [],
      addressData: [],
      total: 0,
      selectedAddress: 'Select Address',
      coupon: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCouponChange = this.handleCouponChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleAddressChange(event) {
    this.setState({ selectedAddress: event });
  }
  handleCouponChange(event) {
    this.setState({ coupon: event.target.value });
  }

  handleChange(event) {
    this.setState({ myAddress: event.target.value });
    console.log(this.state.myAddress);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  calculation(data) {
    this.state.data.map(
      (item) => (this.state.total += item.price * item.quantity)
    );
    this.setState({ total: this.state.total });
  }

  componentDidMount() {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .get('seeBasket')
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data, check: true });
        this.calculation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .get('seeMyAddress')
      .then((response2) => {
        this.setState({
          addressData: response2.data,
          check: true,
        });
        console.log(response2);
        console.log(this.state.addressData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFromCart(pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/dellBasket', { pId: pId })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  }

  updateCart(pId, qty) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/updateBasket', {
        pId: pId,
        quantity: qty,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  }

  buyCart(myAddress) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('buyBasket', { address: myAddress })
      .then((response) => {
        console.log(response);
        //this.setState({ data: response.data, check: true });
        console.log(this.state.data[0]);
        window.location.reload();
        if (response.status == 200)
          alert(' Your order has been successfully completed!');
        else if (response.status == 204) alert('There is not enough stock!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useCoupon(couponName) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('useCoupon', { couponName: couponName })
      .then((response) => {
        console.log(response);
        //this.setState({ data: response.data, check: true });
        console.log(this.state.data[0]);
        window.location.reload();
        if (response.status == 200) alert(' Coupon is used successfully!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
updateNavbarValues(numBasket,numFav){

  var instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 10000,
    headers: {
      Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
    },
  });

  instance
    .get('navbarGlobals', { numBasket: numBasket, numFav: numFav})
    .then((response) => {
      console.log(response);
      //this.setState({ data: response.data, check: true });
      console.log(this.state.data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
} */

  increaseQuantity(id, qty) {
    console.log(qty);
    qty++;
    this.updateCart(id, qty);
  }
  decreaseQuantity(id, qty) {
    if (qty > 1) {
      console.log(qty);
      qty--;
      this.updateCart(id, qty);
    }
  }

  render() {
    return (
      <div>
        <div className='px-2 px-lg-0'>
          <div className='container text-black py-5 text-center'>
            <h1 className='display-4' style={{ fontSize: 40 }}>
              Shopping Cart
            </h1>
          </div>
        </div>
        <div className='pb-5'>
          <div className='container'>
            <div className='row'>
              <div class='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col' className='border-0 bg-light'>
                          <div
                            className='p-2 px-3 text-uppercase'
                            display='flex'
                          >
                            Product
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Price</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Quantity</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Remove</div>
                        </th>
                      </tr>
                    </thead>

                    {this.state.data.map((item) => {
                      return (
                        <tbody>
                          <tr>
                            <th scope='row' className='border-0 '>
                              <div className='p-2'>
                                <img
                                  src={item.imgSrc}
                                  alt=''
                                  width='70'
                                  className='img-fluid shadow-sm'
                                />
                                <div className='ml-3 d-inline-block align-middle'>
                                  <h5 className='mb-0'>
                                    <a
                                      href={'/product/' + item.pId}
                                      className='text-dark d-inline-block align-middle'
                                    >
                                      {item.name}
                                    </a>
                                  </h5>
                                  <span className='text-muted font-weight-normal font-italic d-block'>
                                    {item.categoryName}
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='border-0 align-middle'>
                              <strong>{item.price} TL</strong>
                            </td>
                            <td classNam='border-0 align-middle'>
                              <div
                                style={{ marginLeft: '6%' }}
                                className='product_quantity'
                              >
                                <button
                                  style={{ width: 25, color: '#ff6f00' }}
                                  className='fas fa-minus'
                                  onClick={() =>
                                    this.decreaseQuantity(
                                      item.pId,
                                      item.quantity
                                    )
                                  }
                                  id='inc'
                                  type='button'
                                ></button>
                                <strong>
                                  <input
                                    type='number'
                                    id='number'
                                    value={item.quantity}
                                  />
                                </strong>
                                <button
                                  style={{
                                    width: 25,
                                    color: '#ff6f00',
                                    marginTop: 20,
                                  }}
                                  className='fas fa-plus'
                                  onClick={() =>
                                    this.increaseQuantity(
                                      item.pId,
                                      item.quantity
                                    )
                                  }
                                  id='dec'
                                  type='button'
                                ></button>
                              </div>
                            </td>
                            <td className='border-0 align-middle'>
                              <Button
                                onClick={() => this.deleteFromCart(item.pId)}
                                className='text-dark'
                                variant='link'
                              >
                                <BsTrash size='1.75em' color='#ff6f00' />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>

            <div className='row py-5 p-4 bg-white rounded shadow-sm'>
              <div className='col-lg-6'>
                <div className='bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold'>
                  Coupon code
                </div>
                <div className='p-4'>
                  <p className='font-italic mb-4'>
                    If you have a coupon code, please enter it in the box below
                  </p>
                  <div className='input-group mb-4 border rounded-pill p-2'>
                    <input
                      type='text'
                      placeholder='Apply coupon'
                      aria-describedby='button-addon3'
                      className='form-control border-0'
                      value={this.state.coupon}
                      onChange={this.handleCouponChange}
                    />
                    <div className='input-group-append border-0'>
                      <button
                        onClick={() => this.useCoupon(this.state.coupon)}
                        id='button-addon3'
                        type='button'
                        className='btn btn-dark px-4 rounded-pill'
                      >
                        <i className='fa fa-gift mr-2'></i>Apply coupon
                      </button>
                    </div>
                  </div>
                </div>
                <div className='bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold'>
                  Address
                </div>
                <div className='p-4'>
                  <p className='font-italic mb-4'>
                    Select your address in the box below
                  </p>
                  <p className='font-italic mb-4'>
                    Or click <a href='/seeaddress'> here</a> to add new address.
                  </p>

                  <Dropdown
                    placeholder={this.state.selectedAddress}
                    fluid
                    selection
                  >
                    <Dropdown.Menu>
                      {this.state.addressData.map((addressitem) => {
                        return (
                          <Dropdown.Item
                            key={addressitem.address}
                            text={addressitem.address}
                            value={addressitem.address}
                            onClick={() =>
                              this.handleAddressChange(addressitem.address)
                            }
                          />
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold'>
                  Order summary
                </div>
                <div className='p-4'>
                  <p className='font-italic mb-4'>
                    Shipping and additional costs are below.
                  </p>
                  <ul className='list-unstyled mb-4'>
                    <li className='d-flex justify-content-between py-3 border-bottom'>
                      <strong className='text-muted'>Order Subtotal </strong>
                      <strong>{this.state.total} TL</strong>
                    </li>
                    <li className='d-flex justify-content-between py-3 border-bottom'>
                      <strong className='text-muted'>Shipping</strong>
                      <strong>
                        {this.state.total === 0 ? '0.00' : '10.00'} TL
                      </strong>
                    </li>
                    <li className='d-flex justify-content-between py-3 border-bottom'>
                      <strong className='text-muted'>Total</strong>
                      <h5 className='font-weight-bold'>
                        {this.state.total === 0
                          ? '0.00'
                          : this.state.total + 10}
                        TL
                      </h5>
                    </li>
                  </ul>
                  {this.state.total != 0 &&
                  this.state.selectedAddress != 'Select Address' ? (
                    <Button
                      className='btn btn-dark rounded-pill py-2 btn-block'
                      onClick={() => this.buyCart(this.state.selectedAddress)}
                    >
                      CHECKOUT
                    </Button>
                  ) : (
                    <Button
                      className='btn btn-dark rounded-pill py-2 btn-block'
                      onClick={() => this.buyCart(this.state.selectedAddress)}
                      disabled
                    >
                      CHECKOUT
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class wholePage extends Component {
  render() {
    let Customer = checkIsCustomer();

    if (Customer === 'true') {
      return (
        <div>
          <Cart />
        </div>
      );
    } else {
      return (
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <h2>Sorry you are not a Customer</h2>
            <h2>
              <h2>
                Click <a href='/sign-in'>here</a> to sign in.
              </h2>
            </h2>
          </div>
        </div>
      );
    }
  }
}

export default wholePage;

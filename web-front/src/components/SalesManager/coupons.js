import React, { Component } from 'react';
import axios from 'axios';
import '../../CSS/cart.css';
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
import { Form, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Icon } from 'semantic-ui-react';
import { BsTrash } from 'react-icons/bs';
import Side from '../Customer/profileSide';

function checkIsSalesManager() {
  var isSalesManager = localStorage.getItem('isSalesManager');

  return isSalesManager;
}

class Coupon extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      data: [],
      showMe: false,
      newCoupon: '',
      quantity: '',
      discountRate: '',
      minAge: '',
      maxAge: '',
      sex: '',
    };
    this.handleCouponChange = this.handleCouponChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleMinAgeChange = this.handleMinAgeChange.bind(this);
    this.handleMaxAgeChange = this.handleMaxAgeChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
  }
  handleCouponChange = (event) => {
    this.setState({ newCoupon: event.target.value });
    console.log(event.target.value);
  };
  handleQuantityChange = (event) => {
    console.log(event.target.value);
    this.setState({ quantity: event.target.value });
    console.log(event.target.value);
  };
  handleDiscountChange = (event) => {
    this.setState({ discountRate: event.target.value });
    console.log(event.target.value);
  };

  handleMinAgeChange = (event) => {
    this.setState({ minAge: event.target.value });
    console.log(event.target.value);
  };

  handleMaxAgeChange = (event) => {
    this.setState({ maxAge: event.target.value });
    console.log(event.target.value);
  };

  handleSexChange = (event) => {
    this.setState({ sex: event.target.value });
    console.log(event.target.value);
  };
  addCoupon(qty, item, discount, sex, minAge, maxAge) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/createCoupon', {
        quantity: qty,
        couponName: item,
        discountRate: discount,
        ageLow: minAge,
        ageHigh: maxAge,
        sex: sex,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
        if (response.status == 200) alert(' Your have created a coupon!');
      })

      .catch((error) => {
        console.log(error);
      });
  }
  operation() {
    this.setState({ showMe: !this.state.showMe });
  }
  render() {
    return (
      <div>
        <div className='px-4 px-lg-0'>
          <div className='container text-black py-5 text-center'>
            <h1 className='display-4' style={{ fontSize: 40 }}>
              Coupons
            </h1>
            <br />
            <br />
          </div>
        </div>
        <div className='pb-5'>
          <div className='container'>
            <br></br>
            <br></br>
            <div className='container'>
              <div>
                <div>
                  <div>
                    Coupon Name:
                    <br />
                    <Input
                      value={this.state.newCoupon}
                      placeholder='New Coupon'
                      onChange={this.handleCouponChange}
                      style={{
                        fontSize: 15,
                        width: 750,
                        border: 'solid 1px green ',
                      }}
                      type='text'
                      size='huge'
                      required
                    />
                  </div>

                  <br />
                  <br />
                  <div>
                    Quantity:
                    <br />
                    <Input
                      value={this.state.quantity}
                      placeholder='Quantity'
                      onChange={this.handleQuantityChange}
                      style={{
                        fontSize: 15,
                        width: 750,
                        border: 'solid 1px green ',
                      }}
                      type='number'
                      size='huge'
                      required
                    />
                  </div>
                  <br />
                  <br />

                  <div>
                    Discount:
                    <br />
                    <Input
                      value={this.state.discountRate}
                      placeholder='Discount Rate'
                      onChange={this.handleDiscountChange}
                      style={{
                        fontSize: 15,
                        width: 750,
                        border: 'solid 1px green ',
                      }}
                      type='number'
                      label={{ basic: true, content: '%' }}
                      labelPosition='left'
                      size='huge'
                      required
                    />
                  </div>

                  <br />
                  <br />

                  <div>
                    Min Age:
                    <br />
                    <Input
                      value={this.state.minAge}
                      placeholder='Min Age'
                      onChange={this.handleMinAgeChange}
                      style={{
                        fontSize: 15,
                        width: 750,
                        border: 'solid 1px green ',
                      }}
                      type='number'
                      size='huge'
                      required
                    />
                  </div>
                  <br />
                  <div>
                    Max Age:
                    <br />
                    <Input
                      value={this.state.maxAge}
                      placeholder='Max Age'
                      onChange={this.handleMaxAgeChange}
                      style={{
                        fontSize: 15,
                        width: 750,
                        border: 'solid 1px green ',
                      }}
                      type='number'
                      size='huge'
                      required
                    />
                  </div>

                  <br />
                  <br />

                  <Input
                    list='sex'
                    placeholder='Choose gender...'
                    onChange={this.handleSexChange}
                    style={{
                      fontSize: 15,
                      width: 750,
                      border: 'solid 1px green ',
                    }}
                    required
                  />
                  <datalist id='sex'>
                    <option value='Female' />
                    <option value='Male' />
                    <option value='Both' />
                  </datalist>
                </div>
                <br />
                <br />
                {this.state.newCoupon != '' ? (
                  <Button
                    variant='outline-success'
                    size='lg'
                    style={{ width: 750 }}
                    onClick={() =>
                      this.addCoupon(
                        this.state.quantity,
                        this.state.newCoupon,
                        this.state.discountRate,
                        this.state.sex,
                        this.state.minAge,
                        this.state.maxAge
                      )
                    }
                  >
                    <i className='fas fa-check'></i>
                  </Button>
                ) : (
                  <Button
                    variant='outline-success'
                    size='lg'
                    style={{ width: 750 }}
                    onClick={() =>
                      this.addCoupon(
                        this.state.quantity,
                        this.state.newCoupon,
                        this.state.discountRate,
                        this.state.sex,
                        this.state.minAge,
                        this.state.maxAge
                      )
                    }
                    disabled
                  >
                    <i className='fas fa-check'></i>
                  </Button>
                )}
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
    let SalesManager = checkIsSalesManager();

    if (SalesManager === 'true') {
      return (
        <div>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-3 pt-2'>
                <br />
                <br />

                <Side />
              </div>
              <div className='col-sm-9 pt-2'>
                <Coupon />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Sorry you are not a Sales Manager</h1>
          <h2>
            If you think this is an error contact us{' '}
            <a
              target='_blank'
              href='https://memes.teshil.com/wp-content/uploads/2019/07/Frontend-vs.-Backend-memes-jokes-sillyjokes.jpg'
            >
              here
            </a>
          </h2>
        </div>
      );
    }
  }
}

export default wholePage;

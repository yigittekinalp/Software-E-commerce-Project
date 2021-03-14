import React, { Component } from 'react';
import axios from 'axios';
import '../../CSS/orders.css';
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
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Icon } from 'semantic-ui-react';
import { BsTrash } from 'react-icons/bs';
import moment from 'moment';
import Collapsible from 'react-collapsible';
import ProfileSide from './profileSide';

function checkIsCustomer() {
  var isCustomer = localStorage.getItem('isCustomer');

  return isCustomer;
}

function checkUsername() {
  var username = localStorage.getItem('username');

  return username;
}

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadedOrders: [],
    };
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
      .post('orders', { mobile: 'no' })
      .then((response) => {
        this.setState({ data: response.data, check: true });
        console.log(this.state.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className='px-2 px-lg-0'>
          <div className='container text-black py-5 text-center'>
            <h1 className='display-4' style={{ fontSize: 40 }}>
              Orders
            </h1>
          </div>
        </div>
        {Object.keys(this.state.data).map((key, index) => {
          return (
            <div>
              <div>
                <div className='container-fluid my-5 d-flex justify-content-center'>
                  <div className='card card-1'>
                    <div className='card-header bg-white'>
                      <div className='media flex-sm-row flex-column-reverse justify-content-between '>
                        <div className='col my-auto'>
                          <div className='row justify-content-between mb-3'>
                            <div className='col-lg-12 mb-8 mb-lg-0  '>
                              <h6
                                className='color-1 mb-0 change-color'
                                style={{ fontSize: 20 }}
                              >
                                Receipt #{key}
                              </h6>
                              <h4 className='mb-0 '>
                                Thank you for your order,
                                <span className='change-color'>
                                  {checkUsername()}
                                </span>{' '}
                                !
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <Collapsible
                      trigger="Click here to see your receipt's detail."
                      triggerStyle={{ fontSize: 20 }}
                    >
                      <br></br>
                      <div className='card-body'>
                        {Object.keys(this.state.data[key].items).map((card) => {
                          const item = this.state.data[key].items[card];
                          console.log(item);
                          return (
                            <div className='row'>
                              <div className='col'>
                                <div className='card card-2'>
                                  <div className='card-body'>
                                    <div className='media'>
                                      <div className='sq align-self-center '>
                                        {' '}
                                        <img
                                          className='img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0'
                                          src={item.imgSrc}
                                          width={135}
                                          height={135}
                                        />{' '}
                                      </div>
                                      <div className='media-body my-auto text-right'>
                                        <div className='row my-auto flex-column flex-md-row'>
                                          <div className='col my-auto'>
                                            <h6 className='mb-0'>
                                              <a href={'/product/' + item.pId}>
                                                {item.name}
                                              </a>
                                            </h6>
                                          </div>

                                          <div className='col my-auto'>
                                            <small>Qty: {item.quantity}</small>
                                          </div>
                                          <div className='col my-auto'>
                                            <h6 className='mb-0'>
                                              Price: {item.quantity} x{' '}
                                              {item.price} TL
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <hr className='my-3 ' />
                                    <div className='row'>
                                      <div className='col-md-3 mb-3'>
                                        <small>
                                          Track Order
                                          <span>
                                            <i
                                              className=' ml-2 fa fa-refresh'
                                              aria-hidden='true'
                                            />
                                          </span>
                                        </small>
                                      </div>
                                      <div className='col mt-auto'>
                                        {item.isDelivered === false ? (
                                          <div className='progress my-auto'>
                                            <div
                                              className='progress-bar progress-bar rounded'
                                              style={{ width: '62%' }}
                                              role='progressbar'
                                              aria-valuenow={25}
                                              aria-valuemin={0}
                                              aria-valuemax={100}
                                            />
                                          </div>
                                        ) : (
                                          <div className='progress my-auto'>
                                            {' '}
                                            <div
                                              className='progress-bar progress-bar rounded'
                                              style={{ width: '100%' }}
                                              role='progressbar'
                                              aria-valuenow={100}
                                              aria-valuemin={0}
                                              aria-valuemax={100}
                                            />
                                          </div>
                                        )}
                                        <div className='media row justify-content-between '>
                                          <div className='col-auto text-right'>
                                            <span>
                                              {' '}
                                              <small className='text-right mr-sm-2' />{' '}
                                              <i className='fa fa-circle active' />{' '}
                                            </span>
                                          </div>
                                          <div className='flex-col'>
                                            {' '}
                                            <span>
                                              {' '}
                                              <small className='text-right mr-sm-2'>
                                                Out for delivery
                                              </small>
                                              <i className='fa fa-circle active' />
                                            </span>
                                          </div>
                                          <div className='col-auto flex-col-auto'>
                                            <span>
                                              <small className='text-right mr-sm-2'>
                                                Delivered
                                              </small>
                                              {item.isDelivered === true ? (
                                                <i className='fa fa-circle active' />
                                              ) : (
                                                <i className='fa fa-circle' />
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Collapsible>
                    <div className='row mt-4'>
                      <div className='col'>
                        <div className='row justify-content-between'>
                          <div className='col-auto'>
                            <p className='mb-1 text-dark'>
                              <b>Order Details</b>
                            </p>

                            <div className='col'>
                              <p className='mb-1'> Invoice Number :{key}</p>
                              <p className='mb-1'>
                                Invoice Date :
                                {moment(this.state.data[key].time).format(
                                  'DD MMM, YYYY'
                                )}
                              </p>
                            </div>
                          </div>
                          <div className='flex-sm-col text-right col'>
                            <p className='mb-1'>
                              <b>Delivery Charges </b>
                            </p>
                          </div>
                          <div className='flex-sm-col col-auto'>
                            <p className='mb-1'>10 TL</p>
                          </div>
                        </div>

                        <div className='row justify-content-between'>
                          <div className='flex-sm-col text-right col'>
                            <p className='mb-1'>
                              <b>Total</b>
                            </p>
                          </div>
                          <div className='flex-sm-col text-dark col-auto'>
                            <p className='mb-1'>
                              {this.state.data[key].totalPrice} TL
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
          <div className='container'>
            <div className='row'>
              <div className='col-sm-3 pt-2'>
                <br />
                <br />

                <ProfileSide />
              </div>
              <div className='col-sm-9 pt-2'>
                <Orders />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>It appears that you are not logged in</h1>
          <h2>
            To sign in click{' '}
            <a
              href='/sign-in'
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

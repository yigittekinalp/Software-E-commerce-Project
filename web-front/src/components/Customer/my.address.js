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
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Icon } from 'semantic-ui-react';
import { BsTrash } from 'react-icons/bs';

import ProfileSide from './profileSide';


function checkIsCustomer() {
  var isCustomer = localStorage.getItem('isCustomer');

  return isCustomer;
}

class SeeMyAddress extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      data: [],
      showMe: false,
      newAddress: '',
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  handleAddressChange = (event) => {
    this.setState({ newAddress: event.target.value });
  };

  componentDidMount() {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .get('seeMyAddress')
      .then((response) => {
        this.setState({ data: response.data, check: true });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteAddress(item) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/deleteAddress', { address: item })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  }
  addAddress(item) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/addAddress', { address: item })
      .then((response) => {
        console.log(response);
        window.location.reload();
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
              My Addresses
            </h1>
            <br />
            <br />
          </div>
        </div>
        <div className='pb-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-5 mb-4 mb-lg-0  '>
                <Button
                  variant='outline-success'
                  size='lg'
                  onClick={() => this.operation()}
                >
                  <i className='fas fa-map-marker-alt'></i> Add New Address
                </Button>
              </div>
              {this.state.showMe ? (
                <div className='col-lg-6 mb-4 mb-lg-0  '>
                  <div className='hundred wide field '>
                    <Form.TextArea
                      onChange={this.handleAddressChange}
                      value={this.state.newAddress}
                      placeholder='New Address..'
                      rows='4'
                      cols='50'
                      style={{ fontSize: 20, border: 'solid 1px green ' }}
                      required
                    />
                  </div>
                  {this.state.newAddress != '' ? (
                    <Button
                      variant='outline-success'
                      size='lg'
                      onClick={() => this.addAddress(this.state.newAddress)}
                    >
                      <i className='fas fa-check'></i>
                    </Button>
                  ) : (
                    <Button
                      variant='outline-success'
                      size='lg'
                      onClick={() => this.addAddress(this.state.newAddress)}
                      disabled
                    >
                      <i className='fas fa-check'></i>
                    </Button>
                  )}
                </div>
              ) : null}

              <div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col' className='border-0 bg-light'>
                          <div
                            className='p-2 px-3 text-uppercase  '
                            style={{ fontSize: 17 }}
                          >
                            My Addresses
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div
                            className='py-2 text-uppercase'
                            style={{ fontSize: 17 }}
                          >
                            Delete
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {this.state.data.map((item) => {
                      console.log(item);
                      return (
                        <tbody>
                          <tr>
                            <td
                              className='border-0 align-middle'
                              style={{ fontSize: 16 }}
                            >
                              <strong>{item.address} </strong>
                            </td>

                            <td className='border-0 align-middle'>
                              <Button
                                onClick={() => this.deleteAddress(item.address)}
                                className='text-dark'
                                variant='link'
                              >
                                <BsTrash size='1.9em' color='red' />
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
          <div className='container'>
              <div className='row'>
                <div className='col-sm-3 pt-2'>
                  <br />
                  <br />

                  <ProfileSide />
                </div>
                <div className='col-sm-9 pt-2'>
                  <SeeMyAddress />
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

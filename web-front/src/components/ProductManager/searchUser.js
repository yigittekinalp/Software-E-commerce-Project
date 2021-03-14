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
import { Rating } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment';
import Side from '../Customer/profileSide';

function checkProductManager() {
  var isProductManager = localStorage.getItem('isProductManager');

  return isProductManager;
}

class SearchUser extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      data: [],
      username: '',
      i: 0,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  searchUser(username) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('searchUser', {
        username: username,
      })
      .then((response) => {
        this.setState({ data: response.data, check: true });
        console.log(this.state.data);
      })

      .catch((error) => {
        console.log(error);
      });
    this.state.i = 0;
  }

  ApproveReview(rId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('reviewRating', {
        rId: rId,
        approvalStatus: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  RejectReview(rId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('reviewRating', {
        rId: rId,
        approvalStatus: false,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='pb-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 mb-4 mb-lg-0  '>
              <br></br>
              <br></br>

              <div className='col-lg-6 mb-4 mb-lg-0 '>
                <input
                  id='username'
                  name='username'
                  placeholder='Search Username'
                  value={this.state.username}
                  className='form-control input-md'
                  required
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div className='col-lg-6 mb-4 mb-lg-0  '>
                <br></br>
                <Button
                  variant='outline-success'
                  size='md'
                  onClick={() => this.searchUser(this.state.username)}
                >
                  <i className='fa fa-search'></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {Object.keys(this.state.data).map((key, index) => {
          if (this.state.i === 0) {
            this.state.i++;
            console.log(key);
            return (
              <div>
                <div id='review'>
                  <div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                    <div className='table-responsive'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='p-2 px-3 text-uppercase'>
                                Product Name
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>
                                Customer's Reviews
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>
                                Customer's Ratings
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>Approve</div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>Reject</div>
                            </th>
                          </tr>
                        </thead>
                        {this.state.data.rating.map((item) => {
                          console.log(item);
                          return (
                            <tbody>
                              <tr>
                                <td className='border-0 align-middle'>
                                  <strong>
                                    <a href={'/product/' + item.pId}>
                                      {item.productName}
                                    </a>
                                  </strong>
                                </td>

                                <div className='ml-3 d-inline-block align-middle'>
                                  <h5 className='mb-0'>
                                    <u className='text-muted font-weight-normal font-italic d-block'>
                                      {item.commentHeader}
                                    </u>
                                  </h5>
                                  <span className='text-dark d-inline-block align-middle'>
                                    {item.commentbody}
                                  </span>
                                </div>

                                <td className='border-0 align-middle'>
                                  <strong>
                                    <div>
                                      <Rating
                                        rating={item.rating}
                                        maxRating={5}
                                        size='small'
                                        icon='star'
                                        disabled
                                      />
                                    </div>
                                  </strong>
                                </td>
                                <td className='border-0 align-middle'>
                                  <Button
                                    style={{ color: 'success' }}
                                    onClick={() => this.ApproveReview(item.rId)}
                                  >
                                    Approve
                                  </Button>
                                </td>
                                <td className='border-0 align-middle'>
                                  <Button
                                    variant='danger'
                                    onClick={() => this.RejectReview(item.rId)}
                                  >
                                    Reject
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

                <div id='invoices'>
                  <div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                    <div className='table-responsive'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='p-2 px-3 text-uppercase'>
                                Invoice ID
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>
                                Product Name{' '}
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>
                                {' '}
                                Purchase Date
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>
                                Delivered?
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>Address</div>
                            </th>
                          </tr>
                        </thead>

                        {this.state.data.invoice.map((item) => {
                          return (
                            <tbody>
                              <tr>
                                <td className='border-0 align-middle'>
                                  <strong>{item.iId} </strong>
                                </td>

                                <td className='border-0 align-middle'>
                                  <strong>{item.productName} </strong>
                                </td>
                                <td className='border-0 align-middle'>
                                  <strong>
                                    {' '}
                                    {moment(item.time).format(
                                      'DD MMM, YYYY'
                                    )}{' '}
                                  </strong>
                                </td>
                                <td className='border-0 align-middle'>
                                  {item.IsDelivered
                                    ? 'Delivered'
                                    : 'Not Delivered'}
                                </td>
                                <td className='border-0 align-middle'>
                                  <strong>{item.address} </strong>
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
            );
          }
        })}
      </div>
    );
  }
}
export class wholePage extends Component {
  render() {
    let ProductManager = checkProductManager();

    if (ProductManager === 'true') {
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
                <SearchUser />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Sorry you are not a Product Manager</h1>
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

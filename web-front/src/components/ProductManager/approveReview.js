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
import { Rating } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Side from '../Customer/profileSide';

function checkProductManager() {
  var isProductManager = localStorage.getItem('isProductManager');

  return isProductManager;
}

class ApproveReview extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      data: [],
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
      .get('approvalList')
      .then((response) => {
        this.setState({ data: response.data, check: true });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div>
        <div className='px-4 px-lg-0'>
          <div className='container text-black py-5 text-center'>
            <h1 className='display-4' style={{ fontSize: 40 }}>
              Approve Reviews
            </h1>
          </div>
        </div>
        <div className='pb-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='p-2 px-3 text-uppercase'>
                            Review ID
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Review</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'> Rating</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Product</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Approve</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Reject</div>
                        </th>
                      </tr>
                    </thead>
                    {this.state.data.map((item) => {
                      console.log(item);
                      return (
                        <tbody>
                          <tr>
                            <td className='border-0 align-middle'>
                              <strong>{item.rId} </strong>
                            </td>

                            <div className='ml-3 d-inline-block align-middle'>
                              <h5 className='mb-0'>
                                <u
                                  className='text-muted font-weight-normal
                                  font-italic d-block'
                                >
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
                              <strong>{item.productName} </strong>
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
        </div>
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
                <ApproveReview />
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

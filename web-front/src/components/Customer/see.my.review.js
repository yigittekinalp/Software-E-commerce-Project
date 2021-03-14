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

import ProfileSide from './profileSide';

function checkIsCustomer() {
  var isCustomer = localStorage.getItem('isCustomer');

  return isCustomer;
}

class SeeReview extends Component {
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
      .get('seeMyRating')
      .then((response) => {
        this.setState({ data: response.data, check: true });
        console.log(response);
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
              My Reviews
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
                            Product Name
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>My Review</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>My Rating</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>
                            Approval Status
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {this.state.data.map((item) => {
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
                              <strong>
                                {' '}
                                {item.Approved === true
                                  ? 'Approved'
                                  : item.waitingForApproval === true
                                  ? 'Waiting for approval'
                                  : 'Rejected'}
                              </strong>
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
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3 pt-2'>
              <br />
              <br />

              <ProfileSide />
            </div>
            <div className='col-sm-9 pt-2'>
              <SeeReview />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>It appears that you are not logged in</h1>
          <h2>
            To sign in click <a href='/sign-in'>here</a>
          </h2>
        </div>
      );
    }
  }
}

export default wholePage;

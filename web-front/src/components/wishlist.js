import React, { Component } from 'react';
import axios from 'axios';
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

function checkIsCustomer() {
  var isCustomer = localStorage.getItem('isCustomer');

  return isCustomer;
}

class Wishlist extends Component {
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
      .get('seeFavourite')
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data, check: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFromWishlist(pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/dellFavourite', { pId: pId })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  }

  addCart(price, pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('addBasket', {
        quantity: 1,
        totalPrice: price,
        pId: pId,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
        if (response.status == 200) alert('Product is added to the cart!');
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
              Wishlist
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
                          <div className='p-2 px-3 text-uppercase'>Product</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Price</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'> Remove</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Add To Cart</div>
                        </th>
                      </tr>
                    </thead>
                    {this.state.data.map((item) => {
                      return (
                        <tbody>
                          <tr>
                            <th
                              scope='row'
                              className='border-0'
                              align='flex-start'
                            >
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
                            <td className='border-0 align-middle'>
                              <Button
                                onClick={() =>
                                  this.deleteFromWishlist(item.pId)
                                }
                                className='text-dark'
                                variant='link'
                              >
                                <BsTrash size='1.75em' color='#ff6f00' />
                              </Button>
                            </td>
                            <td className='border-0 align-middle'>
                              <Button
                                onClick={() =>
                                  this.addCart(item.price, item.pId)
                                }
                                className='text-dark'
                                variant='link'
                              >
                                <FaShoppingCart size='1.75em' color='#ff6f00' />
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
          <Wishlist />
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

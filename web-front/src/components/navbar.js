import React, { Component } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import Search from './search';
import '../CSS/header.css';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function checkUsername() {
  var username = localStorage.getItem('username');
  return username;
}

function lg() {
  localStorage.removeItem('username');
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('isProductManager');
  localStorage.removeItem('isSalesManager');
  localStorage.removeItem('isCustomer');

  window.location.reload();
}

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      cartVal: 0,
      wishlistVal: 0,
      srcText: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  componentDidMount() {
    var instance = Axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .get('navbarGlobals')
      .then((response) => {
        this.setState({
          cartVal: response.data.numBasket,
          wishlistVal: response.data.numFav,
          check: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearch = (event) => {
    Axios.post('http://localhost:8000/api/search', this.state)
      .then((response) => {
        console.log(response);
        this.props.history.push({
          pathname: '/search',
          state: { text: response.data, srcText: this.state.text },
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let username = checkUsername();

    if (username !== null) {
      return (
        <div>
          <nav>
            <Navbar
              collapseOnSelect
              expand='xl'
              className='navbar fixed-top shadow-sm bg-white'
            >
              <div className='container'>
                <div className='row w-100'>
                  <div className='col-sm-2 pt-1'>
                    <a href='/main'>
                      <img
                        src={process.env.PUBLIC_URL + '/dino.png'}
                        style={{ width: 70 }}
                      />
                    </a>
                  </div>
                  <div className='col-sm-5 align-center pt-3'>
                    <div className='p-1 bg-light rounded rounded-pill shadow-sm mb-4'>
                      <div className='input-group'>
                        <input
                          type='text'
                          onChange={this.handleChange}
                          value={this.state.text}
                          placeholder="What're you searching for?"
                          aria-describedby='button-addon1'
                          className='form-control border-0 bg-light'
                        />
                        <div className='input-group-append'>
                          <button
                            onClick={this.handleSearch}
                            id='button-addon1'
                            type='submit'
                            className='btn btn-link text-dark'
                          >
                            <i className='fa fa-search' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-5 pt-3'>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                      <NavDropdown.Item href='/seeReview'>
                        <div className='col-xs-3'>
                          <a className='header-text'>
                            <div className='d-inline-flex'>
                              <div className='icon-wrap'>
                                <i className='header-icon fas fa-user' />
                              </div>
                              <div className='text-wrap'>
                                <div>{username}</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>

                      <NavDropdown.Item>
                        <div className='col-xs-3'>
                          <a
                            href='#'
                            onClick={() => lg()}
                            className='header-text'
                          >
                            <div className='d-inline-flex'>
                              <div className='icon-wrap'>
                                <i className='header-icon fas fa-user-slash' />
                              </div>
                              <div className='text-wrap'>
                                <div>Logout</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item href='/cart'>
                        <div className='col-xs-3 '>
                          <a className='header-text'>
                            <div className='d-inline-flex'>
                              <div className='icon-wrap pt-2'>
                                <i className='header-icon fas fa-shopping-cart' />
                              </div>
                              <div className='text-wrap'>
                                <span className='small round badge badge-secondary'>
                                  {this.state.cartVal}
                                </span>
                                <div>Cart</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item href='/wishlist'>
                        <div className='col-xs-3'>
                          <a className='header-text'>
                            <div className='d-inline-flex'>
                              <div className='icon-wrap pt-2'>
                                <i className='header-icon fas fa-heart' />
                              </div>

                              <div className='text-wrap'>
                                <span className='small round badge badge-secondary'>
                                  {this.state.wishlistVal}
                                </span>
                                <div>Wishlist</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>
                    </Navbar.Collapse>
                  </div>
                </div>
              </div>
            </Navbar>
          </nav>
          <div id="colorbar" className='first-section fixed-top' ></div>
        </div>
      );
    } else {
      return (
        <div>
          <nav>
            <Navbar
              collapseOnSelect
              expand='xl'
              className='navbar fixed-top shadow-sm bg-white'
            >
              <div className='container'>
                <div className='row w-100'>
                  <div className='col-sm-2 pt-1'>
                    <a className='' href='/main'>
                      <img
                        src={process.env.PUBLIC_URL + '/dino.png'}
                        style={{ width: 70 }}
                      />
                    </a>
                  </div>
                  <div className='col-sm-5 pt-3'>
                    <div className='p-1 bg-light rounded rounded-pill shadow-sm mb-4'>
                      <div className='input-group'>
                        <input
                          type='text'
                          onChange={this.handleChange}
                          value={this.state.text}
                          placeholder="What're you searching for?"
                          aria-describedby='button-addon1'
                          className='form-control border-0 bg-light'
                        />
                        <div className='input-group-append'>
                          <button
                            onClick={this.handleSearch}
                            id='button-addon1'
                            type='submit'
                            className='btn btn-link text-dark'
                          >
                            <i className='fa fa-search' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-5 pt-3'>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                      <NavDropdown.Item href='/sign-in'>
                        <div className='col-xs-3'>
                          <a className='header-text'>
                            <div className='d-inline-flex'>
                              <div className='icon-wrap'>
                                <i className='header-icon fas fa-user' />
                              </div>
                              <div className='text-wrap'>
                                <div>Sign In</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/sign-up'>
                        <div className='col-xs-3'>
                          <a className='header-text'>
                            <div className='d-inline-flex'>
                              <div className='icon-wrap'>
                                <i className='header-icon fas fa-user-plus' />
                              </div>
                              <div className='text-wrap'>
                                <div>Sign Up</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/cart'>
                        <div className='col-xs-3'>
                          <a className='header-text'>
                            <div className='d-inline-flex'>
                              <div className='icon-wrap pt-1'>
                                <i className='header-icon fas fa-shopping-cart' />
                              </div>
                              <div className='text-wrap'>
                                <div>Cart</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/wishlist'>
                        <div className='col-xs-3'>
                          <a className='header-text'>
                            <div className='d-inline-flex'>
                              <div className='icon-wrap pt-1'>
                                <i className='header-icon fas fa-heart' />
                              </div>
                              <div className='text-wrap'>
                                <div>Wishlist</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </NavDropdown.Item>
                    </Navbar.Collapse>
                  </div>
                </div>
              </div>
            </Navbar>
          </nav>
          <div id="colorbar" className='first-section fixed-top' ></div>

        </div>
      );
    }
  }
}
export default withRouter(header);

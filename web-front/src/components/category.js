import React, { Component } from 'react';
import ShopingCard from './carousel';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../CSS/search.css';
import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import { TiHeartFullOutline } from 'react-icons/ti';
import {
  Carousel,
  CardDeck,
  Container,
  Image,
  Row,
  Col,
  Button,
  CardGroup,
  Table,
} from 'react-bootstrap';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';

import { Rating } from 'semantic-ui-react';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { getProducts } from '../repo';
export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: [],
      searchResult: [],
      qty: 1,
      priceLow: 1,
      priceHigh: 99999,
      rating: 0,
      option: false,
      category: 'all',
      orderBy: 'price',
      realtext: '',
      isButtonClicked: false,
      products: [],
      value: 'HN',
    };
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleLowChange = this.handleLowChange.bind(this);
    this.handleHighChange = this.handleHighChange.bind(this);
    this.change = this.change.bind(this);
    this.catChange = this.catChange.bind(this);
  }

  change = (event) => {
    this.setState({ value: event.target.value });
  };

  changeFunc() {
    if (this.state.value == 'HP') {
      this.setState({ option: true });
      this.setState({ orderBy: 'price' });
      console.log(this.state.orderBy);

      console.log('Ascending price');
    } else if (this.state.value == 'LP') {
      this.setState({ option: false });
      this.setState({ orderBy: 'price' });
      console.log(this.state.orderBy);

      console.log('Descending price');
    } else if (this.state.value == 'HN') {
      this.setState({ option: true });
      this.setState({ orderBy: 'name' });
      console.log(this.state.orderBy);

      console.log('Ascending name');
    } else if (this.state.value == 'LN') {
      this.setState({ option: false });
      this.setState({ orderBy: 'name' });
      console.log('Decending name');
    }
  }
  catChange = (event) => {
    this.setState({ category: event.target.value });
  };
  handleRatingChange = (event, { rating }) => {
    this.setState({ rating });
  };

  handleLowChange = (event) => {
    this.setState({ priceLow: event.target.value });
  };

  handleHighChange = (event) => {
    this.setState({ priceHigh: event.target.value });
  };

  addCart(qty, price, pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 3000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('addBasket', {
        quantity: qty,
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

  advanceSearch(priceLow, priceHigh, category, rating) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 3000,

    });
    this.changeFunc();
    instance
      .post('advanceSearch', {
        text: '___category___',
        priceLow: priceLow,
        priceHigh: priceHigh,
        orderBy: this.state.orderBy,
        option: this.state.option,
        category: category,
        rating: rating,
      })

      .then((response) => {
        console.log(response);
        this.state.isButtonClicked = true;

        this.setState({ searchResult: response.data, check: true });

        if (this.state.isButtonClicked == true) {
          this.setState({ searchText: this.state.searchResult });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }

  addWishlist(pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 3000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('addFavourite', {
        pId: pId,
      })

      .then((response) => {
        console.log(response);
        window.location.reload();
        if (response.status == 200) alert('Product is added to the wishlist!');
      })

      .catch((error) => {
        console.log(error);
      });
  }

  handleSearch = () => {
    let searchText = this.props.location.state.text;
    let realtext = this.props.location.state.srcText;
    console.log(searchText);
    console.log(realtext);

    this.setState({
      searchText: searchText,
      realtext: realtext,
    });
  };
  componentDidMount() {
    // this.handleSearch();
    // getProducts().then((products) => {
    //   this.setState({ products });
    //  console.log(this.state.products);
    if (this.state.value == 'HN') {
      this.setState({ option: true });
      this.setState({ orderBy: 'name' });
      console.log(this.state.orderBy);
    }
    let url = window.location.href;
    let categoryName = url.split('name=')[1];
    //console.log(url.split("name="));
    console.log(categoryName);
    this.setState({
      category: categoryName,
    });
    this.advanceSearch(0, 99999, categoryName, 0);

    // });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <Table>
                <tbody>
                  <tr>
                    <th scope='col' className='border-0 bg-light'>
                      <div className='p-2 px-3 text-uppercase'>Price Range</div>
                    </th>
                  </tr>

                  <tr>
                    <th scope='row' className='border-0' align='flex-start'>
                      <div className='p-2'>
                        <div className='ml-3 d-inline-block align-middle'>
                          <h5 className='mb-0'>
                            Low:
                            <input
                              id='pricelow'
                              name='pricelow'
                              placeholder='Low'
                              value={this.state.priceLow}
                              className='form-control input-md'
                              required
                              onChange={this.handleLowChange}
                            />
                            <br />
                            High:
                            <input
                              id='pricehigh'
                              name='pricehigh'
                              placeholder='High'
                              value={this.state.priceHigh}
                              className='form-control input-md'
                              required
                              onChange={this.handleHighChange}
                            />
                          </h5>
                        </div>
                      </div>
                    </th>
                  </tr>

                  <tr>
                    <th scope='col' className='border-0 bg-light'>
                      <div className='py-2 text-uppercase'>Minimum Rating</div>
                    </th>
                  </tr>
                  <tr>
                    <td className='border-0 align-middle'>
                      <Rating
                        onRate={this.handleRatingChange}
                        value={this.state.rating}
                        maxRating={5}
                        size='small'
                        icon='star'
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <th scope='col' className='border-0 bg-light'>
                      <div className='py-2 text-uppercase'> Sort by</div>
                    </th>
                  </tr>
                  <tr>
                    <td className='border-0 align-middle'>
                      <select onChange={this.change} value={this.state.value}>
                        <option>Sort By</option>
                        <option value='HN'>Name A-Z</option>
                        <option value='LN'>Name Z-A</option>
                        <option value='HP'>Price Low to High</option>
                        <option value='LP'>Price High to Low</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <style type='text/css'>
                    {`
                    .btn-flat {
                      background-color: #ff6f00;
                      color: white;
                    }

                    `}
                  </style>
                  <Button
                    variant='flat'
                    size='lg'
                    onClick={() =>
                      this.advanceSearch(
                        this.state.priceLow,
                        this.state.priceHigh,
                        this.state.category,
                        this.state.rating
                      )
                    }
                  >
                    <i className='fa fa-search' />
                  </Button>
                </tfoot>
              </Table>
            </Col>
            <Col xs={10}>
              <div className='col-lg-12 col-md-10 col-sm-8 col-xs-12'>
                <div className='search-box'>
                  <div className='row'>
                    {console.log(this.state.searchText)}
                    {console.log(this.state.searchResult)}
                    {this.state.searchText.map((card) => {
                      return (
                        <div className='uniqueCard'>
                          <Card style={{ width: '18rem' }}>
                            <a href={'/product/' + card.pId}>
                              <div
                                className='h-25 p-0 m-0'
                                style={{ backgroundColor: '#fffffff' }}
                              >
                                <Card.Title
                                  className='h-5 p-0 m-0'
                                  style={{ height: '8rem' }}
                                >
                                  <h3
                                    style={{
                                      color: '#ff6002',
                                      backgroundColor: '#fffffff',
                                    }}
                                  >
                                    {card.name}
                                  </h3>
                                </Card.Title>
                              </div>

                              <Image
                                className='p-0 m-0 img-fluid'
                                variant='bottom'
                                src={card.imgSrc}
                                rounded
                              />
                              <Card.Body
                                style={{
                                  color: '#676767',
                                  backgroundColor: '#fffffff',
                                  height: '5rem',
                                }}
                              >
                                <Card.Text className='h-25 p-0 m-0'>
                                  <h4
                                    style={{
                                      color: '#ff6002',
                                      backgroundColor: '#fffffff',
                                    }}
                                  >
                                    <strong>{card.price} TL</strong>
                                  </h4>
                                </Card.Text>
                                <br></br>
                                {card.displayOldPrice === true ? (
                                  <Card.Text className='h-25 p-0 m-0'>
                                    <h5
                                      style={{
                                        color: '#676767',
                                        backgroundColor: '#fffffff',
                                      }}
                                    >
                                      <strike>{card.oldPrice} TL </strike>
                                    </h5>
                                  </Card.Text>
                                ) : null}
                              </Card.Body>
                            </a>
                            <Card.Footer>
                              <Container>
                                <Row className='p-0'>
                                  <Button
                                    variant='link'
                                    onClick={() =>
                                      this.addCart(
                                        this.state.qty,
                                        card.price,
                                        card.pId
                                      )
                                    }
                                  >
                                    <Col className='marginleft'>
                                      <FaShoppingCart
                                        size='1.75em'
                                        color='#FFA533'
                                      />
                                    </Col>
                                  </Button>
                                  <Button
                                    variant='link'
                                    onClick={() => this.addWishlist(card.pId)}
                                  >
                                    <Col className='marginright'>
                                      <TiHeartFullOutline
                                        size='1.75em'
                                        color='#EE1414'
                                      />
                                    </Col>
                                  </Button>
                                </Row>
                              </Container>
                            </Card.Footer>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Search);

import React, { Component, } from 'react';
import axios from 'axios';
import '../CSS/product.css';
import { Button, Comment, Form, Rating, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Pagination, Container, Row, Col } from 'react-bootstrap'

function checkUsername() {
  var username = localStorage.getItem('username');
  return username;
}
function checkProductManager() {
  var isProductManager = localStorage.getItem('isProductManager');

  return isProductManager;
}

export default class Products extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      data: [],
      reviewData: [],
      page: 1,
      qty: 1,
      rating: 0,
      header: '',
      comment: '',
      showMe: false,
      name: '',
      desc: '',
      price: '',
      stock: '',
      warranty: '',
      modelno: '',
      distrubutor: '',
      lastPage: 1,
      pageArray: [],
    };
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);

    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeStock = this.handleChangeStock.bind(this);
    this.handleChangeWarranty = this.handleChangeWarranty.bind(this);
    this.handleChangeModelNo = this.handleChangeModelNo.bind(this);
    this.handleChangeDistrubutor = this.handleChangeDistrubutor.bind(this);
  }
  handleHeaderChange = (event) => {
    this.setState({ header: event.target.value });
  };
  handleRatingChange = (event, { rating }) => {
    this.setState({ rating });
  };
  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
    console.log(this.state.name);
  };

  handleChangeDesc = (event) => {
    this.setState({ desc: event.target.value });
    console.log(this.state.desc);
  };

  handleChangePrice = (event) => {
    this.setState({ price: event.target.value });
    console.log(this.state.price);
  };
  handleChangeStock = (event) => {
    this.setState({ stock: event.target.value });
    console.log(this.state.stock);
  };
  handleChangeWarranty = (event) => {
    this.setState({ warranty: event.target.value });
    console.log(this.state.warranty);
  };

  handleChangeModelNo = (event) => {
    this.setState({ modelno: event.target.value });
    console.log(this.state.modelno);
  };

  handleChangeDistrubutor = (event) => {
    this.setState({ distrubutor: event.target.value });
    console.log(this.state.distrubutor);
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    axios
      .get(`http://localhost:8000/api/productDetail?pId=${params.pId}`)
      .then((response) => {
        this.setState({ data: response.data, check: true });
        console.log(this.state.data);
        this.state.data.map((item) => {
          console.log(item);
          this.seeReview(item.pId, this.state.page);
        });
      });
  }

  increaseQuantity = () => {
    this.setState({ qty: this.state.qty + 1 });
  };
  decreaseQuantity = () => {
    if (this.state.qty > 1) {
      this.setState({ qty: this.state.qty - 1 });
    }
  };

  addReview(header, comment, rating, pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('addRating', {
        commentHeader: header,
        commentbody: comment,
        rating: rating,
        pId: pId,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200)
          alert('Your review will be visible after the approval.');
      })

      .catch((error) => {
        console.log(error);
      });
  }

  seeReview(pId, page) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 20000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('seeRating', {
        pId: pId,
        page: page
      })
      .then((response) => {
        this.setState({ reviewData: response.data.data, lastPage: response.data.lastPage, heck: true });

        let temp = [];
        for (let i = 1; i <= this.state.lastPage; i++) {
          temp.push(i);
        }
        if (this.state.lastPage == 1) {
          temp = [];
        }
        this.setState({ pageArray: temp });

      })

      .catch((error) => {
        console.log(error);
      });
  }

  deleteReview(rId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('deleteRating', {
        rId: rId,
      })
      .then((response) => {
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  }

  addCart(qty, price, pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
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
        if (response.status === 200) alert('Product is added to the cart!');
      })

      .catch((error) => {
        alert('Please sign in to add product to your cart!');
        console.log(error);
      });
  }

  addWishlist(pId) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
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
        if (response.status === 200) alert('Product is added to the wishlist!');
      })

      .catch((error) => {
        alert('Please sign in to add product to your wishlist!');
        console.log(error);
      });
  }
  operation() {
    this.setState({ showMe: !this.state.showMe });
  }

  editProduct(pId, name, desc, price, warranty, modelno, distrubutor, stock) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 20000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });
    console.log(price);
    instance
      .post('editProduct', {
        pId: pId,
        name: name,
        desc: desc,
        price: price,
        warranty: warranty,
        modelno: modelno,
        distrubutor: distrubutor,
        stock: stock,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  }

  deleteProduct(name) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('deleteProduct', { name: name })
      .then((response) => {
        this.props.history.push('/main');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let username = checkUsername();
    let ProductManager = checkProductManager();
    return (
      <div>
        {this.state.data.map((item) => {
          return (
            <div className='super_container'>
              <header className='header'>
                <div className='header_main'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right'>
                        <div className='header_search'>
                          <div className='header_search_content'>
                            <div className='header_search_form_container'>
                              <form
                                action='#'
                                className='header_search_form clearfix'
                              >
                                <div className='custom_dropdown'>
                                  <div className='custom_dropdown_list'>
                                    <span className='custom_dropdown_placeholder clc'>
                                      Home
                                    </span>
                                    <i className='fas fa-chevron-down'></i>
                                    <ul className='custom_list clc'>
                                      <li>
                                        <a className='clc' href='#'>
                                          {item.categoryName}
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <div className='single_product'>
                {ProductManager === 'true' ? (
                  <div>
                    <Button
                      color='green'
                      size='large'
                      onClick={() => this.operation()}
                    >
                      Edit Product
                    </Button>
                    <br />
                    <br />
                    {this.state.showMe ? (
                      <div>
                        <div>
                          Name:
                          <br />
                          <Input
                            value={this.state.name}
                            placeholder={item.name}
                            onChange={this.handleChangeName}
                            style={{
                              fontSize: 15,
                              width: 750,
                              border: 'solid 1px green ',
                            }}
                            type='text'
                            size='huge'
                          />
                        </div>
                        <br />
                        <div>
                          Description:
                          <br />
                          <Input
                            value={this.state.description}
                            placeholder={item.description}
                            onChange={this.handleChangeDesc}
                            style={{
                              fontSize: 15,
                              width: 750,
                              border: 'solid 1px green ',
                            }}
                            type='text'
                            size='huge'
                          />
                        </div>
                        <br />
                        <div>
                          Price:
                          <br />
                          <Input
                            value={this.state.price}
                            placeholder={item.price}
                            onChange={this.handleChangePrice}
                            style={{
                              fontSize: 15,
                              width: 750,
                              border: 'solid 1px green ',
                            }}
                            type='text'
                            size='huge'
                          />
                        </div>
                        <br />
                        <div>
                          Stock:
                          <br />
                          <Input
                            value={this.state.stock}
                            placeholder={item.stock}
                            onChange={this.handleChangeStock}
                            style={{
                              fontSize: 15,
                              width: 750,
                              border: 'solid 1px green ',
                            }}
                            type='text'
                            size='huge'
                          />
                        </div>
                        <br />
                        <div>
                          Warranty:
                          <br />
                          <Input
                            value={this.state.warrantyStatus}
                            placeholder={item.warrantyStatus}
                            onChange={this.handleChangeWarranty}
                            style={{
                              fontSize: 15,
                              width: 750,
                              border: 'solid 1px green ',
                            }}
                            type='text'
                            size='huge'
                          />
                        </div>
                        <br />
                        <div>
                          Model No:
                          <br />
                          <Input
                            value={this.state.modelNo}
                            placeholder={item.modelNo}
                            onChange={this.handleChangeModelNo}
                            style={{
                              fontSize: 15,
                              width: 750,
                              border: 'solid 1px green ',
                            }}
                            type='text'
                            size='huge'
                          />
                        </div>
                        <br />
                        <div>
                          Distributor:
                          <br />
                          <Input
                            value={this.state.distrubutor}
                            placeholder={item.disturbuterInfo}
                            onChange={this.handleChangeDistrubutor}
                            style={{
                              fontSize: 15,
                              width: 750,
                              border: 'solid 1px green ',
                            }}
                            type='text'
                            size='huge'
                          />
                        </div>
                        <br />
                        <Button
                          color='green'
                          onClick={() =>
                            this.editProduct(
                              item.pId,
                              this.state.name,
                              this.state.desc,
                              this.state.price,
                              this.state.warranty,
                              this.state.modelno,
                              this.state.distrubutor,
                              this.state.stock
                            )
                          }
                          size='large'
                          style={{ width: 150 }}
                        >
                          Submit
                        </Button>
                        <Button
                          color='red'
                          onClick={() => this.deleteProduct(item.name)}
                          size='large'
                          style={{ width: 150 }}
                        >
                          Delete
                        </Button>
                        <br /> <br />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className='card' id='productCard' key={item.pId}>
                  <div className='container-fluid2'>
                    <div className='row'>
                      <div className='col-lg-2 order-lg-1 order-2'>
                        <ul className='image_list'>
                          <li data-image={item.imgSrc}>
                            <img src={item.imgSrc} alt='' />
                          </li>
                          <li data-image={item.imgSrc}>
                            <img src={item.imgSrc} alt='' />
                          </li>
                          <li data-image={item.imgSrc}>
                            <img src={item.imgSrc} alt='' />
                          </li>
                        </ul>
                      </div>
                      <div className='col-lg-4 order-lg-2 order-1'>
                        <div className='image_selected'>
                          <img src={item.imgSrc} alt='' />
                        </div>
                      </div>
                      <div className='col-lg-6 order-3'>
                        <div className='product-description'>
                          <nav>
                            <ol className='breadcrumb'>
                              <li className='breadcrumb-item'>
                                <a href='/main'>Home</a>
                              </li>

                              <li className='breadcrumb-item active'>
                                {item.categoryName}
                              </li>
                            </ol>
                          </nav>
                          <br />
                          <div
                            className='product_name'
                            style={{ lineHeight: 1 }}
                          >
                            {item.name}
                          </div>
                          <hr className='singleline' />
                          <div align='right'>
                            Listed Date: {item.listedDate}{' '}
                          </div>
                          <div className='product_box'>
                            <div className='product_des' align='left'>
                              {item.description}
                            </div>
                            <div className='product-rating' align='left'>
                              <Rating
                                rating={item.avgRating}
                                maxRating={5}
                                size='massive'
                                icon='star'
                                disabled
                              />
                              <br></br>
                              <br />
                              <span className='rating-review' align='left'>
                                {item.numComment} reviews
                              </span>
                            </div>
                            <div align='left'>
                              <span className='product_price'>
                                {item.price} TL
                              </span>
                              {item.displayOldPrice === true ? (
                                <strike className='product_discount'>
                                  <span>{item.oldPrice} TL</span>
                                </strike>
                              ) : null}

                              <div align='right'>
                                <span className='product_info'>
                                  Distributor: {item.disturbuterInfo}
                                </span>
                              </div>
                            </div>
                          </div>
                          <hr className='singleline' />
                          <br></br>
                          <div className='row'>
                            <div className='col-xs-6'>
                              <div className='product_quantity'>
                                <button
                                  style={{ width: 25 }}
                                  className='fas fa-minus'
                                  onClick={() => this.decreaseQuantity()}
                                  id='inc'
                                  type='button'
                                ></button>
                                <input
                                  type='number'
                                  id='number'
                                  value={this.state.qty}
                                  readOnly
                                />
                                <button
                                  style={{ width: 25 }}
                                  className='fas fa-plus'
                                  onClick={() => this.increaseQuantity()}
                                  id='dec'
                                  type='button'
                                ></button>
                              </div>
                            </div>
                            <div className='cart_buttons'>
                              <button
                                onClick={() =>
                                  this.addCart(
                                    this.state.qty,
                                    item.price,
                                    item.pId
                                  )
                                }
                                className='add-to-cart btn btn-default'
                                type='button'
                              >
                                add to cart
                              </button>
                              <button
                                onClick={() => this.addWishlist(item.pId)}
                                className='like btn btn-default'
                                type='button'
                              >
                                <span className='fas fa-heart'></span>
                              </button>
                            </div>
                          </div>
                          <hr className='singleline' />
                          <div align='left'>
                            <h5> Product Info:</h5>
                            <span className='product_info'>
                              Warranty: {item.warrantyStatus} months warranty
                            </span>
                            <br></br>
                            <span className='product_info'>
                              {item.stock} left in the stocks.
                            </span>
                            <br></br>
                            <span className='product_info'>
                              Model No: {item.modelNo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <br></br>
                    <div>
                      <div className='col-lg-12 mb-8 mb-lg-0  '>
                        <div className='text-left'>
                          <h3>Reviews</h3>
                        </div>

                        <hr className='singleline' />
                        <br></br>
                        <br></br>
                        <div className='row  '>
                          <div className='col-lg-6 mb-4 mb-lg-0 '>
                            <Form reply>
                              <input
                                type='text'
                                onChange={this.handleHeaderChange}
                                value={this.state.header}
                                placeholder='Subject'
                                required
                              />
                              <br /> <br />
                              <Form.TextArea
                                onChange={this.handleCommentChange}
                                value={this.state.comment}
                                placeholder='Comment'
                                required
                              />
                              <br />
                              <Rating
                                onRate={this.handleRatingChange}
                                value={this.state.rating}
                                maxRating={5}
                                size='huge'
                                icon='star'
                                required
                              />
                              <br />
                              <br />
                              {this.state.rating != 0 &&
                                this.state.header != '' &&
                                this.state.comment != '' ? (
                                  <Button
                                    content='Add Review'
                                    icon='edit'
                                    style={{ backgroundColor: '#ff6f00    ' }}
                                    onClick={() =>
                                      this.addReview(
                                        this.state.header,
                                        this.state.comment,
                                        this.state.rating,
                                        item.pId
                                      )
                                    }
                                  />
                                ) : (
                                  <Button
                                    content='Add Review'
                                    icon='edit'
                                    style={{ backgroundColor: '#ff6f00    ' }}
                                    onClick={() =>
                                      this.addReview(
                                        this.state.header,
                                        this.state.comment,
                                        this.state.rating,
                                        item.pId
                                      )
                                    }
                                    disabled
                                  />
                                )}
                            </Form>
                          </div>
                          <div className='col-lg-1 mb-4 mb-lg-0  ' />
                          <div className='col-lg-5 mb-4 mb-lg-0  text-left'>
                            {this.state.reviewData.map((rvw) => {
                              return (
                                <div>
                                  <Comment.Group size='large'>
                                    <Container>
                                      <Row>
                                        <Col>
                                          <Comment>
                                            <Comment.Content>
                                              <Comment.Author as='a'>
                                                {rvw.commentHeader}
                                              </Comment.Author>
                                              <Comment.Metadata>
                                                <div>
                                                  <Rating
                                                    rating={rvw.rating}
                                                    maxRating={5}
                                                    size='small'
                                                    icon='star'
                                                    disabled
                                                  />
                                                </div>
                                              </Comment.Metadata>
                                              <Comment.Text>
                                                {rvw.commentbody}
                                              </Comment.Text>

                                            </Comment.Content>
                                          </Comment>
                                        </Col>
                                        <Col xs="auto"> {username === rvw.commentOwner ? (
                                          <Comment.Actions>
                                            <Comment.Action>
                                              <Button
                                                size='tiny'
                                                color='red'
                                                onClick={() =>
                                                  this.deleteReview(rvw.rId)
                                                }
                                              >
                                                <div>
                                                  <i
                                                    aria-hidden='true'
                                                    className='trash icon hidden'
                                                  ></i>
                                                </div>
                                              </Button>
                                              <br></br> <br></br>
                                            </Comment.Action>
                                          </Comment.Actions>
                                        ) : null}</Col>
                                      </Row>
                                    </Container>
                                  </Comment.Group>
                                </div>
                              );
                            })}
                            <Pagination>

                              {this.state.pageArray.map(
                                (pageNo) => {
                                  return (

                                    <Pagination.Item key={pageNo} active={this.state.page === pageNo} onClick={() => { this.setState({ page: pageNo }); this.seeReview(item.pId, this.state.page); }}>
                                      {pageNo}
                                    </Pagination.Item>);
                                })}




                            </Pagination>
                          </div>



                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

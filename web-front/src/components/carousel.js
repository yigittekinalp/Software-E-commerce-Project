import React, { Component, useState } from 'react';
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
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import '../CSS/carousel.css';
import Sidebar from './sidebar';
import Footer from './footer';

import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import { TiHeartFullOutline } from 'react-icons/ti';

import indirim from '../dummy/indirim.png';
import indirim2 from '../dummy/indirim2.png';

import { getProducts } from '../repo';

class ShopingCard extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'Not used yet', data: [], qty: 1 };
  }

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
        alert('Please sign in to add product to your cart!');
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
        alert('Please sign in to add product to your wishlist!');
        console.log(error);
      });
  }

  render() {
    return (
      <div className=''>
        <Card style={{ width: '18rem' }}>
          <a href={'/product/' + this.props.pId}>
            <div
              className='h-25 p-0 m-0'
              style={{ backgroundColor: '#fffffff' }}
            >
              <Card.Title className='h-5 p-0 m-0' style={{ height: '8rem' }}>
                <h3 style={{ color: '#ff6002', backgroundColor: '#fffffff' }}>
                  {this.props.CardName}
                </h3>
              </Card.Title>
            </div>

            <Image
              className='p-0 m-0 img-fluid'
              variant='bottom'
              src={this.props.ImgSrc}
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
                    color: 'green',
                    backgroundColor: '#fffffff',
                  }}
                >
                  <strong>{this.props.CardPrice} TL</strong>
                </h4>
              </Card.Text>
              <br></br>
              {this.props.OldPriceDisplay === true ? (
                <Card.Text className='h-25 p-0 m-0'>
                  <h5
                    style={{
                      color: '#676767',
                      backgroundColor: '#fffffff',
                    }}
                  >
                    <strike>{this.props.CardPriceOld} TL </strike>
                  </h5>
                </Card.Text>
              ) : null}
            </Card.Body>
          </a>
          <Card.Footer>
            <Container>
              <Row className=' p-0 '>
                <Button
                  variant='link'
                  onClick={() =>
                    this.addCart(
                      this.state.qty,
                      this.props.CardPrice,
                      this.props.pId
                    )
                  }
                >
                  <Col className='marginleft'>
                    <FaShoppingCart size='1.75em' color='#FFA533' />
                  </Col>
                </Button>
                <Button
                  variant='link'
                  onClick={() => this.addWishlist(this.props.pId)}
                >
                  <Col className='marginright'>
                    <TiHeartFullOutline size='1.75em' color='#EE1414' />
                  </Col>
                </Button>
              </Row>
            </Container>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className='d-block w-100' src={indirim} alt='Second slide' />
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={indirim2} alt='First slide' />
      </Carousel.Item>
    </Carousel>
  );
}

class carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    getProducts().then((products) => {
      this.setState({ products });
      console.log(this.state.products);
    });
  }

  render() {
    return (
      <div>
        <section id = "first" className='first-section mb-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-4'>
                <Sidebar />
              </div>
              <div className='col-sm-8 pt-2'>
                <ControlledCarousel />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className='container'>
            {Object.keys(this.state.products).map((key, index) => {
              return (
                <div>
                  <div className='row'>
                    <h1
                      style={{
                        textAlign: 'left',
                        className: 'mb-5 mt-2',
                        color: '#484848',
                      }}
                    >
                      {key}
                    </h1>
                  </div>
                  <div className='row'>
                    <CardDeck>
                      {this.state.products[key].map((card) => (
                        <ShopingCard
                          CardName={card.name}
                          CardPrice={card.price}
                          pId={card.pId}
                          ImgSrc={card.imgSrc}
                          CardPriceOld={card.oldPrice}
                          Description={card.description}
                          OldPriceDisplay={card.displayOldPrice}
                        />
                      ))}
                    </CardDeck>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default carousel;

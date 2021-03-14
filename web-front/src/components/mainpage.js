import React, { Component } from 'react';
import 'holderjs';

import axios from 'axios';
import {
  Card,
  CardDeck,
  CardLink,
  Button,
  ButtonToolbar,
  Container,
  Image,
  CardColumns,
  Row,
  Col,
} from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-icons';
import classNames from 'classnames';

import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import { MdInsertComment } from 'react-icons/md';
import { TiHeartFullOutline } from 'react-icons/ti';
import { GoCommentDiscussion } from 'react-icons/go';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }
}

class ShopingCard extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'Not used yet' };
  }

  render() {
    return (
      <Card>
        <div className='h-25 p-0 m-0' style={{ backgroundColor: '#fffffff' }}>
          <Card.Title className='h-25 p-0 m-0'>
            <h3 style={{ color: '#ff6002', backgroundColor: '#fffffff' }}>
              {this.props.CardPrice}
            </h3>
          </Card.Title>
          <Card.Title className='h-25 p-0 m-0'>
            <del>
              {' '}
              <h5 style={{ color: '#676767', backgroundColor: '#fffffff' }}>
                {this.props.CardPriceOld}
              </h5>
            </del>
          </Card.Title>
        </div>

        <Image
          className='p-0 m-0 img-fluid'
          variant='bottom'
          src={this.props.ImgSrc}
          rounded
        />
        <Card.Body style={{ color: '#676767', backgroundColor: '#fffffff' }}>
          <Card.Text>This is a wider card with supporting .</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Container>
            <Row className=' p-0 '>
              <Col>
                <GoCommentDiscussion size='1.75em' color='#C3EE68' />
              </Col>
              <Col>
                <FaShoppingCart size='1.75em' color='#FFA533' />
              </Col>
              <Col>
                <TiHeartFullOutline size='1.75em' color='#EE1414' />
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    );
  }
}

class ShopingCardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'Not used yet' };
  }
  render() {
    return (
      <Container>
        <CardDeck>
          <ShopingCard
            CardPrice={this.props.CardPrice1}
            ImgSrc={this.props.ImgSrc1}
            CardPriceOld={this.props.CardPriceOld1}
          />
          <ShopingCard
            CardPrice={this.props.CardPrice2}
            ImgSrc={this.props.ImgSrc2}
            CardPriceOld={this.props.CardPriceOld2}
          />
          <ShopingCard
            CardPrice={this.props.CardPrice3}
            ImgSrc={this.props.ImgSrc3}
            CardPriceOld={this.props.CardPriceOld3}
          />
          <ShopingCard
            CardPrice={this.props.CardPrice4}
            ImgSrc={this.props.ImgSrc4}
            CardPriceOld={this.props.CardPriceOld4}
          />
        </CardDeck>
      </Container>
    );
  }
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const ArticleCard = ({ imageUrl, link, title }) => {
  return <Card link={link} image={imageUrl} headline={title} />;
};

class Slider extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      check: false,
      data: [],
    };
  }

  render() {
    //{this.state.data}</h3>;
    return (
      <Container className='mb-3 mt-2'>
        <Container className='pb-3 pt-2' style={{ backgroundColor: '#ffffff' }}>
          <div>
            <h1
              style={{ textAlign: 'left', className: 'mb-5', color: '#484848' }}
            >
              {' '}
              {this.props.sliderTitle}{' '}
              <FaPlusCircle size='0.75em' textAlign='center' color='#ff6002' />
            </h1>
          </div>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            centerMode={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition='all .5'
            transitionDuration={500}
            containerClass='carousel-container'
            removeArrowOnDeviceType={['tablet', 'mobile']}
            deviceType={this.props.deviceType}
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-40-px'
          >
            <div className='p-2'>
              <ShopingCard
                CardPrice={(Math.random() * (999 - 100) + 300).toFixed(2)}
                CardPriceOld={(Math.random() * (999 - 100) + 300).toFixed(2)}
                ImgSrc={'https://loremflickr.com/100/160?random=1'}
              />
            </div>
            <div className='p-2'>
              <ShopingCard
                CardPrice={(Math.random() * (999 - 100) + 300).toFixed(2)}
                CardPriceOld={(Math.random() * (999 - 100) + 300).toFixed(2)}
                ImgSrc={'https://loremflickr.com/100/160?random=2'}
              />
            </div>
            <div className='p-2'>
              <ShopingCard
                CardPrice={(Math.random() * (999 - 100) + 300).toFixed(2)}
                CardPriceOld={(Math.random() * (999 - 100) + 300).toFixed(2)}
                ImgSrc={'https://loremflickr.com/100/160?random=3'}
              />
            </div>
            <div className='p-2'>
              <ShopingCard
                CardPrice={(Math.random() * (999 - 100) + 300).toFixed(2)}
                CardPriceOld={(Math.random() * (999 - 100) + 300).toFixed(2)}
                ImgSrc={'https://loremflickr.com/100/160?random=4'}
              />
            </div>
            <div className='p-2'>
              <ShopingCard
                CardPrice={(Math.random() * (999 - 100) + 300).toFixed(2)}
                CardPriceOld={(Math.random() * (999 - 100) + 300).toFixed(2)}
                ImgSrc={'https://loremflickr.com/100/160?random=5'}
              />
            </div>
          </Carousel>
        </Container>
      </Container>
    );
  }
}

class ShopingCardGroup extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      check: false,
      data: [],
    };
  }

  render() {
    //{this.state.data}</h3>;
    return (
      <Container className='mb-3 mt-2'>
        <Container className='pb-3 pt-2' style={{ backgroundColor: '#ffffff' }}>
          <h1
            style={{ textAlign: 'left', className: 'mb-5', color: '#484848' }}
          >
            {this.props.ShopingCardGroupTitle}{' '}
            <FaPlusCircle size='0.75em' textAlign='center' color='#ff6002' />
          </h1>
          <Container
            className='pb-3 pt-2'
            style={{ backgroundColor: '#ffffff' }}
          >
            <ShopingCardDeck
              CardPrice1={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld1={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPrice2={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld2={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPrice3={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld3={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPrice4={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld4={(Math.random() * (999 - 100) + 300).toFixed(2)}
              ImgSrc1={'http://lorempixel.com/300/250/fashion/1/'}
              ImgSrc2={'http://lorempixel.com/300/250/fashion/5/'}
              ImgSrc3={'http://lorempixel.com/300/250/fashion/3/'}
              ImgSrc4={'http://lorempixel.com/300/250/fashion/4/'}
            />
          </Container>
          <Container
            className='pb-3 pt-2'
            style={{ backgroundColor: '#ffffff' }}
          >
            <ShopingCardDeck
              CardPrice1={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld1={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPrice2={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld2={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPrice3={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld3={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPrice4={(Math.random() * (999 - 100) + 300).toFixed(2)}
              CardPriceOld4={(Math.random() * (999 - 100) + 300).toFixed(2)}
              ImgSrc1={'http://lorempixel.com/300/250/fashion/1/'}
              ImgSrc2={'http://lorempixel.com/300/250/fashion/6/'}
              ImgSrc3={'http://lorempixel.com/300/250/fashion/3/'}
              ImgSrc4={'http://lorempixel.com/300/250/fashion/4/'}
            />
          </Container>
        </Container>
      </Container>
    );
  }
}

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      check: false,
      data: [],
    };
  }

  render() {
    //{this.state.data}</h3>;
    return (
      <div className=''>
        <br />
        <Slider sliderTitle="Editor's Picks" />
        <Slider sliderTitle='Recommended For You' />

        <ShopingCardGroup ShopingCardGroupTitle='Electronics' />
        <ShopingCardGroup ShopingCardGroupTitle='Food' />
        <ShopingCardGroup ShopingCardGroupTitle='Clothes' />
        <ShopingCardGroup ShopingCardGroupTitle='Pets' />
      </div>
    );
  }
}

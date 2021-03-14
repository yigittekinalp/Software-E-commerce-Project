import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

import { getProducts } from '../repo';

export default class sidebar extends Component {
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
        <Card>
          <Card.Header>Categories</Card.Header>
          {Object.keys(this.state.products).map((key, index) => {
            return (
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <a href={'/category?name=' + key}>
                    <div>
                      <div className='iconwrap'>
                        <i className='far fa-circle' />
                      </div>
                      <div className='text-wrap'>{key}</div>
                    </div>
                  </a>
                </ListGroup.Item>
              </ListGroup>
            );
          })}
        </Card>
      </div>
    );
  }
}

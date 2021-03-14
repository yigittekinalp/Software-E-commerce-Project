import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Comment, Form, Rating, Input } from 'semantic-ui-react';
import Side from '../Customer/profileSide';
import moment from 'moment';
function checkIsSalesManager() {
  var isSalesManager = localStorage.getItem('isSalesManager');

  return isSalesManager;
}

class SearchByUser extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      data: [],
      username: '',
      total: 0,
      showMe: true,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  calculation(data) {
    this.setState({ total: 0 });
    this.state.data.invoice.map(
      (item) => (this.state.total += parseInt(item.profit))
    );
    this.setState({ total: this.state.total });
  }

  operation() {
    this.setState({ showMe: true });
  }

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
        this.calculation(response.data);
        this.operation();
        console.log(this.state.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='pb-5'>
        <div className='container'>
          <br /> <br />
          <div className='row'>
            <div className='col-8 mb-4 mb-lg-0 '>
              <div>
                <Input
                  value={this.state.username}
                  placeholder='Username'
                  onChange={this.handleUsernameChange}
                  style={{
                    fontSize: 15,
                    width: 550,
                    border: 'solid 1px green ',
                  }}
                  type='text'
                  size='huge'
                />
              </div>
            </div>
            <div className='col-4 mb-4 mb-lg-0  '>
              <Button
                variant='outline-success'
                size='lg'
                onClick={() => this.searchUser(this.state.username)}
              >
                <i className='fa fa-search'></i>
              </Button>
            </div>
          </div>
        </div>
        {Object.keys(this.state.data).map((key, index) => {
          console.log(key);
          return (
            <div>
              <div id='review'>
                {this.state.showMe ? (
                  <div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
                    <h1> Total profit :{this.state.total}</h1>
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
                                Product Price
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>
                                Product Cost
                              </div>
                            </th>
                            <th scope='col' className='border-0 bg-light'>
                              <div className='py-2 text-uppercase'>
                                Product Profit
                              </div>
                            </th>
                          </tr>
                        </thead>
                        {this.state.data.invoice.map((item) => {
                          console.log(item);
                          return (
                            <tbody>
                              <tr>
                                <td className='border-0 align-middle'>
                                  <strong>
                                    <a href={'/product/' + item.pId}>
                                      {item.name}
                                    </a>
                                  </strong>
                                </td>

                                <td className='border-0 align-middle'>
                                  <strong>{item.price}</strong>
                                </td>
                                <td className='border-0 align-middle'>
                                  <strong>{item.cost}</strong>
                                </td>
                                <td className='border-0 align-middle'>
                                  <strong>{item.profit}</strong>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export class wholePage extends Component {
  render() {
    let SalesManager = checkIsSalesManager();

    if (SalesManager === 'true') {
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
                <SearchByUser />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Sorry you are not a Sales Manager</h1>
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

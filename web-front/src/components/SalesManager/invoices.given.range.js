import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Comment, Form, Rating, Input } from 'semantic-ui-react';
import Side from '../Customer/profileSide';

function checkIsSalesManager() {
  var isSalesManager = localStorage.getItem('isSalesManager');

  return isSalesManager;
}

class InvoicesGivenRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      start: '',
      end: '',
      total: 0,
      showMe: false,
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleStartChange = (event) => {
    this.setState({ start: event.target.value });
  };

  handleEndChange = (event) => {
    this.setState({ end: event.target.value });
  };

  calculation(data) {
    this.setState({ total: 0 });
    this.state.data.map((item) => (this.state.total += parseInt(item.profit)));
    this.setState({ total: this.state.total });
  }

  operation() {
    this.setState({ showMe: true });
  }

  invoicesRange(start, end) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/invoiceGivenRange', {
        start: start,
        end: end,
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
      <div>
        <div className='pb-5'>
          <div className='container'>
            <br />
            <br />
            <div className='row'>
              <div className='col mb-4 mb-lg-0 '>
                <div>
                  Start Date (YYYY-mm-dd):
                  <Input
                    value={this.state.start}
                    placeholder='Start Date'
                    onChange={this.handleStartChange}
                    style={{
                      fontSize: 15,
                      width: 250,
                      border: 'solid 1px green ',
                    }}
                    type='text'
                    size='huge'
                  />
                </div>
              </div>
              <div className='col mb-4 mb-lg-0 '>
                <div>
                  End Date (YYYY-mm-dd):
                  <Input
                    value={this.state.end}
                    placeholder='End Date'
                    onChange={this.handleEndChange}
                    style={{
                      fontSize: 15,
                      width: 250,
                      border: 'solid 1px green ',
                    }}
                    type='text'
                    size='huge'
                  />
                </div>
              </div>
              <div className='col mb-4 mb-lg-0  '>
                <br></br>
                <Button
                  variant='outline-success'
                  size='md'
                  onClick={() =>
                    this.invoicesRange(this.state.start, this.state.end)
                  }
                  size='lg'
                  style={{ width: 150 }}
                >
                  <i className='fa fa-search'></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
                        <div className='py-2 text-uppercase'>Product Price</div>
                      </th>
                      <th scope='col' className='border-0 bg-light'>
                        <div className='py-2 text-uppercase'>Product Cost</div>
                      </th>
                      <th scope='col' className='border-0 bg-light'>
                        <div className='py-2 text-uppercase'>
                          Product Profit
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
                              <a href={'/product/' + item.pId}>{item.name}</a>
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
                <InvoicesGivenRange />
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

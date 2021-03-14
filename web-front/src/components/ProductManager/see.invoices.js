import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import Side from '../Customer/profileSide';
import moment from 'moment';

class SeeInvoices extends Component {
  constructor(props) {
    super(props);
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
      .get('seeInvoiceProductManager')
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data, check: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateDeliver(iID, isDelivered) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('updateDelivery', {
        iId: iID,
        deliveryStatus: isDelivered ? 'False' : 'True',
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
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
              Invoices
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
                            Customer ID
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>
                            Product/Basket ID
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'> Invoice ID</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>
                            Purchase Date
                          </div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Delivered?</div>
                        </th>
                        <th scope='col' className='border-0 bg-light'>
                          <div className='py-2 text-uppercase'>Address</div>
                        </th>
                      </tr>
                    </thead>
                    {this.state.data.map((item) => {
                      console.log(item);
                      return (
                        <tbody>
                          <tr>
                            <td className='border-0 align-middle'>
                              <strong>{item.cId} </strong>
                            </td>

                            <td className='border-0 align-middle'>
                              <strong>{item.bId} </strong>
                            </td>

                            <td className='border-0 align-middle'>
                              <strong>{item.iId} </strong>
                            </td>
                            <td className='border-0 align-middle'>
                              <strong>
                                {' '}
                                {moment(item.time).format('DD MMM, YYYY')}{' '}
                              </strong>
                            </td>
                            <td className='border-0 align-middle'>
                              <Button
                                style={{ color: 'success' }}
                                onClick={() =>
                                  this.updateDeliver(item.iId, item.IsDelivered)
                                }
                              >
                                {item.IsDelivered
                                  ? 'Delivered'
                                  : 'Not Delivered'}
                              </Button>
                            </td>
                            <td className='border-0 align-middle'>
                              <strong>{item.address} </strong>
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

function checkProductManager() {
  var isProductManager = localStorage.getItem('isProductManager');

  return isProductManager;
}

export class wholePage extends Component {
  render() {
    let ProductManager = checkProductManager();

    if (ProductManager === 'true') {
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
                <SeeInvoices />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Sorry you are not a Product Manager</h1>
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

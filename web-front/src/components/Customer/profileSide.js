import React, { Component } from 'react';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import Tabs from 'react-bootstrap/Tabs';
import TabPane from 'react-bootstrap/TabPane';
import TabContainer from 'react-bootstrap/TabContainer';
import Tab from 'react-bootstrap/Tab';
import { Row, Col } from 'react-bootstrap';

function checkProductManager() {
  var isProductManager = localStorage.getItem('isProductManager');

  return isProductManager;
}

function checkIsSalesManager() {
  var isSalesManager = localStorage.getItem('isSalesManager');

  return isSalesManager;
}

export default class profileSide extends Component {
  render() {
    let ProductManager = checkProductManager();

    const productManagerMenu = () => {
      if (ProductManager === 'true') {
        return (
          <div>
            <Nav.Item>
              <Nav.Link eventKey='disabled' disabled>
                Product Manager
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href='/Invoices' eventKey='a'>
                <div className='iconwrap'>
                  <i className='fas fa-file-invoice-dollar' />
                </div>
                Invoices
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href='/approveReview' eventKey='b'>
                <div className='iconwrap'>
                  <i className='fas fa-comment-medical' />
                </div>
                Approve Reviews
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href='/addProduct' eventKey='c'>
                <div className='iconwrap'>
                  <i className='fas fa-cart-plus' />
                </div>
                Add Product
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href='/searchUser' eventKey='d'>
                <div className='iconwrap'>
                  <i className='fas fa-search-plus' />
                </div>
                Search User
              </Nav.Link>
            </Nav.Item>
            <br />
          </div>
        );
      }
    };

    let salesManager = checkIsSalesManager();
    const salesManagerMenu = () => {
      if (salesManager === 'true') {
        return (
          <div>
            <Nav.Item>
              <Nav.Link eventKey='disabled' disabled>
                Sales Manager
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/coupon' eventKey='d'>
                <div className='iconwrap'>
                  <i className='fas fa-tag' />
                </div>
                Coupons
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/InvoicesCheck' eventKey='f'>
                <div className='iconwrap'>
                  <i className='fas fa-clipboard-check' />
                </div>
                Check Invoices Given Range
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/searchUserSM' eventKey='z'>
                <div className='iconwrap'>
                  <i className='fas fa-search-plus' />
                </div>
                Search By User
              </Nav.Link>
            </Nav.Item>

            <br />
          </div>
        );
      }
    };

    const CustomerMenu = () => {
      if (salesManager === 'false' && ProductManager === 'false') {
        return (
          <div>
            <Nav.Item>
              <Nav.Link href='/orders' eventKey='first'>
                <div className='iconwrap'>
                  <i className='fas fa-shipping-fast' />
                </div>
                Previous Orders
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href='/seeAddress' eventKey='second'>
                <div className='iconwrap'>
                  <i className='fas fa-address-book' />
                </div>
                My addresses
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/seeReview' eventKey='fourth'>
                <div className='iconwrap'>
                  <i className='fas fa-comment-dots' />
                </div>
                Review Status
              </Nav.Link>
            </Nav.Item>

            <br />
          </div>
        );
      }
    };

    return (
      <ListGroup variant='flush'>
        <Row>
          <Col>
            <Nav variant='tabs' className='flex-column'>
              {productManagerMenu()}
              {salesManagerMenu()}
              {CustomerMenu()}
              <Nav.Item>
                <Nav.Link href='/ChangePassword' eventKey='third'>
                  <div className='iconwrap'>
                    <i className='fas fa-key' />
                  </div>
                  Change Password
                </Nav.Link>
              </Nav.Item>
              <br />
            </Nav>
          </Col>
        </Row>
      </ListGroup>
    );
  }
}

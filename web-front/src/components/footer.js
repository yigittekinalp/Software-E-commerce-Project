import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      check: false,
      data: [],
    };
  }
  render() {
    return (
      <div
        className='footer-distributed'
        style={{ backgroundColor: '#ECECEC' }}
      >
        <div className='footer-left'>
          <h3>DinoStorous</h3>
          <p className='footer-links'>
            <a href='/main'>Main&emsp; </a>|&emsp;
            <a href='/aboutUs'>About Us</a>
          </p>
          <p className='footer-company-name'>© 2020 DinoStorous. Ltd.</p>
        </div>

        <div className='footer-center'>
          <div>
            <i className='fa fa-map-marker'></i>
            <p>
              <span>Sabanci University</span>
              <span>
                Orta Mahalle, Üniversite Caddesi No:27 Tuzla, 34956 İstanbul
              </span>
            </p>
          </div>

          <div>
            <i className='fa fa-phone'></i>
            <p>+90 500 000 00 00</p>
          </div>
          <div>
            <i className='fa fa-envelope'></i>
            <p>
              <a href='mailto:businnesdinostore@gmail.com'>
                businnesdinostore@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className='footer-right'>
          <p className='footer-company-about'>
            <span>About the company</span>
            We are the #1
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;

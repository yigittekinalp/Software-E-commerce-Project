import React, { Component } from 'react';
import Axios from 'axios';
import '../CSS/sign.css';
import Footer from './footer';

function checkProductManager() {
  var isProductManager = localStorage.getItem('isProductManager');

  return isProductManager;
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSuccessfulLogin(data) {
    this.props.handleSubmit(data);
    this.props.history.push('../');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;

    Axios.post('http://localhost:8000/api/login/', this.state)
      .then((response) => {
        const token = response.data.access;

        const isProductManager = response.data.isProductManager;
        const isSalesManager = response.data.isSalesManager;
        const isCustomer = response.data.isCustomer;

        if (response.status === 200) {
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('username', username);
          localStorage.setItem('isProductManager', isProductManager);
          localStorage.setItem('isSalesManager', isSalesManager);
          localStorage.setItem('isCustomer', isCustomer);

          let ProductManager = checkProductManager();

          if (ProductManager === 'true') {
            this.props.history.push('/Invoices');
            window.location.reload();
          } else {
            this.props.history.push('/main');
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        alert('Wrong username or password!');
        console.log(error);
      });
  };

  render() {
    return (
      <div className='auth-wrapper' style={{
        backgroundImage: `url("https://wallpapersmug.com/download/3840x2160/11bd38/geometric-abstract-gradient-triangles.jpg")`, backgroundRepeat: 'no-repeat', width: '%100', height: '1000px'
      }}>
        <div className='auth-inner'>
          <form>
            <h3>Sign In</h3>

            <div className='form-group'>
              <label>Username </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter username'
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>



            <button
              type='submit'
              onClick={this.handleSubmit}
              className='btn btn-primary btn-block'
            >
              Submit
            </button>

            <p className='forgot-password text-right' style={{ fontSize: 15 }}>
              Don't have an account?
              <a href='/sign-up' style={{ fontSize: 15 }}>
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';

import { Button, Icon, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ProfileSide from './profileSide';

function checkIsCustomer() {
  var isCustomer = localStorage.getItem('isCustomer');

  return isCustomer;
}

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      oldPassword: '',
      newPassword: '',
      hidden1: true,
      hidden2: true,

      check0: false,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    };
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.toggleShow1 = this.toggleShow1.bind(this);
    this.toggleShow2 = this.toggleShow2.bind(this);

    this.handleCheck0Change = this.handleCheck0Change.bind(this);
    this.handleCheck1Change = this.handleCheck1Change.bind(this);
    this.handleCheck2Change = this.handleCheck2Change.bind(this);
    this.handleCheck3Change = this.handleCheck3Change.bind(this);
    this.handleCheck4Change = this.handleCheck4Change.bind(this);
  }
  handleOldPasswordChange = (event) => {
    this.setState({ oldPassword: event.target.value });
  };

  handleNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };
  toggleShow1 = (event) => {
    event.preventDefault();
    this.setState({ hidden1: !this.state.hidden1 });
  };
  toggleShow2 = (event) => {
    event.preventDefault();
    this.setState({ hidden2: !this.state.hidden2 });
  };

  handleCheck0Change = (event) => {
    this.setState({ check0: event.target.value });
  };

  handleCheck1Change = (event) => {
    this.setState({ check1: event.target.value });
  };

  handleCheck2Change = (event) => {
    this.setState({ check2: event.target.value });
  };
  handleCheck3Change = (event) => {
    this.setState({ check3: event.target.value });
  };
  handleCheck4Change = (event) => {
    this.setState({ check4: event.target.value });
  };

  changePassword(oldPassword, newPassword) {
    var instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('jwtToken'),
      },
    });

    instance
      .post('http://localhost:8000/api/changePassword', {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) alert('Successfully changed');
      })

      .catch((error) => {
        alert('Wrong Password');
      });
  }
  render() {
    let colour1 = 'red',
      colour2 = 'red',
      colour3 = 'red',
      colour4 = 'red',
      colour5 = 'red';

    if (this.state.oldPassword.length >= '1') {
      this.state.check0 = true;
    } else this.state.check0 = false;

    if (this.state.newPassword.length >= '8') {
      colour1 = 'green';
      this.state.check1 = true;
    } else this.state.check1 = false;

    if (this.state.newPassword.match(/[A-Z]/)) {
      colour2 = 'green';
      this.state.check2 = true;
    } else this.state.check2 = false;

    if (this.state.newPassword.match(/[a-z]/)) {
      colour3 = 'green';
      this.state.check3 = true;
    } else this.state.check3 = false;

    if (this.state.newPassword.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/)) {
      colour4 = 'green';
      this.state.check4 = true;
    } else this.state.check4 = false;

    const style = {
      boxShadow: '2px 2px 3px 3px #ccc',
      border: '2px #eee',
      padding: '20px',
      marginTop: '25px',
    };

    return (
      <div >

        <div >
          <div style={style}>
            <form>
              <p style={{ fontWeight: 'bold' }}>
                All checkmarks must turn green, password must have:
                </p>
              <p>
                <i
                  style={{ color: colour1, fontSize: '20px' }}
                  class='fa fa-check-circle'
                  aria-hidden='true'
                ></i>{' '}
                  At least 8 characters
                </p>
              <p>
                <i
                  style={{ color: colour2, fontSize: '20px' }}
                  class='fa fa-check-circle'
                  aria-hidden='true'
                ></i>{' '}
                  At least 1 uppercase letter
                </p>
              <p>
                <i
                  style={{ color: colour3, fontSize: '20px' }}
                  class='fa fa-check-circle'
                  aria-hidden='true'
                ></i>{' '}
                  At least 1 lowercase letter
                </p>
              <p>
                <i
                  style={{ color: colour4, fontSize: '20px' }}
                  class='fa fa-check-circle'
                  aria-hidden='true'
                ></i>{' '}
                  At least 1 number or special character
                </p>
              <div class='form-group'>
                <label for='password'></label>
                <Input
                  type={this.state.hidden1 ? 'password' : 'text'}
                  class='form-control'
                  value={this.state.oldPassword}
                  onChange={this.handleOldPasswordChange}
                  placeholder='Old Password'
                />
                <button
                  class=' icon ui button'
                  onClick={this.toggleShow1}
                  style={{ width: '40px' }}
                >
                  <i class='eye icon'></i>
                </button>
              </div>
              <div class='form-group'>
                <label for='password'></label>
                <Input
                  type={this.state.hidden2 ? 'password' : 'text'}
                  class='form-control'
                  value={this.state.newPassword}
                  onChange={this.handleNewPasswordChange}
                  placeholder='New Password'
                />
                <button
                  class=' icon ui button'
                  onClick={this.toggleShow2}
                  style={{ width: '40px' }}
                >
                  <i class='eye icon'></i>
                </button>
              </div>
            </form>
            {this.state.check0 === true &&
              this.state.check1 === true &&
              this.state.check2 === true &&
              this.state.check3 === true &&
              this.state.check4 === true ? (
                <Button
                  variant='outline-success'
                  size='lg'
                  onClick={() =>
                    this.changePassword(
                      this.state.oldPassword,
                      this.state.newPassword
                    )
                  }
                >
                  <i className='fas fa-check'></i>
                </Button>
              ) : null}
          </div>
        </div>

      </div>
    );
  }
}

export class wholePage extends Component {
  render() {
    let Customer = checkIsCustomer();

    if (Customer === 'true') {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3 pt-2'>
              <br />
              <br />

              <ProfileSide />
            </div>
            <div className='col-sm-9 pt-2'>
              <ChangePassword />

            </div>

          </div>

          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <h1>It appears that you are not logged in</h1>
          <h2>
            To sign in click{' '}
            <a
              href='/sign-in'
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

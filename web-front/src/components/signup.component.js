import React, { Component } from 'react';
import Axios from 'axios';
import '../CSS/sign.css';
import { Dropdown } from 'semantic-ui-react';

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "url(" + "https://www.freepik.com/free-photos-vectors/background" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      age: 0,
      sex: '',
      mySex: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSexChange = (event) => {
    this.setState({ sex: event });
    if (event == 0) this.setState({ mySex: 'Female' });
    else if (event == 1) this.setState({ mySex: 'Male' });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:8000/api/signup/', this.state)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.props.history.push('/sign-in');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  render() {
    const { username, email, password, age, sex } = this.state;
    return (
      <div className='auth-wrapper'  style={{
        backgroundImage: `url("https://wallpapersmug.com/download/3840x2160/11bd38/geometric-abstract-gradient-triangles.jpg")`,backgroundRepeat: 'no-repeat',width:'%100',height:'1000px'
     }}>
        <div className='auth-inner'>
          <form onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>

            <div className='form-group'>
              <label>Username </label>
              <input
                type='text'
                name='username'
                value={username}
                className='form-control'
                placeholder='Username'
                onChange={this.handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label>Email address</label>
              <input
                type='email'
                name='email'
                value={email}
                className='form-control'
                placeholder='Enter email'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Gender </label>
              <Dropdown placeholder={this.state.mySex} fluid selection required>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key='Female'
                    text='Female'
                    value={sex}
                    onClick={() => this.handleSexChange(0)}
                  />
                  <Dropdown.Item
                    key='Male'
                    text='Male'
                    value={sex}
                    onClick={() => this.handleSexChange(1)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='form-group'>
              <label>Age </label>
              <input
                type='number'
                name='age'
                value={age}
                className='form-control'
                placeholder='Age'
                onChange={this.handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                className='form-control'
                placeholder='Enter password'
                onChange={this.handleChange}
                required
              />
            </div>

            <button type='submit' className='btn btn-primary btn-block'>
              Sign Up
            </button>
            <p className='forgot-password text-right'>
              Already registered <a href='/sign-in'>sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

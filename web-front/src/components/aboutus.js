import React, { Component } from 'react';

//import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/aboutus.css';

export default class AboutUs extends Component {
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
      <div>
        <br />
        <div className='about'>
          <div className='about-section'>
            <h1>About Us</h1>
            <p>About who we are and what we do.</p>
          </div>
          <br />

          <h2 style={{ textAlign: 'center' }}>Our Team</h2>
          <br />

          <div className='row'>
            <div className='column'>
              <div className='card'>
                <div className='container'>
                  <h2>Ceren Anıl</h2>
                  <p className='title'>CEO & Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>
                    <a
                      className='button'
                      href='mailto:cerenanil@sabanciuniv.edu'
                    >
                      cerenanil@sabanciuniv.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class='column'>
              <div class='card'>
                <div class='container'>
                  <h2>Görkem Görkey</h2>
                  <p class='title'>CEO & Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>
                    <a
                      className='button'
                      href='mailto:gorkeygorkem@sabanciuniv.edu'
                    >
                      gorkeygorkem@sabanciuniv.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className='column'>
              <div className='card'>
                <div className='container'>
                  <h2>Cavit Çakır</h2>
                  <p className='title'>CEO & Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>
                    <a
                      className='button'
                      href='mailto:cavitcakir@sabanciuniv.edu'
                    >
                      cavitcakir@sabanciuniv.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class='column'>
              <div class='card'>
                <div class='container'>
                  <h2>Gökberk Yar</h2>
                  <p class='title'>CEO & Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>
                    <a
                      className='button'
                      href='mailto:gokberkyar@sabanciuniv.edu'
                    >
                      gokberkyar@sabanciuniv.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class='column'>
              <div class='card'>
                <div class='container'>
                  <h2>Efe Şencan</h2>
                  <p class='title'>CEO & Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>
                    <a
                      className='button'
                      href='mailto:efesencan@sabanciuniv.edu'
                    >
                      efesencan@sabanciuniv.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class='column'>
              <div class='card'>
                <div class='container'>
                  <h2>Yiğit Tekinalp</h2>
                  <p class='title'>CEO & Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>
                    <a
                      className='button'
                      href='mailto:yigittekinalp@sabanciuniv.edu'
                    >
                      yigittekinalp@sabanciuniv.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

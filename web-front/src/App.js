import React from 'react';
import './App.css';
//import axios from "axios";
import 'holderjs';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './components/login.component';
import SignUp from './components/signup.component';
import Navbar from './components/navbar';
import NotFoundPage from './components/not.found';
import Products from './components/display.product';
import MainPage from './components/mainpage';

import Category from './components/category';

import Footer from './components/footer';
import AboutUs from './components/aboutus';
import Carousel from './components/carousel';
import Cart from './components/cart';
import Wishlist from './components/wishlist';
import Search from './components/search';
import AddProduct from './components/ProductManager/add.product';
import SeeInvoices from './components/ProductManager/see.invoices';
import ApproveReview from './components/ProductManager/approveReview';
import SeeReview from './components/Customer/see.my.review';

import SeeMyAddress from './components/Customer/my.address';
import ChangePassword from './components/Customer/changePassword';
import Orders from './components/Customer/orders';
import InvoicesGivenRange from './components/SalesManager/invoices.given.range';
import SearchUserSM from './components/SalesManager/searchByUser';
import Coupon from './components/SalesManager/coupons.js';
import SearchUser from './components/ProductManager/searchUser.js';
//icon
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/' component={Carousel} />
          <Route path='/main' component={Carousel} />
          <Route path='/sign-in' component={Login} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/aboutUs' component={AboutUs} />
          <Route path='/cart' component={Cart} />
          <Route path='/wishlist' component={Wishlist} />
          <Route path='/search' component={Search} />
          <Route path='/product/:pId' component={Products} />
          <Route path='/addProduct' component={AddProduct} />
          <Route path='/Invoices' component={SeeInvoices} />
          <Route path='/approveReview' component={ApproveReview} />
          <Route path='/seeReview' component={SeeReview} />
          <Route path='/seeAddress' component={SeeMyAddress} />
          <Route path='/ChangePassword' component={ChangePassword} />
          <Route path='/InvoicesCheck' component={InvoicesGivenRange} />
          <Route path='/coupon' component={Coupon} />
          <Route path='/orders' component={Orders} />
          <Route path='/searchUser' component={SearchUser} />
          <Route path='/category' component={Category} />
          <Route path='/searchUserSM' component={SearchUserSM} />

          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

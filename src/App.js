import React from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import Login from './components/Login_Signup/Login'
import Signup from './components/Login_Signup/Signup';
import Home from './components/Body/Home'
import Navigation from './components/Navigation';
import Blogdetail from './components/Body/Allblog/Blogdetail';

function App() {
  return (
    <div className="app">
      <Navigation/>
      <Route path="/blog/:id" component={Blogdetail}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/" exact component={Home}></Route>
    </div>
  );
}

export default (App);
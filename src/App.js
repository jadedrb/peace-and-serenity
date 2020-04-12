import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { MyContext } from './components/Provider';
import './App.css';

import Login from './components/Login';
import Posts from './components/Posts';
import About from './components/About';
import Profile from './components/Profile';

class App extends Component {
  static contextType = MyContext;

  constructor() {
    super()
    this.state = {
      nav: false
    }
    this.toggleNav = this.toggleNav.bind(this)
  }

  componentDidUpdate() {
    console.log('App updated.')
  }

  toggleNav() { this.setState({nav: !this.state.nav}) }

  render() {
    let { page } = this.context
    console.log(page)

    let login = (
      <div className="navBar">
        <Router>
          <nav>
            <ul>
              <li><Link className="link" to="/">MY PARKS</Link></li>
              <li><Link className="link" to="/profile">PROFILE</Link></li>
              <li><Link className="link" to="/about">ABOUT</Link></li>
              <li><Link className="link" to="/login">{page === 'login' ? 'LOG IN' : 'LOG OUT'}</Link></li>
            </ul>
          </nav>
          <div id='subNavbar'>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/profile" component={Profile} />
              <Route path="/about" component={About} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    )

    return (
      <React.Fragment>
        {page !== 'login' ? login : ''}
        {page !== 'login' ? <Redirect to="/" /> : ''}
        {page === 'login' ? <div><Login /> <Redirect to="/" /></div> : ''}
      </React.Fragment>
    );
  }
}

export default App;

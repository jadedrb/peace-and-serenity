import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Posts from './components/Posts';
import About from './components/About';
import Profile from './components/Profile';
import Provider from './components/Provider';

class App extends Component {

  constructor() {
    super()
    this.state = {
      page: 'not login',
      nav: false
    }
    this.changePage = this.changePage.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
  }

  changePage(newPage) { this.setState({page: newPage}) }

  toggleNav() { this.setState({nav: !this.state.nav}) }

  render() {
    let { page } = this.state

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
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    )

    return (
      <Provider>
        {page !== 'login' ? login : ''}
        {page === 'login' ? <Login changePage={this.changePage} /> : ''}
      </Provider>
    );
  }
}

export default App;

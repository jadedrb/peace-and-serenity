import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './Login';
import Posts from './Posts';
import Data from './Data';
import Profile from './Profile';

class Navbar extends Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    alert(e.value)
  }

  render() {
    return (
      <div className="navBar">
        <Router>
          <nav>
            <ul>
              <li><Link className="link" to="/">Home</Link></li>
              <li><Link className="link" to="/data">Other</Link></li>
              <li><Link className="link" to="/profile">Profile</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/data" component={Data} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Navbar;

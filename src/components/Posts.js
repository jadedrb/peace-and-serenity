import React, { Component } from 'react';
import { MyContext } from './Provider';

import NationalPark from './NationalPark';

class Posts extends Component {
  static contextType = MyContext;

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    let nationalParks = (
      <div>
        {this.context.nationalParks.map((p,i) => <NationalPark key={i} park={p} />)}
      </div>
    )
    return (
      <div>
        <div id="search">
          <div id="search-content">
            <input/>
            <span>National Parks</span>
            <span>NYC Parks</span>
            <span>Add Park</span>
          </div>
        </div>
        {nationalParks}
      </div>
    )
  }
}

export default Posts;

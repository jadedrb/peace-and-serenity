import React, { Component } from 'react';
import { MyContext } from './Provider';

import NationalPark from './NationalPark';

class Posts extends Component {
  static contextType = MyContext;

  constructor() {
    super()
    this.state = {
      parkType: 'national'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(type) {
    this.setState({parkType: type})
    console.log(type)
  }

  render() {
    let { parkType } = this.state
    let nationalParks = (
      <div>
        {this.context.nationalParks.map((p,i) => <NationalPark key={i} park={p} />)}
      </div>
    )
    let cityParks = (
      <div>
      </div>
    )
    return (
      <div>
        <div id="search">
          <div id="search-content">
            {parkType === 'city' ? <input/> : ''}
            <span className='parkB' onClick={() => this.handleClick('national')}>National Parks</span>
            <span className='parkB' onClick={() => this.handleClick('city')}>NYC Parks</span>
            {parkType === 'city' ? <span>Add Park</span> : ''}
          </div>
        </div>
        {parkType === 'national' ? nationalParks : cityParks}
      </div>
    )
  }
}

export default Posts;

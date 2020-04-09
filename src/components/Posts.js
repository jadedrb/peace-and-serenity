import React, { Component } from 'react';
import { MyContext } from './Provider';

class Posts extends Component {
  static contextType = MyContext;

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>My Parks</div>
    )
  }
}

export default Posts;

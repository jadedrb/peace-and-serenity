import React, { Component } from 'react';
import { MyContext } from './Provider';

class Profile extends Component {
  static contextType = MyContext;

  constructor() {
    super()
  }

  render() {
    return (
      <div id='profile'>
        <div id='userInfo'>
          <p className='infoPiece'><span>username</span></p>
          <p className='infoPiece'><span>password</span></p>
          <p className='infoPiece'><span>email</span></p>
        </div>
        <div id='favPark'></div>
        <div id='userComments'></div>
      </div>
    )
  }
}

export default Profile;

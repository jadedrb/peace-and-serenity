import React, { Component } from 'react';
import { MyContext } from './Provider';

class Profile extends Component {
  static contextType = MyContext;

  constructor() {
    super()
  }

  render() {
    let { user, password, email, nycParks } = this.context
    console.log(this.context)
    console.log('^context for profile')
    return (
      <div id='profile'>
        <div id='userInfo'>
          <p className='infoPiece'><span>username</span>{user}</p>
          <p className='infoPiece'><span>password</span>{password}</p>
          <p className='infoPiece'><span>email</span>{email}</p>
        </div>
        <div id='favPark'></div>
        <div id='userComments'></div>
      </div>
    )
  }
}

export default Profile;

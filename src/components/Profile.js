import React, { Component } from 'react';
import { MyContext } from './Provider';

import Comment from './Comment';

class Profile extends Component {
  static contextType = MyContext;

  constructor() {
    super()
  }

  render() {
    let { user, password, email, nycParks, userbase } = this.context
    let mapUserComments = Object.keys(userbase[user]['comments'])
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
        <div id='userComments'>
          {mapUserComments.length ? mapUserComments.map((c,i) => (
            <Comment key={i} comment={c} id={userbase[user]['comments'][c]} nycParks={nycParks} handleVote={'disregard'}/>
          )) : ''}
        </div>
      </div>
    )
  }
}

export default Profile;

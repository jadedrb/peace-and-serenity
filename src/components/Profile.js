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
    let mapUserFavorites = Object.keys(userbase[user]['favorites'])
    console.log(this.context)
    console.log('^context for profile')
    return (
      <div id='profile'>
        <div id='userInfo'>
          <p className='infoPiece'><span>username</span>{user}</p>
          <p className='infoPiece'><span>password</span>{password}</p>
          <p className='infoPiece'><span>email</span>{email}</p>
        </div>
        <div id='favPark'>
          <h1>Favorite Parks</h1>
          {mapUserFavorites.length ? mapUserFavorites.map((f,i) => (
            <div key={i} className='profileFav'>
              <h3>{userbase[user]['favorites'][f]['name']}</h3>
              <img src={userbase[user]['favorites'][f]['image']}/>
            </div>
          )) : ''}
        </div>
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

import React, { Component } from 'react';
import { MyContext } from './Provider';

import Comment from './Comment';

class Profile extends Component {
  static contextType = MyContext;

  constructor() {
    super()
    this.handleFavorite = this.handleFavorite.bind(this)
  }

  handleFavorite(favId) {
    let updateData = this.context.update
    let user = this.context.user
    updateData(favId, 'unfavorite')
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
          {mapUserFavorites.length ? '' : <h1>Favorite Parks</h1>}
          {mapUserFavorites.length ? mapUserFavorites.map((f,i) => (
            <div key={i} className='profileFav'>
              <h3>{userbase[user]['favorites'][f]['name']}</h3>
              <img src={userbase[user]['favorites'][f]['image']}/>

              <svg
                onClick={() => this.handleFavorite(f)}
                className='heart3'
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
              </svg>
            

            </div>
          )) : ''}
        </div>
        <div id='userComments'>
          {mapUserComments.length ? '' : <h1>Comments</h1>}
          {mapUserComments.length ? mapUserComments.map((c,i) => (
            <Comment key={i} comment={c} id={userbase[user]['comments'][c]} nycParks={nycParks} handleVote={'disregard'}/>
          )) : ''}
        </div>
      </div>
    )
  }
}

export default Profile;

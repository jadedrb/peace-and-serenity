import React, { Component } from 'react';
import { MyContext } from './Provider';

class Comment extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    let c = this.props.comment
    let updateData = this.context.update
    updateData(c, 'deleteComment')
  }

  render() {
    let c = this.props.comment
    let { nycParks, id, handleVote } = this.props

    return (
      <div className='commentBody'>
        <span className='commentVote'>
        <span className='voteUpDwn voteUp' style={{visibility: handleVote !== 'disregard' ? 'visible' : 'hidden'}} onClick={() => handleVote(1, c)}>^ </span>
        {nycParks[id]['comments'][c].votes + ''}
        <span className='voteUpDwn voteDwn' style={{visibility: handleVote !== 'disregard' ? 'visible' : 'hidden'}} onClick={() => handleVote(-1, c)}> v</span>
        </span>
        <span className='commentUser'>{nycParks[id]['comments'][c].user}</span>
        <span className='commentDate'>{nycParks[id]['comments'][c].date.toString().split(' ').slice(0,4).join(' ')}</span>
        <p className='commentItself'>{nycParks[id]['comments'][c].comment}</p>
        <span className='deleteComment' style={{visibility: handleVote === 'disregard' ? 'visible' : 'hidden'}} onClick={this.handleDelete}>X</span>
      </div>
    )
  }
}

export default Comment;

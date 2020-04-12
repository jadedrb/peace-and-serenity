import React from 'react';

function Comment(props) {

  let c = props.comment
  let { nycParks, id, handleVote } = props

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
    </div>
  )
}

export default Comment;

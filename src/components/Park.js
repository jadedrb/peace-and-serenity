import React, { Component } from 'react';
import { MyContext } from './Provider';

import Comment from './Comment';

class Park extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props)
    this.state = {
      showImageInput: false,
      hover: false,
      showCategories: false,
      showYesOrNo: '',
      showComments: false,
      showAddComment: false,
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleYesOrNoHover = this.handleYesOrNoHover.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let updateData = this.context.update
    let park = this.props.park.id
    updateData([park, this.state.comment], 'newComment')
    this.setState({comment: '', showAddComment: false})
  }

  handleMouseOver() { if (!this.state.hover) this.setState({hover: true}) }

  handleMouseLeave() { if (this.state.hover || this.state.showYesOrNo !== '') this.setState({hover: false, showYesOrNo: ''}) }

  handleYesOrNoHover(q) { this.setState({showYesOrNo: q}) }

  handleClick(item, other) {
    let {
      showImageInput,
      hover,
      showCategories,
      showYesOrNo,
      showComments,
      showAddComment } = this.state
    console.log(item + ' <-item')
    if (item === 'image' && !showImageInput) this.setState({showImageInput: !showImageInput})
    if (item === 'body' && showImageInput && !hover) this.setState({showImageInput: !showImageInput})
    else if (item !== 'image' && item !== 'comments' && item !== 'addComment' && item !== 'yes' && item !== 'no' && showYesOrNo === '') this.setState({showCategories: !showCategories})
    if (item === 'yes' || item === 'no') {
      let updateData = this.context.update
      let park = this.props.park.id
      updateData([park, other, item], 'vote')
    }
    if (item === 'comments') {
      this.setState({showComments: !this.state.showComments})
    }
    if (item === 'addComment') this.setState({showAddComment: !showAddComment})
  }

  handleChange(e) {
    let { value, name } = e.target
    let updateData = this.context.update
    let park = this.props.park.id
    if (name === 'url' && value.split('://')[0] === 'https') updateData([park, 'image', value], 'updateProperty')
    else if (name === 'name') updateData([park, 'name', value], 'updateProperty')
    else if (name === 'comment') this.setState({comment: e.target.value})
  }

  handleDelete() {
    let updateData = this.context.update
    let park = this.props.park.id
    let deleting = window.confirm('Are you sure you want to delete? This will remove the park entry permanently.')
    if (deleting) updateData([park], 'deletePark')
  }

  handleVote(vote, comment) {
    let updateData = this.context.update
    let park = this.props.park.id
    updateData([park, vote, comment], 'voteComment')
  }

  handleFavorite() {
    let updateData = this.context.update
    let { id, image, name } = this.props.park
    let { user, userbase } = this.context
    let check = userbase[user]['favorites'].hasOwnProperty(id)
    if (check) updateData(id, 'unfavorite')
    else updateData([id, image, name], 'favorite')
  }

  render() {
    let { id, image, name, color } = this.props.park
    let { showImageInput,
      showCategories,
      showYesOrNo,
      showComments,
      showAddComment,
      comment } = this.state
    let { attributes, nycParks, user, userbase } = this.context
    let check = userbase[user]['favorites'].hasOwnProperty(id)
    // Makes an array of keys for the comments property of this specific park in nycParks. Then sorts those keys by most upvotes
    let mapComments = Object.keys(nycParks[id]['comments']).sort((a,b) => nycParks[id]['comments'][b].votes - nycParks[id]['comments'][a].votes)

    let hollowHeart = (
      <svg
        onClick={this.handleFavorite}
        className='heart2'
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
      </svg>
    )

    let fullHeart = (
      <svg
        onClick={this.handleFavorite}
        className='heart2'
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
      </svg>
    )

    return (
      <React.Fragment>
        <div
          className='nycPark'
          style={{backgroundColor: color}}
          onClick={() => this.handleClick('body')}
        >
          {/* Clickable image. Inputs appear for giving a Park Name and URL */}
          <div className='gridParkInfo'>
            <img src={image} onClick={() => this.handleClick('image')} />
            {check ? fullHeart : hollowHeart}
            <div
              className='imageInput'
              style={{visibility: showImageInput ? 'visible' : 'hidden'}}
              onMouseOver={this.handleMouseOver}
              onMouseLeave={this.handleMouseLeave}
            >
              <label className='labelOne'>Park Name<input onChange={this.handleChange} name='name'/></label>
              <label className='labelTwo'>Image URL<input onChange={this.handleChange} name='url'/></label>
            </div>
            <div className='defaultImg'>{name ? name : 'DEFAULT'}</div>
            {/* Attribute/category parent div */}
            <div
              className='categories'
              style={{visibility: showCategories ? 'visible' : 'hidden'}}
              onMouseLeave={() => this.handleMouseLeave()}
            >
              {/* Attribute mapping for this park component. Style changes green or red based on 'Yes' and 'No' votes */}
              {attributes.map((a,i) => (
                <div key={i}>
                  <span
                    className='question'
                    name={i}
                    onMouseOver={() => this.handleYesOrNoHover(i)}
                    style={{color: nycParks[id]['attributes'][i][0] <= nycParks[id]['attributes'][i][1] ? '#FF5555' : '#C7FFBC'}}
                  >
                  {a}
                  </span>
                  <span className='yon' style={{visibility: showYesOrNo === i && showCategories ? 'visible' : 'hidden'}}>
                    <span className='answer' onClick={() => this.handleClick('yes', i)}>Yes</span> <span className='response'>({nycParks[id]['attributes'][i][0]})</span>
                    <span className='answer' onClick={() => this.handleClick('no', i)}>No</span> <span className='response'>({nycParks[id]['attributes'][i][1]})</span>
                  </span>
                </div>
              ))}
            </div>
            <div className='featuredComment'>
              <h3>{mapComments.length ? 'What people are saying...' : ''}</h3><br/><br/>
              <p>{mapComments.length ? nycParks[id]['comments'][mapComments[0]].comment : ''}</p>
              {console.log('^Top comment?')}
            </div>
          </div>
          {/* Buttons for toggling comment sections */}
          <div className='removePark' onClick={this.handleDelete}>X</div>
          <div className='viewComments' onClick={() => this.handleClick('comments')}>V</div>
        </div>
        <div className='commentWrapper'>
          <div className='addComment' style={{display: showComments ? 'block' : 'none', zIndex: 6}}>
            <div className='toggleComment' onClick={() => this.handleClick('addComment')}>+</div>
            <div className='commentHere' style={{display: showAddComment ? 'block' : 'none'}}>
              <h3>Comment:</h3>
              <form className='commentForm' onSubmit={this.handleSubmit}>
                <textarea value={comment} onChange={this.handleChange} name='comment'></textarea>
                <button>Submit</button>
              </form>
            </div>
            {/* Comment mapping for this park component */}
            {mapComments.length ? mapComments.map((c,i) => (
              <Comment key={i} comment={c} id={id} nycParks={nycParks} handleVote={this.handleVote} />
            )) : ''}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Park;

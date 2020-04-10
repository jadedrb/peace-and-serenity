import React, { Component } from 'react';
import { MyContext } from './Provider';

class Park extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props)
    this.state = {
      showImageInput: false,
      hover: false,
      showCategories: false,
      showYesOrNo: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleYesOrNoHover = this.handleYesOrNoHover.bind(this)
  }

  handleMouseOver() { if (!this.state.hover) this.setState({hover: true}) }

  handleMouseLeave() { if (this.state.hover) this.setState({hover: false}) }

  handleYesOrNoHover(q) { this.setState({showYesOrNo: q}) }

  handleClick(item, other) {
    let { showImageInput, hover, showCategories } = this.state
    if (item === 'image' && !showImageInput) this.setState({showImageInput: !showImageInput})
    if (item === 'body' && showImageInput && !hover) this.setState({showImageInput: !showImageInput})
    else if (item !== 'yes' && item !== 'no') this.setState({showCategories: !showCategories})
    if (item === 'yes' || item === 'no') {
      let updateData = this.context.update
      let park = this.props.park.id
      updateData([park, other, item], 'vote')
    }
  }

  handleChange(e) {
    let { value, name } = e.target
    let updateData = this.context.update
    let park = this.props.park.id
    if (name === 'url' && value.split('://')[0] === 'https') updateData([park, 'image', value], 'updateProperty')
    else if (name === 'name') updateData([park, 'name', value], 'updateProperty')
  }

  handleDelete() {
    let updateData = this.context.update
    let park = this.props.park.id
    let deleting = window.confirm('Are you sure you want to delete? This will remove the park entry permanently.')
    if (deleting) {
      console.log('deleteittttt')
      updateData([park], 'deletePark')
    }
  }

  render() {
    let { id, image, name, color } = this.props.park
    let { showImageInput, showCategories, showYesOrNo } = this.state
    let { attributes, nycParks } = this.context

    return (
      <div className='nycPark' style={{backgroundColor: color}} onClick={() => this.handleClick('body')}>
        <img src={image} onClick={() => this.handleClick('image')} />
        <div
          className='imageInput'
          style={{visibility: showImageInput ? 'visible' : 'hidden'}}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          <label className='labelOne'>Park Name<input onChange={this.handleChange} name='name'/></label>
          <label className='labelTwo'>Image URL<input onChange={this.handleChange} name='url'/></label>
        </div>
        <div className='categories' style={{visibility: showCategories ? 'visible' : 'hidden'}}>
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
        <div className='defaultImg'>{name ? name : 'DEFAULT'}</div>
        <div className='removePark' onClick={this.handleDelete}>X</div>
      </div>
    )
  }
}

export default Park;

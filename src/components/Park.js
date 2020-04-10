import React, { Component } from 'react';
import { MyContext } from './Provider';

class Park extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props)
    this.state = {}
    this.handleDelete = this.handleDelete.bind(this)
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
    let { id, image } = this.props.park
    return (
      <div className='nycPark'>
        <img src={image} />
        <div className='defaultImg'>DEFAULT</div>
        <div className='removePark' onClick={this.handleDelete}>X</div>
      </div>
    )
  }
}

export default Park;

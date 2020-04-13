import React, { Component } from 'react';
import { MyContext } from './Provider';

import NationalPark from './NationalPark';
import Park from './Park';

class Posts extends Component {
  static contextType = MyContext;

  constructor() {
    super()
    this.state = {
      parkType: 'city',
      awaitingFetch: false,
      checkForChange: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRandomize = this.handleRandomize.bind(this)
  }

  handleClick(type) {
    if (type === 'national' || type === 'city') this.setState({parkType: type})
    else {
      let updateData = this.context.update
      let newParkId = this.context.newParkId
      let defaultImg = 'https://www.nationalgeographic.com/content/dam/travel/2019-digital/central-park-new-york-city/belvedere-castle.adapt.1900.1.jpg'
      let rGreen = Math.floor(Math.random() * 92)
      let rBlue = Math.floor(Math.random() * 15)
      let randomColor = `rgb(0,${rGreen},${rBlue})`
      updateData([newParkId+1, defaultImg, randomColor], 'addPark')
    }
  }

  handleRandomize() {
    let updateData = this.context.update
    this.setState({awaitingFetch: true})
    updateData([], 'randomize')
  }

  componentDidUpdate() {
    let { checkForChange } = this.state
    let updatedLong = this.context.nationalParks[0].longitude
    if (checkForChange !== updatedLong) this.setState({awaitingFetch: false, checkForChange: updatedLong})
    console.log('updating posts')
  }

  componentDidMount() { this.setState({checkForChange: this.context.nationalParks[0] ? 'placeholder' : this.context.nationalParks[0].longitude}) }

  render() {
    let { parkType } = this.state
    let { nationalParks, nycParks } = this.context
    let natParks, cityParks;

    if (parkType === 'national') {
      natParks = (
        <div>
          {nationalParks.map((p,i) => <NationalPark key={i} park={p} />)}
        </div>
      )
    }
    else {
      let nycParkIdKeys = Object.keys(nycParks)
      cityParks = (
        <div>
          {nycParkIdKeys.map((id,i) => <Park key={i} park={nycParks[id]}/>)}
        </div>
      )
    }

    return (
      <div id='posts'>
        <div className='logo'>
          <span className='peace'>Peace</span>
          <span className='and'>&</span>
          <span className='serenity'>Serenity</span>
        </div>
        <div id="search">
          <div id="search-content">
            {parkType === 'city' ? <input/> : ''}
            <span className='parkB' onClick={() => this.handleClick('national')}>National Parks</span>
            <span className='parkB' onClick={() => this.handleClick('city')}>NYC Parks</span>
            {parkType === 'city' ? <span className='parkB' onClick={() => this.handleClick('add')}>Add Park</span> : ''}
          </div>
        </div>
        {parkType === 'national' ? <div className='randomize' style={{backgroundColor: this.state.awaitingFetch ? 'lime' : 'black'}}><span onClick={this.handleRandomize}>Find national parks</span></div> : ''}
        {parkType === 'national' ? natParks : cityParks}
      </div>
    )
  }
}

export default Posts;

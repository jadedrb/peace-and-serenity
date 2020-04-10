import React, { Component } from 'react';

class NationalPark extends Component {
  constructor(props) {
    super(props)
    this.state = { hover: false, randomImg: -1, infoState: 0 }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.moreInfo = this.moreInfo.bind(this)
  }

  componentDidMount() {
    let { images } = this.props.park
    if (images.length > 0) this.setState({randomImg: Math.floor(Math.random() * images.length)})
  }

  handleMouseOver() { if (!this.state.hover) this.setState({hover: true}) }

  handleMouseLeave() { if (this.state.hover) this.setState({hover: false}) }

  moreInfo() {
    if (this.state.infoState < 2) {
      this.setState(prevState => {
        return { infoState: prevState.infoState + 1 }
      })
    } else {
      this.setState({infoState: 0})
    }
  }

  render() {
    let {
      fullName,
      images,
      designation,
      description,
      topics,
      activities,
      addresses,
      directionsInfo,
      entranceFees } = this.props.park
    let { hover, randomImg, infoState } = this.state
    let [ address ] = addresses
    let [ entrance ] = entranceFees

    if (address === undefined) address = {}
    if (entrance === undefined) entrance = '0'

    let active = ''
    activities.map((a,i) => active += (i ? ', ' : ' ') + a.name)
    let features = ''
    topics.map((t,i) => features += (i ? ', ' : ' ') + t.name)

    console.log(active)
    console.log(features)
    console.log(this.props.park)

    return (
      <div className='national'>

        <div className='description' style={{visibility: hover ? 'visible' : 'hidden'}}> <p>{description}</p> </div>

        <div className='gridSetup'>
          <div className='moreOne' style={{visibility: infoState > 0 ? 'visible' : 'hidden'}}>
            {designation ? <p><span className='property'>It's a </span>{designation}</p> : ''}
            {features ? <p><span className='property'>with </span> {features}</p> : ''}
            {active ? <p><span className='property'>has activities like </span> {active}</p> : ''}
          </div>
          <div className='natContain' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} onClick={this.moreInfo}>
            <h3 className='natTitle'>{fullName}</h3>
            <img src={images[randomImg] ? images[randomImg].url : 'https://nextcity.org/images/made/Minneapolis_LoringPark_920_568_80.jpg'} className='natImg'/>
          </div>
          <div className='moreTwo' style={{visibility: infoState > 1 ? 'visible' : 'hidden'}}>
            {address.line1 ? <span className='propertyTwo'>Address</span> : ''}<br/>
            {address.line1 ? <div><span>{address.line1}</span><br/></div> : ''}
            {address.city ? <div><span>{address.city} {address.stateCode}</span><br/></div> : ''}
            <br/>
            {directionsInfo ? <span className='propertyTwo'>Directions</span> : ''}<br/>
            {directionsInfo ? <span>{directionsInfo}</span> : ''}<br/><br/>
            {entrance.cost && entrance.cost[0] !== '0' ? <span className='propertyTwo'>Entrance Fee</span> : ''}<br/>
            {entrance.cost && entrance.cost[0] !== '0' ? <span>${entrance.cost}</span> : ''}
          </div>
        </div>

      </div>
    )
  }
}

export default NationalPark;

import React, { Component } from 'react';

class NationalPark extends Component {
  constructor(props) {
    super(props)
    this.state = { hover: false, randomImg: -1, infoState: 0 }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.moreInfo = this.moreInfo.bind(this)
  }

  componentDidMount() {
    let { images } = this.props.park
    if (images.length > 0) this.setState({randomImg: Math.floor(Math.random() * images.length)})
  }

  handleFavorite() { }

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

    let hollowHeart = (
      <svg
        onClick={this.handleFavorite}
        style={{visibility: hover ? 'visible' : 'hidden'}}
        className='hollowHeart'
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
      </svg>
    )

    let fullHeart = (
      <svg
        onClick={this.handleFavorite}
        style={{visibility: hover ? 'visible' : 'hidden'}}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
      </svg>
    )

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
            {hollowHeart}
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

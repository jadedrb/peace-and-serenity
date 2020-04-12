import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  constructor() {
    super()
    this.state = {
      user: 'defaultUser',
      password: '',
      email: '',
      userbase: {},
      emails: {},
      page: 'login',
      nationalParks: [],
      nycParks: {},
      newParkId: 0,
      newCommentId: 0,
      defaultImg: 'https://www.nationalgeographic.com/content/dam/travel/2019-digital/central-park-new-york-city/belvedere-castle.adapt.1900.1.jpg',
      attributes: [
        'Would recommend to a friend',
        'Is a safe space',
        'Good place to take kids',
        'Nice area for exercise',
        'Not too crowded',
        'Low noise pollution',
        'Places to eat',
        'Clean',
        'Wide variety of wild life',
        'Good for recreational sports',
        'At least one bathroom',
        'Tables for Sitting',
        'Barbecue Accessible',
        'Has sprinklers',
        'Pool',
        'Events',
      ]
    }
    this.updateData = this.updateData.bind(this)
    this.changePage = this.changePage.bind(this)
    this.getNationalParks = this.getNationalParks.bind(this)
  }

  componentDidMount() { this.getNationalParks() }

  getNationalParks() {
    let api = 'https://developer.nps.gov/api/v1/parks?'
    let state = 'stateCode=NY'
    let limitNum = '5'
    let limit = '&limit=' + limitNum
    let random = Math.floor(Math.random() * 33) + 1
    let start = '&start=' + random
    let key = '&api_key=qbCUTAx1ES42anbxyZDMcGK9nSIyNODcjOnceAgD'

    fetch(api + state + limit + start + key)
     .then(response => response.json())
     .then(data => this.setState({nationalParks: data.data}))
  }

  changePage(newPage) { this.setState({page: newPage}) }

  componentDidUpdate() {
    console.log(this.state)
    this.state.nationalParks.map(p => console.log(p.parkCode))
    console.log('^ state in provider')
  }

  updateData(data, type) {
    console.log('updateData')
    console.log(data)
    console.log(type)
    switch(type) {
      case 'signup':
        let [u, p, e, userbase] = data
        console.log(this.state.userbase)
        console.log('^ Provider userbase')
        console.log(userbase)
        console.log('^ Incoming userbase')
        let newUserbase = {...this.state.userbase, ...userbase}
        this.setState({user: u, password: p, email: e, userbase: newUserbase})
        break;
      case 'addPark':
        let [id, img, color] = data
        let nycParkAddition = { ...this.state.nycParks }
        let attObj = {}
        for (let i = 0; i < this.state.attributes.length; i++) attObj[i] = [0,0]
        console.log(attObj)
        console.log('^^')
        nycParkAddition[id] = { image: img, id: id, attributes: attObj, comments: {}, color }
        this.setState(prevState => {
          return {
            newParkId: prevState.newParkId + 1,
            nycParks: nycParkAddition
          }
        })
        console.log('reached addPark')
        console.log(this.state)
        break;
      case 'deletePark':
        let [parkId] = data
        let nycParks = { ...this.state.nycParks }
        let newUserbase6 = { ...this.state.userbase }
        let commentsToDelete = Object.keys(nycParks[parkId]['comments'])
        {/* Need to delete comments for that park stored in user objects which are in userbase */}
        commentsToDelete.map(c => {
          let specificUser = nycParks[parkId]['comments'][c]['user']
          delete newUserbase6[specificUser]['comments'][c]
        })
        delete nycParks[parkId]
        this.setState(prevState => {
          return {
            nycParks: nycParks,
            userbase: newUserbase6
          }
        })
        break;
      case 'updateProperty':
        let [pId, prop, value] = data
        let nyParks = { ...this.state.nycParks }
        nyParks[pId][prop] = value
        this.setState(prevState => {
          return {
            nycParks: nyParks
          }
        })
        break;
      case 'vote':
        let [paId, index, vote] = data
        let nyPaarks = { ...this.state.nycParks }
        if (vote === 'yes') nyPaarks[paId]['attributes'][index][0] += 1
        else nyPaarks[paId]['attributes'][index][1] += 1
        this.setState(prevState => {
          return {
            nycParks: nyPaarks
          }
        })
        break;
      case 'newComment':
        let [parId, comment] = data
        let nyPaaarks = { ...this.state.nycParks }
        let newUserbase2 = { ...this.state.userbase }
        let cId = this.state.newCommentId
        nyPaaarks[parId]['comments'][cId] = { user: this.state.user, votes: 0, date: new Date(), comment }
        newUserbase2[this.state.user]['comments'][cId] = parId
        this.setState(prevState => {
          return {
            newCommentId: prevState.newCommentId + 1,
            userbase: newUserbase2,
            nycParks: nyPaaarks
          }
        })
        console.log(this.state.newCommentId + ' <-- newCommentId')
        break;
      case 'voteComment':
        let [ppId, v, comId] = data
        let nyPpark = { ...this.state.nycParks }
        nyPpark[ppId]['comments'][comId]['votes'] += v
        this.setState({nycParks: nyPpark})
        break;
      case 'returningUser':
        let [us, pa] = data
        let thisUsersEmail = this.state.userbase[us]['email']
        this.setState({user: us, password: pa, email: thisUsersEmail, page: 'home'})
        break;
      case 'login':
        this.setState({page: data})
        break;
      case 'favorite':
        let [parkCode, img2, parkName] = data
        let newUserbase3 = {...this.state.userbase}
        if (parkName === undefined) parkName = 'Default'
        if (img2 !== undefined && img2.hasOwnProperty('url')) img2 = img2['url']
        else img2 = this.state.defaultImg
        newUserbase3[this.state.user]['favorites'][parkCode] = {image: img2, name: parkName}
        this.setState({userbase: newUserbase3})
        break;
      case 'unfavorite':
        let newUserbase4 = {...this.state.userbase}
        delete newUserbase4[this.state.user]['favorites'][data]
        this.setState({userbase: newUserbase4})
        break;
      case 'deleteComment':
        let newUserbase5 = {...this.state.userbase}
        let nycParkAddition2 = {...this.state.nycParks}
        let userr = this.state.user
        let specificPark = newUserbase5[userr]['comments'][data]
        delete newUserbase5[userr]['comments'][data]
        delete nycParkAddition2[specificPark]['comments'][data]
        this.setState({userbase: newUserbase5, nycParks: nycParkAddition2})
        break;
    }
    console.log(this.state)
    console.log('^ updated context')
  }

  render() {
    return (
      <MyContext.Provider value={{...this.state, update: this.updateData}}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default MyProvider;

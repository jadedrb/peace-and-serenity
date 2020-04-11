import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  constructor() {
    super()
    this.state = {
      user: 'defaultUser',
      password: '',
      email: '',
      page: 'login',
      nationalParks: [],
      nycParks: {},
      newParkId: 0,
      newCommentId: 0,
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
        'Has benches for sitting',
        'Has grills',
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
/*
    fetch(api + state + limit + start + key)
     .then(response => response.json())
     .then(data => this.setState({nationalParks: data.data}))
*/
  }

  changePage(newPage) { this.setState({page: newPage}) }

  componentDidUpdate() {
    console.log(this.state)
    console.log('^ state in provider')
  }

  updateData(data, type) {
    console.log('updateData')
    switch(type) {
      case 'signup':
        let [u, p, e] = data
        this.setState({user: u, password: p, email: e})
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
        delete nycParks[parkId]
        this.setState(prevState => {
          return {
            nycParks: nycParks
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
        let cId = this.state.newCommentId
        nyPaaarks[parId]['comments'][cId] = { user: this.state.user, votes: 0, date: new Date(), comment }
        this.setState(prevState => {
          return {
            newCommentId: prevState.newCommentId + 1,
            nycParks: nyPaaarks
          }
        })
        console.log(this.state.newCommentId + ' <-- newCommentId')
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

import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  constructor() {
    super()
    this.state = {
      test: 'this is a test',
      user: '',
      password: '',
      email: '',
      page: 'login',
      nationalParks: [],
      nycParks: {},
      newParkId: 0
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
        let [id, img] = data
        let nycParkAddition = { ...this.state.nycParks }
        nycParkAddition[id] = { image: img, id: id }
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

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
      page: 'login'
    }
    this.updateData = this.updateData.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  changePage(newPage) {
    this.setState({page: newPage})

  }

  componentDidUpdate() {
    console.log(this.state)
    console.log('^ state in provider')
  }

  updateData(data, type) {
    console.log('youve reached the update data method')
    switch(type) {
      case 'signup':
        let [u, p, e] = data
        this.setState({user: u, password: p, email: e})
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

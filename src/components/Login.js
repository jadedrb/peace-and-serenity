import React, { Component } from 'react';
import { MyContext } from './Provider';

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      statusU: undefined,
      statusP: undefined,
      statusE: undefined,
      userbase: {},
      emails: {},
      returningUser: true,
      attempt: false,
      preventRender: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.clearAttempt = this.clearAttempt.bind(this)
  }

  onChange(e) {
    let { value, name } = e.target
    let { username, password, returningUser } = this.state
    let { userbase } = this.context
    let status;

    const checkLogin = () => {
      if (name === 'username' &&
          userbase.hasOwnProperty(value)) {
        status = true;
      } else if (userbase.hasOwnProperty(username) &&
                 userbase[username]['password'] === value) {
        status = true;
      } else if (value !== '') {
        status = false;
      } else {
        status = undefined;
      }
    }

    const checkSignup = () => {
      if (name === 'username' &&
          !userbase.hasOwnProperty(value) &&
          value.length > 4) {
        status = true;
      } else if (name === 'password' && value.length > 4) {
        status = true;
      } else if (name === 'email' && value !== '' && value.split('@').length === 2 && value.split('@')[1].split('.').length === 2 && value.split('@')[1].split('.')[1] === 'com') {
        status = true;
      } else if (value !== '') {
        status = false;
      } else {
        status = undefined;
      }
    }

    if (returningUser) { checkLogin() }
    else { checkSignup() }

    if (name === 'username') {
      this.setState({username: value, statusU: status, attempt: false})
    }
    else if (name === 'password') {
      this.setState({password: value, statusP: status, attempt: false})
    }
    else if (name === 'email') {
      this.setState({email: value, statusE: status, attempt: false})
    }
  }

  onSubmit(e) {

    let {
      username,
      password,
      email,
      userbase,
      statusU,
      statusP,
      statusE,
      returningUser } = this.state

    e.preventDefault()

    // Check for successful login
    if (statusU && statusP && returningUser) {
      let updateData = this.context.update
      updateData([username, password], 'returningUser')
    // Check for successful sign-up
    } else if (statusU && statusP && statusE) {
      let { username, password, userbase, email } = this.state
      e.preventDefault()

      if (username === '' || password === '') { return }
      if (userbase.hasOwnProperty(username)) { return }

      this.setState(prevState => {
        prevState.userbase[username] = {}
        prevState.userbase[username]['comments'] = {}
        prevState.userbase[username]['favorites'] = {}
        prevState.userbase[username]['password'] = password
        prevState.userbase[username]['email'] = email
        return { prevState }
      })
      alert('successful signup')
    }
    this.setState({attempt: true})
  }

  loginSignup(switchTo) {
    if (switchTo === 'signup') {
      this.setState({returningUser: false, username: '', password: '', email: ''})
    } else {
      this.setState({returningUser: true, username: '', password: '', email: ''})
    }
  }

  clearAttempt() { this.setState({attempt: false}) }

  componentWillUnmount() {
    let { statusU, statusP, statusE, password, email, username, attempt } = this.state
    let updateData = this.context.update
    if (statusU && statusP && statusE && attempt) {
      this.setState({attempt: false})
      updateData([username, password, email, this.state.userbase], 'signup')
    }
    document.getElementById('body').style.backgroundColor = 'lavender'
  }

  componentDidUpdate() {

    let updateData = this.context.update
    let { page } = this.context

    let {
      statusU,
      statusP,
      statusE,
      password,
      email,
      username,
      attempt } = this.state


    if (page === 'home') {
      console.log('is this a logout?')
      updateData('login', 'login')
    }

    if (statusU && statusP && statusE && attempt) {
      updateData('home', 'login')
      this.setState({statusU: false, statusP: false, statusE: false, attempt: false})
    }

  }

  componentDidMount() {
    let { changePage, page } = this.props
    document.getElementById('body').style.backgroundColor = 'black'
    this.setState({statusU: false, statusP: false, statusE: false, attempt: false})
  }

  render() {
    let { changePage } = this.props
    let { onChange, onSubmit, loginSignup, clearAttempt } = this
    let {
      statusU,
      statusP,
      statusE,
      returningUser,
      password,
      email,
      username,
      attempt } = this.state

    let options;
    let emailInput;
    let colorF, colorU, colorP, colorE, validE, validU, validP;
    let styles = ['black','red', 'lime']

    if (statusU === undefined) { colorU = styles[0] }
    else if (statusU === false) { colorU = styles[1] }
    else if (statusU) { colorU = styles[2] }

    if (statusP === undefined) { colorP = styles[0] }
    else if (statusP === false) { colorP = styles[1] }
    else if (statusP) { colorP = styles[2] }

    if (statusE === undefined) { colorE = styles[0] }
    else if (statusE === false) { colorE = styles[1] }
    else if (statusE) { colorE = styles[2] }

    if (attempt && !statusU) validU = '1px solid red'
    else validU = 'none'

    if (attempt && !statusE) validE = '1px solid red'
    else validE = 'none'

    if (attempt && !statusP) validP = '1px solid red'
    else validP = 'none'

    if (returningUser) {
      colorF = 'white'
      emailInput = '';
      options = (
        <p>Don't have an account? <span className='options' onClick={() => this.loginSignup('signup')}>Sign up</span>.</p>
      )
    } else {
      colorF = '#FFF7E7'
      emailInput = (
        <label style={{border: validE}}>
          <p>Email</p>
          <input name='email' style={{outlineColor: colorE}} onChange={onChange} />
        </label>
      )
      options = (
        <p>Already have an account? <span className='options' value={email} onClick={() => this.loginSignup('login')}>Login</span>.</p>
      )
    }

    return (
      <div id="login">
        <div id="title">
          <p className='logo2'>
            <span className='peace2'>Peace</span>
            <span className='and2'>&</span>
            <span className='serenity2'>Serenity</span>
          </p>
        </div>
        <form id='loginForm' onSubmit={onSubmit} name='' style={{backgroundColor: colorF}}>
          {emailInput}
          <label style={{border: validU}}>
            <p>Username</p>
            <input name='username' style={{outlineColor: colorU}} value={username} onChange={onChange} />
          </label>
          <label style={{border: validP}}>
            <p>Password</p>
            <input name='password' style={{outlineColor: colorP}} value={password} onChange={onChange} id='pass' />
          </label>
          <button>{returningUser ? 'LOGIN' : 'SIGN UP'}</button>
          {options}
        </form>

        <MyContext.Consumer>
        {context => (
          <div>
          </div>
        )}
        </MyContext.Consumer>

      </div>
    )
  }
}

export default Login;

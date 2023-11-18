import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 20})
    const jwt1 = Cookies.get('jwt_token')
    // console.log('one')

    // if (jwt1 !== undefined) {
    const {history} = this.props
    history.replace('/')
    // }

    return null
  }

  onSubmitFailure(error1) {
    console.log(error1)
    this.setState({
      errorMsg: error1,
    })
  }

  get2 = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const data = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const data1 = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data1.jwt_token)
    } else {
      this.onSubmitFailure(data1.error_msg)
    }
  }

  name = event => {
    this.setState({
      username: event.target.value,
    })
  }

  password = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwt1 = Cookies.get('jwt_token')
    console.log(jwt1)
    if (jwt1 !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginPage">
        <form className="form1" onSubmit={this.get2}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="img1"
            alt="website logo"
          />

          <br />
          <label htmlFor="one" className="label">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            id="one"
            className="input2"
            placeholder="Username"
            value={username}
            onChange={this.name}
          />
          <br />
          <label htmlFor="two" className="label">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            id="two"
            className="input2"
            placeholder="Password"
            value={password}
            onChange={this.password}
          />
          <br />
          <br />
          <div className="btn2">
            <button className="btn1" type="submit">
              Login
            </button>
            {errorMsg !== '' && <p className="heading2">{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default Login

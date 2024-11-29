import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitErrorMSg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitErrorMSg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jwt_token)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
      console.log(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input"
          placeholder="Username"
          type="text"
          onChange={this.onChangeUserName}
          value={username}
          id="username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input"
          placeholder="Password"
          type="password"
          onChange={this.onChangePassword}
          value={password}
          id="password"
        />
      </>
    )
  }

  render() {
    const {showSubmitErrorMSg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-page">
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <div className="username-container">
              {this.renderUsernameField()}
            </div>
            <div className="password-container">
              {this.renderPasswordField()}
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {showSubmitErrorMSg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

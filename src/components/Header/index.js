import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <div className="small-devices">
        <Link className="nav-links" to="/">
          <img
            className="home-small-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="home-small-container">
          <Link to="/">
            <li>
              <AiFillHome className="icons" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsBriefcaseFill className="icons" />
            </li>
          </Link>
          <li>
            <FiLogOut className="icons" onClick={onClickLogout} />
          </li>
        </ul>
      </div>
      <div className="medium-devices">
        <Link className="nav-links" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="medium-devices-container">
          <Link className="nav-links" to="/">
            <li className="medium-devices-list">Home</li>
          </Link>
          <Link className="nav-links" to="/jobs">
            <li className="medium-devices-list">Jobs</li>
          </Link>
        </ul>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)

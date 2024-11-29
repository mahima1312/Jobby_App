import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <Link className="nav-links" to="/not-found">
    <div className="not-found-container">
      <img
        className=""
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </Link>
)

export default NotFound

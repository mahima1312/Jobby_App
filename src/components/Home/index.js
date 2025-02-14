import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  return (
     <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link className="nav-links" to="/jobs">
          <button className="find-job-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home

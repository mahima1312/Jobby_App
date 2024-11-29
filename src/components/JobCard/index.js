import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link className="nav-links" to={`/jobs/${id}`}>
      <li className="job-card-container">
        <div className="job-card-company-details-container">
          <img
            className="company-logo-url"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="company-title-container">
            <h1 className="company-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-details-container">
          <div className="job-card-details">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location-name">{location}</p>
            </div>
            <div className="briefcase-container">
              <BsBriefcaseFill className="briefcase-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

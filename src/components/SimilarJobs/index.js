import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    jobDescription,
    companyLogoUrl,
    rating,
    title,
    location,
    employmentType,
  } = jobDetails
  return (
    <li className="job-card-container-similar-jobs">
      <div className="job-card-company-details-container-similar-jobs">
        <img
          className="company-logo-url-similar-jobs"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="company-title-container-similar-jobs">
          <h1 className="company-title-similar-jobs">{title}</h1>
          <div className="rating-container-similar-jobs">
            <FaStar className="star-icon-similar-jobs" />
            <p className="rating-text-similar-jobs">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading-similar-jobs">Description</h1>
      <p className="job-description-similar-jobs">{jobDescription}</p>
      <div className="job-card-details-similar-jobs">
        <div className="location-container-similar-jobs">
          <MdLocationOn className="location-icon-similar-jobs" />
          <p className="location-name-similar-jobs">{location}</p>
        </div>
        <div className="briefcase-container-similar-jobs">
          <BsBriefcaseFill className="briefcase-icon-similar-jobs" />
          <p className="employment-type-similar-jobs">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs

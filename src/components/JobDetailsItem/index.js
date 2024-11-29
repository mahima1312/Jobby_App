import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import Skills from '../Skills'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    description: data.life_at_company.description,
    imageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getFormattedSimilarJobs = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formattedJobDetails = this.getFormattedDetails(data.job_details)

      const formattedSkills = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const formattedSimilarJobs = data.similar_jobs.map(eachJob =>
        this.getFormattedSimilarJobs(eachJob),
      )

      this.setState({
        jobDetails: formattedJobDetails,
        skills: formattedSkills,
        similarJobs: formattedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, skills, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      description,
      imageUrl,
    } = jobDetails
    return (
      <div className="job-details-container">
        <div className="job-card-container">
          <div className="job-card-company-details-container">
            <img
              className="company-logo-url-job-details"
              src={companyLogoUrl}
              alt="job details company logo"
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
          <hr />
          <div className="company-website-url-container">
            <h1 className="description-heading-job-details">Description</h1>
            <a className="nav-links" href={companyWebsiteUrl}>
              <div className="company-website">
                <p className="visit-text">Visit</p>
                <FaExternalLinkAlt className="visit-icon" />
              </div>
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <Skills key={eachSkill.name} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              className="life-at-company-img"
              src={imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachJob => (
            <SimilarJobs key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-btn"
        onClick={this.getJobDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {jobDetails, similarJobs, skills} = this.state
    console.log(jobDetails)
    console.log(similarJobs)
    console.log(skills)
    return (
      <div>
        <Header />
        {this.renderJobDetailsItem()}
      </div>
    )
  }
}

export default JobDetailsItem

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Profile from '../Profile'
import JobCard from '../JobCard'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsData: [],
    searchInput: '',
    employmentTypesChecked: [],
    activeSalaryRangeId: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentTypesChecked, activeSalaryRangeId} =
      this.state
    const jwtToken = Cookies.get('jwt_token')

    const employTypes = employmentTypesChecked.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateEmploymentTypesChecked = typeId => {
    const {employmentTypesChecked} = this.state
    let updatedList = employmentTypesChecked
    if (employmentTypesChecked.includes(typeId)) {
      updatedList = employmentTypesChecked.filter(
        eachType => eachType !== typeId,
      )
    } else {
      updatedList = [...updatedList, typeId]
    }
    this.setState({employmentTypesChecked: updatedList}, this.getJobsData)
  }

  updateSalaryRange = rangeId => {
    this.setState({activeSalaryRangeId: rangeId}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getJobDetailsView = () => {
    const {searchInput, jobsData} = this.state
    if (searchInput !== '') {
      const searchResults = jobsData.filter(eachJob =>
        eachJob.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
      this.setState({jobsData: searchResults}, this.getJobsData)
    } else {
      this.getJobsData()
    }
  }

  searchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar-container">
        <input
          onChange={this.onChangeSearchInput}
          type="search"
          className="search-input"
          value={searchInput}
          placeholder="Search"
        />
        <button
          className="search-btn"
          onClick={this.getJobDetailsView}
          type="button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsData} = this.state
    const showJobs = jobsData.length > 0
    return showJobs ? (
      <ul className="jobs-cards-container">
        {jobsData.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-found-container">
        <img
          className="no-jobs-found-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-found-heading">No Jobs Found</h1>
        <p className="no-jobs-found-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailure = () => (
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
      <button className="failure-btn" onClick={this.getJobsData} type="button">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {activeSalaryRangeId} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="side-bar-container">
            <div className="jobs-small-devices">{this.searchBar()}</div>
            <div className="side-bar">
              <Profile />
              <FiltersGroup
                updateEmploymentTypesChecked={this.updateEmploymentTypesChecked}
                updateSalaryRange={this.updateSalaryRange}
                activeSalaryRangeId={activeSalaryRangeId}
              />
            </div>
          </div>
          <div className="jobs-side-container">
            <div className="jobs-large-devices">{this.searchBar()}</div>
            {this.renderJobsData()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDashBoardDetails()
  }

  getDashBoardDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formattedLast7Days = data.last_7_days_vaccination.map(item => ({
        vaccineDate: item.vaccine_date,
        dose1: item.dose_1,
        dose2: item.dose_2,
      }))
      const formattedVaccinatedByAge = data.vaccination_by_age.map(item => ({
        age: item.age,
        count: item.count,
      }))
      const formattedVaccinatedByGender = data.vaccination_by_gender.map(
        item => ({
          count: item.count,
          gender: item.gender,
        }),
      )

      this.setState({
        last7DaysVaccination: formattedLast7Days,
        vaccinationByAge: formattedVaccinatedByAge,
        vaccinationByGender: formattedVaccinatedByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure-image"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderDashBoards = () => {
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage
          last7DaysVaccinationDetails={last7DaysVaccination}
        />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderSwitchViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDashBoards()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-bg-container">
        <div className="main-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p>Co-Win</p>
        </div>
        <h1 className="cowin-heading">CoWIN Vaccination in India</h1>
        {this.renderSwitchViews()}
      </div>
    )
  }
}

export default CowinDashboard

import {Component} from 'react'
// import {CiSearch} from 'react-icons/ci'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
// import {CiSearch} from 'react-icons/ci'

import {IoIosSearch} from 'react-icons/io'
import FilterGroups from '../FilterGroups'
import SkillCard from '../SkillCard'

import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    list1: [],
    api: '',
    // profile1: '',
    list2: [],
    searchInput: '',
    salary: '',
    search3: '',
    typesList: [],
    // profile2: '',
    api1: '',
  }

  componentDidMount() {
    this.getProfile()
    this.renderJobs1()
  }

  changeType = typeId => {
    const {typesList} = this.state
    if (!typesList.includes(typeId)) {
      this.setState(
        {
          typesList: [...typesList, typeId],
        },
        this.renderJobs1,
      )
    }
  }

  search2 = () => {
    const {searchInput} = this.state
    this.setState(
      {
        search3: searchInput,
      },
      this.renderJobs1,
    )
  }

  getProfile = async () => {
    this.setState({
      api1: apiStatus.inProgress,
    })
    const jwt1 = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwt1}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      const updatedData = {
        profileDetails: {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        },
      }

      this.setState({
        list1: updatedData,
        // api: apiStatus.success,
        // profile1: true,
        // profile2: true,
        api1: apiStatus.success,
      })
    } else if (response.ok === false) {
      this.setState({
        // profile1: true,
        // profile2: false,
        api1: apiStatus.failure,
      })
    }
  }

  getProfile1 = () => {
    const {list1, profile2} = this.state
    console.log(profile2)
    // console.log(list1)
    const {profileDetails} = list1
    const {profileImageUrl, name, shortBio} = profileDetails
    // console.log(name)
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" className="img1234" />

        <h1 className="h12">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  getApi = () => {
    this.getProfile()
  }

  getApi1 = () => {
    this.renderJobs1()
  }

  getFailure = () => (
    <div className="profile12">
      <button className="btn123" type="submit" onClick={this.getApi}>
        Retry
      </button>
    </div>
  )

  loader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  loader1 = () => (
    <div className="profile12">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobs = () => {
    const {list2} = this.state
    // const list3 = list2.filter(each =>
    //   each.title.toLowerCase().includes(searchInput.toLowerCase()),
    if (list2.length === 0) {
      return (
        <div className="failure1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="h11">No Jobs Found</h1>
          <p className="h11">We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    // )
    return (
      <ul>
        {list2.map(each => (
          <JobCard item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  FailureView1 = () => (
    <div className="failure1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="img123"
      />
      <h1 className="h11">Oops! Something Went Wrong</h1>
      <p className="h11">We cannot seem to find the page you are looking for</p>
      <button className="btn123" type="submit" onClick={this.getApi1}>
        Retry
      </button>
    </div>
  )

  changeSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  changeSalary = salary => {
    this.setState(
      {
        salary,
      },
      this.renderJobs1,
    )
  }

  //   renderTypes = () => (
  //     <FilterGroups />

  //   )

  renderSalary = () => {
    const {salary} = this.state
    return (
      <>
        <FilterGroups
          activeSalary={salary}
          changeSalary={this.changeSalary}
          changeType={this.changeType}
        />
      </>
    )
  }

  onSubmitSuccess = () => {
    this.setState({
      api: apiStatus.success,
    })
  }

  renderSearch = () => (
    <div className="search1">
      <input
        type="search"
        className="input1"
        placeholder="Search"
        onChange={this.changeSearch}
      />

      <button
        className="btn23"
        type="button"
        data-testid="searchButton"
        onClick={this.search2}
      >
        {/* <h1>one</h1> */}
        {/* <CiSearch /> */}

        <IoIosSearch className="icons" />
      </button>
    </div>
  )

  renderJobs1 = async () => {
    const {salary, search3, typesList} = this.state
    console.log(typesList.join())
    const types = typesList.join()

    this.setState({
      api: apiStatus.inProgress,
    })
    const jwt1 = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${search3}&minimum_package=${salary}&employment_type=${typesList.join()}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt1}`,
      },
    }
    const response1 = await fetch(url, options)
    if (response1.ok === true) {
      const data2 = await response1.json()

      const {jobs} = data2
      // console.log(jobs)
      const updatedData1 = jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        list2: updatedData1,
      })
      this.onSubmitSuccess()
    } else {
      this.setState({
        api: apiStatus.failure,
      })
    }
  }

  renderApiJobs = () => {
    const {api} = this.state
    console.log(api)
    switch (api) {
      case apiStatus.success:
        return this.getJobs()
      case apiStatus.failure:
        return this.FailureView1()
      case apiStatus.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  renderApiProfile = () => {
    const {api1} = this.state
    console.log(api1)
    switch (api1) {
      case apiStatus.success:
        return this.getProfile1()
      case apiStatus.failure:
        return this.getFailure()
      case apiStatus.inProgress:
        return this.loader1()
      default:
        return null
    }
  }

  render() {
    // const {profile1, profile2} = this.state
    return (
      <>
        <div className="c111">
          <Header />
          <div className="jobs">
            <div className="profile1">
              {/* {profile1 && (
                <>
                  {' '}
                  {profile2 === true ? this.getProfile1() : this.getFailure()}
                </>
              )} */}
              {this.renderApiProfile()}
              {/* <hr className="hr1" /> */}
              {/* {this.renderTypes()} */}
              <hr className="hr1" />
              {this.renderSalary()}
            </div>

            <div className="job2">
              {this.renderSearch()}
              {this.renderApiJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs

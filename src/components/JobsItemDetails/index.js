import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'

import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import SimilarSkills from '../SimilarSkills'
import SkillCard from '../SkillCard'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsItemDetails extends Component {
  state = {api: '', list1: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      api: apiStatus.inProgress,
    })
    const jwt1 = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt1}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          title: data.job_details.title,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(each => ({
            imageUrl: each.image_url,
            name: each.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          similarJobs: data.similar_jobs.map(each => ({
            companyLogoUrl: each.company_logo_url,
            employmentType: each.employment_type,
            id: each.id,
            jobDescription: each.job_description,
            location: each.location,
            rating: each.rating,
            title: each.title,
          })),
        },
      }
      console.log(updatedData)
      this.setState({
        api: apiStatus.success,
        list1: updatedData,
      })
    } else {
      this.setState({
        api: apiStatus.failure,
      })
    }
  }

  getSkills = each => {
    const {imageUrl, name} = each
    return (
      <li className="li1">
        <img src={imageUrl} alt={name} className="img12245" />
        <h1 className="h112">{name}</h1>
      </li>
    )
  }

  getSuccess = () => {
    const {list1} = this.state

    const {jobDetails} = list1
    const {
      companyLogoUrl,
      title,
      rating,
      id,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
      similarJobs,
    } = jobDetails
    console.log(similarJobs)
    return (
      <div className="container2">
        <div className="job-con1">
          <div className="title">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job_img"
            />
            <div>
              <h1 className="h13">{title}</h1>
              <div className="title">
                <FaStar className="icon-star" />
                <p className="h13">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job123">
            <div className="title">
              <div className="title1">
                <IoLocationSharp className="location" />
                <p className="h13">{location}</p>
              </div>
              <div className="title1">
                <BsFillBriefcaseFill className="location" />
                <p className="h13">{employmentType}</p>
              </div>
            </div>
            <div className="salary">
              <p className="h13">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className="desc">
              <h1 className="h15">Description</h1>
              <a href={companyWebsiteUrl}>
                Visit
                <FiExternalLink className="visit" />
              </a>
            </div>
            {/* <a href={>
              <>
                Visit
                <MdBrowserUpdated />
              </>
            </a> */}
            <p className="h15">{jobDescription}</p>
          </div>
          <h1 className="h11">Skills</h1>
          <ul className="ul1">
            {skills.map(each => (
              <SkillCard item={each} key={each.name} />
            ))}
          </ul>
          <h1 className="h11">Life At Company</h1>
          <div className="life1">
            <p className="h1123">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              //   className="life1"
            />
          </div>
        </div>
        <h1 className="h11111">Similar Jobs</h1>
        <ul className="similar_jobs">
          {similarJobs.map(each => (
            <SimilarSkills key={each.id} item={each} />
          ))}
        </ul>
      </div>
    )
  }

  //   getApi1 = () => {
  //     this.getData()
  //   }

  getApi1 = () => {
    this.getData()
  }

  getFailure = () => (
    <div className="c111 failure1">
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

  getEachJob = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.success:
        return this.getSuccess()
      case apiStatus.failure:
        return this.getFailure()
      case apiStatus.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  loader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    return (
      <div className="c111">
        <Header />
        {this.getEachJob()}
      </div>
    )
  }
}
export default JobsItemDetails

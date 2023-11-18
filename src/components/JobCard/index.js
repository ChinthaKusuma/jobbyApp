import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {item} = props
  //   console.log(item)
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item
  //   console.log(item)
  return (
    <Link style={{textDecoration: 'none'}} to={`/jobs/${id}`}>
      <div className="job-con1">
        <div className="title">
          <img src={companyLogoUrl} alt="company logo" className="job_img" />
          <div>
            <h1 className="h11">{title}</h1>
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
              <p className="h11">{location}</p>
            </div>
            <div className="title1">
              <BsFillBriefcaseFill className="location" />
              <p className="h11">{employmentType}</p>
            </div>
          </div>
          <div className="salary">
            <p className="h11">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1 className="h15">Description</h1>

          <p className="h15">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}
export default JobCard

import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarSkills = props => {
  const {item} = props
  //   console.log(item1)

  //   const {imageUrl, name} = item1
  const {
    companyLogoUrl,

    rating,
    title,
    jobDescription,
    location,
    employmentType,
  } = item

  const getSimilar1 = () => (
    <li className="job-con1 li2">
      <div className="title">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="job_img1"
        />
        <div>
          <h1 className="h11123">{title}</h1>
          <div className="title">
            <FaStar className="icon-star" />
            <p className="h13">{rating}</p>
          </div>
        </div>
      </div>

      <hr />
      <div>
        <h1 className="h15">Description</h1>

        <p className="h15">{jobDescription}</p>
      </div>
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
    </li>
  )

  return (
    <>
      {/* <li>{getSkills()}</li> */}
      <li>{getSimilar1()}</li>
    </>
  )
}
export default SimilarSkills

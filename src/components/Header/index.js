import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {IoIosHome, IoMdMail} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }
  return (
    <nav>
      <div className="header">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="img1"
          />
        </Link>
        <ul className="two">
          <Link to="/">
            <li className="li123">
              <button className="home-btn" type="button">
                <p className="para1">Home</p>
              </button>
              <button className="home-btn1" type="button">
                {/* <img src="IoIosHome" */}
                <IoIosHome />
              </button>
            </li>
          </Link>
          <Link to="/jobs">
            <li className="li123">
              <button className="home-btn" type="button">
                <p className="para1">Jobs</p>
              </button>
              <button className="home-btn1" type="button">
                {/* <img src="IoIosHome" */}
                <IoMdMail />
              </button>
            </li>
          </Link>

          {/* <p className="para1">Jobs</p> */}
        </ul>

        <li className="one123">
          <button className="home-btn btn3" type="button" onClick={logout}>
            Logout
          </button>
          <button className="home-btn1" type="button" onClick={logout}>
            {/* <img src="IoIosHome" */}
            <FiLogOut />
          </button>
        </li>
      </div>
    </nav>
  )
}
export default withRouter(Header)

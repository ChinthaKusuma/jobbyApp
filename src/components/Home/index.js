import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <div className="home123">
          <nav>
            <Header />
          </nav>
          <div className="home5">
            <h1 className="h11">Find The Job That Fits Your Life</h1>

            <p className="h11">
              Millions of people are searching for jobs,salary
              information,company reviews.Find the job that fits your abilities
              and potential
            </p>
            <Link to="/jobs">
              <button className="btn12" type="submit">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}
export default Home

import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwt1 = Cookies.get('jwt_token')
  if (jwt1 === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default ProtectedRoute

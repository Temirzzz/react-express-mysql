import { Route, Redirect } from "react-router-dom"

const ProtectedRout = ({ isAuth: isAuth, component: PrivatPage, ...rest }) => {

  return <Route {...rest} render={(props) => {
    if(isAuth) {
      return <PrivatPage /> 
    } 
    else {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }
  }} />
}

export default ProtectedRout
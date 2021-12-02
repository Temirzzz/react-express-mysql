import { Route, Redirect } from "react-router-dom"

const ProtectedAdminRout = ({ isAuth: isAuth, component: AdminPanel, ...rest }) => {

  return <Route {...rest} render={(props) => {
    if(isAuth) {
      return <AdminPanel /> 
    } 
    else {
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
  }} />
}

export default ProtectedAdminRout
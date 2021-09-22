import { withRouter, useHistory } from "react-router-dom" // gives accsess to rout

const PrivatPage = () => {
  const history = useHistory()

  const logout = () => {
    localStorage.removeItem('accsessToken')
    history.push('/enter')
  }

  return (
    <div>
      <h1>privat Page</h1>
      <button onClick={ logout }>logout</button>
    </div>
  )
}

export default withRouter(PrivatPage)
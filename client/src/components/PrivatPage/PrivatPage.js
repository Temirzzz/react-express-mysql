import { withRouter, useHistory } from "react-router-dom"

const PrivatPage = () => {
  const history = useHistory()

  const logout = () => {
    localStorage.removeItem('accsessToken')
    history.push('/login')
  }

  return (
    <div>
      <h1>privat Page</h1>
      <button onClick={ logout }>logout</button>
    </div>
  )
}

export default withRouter(PrivatPage)
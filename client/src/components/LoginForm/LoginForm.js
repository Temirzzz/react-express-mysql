import { useState,  } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import './LoginForm.scss'
import { errorMessage } from '../../helpers/erroeMessage'

const LoginForm = () => {
  const [logName, setLogName] = useState('')
  const [logPasswd, setLogPasswd] = useState('')
  const history = useHistory()
  
  const sendLoginData = async (e) => {
    e.preventDefault()

    try {
      if(logName && logPasswd) {
        await axios.post('http://localhost:3500/api/user/login',{ logName, logPasswd })
          .then((response) => {
            console.log(response);
            if(response.data.isLoggedIn === true) {
              localStorage.setItem('accsessToken', JSON.stringify(response.data.token))
              history.push('/private')
            }
            else {
              errorMessage(response.data)
              console.log(response.data);
            }
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <form className='form login-form'>
      <h1>Login</h1>
      <input className='login-form__input' placeholder='Login' type='text' onChange={(e) => {
        setLogName(e.target.value)
      } } />
      <input className='login-form__input' placeholder='Password' type='password' onChange={(e) => {
        setLogPasswd(e.target.value)
      } } />
      <button className='login-form__button' onClick={ sendLoginData }>Submit</button>
    </form>
     
  )
}

export default LoginForm
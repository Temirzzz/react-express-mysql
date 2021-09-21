import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './EnterForm.scss'

const EnterForm = () => {
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPasswd, setRegPasswd] = useState('')
  const [logName, setLogName] = useState('')
  const [logPasswd, setLogPasswd] = useState('')

  const sendRegistrData = async (e) => {
    e.preventDefault()
    try {
      if(regName && regEmail && regPasswd) {
        await axios.post('http://localhost:3500/api/user/registr', { regName, regEmail, regPasswd }, {})
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendLoginData = async (e) => {
    e.preventDefault()
    try {
      if(logName && logPasswd) {
        await axios.post('http://localhost:3500/api/user/login', { logName, logPasswd }, {})
          .then((response) => {
            // console.log(response.data);
            if(response.data.isLoggedIn === true) {
              console.log('super');
              localStorage.setItem('accsessToken', JSON.stringify(response.data.token))
              return <Redirect to={{ pathname: '/private' }} />
            }
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='form__section'>
      <div className='form__wrapper'>
        <form className='form'>
          <h1>Registration</h1>
          <input className='form__input' placeholder='Login' type='text' onChange={(e) => {
            setRegName(e.target.value)
          } } />
          <input className='form__input' placeholder='Email' type='email' onChange={(e) => {
            setRegEmail(e.target.value)
          } } />
          <input className='form__input' placeholder='Password' type='password' onChange={(e) => {
            setRegPasswd(e.target.value)
          } } />
          <button className='form__button' onClick={ sendRegistrData }>Submit</button>
        </form>

        <form className='form'>
          <h1>Login</h1>
          <input className='form__input' placeholder='Login' type='text' onChange={(e) => {
            setLogName(e.target.value)
          } } />
          <input className='form__input' placeholder='Password' type='password' onChange={(e) => {
            setLogPasswd(e.target.value)
          } } />
          <button className='form__button' onClick={ sendLoginData }>Submit</button>
        </form>
      </div>

      
    </section>
  )
}

export default EnterForm
import { useState } from 'react'
import axios from 'axios'
import { errorMessage } from '../../helpers/errorMessage'
import './RegistForm.scss'

const RegistForm = () => { 
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPasswd, setRegPasswd] = useState('')

  const sendRegistrData = async (e) => {
    e.preventDefault()

    try {
      if(regName && regEmail && regPasswd) {
        await axios.post('http://localhost:3500/api/user/registr', { regName, regEmail, regPasswd }, {})
          .then((response) => {
            if(response.data === 'alredy exist') errorMessage(response.data)
            console.log(response);
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className='form reg-form'>
      <h1>Registration</h1>
      <input className='reg-form__input' placeholder='Login' type='text' onChange={(e) => {
        setRegName(e.target.value)
      } } />
      <input className='reg-form__input' placeholder='Email' type='email' onChange={(e) => {
        setRegEmail(e.target.value)
      } } />
      <input className='reg-form__input' placeholder='Password' type='password' onChange={(e) => {
        setRegPasswd(e.target.value)
      } } />
      <button className='reg-form__button' onClick={ sendRegistrData } ><span>Submit</span></button>
    </form>
  )

}

export default RegistForm
import { useState } from 'react'
import axios from 'axios'
import './EnterForm'

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
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form>
        <input type='text' onChange={(e) => {
          setRegName(e.target.value)
        } } />
        <input type='email' onChange={(e) => {
          setRegEmail(e.target.value)
        } } />
        <input type='password' onChange={(e) => {
          setRegPasswd(e.target.value)
        } } />
        <button onClick={ sendRegistrData }>Submit</button>
      </form>

      <form>
        <input type='text' onChange={(e) => {
          setLogName(e.target.value)
        } } />
        <input type='password' onChange={(e) => {
          setLogPasswd(e.target.value)
        } } />
        <button onClick={ sendLoginData }>Submit</button>
      </form>
    </div>
  )
}

export default EnterForm
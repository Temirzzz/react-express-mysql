import {useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import React from 'react'
import './AdminPage.scss'

const AdminPage = () => {
  const [adminName, setAdminName] = useState('')
  const [adminPasswd, setAdminPasswd] = useState('')
  const history = useHistory()


  const enterAdminPanel = async (e) => {
    e.preventDefault()

    try {
      if(adminName && adminPasswd) {
        await axios.post('http://localhost:3500/api/admin/adminPanel', { adminName, adminPasswd })
          .then((response) => {
            if(response.data.isLoggedIn === true) {
              console.log(response.data.isLoggedIn);
              localStorage.setItem('adminToken', JSON.stringify(response.data.token))
              history.push('/adminPanel')
            }
          })
      }
    } catch (error) {
      console.log(error)
    }

  }
  

  return (
    <div className='section'>
      <div className='private-page'>
        <h1>Admin Page</h1>
          <div className="private-page__form">
            <input className='private-page__input' type='text' placeholder='Admin Login' onChange={(e)=> {setAdminName(e.target.value)}}  />
            <input className='private-page__input' type='password' placeholder='Admin Password' onChange={(e)=> {setAdminPasswd(e.target.value)}} />
            <button onClick={ enterAdminPanel }>Enter</button>
          </div>
      </div>
    </div>
  )
}

export default AdminPage
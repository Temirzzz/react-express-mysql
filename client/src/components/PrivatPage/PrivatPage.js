import { withRouter, useHistory } from "react-router-dom"
import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import './PrivatPage.scss'



const PrivatPage = () => {
  const history = useHistory()
  const [messages, setMessages] = useState([]);
   

  const logout = () => {
    localStorage.removeItem('accsessToken')
    history.push('/login')
  }

  const submitMessage = () => {
    console.log(111);
    console.log(messages);
  } 
   
  return (
    <div className='section'>
      <button onClick={ logout }>logout</button>

      <div className='private-page'>
        <h1>Privat page</h1>

        <div className="private-page__form">
          <input className='private-page__input' type='text' placeholder='Your message' onChange={ (e) => {
            setMessages(e.target.value)
          } } />
          <button className='private-page__button' onClick={ submitMessage }>Submit</button>
        </div>
      </div>
    </div>
  )
}

     

export default withRouter(PrivatPage)
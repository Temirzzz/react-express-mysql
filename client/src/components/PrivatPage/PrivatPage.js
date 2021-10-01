import { withRouter, useHistory } from "react-router-dom"
import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import './PrivatPage.scss'



const PrivatPage = () => {
  const history = useHistory()
  const [messages, setMessages] = useState([]);
   

  const logout = () => {
    history.push('/login')
  }
   
    return (
        <div className='section'>
            <button onClick={ logout }>logout</button>

            <div className='private-page'>
                <h1>Privat page</h1>

                <div className="private-page__form">
                    <input className='private-page__input' type='text' placeholder='Your message' />
                    <button className='private-page__button'>Submit</button>
                </div>
            </div>
        </div>
    )
}

     

export default withRouter(PrivatPage)
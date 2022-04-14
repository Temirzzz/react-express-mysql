import { withRouter, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import socket from '../../helpers/socket'
import Chat from '../Chat/Chat'
import './PrivatPage.scss'

const PrivatPage = () => {
  const history = useHistory()

  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = (e) => {
    e.preventDefault()
    if(userName !== '' && room !== '') {
      socket.emit('joinRoom', room)
      setShowChat(true)
    }
  }


  const logout = () => {
    localStorage.removeItem('accsessToken')
    history.push('/login')
  }

  return (
    <div className='section'>
      <button className='private-page__button' onClick={ logout }>logout</button>

      <div className='private-page'>
        <h1>Privat page</h1>

        {!showChat ? (

          <div className="private-page__form">
            <input className='private-page__input' type='text' placeholder='Room ID' onChange={ event => { setRoom(event.target.value)} } />

            <input className='private-page__input' type='text' placeholder='Your name' onChange={ event => {setUserName(event.target.value)} } />

            <button onClick={ joinRoom }>Connect</button>
          </div>

        )
        : (

          <Chat socket={socket} username={userName} room={room} />

        )}

      </div>
    </div>
  )

}

   

export default withRouter(PrivatPage)
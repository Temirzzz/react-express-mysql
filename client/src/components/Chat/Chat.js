import { useEffect, useState } from 'react'
import socket from '../../helpers/socket'
import './Chat.scss'


const Chat = ({ socket, room, username }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])


  const sendMessage = async () => {
    if(currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit('sendMessage', messageData)
      setMessageList(list => [...list, messageData])
    }
  }

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessageList(list => [...list, data])
    })
  }, [socket])

  return (
    <div className='section'>
      <div className='chat'>
        <h3>Live chat</h3>
         
         <div>

         </div>
         <input className='' onChange={ event => { setCurrentMessage(event.target.value) } } />
         <button className='' onClick={ sendMessage }>Send</button>
      </div>
      <div>
          {messageList.map(messageContent => {
            return <div className='chat__message' id={ username === messageContent.author ? 'you' : 'other' }>
              <p>
                { messageContent.author }
              </p>
              <div>
                { messageContent.message }
              </div>
              <p>
                { messageContent.time }
              </p>

            </div>
          })}
         </div>
    </div>
  );
}

export default Chat
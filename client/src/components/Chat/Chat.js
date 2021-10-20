import { useEffect, useState } from 'react'
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
         <input className='chat__input' onChange={ event => { setCurrentMessage(event.target.value) } } />
         <button className='chat__button' onClick={ sendMessage }>Send</button>
      </div>
      <div className=''>
          {messageList.map(messageContent => {
            return <div className='chat__message' id={ username === messageContent.author ? 'you' : 'other' }>
              <h2 className='chat__message-author'>
                { messageContent.author }
              </h2>
              <p className='chat__message-message'>
                { messageContent.message }
              </p>
              <span className='chat__message-time'>
                { messageContent.time }
              </span>
            </div>
          })}
         </div>
    </div>
  );
}

export default Chat
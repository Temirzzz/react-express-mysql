import { withRouter, useHistory } from "react-router-dom"
import React, { useState, useContext } from 'react';
import axios from 'axios'
import './PrivatPage.scss'

const PrivatPage = () => {
  const history = useHistory()
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([]);

  console.log(posts);
  console.log(title);


  const logout = () => {
    localStorage.removeItem('accsessToken')
    history.push('/login')
  }

  const submitPost = async (e) => {
    e.preventDefault()

    try {
      if(title && posts) {
        await axios.post('http://localhost:3500/api/user/posts', { title, posts })
          .then((response) => {
           console.log(response);
          })
      }
    } catch (error) {
      console.log(error);
    }
  } 
   
  return (
    <div className='section'>
      <button onClick={ logout }>logout</button>

      <div className='private-page'>
        <h1>Privat page</h1>

        <div className="private-page__form">
          <input className='private-page__input' type='text' placeholder='Title' onChange={ (e) => {
            setTitle(e.target.value)
          } } />
          <input className='private-page__input' type='text' placeholder='Your message' onChange={ (e) => {
            setPosts(e.target.value)
          } } />
          <button className='private-page__button' onClick={ submitPost }>Submit</button>
        </div>
      </div>
    </div>
  )
}

     

export default withRouter(PrivatPage)
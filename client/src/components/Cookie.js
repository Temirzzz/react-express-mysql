import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './Cookie.scss'

function Cookie(prop) {

  const acceptCookie = (e) => {
    localStorage.setItem('cookie', true)
    if(prop.hideCookie) {
      prop.hideCookie()
    }
  }



  return (
    <Router>
      <div className='cookie'>
        <h1>
          This site use Cookie
        </h1>
        <p>checkout this <Link to='/'>link</Link></p>
        <button onClick={ acceptCookie }>Accept</button>
      </div>
    </Router>
  );
}

export default Cookie;
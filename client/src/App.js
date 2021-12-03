import React, { useEffect, useState } from 'react'
import Header from './pages/Header/Header'
import Cookie from './components/Cookie'



function App() {
  const [showCookie, setShowCookie] = useState()

  const hideCookiePopup = () => {
    setShowCookie(false)
  }

  useEffect(() => {
    setShowCookie(localStorage.getItem('cookie') !== 'true')

  }, [])


  return (
    <div className="App">
      <Header />
      {showCookie && <Cookie hideCookie = { hideCookiePopup }/>}
    </div>
  )
}

export default App

import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import './Header.scss'

import EnterForm from '../EnterForm/EnterForm'
import About from '../About/About'
import Home from '../Home/Home'
import PrivatPage from '../PrivatPage/PrivatPage'
import ProtectedRout from '../ProtectedRout/ProtectedRout'

const Header = () => {
  const token = localStorage.getItem('accsessToken')

  return (
    <Router>
      <header className='header'>
        <div className='header__logo'>
          <Link to='/' >LOGO</Link>
        </div>
        <nav className='header__nav'>
          <ul className='header__menu'>
            <li className='header__link'>
              <Link to='/' >Home</Link>
            </li>
            <li className='header__link'>
              <Link to='/about' >About</Link>
            </li>
            <li className='header__link'>
              <Link to='/enter'>Enter</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <ProtectedRout path='/private' component={ PrivatPage } isAuth={ token } />
        </Switch>

      </header>

      <div>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/enter'>
          <EnterForm />
        </Route>
      </div>
    </Router>
    
  )
}

export default Header
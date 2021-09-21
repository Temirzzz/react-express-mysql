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
        <nav className='header__nav'>
          <ul className='header__menu'>
            <li>
              <Link to='/' >Home</Link>
            </li>
            <li>
              <Link to='/about' >About</Link>
            </li>
            <li>
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
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"
import { useState, useEffect, useMemo } from 'react'
import { postsContext } from "../../helpers/context"
import axios from 'axios'
import './Header.scss'
import LoginForm from '../LoginForm/LoginForm'
import RegistForm from '../RegistForm/RegistForm'
import About from '../About/About'
import Home from '../Home/Home'
import ProtectedRout from '../ProtectedRout/ProtectedRout'
import AdminPage from '../Admin/AdminPage'
import PrivatPage from '../PrivatPage/PrivatPage'
import AdminPanel from '../AdminPanel/AdminPanel'

import logo from '../../assests/images/logo.png'

const Header = () => {
  const token = localStorage.getItem('accsessToken')
  const adminToken = localStorage.getItem('adminToken')

  const [posts, setPosts] = useState([])
  const postsValue = useMemo(() => ({ posts, setPosts }), [posts, setPosts])


  const getPost = async () => {
    const res = await axios.get(`http://localhost:3500/api/user/posts`)
    setPosts(res.data)
  }

  useEffect(() => {
    getPost()
  }, [])


  return (
    <Router>
      <header className='header'>
        <div className='header__logo'>
          <Link to='/' >
            <img className='header__logo' src={ logo } alt='logo' /> 
            <p>Silly app</p>
          </Link>
        </div>
        <nav className='header__nav'>
          <ul className='header__menu'>
            <li>
              <Link className='header__link' to='/' >Home</Link>
            </li>
            <li>
              <Link className='header__link' to='/about' >About</Link>
            </li>

          <ul className='header__menu-inner'>
            <li className='header__link'>
              <Link className='header__login' to='/registr'>Registr</Link>
            </li>

            <div className='header__menu-inner__vertical-line'></div>
            
            <li className='header__link'>
              <Link className='header__registr' to='/login'>Login</Link>
            </li>
          </ul>

          </ul>
        </nav>
      </header>
      <div className='header__underline'></div>


      <postsContext.Provider value={ postsValue }>

        <Route exact path='/' component={ Home } />
        <Route exact path='/about' component={ About } />
        <Route exact path='/registr' component={ RegistForm } />
        <Route exact path='/login' component={ LoginForm } />
        <ProtectedRout exact path='/private' component={ PrivatPage } isAuth={ token } />
        <ProtectedRout exact path='/AdminPanel' component={ AdminPanel } isAuth={ adminToken } />

        <Route exact path='/admin' component={ AdminPage } />
      


      </ postsContext.Provider>
      
    </Router>
    
  )
}

export default Header
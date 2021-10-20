import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"
import './Header.scss'
import LoginForm from '../LoginForm/LoginForm'
import RegistForm from '../RegistForm/RegistForm'
import About from '../About/About'
import Home from '../Home/Home'
import ProtectedRout from '../ProtectedRout/ProtectedRout'
import PrivatPage from '../PrivatPage/PrivatPage'
import logo from '../../assests/images/logo.png'
import { motion } from "framer-motion"

const Header = () => {
  const token = localStorage.getItem('accsessToken')

  return (
    <Router>
      <header className='header'>
        <motion.div className='header__logo' 
          animate={{ rotate: 360 }}
          transition={{ duration: 2 }}
        >
          <Link to='/' >
            <img className='header__logo' src={ logo } alt='logo' /> 
            <p>Silly app</p>
          </Link>
        </motion.div>
        <nav className='header__nav'>
          <ul className='header__menu'>
            <motion.li className='header__link'
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 3 }}
            >
              <Link to='/' >Home</Link>
            </motion.li>
            <motion.li className='header__link'
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 3 }}
            >
              <Link to='/about' >About</Link>
            </motion.li>

          <ul className='header__menu-inner'>
            <motion.li className='header__link'
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 3 }}
            >
              <Link className='header__login' to='/registr'>Registr</Link>
            </motion.li>

            <div className='header__menu-inner__vertical-line'></div>
            
            <motion.li className='header__link'
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 3 }}
            >
              <Link className='header__registr' to='/login'>Login</Link>
            </motion.li>
          </ul>

          </ul>
        </nav>
      </header>
      <div className='header__underline'></div>

      <div>
        <Route exact path='/' component={ Home } />
        <Route exact path='/about' component={ About } />
        <Route exact path='/registr' component={ RegistForm } />
        <Route exact path='/login' component={ LoginForm } />
        <ProtectedRout exact path='/private' component={ PrivatPage } isAuth={ token } />
      </div>
    </Router>
    
  )
}

export default Header
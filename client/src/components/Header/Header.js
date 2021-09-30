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

const Header = () => {
  const token = localStorage.getItem('accsessToken')

  return (
    <Router>
      <header className='header'>
        <div className='header__logo'>
          <Link to='/' ><img className='header__logo' src={ logo } alt='logo' /></Link>
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
              <Link className='header__login' to='/registr'>Registr </Link>
              <Link className='header__registr' to='/login'>/ Login</Link>
            </li>
          </ul>
        </nav>
        <div className='header__underline'></div>
      </header>
      <div>
        <Route exact path='/'  component={ Home } />
        <Route exact path='/about' component={ About } />
        <Route exact path='/registr' component={ RegistForm } />
        <Route exact path='/login' component={ LoginForm } />
        <ProtectedRout exact path='/private' component={ PrivatPage } isAuth={ token } />
      </div>
    </Router>
    
  )
}

export default Header
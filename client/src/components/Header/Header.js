import './Header.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import EnterForm from '../EnterForm/EnterForm'
import About from '../About/About'
import Home from '../Home/Home'

const Header = () => {
  return (
    <Router>
      <header className='header'>
        <nav>
          <ul>
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
        <Route path='/'>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/enter'>
            <EnterForm />
          </Route>
        </Switch>

      </header>
    </Router>
    
  )
}

export default Header
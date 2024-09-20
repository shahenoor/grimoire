import logo from '../../assets/logo/grimoireLogo.png';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <>
      <header className='header'>
        <div className='header__name'>
          <div className='header__logo-container'>
            <img className='header__logo' src={logo}/>
          </div>
          <h1 className='header__title'>Grimoire</h1>
        </div>

        <nav className='header__nav'>
          <ul className='header__nav__list'>
            <NavLink to="/" className='header__nav-link'>
              {({ isActive }) => (
                <li className={`header__nav__item ${isActive ? 'header__nav__item--active' : ''}`}>Home</li>
              )}
            </NavLink>
            <NavLink to="/calendar" className='header__nav-link'>
              {({ isActive }) => (
                <li className={`header__nav__item ${isActive ? 'header__nav__item--active' : ''}`}>Calendar</li>
              )}
            </NavLink>
            <NavLink to="/board" className='header__nav-link'>
              {({ isActive }) => (
                <li className={`header__nav__item ${isActive ? 'header__nav__item--active' : ''}`}>Board</li>
              )}
          </NavLink>
          </ul>

          <div className='header__avatar-container'>
            <img className='header__avatar'/>
          </div>
          
        </nav>
      </header>
    </>
  )
}

export default Header
import React from 'react';
import { NavLink, useNavigate, useLocation} from 'react-router-dom';
import logo from '../../assets/logo/grimoireLogo.png';
import './Header.scss';
import SignupPage from '../../pages/SignupPage/SignupPage';

function Header({ authToken, setAuthToken }) { 
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';
  
  const handleLogout = () => {
    setAuthToken(null);
    navigate('/'); 
  };

  return (
    <header className='header'>
       <NavLink to="/" className='header__logo-link'>
        <div className='header__name'>
          <div className='header__logo-container'>
            <img className='header__logo' src={logo}/>
          </div>
          <h1 className='header__title'><span className='header__title--letter'>G</span>rimoire</h1>
        </div>
        </NavLink>
      {authToken ? (
            <>
      <nav className='header__nav'>
        <ul className='header__nav__list'>
          {/* In coming days - I will be using this NavLink for Home Page Dashboard */}
          {/* <NavLink to="/" className='header__nav-link'>
            {({ isActive }) => (
              <li className={`header__nav__item ${isActive ? 'header__nav__item--active' : ''}`}>Home</li>
            )}
          </NavLink> */}
        
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
              <li className='header__nav__item' onClick={handleLogout}>Logout</li>
              <div className='header__avatar-container'>
                {/* <img className='header__avatar'  alt="User Avatar"/> */}
              </div>
              </ul>
            </nav> 
                </>
          ) : (
            <>
              

        <nav className='header__nav'>
          <ul className='header__nav__list'>
            <NavLink to="/login" className='header__nav-link'>
              {(!isLoginPage && !isSignUpPage) && (
                <li className='header__nav__item'>Log in</li>
              )}
            </NavLink>
            <NavLink to="/signup" className='header__nav-link'>
              {(!isLoginPage && !isSignUpPage) &&(
                <li className='header__nav__item'>Sign up</li>
              )}
            </NavLink>
          </ul>          
        </nav>
            </>
            )}
      
    </header>
  );
}

export default Header;

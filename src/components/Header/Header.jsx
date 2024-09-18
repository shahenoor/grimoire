import './Header.scss';
import logo from '../../assets/logo/grimoireLogo.png';

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
            <li className='header__nav__item'>Home</li>
            <li className='header__nav__item'>Calendar</li>
            <li className='header__nav__item'>Board</li>
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
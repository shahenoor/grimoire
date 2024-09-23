import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import home from '@assets/icons/home.svg';
import homeActive from '@assets/icons/home_active.svg';
import calendar from '@assets/icons/calendar.svg';
import calendarActive from '@assets/icons/calendar_active.svg';
import viewColumnActive from '@assets/icons/viewColumn.svg';
import viewColumn from '@assets/icons/viewColumn_active.svg';
import github from '@assets/icons/github.svg';
import linkedIn from '@assets/icons/linkedIn.svg';
import githubActive from '@assets/icons/github_active.svg';
import linkedInActive from '@assets/icons/linkedIn_active.svg';
import add from '@assets/icons/add.svg';

import './Footer.scss';

function Footer() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

 
  return (
    <>
     {isMobile ? (
    <footer className="footer">
      {/* <NavLink to="/" className='footer__icon'>
        {({ isActive }) => (
          <>
            <img className='footer__icon-img' src={isActive ? homeActive : home} alt="Home" />
            <span className={`footer__text ${isActive ? 'footer__text--active' : ''}`}>Home</span>
          </>
        )}
      </NavLink> */}

      <NavLink to="/calendar" className='footer__icon'>
        {({ isActive }) => (
          <>
            <img className='footer__icon-img' src={isActive ? calendarActive : calendar} alt="Calendar" />
            <span className={`footer__text ${isActive ? 'footer__text--active' : ''}`}>Calendar</span>
          </>
        )}
      </NavLink>

      <NavLink to="/board" className='footer__icon'>
        {({ isActive }) => (
          <>
            <img className='footer__icon-img' src={isActive ? viewColumnActive : viewColumn} alt="Kanban View" />
            <span className={`footer__text ${isActive ? 'footer__text--active' : ''}`}>Board</span>
          </>
        )}
      </NavLink>

      <div className="footer__icon footer__icon--add">
        <img className='footer__icon-img' src={add} alt="Add" />
        <span className='footer__text'>Add</span>
      </div>
    </footer>
  ) : (
    <footer className="footer-desktop">
      <div className="footer-desktop__wrapper">
        <p className="footer-desktop__tagline">Just a mage crafting tech enchantments 🧙🏼‍♀️ — Shahen👀r</p>
        <div className="footer-desktop__links">
          <a href="https://www.linkedin.com/in/shahenoor29/" target="_blank" rel="noopener noreferrer" className="footer-desktop__link">
            <img src={linkedIn} />
          </a>
          <a href="https://github.com/shahenoor" target="_blank" rel="noopener noreferrer" className="footer__link">
            <img src={github} />
          </a>
        </div>
      </div>
      <p className="footer-desktop__copyright">© 2024 Shahenoor Radhanpuri. All rights reserved.</p>
    </footer>
  )} 
  </>
  )
}

export default Footer;

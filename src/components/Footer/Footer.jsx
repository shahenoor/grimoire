import React from 'react';
import { NavLink } from 'react-router-dom';

import home from '@assets/icons/home.svg';
import homeActive from '@assets/icons/home_active.svg';
import calendar from '@assets/icons/calendar.svg';
import calendarActive from '@assets/icons/calendar_active.svg';
import viewColumnActive from '@assets/icons/viewColumn.svg';
import viewColumn from '@assets/icons/viewColumn_active.svg';
import add from '@assets/icons/add.svg';

import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <NavLink to="/" className='footer__icon'>
        {({ isActive }) => (
          <>
            <img className='footer__icon-img' src={isActive ? homeActive : home} alt="Home" />
            <span className={`footer__text ${isActive ? 'footer__text--active' : ''}`}>Home</span>
          </>
        )}
      </NavLink>

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
  );
}

export default Footer;

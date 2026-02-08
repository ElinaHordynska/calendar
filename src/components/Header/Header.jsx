import React from 'react'
// import PropTypes from 'prop-types'
import style from "./header.module.scss"
import { IoCalendar } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


function Header(props) {
  return (
    <header className={style.wrapper}>
        <div className={style.iconBar}>
            <FaCalendarAlt/>
            <h3>RoboCalendar</h3>
        </div>
        <nav>
            <NavLink to="/" className={({isActive})=> isActive ? style.active : style.link}>Main</NavLink>
            <NavLink to="/" className={({isActive})=> isActive ? style.active : style.link}><IoCalendar />Month</NavLink>
            <NavLink to="/week" className={({isActive})=> isActive ? style.active : style.link}><FaCalendarAlt/>Week</NavLink>
            <NavLink to="/day" className={({isActive})=> isActive ? style.active : style.link}><FaCalendarDay/>Day</NavLink>

        </nav>
    </header>
  )
}

// Header.propTypes = {}

export default Header

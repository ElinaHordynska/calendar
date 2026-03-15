import React from 'react'
// import PropTypes from 'prop-types'
import style from "./header.module.scss"
import { IoCalendar } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from "../../store/AuthReducer"


function Header(props) {
  let isAuth = useSelector(state=>state.auth.token) != null;
  let dispatch = useDispatch()
  let logout = () =>{
    dispatchEvent(removeToken())
  }

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
            {
              isAuth ? (
                <>
                  <NavLink to="/login" className={({isActive})=> isActive ? style.active : style.link}>Login</NavLink>
                  <NavLink to="/register" className={({isActive})=> isActive ? style.active : style.link}>Register</NavLink>
                </>
              ):(
                <NavLink onclick={logout}>Log Out</NavLink>
              )
            }
        </nav>
    </header>
  )
}

// Header.propTypes = {}

export default Header

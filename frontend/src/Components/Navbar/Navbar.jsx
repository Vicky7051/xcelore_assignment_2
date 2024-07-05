import React, { useEffect, useState } from 'react'
import style from './Navbar.module.scss'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../../Redux/StoreSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const getToken = () => localStorage.getItem('token')
  const profile = useSelector(state => state.profile.data)
  
  const onClickLogout = () => {
    localStorage.removeItem('token')
    dispatch(setProfile(null))
    navigate('/auth/login')
  }
  
  
  return (
    <div className={style.topNav}>
      <div className={`container ${style.navParent}`}>
        <div className={style.logo}>
            <h1>Xcelore </h1>
        </div>
        <div className={style.menu}>
            <ul>
                <li><Link to={'/'} className={location.pathname === "/" ? style.active : ''}>Home</Link></li>
                {profile && profile.isAdmin && <li><Link to={'/users'} className={location.pathname === "/users" ? style.active : ''}>Users</Link></li>}
            </ul>
        </div>
        <div className={style.login}>
          {getToken() ? <Link onClick={() => onClickLogout()} >Logout</Link> : <Link to={'/auth/login'}>Login</Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar

import React, { useEffect } from 'react'
import style from './Welcome.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const profile = useSelector(state => state.profile.data)
  const navigate = useNavigate()
  const getToken = () => localStorage.getItem('token')

  useEffect(() => {
    if(!getToken() || !profile) navigate('/auth/login')
  }, [])

  return (
    <div className={style.welcome}>
        {profile && <h1>Welcome! {profile.firstName}</h1>}
    </div>
  )
}

export default Welcome

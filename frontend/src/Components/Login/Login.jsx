import React, { useEffect, useState } from 'react'
import style from './Login.module.scss'
import { Link } from 'react-router-dom'
import { AUTOLOGIN, LOGIN_USER } from '../../Service/ApiHandler'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../Redux/StoreSlice'


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email : "",
    password : ""
  })

  const onChangeHandler = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    const response = await LOGIN_USER(data)
    if(!response.status) return toast.warn(response.message)
    toast.success(response.message)
    localStorage.setItem('token', response.token)
    dispatch(setProfile(response.profile))
    navigate('/') 
  }

  const autoLoginHandler = async() => {
    const reponse = await AUTOLOGIN()
    console.log(reponse)
    navigate('/') 
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      autoLoginHandler()
    }
  }, [])

  return (
    <div className={style.login}>
      <div className={style.loginCard}>
        <h2 className={style.logo}>Login</h2>
        <form onSubmit={e => onSubmitHandler(e)}>
            <div className={style.formGroup}>
                <input className={style.inputBox} value={data.email} name='email' type='email' placeholder='Email' onChange={e => onChangeHandler(e)} required/>
            </div>
            <div className={style.formGroup}>
                <input className={style.inputBox} name='password' value={data.password} type='password' placeholder='Password' onChange={e => onChangeHandler(e)} required/>
            </div>
            <div className={style.formGroup}>
                <button className={style.btn}>Login</button>
            </div>
            <p className={style.text}>If you don't have an account? <Link to={'/auth/registration'}>Register Now!</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login

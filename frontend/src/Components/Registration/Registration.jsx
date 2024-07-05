import React from 'react'
import style from '../Login/Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { registrationSchema } from '../Validation/Validation.js'
import { REGISTER_USER } from '../../Service/ApiHandler.js'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../Redux/StoreSlice.js'

const Registration = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValue = {
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirm_password : ""
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues : initialValue,
    validationSchema : registrationSchema,
    onSubmit : (value) => {
      onSubmitHandler(values)
    }
  })

  const onSubmitHandler = async(data) => {
    const response = await REGISTER_USER(data)
    if(!response.status) return toast.warn(response.message)
    toast.success(response.message)
    console.log(response)
    localStorage.setItem('token', response.token)
    dispatch(setProfile(response.data))
    navigate('/auth/login')
  }


  return (
    <div className={style.login}>
      <div className={style.loginCard}>
        <h2 className={style.logo}>Registration</h2>
        <form onSubmit={handleSubmit}>
            <div className={style.formGroup}>
                <div className={style.maxWidth}>
                    <input name='firstName' value={values.firstName} className={style.inputBox} type='text' placeholder='First Name' onChange={handleChange} onBlur={handleBlur} required/>
                    {errors.firstName && touched.firstName && <p className={style.error}>{errors.firstName}</p>}
                </div>
                <div className={style.maxWidth}>
                    <input name='lastName' value={values.lastName} className={style.inputBox} type='text' placeholder='Last Name' onChange={handleChange} onBlur={handleBlur} required/>
                    {errors.lastName && touched.lastName && <p className={style.error}>{errors.lastName}</p>}
                </div>
            </div>
            <div className={style.formGroup}>
              <div className={style.maxWidth}>
                <input name='email' value={values.email} className={style.inputBox} type='email' placeholder='Email' onChange={handleChange} onBlur={handleBlur} required/>
                {errors.email && touched.email && <p className={style.error}>{errors.email}</p>}
              </div>
            </div>
            <div className={style.formGroup}>
              <div className={style.maxWidth}>
                <input name='password' value={values.password} className={style.inputBox} type='password' placeholder='Password' onChange={handleChange} onBlur={handleBlur} required/>
                {errors.password && touched.password && <p className={style.error}>{errors.password}</p>}
              </div>
              <div className={style.maxWidth}>
                <input name='confirm_password' value={values.confirm_password} className={style.inputBox} type='password' placeholder='Re-Password' onChange={handleChange} onBlur={handleBlur} required/>
                {errors.confirm_password && touched.confirm_password && <p className={style.error}>{errors.confirm_password}</p>}
              </div>
            </div>
            <div className={style.formGroup}>
                <button className={style.btn} type='submit'>Login</button>
            </div>
            <p className={style.text}>If you already have an account? <Link to={'/auth/login'}>Login Now!</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Registration

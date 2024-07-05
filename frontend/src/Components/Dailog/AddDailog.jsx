import React from 'react'
import style from './Dailog.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, toggleAddDailog } from '../../Redux/StoreSlice'
import { useFormik } from 'formik'
import { registrationSchema } from '../Validation/Validation'
import { REGISTER_USER_BY_ADMIN } from '../../Service/ApiHandler'
import { toast } from 'react-toastify'

const AddDailog = () => {
    const dispatch = useDispatch()
    const selectedUser = useSelector(state => state.selectedUser.data)

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
            addUserHandler(values)
        }
    })

    const addUserHandler = async(data) => {
        const response = await REGISTER_USER_BY_ADMIN(data)
        if(!response.status) return toast.warn(response.message)
        toast.success(response.message)
        dispatch(addUser(response.data))
        dispatch(toggleAddDailog(false))
    }

    return (
    <div className={style.dialogContainer}>
        <div className={style.dailogBox}>
            <div className={style.dailogHeader}>
                <p>Add User!</p>
            </div>
            <div className={style.dailogBody}>
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

                    <div className={style.buttons}>
                        <button type='reset' onClick={() => dispatch(toggleAddDailog(false))}>Cancel</button>
                        <button className={style.add} type='submit'>Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddDailog

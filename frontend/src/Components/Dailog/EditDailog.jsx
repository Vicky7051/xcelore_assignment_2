import React from 'react'
import style from './Dailog.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, toggleAddDailog, toggleEditDailog, updateUser } from '../../Redux/StoreSlice'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { EditRegistrationSchema } from '../Validation/Editvalidation'
import { EDIT_USER_BY_ADMIN } from '../../Service/ApiHandler'

const EditDailog = () => {
    const dispatch = useDispatch()
    const selectedUser = useSelector(state => state.selectedUser.data)


    const initialValue = {
        ...selectedUser
    }
    

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValue,
        validationSchema : EditRegistrationSchema,
        onSubmit : (value) => {
            addUserHandler(values)
        }
    })

    const addUserHandler = async(data) => {
        const response = await EDIT_USER_BY_ADMIN(data)
        if(!response.status)return toast.warn(response.message)
        else {
            toast.success(response.message)
            dispatch(updateUser(response.updatedUser))
        }
        dispatch(toggleEditDailog(false))
    }

    return (
    <div className={style.dialogContainer}>
        <div className={style.dailogBox}>
            <div className={style.dailogHeader}>
                <p>Edit User!</p>
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
                            <select className={style.inputBox} name='isAdmin' onChange={handleChange} onBlur={handleBlur}>
                                <option value={false} selected disabled>Select Role</option>
                                <option value={true} selected={selectedUser.isAdmin}>Admin</option>
                                <option value={false} selected={!selectedUser.isAdmin}>User</option>
                            </select>
                        </div>
                    </div>

                    <div className={style.buttons}>
                        <button type='reset' onClick={() => dispatch(toggleAddDailog(false))}>Cancel</button>
                        <button className={style.add} type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditDailog

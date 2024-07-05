import React from 'react'
import style from './Dailog.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, toggleDeleteDailog } from '../../Redux/StoreSlice'
import { DELETE_USER } from '../../Service/ApiHandler'
import { toast } from 'react-toastify'

const DeleteConfirm = () => {
    const dispatch = useDispatch()
    const selectedUser = useSelector(state => state.selectedUser.data)
    const deletUserhandler = async() => {
        const response = await DELETE_USER(selectedUser._id);
        if(!response.status) return toast.warn(response.message)
        toast.success(response.message)
        dispatch(deleteUser(selectedUser._id))
        dispatch(toggleDeleteDailog(false))
    }
  return (
    <div className={style.dialogContainer}>
        <div className={style.dailogBox}>
            <div className={style.dailogHeader}>
                <p>Delete user!</p>
            </div>
            <div className={style.dailogBody}>
                <p>Do you want to delete <strong>{selectedUser.firstName+" "+selectedUser.lastName}.</strong></p>
                <div className={style.buttons}>
                    <button onClick={() => dispatch(toggleDeleteDailog(false))}>Cancel</button>
                    <button onClick={() => deletUserhandler()}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteConfirm

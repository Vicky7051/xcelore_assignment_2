import React from 'react'
import style from './Users.module.scss'
import { useDispatch } from 'react-redux'
import { selectUser, toggleDeleteDailog, toggleEditDailog } from '../../Redux/StoreSlice'

const Tableinfo = ({data}) => {
    const dispatch = useDispatch()
    const deleteHandler = () => {
        dispatch(selectUser(data._id))
        dispatch(toggleDeleteDailog(true))
    }

    const editHandler = () => {
        dispatch(selectUser(data._id))
        dispatch(toggleEditDailog(true))
    }

  return (
    <tr>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{data.email}</td>
        <td className={style.action}><i className="fa-solid fa-pen-to-square" onClick={editHandler}></i><i className="fa-solid fa-trash-can" onClick={deleteHandler}></i></td>
    </tr>
  )
}

export default Tableinfo

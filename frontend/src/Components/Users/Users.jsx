import React, { useEffect, useState } from 'react'
import style from './Users.module.scss'
import Tableinfo from './Tableinfo'
import { useDispatch, useSelector } from 'react-redux'
import { GET_USERS } from '../../Service/ApiHandler'
import { toast } from 'react-toastify'
import { setUser, toggleAddDailog, toggleShowAdmin } from '../../Redux/StoreSlice'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selectedUser = useSelector(state => state.selectedUser.data)

    const [showAdmin, setShowAdmin] = useState(false)


    const getUsers = async() => {
        const response = await GET_USERS();
        if(!response.status) {
            toast.warn(response.message)
            navigate('/auth/login')
            return
        }
        dispatch(setUser(response.users))
    }
    useEffect(() => {
        getUsers()
    }, [])

    const onChangeHandler = (event) => {
        if(event.target.value == "true") setShowAdmin(true)
        else setShowAdmin(false)
    }

  return (
    <div className={`${style.users} container`}>
      <div className={style.addBtn}>
        <h3>{showAdmin ? "Admins" : "Users"}</h3>
        <button className={style.btn} onClick={() => dispatch(toggleAddDailog(true))}><i className="fa-solid fa-plus"></i> Add User</button>
      </div>
      <div className={style.info}>
        <div className={style.switch}>
            <label>Filter</label>
            <select className={style.inputBox} onChange={e => onChangeHandler(e)}>
                <option value={false}>Users</option>
                <option value={true}>Admins</option>
            </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { users && users.length > 0 && users.map((item, idx) => item.isAdmin == showAdmin && <Tableinfo data={item} key={idx}/>)}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users

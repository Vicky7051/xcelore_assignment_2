import express from 'express'

import {
    registerUser,
    getUserList,
    updateUser,
    deleteUser
} from '../Controller/userController.js'
import { verifyToken } from '../Middleware/verifyToken.js'

const adminRoute = express.Router()

adminRoute.post('/createUser', verifyToken, registerUser)
adminRoute.get('/get', verifyToken, getUserList)
adminRoute.put('/update', verifyToken, updateUser)
adminRoute.delete('/delete/:id', verifyToken, deleteUser)

export default adminRoute
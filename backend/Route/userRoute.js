import express from 'express'

import {
    registerUser,
    login,
    autoLogin
} from '../Controller/userController.js'
import { verifyToken } from '../Middleware/verifyToken.js'

const userRoute = express.Router()

userRoute.post('/createUser', registerUser)
userRoute.post('/login', login)
userRoute.post('/autologin', autoLogin) 



export default userRoute
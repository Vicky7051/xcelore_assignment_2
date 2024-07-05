import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToMongo } from './config/ConnectToMongo.js'
import userRoute from './Route/Userroute.js'
import adminRoute from './Route/adminRoute.js'
dotenv.config()
connectToMongo()

const PORT = process.env.PORT || 4000

const app = express()

const orginConfig = {
    origin : "http://localhost:5173"
}

app.use(express.json())
app.use(cors(orginConfig))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/admin', adminRoute)



app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})

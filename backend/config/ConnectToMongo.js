import { mongoose } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dburl = process.env.MONGODB_PATH

export const connectToMongo = () => {
    mongoose.connect(dburl).then(() => {
        console.log("Database connected.")
    }).catch((error) => {
        console.log(error)
    })
}


import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        enum : [true, false],
        default : false
    }
})

const useModel = mongoose.model("User", userSchema)
export default useModel
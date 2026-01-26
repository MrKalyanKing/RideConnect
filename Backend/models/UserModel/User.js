import mongoose from "mongoose";
import Mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    phone: {
        required: true,
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    Otp: {
        type: String,
        required: false
    }
})

const UserModel = Mongoose.model("User", UserSchema)

export default UserModel

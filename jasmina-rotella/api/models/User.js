import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    nomeutente: {type: String, required: true},
    email: { type: String, unique: true, required: false},
    password: {type: String, required: true}
});



const User = mongoose.model("User", userSchema)
export default userSchema;



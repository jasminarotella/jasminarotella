import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nomeutente: {type: String, required: true},
    email: { type: String, unique: true },
    password: {type: String, required: true}
});

export default userSchema;



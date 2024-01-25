import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 12,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 12,
        trim: true,
    },
    notes: {
        type: [Object],
        required: true,
        default: [],
    },
});

const User = model("User", userSchema);

export { User };

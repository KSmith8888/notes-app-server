import mongoose from "mongoose";
const { Schema, model } = mongoose;

const noteSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 300,
            trim: true,
        },
        creator: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 12,
            trim: true,
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Note = model("Note", noteSchema);

export { Note };

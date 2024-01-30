import { Note } from "../models/note-model.js";
import { User } from "../models/user-model.js";

const createNote = async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        const noteCreator = req.body.username;
        const noteContent = req.body.content;
        if (!noteContent) {
            throw new Error("Error: No note content was provided");
        }
        const dbUser = await User.findOne({ username: String(noteCreator) });
        if (!dbUser?.password) {
            throw new Error("Not a valid user");
        }
        const dbNote = await Note.create({
            content: noteContent,
            creator: noteCreator,
        });
        await User.findOneAndUpdate(
            { username: dbUser.username },
            {
                $set: {
                    notes: [
                        ...dbUser.notes,
                        {
                            content: dbNote.content,
                            timestamp: dbNote.createdAt,
                            completed: dbNote.completed,
                            noteId: dbNote._id,
                        },
                    ],
                },
            }
        );
        const updatedUser = await User.findOne({ username: dbUser.username });
        res.status(201);
        res.json({
            notes: updatedUser.notes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const deleteNote = async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        const deleteNoteId = req.body.id;
        if (!deleteNoteId) {
            throw new Error("Error: No note ID was provided");
        }
        const dbNote = await Note.findOne({ _id: String(deleteNoteId) });
        if (!dbNote) {
            throw new Error("Invalid note ID");
        }
        const noteCreator = dbNote.creator;
        await Note.findOneAndDelete({ _id: dbNote._id });
        const dbUser = await User.findOne({ username: String(noteCreator) });
        const newNotes = dbUser.notes.filter((note) => {
            return note.noteId !== String(deleteNoteId);
        });
        await User.findOneAndUpdate(
            { username: dbUser.username },
            {
                $set: {
                    notes: newNotes,
                },
            }
        );
        const updatedUser = await User.findOne({ username: dbUser.username });
        console.log(updatedUser.notes.length);
        res.status(201);
        res.json({
            notes: updatedUser.notes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

export { createNote, deleteNote };

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
        const updatedUser = await User.findOneAndUpdate(
            { username: dbUser.username },
            {
                $set: {
                    notes: [
                        ...dbUser.notes,
                        {
                            content: dbNote.content,
                            timestamp: dbNote.createdAt,
                            noteId: dbNote._id,
                        },
                    ],
                },
            }
        );
        console.log(updatedUser.notes.length);
        res.status(201);
        res.json({
            notes: updatedUser.notes,
        });
    } catch (error) {
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

export { createNote };

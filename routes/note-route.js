import express from "express";

import {
    createNote,
    editNote,
    deleteNote,
} from "../controllers/note-controller.js";
import { optionsPreflight } from "../controllers/options-preflight.js";

const noteRouter = express.Router();

noteRouter.options("*", optionsPreflight);
noteRouter.post("/create", createNote);
noteRouter.patch("/edit", editNote);
noteRouter.delete("/delete", deleteNote);

export { noteRouter };

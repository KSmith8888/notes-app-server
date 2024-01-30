import express from "express";

import { createNote, deleteNote } from "../controllers/note-controller.js";
import { optionsPreflight } from "../controllers/options-preflight.js";

const noteRouter = express.Router();

noteRouter.options("*", optionsPreflight);
noteRouter.post("/create", createNote);
noteRouter.delete("/delete", deleteNote);

export { noteRouter };

import express from "express";

import { authenticationRouter } from "./routes/authentication-route.js";
import { noteRouter } from "./routes/note-route.js";

const app = express();

app.use(express.json());

app.use("/api/v1/authentication", authenticationRouter);
app.use("/api/v1/note", noteRouter);

app.use(express.static("./public"));

app.use("*", (req, res) => {
    res.status(404);
    res.json({ message: "The requested resource does not exist" });
});

export { app };

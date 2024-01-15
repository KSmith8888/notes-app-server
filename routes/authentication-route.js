import express from "express";

import { loginAttempt } from "../controllers/authentication-controller.js";
import { optionsPreflight } from "../controllers/options-preflight.js";

const authenticationRouter = express.Router();

authenticationRouter.options("*", optionsPreflight);
authenticationRouter.post("/login", loginAttempt);

export { authenticationRouter };

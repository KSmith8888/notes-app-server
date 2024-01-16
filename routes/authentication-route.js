import express from "express";

import {
    loginAttempt,
    createAccount,
} from "../controllers/authentication-controller.js";
import { optionsPreflight } from "../controllers/options-preflight.js";

const authenticationRouter = express.Router();

authenticationRouter.options("*", optionsPreflight);
authenticationRouter.post("/login", loginAttempt);
authenticationRouter.post("/register", createAccount);

export { authenticationRouter };

import { User } from "../models/user-model.js";

const loginAttempt = (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error(
                "Credential Error: Username or password not provided"
            );
        }
        const attemptUsername = req.body.username;
        const attemptPassword = req.body.password;
        const validUsername = "admin";
        const validPassword = "testing";
        if (
            attemptUsername !== validUsername ||
            attemptPassword !== validPassword
        ) {
            throw new Error("Credential Error: Username or password not valid");
        }
        res.status(200);
        res.json({
            message: "Logged in successfully",
            notes: ["first note", "second note", "third note"],
        });
    } catch (error) {
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const createAccount = async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error(
                "Credential Error: Username or password not provided"
            );
        }
        const newUsername = req.body.username;
        const newPassword = req.body.password;
        const newAccountInfo = {
            username: newUsername,
            password: newPassword,
        };
        const requestedUsername = await User.findOne({
            username: newUsername,
        });
        if (requestedUsername?.password) {
            throw new Error("Username unavailable Error: Duplicate entry");
        }
        await User.create(newAccountInfo);
        res.status(200);
        res.json({
            message: `New account for ${newUsername} created successfully`,
        });
    } catch (error) {
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

export { loginAttempt, createAccount };

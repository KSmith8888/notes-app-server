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

const createAccount = (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error(
                "Credential Error: Username or password not provided"
            );
        }
        const username = req.body.username;
        //const password = req.body.password;
        res.status(200);
        res.json({
            message: `New account for ${username} created successfully`,
        });
    } catch (error) {
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

export { loginAttempt, createAccount };

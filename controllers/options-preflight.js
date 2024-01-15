const optionsPreflight = (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "POST,OPTIONS,GET,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.status(200);
    res.json({ message: "Preflight Passed" });
};

export { optionsPreflight };

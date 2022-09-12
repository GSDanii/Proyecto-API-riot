module.exports = app => {
    // Base routes
    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    // Auth routes
    const authRouter = require("./auth.routes");
    app.use("/auth", authRouter);

    const profileRouter = require("./profile.routes");
    app.use("/profile", profileRouter);

}
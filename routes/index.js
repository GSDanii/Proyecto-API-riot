// Todos los const coin require se ponen juntos y despues se llama al app.use
// Los require es como un import de algo, todos los imports se agrupan y se ponen al principio


module.exports = app => {
    // Base routes
    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    // Auth routes
    const authRouter = require("./auth.routes");
    app.use("/auth", authRouter);

    const profileRouter = require("./profile.routes");
    app.use("/profile", profileRouter);

    const forumRouter = require('./forum.routes')
    app.use('/forum', forumRouter)

}
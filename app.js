// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require('./config/session.config');
const { CHALLENGER } = require("./const/user.const");
session(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "Proyecto-Api-Riot";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;
app.use((req, res, next) => {
    if (req.session.user) {
        app.locals.id = req.session.user._id;
        app.locals.username = req.session.user.username
        app.locals.summoner = req.session.user.summonerName
        app.locals.isAdmin = req.session.user.role === 'CHALLENGER'
    } else {
        app.locals.id = null;
        app.locals.username = null
        app.locals.summoner = null
        app.locals.isAdmin = null
    }
    next();
})

// app.use((req, res, next) => {
//     if (req.session.user.username ===  || req.session.user.role === CHALLENGER) {
//         app.locals.canView = true
//     } else {
//         app.locals.id = null;
//         app.locals.username = null
//         app.locals.summoner = null
//     }
//     next();
// })
// 👇 Start handling routes here
require("./routes")(app)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

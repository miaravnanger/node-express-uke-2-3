const { Router } = require("express");
const path = require("path");



const rootRouter = new Router();

rootRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "view", "index.html"))
});

rootRouter.get("/new-page.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "view", "new-page.html"))
});

rootRouter.get("/old-page.html", (req, res) => {
    res.redirect(301, "/new-page.html")
});

module.exports = { rootRouter };
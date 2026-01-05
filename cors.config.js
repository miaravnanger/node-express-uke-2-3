const express = require("express");
const { logger } = require("./middleware/logEvents");
const path = require("path");
const cors = require("cors");



const whitelist = ["https://www.minHjemmeside.com", "http://127.0.0.1:5500", "http://localhost:3500"];
const corsOptions = 
{
    origin: (origin, callback) =>
    {
        if(whitelist.indexOf(origin) !== -1 || !origin)
        {
            callback(null, true)
        }
        else
        {
            callback(new Error("Blocked by CORS!"))
        }
    }, optionSuccessStatus: 200
}

function configureCors(app) {
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "/public")));
    app.use(logger);
    app.use(cors(corsOptions));

    app.use(function (feil, req, res, next)
    {
        console.error(feil.stack)
        res.status(500).send(feil.message);
        next();
    });
}

module.exports.configureCors = configureCors;
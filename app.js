const express = require('express');


const app = express();
const bodyParser = require('body-parser');
require("./src/mongoose/connect_db/mongoose");
const sellAndBuyRouter = require('./src/routers/sellAndBuy');

app.use(express.json());

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, DELETE, PATCH");
        return res.status(200).json({})
    }

    next();
})

app.use(sellAndBuyRouter);

module.exports = app;

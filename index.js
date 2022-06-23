require("dotenv").config({ path: './config/dev.env' });

const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);

const port = process.env.PORT;
const router = express.Router();
const base_url = process.env.API_ENDPOINT;

server.listen(port);
app.use(
    bodyParser.json({
        limit: "10mb"
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(base_url, require("./module/auth/routes")(router));

process.on("SIGINT", function () {
    server.close();
    process.exit();
});

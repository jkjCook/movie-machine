var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const mainDB = require('./public/assets/js/main.js');
var HTTP_PORT = process.env.port || 8080;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));

//Route for index
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

mainDB.initialize().then(() => {
    app.listen(HTTP_PORT);
    console.log("App listening on port " + HTTP_PORT);
}).catch((err) => {
    console.log("Could not connect with an error of: " + err);
});


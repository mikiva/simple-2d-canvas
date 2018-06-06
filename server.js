var express = require('express');

var port = 8080;
var path = require('path');

var data = {};

var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/app'));

app.post('/submit', function (req, res) {
    data = req.body.data;
    res.sendStatus(200);
});

app.get('/submit', function (req, res) {
    res.send(data);
});

app.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send("Hello, World!");
});

var server = app.listen(process.env.PORT || port, function () {
    console.log('Server listening at http://' + server.address().address + server.address().port);
});


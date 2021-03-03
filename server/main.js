//IMPORTS
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const storm = require("./storm.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//VARIABLES
const port = 3000;
const clientDir = __dirname + "/Client/";

app.use(express.static(clientDir));

app.get("/stormConnection", (req, res) => {
	res.send(storm.stormMessageRecieved(req).toString());
});

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("message", function (e) {
		storm.webMessageRecieved(e);
	});
});

exports.emitWebMessage = (message) => {
	io.emit("broadcast", message);
};

http.listen(port, function () {
	console.log(`Server listening on port ${port}!`);
});

const socket = io();

let throttle = document.getElementById("throttle")
let steering = document.getElementById("steering")
let brake = document.getElementById("brake")

socket.on("connection", () => {
	socket.send("Hello!");
});

socket.on("broadcast", (message) => {
	console.log(message);

	throttle.value = message.throttle;
    steering.value = message.steering;
    brake.value = message.brake;
});

function buttonPress() {
    let currentData = {
        throttle: throttle.value,
        steering: steering.value,
        brake: brake.value,
    };
	socket.send(currentData);
}

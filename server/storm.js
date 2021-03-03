const main = require("./main.js");

let throttle = 0;
let steering = 0;
let brake = 0;

exports.webMessageRecieved = (message) => {
	throttle = message.throttle;
	steering = message.steering;
	brake = message.brake;

	main.emitWebMessage(message);
};

//Returns respone message
exports.stormMessageRecieved = (req) => {
	switch(req.type){
        case "throttle":
            return throttle;
            break;
        case "steering":
            return steering;
            break;
        case "brake":
            return brake;
        default:
            return 0;
    }
};

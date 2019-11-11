const ros_client = require('./')

var ros = new ros_client('ws://192.168.50.150:9090')
ros.conectToRos(() => {
	ros.getAccData().then(data => console.log(data))
	ros.getGyroData().then(data => console.log(data))
	ros.getMagnData().then(data => console.log(data))
	ros.getPowerState().then(data => console.log(data))
})
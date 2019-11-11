const {
	ipcRenderer,
	remote
} = require('electron')
var ros = remote.getGlobal('ros')

document.ros = ros

ipcRenderer.on('key-event', (event, message) => {
	console.log(event, message)
	if (message.type == 1) {
		var e = new KeyboardEvent('keydown', {
			bubbles: true,
			cancelable: true,
			// key: message.value,
			keyCode: message.value,
			// code: "KeyQ",
			// shiftKey: true
		});
		document.dispatchEvent(e);
		/*
		ros.getMotorEncoder(1).then(value => {
			console.log(value)
		})
		*/
	}
	// document.dispatchEvent(e);

})
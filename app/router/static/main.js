const {
	ipcRenderer
} = require('electron')

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
		// document.dispatchEvent(e);
	}
	document.dispatchEvent(e);
})
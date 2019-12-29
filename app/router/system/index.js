const express = require('express');
const path = require('path');

const router = express.Router();

const ChildProcess = require('child_process');

function checkCameraConnection() {
	return new Promise((resolve, reject) => {
		ChildProcess.exec("vcgencmd get_camera", (error, stdout, stderr) => {
			if (error || stderr) {
				console.error(`error: ${error}`);
				console.error(`stderr: ${stderr}`);
				error && reject(error)
				stderr && reject(stderr)
				return;
			}
			var pattern = /detected=(\d{1})/
			var match = stdout.match(pattern);
			// console.log(match)
			if (match && match[1] == '1') {
				resolve(true)
			} else {
				resolve(true)
			}
		})
	})
}

function startPiDriver() {
	// ChildProcess.exec(`docker restart demo_duck && docker exec -t  demo_duck bash -c "source /demo_duck/env.sh && roslaunch pi_driver pi_driver_node.launch"  > /tmp/duckie.log &`)
	ChildProcess.exec(`docker restart lepi_server && docker exec -t lepi_server bash -c "source env.sh && roslaunch pi_cam camera_lib_node.launch"  > /tmp/duckie.log &`)
}

function startDuckService() {
	ChildProcess.exec(`docker restart lepi_server && docker exec -t lepi_server bash -c "source env.sh && roslaunch pi_cam camera_lib_node.launch"  > /tmp/duckie.log &`)
}
function resetAll() {
	file_name = path.join(__dirname, 'stopMotors.py')
	ChildProcess.exec(`sudo killall lxterminal;python ${file_name}`)
}
router.get('/camera_connected', function(req, res) {
	checkCameraConnection().then(connected => {
		if (connected) {
			console.log('connected')
		} else {
			console.log('not connected')
		}
		res.json({
			connected: connected
		})
	})
})

router.get('/halt', function(req, res) {
	res.json({
		status: 'ok'
	})
	ChildProcess.exec("docker stop demo_duck", () => {
		ChildProcess.exec("sudo halt")
	})
})

router.get('/start_pi_driver', function(req, res) {
	res.json({
		status: 'ok'
	})
	startPiDriver()
})

router.get('/start_duck_service', function(req, res) {
	res.json({
		status: 'ok'
	})
	startDuckService()
})

module.exports = {
	systemRouter: router,
	checkCameraConnection: checkCameraConnection,
	startPiDriver: startPiDriver,
	startDuckService: startDuckService,
	resetAll:resetAll
}

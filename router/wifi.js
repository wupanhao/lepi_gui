const express = require('express');
const Wifi = require('rpi-wifi-connection');
const bodyParser = require('body-parser')

// create application/json parser
const jsonParser = bodyParser.json()

const wifi = new Wifi();

const router = express.Router();

// wpa_cli list_networks -i wlan0
// wpa_cli remove_network -i wlan0 0

router.get('/info', function(req, res) {
	wifi.getStatus().then(info => res.json(info))
})

router.post('/connect', jsonParser, function(req, res) {
	// console.log(req.headers)
	const request = req.body
	request.timeout = 20000
	console.log(req.body)
	if (request.ssid && request.psk) {
		wifi.connect(request).then(() => {
			wifi.getStatus().then(info => {
				// console.log(status)
				info.status = 'OK'
				info.status_code = 1
				res.json(info)
			})

		}).catch((error) => {
			console.log(error);
			res.json({
				status: 'error',
				status_code: 0
			})
		});
	}
})
module.exports = router;
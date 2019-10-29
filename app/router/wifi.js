const express = require('express');
const Wifi = require('rpi-wifi-connection');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

// create application/json parser
const jsonParser = bodyParser.json()

const wifi = new Wifi();

const router = express.Router();

// wpa_cli list_networks -i wlan0
// wpa_cli remove_network -i wlan0 0

router.use('/', express.static(path.join(__dirname, '../wifi')))

router.get('/', (req, res) => {
	var form = fs.readFileSync(path.join(__dirname, '../wifi/index.html'), {
		encoding: 'utf8'
	});
	res.send(form);
})

router.get('/info', function(req, res) {
	wifi.getStatus().then(info => res.json(info))
})

router.post('/connect', jsonParser, function(req, res) {
	// console.log(req.headers)
	const request = req.body
	request.timeout = 20000
	console.log(req.body)
	if (request && request.ssid) {
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
	} else {
		res.json({
			status: 'error',
			status_code: 101
		})
	}
})
module.exports = router;

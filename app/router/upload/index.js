const express = require('express');
const Wifi = require('rpi-wifi-connection');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

// create application/json parser
const jsonParser = bodyParser.json()

const wifi = new Wifi();

const router = express.Router();

const multer = require('multer')
const os = require('os')
const platform = os.platform()
// const temp_dir = os.tmpdir()
var save_dir = '/home/pi/Programs'

if (platform === 'win32') {
	save_dir = path.join(__dirname, 'temp')
}

if (!fs.existsSync(save_dir)) {
	fs.mkdirSync(save_dir);
}

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, save_dir)
	},
	filename: function(req, file, cb) {
		// console.log(file)
		cb(null, Date.now() + '-' + file.originalname)
	}
})

const upload = multer({
	storage: storage
});

// 单文件上传
router.post('/', upload.single('upload_file'), function(req, res, next) {
	var file = req.file;
	// console.log(file)
	res.send({
		ret_code: '0'
	});

	// mainWindow.webContents.send('loadFile', {
	//   path: file.path
	// });

});

// router.use('/program', express.static(path.join(__dirname, 'temp')));

router.get('/', function(req, res, next) {
	var form = fs.readFileSync(path.join(__dirname, 'upload.html'), {
		encoding: 'utf8'
	});
	res.send(form);
});

module.exports = router
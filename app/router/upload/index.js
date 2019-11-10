const express = require('express');
const Wifi = require('rpi-wifi-connection');
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const os = require('os')

const {
	runScratch
} = require('../scratch-runner/index')

const wifi = new Wifi();

const router = express.Router();
const platform = os.platform()

var temp_dir = path.join(__dirname, 'temp')

if (platform === 'linux') {
	temp_dir = os.tmpdir()
}

if (!fs.existsSync(temp_dir)) {
	fs.mkdirSync(temp_dir);
}

// watchFile(temp_dir)

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, temp_dir)
	},
	filename: function(req, file, cb) {
		// console.log(file)
		cb(null, file.originalname)
		// cb(null, Date.now() + '-' + file.originalname)
	}
})

const upload = multer({
	storage: storage
});

// 单文件上传
router.post('/', upload.single('upload_file'), function(req, res, next) {
	var file = req.file;
	console.log(file)
	res.send({
		ret_code: '0'
	});
	runScratch(file.path)
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
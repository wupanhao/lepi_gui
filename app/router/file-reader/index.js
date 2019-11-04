const express = require('express');

const router = express.Router();

const recursive = require("recursive-readdir");

const dir = require('../scratch-runner/index').getProgramDir()

router.get('/', function(req, res) {
	recursive(dir, function(err, files) {
		res.jsonp(files);
	});
})

module.exports = router
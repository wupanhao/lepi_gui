const express = require('express')
const path = require('path');
const axios = require('axios');
const fs = require('fs')
const wifiRouter = require('./router/wifi')
const uploadRouter = require('./router/upload')
const fileRouter = require('./router/file-reader')
/*
const wss = new WebSocket.Server({
  server
});
wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  debuglog('client with ip %s connected.', ip)
  ws.on('close', function() {
    debuglog('client with ip %s disconnected.', ip)
  });

  ws.on('message', function incoming(data) {
    debuglog(data);
    if (!(data && data.type)) {
      ws.send(JSON.stringify(Ret.Fail("data type invalid")))
      return
    }
  });
});
*/

const app = express()
// app.use('/scratch-runner', express.static(path.join(__dirname, 'scratch-runner')));
// app.use('/wifi', express.static(__dirname + '/wifi'));

app.use('/wifi', wifiRouter)
app.use('/upload', uploadRouter)
app.use('/getUrlList', fileRouter)
app.get('/stream_list', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  axios.get('http://localhost:8080/').then(result => {
    // console.log(result)
    // console.log(result.data)
    if (result && result.data) {
      res.send(result.data)
    } else {
      res.send('error')
    }
  })
})

app.use('/static', express.static(path.join(__dirname, '/../build/static')));
app.get('/index', (req, res) => {
  var data = fs.readFileSync(path.join(__dirname, '/../build/index.html'), {
    encoding: 'utf8'
  });
  res.send(data);
})

module.exports = app
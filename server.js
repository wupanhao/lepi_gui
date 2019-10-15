'use strict';

const debuglog = require('util').debuglog('lepi_server')
const {
  createServer
} = require('http');

const WebSocket = require('ws');

const express = require('express')

const wifiRouter = require('./router/wifi')

const exp = express()

const path = require('path');
exp.use(express.static(path.join(__dirname, '/build')));

const server = createServer(exp);
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

/*
app.get('/api', function(req, res) {
  // create user in req.body
  // console.log(req.body)
  res.send('ok')
})

app.all('/api', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

*/
// app.use('/', express.static(__dirname + '/public')); 
exp.use('/wifi', wifiRouter)


const {
  app,
  BrowserWindow,
} = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    width: 240,
    height: 320,
    // autoHideMenuBar: true, //remove menubar but save minimize maxmize controls
    frame: false, //remove menubar and control
    webPreferences: {
      nodeIntegration: true
    }
  })
  // win.loadFile('app.html')
server.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
  win.loadURL('http://localhost:3000/index.html')
});
  // 单文件上传
}

app.on('ready', createWindow)


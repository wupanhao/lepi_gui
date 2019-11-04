'use strict';

const debuglog = require('util').debuglog('lepi_gui')
const {
  createServer
} = require('http');
//const WebSocket = require('ws');
const os = require('os');

const ROSLIB = require('roslib');

const mdns = require('./router/mdns')
var {
  runScratch,
  hideScratchWindow,
  closeScratchWindow
} = require('./router/scratch-runner/index')
const app = require('./server')

function onBtnEvent(message) {
  // console.log('Received message on ' + listener.name + ': ', message);
  console.log(message)
  // listener.unsubscribe();
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
}


function conectToRos() {
  console.log('trying to conect to ros server:')
  this.conectToRos()
  this.listener.unsubscribe();
  try {
    var ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090'
    });
  } catch (e) {
    console.log('ros client init error:', e)
    console.log('trying to reconect after 3 seconds')
    return this.conectToRos()
  }

  var listener = new ROSLIB.Topic({
    ros: ros,
    name: '/ubiquityrobot/pi_driver_node/button_event',
    messageType: 'pi_driver/ButtonEvent'
  });

  ros.on('connection', () => {
    console.log('Connected to websocket server.');
    listener.subscribe(this.onBtnEvent);
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', () => {
    console.log('Connection to websocket server closed.');
    this.conectToRos()
  });

  this.ros = ros
  this.listener = listener
}

app.get('/hide_scratch_window', (req, res) => {
  hideScratchWindow()
  res.send('hide scratch window ok')
})
app.get('/close_scratch_window', (req, res) => {
  closeScratchWindow()
  res.send('close scratch window ok')
})

app.get('/run_scratch', (req, res) => {
  console.log(req.query)
  if (req.query && req.query.file_path) {
    runScratch(req.query.file_path)
  }
  res.json({
    "status": "ok"
  })
})

mdns.start_mdns_server()

const server = createServer(app);

const electron = require('electron')
const BrowserWindow = electron.BrowserWindow

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
  // win.loadFile('../build/index.html')
  // win.loadURL(`file://${__dirname}/scratch-runner/app.html`)
  win.loadURL('http://localhost:3000/index')
  console.log(win)
}

electron.app.on('ready', () => {
  server.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
    createWindow()
    // createScratchWindow()
  });
})
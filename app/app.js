// 'use strict';

// const debuglog = require('util').debuglog('lepi_gui')
const debuglog = console.log
const {
  createServer
} = require('http');
//const WebSocket = require('ws');
const os = require('os');

const mdns = require('./router/mdns')

const env = require('../env')

var {
  runScratch,
  hideScratchWindow,
  closeScratchWindow
} = require('./router/scratch-runner/index')
const app = require('./server')

var mainWindow = null
var scratchWindow = null

const btnState = {

}

function onBtnEvent(message) {
  // console.log('Received message on ' + listener.name + ': ', message);
  // console.log(message)
  // listener.unsubscribe();

  if (message.value && message.type) {
    btnState[message.value] = message.type
  }

  if (mainWindow == null) {
    console.log('mainWindow == null')
    return
  }

  if (mainWindow.focused) {
    mainWindow.webContents.send('key-event', message);
    if (message.value == 82 && scratchWindow != null) {
      console.log('focus scratchWindow')
      scratchWindow.show()
    }
  } else {
    if (message.value == 66) {
      hideScratchWindow()
      mainWindow.focus()
    } else {
      if (scratchWindow != null) {
        // console.log('send to scratchWindow')
        scratchWindow.webContents.send('key-event', message);
      }
    }
  }
}

const RosClient = require('./router/ros')
const ros = new RosClient(env.ros_base_url, onBtnEvent)

app.get('/hide_scratch_window', (req, res) => {
  hideScratchWindow()
  res.send('hide scratch window ok')
  console.log(mainWindow.focused)
  mainWindow.focus()
  console.log(mainWindow.focused)
})
app.get('/close_scratch_window', (req, res) => {
  closeScratchWindow()
  scratchWindow = null
  res.send('close scratch window ok')
  mainWindow.focus()
})

app.get('/run_scratch', (req, res) => {
  console.log(req.query)
  if (req.query && req.query.file_path) {
    if (scratchWindow == null) {
      scratchWindow = runScratch(req.query.file_path)
    } else {
      runScratch(req.query.file_path)
    }
  }
  res.json({
    "status": "ok"
  })
})

const server = createServer(app);

const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut

global.ros = ros

function createWindow() {

  globalShortcut.register('ESC', () => {
    mainWindow.setFullScreen(false);
  })

  mainWindow = new BrowserWindow({
    width: 240,
    height: 320,
    // autoHideMenuBar: true, //remove menubar but save minimize maxmize controls
    frame: false, //remove menubar and control
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.on('blur', () => {
    console.log('mainWindow blured')
    mainWindow.focused = false
  })

  mainWindow.on('focus', () => {
    console.log('mainWindow focused')
    mainWindow.focused = true
  })
  mainWindow.on('show', () => {
    console.log('mainWindow showed')
  })
  // mainWindow.loadFile('../build/index.html')
  // mainWindow.loadURL(`file://${__dirname}/scratch-runner/app.html`)
  // mainWindow.loadURL('http://localhost:8000/index')
  mainWindow.loadURL(env.index_base_url)
  //mainWindow.loadURL('http://localhost:3000')
  mainWindow.setFullScreen(true);
  console.log(mainWindow)
}

if (os.platform() === 'linux') {
  mdns.start_mdns_server()
}

electron.app.on('ready', () => {
  server.listen(8000, () => {
    debuglog('Listening on http://localhost:8000');
    ros.conectToRos(() => {
      console.log('connected to ros')
    })
    createWindow()

    // createScratchWindow()
  });
})
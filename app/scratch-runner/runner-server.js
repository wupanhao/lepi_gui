const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')

/*
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
*/

var mainWindow = null

function createScratchWindow(file_path = null) {
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
  if (file_path) {
    win.loadURL(`file://${__dirname}/app.html?path=${file_path}`)
  } else {
    win.loadURL(`file://${__dirname}/app.html`)
  }
  mainWindow = win
  // win.loadURL('http://localhost:8073/playground/index.html')
}

const fs = require('fs');
const path = require('path')
const os = require('os')
const platform = os.platform()
var temp_dir = os.tmpdir()
var save_dir = '~/Programs'

if (platform === 'win32') {
  save_dir = path.join(__dirname, 'temp')
}

if (!fs.existsSync(save_dir)) {
  fs.mkdirSync(save_dir);
}

fs.watch(save_dir, (event, filename) => {
  var file_path = path.join(save_dir, filename)
  console.log(filename, event, fs.existsSync(file_path))
  if (event == 'rename' && fs.existsSync(file_path)) {
    if (mainWindow != null) {
      mainWindow.webContents.send('loadFile', {
        path: file_path
      });
    } else {
      createScratchWindow()
    }
  }
});


app.on('ready', () => {
  createScratchWindow()
})

// module.exports = server
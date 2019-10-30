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

var scratchWindow = null

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
  scratchWindow = win
  // win.loadURL('http://localhost:8073/playground/index.html')
}

const fs = require('fs');
const path = require('path')
const os = require('os')
const platform = os.platform()
var temp_dir = os.tmpdir()
var save_dir = '/home/pi/Programs'
var active = true
if (platform === 'win32') {
  save_dir = path.join(__dirname, 'temp')
}

if (!fs.existsSync(save_dir)) {
  fs.mkdirSync(save_dir);
}

fs.watch(save_dir, (event, filename) => {
  var file_path = path.join(save_dir, filename)
  console.log(filename, event, fs.existsSync(file_path))
  if (active == true && event == 'rename' ) {

    setTimeout(() => {
      if(fs.existsSync(file_path)){
    active = false
    setTimeout(() => {active = true },1000)        
    if (scratchWindow != null) {
      scratchWindow.webContents.send('loadFile', {
        path: file_path
      });
    } else {
      createScratchWindow(file_path)
    }
      }

    }, 200)

  }
});


app.on('ready', () => {
  createScratchWindow()
})

// module.exports = server
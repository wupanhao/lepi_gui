// const debuglog = require('util').debuglog('scratch-runner')
const debuglog = console.log
const {
  BrowserWindow
} = require('electron')
const fs = require('fs');
const os = require('os')
const path = require('path')
const platform = os.platform()
var save_dir = path.join(__dirname, '/temp')
var active = true

var scratchWindow = null

if (platform === 'linux') {
  save_dir = '/home/pi/Programs'
}

if (!fs.existsSync(save_dir)) {
  fs.mkdirSync(save_dir);
}

function getProgramDir() {
  return save_dir
}

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
    // win.loadURL(`http://localhost:3000/scratch-runner/app.html?path=${file_path}`)
    win.loadURL(`file://${__dirname}/app.html?path=${file_path}`)
  } else {
    // win.loadURL(`http://localhost:3000/scratch-runner/app.html`)
    win.loadURL(`file://${__dirname}/app.html`)
  }
  scratchWindow = win
  // win.loadURL('http://localhost:8073/playground/index.html')
  return win
}

function hideScratchWindow() {
  if (scratchWindow != null) {
    scratchWindow.hide()
  } else {
    console.log('scratchWindow not on')
  }
}

function closeScratchWindow() {
  if (scratchWindow != null) {
    console.log(scratchWindow)
    scratchWindow.close()
    scratchWindow = null
    /*
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
    */
  } else {
    console.log('scratchWindow not on')
  }
}

function runScratch(file_path) {
  if (scratchWindow != null) {
    scratchWindow.show()
    scratchWindow.webContents.send('loadFile', {
      path: file_path
    });
  } else {
    createScratchWindow(file_path)
  }
}

function watchFile(save_dir) {
  if (!fs.existsSync(save_dir)) {
    debuglog('dir ', save_dir, 'do not exist')
    return
  }
  debuglog('watch dir is ', save_dir)
  fs.watch(save_dir, (event, filename) => {
    var file_path = path.join(save_dir, filename)
    console.log(filename, event, fs.existsSync(file_path))
    if (active == true && event == 'rename') {
      setTimeout(() => {
        if (fs.existsSync(file_path)) {
          active = false
          setTimeout(() => {
            active = true
          }, 1000)
          runScratch(file_path)
        }
      }, 200)
    }
  });
}

module.exports = {
  runScratch: runScratch,
  getProgramDir: getProgramDir,
  hideScratchWindow: hideScratchWindow,
  closeScratchWindow: closeScratchWindow,
  watchFile: watchFile
}
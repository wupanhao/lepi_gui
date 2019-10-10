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
  win.loadURL('http://localhost:3000')
  // 单文件上传
}

app.on('ready', createWindow)
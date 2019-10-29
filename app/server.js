'use strict';

const debuglog = require('util').debuglog('lepi_gui')
const {
  createServer
} = require('http');
//const WebSocket = require('ws');
const express = require('express')
const path = require('path');
const os = require('os');
const mdns = require('multicast-dns')()
const axios = require('axios');

const wifiRouter = require('./router/wifi')
const uploadRouter = require('./router/upload')

var scratchWindow = null

function getLocalIps(flagIpv6) {
  var ifaces = os.networkInterfaces();
  // console.log(ifaces)
  var ips = [];
  var func = function(details) {
    if (!flagIpv6 && details.family === 'IPv6') {
      return;
    }
    ips.push(details.address);
  };
  for (var dev in ifaces) {
    if (dev == 'wlan0' || dev == 'eth0') {
      ifaces[dev].forEach(func);
    }
  }
  return ips;
};

console.log('本机ip地址(包括Ipv6):', getLocalIps(true));

const HOSTNAME = 'lepi.local'

mdns.on('query', query => {
  if (query.questions[0] && query.questions[0].name === HOSTNAME) {
    console.log('got a query packet:', query)
    var ips = getLocalIps()
    if (ips.length > 0) {
      mdns.respond({
        answers: ips.map(ip => {
          return {
            name: HOSTNAME,
            type: 'A',
            ttl: 300,
            data: ip
          }
        })
      })
      /*        
          mdns.respond({
            answers: [{
              name: 'lepi-robot',
              type: 'A',
              ttl: 300,
              data: '192.168.1.5',
            }],
          })
      */

    }
  }
})

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
app.use('/scratch-runner', express.static(path.join(__dirname, 'scratch-runner')));
const server = createServer(app);
// app.use('/wifi', express.static(__dirname + '/wifi'));
app.use('/wifi', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use('/wifi', wifiRouter)
app.use('/upload', uploadRouter)

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

app.get('/close_scratch_window', (req, res) => {
  if (scratchWindow != null) {
    console.log(scratchWindow)
    scratchWindow.hide()
    /*
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
    */
  }
  res.send('ok')
})
app.use('/static', express.static(path.join(__dirname, '/../build/static')));
app.get('/index', (req, res) => {
  var data = fs.readFileSync(path.join(__dirname, '/../build/index.html'), {
    encoding: 'utf8'
  });
  res.send(data);
})
/*

app.get('/streamList', function(req, res) {
  // create user in req.body
  // console.log(req.body)
  res.send('ok')
})

app.all('/api', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const {
  app,
  BrowserWindow,
} = require('electron')
*/
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
    win.loadURL(`file://${__dirname}/scratch-runner/app.html?path=${file_path}`)
  } else {
    // win.loadURL(`http://localhost:3000/scratch-runner/app.html`)
    win.loadURL(`file://${__dirname}/scratch-runner/app.html`)
  }
  scratchWindow = win
  // win.loadURL('http://localhost:8073/playground/index.html')
}

const fs = require('fs');
const platform = os.platform()
var temp_dir = os.tmpdir()
var save_dir = '~/Programs'

if (platform === 'win32') {
  save_dir = path.join(__dirname, '/router/upload/temp')
}

if (!fs.existsSync(save_dir)) {
  fs.mkdirSync(save_dir);
}

fs.watch(save_dir, (event, filename) => {
  var file_path = path.join(save_dir, filename)
  console.log(filename, event, fs.existsSync(file_path))
  if (event == 'rename' && fs.existsSync(file_path)) {
    if (scratchWindow != null) {
      scratchWindow.show()
      scratchWindow.webContents.send('loadFile', {
        path: file_path
      });
    } else {
      createScratchWindow(file_path)
    }
  }
});

electron.app.on('ready', () => {
  server.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
    createWindow()
    // createScratchWindow()
  });
})
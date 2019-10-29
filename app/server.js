'use strict';

const debuglog = require('util').debuglog('lepi_server')
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
app.use('/', express.static(path.join(__dirname, '/../build')));
const server = createServer(app);
// app.use('/wifi', express.static(__dirname + '/wifi'));
app.use('/wifi', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use('/wifi', wifiRouter)

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

function createWindow() {
  let win = new electron.BrowserWindow({
    width: 240,
    height: 320,
    // autoHideMenuBar: true, //remove menubar but save minimize maxmize controls
    frame: false, //remove menubar and control
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('http://localhost:3000/index.html')
  // win.loadFile('app.html')
}

server.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
  electron.app.on('ready', createWindow)
});

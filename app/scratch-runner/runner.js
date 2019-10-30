// const VirtualMachine = require('../src')
const VirtualMachine = require('./build/scratch-vm')
const ScratchStorage = require('./build/scratch-storage')
const ScratchRender = require('./build/scratch-render')
const AudioEngine = require('scratch-audio')
const ScratchSVGRenderer = require('./build/scratch-svg-renderer')

const fs = require("fs");
// const parser = require('scratch-parser');

const Scratch = window.Scratch = window.Scratch || {};

// const JSZip = require("jszip")
const JSZipUtils = require("jszip-utils")

class Runner {
  constructor() {
    const vm = new VirtualMachine();
    Scratch.vm = vm
    this.vm = vm
    // vm.setTurboMode(true);
    const storage = new ScratchStorage();
    // var AssetType = storage.AssetType;
    // storage.addWebSource([AssetType.Project], getProjectUrl);
    // storage.addWebSource([AssetType.ImageVector, AssetType.ImageBitmap, AssetType.Sound], getAssetUrl);
    vm.attachStorage(storage);

    vm.on('workspaceUpdate', function() {
      setTimeout(function() {}, 100);
      vm.greenFlag();
    })

    var canvas = document.getElementById('scratch-stage');
    var renderer = new ScratchRender(canvas);
    Scratch.renderer = renderer;
    vm.attachRenderer(renderer);
    var audioEngine = new AudioEngine();
    vm.attachAudioEngine(audioEngine);
    vm.attachV2SVGAdapter(new ScratchSVGRenderer.SVGRenderer());
    vm.attachV2BitmapAdapter(new ScratchSVGRenderer.BitmapAdapter());

    // Feed mouse events as VM I/O events.
    document.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const coordinates = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        canvasWidth: rect.width,
        canvasHeight: rect.height
      };
      Scratch.vm.postIOData('mouse', coordinates);
    });
    canvas.addEventListener('mousedown', e => {
      const rect = canvas.getBoundingClientRect();
      const data = {
        isDown: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        canvasWidth: rect.width,
        canvasHeight: rect.height
      };
      Scratch.vm.postIOData('mouse', data);
      e.preventDefault();
    });
    canvas.addEventListener('mouseup', e => {
      const rect = canvas.getBoundingClientRect();
      const data = {
        isDown: false,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        canvasWidth: rect.width,
        canvasHeight: rect.height
      };
      Scratch.vm.postIOData('mouse', data);
      e.preventDefault();
    });

    // Feed keyboard events as VM I/O events.
    document.addEventListener('keydown', e => {
      // Don't capture keys intended for Blockly inputs.
      if (e.target !== document && e.target !== document.body) {
        return;
      }
      console.log(e)
      Scratch.vm.postIOData('keyboard', {
        key: e.key,
        isDown: true
      });
      /*
      Scratch.vm.postIOData('keyboard', {
        keyCode: e.keyCode,
        isDown: true
      });
      */
      // e.preventDefault();
    });
    document.addEventListener('keyup', e => {
      // Always capture up events,
      // even those that have switched to other targets.
      Scratch.vm.postIOData('keyboard', {
        key: e.key,
        isDown: false
      });
      /*
      Scratch.vm.postIOData('keyboard', {
        keyCode: e.keyCode,
        isDown: false
      });
      */
      // E.g., prevent scroll.
      if (e.target !== document && e.target !== document.body) {
        // e.preventDefault();
      }
    });

    vm.start()
  }
  loadProjectFromFile(path) {
      var buffer = fs.readFileSync(path);
      console.log(buffer)
      this.vm.loadProject(buffer)

    /*
    fs.readFile(path, (err, buffer) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(buffer)
      this.vm.loadProject(buffer)
    })
  */

  }
  loadProjectFromUrl(url) {
    JSZipUtils.getBinaryContent(url, (err, data) => {
      console.log(data)
      this.vm.loadProject(data)
    });
  }
}


function getUrlParam(name) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair.length < 2) {
      return
    }
    if (pair[0] == name) {
      return pair[1];
    }
  }
  return (false);
}

// console.log(getUrlParam('path'))

const runner = new Runner()
// runner.loadProjectFromFile("./2.sb3")
// runner.loadProjectFromUrl('http://localhost:3000/program/2.sb3')

const path = getUrlParam('path')
if (fs.existsSync(path)) {
  runner.loadProjectFromFile(path)
}

const {
  ipcRenderer
} = require('electron')

ipcRenderer.on('loadFile', (event, arg) => {
  console.log(arg) // prints "pong"
  arg && arg.path && runner.loadProjectFromFile(arg.path)
})

ipcRenderer.on('loadUrl', (event, arg) => {
  console.log(arg) // prints "pong"
  arg && arg.path && runner.loadProjectFromUrl(arg.path)
})

/*
ipcRenderer.send('asynchronous-message', 'ping')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
*/
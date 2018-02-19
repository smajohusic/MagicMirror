const electron = require('electron');
const init = require(__dirname + '/../init.js');
const config = require(__dirname + '/../config.js');
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createAppWindow(config) {
  const electronOptionsDefaults = {
    width: 1024,
    height: 768,
    x: 0,
    y: 0,
    darkTheme: true,
    fullscreen: config.electron.fullscreen,
    autoHideMenuBar: config.electron.autoHideMenuBar,
    webPreferences: {
      nodeIntegration: true, // this has to be true, or loading in js files with require will not work
      zoomFactor: config.electron.zoom,
    },
    backgroundColor: "#FFFF",
  };

  console.log(__dirname + '/../../index.html');

  const electronOptions = Object.assign(electronOptionsDefaults, config.electron.options);
  const address = (config.address === void 0) || (config.address === '') ? (config.address = 'localhost') : config.address;

  // Create the browser window.
  mainWindow = new BrowserWindow(electronOptions);
  mainWindow.loadURL(`http://${address}:${config.port}`);

  // Only for debugging
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
app.on("ready", function () {
  console.log("Launching application.");
  createAppWindow(config);
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  createAppWindow(config);
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createAppWindow(config);
  }
});

/* This method will be called when SIGINT is received and will call
 * each node_helper's stop function if it exists. Added to fix #1056
 *
 * Note: this is only used if running Electron. Otherwise
 * init.stop() is called by process.on("SIGINT"... in `app.js`
 */
app.on("before-quit", (event) => {
  console.log("Shutting down server...");
  event.preventDefault();
  setTimeout(() => {
    process.exit(0);
  }, 3000); // Force-quit after 3 seconds.

  init.stop();
  process.exit(0);
});

// Start the init application if server is run on localhost
// This starts all node helpers and starts the webserver.
if (["localhost", "127.0.0.1", "::1", "::ffff:127.0.0.1", undefined].indexOf(config.address) > -1) {
  init.start(function (c) {
    config = c;
  });
}
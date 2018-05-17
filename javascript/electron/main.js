const electron = require('electron');
const init = require(__dirname + '/../init.js');
const config = require(__dirname + '/../config.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createAppWindow(config) {
  const electronOptionsDefaults = {
    width: 1920,
    height: 1080,
    x: 0,
    y: 0,
    darkTheme: true,
    fullscreen: config.electron.fullscreen,
    autoHideMenuBar: config.electron.autoHideMenuBar,
    webPreferences: {
      nodeIntegration: true, // this has to be true, or loading in js files with require will not work
      zoomFactor: config.electron.zoom,
      devTools: config.defaults.debug,
    },
    backgroundColor: "#0000",
  };

  const electronOptions = Object.assign(electronOptionsDefaults, config.electron.options);
  const address = (config.address === void 0) || (config.address === '') ? (config.address = 'localhost') : config.address;

  // Create the browser window.
  mainWindow = new BrowserWindow(electronOptions);
  mainWindow.loadURL(`http://${address}:${config.port}`);

  // Only for debugging
  if (config.defaults.debug) {
    mainWindow.webContents.openDevTools();
  }

  // Reload the electron window every 2 hours
  setInterval(() => {
    mainWindow.reload();
  }, 2000 * 60 * 60); // 2 hours
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

const electron = require("electron");
const url = require("url");
const path = require("path");

const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on("ready", () => {
  // Create new window
  mainWindow = new BrowserWindow({});
  // Load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true
    }));
  // Quit app when extra window is closed
  /*
  mainWindow.on('closed', () => {
    app.quit();
  })

/*
Function for adding new window (not in use)
*/

  const createNewWindow = () => {
    // Creates the new window
    /* 
    addWindow = new BrowserWindow({
        width: 30em,
        height: 20em,
        title: '!type title here!'
    });
        addWindow.loadURL(url.format({
            pathname: path.join(__dirname, '!type the new window html file here!.html'),
            protocol: 'file:',
            slashes: true
        }));
        addWindow.on('close', () => {
          addWindow = null;
        })
   */
  };

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
  // Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemp = [{
  label: "File",
  submenu: [{
    label: "Quit",
    accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
    click() {
      app.quit();
    }
  }]
}];

// If on mac, add empty object to menu
if (process.platform == 'darwin') {
  mainMenuTemp.unshift({});
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemp.push({
    label: 'Developer Tools',
    submenu: [{
        label: 'Toggle DevTools',
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}

// Catching IPC Value: item:add
/*
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close
  console.log(item)
})
*/
const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

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
    })
  );

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
        }))
   */
  };

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
  // Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemp = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

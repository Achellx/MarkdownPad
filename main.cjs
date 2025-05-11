const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#2d2d2d",
    autoHideMenuBar: true,
    icon: __dirname + '/src/assets/icon-md-yellow.png',
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:5173");
}

// const template = [
//   // { role: 'fileMenu' }
//   {
//     label: "File",
//     submenu: [
//       {
//         label: "Export to PDF",
//         accelerator: "CmdOrCtrl+E",
//         click: () => {
//           mainWindow.webContents.send("export-to-pdf");
//         },
//       },
//       { role: "close" },
//     ],
//   },
//   // { role: 'editMenu' }
//   {
//     label: "Edit",
//     submenu: [
//       { role: "undo" },
//       { role: "redo" },
//       { type: "separator" },
//       { role: "cut" },
//       { role: "copy" },
//       { role: "paste" },
//     ],
//   },
//   // { role: 'viewMenu' }
//   {
//     label: "View",
//     submenu: [
//       { role: "reload" },
//       { role: "forceReload" },
//       { role: "toggleDevTools" },
//       { type: "separator" },
//       { role: "resetZoom" },
//       { role: "zoomIn" },
//       { role: "zoomOut" },
//       { type: "separator" },
//       { role: "togglefullscreen" },
//     ],
//   },
//   // { role: 'windowMenu' }
//   {
//     label: "Window",
//     submenu: [
//       { role: "minimize" },
//       { role: "zoom" },
//       { type: "separator" },
//       { role: "front" },
//       { type: "separator" },
//       { role: "window" },
//     ],
//   },
//   {
//     role: "help",
//     submenu: [
//       {
//         label: "Learn More",
//         click: async () => {
//           const { shell } = require("electron");
//           await shell.openExternal("https://electronjs.org");
//         },
//       },
//     ],
//   },
// ];

// const menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

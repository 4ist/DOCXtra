const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const docRunner = require("./doc-runner.ts");
//import {DocRunner} from "./doc-runner.ts";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on("openModal", (event, arg) => {
  const inputFile = "testFiles/file-sample_100kB.docx";
  const outputFile = "output.docx";
  const data = {
    first_name: "John",
    last_name: "Doe",
    phone: "0652455478",
    description: "New Website",
    receiver_first_name: "Jane",
  }; //TODO cast a string as a JS generic object

  //openModal()
  //const runner = new docRunner.DocRunner
  docRunner.replaceDocData(inputFile, outputFile, data);
  //replaceDocData()
});

ipcMain.on("createDocument", (event, arg) => {
  console.log("-createDoc IPC call-");

  const inputFile = arg.sourcePath;
  const outputFile = arg.destinationPath;
  const substitutionData = arg.substitutions;

  console.log("input: ", inputFile);
  console.log("output: ", outputFile);
  console.log("substitution: ", substitutionData);

  docRunner.replaceDocData(inputFile, outputFile, substitutionData);
});

const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;

app.on('ready', () => {
  console.log('hai');
  const w = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  w.loadURL('file://' + __dirname + '/main.html');
});

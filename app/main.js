const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;

app.on('ready', () => {
  console.log('hai');
  const loginWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  const settingWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  // w.loadURL('file://' + __dirname + '/main.html');

  // load localStorage from login window.
  loginWindow.loadURL('file://' + __dirname + '/login.html');

  // if logged in succeeded with saved key
  // -> remove login window. start setting window.
  
  // if loggedin failed or does not exist saved key
  // -> open login form(after login suceeded, save key and start setting window.) 
  // loginWindow.show = true;
});

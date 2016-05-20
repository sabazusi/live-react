import { app, ipcMain, BrowserWindow } from 'electron';

app.on('ready', () => {
  const loginWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  const settingWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  // w.loadURL('file://' + __dirname + '/main.html');

  // load localStorage from login window.
  ipcMain.on('initialLoginKeys', (e, keys) => {
    if (keys.email && keys.password) {
      const sessionKey = _getSessionKey(keys.email, keys.password);
      if (sessionKey) {
        e.sender.send('loginSucceeded', sessionKey);
      } else {
        e.sender.send('loginFailed', 'invalid saved key');
      }
    } else {
      console.log('witness me');
      loginWindow.show();
    }
  });
  loginWindow.loadURL('file://' + __dirname + '/login.html');

  ipcMain.on('login', (e, input) => {
    const sessionKey = _getSessionKey(input.email, input.password);
    if (sessionKey) {
      e.sender.send('loginSucceeded', sessionKey);
    } else {
      e.sender.send('loginFailed', 'invalid input');
    }
  });

  // if logged in succeeded with saved key
  // -> remove login window. start setting window.
  
  // if loggedin failed or does not exist saved key
  // -> open login form(after login suceeded, save key and start setting window.) 
  // loginWindow.show = true;
});

function _getSessionKey(email, password) {
  const loggedIn = false;
  if (loggedIn) {
    return 'sessionKey';
  } else {
    return null;
  }
}

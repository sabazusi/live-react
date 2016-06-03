import { app, ipcMain, BrowserWindow } from 'electron';
import NicoSessionClient from './client/nicosession-client';
import CommunityClient from './client/community-client';

app.on('ready', () => {
  const loginWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  const settingWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });

  // load localStorage from login window.
  ipcMain.on('initialLoginKeys', (e, keys) => {
    if (keys.email && keys.password) {
      _login(keys.email, keys.password, e, 'Login Failed. Please Login.', loginWindow, settingWindow);
    } else {
      loginWindow.show();
    }
  });
  loginWindow.loadURL('file://' + __dirname + '/login.html');
  settingWindow.loadURL('file://' + __dirname + '/setting.html');

  ipcMain.on('login', (e, input) => {
    _login(input.email, input.password, e, 'Invalid Email or Password.', loginWindow, settingWindow);
  });

  ipcMain.on('complete', () => {
    settingWindow.hide();
    app.dock.hide();
  });
});

function _login(email, password, e, failMessage, loginWin, settingWin) {
    NicoSessionClient.login(email, password).then((userSession) => {
      if (userSession) {
        CommunityClient.getCommunites(email, password).then((comunities) => {
            loginWin.hide();
            settingWin.show();
            settingWin.webContents.send('loginSucceeded', {
              email: email,
              password: password
            }, comunities)
          }
        );
      } else {
        loginWin.show();
        e.sender.send('loginFailed', failMessage);
      }
    }).catch((error) => {
      console.log('error in login');
      loginWin.show();
      e.sender.send('loginFailed', failMessage);
    });
}

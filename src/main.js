import { app, ipcMain, BrowserWindow } from 'electron';
import niconico from 'node-nicovideo-api';

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
      _login(input.email, input.password, e, 'Login Failed. Please Login.', loginWindow, settingWindow);
    } else {
      loginWindow.show();
    }
  });
  loginWindow.loadURL('file://' + __dirname + '/login.html');
  settingWindow.loadURL('file://' + __dirname + '/setting.html');

  ipcMain.on('login', (e, input) => {
    _login(input.email, input.password, e, 'Invalid Email or Password.', loginWindow, settingWindow);
  });
});

function _login(email, password, e, failMessage, loginWin, settingWin) {
    niconico.login(email, password).then(({sessionId}) => {
      loginWin.hide();
      settingWin.show();
      e.sender.send('loginSucceeded', {
        email: email,
        password: password,
        sessionId: sessionId
      })
    }).catch((error) => {
      e.sender.send('loginFailed', failMessage);
    });
}

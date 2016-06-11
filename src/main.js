import { app, ipcMain, BrowserWindow, Tray, Menu } from 'electron';
import NicoSessionClient from './client/nicosession-client';
import CommunityClient from './client/community-client';
import LiveAlertClient from './client/livealert-client';

const ICON_FILE_PATH = `${__dirname}/assets/tray.png`;
const LOGIN_TEMPLATE_PATH = `file://${__dirname}/login.html`;
const SETTING_TEMPLATE_PATH = `file://${__dirname}/setting.html`;

let icon = null;
let isLoggedIn = false;
app.on('ready', () => {
  const loginWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  const settingWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });

  icon = new Tray(ICON_FILE_PATH);
  icon.setToolTip('LiveReactor');
  icon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'preference',
      click: () => {if(isLoggedIn) settingWindow.show();}
    },
    {
      label:  'exit',
      click:  () => {app.quit();}
    }
  ]));

  // load localStorage from login window.
  ipcMain.on('initialLoginKeys', (e, keys) => {
    if (keys.email && keys.password) {
      _login(keys.email, keys.password, e, 'Login Failed. Please Login.', loginWindow, settingWindow);
    } else {
      loginWindow.show();
    }
  });
  loginWindow.loadURL(LOGIN_TEMPLATE_PATH);
  settingWindow.loadURL(SETTING_TEMPLATE_PATH);

  ipcMain.on('login', (e, input) => {
    _login(input.email, input.password, e, 'Invalid Email or Password.', loginWindow, settingWindow);
  });

  ipcMain.on('complete', () => {
    settingWindow.hide();
    app.dock.hide();
    CommunityClient.getStream();
  });
});

function _login(email, password, e, failMessage, loginWin, settingWin) {
  CommunityClient.getCommunites(email, password).then((communities) => {
    isLoggedIn = true;
    loginWin.hide();
    settingWin.show();
    settingWin.webContents.send('loginSucceeded', {
      email: email,
      password: password
    }, communities);
  }).catch((error) => {
    loginWin.show();
    e.sender.send('loginFailed', failMessage);
  });
}

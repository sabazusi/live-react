import { app, ipcMain, BrowserWindow, Tray, Menu } from 'electron';
import NicoSessionClient from './client/nicosession-client';
import CommunityClient from './client/community-client';
import LiveAlertClient from './client/livealert-client';

let icon = null;
let isLoggedIn = false;
app.on('ready', () => {
  const loginWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });
  const settingWindow = new BrowserWindow({
    width: 300, height: 300, show: false
  });

  icon = new Tray(`${__dirname}/assets/tray.png`);
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
  loginWindow.loadURL(`file://${__dirname}/login.html`);
  settingWindow.loadURL(`file://${__dirname}/setting.html`);

  ipcMain.on('login', (e, input) => {
    _login(input.email, input.password, e, 'Invalid Email or Password.', loginWindow, settingWindow);
  });

  ipcMain.on('complete', () => {
    settingWindow.hide();
    app.dock.hide();
    LiveAlertClient.getStream().addListener({
      next: i => console.log(i),
      error: e => console.log('e'),
      complete: () => console.log('c')
    });
  });
});

function _login(email, password, e, failMessage, loginWin, settingWin) {
    NicoSessionClient.login(email, password).then((userSession) => {
      if (userSession) {
        isLoggedIn = true;
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

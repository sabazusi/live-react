import { app, ipcMain, shell } from 'electron';
import CommunityClient from './client/community-client';
import { createWindows, setupTray } from './utils/app-settings';

const LOGIN_TEMPLATE_PATH = `file://${__dirname}/login.html`;
const SETTING_TEMPLATE_PATH = `file://${__dirname}/setting.html`;

let isLoggedIn = false;
let stream = null;
let icon;
let notifiedIds = [];

app.on('ready', () => {
  // initialize login/setting windows
  const { loginWindow, settingWindow } = createWindows();

  // initialize tray icon
  icon = setupTray(
    () => { if(isLoggedIn) settingWindow.show(); },
    () => app.quit()
  );

  // onair start notification listener using xstream
  const onairListener = {
    next: targets => {
      if (!targets) return;
      const openableComIds = Object.keys(targets).filter((onairComId) => {
        const targetNotified = notifiedIds[onairComId];
        return !(targetNotified && (targetNotified === targets[onairComId]));
      });

      if (openableComIds) {
        notifiedIds = Object.assign({}, notifiedIds, targets);
        settingWindow.webContents.send('updateNotified', notifiedIds);

        // open
        openableComIds.map((comId) => {
          shell.openExternal(`http://live.nicovideo.jp/watch/lv${notifiedIds[comId]}`);
        });
      }
    },
    error: error => console.log('Error Occured in Stream'),
    complete: () => {}
  };

  // get favorited community list with login
  const getCommunitiesWithLogin = (email, password, renderer, failMessage) => {
    CommunityClient.getCommunites(email, password).then((communities) => {
      isLoggedIn = true;
      loginWindow.hide();
      settingWindow.show();
      settingWindow.webContents.send('loginSucceeded', {
        email: email,
        password: password
      }, communities);
    }).catch((error) => {
      loginWin.show();
      renderer.send('loginFailed', failMessage);
    });
  };


  //======================================================
  // ipc listener settings
  //======================================================

  // load localStorage from login window
  ipcMain.on('initialLoginKeys', (e, keys) => {
    if (keys.email && keys.password) {
      getCommunitiesWithLogin(
        keys.email,
        keys.password,
        e.sender,
        'Login Failed. Please Login.'
      );
    } else {
      loginWindow.show();
    }
  });

  // login with user input email/password
  ipcMain.on('login', (e, input) => {
    getCommunitiesWithLogin(
      input.email,
      input.password,
      e.sender,
      'Invalid Email or Password.'
    );
  });

  ipcMain.on('relogin', () => {
  });

  // start subscribe, and hide app to tray
  ipcMain.on('complete', (e, subscribes, notified, checkInterval) => {
    notifiedIds = notified;
    settingWindow.hide();
    app.dock.hide();
    if(stream && Reflect.has(stream, 'removeListener')) {
      stream.removeListener(onairListener);
    }
    stream = CommunityClient.getStream(checkInterval * 1000, subscribes);
    stream.addListener(onairListener);
  });

  // start app with load template
  settingWindow.loadURL(SETTING_TEMPLATE_PATH);
  loginWindow.loadURL(LOGIN_TEMPLATE_PATH);

});

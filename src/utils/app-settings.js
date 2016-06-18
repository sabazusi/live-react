import { BrowserWindow, Tray, Menu } from 'electron';

const ICON_FILE_PATH = `${__dirname}/../assets/tray.png`;

export const setupTray = (onPreferenceClicked, onExitClicked) => {
  const icon = new Tray(ICON_FILE_PATH);
  icon.setToolTip('LiveReactor');
  icon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'preference',
      click: onPreferenceClicked
    },
    {
      label: 'exit',
      click: onExitClicked
    }
  ]));
  return icon;
}

export const createWindows = () =>
{
  return {
    loginWindow: new BrowserWindow({
      width: 300, height: 150, show: false, resizable: false
    }),

    settingWindow: new BrowserWindow({
      width: 300, height: 300, show: false
    })
  };
};



import { BrowserWindow } from 'electron';

export const createWindows = () =>
{
  return {
    loginWindow: new BrowserWindow({
      width: 300, height: 300, show: false
    }),

    settingWindow: new BrowserWindow({
      width: 300, height: 300, show: false
    })
  };
};

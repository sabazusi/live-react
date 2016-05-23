import { ipcRenderer } from 'electron';
import NicoSessionClient from './client/nicosession-client';

window.onload = () => {
  ipcRenderer.on('loginSucceeded', (e, keys) => {
    localStorage.setItem('login.email', keys.email)
    localStorage.setItem('login.password', keys.password)
  });
};

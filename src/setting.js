import { ipcRenderer } from 'electron';
import AlertClient from './client/alert-client';
import CommunityClient from './client/community-client';

window.onload = () => {
  ipcRenderer.on('loginSucceeded', (e, keys) => {
    localStorage.setItem('login.email', keys.email)
    localStorage.setItem('login.password', keys.password)

    AlertClient.start();
    CommunityClient.getCommunites('');
  });
};

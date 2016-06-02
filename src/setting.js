import { ipcRenderer } from 'electron';
import NicoSessionClient from './client/nicosession-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Setting from './components/setting';
import CommunityStorage from './community-storage';

window.onload = () => {
  ipcRenderer.on('loginSucceeded', (e, keys, communities) => {
    localStorage.setItem('login.email', keys.email)
    localStorage.setItem('login.password', keys.password)

    rendering(communities);
  });
};

function onClickSubscribe() {
  ipcRenderer.send('complete');
}

function rendering(communities) {
  ReactDOM.render(<Setting communities={communities} onClick={onClickSubscribe}/>, document.getElementById('root'))
}

import { ipcRenderer } from 'electron';
import NicoSessionClient from './client/nicosession-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Setting from './components/setting';

window.onload = () => {
  ipcRenderer.on('loginSucceeded', (e, keys) => {
    localStorage.setItem('login.email', keys.email)
    localStorage.setItem('login.password', keys.password)

    NicoSessionClient.getCommunities(keys.email, keys.password)
      .then((communities) => {
        rendering(communities);
      });
    rendering();
  });
};


function rendering(communities=[]) {
  ReactDOM.render(<Setting/>, document.getElementById('root'))
}

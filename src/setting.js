import { ipcRenderer } from 'electron';
import NicoSessionClient from './client/nicosession-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Setting from './components/setting';

window.onload = () => {
  ipcRenderer.on('loginSucceeded', (e, keys) => {
    localStorage.setItem('login.email', keys.email)
    localStorage.setItem('login.password', keys.password)
    rendering();
  });
};


function rendering() {
  ReactDOM.render(<Setting/>, document.getElementById('root'))
}

import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import Setting from './components/setting';

window.onload = () => {
  ipcRenderer.on('loginSucceeded', (e, keys, communities) => {
    localStorage.setItem('login.email', keys.email)
    localStorage.setItem('login.password', keys.password)

    rendering(communities);
  });
};

function onClickSubscribe() {
  const subscribes = localStorage.getItem('community.subscribe');
  if (subscribes.length > 0) {
    ipcRenderer.send('complete', subscribes);
  }
}

function rendering(communities) {
  ReactDOM.render(<Setting communities={communities} onClick={onClickSubscribe}/>, document.getElementById('root'))
}

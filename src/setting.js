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

  ipcRenderer.on('updateNotified', (e, notified) => {
    if (notified) {
      localStorage.setItem('community.notified', JSON.stringify(notified));
    }
  });
};

function onClickSubscribe(checkInterval) {
  const subscribes = localStorage.getItem('community.subscribe');
  if (subscribes.length > 0) {
    const notified = JSON.parse(localStorage.getItem('community.notified')) || [];
    ipcRenderer.send('complete', subscribes, notified, checkInterval);
  }
}

function rendering(communities) {
  ReactDOM.render(<Setting communities={communities} onClick={onClickSubscribe}/>, document.getElementById('root'))
}

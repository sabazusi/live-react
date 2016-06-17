import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import Setting from './components/setting';
import CommunityStorage from './utils/community-storage';

window.onload = () => {
  let email;
  ipcRenderer.on('loginSucceeded', (e, keys, communities) => {
    email = keys.email;
    CommunityStorage.setUserEmail(email);
    localStorage.setItem('login.email', keys.email)
    localStorage.setItem('login.password', keys.password)

    rendering(communities);
  });

  ipcRenderer.on('updateNotified', (e, notified) => {
    if (notified) {
      localStorage.setItem(`community.notified.${email}`, JSON.stringify(notified));
    }
  });
};

function onClickSubscribe(checkInterval) {
  const subscribes = localStorage.getItem(`community.subscribe.${email}`);
  if (subscribes.length > 0) {
    const notified = JSON.parse(localStorage.getItem(`community.notified.${email}`)) || [];
    ipcRenderer.send('complete', subscribes, notified, checkInterval);
  }
}

function onClickRelogin() {
  ipcRenderer.send('relogin');
}

function rendering(communities) {
  ReactDOM.render(<Setting
                    communities={communities}
                    onClickSubscribe={onClickSubscribe}
                    onClickRelogin={onClickRelogin}
                  />, document.getElementById('root'))
}

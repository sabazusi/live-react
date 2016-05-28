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
    CommunityStorage.setCommunities(
      communities.map((com) => {return com.comid;})
    );

    rendering(communities);
  });
};


function rendering(communities) {
  ReactDOM.render(<Setting communities={communities}/>, document.getElementById('root'))
}

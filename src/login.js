import { ipcRenderer } from 'electron';
import notie from 'notie';

window.onload = () => {
  ipcRenderer.send(
    'initialLoginKeys',
    {
      email: localStorage.getItem('login.email'),
      password: localStorage.getItem('login.password')
    }
  );
  ipcRenderer.on('loginFailed', (e, message) => {
    notie.alert(3, message, 3);
    document.getElementById('password').value = '';
  });

  const button = document.getElementById('login');
  button.onclick = (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    ipcRenderer.send('login', {
      email: email,
      password: password
    });
  }
};

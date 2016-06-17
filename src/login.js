import { ipcRenderer } from 'electron';
import notie from 'notie';

window.onload = () => {
  const button = document.getElementById('login');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const init = () => {
    button.disabled = false;
    email.value = '';
    password.value = '';
  };

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
  ipcRenderer.on('init', init);

  button.onclick = (e) => {
    button.disabled = true;
    ipcRenderer.send('login', {
      email: email.value,
      password: password.value
    });
  }

};

import { ipcRenderer } from 'electron';

window.onload = () => {
  ipcRenderer.send(
    'initialLoginKeys',
    {
      email: localStorage.getItem('login.email'),
      password: localStorage.getItem('login.password')
    }
  );
  ipcRenderer.on('loginFailed', (e, message) => {
    alert(message);
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

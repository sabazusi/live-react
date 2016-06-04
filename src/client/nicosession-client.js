import client from 'cheerio-httpcli';

class NicoSessionClient {
  login(email, password) {
    return client.fetch('https://account.nicovideo.jp/login').then((response) => {
      return response.$('form[id=login_form]').submit({mail_tel: email, password: password});
    }).then((result) => {
      // login succeeded if result.cookies.user_session exist.
      this.currentClient = client;
      return result.response.cookies.user_session;
    }).catch((error) => {
      return undefined;
    });
  }
}

export default new NicoSessionClient();
import client from 'cheerio-httpcli';

class CommunityClient {
  getCommunites(session) {
    client.fetch('https://account.nicovideo.jp/login').then((response) => {
      return response.$('form[id=login_form]').submit({mail_tel: '', password: ''});
    }).then((result) => {
      // login succeeded if result.cookies.user_session exist.
    });
  }
}

export default new CommunityClient();

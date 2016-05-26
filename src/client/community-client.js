import client from 'cheerio-httpcli';

class CommunityClient {
  getCommunites(email, password) {
    client.fetch('https://account.nicovideo.jp/login').then((response) => {
      return response.$('form[id=login_form]').submit({mail_tel: email, password: password});
    }).then((result) => {
      // login succeeded if result.cookies.user_session exist.
      if(result.response.cookies.user_session){
        return client.fetch('http://com.nicovideo.jp/community');
      } else {
        throw 'login failed';
      }
    }).then((result) => {
      console.log(result);
    }).catch((e) => {
    });
  }
}

export default new CommunityClient();

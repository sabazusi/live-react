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
      const dom = result.$('div.com_frm');
      const communities =  Object.keys(dom).map((key)=> {
        try {
          const com = dom[`${key}`].children[0].children[0].children[1].children[1].children[0];
          return {title: com.children[0].data, comid: com.attribs.href.replace('/community/', '')};
        } catch(e) {
          return undefined;
        }
      }).filter((e) => {return e != undefined;});
      console.log(communities);
      return communities;
    }).catch((e) => {
      return [];
    });
  }
}

export default new CommunityClient();

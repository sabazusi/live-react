import xml2js from 'xml2js';
import xs from 'xstream';
import request from 'superagent';

class LiveAlertClient {
  start() {
    fetch('http://live.nicovideo.jp/api/getalertinfo')
      .then((response) => {
        return response.text()
      })
      .then((body) => {
        xml2js.parseString(body, (err, result) => {
          const url = result.getalertstatus.ms[0].addr;
          const port = result.getalertstatus.ms[0].port;
          const thread = result.getalertstatus.ms[0].thread;
        });
      });
  }

  _request() {
    return new Promise((resolve, reject) => {
        request.get('http://live.nicovideo.jp/api/getalertinfo')
          .buffer()
          .type('xml')
          .end((error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          });
      });
  }

  getStream() {
    return xs.create({
      id: 0,
      stop: () => {}, // TODO: do anything.
      start: (listener) => {
        ::this._request().then((response) => {
          let serverinfo = {};
          xml2js.parseString(response.text, (err, result) => {
            if (!err) {
              serverinfo =  {
                url: result.getalertstatus.ms[0].addr[0],
                port: result.getalertstatus.ms[0].port[0],
                thread: result.getalertstatus.ms[0].thread[0]
              };
            }
          });
          return serverinfo;
        }).then((serverinfo) => {
          console.log(serverinfo);
        });
      }
    });
  }
}

export default new LiveAlertClient();
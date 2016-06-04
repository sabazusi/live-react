import xml2js from 'xml2js';
import xs from 'xstream';

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

  getStream() {
    return xs.create({
      id: 0,
      stop: () => {}, // TODO: do anything.
      start: (listener) => {
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
            listener.next('alert info.');
          });
      }
    });
  }
}

export default new LiveAlertClient();
import xml2js from 'xml2js';

class AlertClient {
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
}

export default new AlertClient();
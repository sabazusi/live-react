export const parseOnairCommunities = (response, subscribes) => {
  if (response && response.status == 'ok') {
    let result = {};
    response.bookmarkStreams.map((onair) => {
      const liveId = onair.id;
      const comId = onair._communityinfo.thumbnail.replace(/http:\/\/icon.nimg.jp\/community\/\d+\/(co\d+)\.jpg\?\d+$/, '$1');
      return {liveId, comId};
    }).filter((onair) => {
      return subscribes.indexOf(onair.comId) > -1;
    }).map((onair) => {
      result[onair.comId] = onair.liveId;
    });
    return result;
  } else {
    return [];
  }
};
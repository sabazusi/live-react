export const parseOnairCommunities = (response, subscribes) => {
  if (response && response.status == 'ok') {
    response.bookmarkStreams.map((onair) => {
      const id = onair.id;
      const comId = onair._communityinfo.thumbnail.replace(/http:\/\/icon.nimg.jp\/community\/\d+\/(co\d+)\.jpg\?\d+$/, '$1');
      console.log(subscribes);
    });
  } else {
  }
  return [];
};
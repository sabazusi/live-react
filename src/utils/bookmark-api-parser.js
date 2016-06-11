export const parseOnairCommunities = (response, subscribes) => {
  if (response && response.status == 'ok') {
    const onairs = response.bookmarkStreams.map((onair) => {
      const liveId = onair.id;
      const comId = onair._communityinfo.thumbnail.replace(/http:\/\/icon.nimg.jp\/community\/\d+\/(co\d+)\.jpg\?\d+$/, '$1');
      return {liveId, comId};
    });
    console.log(onairs);
  } else {
  }
  return [];
};
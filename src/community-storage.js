class CommunityStorage {
  constructor() {
    self.subscribeCommunities = localStorage.getItem('community.subscribe') || [];
  }

  toggle(comid) {
    if (self.subscribeCommunities.includes(comid)) {
      self.subscribeCommunities.splice(
        self.subscribeCommunities.indexOf(comid), 1
      );
    } else {
      self.subscribeCommunities.push(comid);
    }
    localStorage.setItem('community.subscribe', self.subscribeCommunities);
  }

  getSubscribeCommunities() {
    return self.subscribeCommunities;
  }
}

export default new CommunityStorage();
class CommunityStorage {
  constructor() {
    self.targetCommunities = [
    ];
  }

  // [debug]
  setCommunities(comids) {
    self.targetCommunities = comids;
    console.log(self.targetCommunities);
  }

  toggle(comid) {
    if (self.targetCommunities.includes(comid)) {
      self.targetCommunities.splice(
        self.targetCommunities.indexOf(comid), 1
      );
    } else {
      self.targetCommunities.push(comid);
    }
  }

  getTargetCommunities() {
    return self.targetCommunities;
  }
}

export default new CommunityStorage();
class CommunityStorage {
  constructor() {
    this.email = '';
    this.subscribeCommunities = [];
  }

  toggle(comid) {
    if (!this.email) return;
    if (this.subscribeCommunities.includes(comid)) {
      this.subscribeCommunities.splice(
        this.subscribeCommunities.indexOf(comid), 1
      );
    } else {
      this.subscribeCommunities.push(comid);
    }
    console.log(this.subscribeCommunities);
    localStorage.setItem(`community.subscribe.${this.email}`, this.subscribeCommunities);
  }

  getSubscribeCommunities() {
    return this.subscribeCommunities;
  }

  setUserEmail(email) {
    this.email = email;
    const saved = localStorage.getItem(`community.subscribe.${this.email}`);
    this.subscribeCommunities = [].concat(saved ? saved.split(',') : []);
  }
}

export default new CommunityStorage();
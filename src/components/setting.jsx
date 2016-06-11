import React from 'react';
import CommunityStorage from '../utils/community-storage';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribeList: CommunityStorage.getSubscribeCommunities()
    };
  }

  getStyle(comid) {
    return this.state.subscribeList.includes(comid) ?
      'selected' : 'unselected';
  }

  _onClickCom(e) {
    CommunityStorage.toggle(e.target.id);
    this.setState({
      subscribeList: CommunityStorage.getSubscribeCommunities()
    });
  }

  _onClickOk() {
    this.props.onClick();
  }

  getCommunities() {
    return this.props.communities.map((community, i) => {
      return <div
        key={i}
        id={community.comid}
        className={this.getStyle(community.comid)}
        onClick={this._onClickCom.bind(this)}
      >
        {i+1}:{community.comid} => {community.title}
      </div>
    });
  }
  render() {
    return (
      <div>
        <button onClick={this._onClickOk.bind(this)}>
          Subscribe Start
        </button>
        {this.getCommunities()}
      </div>
    )
  }
}

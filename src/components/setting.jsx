import React from 'react';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
  }

  getStyle(comid) {
    return Math.random() * 100 > 50 ? 'unselected' : 'selected';
  }

  getCommunities() {
    return this.props.communities.map((community) => {
      return <div id={community.comid} className={this.getStyle(community.comid)}>{community.comid} => {community.title}</div>
    });
  }
  render() {
    return (
      <div>
        {this.getCommunities()}
      </div>
    )
  }
}
import React from 'react';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
  }

  getCommunities() {
    return this.props.communities.map((community) => {
      return <div>{community.comid} => {community.title}</div>
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
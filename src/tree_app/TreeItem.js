import React, { Component } from 'react';

class TreeItem extends Component {
  render() {
    const {node} = this.props;

    return (
      <span>
        {node.name}
      </span>
    );
  }
}

export default TreeItem;
    
import React, { Component } from 'react';
import TreeItem from './TreeItem';

class TreeView extends Component {
  render() {
    const data = {
      "id": 1,
      "name": "All Categories",
      "children": [
        {
          "id": 2,
          "name": "For Sale",
          "children": [
            {
              "id": 3,
              "name": "Audio & Stereo"
            },
            {
              "id": 4,
              "name": "Baby & Kids Stuff"
            },
            {
              "id": 5,
              "name": "Music, Films, Books & Games"
            }
          ]
        },
        {
          "id": 6,
          "name": "Motors",
          "children": [
            {
              "id": 7,
              "name": "Car Parts & Accessories"
            },
            {
              "id": 8,
              "name": "Cars"
            },
            {
              "id": 13,
              "name": "Motorbike Parts & Accessories"
            }
          ]
        },
        {
          "id": 9,
          "name": "Jobs",
          "children": [
            {
              "id": 10,
              "name": "Accountancy"
            },
            {
              "id": 11,
              "name": "Financial Services & Insurance"
                    },
            {
              "id": 12,
              "name": "Bar Staff & Management"
            }
          ]
        }
      ]
    };
    
    return (
      <div>
        <h1>This is tree view app</h1>
        <div>{data.name}</div>
        <ul>
          {data.children.map(node => <li key={node.id}><TreeItem node={node} /></li>)}
        </ul>
      </div>    
    )
  }
}

export default TreeView;

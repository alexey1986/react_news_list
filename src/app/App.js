import React from 'react';
import NavBar from '../components/nav/nav.js';
import TreeView from '../tree_app/TreeView.js';
import Articles from '../articles/articles.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './style.scss';

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="root-element">
            <NavBar />
            <Route path='/articles' component={Articles}/>
            <Route path='/tree' component={TreeView}/>
          </div>
        </Router>
    )
  }
}

export default App;

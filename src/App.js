import React, { Component } from 'react';
import './App.css';

class App extends Component {
/* eslint-disable no-undef */

constructor(props) {
  super(props);
  this.state = {url: 'hey'};

  this.getTabUrl = this.getTabUrl.bind(this);
}

getTabUrl = () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true},
  (openTabs) => {
    const activeTab = openTabs[0];
    this.setState({url: activeTab.url});
  });
}
  render() {
    return (
      <div>
        <button onClick={this.getTabUrl}>Show Tab Url</button>
        <p>{this.state.url}</p>
      </div>
    );
  }
}

export default App;

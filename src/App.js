import React, { Component } from 'react';
import './App.css';

class App extends Component {
/* eslint-disable no-undef */

constructor(props) {
  super(props);
  this.state = {  
    tabs: {}
  };
}

componentDidMount() {
  chrome.sessions.getDevices({}, this.createTabList);
}

createTabList = (data) => {
  const tabsByDevice = this.getTabsByDevice(data);
  this.setState ({
    tabs: tabsByDevice
  }, console.log(tabsByDevice))
}

getTabsByDevice = (sessions) => {
  return sessions.map((device) => {
    const sessions = device.sessions;
    const tabs = this.getTabsFromSessions(sessions);
    return {
      name: device.deviceName,
      tabs,
    };
  });
}

getTabsFromSessions = (sessions) => {
  return sessions.reduce((acc, curr) => {
    return [...acc, ...curr.window.tabs];
  }, []);
}

// getSessions = () => {
//   chrome.sessions.getDevices({}, (chromeSessions) => {
//     console.log(chromeSessions);
//   });
// }

  render() {
    return (
      <div>Hi
        {/* <button onClick={this.getSessions}>Log Sessions</button> */}
      </div>
    );
  }
}

export default App;

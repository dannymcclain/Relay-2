import React, { Component } from 'react';
import './App.css';

class App extends Component {
  /* eslint-disable no-undef */

  constructor(props) {
    super(props);
    this.state = {
      deviceTabs: []
    };
  }

  componentDidMount() {
    chrome.sessions.getDevices({}, this.createTabList);
  }

  createTabList = data => {
    const tabsByDevice = this.getTabsByDevice(data);
    this.setState(
      {
        deviceTabs: tabsByDevice
      },
      console.log(tabsByDevice)
    );
  };

  getTabsByDevice = sessions => {
    return sessions.map(device => {
      const sessions = device.sessions;
      const tabs = this.getTabsFromSessions(sessions);
      return {
        name: device.deviceName,
        tabs
      };
    });
  };

  getTabsFromSessions = sessions => {
    return sessions.reduce((acc, curr) => {
      return [...acc, ...curr.window.tabs];
    }, []);
  };

  handleClick(tab, event) {
    event.preventDefault();
    if (event.metaKey) {
      chrome.tabs.create({ url: tab.url, active: false });
      return;
    }
    chrome.tabs.create({ url: tab.url });
  }

  renderTabListItem = tab => {
    return (
      <li>
        <a href={tab.url} onClick={event => this.handleClick(tab, event)}>
          {tab.title}
          <span className="tab-url">{tab.url}</span>
        </a>
      </li>
    );
  };

  render() {
    return (
      <div className="container">
        {this.state.deviceTabs.map(deviceTab => (
          <div className="link-list">
            <h2>{deviceTab.name}</h2>
            <ul>{deviceTab.tabs.map(this.renderTabListItem)}</ul>
          </div>
        ))}
      </div>
    );
  }
}

export default App;

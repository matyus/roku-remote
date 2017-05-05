import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import NavigationMode from './NavigationMode.js';
import KeyboardMode from './KeyboardMode.js';
import Settings from './Settings.js';
import Mobile from './Mobile';

class App extends Component {
  static defaultProps = {
    event: '',
    rokuServerIp: "10.1.202.40",
    rokuServerPort: "8060",
    eventRequest: {
      method: "POST",
      mode: "no-cors"
    }
  }

  state = {
    event: this.props.event
  }

  getRokuUrl() {
    const { rokuServerIp, rokuServerPort } = this.props

    return `http://${rokuServerIp}:${rokuServerPort}/`
  }

  setAppState = (state) => {
    this.setState({ state });
  }

  render() {
    const shared = {
      ...this.props,
      rokuUrl: this.getRokuUrl(),
      rokuServerIp: this.props.rokuServerIp,
      setAppState: this.setAppState
    }

    return (
      <Router>
        <div className="App">
          <header>
            <h1><Link to="/"><i className="fa fa-home fa-lg"></i></Link></h1>

            <nav>
              <Link to="settings"><i className="fa fa-cog fa-lg"></i></Link>
              <Link to="keyboard"><i className="fa fa-keyboard-o fa-lg"></i></Link>
            </nav>
          </header>

          <Route exact path="/" component={(props) => {
            return <NavigationMode {...props} {...shared} />
          }} />

          <Route exact path="/keyboard" component={(props) => {
            return <KeyboardMode {...props} {...shared} />
          }} />

          <Route exact path="/settings" component={(props) => {
            return <Settings {...props} {...shared} />
          }} />

          <Route exact path="/mobile" component={(props) => {
            return <Mobile {...props} {...shared} />
          }} />
        </div>
      </Router>
    );
  }
}

export default App;

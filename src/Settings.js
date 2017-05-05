import React, { Component } from 'react';
import { func, string } from 'prop-types';

import './Settings.css';
import sendEvent from './utils/sendEvent.js';

class Settings extends Component {
  static propTypes = {
    rokuUrl: string,
    rokuServerIp: string,
    setAppState: func
  }

  static defaultProps = {
    rokuServerIp: '0.0.0.0'
  }

  state = {
    rokuServerIp: this.props.rokuServerIp
  }

  handleCommand = (command) => {
    command.preventDefault()

    const { shiftKey, metaKey, ctrlKey, altKey, key, keyCode } = command
    console.log({ shiftKey, metaKey, ctrlKey, altKey, key, keyCode }, command)

    let keyIdentifier = null

    if ( /Escape/.test(key) ) {
      keyIdentifier = "Home"

    } else if ( /Meta|Alt|Option|Shift/.test(key) ) {
      keyIdentifier = null;

    } else if ( /i/.test(key) ) {
      this.props.history.push('/keyboard');

    } else if ( /\?/.test(key) ) {
      this.props.history.push('/');

    }

    if (keyIdentifier) {
      const event = `keypress/${keyIdentifier}`

      sendEvent(`${ this.props.rokuUrl }${ event }`, this.props.eventRequest)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { rokuServerIp } = this.state

    this.props.setAppState({ rokuServerIp });
  }

  handleInputChange = (event) => {
    this.setState({ rokuServerIp: event.target.value });
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleCommand, false)
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleCommand, false)
  }

  render() {
    return (
      <div className="Settings">
        <h2>Settings</h2>

        <table>
          <thead>
            <tr>
              <th>
                Setting
              </th>

              <th>
                Value
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                IP Address
              </td>

              <td>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="rokuServerIp" value={this.state.rokuServerIp} onChange={this.handleInputChange} />
                  <button type="submit" value="update">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                  </button>
                </form>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    )
  }
}

export default Settings;

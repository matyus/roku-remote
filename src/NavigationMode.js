import React, { Component } from 'react';
import { func, string } from 'prop-types';

import './NavigationMode.css';

import sendEvent from './utils/sendEvent.js'

class NavigationMode extends Component {
  static propTypes = {
    rokuUrl: string,
    setAppState: func
  }

  handleCommand = (command) => {
    command.preventDefault()

    const { shiftKey, metaKey, ctrlKey, altKey, key, keyCode } = command
    console.log({ shiftKey, metaKey, ctrlKey, altKey, key, keyCode }, command)

    let keyIdentifier = null

    if ( /Escape/.test(key) ) {
      keyIdentifier = "Back"

    } else if ( /Enter/.test(key) ) {
      keyIdentifier = "Select"

    } else if ( /Arrow/.test(key) ) {
      keyIdentifier = key.split('Arrow')[1].toLowerCase();

    } else if ( /Meta|Alt|Option|Shift/.test(key) ) {
      keyIdentifier = null;

    } else if ( /q|b/.test(key) ) {
      keyIdentifier = "Home"

    } else if ( /h/.test(key) ) {
      keyIdentifier = "left"

    } else if ( /j/.test(key) ) {
      keyIdentifier = "down"

    } else if ( /k/.test(key) ) {
      keyIdentifier = "up"

    } else if ( /l/.test(key) ) {
      keyIdentifier = "right"

    } else if ( /i/.test(key) ) {
      this.props.history.push('/keyboard');

    } else if ( /:/.test(key) ) {
      keyIdentifier = "Info"

    } else if ( /\?/.test(key) ) {
      this.props.history.push('/settings');

    } else if ( key === " " ) {
      keyIdentifier = "Play"

    }

    if (keyIdentifier) {
      const event = `keypress/${keyIdentifier}`

      sendEvent(`${ this.props.rokuUrl }${ event }`, this.props.eventRequest)
    }
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleCommand, false)
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleCommand, false)
  }

  render() {
    return (
      <div className="NavigationMode">
        <h2>Navigation Mode</h2>

        <table>
          <thead>
            <tr>
              <th>
                Key
              </th>

              <th>
                Command
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                &larr;/h
              </td>

              <td>
                Left
              </td>
            </tr>

            <tr>
              <td>
                &uarr;/j
              </td>

              <td>
                Down
              </td>
            </tr>

            <tr>
              <td>
                &darr;/k
              </td>

              <td>
                Up
              </td>
            </tr>

            <tr>
              <td>
                &rarr;/l
              </td>

              <td>
                Right
              </td>
            </tr>

            <tr>
              <td>
                i
              </td>

              <td>
                Keyboard
              </td>
            </tr>

            <tr>
              <td>
                ?
              </td>

              <td>
                Settings
              </td>
            </tr>

            <tr>
              <td>
                q
              </td>

              <td>
                Home
              </td>
            </tr>

            <tr>
              <td>
                esc/b
              </td>

              <td>
                Back
              </td>
            </tr>

            <tr>
              <td>
                Spacebar
              </td>

              <td>
                Play
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    )
  }
}

export default NavigationMode;

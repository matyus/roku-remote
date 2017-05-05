import React, { Component } from 'react';
import { func, string } from 'prop-types';

import './KeyboardMode.css';
import sendEvent from './utils/sendEvent.js';

class KeyboardMode extends Component {
  static propTypes = {
    rokuUrl: string,
    setAppState: func
  }

  handleCommand = (command) => {
    command.preventDefault()

    const { shiftKey, metaKey, ctrlKey, altKey, key, keyCode } = command
    console.log({ shiftKey, metaKey, ctrlKey, altKey, key, keyCode }, command)

    let keyIdentifier = ''

    if ( /Escape/.test(key) ) {
      // Exit Keyboard Mode, return to Navigation mode
      this.props.history.push('/');

    } else if ( /Enter/.test(key) ) {
      keyIdentifier = "Select"

    } else if ( /Backspace/.test(key) ) {
      keyIdentifier = key

    } else if ( /Arrow/.test(key) ) {
      keyIdentifier = key.split('Arrow')[1].toLowerCase();

    } else if ( /Meta|Alt|Option|Shift/.test(key) ) {
      keyIdentifier = null;

    } else if ( /\?/.test(key) ) {
      this.props.history.push('/settings');

    } else if ( /1|2|3|4|5|6|7|8|9|0|q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m/.test(key) ) {
      keyIdentifier = `Lit_${key}`

    } else if (key === " ") {
      keyIdentifier = "Lit_+";

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
      <div className="KeyboardMode">
        <h2>Keyboard enabled</h2>
        <i className="fa fa-keyboard-o fa-5x"></i>
        <p>Press <kbd>esc</kbd> to return to Navigation mode.</p>
      </div>
    )
  }
}

export default KeyboardMode;

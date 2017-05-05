import React, { Component } from 'react';
import { func, string } from 'prop-types';

import './Mobile.css';
import sendEvent from './utils/sendEvent.js';

class Mobile extends Component {
  static propTypes = {
    rokuUrl: string,
    setAppState: func
  }

  handleClick(command, event) {
    event.preventDefault();

    if (command === "keyboard" ) {

      return null;

    } else {

      const keypressCommand = `keypress/${command}`
      sendEvent(`${ this.props.rokuUrl }${ keypressCommand }`, this.props.eventRequest)

    }
  }

  render() {
    return (
      <div className="Mobile">
        <h2>Mobile</h2>

        <div>
          <button className="back" onClick={(event) => { this.handleClick('back', event) }}><i className="fa fa-long-arrow-left fa-lg"></i>Back</button>
          <button className="search" onClick={(event) => { this.handleClick('search', event) }}><i className="fa fa-search fa-lg"></i>Search</button>
          <button className="info" onClick={(event) => { this.handleClick('info', event) }}><i className="fa fa-info-circle fa-lg"></i>Info</button>
          <span className="keyboard" onClick={(event) => { this.handleClick('keyboard', event) }}><i className="fa fa-keyboard-o fa-lg"></i>Type</span>
        </div>

        <hr />

        <div className="controls">
          <button className="up" onClick={(event) => { this.handleClick('up', event) }}><i className="fa fa-caret-up fa-lg"></i></button>
          <button className="left" onClick={(event) => { this.handleClick('left', event) }}><i className="fa fa-caret-left fa-lg"></i></button>
          <button className="select" onClick={(event) => { this.handleClick('select', event) }}><i className="fa fa-dot-circle-o fa-lg"></i></button>
          <button className="right" onClick={(event) => { this.handleClick('right', event) }}><i className="fa fa-caret-right fa-lg"></i></button>
          <button className="down" onClick={(event) => { this.handleClick('down', event) }}><i className="fa fa-caret-down fa-lg"></i></button>
        </div>

        <hr />

        <div>
          <button className="rev" onClick={(event) => { this.handleClick('rev', event) }}><i className="fa fa-backward fa-lg"></i>Rev</button>
          <button className="play" onClick={(event) => { this.handleClick('play', event) }}><i className="fa fa-play fa-lg"></i>Play</button>
          <button className="fwd" onClick={(event) => { this.handleClick('fwd', event) }}><i className="fa fa-forward fa-lg"></i>Fwd</button>
        </div>
      </div>
    )
  }
}

export default Mobile;

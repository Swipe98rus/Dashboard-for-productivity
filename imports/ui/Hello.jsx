import React, { Component } from 'react';

export default class Header extends Component {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div className="header grid-center">
        <div className="logo">
          <h1>Dashboard for productivity</h1>
        </div>
      </div>
    );
  }
}

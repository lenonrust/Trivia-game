import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTime: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  timer = () => {
    const { disable } = this.props;
    const SECONDS = 1000;
    this.countdown = setInterval(() => {
      this.setState((prevState) => ({
        initialTime: prevState.initialTime - 1,
      }), () => {
        const { initialTime } = this.state;
        if (initialTime === 0) {
          clearInterval(this.countdown);
          disable();
        }
      });
    }, SECONDS);
  }

  render() {
    const { initialTime } = this.state;
    return (
      <span>{initialTime}</span>
    );
  }
}

Timer.propTypes = {
  disable: PropTypes.func.isRequired,
};

export default Timer;

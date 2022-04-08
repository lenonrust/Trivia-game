import React, { Component } from 'react';
import PropTypes from 'prop-types';
import borderClock from '../borderClock.png';

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

  componentWillUnmount() {
    clearInterval(this.countdown);
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
      <>
        <img className="border-clock" src={ borderClock } alt="clock-border" />
        <span className="clock" id="clock">{initialTime}</span>
      </>
    );
  }
}

Timer.propTypes = {
  disable: PropTypes.func.isRequired,
};

export default Timer;

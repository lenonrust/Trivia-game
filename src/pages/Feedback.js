import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  feedbackMessage = () => {
    const ASSERTIONS_NUMBER = 3;
    const { assertions } = this.props;
    if (assertions >= ASSERTIONS_NUMBER) {
      return 'Well Done!';
    }
    return 'Could be better...';
  };

  render() {
    return (
      <>
        <Header />
        <div>Feedback</div>
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);

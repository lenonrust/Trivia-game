import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { resetPlayer } from '../actions';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    const dataFromStorage = JSON.parse(localStorage.getItem('ranking'));
    if (dataFromStorage) {
      localStorage.setItem('ranking',
        JSON.stringify([...dataFromStorage, { name, score, picture: `https://www.gravatar.com/avatar/${email}` }]));
    } else {
      localStorage.setItem('ranking',
        JSON.stringify([{ name, score, picture: `https://www.gravatar.com/avatar/${email}` }]));
    }
  }

  feedbackMessage = () => {
    const ASSERTIONS_NUMBER = 3;
    const { assertions } = this.props;
    if (assertions >= ASSERTIONS_NUMBER) {
      return 'Well Done!';
    }
    return 'Could be better...';
  };

  playAgainBtn = () => {
    const { history, restartGame } = this.props;
    history.push('/');
    restartGame();
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <main>
          <h1>Feedback</h1>
          <h2 data-testid="feedback-text">{this.feedbackMessage()}</h2>
          <p>O seu placar total foi de:</p>
          <p data-testid="feedback-total-score">{score}</p>
          <p>Número de questões corretas:</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgainBtn }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
          >
            Ranking
          </button>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  restartGame: () => dispatch(resetPlayer()),
});
Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  restartGame: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

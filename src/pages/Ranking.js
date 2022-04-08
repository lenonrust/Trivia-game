import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPlayer } from '../actions';

class Ranking extends Component {
  onClickLogin = () => {
    const { history, restartGame } = this.props;
    history.push('./');
    restartGame();
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.onClickLogin() }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  restartGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  restartGame: () => dispatch(resetPlayer()),
});

export default connect(null, mapDispatchToProps)(Ranking);

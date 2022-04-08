import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPlayer } from '../actions';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingList: [],
    };
  }

  componentDidMount() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const sortedList = rankingList.sort((a, b) => (b.score - a.score));
    this.setState({ rankingList: sortedList });
  }

  onClickLogin = () => {
    const { history, restartGame } = this.props;
    history.push('./');
    restartGame();
  };

  render() {
    const { rankingList } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingList.map((element, index) => (
          <div key={ index }>
            <img alt="player" src={ element.picture } />
            <span data-testid={ `player-name-${index}` }>{element.name}</span>
            <span data-testid={ `player-score-${index}` }>{element.score}</span>
          </div>
        ))}
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

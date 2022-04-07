import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { user: { gravatarEmail, name, score } } = this.props;
    const email = md5(gravatarEmail).toString();
    return (
      <div>
        <img alt="foto" src={ `https://www.gravatar.com/avatar/${email}` } data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.player,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);

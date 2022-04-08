import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia_night.png';
import { getToken, submitPlayer } from '../actions';
import '../Styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatarEmail: '',
      isDisabled: true,
      name: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.setState({
        isDisabled: true,
      });
      const { name, gravatarEmail } = this.state;
      const MIN_PASS_LENGH = 3;
      const EMAIL_VAL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (name.length >= MIN_PASS_LENGH && gravatarEmail.match(EMAIL_VAL)) {
        this.setState({
          isDisabled: false,
        });
      }
    });
  };

  handleSubmit = async () => {
    const { requestToken, history, user } = this.props;
    user(this.state);
    await requestToken();
    history.push('/game');
  }

  handleConfigsBtn = () => {
    const { history } = this.props;
    history.push('/configuration');
  }

  render() {
    const { name, gravatarEmail, isDisabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form className="form-login">
            <label className="name-label" htmlFor="name-input">
              <span className="login-text">Name</span>
              <input
                type="text"
                id="name-input"
                name="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <label className="email-label" htmlFor="email">
              <span className="login-text">E-mail</span>
              <input
                type="text"
                id="email"
                value={ gravatarEmail }
                name="gravatarEmail"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
            <div className="button-container">
              <button
                className="btn-login"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleSubmit }
                data-testid="btn-play"
              >
                Play
              </button>
              <button
                className="btn-login"
                type="button"
                data-testid="btn-settings"
                onClick={ this.handleConfigsBtn }
              >
                Settings
              </button>
            </div>
          </form>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(submitPlayer(state)),
  requestToken: () => dispatch(getToken()),
});

Login.propTypes = {
  requestToken: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

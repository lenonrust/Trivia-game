import PropTypes from 'prop-types';
import React, { Component } from 'react';
import he from 'he';
import { connect } from 'react-redux';
import { updateScore } from '../actions';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Timer from '../components/Timer';
import '../index.css';

const visibility = 'not-visible';
const btnAnswers = 'btn-answers';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      index: 0,
      isLoading: true,
      correctAnswerClass: btnAnswers,
      wrongAnswerClass: btnAnswers,
      isDisableOption: false,
      btnNextVisible: visibility,
      points: 0,
      timerOn: true,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const { apiToken } = this.props;
    const RESPONSE_CODE = 3;
    let response = await fetch(`https://opentdb.com/api.php?amount=5&token=${apiToken}`);
    let data = await response.json();
    if (data.response_code === RESPONSE_CODE) {
      fetch(`https://opentdb.com/api_token.php?command=reset&token=${apiToken}`);
      response = await fetch(`https://opentdb.com/api.php?amount=5&token=${apiToken}`);
      data = await response.json();
    }
    this.setState({
      questions: data.results,
    }, () => {
      this.setState({
        isLoading: false,
      });
    });
  }

  handleClick = (info, { target }) => {
    const { updateScoreAndAssertion } = this.props;
    //  dataset. retirado de https://gist.github.com/sibelius/bf49eeb2eada00d63b533866cc510556
    if (target.dataset.testid === 'correct-answer') {
      const hard = 3;
      const convertDifficulty = () => {
        switch (info.difficulty) {
        case 'hard':
          return hard;
        case 'medium':
          return 2;
        case 'easy':
          return 1;
        default:
          break;
        }
      };
      const base = 10;
      this.setState({
        correctAnswerClass: 'Green btn-answers',
        wrongAnswerClass: 'Red btn-answers',
        btnNextVisible: 'visible',
        isDisableOption: true,
        points: base + (this.recoverTimeLeft() * convertDifficulty()),
      }, () => {
        const { points } = this.state;
        const exportPoints = { points, assertions: 1 };
        updateScoreAndAssertion(exportPoints);
      });
    }
    this.setState({
      correctAnswerClass: 'Green btn-answers',
      wrongAnswerClass: 'Red btn-answers',
      btnNextVisible: 'visible',
      isDisableOption: true,
    });
  }

  handleOptions = (question) => {
    const { correctAnswerClass, wrongAnswerClass, isDisableOption } = this.state;
    const answers = [...question.incorrect_answers, question.correct_answer];
    // retirado de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // [1,2,3,4,5,6].sort( () => .5 - Math.random() );
    const NUMBER = 0.5;
    const shuffle = answers.sort(() => Math.random() - NUMBER);
    return shuffle.map((btn, index) => (
      <button
        type="button"
        className={ btn === question.correct_answer ? (correctAnswerClass
        ) : (
          wrongAnswerClass) }
        key={ btn }
        data-testid={ btn === question.correct_answer ? ('correct-answer'
        ) : (
          `wrong-answer-${index}`) }
        onClick={ (e) => this.handleClick(question, e) }
        disabled={ isDisableOption }
      >
        {btn}
      </button>));
  }

  disableTimerToButton = () => {
    this.setState({
      isDisableOption: true,
      btnNextVisible: 'visible',
    });
  }

  nextQuestion = () => {
    this.setState({
      timerOn: false,
    });
    const { index, questions } = this.state;
    if (index < (questions.length - 1)) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        btnNextVisible: visibility,
        correctAnswerClass: btnAnswers,
        wrongAnswerClass: btnAnswers,
        isDisableOption: false,
      }), () => {
        this.setState({
          timerOn: true,
          wrongAnswerClass: btnAnswers,
        });
      });
    } else {
      this.setState({
        btnNextVisible: visibility,
        correctAnswerClass: btnAnswers,
        wrongAnswerClass: btnAnswers,
        isDisableOption: false,
      }, () => {
        this.setState({
          timerOn: true,
        });
      });
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  recoverTimeLeft = () => {
    const timer = Number(document.getElementById('clock').innerHTML);
    return timer;
  }

  render() {
    const { questions, isLoading, index,
      btnNextVisible, timerOn } = this.state;
    return (
      <div className="game-container">
        <Header />
        {isLoading ? (<Loading />)
          : (
            <div className="game-section">
              {/* <img src={ cardImg } className="card-img" alt="card-logo" /> */}
              <section className="question-section">
                <div className="card-container">
                  <div className="card-header">
                    <h1
                      className="question"
                    >
                      {`${index + 1} / ${questions.length}`}
                    </h1>
                    <span
                      className="question-catergy"
                      data-testid="question-category"
                    >
                      {questions[index].category}
                    </span>
                    <p
                      className="question-text"
                      data-testid="question-text"
                    >
                      {he.decode(questions[index].question)}
                    </p>
                  </div>
                  <div className="answer-container" data-testid="answer-options">
                    {this.handleOptions(questions[index])}
                  </div>
                </div>
              </section>
              <button
                type="button"
                className={ btnNextVisible }
                onClick={ () => this.nextQuestion() }
                data-testid="btn-next"
              >
                Next
              </button>
              {timerOn && <Timer
                disable={ () => this.disableTimerToButton() }
              />}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiToken: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreAndAssertion: (payload) => dispatch(updateScore(payload)),
});

Game.propTypes = {
  apiToken: PropTypes.string.isRequired,
  updateScoreAndAssertion: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

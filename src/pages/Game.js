import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      index: 0,
      isLoading: true,
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

  handleOptions = (question) => {
    console.log('question', question);
    const answers = [...question.incorrect_answers, question.correct_answer];

    // retirado de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // [1,2,3,4,5,6].sort( () => .5 - Math.random() );

    const NUMBER = 0.5;
    const shuffle = answers.sort(() => Math.random() - NUMBER);
    console.log('shuffle', shuffle);
    return shuffle.map((btn, index) => (
      <button
        type="button"
        key={ btn }
        data-testid={ btn === question.correct_answer ? ('correct-answer'
        ) : (
          `wrong-answer-${index}`) }
      >
        {btn}
      </button>));
  }

  // handleAnswer = () => {
  // console.log('teste');
  // }

  render() {
    const { questions, isLoading, index } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? (<Loading />)
          : (
            <section className="question-section">
              <div>
                <h1 className="question">{`${index} / ${questions.length}`}</h1>
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
                  {questions[index].question}
                </p>
                <div data-testid="answer-options">
                  {this.handleOptions(questions[index])}
                </div>
              </div>
            </section>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiToken: state.token,
});

Game.propTypes = {
  apiToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);

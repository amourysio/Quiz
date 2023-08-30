import React, { Component } from 'react';

class QuizQuestion extends Component {
    render() {
        const { question, currentQuestionIndex, userAnswers, handleAnswerSelect } = this.props;
        const { incorrectAnswers, correctAnswer } = question;

        return (
            <div className="quiz-question">
                <h2>Question {currentQuestionIndex + 1}</h2>
                <h3>{question.question}</h3>
                <ul className="answer-list">
                    {[...incorrectAnswers, correctAnswer].map((answer, index) => (
                        <li key={index}>
                            <button className="answer-button" onClick={() => handleAnswerSelect(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default QuizQuestion;

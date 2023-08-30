import React, { Component } from 'react';

class StartForm extends Component {
    render() {
        const { userName, userEmail, emailError, startQuiz, handleNameChange, handleEmailChange } = this.props;

        return (
            <div className="start-quiz-form">
                <h2 className="start-quiz-title">Welcome to the Quiz!</h2>
                <form onSubmit={startQuiz}>
                    <input
                        className="start-quiz-input"
                        type="text"
                        value={userName}
                        onChange={handleNameChange}
                        placeholder="Enter your name"
                    />
                    <input
                        className="start-quiz-input"
                        type="email"
                        value={userEmail}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                    <button className="start-quiz-button" type="submit">Start Quiz</button>
                </form>
            </div>
        );
    }
}

export default StartForm;

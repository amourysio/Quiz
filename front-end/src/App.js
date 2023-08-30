import React, { Component } from 'react';
import './App.css';
import StartForm from './components/StartForm';
import QuizQuestion from './components/QuizQuestion';
import QuizComplete from './components/QuizComplete';

class App extends Component {
    state = {
        questions: [],
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
        userName: '',
        quizStarted: false,
        emailError: '',
    };

    componentDidMount() {
        fetch('http://localhost:8080/api/v1/questions')
            .then(response => response.json())
            .then(data => {
                const shuffledQuestions = this.shuffleArray(data);
                this.setState({ questions: shuffledQuestions });
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }

    shuffleArray = array => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    handleAnswerSelect = selectedAnswer => {
        const { currentQuestionIndex, userAnswers, questions } = this.state;
        userAnswers[currentQuestionIndex] = selectedAnswer;

        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex >= questions.length) {
            this.calculateScore();
        }

        this.setState({ userAnswers, currentQuestionIndex: nextQuestionIndex });
    };

    calculateScore = () => {
        const { questions, userAnswers } = this.state;
        let score = 0;

        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score++;
            }
        });

        this.setState({ score });
    };

    handleNameChange = event => {
        this.setState({ userName: event.target.value });
    };

    handleEmailChange = event => {
        this.setState({ userEmail: event.target.value });
    };

    startQuiz = event => {
        event.preventDefault();

        const { userName, userEmail } = this.state;

        if (!userName || !userEmail || userName.trim() === '' || userEmail.trim() === '') {
            this.setState({ emailError: 'Name and email cannot be empty.' });
        } else {
            this.setState({ quizStarted: true, emailError: '' });
        }
    };

    render() {
        const { userName, userEmail, quizStarted, questions, currentQuestionIndex, userAnswers, score, emailError } = this.state;

        return (
            <div className="quiz-container">
                {!quizStarted ? (
                    <StartForm
                        userName={userName}
                        userEmail={userEmail}
                        emailError={emailError}
                        startQuiz={this.startQuiz}
                        handleNameChange={this.handleNameChange}
                        handleEmailChange={this.handleEmailChange}
                    />
                ) : currentQuestionIndex < questions.length ? (
                    <QuizQuestion
                        question={questions[currentQuestionIndex]}
                        currentQuestionIndex={currentQuestionIndex}
                        userAnswers={userAnswers}
                        handleAnswerSelect={this.handleAnswerSelect}
                    />
                ) : (
                    <QuizComplete
                        userName={userName}
                        score={score}
                        questionsLength={questions.length}
                    />
                )}
            </div>
        );
    }
}

export default App;

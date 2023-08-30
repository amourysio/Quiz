import React, { Component } from 'react';

class QuizComplete extends Component {
    render() {
        const { userName, score, questionsLength } = this.props;
        const percentage = (score / questionsLength) * 100;
        let userGrade = 'Unknown';

        if (percentage >= 90) {
            userGrade = 'A';
        } else if (percentage >= 80) {
            userGrade = 'B';
        } else if (percentage >= 70) {
            userGrade = 'C';
        } else if (percentage >= 60) {
            userGrade = 'D';
        } else {
            userGrade = 'F';
        }

        return (
            <div className="quiz-complete">
                <p className="congrats-message">Congratulations, {userName}!</p>
                <p className="final-score">Your Final Score: {score} / {questionsLength}</p>
                <p className="grade">Grade: {userGrade}</p>
                {/* Move the percentage below other elements */}
                <p className="percentage">Your complete of: {percentage.toFixed(2)}%</p>
            </div>
        );
    }
}

export default QuizComplete;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
  const [timerActive, setTimerActive] = useState(true);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correctAnswer: "JavaScript",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Text Makeup Language",
      ],
      correctAnswer: "Hyper Text Markup Language",
    },
    {
      question: "Which of these is a JavaScript framework?",
      options: ["React", "Django", "Flask", "Laravel"],
      correctAnswer: "React",
    },
  ];

  // Timer logic
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showScore) {
      handleNextQuestion(); // Auto-skip when time runs out
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setTimerActive(false); // Stop timer after answering
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setTimeLeft(10); // Reset timer
      setTimerActive(true); // Restart timer
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setTimeLeft(10);
    setTimerActive(true);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} out of {questions.length}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <div className="timer">
            ⏱️ Time Left: <span>{timeLeft}s</span>
          </div>
          <h2>Question {currentQuestion + 1}/{questions.length}</h2>
          <p>{questions[currentQuestion].question}</p>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={selectedAnswer === option ? "selected" : ""}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <button 
            onClick={handleNextQuestion} 
            disabled={!selectedAnswer && timeLeft > 0}
          >
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
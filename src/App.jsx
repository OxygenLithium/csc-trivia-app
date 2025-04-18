// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import AudioPlayer from './components/audioPlayer';
import VideoPlayer from './components/videoPlayer';
import questionData from './questions.json';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(answeredQuestions.length+1);
  const [gameState, setGameState] = useState("welcome");
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayAnswer, setDisplayAnswer] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const localStoragePlayedQuestions = localStorage.getItem('playedQuestions');
        const playedQuestions = localStoragePlayedQuestions ? JSON.parse(localStoragePlayedQuestions) : [];
        let filteredQuestionData = questionData;
        if (playedQuestions) {
          filteredQuestionData = questionData.filter(
            (question) => !playedQuestions.includes(question.id)
          );
        }
        setQuestions(filteredQuestionData);
        console.log(filteredQuestionData);
        console.log(playedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (questions.length === 0) fetchQuestions();
  }, []);

  const getRandomQuestion = () => {
    setGameState("playing");
    setDisplayQuestion(false);
    setDisplayAnswer(false);
    const remainingQuestions = questions.filter(
      (question) => !answeredQuestions.includes(question.id)
    );

    if (remainingQuestions.length === 0) {
      setCurrentQuestion(null);
      setQuestions([]);
      setGameState("gameOver");
    } else {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const randomQuestion = remainingQuestions[randomIndex];
      setCurrentQuestion(randomQuestion);
    }
  };

  const updateQuestionNumber = () => {
    setQuestionNumber(answeredQuestions.length+1);
  }

  const removeQuestion = () => {
    setDisplayQuestion(true);
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
    const localStoragePlayedQuestions = localStorage.getItem('playedQuestions');
    const playedQuestions = localStoragePlayedQuestions ? JSON.parse(localStoragePlayedQuestions) : [];
    localStorage.setItem(
      'playedQuestions',
      JSON.stringify(playedQuestions ? [...playedQuestions, currentQuestion.id] : [currentQuestion.id])
    );
  };

  const resetGame = () => {
    setCurrentQuestion(null);
    setAnsweredQuestions([]);
    localStorage.setItem('playedQuestions', '');
    setGameState("welcome");
    setDisplayQuestion(false);
    setDisplayAnswer(false);
    window.location.reload();
  };

  let content;
  switch (gameState) {
    case "welcome":
      content = (
        <>
          <h1 className="app-title">CSC Trivia Night</h1>
          <div className="welcome">
            <h2 className="question-number">Welcome!</h2>
            <br />
            <button className="start-button" onClick={getRandomQuestion}>
              Start Game
            </button>
            <br />
            <br />
            <button className="play-again-button" onClick={resetGame}>
              Reset
            </button>
          </div>
        </>);
      break;

    case "playing":
      content = (<div className="question-container">
        <div className="absolute right-10 top-10" style={{fontSize:"12px"}}>
          <h1>{`Question ID: ${currentQuestion.id}`}</h1>
          <h1>{`${questionNumber}/${questions.length}`}</h1>
        </div>
        <h1 className="app-title">CSC Trivia Night</h1>
        <p className="question-number">Question Number {questionNumber}</p>
        <p className="category">Category: {currentQuestion.category}</p>
        {(displayQuestion ? 
          (<div className="flex flex-col items-center w-full">
            <p className="question-text">{currentQuestion.question}</p>
            {(currentQuestion.img !== "N/A") ? <img className="question-image" src={"./images/"+currentQuestion.img} alt="Question Image" /> : null}
            {(currentQuestion.audio !== "N/A") ? <AudioPlayer class="mx-auto" currentQuestion={currentQuestion} /> : null}
            {(currentQuestion.video !== "N/A") ? <VideoPlayer class="mx-auto" currentQuestion={currentQuestion} /> : null}
          </div>)
          : null)}
        {(displayAnswer ? <p className="answer-text">{currentQuestion.answer}</p> : null)}
        <br />
        {(displayAnswer ? <button className="next-button"
          onClick={() => { getRandomQuestion(); updateQuestionNumber()}}>Next Question</button> :
          (displayQuestion ? <button className="next-button" onClick={() => setDisplayAnswer(true)}>Show Answer</button> :
            <button className="next-button" onClick={() => removeQuestion()}>Show Question</button>))}
      </div>);
      break;

    case "gameOver":
      content = (<div className="welcome">
        <h2 className="out-of-questions">Out of Questions!</h2>
        <button className="play-again-button" onClick={resetGame}>
          Reset Pool?
        </button>
      </div>);
      break;
  }

  return (
    <div className="app relative">
      {content}
      <div className="absolute left-10 bottom-10">
        <img
          src="../src/app-images/csc-logo.png"
          width="100"
          alt="CSC Logo"
        />
      </div>
      <div className="absolute right-0 bottom-2">
        <img
          src="../src/app-images/codey.png"
          width="160"
          alt="Codey"
        />
      </div>
    </div>
  );
};

export default App;

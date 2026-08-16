import { useState } from "react";

import Quiz from "./Components/Quiz";

import "./index.css";


function App() {

  const [started, setStarted] =
    useState(false);


  if (started) {

    return (
      <div className="app">
        <Quiz />
      </div>
    );

  }


  return (

    <div className="app">

      <div className="quiz-card">

        <div className="quiz-icon">
          🧠
        </div>

        <h1>
          Quiz Master
        </h1>

        <p className="subtitle">
          Test your knowledge and
          challenge yourself!
        </p>


        <div className="quiz-info">

          <div className="info-box">
            <span>📚</span>
            <h3>10</h3>
            <p>Questions</p>
          </div>

          <div className="info-box">
            <span>⏱️</span>
            <h3>10</h3>
            <p>Minutes</p>
          </div>

          <div className="info-box">
            <span>🏆</span>
            <h3>10</h3>
            <p>Points</p>
          </div>

        </div>


        <button
          className="start-btn"
          onClick={() => setStarted(true)}
        >
          Start Quiz →
        </button>

      </div>

    </div>

  );
}

export default App;

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Questionaire from "./components/Questionaire";
import Home from "./components/Home";

import { questions } from "./data.js";

const userAnswersArray = [];

// Shuffle the questions
questions.sort(() => Math.random() - 0.5);

export default function App() {
  const sleep = (m = 2000) => new Promise((r) => setTimeout(r, m));

  const [displayLoading, setDisplayLoading] = useState(false);

  const emptyArray = () => (userAnswersArray.length = 0);
  const shuffleQuestions = () => questions.sort(() => Math.random() - 0.5);
  const pushToAnswers = (load) => userAnswersArray.push(load);
  
  const loadScene = async () => {
    setDisplayLoading(true);
    await sleep(Math.random() * (1500 - 700) + 700);
    setDisplayLoading(false);
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              shuffleQuestions={shuffleQuestions}
              emptyArray={emptyArray}
              loadingScene={{
                loadScene,
                displayLoading,
              }}
            />
          }
        />
        <Route
          path="/quizz"
          element={
            <Questionaire
              questions={questions}
              pushToAnswers={pushToAnswers}
              userAnswersArray={userAnswersArray}
              loadingScene={{
                loadScene,
                displayLoading,
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

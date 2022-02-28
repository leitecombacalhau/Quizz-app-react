import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Questionaire from "./components/Questionaire";
import Home from "./components/Home";

import { questions } from "./data.js";

// Shuffle the questions
questions.sort(() => Math.random() - 0.5);

export default function App() {
  const sleep = (m = 2000) => new Promise((r) => setTimeout(r, m));

  const [displayLoading, setDisplayLoading] = useState(false);

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

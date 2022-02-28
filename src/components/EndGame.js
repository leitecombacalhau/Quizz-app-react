import React, { useState } from "react";

import Recap from "./Recap";

import { useNavigate } from "react-router-dom";

export default function EndGame({
  questions,
  setEndGame,
  userAnswersArray,
  emptyArray,
  shuffleQuestions,
}) {
  const navigate = useNavigate();

  const [showRecap, setShowRecap] = useState(false);

  const handleReturnHome = () => {
    setEndGame(false);
    shuffleQuestions();
    emptyArray();
    navigate("/");
  };

  const handleRecap = () => setShowRecap(true);

  return showRecap ? (
    <Recap
      questions={questions}
      userAnswersArray={userAnswersArray}
      handleReturnHome={handleReturnHome}
    />
  ) : (
    <div className="grid grid-cols-6 gap-7">
      <div className="col-start-2 col-end-6 bg-white text-purple-800 p-10 rounded-lg shadow-2xl text-center">
        <h1 className="text-6xl">{`Acertaste ${
          userAnswersArray.filter((answer) => answer.isCorrect).length
        } em ${userAnswersArray.length} perguntas!`}</h1>
      </div>
      <div className="col-start-1 col-end-4">
        <button
          className="bg-white p-8 w-full text-purple-800 font-semibold text-xl rounded-lg shadow active:translate-y-0.5 hover:bg-slate-200"
          onClick={handleReturnHome}
        >
          Voltar à página inicial
        </button>
      </div>
      <div className="col-start-4 col-end-8">
        <button
          className="bg-white p-8 w-full text-purple-800 font-semibold text-xl rounded-lg shadow active:translate-y-0.5 hover:bg-slate-200"
          onClick={handleRecap}
        >
          Sumário
        </button>
      </div>
    </div>
  );
}

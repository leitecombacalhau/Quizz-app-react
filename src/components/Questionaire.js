import React, { useState } from "react";

import Loading from "./Loading";
import EndGame from "./EndGame";

import { Howl } from "howler";

let userAnswersArray = [];

let sounds = {
  correct: new Howl({
    src: ["https://freesound.org/data/previews/171/171671_2437358-lq.mp3"],
    html5: true,
  }),
  incorrect: new Howl({
    src: ["https://freesound.org/data/previews/171/171673_2437358-lq.mp3"],
    html5: true,
  }),
};

export default function Question({
  questions,
  loadingScene: { loadScene: loadSceneImported, displayLoading },
}) {
  const loadScene = () => {
    for (const sound in sounds) {
      sounds[sound].stop();
    }
    loadSceneImported();
  };

  const buttonsClass = {
    DEFAULTBUTTON:
      "bg-white p-4 text-purple-800 font-semibold rounded shadow active:translate-y-0.5 hover:bg-slate-200",
    GREENBUTTON:
      "bg-green-500 p-4 text-purple-800 font-semibold rounded shadow",
    REDBUTTON: "bg-red-500 p-4 text-purple-800 font-semibold rounded shadow",
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [postClickButtons, setPostClickButtons] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [endGame, setEndGame] = useState(false);

  let answersShown = true;

  const { question, answers, correctAnswers } = questions[currentQuestionIndex];

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      loadScene();
      return setEndGame(true);
    } else {
      loadScene();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setButtonDisabled(false);
      setPostClickButtons(false);
      document
        .getElementsByName("answer")
        .forEach(
          (answerButton) =>
            (answerButton.className = buttonsClass.DEFAULTBUTTON)
        );
    }
  };

  const showAnswers = () => {
    if (answersShown) {
      if (
        correctAnswers.includes(
          document.getElementsByName("chosenAnswer")[0].innerText
        )
      ) {
        sounds.correct.play();
      } else {
        sounds.incorrect.play();
      }
      answersShown = false;
      document.getElementsByName("answer").forEach((answerButton) => {
        answerButton.className += correctAnswers.includes(
          answerButton.innerText
        )
          ? " text-green-500"
          : " text-red-500";
      });
      document.getElementsByName("chosenAnswer").forEach((answerButton) => {
        answerButton.className += correctAnswers.includes(
          answerButton.innerText
        )
          ? " text-green-500"
          : " text-red-500";
      });
    } else {
      answersShown = true;
      document
        .getElementsByName("answer")
        .forEach(
          (answerButton) => (answerButton.className += "text-purple-800")
        );
      document
        .getElementsByName("chosenAnswer")
        .forEach(
          (answerButton) => (answerButton.className += "text-purple-800")
        );
    }
  };

  const handleAnswer = (answer, id) => {
    let chosenAnswer = document.getElementById(id);
    chosenAnswer.className += " bg-purple-800 text-white hover:bg-purple-900";
    chosenAnswer.setAttribute("name", "chosenAnswer");
    userAnswersArray.push({
      answer,
      _id: id,
      isCorrect: correctAnswers.includes(answer),
    });
    setButtonDisabled(true);
    setPostClickButtons(true);
  };

  return (
    <>
      {displayLoading ? (
        <Loading />
      ) : endGame ? (
        <EndGame
          questions={questions}
          setEndGame={setEndGame}
          userAnswersArray={userAnswersArray}
          emptyArray={() => (userAnswersArray = [])}
          shuffleQuestions={() => questions.sort(() => Math.random() - 0.5)}
        />
      ) : (
        <div className="flex flex-col">
          <div className="bg-white text-purple-800 p-10 rounded-lg shadow-md">
            <h2
              className="text-2xl"
              dangerouslySetInnerHTML={{ __html: `${question}` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            {answers.map((answer, id) => {
              return (
                <button
                  id={id}
                  name={"answer"}
                  className={buttonsClass.DEFAULTBUTTON}
                  disabled={buttonDisabled}
                  onClick={() => handleAnswer(answer, id)}
                >
                  {answer}
                </button>
              );
            })}
            {postClickButtons && (
              <button
                className="col-start-1 bg-purple-700 text-white p-4 font-semibold rounded shadow mt-6 active:translate-y-0.5"
                onClick={showAnswers}
              >
                Mostar Respostas
              </button>
            )}
            {postClickButtons && (
              <button
                className="col-start-2 bg-purple-700 text-white p-4 font-semibold rounded shadow mt-6 active:translate-y-0.5"
                onClick={nextQuestion}
              >
                Próxima Pergunta
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

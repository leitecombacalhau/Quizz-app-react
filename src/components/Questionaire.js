import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Loading from "./Loading";

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

// ENDGAME e ShowRecap set to true !!

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

  const [endGame, setEndGame] = useState(true);

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
        <EndGame questions={questions} setEndGame={setEndGame} />
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

function EndGame({ questions, setEndGame }) {
  const navigate = useNavigate();

  const [showRecap, setShowRecap] = useState(true);

  const handleReturnHome = () => {
    setEndGame(false);
    questions.sort(() => Math.random() - 0.5);
    userAnswersArray = [];
    navigate("/");
  };

  const handleRecap = () => setShowRecap(true);

  return showRecap ? (
    <Recap questions={questions} />
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

function Recap(/*{ questions } */) {
  //   0: {answer: 'Kiev', _id: 0, isCorrect: false}
  //   1: {answer: 'Steve Jobs', _id: 7, isCorrect: false}
  //   2: {answer: 'Nelson Mandela', _id: 3, isCorrect: false}
  //   3: {answer: '11', _id: 5, isCorrect: false}
  //   4: {answer: '7', _id: 3, isCorrect: false}
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const testeArray = [
    { answer: "Kiev", _id: 7, isCorrect: false },
    { answer: "Elon Musk", _id: 5, isCorrect: true },
    { answer: "Trump", _id: 3, isCorrect: false },
    { answer: "4", _id: 0, isCorrect: true },
    { answer: "7", _id: 3, isCorrect: true },
  ];
  const questions = [
    {
      _id: 1,
      question: "Qual é a capital da <strong>Rússia</strong>?",
      answers: ["Kiev", "Moscow", "Moscovo", "Minsk", "Kremlin", "Kie"],
      correctAnswers: ["Moscow", "Moscovo"],
    },
    {
      _id: 2,
      question: "Quem é o CEO da <strong>Tesla</strong>?",
      answers: [
        "Warren Buffett",
        "Tim Cook",
        "Mark Zuckerberg",
        "Elon Musk",
        "Jeff Bezos",
        "Linus Torvalds",
        "Bill Gates",
        "Steve Jobs",
      ],
      correctAnswers: ["Elon Musk"],
    },
    {
      _id: 3,
      question: "Quem é o presidente dos <strong>Estados Unidos</strong>?",
      answers: ["Joe Biden", "Biden", "Trump", "Nelson Mandela"],
      correctAnswers: ["Biden", "Joe Biden"],
    },
    {
      _id: 4,
      question: "Quanto é <strong>4+4</strong>?",
      answers: ["8", "44", "19", "7"],
      correctAnswers: ["8"],
    },
    {
      _id: 5,
      question: "Quantos livros do <strong>Harry Poter</strong> existem?",
      answers: ["7", "6", "5", "3", "10", "11"],
      correctAnswers: ["7"],
    },
  ];

  return (
    <div className="grid grid-rows-4 grid-flow-col gap-4">
      <div
        dangerouslySetInnerHTML={{
          __html: `${currentQuestionIndex + 1}. ${
            questions[currentQuestionIndex].question
          }`,
        }}
      ></div>
      <div>{`${testeArray[currentQuestionIndex].answer}`}</div>
      <div>
        {`${testeArray[currentQuestionIndex].isCorrect ? "Correto" : "Errado"}`}
      </div>
      <div>
        Respostas corretas:{" "}
        {questions[currentQuestionIndex].correctAnswers.join(" & ")}
      </div>
      <button
        className="row-start-5 bg-purple-700 text-white p-4 font-semibold rounded shadow mt-6 active:translate-y-0.5"
        onClick={() =>
          setCurrentQuestionIndex(
            currentQuestionIndex === questions.length - 1
              ? 0
              : currentQuestionIndex + 1
          )
        }
      >
        Próxima Pergunta
      </button>
    </div>
  );
}

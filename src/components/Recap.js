import React, { useState } from "react";

export default function Recap({
  questions,
  userAnswersArray,
  handleReturnHome,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showReturnHomeButton, setShowReturnHomeButton] = useState(false);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex < questions.length - 1 ? currentQuestionIndex + 1 : 0
    );
    if (currentQuestionIndex === questions.length - 2)
      return setShowReturnHomeButton(true);
  };

  const otherCorrectAnswers = questions[
    currentQuestionIndex
  ].correctAnswers.filter(
    (correctAnswer) =>
      correctAnswer !== userAnswersArray[currentQuestionIndex].answer
  );

  return (
    <div
      className={`grid grid-rows-${
        otherCorrectAnswers.length > 0 ? 4 : 2
      } gap-7`}
    >
      <div
        className="bg-white text-purple-800 p-8 rounded-lg shadow-2xl text-center text-2xl"
        dangerouslySetInnerHTML={{
          __html: `${currentQuestionIndex + 1}. ${
            questions[currentQuestionIndex].question
          }`,
        }}
      ></div>
      <div
        className={`${
          userAnswersArray[currentQuestionIndex].isCorrect
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        } text-purple-800 font-semibold rounded-xl shadow text-center select-none cursor-pointer p-8 text-lg`}
      >{`${userAnswersArray[currentQuestionIndex].answer}`}</div>
      {otherCorrectAnswers.length > 0 && (
        <>
          {" "}
          <div className="bg-white text-purple-800 p-8 rounded-lg shadow-2xl text-center text-2xl">
            {`${
              userAnswersArray[currentQuestionIndex].isCorrect
                ? "Outras r"
                : "R"
            }espostas corretas:`}
          </div>
          <div className="bg-green-500 hover:bg-green-600 text-purple-800 font-semibold rounded-xl shadow text-center select-none cursor-pointer p-8 text-lg">
            {otherCorrectAnswers.join(" & ")}
          </div>
        </>
      )}
      {showReturnHomeButton ? (
        <button
          className="bg-white p-8 w-full text-purple-800 font-semibold text-xl rounded-lg shadow active:translate-y-0.5 hover:bg-slate-200"
          onClick={handleReturnHome}
        >
          Voltar à página inicial
        </button>
      ) : (
        <button
          className="bg-purple-700 text-white p-4 font-semibold rounded shadow mt-6 active:translate-y-0.5 hover:bg-purple-800"
          onClick={handleNextQuestion}
        >
          Próxima Pergunta
        </button>
      )}
    </div>
  );
}

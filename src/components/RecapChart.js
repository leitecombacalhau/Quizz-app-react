import React from "react";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.defaults.font.size = 20;

export default function RecapChart({ userAnswersArray }) {
  const correctAnswers = userAnswersArray.filter(
    (answer) => answer.isCorrect
  ).length;
  const incorrectAnswers = userAnswersArray.length - correctAnswers;

  return (
    <Chart
      type={"pie"}
      data={{
        labels: ["Respostas corretas", "Respostas erradas"],
        datasets: [
          {
            data: [correctAnswers, incorrectAnswers],
            backgroundColor: ["#22c55e", "#ef4444"],
            borderColor: ["#20a22d", "#ea2113"],
            borderWidth: 2.5,
          },
        ],
      }}
      height={400}
      width={600}
    />
  );
}

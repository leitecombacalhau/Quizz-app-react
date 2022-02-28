import React from "react";

import { useNavigate } from "react-router-dom";

import Loading from "./Loading"

export default function Home({
  loadingScene: { loadScene, displayLoading },
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    loadScene();
    navigate("/quizz");
  };

  return (
    <>
      {displayLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-6 gap-7">
          <div className="col-start-2 col-end-6 bg-white text-purple-800 p-10 rounded-lg shadow-2xl text-center">
            <h1 className="text-6xl">Olá!</h1>
          </div>
          <div className="col-start-1 col-end-7">
            <button
              className="bg-white p-8 w-full text-purple-800 font-semibold text-xl rounded-lg shadow active:translate-y-0.5 hover:bg-slate-200"
              onClick={handleClick}
            >
              Começar o Quizz
            </button>
          </div>
        </div>
      )}
    </>
  );
}

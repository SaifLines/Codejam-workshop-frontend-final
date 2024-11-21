import confetti from "canvas-confetti";

import History from "./History";

export default function Result({ score, questionCount, restart }) {
  confetti();

  return (
    <>
      <div className="result">
        <h1>
          You scored {score}/{questionCount}
        </h1>
        <button onClick={restart}>Play Again!</button>
      </div>
      <History />
    </>
  );
}

import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function Result ({ score, questionCount, restart }) {

  confetti();

  return (
    <div className="result">
      <h1>You scored {score}/{questionCount}</h1>
      <button onClick={restart}>Play Again!</button>
    </div>
  )

}
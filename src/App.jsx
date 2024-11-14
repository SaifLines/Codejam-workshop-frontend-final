import { useState } from 'react'
import './App.css'

import Question from './components/Question'
import Result from './components/Result'

let data;
let promise;

function loadData () {
  data = undefined;
  promise = fetch('https://opentdb.com/api.php?amount=10&category=18');
  promise.then(response => response.json()).then(json => { data = json });
}

loadData()


function App() {
  // if data is not yet loaded, tell react to show loading screen
  if (!data) throw promise;

  const questionCount = data.results.length;

  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  const nextQuestion = correct => {
    setQuestionIndex(questionIndex + 1)
    if (correct) setScore(score + 1)
  }

  const restart = () => {
    setQuestionIndex(0)
    setScore(0)
    loadData()
  }

  return (
    <>
      {questionIndex == questionCount ? (
        <Result score={score}
          questionCount={questionCount}
          restart={restart}
        ></Result>
      ) : (
        <Question question={data.results[questionIndex].question}
        correctAnswer={data.results[questionIndex].correct_answer}
        incorrectAnswers={data.results[questionIndex].incorrect_answers}
        onNextQuestion={nextQuestion}></Question>
      )}
    </>
  )
}

export default App

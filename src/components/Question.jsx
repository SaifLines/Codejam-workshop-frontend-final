import { useState } from 'react'

export default function Question ({ question, correctAnswer, incorrectAnswers, onNextQuestion }) {

  // make sure quotes appear properly in the question
  question = question.replaceAll("&quot;", "\"");
  question = question.replaceAll("&#039;", "\'");

  const answers = [ correctAnswer, ...incorrectAnswers ];

  const [ selectedAnswer, setSelectedAnswer ] = useState(null);
  const [ shuffledArray, setShuffledArray ] = useState([]);

  // shuffle array
  const shuffle = array => {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  if (shuffledArray.length == 0) {
    shuffle(answers);
    setShuffledArray(answers);
  }
  
  
  return (
    <div className="question">
      <h1>{question}</h1>

      {shuffledArray.map(answer => {
        return <button key={answer} className={`answer ${answer == selectedAnswer ? 'selected': ''}`} onClick={() => {
          setSelectedAnswer(answer);
        }}>{answer}</button>
      })}

      <button disabled={selectedAnswer == null} onClick={() => {
        if (selectedAnswer != null) {
          onNextQuestion(selectedAnswer == correctAnswer)
          setShuffledArray([]);
          setSelectedAnswer(null);
        }
      }}>Submit</button>
    </div>
  )

}
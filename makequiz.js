function createQuiz(questions) {
    var score = 0;
  for (var i = 0; i < questions.length; i++) {
    var answer = prompt(questions[i].prompt);
    if (answer.toLowerCase() === questions[i].answer.toLowerCase()) {
      score++;
      alert('Correct!');
    } else {
      alert('Wrong!');
    }
  }
  alert('You got ' + score + '/' + questions.length + ' questions correct.');
}


const quiz = {
    question: "Welcher Planet ist der dritte von der Sonne?",
    options: [
      "Venus",
      "Mars",
      "Erde",
      "Jupiter"
    ],
    answer: 3 // Index der richtigen Antwort (beginnend bei 0)
  }
  
  document.getElementById("question").innerHTML = quiz.question;
  document.getElementById("option1text").innerHTML = quiz.options[0];
  document.getElementById("option2text").innerHTML = quiz.options[1];
  document.getElementById("option3text").innerHTML = quiz.options[2];
  document.getElementById("option4text").innerHTML = quiz.options[3];
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption == null) {
      alert("Bitte eine Antwort auswählen");
    } else {
      const answer = parseInt(selectedOption.value);
      if (answer === quiz.answer) {
        alert("Richtig!");
      } else {
        alert("Leider falsch. Die richtige Antwort ist Option " + (quiz.answer+1));
      }
    }
  }
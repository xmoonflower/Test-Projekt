const fs = require('fs');

const QUIZ_FILE = './quiz_aws.json';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function playQuiz() {
  fs.readFile(QUIZ_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read quiz data:', err);
      return;
    }

    const quiz = JSON.parse(data);
    shuffleArray(quiz);

    let score = 0;
    let currentQuestionIndex = 0;
    let correctAnswer; // Move the variable here

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    function askQuestion() {
      if (currentQuestionIndex >= quiz.length) {
        showScore();
        rl.close();
        return;
      }

      const currentQuestion = quiz[currentQuestionIndex];
      const { id, question, answer: options, correct_answer: correctAnswerValue } = currentQuestion;
      correctAnswer = correctAnswerValue; // Update the correctAnswer variable

      console.log('Question ID:', id);
      console.log('Question:', question);

      const shuffledOptions = Object.entries(options).map(([key, value]) => ({ key, value }));
      shuffleArray(shuffledOptions);

      shuffledOptions.forEach(({ key, value }) => {
        console.log(`${key}. ${value}`);
      });

      rl.question('Enter your answer (A, B, C, D): ', (userAnswer) => {
        const selectedOption = shuffledOptions.find(({ key }) => key === userAnswer.toUpperCase());

        if (!selectedOption) {
          console.log('Invalid answer. Please enter a valid option.');
        } else if (selectedOption.key === correctAnswer) {
          console.log('Correct answer!');
          score++;
        } else {
          console.log('Wrong answer!');
        }

        console.log('------------------');
        currentQuestionIndex++;
        showScore();
        askQuestion();
      });
    }

    function showScore() {
      console.log('Current score:', score, '/', currentQuestionIndex);
      const currentQuestion = quiz[currentQuestionIndex];
      const correctAnswers = Object.entries(currentQuestion.answer)
        .filter(([key, value]) => value === correctAnswer)
        .map(([key, value]) => key);
      if (correctAnswers.length > 1) {
        console.log('Hint: There are multiple correct answers for this question.');
      }
      console.log('------------------');
    }

    askQuestion();
  });
}

playQuiz();

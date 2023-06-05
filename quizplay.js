const fs = require('fs');
const readline = require('readline');

const QUIZ_FILE = './quiz.json';

function playQuiz() {
  fs.readFile(QUIZ_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read quiz data:', err);
      return;
    }
    
    const quiz = JSON.parse(data);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    let score = 0; // fix: let instead of const
    
    function askQuestion(index) {
        if (index >= quiz.length) {
          console.log('Quiz completed! Your score:', score);
          rl.close();
          return;
        }
      
        const question = quiz[index].question;
        const options = quiz[index].options;
      
        // shuffle the answer options using Fisher-Yates algorithm
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
      
        console.log('Question:', question);
        console.log('Options:');
      
        for (let i = 0; i < options.length; i++) {
          console.log(`• ${options[i].answer}`);
          options[i].index = i;
        }
      
        rl.question('Enter the number of your answer: ', (answerIndex) => {
          const selectedOption = options.find((option) => option.index === answerIndex - 1);
      
          if (!selectedOption) {
            console.log('Invalid input. Please enter a valid numeric option.');
          } else if (selectedOption.isCorrect) {
            console.log('Correct answer!');
            score++;
          } else {
            console.log('Wrong answer!');
          }
      
          console.log('------------------');
          askQuestion(index + 1); // fix: call askQuestion recursively to move on to the next question
        });
      }
      askQuestion(0); // start asking questions
  });
}

playQuiz(); // start the quiz


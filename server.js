const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const QUIZ_FILE = './quiz.json';

// POST handler for /quiz endpoint to add a new quiz question
app.post('/quiz', (req, res) => {
  const quizData = req.body;

  fs.readFile(QUIZ_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to read quiz data.' });
    } else {
      let quiz = [];
      if (data) {
        quiz = JSON.parse(data);
      }
      
      quiz.push(quizData);
      
      fs.writeFile(QUIZ_FILE, JSON.stringify(quiz), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, message: 'Failed to add quiz question.' });
        } else {
          res.json({ success: true, message: 'Quiz question added successfully.' });
        }
      });
    }
  });
});

// GET handler for /quiz/play endpoint to play the quiz
app.get('/quiz/play', (req, res) => {
  fs.readFile(QUIZ_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to read quiz data.' });
    } else {
      const quiz = JSON.parse(data);
      res.json({ success: true, quiz: quiz });
    }
  });
});

app.listen(7777, () => {
  console.log('Quiz app server listening on port 7777');
});




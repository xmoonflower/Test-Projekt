const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const QUIZ_FILE = './quiz.json'

// GET handler for /quiz endpoint to retrieve quiz questions
app.get('/quiz', (req, res) => {
  fs.readFile(QUIZ_FILE, (err, data) => {
    if (err) throw err
    const quiz = JSON.parse(data)
    res.send(quiz)
  })
})

// POST handler for /quiz endpoint to add a new quiz question
app.post('/quiz', (req, res) => {
  const quiz = req.body
  fs.writeFile(QUIZ_FILE, JSON.stringify(quiz), err => {
    if (err) throw err
    res.send('Quiz question added successfully')
  })
})

app.listen(7777, () => {
  console.log('Quiz app server listening on port 7777')
})

#!/usr/bin/env node
// Core
var commander = require('commander')
var app = require('express')()
var server = require('http').Server(app)
var cors = require('cors')
var bodyParser = require('body-parser')
// Helpers
var uuid = require('uuid')
var _ = require('lodash')

commander
  .version('0.0.1')
  .option('-p, --port <port>', 'The port in which the server will run. Default to 3001.')
  .parse(process.argv)

let port = 3001

if (commander.port) {
  port = commander.port
}

console.log(`💀  Running RIP Todos on port ${port}`)

// Todos State
let todos = []
// Server port
server.listen(port)
// Applying middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// API
// Get all todos
app.get('/todo/all', (req, res) => {
  res.json(todos)
})
// Get a single todo
app.get('/todo/:id', (req, res) => {
  const { id } = req.params
  res.json(todos.find(todo => todo._id === id))
})
// Add a new todo
app.post('/todo', (req, res) => {
  try {
    const { text } = req.body
    if (!text) {
      res.status(400).send('You must specify a text value to the todo')
    }
    todos = [
      ...todos, {
        _id: uuid.v4(),
        completed: false,
        text
      }
    ]
    res.status(200).end()
  } catch (e) {
    res.status(400).send('Bad Request')
  }
})
// Toggle a todo
app.patch('/todo', (req, res) => {
  const { id } = req.body
  const oldTodos = todos
  todos = todos.map(todo => todo._id !== id ? todo : { ...todo, completed: !todo.completed })
  const statusCode = _.isEqual(todos, oldTodos) ? 400 : 200
  res.status(statusCode).end()
})
// Delete a todo
app.delete('/todo/:id', (req, res) => {
  const id = req.param('id')
  const oldTodos = todos
  todos = todos.filter(todo => todo._id !== id)
  const statusCode = _.isEqual(todos, oldTodos) ? 400 : 200
  res.status(statusCode).end()
})

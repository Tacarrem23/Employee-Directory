const express = require('express');
const app = express();

// Sample employees array
const employees = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// GET / - returns welcome message
app.get('/', (req, res) => {
  res.send('Hello employees!');
});

// GET /employees - returns all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// GET /employees/random - returns a random employee
app.get('/employees/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// GET /employees/:id - returns employee with matching id
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

module.exports = app;

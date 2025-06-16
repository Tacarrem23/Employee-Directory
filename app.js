import express from "express";
const app = express();
export default app;

// app.js
const express = require('express');
const app = express();

const employees = [
  { id: 1, name: 'John Doe', department: 'IT' },
  { id: 2, name: 'Jane Smith', department: 'HR' },
  { id: 3, name: 'Peter Jones', department: 'Sales' },
];

app.get('/', (req, res) => {
  res.send('Hello employees!');
});

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.get('/employees/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

module.exports = app;


import employees from "#db/employees";

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.route("/employees").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

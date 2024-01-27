// Imports
const express = require('express');
const path = require('path');
const fs = require('fs');

// Express application and port
const app = express();
const PORT = process.env.PORT || 3000;

// JSON parsing with middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Javascript & CSS Static files from Public directory
app.use(express.static('public'));

// Route to handle get request for notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
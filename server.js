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

// Route to handle get request for root/home "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// Route to handle get request for api/notes from db.json
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8')) || [];
    res.json(notes);
  });

// Route for handling post request for api/notes
// Receives new notes, adds ID, saves to db.json
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Date.now().toString();
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8')) || [];
    notes.push(newNote);
    fs.writeFileSync('db.json', JSON.stringify(notes));
    res.json(newNote);
  });
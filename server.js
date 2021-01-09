const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

const notes = require('./db/db.json') 
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    return res.json(notes)
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNotes = req.body;

    notes.push(newNotes);
    res.json(newNotes);
    
    console.log(notes);
});

app.listen(PORT, () => {
    console.log(`App listening on PORT http://localhost:${PORT}`);
  });
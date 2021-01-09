const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

function findById(id, notesArray) {
    const results = notesArray.filter(notes => notes.id === id)[0];
    return results;
}
module.exports = {
    findById
}
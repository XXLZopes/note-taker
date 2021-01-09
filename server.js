const express = require("express");
const path = require("path");
const { findById } = require("./lib/Notes");
const app = express();
// const PORT = 3001;
const PORT = process.env.PORT || 3001;
const notes = require("./db/db.json");
const { response } = require("express");

app.use(express.static("public"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  console.log(process.env.PORT);
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(notes);
});

//get note based on id
app.get("/aip/notes/:id", (req, res) => {
  const results = findById(req.params.id, notes);
  if (results) {
    res.json(results);
  } else {
    res.send(404);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("deleting");

  const updatedNotes = notes.splice(req.params.id, 1);

  //Change id to the value of the current array index for every object in the array
  notes.forEach((note, index) => {
    note.id = index.toString();
  });

  res.send(updatedNotes);

  console.log(updatedNotes);
  console.log("deleted");
});

app.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();
  const newNotes = req.body;

  notes.push(newNotes);
  res.json(newNotes);

  console.log(notes);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});

const router = require("express").Router();
const notes = require('../../db/db.json');


router.get("/notes", (req, res) => {
  return res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
  // let ids = JSON.parse(note.parentElement.getAttribute('data-note')).id;
  console.log("deleting");
  //Remove note and create new array
  const updatedNotes = notes.splice(req.params.id, 1);

  //Change id to the value of the current array index for every object in the array
  notes.forEach((item, index) => {
    item.id = index.toString();
  });

  res.send(updatedNotes);

  console.log(updatedNotes);
  console.log("deleted");
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
  const newNotes = req.body;

  notes.push(newNotes);
  res.json(newNotes);

  console.log(notes);
});

module.exports = router;

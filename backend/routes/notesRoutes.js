const express = require("express");
const {
  createNote,
  getNotes,
  updateNotes,
  deleteNotes,
  byIdNotes,
} = require("../contorllers/noteController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Notes Routes</h1>");
});

router.post("/create", createNote);

router.get("/all", getNotes);

router.get("/byId/:id", byIdNotes);

router.put("/update/:id", updateNotes);

router.delete("/delete/:id", deleteNotes);

module.exports = router;

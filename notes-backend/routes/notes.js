const express = require("express");
const { getAllNotesByUser, createNote, updateNote, deleteNote, toggleArchived } = require("../controllers/noteController");

const router = express.Router();

router.get("/user", getAllNotesByUser);

router.post("/create", createNote);

router.put("/update/:id", updateNote);
router.put("/toggle/:id", toggleArchived);

router.delete("/:id", deleteNote);

module.exports = router;

const express = require("express");
const { getAllNotesByUser, createNote, updateNote, deleteNote, toggleArchived } = require("../controllers/noteController");

const router = express.Router();

router.get("/user/:userId/notes", getAllNotesByUser);

router.post("/note/create", createNote);

router.put("/note/update/:id", updateNote);
router.put("/note/toggle/:id", toggleArchived);

router.delete("note/:id", deleteNote);

module.exports = router;

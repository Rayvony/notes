const express = require("express");
const Note = require("../models/note");

const router = express.Router();

router.get("/active", async (req, res) => {
  try {
    const activeNotes = await Note.findAll({ where: { archived: false } });
    res.json(activeNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const noteController = require("../controllers/noteController");

const router = express.Router();

router.post("/create", noteController.createNote);

module.exports = router;

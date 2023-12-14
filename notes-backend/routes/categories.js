const express = require("express");
const router = express.Router();
const { createCategory, deleteCategory, updateCategory } = require("../controllers/categoryController");

router.post("/", createCategory);

router.delete("/:categoryId", deleteCategory);

router.put("/:categoryId", updateCategory);

module.exports = router;

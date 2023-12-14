const { Category } = require("../models/");

async function createCategory(req, res) {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteCategory(req, res) {
  const { categoryId } = req.params;
  try {
    await Category.destroy({ where: { id: categoryId } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCategory(req, res) {
  const { categoryId } = req.params;
  const { name } = req.body;
  try {
    const [updatedRowsCount] = await Category.update({ name }, { where: { id: categoryId } });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
};

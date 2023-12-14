const { User, Note } = require("../models/");

async function getAllNotesByUser(req, res) {
  const { id } = req.params;

  try {
    const notes = await Note.findAll({ where: { userId: id } });

    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNote(req, res) {
  const { username, title, content, categories } = req.body;

  try {
    const { id } = await User.findOne({ where: { username } });

    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    const newNote = await Note.create({
      title,
      content,
      archived: false,
      userId: id,
      categories: categories || [],
    });

    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateNote(req, res) {
  const { id } = req.params;
  const { title, content, archived, categories } = req.body;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (archived !== undefined) {
      note.archived = archived;
    }
    if (categories) {
      note.categories = categories;
    }

    await note.save();

    res.json({ message: "Note saved successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function toggleArchived(req, res) {
  const { id } = req.params;

  try {
    const note = await Notes.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.archived = !note.archived;
    await note.save();

    res.json({ message: "Archived status saved succesfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteNote(req, res) {
  const { id } = req.params;

  try {
    const note = await Notes.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.destroy();

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllNotesByUser,
  createNote,
  updateNote,
  toggleArchived,
  deleteNote,
};

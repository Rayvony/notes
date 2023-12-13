const User = require("../models/user");
const Note = require("../models/note");

async function getAllNotesByUser(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: Note,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ notes: user.Notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNote(req, res) {
  const { username, title, content } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newNote = await Note.create({
      title,
      content,
      archived: false,
      UserId: user.id,
    });

    res.status(201).json({ message: "Note created succesfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateNote(req, res) {
  const { id } = req.params;
  const { title, content, archived } = req.body;

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

    await note.save();

    res.json({ message: "Note saved succesfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function toggleArchived(req, res) {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);

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
    const note = await Note.findByPk(id);

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

const User = require("../models/user");
const Note = require("../models/note");

async function createNote(req, res) {
  const { username, title, content } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const newNote = await Note.create({
      title,
      content,
      archived: false,
      UserId: user.id,
    });

    res.status(201).json({ message: "Nota creada exitosamente", note: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createNote,
};

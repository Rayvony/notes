module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Note.associate = (models) => {
    Note.belongsToMany(models.Category, { through: "NoteCategory" });
  };

  return Note;
};

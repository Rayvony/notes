const express = require("express");
const { sequelize } = require("./models/index");
const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");

const app = express();

// Conexión a la base de datos
sequelize
  .sync()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((err) => {
    console.error("Error de conexión a la base de datos:", err);
  });

// Rutas para las notas y usuarios
app.use("/notes", notesRouter);
app.use("/users", usersRouter);

// Configuración de otras rutas, middlewares, etc.

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

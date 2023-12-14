const express = require("express");
const { sequelize } = require("./models/index");
const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.use("/notes", notesRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

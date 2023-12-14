import React from "react";
import { useSelector } from "react-redux";
import { Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Notes.module.css";

const Notes = () => {
  const userNotes = useSelector((state) => state.notes); // Fetch user notes from Redux store

  const renderNotes = () => {
    return userNotes.map((note) => (
      <Paper key={note.id} elevation={3} className={styles.stickyNote}>
        <div> {note.title}</div>
        <div>{note.content}</div>
      </Paper>
    ));
  };

  return (
    <div className={styles.notesContainer}>
      <Paper elevation={3} className={`${styles.stickyNote} ${styles.addNote}`}>
        <IconButton>
          <AddIcon fontSize='large' />
        </IconButton>
      </Paper>

      {renderNotes()}
    </div>
  );
};

export default Notes;

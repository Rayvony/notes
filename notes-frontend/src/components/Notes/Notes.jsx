import { useEffect, useState } from "react";
import { useNoteStore } from "../../hooks/useNoteStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Paper, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Notes.module.css";
import CreateNoteModal from "../CreateNoteModal/CreateNoteModal";

const Notes = () => {
  const { user } = useAuthStore();
  const { getNotesByUser, notes } = useNoteStore();
  const [showArchived, setShowArchived] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state to handle modal visibility

  useEffect(() => {
    getNotesByUser();
  }, [user]);

  const renderNotes = () => {
    const filteredNotes = showArchived ? notes.filter((note) => note.archived) : notes;

    return filteredNotes.map((note) => (
      <Paper key={note.id} elevation={3} className={styles.stickyNote}>
        <span className={styles.title}>{note.title}</span>
        <span className={styles.content}>{note.content}</span>
      </Paper>
    ));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.containerTitle}>
        <h3>My Notes</h3>
        <Button variant='outlined' color='inherit' onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "Hide Archived" : "Show Archived"}
        </Button>
      </div>
      <div className={styles.notesContainer}>
        <Paper onClick={openModal} elevation={3} className={`${styles.stickyNote} ${styles.addNote}`}>
          <IconButton>
            <AddIcon fontSize='large' />
          </IconButton>
        </Paper>
        {notes && notes.length > 0 ? renderNotes() : <></>}
      </div>
      <CreateNoteModal open={isModalOpen} handleClose={closeModal} /> {/* Render the modal */}
    </>
  );
};

export default Notes;

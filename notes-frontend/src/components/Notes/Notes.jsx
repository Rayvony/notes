import { useEffect, useState } from "react";
import { useNoteStore } from "../../hooks/useNoteStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Paper, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Notes.module.css";
import CreateNoteModal from "../CreateNoteModal/CreateNoteModal";
import EditNoteModal from "../EditNoteModal/EditNoteModal";

const Notes = () => {
  const { user } = useAuthStore();
  const { getNotesByUser, notes, createNote, updateNote } = useNoteStore();
  const [showArchived, setShowArchived] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const filteredNotes = showArchived ? notes.filter((note) => note.archived) : notes.filter((note) => !note.archived);

  const openNewNoteModal = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const openEditNoteModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleCreateNote = (note) => {
    createNote(note.title, note.content, note.categories);
    closeModal();
  };

  const handleUpdateNote = (id, note) => {
    updateNote(id, note.title, note.content, note.categories);
    closeModal();
  };

  useEffect(() => {
    getNotesByUser();
  }, [user]);

  return (
    <>
      <div className={styles.containerTitle}>
        <h3>My Notes</h3>
        <Button variant='outlined' color='inherit' onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "Hide Archived" : "Show Archived"}
        </Button>
      </div>
      <div className={styles.notesContainer}>
        <Paper onClick={openNewNoteModal} elevation={3} className={`${styles.stickyNote} ${styles.addNote}`}>
          <IconButton>
            <AddIcon fontSize='large' />
          </IconButton>
        </Paper>

        {filteredNotes && filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Paper key={note.id} elevation={3} className={styles.stickyNote} onClick={() => openEditNoteModal(note)}>
              <span className={styles.title}>{note.title}</span>
              <span className={styles.content}>{note.content}</span>
            </Paper>
          ))
        ) : (
          <></>
        )}
      </div>
      {isModalOpen && !selectedNote && <CreateNoteModal open={isModalOpen} handleClose={closeModal} handleCreateNote={handleCreateNote} />}
      {isModalOpen && selectedNote && <EditNoteModal open={isModalOpen} handleClose={closeModal} noteData={selectedNote} handleUpdateNote={handleUpdateNote} />}
    </>
  );
};
export default Notes;

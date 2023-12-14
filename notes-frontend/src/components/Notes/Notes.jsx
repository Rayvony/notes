import { useEffect, useState } from "react";
import { useNoteStore } from "../../hooks/useNoteStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Paper, IconButton, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import CreateNoteModal from "../CreateNoteModal/CreateNoteModal";
import EditNoteModal from "../EditNoteModal/EditNoteModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import styles from "./Notes.module.css";

const Notes = () => {
  const { user } = useAuthStore();
  const { notes, getNotesByUser, createNote, deleteNote, updateNote, toggleArchive } = useNoteStore();
  const [showArchived, setShowArchived] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

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
    getNotesByUser();
    closeModal();
  };

  const handleDeleteNote = (id) => {
    setDeletingNoteId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteNote(deletingNoteId);
    getNotesByUser();
    setDeleteConfirmationOpen(false);
    setDeletingNoteId(null);
  };

  const handleUpdateNote = (id, note) => {
    updateNote(id, note.title, note.content, note.categories);
    getNotesByUser();
    closeModal();
  };

  const handleArchiveToggle = (id) => {
    toggleArchive(id);
    getNotesByUser();
  };

  useEffect(() => {
    getNotesByUser();
  }, []);

  return (
    <>
      <div className={styles.containerTitle}>
        <h3>My Notes</h3>
        <Button variant='outlined' color='inherit' onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "Hide Archived" : "Show Archived"}
        </Button>
        <TextField
          placeholder='Filter by category'
          onChange={(e) => {
            setCategoryFilter(e.target.value);
          }}
        />
      </div>
      <div className={styles.notesContainer}>
        <Paper onClick={openNewNoteModal} elevation={3} className={`${styles.stickyNote} ${styles.addNote}`}>
          <IconButton>
            <AddIcon fontSize='large' />
          </IconButton>
        </Paper>

        {filteredNotes && filteredNotes.length > 0 ? (
          filteredNotes
            .filter((note) => !categoryFilter || note.categories.includes(categoryFilter))
            .map((note) => (
              <Paper key={note.id} elevation={3} className={styles.stickyNote} onClick={() => openEditNoteModal(note)}>
                <div className={styles.buttons}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArchiveToggle(note.id);
                    }}
                  >
                    {note.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
                <span className={styles.title}>{note.title}</span>
                <span className={styles.content}>{note.content}</span>
                <div className={styles.iconsContainer}></div>
              </Paper>
            ))
        ) : (
          <></>
        )}
      </div>
      {isModalOpen && !selectedNote && <CreateNoteModal open={isModalOpen} handleClose={closeModal} handleCreateNote={handleCreateNote} />}
      {isModalOpen && selectedNote && <EditNoteModal open={isModalOpen} handleClose={closeModal} noteData={selectedNote} handleUpdateNote={handleUpdateNote} />}
      <DeleteConfirmationModal open={deleteConfirmationOpen} handleClose={() => setDeleteConfirmationOpen(false)} handleConfirmDelete={handleConfirmDelete} />
    </>
  );
};
export default Notes;

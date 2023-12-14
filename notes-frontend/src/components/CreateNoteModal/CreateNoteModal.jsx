import React, { useState } from "react";
import { useNoteStore } from "../../hooks/useNoteStore";
import { Modal, Paper, Typography, TextField, Button, Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CreateNoteModal.module.css";

const CreateNoteModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { createNote } = useNoteStore();

  const handleAddCategory = () => {
    if (category.trim() !== "" && !categories.includes(category)) {
      setCategories([...categories, category.trim()]);
      setCategory("");
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleCreateNote = () => {
    createNote({
      title,
      content,
    });
    handleClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.modal} onClick={handleOutsideClick}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant='h6' gutterBottom sx={{ textAlign: "center" }}>
            Create new note
          </Typography>
          <TextField label='Title' variant='outlined' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
          <TextField label='Content' variant='outlined' fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} className={styles.input} />
          <div className={styles.categorySection}>
            <TextField label='Category' variant='outlined' value={category} onChange={(e) => setCategory(e.target.value)} className={styles.categoryInput} />
            <Button variant='outlined' onClick={handleAddCategory} className={styles.addButton}>
              Add Category
            </Button>
          </div>
          <div className={styles.categoryList}>
            {categories.map((cat, index) => (
              <Chip
                key={index}
                label={cat}
                onDelete={() => handleDeleteCategory(index)}
                deleteIcon={
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                }
                className={styles.categoryChip}
              />
            ))}
          </div>
          <div className={styles.createButtonContainer}>
            <Button variant='contained' onClick={handleCreateNote} className={styles.createButton}>
              Create Note
            </Button>
          </div>
        </Paper>
      </div>
    </Modal>
  );
};

export default CreateNoteModal;

import React, { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useNoteStore } from "../../hooks/useNoteStore";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LoginModal from "../LoginModal/LoginModal";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  const { status, logout } = useAuthStore();
  const { clearNotes } = useNoteStore();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    clearNotes();
    logout();
  };

  return (
    <>
      <AppBar position='static' className={styles.appBar}>
        <Toolbar>
          <img src='../../public/firma.svg' alt='logo' className={styles.logo} />
          <div className={styles.spacer} />
          {status === "authenticated" ? (
            <Button variant='outlined' color='inherit' className={styles.button} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant='outlined' color='inherit' className={styles.button} onClick={handleOpenModal}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal open={openModal} handleClose={handleCloseModal} />
    </>
  );
};
export default NavBar;

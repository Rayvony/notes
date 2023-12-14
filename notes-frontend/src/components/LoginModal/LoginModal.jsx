import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tab, Tabs } from "@mui/material";
import { useAuthStore } from "../../hooks/useAuthStore";

const LoginModal = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tabValue, setTabValue] = useState(0); // 0 for login, 1 for register

  const { login, register } = useAuthStore();

  const handleLogin = () => {
    login(username, password);
    setUsername("");
    setPassword("");
    handleClose();
  };

  const handleRegister = () => {
    register(username, password);
    setUsername("");
    setPassword("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label='Login' />
          <Tab label='Register' />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        {tabValue === 0 ? (
          <>
            <TextField autoFocus margin='dense' label='Username' type='text' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField margin='dense' label='Password' type='password' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          </>
        ) : (
          <>
            <TextField autoFocus margin='dense' label='New Username' type='text' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField margin='dense' label='New Password' type='password' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {tabValue === 0 ? <Button onClick={handleLogin}>Login</Button> : <Button onClick={handleRegister}>Register</Button>}
      </DialogActions>
    </Dialog>
  );
};
export default LoginModal;

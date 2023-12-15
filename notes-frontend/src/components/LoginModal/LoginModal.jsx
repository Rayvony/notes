import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tab, Tabs } from "@mui/material";
import { useAuthStore } from "../../hooks/useAuthStore";

const LoginModal = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [passwordError, setPasswordError] = useState("");

  open = open || false; // default to false if open is undefined mui error

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

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (tabValue === 0) {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Tabs color='purple' value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab color='purple' label='Login' />
          <Tab color='purple' label='Register' />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        {tabValue === 0 ? (
          <>
            <TextField color='purple' autoFocus margin='dense' label='Username' type='text' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleEnterKey} />
            <TextField color='purple' error={!!passwordError} helperText={passwordError} margin='dense' label='Password' type='password' fullWidth value={password} onChange={handlePasswordChange} onKeyPress={handleEnterKey} />
          </>
        ) : (
          <>
            <TextField color='purple' autoFocus margin='dense' label='New Username' type='text' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField color='purple' error={!!passwordError} helperText={passwordError} margin='dense' label='New Password' type='password' fullWidth value={password} onChange={handlePasswordChange} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='purple' onClick={handleClose}>
          Cancel
        </Button>
        {tabValue === 0 ? (
          <Button color='purple' onClick={handleLogin} disabled={!!passwordError} onKeyPress={handleEnterKey}>
            Login
          </Button>
        ) : (
          <Button color='purple' onClick={handleRegister} disabled={!!passwordError} onKeyPress={handleEnterKey}>
            Register
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default LoginModal;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Card,
  CardContent,
  CardActions,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axiosConfig from "../../utils/axiosConfig";
import useLocalStorage from "../../hooks/useLocalStorage";

function UserSettings({ loggedInUser, setLoggedInUser }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Preferences
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
      <PasswordChange loggedInUser={loggedInUser} />
    </Box>
  );
}

const Preferences = ({ loggedInUser, setLoggedInUser }) => {
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(loggedInUser.user.name);
  const [newLanguage, setNewLanguage] = useState(loggedInUser.user.language);
  const [newTheme, setNewTheme] = useState(loggedInUser.user.theme);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({ title: "", data: "" });
  const [localUser, setLocalUser] = useLocalStorage("user", null);
  const handleSave = async () => {
    try {
      const res = await axiosConfig.put(
        "/users/update",
        {
          theme: newTheme,
          language: newLanguage,
          name: newName,
        },
        {
          headers: { Authorization: `Bearer ${loggedInUser.token}` },
        }
      );
      setLocalUser({
        ...localUser,
        user: {
          ...localUser.user,
          theme: newTheme,
          language: newLanguage,
          name: newName,
        },
      });
      setLoggedInUser({
        ...loggedInUser,
        user: {
          ...loggedInUser.user,
          theme: newTheme,
          language: newLanguage,
          name: newName,
        },
      });
      setMessage({ title: res.data.title, data: res.data.data });
      setSuccess(true);
    } catch (e) {
      setNewTheme(loggedInUser.user.theme);
      setNewLanguage(loggedInUser.user.language);
      setNewName(loggedInUser.user.name);
      setMessage({
        title: "Internal Server Error!",
        data: "Please try again later",
      });
      setError(true);
    } finally {
      setEdit(false);
    }
  };

  return (
    <>
      <Snackbar
        open={success}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2500}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          <AlertTitle>{message.title}</AlertTitle>
          {message.data}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          <AlertTitle>{message.title}</AlertTitle>
          {message.data}
        </Alert>
      </Snackbar>

      <Card
        sx={{
          p: 1,
          boxShadow:
            "0px 0px 2.9px rgba(0, 0, 0, 0.07),0px 0px 6.7px rgba(0, 0, 0, 0.052),0px 0px 12.1px rgba(0, 0, 0, 0.044),0px 0px 20.1px rgba(0, 0, 0, 0.038), 0px 0px 33.1px rgba(0, 0, 0, 0.032),0px 0px 57.8px rgba(0, 0, 0, 0.026),0px 0px 125px rgba(0, 0, 0, 0.018)",
          backgroundColor: "background.paper",
          borderRadius: 2,
          mt: 5,
          width: "400px",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "text.primary",
                  fontSize: 20,
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                name.
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  disabled={!edit}
                  name="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "text.primary",
                  fontSize: 20,
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                favourite language.
              </Typography>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  disabled={!edit}
                  labelId="language-label"
                  id="language"
                  value={newLanguage}
                  label="Language"
                  onChange={(e) => setNewLanguage(e.target.value)}
                >
                  <MenuItem value={"cpp"}>C++</MenuItem>
                  <MenuItem value={"java"}>Java</MenuItem>
                  <MenuItem value={"javascript"}>Javascript</MenuItem>
                  <MenuItem value={"python"}>Python</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "text.primary",
                  fontSize: 20,
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                favourite theme.
              </Typography>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="theme-label">Theme</InputLabel>
                <Select
                  disabled={!edit}
                  labelId="theme-label"
                  id="theme"
                  value={newTheme}
                  label="Theme"
                  onChange={(e) => setNewTheme(e.target.value)}
                >
                  <ListSubheader
                    sx={{
                      opacity: 0.5,
                    }}
                  >
                    Light
                  </ListSubheader>
                  <MenuItem value={"githubLight"}>Github Light</MenuItem>
                  <MenuItem value={"tokyoNightDay"}>Tokyo Night Day</MenuItem>
                  <MenuItem value={"xcodeLight"}>Xcode Light</MenuItem>
                  <ListSubheader
                    sx={{
                      opacity: 0.5,
                    }}
                  >
                    Dark
                  </ListSubheader>
                  <MenuItem value={"aura"}>Aura</MenuItem>
                  <MenuItem value={"dracula"}>Dracula</MenuItem>
                  <MenuItem value={"githubDark"}>Github Dark</MenuItem>
                  <MenuItem value={"tokyoNight"}>Tokyo Night</MenuItem>
                  <MenuItem value={"tokyoNightStorm"}>
                    Tokyo Night Storm
                  </MenuItem>
                  <MenuItem value={"vscodeDark"}>VSCode Dark</MenuItem>
                  <MenuItem value={"xcodeDark"}>Xcode Dark</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          {edit ? (
            <>
              <Button
                variant="contained"
                color="warning"
                onClick={handleSave}
                sx={{ mr: 2, ml: 1 }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEdit(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setEdit(true)}
              sx={{ ml: 1 }}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

const PasswordChange = ({ loggedInUser }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({ title: "", data: "" });
  const handlePassword = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.put(
        "/users/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${loggedInUser.token}` },
        }
      );
      setMessage({ title: res.data.title, data: res.data.data });
      setSuccess(true);
    } catch (e) {
      setMessage({
        title: e.response.data.title,
        data: e.response.data.data,
      });
      setError(true);
    } finally {
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      setLoading(false);
    }
  };
  return (
    <>
      <Snackbar
        open={success}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2500}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          <AlertTitle>{message.title}</AlertTitle>
          {message.data}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          <AlertTitle>{message.title}</AlertTitle>
          {message.data}
        </Alert>
      </Snackbar>
      <Card
        sx={{
          p: 1,
          boxShadow:
            "0px 0px 2.9px rgba(0, 0, 0, 0.07),0px 0px 6.7px rgba(0, 0, 0, 0.052),0px 0px 12.1px rgba(0, 0, 0, 0.044),0px 0px 20.1px rgba(0, 0, 0, 0.038), 0px 0px 33.1px rgba(0, 0, 0, 0.032),0px 0px 57.8px rgba(0, 0, 0, 0.026),0px 0px 125px rgba(0, 0, 0, 0.018)",
          backgroundColor: "background.paper",
          borderRadius: 2,
          mt: 5,
          ml: 3,
          width: "400px",
        }}
      >
        <CardContent>
          <Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h2"
              sx={{
                color: "text.primary",
                fontSize: 20,
                fontWeight: 700,
                mb: 2,
              }}
            >
              change password.
            </Typography>
            <TextField
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              label="Current Password"
              sx={{ width: "100%", mb: 4, mt: 1 }}
            />
            <TextField
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              sx={{ width: "100%", mb: 4 }}
            />
            <TextField
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              sx={{ width: "100%" }}
              error={
                confirmPassword === ""
                  ? false
                  : !(confirmPassword === newPassword)
              }
            />
          </Box>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handlePassword}
            disabled={
              currentPassword === "" ||
              newPassword === "" ||
              confirmPassword === "" ||
              newPassword !== confirmPassword
            }
            sx={{ ml: 1 }}
          >
            Update
          </LoadingButton>
        </CardActions>
      </Card>
    </>
  );
};

export default UserSettings;

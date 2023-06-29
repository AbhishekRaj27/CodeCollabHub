import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import axiosConfig from "../utils/axiosConfig";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ColorModeContext";

function Home() {
  const [spaceId, setSpaceId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({ title: "", data: "" });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  useEffect(() => {
    document.title = "CodeCollab";
  }, []);

  useEffect(() => {
    if (name && spaceId) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [name, spaceId]);

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosConfig.get(`/spaces/${spaceId}`);
      if (res.status === 200) {
        navigate(`/space/${spaceId}`, {
          state: {
            name,
            email: null,
          },
        });
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setMessage({ title: "Error!", data: err.response.data.error });
      } else {
        setMessage({ title: "Error!", data: "No server response" });
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = async (e) => {
    if (e.code === "Enter") {
      await handleJoin(e);
    }
  };

  return (
    <>
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

      <Box
        sx={{
          backgroundColor: "background.default",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            minWidth: "30vw",
            backgroundColor: "background.paper",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            p: 3,
            boxShadow: "0px 0px 5px 5px #42a5f5",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 50,
                fontWeight: 700,
                mb: 3,
                color: "text.primary",
              }}
            >
              CodeCollab.
            </Typography>

            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "light" ? (
                <DarkModeIcon sx={{ fontSize: 40 }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 40 }} />
              )}
            </IconButton>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: 25,
                fontWeight: 700,
                mb: 2,
                width: "90%",
                color: "text.primary",
              }}
            >
              Join a space.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                autoFocus
                name="spaceId"
                value={spaceId}
                placeholder="Paste Invite ID"
                sx={{ width: "100%", mb: 1 }}
                onChange={(e) => setSpaceId(e.target.value)}
                onKeyUp={!disabled ? handleKey : null}
              />

              <TextField
                name="name"
                placeholder="Enter name"
                value={name}
                sx={{ width: "100%", maxWidth: "100%", mb: 2 }}
                onChange={(e) => setName(e.target.value)}
                onKeyUp={!disabled ? handleKey : null}
              />
            </Box>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={handleJoin}
              sx={{
                height: "45px",
                display: "block",
              }}
              disabled={disabled}
            >
              Join
            </LoadingButton>
          </Box>
          <Divider variant="middle" sx={{ mt: 4, mb: 3 }} />

          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: 25,
                fontWeight: 700,
                mb: 2,
                color: "text.primary",
              }}
            >
              Create a space.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                sx={{ height: "45px", mr: 3 }}
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{ height: "45px" }}
                startIcon={<PersonAddIcon />}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;

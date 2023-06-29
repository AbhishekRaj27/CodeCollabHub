import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  Snackbar,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import UserSpaces from "../components/dashboard/UserSpaces";
import UserSettings from "../components/dashboard/UserSettings";
import Profile from "../components/dashboard/Profile";
import { useAxios } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../context/ColorModeContext";
import { useTheme } from "@mui/material/styles";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const initialState = {
  value: 0,
  listSpace: undefined,
  originalSpace: null,
  spaceId: "",
  spaceName: "",
  showCreateSpaceBackdrop: false,
  showJoinSpaceBackdrop: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "updateValue":
      return { ...state, value: action.payload };
    case "updateListSpaces":
      return { ...state, listSpaces: action.payload };
    case "updateOriginalSpaces":
      return { ...state, originalSpace: action.payload };
    case "updateSpaceId":
      return { ...state, spaceId: action.payload };
    case "updateSpaceName":
      return { ...state, spaceName: action.payload };
    case "handleCreateBackdrop":
      return { ...state, showCreateSpaceBackdrop: action.payload };
    case "handleJoinBackdrop":
      return { ...state, showJoinSpaceBackdrop: action.payload };
    default:
      throw new Error();
  }
}

function Dashboard() {
  const { auth, setAuth } = useAuth();
  const [localUser, setLocalUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({ title: "", data: "" });
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const { response, error: responseError } = useAxios({
    method: "GET",
    url: "/spaces",
    headers: { Authorization: `Bearer ${auth.token}` },
  });

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    if (!localUser) {
      setLocalUser(auth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  useEffect(() => {
    if (responseError !== undefined) {
      setMessage({
        title: "error!",
        data: "Can't get your spaces. Try again later!",
      });
      setError(true);
      return;
    }

    if (response === undefined) return;

    dispatch({ type: "updateListSpaces", payload: response.data });
    dispatch({ type: "updateOriginalSpaces", payload: response.data });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleLogout = () => {
    setAuth(null);
    localStorage.setItem("user", null);
    navigate("/", { replace: true });
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

      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          display: "flex",
          zIndex: 3,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: 50, fontWeight: 700, p: 1, color: "text.primary" }}
        >
          CodeCollab.
        </Typography>
        <Box>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? (
              <DarkModeIcon sx={{ fontSize: 30 }} />
            ) : (
              <LightModeIcon sx={{ fontSize: 30 }} />
            )}
          </IconButton>
          <Button
            variant="contained"
            sx={{ m: 3 }}
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Grid
        container
        sx={{ minHeight: "100vh", backgroundColor: "background.default" }}
      >
        <Grid item xs={12} sx={{ height: "30vh" }}>
          <Box
            sx={{
              height: "inherit",
              backgroundColor: "background.paper",
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              width: "100vw",
              zIndex: 2,
              boxShadow:
                "0px 0px 15.7px rgba(0, 0, 0, 0.1),0px 0px 125px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Profile loggedInUser={auth} />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                ml: "auto",
                mr: "auto",
              }}
            >
              <Tabs
                value={state.value}
                onChange={(event, value) =>
                  dispatch({ type: "updateValue", payload: value })
                }
              >
                <Tab
                  icon={<WorkspacesIcon />}
                  iconPosition="start"
                  label="Spaces"
                  sx={{ pb: 1, pt: 3 }}
                />
                <Tab
                  icon={<SettingsIcon />}
                  iconPosition="start"
                  label="Settings"
                  sx={{ pb: 1, pt: 3 }}
                />
              </Tabs>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ minHeight: "70vh", backgroundColor: "background.default" }}
        >
          <TabPanel value={state.value} index={0}>
            <UserSpaces
              setMessage={setMessage}
              setSuccess={setSuccess}
              setError={setError}
              loggedInUser={auth}
              listSpaces={state.listSpaces}
              dispatch={dispatch}
              originalSpace={state.originalSpace}
              showCreateSpaceBackdrop={state.showCreateSpaceBackdrop}
              showJoinSpaceBackdrop={state.showJoinSpaceBackdrop}
              spaceId={state.spaceId}
              spaceName={state.spaceName}
            />
          </TabPanel>
          <TabPanel value={state.value} index={1}>
            <UserSettings loggedInUser={auth} setLoggedInUser={setAuth} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import {
  Box,
  Backdrop,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import SpaceHeader from "../components/space/SpaceHeader";
import CodeArea from "../components/space/CodeArea";
import useAuth from "../hooks/useAuth";
import { socket } from "../scoket";
import ACTIONS from "../utils/Actions";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";

function Space() {
  const { auth } = useAuth();
  const [loadError, setLoadError] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.spaceReducer);

  // eslint-disable-next-line
  const [localUser, setLocalUser] = useLocalStorage("user", null);
  const [codeChange, setCodeChange] = useState("");

  const { response, error } = useAxios({
    method: "GET",
    url: `/spaces/${location.pathname.split("/")[2]}`,
  });

  useEffect(() => {
    document.title =
      state.spaceName.length === 0 ? "Loading..." : state.spaceName;
  }, [state.spaceName]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit(ACTIONS.JOIN, {
      spaceId: location.pathname.split("/")[2],
      name: location.state.name,
      email: location.state.email,
    });

    socket.on(ACTIONS.JOINED, (activeUsers) => {
      dispatch({
        type: "updateActiveUsers",
        payload: activeUsers,
      });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ change }) => {
      setCodeChange(change);
    });

    socket.on(ACTIONS.SYNC_FILE_METADATA, ({ fileLang, fileName }) => {
      dispatch({
        type: "updateCurrentData",
        payload: { ...state.currentData, fileLang, fileName },
      });
      dispatch({ type: "updateLanguage", payload: fileLang });
    });

    socket.on(ACTIONS.LEFT, ({ activeUsers, name }) => {
      dispatch({
        type: "updateActiveUsers",
        payload: activeUsers,
      });
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (codeChange.length > 0) {
      dispatch({
        type: "updateCurrentData",
        payload: { ...state.currentData, fileData: codeChange },
      });
    }

    // eslint-disable-next-line
  }, [codeChange]);

  useEffect(() => {
    dispatch({
      type: "updateTheme",
      payload: localUser ? localUser.user.theme : state.theme,
    });
    if (error !== undefined) {
      dispatch({
        type: "updateMessage",
        payload: {
          title: "Cannot connect to server at the moment!",
          data: "Try again later",
        },
      });
      setLoadError(true);
      return;
    }

    if (response === undefined) return;

    dispatch({ type: "updateSpaceName", payload: response.data.spaceName });
    dispatch({ type: "updateSpaceData", payload: response.data.spaceData });
    dispatch({ type: "updateActiveUsers", payload: response.data.activeUsers });

    dispatch({
      type: "updateCurrentData",
      payload: response.data.spaceData[0],
    });
    dispatch({
      type: "updateLanguage",
      payload: response.data.spaceData[0].fileLang,
    });
    setLoadingScreen(false);

    // eslint-disable-next-line
  }, [response, error]);

  useEffect(() => {
    if (state.currentData) {
      const ind = state.spaceData.findIndex(
        (item) => item._id === state.currentData._id
      );
      const newSpaceData = state.spaceData;
      newSpaceData[ind] = state.currentData;

      dispatch({ type: "updateSpaceData", payload: newSpaceData });
    }

    // eslint-disable-next-line
  }, [state.currentData]);

  return (
    <>
      <Backdrop
        sx={{
          backgroundColor: "background.default",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
        }}
        open={loadingScreen}
      >
        <CircularProgress size={100} />
        <Typography
          variant="h1"
          sx={{ color: "text.primary", fontSize: 35, fontWeight: 700, mt: 5 }}
        >
          Loading Space...
        </Typography>
      </Backdrop>

      <Snackbar
        open={loadError}
        onClose={() => setLoadError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          <AlertTitle>{state.message.title}</AlertTitle>
          {state.message.data}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Box sx={{ flex: "0 0 auto", p: 1 }}>
          <SpaceHeader loggedInUser={auth} />
        </Box>
        <Box sx={{ flex: "1 1 auto", p: 1 }}>
          <CodeArea spaceId={location.pathname.split("/")[2]} />
        </Box>
      </Box>
    </>
  );
}

export default Space;

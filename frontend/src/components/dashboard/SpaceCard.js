import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { copySpaceId } from "../../utils/copySpaceId";
import axiosConfig from "../../utils/axiosConfig";

export default function SpaceCard({
  item,
  loggedInUser,
  setMessage,
  setSuccess,
  setError,
  dispatch,
}) {
  const date = new Date(item.createdAt);
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [editSpace, setEditSpace] = useState(false);
  const [spaceName, setSpaceName] = useState(item.spaceName);

  const handleDelete = () => {
    axiosConfig
      .delete(`/spaces/${item.spaceId}`, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      })
      .then((res) => {
        if (res.status === 201) {
          dispatch({ type: "updateListSpaces", payload: res.data });
          dispatch({ type: "updateOriginalSpaces", payload: res.data });
          setMessage({
            title: "Space deleted",
            data: `${item.spaceName} deleted`,
          });
          setSuccess(true);
          setConfirm(false);
        }
      })
      .catch((err) => {
        setMessage({
          title: "Cannot delete space",
          data: "Please try again later.",
        });
        setError(true);
      });
  };

  const goToSpace = () => {
    navigate(`/space/${item.spaceId}`, {
      state: {
        spaceId: item.spaceId,
        name: loggedInUser.user.name,
        email: loggedInUser.user.email,
      },
    });
  };

  const handleCopy = () => {
    const { status, message } = copySpaceId(item.spaceId);
    setSuccess(status);
    setMessage(message);
  };

  const handleEdit = () => {
    axiosConfig
      .put(`/spaces/${item.spaceId}`, {
        field: "name",
        name: spaceName,
      })
      .then((res) => {
        if (res.status === 201) {
          dispatch({ type: "updateListSpaces", payload: res.data });
          dispatch({ type: "updateOriginalSpaces", payload: res.data });
          setMessage({
            title: "Space Updated",
            data: `${spaceName} updated`,
          });
          setSuccess(true);
          setEditSpace(false);
        }
      })
      .catch((err) => {
        setMessage({
          title: "Cannot delete space",
          data: "Please try again later.",
        });
        setError(true);
      });
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
        boxShadow:
          "0px 2.3px 4.5px rgba(0, 0, 0, 0.07),0px 6.3px 12.5px rgba(0, 0, 0, 0.046),0px 15.1px 30.1px rgba(0, 0, 0, 0.035),0px 50px 100px rgba(0, 0, 0, 0.024)",
        backgroundColor: "background.paper",
        borderRadius: 2,
        minWidth: "70vw",
      }}
    >
      <CardContent>
        {editSpace ? (
          <TextField
            autoFocus
            name="name"
            // sx={{ width: "100%", mb: 1 }}
            value={spaceName}
            onChange={(e) => setSpaceName(e.target.value)}
          />
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                fontSize: 20,
                fontWeight: 700,
                mb: 1,
                color: "text.primary",
              }}
            >
              {item.spaceName}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: 15,
                opacity: "0.8",
                mb: 2,
                color: "text.primary",
              }}
            >
              {item.spaceId}
            </Typography>

            <Typography
              variant="p"
              sx={{ fontSize: 11, color: "text.primary" }}
            >
              Created at: {date.toDateString()} {date.toLocaleTimeString()}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {confirm ? (
          <>
            <Button
              variant="contained"
              color="error"
              sx={{ height: "45px", mr: 2 }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              sx={{ height: "45px" }}
              onClick={() => setConfirm(false)}
            >
              Cancel
            </Button>
          </>
        ) : editSpace ? (
          <>
            <Button
              variant="contained"
              color="warning"
              sx={{ height: "45px", mr: 2 }}
              onClick={handleEdit}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              sx={{ height: "45px" }}
              onClick={() => setEditSpace(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <IconButton sx={{ color: "text.primary" }} onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
            <IconButton
              sx={{ color: "text.primary" }}
              onClick={() => setEditSpace(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: "error.main" }}
              onClick={() => setConfirm(true)}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton sx={{ color: "success.main" }} onClick={goToSpace}>
              <RocketLaunchIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}

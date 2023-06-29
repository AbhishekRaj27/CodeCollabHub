import { Box, Button, IconButton, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect } from "react";

export default function JoinSpace({
  spaceId,
  dispatch,
  loggedInUser,
  showJoinSpaceBackdrop,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (showJoinSpaceBackdrop) {
      dispatch({ type: "updateSpaceId", payload: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showJoinSpaceBackdrop]);

  const handleJoin = () => {
    navigate(`/space/${spaceId}`, {
      state: {
        spaceId,
        name: loggedInUser.user.name,
        email: loggedInUser.user.email,
      },
    });
    dispatch({ type: "handleJoinBackdrop", payload: false });
  };

  return (
    <Box
      sx={{
        width: "30vw",
        backgroundColor: "background.paper",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "text.primary",
            fontSize: 30,
            fontWeight: 700,
            pb: 4,
          }}
        >
          Enter Space ID.
        </Typography>

        <IconButton
          sx={{ color: "primary.main", mb: 4 }}
          onClick={() =>
            dispatch({ type: "handleJoinBackdrop", payload: false })
          }
        >
          <CloseIcon sx={{ color: "error.main" }} />
        </IconButton>
      </Box>

      <TextField
        name="spaceId"
        placeholder="Paste Invite ID"
        sx={{ width: "100%", mb: 2 }}
        value={spaceId}
        onChange={(e) =>
          dispatch({ type: "updateSpaceId", payload: e.target.value })
        }
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            sx={{ height: "43px", mr: 2 }}
            onClick={handleJoin}
          >
            Join
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

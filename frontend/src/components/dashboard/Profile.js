import { Box, Typography } from "@mui/material";

export default function Profile({ loggedInUser }) {
  const date = new Date(loggedInUser.user?.createdAt);

  return (
    <Box
      sx={{
        minWidth: "30vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
      }}
    >
      <Box
        component="img"
        src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${loggedInUser.user?.name}?size=32`}
        alt="avatar"
        sx={{
          height: "150px",
          width: "150px",
          mr: 5,
          borderRadius: 2,
        }}
      />
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: 50,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          {loggedInUser.user?.name}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            mt: 1,
            color: "text.primary",
          }}
        >
          {loggedInUser.user?.email}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: 15,
            fontWeight: 400,
            mt: 3,
            color: "text.primary",
          }}
        >
          Joined on <strong>{date.toDateString()}</strong>
        </Typography>
      </Box>
    </Box>
  );
}

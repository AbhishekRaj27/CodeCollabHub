import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ position: "fixed", bottom: "0", width: "100vw" }}>
      <Typography sx={{ textAlign: "center", color: "#00E5B5" }}>
        Nitish Gupta
      </Typography>
    </Box>
  );
}

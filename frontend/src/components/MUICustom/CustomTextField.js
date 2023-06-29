import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "black",
    },
  },

  "& .MuiInputBase-input": {
    borderRadius: 2,
    backgroundColor: "#fcfcfb",
    fontSize: 16,
    padding: "10px 12px",
    color: "black",
    "&:hover": {
      border: "none",
    },
  },
});
